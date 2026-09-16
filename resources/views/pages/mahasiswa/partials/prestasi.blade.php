<!-- Section 2: Tren Prestasi Mahasiswa -->
<x-shared.section-card title="Tren Prestasi Mahasiswa" icon="fa-solid fa-trophy" sectionClass="section-mahasiswa">
            
            <!-- Top Controls Row: Info & Filter Periode Capaian -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div class="text-xs text-white/90 leading-relaxed">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 border border-white/20 text-white font-semibold mr-2">
                        <i class="fa-solid fa-medal text-amber-300"></i> Rekapitulasi Capaian
                    </span>
                    Rekapitulasi prestasi akademik &amp; non-akademik mahasiswa FMIPA tingkat lokal hingga internasional.
                </div>

                <!-- Filter Rentang Tahun (Custom Purple Dropdown matching Dashboard Standard) -->
                <div class="mhs-prestasi-filter-bar shrink-0 mb-0">
                    <div class="mhs-prestasi-filter-label">
                        <i class="fas fa-calendar-days text-amber-300"></i>
                        <span>Rentang:</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <!-- Custom Dropdown Tahun Awal -->
                        <div class="mhs-dropdown-wrap relative" data-filter="prestasi-awal" id="wrapFilterMhsPrestasiAwal">
                            <input type="hidden" id="filterMhsPrestasiAwal" value="2020">
                            <button type="button" class="mhs-pill-btn !py-1 !px-2.5 !text-xs" aria-haspopup="true" aria-expanded="false" title="Pilih Tahun Awal">
                                <span class="mhs-btn-label font-bold text-white">2020</span>
                                <i class="fa-solid fa-chevron-down chevron-icon"></i>
                            </button>
                            <div class="mhs-dropdown-menu max-h-48 overflow-y-auto !min-w-[90px] !w-24" id="menuMhsPrestasiAwal">
                                @for ($y = 2020; $y <= 2026; $y++)
                                    <div class="mhs-dropdown-item {{ $y === 2020 ? 'active' : '' }}" data-value="{{ $y }}">{{ $y }}</div>
                                @endfor
                            </div>
                        </div>

                        <span class="text-xs text-purple-200 font-bold">s/d</span>

                        <!-- Custom Dropdown Tahun Akhir -->
                        <div class="mhs-dropdown-wrap relative" data-filter="prestasi-akhir" id="wrapFilterMhsPrestasiAkhir">
                            <input type="hidden" id="filterMhsPrestasiAkhir" value="2026">
                            <button type="button" class="mhs-pill-btn !py-1 !px-2.5 !text-xs" aria-haspopup="true" aria-expanded="false" title="Pilih Tahun Akhir">
                                <span class="mhs-btn-label font-bold text-white">2026</span>
                                <i class="fa-solid fa-chevron-down chevron-icon"></i>
                            </button>
                            <div class="mhs-dropdown-menu max-h-48 overflow-y-auto !min-w-[90px] !w-24" id="menuMhsPrestasiAkhir">
                                @for ($y = 2026; $y >= 2020; $y--)
                                    <div class="mhs-dropdown-item {{ $y === 2026 ? 'active' : '' }}" data-value="{{ $y }}">{{ $y }}</div>
                                @endfor
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 5 Metric Stat Cards (Matching Dashboard Executive Standard) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
                
                <!-- 1. Internasional -->
                <div class="bg-gradient-to-br from-[#722F99] to-[#581c87] border-2 border-white/80 hover:border-white rounded-2xl p-4 flex flex-col justify-between text-white shadow-lg shadow-purple-950/30 hover:scale-[1.02] transition-all">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-semibold text-white/95">Internasional</span>
                        <div class="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-amber-300 text-xs">
                            <i class="fas fa-globe-asia"></i>
                        </div>
                    </div>
                    <div class="flex items-center justify-center py-2">
                        <span class="text-3xl font-extrabold text-white tracking-tight" id="statValMhsInter">18</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <span class="text-[11px] text-emerald-400 font-bold" id="statDiffMhsInter">+6 (+50.0%)</span>
                        <span class="text-[10px] text-purple-200 mt-0.5">Basis Awal: 12</span>
                    </div>
                </div>

                <!-- 2. Nasional -->
                <div class="bg-gradient-to-br from-[#722F99] to-[#581c87] border-2 border-white/80 hover:border-white rounded-2xl p-4 flex flex-col justify-between text-white shadow-lg shadow-purple-950/30 hover:scale-[1.02] transition-all">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-semibold text-white/95">Nasional</span>
                        <div class="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-amber-300 text-xs">
                            <i class="fas fa-flag"></i>
                        </div>
                    </div>
                    <div class="flex items-center justify-center py-2">
                        <span class="text-3xl font-extrabold text-white tracking-tight" id="statValMhsNas">64</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <span class="text-[11px] text-emerald-400 font-bold" id="statDiffMhsNas">+28 (+77.8%)</span>
                        <span class="text-[10px] text-purple-200 mt-0.5">Basis Awal: 36</span>
                    </div>
                </div>

                <!-- 3. Regional -->
                <div class="bg-gradient-to-br from-[#722F99] to-[#581c87] border-2 border-white/80 hover:border-white rounded-2xl p-4 flex flex-col justify-between text-white shadow-lg shadow-purple-950/30 hover:scale-[1.02] transition-all">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-semibold text-white/95">Regional</span>
                        <div class="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-amber-300 text-xs">
                            <i class="fas fa-map-marked-alt"></i>
                        </div>
                    </div>
                    <div class="flex items-center justify-center py-2">
                        <span class="text-3xl font-extrabold text-white tracking-tight" id="statValMhsReg">42</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <span class="text-[11px] text-emerald-400 font-bold" id="statDiffMhsReg">+14 (+50.0%)</span>
                        <span class="text-[10px] text-purple-200 mt-0.5">Basis Awal: 28</span>
                    </div>
                </div>

                <!-- 4. Lokal / Provinsi -->
                <div class="bg-gradient-to-br from-[#722F99] to-[#581c87] border-2 border-white/80 hover:border-white rounded-2xl p-4 flex flex-col justify-between text-white shadow-lg shadow-purple-950/30 hover:scale-[1.02] transition-all">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-semibold text-white/95">Lokal / Provinsi</span>
                        <div class="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-amber-300 text-xs">
                            <i class="fas fa-award"></i>
                        </div>
                    </div>
                    <div class="flex items-center justify-center py-2">
                        <span class="text-3xl font-extrabold text-white tracking-tight" id="statValMhsLok">35</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <span class="text-[11px] text-emerald-400 font-bold" id="statDiffMhsLok">+11 (+45.8%)</span>
                        <span class="text-[10px] text-purple-200 mt-0.5">Basis Awal: 24</span>
                    </div>
                </div>

                <!-- 5. Total Prestasi -->
                <div class="bg-gradient-to-br from-[#722F99] to-[#581c87] border-2 border-white/80 hover:border-white rounded-2xl p-4 flex flex-col justify-between text-white shadow-lg shadow-purple-950/30 hover:scale-[1.02] transition-all">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-semibold text-white/95">Total Capaian</span>
                        <div class="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-amber-300 text-xs">
                            <i class="fas fa-medal"></i>
                        </div>
                    </div>
                    <div class="flex items-center justify-center py-2">
                        <span class="text-3xl font-extrabold text-white tracking-tight" id="statValMhsTotalPrestasi">159</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <span class="text-[11px] text-emerald-400 font-bold" id="statDiffMhsTotalPrestasi">+59 (+59.0%)</span>
                        <span class="text-[10px] text-purple-200 mt-0.5">Basis Awal: 100</span>
                    </div>
                </div>

            </div>

            <!-- White Chart Card for Tren Prestasi -->
            <div class="mhs-prestasi-chart-card">
                <div class="mhs-prestasi-chart-header">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-chart-line text-[#722F99] text-xs"></i>
                        <h4 class="mhs-prestasi-chart-title">Tren Perkembangan Prestasi Mahasiswa (2020 - 2026)</h4>
                    </div>
                    <button type="button" class="mhs-prestasi-chart-info-btn" title="Tren capaian prestasi mahasiswa per tahun ajaran">
                        <i class="fas fa-info-circle"></i>
                    </button>
                </div>

                <!-- Legend with Harmonious Colors (No clashing yellow/blue) -->
                <div class="mhs-prestasi-chart-legend">
                    <div class="mhs-legend-item">
                        <span class="mhs-legend-box total"></span>
                        <span class="text-gray-700">Total Capaian</span>
                    </div>
                    <div class="mhs-legend-item">
                        <span class="mhs-legend-box nas"></span>
                        <span>Nasional</span>
                    </div>
                    <div class="mhs-legend-item">
                        <span class="mhs-legend-box reg"></span>
                        <span>Regional</span>
                    </div>
                    <div class="mhs-legend-item">
                        <span class="mhs-legend-box lok"></span>
                        <span>Lokal / Provinsi</span>
                    </div>
                    <div class="mhs-legend-item">
                        <span class="mhs-legend-box inter"></span>
                        <span>Internasional</span>
                    </div>
                </div>

                <!-- Canvas Line Chart -->
                <div class="mhs-prestasi-chart-canvas-wrap">
                    <canvas id="chartMhsTrenPrestasi"></canvas>
                </div>
            </div>

</x-shared.section-card>
