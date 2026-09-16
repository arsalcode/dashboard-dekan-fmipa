<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MahasiswaController extends BaseApiController
{
    public function getStatistics(Request $request): JsonResponse
    {
        $data = [
            'total_aktif' => 3840,
            'total_cuti' => 45,
            'total_lulus_tahun_ini' => 895,
            'total_dropout' => 12,
            'chart_angkatan' => [
                'angkatan' => ['2022', '2023', '2024', '2025'],
                'mahasiswa' => [810, 890, 1020, 1120],
            ],
            'chart_gender' => [
                'labels' => ['Perempuan', 'Laki-laki'],
                'series' => [2380, 1460],
            ],
            'chart_prodi' => [
                'prodi' => ['Farmasi', 'Ilmu Komputer', 'Biologi', 'Kimia', 'Matematika', 'Profesi Apoteker'],
                'total' => [1250, 980, 620, 480, 310, 200],
            ],
            'mahasiswa_sample' => [
                ['npm' => '065122001', 'nama' => 'Muhammad Fikri Arsalan', 'prodi' => 'Ilmu Komputer', 'angkatan' => '2022', 'ipk' => 3.88, 'status' => 'Aktif'],
                ['npm' => '066122045', 'nama' => 'Annisa Zahra Khairunnisa', 'prodi' => 'Farmasi', 'angkatan' => '2022', 'ipk' => 3.92, 'status' => 'Aktif'],
                ['npm' => '064123012', 'nama' => 'Dwi Aditya Pratama', 'prodi' => 'Biologi', 'angkatan' => '2023', 'ipk' => 3.75, 'status' => 'Aktif'],
                ['npm' => '063123028', 'nama' => 'Dewi Anggraeni', 'prodi' => 'Kimia', 'angkatan' => '2023', 'ipk' => 3.68, 'status' => 'Aktif'],
                ['npm' => '062124005', 'nama' => 'Bintang Ramadhan', 'prodi' => 'Matematika', 'angkatan' => '2024', 'ipk' => 3.82, 'status' => 'Aktif'],
            ]
        ];

        return $this->sendSuccess($data, 'Statistik dan data mahasiswa berhasil dimuat');
    }
}