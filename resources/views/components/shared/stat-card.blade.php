@props([
    'title',
    'value',
    'subtext' => null,
    'valueId' => null,
    'subtextId' => null,
])

<div class="bg-gradient-to-br from-[#722F99] to-[#581c87] border-2 border-white/80 hover:border-white rounded-2xl p-5 flex flex-col justify-between text-white shadow-lg shadow-purple-950/30 hover:scale-[1.02] transition-all">
    <div class="flex items-center justify-between">
        <span class="text-sm font-semibold text-white/95">{{ $title }}</span>
        <button type="button" class="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px]" title="{{ $title }}">
            <i class="fas fa-info"></i>
        </button>
    </div>
    <div class="flex items-center justify-center py-2">
        <span class="text-4xl font-extrabold text-white tracking-tight" @if($valueId) id="{{ $valueId }}" @endif>{{ $value }}</span>
    </div>
    @if($subtext)
    <div class="flex items-center justify-center">
        <span class="text-xs text-purple-200 font-medium text-center" @if($subtextId) id="{{ $subtextId }}" @endif>{{ $subtext }}</span>
    </div>
    @endif
</div>
