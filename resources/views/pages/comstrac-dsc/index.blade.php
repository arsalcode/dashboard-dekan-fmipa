@extends('layouts.app')

@section('title', 'ComSTraC & DSC - Dashboard Dekan FMIPA UNPAK')

@section('content')
<div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto" id="comstracSections">

    <!-- Executive Hero Banner (ComSTraC & DSC - Standar Dashboard Dekan) -->
    <div id="executiveHeroBannerComstrac" class="comstrac-hero-banner relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#722F99] via-[#592279] to-[#3a1251] text-white p-6 sm:p-8 shadow-xl shadow-purple-950/20 border border-purple-800/40 mb-8 z-30">
        <!-- Ambient Decorative Glow Circles -->
        <div class="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none">
            <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div class="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-[#9333ea]/20 blur-3xl"></div>
        </div>

        <!-- Top Row: Executive Title & Academic Period Badge -->
        <div class="relative z-10 flex items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                    <i class="fa-solid fa-laptop-code text-2xl sm:text-3xl text-amber-300"></i>
                </div>
                <div>
                    <div class="flex items-center gap-2.5">
                        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">ComSTraC &amp; Data Science Center</h1>
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-xs">Pelatihan &amp; AI</span>
                    </div>
                    <p class="text-purple-200 text-xs sm:text-sm mt-1 font-medium">FMIPA Universitas Pakuan &bull; Pelatihan TI, Sertifikasi Profesi BNSP, Software House &amp; Konsultasi AI</p>
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
                <span class="px-1 text-xs text-purple-200 font-semibold flex items-center gap-1.5 shrink-0">
                    <i class="fa-solid fa-filter text-amber-300 text-[11px]"></i> Filter:
                </span>

                <!-- Filter Divisi -->
                <div class="comstrac-dropdown-wrap" data-filter="divisi" id="wrapFilterComstracDivisi">
                    <button type="button" class="comstrac-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-laptop-code text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Divisi:</span>
                        <span class="comstrac-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="comstrac-dropdown-menu hidden">
                        <div class="comstrac-dropdown-item active is-active" data-value="semua">Semua Divisi</div>
                        <div class="comstrac-dropdown-item" data-value="bootcamp">Bootcamp &amp; Pelatihan IT</div>
                        <div class="comstrac-dropdown-item" data-value="bnsp">Sertifikasi BNSP / Vendor</div>
                        <div class="comstrac-dropdown-item" data-value="software">Software House &amp; Web App</div>
                        <div class="comstrac-dropdown-item" data-value="ai">Data Science &amp; AI Consulting</div>
                    </div>
                </div>

                <!-- Filter Status -->
                <div class="comstrac-dropdown-wrap" data-filter="status" id="wrapFilterComstracStatus">
                    <button type="button" class="comstrac-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-circle-check text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Status:</span>
                        <span class="comstrac-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="comstrac-dropdown-menu hidden">
                        <div class="comstrac-dropdown-item active is-active" data-value="semua">Semua Status</div>
                        <div class="comstrac-dropdown-item" data-value="buka">Pendaftaran Dibuka</div>
                        <div class="comstrac-dropdown-item" data-value="berjalan">Sedang Berjalan</div>
                        <div class="comstrac-dropdown-item" data-value="selesai">Selesai / Lulus</div>
                    </div>
                </div>

                <!-- Filter Periode -->
                <div class="comstrac-dropdown-wrap" data-filter="periode" id="wrapFilterComstracPeriode">
                    <button type="button" class="comstrac-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-calendar-days text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Periode:</span>
                        <span class="comstrac-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="comstrac-dropdown-menu hidden">
                        <div class="comstrac-dropdown-item active is-active" data-value="semua">Semua Periode</div>
                        <div class="comstrac-dropdown-item" data-value="2026">Tahun 2026 (Terkini)</div>
                        <div class="comstrac-dropdown-item" data-value="2025">Tahun 2025</div>
                        <div class="comstrac-dropdown-item" data-value="2024">Tahun 2024</div>
                    </div>
                </div>

                <!-- Reset Filter Button -->
                <button id="btnResetComstracFilters" type="button" class="comstrac-filter-reset hidden" title="Reset Semua Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    {{-- Two-Tier Sticky Floating Header --}}
    <div id="compactStickyBarComstrac" class="comstrac-compact-sticky-bar mb-6">
        <div class="w-full rounded-2xl bg-gradient-to-r from-[#722F99]/96 via-[#592279]/96 to-[#3a1251]/96 backdrop-blur-xl text-white py-2.5 sm:py-3 px-4 sm:px-6 shadow-2xl shadow-purple-950/40 border border-white/25 flex flex-col gap-2.5">
            {{-- Tier 1: Mini Brand --}}
            <div class="flex items-center justify-between gap-3 pb-2 border-b border-white/15">
                <div class="flex items-center gap-2.5 sm:gap-3 shrink-0">
                    <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                        <i class="fas fa-laptop-code text-xs sm:text-sm text-amber-300"></i>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="font-extrabold text-white text-xs sm:text-sm md:text-base tracking-tight">ComSTraC & DSC FMIPA</span>
                        <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30">Pelatihan & AI</span>
                    </div>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-semibold border border-white/25 shadow-xs">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        T.A. 2025/2026
                    </span>
                </div>
            </div>

            {{-- Tier 2: Synchronized Filters --}}
            <div class="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-0.5">
                <span class="comstrac-filter-label px-1 text-xs text-purple-200 font-semibold flex items-center gap-1.5 shrink-0">
                    <i class="fas fa-filter text-amber-300 text-xs"></i>
                    <span>Filter:</span>
                </span>

                {{-- Compact Filter Divisi --}}
                <div class="comstrac-dropdown-wrap relative" data-filter="divisi" id="wrapCompactFilterComstracDivisi">
                    <button type="button" class="comstrac-pill-btn flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 border border-white/25 text-xs text-white transition cursor-pointer" aria-haspopup="true" aria-expanded="false">
                        <span class="text-purple-200 text-[10px]">Divisi:</span>
                        <span class="comstrac-btn-label font-bold text-white">Semua</span>
                        <i class="fas fa-chevron-down text-[9px] text-purple-200 ml-1 chevron-icon"></i>
                    </button>
                    <div class="comstrac-dropdown-menu hidden">
                        <div class="comstrac-dropdown-item active is-active" data-value="semua">Semua Divisi</div>
                        <div class="comstrac-dropdown-item" data-value="bootcamp">Bootcamp & Pelatihan IT</div>
                        <div class="comstrac-dropdown-item" data-value="bnsp">Sertifikasi BNSP / Vendor</div>
                        <div class="comstrac-dropdown-item" data-value="software">Software House & Web App</div>
                        <div class="comstrac-dropdown-item" data-value="ai">Data Science & AI Consulting</div>
                    </div>
                </div>

                {{-- Compact Filter Status --}}
                <div class="comstrac-dropdown-wrap relative" data-filter="status" id="wrapCompactFilterComstracStatus">
                    <button type="button" class="comstrac-pill-btn flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 border border-white/25 text-xs text-white transition cursor-pointer" aria-haspopup="true" aria-expanded="false">
                        <span class="text-purple-200 text-[10px]">Status:</span>
                        <span class="comstrac-btn-label font-bold text-white">Semua</span>
                        <i class="fas fa-chevron-down text-[9px] text-purple-200 ml-1 chevron-icon"></i>
                    </button>
                    <div class="comstrac-dropdown-menu hidden">
                        <div class="comstrac-dropdown-item active is-active" data-value="semua">Semua Status</div>
                        <div class="comstrac-dropdown-item" data-value="buka">Pendaftaran Dibuka</div>
                        <div class="comstrac-dropdown-item" data-value="berjalan">Sedang Berjalan</div>
                        <div class="comstrac-dropdown-item" data-value="selesai">Selesai / Lulus</div>
                    </div>
                </div>

                {{-- Compact Filter Periode --}}
                <div class="comstrac-dropdown-wrap relative" data-filter="periode" id="wrapCompactFilterComstracPeriode">
                    <button type="button" class="comstrac-pill-btn flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 border border-white/25 text-xs text-white transition cursor-pointer" aria-haspopup="true" aria-expanded="false">
                        <span class="text-purple-200 text-[10px]">Tahun:</span>
                        <span class="comstrac-btn-label font-bold text-white">Semua</span>
                        <i class="fas fa-chevron-down text-[9px] text-purple-200 ml-1 chevron-icon"></i>
                    </button>
                    <div class="comstrac-dropdown-menu hidden">
                        <div class="comstrac-dropdown-item active is-active" data-value="semua">Semua Periode</div>
                        <div class="comstrac-dropdown-item" data-value="2026">Tahun 2026</div>
                        <div class="comstrac-dropdown-item" data-value="2025">Tahun 2025</div>
                        <div class="comstrac-dropdown-item" data-value="2024">Tahun 2024</div>
                    </div>
                </div>

                <button id="btnResetCompactComstracFilters" type="button" class="comstrac-filter-reset hidden" title="Reset Semua Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    {{-- Section 1: Statistik & Kinerja Finansial --}}
    @include('pages.comstrac-dsc.partials.statistik')

    {{-- Section 2: Katalog Program & Proyek IT --}}
    @include('pages.comstrac-dsc.partials.daftar-program')

