<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class KurikulumController extends BaseApiController
{
    /**
     * Get aggregated curriculum and course statistics
     */
    public function getStatistics(Request $request): JsonResponse
    {
        $data = [
            'total_mata_kuliah' => 44,
            'total_sks' => 132,
            'mk_wajib' => 38,
            'mk_pilihan' => 6,
            'mk_aktif' => 39,
            'mk_non_aktif' => 5,
            'distribusi_prodi' => [
                'ilmu_komputer' => ['total' => 9, 'sks' => 27, 'wajib' => 7, 'pilihan' => 2],
                'biologi' => ['total' => 7, 'sks' => 21, 'wajib' => 6, 'pilihan' => 1],
                'kimia' => ['total' => 7, 'sks' => 22, 'wajib' => 6, 'pilihan' => 1],
                'matematika' => ['total' => 8, 'sks' => 24, 'wajib' => 6, 'pilihan' => 2],
                'farmasi' => ['total' => 8, 'sks' => 24, 'wajib' => 7, 'pilihan' => 1],
                'profesi_apoteker' => ['total' => 5, 'sks' => 14, 'wajib' => 5, 'pilihan' => 0],
            ],
            'chart_distribusi_prodi' => [
                'labels' => ['Ilmu Komputer', 'Biologi', 'Kimia', 'Matematika', 'Farmasi', 'Profesi Apoteker'],
                'series_wajib' => [7, 6, 6, 6, 7, 5],
                'series_pilihan' => [2, 1, 1, 2, 1, 0],
            ],
            'chart_status' => [
                'labels' => ['Aktif (39)', 'Non-Aktif (5)'],
                'series' => [39, 5],
            ],
            'chart_kategori' => [
                'labels' => ['Mata Kuliah Wajib (38)', 'Mata Kuliah Pilihan (6)'],
                'series' => [38, 6],
            ],
            'chart_sks' => [
                'labels' => ['2 SKS (4 MK)', '3 SKS (31 MK)', '4 SKS (9 MK)'],
                'series' => [4, 31, 9],
            ]
        ];

        return $this->sendSuccess($data, 'Statistik kurikulum dan mata kuliah berhasil dimuat');
    }
}
