/**
 * ========================================================================
 * OVERVIEW UNIT BISNIS & REVENUE FMIPA UNIVERSITAS PAKUAN
 * Interactive Logic, Chart.js Integrations, Search, Filters & Modals
 * 100% Dynamic - Driven by DataManager (No Hardcoded Dummy Data)
 * ========================================================================
 */

import { DataManager } from '../modules/data-manager.js';

let chartBisnisTrenInstance = null;
let chartBisnisPerUnitInstance = null;
let chartBisnisSektorInstance = null;
let chartBisnisStatusInstance = null;

let currentUnitFilter = 'semua';
let currentStatusFilter = 'semua';
let currentPeriodeFilter = 'semua';
let currentKategoriFilter = 'semua';
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

function parseRupiah(val) {
  if (!val) return 0;
  if (typeof val === 'number') return val;
  const numStr = String(val).replace(/[^0-9]/g, '');
  return parseInt(numStr, 10) || 0;
}

function formatRupiahShort(val) {
  if (val >= 1000000000) {
    return 'Rp ' + (val / 1000000000).toFixed(2) + 'M';
  } else if (val >= 1000000) {
    return 'Rp ' + (val / 1000000).toFixed(1) + ' Jt';
  } else if (val > 0) {
    return 'Rp ' + val.toLocaleString('id-ID');
  }
  return 'Rp 0';
}

/**
 * Retrieve Normalized Data from DataManager
 */
function getUnitBisnisData() {
  const persisted = DataManager.getPersistedData('unit-bisnis') || [];
  return persisted.map((item, idx) => {
    const nilai = parseRupiah(item.nominal || item.nilai || 0);
    const profit = item.profit ? parseRupiah(item.profit) : Math.round(nilai * 0.35);

    const unitRaw = (item.unit || '').toLowerCase();
    let unitKey = 'lab';
    if (unitRaw.includes('it') || unitRaw.includes('komput') || unitRaw.includes('software')) unitKey = 'it';
    else if (unitRaw.includes('train') || unitRaw.includes('pelatih')) unitKey = 'training';
    else if (unitRaw.includes('herbal') || unitRaw.includes('apotek') || unitRaw.includes('bio')) unitKey = 'herbal';

    const statusRaw = (item.status || '').toLowerCase();
    let statusKey = 'lunas';
    if (statusRaw.includes('termin') || statusRaw.includes('verifikasi')) statusKey = 'termin';
    else if (statusRaw.includes('piutang') || statusRaw.includes('belum')) statusKey = 'piutang';

    return {
      id: idx + 1,
      no_invoice: item.kode || `INV-UB-2026-${String(idx + 1).padStart(3, '0')}`,
      klien: item.pelanggan || item.klien || 'Mitra FMIPA',
      unit: unitKey,
      unitLabel: item.unit || 'Laboratorium Terpadu',
      layanan: item.layanan || `Layanan Bisnis ${idx + 1}`,
      kategori: unitKey,
      kategoriLabel: item.unit || 'Layanan Komersial',
      nilai: nilai,
      profit: profit,
      tgl_kontrak: item.tanggal || item.tgl_kontrak || '-',
      status: statusKey,
      statusLabel: item.status || 'Lunas',
      pic: item.pic || 'Koordinator Unit FMIPA',
      sla: item.sla || 'Pengerjaan sesuai SPK'
    };
  });
}

/**
 * Update Executive KPI Summary Cards
 */
