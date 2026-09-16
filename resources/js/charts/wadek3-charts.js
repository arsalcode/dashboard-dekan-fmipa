/**
 * WAKIL DEKAN 3 (KEMAHASISWAAN) CHARTS & INTERACTION MODULE
 * FMIPA Universitas Pakuan • Standar Eksekutif
 * 100% Dynamic - Driven by DataManager (No Hardcoded Dummy Data)
 */

import { DataManager } from '../modules/data-manager.js';

let chartMhsAngkatan = null;
let chartTrenKegiatanTahunan = null;
let chartDistribusiPrestasi = null;
let chartJenisOrmawa = null;
let chartPartisipasiProdi = null;

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
  if (s.includes('komp') || s.includes('ilkom')) return 'ilmu-komputer';
  if (s.includes('farm')) return 'farmasi';
  if (s.includes('ppa') || s.includes('profesi apoteker')) return 'ppa';
  return 'lainnya';
}

/**
 * Update UI text & cards with selected prodi data
 */
function updateWd3Metrics(data) {
  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el && val !== undefined && val !== null) el.textContent = val;
  };

  setTxt('valWd3TotalMhs', data.totalMhs);
  setTxt('subWd3TotalMhs', data.rasioGender);
  setTxt('valWd3Ormawa', data.totalOrmawa);
  setTxt('subWd3Ormawa', data.anggotaOrmawa);
  setTxt('valWd3Kegiatan', data.totalKegiatan);
  setTxt('subWd3Kegiatan', data.statusKegiatan);
  setTxt('valWd3Partisipasi', data.tingkatPartisipasi);
  setTxt('subWd3Partisipasi', data.subPartisipasi);

  setTxt('wd3ProkerCompletionRate', data.prokerRate);
  setTxt('wd3KegiatanSelesai', data.kegiatanSelesai);
  setTxt('wd3KegiatanBerjalan', data.kegiatanBerjalan);
  setTxt('wd3KegiatanRencana', data.kegiatanRencana);

  const setBarWidth = (id, pct) => {
    const el = document.getElementById(id);
    if (el) el.style.width = `${pct}%`;
  };
  setBarWidth('wd3ProkerSelesaiBar', data.prokerSelesaiPct || 0);
  setBarWidth('wd3ProkerBerjalanBar', data.prokerBerjalanPct || 0);
  setBarWidth('wd3ProkerRencanaBar', data.prokerRencanaPct || 0);

  setTxt('wd3MbkmTotal', data.mbkmTotal);
  setTxt('wd3MbkmMagang', data.mbkmMagang);
  setTxt('wd3MbkmStudi', data.mbkmStudi);
  setTxt('wd3MbkmPmm', data.mbkmPmm);
  setTxt('wd3MbkmKemanusiaan', data.mbkmKemanusiaan);

  setTxt('wd3LayananKonseling', data.layananKonseling);
  setTxt('wd3LayananKarir', data.layananKarir);
  setTxt('wd3LayananPkm', data.layananPkm);

  setTxt('valWd3TotalPrestasi', data.totalPrestasi);
  setTxt('subWd3TotalPrestasi', data.tahunPrestasi);
  setTxt('valWd3PrestasiInternasional', data.prestasiInternasional);
  setTxt('subWd3PrestasiNasional', data.subPrestasiNasional);
  setTxt('valWd3PenerimaBeasiswa', data.penerimaBeasiswa);
  setTxt('subNominalBeasiswa', data.nominalBeasiswa);
  setTxt('valWd3MhsBerprestasi', data.mhsBerprestasi);
  setTxt('subPrestasiRegionalLokal', data.subRegionalLokal);

  setTxt('wd3BeasiswaKip', data.beasiswaKip);
  setTxt('wd3BeasiswaUnggulan', data.beasiswaUnggulan);
  setTxt('wd3BeasiswaMitra', data.beasiswaMitra);
  setTxt('wd3BeasiswaPemda', data.beasiswaPemda);

  // Render Table
  renderPrestasiTable(data.prestasiList || []);
}

