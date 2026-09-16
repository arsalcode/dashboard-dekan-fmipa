<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class KerjasamaController extends BaseApiController
{
    /**
     * Get aggregated metrics for Kerjasama & Kemitraan FMIPA
     */
    public function getStatistics(Request $request): JsonResponse
    {
        $data = [
            'total_kerjasama' => 48,
            'kerjasama_aktif' => 42,
            'kerjasama_berakhir' => 6,
            'realisasi_ia' => 76,
            'total_nilai_kontribusi' => 'Rp 3.850.000.000',
            'sebaran_tingkat' => [
                'nasional' => 32,
                'internasional' => 16
            ],
            'sebaran_jenis' => [
                'mou' => 18,
                'moa' => 20,
                'ia' => 10
            ],
            'sebaran_sektor' => [
                'industri_swasta' => 20,
                'perguruan_tinggi' => 16,
                'pemerintah_bumn' => 12
            ],
            'chart_tren_tahunan' => [
                'labels' => ['2021', '2022', '2023', '2024', '2025', '2026'],
                'nasional' => [12, 16, 20, 24, 28, 32],
                'internasional' => [4, 6, 8, 11, 14, 16],
                'total' => [16, 22, 28, 35, 42, 48]
            ]
        ];

        return $this->sendSuccess($data, 'Statistik data kerjasama & kemitraan FMIPA berhasil dimuat');
    }
}
