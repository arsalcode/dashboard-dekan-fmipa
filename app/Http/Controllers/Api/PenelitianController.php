<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PenelitianController extends BaseApiController
{
    /**
     * Get aggregated research and grant statistics
     */
    public function getStatistics(Request $request): JsonResponse
    {
        $data = [
            'total_penelitian' => 68,
            'total_dana_hibah' => 'Rp 1.850.000.000',
            'publikasi_scopus_sinta' => 54,
            'hibah_eksternal' => 24,
            'hibah_internal' => 32,
            'mandiri_kerjasama' => 12,
            'distribusi_prodi' => [
                'ilmu_komputer' => ['total' => 14, 'dana' => 410000000, 'scopus' => 12],
                'biologi' => ['total' => 12, 'dana' => 340000000, 'scopus' => 9],
                'kimia' => ['total' => 13, 'dana' => 380000000, 'scopus' => 11],
                'matematika' => ['total' => 9, 'dana' => 210000000, 'scopus' => 6],
                'farmasi' => ['total' => 12, 'dana' => 360000000, 'scopus' => 10],
                'profesi_apoteker' => ['total' => 8, 'dana' => 150000000, 'scopus' => 6],
            ],
            'chart_distribusi_prodi' => [
                'labels' => ['Ilmu Komputer', 'Biologi', 'Kimia', 'Matematika', 'Farmasi', 'Profesi Apoteker'],
                'series_eksternal' => [6, 5, 5, 3, 4, 1],
                'series_internal' => [8, 7, 8, 6, 8, 7],
            ],
            'chart_skema' => [
                'labels' => ['Kemendikbud (24)', 'Internal UNPAK (32)', 'Kerjasama Industri (12)'],
                'series' => [24, 32, 12],
            ],
            'chart_luaran' => [
                'labels' => ['Jurnal Scopus Q1-Q4 (28)', 'Jurnal SINTA 1-3 (26)', 'Paten & HKI (14)'],
                'series' => [28, 26, 14],
            ],
            'chart_status' => [
                'labels' => ['Selesai (52)', 'Berjalan (14)', 'Tahap Review (2)'],
                'series' => [52, 14, 2],
            ]
        ];

        return $this->sendSuccess($data, 'Statistik riset dan penelitian dosen berhasil dimuat');
    }
}
