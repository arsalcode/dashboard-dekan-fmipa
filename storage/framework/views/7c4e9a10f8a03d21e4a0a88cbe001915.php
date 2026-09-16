<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames(([
    'title',
    'value',
    'subtext' => null,
    'valueId' => null,
    'subtextId' => null,
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
    'value',
    'subtext' => null,
    'valueId' => null,
    'subtextId' => null,
]), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars, $__key, $__value); ?>

<div class="bg-gradient-to-br from-[#722F99] to-[#581c87] border-2 border-white/80 hover:border-white rounded-2xl p-5 flex flex-col justify-between text-white shadow-lg shadow-purple-950/30 hover:scale-[1.02] transition-all">
    <div class="flex items-center justify-between">
        <span class="text-sm font-semibold text-white/95"><?php echo e($title); ?></span>
        <button type="button" class="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px]" title="<?php echo e($title); ?>">
            <i class="fas fa-info"></i>
        </button>
    </div>
    <div class="flex items-center justify-center py-2">
        <span class="text-4xl font-extrabold text-white tracking-tight" <?php if($valueId): ?> id="<?php echo e($valueId); ?>" <?php endif; ?>><?php echo e($value); ?></span>
    </div>
    <?php if($subtext): ?>
    <div class="flex items-center justify-center">
        <span class="text-xs text-purple-200 font-medium text-center" <?php if($subtextId): ?> id="<?php echo e($subtextId); ?>" <?php endif; ?>><?php echo e($subtext); ?></span>
    </div>
    <?php endif; ?>
</div>
<?php /**PATH C:\laragon\www\dashboard_dekan_fmipa\resources\views/components/shared/stat-card.blade.php ENDPATH**/ ?>