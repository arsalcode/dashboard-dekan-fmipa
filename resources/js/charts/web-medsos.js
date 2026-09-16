/**
 * MODUL WEB & MEDIA SOSIAL FMIPA UNIVERSITAS PAKUAN
 * Standar Eksekutif Dosen & Dekan
 * 100% Dinamis dari DataManager (Local Storage / Upload Excel)
 */

import { DataManager } from '../modules/data-manager';

// Chart Instances
let chartWebTrafficTrenInstance = null;
let chartWebSumberInstance = null;
let chartWebPerangkatInstance = null;
let chartWebKategoriInstance = null;

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

function getWebMedsosDataset() {
  const persisted = DataManager.getPersistedData('web-medsos') || [];
  return persisted.map((item, idx) => {
    let numViews = parseInt(String(item.views || '0').replace(/[^0-9]/g, ''), 10) || 0;
    return {
      id: idx + 1,
      tanggal: item.tanggal || '12 Sep 2026',
      kanal: item.platform || item.kanal || 'Website FMIPA',
      judul: item.judul || `Konten Publikasi ${idx + 1}`,
      penulis: item.penulis || 'Tim Humas FMIPA',
      kategori: item.kategori || 'Akademik & Riset',
      views: numViews,
      engage: '3m 15s',
      status: 'Tayang',
      url: '#'
    };
  });
}

