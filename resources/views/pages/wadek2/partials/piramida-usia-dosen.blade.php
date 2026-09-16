<!-- Section 3: Piramida Usia Dosen & Regenerasi -->
<x-shared.section-card title="Piramida Usia Dosen" icon="fa-solid fa-user-clock" sectionClass="section-wadek2">
    <!-- Charts Row (2 Kolom: Piramida Demografi Usia L/P & Distribusi Beasiswa) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
        <!-- Chart 1: Piramida Demografi Usia Dosen Laki-laki & Perempuan -->
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
            <div class="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-gray-100">
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-venus-mars text-[#722F99]"></i>
                    <h3 class="text-sm font-bold text-gray-800">Demografi Usia Dosen (L/P)</h3>
                </div>
                <div class="flex items-center gap-3 text-[11px] font-semibold">
                    <span class="inline-flex items-center gap-1 text-purple-700">
                        <span class="w-2.5 h-2.5 rounded-full bg-[#722F99]"></span> Laki-laki
                    </span>
                    <span class="inline-flex items-center gap-1 text-pink-600">
                        <span class="w-2.5 h-2.5 rounded-full bg-[#ec4899]"></span> Perempuan
                    </span>
                </div>
            </div>
            <div class="w-full h-72 relative">
                <canvas id="chartWd2PiramidaUsia"></canvas>
            </div>
        </div>

        <!-- Chart 2: Penerima Beasiswa / Tugas Belajar SDM -->
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
            <div class="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-gray-100">
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-award text-[#722F99]"></i>
                    <h3 class="text-sm font-bold text-gray-800">Sebaran Beasiswa &amp; Studi Lanjut SDM</h3>
                </div>
                <span class="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Aktif 2026</span>
            </div>
            <div class="w-full h-72 relative flex items-center justify-center">
                <canvas id="chartWd2DistribusiBeasiswa"></canvas>
            </div>
        </div>
    </div>
</x-shared.section-card>
