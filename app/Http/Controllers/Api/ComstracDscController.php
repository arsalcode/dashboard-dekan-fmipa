<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ComstracDscController extends Controller
{
    /**
     * Mengembalikan data statistik & chart performa unit bisnis ComSTraC & DSC
     */
    public function getStatistics(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Statistik performa unit bisnis ComSTraC & DSC berhasil dimuat',
            'data' => [
                'total_peserta' => 865,
                'proyek_software' => 28,
                'total_omzet' => 'Rp 650.000.000',
                'kepuasan_klien' => '4.88 / 5.00',
                'distribusi_program' => [
                    'Bootcamp & Pelatihan IT' => '38%',
                    'Sertifikasi Kompetensi BNSP/Vendor' => '30%',
                    'Software & Web House' => '22%',
                    'Data Science & AI Consulting' => '10%',
                ],
                'chart_tren' => [
                    'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
                    'revenue' => [35, 42, 58, 48, 62, 70, 54, 60, 68, 75, 78, 85],
                    'peserta' => [45, 55, 80, 65, 85, 95, 70, 80, 90, 100, 105, 115],
                ],
                'chart_bidang' => [
                    'labels' => ['Fullstack & Mobile Dev (38%)', 'Sertifikasi BNSP / Cloud (30%)', 'Software House & Custom App (22%)', 'Data Analytics & AI (10%)'],
                    'series' => [38, 30, 22, 10],
                ],
                'chart_klien' => [
                    'labels' => ['Instansi Korporat & Industri (45%)', 'Mahasiswa & Publik (35%)', 'BUMN & Pemerintahan (20%)'],
                    'series' => [45, 35, 20],
                ]
            ]
        ]);
    }
}
