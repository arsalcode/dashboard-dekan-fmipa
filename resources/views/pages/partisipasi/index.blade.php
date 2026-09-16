@extends('layouts.app')

@section('title', 'Partisipasi & Keaktifan Sivitas FMIPA')

@section('content')
<div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
    <!-- Executive Hero Banner (Partisipasi & Keaktifan Edition - Standar Dosen & Dashboard) -->
    <div id="executiveHeroBannerPartisipasi" class="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#722F99] via-[#592279] to-[#3a1251] text-white p-6 sm:p-8 shadow-xl shadow-purple-950/20 border border-purple-800/40 mb-8 z-30">
        <!-- Ambient Decorative Glow Circles -->
        <div class="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none">
            <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div class="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-[#9333ea]/20 blur-3xl"></div>
        </div>

        <!-- Top Row: Executive Title & Academic Period Badge -->
        <div class="relative z-10 flex items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                    <i class="fa-solid fa-chart-line text-2xl sm:text-3xl text-amber-300"></i>
                </div>
                <div>
                    <div class="flex items-center gap-2.5">
                        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Partisipasi &amp; Keaktifan Sivitas</h1>
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-xs">Ormawa &amp; MBKM</span>
                    </div>
                    <p class="text-purple-200 text-xs sm:text-sm mt-1 font-medium">FMIPA Universitas Pakuan &bull; Pemantauan Keterlibatan Mahasiswa dalam Kegiatan Ormawa, Kompetisi Ilmiah, MBKM, dan Evaluasi Dosen (EDOM)</p>
                </div>
            </div>

            <div class="flex items-center gap-2 shrink-0">
                <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold border border-white/25 shadow-xs">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    T.A. 2025/2026
                </span>
            </div>
        </div>

        <!-- Bottom Row: Integrated Multi-Dimension Dropdown Filter Bar -->
        <div class="relative z-10 pt-5">
            <div class="inline-flex flex-wrap items-center gap-2.5 p-2 sm:p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-full shadow-inner shadow-white/5">
                <span class="partisipasi-filter-label px-1">
                    <i class="fa-solid fa-filter text-amber-300 text-xs"></i> Filter:
                </span>
                
                <!-- 1. Program Studi Filter -->
                <div class="partisipasi-dropdown-wrap" data-filter="prodi" id="wrapFilterPartisipasiProdi">
                    <input type="hidden" id="filterPartisipasiProdi" value="semua">
                    <button type="button" class="partisipasi-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-graduation-cap text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Prodi:</span>
                        <span class="partisipasi-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="partisipasi-dropdown-menu">
                        <div class="partisipasi-dropdown-item active is-active" data-value="semua">Semua Program Studi</div>
                        <div class="partisipasi-dropdown-item" data-value="Ilmu Komputer">Ilmu Komputer</div>
                        <div class="partisipasi-dropdown-item" data-value="Farmasi">Farmasi</div>
                        <div class="partisipasi-dropdown-item" data-value="Biologi">Biologi</div>
                        <div class="partisipasi-dropdown-item" data-value="Kimia">Kimia</div>
                        <div class="partisipasi-dropdown-item" data-value="Matematika">Matematika</div>
                    </div>
                </div>

                <!-- 2. Kategori Kegiatan Filter -->
                <div class="partisipasi-dropdown-wrap" data-filter="kategori" id="wrapFilterPartisipasiKategori">
                    <input type="hidden" id="filterPartisipasiKategori" value="semua">
                    <button type="button" class="partisipasi-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-layer-group text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Kategori:</span>
                        <span class="partisipasi-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="partisipasi-dropdown-menu">
                        <div class="partisipasi-dropdown-item active is-active" data-value="semua">Semua Kategori</div>
                        <div class="partisipasi-dropdown-item" data-value="ormawa">Ormawa &amp; Kepemimpinan</div>
                        <div class="partisipasi-dropdown-item" data-value="lomba">Lomba &amp; Prestasi Ilmiah</div>
                        <div class="partisipasi-dropdown-item" data-value="mbkm">Program MBKM Kampus Merdeka</div>
                        <div class="partisipasi-dropdown-item" data-value="seminar">Seminar &amp; Workshop</div>
                        <div class="partisipasi-dropdown-item" data-value="edom">Evaluasi EDOM / Kuesioner</div>
                    </div>
                </div>

                <!-- 3. Periode Waktu Filter -->
                <div class="partisipasi-dropdown-wrap" data-filter="periode" id="wrapFilterPartisipasiPeriode">
                    <input type="hidden" id="filterPartisipasiPeriode" value="semua">
                    <button type="button" class="partisipasi-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-calendar-days text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Periode:</span>
                        <span class="partisipasi-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="partisipasi-dropdown-menu">
                        <div class="partisipasi-dropdown-item active is-active" data-value="semua">Semua Periode</div>
                        <div class="partisipasi-dropdown-item" data-value="2026">Tahun 2026 (Terkini)</div>
                        <div class="partisipasi-dropdown-item" data-value="2025">Tahun 2025</div>
                        <div class="partisipasi-dropdown-item" data-value="2024">Tahun 2024</div>
                    </div>
                </div>

                <!-- Reset Filter Button -->
                <button id="btnResetPartisipasiFilters" type="button" class="partisipasi-filter-reset hidden" title="Reset Semua Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    <!-- Sticky Compact Floating Header (Two-Tier Standar Dosen & Wadek 1) -->
    <div id="compactStickyBarPartisipasi">
        <div class="w-full rounded-2xl bg-gradient-to-r from-[#722F99]/96 via-[#592279]/96 to-[#3a1251]/96 backdrop-blur-xl text-white py-2.5 sm:py-3 px-4 sm:px-6 shadow-2xl shadow-purple-950/40 border border-white/25 flex flex-col gap-2.5">
            <!-- Top Row: Mini Brand & Badge -->
            <div class="flex items-center justify-between gap-3 pb-2 border-b border-white/15">
                <div class="flex items-center gap-2.5 sm:gap-3 shrink-0">
                    <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                        <i class="fa-solid fa-chart-line text-xs sm:text-sm text-amber-300"></i>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="font-extrabold text-white text-xs sm:text-sm md:text-base tracking-tight">Partisipasi &amp; Keaktifan FMIPA</span>
                        <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30">Ormawa</span>
                    </div>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-semibold border border-white/25 shadow-xs">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        T.A. 2025/2026
                    </span>
                </div>
            </div>

            <!-- Bottom Row: Synchronized Dropdown Filter Bar -->
            <div class="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-0.5">
                <span class="partisipasi-filter-label px-1 text-xs text-purple-200 font-semibold flex items-center gap-1.5 shrink-0">
                    <i class="fa-solid fa-filter text-amber-300 text-[11px]"></i> Filter:
                </span>

                <!-- Compact Prodi Filter -->
                <div class="partisipasi-dropdown-wrap" data-filter="prodi" id="wrapCompactFilterPartisipasiProdi">
                    <input type="hidden" id="compactFilterPartisipasiProdi" value="semua">
                    <button type="button" class="partisipasi-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-graduation-cap text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Prodi:</span>
                        <span class="partisipasi-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="partisipasi-dropdown-menu">
                        <div class="partisipasi-dropdown-item active is-active" data-value="semua">Semua Program Studi</div>
                        <div class="partisipasi-dropdown-item" data-value="Ilmu Komputer">Ilmu Komputer</div>
                        <div class="partisipasi-dropdown-item" data-value="Farmasi">Farmasi</div>
                        <div class="partisipasi-dropdown-item" data-value="Biologi">Biologi</div>
                        <div class="partisipasi-dropdown-item" data-value="Kimia">Kimia</div>
                        <div class="partisipasi-dropdown-item" data-value="Matematika">Matematika</div>
                    </div>
                </div>

                <!-- Compact Kategori Filter -->
                <div class="partisipasi-dropdown-wrap" data-filter="kategori" id="wrapCompactFilterPartisipasiKategori">
                    <input type="hidden" id="compactFilterPartisipasiKategori" value="semua">
                    <button type="button" class="partisipasi-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-layer-group text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Kategori:</span>
                        <span class="partisipasi-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="partisipasi-dropdown-menu">
                        <div class="partisipasi-dropdown-item active is-active" data-value="semua">Semua Kategori</div>
                        <div class="partisipasi-dropdown-item" data-value="ormawa">Ormawa &amp; Kepemimpinan</div>
                        <div class="partisipasi-dropdown-item" data-value="lomba">Lomba &amp; Prestasi Ilmiah</div>
                        <div class="partisipasi-dropdown-item" data-value="mbkm">Program MBKM Kampus Merdeka</div>
                        <div class="partisipasi-dropdown-item" data-value="seminar">Seminar &amp; Workshop</div>
                        <div class="partisipasi-dropdown-item" data-value="edom">Evaluasi EDOM / Kuesioner</div>
                    </div>
                </div>

                <!-- Compact Periode Filter -->
                <div class="partisipasi-dropdown-wrap" data-filter="periode" id="wrapCompactFilterPartisipasiPeriode">
                    <input type="hidden" id="compactFilterPartisipasiPeriode" value="semua">
                    <button type="button" class="partisipasi-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-calendar-days text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Periode:</span>
                        <span class="partisipasi-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="partisipasi-dropdown-menu">
                        <div class="partisipasi-dropdown-item active is-active" data-value="semua">Semua Periode</div>
                        <div class="partisipasi-dropdown-item" data-value="2026">Tahun 2026 (Terkini)</div>
                        <div class="partisipasi-dropdown-item" data-value="2025">Tahun 2025</div>
                        <div class="partisipasi-dropdown-item" data-value="2024">Tahun 2024</div>
                    </div>
                </div>

                <!-- Reset Filter Button (Compact) -->
                <button id="btnResetCompactPartisipasiFilters" type="button" class="partisipasi-filter-reset hidden" title="Reset Semua Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    <!-- Partisipasi Domain Sections Container (Struktur Modular Mengikuti Dosen) -->
    <div id="partisipasiSections" class="space-y-8">
        <!-- 1. Statistik Partisipasi (Overview, Tren Partisipasi, Distribusi Kategori & EDOM) -->
        @include('pages.partisipasi.partials.statistik')

        <!-- 2. Katalog Agenda & Rekap Partisipasi (Tabel Lengkap, 4 Action Buttons, Export, Live Search & Prodi Tabs) -->
        @include('pages.partisipasi.partials.daftar-partisipasi')
    </div>
