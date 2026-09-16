<?php if (isset($component)) { $__componentOriginal85d20c52a0bc8aa2dac04a1a4f1013d4 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal85d20c52a0bc8aa2dac04a1a4f1013d4 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.section-card','data' => ['title' => 'SDM Dosen','icon' => 'fas fa-chalkboard-teacher','sectionClass' => 'section-sdm-dosen']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.section-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'SDM Dosen','icon' => 'fas fa-chalkboard-teacher','sectionClass' => 'section-sdm-dosen']); ?>
    <!-- Stat Cards Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <?php if (isset($component)) { $__componentOriginal5e29f0d856c553c740b404780e91c343 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal5e29f0d856c553c740b404780e91c343 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.stat-card','data' => ['title' => 'Total Dosen','value' => '0','subtext' => 'Tetap: 0 | Kontrak: 0','valueId' => 'valTotalDosen','subtextId' => 'subTotalDosen']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.stat-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Total Dosen','value' => '0','subtext' => 'Tetap: 0 | Kontrak: 0','valueId' => 'valTotalDosen','subtextId' => 'subTotalDosen']); ?>
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
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.stat-card','data' => ['title' => 'Dosen Aktif','value' => '0','subtext' => 'Keaktifan: 0.0%','valueId' => 'valDosenAktif','subtextId' => 'subDosenAktif']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.stat-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Dosen Aktif','value' => '0','subtext' => 'Keaktifan: 0.0%','valueId' => 'valDosenAktif','subtextId' => 'subDosenAktif']); ?>
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

    <!-- Distribution Charts Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
        <?php if (isset($component)) { $__componentOriginal5cc74714606fe15b1a68e7af5d70fbe5 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal5cc74714606fe15b1a68e7af5d70fbe5 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.chart-card','data' => ['title' => 'Distribusi Status Dosen','canvasId' => 'chartStatusDosen']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.chart-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Distribusi Status Dosen','canvasId' => 'chartStatusDosen']); ?>
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
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.chart-card','data' => ['title' => 'Jabatan Akademik','canvasId' => 'chartJabatanDosen']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.chart-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Jabatan Akademik','canvasId' => 'chartJabatanDosen']); ?>
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
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.chart-card','data' => ['title' => 'Sertifikasi Dosen','canvasId' => 'chartSertifikasiDosen']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.chart-card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Sertifikasi Dosen','canvasId' => 'chartSertifikasiDosen']); ?>
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
<?php endif; ?><?php /**PATH C:\laragon\www\dashboard_dekan_fmipa\resources\views/pages/dashboard/partials/sdm-dosen.blade.php ENDPATH**/ ?>