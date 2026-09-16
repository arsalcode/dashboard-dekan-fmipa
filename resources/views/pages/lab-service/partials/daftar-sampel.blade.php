<!-- Section 2: Antrean Sampel & Katalog Pengujian Terpadu (Standar Dashboard Dekan) -->
<x-shared.section-card title="Antrean Sampel &amp; Layanan Uji Lab" icon="fa-solid fa-flask-vial" sectionClass="section-labservice">
            
            <!-- Action Row -->
            <div class="flex flex-wrap items-center justify-between gap-3 w-full">
                <button type="button" id="btnKatalogTarifLab" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs shadow-xs border border-white/25 backdrop-blur-md transition active:scale-95 cursor-pointer">
                    <i class="fa-solid fa-clipboard-list text-amber-300"></i>
                    <span>Katalog Parameter &amp; Tarif Uji</span>
                </button>
            </div>

            <!-- Bidang Tabs Track (Frosted Glass Track like Dashboard) -->
            <div class="p-2 sm:p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-full overflow-x-auto no-scrollbar shadow-inner shadow-white/5 flex items-center gap-2" id="dataLabBidangTabs">
                <button type="button" class="tab-filter-lab active" data-bidang="semua">Semua Bidang Pengujian</button>
                <button type="button" class="tab-filter-lab" data-bidang="air">Kimia Air &amp; Limbah</button>
                <button type="button" class="tab-filter-lab" data-bidang="mikro">Mikrobiologi &amp; Pangan</button>
                <button type="button" class="tab-filter-lab" data-bidang="instrumen">Karakterisasi Bahan &amp; Farmasi</button>
                <button type="button" class="tab-filter-lab" data-bidang="kalibrasi">Kalibrasi &amp; Alat Ukur</button>
            </div>

            <!-- Status Filter Pills & Row Count Badge -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white">
                <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs font-bold text-purple-200">Status:</span>
                    <button type="button" class="pill-status-lab active" data-status="semua">
                        <i class="fa-solid fa-list-check text-xs"></i>
                        <span>Semua Status</span>
                    </button>
                    <button type="button" class="pill-status-lab" data-status="selesai">
                        <i class="fa-solid fa-circle-check text-xs"></i>
                        <span>LHU Terbit (Selesai)</span>
                    </button>
                    <button type="button" class="pill-status-lab" data-status="uji">
                        <i class="fa-solid fa-spinner text-xs"></i>
                        <span>Analisis Instrumen</span>
                    </button>
                    <button type="button" class="pill-status-lab" data-status="preparasi">
                        <i class="fa-solid fa-vial text-xs"></i>
                        <span>Preparasi Sampel</span>
                    </button>
                </div>

                <div id="badgeTotalLabRows" class="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-bold text-white shadow-xs">
                    0 Sampel Terdaftar
                </div>
            </div>

            <!-- Table Container (White Card Container) -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50/50">
                    <div class="relative w-full sm:w-80">
                        <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                        <input type="text" id="searchLabTabel" placeholder="Cari kode sampel, matriks, pengirim..." class="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#722F99]/30 focus:border-[#722F99] bg-white text-slate-700">
                    </div>
                    <div class="flex items-center gap-2 self-end sm:self-auto">
                        <span class="text-xs text-slate-500 font-medium">Tampil:</span>
                        <select id="pageSizeLab" class="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 bg-white focus:ring-2 focus:ring-[#722F99]/30">
                            <option value="5">5 per hal</option>
                            <option value="10" selected>10 per hal</option>
                            <option value="20">20 per hal</option>
                        </select>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs sm:text-sm min-w-[950px]" id="tabelDataLab">
                        <thead>
                            <tr class="bg-gradient-to-r from-purple-50 to-slate-50 text-slate-700 font-bold border-b border-slate-200">
                                <th class="py-3.5 px-4 text-center w-12">No</th>
                                <th class="py-3.5 px-4 min-w-[140px] whitespace-nowrap">No. Sampel &amp; Tgl</th>
                                <th class="py-3.5 px-4 min-w-[200px]">Nama Sampel &amp; Matriks</th>
                                <th class="py-3.5 px-4 min-w-[130px] whitespace-nowrap">Bidang Pengujian</th>
                                <th class="py-3.5 px-4 min-w-[150px]">Pengirim / Instansi</th>
                                <th class="py-3.5 px-4 min-w-[160px]">Parameter Utama</th>
                                <th class="py-3.5 px-4 text-right min-w-[110px] whitespace-nowrap">Biaya Uji (Rp)</th>
                                <th class="py-3.5 px-4 text-center min-w-[100px] whitespace-nowrap">Status</th>
                                <th class="py-3.5 px-4 text-center min-w-[110px] whitespace-nowrap">Pembayaran</th>
                                <th class="py-3.5 px-4 text-center w-24 min-w-[80px] whitespace-nowrap">Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyLabData" class="divide-y divide-slate-100 text-slate-700 font-medium">
                            <!-- Populated dynamically via lab-service.js -->
                        </tbody>
                    </table>
                </div>

                <!-- Table Pagination & Info -->
                <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-slate-100 bg-slate-50/50">
                    <div class="text-xs text-slate-500" id="infoPaginationLab">
                        Menampilkan 0 sampel teruji
                    </div>
                    <div class="flex items-center gap-1" id="wrapPaginationLab">
                        <!-- Dynamic pagination buttons -->
                    </div>
                </div>
            </div>

</x-shared.section-card>
