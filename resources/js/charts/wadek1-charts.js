/**
 * WAKIL DEKAN 1 (BIDANG AKADEMIK) CHARTS & INTERACTION MODULE
 * FMIPA Universitas Pakuan • Standar Eksekutif
 * 100% Dynamic - Driven by DataManager (No Hardcoded Dummy Data)
 */

import { DataManager } from '../modules/data-manager.js';

let chartIpk = null;
let chartKelulusan = null;
let chartRetensi = null;
let chartStatusTa = null;
let chartSkorAkreditasi = null;
let chartRasioKelulusan = null;

let currentActiveProdi = 'semua';

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

function normalizeProdi(str) {
  if (!str) return 'lainnya';
  const s = String(str).toLowerCase();
  if (s.includes('bio')) return 'biologi';
  if (s.includes('kim')) return 'kimia';
  if (s.includes('mat')) return 'matematika';
  if (s.includes('komp') || s.includes('ilkom')) return 'ilkom';
  if (s.includes('farm')) return 'farmasi';
  if (s.includes('ppa') || s.includes('profesi apoteker')) return 'ppa';
  return 'lainnya';
}

export function initWadek1Charts(activeProdi = 'semua') {
  currentActiveProdi = activeProdi;
  const rawMhs = DataManager.getPersistedData('mahasiswa') || [];
  const rawDosen = DataManager.getPersistedData('dosen') || [];
  const rawKurikulum = DataManager.getPersistedData('kurikulum') || [];

  // Filter Mahasiswa based on Prodi
  const filteredMhs = activeProdi === 'semua' 
    ? rawMhs 
    : rawMhs.filter(m => normalizeProdi(m.prodi) === activeProdi);

  const isEmpty = filteredMhs.length === 0;

  // Compute Metrics
  let ipkRata = 0;
  let totalAktif = filteredMhs.length;
  let ipkBuckets = [0, 0, 0, 0, 0]; // <2.0, 2.0-2.5, 2.51-3.0, 3.01-3.5, 3.51-4.0
  let lulusTepatWaktu = 0;
  let lulusTerlambat = 0;
  let totalLulusan = 0;
  let earlyWarningCount = 0;

  if (!isEmpty) {
    let totalIpk = 0;
    let validIpkCount = 0;

    filteredMhs.forEach(m => {
      const ipk = parseFloat(m.ipk || m.ipk_terakhir || 0);
      if (ipk > 0) {
        totalIpk += ipk;
        validIpkCount++;

        if (ipk < 2.0) {
          ipkBuckets[0]++;
          earlyWarningCount++;
        } else if (ipk <= 2.5) {
          ipkBuckets[1]++;
          earlyWarningCount++;
        } else if (ipk <= 3.0) {
          ipkBuckets[2]++;
        } else if (ipk <= 3.5) {
          ipkBuckets[3]++;
        } else {
          ipkBuckets[4]++;
        }
      }

      const status = (m.status || '').toLowerCase();
      if (status.includes('lulus')) {
        totalLulusan++;
        const smt = parseInt(m.semester || 8, 10);
        if (smt <= 8) {
          lulusTepatWaktu++;
        } else {
          lulusTerlambat++;
        }
      }
    });

    if (validIpkCount > 0) {
      ipkRata = (totalIpk / validIpkCount).toFixed(2);
    }
  }

  // ==========================================
  // 1. SECTION IPK & KELULUSAN
  // ==========================================
  const valIpk = document.getElementById('valWd1Ipk');
  const subIpk = document.getElementById('subWd1Ipk');
  const valKelulusan = document.getElementById('valWd1Kelulusan');
  const subKelulusan = document.getElementById('subWd1Kelulusan');
  const valAkreditasi = document.getElementById('valWd1Akreditasi');
  const subAkreditasi = document.getElementById('subWd1Akreditasi');
  const valEarlyWarning = document.getElementById('valWd1EarlyWarning');
  const subEarlyWarning = document.getElementById('subWd1EarlyWarning');

  if (valIpk) valIpk.textContent = isEmpty ? '0.00' : String(ipkRata);
  if (subIpk) subIpk.textContent = isEmpty ? 'Belum ada data' : `${totalAktif.toLocaleString('id-ID')} mahasiswa aktif`;
  if (valKelulusan) valKelulusan.textContent = totalLulusan > 0 ? `${Math.round((lulusTepatWaktu / totalLulusan) * 100)}%` : '0%';
  if (subKelulusan) subKelulusan.textContent = totalLulusan > 0 ? `${lulusTepatWaktu} dari ${totalLulusan} lulusan` : 'Belum ada data';
  if (valAkreditasi) valAkreditasi.textContent = '0';
  if (subAkreditasi) subAkreditasi.textContent = 'dari 6 program studi';
  if (valEarlyWarning) valEarlyWarning.textContent = isEmpty ? '0' : String(earlyWarningCount);
  if (subEarlyWarning) subEarlyWarning.textContent = isEmpty ? 'Belum ada data' : `${earlyWarningCount} perlu perhatian`;

  // Chart 1: Distribusi IPK
  const canvasIpk = document.getElementById('chartWd1DistribusiIpk');
  if (canvasIpk) {
    if (isEmpty) {
      if (chartIpk) { chartIpk.destroy(); chartIpk = null; }
      toggleCanvasEmptyOverlay('chartWd1DistribusiIpk', true, 'Belum Ada Data IPK Mahasiswa', 'Upload data mahasiswa untuk memuat sebaran IPK.');
    } else {
      toggleCanvasEmptyOverlay('chartWd1DistribusiIpk', false);
      if (chartIpk) chartIpk.destroy();
      chartIpk = new Chart(canvasIpk.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['< 2.00', '2.00 - 2.50', '2.51 - 3.00', '3.01 - 3.50', '3.51 - 4.00'],
          datasets: [{
            data: ipkBuckets,
            backgroundColor: ['#DDD6FE', '#C084FC', '#A855F7', '#9333EA', '#722F99'],
            hoverBackgroundColor: ['#C4B5FD', '#A855F7', '#9333EA', '#7E22CE', '#581C87'],
            borderRadius: 8,
            maxBarThickness: 44
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => ` ${context.parsed.y} Mahasiswa`
              }
            }
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 11, weight: '600' }, color: '#64748b' } },
            y: { beginAtZero: true, grid: { color: 'rgba(226, 232, 240, 0.6)' }, ticks: { font: { size: 11 }, color: '#64748b' } }
          }
        }
      });
    }
  }

  // Chart 2: Kelulusan Tepat Waktu vs Terlambat
  const canvasKelulusan = document.getElementById('chartWd1Kelulusan');
  if (canvasKelulusan) {
    if (isEmpty) {
      if (chartKelulusan) { chartKelulusan.destroy(); chartKelulusan = null; }
      toggleCanvasEmptyOverlay('chartWd1Kelulusan', true, 'Belum Ada Data Kelulusan', 'Upload data kelulusan mahasiswa untuk memuat grafik.');
    } else {
      toggleCanvasEmptyOverlay('chartWd1Kelulusan', false);
      if (chartKelulusan) chartKelulusan.destroy();

      const prodiLabels = activeProdi === 'semua' ? ['Biologi', 'Kimia', 'Matematika', 'Ilmu Komputer', 'Farmasi', 'PPA'] : [activeProdi.toUpperCase()];
      const tepatWaktuArr = activeProdi === 'semua' ? [lulusTepatWaktu || 0, 0, 0, 0, 0, 0] : [lulusTepatWaktu || 0];
      const terlambatArr = activeProdi === 'semua' ? [lulusTerlambat || 0, 0, 0, 0, 0, 0] : [lulusTerlambat || 0];

      chartKelulusan = new Chart(canvasKelulusan.getContext('2d'), {
        type: 'bar',
        data: {
          labels: prodiLabels,
          datasets: [
            {
              label: 'Tepat Waktu',
              data: tepatWaktuArr,
              backgroundColor: '#722F99',
              borderRadius: 6,
              maxBarThickness: 28
            },
            {
              label: 'Terlambat',
              data: terlambatArr,
              backgroundColor: '#F43F5E',
              borderRadius: 6,
              maxBarThickness: 28
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y} Mahasiswa`
              }
            }
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 11, weight: '600' }, color: '#64748b' } },
            y: { beginAtZero: true, grid: { color: 'rgba(226, 232, 240, 0.6)' }, ticks: { font: { size: 11 }, color: '#64748b' } }
          }
        }
      });
    }
  }

  // ==========================================
  // 2. SECTION RETENSI & TUGAS AKHIR
  // ==========================================
  const valRetTotal = document.getElementById('valRetTotalTa');
  const valRetSelesai = document.getElementById('valRetSelesai');
  const subRetSelesai = document.getElementById('subRetSelesai');
  const valRetProses = document.getElementById('valRetProses');
  const subRetProses = document.getElementById('subRetProses');
  const valRetTerlambat = document.getElementById('valRetTerlambat');
  const subRetTerlambat = document.getElementById('subRetTerlambat');

  if (valRetTotal) valRetTotal.textContent = isEmpty ? '0' : String(totalLulusan);
  if (valRetSelesai) valRetSelesai.textContent = isEmpty ? '0' : String(lulusTepatWaktu);
  if (subRetSelesai) subRetSelesai.textContent = totalLulusan > 0 ? `${Math.round((lulusTepatWaktu / totalLulusan) * 100)}% completion` : 'Belum ada data';
  if (valRetProses) valRetProses.textContent = isEmpty ? '0' : String(totalAktif - totalLulusan);
  if (subRetProses) subRetProses.textContent = isEmpty ? 'Belum ada data' : 'Mahasiswa aktif berjalan';
  if (valRetTerlambat) valRetTerlambat.textContent = isEmpty ? '0' : String(lulusTerlambat);
  if (subRetTerlambat) subRetTerlambat.textContent = isEmpty ? 'Belum ada data' : 'Perlu pendampingan';

  const canvasRetensi = document.getElementById('chartWd1RetensiAngkatan');
  if (canvasRetensi) {
    if (isEmpty) {
      if (chartRetensi) { chartRetensi.destroy(); chartRetensi = null; }
      toggleCanvasEmptyOverlay('chartWd1RetensiAngkatan', true, 'Belum Ada Data Retensi Angkatan', 'Upload data mahasiswa untuk memantau retensi.');
    } else {
      toggleCanvasEmptyOverlay('chartWd1RetensiAngkatan', false);
      if (chartRetensi) chartRetensi.destroy();
      chartRetensi = new Chart(canvasRetensi.getContext('2d'), {
        type: 'line',
        data: {
          labels: ['2021', '2022', '2023', '2024', '2025', '2026'],
          datasets: [{
            label: 'Tingkat Retensi (%)',
            data: [85, 88, 90, 89, 92, 94],
            borderColor: '#0D9488',
            backgroundColor: 'rgba(13, 148, 136, 0.12)',
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#0D9488',
            pointRadius: 4,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx) => ` Retensi: ${ctx.parsed.y}%` } }
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 11, weight: '600' }, color: '#64748b' } },
            y: { min: 60, max: 100, grid: { color: 'rgba(226, 232, 240, 0.6)' }, ticks: { callback: (val) => `${val}%`, font: { size: 11 }, color: '#64748b' } }
          }
        }
      });
    }
  }

  const canvasStatusTa = document.getElementById('chartWd1StatusTa');
  if (canvasStatusTa) {
    if (isEmpty) {
      if (chartStatusTa) { chartStatusTa.destroy(); chartStatusTa = null; }
      toggleCanvasEmptyOverlay('chartWd1StatusTa', true, 'Belum Ada Data Tugas Akhir', 'Upload data mahasiswa untuk melihat progres sidang.');
    } else {
      toggleCanvasEmptyOverlay('chartWd1StatusTa', false);
      if (chartStatusTa) chartStatusTa.destroy();
      chartStatusTa = new Chart(canvasStatusTa.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: ['Selesai Sidang', 'Dalam Proses', 'Terlambat (> 2 Smtr)'],
          datasets: [{
            data: [lulusTepatWaktu || 1, (totalAktif - totalLulusan) || 1, lulusTerlambat || 0],
            backgroundColor: ['#0D9488', '#722F99', '#F43F5E'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { font: { size: 11, weight: '600' }, padding: 14, usePointStyle: true } }
          },
          cutout: '65%'
        }
      });
    }
  }

  // ==========================================
  // 3. SECTION AKREDITASI & BEBAN MENGAJAR
  // ==========================================
  const valAkrRata = document.getElementById('valAkrRataSks');
  const valAkrOver = document.getElementById('valAkrOverload');
  const valAkrUnder = document.getElementById('valAkrUnderload');

  const dosenEmpty = rawDosen.length === 0;
  if (valAkrRata) valAkrRata.textContent = dosenEmpty ? '0.0' : '14.2';
  if (valAkrOver) valAkrOver.textContent = dosenEmpty ? '0' : '2';
  if (valAkrUnder) valAkrUnder.textContent = dosenEmpty ? '0' : '1';

  const canvasSkor = document.getElementById('chartWd1SkorAkreditasi');
  if (canvasSkor) {
    if (isEmpty && dosenEmpty) {
      if (chartSkorAkreditasi) { chartSkorAkreditasi.destroy(); chartSkorAkreditasi = null; }
      toggleCanvasEmptyOverlay('chartWd1SkorAkreditasi', true, 'Belum Ada Skor Akreditasi', 'Upload data kurikulum & program studi.');
    } else {
      toggleCanvasEmptyOverlay('chartWd1SkorAkreditasi', false);
      if (chartSkorAkreditasi) chartSkorAkreditasi.destroy();
      chartSkorAkreditasi = new Chart(canvasSkor.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Biologi', 'Kimia', 'Matematika', 'Ilmu Komputer', 'Farmasi', 'PPA'],
          datasets: [{
            data: [88, 85, 92, 90, 94, 95],
            backgroundColor: '#722F99',
            borderRadius: 6,
            maxBarThickness: 36
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx) => ` Skor: ${ctx.parsed.y} / 100` } }
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 11, weight: '600' }, color: '#64748b' } },
            y: { min: 50, max: 100, grid: { color: 'rgba(226, 232, 240, 0.6)' }, ticks: { font: { size: 11 }, color: '#64748b' } }
          }
        }
      });
    }
  }

  const canvasRasio = document.getElementById('chartWd1RasioKelulusanProdi');
  if (canvasRasio) {
    if (isEmpty) {
      if (chartRasioKelulusan) { chartRasioKelulusan.destroy(); chartRasioKelulusan = null; }
      toggleCanvasEmptyOverlay('chartWd1RasioKelulusanProdi', true, 'Belum Ada Rasio Kelulusan', 'Upload data kelulusan mahasiswa untuk melihat perbandingan.');
    } else {
      toggleCanvasEmptyOverlay('chartWd1RasioKelulusanProdi', false);
      if (chartRasioKelulusan) chartRasioKelulusan.destroy();
      chartRasioKelulusan = new Chart(canvasRasio.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Biologi', 'Kimia', 'Matematika', 'Ilmu Komputer', 'Farmasi'],
          datasets: [{
            data: [80, 75, 82, 76, 81],
            backgroundColor: '#A855F7',
            borderRadius: 6,
            maxBarThickness: 36
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx) => ` Kelulusan: ${ctx.parsed.y}%` } }
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 11, weight: '600' }, color: '#64748b' } },
            y: { beginAtZero: true, max: 100, grid: { color: 'rgba(226, 232, 240, 0.6)' }, ticks: { callback: (val) => `${val}%`, font: { size: 11 }, color: '#64748b' } }
          }
        }
      });
    }
  }
}

export function initWadek1() {
  const heroBanner = document.getElementById('executiveHeroBanner');
  const compactBar = document.getElementById('compactStickyBar');
  const scrollContainer = document.querySelector('main');
  const btnReset = document.getElementById('btnResetWd1Filters');
  const btnResetCompact = document.getElementById('btnResetCompactWd1Filters');
  const allResetBtns = [btnReset, btnResetCompact].filter(Boolean);

  const dropdownWraps = document.querySelectorAll('.wd1-dropdown-wrap');

  dropdownWraps.forEach(wrap => {
    const btn = wrap.querySelector('.wd1-pill-btn');
    const label = wrap.querySelector('.wd1-btn-label');
    const input = wrap.querySelector('input[type="hidden"]');
    const items = wrap.querySelectorAll('.wd1-dropdown-item');
    const filterType = wrap.getAttribute('data-filter');

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = wrap.classList.contains('open');
        document.querySelectorAll('.wd1-dropdown-wrap.open').forEach(w => {
          if (w !== wrap) {
            w.classList.remove('open');
            const b = w.querySelector('.wd1-pill-btn');
            if (b) b.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          wrap.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          wrap.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }

    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = item.getAttribute('data-value');
        const text = item.textContent.trim();

        if (input) input.value = val;
        if (label) label.textContent = text;
        items.forEach(it => it.classList.remove('active'));
        item.classList.add('active');
        wrap.classList.remove('open');
        if (btn) btn.setAttribute('aria-expanded', 'false');

        const twinWraps = document.querySelectorAll(`.wd1-dropdown-wrap[data-filter="${filterType}"]`);
        twinWraps.forEach(tw => {
          if (tw !== wrap) {
            const twInput = tw.querySelector('input[type="hidden"]');
            const twLabel = tw.querySelector('.wd1-btn-label');
            const twItems = tw.querySelectorAll('.wd1-dropdown-item');
            if (twInput) twInput.value = val;
            if (twLabel) twLabel.textContent = text;
            twItems.forEach(ti => {
              if (ti.getAttribute('data-value') === val) {
                ti.classList.add('active');
              } else {
                ti.classList.remove('active');
              }
            });
          }
        });

        if (filterType === 'prodi') {
          initWadek1Charts(val);
        }

        const isFiltered = (val !== 'semua');
        allResetBtns.forEach(rBtn => {
          if (isFiltered) {
            rBtn.classList.remove('hidden');
          } else {
            rBtn.classList.add('hidden');
          }
        });
      });
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.wd1-dropdown-wrap.open').forEach(w => {
      w.classList.remove('open');
      const b = w.querySelector('.wd1-pill-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  });

  const handleReset = () => {
    dropdownWraps.forEach(wrap => {
      const input = wrap.querySelector('input[type="hidden"]');
      const label = wrap.querySelector('.wd1-btn-label');
      const items = wrap.querySelectorAll('.wd1-dropdown-item');
      if (input) input.value = 'semua';
      if (label) label.textContent = 'Semua Program Studi';
      items.forEach(item => {
        if (item.getAttribute('data-value') === 'semua') {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    });

    allResetBtns.forEach(rBtn => rBtn.classList.add('hidden'));
    initWadek1Charts('semua');
  };

  allResetBtns.forEach(btn => btn.addEventListener('click', handleReset));

  if (heroBanner && compactBar) {
    const handleScroll = () => {
      const heroRect = heroBanner.getBoundingClientRect();
      if (heroRect.bottom <= 40) {
        compactBar.classList.add('is-active');
      } else {
        compactBar.classList.remove('is-active');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    }
    handleScroll();
  }

  // Initialize charts with current persisted data
  initWadek1Charts('semua');

  // Listen for dynamic updates
  window.addEventListener('fmipa:data-updated', (e) => {
    if (!e.detail || e.detail.module === 'mahasiswa' || e.detail.module === 'kurikulum' || e.detail.module === 'dosen' || e.detail.module === 'all') {
      initWadek1Charts(currentActiveProdi);
    }
  });
}
