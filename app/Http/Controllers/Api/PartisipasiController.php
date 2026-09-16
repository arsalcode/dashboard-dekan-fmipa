<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PartisipasiController extends BaseApiController
{
    /**
     * Get aggregated metrics for Partisipasi & Keaktifan Sivitas FMIPA
     */
    public function getStatistics(Request $request): JsonResponse
    {
        $data = [
            'rerata_partisipasi' => '86.8%',
            'total_mahasiswa_terlibat' => 2420,
            'total_kegiatan' => 128,
            'indeks_kepuasan_edom' => '3.82 / 4.00',
            'sebaran_kategori' => [
                'ormawa_kepemimpinan' => 45,
                'lomba_kompetisi' => 32,
                'program_mbkm' => 26,
                'seminar_workshop' => 18,
                'evaluasi_edom' => 7
            ],
            'partisipasi_prodi' => [
                'Ilmu Komputer' => '88.5%',
                'Farmasi' => '89.2%',
                'Biologi' => '85.4%',
                'Kimia' => '86.1%',
                'Matematika' => '84.8%'
            ],
            'chart_tren_bulanan' => [
                'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
                'partisipasi_peserta' => [120, 180, 240, 210, 310, 280, 190, 260, 340, 380, 290, 220],
                'target_peserta' => [150, 200, 250, 250, 300, 300, 200, 280, 350, 400, 300, 250]
            ],
            'chart_distribusi_kategori' => [
                'labels' => ['Ormawa & Kegiatan Kampus (35%)', 'Lomba & Kompetisi (25%)', 'Program MBKM (20%)', 'Seminar & Workshop (14%)', 'Survei / EDOM (6%)'],
                'series' => [35, 25, 20, 14, 6]
            ]
        ];

        return $this->sendSuccess($data, 'Statistik data partisipasi & keaktifan sivitas FMIPA berhasil dimuat');
    }
}
