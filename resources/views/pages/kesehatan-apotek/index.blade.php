@extends('layouts.app')

@section('title', 'Kesehatan & Apotek - Dashboard Dekan FMIPA UNPAK')

@section('content')
<div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto" id="apotekSections">

    <!-- Executive Hero Banner (Kesehatan & Apotek - Standar Dashboard Dekan) -->
    <div id="executiveHeroBannerApotek" class="apotek-hero-banner relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#722F99] via-[#592279] to-[#3a1251] text-white p-6 sm:p-8 shadow-xl shadow-purple-950/20 border border-purple-800/40 mb-8 z-30">
        <!-- Ambient Decorative Glow Circles -->
        <div class="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none">
            <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div class="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-[#9333ea]/20 blur-3xl"></div>
        </div>

        <!-- Top Row: Executive Title & Academic Period Badge -->
        <div class="relative z-10 flex items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                    <i class="fa-solid fa-clinic-medical text-2xl sm:text-3xl text-amber-300"></i>
                </div>
                <div>
                    <div class="flex items-center gap-2.5">
                        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Kesehatan &amp; Apotek Pendidikan FMIPA</h1>
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-xs">Farmasi &amp; Herbal</span>
                    </div>
                    <p class="text-purple-200 text-xs sm:text-sm mt-1 font-medium">FMIPA Universitas Pakuan &bull; Penjualan Obat Bebas/Resep, Hilirisasi Riset Fitofarmaka &amp; Layanan Cek Kesehatan</p>
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

                <!-- Filter Kategori -->
                <div class="apotek-dropdown-wrap" data-filter="kategori" id="wrapFilterApotekKategori">
                    <button type="button" class="apotek-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-pills text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Kategori:</span>
                        <span class="apotek-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="apotek-dropdown-menu hidden">
                        <div class="apotek-dropdown-item active is-active" data-value="semua">Semua Komoditas</div>
                        <div class="apotek-dropdown-item" data-value="herbal">Herbal Fitofarmaka FMIPA</div>
                        <div class="apotek-dropdown-item" data-value="obat">Obat Bebas &amp; Resep (OTC)</div>
                        <div class="apotek-dropdown-item" data-value="cek">Layanan Cek Kesehatan</div>
                        <div class="apotek-dropdown-item" data-value="skincare">Skincare &amp; Personal Care</div>
                    </div>
                </div>

                <!-- Filter Status -->
                <div class="apotek-dropdown-wrap" data-filter="status" id="wrapFilterApotekStatus">
                    <button type="button" class="apotek-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-circle-check text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Status:</span>
                        <span class="apotek-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="apotek-dropdown-menu hidden">
                        <div class="apotek-dropdown-item active is-active" data-value="semua">Semua Status</div>
                        <div class="apotek-dropdown-item" data-value="selesai">Selesai / Lunas</div>
                        <div class="apotek-dropdown-item" data-value="proses">Penyiapan Resep</div>
                        <div class="apotek-dropdown-item" data-value="pending">Menunggu Pembayaran</div>
                    </div>
                </div>

                <!-- Filter Periode -->
                <div class="apotek-dropdown-wrap" data-filter="periode" id="wrapFilterApotekPeriode">
                    <button type="button" class="apotek-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-calendar-days text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Periode:</span>
                        <span class="apotek-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="apotek-dropdown-menu hidden">
                        <div class="apotek-dropdown-item active is-active" data-value="semua">Semua Periode</div>
                        <div class="apotek-dropdown-item" data-value="2026">Tahun 2026 (Terkini)</div>
                        <div class="apotek-dropdown-item" data-value="2025">Tahun 2025</div>
                        <div class="apotek-dropdown-item" data-value="2024">Tahun 2024</div>
                    </div>
                </div>

                <!-- Reset Filter Button -->
                <button id="btnResetApotekFilters" type="button" class="apotek-filter-reset hidden" title="Reset Semua Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    {{-- Two-Tier Sticky Floating Header --}}
    <div id="compactStickyBarApotek" class="apotek-compact-sticky-bar mb-6">
        <div class="w-full rounded-2xl bg-gradient-to-r from-[#722F99]/96 via-[#592279]/96 to-[#3a1251]/96 backdrop-blur-xl text-white py-2.5 sm:py-3 px-4 sm:px-6 shadow-2xl shadow-purple-950/40 border border-white/25 flex flex-col gap-2.5">
            {{-- Tier 1: Mini Brand --}}
            <div class="flex items-center justify-between gap-3 pb-2 border-b border-white/15">
                <div class="flex items-center gap-2.5 sm:gap-3 shrink-0">
                    <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                        <i class="fas fa-clinic-medical text-xs sm:text-sm text-amber-300"></i>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="font-extrabold text-white text-xs sm:text-sm md:text-base tracking-tight">Kesehatan & Apotek FMIPA</span>
                        <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30">Farmasi & Herbal</span>
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
                <span class="apotek-filter-label px-1 text-xs text-purple-200 font-semibold flex items-center gap-1.5 shrink-0">
                    <i class="fas fa-filter text-amber-300 text-xs"></i>
                    <span>Filter:</span>
                </span>

                {{-- Compact Filter Kategori --}}
                <div class="apotek-dropdown-wrap relative" data-filter="kategori" id="wrapCompactFilterApotekKategori">
                    <button type="button" class="apotek-pill-btn flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 border border-white/25 text-xs text-white transition cursor-pointer" aria-haspopup="true" aria-expanded="false">
                        <span class="text-purple-200 text-[10px]">Kategori:</span>
                        <span class="apotek-btn-label font-bold text-white">Semua</span>
                        <i class="fas fa-chevron-down text-[9px] text-purple-200 ml-1 chevron-icon"></i>
                    </button>
                    <div class="apotek-dropdown-menu hidden">
                        <div class="apotek-dropdown-item active is-active" data-value="semua">Semua Komoditas</div>
                        <div class="apotek-dropdown-item" data-value="herbal">Herbal Fitofarmaka FMIPA</div>
                        <div class="apotek-dropdown-item" data-value="obat">Obat Bebas & Resep (OTC)</div>
                        <div class="apotek-dropdown-item" data-value="cek">Layanan Cek Kesehatan</div>
                        <div class="apotek-dropdown-item" data-value="skincare">Skincare & Personal Care</div>
                    </div>
                </div>

                {{-- Compact Filter Status --}}
                <div class="apotek-dropdown-wrap relative" data-filter="status" id="wrapCompactFilterApotekStatus">
                    <button type="button" class="apotek-pill-btn flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 border border-white/25 text-xs text-white transition cursor-pointer" aria-haspopup="true" aria-expanded="false">
                        <span class="text-purple-200 text-[10px]">Status:</span>
                        <span class="apotek-btn-label font-bold text-white">Semua</span>
                        <i class="fas fa-chevron-down text-[9px] text-purple-200 ml-1 chevron-icon"></i>
                    </button>
                    <div class="apotek-dropdown-menu hidden">
                        <div class="apotek-dropdown-item active is-active" data-value="semua">Semua Status</div>
                        <div class="apotek-dropdown-item" data-value="selesai">Selesai / Lunas</div>
                        <div class="apotek-dropdown-item" data-value="proses">Penyiapan Resep</div>
                        <div class="apotek-dropdown-item" data-value="pending">Menunggu Pembayaran</div>
                    </div>
                </div>

                {{-- Compact Filter Periode --}}
                <div class="apotek-dropdown-wrap relative" data-filter="periode" id="wrapCompactFilterApotekPeriode">
                    <button type="button" class="apotek-pill-btn flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 border border-white/25 text-xs text-white transition cursor-pointer" aria-haspopup="true" aria-expanded="false">
                        <span class="text-purple-200 text-[10px]">Tahun:</span>
                        <span class="apotek-btn-label font-bold text-white">Semua</span>
                        <i class="fas fa-chevron-down text-[9px] text-purple-200 ml-1 chevron-icon"></i>
                    </button>
                    <div class="apotek-dropdown-menu hidden">
                        <div class="apotek-dropdown-item active is-active" data-value="semua">Semua Periode</div>
                        <div class="apotek-dropdown-item" data-value="2026">Tahun 2026</div>
                        <div class="apotek-dropdown-item" data-value="2025">Tahun 2025</div>
                        <div class="apotek-dropdown-item" data-value="2024">Tahun 2024</div>
                    </div>
                </div>

                <button id="btnResetCompactApotekFilters" type="button" class="apotek-filter-reset hidden" title="Reset Semua Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    {{-- Section 1: Statistik & Kinerja Finansial --}}
    @include('pages.kesehatan-apotek.partials.statistik')

    {{-- Section 2: Katalog Produk Herbal & Transaksi Apotek --}}
    @include('pages.kesehatan-apotek.partials.daftar-transaksi')

