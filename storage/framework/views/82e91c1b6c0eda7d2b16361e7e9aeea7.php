<!-- Top Navbar (Tinggi h-16 sejajar persis dengan header sidebar) -->
<header class="h-16 bg-white/80 backdrop-blur-sm border-b border-gray-200/60 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 transition-all">
    <div class="flex items-center gap-3">
        <button id="sidebarToggle" class="md:hidden w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-600 transition" aria-label="Buka menu">
            <i class="fas fa-bars text-lg"></i>
        </button>
        <div class="flex items-center gap-2">
            <h1 class="text-base sm:text-lg font-bold text-gray-800 tracking-tight">FMIPA UNIVERSITAS PAKUAN</h1>
            <span class="hidden sm:inline-flex px-2 py-0.5 text-[11px] font-semibold bg-purple-100 text-[#722F99] rounded-full border border-purple-200">Executive</span>
        </div>
    </div>
    
    <div class="flex items-center gap-3 sm:gap-4">
        <div class="text-right hidden sm:block">
            <p class="text-sm font-semibold text-gray-800 leading-none">Prof. Dr. Dekan FMIPA</p>
            <p class="text-xs text-gray-400 mt-1">Pimpinan Fakultas</p>
        </div>
        <img src="<?php echo e(asset('images/dekan.jpg')); ?>" alt="Prof. Dr. Dekan FMIPA" class="w-9 h-9 rounded-full object-cover shadow-md ring-2 ring-purple-300 border border-purple-100">
    </div>
</header>
<?php /**PATH C:\laragon\www\dashboard_dekan_fmipa\resources\views/layouts/navigation/topbar.blade.php ENDPATH**/ ?>