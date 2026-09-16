<!-- Section 1: Statistik & Performa Akun Instagram (Standar Dosen & Dashboard) -->
<x-shared.section-card title="Statistik &amp; Performa Instagram" icon="fa-brands fa-instagram" sectionClass="section-ig">
            
            <!-- Alert Notice Banner -->
            <div class="bg-white/10 backdrop-blur-md border border-white/25 rounded-xl p-3.5 flex items-start gap-3 text-white text-xs">
                <span class="w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    <i class="fa-solid fa-circle-info text-amber-300"></i>
                </span>
                <div class="leading-relaxed">
                    <strong class="font-bold text-amber-300">Meta Graph API Real-Time Insights:</strong> Data metrik performa akun official <span class="underline font-semibold">@fmipa_unpak</span> disinkronkan secara berkala melalui Instagram Graph API v19.0 untuk pemantauan jangkauan publikasi, pertumbuhan audiens, dan keterlibatan interaksi sivitas akademika.
                </div>
            </div>

            <!-- 4 Stat Cards Row (Komponen Standar Dosen) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <x-shared.stat-card 
                    title="Total Followers" 
                    value="0" 
                    subtext="Belum ada data" 
                    valueId="valIgFollowers" 
                    subtextId="subIgFollowers" 
                />
                <x-shared.stat-card 
                    title="Jangkauan Akun (Reach)" 
                    value="0" 
                    subtext="Belum ada data" 
                    valueId="valIgReach" 
                    subtextId="subIgReach" 
                />
                <x-shared.stat-card 
                    title="Total Tayangan (Impressions)" 
                    value="0" 
                    subtext="Belum ada data" 
                    valueId="valIgImpressions" 
                    subtextId="subIgImpressions" 
                />
                <x-shared.stat-card 
                    title="Engagement Rate" 
                    value="0.0%" 
                    subtext="Belum ada data" 
                    valueId="valIgEngage" 
                    subtextId="subIgEngage" 
                />
            </div>

            <!-- Charts Row (2 Kolom Mengikuti Standar Dosen) -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                <!-- Chart 1: Tren Pertumbuhan Followers & Jangkauan Bulanan -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-chart-line text-[#722F99]"></i>
                                <h3 class="text-sm font-bold text-gray-800">Tren Pertumbuhan Followers &amp; Jangkauan</h3>
                            </div>
                            <span class="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100" id="footerTotalFollowersBadge">0 Followers</span>
                        </div>
                        
                        <!-- Legend -->
                        <div class="flex items-center gap-3.5 flex-wrap text-[11px] text-gray-600 font-medium mb-3">
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#722F99]"></span>Jumlah Followers</span>
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span>Jangkauan / Reach</span>
                        </div>

                        <div class="w-full h-64 relative">
                            <canvas id="chartIgGrowthTren"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Chart 2: Format Konten, Demografi & Jam Aktif (Tabbed View Mengikuti Dosen) -->
                <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-chart-pie text-[#722F99]"></i>
                                <h3 class="text-sm font-bold text-gray-800">Analisis Format &amp; Audiens Pengikut</h3>
                            </div>
                            
                            <!-- Tab Pills -->
                            <div class="ig-chart-tab-pills">
                                <button type="button" class="ig-chart-tab-pill active" id="tabIgFormat" data-chart-view="format">Format Konten</button>
                                <button type="button" class="ig-chart-tab-pill" id="tabIgDemografi" data-chart-view="demografi">Demografi</button>
                                <button type="button" class="ig-chart-tab-pill" id="tabIgJamAktif" data-chart-view="jam">Jam Aktif</button>
                            </div>
                        </div>

                        <div class="w-full h-64 relative">
                            <div id="viewWrapIgFormat" class="ig-chart-canvas-view active">
                                <canvas id="chartIgFormat"></canvas>
                            </div>
                            <div id="viewWrapIgDemografi" class="ig-chart-canvas-view">
                                <canvas id="chartIgDemografi"></canvas>
                            </div>
                            <div id="viewWrapIgJamAktif" class="ig-chart-canvas-view">
                                <canvas id="chartIgJamAktif"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-medium mt-2">
                        <span id="footerReelsRatio"><i class="fa-brands fa-instagram text-[#722F99] mr-1"></i>Top: -</span>
                        <span id="footerPeakHour"><i class="fa-regular fa-clock text-purple-600 mr-1"></i>Waktu Unggah: -</span>
                        <span id="footerNonFollowers"><i class="fa-solid fa-users-rays text-teal-600 mr-1"></i>Interaksi: 0</span>
                    </div>
                </div>
            </div>

</x-shared.section-card>
