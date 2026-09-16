<!-- Section 2: Daftar Publikasi Konten & Berita FMIPA (Standar Dosen & Dashboard) -->
<x-shared.section-card title="Publikasi Berita &amp; Konten Multi-Kanal" icon="fa-solid fa-newspaper" sectionClass="section-web">
            
            <!-- Toolbar: Search Box, SEO Audit Button, & Per Page Selector -->
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 w-full">
                <div class="relative min-w-[280px] flex-1 max-w-md">
                    <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-200 text-xs"></i>
                    <input type="text" id="searchWebInput" placeholder="Cari judul artikel, penulis, atau kata kunci..." class="search-web-input" />
                </div>

                <div class="flex flex-wrap items-center gap-3">
                    <button type="button" id="btnAuditSeo" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs shadow-xs border border-white/25 backdrop-blur-md transition active:scale-95 cursor-pointer">
                        <i class="fa-solid fa-magnifying-glass-chart text-amber-300"></i>
                        <span>Audit SEO &amp; Broken Links</span>
                    </button>

                    <div class="flex items-center gap-2 text-white text-xs font-semibold">
                        <span class="text-purple-200">Tampilkan</span>
                        <div class="table-pagesize-dropdown" id="wrapPageSizeWeb">
                            <input type="hidden" id="pageSizeWeb" value="10">
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

            <!-- Kanal Tabs Track (Frosted Glass Track matching Dosen) -->
            <div class="p-2 sm:p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-full overflow-x-auto no-scrollbar shadow-inner shadow-white/5 flex items-center gap-2" id="dataWebKanalTabs">
                <button type="button" class="btn-data-prodi-tab active" data-kanal-target="semua">Semua Kanal</button>
                <button type="button" class="btn-data-prodi-tab" data-kanal-target="website">
                    <i class="fa-solid fa-globe text-xs mr-1"></i> Website FMIPA
                </button>
                <button type="button" class="btn-data-prodi-tab" data-kanal-target="instagram">
                    <i class="fa-brands fa-instagram text-xs mr-1"></i> Instagram
                </button>
                <button type="button" class="btn-data-prodi-tab" data-kanal-target="youtube">
                    <i class="fa-brands fa-youtube text-xs mr-1"></i> YouTube
                </button>
                <button type="button" class="btn-data-prodi-tab" data-kanal-target="linkedin">
                    <i class="fa-brands fa-linkedin text-xs mr-1"></i> LinkedIn
                </button>
                <button type="button" class="btn-data-prodi-tab" data-kanal-target="tiktok">
                    <i class="fa-brands fa-tiktok text-xs mr-1"></i> TikTok
                </button>
            </div>

            <!-- Kategori Filter Bar & Count Badge -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white">
                <div class="flex items-center gap-2 flex-wrap" id="webKategoriFilterGroup">
                    <span class="text-xs font-bold text-purple-200">Kategori:</span>
                    <button type="button" class="btn-data-kategori-pill active" data-kategori-target="semua">
                        <i class="fa-solid fa-layer-group text-xs"></i>
                        <span>Semua Kategori</span>
                    </button>
                    <button type="button" class="btn-data-kategori-pill" data-kategori-target="akademik">
                        <i class="fa-solid fa-graduation-cap text-xs"></i>
                        <span>Akademik &amp; Riset</span>
                    </button>
                    <button type="button" class="btn-data-kategori-pill" data-kategori-target="prestasi">
                        <i class="fa-solid fa-trophy text-xs"></i>
                        <span>Prestasi Mahasiswa</span>
                    </button>
                    <button type="button" class="btn-data-kategori-pill" data-kategori-target="event">
                        <i class="fa-solid fa-calendar-check text-xs"></i>
                        <span>Event &amp; Seminar</span>
                    </button>
                    <button type="button" class="btn-data-kategori-pill" data-kategori-target="pengumuman">
                        <i class="fa-solid fa-bullhorn text-xs"></i>
                        <span>Pengumuman</span>
                    </button>
                </div>

                <div id="labelWebCountBadge" class="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-bold text-white shadow-xs">
                    142 Konten Terpublikasi
                </div>
            </div>

            <!-- Tabel Data Publikasi Konten (White Card Container matching Dosen) -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs" id="tabelDataWeb">
                        <thead>
                            <tr class="bg-slate-50 border-b border-gray-200 text-gray-600 uppercase text-[10.5px] font-bold tracking-wider whitespace-nowrap">
                                <th class="py-3 px-3 text-center w-10">No</th>
                                <th class="py-3 px-3">Tanggal Tayang</th>
                                <th class="py-3 px-3">Kanal</th>
                                <th class="py-3 px-4 min-w-[240px]">Judul Berita / Konten</th>
                                <th class="py-3 px-3.5">Penulis / Admin</th>
                                <th class="py-3 px-3">Kategori</th>
                                <th class="py-3 px-3 text-right">Tayangan / Reach</th>
                                <th class="py-3 px-3 text-center">Interaksi (Engage)</th>
                                <th class="py-3 px-3 text-center">Status</th>
                                <th class="py-3 px-3 text-center w-24">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 font-medium text-gray-700" id="tbodyWeb">
                            <!-- Populated dynamically via web-medsos.js -->
                        </tbody>
                    </table>
                </div>

                <!-- Footer Pagination matching Dosen -->
                <div class="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 bg-gray-50/50">
                    <div id="tableInfoWeb">Menampilkan 1 - 10 dari 142 data</div>
                    <div class="flex items-center gap-1.5" id="paginationWeb">
                        <!-- Populated dynamically -->
                    </div>
                </div>
            </div>

</x-shared.section-card>
