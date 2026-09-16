@extends('layouts.app')

@section('title', 'Kurikulum & Mata Kuliah')

@section('content')
<div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
    <!-- Executive Hero Banner (Kurikulum Edition - Standar Dosen & Dashboard) -->
    <div id="executiveHeroBannerKurikulum" class="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#722F99] via-[#592279] to-[#3a1251] text-white p-6 sm:p-8 shadow-xl shadow-purple-950/20 border border-purple-800/40 mb-8 z-30">
        <!-- Ambient Decorative Glow Circles -->
        <div class="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none">
            <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div class="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-[#9333ea]/20 blur-3xl"></div>
        </div>

        <!-- Top Row: Executive Title & Academic Period Badge -->
        <div class="relative z-10 flex items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                    <i class="fa-solid fa-book-open text-2xl sm:text-3xl text-amber-300"></i>
                </div>
                <div>
                    <div class="flex items-center gap-2.5">
                        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Kurikulum &amp; Mata Kuliah</h1>
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-xs">Akademik</span>
                    </div>
                    <p class="text-purple-200 text-xs sm:text-sm mt-1 font-medium">FMIPA Universitas Pakuan &bull; Struktur Kurikulum, Distribusi Beban SKS &amp; Manajemen Mata Kuliah</p>
                </div>
            </div>

            <div class="flex items-center gap-2 shrink-0">
                <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold border border-white/25 shadow-xs">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    T.A. 2025/2026 Ganjil
                </span>
            </div>
        </div>

        <!-- Bottom Row: Integrated Multi-Dimension Dropdown Filter Bar -->
        <div class="relative z-10 pt-5">
            <div class="inline-flex flex-wrap items-center gap-2.5 p-2 sm:p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-full shadow-inner shadow-white/5">
                <span class="kurl-filter-label px-1">
                    <i class="fa-solid fa-filter text-amber-300 text-xs"></i> Filter:
                </span>
                
                <!-- 1. Prodi Filter (Custom Purple Dropdown) -->
                <div class="kurl-dropdown-wrap" data-filter="prodi" id="wrapFilterKurlProdi">
                    <input type="hidden" id="filterKurlProdi" value="semua">
                    <button type="button" class="kurl-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-layer-group text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Prodi:</span>
                        <span class="kurl-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="kurl-dropdown-menu">
                        <div class="kurl-dropdown-item active" data-value="semua">Semua Program Studi</div>
                        <div class="kurl-dropdown-item" data-value="biologi">Biologi</div>
                        <div class="kurl-dropdown-item" data-value="kimia">Kimia</div>
                        <div class="kurl-dropdown-item" data-value="matematika">Matematika</div>
                        <div class="kurl-dropdown-item" data-value="ilmu-komputer">Ilmu Komputer</div>
                        <div class="kurl-dropdown-item" data-value="farmasi">Farmasi</div>
                        <div class="kurl-dropdown-item" data-value="profesi-apoteker">Profesi Apoteker</div>
                    </div>
                </div>

                <!-- 2. Periode Filter (Custom Purple Dropdown) -->
                <div class="kurl-dropdown-wrap" data-filter="periode" id="wrapFilterKurlPeriode">
                    <input type="hidden" id="filterKurlPeriode" value="semua">
                    <button type="button" class="kurl-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-calendar-days text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Periode:</span>
                        <span class="kurl-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="kurl-dropdown-menu">
                        <div class="kurl-dropdown-item active" data-value="semua">Semua Periode</div>
                        <div class="kurl-dropdown-item" data-value="2025/2026 Ganjil">2025/2026 Ganjil (Terkini)</div>
                        <div class="kurl-dropdown-item" data-value="2024/2025 Genap">2024/2025 Genap</div>
                        <div class="kurl-dropdown-item" data-value="2024/2025 Ganjil">2024/2025 Ganjil</div>
                        <div class="kurl-dropdown-item" data-value="2023/2024 Genap">2023/2024 Genap</div>
                    </div>
                </div>

                <!-- 3. Status Filter (Custom Purple Dropdown) -->
                <div class="kurl-dropdown-wrap" data-filter="status" id="wrapFilterKurlStatus">
                    <input type="hidden" id="filterKurlStatus" value="semua">
                    <button type="button" class="kurl-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-circle-check text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Status:</span>
                        <span class="kurl-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="kurl-dropdown-menu">
                        <div class="kurl-dropdown-item active" data-value="semua">Semua Status</div>
                        <div class="kurl-dropdown-item" data-value="aktif">&#10003; Aktif</div>
                        <div class="kurl-dropdown-item" data-value="non-aktif">&#x2715; Non-Aktif</div>
                    </div>
                </div>

                <!-- Reset Filter Button -->
                <button id="btnResetKurlFilters" type="button" class="kurl-filter-reset hidden" title="Reset Semua Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    <!-- Sticky Compact Floating Header (Two-Tier Standar Dosen & Wadek 1) -->
    <div id="compactStickyBarKurikulum">
        <div class="w-full rounded-2xl bg-gradient-to-r from-[#722F99]/96 via-[#592279]/96 to-[#3a1251]/96 backdrop-blur-xl text-white py-2.5 sm:py-3 px-4 sm:px-6 shadow-2xl shadow-purple-950/40 border border-white/25 flex flex-col gap-2.5">
            <!-- Top Row: Mini Brand & Academic Badge -->
            <div class="flex items-center justify-between gap-3 pb-2 border-b border-white/15">
                <!-- Left: Mini Brand & Badge -->
                <div class="flex items-center gap-2.5 sm:gap-3 shrink-0">
                    <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                        <i class="fa-solid fa-book-open text-xs sm:text-sm text-amber-300"></i>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="font-extrabold text-white text-xs sm:text-sm md:text-base tracking-tight">Kurikulum FMIPA</span>
                        <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30">Akademik</span>
                    </div>
                </div>

                <!-- Right: Academic Period Badge -->
                <div class="flex items-center gap-2 shrink-0">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-semibold border border-white/25 shadow-xs">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        T.A. 2025/2026 Ganjil
                    </span>
                </div>
            </div>

            <!-- Bottom Row: Synchronized Dropdown Filter Bar -->
            <div class="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-0.5">
                <span class="kurl-filter-label px-1 text-xs text-purple-200 font-semibold flex items-center gap-1.5 shrink-0">
                    <i class="fa-solid fa-filter text-amber-300 text-[11px]"></i> Filter:
                </span>

                <!-- Compact Prodi Filter -->
                <div class="kurl-dropdown-wrap" data-filter="prodi" id="wrapCompactFilterKurlProdi">
                    <input type="hidden" id="compactFilterKurlProdi" value="semua">
                    <button type="button" class="kurl-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-layer-group text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Prodi:</span>
                        <span class="kurl-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="kurl-dropdown-menu">
                        <div class="kurl-dropdown-item active" data-value="semua">Semua Program Studi</div>
                        <div class="kurl-dropdown-item" data-value="biologi">Biologi</div>
                        <div class="kurl-dropdown-item" data-value="kimia">Kimia</div>
                        <div class="kurl-dropdown-item" data-value="matematika">Matematika</div>
                        <div class="kurl-dropdown-item" data-value="ilmu-komputer">Ilmu Komputer</div>
                        <div class="kurl-dropdown-item" data-value="farmasi">Farmasi</div>
                        <div class="kurl-dropdown-item" data-value="profesi-apoteker">Profesi Apoteker</div>
                    </div>
                </div>

                <!-- Compact Periode Filter -->
                <div class="kurl-dropdown-wrap" data-filter="periode" id="wrapCompactFilterKurlPeriode">
                    <input type="hidden" id="compactFilterKurlPeriode" value="semua">
                    <button type="button" class="kurl-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-calendar-days text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Periode:</span>
                        <span class="kurl-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="kurl-dropdown-menu">
                        <div class="kurl-dropdown-item active" data-value="semua">Semua Periode</div>
                        <div class="kurl-dropdown-item" data-value="2025/2026 Ganjil">2025/2026 Ganjil (Terkini)</div>
                        <div class="kurl-dropdown-item" data-value="2024/2025 Genap">2024/2025 Genap</div>
                        <div class="kurl-dropdown-item" data-value="2024/2025 Ganjil">2024/2025 Ganjil</div>
                        <div class="kurl-dropdown-item" data-value="2023/2024 Genap">2023/2024 Genap</div>
                    </div>
                </div>

                <!-- Compact Status Filter -->
                <div class="kurl-dropdown-wrap" data-filter="status" id="wrapCompactFilterKurlStatus">
                    <input type="hidden" id="compactFilterKurlStatus" value="semua">
                    <button type="button" class="kurl-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-circle-check text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Status:</span>
                        <span class="kurl-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="kurl-dropdown-menu">
                        <div class="kurl-dropdown-item active" data-value="semua">Semua Status</div>
                        <div class="kurl-dropdown-item" data-value="aktif">&#10003; Aktif</div>
                        <div class="kurl-dropdown-item" data-value="non-aktif">&#x2715; Non-Aktif</div>
                    </div>
                </div>

                <!-- Reset Filter Button (Compact) -->
                <button id="btnResetCompactKurlFilters" type="button" class="kurl-filter-reset hidden" title="Reset Semua Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    <!-- Kurikulum Domain Sections Container (Struktur Modular Mengikuti Dosen) -->
    <div id="kurikulumSections" class="space-y-8">
        <!-- 1. Statistik Kurikulum (Overview, Beban SKS, MK Wajib vs Pilihan, Distribusi Prodi) -->
        @include('pages.kurikulum.partials.statistik')

        <!-- 2. Daftar Kurikulum FMIPA (Tabel Lengkap, 4 Action Buttons, Export, Live Search & Prodi Tabs) -->
        @include('pages.kurikulum.partials.daftar-kurikulum')
    </div>
