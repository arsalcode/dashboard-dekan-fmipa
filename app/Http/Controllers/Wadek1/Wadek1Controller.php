<?php

namespace App\Http\Controllers\Wadek1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Wadek1Controller extends Controller
{
    /**
     * Display the Wakil Dekan 1 (Akademik) Executive Overview
     */
    public function index(Request $request)
    {
        return view('pages.wadek1.index');
    }
}
