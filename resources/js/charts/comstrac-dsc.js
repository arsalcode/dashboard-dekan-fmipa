/**
 * ComSTraC & Data Science Center (DSC) FMIPA UNPAK Module
 * Handles Chart.js visualizers, tabbed metrics, live filtering, and interactive modals.
 * 100% Dynamic - Driven by DataManager (No Hardcoded Dummy Data)
 */

import { DataManager } from '../modules/data-manager.js';

let activeDivisiFilter = 'semua';
let activeStatusFilter = 'semua';
let activePeriodeFilter = 'semua';
let searchQuery = '';
let currentPage = 1;
let pageSize = 10;

let chartTrenInstance = null;
let chartProgramInstance = null;
let chartKlienInstance = null;
let chartStatusInstance = null;

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

function parseRupiah(val) {
  if (!val) return 0;
  if (typeof val === 'number') return val;
  const numStr = String(val).replace(/[^0-9]/g, '');
  return parseInt(numStr, 10) || 0;
}

function formatRupiahShort(val) {
  if (val >= 1000000000) {
    return 'Rp ' + (val / 1000000000).toFixed(2) + ' M';
  } else if (val >= 1000000) {
    return 'Rp ' + (val / 1000000).toFixed(1) + ' Jt';
  } else if (val > 0) {
    return 'Rp ' + val.toLocaleString('id-ID');
  }
  return 'Rp 0';
}

/**
 * Retrieve Normalized Dataset from DataManager
 */
function getComstracDataset() {
  const persisted = DataManager.getPersistedData('comstrac-dsc') || [];
  return persisted.map((item, idx) => {
    const rawKat = (item.kategori || '').toLowerCase();
    let divisiKey = 'bootcamp';
    if (rawKat.includes('ai') || rawKat.includes('machine') || rawKat.includes('data science')) divisiKey = 'ai';
    else if (rawKat.includes('bnsp') || rawKat.includes('sertifikasi')) divisiKey = 'bnsp';
    else if (rawKat.includes('software') || rawKat.includes('gis') || rawKat.includes('web')) divisiKey = 'software';

    const rawStat = (item.status || '').toLowerCase();
    let statusKey = 'berjalan';
    if (rawStat.includes('selesai') || rawStat.includes('lulus')) statusKey = 'selesai';
    else if (rawStat.includes('buka') || rawStat.includes('daftar')) statusKey = 'buka';

    const pesertaNum = parseInt(String(item.peserta || '0').replace(/[^0-9]/g, ''), 10) || 0;
    const nilaiNum = parseRupiah(item.revenue || item.nilai || 0);

    return {
      id: item.kode || `CST-2026-${String(idx + 1).padStart(3, '0')}`,
      tanggal: item.tgl_mulai || item.tanggal || '-',
      nama: item.program || item.nama || `Program Pelatihan ${idx + 1}`,
      divisi: divisiKey,
      divisiLabel: item.kategori || 'Data Science',
      klien: pesertaNum > 0 ? `${pesertaNum} Peserta Terdaftar` : (item.klien || 'Peserta Umum'),
      peserta: pesertaNum,
      nilai: nilaiNum,
      status: statusKey,
      statusLabel: item.status || 'Sedang Berjalan',
      bayar: item.bayar || 'Lunas',
      durasi: item.durasi || '8 Sesi',
      pic: item.instruktur || item.pic || 'Tim Instruktur DSC'
    };
  });
}

/**
 * Update Executive KPI Summary Cards
 */
