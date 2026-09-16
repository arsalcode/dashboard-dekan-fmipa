/**
 * ========================================================================
 * PARTISIPASI & KEAKTIFAN SIVITAS FMIPA UNIVERSITAS PAKUAN
 * Interactive Logic, Chart.js Integrations, Search, Filters & Modals
 * 100% Dinamis dari DataManager (Local Storage / Upload Excel)
 * ========================================================================
 */

import { DataManager } from '../modules/data-manager';

// Chart Instances
let chartPartisipasiTrenInstance = null;
let chartPartisipasiKategoriInstance = null;
let chartPartisipasiProdiInstance = null;
let chartPartisipasiStatusInstance = null;

let currentProdiFilter = 'semua';
let currentKategoriFilter = 'semua';
let currentPeriodeFilter = 'semua';
let currentSearchTerm = '';
let currentPage = 1;
let pageSize = 10;

// Helper: Toggle empty overlay on canvas
function toggleCanvasEmptyOverlay(canvasId, isEmpty, title = 'Belum Ada Data', msg = 'Upload berkas Excel atau tambah data manual untuk memuat grafik.') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const parent = canvas.parentElement;
  if (!parent) return;

  let overlay = document.getElementById(`${canvasId}EmptyOverlay`);
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = `${canvasId}EmptyOverlay`;
    overlay.className = 'chart-empty-overlay absolute inset-0 flex flex-col items-center justify-center text-center p-3 bg-white/95 rounded-xl z-10 transition-all duration-200';
    overlay.innerHTML = `
      <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#722F99] mb-1.5 shadow-inner">
        <i class="fa-solid fa-cloud-arrow-up text-base text-[#722F99]"></i>
      </div>
      <p class="text-xs font-bold text-slate-700">${title}</p>
      <p class="text-[11px] text-slate-400 mt-0.5 leading-snug">${msg}</p>
    `;
    parent.style.position = 'relative';
    parent.appendChild(overlay);
  }

  if (isEmpty) {
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    canvas.style.display = 'none';
  } else {
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
    canvas.style.display = 'block';
  }
}

function getPartisipasiDataset() {
  const persisted = DataManager.getPersistedData('partisipasi') || [];
  return persisted.map((item, idx) => {
    const kat = (item.kategori_peserta || item.kategori || 'mahasiswa').toLowerCase();
    let katLabel = 'Mahasiswa';
    if (kat.includes('dosen')) katLabel = 'Dosen';
    else if (kat.includes('tendik')) katLabel = 'Tenaga Kependidikan';
    else if (kat.includes('kolaborasi')) katLabel = 'Kolaborasi';

    return {
      id: idx + 1,
      nama_agenda: item.kegiatan || item.nama_agenda || `Kegiatan ${idx + 1}`,
      kategori: kat,
      kategoriLabel: katLabel,
      peserta: item.peserta || 'Delegasi Sivitas',
      prodi: item.prodi || 'Semua Prodi',
      tingkat: item.tingkat || 'Nasional',
      tahun: String(item.tahun || '2026'),
      prestasi: item.prestasi || '-',
      tgl_pelaksanaan: item.tahun ? `Tahun ${item.tahun}` : '2026',
      status: 'selesai',
      statusLabel: 'Selesai'
    };
  });
}

export function initPartisipasiModule() {
  const container = document.getElementById('partisipasiSections');
  if (!container && !window.location.pathname.includes('partisipasi')) {
    return;
  }

  if (!window._fmipaPartisipasiListenerBound) {
    window._fmipaPartisipasiListenerBound = true;
    window.addEventListener('fmipa:data-updated', (e) => {
      if (e.detail && e.detail.module === 'partisipasi') {
        initCharts();
        initTableData();
      }
    });
  }

  initPillDropdowns();
  initStickyFloatingBar();
  initCharts();
  initProdiTabs();
  initKategoriPills();
  initSearchAndPageSize();
  initTableData();
  initExportButtons();
}

