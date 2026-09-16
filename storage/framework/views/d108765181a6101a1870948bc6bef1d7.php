<?php $__env->startSection('title', 'Dashboard Dekan'); ?>

<?php $__env->startSection('content'); ?>
<div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
    <!-- Executive Hero Banner (The Master Hero - Stable & Imposing) -->
    <div id="executiveHeroBanner" class="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#722F99] via-[#592279] to-[#3a1251] text-white p-6 sm:p-8 shadow-xl shadow-purple-950/20 border border-purple-800/40 mb-8">
        <!-- Ambient Decorative Glow Circles -->
        <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
        <div class="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-[#9333ea]/20 blur-3xl pointer-events-none"></div>

        <!-- Top Row: Executive Title & Semester Badge -->
        <div class="relative z-10 flex items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                    <i class="fa-solid fa-graduation-cap text-2xl sm:text-3xl text-amber-300"></i>
                </div>
                <div>
                    <div class="flex items-center gap-2.5">
                        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Dashboard Dekan</h1>
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-xs">Executive</span>
                    </div>
                    <p class="text-purple-200 text-xs sm:text-sm mt-1 font-medium">FMIPA Universitas Pakuan &bull; Executive Overview & Key Performance Indicators</p>
                </div>
            </div>

            <div class="flex items-center gap-2 shrink-0">
                <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold border border-white/25 shadow-xs">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    T.A. 2025/2026 Ganjil
                </span>
            </div>
        </div>

        <!-- Bottom Row: Integrated Prodi Filter Track -->
        <div class="relative z-10 pt-5">
            <div class="flex items-center gap-2 mb-2.5">
                <span class="text-[11px] font-bold text-purple-200/90 uppercase tracking-wider flex items-center gap-1.5">
                    <i class="fa-solid fa-layer-group text-[10px] text-amber-300"></i> Pilih Program Studi:
                </span>
            </div>
            <?php if (isset($component)) { $__componentOriginal21c20005b3a961d1eb7a04620ad19070 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal21c20005b3a961d1eb7a04620ad19070 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.prodi-filter','data' => ['trackId' => 'heroTrack','resetId' => 'btnResetDashboardFilters']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.prodi-filter'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['trackId' => 'heroTrack','resetId' => 'btnResetDashboardFilters']); ?>
