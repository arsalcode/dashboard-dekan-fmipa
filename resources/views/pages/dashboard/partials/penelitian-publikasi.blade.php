<!-- Section: Penelitian & Publikasi -->
<x-shared.section-card title="Penelitian & Publikasi" icon="fas fa-microscope" sectionClass="section-penelitian-publikasi">
    <!-- 2 Stat Metric Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
        <x-shared.stat-card title="Total Penelitian" value="0" subtext="Belum ada data" valueId="valTotalPenelitian" subtextId="subTotalPenelitian" />
        <x-shared.stat-card title="Publikasi Tahun Ini" value="0" subtext="Belum ada data" valueId="valPublikasiTahunIni" subtextId="subPublikasiTahunIni" />
    </div>

    <!-- 2 Distribution Charts Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        <x-shared.chart-card title="Proposal Penelitian per Prodi" canvasId="chartProposalProdi" heightClass="h-56" />
        <x-shared.chart-card title="Publikasi Dosen FMIPA" canvasId="chartPublikasiDosen" heightClass="h-56" />
    </div>
</x-shared.section-card>
