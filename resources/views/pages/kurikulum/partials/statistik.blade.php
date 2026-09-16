<!-- Section 1: Statistik Kurikulum (Patokan Desain Dosen) -->
<x-shared.section-card title="Statistik Kurikulum" icon="fa-solid fa-chart-pie" sectionClass="section-kurikulum">
            
            <!-- Alert Notice Banner -->
            <div class="bg-white/10 backdrop-blur-md border border-white/25 rounded-xl p-3.5 flex items-start gap-3 text-white text-xs">
                <span class="w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    <i class="fa-solid fa-info"></i>
                </span>
                <div class="leading-relaxed">
                    <strong class="font-bold text-amber-300">Status Saat Ini:</strong> Pemetaan kurikulum aktif mencakup 6 Program Studi di FMIPA UNPAK untuk Tahun Akademik 2025/2026. Data mata kuliah terintegrasi dengan RPS, beban SKS, serta dosen koordinator pengampu.
                </div>
            </div>

            <!-- 4 Stat Cards Row (Komponen Standar Dosen) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <x-shared.stat-card 
                    title="Total Mata Kuliah" 
                    value="44" 
                    subtext="6 Program Studi" 
                    valueId="valKurlTotal" 
                    subtextId="subKurlTotal" 
                />
                <x-shared.stat-card 
                    title="Total Beban SKS" 
                    value="132" 
                    subtext="Rata-rata 3 SKS/MK" 
                    valueId="valKurlSks" 
                    subtextId="subKurlSks" 
                />
                <x-shared.stat-card 
                    title="Mata Kuliah Wajib" 
                    value="38" 
                    subtext="86.4% dari Total MK" 
                    valueId="valKurlWajib" 
                    subtextId="subKurlWajib" 
                />
                <x-shared.stat-card 
                    title="Mata Kuliah Aktif" 
                    value="39" 
                    subtext="T.A. 2025/2026 Ganjil" 
                    valueId="valKurlAktif" 
                    subtextId="subKurlAktif" 
                />
            </div>

            <!-- Charts Row (2 Kolom Mengikuti Dosen) -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                <!-- Chart 1: Distribusi Mata Kuliah Per Program Studi -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-layer-group text-[#722F99]"></i>
                                <h3 class="text-sm font-bold text-gray-800">Distribusi Mata Kuliah Per Program Studi</h3>
                            </div>
                            <span class="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full" id="footerTotalProdiKurl">6 Program Studi</span>
                        </div>
                        
                        <!-- Legend -->
                        <div class="flex items-center gap-3 flex-wrap text-[11px] text-gray-600 font-medium mb-3">
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#722F99]"></span>MK Wajib</span>
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#E5D026]"></span>MK Pilihan</span>
                        </div>

                        <div class="w-full h-64 relative">
                            <canvas id="chartKurlDistribusiProdi"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Chart 2: Status Keaktifan & Kategori (Tabbed View Mengikuti Dosen) -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-chart-donut text-[#722F99]"></i>
                                <h3 class="text-sm font-bold text-gray-800">Status Keaktifan &amp; Komposisi</h3>
                            </div>
                            
                            <!-- Tab Pills -->
                            <div class="kurl-chart-tab-pills">
                                <button type="button" class="kurl-chart-tab-pill active" id="tabKurlStatus" data-chart-view="status">Status</button>
                                <button type="button" class="kurl-chart-tab-pill" id="tabKurlKategori" data-chart-view="kategori">Kategori</button>
                                <button type="button" class="kurl-chart-tab-pill" id="tabKurlSks" data-chart-view="sks">Beban SKS</button>
                            </div>
                        </div>

                        <div class="w-full h-64 relative">
                            <div id="viewWrapKurlStatus" class="kurl-chart-canvas-view active">
                                <canvas id="chartKurlStatus"></canvas>
                            </div>
                            <div id="viewWrapKurlKategori" class="kurl-chart-canvas-view">
                                <canvas id="chartKurlKategori"></canvas>
                            </div>
                            <div id="viewWrapKurlSks" class="kurl-chart-canvas-view">
                                <canvas id="chartKurlSks"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-medium mt-2">
                        <span id="footerTotalMkKurl">Total: 44 MK</span>
                        <span id="footerWajibMkKurl">Wajib: 38 MK (86.4%)</span>
                        <span id="footerAktifMkKurl">Aktif: 39 MK (88.6%)</span>
                    </div>
                </div>
            </div>

</x-shared.section-card>
