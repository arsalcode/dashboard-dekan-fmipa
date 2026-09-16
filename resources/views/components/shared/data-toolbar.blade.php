@props([
    'module' => '',
    'searchId' => 'searchInput',
    'searchPlaceholder' => 'Cari data...',
    'showPageSize' => false,
    'pageSizeId' => 'pageSize',
    'pageSizeWrapId' => 'wrapPageSize'
])

<!-- Toolbar Aksi Tabel Terpadu: Search Box & Filter -->
<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full pb-2.5 border-b border-white/15">
    <div class="relative min-w-[260px] flex-1 max-w-md">
        <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-200 text-xs"></i>
        <input type="text" id="{{ $searchId }}" placeholder="{{ $searchPlaceholder }}" class="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/25 focus:border-purple-300 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder:text-purple-200/70 outline-none transition shadow-inner" />
    </div>

    @if($showPageSize)
    <div class="flex items-center gap-2 text-white text-xs font-semibold">
        <span class="text-purple-200">Tampilkan</span>
        <div class="table-pagesize-dropdown" id="{{ $pageSizeWrapId }}">
            <input type="hidden" id="{{ $pageSizeId }}" value="10">
            <button type="button" class="table-pagesize-btn" aria-haspopup="true" aria-expanded="false" title="Pilih data per halaman">
                <span class="table-pagesize-label">10</span>
                <i class="fa-solid fa-chevron-down chevron-icon"></i>
            </button>
            <div class="table-pagesize-menu">
                <button type="button" class="table-pagesize-item is-active" data-value="10">10</button>
                <button type="button" class="table-pagesize-item" data-value="25">25</button>
                <button type="button" class="table-pagesize-item" data-value="50">50</button>
            </div>
        </div>
        <span class="text-purple-200">data</span>
    </div>
    @endif
</div>
