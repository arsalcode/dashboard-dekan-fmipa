<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Display the Executive Dekan Dashboard overview.
     */
    public function index(Request $request)
    {
        return view('pages.dashboard.index');
    }
}
