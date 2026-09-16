@extends('layouts.app')

@section('title', 'Wakil Dekan 2 - Bidang Keuangan & SDM')

@section('content')
<div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
    <!-- Executive Hero Banner (Wadek 2 Edition) -->
    <div id="executiveHeroBannerWd2" class="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#722F99] via-[#592279] to-[#3a1251] text-white p-6 sm:p-8 shadow-xl shadow-purple-950/20 border border-purple-800/40 mb-8 z-30">
        <!-- Ambient Decorative Glow Circles -->
        <div class="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none">
            <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div class="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-[#9333ea]/20 blur-3xl"></div>
        </div>

        <!-- Top Row: Executive Title & Financial Period Badge -->
        <div class="relative z-10 flex items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                    <i class="fa-solid fa-wallet text-2xl sm:text-3xl text-amber-300"></i>
                </div>
                <div>
                    <div class="flex items-center gap-2.5">
                        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Wakil Dekan Bidang Keuangan &amp; SDM</h1>
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-xs">Wadek II</span>
                    </div>
                    <p class="text-purple-200 text-xs sm:text-sm mt-1 font-medium">FMIPA Universitas Pakuan &bull; Budget Monitoring, Cash Flow &amp; Human Resource Demographics</p>
                </div>
            </div>

            <div class="flex items-center gap-2 shrink-0">
                <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold border border-white/25 shadow-xs">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Tahun Anggaran 2026
                </span>
            </div>
        </div>

        <!-- Bottom Row: Integrated Multi-Dimension Dropdown Filter Bar -->
        <div class="relative z-10 pt-5">
            <div class="inline-flex flex-wrap items-center gap-2.5 p-2.5 sm:p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-full shadow-inner shadow-white/5">
                <span class="wd2-filter-label px-1">
                    <i class="fa-solid fa-filter text-amber-300 text-xs"></i> Filter:
                </span>
                
                <!-- 1. Prodi Filter (Custom Purple Dropdown) -->
                <div class="wd2-dropdown-wrap" data-filter="prodi" id="wrapFilterWd2Prodi">
                    <input type="hidden" id="filterWd2Prodi" value="semua">
                    <button type="button" class="wd2-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-layer-group text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Prodi:</span>
                        <span class="wd2-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="wd2-dropdown-menu">
                        <div class="wd2-dropdown-item active" data-value="semua">Semua</div>
                        <div class="wd2-dropdown-item" data-value="biologi">Biologi</div>
                        <div class="wd2-dropdown-item" data-value="kimia">Kimia</div>
                        <div class="wd2-dropdown-item" data-value="matematika">Matematika</div>
                        <div class="wd2-dropdown-item" data-value="ilmu-komputer">Ilmu Komputer</div>
                        <div class="wd2-dropdown-item" data-value="farmasi">Farmasi</div>
                        <div class="wd2-dropdown-item" data-value="ppa">Profesi Apoteker</div>
                    </div>
                </div>

                <!-- 2. Tahun Filter (Custom Purple Dropdown) -->
                <div class="wd2-dropdown-wrap" data-filter="tahun" id="wrapFilterWd2Tahun">
                    <input type="hidden" id="filterWd2Tahun" value="2026">
                    <button type="button" class="wd2-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-calendar-days text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Tahun:</span>
                        <span class="wd2-btn-label font-bold text-white">2026</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="wd2-dropdown-menu">
                        <div class="wd2-dropdown-item active" data-value="2026">2026</div>
                        <div class="wd2-dropdown-item" data-value="2025">2025</div>
                        <div class="wd2-dropdown-item" data-value="2024">2024</div>
                        <div class="wd2-dropdown-item" data-value="2023">2023</div>
                        <div class="wd2-dropdown-item" data-value="2022">2022</div>
                    </div>
                </div>

                <!-- 3. Kategori Anggaran Filter -->
                <div class="wd2-dropdown-wrap" data-filter="kategori" id="wrapFilterWd2Kategori">
                    <input type="hidden" id="filterWd2Kategori" value="all">
                    <button type="button" class="wd2-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-chart-pie text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Kategori:</span>
                        <span class="wd2-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="wd2-dropdown-menu">
                        <div class="wd2-dropdown-item active" data-value="all">Semua</div>
                        <div class="wd2-dropdown-item" data-value="Operasional">Operasional</div>
                        <div class="wd2-dropdown-item" data-value="Penelitian">Penelitian</div>
                        <div class="wd2-dropdown-item" data-value="Pengabdian">Pengabdian</div>
                        <div class="wd2-dropdown-item" data-value="SDM">SDM</div>
                        <div class="wd2-dropdown-item" data-value="Infrastruktur">Infrastruktur</div>
                    </div>
                </div>

                <!-- 4. Status Dosen Filter -->
                <div class="wd2-dropdown-wrap" data-filter="status" id="wrapFilterWd2StatusDosen">
                    <input type="hidden" id="filterWd2StatusDosen" value="all">
                    <button type="button" class="wd2-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-id-badge text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Status:</span>
                        <span class="wd2-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="wd2-dropdown-menu">
                        <div class="wd2-dropdown-item active" data-value="all">Semua</div>
                        <div class="wd2-dropdown-item" data-value="Tetap">&#10003; Tetap</div>
                        <div class="wd2-dropdown-item" data-value="Kontrak">&#128188; Kontrak</div>
                        <div class="wd2-dropdown-item" data-value="Tugas Belajar">&#127891; Tugas Belajar</div>
                        <div class="wd2-dropdown-item" data-value="Cuti">&#x23F8; Cuti</div>
                    </div>
                </div>

                <!-- Reset Filter Button -->
                <button id="btnResetWd2Filters" type="button" class="wd2-filter-reset hidden" title="Reset Semua Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    <!-- Sticky Compact Floating Header (Appears smoothly when scrolling down) -->
    <div id="compactStickyBarWd2">
        <div class="w-full rounded-2xl bg-gradient-to-r from-[#722F99]/96 via-[#592279]/96 to-[#3a1251]/96 backdrop-blur-xl text-white py-2.5 sm:py-3 px-4 sm:px-6 shadow-2xl shadow-purple-950/40 border border-white/25 flex flex-col gap-2.5">
            <!-- Top Row: Mini Brand & Semester Badge -->
            <div class="flex items-center justify-between gap-3 pb-2 border-b border-white/15">
                <!-- Left: Mini Brand & Badge -->
                <div class="flex items-center gap-2.5 sm:gap-3 shrink-0">
                    <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                        <i class="fa-solid fa-wallet text-xs sm:text-sm text-amber-300"></i>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="font-extrabold text-white text-xs sm:text-sm md:text-base tracking-tight">Wadek 2 Keuangan &amp; SDM</span>
                        <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30">Overview</span>
                    </div>
                </div>

                <!-- Right: Mini Year Badge -->
                <div class="flex items-center gap-2 shrink-0">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-semibold border border-white/25 shadow-xs">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        T.A. 2026
                    </span>
                </div>
            </div>

            <!-- Bottom Row ("ada di bawahnya"): Synchronized Custom Dropdowns -->
            <div class="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-0.5">
                <span class="wd2-filter-label px-1 text-xs text-purple-200 font-semibold flex items-center gap-1.5 shrink-0">
                    <i class="fa-solid fa-filter text-amber-300 text-[11px]"></i> Filter:
                </span>

                <div class="wd2-dropdown-wrap" data-filter="prodi" id="wrapCompactFilterWd2Prodi">
                    <input type="hidden" id="compactFilterWd2Prodi" value="semua">
                    <button type="button" class="wd2-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-layer-group text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Prodi:</span>
                        <span class="wd2-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="wd2-dropdown-menu">
                        <div class="wd2-dropdown-item active" data-value="semua">Semua</div>
                        <div class="wd2-dropdown-item" data-value="biologi">Biologi</div>
                        <div class="wd2-dropdown-item" data-value="kimia">Kimia</div>
                        <div class="wd2-dropdown-item" data-value="matematika">Matematika</div>
                        <div class="wd2-dropdown-item" data-value="ilmu-komputer">Ilmu Komputer</div>
                        <div class="wd2-dropdown-item" data-value="farmasi">Farmasi</div>
                        <div class="wd2-dropdown-item" data-value="ppa">Profesi Apoteker</div>
                    </div>
                </div>

                <div class="wd2-dropdown-wrap" data-filter="tahun" id="wrapCompactFilterWd2Tahun">
                    <input type="hidden" id="compactFilterWd2Tahun" value="2026">
                    <button type="button" class="wd2-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-calendar-days text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Tahun:</span>
                        <span class="wd2-btn-label font-bold text-white">2026</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="wd2-dropdown-menu">
                        <div class="wd2-dropdown-item active" data-value="2026">2026</div>
                        <div class="wd2-dropdown-item" data-value="2025">2025</div>
                        <div class="wd2-dropdown-item" data-value="2024">2024</div>
                        <div class="wd2-dropdown-item" data-value="2023">2023</div>
                        <div class="wd2-dropdown-item" data-value="2022">2022</div>
                    </div>
                </div>

                <div class="wd2-dropdown-wrap" data-filter="kategori" id="wrapCompactFilterWd2Kategori">
                    <input type="hidden" id="compactFilterWd2Kategori" value="all">
                    <button type="button" class="wd2-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-chart-pie text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Kategori:</span>
                        <span class="wd2-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="wd2-dropdown-menu">
                        <div class="wd2-dropdown-item active" data-value="all">Semua</div>
                        <div class="wd2-dropdown-item" data-value="Operasional">Operasional</div>
                        <div class="wd2-dropdown-item" data-value="Penelitian">Penelitian</div>
                        <div class="wd2-dropdown-item" data-value="Pengabdian">Pengabdian</div>
                        <div class="wd2-dropdown-item" data-value="SDM">SDM</div>
                        <div class="wd2-dropdown-item" data-value="Infrastruktur">Infrastruktur</div>
                    </div>
                </div>

                <!-- Reset Filter Button (Compact) -->
                <button id="btnResetCompactWd2Filters" type="button" class="wd2-filter-reset hidden" title="Reset Semua Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    <!-- Wadek 2 Domain Sections -->
    <div id="wadek2Sections" class="space-y-8">
        <!-- 1. Overview Anggaran -->
        @include('pages.wadek2.partials.overview-anggaran')

        <!-- 2. Komposisi Sumber Daya Manusia -->
        @include('pages.wadek2.partials.komposisi-sdm')

        <!-- 3. Piramida Usia Dosen -->
        @include('pages.wadek2.partials.piramida-usia-dosen')

        <!-- 4. Riwayat Pemasukan & Pengeluaran Kas -->
        @include('pages.wadek2.partials.riwayat-keuangan')
    </div>
</div>
@endsection
