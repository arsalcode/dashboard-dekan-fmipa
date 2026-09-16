@extends('layouts.app')

@section('title', 'Kerjasama & Kemitraan FMIPA')

@section('content')
<div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
    <!-- Executive Hero Banner (Kerjasama & Kemitraan Edition - Standar Dosen & Dashboard) -->
    <div id="executiveHeroBannerKerjasama" class="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#722F99] via-[#592279] to-[#3a1251] text-white p-6 sm:p-8 shadow-xl shadow-purple-950/20 border border-purple-800/40 mb-8 z-30">
        <!-- Ambient Decorative Glow Circles -->
        <div class="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none">
            <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div class="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-[#9333ea]/20 blur-3xl"></div>
        </div>

        <!-- Top Row: Executive Title & Academic Period Badge -->
        <div class="relative z-10 flex items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                    <i class="fa-solid fa-handshake text-2xl sm:text-3xl text-amber-300"></i>
                </div>
                <div>
                    <div class="flex items-center gap-2.5">
                        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Kerjasama &amp; Kemitraan Strategis</h1>
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-xs">IKU 6 &amp; MBKM</span>
                    </div>
                    <p class="text-purple-200 text-xs sm:text-sm mt-1 font-medium">FMIPA Universitas Pakuan &bull; Tata Kelola Nota Kesepahaman (MoU), Perjanjian Kerjasama (MoA), dan Implementasi (IA) Mitra Industri &amp; Institusi</p>
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
                <span class="kerjasama-filter-label px-1">
                    <i class="fa-solid fa-filter text-amber-300 text-xs"></i> Filter:
                </span>
                
                <!-- 1. Sektor Mitra Filter -->
                <div class="kerjasama-dropdown-wrap" data-filter="sektor" id="wrapFilterKerjasamaSektor">
                    <input type="hidden" id="filterKerjasamaSektor" value="semua">
                    <button type="button" class="kerjasama-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-building text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Sektor:</span>
                        <span class="kerjasama-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="kerjasama-dropdown-menu">
                        <div class="kerjasama-dropdown-item active is-active" data-value="semua">Semua Sektor</div>
                        <div class="kerjasama-dropdown-item" data-value="industri">Dunia Industri / BUMN</div>
                        <div class="kerjasama-dropdown-item" data-value="universitas">Perguruan Tinggi</div>
                        <div class="kerjasama-dropdown-item" data-value="pemerintah">Pemerintah &amp; Lembaga Riset</div>
                        <div class="kerjasama-dropdown-item" data-value="internasional">Institusi Luar Negeri</div>
                    </div>
                </div>

                <!-- 2. Jenis Dokumen Filter -->
                <div class="kerjasama-dropdown-wrap" data-filter="jenis" id="wrapFilterKerjasamaJenis">
                    <input type="hidden" id="filterKerjasamaJenis" value="semua">
                    <button type="button" class="kerjasama-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-file-contract text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Jenis:</span>
                        <span class="kerjasama-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="kerjasama-dropdown-menu">
                        <div class="kerjasama-dropdown-item active is-active" data-value="semua">Semua Dokumen</div>
                        <div class="kerjasama-dropdown-item" data-value="mou">MoU (Kesepahaman)</div>
                        <div class="kerjasama-dropdown-item" data-value="moa">MoA (Perjanjian Kerjasama)</div>
                        <div class="kerjasama-dropdown-item" data-value="ia">IA (Implementasi Kerja)</div>
                    </div>
                </div>

                <!-- 3. Status Kerjasama Filter -->
                <div class="kerjasama-dropdown-wrap" data-filter="status" id="wrapFilterKerjasamaStatus">
                    <input type="hidden" id="filterKerjasamaStatus" value="semua">
                    <button type="button" class="kerjasama-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-circle-check text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Status:</span>
                        <span class="kerjasama-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="kerjasama-dropdown-menu">
                        <div class="kerjasama-dropdown-item active is-active" data-value="semua">Semua Status</div>
                        <div class="kerjasama-dropdown-item" data-value="aktif">Aktif Berlaku</div>
                        <div class="kerjasama-dropdown-item" data-value="tenggang">Perlu Perpanjangan</div>
                        <div class="kerjasama-dropdown-item" data-value="berakhir">Selesai / Berakhir</div>
                    </div>
                </div>

                <!-- Reset Filter Button -->
                <button id="btnResetKerjasamaFilters" type="button" class="kerjasama-filter-reset hidden" title="Reset Semua Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    <!-- Sticky Compact Floating Header (Two-Tier Standar Dosen & Wadek 1) -->
    <div id="compactStickyBarKerjasama">
        <div class="w-full rounded-2xl bg-gradient-to-r from-[#722F99]/96 via-[#592279]/96 to-[#3a1251]/96 backdrop-blur-xl text-white py-2.5 sm:py-3 px-4 sm:px-6 shadow-2xl shadow-purple-950/40 border border-white/25 flex flex-col gap-2.5">
            <!-- Top Row: Mini Brand & Badge -->
            <div class="flex items-center justify-between gap-3 pb-2 border-b border-white/15">
                <div class="flex items-center gap-2.5 sm:gap-3 shrink-0">
                    <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                        <i class="fa-solid fa-handshake text-xs sm:text-sm text-amber-300"></i>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="font-extrabold text-white text-xs sm:text-sm md:text-base tracking-tight">Kerjasama &amp; Kemitraan FMIPA</span>
                        <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30">IKU 6</span>
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
                <span class="kerjasama-filter-label px-1 text-xs text-purple-200 font-semibold flex items-center gap-1.5 shrink-0">
                    <i class="fa-solid fa-filter text-amber-300 text-[11px]"></i> Filter:
                </span>

                <!-- Compact Sektor Filter -->
                <div class="kerjasama-dropdown-wrap" data-filter="sektor" id="wrapCompactFilterKerjasamaSektor">
                    <input type="hidden" id="compactFilterKerjasamaSektor" value="semua">
                    <button type="button" class="kerjasama-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-building text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Sektor:</span>
                        <span class="kerjasama-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="kerjasama-dropdown-menu">
                        <div class="kerjasama-dropdown-item active is-active" data-value="semua">Semua Sektor</div>
                        <div class="kerjasama-dropdown-item" data-value="industri">Dunia Industri / BUMN</div>
                        <div class="kerjasama-dropdown-item" data-value="universitas">Perguruan Tinggi</div>
                        <div class="kerjasama-dropdown-item" data-value="pemerintah">Pemerintah &amp; Lembaga Riset</div>
                        <div class="kerjasama-dropdown-item" data-value="internasional">Institusi Luar Negeri</div>
                    </div>
                </div>

                <!-- Compact Jenis Dokumen Filter -->
                <div class="kerjasama-dropdown-wrap" data-filter="jenis" id="wrapCompactFilterKerjasamaJenis">
                    <input type="hidden" id="compactFilterKerjasamaJenis" value="semua">
                    <button type="button" class="kerjasama-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-file-contract text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Jenis:</span>
                        <span class="kerjasama-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="kerjasama-dropdown-menu">
                        <div class="kerjasama-dropdown-item active is-active" data-value="semua">Semua Dokumen</div>
                        <div class="kerjasama-dropdown-item" data-value="mou">MoU (Kesepahaman)</div>
                        <div class="kerjasama-dropdown-item" data-value="moa">MoA (Perjanjian Kerjasama)</div>
                        <div class="kerjasama-dropdown-item" data-value="ia">IA (Implementasi Kerja)</div>
                    </div>
                </div>

                <!-- Compact Status Filter -->
                <div class="kerjasama-dropdown-wrap" data-filter="status" id="wrapCompactFilterKerjasamaStatus">
                    <input type="hidden" id="compactFilterKerjasamaStatus" value="semua">
                    <button type="button" class="kerjasama-pill-btn" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-circle-check text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Status:</span>
                        <span class="kerjasama-btn-label font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down chevron-icon"></i>
                    </button>
                    <div class="kerjasama-dropdown-menu">
                        <div class="kerjasama-dropdown-item active is-active" data-value="semua">Semua Status</div>
                        <div class="kerjasama-dropdown-item" data-value="aktif">Aktif Berlaku</div>
                        <div class="kerjasama-dropdown-item" data-value="tenggang">Perlu Perpanjangan</div>
                        <div class="kerjasama-dropdown-item" data-value="berakhir">Selesai / Berakhir</div>
                    </div>
                </div>

                <!-- Reset Filter Button (Compact) -->
                <button id="btnResetCompactKerjasamaFilters" type="button" class="kerjasama-filter-reset hidden" title="Reset Semua Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    <!-- Kerjasama Domain Sections Container (Struktur Modular Mengikuti Dosen) -->
    <div id="kerjasamaSections" class="space-y-8">
        <!-- 1. Statistik Kerjasama & Kinerja Kemitraan (Overview, Tren Pertumbuhan, Jenis Dokumen & Sektor) -->
        @include('pages.kerjasama.partials.statistik')

        <!-- 2. Katalog Dokumen Kerjasama & Mitra (Tabel Lengkap, 4 Action Buttons, Export, Live Search & Sektor Tabs) -->
        @include('pages.kerjasama.partials.daftar-kerjasama')
    </div>
