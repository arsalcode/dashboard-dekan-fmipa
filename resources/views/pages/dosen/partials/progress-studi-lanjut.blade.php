<!-- Section 3: Progress Studi Lanjut S3 Dosen -->
<x-shared.section-card title="Progress Studi Lanjut S3 Dosen" icon="fa-solid fa-graduation-cap" sectionClass="section-dosen">
            
            <!-- Navigation & Info Toolbar inside Purple Container -->
            <div class="flex items-center justify-between gap-3 flex-wrap">
                <button type="button" id="btnStudiPrev" class="btn-studi-nav-pill" title="Lihat Dosen Sebelumnya">
                    <i class="fa-solid fa-arrow-left text-xs"></i>
                    <span>Sebelumnya</span>
                </button>

                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold">
                    <i class="fa-solid fa-user-graduate text-amber-300"></i>
                    <span>Monitoring Dosen Tugas &amp; Izin Belajar S3</span>
                </div>

                <button type="button" id="btnStudiNext" class="btn-studi-nav-pill" title="Lihat Dosen Selanjutnya">
                    <span>Selanjutnya</span>
                    <i class="fa-solid fa-arrow-right text-xs"></i>
                </button>
            </div>

            <!-- Dynamic Grid Container for Monitored Lecturers -->
            <div id="studiLanjutContainer" class="studi-lanjut-grid">
                <!-- Rendered dynamically by dosen-charts.js -->
                <div class="col-span-full py-10 text-center text-slate-400">
                    <div class="flex flex-col items-center justify-center gap-2">
                        <div class="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#722F99] border border-purple-100 shadow-inner">
                            <i class="fa-solid fa-graduation-cap text-xl"></i>
                        </div>
                        <p class="font-bold text-slate-700 text-xs mt-1">Belum Ada Dosen Studi Lanjut S3 Terdaftar</p>
                        <p class="text-[11px] text-slate-400">Data dosen yang sedang menempuh tugas atau izin belajar akan otomatis dimonitor di sini saat data diupload.</p>
                    </div>
                </div>
            </div>

</x-shared.section-card>
