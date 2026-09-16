<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag;

$__newAttributes = [];
$__propNames = \Illuminate\View\ComponentAttributeBag::extractPropNames(([
    'trackId' => 'heroTrack',
    'resetId' => 'btnResetDashboardFilters',
    'activeProdi' => 'semua'
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
    'trackId' => 'heroTrack',
    'resetId' => 'btnResetDashboardFilters',
    'activeProdi' => 'semua'
]), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
}

$__defined_vars = get_defined_vars();

foreach ($attributes->all() as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
}

unset($__defined_vars, $__key, $__value); ?>

<div class="flex items-center gap-2 flex-wrap">
    <div id="<?php echo e($trackId); ?>" class="no-scrollbar inline-flex items-center gap-2 p-3 sm:p-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl max-w-full overflow-x-auto flex-nowrap">
        <button class="filter-tab <?php echo e($activeProdi === 'semua' ? 'active' : ''); ?>" data-prodi="semua">Semua</button>
        <button class="filter-tab <?php echo e($activeProdi === 'biologi' ? 'active' : ''); ?>" data-prodi="biologi">Biologi</button>
        <button class="filter-tab <?php echo e($activeProdi === 'kimia' ? 'active' : ''); ?>" data-prodi="kimia">Kimia</button>
        <button class="filter-tab <?php echo e($activeProdi === 'matematika' ? 'active' : ''); ?>" data-prodi="matematika">Matematika</button>
        <button class="filter-tab <?php echo e($activeProdi === 'ilmu-komputer' ? 'active' : ''); ?>" data-prodi="ilmu-komputer">Ilmu Komputer</button>
        <button class="filter-tab <?php echo e($activeProdi === 'farmasi' ? 'active' : ''); ?>" data-prodi="farmasi">Farmasi</button>
        <button class="filter-tab <?php echo e($activeProdi === 'ppa' ? 'active' : ''); ?>" data-prodi="ppa" title="Pendidikan Profesi Apoteker">Profesi Apoteker</button>
    </div>

    <!-- Reset Filter Button -->
    <button id="<?php echo e($resetId); ?>" type="button" class="dashboard-filter-reset hidden" title="Reset Filter">
        <i class="fa-solid fa-xmark"></i> Reset
    </button>
</div>
<?php /**PATH C:\laragon\www\dashboard_dekan_fmipa\resources\views/components/shared/prodi-filter.blade.php ENDPATH**/ ?>