</div>

<!-- ============================================
     MODALS
     ============================================ -->

<!-- 1. Modal Catat Agenda & Delegasi Baru -->
<div id="modalTambahPartisipasi" class="partisipasi-modal">
    <div class="partisipasi-modal-dialog">
        <div class="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#722F99] via-[#592279] to-[#3a1251] text-white rounded-t-[1.25rem]">
            <div class="flex items-center gap-2.5">
                <i class="fa-solid fa-calendar-plus text-amber-300 text-lg"></i>
                <h3 class="font-bold text-base sm:text-lg">Catat Agenda / Delegasi Partisipasi</h3>
            </div>
            <button type="button" class="partisipasi-modal-close text-white/70 hover:text-white transition w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
        <form id="formTambahPartisipasi" class="p-5 sm:p-6 space-y-4">
            <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Nama Agenda / Kegiatan</label>
                <input type="text" id="inputNamaAgenda" required placeholder="Contoh: Latihan Keterampilan Manajemen Mahasiswa (LKMM-TD)..." class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Kategori Kegiatan</label>
                    <select id="selectKategoriPartisipasi" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        <option value="Ormawa & Kepemimpinan">Ormawa &amp; Kepemimpinan</option>
                        <option value="Lomba & Prestasi">Lomba &amp; Prestasi Ilmiah</option>
                        <option value="Program MBKM">Program MBKM Kampus Merdeka</option>
                        <option value="Seminar & Workshop">Seminar &amp; Workshop</option>
                        <option value="Evaluasi EDOM">Evaluasi EDOM / Kuesioner</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Penyelenggara / Hima PIC</label>
                    <input type="text" id="inputPenyelenggara" required placeholder="Contoh: BEM FMIPA, HIMAKOM, DPM..." class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Target Peserta</label>
                    <input type="number" id="inputTargetPeserta" required placeholder="Contoh: 150" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Realisasi Hadir</label>
                    <input type="number" id="inputRealisasiHadir" required placeholder="Contoh: 142" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Prodi Dominan</label>
                    <select id="selectProdiDominan" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        <option value="Semua Prodi">Semua Prodi</option>
                        <option value="Ilmu Komputer">Ilmu Komputer</option>
                        <option value="Farmasi">Farmasi</option>
                        <option value="Biologi">Biologi</option>
                        <option value="Kimia">Kimia</option>
                        <option value="Matematika">Matematika</option>
                    </select>
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Tanggal &amp; Tempat Pelaksanaan</label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="date" id="inputTglAgenda" required class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                    <input type="text" id="inputLokasiAgenda" placeholder="Contoh: Aula Gedung C FMIPA / Zoom Cloud" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" class="partisipasi-modal-close px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer">
                    Batal
                </button>
                <button type="submit" class="px-5 py-2 rounded-xl bg-gradient-to-r from-[#722F99] to-[#592279] text-white text-sm font-bold shadow-md shadow-purple-900/20 hover:opacity-95 cursor-pointer">
                    Simpan Agenda
                </button>
            </div>
        </form>
    </div>
