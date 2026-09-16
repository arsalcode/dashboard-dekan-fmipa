<!-- Section: Kemahasiswaan & Prestasi -->
<x-shared.section-card title="Kemahasiswaan & Prestasi" icon="fas fa-trophy" sectionClass="section-kemahasiswaan">
    <!-- 3 Stat Metric Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
        <x-shared.stat-card title="Total Partisipasi" value="0" subtext="Belum ada data" valueId="valTotalPartisipasi" subtextId="subTotalPartisipasi" />
        <x-shared.stat-card title="Mahasiswa Beasiswa" value="0" subtext="Belum ada data" valueId="valMahasiswaBeasiswa" subtextId="subMahasiswaBeasiswa" />
        <x-shared.stat-card title="Prestasi Mahasiswa" value="0" subtext="Belum ada data" valueId="valPrestasiMahasiswa" subtextId="subPrestasiMahasiswa" />
    </div>

    <!-- 2 Charts Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        <!-- Chart 1: Tren Partisipasi per Tahun -->
        <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center">
            <div class="flex items-center justify-center gap-1.5 mb-1">
                <h3 class="text-xs font-bold text-gray-700">Tren Partisipasi per Tahun</h3>
                <span class="w-4 h-4 rounded-full bg-purple-100 text-[#722F99] flex items-center justify-center text-[10px] font-bold" title="Tren Partisipasi per Tahun">i</span>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-3 mb-2 text-[11px] font-semibold text-gray-600">
                <div class="flex items-center gap-1.5">
                    <span class="w-3 border-t-2 border-[#722F99] inline-block"></span>
                    <span>Mahasiswa</span>
                </div>
                <div class="flex items-center gap-1.5">
                    <span class="w-3 border-t-2 border-[#a855f7] inline-block"></span>
                    <span>Dosen</span>
                </div>
                <div class="flex items-center gap-1.5">
                    <span class="w-3 border-t-2 border-dashed border-[#581c87] inline-block"></span>
                    <span>Total Partisipan</span>
                </div>
            </div>
            <div class="w-full h-56 relative flex items-center justify-center">
                <canvas id="chartTrenPartisipasi"></canvas>
                <div id="chartTrenPartisipasiEmpty" class="chart-empty-overlay hidden absolute inset-0 flex flex-col items-center justify-center text-center p-3 bg-white/95 rounded-xl z-10 transition-all duration-200">
                    <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#722F99] mb-1.5 shadow-inner">
                        <i class="fa-solid fa-cloud-arrow-up text-base text-[#722F99]"></i>
                    </div>
                    <p class="text-xs font-bold text-slate-700">Belum Ada Data</p>
                    <p class="text-[11px] text-slate-400 mt-0.5 leading-snug">Upload berkas Excel atau entri manual untuk memuat grafik.</p>
                </div>
            </div>
        </div>

        <!-- Chart 2: Distribusi Tipe Event -->
        <x-shared.chart-card title="Distribusi Tipe Event (Tahun 2026)" canvasId="chartTipeEvent" heightClass="h-56" />
    </div>
</x-shared.section-card>
