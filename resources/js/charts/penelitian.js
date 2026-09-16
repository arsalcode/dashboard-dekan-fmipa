/**
 * MODUL DATA RISET & PENELITIAN FMIPA UNIVERSITAS PAKUAN
 * Standar Eksekutif Dosen & Dekan
 * 100% Dinamis dari DataManager (Local Storage / Upload Excel)
 */

import { DataManager } from '../modules/data-manager';

// Chart Instances
let chartLitDistribusiProdiInstance = null;
let chartLitSkemaInstance = null;
let chartLitLuaranInstance = null;
let chartLitStatusInstance = null;

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

function getPenelitianDataset() {
  const persisted = DataManager.getPersistedData('penelitian') || [];
  return persisted.map((item, idx) => {
    let rawDana = String(item.dana || '0').replace(/[^0-9]/g, '');
    let numDana = parseInt(rawDana, 10) || 0;

    return {
      id: idx + 1,
      tahun: String(item.tahun || '2026'),
      prodi: item.prodi || 'Program Studi',
      judul: item.judul || `Judul Penelitian ${idx + 1}`,
      ketua: item.ketua || 'Ketua Peneliti',
      anggota: item.anggota || '-',
      skema: item.skema || 'Internal UNPAK',
      dana: numDana,
      luaran: item.output || item.luaran || 'Jurnal Nasional',
      status: item.status || 'Berjalan',
      tipe: (item.skema || '').toLowerCase().includes('bima') || (item.skema || '').toLowerCase().includes('kemendikbud') ? 'nasional' : ((item.skema || '').toLowerCase().includes('industri') || (item.skema || '').toLowerCase().includes('mitra') ? 'kerjasama' : 'internal')
    };
  });
}

