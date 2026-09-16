<!-- Section: Retensi & Progres Tugas Akhir -->
<x-shared.section-card title="Retensi & Progres Tugas Akhir" icon="fa-solid fa-scroll" sectionClass="section-wadek1 section-retensi-tugas-akhir">
    <!-- 4 Stat Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <x-shared.stat-card title="Total Tugas Akhir" value="0" subtext="Mahasiswa aktif TA" valueId="valRetTotalTa" />
        <x-shared.stat-card title="Selesai Sidang" value="0" subtext="0% completion rate" valueId="valRetSelesai" subtextId="subRetSelesai" />
        <x-shared.stat-card title="Dalam Proses" value="0" subtext="Tahap bimbingan aktif" valueId="valRetProses" subtextId="subRetProses" />
        <x-shared.stat-card title="Terlambat (> 2 Smtr)" value="0" subtext="Perlu pendampingan" valueId="valRetTerlambat" subtextId="subRetTerlambat" />
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <!-- Chart 1: Tingkat Retensi Mahasiswa per Angkatan -->
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <h3 class="text-sm font-bold text-gray-800">Tingkat Retensi Mahasiswa per Angkatan (%)</h3>
                    <span class="w-4 h-4 rounded-full bg-purple-100 text-[#722F99] flex items-center justify-center text-[10px] font-bold" title="Tingkat Retensi Mahasiswa per Angkatan">i</span>
                </div>
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Target BAN-PT: ≥ 85%</span>
            </div>
            <div class="w-full h-64 relative">
                <canvas id="chartWd1RetensiAngkatan"></canvas>
            </div>
        </div>

        <!-- Chart 2: Distribusi Status Tugas Akhir -->
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <h3 class="text-sm font-bold text-gray-800">Distribusi Status Tugas Akhir</h3>
                    <span class="w-4 h-4 rounded-full bg-purple-100 text-[#722F99] flex items-center justify-center text-[10px] font-bold" title="Distribusi Status Tugas Akhir">i</span>
                </div>
                <span class="text-xs font-semibold text-gray-500">T.A. 2025/2026</span>
            </div>
            <div class="w-full h-64 relative flex items-center justify-center">
                <canvas id="chartWd1StatusTa"></canvas>
            </div>
        </div>
    </div>
</x-shared.section-card>
