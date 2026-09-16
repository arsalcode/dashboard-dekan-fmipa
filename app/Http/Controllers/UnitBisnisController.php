<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UnitBisnisController extends Controller
{
    /**
     * Display Data Operasional & Overview Unit Bisnis FMIPA
     */
    public function index(Request $request)
    {
        return view('pages.unit-bisnis.index');
    }
}
