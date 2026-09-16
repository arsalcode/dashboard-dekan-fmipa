/**
 * DATA SCHEMAS UNTUK SELURUH 12 MODUL DASHBOARD DEKAN FMIPA UNPAK
 * Single Source of Truth untuk Template Excel, Validasi Impor, dan Form Input Manual
 */

export const DATA_SCHEMAS = {
  'dosen': {
    title: 'Data Operasional Dosen',
    singular: 'Dosen',
    icon: 'fa-solid fa-chalkboard-user',
    sheetName: 'Data Dosen FMIPA',
    filename: 'Template_Data_Dosen_FMIPA_UNPAK.xlsx',
    columns: [
      { key: 'nama', label: 'Nama Lengkap & Gelar', type: 'text', required: true, example: 'Dr. Budi Santoso, M.Si.' },
      { key: 'jk', label: 'Jenis Kelamin', type: 'select', options: ['Laki-laki', 'Perempuan'], required: true, example: 'Laki-laki' },
      { key: 'nidn', label: 'NIDN', type: 'text', required: true, example: '0412038501' },
      { key: 'nidk', label: 'NIDK', type: 'text', required: false, example: '-' },
      { key: 'prodi', label: 'Program Studi', type: 'select', options: ['Biologi', 'Kimia', 'Matematika', 'Ilmu Komputer', 'Farmasi', 'Profesi Apoteker'], required: true, example: 'Biologi' },
      { key: 'status', label: 'Status Kepegawaian', type: 'select', options: ['Aktif', 'Cuti', 'Tugas Belajar', 'Pensiun'], required: true, example: 'Aktif' },
      { key: 'sertif', label: 'Sertifikasi Dosen', type: 'select', options: ['Bersertifikat', 'Belum Bersertifikat'], required: true, example: 'Bersertifikat' },
      { key: 'jabatan', label: 'Jabatan Akademik', type: 'select', options: ['Tenaga Pengajar', 'Asisten Ahli', 'Lektor', 'Lektor Kepala', 'Guru Besar'], required: true, example: 'Lektor' },
      { key: 'strata', label: 'Pendidikan Tertinggi', type: 'select', options: ['S2 (Magister)', 'S3 (Doktor)', 'Spesialis'], required: true, example: 'S3 (Doktor)' },
      { key: 'kategori', label: 'Kategori Homebase', type: 'select', options: ['homebase', 'rasio'], required: true, example: 'homebase' }
    ]
  },

  'kerjasama': {
    title: 'Katalog Kerjasama & Mitra',
    singular: 'Kerjasama',
    icon: 'fa-solid fa-handshake-angle',
    sheetName: 'Data Kerjasama FMIPA',
    filename: 'Template_Data_Kerjasama_FMIPA_UNPAK.xlsx',
    columns: [
      { key: 'no_dokumen', label: 'Nomor Dokumen MoU/MoA', type: 'text', required: true, example: '030/MoU/FMIPA-UNPAK/2026' },
      { key: 'mitra', label: 'Nama Instansi / Mitra', type: 'text', required: true, example: 'PT Kimia Farma Tbk' },
      { key: 'sektor', label: 'Sektor Mitra', type: 'select', options: ['industri', 'pemerintah', 'pendidikan', 'internasional'], required: true, example: 'industri' },
      { key: 'jenis', label: 'Jenis Dokumen', type: 'select', options: ['mou', 'moa', 'ia'], required: true, example: 'mou' },
      { key: 'lingkup', label: 'Ruang Lingkup Kerjasama', type: 'text', required: true, example: 'Magang Mahasiswa, Riset Terapan & Kuliah Dosen Praktisi' },
      { key: 'tingkat', label: 'Tingkat Kerjasama', type: 'select', options: ['Lokal', 'Nasional', 'Internasional'], required: true, example: 'Nasional' },
      { key: 'tgl_mulai', label: 'Tanggal Mulai', type: 'date', required: true, example: '2026-01-15' },
      { key: 'tgl_selesai', label: 'Tanggal Selesai', type: 'date', required: true, example: '2029-01-15' },
      { key: 'pic', label: 'PIC / Unit Pelaksana', type: 'select', options: ['Fakultas (Dekanat)', 'Prodi Biologi', 'Prodi Kimia', 'Prodi Matematika', 'Prodi Ilmu Komputer', 'Prodi Farmasi', 'Prodi PPA'], required: true, example: 'Prodi Farmasi' },
      { key: 'status', label: 'Status Keberlakuan', type: 'select', options: ['aktif', 'akan_berakhir', 'kadaluarsa'], required: true, example: 'aktif' },
      { key: 'realisasi_ia', label: 'Realisasi Implementasi Action (IA)', type: 'text', required: false, example: '2 Kegiatan: Kuliah Tamu & Magang 5 Mahasiswa' },
      { key: 'nilai_hibah', label: 'Nilai Hibah / Kontrak', type: 'text', required: false, example: 'Rp 150.000.000' }
    ]
  },

  'mahasiswa': {
    title: 'Data Operasional Mahasiswa',
    singular: 'Mahasiswa',
    icon: 'fa-solid fa-user-graduate',
    sheetName: 'Data Mahasiswa FMIPA',
    filename: 'Template_Data_Mahasiswa_FMIPA_UNPAK.xlsx',
    columns: [
      { key: 'npm', label: 'NPM (Nomor Pokok Mahasiswa)', type: 'text', required: true, example: '065122001' },
      { key: 'nama', label: 'Nama Mahasiswa', type: 'text', required: true, example: 'Ahmad Fauzi' },
      { key: 'prodi', label: 'Program Studi', type: 'select', options: ['Biologi', 'Kimia', 'Matematika', 'Ilmu Komputer', 'Farmasi', 'Profesi Apoteker'], required: true, example: 'Ilmu Komputer' },
      { key: 'angkatan', label: 'Tahun Angkatan', type: 'number', required: true, example: '2022' },
      { key: 'ipk', label: 'IPK Kumulatif', type: 'number', step: '0.01', required: true, example: '3.75' },
      { key: 'sks', label: 'Total SKS Lulus', type: 'number', required: true, example: '110' },
      { key: 'status', label: 'Status Akademik', type: 'select', options: ['Aktif', 'Cuti', 'Lulus', 'DO / Keluar'], required: true, example: 'Aktif' },
      { key: 'jalur_masuk', label: 'Jalur Masuk', type: 'select', options: ['SNBP', 'SNBT', 'Mandiri', 'Beasiswa'], required: false, example: 'SNBT' }
    ]
  },

  'kurikulum': {
    title: 'Kurikulum & Mata Kuliah FMIPA',
    singular: 'Mata Kuliah',
    icon: 'fa-solid fa-book-bookmark',
    sheetName: 'Data Kurikulum FMIPA',
    filename: 'Template_Kurikulum_FMIPA_UNPAK.xlsx',
    columns: [
      { key: 'kode_mk', label: 'Kode Mata Kuliah', type: 'text', required: true, example: 'KOM3201' },
      { key: 'nama_mk', label: 'Nama Mata Kuliah', type: 'text', required: true, example: 'Kecerdasan Buatan' },
      { key: 'prodi', label: 'Program Studi', type: 'select', options: ['Biologi', 'Kimia', 'Matematika', 'Ilmu Komputer', 'Farmasi', 'Profesi Apoteker'], required: true, example: 'Ilmu Komputer' },
      { key: 'sks', label: 'Bobot SKS', type: 'number', required: true, example: '3' },
      { key: 'semester', label: 'Semester', type: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8'], required: true, example: '5' },
      { key: 'sifat', label: 'Sifat Mata Kuliah', type: 'select', options: ['Wajib Prodi', 'Wajib Fakultas', 'Pilihan', 'MBKM'], required: true, example: 'Wajib Prodi' },
      { key: 'dosen_pengampu', label: 'Koordinator Dosen', type: 'text', required: false, example: 'Prof. Dr. Encep Syarief N., M.Kom.' }
    ]
  },

  'penelitian': {
    title: 'Riset, Penelitian & Publikasi',
    singular: 'Penelitian',
    icon: 'fa-solid fa-flask-vial',
    sheetName: 'Data Penelitian FMIPA',
    filename: 'Template_Penelitian_FMIPA_UNPAK.xlsx',
    columns: [
      { key: 'judul', label: 'Judul Penelitian / Riset', type: 'text', required: true, example: 'Sintesis Nanopartikel Ekstrak Daun Sirih Sebagai Antibakteri' },
      { key: 'ketua', label: 'Ketua Peneliti (Dosen)', type: 'text', required: true, example: 'Dr. Ir. Hj. Ade Heri Mulyati, M.Si.' },
      { key: 'prodi', label: 'Program Studi', type: 'select', options: ['Biologi', 'Kimia', 'Matematika', 'Ilmu Komputer', 'Farmasi', 'Profesi Apoteker'], required: true, example: 'Kimia' },
      { key: 'skema', label: 'Skema Hibah', type: 'select', options: ['Kemendikbudristek', 'Internal UNPAK', 'BRIN', 'Mandiri / Kemitraan'], required: true, example: 'Kemendikbudristek' },
      { key: 'tahun', label: 'Tahun Pelaksanaan', type: 'number', required: true, example: '2025' },
      { key: 'dana', label: 'Nominal Pendanaan', type: 'text', required: true, example: 'Rp 85.000.000' },
      { key: 'output', label: 'Luaran / Target Jurnal', type: 'select', options: ['Scopus Q1/Q2', 'Scopus Q3/Q4', 'Sinta 1/2', 'Sinta 3/4', 'Paten / HKI'], required: true, example: 'Scopus Q2' },
      { key: 'status', label: 'Status Riset', type: 'select', options: ['Selesai', 'Sedang Berjalan', 'Laporan Akhir'], required: true, example: 'Sedang Berjalan' }
    ]
  },

  'partisipasi': {
    title: 'Partisipasi & Keaktifan Sivitas',
    singular: 'Partisipasi',
    icon: 'fa-solid fa-users-rays',
    sheetName: 'Data Partisipasi FMIPA',
    filename: 'Template_Partisipasi_FMIPA_UNPAK.xlsx',
    columns: [
      { key: 'kegiatan', label: 'Nama Kegiatan / Acara', type: 'text', required: true, example: 'ONMIPA-PT Bidang Matematika Tingkat Wilayah IV' },
      { key: 'peserta', label: 'Nama Sivitas / Delegasi', type: 'text', required: true, example: 'Reza Pratama & Tim' },
      { key: 'kategori_peserta', label: 'Kategori Sivitas', type: 'select', options: ['Mahasiswa', 'Dosen', 'Tendik', 'Kolaborasi'], required: true, example: 'Mahasiswa' },
      { key: 'prodi', label: 'Program Studi', type: 'select', options: ['Biologi', 'Kimia', 'Matematika', 'Ilmu Komputer', 'Farmasi', 'Profesi Apoteker'], required: true, example: 'Matematika' },
      { key: 'tingkat', label: 'Tingkat Kegiatan', type: 'select', options: ['Fakultas / Universitas', 'Regional / Wilayah', 'Nasional', 'Internasional'], required: true, example: 'Nasional' },
      { key: 'tahun', label: 'Tahun', type: 'number', required: true, example: '2025' },
      { key: 'prestasi', label: 'Capaian / Hasil', type: 'text', required: true, example: 'Juara 2 (Medali Perak)' }
    ]
  },

  'web-medsos': {
    title: 'Konten Website & Media Sosial',
    singular: 'Konten',
    icon: 'fa-solid fa-globe',
    sheetName: 'Data Web Medsos FMIPA',
    filename: 'Template_Web_Medsos_FMIPA_UNPAK.xlsx',
    columns: [
      { key: 'judul', label: 'Judul Berita / Konten', type: 'text', required: true, example: 'Pelepasan Calon Wisudawan FMIPA Gelombang I 2026' },
      { key: 'platform', label: 'Platform Publikasi', type: 'select', options: ['Website FMIPA', 'Facebook FMIPA', 'YouTube FMIPA', 'LinkedIn FMIPA', 'TikTok'], required: true, example: 'Website FMIPA' },
      { key: 'tanggal', label: 'Tanggal Terbit', type: 'date', required: true, example: '2026-02-10' },
      { key: 'views', label: 'Jumlah Views / Pembaca', type: 'number', required: true, example: '1450' },
      { key: 'kategori', label: 'Kategori Berita', type: 'select', options: ['Akademik', 'Kemahasiswaan', 'Prestasi', 'Kerjasama', 'Pengumuman'], required: true, example: 'Akademik' }
    ]
  },

  'instagram-analytics': {
    title: 'Instagram Analytics (@fmipa_unpak)',
    singular: 'Postingan IG',
    icon: 'fa-brands fa-instagram',
    sheetName: 'Instagram Analytics FMIPA',
    filename: 'Template_Instagram_FMIPA_UNPAK.xlsx',
    columns: [
      { key: 'post_id', label: 'Kode / Tautan Post', type: 'text', required: true, example: 'POST-2026-02-01' },
      { key: 'caption', label: 'Ringkasan Caption / Topik', type: 'text', required: true, example: 'Kunjungan Mahasiswa Farmasi ke Pabrik PT Bio Farma' },
      { key: 'tipe', label: 'Format Konten', type: 'select', options: ['Carousel', 'Reels', 'Single Image', 'Story Highlight'], required: true, example: 'Carousel' },
      { key: 'tanggal', label: 'Tanggal Unggah', type: 'date', required: true, example: '2026-02-01' },
      { key: 'likes', label: 'Jumlah Likes', type: 'number', required: true, example: '482' },
      { key: 'comments', label: 'Jumlah Komentar', type: 'number', required: true, example: '37' },
      { key: 'shares', label: 'Shares / Repost', type: 'number', required: true, example: '58' },
      { key: 'reach', label: 'Total Jangkauan (Reach)', type: 'number', required: true, example: '5200' }
    ]
  },

  'unit-bisnis': {
    title: 'Unit Bisnis & Revenue Generasi FMIPA',
    singular: 'Layanan Bisnis',
    icon: 'fa-solid fa-briefcase',
    sheetName: 'Data Unit Bisnis FMIPA',
    filename: 'Template_Unit_Bisnis_FMIPA_UNPAK.xlsx',
    columns: [
      { key: 'kode', label: 'Kode Transaksi / Invoice', type: 'text', required: true, example: 'UB-2026-008' },
      { key: 'unit', label: 'Unit Bisnis Pelaksana', type: 'select', options: ['Laboratorium Terpadu', 'Pusat Pelatihan & Komputasi', 'Apotek Pendidikan', 'Jasa Analisis Uji', 'Sewa Fasilitas'], required: true, example: 'Laboratorium Terpadu' },
      { key: 'layanan', label: 'Nama Layanan / Produk', type: 'text', required: true, example: 'Jasa Kalibrasi Spektrofotometer' },
      { key: 'pelanggan', label: 'Instansi / Klien', type: 'text', required: true, example: 'Dinas Lingkungan Hidup Kab. Bogor' },
      { key: 'tanggal', label: 'Tanggal Pembayaran', type: 'date', required: true, example: '2026-02-14' },
      { key: 'nominal', label: 'Nominal Pendapatan', type: 'text', required: true, example: 'Rp 14.500.000' },
      { key: 'status', label: 'Status Pembayaran', type: 'select', options: ['Lunas', 'Menunggu Verifikasi', 'Termin 1'], required: true, example: 'Lunas' }
    ]
  },

  'comstrac-dsc': {
    title: 'ComSTraC & Data Science Center',
    singular: 'Program Kursus',
    icon: 'fa-solid fa-brain',
    sheetName: 'Data ComSTraC FMIPA',
    filename: 'Template_ComSTraC_FMIPA_UNPAK.xlsx',
    columns: [
      { key: 'program', label: 'Nama Pelatihan / Bootcamp', type: 'text', required: true, example: 'Data Analytics & Machine Learning with Python Batch 5' },
      { key: 'instruktur', label: 'Koordinator Instruktur', type: 'text', required: true, example: 'Dr. Dian Kartika Utami, M.Kom.' },
      { key: 'kategori', label: 'Kategori Pelatihan', type: 'select', options: ['Data Science', 'AI & Machine Learning', 'Geographic Information System', 'Software Engineering'], required: true, example: 'Data Science' },
      { key: 'peserta', label: 'Jumlah Peserta', type: 'number', required: true, example: '32' },
      { key: 'tgl_mulai', label: 'Tanggal Mulai', type: 'date', required: true, example: '2026-03-01' },
      { key: 'durasi', label: 'Durasi Pertemuan', type: 'text', required: true, example: '8 Sesi (24 Jam)' },
      { key: 'revenue', label: 'Total Revenue', type: 'text', required: true, example: 'Rp 38.400.000' },
      { key: 'status', label: 'Status Batch', type: 'select', options: ['Berjalan', 'Pendaftaran Buka', 'Selesai'], required: true, example: 'Pendaftaran Buka' }
    ]
  },

  'kesehatan-apotek': {
    title: 'Layanan Kesehatan & Apotek Pendidikan',
    singular: 'Transaksi Apotek',
    icon: 'fa-solid fa-prescription-bottle-medical',
    sheetName: 'Data Apotek FMIPA',
    filename: 'Template_Apotek_FMIPA_UNPAK.xlsx',
    columns: [
      { key: 'no_faktur', label: 'Nomor Faktur', type: 'text', required: true, example: 'APT-2026-0248' },
      { key: 'nama_item', label: 'Nama Obat / Produk Farmasi', type: 'text', required: true, example: 'Amoxicillin 500mg Strip' },
      { key: 'kategori', label: 'Kategori Produk', type: 'select', options: ['Obat Bebas (OTC)', 'Obat Keras (Resep)', 'Suplemen & Vitamin', 'Alat Kesehatan'], required: true, example: 'Obat Bebas (OTC)' },
      { key: 'qty', label: 'Jumlah Terjual (Qty)', type: 'number', required: true, example: '15' },
      { key: 'total', label: 'Total Transaksi', type: 'text', required: true, example: 'Rp 185.000' },
      { key: 'kasir', label: 'Tenaga Apoteker / Kasir', type: 'text', required: false, example: 'apt. Rina Marlina, S.Farm.' },
      { key: 'tanggal', label: 'Waktu Transaksi', type: 'date', required: true, example: '2026-02-18' }
    ]
  },

  'lab-gis': {
    title: 'Laboratorium GIS Terpadu',
    singular: 'Proyek GIS',
    icon: 'fa-solid fa-map-location-dot',
    sheetName: 'Data Lab GIS FMIPA',
    filename: 'Template_Lab_GIS_FMIPA_UNPAK.xlsx',
    columns: [
      { key: 'kode_proyek', label: 'Kode Proyek Pemetaan', type: 'text', required: true, example: 'GIS-2026-PR03' },
      { key: 'nama_proyek', label: 'Nama Proyek / Kegiatan', type: 'text', required: true, example: 'Pemetaan Tutupan Lahan & Rawan Longsor DAS Cisadane Hulu' },
      { key: 'klien', label: 'Instansi Pemberi Kerja', type: 'text', required: true, example: 'Bappeda Kota Bogor' },
      { key: 'durasi', label: 'Durasi Kontrak', type: 'text', required: true, example: '4 Bulan' },
      { key: 'nilai_kontrak', label: 'Nilai Kontrak Proyek', type: 'text', required: true, example: 'Rp 120.000.000' },
      { key: 'pic', label: 'Koordinator Tim Riset GIS', type: 'text', required: true, example: 'Tim Ahli GIS FMIPA' },
      { key: 'progress', label: 'Progress (%)', type: 'number', required: true, example: '65' },
      { key: 'status', label: 'Status Proyek', type: 'select', options: ['Pengerjaan', 'Review Laporan', 'Selesai'], required: true, example: 'Pengerjaan' }
    ]
  },

  'lab-service': {
    title: 'Lab Service Terpadu ISO 17025',
    singular: 'Pengujian Sampel',
    icon: 'fa-solid fa-vial-circle-check',
    sheetName: 'Data Lab Service ISO 17025',
    filename: 'Template_Lab_Service_FMIPA_UNPAK.xlsx',
    columns: [
      { key: 'kode_sampel', label: 'Kode Order Sampel', type: 'text', required: true, example: 'SMP-2026-0091' },
      { key: 'jenis_sampel', label: 'Jenis Sampel Uji', type: 'select', options: ['Air Limbah Industri', 'Air Minum & Higiene', 'Bahan Pangan & Makanan', 'Sediaan Farmasi & Kosmetik', 'Ekstrak Bahan Alam', 'Logam Berat & Tanah'], required: true, example: 'Air Limbah Industri' },
      { key: 'parameter', label: 'Parameter Analisis', type: 'text', required: true, example: 'BOD, COD, TSS, Logam Berat Pb/Cd' },
      { key: 'metode', label: 'Metode Instrumen', type: 'select', options: ['Spektrofotometri UV-Vis', 'AAS (Atomic Absorption)', 'HPLC', 'GC-MS', 'Titrasi / Gravimetri'], required: true, example: 'AAS (Atomic Absorption)' },
      { key: 'pemohon', label: 'Nama Klien / Perusahaan', type: 'text', required: true, example: 'PT Tirta Mandiri Sejahtera' },
      { key: 'tgl_masuk', label: 'Tanggal Penerimaan', type: 'date', required: true, example: '2026-02-15' },
      { key: 'target_selesai', label: 'Target Selesai', type: 'date', required: true, example: '2026-02-22' },
      { key: 'biaya', label: 'Tarif / PNBP', type: 'text', required: true, example: 'Rp 4.250.000' },
      { key: 'status', label: 'Status Pengujian', type: 'select', options: ['Pengujian Berjalan', 'Verifikasi Manajer Teknis', 'Sertifikat Terbit (LHU)', 'Menunggu Sampel'], required: true, example: 'Pengujian Berjalan' }
    ]
  }
};
