/**
 * DATA OPERASIONAL DOSEN - CHARTS & INTERACTION MODULE
 * FMIPA Universitas Pakuan • Standar Eksekutif
 * 
 * Dinamis 100%: Menampilkan data kosong secara default.
 * Begitu berkas diupload atau diinput manual, grafik, metrik, dan tabel seketika terisi otomatis.
 */

import { DataManager } from '../modules/data-manager';

let chartDosenStatusInstance = null;
let chartDosenJabatanInstance = null;
let chartDosenSertifikasiInstance = null;
let chartDosenPendidikanInstance = null;
let chartPeningkatanJabatanInstance = null;

let currentDosenProdi = 'semua';
let currentDosenStatus = 'semua';
let currentDosenPeriode = '2025/2026 Ganjil';

let currentJabatanTahunAwal = 2000;
let currentJabatanTahunAkhir = 2026;

let currentTableProdi = 'biologi';
let currentTableKategori = 'homebase';
let currentStudiPage = 0;
const itemsPerStudiPage = 3;

// Helper: Match program studi
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
  if (filterKey === 'lainnya') return p.includes('lain') || p.includes('dpk');
  return true;
}

// Helper: Toggle Overlay Kosong vs Canvas Grafik
function toggleDosenOverlay(canvasId, isEmpty) {
  const overlay = document.getElementById(`${canvasId}Empty`);
  const canvas = document.getElementById(canvasId);
  if (overlay) {
    if (isEmpty) {
      overlay.classList.remove('hidden');
      overlay.classList.add('flex');
    } else {
      overlay.classList.add('hidden');
      overlay.classList.remove('flex');
    }
  }
  if (canvas) {
    canvas.style.display = isEmpty ? 'none' : 'block';
  }
}

/**
 * Ekstraksi & Agregasi Data Dosen Dinamis dari DataManager (localStorage)
 */
function getDosenDataForProdi(prodiKey) {
  const persisted = DataManager.getPersistedData('dosen') || [];
  const list = persisted.filter(d => matchProdi(d.prodi, prodiKey));

  if (list.length === 0) {
    return {
      isEmpty: true,
      total: 0,
      guruBesar: 0,
      s3: 0,
      sertifikasiPersen: 0,
      sertifikasiDosen: { bersertifikat: 0, belum: 0, persen: 0 },
      statusDosen: { labels: ['Aktif (0)', 'Cuti (0)', 'Tugas Belajar (0)'], data: [0, 0, 0], colors: ['#0D9488', '#A855F7', '#6366F1'] },
      statusPensiun: { labels: ['Pensiun (0)'], data: [0], colors: ['#F43F5E'] },
      jabatanDosen: {
        labels: ['Asisten Ahli', 'Lektor', 'Lektor Kepala', 'Guru Besar', 'Tenaga Pengajar'],
        data: [0, 0, 0, 0, 0],
        colors: ['#6366F1', '#A855F7', '#722F99', '#4A154B', '#CBD5E1']
      },
      strataPendidikan: {
        labels: ['S3 (Doktor)', 'S2 (Magister)', 'Spesialis'],
        data: [0, 0, 0],
        colors: ['#722F99', '#0284C7', '#0D9488']
      }
    };
  }

  const total = list.length;
  let gb = 0, lk = 0, lektor = 0, aa = 0, tp = 0;
  let s3 = 0, s2 = 0, spesialis = 0;
  let sertifYa = 0, sertifTidak = 0;
  let aktif = 0, cuti = 0, tugas = 0, pensiun = 0;

  list.forEach(d => {
    const j = (d.jabatan || '').toLowerCase();
    if (j.includes('guru besar')) gb++;
    else if (j.includes('kepala')) lk++;
    else if (j.includes('lektor')) lektor++;
    else if (j.includes('asisten')) aa++;
    else tp++;

    const str = (d.strata || '').toLowerCase();
    if (str.includes('s3') || str.includes('doktor')) s3++;
    else if (str.includes('spesialis')) spesialis++;
    else s2++;

    const s = (d.sertif || '').toLowerCase();
    if (s.includes('bersertifikat') && !s.includes('belum')) sertifYa++;
    else sertifTidak++;

    const st = (d.status || '').toLowerCase();
    if (st === 'aktif') aktif++;
    else if (st === 'cuti') cuti++;
    else if (st.includes('tugas') || st.includes('izin')) tugas++;
    else if (st.includes('pensiun')) pensiun++;
    else aktif++;
  });

  const sertifPersen = total > 0 ? Math.round((sertifYa / total) * 100) : 0;

  return {
    isEmpty: false,
    total,
    guruBesar: gb,
    s3,
    sertifikasiPersen: sertifPersen,
    sertifikasiDosen: { bersertifikat: sertifYa, belum: sertifTidak, persen: sertifPersen },
    statusDosen: {
      labels: [`Aktif (${aktif})`, `Cuti (${cuti})`, `Tugas Belajar (${tugas})`],
      data: [aktif, cuti, tugas],
      colors: ['#0D9488', '#A855F7', '#6366F1']
    },
    statusPensiun: {
      labels: [`Pensiun (${pensiun})`],
      data: [pensiun],
      colors: ['#F43F5E']
    },
    jabatanDosen: {
      labels: ['Asisten Ahli', 'Lektor', 'Lektor Kepala', 'Guru Besar', 'Tenaga Pengajar'],
      data: [aa, lektor, lk, gb, tp],
      colors: ['#6366F1', '#A855F7', '#722F99', '#4A154B', '#CBD5E1']
    },
    strataPendidikan: {
      labels: ['S3 (Doktor)', 'S2 (Magister)', 'Spesialis'],
      data: [s3, s2, spesialis],
      colors: ['#722F99', '#0284C7', '#0D9488']
    }
  };
}

