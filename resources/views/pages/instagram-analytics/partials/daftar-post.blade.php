<!-- Section 2: Daftar Postingan & Performa Konten Instagram (Standar Dosen & Dashboard) -->
<x-shared.section-card title="Katalog &amp; Performa Postingan Instagram" icon="fa-solid fa-photo-film" sectionClass="section-ig">
            
            <!-- Toolbar: Search Box, Reels Button, & Per Page Selector -->
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 w-full">
                <div class="relative min-w-[280px] flex-1 max-w-md">
                    <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-200 text-xs"></i>
                    <input type="text" id="searchIgInput" placeholder="Cari caption, hashtag, atau topik postingan..." class="search-ig-input" />
                </div>

                <div class="flex flex-wrap items-center gap-3">
                    <button type="button" id="btnAnalisisReelsIg" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs shadow-xs border border-white/25 backdrop-blur-md transition active:scale-95 cursor-pointer">
                        <i class="fa-solid fa-clapperboard text-amber-300"></i>
                        <span>Analisis Top Reels Viral</span>
                    </button>

                    <div class="flex items-center gap-2 text-white text-xs font-semibold">
                        <span class="text-purple-200">Tampilkan</span>
                        <div class="table-pagesize-dropdown" id="wrapPageSizeIg">
                            <input type="hidden" id="pageSizeIg" value="10">
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

            <!-- Format Tabs Track (Frosted Glass Track matching Dosen) -->
            <div class="p-2 sm:p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-full overflow-x-auto no-scrollbar shadow-inner shadow-white/5 flex items-center gap-2" id="dataIgFormatTabs">
                <button type="button" class="btn-data-ig-tab active" data-format-target="semua">Semua Format</button>
                <button type="button" class="btn-data-ig-tab" data-format-target="reels">
                    <i class="fa-solid fa-play text-xs mr-1"></i> Reels Video
                </button>
                <button type="button" class="btn-data-ig-tab" data-format-target="carousel">
                    <i class="fa-solid fa-clone text-xs mr-1"></i> Carousel Post
                </button>
                <button type="button" class="btn-data-ig-tab" data-format-target="feed">
                    <i class="fa-solid fa-image text-xs mr-1"></i> Single Feed
                </button>
                <button type="button" class="btn-data-ig-tab" data-format-target="story">
                    <i class="fa-solid fa-circle-dot text-xs mr-1"></i> Story Highlights
                </button>
            </div>

            <!-- Topik Filter Bar & Count Badge -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white">
                <div class="flex items-center gap-2 flex-wrap" id="igTopikFilterGroup">
                    <span class="text-xs font-bold text-purple-200">Topik:</span>
                    <button type="button" class="btn-data-topik-pill active" data-topik-target="semua">
                        <i class="fa-solid fa-layer-group text-xs"></i>
                        <span>Semua Topik</span>
                    </button>
                    <button type="button" class="btn-data-topik-pill" data-topik-target="akademik">
                        <i class="fa-solid fa-graduation-cap text-xs"></i>
                        <span>Akademik &amp; Perkuliahan</span>
                    </button>
                    <button type="button" class="btn-data-topik-pill" data-topik-target="prestasi">
                        <i class="fa-solid fa-trophy text-xs"></i>
                        <span>Prestasi FMIPA</span>
                    </button>
                    <button type="button" class="btn-data-topik-pill" data-topik-target="kampus">
                        <i class="fa-solid fa-landmark text-xs"></i>
                        <span>Kampus &amp; Ormawa</span>
                    </button>
                    <button type="button" class="btn-data-topik-pill" data-topik-target="pmb">
                        <i class="fa-solid fa-user-plus text-xs"></i>
                        <span>Info PMB &amp; Dekanat</span>
                    </button>
                </div>

                <div id="labelIgCountBadge" class="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-bold text-white shadow-xs">
                    0 Postingan Teranalisis
                </div>
            </div>

            <!-- Tabel Data Postingan Instagram (White Card Container matching Dosen) -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs" id="tabelDataIg">
                        <thead>
                            <tr class="bg-slate-50 border-b border-gray-200 text-gray-600 uppercase text-[10.5px] font-bold tracking-wider whitespace-nowrap">
                                <th class="py-3 px-3 text-center w-10">No</th>
                                <th class="py-3 px-3">Tanggal Unggah</th>
                                <th class="py-3 px-3">Format</th>
                                <th class="py-3 px-4 min-w-[260px]">Caption &amp; Pratinjau Konten</th>
                                <th class="py-3 px-3">Topik</th>
                                <th class="py-3 px-3 text-right">Jangkauan (Reach)</th>
                                <th class="py-3 px-3 text-right">Suka (Likes)</th>
                                <th class="py-3 px-3 text-right">Komentar</th>
                                <th class="py-3 px-3 text-right">Simpan (Saves)</th>
                                <th class="py-3 px-3 text-center">Engagement Rate</th>
                                <th class="py-3 px-3 text-center w-24">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 font-medium text-gray-700" id="tbodyIg">
                            <!-- Populated dynamically via instagram-analytics.js -->
                        </tbody>
                    </table>
                </div>

                <!-- Footer Pagination matching Dosen -->
                <div class="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 bg-gray-50/50">
                    <div id="tableInfoIg">Menampilkan 0 data</div>
                    <div class="flex items-center gap-1.5" id="paginationIg">
                        <!-- Populated dynamically -->
                    </div>
                </div>
            </div>

</x-shared.section-card>
