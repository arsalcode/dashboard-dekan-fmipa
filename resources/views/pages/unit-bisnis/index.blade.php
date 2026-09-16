@extends('layouts.app')

@section('title', 'Overview Unit Bisnis & Revenue FMIPA')

@section('content')
<div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
    <!-- Executive Hero Banner (Unit Bisnis Edition - Standar Dosen & Dashboard) -->
    <div id="executiveHeroBannerBisnis" class="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#722F99] via-[#592279] to-[#3a1251] text-white p-6 sm:p-8 shadow-xl shadow-purple-950/20 border border-purple-800/40 mb-8 z-30">
        <!-- Ambient Decorative Glow Circles -->
        <div class="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none">
            <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div class="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-[#9333ea]/20 blur-3xl"></div>
        </div>

        <!-- Top Row: Executive Title & Academic Period Badge -->
        <div class="relative z-10 flex items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                    <i class="fa-solid fa-building text-2xl sm:text-3xl text-amber-300"></i>
                </div>
                <div>
                    <div class="flex items-center gap-2.5">
                        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Overview Unit Bisnis &amp; Revenue</h1>
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-xs">RGU &amp; Komersial</span>
                    </div>
                    <p class="text-purple-200 text-xs sm:text-sm mt-1 font-medium">FMIPA Universitas Pakuan &bull; Kinerja Finansial, Layanan Uji Lab ISO 17025, Software House, Training Center &amp; Produk Inovasi Komersial</p>
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
                <span class="unit-bisnis-filter-label px-1">
                    <i class="fa-solid fa-filter text-amber-300 text-xs"></i> Filter:
                </span>
                
                <!-- 1. Unit Bisnis Filter -->
                <div class="unit-bisnis-dropdown-wrap" data-filter="unit" id="wrapFilterBisnisUnit">
                    <input type="hidden" id="filterBisnisUnit" value="semua">
                    <button type="button" class="unit-bisnis-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-briefcase text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Unit:</span>
                        <span class="unit-bisnis-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="unit-bisnis-dropdown-menu">
                        <div class="unit-bisnis-dropdown-item active is-active" data-value="semua">Semua Unit Bisnis</div>
                        <div class="unit-bisnis-dropdown-item" data-value="lab">Lab Pengujian Terpadu</div>
                        <div class="unit-bisnis-dropdown-item" data-value="it">IT &amp; Software House</div>
                        <div class="unit-bisnis-dropdown-item" data-value="training">Training Center &amp; Sertifikasi</div>
                        <div class="unit-bisnis-dropdown-item" data-value="herbal">Produksi Herbal &amp; Biotek</div>
                    </div>
                </div>

                <!-- 2. Status Invoice Filter -->
                <div class="unit-bisnis-dropdown-wrap" data-filter="status" id="wrapFilterBisnisStatus">
                    <input type="hidden" id="filterBisnisStatus" value="semua">
                    <button type="button" class="unit-bisnis-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-circle-check text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Status:</span>
                        <span class="unit-bisnis-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="unit-bisnis-dropdown-menu">
                        <div class="unit-bisnis-dropdown-item active is-active" data-value="semua">Semua Status</div>
                        <div class="unit-bisnis-dropdown-item" data-value="lunas">Lunas Selesai</div>
                        <div class="unit-bisnis-dropdown-item" data-value="termin">Termin Berjalan</div>
                        <div class="unit-bisnis-dropdown-item" data-value="piutang">Piutang / Invoice Baru</div>
                    </div>
                </div>

                <!-- 3. Periode Waktu Filter -->
                <div class="unit-bisnis-dropdown-wrap" data-filter="periode" id="wrapFilterBisnisPeriode">
                    <input type="hidden" id="filterBisnisPeriode" value="semua">
                    <button type="button" class="unit-bisnis-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-calendar-days text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Periode:</span>
                        <span class="unit-bisnis-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="unit-bisnis-dropdown-menu">
                        <div class="unit-bisnis-dropdown-item active is-active" data-value="semua">Semua Periode</div>
                        <div class="unit-bisnis-dropdown-item" data-value="2026">Tahun 2026 (Terkini)</div>
                        <div class="unit-bisnis-dropdown-item" data-value="2025">Tahun 2025</div>
                        <div class="unit-bisnis-dropdown-item" data-value="2024">Tahun 2024</div>
                    </div>
                </div>

                <!-- Reset Filter Button -->
                <button id="btnResetBisnisFilters" type="button" class="unit-bisnis-filter-reset hidden" title="Reset Semua Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    <!-- Sticky Compact Floating Header (Two-Tier Standar Dosen & Wadek 1) -->
    <div id="compactStickyBarUnitBisnis">
        <div class="w-full rounded-2xl bg-gradient-to-r from-[#722F99]/96 via-[#592279]/96 to-[#3a1251]/96 backdrop-blur-xl text-white py-2.5 sm:py-3 px-4 sm:px-6 shadow-2xl shadow-purple-950/40 border border-white/25 flex flex-col gap-2.5">
            <!-- Top Row: Mini Brand & Badge -->
            <div class="flex items-center justify-between gap-3 pb-2 border-b border-white/15">
                <div class="flex items-center gap-2.5 sm:gap-3 shrink-0">
                    <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                        <i class="fa-solid fa-building text-xs sm:text-sm text-amber-300"></i>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="font-extrabold text-white text-xs sm:text-sm md:text-base tracking-tight">Overview Unit Bisnis FMIPA</span>
                        <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30">Revenue</span>
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
                <span class="unit-bisnis-filter-label px-1 text-xs text-purple-200 font-semibold flex items-center gap-1.5 shrink-0">
                    <i class="fa-solid fa-filter text-amber-300 text-[11px]"></i> Filter:
                </span>

                <!-- Compact Unit Filter -->
                <div class="unit-bisnis-dropdown-wrap" data-filter="unit" id="wrapCompactFilterBisnisUnit">
                    <input type="hidden" id="compactFilterBisnisUnit" value="semua">
                    <button type="button" class="unit-bisnis-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-briefcase text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Unit:</span>
                        <span class="unit-bisnis-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="unit-bisnis-dropdown-menu">
                        <div class="unit-bisnis-dropdown-item active is-active" data-value="semua">Semua Unit Bisnis</div>
                        <div class="unit-bisnis-dropdown-item" data-value="lab">Lab Pengujian Terpadu</div>
                        <div class="unit-bisnis-dropdown-item" data-value="it">IT &amp; Software House</div>
                        <div class="unit-bisnis-dropdown-item" data-value="training">Training Center &amp; Sertifikasi</div>
                        <div class="unit-bisnis-dropdown-item" data-value="herbal">Produksi Herbal &amp; Biotek</div>
                    </div>
                </div>

                <!-- Compact Status Filter -->
                <div class="unit-bisnis-dropdown-wrap" data-filter="status" id="wrapCompactFilterBisnisStatus">
                    <input type="hidden" id="compactFilterBisnisStatus" value="semua">
                    <button type="button" class="unit-bisnis-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-circle-check text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Status:</span>
                        <span class="unit-bisnis-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="unit-bisnis-dropdown-menu">
                        <div class="unit-bisnis-dropdown-item active is-active" data-value="semua">Semua Status</div>
                        <div class="unit-bisnis-dropdown-item" data-value="lunas">Lunas Selesai</div>
                        <div class="unit-bisnis-dropdown-item" data-value="termin">Termin Berjalan</div>
                        <div class="unit-bisnis-dropdown-item" data-value="piutang">Piutang / Invoice Baru</div>
                    </div>
                </div>

                <!-- Compact Periode Filter -->
                <div class="unit-bisnis-dropdown-wrap" data-filter="periode" id="wrapCompactFilterBisnisPeriode">
                    <input type="hidden" id="compactFilterBisnisPeriode" value="semua">
                    <button type="button" class="unit-bisnis-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-calendar-days text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Periode:</span>
                        <span class="unit-bisnis-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="unit-bisnis-dropdown-menu">
                        <div class="unit-bisnis-dropdown-item active is-active" data-value="semua">Semua Periode</div>
                        <div class="unit-bisnis-dropdown-item" data-value="2026">Tahun 2026 (Terkini)</div>
                        <div class="unit-bisnis-dropdown-item" data-value="2025">Tahun 2025</div>
                        <div class="unit-bisnis-dropdown-item" data-value="2024">Tahun 2024</div>
                    </div>
                </div>

                <!-- Reset Filter Button (Compact) -->
                <button id="btnResetCompactBisnisFilters" type="button" class="unit-bisnis-filter-reset hidden" title="Reset Semua Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    <!-- Unit Bisnis Domain Sections Container (Struktur Modular Mengikuti Dosen) -->
    <div id="unitBisnisSections" class="space-y-8">
        <!-- 1. Statistik & Finansial Unit Bisnis (Overview, Tren Omzet, Portofolio & Sektor Klien) -->
        @include('pages.unit-bisnis.partials.statistik')

        <!-- 2. Katalog Layanan & Kontrak Transaksi Bisnis (Tabel Lengkap, 4 Action Buttons, Export, Live Search & Tabs) -->
        @include('pages.unit-bisnis.partials.daftar-layanan')
    </div>
