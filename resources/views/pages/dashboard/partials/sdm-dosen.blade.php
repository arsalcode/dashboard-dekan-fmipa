<x-shared.section-card title="SDM Dosen" icon="fas fa-chalkboard-teacher" sectionClass="section-sdm-dosen">
    <!-- Stat Cards Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <x-shared.stat-card title="Total Dosen" value="0" subtext="Tetap: 0 | Kontrak: 0" valueId="valTotalDosen" subtextId="subTotalDosen" />
        <x-shared.stat-card title="Dosen Aktif" value="0" subtext="Keaktifan: 0.0%" valueId="valDosenAktif" subtextId="subDosenAktif" />
    </div>

    <!-- Distribution Charts Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
        <x-shared.chart-card title="Distribusi Status Dosen" canvasId="chartStatusDosen" />
        <x-shared.chart-card title="Jabatan Akademik" canvasId="chartJabatanDosen" />
        <x-shared.chart-card title="Sertifikasi Dosen" canvasId="chartSertifikasiDosen" />
    </div>
</x-shared.section-card>