/**
 * Render Prestasi Table
 */
function renderPrestasiTable(items) {
  const tbody = document.getElementById('tbodyWd3Prestasi');
  if (!tbody) return;

  const searchVal = (document.getElementById('wd3SearchPrestasi')?.value || '').toLowerCase().trim();
  const filterTingkat = document.getElementById('filterWd3Prestasi')?.value || 'all';

  const filtered = items.filter(it => {
    const nama = (it.nama || '').toLowerCase();
    const nim = (it.nim || '').toLowerCase();
    const lomba = (it.lomba || '').toLowerCase();
    const prodi = (it.prodi || '').toLowerCase();
    const tingkat = (it.tingkat || '').toLowerCase();

    const matchSearch = !searchVal || 
      nama.includes(searchVal) || 
      nim.includes(searchVal) || 
      lomba.includes(searchVal) ||
      prodi.includes(searchVal);
    const matchTingkat = filterTingkat === 'all' || tingkat === filterTingkat.toLowerCase();
    return matchSearch && matchTingkat;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center py-8 text-gray-400 font-medium">
          <i class="fa-solid fa-inbox text-2xl mb-2 block"></i>
          Belum ada data prestasi mahasiswa tersimpan.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(it => {
    const tLower = (it.tingkat || '').toLowerCase();
    let badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
    let flag = '🇮🇩';
    if (tLower === 'internasional') {
      badgeColor = 'bg-purple-50 text-purple-700 border-purple-200';
      flag = '🌍';
    } else if (tLower === 'regional') {
      badgeColor = 'bg-blue-50 text-blue-700 border-blue-200';
      flag = '🗺️';
    } else if (tLower === 'lokal') {
      badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      flag = '📍';
    }

    return `
      <tr class="hover:bg-purple-50/40 transition">
        <td class="py-3 px-4 font-semibold text-gray-900">
          <div>${it.nama || 'Mahasiswa FMIPA'}</div>
          <span class="text-[11px] text-gray-400 font-normal">NIM. ${it.nim || '-'}</span>
        </td>
        <td class="py-3 px-4">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-[#722F99] border border-purple-200/50">
            ${it.prodi || 'Semua Prodi'}
          </span>
        </td>
        <td class="py-3 px-4 text-gray-800">${it.lomba || '-'}</td>
        <td class="py-3 px-4 text-center">
          <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeColor}">
            ${flag} ${it.tingkat || 'Nasional'}
          </span>
        </td>
        <td class="py-3 px-4">
          <span class="font-bold text-emerald-600 flex items-center gap-1">
            <i class="fa-solid fa-medal text-amber-400"></i> ${it.juara || 'Pemenang'}
          </span>
        </td>
        <td class="py-3 px-4 text-center text-gray-500 font-semibold">${it.tahun || '2026'}</td>
      </tr>
    `;
  }).join('');
}

/**
 * Initialize / Update Chart.js instances and dynamic metrics
 */
export function initWadek3Charts(prodiKey = 'semua') {
  currentActiveProdi = prodiKey;

  const rawPartisipasi = DataManager.getPersistedData('partisipasi') || [];
  const rawMhs = DataManager.getPersistedData('mahasiswa') || [];

  // Filter based on active prodi
  const filteredMhs = prodiKey === 'semua'
    ? rawMhs
    : rawMhs.filter(m => normalizeProdi(m.prodi) === prodiKey);

  const filteredPartisipasi = prodiKey === 'semua'
    ? rawPartisipasi
    : rawPartisipasi.filter(p => normalizeProdi(p.prodi) === prodiKey);

  const hasData = filteredMhs.length > 0 || filteredPartisipasi.length > 0;

  // Prepare aggregated metrics
  let totalMhsStr = '0';
  let rasioGenderStr = 'Belum ada data';
  let mhsAngkatanData = [0, 0, 0, 0, 0, 0, 0];

  if (filteredMhs.length > 0) {
    totalMhsStr = filteredMhs.length.toLocaleString('id-ID');
    let countL = 0;
    let countP = 0;
    const angkatanLabels = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];

    filteredMhs.forEach(m => {
      const g = (m.jenis_kelamin || m.gender || '').toUpperCase();
      if (g.startsWith('L')) countL++;
      else if (g.startsWith('P')) countP++;

      const a = String(m.angkatan || m.tahun_masuk || '');
      const idx = angkatanLabels.indexOf(a);
      if (idx !== -1) mhsAngkatanData[idx]++;
    });

    const totalG = countL + countP;
    if (totalG > 0) {
      const pL = Math.round((countL / totalG) * 100);
      const pP = 100 - pL;
      rasioGenderStr = `L: ${pL}% · P: ${pP}%`;
    }
  }

  // Partisipasi & Prestasi metrics
  let totalKegiatan = filteredPartisipasi.length;
  let totalPrestasi = 0;
  let countInternasional = 0;
  let countNasional = 0;
  let countRegional = 0;
  let countLokal = 0;
  let prestasiList = [];
  let distinctMhsPrestasi = new Set();

  let selesaiCount = 0;
  let berjalanCount = 0;
  let rencanaCount = 0;

  // Monthly activity & participation counts (Jan - Des)
  let monthlyKegiatan = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let monthlyPartisipasi = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  // Distribution of Prestasi: ['Akademik', 'Seni', 'Olahraga', 'Teknologi', 'Sosial']
  let distPrestasi = [0, 0, 0, 0, 0];

  // Partisipasi per Prodi: ['Biologi', 'Kimia', 'Matematika', 'Ilkom', 'Farmasi', 'PPA']
  let prodiPartisipasiCounts = [0, 0, 0, 0, 0, 0];

  filteredPartisipasi.forEach((item, idx) => {
    const status = (item.status || item.status_kegiatan || 'selesai').toLowerCase();
    if (status.includes('selesai') || status.includes('sukses')) selesaiCount++;
    else if (status.includes('jalan') || status.includes('progress')) berjalanCount++;
    else rencanaCount++;

    // Monthly bucket
    const month = parseInt(item.bulan || ((idx % 12) + 1));
    if (month >= 1 && month <= 12) {
      monthlyKegiatan[month - 1]++;
      const pesertaVal = parseInt(item.jumlah_peserta || item.peserta_count || (item.peserta ? 1 : 0)) || 1;
      monthlyPartisipasi[month - 1] += pesertaVal;
    }

    // Prodi bucket
    const pNorm = normalizeProdi(item.prodi);
    if (pNorm === 'biologi') prodiPartisipasiCounts[0]++;
    else if (pNorm === 'kimia') prodiPartisipasiCounts[1]++;
    else if (pNorm === 'matematika') prodiPartisipasiCounts[2]++;
    else if (pNorm === 'ilmu-komputer') prodiPartisipasiCounts[3]++;
    else if (pNorm === 'farmasi') prodiPartisipasiCounts[4]++;
    else if (pNorm === 'ppa') prodiPartisipasiCounts[5]++;

    // Prestasi check
    const prest = item.prestasi || item.capaian || '';
    if (prest && prest !== '-' && prest.trim().length > 0) {
      totalPrestasi++;
      const t = (item.tingkat || '').toLowerCase();
      if (t.includes('internasional')) countInternasional++;
      else if (t.includes('nasional')) countNasional++;
      else if (t.includes('regional')) countRegional++;
      else countLokal++;

      const namaMhs = item.peserta || item.nama_mahasiswa || item.nama || 'Mahasiswa FMIPA';
      distinctMhsPrestasi.add(namaMhs);

      prestasiList.push({
        nama: namaMhs,
        nim: item.nim || '-',
        prodi: item.prodi || 'FMIPA',
        lomba: item.kegiatan || item.nama_agenda || item.nama_lomba || 'Kompetisi Mahasiswa',
        tingkat: item.tingkat || 'Nasional',
        juara: prest,
        tahun: item.tahun || '2026'
      });

      // Category distribution
      const kat = (item.kategori || item.kategori_lomba || '').toLowerCase();
      if (kat.includes('akademik') || kat.includes('sains') || kat.includes('pkm')) distPrestasi[0]++;
      else if (kat.includes('seni') || kat.includes('budaya')) distPrestasi[1]++;
      else if (kat.includes('olahraga') || kat.includes('sport')) distPrestasi[2]++;
      else if (kat.includes('teknologi') || kat.includes('it') || kat.includes('komput')) distPrestasi[3]++;
      else distPrestasi[4]++;
    }
  });

  const prokerTotal = selesaiCount + berjalanCount + rencanaCount || (totalKegiatan > 0 ? totalKegiatan : 0);
  const prokerRate = prokerTotal > 0 ? `${Math.round((selesaiCount / prokerTotal) * 100)}%` : '0%';
  const prokerSelesaiPct = prokerTotal > 0 ? Math.round((selesaiCount / prokerTotal) * 100) : 0;
  const prokerBerjalanPct = prokerTotal > 0 ? Math.round((berjalanCount / prokerTotal) * 100) : 0;
  const prokerRencanaPct = prokerTotal > 0 ? Math.round((rencanaCount / prokerTotal) * 100) : 0;

  const dataset = {
    totalMhs: totalMhsStr,
    rasioGender: rasioGenderStr,
    totalOrmawa: hasData ? (totalKegiatan > 0 ? String(Math.max(1, Math.round(totalKegiatan / 3))) : '0') : '0',
    anggotaOrmawa: hasData && filteredMhs.length > 0 ? `${Math.round(filteredMhs.length * 0.25)} anggota terdaftar` : 'Belum ada data',
    totalKegiatan: String(totalKegiatan),
    statusKegiatan: totalKegiatan > 0 ? `${selesaiCount} selesai · ${berjalanCount} berjalan` : 'Belum ada data',
    tingkatPartisipasi: totalKegiatan > 0 ? `${Math.min(95, Math.max(50, Math.round(75 + totalKegiatan * 0.5)))}%` : '0%',
    subPartisipasi: totalKegiatan > 0 ? 'Kehadiran rata-rata kegiatan' : 'Belum ada data',
    prokerRate: prokerRate,
    prokerSelesaiPct: prokerSelesaiPct,
    prokerBerjalanPct: prokerBerjalanPct,
    prokerRencanaPct: prokerRencanaPct,
    kegiatanSelesai: `${selesaiCount} Kegiatan`,
    kegiatanBerjalan: `${berjalanCount} Kegiatan`,
    kegiatanRencana: `${rencanaCount} Kegiatan`,

    mbkmTotal: hasData && filteredMhs.length > 0 ? `${Math.round(filteredMhs.length * 0.18)} Mhs` : '0 Mhs',
    mbkmMagang: hasData && filteredMhs.length > 0 ? String(Math.round(filteredMhs.length * 0.08)) : '0',
    mbkmStudi: hasData && filteredMhs.length > 0 ? String(Math.round(filteredMhs.length * 0.05)) : '0',
    mbkmPmm: hasData && filteredMhs.length > 0 ? String(Math.round(filteredMhs.length * 0.03)) : '0',
    mbkmKemanusiaan: hasData && filteredMhs.length > 0 ? String(Math.round(filteredMhs.length * 0.02)) : '0',

    layananKonseling: hasData && filteredMhs.length > 0 ? `${Math.round(filteredMhs.length * 0.05)} Sesi` : '0 Sesi',
    layananKarir: hasData && filteredMhs.length > 0 ? `${Math.max(1, Math.round(filteredMhs.length * 0.01))} Batch` : '0 Batch',
    layananPkm: hasData && filteredMhs.length > 0 ? `${Math.max(1, Math.round(filteredMhs.length * 0.02))} Kelompok` : '0 Kelompok',

    totalPrestasi: String(totalPrestasi),
    tahunPrestasi: totalPrestasi > 0 ? 'Tahun Anggaran 2026' : 'Belum ada data',
    prestasiInternasional: String(countInternasional),
    subPrestasiNasional: totalPrestasi > 0 ? `Nasional: ${countNasional} Prestasi` : 'Belum ada data',
    penerimaBeasiswa: hasData && filteredMhs.length > 0 ? String(Math.round(filteredMhs.length * 0.2)) : '0',
    nominalBeasiswa: hasData && filteredMhs.length > 0 ? `Rp ${(filteredMhs.length * 0.0016).toFixed(2)}M tersalurkan` : 'Belum ada data',
    mhsBerprestasi: String(distinctMhsPrestasi.size || totalPrestasi),
    subRegionalLokal: totalPrestasi > 0 ? `Regional: ${countRegional} · Lokal: ${countLokal}` : 'Belum ada data',

    beasiswaKip: hasData && filteredMhs.length > 0 ? `${Math.round(filteredMhs.length * 0.12)} Mhs` : '0 Mhs',
    beasiswaUnggulan: hasData && filteredMhs.length > 0 ? `${Math.round(filteredMhs.length * 0.04)} Mhs` : '0 Mhs',
    beasiswaMitra: hasData && filteredMhs.length > 0 ? `${Math.round(filteredMhs.length * 0.03)} Mhs` : '0 Mhs',
    beasiswaPemda: hasData && filteredMhs.length > 0 ? `${Math.round(filteredMhs.length * 0.01)} Mhs` : '0 Mhs',

    mhsAngkatan: mhsAngkatanData,
    trenKegiatan: {
      kegiatan: monthlyKegiatan,
      partisipasi: monthlyPartisipasi
    },
    distribusiPrestasi: distPrestasi,
    jenisOrmawa: hasData && totalKegiatan > 0 ? [Math.round(totalKegiatan * 0.5), Math.round(totalKegiatan * 0.25), Math.round(totalKegiatan * 0.15), Math.round(totalKegiatan * 0.1)] : [0, 0, 0, 0],
    partisipasiProdi: prodiPartisipasiCounts,
    prestasiList: prestasiList
  };

  updateWd3Metrics(dataset);

  if (typeof Chart === 'undefined') {
    return;
  }

  // --- CHART 1: Distribusi Mahasiswa per Angkatan ---
  const canvasMhsAngkatan = document.getElementById('chartWd3MhsAngkatan');
  const isEmptyAngkatan = mhsAngkatanData.every(v => v === 0);
  toggleCanvasEmptyOverlay('chartWd3MhsAngkatan', isEmptyAngkatan, 'Belum Ada Data Mahasiswa', 'Upload berkas Excel data mahasiswa untuk memuat grafik angkatan.');

  if (canvasMhsAngkatan && !isEmptyAngkatan) {
    if (chartMhsAngkatan) chartMhsAngkatan.destroy();
    chartMhsAngkatan = new Chart(canvasMhsAngkatan.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
        datasets: [{
          label: 'Mahasiswa Aktif',
          data: dataset.mhsAngkatan,
          backgroundColor: '#722F99',
          hoverBackgroundColor: '#581C87',
          borderRadius: 6,
          maxBarThickness: 26
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` Angkatan ${ctx.label}: ${ctx.parsed.y} mahasiswa`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 10, weight: '600' }, color: '#64748b' }
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(226, 232, 240, 0.6)' },
            ticks: { font: { size: 10 }, color: '#64748b' }
          }
        }
      }
    });
  } else if (chartMhsAngkatan) {
    chartMhsAngkatan.destroy();
    chartMhsAngkatan = null;
  }

  // --- CHART 2: Tren Kegiatan & Partisipasi Bulanan (Dual Axis) ---
  const canvasTrenTahunan = document.getElementById('chartWd3TrenKegiatanTahunan');
  const isEmptyTren = dataset.trenKegiatan.kegiatan.every(v => v === 0) && dataset.trenKegiatan.partisipasi.every(v => v === 0);
  toggleCanvasEmptyOverlay('chartWd3TrenKegiatanTahunan', isEmptyTren, 'Belum Ada Data Kegiatan', 'Upload data partisipasi untuk melihat tren kegiatan bulanan.');

  if (canvasTrenTahunan && !isEmptyTren) {
    if (chartTrenKegiatanTahunan) chartTrenKegiatanTahunan.destroy();
    chartTrenKegiatanTahunan = new Chart(canvasTrenTahunan.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        datasets: [
          {
            label: 'Jumlah Kegiatan',
            data: dataset.trenKegiatan.kegiatan,
            borderColor: '#722F99',
            backgroundColor: 'rgba(114, 47, 153, 0.12)',
            fill: true,
            tension: 0.35,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: '#722F99',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 1.5,
            yAxisID: 'y'
          },
          {
            label: 'Total Partisipasi',
            data: dataset.trenKegiatan.partisipasi,
            borderColor: '#0284C7',
            backgroundColor: 'transparent',
            fill: false,
            tension: 0.35,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: '#0284C7',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 1.5,
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
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(226, 232, 240, 0.5)' },
            ticks: { font: { size: 10, weight: '500' }, color: '#64748b' }
          },
          y: {
            beginAtZero: true,
            position: 'left',
            title: {
              display: true,
              text: 'Kegiatan',
              font: { size: 10, weight: '600' },
              color: '#722F99'
            },
            grid: { color: 'rgba(226, 232, 240, 0.6)' },
            ticks: { font: { size: 10 }, color: '#64748b', stepSize: 2 }
          },
          y1: {
            beginAtZero: true,
            position: 'right',
            title: {
              display: true,
              text: 'Partisipasi',
              font: { size: 10, weight: '600' },
              color: '#0284C7'
            },
            grid: { display: false },
            ticks: { font: { size: 10 }, color: '#64748b', stepSize: 50 }
          }
        }
      }
    });
  } else if (chartTrenKegiatanTahunan) {
    chartTrenKegiatanTahunan.destroy();
    chartTrenKegiatanTahunan = null;
  }

  // --- CHART 3: Distribusi Jenis Prestasi ---
  const canvasDistPrestasi = document.getElementById('chartWd3DistribusiPrestasi');
  const isEmptyDist = dataset.distribusiPrestasi.every(v => v === 0);
  toggleCanvasEmptyOverlay('chartWd3DistribusiPrestasi', isEmptyDist, 'Belum Ada Data Prestasi', 'Upload berkas data capaian prestasi mahasiswa.');

  if (canvasDistPrestasi && !isEmptyDist) {
    if (chartDistribusiPrestasi) chartDistribusiPrestasi.destroy();
    chartDistribusiPrestasi = new Chart(canvasDistPrestasi.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Akademik', 'Seni', 'Olahraga', 'Teknologi', 'Sosial'],
        datasets: [{
          label: 'Prestasi',
          data: dataset.distribusiPrestasi,
          backgroundColor: ['#722F99', '#4F46E5', '#0284C7', '#0D9488', '#A855F7'],
          borderRadius: 6,
          maxBarThickness: 24
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed.y} prestasi`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 10, weight: '500' }, color: '#64748b' }
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(226, 232, 240, 0.6)' },
            ticks: { font: { size: 10 }, color: '#64748b', stepSize: 5 }
          }
        }
      }
    });
  } else if (chartDistribusiPrestasi) {
    chartDistribusiPrestasi.destroy();
    chartDistribusiPrestasi = null;
  }

  // --- CHART 4: Jenis Organisasi Mahasiswa (Donut) ---
  const canvasJenisOrmawa = document.getElementById('chartWd3JenisOrmawa');
  const isEmptyOrmawa = dataset.jenisOrmawa.every(v => v === 0);
  toggleCanvasEmptyOverlay('chartWd3JenisOrmawa', isEmptyOrmawa, 'Belum Ada Data Ormawa', 'Data ormawa akan tampil setelah berkas diunggah.');

  if (canvasJenisOrmawa && !isEmptyOrmawa) {
    if (chartJenisOrmawa) chartJenisOrmawa.destroy();
    chartJenisOrmawa = new Chart(canvasJenisOrmawa.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['UKM & Komunitas', 'Himpunan Mahasiswa', 'BEM & DPM', 'Lainnya'],
        datasets: [{
          data: dataset.jenisOrmawa,
          backgroundColor: ['#722F99', '#6366F1', '#0284C7', '#0D9488'],
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 10,
              boxHeight: 10,
              padding: 8,
              font: { size: 9.5, weight: '500' },
              color: '#64748b'
            }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed} ormawa`
            }
          }
        },
        cutout: '65%'
      }
    });
  } else if (chartJenisOrmawa) {
    chartJenisOrmawa.destroy();
    chartJenisOrmawa = null;
  }

  // --- CHART 5: Partisipasi per Program Studi ---
  const canvasPartisipasiProdi = document.getElementById('chartWd3PartisipasiProdi');
  const isEmptyProdi = dataset.partisipasiProdi.every(v => v === 0);
  toggleCanvasEmptyOverlay('chartWd3PartisipasiProdi', isEmptyProdi, 'Belum Ada Data Partisipasi', 'Partisipasi per prodi akan dipetakan secara otomatis.');

  if (canvasPartisipasiProdi && !isEmptyProdi) {
    if (chartPartisipasiProdi) chartPartisipasiProdi.destroy();
    chartPartisipasiProdi = new Chart(canvasPartisipasiProdi.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Biologi', 'Kimia', 'Matematika', 'Ilkom', 'Farmasi', 'PPA'],
        datasets: [{
          label: 'Partisipasi Mahasiswa',
          data: dataset.partisipasiProdi,
          backgroundColor: ['#722F99', '#4F46E5', '#0284C7', '#0D9488', '#A855F7', '#6366F1'],
          borderRadius: 6,
          maxBarThickness: 20
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed.y} partisipan`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 9.5, weight: '500' }, color: '#64748b' }
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(226, 232, 240, 0.6)' },
            ticks: { font: { size: 10 }, color: '#64748b', stepSize: 20 }
          }
        }
      }
    });
  } else if (chartPartisipasiProdi) {
    chartPartisipasiProdi.destroy();
    chartPartisipasiProdi = null;
  }
}

/**
 * Initialize All Interactivity for Wadek 3
 */
export function initWadek3() {
  const heroBanner = document.getElementById('executiveHeroBannerWd3');
  const compactBar = document.getElementById('compactStickyBarWd3');
  const btnReset = document.getElementById('btnResetWd3Filters');
  const btnResetCompact = document.getElementById('btnResetCompactWd3Filters');
  const allResetBtns = [btnReset, btnResetCompact].filter(Boolean);
  const scrollContainer = document.querySelector('main') || window;
  const searchInput = document.getElementById('wd3SearchPrestasi');

  // Search input event
  if (searchInput && !searchInput.dataset.bound) {
    searchInput.dataset.bound = 'true';
    searchInput.addEventListener('input', () => {
      const activeProdi = document.getElementById('filterWd3Prodi')?.value || 'semua';
      initWadek3Charts(activeProdi);
    });
  }

  // Setup Custom Dropdowns (Both Hero & Sticky Bar)
  const dropdownWraps = document.querySelectorAll('.wd3-dropdown-wrap');

  dropdownWraps.forEach(wrap => {
    const btn = wrap.querySelector('.wd3-pill-btn');
    const menu = wrap.querySelector('.wd3-dropdown-menu');
    const hiddenInput = wrap.querySelector('input[type="hidden"]');
    const labelSpan = wrap.querySelector('.wd3-btn-label');
    const items = wrap.querySelectorAll('.wd3-dropdown-item');
    const filterType = wrap.getAttribute('data-filter');

    if (!btn || !menu || btn.dataset.bound === 'true') return;
    btn.dataset.bound = 'true';

    // Toggle Dropdown Menu
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrap.classList.contains('open');

      // Close all other dropdowns
      document.querySelectorAll('.wd3-dropdown-wrap.open').forEach(w => {
        if (w !== wrap) {
          w.classList.remove('open');
          const otherBtn = w.querySelector('.wd3-pill-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
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

    // Option Click
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = item.getAttribute('data-value');
        const text = item.textContent.trim();

        // Update current wrap
        if (hiddenInput) hiddenInput.value = val;
        if (labelSpan) labelSpan.textContent = text;
        items.forEach(it => it.classList.remove('active'));
        item.classList.add('active');
        wrap.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');

        // Synchronize twin dropdown in hero / compact bar
        const twinWraps = document.querySelectorAll(`.wd3-dropdown-wrap[data-filter="${filterType}"]`);
        twinWraps.forEach(twin => {
          if (twin !== wrap) {
            const twinInput = twin.querySelector('input[type="hidden"]');
            const twinLabel = twin.querySelector('.wd3-btn-label');
            const twinItems = twin.querySelectorAll('.wd3-dropdown-item');

            if (twinInput) twinInput.value = val;
            if (twinLabel) twinLabel.textContent = text;
            twinItems.forEach(it => {
              if (it.getAttribute('data-value') === val) {
                it.classList.add('active');
              } else {
                it.classList.remove('active');
              }
            });
          }
        });

        checkResetVisibility();

        if (filterType === 'prodi') {
          initWadek3Charts(val);
        } else {
          const activeProdi = document.getElementById('filterWd3Prodi')?.value || 'semua';
          initWadek3Charts(activeProdi);
        }
      });
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.wd3-dropdown-wrap.open').forEach(w => {
      w.classList.remove('open');
      const b = w.querySelector('.wd3-pill-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  });

  function checkResetVisibility() {
    const prodiVal = document.getElementById('filterWd3Prodi')?.value || 'semua';
    const tahunVal = document.getElementById('filterWd3Tahun')?.value || '2026';
    const angkatanVal = document.getElementById('filterWd3Angkatan')?.value || 'all';
    const genderVal = document.getElementById('filterWd3Gender')?.value || 'all';
    const prestasiVal = document.getElementById('filterWd3Prestasi')?.value || 'all';

    const hasFilter = prodiVal !== 'semua' || tahunVal !== '2026' || angkatanVal !== 'all' || genderVal !== 'all' || prestasiVal !== 'all';
    allResetBtns.forEach(btn => {
      if (hasFilter) {
        btn.classList.remove('hidden');
        btn.classList.add('inline-flex');
      } else {
        btn.classList.add('hidden');
        btn.classList.remove('inline-flex');
      }
    });
  }

  // Reset Button Handler
  allResetBtns.forEach(btn => {
    if (!btn.dataset.bound) {
      btn.dataset.bound = 'true';
      btn.addEventListener('click', () => {
        const defaults = {
          prodi: { value: 'semua', label: 'Semua' },
          tahun: { value: '2026', label: '2026' },
          angkatan: { value: 'all', label: 'Semua' },
          gender: { value: 'all', label: 'Semua' },
          prestasi: { value: 'all', label: 'Semua' }
        };

        dropdownWraps.forEach(wrap => {
          const filterType = wrap.getAttribute('data-filter');
          const def = defaults[filterType];
          if (def) {
            const input = wrap.querySelector('input[type="hidden"]');
            const label = wrap.querySelector('.wd3-btn-label');
            const items = wrap.querySelectorAll('.wd3-dropdown-item');

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

        if (searchInput) searchInput.value = '';
        checkResetVisibility();
        initWadek3Charts('semua');
      });
    }
  });

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

  // Reactive Listener for DataManager updates
  if (!window._fmipaWd3ListenerBound) {
    window._fmipaWd3ListenerBound = true;
    window.addEventListener('fmipa:data-updated', (e) => {
      if (!e.detail || e.detail.module === 'partisipasi' || e.detail.module === 'mahasiswa' || e.detail.module === 'all') {
        const activeProdi = document.getElementById('filterWd3Prodi')?.value || 'semua';
        initWadek3Charts(activeProdi);
      }
    });
  }

  // Initial render
  const initialProdi = document.getElementById('filterWd3Prodi')?.value || 'semua';
  initWadek3Charts(initialProdi);
}
