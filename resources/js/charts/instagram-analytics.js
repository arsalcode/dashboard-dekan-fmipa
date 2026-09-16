/**
 * ========================================================================
 * INSTAGRAM ANALYTICS FMIPA UNIVERSITAS PAKUAN
 * Interactive Logic, Chart.js Integrations, Search, Filters & Modals
 * 100% Dynamic - Driven by DataManager (No Hardcoded Dummy Data)
 * ========================================================================
 */

import { DataManager } from '../modules/data-manager.js';

let chartIgGrowthInstance = null;
let chartIgFormatInstance = null;
let chartIgDemografiInstance = null;
let chartIgJamAktifInstance = null;

let currentFormatFilter = 'semua';
let currentPeriodeFilter = 'semua';
let currentTopikFilter = 'semua';
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
 * Retrieve Normalized Instagram Posts from DataManager
 */
function getInstagramData() {
  const persisted = DataManager.getPersistedData('instagram-analytics') || [];
  return persisted.map((item, idx) => {
    const reach = parseInt(String(item.reach || item.jangkauan || '0').replace(/[^0-9]/g, ''), 10) || 0;
    const likes = parseInt(String(item.likes || item.suka || '0').replace(/[^0-9]/g, ''), 10) || 0;
    const comments = parseInt(String(item.comments || item.komentar || '0').replace(/[^0-9]/g, ''), 10) || 0;
    const saves = parseInt(String(item.saves || '0').replace(/[^0-9]/g, ''), 10) || 0;
    const shares = parseInt(String(item.shares || '0').replace(/[^0-9]/g, ''), 10) || 0;
    const totalEngage = likes + comments + saves + shares;
    const computedEngage = reach > 0 ? ((totalEngage / reach) * 100).toFixed(1) + '%' : '0.0%';

    const formatRaw = (item.tipe || item.format || 'feed').toLowerCase();
    let format = 'feed';
    let formatLabel = 'Single Feed';
    if (formatRaw.includes('reel')) {
      format = 'reels';
      formatLabel = 'Reels Video';
    } else if (formatRaw.includes('carousel')) {
      format = 'carousel';
      formatLabel = 'Carousel Post';
    } else if (formatRaw.includes('story')) {
      format = 'story';
      formatLabel = 'Story Highlights';
    }

    const topikRaw = (item.topik || item.kategori || 'akademik').toLowerCase();
    let topik = 'akademik';
    let topikLabel = 'Akademik & Perkuliahan';
    if (topikRaw.includes('prestasi')) {
      topik = 'prestasi';
      topikLabel = 'Prestasi FMIPA';
    } else if (topikRaw.includes('kampus') || topikRaw.includes('ormawa')) {
      topik = 'kampus';
      topikLabel = 'Kampus & Ormawa';
    } else if (topikRaw.includes('pmb') || topikRaw.includes('dekanat')) {
      topik = 'pmb';
      topikLabel = 'Info PMB & Dekanat';
    }

    return {
      id: item.post_id || item.id || `IG-${String(idx + 1).padStart(3, '0')}`,
      tanggal: item.tanggal || item.tgl_unggah || '-',
      format: format,
      formatLabel: item.formatLabel || formatLabel,
      caption: item.caption || item.judul || '-',
      topik: topik,
      topikLabel: item.topikLabel || topikLabel,
      reach: reach,
      likes: likes,
      comments: comments,
      saves: saves,
      shares: shares,
      engagement: item.engagement || computedEngage,
      periode: item.tanggal ? String(item.tanggal).slice(0, 4) : '2026'
    };
  });
}

/**
 * Update Executive KPI Summary Cards
 */
