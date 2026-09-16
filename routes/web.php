<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Wadek1\Wadek1Controller;
use App\Http\Controllers\Wadek2\Wadek2Controller;
use App\Http\Controllers\Wadek3\Wadek3Controller;
use App\Http\Controllers\DosenController;
use App\Http\Controllers\MahasiswaController;
use App\Http\Controllers\KurikulumController;
use App\Http\Controllers\PenelitianController;
use App\Http\Controllers\WebMedsosController;
use App\Http\Controllers\InstagramAnalyticsController;
use App\Http\Controllers\KerjasamaController;
use App\Http\Controllers\PartisipasiController;
use App\Http\Controllers\UnitBisnisController;
use App\Http\Controllers\ComstracDscController;
use App\Http\Controllers\KesehatanApotekController;
use App\Http\Controllers\LabGisController;
use App\Http\Controllers\LabServiceController;
use App\Http\Controllers\KelolaDataController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes - Dashboard Dekan FMIPA
|--------------------------------------------------------------------------
*/

// Dashboard Utama Dekan
Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/dashboard', [DashboardController::class, 'index']);

// Wakil Dekan 1 (Bidang Akademik)
Route::get('/wadek-1', [Wadek1Controller::class, 'index'])->name('wadek1.index');

// Wakil Dekan 2 (Bidang Keuangan & SDM)
Route::get('/wadek-2', [Wadek2Controller::class, 'index'])->name('wadek2.index');

// Wakil Dekan 3 (Bidang Kemahasiswaan)
Route::get('/wadek-3', [Wadek3Controller::class, 'index'])->name('wadek3.index');

// Data Operasional Dosen
Route::get('/dosen', [DosenController::class, 'index'])->name('dosen.index');

// Data Operasional Mahasiswa
Route::get('/mahasiswa', [MahasiswaController::class, 'index'])->name('mahasiswa.index');

// Kurikulum & Mata Kuliah FMIPA
Route::get('/kurikulum', [KurikulumController::class, 'index'])->name('kurikulum.index');

// Riset & Penelitian FMIPA
Route::get('/penelitian', [PenelitianController::class, 'index'])->name('penelitian.index');

// Web & Media Sosial FMIPA
Route::get('/web-medsos', [WebMedsosController::class, 'index'])->name('web-medsos.index');

// Instagram Analytics FMIPA (@fmipa_unpak)
Route::get('/instagram-analytics', [InstagramAnalyticsController::class, 'index'])->name('instagram-analytics.index');

// Data Operasional Kerjasama & Kemitraan FMIPA
Route::get('/kerjasama', [KerjasamaController::class, 'index'])->name('kerjasama.index');

// Data Operasional Partisipasi & Keaktifan Sivitas FMIPA
Route::get('/partisipasi', [PartisipasiController::class, 'index'])->name('partisipasi.index');

// Overview Unit Bisnis & Revenue FMIPA
Route::get('/unit-bisnis', [UnitBisnisController::class, 'index'])->name('unit-bisnis.index');

// Unit Bisnis: ComSTraC & DSC
Route::get('/comstrac-dsc', [ComstracDscController::class, 'index'])->name('comstrac-dsc.index');
Route::get('/unit-bisnis/comstrac-dsc', [ComstracDscController::class, 'index']);

// Unit Bisnis: Kesehatan & Apotek
Route::get('/kesehatan-apotek', [KesehatanApotekController::class, 'index'])->name('kesehatan-apotek.index');
Route::get('/unit-bisnis/kesehatan-apotek', [KesehatanApotekController::class, 'index']);

// Unit Bisnis: Lab GIS Terpadu
Route::get('/lab-gis', [LabGisController::class, 'index'])->name('lab-gis.index');
Route::get('/unit-bisnis/lab-gis', [LabGisController::class, 'index']);

// Unit Bisnis: Lab Service
Route::get('/lab-service', [LabServiceController::class, 'index'])->name('lab-service.index');
Route::get('/unit-bisnis/lab-service', [LabServiceController::class, 'index']);

// Pusat Upload & Kelola Data FMIPA
Route::get('/kelola-data', [KelolaDataController::class, 'index'])->name('kelola-data.index');
Route::get('/upload-data', [KelolaDataController::class, 'index']);





