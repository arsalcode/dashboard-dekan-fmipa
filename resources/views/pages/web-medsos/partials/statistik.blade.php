<!-- Section 1: Statistik Web & Media Sosial FMIPA (Standar Dosen & Dashboard) -->
<x-shared.section-card title="Statistik Web &amp; Media Sosial" icon="fa-solid fa-globe" sectionClass="section-web">
            
            <!-- Alert Notice Banner -->
            <div class="bg-white/10 backdrop-blur-md border border-white/25 rounded-xl p-3.5 flex items-start gap-3 text-white text-xs">
                <span class="w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    <i class="fa-solid fa-info"></i>
                </span>
                <div class="leading-relaxed">
                    <strong class="font-bold text-amber-300">Sinkronisasi Multi-Kanal:</strong> Data trafik website terintegrasi dengan Google Analytics 4 (GA4) fmipa.unpak.ac.id, dan analitik media sosial terhubung dengan Meta Business Suite, YouTube Studio, dan LinkedIn Analytics.
                </div>
            </div>

            <!-- 4 Stat Cards Row (Komponen Standar Dosen) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <x-shared.stat-card 
                    title="Total Kunjungan Web" 
                    value="68.420" 
                    subtext="Tahun 2025/2026" 
                    valueId="valWebTotal" 
                    subtextId="subWebTotal" 
                />
                <x-shared.stat-card 
                    title="Pengunjung Unik" 
                    value="18.650" 
                    subtext="72% Pengunjung Baru" 
                    valueId="valWebUnik" 
                    subtextId="subWebUnik" 
                />
                <x-shared.stat-card 
                    title="Publikasi Konten" 
                    value="142" 
                    subtext="Website &amp; Multi-Kanal" 
                    valueId="valWebKonten" 
                    subtextId="subWebKonten" 
                />
                <x-shared.stat-card 
                    title="Total Jangkauan" 
                    value="89.500" 
                    subtext="+22.5% vs Semester Lalu" 
                    valueId="valWebReach" 
                    subtextId="subWebReach" 
                />
            </div>

            <!-- Charts Row (2 Kolom Mengikuti Standar Dosen) -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                <!-- Chart 1: Tren Trafik Pengunjung Website Bulanan -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-chart-line text-[#722F99]"></i>
                                <h3 class="text-sm font-bold text-gray-800">Tren Trafik Pengunjung Website (2025/2026)</h3>
                            </div>
                            <span class="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full" id="footerTotalPageviews">68.420 Pageviews</span>
                        </div>
                        
                        <!-- Legend -->
                        <div class="flex items-center gap-3 flex-wrap text-[11px] text-gray-600 font-medium mb-3">
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#722F99]"></span>Tayangan Halaman (Pageviews)</span>
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#0D9488]"></span>Pengguna Aktif (Users)</span>
                        </div>

                        <div class="w-full h-64 relative">
                            <canvas id="chartWebTrafficTren"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Chart 2: Sumber Trafik, Perangkat & Kategori Konten (Tabbed View Mengikuti Dosen) -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-chart-pie text-[#722F99]"></i>
                                <h3 class="text-sm font-bold text-gray-800">Analisis Sumber &amp; Perangkat Akses</h3>
                            </div>
                            
                            <!-- Tab Pills -->
                            <div class="web-chart-tab-pills">
                                <button type="button" class="web-chart-tab-pill active" id="tabWebSumber" data-chart-view="sumber">Sumber Trafik</button>
                                <button type="button" class="web-chart-tab-pill" id="tabWebPerangkat" data-chart-view="perangkat">Perangkat</button>
                                <button type="button" class="web-chart-tab-pill" id="tabWebKategori" data-chart-view="kategori">Kategori</button>
                            </div>
                        </div>

                        <div class="w-full h-64 relative">
                            <div id="viewWrapWebSumber" class="web-chart-canvas-view active">
                                <canvas id="chartWebSumber"></canvas>
                            </div>
                            <div id="viewWrapWebPerangkat" class="web-chart-canvas-view">
                                <canvas id="chartWebPerangkat"></canvas>
                            </div>
                            <div id="viewWrapWebKategori" class="web-chart-canvas-view">
                                <canvas id="chartWebKategori"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-medium mt-2">
                        <span id="footerOrganicWeb">Organic: 48%</span>
                        <span id="footerMobileWeb">Mobile: 76%</span>
                        <span id="footerAvgDuration">Rerata Sesi: 3m 42s</span>
                    </div>
                </div>
            </div>

</x-shared.section-card>
