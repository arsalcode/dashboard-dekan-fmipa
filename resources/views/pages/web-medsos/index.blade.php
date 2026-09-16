@extends('layouts.app')

@section('title', 'Web & Media Sosial FMIPA')

@section('content')
<div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
    <!-- Executive Hero Banner (Web & Medsos Edition - Standar Dosen & Dashboard) -->
    <div id="executiveHeroBannerWeb" class="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#722F99] via-[#592279] to-[#3a1251] text-white p-6 sm:p-8 shadow-xl shadow-purple-950/20 border border-purple-800/40 mb-8 z-30">
        <!-- Ambient Decorative Glow Circles -->
        <div class="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none">
            <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div class="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-[#9333ea]/20 blur-3xl"></div>
        </div>

        <!-- Top Row: Executive Title & Academic Period Badge -->
        <div class="relative z-10 flex items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                    <i class="fa-solid fa-globe text-2xl sm:text-3xl text-amber-300"></i>
                </div>
                <div>
                    <div class="flex items-center gap-2.5">
                        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Web &amp; Media Sosial FMIPA</h1>
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-xs">Humas &amp; IT</span>
                    </div>
                    <p class="text-purple-200 text-xs sm:text-sm mt-1 font-medium">FMIPA Universitas Pakuan &bull; Lalu Lintas Website Resmi, Publikasi Berita, SEO &amp; Analisis Multi-Kanal Medsos</p>
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
                <span class="web-filter-label px-1">
                    <i class="fa-solid fa-filter text-amber-300 text-xs"></i> Filter:
                </span>
                
                <!-- 1. Kanal Filter -->
                <div class="web-dropdown-wrap" data-filter="kanal" id="wrapFilterWebKanal">
                    <input type="hidden" id="filterWebKanal" value="semua">
                    <button type="button" class="web-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-layer-group text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Kanal:</span>
                        <span class="web-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="web-dropdown-menu">
                        <div class="web-dropdown-item active" data-value="semua">Semua Kanal</div>
                        <div class="web-dropdown-item" data-value="website">Website FMIPA</div>
                        <div class="web-dropdown-item" data-value="instagram">Instagram</div>
                        <div class="web-dropdown-item" data-value="youtube">YouTube</div>
                        <div class="web-dropdown-item" data-value="linkedin">LinkedIn</div>
                        <div class="web-dropdown-item" data-value="tiktok">TikTok</div>
                    </div>
                </div>

                <!-- 2. Periode Waktu Filter -->
                <div class="web-dropdown-wrap" data-filter="periode" id="wrapFilterWebPeriode">
                    <input type="hidden" id="filterWebPeriode" value="semua">
                    <button type="button" class="web-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-calendar-days text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Periode:</span>
                        <span class="web-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="web-dropdown-menu">
                        <div class="web-dropdown-item active" data-value="semua">Semua Periode</div>
                        <div class="web-dropdown-item" data-value="2026">Tahun 2026 (Terkini)</div>
                        <div class="web-dropdown-item" data-value="2025">Tahun 2025</div>
                        <div class="web-dropdown-item" data-value="2024">Tahun 2024</div>
                    </div>
                </div>

                <!-- 3. Status Publikasi Filter -->
                <div class="web-dropdown-wrap" data-filter="status" id="wrapFilterWebStatus">
                    <input type="hidden" id="filterWebStatus" value="semua">
                    <button type="button" class="web-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-circle-check text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Status:</span>
                        <span class="web-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="web-dropdown-menu">
                        <div class="web-dropdown-item active" data-value="semua">Semua Status</div>
                        <div class="web-dropdown-item" data-value="tayang">&#10003; Tayang (Published)</div>
                        <div class="web-dropdown-item" data-value="jadwal">&#x23F8; Terjadwal</div>
                        <div class="web-dropdown-item" data-value="draft">&#128065; Draft</div>
                    </div>
                </div>

                <!-- Reset Filter Button -->
                <button id="btnResetWebFilters" type="button" class="web-filter-reset hidden" title="Reset Semua Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    <!-- Sticky Compact Floating Header (Two-Tier Standar Dosen & Wadek 1) -->
    <div id="compactStickyBarWeb">
        <div class="w-full rounded-2xl bg-gradient-to-r from-[#722F99]/96 via-[#592279]/96 to-[#3a1251]/96 backdrop-blur-xl text-white py-2.5 sm:py-3 px-4 sm:px-6 shadow-2xl shadow-purple-950/40 border border-white/25 flex flex-col gap-2.5">
            <!-- Top Row: Mini Brand & Academic Badge -->
            <div class="flex items-center justify-between gap-3 pb-2 border-b border-white/15">
                <div class="flex items-center gap-2.5 sm:gap-3 shrink-0">
                    <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                        <i class="fa-solid fa-globe text-xs sm:text-sm text-amber-300"></i>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="font-extrabold text-white text-xs sm:text-sm md:text-base tracking-tight">Web &amp; Medsos FMIPA</span>
                        <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30">Humas</span>
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
                <span class="web-filter-label px-1 text-xs text-purple-200 font-semibold flex items-center gap-1.5 shrink-0">
                    <i class="fa-solid fa-filter text-amber-300 text-[11px]"></i> Filter:
                </span>

                <!-- Compact Kanal Filter -->
                <div class="web-dropdown-wrap" data-filter="kanal" id="wrapCompactFilterWebKanal">
                    <input type="hidden" id="compactFilterWebKanal" value="semua">
                    <button type="button" class="web-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-layer-group text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Kanal:</span>
                        <span class="web-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="web-dropdown-menu">
                        <div class="web-dropdown-item active" data-value="semua">Semua Kanal</div>
                        <div class="web-dropdown-item" data-value="website">Website FMIPA</div>
                        <div class="web-dropdown-item" data-value="instagram">Instagram</div>
                        <div class="web-dropdown-item" data-value="youtube">YouTube</div>
                        <div class="web-dropdown-item" data-value="linkedin">LinkedIn</div>
                        <div class="web-dropdown-item" data-value="tiktok">TikTok</div>
                    </div>
                </div>

                <!-- Compact Periode Filter -->
                <div class="web-dropdown-wrap" data-filter="periode" id="wrapCompactFilterWebPeriode">
                    <input type="hidden" id="compactFilterWebPeriode" value="semua">
                    <button type="button" class="web-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-calendar-days text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Periode:</span>
                        <span class="web-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="web-dropdown-menu">
                        <div class="web-dropdown-item active" data-value="semua">Semua Periode</div>
                        <div class="web-dropdown-item" data-value="2026">Tahun 2026 (Terkini)</div>
                        <div class="web-dropdown-item" data-value="2025">Tahun 2025</div>
                        <div class="web-dropdown-item" data-value="2024">Tahun 2024</div>
                    </div>
                </div>

                <!-- Compact Status Filter -->
                <div class="web-dropdown-wrap" data-filter="status" id="wrapCompactFilterWebStatus">
                    <input type="hidden" id="compactFilterWebStatus" value="semua">
                    <button type="button" class="web-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-circle-check text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Status:</span>
                        <span class="web-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="web-dropdown-menu">
                        <div class="web-dropdown-item active" data-value="semua">Semua Status</div>
                        <div class="web-dropdown-item" data-value="tayang">&#10003; Tayang (Published)</div>
                        <div class="web-dropdown-item" data-value="jadwal">&#x23F8; Terjadwal</div>
                        <div class="web-dropdown-item" data-value="draft">&#128065; Draft</div>
                    </div>
                </div>

                <!-- Reset Filter Button (Compact) -->
                <button id="btnResetCompactWebFilters" type="button" class="web-filter-reset hidden" title="Reset Semua Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    <!-- Web & Medsos Domain Sections Container (Struktur Modular Mengikuti Dosen) -->
    <div id="webMedsosSections" class="space-y-8">
        <!-- 1. Statistik Web & Medsos (Overview, Pageviews, Sumber Trafik & Perangkat) -->
        @include('pages.web-medsos.partials.statistik')

        <!-- 2. Daftar Konten & Berita FMIPA (Tabel Lengkap, 4 Action Buttons, Export, Live Search & Kanal Tabs) -->
        @include('pages.web-medsos.partials.daftar-konten')
    </div>
