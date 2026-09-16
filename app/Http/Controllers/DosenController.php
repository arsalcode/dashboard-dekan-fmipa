<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DosenController extends Controller
{
    /**
     * Display Data Operasional & Statistik Dosen FMIPA Universitas Pakuan
     */
    public function index(Request $request)
    {
        return view('pages.dosen.index');
    }
}
