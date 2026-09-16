<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LabGisController extends Controller
{
    /**
     * Mengembalikan data statistik & chart performa unit bisnis Lab GIS Terpadu FMIPA
     */
    public function getStatistics(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Statistik kinerja unit bisnis Lab GIS Terpadu FMIPA berhasil dimuat',
            'data' => [
                'total_proyek' => 34,
                'luas_terpetakan' => '12.400 Ha',
                'total_omzet' => 'Rp 480.000.000',
                'mitra_instansi' => 18,
                'distribusi_layanan' => [
                    'Drone Mapping & Fotogrametri' => '40%',
                    'Analisis Tata Ruang & AMDAL' => '30%',
                    'WebGIS & Dashboard Geospasial' => '18%',
                    'Pelatihan & Sertifikasi GIS' => '12%',
                ],
                'chart_tren' => [
                    'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
                    'omzet' => [28, 35, 42, 38, 48, 55, 40, 45, 52, 58, 62, 68],
                    'luas' => [650, 820, 1100, 950, 1250, 1400, 1050, 1200, 1350, 1500, 1600, 1750],
                ],
                'chart_layanan' => [
                    'labels' => ['Drone Mapping & Lidar (40%)', 'Analisis Tata Ruang & AMDAL (30%)', 'WebGIS & Dashboard Geospasial (18%)', 'Training ArcGIS / QGIS (12%)'],
                    'series' => [40, 30, 18, 12],
                ],
                'chart_klien' => [
                    'labels' => ['Pemerintah Daerah & Kementerian (48%)', 'BUMN & Korporasi Perkebunan/Tambang (36%)', 'LSM Lingkungan & Akademisi (16%)'],
                    'series' => [48, 36, 16],
                ]
            ]
        ]);
    }
}
