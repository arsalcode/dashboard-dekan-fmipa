<!-- Section 1: Statistik & Finansial ComSTraC & DSC (Standar Dashboard Dekan) -->
<x-shared.section-card title="Statistik &amp; Finansial ComSTraC &amp; DSC" icon="fa-solid fa-laptop-code" sectionClass="section-comstrac">
            
            <!-- Alert Notice Banner -->
            <div class="bg-white/10 backdrop-blur-md border border-white/25 rounded-xl p-3.5 flex items-start gap-3 text-white text-xs">
                <span class="w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    <i class="fa-solid fa-microchip text-amber-300"></i>
                </span>
                <div class="leading-relaxed">
                    <strong class="font-bold text-amber-300">Pusat Pelatihan Sains &amp; Solusi AI Terpadu:</strong> Menyelenggarakan pelatihan komputasi, sertifikasi BNSP berstandar industri, perancangan sistem software house, serta riset terapan big data &amp; konsultansi AI.
                </div>
            </div>

            <!-- 4 Stat Cards Row (Komponen Standar Dashboard Dekan) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <x-shared.stat-card 
                    title="Total Peserta Pelatihan" 
                    value="0" 
                    subtext="Belum ada data" 
                    valueId="valComstracPeserta" 
                    subtextId="subComstracPeserta" 
                />
                <x-shared.stat-card 
                    title="Proyek Software &amp; AI" 
                    value="0" 
                    subtext="Belum ada data" 
                    valueId="valComstracProyek" 
                    subtextId="subComstracProyek" 
                />
                <x-shared.stat-card 
                    title="Total Omzet Layanan" 
                    value="Rp 0" 
                    subtext="Belum ada data" 
                    valueId="valComstracOmzet" 
                    subtextId="subComstracOmzet" 
                />
                <x-shared.stat-card 
                    title="Indeks Kepuasan Klien" 
                    value="0.0" 
                    subtext="Belum ada data" 
                    valueId="valComstracRating" 
                    subtextId="subComstracRating" 
                />
            </div>

            <!-- Charts Container (White Card) -->
            <div class="bg-white rounded-2xl p-6 shadow-lg text-slate-800">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <!-- Chart 1: Tren Omzet & Peserta Bulanan (Col 7) -->
                    <div class="lg:col-span-7 flex flex-col">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="font-bold text-slate-800 text-base">Tren Omzet &amp; Peserta Bulanan 2026</h3>
                                <p class="text-xs text-slate-500">Perbandingan realisasi pendapatan (Juta Rp) dan jumlah peserta aktif</p>
                            </div>
                            <div class="flex items-center gap-3 text-xs">
                                <span class="flex items-center gap-1.5">
                                    <span class="w-3 h-3 rounded-full bg-[#722F99]"></span>
                                    <span class="text-slate-600 font-medium">Omzet (Jt)</span>
                                </span>
                                <span class="flex items-center gap-1.5">
                                    <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
                                    <span class="text-slate-600 font-medium">Peserta</span>
                                </span>
                            </div>
                        </div>
                        <div class="comstrac-chart-canvas-wrap relative flex-1 min-h-[300px]">
                            <canvas id="chartComstracTren"></canvas>
                        </div>
                    </div>

                    <!-- Chart 2: Tabbed Breakdown (Col 5) -->
                    <div class="lg:col-span-5 flex flex-col border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-6 pt-4 lg:pt-0">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="font-bold text-slate-800 text-base">Distribusi &amp; Portofolio Unit</h3>
                                <p class="text-xs text-slate-500">Proporsi program, sektor mitra, dan status pengerjaan</p>
                            </div>
                        </div>

                        <!-- Chart Tab Pills -->
                        <div class="comstrac-chart-tab-pills flex items-center p-1 bg-slate-100/90 rounded-xl mb-4 text-xs font-semibold text-slate-600">
                            <button type="button" class="comstrac-chart-tab-pill active flex-1 py-1.5 rounded-lg transition" id="tabComstracProgram" data-chart-view="program">Program</button>
                            <button type="button" class="comstrac-chart-tab-pill flex-1 py-1.5 rounded-lg transition" id="tabComstracKlien" data-chart-view="klien">Sektor Klien</button>
                            <button type="button" class="comstrac-chart-tab-pill flex-1 py-1.5 rounded-lg transition" id="tabComstracStatus" data-chart-view="status">Status</button>
                        </div>

                        <div class="comstrac-chart-canvas-views relative flex-1 min-h-[260px] flex items-center justify-center">
                            <div id="viewWrapComstracProgram" class="comstrac-chart-canvas-view active w-full h-full">
                                <canvas id="chartComstracProgram"></canvas>
                            </div>
                            <div id="viewWrapComstracKlien" class="comstrac-chart-canvas-view hidden w-full h-full">
                                <canvas id="chartComstracKlien"></canvas>
                            </div>
                            <div id="viewWrapComstracStatus" class="comstrac-chart-canvas-view hidden w-full h-full">
                                <canvas id="chartComstracStatus"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

</x-shared.section-card>