</div>

<!-- ============================================
     MODALS
     ============================================ -->

<!-- 1. Modal Tambah Mata Kuliah -->
<div id="modalTambahMk" class="kurl-modal">
    <div class="kurl-modal-dialog">
        <div class="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#722F99] via-[#592279] to-[#3a1251] text-white rounded-t-[1.25rem]">
            <div class="flex items-center gap-2.5">
                <i class="fa-solid fa-circle-plus text-amber-300 text-lg"></i>
                <h3 class="font-bold text-base sm:text-lg">Tambah Mata Kuliah Baru</h3>
            </div>
            <button type="button" class="kurl-modal-close text-white/70 hover:text-white transition w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
        <form id="formTambahMk" class="p-5 sm:p-6 space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Kode Mata Kuliah</label>
                    <input type="text" id="inputKodeMk" required placeholder="Contoh: KOM201" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 uppercase focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Program Studi</label>
                    <select id="selectProdiMk" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        <option value="Ilmu Komputer">Ilmu Komputer</option>
                        <option value="Biologi">Biologi</option>
                        <option value="Kimia">Kimia</option>
                        <option value="Matematika">Matematika</option>
                        <option value="Farmasi">Farmasi</option>
                        <option value="Profesi Apoteker">Profesi Apoteker</option>
                    </select>
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Nama Mata Kuliah</label>
                <input type="text" id="inputNamaMk" required placeholder="Contoh: Pemrograman Web Lanjut" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Jumlah SKS</label>
                    <select id="inputSksMk" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        <option value="2">2 SKS</option>
                        <option value="3" selected>3 SKS</option>
                        <option value="4">4 SKS</option>
                        <option value="6">6 SKS</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Semester</label>
                    <select id="inputSemesterMk" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        @for($i=1; $i<=8; $i++)
                            <option value="{{ $i }}">Semester {{ $i }}</option>
                        @endfor
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Jenis MK</label>
                    <select id="selectTipeMk" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        <option value="Wajib">Wajib</option>
                        <option value="Pilihan">Pilihan</option>
                    </select>
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Dosen Koordinator MK</label>
                <input type="text" id="inputKoordinatorMk" placeholder="Nama Koordinator Mata Kuliah &amp; Gelar" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" class="kurl-modal-close px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer">
                    Batal
                </button>
                <button type="submit" class="px-5 py-2 rounded-xl bg-gradient-to-r from-[#722F99] to-[#592279] text-white text-sm font-bold shadow-md shadow-purple-900/20 hover:opacity-95 cursor-pointer">
                    Simpan Mata Kuliah
                </button>
            </div>
        </form>
    </div>
