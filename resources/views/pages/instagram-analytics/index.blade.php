@extends('layouts.app')

@section('title', 'Instagram Analytics @fmipa_unpak')

@section('content')
<div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
    <!-- Executive Hero Banner (Instagram Analytics Edition - Standar Dosen & Dashboard) -->
    <div id="executiveHeroBannerIg" class="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#722F99] via-[#592279] to-[#3a1251] text-white p-6 sm:p-8 shadow-xl shadow-purple-950/20 border border-purple-800/40 mb-8 z-30">
        <!-- Ambient Decorative Glow Circles -->
        <div class="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none">
            <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div class="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-[#9333ea]/20 blur-3xl"></div>
        </div>

        <!-- Top Row: Executive Title & Academic Period Badge -->
        <div class="relative z-10 flex items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                    <i class="fa-brands fa-instagram text-2xl sm:text-3xl text-amber-300"></i>
                </div>
                <div>
                    <div class="flex items-center gap-2.5">
                        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Instagram Analytics</h1>
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-xs">@fmipa_unpak</span>
                    </div>
                    <p class="text-purple-200 text-xs sm:text-sm mt-1 font-medium">FMIPA Universitas Pakuan &bull; Metrik Performa Konten, Pertumbuhan Audiens, Engagement Rate &amp; Optimasi Reels</p>
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
                <span class="ig-filter-label px-1">
                    <i class="fa-solid fa-filter text-amber-300 text-xs"></i> Filter:
                </span>
                
                <!-- 1. Format Konten Filter -->
                <div class="ig-dropdown-wrap" data-filter="format" id="wrapFilterIgFormat">
                    <input type="hidden" id="filterIgFormat" value="semua">
                    <button type="button" class="ig-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-photo-film text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Format:</span>
                        <span class="ig-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="ig-dropdown-menu">
                        <div class="ig-dropdown-item active" data-value="semua">Semua Format</div>
                        <div class="ig-dropdown-item" data-value="reels">Reels Video</div>
                        <div class="ig-dropdown-item" data-value="carousel">Carousel Post</div>
                        <div class="ig-dropdown-item" data-value="feed">Single Feed</div>
                        <div class="ig-dropdown-item" data-value="story">Story Highlights</div>
                    </div>
                </div>

                <!-- 2. Periode Waktu Filter -->
                <div class="ig-dropdown-wrap" data-filter="periode" id="wrapFilterIgPeriode">
                    <input type="hidden" id="filterIgPeriode" value="semua">
                    <button type="button" class="ig-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-calendar-days text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Periode:</span>
                        <span class="ig-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="ig-dropdown-menu">
                        <div class="ig-dropdown-item active" data-value="semua">Semua Periode</div>
                        <div class="ig-dropdown-item" data-value="2026">Tahun 2026 (Terkini)</div>
                        <div class="ig-dropdown-item" data-value="2025">Tahun 2025</div>
                        <div class="ig-dropdown-item" data-value="2024">Tahun 2024</div>
                    </div>
                </div>

                <!-- 3. Topik Filter -->
                <div class="ig-dropdown-wrap" data-filter="topik" id="wrapFilterIgTopik">
                    <input type="hidden" id="filterIgTopik" value="semua">
                    <button type="button" class="ig-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-tag text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Topik:</span>
                        <span class="ig-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="ig-dropdown-menu">
                        <div class="ig-dropdown-item active" data-value="semua">Semua Topik</div>
                        <div class="ig-dropdown-item" data-value="akademik">Akademik &amp; Perkuliahan</div>
                        <div class="ig-dropdown-item" data-value="prestasi">Prestasi Mahasiswa</div>
                        <div class="ig-dropdown-item" data-value="kampus">Kampus &amp; Ormawa</div>
                        <div class="ig-dropdown-item" data-value="pmb">Info Dekanat &amp; PMB</div>
                    </div>
                </div>

                <!-- Reset Filter Button -->
                <button id="btnResetIgFilters" type="button" class="ig-filter-reset hidden" title="Reset Semua Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    <!-- Sticky Compact Floating Header (Standar Dosen & Dashboard) -->
    <div id="compactStickyBarIg">
        <div class="w-full rounded-2xl bg-gradient-to-r from-[#722F99]/96 via-[#592279]/96 to-[#3a1251]/96 backdrop-blur-xl text-white py-2.5 sm:py-3 px-4 sm:px-6 shadow-2xl shadow-purple-950/40 border border-white/25 flex flex-col gap-2.5">
            <!-- Top Row: Mini Brand & Account Badge -->
            <div class="flex items-center justify-between gap-3 pb-2 border-b border-white/15">
                <div class="flex items-center gap-2.5 sm:gap-3 shrink-0">
                    <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                        <i class="fa-brands fa-instagram text-xs sm:text-sm text-amber-300"></i>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="font-extrabold text-white text-xs sm:text-sm md:text-base tracking-tight">Instagram @fmipa_unpak</span>
                        <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30">Analytics</span>
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
                <span class="ig-filter-label px-1 text-xs text-purple-200 font-semibold flex items-center gap-1.5 shrink-0">
                    <i class="fa-solid fa-filter text-amber-300 text-[11px]"></i> Filter:
                </span>

                <!-- Compact Format Filter -->
                <div class="ig-dropdown-wrap" data-filter="format" id="wrapCompactFilterIgFormat">
                    <input type="hidden" id="compactFilterIgFormat" value="semua">
                    <button type="button" class="ig-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-photo-film text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Format:</span>
                        <span class="ig-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="ig-dropdown-menu">
                        <div class="ig-dropdown-item active" data-value="semua">Semua Format</div>
                        <div class="ig-dropdown-item" data-value="reels">Reels Video</div>
                        <div class="ig-dropdown-item" data-value="carousel">Carousel Post</div>
                        <div class="ig-dropdown-item" data-value="feed">Single Feed</div>
                        <div class="ig-dropdown-item" data-value="story">Story Highlights</div>
                    </div>
                </div>

                <!-- Compact Periode Filter -->
                <div class="ig-dropdown-wrap" data-filter="periode" id="wrapCompactFilterIgPeriode">
                    <input type="hidden" id="compactFilterIgPeriode" value="semua">
                    <button type="button" class="ig-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-calendar-days text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Periode:</span>
                        <span class="ig-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="ig-dropdown-menu">
                        <div class="ig-dropdown-item active" data-value="semua">Semua Periode</div>
                        <div class="ig-dropdown-item" data-value="2026">Tahun 2026 (Terkini)</div>
                        <div class="ig-dropdown-item" data-value="2025">Tahun 2025</div>
                        <div class="ig-dropdown-item" data-value="2024">Tahun 2024</div>
                    </div>
                </div>

                <!-- Compact Topik Filter -->
                <div class="ig-dropdown-wrap" data-filter="topik" id="wrapCompactFilterIgTopik">
                    <input type="hidden" id="compactFilterIgTopik" value="semua">
                    <button type="button" class="ig-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-tag text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Topik:</span>
                        <span class="ig-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="ig-dropdown-menu">
                        <div class="ig-dropdown-item active" data-value="semua">Semua Topik</div>
                        <div class="ig-dropdown-item" data-value="akademik">Akademik &amp; Perkuliahan</div>
                        <div class="ig-dropdown-item" data-value="prestasi">Prestasi Mahasiswa</div>
                        <div class="ig-dropdown-item" data-value="kampus">Kampus &amp; Ormawa</div>
                        <div class="ig-dropdown-item" data-value="pmb">Info Dekanat &amp; PMB</div>
                    </div>
                </div>

                <!-- Reset Filter Button (Compact) -->
                <button id="btnResetCompactIgFilters" type="button" class="ig-filter-reset hidden" title="Reset Semua Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    <!-- Instagram Analytics Domain Sections Container (Struktur Modular Mengikuti Dosen) -->
    <div id="instagramAnalyticsSections" class="space-y-8">
        <!-- 1. Statistik Instagram (Overview, Followers Growth, Demografi & Jam Aktif) -->
        @include('pages.instagram-analytics.partials.statistik')

        <!-- 2. Daftar Postingan Instagram (Tabel Lengkap, 4 Action Buttons, Export, Live Search & Format Tabs) -->
        @include('pages.instagram-analytics.partials.daftar-post')
    </div>
