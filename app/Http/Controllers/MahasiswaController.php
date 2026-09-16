<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MahasiswaController extends Controller
{
    /**
     * Display Data Operasional & Statistik Mahasiswa FMIPA Universitas Pakuan
     */
    public function index(Request $request)
    {
        return view('pages.mahasiswa.index');
    }
}
