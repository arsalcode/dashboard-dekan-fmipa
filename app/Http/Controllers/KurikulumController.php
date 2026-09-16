<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class KurikulumController extends Controller
{
    /**
     * Display Data Kurikulum & Mata Kuliah FMIPA Universitas Pakuan
     */
    public function index(Request $request)
    {
        return view('pages.kurikulum.index');
    }
}
