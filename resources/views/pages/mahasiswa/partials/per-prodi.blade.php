<!-- Section 3: Data Mahasiswa FMIPA Per Prodi (Sesuai Mockup Gambar) -->
<x-shared.section-card title="Data Mahasiswa FMIPA" icon="fa-solid fa-users" sectionClass="section-mahasiswa">
            
            <!-- Filter Prodi Tabs Pills (Frosted Glass Theme) -->
            <div class="data-mhs-prodi-tabs" id="dataMhsProdiTabs">
                <button type="button" class="btn-data-mhs-tab active" data-mhs-target="semua">Semua Prodi</button>
                <button type="button" class="btn-data-mhs-tab" data-mhs-target="biologi">Biologi</button>
                <button type="button" class="btn-data-mhs-tab" data-mhs-target="kimia">Kimia</button>
                <button type="button" class="btn-data-mhs-tab" data-mhs-target="matematika">Matematika</button>
                <button type="button" class="btn-data-mhs-tab" data-mhs-target="ilmu-komputer">Ilmu Komputer</button>
                <button type="button" class="btn-data-mhs-tab" data-mhs-target="farmasi">Farmasi</button>
                <button type="button" class="btn-data-mhs-tab" data-mhs-target="ppa">Profesi Apoteker</button>
            </div>

            <!-- White Card Table Container (Sesuai Tampilan Gambar Mockup) -->
            <div class="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-gray-100 text-gray-800">
                
                <!-- Card Header: Title & Actions Toolbar -->
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-gray-100">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 tracking-tight">Data Mahasiswa FMIPA</h3>
                        <p class="text-xs text-gray-500 font-normal mt-0.5">Klik nama untuk detail profil &amp; timeline</p>
                    </div>

                    <!-- Right Actions: Search Box & 4 Export Buttons -->
                    <div class="flex items-center gap-2.5 flex-wrap">

                        <!-- Search Box -->
                        <div class="relative w-full sm:w-64">
                            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none"></i>
                            <input 
                                type="text" 
                                id="searchMhsInput" 
                                placeholder="Cari mahasiswa..." 
                                class="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#722F99] focus:ring-1 focus:ring-[#722F99] transition"
                            />
                        </div>
                    </div>
                </div>

                <!-- Table Container with Sorting Headers -->
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs border-collapse" id="tabelDataMahasiswaFmipa">
                        <thead>
                            <tr class="border-b border-gray-200 text-gray-800 text-[12px] font-bold">
                                <th class="py-3 px-3 w-14 text-center cursor-pointer select-none hover:text-[#722F99] transition" data-sort="no">
                                    <span class="inline-flex items-center gap-1">No <i class="fas fa-sort text-[10px] text-gray-400"></i></span>
                                </th>
                                <th class="py-3 px-3 cursor-pointer select-none hover:text-[#722F99] transition" data-sort="nama">
                                    <span class="inline-flex items-center gap-1">Nama Mahasiswa <i class="fas fa-sort text-[10px] text-gray-400"></i></span>
                                </th>
                                <th class="py-3 px-3 cursor-pointer select-none hover:text-[#722F99] transition" data-sort="nim">
                                    <span class="inline-flex items-center gap-1">NIM <i class="fas fa-sort-up text-[10px] text-[#722F99]"></i></span>
                                </th>
                                <th class="py-3 px-3 cursor-pointer select-none hover:text-[#722F99] transition" data-sort="prodi">
                                    <span class="inline-flex items-center gap-1">Prodi <i class="fas fa-sort text-[10px] text-gray-400"></i></span>
                                </th>
                                <th class="py-3 px-3 cursor-pointer select-none hover:text-[#722F99] transition" data-sort="angkatan">
                                    <span class="inline-flex items-center gap-1">Angkatan <i class="fas fa-sort text-[10px] text-gray-400"></i></span>
                                </th>
                                <th class="py-3 px-3 cursor-pointer select-none hover:text-[#722F99] transition" data-sort="semester">
                                    <span class="inline-flex items-center gap-1">Semester <i class="fas fa-sort text-[10px] text-gray-400"></i></span>
                                </th>
                                <th class="py-3 px-3 cursor-pointer select-none hover:text-[#722F99] transition" data-sort="ipk">
                                    <span class="inline-flex items-center gap-1">IPK <i class="fas fa-sort text-[10px] text-gray-400"></i></span>
                                </th>
                                <th class="py-3 px-3 cursor-pointer select-none hover:text-[#722F99] transition" data-sort="status">
                                    <span class="inline-flex items-center gap-1">Status <i class="fas fa-sort text-[10px] text-gray-400"></i></span>
                                </th>
                            </tr>
                        </thead>
                        <tbody id="tabelDataMahasiswaBody">
                            <!-- Diisi dinamis oleh mahasiswa-charts.js -->
                        </tbody>
                    </table>
                </div>

                <!-- Footer: Pagination Bar Sesuai Gambar Mockup -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-5 border-t border-gray-100 mt-2">
                    <div class="text-xs text-gray-500 font-medium" id="mhsPaginationInfo">
                        Menampilkan 11 - 20 dari 720 mahasiswa
                    </div>
                    
                    <!-- Pagination Controls -->
                    <div id="mhsPaginationNav" class="flex items-center justify-center gap-1 select-none">
                        <!-- Diisi dinamis oleh mahasiswa-charts.js -->
                    </div>
                </div>

            </div>