</div>

{{-- Modal 1: Buka Batch / Proyek Baru --}}
<div id="modalTambahComstrac" class="comstrac-modal fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm hidden p-4">
    <div class="comstrac-modal-dialog bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-purple-100 relative">
        <div class="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-[#722F99] text-white flex items-center justify-center">
                    <i class="fas fa-plus-circle text-lg"></i>
                </div>
                <div>
                    <h3 class="font-bold text-slate-800 text-lg">Buka Batch / Kontrak Proyek Baru</h3>
                    <p class="text-xs text-slate-500">Formulir pendaftaran pelatihan, sertifikasi atau order software house</p>
                </div>
            </div>
            <button type="button" class="comstrac-modal-close text-slate-400 hover:text-slate-600 transition">
                <i class="fas fa-times text-lg"></i>
            </button>
        </div>

        <form id="formTambahComstrac" class="space-y-4">
            <div>
                <label for="inputNamaProgram" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Nama Program / Proyek Software *</label>
                <input type="text" id="inputNamaProgram" required placeholder="Contoh: Professional Data Science Bootcamp Batch 8" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#722F99]/30 focus:border-[#722F99]">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="selectDivisiProgram" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Divisi Layanan *</label>
                    <select id="selectDivisiProgram" required class="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-[#722F99]/30">
                        <option value="bootcamp">Bootcamp & Pelatihan IT</option>
                        <option value="bnsp">Sertifikasi BNSP / Vendor</option>
                        <option value="software">Software House & Web App</option>
                        <option value="ai">Data Science & AI Consulting</option>
                    </select>
                </div>
                <div>
                    <label for="inputKlienMitra" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Klien / Mitra / Sasaran *</label>
                    <input type="text" id="inputKlienMitra" required placeholder="PT Telkom / Publik Mahasiswa" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#722F99]/30 focus:border-[#722F99]">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="inputNilaiKontrak" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Nilai Kontrak / Biaya (Rp) *</label>
                    <input type="text" id="inputNilaiKontrak" required placeholder="Contoh: 35000000" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#722F99]/30 focus:border-[#722F99]">
                </div>
                <div>
                    <label for="inputTargetPeserta" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Target Peserta / Durasi *</label>
                    <input type="text" id="inputTargetPeserta" required placeholder="30 Peserta / 2 Bulan" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#722F99]/30 focus:border-[#722F99]">
                </div>
            </div>

            <div class="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button type="button" class="comstrac-modal-close px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer">Batal</button>
                <button type="submit" class="px-5 py-2.5 rounded-xl bg-[#722F99] hover:bg-[#592279] text-white text-xs font-bold shadow-md transition cursor-pointer">Simpan & Daftarkan</button>
            </div>
        </form>
    </div>