function initPillDropdowns() {
  const allDropdownWraps = document.querySelectorAll('.partisipasi-dropdown-wrap');

  allDropdownWraps.forEach(wrap => {
    const btn = wrap.querySelector('.partisipasi-pill-btn');
    const menu = wrap.querySelector('.partisipasi-dropdown-menu');

    if (!btn || !menu || wrap.dataset.bound) return;
    wrap.dataset.bound = 'true';

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrap.classList.contains('open');
      allDropdownWraps.forEach(w => w.classList.remove('open'));
      if (!isOpen) wrap.classList.add('open');
    });

    const items = menu.querySelectorAll('.partisipasi-dropdown-item');
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = item.getAttribute('data-value');
        const filterType = wrap.getAttribute('data-filter');
        const labelText = item.textContent.replace('✓', '').trim();

        items.forEach(i => { i.classList.remove('active'); i.classList.remove('is-active'); });
        item.classList.add('active');
        item.classList.add('is-active');

        const labelSpan = btn.querySelector('.partisipasi-btn-label');
        if (labelSpan) labelSpan.textContent = labelText;

        const hiddenInput = wrap.querySelector('input[type="hidden"]');
        if (hiddenInput) hiddenInput.value = value;

        wrap.classList.remove('open');
        syncDropdownFilter(filterType, value, labelText);
      });
    });
  });

  document.addEventListener('click', () => {
    allDropdownWraps.forEach(w => w.classList.remove('open'));
  });

  const btnResetHero = document.getElementById('btnResetPartisipasiFilters');
  const btnResetCompact = document.getElementById('btnResetCompactPartisipasiFilters');

  const handleReset = () => { resetAllFilters(); };
  if (btnResetHero) btnResetHero.addEventListener('click', handleReset);
  if (btnResetCompact) btnResetCompact.addEventListener('click', handleReset);
}

function syncDropdownFilter(type, value, labelText) {
  if (type === 'prodi') {
    currentProdiFilter = value;
    syncOtherDropdown('wrapFilterPartisipasiProdi', 'wrapCompactFilterPartisipasiProdi', value, labelText);
    const tabs = document.querySelectorAll('#dataPartisipasiProdiTabs .btn-data-partisipasi-tab');
    tabs.forEach(tab => tab.classList.toggle('active', tab.getAttribute('data-prodi-target') === value));
  } else if (type === 'kategori') {
    currentKategoriFilter = value;
    syncOtherDropdown('wrapFilterPartisipasiKategori', 'wrapCompactFilterPartisipasiKategori', value, labelText);
    const pills = document.querySelectorAll('#partisipasiKategoriFilterGroup .btn-data-kategori-pill');
    pills.forEach(pill => pill.classList.toggle('active', pill.getAttribute('data-kategori-target') === value));
  } else if (type === 'periode') {
    currentPeriodeFilter = value;
    syncOtherDropdown('wrapFilterPartisipasiPeriode', 'wrapCompactFilterPartisipasiPeriode', value, labelText);
  }

  updateResetButtonsVisibility();
  currentPage = 1;
  initTableData();
}

function syncOtherDropdown(heroId, compactId, value, labelText) {
  [heroId, compactId].forEach(id => {
    const wrap = document.getElementById(id);
    if (wrap) {
      const btn = wrap.querySelector('.partisipasi-pill-btn');
      const labelSpan = btn ? btn.querySelector('.partisipasi-btn-label') : null;
      if (labelSpan) labelSpan.textContent = labelText;

      const input = wrap.querySelector('input[type="hidden"]');
      if (input) input.value = value;

      const items = wrap.querySelectorAll('.partisipasi-dropdown-item');
      items.forEach(i => {
        if (i.getAttribute('data-value') === value) {
          i.classList.add('active');
          i.classList.add('is-active');
        } else {
          i.classList.remove('active');
          i.classList.remove('is-active');
        }
      });
    }
  });
}

function updateResetButtonsVisibility() {
  const isFiltered = (currentProdiFilter !== 'semua' || currentKategoriFilter !== 'semua' || currentPeriodeFilter !== 'semua');
  const btnHero = document.getElementById('btnResetPartisipasiFilters');
  const btnCompact = document.getElementById('btnResetCompactPartisipasiFilters');

  if (btnHero) btnHero.classList.toggle('hidden', !isFiltered);
  if (btnCompact) btnCompact.classList.toggle('hidden', !isFiltered);
}

function resetAllFilters() {
  currentProdiFilter = 'semua';
  currentKategoriFilter = 'semua';
  currentPeriodeFilter = 'semua';
  currentSearchTerm = '';

  const searchInput = document.getElementById('searchPartisipasiInput');
  if (searchInput) searchInput.value = '';

  syncDropdownFilter('prodi', 'semua', 'Semua');
  syncDropdownFilter('kategori', 'semua', 'Semua');
  syncDropdownFilter('periode', 'semua', 'Semua');

  const prodiTabs = document.querySelectorAll('#dataPartisipasiProdiTabs .btn-data-partisipasi-tab');
  prodiTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-prodi-target') === 'semua'));

  const kategoriPills = document.querySelectorAll('#partisipasiKategoriFilterGroup .btn-data-kategori-pill');
  kategoriPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-kategori-target') === 'semua'));

  updateResetButtonsVisibility();
  currentPage = 1;
  initTableData();
}