</div>

{{-- Modal 1: Catat Transaksi / Layanan Baru --}}
<div id="modalTambahApotek" class="apotek-modal fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm hidden p-4">
    <div class="apotek-modal-dialog bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-purple-100 relative">
        <div class="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-[#722F99] text-white flex items-center justify-center">
                    <i class="fas fa-plus-circle text-lg"></i>
                </div>
                <div>
                    <h3 class="font-bold text-slate-800 text-lg">Catat Transaksi / Resep Baru</h3>
                    <p class="text-xs text-slate-500">Penjualan obat, produk herbal FMIPA, atau layanan cek kesehatan</p>
                </div>
            </div>
            <button type="button" class="apotek-modal-close text-slate-400 hover:text-slate-600 transition">
                <i class="fas fa-times text-lg"></i>
            </button>
        </div>

        <form id="formTambahApotek" class="space-y-4">
            <div>
                <label for="inputNamaKomoditas" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Nama Komoditas / Layanan *</label>
                <input type="text" id="inputNamaKomoditas" required placeholder="Contoh: Kapsul Ekstrak Meniran FMIPA / Cek Profil Lipid" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#722F99]/30 focus:border-[#722F99]">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="selectKategoriApotek" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Kategori Komoditas *</label>
                    <select id="selectKategoriApotek" required class="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-[#722F99]/30">
                        <option value="herbal">Herbal Fitofarmaka FMIPA</option>
                        <option value="obat">Obat Bebas & Resep (OTC)</option>
                        <option value="cek">Layanan Cek Kesehatan</option>
                        <option value="skincare">Skincare & Personal Care</option>
                    </select>
                </div>
                <div>
                    <label for="inputPembeliPasien" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Nama Pembeli / Pasien *</label>
                    <input type="text" id="inputPembeliPasien" required placeholder="Nama Sivitas / Pasien Umum" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#722F99]/30 focus:border-[#722F99]">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label for="inputQtyApotek" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Jumlah (Qty) *</label>
                    <input type="number" id="inputQtyApotek" required min="1" value="1" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#722F99]/30 focus:border-[#722F99]">
                </div>
                <div>
                    <label for="inputTotalBayar" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Total Bayar (Rp) *</label>
                    <input type="text" id="inputTotalBayar" required placeholder="75000" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#722F99]/30 focus:border-[#722F99]">
                </div>
                <div>
                    <label for="selectMetodeBayar" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Metode Bayar *</label>
                    <select id="selectMetodeBayar" required class="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-[#722F99]/30">
                        <option value="QRIS / Debit">QRIS / Debit</option>
                        <option value="Tunai / Cash">Tunai / Cash</option>
                        <option value="Transfer Bank">Transfer Bank</option>
                    </select>
                </div>
            </div>

            <div class="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button type="button" class="apotek-modal-close px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer">Batal</button>
                <button type="submit" class="px-5 py-2.5 rounded-xl bg-[#722F99] hover:bg-[#592279] text-white text-xs font-bold shadow-md transition cursor-pointer">Simpan & Cetak Struk</button>
            </div>
        </form>
    </div>
