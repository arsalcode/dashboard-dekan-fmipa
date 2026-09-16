<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LabServiceController extends Controller
{
    /**
     * Mengembalikan data statistik & chart performa unit bisnis Lab Service FMIPA
     */
    public function getStatistics(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Statistik kinerja unit bisnis Lab Service ISO 17025 FMIPA berhasil dimuat',
            'data' => [
                'total_sampel' => 1280,
                'total_omzet' => 'Rp 980.000.000',
                'akurasi_validitas' => '99.4%',
                'mitra_industri' => 52,
                'distribusi_bidang' => [
                    'Kimia Lingkungan & Air' => '38%',
                    'Mikrobiologi & Uji Pangan' => '32%',
                    'Karakterisasi Bahan & Farmasi' => '18%',
                    'Kalibrasi & Pengujian Khusus' => '12%',
                ],
                'chart_tren' => [
                    'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
                    'omzet' => [65, 72, 85, 78, 92, 105, 80, 88, 98, 110, 115, 125],
                    'sampel' => [85, 95, 115, 105, 125, 140, 110, 120, 130, 145, 150, 165],
                ],
                'chart_bidang' => [
                    'labels' => ['Uji Air & Limbah Lingkungan (38%)', 'Mikrobiologi & Mutu Pangan (32%)', 'Spektrofotometri & HPLC (18%)', 'Kalibrasi Instrumen (12%)'],
                    'series' => [38, 32, 18, 12],
                ],
                'chart_klien' => [
                    'labels' => ['Pabrik Industri & Swasta (50%)', 'BUMN & PDAM (28%)', 'Penelitian Dosen/Mhs Eksternal (22%)'],
                    'series' => [50, 28, 22],
                ]
            ]
        ]);
    }
}
