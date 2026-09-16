<!-- Section 1: Statistik Riset & Penelitian FMIPA (Standar Dosen & Dashboard) -->
<x-shared.section-card title="Statistik Penelitian &amp; Riset" icon="fa-solid fa-flask" sectionClass="section-penelitian">
            
            <!-- Alert Notice Banner -->
            <div class="bg-white/10 backdrop-blur-md border border-white/25 rounded-xl p-3.5 flex items-start gap-3 text-white text-xs">
                <span class="w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    <i class="fa-solid fa-info"></i>
                </span>
                <div class="leading-relaxed">
                    <strong class="font-bold text-amber-300">Status Riset Terkini:</strong> Data riset operasional dosen FMIPA Universitas Pakuan mencakup hibah kompetitif nasional (BIMA Kemendikbudristek), hibah internal LPPM UNPAK, kerjasama industri, dan mandiri.
                </div>
            </div>

            <!-- 4 Stat Cards Row (Komponen Standar Dosen) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <x-shared.stat-card 
                    title="Total Judul Riset" 
                    value="68" 
                    subtext="Tahun 2025/2026" 
                    valueId="valLitTotal" 
                    subtextId="subLitTotal" 
                />
                <x-shared.stat-card 
                    title="Total Dana Hibah" 
                    value="Rp 1.85 M" 
                    subtext="Kemendikbud &amp; LPPM" 
                    valueId="valLitDana" 
                    subtextId="subLitDana" 
                />
                <x-shared.stat-card 
                    title="Publikasi Terindeks" 
                    value="54" 
                    subtext="Scopus &amp; SINTA 1-3" 
                    valueId="valLitScopus" 
                    subtextId="subLitScopus" 
                />
                <x-shared.stat-card 
                    title="Hibah Eksternal" 
                    value="24" 
                    subtext="35.3% dari Total Riset" 
                    valueId="valLitEksternal" 
                    subtextId="subLitEksternal" 
                />
            </div>

            <!-- Charts Row (2 Kolom Mengikuti Standar Dosen) -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                <!-- Chart 1: Distribusi Riset Per Program Studi -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-chart-column text-[#722F99]"></i>
                                <h3 class="text-sm font-bold text-gray-800">Distribusi Penelitian Per Program Studi</h3>
                            </div>
                            <span class="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full" id="footerTotalProdiLit">6 Program Studi</span>
                        </div>
                        
                        <!-- Legend -->
                        <div class="flex items-center gap-3 flex-wrap text-[11px] text-gray-600 font-medium mb-3">
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#722F99]"></span>Hibah Eksternal</span>
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#E5D026]"></span>Hibah Internal</span>
                        </div>

                        <div class="w-full h-64 relative">
                            <canvas id="chartLitDistribusiProdi"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Chart 2: Skema & Luaran Publikasi (Tabbed View Mengikuti Dosen) -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-award text-[#722F99]"></i>
                                <h3 class="text-sm font-bold text-gray-800">Skema Hibah &amp; Luaran Riset</h3>
                            </div>
                            
                            <!-- Tab Pills -->
                            <div class="lit-chart-tab-pills">
                                <button type="button" class="lit-chart-tab-pill active" id="tabLitSkema" data-chart-view="skema">Skema</button>
                                <button type="button" class="lit-chart-tab-pill" id="tabLitLuaran" data-chart-view="luaran">Luaran</button>
                                <button type="button" class="lit-chart-tab-pill" id="tabLitStatus" data-chart-view="status">Status</button>
                            </div>
                        </div>

                        <div class="w-full h-64 relative">
                            <div id="viewWrapLitSkema" class="lit-chart-canvas-view active">
                                <canvas id="chartLitSkema"></canvas>
                            </div>
                            <div id="viewWrapLitLuaran" class="lit-chart-canvas-view">
                                <canvas id="chartLitLuaran"></canvas>
                            </div>
                            <div id="viewWrapLitStatus" class="lit-chart-canvas-view">
                                <canvas id="chartLitStatus"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-medium mt-2">
                        <span id="footerTotalLit">Total: 68 Riset</span>
                        <span id="footerScopusLit">Scopus: 28 Dokumen</span>
                        <span id="footerSelesaiLit">Selesai: 52 (76.5%)</span>
                    </div>
                </div>
            </div>

</x-shared.section-card>
