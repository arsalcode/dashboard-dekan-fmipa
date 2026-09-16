<!-- Section 1: Overview Anggaran -->
<x-shared.section-card title="Overview Anggaran" icon="fa-solid fa-wallet" sectionClass="section-wadek2">
    <!-- 4 Stat Cards Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <x-shared.stat-card title="Total Anggaran Disetujui" value="Rp 0" subtext="Belum ada data" valueId="valWd2AnggaranDisetujui" subtextId="subWd2AnggaranDisetujui" />
        <x-shared.stat-card title="Realisasi Anggaran" value="Rp 0" subtext="Belum ada data" valueId="valWd2RealisasiAnggaran" subtextId="subWd2RealisasiAnggaran" />
        <x-shared.stat-card title="Persentase Serapan" value="0.0%" subtext="Belum ada data" valueId="valWd2PersentaseSerapan" subtextId="subWd2PersentaseSerapan" />
        <x-shared.stat-card title="Sisa Anggaran" value="Rp 0" subtext="Belum ada data" valueId="valWd2SisaAnggaran" subtextId="subWd2SisaAnggaran" />
    </div>

    <!-- Charts Row (2 Kolom) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
        <!-- Chart 1: Realisasi vs Disetujui per Kategori -->
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
            <div class="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-gray-100">
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-chart-column text-[#722F99]"></i>
                    <h3 class="text-sm font-bold text-gray-800">Alokasi &amp; Realisasi per Kategori</h3>
                </div>
                <span class="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Dalam Juta Rp</span>
            </div>
            <div class="w-full h-72 relative">
                <canvas id="chartWd2BudgetByCategory"></canvas>
            </div>
        </div>

        <!-- Chart 2: Tren Realisasi Bulanan -->
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
            <div class="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-gray-100">
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-chart-line text-[#722F99]"></i>
                    <h3 class="text-sm font-bold text-gray-800">Tren Realisasi Anggaran Bulanan</h3>
                </div>
                <span class="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">Jan - Des 2026</span>
            </div>
            <div class="w-full h-72 relative">
                <canvas id="chartWd2BudgetTrend"></canvas>
            </div>
        </div>
    </div>
</x-shared.section-card>
