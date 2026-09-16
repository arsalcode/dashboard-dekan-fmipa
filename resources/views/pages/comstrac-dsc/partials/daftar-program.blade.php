<!-- Section 2: Katalog Program & Kontrak Proyek IT (Standar Dashboard Dekan) -->
<x-shared.section-card title="Katalog Program &amp; Kontrak Proyek IT" icon="fa-solid fa-laptop-code" sectionClass="section-comstrac">
            
            <!-- Action Row -->
            <div class="flex flex-wrap items-center justify-between gap-3 w-full">
                <button type="button" id="btnKatalogSilabus" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs shadow-xs border border-white/25 backdrop-blur-md transition active:scale-95 cursor-pointer">
                    <i class="fa-solid fa-book-bookmark text-amber-300"></i>
                    <span>Katalog Silabus &amp; Pricing</span>
                </button>
            </div>

            <!-- Divisi Tabs Track (Frosted Glass Track like Dashboard) -->
            <div class="p-2 sm:p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-full overflow-x-auto no-scrollbar shadow-inner shadow-white/5 flex items-center gap-2" id="dataComstracDivisiTabs">
                <button type="button" class="tab-filter-comstrac active" data-divisi="semua">Semua Program &amp; Divisi</button>
                <button type="button" class="tab-filter-comstrac" data-divisi="bootcamp">Bootcamp &amp; Pelatihan IT</button>
                <button type="button" class="tab-filter-comstrac" data-divisi="bnsp">Sertifikasi BNSP / Vendor</button>
                <button type="button" class="tab-filter-comstrac" data-divisi="software">Software House &amp; Web App</button>
                <button type="button" class="tab-filter-comstrac" data-divisi="ai">Data Science &amp; AI Consulting</button>
            </div>

            <!-- Status Filter Pills & Row Count Badge -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white">
                <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs font-bold text-purple-200">Status:</span>
                    <button type="button" class="pill-status-comstrac active" data-status="semua">
                        <i class="fa-solid fa-list-check text-xs"></i>
                        <span>Semua Status</span>
                    </button>
                    <button type="button" class="pill-status-comstrac" data-status="buka">
                        <i class="fa-solid fa-door-open text-xs"></i>
                        <span>Pendaftaran Dibuka</span>
                    </button>
                    <button type="button" class="pill-status-comstrac" data-status="berjalan">
                        <i class="fa-solid fa-spinner text-xs"></i>
                        <span>Sedang Berjalan</span>
                    </button>
                    <button type="button" class="pill-status-comstrac" data-status="selesai">
                        <i class="fa-solid fa-check-double text-xs"></i>
                        <span>Selesai / Lulus</span>
                    </button>
                </div>

                <div id="badgeTotalComstracRows" class="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-bold text-white shadow-xs">
                    0 Program Terdaftar
                </div>
            </div>

            <!-- Table Container (White Card Container) -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50/50">
                    <div class="relative w-full sm:w-80">
                        <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                        <input type="text" id="searchComstracTabel" placeholder="Cari nama program, klien, teknologi..." class="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#722F99]/30 focus:border-[#722F99] bg-white text-slate-700">
                    </div>
                    <div class="flex items-center gap-2 self-end sm:self-auto">
                        <span class="text-xs text-slate-500 font-medium">Tampil:</span>
                        <select id="pageSizeComstrac" class="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 bg-white focus:ring-2 focus:ring-[#722F99]/30">
                            <option value="5">5 per hal</option>
                            <option value="10" selected>10 per hal</option>
                            <option value="20">20 per hal</option>
                        </select>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs sm:text-sm" id="tabelDataComstrac">
                        <thead>
                            <tr class="bg-gradient-to-r from-purple-50 to-slate-50 text-slate-700 font-bold border-b border-slate-200">
                                <th class="py-3.5 px-4 text-center w-12">No</th>
                                <th class="py-3.5 px-4">Kode &amp; Tanggal</th>
                                <th class="py-3.5 px-4">Nama Program / Proyek</th>
                                <th class="py-3.5 px-4">Divisi &amp; Kategori</th>
                                <th class="py-3.5 px-4">Klien / Peserta</th>
                                <th class="py-3.5 px-4 text-right">Nilai Kontrak (Rp)</th>
                                <th class="py-3.5 px-4 text-center">Status Batch</th>
                                <th class="py-3.5 px-4 text-center">Pembayaran</th>
                                <th class="py-3.5 px-4 text-center w-24">Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyComstracData" class="divide-y divide-slate-100 text-slate-700 font-medium">
                            <!-- Populated dynamically via comstrac-dsc.js -->
                        </tbody>
                    </table>
                </div>

                <!-- Table Pagination & Info -->
                <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-slate-100 bg-slate-50/50">
                    <div class="text-xs text-slate-500" id="infoPaginationComstrac">
                        Menampilkan 0 entri program
                    </div>
                    <div class="flex items-center gap-1" id="wrapPaginationComstrac">
                        <!-- Dynamic pagination buttons -->
                    </div>
                </div>
            </div>

</x-shared.section-card>
