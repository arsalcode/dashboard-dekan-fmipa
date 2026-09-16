<!-- Section 1: Statistik & Kinerja Kerjasama (Standar Dosen & Dashboard) -->
<x-shared.section-card title="Statistik &amp; Kinerja Kerjasama" icon="fa-solid fa-handshake" sectionClass="section-kerjasama">
            
            <!-- Alert Notice Banner -->
            <div class="bg-white/10 backdrop-blur-md border border-white/25 rounded-xl p-3.5 flex items-start gap-3 text-white text-xs">
                <span class="w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    <i class="fa-solid fa-file-contract text-amber-300"></i>
                </span>
                <div class="leading-relaxed">
                    <strong class="font-bold text-amber-300">Sistem Manajemen Kerjasama Terintegrasi:</strong> Monitoring legalitas nota kesepahaman (MoU), perjanjian kerjasama (MoA), dan kegiatan implementasi (IA) di FMIPA UNPAK guna pemenuhan <span class="underline font-semibold">IKU 6 Kemendikbudristek</span> (Kemitraan Program Studi) dan perluasan MBKM industri.
                </div>
            </div>

            <!-- 4 Stat Cards Row (Komponen Standar Dosen) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <x-shared.stat-card 
                    title="Total Dokumen Kerjasama" 
                    value="48" 
                    subtext="32 Nasional | 16 Internasional" 
                    valueId="valTotalKerjasama" 
                    subtextId="subTotalKerjasama" 
                />
                <x-shared.stat-card 
                    title="Kerjasama Aktif" 
                    value="42" 
                    subtext="87.5% Status Berlaku" 
                    valueId="valKerjasamaAktif" 
                    subtextId="subKerjasamaAktif" 
                />
                <x-shared.stat-card 
                    title="Realisasi Kegiatan (IA)" 
                    value="76" 
                    subtext="Magang, Riset &amp; Kuliah Tamu" 
                    valueId="valRealisasiIa" 
                    subtextId="subRealisasiIa" 
                />
                <x-shared.stat-card 
                    title="Nilai Kontribusi / Hibah" 
                    value="Rp 3.85M" 
                    subtext="Pendanaan Riset &amp; CSR Mitra" 
                    valueId="valNilaiHibah" 
                    subtextId="subNilaiHibah" 
                />
            </div>

            <!-- Charts Row (2 Kolom Mengikuti Standar Dosen) -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                <!-- Chart 1: Tren Pertumbuhan Kerjasama Tahunan -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-chart-line text-[#722F99]"></i>
                                <h3 class="text-sm font-bold text-gray-800">Tren Pertumbuhan Kerjasama (2021 - 2026)</h3>
                            </div>
                            <span class="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100" id="footerTotalKerjasamaBadge">48 Kemitraan</span>
                        </div>
                        
                        <!-- Legend -->
                        <div class="flex items-center gap-3.5 flex-wrap text-[11px] text-gray-600 font-medium mb-3">
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#722F99]"></span>Nasional</span>
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#0D9488]"></span>Internasional</span>
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>Total Akumulasi</span>
                        </div>

                        <div class="w-full h-64 relative">
                            <canvas id="chartKerjasamaTren"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Chart 2: Jenis Dokumen, Sektor Mitra & Wilayah (Tabbed View Mengikuti Dosen) -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-chart-pie text-[#722F99]"></i>
                                <h3 class="text-sm font-bold text-gray-800">Distribusi Jenis Dokumen &amp; Mitra</h3>
                            </div>
                            
                            <!-- Tab Pills -->
                            <div class="kerjasama-chart-tab-pills">
                                <button type="button" class="kerjasama-chart-tab-pill active" id="tabKerjasamaJenis" data-chart-view="jenis">Jenis Dokumen</button>
                                <button type="button" class="kerjasama-chart-tab-pill" id="tabKerjasamaSektor" data-chart-view="sektor">Sektor Mitra</button>
                                <button type="button" class="kerjasama-chart-tab-pill" id="tabKerjasamaTingkat" data-chart-view="tingkat">Tingkat Wilayah</button>
                            </div>
                        </div>

                        <div class="w-full h-64 relative">
                            <div id="viewWrapKerjasamaJenis" class="kerjasama-chart-canvas-view active">
                                <canvas id="chartKerjasamaJenis"></canvas>
                            </div>
                            <div id="viewWrapKerjasamaSektor" class="kerjasama-chart-canvas-view">
                                <canvas id="chartKerjasamaSektor"></canvas>
                            </div>
                            <div id="viewWrapKerjasamaTingkat" class="kerjasama-chart-canvas-view">
                                <canvas id="chartKerjasamaTingkat"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-medium mt-2">
                        <span id="footerTopSektor"><i class="fa-solid fa-building text-purple-600 mr-1"></i>Sektor Terbesar: Industri (42%)</span>
                        <span id="footerIkuCapaian"><i class="fa-solid fa-award text-amber-500 mr-1"></i>IKU 6: 128% Target</span>
                        <span id="footerExpiringSoon"><i class="fa-regular fa-clock text-rose-600 mr-1"></i>Perpanjangan: 6 Dokumen</span>
                    </div>
                </div>
            </div>

</x-shared.section-card>
