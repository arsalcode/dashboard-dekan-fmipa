// ============================================
// SIDEBAR INTERACTIONS - FMIPA Universitas Pakuan
// TEMA UNGU - ACTIVE PUTIH
// ============================================

(function() {
  'use strict';

  // --- SIDEBAR TOGGLE ---
  function initSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const toggleMobileBtn = document.getElementById('sidebarToggleMobile');

    // Buat overlay
    let overlay = document.getElementById('sidebarOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'sidebar-overlay';
      overlay.id = 'sidebarOverlay';
      document.body.appendChild(overlay);
    }

    function openSidebar() {
      if (sidebar) {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeSidebar() {
      if (sidebar) {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
      }
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', openSidebar);
    }

    if (toggleMobileBtn) {
      toggleMobileBtn.addEventListener('click', closeSidebar);
    }

    overlay.addEventListener('click', closeSidebar);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSidebar();
    });

    // Close on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        closeSidebar();
      }
    });

    // Store functions
    window.__sidebar = { openSidebar, closeSidebar };
  }

  // --- DASHBOARD SECTIONS LOADER ---
  async function loadDashboardSections() {
    const container = document.getElementById('dashboardSections');
    if (!container) return;

    const files = [
      'dashboard/sdm_dosen.html',
      'dashboard/sdm_mahasiswa.html',
      'dashboard/penelitian_publikasi.html',
      'dashboard/keuangan_administrasi.html',
      'dashboard/media_sosial.html',
      'dashboard/kerjasama_partnership.html',
      'dashboard/kemahasiswaan.html'
    ];

    try {
      const htmls = await Promise.all(files.map(f => fetch(f).then(r => r.text())));
      container.innerHTML = htmls.join('\n');
      initDashboardCharts();
    } catch (e) {
      console.error('Error loading dashboard sections:', e);
    }
  }

  // --- DASHBOARD DATA DICTIONARY ---
  const dashboardData = {
    'semua': {
      statusDosen: { labels: ['Aktif (142)', 'Cuti (8)', 'Pensiun (6)'], data: [142, 8, 6], colors: ['#3D818A', '#E5D026', '#ef4444'] },
      jabatanDosen: { labels: ['Asisten Ahli (54)', 'Guru Besar (2)', 'Lektor (53)', 'Lektor Kepala (45)'], data: [54, 2, 53, 45] },
      sertifikasiDosen: { labels: ['Belum Sertifikasi (189)', 'Sudah Sertifikasi (12)'], data: [189, 12] },
      statusMhs: { labels: ['Aktif (1.245)', 'Cuti (78)', 'Tidak Aktif (47)'], data: [1245, 78, 47] },
      ipkMhs: { labels: ['< 2.00', '2.00 - 2.50', '2.51 - 3.00', '3.01 - 3.50', '3.51 - 4.00'], data: [18, 65, 310, 680, 297] },
      korelasiMhs: {
        aktif: [
          { x: 15, y: 3.2 }, { x: 25, y: 3.4 }, { x: 35, y: 3.1 }, { x: 45, y: 3.6 },
          { x: 55, y: 3.5 }, { x: 65, y: 3.7 }, { x: 75, y: 3.3 }, { x: 80, y: 3.8 },
          { x: 88, y: 3.65 }, { x: 92, y: 3.9 }, { x: 96, y: 3.75 }, { x: 100, y: 3.85 }
        ],
        cuti: [{ x: 30, y: 2.7 }, { x: 48, y: 2.85 }, { x: 60, y: 2.6 }],
        tidakAktif: [{ x: 12, y: 2.1 }, { x: 22, y: 1.9 }, { x: 38, y: 2.3 }]
      },
      isMultiProdi: true,
      proposal: {
        labels: ['Biologi', 'Kimia', 'Matematika', 'Ilmu Komputer', 'Farmasi', 'PPA'],
        datasets: [
          { label: 'DIKTI', data: [8, 12, 6, 16, 14, 5], backgroundColor: '#0D0B61', borderRadius: 4, maxBarThickness: 16 },
          { label: 'Internal', data: [14, 10, 8, 18, 15, 7], backgroundColor: '#3D818A', borderRadius: 4, maxBarThickness: 16 },
          { label: 'Mandiri', data: [6, 8, 4, 12, 10, 4], backgroundColor: '#E5D026', borderRadius: 4, maxBarThickness: 16 }
        ]
      },
      publikasi: {
        labels: ['Biologi', 'Kimia', 'Matematika', 'Ilmu Komputer', 'Farmasi', 'PPA'],
        datasets: [
          { label: 'Terakreditasi Sinta', data: [20, 24, 14, 32, 28, 10], backgroundColor: '#3D818A', borderRadius: 4, maxBarThickness: 20 },
          { label: 'Terindeks Scopus', data: [10, 14, 7, 18, 15, 8], backgroundColor: '#E5D026', borderRadius: 4, maxBarThickness: 20 }
        ]
      },
      partnershipGrowth: {
        nasional: [12, 16, 20, 25, 29, 34, 38],
        internasional: [2, 3, 4, 6, 7, 9, 10],
        total: [14, 19, 24, 31, 36, 43, 48]
      },
      partnershipStatus: { labels: ['Active (42)', 'Will Expire (6)'], data: [42, 6] },
      kemahasiswaanTren: {
        mhs: [85, 110, 140, 195, 230, 280, 324],
        dosen: [25, 30, 42, 55, 68, 75, 88],
        total: [110, 140, 182, 250, 298, 355, 412]
      },
      tipeEvent: { labels: ['Akademik & Sains (142)', 'Olahraga & Seni (98)', 'Kewirausahaan (48)', 'Sosial & Pengabdian (36)'], data: [142, 98, 48, 36] }
    },
    'biologi': {
      statusDosen: { labels: ['Aktif (18)', 'Cuti (8)', 'Pensiun (7)'], data: [18, 8, 7], colors: ['#3D818A', '#E5D026', '#ef4444'] },
      jabatanDosen: { labels: ['Asisten Ahli (8)', 'Guru Besar (1)', 'Lektor (12)', 'Lektor Kepala (12)'], data: [8, 1, 12, 12] },
      sertifikasiDosen: { labels: ['Belum Sertifikasi (13)', 'Sudah Sertifikasi (20)'], data: [13, 20] },
      statusMhs: { labels: ['Aktif (215)', 'Cuti (12)', 'Tidak Aktif (8)'], data: [215, 12, 8] },
      ipkMhs: { labels: ['< 2.00', '2.00 - 2.50', '2.51 - 3.00', '3.01 - 3.50', '3.51 - 4.00'], data: [3, 10, 52, 115, 45] },
      korelasiMhs: {
        aktif: [{ x: 20, y: 3.3 }, { x: 40, y: 3.5 }, { x: 60, y: 3.4 }, { x: 80, y: 3.7 }, { x: 95, y: 3.8 }],
        cuti: [{ x: 35, y: 2.7 }, { x: 55, y: 2.8 }],
        tidakAktif: [{ x: 18, y: 2.0 }]
      },
      isMultiProdi: false,
      proposal: {
        labels: ['DIKTI (8)', 'Internal (14)', 'Mandiri (6)'],
        data: [8, 14, 6]
      },
      publikasi: {
        labels: ['Sinta (20)', 'Scopus (10)'],
        data: [20, 10]
      },
      partnershipGrowth: {
        nasional: [2, 3, 3, 4, 5, 5, 6],
        internasional: [0, 0, 1, 1, 1, 1, 1],
        total: [2, 3, 4, 5, 6, 6, 7]
      },
      partnershipStatus: { labels: ['Active (6)', 'Will Expire (1)'], data: [6, 1] },
      kemahasiswaanTren: {
        mhs: [14, 18, 22, 30, 36, 42, 52],
        dosen: [4, 5, 7, 9, 11, 12, 14],
        total: [18, 23, 29, 39, 47, 54, 66]
      },
      tipeEvent: { labels: ['Akademik & Sains (24)', 'Olahraga & Seni (15)', 'Kewirausahaan (8)', 'Sosial (5)'], data: [24, 15, 8, 5] }
    },
    'kimia': {
      statusDosen: { labels: ['Aktif (25)', 'Cuti (2)', 'Pensiun (1)'], data: [25, 2, 1], colors: ['#3D818A', '#E5D026', '#ef4444'] },
      jabatanDosen: { labels: ['Asisten Ahli (7)', 'Guru Besar (1)', 'Lektor (11)', 'Lektor Kepala (9)'], data: [7, 1, 11, 9] },
      sertifikasiDosen: { labels: ['Belum Sertifikasi (9)', 'Sudah Sertifikasi (19)'], data: [9, 19] },
      statusMhs: { labels: ['Aktif (258)', 'Cuti (14)', 'Tidak Aktif (8)'], data: [258, 14, 8] },
      ipkMhs: { labels: ['< 2.00', '2.00 - 2.50', '2.51 - 3.00', '3.01 - 3.50', '3.51 - 4.00'], data: [4, 12, 58, 128, 54] },
      korelasiMhs: {
        aktif: [{ x: 22, y: 3.4 }, { x: 45, y: 3.6 }, { x: 65, y: 3.5 }, { x: 82, y: 3.75 }, { x: 98, y: 3.85 }],
        cuti: [{ x: 38, y: 2.8 }],
        tidakAktif: [{ x: 15, y: 2.1 }]
      },
      isMultiProdi: false,
      proposal: {
        labels: ['DIKTI (12)', 'Internal (10)', 'Mandiri (10)'],
        data: [12, 10, 10]
      },
      publikasi: {
        labels: ['Sinta (24)', 'Scopus (14)'],
        data: [24, 14]
      },
      partnershipGrowth: {
        nasional: [3, 4, 5, 7, 8, 9, 10],
        internasional: [0, 0, 1, 1, 1, 1, 1],
        total: [3, 4, 6, 8, 9, 10, 11]
      },
      partnershipStatus: { labels: ['Active (10)', 'Will Expire (1)'], data: [10, 1] },
      kemahasiswaanTren: {
        mhs: [16, 22, 28, 38, 46, 54, 64],
        dosen: [5, 6, 8, 11, 13, 15, 17],
        total: [21, 28, 36, 49, 59, 69, 81]
      },
      tipeEvent: { labels: ['Akademik & Sains (30)', 'Olahraga & Seni (18)', 'Kewirausahaan (10)', 'Sosial (6)'], data: [30, 18, 10, 6] }
    },
    'matematika': {
      statusDosen: { labels: ['Aktif (20)', 'Cuti (1)', 'Pensiun (1)'], data: [20, 1, 1], colors: ['#3D818A', '#E5D026', '#ef4444'] },
      jabatanDosen: { labels: ['Asisten Ahli (5)', 'Guru Besar (0)', 'Lektor (9)', 'Lektor Kepala (8)'], data: [5, 0, 9, 8] },
      sertifikasiDosen: { labels: ['Belum Sertifikasi (7)', 'Sudah Sertifikasi (15)'], data: [7, 15] },
      statusMhs: { labels: ['Aktif (180)', 'Cuti (9)', 'Tidak Aktif (6)'], data: [180, 9, 6] },
      ipkMhs: { labels: ['< 2.00', '2.00 - 2.50', '2.51 - 3.00', '3.01 - 3.50', '3.51 - 4.00'], data: [3, 9, 48, 108, 38] },
      korelasiMhs: {
        aktif: [{ x: 18, y: 3.3 }, { x: 38, y: 3.4 }, { x: 58, y: 3.5 }, { x: 78, y: 3.65 }, { x: 92, y: 3.8 }],
        cuti: [{ x: 32, y: 2.7 }],
        tidakAktif: [{ x: 14, y: 2.0 }]
      },
      isMultiProdi: false,
      proposal: {
        labels: ['DIKTI (6)', 'Internal (8)', 'Mandiri (4)'],
        data: [6, 8, 4]
      },
      publikasi: {
        labels: ['Sinta (14)', 'Scopus (7)'],
        data: [14, 7]
      },
      partnershipGrowth: {
        nasional: [2, 3, 4, 5, 6, 7, 7],
        internasional: [0, 0, 0, 1, 1, 1, 1],
        total: [2, 3, 4, 6, 7, 8, 8]
      },
      partnershipStatus: { labels: ['Active (7)', 'Will Expire (1)'], data: [7, 1] },
      kemahasiswaanTren: {
        mhs: [12, 16, 20, 27, 34, 40, 48],
        dosen: [3, 4, 6, 8, 10, 11, 13],
        total: [15, 20, 26, 35, 44, 51, 61]
      },
      tipeEvent: { labels: ['Akademik & Sains (22)', 'Olahraga & Seni (14)', 'Kewirausahaan (7)', 'Sosial (5)'], data: [22, 14, 7, 5] }
    },
    'ilmu-komputer': {
      statusDosen: { labels: ['Aktif (35)', 'Cuti (2)', 'Pensiun (1)'], data: [35, 2, 1], colors: ['#3D818A', '#E5D026', '#ef4444'] },
      jabatanDosen: { labels: ['Asisten Ahli (12)', 'Guru Besar (1)', 'Lektor (15)', 'Lektor Kepala (10)'], data: [12, 1, 15, 10] },
      sertifikasiDosen: { labels: ['Belum Sertifikasi (12)', 'Sudah Sertifikasi (26)'], data: [12, 26] },
      statusMhs: { labels: ['Aktif (395)', 'Cuti (16)', 'Tidak Aktif (9)'], data: [395, 16, 9] },
      ipkMhs: { labels: ['< 2.00', '2.00 - 2.50', '2.51 - 3.00', '3.01 - 3.50', '3.51 - 4.00'], data: [4, 14, 66, 148, 66] },
      korelasiMhs: {
        aktif: [{ x: 25, y: 3.5 }, { x: 50, y: 3.65 }, { x: 72, y: 3.7 }, { x: 88, y: 3.85 }, { x: 99, y: 3.92 }],
        cuti: [{ x: 42, y: 2.85 }],
        tidakAktif: [{ x: 16, y: 2.2 }]
      },
      isMultiProdi: false,
      proposal: {
        labels: ['DIKTI (16)', 'Internal (18)', 'Mandiri (12)'],
        data: [16, 18, 12]
      },
      publikasi: {
        labels: ['Sinta (32)', 'Scopus (18)'],
        data: [32, 18]
      },
      partnershipGrowth: {
        nasional: [4, 6, 8, 10, 11, 13, 14],
        internasional: [1, 1, 1, 2, 2, 2, 2],
        total: [5, 7, 9, 12, 13, 15, 16]
      },
      partnershipStatus: { labels: ['Active (14)', 'Will Expire (2)'], data: [14, 2] },
      kemahasiswaanTren: {
        mhs: [25, 36, 48, 65, 78, 94, 112],
        dosen: [8, 10, 14, 18, 22, 25, 29],
        total: [33, 46, 62, 83, 100, 119, 141]
      },
      tipeEvent: { labels: ['Akademik & Sains (52)', 'Olahraga & Seni (30)', 'Kewirausahaan (18)', 'Sosial (12)'], data: [52, 30, 18, 12] }
    },
    'farmasi': {
      statusDosen: { labels: ['Aktif (32)', 'Cuti (2)', 'Pensiun (1)'], data: [32, 2, 1], colors: ['#3D818A', '#E5D026', '#ef4444'] },
      jabatanDosen: { labels: ['Asisten Ahli (10)', 'Guru Besar (1)', 'Lektor (14)', 'Lektor Kepala (10)'], data: [10, 1, 14, 10] },
      sertifikasiDosen: { labels: ['Belum Sertifikasi (11)', 'Sudah Sertifikasi (24)'], data: [11, 24] },
      statusMhs: { labels: ['Aktif (355)', 'Cuti (15)', 'Tidak Aktif (10)'], data: [355, 15, 10] },
      ipkMhs: { labels: ['< 2.00', '2.00 - 2.50', '2.51 - 3.00', '3.01 - 3.50', '3.51 - 4.00'], data: [3, 11, 55, 124, 52] },
      korelasiMhs: {
        aktif: [{ x: 20, y: 3.4 }, { x: 44, y: 3.55 }, { x: 68, y: 3.6 }, { x: 85, y: 3.78 }, { x: 96, y: 3.88 }],
        cuti: [{ x: 36, y: 2.8 }],
        tidakAktif: [{ x: 15, y: 2.15 }]
      },
      isMultiProdi: false,
      proposal: {
        labels: ['DIKTI (14)', 'Internal (15)', 'Mandiri (10)'],
        data: [14, 15, 10]
      },
      publikasi: {
        labels: ['Sinta (28)', 'Scopus (15)'],
        data: [28, 15]
      },
      partnershipGrowth: {
        nasional: [3, 5, 7, 8, 10, 11, 12],
        internasional: [1, 1, 1, 1, 2, 2, 2],
        total: [4, 6, 8, 9, 12, 13, 14]
      },
      partnershipStatus: { labels: ['Active (12)', 'Will Expire (2)'], data: [12, 2] },
      kemahasiswaanTren: {
        mhs: [20, 28, 38, 52, 62, 74, 86],
        dosen: [6, 8, 11, 15, 18, 20, 24],
        total: [26, 36, 49, 67, 80, 94, 110]
      },
      tipeEvent: { labels: ['Akademik & Sains (40)', 'Olahraga & Seni (24)', 'Kewirausahaan (12)', 'Sosial (10)'], data: [40, 24, 12, 10] }
    },
    'ppa': {
      statusDosen: { labels: ['Aktif (14)', 'Cuti (1)', 'Pensiun (0)'], data: [14, 1, 0], colors: ['#3D818A', '#E5D026', '#ef4444'] },
      jabatanDosen: { labels: ['Asisten Ahli (3)', 'Guru Besar (1)', 'Lektor (6)', 'Lektor Kepala (5)'], data: [3, 1, 6, 5] },
      sertifikasiDosen: { labels: ['Belum Sertifikasi (3)', 'Sudah Sertifikasi (12)'], data: [3, 12] },
      statusMhs: { labels: ['Aktif (120)', 'Cuti (3)', 'Tidak Aktif (2)'], data: [120, 3, 2] },
      ipkMhs: { labels: ['< 2.00', '2.00 - 2.50', '2.51 - 3.00', '3.01 - 3.50', '3.51 - 4.00'], data: [1, 9, 31, 57, 42] },
      korelasiMhs: {
        aktif: [{ x: 25, y: 3.6 }, { x: 50, y: 3.7 }, { x: 75, y: 3.8 }, { x: 90, y: 3.88 }, { x: 100, y: 3.95 }],
        cuti: [{ x: 40, y: 3.1 }],
        tidakAktif: [{ x: 20, y: 2.5 }]
      },
      isMultiProdi: false,
      proposal: {
        labels: ['DIKTI (5)', 'Internal (7)', 'Mandiri (4)'],
        data: [5, 7, 4]
      },
      publikasi: {
        labels: ['Sinta (10)', 'Scopus (8)'],
        data: [10, 8]
      },
      partnershipGrowth: {
        nasional: [2, 3, 4, 5, 6, 7, 8],
        internasional: [0, 0, 1, 1, 1, 1, 1],
        total: [2, 3, 5, 6, 7, 8, 9]
      },
      partnershipStatus: { labels: ['Active (8)', 'Will Expire (1)'], data: [8, 1] },
      kemahasiswaanTren: {
        mhs: [10, 14, 18, 24, 28, 32, 38],
        dosen: [3, 4, 5, 7, 8, 9, 11],
        total: [13, 18, 23, 31, 36, 41, 49]
      },
      tipeEvent: { labels: ['Akademik & Sains (18)', 'Olahraga & Seni (10)', 'Kewirausahaan (6)', 'Sosial (4)'], data: [18, 10, 6, 4] }
    }
  };

  // --- DASHBOARD CHARTS INITIALIZER ---
  function initDashboardCharts(prodiKey = 'semua') {
    if (typeof Chart === 'undefined') return;

    const d = dashboardData[prodiKey] || dashboardData['semua'];

    // Destroy existing instances if canvas is reused
    [
      'chartStatusDosen', 'chartJabatanDosen', 'chartSertifikasiDosen',
      'chartStatusMahasiswa', 'chartIpkMahasiswa', 'chartKorelasiIpkSks',
      'chartProposalProdi', 'chartPublikasiDosen',
      'chartPartnershipGrowth', 'chartPartnershipStatus',
      'chartTrenPartisipasi', 'chartTipeEvent'
    ].forEach(id => {
      const existingChart = Chart.getChart(id);
      if (existingChart) existingChart.destroy();
    });

    // ==========================================
    // CHARTS SDM DOSEN
    // ==========================================

    // 1. Distribusi Status Dosen (Pie Chart)
    const ctxStatus = document.getElementById('chartStatusDosen');
    if (ctxStatus) {
      new Chart(ctxStatus, {
        type: 'pie',
        data: {
          labels: d.statusDosen.labels,
          datasets: [{
            data: d.statusDosen.data,
            backgroundColor: d.statusDosen.colors,
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { usePointStyle: true, boxWidth: 10, padding: 12, font: { size: 11, weight: '500' } }
            }
          }
        }
      });
    }

    // 2. Distribusi Jabatan Akademik (Doughnut Chart)
    const ctxJabatan = document.getElementById('chartJabatanDosen');
    if (ctxJabatan) {
      new Chart(ctxJabatan, {
        type: 'doughnut',
        data: {
          labels: d.jabatanDosen.labels,
          datasets: [{
            data: d.jabatanDosen.data,
            backgroundColor: ['#0D0B61', '#294669', '#3D818A', '#E5D026'],
            borderWidth: 2,
            borderColor: '#ffffff',
            cutout: '60%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { usePointStyle: true, boxWidth: 10, padding: 8, font: { size: 11, weight: '500' } }
            }
          }
        }
      });
    }

    // 3. Status Sertifikasi Dosen (Doughnut Chart)
    const ctxSertifikasi = document.getElementById('chartSertifikasiDosen');
    if (ctxSertifikasi) {
      new Chart(ctxSertifikasi, {
        type: 'doughnut',
        data: {
          labels: d.sertifikasiDosen.labels,
          datasets: [{
            data: d.sertifikasiDosen.data,
            backgroundColor: ['#3D818A', '#E5D026'],
            borderWidth: 2,
            borderColor: '#ffffff',
            cutout: '65%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { usePointStyle: true, boxWidth: 10, padding: 12, font: { size: 11, weight: '500' } }
            }
          }
        }
      });
    }

    // ==========================================
    // CHARTS SDM MAHASISWA
    // ==========================================

    // 4. Distribusi Status Mahasiswa (Pie Chart)
    const ctxStatusMhs = document.getElementById('chartStatusMahasiswa');
    if (ctxStatusMhs) {
      new Chart(ctxStatusMhs, {
        type: 'pie',
        data: {
          labels: d.statusMhs.labels,
          datasets: [{
            data: d.statusMhs.data,
            backgroundColor: ['#3D818A', '#E5D026', '#ef4444'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { usePointStyle: true, boxWidth: 10, padding: 12, font: { size: 11, weight: '500' } }
            }
          }
        }
      });
    }

    // 5. Distribusi IPK Mahasiswa (Bar Chart)
    const ctxIpkMhs = document.getElementById('chartIpkMahasiswa');
    if (ctxIpkMhs) {
      new Chart(ctxIpkMhs, {
        type: 'bar',
        data: {
          labels: d.ipkMhs.labels,
          datasets: [{
            data: d.ipkMhs.data,
            backgroundColor: '#3D818A',
            borderRadius: 6,
            maxBarThickness: 32
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              grid: { display: true, color: '#f1f5f9' },
              ticks: { maxRotation: 45, minRotation: 45, font: { size: 10, weight: '500' }, color: '#64748b' }
            },
            y: {
              beginAtZero: true,
              grid: { color: '#f1f5f9' },
              ticks: { font: { size: 10 }, color: '#64748b' }
            }
          }
        }
      });
    }

    // 6. Korelasi IPK vs SKS (Scatter + Target Line)
    const ctxKorelasiMhs = document.getElementById('chartKorelasiIpkSks');
    if (ctxKorelasiMhs) {
      new Chart(ctxKorelasiMhs, {
        type: 'scatter',
        data: {
          datasets: [
            {
              type: 'line',
              label: 'Target IPK 3.0',
              data: [{ x: 0, y: 3.0 }, { x: 100, y: 3.0 }],
              borderColor: '#0D0B61',
              borderDash: [5, 5],
              borderWidth: 1.5,
              pointRadius: 0,
              fill: false
            },
            {
              label: 'Aktif',
              data: d.korelasiMhs.aktif,
              backgroundColor: '#3D818A',
              borderColor: '#3D818A',
              pointRadius: 4
            },
            {
              label: 'Cuti',
              data: d.korelasiMhs.cuti,
              backgroundColor: '#E5D026',
              borderColor: '#E5D026',
              pointRadius: 4
            },
            {
              label: 'Tidak Aktif',
              data: d.korelasiMhs.tidakAktif,
              backgroundColor: '#ef4444',
              borderColor: '#ef4444',
              pointRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              type: 'linear', min: 0, max: 100,
              grid: { color: '#f1f5f9' },
              ticks: { stepSize: 50, font: { size: 10 }, color: '#64748b' },
              title: { display: true, text: 'Penyelesaian SKS (%)', font: { size: 10, weight: '600' }, color: '#64748b' }
            },
            y: {
              min: 0, max: 4.0,
              grid: { color: '#f1f5f9' },
              ticks: { stepSize: 0.5, font: { size: 10 }, color: '#64748b' },
              title: { display: true, text: 'IPK', font: { size: 10, weight: '600' }, color: '#64748b' }
            }
          }
        }
      });
    }

    // ==========================================
    // CHARTS PENELITIAN & PUBLIKASI
    // ==========================================

    // 7. Proposal Penelitian (Grouped Bar / Single Prodi Bar)
    const ctxProposalProdi = document.getElementById('chartProposalProdi');
    if (ctxProposalProdi) {
      if (d.isMultiProdi) {
        new Chart(ctxProposalProdi, {
          type: 'bar',
          data: {
            labels: d.proposal.labels,
            datasets: d.proposal.datasets
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { color: '#f1f5f9' }, ticks: { maxRotation: 45, minRotation: 45, font: { size: 10, weight: '500' }, color: '#64748b' } },
              y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 }, color: '#64748b' } }
            }
          }
        });
      } else {
        new Chart(ctxProposalProdi, {
          type: 'bar',
          data: {
            labels: d.proposal.labels,
            datasets: [{
              data: d.proposal.data,
              backgroundColor: ['#0D0B61', '#3D818A', '#E5D026'],
              borderRadius: 6,
              maxBarThickness: 32
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 10, weight: '500' }, color: '#64748b' } },
              y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 }, color: '#64748b' } }
            }
          }
        });
      }
    }

    // 8. Publikasi Dosen (Grouped Bar / Single Prodi Bar)
    const ctxPublikasiDosen = document.getElementById('chartPublikasiDosen');
    if (ctxPublikasiDosen) {
      if (d.isMultiProdi) {
        new Chart(ctxPublikasiDosen, {
          type: 'bar',
          data: {
            labels: d.publikasi.labels,
            datasets: d.publikasi.datasets
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { color: '#f1f5f9' }, ticks: { maxRotation: 45, minRotation: 45, font: { size: 10, weight: '500' }, color: '#64748b' } },
              y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 }, color: '#64748b' } }
            }
          }
        });
      } else {
        new Chart(ctxPublikasiDosen, {
          type: 'bar',
          data: {
            labels: d.publikasi.labels,
            datasets: [{
              data: d.publikasi.data,
              backgroundColor: ['#3D818A', '#E5D026'],
              borderRadius: 6,
              maxBarThickness: 36
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 10, weight: '500' }, color: '#64748b' } },
              y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 }, color: '#64748b' } }
            }
          }
        });
      }
    }

    // ==========================================
    // CHARTS KERJASAMA & PARTNERSHIP
    // ==========================================

    // 9. Partnership Growth Timeline (Line Chart)
    const ctxPartnershipGrowth = document.getElementById('chartPartnershipGrowth');
    if (ctxPartnershipGrowth) {
      new Chart(ctxPartnershipGrowth, {
        type: 'line',
        data: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
          datasets: [
            {
              label: 'Nasional',
              data: d.partnershipGrowth.nasional,
              borderColor: '#E5D026',
              backgroundColor: '#E5D026',
              borderWidth: 2,
              tension: 0.3,
              pointRadius: 3
            },
            {
              label: 'Internasional',
              data: d.partnershipGrowth.internasional,
              borderColor: '#38bdf8',
              backgroundColor: '#38bdf8',
              borderWidth: 2,
              tension: 0.3,
              pointRadius: 3
            },
            {
              label: 'Total',
              data: d.partnershipGrowth.total,
              borderColor: '#3D818A',
              backgroundColor: '#3D818A',
              borderWidth: 2,
              borderDash: [5, 5],
              tension: 0.3,
              pointRadius: 3
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 10, weight: '500' }, color: '#64748b' } },
            y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 }, color: '#64748b' } }
          }
        }
      });
    }

    // 10. Partnership Status (Doughnut Chart)
    const ctxPartnershipStatus = document.getElementById('chartPartnershipStatus');
    if (ctxPartnershipStatus) {
      new Chart(ctxPartnershipStatus, {
        type: 'doughnut',
        data: {
          labels: d.partnershipStatus.labels,
          datasets: [{
            data: d.partnershipStatus.data,
            backgroundColor: ['#3D818A', '#E5D026'],
            borderWidth: 2,
            borderColor: '#ffffff',
            cutout: '65%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { usePointStyle: true, boxWidth: 10, padding: 12, font: { size: 11, weight: '500' } }
            }
          }
        }
      });
    }

    // ==========================================
    // CHARTS KEMAHASISWAAN
    // ==========================================

    // 11. Tren Partisipasi per Tahun (Line Chart)
    const ctxTrenPartisipasi = document.getElementById('chartTrenPartisipasi');
    if (ctxTrenPartisipasi) {
      new Chart(ctxTrenPartisipasi, {
        type: 'line',
        data: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
          datasets: [
            {
              label: 'Mahasiswa',
              data: d.kemahasiswaanTren.mhs,
              borderColor: '#38bdf8',
              backgroundColor: '#38bdf8',
              borderWidth: 2,
              tension: 0.3,
              pointRadius: 3
            },
            {
              label: 'Dosen',
              data: d.kemahasiswaanTren.dosen,
              borderColor: '#ec4899',
              backgroundColor: '#ec4899',
              borderWidth: 2,
              tension: 0.3,
              pointRadius: 3
            },
            {
              label: 'Total Partisipan',
              data: d.kemahasiswaanTren.total,
              borderColor: '#3D818A',
              backgroundColor: '#3D818A',
              borderWidth: 2,
              borderDash: [5, 5],
              tension: 0.3,
              pointRadius: 3
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 10, weight: '500' }, color: '#64748b' } },
            y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 }, color: '#64748b' } }
          }
        }
      });
    }

    // 12. Distribusi Tipe Event (Doughnut Chart)
    const ctxTipeEvent = document.getElementById('chartTipeEvent');
    if (ctxTipeEvent) {
      new Chart(ctxTipeEvent, {
        type: 'doughnut',
        data: {
          labels: d.tipeEvent.labels,
          datasets: [{
            data: d.tipeEvent.data,
            backgroundColor: ['#0D0B61', '#294669', '#3D818A', '#E5D026'],
            borderWidth: 2,
            borderColor: '#ffffff',
            cutout: '60%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { usePointStyle: true, boxWidth: 10, padding: 8, font: { size: 11, weight: '500' } }
            }
          }
        }
      });
    }
  }

  // --- SIDEBAR NAVIGATION ---
  function initSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const dashboardContainer = document.getElementById('dashboardContainer');

    async function loadPage(pageName) {
      if (!dashboardContainer || !pageName) return true;

      const response = await fetch(pageName, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Halaman ${pageName} gagal dimuat`);
      dashboardContainer.innerHTML = await response.text();
      dashboardContainer.scrollTop = 0;
      initSettingsForm();
      await loadDashboardSections();
      await loadWakilDekan1Sections();
      initWakilDekan1();
      await loadWakilDekan2Sections();
      initWakilDekan2();
      await loadWakilDekan3Sections();
      initWakilDekan3();
      await loadDosenSections();
      initDosen();
      await loadMahasiswaSections();
      initMahasiswa();
      initCustomSelectPills();
      return true;
    }

    sidebarLinks.forEach(link => {
      link.addEventListener('click', async function(e) {
        e.preventDefault();

        try {
          await loadPage(this.dataset.page);
        } catch (error) {
          console.error(error);
          return;
        }

        // Remove active from all links and reset text color
        sidebarLinks.forEach(l => {
          l.classList.remove('active');
          const span = l.querySelector('span.font-medium');
          if (span) {
            span.style.color = '';
            span.style.fontWeight = '';
          }
        });

        // Add active to clicked link and guarantee purple text color
        this.classList.add('active');
        const activeSpan = this.querySelector('span.font-medium');
        if (activeSpan) {
          activeSpan.style.color = '#722F99';
          activeSpan.style.fontWeight = '700';
        }

        // Close sidebar on mobile
        if (window.innerWidth < 768) {
          const sidebar = document.getElementById('sidebar');
          const overlay = document.getElementById('sidebarOverlay');
          if (sidebar) sidebar.classList.add('-translate-x-full');
          if (overlay) overlay.classList.remove('show');
          document.body.style.overflow = '';
        }

        // Trigger event
        const menuText = this.querySelector('span.font-medium')?.textContent || 'Unknown';
        const event = new CustomEvent('sidebarChange', { 
          detail: { 
            menu: menuText
          } 
        });
        document.dispatchEvent(event);
      });
    });

    // Set initial active link text color
    document.querySelectorAll('.sidebar-link.active span.font-medium').forEach(span => {
      span.style.color = '#722F99';
      span.style.fontWeight = '700';
    });
  }

  // --- SETTINGS FORM ---
  function initSettingsForm() {
    const form = document.getElementById('settingsForm');
    const status = document.getElementById('settingsStatus');

    if (!form || !status) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.textContent = 'Perubahan berhasil disimpan.';
      status.classList.add('is-visible');
    });

    form.addEventListener('reset', () => {
      status.textContent = '';
      status.classList.remove('is-visible');
    });
  }

  // --- SIDEBAR DROPDOWNS ---
  function initSidebarDropdown() {
    const toggles = document.querySelectorAll('.sidebar-dropdown-toggle');

    toggles.forEach(toggle => {
      const menu = document.getElementById(toggle.getAttribute('aria-controls'));

      if (!menu) return;

      toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!isOpen));
        menu.dataset.open = String(!isOpen);
      });
    });
  }

  // --- LOGO HANDLER ---
  function initLogo() {
    const logoImage = document.getElementById('logoImage');
    const logoFallback = document.getElementById('logoFallback');

    if (logoImage) {
      logoImage.addEventListener('load', function() {
        this.classList.remove('hidden');
        if (logoFallback) logoFallback.classList.add('hidden');
      });

      logoImage.addEventListener('error', function() {
        this.classList.add('hidden');
        if (logoFallback) logoFallback.classList.remove('hidden');
      });

      if (logoImage.complete && logoImage.naturalWidth !== 0) {
        logoImage.classList.remove('hidden');
        if (logoFallback) logoFallback.classList.add('hidden');
      }
    }
  }

  // --- FILTER TABS (PRODI) ---
  function initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab[data-prodi]');
    if (!tabs.length) return;

    const sectionsContainer = document.getElementById('dashboardSections');
    if (!sectionsContainer) return;

    // Folder mapping per prodi (di bawah page/)
    const prodiFolderMap = {
      'biologi': 'Prodi/biologi',
      'kimia': 'Prodi/kimia',
      'matematika': 'Prodi/matematika',
      'ilmu-komputer': 'Prodi/ilmu komputer',
      'farmasi': 'Prodi/farmasi',
      'ppa': 'Prodi/pendidikan profesi apoteker'
    };

    const prodiFiles = [
      'sdm dosen.html',
      'sdm mahasiswa.html',
      'penelitian publikasi.html',
      'keuangan administrasi.html',
      'media sosial.html',
      'kerjasama partnership.html',
      'kemahasiswaan.html'
    ];

    // Muat semua berkas section untuk program studi yang dipilih
    async function showProdi(prodiKey) {
      const folder = prodiFolderMap[prodiKey];
      if (!folder) return;

      sectionsContainer.style.opacity = '0.3';
      sectionsContainer.style.transition = 'opacity 0.2s ease';

      try {
        const fetchPromises = prodiFiles.map(f => {
          const url = encodeURI(`${folder}/${f}`);
          return fetch(url).then(r => {
            if (!r.ok) throw new Error(`File ${url} gagal dimuat (${r.status})`);
            return r.text();
          });
        });
        const htmls = await Promise.all(fetchPromises);
        sectionsContainer.innerHTML = htmls.join('\n');

        requestAnimationFrame(() => {
          sectionsContainer.style.opacity = '1';
        });

        initDashboardCharts(prodiKey);
      } catch (err) {
        console.error('Gagal memuat prodi:', err);
        sectionsContainer.innerHTML = `
          <div class="text-center py-12 text-gray-500">
            <i class="fas fa-exclamation-triangle text-3xl mb-3 text-amber-500"></i>
            <p>Data prodi gagal dimuat: ${err.message}</p>
          </div>`;
        sectionsContainer.style.opacity = '1';
      }
    }

    // Kembalikan tampilan agregat semua fakultas
    async function showSemua() {
      sectionsContainer.style.opacity = '0.3';
      sectionsContainer.style.transition = 'opacity 0.2s ease';
      const files = [
        'dashboard/sdm_dosen.html',
        'dashboard/sdm_mahasiswa.html',
        'dashboard/penelitian_publikasi.html',
        'dashboard/keuangan_administrasi.html',
        'dashboard/media_sosial.html',
        'dashboard/kerjasama_partnership.html',
        'dashboard/kemahasiswaan.html'
      ];
      try {
        const htmls = await Promise.all(files.map(f => fetch(f).then(r => r.text())));
        sectionsContainer.innerHTML = htmls.join('\n');
        requestAnimationFrame(() => { sectionsContainer.style.opacity = '1'; });
        initDashboardCharts('semua');
      } catch (e) {
        console.error('Error restoring dashboard:', e);
        sectionsContainer.style.opacity = '1';
      }
    }

    // Pasang listener pada tombol tab
    tabs.forEach(tab => {
      tab.addEventListener('click', async function () {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const prodi = this.dataset.prodi;
        if (prodi === 'semua') {
          await showSemua();
        } else {
          await showProdi(prodi);
        }
      });
    });
  }

  // --- WAKIL DEKAN 1 (BIDANG AKADEMIK) ---
  const wd1Data = {
    'semua': {
      ipkRataRata: '3.38',
      totalAktif: '1.245',
      kelulusanTepatWaktu: '78%',
      lulusanRatio: '342 dari 438 lulusan',
      akreditasiKadaluarsa: '0',
      totalProdi: '6',
      earlyWarning: '14',
      earlyWarningDetail: '3 kritis · 11 peringatan',
      ipkDistribusi: [18, 65, 310, 680, 297],
      kelulusan: {
        labels: ['Biologi', 'Kimia', 'Matematika', 'Ilmu Komputer', 'Farmasi', 'PPA'],
        tepatWaktu: [48, 45, 41, 76, 89, 43],
        terlambat: [12, 15, 9, 24, 21, 15]
      },
      retensi: {
        totalTa: 248,
        selesai: 176,
        completionRate: '71% completion',
        dalamProses: 54,
        terlambat: 18,
        angkatan: {
          labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
          rates: [88, 92, 85, 90, 84, 89]
        }
      },
      akreditasiBeban: {
        rataSks: '14.2',
        dosenOverload: 8,
        dosenUnderload: 5,
        skorAkreditasi: {
          labels: ['Biologi', 'Kimia', 'Matematika', 'Ilmu Komputer', 'Farmasi', 'PPA'],
          scores: [88, 85, 92, 90, 94, 95]
        },
        rasioKelulusan: {
          labels: ['Biologi', 'Kimia', 'Matematika', 'Ilmu Komputer', 'Farmasi'],
          rates: [80, 75, 82, 76, 81]
        }
      }
    },
    'biologi': {
      ipkRataRata: '3.32',
      totalAktif: '215',
      kelulusanTepatWaktu: '80%',
      lulusanRatio: '48 dari 60 lulusan',
      akreditasiKadaluarsa: '0',
      totalProdi: '1',
      earlyWarning: '2',
      earlyWarningDetail: '0 kritis · 2 peringatan',
      ipkDistribusi: [3, 10, 52, 115, 45],
      kelulusan: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
        tepatWaktu: [38, 42, 45, 46, 47, 48],
        terlambat: [14, 12, 11, 13, 10, 12]
      },
      retensi: {
        totalTa: 42,
        selesai: 32,
        completionRate: '76% completion',
        dalamProses: 8,
        terlambat: 2,
        angkatan: {
          labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
          rates: [85, 87, 88, 86, 89, 91]
        }
      },
      akreditasiBeban: {
        rataSks: '13.8',
        dosenOverload: 1,
        dosenUnderload: 1,
        skorAkreditasi: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          scores: [82, 84, 85, 86, 88, 88]
        },
        rasioKelulusan: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          rates: [73, 75, 77, 78, 80, 80]
        }
      }
    },
    'kimia': {
      ipkRataRata: '3.35',
      totalAktif: '258',
      kelulusanTepatWaktu: '75%',
      lulusanRatio: '45 dari 60 lulusan',
      akreditasiKadaluarsa: '0',
      totalProdi: '1',
      earlyWarning: '3',
      earlyWarningDetail: '1 kritis · 2 peringatan',
      ipkDistribusi: [4, 12, 58, 128, 54],
      kelulusan: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
        tepatWaktu: [35, 38, 40, 42, 44, 45],
        terlambat: [16, 15, 14, 13, 14, 15]
      },
      retensi: {
        totalTa: 38,
        selesai: 26,
        completionRate: '68% completion',
        dalamProses: 9,
        terlambat: 3,
        angkatan: {
          labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
          rates: [82, 84, 86, 83, 85, 88]
        }
      },
      akreditasiBeban: {
        rataSks: '14.5',
        dosenOverload: 2,
        dosenUnderload: 1,
        skorAkreditasi: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          scores: [80, 82, 83, 84, 85, 85]
        },
        rasioKelulusan: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          rates: [68, 70, 72, 74, 75, 75]
        }
      }
    },
    'matematika': {
      ipkRataRata: '3.41',
      totalAktif: '180',
      kelulusanTepatWaktu: '82%',
      lulusanRatio: '41 dari 50 lulusan',
      akreditasiKadaluarsa: '0',
      totalProdi: '1',
      earlyWarning: '1',
      earlyWarningDetail: '0 kritis · 1 peringatan',
      ipkDistribusi: [3, 9, 48, 108, 38],
      kelulusan: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
        tepatWaktu: [32, 34, 36, 38, 40, 41],
        terlambat: [10, 9, 8, 9, 7, 9]
      },
      retensi: {
        totalTa: 30,
        selesai: 22,
        completionRate: '73% completion',
        dalamProses: 6,
        terlambat: 2,
        angkatan: {
          labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
          rates: [86, 88, 85, 89, 90, 92]
        }
      },
      akreditasiBeban: {
        rataSks: '13.5',
        dosenOverload: 1,
        dosenUnderload: 1,
        skorAkreditasi: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          scores: [85, 87, 88, 90, 91, 92]
        },
        rasioKelulusan: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          rates: [75, 77, 79, 80, 81, 82]
        }
      }
    },
    'ilmu-komputer': {
      ipkRataRata: '3.44',
      totalAktif: '395',
      kelulusanTepatWaktu: '76%',
      lulusanRatio: '76 dari 100 lulusan',
      akreditasiKadaluarsa: '0',
      totalProdi: '1',
      earlyWarning: '4',
      earlyWarningDetail: '1 kritis · 3 peringatan',
      ipkDistribusi: [4, 14, 66, 148, 66],
      kelulusan: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
        tepatWaktu: [58, 62, 68, 70, 74, 76],
        terlambat: [20, 22, 23, 21, 25, 24]
      },
      retensi: {
        totalTa: 65,
        selesai: 44,
        completionRate: '68% completion',
        dalamProses: 16,
        terlambat: 5,
        angkatan: {
          labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
          rates: [80, 83, 85, 88, 86, 89]
        }
      },
      akreditasiBeban: {
        rataSks: '15.1',
        dosenOverload: 3,
        dosenUnderload: 1,
        skorAkreditasi: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          scores: [84, 86, 87, 88, 89, 90]
        },
        rasioKelulusan: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          rates: [70, 72, 73, 75, 75, 76]
        }
      }
    },
    'farmasi': {
      ipkRataRata: '3.40',
      totalAktif: '290',
      kelulusanTepatWaktu: '81%',
      lulusanRatio: '89 dari 110 lulusan',
      akreditasiKadaluarsa: '0',
      totalProdi: '1',
      earlyWarning: '3',
      earlyWarningDetail: '1 kritis · 2 peringatan',
      ipkDistribusi: [3, 15, 62, 135, 68],
      kelulusan: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
        tepatWaktu: [68, 72, 78, 82, 85, 89],
        terlambat: [18, 19, 20, 18, 22, 21]
      },
      retensi: {
        totalTa: 55,
        selesai: 40,
        completionRate: '73% completion',
        dalamProses: 12,
        terlambat: 3,
        angkatan: {
          labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
          rates: [89, 91, 90, 92, 94, 93]
        }
      },
      akreditasiBeban: {
        rataSks: '14.8',
        dosenOverload: 1,
        dosenUnderload: 1,
        skorAkreditasi: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          scores: [88, 89, 91, 92, 93, 94]
        },
        rasioKelulusan: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          rates: [76, 78, 79, 80, 80, 81]
        }
      }
    },
    'ppa': {
      ipkRataRata: '3.52',
      totalAktif: '100',
      kelulusanTepatWaktu: '90%',
      lulusanRatio: '43 dari 48 lulusan',
      akreditasiKadaluarsa: '0',
      totalProdi: '1',
      earlyWarning: '1',
      earlyWarningDetail: '0 kritis · 1 peringatan',
      ipkDistribusi: [1, 5, 24, 46, 26],
      kelulusan: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
        tepatWaktu: [36, 38, 40, 41, 42, 43],
        terlambat: [6, 5, 4, 5, 4, 5]
      },
      retensi: {
        totalTa: 18,
        selesai: 12,
        completionRate: '67% completion',
        dalamProses: 3,
        terlambat: 3,
        angkatan: {
          labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
          rates: [90, 92, 91, 94, 95, 96]
        }
      },
      akreditasiBeban: {
        rataSks: '13.0',
        dosenOverload: 0,
        dosenUnderload: 0,
        skorAkreditasi: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          scores: [90, 91, 92, 93, 94, 95]
        },
        rasioKelulusan: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          rates: [85, 87, 88, 89, 89, 90]
        }
      }
    }
  };

  let wd1ChartIpkInstance = null;
  let wd1ChartKelulusanInstance = null;
  let wd1ChartRetensiInstance = null;
  let wd1ChartStatusTaInstance = null;
  let wd1ChartSkorAkreditasiInstance = null;
  let wd1ChartRasioKelulusanProdiInstance = null;

  async function loadWakilDekan1Sections() {
    const container = document.getElementById('wd1Sections');
    if (!container) return;

    const files = [
      'wakil dekan 1/ipk_analisis_kelulusan.html',
      'wakil dekan 1/retensi_tugas_akhir.html',
      'wakil dekan 1/akreditasi_beban_mengajar.html'
    ];

    try {
      const htmls = await Promise.all(files.map(f => fetch(f).then(r => r.text())));
      container.innerHTML = htmls.join('\n');
    } catch (e) {
      console.error('Error loading wakil dekan 1 sections:', e);
    }
  }

  function initWakilDekan1(activeProdi = 'semua') {
    const data = wd1Data[activeProdi] || wd1Data['semua'];

    // ── SECTION 1: IPK & KELULUSAN ──
    const canvasIpk = document.getElementById('chartWd1DistribusiIpk');
    const canvasKelulusan = document.getElementById('chartWd1Kelulusan');

    if (canvasIpk && canvasKelulusan) {
      // Update Top 4 Metric Cards IPK
      const valIpk = document.getElementById('valWd1Ipk');
      const subIpk = document.getElementById('subWd1Ipk');
      const valKelulusan = document.getElementById('valWd1Kelulusan');
      const subKelulusan = document.getElementById('subWd1Kelulusan');
      const valAkreditasi = document.getElementById('valWd1Akreditasi');
      const subAkreditasi = document.getElementById('subWd1Akreditasi');
      const valEarlyWarning = document.getElementById('valWd1EarlyWarning');
      const subEarlyWarning = document.getElementById('subWd1EarlyWarning');

      if (valIpk) valIpk.textContent = data.ipkRataRata;
      if (subIpk) subIpk.textContent = `${data.totalAktif} mahasiswa aktif`;
      if (valKelulusan) valKelulusan.textContent = data.kelulusanTepatWaktu;
      if (subKelulusan) subKelulusan.textContent = data.lulusanRatio;
      if (valAkreditasi) valAkreditasi.textContent = data.akreditasiKadaluarsa;
      if (subAkreditasi) subAkreditasi.textContent = `dari ${data.totalProdi} program studi`;
      if (valEarlyWarning) valEarlyWarning.textContent = data.earlyWarning;
      if (subEarlyWarning) subEarlyWarning.textContent = data.earlyWarningDetail;

      // Update Legends
      const totalTepat = data.kelulusan.tepatWaktu.reduce((a, b) => a + b, 0);
      const totalTerlambat = data.kelulusan.terlambat.reduce((a, b) => a + b, 0);
      const legendTepat = document.getElementById('legendTextTepatWaktu');
      const legendTerlambat = document.getElementById('legendTextTerlambat');
      if (legendTepat) legendTepat.textContent = `Tepat Waktu (${totalTepat})`;
      if (legendTerlambat) legendTerlambat.textContent = `Terlambat (${totalTerlambat})`;

      // Destroy existing chart instances before rebuilding
      if (wd1ChartIpkInstance) {
        wd1ChartIpkInstance.destroy();
        wd1ChartIpkInstance = null;
      }
      if (wd1ChartKelulusanInstance) {
        wd1ChartKelulusanInstance.destroy();
        wd1ChartKelulusanInstance = null;
      }

      // Chart 1: Distribusi IPK Mahasiswa Aktif
      const ctxIpk = canvasIpk.getContext('2d');
      wd1ChartIpkInstance = new Chart(ctxIpk, {
        type: 'bar',
        data: {
          labels: ['< 2.00', '2.00 - 2.50', '2.51 - 3.00', '3.01 - 3.50', '3.51 - 4.00'],
          datasets: [{
            data: data.ipkDistribusi,
            backgroundColor: '#3D818A',
            borderRadius: 6,
            maxBarThickness: 45
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
            x: {
              grid: { display: false },
              ticks: { font: { size: 11, weight: '500' }, color: '#64748b' }
            },
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(226, 232, 240, 0.6)' },
              ticks: { font: { size: 11 }, color: '#64748b' }
            }
          }
        }
      });

      // Chart 2: Kelulusan Tepat Waktu vs Terlambat
      const ctxKelulusan = canvasKelulusan.getContext('2d');
      wd1ChartKelulusanInstance = new Chart(ctxKelulusan, {
        type: 'bar',
        data: {
          labels: data.kelulusan.labels,
          datasets: [
            {
              label: 'Tepat Waktu',
              data: data.kelulusan.tepatWaktu,
              backgroundColor: '#3D818A',
              borderRadius: 5,
              maxBarThickness: 24
            },
            {
              label: 'Terlambat',
              data: data.kelulusan.terlambat,
              backgroundColor: '#E5D026',
              borderRadius: 5,
              maxBarThickness: 24
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
                label: (context) => ` ${context.dataset.label}: ${context.parsed.y} Lulusan`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { size: 11, weight: '500' }, color: '#64748b' }
            },
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(226, 232, 240, 0.6)' },
              ticks: { font: { size: 11 }, color: '#64748b' }
            }
          }
        }
      });
    }

    // ── SECTION 2: RETENSI & PROGRES TUGAS AKHIR ──
    const canvasRetensi = document.getElementById('chartWd1RetensiAngkatan');
    const canvasStatusTa = document.getElementById('chartWd1StatusTa');

    if (data.retensi) {
      // Update Top 4 Metric Cards Retensi
      const valRetTotal = document.getElementById('valRetTotalTa');
      const valRetSelesai = document.getElementById('valRetSelesai');
      const subRetSelesai = document.getElementById('subRetSelesai');
      const valRetProses = document.getElementById('valRetDalamProses');
      const valRetTerlambat = document.getElementById('valRetTerlambat');

      if (valRetTotal) valRetTotal.textContent = data.retensi.totalTa;
      if (valRetSelesai) valRetSelesai.textContent = data.retensi.selesai;
      if (subRetSelesai) subRetSelesai.textContent = data.retensi.completionRate;
      if (valRetProses) valRetProses.textContent = data.retensi.dalamProses;
      if (valRetTerlambat) valRetTerlambat.textContent = data.retensi.terlambat;

      // Update Legends
      const legSelesai = document.getElementById('legendRetSelesai');
      const legProses = document.getElementById('legendRetDalamProses');
      const legTerlambat = document.getElementById('legendRetTerlambat');
      if (legSelesai) legSelesai.textContent = `Selesai (${data.retensi.selesai})`;
      if (legProses) legProses.textContent = `Dalam Proses (${data.retensi.dalamProses})`;
      if (legTerlambat) legTerlambat.textContent = `Terlambat (${data.retensi.terlambat})`;

      // Destroy existing chart instances before rebuilding
      if (wd1ChartRetensiInstance) {
        wd1ChartRetensiInstance.destroy();
        wd1ChartRetensiInstance = null;
      }
      if (wd1ChartStatusTaInstance) {
        wd1ChartStatusTaInstance.destroy();
        wd1ChartStatusTaInstance = null;
      }

      // Chart 1: Retensi Mahasiswa per Angkatan (Line Chart 0 - 100%)
      if (canvasRetensi) {
        const ctxRetensi = canvasRetensi.getContext('2d');
        wd1ChartRetensiInstance = new Chart(ctxRetensi, {
          type: 'line',
          data: {
            labels: data.retensi.angkatan.labels,
            datasets: [{
              label: 'Retensi',
              data: data.retensi.angkatan.rates,
              borderColor: '#3D818A',
              backgroundColor: 'rgba(61, 129, 138, 0.12)',
              borderWidth: 3,
              pointBackgroundColor: '#0D0B61',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2,
              pointRadius: 4.5,
              pointHoverRadius: 7,
              tension: 0.35,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (context) => ` Retensi Angkatan ${context.label}: ${context.parsed.y}%`
                }
              }
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { font: { size: 11, weight: '500' }, color: '#64748b' }
              },
              y: {
                min: 0,
                max: 100,
                ticks: {
                  stepSize: 10,
                  callback: (val) => `${val}%`,
                  font: { size: 11 },
                  color: '#64748b'
                },
                grid: { color: 'rgba(226, 232, 240, 0.6)' }
              }
            }
          }
        });
      }

      // Chart 2: Status Tugas Akhir (Doughnut Chart)
      if (canvasStatusTa) {
        const ctxStatusTa = canvasStatusTa.getContext('2d');
        wd1ChartStatusTaInstance = new Chart(ctxStatusTa, {
          type: 'doughnut',
          data: {
            labels: ['Selesai', 'Dalam Proses', 'Terlambat'],
            datasets: [{
              data: [data.retensi.selesai, data.retensi.dalamProses, data.retensi.terlambat],
              backgroundColor: ['#3D818A', '#E5D026', '#ef4444'],
              borderWidth: 2,
              borderColor: '#ffffff',
              hoverOffset: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (context) => ` ${context.label}: ${context.parsed} Mahasiswa`
                }
              }
            }
          }
        });
      }
    }

    // ── SECTION 3: AKREDITASI & BEBAN MENGAJAR ──
    const canvasSkorAkreditasi = document.getElementById('chartWd1SkorAkreditasi');
    const canvasRasioKelulusanProdi = document.getElementById('chartWd1RasioKelulusanProdi');

    if (data.akreditasiBeban) {
      // Update Top 3 Metric Cards Akreditasi & Beban
      const valAkrRata = document.getElementById('valAkrRataSks');
      const valAkrOver = document.getElementById('valAkrOverload');
      const valAkrUnder = document.getElementById('valAkrUnderload');

      if (valAkrRata) valAkrRata.textContent = data.akreditasiBeban.rataSks;
      if (valAkrOver) valAkrOver.textContent = data.akreditasiBeban.dosenOverload;
      if (valAkrUnder) valAkrUnder.textContent = data.akreditasiBeban.dosenUnderload;

      // Destroy existing chart instances before rebuilding
      if (wd1ChartSkorAkreditasiInstance) {
        wd1ChartSkorAkreditasiInstance.destroy();
        wd1ChartSkorAkreditasiInstance = null;
      }
      if (wd1ChartRasioKelulusanProdiInstance) {
        wd1ChartRasioKelulusanProdiInstance.destroy();
        wd1ChartRasioKelulusanProdiInstance = null;
      }

      // Chart 1: Skor Akreditasi per Prodi (Bar Chart 0 - 100)
      if (canvasSkorAkreditasi) {
        const ctxSkor = canvasSkorAkreditasi.getContext('2d');
        wd1ChartSkorAkreditasiInstance = new Chart(ctxSkor, {
          type: 'bar',
          data: {
            labels: data.akreditasiBeban.skorAkreditasi.labels,
            datasets: [{
              label: 'Skor Akreditasi',
              data: data.akreditasiBeban.skorAkreditasi.scores,
              backgroundColor: '#0D0B61',
              borderRadius: 6,
              maxBarThickness: 38
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (context) => ` Skor: ${context.parsed.y} / 100`
                }
              }
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { font: { size: 11, weight: '500' }, color: '#64748b' }
              },
              y: {
                min: 0,
                max: 100,
                ticks: {
                  stepSize: 10,
                  font: { size: 11 },
                  color: '#64748b'
                },
                grid: { color: 'rgba(226, 232, 240, 0.6)' }
              }
            }
          }
        });
      }

      // Chart 2: Rasio Kelulusan Tepat Waktu per Prodi (Horizontal Bar Chart 0% - 100%)
      if (canvasRasioKelulusanProdi) {
        const ctxRasio = canvasRasioKelulusanProdi.getContext('2d');
        wd1ChartRasioKelulusanProdiInstance = new Chart(ctxRasio, {
          type: 'bar',
          data: {
            labels: data.akreditasiBeban.rasioKelulusan.labels,
            datasets: [{
              label: 'Rasio Tepat Waktu',
              data: data.akreditasiBeban.rasioKelulusan.rates,
              backgroundColor: '#3D818A',
              borderRadius: 5,
              maxBarThickness: 22
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (context) => ` Kelulusan Tepat Waktu: ${context.parsed.x}%`
                }
              }
            },
            scales: {
              x: {
                min: 0,
                max: 100,
                ticks: {
                  stepSize: 20,
                  callback: (val) => `${val}%`,
                  font: { size: 11 },
                  color: '#64748b'
                },
                grid: { color: 'rgba(226, 232, 240, 0.6)' }
              },
              y: {
                grid: { display: false },
                ticks: { font: { size: 11, weight: '500' }, color: '#64748b' }
              }
            }
          }
        });
      }
    }

    // Bind Filter Tabs for WD1 if not already bound
    const tabs = document.querySelectorAll('.filter-tab[data-wd1-prodi]');
    tabs.forEach(tab => {
      if (tab.dataset.bound === 'true') return;
      tab.dataset.bound = 'true';
      tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const prodi = this.dataset.wd1Prodi;
        initWakilDekan1(prodi);
      });
    });

    // Bind Dropdown Filters for WD1
    const tahunSelectWd1 = document.getElementById('filterTahunWd1');
    if (tahunSelectWd1 && !tahunSelectWd1.dataset.bound) {
      tahunSelectWd1.dataset.bound = 'true';
      tahunSelectWd1.addEventListener('change', function() {
        const activeTab = document.querySelector('.filter-tab[data-wd1-prodi].active');
        initWakilDekan1(activeTab ? activeTab.dataset.wd1Prodi : 'semua');
      });
    }

    const angkatanSelectWd1 = document.getElementById('filterAngkatanWd1');
    if (angkatanSelectWd1 && !angkatanSelectWd1.dataset.bound) {
      angkatanSelectWd1.dataset.bound = 'true';
      angkatanSelectWd1.addEventListener('change', function() {
        const activeTab = document.querySelector('.filter-tab[data-wd1-prodi].active');
        initWakilDekan1(activeTab ? activeTab.dataset.wd1Prodi : 'semua');
      });
    }

    const statusMhsSelectWd1 = document.getElementById('filterStatusMhsWd1');
    if (statusMhsSelectWd1 && !statusMhsSelectWd1.dataset.bound) {
      statusMhsSelectWd1.dataset.bound = 'true';
      statusMhsSelectWd1.addEventListener('change', function() {
        const activeTab = document.querySelector('.filter-tab[data-wd1-prodi].active');
        initWakilDekan1(activeTab ? activeTab.dataset.wd1Prodi : 'semua');
      });
    }

    initCustomSelectPills();
  }

  // --- WAKIL DEKAN 2 (BIDANG KEUANGAN & SDM) ---
  const wd2Data = {
    'semua': {
      anggaranDisetujui: 'Rp 6.15M',
      tahunAnggaran: 'Tahun 2026',
      realisasiPersen: '43%',
      realisasiNominal: 'Rp 2.65M',
      sisaAnggaran: 'Rp 3.50M',
      sisaSubtext: 'Belum terealisasi',
      totalBeasiswa: '172',
      nominalBeasiswa: 'Rp 860.0Jt',
      anggaranKategori: {
        labels: ['Operasional', 'Gaji & Honor', 'Penelitian & PkM', 'Sarana & Prasarana', 'Kemahasiswaan', 'Pengembangan SDM'],
        disetujui: [1770000000, 1370000000, 1200000000, 930000000, 420000000, 310000000],
        realisasi: [805000000, 617000000, 500000000, 380000000, 168500000, 88600000]
      },
      trenBulanan: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
        direncanakan: [375000000, 500000000, 580000000, 545000000, 580000000, 510000000, 470000000, 510000000, 545000000, 580000000, 505000000, 460000000],
        realisasi: [352000000, 480000000, 546000000, 527000000, 433000000, 396100000, 0, 0, 0, 0, 0, 0]
      },
      sdm: {
        totalDosen: 148,
        subTotalDosen: 'Aktif di FMIPA',
        rataPenelitian: '1.8',
        subRataPenelitian: 'Penelitian per dosen (2026)',
        hrAlert: 3,
        subHrAlert: '1 pensiun · 2 kontrak habis',
        statusKepegawaian: {
          labels: ['Tetap Yayasan', 'PNS DPK', 'Kontrak', 'Luar Biasa'],
          data: [96, 28, 18, 6]
        },
        jabatanAkademik: {
          labels: ['Guru Besar', 'Lektor Kepala', 'Lektor', 'Asisten Ahli', 'Tenaga Pengajar'],
          data: [12, 35, 52, 38, 11]
        },
        produktivitasProdi: {
          labels: ['Biologi', 'Farmasi', 'Ilmu Komputer', 'Kimia', 'Matematika'],
          data: [0.78, 0.92, 0.85, 0.80, 0.72]
        },
        piramidaUsia: {
          labels: ['<30', '30-39', '40-49', '50-59', '≥60'],
          lakiLaki: [8, 28, 32, 18, 6],
          perempuan: [12, 22, 14, 6, 2]
        },
        distribusiBeasiswa: {
          labels: ['Bidikmisi/KIP-K', 'Beasiswa Prestasi', 'Beasiswa Yayasan', 'Beasiswa Pemerintah Daerah', 'Beasiswa Lainnya'],
          data: [68, 42, 30, 22, 10],
          colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
        }
      },
      arusKas: {
        totalPemasukan: 'Rp 14.8M',
        subTotalPemasukan: 'Tahun Anggaran 2026',
        totalPengeluaran: 'Rp 10.2M',
        subTotalPengeluaran: 'Operasional & Program',
        saldoKas: 'Rp 4.6M',
        subSaldoKas: 'Surplus Likuiditas Kas',
        rasioSerapan: '68.9%',
        subRasioSerapan: 'Status: Terkendali & Sehat',
        trenBulanan: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
          pemasukan: [1.8, 2.2, 1.9, 2.4, 2.1, 2.6, 2.0, 2.3, 2.5, 2.2, 2.4, 2.8],
          pengeluaran: [1.1, 1.4, 1.3, 1.6, 1.5, 1.8, 1.4, 1.5, 1.7, 1.6, 1.8, 2.1]
        },
        komposisiSumber: {
          labels: ['UKT / SPP Mahasiswa', 'Hibah Riset Kemendikbud', 'Kerja Sama Mitra Industri', 'Unit Jasa Laboratorium'],
          data: [65, 18, 12, 5],
          colors: ['#0D0B61', '#3D818A', '#294669', '#E5D026']
        }
      }
    },
    'biologi': {
      anggaranDisetujui: 'Rp 850.0Jt',
      tahunAnggaran: 'Tahun 2026',
      realisasiPersen: '42%',
      realisasiNominal: 'Rp 357.0Jt',
      sisaAnggaran: 'Rp 493.0Jt',
      sisaSubtext: 'Sisa kuota aktif',
      totalBeasiswa: '24',
      nominalBeasiswa: 'Rp 120.0Jt',
      anggaranKategori: {
        labels: ['Operasional', 'Gaji & Honor', 'Penelitian & PkM', 'Sarana & Prasarana', 'Kemahasiswaan', 'Pengembangan SDM'],
        disetujui: [250000000, 200000000, 180000000, 120000000, 60000000, 40000000],
        realisasi: [120000000, 100000000, 70000000, 40000000, 20000000, 7000000]
      },
      trenBulanan: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
        direncanakan: [50000000, 70000000, 80000000, 75000000, 80000000, 70000000, 65000000, 70000000, 75000000, 80000000, 70000000, 65000000],
        realisasi: [45000000, 68000000, 72000000, 74000000, 50000000, 48000000, 0, 0, 0, 0, 0, 0]
      },
      sdm: {
        totalDosen: 24,
        subTotalDosen: 'Aktif di Biologi',
        rataPenelitian: '1.7',
        subRataPenelitian: 'Penelitian per dosen (2026)',
        hrAlert: 0,
        subHrAlert: '0 pensiun · 0 kontrak habis',
        statusKepegawaian: {
          labels: ['Tetap Yayasan', 'PNS DPK', 'Kontrak', 'Luar Biasa'],
          data: [16, 5, 2, 1]
        },
        jabatanAkademik: {
          labels: ['Guru Besar', 'Lektor Kepala', 'Lektor', 'Asisten Ahli', 'Tenaga Pengajar'],
          data: [2, 6, 9, 5, 2]
        },
        produktivitasProdi: {
          labels: ['Biologi', 'Farmasi', 'Ilmu Komputer', 'Kimia', 'Matematika'],
          data: [0.78, 0, 0, 0, 0]
        },
        piramidaUsia: {
          labels: ['<30', '30-39', '40-49', '50-59', '≥60'],
          lakiLaki: [2, 6, 8, 5, 3],
          perempuan: [3, 4, 1, 1, 0]
        },
        distribusiBeasiswa: {
          labels: ['Bidikmisi/KIP-K', 'Beasiswa Prestasi', 'Beasiswa Yayasan', 'Beasiswa Pemerintah Daerah', 'Beasiswa Lainnya'],
          data: [10, 6, 5, 2, 1],
          colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
        }
      }
    },
    'kimia': {
      anggaranDisetujui: 'Rp 920.0Jt',
      tahunAnggaran: 'Tahun 2026',
      realisasiPersen: '38%',
      realisasiNominal: 'Rp 349.6Jt',
      sisaAnggaran: 'Rp 570.4Jt',
      sisaSubtext: 'Sisa kuota aktif',
      totalBeasiswa: '28',
      nominalBeasiswa: 'Rp 140.0Jt',
      anggaranKategori: {
        labels: ['Operasional', 'Gaji & Honor', 'Penelitian & PkM', 'Sarana & Prasarana', 'Kemahasiswaan', 'Pengembangan SDM'],
        disetujui: [270000000, 220000000, 200000000, 130000000, 60000000, 40000000],
        realisasi: [110000000, 95000000, 75000000, 42000000, 18000000, 9600000]
      },
      trenBulanan: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
        direncanakan: [55000000, 75000000, 85000000, 80000000, 85000000, 75000000, 70000000, 75000000, 80000000, 85000000, 75000000, 70000000],
        realisasi: [50000000, 70000000, 78000000, 76000000, 45000000, 30600000, 0, 0, 0, 0, 0, 0]
      },
      sdm: {
        totalDosen: 26,
        subTotalDosen: 'Aktif di Kimia',
        rataPenelitian: '1.9',
        subRataPenelitian: 'Penelitian per dosen (2026)',
        hrAlert: 1,
        subHrAlert: '1 pensiun · 0 kontrak habis',
        statusKepegawaian: {
          labels: ['Tetap Yayasan', 'PNS DPK', 'Kontrak', 'Luar Biasa'],
          data: [18, 4, 3, 1]
        },
        jabatanAkademik: {
          labels: ['Guru Besar', 'Lektor Kepala', 'Lektor', 'Asisten Ahli', 'Tenaga Pengajar'],
          data: [3, 7, 8, 6, 2]
        },
        produktivitasProdi: {
          labels: ['Biologi', 'Farmasi', 'Ilmu Komputer', 'Kimia', 'Matematika'],
          data: [0, 0, 0, 0.80, 0]
        },
        piramidaUsia: {
          labels: ['<30', '30-39', '40-49', '50-59', '≥60'],
          lakiLaki: [1, 5, 8, 7, 3],
          perempuan: [3, 5, 3, 1, 0]
        },
        distribusiBeasiswa: {
          labels: ['Bidikmisi/KIP-K', 'Beasiswa Prestasi', 'Beasiswa Yayasan', 'Beasiswa Pemerintah Daerah', 'Beasiswa Lainnya'],
          data: [12, 7, 5, 3, 1],
          colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
        }
      }
    },
    'matematika': {
      anggaranDisetujui: 'Rp 750.0Jt',
      tahunAnggaran: 'Tahun 2026',
      realisasiPersen: '45%',
      realisasiNominal: 'Rp 337.5Jt',
      sisaAnggaran: 'Rp 412.5Jt',
      sisaSubtext: 'Sisa kuota aktif',
      totalBeasiswa: '18',
      nominalBeasiswa: 'Rp 90.0Jt',
      anggaranKategori: {
        labels: ['Operasional', 'Gaji & Honor', 'Penelitian & PkM', 'Sarana & Prasarana', 'Kemahasiswaan', 'Pengembangan SDM'],
        disetujui: [220000000, 190000000, 150000000, 100000000, 50000000, 40000000],
        realisasi: [105000000, 92000000, 68000000, 45000000, 17500000, 10000000]
      },
      trenBulanan: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
        direncanakan: [45000000, 60000000, 70000000, 65000000, 70000000, 60000000, 55000000, 60000000, 65000000, 70000000, 65000000, 65000000],
        realisasi: [42000000, 58000000, 67000000, 63000000, 55000000, 52500000, 0, 0, 0, 0, 0, 0]
      },
      sdm: {
        totalDosen: 18,
        subTotalDosen: 'Aktif di Matematika',
        rataPenelitian: '1.6',
        subRataPenelitian: 'Penelitian per dosen (2026)',
        hrAlert: 0,
        subHrAlert: '0 pensiun · 0 kontrak habis',
        statusKepegawaian: {
          labels: ['Tetap Yayasan', 'PNS DPK', 'Kontrak', 'Luar Biasa'],
          data: [12, 3, 2, 1]
        },
        jabatanAkademik: {
          labels: ['Guru Besar', 'Lektor Kepala', 'Lektor', 'Asisten Ahli', 'Tenaga Pengajar'],
          data: [1, 4, 7, 4, 2]
        },
        produktivitasProdi: {
          labels: ['Biologi', 'Farmasi', 'Ilmu Komputer', 'Kimia', 'Matematika'],
          data: [0, 0, 0, 0, 0.72]
        },
        piramidaUsia: {
          labels: ['<30', '30-39', '40-49', '50-59', '≥60'],
          lakiLaki: [1, 3, 5, 5, 2],
          perempuan: [2, 3, 2, 1, 1]
        },
        distribusiBeasiswa: {
          labels: ['Bidikmisi/KIP-K', 'Beasiswa Prestasi', 'Beasiswa Yayasan', 'Beasiswa Pemerintah Daerah', 'Beasiswa Lainnya'],
          data: [7, 5, 3, 2, 1],
          colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
        }
      }
    },
    'ilmu-komputer': {
      anggaranDisetujui: 'Rp 1.45M',
      tahunAnggaran: 'Tahun 2026',
      realisasiPersen: '48%',
      realisasiNominal: 'Rp 696.0Jt',
      sisaAnggaran: 'Rp 754.0Jt',
      sisaSubtext: 'Sisa kuota aktif',
      totalBeasiswa: '42',
      nominalBeasiswa: 'Rp 210.0Jt',
      anggaranKategori: {
        labels: ['Operasional', 'Gaji & Honor', 'Penelitian & PkM', 'Sarana & Prasarana', 'Kemahasiswaan', 'Pengembangan SDM'],
        disetujui: [400000000, 320000000, 300000000, 250000000, 100000000, 80000000],
        realisasi: [210000000, 160000000, 145000000, 110000000, 45000000, 26000000]
      },
      trenBulanan: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
        direncanakan: [90000000, 120000000, 140000000, 130000000, 140000000, 120000000, 110000000, 120000000, 130000000, 140000000, 110000000, 100000000],
        realisasi: [88000000, 115000000, 136000000, 128000000, 119000000, 110000000, 0, 0, 0, 0, 0, 0]
      },
      sdm: {
        totalDosen: 38,
        subTotalDosen: 'Aktif di Ilmu Komputer',
        rataPenelitian: '2.1',
        subRataPenelitian: 'Penelitian per dosen (2026)',
        hrAlert: 1,
        subHrAlert: '0 pensiun · 1 kontrak habis',
        statusKepegawaian: {
          labels: ['Tetap Yayasan', 'PNS DPK', 'Kontrak', 'Luar Biasa'],
          data: [24, 7, 5, 2]
        },
        jabatanAkademik: {
          labels: ['Guru Besar', 'Lektor Kepala', 'Lektor', 'Asisten Ahli', 'Tenaga Pengajar'],
          data: [3, 9, 14, 9, 3]
        },
        produktivitasProdi: {
          labels: ['Biologi', 'Farmasi', 'Ilmu Komputer', 'Kimia', 'Matematika'],
          data: [0, 0, 0.85, 0, 0]
        },
        piramidaUsia: {
          labels: ['<30', '30-39', '40-49', '50-59', '≥60'],
          lakiLaki: [2, 8, 10, 4, 2],
          perempuan: [4, 5, 4, 2, 0]
        },
        distribusiBeasiswa: {
          labels: ['Bidikmisi/KIP-K', 'Beasiswa Prestasi', 'Beasiswa Yayasan', 'Beasiswa Pemerintah Daerah', 'Beasiswa Lainnya'],
          data: [17, 10, 8, 5, 2],
          colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
        }
      }
    },
    'farmasi': {
      anggaranDisetujui: 'Rp 1.60M',
      tahunAnggaran: 'Tahun 2026',
      realisasiPersen: '44%',
      realisasiNominal: 'Rp 704.0Jt',
      sisaAnggaran: 'Rp 896.0Jt',
      sisaSubtext: 'Sisa kuota aktif',
      totalBeasiswa: '48',
      nominalBeasiswa: 'Rp 240.0Jt',
      anggaranKategori: {
        labels: ['Operasional', 'Gaji & Honor', 'Penelitian & PkM', 'Sarana & Prasarana', 'Kemahasiswaan', 'Pengembangan SDM'],
        disetujui: [450000000, 350000000, 320000000, 280000000, 110000000, 90000000],
        realisasi: [215000000, 170000000, 140000000, 105000000, 48000000, 26000000]
      },
      trenBulanan: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
        direncanakan: [100000000, 130000000, 150000000, 145000000, 150000000, 135000000, 125000000, 135000000, 145000000, 150000000, 125000000, 110000000],
        realisasi: [95000000, 125000000, 142000000, 138000000, 114000000, 90000000, 0, 0, 0, 0, 0, 0]
      },
      sdm: {
        totalDosen: 32,
        subTotalDosen: 'Aktif di Farmasi',
        rataPenelitian: '2.0',
        subRataPenelitian: 'Penelitian per dosen (2026)',
        hrAlert: 1,
        subHrAlert: '0 pensiun · 1 kontrak habis',
        statusKepegawaian: {
          labels: ['Tetap Yayasan', 'PNS DPK', 'Kontrak', 'Luar Biasa'],
          data: [20, 7, 4, 1]
        },
        jabatanAkademik: {
          labels: ['Guru Besar', 'Lektor Kepala', 'Lektor', 'Asisten Ahli', 'Tenaga Pengajar'],
          data: [3, 7, 11, 9, 2]
        },
        produktivitasProdi: {
          labels: ['Biologi', 'Farmasi', 'Ilmu Komputer', 'Kimia', 'Matematika'],
          data: [0, 0.92, 0, 0, 0]
        },
        piramidaUsia: {
          labels: ['<30', '30-39', '40-49', '50-59', '≥60'],
          lakiLaki: [2, 7, 11, 6, 2],
          perempuan: [4, 7, 5, 2, 0]
        },
        distribusiBeasiswa: {
          labels: ['Bidikmisi/KIP-K', 'Beasiswa Prestasi', 'Beasiswa Yayasan', 'Beasiswa Pemerintah Daerah', 'Beasiswa Lainnya'],
          data: [20, 12, 9, 5, 2],
          colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
        }
      }
    },
    'ppa': {
      anggaranDisetujui: 'Rp 580.0Jt',
      tahunAnggaran: 'Tahun 2026',
      realisasiPersen: '50%',
      realisasiNominal: 'Rp 290.0Jt',
      sisaAnggaran: 'Rp 290.0Jt',
      sisaSubtext: 'Sisa kuota aktif',
      totalBeasiswa: '12',
      nominalBeasiswa: 'Rp 60.0Jt',
      anggaranKategori: {
        labels: ['Operasional', 'Gaji & Honor', 'Penelitian & PkM', 'Sarana & Prasarana', 'Kemahasiswaan', 'Pengembangan SDM'],
        disetujui: [180000000, 150000000, 100000000, 80000000, 40000000, 30000000],
        realisasi: [95000000, 80000000, 52000000, 38000000, 15000000, 10000000]
      },
      trenBulanan: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
        direncanakan: [35000000, 45000000, 55000000, 50000000, 55000000, 50000000, 45000000, 50000000, 50000000, 55000000, 45000000, 45000000],
        realisasi: [32000000, 44000000, 51000000, 48000000, 60000000, 55000000, 0, 0, 0, 0, 0, 0]
      },
      sdm: {
        totalDosen: 10,
        subTotalDosen: 'Aktif di PPA',
        rataPenelitian: '1.4',
        subRataPenelitian: 'Penelitian per dosen (2026)',
        hrAlert: 0,
        subHrAlert: '0 pensiun · 0 kontrak habis',
        statusKepegawaian: {
          labels: ['Tetap Yayasan', 'PNS DPK', 'Kontrak', 'Luar Biasa'],
          data: [6, 2, 2, 0]
        },
        jabatanAkademik: {
          labels: ['Guru Besar', 'Lektor Kepala', 'Lektor', 'Asisten Ahli', 'Tenaga Pengajar'],
          data: [0, 2, 3, 5, 0]
        },
        produktivitasProdi: {
          labels: ['Biologi', 'Farmasi', 'Ilmu Komputer', 'Kimia', 'Matematika'],
          data: [0, 0.65, 0, 0, 0]
        },
        piramidaUsia: {
          labels: ['<30', '30-39', '40-49', '50-59', '≥60'],
          lakiLaki: [0, 2, 4, 3, 1],
          perempuan: [2, 3, 2, 1, 0]
        },
        distribusiBeasiswa: {
          labels: ['Bidikmisi/KIP-K', 'Beasiswa Prestasi', 'Beasiswa Yayasan', 'Beasiswa Pemerintah Daerah', 'Beasiswa Lainnya'],
          data: [5, 3, 2, 1, 1],
          colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
        }
      }
    }
  };

  let wd2ChartKategoriInstance = null;
  let wd2ChartTrenInstance = null;
  let wd2ChartStatusKepegawaianInstance = null;
  let wd2ChartJabatanAkademikInstance = null;
  let wd2ChartProduktivitasProdiInstance = null;
  let wd2ChartPiramidaUsiaInstance = null;
  let wd2ChartDistribusiBeasiswaInstance = null;
  let wd2ChartTrenArusKasInstance = null;
  let wd2ChartKomposisiKasInstance = null;

  async function loadWakilDekan2Sections() {
    const container = document.getElementById('wd2Sections');
    if (!container) return;

    const files = [
      'wakil%20dekan%202/overview_anggaran.html',
      'wakil%20dekan%202/komposisi_sumber_manusia.html',
      'wakil%20dekan%202/piramida_usia_dosen.html',
      'wakil%20dekan%202/riwayat_pemasukan_dan_pengeluaran.html'
    ];

    try {
      const htmls = await Promise.all(files.map(f => fetch(f).then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })));
      container.innerHTML = htmls.join('\n');
    } catch (e) {
      try {
        const fallback = [
          'wakil dekan 2/overview_anggaran.html',
          'wakil dekan 2/komposisi_sumber_manusia.html',
          'wakil dekan 2/piramida_usia_dosen.html',
          'wakil dekan 2/riwayat_pemasukan_dan_pengeluaran.html'
        ];
        const htmls = await Promise.all(fallback.map(f => fetch(f).then(r => r.text())));
        container.innerHTML = htmls.join('\n');
      } catch (err) {
        console.error('Error loading wakil dekan 2 sections:', err);
      }
    }

    // Tunggu 1 frame agar DOM & layout benar-benar siap sebelum Chart.js render
    await new Promise(resolve => requestAnimationFrame(resolve));
  }


  function initWakilDekan2(activeProdi = 'semua') {
    const data = wd2Data[activeProdi] || wd2Data['semua'];

    // Update 4 Kartu Metrik Anggaran
    const valDisetujui = document.getElementById('valWd2AnggaranDisetujui');
    const subDisetujui = document.getElementById('subWd2AnggaranDisetujui');
    const valRealisasi = document.getElementById('valWd2RealisasiPersen');
    const subRealisasi = document.getElementById('subWd2RealisasiNominal');
    const valSisa = document.getElementById('valWd2SisaAnggaran');
    const subSisa = document.getElementById('subWd2SisaAnggaran');
    const valBeasiswa = document.getElementById('valWd2TotalBeasiswa');
    const subBeasiswa = document.getElementById('subWd2NominalBeasiswa');

    if (valDisetujui) valDisetujui.textContent = data.anggaranDisetujui;
    if (subDisetujui) subDisetujui.textContent = data.tahunAnggaran;
    if (valRealisasi) valRealisasi.textContent = data.realisasiPersen;
    if (subRealisasi) subRealisasi.textContent = data.realisasiNominal;
    if (valSisa) valSisa.textContent = data.sisaAnggaran;
    if (subSisa) subSisa.textContent = data.sisaSubtext;
    if (valBeasiswa) valBeasiswa.textContent = data.totalBeasiswa;
    if (subBeasiswa) subBeasiswa.textContent = data.nominalBeasiswa;

    // Update 3 Kartu Metrik SDM
    if (data.sdm) {
      const valSdm = document.getElementById('valWd2TotalSdm');
      const subSdm = document.getElementById('subWd2TotalSdm');
      const valPenelitian = document.getElementById('valWd2RataPenelitian');
      const subPenelitian = document.getElementById('subWd2RataPenelitian');
      const valAlert = document.getElementById('valWd2HrAlert');
      const subAlert = document.getElementById('subWd2HrAlert');

      if (valSdm) valSdm.textContent = data.sdm.totalDosen;
      if (subSdm) subSdm.textContent = data.sdm.subTotalDosen;
      if (valPenelitian) valPenelitian.textContent = data.sdm.rataPenelitian;
      if (subPenelitian) subPenelitian.textContent = data.sdm.subRataPenelitian;
      if (valAlert) valAlert.textContent = data.sdm.hrAlert;
      if (subAlert) subAlert.textContent = data.sdm.subHrAlert;
    }

    // Formatter Sumbu Y Rupiah (Rp 0M s.d. Rp 1M)
    const rupiahTickFormatter = function(value) {
      if (value === 0) return 'Rp 0M';
      const inM = value / 1000000000;
      if (Number.isInteger(inM)) {
        return 'Rp ' + inM + 'M';
      }
      return 'Rp ' + inM.toFixed(1) + 'M';
    };

    // ── CHART 1: Anggaran per Kategori (Bar Chart) ──
    const canvasKategori = document.getElementById('chartWd2AnggaranKategori');
    if (canvasKategori) {
      if (wd2ChartKategoriInstance) {
        wd2ChartKategoriInstance.destroy();
        wd2ChartKategoriInstance = null;
      }

      const ctxKategori = canvasKategori.getContext('2d');
      wd2ChartKategoriInstance = new Chart(ctxKategori, {
        type: 'bar',
        data: {
          labels: data.anggaranKategori.labels,
          datasets: [
            {
              label: 'Disetujui',
              data: data.anggaranKategori.disetujui,
              backgroundColor: '#0D0B61',
              borderRadius: 4,
              maxBarThickness: 32
            },
            {
              label: 'Realisasi',
              data: data.anggaranKategori.realisasi,
              backgroundColor: '#3D818A',
              borderRadius: 4,
              maxBarThickness: 32
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
                label: (context) => {
                  const val = context.parsed.y;
                  if (val >= 1000000000) return ` ${context.dataset.label}: Rp ${(val / 1000000000).toFixed(2)} Miliar`;
                  if (val >= 1000000) return ` ${context.dataset.label}: Rp ${(val / 1000000).toFixed(1)} Juta`;
                  return ` ${context.dataset.label}: Rp ${val.toLocaleString('id-ID')}`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { size: 11, weight: '500' }, color: '#64748b' }
            },
            y: {
              beginAtZero: true,
              min: 0,
              max: 1000000000,
              ticks: {
                stepSize: 100000000,
                callback: rupiahTickFormatter,
                font: { size: 11 },
                color: '#64748b'
              },
              grid: { color: 'rgba(226, 232, 240, 0.6)' }
            }
          }
        }
      });
    }

    // ── CHART 2: Tren Realisasi Bulanan (Line Chart) ──
    const canvasTren = document.getElementById('chartWd2TrenRealisasi');
    if (canvasTren) {
      if (wd2ChartTrenInstance) {
        wd2ChartTrenInstance.destroy();
        wd2ChartTrenInstance = null;
      }

      const ctxTren = canvasTren.getContext('2d');
      wd2ChartTrenInstance = new Chart(ctxTren, {
        type: 'line',
        data: {
          labels: data.trenBulanan.labels,
          datasets: [
            {
              label: 'Direncanakan',
              data: data.trenBulanan.direncanakan,
              borderColor: '#0D0B61',
              backgroundColor: 'transparent',
              pointBackgroundColor: '#0D0B61',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 1.5,
              pointRadius: 4,
              pointHoverRadius: 6,
              borderWidth: 2,
              tension: 0.2
            },
            {
              label: 'Realisasi',
              data: data.trenBulanan.realisasi,
              borderColor: '#3D818A',
              backgroundColor: 'transparent',
              pointBackgroundColor: '#3D818A',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 1.5,
              pointRadius: 4,
              pointHoverRadius: 6,
              borderWidth: 2,
              tension: 0.2
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
                label: (context) => {
                  const val = context.parsed.y;
                  if (val >= 1000000000) return ` ${context.dataset.label}: Rp ${(val / 1000000000).toFixed(2)} Miliar`;
                  if (val >= 1000000) return ` ${context.dataset.label}: Rp ${(val / 1000000).toFixed(1)} Juta`;
                  return ` ${context.dataset.label}: Rp ${val.toLocaleString('id-ID')}`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: { color: 'rgba(226, 232, 240, 0.4)' },
              ticks: { font: { size: 11, weight: '500' }, color: '#64748b' }
            },
            y: {
              beginAtZero: true,
              min: 0,
              max: 1000000000,
              ticks: {
                stepSize: 100000000,
                callback: rupiahTickFormatter,
                font: { size: 11 },
                color: '#64748b'
              },
              grid: { color: 'rgba(226, 232, 240, 0.6)' }
            }
          }
        }
      });
    }

    // ── CHART 3: Komposisi Status Kepegawaian (Doughnut Chart) ──
    const canvasStatus = document.getElementById('chartWd2StatusKepegawaian');
    if (canvasStatus && data.sdm) {
      if (wd2ChartStatusKepegawaianInstance) {
        wd2ChartStatusKepegawaianInstance.destroy();
        wd2ChartStatusKepegawaianInstance = null;
      }

      const ctxStatus = canvasStatus.getContext('2d');
      wd2ChartStatusKepegawaianInstance = new Chart(ctxStatus, {
        type: 'doughnut',
        data: {
          labels: data.sdm.statusKepegawaian.labels,
          datasets: [{
            data: data.sdm.statusKepegawaian.data,
            backgroundColor: ['#0D0B61', '#294669', '#3D818A', '#E5D026'],
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 10,
                boxHeight: 10,
                borderRadius: 2,
                useBorderRadius: true,
                padding: 10,
                font: { size: 11, weight: '500' },
                color: '#64748b'
              }
            }
          }
        }
      });
    }

    // ── CHART 4: Distribusi Jabatan Akademik (Doughnut Chart) ──
    const canvasJabatan = document.getElementById('chartWd2JabatanAkademik');
    if (canvasJabatan && data.sdm) {
      if (wd2ChartJabatanAkademikInstance) {
        wd2ChartJabatanAkademikInstance.destroy();
        wd2ChartJabatanAkademikInstance = null;
      }

      const ctxJabatan = canvasJabatan.getContext('2d');
      wd2ChartJabatanAkademikInstance = new Chart(ctxJabatan, {
        type: 'doughnut',
        data: {
          labels: data.sdm.jabatanAkademik.labels,
          datasets: [{
            data: data.sdm.jabatanAkademik.data,
            backgroundColor: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92'],
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 10,
                boxHeight: 10,
                borderRadius: 2,
                useBorderRadius: true,
                padding: 8,
                font: { size: 10.5, weight: '500' },
                color: '#64748b'
              }
            }
          }
        }
      });
    }

    // ── CHART 5: Produktivitas per Prodi (Bar Chart) ──
    const canvasProduktivitas = document.getElementById('chartWd2ProduktivitasProdi');
    if (canvasProduktivitas && data.sdm) {
      if (wd2ChartProduktivitasProdiInstance) {
        wd2ChartProduktivitasProdiInstance.destroy();
        wd2ChartProduktivitasProdiInstance = null;
      }

      const ctxProd = canvasProduktivitas.getContext('2d');
      wd2ChartProduktivitasProdiInstance = new Chart(ctxProd, {
        type: 'bar',
        data: {
          labels: data.sdm.produktivitasProdi.labels,
          datasets: [{
            label: 'Skor Produktivitas',
            data: data.sdm.produktivitasProdi.data,
            backgroundColor: '#3D818A',
            hoverBackgroundColor: '#294669',
            borderRadius: 4,
            maxBarThickness: 28
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => ` Produktivitas: ${context.parsed.y.toFixed(2)}`
              }
            }
          },
          scales: {
            x: {
              grid: { color: 'rgba(226, 232, 240, 0.4)' },
              ticks: {
                minRotation: 20,
                maxRotation: 20,
                font: { size: 10, weight: '500' },
                color: '#64748b'
              }
            },
            y: {
              beginAtZero: true,
              min: 0,
              max: 1.0,
              ticks: {
                stepSize: 0.5,
                font: { size: 11 },
                color: '#64748b'
              },
              grid: { color: 'rgba(226, 232, 240, 0.6)' }
            }
          }
        }
      });
    }

    // ── CHART 6: Piramida Usia Dosen L/P (Horizontal Bar Butterfly Chart) ──
    const canvasPiramida = document.getElementById('chartWd2PiramidaUsia');
    if (canvasPiramida && data.sdm && data.sdm.piramidaUsia) {
      if (wd2ChartPiramidaUsiaInstance) {
        wd2ChartPiramidaUsiaInstance.destroy();
        wd2ChartPiramidaUsiaInstance = null;
      }

      const piramidaData = data.sdm.piramidaUsia;
      const negatedLaki = piramidaData.lakiLaki.map(v => -v);
      const maxVal = Math.max(...piramidaData.lakiLaki, ...piramidaData.perempuan);

      const ctxPiramida = canvasPiramida.getContext('2d');
      wd2ChartPiramidaUsiaInstance = new Chart(ctxPiramida, {
        type: 'bar',
        data: {
          labels: piramidaData.labels,
          datasets: [
            {
              label: 'Laki-laki',
              data: negatedLaki,
              backgroundColor: '#0D0B61',
              hoverBackgroundColor: '#07063d',
              borderRadius: 4,
              maxBarThickness: 28
            },
            {
              label: 'Perempuan',
              data: piramidaData.perempuan,
              backgroundColor: '#3D818A',
              hoverBackgroundColor: '#2d6067',
              borderRadius: 4,
              maxBarThickness: 28
            }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const raw = Math.abs(context.parsed.x);
                  return ` ${context.dataset.label}: ${raw} orang`;
                }
              }
            }
          },
          scales: {
            x: {
              stacked: false,
              min: -(maxVal + 2),
              max: maxVal + 2,
              grid: { color: 'rgba(226, 232, 240, 0.5)' },
              ticks: {
                callback: (val) => Math.abs(val),
                font: { size: 11 },
                color: '#64748b',
                stepSize: Math.ceil((maxVal + 2) / 4)
              }
            },
            y: {
              stacked: false,
              grid: { display: false },
              ticks: { font: { size: 11, weight: '500' }, color: '#64748b' }
            }
          }
        }
      });
    }

    // ── CHART 7: Distribusi Beasiswa per Jenis (Doughnut Chart) ──
    const canvasBeasiswa = document.getElementById('chartWd2DistribusiBeasiswa');
    if (canvasBeasiswa && data.sdm && data.sdm.distribusiBeasiswa) {
      if (wd2ChartDistribusiBeasiswaInstance) {
        wd2ChartDistribusiBeasiswaInstance.destroy();
        wd2ChartDistribusiBeasiswaInstance = null;
      }

      const bsData = data.sdm.distribusiBeasiswa;
      const ctxBeasiswa = canvasBeasiswa.getContext('2d');
      wd2ChartDistribusiBeasiswaInstance = new Chart(ctxBeasiswa, {
        type: 'doughnut',
        data: {
          labels: bsData.labels,
          datasets: [{
            data: bsData.data,
            backgroundColor: bsData.colors,
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '62%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 10,
                boxHeight: 10,
                borderRadius: 2,
                useBorderRadius: true,
                padding: 10,
                font: { size: 10.5, weight: '500' },
                color: '#64748b'
              }
            },
            tooltip: {
              callbacks: {
                label: (context) => ` ${context.label}: ${context.parsed} penerima`
              }
            }
          }
        }
      });
    }

    // --- 4. Riwayat Pemasukan & Pengeluaran ---
    const valTotalPemasukan = document.getElementById('valWd2TotalPemasukan');
    const subTotalPemasukan = document.getElementById('subWd2TotalPemasukan');
    const valTotalPengeluaran = document.getElementById('valWd2TotalPengeluaran');
    const subTotalPengeluaran = document.getElementById('subWd2TotalPengeluaran');
    const valSaldoKas = document.getElementById('valWd2SaldoKas');
    const subSaldoKas = document.getElementById('subWd2SaldoKas');
    const valRasioSerapan = document.getElementById('valWd2RasioSerapan');
    const subRasioSerapan = document.getElementById('subWd2RasioSerapan');

    const arusKas = data.arusKas || wd2Data['semua'].arusKas;
    if (arusKas) {
      if (valTotalPemasukan) valTotalPemasukan.textContent = arusKas.totalPemasukan;
      if (subTotalPemasukan) subTotalPemasukan.textContent = arusKas.subTotalPemasukan;
      if (valTotalPengeluaran) valTotalPengeluaran.textContent = arusKas.totalPengeluaran;
      if (subTotalPengeluaran) subTotalPengeluaran.textContent = arusKas.subTotalPengeluaran;
      if (valSaldoKas) valSaldoKas.textContent = arusKas.saldoKas;
      if (subSaldoKas) subSaldoKas.textContent = arusKas.subSaldoKas;
      if (valRasioSerapan) valRasioSerapan.textContent = arusKas.rasioSerapan;
      if (subRasioSerapan) subRasioSerapan.textContent = arusKas.subRasioSerapan;

      // Grafik 1: Tren Arus Kas Bulanan
      const canvasTrenArusKas = document.getElementById('chartWd2TrenArusKas');
      if (canvasTrenArusKas) {
        if (wd2ChartTrenArusKasInstance) {
          wd2ChartTrenArusKasInstance.destroy();
          wd2ChartTrenArusKasInstance = null;
        }
        const ctxArusKas = canvasTrenArusKas.getContext('2d');
        wd2ChartTrenArusKasInstance = new Chart(ctxArusKas, {
          type: 'bar',
          data: {
            labels: arusKas.trenBulanan.labels,
            datasets: [
              {
                label: 'Pemasukan',
                data: arusKas.trenBulanan.pemasukan,
                backgroundColor: '#3D818A',
                borderRadius: 4,
                maxBarThickness: 14
              },
              {
                label: 'Pengeluaran',
                data: arusKas.trenBulanan.pengeluaran,
                backgroundColor: '#0D0B61',
                borderRadius: 4,
                maxBarThickness: 14
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
                  label: (context) => ` ${context.dataset.label}: Rp ${context.parsed.y} M`
                }
              }
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { font: { size: 10.5, weight: '500' }, color: '#64748b' }
              },
              y: {
                beginAtZero: true,
                grid: { color: 'rgba(226, 232, 240, 0.6)' },
                ticks: {
                  font: { size: 10.5 },
                  color: '#64748b',
                  callback: (v) => `Rp ${v}M`
                }
              }
            }
          }
        });
      }

      // Grafik 2: Komposisi Sumber Pemasukan
      const canvasKomposisiKas = document.getElementById('chartWd2KomposisiKas');
      if (canvasKomposisiKas) {
        if (wd2ChartKomposisiKasInstance) {
          wd2ChartKomposisiKasInstance.destroy();
          wd2ChartKomposisiKasInstance = null;
        }
        const ctxKomposisi = canvasKomposisiKas.getContext('2d');
        wd2ChartKomposisiKasInstance = new Chart(ctxKomposisi, {
          type: 'doughnut',
          data: {
            labels: arusKas.komposisiSumber.labels,
            datasets: [{
              data: arusKas.komposisiSumber.data,
              backgroundColor: arusKas.komposisiSumber.colors,
              borderWidth: 2,
              borderColor: '#ffffff',
              hoverOffset: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '62%',
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  boxWidth: 10,
                  boxHeight: 10,
                  borderRadius: 2,
                  useBorderRadius: true,
                  padding: 8,
                  font: { size: 10, weight: '500' },
                  color: '#64748b'
                }
              },
              tooltip: {
                callbacks: {
                  label: (context) => ` ${context.label}: ${context.parsed}%`
                }
              }
            }
          }
        });
      }
    }

    // Bind Filter Tabs for WD2
    const tabs = document.querySelectorAll('.filter-tab[data-wd2-prodi]');
    tabs.forEach(tab => {
      if (tab.dataset.bound === 'true') return;
      tab.dataset.bound = 'true';
      tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const prodi = this.dataset.wd2Prodi;
        initWakilDekan2(prodi);
      });
    });

    // Bind Dropdown Filters for WD2
    const tahunSelectWd2 = document.getElementById('filterTahunWd2');
    if (tahunSelectWd2 && !tahunSelectWd2.dataset.bound) {
      tahunSelectWd2.dataset.bound = 'true';
      tahunSelectWd2.addEventListener('change', function() {
        const activeTab = document.querySelector('.filter-tab[data-wd2-prodi].active');
        initWakilDekan2(activeTab ? activeTab.dataset.wd2Prodi : 'semua');
      });
    }

    const kategoriSelectWd2 = document.getElementById('filterKategoriWd2');
    if (kategoriSelectWd2 && !kategoriSelectWd2.dataset.bound) {
      kategoriSelectWd2.dataset.bound = 'true';
      kategoriSelectWd2.addEventListener('change', function() {
        const activeTab = document.querySelector('.filter-tab[data-wd2-prodi].active');
        initWakilDekan2(activeTab ? activeTab.dataset.wd2Prodi : 'semua');
      });
    }

    const statusAnggaranSelectWd2 = document.getElementById('filterStatusAnggaranWd2');
    if (statusAnggaranSelectWd2 && !statusAnggaranSelectWd2.dataset.bound) {
      statusAnggaranSelectWd2.dataset.bound = 'true';
      statusAnggaranSelectWd2.addEventListener('change', function() {
        const activeTab = document.querySelector('.filter-tab[data-wd2-prodi].active');
        initWakilDekan2(activeTab ? activeTab.dataset.wd2Prodi : 'semua');
      });
    }

    initCustomSelectPills();
  }

  // ============================================
  // WAKIL DEKAN 3 - DATA & INITIALIZATION
  // ============================================
  const wd3Data = {
    'semua': {
      totalMhs: '0',
      rasioGender: 'L: 0% · P: 0%',
      totalOrmawa: '22',
      anggotaOrmawa: '450 anggota terdaftar',
      totalKegiatan: '45',
      statusKegiatan: '32 selesai · 10 berjalan',
      tingkatPartisipasi: '85.5%',
      subPartisipasi: 'Kehadiran rata-rata kegiatan',
      jenisKegiatan: {
        labels: ['Akademik & Sains (18)', 'Olahraga & Seni (12)', 'Kewirausahaan (8)', 'Sosial & Pengabdian (7)'],
        data: [18, 12, 8, 7],
        colors: ['#5b55db', '#e34ea5', '#10b981', '#fb923c']
      },
      trenKegiatan: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        selesai: [4, 6, 5, 7, 5, 5],
        berjalan: [2, 1, 3, 2, 1, 1],
        partisipasi: [82, 84, 83, 86, 88, 85.5]
      }
    },
    'biologi': {
      totalMhs: '215',
      rasioGender: 'L: 42% · P: 58%',
      totalOrmawa: '4',
      anggotaOrmawa: '85 anggota terdaftar',
      totalKegiatan: '8',
      statusKegiatan: '6 selesai · 2 berjalan',
      tingkatPartisipasi: '88.2%',
      subPartisipasi: 'Kehadiran rata-rata kegiatan',
      jenisKegiatan: {
        labels: ['Akademik & Sains (4)', 'Olahraga & Seni (2)', 'Kewirausahaan (1)', 'Sosial & Pengabdian (1)'],
        data: [4, 2, 1, 1],
        colors: ['#5b55db', '#e34ea5', '#10b981', '#fb923c']
      },
      trenKegiatan: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        selesai: [1, 1, 1, 1, 1, 1],
        berjalan: [0, 1, 0, 1, 0, 0],
        partisipasi: [85, 87, 86, 89, 90, 88.2]
      }
    },
    'kimia': {
      totalMhs: '258',
      rasioGender: 'L: 38% · P: 62%',
      totalOrmawa: '4',
      anggotaOrmawa: '92 anggota terdaftar',
      totalKegiatan: '9',
      statusKegiatan: '7 selesai · 2 berjalan',
      tingkatPartisipasi: '86.4%',
      subPartisipasi: 'Kehadiran rata-rata kegiatan',
      jenisKegiatan: {
        labels: ['Akademik & Sains (4)', 'Olahraga & Seni (3)', 'Kewirausahaan (1)', 'Sosial & Pengabdian (1)'],
        data: [4, 3, 1, 1],
        colors: ['#5b55db', '#e34ea5', '#10b981', '#fb923c']
      },
      trenKegiatan: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        selesai: [1, 1, 2, 1, 1, 1],
        berjalan: [1, 0, 1, 0, 0, 0],
        partisipasi: [84, 85, 86, 87, 88, 86.4]
      }
    },
    'matematika': {
      totalMhs: '180',
      rasioGender: 'L: 45% · P: 55%',
      totalOrmawa: '3',
      anggotaOrmawa: '65 anggota terdaftar',
      totalKegiatan: '6',
      statusKegiatan: '4 selesai · 2 berjalan',
      tingkatPartisipasi: '84.0%',
      subPartisipasi: 'Kehadiran rata-rata kegiatan',
      jenisKegiatan: {
        labels: ['Akademik & Sains (3)', 'Olahraga & Seni (1)', 'Kewirausahaan (1)', 'Sosial & Pengabdian (1)'],
        data: [3, 1, 1, 1],
        colors: ['#5b55db', '#e34ea5', '#10b981', '#fb923c']
      },
      trenKegiatan: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        selesai: [1, 0, 1, 1, 1, 0],
        berjalan: [0, 1, 0, 1, 0, 0],
        partisipasi: [82, 83, 84, 85, 85, 84.0]
      }
    },
    'ilmu-komputer': {
      totalMhs: '395',
      rasioGender: 'L: 65% · P: 35%',
      totalOrmawa: '5',
      anggotaOrmawa: '120 anggota terdaftar',
      totalKegiatan: '12',
      statusKegiatan: '9 selesai · 3 berjalan',
      tingkatPartisipasi: '89.5%',
      subPartisipasi: 'Kehadiran rata-rata kegiatan',
      jenisKegiatan: {
        labels: ['Akademik & Sains (5)', 'Olahraga & Seni (3)', 'Kewirausahaan (2)', 'Sosial & Pengabdian (2)'],
        data: [5, 3, 2, 2],
        colors: ['#5b55db', '#e34ea5', '#10b981', '#fb923c']
      },
      trenKegiatan: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        selesai: [1, 2, 1, 2, 2, 1],
        berjalan: [1, 0, 1, 0, 1, 0],
        partisipasi: [86, 88, 89, 90, 91, 89.5]
      }
    },
    'farmasi': {
      totalMhs: '355',
      rasioGender: 'L: 25% · P: 75%',
      totalOrmawa: '4',
      anggotaOrmawa: '110 anggota terdaftar',
      totalKegiatan: '10',
      statusKegiatan: '7 selesai · 3 berjalan',
      tingkatPartisipasi: '87.0%',
      subPartisipasi: 'Kehadiran rata-rata kegiatan',
      jenisKegiatan: {
        labels: ['Akademik & Sains (4)', 'Olahraga & Seni (2)', 'Kewirausahaan (2)', 'Sosial & Pengabdian (2)'],
        data: [4, 2, 2, 2],
        colors: ['#5b55db', '#e34ea5', '#10b981', '#fb923c']
      },
      trenKegiatan: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        selesai: [1, 1, 2, 1, 1, 1],
        berjalan: [0, 1, 0, 1, 1, 0],
        partisipasi: [85, 86, 87, 88, 88, 87.0]
      }
    },
    'ppa': {
      totalMhs: '120',
      rasioGender: 'L: 30% · P: 70%',
      totalOrmawa: '2',
      anggotaOrmawa: '45 anggota terdaftar',
      totalKegiatan: '5',
      statusKegiatan: '4 selesai · 1 berjalan',
      tingkatPartisipasi: '83.5%',
      subPartisipasi: 'Kehadiran rata-rata kegiatan',
      jenisKegiatan: {
        labels: ['Akademik & Sains (2)', 'Olahraga & Seni (1)', 'Kewirausahaan (1)', 'Sosial & Pengabdian (1)'],
        data: [2, 1, 1, 1],
        colors: ['#5b55db', '#e34ea5', '#10b981', '#fb923c']
      },
      trenKegiatan: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        selesai: [1, 0, 1, 1, 1, 0],
        berjalan: [0, 1, 0, 0, 0, 0],
        partisipasi: [81, 82, 83, 85, 84, 83.5]
      }
    }
  };

  let wd3ChartMhsAngkatanInstance = null;
  let wd3ChartTrenKegiatanTahunanInstance = null;
  let wd3ChartDistribusiPrestasiInstance = null;
  let wd3ChartJenisOrmawaInstance = null;
  let wd3ChartPartisipasiProdiInstance = null;

  async function loadWakilDekan3Sections() {
    const container = document.getElementById('wd3Sections');
    if (!container) return;

    const files = [
      'wakil%20dekan%203/overview_mahasiswa.html',
      'wakil%20dekan%203/prestasi_dan_kesejahteraan_mahasiswa.html',
      'wakil%20dekan%203/analisis_dan_tren_kemahasiswaan.html'
    ];

    try {
      const htmls = await Promise.all(files.map(f => fetch(f).then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })));
      container.innerHTML = htmls.join('\n');
    } catch (e) {
      try {
        const fallback = [
          'wakil dekan 3/overview_mahasiswa.html',
          'wakil dekan 3/prestasi_dan_kesejahteraan_mahasiswa.html',
          'wakil dekan 3/analisis_dan_tren_kemahasiswaan.html'
        ];
        const htmls = await Promise.all(fallback.map(f => fetch(f).then(r => r.text())));
        container.innerHTML = htmls.join('\n');
      } catch (err) {
        console.error('Error loading wakil dekan 3 sections:', err);
      }
    }

    await new Promise(resolve => requestAnimationFrame(resolve));
  }

  function initWakilDekan3(activeProdi = 'semua') {
    const data = wd3Data[activeProdi] || wd3Data['semua'];

    // Update 4 Kartu Metrik Overview Mahasiswa
    const valTotalMhs = document.getElementById('valWd3TotalMhs');
    const subTotalMhs = document.getElementById('subWd3TotalMhs');
    const valOrmawa = document.getElementById('valWd3Ormawa');
    const subOrmawa = document.getElementById('subWd3Ormawa');
    const valKegiatan = document.getElementById('valWd3Kegiatan');
    const subKegiatan = document.getElementById('subWd3Kegiatan');
    const valPartisipasi = document.getElementById('valWd3Partisipasi');
    const subPartisipasi = document.getElementById('subWd3Partisipasi');

    if (valTotalMhs) valTotalMhs.textContent = data.totalMhs;
    if (subTotalMhs) subTotalMhs.textContent = data.rasioGender;
    if (valOrmawa) valOrmawa.textContent = data.totalOrmawa;
    if (subOrmawa) subOrmawa.textContent = data.anggotaOrmawa;
    if (valKegiatan) valKegiatan.textContent = data.totalKegiatan;
    if (subKegiatan) subKegiatan.textContent = data.statusKegiatan;
    if (valPartisipasi) valPartisipasi.textContent = data.tingkatPartisipasi;
    if (subPartisipasi) subPartisipasi.textContent = data.subPartisipasi;

    // Update 4 Kartu Metrik Prestasi & Kesejahteraan Mahasiswa
    const valTotalPrestasi = document.getElementById('valWd3TotalPrestasi');
    const subTotalPrestasi = document.getElementById('subWd3TotalPrestasi');
    const valPrestasiInternasional = document.getElementById('valWd3PrestasiInternasional');
    const subPrestasiNasional = document.getElementById('subWd3PrestasiNasional');
    const valPenerimaBeasiswa = document.getElementById('valWd3PenerimaBeasiswa');
    const subNominalBeasiswa = document.getElementById('subWd3NominalBeasiswa');
    const valMhsBerprestasi = document.getElementById('valWd3MhsBerprestasi');
    const subPrestasiRegionalLokal = document.getElementById('subWd3PrestasiRegionalLokal');

    if (valTotalPrestasi) valTotalPrestasi.textContent = data.totalPrestasi ?? '0';
    if (subTotalPrestasi) subTotalPrestasi.textContent = data.tahunPrestasi ?? 'Tahun 2026';
    if (valPrestasiInternasional) valPrestasiInternasional.textContent = data.prestasiInternasional ?? '0';
    if (subPrestasiNasional) subPrestasiNasional.textContent = data.subPrestasiNasional ?? 'Nasional: 0';
    if (valPenerimaBeasiswa) valPenerimaBeasiswa.textContent = data.penerimaBeasiswa ?? '0';
    if (subNominalBeasiswa) subNominalBeasiswa.textContent = data.nominalBeasiswa ?? 'Rp 0.0M total';
    if (valMhsBerprestasi) valMhsBerprestasi.textContent = data.mhsBerprestasi ?? '0';
    if (subPrestasiRegionalLokal) subPrestasiRegionalLokal.textContent = data.subRegionalLokal ?? 'Regional: 0 · Lokal: 0';

    // Chart 1: Distribusi Mahasiswa per Angkatan (Bar)
    const canvasMhsAngkatan = document.getElementById('chartWd3MhsAngkatan');
    if (canvasMhsAngkatan && typeof Chart !== 'undefined') {
      if (wd3ChartMhsAngkatanInstance) {
        wd3ChartMhsAngkatanInstance.destroy();
        wd3ChartMhsAngkatanInstance = null;
      }
      const ctxAngkatan = canvasMhsAngkatan.getContext('2d');
      wd3ChartMhsAngkatanInstance = new Chart(ctxAngkatan, {
        type: 'bar',
        data: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
          datasets: [{
            label: 'Mahasiswa Aktif',
            data: data.mhsAngkatan || [120, 160, 210, 280, 310, 160, 5],
            backgroundColor: '#3D818A',
            borderRadius: 6,
            maxBarThickness: 22
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y} mhs`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { size: 10.5, weight: '500' }, color: '#64748b' }
            },
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(226, 232, 240, 0.6)' },
              ticks: { font: { size: 10 }, color: '#64748b' }
            }
          }
        }
      });
    }

    // Chart 2: Tren Kegiatan Kemahasiswaan (Dual Axis Line/Area - Presisi Sesuai Desain Dashboard)
    const canvasTrenTahunan = document.getElementById('chartWd3TrenKegiatanTahunan');
    if (canvasTrenTahunan && typeof Chart !== 'undefined') {
      if (wd3ChartTrenKegiatanTahunanInstance) {
        wd3ChartTrenKegiatanTahunanInstance.destroy();
        wd3ChartTrenKegiatanTahunanInstance = null;
      }
      const ctxTahunan = canvasTrenTahunan.getContext('2d');
      wd3ChartTrenKegiatanTahunanInstance = new Chart(ctxTahunan, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
          datasets: [
            {
              label: 'Jumlah Kegiatan',
              data: [3, 5, 4, 6, 8, 7, 5, 4, 6, 7, 5, 3],
              borderColor: '#0D0B61',
              backgroundColor: 'rgba(13, 11, 97, 0.12)',
              fill: true,
              tension: 0.35,
              borderWidth: 2.5,
              pointRadius: 4,
              pointBackgroundColor: '#0D0B61',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 1.5,
              yAxisID: 'y'
            },
            {
              label: 'Total Partisipasi',
              data: [120, 180, 150, 200, 250, 220, 180, 160, 200, 230, 180, 140],
              borderColor: '#3D818A',
              backgroundColor: 'transparent',
              fill: false,
              tension: 0.35,
              borderWidth: 2.5,
              pointRadius: 4,
              pointBackgroundColor: '#3D818A',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 1.5,
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false
          },
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
              min: 0,
              max: 8,
              position: 'left',
              title: {
                display: true,
                text: 'Jumlah Kegiatan',
                font: { size: 10, weight: '500' },
                color: '#64748b'
              },
              grid: { color: 'rgba(226, 232, 240, 0.6)' },
              ticks: { font: { size: 10 }, color: '#64748b', stepSize: 1 }
            },
            y1: {
              beginAtZero: true,
              min: 0,
              max: 250,
              position: 'right',
              title: {
                display: true,
                text: 'Partisipasi',
                font: { size: 10, weight: '500' },
                color: '#64748b'
              },
              grid: { display: false },
              ticks: { font: { size: 10 }, color: '#64748b', stepSize: 50 }
            }
          }
        }
      });
    }

    // Chart 3: Distribusi Jenis Prestasi (Bar - Palette Dashboard)
    const canvasDistPrestasi = document.getElementById('chartWd3DistribusiPrestasi');
    if (canvasDistPrestasi && typeof Chart !== 'undefined') {
      if (wd3ChartDistribusiPrestasiInstance) {
        wd3ChartDistribusiPrestasiInstance.destroy();
        wd3ChartDistribusiPrestasiInstance = null;
      }
      const ctxPrestasi = canvasDistPrestasi.getContext('2d');
      wd3ChartDistribusiPrestasiInstance = new Chart(ctxPrestasi, {
        type: 'bar',
        data: {
          labels: ['Akademik', 'Seni', 'Olahraga', 'Teknologi', 'Sosial'],
          datasets: [{
            label: 'Prestasi',
            data: data.distribusiPrestasi || [18, 12, 10, 8, 4],
            backgroundColor: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92'],
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
    }

    // Chart 4: Jenis Organisasi Mahasiswa (Donut/Pie Chart - Palette Dashboard)
    const canvasJenisOrmawa = document.getElementById('chartWd3JenisOrmawa');
    if (canvasJenisOrmawa && typeof Chart !== 'undefined') {
      if (wd3ChartJenisOrmawaInstance) {
        wd3ChartJenisOrmawaInstance.destroy();
        wd3ChartJenisOrmawaInstance = null;
      }
      const ctxOrmawa = canvasJenisOrmawa.getContext('2d');
      wd3ChartJenisOrmawaInstance = new Chart(ctxOrmawa, {
        type: 'pie',
        data: {
          labels: ['UKM & Komunitas', 'Himpunan Mahasiswa', 'BEM & DPM', 'Lainnya'],
          datasets: [{
            data: [12, 6, 3, 1],
            backgroundColor: ['#0D0B61', '#294669', '#3D818A', '#E5D026'],
            borderWidth: 2,
            borderColor: '#ffffff'
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
                font: { size: 10, weight: '500' },
                color: '#64748b'
              }
            },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${ctx.label}: ${ctx.parsed} ormawa`
              }
            }
          }
        }
      });
    }

    // Chart 5: Partisipasi per Prodi (Bar - Palette Dashboard)
    const canvasPartisipasiProdi = document.getElementById('chartWd3PartisipasiProdi');
    if (canvasPartisipasiProdi && typeof Chart !== 'undefined') {
      if (wd3ChartPartisipasiProdiInstance) {
        wd3ChartPartisipasiProdiInstance.destroy();
        wd3ChartPartisipasiProdiInstance = null;
      }
      const ctxPartisipasi = canvasPartisipasiProdi.getContext('2d');
      wd3ChartPartisipasiProdiInstance = new Chart(ctxPartisipasi, {
        type: 'bar',
        data: {
          labels: ['Biologi', 'Kimia', 'Matematika', 'Ilkom', 'Farmasi', 'PPA'],
          datasets: [{
            label: 'Partisipasi Mahasiswa',
            data: data.partisipasiProdi || [42, 54, 38, 76, 68, 22],
            backgroundColor: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92', '#722F99'],
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
                label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y} partisipan`
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
    }

    // Bind Filter Tabs for WD3
    const tabs = document.querySelectorAll('.filter-tab[data-wd3-prodi]');
    tabs.forEach(tab => {
      if (tab.dataset.bound === 'true') return;
      tab.dataset.bound = 'true';
      tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const prodi = this.dataset.wd3Prodi;
        initWakilDekan3(prodi);
      });
    });

    // Bind Dropdown Filters for WD3
    const tahunSelectWd3 = document.getElementById('filterTahunWd3');
    if (tahunSelectWd3 && !tahunSelectWd3.dataset.bound) {
      tahunSelectWd3.dataset.bound = 'true';
      tahunSelectWd3.addEventListener('change', function() {
        const activeTab = document.querySelector('.filter-tab[data-wd3-prodi].active');
        initWakilDekan3(activeTab ? activeTab.dataset.wd3Prodi : 'semua');
      });
    }

    const angkatanSelectWd3 = document.getElementById('filterAngkatanWd3');
    if (angkatanSelectWd3 && !angkatanSelectWd3.dataset.bound) {
      angkatanSelectWd3.dataset.bound = 'true';
      angkatanSelectWd3.addEventListener('change', function() {
        const activeTab = document.querySelector('.filter-tab[data-wd3-prodi].active');
        initWakilDekan3(activeTab ? activeTab.dataset.wd3Prodi : 'semua');
      });
    }

    const genderSelectWd3 = document.getElementById('filterGenderWd3');
    if (genderSelectWd3 && !genderSelectWd3.dataset.bound) {
      genderSelectWd3.dataset.bound = 'true';
      genderSelectWd3.addEventListener('change', function() {
        const activeTab = document.querySelector('.filter-tab[data-wd3-prodi].active');
        initWakilDekan3(activeTab ? activeTab.dataset.wd3Prodi : 'semua');
      });
    }

    const prestasiSelectWd3 = document.getElementById('filterPrestasiWd3');
    if (prestasiSelectWd3 && !prestasiSelectWd3.dataset.bound) {
      prestasiSelectWd3.dataset.bound = 'true';
      prestasiSelectWd3.addEventListener('change', function() {
        const activeTab = document.querySelector('.filter-tab[data-wd3-prodi].active');
        initWakilDekan3(activeTab ? activeTab.dataset.wd3Prodi : 'semua');
      });
    }

    initCustomSelectPills();
  }

  // --- DATA OPERASIONAL DOSEN ---
  let dosenChartStatusInstance = null;
  let dosenChartJabatanInstance = null;
  let dosenChartSertifikasiInstance = null;
  let dosenChartPendidikanInstance = null;
  let currentDosenProdi = 'semua';
  let currentDosenStatus = 'semua';
  let currentDosenPeriode = '2025/2026 Ganjil';

  const dosenData = {
    'semua': {
      namaProdi: 'Semua Program Studi',
      total: 156,
      guruBesar: 4,
      s3: 52,
      sertifikasiPersen: 72,
      statusDosen: {
        labels: ['Aktif (142)', 'Cuti (8)', 'Tugas Belajar (6)'],
        data: [142, 8, 6],
        colors: ['#3D818A', '#E5D026', '#294669']
      },
      statusPensiun: {
        labels: ['Pensiun (12)', 'Meninggal (3)'],
        data: [12, 3],
        colors: ['#EF4444', '#94A3B8']
      },
      jabatanDosen: {
        labels: ['Asisten Ahli', 'Lektor', 'Lektor Kepala', 'Guru Besar', 'Tenaga Pengajar'],
        data: [46, 53, 45, 4, 8],
        colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
      },
      sertifikasiDosen: {
        bersertifikat: 112,
        belum: 44,
        persen: 72
      },
      strataPendidikan: {
        labels: ['S3 (Doktor)', 'S2 (Magister)', 'Spesialis'],
        data: [52, 98, 6],
        colors: ['#0D0B61', '#3D818A', '#E5D026']
      }
    },
    'biologi': {
      namaProdi: 'Biologi',
      total: 25,
      guruBesar: 1,
      s3: 11,
      sertifikasiPersen: 80,
      statusDosen: {
        labels: ['Aktif (23)', 'Cuti (1)', 'Tugas Belajar (1)'],
        data: [23, 1, 1],
        colors: ['#3D818A', '#E5D026', '#294669']
      },
      statusPensiun: {
        labels: ['Pensiun (2)', 'Meninggal (0)'],
        data: [2, 0],
        colors: ['#EF4444', '#94A3B8']
      },
      jabatanDosen: {
        labels: ['Asisten Ahli', 'Lektor', 'Lektor Kepala', 'Guru Besar', 'Tenaga Pengajar'],
        data: [6, 9, 8, 1, 1],
        colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
      },
      sertifikasiDosen: {
        bersertifikat: 20,
        belum: 5,
        persen: 80
      },
      strataPendidikan: {
        labels: ['S3 (Doktor)', 'S2 (Magister)', 'Spesialis'],
        data: [11, 14, 0],
        colors: ['#0D0B61', '#3D818A', '#E5D026']
      }
    },
    'kimia': {
      namaProdi: 'Kimia',
      total: 28,
      guruBesar: 1,
      s3: 12,
      sertifikasiPersen: 75,
      statusDosen: {
        labels: ['Aktif (25)', 'Cuti (2)', 'Tugas Belajar (1)'],
        data: [25, 2, 1],
        colors: ['#3D818A', '#E5D026', '#294669']
      },
      statusPensiun: {
        labels: ['Pensiun (1)', 'Meninggal (1)'],
        data: [1, 1],
        colors: ['#EF4444', '#94A3B8']
      },
      jabatanDosen: {
        labels: ['Asisten Ahli', 'Lektor', 'Lektor Kepala', 'Guru Besar', 'Tenaga Pengajar'],
        data: [7, 10, 9, 1, 1],
        colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
      },
      sertifikasiDosen: {
        bersertifikat: 21,
        belum: 7,
        persen: 75
      },
      strataPendidikan: {
        labels: ['S3 (Doktor)', 'S2 (Magister)', 'Spesialis'],
        data: [12, 16, 0],
        colors: ['#0D0B61', '#3D818A', '#E5D026']
      }
    },
    'matematika': {
      namaProdi: 'Matematika',
      total: 20,
      guruBesar: 0,
      s3: 6,
      sertifikasiPersen: 70,
      statusDosen: {
        labels: ['Aktif (19)', 'Cuti (1)', 'Tugas Belajar (0)'],
        data: [19, 1, 0],
        colors: ['#3D818A', '#E5D026', '#294669']
      },
      statusPensiun: {
        labels: ['Pensiun (2)', 'Meninggal (0)'],
        data: [2, 0],
        colors: ['#EF4444', '#94A3B8']
      },
      jabatanDosen: {
        labels: ['Asisten Ahli', 'Lektor', 'Lektor Kepala', 'Guru Besar', 'Tenaga Pengajar'],
        data: [6, 8, 5, 0, 1],
        colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
      },
      sertifikasiDosen: {
        bersertifikat: 14,
        belum: 6,
        persen: 70
      },
      strataPendidikan: {
        labels: ['S3 (Doktor)', 'S2 (Magister)', 'Spesialis'],
        data: [6, 14, 0],
        colors: ['#0D0B61', '#3D818A', '#E5D026']
      }
    },
    'ilmu-komputer': {
      namaProdi: 'Ilmu Komputer',
      total: 38,
      guruBesar: 1,
      s3: 10,
      sertifikasiPersen: 68,
      statusDosen: {
        labels: ['Aktif (34)', 'Cuti (2)', 'Tugas Belajar (2)'],
        data: [34, 2, 2],
        colors: ['#3D818A', '#E5D026', '#294669']
      },
      statusPensiun: {
        labels: ['Pensiun (3)', 'Meninggal (1)'],
        data: [3, 1],
        colors: ['#EF4444', '#94A3B8']
      },
      jabatanDosen: {
        labels: ['Asisten Ahli', 'Lektor', 'Lektor Kepala', 'Guru Besar', 'Tenaga Pengajar'],
        data: [14, 12, 9, 1, 2],
        colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
      },
      sertifikasiDosen: {
        bersertifikat: 26,
        belum: 12,
        persen: 68
      },
      strataPendidikan: {
        labels: ['S3 (Doktor)', 'S2 (Magister)', 'Spesialis'],
        data: [10, 28, 0],
        colors: ['#0D0B61', '#3D818A', '#E5D026']
      }
    },
    'farmasi': {
      namaProdi: 'Farmasi',
      total: 32,
      guruBesar: 1,
      s3: 10,
      sertifikasiPersen: 75,
      statusDosen: {
        labels: ['Aktif (29)', 'Cuti (1)', 'Tugas Belajar (2)'],
        data: [29, 1, 2],
        colors: ['#3D818A', '#E5D026', '#294669']
      },
      statusPensiun: {
        labels: ['Pensiun (3)', 'Meninggal (1)'],
        data: [3, 1],
        colors: ['#EF4444', '#94A3B8']
      },
      jabatanDosen: {
        labels: ['Asisten Ahli', 'Lektor', 'Lektor Kepala', 'Guru Besar', 'Tenaga Pengajar'],
        data: [9, 10, 10, 1, 2],
        colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
      },
      sertifikasiDosen: {
        bersertifikat: 24,
        belum: 8,
        persen: 75
      },
      strataPendidikan: {
        labels: ['S3 (Doktor)', 'S2 (Magister)', 'Spesialis'],
        data: [10, 18, 4],
        colors: ['#0D0B61', '#3D818A', '#E5D026']
      }
    },
    'ppa': {
      namaProdi: 'Pendidikan Profesi Apoteker',
      total: 13,
      guruBesar: 0,
      s3: 3,
      sertifikasiPersen: 54,
      statusDosen: {
        labels: ['Aktif (12)', 'Cuti (1)', 'Tugas Belajar (0)'],
        data: [12, 1, 0],
        colors: ['#3D818A', '#E5D026', '#294669']
      },
      statusPensiun: {
        labels: ['Pensiun (1)', 'Meninggal (0)'],
        data: [1, 0],
        colors: ['#EF4444', '#94A3B8']
      },
      jabatanDosen: {
        labels: ['Asisten Ahli', 'Lektor', 'Lektor Kepala', 'Guru Besar', 'Tenaga Pengajar'],
        data: [4, 4, 4, 0, 1],
        colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
      },
      sertifikasiDosen: {
        bersertifikat: 7,
        belum: 6,
        persen: 54
      },
      strataPendidikan: {
        labels: ['S3 (Doktor)', 'S2 (Magister)', 'Spesialis'],
        data: [3, 8, 2],
        colors: ['#0D0B61', '#3D818A', '#E5D026']
      }
    }
  };

  async function loadDosenSections() {
    const container = document.getElementById('dosenSections');
    if (!container) return;

    const files = [
      'dosen/statistik_dosen.html',
      'dosen/jabatan_akademik_dosen.html',
      'dosen/progress_studi_lanjut_dosen.html',
      'dosen/data_dosen_per_prodi.html'
    ];
    try {
      const htmls = await Promise.all(files.map(f => fetch(f).then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })));
      container.innerHTML = htmls.join('\n');
    } catch (e) {
      console.error('Error loading dosen sections:', e);
    }
  }

  // --- DATA PENINGKATAN JABATAN AKADEMIK DOSEN (2000 - 2026) ---
  let dosenChartPeningkatanJabatanInstance = null;
  let currentJabatanTahunAwal = 2000;
  let currentJabatanTahunAkhir = 2026;

  const riwayatJabatanDosen = {
    'semua': {
      guruBesar:      [1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      lektorKepala:   [8, 9, 9, 10, 11, 12, 13, 15, 16, 18, 19, 21, 22, 24, 25, 27, 28, 29, 30, 31, 32, 33, 34, 34, 35, 35, 35],
      lektor:         [18, 19, 21, 22, 24, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 44, 46, 47, 48, 49, 50, 51, 51, 52, 52, 52, 52],
      asistenAhli:    [15, 16, 17, 18, 20, 21, 23, 24, 26, 27, 29, 30, 32, 33, 34, 35, 35, 36, 36, 37, 37, 38, 38, 38, 38, 38, 38],
      tenagaPengajar: [6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 12, 12, 11, 11, 10, 10, 11, 11, 11, 11, 11, 11]
    },
    'biologi': {
      guruBesar:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      lektorKepala:   [2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
      lektor:         [3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      asistenAhli:    [2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
      tenagaPengajar: [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    },
    'kimia': {
      guruBesar:      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      lektorKepala:   [1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6],
      lektor:         [3, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
      asistenAhli:    [2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      tenagaPengajar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    },
    'matematika': {
      guruBesar:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      lektorKepala:   [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5],
      lektor:         [2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
      asistenAhli:    [2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      tenagaPengajar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    'ilmu-komputer': {
      guruBesar:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      lektorKepala:   [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 9],
      lektor:         [3, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 10, 11, 11, 12, 12, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14],
      asistenAhli:    [3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
      tenagaPengajar: [1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    },
    'farmasi': {
      guruBesar:      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      lektorKepala:   [2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8],
      lektor:         [5, 5, 6, 6, 7, 7, 8, 8, 9, 10, 10, 11, 11, 12, 12, 12, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14],
      asistenAhli:    [4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      tenagaPengajar: [1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    },
    'ppa': {
      guruBesar:      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      lektorKepala:   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      lektor:         [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      asistenAhli:    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      tenagaPengajar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    }
  };

  function initPeningkatanJabatanDosen(activeProdi = 'semua') {
    const canvas = document.getElementById('chartPeningkatanJabatanDosen');
    if (!canvas) return;

    const selectAwal = document.getElementById('filterJabatanTahunAwal');
    const selectAkhir = document.getElementById('filterJabatanTahunAkhir');
    const labelRentang = document.getElementById('labelRentangTahun');

    // Isi dropdown tahun 2000 - 2026 jika masih kosong
    if (selectAwal && selectAwal.options.length === 0) {
      for (let y = 2000; y <= 2026; y++) {
        selectAwal.add(new Option(y, y, false, y === currentJabatanTahunAwal));
      }
    }
    if (selectAkhir && selectAkhir.options.length === 0) {
      for (let y = 2000; y <= 2026; y++) {
        selectAkhir.add(new Option(y, y, false, y === currentJabatanTahunAkhir));
      }
    }

    if (selectAwal && !selectAwal.dataset.bound) {
      selectAwal.dataset.bound = 'true';
      selectAwal.addEventListener('change', function() {
        const val = parseInt(this.value);
        if (val > currentJabatanTahunAkhir) {
          this.value = currentJabatanTahunAkhir;
          currentJabatanTahunAwal = currentJabatanTahunAkhir;
        } else {
          currentJabatanTahunAwal = val;
        }
        initPeningkatanJabatanDosen(currentDosenProdi);
      });
    }

    if (selectAkhir && !selectAkhir.dataset.bound) {
      selectAkhir.dataset.bound = 'true';
      selectAkhir.addEventListener('change', function() {
        const val = parseInt(this.value);
        if (val < currentJabatanTahunAwal) {
          this.value = currentJabatanTahunAwal;
          currentJabatanTahunAkhir = currentJabatanTahunAwal;
        } else {
          currentJabatanTahunAkhir = val;
        }
        initPeningkatanJabatanDosen(currentDosenProdi);
      });
    }

    const startIdx = currentJabatanTahunAwal - 2000;
    const endIdx = currentJabatanTahunAkhir - 2000;
    const allYears = Array.from({ length: 27 }, (_, i) => 2000 + i);
    const slicedYears = allYears.slice(startIdx, endIdx + 1);

    if (labelRentang) {
      const spanYears = (currentJabatanTahunAkhir - currentJabatanTahunAwal) + 1;
      labelRentang.textContent = `${currentJabatanTahunAwal} - ${currentJabatanTahunAkhir} (${spanYears} Tahun)`;
    }

    const dataObj = riwayatJabatanDosen[activeProdi] || riwayatJabatanDosen['semua'];

    const gbSlice = dataObj.guruBesar.slice(startIdx, endIdx + 1);
    const lkSlice = dataObj.lektorKepala.slice(startIdx, endIdx + 1);
    const lektorSlice = dataObj.lektor.slice(startIdx, endIdx + 1);
    const aaSlice = dataObj.asistenAhli.slice(startIdx, endIdx + 1);
    const tpSlice = dataObj.tenagaPengajar.slice(startIdx, endIdx + 1);

    // Update 5 Stat Cards
    const updateCard = (valId, diffId, baseId, sliceArr) => {
      const elVal = document.getElementById(valId);
      const elDiff = document.getElementById(diffId);
      const elBase = document.getElementById(baseId);

      const baseVal = sliceArr[0];
      const endVal = sliceArr[sliceArr.length - 1];
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

    // Render / Update Chart.js
    if (dosenChartPeningkatanJabatanInstance) {
      dosenChartPeningkatanJabatanInstance.destroy();
      dosenChartPeningkatanJabatanInstance = null;
    }

    dosenChartPeningkatanJabatanInstance = new Chart(canvas, {
      type: 'line',
      data: {
        labels: slicedYears,
        datasets: [
          {
            label: 'Guru Besar',
            data: gbSlice,
            borderColor: '#E5D026',
            backgroundColor: 'rgba(229, 208, 38, 0.15)',
            pointBackgroundColor: '#E5D026',
            pointBorderColor: '#ffffff',
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2.5,
            tension: 0.15,
            fill: false
          },
          {
            label: 'Lektor Kepala',
            data: lkSlice,
            borderColor: '#3D818A',
            backgroundColor: 'rgba(61, 129, 138, 0.15)',
            pointBackgroundColor: '#3D818A',
            pointBorderColor: '#ffffff',
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2.5,
            tension: 0.15,
            fill: false
          },
          {
            label: 'Lektor',
            data: lektorSlice,
            borderColor: '#1e3a5f',
            backgroundColor: 'rgba(30, 58, 95, 0.15)',
            pointBackgroundColor: '#1e3a5f',
            pointBorderColor: '#ffffff',
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2.5,
            tension: 0.15,
            fill: false
          },
          {
            label: 'Asisten Ahli',
            data: aaSlice,
            borderColor: '#294669',
            backgroundColor: 'rgba(41, 70, 105, 0.15)',
            pointBackgroundColor: '#294669',
            pointBorderColor: '#ffffff',
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2.5,
            tension: 0.15,
            fill: false
          },
          {
            label: 'Tenaga Pengajar',
            data: tpSlice,
            borderColor: '#0D0B61',
            backgroundColor: 'rgba(13, 11, 97, 0.15)',
            pointBackgroundColor: '#0D0B61',
            pointBorderColor: '#ffffff',
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2.5,
            tension: 0.15,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#1e293b',
            titleColor: '#f8fafc',
            bodyColor: '#f8fafc',
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y} Dosen`
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(0, 0, 0, 0.04)'
            },
            ticks: {
              font: {
                size: 11,
                weight: 600
              },
              color: '#475569'
            },
            title: {
              display: true,
              text: 'Tahun',
              color: '#334155',
              font: {
                size: 12,
                weight: 700
              }
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.06)'
            },
            ticks: {
              stepSize: 5,
              font: {
                size: 11
              },
              color: '#475569'
            },
            title: {
              display: true,
              text: 'Jumlah Dosen',
              color: '#334155',
              font: {
                size: 12,
                weight: 700
              }
            }
          }
        }
      }
    });
  }

  function initDosen(activeProdi = 'semua', activeStatus = 'semua') {
    const canvasStatus = document.getElementById('chartDosenStatus');
    const canvasJabatan = document.getElementById('chartDosenJabatan');
    const canvasSertif = document.getElementById('chartDosenSertifikasi');
    const canvasPendidikan = document.getElementById('chartDosenPendidikan');

    if (!canvasStatus || !canvasJabatan || !canvasSertif || !canvasPendidikan) return;

    currentDosenProdi = activeProdi;
    currentDosenStatus = activeStatus;
    const data = dosenData[activeProdi] || dosenData['semua'];

    // Update footers & text
    const footerTotal = document.getElementById('footerTotalDosen');
    const footerGuruBesar = document.getElementById('footerGuruBesarDosen');
    const footerSertif = document.getElementById('footerSertifikasiDosen');
    const countSertifYa = document.getElementById('countSertifYa');
    const countSertifTidak = document.getElementById('countSertifTidak');
    const footerS3 = document.getElementById('footerS3Dosen');
    const rekapLabelStatus = document.getElementById('rekapLabelStatus');

    // Update Top Row 4 Metric Cards
    const valTotal = document.getElementById('valDosenTotal');
    const valSertif = document.getElementById('valDosenSertifPersen');
    const subSertif = document.getElementById('subDosenSertifCount');
    const valGuruBesar = document.getElementById('valDosenGuruBesar');
    const valS3 = document.getElementById('valDosenS3');
    const subS3 = document.getElementById('subDosenS3');

    if (valTotal) valTotal.textContent = data.total;
    if (valSertif) valSertif.textContent = `${data.sertifikasiDosen.persen}%`;
    if (subSertif) subSertif.textContent = `${data.sertifikasiDosen.bersertifikat} Bersertifikat`;
    if (valGuruBesar) valGuruBesar.textContent = data.guruBesar;
    if (valS3) valS3.textContent = data.s3;
    if (subS3) {
      const pct = ((data.s3 / (data.total || 1)) * 100).toFixed(1);
      subS3.textContent = `${pct}% dari Total`;
    }

    if (footerTotal) footerTotal.textContent = `Total: ${data.total} dosen`;
    if (footerGuruBesar) footerGuruBesar.textContent = `Guru Besar: ${data.guruBesar} dosen`;
    if (footerSertif) footerSertif.textContent = `${data.sertifikasiDosen.persen}% bersertifikat`;
    if (countSertifYa) countSertifYa.textContent = data.sertifikasiDosen.bersertifikat;
    if (countSertifTidak) countSertifTidak.textContent = data.sertifikasiDosen.belum;
    if (footerS3) footerS3.textContent = `S3: ${data.s3} dosen`;

    if (rekapLabelStatus) {
      const statusText = activeStatus === 'pensiun' ? 'Status: Pensiun' : (activeStatus === 'semua' ? 'Semua Status (Terkini)' : `Status: ${activeStatus}`);
      rekapLabelStatus.textContent = `Filter Terpilih: ${data.namaProdi} · ${statusText}`;
    }

    // Destroy chart instances if already exist
    if (dosenChartStatusInstance) {
      dosenChartStatusInstance.destroy();
      dosenChartStatusInstance = null;
    }
    if (dosenChartJabatanInstance) {
      dosenChartJabatanInstance.destroy();
      dosenChartJabatanInstance = null;
    }
    if (dosenChartSertifikasiInstance) {
      dosenChartSertifikasiInstance.destroy();
      dosenChartSertifikasiInstance = null;
    }
    if (dosenChartPendidikanInstance) {
      dosenChartPendidikanInstance.destroy();
      dosenChartPendidikanInstance = null;
    }

    // Status Dosen Chart Data (sesuai filter status)
    let statusChartData = data.statusDosen;
    if (activeStatus === 'pensiun') {
      statusChartData = data.statusPensiun;
    } else if (activeStatus === 'aktif') {
      const aktifCount = data.statusDosen.data[0];
      statusChartData = {
        labels: [`Aktif (${aktifCount})`],
        data: [aktifCount],
        colors: ['#3D818A']
      };
    } else if (activeStatus === 'cuti') {
      const cutiCount = data.statusDosen.data[1];
      statusChartData = {
        labels: [`Cuti (${cutiCount})`],
        data: [cutiCount],
        colors: ['#E5D026']
      };
    } else if (activeStatus === 'tugas_belajar') {
      const tbCount = data.statusDosen.data[2];
      statusChartData = {
        labels: [`Tugas Belajar (${tbCount})`],
        data: [tbCount],
        colors: ['#294669']
      };
    }

    // 1. Chart Status Dosen (Doughnut)
    dosenChartStatusInstance = new Chart(canvasStatus.getContext('2d'), {
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
            labels: {
              boxWidth: 8,
              boxHeight: 8,
              usePointStyle: true,
              font: { size: 10.5, weight: '500' },
              padding: 8,
              color: '#475569'
            }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}`
            }
          }
        }
      }
    });

    // 2. Chart Jabatan Akademik (Vertical Bar - Persis Screenshot)
    dosenChartJabatanInstance = new Chart(canvasJabatan.getContext('2d'), {
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
            callbacks: {
              label: (ctx) => ` ${ctx.parsed.y} Dosen`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 10, weight: '600' }, color: '#475569' }
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(226, 232, 240, 0.6)' },
            ticks: { font: { size: 9.5 }, color: '#64748b', stepSize: 2 }
          }
        }
      }
    });

    // 3. Chart Sertifikasi Dosen (Doughnut Clean - Warna Dashboard)
    dosenChartSertifikasiInstance = new Chart(canvasSertif.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Sudah Sertifikasi', 'Belum Sertifikasi'],
        datasets: [{
          data: [data.sertifikasiDosen.bersertifikat, data.sertifikasiDosen.belum],
          backgroundColor: ['#3D818A', '#E5D026'],
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
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed} Dosen`
            }
          }
        }
      }
    });

    // 4. Chart Strata Pendidikan Terakhir (Doughnut)
    dosenChartPendidikanInstance = new Chart(canvasPendidikan.getContext('2d'), {
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
            labels: {
              boxWidth: 8,
              boxHeight: 8,
              usePointStyle: true,
              font: { size: 10.5, weight: '500' },
              padding: 8,
              color: '#475569'
            }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed} Dosen`
            }
          }
        }
      }
    });

    // Bind Filter Tabs Dosen
    const tabs = document.querySelectorAll('.filter-tab[data-dosen-prodi]');
    tabs.forEach(tab => {
      if (tab.dataset.bound === 'true') return;
      tab.dataset.bound = 'true';
      tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const prodi = this.dataset.dosenProdi;
        initDosen(prodi, currentDosenStatus);
      });
    });

    // Bind Filter Status Dropdown
    const statusSelect = document.getElementById('filterStatusDosen');
    if (statusSelect && !statusSelect.dataset.bound) {
      statusSelect.dataset.bound = 'true';
      statusSelect.addEventListener('change', function() {
        initDosen(currentDosenProdi, this.value);
      });
    }

    // Bind Filter Periode Dropdown
    const periodeSelect = document.getElementById('filterPeriodeDosen');
    if (periodeSelect && !periodeSelect.dataset.bound) {
      periodeSelect.dataset.bound = 'true';
      periodeSelect.addEventListener('change', function() {
        currentDosenPeriode = this.value;
        const rekapStatus = document.getElementById('rekapLabelStatus');
        if (rekapStatus) {
          rekapStatus.textContent = `Filter Terpilih: ${data.namaProdi} · ${currentDosenPeriode}`;
        }
      });
    }

    // Bind Tab Pills Chart 2 (Status Dosen / Strata Pendidikan / Sertifikasi)
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

    // Panggil inisialisasi Peningkatan Jabatan Akademik Dosen (Chart 2000-2026)
    initPeningkatanJabatanDosen(currentDosenProdi);

    // Panggil inisialisasi Progress Studi Lanjut S3 Dosen
    initProgressStudiLanjut();

    // Panggil inisialisasi Data Dosen FMIPA Per Prodi
    initDataDosenPerProdi(currentDosenProdi !== 'semua' ? currentDosenProdi : null);

    initCustomSelectPills();
  }

  // ============================================================
  // --- 1. PROGRESS STUDI LANJUT S3 DOSEN ---
  // ============================================================
  const dataStudiLanjutS3 = [
    {
      nama: 'Dr. (Cand.) Andi Setiawan, M.Si.',
      nidn: '0415088201',
      prodi: 'Biologi',
      universitas: 'Institut Pertanian Bogor (IPB)',
      bidang: 'Bioteknologi Tanaman Tropika',
      tahap: 'Penyusunan Disertasi & Publikasi Q1 Scopus',
      progress: 85,
      targetSelesai: 'Semester Ganjil 2026/2027',
      status: 'Tugas Belajar'
    },
    {
      nama: 'Dr. (Cand.) Rina Kurniawati, M.Kom.',
      nidn: '0422038702',
      prodi: 'Ilmu Komputer',
      universitas: 'Universitas Indonesia (UI)',
      bidang: 'Artificial Intelligence & Deep Learning',
      tahap: 'Sidang Hasil Penelitian Laboratorium',
      progress: 90,
      targetSelesai: 'Semester Ganjil 2026/2027',
      status: 'Tugas Belajar'
    },
    {
      nama: 'Dr. (Cand.) Hendra Gunawan, M.Farm., Apt.',
      nidn: '0409118503',
      prodi: 'Farmasi',
      universitas: 'Universitas Gadjah Mada (UGM)',
      bidang: 'Farmakologi Bahan Alam & Drug Delivery',
      tahap: 'Penelitian Laboratorium Tahap Akhir',
      progress: 75,
      targetSelesai: 'Semester Genap 2026/2027',
      status: 'Tugas Belajar'
    },
    {
      nama: 'Dr. (Cand.) Ratna Dewi, M.Si.',
      nidn: '0418048601',
      prodi: 'Kimia',
      universitas: 'Institut Teknologi Bandung (ITB)',
      bidang: 'Kimia Katalisis & Green Chemistry',
      tahap: 'Ujian Kualifikasi & Uji Laboratorium Lanjutan',
      progress: 65,
      targetSelesai: 'Semester Genap 2026/2027',
      status: 'Izin Belajar'
    },
    {
      nama: 'Dr. (Cand.) Fajar Nugraha, M.Si.',
      nidn: '0405078902',
      prodi: 'Matematika',
      universitas: 'Universitas Padjadjaran (UNPAD)',
      bidang: 'Pemodelan Matematika Finansial Stokastik',
      tahap: 'Penyusunan Proposal Disertasi & Publikasi Ilmiah',
      progress: 55,
      targetSelesai: 'Tahun Akademik 2027/2028',
      status: 'Tugas Belajar'
    },
    {
      nama: 'Dr. (Cand.) Maya Puspitasari, M.Farm.',
      nidn: '0429128804',
      prodi: 'Pendidikan Profesi Apoteker',
      universitas: 'Universiti Malaya (UM)',
      bidang: 'Clinical Pharmacy & Patient Safety',
      tahap: 'Analisis Data Klinis Multicenter',
      progress: 70,
      targetSelesai: 'Semester Genap 2026/2027',
      status: 'Tugas Belajar'
    }
  ];

  let currentStudiPage = 0;
  const itemsPerStudiPage = 3;

  function renderStudiLanjutCards() {
    const container = document.getElementById('studiLanjutContainer');
    const btnPrev = document.getElementById('btnStudiPrev');
    const btnNext = document.getElementById('btnStudiNext');
    if (!container) return;

    const totalPages = Math.ceil(dataStudiLanjutS3.length / itemsPerStudiPage);
    const startIdx = currentStudiPage * itemsPerStudiPage;
    const currentItems = dataStudiLanjutS3.slice(startIdx, startIdx + itemsPerStudiPage);

    container.innerHTML = currentItems.map(item => {
      const initials = item.nama.replace(/^(Dr\.|Prof\.|Ir\.|Dra\.|Drs\.)\s*/gi, '')
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
              <p>NIDN: ${item.nidn} · <span class="text-emerald-700 font-semibold">${item.prodi}</span></p>
            </div>
          </div>
          <div class="studi-univ-badge">
            <i class="fas fa-university text-emerald-600 text-xs"></i>
            <span>${item.universitas}</span>
          </div>
          <div class="text-[11.5px] text-slate-500 mb-2.5">
            <span class="font-semibold text-slate-700">Fokus:</span> ${item.bidang}
          </div>
          <div class="studi-progress-wrapper">
            <div class="studi-progress-labels">
              <span class="truncate max-w-[190px] text-slate-600" title="${item.tahap}">${item.tahap}</span>
              <span class="text-emerald-700 font-bold">${item.progress}%</span>
            </div>
            <div class="studi-progress-bar-bg">
              <div class="studi-progress-bar-fill" style="width: ${item.progress}%"></div>
            </div>
            <div class="flex justify-between items-center text-[10.5px] text-slate-400 mt-2">
              <span>Target: <strong class="text-slate-600">${item.targetSelesai}</strong></span>
              <span class="bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-medium">${item.status}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (btnPrev) btnPrev.disabled = currentStudiPage === 0;
    if (btnNext) btnNext.disabled = currentStudiPage >= totalPages - 1;
  }

  function initProgressStudiLanjut() {
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
        const totalPages = Math.ceil(dataStudiLanjutS3.length / itemsPerStudiPage);
        if (currentStudiPage < totalPages - 1) {
          currentStudiPage++;
          renderStudiLanjutCards();
        }
      });
    }

    renderStudiLanjutCards();
  }

  // ============================================================
  // --- 2. DATA DOSEN FMIPA PER PRODI (HOMEBASE / RASIO) ---
  // ============================================================
  const dataDosenPerProdiDB = {
    'biologi': {
      namaProdi: 'Biologi',
      homebase: [
        { nama: 'Prof. Dr. Ir. Hj. Prasetyorini, M.S.', jk: 'Perempuan', nidn: '0012056301', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Guru Besar', strata: 'S3 (Doktor)' },
        { nama: 'Dr. Triastuti Sulistyaningsih, M.Si.', jk: 'Perempuan', nidn: '0418077502', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Dr. Rita Istiana, S.Si., M.Pd.', jk: 'Perempuan', nidn: '0425038101', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Surti Kurniasih, S.Si., M.Si.', jk: 'Perempuan', nidn: '0410067403', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Susi Rahayu, S.Si., M.Si.', jk: 'Perempuan', nidn: '0405087901', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Andi Setiawan, S.Si., M.Si.', jk: 'Laki-laki', nidn: '0415088201', nidk: '-', status: 'Tugas Belajar', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Mochamad Ridwan, S.Si., M.Si.', jk: 'Laki-laki', nidn: '0421048602', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' },
        { nama: 'Dwi Astuti, S.Pd., M.Si.', jk: 'Perempuan', nidn: '0414099003', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' },
        { nama: 'Arif Rahman, S.Si., M.Sc.', jk: 'Laki-laki', nidn: '0430019201', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Tenaga Pengajar', strata: 'S2 (Magister)' },
        { nama: 'Nurlaila Fitriani, S.Si., M.Si.', jk: 'Perempuan', nidn: '0419089302', nidk: '-', status: 'Cuti', sertif: 'Belum Bersertifikat', jabatan: 'Tenaga Pengajar', strata: 'S2 (Magister)' }
      ],
      rasio: [
        { nama: 'Prof. Dr. Ir. Hj. Prasetyorini, M.S.', jk: 'Perempuan', nidn: '0012056301', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Guru Besar', strata: 'S3 (Doktor)' },
        { nama: 'Dr. Triastuti Sulistyaningsih, M.Si.', jk: 'Perempuan', nidn: '0418077502', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Dr. Rita Istiana, S.Si., M.Pd.', jk: 'Perempuan', nidn: '0425038101', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Surti Kurniasih, S.Si., M.Si.', jk: 'Perempuan', nidn: '0410067403', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Susi Rahayu, S.Si., M.Si.', jk: 'Perempuan', nidn: '0405087901', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Mochamad Ridwan, S.Si., M.Si.', jk: 'Laki-laki', nidn: '0421048602', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' },
        { nama: 'Dwi Astuti, S.Pd., M.Si.', jk: 'Perempuan', nidn: '0414099003', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' },
        { nama: 'Arif Rahman, S.Si., M.Sc.', jk: 'Laki-laki', nidn: '0430019201', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Tenaga Pengajar', strata: 'S2 (Magister)' }
      ]
    },
    'kimia': {
      namaProdi: 'Kimia',
      homebase: [
        { nama: 'Prof. Dr. Dra. Hj. Indarini Dwi P., M.Si.', jk: 'Perempuan', nidn: '0008066501', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Guru Besar', strata: 'S3 (Doktor)' },
        { nama: 'Dr. Ir. Hj. Ade Heri Mulyati, M.Si.', jk: 'Perempuan', nidn: '0415096802', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Dr. rer. nat. Farida Hayati, M.Si.', jk: 'Perempuan', nidn: '0428117701', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Drs. Rikkit S. Sitorus, M.Si.', jk: 'Laki-laki', nidn: '0402036401', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S2 (Magister)' },
        { nama: 'Deden Saprudin, S.Si., M.Si.', jk: 'Laki-laki', nidn: '0412108003', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Ratna Dewi, S.Si., M.Si.', jk: 'Perempuan', nidn: '0418048601', nidk: '-', status: 'Tugas Belajar', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Fitria Lestari, S.Si., M.Sc.', jk: 'Perempuan', nidn: '0423058902', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' },
        { nama: 'Bambang Kurniawan, S.Si., M.Si.', jk: 'Laki-laki', nidn: '0407119103', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' },
        { nama: 'Yuni Anggraeni, S.Si., M.Si.', jk: 'Perempuan', nidn: '0415019302', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Tenaga Pengajar', strata: 'S2 (Magister)' }
      ],
      rasio: [
        { nama: 'Prof. Dr. Dra. Hj. Indarini Dwi P., M.Si.', jk: 'Perempuan', nidn: '0008066501', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Guru Besar', strata: 'S3 (Doktor)' },
        { nama: 'Dr. Ir. Hj. Ade Heri Mulyati, M.Si.', jk: 'Perempuan', nidn: '0415096802', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Dr. rer. nat. Farida Hayati, M.Si.', jk: 'Perempuan', nidn: '0428117701', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Drs. Rikkit S. Sitorus, M.Si.', jk: 'Laki-laki', nidn: '0402036401', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S2 (Magister)' },
        { nama: 'Deden Saprudin, S.Si., M.Si.', jk: 'Laki-laki', nidn: '0412108003', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Fitria Lestari, S.Si., M.Sc.', jk: 'Perempuan', nidn: '0423058902', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' },
        { nama: 'Bambang Kurniawan, S.Si., M.Si.', jk: 'Laki-laki', nidn: '0407119103', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' }
      ]
    },
    'matematika': {
      namaProdi: 'Matematika',
      homebase: [
        { nama: 'Dr. Eka Nurviana Fatma, M.Si.', jk: 'Perempuan', nidn: '0417037601', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Dr. Sri Wardani, M.Si.', jk: 'Perempuan', nidn: '0405107902', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Drs. Denny Trias Utomo, M.Si.', jk: 'Laki-laki', nidn: '0419086701', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S2 (Magister)' },
        { nama: 'Fajar Nugraha, S.Si., M.Si.', jk: 'Laki-laki', nidn: '0405078902', nidk: '-', status: 'Tugas Belajar', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Dian Anggraini, S.Si., M.Si.', jk: 'Perempuan', nidn: '0422118703', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Rizal Maulana, S.Si., M.Mat.', jk: 'Laki-laki', nidn: '0411049001', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' },
        { nama: 'Siti Nurjanah, S.Pd., M.Si.', jk: 'Perempuan', nidn: '0416099202', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' },
        { nama: 'Bayu Prasetyo, S.Si., M.Stat.', jk: 'Laki-laki', nidn: '0428029403', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Tenaga Pengajar', strata: 'S2 (Magister)' }
      ],
      rasio: [
        { nama: 'Dr. Eka Nurviana Fatma, M.Si.', jk: 'Perempuan', nidn: '0417037601', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Dr. Sri Wardani, M.Si.', jk: 'Perempuan', nidn: '0405107902', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Drs. Denny Trias Utomo, M.Si.', jk: 'Laki-laki', nidn: '0419086701', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S2 (Magister)' },
        { nama: 'Dian Anggraini, S.Si., M.Si.', jk: 'Perempuan', nidn: '0422118703', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Rizal Maulana, S.Si., M.Mat.', jk: 'Laki-laki', nidn: '0411049001', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' },
        { nama: 'Siti Nurjanah, S.Pd., M.Si.', jk: 'Perempuan', nidn: '0416099202', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' }
      ]
    },
    'ilmu-komputer': {
      namaProdi: 'Ilmu Komputer',
      homebase: [
        { nama: 'Prof. Dr. Encep Syarief N., M.Kom.', jk: 'Laki-laki', nidn: '0414027001', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Guru Besar', strata: 'S3 (Doktor)' },
        { nama: 'Dr. Ir. H. Aep Syaepul Uyun, M.Kom.', jk: 'Laki-laki', nidn: '0408096803', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Dr. Dian Kartika Utami, M.Kom.', jk: 'Perempuan', nidn: '0420048102', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Asep Id Hadiana, S.Si., M.Kom.', jk: 'Laki-laki', nidn: '0412087501', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S2 (Magister)' },
        { nama: 'Rina Kurniawati, S.Kom., M.Kom.', jk: 'Perempuan', nidn: '0422038702', nidk: '-', status: 'Tugas Belajar', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Husni Mubarok, S.Kom., M.T.', jk: 'Laki-laki', nidn: '0406058601', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Wildan Firdaus, S.Kom., M.Kom.', jk: 'Laki-laki', nidn: '0419108904', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Agung Prajanto, S.Kom., M.Cs.', jk: 'Laki-laki', nidn: '0415039102', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' },
        { nama: 'Gita Cahyani, S.Kom., M.Kom.', jk: 'Perempuan', nidn: '0424079201', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' },
        { nama: 'Dimas Ardiansyah, S.Kom., M.Kom.', jk: 'Laki-laki', nidn: '0411129402', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Tenaga Pengajar', strata: 'S2 (Magister)' }
      ],
      rasio: [
        { nama: 'Prof. Dr. Encep Syarief N., M.Kom.', jk: 'Laki-laki', nidn: '0414027001', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Guru Besar', strata: 'S3 (Doktor)' },
        { nama: 'Dr. Ir. H. Aep Syaepul Uyun, M.Kom.', jk: 'Laki-laki', nidn: '0408096803', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Dr. Dian Kartika Utami, M.Kom.', jk: 'Perempuan', nidn: '0420048102', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Asep Id Hadiana, S.Si., M.Kom.', jk: 'Laki-laki', nidn: '0412087501', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S2 (Magister)' },
        { nama: 'Husni Mubarok, S.Kom., M.T.', jk: 'Laki-laki', nidn: '0406058601', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Wildan Firdaus, S.Kom., M.Kom.', jk: 'Laki-laki', nidn: '0419108904', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Agung Prajanto, S.Kom., M.Cs.', jk: 'Laki-laki', nidn: '0415039102', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' },
        { nama: 'Gita Cahyani, S.Kom., M.Kom.', jk: 'Perempuan', nidn: '0424079201', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' }
      ]
    },
    'farmasi': {
      namaProdi: 'Farmasi',
      homebase: [
        { nama: 'Prof. Dr. Apt. Sri Wardatun, M.Si.', jk: 'Perempuan', nidn: '0021096701', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Guru Besar', strata: 'S3 (Doktor)' },
        { nama: 'Dr. Apt. E. Mulyani, M.Si.', jk: 'Perempuan', nidn: '0411037202', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Dr. Apt. Nina Herlina, M.Si.', jk: 'Perempuan', nidn: '0426087801', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Hendra Gunawan, S.Farm., M.Farm., Apt.', jk: 'Laki-laki', nidn: '0409118503', nidk: '-', status: 'Tugas Belajar', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Apt. Siti Mariam, M.Farm.', jk: 'Perempuan', nidn: '0414068402', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Apt. Danu Tri Laksono, M.Farm.', jk: 'Laki-laki', nidn: '0403078801', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Apt. Maya Puspitasari, M.Farm.', jk: 'Perempuan', nidn: '0429128804', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' },
        { nama: 'Apt. Riza Maulana, M.Si.', jk: 'Laki-laki', nidn: '0418059102', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' },
        { nama: 'Apt. Nurul Aulia, M.Farm.', jk: 'Perempuan', nidn: '0425109303', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Tenaga Pengajar', strata: 'S2 (Magister)' }
      ],
      rasio: [
        { nama: 'Prof. Dr. Apt. Sri Wardatun, M.Si.', jk: 'Perempuan', nidn: '0021096701', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Guru Besar', strata: 'S3 (Doktor)' },
        { nama: 'Dr. Apt. E. Mulyani, M.Si.', jk: 'Perempuan', nidn: '0411037202', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Dr. Apt. Nina Herlina, M.Si.', jk: 'Perempuan', nidn: '0426087801', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Apt. Siti Mariam, M.Farm.', jk: 'Perempuan', nidn: '0414068402', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Apt. Danu Tri Laksono, M.Farm.', jk: 'Laki-laki', nidn: '0403078801', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Apt. Maya Puspitasari, M.Farm.', jk: 'Perempuan', nidn: '0429128804', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' },
        { nama: 'Apt. Riza Maulana, M.Si.', jk: 'Laki-laki', nidn: '0418059102', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' }
      ]
    },
    'ppa': {
      namaProdi: 'Pendidikan Profesi Apoteker',
      homebase: [
        { nama: 'Dr. Apt. Nina Herlina, M.Si.', jk: 'Perempuan', nidn: '0426087801', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Apt. Danu Tri Laksono, M.Farm.', jk: 'Laki-laki', nidn: '0403078801', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Apt. Riza Maulana, M.Si.', jk: 'Laki-laki', nidn: '0418059102', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'S2 (Magister)' },
        { nama: 'Apt. Sri Handayani, M.Farm.', jk: 'Perempuan', nidn: '0412098601', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'Spesialis' },
        { nama: 'Apt. Ahmad Fauzi, M.Farm.', jk: 'Laki-laki', nidn: '0407049002', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'Spesialis' }
      ],
      rasio: [
        { nama: 'Dr. Apt. Nina Herlina, M.Si.', jk: 'Perempuan', nidn: '0426087801', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Apt. Danu Tri Laksono, M.Farm.', jk: 'Laki-laki', nidn: '0403078801', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S2 (Magister)' },
        { nama: 'Apt. Sri Handayani, M.Farm.', jk: 'Perempuan', nidn: '0412098601', nidk: '-', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'Spesialis' },
        { nama: 'Apt. Ahmad Fauzi, M.Farm.', jk: 'Laki-laki', nidn: '0407049002', nidk: '-', status: 'Aktif', sertif: 'Belum Bersertifikat', jabatan: 'Asisten Ahli', strata: 'Spesialis' }
      ]
    },
    'lainnya': {
      namaProdi: 'Lainnya',
      homebase: [
        { nama: 'Dr. Ir. H. Mulyadi, M.Sc.', jk: 'Laki-laki', nidn: '-', nidk: '8812046501', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Dr. Endang Sulistyowati, M.Si.', jk: 'Perempuan', nidn: '-', nidk: '8809077202', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S3 (Doktor)' },
        { nama: 'Drs. H. Achmad Sanusi, M.Si.', jk: 'Laki-laki', nidn: '-', nidk: '8814036803', status: 'Pensiun', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S2 (Magister)' }
      ],
      rasio: [
        { nama: 'Dr. Ir. H. Mulyadi, M.Sc.', jk: 'Laki-laki', nidn: '-', nidk: '8812046501', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor Kepala', strata: 'S3 (Doktor)' },
        { nama: 'Dr. Endang Sulistyowati, M.Si.', jk: 'Perempuan', nidn: '-', nidk: '8809077202', status: 'Aktif', sertif: 'Bersertifikat', jabatan: 'Lektor', strata: 'S3 (Doktor)' }
      ]
    }
  };

  let currentDataDosenProdiKey = 'biologi';
  let currentDataDosenKategoriKey = 'homebase';
  let currentDataDosenSearchQuery = '';

  function getFilteredDosenList() {
    const prodiData = dataDosenPerProdiDB[currentDataDosenProdiKey] || dataDosenPerProdiDB['biologi'];
    const list = prodiData[currentDataDosenKategoriKey] || [];

    if (!currentDataDosenSearchQuery.trim()) {
      return list;
    }

    const q = currentDataDosenSearchQuery.trim().toLowerCase();
    return list.filter(d =>
      d.nama.toLowerCase().includes(q) ||
      d.nidn.toLowerCase().includes(q) ||
      d.nidk.toLowerCase().includes(q) ||
      d.jabatan.toLowerCase().includes(q) ||
      d.strata.toLowerCase().includes(q)
    );
  }

  function renderTabelDosenPerProdi() {
    const tbody = document.getElementById('tabelDataDosenBody');
    const badge = document.getElementById('labelDosenCountBadge');
    if (!tbody) return;

    const prodiData = dataDosenPerProdiDB[currentDataDosenProdiKey] || dataDosenPerProdiDB['biologi'];
    const filteredList = getFilteredDosenList();
    const kategoriLabel = currentDataDosenKategoriKey === 'homebase' ? 'Dosen Homebase' : 'Penghitung Rasio';

    if (badge) {
      badge.textContent = `${filteredList.length} ${kategoriLabel} di ${prodiData.namaProdi}`;
    }

    if (filteredList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="text-center py-8 text-slate-400 font-medium">
            <i class="fas fa-search-minus text-2xl mb-2 text-slate-300 block"></i>
            Tidak ada data dosen yang sesuai dengan filter atau kata kunci pencarian.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filteredList.map((d, idx) => {
      let statusBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">Aktif</span>`;
      if (d.status === 'Tugas Belajar') {
        statusBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">Tugas Belajar</span>`;
      } else if (d.status === 'Cuti') {
        statusBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">Cuti</span>`;
      } else if (d.status === 'Pensiun') {
        statusBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">Pensiun</span>`;
      }

      let sertifBadge = d.sertif === 'Bersertifikat'
        ? `<span class="inline-flex items-center gap-1 text-emerald-600 font-semibold"><i class="fas fa-check-circle text-xs"></i> Bersertifikat</span>`
        : `<span class="inline-flex items-center gap-1 text-slate-400 font-medium"><i class="fas fa-minus-circle text-xs"></i> Belum</span>`;

      let strataBadge = `<span class="font-semibold text-slate-700">${d.strata}</span>`;
      if (d.strata.startsWith('S3')) {
        strataBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-800">${d.strata}</span>`;
      } else if (d.strata.startsWith('S2')) {
        strataBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-800">${d.strata}</span>`;
      }

      return `
        <tr>
          <td class="text-center font-bold text-slate-500">${idx + 1}</td>
          <td class="font-bold text-slate-800">${d.nama}</td>
          <td class="text-slate-600">${d.jk}</td>
          <td class="font-mono text-slate-600 text-xs">${d.nidn}</td>
          <td class="font-mono text-slate-600 text-xs">${d.nidk}</td>
          <td>${statusBadge}</td>
          <td>${sertifBadge}</td>
          <td class="font-medium text-slate-700">${d.jabatan}</td>
          <td>${strataBadge}</td>
        </tr>
      `;
    }).join('');
  }

  function initDataDosenPerProdi(initialProdi = null) {
    if (initialProdi && dataDosenPerProdiDB[initialProdi]) {
      currentDataDosenProdiKey = initialProdi;
    }

    // Sync active prodi tab
    const prodiTabs = document.querySelectorAll('#dataDosenProdiTabs .btn-data-prodi-tab');
    prodiTabs.forEach(tab => {
      const target = tab.dataset.prodiTarget;
      if (target === currentDataDosenProdiKey) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }

      if (!tab.dataset.bound) {
        tab.dataset.bound = 'true';
        tab.addEventListener('click', () => {
          prodiTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          currentDataDosenProdiKey = tab.dataset.prodiTarget;
          renderTabelDosenPerProdi();
        });
      }
    });

    // Kategori Pills (Homebase vs Rasio)
    const kategoriPills = document.querySelectorAll('.btn-data-kategori-pill');
    kategoriPills.forEach(pill => {
      const target = pill.dataset.kategoriTarget;
      if (target === currentDataDosenKategoriKey) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }

      if (!pill.dataset.bound) {
        pill.dataset.bound = 'true';
        pill.addEventListener('click', () => {
          kategoriPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          currentDataDosenKategoriKey = pill.dataset.kategoriTarget;
          renderTabelDosenPerProdi();
        });
      }
    });

    // Search Input
    const searchInput = document.getElementById('searchDosenInput');
    if (searchInput && !searchInput.dataset.bound) {
      searchInput.dataset.bound = 'true';
      searchInput.addEventListener('input', (e) => {
        currentDataDosenSearchQuery = e.target.value;
        renderTabelDosenPerProdi();
      });
    }

    // Export Buttons
    const btnCsv = document.getElementById('btnExportCsv');
    const btnExcel = document.getElementById('btnExportExcel');
    const btnPrint = document.getElementById('btnExportPrint');
    const btnCopy = document.getElementById('btnExportCopy');

    if (btnCsv && !btnCsv.dataset.bound) {
      btnCsv.dataset.bound = 'true';
      btnCsv.addEventListener('click', exportDosenCsv);
    }
    if (btnExcel && !btnExcel.dataset.bound) {
      btnExcel.dataset.bound = 'true';
      btnExcel.addEventListener('click', exportDosenCsv);
    }
    if (btnPrint && !btnPrint.dataset.bound) {
      btnPrint.dataset.bound = 'true';
      btnPrint.addEventListener('click', () => window.print());
    }
    if (btnCopy && !btnCopy.dataset.bound) {
      btnCopy.dataset.bound = 'true';
      btnCopy.addEventListener('click', () => {
        const list = getFilteredDosenList();
        const headers = ["No", "Nama Dosen", "Jenis Kelamin", "NIDN", "NIDK", "Status Dosen", "Status Sertifikasi Dosen", "Jabatan Akademik Terakhir", "Strata Pendidikan Terakhir"];
        const rows = list.map((d, i) => [i + 1, d.nama, d.jk, d.nidn, d.nidk, d.status, d.sertif, d.jabatan, d.strata].join('\t'));
        const textToCopy = [headers.join('\t'), ...rows].join('\n');
        
        navigator.clipboard.writeText(textToCopy).then(() => {
          const original = btnCopy.innerHTML;
          btnCopy.innerHTML = `<i class="fas fa-check text-emerald-600"></i><span>Tersalin!</span>`;
          setTimeout(() => {
            btnCopy.innerHTML = original;
          }, 1800);
        });
      });
    }

    renderTabelDosenPerProdi();
  }

  function exportDosenCsv() {
    const list = getFilteredDosenList();
    const headers = ["No", "Nama Dosen", "Jenis Kelamin", "NIDN", "NIDK", "Status Dosen", "Status Sertifikasi Dosen", "Jabatan Akademik Terakhir", "Strata Pendidikan Terakhir"];
    const rows = list.map((d, i) => [
      i + 1,
      `"${d.nama}"`,
      `"${d.jk}"`,
      `"${d.nidn}"`,
      `"${d.nidk}"`,
      `"${d.status}"`,
      `"${d.sertif}"`,
      `"${d.jabatan}"`,
      `"${d.strata}"`
    ].join(','));

    const csvContent = "\uFEFF" + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `data_dosen_${currentDataDosenProdiKey}_${currentDataDosenKategoriKey}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // ============================================================
  // --- DATA OPERASIONAL MAHASISWA FMIPA UNPAK ---
  // ============================================================
  let chartMhsStatusDistInstance = null;
  let chartMhsIpkDistInstance = null;
  let chartMhsKorelasiIpkSksInstance = null;
  let chartMhsTrenAktifNonAktifInstance = null;
  let chartMhsProgresSksInstance = null;
  let chartMhsMasaStudiInstance = null;
  let chartMhsTrenPrestasiInstance = null;
  let currentMhsProdi = 'semua';
  let currentMhsStatus = 'semua';
  let currentMhsPeriode = '2025/2026 Ganjil';
  let currentMhsPrestasiAwal = 2020;
  let currentMhsPrestasiAkhir = 2026;

  async function loadMahasiswaSections() {
    const container = document.getElementById('mahasiswaSections');
    if (!container) return;

    const files = [
      'mahasiswa/statistik_mahasiswa.html',
      'mahasiswa/prestasi_mahasiswa.html',
      'mahasiswa/progress_studi_mahasiswa.html',
      'mahasiswa/data_mahasiswa_per_prodi.html'
    ];
    try {
      const htmls = await Promise.all(files.map(f => fetch(f).then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })));
      container.innerHTML = htmls.join('\n');
    } catch (e) {
      console.error('Error loading mahasiswa sections:', e);
    }
  }

  const mahasiswaData = {
    'semua': {
      namaProdi: 'Semua Program Studi',
      statusMhs: {
        labels: ['Aktif', 'Cuti', 'Lulus', 'Drop Out'],
        data: [2618, 112, 85, 30],
        colors: ['#3D818A', '#E5D026', '#294669', '#ef4444']
      },
      ipkDist: {
        labels: ['< 2.00', '2.00 - 2.50', '2.51 - 3.00', '3.01 - 3.50', '3.51 - 4.00'],
        data: [42, 168, 455, 1260, 920],
        colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
      },
      korelasiIpkSks: {
        aktif: [
          {x: 15, y: 3.45}, {x: 22, y: 3.80}, {x: 28, y: 3.20}, {x: 35, y: 3.65},
          {x: 48, y: 3.50}, {x: 55, y: 3.90}, {x: 62, y: 3.35}, {x: 70, y: 3.75},
          {x: 78, y: 3.85}, {x: 85, y: 3.60}, {x: 92, y: 3.95}, {x: 98, y: 3.82}
        ],
        cuti: [
          {x: 25, y: 2.85}, {x: 40, y: 2.70}, {x: 52, y: 2.95}, {x: 65, y: 2.65}
        ],
        tidakAktif: [
          {x: 18, y: 2.10}, {x: 30, y: 1.95}, {x: 45, y: 2.35}
        ]
      },
      trenAktifNonAktif: {
        periods: ['2021/22 Ganjil', '2021/22 Genap', '2022/23 Ganjil', '2022/23 Genap', '2023/24 Ganjil', '2023/24 Genap', '2024/25 Ganjil', '2024/25 Genap', '2025/26 Ganjil'],
        aktif: [2350, 2390, 2430, 2460, 2510, 2535, 2580, 2605, 2618],
        nonAktif: [195, 185, 190, 180, 198, 188, 205, 195, 227]
      },
      progresSks: {
        cohorts: ['Angkatan 2022', 'Angkatan 2023', 'Angkatan 2024', 'Angkatan 2025'],
        sksLulus: [134, 98, 64, 22],
        targetSks: [144, 108, 72, 24]
      },
      masaStudi: {
        cohorts: ['Angkatan 2017', 'Angkatan 2018', 'Angkatan 2019', 'Angkatan 2020', 'Angkatan 2021'],
        tepatWaktu: [72, 75, 79, 82, 85],
        empatLima: [18, 16, 14, 12, 10],
        lebihLima: [10, 9, 7, 6, 5],
        rataRataTahun: [4.35, 4.28, 4.20, 4.08, 3.96]
      }
    },
    'biologi': {
      namaProdi: 'Biologi',
      statusMhs: {
        labels: ['Aktif', 'Cuti', 'Lulus', 'Drop Out'],
        data: [390, 16, 10, 4],
        colors: ['#3D818A', '#E5D026', '#294669', '#ef4444']
      },
      ipkDist: {
        labels: ['< 2.00', '2.00 - 2.50', '2.51 - 3.00', '3.01 - 3.50', '3.51 - 4.00'],
        data: [6, 25, 68, 185, 136],
        colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
      },
      korelasiIpkSks: {
        aktif: [
          {x: 18, y: 3.50}, {x: 24, y: 3.75}, {x: 36, y: 3.40}, {x: 52, y: 3.60},
          {x: 68, y: 3.70}, {x: 82, y: 3.80}, {x: 94, y: 3.90}
        ],
        cuti: [{x: 30, y: 2.80}, {x: 50, y: 2.75}],
        tidakAktif: [{x: 20, y: 2.15}]
      },
      trenAktifNonAktif: {
        periods: ['2021/22 Ganjil', '2021/22 Genap', '2022/23 Ganjil', '2022/23 Genap', '2023/24 Ganjil', '2023/24 Genap', '2024/25 Ganjil', '2024/25 Genap', '2025/26 Ganjil'],
        aktif: [340, 350, 355, 362, 370, 375, 380, 385, 390],
        nonAktif: [28, 25, 26, 24, 27, 25, 28, 26, 30]
      },
      progresSks: {
        cohorts: ['Angkatan 2022', 'Angkatan 2023', 'Angkatan 2024', 'Angkatan 2025'],
        sksLulus: [132, 96, 62, 21],
        targetSks: [144, 108, 72, 24]
      },
      masaStudi: {
        cohorts: ['Angkatan 2017', 'Angkatan 2018', 'Angkatan 2019', 'Angkatan 2020', 'Angkatan 2021'],
        tepatWaktu: [70, 74, 78, 80, 84],
        empatLima: [20, 17, 15, 14, 11],
        lebihLima: [10, 9, 7, 6, 5],
        rataRataTahun: [4.38, 4.30, 4.22, 4.10, 3.98]
      }
    },
    'kimia': {
      namaProdi: 'Kimia',
      statusMhs: {
        labels: ['Aktif', 'Cuti', 'Lulus', 'Drop Out'],
        data: [450, 18, 12, 5],
        colors: ['#3D818A', '#E5D026', '#294669', '#ef4444']
      },
      ipkDist: {
        labels: ['< 2.00', '2.00 - 2.50', '2.51 - 3.00', '3.01 - 3.50', '3.51 - 4.00'],
        data: [8, 30, 78, 215, 154],
        colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
      },
      korelasiIpkSks: {
        aktif: [
          {x: 20, y: 3.55}, {x: 32, y: 3.65}, {x: 45, y: 3.45}, {x: 58, y: 3.82},
          {x: 72, y: 3.68}, {x: 88, y: 3.85}, {x: 95, y: 3.92}
        ],
        cuti: [{x: 35, y: 2.85}, {x: 55, y: 2.70}],
        tidakAktif: [{x: 25, y: 2.05}]
      },
      trenAktifNonAktif: {
        periods: ['2021/22 Ganjil', '2021/22 Genap', '2022/23 Ganjil', '2022/23 Genap', '2023/24 Ganjil', '2023/24 Genap', '2024/25 Ganjil', '2024/25 Genap', '2025/26 Ganjil'],
        aktif: [405, 412, 418, 425, 432, 438, 442, 446, 450],
        nonAktif: [32, 30, 31, 29, 33, 31, 34, 32, 35]
      },
      progresSks: {
        cohorts: ['Angkatan 2022', 'Angkatan 2023', 'Angkatan 2024', 'Angkatan 2025'],
        sksLulus: [135, 99, 65, 23],
        targetSks: [144, 108, 72, 24]
      },
      masaStudi: {
        cohorts: ['Angkatan 2017', 'Angkatan 2018', 'Angkatan 2019', 'Angkatan 2020', 'Angkatan 2021'],
        tepatWaktu: [71, 75, 78, 81, 85],
        empatLima: [19, 16, 15, 13, 10],
        lebihLima: [10, 9, 7, 6, 5],
        rataRataTahun: [4.36, 4.29, 4.21, 4.09, 3.97]
      }
    },
    'matematika': {
      namaProdi: 'Matematika',
      statusMhs: {
        labels: ['Aktif', 'Cuti', 'Lulus', 'Drop Out'],
        data: [315, 12, 10, 3],
        colors: ['#3D818A', '#E5D026', '#294669', '#ef4444']
      },
      ipkDist: {
        labels: ['< 2.00', '2.00 - 2.50', '2.51 - 3.00', '3.01 - 3.50', '3.51 - 4.00'],
        data: [4, 18, 52, 150, 116],
        colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
      },
      korelasiIpkSks: {
        aktif: [
          {x: 16, y: 3.60}, {x: 28, y: 3.82}, {x: 42, y: 3.55}, {x: 60, y: 3.90},
          {x: 75, y: 3.75}, {x: 90, y: 3.88}, {x: 96, y: 3.96}
        ],
        cuti: [{x: 32, y: 2.90}, {x: 48, y: 2.80}],
        tidakAktif: [{x: 22, y: 2.20}]
      },
      trenAktifNonAktif: {
        periods: ['2021/22 Ganjil', '2021/22 Genap', '2022/23 Ganjil', '2022/23 Genap', '2023/24 Ganjil', '2023/24 Genap', '2024/25 Ganjil', '2024/25 Genap', '2025/26 Ganjil'],
        aktif: [275, 282, 288, 294, 300, 305, 309, 312, 315],
        nonAktif: [22, 20, 21, 19, 23, 21, 24, 22, 25]
      },
      progresSks: {
        cohorts: ['Angkatan 2022', 'Angkatan 2023', 'Angkatan 2024', 'Angkatan 2025'],
        sksLulus: [136, 100, 66, 23],
        targetSks: [144, 108, 72, 24]
      },
      masaStudi: {
        cohorts: ['Angkatan 2017', 'Angkatan 2018', 'Angkatan 2019', 'Angkatan 2020', 'Angkatan 2021'],
        tepatWaktu: [74, 78, 82, 85, 88],
        empatLima: [17, 14, 12, 10, 8],
        lebihLima: [9, 8, 6, 5, 4],
        rataRataTahun: [4.30, 4.22, 4.15, 4.02, 3.92]
      }
    },
    'ilmu-komputer': {
      namaProdi: 'Ilmu Komputer',
      statusMhs: {
        labels: ['Aktif', 'Cuti', 'Lulus', 'Drop Out'],
        data: [720, 32, 20, 8],
        colors: ['#3D818A', '#E5D026', '#294669', '#ef4444']
      },
      ipkDist: {
        labels: ['< 2.00', '2.00 - 2.50', '2.51 - 3.00', '3.01 - 3.50', '3.51 - 4.00'],
        data: [12, 45, 125, 345, 253],
        colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
      },
      korelasiIpkSks: {
        aktif: [
          {x: 15, y: 3.65}, {x: 25, y: 3.88}, {x: 38, y: 3.50}, {x: 55, y: 3.92},
          {x: 70, y: 3.78}, {x: 84, y: 3.86}, {x: 96, y: 3.98}
        ],
        cuti: [{x: 28, y: 2.80}, {x: 46, y: 2.75}],
        tidakAktif: [{x: 18, y: 2.10}]
      },
      trenAktifNonAktif: {
        periods: ['2021/22 Ganjil', '2021/22 Genap', '2022/23 Ganjil', '2022/23 Genap', '2023/24 Ganjil', '2023/24 Genap', '2024/25 Ganjil', '2024/25 Genap', '2025/26 Ganjil'],
        aktif: [640, 652, 665, 678, 690, 698, 708, 715, 720],
        nonAktif: [50, 47, 49, 46, 52, 49, 54, 51, 60]
      },
      progresSks: {
        cohorts: ['Angkatan 2022', 'Angkatan 2023', 'Angkatan 2024', 'Angkatan 2025'],
        sksLulus: [136, 101, 67, 24],
        targetSks: [144, 108, 72, 24]
      },
      masaStudi: {
        cohorts: ['Angkatan 2017', 'Angkatan 2018', 'Angkatan 2019', 'Angkatan 2020', 'Angkatan 2021'],
        tepatWaktu: [75, 78, 81, 84, 87],
        empatLima: [16, 14, 13, 11, 9],
        lebihLima: [9, 8, 6, 5, 4],
        rataRataTahun: [4.28, 4.20, 4.14, 4.02, 3.91]
      }
    },
    'farmasi': {
      namaProdi: 'Farmasi',
      statusMhs: {
        labels: ['Aktif', 'Cuti', 'Lulus', 'Drop Out'],
        data: [588, 26, 20, 6],
        colors: ['#3D818A', '#E5D026', '#294669', '#ef4444']
      },
      ipkDist: {
        labels: ['< 2.00', '2.00 - 2.50', '2.51 - 3.00', '3.01 - 3.50', '3.51 - 4.00'],
        data: [10, 38, 105, 280, 207],
        colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
      },
      korelasiIpkSks: {
        aktif: [
          {x: 18, y: 3.52}, {x: 26, y: 3.78}, {x: 40, y: 3.60}, {x: 56, y: 3.84},
          {x: 72, y: 3.72}, {x: 86, y: 3.82}, {x: 94, y: 3.90}
        ],
        cuti: [{x: 32, y: 2.85}, {x: 50, y: 2.70}],
        tidakAktif: [{x: 22, y: 2.15}]
      },
      trenAktifNonAktif: {
        periods: ['2021/22 Ganjil', '2021/22 Genap', '2022/23 Ganjil', '2022/23 Genap', '2023/24 Ganjil', '2023/24 Genap', '2024/25 Ganjil', '2024/25 Genap', '2025/26 Ganjil'],
        aktif: [520, 532, 542, 552, 564, 570, 578, 584, 588],
        nonAktif: [42, 39, 41, 38, 44, 41, 46, 43, 52]
      },
      progresSks: {
        cohorts: ['Angkatan 2022', 'Angkatan 2023', 'Angkatan 2024', 'Angkatan 2025'],
        sksLulus: [133, 97, 63, 22],
        targetSks: [144, 108, 72, 24]
      },
      masaStudi: {
        cohorts: ['Angkatan 2017', 'Angkatan 2018', 'Angkatan 2019', 'Angkatan 2020', 'Angkatan 2021'],
        tepatWaktu: [72, 76, 79, 82, 86],
        empatLima: [18, 15, 14, 12, 10],
        lebihLima: [10, 9, 7, 6, 4],
        rataRataTahun: [4.32, 4.25, 4.18, 4.05, 3.94]
      }
    },
    'ppa': {
      namaProdi: 'Profesi Apoteker',
      statusMhs: {
        labels: ['Aktif', 'Cuti', 'Lulus', 'Drop Out'],
        data: [155, 8, 13, 4],
        colors: ['#3D818A', '#E5D026', '#294669', '#ef4444']
      },
      ipkDist: {
        labels: ['< 2.00', '2.00 - 2.50', '2.51 - 3.00', '3.01 - 3.50', '3.51 - 4.00'],
        data: [2, 12, 27, 85, 54],
        colors: ['#0D0B61', '#294669', '#3D818A', '#E5D026', '#8BBB92']
      },
      korelasiIpkSks: {
        aktif: [
          {x: 25, y: 3.75}, {x: 45, y: 3.85}, {x: 65, y: 3.90}, {x: 85, y: 3.94}, {x: 98, y: 3.98}
        ],
        cuti: [{x: 35, y: 2.95}],
        tidakAktif: [{x: 20, y: 2.40}]
      },
      trenAktifNonAktif: {
        periods: ['2021/22 Ganjil', '2021/22 Genap', '2022/23 Ganjil', '2022/23 Genap', '2023/24 Ganjil', '2023/24 Genap', '2024/25 Ganjil', '2024/25 Genap', '2025/26 Ganjil'],
        aktif: [130, 135, 138, 142, 146, 149, 152, 154, 155],
        nonAktif: [15, 14, 15, 14, 16, 15, 17, 16, 25]
      },
      progresSks: {
        cohorts: ['Tahap 1 (PKPA)', 'Tahap 2 (Ujian OSCE)', 'Tahap 3 (Ujian CBT)'],
        sksLulus: [38, 32, 36],
        targetSks: [40, 36, 40]
      },
      masaStudi: {
        cohorts: ['Angkatan 2021', 'Angkatan 2022', 'Angkatan 2023', 'Angkatan 2024', 'Angkatan 2025'],
        tepatWaktu: [86, 88, 90, 92, 94],
        empatLima: [10, 9, 8, 6, 5],
        lebihLima: [4, 3, 2, 2, 1],
        rataRataTahun: [1.2, 1.15, 1.12, 1.08, 1.02]
      }
    }
  };

  function initMahasiswa(activeProdi = 'semua', activeStatus = 'semua') {
    const canvasStatus = document.getElementById('chartMhsStatusDist');
    const canvasIpk = document.getElementById('chartMhsIpkDist');
    const canvasKorelasi = document.getElementById('chartMhsKorelasiIpkSks');
    const canvasTren = document.getElementById('chartMhsTrenAktifNonAktif');
    const canvasProgres = document.getElementById('chartMhsProgresSks');
    const canvasMasaStudi = document.getElementById('chartMhsMasaStudi');

    if (!canvasStatus && !canvasIpk) return;

    currentMhsProdi = activeProdi;
    currentMhsStatus = activeStatus;
    const data = mahasiswaData[activeProdi] || mahasiswaData['semua'];

    // 1. Chart: Distribusi Status Mahasiswa (Doughnut)
    if (canvasStatus) {
      if (chartMhsStatusDistInstance) {
        chartMhsStatusDistInstance.destroy();
        chartMhsStatusDistInstance = null;
      }
      chartMhsStatusDistInstance = new Chart(canvasStatus, {
        type: 'doughnut',
        data: {
          labels: data.statusMhs.labels,
          datasets: [{
            data: data.statusMhs.data,
            backgroundColor: data.statusMhs.colors,
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
              labels: {
                boxWidth: 10,
                padding: 10,
                font: { size: 11, weight: 600 },
                color: '#334155'
              }
            }
          }
        }
      });
    }

    // 2. Chart: Distribusi IPK Mahasiswa (Bar)
    if (canvasIpk) {
      if (chartMhsIpkDistInstance) {
        chartMhsIpkDistInstance.destroy();
        chartMhsIpkDistInstance = null;
      }
      chartMhsIpkDistInstance = new Chart(canvasIpk, {
        type: 'bar',
        data: {
          labels: data.ipkDist.labels,
          datasets: [{
            data: data.ipkDist.data,
            backgroundColor: data.ipkDist.colors,
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
              backgroundColor: '#1e293b',
              titleColor: '#f8fafc',
              bodyColor: '#f8fafc',
              cornerRadius: 8,
              callbacks: {
                label: (ctx) => ` ${ctx.parsed.y} Mahasiswa`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { size: 10.5, weight: 600 }, color: '#475569' }
            },
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(0,0,0,0.06)' },
              ticks: { font: { size: 10 }, color: '#64748b' }
            }
          }
        }
      });
    }

    // 3. Chart: Korelasi IPK vs Penyelesaian SKS (Scatter + Target Line 3.0)
    if (canvasKorelasi) {
      if (chartMhsKorelasiIpkSksInstance) {
        chartMhsKorelasiIpkSksInstance.destroy();
        chartMhsKorelasiIpkSksInstance = null;
      }
      chartMhsKorelasiIpkSksInstance = new Chart(canvasKorelasi, {
        type: 'scatter',
        data: {
          datasets: [
            {
              type: 'line',
              label: 'Target IPK 3.0',
              data: [{ x: 0, y: 3.0 }, { x: 100, y: 3.0 }],
              borderColor: '#0D0B61',
              borderDash: [5, 5],
              borderWidth: 1.5,
              pointRadius: 0,
              fill: false
            },
            {
              label: 'Aktif',
              data: data.korelasiIpkSks.aktif,
              backgroundColor: '#3D818A',
              borderColor: '#3D818A',
              pointRadius: 4.5
            },
            {
              label: 'Cuti',
              data: data.korelasiIpkSks.cuti,
              backgroundColor: '#E5D026',
              borderColor: '#E5D026',
              pointRadius: 4.5
            },
            {
              label: 'Tidak Aktif',
              data: data.korelasiIpkSks.tidakAktif,
              backgroundColor: '#ef4444',
              borderColor: '#ef4444',
              pointRadius: 4.5
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              type: 'linear', min: 0, max: 100,
              grid: { color: 'rgba(0,0,0,0.05)' },
              ticks: { stepSize: 25, font: { size: 10 }, color: '#64748b' },
              title: { display: true, text: 'Penyelesaian SKS (%)', font: { size: 10, weight: '600' }, color: '#64748b' }
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

    // 4. Chart: Tren Mahasiswa Aktif vs Non-Aktif (Line Chart sesuai Gambar 2)
    if (canvasTren) {
      if (chartMhsTrenAktifNonAktifInstance) {
        chartMhsTrenAktifNonAktifInstance.destroy();
        chartMhsTrenAktifNonAktifInstance = null;
      }
      chartMhsTrenAktifNonAktifInstance = new Chart(canvasTren, {
        type: 'line',
        data: {
          labels: data.trenAktifNonAktif.periods,
          datasets: [
            {
              label: 'Aktif',
              data: data.trenAktifNonAktif.aktif,
              borderColor: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              pointBackgroundColor: '#10b981',
              pointBorderColor: '#ffffff',
              pointRadius: 3.5,
              borderWidth: 2.2,
              tension: 0.2,
              fill: false
            },
            {
              label: 'Non-Aktif',
              data: data.trenAktifNonAktif.nonAktif,
              borderColor: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              pointBackgroundColor: '#ef4444',
              pointBorderColor: '#ffffff',
              pointRadius: 3.5,
              borderWidth: 2.2,
              tension: 0.2,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#1e293b',
              titleColor: '#f8fafc',
              bodyColor: '#f8fafc',
              padding: 10,
              cornerRadius: 8,
              callbacks: {
                label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('id-ID')} Mahasiswa`
              }
            }
          },
          scales: {
            x: {
              grid: { color: 'rgba(0,0,0,0.04)' },
              ticks: { font: { size: 10, weight: 600 }, color: '#475569' },
              title: { display: true, text: 'Periode Tahun Ajaran', font: { size: 11, weight: '700' }, color: '#334155' }
            },
            y: {
              beginAtZero: false,
              grid: { color: 'rgba(0,0,0,0.06)' },
              ticks: { font: { size: 10 }, color: '#64748b' },
              title: { display: true, text: 'Jumlah Mahasiswa', font: { size: 11, weight: '700' }, color: '#334155' }
            }
          }
        }
      });
    }

    // 5. Chart: Progres SKS per Angkatan (Grouped Bar Chart)
    if (canvasProgres) {
      if (chartMhsProgresSksInstance) {
        chartMhsProgresSksInstance.destroy();
        chartMhsProgresSksInstance = null;
      }
      chartMhsProgresSksInstance = new Chart(canvasProgres, {
        type: 'bar',
        data: {
          labels: data.progresSks.cohorts,
          datasets: [
            {
              label: 'Rata-rata SKS Lulus',
              data: data.progresSks.sksLulus,
              backgroundColor: '#3D818A',
              borderRadius: 6,
              borderSkipped: false
            },
            {
              label: 'Target Kurikulum',
              data: data.progresSks.targetSks,
              backgroundColor: '#294669',
              borderRadius: 6,
              borderSkipped: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#1e293b',
              titleColor: '#f8fafc',
              bodyColor: '#f8fafc',
              padding: 9,
              cornerRadius: 8,
              callbacks: {
                label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y} SKS`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { size: 10.5, weight: 600 }, color: '#475569' }
            },
            y: {
              beginAtZero: true,
              max: 160,
              grid: { color: 'rgba(0,0,0,0.06)' },
              ticks: { stepSize: 30, font: { size: 10 }, color: '#64748b' },
              title: { display: true, text: 'Jumlah SKS', font: { size: 10.5, weight: '700' }, color: '#334155' }
            }
          }
        }
      });
    }

    // 6. Chart: Analisis Masa Studi Mahasiswa per Angkatan (Combo Stacked Bar + Line)
    if (canvasMasaStudi) {
      if (chartMhsMasaStudiInstance) {
        chartMhsMasaStudiInstance.destroy();
        chartMhsMasaStudiInstance = null;
      }
      chartMhsMasaStudiInstance = new Chart(canvasMasaStudi, {
        type: 'bar',
        data: {
          labels: data.masaStudi.cohorts,
          datasets: [
            {
              type: 'bar',
              stack: 'masa',
              label: 'Tepat Waktu (≤ 4 Tahun / 8 Sem)',
              data: data.masaStudi.tepatWaktu,
              backgroundColor: '#3D818A',
              borderRadius: 4
            },
            {
              type: 'bar',
              stack: 'masa',
              label: '4.5 - 5 Tahun (9 - 10 Sem)',
              data: data.masaStudi.empatLima,
              backgroundColor: '#E5D026',
              borderRadius: 4
            },
            {
              type: 'bar',
              stack: 'masa',
              label: '> 5 Tahun (> 10 Sem)',
              data: data.masaStudi.lebihLima,
              backgroundColor: '#ef4444',
              borderRadius: 4
            },
            {
              type: 'line',
              label: 'Rata-rata Masa Studi (Tahun)',
              data: data.masaStudi.rataRataTahun,
              borderColor: '#0D0B61',
              backgroundColor: '#0D0B61',
              pointBackgroundColor: '#0D0B61',
              pointBorderColor: '#ffffff',
              pointRadius: 5,
              borderWidth: 2.5,
              yAxisID: 'yTahun',
              tension: 0.15,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#1e293b',
              titleColor: '#f8fafc',
              bodyColor: '#f8fafc',
              padding: 10,
              cornerRadius: 8
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { size: 11, weight: 600 }, color: '#475569' }
            },
            y: {
              stacked: true,
              beginAtZero: true,
              max: 100,
              grid: { color: 'rgba(0,0,0,0.06)' },
              ticks: {
                stepSize: 20,
                font: { size: 10 },
                color: '#64748b',
                callback: (val) => `${val}%`
              },
              title: { display: true, text: 'Persentase Kelulusan (%)', font: { size: 11, weight: '700' }, color: '#334155' }
            },
            yTahun: {
              position: 'right',
              min: 3.0,
              max: 5.0,
              grid: { display: false },
              ticks: {
                stepSize: 0.5,
                font: { size: 10 },
                color: '#0D0B61',
                callback: (val) => `${val} Thn`
              },
              title: { display: true, text: 'Rata-rata Masa Studi (Tahun)', font: { size: 11, weight: '700' }, color: '#0D0B61' }
            }
          }
        }
      });
    }

    // Sub-modules
    initTrenPrestasiMahasiswa(activeProdi);
    initProgressStudiMahasiswa();
    initDataMahasiswaPerProdi();

    // Event listeners for Header Tabs & Dropdowns
    const mhsTabs = document.querySelectorAll('.filter-tab[data-mhs-prodi]');
    mhsTabs.forEach(tab => {
      if (!tab.dataset.bound) {
        tab.dataset.bound = 'true';
        tab.addEventListener('click', function() {
          mhsTabs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
          initMahasiswa(this.dataset.mhsProdi, currentMhsStatus);
        });
      }
    });

    const filterStatusSelect = document.getElementById('filterStatusMhs');
    if (filterStatusSelect && !filterStatusSelect.dataset.bound) {
      filterStatusSelect.dataset.bound = 'true';
      filterStatusSelect.addEventListener('change', function() {
        initMahasiswa(currentMhsProdi, this.value);
      });
    }

    const filterPeriodeSelect = document.getElementById('filterPeriodeMhs');
    if (filterPeriodeSelect && !filterPeriodeSelect.dataset.bound) {
      filterPeriodeSelect.dataset.bound = 'true';
      filterPeriodeSelect.addEventListener('change', function() {
        currentMhsPeriode = this.value;
        initMahasiswa(currentMhsProdi, currentMhsStatus);
      });
    }
  }

  // --- TREN PRESTASI MAHASISWA (2020 - 2026) ---
  const riwayatPrestasiMhs = {
    'semua': {
      internasional: [12, 13, 14, 15, 16, 17, 18],
      nasional:      [36, 40, 45, 50, 55, 60, 64],
      regional:      [28, 30, 32, 35, 38, 40, 42],
      lokal:         [24, 26, 28, 30, 32, 34, 35],
      total:         [100, 109, 119, 130, 141, 151, 159]
    },
    'biologi': {
      internasional: [2, 2, 2, 3, 3, 4, 4],
      nasional:      [6, 7, 8, 9, 10, 11, 12],
      regional:      [5, 5, 6, 6, 7, 7, 8],
      lokal:         [4, 4, 4, 4, 4, 4, 4],
      total:         [17, 18, 20, 22, 24, 26, 28]
    },
    'kimia': {
      internasional: [2, 3, 3, 3, 4, 4, 5],
      nasional:      [7, 8, 9, 10, 11, 12, 13],
      regional:      [5, 6, 6, 7, 7, 8, 8],
      lokal:         [4, 5, 5, 5, 6, 6, 6],
      total:         [18, 22, 23, 25, 28, 30, 32]
    },
    'matematika': {
      internasional: [1, 1, 1, 1, 2, 2, 2],
      nasional:      [4, 5, 6, 6, 7, 8, 8],
      regional:      [4, 4, 4, 5, 5, 5, 5],
      lokal:         [3, 3, 3, 4, 4, 4, 4],
      total:         [12, 13, 14, 16, 18, 19, 19]
    },
    'ilmu-komputer': {
      internasional: [4, 4, 5, 5, 5, 5, 5],
      nasional:      [11, 12, 14, 16, 17, 19, 20],
      regional:      [8, 9, 10, 10, 12, 12, 13],
      lokal:         [7, 8, 9, 9, 10, 10, 10],
      total:         [30, 33, 38, 40, 44, 46, 48]
    },
    'farmasi': {
      internasional: [2, 2, 2, 2, 2, 2, 2],
      nasional:      [6, 6, 7, 7, 8, 8, 9],
      regional:      [5, 5, 5, 6, 6, 7, 7],
      lokal:         [5, 5, 6, 7, 7, 8, 8],
      total:         [18, 18, 20, 22, 23, 25, 26]
    },
    'ppa': {
      internasional: [1, 1, 1, 1, 0, 0, 0],
      nasional:      [2, 2, 1, 2, 2, 2, 2],
      regional:      [1, 1, 1, 1, 1, 1, 1],
      lokal:         [1, 1, 1, 1, 1, 2, 3],
      total:         [5, 5, 4, 5, 4, 5, 6]
    }
  };

  function initTrenPrestasiMahasiswa(activeProdi = 'semua') {
    const canvas = document.getElementById('chartMhsTrenPrestasi');
    if (!canvas) return;

    const selectAwal = document.getElementById('filterMhsPrestasiAwal');
    const selectAkhir = document.getElementById('filterMhsPrestasiAkhir');

    if (selectAwal && !selectAwal.dataset.bound) {
      selectAwal.dataset.bound = 'true';
      selectAwal.addEventListener('change', () => {
        currentMhsPrestasiAwal = parseInt(selectAwal.value);
        if (currentMhsPrestasiAwal > currentMhsPrestasiAkhir) {
          currentMhsPrestasiAkhir = currentMhsPrestasiAwal;
          if (selectAkhir) selectAkhir.value = currentMhsPrestasiAkhir;
        }
        renderTrenPrestasiMahasiswa(activeProdi);
      });
    }

    if (selectAkhir && !selectAkhir.dataset.bound) {
      selectAkhir.dataset.bound = 'true';
      selectAkhir.addEventListener('change', () => {
        currentMhsPrestasiAkhir = parseInt(selectAkhir.value);
        if (currentMhsPrestasiAkhir < currentMhsPrestasiAwal) {
          currentMhsPrestasiAwal = currentMhsPrestasiAkhir;
          if (selectAwal) selectAwal.value = currentMhsPrestasiAwal;
        }
        renderTrenPrestasiMahasiswa(activeProdi);
      });
    }

    renderTrenPrestasiMahasiswa(activeProdi);
  }

  function renderTrenPrestasiMahasiswa(activeProdi = 'semua') {
    const canvas = document.getElementById('chartMhsTrenPrestasi');
    if (!canvas) return;

    const allYears = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
    const startIdx = Math.max(0, allYears.indexOf(currentMhsPrestasiAwal));
    const endIdx = allYears.indexOf(currentMhsPrestasiAkhir) !== -1 ? allYears.indexOf(currentMhsPrestasiAkhir) : allYears.length - 1;

    const slicedYears = allYears.slice(startIdx, endIdx + 1);
    const pData = riwayatPrestasiMhs[activeProdi] || riwayatPrestasiMhs['semua'];

    const interSlice = pData.internasional.slice(startIdx, endIdx + 1);
    const nasSlice = pData.nasional.slice(startIdx, endIdx + 1);
    const regSlice = pData.regional.slice(startIdx, endIdx + 1);
    const lokSlice = pData.lokal.slice(startIdx, endIdx + 1);
    const totSlice = pData.total.slice(startIdx, endIdx + 1);

    const updateCard = (valId, diffId, sliceArr) => {
      const elVal = document.getElementById(valId);
      const elDiff = document.getElementById(diffId);
      const baseVal = sliceArr[0];
      const endVal = sliceArr[sliceArr.length - 1];
      const diff = endVal - baseVal;
      const pct = baseVal > 0 ? ((diff / baseVal) * 100).toFixed(1) : (diff > 0 ? '100.0' : '0.0');
      const sign = diff >= 0 ? '+' : '';

      if (elVal) elVal.textContent = endVal;
      if (elDiff) elDiff.textContent = `${sign}${diff} (${sign}${pct}%)`;
    };

    updateCard('statValMhsInter', 'statDiffMhsInter', interSlice);
    updateCard('statValMhsNas', 'statDiffMhsNas', nasSlice);
    updateCard('statValMhsReg', 'statDiffMhsReg', regSlice);
    updateCard('statValMhsLok', 'statDiffMhsLok', lokSlice);
    updateCard('statValMhsTotalPrestasi', 'statDiffMhsTotalPrestasi', totSlice);

    if (chartMhsTrenPrestasiInstance) {
      chartMhsTrenPrestasiInstance.destroy();
      chartMhsTrenPrestasiInstance = null;
    }

    chartMhsTrenPrestasiInstance = new Chart(canvas, {
      type: 'line',
      data: {
        labels: slicedYears,
        datasets: [
          {
            label: 'Total Capaian',
            data: totSlice,
            borderColor: '#0D0B61',
            backgroundColor: 'rgba(13, 11, 97, 0.1)',
            pointBackgroundColor: '#0D0B61',
            pointBorderColor: '#ffffff',
            pointRadius: 4.5,
            borderWidth: 2.5,
            tension: 0.2,
            fill: false
          },
          {
            label: 'Nasional',
            data: nasSlice,
            borderColor: '#294669',
            backgroundColor: 'rgba(41, 70, 105, 0.1)',
            pointBackgroundColor: '#294669',
            pointBorderColor: '#ffffff',
            pointRadius: 4,
            borderWidth: 2.2,
            tension: 0.2,
            fill: false
          },
          {
            label: 'Regional',
            data: regSlice,
            borderColor: '#3D818A',
            backgroundColor: 'rgba(61, 129, 138, 0.1)',
            pointBackgroundColor: '#3D818A',
            pointBorderColor: '#ffffff',
            pointRadius: 4,
            borderWidth: 2.2,
            tension: 0.2,
            fill: false
          },
          {
            label: 'Lokal / Provinsi',
            data: lokSlice,
            borderColor: '#8BBB92',
            backgroundColor: 'rgba(139, 187, 146, 0.15)',
            pointBackgroundColor: '#8BBB92',
            pointBorderColor: '#ffffff',
            pointRadius: 4,
            borderWidth: 2.2,
            tension: 0.2,
            fill: false
          },
          {
            label: 'Internasional',
            data: interSlice,
            borderColor: '#E5D026',
            backgroundColor: 'rgba(229, 208, 38, 0.15)',
            pointBackgroundColor: '#E5D026',
            pointBorderColor: '#ffffff',
            pointRadius: 4,
            borderWidth: 2.2,
            tension: 0.2,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e293b',
            titleColor: '#f8fafc',
            bodyColor: '#f8fafc',
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y} Prestasi`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(0,0,0,0.04)' },
            ticks: { font: { size: 11, weight: 600 }, color: '#475569' }
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0,0,0,0.06)' },
            ticks: { font: { size: 11 }, color: '#475569' }
          }
        }
      }
    });
  }

  // --- MONITORING PROGRESS STUDI & SKRIPSI MAHASISWA ---
  const dataProgressStudiMahasiswa = [
    {
      nama: 'Aditia Pratama',
      npm: '065121045',
      prodi: 'Biologi',
      judul: 'Eksplorasi Keanekaragaman Bryophyta Epifit di Kawasan Taman Nasional Gunung Gede Pangrango',
      tahap: 'Ujian Komprehensif & Uji Naskah Skripsi',
      progress: 85,
      targetLulus: 'Semester Genap 2025/2026',
      dosenPA: 'Dr. Triastuti Sulistyaningsih, M.Si.',
      statusKTW: 'Tepat Waktu'
    },
    {
      nama: 'Siti Nurhaliza',
      npm: '062121012',
      prodi: 'Kimia',
      judul: 'Biosintesis Green Nanopartikel Perak Menggunakan Ekstrak Daun Sirih Merah sebagai Antibakteri',
      tahap: 'Penyusunan Artikel Ilmiah & Seminar Hasil',
      progress: 75,
      targetLulus: 'Semester Genap 2025/2026',
      dosenPA: 'Dr. Rita Istiana, S.Si., M.Pd.',
      statusKTW: 'Tepat Waktu'
    },
    {
      nama: 'Rizky Ramadhan',
      npm: '065121088',
      prodi: 'Ilmu Komputer',
      judul: 'Implementasi Deep Learning YOLOv8 pada Sistem Monitoring Deteksi Hama Tanaman Padi Berbasis IoT',
      tahap: 'Sidang Tugas Akhir / Skripsi',
      progress: 92,
      targetLulus: 'Semester Genap 2025/2026',
      dosenPA: 'Dr. Ir. Fitrah Nugraha, M.Kom.',
      statusKTW: 'Tepat Waktu'
    },
    {
      nama: 'Amanda Putri Lestari',
      npm: '066121034',
      prodi: 'Farmasi',
      judul: 'Formulasi dan Evaluasi Mutu Fisik Sediaan Serum Nanopengantar Ekstrak Kulit Manggis',
      tahap: 'Pengujian Karakterisasi Laboratorium Akhir',
      progress: 68,
      targetLulus: 'Semester Ganjil 2026/2027',
      dosenPA: 'Dr. apt. Novitasari, M.Farm.',
      statusKTW: 'On Track'
    },
    {
      nama: 'Farhan Maulana Hakim',
      npm: '063121019',
      prodi: 'Matematika',
      judul: 'Analisis Kestabilan Model Matematika SEIR pada Penyebaran Demam Berdarah Dengue dengan Vaksinasi',
      tahap: 'Penyusunan Bab 4 & Analisis Simulasi Numerik',
      progress: 70,
      targetLulus: 'Semester Genap 2025/2026',
      dosenPA: 'Dr. Fajar Nugraha, M.Si.',
      statusKTW: 'Tepat Waktu'
    },
    {
      nama: 'Nadia Safitri, S.Farm.',
      npm: '067123005',
      prodi: 'Profesi Apoteker',
      judul: 'Evaluasi Kepatuhan Pasien Geriatri Hipertensi di Instalasi Rawat Jalan RSUD Kota Bogor',
      tahap: 'Sidang Laporan Praktik Kerja Profesi Apoteker (PKPA)',
      progress: 88,
      targetLulus: 'Periode Kelulusan 2026',
      dosenPA: 'Prof. Dr. apt. Yulianita, M.Farm.',
      statusKTW: 'Tepat Waktu'
    }
  ];

  let currentMhsStudiPage = 0;
  const itemsPerMhsStudiPage = 3;

  function renderProgressStudiMahasiswaCards() {
    const container = document.getElementById('mhsStudiLanjutContainer');
    const btnPrev = document.getElementById('btnMhsStudiPrev');
    const btnNext = document.getElementById('btnMhsStudiNext');
    if (!container) return;

    const totalPages = Math.ceil(dataProgressStudiMahasiswa.length / itemsPerMhsStudiPage);
    const startIdx = currentMhsStudiPage * itemsPerMhsStudiPage;
    const currentItems = dataProgressStudiMahasiswa.slice(startIdx, startIdx + itemsPerMhsStudiPage);

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
              <p>NPM: ${item.npm} · <span class="text-emerald-700 font-semibold">${item.prodi}</span></p>
            </div>
          </div>
          <div class="mhs-ta-badge">
            <i class="fas fa-file-alt text-emerald-600 text-xs"></i>
            <span title="${item.judul}">${item.judul}</span>
          </div>
          <div class="text-[11.5px] text-slate-500 mb-2.5">
            <span class="font-semibold text-slate-700">Dosen PA:</span> ${item.dosenPA}
          </div>
          <div class="mhs-progress-wrapper">
            <div class="mhs-progress-labels">
              <span class="truncate max-w-[190px] text-slate-600" title="${item.tahap}">${item.tahap}</span>
              <span class="text-emerald-700 font-bold">${item.progress}%</span>
            </div>
            <div class="mhs-progress-bar-bg">
              <div class="mhs-progress-bar-fill" style="width: ${item.progress}%"></div>
            </div>
            <div class="flex justify-between items-center text-[10.5px] text-slate-400 mt-2">
              <span>Target: <strong class="text-slate-600">${item.targetLulus}</strong></span>
              <span class="bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-medium">${item.statusKTW}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (btnPrev) btnPrev.disabled = currentMhsStudiPage === 0;
    if (btnNext) btnNext.disabled = currentMhsStudiPage >= totalPages - 1;
  }

  function initProgressStudiMahasiswa() {
    const btnPrev = document.getElementById('btnMhsStudiPrev');
    const btnNext = document.getElementById('btnMhsStudiNext');

    if (btnPrev && !btnPrev.dataset.bound) {
      btnPrev.dataset.bound = 'true';
      btnPrev.addEventListener('click', () => {
        if (currentMhsStudiPage > 0) {
          currentMhsStudiPage--;
          renderProgressStudiMahasiswaCards();
        }
      });
    }

    if (btnNext && !btnNext.dataset.bound) {
      btnNext.dataset.bound = 'true';
      btnNext.addEventListener('click', () => {
        const totalPages = Math.ceil(dataProgressStudiMahasiswa.length / itemsPerMhsStudiPage);
        if (currentMhsStudiPage < totalPages - 1) {
          currentMhsStudiPage++;
          renderProgressStudiMahasiswaCards();
        }
      });
    }

    renderProgressStudiMahasiswaCards();
  }

  // --- DATA MAHASISWA FMIPA PER PRODI (TABEL & EXPORT) ---
  const dataMahasiswaPerProdiDB = {
    'biologi': {
      namaProdi: 'Biologi',
      reguler: [
        { npm: '065121001', nama: 'Dimas Kurniawan', jk: 'Laki-laki', angkatan: '2021', ipk: '3.72', status: 'Aktif', jalur: 'SNMPTN', dosenPa: 'Prof. Dr. Ir. Hj. Prasetyorini, M.S.' },
        { npm: '065121008', nama: 'Anisa Ramadhani', jk: 'Perempuan', angkatan: '2021', ipk: '3.85', status: 'Aktif', jalur: 'SBMPTN', dosenPa: 'Dr. Triastuti Sulistyaningsih, M.Si.' },
        { npm: '065122015', nama: 'Bagas Aditya', jk: 'Laki-laki', angkatan: '2022', ipk: '3.45', status: 'Aktif', jalur: 'Mandiri', dosenPa: 'Dr. Rita Istiana, S.Si., M.Pd.' },
        { npm: '065122023', nama: 'Cantika Dewi', jk: 'Perempuan', angkatan: '2022', ipk: '3.60', status: 'Aktif', jalur: 'SNMPTN', dosenPa: 'Surti Kurniasih, S.Si., M.Si.' },
        { npm: '065123004', nama: 'Fajar Maulana', jk: 'Laki-laki', angkatan: '2023', ipk: '3.38', status: 'Aktif', jalur: 'SBMPTN', dosenPa: 'Susi Rahayu, S.Si., M.Si.' },
        { npm: '065123019', nama: 'Gita Permata', jk: 'Perempuan', angkatan: '2023', ipk: '3.55', status: 'Aktif', jalur: 'Mandiri', dosenPa: 'Mochamad Ridwan, S.Si., M.Si.' },
        { npm: '065124011', nama: 'Hendra Saputra', jk: 'Laki-laki', angkatan: '2024', ipk: '3.25', status: 'Aktif', jalur: 'SNMPTN', dosenPa: 'Dwi Astuti, S.Pd., M.Si.' },
        { npm: '065124032', nama: 'Indah Cahyani', jk: 'Perempuan', angkatan: '2024', ipk: '3.68', status: 'Aktif', jalur: 'SBMPTN', dosenPa: 'Arif Rahman, S.Si., M.Sc.' }
      ],
      beasiswa: [
        { npm: '065121008', nama: 'Anisa Ramadhani', jk: 'Perempuan', angkatan: '2021', ipk: '3.85', status: 'Aktif', jalur: 'KIP-Kuliah', beasiswa: 'KIP-Kuliah', dosenPa: 'Dr. Triastuti Sulistyaningsih, M.Si.' },
        { npm: '065122023', nama: 'Cantika Dewi', jk: 'Perempuan', angkatan: '2022', ipk: '3.60', status: 'Aktif', jalur: 'Prestasi', beasiswa: 'Beasiswa Unggulan', dosenPa: 'Surti Kurniasih, S.Si., M.Si.' },
        { npm: '065124032', nama: 'Indah Cahyani', jk: 'Perempuan', angkatan: '2024', ipk: '3.68', status: 'Aktif', jalur: 'KIP-Kuliah', beasiswa: 'KIP-Kuliah', dosenPa: 'Arif Rahman, S.Si., M.Sc.' }
      ]
    },
    'kimia': {
      namaProdi: 'Kimia',
      reguler: [
        { npm: '062121003', nama: 'Ahmad Fauzi', jk: 'Laki-laki', angkatan: '2021', ipk: '3.65', status: 'Aktif', jalur: 'SNMPTN', dosenPa: 'Dr. Ade Heri Mulyati, M.Si.' },
        { npm: '062121014', nama: 'Bella Safira', jk: 'Perempuan', angkatan: '2021', ipk: '3.78', status: 'Aktif', jalur: 'SBMPTN', dosenPa: 'Dra. Nancy Siti Djenar, M.S.' },
        { npm: '062122009', nama: 'Cahyo Wibowo', jk: 'Laki-laki', angkatan: '2022', ipk: '3.42', status: 'Aktif', jalur: 'Mandiri', dosenPa: 'Dr. Dra. Tri Aminingsih, M.Si.' },
        { npm: '062122021', nama: 'Dewi Sartika', jk: 'Perempuan', angkatan: '2022', ipk: '3.58', status: 'Aktif', jalur: 'SNMPTN', dosenPa: 'Dr. Ir. Eka Herlina, M.Si.' },
        { npm: '062123008', nama: 'Eko Prasetyo', jk: 'Laki-laki', angkatan: '2023', ipk: '3.35', status: 'Aktif', jalur: 'SBMPTN', dosenPa: 'Lina Noviyanti, S.Si., M.Si.' },
        { npm: '062124017', nama: 'Fitri Handayani', jk: 'Perempuan', angkatan: '2024', ipk: '3.70', status: 'Aktif', jalur: 'SNMPTN', dosenPa: 'Dr. Ade Heri Mulyati, M.Si.' }
      ],
      beasiswa: [
        { npm: '062121014', nama: 'Bella Safira', jk: 'Perempuan', angkatan: '2021', ipk: '3.78', status: 'Aktif', jalur: 'Prestasi', beasiswa: 'Beasiswa Djarum Plus', dosenPa: 'Dra. Nancy Siti Djenar, M.S.' },
        { npm: '062124017', nama: 'Fitri Handayani', jk: 'Perempuan', angkatan: '2024', ipk: '3.70', status: 'Aktif', jalur: 'KIP-Kuliah', beasiswa: 'KIP-Kuliah', dosenPa: 'Dr. Ade Heri Mulyati, M.Si.' }
      ]
    },
    'matematika': {
      namaProdi: 'Matematika',
      reguler: [
        { npm: '063121002', nama: 'Gilang Ramadhan', jk: 'Laki-laki', angkatan: '2021', ipk: '3.80', status: 'Aktif', jalur: 'SNMPTN', dosenPa: 'Dr. Fajar Nugraha, M.Si.' },
        { npm: '063121011', nama: 'Hany Kusumawati', jk: 'Perempuan', angkatan: '2021', ipk: '3.62', status: 'Aktif', jalur: 'SBMPTN', dosenPa: 'Dra. Sri Mulyatun, M.Si.' },
        { npm: '063122005', nama: 'Irfan Hakim', jk: 'Laki-laki', angkatan: '2022', ipk: '3.48', status: 'Aktif', jalur: 'Mandiri', dosenPa: 'Agus Salim, M.Si.' },
        { npm: '063123014', nama: 'Juwita Sari', jk: 'Perempuan', angkatan: '2023', ipk: '3.74', status: 'Aktif', jalur: 'SNMPTN', dosenPa: 'Dr. Fajar Nugraha, M.Si.' },
        { npm: '063124009', nama: 'Kiki Pratama', jk: 'Laki-laki', angkatan: '2024', ipk: '3.30', status: 'Aktif', jalur: 'SBMPTN', dosenPa: 'Dra. Sri Mulyatun, M.Si.' }
      ],
      beasiswa: [
        { npm: '063121002', nama: 'Gilang Ramadhan', jk: 'Laki-laki', angkatan: '2021', ipk: '3.80', status: 'Aktif', jalur: 'Prestasi', beasiswa: 'Beasiswa BI', dosenPa: 'Dr. Fajar Nugraha, M.Si.' },
        { npm: '063123014', nama: 'Juwita Sari', jk: 'Perempuan', angkatan: '2023', ipk: '3.74', status: 'Aktif', jalur: 'KIP-Kuliah', beasiswa: 'KIP-Kuliah', dosenPa: 'Dr. Fajar Nugraha, M.Si.' }
      ]
    },
    'ilmu-komputer': {
      namaProdi: 'Ilmu Komputer',
      reguler: [
        { npm: '065121005', nama: 'Alif Kurniawan', jk: 'Laki-laki', angkatan: '2021', ipk: '3.88', status: 'Aktif', jalur: 'SNMPTN', dosenPa: 'Dr. Ir. Fitrah Nugraha, M.Kom.' },
        { npm: '065121019', nama: 'Clara Shinta', jk: 'Perempuan', angkatan: '2021', ipk: '3.75', status: 'Aktif', jalur: 'SBMPTN', dosenPa: 'Eneng Tita Tosida, M.Kom.' },
        { npm: '065122041', nama: 'David Beckham', jk: 'Laki-laki', angkatan: '2022', ipk: '3.50', status: 'Aktif', jalur: 'Mandiri', dosenPa: 'Arie Qur\'ania, M.Kom.' },
        { npm: '065122055', nama: 'Elsa Febriani', jk: 'Perempuan', angkatan: '2022', ipk: '3.64', status: 'Aktif', jalur: 'SNMPTN', dosenPa: 'Luki Ardiantoro, M.Kom.' },
        { npm: '065123022', nama: 'Farhan Rizki', jk: 'Laki-laki', angkatan: '2023', ipk: '3.42', status: 'Aktif', jalur: 'SBMPTN', dosenPa: 'Dr. Ir. Fitrah Nugraha, M.Kom.' },
        { npm: '065123080', nama: 'Gaby Gabriella', jk: 'Perempuan', angkatan: '2023', ipk: '3.82', status: 'Aktif', jalur: 'Mandiri', dosenPa: 'Eneng Tita Tosida, M.Kom.' },
        { npm: '065124018', nama: 'Haikal Kamil', jk: 'Laki-laki', angkatan: '2024', ipk: '3.55', status: 'Aktif', jalur: 'SNMPTN', dosenPa: 'Arie Qur\'ania, M.Kom.' }
      ],
      beasiswa: [
        { npm: '065121005', nama: 'Alif Kurniawan', jk: 'Laki-laki', angkatan: '2021', ipk: '3.88', status: 'Aktif', jalur: 'Prestasi', beasiswa: 'Beasiswa Karya Salemba Empat', dosenPa: 'Dr. Ir. Fitrah Nugraha, M.Kom.' },
        { npm: '065123080', nama: 'Gaby Gabriella', jk: 'Perempuan', angkatan: '2023', ipk: '3.82', status: 'Aktif', jalur: 'Prestasi', beasiswa: 'Beasiswa BCA Finance', dosenPa: 'Eneng Tita Tosida, M.Kom.' }
      ]
    },
    'farmasi': {
      namaProdi: 'Farmasi',
      reguler: [
        { npm: '066121002', nama: 'Arina Zulfa', jk: 'Perempuan', angkatan: '2021', ipk: '3.82', status: 'Aktif', jalur: 'SNMPTN', dosenPa: 'Dr. apt. Novitasari, M.Farm.' },
        { npm: '066121015', nama: 'Bayu Wicaksono', jk: 'Laki-laki', angkatan: '2021', ipk: '3.54', status: 'Aktif', jalur: 'SBMPTN', dosenPa: 'Prof. Dr. apt. Yulianita, M.Farm.' },
        { npm: '066122008', nama: 'Chika Jessica', jk: 'Perempuan', angkatan: '2022', ipk: '3.67', status: 'Aktif', jalur: 'Mandiri', dosenPa: 'apt. Fitrianti, M.Farm.' },
        { npm: '066123019', nama: 'Danang Joyo', jk: 'Laki-laki', angkatan: '2023', ipk: '3.40', status: 'Aktif', jalur: 'SNMPTN', dosenPa: 'Dr. apt. Novitasari, M.Farm.' },
        { npm: '066124025', nama: 'Erika Carlina', jk: 'Perempuan', angkatan: '2024', ipk: '3.76', status: 'Aktif', jalur: 'SBMPTN', dosenPa: 'Prof. Dr. apt. Yulianita, M.Farm.' }
      ],
      beasiswa: [
        { npm: '066121002', nama: 'Arina Zulfa', jk: 'Perempuan', angkatan: '2021', ipk: '3.82', status: 'Aktif', jalur: 'Prestasi', beasiswa: 'Beasiswa Kalbe Farma', dosenPa: 'Dr. apt. Novitasari, M.Farm.' },
        { npm: '066124025', nama: 'Erika Carlina', jk: 'Perempuan', angkatan: '2024', ipk: '3.76', status: 'Aktif', jalur: 'KIP-Kuliah', beasiswa: 'KIP-Kuliah', dosenPa: 'Prof. Dr. apt. Yulianita, M.Farm.' }
      ]
    },
    'ppa': {
      namaProdi: 'Profesi Apoteker',
      reguler: [
        { npm: '067123001', nama: 'apt. Ahmad Zaki, S.Farm.', jk: 'Laki-laki', angkatan: '2023', ipk: '3.90', status: 'Aktif', jalur: 'Reguler PPA', dosenPa: 'Prof. Dr. apt. Yulianita, M.Farm.' },
        { npm: '067123012', nama: 'apt. Berliana, S.Farm.', jk: 'Perempuan', angkatan: '2023', ipk: '3.85', status: 'Aktif', jalur: 'Reguler PPA', dosenPa: 'Dr. apt. Novitasari, M.Farm.' },
        { npm: '067124005', nama: 'apt. Cindy Aulia, S.Farm.', jk: 'Perempuan', angkatan: '2024', ipk: '3.78', status: 'Aktif', jalur: 'Reguler PPA', dosenPa: 'apt. Fitrianti, M.Farm.' }
      ],
      beasiswa: [
        { npm: '067123001', nama: 'apt. Ahmad Zaki, S.Farm.', jk: 'Laki-laki', angkatan: '2023', ipk: '3.90', status: 'Aktif', jalur: 'Reguler PPA', beasiswa: 'Beasiswa Ikatan Alumni', dosenPa: 'Prof. Dr. apt. Yulianita, M.Farm.' }
      ]
    }
  };

  let currentDataMhsProdiKey = 'biologi';
  let currentDataMhsKategoriKey = 'reguler';
  let currentDataMhsSearchQuery = '';

  function getFilteredMahasiswaList() {
    const prodiEntry = dataMahasiswaPerProdiDB[currentDataMhsProdiKey] || dataMahasiswaPerProdiDB['biologi'];
    let list = prodiEntry[currentDataMhsKategoriKey] || prodiEntry['reguler'];

    if (currentDataMhsSearchQuery && currentDataMhsSearchQuery.trim() !== '') {
      const q = currentDataMhsSearchQuery.toLowerCase().trim();
      list = list.filter(m => 
        (m.nama && m.nama.toLowerCase().includes(q)) || 
        (m.npm && m.npm.toLowerCase().includes(q)) ||
        (m.dosenPa && m.dosenPa.toLowerCase().includes(q))
      );
    }
    return list;
  }

  function renderTabelMahasiswaPerProdi() {
    const tbody = document.getElementById('tabelDataMahasiswaBody');
    const badge = document.getElementById('labelMhsCountBadge');
    if (!tbody) return;

    const list = getFilteredMahasiswaList();
    const prodiEntry = dataMahasiswaPerProdiDB[currentDataMhsProdiKey] || dataMahasiswaPerProdiDB['biologi'];
    const kategoriLabel = currentDataMhsKategoriKey === 'reguler' ? 'Mahasiswa Reguler' : 'Penerima Beasiswa';

    if (badge) {
      badge.innerHTML = `<i class="fas fa-check-circle text-emerald-300"></i> ${list.length} ${kategoriLabel} di ${prodiEntry.namaProdi}`;
    }

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="text-center py-6 text-slate-400">
            <i class="fas fa-search mr-2"></i> Tidak ada data mahasiswa yang cocok dengan kriteria pencarian.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((m, idx) => {
      const isHighIpk = parseFloat(m.ipk) >= 3.5;
      const ipkClass = isHighIpk ? 'badge-ipk-high' : 'badge-ipk-mid';

      return `
        <tr>
          <td class="text-center text-slate-400 font-semibold">${idx + 1}</td>
          <td class="font-mono text-xs font-bold text-slate-700">${m.npm}</td>
          <td class="font-semibold text-slate-800">${m.nama}</td>
          <td>${m.jk}</td>
          <td><span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">${m.angkatan}</span></td>
          <td><span class="${ipkClass}">${m.ipk}</span></td>
          <td><span class="badge-status-aktif">${m.status}</span></td>
          <td><span class="text-slate-600 font-medium">${m.beasiswa ? m.beasiswa : m.jalur}</span></td>
          <td class="text-slate-600 text-xs">${m.dosenPa}</td>
        </tr>
      `;
    }).join('');
  }

  function initDataMahasiswaPerProdi() {
    // Prodi Tabs
    const tabs = document.querySelectorAll('#dataMhsProdiTabs .btn-data-mhs-tab');
    tabs.forEach(tab => {
      if (!tab.dataset.bound) {
        tab.dataset.bound = 'true';
        tab.addEventListener('click', function() {
          tabs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
          currentDataMhsProdiKey = this.dataset.mhsTarget || 'biologi';
          renderTabelMahasiswaPerProdi();
        });
      }
    });

    // Kategori Pills
    const katPills = document.querySelectorAll('.btn-mhs-kategori-pill');
    katPills.forEach(pill => {
      if (!pill.dataset.bound) {
        pill.dataset.bound = 'true';
        pill.addEventListener('click', function() {
          katPills.forEach(p => p.classList.remove('active'));
          this.classList.add('active');
          currentDataMhsKategoriKey = this.dataset.kategoriMhsTarget || 'reguler';
          renderTabelMahasiswaPerProdi();
        });
      }
    });

    // Search Input
    const searchInput = document.getElementById('searchMhsInput');
    if (searchInput && !searchInput.dataset.bound) {
      searchInput.dataset.bound = 'true';
      searchInput.addEventListener('input', (e) => {
        currentDataMhsSearchQuery = e.target.value;
        renderTabelMahasiswaPerProdi();
      });
    }

    // Export Buttons
    const btnCsv = document.getElementById('btnExportMhsCsv');
    const btnExcel = document.getElementById('btnExportMhsExcel');
    const btnPrint = document.getElementById('btnExportMhsPrint');
    const btnCopy = document.getElementById('btnExportMhsCopy');

    if (btnCsv && !btnCsv.dataset.bound) {
      btnCsv.dataset.bound = 'true';
      btnCsv.addEventListener('click', exportMahasiswaCsv);
    }
    if (btnExcel && !btnExcel.dataset.bound) {
      btnExcel.dataset.bound = 'true';
      btnExcel.addEventListener('click', exportMahasiswaCsv);
    }
    if (btnPrint && !btnPrint.dataset.bound) {
      btnPrint.dataset.bound = 'true';
      btnPrint.addEventListener('click', () => window.print());
    }
    if (btnCopy && !btnCopy.dataset.bound) {
      btnCopy.dataset.bound = 'true';
      btnCopy.addEventListener('click', () => {
        const list = getFilteredMahasiswaList();
        const headers = ["No", "NPM", "Nama Mahasiswa", "Jenis Kelamin", "Angkatan", "IPK", "Status", "Jalur Masuk / Beasiswa", "Dosen PA"];
        const rows = list.map((m, i) => [i + 1, m.npm, m.nama, m.jk, m.angkatan, m.ipk, m.status, m.beasiswa || m.jalur, m.dosenPa].join('\t'));
        const textToCopy = [headers.join('\t'), ...rows].join('\n');
        
        navigator.clipboard.writeText(textToCopy).then(() => {
          const original = btnCopy.innerHTML;
          btnCopy.innerHTML = `<i class="fas fa-check text-emerald-600"></i><span>Tersalin!</span>`;
          setTimeout(() => {
            btnCopy.innerHTML = original;
          }, 1800);
        });
      });
    }

    renderTabelMahasiswaPerProdi();
  }

  function exportMahasiswaCsv() {
    const list = getFilteredMahasiswaList();
    const headers = ["No", "NPM", "Nama Mahasiswa", "Jenis Kelamin", "Angkatan", "IPK", "Status", "Jalur Masuk / Beasiswa", "Dosen PA"];
    const rows = list.map((m, i) => [
      i + 1,
      `"${m.npm}"`,
      `"${m.nama}"`,
      `"${m.jk}"`,
      `"${m.angkatan}"`,
      `"${m.ipk}"`,
      `"${m.status}"`,
      `"${m.beasiswa || m.jalur}"`,
      `"${m.dosenPa}"`
    ].join(','));

    const csvContent = "\uFEFF" + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `data_mahasiswa_${currentDataMhsProdiKey}_${currentDataMhsKategoriKey}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // --- CUSTOM SELECT PILLS (Tema Ungu #722F99) ---
  function initCustomSelectPills() {
    const selects = document.querySelectorAll('.wd1-select-pill, .wd2-select-pill, .wd3-select-pill, .dosen-select-pill');
    selects.forEach(select => {
      const wrap = select.parentElement;
      if (!wrap) return;

      let trigger = wrap.querySelector('.custom-select-trigger');
      let menu = wrap.querySelector('.custom-select-menu');

      if (!trigger) {
        // Sembunyikan select bawaan secara visual tanpa merusak fungsionalitas
        select.style.position = 'absolute';
        select.style.opacity = '0';
        select.style.pointerEvents = 'none';
        select.style.width = '1px';
        select.style.height = '1px';
        select.style.overflow = 'hidden';
        select.tabIndex = -1;

        trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.className = 'custom-select-trigger';
        trigger.title = select.title || '';
        trigger.innerHTML = `<span class="custom-select-label"></span><i class="fas fa-chevron-down custom-arrow"></i>`;
        wrap.appendChild(trigger);

        menu = document.createElement('div');
        menu.className = 'custom-select-menu';
        wrap.appendChild(menu);

        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = menu.classList.contains('is-open');
          document.querySelectorAll('.custom-select-menu.is-open').forEach(m => {
            m.classList.remove('is-open');
            m.previousElementSibling?.classList.remove('is-open');
          });
          if (!isOpen) {
            menu.classList.add('is-open');
            trigger.classList.add('is-open');
          }
        });
      }

      // Render opsi dropdown
      menu.innerHTML = '';
      const selectedOption = select.options[select.selectedIndex] || select.options[0];
      const labelSpan = trigger.querySelector('.custom-select-label');
      if (labelSpan && selectedOption) {
        labelSpan.textContent = selectedOption.textContent;
      }

      Array.from(select.options).forEach(opt => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'custom-select-option' + (opt.value === select.value ? ' active' : '');
        item.textContent = opt.textContent;
        item.dataset.value = opt.value;

        item.addEventListener('click', (e) => {
          e.stopPropagation();
          select.value = opt.value;
          if (labelSpan) labelSpan.textContent = opt.textContent;
          menu.querySelectorAll('.custom-select-option').forEach(o => o.classList.remove('active'));
          item.classList.add('active');
          menu.classList.remove('is-open');
          trigger.classList.remove('is-open');
          select.dispatchEvent(new Event('change', { bubbles: true }));
        });

        menu.appendChild(item);
      });

      if (!select.dataset.customBound) {
        select.dataset.customBound = 'true';
        select.addEventListener('change', () => {
          const curOpt = select.options[select.selectedIndex];
          if (curOpt && labelSpan) {
            labelSpan.textContent = curOpt.textContent;
          }
          menu.querySelectorAll('.custom-select-option').forEach(o => {
            if (o.dataset.value === select.value) {
              o.classList.add('active');
            } else {
              o.classList.remove('active');
            }
          });
        });
      }
    });
  }

  // Global click & esc listener
  if (!window._customSelectListenerBound) {
    window._customSelectListenerBound = true;
    document.addEventListener('click', () => {
      document.querySelectorAll('.custom-select-menu.is-open').forEach(m => {
        m.classList.remove('is-open');
        m.previousElementSibling?.classList.remove('is-open');
      });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.custom-select-menu.is-open').forEach(m => {
          m.classList.remove('is-open');
          m.previousElementSibling?.classList.remove('is-open');
        });
      }
    });
  }

  // --- INIT ---
  async function init() {
    initSidebarToggle();
    initSidebarNavigation();
    initSidebarDropdown();
    initLogo();
    await loadDashboardSections();
    await loadWakilDekan1Sections();
    initFilterTabs();
    initWakilDekan1();
    await loadWakilDekan2Sections();
    initWakilDekan2();
    await loadWakilDekan3Sections();
    initWakilDekan3();
    await loadDosenSections();
    initDosen();
    await loadMahasiswaSections();
    initMahasiswa();
    initCustomSelectPills();

    console.log('✅ FMIPA Universitas Pakuan Sidebar (Tema Ungu)');
    console.log('🎨 Warna: Ungu dengan Active Putih');
    console.log('📋 Menu: Dashboard, Members, Banner, Project, Mitra');
  }

  // Run when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();


