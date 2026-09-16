<!-- Section 2: Katalog Dokumen Kerjasama & Mitra FMIPA (Standar Dosen & Dashboard) -->
<x-shared.section-card title="Katalog Dokumen Kerjasama &amp; Mitra" icon="fa-solid fa-file-signature" sectionClass="section-kerjasama">
            
            <!-- Top Toolbar: Actions, Upload, Template, Export & Search -->
            <x-shared.data-toolbar 
                module="kerjasama" 
                searchId="searchKerjasamaInput" 
                searchPlaceholder="Cari nama mitra, nomor dokumen, atau ruang lingkup..." 
                prefix="ExportKerjasama" 
                btnClass="btn-export-kerjasama"
                :showPageSize="true"
                pageSizeId="pageSizeKerjasama"
                pageSizeWrapId="wrapPageSizeKerjasama"
            />

            <!-- Sektor Mitra Tabs Track (Frosted Glass Track matching Dosen) -->
            <div class="p-2 sm:p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-full overflow-x-auto no-scrollbar shadow-inner shadow-white/5 flex items-center gap-2" id="dataKerjasamaSektorTabs">
                <button type="button" class="btn-data-kerjasama-tab active" data-sektor-target="semua">Semua Mitra</button>
                <button type="button" class="btn-data-kerjasama-tab" data-sektor-target="industri">
                    <i class="fa-solid fa-industry text-xs mr-1 text-amber-300"></i> Dunia Industri / BUMN
                </button>
                <button type="button" class="btn-data-kerjasama-tab" data-sektor-target="universitas">
                    <i class="fa-solid fa-graduation-cap text-xs mr-1 text-teal-300"></i> Perguruan Tinggi
                </button>
                <button type="button" class="btn-data-kerjasama-tab" data-sektor-target="pemerintah">
                    <i class="fa-solid fa-landmark text-xs mr-1 text-purple-300"></i> Pemerintah &amp; Riset
                </button>
                <button type="button" class="btn-data-kerjasama-tab" data-sektor-target="internasional">
                    <i class="fa-solid fa-earth-americas text-xs mr-1 text-pink-300"></i> Internasional
                </button>
            </div>

            <!-- Jenis Dokumen Filter Bar & Count Badge -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white">
                <div class="flex items-center gap-2 flex-wrap" id="kerjasamaJenisFilterGroup">
                    <span class="text-xs font-bold text-purple-200">Jenis Dokumen:</span>
                    <button type="button" class="btn-data-jenis-pill active" data-jenis-target="semua">
                        <i class="fa-solid fa-layer-group text-xs"></i>
                        <span>Semua Jenis</span>
                    </button>
                    <button type="button" class="btn-data-jenis-pill" data-jenis-target="mou">
                        <i class="fa-solid fa-handshake-simple text-xs"></i>
                        <span>MoU (Kesepahaman)</span>
                    </button>
                    <button type="button" class="btn-data-jenis-pill" data-jenis-target="moa">
                        <i class="fa-solid fa-file-contract text-xs"></i>
                        <span>MoA (Perjanjian Kerjasama)</span>
                    </button>
                    <button type="button" class="btn-data-jenis-pill" data-jenis-target="ia">
                        <i class="fa-solid fa-list-check text-xs"></i>
                        <span>IA (Implementasi Kerja)</span>
                    </button>
                </div>

                <div id="labelKerjasamaCountBadge" class="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-bold text-white shadow-xs">
                    48 Dokumen Terdata
                </div>
            </div>

            <!-- Tabel Data Kerjasama (White Card Container matching Dosen) -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs" id="tabelDataKerjasama">
                        <thead>
                            <tr class="bg-slate-50 border-b border-gray-200 text-gray-600 uppercase text-[10.5px] font-bold tracking-wider whitespace-nowrap">
                                <th class="py-3 px-3 text-center w-10">No</th>
                                <th class="py-3 px-3">No. Dokumen</th>
                                <th class="py-3 px-4 min-w-[200px]">Instansi / Mitra Kerjasama</th>
                                <th class="py-3 px-3 text-center">Jenis</th>
                                <th class="py-3 px-3.5 min-w-[170px]">Ruang Lingkup Kegiatan</th>
                                <th class="py-3 px-3 text-center">Tingkat</th>
                                <th class="py-3 px-3">Masa Berlaku</th>
                                <th class="py-3 px-3">Prodi / PIC</th>
                                <th class="py-3 px-3 text-center">Status</th>
                                <th class="py-3 px-3 text-center w-24">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 font-medium text-gray-700" id="tbodyKerjasama">
                            <!-- Populated dynamically via kerjasama.js -->
                        </tbody>
                    </table>
                </div>

                <!-- Footer Pagination matching Dosen -->
                <div class="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 bg-gray-50/50">
                    <div id="tableInfoKerjasama">Menampilkan 1 - 10 dari 48 data</div>
                    <div class="flex items-center gap-1.5" id="paginationKerjasama">
                        <!-- Populated dynamically -->
                    </div>
                </div>
            </div>

</x-shared.section-card>
