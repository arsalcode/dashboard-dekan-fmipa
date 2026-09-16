<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class KelolaDataController extends Controller
{
    /**
     * Display Pusat Upload & Kelola Data Terpadu FMIPA Universitas Pakuan
     */
    public function index(Request $request)
    {
        return view('pages.kelola-data.index');
    }
}
