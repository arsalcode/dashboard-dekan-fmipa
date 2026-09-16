<!-- Section 1: Statistik Dosen -->
<x-shared.section-card title="Statistik Dosen" icon="fa-solid fa-chart-pie" sectionClass="section-dosen">
            
            <!-- Alert Notice Banner -->
            <div class="bg-white/10 backdrop-blur-md border border-white/25 rounded-xl p-3.5 flex items-start gap-3 text-white text-xs">
                <span class="w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    <i class="fa-solid fa-info"></i>
                </span>
                <div class="leading-relaxed">
                    <strong class="font-bold text-amber-300">Status Saat Ini:</strong> Statistik berdasarkan data riwayat periode terkini (Pensiun &amp; Meninggal dikecualikan secara default). Untuk melihat data pensiun, gunakan filter <strong>"Status Dosen: Pensiun"</strong> pada bar filter.
                </div>
            </div>

            <!-- 4 Stat Cards Row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <x-shared.stat-card 
                    title="Total Dosen" 
                    value="0" 
                    subtext="Belum ada data" 
                    valueId="valDosenTotal" 
                    subtextId="subDosenTotal" 
                />
                <x-shared.stat-card 
                    title="Dosen Bersertifikat" 
                    value="0%" 
                    subtext="0 Bersertifikat" 
                    valueId="valDosenSertifPersen" 
                    subtextId="subDosenSertifCount" 
                />
                <x-shared.stat-card 
                    title="Guru Besar" 
                    value="0" 
                    subtext="Belum ada data" 
                    valueId="valDosenGuruBesar" 
                    subtextId="subDosenGuruBesar" 
                />
                <x-shared.stat-card 
                    title="Strata S3 (Doktor)" 
                    value="0" 
                    subtext="Belum ada data" 
                    valueId="valDosenS3" 
                    subtextId="subDosenS3" 
                />
            </div>

            <!-- Charts Row (2 Kolom) -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                <!-- Chart 1: Distribusi Jabatan Akademik -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-layer-group text-[#722F99]"></i>
                                <h3 class="text-sm font-bold text-gray-800">Distribusi Jabatan Akademik</h3>
                            </div>
                            <span class="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full" id="footerGuruBesarDosen">Guru Besar: 0 dosen</span>
                        </div>
                        
                        <!-- Legend -->
                        <div class="flex items-center gap-3 flex-wrap text-[11px] text-gray-600 font-medium mb-3">
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#0D0B61]"></span>Asisten Ahli</span>
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#294669]"></span>Lektor</span>
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#3D818A]"></span>Lektor Kepala</span>
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#E5D026]"></span>Guru Besar</span>
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#8BBB92]"></span>Tenaga Pengajar</span>
                        </div>

                        <div class="w-full h-64 relative flex items-center justify-center">
                            <canvas id="chartDosenJabatan"></canvas>
                            <div id="chartDosenJabatanEmpty" class="chart-empty-overlay hidden absolute inset-0 flex flex-col items-center justify-center text-center p-3 bg-white/95 rounded-xl z-10 transition-all duration-200">
                                <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#722F99] mb-1.5 shadow-inner">
                                    <i class="fa-solid fa-cloud-arrow-up text-base text-[#722F99]"></i>
                                </div>
                                <p class="text-xs font-bold text-slate-700">Belum Ada Data</p>
                                <p class="text-[11px] text-slate-400 mt-0.5 leading-snug">Upload berkas Excel atau entri manual untuk memuat grafik.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Chart 2: Status Keaktifan & Pendidikan (Tabbed) -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-user-graduate text-[#722F99]"></i>
                                <h3 class="text-sm font-bold text-gray-800">Status Keaktifan &amp; Pendidikan</h3>
                            </div>
                            
                            <!-- Tab Pills -->
                            <div class="dosen-chart-tab-pills">
                                <button type="button" class="dosen-chart-tab-pill active" id="tabChartStatus" data-chart-view="status">Status</button>
                                <button type="button" class="dosen-chart-tab-pill" id="tabChartPendidikan" data-chart-view="pendidikan">Pendidikan</button>
                                <button type="button" class="dosen-chart-tab-pill" id="tabChartSertifikasi" data-chart-view="sertifikasi">Sertifikasi</button>
                            </div>
                        </div>

                        <div class="w-full h-64 relative flex items-center justify-center">
                            <div id="viewWrapStatus" class="dosen-chart-canvas-view active w-full h-full relative flex items-center justify-center">
                                <canvas id="chartDosenStatus"></canvas>
                                <div id="chartDosenStatusEmpty" class="chart-empty-overlay hidden absolute inset-0 flex flex-col items-center justify-center text-center p-3 bg-white/95 rounded-xl z-10 transition-all duration-200">
                                    <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#722F99] mb-1.5 shadow-inner">
                                        <i class="fa-solid fa-cloud-arrow-up text-base text-[#722F99]"></i>
                                    </div>
                                    <p class="text-xs font-bold text-slate-700">Belum Ada Data</p>
                                    <p class="text-[11px] text-slate-400 mt-0.5 leading-snug">Upload berkas Excel atau entri manual untuk memuat grafik.</p>
                                </div>
                            </div>
                            <div id="viewWrapPendidikan" class="dosen-chart-canvas-view w-full h-full relative flex items-center justify-center">
                                <canvas id="chartDosenPendidikan"></canvas>
                                <div id="chartDosenPendidikanEmpty" class="chart-empty-overlay hidden absolute inset-0 flex flex-col items-center justify-center text-center p-3 bg-white/95 rounded-xl z-10 transition-all duration-200">
                                    <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#722F99] mb-1.5 shadow-inner">
                                        <i class="fa-solid fa-cloud-arrow-up text-base text-[#722F99]"></i>
                                    </div>
                                    <p class="text-xs font-bold text-slate-700">Belum Ada Data</p>
                                    <p class="text-[11px] text-slate-400 mt-0.5 leading-snug">Upload berkas Excel atau entri manual untuk memuat grafik.</p>
                                </div>
                            </div>
                            <div id="viewWrapSertifikasi" class="dosen-chart-canvas-view w-full h-full relative flex items-center justify-center">
                                <canvas id="chartDosenSertifikasi"></canvas>
                                <div id="chartDosenSertifikasiEmpty" class="chart-empty-overlay hidden absolute inset-0 flex flex-col items-center justify-center text-center p-3 bg-white/95 rounded-xl z-10 transition-all duration-200">
                                    <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#722F99] mb-1.5 shadow-inner">
                                        <i class="fa-solid fa-cloud-arrow-up text-base text-[#722F99]"></i>
                                    </div>
                                    <p class="text-xs font-bold text-slate-700">Belum Ada Data</p>
                                    <p class="text-[11px] text-slate-400 mt-0.5 leading-snug">Upload berkas Excel atau entri manual untuk memuat grafik.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-medium mt-2">
                        <span id="footerTotalDosen">Total: 0 dosen</span>
                        <span id="footerS3Dosen">S3: 0 dosen</span>
                        <span id="footerSertifikasiDosen">0% bersertifikat</span>
                        <span style="display:none;" id="countSertifYa">0</span>
                        <span style="display:none;" id="countSertifTidak">0</span>
                    </div>
                </div>
            </div>

</x-shared.section-card>
