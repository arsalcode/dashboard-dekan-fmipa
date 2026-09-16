<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends BaseApiController
{
    public function getOverview(Request $request): JsonResponse
    {
        $year = $request->query('year', '2025/2026');

        $data = [
            'academic_year' => $year,
            'faculty' => 'Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)',
            'university' => 'Universitas Pakuan',
            'kpis' => [
                'total_dosen' => [
                    'label' => 'Total Dosen Tetap & LB',
                    'value' => 142,
                    'unit' => 'Dosen',
                    'trend_percentage' => 4.2,
                    'trend_direction' => 'up',
                    'subtext' => '65% Bergelar Doktor (S3)',
                ],
                'total_mahasiswa' => [
                    'label' => 'Total Mahasiswa Aktif',
                    'value' => 3840,
                    'unit' => 'Mahasiswa',
                    'trend_percentage' => 7.8,
                    'trend_direction' => 'up',
                    'subtext' => 'Tersebar di 6 Program Studi',
                ],
                'serapan_anggaran' => [
                    'label' => 'Serapan Anggaran Berjalan',
                    'value' => 84.6,
                    'unit' => '%',
                    'trend_percentage' => 2.1,
                    'trend_direction' => 'up',
                    'subtext' => 'Rp 14.8 Miliar Terealisasi',
                ],
                'publikasi_riset' => [
                    'label' => 'Publikasi Scopus & Sinta',
                    'value' => 128,
                    'unit' => 'Artikel',
                    'trend_percentage' => 12.5,
                    'trend_direction' => 'up',
                    'subtext' => '42 Q1/Q2 Scopus Bereputasi',
                ],
                'prestasi_mahasiswa' => [
                    'label' => 'Prestasi Mahasiswa',
                    'value' => 76,
                    'unit' => 'Penghargaan',
                    'trend_percentage' => 18.0,
                    'trend_direction' => 'up',
                    'subtext' => '24 Tingkat Nasional & Internasional',
                ],
                'akreditasi_unggul' => [
                    'label' => 'Status Akreditasi Prodi',
                    'value' => '83.3%',
                    'unit' => 'Unggul / A',
                    'trend_percentage' => 16.7,
                    'trend_direction' => 'up',
                    'subtext' => '5 dari 6 Prodi Terakreditasi Unggul',
                ],
            ],
            'chart_student_trend' => [
                'years' => ['2021/2022', '2022/2023', '2023/2024', '2024/2025', '2025/2026'],
                'mahasiswa_baru' => [780, 850, 920, 1010, 1120],
                'lulusan' => [610, 680, 740, 830, 895],
            ],
            'chart_prodi_distribution' => [
                'categories' => ['Biologi', 'Farmasi', 'Ilmu Komputer', 'Kimia', 'Matematika', 'Profesi Apoteker'],
                'mahasiswa' => [620, 1250, 980, 480, 310, 200],
                'dosen' => [24, 42, 35, 19, 14, 8],
            ],
            'chart_anggaran_summary' => [
                'categories' => ['Q1 (Jan-Mar)', 'Q2 (Apr-Jun)', 'Q3 (Jul-Sep)', 'Q4 (Okt-Des)'],
                'pagu' => [4200, 4500, 4300, 4500],
                'realisasi' => [3950, 4320, 4100, 2430],
            ],
            'prodi_cards' => [
                ['name' => 'S1 Farmasi', 'akreditasi' => 'Unggul', 'mahasiswa' => 1250, 'dosen' => 42, 'rasio' => '1:29'],
                ['name' => 'S1 Ilmu Komputer', 'akreditasi' => 'Unggul', 'mahasiswa' => 980, 'dosen' => 35, 'rasio' => '1:28'],
                ['name' => 'S1 Biologi', 'akreditasi' => 'Unggul', 'mahasiswa' => 620, 'dosen' => 24, 'rasio' => '1:25'],
                ['name' => 'S1 Kimia', 'akreditasi' => 'Unggul', 'mahasiswa' => 480, 'dosen' => 19, 'rasio' => '1:25'],
                ['name' => 'S1 Matematika', 'akreditasi' => 'Baik Sekali', 'mahasiswa' => 310, 'dosen' => 14, 'rasio' => '1:22'],
                ['name' => 'Profesi Apoteker', 'akreditasi' => 'Unggul', 'mahasiswa' => 200, 'dosen' => 8, 'rasio' => '1:25'],
            ]
        ];

        return $this->sendSuccess($data, 'Overview Dashboard Dekan FMIPA berhasil dimuat');
    }
}