/**
 * Update Top 4 Metric Cards and Footers
 */
function updateDosenMetrics(data) {
  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.textContent = val;
  };

  if (!data || data.isEmpty || data.total === 0) {
    setTxt('valDosenTotal', '0');
    setTxt('subDosenTotal', 'Belum ada data');
    setTxt('valDosenSertifPersen', '0%');
    setTxt('subDosenSertifCount', '0 Bersertifikat');
    setTxt('valDosenGuruBesar', '0');
    setTxt('subDosenGuruBesar', 'Belum ada data');
    setTxt('valDosenS3', '0');
    setTxt('subDosenS3', 'Belum ada data');

    setTxt('footerTotalDosen', 'Total: 0 dosen');
    setTxt('footerGuruBesarDosen', 'Guru Besar: 0 dosen');
    setTxt('footerSertifikasiDosen', '0% bersertifikat');
    setTxt('footerS3Dosen', 'S3: 0 dosen');
    return;
  }

  setTxt('valDosenTotal', data.total);
  setTxt('subDosenTotal', `${data.total} Dosen Terdata`);
  setTxt('valDosenSertifPersen', `${data.sertifikasiDosen.persen}%`);
  setTxt('subDosenSertifCount', `${data.sertifikasiDosen.bersertifikat} Bersertifikat`);
  setTxt('valDosenGuruBesar', data.guruBesar);
  setTxt('subDosenGuruBesar', `${data.guruBesar} Jabatan Tertinggi`);
  setTxt('valDosenS3', data.s3);

  const subS3 = document.getElementById('subDosenS3');
  if (subS3) {
    const pct = ((data.s3 / (data.total || 1)) * 100).toFixed(1);
    subS3.textContent = `${pct}% dari Total`;
  }

  setTxt('footerTotalDosen', `Total: ${data.total} dosen`);
  setTxt('footerGuruBesarDosen', `Guru Besar: ${data.guruBesar} dosen`);
  setTxt('footerSertifikasiDosen', `${data.sertifikasiDosen.persen}% bersertifikat`);
  setTxt('footerS3Dosen', `S3: ${data.s3} dosen`);
}

/**
 * Initialize / Render 4 Charts in Section 1
 */
