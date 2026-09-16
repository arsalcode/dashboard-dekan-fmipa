<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames(([
    'title',
    'icon' => 'fas fa-chart-pie',
    'id' => null,
    'sectionClass' => ''
]));

foreach ($attributes->all() as $__key => $__value) {
    if (in_array($__key, $__propNames)) {
        $$__key = $$__key ?? $__value;
    } else {
        $__newAttributes[$__key] = $__value;
    }
}

$attributes = new \Illuminate\View\ComponentAttributeBag($__newAttributes);

unset($__propNames);
unset($__newAttributes);

foreach (array_filter(([
    'title',
    'icon' => 'fas fa-chart-pie',
    'id' => null,
    'sectionClass' => ''
]), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars, $__key, $__value); ?>

<div <?php echo e($id ? "id=$id" : ''); ?> class="section-card mb-12 relative pt-2 <?php echo e($sectionClass); ?>">
    <!-- 1. Background White Card with Purple Border (Signature Offset Layer) -->
    <div style="width: 480px; max-width: 90%; height: 210px; border: 2px solid #722F99;" class="absolute top-0 left-0 bg-white rounded-none z-0 p-6 pointer-events-none">
        <div class="content-left flex items-center gap-3 pointer-events-auto">
            <div class="content-icon w-11 h-11 rounded-xl bg-purple-100 text-[#722F99] flex items-center justify-center text-xl shadow-xs">
                <i class="<?php echo e($icon); ?> text-xl text-[#722F99]"></i>
            </div>
            <div class="content-title-wrapper">
                <h2 class="text-xl font-bold text-gray-800 tracking-tight"><?php echo e($title); ?></h2>
                <div class="content-underline h-1 w-12 bg-[#722F99] rounded-full mt-1"></div>
            </div>
        </div>
    </div>

    <!-- 2. Foreground Purple Container (Offset Layer) -->
    <div style="margin-top: 85px; margin-left: 48px;" class="card-bg relative z-10">
        <div class="card-bg-fix bg-[#722F99] border-2 border-white/60 rounded-2xl p-6 flex flex-col gap-6 shadow-xl shadow-purple-950/20 w-full">
            <?php echo e($slot); ?>

        </div>
    </div>
</div>
<?php /**PATH C:\laragon\www\dashboard_dekan_fmipa\resources\views/components/shared/section-card.blade.php ENDPATH**/ ?>