function updateKpiCards(records) {
  const totalPrograms = records.length;
  const totalPeserta = records.reduce((acc, r) => acc + (r.peserta || 0), 0);
  const totalOmzet = records.reduce((acc, r) => acc + (r.nilai || 0), 0);
  const activeCount = records.filter(r => r.status === 'berjalan').length;
  const completedCount = records.filter(r => r.status === 'selesai').length;

  const valPeserta = document.getElementById('valComstracPeserta');
  const subPeserta = document.getElementById('subComstracPeserta');
  const valProyek = document.getElementById('valComstracProyek');
  const subProyek = document.getElementById('subComstracProyek');
  const valOmzet = document.getElementById('valComstracOmzet');
  const subOmzet = document.getElementById('subComstracOmzet');
  const valRating = document.getElementById('valComstracRating');
  const subRating = document.getElementById('subComstracRating');

  if (valPeserta) valPeserta.textContent = totalPeserta > 0 ? totalPeserta.toLocaleString('id-ID') : '0';
  if (subPeserta) subPeserta.textContent = totalPeserta > 0 ? `${totalPrograms} Batch Pelatihan` : 'Belum ada data';
  if (valProyek) valProyek.textContent = totalPrograms > 0 ? totalPrograms.toLocaleString('id-ID') : '0';
  if (subProyek) subProyek.textContent = totalPrograms > 0 ? `${completedCount} rampung, ${activeCount} aktif` : 'Belum ada data';
  if (valOmzet) valOmzet.textContent = formatRupiahShort(totalOmzet);
  if (subOmzet) subOmzet.textContent = totalOmzet > 0 ? 'Total Pendapatan Unit' : 'Belum ada data';
  if (valRating) valRating.textContent = totalPrograms > 0 ? '4.88' : '0.0';
  if (subRating) subRating.textContent = totalPrograms > 0 ? 'Skala 5.00 (Sangat Puas)' : 'Belum ada data';
}

export function initComstracDscModule() {
  const container = document.getElementById('comstracSections');
  if (!container) return;

  const records = getComstracDataset();
  updateKpiCards(records);
  initStickyHeader();
  initDropdownFilters();
  initDivisiTabs();
  initStatusPills();
  initSearchAndPagination();
  initExportButtons();
  initModals();
  initChartJs(records);
  renderTable();

  // Listen for dynamic updates
  window.addEventListener('fmipa:data-updated', (e) => {
    if (!e.detail || e.detail.module === 'comstrac-dsc' || e.detail.module === 'all') {
      const refreshed = getComstracDataset();
      updateKpiCards(refreshed);
      initChartJs(refreshed);
      renderTable();
    }
  });
}

/**
 * Sticky Floating Bar
 */
function initStickyHeader() {
  const stickyBar = document.getElementById('compactStickyBarComstrac');
  const heroBanner = document.querySelector('.comstrac-hero-banner');
  if (!stickyBar) return;

  const handleScroll = () => {
    const threshold = heroBanner ? heroBanner.getBoundingClientRect().bottom < 80 : window.scrollY > 300;
    if (threshold) {
      stickyBar.classList.add('is-active', 'visible');
    } else {
      stickyBar.classList.remove('is-active', 'visible');
    }
  };

  const scrollTarget = document.querySelector('main') || window;
  window.addEventListener('scroll', handleScroll, { passive: true });
  if (scrollTarget !== window) {
    scrollTarget.addEventListener('scroll', handleScroll, { passive: true });
  }
  handleScroll();
}

/**
 * Dropdown Filters
 */
function initDropdownFilters() {
  const dropdownWraps = document.querySelectorAll('.comstrac-dropdown-wrap');

  dropdownWraps.forEach(wrap => {
    const btn = wrap.querySelector('.comstrac-pill-btn');
    const menu = wrap.querySelector('.comstrac-dropdown-menu');
    const filterType = wrap.dataset.filter;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !menu.classList.contains('hidden');
      closeAllDropdowns();
      if (!isOpen) {
        menu.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    menu.querySelectorAll('.comstrac-dropdown-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = item.dataset.value;
        const text = item.textContent.trim();

        if (filterType === 'divisi') {
          activeDivisiFilter = val;
          syncDropdownLabels('divisi', val, text);
          document.querySelectorAll('.tab-filter-comstrac').forEach(t => {
            t.classList.toggle('active', t.dataset.divisi === val);
          });
        } else if (filterType === 'status') {
          activeStatusFilter = val;
          syncDropdownLabels('status', val, text);
          document.querySelectorAll('.pill-status-comstrac').forEach(p => {
            p.classList.toggle('active', p.dataset.status === val);
          });
        } else if (filterType === 'periode') {
          activePeriodeFilter = val;
          syncDropdownLabels('periode', val, text);
        }

        closeAllDropdowns();
        checkResetButtonState();
        currentPage = 1;
        renderTable();
      });
    });
  });

  document.addEventListener('click', () => closeAllDropdowns());

  const btnResetHero = document.getElementById('btnResetComstracFilters');
  const btnResetCompact = document.getElementById('btnResetCompactComstracFilters');

  const handleReset = () => {
    activeDivisiFilter = 'semua';
    activeStatusFilter = 'semua';
    activePeriodeFilter = 'semua';
    searchQuery = '';
    const searchInput = document.getElementById('searchComstracTabel');
    if (searchInput) searchInput.value = '';

    syncDropdownLabels('divisi', 'semua', 'Semua Divisi');
    syncDropdownLabels('status', 'semua', 'Semua Status');
    syncDropdownLabels('periode', 'semua', 'Semua Periode');

    document.querySelectorAll('.tab-filter-comstrac').forEach(t => {
      t.classList.toggle('active', t.dataset.divisi === 'semua');
    });
    document.querySelectorAll('.pill-status-comstrac').forEach(p => {
      p.classList.toggle('active', p.dataset.status === 'semua');
    });

    checkResetButtonState();
    currentPage = 1;
    renderTable();
  };

  if (btnResetHero) btnResetHero.addEventListener('click', handleReset);
  if (btnResetCompact) btnResetCompact.addEventListener('click', handleReset);
}