</div>

<!-- 2. Modal Import Excel -->
<div id="modalImportExcel" class="kurl-modal">
    <div class="kurl-modal-dialog">
        <div class="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#00897b] to-[#00695c] text-white rounded-t-[1.25rem]">
            <div class="flex items-center gap-2.5">
                <i class="fa-solid fa-file-excel text-amber-300 text-lg"></i>
                <h3 class="font-bold text-base sm:text-lg">Import Data Kurikulum Excel</h3>
            </div>
            <button type="button" class="kurl-modal-close text-white/70 hover:text-white transition w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
        <div class="p-5 sm:p-6 space-y-4">
            <p class="text-xs sm:text-sm text-slate-600">Unggah berkas spreadsheet Excel (<strong>.xlsx</strong> / <strong>.xls</strong> / <strong>.csv</strong>) sesuai template standar kurikulum FMIPA UNPAK.</p>
            
            <div class="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center bg-slate-50/60 hover:bg-slate-50 transition cursor-pointer">
                <i class="fa-solid fa-cloud-arrow-up text-3xl text-[#00897b] mb-2"></i>
                <p class="text-sm font-bold text-slate-700">Tarik dan letakkan berkas Excel ke sini</p>
                <p class="text-xs text-slate-400 mt-1">atau klik untuk memilih file dari komputer</p>
                <input type="file" class="hidden" accept=".xlsx,.xls,.csv">
            </div>

            <div class="p-3.5 bg-blue-50/70 border border-blue-200/60 rounded-xl text-xs text-blue-800 flex items-start gap-2.5">
                <i class="fa-solid fa-circle-info text-blue-500 mt-0.5"></i>
                <span>Pastikan format kolom sesuai dengan <strong>Download Template</strong> agar tidak terjadi kegagalan pemetaan data.</span>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" class="kurl-modal-close px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer">
                    Batal
                </button>
                <button type="button" onclick="alert('File kurikulum berhasil diunggah &amp; divalidasi!'); document.querySelectorAll('.kurl-modal.open').forEach(m => m.classList.remove('open'));" class="px-5 py-2 rounded-xl bg-[#00897b] text-white text-sm font-bold shadow-md hover:bg-[#00796b] cursor-pointer">
                    Proses Import
                </button>
            </div>
        </div>
    </div>