</div>

<!-- ============================================
     MODALS
     ============================================ -->

<!-- 1. Modal Buat Order / Invoice Baru -->
<div id="modalTambahBisnis" class="unit-bisnis-modal">
    <div class="unit-bisnis-modal-dialog">
        <div class="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#722F99] via-[#592279] to-[#3a1251] text-white rounded-t-[1.25rem]">
            <div class="flex items-center gap-2.5">
                <i class="fa-solid fa-file-circle-plus text-amber-300 text-lg"></i>
                <h3 class="font-bold text-base sm:text-lg">Buat Order / Invoice Kontrak Baru</h3>
            </div>
            <button type="button" class="unit-bisnis-modal-close text-white/70 hover:text-white transition w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
        <form id="formTambahBisnis" class="p-5 sm:p-6 space-y-4">
            <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Nama Mitra / Klien Pemesan</label>
                <input type="text" id="inputNamaKlien" required placeholder="Contoh: PT Kalbe Farma Tbk, Dinas Lingkungan Hidup..." class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Unit Bisnis Pelaksana</label>
                    <select id="selectUnitPelaksana" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        <option value="Lab Pengujian Terpadu">Lab Pengujian Terpadu (ISO 17025)</option>
                        <option value="IT & Software House">IT &amp; Software House</option>
                        <option value="Training Center & Sertifikasi">Training Center &amp; Sertifikasi</option>
                        <option value="Produksi Herbal & Biotek">Produksi Herbal &amp; Biotek</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Kategori Layanan</label>
                    <select id="selectKategoriLayanan" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        <option value="Uji Sampel Lab">Uji Sampel Lab &amp; Kalibrasi</option>
                        <option value="Pengembangan Sistem IT">Pengembangan Sistem IT &amp; Konsultasi</option>
                        <option value="Pelatihan Kompetensi">Pelatihan &amp; Workshop Kompetensi</option>
                        <option value="Penjualan Produk Riset">Penjualan Produk Inovasi Komersial</option>
                    </select>
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Nama Layanan / Proyek Kontrak</label>
                <input type="text" id="inputNamaLayanan" required placeholder="Contoh: Jasa Uji Kromatografi Gas & Spektrometri Massa (GC-MS)..." class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Nilai Kontrak Transaksi (Rp)</label>
                    <input type="number" id="inputNilaiKontrak" required placeholder="Contoh: 35000000" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Estimasi Margin Profit (%)</label>
                    <input type="number" id="inputMarginProfit" required placeholder="Contoh: 35" min="1" max="100" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Nomor Invoice / SPK</label>
                    <input type="text" id="inputNoInvoice" required placeholder="Contoh: INV-UB-2026-088" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Status Pembayaran</label>
                    <select id="selectStatusBayar" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        <option value="Lunas">Lunas Selesai</option>
                        <option value="Termin">Termin Berjalan</option>
                        <option value="Piutang">Invoice Baru / Piutang</option>
                    </select>
                </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" class="unit-bisnis-modal-close px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer">
                    Batal
                </button>
                <button type="submit" class="px-5 py-2 rounded-xl bg-gradient-to-r from-[#722F99] to-[#592279] text-white text-sm font-bold shadow-md shadow-purple-900/20 hover:opacity-95 cursor-pointer">
                    Simpan Order
                </button>
            </div>
        </form>
    </div>