</div>

<!-- ============================================
     MODALS
     ============================================ -->

<!-- 1. Modal Tambah Publikasi Berita -->
<div id="modalTambahWeb" class="web-modal">
    <div class="web-modal-dialog">
        <div class="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#722F99] via-[#592279] to-[#3a1251] text-white rounded-t-[1.25rem]">
            <div class="flex items-center gap-2.5">
                <i class="fa-solid fa-circle-plus text-amber-300 text-lg"></i>
                <h3 class="font-bold text-base sm:text-lg">Tambah Publikasi Berita / Konten</h3>
            </div>
            <button type="button" class="web-modal-close text-white/70 hover:text-white transition w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
        <form id="formTambahWeb" class="p-5 sm:p-6 space-y-4">
            <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Judul Artikel / Berita</label>
                <input type="text" id="inputJudulWeb" required placeholder="Contoh: Kuliah Umum AI & Robotika FMIPA 2026..." class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Kanal Publikasi</label>
                    <select id="selectKanalWeb" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        <option value="Website FMIPA">Website Resmi FMIPA</option>
                        <option value="Instagram">Instagram @fmipa_unpak</option>
                        <option value="YouTube">YouTube FMIPA UNPAK</option>
                        <option value="LinkedIn">LinkedIn Official</option>
                        <option value="TikTok">TikTok @fmipa.unpak</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Kategori Konten</label>
                    <select id="selectKategoriWeb" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        <option value="Akademik & Riset">Akademik &amp; Riset</option>
                        <option value="Prestasi Mahasiswa">Prestasi Mahasiswa</option>
                        <option value="Event & Seminar">Event &amp; Seminar</option>
                        <option value="Pengumuman">Pengumuman Dekanat</option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Penulis / Penanggung Jawab</label>
                    <input type="text" id="inputPenulisWeb" required placeholder="Contoh: Tim Humas & IT FMIPA" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Tautan / URL Publikasi</label>
                    <input type="url" id="inputUrlWeb" placeholder="https://fmipa.unpak.ac.id/berita/..." class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" class="web-modal-close px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer">
                    Batal
                </button>
                <button type="submit" class="px-5 py-2 rounded-xl bg-gradient-to-r from-[#722F99] to-[#592279] text-white text-sm font-bold shadow-md shadow-purple-900/20 hover:opacity-95 cursor-pointer">
                    Simpan Publikasi
                </button>
            </div>
        </form>
    </div>
