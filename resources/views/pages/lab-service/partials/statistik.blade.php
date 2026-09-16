<!-- Section 1: Statistik & Kinerja Finansial Lab Service ISO 17025 FMIPA (Standar Dashboard Dekan) -->
<x-shared.section-card title="Statistik &amp; Finansial Lab Service" icon="fa-solid fa-flask-vial" sectionClass="section-labservice">
            
            <!-- Alert Notice Banner -->
            <div class="bg-white/10 backdrop-blur-md border border-white/25 rounded-xl p-3.5 flex items-start gap-3 text-white text-xs">
                <span class="w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    <i class="fa-solid fa-certificate text-amber-300"></i>
                </span>
                <div class="leading-relaxed">
                    <strong class="font-bold text-amber-300">Layanan Laboratorium Pengujian Terpadu (Lab Service) ISO 17025:</strong> Menyediakan jasa analisis baku mutu air bersih &amp; limbah industri, cemaran mikroba pangan, uji kadar zat aktif farmasi (HPLC/GC-MS/AAS), uji toksisitas, dan penerbitan Laporan Hasil Uji (LHU) tersertifikasi.
                </div>
            </div>

            <!-- 4 Stat Cards Row (Komponen Standar Dashboard Dekan) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <x-shared.stat-card
                    title="Total Sampel Diuji"
                    value="0"
                    subtext="Belum ada data"
                    valueId="valLabSampel"
                    subtextId="subLabSampel"
                />
                <x-shared.stat-card
                    title="Total Omzet Lab Service"
                    value="Rp 0"
                    subtext="Belum ada data"
                    valueId="valLabOmzet"
                    subtextId="subLabOmzet"
                />
                <x-shared.stat-card
                    title="Akurasi &amp; Validitas Uji"
                    value="0.0%"
                    subtext="Belum ada data"
                    valueId="valLabAkurasi"
                    subtextId="subLabAkurasi"
                />
                <x-shared.stat-card
                    title="Mitra Industri &amp; Swasta"
                    value="0"
                    subtext="Belum ada data"
                    valueId="valLabMitra"
                    subtextId="subLabMitra"
                />
            </div>

            <!-- Charts Container (White Card) -->
            <div class="bg-white rounded-2xl p-6 shadow-lg text-slate-800">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <!-- Chart 1: Tren Omzet & Sampel Bulanan (Col 7) -->
                    <div class="lg:col-span-7 flex flex-col">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="font-bold text-slate-800 text-base">Tren Omzet &amp; Volume Pengujian Sampel 2026</h3>
                                <p class="text-xs text-slate-500">Pertumbuhan pendapatan jasa lab (Juta Rp) dan total sampel yang diuji per bulan</p>
                            </div>
                            <div class="flex items-center gap-3 text-xs">
                                <span class="flex items-center gap-1.5">
                                    <span class="w-3 h-3 rounded-full bg-[#722F99]"></span>
                                    <span class="text-slate-600 font-medium">Omzet (Jt)</span>
                                </span>
                                <span class="flex items-center gap-1.5">
                                    <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
                                    <span class="text-slate-600 font-medium">Sampel</span>
                                </span>
                            </div>
                        </div>
                        <div class="labservice-chart-canvas-wrap relative flex-1 min-h-[300px]">
                            <canvas id="chartLabTren"></canvas>
                        </div>
                    </div>

                    <!-- Chart 2: Tabbed Breakdown (Col 5) -->
                    <div class="lg:col-span-5 flex flex-col border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-6 pt-4 lg:pt-0">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="font-bold text-slate-800 text-base">Portofolio Parameter &amp; Pengirim</h3>
                                <p class="text-xs text-slate-500">Proporsi bidang pengujian laboratorium, sektor klien, dan progres uji</p>
                            </div>
                        </div>

                        <!-- Chart Tab Pills -->
                        <div class="labservice-chart-tab-pills flex items-center p-1 bg-slate-100/90 rounded-xl mb-4 text-xs font-semibold text-slate-600">
                            <button type="button" class="labservice-chart-tab-pill active flex-1 py-1.5 rounded-lg transition" id="tabLabBidang" data-chart-view="bidang">Bidang Uji</button>
                            <button type="button" class="labservice-chart-tab-pill flex-1 py-1.5 rounded-lg transition" id="tabLabKlien" data-chart-view="klien">Klien</button>
                            <button type="button" class="labservice-chart-tab-pill flex-1 py-1.5 rounded-lg transition" id="tabLabStatus" data-chart-view="status">Status Uji</button>
                        </div>

                        <div class="labservice-chart-canvas-views relative flex-1 min-h-[260px] flex items-center justify-center">
                            <div id="viewWrapLabBidang" class="labservice-chart-canvas-view active w-full h-full">
                                <canvas id="chartLabBidang"></canvas>
                            </div>
                            <div id="viewWrapLabKlien" class="labservice-chart-canvas-view hidden w-full h-full">
                                <canvas id="chartLabKlien"></canvas>
                            </div>
                            <div id="viewWrapLabStatus" class="labservice-chart-canvas-view hidden w-full h-full">
                                <canvas id="chartLabStatus"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

</x-shared.section-card>
