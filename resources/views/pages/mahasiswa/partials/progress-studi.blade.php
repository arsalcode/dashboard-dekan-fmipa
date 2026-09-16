<!-- Section 3: Progress Tugas Akhir & Skripsi Mahasiswa -->
<x-shared.section-card title="Progress Tugas Akhir &amp; Skripsi" icon="fa-solid fa-book-reader" sectionClass="section-mahasiswa">
            
            <!-- Navigation & Info Toolbar -->
            <div class="mhs-studi-nav-toolbar">
                <button type="button" id="btnMhsStudiPrev" class="btn-mhs-studi-nav-pill" title="Lihat Mahasiswa Sebelumnya">
                    <i class="fas fa-arrow-left text-xs"></i>
                    <span>Sebelumnya</span>
                </button>

                <div class="mhs-studi-page-badge">
                    <i class="fas fa-user-check text-amber-300"></i>
                    <span>Monitoring Kelulusan Tepat Waktu (KTW)</span>
                </div>

                <button type="button" id="btnMhsStudiNext" class="btn-mhs-studi-nav-pill" title="Lihat Mahasiswa Selanjutnya">
                    <span>Selanjutnya</span>
                    <i class="fas fa-arrow-right text-xs"></i>
                </button>
            </div>

            <!-- Grid Kartu Mahasiswa TA (3 Kartu per Halaman) -->
            <div id="mhsStudiLanjutContainer" class="mhs-studi-grid">
                <!-- Diisi dinamis oleh mahasiswa-charts.js -->
            </div>

</x-shared.section-card>
