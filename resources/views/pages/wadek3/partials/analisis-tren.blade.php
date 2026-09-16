<!-- Section 3: Analisis & Tren Kemahasiswaan -->
<x-shared.section-card title="Analisis & Tren Kemahasiswaan" icon="fa-solid fa-chart-line" sectionClass="section-wadek3">
            
            <!-- Row 1: 2 Main Analytics Charts -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                <!-- Chart 1: Distribusi Mahasiswa per Angkatan -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
                    <div class="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-gray-100">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-chart-column text-[#722F99]"></i>
                            <h3 class="text-sm font-bold text-gray-800">Distribusi Mahasiswa per Angkatan</h3>
                        </div>
                        <span class="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Mahasiswa Aktif</span>
                    </div>
                    <div class="w-full h-72 relative">
                        <canvas id="chartWd3MhsAngkatan"></canvas>
                    </div>
                </div>

                <!-- Chart 2: Tren Kegiatan Kemahasiswaan (Dual Axis) -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
                    <div class="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-gray-100">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-arrow-trend-up text-[#722F99]"></i>
                            <h3 class="text-sm font-bold text-gray-800">Tren Kegiatan &amp; Partisipasi Bulanan</h3>
                        </div>
                        <div class="flex items-center gap-3 text-[11px] font-semibold">
                            <span class="flex items-center gap-1.5 text-indigo-950">
                                <span class="w-2.5 h-2.5 rounded-full bg-[#0D0B61]"></span> Kegiatan
                            </span>
                            <span class="flex items-center gap-1.5 text-teal-700">
                                <span class="w-2.5 h-2.5 rounded-full bg-[#3D818A]"></span> Partisipasi
                            </span>
                        </div>
                    </div>
                    <div class="w-full h-72 relative">
                        <canvas id="chartWd3TrenKegiatanTahunan"></canvas>
                    </div>
                </div>
            </div>

            <!-- Row 2: 3 Comparison & Distribution Charts -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                <!-- Chart 3: Distribusi Jenis Prestasi -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
                    <div class="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-gray-100">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-medal text-amber-500"></i>
                            <h3 class="text-xs font-bold text-gray-800">Distribusi Jenis Prestasi</h3>
                        </div>
                        <span class="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">Kategori</span>
                    </div>
                    <div class="w-full h-64 relative">
                        <canvas id="chartWd3DistribusiPrestasi"></canvas>
                    </div>
                </div>

                <!-- Chart 4: Jenis Organisasi Mahasiswa (Donut) -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
                    <div class="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-gray-100">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-chart-pie text-[#3D818A]"></i>
                            <h3 class="text-xs font-bold text-gray-800">Jenis Organisasi Mahasiswa</h3>
                        </div>
                        <span class="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Lembaga</span>
                    </div>
                    <div class="w-full h-64 relative">
                        <canvas id="chartWd3JenisOrmawa"></canvas>
                    </div>
                </div>

                <!-- Chart 5: Partisipasi per Program Studi -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
                    <div class="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-gray-100">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-users text-[#722F99]"></i>
                            <h3 class="text-xs font-bold text-gray-800">Partisipasi per Program Studi</h3>
                        </div>
                        <span class="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Peserta</span>
                    </div>
                    <div class="w-full h-64 relative">
                        <canvas id="chartWd3PartisipasiProdi"></canvas>
                    </div>
                </div>
            </div>
</x-shared.section-card>