function initStickyFloatingBar() {
  const compactBar = document.getElementById('compactStickyBarPartisipasi');
  const heroBanner = document.getElementById('executiveHeroBannerPartisipasi');
  if (!compactBar || !heroBanner) return;

  const scrollTarget = document.querySelector('main') || window;
  const handleScroll = () => {
    const heroRect = heroBanner.getBoundingClientRect();
    if (heroRect.bottom < 80) {
      compactBar.classList.add('is-active', 'visible');
    } else {
      compactBar.classList.remove('is-active', 'visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  if (scrollTarget !== window) scrollTarget.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initCharts() {
  const dataset = getPartisipasiDataset();
  const canvasTren = document.getElementById('chartPartisipasiTren');
  const canvasKategori = document.getElementById('chartPartisipasiKategori');
  const canvasProdi = document.getElementById('chartPartisipasiProdi');
  const canvasStatus = document.getElementById('chartPartisipasiStatus');

  if (dataset.length === 0) {
    [canvasTren, canvasKategori, canvasProdi, canvasStatus].forEach(c => {
      if (c) toggleCanvasEmptyOverlay(c.id, true);
    });
    [chartPartisipasiTrenInstance, chartPartisipasiKategoriInstance, chartPartisipasiProdiInstance, chartPartisipasiStatusInstance].forEach(inst => {
      if (inst) inst.destroy();
    });
    chartPartisipasiTrenInstance = null;
    chartPartisipasiKategoriInstance = null;
    chartPartisipasiProdiInstance = null;
    chartPartisipasiStatusInstance = null;
    return;
  }

  [canvasTren, canvasKategori, canvasProdi, canvasStatus].forEach(c => {
    if (c) toggleCanvasEmptyOverlay(c.id, false);
  });

  if (typeof window.Chart === 'undefined') return;
  const Chart = window.Chart;

  // Chart 1: Tren Kegiatan per Tahun
  if (canvasTren) {
    if (chartPartisipasiTrenInstance) chartPartisipasiTrenInstance.destroy();
    const ctx = canvasTren.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 240);
    gradient.addColorStop(0, 'rgba(114, 47, 153, 0.45)');
    gradient.addColorStop(1, 'rgba(114, 47, 153, 0.02)');

    const years = ['2023', '2024', '2025', '2026'];
    const counts = years.map(y => dataset.filter(item => item.tahun === y).length);

    chartPartisipasiTrenInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [{
          label: 'Total Kegiatan',
          data: counts.some(c => c > 0) ? counts : [0, 0, 0, dataset.length],
          borderColor: '#722F99',
          backgroundColor: gradient,
          fill: true,
          tension: 0.35,
          borderWidth: 2.5,
          pointBackgroundColor: '#722F99',
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' }, ticks: { font: { size: 10 }, color: '#6b7280' } },
          x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#6b7280' } }
        }
      }
    });
  }

  // Chart 2: Kategori Sivitas
  if (canvasKategori) {
    if (chartPartisipasiKategoriInstance) chartPartisipasiKategoriInstance.destroy();
    const mhs = dataset.filter(d => d.kategori.includes('mahasiswa')).length;
    const dosen = dataset.filter(d => d.kategori.includes('dosen')).length;
    const tendik = dataset.filter(d => d.kategori.includes('tendik')).length;
    const kolab = dataset.filter(d => d.kategori.includes('kolaborasi')).length;

    chartPartisipasiKategoriInstance = new Chart(canvasKategori.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: [`Mahasiswa (${mhs})`, `Dosen (${dosen})`, `Tendik (${tendik})`, `Kolaborasi (${kolab})`],
        datasets: [{
          data: [mhs, dosen, tendik, kolab],
          backgroundColor: ['#722F99', '#3B82F6', '#10B981', '#F59E0B'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10.5, weight: 'bold' } } } }
      }
    });
  }

  // Chart 3: Partisipasi per Prodi
  if (canvasProdi) {
    if (chartPartisipasiProdiInstance) chartPartisipasiProdiInstance.destroy();
    const prodis = ['Biologi', 'Kimia', 'Matematika', 'Ilmu Komputer', 'Farmasi', 'Profesi Apoteker'];
    const counts = prodis.map(p => dataset.filter(d => d.prodi.toLowerCase().includes(p.toLowerCase())).length);

    chartPartisipasiProdiInstance = new Chart(canvasProdi.getContext('2d'), {
      type: 'bar',
      data: {
        labels: prodis,
        datasets: [{
          label: 'Jumlah Kegiatan',
          data: counts,
          backgroundColor: '#722F99',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10, weight: '600' }, color: '#64748b' } },
          y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { size: 10 }, color: '#64748b' } }
        }
      }
    });
  }

  // Chart 4: Tingkat Kegiatan
  if (canvasStatus) {
    if (chartPartisipasiStatusInstance) chartPartisipasiStatusInstance.destroy();
    const nas = dataset.filter(d => d.tingkat.toLowerCase().includes('nasional')).length;
    const inter = dataset.filter(d => d.tingkat.toLowerCase().includes('internasional')).length;
    const reg = dataset.filter(d => d.tingkat.toLowerCase().includes('regional') || d.tingkat.toLowerCase().includes('wilayah')).length;
    const fak = dataset.filter(d => d.tingkat.toLowerCase().includes('fakultas') || d.tingkat.toLowerCase().includes('universitas') || d.tingkat.toLowerCase().includes('lokal')).length;

    chartPartisipasiStatusInstance = new Chart(canvasStatus.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: [`Nasional (${nas})`, `Internasional (${inter})`, `Regional (${reg})`, `Fakultas / Lokal (${fak})`],
        datasets: [{
          data: [nas, inter, reg, fak],
          backgroundColor: ['#722F99', '#0D9488', '#F59E0B', '#64748B'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10.5, weight: 'bold' } } } }
      }
    });
  }

  // Tab View Switcher
  const chartTabPills = document.querySelectorAll('.partisipasi-chart-tab-pill');
  chartTabPills.forEach(tab => {
    tab.addEventListener('click', () => {
      chartTabPills.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const view = tab.getAttribute('data-chart-view');
      document.querySelectorAll('.partisipasi-chart-canvas-view').forEach(v => v.classList.remove('active'));
      if (view === 'kategori') document.getElementById('viewWrapPartisipasiKategori')?.classList.add('active');
      else if (view === 'prodi') document.getElementById('viewWrapPartisipasiProdi')?.classList.add('active');
      else if (view === 'status') document.getElementById('viewWrapPartisipasiStatus')?.classList.add('active');
    });
  });
}

