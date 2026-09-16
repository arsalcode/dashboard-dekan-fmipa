@props([
    'title',
    'icon' => 'fas fa-chart-pie',
    'id' => null,
    'sectionClass' => ''
])

<div {{ $id ? "id=$id" : '' }} class="section-card mb-12 relative pt-2 {{ $sectionClass }}">
    <!-- 1. Background White Card with Purple Border (Signature Offset Layer) -->
    <div style="width: 480px; max-width: 90%; height: 210px; border: 2px solid #722F99;" class="absolute top-0 left-0 bg-white rounded-none z-0 p-6 pointer-events-none">
        <div class="content-left flex items-center gap-3 pointer-events-auto">
            <div class="content-icon w-11 h-11 rounded-xl bg-purple-100 text-[#722F99] flex items-center justify-center text-xl shadow-xs">
                <i class="{{ $icon }} text-xl text-[#722F99]"></i>
            </div>
            <div class="content-title-wrapper">
                <h2 class="text-xl font-bold text-gray-800 tracking-tight">{{ $title }}</h2>
                <div class="content-underline h-1 w-12 bg-[#722F99] rounded-full mt-1"></div>
            </div>
        </div>
    </div>

    <!-- 2. Foreground Purple Container (Offset Layer) -->
    <div style="margin-top: 85px; margin-left: 48px;" class="card-bg relative z-10">
        <div class="card-bg-fix bg-[#722F99] border-2 border-white/60 rounded-2xl p-6 flex flex-col gap-6 shadow-xl shadow-purple-950/20 w-full">
            {{ $slot }}
        </div>
    </div>
</div>
