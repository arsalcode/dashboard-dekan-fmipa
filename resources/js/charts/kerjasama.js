/**
 * ========================================================================
 * KERJASAMA & KEMITRAAN FMIPA UNIVERSITAS PAKUAN
 * Interactive Logic, Chart.js Integrations, Search, Filters & Modals
 * 100% Dinamis dari DataManager (Local Storage / Upload Excel)
 * ========================================================================
 */

import { DataManager } from '../modules/data-manager';

// Chart Instances
let chartKerjasamaTrenInstance = null;
let chartKerjasamaJenisInstance = null;
let chartKerjasamaSektorInstance = null;
let chartKerjasamaTingkatInstance = null;

let currentSektorFilter = 'semua';
let currentJenisFilter = 'semua';
let currentStatusFilter = 'semua';
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

/**
 * Mengambil dataset Kerjasama aktual dari LocalStorage
 */
function getKerjasamaDataset() {
  const persisted = DataManager.getPersistedData('kerjasama') || [];
  return persisted.map((item, idx) => {
    const s = (item.sektor || 'industri').toLowerCase();
    const sektorLabel = s === 'pemerintah' ? 'Pemerintah & Riset' : s === 'internasional' ? 'Institusi Luar Negeri' : (s === 'pendidikan' ? 'Pendidikan & Kampus' : 'Dunia Industri / BUMN');
    const j = (item.jenis || 'mou').toLowerCase();
    const statusVal = (item.status || 'aktif').toLowerCase();
    const statusLabel = statusVal === 'akan_berakhir' ? 'Perlu Perpanjangan' : (statusVal === 'kadaluarsa' ? 'Berakhir' : 'Aktif Berlaku');

    return {
      id: idx + 1,
      no_dokumen: item.no_dokumen || `MoU/UNPAK/2026-${String(idx + 1).padStart(3, '0')}`,
      mitra: item.mitra || `Mitra Kerjasama ${idx + 1}`,
      sektor: s,
      sektorLabel: sektorLabel,
      jenis: j,
      jenisLabel: j.toUpperCase(),
      lingkup: item.lingkup || 'Kerjasama Tridharma Perguruan Tinggi',
      tingkat: item.tingkat || 'Nasional',
      tgl_mulai: item.tgl_mulai || '-',
      tgl_selesai: item.tgl_selesai || '-',
      pic: item.pic || 'Fakultas (Dekanat)',
      status: statusVal,
      statusLabel: statusLabel,
      realisasi_ia: item.realisasi_ia || '-',
      nilai_hibah: item.nilai_hibah || 'Rp 0'
    };
  });
}

/**
 * Initialize Kerjasama Module
 */
export function initKerjasamaModule() {
  const container = document.getElementById('kerjasamaSections');
  if (!container && !window.location.pathname.includes('kerjasama')) {
    return;
  }

  if (!window._fmipaKerjasamaListenerBound) {
    window._fmipaKerjasamaListenerBound = true;
    window.addEventListener('fmipa:data-updated', (e) => {
      if (e.detail && e.detail.module === 'kerjasama') {
        initCharts();
        initTableData();
      }
    });
  }

  initPillDropdowns();
  initStickyFloatingBar();
  initCharts();
  initSektorTabs();
  initJenisPills();
  initSearchAndPageSize();
  initTableData();
  initExportButtons();
}

/**
 * Custom Dropdowns (Synced between Hero & Sticky Bar)
 */