</div>

<!-- ============================================
     MODALS
     ============================================ -->

<!-- 1. Modal Tambah Kerjasama Baru -->
<div id="modalTambahKerjasama" class="kerjasama-modal">
    <div class="kerjasama-modal-dialog">
        <div class="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#722F99] via-[#592279] to-[#3a1251] text-white rounded-t-[1.25rem]">
            <div class="flex items-center gap-2.5">
                <i class="fa-solid fa-handshake text-amber-300 text-lg"></i>
                <h3 class="font-bold text-base sm:text-lg">Tambah Dokumen Kerjasama Baru</h3>
            </div>
            <button type="button" class="kerjasama-modal-close text-white/70 hover:text-white transition w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
        <form id="formTambahKerjasama" class="p-5 sm:p-6 space-y-4">
            <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Nama Mitra / Instansi Kerjasama</label>
                <input type="text" id="inputNamaMitra" required placeholder="Contoh: PT Bio Farma (Persero), BRIN, Universiti Malaya..." class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Jenis Dokumen</label>
                    <select id="selectJenisDokumen" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        <option value="MoU">MoU (Kesepahaman Bersama)</option>
                        <option value="MoA">MoA (Perjanjian Kerjasama)</option>
                        <option value="IA">IA (Implementation Arrangement)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Sektor Mitra</label>
                    <select id="selectSektorMitra" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        <option value="Dunia Industri / BUMN">Dunia Industri / BUMN</option>
                        <option value="Perguruan Tinggi">Perguruan Tinggi</option>
                        <option value="Pemerintah & Riset">Pemerintah &amp; Riset</option>
                        <option value="Internasional">Institusi Luar Negeri</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Tingkat Wilayah</label>
                    <select id="selectTingkatWilayah" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        <option value="Nasional">Nasional</option>
                        <option value="Internasional">Internasional</option>
                        <option value="Regional">Regional / Lokal</option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Nomor Registrasi Dokumen</label>
                    <input type="text" id="inputNoDokumen" required placeholder="Contoh: 042/MoU/FMIPA-UNPAK/2026" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Prodi / Unit PIC Penanggung Jawab</label>
                    <select id="selectProdiPic" class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                        <option value="Fakultas (Dekanat)">Fakultas (Dekanat FMIPA)</option>
                        <option value="Ilmu Komputer">Prodi Ilmu Komputer</option>
                        <option value="Farmasi">Prodi Farmasi</option>
                        <option value="Biologi">Prodi Biologi</option>
                        <option value="Kimia">Prodi Kimia</option>
                        <option value="Matematika">Prodi Matematika</option>
                    </select>
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Ruang Lingkup Kerjasama</label>
                <input type="text" id="inputRuangLingkup" required placeholder="Contoh: Magang Industri MBKM, Joint Research, dan Dosen Praktisi..." class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Tanggal Mulai Berlaku</label>
                    <input type="date" id="inputTglMulai" required class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Tanggal Berakhir</label>
                    <input type="date" id="inputTglSelesai" required class="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#722F99]/40">
                </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" class="kerjasama-modal-close px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer">
                    Batal
                </button>
                <button type="submit" class="px-5 py-2 rounded-xl bg-gradient-to-r from-[#722F99] to-[#592279] text-white text-sm font-bold shadow-md shadow-purple-900/20 hover:opacity-95 cursor-pointer">
                    Simpan Kerjasama
                </button>
            </div>
        </form>
    </div>
