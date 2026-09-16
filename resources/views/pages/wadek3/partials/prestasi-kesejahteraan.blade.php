<!-- Section 2: Prestasi & Kesejahteraan Mahasiswa -->
<x-shared.section-card title="Prestasi & Kesejahteraan Mahasiswa" icon="fa-solid fa-trophy" sectionClass="section-wadek3">
            
            <!-- 4 Stat Cards Row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <x-shared.stat-card 
                    title="Total Prestasi Mahasiswa" 
                    value="0" 
                    subtext="Belum ada data" 
                    valueId="valWd3TotalPrestasi" 
                    subtextId="subWd3TotalPrestasi" 
                />
                <x-shared.stat-card 
                    title="Prestasi Internasional" 
                    value="0" 
                    subtext="Belum ada data" 
                    valueId="valWd3PrestasiInternasional" 
                    subtextId="subWd3PrestasiNasional" 
                />
                <x-shared.stat-card 
                    title="Penerima Beasiswa" 
                    value="0" 
                    subtext="Belum ada data" 
                    valueId="valWd3PenerimaBeasiswa" 
                    subtextId="subNominalBeasiswa" 
                />
                <x-shared.stat-card 
                    title="Mahasiswa Berprestasi" 
                    value="0" 
                    subtext="Belum ada data" 
                    valueId="valWd3MhsBerprestasi" 
                    subtextId="subPrestasiRegionalLokal" 
                />
            </div>

            <!-- Kesejahteraan Mahasiswa & Distribusi Beasiswa Summary Banner -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-white">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-amber-400/20 border border-amber-300/30 flex items-center justify-center text-amber-300 shrink-0">
                        <i class="fa-solid fa-graduation-cap text-lg"></i>
                    </div>
                    <div>
                        <span class="text-[11px] text-purple-200 block">KIP Kuliah (Kemendikbud)</span>
                        <span class="text-base font-extrabold text-white" id="wd3BeasiswaKip">0 Mhs</span>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-emerald-400/20 border border-emerald-300/30 flex items-center justify-center text-emerald-300 shrink-0">
                        <i class="fa-solid fa-medal text-lg"></i>
                    </div>
                    <div>
                        <span class="text-[11px] text-purple-200 block">Beasiswa Prestasi / Unggulan</span>
                        <span class="text-base font-extrabold text-white" id="wd3BeasiswaUnggulan">0 Mhs</span>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-blue-400/20 border border-blue-300/30 flex items-center justify-center text-blue-300 shrink-0">
                        <i class="fa-solid fa-handshake text-lg"></i>
                    </div>
                    <div>
                        <span class="text-[11px] text-purple-200 block">Mitra Perusahaan &amp; Alumni</span>
                        <span class="text-base font-extrabold text-white" id="wd3BeasiswaMitra">0 Mhs</span>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-purple-400/20 border border-purple-300/30 flex items-center justify-center text-purple-200 shrink-0">
                        <i class="fa-solid fa-landmark text-lg"></i>
                    </div>
                    <div>
                        <span class="text-[11px] text-purple-200 block">Beasiswa Pemda / Pemprov</span>
                        <span class="text-base font-extrabold text-white" id="wd3BeasiswaPemda">0 Mhs</span>
                    </div>
                </div>
            </div>

            <!-- Table of Prestasi Mahasiswa Terkini -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div class="flex items-center gap-2.5">
                        <div class="w-8 h-8 rounded-lg bg-purple-50 text-[#722F99] flex items-center justify-center text-sm font-bold">
                            <i class="fa-solid fa-award"></i>
                        </div>
                        <div>
                            <h3 class="text-sm font-bold text-gray-800">Daftar Prestasi &amp; Kejuaraan Mahasiswa Terkini</h3>
                            <p class="text-xs text-gray-500">Rekapitulasi pencapaian kompetisi akademik dan non-akademik tingkat nasional &amp; internasional</p>
                        </div>
                    </div>
                    
                    <!-- Search Input for Table -->
                    <div class="relative min-w-[220px]">
                        <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                        <input type="text" id="wd3SearchPrestasi" placeholder="Cari mahasiswa / lomba..." class="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 focus:border-[#722F99] focus:ring-1 focus:ring-[#722F99] focus:outline-none transition">
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse" id="tableWd3Prestasi">
                        <thead>
                            <tr class="bg-slate-50 border-b border-gray-200 text-gray-600 uppercase text-[11px] font-bold tracking-wider">
                                <th class="py-3 px-4">Nama Mahasiswa &amp; NIM</th>
                                <th class="py-3 px-4">Program Studi</th>
                                <th class="py-3 px-4">Nama Kejuaraan / Kompetisi</th>
                                <th class="py-3 px-4 text-center">Tingkat</th>
                                <th class="py-3 px-4">Capaian / Juara</th>
                                <th class="py-3 px-4 text-center">Tahun</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 text-xs text-gray-700 font-medium" id="tbodyWd3Prestasi">
                            <!-- Rows rendered dynamically by DataManager -->
                            <tr id="rowWd3PrestasiEmpty">
                                <td colspan="6" class="text-center py-8 text-gray-400 font-medium">
                                    <i class="fa-solid fa-trophy text-2xl mb-2 block text-gray-300"></i>
                                    Belum ada data prestasi mahasiswa tersimpan.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

</x-shared.section-card>