</div>

{{-- Modal 2: Detail Transaksi / Resep --}}
<div id="modalDetailApotek" class="apotek-modal fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm hidden p-4">
    <div class="apotek-modal-dialog bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-purple-100 relative">
        <div class="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-purple-100 text-[#722F99] flex items-center justify-center">
                    <i class="fas fa-receipt text-lg"></i>
                </div>
                <div>
                    <h3 class="font-bold text-slate-800 text-base" id="detailApotekTitle">Struk Transaksi Apotek</h3>
                    <p class="text-xs text-slate-500" id="detailApotekSub">Nota: APT-2026-001</p>
                </div>
            </div>
            <button type="button" class="apotek-modal-close text-slate-400 hover:text-slate-600 transition">
                <i class="fas fa-times text-lg"></i>
            </button>
        </div>

        <div class="space-y-3.5 text-xs text-slate-600" id="detailApotekBody">
            {{-- Dynamic details injected via JS --}}
        </div>

        <div class="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs text-slate-400">Apotek Pendidikan FMIPA UNPAK</span>
            <button type="button" class="apotek-modal-close px-4 py-2 rounded-xl bg-[#722F99] text-white text-xs font-semibold hover:bg-[#592279] transition cursor-pointer">Tutup</button>
        </div>
    </div>
</div>
@endsection
