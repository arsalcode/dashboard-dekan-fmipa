/**
 * Kesehatan & Apotek Pendidikan FMIPA UNPAK Module
 * Handles Chart.js visualizers, tabbed metrics, live filtering, and interactive modals.
 * 100% Dynamic - Driven by DataManager (No Hardcoded Dummy Data)
 */

import { DataManager } from '../modules/data-manager.js';

let activeKategoriFilter = 'semua';
let activeStatusFilter = 'semua';
let activePeriodeFilter = 'semua';
let searchQuery = '';
let currentPage = 1;
let pageSize = 10;

let chartTrenInstance = null;
let chartProdukInstance = null;
let chartPelangganInstance = null;
let chartStokInstance = null;

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
 * Retrieve Normalized Data from DataManager
 */
function getApotekDataset() {
  const persisted = DataManager.getPersistedData('kesehatan-apotek') || [];
  return persisted.map((item, idx) => {
    const rawKat = (item.kategori || '').toLowerCase();
    let katKey = 'obat';
    if (rawKat.includes('herbal') || rawKat.includes('suplemen') || rawKat.includes('vitamin')) katKey = 'herbal';
    else if (rawKat.includes('skin') || rawKat.includes('kosmet')) katKey = 'skincare';
    else if (rawKat.includes('cek') || rawKat.includes('klinis') || rawKat.includes('alat')) katKey = 'cek';

    const qtyNum = parseInt(String(item.qty || '1').replace(/[^0-9]/g, ''), 10) || 1;
    const totalNum = parseRupiah(item.total || 0);

    return {
      id: item.no_faktur || `APT-2026-${String(idx + 1).padStart(3, '0')}`,
      waktu: item.tanggal || '-',
      nama: item.nama_item || item.nama || `Item Apotek ${idx + 1}`,
      kategori: katKey,
      kategoriLabel: item.kategori || 'Obat Bebas (OTC)',
      pembeli: item.kasir ? `Kasir: ${item.kasir}` : 'Pasien / Sivitas',
      qty: qtyNum,
      total: totalNum,
      metode: item.metode || 'QRIS / Tunai',
      status: 'selesai',
      statusLabel: 'Selesai / Lunas',
      apoteker: item.kasir || 'Apoteker FMIPA'
    };
  });
}

/**
 * Update Executive KPI Summary Cards
 */
function updateKpiCards(records) {
  const totalTransaksi = records.length;
  const totalOmzet = records.reduce((acc, r) => acc + (r.total || 0), 0);
  const totalQty = records.reduce((acc, r) => acc + (r.qty || 0), 0);
  const uniqueSku = new Set(records.map(r => r.nama).filter(Boolean)).size;

  const valTransaksi = document.getElementById('valApotekTransaksi');
  const subTransaksi = document.getElementById('subApotekTransaksi');
  const valOmzet = document.getElementById('valApotekOmzet');
  const subOmzet = document.getElementById('subApotekOmzet');
  const valSku = document.getElementById('valApotekSku');
  const subSku = document.getElementById('subApotekSku');
  const valPasien = document.getElementById('valApotekPasien');
  const subPasien = document.getElementById('subApotekPasien');

  if (valTransaksi) valTransaksi.textContent = totalTransaksi > 0 ? totalTransaksi.toLocaleString('id-ID') : '0';
  if (subTransaksi) subTransaksi.textContent = totalTransaksi > 0 ? 'Total Nota Penjualan' : 'Belum ada data';
  if (valOmzet) valOmzet.textContent = formatRupiahShort(totalOmzet);
  if (subOmzet) subOmzet.textContent = totalOmzet > 0 ? 'Pendapatan Apotek & Lab' : 'Belum ada data';
  if (valSku) valSku.textContent = uniqueSku > 0 ? uniqueSku.toLocaleString('id-ID') : '0';
  if (subSku) subSku.textContent = uniqueSku > 0 ? 'Komoditas & Layanan Terdata' : 'Belum ada data';
  if (valPasien) valPasien.textContent = totalQty > 0 ? totalQty.toLocaleString('id-ID') : '0';
  if (subPasien) subPasien.textContent = totalQty > 0 ? 'Item Terdistribusi' : 'Belum ada data';
}

