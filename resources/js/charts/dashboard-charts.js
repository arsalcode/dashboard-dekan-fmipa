/**
 * Dashboard Charts & Interactive Dynamic Data Integration
 * FMIPA Universitas Pakuan - Harmonisasi Palet Ungu Executive
 * Primary: #722F99 (Ungu Unpak) | Accent: #F59E0B (Gold) | Status: #10B981 (Emerald) | Info: #0284C7 (Sky Blue)
 * 
 * Dinamis 100%: Menampilkan data kosong secara default.
 * Begitu berkas diupload atau diinput manual, grafik dan metrik seketika terisi otomatis.
 */

import { DataManager } from '../modules/data-manager';

// Helper: Memfilter kesesuaian Program Studi
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

// Helper: Toggle Overlay Kosong vs Canvas Grafik
function toggleOverlay(canvasId, isEmpty) {
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

// Helper: Update teks elemen dengan aman
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

export function initDashboardCharts(prodiKey = 'semua') {
  if (typeof window.Chart === 'undefined') return;
  const Chart = window.Chart;

  // 1. Bersihkan instance chart yang sedang aktif
  const allChartIds = [
    'chartStatusDosen', 'chartJabatanDosen', 'chartSertifikasiDosen',
    'chartStatusMahasiswa', 'chartIpkMahasiswa', 'chartKorelasiIpkSks',
    'chartProposalProdi', 'chartPublikasiDosen',
    'chartPartnershipGrowth', 'chartPartnershipStatus',
    'chartTrenPartisipasi', 'chartTipeEvent'
  ];

  allChartIds.forEach(id => {
    const existing = Chart.getChart(id);
    if (existing) existing.destroy();
  });

  // ==========================================
  // SEKSI 1: SDM DOSEN
  // ==========================================
  const rawDosen = DataManager.getPersistedData('dosen') || [];
  const dosenList = rawDosen.filter(d => matchProdi(d.prodi, prodiKey));

  if (dosenList.length === 0) {
    toggleOverlay('chartStatusDosen', true);
    toggleOverlay('chartJabatanDosen', true);
    toggleOverlay('chartSertifikasiDosen', true);

    setText('valTotalDosen', '0');
    setText('valDosenAktif', '0');
    setText('subTotalDosen', 'Tetap: 0 | Kontrak: 0');
    setText('subDosenAktif', 'Keaktifan: 0.0%');
  } else {
    toggleOverlay('chartStatusDosen', false);
    toggleOverlay('chartJabatanDosen', false);
    toggleOverlay('chartSertifikasiDosen', false);

    const totalDosen = dosenList.length;
    const dosenAktif = dosenList.filter(d => (d.status || '').toLowerCase() === 'aktif').length;
    const dosenCuti = dosenList.filter(d => (d.status || '').toLowerCase() === 'cuti').length;
    const dosenTugas = dosenList.filter(d => (d.status || '').toLowerCase().includes('tugas')).length;
    const dosenPensiun = dosenList.filter(d => (d.status || '').toLowerCase() === 'pensiun').length;
    const dosenLainnya = Math.max(0, totalDosen - dosenAktif - dosenCuti - dosenPensiun);

    const dosenTetap = dosenList.filter(d => (d.kategori || '').toLowerCase() === 'homebase').length;
    const dosenKontrak = Math.max(0, totalDosen - dosenTetap);
    const persenAktif = totalDosen > 0 ? ((dosenAktif / totalDosen) * 100).toFixed(1) : '0.0';

    setText('valTotalDosen', totalDosen.toString());
    setText('valDosenAktif', dosenAktif.toString());
    setText('subTotalDosen', `Tetap: ${dosenTetap} | Kontrak: ${dosenKontrak}`);
    setText('subDosenAktif', `Keaktifan: ${persenAktif}%`);

    // Chart 1: Status Dosen (Doughnut)
    const ctxStatus = document.getElementById('chartStatusDosen');
    if (ctxStatus) {
      new Chart(ctxStatus, {
        type: 'doughnut',
        data: {
          labels: [`Aktif (${dosenAktif})`, `Cuti (${dosenCuti})`, `Lainnya (${dosenLainnya + dosenPensiun})`],
          datasets: [{
            data: [dosenAktif, dosenCuti, dosenLainnya + dosenPensiun],
            backgroundColor: ['#0D9488', '#F59E0B', '#F43F5E'],
            borderWidth: 2,
            borderColor: '#ffffff',
            cutout: '65%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 10, padding: 12, font: { size: 11, weight: '500' } } }
          }
        }
      });
    }

    // Chart 2: Jabatan Dosen (Doughnut)
    const jabCounts = { 'Guru Besar': 0, 'Lektor Kepala': 0, 'Lektor': 0, 'Asisten Ahli': 0, 'Tenaga Pengajar': 0 };
    dosenList.forEach(d => {
      const j = (d.jabatan || '').trim();
      if (j.includes('Guru Besar')) jabCounts['Guru Besar']++;
      else if (j.includes('Kepala')) jabCounts['Lektor Kepala']++;
      else if (j.includes('Lektor')) jabCounts['Lektor']++;
      else if (j.includes('Asisten')) jabCounts['Asisten Ahli']++;
      else jabCounts['Tenaga Pengajar']++;
    });

    const ctxJabatan = document.getElementById('chartJabatanDosen');
    if (ctxJabatan) {
      new Chart(ctxJabatan, {
        type: 'doughnut',
        data: {
          labels: [
            `Guru Besar (${jabCounts['Guru Besar']})`,
            `Lektor Kepala (${jabCounts['Lektor Kepala']})`,
            `Lektor (${jabCounts['Lektor']})`,
            `Asisten Ahli (${jabCounts['Asisten Ahli']})`,
            `Tenaga Pengajar (${jabCounts['Tenaga Pengajar']})`
          ],
          datasets: [{
            data: [
              jabCounts['Guru Besar'],
              jabCounts['Lektor Kepala'],
              jabCounts['Lektor'],
              jabCounts['Asisten Ahli'],
              jabCounts['Tenaga Pengajar']
            ],
            backgroundColor: ['#4A154B', '#722F99', '#A855F7', '#6366F1', '#CBD5E1'],
            borderWidth: 2,
            borderColor: '#ffffff',
            cutout: '65%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, padding: 8, font: { size: 10, weight: '500' } } }
          }
        }
      });
    }

    // Chart 3: Sertifikasi Dosen (Doughnut)
    const sertifSudah = dosenList.filter(d => (d.sertif || '').toLowerCase().includes('bersertifikat') && !(d.sertif || '').toLowerCase().includes('belum')).length;
    const sertifBelum = Math.max(0, totalDosen - sertifSudah);

    const ctxSertif = document.getElementById('chartSertifikasiDosen');
    if (ctxSertif) {
      new Chart(ctxSertif, {
        type: 'doughnut',
        data: {
          labels: [`Sudah Sertifikasi (${sertifSudah})`, `Belum Sertifikasi (${sertifBelum})`],
          datasets: [{
            data: [sertifSudah, sertifBelum],
            backgroundColor: ['#722F99', '#E2E8F0'],
            borderWidth: 2,
            borderColor: '#ffffff',
            cutout: '65%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 10, padding: 12, font: { size: 11, weight: '500' } } }
          }
        }
      });
    }
  }

  // ==========================================
  // SEKSI 2: SDM MAHASISWA
  // ==========================================
  const rawMhs = DataManager.getPersistedData('mahasiswa') || [];
  const mhsList = rawMhs.filter(m => matchProdi(m.prodi, prodiKey));

  if (mhsList.length === 0) {
    toggleOverlay('chartStatusMahasiswa', true);
    toggleOverlay('chartIpkMahasiswa', true);
    toggleOverlay('chartKorelasiIpkSks', true);

    setText('valTotalMahasiswa', '0');
    setText('subTotalMahasiswa', 'Aktif: 0');
    setText('valIpkRataRata', '0.00');
    setText('valKelulusanTepatWaktu', '0%');
    setText('subKelulusanTepatWaktu', 'Belum ada data');
    setText('valTingkatRetensi', '0%');
    setText('subTingkatRetensi', 'Belum ada data');
  } else {
    toggleOverlay('chartStatusMahasiswa', false);
    toggleOverlay('chartIpkMahasiswa', false);
    toggleOverlay('chartKorelasiIpkSks', false);

    const totalMhs = mhsList.length;
    const mhsAktif = mhsList.filter(m => (m.status || '').toLowerCase() === 'aktif').length;
    const mhsCuti = mhsList.filter(m => (m.status || '').toLowerCase() === 'cuti').length;
    const mhsLulus = mhsList.filter(m => (m.status || '').toLowerCase() === 'lulus').length;
    const mhsKeluar = mhsList.filter(m => (m.status || '').toLowerCase().includes('keluar') || (m.status || '').toLowerCase().includes('do')).length;
    const mhsLainnya = Math.max(0, totalMhs - mhsAktif - mhsCuti - mhsLulus - mhsKeluar);

    const ipkValues = mhsList.map(m => parseFloat(m.ipk) || 0).filter(n => n > 0);
    const avgIpk = ipkValues.length > 0 ? (ipkValues.reduce((a, b) => a + b, 0) / ipkValues.length).toFixed(2) : '0.00';
    const pctTepat = totalMhs > 0 ? ((mhsLulus / totalMhs) * 100).toFixed(0) : '0';
    const pctRetensi = totalMhs > 0 ? ((mhsAktif / totalMhs) * 100).toFixed(0) : '0';

    setText('valTotalMahasiswa', totalMhs.toLocaleString('id-ID'));
    setText('subTotalMahasiswa', `Aktif: ${mhsAktif.toLocaleString('id-ID')}`);
    setText('valIpkRataRata', avgIpk);
    setText('valKelulusanTepatWaktu', `${pctTepat}%`);
    setText('subKelulusanTepatWaktu', `${mhsLulus} dari ${totalMhs} lulus`);
    setText('valTingkatRetensi', `${pctRetensi}%`);
    setText('subTingkatRetensi', `${mhsAktif} mahasiswa aktif`);

    // Chart 4: Status Mahasiswa (Doughnut)
    const ctxStatusMhs = document.getElementById('chartStatusMahasiswa');
    if (ctxStatusMhs) {
      new Chart(ctxStatusMhs, {
        type: 'doughnut',
        data: {
          labels: [`Aktif (${mhsAktif})`, `Cuti (${mhsCuti})`, `Lainnya (${mhsKeluar + mhsLainnya})`],
          datasets: [{
            data: [mhsAktif, mhsCuti, mhsKeluar + mhsLainnya],
            backgroundColor: ['#0D9488', '#F59E0B', '#F43F5E'],
            borderWidth: 2,
            borderColor: '#ffffff',
            cutout: '65%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 10, padding: 12, font: { size: 11, weight: '500' } } }
          }
        }
      });
    }

    // Chart 5: Sebaran IPK (Bar)
    const ipkBuckets = [0, 0, 0, 0, 0]; // < 2.00, 2.00-2.50, 2.51-3.00, 3.01-3.50, 3.51-4.00
    mhsList.forEach(m => {
      const val = parseFloat(m.ipk) || 0;
      if (val < 2.00) ipkBuckets[0]++;
      else if (val <= 2.50) ipkBuckets[1]++;
      else if (val <= 3.00) ipkBuckets[2]++;
      else if (val <= 3.50) ipkBuckets[3]++;
      else ipkBuckets[4]++;
    });

    const ctxIpk = document.getElementById('chartIpkMahasiswa');
    if (ctxIpk) {
      new Chart(ctxIpk, {
        type: 'bar',
        data: {
          labels: ['< 2.00', '2.00 - 2.50', '2.51 - 3.00', '3.01 - 3.50', '3.51 - 4.00'],
          datasets: [{
            data: ipkBuckets,
            backgroundColor: ['#DDD6FE', '#C084FC', '#A855F7', '#9333EA', '#722F99'],
            hoverBackgroundColor: ['#C4B5FD', '#A855F7', '#9333EA', '#7E22CE', '#581C87'],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 } } },
            y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 } } }
          }
        }
      });
    }

    // Chart 6: Korelasi IPK & SKS (Scatter)
    const scatterAktif = [];
    const scatterCuti = [];
    const scatterLain = [];

    mhsList.forEach(m => {
      const sks = parseFloat(m.sks) || 0;
      const sksPct = Math.min(100, Math.round((sks / 144) * 100));
      const ipk = parseFloat(m.ipk) || 0;
      const st = (m.status || '').toLowerCase();
      if (st === 'aktif') scatterAktif.push({ x: sksPct, y: ipk });
      else if (st === 'cuti') scatterCuti.push({ x: sksPct, y: ipk });
      else scatterLain.push({ x: sksPct, y: ipk });
    });

    const ctxKorelasi = document.getElementById('chartKorelasiIpkSks');
    if (ctxKorelasi) {
      new Chart(ctxKorelasi, {
        type: 'scatter',
        data: {
          datasets: [
            { label: 'Aktif', data: scatterAktif, backgroundColor: '#0D9488', pointRadius: 4 },
            { label: 'Cuti', data: scatterCuti, backgroundColor: '#F59E0B', pointRadius: 4 },
            { label: 'Lainnya', data: scatterLain, backgroundColor: '#F43F5E', pointRadius: 4 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { min: 0, max: 100, title: { display: true, text: 'Penyelesaian SKS (%)', font: { size: 10 } } },
            y: { min: 0, max: 4.0, title: { display: true, text: 'IPK', font: { size: 10 } } }
          }
        }
      });
    }
  }

  // ==========================================
  // SEKSI 3: PENELITIAN & PUBLIKASI
  // ==========================================
  const rawPenelitian = DataManager.getPersistedData('penelitian') || [];
  const penelitianList = rawPenelitian.filter(p => matchProdi(p.prodi, prodiKey));

  if (penelitianList.length === 0) {
    toggleOverlay('chartProposalProdi', true);
    toggleOverlay('chartPublikasiDosen', true);

    setText('valTotalPenelitian', '0');
    setText('subTotalPenelitian', 'Belum ada data');
    setText('valPublikasiTahunIni', '0');
    setText('subPublikasiTahunIni', 'Belum ada data');
  } else {
    toggleOverlay('chartProposalProdi', false);
    toggleOverlay('chartPublikasiDosen', false);

    const totalPenelitian = penelitianList.length;
    const selesaiCount = penelitianList.filter(p => (p.status || '').toLowerCase() === 'selesai').length;
    const currentYear = new Date().getFullYear();
    const publikasiTerkini = penelitianList.filter(p => parseInt(p.tahun) >= currentYear - 1).length;

    setText('valTotalPenelitian', totalPenelitian.toString());
    setText('subTotalPenelitian', `${selesaiCount} Riset Selesai`);
    setText('valPublikasiTahunIni', publikasiTerkini.toString());
    setText('subPublikasiTahunIni', `Tahun ${currentYear}`);

    // Skema Hibah bar
    const skemaDikti = penelitianList.filter(p => (p.skema || '').toLowerCase().includes('kemendikbud') || (p.skema || '').toLowerCase().includes('dikti')).length;
    const skemaInternal = penelitianList.filter(p => (p.skema || '').toLowerCase().includes('internal')).length;
    const skemaMandiri = Math.max(0, totalPenelitian - skemaDikti - skemaInternal);

    const ctxProposal = document.getElementById('chartProposalProdi');
    if (ctxProposal) {
      new Chart(ctxProposal, {
        type: 'bar',
        data: {
          labels: ['Kemendikbud / DIKTI', 'Internal UNPAK', 'Mandiri / Kemitraan'],
          datasets: [{
            data: [skemaDikti, skemaInternal, skemaMandiri],
            backgroundColor: ['#722F99', '#0284C7', '#0D9488'],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }

    // Publikasi bar (Scopus vs Sinta)
    const scopusCount = penelitianList.filter(p => (p.output || '').toLowerCase().includes('scopus')).length;
    const sintaCount = penelitianList.filter(p => (p.output || '').toLowerCase().includes('sinta')).length;
    const patenCount = Math.max(0, totalPenelitian - scopusCount - sintaCount);

    const ctxPublikasi = document.getElementById('chartPublikasiDosen');
    if (ctxPublikasi) {
      new Chart(ctxPublikasi, {
        type: 'bar',
        data: {
          labels: ['Terindeks Scopus', 'Terakreditasi Sinta', 'Paten / HKI / Lainnya'],
          datasets: [{
            data: [scopusCount, sintaCount, patenCount],
            backgroundColor: ['#0284C7', '#722F99', '#F59E0B'],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }
  }

  // ==========================================
  // SEKSI 4: KERJASAMA & PARTNERSHIP
  // ==========================================
  const rawKerjasama = DataManager.getPersistedData('kerjasama') || [];
  const kerjasamaList = rawKerjasama.filter(k => matchProdi(k.pic, prodiKey));

  if (kerjasamaList.length === 0) {
    toggleOverlay('chartPartnershipGrowth', true);
    toggleOverlay('chartPartnershipStatus', true);

    setText('valTotalKerjasama', '0');
    setText('subTotalKerjasama', 'Belum ada data');
  } else {
    toggleOverlay('chartPartnershipGrowth', false);
    toggleOverlay('chartPartnershipStatus', false);

    const totalKerjasama = kerjasamaList.length;
    const aktifKerjasama = kerjasamaList.filter(k => (k.status || '').toLowerCase() === 'aktif').length;
    const expiredKerjasama = kerjasamaList.filter(k => (k.status || '').toLowerCase().includes('akhir') || (k.status || '').toLowerCase() === 'kadaluarsa').length;

    setText('valTotalKerjasama', totalKerjasama.toString());
    setText('subTotalKerjasama', `${aktifKerjasama} Mitra Aktif`);

    // Growth Timeline (Aggregated by start year)
    const years = ['2021', '2022', '2023', '2024', '2025', '2026'];
    const nasSeries = [0, 0, 0, 0, 0, 0];
    const interSeries = [0, 0, 0, 0, 0, 0];

    kerjasamaList.forEach(k => {
      const yStr = (k.tgl_mulai || '').substring(0, 4);
      const yIdx = years.indexOf(yStr);
      const isInter = (k.tingkat || '').toLowerCase().includes('internasional');
      if (yIdx !== -1) {
        if (isInter) interSeries[yIdx]++;
        else nasSeries[yIdx]++;
      } else {
        // Default ke tahun terkini jika tanggal tidak standar
        if (isInter) interSeries[5]++;
        else nasSeries[5]++;
      }
    });

    const totalSeries = years.map((_, i) => nasSeries[i] + interSeries[i]);

    const ctxGrowth = document.getElementById('chartPartnershipGrowth');
    if (ctxGrowth) {
      new Chart(ctxGrowth, {
        type: 'line',
        data: {
          labels: years,
          datasets: [
            { label: 'Nasional', data: nasSeries, borderColor: '#722F99', backgroundColor: '#722F99', tension: 0.3 },
            { label: 'Internasional', data: interSeries, borderColor: '#0284C7', backgroundColor: '#0284C7', tension: 0.3 },
            { label: 'Total', data: totalSeries, borderColor: '#0D9488', backgroundColor: '#0D9488', borderDash: [5, 5], tension: 0.3 }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
      });
    }

    // Status Kerjasama Doughnut
    const ctxPartnershipStatus = document.getElementById('chartPartnershipStatus');
    if (ctxPartnershipStatus) {
      new Chart(ctxPartnershipStatus, {
        type: 'doughnut',
        data: {
          labels: [`Active (${aktifKerjasama})`, `Will Expire / Expired (${expiredKerjasama})`],
          datasets: [{
            data: [aktifKerjasama, expiredKerjasama],
            backgroundColor: ['#0D9488', '#A855F7'],
            cutout: '65%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 10, padding: 12 } } }
        }
      });
    }
  }

  // ==========================================
  // SEKSI 5: KEMAHASISWAAN & PRESTASI
  // ==========================================
  const rawPartisipasi = DataManager.getPersistedData('partisipasi') || [];
  const partisipasiList = rawPartisipasi.filter(pt => matchProdi(pt.prodi, prodiKey));

  if (partisipasiList.length === 0) {
    toggleOverlay('chartTrenPartisipasi', true);
    toggleOverlay('chartTipeEvent', true);

    setText('valTotalPartisipasi', '0');
    setText('subTotalPartisipasi', 'Belum ada data');
    setText('valMahasiswaBeasiswa', '0');
    setText('subMahasiswaBeasiswa', 'Belum ada data');
    setText('valPrestasiMahasiswa', '0');
    setText('subPrestasiMahasiswa', 'Belum ada data');
  } else {
    toggleOverlay('chartTrenPartisipasi', false);
    toggleOverlay('chartTipeEvent', false);

    const totalPartisipasi = partisipasiList.length;
    const mhsPartisipan = partisipasiList.filter(pt => (pt.kategori_peserta || '').toLowerCase() === 'mahasiswa').length;
    const prestasiCount = partisipasiList.filter(pt => pt.prestasi && pt.prestasi.trim() !== '-' && !pt.prestasi.toLowerCase().includes('belum')).length;

    setText('valTotalPartisipasi', totalPartisipasi.toString());
    setText('subTotalPartisipasi', `${mhsPartisipan} Mahasiswa`);
    setText('valMahasiswaBeasiswa', (mhsList.filter(m => (m.jalur_masuk || '').toLowerCase().includes('beasiswa')).length || 0).toString());
    setText('subMahasiswaBeasiswa', 'Penerima Beasiswa');
    setText('valPrestasiMahasiswa', prestasiCount.toString());
    setText('subPrestasiMahasiswa', 'Capaian Prestasi Terdata');

    // Partisipasi per tahun
    const yearsPart = ['2021', '2022', '2023', '2024', '2025', '2026'];
    const partMhs = [0, 0, 0, 0, 0, 0];
    const partDosen = [0, 0, 0, 0, 0, 0];

    partisipasiList.forEach(pt => {
      const yIdx = yearsPart.indexOf((pt.tahun || '').toString());
      const isMhs = (pt.kategori_peserta || '').toLowerCase() === 'mahasiswa';
      if (yIdx !== -1) {
        if (isMhs) partMhs[yIdx]++;
        else partDosen[yIdx]++;
      } else {
        if (isMhs) partMhs[5]++;
        else partDosen[5]++;
      }
    });

    const totalPart = yearsPart.map((_, i) => partMhs[i] + partDosen[i]);

    const ctxTren = document.getElementById('chartTrenPartisipasi');
    if (ctxTren) {
      new Chart(ctxTren, {
        type: 'line',
        data: {
          labels: yearsPart,
          datasets: [
            { label: 'Mahasiswa', data: partMhs, borderColor: '#0284C7', backgroundColor: '#0284C7', tension: 0.3 },
            { label: 'Dosen', data: partDosen, borderColor: '#0D9488', backgroundColor: '#0D9488', tension: 0.3 },
            { label: 'Total Partisipan', data: totalPart, borderColor: '#722F99', backgroundColor: '#722F99', borderDash: [4, 4], tension: 0.3 }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
      });
    }

    // Tipe Event Doughnut
    let catAkademik = 0, catSeniOlahraga = 0, catWirausaha = 0, catSosial = 0;
    partisipasiList.forEach(pt => {
      const keg = (pt.kegiatan || '').toLowerCase();
      if (keg.includes('onmipa') || keg.includes('olimpiade') || keg.includes('sains') || keg.includes('seminar') || keg.includes('konferensi')) catAkademik++;
      else if (keg.includes('olahraga') || keg.includes('seni') || keg.includes('peksiminas') || keg.includes('pomnas')) catSeniOlahraga++;
      else if (keg.includes('bisnis') || keg.includes('wirausaha') || keg.includes('p2mw')) catWirausaha++;
      else catSosial++;
    });

    const ctxTipeEvent = document.getElementById('chartTipeEvent');
    if (ctxTipeEvent) {
      new Chart(ctxTipeEvent, {
        type: 'doughnut',
        data: {
          labels: [
            `Akademik & Sains (${catAkademik})`,
            `Olahraga & Seni (${catSeniOlahraga})`,
            `Kewirausahaan (${catWirausaha})`,
            `Sosial & Lainnya (${catSosial})`
          ],
          datasets: [{
            data: [catAkademik, catSeniOlahraga, catWirausaha, catSosial],
            backgroundColor: ['#722F99', '#6366F1', '#0284C7', '#0D9488'],
            cutout: '65%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 10, padding: 10 } } }
        }
      });
    }
  }
}

// Global active prodi tracker
let currentActiveProdi = 'semua';

export function initFilterTabs() {
  const tabs = document.querySelectorAll('#heroTrack .filter-tab');
  const heroBanner = document.getElementById('executiveHeroBanner');
  const compactBar = document.getElementById('compactStickyBar');
  const scrollContainer = document.querySelector('main');
  const heroTrack = document.getElementById('heroTrack');

  // Dropdown elements
  const dropdownBtn = document.getElementById('compactProdiBtn');
  const dropdownMenu = document.getElementById('compactProdiMenu');
  const dropdownText = document.getElementById('compactSelectedProdiText');
  const dropdownChevron = document.getElementById('compactChevron');
  const dropdownItems = document.querySelectorAll('.compact-dropdown-item');

  const prodiLabels = {
    'semua': 'Semua',
    'biologi': 'Biologi',
    'kimia': 'Kimia',
    'matematika': 'Matematika',
    'ilmu-komputer': 'Ilmu Komputer',
    'farmasi': 'Farmasi',
    'ppa': 'Profesi Apoteker'
  };

  // Mouse wheel horizontal scrolling for hero track
  if (heroTrack) {
    heroTrack.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        heroTrack.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }

  // Central function to set active prodi across both Hero Tabs and Compact Dropdown
  const setActiveProdi = (prodiKey) => {
    currentActiveProdi = prodiKey;

    // 1. Update hero tabs
    tabs.forEach(t => {
      if (t.getAttribute('data-prodi') === prodiKey) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    // 2. Update dropdown text & is-active class
    if (dropdownText) {
      dropdownText.textContent = prodiLabels[prodiKey] || 'Semua';
    }
    dropdownItems.forEach(item => {
      const isMatch = item.getAttribute('data-prodi') === prodiKey;
      if (isMatch) {
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });

    // 3. Update reset buttons visibility
    checkResetState(prodiKey);

    // 4. Re-render charts
    initDashboardCharts(prodiKey);
  };

  // Reset Button Logic
  const btnReset = document.getElementById('btnResetDashboardFilters');
  const btnResetCompact = document.getElementById('btnResetCompactDashboardFilters');
  const allResetBtns = [btnReset, btnResetCompact].filter(Boolean);

  const checkResetState = (prodiKey) => {
    const isFiltered = prodiKey !== 'semua';
    allResetBtns.forEach(btn => {
      btn.classList.toggle('hidden', !isFiltered);
    });
  };

  allResetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setActiveProdi('semua');
    });
  });

  // Listen to Hero Tab clicks
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const prodiKey = tab.getAttribute('data-prodi') || 'semua';
      setActiveProdi(prodiKey);
    });
  });

  // Dropdown toggle logic
  if (dropdownBtn && dropdownMenu) {
    const toggleDropdown = (open) => {
      const isOpen = open !== undefined ? open : dropdownMenu.classList.contains('hidden');
      if (isOpen) {
        dropdownMenu.classList.remove('hidden');
        if (dropdownChevron) dropdownChevron.style.transform = 'rotate(180deg)';
        dropdownBtn.classList.add('is-open');
      } else {
        dropdownMenu.classList.add('hidden');
        if (dropdownChevron) dropdownChevron.style.transform = 'rotate(0deg)';
        dropdownBtn.classList.remove('is-open');
      }
    };

    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown();
    });

    dropdownItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const prodiKey = item.getAttribute('data-prodi') || 'semua';
        setActiveProdi(prodiKey);
        toggleDropdown(false);
      });
    });

    document.addEventListener('click', (e) => {
      if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        toggleDropdown(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggleDropdown(false);
      }
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
  if (!window._fmipaDashboardChartReactiveBound) {
    window._fmipaDashboardChartReactiveBound = true;
    window.addEventListener('fmipa:data-updated', () => {
      initDashboardCharts(currentActiveProdi);
    });
  }
}
