<!-- Section 1: Statistik Tingkat Partisipasi Sivitas (Standar Dosen & Dashboard) -->
<x-shared.section-card title="Statistik Tingkat Partisipasi" icon="fa-solid fa-chart-line" sectionClass="section-partisipasi">
            
            <!-- Alert Notice Banner -->
            <div class="bg-white/10 backdrop-blur-md border border-white/25 rounded-xl p-3.5 flex items-start gap-3 text-white text-xs">
                <span class="w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    <i class="fa-solid fa-users-viewfinder text-amber-300"></i>
                </span>
                <div class="leading-relaxed">
                    <strong class="font-bold text-amber-300">Pemantauan Keaktifan Sivitas Terintegrasi:</strong> Data keterlibatan mahasiswa dan sivitas akademika dirangkum real-time dari Sistem Informasi Akademik, Presensi Perkuliahan, Portofolio SKPI Ormawa, dan Kuesioner Evaluasi Dosen oleh Mahasiswa (EDOM).
                </div>
            </div>

            <!-- 4 Stat Cards Row (Komponen Standar Dosen) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <x-shared.stat-card 
                    title="Rerata Partisipasi" 
                    value="86.8%" 
                    subtext="Target Fakultas: > 80%" 
                    valueId="valPartisipasiRerata" 
                    subtextId="subPartisipasiRerata" 
                />
                <x-shared.stat-card 
                    title="Mahasiswa Terlibat" 
                    value="2.420" 
                    subtext="82.4% dari Total Mhs Aktif" 
                    valueId="valPartisipasiMhs" 
                    subtextId="subPartisipasiMhs" 
                />
                <x-shared.stat-card 
                    title="Total Agenda Kegiatan" 
                    value="128" 
                    subtext="Ormawa, MBKM &amp; Lomba" 
                    valueId="valPartisipasiAgenda" 
                    subtextId="subPartisipasiAgenda" 
                />
                <x-shared.stat-card 
                    title="Indeks Kepuasan EDOM" 
                    value="3.82" 
                    subtext="Skala 4.00 (Sangat Baik)" 
                    valueId="valPartisipasiEdom" 
                    subtextId="subPartisipasiEdom" 
                />
            </div>

            <!-- Charts Row (2 Kolom Mengikuti Standar Dosen) -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                <!-- Chart 1: Tren Partisipasi Peserta Kegiatan Bulanan -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-chart-line text-[#722F99]"></i>
                                <h3 class="text-sm font-bold text-gray-800">Tren Partisipasi Peserta Bulanan (2026)</h3>
                            </div>
                            <span class="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100" id="footerTotalPesertaBadge">2.820 Kehadiran</span>
                        </div>
                        
                        <!-- Legend -->
                        <div class="flex items-center gap-3.5 flex-wrap text-[11px] text-gray-600 font-medium mb-3">
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#722F99]"></span>Realisasi Peserta</span>
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>Target Kehadiran</span>
                        </div>

                        <div class="w-full h-64 relative">
                            <canvas id="chartPartisipasiTren"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Chart 2: Kategori Kegiatan, Partisipasi Prodi & EDOM (Tabbed View Mengikuti Dosen) -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-chart-pie text-[#722F99]"></i>
                                <h3 class="text-sm font-bold text-gray-800">Distribusi Kategori &amp; Program Studi</h3>
                            </div>
                            
                            <!-- Tab Pills -->
                            <div class="partisipasi-chart-tab-pills">
                                <button type="button" class="partisipasi-chart-tab-pill active" id="tabPartisipasiKategori" data-chart-view="kategori">Kategori</button>
                                <button type="button" class="partisipasi-chart-tab-pill" id="tabPartisipasiProdi" data-chart-view="prodi">Per Prodi</button>
                                <button type="button" class="partisipasi-chart-tab-pill" id="tabPartisipasiEdom" data-chart-view="edom">EDOM Kepuasan</button>
                            </div>
                        </div>

                        <div class="w-full h-64 relative">
                            <div id="viewWrapPartisipasiKategori" class="partisipasi-chart-canvas-view active">
                                <canvas id="chartPartisipasiKategori"></canvas>
                            </div>
                            <div id="viewWrapPartisipasiProdi" class="partisipasi-chart-canvas-view">
                                <canvas id="chartPartisipasiProdi"></canvas>
                            </div>
                            <div id="viewWrapPartisipasiEdom" class="partisipasi-chart-canvas-view">
                                <canvas id="chartPartisipasiEdom"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-medium mt-2">
                        <span id="footerTopProdi"><i class="fa-solid fa-trophy text-amber-500 mr-1"></i>Partisipasi Tertinggi: Farmasi (89.2%)</span>
                        <span id="footerFavoriteEvent"><i class="fa-solid fa-star text-purple-600 mr-1"></i>Top: Ormawa (35%)</span>
                        <span id="footerResponseEdom"><i class="fa-solid fa-clipboard-check text-teal-600 mr-1"></i>Respon EDOM: 94.6%</span>
                    </div>
                </div>
            </div>

</x-shared.section-card>