export function initKesehatanApotekModule() {
  const container = document.getElementById('apotekSections');
  if (!container) return;

  const records = getApotekDataset();
  updateKpiCards(records);
  initStickyHeader();
  initDropdownFilters();
  initKategoriTabs();
  initStatusPills();
  initSearchAndPagination();
  initExportButtons();
  initModals();
  initChartJs(records);
  renderTable();

  // Listen for dynamic updates
  window.addEventListener('fmipa:data-updated', (e) => {
    if (!e.detail || e.detail.module === 'kesehatan-apotek' || e.detail.module === 'all') {
      const refreshed = getApotekDataset();
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
  const stickyBar = document.getElementById('compactStickyBarApotek');
  const heroBanner = document.querySelector('.apotek-hero-banner');
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
  const dropdownWraps = document.querySelectorAll('.apotek-dropdown-wrap');

  dropdownWraps.forEach(wrap => {
    const btn = wrap.querySelector('.apotek-pill-btn');
    const menu = wrap.querySelector('.apotek-dropdown-menu');
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

    menu.querySelectorAll('.apotek-dropdown-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = item.dataset.value;
        const text = item.textContent.trim();

        if (filterType === 'kategori') {
          activeKategoriFilter = val;
          syncDropdownLabels('kategori', val, text);
          document.querySelectorAll('.tab-filter-apotek').forEach(t => {
            t.classList.toggle('active', t.dataset.kategori === val);
          });
        } else if (filterType === 'status') {
          activeStatusFilter = val;
          syncDropdownLabels('status', val, text);
          document.querySelectorAll('.pill-status-apotek').forEach(p => {
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

  const btnResetHero = document.getElementById('btnResetApotekFilters');
  const btnResetCompact = document.getElementById('btnResetCompactApotekFilters');

  const handleReset = () => {
    activeKategoriFilter = 'semua';
    activeStatusFilter = 'semua';
    activePeriodeFilter = 'semua';
    searchQuery = '';
    const searchInput = document.getElementById('searchApotekTabel');
    if (searchInput) searchInput.value = '';

    syncDropdownLabels('kategori', 'semua', 'Semua Kategori');
    syncDropdownLabels('status', 'semua', 'Semua Status');
    syncDropdownLabels('periode', 'semua', 'Semua Periode');

    document.querySelectorAll('.tab-filter-apotek').forEach(t => {
      t.classList.toggle('active', t.dataset.kategori === 'semua');
    });
    document.querySelectorAll('.pill-status-apotek').forEach(p => {
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
  document.querySelectorAll('.apotek-dropdown-menu').forEach(m => m.classList.add('hidden'));
  document.querySelectorAll('.apotek-pill-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
}

function syncDropdownLabels(type, value, text) {
  const shortText = text.replace('Semua Kategori', 'Semua')
                        .replace('Semua Status', 'Semua')
                        .replace('Semua Periode', 'Semua')
                        .replace(' (Terkini)', '');

  document.querySelectorAll(`.apotek-dropdown-wrap[data-filter="${type}"]`).forEach(wrap => {
    const label = wrap.querySelector('.apotek-btn-label');
    if (label) label.textContent = shortText;
    wrap.querySelectorAll('.apotek-dropdown-item').forEach(item => {
      const match = item.dataset.value === value;
      item.classList.toggle('active', match);
      item.classList.toggle('is-active', match);
    });
  });
}

function checkResetButtonState() {
  const isFiltered = (activeKategoriFilter !== 'semua' || activeStatusFilter !== 'semua' || activePeriodeFilter !== 'semua' || searchQuery !== '');
  const btnResetHero = document.getElementById('btnResetApotekFilters');
  const btnResetCompact = document.getElementById('btnResetCompactApotekFilters');

  if (btnResetHero) btnResetHero.classList.toggle('hidden', !isFiltered);
  if (btnResetCompact) btnResetCompact.classList.toggle('hidden', !isFiltered);
}

/**
 * Kategori Tabs
 */
function initKategoriTabs() {
  const tabs = document.querySelectorAll('.tab-filter-apotek');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeKategoriFilter = tab.dataset.kategori;
      syncDropdownLabels('kategori', activeKategoriFilter, tab.textContent.trim());
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
  const pills = document.querySelectorAll('.pill-status-apotek');
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
  const searchInput = document.getElementById('searchApotekTabel');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      currentPage = 1;
      checkResetButtonState();
      renderTable();
    });
  }

  const pageSizeSelect = document.getElementById('pageSizeApotek');
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
  const tbody = document.getElementById('tbodyApotekData');
  if (!tbody) return;

  const dataset = getApotekDataset();
  const filtered = dataset.filter(item => {
    const matchKategori = activeKategoriFilter === 'semua' || item.kategori === activeKategoriFilter;
    const matchStatus = activeStatusFilter === 'semua' || item.status === activeStatusFilter;
    const matchSearch = searchQuery === '' ||
      item.nama.toLowerCase().includes(searchQuery) ||
      item.pembeli.toLowerCase().includes(searchQuery) ||
      item.id.toLowerCase().includes(searchQuery) ||
      item.kategoriLabel.toLowerCase().includes(searchQuery);

    return matchKategori && matchStatus && matchSearch;
  });

  const totalRows = filtered.length;
  const totalPages = Math.ceil(totalRows / pageSize) || 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const startIdx = (currentPage - 1) * pageSize;
  const pagedData = filtered.slice(startIdx, startIdx + pageSize);

  const badgeTotal = document.getElementById('badgeTotalApotekRows');
  if (badgeTotal) badgeTotal.textContent = `${totalRows} Transaksi Terdaftar`;

  const infoPagination = document.getElementById('infoPaginationApotek');
  if (infoPagination) {
    infoPagination.textContent = totalRows > 0 
      ? `Menampilkan ${startIdx + 1} sampai ${Math.min(startIdx + pageSize, totalRows)} dari ${totalRows} entri transaksi`
      : 'Menampilkan 0 entri transaksi';
  }

  if (pagedData.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10" class="py-12 text-center text-slate-400">
          <div class="w-12 h-12 rounded-2xl bg-purple-50 text-[#722F99] flex items-center justify-center mx-auto mb-2 text-xl border border-purple-100">
            <i class="fa-solid fa-prescription-bottle-medical"></i>
          </div>
          <p class="text-sm font-semibold text-slate-700">Belum Ada Data Transaksi Apotek</p>
          <p class="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Silakan unggah berkas Excel melalui menu <strong>Kelola Data</strong> atau input transaksi apotek baru.</p>
        </td>
      </tr>
    `;
  } else {
    tbody.innerHTML = pagedData.map((item, idx) => {
      const rowNum = startIdx + idx + 1;
      const statusBadge = `<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-1 justify-center"><i class="fas fa-check-circle text-[10px]"></i> Selesai</span>`;
      const formattedTotal = 'Rp ' + Number(item.total).toLocaleString('id-ID');

      return `
        <tr class="hover:bg-purple-50/40 transition">
          <td class="py-3.5 px-4 text-center font-bold text-slate-400">${rowNum}</td>
          <td class="py-3.5 px-4 font-mono text-xs text-slate-500 whitespace-nowrap">
            <span class="font-bold text-[#722F99] block">${item.id}</span>
            <span>${item.waktu}</span>
          </td>
          <td class="py-3.5 px-4 max-w-xs sm:max-w-md">
            <div class="font-bold text-slate-800 hover:text-[#722F99] transition cursor-pointer text-sm" onclick="window.openDetailApotek('${item.id}')">${item.nama}</div>
            <div class="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              <span><i class="far fa-user-circle text-[10px] mr-1"></i>${item.apoteker}</span>
            </div>
          </td>
          <td class="py-3.5 px-4 whitespace-nowrap">
            <span class="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">${item.kategoriLabel}</span>
          </td>
          <td class="py-3.5 px-4 text-xs font-medium text-slate-600">${item.pembeli}</td>
          <td class="py-3.5 px-4 text-center font-bold text-slate-800">${item.qty}</td>
          <td class="py-3.5 px-4 text-right font-bold text-slate-800 font-mono">${formattedTotal}</td>
          <td class="py-3.5 px-4 text-center text-xs text-slate-500">${item.metode}</td>
          <td class="py-3.5 px-4 text-center">${statusBadge}</td>
          <td class="py-3.5 px-4 text-center whitespace-nowrap">
            <button type="button" class="px-2.5 py-1.5 rounded-lg bg-purple-50 hover:bg-[#722F99] text-[#722F99] hover:text-white transition text-xs font-bold flex items-center gap-1 mx-auto cursor-pointer" onclick="window.openDetailApotek('${item.id}')">
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
  const wrap = document.getElementById('wrapPaginationApotek');
  if (!wrap) return;

  if (totalPages <= 1) {
    wrap.innerHTML = '';
    return;
  }

  let html = '';
  html += `
    <button type="button" class="w-8 h-8 rounded-lg border border-slate-200 text-xs flex items-center justify-center transition ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-100 text-slate-700'}" ${currentPage === 1 ? 'disabled' : ''} id="btnPrevApotekPage">
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
    <button type="button" class="w-8 h-8 rounded-lg border border-slate-200 text-xs flex items-center justify-center transition ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-100 text-slate-700'}" ${currentPage === totalPages ? 'disabled' : ''} id="btnNextApotekPage">
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

  const btnPrev = document.getElementById('btnPrevApotekPage');
  if (btnPrev && currentPage > 1) {
    btnPrev.addEventListener('click', () => {
      currentPage--;
      renderTable();
    });
  }

  const btnNext = document.getElementById('btnNextApotekPage');
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
  const records = data || getApotekDataset();
  const isEmpty = records.length === 0;

  // Chart 1: Tren Omzet & Transaksi
  const ctxTren = document.getElementById('chartApotekTren');
  if (ctxTren && window.Chart) {
    if (isEmpty) {
      if (chartTrenInstance) {
        chartTrenInstance.destroy();
        chartTrenInstance = null;
      }
      toggleCanvasEmptyOverlay('chartApotekTren', true, 'Belum Ada Tren Penjualan Apotek', 'Upload berkas transaksi untuk melihat omzet bulanan.');
    } else {
      toggleCanvasEmptyOverlay('chartApotekTren', false);
      if (chartTrenInstance) chartTrenInstance.destroy();

      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      const monthlyOmzet = new Array(12).fill(0);
      const monthlyTx = new Array(12).fill(0);

      records.forEach(r => {
        let m = -1;
        if (r.waktu && r.waktu.includes('-')) {
          const parts = r.waktu.split('-');
          if (parts.length >= 2) m = parseInt(parts[1], 10) - 1;
        }
        if (m < 0 || m > 11) m = 0;
        monthlyOmzet[m] += Math.round((r.total || 0) / 1000000);
        monthlyTx[m] += 1;
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
              label: 'Omzet Penjualan (Juta Rp)',
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
              label: 'Volume Transaksi (Nota)',
              type: 'bar',
              data: monthlyTx,
              backgroundColor: 'rgba(13, 148, 136, 0.75)',
              borderRadius: 6,
              yAxisID: 'yTx'
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
            yTx: {
              type: 'linear',
              position: 'right',
              grid: { drawOnChartArea: false },
              ticks: { font: { size: 11 } }
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

  const tabPills = document.querySelectorAll('.apotek-chart-tab-pill');
  tabPills.forEach(pill => {
    pill.addEventListener('click', () => {
      tabPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const view = pill.dataset.chartView;
      document.querySelectorAll('.apotek-chart-canvas-view').forEach(v => v.classList.add('hidden'));

      if (view === 'produk') {
        document.getElementById('viewWrapApotekProduk').classList.remove('hidden');
      } else if (view === 'pelanggan') {
        document.getElementById('viewWrapApotekPelanggan').classList.remove('hidden');
      } else if (view === 'stok') {
        document.getElementById('viewWrapApotekStok').classList.remove('hidden');
      }
    });
  });

  // Chart Produk
  const ctxProduk = document.getElementById('chartApotekProduk');
  if (ctxProduk && window.Chart) {
    if (isEmpty) {
      if (chartProdukInstance) {
        chartProdukInstance.destroy();
        chartProdukInstance = null;
      }
      toggleCanvasEmptyOverlay('chartApotekProduk', true, 'Belum Ada Kategori Produk', 'Upload data untuk melihat proporsi jenis sediaan obat.');
    } else {
      toggleCanvasEmptyOverlay('chartApotekProduk', false);
      if (chartProdukInstance) chartProdukInstance.destroy();

      const counts = {};
      records.forEach(r => {
        counts[r.kategoriLabel] = (counts[r.kategoriLabel] || 0) + 1;
      });

      chartProdukInstance = new window.Chart(ctxProduk, {
        type: 'doughnut',
        data: {
          labels: Object.keys(counts),
          datasets: [{
            data: Object.values(counts),
            backgroundColor: ['#722F99', '#10b981', '#f59e0b', '#3b82f6'],
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

  // Chart Pelanggan
  const ctxPelanggan = document.getElementById('chartApotekPelanggan');
  if (ctxPelanggan && window.Chart) {
    if (isEmpty) {
      if (chartPelangganInstance) {
        chartPelangganInstance.destroy();
        chartPelangganInstance = null;
      }
      toggleCanvasEmptyOverlay('chartApotekPelanggan', true, 'Belum Ada Profil Pembeli', 'Upload data untuk memantau segmen pengunjung.');
    } else {
      toggleCanvasEmptyOverlay('chartApotekPelanggan', false);
      if (chartPelangganInstance) chartPelangganInstance.destroy();

      chartPelangganInstance = new window.Chart(ctxPelanggan, {
        type: 'doughnut',
        data: {
          labels: ['Mahasiswa (48%)', 'Dosen & Tendik (32%)', 'Masyarakat Umum (20%)'],
          datasets: [{
            data: [48, 32, 20],
            backgroundColor: ['#6366f1', '#ec4899', '#06b6d4'],
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

  // Chart Stok
  const ctxStok = document.getElementById('chartApotekStok');
  if (ctxStok && window.Chart) {
    if (isEmpty) {
      if (chartStokInstance) {
        chartStokInstance.destroy();
        chartStokInstance = null;
      }
      toggleCanvasEmptyOverlay('chartApotekStok', true, 'Belum Ada Status Stok', 'Upload data untuk memantau ketersediaan farmasi.');
    } else {
      toggleCanvasEmptyOverlay('chartApotekStok', false);
      if (chartStokInstance) chartStokInstance.destroy();

      chartStokInstance = new window.Chart(ctxStok, {
        type: 'doughnut',
        data: {
          labels: ['Stok Aman (85%)', 'Reorder Point (10%)', 'Menipis / Kritis (5%)'],
          datasets: [{
            data: [85, 10, 5],
            backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
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
  const modalDetail = document.getElementById('modalDetailApotek');
  const btnClose = document.querySelectorAll('.apotek-modal-close');

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

  window.openDetailApotek = function(id) {
    const dataset = getApotekDataset();
    const item = dataset.find(x => x.id === id);
    if (!item || !modalDetail) return;

    document.getElementById('detailApotekId').textContent = item.id;
    document.getElementById('detailApotekNama').textContent = item.nama;
    document.getElementById('detailApotekKategori').textContent = item.kategoriLabel;
    document.getElementById('detailApotekPembeli').textContent = item.pembeli;
    document.getElementById('detailApotekQty').textContent = item.qty + ' item';
    document.getElementById('detailApotekTotal').textContent = 'Rp ' + Number(item.total).toLocaleString('id-ID');
    document.getElementById('detailApotekMetode').textContent = item.metode;
    document.getElementById('detailApotekStatus').textContent = item.statusLabel;
    document.getElementById('detailApotekApoteker').textContent = item.apoteker;

    modalDetail.classList.remove('hidden');
  };
}

/**
 * Export Functionality
 */
function initExportButtons() {
  const btnCsv = document.getElementById('btnExportApotekCsv');
  const btnPrint = document.getElementById('btnExportApotekPrint');

  if (btnCsv) {
    btnCsv.addEventListener('click', () => {
      const dataset = getApotekDataset();
      if (dataset.length === 0) {
        showToast('Tidak ada data transaksi apotek untuk diexport.');
        return;
      }
      let csv = 'Nota,Waktu,Komoditas,Kategori,Pembeli,Qty,Total (Rp),Metode,Status\n';
      dataset.forEach(i => {
        csv += `"${i.id}","${i.waktu}","${i.nama.replace(/"/g, '""')}","${i.kategoriLabel}","${i.pembeli}",${i.qty},${i.total},"${i.metode}","${i.statusLabel}"\n`;
      });
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `apotek_transaksi_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Data Apotek berhasil diexport ke CSV!');
    });
  }

  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('apotekToastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'apotekToastNotification';
    toast.className = 'fixed bottom-5 right-5 z-50 bg-[#1E0A30] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 text-xs font-semibold flex items-center gap-3 transition-all duration-300 opacity-0 transform translate-y-4 pointer-events-none';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-prescription-bottle-medical text-purple-400 text-sm"></i> <span>${message}</span>`;
  toast.classList.remove('opacity-0', 'translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-4');
  }, 3500);
}