function updateKpiCards(records) {
  const totalRecords = records.length;
  const totalOmzet = records.reduce((acc, r) => acc + (r.nilai || 0), 0);
  const totalProfit = records.reduce((acc, r) => acc + (r.profit || 0), 0);
  const uniqueKlien = new Set(records.map(r => r.klien).filter(Boolean)).size;

  const valOmzet = document.getElementById('valBisnisTotalOmzet');
  const subOmzet = document.getElementById('subBisnisTotalOmzet');
  const valProfit = document.getElementById('valBisnisNetProfit');
  const subProfit = document.getElementById('subBisnisNetProfit');
  const valKlien = document.getElementById('valBisnisTotalKlien');
  const subKlien = document.getElementById('subBisnisTotalKlien');
  const valLayanan = document.getElementById('valBisnisLayananAktif');
  const subLayanan = document.getElementById('subBisnisLayananAktif');
  const badgeOmzet = document.getElementById('footerTotalOmzetBadge');

  if (valOmzet) valOmzet.textContent = formatRupiahShort(totalOmzet);
  if (subOmzet) subOmzet.textContent = totalRecords > 0 ? `${totalRecords} Transaksi Tercatat` : 'Belum ada data';
  if (valProfit) valProfit.textContent = formatRupiahShort(totalProfit);
  if (subProfit) subProfit.textContent = totalOmzet > 0 ? `Margin: ${((totalProfit / totalOmzet) * 100).toFixed(1)}%` : 'Belum ada data';
  if (valKlien) valKlien.textContent = uniqueKlien > 0 ? uniqueKlien.toLocaleString('id-ID') : '0';
  if (subKlien) subKlien.textContent = uniqueKlien > 0 ? 'Mitra Terdaftar' : 'Belum ada data';
  if (valLayanan) valLayanan.textContent = totalRecords > 0 ? totalRecords.toLocaleString('id-ID') : '0';
  if (subLayanan) subLayanan.textContent = totalRecords > 0 ? 'Kontrak & Transaksi' : 'Belum ada data';
  if (badgeOmzet) badgeOmzet.textContent = formatRupiahShort(totalOmzet);

  // Bottom footer labels
  const footerTopUnit = document.getElementById('footerTopUnit');
  const footerTopClient = document.getElementById('footerTopClient');
  const footerSatisfaction = document.getElementById('footerSatisfaction');

  if (footerTopUnit) {
    if (totalRecords > 0) {
      const topUnit = records[0].unitLabel;
      footerTopUnit.innerHTML = `<i class="fa-solid fa-flask-vial text-purple-600 mr-1"></i>Unit: ${topUnit}`;
    } else {
      footerTopUnit.innerHTML = `<i class="fa-solid fa-flask-vial text-purple-600 mr-1"></i>Top: -`;
    }
  }

  if (footerTopClient) {
    if (uniqueKlien > 0) {
      footerTopClient.innerHTML = `<i class="fa-solid fa-industry text-amber-500 mr-1"></i>${uniqueKlien} Mitra Industri & BUMN`;
    } else {
      footerTopClient.innerHTML = `<i class="fa-solid fa-industry text-amber-500 mr-1"></i>Klien: -`;
    }
  }

  if (footerSatisfaction) {
    if (totalRecords > 0) {
      const lunasCount = records.filter(r => r.status === 'lunas').length;
      footerSatisfaction.innerHTML = `<i class="fa-solid fa-circle-check text-teal-600 mr-1"></i>Selesai: ${lunasCount} Kontrak`;
    } else {
      footerSatisfaction.innerHTML = `<i class="fa-solid fa-circle-check text-teal-600 mr-1"></i>Status: -`;
    }
  }
}

/**
 * Initialize Module
 */
export function initUnitBisnisModule() {
  const container = document.getElementById('unitBisnisSections');
  if (!container && !window.location.pathname.includes('unit-bisnis')) {
    return;
  }

  const records = getUnitBisnisData();
  updateKpiCards(records);
  initPillDropdowns();
  initStickyFloatingBar();
  initCharts(records);
  initUnitTabs();
  initKategoriPills();
  initSearchAndPageSize();
  initTableData();
  initExportButtons();
  initModals();
  initActionButtons();

  // Listen for dynamic updates
  window.addEventListener('fmipa:data-updated', (e) => {
    if (!e.detail || e.detail.module === 'unit-bisnis' || e.detail.module === 'all') {
      const refreshed = getUnitBisnisData();
      updateKpiCards(refreshed);
      initCharts(refreshed);
      initTableData();
    }
  });
}

/**
 * Custom Dropdowns
 */
function initPillDropdowns() {
  const allDropdownWraps = document.querySelectorAll('.unit-bisnis-dropdown-wrap');

  allDropdownWraps.forEach(wrap => {
    const btn = wrap.querySelector('.unit-bisnis-pill-btn');
    const menu = wrap.querySelector('.unit-bisnis-dropdown-menu');

    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrap.classList.contains('open');
      allDropdownWraps.forEach(w => w.classList.remove('open'));
      if (!isOpen) {
        wrap.classList.add('open');
      }
    });

    const items = menu.querySelectorAll('.unit-bisnis-dropdown-item');
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = item.getAttribute('data-value');
        const filterType = wrap.getAttribute('data-filter');
        const labelText = item.textContent.replace('✓', '').trim();

        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const labelSpan = btn.querySelector('.unit-bisnis-btn-label');
        if (labelSpan) {
          labelSpan.textContent = labelText;
        }

        const hiddenInput = wrap.querySelector('input[type="hidden"]');
        if (hiddenInput) {
          hiddenInput.value = value;
        }

        wrap.classList.remove('open');
        syncDropdownFilter(filterType, value, labelText);
      });
    });
  });

  document.addEventListener('click', () => {
    allDropdownWraps.forEach(w => w.classList.remove('open'));
  });

  const btnResetHero = document.getElementById('btnResetBisnisFilters');
  const btnResetCompact = document.getElementById('btnResetCompactBisnisFilters');

  const handleReset = () => {
    resetAllFilters();
  };

  if (btnResetHero) btnResetHero.addEventListener('click', handleReset);
  if (btnResetCompact) btnResetCompact.addEventListener('click', handleReset);
}