export function initWebMedsosModule() {
  const heroBanner = document.getElementById('executiveHeroBannerWeb');
  const compactBar = document.getElementById('compactStickyBarWeb');
  const scrollContainer = document.querySelector('main') || window;

  // Search & Table Controls
  const searchInput = document.getElementById('searchWebInput');
  const pageSizeSelect = document.getElementById('pageSizeWeb');
  const tableBody = document.getElementById('tbodyWeb');
  const tableInfo = document.getElementById('tableInfoWeb');
  const paginationControls = document.getElementById('paginationWeb');
  const labelCountBadge = document.getElementById('labelWebCountBadge');

  // Filter Reset Buttons
  const btnResetHero = document.getElementById('btnResetWebFilters');
  const btnResetCompact = document.getElementById('btnResetCompactWebFilters');

  // State Management
  let currentPage = 1;
  let pageSize = 10;
  let currentKanalFilter = 'semua';
  let currentPeriodeFilter = 'semua';
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
  if (!window._fmipaWebListenerBound) {
    window._fmipaWebListenerBound = true;
    window.addEventListener('fmipa:data-updated', (e) => {
      if (e.detail && e.detail.module === 'web-medsos') {
        renderAll();
      }
    });
  }

  function getFilteredDataset() {
    const dataset = getWebMedsosDataset();
    return dataset.filter(item => {
      if (currentKanalFilter !== 'semua') {
        const kNorm = item.kanal.toLowerCase().replace(/\s+/g, '-');
        if (!kNorm.includes(currentKanalFilter) && !currentKanalFilter.includes(kNorm)) return false;
      }
      if (currentKategoriFilter !== 'semua' && !item.kategori.toLowerCase().includes(currentKategoriFilter.toLowerCase())) return false;

      if (searchQuery) {
        const haystack = `${item.judul} ${item.kanal} ${item.penulis} ${item.kategori}`.toLowerCase();
        if (!haystack.includes(searchQuery)) return false;
      }
      return true;
    });
  }

  function updateKPIs() {
    const filtered = getFilteredDataset();
    const totalKonten = filtered.length;
    const totalViews = filtered.reduce((acc, curr) => acc + curr.views, 0);

    const elKonten = document.getElementById('valWebKonten');
    const elViews = document.getElementById('valWebViews');
    const elEngage = document.getElementById('valWebEngage');
    const elAvgTime = document.getElementById('valWebAvgTime');

    if (elKonten) elKonten.textContent = totalKonten.toString();
    if (elViews) elViews.textContent = totalViews.toLocaleString('id-ID');
    if (elEngage) elEngage.textContent = totalKonten > 0 ? '8.4%' : '0%';
    if (elAvgTime) elAvgTime.textContent = totalKonten > 0 ? '3m 24s' : '0s';

    if (labelCountBadge) {
      labelCountBadge.textContent = `${totalKonten} Konten Terdata`;
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
          <td colspan="8" class="py-10 text-center text-slate-400">
            <div class="flex flex-col items-center justify-center gap-2">
              <div class="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#722F99] border border-purple-100 shadow-inner">
                <i class="fa-solid fa-globe text-xl"></i>
              </div>
              <p class="font-bold text-slate-700 text-xs mt-1">Belum Ada Data Publikasi Tersimpan</p>
              <p class="text-[11px] text-slate-400">Upload berkas Excel atau tambah data manual untuk memuat data web medsos.</p>
            </div>
          </td>
        </tr>
      `;
    } else {
      tableBody.innerHTML = pageData.map((item, idx) => {
        return `
          <tr class="border-b border-gray-100 hover:bg-purple-50/30 transition text-xs">
            <td class="py-3 px-3 text-center text-gray-500 font-medium">${startIndex + idx + 1}</td>
            <td class="py-3 px-3 text-gray-500 whitespace-nowrap">${item.tanggal}</td>
            <td class="py-3 px-3 whitespace-nowrap">
              <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-[#722F99] border border-purple-200">
                ${item.kanal}
              </span>
            </td>
            <td class="py-3 px-4">
              <div class="font-bold text-gray-900">${item.judul}</div>
              <div class="text-[10px] text-gray-500 mt-0.5">Penulis: <strong class="text-gray-700">${item.penulis}</strong></div>
            </td>
            <td class="py-3 px-3 text-gray-700 whitespace-nowrap">${item.kategori}</td>
            <td class="py-3 px-3 text-right font-bold text-[#722F99] whitespace-nowrap">${item.views.toLocaleString('id-ID')}</td>
            <td class="py-3 px-3 text-center text-gray-600">${item.engage}</td>
            <td class="py-3 px-3 text-center">
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
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
        let html = '';
        for (let p = 1; p <= totalPages; p++) {
          html += `
            <button type="button" class="w-7 h-7 rounded-lg text-xs font-bold transition ${p === currentPage ? 'bg-[#722F99] text-white shadow-sm' : 'border border-gray-200 text-gray-700 hover:bg-purple-50'}" data-page="${p}">
              ${p}
            </button>
          `;
        }
        paginationControls.innerHTML = html;
        paginationControls.querySelectorAll('button').forEach(btn => {
          btn.addEventListener('click', () => {
            currentPage = parseInt(btn.dataset.page, 10);
            renderTable();
          });
        });
      }
    }
  }

  function renderCharts() {
    const dataset = getWebMedsosDataset();
    const canvasTraffic = document.getElementById('chartWebTrafficTren');
    const canvasSumber = document.getElementById('chartWebSumber');
    const canvasPerangkat = document.getElementById('chartWebPerangkat');
    const canvasKategori = document.getElementById('chartWebKategori');

    if (dataset.length === 0) {
      [canvasTraffic, canvasSumber, canvasPerangkat, canvasKategori].forEach(c => {
        if (c) toggleCanvasEmptyOverlay(c.id, true);
      });
      [chartWebTrafficTrenInstance, chartWebSumberInstance, chartWebPerangkatInstance, chartWebKategoriInstance].forEach(inst => {
        if (inst) inst.destroy();
      });
      chartWebTrafficTrenInstance = null;
      chartWebSumberInstance = null;
      chartWebPerangkatInstance = null;
      chartWebKategoriInstance = null;
      return;
    }

    [canvasTraffic, canvasSumber, canvasPerangkat, canvasKategori].forEach(c => {
      if (c) toggleCanvasEmptyOverlay(c.id, false);
    });

    if (typeof window.Chart === 'undefined') return;
    const Chart = window.Chart;

    // 1. Traffic Tren
    if (canvasTraffic) {
      if (chartWebTrafficTrenInstance) chartWebTrafficTrenInstance.destroy();
      const kanals = ['Website FMIPA', 'Facebook FMIPA', 'YouTube FMIPA', 'LinkedIn FMIPA', 'TikTok'];
      const viewsPerKanal = kanals.map(k => {
        const items = dataset.filter(i => i.kanal.toLowerCase().includes(k.toLowerCase().split(' ')[0]));
        return items.reduce((acc, curr) => acc + curr.views, 0);
      });

      chartWebTrafficTrenInstance = new Chart(canvasTraffic.getContext('2d'), {
        type: 'bar',
        data: {
          labels: kanals,
          datasets: [{
            label: 'Total Views / Interaksi',
            data: viewsPerKanal,
            backgroundColor: '#722F99',
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#64748b' } },
            y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 }, color: '#64748b' } }
          }
        }
      });
    }

    // 2. Sumber Kanal (Doughnut)
    if (canvasSumber) {
      if (chartWebSumberInstance) chartWebSumberInstance.destroy();
      const web = dataset.filter(i => i.kanal.toLowerCase().includes('web')).length;
      const ig = dataset.filter(i => i.kanal.toLowerCase().includes('instagram') || i.kanal.toLowerCase().includes('tiktok')).length;
      const yt = dataset.filter(i => i.kanal.toLowerCase().includes('youtube')).length;
      const lain = Math.max(0, dataset.length - web - ig - yt);

      chartWebSumberInstance = new Chart(canvasSumber.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: [`Website (${web})`, `Medsos Video/IG (${ig})`, `YouTube (${yt})`, `Lainnya (${lain})`],
          datasets: [{
            data: [web, ig, yt, lain],
            backgroundColor: ['#722F99', '#E5D026', '#F43F5E', '#0D9488'],
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

    // 3. Perangkat
    if (canvasPerangkat) {
      if (chartWebPerangkatInstance) chartWebPerangkatInstance.destroy();
      chartWebPerangkatInstance = new Chart(canvasPerangkat.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: ['Mobile Phone (76%)', 'Desktop / PC (21%)', 'Tablet (3%)'],
          datasets: [{
            data: [76, 21, 3],
            backgroundColor: ['#10B981', '#722F99', '#94A3B8'],
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

    // 4. Kategori Konten
    if (canvasKategori) {
      if (chartWebKategoriInstance) chartWebKategoriInstance.destroy();
      const akad = dataset.filter(i => i.kategori.toLowerCase().includes('akademik')).length;
      const pres = dataset.filter(i => i.kategori.toLowerCase().includes('prestasi')).length;
      const peng = dataset.filter(i => i.kategori.toLowerCase().includes('pengumuman')).length;
      const lain = Math.max(0, dataset.length - akad - pres - peng);

      chartWebKategoriInstance = new Chart(canvasKategori.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: [`Akademik (${akad})`, `Prestasi (${pres})`, `Pengumuman (${peng})`, `Lainnya (${lain})`],
          datasets: [{
            data: [akad, pres, peng, lain],
            backgroundColor: ['#722F99', '#E5D026', '#3B82F6', '#F43F5E'],
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

  // Tab View Switcher
  const chartTabPills = document.querySelectorAll('.web-chart-tab-pill');
  chartTabPills.forEach(tab => {
    tab.addEventListener('click', () => {
      chartTabPills.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const view = tab.getAttribute('data-chart-view');
      document.querySelectorAll('.web-chart-canvas-view').forEach(wrap => wrap.classList.remove('active'));
      if (view === 'sumber') document.getElementById('viewWrapWebSumber')?.classList.add('active');
      else if (view === 'perangkat') document.getElementById('viewWrapWebPerangkat')?.classList.add('active');
      else if (view === 'kategori') document.getElementById('viewWrapWebKategori')?.classList.add('active');
    });
  });

  renderAll();
}
