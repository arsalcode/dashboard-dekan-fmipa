/**
 * DATA OPERASIONAL MAHASISWA - CHARTS & INTERACTION MODULE
 * FMIPA Universitas Pakuan • Standar Eksekutif Dashboard Dekan
 * 100% Dinamis dari DataManager (Local Storage / Upload Excel)
 */

import { DataManager } from '../modules/data-manager';

let chartMhsStatusDistInstance = null;
let chartMhsIpkDistInstance = null;
let chartMhsKorelasiIpkSksInstance = null;
let chartMhsTrenAktifNonAktifInstance = null;
let chartMhsProgresSksInstance = null;
let chartMhsMasaStudiInstance = null;
let chartMhsTrenPrestasiInstance = null;

let currentMhsProdi = 'semua';
let currentMhsAngkatan = 'semua';
let currentMhsStatus = 'semua';
let currentMhsPeriode = '2025/2026 Ganjil';
let currentMhsPrestasiAwal = 2020;
let currentMhsPrestasiAkhir = 2026;

let currentMhsStudiPage = 0;
const itemsPerMhsStudiPage = 3;

let currentMhsTablePage = 1;
const itemsPerMhsTablePage = 10;
let currentMhsTableSortCol = 'nim';
let currentMhsTableSortDir = 'asc';
let currentDataMhsProdiKey = 'semua';
let currentDataMhsSearchQuery = '';

// Helper: Normalize prodi
function matchProdi(rawProdi, filterKey) {
  if (!filterKey || filterKey === 'semua') return true;
  if (!rawProdi) return false;
  const p = rawProdi.toString().toLowerCase().trim();
  if (filterKey === 'biologi') return p.includes('biologi');
  if (filterKey === 'kimia') return p.includes('kimia');
  if (filterKey === 'matematika') return p.includes('matematika');
  if (filterKey === 'ilmu-komputer') return p.includes('komputer') || p.includes('ilkom');
  if (filterKey === 'farmasi') return p.includes('farmasi');
  if (filterKey === 'ppa') return p.includes('apoteker') || p.includes('ppa');
  return true;
}

function getProdiKey(rawProdi) {
  if (!rawProdi) return 'lainnya';
  const p = rawProdi.toString().toLowerCase().trim();
  if (p.includes('biologi')) return 'biologi';
  if (p.includes('kimia')) return 'kimia';
  if (p.includes('matematika')) return 'matematika';
  if (p.includes('komputer') || p.includes('ilkom')) return 'ilmu-komputer';
  if (p.includes('apoteker') || p.includes('ppa')) return 'ppa';
  if (p.includes('farmasi')) return 'farmasi';
  return 'lainnya';
}

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
 * Filtered Student List from DataManager
 */
