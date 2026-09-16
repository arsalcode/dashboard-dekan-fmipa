<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LabGisController extends Controller
{
    /**
     * Menampilkan dashboard operasional dan performa unit bisnis Lab GIS Terpadu FMIPA
     */
    public function index()
    {
        return view('pages.lab-gis.index');
    }
}
