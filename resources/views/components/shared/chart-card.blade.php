@props([
    'title',
    'canvasId',
    'info' => 'i',
    'heightClass' => 'h-52',
    'class' => ''
])

<div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center {{ $class }}">
    <div class="flex items-center justify-center gap-1.5 mb-3">
        <h3 class="text-xs font-bold text-gray-700">{{ $title }}</h3>
        <span class="w-4 h-4 rounded-full bg-purple-100 text-[#722F99] flex items-center justify-center text-[10px] font-bold cursor-default" title="{{ $title }}">{{ $info }}</span>
    </div>
    <div class="w-full {{ $heightClass }} relative flex items-center justify-center">
        <canvas id="{{ $canvasId }}"></canvas>
        <div id="{{ $canvasId }}Empty" class="chart-empty-overlay hidden absolute inset-0 flex-col items-center justify-center text-center p-3 bg-white/95 rounded-xl z-10 transition-all duration-200">
            <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#722F99] mb-1.5 shadow-inner">
                <i class="fa-solid fa-cloud-arrow-up text-base text-[#722F99]"></i>
            </div>
            <p class="text-xs font-bold text-slate-700">Belum Ada Data</p>
            <p class="text-[11px] text-slate-400 mt-0.5 leading-snug">Upload berkas Excel atau entri manual untuk memuat grafik.</p>
        </div>
    </div>
</div>
