<?php

namespace App\Http\Controllers\Wadek2;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Wadek2Controller extends Controller
{
    /**
     * Display the Wakil Dekan 2 (Keuangan & SDM) Executive Overview
     */
    public function index(Request $request)
    {
        return view('pages.wadek2.index');
    }
}
