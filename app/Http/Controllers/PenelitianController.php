<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PenelitianController extends Controller
{
    /**
     * Display Data Operasional & Riset Penelitian FMIPA Universitas Pakuan
     */
    public function index(Request $request)
    {
        return view('pages.penelitian.index');
    }
}