export function initPenelitianModule() {
  const heroBanner = document.getElementById('executiveHeroBannerPenelitian');
  const compactBar = document.getElementById('compactStickyBarPenelitian');
  const scrollContainer = document.querySelector('main') || window;

  // Search & Table Controls
  const searchInput = document.getElementById('searchPenelitian');
  const pageSizeSelect = document.getElementById('pageSizePenelitian');
  const tableBody = document.getElementById('tbodyPenelitian');
  const tableInfo = document.getElementById('tableInfoPenelitian');
  const paginationControls = document.getElementById('paginationPenelitian');
  const labelCountBadge = document.getElementById('labelLitCountBadge');

  // Filter Reset Buttons
  const btnResetHero = document.getElementById('btnResetLitFilters');
  const btnResetCompact = document.getElementById('btnResetCompactLitFilters');

  // State Management
  let currentPage = 1;
  let pageSize = 10;
  let currentProdiFilter = 'semua';
  let currentTahunFilter = 'semua';
  let currentStatusFilter = 'semua';
  let currentSkemaFilter = 'semua';
  let searchQuery = '';

  // Sticky Scroll
  if (compactBar && heroBanner) {
    const handleScroll = () => {
      const scrollY = (scrollContainer && scrollContainer.scrollTop !== undefined ? scrollContainer.scrollTop : 0) || window.scrollY || 0;
      const triggerPoint = (heroBanner.offsetTop || 0) + (heroBanner.offsetHeight || 220) - 60;
      if (scrollY > triggerPoint) {
        compactBar.classList.add('is-active', 'is-visible');
      } else {
        compactBar.classList.remove('is-active', 'is-visible');
      }
    };
    if (scrollContainer && scrollContainer !== window) scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // Reactive listener
  if (!window._fmipaPenelitianListenerBound) {
    window._fmipaPenelitianListenerBound = true;
    window.addEventListener('fmipa:data-updated', (e) => {
      if (e.detail && e.detail.module === 'penelitian') {
        renderAll();
      }
    });
  }

  function getFilteredDataset() {
    const dataset = getPenelitianDataset();
    return dataset.filter(item => {
      if (currentProdiFilter !== 'semua') {
        const pNorm = item.prodi.toLowerCase().replace(/\s+/g, '-');
        if (!pNorm.includes(currentProdiFilter) && !currentProdiFilter.includes(pNorm)) return false;
      }
      if (currentTahunFilter !== 'semua' && item.tahun !== currentTahunFilter) return false;
      if (currentStatusFilter !== 'semua' && item.status.toLowerCase() !== currentStatusFilter.toLowerCase()) return false;
      if (currentSkemaFilter !== 'semua' && !item.skema.toLowerCase().includes(currentSkemaFilter.toLowerCase())) return false;

      if (searchQuery) {
        const haystack = `${item.judul} ${item.ketua} ${item.prodi} ${item.skema} ${item.luaran}`.toLowerCase();
        if (!haystack.includes(searchQuery)) return false;
      }
      return true;
    });
  }

  function updateKPIs() {
    const filtered = getFilteredDataset();
    const totalRiset = filtered.length;
    const totalDana = filtered.reduce((acc, curr) => acc + curr.dana, 0);
    const totalScopus = filtered.filter(i => i.luaran.toLowerCase().includes('scopus')).length;
    const totalPaten = filtered.filter(i => i.luaran.toLowerCase().includes('paten') || i.luaran.toLowerCase().includes('hki') || i.luaran.toLowerCase().includes('hak cipta')).length;

    const elTotal = document.getElementById('valLitTotal');
    const elDana = document.getElementById('valLitDana');
    const elScopus = document.getElementById('valLitScopus');
    const elPaten = document.getElementById('valLitPaten');

    if (elTotal) elTotal.textContent = totalRiset.toString();
    if (elDana) {
      if (totalDana >= 1000000000) elDana.textContent = `Rp ${(totalDana / 1000000000).toFixed(2)} M`;
      else if (totalDana >= 1000000) elDana.textContent = `Rp ${(totalDana / 1000000).toFixed(0)} Jt`;
      else elDana.textContent = `Rp ${totalDana.toLocaleString('id-ID')}`;
    }
    if (elScopus) elScopus.textContent = totalScopus.toString();
    if (elPaten) elPaten.textContent = totalPaten.toString();

    if (labelCountBadge) {
      labelCountBadge.textContent = `${totalRiset} Riset Terdata`;
    }
  }

  function renderTable() {
    const filtered = getFilteredDataset();
    const totalRows = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalRows);
    const pageData = filtered.slice(startIndex, endIndex);

    if (!tableBody) return;

    if (pageData.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="9" class="py-10 text-center text-slate-400">
            <div class="flex flex-col items-center justify-center gap-2">
              <div class="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#722F99] border border-purple-100 shadow-inner">
                <i class="fa-solid fa-folder-open text-xl"></i>
              </div>
              <p class="font-bold text-slate-700 text-xs mt-1">Belum Ada Data Penelitian Tersimpan</p>
              <p class="text-[11px] text-slate-400">Upload berkas Excel atau tambah data manual untuk memuat data riset.</p>
            </div>
          </td>
        </tr>
      `;
    } else {
      tableBody.innerHTML = pageData.map((item, idx) => {
        const isSelesai = item.status.toLowerCase().includes('selesai');
        return `
          <tr class="border-b border-gray-100 hover:bg-purple-50/30 transition text-xs">
            <td class="py-3 px-3 text-center text-gray-500 font-medium">${startIndex + idx + 1}</td>
            <td class="py-3 px-3.5 font-bold text-gray-800 whitespace-nowrap">${item.prodi}</td>
            <td class="py-3 px-4">
              <div class="font-bold text-gray-900">${item.judul}</div>
              <div class="text-[10px] text-gray-500 mt-0.5">Ketua: <strong class="text-gray-700">${item.ketua}</strong></div>
            </td>
            <td class="py-3 px-3 whitespace-nowrap text-gray-700">${item.skema}</td>
            <td class="py-3 px-3 text-center font-semibold text-gray-600">${item.tahun}</td>
            <td class="py-3 px-3 text-right font-bold text-[#722F99] whitespace-nowrap">Rp ${item.dana.toLocaleString('id-ID')}</td>
            <td class="py-3 px-3 text-center whitespace-nowrap">
              <span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-[#722F99] border border-purple-200">${item.luaran}</span>
            </td>
            <td class="py-3 px-3 text-center">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold ${isSelesai ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}">
                <span class="w-1.5 h-1.5 rounded-full ${isSelesai ? 'bg-emerald-500' : 'bg-blue-500 animate-pulse'}"></span>
                ${item.status}
              </span>
            </td>
          </tr>
        `;
      }).join('');
    }

    if (tableInfo) {
      tableInfo.textContent = totalRows === 0 ? 'Menampilkan 0 data' : `Menampilkan ${startIndex + 1} - ${endIndex} dari ${totalRows} data`;
    }

    if (paginationControls) {
      if (totalPages <= 1) {
        paginationControls.innerHTML = '';
      } else {
        let html = `
          <button type="button" class="px-2.5 py-1 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:bg-purple-50 disabled:opacity-30 disabled:pointer-events-none transition" ${currentPage === 1 ? 'disabled' : ''} id="btnPrevLitPage">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
        `;
        for (let p = 1; p <= totalPages; p++) {
          html += `
            <button type="button" class="w-7 h-7 rounded-lg text-xs font-bold transition ${p === currentPage ? 'bg-[#722F99] text-white shadow-sm' : 'border border-gray-200 text-gray-700 hover:bg-purple-50'}" data-page="${p}">
              ${p}
            </button>
          `;
        }
        html += `
          <button type="button" class="px-2.5 py-1 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:bg-purple-50 disabled:opacity-30 disabled:pointer-events-none transition" ${currentPage === totalPages ? 'disabled' : ''} id="btnNextLitPage">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        `;
        paginationControls.innerHTML = html;

        paginationControls.querySelectorAll('button[data-page]').forEach(b => {
          b.addEventListener('click', () => {
            currentPage = parseInt(b.dataset.page, 10);
            renderTable();
          });
        });
        const prev = document.getElementById('btnPrevLitPage');
        const next = document.getElementById('btnNextLitPage');
        if (prev) prev.addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderTable(); } });
        if (next) next.addEventListener('click', () => { if (currentPage < totalPages) { currentPage++; renderTable(); } });
      }
    }
  }

  function renderCharts() {
    const dataset = getPenelitianDataset();
    const canvasProdi = document.getElementById('chartLitDistribusiProdi');
    const canvasSkema = document.getElementById('chartLitSkema');
    const canvasLuaran = document.getElementById('chartLitLuaran');
    const canvasStatus = document.getElementById('chartLitStatus');

    if (dataset.length === 0) {
      [canvasProdi, canvasSkema, canvasLuaran, canvasStatus].forEach(c => {
        if (c) toggleCanvasEmptyOverlay(c.id, true);
      });
      [chartLitDistribusiProdiInstance, chartLitSkemaInstance, chartLitLuaranInstance, chartLitStatusInstance].forEach(inst => {
        if (inst) inst.destroy();
      });
      chartLitDistribusiProdiInstance = null;
      chartLitSkemaInstance = null;
      chartLitLuaranInstance = null;
      chartLitStatusInstance = null;
      return;
    }

    [canvasProdi, canvasSkema, canvasLuaran, canvasStatus].forEach(c => {
      if (c) toggleCanvasEmptyOverlay(c.id, false);
    });

    if (typeof window.Chart === 'undefined') return;
    const Chart = window.Chart;

    // 1. Distribusi Prodi
    if (canvasProdi) {
      if (chartLitDistribusiProdiInstance) chartLitDistribusiProdiInstance.destroy();
      const prodiLabels = ['Biologi', 'Kimia', 'Matematika', 'Ilmu Komputer', 'Farmasi', 'Profesi Apoteker'];
      const prodiCounts = prodiLabels.map(p => dataset.filter(item => item.prodi.toLowerCase().includes(p.toLowerCase())).length);

      chartLitDistribusiProdiInstance = new Chart(canvasProdi.getContext('2d'), {
        type: 'bar',
        data: {
          labels: prodiLabels,
          datasets: [{
            label: 'Judul Riset',
            data: prodiCounts,
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
            y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 }, color: '#64748b' } }
          }
        }
      });
    }

    // 2. Skema Hibah
    if (canvasSkema) {
      if (chartLitSkemaInstance) chartLitSkemaInstance.destroy();
      const nasional = dataset.filter(i => i.tipe === 'nasional').length;
      const internal = dataset.filter(i => i.tipe === 'internal').length;
      const kerjasama = dataset.filter(i => i.tipe === 'kerjasama').length;

      chartLitSkemaInstance = new Chart(canvasSkema.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: [`Nasional / BIMA (${nasional})`, `Internal UNPAK (${internal})`, `Mitra Industri (${kerjasama})`],
          datasets: [{
            data: [nasional, internal, kerjasama],
            backgroundColor: ['#722F99', '#0D9488', '#F59E0B'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: { legend: { position: 'bottom', labels: { font: { size: 11, weight: '600' }, boxWidth: 12 } } }
        }
      });
    }

    // 3. Luaran Publikasi
    if (canvasLuaran) {
      if (chartLitLuaranInstance) chartLitLuaranInstance.destroy();
      const scopus = dataset.filter(i => i.luaran.toLowerCase().includes('scopus')).length;
      const sinta = dataset.filter(i => i.luaran.toLowerCase().includes('sinta')).length;
      const paten = dataset.filter(i => i.luaran.toLowerCase().includes('paten') || i.luaran.toLowerCase().includes('hki')).length;

      chartLitLuaranInstance = new Chart(canvasLuaran.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: [`Scopus (${scopus})`, `SINTA (${sinta})`, `Paten & HKI (${paten})`],
          datasets: [{
            data: [scopus, sinta, paten],
            backgroundColor: ['#10B981', '#722F99', '#E5D026'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: { legend: { position: 'bottom', labels: { font: { size: 11, weight: '600' }, boxWidth: 12 } } }
        }
      });
    }

    // 4. Status Penelitian
    if (canvasStatus) {
      if (chartLitStatusInstance) chartLitStatusInstance.destroy();
      const selesai = dataset.filter(i => i.status.toLowerCase().includes('selesai')).length;
      const berjalan = dataset.filter(i => i.status.toLowerCase().includes('berjalan')).length;
      const lainnya = Math.max(0, dataset.length - selesai - berjalan);

      chartLitStatusInstance = new Chart(canvasStatus.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: [`Selesai (${selesai})`, `Sedang Berjalan (${berjalan})`, `Lainnya (${lainnya})`],
          datasets: [{
            data: [selesai, berjalan, lainnya],
            backgroundColor: ['#10B981', '#3B82F6', '#F59E0B'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: { legend: { position: 'bottom', labels: { font: { size: 11, weight: '600' }, boxWidth: 12 } } }
        }
      });
    }
  }

  function renderAll() {
    updateKPIs();
    renderTable();
    renderCharts();
  }

  // Search & Page Size
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      currentPage = 1;
      renderTable();
    });
  }

  if (pageSizeSelect) {
    pageSizeSelect.addEventListener('change', (e) => {
      pageSize = parseInt(e.target.value, 10) || 10;
      currentPage = 1;
      renderTable();
    });
  }

  // Prodi Tabs
  const prodiTabs = document.querySelectorAll('.lit-prodi-tab');
  prodiTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      prodiTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentProdiFilter = tab.getAttribute('data-prodi-target') || 'semua';
      currentPage = 1;
      renderTable();
      updateKPIs();
    });
  });

  // Chart Tab view pills
  const chartTabPills = document.querySelectorAll('.lit-chart-tab-pill');
  chartTabPills.forEach(tab => {
    tab.addEventListener('click', () => {
      chartTabPills.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const view = tab.getAttribute('data-chart-view');
      document.querySelectorAll('.lit-chart-canvas-view').forEach(wrap => wrap.classList.remove('active'));
      if (view === 'skema') document.getElementById('viewWrapLitSkema')?.classList.add('active');
      else if (view === 'luaran') document.getElementById('viewWrapLitLuaran')?.classList.add('active');
      else if (view === 'status') document.getElementById('viewWrapLitStatus')?.classList.add('active');
    });
  });

  renderAll();
}
