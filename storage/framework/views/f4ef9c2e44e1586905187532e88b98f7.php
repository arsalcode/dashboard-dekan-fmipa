<?php $__env->startSection('title', 'Pusat Upload & Kelola Data'); ?>

<?php $__env->startSection('content'); ?>
<div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
    <!-- Executive Hero Banner (Matching Dosen & Dashboard Standard) -->
    <div id="executiveHeroBannerKelolaData" class="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#722F99] via-[#592279] to-[#3a1251] text-white p-6 sm:p-8 shadow-xl shadow-purple-950/20 border border-purple-800/40 mb-10 z-30">
        <!-- Ambient Decorative Glow Circles -->
        <div class="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none">
            <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div class="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-[#9333ea]/20 blur-3xl"></div>
        </div>

        <!-- Top Row: Executive Title & Subtitle -->
        <div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-white/15">
            <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                    <i class="fa-solid fa-cloud-arrow-up text-2xl sm:text-3xl text-amber-300"></i>
                </div>
                <div>
                    <div class="flex items-center gap-2.5 flex-wrap">
                        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Pusat Upload &amp; Kelola Data</h1>
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-xs">Executive Data Hub</span>
                    </div>
                    <p class="text-purple-200 text-xs sm:text-sm mt-1 font-medium">FMIPA Universitas Pakuan &bull; Download Template Resmi, Import Excel Massal &amp; Entri Data Manual</p>
                </div>
            </div>

            <!-- 3 Pill Badges -->
            <div class="flex items-center gap-2.5 flex-wrap shrink-0">
                <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold border border-white/25 shadow-xs">
                    <i class="fa-solid fa-cubes text-amber-300 text-xs"></i>
                    <span>12 Modul Aktif</span>
                </span>
                <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold border border-white/25 shadow-xs">
                    <i class="fa-solid fa-file-excel text-amber-300 text-xs"></i>
                    <span>XLSX / CSV Ready</span>
                </span>
            </div>
        </div>

        <!-- Bottom Row: Overview Summary Cards -->
        <div class="relative z-10 pt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white">
                <div class="flex items-center justify-between">
                    <span class="text-xs text-purple-200 font-medium">Kluster Akademik &amp; Sivitas</span>
                    <i class="fa-solid fa-graduation-cap text-amber-300 text-sm"></i>
                </div>
                <div class="text-xl sm:text-2xl font-black mt-1 text-white">7 Modul</div>
                <p class="text-[11px] text-purple-200/80 mt-0.5">Dosen, Mhs, Kurikulum, Riset, Kerjasama, dll</p>
            </div>

            <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white">
                <div class="flex items-center justify-between">
                    <span class="text-xs text-purple-200 font-medium">Kluster Unit Bisnis (RGU)</span>
                    <i class="fa-solid fa-briefcase text-amber-300 text-sm"></i>
                </div>
                <div class="text-xl sm:text-2xl font-black mt-1 text-white">5 Modul</div>
                <p class="text-[11px] text-purple-200/80 mt-0.5">Unit Bisnis, ComSTraC, Apotek, Lab GIS, Lab Service</p>
            </div>

            <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white">
                <div class="flex items-center justify-between">
                    <span class="text-xs text-purple-200 font-medium">Validasi &amp; Sinkronisasi</span>
                    <i class="fa-solid fa-bolt-lightning text-amber-300 text-sm"></i>
                </div>
                <div class="text-xl sm:text-2xl font-black mt-1 text-white">Instant Preview</div>
                <p class="text-[11px] text-purple-200/80 mt-0.5">Pratinjau 5 baris &amp; update reaktif seketika</p>
            </div>
        </div>
    </div>

    <!-- Section 1: Katalog Berkas & Input Modul FMIPA (Standard FMIPA Section Card) -->
    <?php if (isset($component)) { $__componentOriginal85d20c52a0bc8aa2dac04a1a4f1013d4 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal85d20c52a0bc8aa2dac04a1a4f1013d4 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.section-card','data' => ['title' => 'Katalog Berkas &amp; Input Modul FMIPA','icon' => 'fa-solid fa-cloud-arrow-up','sectionClass' => 'section-kelola-data']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.section-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Katalog Berkas &amp; Input Modul FMIPA','icon' => 'fa-solid fa-cloud-arrow-up','sectionClass' => 'section-kelola-data']); ?>
        
        <!-- Toolbar: Frosted Glass Filter Tabs & Search Box -->
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full pb-2 border-b border-white/15">
            <!-- Filter Tabs Track (Matching Dosen & Dashboard Theme) -->
            <div class="p-2 sm:p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-full overflow-x-auto no-scrollbar shadow-inner shadow-white/5 flex items-center gap-2" id="hubFilterTabs">
                <button type="button" class="btn-data-prodi-tab active" data-filter="semua">
                    <i class="fa-solid fa-border-all text-xs mr-1"></i> Semua Modul (12)
                </button>
                <button type="button" class="btn-data-prodi-tab" data-filter="akademik">
                    <i class="fa-solid fa-graduation-cap text-xs mr-1 text-amber-300"></i> Tri Dharma &amp; Sivitas (7)
                </button>
                <button type="button" class="btn-data-prodi-tab" data-filter="bisnis">
                    <i class="fa-solid fa-briefcase text-xs mr-1 text-amber-300"></i> Unit Bisnis &amp; Lab (5)
                </button>
            </div>

            <!-- Search Box in Frosted Glass -->
            <div class="relative min-w-[280px] flex-1 max-w-md">
                <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-200 text-xs"></i>
                <input 
                    type="text" 
                    id="searchHubInput" 
                    placeholder="Cari modul data atau topik..." 
                    class="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/25 focus:border-purple-300 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder:text-purple-200/70 outline-none transition shadow-inner" 
                />
            </div>
        </div>

        <!-- 12 Module Cards Grid (White Card Containers inside Purple Section) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full" id="hubModulesGrid">
            
            <!-- 1. Data Dosen -->
            <div class="module-card bg-white rounded-2xl shadow-sm hover:shadow-xl border border-purple-100/70 p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1" data-category="akademik" data-keywords="dosen nidn guru besar lektor asisten ahli strata s2 s3">
                <div>
                    <div class="flex items-start justify-between gap-3 mb-2.5">
                        <div class="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 text-[#722F99] flex items-center justify-center text-lg shadow-inner">
                            <i class="fa-solid fa-chalkboard-user"></i>
                        </div>
                        <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-purple-50 text-[#722F99] border border-purple-200">
                            Tri Dharma
                        </span>
                    </div>
                    <h3 class="text-base font-bold text-slate-900 tracking-tight">Data Operasional Dosen</h3>
                    <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                        Manajemen berkas dosen, NIDN, jabatan fungsional akademik, sertifikasi pendidik, dan sebaran prodi.
                    </p>
                    <div class="flex items-center gap-2 mt-3 text-[11px] text-slate-400">
                        <span class="font-semibold text-slate-700"><i class="fa-solid fa-table-columns mr-1 text-[#722F99]"></i> 10 Kolom</span>
                        <span>&bull;</span>
                        <span>Auto Validasi NIDN</span>
                    </div>
                </div>

                <div class="mt-5 pt-3.5 border-t border-purple-100/60 space-y-2">
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" data-action="import-excel" data-module="dosen" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#722F99] hover:bg-[#592279] text-white font-bold text-xs shadow-md shadow-purple-950/20 transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-cloud-arrow-up text-amber-300"></i>
                            <span>Import File</span>
                        </button>
                        <button type="button" data-action="download-template" data-module="dosen" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#722F99] border border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-file-arrow-down text-[#722F99]"></i>
                            <span>Template</span>
                        </button>
                    </div>
                    <div class="flex items-center gap-2">
                        <button type="button" data-action="tambah-manual" data-module="dosen" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-purple-50 text-slate-700 hover:text-[#722F99] border border-slate-200 hover:border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-circle-plus text-[#722F99]"></i>
                            <span>Tambah Manual</span>
                        </button>
                        <a href="<?php echo e(url('/dosen')); ?>" class="w-9 h-9 rounded-xl border border-slate-200 hover:border-purple-200 hover:bg-purple-50 flex items-center justify-center text-slate-500 hover:text-[#722F99] transition cursor-pointer" title="Buka Halaman Dosen">
                            <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- 2. Data Mahasiswa -->
            <div class="module-card bg-white rounded-2xl shadow-sm hover:shadow-xl border border-purple-100/70 p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1" data-category="akademik" data-keywords="mahasiswa npm ipk angkatan status kelulusan sks jalur masuk">
                <div>
                    <div class="flex items-start justify-between gap-3 mb-2.5">
                        <div class="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 text-[#722F99] flex items-center justify-center text-lg shadow-inner">
                            <i class="fa-solid fa-user-graduate"></i>
                        </div>
                        <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-purple-50 text-[#722F99] border border-purple-200">
                            Tri Dharma
                        </span>
                    </div>
                    <h3 class="text-base font-bold text-slate-900 tracking-tight">Data Operasional Mahasiswa</h3>
                    <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                        Data induk mahasiswa, NPM, perolehan IPK kumulatif, total SKS, status aktif/lulus, dan jalur penerimaan.
                    </p>
                    <div class="flex items-center gap-2 mt-3 text-[11px] text-slate-400">
                        <span class="font-semibold text-slate-700"><i class="fa-solid fa-table-columns mr-1 text-[#722F99]"></i> 8 Kolom</span>
                        <span>&bull;</span>
                        <span>Auto Hitung IPK</span>
                    </div>
                </div>

                <div class="mt-5 pt-3.5 border-t border-purple-100/60 space-y-2">
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" data-action="import-excel" data-module="mahasiswa" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#722F99] hover:bg-[#592279] text-white font-bold text-xs shadow-md shadow-purple-950/20 transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-cloud-arrow-up text-amber-300"></i>
                            <span>Import File</span>
                        </button>
                        <button type="button" data-action="download-template" data-module="mahasiswa" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#722F99] border border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-file-arrow-down text-[#722F99]"></i>
                            <span>Template</span>
                        </button>
                    </div>
                    <div class="flex items-center gap-2">
                        <button type="button" data-action="tambah-manual" data-module="mahasiswa" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-purple-50 text-slate-700 hover:text-[#722F99] border border-slate-200 hover:border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-circle-plus text-[#722F99]"></i>
                            <span>Tambah Manual</span>
                        </button>
                        <a href="<?php echo e(url('/mahasiswa')); ?>" class="w-9 h-9 rounded-xl border border-slate-200 hover:border-purple-200 hover:bg-purple-50 flex items-center justify-center text-slate-500 hover:text-[#722F99] transition cursor-pointer" title="Buka Halaman Mahasiswa">
                            <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- 3. Kurikulum & Mata Kuliah -->
            <div class="module-card bg-white rounded-2xl shadow-sm hover:shadow-xl border border-purple-100/70 p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1" data-category="akademik" data-keywords="kurikulum mata kuliah sks semester wajib pilihan obee rps">
                <div>
                    <div class="flex items-start justify-between gap-3 mb-2.5">
                        <div class="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 text-[#722F99] flex items-center justify-center text-lg shadow-inner">
                            <i class="fa-solid fa-book-bookmark"></i>
                        </div>
                        <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-purple-50 text-[#722F99] border border-purple-200">
                            Akademik
                        </span>
                    </div>
                    <h3 class="text-base font-bold text-slate-900 tracking-tight">Kurikulum &amp; Mata Kuliah</h3>
                    <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                        Katalog mata kuliah, kode MK, bobot SKS, sebaran semester, koordinator pengampu, dan sifat mata kuliah.
                    </p>
                    <div class="flex items-center gap-2 mt-3 text-[11px] text-slate-400">
                        <span class="font-semibold text-slate-700"><i class="fa-solid fa-table-columns mr-1 text-[#722F99]"></i> 7 Kolom</span>
                        <span>&bull;</span>
                        <span>Struktur OBE FMIPA</span>
                    </div>
                </div>

                <div class="mt-5 pt-3.5 border-t border-purple-100/60 space-y-2">
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" data-action="import-excel" data-module="kurikulum" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#722F99] hover:bg-[#592279] text-white font-bold text-xs shadow-md shadow-purple-950/20 transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-cloud-arrow-up text-amber-300"></i>
                            <span>Import File</span>
                        </button>
                        <button type="button" data-action="download-template" data-module="kurikulum" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#722F99] border border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-file-arrow-down text-[#722F99]"></i>
                            <span>Template</span>
                        </button>
                    </div>
                    <div class="flex items-center gap-2">
                        <button type="button" data-action="tambah-manual" data-module="kurikulum" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-purple-50 text-slate-700 hover:text-[#722F99] border border-slate-200 hover:border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-circle-plus text-[#722F99]"></i>
                            <span>Tambah Manual</span>
                        </button>
                        <a href="<?php echo e(url('/kurikulum')); ?>" class="w-9 h-9 rounded-xl border border-slate-200 hover:border-purple-200 hover:bg-purple-50 flex items-center justify-center text-slate-500 hover:text-[#722F99] transition cursor-pointer" title="Buka Halaman Kurikulum">
                            <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- 4. Riset & Penelitian -->
            <div class="module-card bg-white rounded-2xl shadow-sm hover:shadow-xl border border-purple-100/70 p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1" data-category="akademik" data-keywords="penelitian riset jurnal scopus sinta hibah bima kemendikbud dana">
                <div>
                    <div class="flex items-start justify-between gap-3 mb-2.5">
                        <div class="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 text-[#722F99] flex items-center justify-center text-lg shadow-inner">
                            <i class="fa-solid fa-flask-vial"></i>
                        </div>
                        <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-purple-50 text-[#722F99] border border-purple-200">
                            Tri Dharma
                        </span>
                    </div>
                    <h3 class="text-base font-bold text-slate-900 tracking-tight">Riset &amp; Penelitian FMIPA</h3>
                    <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                        Usulan penelitian, ketua tim riset, skema hibah internal/nasional, nominal pendanaan, dan luaran Scopus/SINTA.
                    </p>
                    <div class="flex items-center gap-2 mt-3 text-[11px] text-slate-400">
                        <span class="font-semibold text-slate-700"><i class="fa-solid fa-table-columns mr-1 text-[#722F99]"></i> 8 Kolom</span>
                        <span>&bull;</span>
                        <span>IKU 5 Riset</span>
                    </div>
                </div>

                <div class="mt-5 pt-3.5 border-t border-purple-100/60 space-y-2">
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" data-action="import-excel" data-module="penelitian" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#722F99] hover:bg-[#592279] text-white font-bold text-xs shadow-md shadow-purple-950/20 transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-cloud-arrow-up text-amber-300"></i>
                            <span>Import File</span>
                        </button>
                        <button type="button" data-action="download-template" data-module="penelitian" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#722F99] border border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-file-arrow-down text-[#722F99]"></i>
                            <span>Template</span>
                        </button>
                    </div>
                    <div class="flex items-center gap-2">
                        <button type="button" data-action="tambah-manual" data-module="penelitian" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-purple-50 text-slate-700 hover:text-[#722F99] border border-slate-200 hover:border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-circle-plus text-[#722F99]"></i>
                            <span>Tambah Manual</span>
                        </button>
                        <a href="<?php echo e(url('/penelitian')); ?>" class="w-9 h-9 rounded-xl border border-slate-200 hover:border-purple-200 hover:bg-purple-50 flex items-center justify-center text-slate-500 hover:text-[#722F99] transition cursor-pointer" title="Buka Halaman Penelitian">
                            <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- 5. Kerjasama & Kemitraan -->
            <div class="module-card bg-white rounded-2xl shadow-sm hover:shadow-xl border border-purple-100/70 p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1" data-category="akademik" data-keywords="kerjasama kemitraan mou moa ia mitra industri pemerintah bumn">
                <div>
                    <div class="flex items-start justify-between gap-3 mb-2.5">
                        <div class="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 text-[#722F99] flex items-center justify-center text-lg shadow-inner">
                            <i class="fa-solid fa-handshake-angle"></i>
                        </div>
                        <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-purple-50 text-[#722F99] border border-purple-200">
                            Kemitraan
                        </span>
                    </div>
                    <h3 class="text-base font-bold text-slate-900 tracking-tight">Kerjasama &amp; Kemitraan</h3>
                    <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                        Katalog MoU, MoA, IA, nama mitra, sektor industri/pemerintah, masa berlaku, unit PIC, dan realisasi kegiatan.
                    </p>
                    <div class="flex items-center gap-2 mt-3 text-[11px] text-slate-400">
                        <span class="font-semibold text-slate-700"><i class="fa-solid fa-table-columns mr-1 text-[#722F99]"></i> 12 Kolom</span>
                        <span>&bull;</span>
                        <span>IKU 6 Kemitraan</span>
                    </div>
                </div>

                <div class="mt-5 pt-3.5 border-t border-purple-100/60 space-y-2">
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" data-action="import-excel" data-module="kerjasama" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#722F99] hover:bg-[#592279] text-white font-bold text-xs shadow-md shadow-purple-950/20 transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-cloud-arrow-up text-amber-300"></i>
                            <span>Import File</span>
                        </button>
                        <button type="button" data-action="download-template" data-module="kerjasama" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#722F99] border border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-file-arrow-down text-[#722F99]"></i>
                            <span>Template</span>
                        </button>
                    </div>
                    <div class="flex items-center gap-2">
                        <button type="button" data-action="tambah-manual" data-module="kerjasama" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-purple-50 text-slate-700 hover:text-[#722F99] border border-slate-200 hover:border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-circle-plus text-[#722F99]"></i>
                            <span>Tambah Manual</span>
                        </button>
                        <a href="<?php echo e(url('/kerjasama')); ?>" class="w-9 h-9 rounded-xl border border-slate-200 hover:border-purple-200 hover:bg-purple-50 flex items-center justify-center text-slate-500 hover:text-[#722F99] transition cursor-pointer" title="Buka Halaman Kerjasama">
                            <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- 6. Partisipasi Sivitas -->
            <div class="module-card bg-white rounded-2xl shadow-sm hover:shadow-xl border border-purple-100/70 p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1" data-category="akademik" data-keywords="partisipasi sivitas delegasi lomba kompetisi seminar konferensi skpi">
                <div>
                    <div class="flex items-start justify-between gap-3 mb-2.5">
                        <div class="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 text-[#722F99] flex items-center justify-center text-lg shadow-inner">
                            <i class="fa-solid fa-users-rays"></i>
                        </div>
                        <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-purple-50 text-[#722F99] border border-purple-200">
                            Kemahasiswaan
                        </span>
                    </div>
                    <h3 class="text-base font-bold text-slate-900 tracking-tight">Partisipasi Sivitas &amp; Lomba</h3>
                    <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                        Rekapitulasi keikutsertaan delegasi lomba nasional/internasional, seminar, ormawa, dan perolehan medali SKPI.
                    </p>
                    <div class="flex items-center gap-2 mt-3 text-[11px] text-slate-400">
                        <span class="font-semibold text-slate-700"><i class="fa-solid fa-table-columns mr-1 text-[#722F99]"></i> 7 Kolom</span>
                        <span>&bull;</span>
                        <span>SKPI Sivitas</span>
                    </div>
                </div>

                <div class="mt-5 pt-3.5 border-t border-purple-100/60 space-y-2">
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" data-action="import-excel" data-module="partisipasi" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#722F99] hover:bg-[#592279] text-white font-bold text-xs shadow-md shadow-purple-950/20 transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-cloud-arrow-up text-amber-300"></i>
                            <span>Import File</span>
                        </button>
                        <button type="button" data-action="download-template" data-module="partisipasi" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#722F99] border border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-file-arrow-down text-[#722F99]"></i>
                            <span>Template</span>
                        </button>
                    </div>
                    <div class="flex items-center gap-2">
                        <button type="button" data-action="tambah-manual" data-module="partisipasi" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-purple-50 text-slate-700 hover:text-[#722F99] border border-slate-200 hover:border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-circle-plus text-[#722F99]"></i>
                            <span>Tambah Manual</span>
                        </button>
                        <a href="<?php echo e(url('/partisipasi')); ?>" class="w-9 h-9 rounded-xl border border-slate-200 hover:border-purple-200 hover:bg-purple-50 flex items-center justify-center text-slate-500 hover:text-[#722F99] transition cursor-pointer" title="Buka Halaman Partisipasi">
                            <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- 7. Web & Media Sosial -->
            <div class="module-card bg-white rounded-2xl shadow-sm hover:shadow-xl border border-purple-100/70 p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1" data-category="akademik" data-keywords="web medsos berita konten publikasi artikel views humas">
                <div>
                    <div class="flex items-start justify-between gap-3 mb-2.5">
                        <div class="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 text-[#722F99] flex items-center justify-center text-lg shadow-inner">
                            <i class="fa-solid fa-globe"></i>
                        </div>
                        <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-purple-50 text-[#722F99] border border-purple-200">
                            Humas &amp; Web
                        </span>
                    </div>
                    <h3 class="text-base font-bold text-slate-900 tracking-tight">Website &amp; Media Sosial</h3>
                    <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                        Data publikasi berita multi-kanal, rilis artikel website, kategori pengumuman, dan total views pembaca.
                    </p>
                    <div class="flex items-center gap-2 mt-3 text-[11px] text-slate-400">
                        <span class="font-semibold text-slate-700"><i class="fa-solid fa-table-columns mr-1 text-[#722F99]"></i> 5 Kolom</span>
                        <span>&bull;</span>
                        <span>Multi-Channel</span>
                    </div>
                </div>

                <div class="mt-5 pt-3.5 border-t border-purple-100/60 space-y-2">
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" data-action="import-excel" data-module="web-medsos" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#722F99] hover:bg-[#592279] text-white font-bold text-xs shadow-md shadow-purple-950/20 transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-cloud-arrow-up text-amber-300"></i>
                            <span>Import File</span>
                        </button>
                        <button type="button" data-action="download-template" data-module="web-medsos" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#722F99] border border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-file-arrow-down text-[#722F99]"></i>
                            <span>Template</span>
                        </button>
                    </div>
                    <div class="flex items-center gap-2">
                        <button type="button" data-action="tambah-manual" data-module="web-medsos" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-purple-50 text-slate-700 hover:text-[#722F99] border border-slate-200 hover:border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-circle-plus text-[#722F99]"></i>
                            <span>Tambah Manual</span>
                        </button>
                        <a href="<?php echo e(url('/web-medsos')); ?>" class="w-9 h-9 rounded-xl border border-slate-200 hover:border-purple-200 hover:bg-purple-50 flex items-center justify-center text-slate-500 hover:text-[#722F99] transition cursor-pointer" title="Buka Halaman Web Medsos">
                            <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- 8. Instagram Analytics -->
            <div class="module-card bg-white rounded-2xl shadow-sm hover:shadow-xl border border-purple-100/70 p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1" data-category="akademik" data-keywords="instagram ig analytics feeds reels reach likes engagement meta">
                <div>
                    <div class="flex items-start justify-between gap-3 mb-2.5">
                        <div class="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 text-[#722F99] flex items-center justify-center text-lg shadow-inner">
                            <i class="fa-brands fa-instagram"></i>
                        </div>
                        <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-purple-50 text-[#722F99] border border-purple-200">
                            Humas &amp; IG
                        </span>
                    </div>
                    <h3 class="text-base font-bold text-slate-900 tracking-tight">Instagram Analytics (@fmipa_unpak)</h3>
                    <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                        Data performa post Instagram, format feed/reels, jumlah likes, komentar, share, dan jangkauan reach akun.
                    </p>
                    <div class="flex items-center gap-2 mt-3 text-[11px] text-slate-400">
                        <span class="font-semibold text-slate-700"><i class="fa-solid fa-table-columns mr-1 text-[#722F99]"></i> 8 Kolom</span>
                        <span>&bull;</span>
                        <span>Meta Insights</span>
                    </div>
                </div>

                <div class="mt-5 pt-3.5 border-t border-purple-100/60 space-y-2">
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" data-action="import-excel" data-module="instagram-analytics" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#722F99] hover:bg-[#592279] text-white font-bold text-xs shadow-md shadow-purple-950/20 transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-cloud-arrow-up text-amber-300"></i>
                            <span>Import File</span>
                        </button>
                        <button type="button" data-action="download-template" data-module="instagram-analytics" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#722F99] border border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-file-arrow-down text-[#722F99]"></i>
                            <span>Template</span>
                        </button>
                    </div>
                    <div class="flex items-center gap-2">
                        <button type="button" data-action="tambah-manual" data-module="instagram-analytics" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-purple-50 text-slate-700 hover:text-[#722F99] border border-slate-200 hover:border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-circle-plus text-[#722F99]"></i>
                            <span>Tambah Manual</span>
                        </button>
                        <a href="<?php echo e(url('/instagram-analytics')); ?>" class="w-9 h-9 rounded-xl border border-slate-200 hover:border-purple-200 hover:bg-purple-50 flex items-center justify-center text-slate-500 hover:text-[#722F99] transition cursor-pointer" title="Buka Halaman Instagram Analytics">
                            <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- 9. Unit Bisnis Utama -->
            <div class="module-card bg-white rounded-2xl shadow-sm hover:shadow-xl border border-purple-100/70 p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1" data-category="bisnis" data-keywords="unit bisnis rgu invoice pendapatan omzet sewa jasa transaksi">
                <div>
                    <div class="flex items-start justify-between gap-3 mb-2.5">
                        <div class="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 text-[#722F99] flex items-center justify-center text-lg shadow-inner">
                            <i class="fa-solid fa-briefcase"></i>
                        </div>
                        <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-purple-50 text-[#722F99] border border-purple-200">
                            Unit Bisnis
                        </span>
                    </div>
                    <h3 class="text-base font-bold text-slate-900 tracking-tight">Unit Bisnis Utama FMIPA</h3>
                    <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                        Data transaksi komersial, invoice layanan, unit usaha pelaksana, nilai transaksi, dan rekapitulasi omzet fakultas.
                    </p>
                    <div class="flex items-center gap-2 mt-3 text-[11px] text-slate-400">
                        <span class="font-semibold text-slate-700"><i class="fa-solid fa-table-columns mr-1 text-[#722F99]"></i> 7 Kolom</span>
                        <span>&bull;</span>
                        <span>Revenue RGU</span>
                    </div>
                </div>

                <div class="mt-5 pt-3.5 border-t border-purple-100/60 space-y-2">
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" data-action="import-excel" data-module="unit-bisnis" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#722F99] hover:bg-[#592279] text-white font-bold text-xs shadow-md shadow-purple-950/20 transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-cloud-arrow-up text-amber-300"></i>
                            <span>Import File</span>
                        </button>
                        <button type="button" data-action="download-template" data-module="unit-bisnis" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#722F99] border border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-file-arrow-down text-[#722F99]"></i>
                            <span>Template</span>
                        </button>
                    </div>
                    <div class="flex items-center gap-2">
                        <button type="button" data-action="tambah-manual" data-module="unit-bisnis" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-purple-50 text-slate-700 hover:text-[#722F99] border border-slate-200 hover:border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-circle-plus text-[#722F99]"></i>
                            <span>Tambah Manual</span>
                        </button>
                        <a href="<?php echo e(url('/unit-bisnis')); ?>" class="w-9 h-9 rounded-xl border border-slate-200 hover:border-purple-200 hover:bg-purple-50 flex items-center justify-center text-slate-500 hover:text-[#722F99] transition cursor-pointer" title="Buka Halaman Unit Bisnis">
                            <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- 10. ComSTraC & DSC -->
            <div class="module-card bg-white rounded-2xl shadow-sm hover:shadow-xl border border-purple-100/70 p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1" data-category="bisnis" data-keywords="comstrac dsc data science bootcamp pelatihan kursus sertifikasi bnsp">
                <div>
                    <div class="flex items-start justify-between gap-3 mb-2.5">
                        <div class="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 text-[#722F99] flex items-center justify-center text-lg shadow-inner">
                            <i class="fa-solid fa-brain"></i>
                        </div>
                        <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-purple-50 text-[#722F99] border border-purple-200">
                            Unit Bisnis
                        </span>
                    </div>
                    <h3 class="text-base font-bold text-slate-900 tracking-tight">ComSTraC &amp; Data Science Center</h3>
                    <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                        Data batch kursus Data Analytics, bootcamp coding, sertifikasi BNSP, jumlah peserta, dan omzet pelatihan IT.
                    </p>
                    <div class="flex items-center gap-2 mt-3 text-[11px] text-slate-400">
                        <span class="font-semibold text-slate-700"><i class="fa-solid fa-table-columns mr-1 text-[#722F99]"></i> 8 Kolom</span>
                        <span>&bull;</span>
                        <span>Training Hub</span>
                    </div>
                </div>

                <div class="mt-5 pt-3.5 border-t border-purple-100/60 space-y-2">
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" data-action="import-excel" data-module="comstrac-dsc" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#722F99] hover:bg-[#592279] text-white font-bold text-xs shadow-md shadow-purple-950/20 transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-cloud-arrow-up text-amber-300"></i>
                            <span>Import File</span>
                        </button>
                        <button type="button" data-action="download-template" data-module="comstrac-dsc" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#722F99] border border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-file-arrow-down text-[#722F99]"></i>
                            <span>Template</span>
                        </button>
                    </div>
                    <div class="flex items-center gap-2">
                        <button type="button" data-action="tambah-manual" data-module="comstrac-dsc" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-purple-50 text-slate-700 hover:text-[#722F99] border border-slate-200 hover:border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-circle-plus text-[#722F99]"></i>
                            <span>Tambah Manual</span>
                        </button>
                        <a href="<?php echo e(url('/comstrac-dsc')); ?>" class="w-9 h-9 rounded-xl border border-slate-200 hover:border-purple-200 hover:bg-purple-50 flex items-center justify-center text-slate-500 hover:text-[#722F99] transition cursor-pointer" title="Buka Halaman ComSTraC">
                            <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- 11. Kesehatan & Apotek Pendidikan -->
            <div class="module-card bg-white rounded-2xl shadow-sm hover:shadow-xl border border-purple-100/70 p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1" data-category="bisnis" data-keywords="kesehatan apotek farmasi obat herbal transaksi kasir faktur resep">
                <div>
                    <div class="flex items-start justify-between gap-3 mb-2.5">
                        <div class="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 text-[#722F99] flex items-center justify-center text-lg shadow-inner">
                            <i class="fa-solid fa-prescription-bottle-medical"></i>
                        </div>
                        <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-purple-50 text-[#722F99] border border-purple-200">
                            Unit Bisnis
                        </span>
                    </div>
                    <h3 class="text-base font-bold text-slate-900 tracking-tight">Kesehatan &amp; Apotek Pendidikan</h3>
                    <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                        Data transaksi penjualan apotek, no. faktur, komoditas obat OTC/resep, produk herbal FMIPA, dan kuantiti terjual.
                    </p>
                    <div class="flex items-center gap-2 mt-3 text-[11px] text-slate-400">
                        <span class="font-semibold text-slate-700"><i class="fa-solid fa-table-columns mr-1 text-[#722F99]"></i> 7 Kolom</span>
                        <span>&bull;</span>
                        <span>Farmasi Kasir</span>
                    </div>
                </div>

                <div class="mt-5 pt-3.5 border-t border-purple-100/60 space-y-2">
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" data-action="import-excel" data-module="kesehatan-apotek" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#722F99] hover:bg-[#592279] text-white font-bold text-xs shadow-md shadow-purple-950/20 transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-cloud-arrow-up text-amber-300"></i>
                            <span>Import File</span>
                        </button>
                        <button type="button" data-action="download-template" data-module="kesehatan-apotek" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#722F99] border border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-file-arrow-down text-[#722F99]"></i>
                            <span>Template</span>
                        </button>
                    </div>
                    <div class="flex items-center gap-2">
                        <button type="button" data-action="tambah-manual" data-module="kesehatan-apotek" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-purple-50 text-slate-700 hover:text-[#722F99] border border-slate-200 hover:border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-circle-plus text-[#722F99]"></i>
                            <span>Tambah Manual</span>
                        </button>
                        <a href="<?php echo e(url('/kesehatan-apotek')); ?>" class="w-9 h-9 rounded-xl border border-slate-200 hover:border-purple-200 hover:bg-purple-50 flex items-center justify-center text-slate-500 hover:text-[#722F99] transition cursor-pointer" title="Buka Halaman Apotek">
                            <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- 12. Laboratorium GIS Terpadu -->
            <div class="module-card bg-white rounded-2xl shadow-sm hover:shadow-xl border border-purple-100/70 p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1" data-category="bisnis" data-keywords="gis pemetaan spasial drone lidar amdal tata ruang proyek kontrak">
                <div>
                    <div class="flex items-start justify-between gap-3 mb-2.5">
                        <div class="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 text-[#722F99] flex items-center justify-center text-lg shadow-inner">
                            <i class="fa-solid fa-map-location-dot"></i>
                        </div>
                        <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-purple-50 text-[#722F99] border border-purple-200">
                            Unit Bisnis
                        </span>
                    </div>
                    <h3 class="text-base font-bold text-slate-900 tracking-tight">Laboratorium GIS Terpadu</h3>
                    <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                        Data proyek pemetaan geospasial, survei drone/LiDAR, analisis tata ruang/AMDAL, klien mitra, dan nilai kontrak.
                    </p>
                    <div class="flex items-center gap-2 mt-3 text-[11px] text-slate-400">
                        <span class="font-semibold text-slate-700"><i class="fa-solid fa-table-columns mr-1 text-[#722F99]"></i> 8 Kolom</span>
                        <span>&bull;</span>
                        <span>Kontrak Spasial</span>
                    </div>
                </div>

                <div class="mt-5 pt-3.5 border-t border-purple-100/60 space-y-2">
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" data-action="import-excel" data-module="lab-gis" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#722F99] hover:bg-[#592279] text-white font-bold text-xs shadow-md shadow-purple-950/20 transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-cloud-arrow-up text-amber-300"></i>
                            <span>Import File</span>
                        </button>
                        <button type="button" data-action="download-template" data-module="lab-gis" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#722F99] border border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-file-arrow-down text-[#722F99]"></i>
                            <span>Template</span>
                        </button>
                    </div>
                    <div class="flex items-center gap-2">
                        <button type="button" data-action="tambah-manual" data-module="lab-gis" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-purple-50 text-slate-700 hover:text-[#722F99] border border-slate-200 hover:border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-circle-plus text-[#722F99]"></i>
                            <span>Tambah Manual</span>
                        </button>
                        <a href="<?php echo e(url('/lab-gis')); ?>" class="w-9 h-9 rounded-xl border border-slate-200 hover:border-purple-200 hover:bg-purple-50 flex items-center justify-center text-slate-500 hover:text-[#722F99] transition cursor-pointer" title="Buka Halaman Lab GIS">
                            <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- 13. Lab Service ISO 17025 -->
            <div class="module-card bg-white rounded-2xl shadow-sm hover:shadow-xl border border-purple-100/70 p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1" data-category="bisnis" data-keywords="lab service pengujian sampel lhu iso 17025 air limbah pangan instrumen">
                <div>
                    <div class="flex items-start justify-between gap-3 mb-2.5">
                        <div class="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 text-[#722F99] flex items-center justify-center text-lg shadow-inner">
                            <i class="fa-solid fa-vial-circle-check"></i>
                        </div>
                        <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-purple-50 text-[#722F99] border border-purple-200">
                            Unit Bisnis
                        </span>
                    </div>
                    <h3 class="text-base font-bold text-slate-900 tracking-tight">Lab Service ISO 17025</h3>
                    <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                        Order analisis sampel kimia/biologi, pengujian air &amp; limbah, parameter instrumen AAS/HPLC, dan penerbitan LHU.
                    </p>
                    <div class="flex items-center gap-2 mt-3 text-[11px] text-slate-400">
                        <span class="font-semibold text-slate-700"><i class="fa-solid fa-table-columns mr-1 text-[#722F99]"></i> 9 Kolom</span>
                        <span>&bull;</span>
                        <span>Akreditasi ISO</span>
                    </div>
                </div>

                <div class="mt-5 pt-3.5 border-t border-purple-100/60 space-y-2">
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" data-action="import-excel" data-module="lab-service" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#722F99] hover:bg-[#592279] text-white font-bold text-xs shadow-md shadow-purple-950/20 transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-cloud-arrow-up text-amber-300"></i>
                            <span>Import File</span>
                        </button>
                        <button type="button" data-action="download-template" data-module="lab-service" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#722F99] border border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-file-arrow-down text-[#722F99]"></i>
                            <span>Template</span>
                        </button>
                    </div>
                    <div class="flex items-center gap-2">
                        <button type="button" data-action="tambah-manual" data-module="lab-service" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-purple-50 text-slate-700 hover:text-[#722F99] border border-slate-200 hover:border-purple-200 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer">
                            <i class="fa-solid fa-circle-plus text-[#722F99]"></i>
                            <span>Tambah Manual</span>
                        </button>
                        <a href="<?php echo e(url('/lab-service')); ?>" class="w-9 h-9 rounded-xl border border-slate-200 hover:border-purple-200 hover:bg-purple-50 flex items-center justify-center text-slate-500 hover:text-[#722F99] transition cursor-pointer" title="Buka Halaman Lab Service">
                            <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                        </a>
                    </div>
                </div>
            </div>

        </div>
     <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal85d20c52a0bc8aa2dac04a1a4f1013d4)): ?>
<?php $attributes = $__attributesOriginal85d20c52a0bc8aa2dac04a1a4f1013d4; ?>
<?php unset($__attributesOriginal85d20c52a0bc8aa2dac04a1a4f1013d4); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal85d20c52a0bc8aa2dac04a1a4f1013d4)): ?>
<?php $component = $__componentOriginal85d20c52a0bc8aa2dac04a1a4f1013d4; ?>
<?php unset($__componentOriginal85d20c52a0bc8aa2dac04a1a4f1013d4); ?>
<?php endif; ?>

    <!-- Section 2: Panduan Alur Pengelolaan Data (Standard FMIPA Section Card) -->
    <?php if (isset($component)) { $__componentOriginal85d20c52a0bc8aa2dac04a1a4f1013d4 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal85d20c52a0bc8aa2dac04a1a4f1013d4 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.section-card','data' => ['title' => 'Panduan Alur Pengelolaan &amp; Validasi Data','icon' => 'fa-solid fa-circle-question','sectionClass' => 'section-panduan-data']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.section-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Panduan Alur Pengelolaan &amp; Validasi Data','icon' => 'fa-solid fa-circle-question','sectionClass' => 'section-panduan-data']); ?>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <div class="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-inner">
                <div class="w-9 h-9 rounded-xl bg-amber-400 text-[#4A154B] font-black flex items-center justify-center text-sm mb-3 shadow-md">1</div>
                <h4 class="text-sm font-bold text-white mb-1.5">Unduh Template Excel</h4>
                <p class="text-xs text-purple-100/90 leading-relaxed">
                    Klik tombol <strong>Template</strong> pada modul yang ingin diisi untuk mengunduh format kolom resmi standar FMIPA UNPAK.
                </p>
            </div>

            <div class="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-inner">
                <div class="w-9 h-9 rounded-xl bg-amber-400 text-[#4A154B] font-black flex items-center justify-center text-sm mb-3 shadow-md">2</div>
                <h4 class="text-sm font-bold text-white mb-1.5">Isi Data Sesuai Kolom</h4>
                <p class="text-xs text-purple-100/90 leading-relaxed">
                    Buka file di Microsoft Excel, isi baris data dengan mengikuti contoh baris pertama. Hindari mengubah nama judul header kolom.
                </p>
            </div>

            <div class="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-inner">
                <div class="w-9 h-9 rounded-xl bg-amber-400 text-[#4A154B] font-black flex items-center justify-center text-sm mb-3 shadow-md">3</div>
                <h4 class="text-sm font-bold text-white mb-1.5">Unggah &amp; Periksa Pratinjau</h4>
                <p class="text-xs text-purple-100/90 leading-relaxed">
                    Klik <strong>Import File</strong>, drag file Excel Anda, periksa 5 baris pratinjau di layar, lalu klik <strong>Simpan &amp; Terapkan Data</strong>.
                </p>
            </div>
        </div>
     <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal85d20c52a0bc8aa2dac04a1a4f1013d4)): ?>
<?php $attributes = $__attributesOriginal85d20c52a0bc8aa2dac04a1a4f1013d4; ?>
<?php unset($__attributesOriginal85d20c52a0bc8aa2dac04a1a4f1013d4); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal85d20c52a0bc8aa2dac04a1a4f1013d4)): ?>
<?php $component = $__componentOriginal85d20c52a0bc8aa2dac04a1a4f1013d4; ?>
<?php unset($__componentOriginal85d20c52a0bc8aa2dac04a1a4f1013d4); ?>
<?php endif; ?>
</div>

<?php $__env->startPush('scripts'); ?>
<script>
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('#hubFilterTabs .btn-data-prodi-tab');
    const cards = document.querySelectorAll('.module-card');
    const searchInput = document.getElementById('searchHubInput');

    let currentFilter = 'semua';
    let searchQuery = '';

    function filterModules() {
        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
            const title = (card.querySelector('h3') ? card.querySelector('h3').textContent : '').toLowerCase();

            const matchCat = (currentFilter === 'semua' || category === currentFilter);
            const matchSearch = (!searchQuery || title.includes(searchQuery) || keywords.includes(searchQuery));

            if (matchCat && matchSearch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            currentFilter = tab.getAttribute('data-filter');
            filterModules();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterModules();
        });
    }
});
</script>
<?php $__env->stopPush(); ?>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH C:\laragon\www\dashboard_dekan_fmipa\resources\views/pages/kelola-data/index.blade.php ENDPATH**/ ?>