function getFilteredMahasiswaList() {
  const persisted = DataManager.getPersistedData('mahasiswa') || [];
  let list = persisted.map((m, idx) => {
    const pKey = getProdiKey(m.prodi);
    const angkatanVal = m.angkatan ? String(m.angkatan).trim() : '2022';
    const angkatanNum = parseInt(angkatanVal, 10) || 2022;
    const ipkNum = parseFloat(m.ipk) || 0.0;
    const sksNum = parseInt(m.sks, 10) || 0;
    const statusVal = m.status || 'Aktif';

    // Estimasi semester berdasarkan angkatan
    let semester = '-';
    if (statusVal.toLowerCase() === 'aktif') {
      const yearDiff = 2026 - angkatanNum;
      semester = String(Math.min(14, Math.max(1, yearDiff * 2)));
    }

    return {
      no: idx + 1,
      nama: m.nama || `Mahasiswa ${idx + 1}`,
      nim: m.npm || m.nim || `NPM-${idx + 1}`,
      prodi: m.prodi || 'Program Studi',
      prodiKey: pKey,
      angkatan: angkatanVal,
      angkatanNum: angkatanNum,
      semester: semester,
      ipk: ipkNum.toFixed(2),
      ipkNum: ipkNum,
      sks: sksNum,
      status: statusVal,
      jalur: m.jalur_masuk || '-'
    };
  });

  // Filter Prodi Tabs
  if (currentDataMhsProdiKey && currentDataMhsProdiKey !== 'semua') {
    list = list.filter(m => m.prodiKey === currentDataMhsProdiKey);
  }

  // Filter Prodi Dropdown
  if (currentMhsProdi && currentMhsProdi !== 'semua') {
    list = list.filter(m => matchProdi(m.prodi, currentMhsProdi));
  }

  // Filter Angkatan Dropdown
  if (currentMhsAngkatan && currentMhsAngkatan !== 'semua') {
    list = list.filter(m => String(m.angkatan) === String(currentMhsAngkatan));
  }

  // Filter Status Dropdown
  if (currentMhsStatus && currentMhsStatus !== 'semua') {
    const s = currentMhsStatus.toLowerCase().replace('_', ' ');
    list = list.filter(m => {
      const ms = (m.status || '').toLowerCase();
      if (s === 'drop out' || s === 'do') return ms === 'do' || ms === 'drop out' || ms.includes('keluar');
      return ms === s;
    });
  }

  // Filter Search
  if (currentDataMhsSearchQuery && currentDataMhsSearchQuery.trim() !== '') {
    const q = currentDataMhsSearchQuery.toLowerCase().trim();
    list = list.filter(m =>
      (m.nama && m.nama.toLowerCase().includes(q)) ||
      (m.nim && m.nim.toLowerCase().includes(q)) ||
      (m.prodi && m.prodi.toLowerCase().includes(q)) ||
      (m.angkatan && m.angkatan.includes(q)) ||
      (m.status && m.status.toLowerCase().includes(q))
    );
  }

  // Sorting
  if (currentMhsTableSortCol) {
    list.sort((a, b) => {
      let valA = a[currentMhsTableSortCol];
      let valB = b[currentMhsTableSortCol];

      if (currentMhsTableSortCol === 'no' || currentMhsTableSortCol === 'nim' || currentMhsTableSortCol === 'angkatan') {
        valA = parseInt(valA, 10) || 0;
        valB = parseInt(valB, 10) || 0;
      } else if (currentMhsTableSortCol === 'ipk') {
        valA = a.ipkNum;
        valB = b.ipkNum;
      } else if (currentMhsTableSortCol === 'semester') {
        valA = parseInt(valA, 10) || 0;
        valB = parseInt(valB, 10) || 0;
      } else {
        valA = String(valA || '').toLowerCase();
        valB = String(valB || '').toLowerCase();
      }

      if (valA < valB) return currentMhsTableSortDir === 'asc' ? -1 : 1;
      if (valA > valB) return currentMhsTableSortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return list;
}

/**
 * Update 4 Top Stat Cards
 */
function updateMahasiswaMetrics(list) {
  const elTotal = document.getElementById('valMhsTotal');
  const elAktif = document.getElementById('valMhsAktif');
  const elSubAktif = document.getElementById('subMhsAktif');
  const elRataIpk = document.getElementById('valMhsRataIpk');
  const elTepatWaktu = document.getElementById('valMhsTepatWaktu');

  if (list.length === 0) {
    if (elTotal) elTotal.textContent = '0';
    if (elAktif) elAktif.textContent = '0';
    if (elSubAktif) elSubAktif.textContent = '0.0% dari Total';
    if (elRataIpk) elRataIpk.textContent = '0.00';
    if (elTepatWaktu) elTepatWaktu.textContent = '0%';
    return;
  }

  const total = list.length;
  const aktif = list.filter(m => (m.status || '').toLowerCase() === 'aktif').length;
  const persenAktif = total > 0 ? ((aktif / total) * 100).toFixed(1) : '0.0';

  const sumIpk = list.reduce((acc, m) => acc + (m.ipkNum || 0), 0);
  const rataIpk = total > 0 ? (sumIpk / total).toFixed(2) : '0.00';

  // Anggap IPK >= 3.00 on track tepat waktu
  const lulusOnTrack = list.filter(m => (m.ipkNum || 0) >= 3.00).length;
  const tepatWaktu = total > 0 ? `${Math.round((lulusOnTrack / total) * 100)}%` : '0%';

  if (elTotal) elTotal.textContent = total.toLocaleString('id-ID');
  if (elAktif) elAktif.textContent = aktif.toLocaleString('id-ID');
  if (elSubAktif) elSubAktif.textContent = `${persenAktif}% dari Total`;
  if (elRataIpk) elRataIpk.textContent = rataIpk;
  if (elTepatWaktu) elTepatWaktu.textContent = tepatWaktu;
}

/**
 * Render All 6 Statistik Mahasiswa Charts
 */
function renderStatistikMahasiswa() {
  const canvasStatus = document.getElementById('chartMhsStatusDist');
  const canvasIpk = document.getElementById('chartMhsIpkDist');
  const canvasKorelasi = document.getElementById('chartMhsKorelasiIpkSks');
  const canvasTren = document.getElementById('chartMhsTrenAktifNonAktif');
  const canvasProgres = document.getElementById('chartMhsProgresSks');
  const canvasMasaStudi = document.getElementById('chartMhsMasaStudi');

  const rawList = getFilteredMahasiswaList();

  if (rawList.length === 0) {
    [canvasStatus, canvasIpk, canvasKorelasi, canvasTren, canvasProgres, canvasMasaStudi].forEach(c => {
      if (c) toggleCanvasEmptyOverlay(c.id, true);
    });

    [
      chartMhsStatusDistInstance, chartMhsIpkDistInstance, chartMhsKorelasiIpkSksInstance,
      chartMhsTrenAktifNonAktifInstance, chartMhsProgresSksInstance, chartMhsMasaStudiInstance
    ].forEach(inst => {
      if (inst) inst.destroy();
    });
    chartMhsStatusDistInstance = null;
    chartMhsIpkDistInstance = null;
    chartMhsKorelasiIpkSksInstance = null;
    chartMhsTrenAktifNonAktifInstance = null;
    chartMhsProgresSksInstance = null;
    chartMhsMasaStudiInstance = null;
    return;
  }

  [canvasStatus, canvasIpk, canvasKorelasi, canvasTren, canvasProgres, canvasMasaStudi].forEach(c => {
    if (c) toggleCanvasEmptyOverlay(c.id, false);
  });

  if (typeof window.Chart === 'undefined') return;
  const Chart = window.Chart;

  // 1. Chart: Distribusi Status Mahasiswa (Doughnut)
  if (canvasStatus) {
    if (chartMhsStatusDistInstance) chartMhsStatusDistInstance.destroy();

    const aktifCount = rawList.filter(m => (m.status || '').toLowerCase() === 'aktif').length;
    const cutiCount = rawList.filter(m => (m.status || '').toLowerCase() === 'cuti').length;
    const lulusCount = rawList.filter(m => (m.status || '').toLowerCase() === 'lulus').length;
    const doCount = rawList.filter(m => (m.status || '').toLowerCase().includes('do') || (m.status || '').toLowerCase().includes('keluar')).length;

    chartMhsStatusDistInstance = new Chart(canvasStatus, {
      type: 'doughnut',
      data: {
        labels: ['Aktif', 'Cuti', 'Lulus', 'Drop Out'],
        datasets: [{
          data: [aktifCount, cutiCount, lulusCount, doCount],
          backgroundColor: ['#3D818A', '#eab308', '#294669', '#ef4444'],
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 10, padding: 10, font: { size: 11, weight: 600 }, color: '#334155' }
          }
        }
      }
    });
  }

  // 2. Chart: Distribusi IPK Mahasiswa (Bar)
  if (canvasIpk) {
    if (chartMhsIpkDistInstance) chartMhsIpkDistInstance.destroy();

    let b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0;
    rawList.forEach(m => {
      const v = m.ipkNum;
      if (v < 2.00) b1++;
      else if (v <= 2.50) b2++;
      else if (v <= 3.00) b3++;
      else if (v <= 3.50) b4++;
      else b5++;
    });

    chartMhsIpkDistInstance = new Chart(canvasIpk, {
      type: 'bar',
      data: {
        labels: ['< 2.00', '2.00 - 2.50', '2.51 - 3.00', '3.01 - 3.50', '3.51 - 4.00'],
        datasets: [{
          data: [b1, b2, b3, b4, b5],
          backgroundColor: ['#722F99', '#294669', '#3D818A', '#8BBB92', '#10b981'],
          borderRadius: 7,
          borderSkipped: false,
          barPercentage: 0.65
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e293b', titleColor: '#f8fafc', bodyColor: '#f8fafc', cornerRadius: 8,
            callbacks: { label: (ctx) => ` ${ctx.parsed.y} Mahasiswa` }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10.5, weight: 600 }, color: '#475569' } },
          y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { font: { size: 10 }, color: '#64748b' } }
        }
      }
    });
  }

  // 3. Chart: Korelasi IPK vs Penyelesaian SKS (Scatter)
  if (canvasKorelasi) {
    if (chartMhsKorelasiIpkSksInstance) chartMhsKorelasiIpkSksInstance.destroy();

    const scatterAktif = rawList.filter(m => (m.status || '').toLowerCase() === 'aktif').map(m => ({ x: m.sks, y: m.ipkNum }));
    const scatterCuti = rawList.filter(m => (m.status || '').toLowerCase() === 'cuti').map(m => ({ x: m.sks, y: m.ipkNum }));
    const scatterLain = rawList.filter(m => (m.status || '').toLowerCase() !== 'aktif' && (m.status || '').toLowerCase() !== 'cuti').map(m => ({ x: m.sks, y: m.ipkNum }));

    chartMhsKorelasiIpkSksInstance = new Chart(canvasKorelasi, {
      type: 'scatter',
      data: {
        datasets: [
          {
            type: 'line',
            label: 'Target IPK 3.0',
            data: [{ x: 0, y: 3.0 }, { x: 150, y: 3.0 }],
            borderColor: '#722F99',
            borderDash: [5, 5],
            borderWidth: 1.8,
            pointRadius: 0,
            fill: false
          },
          { label: 'Aktif', data: scatterAktif, backgroundColor: '#3D818A', borderColor: '#3D818A', pointRadius: 4.5 },
          { label: 'Cuti', data: scatterCuti, backgroundColor: '#eab308', borderColor: '#eab308', pointRadius: 4.5 },
          { label: 'Lainnya', data: scatterLain, backgroundColor: '#ef4444', borderColor: '#ef4444', pointRadius: 4.5 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            type: 'linear', min: 0, max: 150,
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: { stepSize: 30, font: { size: 10 }, color: '#64748b' },
            title: { display: true, text: 'Total SKS Lulus', font: { size: 10, weight: '600' }, color: '#64748b' }
          },
          y: {
            min: 1.5, max: 4.0,
            grid: { color: 'rgba(0,0,0,0.06)' },
            ticks: { stepSize: 0.5, font: { size: 10 }, color: '#64748b' },
            title: { display: true, text: 'IPK Kumulatif', font: { size: 10, weight: '600' }, color: '#64748b' }
          }
        }
      }
    });
  }

  // 4. Chart: Tren Mahasiswa Aktif vs Non-Aktif per Angkatan
  if (canvasTren) {
    if (chartMhsTrenAktifNonAktifInstance) chartMhsTrenAktifNonAktifInstance.destroy();

    const angkatans = [...new Set(rawList.map(m => m.angkatan))].sort();
    const aktifPerAngkatan = angkatans.map(a => rawList.filter(m => m.angkatan === a && (m.status || '').toLowerCase() === 'aktif').length);
    const nonAktifPerAngkatan = angkatans.map(a => rawList.filter(m => m.angkatan === a && (m.status || '').toLowerCase() !== 'aktif').length);

    chartMhsTrenAktifNonAktifInstance = new Chart(canvasTren, {
      type: 'line',
      data: {
        labels: angkatans.length ? angkatans : ['2023', '2024', '2025', '2026'],
        datasets: [
          {
            label: 'Mahasiswa Aktif',
            data: aktifPerAngkatan.length ? aktifPerAngkatan : [0, 0, 0, 0],
            borderColor: '#3D818A',
            backgroundColor: 'rgba(61, 129, 138, 0.12)',
            fill: true, tension: 0.35, pointRadius: 4
          },
          {
            label: 'Non-Aktif (Cuti/DO)',
            data: nonAktifPerAngkatan.length ? nonAktifPerAngkatan : [0, 0, 0, 0],
            borderColor: '#eab308',
            backgroundColor: 'rgba(234, 179, 8, 0.08)',
            fill: true, tension: 0.35, pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', align: 'end', labels: { boxWidth: 10, font: { size: 11, weight: 600 }, color: '#475569' } }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#64748b' } },
          y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { font: { size: 10 }, color: '#64748b' } }
        }
      }
    });
  }

  // 5. Chart: Rata-Rata SKS per Angkatan
  if (canvasProgres) {
    if (chartMhsProgresSksInstance) chartMhsProgresSksInstance.destroy();

    const angkatans = [...new Set(rawList.map(m => m.angkatan))].sort();
    const avgSks = angkatans.map(a => {
      const cohort = rawList.filter(m => m.angkatan === a);
      const total = cohort.reduce((acc, m) => acc + (m.sks || 0), 0);
      return cohort.length ? Math.round(total / cohort.length) : 0;
    });

    chartMhsProgresSksInstance = new Chart(canvasProgres, {
      type: 'bar',
      data: {
        labels: angkatans.length ? angkatans.map(a => `Angk. ${a}`) : ['2023', '2024', '2025', '2026'],
        datasets: [{
          label: 'Rata-rata SKS Lulus',
          data: avgSks.length ? avgSks : [0, 0, 0, 0],
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
          y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { font: { size: 10 }, color: '#64748b' } }
        }
      }
    });
  }

  // 6. Chart: Jalur Masuk Mahasiswa (Bar)
  if (canvasMasaStudi) {
    if (chartMhsMasaStudiInstance) chartMhsMasaStudiInstance.destroy();

    const jalurCounts = { SNBP: 0, SNBT: 0, Mandiri: 0, Beasiswa: 0, Lainnya: 0 };
    rawList.forEach(m => {
      const j = (m.jalur || '').toUpperCase();
      if (j.includes('SNBP')) jalurCounts.SNBP++;
      else if (j.includes('SNBT')) jalurCounts.SNBT++;
      else if (j.includes('MANDIRI')) jalurCounts.Mandiri++;
      else if (j.includes('BEASISWA')) jalurCounts.Beasiswa++;
      else jalurCounts.Lainnya++;
    });

    chartMhsMasaStudiInstance = new Chart(canvasMasaStudi, {
      type: 'bar',
      data: {
        labels: Object.keys(jalurCounts),
        datasets: [{
          label: 'Jumlah Mahasiswa',
          data: Object.values(jalurCounts),
          backgroundColor: ['#722F99', '#3D818A', '#0284c7', '#10b981', '#94a3b8'],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#64748b' } },
          y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { font: { size: 10 }, color: '#64748b' } }
        }
      }
    });
  }
}