</div>

<!-- 2. Modal Detail Kontrak Bisnis -->
<div id="modalDetailBisnis" class="unit-bisnis-modal">
    <div class="unit-bisnis-modal-dialog">
        <div class="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#722F99] via-[#592279] to-[#3a1251] text-white rounded-t-[1.25rem]">
            <div class="flex items-center gap-2.5">
                <i class="fa-solid fa-file-invoice text-amber-300 text-lg"></i>
                <div>
                    <h3 class="font-bold text-base sm:text-lg">Rincian Kontrak Transaksi Unit Bisnis</h3>
                    <span class="text-xs text-purple-200 font-mono" id="detailBisnisNoInvoice">-</span>
                </div>
            </div>
            <button type="button" class="unit-bisnis-modal-close text-white/70 hover:text-white transition w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
        <div class="p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
            <div>
                <span class="text-slate-400 block text-xs mb-0.5">Mitra / Klien Pemesan:</span>
                <p class="font-bold text-slate-900 text-base leading-snug" id="detailBisnisKlien">-</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-3 border-b border-slate-100">
                <div>
                    <span class="text-slate-400 block text-xs">Unit Pelaksana:</span>
                    <span class="font-bold text-purple-900" id="detailBisnisUnit">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Nilai Kontrak:</span>
                    <span class="font-bold text-emerald-700" id="detailBisnisNilai">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Profit Bersih:</span>
                    <span class="font-bold text-indigo-700" id="detailBisnisProfit">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Status Bayar:</span>
                    <span class="font-bold text-amber-700" id="detailBisnisStatus">-</span>
                </div>
            </div>

            <div>
                <span class="text-slate-400 block text-xs mb-1">Paket Layanan / Deliverables Proyek:</span>
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 leading-relaxed" id="detailBisnisLayanan">
                    -
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <span class="text-slate-400 block text-xs mb-0.5">Tanggal Kontrak:</span>
                    <p class="font-semibold text-slate-800" id="detailBisnisTanggal">-</p>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs mb-0.5">Penanggung Jawab / PIC Teknis:</span>
                    <p class="font-semibold text-purple-900" id="detailBisnisPic">-</p>
                </div>
            </div>

            <div class="p-4 rounded-xl bg-purple-50/60 border border-purple-100 space-y-1.5">
                <span class="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                    <i class="fa-solid fa-coins text-amber-500"></i> Kontribusi Kas Fakultas &amp; SLA Layanan
                </span>
                <p class="text-xs text-slate-700 leading-relaxed" id="detailBisnisSla">
                    Dana kontribusi bersih telah dialokasikan ke Kas Revenue Non-UKT FMIPA guna pemeliharaan alat laboratorium dan insentif pengelola. SLA pengerjaan tuntas 100% tepat waktu sesuai standar ISO 9001.
                </p>
            </div>

            <div class="pt-2 flex items-center justify-end">
                <button type="button" class="unit-bisnis-modal-close px-5 py-2 rounded-xl bg-[#722F99] text-white text-sm font-bold shadow-md hover:bg-[#592279] cursor-pointer">
                    Tutup
                </button>
            </div>
        </div>
    </div>
</div>
@endsection
