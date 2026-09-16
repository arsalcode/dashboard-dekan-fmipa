<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>" class="h-full bg-white">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">

    <title><?php echo $__env->yieldContent('title', 'Dashboard Dekan'); ?> - FMIPA Universitas Pakuan</title>
    <link rel="icon" href="<?php echo e(asset('favicon.ico')); ?>" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>

    <!-- Vite Assets (Tailwind CSS v4 & Application JS) -->
    <?php echo app('Illuminate\Foundation\Vite')(['resources/css/app.css', 'resources/js/app.js']); ?>

    <?php echo $__env->yieldPushContent('styles'); ?>
</head>

<body class="h-full font-sans antialiased text-slate-800 bg-white overflow-hidden">
    <div class="flex h-screen overflow-hidden">
        <!-- Sidebar Navigation -->
        <?php echo $__env->make('layouts.navigation.sidebar', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>

        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
            <!-- Topbar Header -->
            <?php echo $__env->make('layouts.navigation.topbar', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>

            <!-- Scrollable Page Content -->
            <main class="flex-1 overflow-y-auto bg-white">
                <?php echo $__env->yieldContent('content'); ?>
            </main>
        </div>
    </div>

    <!-- Reusable Executive Data Modals (Excel/CSV Import & Manual Entry) -->
    <?php if (isset($component)) { $__componentOriginalebadfbd59dc0a710ec603f77cd157117 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginalebadfbd59dc0a710ec603f77cd157117 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.shared.data-modals','data' => []] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('shared.data-modals'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginalebadfbd59dc0a710ec603f77cd157117)): ?>
<?php $attributes = $__attributesOriginalebadfbd59dc0a710ec603f77cd157117; ?>
<?php unset($__attributesOriginalebadfbd59dc0a710ec603f77cd157117); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalebadfbd59dc0a710ec603f77cd157117)): ?>
<?php $component = $__componentOriginalebadfbd59dc0a710ec603f77cd157117; ?>
<?php unset($__componentOriginalebadfbd59dc0a710ec603f77cd157117); ?>
<?php endif; ?>

    <?php echo $__env->yieldPushContent('scripts'); ?>
</body>

</html>
<?php /**PATH C:\laragon\www\dashboard_dekan_fmipa\resources\views/layouts/app.blade.php ENDPATH**/ ?>