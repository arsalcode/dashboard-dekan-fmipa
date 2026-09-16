<!-- Section: Distribusi IPK & Analisis Kelulusan -->
<x-shared.section-card title="Distribusi IPK & Analisis Kelulusan" icon="fa-solid fa-chart-line" sectionClass="section-wadek1 section-ipk-kelulusan">
    <!-- 4 Stat Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <x-shared.stat-card title="IPK Rata-rata" value="0.00" subtext="0 mahasiswa aktif" valueId="valWd1Ipk" subtextId="subWd1Ipk" />
        <x-shared.stat-card title="Kelulusan Tepat Waktu" value="0%" subtext="0 dari 0 lulusan" valueId="valWd1Kelulusan" subtextId="subWd1Kelulusan" />
        <x-shared.stat-card title="Akreditasi Kedaluwarsa" value="0" subtext="dari 6 program studi" valueId="valWd1Akreditasi" subtextId="subWd1Akreditasi" />
        <x-shared.stat-card title="Early Warning Akademik" value="0" subtext="0 kritis · 0 peringatan" valueId="valWd1EarlyWarning" subtextId="subWd1EarlyWarning" />
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <!-- Chart 1: Distribusi IPK Mahasiswa Aktif -->
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <h3 class="text-sm font-bold text-gray-800">Distribusi IPK Mahasiswa Aktif</h3>
                    <span class="w-4 h-4 rounded-full bg-purple-100 text-[#722F99] flex items-center justify-center text-[10px] font-bold" title="Distribusi IPK Mahasiswa Aktif">i</span>
                </div>
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-[#722F99] border border-purple-100">Semester Berjalan</span>
            </div>
            <div class="w-full h-64 relative">
                <canvas id="chartWd1DistribusiIpk"></canvas>
            </div>
        </div>

        <!-- Chart 2: Kelulusan Tepat Waktu vs Terlambat -->
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <h3 class="text-sm font-bold text-gray-800">Kelulusan Tepat Waktu vs Terlambat</h3>
                    <span class="w-4 h-4 rounded-full bg-purple-100 text-[#722F99] flex items-center justify-center text-[10px] font-bold" title="Kelulusan Tepat Waktu vs Terlambat">i</span>
                </div>
                <div class="flex items-center gap-3 text-[11px] font-medium text-gray-600">
                    <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-sm bg-[#722F99]"></span> <span id="legendTextTepatWaktu">Tepat Waktu</span></span>
                    <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-sm bg-amber-400"></span> <span id="legendTextTerlambat">Terlambat</span></span>
                </div>
            </div>
            <div class="w-full h-64 relative">
                <canvas id="chartWd1Kelulusan"></canvas>
            </div>
        </div>
    </div>
</x-shared.section-card>