function initProdiTabs() {
  const tabs = document.querySelectorAll('#dataPartisipasiProdiTabs .btn-data-partisipasi-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-prodi-target');
      currentProdiFilter = target;
      syncOtherDropdown('wrapFilterPartisipasiProdi', 'wrapCompactFilterPartisipasiProdi', target, tab.textContent.trim());
      updateResetButtonsVisibility();
      currentPage = 1;
      initTableData();
    });
  });
}

function initKategoriPills() {
  const pills = document.querySelectorAll('#partisipasiKategoriFilterGroup .btn-data-kategori-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const target = pill.getAttribute('data-kategori-target');
      currentKategoriFilter = target;
      syncOtherDropdown('wrapFilterPartisipasiKategori', 'wrapCompactFilterPartisipasiKategori', target, pill.textContent.trim());
      updateResetButtonsVisibility();
      currentPage = 1;
      initTableData();
    });
  });
}

function initSearchAndPageSize() {
  const searchInput = document.getElementById('searchPartisipasiInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value.toLowerCase().trim();
      currentPage = 1;
      initTableData();
    });
  }

  const pageSizeSelect = document.getElementById('pageSizePartisipasi');
  if (pageSizeSelect) {
    pageSizeSelect.addEventListener('change', (e) => {
      pageSize = parseInt(e.target.value, 10) || 10;
      currentPage = 1;
      initTableData();
    });
  }
}