<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal21c20005b3a961d1eb7a04620ad19070)): ?>
<?php $attributes = $__attributesOriginal21c20005b3a961d1eb7a04620ad19070; ?>
<?php unset($__attributesOriginal21c20005b3a961d1eb7a04620ad19070); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal21c20005b3a961d1eb7a04620ad19070)): ?>
<?php $component = $__componentOriginal21c20005b3a961d1eb7a04620ad19070; ?>
<?php unset($__componentOriginal21c20005b3a961d1eb7a04620ad19070); ?>
<?php endif; ?>
        </div>
    </div>

    <!-- Sticky Compact Floating Header (Appears smoothly when scrolling down) -->
    <div id="compactStickyBar">
        <div class="w-full rounded-2xl bg-gradient-to-r from-[#722F99]/96 via-[#592279]/96 to-[#3a1251]/96 backdrop-blur-xl text-white py-2.5 sm:py-3 px-4 sm:px-6 shadow-2xl shadow-purple-950/40 border border-white/25 flex flex-col gap-2.5">
            <!-- Top Row: Mini Brand & Semester Badge -->
            <div class="flex items-center justify-between gap-3 pb-2 border-b border-white/15">
                <!-- Left: Mini Brand & Badge -->
                <div class="flex items-center gap-2.5 sm:gap-3 shrink-0">
                    <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
                        <i class="fa-solid fa-graduation-cap text-xs sm:text-sm text-amber-300"></i>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="font-extrabold text-white text-xs sm:text-sm md:text-base tracking-tight">Dashboard Dekan</span>
                        <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30">Executive</span>
                    </div>
                </div>

                <!-- Right: Mini Semester Badge -->
                <div class="flex items-center gap-2 shrink-0">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-semibold border border-white/25 shadow-xs">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        T.A. 2025/2026 Ganjil
                    </span>
                </div>
            </div>

            <!-- Bottom Row ("ada di bawahnya"): Synchronized Prodi Filter Selector -->
            <div class="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-0.5">
                <span class="px-1 text-xs text-purple-200 font-semibold flex items-center gap-1.5 shrink-0">
                    <i class="fa-solid fa-filter text-amber-300 text-[11px]"></i> Filter:
                </span>

                <div class="relative" id="compactProdiDropdown">
                    <button type="button" id="compactProdiBtn" class="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-300/50">
                        <i class="fa-solid fa-layer-group text-amber-300 text-xs"></i>
                        <span class="text-purple-200 text-xs hidden sm:inline font-normal">Prodi:</span>
                        <span id="compactSelectedProdiText" class="font-bold text-white">Semua</span>
                        <i class="fa-solid fa-chevron-down text-[10px] text-purple-200 transition-transform duration-200 ml-0.5" id="compactChevron"></i>
                    </button>
                    <div id="compactProdiMenu" class="hidden absolute left-0 top-full mt-2 w-56 shadow-2xl z-50">
                        <button type="button" class="compact-dropdown-item is-active" data-prodi="semua">
                            <span>Semua Program Studi</span>
                            <i class="fa-solid fa-check text-[11px] check-icon"></i>
                        </button>
                        <button type="button" class="compact-dropdown-item" data-prodi="biologi">
                            <span>Biologi</span>
                            <i class="fa-solid fa-check text-[11px] check-icon"></i>
                        </button>
                        <button type="button" class="compact-dropdown-item" data-prodi="kimia">
                            <span>Kimia</span>
                            <i class="fa-solid fa-check text-[11px] check-icon"></i>
                        </button>
                        <button type="button" class="compact-dropdown-item" data-prodi="matematika">
                            <span>Matematika</span>
                            <i class="fa-solid fa-check text-[11px] check-icon"></i>
                        </button>
                        <button type="button" class="compact-dropdown-item" data-prodi="ilmu-komputer">
                            <span>Ilmu Komputer</span>
                            <i class="fa-solid fa-check text-[11px] check-icon"></i>
                        </button>
                        <button type="button" class="compact-dropdown-item" data-prodi="farmasi">
                            <span>Farmasi</span>
                            <i class="fa-solid fa-check text-[11px] check-icon"></i>
                        </button>
                        <button type="button" class="compact-dropdown-item" data-prodi="ppa">
                            <span>Profesi Apoteker</span>
                            <i class="fa-solid fa-check text-[11px] check-icon"></i>
                        </button>
                    </div>
                </div>

                <!-- Reset Filter Button (Compact) -->
                <button id="btnResetCompactDashboardFilters" type="button" class="dashboard-filter-reset hidden" title="Reset Filter">
                    <i class="fa-solid fa-xmark"></i> Reset
                </button>
            </div>
        </div>
    </div>

    <!-- Dashboard Sub-Sections (Clean Server-Side Partials) -->
    <div id="dashboardSections" class="space-y-8">
        <!-- 1. SDM Dosen -->
        <?php echo $__env->make('pages.dashboard.partials.sdm-dosen', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>

        <!-- 2. SDM Mahasiswa -->
        <?php echo $__env->make('pages.dashboard.partials.sdm-mahasiswa', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>

        <!-- 3. Penelitian & Publikasi -->
        <?php echo $__env->make('pages.dashboard.partials.penelitian-publikasi', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>

        <!-- 4. Keuangan & Administrasi -->
        <?php echo $__env->make('pages.dashboard.partials.keuangan-administrasi', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>

        <!-- 5. Media Sosial & Website -->
        <?php echo $__env->make('pages.dashboard.partials.media-sosial', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>

        <!-- 6. Kerjasama & Partnership -->
        <?php echo $__env->make('pages.dashboard.partials.kerjasama-partnership', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>

        <!-- 7. Kemahasiswaan & Prestasi -->
        <?php echo $__env->make('pages.dashboard.partials.kemahasiswaan', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
    </div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH C:\laragon\www\dashboard_dekan_fmipa\resources\views/pages/dashboard/index.blade.php ENDPATH**/ ?>