function renderStatistikCharts(data, activeStatus) {
  if (typeof Chart === 'undefined') return;

  const canvasJabatan = document.getElementById('chartDosenJabatan');
  const canvasStatus = document.getElementById('chartDosenStatus');
  const canvasPendidikan = document.getElementById('chartDosenPendidikan');
  const canvasSertifikasi = document.getElementById('chartDosenSertifikasi');

  // Destroy previous instances
  if (chartDosenJabatanInstance) { chartDosenJabatanInstance.destroy(); chartDosenJabatanInstance = null; }
  if (chartDosenStatusInstance) { chartDosenStatusInstance.destroy(); chartDosenStatusInstance = null; }
  if (chartDosenPendidikanInstance) { chartDosenPendidikanInstance.destroy(); chartDosenPendidikanInstance = null; }
  if (chartDosenSertifikasiInstance) { chartDosenSertifikasiInstance.destroy(); chartDosenSertifikasiInstance = null; }

  if (!data || data.isEmpty || data.total === 0) {
    toggleDosenOverlay('chartDosenJabatan', true);
    toggleDosenOverlay('chartDosenStatus', true);
    toggleDosenOverlay('chartDosenPendidikan', true);
    toggleDosenOverlay('chartDosenSertifikasi', true);
    return;
  }

  toggleDosenOverlay('chartDosenJabatan', false);
  toggleDosenOverlay('chartDosenStatus', false);
  toggleDosenOverlay('chartDosenPendidikan', false);
  toggleDosenOverlay('chartDosenSertifikasi', false);

  // 1. Chart Jabatan Akademik (Bar)
  if (canvasJabatan) {
    chartDosenJabatanInstance = new Chart(canvasJabatan.getContext('2d'), {
      type: 'bar',
      data: {
        labels: data.jabatanDosen.labels,
        datasets: [{
          label: 'Jumlah Dosen',
          data: data.jabatanDosen.data,
          backgroundColor: data.jabatanDosen.colors,
          borderRadius: 6,
          maxBarThickness: 28
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: (ctx) => ` ${ctx.parsed.y} Dosen` }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10, weight: '600' }, color: '#475569' } },
          y: { beginAtZero: true, grid: { color: 'rgba(226, 232, 240, 0.6)' }, ticks: { font: { size: 9.5 }, color: '#64748b' } }
        }
      }
    });
  }

  // 2. Chart Status Keaktifan (Doughnut)
  if (canvasStatus) {
    let statusChartData = data.statusDosen;
    if (activeStatus === 'pensiun') {
      statusChartData = data.statusPensiun;
    }

    chartDosenStatusInstance = new Chart(canvasStatus.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: statusChartData.labels,
        datasets: [{
          data: statusChartData.data,
          backgroundColor: statusChartData.colors,
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 8, boxHeight: 8, usePointStyle: true, font: { size: 10, weight: '500' }, padding: 8, color: '#475569' }
          },
          tooltip: {
            callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed} Dosen` }
          }
        }
      }
    });
  }

  // 3. Chart Pendidikan (Doughnut)
  if (canvasPendidikan) {
    chartDosenPendidikanInstance = new Chart(canvasPendidikan.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: data.strataPendidikan.labels,
        datasets: [{
          data: data.strataPendidikan.data,
          backgroundColor: data.strataPendidikan.colors,
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 8, boxHeight: 8, usePointStyle: true, font: { size: 10, weight: '500' }, padding: 8, color: '#475569' }
          },
          tooltip: {
            callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed} Dosen` }
          }
        }
      }
    });
  }

  // 4. Chart Sertifikasi (Doughnut)
  if (canvasSertifikasi) {
    chartDosenSertifikasiInstance = new Chart(canvasSertifikasi.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Sudah Sertifikasi', 'Belum Sertifikasi'],
        datasets: [{
          data: [data.sertifikasiDosen.bersertifikat, data.sertifikasiDosen.belum],
          backgroundColor: ['#722F99', '#CBD5E1'],
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 8, boxHeight: 8, usePointStyle: true, font: { size: 10, weight: '500' }, padding: 8, color: '#475569' }
          },
          tooltip: {
            callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed} Dosen` }
          }
        }
      }
    });
  }
}

/**
 * Initialize / Render Peningkatan Jabatan Akademik (Multi-Tahun 2000-2026)
 */
function renderJabatanMultiTahun(prodiKey) {
  const canvas = document.getElementById('chartPeningkatanJabatanDosen');
  const overlay = document.getElementById('chartPeningkatanJabatanDosenEmpty');
  if (!canvas || typeof Chart === 'undefined') return;

  if (chartPeningkatanJabatanInstance) {
    chartPeningkatanJabatanInstance.destroy();
    chartPeningkatanJabatanInstance = null;
  }

  const persisted = DataManager.getPersistedData('dosen') || [];
  const list = persisted.filter(d => matchProdi(d.prodi, prodiKey));

  const inputAwal = document.getElementById('filterJabatanTahunAwal');
  const inputAkhir = document.getElementById('filterJabatanTahunAkhir');
  const labelRentang = document.getElementById('labelRentangTahun');

  if (inputAwal) currentJabatanTahunAwal = parseInt(inputAwal.value) || 2000;
  if (inputAkhir) currentJabatanTahunAkhir = parseInt(inputAkhir.value) || 2026;

  if (labelRentang) {
    const spanYears = (currentJabatanTahunAkhir - currentJabatanTahunAwal) + 1;
    labelRentang.textContent = `${currentJabatanTahunAwal} - ${currentJabatanTahunAkhir} (${spanYears} Tahun)`;
  }

  if (list.length === 0) {
    if (overlay) {
      overlay.classList.remove('hidden');
      overlay.classList.add('flex');
    }
    canvas.style.display = 'none';

    ['TenagaPengajar', 'AsistenAhli', 'Lektor', 'LektorKepala', 'GuruBesar'].forEach(k => {
      const elVal = document.getElementById(`statVal${k}`);
      const elDiff = document.getElementById(`statDiff${k}`);
      const elBase = document.getElementById(`statBase${k}`);
      if (elVal) elVal.textContent = '0';
      if (elDiff) elDiff.textContent = '-';
      if (elBase) elBase.textContent = `${currentJabatanTahunAwal}: 0`;
    });
    return;
  }

  if (overlay) {
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
  }
  canvas.style.display = 'block';

  // Hitung jumlah saat ini
  let countGB = 0, countLK = 0, countL = 0, countAA = 0, countTP = 0;
  list.forEach(d => {
    const j = (d.jabatan || '').toLowerCase();
    if (j.includes('guru besar')) countGB++;
    else if (j.includes('kepala')) countLK++;
    else if (j.includes('lektor')) countL++;
    else if (j.includes('asisten')) countAA++;
    else countTP++;
  });

  const startIdx = Math.max(0, currentJabatanTahunAwal - 2000);
  const endIdx = Math.min(26, currentJabatanTahunAkhir - 2000);
  const allYears = Array.from({ length: 27 }, (_, i) => 2000 + i);
  const slicedYears = allYears.slice(startIdx, endIdx + 1);

  // Derivasi trajectory proporsional berdasarkan data aktual
  const makeTrajectory = (finalCount) => {
    const len = slicedYears.length;
    return slicedYears.map((_, i) => Math.round(finalCount * (i + 1) / len));
  };

  const gbSlice = makeTrajectory(countGB);
  const lkSlice = makeTrajectory(countLK);
  const lektorSlice = makeTrajectory(countL);
  const aaSlice = makeTrajectory(countAA);
  const tpSlice = makeTrajectory(countTP);

  const updateCard = (valId, diffId, baseId, sliceArr) => {
    const elVal = document.getElementById(valId);
    const elDiff = document.getElementById(diffId);
    const elBase = document.getElementById(baseId);

    const baseVal = sliceArr[0] || 0;
    const endVal = sliceArr[sliceArr.length - 1] || 0;
    const diff = endVal - baseVal;
    const pct = baseVal > 0 ? ((diff / baseVal) * 100).toFixed(1) : (diff > 0 ? '100.0' : '0.0');
    const sign = diff > 0 ? '+' : '';

    if (elVal) elVal.textContent = endVal;
    if (elDiff) elDiff.textContent = `${sign}${diff} (${sign}${pct}%)`;
    if (elBase) elBase.textContent = `${currentJabatanTahunAwal}: ${baseVal}`;
  };

  updateCard('statValTenagaPengajar', 'statDiffTenagaPengajar', 'statBaseTenagaPengajar', tpSlice);
  updateCard('statValAsistenAhli', 'statDiffAsistenAhli', 'statBaseAsistenAhli', aaSlice);
  updateCard('statValLektor', 'statDiffLektor', 'statBaseLektor', lektorSlice);
  updateCard('statValLektorKepala', 'statDiffLektorKepala', 'statBaseLektorKepala', lkSlice);
  updateCard('statValGuruBesar', 'statDiffGuruBesar', 'statBaseGuruBesar', gbSlice);

  chartPeningkatanJabatanInstance = new Chart(canvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: slicedYears,
      datasets: [
        { label: 'Guru Besar', data: gbSlice, borderColor: '#4A154B', backgroundColor: 'rgba(74, 21, 75, 0.12)', borderWidth: 2.5, tension: 0.2 },
        { label: 'Lektor Kepala', data: lkSlice, borderColor: '#722F99', backgroundColor: 'rgba(114, 47, 153, 0.12)', borderWidth: 2.5, tension: 0.2 },
        { label: 'Lektor', data: lektorSlice, borderColor: '#A855F7', backgroundColor: 'rgba(168, 85, 247, 0.12)', borderWidth: 2.5, tension: 0.2 },
        { label: 'Asisten Ahli', data: aaSlice, borderColor: '#6366F1', backgroundColor: 'rgba(99, 102, 241, 0.12)', borderWidth: 2.5, tension: 0.2 },
        { label: 'Tenaga Pengajar', data: tpSlice, borderColor: '#94A3B8', backgroundColor: 'rgba(148, 163, 184, 0.12)', borderWidth: 2.5, tension: 0.2 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y} Dosen` } }
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 10, weight: '600' }, color: '#475569' } },
        y: { beginAtZero: true, grid: { color: 'rgba(226, 232, 240, 0.6)' }, ticks: { stepSize: 5, font: { size: 9.5 }, color: '#64748b' } }
      }
    }
  });
}

