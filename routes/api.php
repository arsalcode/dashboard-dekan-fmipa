<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\AcademicController;
use App\Http\Controllers\Api\FinanceController;
use App\Http\Controllers\Api\StudentAffairsController;
use App\Http\Controllers\Api\DosenController;
use App\Http\Controllers\Api\MahasiswaController;
use App\Http\Controllers\Api\KurikulumController;
use App\Http\Controllers\Api\PenelitianController;
use App\Http\Controllers\Api\WebMedsosController;
use App\Http\Controllers\Api\InstagramAnalyticsController;
use App\Http\Controllers\Api\KerjasamaController;
use App\Http\Controllers\Api\PartisipasiController;
use App\Http\Controllers\Api\UnitBisnisController;
use App\Http\Controllers\Api\ComstracDscController;
use App\Http\Controllers\Api\KesehatanApotekController;
use App\Http\Controllers\Api\LabGisController;
use App\Http\Controllers\Api\LabServiceController;

/*
|--------------------------------------------------------------------------
| FMIPA UNPAK Executive Dashboard API Routes (v1)
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    // 1. Dashboard Utama
    Route::get('/dashboard/overview', [DashboardController::class, 'getOverview']);

    // 2. Wakil Dekan 1 (Akademik)
    Route::get('/academic/overview', [AcademicController::class, 'getOverview']);

    // 3. Wakil Dekan 2 (Keuangan & SDM)
    Route::get('/finance/overview', [FinanceController::class, 'getOverview']);

    // 4. Wakil Dekan 3 (Kemahasiswaan)
    Route::get('/student-affairs/overview', [StudentAffairsController::class, 'getOverview']);

    // 5. Data Operasional Dosen
    Route::get('/dosen/statistics', [DosenController::class, 'getStatistics']);

    // 6. Data Operasional Mahasiswa
    Route::get('/mahasiswa/statistics', [MahasiswaController::class, 'getStatistics']);

    // 7. Kurikulum & Mata Kuliah
    Route::get('/kurikulum/statistics', [KurikulumController::class, 'getStatistics']);

    // 8. Riset & Penelitian FMIPA
    Route::get('/penelitian/statistics', [PenelitianController::class, 'getStatistics']);

    // 9. Web & Media Sosial FMIPA
    Route::get('/web-medsos/statistics', [WebMedsosController::class, 'getStatistics']);

    // 10. Instagram Analytics (@fmipa_unpak)
    Route::get('/instagram-analytics/statistics', [InstagramAnalyticsController::class, 'getStatistics']);

    // 11. Kerjasama & Kemitraan FMIPA
    Route::get('/kerjasama/statistics', [KerjasamaController::class, 'getStatistics']);

    // 12. Partisipasi & Keaktifan Sivitas FMIPA
    Route::get('/partisipasi/statistics', [PartisipasiController::class, 'getStatistics']);

    // 13. Overview Unit Bisnis FMIPA
    Route::get('/unit-bisnis/statistics', [UnitBisnisController::class, 'getStatistics']);

    // 14. Unit Bisnis: ComSTraC & DSC
    Route::get('/comstrac-dsc/statistics', [ComstracDscController::class, 'getStatistics']);

    // 15. Unit Bisnis: Kesehatan & Apotek FMIPA
    Route::get('/kesehatan-apotek/statistics', [KesehatanApotekController::class, 'getStatistics']);

    // 16. Unit Bisnis: Lab GIS Terpadu FMIPA
    Route::get('/lab-gis/statistics', [LabGisController::class, 'getStatistics']);

    // 17. Unit Bisnis: Lab Service ISO 17025 FMIPA
    Route::get('/lab-service/statistics', [LabServiceController::class, 'getStatistics']);
});

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'framework' => 'Laravel 13',
        'faculty' => 'FMIPA Universitas Pakuan',
        'timestamp' => now()->toIso8601String()
    ]);
});