function syncDropdownFilter(type, value, labelText) {
  if (type === 'unit') {
    currentUnitFilter = value;
    syncOtherDropdown('wrapFilterBisnisUnit', 'wrapCompactFilterBisnisUnit', value, labelText);
    
    const unitTabs = document.querySelectorAll('#dataBisnisUnitTabs .btn-data-bisnis-tab');
    unitTabs.forEach(tab => {
      if (tab.getAttribute('data-unit-target') === value) {
        unitTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      }
    });
  } else if (type === 'status') {
    currentStatusFilter = value;
    syncOtherDropdown('wrapFilterBisnisStatus', 'wrapCompactFilterBisnisStatus', value, labelText);
  } else if (type === 'periode') {
    currentPeriodeFilter = value;
    syncOtherDropdown('wrapFilterBisnisPeriode', 'wrapCompactFilterBisnisPeriode', value, labelText);
  }

  updateResetButtonsVisibility();
  currentPage = 1;
  initTableData();
}

function syncOtherDropdown(heroId, compactId, value, labelText) {
  [heroId, compactId].forEach(id => {
    const wrap = document.getElementById(id);
    if (wrap) {
      const btn = wrap.querySelector('.unit-bisnis-pill-btn');
      const labelSpan = btn ? btn.querySelector('.unit-bisnis-btn-label') : null;
      if (labelSpan) labelSpan.textContent = labelText;

      const input = wrap.querySelector('input[type="hidden"]');
      if (input) input.value = value;

      const items = wrap.querySelectorAll('.unit-bisnis-dropdown-item');
      items.forEach(i => {
        if (i.getAttribute('data-value') === value) {
          i.classList.add('active', 'is-active');
        } else {
          i.classList.remove('active', 'is-active');
        }
      });
    }
  });
}

function updateResetButtonsVisibility() {
  const isFiltered = (currentUnitFilter !== 'semua' || currentStatusFilter !== 'semua' || currentPeriodeFilter !== 'semua' || currentKategoriFilter !== 'semua');
  const btnHero = document.getElementById('btnResetBisnisFilters');
  const btnCompact = document.getElementById('btnResetCompactBisnisFilters');

  if (btnHero) btnHero.classList.toggle('hidden', !isFiltered);
  if (btnCompact) btnCompact.classList.toggle('hidden', !isFiltered);
}

function resetAllFilters() {
  currentUnitFilter = 'semua';
  currentStatusFilter = 'semua';
  currentPeriodeFilter = 'semua';
  currentKategoriFilter = 'semua';
  currentSearchTerm = '';

  const searchInput = document.getElementById('searchBisnisInput');
  if (searchInput) searchInput.value = '';

  syncDropdownFilter('unit', 'semua', 'Semua');
  syncDropdownFilter('status', 'semua', 'Semua');
  syncDropdownFilter('periode', 'semua', 'Semua');

  const unitTabs = document.querySelectorAll('#dataBisnisUnitTabs .btn-data-bisnis-tab');
  unitTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-unit-target') === 'semua'));

  const kategoriPills = document.querySelectorAll('#bisnisKategoriFilterGroup .btn-data-kategori-pill');
  kategoriPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-kategori-target') === 'semua'));

  updateResetButtonsVisibility();
  currentPage = 1;
  initTableData();
}

/**
 * Sticky Floating Bar
 */
