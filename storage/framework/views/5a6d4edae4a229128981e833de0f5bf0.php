<!-- Section: Kerjasama & Partnership -->
<?php if (isset($component)) { $__componentOriginal85d20c52a0bc8aa2dac04a1a4f1013d4 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal85d20c52a0bc8aa2dac04a1a4f1013d4 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.section-card','data' => ['title' => 'Kerjasama & Partnership','icon' => 'fas fa-handshake','sectionClass' => 'section-kerjasama-partnership']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.section-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Kerjasama & Partnership','icon' => 'fas fa-handshake','sectionClass' => 'section-kerjasama-partnership']); ?>
    <!-- 1 Wide Stat Metric Card -->
    <div class="w-full">
        <?php if (isset($component)) { $__componentOriginal5e29f0d856c553c740b404780e91c343 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal5e29f0d856c553c740b404780e91c343 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.stat-card','data' => ['title' => 'Total Kerjasama','value' => '0','subtext' => 'Belum ada data','valueId' => 'valTotalKerjasama','subtextId' => 'subTotalKerjasama']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.stat-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Total Kerjasama','value' => '0','subtext' => 'Belum ada data','valueId' => 'valTotalKerjasama','subtextId' => 'subTotalKerjasama']); ?>
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

    <!-- 2 Charts Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        <!-- Chart 1: Partnership Growth Timeline -->
        <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center">
            <div class="flex items-center justify-center gap-1.5 mb-1">
                <h3 class="text-xs font-bold text-gray-700">Partnership Growth Timeline</h3>
                <span class="w-4 h-4 rounded-full bg-purple-100 text-[#722F99] flex items-center justify-center text-[10px] font-bold" title="Partnership Growth Timeline">i</span>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-3 mb-2 text-[11px] font-semibold text-gray-600">
                <div class="flex items-center gap-1.5">
                    <span class="w-3 border-t-2 border-[#722F99] inline-block"></span>
                    <span>Nasional</span>
                </div>
                <div class="flex items-center gap-1.5">
                    <span class="w-3 border-t-2 border-[#a855f7] inline-block"></span>
                    <span>Internasional</span>
                </div>
                <div class="flex items-center gap-1.5">
                    <span class="w-3 border-t-2 border-dashed border-[#581c87] inline-block"></span>
                    <span>Total</span>
                </div>
            </div>
            <div class="w-full h-56 relative flex items-center justify-center">
                <canvas id="chartPartnershipGrowth"></canvas>
                <div id="chartPartnershipGrowthEmpty" class="chart-empty-overlay hidden absolute inset-0 flex flex-col items-center justify-center text-center p-3 bg-white/95 rounded-xl z-10 transition-all duration-200">
                    <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#722F99] mb-1.5 shadow-inner">
                        <i class="fa-solid fa-cloud-arrow-up text-base text-[#722F99]"></i>
                    </div>
                    <p class="text-xs font-bold text-slate-700">Belum Ada Data</p>
                    <p class="text-[11px] text-slate-400 mt-0.5 leading-snug">Upload berkas Excel atau entri manual untuk memuat grafik.</p>
                </div>
            </div>
        </div>

        <!-- Chart 2: Partnership Status -->
        <?php if (isset($component)) { $__componentOriginal5cc74714606fe15b1a68e7af5d70fbe5 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal5cc74714606fe15b1a68e7af5d70fbe5 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.chart-card','data' => ['title' => 'Partnership Status (Tahun 2026)','canvasId' => 'chartPartnershipStatus','heightClass' => 'h-56']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.chart-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Partnership Status (Tahun 2026)','canvasId' => 'chartPartnershipStatus','heightClass' => 'h-56']); ?>
<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal5cc74714606fe15b1a68e7af5d70fbe5)): ?>
<?php $attributes = $__attributesOriginal5cc74714606fe15b1a68e7af5d70fbe5; ?>
<?php unset($__attributesOriginal5cc74714606fe15b1a68e7af5d70fbe5); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal5cc74714606fe15b1a68e7af5d70fbe5)): ?>
<?php $component = $__componentOriginal5cc74714606fe15b1a68e7af5d70fbe5; ?>
<?php unset($__componentOriginal5cc74714606fe15b1a68e7af5d70fbe5); ?>
<?php endif; ?>
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
<?php /**PATH C:\laragon\www\dashboard_dekan_fmipa\resources\views/pages/dashboard/partials/kerjasama-partnership.blade.php ENDPATH**/ ?>