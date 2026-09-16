<?php

namespace App\Http\Controllers\Wadek3;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Wadek3Controller extends Controller
{
    /**
     * Display the Wakil Dekan 3 (Bidang Kemahasiswaan) Executive Overview
     */
    public function index(Request $request)
    {
        return view('pages.wadek3.index');
    }
}
