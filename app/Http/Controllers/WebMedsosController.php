<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WebMedsosController extends Controller
{
    /**
     * Display Data Operasional Web & Media Sosial FMIPA Universitas Pakuan
     */
    public function index(Request $request)
    {
        return view('pages.web-medsos.index');
    }
}
