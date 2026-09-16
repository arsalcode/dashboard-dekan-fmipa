<!-- Section: SDM Mahasiswa -->
<x-shared.section-card title="SDM Mahasiswa" icon="fas fa-user-graduate" sectionClass="section-sdm-mahasiswa">
    <!-- 4 Stat Metric Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <x-shared.stat-card title="Total Mahasiswa" value="0" subtext="Aktif: 0" valueId="valTotalMahasiswa" subtextId="subTotalMahasiswa" />
        <x-shared.stat-card title="IPK Rata-rata" value="0.00" subtext="Skala 4.00" valueId="valIpkRataRata" />
        <x-shared.stat-card title="Kelulusan Tepat Waktu" value="0%" subtext="Belum ada data" valueId="valKelulusanTepatWaktu" subtextId="subKelulusanTepatWaktu" />
        <x-shared.stat-card title="Tingkat Retensi" value="0%" subtext="Belum ada data" valueId="valTingkatRetensi" subtextId="subTingkatRetensi" />
    </div>

    <!-- 3 Distribution & Correlation Charts Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
        <x-shared.chart-card title="Distribusi Status Mahasiswa" canvasId="chartStatusMahasiswa" />
        <x-shared.chart-card title="Distribusi IPK Mahasiswa" canvasId="chartIpkMahasiswa" />
        
        <!-- Chart 3: Korelasi IPK vs SKS -->
        <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center">
            <div class="flex items-center justify-center gap-1.5 mb-2">
                <h3 class="text-xs font-bold text-gray-700">Korelasi IPK vs SKS</h3>
                <span class="w-4 h-4 rounded-full bg-purple-100 text-[#722F99] flex items-center justify-center text-[10px] font-bold" title="Korelasi IPK vs SKS">i</span>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-2 mb-2 text-[10px] font-semibold text-gray-600">
                <div class="flex items-center gap-1">
                    <span class="w-2.5 h-2.5 rounded-sm bg-[#0D9488] inline-block"></span>
                    <span>Aktif</span>
                </div>
                <div class="flex items-center gap-1">
                    <span class="w-2.5 h-2.5 rounded-sm bg-[#F59E0B] inline-block"></span>
                    <span>Cuti</span>
                </div>
                <div class="flex items-center gap-1">
                    <span class="w-2.5 h-2.5 rounded-sm bg-[#F43F5E] inline-block"></span>
                    <span>Tidak Aktif</span>
                </div>
            </div>
            <div class="w-full h-44 relative flex items-center justify-center">
                <canvas id="chartKorelasiIpkSks"></canvas>
                <div id="chartKorelasiIpkSksEmpty" class="chart-empty-overlay hidden absolute inset-0 flex flex-col items-center justify-center text-center p-3 bg-white/95 rounded-xl z-10 transition-all duration-200">
                    <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#722F99] mb-1.5 shadow-inner">
                        <i class="fa-solid fa-cloud-arrow-up text-base text-[#722F99]"></i>
                    </div>
                    <p class="text-xs font-bold text-slate-700">Belum Ada Data</p>
                    <p class="text-[11px] text-slate-400 mt-0.5 leading-snug">Upload berkas Excel atau entri manual untuk memuat grafik.</p>
                </div>
            </div>
        </div>
    </div>
</x-shared.section-card>