</div>

<!-- ============================================
     MODALS
     ============================================ -->

<!-- 1. Modal Buat / Jadwalkan Postingan -->
<div id="modalTambahIg" class="ig-modal">
    <div class="ig-modal-dialog">
        <div class="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#722F99] via-[#592279] to-[#3a1251] text-white rounded-t-[1.25rem]">
            <div class="flex items-center gap-2.5">
                <i class="fa-brands fa-instagram text-amber-300 text-lg"></i>
                <h3 class="font-bold text-base sm:text-lg">Buat / Jadwalkan Postingan Instagram</h3>
            </div>
            <button type="button" class="ig-modal-close text-white/70 hover:text-white transition w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
        <form id="formTambahIg" class="p-5 sm:p-6 space-y-4">
            <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Caption / Keterangan Unggahan</label>
                <textarea id="inputCaptionIg" rows="3" required placeholder="Tuliskan caption postingan, ajakan interaksi, dan hashtag resmi FMIPA..." class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40"></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Format Konten</label>
                    <select id="selectFormatIg" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        <option value="Reels Video">Reels Video (9:16 Vertical)</option>
                        <option value="Carousel Post">Carousel Post (Multi-Slide 1:1 / 4:5)</option>
                        <option value="Single Feed">Single Feed Image (1:1)</option>
                        <option value="Story Highlights">Story Highlights</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Topik Konten</label>
                    <select id="selectTopikIg" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        <option value="Akademik & Perkuliahan">Akademik &amp; Perkuliahan</option>
                        <option value="Prestasi FMIPA">Prestasi FMIPA</option>
                        <option value="Kampus & Ormawa">Kampus &amp; Ormawa</option>
                        <option value="Info Dekanat & PMB">Info Dekanat &amp; PMB</option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Tanggal &amp; Waktu Tayang</label>
                    <input type="datetime-local" id="inputJadwalIg" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Tautan Aset Desain / Video (Google Drive / Canva)</label>
                    <input type="url" id="inputAssetUrlIg" placeholder="https://drive.google.com/..." class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" class="ig-modal-close px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer">
                    Batal
                </button>
                <button type="submit" class="px-5 py-2 rounded-xl bg-gradient-to-r from-[#722F99] to-[#592279] text-white text-sm font-bold shadow-md shadow-purple-900/20 hover:opacity-95 cursor-pointer">
                    Simpan Postingan
                </button>
            </div>
        </form>
    </div>
