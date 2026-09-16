<!-- Section: Retensi & Progres Tugas Akhir -->
<?php if (isset($component)) { $__componentOriginal85d20c52a0bc8aa2dac04a1a4f1013d4 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal85d20c52a0bc8aa2dac04a1a4f1013d4 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.section-card','data' => ['title' => 'Retensi & Progres Tugas Akhir','icon' => 'fa-solid fa-scroll','sectionClass' => 'section-wadek1 section-retensi-tugas-akhir']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.section-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Retensi & Progres Tugas Akhir','icon' => 'fa-solid fa-scroll','sectionClass' => 'section-wadek1 section-retensi-tugas-akhir']); ?>
    <!-- 4 Stat Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <?php if (isset($component)) { $__componentOriginal5e29f0d856c553c740b404780e91c343 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal5e29f0d856c553c740b404780e91c343 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.stat-card','data' => ['title' => 'Total Tugas Akhir','value' => '0','subtext' => 'Mahasiswa aktif TA','valueId' => 'valRetTotalTa']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.stat-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Total Tugas Akhir','value' => '0','subtext' => 'Mahasiswa aktif TA','valueId' => 'valRetTotalTa']); ?>
<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal5e29f0d856c553c740b404780e91c343)): ?>
<?php $attributes = $__attributesOriginal5e29f0d856c553c740b404780e91c343; ?>
<?php unset($__attributesOriginal5e29f0d856c553c740b404780e91c343); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal5e29f0d856c553c740b404780e91c343)): ?>
<?php $component = $__componentOriginal5e29f0d856c553c740b404780e91c343; ?>
<?php unset($__componentOriginal5e29f0d856c553c740b404780e91c343); ?>
<?php endif; ?>
        <?php if (isset($component)) { $__componentOriginal5e29f0d856c553c740b404780e91c343 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal5e29f0d856c553c740b404780e91c343 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.stat-card','data' => ['title' => 'Selesai Sidang','value' => '0','subtext' => '0% completion rate','valueId' => 'valRetSelesai','subtextId' => 'subRetSelesai']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.stat-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Selesai Sidang','value' => '0','subtext' => '0% completion rate','valueId' => 'valRetSelesai','subtextId' => 'subRetSelesai']); ?>
<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal5e29f0d856c553c740b404780e91c343)): ?>
<?php $attributes = $__attributesOriginal5e29f0d856c553c740b404780e91c343; ?>
<?php unset($__attributesOriginal5e29f0d856c553c740b404780e91c343); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal5e29f0d856c553c740b404780e91c343)): ?>
<?php $component = $__componentOriginal5e29f0d856c553c740b404780e91c343; ?>
<?php unset($__componentOriginal5e29f0d856c553c740b404780e91c343); ?>
<?php endif; ?>
        <?php if (isset($component)) { $__componentOriginal5e29f0d856c553c740b404780e91c343 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal5e29f0d856c553c740b404780e91c343 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.stat-card','data' => ['title' => 'Dalam Proses','value' => '0','subtext' => 'Tahap bimbingan aktif','valueId' => 'valRetProses','subtextId' => 'subRetProses']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.stat-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Dalam Proses','value' => '0','subtext' => 'Tahap bimbingan aktif','valueId' => 'valRetProses','subtextId' => 'subRetProses']); ?>
<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal5e29f0d856c553c740b404780e91c343)): ?>
<?php $attributes = $__attributesOriginal5e29f0d856c553c740b404780e91c343; ?>
<?php unset($__attributesOriginal5e29f0d856c553c740b404780e91c343); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal5e29f0d856c553c740b404780e91c343)): ?>
<?php $component = $__componentOriginal5e29f0d856c553c740b404780e91c343; ?>
<?php unset($__componentOriginal5e29f0d856c553c740b404780e91c343); ?>
<?php endif; ?>
        <?php if (isset($component)) { $__componentOriginal5e29f0d856c553c740b404780e91c343 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal5e29f0d856c553c740b404780e91c343 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.stat-card','data' => ['title' => 'Terlambat (> 2 Smtr)','value' => '0','subtext' => 'Perlu pendampingan','valueId' => 'valRetTerlambat','subtextId' => 'subRetTerlambat']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.stat-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Terlambat (> 2 Smtr)','value' => '0','subtext' => 'Perlu pendampingan','valueId' => 'valRetTerlambat','subtextId' => 'subRetTerlambat']); ?>
<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal5e29f0d856c553c740b404780e91c343)): ?>
<?php $attributes = $__attributesOriginal5e29f0d856c553c740b404780e91c343; ?>
<?php unset($__attributesOriginal5e29f0d856c553c740b404780e91c343); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal5e29f0d856c553c740b404780e91c343)): ?>
<?php $component = $__componentOriginal5e29f0d856c553c740b404780e91c343; ?>
<?php unset($__componentOriginal5e29f0d856c553c740b404780e91c343); ?>
<?php endif; ?>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <!-- Chart 1: Tingkat Retensi Mahasiswa per Angkatan -->
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <h3 class="text-sm font-bold text-gray-800">Tingkat Retensi Mahasiswa per Angkatan (%)</h3>
                    <span class="w-4 h-4 rounded-full bg-purple-100 text-[#722F99] flex items-center justify-center text-[10px] font-bold" title="Tingkat Retensi Mahasiswa per Angkatan">i</span>
                </div>
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Target BAN-PT: ≥ 85%</span>
            </div>
            <div class="w-full h-64 relative">
                <canvas id="chartWd1RetensiAngkatan"></canvas>
            </div>
        </div>

        <!-- Chart 2: Distribusi Status Tugas Akhir -->
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <h3 class="text-sm font-bold text-gray-800">Distribusi Status Tugas Akhir</h3>
                    <span class="w-4 h-4 rounded-full bg-purple-100 text-[#722F99] flex items-center justify-center text-[10px] font-bold" title="Distribusi Status Tugas Akhir">i</span>
                </div>
                <span class="text-xs font-semibold text-gray-500">T.A. 2025/2026</span>
            </div>
            <div class="w-full h-64 relative flex items-center justify-center">
                <canvas id="chartWd1StatusTa"></canvas>
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
<?php /**PATH C:\laragon\www\dashboard_dekan_fmipa\resources\views/pages/wadek1/partials/retensi-tugas-akhir.blade.php ENDPATH**/ ?>