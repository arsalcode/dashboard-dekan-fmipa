<!-- Section 4: Data Dosen FMIPA Per Prodi -->
<x-shared.section-card title="Data Dosen FMIPA Per Prodi" icon="fa-solid fa-id-card-clip" sectionClass="section-dosen">
            
            <!-- Toolbar Atas: Search Box, Input/Import Data, & Export Buttons -->
            <x-shared.data-toolbar 
                module="dosen" 
                searchId="searchDosenInput" 
                searchPlaceholder="Cari berdasarkan nama dosen, NIDN, atau jabatan..." 
                prefix="Export" 
                btnClass="btn-export-dosen" 
            />

            <!-- Prodi Tabs Track (Frosted Glass Track like Dashboard) -->
            <div class="p-2 sm:p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-full overflow-x-auto no-scrollbar shadow-inner shadow-white/5 flex items-center gap-2" id="dataDosenProdiTabs">
                <button type="button" class="btn-data-prodi-tab active" data-prodi-target="biologi">Biologi</button>
                <button type="button" class="btn-data-prodi-tab" data-prodi-target="kimia">Kimia</button>
                <button type="button" class="btn-data-prodi-tab" data-prodi-target="matematika">Matematika</button>
                <button type="button" class="btn-data-prodi-tab" data-prodi-target="ilmu-komputer">Ilmu Komputer</button>
                <button type="button" class="btn-data-prodi-tab" data-prodi-target="farmasi">Farmasi</button>
                <button type="button" class="btn-data-prodi-tab" data-prodi-target="ppa">Profesi Apoteker</button>
                <button type="button" class="btn-data-prodi-tab" data-prodi-target="lainnya">
                    <i class="fa-solid fa-tags text-[11px]"></i>
                    <span>Lainnya</span>
                </button>
            </div>

            <!-- Kategori Filter Bar & Count Badge -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white">
                <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs font-bold text-purple-200">Kategori:</span>
                    <button type="button" class="btn-data-kategori-pill active" data-kategori-target="homebase">
                        <i class="fa-solid fa-house text-xs"></i>
                        <span>Dosen Homebase</span>
                    </button>
                    <button type="button" class="btn-data-kategori-pill" data-kategori-target="rasio">
                        <i class="fa-solid fa-chart-pie text-xs"></i>
                        <span>Penghitung Rasio</span>
                    </button>
                </div>

                <div id="labelDosenCountBadge" class="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-bold text-white shadow-xs">
                    0 Dosen Homebase di Biologi
                </div>
            </div>

            <!-- Tabel Data Dosen (White Card Container) -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs" id="tabelDataDosenFmipa">
                        <thead>
                            <tr class="bg-slate-50 border-b border-gray-200 text-gray-600 uppercase text-[10.5px] font-bold tracking-wider">
                                <th class="py-3 px-3.5 text-center w-12">No</th>
                                <th class="py-3 px-4">Nama Dosen</th>
                                <th class="py-3 px-3 text-center">Gender</th>
                                <th class="py-3 px-3.5">NIDN</th>
                                <th class="py-3 px-3 text-center">NIDK</th>
                                <th class="py-3 px-3 text-center">Status</th>
                                <th class="py-3 px-4">Sertifikasi</th>
                                <th class="py-3 px-4">Jabatan Akademik</th>
                                <th class="py-3 px-3.5">Strata</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 font-medium text-gray-700" id="tabelDataDosenBody">
                            <!-- Populated dynamically by dosen-charts.js -->
                            <tr>
                                <td colspan="9" class="py-10 text-center text-slate-400">
                                    <div class="flex flex-col items-center justify-center gap-2">
                                        <div class="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#722F99] border border-purple-100 shadow-inner">
                                            <i class="fa-solid fa-folder-open text-xl"></i>
                                        </div>
                                        <p class="font-bold text-slate-700 text-xs mt-1">Belum Ada Data Dosen Tersimpan</p>
                                        <p class="text-[11px] text-slate-400">Silakan gunakan tombol "Import Excel" atau "Tambah Data Manual" untuk memuat daftar dosen.</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

</x-shared.section-card>