</div>

<!-- 2. Modal Detail Postingan & Metrik Instagram -->
<div id="modalDetailIg" class="ig-modal">
    <div class="ig-modal-dialog">
        <div class="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#722F99] via-[#592279] to-[#3a1251] text-white rounded-t-[1.25rem]">
            <div class="flex items-center gap-2.5">
                <i class="fa-brands fa-instagram text-amber-300 text-lg"></i>
                <div>
                    <h3 class="font-bold text-base sm:text-lg">Rincian Metrik Postingan Instagram</h3>
                    <span class="text-xs text-purple-200 font-mono" id="detailIgId">POST-IG-01</span>
                </div>
            </div>
            <button type="button" class="ig-modal-close text-white/70 hover:text-white transition w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
        <div class="p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
            <div>
                <span class="text-slate-400 block text-xs mb-0.5">Caption Konten:</span>
                <p class="font-semibold text-slate-800 text-sm leading-relaxed p-3 bg-slate-50 rounded-xl border border-slate-200" id="detailIgCaption">-</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-3 border-b border-slate-100">
                <div>
                    <span class="text-slate-400 block text-xs">Format Konten:</span>
                    <span class="font-bold text-purple-900" id="detailIgFormat">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Topik:</span>
                    <span class="font-bold text-slate-800" id="detailIgTopik">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Jangkauan (Reach):</span>
                    <span class="font-bold text-[#722F99]" id="detailIgReach">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Engagement Rate:</span>
                    <span class="font-bold text-indigo-700" id="detailIgEngage">-</span>
                </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div class="p-3 bg-purple-50/70 border border-purple-100 rounded-xl text-center">
                    <span class="text-slate-500 text-[11px] block"><i class="fa-solid fa-heart text-[#722F99] mr-1"></i>Suka (Likes)</span>
                    <span class="font-extrabold text-slate-800 text-sm" id="detailIgLikes">-</span>
                </div>
                <div class="p-3 bg-purple-50/70 border border-purple-100 rounded-xl text-center">
                    <span class="text-slate-500 text-[11px] block"><i class="fa-solid fa-comment text-purple-600 mr-1"></i>Komentar</span>
                    <span class="font-extrabold text-slate-800 text-sm" id="detailIgComments">-</span>
                </div>
                <div class="p-3 bg-amber-50/70 border border-amber-100 rounded-xl text-center">
                    <span class="text-slate-500 text-[11px] block"><i class="fa-solid fa-bookmark text-amber-500 mr-1"></i>Disimpan</span>
                    <span class="font-extrabold text-slate-800 text-sm" id="detailIgSaves">-</span>
                </div>
                <div class="p-3 bg-teal-50/70 border border-teal-100 rounded-xl text-center">
                    <span class="text-slate-500 text-[11px] block"><i class="fa-solid fa-share-nodes text-teal-600 mr-1"></i>Dibagikan</span>
                    <span class="font-extrabold text-slate-800 text-sm" id="detailIgShares">-</span>
                </div>
            </div>

            <div class="p-4 rounded-xl bg-purple-50/60 border border-purple-100 space-y-1.5">
                <span class="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                    <i class="fa-solid fa-chart-pie text-amber-400"></i> Insight Distribusi Algoritma
                </span>
                <p class="text-xs text-slate-700 leading-relaxed" id="detailIgInsight">
                    Postingan ini memperoleh 42% tayangan dari Explore Feed dan Rekomendasi Reels non-followers, dengan rata-rata tontonan video mencapai 84% durasi penuh.
                </p>
            </div>

            <div class="pt-2 flex items-center justify-end">
                <button type="button" class="ig-modal-close px-5 py-2 rounded-xl bg-[#722F99] text-white text-sm font-bold shadow-md hover:bg-[#592279] cursor-pointer">
                    Tutup
                </button>
            </div>
        </div>
    </div>
</div>
@endsection
