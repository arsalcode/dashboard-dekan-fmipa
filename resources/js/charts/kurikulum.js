/**
 * MODUL KURIKULUM & MATA KULIAH FMIPA UNIVERSITAS PAKUAN
 * Standar Eksekutif Dosen & Dekan
 * 100% Dinamis dari DataManager (Local Storage / Upload Excel)
 */

import { DataManager } from '../modules/data-manager';

// Chart Instances
let chartDistribusiProdiInstance = null;
let chartStatusInstance = null;
let chartKategoriInstance = null;
let chartSksInstance = null;

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

function getKurikulumDataset() {
  const persisted = DataManager.getPersistedData('kurikulum') || [];
  return persisted.map((item, idx) => ({
    id: idx + 1,
    tahun_ajaran: item.tahun_ajaran || '2025/2026',
    fakultas: 'FMIPA',
    prodi: item.prodi || 'Program Studi',
    kode_mk: item.kode_mk || `MK-${idx + 1}`,
    nama_mk: item.nama_mk || `Mata Kuliah ${idx + 1}`,
    periode_semester: item.periode_semester || '2025/2026 Ganjil',
    semester: parseInt(item.semester, 10) || 1,
    sks: parseInt(item.sks, 10) || 3,
    koordinator: item.dosen_pengampu || item.koordinator || '-',
    dosen_pengajar: item.dosen_pengampu || item.dosen_pengajar || '-',
    status: item.status || 'Aktif',
    tipe: item.sifat || item.tipe || 'Wajib'
  }));
}

