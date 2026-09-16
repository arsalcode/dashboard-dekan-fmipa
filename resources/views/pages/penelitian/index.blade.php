@extends('layouts.app')

@section('title', 'Data Operasional Penelitian')

@section('content')
<div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
    <!-- Executive Hero Banner (Penelitian Edition - Standar Dosen & Dashboard) -->
    <div id="executiveHeroBannerPenelitian" class="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#722F99] via-[#592279] to-[#3a1251] text-white p-6 sm:p-8 shadow-xl shadow-purple-950/20 border border-purple-800/40 mb-8 z-30">
        <!-- Ambient Decorative Glow Circles -->
        <div class="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none">
            <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div class="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-[#9333ea]/20 blur-3xl"></div>
        </div>

        <!-- Top Row: Executive Title & Academic Period Badge -->
        <div class="relative z-10 flex items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                    <i class="fa-solid fa-flask text-2xl sm:text-3xl text-amber-300"></i>
                </div>
                <div>
                    <div class="flex items-center gap-2.5">
                        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Data Riset &amp; Penelitian</h1>
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-xs">Riset &amp; Inovasi</span>
                    </div>
                    <p class="text-purple-200 text-xs sm:text-sm mt-1 font-medium">FMIPA Universitas Pakuan &bull; Rekapitulasi Hibah Penelitian, Publikasi Ilmiah &amp; Hilirisasi Inovasi</p>
                </div>
            </div>

            <div class="flex items-center gap-2 shrink-0">
                <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold border border-white/25 shadow-xs">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Tahun Anggaran 2025/2026
                </span>
            </div>
        </div>

        <!-- Bottom Row: Integrated Multi-Dimension Dropdown Filter Bar -->
        <div class="relative z-10 pt-5">
            <div class="inline-flex flex-wrap items-center gap-2.5 p-2 sm:p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-full shadow-inner shadow-white/5">
                <span class="lit-filter-label px-1">
                    <i class="fa-solid fa-filter text-amber-300 text-xs"></i> Filter:
                </span>
                
                <!-- 1. Prodi Filter (Custom Purple Dropdown) -->
                <div class="lit-dropdown-wrap" data-filter="prodi" id="wrapFilterLitProdi">
                    <input type="hidden" id="filterLitProdi" value="semua">
                    <button type="button" class="lit-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-layer-group text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Prodi:</span>
                        <span class="lit-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="lit-dropdown-menu">
                        <div class="lit-dropdown-item active" data-value="semua">Semua Program Studi</div>
                        <div class="lit-dropdown-item" data-value="biologi">Biologi</div>
                        <div class="lit-dropdown-item" data-value="kimia">Kimia</div>
                        <div class="lit-dropdown-item" data-value="matematika">Matematika</div>
                        <div class="lit-dropdown-item" data-value="ilmu-komputer">Ilmu Komputer</div>
                        <div class="lit-dropdown-item" data-value="farmasi">Farmasi</div>
                        <div class="lit-dropdown-item" data-value="profesi-apoteker">Profesi Apoteker</div>
                    </div>
                </div>

                <!-- 2. Tahun Pelaksanaan Filter (Custom Purple Dropdown) -->
                <div class="lit-dropdown-wrap" data-filter="tahun" id="wrapFilterLitTahun">
                    <input type="hidden" id="filterLitTahun" value="semua">
                    <button type="button" class="lit-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-calendar-days text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Tahun:</span>
                        <span class="lit-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="lit-dropdown-menu">
                        <div class="lit-dropdown-item active" data-value="semua">Semua Tahun</div>
                        <div class="lit-dropdown-item" data-value="2026">2026 (Terkini)</div>
                        <div class="lit-dropdown-item" data-value="2025">2025</div>
                        <div class="lit-dropdown-item" data-value="2024">2024</div>
                        <div class="lit-dropdown-item" data-value="2023">2023</div>
                    </div>
                </div>

                <!-- 3. Status Riset Filter (Custom Purple Dropdown) -->
                <div class="lit-dropdown-wrap" data-filter="status" id="wrapFilterLitStatus">
                    <input type="hidden" id="filterLitStatus" value="semua">
                    <button type="button" class="lit-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-circle-check text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Status:</span>
                        <span class="lit-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="lit-dropdown-menu">
                        <div class="lit-dropdown-item active" data-value="semua">Semua Status</div>
                        <div class="lit-dropdown-item" data-value="selesai">&#10003; Selesai</div>
                        <div class="lit-dropdown-item" data-value="berjalan">&#x23F8; Berjalan</div>
                        <div class="lit-dropdown-item" data-value="review">&#128065; Tahap Review</div>
                    </div>
                </div>

                <!-- Reset Filter Button -->
                <button id="btnResetLitFilters" type="button" class="lit-filter-reset hidden" title="Reset Semua Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    <!-- Sticky Compact Floating Header (Two-Tier Standar Dosen & Wadek 1) -->
    <div id="compactStickyBarPenelitian">
        <div class="w-full rounded-2xl bg-gradient-to-r from-[#722F99]/96 via-[#592279]/96 to-[#3a1251]/96 backdrop-blur-xl text-white py-2.5 sm:py-3 px-4 sm:px-6 shadow-2xl shadow-purple-950/40 border border-white/25 flex flex-col gap-2.5">
            <!-- Top Row: Mini Brand & Academic Badge -->
            <div class="flex items-center justify-between gap-3 pb-2 border-b border-white/15">
                <div class="flex items-center gap-2.5 sm:gap-3 shrink-0">
                    <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                        <i class="fa-solid fa-flask text-xs sm:text-sm text-amber-300"></i>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="font-extrabold text-white text-xs sm:text-sm md:text-base tracking-tight">Riset &amp; Penelitian FMIPA</span>
                        <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30">Inovasi</span>
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
                <span class="lit-filter-label px-1 text-xs text-purple-200 font-semibold flex items-center gap-1.5 shrink-0">
                    <i class="fa-solid fa-filter text-amber-300 text-[11px]"></i> Filter:
                </span>

                <!-- Compact Prodi Filter -->
                <div class="lit-dropdown-wrap" data-filter="prodi" id="wrapCompactFilterLitProdi">
                    <input type="hidden" id="compactFilterLitProdi" value="semua">
                    <button type="button" class="lit-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-layer-group text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Prodi:</span>
                        <span class="lit-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="lit-dropdown-menu">
                        <div class="lit-dropdown-item active" data-value="semua">Semua Program Studi</div>
                        <div class="lit-dropdown-item" data-value="biologi">Biologi</div>
                        <div class="lit-dropdown-item" data-value="kimia">Kimia</div>
                        <div class="lit-dropdown-item" data-value="matematika">Matematika</div>
                        <div class="lit-dropdown-item" data-value="ilmu-komputer">Ilmu Komputer</div>
                        <div class="lit-dropdown-item" data-value="farmasi">Farmasi</div>
                        <div class="lit-dropdown-item" data-value="profesi-apoteker">Profesi Apoteker</div>
                    </div>
                </div>

                <!-- Compact Tahun Filter -->
                <div class="lit-dropdown-wrap" data-filter="tahun" id="wrapCompactFilterLitTahun">
                    <input type="hidden" id="compactFilterLitTahun" value="semua">
                    <button type="button" class="lit-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-calendar-days text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Tahun:</span>
                        <span class="lit-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="lit-dropdown-menu">
                        <div class="lit-dropdown-item active" data-value="semua">Semua Tahun</div>
                        <div class="lit-dropdown-item" data-value="2026">2026 (Terkini)</div>
                        <div class="lit-dropdown-item" data-value="2025">2025</div>
                        <div class="lit-dropdown-item" data-value="2024">2024</div>
                        <div class="lit-dropdown-item" data-value="2023">2023</div>
                    </div>
                </div>

                <!-- Compact Status Filter -->
                <div class="lit-dropdown-wrap" data-filter="status" id="wrapCompactFilterLitStatus">
                    <input type="hidden" id="compactFilterLitStatus" value="semua">
                    <button type="button" class="lit-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-circle-check text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Status:</span>
                        <span class="lit-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="lit-dropdown-menu">
                        <div class="lit-dropdown-item active" data-value="semua">Semua Status</div>
                        <div class="lit-dropdown-item" data-value="selesai">&#10003; Selesai</div>
                        <div class="lit-dropdown-item" data-value="berjalan">&#x23F8; Berjalan</div>
                        <div class="lit-dropdown-item" data-value="review">&#128065; Tahap Review</div>
                    </div>
                </div>

                <!-- Reset Filter Button (Compact) -->
                <button id="btnResetCompactLitFilters" type="button" class="lit-filter-reset hidden" title="Reset Semua Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    <!-- Penelitian Domain Sections Container (Struktur Modular Mengikuti Dosen) -->
    <div id="penelitianSections" class="space-y-8">
        <!-- 1. Statistik Riset (Overview, Hibah, Scopus & SINTA, Distribusi Prodi) -->
        @include('pages.penelitian.partials.statistik')

        <!-- 2. Daftar Riset FMIPA (Tabel Lengkap, 4 Action Buttons, Export, Live Search & Prodi Tabs) -->
        @include('pages.penelitian.partials.daftar-penelitian')
    </div>