</div>

<!-- 3. Modal Salin ke Periode Baru -->
<div id="modalSalinPeriode" class="kurl-modal">
    <div class="kurl-modal-dialog">
        <div class="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#e65100] to-[#bf360c] text-white rounded-t-[1.25rem]">
            <div class="flex items-center gap-2.5">
                <i class="fa-solid fa-copy text-amber-300 text-lg"></i>
                <h3 class="font-bold text-base sm:text-lg">Salin Kurikulum ke Periode Baru</h3>
            </div>
            <button type="button" class="kurl-modal-close text-white/70 hover:text-white transition w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
        <div class="p-5 sm:p-6 space-y-4">
            <p class="text-xs sm:text-sm text-slate-600">Fitur ini memungkinkan Anda menduplikasi seluruh struktur mata kuliah dari tahun ajaran sebelumnya ke tahun ajaran baru secara otomatis.</p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Periode Sumber</label>
                    <select class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800">
                        <option value="2024/2025 Genap">2024/2025 Genap</option>
                        <option value="2025/2026 Ganjil" selected>2025/2026 Ganjil (Aktif)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Periode Target</label>
                    <select class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800">
                        <option value="2025/2026 Genap">2025/2026 Genap (Mendatang)</option>
                        <option value="2026/2027 Ganjil">2026/2027 Ganjil</option>
                    </select>
                </div>
            </div>

            <div class="p-3.5 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs text-amber-800 flex items-start gap-2.5">
                <i class="fa-solid fa-triangle-exclamation text-amber-500 mt-0.5"></i>
                <span>Mata kuliah yang disalin akan memiliki status awal <strong>Aktif</strong> dan dapat disesuaikan kembali sewaktu-waktu.</span>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" class="kurl-modal-close px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer">
                    Batal
                </button>
                <button type="button" onclick="alert('Kurikulum berhasil diduplikasi ke periode baru!'); document.querySelectorAll('.kurl-modal.open').forEach(m => m.classList.remove('open'));" class="px-5 py-2 rounded-xl bg-[#e65100] text-white text-sm font-bold shadow-md hover:bg-[#d84315] cursor-pointer">
                    Duplikasi Kurikulum
                </button>
            </div>
        </div>
    </div>