</div>

<!-- 2. Modal Detail Partisipasi Kegiatan -->
<div id="modalDetailPartisipasi" class="partisipasi-modal">
    <div class="partisipasi-modal-dialog">
        <div class="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#722F99] via-[#592279] to-[#3a1251] text-white rounded-t-[1.25rem]">
            <div class="flex items-center gap-2.5">
                <i class="fa-solid fa-users-viewfinder text-amber-300 text-lg"></i>
                <div>
                    <h3 class="font-bold text-base sm:text-lg">Rincian Partisipasi Kegiatan</h3>
                    <span class="text-xs text-purple-200 font-mono" id="detailPartisipasiId">-</span>
                </div>
            </div>
            <button type="button" class="partisipasi-modal-close text-white/70 hover:text-white transition w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
        <div class="p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
            <div>
                <span class="text-slate-400 block text-xs mb-0.5">Nama Kegiatan:</span>
                <p class="font-bold text-slate-900 text-base leading-snug" id="detailPartisipasiNama">-</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-3 border-b border-slate-100">
                <div>
                    <span class="text-slate-400 block text-xs">Kategori:</span>
                    <span class="font-bold text-purple-900" id="detailPartisipasiKategori">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Penyelenggara:</span>
                    <span class="font-bold text-slate-800" id="detailPartisipasiPenyelenggara">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Realisasi Hadir:</span>
                    <span class="font-bold text-emerald-700" id="detailPartisipasiHadir">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Tingkat Capaian:</span>
                    <span class="font-bold text-indigo-700" id="detailPartisipasiCapaian">-</span>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <span class="text-slate-400 block text-xs mb-0.5">Waktu Pelaksanaan:</span>
                    <p class="font-semibold text-slate-800" id="detailPartisipasiTanggal">-</p>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs mb-0.5">Prodi Dominan:</span>
                    <p class="font-semibold text-purple-900" id="detailPartisipasiProdi">-</p>
                </div>
            </div>

            <div class="p-4 rounded-xl bg-purple-50/60 border border-purple-100 space-y-1.5">
                <span class="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                    <i class="fa-solid fa-award text-amber-500"></i> Rekapitulasi Portofolio SKPI &amp; Dampak
                </span>
                <p class="text-xs text-slate-700 leading-relaxed" id="detailPartisipasiDampak">
                    Peserta kegiatan ini berhak memperoleh 4 Poin SKPI Bidang Penalaran dan Kepemimpinan. Telah terverifikasi 100% kehadiran melalui presensi digital berbasis QR-Code SIMMAWA.
                </p>
            </div>

            <div class="pt-2 flex items-center justify-end">
                <button type="button" class="partisipasi-modal-close px-5 py-2 rounded-xl bg-[#722F99] text-white text-sm font-bold shadow-md hover:bg-[#592279] cursor-pointer">
                    Tutup
                </button>
            </div>
        </div>
    </div>
</div>
@endsection
