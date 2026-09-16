<!-- Section: Kerjasama & Partnership -->
<x-shared.section-card title="Kerjasama & Partnership" icon="fas fa-handshake" sectionClass="section-kerjasama-partnership">
    <!-- 1 Wide Stat Metric Card -->
    <div class="w-full">
        <x-shared.stat-card title="Total Kerjasama" value="0" subtext="Belum ada data" valueId="valTotalKerjasama" subtextId="subTotalKerjasama" />
    </div>

    <!-- 2 Charts Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        <!-- Chart 1: Partnership Growth Timeline -->
        <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center">
            <div class="flex items-center justify-center gap-1.5 mb-1">
                <h3 class="text-xs font-bold text-gray-700">Partnership Growth Timeline</h3>
                <span class="w-4 h-4 rounded-full bg-purple-100 text-[#722F99] flex items-center justify-center text-[10px] font-bold" title="Partnership Growth Timeline">i</span>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-3 mb-2 text-[11px] font-semibold text-gray-600">
                <div class="flex items-center gap-1.5">
                    <span class="w-3 border-t-2 border-[#722F99] inline-block"></span>
                    <span>Nasional</span>
                </div>
                <div class="flex items-center gap-1.5">
                    <span class="w-3 border-t-2 border-[#a855f7] inline-block"></span>
                    <span>Internasional</span>
                </div>
                <div class="flex items-center gap-1.5">
                    <span class="w-3 border-t-2 border-dashed border-[#581c87] inline-block"></span>
                    <span>Total</span>
                </div>
            </div>
            <div class="w-full h-56 relative flex items-center justify-center">
                <canvas id="chartPartnershipGrowth"></canvas>
                <div id="chartPartnershipGrowthEmpty" class="chart-empty-overlay hidden absolute inset-0 flex flex-col items-center justify-center text-center p-3 bg-white/95 rounded-xl z-10 transition-all duration-200">
                    <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#722F99] mb-1.5 shadow-inner">
                        <i class="fa-solid fa-cloud-arrow-up text-base text-[#722F99]"></i>
                    </div>
                    <p class="text-xs font-bold text-slate-700">Belum Ada Data</p>
                    <p class="text-[11px] text-slate-400 mt-0.5 leading-snug">Upload berkas Excel atau entri manual untuk memuat grafik.</p>
                </div>
            </div>
        </div>

        <!-- Chart 2: Partnership Status -->
        <x-shared.chart-card title="Partnership Status (Tahun 2026)" canvasId="chartPartnershipStatus" heightClass="h-56" />
    </div>
</x-shared.section-card>
