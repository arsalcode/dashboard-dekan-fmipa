<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InstagramAnalyticsController extends BaseApiController
{
    /**
     * Get aggregated Instagram metrics for @fmipa_unpak
     */
    public function getStatistics(Request $request): JsonResponse
    {
        $data = [
            'account' => '@fmipa_unpak',
            'followers' => 14280,
            'followers_growth_month' => 840,
            'reach' => 48650,
            'impressions' => 124000,
            'avg_engagement_rate' => '6.8%',
            'non_followers_reach_pct' => '34.2%',
            'chart_growth_bulanan' => [
                'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
                'followers' => [10400, 10800, 11250, 11600, 12050, 12450, 12900, 13350, 13700, 14050, 14200, 14280],
                'reach' => [28000, 31200, 34500, 32100, 38400, 42100, 45600, 43200, 46800, 49200, 52100, 54600]
            ],
            'chart_tipe_konten' => [
                'labels' => ['Reels Video (58%)', 'Carousel Post (28%)', 'Single Feed (14%)'],
                'series' => [58, 28, 14]
            ],
            'chart_demografi' => [
                'labels' => ['Mahasiswa Aktif (56%)', 'Alumni FMIPA (22%)', 'Calon Mahasiswa / Publik (15%)', 'Dosen & Tendik (7%)'],
                'series' => [56, 22, 15, 7]
            ],
            'chart_jam_aktif' => [
                'labels' => ['06:00', '09:00', '12:00', '15:00', '18:00', '20:00', '22:00'],
                'series' => [1200, 3400, 7800, 5600, 9200, 11400, 6800]
            ]
        ];

        return $this->sendSuccess($data, 'Statistik analitik Instagram @fmipa_unpak berhasil dimuat');
    }
}