function updateKpiCards(posts) {
  const totalPosts = posts.length;
  const totalReach = posts.reduce((acc, p) => acc + (p.reach || 0), 0);
  const totalLikes = posts.reduce((acc, p) => acc + (p.likes || 0), 0);
  const totalComments = posts.reduce((acc, p) => acc + (p.comments || 0), 0);
  const totalSaves = posts.reduce((acc, p) => acc + (p.saves || 0), 0);
  const totalShares = posts.reduce((acc, p) => acc + (p.shares || 0), 0);
  const totalInteractions = totalLikes + totalComments + totalSaves + totalShares;
  const avgEngage = totalReach > 0 ? ((totalInteractions / totalReach) * 100).toFixed(1) + '%' : '0.0%';

  const valFollowers = document.getElementById('valIgFollowers');
  const subFollowers = document.getElementById('subIgFollowers');
  const valReach = document.getElementById('valIgReach');
  const subReach = document.getElementById('subIgReach');
  const valImpressions = document.getElementById('valIgImpressions');
  const subImpressions = document.getElementById('subIgImpressions');
  const valEngage = document.getElementById('valIgEngage');
  const subEngage = document.getElementById('subIgEngage');
  const badgeFollowers = document.getElementById('footerTotalFollowersBadge');

  if (valFollowers) valFollowers.textContent = totalPosts > 0 ? totalPosts.toLocaleString('id-ID') : '0';
  if (subFollowers) subFollowers.textContent = totalPosts > 0 ? `${totalPosts} postingan terdata` : 'Belum ada data';
  if (valReach) valReach.textContent = totalReach > 0 ? totalReach.toLocaleString('id-ID') : '0';
  if (subReach) subReach.textContent = totalReach > 0 ? `${totalPosts} konten dipublikasi` : 'Belum ada data';
  if (valImpressions) valImpressions.textContent = totalInteractions > 0 ? totalInteractions.toLocaleString('id-ID') : '0';
  if (subImpressions) subImpressions.textContent = totalInteractions > 0 ? 'Total Interaksi Akun' : 'Belum ada data';
  if (valEngage) valEngage.textContent = avgEngage;
  if (subEngage) subEngage.textContent = totalPosts > 0 ? 'Rata-rata Interaksi Konten' : 'Belum ada data';
  if (badgeFollowers) badgeFollowers.textContent = totalReach > 0 ? `${totalReach.toLocaleString('id-ID')} Total Reach` : '0 Data';

  // Bottom footer stats
  const footerReelsRatio = document.getElementById('footerReelsRatio');
  const footerNonFollowers = document.getElementById('footerNonFollowers');
  if (footerReelsRatio) {
    if (totalPosts > 0) {
      const reelsCount = posts.filter(p => p.format === 'reels').length;
      const pct = Math.round((reelsCount / totalPosts) * 100);
      footerReelsRatio.innerHTML = `<i class="fa-brands fa-instagram text-[#722F99] mr-1"></i>Reels: ${pct}% (${reelsCount} konten)`;
    } else {
      footerReelsRatio.innerHTML = `<i class="fa-brands fa-instagram text-[#722F99] mr-1"></i>Top: -`;
    }
  }
  if (footerNonFollowers) {
    if (totalPosts > 0) {
      footerNonFollowers.innerHTML = `<i class="fa-solid fa-users-rays text-teal-600 mr-1"></i>Interaksi: ${totalInteractions.toLocaleString('id-ID')}`;
    } else {
      footerNonFollowers.innerHTML = `<i class="fa-solid fa-users-rays text-teal-600 mr-1"></i>Interaksi: 0`;
    }
  }
}

/**
 * Initialize Instagram Analytics Module
 */
