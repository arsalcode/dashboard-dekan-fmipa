<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DosenController extends BaseApiController
{
    public function getStatistics(Request $request): JsonResponse
    {
        $data = [
            'total_dosen' => 142,
            'dosen_tetap' => 118,
            'dosen_lb' => 24,
            'pendidikan' => [
                's3_doktor' => 92,
                's2_magister' => 50,
            ],
            'jabatan_fungsional' => [
                'guru_besar' => 12,
                'lektor_kepala' => 38,
                'lektor' => 58,
                'asisten_ahli' => 26,
                'tenaga_pengajar' => 8,
            ],
            'progress_studi_lanjut' => [
                'dalam_negeri' => 14,
                'luar_negeri' => 6,
                'selesai_tahun_ini' => 5,
            ],
            'chart_jabatan' => [
                'labels' => ['Guru Besar (Prof)', 'Lektor Kepala', 'Lektor', 'Asisten Ahli', 'Tenaga Pengajar'],
                'series' => [12, 38, 58, 26, 8],
            ],
            'chart_pendidikan' => [
                'labels' => ['Doktor (S3)', 'Magister (S2)'],
                'series' => [92, 50],
            ],
            'dosen_sample' => [
                ['nidn' => '0412037801', 'nama' => 'Prof. Dr. apt. Hj. Sri Wahyuni, M.Si.', 'prodi' => 'Farmasi', 'jabatan' => 'Guru Besar', 'pendidikan' => 'S3 Farmakologi', 'status' => 'Aktif'],
                ['nidn' => '0419088202', 'nama' => 'Dr. Asep Saepudin, M.Kom.', 'prodi' => 'Ilmu Komputer', 'jabatan' => 'Lektor Kepala', 'pendidikan' => 'S3 Ilmu Komputer', 'status' => 'Aktif'],
                ['nidn' => '0405118501', 'nama' => 'Dr. Ir. Diana Wulandari, M.Si.', 'prodi' => 'Biologi', 'jabatan' => 'Lektor Kepala', 'pendidikan' => 'S3 Bioteknologi', 'status' => 'Aktif'],
                ['nidn' => '0422048903', 'nama' => 'Dr. Hendra Gunawan, M.Si.', 'prodi' => 'Kimia', 'jabatan' => 'Lektor', 'pendidikan' => 'S3 Kimia Material', 'status' => 'Aktif'],
                ['nidn' => '0415079001', 'nama' => 'Rina Marlina, M.Mat.', 'prodi' => 'Matematika', 'jabatan' => 'Lektor', 'pendidikan' => 'S2 Matematika Murni', 'status' => 'Studi Lanjut S3'],
                ['nidn' => '0428028704', 'nama' => 'apt. Fajar Sidik, M.Farm.', 'prodi' => 'Profesi Apoteker', 'jabatan' => 'Lektor', 'pendidikan' => 'S2 Farmasi Klinis', 'status' => 'Aktif'],
            ]
        ];

        return $this->sendSuccess($data, 'Statistik dan data dosen berhasil dimuat');
    }
}