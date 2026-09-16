<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PartisipasiController extends Controller
{
    /**
     * Display Data Operasional Partisipasi & Keaktifan Sivitas FMIPA
     */
    public function index(Request $request)
    {
        return view('pages.partisipasi.index');
    }
}