</div>

<!-- 4. Modal Detail Mata Kuliah & RPS -->
<div id="modalDetailMk" class="kurl-modal">
    <div class="kurl-modal-dialog">
        <div class="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#722F99] via-[#592279] to-[#3a1251] text-white rounded-t-[1.25rem]">
            <div class="flex items-center gap-2.5">
                <i class="fa-solid fa-circle-info text-amber-300 text-lg"></i>
                <div>
                    <h3 class="font-bold text-base sm:text-lg" id="detailMkNama">Rincian Mata Kuliah</h3>
                    <span class="text-xs text-purple-200 font-mono" id="detailMkKode">KOM101</span>
                </div>
            </div>
            <button type="button" class="kurl-modal-close text-white/70 hover:text-white transition w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
        <div class="p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
            <div class="grid grid-cols-2 gap-4 pb-3 border-b border-slate-100">
                <div>
                    <span class="text-slate-400 block text-xs">Program Studi:</span>
                    <span class="font-bold text-purple-900" id="detailMkProdi">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Beban Kredit:</span>
                    <span class="font-bold text-amber-700" id="detailMkSks">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Semester:</span>
                    <span class="font-bold text-slate-800" id="detailMkSemester">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Status:</span>
                    <span class="font-bold text-emerald-700" id="detailMkStatus">-</span>
                </div>
            </div>

            <div>
                <span class="text-slate-400 block text-xs mb-0.5">Dosen Koordinator:</span>
                <p class="font-semibold text-slate-800" id="detailMkKoordinator">-</p>
            </div>

            <div>
                <span class="text-slate-400 block text-xs mb-0.5">Tim Dosen Pengajar:</span>
                <p class="text-slate-600" id="detailMkDosen">-</p>
            </div>

            <div class="p-4 rounded-xl bg-purple-50/50 border border-purple-100 space-y-2">
                <h4 class="font-bold text-purple-950 flex items-center gap-1.5">
                    <i class="fa-solid fa-file-lines text-amber-500"></i> Rencana Pembelajaran Semester (RPS)
                </h4>
                <p class="text-xs text-slate-600 leading-relaxed">
                    Mata kuliah ini membekali mahasiswa dengan penguasaan konsep teoritis dan keterampilan praktis berbasis kurikulum Outcome-Based Education (OBE) FMIPA Universitas Pakuan. Dilengkapi silabus terintegrasi, praktikum laboratorium, dan evaluasi berbasis proyek/studi kasus.
                </p>
            </div>

            <div class="pt-2 flex items-center justify-end">
                <button type="button" class="kurl-modal-close px-5 py-2 rounded-xl bg-[#722F99] text-white text-sm font-bold shadow-md hover:bg-[#592279] cursor-pointer">
                    Tutup
                </button>
            </div>
        </div>
    </div>
</div>
@endsection
