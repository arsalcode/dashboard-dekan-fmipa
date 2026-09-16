<!-- Section 1: Statistik & Finansial Lab GIS Terpadu FMIPA (Standar Dashboard Dekan) -->
<x-shared.section-card title="Statistik &amp; Finansial Lab GIS Terpadu" icon="fa-solid fa-map-location-dot" sectionClass="section-gis">
            
            <!-- Alert Notice Banner -->
            <div class="bg-white/10 backdrop-blur-md border border-white/25 rounded-xl p-3.5 flex items-start gap-3 text-white text-xs">
                <span class="w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    <i class="fa-solid fa-globe-asia text-amber-300"></i>
                </span>
                <div class="leading-relaxed">
                    <strong class="font-bold text-amber-300">Unit Bisnis Laboratorium Sistem Informasi Geografis (GIS) Terpadu:</strong> Menyediakan jasa konsultansi dan survei fotogrametri drone UAV/Lidar, pemetaan tutupan lahan, analisis daya dukung lingkungan &amp; AMDAL, rancang bangun portal WebGIS interaktif, serta sertifikasi kompetensi spasial.
                </div>
            </div>

            <!-- 4 Stat Cards Row (Komponen Standar Dashboard Dekan) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <x-shared.stat-card
                    title="Total Proyek Pemetaan"
                    value="0"
                    subtext="Belum ada data"
                    valueId="valGisProyek"
                    subtextId="subGisProyek"
                />
                <x-shared.stat-card
                    title="Total Luas Terpetakan"
                    value="0 Ha"
                    subtext="Belum ada data"
                    valueId="valGisLuas"
                    subtextId="subGisLuas"
                />
                <x-shared.stat-card
                    title="Total Omzet Layanan GIS"
                    value="Rp 0"
                    subtext="Belum ada data"
                    valueId="valGisOmzet"
                    subtextId="subGisOmzet"
                />
                <x-shared.stat-card
                    title="Mitra Instansi &amp; Industri"
                    value="0"
                    subtext="Belum ada data"
                    valueId="valGisMitra"
                    subtextId="subGisMitra"
                />
            </div>

            <!-- Charts Container (White Card) -->
            <div class="bg-white rounded-2xl p-6 shadow-lg text-slate-800">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <!-- Chart 1: Tren Omzet & Luas Area Bulanan (Col 7) -->
                    <div class="lg:col-span-7 flex flex-col">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="font-bold text-slate-800 text-base">Tren Omzet &amp; Luas Area Terpetakan 2026</h3>
                                <p class="text-xs text-slate-500">Perbandingan realisasi pendapatan (Juta Rp) dan total luas lahan survei (Hektar)</p>
                            </div>
                            <div class="flex items-center gap-3 text-xs">
                                <span class="flex items-center gap-1.5">
                                    <span class="w-3 h-3 rounded-full bg-[#722F99]"></span>
                                    <span class="text-slate-600 font-medium">Omzet (Jt)</span>
                                </span>
                                <span class="flex items-center gap-1.5">
                                    <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
                                    <span class="text-slate-600 font-medium">Luas (Ha)</span>
                                </span>
                            </div>
                        </div>
                        <div class="gis-chart-canvas-wrap relative flex-1 min-h-[300px]">
                            <canvas id="chartGisTren"></canvas>
                        </div>
                    </div>

                    <!-- Chart 2: Tabbed Breakdown (Col 5) -->
                    <div class="lg:col-span-5 flex flex-col border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-6 pt-4 lg:pt-0">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="font-bold text-slate-800 text-base">Portofolio Layanan &amp; Klien</h3>
                                <p class="text-xs text-slate-500">Proporsi jenis layanan survei geospasial, sektor mitra, dan progres</p>
                            </div>
                        </div>

                        <!-- Chart Tab Pills -->
                        <div class="gis-chart-tab-pills flex items-center p-1 bg-slate-100/90 rounded-xl mb-4 text-xs font-semibold text-slate-600">
                            <button type="button" class="gis-chart-tab-pill active flex-1 py-1.5 rounded-lg transition" id="tabGisLayanan" data-chart-view="layanan">Layanan</button>
                            <button type="button" class="gis-chart-tab-pill flex-1 py-1.5 rounded-lg transition" id="tabGisKlien" data-chart-view="klien">Klien</button>
                            <button type="button" class="gis-chart-tab-pill flex-1 py-1.5 rounded-lg transition" id="tabGisStatus" data-chart-view="status">Status Proyek</button>
                        </div>

                        <div class="gis-chart-canvas-views relative flex-1 min-h-[260px] flex items-center justify-center">
                            <div id="viewWrapGisLayanan" class="gis-chart-canvas-view active w-full h-full">
                                <canvas id="chartGisLayanan"></canvas>
                            </div>
                            <div id="viewWrapGisKlien" class="gis-chart-canvas-view hidden w-full h-full">
                                <canvas id="chartGisKlien"></canvas>
                            </div>
                            <div id="viewWrapGisStatus" class="gis-chart-canvas-view hidden w-full h-full">
                                <canvas id="chartGisStatus"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

</x-shared.section-card>
