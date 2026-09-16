<!-- Section: Akreditasi & Beban Mengajar -->
<x-shared.section-card title="Akreditasi & Beban Mengajar" icon="fa-solid fa-award" sectionClass="section-wadek1 section-akreditasi-beban-mengajar">
    <!-- 3 Stat Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <x-shared.stat-card title="Rata-rata SKS Mengajar" value="0.0" subtext="SKS per dosen aktif" valueId="valAkrRataSks" subtextId="subAkrRataSks" />
        <x-shared.stat-card title="Dosen Overload (>16 SKS)" value="0" subtext="Perlu penyesuaian jadwal" valueId="valAkrOverload" subtextId="subAkrOverload" />
        <x-shared.stat-card title="Dosen Underload (<12 SKS)" value="0" subtext="Di bawah standar BKD" valueId="valAkrUnderload" subtextId="subAkrUnderload" />
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <!-- Chart 1: Capaian Skor Akreditasi Program Studi -->
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <h3 class="text-sm font-bold text-gray-800">Capaian Skor Akreditasi Program Studi</h3>
                    <span class="w-4 h-4 rounded-full bg-purple-100 text-[#722F99] flex items-center justify-center text-[10px] font-bold" title="Capaian Skor Akreditasi Program Studi">i</span>
                </div>
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Skala 100</span>
            </div>
            <div class="w-full h-64 relative">
                <canvas id="chartWd1SkorAkreditasi"></canvas>
            </div>
        </div>

        <!-- Chart 2: Rasio Kelulusan per Program Studi -->
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <h3 class="text-sm font-bold text-gray-800">Rasio Kelulusan per Program Studi (%)</h3>
                    <span class="w-4 h-4 rounded-full bg-purple-100 text-[#722F99] flex items-center justify-center text-[10px] font-bold" title="Rasio Kelulusan per Program Studi">i</span>
                </div>
                <span class="text-xs font-semibold text-gray-500">Target: ≥ 75%</span>
            </div>
            <div class="w-full h-64 relative">
                <canvas id="chartWd1RasioKelulusanProdi"></canvas>
            </div>
        </div>
    </div>
</x-shared.section-card>
