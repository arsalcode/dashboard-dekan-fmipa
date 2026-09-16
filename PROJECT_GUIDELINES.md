# 🏛️ FMIPA UNIVERSITAS PAKUAN - DASHBOARD DEKAN
## Project Architecture & Engineering Guidelines (`PROJECT_GUIDELINES.md`)

Dokumen ini adalah **Single Source of Truth (SSOT)** dan pedoman resmi untuk seluruh pengembangan sistem Dashboard Dekan FMIPA Universitas Pakuan. Seluruh baris kode (Frontend, Backend, Database, dan Migrasi) wajib mematuhi aturan dan prinsip yang tertulis di sini.

---

## 📑 DAFTAR ISI
1. [Tech Stack & Architecture Overview](#1-tech-stack--architecture-overview)
2. [Core Engineering Principles (KISS, YAGNI, DRY, SOLID)](#2-core-engineering-principles)
3. [Standar Struktur Folder Industri & Aturan Migrasi](#3-standar-struktur-folder-industri--aturan-migrasi)
4. [Solusi Anti-Duplikasi (Reusable Components Catalog)](#4-solusi-anti-duplikasi-reusable-components-catalog)
5. [Executive-Grade UI/UX Design Standards](#5-executive-grade-uiux-design-standards)
6. [Frontend & Blade Standards (Vite, Tailwind CSS, Charts)](#6-frontend--blade-standards)
7. [Backend Standards (Laravel 13, Services Layer, MySQL)](#7-backend-standards)
8. [Aturan Keamanan, Autentikasi, dan Lingkungan (.env)](#8-aturan-keamanan-autentikasi-dan-lingkungan-env)
9. [Do's and Don'ts Matrix](#9-dos-and-donts-matrix)

---

## 1. TECH STACK & ARCHITECTURE OVERVIEW

Sistem Dashboard Dekan FMIPA Universitas Pakuan dibangun dengan arsitektur enterprise modern berbasis **Laravel 13 Fullstack (Blade + Vite + Tailwind CSS v4)** dengan kesiapan **Decoupled REST API**:

```
┌────────────────────────────────────────────────────────────────────────┐
│               PRESENTATION LAYER (Blade + Vite + Tailwind)             │
│  - Reusable Blade Components (<x-stat-card>, <x-chart-card>)           │
│  - Styling: Tailwind CSS v4 + Vite Asset Pipeline                      │
│  - Interaktivitas & Visualisasi: ApexCharts / Chart.js Modular Modules │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Direct Injection / AJAX API
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               APPLICATION & BUSINESS LOGIC LAYER (Laravel 13)          │
│  - Controllers: Domain-Grouped (Dashboard, Wadek 1/2/3, Prodi, Dosen)  │
│  - Services Layer: Kalkulasi berat, agregasi data, rasio statistik     │
│  - FormRequests: Validasi input & filter tahun/prodi terpusat          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Eloquent ORM / Query Builder
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        DATA LAYER (MySQL Database)                     │
│  - Tabel Relasional: Dosen, Mahasiswa, Anggaran, Jurnal, Prestasi      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. CORE ENGINEERING PRINCIPLES

### 2.1 KISS (Keep It Simple, Stupid)
- Kode harus intuitif, terstruktur rapi, dan mudah dibaca tanpa perlu tebak-tebakan.
- **Frontend / Blade**: Gunakan layout inheritance (`<x-app-layout>`) dan reusable component. Hindari JavaScript inline yang berantakan di dalam file tampilan.
- **Backend**: Alur data lurus: `Route ➔ FormRequest ➔ Controller ➔ Service (jika agregasi rumit) ➔ View / JSON Resource`. Hindari abstraction layer berlebih jika query Eloquent sudah sangat jelas.

### 2.2 YAGNI (You Aren't Gonna Need It)
- Hanya buat tabel, model, endpoint API, dan komponen UI yang **nyata dibutuhkan** oleh modul dashboard saat ini:
  - **Dashboard Utama**: Executive Summary Dekan
  - **Wakil Dekan 1**: Bidang Akademik, IPK, Kelulusan, Retensi, Akreditasi
  - **Wakil Dekan 2**: Bidang Keuangan, Anggaran, SDM Dosen, Piramida Usia
  - **Wakil Dekan 3**: Bidang Kemahasiswaan, Prestasi, Kesejahteraan, Tren
  - **Data Master**: Dosen, Mahasiswa, Kurikulum
  - **6 Program Studi**: Biologi, Farmasi, Ilmu Komputer, Kimia, Matematika, Profesi Apoteker.
- Jangan menambahkan fitur spekulatif (*"siapa tahu nanti butuh payment gateway/multi-tenant"*) sebelum ada instruksi jelas.

### 2.3 DRY (Don't Repeat Yourself) — Solusi Anti-Duplikasi
- **Dilarang keras menyalin (copy-paste) markup HTML/Blade berulang-ulang**.
- Semua pola visual berulang (kartu angka KPI, dropdown filter prodi, baris tabel, dialog modal) **wajib dibungkus menjadi Reusable Blade Component** di `resources/views/components/`.
- **Backend**: Rumus kalkulasi (rasio dosen-mahasiswa, rata-rata IPK, persentase serapan dana) wajib dibuat di `app/Services/` terpusat, bukan dihitung manual di tiap view atau controller.

### 2.4 SOLID Principles
- **S (Single Responsibility)**: Satu Controller atau Service hanya mengemban satu tanggung jawab domain spesifik.
- **O (Open/Closed)**: Komponen Blade menerima atribut (`$attributes`, props) sehingga fleksibel tanpa perlu merusak struktur internalnya.
- **L (Liskov Substitution)**: Komponen turunan/varian tidak boleh merusak perilaku dasar komponen induk.
- **I (Interface Segregation)**: FormRequest & Service dipisah per domain data (`StoreDosenRequest`, `AkademikFilterRequest`), tidak satu file raksasa untuk semua modul.
- **D (Dependency Inversion)**: Controller bergantung pada Service Contracts / Injected Services, bukan logika query keras di controller.

---

## 3. STANDAR STRUKTUR FOLDER INDUSTRI & ATURAN MIGRASI

> [!IMPORTANT]
> Seluruh kode dari folder `Codingan Pindahin ke Laravel/` **wajib dipindahkan dan ditata ulang** mengikuti struktur folder berstandar industri berikut. Dilarang menumpuk file HTML mentah di dalam satu folder tanpa pengelompokan domain.

### 3.1 Peta Hirarki Folder Laravel 13 (Standard Industry Tree)

```text
dashboard_dekan_fmipa/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Controller.php                    # Base Controller
│   │   │   ├── DashboardController.php           # Dashboard Utama Dekan (Executive View)
│   │   │   ├── Wadek1/                           # Namespace Domain Wakil Dekan 1 (Akademik)
│   │   │   │   ├── Wadek1Controller.php          # Overview Wadek 1
│   │   │   │   ├── IpkKelulusanController.php
│   │   │   │   ├── RetensiTugasAkhirController.php
│   │   │   │   └── AkreditasiController.php
│   │   │   ├── Wadek2/                           # Namespace Domain Wakil Dekan 2 (Keuangan & SDM)
│   │   │   │   ├── Wadek2Controller.php          # Overview Wadek 2
│   │   │   │   ├── AnggaranController.php
│   │   │   │   ├── SdmDosenController.php
│   │   │   │   ├── PiramidaUsiaController.php
│   │   │   │   └── RiwayatKeuanganController.php
│   │   │   ├── Wadek3/                           # Namespace Domain Wakil Dekan 3 (Kemahasiswaan)
│   │   │   │   ├── Wadek3Controller.php          # Overview Wadek 3
│   │   │   │   ├── PrestasiKesejahteraanController.php
│   │   │   │   └── TrenKemahasiswaanController.php
│   │   │   ├── DosenController.php               # Data & Statistik Dosen
│   │   │   ├── MahasiswaController.php           # Data & Statistik Mahasiswa
│   │   │   ├── KurikulumController.php           # Kurikulum & Matakuliah
│   │   │   ├── ProdiController.php               # 6 Program Studi FMIPA
│   │   │   └── SettingController.php             # Profil & Konfigurasi Sistem
│   │   └── Requests/                             # Validasi Form & Filter Input
│   │       ├── FilterAkademikRequest.php
│   │       └── FilterAnggaranRequest.php
│   ├── Models/                                   # Eloquent Entities
│   │   ├── User.php
│   │   ├── ProgramStudi.php                      # Biologi, Farmasi, Ilkom, Kimia, Matematika, Apoteker
│   │   ├── Dosen.php
│   │   ├── Mahasiswa.php
│   │   ├── Kurikulum.php
│   │   ├── Anggaran.php
│   │   └── Prestasi.php
│   ├── Services/                                 # Business Logic & Heavy Aggregations Layer
│   │   ├── DashboardService.php                  # Agregasi KPI gabungan untuk Dekan
│   │   ├── AkademikService.php                   # Kalkulasi IPK, rasio kelulusan, retensi
│   │   ├── KeuanganService.php                   # Kalkulasi serapan anggaran & riwayat kas
│   │   ├── SdmService.php                        # Kalkulasi piramida usia & jabatan fungsional
│   │   └── KemahasiswaanService.php              # Agregasi data prestasi & aktivitas mhs
│   └── View/
│       └── Components/                           # Backend logic untuk Blade Component (opsional)
├── database/
│   ├── migrations/                               # Skema tabel MySQL terstruktur
│   ├── seeders/                                  # Data dummy realistis FMIPA Unpak
│   └── factories/
├── public/                                       # Direct Web Assets (Web-accessible)
│   ├── images/
│   │   ├── logo/                                 # Logo Unpak, FMIPA, Kemendikbud
│   │   ├── avatars/                              # Foto Dekan, Dosen, Kaprodi
│   │   └── illustrations/                        # Ilustrasi empty state / icons
│   └── favicon.ico
├── resources/
│   ├── css/
│   │   └── app.css                               # Tailwind CSS v4 Entry Point & Design Tokens
│   ├── js/
│   │   ├── app.js                                # Main JS Entry Point (Vite bundle)
│   │   ├── charts/                               # Modul Inisialisasi Grafik (ApexCharts / Chart.js)
│   │   │   ├── dashboard-charts.js
│   │   │   ├── wadek1-charts.js
│   │   │   ├── wadek2-charts.js
│   │   │   └── wadek3-charts.js
│   │   └── modules/                              # Script interaktif (Sidebar toggle, filters, export)
│   │       ├── sidebar.js
│   │       ├── prodi-filter.js
│   │       └── export-data.js
│   └── views/                                    # UI Presentation Layer (Blade Templates)
│       ├── layouts/                              # Master Layout Wrappers
│       │   ├── app.blade.php                     # Layout Utama (Sidebar + Topbar + Content Area)
│       │   ├── guest.blade.php                   # Layout halaman Login/Auth
│       │   ├── navigation/                       # Komponen Navigasi Utama
│       │   │   ├── sidebar.blade.php             # Sidebar FMIPA (Dinamis, Responsive, Active States)
│       │   │   ├── topbar.blade.php              # Topbar (User Profile, Notifikasi, Breadcrumb)
│       │   │   └── footer.blade.php
│       ├── components/                           # REUSABLE BLADE COMPONENTS (Katalog Bersama)
│       │   ├── ui/                               # Atomic UI Primitives
│       │   │   ├── button.blade.php
│       │   │   ├── badge.blade.php
│       │   │   ├── modal.blade.php
│       │   │   └── alert.blade.php
│       │   └── shared/                           # Composite Domain Components
│       │       ├── stat-card.blade.php           # Kartu KPI Metrik Angka
│       │       ├── chart-card.blade.php          # Wadah Grafik Seragam
│       │       ├── prodi-filter.blade.php        # Dropdown Filter 6 Prodi
│       │       ├── year-filter.blade.php         # Dropdown Filter Tahun/Semester
│       │       ├── data-table.blade.php          # Komponen Tabel Terpadu
│       │       ├── page-header.blade.php         # Judul Halaman + Breadcrumb
│       │       └── state-feedback.blade.php      # Skeleton, Error Retry, Empty State
│       └── pages/                                # HALAMAN APLIKASI (DOMAIN-ORGANIZED)
│           ├── dashboard/                        # Modul Dashboard Dekan
│           │   └── index.blade.php
│           ├── wadek1/                           # Modul Wakil Dekan 1 (Akademik)
│           │   ├── index.blade.php
│           │   ├── ipk-kelulusan.blade.php
│           │   ├── retensi-tugas-akhir.blade.php
│           │   └── akreditasi-beban-mengajar.blade.php
│           ├── wadek2/                           # Modul Wakil Dekan 2 (Keuangan & SDM)
│           │   ├── index.blade.php
│           │   ├── overview-anggaran.blade.php
│           │   ├── komposisi-sdm.blade.php
│           │   ├── piramida-usia-dosen.blade.php
│           │   └── riwayat-keuangan.blade.php
│           ├── wadek3/                           # Modul Wakil Dekan 3 (Kemahasiswaan)
│           │   ├── index.blade.php
│           │   ├── overview-mahasiswa.blade.php
│           │   ├── prestasi-kesejahteraan.blade.php
│           │   └── analisis-tren.blade.php
│           ├── dosen/                            # Modul Dosen
│           │   ├── index.blade.php
│           │   ├── statistik.blade.php
│           │   ├── jabatan-akademik.blade.php
│           │   ├── progress-studi-lanjut.blade.php
│           │   └── per-prodi.blade.php
│           ├── mahasiswa/                        # Modul Mahasiswa
│           │   ├── index.blade.php
│           │   ├── statistik.blade.php
│           │   ├── progress-studi.blade.php
│           │   ├── prestasi.blade.php
│           │   └── per-prodi.blade.php
│           ├── kurikulum/                        # Modul Kurikulum
│           │   └── index.blade.php
│           ├── prodi/                            # Modul 6 Program Studi FMIPA
│           │   ├── index.blade.php
│           │   ├── show.blade.php                # Template Dinamis Per Prodi
│           │   └── partials/                     # Sub-tab: SDM, Keuangan, Kemahasiswaan, Publikasi
│           │       ├── sdm-dosen.blade.php
│           │       ├── sdm-mahasiswa.blade.php
│           │       ├── keuangan.blade.php
│           │       ├── penelitian.blade.php
│           │       └── kemahasiswaan.blade.php
│           └── settings/                         # Pengaturan Sistem & Profil
│               └── index.blade.php
└── routes/
    ├── web.php                                   # Rute Tampilan Blade (Protected by Auth)
    └── api.php                                   # Rute REST API / AJAX Filter
```

---

### 3.2 Tabel Pemetaan Migrasi (Old Files ➔ Target Laravel Files)

Gunakan tabel ini sebagai panduan mutlak saat memindahkan aset dan kodingan:

| File Asal (`Codingan Pindahin ke Laravel/`) | File Tujuan di Laravel 13 | Tanggung Jawab / Keterangan |
|---|---|---|
| `page/index.html` + `sidebar.html` | `resources/views/layouts/app.blade.php`<br>`resources/views/layouts/navigation/sidebar.blade.php`<br>`resources/views/pages/dashboard/index.blade.php` | Dipecah menjadi Master Layout, Reusable Sidebar, dan Konten Dashboard Utama. |
| `page/setting.html` | `resources/views/pages/settings/index.blade.php` | Halaman pengaturan profil & preferensi. |
| `page/wakil dekan 1/*.html` | `resources/views/pages/wadek1/*.blade.php` | Halaman akademik, IPK, retensi, akreditasi. |
| `page/wakil dekan 2/*.html` | `resources/views/pages/wadek2/*.blade.php` | Halaman keuangan, anggaran, piramida usia, SDM. |
| `page/wakil dekan 3/*.html` | `resources/views/pages/wadek3/*.blade.php` | Halaman kemahasiswaan, prestasi, kesejahteraan. |
| `page/dosen/*.html` | `resources/views/pages/dosen/*.blade.php` | Statistik dosen, jabatan fungsional, studi lanjut. |
| `page/mahasiswa/*.html` | `resources/views/pages/mahasiswa/*.blade.php` | Data mahasiswa, IPK, progress studi, prestasi. |
| `page/kurikulum/*.html` | `resources/views/pages/kurikulum/index.blade.php` | Data sebaran kurikulum & mata kuliah. |
| `page/Prodi/[nama prodi]/*.html` | `resources/views/pages/prodi/show.blade.php` + `partials/*.blade.php` | **DILARANG copy-paste 6 folder prodi!** Cukup 1 view dinamis berbasis controller slug. |
| `css/style.css`, `css/sidebar.css`, `css/setting.css` | `resources/css/app.css` (Tailwind v4) | Dikonversi menjadi class utilitas Tailwind v4 dan variabel CSS root. |
| `js/*.js` (Script Chart.js & filter) | `resources/js/charts/*.js` & `resources/js/modules/*.js` | Dimodularisasi per fitur dan dibundle via Vite. |
| `image/*` | `public/images/` | Logo, foto pejabat, avatar, dan ikon visual. |

---

### 3.3 Lima Aturan Emas Arsitektur Folder (Golden Rules)

1. **Separation of Concerns (SoC)**:
   - File tampilan (`.blade.php`) **hanya boleh berisi kode presentasi** (HTML, class Tailwind, dan direktif Blade `@if`, `@foreach`).
   - Dilarang keras menulis query SQL langsung di dalam Blade (`@php DB::table(...) @endphp` adalah pelanggaran berat).
2. **Modular by Domain (Bukan Dump Folder)**:
   - Setiap fitur dikelompokkan ke dalam subfolder bernama domainnya (`wadek1/`, `wadek2/`, `dosen/`).
   - Dilarang meletakkan puluhan file `.blade.php` bertumpuk di root `resources/views/`.
3. **No Code Duplication for Prodi (Single Dynamic Template)**:
   - Folder asal memiliki 6 folder prodi terpisah dengan file yang 95% identik (`biologi`, `farmasi`, `ilmu komputer`, dll.).
   - Di Laravel, ini **wajib disatukan** menjadi satu Controller `ProdiController@show($slug)` dan satu set template Blade `resources/views/pages/prodi/show.blade.php` dengan partials modular.
4. **Fat Service, Skinny Controller**:
   - Controller hanya bertugas menerima request, memanggil service, dan mengembalikan view atau JSON.
   - Semua rumus hitungan agregasi (misal: persentase serapan dana, rasio dosen per prodi) wajib diletakkan di `app/Services/`.
5. **Asset Bundling via Vite**:
   - Dilarang menautkan belasan link `<link rel="stylesheet">` atau `<script>` CDN manual di setiap halaman.
   - Seluruh asset dikelola terpusat lewat directive `@vite(['resources/css/app.css', 'resources/js/app.js'])`.

---

## 4. SOLUSI ANTI-DUPLIKASI (REUSABLE COMPONENTS CATALOG)

Gunakan katalog komponen Blade bersama ini di seluruh halaman dashboard:

| Komponen Blade | Lokasi File | Fungsi & Penggunaan |
|---|---|---|
| `<x-shared.stat-card>` | `resources/views/components/shared/stat-card.blade.php` | Kartu metrik KPI (judul, angka, icon, persentase tren naik/turun, badge warna). |
| `<x-shared.chart-card>` | `resources/views/components/shared/chart-card.blade.php` | Wadah seragam untuk ApexCharts/Chart.js dengan header judul, deskripsi, filter tahun/periode, dan tombol ekspor. |
| `<x-shared.prodi-filter>` | `resources/views/components/shared/prodi-filter.blade.php` | Dropdown pemilihan 6 Prodi FMIPA (Biologi, Farmasi, Ilkom, Kimia, Matematika, Apoteker). |
| `<x-shared.year-filter>` | `resources/views/components/shared/year-filter.blade.php` | Kontrol dropdown Tahun Akademik & Semester ganjil/genap. |
| `<x-shared.data-table>` | `resources/views/components/shared/data-table.blade.php` | Komponen tabel seragam dengan pagination, search bar, dan styling rapi. |
| `<x-shared.page-header>` | `resources/views/components/shared/page-header.blade.php` | Header seragam tiap halaman (Breadcrumb, Judul Halaman, Badge status, Tombol aksi ekspor). |
| `<x-shared.state-feedback>` | `resources/views/components/shared/state-feedback.blade.php` | Penanganan standar untuk kondisi *Loading (Skeleton)*, *Error (Retry button)*, dan *Empty State*. |

---

## 5. EXECUTIVE-GRADE UI/UX DESIGN STANDARDS

Berdasarkan kesepakatan, desain lama ditingkatkan menjadi desain kelas eksekutif modern:

1. **Scannable & Visual Hierarchy**:
   - Angka metrik utama (KPI) wajib berukuran besar (`text-2xl` atau `text-3xl font-bold`) dan mudah terbaca dalam 3 detik pertama.
   - Gunakan hierarki tipografi modern (Inter / Plus Jakarta Sans).
2. **Harmonisasi Warna Identitas FMIPA Unpak**:
   - **Primary Purple**: `#722F99` (Ungu Khas Universitas Pakuan)
   - **Accent Gold / Amber**: Aksen prestasi dan kelulusan (`#F59E0B`)
   - **Neutral Slate/Zinc**: Latar belakang bersih (`bg-slate-50` / dark mode `bg-zinc-900`)
   - **Status Colors**: Emerald untuk tren positif, Rose untuk peringatan/tren menurun, Sky untuk data operasional.
3. **Grafik Interaktif Kelas Atas**:
   - Tooltip interaktif dengan format angka Indonesia (Rupiah/Desimal).
   - Animasi transisi yang halus (durasi 600ms-800ms) saat halaman dimuat atau filter diubah.
4. **Whitespace & Card Elevation**:
   - Berikan padding yang lega antar-seksi (`p-6` atau `p-8`).
   - Gunakan border halus (`border-slate-200/80`) dipadu bayangan lembut (`shadow-sm hover:shadow-md transition-shadow`).

---

## 6. FRONTEND & BLADE STANDARDS (Vite, Tailwind CSS, Charts)

### 6.1 Integrasi Vite & Tailwind CSS v4
- Konfigurasi aset menggunakan `@tailwindcss/vite` dan `laravel-vite-plugin`.
- Setiap layout Blade wajib memuat directive:
  ```blade
  @vite(['resources/css/app.css', 'resources/js/app.js'])
  ```

### 6.2 Aturan Modularitas JavaScript & Chart
- Dilarang menulis tag `<script>` raksasa di bagian bawah file HTML/Blade.
- Semua inisialisasi grafik dipisahkan ke dalam modul terpisah di `resources/js/charts/` dan diekspor sebagai fungsi yang menerima elemen target & data:
  ```javascript
  // resources/js/charts/dashboard-charts.js
  export function initAnggaranChart(elementId, chartData) {
      // Inisialisasi chart dengan tema warna standar Unpak
  }
  ```

### 6.3 Aturan Formatter Terpusat (Helpers)
Dilarang memformat angka secara manual di dalam file tampilan. Wajib menggunakan Blade Helpers atau Service:
- `number_format($angka, 0, ',', '.')` atau helper kustom `format_rupiah($angka)` ➔ `Rp 1.450.000.000`
- `format_angka($angka)` ➔ `1.250`
- `format_desimal($angka, 2)` ➔ `3.85`
- `format_tanggal_indo($date)` ➔ `10 September 2026`

---

## 7. BACKEND STANDARDS (Laravel 13, Services Layer, MySQL)

### 7.1 Struktur Controller Ramping (Skinny Controllers)
Setiap method controller berfokus pada koordinasi request dan response:
```php
namespace App\Http\Controllers\Wadek1;

use App\Http\Controllers\Controller;
use App\Services\AkademikService;
use Illuminate\Http\Request;

class IpkKelulusanController extends Controller
{
    public function __construct(
        protected AkademikService $akademikService
    ) {}

    public function index(Request $request)
    {
        $prodiId = $request->get('prodi_id');
        $tahun = $request->get('tahun', date('Y'));

        $statistics = $this->akademikService->getIpkStatistics($prodiId, $tahun);

        return view('pages.wadek1.ipk-kelulusan', compact('statistics'));
    }
}
```

### 7.2 Struktur Response JSON Konsisten (Jika Menggunakan AJAX/API)
Jika data dimuat secara dinamis via AJAX / REST API:
```json
{
  "success": true,
  "message": "Data berhasil dimuat",
  "data": { ... },
  "meta": {
    "tahun": "2025/2026",
    "prodi": "Ilmu Komputer"
  }
}
```

### 7.3 Aturan Kalkulasi Berat (Heavy Aggregations)
- **Dilarang** menyuruh browser mengiterasi ribuan baris data untuk mencari rasio atau rata-rata.
- Seluruh agregasi, rata-rata, persentase, dan pengelompokan usia/jabatan **wajib dihitung di tingkat MySQL Database / Laravel Service**.
- Tampilan hanya menerima hasil ringkas yang siap dipetakan ke chart atau tabel.

---

## 8. ATURAN KEAMANAN, AUTENTIKASI, DAN LINGKUNGAN (.ENV)

1. **Environment Variables**:
   - Dilarang keras *hardcode* kredensial database atau IP di dalam file kode.
   - Selalu gunakan `env('KEY')` melalui file konfigurasi `config/*.php`.
2. **Autentikasi & Otorisasi**:
   - Menggunakan Laravel Auth / Sanctum.
   - Role akses dibatasi menggunakan Middleware (`CheckRole`):
     - **Dekan**: Akses penuh ke seluruh dashboard & data eksekutif.
     - **Wakil Dekan 1**: Akses modul akademik, akreditasi, kelulusan.
     - **Wakil Dekan 2**: Akses modul keuangan, anggaran, SDM dosen.
     - **Wakil Dekan 3**: Akses modul kemahasiswaan, prestasi, alumni.
     - **Kaprodi**: Akses terbatas pada data program studinya sendiri.
3. **Proteksi CSRF**:
   - Seluruh formulir POST/PUT/DELETE wajib menyertakan `@csrf`.

---

## 9. DO'S AND DON'TS MATRIX

| Topik | Dilarang Keras (Don'ts) ❌ | Wajib Dilakukan (Do's) ✅ |
|---|---|---|
| **Struktur Folder** | Menumpuk puluhan file HTML mentah di root `views/`. | Kelompokkan per domain di `resources/views/pages/{domain}/`. |
| **Halaman Prodi** | Membuat 6 folder program studi terpisah yang isinya sama. | Buat 1 view dinamis `show.blade.php` dengan partials modular. |
| **Komponen** | Menulis ulang markup kartu metrik & filter di tiap halaman. | Gunakan Blade Components (`<x-shared.stat-card>`, dll.). |
| **Arsitektur** | Menaruh query database / hitungan rumit di file Blade. | Pindahkan ke `app/Services/` dan Controller. |
| **Styling** | Menulis `<style>` inline ribuan baris di dalam file HTML. | Gabungkan ke `resources/css/app.css` via Tailwind CSS v4. |
| **JavaScript** | Menaruh tag `<script>` grafik terduplikasi di tiap file. | Pisahkan modular di `resources/js/charts/` via Vite bundle. |
| **Performa** | Menghitung agregasi ribuan baris di browser pengguna. | Lakukan agregasi dan komputasi di MySQL / Laravel Query Builder. |
| **UX State** | Membiarkan halaman kosong atau macet saat loading/error. | Sediakan 3 status UI: Skeleton Loading, Error Retry, & Empty State. |

---

*Disepakati dan disahkan sebagai acuan utama proyek Dashboard Dekan FMIPA Universitas Pakuan.*
