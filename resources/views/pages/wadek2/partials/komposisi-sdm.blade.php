<!-- Section 2: Komposisi Sumber Daya Manusia -->
<x-shared.section-card title="Komposisi Sumber Daya Manusia" icon="fa-solid fa-users" sectionClass="section-wadek2">
    <!-- 3 Stat Cards Row -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <x-shared.stat-card title="Total SDM Dosen" value="0" subtext="Belum ada data" valueId="valWd2TotalSdm" subtextId="subWd2TotalSdm" />
        <x-shared.stat-card title="Dosen Bergelar Doktor (S3)" value="0" subtext="Belum ada data" valueId="valWd2DosenDoktor" subtextId="subWd2DosenDoktor" />
        <x-shared.stat-card title="Dosen Tersertifikasi (Serdos)" value="0" subtext="Belum ada data" valueId="valWd2DosenSerdos" subtextId="subWd2DosenSerdos" />
    </div>

    <!-- Charts Row (2 Kolom) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
        <!-- Chart 1: Status Kepegawaian Dosen (Donut) -->
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
            <div class="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-gray-100">
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-id-badge text-[#722F99]"></i>
                    <h3 class="text-sm font-bold text-gray-800">Distribusi Status Kepegawaian</h3>
                </div>
                <span class="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Tenaga Pengajar</span>
            </div>
            <div class="w-full h-72 relative flex items-center justify-center">
                <canvas id="chartWd2SDMComposition"></canvas>
            </div>
        </div>

        <!-- Chart 2: Jabatan Fungsional Akademik (Bar) -->
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
            <div class="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-gray-100">
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-graduation-cap text-[#722F99]"></i>
                    <h3 class="text-sm font-bold text-gray-800">Sebaran Jabatan Akademik Dosen</h3>
                </div>
                <span class="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Jenjang Karir</span>
            </div>
            <div class="w-full h-72 relative">
                <canvas id="chartWd2AcademicRank"></canvas>
            </div>
        </div>
    </div>
</x-shared.section-card>
