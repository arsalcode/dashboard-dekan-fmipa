<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class KerjasamaController extends Controller
{
    /**
     * Display Data Operasional Kerjasama & Kemitraan Strategis FMIPA
     */
    public function index(Request $request)
    {
        return view('pages.kerjasama.index');
    }
}
