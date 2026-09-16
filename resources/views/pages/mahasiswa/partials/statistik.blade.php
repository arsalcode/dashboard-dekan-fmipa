<!-- Section 1: Statistik Mahasiswa -->
<x-shared.section-card title="Statistik Mahasiswa" icon="fa-solid fa-chart-pie" sectionClass="section-mahasiswa">
            
            <!-- Alert Notice Banner -->
            <div class="bg-white/10 backdrop-blur-md border border-white/25 rounded-xl p-3.5 flex items-start gap-3 text-white text-xs">
                <span class="w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    <i class="fa-solid fa-info"></i>
                </span>
                <div class="leading-relaxed">
                    <strong class="font-bold text-amber-300">Overview Statistik:</strong> Data komprehensif mahasiswa berdasarkan status keaktifan, distribusi IPK, korelasi SKS, dan tren kelulusan tepat waktu FMIPA Universitas Pakuan.
                </div>
            </div>

            <!-- 4 Stat Cards Row (Executive Deep Purple Gradients with 2px White Border) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <x-shared.stat-card 
                    title="Total Mahasiswa" 
                    value="2.845" 
                    subtext="T.A. 2025/2026" 
                    valueId="valMhsTotal" 
                    subtextId="subMhsTotal" 
                />
                <x-shared.stat-card 
                    title="Mahasiswa Aktif" 
                    value="2.618" 
                    subtext="92.0% dari Total" 
                    valueId="valMhsAktif" 
                    subtextId="subMhsAktif" 
                />
                <x-shared.stat-card 
                    title="Rata-rata IPK" 
                    value="3.42" 
                    subtext="Predikat Sangat Memuaskan" 
                    valueId="valMhsRataIpk" 
                    subtextId="subMhsRataIpk" 
                />
                <x-shared.stat-card 
                    title="Lulus Tepat Waktu" 
                    value="85%" 
                    subtext="Target Fakultas &ge; 80%" 
                    valueId="valMhsTepatWaktu" 
                    subtextId="subMhsTepatWaktu" 
                />
            </div>

            <!-- Row 1: 3 Charts (Status, IPK, Korelasi IPK vs SKS) -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                
                <!-- Card 1: Distribusi Status Mahasiswa -->
                <div class="card-stat-mhs">
                    <div class="card-stat-header">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-chart-pie text-[#722F99] text-xs"></i>
                            <h3 class="card-stat-title">Distribusi Status Mahasiswa</h3>
                        </div>
                        <span class="card-stat-info-badge" title="Distribusi Status Mahasiswa FMIPA"><i class="fas fa-info"></i></span>
                    </div>
                    <div class="card-stat-body">
                        <canvas id="chartMhsStatusDist"></canvas>
                    </div>
                </div>

                <!-- Card 2: Distribusi IPK Mahasiswa -->
                <div class="card-stat-mhs">
                    <div class="card-stat-header">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-chart-column text-[#722F99] text-xs"></i>
                            <h3 class="card-stat-title">Distribusi IPK Mahasiswa</h3>
                        </div>
                        <span class="card-stat-info-badge" title="Sebaran rentang nilai IPK mahasiswa"><i class="fas fa-info"></i></span>
                    </div>
                    <div class="card-stat-body">
                        <canvas id="chartMhsIpkDist"></canvas>
                    </div>
                </div>

                <!-- Card 3: Korelasi IPK vs Penyelesaian SKS -->
                <div class="card-stat-mhs">
                    <div class="card-stat-header mb-1">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-chart-scatter text-[#722F99] text-xs"></i>
                            <h3 class="card-stat-title">Korelasi IPK vs SKS</h3>
                        </div>
                        <span class="card-stat-info-badge" title="Korelasi antara IPK kumulatif dan persentase penyelesaian SKS"><i class="fas fa-info"></i></span>
                    </div>
                    <!-- Custom Scatter Legend -->
                    <div class="flex flex-wrap items-center justify-center gap-2.5 mb-2 text-[10px] font-semibold text-gray-600">
                        <div class="flex items-center gap-1">
                            <span class="w-3 border-t-2 border-dashed border-[#722F99] inline-block"></span>
                            <span>Target 3.0</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <span class="w-2.5 h-2.5 rounded-full bg-[#3D818A] inline-block"></span>
                            <span>Aktif</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <span class="w-2.5 h-2.5 rounded-full bg-[#eab308] inline-block"></span>
                            <span>Cuti</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <span class="w-2.5 h-2.5 rounded-full bg-[#ef4444] inline-block"></span>
                            <span>Drop Out</span>
                        </div>
                    </div>
                    <div class="card-stat-body">
                        <canvas id="chartMhsKorelasiIpkSks"></canvas>
                    </div>
                </div>

            </div>

            <!-- Row 2: 2 Charts (Tren Aktif vs Non-Aktif, Progres SKS per Angkatan) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                
                <!-- Card 4: Tren Mahasiswa Aktif vs Non-Aktif -->
                <div class="card-stat-mhs">
                    <div class="card-stat-header mb-1">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-chart-line text-[#722F99] text-xs"></i>
                            <h3 class="card-stat-title">Tren Mahasiswa Aktif vs Non-Aktif</h3>
                        </div>
                        <span class="card-stat-info-badge" title="Tren Status Mahasiswa per Periode"><i class="fas fa-info"></i></span>
                    </div>

                    <div class="flex items-center justify-center gap-4 mb-2 text-xs font-semibold">
                        <div class="flex items-center gap-1.5">
                            <span class="w-5 h-2.5 rounded-xs border-2 border-[#10b981] bg-emerald-50 inline-block"></span>
                            <span class="text-gray-600 text-[11px]">Mahasiswa Aktif</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <span class="w-5 h-2.5 rounded-xs border-2 border-[#ef4444] bg-red-50 inline-block"></span>
                            <span class="text-gray-600 text-[11px]">Non-Aktif</span>
                        </div>
                    </div>

                    <div class="card-stat-body card-stat-body-lg">
                        <canvas id="chartMhsTrenAktifNonAktif"></canvas>
                    </div>
                </div>

                <!-- Card 5: Progres SKS per Angkatan (Area Chart Sesuai Gambar 2) -->
                <div class="card-stat-mhs">
                    <div class="card-stat-header mb-1">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-chart-area text-[#722F99] text-xs"></i>
                            <h3 class="card-stat-title">Progres SKS per Angkatan</h3>
                        </div>
                        <span class="card-stat-info-badge" title="Rata-rata pencapaian SKS per angkatan"><i class="fas fa-info"></i></span>
                    </div>

                    <!-- Custom Legend Sesuai Gambar 2 -->
                    <div class="flex items-center justify-center gap-3 sm:gap-4 mb-2 text-xs font-semibold">
                        <div class="flex items-center gap-1.5">
                            <span class="w-6 h-3 rounded-xs border-2 border-[#10b981] bg-[#34d399]/70 inline-block"></span>
                            <span class="text-gray-600 text-[11px]">SKS Lulus</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <span class="w-6 h-3 rounded-xs border-2 border-[#f59e0b] bg-[#fbbf24]/70 inline-block"></span>
                            <span class="text-gray-600 text-[11px]">SKS Ditempuh</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <span class="w-6 h-3 rounded-xs border-2 border-[#64748b] bg-[#94a3b8]/70 inline-block"></span>
                            <span class="text-gray-600 text-[11px]">SKS Tersisa</span>
                        </div>
                    </div>

                    <div class="card-stat-body card-stat-body-lg">
                        <canvas id="chartMhsProgresSks"></canvas>
                    </div>
                </div>

            </div>

            <!-- Row 3: 1 Chart Full-Width (Analisis Masa Studi Mahasiswa per Angkatan) -->
            <div class="w-full">
                <div class="card-stat-mhs">
                    <div class="card-stat-header mb-2">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-graduation-cap text-[#722F99] text-xs"></i>
                            <h3 class="card-stat-title">Analisis Masa Studi Mahasiswa per Angkatan</h3>
                        </div>
                        <span class="card-stat-info-badge" title="Distribusi masa studi dan tren lama kelulusan mahasiswa per angkatan"><i class="fas fa-info"></i></span>
                    </div>

                    <!-- Legend -->
                    <div class="flex flex-wrap items-center justify-center gap-4 mb-3 text-xs font-semibold">
                        <div class="flex items-center gap-1.5">
                            <span class="w-3 h-3 rounded-xs bg-[#3D818A] inline-block"></span>
                            <span class="text-gray-600 text-[11px]">Tepat Waktu (&le; 4 Thn / 8 Sem)</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <span class="w-3 h-3 rounded-xs bg-[#eab308] inline-block"></span>
                            <span class="text-gray-600 text-[11px]">4.5 - 5 Tahun (9 - 10 Sem)</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <span class="w-3 h-3 rounded-xs bg-[#ef4444] inline-block"></span>
                            <span class="text-gray-600 text-[11px]">&gt; 5 Tahun (&gt; 10 Sem)</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <span class="w-5 border-t-2 border-[#722F99] inline-block"></span>
                            <span class="text-gray-700 text-[11px]">Rata-rata Masa Studi (Tahun)</span>
                        </div>
                    </div>

                    <div class="card-stat-body" style="height: 300px;">
                        <canvas id="chartMhsMasaStudi"></canvas>
                    </div>
                </div>
            </div>

</x-shared.section-card>
