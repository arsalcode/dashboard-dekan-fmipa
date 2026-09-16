<!-- Section 2: Katalog Agenda & Rekap Partisipasi (Standar Dosen & Dashboard) -->
<x-shared.section-card title="Katalog Agenda &amp; Rekap Partisipasi" icon="fa-solid fa-users-line" sectionClass="section-partisipasi">
            
            <!-- Toolbar: Search Box, Monitoring Button, & Per Page Selector -->
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 w-full">
                <div class="relative min-w-[280px] flex-1 max-w-md">
                    <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-200 text-xs"></i>
                    <input type="text" id="searchPartisipasiInput" placeholder="Cari agenda kegiatan, penyelenggara, atau kata kunci..." class="search-partisipasi-input" />
                </div>

                <div class="flex flex-wrap items-center gap-3">
                    <button type="button" id="btnMonitoringPartisipasi" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs shadow-xs border border-white/25 backdrop-blur-md transition active:scale-95 cursor-pointer">
                        <i class="fa-solid fa-ranking-star text-amber-300"></i>
                        <span>Monitoring Keaktifan Ormawa</span>
                    </button>

                    <div class="flex items-center gap-2 text-white text-xs font-semibold">
                        <span class="text-purple-200">Tampilkan</span>
                        <div class="table-pagesize-dropdown" id="wrapPageSizePartisipasi">
                            <input type="hidden" id="pageSizePartisipasi" value="10">
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

            <!-- Program Studi Tabs Track (Frosted Glass Track matching Dosen) -->
            <div class="p-2 sm:p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-full overflow-x-auto no-scrollbar shadow-inner shadow-white/5 flex items-center gap-2" id="dataPartisipasiProdiTabs">
                <button type="button" class="btn-data-partisipasi-tab active" data-prodi-target="semua">Semua Program Studi</button>
                <button type="button" class="btn-data-partisipasi-tab" data-prodi-target="Ilmu Komputer">Ilmu Komputer</button>
                <button type="button" class="btn-data-partisipasi-tab" data-prodi-target="Farmasi">Farmasi</button>
                <button type="button" class="btn-data-partisipasi-tab" data-prodi-target="Biologi">Biologi</button>
                <button type="button" class="btn-data-partisipasi-tab" data-prodi-target="Kimia">Kimia</button>
                <button type="button" class="btn-data-partisipasi-tab" data-prodi-target="Matematika">Matematika</button>
            </div>

            <!-- Kategori Kegiatan Filter Bar & Count Badge -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white">
                <div class="flex items-center gap-2 flex-wrap" id="partisipasiKategoriFilterGroup">
                    <span class="text-xs font-bold text-purple-200">Kategori:</span>
                    <button type="button" class="btn-data-kategori-pill active" data-kategori-target="semua">
                        <i class="fa-solid fa-layer-group text-xs"></i>
                        <span>Semua Kategori</span>
                    </button>
                    <button type="button" class="btn-data-kategori-pill" data-kategori-target="ormawa">
                        <i class="fa-solid fa-people-roof text-xs"></i>
                        <span>Ormawa &amp; Kampus</span>
                    </button>
                    <button type="button" class="btn-data-kategori-pill" data-kategori-target="lomba">
                        <i class="fa-solid fa-trophy text-xs"></i>
                        <span>Lomba &amp; Prestasi</span>
                    </button>
                    <button type="button" class="btn-data-kategori-pill" data-kategori-target="mbkm">
                        <i class="fa-solid fa-briefcase text-xs"></i>
                        <span>Program MBKM</span>
                    </button>
                    <button type="button" class="btn-data-kategori-pill" data-kategori-target="seminar">
                        <i class="fa-solid fa-chalkboard-user text-xs"></i>
                        <span>Seminar / Workshop</span>
                    </button>
                    <button type="button" class="btn-data-kategori-pill" data-kategori-target="edom">
                        <i class="fa-solid fa-square-poll-vertical text-xs"></i>
                        <span>Evaluasi EDOM</span>
                    </button>
                </div>

                <div id="labelPartisipasiCountBadge" class="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-bold text-white shadow-xs">
                    18 Agenda Terdata
                </div>
            </div>

            <!-- Tabel Data Partisipasi (White Card Container matching Dosen) -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs" id="tabelDataPartisipasi">
                        <thead>
                            <tr class="bg-slate-50 border-b border-gray-200 text-gray-600 uppercase text-[10.5px] font-bold tracking-wider whitespace-nowrap">
                                <th class="py-3 px-3 text-center w-10">No</th>
                                <th class="py-3 px-3">Tanggal Pelaksanaan</th>
                                <th class="py-3 px-4 min-w-[220px]">Nama Agenda / Kegiatan</th>
                                <th class="py-3 px-3 text-center">Kategori</th>
                                <th class="py-3 px-3.5">Penyelenggara / Hima</th>
                                <th class="py-3 px-3 text-right">Target</th>
                                <th class="py-3 px-3 text-right">Realisasi Hadir</th>
                                <th class="py-3 px-3 text-center">Tingkat Partisipasi</th>
                                <th class="py-3 px-3">Prodi Dominan</th>
                                <th class="py-3 px-3 text-center">Status</th>
                                <th class="py-3 px-3 text-center w-24">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 font-medium text-gray-700" id="tbodyPartisipasi">
                            <!-- Populated dynamically via partisipasi.js -->
                        </tbody>
                    </table>
                </div>

                <!-- Footer Pagination matching Dosen -->
                <div class="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 bg-gray-50/50">
                    <div id="tableInfoPartisipasi">Menampilkan 1 - 10 dari 18 data</div>
                    <div class="flex items-center gap-1.5" id="paginationPartisipasi">
                        <!-- Populated dynamically -->
                    </div>
                </div>
            </div>

</x-shared.section-card>
