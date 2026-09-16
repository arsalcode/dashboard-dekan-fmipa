<!-- Section: Akreditasi & Beban Mengajar -->
<?php if (isset($component)) { $__componentOriginal85d20c52a0bc8aa2dac04a1a4f1013d4 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal85d20c52a0bc8aa2dac04a1a4f1013d4 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.section-card','data' => ['title' => 'Akreditasi & Beban Mengajar','icon' => 'fa-solid fa-award','sectionClass' => 'section-wadek1 section-akreditasi-beban-mengajar']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.section-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Akreditasi & Beban Mengajar','icon' => 'fa-solid fa-award','sectionClass' => 'section-wadek1 section-akreditasi-beban-mengajar']); ?>
    <!-- 3 Stat Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <?php if (isset($component)) { $__componentOriginal5e29f0d856c553c740b404780e91c343 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal5e29f0d856c553c740b404780e91c343 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.stat-card','data' => ['title' => 'Rata-rata SKS Mengajar','value' => '0.0','subtext' => 'SKS per dosen aktif','valueId' => 'valAkrRataSks','subtextId' => 'subAkrRataSks']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.stat-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Rata-rata SKS Mengajar','value' => '0.0','subtext' => 'SKS per dosen aktif','valueId' => 'valAkrRataSks','subtextId' => 'subAkrRataSks']); ?>
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
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.stat-card','data' => ['title' => 'Dosen Overload (>16 SKS)','value' => '0','subtext' => 'Perlu penyesuaian jadwal','valueId' => 'valAkrOverload','subtextId' => 'subAkrOverload']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.stat-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Dosen Overload (>16 SKS)','value' => '0','subtext' => 'Perlu penyesuaian jadwal','valueId' => 'valAkrOverload','subtextId' => 'subAkrOverload']); ?>
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
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.stat-card','data' => ['title' => 'Dosen Underload (<12 SKS)','value' => '0','subtext' => 'Di bawah standar BKD','valueId' => 'valAkrUnderload','subtextId' => 'subAkrUnderload']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.stat-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Dosen Underload (<12 SKS)','value' => '0','subtext' => 'Di bawah standar BKD','valueId' => 'valAkrUnderload','subtextId' => 'subAkrUnderload']); ?>
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
        <!-- Chart 1: Capaian Skor Akreditasi Program Studi -->
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <h3 class="text-sm font-bold text-gray-800">Capaian Skor Akreditasi Program Studi</h3>
                    <span class="w-4 h-4 rounded-full bg-purple-100 text-[#722F99] flex items-center justify-center text-[10px] font-bold" title="Capaian Skor Akreditasi Program Studi">i</span>
                </div>
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Skala 100</span>
            </div>
            <div class="w-full h-64 relative">
                <canvas id="chartWd1SkorAkreditasi"></canvas>
            </div>
        </div>

        <!-- Chart 2: Rasio Kelulusan per Program Studi -->
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <h3 class="text-sm font-bold text-gray-800">Rasio Kelulusan per Program Studi (%)</h3>
                    <span class="w-4 h-4 rounded-full bg-purple-100 text-[#722F99] flex items-center justify-center text-[10px] font-bold" title="Rasio Kelulusan per Program Studi">i</span>
                </div>
                <span class="text-xs font-semibold text-gray-500">Target: ≥ 75%</span>
            </div>
            <div class="w-full h-64 relative">
                <canvas id="chartWd1RasioKelulusanProdi"></canvas>
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
<?php /**PATH C:\laragon\www\dashboard_dekan_fmipa\resources\views/pages/wadek1/partials/akreditasi-beban-mengajar.blade.php ENDPATH**/ ?>