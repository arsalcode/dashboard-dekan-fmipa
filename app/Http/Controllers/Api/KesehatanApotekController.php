<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class KesehatanApotekController extends Controller
{
    /**
     * Mengembalikan data statistik & chart performa unit bisnis Kesehatan & Apotek FMIPA
     */
    public function getStatistics(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Statistik kinerja unit bisnis Kesehatan & Apotek FMIPA berhasil dimuat',
            'data' => [
                'total_transaksi' => 4120,
                'total_omzet' => 'Rp 340.000.000',
                'stok_aktif' => 185,
                'pasien_kunjungan' => 2650,
                'distribusi_kategori' => [
                    'Herbal Fitofarmaka FMIPA' => '42%',
                    'Obat Bebas & Resep' => '32%',
                    'Alkes & Layanan Cek Kesehatan' => '16%',
                    'Skincare & Kosmetik Alami' => '10%',
                ],
                'chart_tren' => [
                    'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
                    'omzet' => [22, 26, 31, 28, 34, 38, 30, 32, 35, 39, 41, 45],
                    'transaksi' => [290, 310, 380, 340, 410, 460, 380, 400, 430, 470, 490, 520],
                ],
                'chart_produk' => [
                    'labels' => ['Herbal Fitofarmaka FMIPA (42%)', 'Obat Bebas & Resep (32%)', 'Layanan Cek Kesehatan (16%)', 'Skincare & Personal Care (10%)'],
                    'series' => [42, 32, 16, 10],
                ],
                'chart_pelanggan' => [
                    'labels' => ['Sivitas Akademika (Dosen/Mhs) (52%)', 'Masyarakat Umum Sekitar (34%)', 'Mitra Klinik / Instansi (14%)'],
                    'series' => [52, 34, 14],
                ]
            ]
        ]);
    }
}
