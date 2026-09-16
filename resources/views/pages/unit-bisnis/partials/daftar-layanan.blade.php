<!-- Section 2: Katalog Layanan & Kontrak Transaksi Bisnis (Standar Dosen & Dashboard) -->
<x-shared.section-card title="Katalog Layanan &amp; Kontrak Transaksi" icon="fa-solid fa-cash-register" sectionClass="section-unit-bisnis">
            
            <!-- Toolbar: Search Box, Contract Monitoring Button, & Per Page Selector -->
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 w-full">
                <div class="relative min-w-[280px] flex-1 max-w-md">
                    <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-200 text-xs"></i>
                    <input type="text" id="searchBisnisInput" placeholder="Cari klien mitra, no. invoice, atau paket layanan..." class="search-bisnis-input" />
                </div>

                <div class="flex flex-wrap items-center gap-3">
                    <button type="button" id="btnMonitoringKontrakBisnis" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs shadow-xs border border-white/25 backdrop-blur-md transition active:scale-95 cursor-pointer">
                        <i class="fa-solid fa-clipboard-check text-amber-300"></i>
                        <span>Monitoring Kontrak Berjalan</span>
                    </button>

                    <div class="flex items-center gap-2 text-white text-xs font-semibold">
                        <span class="text-purple-200">Tampilkan</span>
                        <div class="table-pagesize-dropdown" id="wrapPageSizeBisnis">
                            <input type="hidden" id="pageSizeBisnis" value="10">
                            <button type="button" class="table-pagesize-btn" aria-haspopup="true" aria-expanded="false" title="Pilih data per halaman">
                                <span class="table-pagesize-label">10</span>
                                <i class="fa-solid fa-chevron-down chevron-icon"></i>
                            </button>
                            <div class="table-pagesize-menu">
                                <button type="button" class="table-pagesize-item is-active" data-value="10">10</button>
                                <button type="button" class="table-pagesize-item" data-value="25">25</button>
                                <button type="button" class="table-pagesize-item" data-value="50">50</button>
                            </div>
                        </div>
                        <span class="text-purple-200">data</span>
                    </div>
                </div>
            </div>

            <!-- Unit Bisnis Tabs Track (Frosted Glass Track matching Dosen) -->
            <div class="p-2 sm:p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-full overflow-x-auto no-scrollbar shadow-inner shadow-white/5 flex items-center gap-2" id="dataBisnisUnitTabs">
                <button type="button" class="btn-data-bisnis-tab active" data-unit-target="semua">Semua Unit Bisnis</button>
                <button type="button" class="btn-data-bisnis-tab" data-unit-target="lab">
                    <i class="fa-solid fa-flask-vial text-xs mr-1 text-teal-300"></i> Lab Terpadu ISO 17025
                </button>
                <button type="button" class="btn-data-bisnis-tab" data-unit-target="it">
                    <i class="fa-solid fa-laptop-code text-xs mr-1 text-amber-300"></i> IT &amp; Software House
                </button>
                <button type="button" class="btn-data-bisnis-tab" data-unit-target="training">
                    <i class="fa-solid fa-certificate text-xs mr-1 text-blue-300"></i> Training Center &amp; Sertifikasi
                </button>
                <button type="button" class="btn-data-bisnis-tab" data-unit-target="herbal">
                    <i class="fa-solid fa-leaf text-xs mr-1 text-emerald-300"></i> Produksi Herbal &amp; Biotek
                </button>
            </div>

            <!-- Kategori Layanan Filter Bar & Count Badge -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white">
                <div class="flex items-center gap-2 flex-wrap" id="bisnisKategoriFilterGroup">
                    <span class="text-xs font-bold text-purple-200">Kategori Layanan:</span>
                    <button type="button" class="btn-data-kategori-pill active" data-kategori-target="semua">
                        <i class="fa-solid fa-layer-group text-xs"></i>
                        <span>Semua Layanan</span>
                    </button>
                    <button type="button" class="btn-data-kategori-pill" data-kategori-target="uji_lab">
                        <i class="fa-solid fa-microscope text-xs"></i>
                        <span>Uji Sampel Lab</span>
                    </button>
                    <button type="button" class="btn-data-kategori-pill" data-kategori-target="sistem_it">
                        <i class="fa-solid fa-code text-xs"></i>
                        <span>Pengembangan Sistem IT</span>
                    </button>
                    <button type="button" class="btn-data-kategori-pill" data-kategori-target="training_kursus">
                        <i class="fa-solid fa-chalkboard-user text-xs"></i>
                        <span>Pelatihan &amp; Workshop</span>
                    </button>
                    <button type="button" class="btn-data-kategori-pill" data-kategori-target="produk_riset">
                        <i class="fa-solid fa-box-open text-xs"></i>
                        <span>Produk Riset Komersial</span>
                    </button>
                </div>

                <div id="labelBisnisCountBadge" class="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-bold text-white shadow-xs">
                    0 Kontrak Transaksi
                </div>
            </div>

            <!-- Tabel Data Layanan Unit Bisnis (White Card Container matching Dosen) -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs" id="tabelDataBisnis">
                        <thead>
                            <tr class="bg-slate-50 border-b border-gray-200 text-gray-600 uppercase text-[10.5px] font-bold tracking-wider whitespace-nowrap">
                                <th class="py-3 px-3 text-center w-10">No</th>
                                <th class="py-3 px-3">No. Invoice / SPK</th>
                                <th class="py-3 px-4 min-w-[200px]">Mitra / Klien Pemesan</th>
                                <th class="py-3 px-3">Unit Pelaksana</th>
                                <th class="py-3 px-3.5 min-w-[180px]">Nama Layanan / Proyek</th>
                                <th class="py-3 px-3 text-right">Nilai Kontrak</th>
                                <th class="py-3 px-3 text-right">Profit Bersih</th>
                                <th class="py-3 px-3">Tanggal Kontrak</th>
                                <th class="py-3 px-3 text-center">Status Pembayaran</th>
                                <th class="py-3 px-3 text-center w-24">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 font-medium text-gray-700" id="tbodyBisnis">
                            <!-- Populated dynamically via unit-bisnis.js -->
                        </tbody>
                    </table>
                </div>

                <!-- Footer Pagination matching Dosen -->
                <div class="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 bg-gray-50/50">
                    <div id="tableInfoBisnis">Menampilkan 0 data</div>
                    <div class="flex items-center gap-1.5" id="paginationBisnis">
                        <!-- Populated dynamically -->
                    </div>
                </div>
            </div>

</x-shared.section-card>
