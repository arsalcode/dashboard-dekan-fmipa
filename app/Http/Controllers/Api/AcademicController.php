<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AcademicController extends BaseApiController
{
    public function getOverview(Request $request): JsonResponse
    {
        $prodi = $request->query('prodi', 'all');

        $data = [
            'kpis' => [
                'rata_ipk' => [
                    'label' => 'Rata-rata IPK Lulusan',
                    'value' => '3.58',
                    'unit' => '/ 4.00',
                    'trend_percentage' => 0.08,
                    'trend_direction' => 'up',
                    'subtext' => 'Kenaikan konsisten dalam 3 semester',
                ],
                'kelulusan_tepat_waktu' => [
                    'label' => 'Lulus Tepat Waktu (<= 4 Thn)',
                    'value' => '78.4%',
                    'unit' => 'Persentase',
                    'trend_percentage' => 5.2,
                    'trend_direction' => 'up',
                    'subtext' => 'Target fakultas: 75%',
                ],
                'retensi_tahun_1' => [
                    'label' => 'Tingkat Retensi Mahasiswa Baru',
                    'value' => '94.2%',
                    'unit' => 'Bertahan',
                    'trend_percentage' => 1.4,
                    'trend_direction' => 'up',
                    'subtext' => 'Tingkat dropout sangat rendah (< 3%)',
                ],
                'beban_mengajar' => [
                    'label' => 'Rata-rata Beban SKS Dosen',
                    'value' => '12.8',
                    'unit' => 'SKS / Smt',
                    'trend_percentage' => 0.4,
                    'trend_direction' => 'neutral',
                    'subtext' => 'Sesuai standar BKD Dikti (12-16 SKS)',
                ],
            ],
            'chart_ipk_per_prodi' => [
                'prodi' => ['Farmasi', 'Ilmu Komputer', 'Biologi', 'Kimia', 'Matematika', 'Profesi Apoteker'],
                'ipk_rata' => [3.62, 3.55, 3.54, 3.51, 3.48, 3.82],
                'ipk_tertinggi' => [3.98, 3.96, 3.94, 3.92, 3.91, 4.00],
            ],
            'chart_graduation_status' => [
                'labels' => ['Tepat Waktu (<= 4 Thn)', '4 - 5 Tahun', '5 - 6 Tahun', '> 6 Tahun'],
                'series' => [78.4, 15.2, 4.8, 1.6],
            ],
            'chart_thesis_progress' => [
                'stages' => ['Pengajuan Judul', 'Seminar Proposal', 'Penelitian Lab/Lapangan', 'Seminar Hasil', 'Sidang Skripsi'],
                'mahasiswa' => [180, 240, 310, 195, 165],
            ],
            'akreditasi_table' => [
                ['prodi' => 'S1 Farmasi', 'lembaga' => 'LAM-PTKes', 'peringkat' => 'Unggul', 'no_sk' => '0412/LAM-PTKes/Akr/Dip/VI/2024', 'kadaluarsa' => '2029-06-18'],
                ['prodi' => 'S1 Ilmu Komputer', 'lembaga' => 'LAM INFOKOM', 'peringkat' => 'Unggul', 'no_sk' => '089/SK/LAM-INFOKOM/Ak/S/IV/2024', 'kadaluarsa' => '2029-04-25'],
                ['prodi' => 'S1 Biologi', 'lembaga' => 'LAMSAMA', 'peringkat' => 'Unggul', 'no_sk' => '015/SK/LAMSAMA/Akred/S/III/2023', 'kadaluarsa' => '2028-03-12'],
                ['prodi' => 'S1 Kimia', 'lembaga' => 'LAMSAMA', 'peringkat' => 'Unggul', 'no_sk' => '024/SK/LAMSAMA/Akred/S/VIII/2023', 'kadaluarsa' => '2028-08-30'],
                ['prodi' => 'S1 Matematika', 'lembaga' => 'LAMSAMA', 'peringkat' => 'Baik Sekali', 'no_sk' => '009/SK/LAMSAMA/Akred/S/I/2024', 'kadaluarsa' => '2029-01-15'],
                ['prodi' => 'Profesi Apoteker', 'lembaga' => 'LAM-PTKes', 'peringkat' => 'Unggul', 'no_sk' => '0551/LAM-PTKes/Akr/Pro/IX/2024', 'kadaluarsa' => '2029-09-22'],
            ],
        ];

        return $this->sendSuccess($data, 'Data Bidang Akademik (Wakil Dekan 1) berhasil dimuat');
    }
}