export function initKurikulumModule() {
  const heroBanner = document.getElementById('executiveHeroBannerKurikulum');
  const compactBar = document.getElementById('compactStickyBarKurikulum');
  const scrollContainer = document.querySelector('main') || window;

  // Search & Table Controls
  const searchInput = document.getElementById('searchKurikulum');
  const pageSizeSelect = document.getElementById('pageSizeKurikulum');
  const tableBody = document.getElementById('tbodyKurikulum');
  const tableInfo = document.getElementById('tableInfoKurikulum');
  const paginationControls = document.getElementById('paginationKurikulum');
  const labelCountBadge = document.getElementById('labelKurlCountBadge');

  // Filter Reset Buttons
  const btnResetHero = document.getElementById('btnResetKurlFilters');
  const btnResetCompact = document.getElementById('btnResetCompactKurlFilters');
  const allResetBtns = [btnResetHero, btnResetCompact].filter(Boolean);

  // State Management
  let currentPage = 1;
  let pageSize = 10;
  let currentProdiFilter = 'semua';
  let currentPeriodeFilter = 'semua';
  let currentStatusFilter = 'semua';
  let currentKategoriFilter = 'semua';
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
  if (!window._fmipaKurikulumListenerBound) {
    window._fmipaKurikulumListenerBound = true;
    window.addEventListener('fmipa:data-updated', (e) => {
      if (e.detail && e.detail.module === 'kurikulum') {
        renderAll();
      }
    });
  }

  // Filter Dataset
  function getFilteredDataset() {
    const dataset = getKurikulumDataset();
    return dataset.filter(item => {
      if (currentProdiFilter !== 'semua') {
        const itemProdiNorm = item.prodi.toLowerCase().replace(/\s+/g, '-');
        if (!itemProdiNorm.includes(currentProdiFilter) && !currentProdiFilter.includes(itemProdiNorm)) return false;
      }
      if (currentPeriodeFilter !== 'semua' && item.periode_semester !== currentPeriodeFilter) return false;
      if (currentStatusFilter !== 'semua' && item.status.toLowerCase() !== currentStatusFilter.toLowerCase()) return false;
      if (currentKategoriFilter !== 'semua' && !item.tipe.toLowerCase().includes(currentKategoriFilter.toLowerCase())) return false;

      if (searchQuery) {
        const haystack = `${item.kode_mk} ${item.nama_mk} ${item.prodi} ${item.koordinator} ${item.dosen_pengajar}`.toLowerCase();
        if (!haystack.includes(searchQuery)) return false;
      }
      return true;
    });
  }

  // Update KPIs
  function updateKPIs() {
    const dataset = getKurikulumDataset();
    const filtered = getFilteredDataset();

    const totalMk = filtered.length;
    const totalSks = filtered.reduce((acc, curr) => acc + curr.sks, 0);
    const totalWajib = filtered.filter(item => item.tipe.toLowerCase().includes('wajib')).length;
    const totalAktif = filtered.filter(item => item.status.toLowerCase() === 'aktif').length;

    const elTotal = document.getElementById('valKurlTotal');
    const elSks = document.getElementById('valKurlSks');
    const elWajib = document.getElementById('valKurlWajib');
    const elAktif = document.getElementById('valKurlAktif');

    if (elTotal) elTotal.textContent = totalMk.toString();
    if (elSks) elSks.textContent = totalSks.toString();
    if (elWajib) elWajib.textContent = totalWajib.toString();
    if (elAktif) elAktif.textContent = totalAktif.toString();

    if (labelCountBadge) {
      labelCountBadge.textContent = `${totalMk} Mata Kuliah Terdata`;
    }
  }

  // Render Table
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
          <td colspan="10" class="py-10 text-center text-slate-400">
            <div class="flex flex-col items-center justify-center gap-2">
              <div class="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#722F99] border border-purple-100 shadow-inner">
                <i class="fa-solid fa-folder-open text-xl"></i>
              </div>
              <p class="font-bold text-slate-700 text-xs mt-1">Belum Ada Data Mata Kuliah Tersimpan</p>
              <p class="text-[11px] text-slate-400">Upload berkas Excel atau tambah data manual untuk memuat kurikulum.</p>
            </div>
          </td>
        </tr>
      `;
    } else {
      tableBody.innerHTML = pageData.map((item, idx) => {
        const isAktif = item.status.toLowerCase() === 'aktif';
        return `
          <tr class="border-b border-gray-100 hover:bg-purple-50/30 transition text-xs">
            <td class="py-3 px-3 text-center text-gray-500 font-medium">${startIndex + idx + 1}</td>
            <td class="py-3 px-3.5 font-bold text-gray-800 whitespace-nowrap">${item.prodi}</td>
            <td class="py-3 px-3 font-mono font-bold text-[#722F99] bg-purple-50/60 rounded px-1.5 py-0.5 text-center">${item.kode_mk}</td>
            <td class="py-3 px-4">
              <div class="font-bold text-gray-900">${item.nama_mk}</div>
              <div class="text-[10px] text-gray-500 flex items-center gap-1.5 mt-0.5">
                <span class="inline-block w-1.5 h-1.5 rounded-full ${item.tipe.toLowerCase().includes('wajib') ? 'bg-[#722F99]' : 'bg-amber-400'}"></span>
                <span>${item.tipe}</span>
              </div>
            </td>
            <td class="py-3 px-3 text-center whitespace-nowrap text-gray-600">${item.periode_semester}</td>
            <td class="py-3 px-2 text-center font-bold text-gray-700">${item.semester}</td>
            <td class="py-3 px-2 text-center">
              <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-extrabold text-[11px]">
                ${item.sks}
              </span>
            </td>
            <td class="py-3 px-3.5 text-gray-800 font-medium whitespace-nowrap">${item.koordinator}</td>
            <td class="py-3 px-3.5 text-gray-600 text-[11px] max-w-xs truncate">${item.dosen_pengajar}</td>
            <td class="py-3 px-3 text-center">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold ${isAktif ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'}">
                <span class="w-1.5 h-1.5 rounded-full ${isAktif ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}"></span>
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
          <button type="button" class="px-2.5 py-1 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:bg-purple-50 disabled:opacity-30 disabled:pointer-events-none transition" ${currentPage === 1 ? 'disabled' : ''} id="btnPrevKurlPage">
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
          <button type="button" class="px-2.5 py-1 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:bg-purple-50 disabled:opacity-30 disabled:pointer-events-none transition" ${currentPage === totalPages ? 'disabled' : ''} id="btnNextKurlPage">
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
        const prev = document.getElementById('btnPrevKurlPage');
        const next = document.getElementById('btnNextKurlPage');
        if (prev) prev.addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderTable(); } });
        if (next) next.addEventListener('click', () => { if (currentPage < totalPages) { currentPage++; renderTable(); } });
      }
    }
  }

  // Render Charts
  function renderCharts() {
    const dataset = getKurikulumDataset();
    const canvasProdi = document.getElementById('chartKurlDistribusiProdi');
    const canvasStatus = document.getElementById('chartKurlStatus');
    const canvasKategori = document.getElementById('chartKurlKategori');
    const canvasSks = document.getElementById('chartKurlSks');

    if (dataset.length === 0) {
      [canvasProdi, canvasStatus, canvasKategori, canvasSks].forEach(c => {
        if (c) toggleCanvasEmptyOverlay(c.id, true);
      });
      [chartDistribusiProdiInstance, chartStatusInstance, chartKategoriInstance, chartSksInstance].forEach(inst => {
        if (inst) inst.destroy();
      });
      chartDistribusiProdiInstance = null;
      chartStatusInstance = null;
      chartKategoriInstance = null;
      chartSksInstance = null;
      return;
    }

    [canvasProdi, canvasStatus, canvasKategori, canvasSks].forEach(c => {
      if (c) toggleCanvasEmptyOverlay(c.id, false);
    });

    if (typeof window.Chart === 'undefined') return;
    const Chart = window.Chart;

    // 1. Distribusi per Prodi
    if (canvasProdi) {
      if (chartDistribusiProdiInstance) chartDistribusiProdiInstance.destroy();
      const prodiLabels = ['Biologi', 'Kimia', 'Matematika', 'Ilmu Komputer', 'Farmasi', 'Profesi Apoteker'];
      const prodiCounts = prodiLabels.map(p => dataset.filter(item => item.prodi.toLowerCase().includes(p.toLowerCase())).length);

      chartDistribusiProdiInstance = new Chart(canvasProdi.getContext('2d'), {
        type: 'bar',
        data: {
          labels: prodiLabels,
          datasets: [{
            label: 'Jumlah MK',
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

    // 2. Status MK
    if (canvasStatus) {
      if (chartStatusInstance) chartStatusInstance.destroy();
      const aktif = dataset.filter(i => i.status.toLowerCase() === 'aktif').length;
      const nonAktif = dataset.filter(i => i.status.toLowerCase() !== 'aktif').length;

      chartStatusInstance = new Chart(canvasStatus.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: [`Aktif (${aktif} MK)`, `Non-Aktif (${nonAktif} MK)`],
          datasets: [{
            data: [aktif, nonAktif],
            backgroundColor: ['#10B981', '#94A3B8'],
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

    // 3. Kategori Wajib vs Pilihan
    if (canvasKategori) {
      if (chartKategoriInstance) chartKategoriInstance.destroy();
      const wajib = dataset.filter(i => i.tipe.toLowerCase().includes('wajib')).length;
      const pilihan = dataset.filter(i => !i.tipe.toLowerCase().includes('wajib')).length;

      chartKategoriInstance = new Chart(canvasKategori.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: [`MK Wajib (${wajib} MK)`, `MK Pilihan (${pilihan} MK)`],
          datasets: [{
            data: [wajib, pilihan],
            backgroundColor: ['#722F99', '#E5D026'],
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

    // 4. Distribusi SKS
    if (canvasSks) {
      if (chartSksInstance) chartSksInstance.destroy();
      const sks2 = dataset.filter(i => i.sks === 2).length;
      const sks3 = dataset.filter(i => i.sks === 3).length;
      const sks4 = dataset.filter(i => i.sks >= 4).length;

      chartSksInstance = new Chart(canvasSks.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: [`2 SKS (${sks2} MK)`, `3 SKS (${sks3} MK)`, `4+ SKS (${sks4} MK)`],
          datasets: [{
            data: [sks2, sks3, sks4],
            backgroundColor: ['#0D9488', '#722F99', '#3B82F6'],
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
  const prodiTabs = document.querySelectorAll('.kurl-prodi-tab');
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
  const chartTabPills = document.querySelectorAll('.kurl-chart-tab-pill');
  chartTabPills.forEach(tab => {
    tab.addEventListener('click', () => {
      chartTabPills.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const view = tab.getAttribute('data-chart-view');
      document.querySelectorAll('.kurl-chart-canvas-view').forEach(wrap => wrap.classList.remove('active'));
      if (view === 'status') document.getElementById('viewWrapKurlStatus')?.classList.add('active');
      else if (view === 'kategori') document.getElementById('viewWrapKurlKategori')?.classList.add('active');
      else if (view === 'sks') document.getElementById('viewWrapKurlSks')?.classList.add('active');
    });
  });

  // Initial Run
  renderAll();
}