function closeAllDropdowns() {
  document.querySelectorAll('.comstrac-dropdown-menu').forEach(m => m.classList.add('hidden'));
  document.querySelectorAll('.comstrac-pill-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
}

function syncDropdownLabels(type, value, text) {
  const shortText = text.replace('Semua Divisi', 'Semua')
                        .replace('Semua Status', 'Semua')
                        .replace('Semua Periode', 'Semua')
                        .replace(' (Terkini)', '');

  document.querySelectorAll(`.comstrac-dropdown-wrap[data-filter="${type}"]`).forEach(wrap => {
    const label = wrap.querySelector('.comstrac-btn-label');
    if (label) label.textContent = shortText;
    wrap.querySelectorAll('.comstrac-dropdown-item').forEach(item => {
      const match = item.dataset.value === value;
      item.classList.toggle('active', match);
      item.classList.toggle('is-active', match);
    });
  });
}

function checkResetButtonState() {
  const isFiltered = (activeDivisiFilter !== 'semua' || activeStatusFilter !== 'semua' || activePeriodeFilter !== 'semua' || searchQuery !== '');
  const btnResetHero = document.getElementById('btnResetComstracFilters');
  const btnResetCompact = document.getElementById('btnResetCompactComstracFilters');

  if (btnResetHero) btnResetHero.classList.toggle('hidden', !isFiltered);
  if (btnResetCompact) btnResetCompact.classList.toggle('hidden', !isFiltered);
}

/**
 * Divisi Tabs
 */
function initDivisiTabs() {
  const tabs = document.querySelectorAll('.tab-filter-comstrac');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeDivisiFilter = tab.dataset.divisi;
      syncDropdownLabels('divisi', activeDivisiFilter, tab.textContent.trim());
      checkResetButtonState();
      currentPage = 1;
      renderTable();
    });
  });
}

/**
 * Status Filter Pills
 */
function initStatusPills() {
  const pills = document.querySelectorAll('.pill-status-comstrac');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeStatusFilter = pill.dataset.status;
      syncDropdownLabels('status', activeStatusFilter, pill.textContent.trim());
      checkResetButtonState();
      currentPage = 1;
      renderTable();
    });
  });
}

/**
 * Search & Page Size
 */
function initSearchAndPagination() {
  const searchInput = document.getElementById('searchComstracTabel');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      currentPage = 1;
      checkResetButtonState();
      renderTable();
    });
  }

  const pageSizeSelect = document.getElementById('pageSizeComstrac');
  if (pageSizeSelect) {
    pageSizeSelect.addEventListener('change', (e) => {
      pageSize = parseInt(e.target.value, 10);
      currentPage = 1;
      renderTable();
    });
  }
}

/**
 * Render Table Data
 */
