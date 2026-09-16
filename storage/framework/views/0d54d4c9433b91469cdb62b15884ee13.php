<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames(([
    'title',
    'canvasId',
    'info' => 'i',
    'heightClass' => 'h-52',
    'class' => ''
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
    'canvasId',
    'info' => 'i',
    'heightClass' => 'h-52',
    'class' => ''
]), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars, $__key, $__value); ?>

<div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center <?php echo e($class); ?>">
    <div class="flex items-center justify-center gap-1.5 mb-3">
        <h3 class="text-xs font-bold text-gray-700"><?php echo e($title); ?></h3>
        <span class="w-4 h-4 rounded-full bg-purple-100 text-[#722F99] flex items-center justify-center text-[10px] font-bold cursor-default" title="<?php echo e($title); ?>"><?php echo e($info); ?></span>
    </div>
    <div class="w-full <?php echo e($heightClass); ?> relative flex items-center justify-center">
        <canvas id="<?php echo e($canvasId); ?>"></canvas>
        <div id="<?php echo e($canvasId); ?>Empty" class="chart-empty-overlay hidden absolute inset-0 flex-col items-center justify-center text-center p-3 bg-white/95 rounded-xl z-10 transition-all duration-200">
            <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#722F99] mb-1.5 shadow-inner">
                <i class="fa-solid fa-cloud-arrow-up text-base text-[#722F99]"></i>
            </div>
            <p class="text-xs font-bold text-slate-700">Belum Ada Data</p>
            <p class="text-[11px] text-slate-400 mt-0.5 leading-snug">Upload berkas Excel atau entri manual untuk memuat grafik.</p>
        </div>
    </div>
</div>
<?php /**PATH C:\laragon\www\dashboard_dekan_fmipa\resources\views/components/shared/chart-card.blade.php ENDPATH**/ ?>