</div>

<!-- ============================================
     MODALS
     ============================================ -->

<!-- 1. Modal Tambah Usulan Riset -->
<div id="modalTambahLit" class="lit-modal">
    <div class="lit-modal-dialog">
        <div class="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#722F99] via-[#592279] to-[#3a1251] text-white rounded-t-[1.25rem]">
            <div class="flex items-center gap-2.5">
                <i class="fa-solid fa-circle-plus text-amber-300 text-lg"></i>
                <h3 class="font-bold text-base sm:text-lg">Tambah Usulan Penelitian Baru</h3>
            </div>
            <button type="button" class="lit-modal-close text-white/70 hover:text-white transition w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
        <form id="formTambahLit" class="p-5 sm:p-6 space-y-4">
            <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Judul Riset / Penelitian</label>
                <textarea id="inputJudulLit" required rows="2" placeholder="Masukkan judul riset lengkap..." class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40"></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Program Studi</label>
                    <select id="selectProdiLit" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        <option value="Ilmu Komputer">Ilmu Komputer</option>
                        <option value="Biologi">Biologi</option>
                        <option value="Kimia">Kimia</option>
                        <option value="Matematika">Matematika</option>
                        <option value="Farmasi">Farmasi</option>
                        <option value="Profesi Apoteker">Profesi Apoteker</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Tahun Anggaran</label>
                    <select id="selectTahunLit" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        <option value="2026" selected>2026</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Nama Ketua Peneliti</label>
                    <input type="text" id="inputKetuaLit" required placeholder="Contoh: Dr. Ir. Diana W., M.Si." class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Anggota Tim Peneliti</label>
                    <input type="text" id="inputAnggotaLit" placeholder="Contoh: Dra. Rita I., M.Pd.; 2 Mahasiswa" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Skema Hibah</label>
                    <select id="selectSkemaLit" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        <option value="Hibah Fundamental BIMA">Hibah Fundamental BIMA</option>
                        <option value="Hibah Pascasarjana BIMA">Hibah Pascasarjana BIMA</option>
                        <option value="Penelitian Dosen Pemula (PDP)">Penelitian Dosen Pemula (PDP)</option>
                        <option value="Hibah Terapan LPPM">Hibah Terapan LPPM</option>
                        <option value="Internal Unggulan UNPAK" selected>Internal Unggulan UNPAK</option>
                        <option value="Kerjasama Industri">Kerjasama Industri</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Dana Disetujui (Rp)</label>
                    <input type="number" id="inputDanaLit" required placeholder="25000000" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Target Luaran</label>
                    <select id="selectLuaranLit" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        <option value="Jurnal Scopus Q1-Q2">Jurnal Scopus Q1-Q2</option>
                        <option value="Jurnal Scopus Q3-Q4">Jurnal Scopus Q3-Q4</option>
                        <option value="Jurnal SINTA 2">Jurnal SINTA 2</option>
                        <option value="Jurnal SINTA 3-4">Jurnal SINTA 3-4</option>
                        <option value="Paten &amp; HKI Terdaftar">Paten &amp; HKI Terdaftar</option>
                    </select>
                </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" class="lit-modal-close px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer">
                    Batal
                </button>
                <button type="submit" class="px-5 py-2 rounded-xl bg-gradient-to-r from-[#722F99] to-[#592279] text-white text-sm font-bold shadow-md shadow-purple-900/20 hover:opacity-95 cursor-pointer">
                    Simpan Usulan Riset
                </button>
            </div>
        </form>
    </div>