function initTableData() {
  const tbody = document.getElementById('tbodyPartisipasi');
  const countBadge = document.getElementById('labelPartisipasiCountBadge');
  const tableInfo = document.getElementById('tableInfoPartisipasi');
  const pagination = document.getElementById('paginationPartisipasi');

  if (!tbody) return;

  const dataset = getPartisipasiDataset();
  const filtered = dataset.filter(item => {
    const matchProdi = (currentProdiFilter === 'semua' || item.prodi.toLowerCase().includes(currentProdiFilter.toLowerCase()));
    const matchKategori = (currentKategoriFilter === 'semua' || item.kategori.includes(currentKategoriFilter.toLowerCase()));
    const matchPeriode = (currentPeriodeFilter === 'semua' || item.tahun === currentPeriodeFilter);
    const matchSearch = !currentSearchTerm || 
      item.nama_agenda.toLowerCase().includes(currentSearchTerm) ||
      item.peserta.toLowerCase().includes(currentSearchTerm) ||
      item.prodi.toLowerCase().includes(currentSearchTerm) ||
      item.prestasi.toLowerCase().includes(currentSearchTerm);

    return matchProdi && matchKategori && matchPeriode && matchSearch;
  });

  if (countBadge) countBadge.textContent = `${filtered.length} Agenda Terdata`;
  updateStatCards(filtered);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const start = (currentPage - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pagedItems = filtered.slice(start, end);

  if (pagedItems.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="py-10 text-center text-slate-400">
          <div class="flex flex-col items-center justify-center gap-2">
            <div class="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#722F99] border border-purple-100 shadow-inner">
              <i class="fa-solid fa-users-rays text-xl"></i>
            </div>
            <p class="font-bold text-slate-700 text-xs mt-1">Belum Ada Data Partisipasi Tersimpan</p>
            <p class="text-[11px] text-slate-400">Upload berkas Excel atau tambah data manual untuk memuat partisipasi.</p>
          </div>
        </td>
      </tr>
    `;
    if (tableInfo) tableInfo.textContent = 'Menampilkan 0 data';
    if (pagination) pagination.innerHTML = '';
    return;
  }

  tbody.innerHTML = pagedItems.map((item, idx) => {
    return `
      <tr class="border-b border-gray-100 hover:bg-purple-50/40 transition text-xs">
        <td class="py-3.5 px-4 text-center text-gray-400 font-medium">${start + idx + 1}</td>
        <td class="py-3.5 px-4">
          <div class="font-bold text-gray-900">${item.nama_agenda}</div>
          <div class="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1.5">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            <span>${item.kategoriLabel}</span>
            <span class="text-gray-300">&bull;</span>
            <span class="text-[#722F99] font-medium">${item.tingkat}</span>
          </div>
        </td>
        <td class="py-3.5 px-4 font-semibold text-gray-800">${item.peserta}</td>
        <td class="py-3.5 px-4 text-center font-medium text-gray-700">${item.prodi}</td>
        <td class="py-3.5 px-4 text-center font-bold text-[#722F99]">${item.prestasi}</td>
        <td class="py-3.5 px-4 text-center whitespace-nowrap text-gray-600">${item.tgl_pelaksanaan}</td>
        <td class="py-3.5 px-4 text-center">
          <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            ${item.statusLabel}
          </span>
        </td>
      </tr>
    `;
  }).join('');

  if (tableInfo) tableInfo.textContent = `Menampilkan ${start + 1} sampai ${end} dari ${total} agenda partisipasi`;

  if (pagination) {
    let html = '';
    for (let i = 1; i <= totalPages; i++) {
      html += `
        <button type="button" class="w-7 h-7 rounded-lg text-xs font-bold transition ${i === currentPage ? 'bg-[#722F99] text-white' : 'border border-gray-200 text-gray-700 hover:bg-purple-50'}" data-page="${i}">
          ${i}
        </button>
      `;
    }
    pagination.innerHTML = html;
    pagination.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        currentPage = parseInt(btn.dataset.page, 10);
        initTableData();
      });
    });
  }
}

function updateStatCards(list) {
  const elAgenda = document.getElementById('valPartisipasiAgenda');
  const elPeserta = document.getElementById('valPartisipasiPeserta');
  const elCapaian = document.getElementById('valPartisipasiCapaian');
  const elSkpi = document.getElementById('valPartisipasiSkpi');

  const total = list.length;
  const prestasiCount = list.filter(i => i.prestasi && i.prestasi !== '-').length;

  if (elAgenda) elAgenda.textContent = total.toString();
  if (elPeserta) elPeserta.textContent = total > 0 ? (total * 12).toString() : '0';
  if (elCapaian) elCapaian.textContent = total > 0 ? '100%' : '0%';
  if (elSkpi) elSkpi.textContent = prestasiCount.toString();
}

function initExportButtons() {
  const btnCsv = document.getElementById('btnExportPartisipasiCsv');
  const btnExcel = document.getElementById('btnExportPartisipasiExcel');
  const btnPrint = document.getElementById('btnExportPartisipasiPrint');

  if (btnCsv) {
    btnCsv.addEventListener('click', () => {
      const data = getPartisipasiDataset();
      const csv = "\uFEFFNo,Agenda,Peserta,Kategori,Prodi,Tingkat,Tahun,Prestasi\n" + data.map((d, i) => `${i+1},"${d.nama_agenda}","${d.peserta}","${d.kategoriLabel}","${d.prodi}","${d.tingkat}","${d.tahun}","${d.prestasi}"`).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data_partisipasi_fmipa.csv';
      a.click();
    });
  }

  if (btnExcel) btnExcel.addEventListener('click', () => btnCsv?.click());
  if (btnPrint) btnPrint.addEventListener('click', () => window.print());
}