</div>

{{-- Modal 2: Detail Program & Portofolio --}}
<div id="modalDetailComstrac" class="comstrac-modal fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm hidden p-4">
    <div class="comstrac-modal-dialog bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-purple-100 relative">
        <div class="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-purple-100 text-[#722F99] flex items-center justify-center">
                    <i class="fas fa-info-circle text-lg"></i>
                </div>
                <div>
                    <h3 class="font-bold text-slate-800 text-base" id="detailComstracTitle">Detail Portofolio ComSTraC</h3>
                    <p class="text-xs text-slate-500" id="detailComstracSub">ID: CST-2026-001</p>
                </div>
            </div>
            <button type="button" class="comstrac-modal-close text-slate-400 hover:text-slate-600 transition">
                <i class="fas fa-times text-lg"></i>
            </button>
        </div>

        <div class="space-y-3.5 text-xs text-slate-600" id="detailComstracBody">
            {{-- Dynamic details injected via JS --}}
        </div>

        <div class="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs text-slate-400">ComSTraC & DSC FMIPA UNPAK</span>
            <button type="button" class="comstrac-modal-close px-4 py-2 rounded-xl bg-[#722F99] text-white text-xs font-semibold hover:bg-[#592279] transition cursor-pointer">Tutup</button>
        </div>
    </div>
</div>
@endsection
