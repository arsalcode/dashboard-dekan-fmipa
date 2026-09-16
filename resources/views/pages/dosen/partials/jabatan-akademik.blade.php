<!-- Section 2: Peningkatan Jabatan Akademik Dosen -->
<x-shared.section-card title="Peningkatan Jabatan Akademik Dosen" icon="fa-solid fa-arrow-trend-up" sectionClass="section-dosen">
            
            <!-- Filter Bar & Year Range Badge inside Purple Container -->
            <div class="bg-white/10 backdrop-blur-md border border-white/25 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white">
                <div class="flex items-center gap-3 flex-wrap">
                    <span class="text-xs font-bold text-purple-200 flex items-center gap-1.5">
                        <i class="fa-solid fa-calendar-days text-amber-300"></i>
                        <span>Periode Riwayat Chart:</span>
                    </span>
                    <div class="flex items-center gap-2">
                        <!-- Custom Dropdown Tahun Awal -->
                        <div class="dosen-dropdown-wrap relative" data-filter="tahun-awal" id="wrapFilterJabatanTahunAwal">
                            <input type="hidden" id="filterJabatanTahunAwal" value="2000">
                            <button type="button" class="dosen-pill-btn" aria-haspopup="true" aria-expanded="false" title="Pilih Tahun Awal">
                                <span class="dosen-btn-label font-bold text-white">2000</span>
                                <i class="fa-solid fa-chevron-down chevron-icon"></i>
                            </button>
                            <div class="dosen-dropdown-menu max-h-56 overflow-y-auto" id="menuJabatanTahunAwal">
                                @for ($y = 2000; $y <= 2026; $y++)
                                    <div class="dosen-dropdown-item {{ $y === 2000 ? 'active' : '' }}" data-value="{{ $y }}">{{ $y }}</div>
                                @endfor
                            </div>
                        </div>

                        <span class="text-white/80 font-bold">-</span>

                        <!-- Custom Dropdown Tahun Akhir -->
                        <div class="dosen-dropdown-wrap relative" data-filter="tahun-akhir" id="wrapFilterJabatanTahunAkhir">
                            <input type="hidden" id="filterJabatanTahunAkhir" value="2026">
                            <button type="button" class="dosen-pill-btn" aria-haspopup="true" aria-expanded="false" title="Pilih Tahun Akhir">
                                <span class="dosen-btn-label font-bold text-white">2026</span>
                                <i class="fa-solid fa-chevron-down chevron-icon"></i>
                            </button>
                            <div class="dosen-dropdown-menu max-h-56 overflow-y-auto" id="menuJabatanTahunAkhir">
                                @for ($y = 2000; $y <= 2026; $y++)
                                    <div class="dosen-dropdown-item {{ $y === 2026 ? 'active' : '' }}" data-value="{{ $y }}">{{ $y }}</div>
                                @endfor
                            </div>
                        </div>
                    </div>
                </div>

                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-xs font-semibold text-white">
                    <i class="fa-solid fa-clock-rotate-left text-amber-300"></i>
                    <span id="labelRentangTahun">2000 - 2026 (26 Tahun)</span>
                </div>
            </div>

            <!-- 5 Stat Cards Grid (Matching Dashboard Dekan Card Theme) -->
            <div class="jabatan-stat-grid">
                <!-- 1. Tenaga Pengajar -->
                <div class="jabatan-card">
                    <div class="flex items-center justify-between gap-2">
                        <span class="jabatan-card-title">Tenaga Pengajar</span>
                        <div class="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-xs shrink-0" title="Tenaga Pengajar">
                            <i class="fa-solid fa-chalkboard-user"></i>
                        </div>
                    </div>
                    <div class="my-2">
                        <span class="jabatan-card-val" id="statValTenagaPengajar">0</span>
                    </div>
                    <div class="flex flex-col gap-0.5">
                        <span class="jabatan-card-sub" id="statDiffTenagaPengajar">-</span>
                        <span class="jabatan-card-base" id="statBaseTenagaPengajar">2000: 0</span>
                    </div>
                </div>

                <!-- 2. Asisten Ahli -->
                <div class="jabatan-card">
                    <div class="flex items-center justify-between gap-2">
                        <span class="jabatan-card-title">Asisten Ahli</span>
                        <div class="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-xs shrink-0" title="Asisten Ahli">
                            <i class="fa-solid fa-file-signature"></i>
                        </div>
                    </div>
                    <div class="my-2">
                        <span class="jabatan-card-val" id="statValAsistenAhli">0</span>
                    </div>
                    <div class="flex flex-col gap-0.5">
                        <span class="jabatan-card-sub" id="statDiffAsistenAhli">-</span>
                        <span class="jabatan-card-base" id="statBaseAsistenAhli">2000: 0</span>
                    </div>
                </div>

                <!-- 3. Lektor -->
                <div class="jabatan-card">
                    <div class="flex items-center justify-between gap-2">
                        <span class="jabatan-card-title">Lektor</span>
                        <div class="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-xs shrink-0" title="Lektor">
                            <i class="fa-solid fa-book-bookmark"></i>
                        </div>
                    </div>
                    <div class="my-2">
                        <span class="jabatan-card-val" id="statValLektor">0</span>
                    </div>
                    <div class="flex flex-col gap-0.5">
                        <span class="jabatan-card-sub" id="statDiffLektor">-</span>
                        <span class="jabatan-card-base" id="statBaseLektor">2000: 0</span>
                    </div>
                </div>

                <!-- 4. Lektor Kepala -->
                <div class="jabatan-card">
                    <div class="flex items-center justify-between gap-2">
                        <span class="jabatan-card-title">Lektor Kepala</span>
                        <div class="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-xs shrink-0" title="Lektor Kepala">
                            <i class="fa-solid fa-layer-group"></i>
                        </div>
                    </div>
                    <div class="my-2">
                        <span class="jabatan-card-val" id="statValLektorKepala">0</span>
                    </div>
                    <div class="flex flex-col gap-0.5">
                        <span class="jabatan-card-sub" id="statDiffLektorKepala">-</span>
                        <span class="jabatan-card-base" id="statBaseLektorKepala">2000: 0</span>
                    </div>
                </div>

                <!-- 5. Guru Besar -->
                <div class="jabatan-card">
                    <div class="flex items-center justify-between gap-2">
                        <span class="jabatan-card-title">Guru Besar</span>
                        <div class="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-xs shrink-0" title="Guru Besar">
                            <i class="fa-solid fa-graduation-cap"></i>
                        </div>
                    </div>
                    <div class="my-2">
                        <span class="jabatan-card-val" id="statValGuruBesar">0</span>
                    </div>
                    <div class="flex flex-col gap-0.5">
                        <span class="jabatan-card-sub" id="statDiffGuruBesar">-</span>
                        <span class="jabatan-card-base" id="statBaseGuruBesar">2000: 0</span>
                    </div>
                </div>
            </div>

            <!-- Line Chart Card -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-chart-line text-[#722F99]"></i>
                        <h4 class="text-sm font-bold text-gray-800">Tren Kenaikan Jenjang Fungsional Dosen (Riwayat Multi-Tahun)</h4>
                    </div>

                    <!-- Chart Legend -->
                    <div class="flex items-center gap-3 flex-wrap text-xs text-gray-600 font-medium">
                        <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#4A154B]"></span>Guru Besar</span>
                        <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#722F99]"></span>Lektor Kepala</span>
                        <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#A855F7]"></span>Lektor</span>
                        <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#6366F1]"></span>Asisten Ahli</span>
                        <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#94A3B8]"></span>Tenaga Pengajar</span>
                    </div>
                </div>

                <div class="w-full h-80 relative flex items-center justify-center">
                    <canvas id="chartPeningkatanJabatanDosen"></canvas>
                    <div id="chartPeningkatanJabatanDosenEmpty" class="chart-empty-overlay hidden absolute inset-0 flex flex-col items-center justify-center text-center p-3 bg-white/95 rounded-xl z-10 transition-all duration-200">
                        <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#722F99] mb-1.5 shadow-inner">
                            <i class="fa-solid fa-cloud-arrow-up text-base text-[#722F99]"></i>
                        </div>
                        <p class="text-xs font-bold text-slate-700">Belum Ada Data</p>
                        <p class="text-[11px] text-slate-400 mt-0.5 leading-snug">Upload berkas Excel atau entri manual untuk memuat grafik.</p>
                    </div>
                </div>
            </div>

</x-shared.section-card>