function initPillDropdowns() {
  const allDropdownWraps = document.querySelectorAll('.kerjasama-dropdown-wrap');

  allDropdownWraps.forEach(wrap => {
    const btn = wrap.querySelector('.kerjasama-pill-btn');
    const menu = wrap.querySelector('.kerjasama-dropdown-menu');

    if (!btn || !menu || wrap.dataset.bound) return;
    wrap.dataset.bound = 'true';

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrap.classList.contains('open');
      allDropdownWraps.forEach(w => w.classList.remove('open'));
      if (!isOpen) {
        wrap.classList.add('open');
      }
    });

    const items = menu.querySelectorAll('.kerjasama-dropdown-item');
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = item.getAttribute('data-value');
        const filterType = wrap.getAttribute('data-filter');
        const labelText = item.textContent.replace('✓', '').trim();

        items.forEach(i => {
          i.classList.remove('active');
          i.classList.remove('is-active');
        });
        item.classList.add('active');
        item.classList.add('is-active');

        const labelSpan = btn.querySelector('.kerjasama-btn-label');
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

  const btnResetHero = document.getElementById('btnResetKerjasamaFilters');
  const btnResetCompact = document.getElementById('btnResetCompactKerjasamaFilters');

  const handleReset = () => {
    resetAllFilters();
  };

  if (btnResetHero) btnResetHero.addEventListener('click', handleReset);
  if (btnResetCompact) btnResetCompact.addEventListener('click', handleReset);
}

function syncDropdownFilter(type, value, labelText) {
  if (type === 'sektor') {
    currentSektorFilter = value;
    syncOtherDropdown('wrapFilterKerjasamaSektor', 'wrapCompactFilterKerjasamaSektor', value, labelText);
    const tabs = document.querySelectorAll('#dataKerjasamaSektorTabs .btn-data-kerjasama-tab');
    tabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-sektor-target') === value));
  } else if (type === 'jenis') {
    currentJenisFilter = value;
    syncOtherDropdown('wrapFilterKerjasamaJenis', 'wrapCompactFilterKerjasamaJenis', value, labelText);
    const pills = document.querySelectorAll('#kerjasamaJenisFilterGroup .btn-data-jenis-pill');
    pills.forEach(p => p.classList.toggle('active', p.getAttribute('data-jenis-target') === value));
  } else if (type === 'status') {
    currentStatusFilter = value;
    syncOtherDropdown('wrapFilterKerjasamaStatus', 'wrapCompactFilterKerjasamaStatus', value, labelText);
  }

  updateResetButtonsVisibility();
  currentPage = 1;
  initTableData();
}

