<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebMedsosController extends BaseApiController
{
    /**
     * Get aggregated website traffic and social media metrics
     */
    public function getStatistics(Request $request): JsonResponse
    {
        $data = [
            'total_kunjungan_web' => 68420,
            'pengunjung_unik' => 18650,
            'total_konten' => 142,
            'total_followers' => 24850,
            'distribusi_kanal' => [
                'website' => ['followers_or_users' => 18650, 'reach' => 68420, 'engagement' => '3.8m durasi'],
                'instagram' => ['followers_or_users' => 14200, 'reach' => 45600, 'engagement' => '6.4%'],
                'youtube' => ['followers_or_users' => 3100, 'reach' => 18200, 'engagement' => '8.2%'],
                'linkedin' => ['followers_or_users' => 2450, 'reach' => 8900, 'engagement' => '4.1%'],
                'tiktok' => ['followers_or_users' => 5100, 'reach' => 32400, 'engagement' => '9.5%'],
            ],
            'chart_traffic_bulanan' => [
                'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
                'pageviews' => [4200, 4800, 5600, 5200, 6100, 6900, 7400, 7100, 7800, 8200, 8900, 9300],
                'users' => [1800, 2100, 2400, 2200, 2700, 3100, 3300, 3100, 3500, 3700, 4000, 4200],
            ],
            'chart_sumber_trafik' => [
                'labels' => ['Organic Search Google (48%)', 'Direct / Langsung (24%)', 'Social Media (18%)', 'Referral & Backlink (10%)'],
                'series' => [48, 24, 18, 10],
            ],
            'chart_perangkat' => [
                'labels' => ['Mobile Phone (76%)', 'Desktop / Laptop (21%)', 'Tablet (3%)'],
                'series' => [76, 21, 3],
            ],
            'chart_kategori_konten' => [
                'labels' => ['Akademik & Kurikulum (42)', 'Prestasi Mahasiswa (36)', 'Kegiatan & Event (38)', 'Pengumuman Resmi (26)'],
                'series' => [42, 36, 38, 26],
            ]
        ];

        return $this->sendSuccess($data, 'Statistik traffic website dan multi-kanal media sosial berhasil dimuat');
    }
}
