@props([
    'trackId' => 'heroTrack',
    'resetId' => 'btnResetDashboardFilters',
    'activeProdi' => 'semua'
])

<div class="flex items-center gap-2 flex-wrap">
    <div id="{{ $trackId }}" class="no-scrollbar inline-flex items-center gap-2 p-3 sm:p-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl max-w-full overflow-x-auto flex-nowrap">
        <button class="filter-tab {{ $activeProdi === 'semua' ? 'active' : '' }}" data-prodi="semua">Semua</button>
        <button class="filter-tab {{ $activeProdi === 'biologi' ? 'active' : '' }}" data-prodi="biologi">Biologi</button>
        <button class="filter-tab {{ $activeProdi === 'kimia' ? 'active' : '' }}" data-prodi="kimia">Kimia</button>
        <button class="filter-tab {{ $activeProdi === 'matematika' ? 'active' : '' }}" data-prodi="matematika">Matematika</button>
        <button class="filter-tab {{ $activeProdi === 'ilmu-komputer' ? 'active' : '' }}" data-prodi="ilmu-komputer">Ilmu Komputer</button>
        <button class="filter-tab {{ $activeProdi === 'farmasi' ? 'active' : '' }}" data-prodi="farmasi">Farmasi</button>
        <button class="filter-tab {{ $activeProdi === 'ppa' ? 'active' : '' }}" data-prodi="ppa" title="Pendidikan Profesi Apoteker">Profesi Apoteker</button>
    </div>

    <!-- Reset Filter Button -->
    <button id="{{ $resetId }}" type="button" class="dashboard-filter-reset hidden" title="Reset Filter">
        <i class="fa-solid fa-xmark"></i> Reset
    </button>
</div>
