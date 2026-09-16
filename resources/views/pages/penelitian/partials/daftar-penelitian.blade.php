<!-- Section 2: Daftar Penelitian & Riset FMIPA (Standar Dosen & Dashboard) -->
<x-shared.section-card title="Daftar Riset &amp; Penelitian FMIPA" icon="fa-solid fa-microscope" sectionClass="section-penelitian">
            
            <!-- Toolbar: Search Box, Aksi, & Per Page Selector -->
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 w-full pb-2 border-b border-white/15">
                <div class="relative min-w-[280px] flex-1 max-w-md">
                    <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-200 text-xs"></i>
                    <input type="text" id="searchPenelitian" placeholder="Cari berdasarkan judul riset, ketua peneliti, atau skema..." class="search-lit-input" />
                </div>

                <div class="flex items-center gap-3 flex-wrap">
                    <button type="button" id="btnSinkronSinta" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs shadow-xs border border-white/25 backdrop-blur-md transition active:scale-95 cursor-pointer">
                        <i class="fa-solid fa-arrows-rotate text-amber-300"></i>
                        <span>Sinkron SINTA / BIMA</span>
                    </button>

                <div class="flex items-center gap-2 text-white text-xs font-semibold">
                    <span class="text-purple-200">Tampilkan</span>
                    <div class="table-pagesize-dropdown" id="wrapPageSizePenelitian">
                        <input type="hidden" id="pageSizePenelitian" value="10">
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
                    <span class="text-purple-200">data per halaman</span>
                </div>
            </div>

            <!-- Prodi Tabs Track (Frosted Glass Track matching Dosen) -->
            <div class="p-2 sm:p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-full overflow-x-auto no-scrollbar shadow-inner shadow-white/5 flex items-center gap-2" id="dataLitProdiTabs">
                <button type="button" class="btn-data-prodi-tab active" data-prodi-target="semua">Semua Prodi</button>
                <button type="button" class="btn-data-prodi-tab" data-prodi-target="biologi">Biologi</button>
                <button type="button" class="btn-data-prodi-tab" data-prodi-target="kimia">Kimia</button>
                <button type="button" class="btn-data-prodi-tab" data-prodi-target="matematika">Matematika</button>
                <button type="button" class="btn-data-prodi-tab" data-prodi-target="ilmu-komputer">Ilmu Komputer</button>
                <button type="button" class="btn-data-prodi-tab" data-prodi-target="farmasi">Farmasi</button>
                <button type="button" class="btn-data-prodi-tab" data-prodi-target="profesi-apoteker">Profesi Apoteker</button>
            </div>

            <!-- Skema Filter Bar & Count Badge -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white">
                <div class="flex items-center gap-2 flex-wrap" id="litSkemaFilterGroup">
                    <span class="text-xs font-bold text-purple-200">Skema Riset:</span>
                    <button type="button" class="btn-data-kategori-pill active" data-skema-target="semua">
                        <i class="fa-solid fa-layer-group text-xs"></i>
                        <span>Semua Skema</span>
                    </button>
                    <button type="button" class="btn-data-kategori-pill" data-skema-target="nasional">
                        <i class="fa-solid fa-landmark text-xs"></i>
                        <span>Hibah Nasional BIMA</span>
                    </button>
                    <button type="button" class="btn-data-kategori-pill" data-skema-target="internal">
                        <i class="fa-solid fa-building-columns text-xs"></i>
                        <span>Internal LPPM UNPAK</span>
                    </button>
                    <button type="button" class="btn-data-kategori-pill" data-skema-target="kerjasama">
                        <i class="fa-solid fa-handshake-angle text-xs"></i>
                        <span>Kerjasama / Mandiri</span>
                    </button>
                </div>

                <div id="labelLitCountBadge" class="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-bold text-white shadow-xs">
                    68 Judul Riset Terdaftar
                </div>
            </div>

            <!-- Tabel Data Penelitian (White Card Container matching Dosen) -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs" id="tabelDataPenelitian">
                        <thead>
                            <tr class="bg-slate-50 border-b border-gray-200 text-gray-600 uppercase text-[10.5px] font-bold tracking-wider whitespace-nowrap">
                                <th class="py-3 px-3 text-center w-10">No</th>
                                <th class="py-3 px-3">Tahun</th>
                                <th class="py-3 px-3.5">Program Studi</th>
                                <th class="py-3 px-4 min-w-[240px]">Judul Penelitian</th>
                                <th class="py-3 px-3.5">Ketua Peneliti</th>
                                <th class="py-3 px-3.5">Anggota Tim</th>
                                <th class="py-3 px-3">Skema Hibah</th>
                                <th class="py-3 px-3 text-right">Dana Disetujui</th>
                                <th class="py-3 px-3.5">Target Luaran</th>
                                <th class="py-3 px-3 text-center">Status</th>
                                <th class="py-3 px-3 text-center w-24">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 font-medium text-gray-700" id="tbodyPenelitian">
                            <!-- Populated dynamically via penelitian.js -->
                        </tbody>
                    </table>
                </div>

                <!-- Footer Pagination matching Dosen -->
                <div class="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 bg-gray-50/50">
                    <div id="tableInfoPenelitian">Menampilkan 1 - 10 dari 68 data</div>
                    <div class="flex items-center gap-1.5" id="paginationPenelitian">
                        <!-- Populated dynamically -->
                    </div>
                </div>
            </div>

</x-shared.section-card>
