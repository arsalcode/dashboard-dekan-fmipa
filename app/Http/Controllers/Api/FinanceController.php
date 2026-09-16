<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FinanceController extends BaseApiController
{
    public function getOverview(Request $request): JsonResponse
    {
        $year = $request->query('year', '2025');

        $data = [
            'kpis' => [
                'total_pagu' => [
                    'label' => 'Total Pagu Anggaran FMIPA',
                    'value' => 'Rp 17.500.000.000',
                    'raw_value' => 17500000000,
                    'trend_percentage' => 8.5,
                    'trend_direction' => 'up',
                    'subtext' => 'Tahun Anggaran 2025/2026',
                ],
                'realisasi_anggaran' => [
                    'label' => 'Realisasi Serapan Dana',
                    'value' => 'Rp 14.805.000.000',
                    'raw_value' => 14805000000,
                    'percentage' => 84.6,
                    'trend_percentage' => 3.2,
                    'trend_direction' => 'up',
                    'subtext' => 'Sisa Pagu: Rp 2.695.000.000',
                ],
                'sdm_dosen_tetap' => [
                    'label' => 'Total Dosen Tetap',
                    'value' => 118,
                    'unit' => 'Orang',
                    'trend_percentage' => 2.6,
                    'trend_direction' => 'up',
                    'subtext' => 'Dosen LB: 24 Orang',
                ],
                'sdm_tendik' => [
                    'label' => 'Tenaga Kependidikan & Laboran',
                    'value' => 46,
                    'unit' => 'Orang',
                    'trend_percentage' => 0.0,
                    'trend_direction' => 'neutral',
                    'subtext' => '28 Pranata Laboratorium Pendidikan',
                ],
            ],
            'chart_cashflow' => [
                'months' => ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
                'pemasukan' => [1800, 1650, 1400, 2100, 1550, 1300, 2400, 1750, 1600, 1900, 1450, 1850],
                'pengeluaran' => [1250, 1400, 1300, 1850, 1420, 1200, 2150, 1600, 1500, 1780, 1380, 1650],
            ],
            'chart_anggaran_alokasi' => [
                'categories' => ['Operasional Pendidikan', 'Penelitian & Pengabdian', 'Sarpras & Lab', 'Kegiatan Mahasiswa', 'Pengembangan SDM'],
                'series' => [42.5, 22.0, 18.5, 10.0, 7.0],
            ],
            'chart_age_pyramid' => [
                'ranges' => ['< 30 Thn', '31 - 40 Thn', '41 - 50 Thn', '51 - 60 Thn', '> 60 Thn'],
                'pria' => [6, 22, 28, 18, 7],
                'wanita' => [8, 25, 20, 6, 2],
            ],
            'rekap_keuangan' => [
                ['kategori' => 'Operasional Pendidikan & Kuliah', 'pagu' => 7437500000, 'realisasi' => 6693750000, 'persen' => 90.0],
                ['kategori' => 'Riset, Publikasi & HKI', 'pagu' => 3850000000, 'realisasi' => 3388000000, 'persen' => 88.0],
                ['kategori' => 'Modernisasi Laboratorium & Alat', 'pagu' => 3237500000, 'realisasi' => 2590000000, 'persen' => 80.0],
                ['kategori' => 'Pembinaan Kemahasiswaan & Ormawa', 'pagu' => 1750000000, 'realisasi' => 1435000000, 'persen' => 82.0],
                ['kategori' => 'Studi Lanjut & Sertifikasi Dosen', 'pagu' => 1225000000, 'realisasi' => 698250000, 'persen' => 57.0],
            ]
        ];

        return $this->sendSuccess($data, 'Data Bidang Keuangan & SDM (Wakil Dekan 2) berhasil dimuat');
    }
}