/**
 * Render Tren Prestasi dari DataManager ('partisipasi')
 */
function renderTrenPrestasi(activeProdi = 'semua') {
  const canvas = document.getElementById('chartMhsTrenPrestasi');
  if (!canvas) return;

  const partisipasiList = DataManager.getPersistedData('partisipasi') || [];
  const list = partisipasiList.filter(p => matchProdi(p.prodi, activeProdi));

  if (list.length === 0) {
    toggleCanvasEmptyOverlay('chartMhsTrenPrestasi', true, 'Belum Ada Data Prestasi', 'Data prestasi mahasiswa akan muncul setelah modul Partisipasi diisi.');
    if (chartMhsTrenPrestasiInstance) {
      chartMhsTrenPrestasiInstance.destroy();
      chartMhsTrenPrestasiInstance = null;
    }
    return;
  }

  toggleCanvasEmptyOverlay('chartMhsTrenPrestasi', false);

  if (typeof window.Chart === 'undefined') return;
  const Chart = window.Chart;

  if (chartMhsTrenPrestasiInstance) {
    chartMhsTrenPrestasiInstance.destroy();
    chartMhsTrenPrestasiInstance = null;
  }

  const tahunMap = {};
  list.forEach(item => {
    const t = item.tahun || 2026;
    tahunMap[t] = (tahunMap[t] || 0) + 1;
  });

  const years = Object.keys(tahunMap).sort();
  const counts = years.map(y => tahunMap[y]);

  chartMhsTrenPrestasiInstance = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [{
        label: 'Total Prestasi Mahasiswa',
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
        x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#475569' } },
        y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { font: { size: 10 }, color: '#64748b' } }
      }
    }
  });
}