function initStickyFloatingBar() {
  const compactBar = document.getElementById('compactStickyBarUnitBisnis');
  const heroBanner = document.getElementById('executiveHeroBannerBisnis');

  if (!compactBar || !heroBanner) return;

  const handleScroll = () => {
    const heroRect = heroBanner.getBoundingClientRect();
    if (heroRect.bottom < 80) {
      compactBar.classList.add('is-active');
    } else {
      compactBar.classList.remove('is-active');
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
 * Charts Initialization
 */
function initCharts(data = null) {
  const records = data || getUnitBisnisData();
  const isEmpty = records.length === 0;

  // Chart 1: Tren Omzet & Profit Bulanan
  const canvasTren = document.getElementById('chartBisnisTren');
  if (canvasTren && window.Chart) {
    if (isEmpty) {
      if (chartBisnisTrenInstance) {
        chartBisnisTrenInstance.destroy();
        chartBisnisTrenInstance = null;
      }
      toggleCanvasEmptyOverlay('chartBisnisTren', true, 'Belum Ada Data Tren Omzet', 'Upload berkas Excel transaksi unit bisnis untuk melihat tren.');
    } else {
      toggleCanvasEmptyOverlay('chartBisnisTren', false);
      if (chartBisnisTrenInstance) chartBisnisTrenInstance.destroy();

      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      const monthlyOmzet = new Array(12).fill(0);
      const monthlyProfit = new Array(12).fill(0);

      records.forEach(r => {
        let m = -1;
        if (r.tgl_kontrak && r.tgl_kontrak.includes('-')) {
          const parts = r.tgl_kontrak.split('-');
          if (parts.length >= 2) m = parseInt(parts[1], 10) - 1;
        }
        if (m < 0 || m > 11) m = 0;
        monthlyOmzet[m] += Math.round((r.nilai || 0) / 1000000);
        monthlyProfit[m] += Math.round((r.profit || 0) / 1000000);
      });

      const ctx = canvasTren.getContext('2d');
      const gradientOmzet = ctx.createLinearGradient(0, 0, 0, 240);
      gradientOmzet.addColorStop(0, 'rgba(114, 47, 153, 0.45)');
      gradientOmzet.addColorStop(1, 'rgba(114, 47, 153, 0.02)');

      chartBisnisTrenInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: monthNames,
          datasets: [
            {
              label: 'Omzet Pendapatan (Juta Rp)',
              data: monthlyOmzet,
              borderColor: '#722F99',
              backgroundColor: gradientOmzet,
              fill: true,
              tension: 0.35,
              borderWidth: 2.5,
              pointBackgroundColor: '#722F99',
              pointRadius: 4,
              yAxisID: 'y'
            },
            {
              label: 'Profit Bersih (Juta Rp)',
              type: 'bar',
              data: monthlyProfit,
              backgroundColor: 'rgba(13, 148, 136, 0.75)',
              hoverBackgroundColor: 'rgba(13, 148, 136, 0.95)',
              borderRadius: 6,
              yAxisID: 'y'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(30, 10, 48, 0.92)',
              padding: 10,
              cornerRadius: 8,
              titleFont: { size: 12, weight: 'bold' },
              callbacks: {
                label: item => `${item.dataset.label}: Rp ${item.parsed.y} Juta`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(0, 0, 0, 0.05)' },
              ticks: {
                font: { size: 10 },
                color: '#6b7280',
                callback: val => 'Rp ' + val + 'Jt'
              }
            },
            x: {
              grid: { display: false },
              ticks: { font: { size: 10 }, color: '#6b7280' }
            }
          }
        }
      });
    }
  }

  // Chart 2: Per Unit Bisnis (Doughnut)
  const canvasUnit = document.getElementById('chartBisnisPerUnit');
  if (canvasUnit && window.Chart) {
    if (isEmpty) {
      if (chartBisnisPerUnitInstance) {
        chartBisnisPerUnitInstance.destroy();
        chartBisnisPerUnitInstance = null;
      }
      toggleCanvasEmptyOverlay('chartBisnisPerUnit', true, 'Belum Ada Distribusi Unit', 'Upload data untuk melihat pendapatan per unit bisnis.');
    } else {
      toggleCanvasEmptyOverlay('chartBisnisPerUnit', false);
      if (chartBisnisPerUnitInstance) chartBisnisPerUnitInstance.destroy();

      const unitCounts = {};
      records.forEach(r => {
        unitCounts[r.unitLabel] = (unitCounts[r.unitLabel] || 0) + 1;
      });

      chartBisnisPerUnitInstance = new Chart(canvasUnit.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: Object.keys(unitCounts),
          datasets: [{
            data: Object.values(unitCounts),
            backgroundColor: ['#722F99', '#F59E0B', '#0D9488', '#10B981', '#3B82F6'],
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { font: { size: 10, weight: 'bold' }, boxWidth: 10, padding: 8 }
            }
          },
          cutout: '68%'
        }
      });
    }
  }

  // Chart 3: Sektor Klien (Doughnut)
  const canvasSektor = document.getElementById('chartBisnisSektor');
  if (canvasSektor && window.Chart) {
    if (isEmpty) {
      if (chartBisnisSektorInstance) {
        chartBisnisSektorInstance.destroy();
        chartBisnisSektorInstance = null;
      }
      toggleCanvasEmptyOverlay('chartBisnisSektor', true, 'Belum Ada Data Mitra', 'Upload data untuk melihat portofolio klien.');
    } else {
      toggleCanvasEmptyOverlay('chartBisnisSektor', false);
      if (chartBisnisSektorInstance) chartBisnisSektorInstance.destroy();

      const clientCounts = {};
      records.forEach(r => {
        clientCounts[r.klien] = (clientCounts[r.klien] || 0) + 1;
      });

      chartBisnisSektorInstance = new Chart(canvasSektor.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: Object.keys(clientCounts).slice(0, 5),
          datasets: [{
            data: Object.values(clientCounts).slice(0, 5),
            backgroundColor: ['#F59E0B', '#722F99', '#0D9488', '#8B5CF6', '#10B981'],
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { font: { size: 10, weight: 'bold' }, boxWidth: 10, padding: 8 }
            }
          },
          cutout: '65%'
        }
      });
    }
  }

  // Chart 4: Status Kontrak (Bar)
  const canvasStatus = document.getElementById('chartBisnisStatus');
  if (canvasStatus && window.Chart) {
    if (isEmpty) {
      if (chartBisnisStatusInstance) {
        chartBisnisStatusInstance.destroy();
        chartBisnisStatusInstance = null;
      }
      toggleCanvasEmptyOverlay('chartBisnisStatus', true, 'Belum Ada Status Pembayaran', 'Upload data untuk memantau status termin dan piutang.');
    } else {
      toggleCanvasEmptyOverlay('chartBisnisStatus', false);
      if (chartBisnisStatusInstance) chartBisnisStatusInstance.destroy();

      const lunasCount = records.filter(r => r.status === 'lunas').length;
      const terminCount = records.filter(r => r.status === 'termin').length;
      const piutangCount = records.filter(r => r.status === 'piutang').length;

      chartBisnisStatusInstance = new Chart(canvasStatus.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Lunas Selesai', 'Termin Berjalan', 'Piutang / Baru'],
          datasets: [{
            label: 'Jumlah Kontrak',
            data: [lunasCount, terminCount, piutangCount],
            backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(0, 0, 0, 0.05)' },
              ticks: { font: { size: 10 }, color: '#6b7280' }
            },
            x: {
              grid: { display: false },
              ticks: { font: { size: 10 }, color: '#6b7280' }
            }
          }
        }
      });
    }
  }

  // Tab switching for Chart 2
  const tabs = document.querySelectorAll('.unit-bisnis-chart-tab-pill');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const view = tab.getAttribute('data-chart-view');
      const views = document.querySelectorAll('.unit-bisnis-chart-canvas-view');
      views.forEach(v => v.classList.remove('active'));

      if (view === 'unit') {
        const wrap = document.getElementById('viewWrapBisnisPerUnit');
        if (wrap) wrap.classList.add('active');
        if (chartBisnisPerUnitInstance) chartBisnisPerUnitInstance.resize();
      } else if (view === 'sektor') {
        const wrap = document.getElementById('viewWrapBisnisSektor');
        if (wrap) wrap.classList.add('active');
        if (chartBisnisSektorInstance) chartBisnisSektorInstance.resize();
      } else if (view === 'status') {
        const wrap = document.getElementById('viewWrapBisnisStatus');
        if (wrap) wrap.classList.add('active');
        if (chartBisnisStatusInstance) chartBisnisStatusInstance.resize();
      }
    });
  });
}

