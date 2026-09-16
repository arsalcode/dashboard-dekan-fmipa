<!-- Section 1: Overview Mahasiswa -->
<x-shared.section-card title="Overview Mahasiswa" icon="fa-solid fa-users-gear" sectionClass="section-wadek3">
            
            <!-- 4 Stat Cards Row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <x-shared.stat-card 
                    title="Total Mahasiswa Aktif" 
                    value="0" 
                    subtext="Belum ada data" 
                    valueId="valWd3TotalMhs" 
                    subtextId="subWd3TotalMhs" 
                />
                <x-shared.stat-card 
                    title="Organisasi Mahasiswa" 
                    value="0" 
                    subtext="Belum ada data" 
                    valueId="valWd3Ormawa" 
                    subtextId="subWd3Ormawa" 
                />
                <x-shared.stat-card 
                    title="Kegiatan Kemahasiswaan" 
                    value="0" 
                    subtext="Belum ada data" 
                    valueId="valWd3Kegiatan" 
                    subtextId="subWd3Kegiatan" 
                />
                <x-shared.stat-card 
                    title="Tingkat Partisipasi" 
                    value="0%" 
                    subtext="Belum ada data" 
                    valueId="valWd3Partisipasi" 
                    subtextId="subWd3Partisipasi" 
                />
            </div>

            <!-- Executive Quick Insights Row -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <!-- Status Pelaksanaan Kegiatan -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between pb-3 border-b border-gray-100">
                            <div class="flex items-center gap-2">
                                <span class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold">
                                    <i class="fa-solid fa-calendar-check"></i>
                                </span>
                                <div>
                                    <h3 class="text-xs font-bold text-gray-800">Status Program Kerja</h3>
                                    <p class="text-[11px] text-gray-500">Realisasi Agenda Ormawa</p>
                                </div>
                            </div>
                            <span class="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full" id="wd3ProkerCompletionRate">0%</span>
                        </div>
                        <div class="space-y-2.5 mt-3 text-xs">
                            <div>
                                <div class="flex justify-between font-semibold text-gray-600 mb-1">
                                    <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-500"></span>Selesai Dilaksanakan</span>
                                    <span class="text-gray-800 font-bold" id="wd3KegiatanSelesai">0 Kegiatan</span>
                                </div>
                                <div class="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                    <div class="bg-emerald-500 h-1.5 rounded-full" id="wd3ProkerSelesaiBar" style="width: 0%;"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between font-semibold text-gray-600 mb-1">
                                    <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-amber-500"></span>Sedang Berjalan</span>
                                    <span class="text-gray-800 font-bold" id="wd3KegiatanBerjalan">0 Kegiatan</span>
                                </div>
                                <div class="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                    <div class="bg-amber-500 h-1.5 rounded-full" id="wd3ProkerBerjalanBar" style="width: 0%;"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between font-semibold text-gray-600 mb-1">
                                    <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-purple-500"></span>Tahap Perencanaan</span>
                                    <span class="text-gray-800 font-bold" id="wd3KegiatanRencana">0 Kegiatan</span>
                                </div>
                                <div class="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                    <div class="bg-[#722F99] h-1.5 rounded-full" id="wd3ProkerRencanaBar" style="width: 0%;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pembinaan Karakter & MBKM Mahasiswa -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between pb-3 border-b border-gray-100">
                            <div class="flex items-center gap-2">
                                <span class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
                                    <i class="fa-solid fa-briefcase"></i>
                                </span>
                                <div>
                                    <h3 class="text-xs font-bold text-gray-800">Capaian IKU 2 Kemahasiswaan</h3>
                                    <p class="text-[11px] text-gray-500">Pengalaman Belajar Luar Kampus</p>
                                </div>
                            </div>
                            <span class="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full" id="wd3MbkmTotal">0 Mhs</span>
                        </div>
                        <div class="grid grid-cols-2 gap-2 mt-3 text-xs">
                            <div class="p-2 rounded-lg bg-slate-50 border border-slate-150">
                                <span class="text-[11px] text-gray-500 block">Magang Industri</span>
                                <span class="text-sm font-extrabold text-gray-800" id="wd3MbkmMagang">0</span>
                                <span class="text-[10px] text-slate-400 block mt-0.5">Partisipasi</span>
                            </div>
                            <div class="p-2 rounded-lg bg-slate-50 border border-slate-150">
                                <span class="text-[11px] text-gray-500 block">Studi Independen</span>
                                <span class="text-sm font-extrabold text-gray-800" id="wd3MbkmStudi">0</span>
                                <span class="text-[10px] text-slate-400 block mt-0.5">Partisipasi</span>
                            </div>
                            <div class="p-2 rounded-lg bg-slate-50 border border-slate-150">
                                <span class="text-[11px] text-gray-500 block">Pertukaran Mhs</span>
                                <span class="text-sm font-extrabold text-gray-800" id="wd3MbkmPmm">0</span>
                                <span class="text-[10px] text-slate-400 block mt-0.5">Partisipasi</span>
                            </div>
                            <div class="p-2 rounded-lg bg-slate-50 border border-slate-150">
                                <span class="text-[11px] text-gray-500 block">Kemanusiaan / KKN</span>
                                <span class="text-sm font-extrabold text-gray-800" id="wd3MbkmKemanusiaan">0</span>
                                <span class="text-[10px] text-slate-400 block mt-0.5">Partisipasi</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Layanan Bimbingan & Konseling Mahasiswa -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between pb-3 border-b border-gray-100">
                            <div class="flex items-center gap-2">
                                <span class="w-8 h-8 rounded-lg bg-purple-50 text-[#722F99] flex items-center justify-center text-sm font-bold">
                                    <i class="fa-solid fa-heart-pulse"></i>
                                </span>
                                <div>
                                    <h3 class="text-xs font-bold text-gray-800">Layanan Konseling &amp; Karir</h3>
                                    <p class="text-[11px] text-gray-500">Pusat Layanan Mahasiswa FMIPA</p>
                                </div>
                            </div>
                            <span class="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">Aktif</span>
                        </div>
                        <div class="space-y-2 mt-3 text-xs">
                            <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-150">
                                <span class="text-gray-600 font-medium">Konsultasi Akademik/Psikologis</span>
                                <span class="font-bold text-gray-800" id="wd3LayananKonseling">0 Sesi</span>
                            </div>
                            <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-150">
                                <span class="text-gray-600 font-medium">Workshop Karir &amp; Tracer Study</span>
                                <span class="font-bold text-gray-800" id="wd3LayananKarir">0 Batch</span>
                            </div>
                            <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-150">
                                <span class="text-gray-600 font-medium">Klinik PKM &amp; Pembinaan Lomba</span>
                                <span class="font-bold text-gray-800" id="wd3LayananPkm">0 Kelompok</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</x-shared.section-card>