/**
 * Render Progress Tugas Akhir & Skripsi Cards
 */
function renderProgressStudiCards() {
  const container = document.getElementById('mhsStudiLanjutContainer');
  const btnPrev = document.getElementById('btnMhsStudiPrev');
  const btnNext = document.getElementById('btnMhsStudiNext');
  if (!container) return;

  const mhsList = getFilteredMahasiswaList();
  // Filter mahasiswa tingkat akhir (semester >= 7 atau sks >= 100)
  const studiList = mhsList.filter(m => parseInt(m.semester, 10) >= 7 || m.sks >= 100);

  if (studiList.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-10 text-center text-slate-400">
        <div class="flex flex-col items-center justify-center gap-2">
          <div class="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#722F99] border border-purple-100 shadow-inner">
            <i class="fa-solid fa-user-graduate text-xl"></i>
          </div>
          <p class="font-bold text-slate-700 text-xs mt-1">Belum Ada Monitoring Tugas Akhir Mahasiswa</p>
          <p class="text-[11px] text-slate-400">Data mahasiswa tingkat akhir akan otomatis dimonitor di sini saat data diupload.</p>
        </div>
      </div>
    `;
    if (btnPrev) btnPrev.disabled = true;
    if (btnNext) btnNext.disabled = true;
    return;
  }

  const totalPages = Math.ceil(studiList.length / itemsPerMhsStudiPage);
  const startIdx = currentMhsStudiPage * itemsPerMhsStudiPage;
  const currentItems = studiList.slice(startIdx, startIdx + itemsPerMhsStudiPage);

  container.innerHTML = currentItems.map(item => {
    const initials = item.nama
      .split(' ')
      .filter(n => n.length > 0 && !n.includes('.'))
      .slice(0, 2)
      .map(n => n[0])
      .join('') || 'MH';

    return `
      <div class="mhs-studi-card">
        <div class="mhs-studi-card-header">
          <div class="mhs-studi-avatar">${initials}</div>
          <div class="mhs-studi-info">
            <h5 title="${item.nama}">${item.nama}</h5>
            <p>NPM: ${item.nim} &bull; <span class="text-[#722F99] font-bold">${item.prodi}</span></p>
          </div>
        </div>
        <div class="mhs-ta-badge">
          <i class="fas fa-file-lines text-[#722F99] text-xs mt-0.5 shrink-0"></i>
          <span>Mahasiswa Tingkat Akhir (Semester ${item.semester})</span>
        </div>
        <div class="text-[11.5px] text-slate-500 mb-2.5">
          <span class="font-semibold text-slate-700">Total SKS:</span> ${item.sks} SKS Lulus &bull; IPK: <strong>${item.ipk}</strong>
        </div>
        <div class="mhs-progress-wrapper">
          <div class="mhs-progress-labels">
            <span class="truncate max-w-[190px] text-slate-600">Penyusunan Skripsi &amp; Sidang</span>
            <span class="text-[#722F99] font-bold">${Math.min(100, Math.round((item.sks / 144) * 100))}%</span>
          </div>
          <div class="mhs-progress-bar-bg">
            <div class="mhs-progress-bar-fill" style="width: ${Math.min(100, Math.round((item.sks / 144) * 100))}%"></div>
          </div>
          <div class="flex justify-between items-center text-[10.5px] text-slate-400 mt-2">
            <span>Target: <strong class="text-slate-600">T.A. 2025/2026</strong></span>
            <span class="bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-medium">${item.status}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (btnPrev) btnPrev.disabled = currentMhsStudiPage === 0;
  if (btnNext) btnNext.disabled = currentMhsStudiPage >= totalPages - 1;
}

/**
 * Filter & Render Tabel Data Mahasiswa Per Prodi
 */
function renderTabelMahasiswaPerProdi() {
  const tbody = document.getElementById('tabelDataMahasiswaBody');
  const infoEl = document.getElementById('mhsPaginationInfo');
  if (!tbody) return;

  const filteredList = getFilteredMahasiswaList();
  const totalItems = filteredList.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerMhsTablePage));

  if (currentMhsTablePage > totalPages) currentMhsTablePage = totalPages;
  if (currentMhsTablePage < 1) currentMhsTablePage = 1;

  const startIdx = (currentMhsTablePage - 1) * itemsPerMhsTablePage;
  const endIdx = Math.min(startIdx + itemsPerMhsTablePage, totalItems);
  const pageItems = filteredList.slice(startIdx, endIdx);

  if (infoEl) {
    if (totalItems === 0) {
      infoEl.textContent = 'Menampilkan 0 mahasiswa';
    } else {
      infoEl.textContent = `Menampilkan ${startIdx + 1} - ${endIdx} dari ${totalItems} mahasiswa`;
    }
  }

  if (pageItems.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center py-10 text-gray-400">
          <div class="flex flex-col items-center justify-center gap-2">
            <div class="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#722F99] border border-purple-100 shadow-inner">
              <i class="fa-solid fa-folder-open text-xl"></i>
            </div>
            <p class="font-bold text-slate-700 text-xs mt-1">Belum Ada Data Mahasiswa Tersimpan</p>
            <p class="text-[11px] text-slate-400">Upload berkas Excel atau tambah data manual untuk memuat data mahasiswa.</p>
          </div>
        </td>
      </tr>
    `;
    renderMhsPagination(1, 1);
    return;
  }

  tbody.innerHTML = pageItems.map((m, idx) => {
    const itemNumber = startIdx + idx + 1;
    const statusLower = (m.status || 'aktif').toLowerCase();
    let badgeClass = 'badge-status-pill-aktif';
    if (statusLower === 'lulus') badgeClass = 'badge-status-pill-lulus';
    else if (statusLower === 'do' || statusLower === 'drop out' || statusLower.includes('keluar')) badgeClass = 'badge-status-pill-do';
    else if (statusLower === 'cuti') badgeClass = 'badge-status-pill-cuti';

    return `
      <tr class="border-b border-gray-100 hover:bg-purple-50/40 transition">
        <td class="py-3 px-3 text-center text-gray-700 font-normal">${itemNumber}</td>
        <td class="py-3 px-3">
          <button type="button" class="mhs-student-name-btn text-left font-bold text-[#722F99] hover:underline" data-mhs-nim="${m.nim}" title="Lihat detail ${m.nama}">
            ${m.nama}
          </button>
        </td>
        <td class="py-3 px-3 text-gray-700 font-normal">${m.nim}</td>
        <td class="py-3 px-3 text-gray-700">${m.prodi}</td>
        <td class="py-3 px-3 text-gray-700">${m.angkatan}</td>
        <td class="py-3 px-3 text-gray-700 text-center sm:text-left">${m.semester}</td>
        <td class="py-3 px-3 font-bold text-gray-900">${m.ipk}</td>
        <td class="py-3 px-3">
          <span class="${badgeClass}">${m.status}</span>
        </td>
      </tr>
    `;
  }).join('');

  renderMhsPagination(totalPages, currentMhsTablePage);
  attachStudentNameModalListeners();
}

/**
 * Render Pagination
 */
function renderMhsPagination(totalPages, currentPage) {
  const container = document.getElementById('mhsPaginationNav');
  if (!container) return;

  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = `
    <button type="button" class="mhs-pagination-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''} aria-label="Previous Page">
      <i class="fas fa-chevron-left text-[10px]"></i>
    </button>
  `;

  let pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else if (currentPage <= 4) {
    pages = [1, 2, 3, 4, 5, '...', totalPages];
  } else if (currentPage >= totalPages - 3) {
    pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  } else {
    pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  }

  pages.forEach(p => {
    if (p === '...') {
      html += `<span class="mhs-pagination-ellipsis">&hellip;</span>`;
    } else {
      const isActive = p === currentPage;
      html += `
        <button type="button" class="mhs-pagination-btn ${isActive ? 'active' : ''}" data-page="${p}">
          ${p}
        </button>
      `;
    }
  });

  html += `
    <button type="button" class="mhs-pagination-btn" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''} aria-label="Next Page">
      <i class="fas fa-chevron-right text-[10px]"></i>
    </button>
  `;

  container.innerHTML = html;

  container.querySelectorAll('.mhs-pagination-btn:not(:disabled)').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPage = parseInt(btn.getAttribute('data-page'), 10);
      if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages) {
        currentMhsTablePage = targetPage;
        renderTabelMahasiswaPerProdi();
      }
    });
  });
}

/**
 * Modal Detail Mahasiswa
 */
function attachStudentNameModalListeners() {
  const mhsList = getFilteredMahasiswaList();
  document.querySelectorAll('.mhs-student-name-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const nim = btn.getAttribute('data-mhs-nim');
      const student = mhsList.find(s => s.nim === nim);
      if (student) openModalDetailMhs(student);
    });
  });
}

function openModalDetailMhs(student) {
  const modal = document.getElementById('modalDetailMhs');
  if (!modal) return;

  const elNama = document.getElementById('modalMhsNama');
  const elNim = document.getElementById('modalMhsNim');
  const elProdi = document.getElementById('modalMhsProdi');
  const elAngkatan = document.getElementById('modalMhsAngkatan');
  const elSemester = document.getElementById('modalMhsSemester');
  const elIpk = document.getElementById('modalMhsIpk');
  const elBadge = document.getElementById('modalMhsStatusBadge');
  const elAvatar = document.getElementById('modalMhsAvatar');

  if (elNama) elNama.textContent = student.nama;
  if (elNim) elNim.textContent = student.nim;
  if (elProdi) elProdi.textContent = student.prodi;
  if (elAngkatan) elAngkatan.textContent = student.angkatan;
  if (elSemester) elSemester.textContent = student.semester;
  if (elIpk) elIpk.textContent = student.ipk;

  if (elAvatar) {
    const initials = student.nama.replace(/Dr\.|M\.Pd|S\.Pt|S\.Sos|S\.Kom|Prof\.|apt\.|S\.Si|M\.Si/g, '')
      .trim().split(' ').filter(w => w.length > 0).slice(0, 2).map(w => w[0].toUpperCase()).join('') || 'MH';
    elAvatar.textContent = initials;
  }

  if (elBadge) {
    const st = (student.status || 'aktif').toLowerCase();
    elBadge.textContent = student.status;
    elBadge.className = 'px-2.5 py-0.5 rounded-full text-[11px] font-bold';
    if (st === 'aktif') elBadge.classList.add('bg-emerald-50', 'text-emerald-700', 'border', 'border-emerald-200');
    else if (st === 'lulus') elBadge.classList.add('bg-blue-50', 'text-blue-700', 'border', 'border-blue-200');
    else if (st === 'do' || st.includes('keluar')) elBadge.classList.add('bg-rose-50', 'text-rose-700', 'border', 'border-rose-200');
    else elBadge.classList.add('bg-yellow-50', 'text-yellow-700', 'border', 'border-yellow-200');
  }

  modal.classList.remove('hidden');
}

function closeModalDetailMhs() {
  const modal = document.getElementById('modalDetailMhs');
  if (modal) modal.classList.add('hidden');
}

/**
 * Setup Table Sorting
 */
function setupTableSorting() {
  const table = document.getElementById('tabelDataMahasiswaFmipa');
  if (!table || table.dataset.sortingBound) return;
  table.dataset.sortingBound = 'true';

  const headers = table.querySelectorAll('th[data-sort]');
  headers.forEach(th => {
    th.addEventListener('click', () => {
      const col = th.getAttribute('data-sort');
      if (currentMhsTableSortCol === col) {
        currentMhsTableSortDir = currentMhsTableSortDir === 'asc' ? 'desc' : 'asc';
      } else {
        currentMhsTableSortCol = col;
        currentMhsTableSortDir = 'asc';
      }

      headers.forEach(h => {
        const icon = h.querySelector('i');
        const hCol = h.getAttribute('data-sort');
        if (icon) {
          if (hCol === currentMhsTableSortCol) {
            icon.className = currentMhsTableSortDir === 'asc' 
              ? 'fas fa-sort-up text-[10px] text-[#722F99]' 
              : 'fas fa-sort-down text-[10px] text-[#722F99]';
          } else {
            icon.className = 'fas fa-sort text-[10px] text-gray-400';
          }
        }
      });

      renderTabelMahasiswaPerProdi();
    });
  });
}

/**
 * Main Initialization Function
 */
export function initMahasiswaModule() {
  const heroBanner = document.getElementById('executiveHeroBannerMahasiswa');
  const compactBar = document.getElementById('compactStickyBarMahasiswa');
  const btnReset = document.getElementById('btnResetMhsFilters');
  const dropdownWraps = document.querySelectorAll('.mhs-dropdown-wrap');

  // Bind reactive listener
  if (!window._fmipaMhsListenerBound) {
    window._fmipaMhsListenerBound = true;
    window.addEventListener('fmipa:data-updated', (e) => {
      if (e.detail && (e.detail.module === 'mahasiswa' || e.detail.module === 'partisipasi')) {
        refreshAllMahasiswaViews();
      }
    });
  }

  function refreshAllMahasiswaViews() {
    const list = getFilteredMahasiswaList();
    updateMahasiswaMetrics(list);
    renderStatistikMahasiswa();
    renderTrenPrestasi(currentMhsProdi);
    renderProgressStudiCards();
    renderTabelMahasiswaPerProdi();
  }

  // Dropdown Handling
  dropdownWraps.forEach(wrap => {
    const btn = wrap.querySelector('.mhs-pill-btn');
    const menu = wrap.querySelector('.mhs-dropdown-menu');
    const input = wrap.querySelector('input[type="hidden"]');
    const label = wrap.querySelector('.mhs-btn-label');
    const items = wrap.querySelectorAll('.mhs-dropdown-item');
    const filterType = wrap.getAttribute('data-filter');

    if (!btn || !menu || wrap.dataset.bound) return;
    wrap.dataset.bound = 'true';

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrap.classList.contains('open');
      dropdownWraps.forEach(w => {
        if (w !== wrap) {
          w.classList.remove('open');
          const b = w.querySelector('.mhs-pill-btn');
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

    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = item.getAttribute('data-value');
        const text = item.textContent.replace('✓', '').trim();

        if (input) input.value = val;
        if (label) label.textContent = text;
        items.forEach(it => it.classList.remove('active'));
        item.classList.add('active');
        wrap.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');

        if (filterType === 'prodi') {
          currentMhsProdi = val;
          currentDataMhsProdiKey = val;
          updateTableProdiTabs(val);
        } else if (filterType === 'angkatan') {
          currentMhsAngkatan = val;
          currentMhsTablePage = 1;
        } else if (filterType === 'status') {
          currentMhsStatus = val;
          currentMhsTablePage = 1;
        } else if (filterType === 'periode') {
          currentMhsPeriode = val;
        }

        refreshAllMahasiswaViews();
      });
    });
  });

  document.addEventListener('click', () => {
    dropdownWraps.forEach(w => {
      w.classList.remove('open');
      const b = w.querySelector('.mhs-pill-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  });

  // Table Search Input
  const searchInput = document.getElementById('searchMhsInput');
  if (searchInput && !searchInput.dataset.bound) {
    searchInput.dataset.bound = 'true';
    searchInput.addEventListener('input', (e) => {
      currentDataMhsSearchQuery = e.target.value;
      currentMhsTablePage = 1;
      renderTabelMahasiswaPerProdi();
    });
  }

  // Table Prodi Tabs
  const prodiTabBtns = document.querySelectorAll('.btn-data-mhs-tab');
  prodiTabBtns.forEach(tab => {
    if (tab.dataset.bound) return;
    tab.dataset.bound = 'true';
    tab.addEventListener('click', function() {
      prodiTabBtns.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      currentDataMhsProdiKey = this.dataset.mhsTarget || 'semua';
      currentMhsTablePage = 1;
      refreshAllMahasiswaViews();
    });
  });

  function updateTableProdiTabs(prodiKey) {
    prodiTabBtns.forEach(t => {
      if (t.dataset.mhsTarget === prodiKey) t.classList.add('active');
      else t.classList.remove('active');
    });
  }

  setupTableSorting();

  // Progress Studi Pagination
  const btnPrev = document.getElementById('btnMhsStudiPrev');
  const btnNext = document.getElementById('btnMhsStudiNext');
  if (btnPrev && !btnPrev.dataset.bound) {
    btnPrev.dataset.bound = 'true';
    btnPrev.addEventListener('click', () => {
      if (currentMhsStudiPage > 0) {
        currentMhsStudiPage--;
        renderProgressStudiCards();
      }
    });
  }
  if (btnNext && !btnNext.dataset.bound) {
    btnNext.dataset.bound = 'true';
    btnNext.addEventListener('click', () => {
      currentMhsStudiPage++;
      renderProgressStudiCards();
    });
  }

  // Modals
  const btnCloseModal = document.getElementById('btnCloseMhsModal');
  const btnCloseSecondary = document.getElementById('btnModalCloseSecondary');
  const modalDetail = document.getElementById('modalDetailMhs');
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModalDetailMhs);
  if (btnCloseSecondary) btnCloseSecondary.addEventListener('click', closeModalDetailMhs);
  if (modalDetail) {
    modalDetail.addEventListener('click', (e) => {
      if (e.target === modalDetail) closeModalDetailMhs();
    });
  }

  // Initial Run
  refreshAllMahasiswaViews();
}