</div>

<!-- 2. Modal Detail Riset & Publikasi -->
<div id="modalDetailLit" class="lit-modal">
    <div class="lit-modal-dialog">
        <div class="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#722F99] via-[#592279] to-[#3a1251] text-white rounded-t-[1.25rem]">
            <div class="flex items-center gap-2.5">
                <i class="fa-solid fa-circle-info text-amber-300 text-lg"></i>
                <div>
                    <h3 class="font-bold text-base sm:text-lg">Rincian Riset &amp; Hibah</h3>
                    <span class="text-xs text-purple-200 font-mono" id="detailLitId">ID-RIS-01</span>
                </div>
            </div>
            <button type="button" class="lit-modal-close text-white/70 hover:text-white transition w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
        <div class="p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
            <div>
                <span class="text-slate-400 block text-xs mb-0.5">Judul Penelitian:</span>
                <p class="font-bold text-slate-800 text-base leading-snug" id="detailLitJudul">-</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-3 border-b border-slate-100">
                <div>
                    <span class="text-slate-400 block text-xs">Program Studi:</span>
                    <span class="font-bold text-purple-900" id="detailLitProdi">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Tahun Anggaran:</span>
                    <span class="font-bold text-slate-800" id="detailLitTahun">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Dana Hibah:</span>
                    <span class="font-bold text-emerald-700" id="detailLitDana">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Status Riset:</span>
                    <span class="font-bold text-indigo-700" id="detailLitStatus">-</span>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <span class="text-slate-400 block text-xs mb-0.5">Ketua Peneliti:</span>
                    <p class="font-semibold text-slate-800" id="detailLitKetua">-</p>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs mb-0.5">Skema Hibah:</span>
                    <p class="font-semibold text-amber-800" id="detailLitSkema">-</p>
                </div>
            </div>

            <div>
                <span class="text-slate-400 block text-xs mb-0.5">Anggota Tim Peneliti:</span>
                <p class="text-slate-600" id="detailLitAnggota">-</p>
            </div>

            <div class="p-4 rounded-xl bg-purple-50/60 border border-purple-100 space-y-1.5">
                <span class="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                    <i class="fa-solid fa-award text-amber-500"></i> Target &amp; Realisasi Luaran
                </span>
                <p class="text-xs text-slate-700 font-medium" id="detailLitLuaran">-</p>
                <p class="text-[11px] text-slate-500 leading-relaxed mt-1">
                    Tercatat pada Pangkalan Data Riset LPPM UNPAK dan tersinkronisasi dengan portal SINTA Kemendikbudristek RI.
                </p>
            </div>

            <div class="pt-2 flex items-center justify-end">
                <button type="button" class="lit-modal-close px-5 py-2 rounded-xl bg-[#722F99] text-white text-sm font-bold shadow-md hover:bg-[#592279] cursor-pointer">
                    Tutup
                </button>
            </div>
        </div>
    </div>
</div>
@endsection