function syncOtherDropdown(heroId, compactId, value, labelText) {
  [heroId, compactId].forEach(id => {
    const wrap = document.getElementById(id);
    if (wrap) {
      const btn = wrap.querySelector('.kerjasama-pill-btn');
      const labelSpan = btn ? btn.querySelector('.kerjasama-btn-label') : null;
      if (labelSpan) labelSpan.textContent = labelText;

      const input = wrap.querySelector('input[type="hidden"]');
      if (input) input.value = value;

      const items = wrap.querySelectorAll('.kerjasama-dropdown-item');
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
  const isFiltered = (currentSektorFilter !== 'semua' || currentJenisFilter !== 'semua' || currentStatusFilter !== 'semua');
  const btnHero = document.getElementById('btnResetKerjasamaFilters');
  const btnCompact = document.getElementById('btnResetCompactKerjasamaFilters');

  if (btnHero) btnHero.classList.toggle('hidden', !isFiltered);
  if (btnCompact) btnCompact.classList.toggle('hidden', !isFiltered);
}

function resetAllFilters() {
  currentSektorFilter = 'semua';
  currentJenisFilter = 'semua';
  currentStatusFilter = 'semua';
  currentSearchTerm = '';

  const searchInput = document.getElementById('searchKerjasamaInput');
  if (searchInput) searchInput.value = '';

  syncDropdownFilter('sektor', 'semua', 'Semua');
  syncDropdownFilter('jenis', 'semua', 'Semua');
  syncDropdownFilter('status', 'semua', 'Semua');

  const sektorTabs = document.querySelectorAll('#dataKerjasamaSektorTabs .btn-data-kerjasama-tab');
  sektorTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-sektor-target') === 'semua'));

  const jenisPills = document.querySelectorAll('#kerjasamaJenisFilterGroup .btn-data-jenis-pill');
  jenisPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-jenis-target') === 'semua'));

  updateResetButtonsVisibility();
  currentPage = 1;
  initTableData();
}

/**
 * Sticky Floating Bar
 */
function initStickyFloatingBar() {
  const compactBar = document.getElementById('compactStickyBarKerjasama');
  const heroBanner = document.getElementById('executiveHeroBannerKerjasama');
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

/**
 * Charts Initialization
 */
function initCharts() {
  const dataset = getKerjasamaDataset();
  const canvasTren = document.getElementById('chartKerjasamaTren');
  const canvasJenis = document.getElementById('chartKerjasamaJenis');
  const canvasSektor = document.getElementById('chartKerjasamaSektor');
  const canvasTingkat = document.getElementById('chartKerjasamaTingkat');

  if (dataset.length === 0) {
    [canvasTren, canvasJenis, canvasSektor, canvasTingkat].forEach(c => {
      if (c) toggleCanvasEmptyOverlay(c.id, true);
    });
    [chartKerjasamaTrenInstance, chartKerjasamaJenisInstance, chartKerjasamaSektorInstance, chartKerjasamaTingkatInstance].forEach(inst => {
      if (inst) inst.destroy();
    });
    chartKerjasamaTrenInstance = null;
    chartKerjasamaJenisInstance = null;
    chartKerjasamaSektorInstance = null;
    chartKerjasamaTingkatInstance = null;
    return;
  }

  [canvasTren, canvasJenis, canvasSektor, canvasTingkat].forEach(c => {
    if (c) toggleCanvasEmptyOverlay(c.id, false);
  });

  if (typeof window.Chart === 'undefined') return;
  const Chart = window.Chart;

  // Chart 1: Tren Kerjasama (Line)
  if (canvasTren) {
    if (chartKerjasamaTrenInstance) chartKerjasamaTrenInstance.destroy();
    const ctx = canvasTren.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 240);
    gradient.addColorStop(0, 'rgba(114, 47, 153, 0.4)');
    gradient.addColorStop(1, 'rgba(114, 47, 153, 0.02)');

    const years = ['2023', '2024', '2025', '2026'];
    const totalCounts = years.map(y => dataset.filter(item => (item.tgl_mulai || '').includes(y)).length);

    chartKerjasamaTrenInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [{
          label: 'Total Kerjasama',
          data: totalCounts.some(c => c > 0) ? totalCounts : [0, 0, 0, dataset.length],
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

  // Chart 2: Jenis Dokumen
  if (canvasJenis) {
    if (chartKerjasamaJenisInstance) chartKerjasamaJenisInstance.destroy();
    const mou = dataset.filter(d => d.jenis === 'mou').length;
    const moa = dataset.filter(d => d.jenis === 'moa').length;
    const ia = dataset.filter(d => d.jenis === 'ia').length;

    chartKerjasamaJenisInstance = new Chart(canvasJenis.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: [`MoU (${mou})`, `MoA (${moa})`, `IA (${ia})`],
        datasets: [{
          data: [mou, moa, ia],
          backgroundColor: ['#722F99', '#0D9488', '#F59E0B'],
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

  // Chart 3: Sektor Mitra
  if (canvasSektor) {
    if (chartKerjasamaSektorInstance) chartKerjasamaSektorInstance.destroy();
    const industri = dataset.filter(d => d.sektor === 'industri').length;
    const pemerintah = dataset.filter(d => d.sektor === 'pemerintah').length;
    const inter = dataset.filter(d => d.sektor === 'internasional').length;
    const pend = dataset.filter(d => d.sektor === 'pendidikan').length;

    chartKerjasamaSektorInstance = new Chart(canvasSektor.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: [`Industri (${industri})`, `Pemerintah (${pemerintah})`, `Internasional (${inter})`, `Pendidikan (${pend})`],
        datasets: [{
          data: [industri, pemerintah, inter, pend],
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

  // Chart 4: Tingkat Kerjasama
  if (canvasTingkat) {
    if (chartKerjasamaTingkatInstance) chartKerjasamaTingkatInstance.destroy();
    const nasional = dataset.filter(d => d.tingkat.toLowerCase() === 'nasional').length;
    const inter = dataset.filter(d => d.tingkat.toLowerCase() === 'internasional').length;
    const lokal = dataset.filter(d => d.tingkat.toLowerCase() === 'lokal' || d.tingkat.toLowerCase() === 'regional').length;

    chartKerjasamaTingkatInstance = new Chart(canvasTingkat.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: [`Nasional (${nasional})`, `Internasional (${inter})`, `Lokal (${lokokal || lokal})`],
        datasets: [{
          data: [nasional, inter, lokal],
          backgroundColor: ['#722F99', '#0D9488', '#64748B'],
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
  const chartTabPills = document.querySelectorAll('.kerjasama-chart-tab-pill');
  chartTabPills.forEach(tab => {
    tab.addEventListener('click', () => {
      chartTabPills.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const view = tab.getAttribute('data-chart-view');
      document.querySelectorAll('.kerjasama-chart-canvas-view').forEach(v => v.classList.remove('active'));
      if (view === 'jenis') document.getElementById('viewWrapKerjasamaJenis')?.classList.add('active');
      else if (view === 'sektor') document.getElementById('viewWrapKerjasamaSektor')?.classList.add('active');
      else if (view === 'tingkat') document.getElementById('viewWrapKerjasamaTingkat')?.classList.add('active');
    });
  });
}

/**
 * Sektor Tabs
 */
function initSektorTabs() {
  const tabs = document.querySelectorAll('#dataKerjasamaSektorTabs .btn-data-kerjasama-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-sektor-target');
      currentSektorFilter = target;
      syncOtherDropdown('wrapFilterKerjasamaSektor', 'wrapCompactFilterKerjasamaSektor', target, tab.textContent.trim());
      updateResetButtonsVisibility();
      currentPage = 1;
      initTableData();
    });
  });
}

/**
 * Jenis Pills
 */
function initJenisPills() {
  const pills = document.querySelectorAll('#kerjasamaJenisFilterGroup .btn-data-jenis-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const target = pill.getAttribute('data-jenis-target');
      currentJenisFilter = target;
      syncOtherDropdown('wrapFilterKerjasamaJenis', 'wrapCompactFilterKerjasamaJenis', target, pill.textContent.trim());
      updateResetButtonsVisibility();
      currentPage = 1;
      initTableData();
    });
  });
}

/**
 * Search & Page Size
 */
function initSearchAndPageSize() {
  const searchInput = document.getElementById('searchKerjasamaInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value.toLowerCase().trim();
      currentPage = 1;
      initTableData();
    });
  }

  const pageSizeSelect = document.getElementById('pageSizeKerjasama');
  if (pageSizeSelect) {
    pageSizeSelect.addEventListener('change', (e) => {
      pageSize = parseInt(e.target.value, 10) || 10;
      currentPage = 1;
      initTableData();
    });
  }
}

/**
 * Filter and Render Table
 */
function initTableData() {
  const tbody = document.getElementById('tbodyKerjasama');
  const countBadge = document.getElementById('labelKerjasamaCountBadge');
  const tableInfo = document.getElementById('tableInfoKerjasama');
  const pagination = document.getElementById('paginationKerjasama');

  if (!tbody) return;

  const dataset = getKerjasamaDataset();
  const filtered = dataset.filter(item => {
    const matchSektor = (currentSektorFilter === 'semua' || item.sektor === currentSektorFilter);
    const matchJenis = (currentJenisFilter === 'semua' || item.jenis === currentJenisFilter);
    const matchStatus = (currentStatusFilter === 'semua' || item.status === currentStatusFilter);
    const matchSearch = !currentSearchTerm || 
      item.mitra.toLowerCase().includes(currentSearchTerm) ||
      item.no_dokumen.toLowerCase().includes(currentSearchTerm) ||
      item.lingkup.toLowerCase().includes(currentSearchTerm) ||
      item.pic.toLowerCase().includes(currentSearchTerm);

    return matchSektor && matchJenis && matchStatus && matchSearch;
  });

  if (countBadge) {
    countBadge.textContent = `${filtered.length} Dokumen Terdata`;
  }

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
              <i class="fa-solid fa-handshake-angle text-xl"></i>
            </div>
            <p class="font-bold text-slate-700 text-xs mt-1">Belum Ada Data Kerjasama Tersimpan</p>
            <p class="text-[11px] text-slate-400">Upload berkas Excel atau tambah data manual untuk memuat data kerjasama.</p>
          </div>
        </td>
      </tr>
    `;
    if (tableInfo) tableInfo.textContent = 'Menampilkan 0 data';
    if (pagination) pagination.innerHTML = '';
    return;
  }

  tbody.innerHTML = pagedItems.map((item, idx) => {
    const isAktif = item.status === 'aktif';
    const isAkan = item.status === 'akan_berakhir';
    const statusBg = isAktif ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : (isAkan ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-rose-50 text-rose-700 border-rose-200');

    return `
      <tr class="border-b border-gray-100 hover:bg-purple-50/40 transition text-xs">
        <td class="py-3.5 px-4 text-center text-gray-400 font-medium">${start + idx + 1}</td>
        <td class="py-3.5 px-4">
          <span class="font-mono text-xs font-bold text-[#722F99] bg-purple-50 px-2 py-0.5 rounded border border-purple-200/60">${item.no_dokumen}</span>
        </td>
        <td class="py-3.5 px-4">
          <div class="font-bold text-gray-900">${item.mitra}</div>
          <div class="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1.5">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            <span>${item.sektorLabel}</span>
            <span class="text-gray-300">&bull;</span>
            <span class="text-[#722F99] font-medium">${item.tingkat}</span>
          </div>
        </td>
        <td class="py-3.5 px-4 text-center">
          <span class="inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold uppercase bg-purple-100 text-[#722F99] border border-purple-200">
            ${item.jenisLabel}
          </span>
        </td>
        <td class="py-3.5 px-4 max-w-xs truncate text-gray-700" title="${item.lingkup}">
          ${item.lingkup}
        </td>
        <td class="py-3.5 px-4 text-gray-600 whitespace-nowrap text-center">
          ${item.tgl_mulai} s/d ${item.tgl_selesai}
        </td>
        <td class="py-3.5 px-4 text-center whitespace-nowrap">
          <span class="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusBg}">
            ${item.statusLabel}
          </span>
        </td>
        <td class="py-3.5 px-4 text-gray-700 font-medium">
          ${item.pic}
        </td>
      </tr>
    `;
  }).join('');

  if (tableInfo) {
    tableInfo.textContent = `Menampilkan ${start + 1} sampai ${end} dari ${total} dokumen kerjasama`;
  }

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
  const elMitra = document.getElementById('valKerjasamaMitra');
  const elMou = document.getElementById('valKerjasamaMoU');
  const elMoa = document.getElementById('valKerjasamaMoA');
  const elAktif = document.getElementById('valKerjasamaAktif');

  const total = list.length;
  const uniqueMitra = new Set(list.map(i => i.mitra.toLowerCase())).size;
  const mou = list.filter(i => i.jenis === 'mou').length;
  const moa = list.filter(i => i.jenis === 'moa').length;
  const aktif = list.filter(i => i.status === 'aktif').length;

  if (elMitra) elMitra.textContent = uniqueMitra.toString();
  if (elMou) elMou.textContent = mou.toString();
  if (elMoa) elMoa.textContent = moa.toString();
  if (elAktif) elAktif.textContent = aktif.toString();
}

/**
 * Export Helpers
 */
function initExportButtons() {
  const btnCsv = document.getElementById('btnExportKerjasamaCsv');
  const btnExcel = document.getElementById('btnExportKerjasamaExcel');
  const btnPrint = document.getElementById('btnExportKerjasamaPrint');

  if (btnCsv) {
    btnCsv.addEventListener('click', () => {
      const data = getKerjasamaDataset();
      const csv = "\uFEFFNo,No Dokumen,Mitra,Sektor,Jenis,Tingkat,PIC,Status\n" + data.map((d, i) => `${i+1},"${d.no_dokumen}","${d.mitra}","${d.sektor}","${d.jenis}","${d.tingkat}","${d.pic}","${d.status}"`).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data_kerjasama_fmipa.csv';
      a.click();
    });
  }

  if (btnExcel) {
    btnExcel.addEventListener('click', () => btnCsv?.click());
  }

  if (btnPrint) {
    btnPrint.addEventListener('click', () => window.print());
  }
}
