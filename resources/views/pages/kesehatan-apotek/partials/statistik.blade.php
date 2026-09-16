<!-- Section 1: Statistik & Kinerja Finansial Kesehatan & Apotek FMIPA (Standar Dashboard Dekan) -->
<x-shared.section-card title="Statistik &amp; Finansial Kesehatan &amp; Apotek" icon="fa-solid fa-clinic-medical" sectionClass="section-apotek">
            
            <!-- Alert Notice Banner -->
            <div class="bg-white/10 backdrop-blur-md border border-white/25 rounded-xl p-3.5 flex items-start gap-3 text-white text-xs">
                <span class="w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    <i class="fa-solid fa-mortar-pestle text-amber-300"></i>
                </span>
                <div class="leading-relaxed">
                    <strong class="font-bold text-amber-300">Unit Bisnis Apotek Pendidikan &amp; Layanan Kesehatan FMIPA:</strong> Integrasi fasilitas laboratorium farmasi dan apotek pendidikan melayani pengadaan obat esensial, produk fitofarmaka herbal berbasis riset tanaman obat, konseling apoteker, dan pemeriksaan kesehatan terpadu.
                </div>
            </div>

            <!-- 4 Stat Cards Row (Komponen Standar Dashboard Dekan) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <x-shared.stat-card
                    title="Total Transaksi Apotek"
                    value="0"
                    subtext="Belum ada data"
                    valueId="valApotekTransaksi"
                    subtextId="subApotekTransaksi"
                />
                <x-shared.stat-card
                    title="Omzet Penjualan & Layanan"
                    value="Rp 0"
                    subtext="Belum ada data"
                    valueId="valApotekOmzet"
                    subtextId="subApotekOmzet"
                />
                <x-shared.stat-card
                    title="Total SKU Produk & Obat"
                    value="0"
                    subtext="Belum ada data"
                    valueId="valApotekSku"
                    subtextId="subApotekSku"
                />
                <x-shared.stat-card
                    title="Kunjungan Pasien / Sivitas"
                    value="0"
                    subtext="Belum ada data"
                    valueId="valApotekPasien"
                    subtextId="subApotekPasien"
                />
            </div>

            <!-- Charts Container (White Card) -->
            <div class="bg-white rounded-2xl p-6 shadow-lg text-slate-800">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <!-- Chart 1: Tren Omzet & Transaksi Bulanan (Col 7) -->
                    <div class="lg:col-span-7 flex flex-col">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="font-bold text-slate-800 text-base">Tren Omzet &amp; Volume Transaksi 2026</h3>
                                <p class="text-xs text-slate-500">Pertumbuhan pendapatan penjualan apotek (Juta Rp) dan total nota transaksi</p>
                            </div>
                            <div class="flex items-center gap-3 text-xs">
                                <span class="flex items-center gap-1.5">
                                    <span class="w-3 h-3 rounded-full bg-[#722F99]"></span>
                                    <span class="text-slate-600 font-medium">Omzet (Jt)</span>
                                </span>
                                <span class="flex items-center gap-1.5">
                                    <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
                                    <span class="text-slate-600 font-medium">Transaksi</span>
                                </span>
                            </div>
                        </div>
                        <div class="apotek-chart-canvas-wrap relative flex-1 min-h-[300px]">
                            <canvas id="chartApotekTren"></canvas>
                        </div>
                    </div>

                    <!-- Chart 2: Tabbed Breakdown (Col 5) -->
                    <div class="lg:col-span-5 flex flex-col border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-6 pt-4 lg:pt-0">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="font-bold text-slate-800 text-base">Distribusi Penjualan &amp; Pelanggan</h3>
                                <p class="text-xs text-slate-500">Proporsi kategori komoditas, segmen pembeli, dan stok</p>
                            </div>
                        </div>

                        <!-- Chart Tab Pills -->
                        <div class="apotek-chart-tab-pills flex items-center p-1 bg-slate-100/90 rounded-xl mb-4 text-xs font-semibold text-slate-600">
                            <button type="button" class="apotek-chart-tab-pill active flex-1 py-1.5 rounded-lg transition" id="tabApotekProduk" data-chart-view="produk">Kategori</button>
                            <button type="button" class="apotek-chart-tab-pill flex-1 py-1.5 rounded-lg transition" id="tabApotekPelanggan" data-chart-view="pelanggan">Pelanggan</button>
                            <button type="button" class="apotek-chart-tab-pill flex-1 py-1.5 rounded-lg transition" id="tabApotekStok" data-chart-view="stok">Status Stok</button>
                        </div>

                        <div class="apotek-chart-canvas-views relative flex-1 min-h-[260px] flex items-center justify-center">
                            <div id="viewWrapApotekProduk" class="apotek-chart-canvas-view active w-full h-full">
                                <canvas id="chartApotekProduk"></canvas>
                            </div>
                            <div id="viewWrapApotekPelanggan" class="apotek-chart-canvas-view hidden w-full h-full">
                                <canvas id="chartApotekPelanggan"></canvas>
                            </div>
                            <div id="viewWrapApotekStok" class="apotek-chart-canvas-view hidden w-full h-full">
                                <canvas id="chartApotekStok"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

</x-shared.section-card>
