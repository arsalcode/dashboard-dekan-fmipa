<!-- Section: SDM Mahasiswa -->
<?php if (isset($component)) { $__componentOriginal85d20c52a0bc8aa2dac04a1a4f1013d4 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal85d20c52a0bc8aa2dac04a1a4f1013d4 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.section-card','data' => ['title' => 'SDM Mahasiswa','icon' => 'fas fa-user-graduate','sectionClass' => 'section-sdm-mahasiswa']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.section-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'SDM Mahasiswa','icon' => 'fas fa-user-graduate','sectionClass' => 'section-sdm-mahasiswa']); ?>
    <!-- 4 Stat Metric Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <?php if (isset($component)) { $__componentOriginal5e29f0d856c553c740b404780e91c343 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal5e29f0d856c553c740b404780e91c343 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.stat-card','data' => ['title' => 'Total Mahasiswa','value' => '0','subtext' => 'Aktif: 0','valueId' => 'valTotalMahasiswa','subtextId' => 'subTotalMahasiswa']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.stat-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Total Mahasiswa','value' => '0','subtext' => 'Aktif: 0','valueId' => 'valTotalMahasiswa','subtextId' => 'subTotalMahasiswa']); ?>
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
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.stat-card','data' => ['title' => 'IPK Rata-rata','value' => '0.00','subtext' => 'Skala 4.00','valueId' => 'valIpkRataRata']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.stat-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'IPK Rata-rata','value' => '0.00','subtext' => 'Skala 4.00','valueId' => 'valIpkRataRata']); ?>
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
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.stat-card','data' => ['title' => 'Kelulusan Tepat Waktu','value' => '0%','subtext' => 'Belum ada data','valueId' => 'valKelulusanTepatWaktu','subtextId' => 'subKelulusanTepatWaktu']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.stat-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Kelulusan Tepat Waktu','value' => '0%','subtext' => 'Belum ada data','valueId' => 'valKelulusanTepatWaktu','subtextId' => 'subKelulusanTepatWaktu']); ?>
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
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.stat-card','data' => ['title' => 'Tingkat Retensi','value' => '0%','subtext' => 'Belum ada data','valueId' => 'valTingkatRetensi','subtextId' => 'subTingkatRetensi']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.stat-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Tingkat Retensi','value' => '0%','subtext' => 'Belum ada data','valueId' => 'valTingkatRetensi','subtextId' => 'subTingkatRetensi']); ?>
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

    <!-- 3 Distribution & Correlation Charts Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
        <?php if (isset($component)) { $__componentOriginal5cc74714606fe15b1a68e7af5d70fbe5 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal5cc74714606fe15b1a68e7af5d70fbe5 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.chart-card','data' => ['title' => 'Distribusi Status Mahasiswa','canvasId' => 'chartStatusMahasiswa']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.chart-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Distribusi Status Mahasiswa','canvasId' => 'chartStatusMahasiswa']); ?>
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
        <?php if (isset($component)) { $__componentOriginal5cc74714606fe15b1a68e7af5d70fbe5 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal5cc74714606fe15b1a68e7af5d70fbe5 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.chart-card','data' => ['title' => 'Distribusi IPK Mahasiswa','canvasId' => 'chartIpkMahasiswa']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.chart-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Distribusi IPK Mahasiswa','canvasId' => 'chartIpkMahasiswa']); ?>
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
        
        <!-- Chart 3: Korelasi IPK vs SKS -->
        <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center">
            <div class="flex items-center justify-center gap-1.5 mb-2">
                <h3 class="text-xs font-bold text-gray-700">Korelasi IPK vs SKS</h3>
                <span class="w-4 h-4 rounded-full bg-purple-100 text-[#722F99] flex items-center justify-center text-[10px] font-bold" title="Korelasi IPK vs SKS">i</span>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-2 mb-2 text-[10px] font-semibold text-gray-600">
                <div class="flex items-center gap-1">
                    <span class="w-2.5 h-2.5 rounded-sm bg-[#0D9488] inline-block"></span>
                    <span>Aktif</span>
                </div>
                <div class="flex items-center gap-1">
                    <span class="w-2.5 h-2.5 rounded-sm bg-[#F59E0B] inline-block"></span>
                    <span>Cuti</span>
                </div>
                <div class="flex items-center gap-1">
                    <span class="w-2.5 h-2.5 rounded-sm bg-[#F43F5E] inline-block"></span>
                    <span>Tidak Aktif</span>
                </div>
            </div>
            <div class="w-full h-44 relative flex items-center justify-center">
                <canvas id="chartKorelasiIpkSks"></canvas>
                <div id="chartKorelasiIpkSksEmpty" class="chart-empty-overlay hidden absolute inset-0 flex flex-col items-center justify-center text-center p-3 bg-white/95 rounded-xl z-10 transition-all duration-200">
                    <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#722F99] mb-1.5 shadow-inner">
                        <i class="fa-solid fa-cloud-arrow-up text-base text-[#722F99]"></i>
                    </div>
                    <p class="text-xs font-bold text-slate-700">Belum Ada Data</p>
                    <p class="text-[11px] text-slate-400 mt-0.5 leading-snug">Upload berkas Excel atau entri manual untuk memuat grafik.</p>
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
<?php /**PATH C:\laragon\www\dashboard_dekan_fmipa\resources\views/pages/dashboard/partials/sdm-mahasiswa.blade.php ENDPATH**/ ?>