</div>

<!-- 2. Modal Detail Publikasi & Metrik Web -->
<div id="modalDetailWeb" class="web-modal">
    <div class="web-modal-dialog">
        <div class="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#722F99] via-[#592279] to-[#3a1251] text-white rounded-t-[1.25rem]">
            <div class="flex items-center gap-2.5">
                <i class="fa-solid fa-circle-info text-amber-300 text-lg"></i>
                <div>
                    <h3 class="font-bold text-base sm:text-lg">Rincian Metrik Publikasi</h3>
                    <span class="text-xs text-purple-200 font-mono" id="detailWebId">ID-PUB-01</span>
                </div>
            </div>
            <button type="button" class="web-modal-close text-white/70 hover:text-white transition w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
        <div class="p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
            <div>
                <span class="text-slate-400 block text-xs mb-0.5">Judul Konten:</span>
                <p class="font-bold text-slate-800 text-base leading-snug" id="detailWebJudul">-</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-3 border-b border-slate-100">
                <div>
                    <span class="text-slate-400 block text-xs">Kanal:</span>
                    <span class="font-bold text-purple-900" id="detailWebKanal">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Kategori:</span>
                    <span class="font-bold text-slate-800" id="detailWebKategori">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Tayangan (Views):</span>
                    <span class="font-bold text-emerald-700" id="detailWebViews">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Engagement Rate:</span>
                    <span class="font-bold text-indigo-700" id="detailWebEngage">-</span>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <span class="text-slate-400 block text-xs mb-0.5">Penulis / Administrator:</span>
                    <p class="font-semibold text-slate-800" id="detailWebPenulis">-</p>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs mb-0.5">Tanggal Terbit:</span>
                    <p class="font-semibold text-slate-800" id="detailWebTanggal">-</p>
                </div>
            </div>

            <div class="p-4 rounded-xl bg-purple-50/60 border border-purple-100 space-y-1.5">
                <span class="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                    <i class="fa-solid fa-chart-simple text-amber-500"></i> Sumber Lalu Lintas &amp; Retensi
                </span>
                <p class="text-xs text-slate-700 leading-relaxed">
                    Konten ini mencatatkan rerata waktu baca 2 menit 45 detik dengan kontribusi 62% pengunjung melalui pencarian Google dan 28% dari referral Instagram Story.
                </p>
            </div>

            <div class="pt-2 flex items-center justify-end">
                <button type="button" class="web-modal-close px-5 py-2 rounded-xl bg-[#722F99] text-white text-sm font-bold shadow-md hover:bg-[#592279] cursor-pointer">
                    Tutup
                </button>
            </div>
        </div>
    </div>
</div>
@endsection