</x-shared.section-card>

<!-- Modal Popup: Detail Profil & Timeline Mahasiswa -->
<div id="modalDetailMhs" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 hidden" aria-hidden="true">
    <div class="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-purple-100 relative animate-in fade-in zoom-in-95 duration-200">
        <!-- Close Button -->
        <button type="button" id="btnCloseMhsModal" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition">
            <i class="fas fa-times text-sm"></i>
        </button>

        <!-- Header Modal -->
        <div class="flex items-center gap-4 pb-5 border-b border-gray-100">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#722F99] to-[#581c87] flex items-center justify-center text-white font-bold text-xl shadow-md shadow-purple-950/20" id="modalMhsAvatar">
                BN
            </div>
            <div>
                <div class="flex items-center gap-2">
                    <h4 class="text-lg font-bold text-gray-900" id="modalMhsNama">Dr. Betania Nababan, S.Pt</h4>
                    <span id="modalMhsStatusBadge" class="bg-cyan-50 text-cyan-700 border border-cyan-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold">DO</span>
                </div>
                <p class="text-xs text-gray-500 mt-0.5">NIM: <strong class="text-gray-800 font-mono" id="modalMhsNim">4220011</strong> &bull; Prodi: <strong class="text-gray-800" id="modalMhsProdi">Biologi</strong></p>
            </div>
        </div>

        <!-- Metric Highlights -->
        <div class="grid grid-cols-3 gap-3 my-5">
            <div class="bg-purple-50/60 border border-purple-100 rounded-xl p-3 text-center">
                <span class="text-[10.5px] font-semibold text-purple-700 uppercase">Angkatan</span>
                <p class="text-base font-extrabold text-gray-900 mt-0.5" id="modalMhsAngkatan">2022</p>
            </div>
            <div class="bg-purple-50/60 border border-purple-100 rounded-xl p-3 text-center">
                <span class="text-[10.5px] font-semibold text-purple-700 uppercase">Semester</span>
                <p class="text-base font-extrabold text-gray-900 mt-0.5" id="modalMhsSemester">-</p>
            </div>
            <div class="bg-purple-50/60 border border-purple-100 rounded-xl p-3 text-center">
                <span class="text-[10.5px] font-semibold text-purple-700 uppercase">IPK Kumulatif</span>
                <p class="text-base font-extrabold text-[#722F99] mt-0.5" id="modalMhsIpk">3.12</p>
            </div>
        </div>

        <!-- Academic Timeline -->
        <div>
            <h5 class="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">Timeline Studi Mahasiswa</h5>
            <div class="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-purple-200">
                <div class="relative">
                    <div class="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[#722F99] border-2 border-white shadow-xs"></div>
                    <p class="text-xs font-bold text-gray-900">Registrasi &amp; KRS Awal</p>
                    <p class="text-[11px] text-gray-500">Telah diverifikasi dan disetujui Dosen Pembimbing Akademik</p>
                </div>
                <div class="relative">
                    <div class="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[#722F99] border-2 border-white shadow-xs"></div>
                    <p class="text-xs font-bold text-gray-900">Evaluasi SKS Tahap 1 &amp; 2</p>
                    <p class="text-[11px] text-gray-500">Pencapaian beban SKS wajib kurikulum prodi terpenuhi</p>
                </div>
                <div class="relative">
                    <div class="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-xs"></div>
                    <p class="text-xs font-bold text-gray-900">Seminar Proposal &amp; Riset</p>
                    <p class="text-[11px] text-gray-500">Pelaksanaan usulan penelitian tugas akhir</p>
                </div>
                <div class="relative">
                    <div class="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-gray-300 border-2 border-white shadow-xs"></div>
                    <p class="text-xs font-bold text-gray-400">Sidang Skripsi &amp; Yudisium Kelulusan</p>
                    <p class="text-[11px] text-gray-400">Target kelulusan tepat waktu</p>
                </div>
            </div>
        </div>

        <!-- Footer Modal -->
        <div class="mt-6 pt-4 border-t border-gray-100 flex justify-end">
            <button type="button" id="btnModalCloseSecondary" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition">
                Tutup
            </button>
        </div>
    </div>
</div>