</div>

<!-- 2. Modal Detail Dokumen Kerjasama -->
<div id="modalDetailKerjasama" class="kerjasama-modal">
    <div class="kerjasama-modal-dialog">
        <div class="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#722F99] via-[#592279] to-[#3a1251] text-white rounded-t-[1.25rem]">
            <div class="flex items-center gap-2.5">
                <i class="fa-solid fa-file-contract text-amber-300 text-lg"></i>
                <div>
                    <h3 class="font-bold text-base sm:text-lg">Rincian Dokumen Kerjasama</h3>
                    <span class="text-xs text-purple-200 font-mono" id="detailKerjasamaNoDok">-</span>
                </div>
            </div>
            <button type="button" class="kerjasama-modal-close text-white/70 hover:text-white transition w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
        <div class="p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
            <div>
                <span class="text-slate-400 block text-xs mb-0.5">Instansi / Mitra Kerjasama:</span>
                <p class="font-bold text-slate-900 text-base leading-snug" id="detailKerjasamaMitra">-</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-3 border-b border-slate-100">
                <div>
                    <span class="text-slate-400 block text-xs">Jenis Dokumen:</span>
                    <span class="font-bold text-purple-900" id="detailKerjasamaJenis">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Tingkat:</span>
                    <span class="font-bold text-slate-800" id="detailKerjasamaTingkat">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Sektor:</span>
                    <span class="font-bold text-indigo-700" id="detailKerjasamaSektor">-</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs">Status Legalitas:</span>
                    <span class="font-bold text-emerald-700" id="detailKerjasamaStatus">-</span>
                </div>
            </div>

            <div>
                <span class="text-slate-400 block text-xs mb-1">Ruang Lingkup Kerjasama:</span>
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 leading-relaxed" id="detailKerjasamaLingkup">
                    -
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <span class="text-slate-400 block text-xs mb-0.5">Masa Berlaku Dokumen:</span>
                    <p class="font-semibold text-slate-800" id="detailKerjasamaPeriode">-</p>
                </div>
                <div>
                    <span class="text-slate-400 block text-xs mb-0.5">Prodi / Unit PIC:</span>
                    <p class="font-semibold text-purple-900" id="detailKerjasamaPic">-</p>
                </div>
            </div>

            <div class="p-4 rounded-xl bg-purple-50/60 border border-purple-100 space-y-1.5">
                <span class="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                    <i class="fa-solid fa-list-check text-amber-500"></i> Realisasi Kegiatan Implementasi (IA)
                </span>
                <p class="text-xs text-slate-700 leading-relaxed" id="detailKerjasamaIa">
                    Telah terlaksana 3 kegiatan implementasi: Program Magang Bersertifikat 12 Mahasiswa, Kuliah Tamu Praktisi Industri (2 SKS), dan Hibah Konsorsium Riset Terapan.
                </p>
            </div>

            <div class="pt-2 flex items-center justify-end">
                <button type="button" class="kerjasama-modal-close px-5 py-2 rounded-xl bg-[#722F99] text-white text-sm font-bold shadow-md hover:bg-[#592279] cursor-pointer">
                    Tutup
                </button>
            </div>
        </div>
    </div>
</div>
@endsection