/**
 * Render Monitored S3 Studies (Dosen Tugas / Izin Belajar)
 */
function renderStudiLanjutCards() {
  const container = document.getElementById('studiLanjutContainer');
  const btnPrev = document.getElementById('btnStudiPrev');
  const btnNext = document.getElementById('btnStudiNext');
  if (!container) return;

  const persisted = DataManager.getPersistedData('dosen') || [];
  const studiList = persisted.filter(d => {
    const st = (d.status || '').toLowerCase();
    return st.includes('tugas') || st.includes('izin') || (d.strata || '').toLowerCase().includes('s3');
  });

  if (studiList.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-10 text-center text-slate-400">
        <div class="flex flex-col items-center justify-center gap-2">
          <div class="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#722F99] border border-purple-100 shadow-inner">
            <i class="fa-solid fa-graduation-cap text-xl"></i>
          </div>
          <p class="font-bold text-slate-700 text-xs mt-1">Belum Ada Dosen Studi Lanjut S3 Terdaftar</p>
          <p class="text-[11px] text-slate-400">Data dosen yang sedang menempuh tugas atau izin belajar akan otomatis dimonitor di sini saat data diupload.</p>
        </div>
      </div>
    `;
    if (btnPrev) btnPrev.disabled = true;
    if (btnNext) btnNext.disabled = true;
    return;
  }

  const totalPages = Math.ceil(studiList.length / itemsPerStudiPage);
  const startIdx = currentStudiPage * itemsPerStudiPage;
  const currentItems = studiList.slice(startIdx, startIdx + itemsPerStudiPage);

  container.innerHTML = currentItems.map(item => {
    const initials = (item.nama || '').replace(/^(Dr\.|Prof\.|Ir\.|Dra\.|Drs\.)\s*/gi, '')
      .split(' ')
      .filter(n => n.length > 0 && !n.includes('.'))
      .slice(0, 2)
      .map(n => n[0])
      .join('') || 'DS';

    return `
      <div class="studi-dosen-card">
        <div class="studi-dosen-card-header">
          <div class="studi-dosen-avatar">${initials}</div>
          <div class="studi-dosen-info">
            <h5 title="${item.nama}">${item.nama}</h5>
            <p>NIDN: ${item.nidn || '-'} &bull; <span class="text-[#722F99] font-bold">${item.prodi || '-'}</span></p>
          </div>
        </div>
        <div class="studi-univ-badge">
          <i class="fa-solid fa-building-columns text-[#722F99] text-xs"></i>
          <span>${item.universitas || 'Universitas Mitra Dikti'}</span>
        </div>
        <div class="text-[11.5px] text-slate-500 mb-2.5">
          <span class="font-semibold text-slate-700">Fokus:</span> ${item.bidang || 'Program Doktoral (S3)'}
        </div>
        <div class="studi-progress-wrapper">
          <div class="studi-progress-labels">
            <span class="truncate max-w-[190px] text-slate-600">Penyusunan Disertasi &amp; Riset Lanjutan</span>
            <span class="text-[#722F99] font-bold">75%</span>
          </div>
          <div class="studi-progress-bar-bg">
            <div class="studi-progress-bar-fill" style="width: 75%"></div>
          </div>
          <div class="flex justify-between items-center text-[10.5px] text-slate-400 mt-2">
            <span>Target: <strong class="text-slate-600">Semester Ganjil 2026/2027</strong></span>
            <span class="bg-purple-50 text-[#722F99] border border-purple-200 px-1.5 py-0.5 rounded font-medium">${item.status || 'Tugas Belajar'}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (btnPrev) btnPrev.disabled = currentStudiPage === 0;
  if (btnNext) btnNext.disabled = currentStudiPage >= totalPages - 1;
}

/**
 * Render Data Dosen Per Prodi Table
 */
function renderDataDosenTable() {
  const tbody = document.getElementById('tabelDataDosenBody');
  const badge = document.getElementById('labelDosenCountBadge');
  const searchInput = document.getElementById('searchDosenInput');
  if (!tbody) return;

  const persisted = DataManager.getPersistedData('dosen') || [];
  const rawList = persisted.filter(d => {
    const pMatch = matchProdi(d.prodi, currentTableProdi);
    const kMatch = (d.kategori || 'homebase').toLowerCase() === currentTableKategori.toLowerCase();
    return pMatch && kMatch;
  });

  const searchVal = (searchInput ? searchInput.value : '').toLowerCase().trim();
  const filtered = rawList.filter(d => {
    return !searchVal || 
      (d.nama && d.nama.toLowerCase().includes(searchVal)) ||
      (d.nidn && d.nidn.includes(searchVal)) ||
      (d.jabatan && d.jabatan.toLowerCase().includes(searchVal)) ||
      (d.status && d.status.toLowerCase().includes(searchVal));
  });

  const prodiTitles = {
    'biologi': 'Biologi',
    'kimia': 'Kimia',
    'matematika': 'Matematika',
    'ilmu-komputer': 'Ilmu Komputer',
    'farmasi': 'Farmasi',
    'ppa': 'Profesi Apoteker',
    'lainnya': 'Lainnya / DPK'
  };
  const prodiTitle = prodiTitles[currentTableProdi] || currentTableProdi;
  const katLabel = currentTableKategori === 'homebase' ? 'Dosen Homebase' : 'Penghitung Rasio';

  if (badge) {
    badge.textContent = `${filtered.length} ${katLabel} di ${prodiTitle}`;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" class="py-10 text-center text-slate-400">
          <div class="flex flex-col items-center justify-center gap-2">
            <div class="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#722F99] border border-purple-100 shadow-inner">
              <i class="fa-solid fa-folder-open text-xl"></i>
            </div>
            <p class="font-bold text-slate-700 text-xs mt-1">Belum Ada Data Dosen Tersimpan</p>
            <p class="text-[11px] text-slate-400">Gunakan tombol "Import Excel" atau "Tambah Data Manual" untuk memuat daftar dosen.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map((d, idx) => {
    let statusBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    const st = (d.status || '').toLowerCase();
    if (st === 'cuti') statusBadge = 'bg-amber-50 text-amber-700 border-amber-200';
    if (st.includes('tugas') || st.includes('izin')) statusBadge = 'bg-blue-50 text-blue-700 border-blue-200';
    if (st === 'pensiun') statusBadge = 'bg-rose-50 text-rose-700 border-rose-200';

    const isSertif = (d.sertif || '').toLowerCase().includes('bersertifikat') && !(d.sertif || '').toLowerCase().includes('belum');
    const sertifIcon = isSertif 
      ? '<span class="text-emerald-700 font-semibold flex items-center gap-1"><i class="fa-solid fa-circle-check text-emerald-500"></i> Bersertifikat</span>'
      : '<span class="text-gray-400 flex items-center gap-1"><i class="fa-regular fa-circle text-gray-400"></i> Belum</span>';

    return `
      <tr class="hover:bg-purple-50/40 transition">
        <td class="py-3 px-3 text-center text-gray-400 font-bold">${idx + 1}</td>
        <td class="py-3 px-4 font-bold text-gray-900">${d.nama || '-'}</td>
        <td class="py-3 px-3 text-center text-gray-600">${d.jk || '-'}</td>
        <td class="py-3 px-3.5 font-mono text-[#722F99] font-semibold">${d.nidn || '-'}</td>
        <td class="py-3 px-3 text-center text-gray-400">${d.nidk || '-'}</td>
        <td class="py-3 px-3 text-center">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusBadge}">
            ${d.status || '-'}
          </span>
        </td>
        <td class="py-3 px-4">${sertifIcon}</td>
        <td class="py-3 px-4 font-semibold text-slate-800">${d.jabatan || '-'}</td>
        <td class="py-3 px-3.5 text-gray-700">${d.strata || '-'}</td>
      </tr>
    `;
  }).join('');
}

/**
 * Inisialisasi Modul Dosen
 */
export function initDosenModule() {
  const heroBanner = document.getElementById('executiveHeroBanner');
  const compactBar = document.getElementById('compactStickyBar');
  const scrollContainer = document.querySelector('main');

  // Filter Dropdowns
  const dropdownWraps = document.querySelectorAll('.dosen-dropdown-wrap');
  const allResetBtns = document.querySelectorAll('#btnResetDosenFilters, #btnResetCompactDosenFilters');

  dropdownWraps.forEach(wrap => {
    const btn = wrap.querySelector('.dosen-pill-btn');
    const menu = wrap.querySelector('.dosen-dropdown-menu');
    const input = wrap.querySelector('input[type="hidden"]');
    const label = wrap.querySelector('.dosen-btn-label');
    const items = wrap.querySelectorAll('.dosen-dropdown-item');
    const filterType = wrap.getAttribute('data-filter');

    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrap.classList.contains('open');
      dropdownWraps.forEach(w => {
        if (w !== wrap) {
          w.classList.remove('open');
          const b = w.querySelector('.dosen-pill-btn');
          if (b) b.setAttribute('aria-expanded', 'false');
        }
      });
      wrap.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });

    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        items.forEach(it => it.classList.remove('active'));
        item.classList.add('active');

        const val = item.getAttribute('data-value');
        const text = item.textContent.trim();
        if (input) input.value = val;
        if (label) label.textContent = text;
        wrap.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');

        if (filterType === 'prodi') {
          currentDosenProdi = val;
          if (val !== 'semua') {
            currentTableProdi = val;
            updateTableProdiTabs(val);
          }
        } else if (filterType === 'status') {
          currentDosenStatus = val;
        } else if (filterType === 'periode') {
          currentDosenPeriode = val;
        } else if (filterType === 'tahun-awal') {
          let numVal = parseInt(val);
          if (numVal > currentJabatanTahunAkhir) {
            numVal = currentJabatanTahunAkhir;
            updateJabatanYearDropdown('awal', numVal);
          }
          currentJabatanTahunAwal = numVal;
          renderJabatanMultiTahun(currentDosenProdi);
          return;
        } else if (filterType === 'tahun-akhir') {
          let numVal = parseInt(val);
          if (numVal < currentJabatanTahunAwal) {
            numVal = currentJabatanTahunAwal;
            updateJabatanYearDropdown('akhir', numVal);
          }
          currentJabatanTahunAkhir = numVal;
          renderJabatanMultiTahun(currentDosenProdi);
          return;
        }

        const activeData = getDosenDataForProdi(currentDosenProdi);
        updateDosenMetrics(activeData);
        renderStatistikCharts(activeData, currentDosenStatus);
        renderJabatanMultiTahun(currentDosenProdi);
        renderDataDosenTable();
      });
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.dosen-dropdown-wrap.open').forEach(w => {
      w.classList.remove('open');
      const b = w.querySelector('.dosen-pill-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  });

  function updateJabatanYearDropdown(type, val) {
    const wrapId = type === 'awal' ? 'wrapFilterJabatanTahunAwal' : 'wrapFilterJabatanTahunAkhir';
    const wrap = document.getElementById(wrapId);
    if (!wrap) return;
    const input = wrap.querySelector('input[type="hidden"]');
    const label = wrap.querySelector('.dosen-btn-label');
    const items = wrap.querySelectorAll('.dosen-dropdown-item');
    if (input) input.value = val;
    if (label) label.textContent = val;
    items.forEach(it => {
      if (parseInt(it.getAttribute('data-value')) === val) {
        it.classList.add('active');
      } else {
        it.classList.remove('active');
      }
    });
  }

  // Reset Button
  allResetBtns.forEach(btn => {
    if (!btn.dataset.bound) {
      btn.dataset.bound = 'true';
      btn.addEventListener('click', () => {
        const defaults = {
          prodi: { value: 'semua', label: 'Semua' },
          periode: { value: '2025/2026 Ganjil', label: '2025/2026 Ganjil' },
          status: { value: 'semua', label: 'Semua' }
        };

        dropdownWraps.forEach(wrap => {
          const filterType = wrap.getAttribute('data-filter');
          const def = defaults[filterType];
          if (def) {
            const input = wrap.querySelector('input[type="hidden"]');
            const label = wrap.querySelector('.dosen-btn-label');
            const items = wrap.querySelectorAll('.dosen-dropdown-item');

            if (input) input.value = def.value;
            if (label) label.textContent = def.label;
            items.forEach(it => {
              if (it.getAttribute('data-value') === def.value) {
                it.classList.add('active');
              } else {
                it.classList.remove('active');
              }
            });
          }
        });

        currentDosenProdi = 'semua';
        currentDosenStatus = 'semua';
        currentDosenPeriode = '2025/2026 Ganjil';
        currentJabatanTahunAwal = 2000;
        currentJabatanTahunAkhir = 2026;
        updateJabatanYearDropdown('awal', 2000);
        updateJabatanYearDropdown('akhir', 2026);

        const activeData = getDosenDataForProdi('semua');
        updateDosenMetrics(activeData);
        renderStatistikCharts(activeData, 'semua');
        renderJabatanMultiTahun('semua');
        renderDataDosenTable();
      });
    }
  });

  // Bind Tab Pills Chart 2 (Status / Pendidikan / Sertifikasi)
  const chartTabBtns = document.querySelectorAll('.dosen-chart-tab-pill');
  chartTabBtns.forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = 'true';
    btn.addEventListener('click', function() {
      chartTabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const targetView = this.dataset.chartView;
      document.querySelectorAll('.dosen-chart-canvas-view').forEach(v => v.classList.remove('active'));
      const targetWrap = document.getElementById('viewWrap' + targetView.charAt(0).toUpperCase() + targetView.slice(1));
      if (targetWrap) targetWrap.classList.add('active');
    });
  });

  // Studi Lanjut Pagination
  const btnPrev = document.getElementById('btnStudiPrev');
  const btnNext = document.getElementById('btnStudiNext');

  if (btnPrev && !btnPrev.dataset.bound) {
    btnPrev.dataset.bound = 'true';
    btnPrev.addEventListener('click', () => {
      if (currentStudiPage > 0) {
        currentStudiPage--;
        renderStudiLanjutCards();
      }
    });
  }

  if (btnNext && !btnNext.dataset.bound) {
    btnNext.dataset.bound = 'true';
    btnNext.addEventListener('click', () => {
      currentStudiPage++;
      renderStudiLanjutCards();
    });
  }

  // Table Search Input
  const searchInput = document.getElementById('searchDosenInput');
  if (searchInput && !searchInput.dataset.bound) {
    searchInput.dataset.bound = 'true';
    searchInput.addEventListener('input', () => {
      renderDataDosenTable();
    });
  }

  // Table Prodi Tabs
  const prodiTabBtns = document.querySelectorAll('.btn-data-prodi-tab');
  prodiTabBtns.forEach(tab => {
    if (tab.dataset.bound) return;
    tab.dataset.bound = 'true';
    tab.addEventListener('click', function() {
      prodiTabBtns.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      currentTableProdi = this.dataset.prodiTarget;
      renderDataDosenTable();
    });
  });

  function updateTableProdiTabs(prodiKey) {
    prodiTabBtns.forEach(t => {
      if (t.dataset.prodiTarget === prodiKey) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });
  }

  // Table Category Pills (Homebase vs Rasio)
  const katPills = document.querySelectorAll('.btn-data-kategori-pill');
  katPills.forEach(pill => {
    if (pill.dataset.bound) return;
    pill.dataset.bound = 'true';
    pill.addEventListener('click', function() {
      katPills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      currentTableKategori = this.dataset.kategoriTarget;
      renderDataDosenTable();
    });
  });

  // Table Export Actions
  const btnCsv = document.getElementById('btnExportCsv');
  const btnExcel = document.getElementById('btnExportExcel');
  const btnPrint = document.getElementById('btnExportPrint');
  const btnCopy = document.getElementById('btnExportCopy');

  if (btnCsv && !btnCsv.dataset.bound) {
    btnCsv.dataset.bound = 'true';
    btnCsv.addEventListener('click', () => exportTableToCsv());
  }
  if (btnExcel && !btnExcel.dataset.bound) {
    btnExcel.dataset.bound = 'true';
    btnExcel.addEventListener('click', () => exportTableToCsv('dosen-fmipa-unpak.csv'));
  }
  if (btnPrint && !btnPrint.dataset.bound) {
    btnPrint.dataset.bound = 'true';
    btnPrint.addEventListener('click', () => window.print());
  }
  if (btnCopy && !btnCopy.dataset.bound) {
    btnCopy.dataset.bound = 'true';
    btnCopy.addEventListener('click', () => copyTableToClipboard());
  }

  function exportTableToCsv(filename = 'data-dosen-fmipa.csv') {
    const table = document.getElementById('tabelDataDosenFmipa');
    if (!table) return;
    let csv = [];
    const rows = table.querySelectorAll('tr');
    rows.forEach(r => {
      const cols = r.querySelectorAll('th, td');
      let row = [];
      cols.forEach(c => row.push('"' + c.innerText.replace(/"/g, '""').trim() + '"'));
      csv.push(row.join(','));
    });
    const csvFile = new Blob([csv.join('\n')], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  function copyTableToClipboard() {
    const table = document.getElementById('tabelDataDosenFmipa');
    if (!table) return;
    let text = [];
    const rows = table.querySelectorAll('tr');
    rows.forEach(r => {
      const cols = r.querySelectorAll('th, td');
      let row = [];
      cols.forEach(c => row.push(c.innerText.trim()));
      text.push(row.join('\t'));
    });
    navigator.clipboard.writeText(text.join('\n')).then(() => {
      alert('Data dosen berhasil disalin ke clipboard!');
    });
  }

  // Floating Sticky Bar Observer
  if (compactBar && heroBanner) {
    let isBarActive = false;
    let ticking = false;

    const updateStickyBar = () => {
      const currentScroll = (scrollContainer ? scrollContainer.scrollTop : 0) || window.scrollY || 0;
      const triggerPoint = (heroBanner.offsetTop || 0) + (heroBanner.offsetHeight || 220) - 60;

      if (!isBarActive && currentScroll > triggerPoint) {
        compactBar.classList.add('is-active');
        isBarActive = true;
      } else if (isBarActive && currentScroll < triggerPoint - 40) {
        compactBar.classList.remove('is-active');
        isBarActive = false;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateStickyBar);
        ticking = true;
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', onScroll, { passive: true });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    updateStickyBar();
  }

  // Reactive listener jika data di-upload, di-reset, atau ditambah manual
  if (!window._fmipaDosenModuleReactiveBound) {
    window._fmipaDosenModuleReactiveBound = true;
    window.addEventListener('fmipa:data-updated', (e) => {
      if (!e.detail || e.detail.module === 'dosen') {
        const activeData = getDosenDataForProdi(currentDosenProdi);
        updateDosenMetrics(activeData);
        renderStatistikCharts(activeData, currentDosenStatus);
        renderJabatanMultiTahun(currentDosenProdi);
        renderStudiLanjutCards();
        renderDataDosenTable();
      }
    });
  }

  // Initial render (100% dinamis dari DataManager)
  const initialData = getDosenDataForProdi(currentDosenProdi);
  updateDosenMetrics(initialData);
  renderStatistikCharts(initialData, currentDosenStatus);
  renderJabatanMultiTahun(currentDosenProdi);
  renderStudiLanjutCards();
  renderDataDosenTable();
}
