<!-- Section 1: Statistik & Finansial Unit Bisnis (Standar Dosen & Dashboard) -->
<x-shared.section-card title="Statistik &amp; Finansial Unit Bisnis" icon="fa-solid fa-building" sectionClass="section-unit-bisnis">
            
            <!-- Alert Notice Banner -->
            <div class="bg-white/10 backdrop-blur-md border border-white/25 rounded-xl p-3.5 flex items-start gap-3 text-white text-xs">
                <span class="w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    <i class="fa-solid fa-sack-dollar text-amber-300"></i>
                </span>
                <div class="leading-relaxed">
                    <strong class="font-bold text-amber-300">Revenue Generating Unit (RGU) Terpadu:</strong> Mengintegrasikan perolehan pendapatan mandiri non-UKT dari Laboratorium Pengujian Terpadu ISO 17025, IT Solution &amp; Software House, Pusat Pelatihan Sains Terapan, dan Komersialisasi Produk Riset Farmasi-Biologi.
                </div>
            </div>

            <!-- 4 Stat Cards Row (Komponen Standar Dosen) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <x-shared.stat-card 
                    title="Total Pendapatan / Omzet" 
                    value="Rp 0" 
                    subtext="Belum ada data" 
                    valueId="valBisnisTotalOmzet" 
                    subtextId="subBisnisTotalOmzet" 
                />
                <x-shared.stat-card 
                    title="Kontribusi Kas Fakultas" 
                    value="Rp 0" 
                    subtext="Belum ada data" 
                    valueId="valBisnisNetProfit" 
                    subtextId="subBisnisNetProfit" 
                />
                <x-shared.stat-card 
                    title="Mitra &amp; Klien Bisnis" 
                    value="0" 
                    subtext="Belum ada data" 
                    valueId="valBisnisTotalKlien" 
                    subtextId="subBisnisTotalKlien" 
                />
                <x-shared.stat-card 
                    title="Paket Layanan Komersial" 
                    value="0" 
                    subtext="Belum ada data" 
                    valueId="valBisnisLayananAktif" 
                    subtextId="subBisnisLayananAktif" 
                />
            </div>

            <!-- Charts Row (2 Kolom Mengikuti Standar Dosen) -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                <!-- Chart 1: Tren Pendapatan & Profit Bulanan -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-chart-line text-[#722F99]"></i>
                                <h3 class="text-sm font-bold text-gray-800">Tren Omzet &amp; Profit Bulanan (2026)</h3>
                            </div>
                            <span class="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100" id="footerTotalOmzetBadge">Rp 0</span>
                        </div>
                        
                        <!-- Legend -->
                        <div class="flex items-center gap-3.5 flex-wrap text-[11px] text-gray-600 font-medium mb-3">
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#722F99]"></span>Omzet / Pendapatan (Juta Rp)</span>
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#0D9488]"></span>Profit Bersih Fakultas</span>
                        </div>

                        <div class="w-full h-64 relative">
                            <canvas id="chartBisnisTren"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Chart 2: Portofolio Unit Bisnis & Sektor Klien (Tabbed View Mengikuti Dosen) -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-chart-pie text-[#722F99]"></i>
                                <h3 class="text-sm font-bold text-gray-800">Distribusi Portofolio Unit &amp; Klien</h3>
                            </div>
                            
                            <!-- Tab Pills -->
                            <div class="unit-bisnis-chart-tab-pills">
                                <button type="button" class="unit-bisnis-chart-tab-pill active" id="tabBisnisPerUnit" data-chart-view="unit">Per Unit</button>
                                <button type="button" class="unit-bisnis-chart-tab-pill" id="tabBisnisSektor" data-chart-view="sektor">Sektor Klien</button>
                                <button type="button" class="unit-bisnis-chart-tab-pill" id="tabBisnisStatus" data-chart-view="status">Status Invoice</button>
                            </div>
                        </div>

                        <div class="w-full h-64 relative">
                            <div id="viewWrapBisnisPerUnit" class="unit-bisnis-chart-canvas-view active">
                                <canvas id="chartBisnisPerUnit"></canvas>
                            </div>
                            <div id="viewWrapBisnisSektor" class="unit-bisnis-chart-canvas-view">
                                <canvas id="chartBisnisSektor"></canvas>
                            </div>
                            <div id="viewWrapBisnisStatus" class="unit-bisnis-chart-canvas-view">
                                <canvas id="chartBisnisStatus"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-medium mt-2">
                        <span id="footerTopUnit"><i class="fa-solid fa-flask-vial text-purple-600 mr-1"></i>Top: -</span>
                        <span id="footerTopClient"><i class="fa-solid fa-industry text-amber-500 mr-1"></i>Klien: -</span>
                        <span id="footerSatisfaction"><i class="fa-solid fa-star text-teal-600 mr-1"></i>Status Transaksi: -</span>
                    </div>
                </div>
            </div>

</x-shared.section-card>