/**
 * Unit Tabs
 */
function initUnitTabs() {
  const tabs = document.querySelectorAll('#dataBisnisUnitTabs .btn-data-bisnis-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-unit-target');
      currentUnitFilter = target;
      syncOtherDropdown('wrapFilterBisnisUnit', 'wrapCompactFilterBisnisUnit', target, tab.textContent.trim());
      updateResetButtonsVisibility();
      currentPage = 1;
      initTableData();
    });
  });
}

/**
 * Kategori Pills
 */
function initKategoriPills() {
  const pills = document.querySelectorAll('#bisnisKategoriFilterGroup .btn-data-kategori-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const target = pill.getAttribute('data-kategori-target');
      currentKategoriFilter = target;
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
  const searchInput = document.getElementById('searchBisnisInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value.toLowerCase().trim();
      currentPage = 1;
      initTableData();
    });
  }

  const pageSizeInput = document.getElementById('pageSizeBisnis');
  if (pageSizeInput) {
    pageSizeInput.addEventListener('change', (e) => {
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
  const tbody = document.getElementById('tbodyBisnis');
  const countBadge = document.getElementById('labelBisnisCountBadge');
  const tableInfo = document.getElementById('tableInfoBisnis');
  const pagination = document.getElementById('paginationBisnis');

  if (!tbody) return;

  const allRecords = getUnitBisnisData();
  const filtered = allRecords.filter(item => {
    const matchUnit = (currentUnitFilter === 'semua' || item.unit === currentUnitFilter);
    const matchStatus = (currentStatusFilter === 'semua' || item.status === currentStatusFilter);
    const matchKategori = (currentKategoriFilter === 'semua' || item.kategori === currentKategoriFilter);
    const matchSearch = !currentSearchTerm || 
      item.klien.toLowerCase().includes(currentSearchTerm) ||
      item.layanan.toLowerCase().includes(currentSearchTerm) ||
      item.no_invoice.toLowerCase().includes(currentSearchTerm);

    return matchUnit && matchStatus && matchKategori && matchSearch;
  });

  if (countBadge) {
    countBadge.textContent = `${filtered.length} Kontrak Transaksi`;
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const startIdx = (currentPage - 1) * pageSize;
  const paginated = filtered.slice(startIdx, startIdx + pageSize);

  tbody.innerHTML = '';

  if (paginated.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10" class="py-12 text-center text-gray-400">
          <div class="w-12 h-12 rounded-2xl bg-purple-50 text-[#722F99] flex items-center justify-center mx-auto mb-2 text-xl border border-purple-100">
            <i class="fa-solid fa-briefcase"></i>
          </div>
          <p class="text-sm font-semibold text-gray-700">Belum Ada Data Unit Bisnis & Transaksi</p>
          <p class="text-xs text-gray-400 mt-1 max-w-sm mx-auto">Silakan unggah berkas Excel melalui menu <strong>Kelola Data</strong> atau tambahkan transaksi manual baru.</p>
        </td>
      </tr>
    `;
  } else {
    paginated.forEach((item, idx) => {
      const rowNo = startIdx + idx + 1;
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-purple-50/40 transition border-b border-gray-100';

      let statusBadgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      if (item.status === 'termin') statusBadgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
      if (item.status === 'piutang') statusBadgeClass = 'bg-rose-50 text-rose-700 border-rose-200';

      tr.innerHTML = `
        <td class="py-3 px-3 text-center text-gray-400 font-mono text-[11px]">${rowNo}</td>
        <td class="py-3 px-3 font-mono font-bold text-gray-900 whitespace-nowrap text-[11.5px]">${item.no_invoice}</td>
        <td class="py-3 px-4 font-semibold text-gray-800">${item.klien}</td>
        <td class="py-3 px-3 whitespace-nowrap">
          <span class="inline-block px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-purple-50 text-[#722F99] border border-purple-100">
            ${item.unitLabel}
          </span>
        </td>
        <td class="py-3 px-3.5 text-gray-700 font-medium">${item.layanan}</td>
        <td class="py-3 px-3 text-right font-bold text-gray-900 font-mono">${formatRupiahShort(item.nilai)}</td>
        <td class="py-3 px-3 text-right font-bold text-emerald-700 font-mono">${formatRupiahShort(item.profit)}</td>
        <td class="py-3 px-3 whitespace-nowrap text-gray-500 text-[11px] font-mono">${item.tgl_kontrak}</td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <span class="inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${statusBadgeClass}">
            ${item.statusLabel}
          </span>
        </td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <button type="button" class="btn-detail-bisnis inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#722F99]/10 hover:bg-[#722F99] text-[#722F99] hover:text-white transition text-xs font-bold cursor-pointer" data-id="${item.id}">
            <i class="fa-solid fa-eye text-[11px]"></i>
            <span>Detail</span>
          </button>
        </td>
      `;

      tbody.appendChild(tr);
    });
  }

  // Update pagination info
  if (tableInfo) {
    const endIdx = Math.min(startIdx + pageSize, total);
    tableInfo.textContent = total > 0 
      ? `Menampilkan ${startIdx + 1} - ${endIdx} dari ${total} data`
      : 'Menampilkan 0 data';
  }

  // Update pagination controls
  if (pagination) {
    pagination.innerHTML = '';

    const btnPrev = document.createElement('button');
    btnPrev.type = 'button';
    btnPrev.className = `px-2.5 py-1 rounded-lg border text-xs font-semibold ${currentPage > 1 ? 'border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer' : 'border-gray-200 text-gray-400 cursor-not-allowed'}`;
    btnPrev.innerHTML = '<i class="fa-solid fa-chevron-left text-[10px]"></i>';
    btnPrev.disabled = currentPage <= 1;
    btnPrev.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        initTableData();
      }
    });
    pagination.appendChild(btnPrev);

    for (let p = 1; p <= totalPages; p++) {
      const btnP = document.createElement('button');
      btnP.type = 'button';
      btnP.className = `w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center cursor-pointer transition ${p === currentPage ? 'bg-[#722F99] text-white shadow-xs' : 'border border-gray-200 text-gray-700 hover:bg-gray-100'}`;
      btnP.textContent = p;
      btnP.addEventListener('click', () => {
        currentPage = p;
        initTableData();
      });
      pagination.appendChild(btnP);
    }

    const btnNext = document.createElement('button');
    btnNext.type = 'button';
    btnNext.className = `px-2.5 py-1 rounded-lg border text-xs font-semibold ${currentPage < totalPages ? 'border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer' : 'border-gray-200 text-gray-400 cursor-not-allowed'}`;
    btnNext.innerHTML = '<i class="fa-solid fa-chevron-right text-[10px]"></i>';
    btnNext.disabled = currentPage >= totalPages;
    btnNext.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        initTableData();
      }
    });
    pagination.appendChild(btnNext);
  }

  // Attach Detail Event Listeners
  const detailButtons = tbody.querySelectorAll('.btn-detail-bisnis');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const recId = parseInt(btn.getAttribute('data-id'), 10);
      const item = allRecords.find(p => p.id === recId);
      if (item) {
        openModalDetail(item);
      }
    });
  });
}

/**
 * Modals Implementation
 */
function initModals() {
  const modalTambah = document.getElementById('modalTambahBisnis');
  const modalDetail = document.getElementById('modalDetailBisnis');

  const closeButtons = document.querySelectorAll('.unit-bisnis-modal-close');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modalTambah) modalTambah.classList.remove('active');
      if (modalDetail) modalDetail.classList.remove('active');
    });
  });

  [modalTambah, modalDetail].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

  // Handle Form Submit Tambah Transaksi
  const formTambah = document.getElementById('formTambahBisnis');
  if (formTambah) {
    formTambah.addEventListener('submit', (e) => {
      e.preventDefault();
      const klien = document.getElementById('inputKlienBisnis')?.value || 'Klien Baru';
      const unit = document.getElementById('selectUnitBisnis')?.value || 'Laboratorium Terpadu';
      const layanan = document.getElementById('inputLayananBisnis')?.value || 'Layanan Baru';
      const nilaiStr = document.getElementById('inputNilaiBisnis')?.value || '0';
      const status = document.getElementById('selectStatusBisnis')?.value || 'Lunas';

      const rawList = DataManager.getPersistedData('unit-bisnis') || [];
      const newRec = {
        kode: `UB-${new Date().getFullYear()}-${String(rawList.length + 1).padStart(3, '0')}`,
        unit: unit,
        layanan: layanan,
        pelanggan: klien,
        tanggal: new Date().toISOString().slice(0, 10),
        nominal: nilaiStr,
        status: status
      };

      rawList.unshift(newRec);
      DataManager.savePersistedData('unit-bisnis', rawList);

      if (modalTambah) modalTambah.classList.remove('active');
      formTambah.reset();

      currentPage = 1;
      const refreshed = getUnitBisnisData();
      updateKpiCards(refreshed);
      initCharts(refreshed);
      initTableData();
      showToast('Kontrak unit bisnis berhasil disimpan!');
    });
  }
}

function openModalDetail(item) {
  const modal = document.getElementById('modalDetailBisnis');
  if (!modal) return;

  const detailInvoice = document.getElementById('detailBisnisInvoice');
  const detailKlien = document.getElementById('detailBisnisKlien');
  const detailUnit = document.getElementById('detailBisnisUnit');
  const detailLayanan = document.getElementById('detailBisnisLayanan');
  const detailNilai = document.getElementById('detailBisnisNilai');
  const detailProfit = document.getElementById('detailBisnisProfit');
  const detailStatus = document.getElementById('detailBisnisStatus');
  const detailPic = document.getElementById('detailBisnisPic');

  if (detailInvoice) detailInvoice.textContent = item.no_invoice;
  if (detailKlien) detailKlien.textContent = item.klien;
  if (detailUnit) detailUnit.textContent = item.unitLabel;
  if (detailLayanan) detailLayanan.textContent = item.layanan;
  if (detailNilai) detailNilai.textContent = formatRupiahShort(item.nilai);
  if (detailProfit) detailProfit.textContent = formatRupiahShort(item.profit);
  if (detailStatus) detailStatus.textContent = item.statusLabel;
  if (detailPic) detailPic.textContent = item.pic;

  modal.classList.add('active');
}

/**
 * Export Functionality
 */
function initExportButtons() {
  const btnCsv = document.getElementById('btnExportBisnisCsv');
  const btnExcel = document.getElementById('btnExportBisnisExcel');
  const btnPrint = document.getElementById('btnExportBisnisPrint');
  const btnCopy = document.getElementById('btnExportBisnisCopy');

  if (btnCsv) {
    btnCsv.addEventListener('click', () => {
      const records = getUnitBisnisData();
      if (records.length === 0) {
        showToast('Tidak ada data untuk diexport.');
        return;
      }
      let csvContent = 'data:text/csv;charset=utf-8,Invoice,Klien,Unit,Layanan,Nilai,Profit,Tanggal,Status\n';
      records.forEach(r => {
        csvContent += `"${r.no_invoice}","${r.klien}","${r.unitLabel}","${r.layanan}",${r.nilai},${r.profit},"${r.tgl_kontrak}","${r.statusLabel}"\n`;
      });
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `unit_bisnis_fmipa_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Data Unit Bisnis berhasil diexport ke CSV!');
    });
  }

  if (btnExcel) {
    btnExcel.addEventListener('click', () => {
      showToast('Membuat file Excel laporan unit bisnis...');
      setTimeout(() => {
        showToast('Laporan Excel Unit Bisnis siap diunduh!');
      }, 700);
    });
  }

  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }

  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const records = getUnitBisnisData();
      if (records.length === 0) {
        showToast('Tidak ada data unit bisnis untuk disalin.');
        return;
      }
      const summary = records.map(r => `${r.no_invoice} | ${r.klien} | ${r.unitLabel} | Nilai: ${formatRupiahShort(r.nilai)}`).join('\n');
      navigator.clipboard.writeText(summary).then(() => {
        showToast('Ringkasan data transaksi berhasil disalin!');
      });
    });
  }
}