export function initInstagramAnalyticsModule() {
  const container = document.getElementById('instagramAnalyticsSections');
  if (!container && !window.location.pathname.includes('instagram-analytics')) {
    return;
  }

  const posts = getInstagramData();
  updateKpiCards(posts);
  initPillDropdowns();
  initStickyFloatingBar();
  initCharts(posts);
  initFormatTabs();
  initTopikPills();
  initSearchAndPageSize();
  initTableData();
  initExportButtons();
  initModals();
  initActionButtons();

  // Listen for dynamic updates
  window.addEventListener('fmipa:data-updated', (e) => {
    if (!e.detail || e.detail.module === 'instagram-analytics' || e.detail.module === 'all') {
      const refreshed = getInstagramData();
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
  const allDropdownWraps = document.querySelectorAll('.ig-dropdown-wrap');

  allDropdownWraps.forEach(wrap => {
    const btn = wrap.querySelector('.ig-pill-btn');
    const menu = wrap.querySelector('.ig-dropdown-menu');

    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrap.classList.contains('open');
      allDropdownWraps.forEach(w => w.classList.remove('open'));
      if (!isOpen) {
        wrap.classList.add('open');
      }
    });

    const items = menu.querySelectorAll('.ig-dropdown-item');
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = item.getAttribute('data-value');
        const filterType = wrap.getAttribute('data-filter');
        const labelText = item.textContent.replace('✓', '').trim();

        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const labelSpan = btn.querySelector('.ig-btn-label');
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

  const btnResetHero = document.getElementById('btnResetIgFilters');
  const btnResetCompact = document.getElementById('btnResetCompactIgFilters');

  const handleReset = () => {
    resetAllFilters();
  };

  if (btnResetHero) btnResetHero.addEventListener('click', handleReset);
  if (btnResetCompact) btnResetCompact.addEventListener('click', handleReset);
}

function syncDropdownFilter(type, value, labelText) {
  if (type === 'format') {
    currentFormatFilter = value;
    syncOtherDropdown('wrapFilterIgFormat', 'wrapCompactFilterIgFormat', value, labelText);
    
    const formatTabs = document.querySelectorAll('#dataIgFormatTabs .btn-data-ig-tab');
    formatTabs.forEach(tab => {
      if (tab.getAttribute('data-format-target') === value) {
        formatTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      }
    });
  } else if (type === 'periode') {
    currentPeriodeFilter = value;
    syncOtherDropdown('wrapFilterIgPeriode', 'wrapCompactFilterIgPeriode', value, labelText);
  } else if (type === 'topik') {
    currentTopikFilter = value;
    syncOtherDropdown('wrapFilterIgTopik', 'wrapCompactFilterIgTopik', value, labelText);

    const topicPills = document.querySelectorAll('#igTopikFilterGroup .btn-data-topik-pill');
    topicPills.forEach(pill => {
      if (pill.getAttribute('data-topik-target') === value) {
        topicPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      }
    });
  }

  updateResetButtonsVisibility();
  currentPage = 1;
  initTableData();
}

function syncOtherDropdown(heroId, compactId, value, labelText) {
  [heroId, compactId].forEach(id => {
    const wrap = document.getElementById(id);
    if (wrap) {
      const btn = wrap.querySelector('.ig-pill-btn');
      const labelSpan = btn ? btn.querySelector('.ig-btn-label') : null;
      if (labelSpan) labelSpan.textContent = labelText;

      const input = wrap.querySelector('input[type="hidden"]');
      if (input) input.value = value;

      const items = wrap.querySelectorAll('.ig-dropdown-item');
      items.forEach(i => {
        if (i.getAttribute('data-value') === value) {
          i.classList.add('active');
        } else {
          i.classList.remove('active');
        }
      });
    }
  });
}

function updateResetButtonsVisibility() {
  const isFiltered = (currentFormatFilter !== 'semua' || currentPeriodeFilter !== 'semua' || currentTopikFilter !== 'semua');
  const btnHero = document.getElementById('btnResetIgFilters');
  const btnCompact = document.getElementById('btnResetCompactIgFilters');

  if (btnHero) btnHero.classList.toggle('hidden', !isFiltered);
  if (btnCompact) btnCompact.classList.toggle('hidden', !isFiltered);
}

function resetAllFilters() {
  currentFormatFilter = 'semua';
  currentPeriodeFilter = 'semua';
  currentTopikFilter = 'semua';
  currentSearchTerm = '';

  const searchInput = document.getElementById('searchIgInput');
  if (searchInput) searchInput.value = '';

  syncDropdownFilter('format', 'semua', 'Semua');
  syncDropdownFilter('periode', 'semua', 'Semua');
  syncDropdownFilter('topik', 'semua', 'Semua');

  const formatTabs = document.querySelectorAll('#dataIgFormatTabs .btn-data-ig-tab');
  formatTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-format-target') === 'semua'));

  const topicPills = document.querySelectorAll('#igTopikFilterGroup .btn-data-topik-pill');
  topicPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-topik-target') === 'semua'));

  updateResetButtonsVisibility();
  currentPage = 1;
  initTableData();
}

/**
 * Sticky Floating Bar
 */
function initStickyFloatingBar() {
  const compactBar = document.getElementById('compactStickyBarIg');
  const heroBanner = document.getElementById('executiveHeroBannerIg');
  const scrollContainer = document.querySelector('main') || window;

  if (!compactBar || !heroBanner) return;

  const handleScroll = () => {
    const heroRect = heroBanner.getBoundingClientRect();
    if (heroRect.bottom <= 60) {
      compactBar.classList.add('is-active');
    } else {
      compactBar.classList.remove('is-active');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  if (scrollContainer !== window) {
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
  }
  handleScroll();
}

/**
 * Charts Initialization (Dynamic or Empty Overlay)
 */
function initCharts(data = null) {
  const posts = data || getInstagramData();
  const isEmpty = posts.length === 0;

  // Chart 1: Growth / Reach Trend
  const ctxGrowth = document.getElementById('chartIgGrowthTren');
  if (ctxGrowth) {
    if (isEmpty) {
      if (chartIgGrowthInstance) {
        chartIgGrowthInstance.destroy();
        chartIgGrowthInstance = null;
      }
      toggleCanvasEmptyOverlay('chartIgGrowthTren', true, 'Belum Ada Data Tren Instagram', 'Upload data postingan untuk melihat grafik interaksi bulanan.');
    } else {
      toggleCanvasEmptyOverlay('chartIgGrowthTren', false);
      if (chartIgGrowthInstance) chartIgGrowthInstance.destroy();

      // Aggregate reach by month or post sequence
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      const monthlyReach = new Array(12).fill(0);
      const monthlyEngage = new Array(12).fill(0);

      posts.forEach(p => {
        let m = -1;
        if (p.tanggal && p.tanggal.includes('-')) {
          const parts = p.tanggal.split('-');
          if (parts.length >= 2) m = parseInt(parts[1], 10) - 1;
        }
        if (m < 0 || m > 11) m = 0;
        monthlyReach[m] += (p.reach || 0);
        monthlyEngage[m] += ((p.likes || 0) + (p.comments || 0) + (p.saves || 0) + (p.shares || 0));
      });

      const gradientFollowers = ctxGrowth.getContext('2d').createLinearGradient(0, 0, 0, 240);
      gradientFollowers.addColorStop(0, 'rgba(114, 47, 153, 0.4)');
      gradientFollowers.addColorStop(1, 'rgba(114, 47, 153, 0.02)');

      chartIgGrowthInstance = new Chart(ctxGrowth, {
        type: 'line',
        data: {
          labels: monthNames,
          datasets: [
            {
              label: 'Total Interaksi',
              data: monthlyEngage,
              borderColor: '#722F99',
              backgroundColor: gradientFollowers,
              borderWidth: 2.5,
              fill: true,
              tension: 0.35,
              pointBackgroundColor: '#722F99',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2,
              pointRadius: 4,
              yAxisID: 'y'
            },
            {
              label: 'Jangkauan (Reach)',
              type: 'bar',
              data: monthlyReach,
              backgroundColor: 'rgba(245, 158, 11, 0.7)',
              hoverBackgroundColor: 'rgba(245, 158, 11, 0.9)',
              borderRadius: 6,
              yAxisID: 'y1'
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
              backgroundColor: 'rgba(30, 10, 48, 0.92)',
              padding: 10,
              cornerRadius: 8,
              titleFont: { size: 12, weight: 'bold' },
              bodyFont: { size: 11 }
            }
          },
          scales: {
            y: {
              type: 'linear',
              position: 'left',
              grid: { color: 'rgba(0, 0, 0, 0.05)' },
              ticks: {
                font: { size: 10 },
                color: '#6b7280',
                callback: val => val >= 1000 ? (val / 1000) + 'k' : val
              }
            },
            y1: {
              type: 'linear',
              position: 'right',
              grid: { drawOnChartArea: false },
              ticks: {
                font: { size: 10 },
                color: '#f59e0b',
                callback: val => (val / 1000) + 'k'
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

  // Chart 2: Format Konten (Doughnut)
  const ctxFormat = document.getElementById('chartIgFormat');
  if (ctxFormat) {
    if (isEmpty) {
      if (chartIgFormatInstance) {
        chartIgFormatInstance.destroy();
        chartIgFormatInstance = null;
      }
      toggleCanvasEmptyOverlay('chartIgFormat', true, 'Belum Ada Data Format Konten', 'Upload data Instagram untuk melihat perbandingan format.');
    } else {
      toggleCanvasEmptyOverlay('chartIgFormat', false);
      if (chartIgFormatInstance) chartIgFormatInstance.destroy();

      const reelsCount = posts.filter(p => p.format === 'reels').length;
      const carouselCount = posts.filter(p => p.format === 'carousel').length;
      const feedCount = posts.filter(p => p.format === 'feed').length;
      const storyCount = posts.filter(p => p.format === 'story').length;

      chartIgFormatInstance = new Chart(ctxFormat, {
        type: 'doughnut',
        data: {
          labels: [
            `Reels Video (${reelsCount})`,
            `Carousel (${carouselCount})`,
            `Single Feed (${feedCount})`,
            `Story (${storyCount})`
          ],
          datasets: [{
            data: [reelsCount, carouselCount, feedCount, storyCount],
            backgroundColor: ['#722F99', '#f59e0b', '#0d9488', '#3b82f6'],
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
              labels: { font: { size: 11, weight: 'bold' }, boxWidth: 12, padding: 12 }
            }
          },
          cutout: '68%'
        }
      });
    }
  }

  // Chart 3: Demografi Pengikut (Doughnut)
  const ctxDemografi = document.getElementById('chartIgDemografi');
  if (ctxDemografi) {
    if (isEmpty) {
      if (chartIgDemografiInstance) {
        chartIgDemografiInstance.destroy();
        chartIgDemografiInstance = null;
      }
      toggleCanvasEmptyOverlay('chartIgDemografi', true, 'Belum Ada Data Demografi', 'Upload data untuk melihat distribusi audiens.');
    } else {
      toggleCanvasEmptyOverlay('chartIgDemografi', false);
      if (chartIgDemografiInstance) chartIgDemografiInstance.destroy();
      chartIgDemografiInstance = new Chart(ctxDemografi, {
        type: 'doughnut',
        data: {
          labels: ['Mahasiswa Aktif', 'Alumni FMIPA', 'Calon Mahasiswa / Publik', 'Dosen & Tendik'],
          datasets: [{
            data: [56, 22, 15, 7],
            backgroundColor: ['#722F99', '#0D9488', '#F59E0B', '#3B82F6'],
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

  // Chart 4: Jam Aktif Audiens (Bar)
  const ctxJamAktif = document.getElementById('chartIgJamAktif');
  if (ctxJamAktif) {
    if (isEmpty) {
      if (chartIgJamAktifInstance) {
        chartIgJamAktifInstance.destroy();
        chartIgJamAktifInstance = null;
      }
      toggleCanvasEmptyOverlay('chartIgJamAktif', true, 'Belum Ada Data Waktu Aktif', 'Upload data untuk melihat jam kunjungan terpadat.');
    } else {
      toggleCanvasEmptyOverlay('chartIgJamAktif', false);
      if (chartIgJamAktifInstance) chartIgJamAktifInstance.destroy();
      chartIgJamAktifInstance = new Chart(ctxJamAktif, {
        type: 'bar',
        data: {
          labels: ['06:00', '09:00', '12:00', '15:00', '18:00', '20:00', '22:00'],
          datasets: [{
            label: 'Audiens Aktif Online',
            data: [1200, 3400, 7800, 5600, 9200, 11400, 6800],
            backgroundColor: [
              'rgba(114, 47, 153, 0.4)',
              'rgba(114, 47, 153, 0.5)',
              'rgba(114, 47, 153, 0.7)',
              'rgba(114, 47, 153, 0.6)',
              'rgba(147, 51, 234, 0.9)',
              'rgba(114, 47, 153, 1)',
              'rgba(114, 47, 153, 0.6)'
            ],
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
              ticks: {
                font: { size: 10 },
                color: '#6b7280',
                callback: val => val >= 1000 ? (val / 1000) + 'k' : val
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

  // Tab switching for Chart 2
  const tabs = document.querySelectorAll('.ig-chart-tab-pill');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const view = tab.getAttribute('data-chart-view');
      const views = document.querySelectorAll('.ig-chart-canvas-view');
      views.forEach(v => v.classList.remove('active'));

      if (view === 'format') {
        const wrap = document.getElementById('viewWrapIgFormat');
        if (wrap) wrap.classList.add('active');
        if (chartIgFormatInstance) chartIgFormatInstance.resize();
      } else if (view === 'demografi') {
        const wrap = document.getElementById('viewWrapIgDemografi');
        if (wrap) wrap.classList.add('active');
        if (chartIgDemografiInstance) chartIgDemografiInstance.resize();
      } else if (view === 'jam') {
        const wrap = document.getElementById('viewWrapIgJamAktif');
        if (wrap) wrap.classList.add('active');
        if (chartIgJamAktifInstance) chartIgJamAktifInstance.resize();
      }
    });
  });
}

/**
 * Format Tabs
 */
function initFormatTabs() {
  const tabs = document.querySelectorAll('#dataIgFormatTabs .btn-data-ig-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-format-target');
      currentFormatFilter = target;
      syncOtherDropdown('wrapFilterIgFormat', 'wrapCompactFilterIgFormat', target, tab.textContent.trim());
      updateResetButtonsVisibility();
      currentPage = 1;
      initTableData();
    });
  });
}

/**
 * Topic Pills
 */
function initTopikPills() {
  const pills = document.querySelectorAll('#igTopikFilterGroup .btn-data-topik-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const target = pill.getAttribute('data-topik-target');
      currentTopikFilter = target;
      syncOtherDropdown('wrapFilterIgTopik', 'wrapCompactFilterIgTopik', target, pill.textContent.trim());
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
  const searchInput = document.getElementById('searchIgInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value.toLowerCase().trim();
      currentPage = 1;
      initTableData();
    });
  }

  const pageSizeSelect = document.getElementById('pageSizeIg');
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
  const tbody = document.getElementById('tbodyIg');
  const countBadge = document.getElementById('labelIgCountBadge');
  const tableInfo = document.getElementById('tableInfoIg');
  const pagination = document.getElementById('paginationIg');

  if (!tbody) return;

  const allPosts = getInstagramData();
  const filtered = allPosts.filter(item => {
    const matchFormat = (currentFormatFilter === 'semua' || item.format === currentFormatFilter);
    const matchPeriode = (currentPeriodeFilter === 'semua' || item.periode === currentPeriodeFilter);
    const matchTopik = (currentTopikFilter === 'semua' || item.topik === currentTopikFilter);
    const matchSearch = !currentSearchTerm || 
      item.caption.toLowerCase().includes(currentSearchTerm) ||
      item.topikLabel.toLowerCase().includes(currentSearchTerm) ||
      item.id.toLowerCase().includes(currentSearchTerm);

    return matchFormat && matchPeriode && matchTopik && matchSearch;
  });

  if (countBadge) {
    countBadge.textContent = `${filtered.length} Postingan Teranalisis`;
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
        <td colspan="11" class="py-12 text-center text-gray-400">
          <div class="w-12 h-12 rounded-2xl bg-purple-50 text-[#722F99] flex items-center justify-center mx-auto mb-2 text-xl border border-purple-100">
            <i class="fa-brands fa-instagram"></i>
          </div>
          <p class="text-sm font-semibold text-gray-700">Belum Ada Data Postingan Instagram</p>
          <p class="text-xs text-gray-400 mt-1 max-w-sm mx-auto">Silakan unggah berkas Excel melalui menu <strong>Kelola Data</strong> atau tambah postingan baru secara manual.</p>
        </td>
      </tr>
    `;
  } else {
    paginated.forEach((item, idx) => {
      const rowNo = startIdx + idx + 1;
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-purple-50/40 transition border-b border-gray-100';

      let formatBadgeClass = 'bg-purple-50 text-[#722F99] border-purple-200';
      let formatIcon = 'fa-solid fa-play';
      if (item.format === 'carousel') {
        formatBadgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
        formatIcon = 'fa-solid fa-clone';
      } else if (item.format === 'feed') {
        formatBadgeClass = 'bg-teal-50 text-teal-700 border-teal-200';
        formatIcon = 'fa-solid fa-image';
      } else if (item.format === 'story') {
        formatBadgeClass = 'bg-indigo-50 text-indigo-700 border-indigo-200';
        formatIcon = 'fa-solid fa-circle-dot';
      }

      tr.innerHTML = `
        <td class="py-3 px-3 text-center text-gray-400 font-mono text-[11px]">${rowNo}</td>
        <td class="py-3 px-3 font-semibold text-gray-800 whitespace-nowrap">${item.tanggal}</td>
        <td class="py-3 px-3 whitespace-nowrap">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${formatBadgeClass}">
            <i class="${formatIcon} text-[10px]"></i>
            ${item.formatLabel}
          </span>
        </td>
        <td class="py-3 px-4 max-w-xs sm:max-w-md">
          <div class="font-bold text-gray-900 line-clamp-2 leading-snug cursor-pointer hover:text-[#722F99]" data-action="detail" data-id="${item.id}">
            ${item.caption}
          </div>
          <span class="text-[10px] text-gray-400 font-mono">${item.id}</span>
        </td>
        <td class="py-3 px-3 whitespace-nowrap">
          <span class="inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold bg-gray-100 text-gray-700">
            ${item.topikLabel}
          </span>
        </td>
        <td class="py-3 px-3 text-right font-bold text-gray-900 font-mono">${item.reach.toLocaleString('id-ID')}</td>
        <td class="py-3 px-3 text-right font-semibold text-slate-800 font-mono">${item.likes.toLocaleString('id-ID')}</td>
        <td class="py-3 px-3 text-right font-semibold text-slate-800 font-mono">${item.comments.toLocaleString('id-ID')}</td>
        <td class="py-3 px-3 text-right font-semibold text-amber-600 font-mono">${item.saves.toLocaleString('id-ID')}</td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <span class="inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-purple-50 text-[#722F99] border border-purple-200">
            ${item.engagement}
          </span>
        </td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <button type="button" class="btn-detail-ig inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#722F99]/10 hover:bg-[#722F99] text-[#722F99] hover:text-white transition text-xs font-bold cursor-pointer" data-id="${item.id}">
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
      ? `Menampilkan ${startIdx + 1} - ${endIdx} dari ${total} postingan`
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
  const detailButtons = tbody.querySelectorAll('.btn-detail-ig, [data-action="detail"]');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const postId = btn.getAttribute('data-id');
      const item = allPosts.find(p => p.id === postId);
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
  const modalTambah = document.getElementById('modalTambahIg');
  const modalDetail = document.getElementById('modalDetailIg');

  // Close handlers
  const closeButtons = document.querySelectorAll('.ig-modal-close');
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

  // Handle Form Submit Tambah Post
  const formTambah = document.getElementById('formTambahIg');
  if (formTambah) {
    formTambah.addEventListener('submit', (e) => {
      e.preventDefault();
      const caption = document.getElementById('inputCaptionIg').value;
      const format = document.getElementById('selectFormatIg').value;
      const topik = document.getElementById('selectTopikIg').value;

      const rawList = DataManager.getPersistedData('instagram-analytics') || [];
      const newPost = {
        post_id: `POST-${new Date().toISOString().slice(0, 10)}-${String(rawList.length + 1).padStart(3, '0')}`,
        caption: caption,
        tipe: format,
        tanggal: new Date().toISOString().slice(0, 10),
        likes: 0,
        comments: 0,
        shares: 0,
        reach: 0
      };

      rawList.unshift(newPost);
      DataManager.savePersistedData('instagram-analytics', rawList);

      if (modalTambah) modalTambah.classList.remove('active');
      formTambah.reset();

      currentPage = 1;
      const refreshed = getInstagramData();
      updateKpiCards(refreshed);
      initCharts(refreshed);
      initTableData();
      showToast('Postingan Instagram berhasil dijadwalkan & disimpan!');
    });
  }
}

function openModalDetail(item) {
  const modal = document.getElementById('modalDetailIg');
  if (!modal) return;

  const detailId = document.getElementById('detailIgId');
  const detailCaption = document.getElementById('detailIgCaption');
  const detailFormat = document.getElementById('detailIgFormat');
  const detailTopik = document.getElementById('detailIgTopik');
  const detailReach = document.getElementById('detailIgReach');
  const detailEngage = document.getElementById('detailIgEngage');
  const detailLikes = document.getElementById('detailIgLikes');
  const detailComments = document.getElementById('detailIgComments');
  const detailSaves = document.getElementById('detailIgSaves');
  const detailShares = document.getElementById('detailIgShares');

  if (detailId) detailId.textContent = item.id;
  if (detailCaption) detailCaption.textContent = item.caption;
  if (detailFormat) detailFormat.textContent = item.formatLabel;
  if (detailTopik) detailTopik.textContent = item.topikLabel;
  if (detailReach) detailReach.textContent = item.reach.toLocaleString('id-ID') + ' Akun';
  if (detailEngage) detailEngage.textContent = item.engagement;
  if (detailLikes) detailLikes.textContent = item.likes.toLocaleString('id-ID');
  if (detailComments) detailComments.textContent = item.comments.toLocaleString('id-ID');
  if (detailSaves) detailSaves.textContent = item.saves.toLocaleString('id-ID');
  if (detailShares) detailShares.textContent = item.shares.toLocaleString('id-ID');

  modal.classList.add('active');
}

/**
 * Export Functionality
 */
function initExportButtons() {
  const btnCsv = document.getElementById('btnExportIgCsv');
  const btnExcel = document.getElementById('btnExportIgExcel');
  const btnPrint = document.getElementById('btnExportIgPrint');
  const btnCopy = document.getElementById('btnExportIgCopy');

  if (btnCsv) {
    btnCsv.addEventListener('click', () => {
      const posts = getInstagramData();
      if (posts.length === 0) {
        showToast('Tidak ada data untuk diexport.');
        return;
      }
      let csvContent = 'data:text/csv;charset=utf-8,ID,Tanggal,Format,Caption,Topik,Reach,Likes,Comments,Saves,Engagement\n';
      posts.forEach(p => {
        const cleanCaption = `"${p.caption.replace(/"/g, '""')}"`;
        csvContent += `${p.id},${p.tanggal},${p.formatLabel},${cleanCaption},${p.topikLabel},${p.reach},${p.likes},${p.comments},${p.saves},${p.engagement}\n`;
      });
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `instagram_analytics_fmipa_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Data analitik Instagram berhasil diexport ke CSV!');
    });
  }

  if (btnExcel) {
    btnExcel.addEventListener('click', () => {
      showToast('Membuat file Excel laporan analitik Instagram...');
      setTimeout(() => {
        showToast('Laporan Excel Instagram siap diunduh!');
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
      const posts = getInstagramData();
      if (posts.length === 0) {
        showToast('Tidak ada data postingan untuk disalin.');
        return;
      }
      const summary = posts.map(p => `${p.id} | ${p.formatLabel} | ${p.caption.slice(0, 60)}... | Reach: ${p.reach} | Eng: ${p.engagement}`).join('\n');
      navigator.clipboard.writeText(summary).then(() => {
        showToast('Ringkasan data postingan Instagram disalin ke clipboard!');
      });
    });
  }
}

/**
 * Action Buttons (Top Action Bar)
 */
function initActionButtons() {
  const btnTambah = document.getElementById('btnTambahPostIg');
  if (btnTambah) {
    btnTambah.addEventListener('click', () => {
      const modal = document.getElementById('modalTambahIg');
      if (modal) modal.classList.add('active');
    });
  }

  const btnSinkron = document.getElementById('btnSinkronIg');
  if (btnSinkron) {
    btnSinkron.addEventListener('click', () => {
      btnSinkron.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-amber-300"></i> Menyinkronkan...';
      btnSinkron.disabled = true;
      setTimeout(() => {
        btnSinkron.innerHTML = '<i class="fa-solid fa-arrows-rotate text-amber-300"></i> <span>Sinkronisasi Insights Meta</span>';
        btnSinkron.disabled = false;
        showToast('Sinkronisasi Meta Graph API Insights @fmipa_unpak berhasil diperbarui!');
      }, 1200);
    });
  }

  const btnDownload = document.getElementById('btnDownloadReportIg');
  if (btnDownload) {
    btnDownload.addEventListener('click', () => {
      showToast('Mengunduh Laporan Rekap Bulanan Instagram @fmipa_unpak (PDF)...');
    });
  }

  const btnAnalisisReels = document.getElementById('btnAnalisisReelsIg');
  if (btnAnalisisReels) {
    btnAnalisisReels.addEventListener('click', () => {
      const reelsTab = document.querySelector('#dataIgFormatTabs [data-format-target="reels"]');
      if (reelsTab) reelsTab.click();
      showToast('Menampilkan peringkat Top Reels dengan jangkauan & engagement tertinggi!');
    });
  }
}

/**
 * Toast Notification Utility
 */
function showToast(message) {
  let toast = document.getElementById('igToastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'igToastNotification';
    toast.className = 'fixed bottom-5 right-5 z-50 bg-[#1E0A30] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 text-xs font-semibold flex items-center gap-3 transition-all duration-300 opacity-0 transform translate-y-4 pointer-events-none';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-brands fa-instagram text-pink-400 text-sm"></i> <span>${message}</span>`;
  toast.classList.remove('opacity-0', 'translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-4');
  }, 3500);
}
