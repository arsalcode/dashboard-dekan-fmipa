<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UnitBisnisController extends BaseApiController
{
    /**
     * Get aggregated metrics for Overview Unit Bisnis FMIPA
     */
    public function getStatistics(Request $request): JsonResponse
    {
        $data = [
            'total_omzet' => 'Rp 2.450.000.000',
            'kontribusi_fakultas' => 'Rp 1.820.000.000',
            'net_profit_margin' => '34.8%',
            'total_klien' => 84,
            'total_layanan_aktif' => 42,
            'kinerja_per_unit' => [
                'Lab Pengujian Terpadu' => 'Rp 980.000.000',
                'IT & Software House' => 'Rp 650.000.000',
                'Training Center & Sertifikasi' => 'Rp 480.000.000',
                'Produksi Herbal & Biotek' => 'Rp 340.000.000'
            ],
            'chart_tren_omzet' => [
                'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
                'omzet' => [140, 165, 190, 175, 220, 245, 210, 230, 260, 280, 290, 310],
                'profit' => [48, 58, 66, 60, 78, 86, 72, 80, 92, 98, 102, 110]
            ],
            'chart_sebaran_unit' => [
                'labels' => ['Lab Terpadu ISO 17025 (40%)', 'IT & Software House (26%)', 'Training Center (20%)', 'Produksi Herbal & Biotek (14%)'],
                'series' => [40, 26, 20, 14]
            ],
            'chart_sektor_klien' => [
                'labels' => ['Perusahaan Swasta & Industri (48%)', 'Instansi Pemerintah & BUMN (28%)', 'UMKM & Perorangan (16%)', 'Kampus Eksternal (8%)'],
                'series' => [48, 28, 16, 8]
            ]
        ];

        return $this->sendSuccess($data, 'Statistik data kinerja unit bisnis FMIPA berhasil dimuat');
    }
}