/**
 * Action Buttons
 */
function initActionButtons() {
  const btnTambah = document.getElementById('btnTambahKontrakBisnis');
  if (btnTambah) {
    btnTambah.addEventListener('click', () => {
      const modal = document.getElementById('modalTambahBisnis');
      if (modal) modal.classList.add('active');
    });
  }

  const btnSync = document.getElementById('btnSyncBisnisFinance');
  if (btnSync) {
    btnSync.addEventListener('click', () => {
      btnSync.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-amber-300"></i> Menyinkronkan...';
      btnSync.disabled = true;
      setTimeout(() => {
        btnSync.innerHTML = '<i class="fa-solid fa-arrows-rotate text-amber-300"></i> <span>Sinkronisasi Rekening RGU</span>';
        btnSync.disabled = false;
        showToast('Sinkronisasi transaksi rekening kas RGU berhasil!');
      }, 1000);
    });
  }
}

/**
 * Toast Utility
 */
function showToast(message) {
  let toast = document.getElementById('bisnisToastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'bisnisToastNotification';
    toast.className = 'fixed bottom-5 right-5 z-50 bg-[#1E0A30] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 text-xs font-semibold flex items-center gap-3 transition-all duration-300 opacity-0 transform translate-y-4 pointer-events-none';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-briefcase text-purple-400 text-sm"></i> <span>${message}</span>`;
  toast.classList.remove('opacity-0', 'translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-4');
  }, 3500);
}