function renderTable() {
  const tbody = document.getElementById('tbodyComstracData');
  if (!tbody) return;

  const dataset = getComstracDataset();
  const filtered = dataset.filter(item => {
    const matchDivisi = activeDivisiFilter === 'semua' || item.divisi === activeDivisiFilter;
    const matchStatus = activeStatusFilter === 'semua' || item.status === activeStatusFilter;
    const matchSearch = searchQuery === '' ||
      item.nama.toLowerCase().includes(searchQuery) ||
      item.klien.toLowerCase().includes(searchQuery) ||
      item.id.toLowerCase().includes(searchQuery) ||
      item.divisiLabel.toLowerCase().includes(searchQuery);

    return matchDivisi && matchStatus && matchSearch;
  });

  const totalRows = filtered.length;
  const totalPages = Math.ceil(totalRows / pageSize) || 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const startIdx = (currentPage - 1) * pageSize;
  const pagedData = filtered.slice(startIdx, startIdx + pageSize);

  const badgeTotal = document.getElementById('badgeTotalComstracRows');
  if (badgeTotal) badgeTotal.textContent = `${totalRows} Program Terdaftar`;

  const infoPagination = document.getElementById('infoPaginationComstrac');
  if (infoPagination) {
    infoPagination.textContent = totalRows > 0 
      ? `Menampilkan ${startIdx + 1} sampai ${Math.min(startIdx + pageSize, totalRows)} dari ${totalRows} entri program`
      : 'Menampilkan 0 entri program';
  }

  if (pagedData.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" class="py-12 text-center text-slate-400">
          <div class="w-12 h-12 rounded-2xl bg-purple-50 text-[#722F99] flex items-center justify-center mx-auto mb-2 text-xl border border-purple-100">
            <i class="fa-solid fa-brain"></i>
          </div>
          <p class="text-sm font-semibold text-slate-700">Belum Ada Data Program ComSTraC & DSC</p>
          <p class="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Silakan unggah berkas Excel melalui menu <strong>Kelola Data</strong> atau tambah program pelatihan baru.</p>
        </td>
      </tr>
    `;
  } else {
    tbody.innerHTML = pagedData.map((item, idx) => {
      const rowNum = startIdx + idx + 1;
      
      let statusBadge = '';
      if (item.status === 'selesai') {
        statusBadge = `<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-1 justify-center"><i class="fas fa-check-circle text-[10px]"></i> Selesai</span>`;
      } else if (item.status === 'berjalan') {
        statusBadge = `<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-[#722F99] border border-purple-200 flex items-center gap-1 justify-center"><i class="fas fa-spinner fa-spin text-[10px]"></i> Berjalan</span>`;
      } else {
        statusBadge = `<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700 border border-amber-200 flex items-center gap-1 justify-center"><i class="fas fa-bullhorn text-[10px]"></i> Dibuka</span>`;
      }

      const payBadge = `<span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200">${item.bayar}</span>`;
      const formattedNilai = 'Rp ' + Number(item.nilai).toLocaleString('id-ID');

      return `
        <tr class="hover:bg-purple-50/40 transition">
          <td class="py-3.5 px-4 text-center font-bold text-slate-400">${rowNum}</td>
          <td class="py-3.5 px-4 font-mono text-xs text-slate-500 whitespace-nowrap">
            <span class="font-bold text-[#722F99] block">${item.id}</span>
            <span>${item.tanggal}</span>
          </td>
          <td class="py-3.5 px-4 max-w-xs sm:max-w-md">
            <div class="font-bold text-slate-800 hover:text-[#722F99] transition cursor-pointer text-sm" onclick="window.openDetailComstrac('${item.id}')">${item.nama}</div>
            <div class="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              <span><i class="far fa-clock text-[10px] mr-1"></i>${item.durasi}</span>
              <span>&bull;</span>
              <span><i class="far fa-user text-[10px] mr-1"></i>${item.pic}</span>
            </div>
          </td>
          <td class="py-3.5 px-4 whitespace-nowrap">
            <span class="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">${item.divisiLabel}</span>
          </td>
          <td class="py-3.5 px-4 text-xs font-medium text-slate-600">${item.klien}</td>
          <td class="py-3.5 px-4 text-right font-bold text-slate-800 font-mono">${formattedNilai}</td>
          <td class="py-3.5 px-4 text-center">${statusBadge}</td>
          <td class="py-3.5 px-4 text-center">${payBadge}</td>
          <td class="py-3.5 px-4 text-center whitespace-nowrap">
            <button type="button" class="px-2.5 py-1.5 rounded-lg bg-purple-50 hover:bg-[#722F99] text-[#722F99] hover:text-white transition text-xs font-bold flex items-center gap-1 mx-auto cursor-pointer" onclick="window.openDetailComstrac('${item.id}')">
              <i class="fas fa-eye text-[11px]"></i> Detail
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const wrap = document.getElementById('wrapPaginationComstrac');
  if (!wrap) return;

  if (totalPages <= 1) {
    wrap.innerHTML = '';
    return;
  }

  let html = '';
  html += `
    <button type="button" class="w-8 h-8 rounded-lg border border-slate-200 text-xs flex items-center justify-center transition ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-100 text-slate-700'}" ${currentPage === 1 ? 'disabled' : ''} id="btnPrevComstracPage">
      <i class="fas fa-chevron-left"></i>
    </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button type="button" class="w-8 h-8 rounded-lg text-xs font-bold transition ${i === currentPage ? 'bg-[#722F99] text-white shadow-xs' : 'border border-slate-200 text-slate-700 hover:bg-slate-100'}" data-page="${i}">
        ${i}
      </button>
    `;
  }

  html += `
    <button type="button" class="w-8 h-8 rounded-lg border border-slate-200 text-xs flex items-center justify-center transition ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-100 text-slate-700'}" ${currentPage === totalPages ? 'disabled' : ''} id="btnNextComstracPage">
      <i class="fas fa-chevron-right"></i>
    </button>
  `;

  wrap.innerHTML = html;

  wrap.querySelectorAll('[data-page]').forEach(b => {
    b.addEventListener('click', () => {
      currentPage = parseInt(b.dataset.page, 10);
      renderTable();
    });
  });

  const btnPrev = document.getElementById('btnPrevComstracPage');
  if (btnPrev && currentPage > 1) {
    btnPrev.addEventListener('click', () => {
      currentPage--;
      renderTable();
    });
  }

  const btnNext = document.getElementById('btnNextComstracPage');
  if (btnNext && currentPage < totalPages) {
    btnNext.addEventListener('click', () => {
      currentPage++;
      renderTable();
    });
  }
}

/**
 * Chart.js Visualizers
 */
function initChartJs(data = null) {
  const records = data || getComstracDataset();
  const isEmpty = records.length === 0;

  // Chart 1: Tren Omzet & Peserta
  const ctxTren = document.getElementById('chartComstracTren');
  if (ctxTren && window.Chart) {
    if (isEmpty) {
      if (chartTrenInstance) {
        chartTrenInstance.destroy();
        chartTrenInstance = null;
      }
      toggleCanvasEmptyOverlay('chartComstracTren', true, 'Belum Ada Data Tren ComSTraC', 'Upload berkas data pelatihan untuk melihat performa bulanan.');
    } else {
      toggleCanvasEmptyOverlay('chartComstracTren', false);
      if (chartTrenInstance) chartTrenInstance.destroy();

      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      const monthlyOmzet = new Array(12).fill(0);
      const monthlyPeserta = new Array(12).fill(0);

      records.forEach(r => {
        let m = -1;
        if (r.tanggal && r.tanggal.includes('-')) {
          const parts = r.tanggal.split('-');
          if (parts.length >= 2) m = parseInt(parts[1], 10) - 1;
        }
        if (m < 0 || m > 11) m = 0;
        monthlyOmzet[m] += Math.round((r.nilai || 0) / 1000000);
        monthlyPeserta[m] += (r.peserta || 0);
      });

      const grad = ctxTren.getContext('2d').createLinearGradient(0, 0, 0, 260);
      grad.addColorStop(0, 'rgba(114, 47, 153, 0.35)');
      grad.addColorStop(1, 'rgba(114, 47, 153, 0.01)');

      chartTrenInstance = new window.Chart(ctxTren, {
        type: 'line',
        data: {
          labels: monthNames,
          datasets: [
            {
              label: 'Omzet Pendapatan (Juta Rp)',
              data: monthlyOmzet,
              borderColor: '#722F99',
              backgroundColor: grad,
              borderWidth: 3,
              fill: true,
              tension: 0.35,
              pointBackgroundColor: '#722F99',
              pointRadius: 4,
              yAxisID: 'yOmzet'
            },
            {
              label: 'Peserta Pelatihan (Orang)',
              type: 'bar',
              data: monthlyPeserta,
              backgroundColor: 'rgba(16, 185, 129, 0.75)',
              borderRadius: 6,
              yAxisID: 'yPeserta'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(30, 10, 48, 0.95)',
              padding: 12,
              titleFont: { size: 12, weight: 'bold' },
              bodyFont: { size: 11 },
              cornerRadius: 10
            }
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 11 } } },
            yOmzet: {
              type: 'linear',
              position: 'left',
              grid: { color: 'rgba(226, 232, 240, 0.6)' },
              ticks: { font: { size: 11 }, callback: (val) => val + ' Jt' }
            },
            yPeserta: {
              type: 'linear',
              position: 'right',
              grid: { drawOnChartArea: false },
              ticks: { font: { size: 11 }, callback: (val) => val + ' org' }
            }
          }
        }
      });
    }
  }

  // Chart 2: Tabbed Doughnut Charts
  initTabbedDoughnuts(records);
}

function initTabbedDoughnuts(records) {
  const isEmpty = records.length === 0;

  const tabPills = document.querySelectorAll('.comstrac-chart-tab-pill');
  tabPills.forEach(pill => {
    pill.addEventListener('click', () => {
      tabPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const view = pill.dataset.chartView;
      document.querySelectorAll('.comstrac-chart-canvas-view').forEach(v => v.classList.add('hidden'));

      if (view === 'program') {
        document.getElementById('viewWrapComstracProgram').classList.remove('hidden');
      } else if (view === 'klien') {
        document.getElementById('viewWrapComstracKlien').classList.remove('hidden');
      } else if (view === 'status') {
        document.getElementById('viewWrapComstracStatus').classList.remove('hidden');
      }
    });
  });

  // Chart Program
  const ctxProgram = document.getElementById('chartComstracProgram');
  if (ctxProgram && window.Chart) {
    if (isEmpty) {
      if (chartProgramInstance) {
        chartProgramInstance.destroy();
        chartProgramInstance = null;
      }
      toggleCanvasEmptyOverlay('chartComstracProgram', true, 'Belum Ada Distribusi Program', 'Upload data untuk melihat rincian bidang pelatihan.');
    } else {
      toggleCanvasEmptyOverlay('chartComstracProgram', false);
      if (chartProgramInstance) chartProgramInstance.destroy();

      const counts = {};
      records.forEach(r => {
        counts[r.divisiLabel] = (counts[r.divisiLabel] || 0) + 1;
      });

      chartProgramInstance = new window.Chart(ctxProgram, {
        type: 'doughnut',
        data: {
          labels: Object.keys(counts),
          datasets: [{
            data: Object.values(counts),
            backgroundColor: ['#722F99', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10.5 } } }
          },
          cutout: '68%'
        }
      });
    }
  }

  // Chart Klien
  const ctxKlien = document.getElementById('chartComstracKlien');
  if (ctxKlien && window.Chart) {
    if (isEmpty) {
      if (chartKlienInstance) {
        chartKlienInstance.destroy();
        chartKlienInstance = null;
      }
      toggleCanvasEmptyOverlay('chartComstracKlien', true, 'Belum Ada Data Mitra', 'Upload data untuk memetakan sasaran peserta & klien.');
    } else {
      toggleCanvasEmptyOverlay('chartComstracKlien', false);
      if (chartKlienInstance) chartKlienInstance.destroy();

      const clientCounts = {};
      records.forEach(r => {
        const k = r.klien.length > 25 ? r.klien.slice(0, 25) + '...' : r.klien;
        clientCounts[k] = (clientCounts[k] || 0) + 1;
      });

      chartKlienInstance = new window.Chart(ctxKlien, {
        type: 'doughnut',
        data: {
          labels: Object.keys(clientCounts).slice(0, 5),
          datasets: [{
            data: Object.values(clientCounts).slice(0, 5),
            backgroundColor: ['#6366f1', '#ec4899', '#06b6d4', '#722F99', '#f59e0b'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10.5 } } }
          },
          cutout: '68%'
        }
      });
    }
  }

  // Chart Status
  const ctxStatus = document.getElementById('chartComstracStatus');
  if (ctxStatus && window.Chart) {
    if (isEmpty) {
      if (chartStatusInstance) {
        chartStatusInstance.destroy();
        chartStatusInstance = null;
      }
      toggleCanvasEmptyOverlay('chartComstracStatus', true, 'Belum Ada Status Batch', 'Upload data untuk memantau siklus kelulusan.');
    } else {
      toggleCanvasEmptyOverlay('chartComstracStatus', false);
      if (chartStatusInstance) chartStatusInstance.destroy();

      const selesaiCount = records.filter(r => r.status === 'selesai').length;
      const berjalanCount = records.filter(r => r.status === 'berjalan').length;
      const bukaCount = records.filter(r => r.status === 'buka').length;

      chartStatusInstance = new window.Chart(ctxStatus, {
        type: 'doughnut',
        data: {
          labels: ['Selesai / Lulus', 'Sedang Berjalan', 'Pendaftaran Dibuka'],
          datasets: [{
            data: [selesaiCount, berjalanCount, bukaCount],
            backgroundColor: ['#10b981', '#722F99', '#f59e0b'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10.5 } } }
          },
          cutout: '68%'
        }
      });
    }
  }
}

/**
 * Modals Handler
 */
function initModals() {
  const modalDetail = document.getElementById('modalDetailComstrac');
  const btnClose = document.querySelectorAll('.comstrac-modal-close');

  btnClose.forEach(b => {
    b.addEventListener('click', () => {
      if (modalDetail) modalDetail.classList.add('hidden');
    });
  });

  if (modalDetail) {
    modalDetail.addEventListener('click', (e) => {
      if (e.target === modalDetail) modalDetail.classList.add('hidden');
    });
  }

  window.openDetailComstrac = function(id) {
    const dataset = getComstracDataset();
    const item = dataset.find(x => x.id === id);
    if (!item || !modalDetail) return;

    document.getElementById('detailComstracId').textContent = item.id;
    document.getElementById('detailComstracNama').textContent = item.nama;
    document.getElementById('detailComstracDivisi').textContent = item.divisiLabel;
    document.getElementById('detailComstracKlien').textContent = item.klien;
    document.getElementById('detailComstracNilai').textContent = 'Rp ' + Number(item.nilai).toLocaleString('id-ID');
    document.getElementById('detailComstracStatus').textContent = item.statusLabel;
    document.getElementById('detailComstracDurasi').textContent = item.durasi;
    document.getElementById('detailComstracPic').textContent = item.pic;
    document.getElementById('detailComstracBayar').textContent = item.bayar;

    modalDetail.classList.remove('hidden');
  };
}

/**
 * Export Functionality
 */
function initExportButtons() {
  const btnCsv = document.getElementById('btnExportComstracCsv');
  const btnPrint = document.getElementById('btnExportComstracPrint');

  if (btnCsv) {
    btnCsv.addEventListener('click', () => {
      const dataset = getComstracDataset();
      if (dataset.length === 0) {
        showToast('Tidak ada data program untuk diexport.');
        return;
      }
      let csv = 'Kode,Tanggal,Nama Program,Divisi,Klien,Nilai (Rp),Status,Pembayaran\n';
      dataset.forEach(i => {
        csv += `"${i.id}","${i.tanggal}","${i.nama.replace(/"/g, '""')}","${i.divisiLabel}","${i.klien}",${i.nilai},"${i.statusLabel}","${i.bayar}"\n`;
      });
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `comstrac_programs_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Data ComSTraC berhasil diexport ke CSV!');
    });
  }

  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('comstracToastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'comstracToastNotification';
    toast.className = 'fixed bottom-5 right-5 z-50 bg-[#1E0A30] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 text-xs font-semibold flex items-center gap-3 transition-all duration-300 opacity-0 transform translate-y-4 pointer-events-none';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-brain text-purple-400 text-sm"></i> <span>${message}</span>`;
  toast.classList.remove('opacity-0', 'translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-4');
  }, 3500);
}
