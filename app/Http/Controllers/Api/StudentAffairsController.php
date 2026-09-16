<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentAffairsController extends BaseApiController
{
    public function getOverview(Request $request): JsonResponse
    {
        $data = [
            'kpis' => [
                'total_prestasi' => [
                    'label' => 'Prestasi Terverifikasi (2025/2026)',
                    'value' => 76,
                    'unit' => 'Medali / Juara',
                    'trend_percentage' => 18.0,
                    'trend_direction' => 'up',
                    'subtext' => '24 Nasional, 8 Internasional',
                ],
                'penerima_beasiswa' => [
                    'label' => 'Mahasiswa Penerima Beasiswa',
                    'value' => 412,
                    'unit' => 'Mahasiswa',
                    'trend_percentage' => 6.5,
                    'trend_direction' => 'up',
                    'subtext' => 'KIP-Kuliah, Yayasan Pakuan, Swasta',
                ],
                'partisipasi_ormawa' => [
                    'label' => 'Partisipasi Organisasi Mahasiswa',
                    'value' => '68.5%',
                    'unit' => 'Aktif',
                    'trend_percentage' => 4.2,
                    'trend_direction' => 'up',
                    'subtext' => '14 Ormawa & Komunitas Ilmiah',
                ],
                'dana_kegiatan' => [
                    'label' => 'Dana Insentif Prestasi Mahasiswa',
                    'value' => 'Rp 385.000.000',
                    'trend_percentage' => 12.0,
                    'trend_direction' => 'up',
                    'subtext' => 'Meningkat dari tahun sebelumnya',
                ],
            ],
            'chart_prestasi_levels' => [
                'labels' => ['Tingkat Internasional', 'Tingkat Nasional', 'Tingkat Regional / Wilayah', 'Tingkat Universitas'],
                'series' => [8, 24, 28, 16],
            ],
            'chart_beasiswa_distribution' => [
                'categories' => ['KIP-Kuliah', 'Yayasan Pakuan Siliwangi', 'Djarum Beasiswa Plus', 'Bank Indonesia', 'Baznas Jawa Barat', 'Mitra Industri Farmasi/IT'],
                'recipients' => [180, 85, 45, 38, 34, 30],
            ],
            'prestasi_terbaru' => [
                ['mahasiswa' => 'Rizki Pratama & Tim', 'prodi' => 'Ilmu Komputer', 'kejuaraan' => 'Juara 1 Gemastik Bidang Software Development', 'tingkat' => 'Nasional', 'tahun' => 2025],
                ['mahasiswa' => 'Siti Aisyah Rahmawati', 'prodi' => 'Farmasi', 'kejuaraan' => 'Gold Medal World Young Invention Exhibition', 'tingkat' => 'Internasional', 'tahun' => 2025],
                ['mahasiswa' => 'Farhan Nugraha', 'prodi' => 'Biologi', 'kejuaraan' => 'Juara 2 Olimpiade Nasional MIPA (ON-MIPA)', 'tingkat' => 'Nasional', 'tahun' => 2025],
                ['mahasiswa' => 'Nadia Putri', 'prodi' => 'Kimia', 'kejuaraan' => 'Best Paper Annual Chemistry Symposium', 'tingkat' => 'Nasional', 'tahun' => 2024],
                ['mahasiswa' => 'Budi Santoso', 'prodi' => 'Matematika', 'kejuaraan' => 'Juara 1 Lomba Analisis Data Statistika', 'tingkat' => 'Regional', 'tahun' => 2025],
            ],
        ];

        return $this->sendSuccess($data, 'Data Bidang Kemahasiswaan (Wakil Dekan 3) berhasil dimuat');
    }
}