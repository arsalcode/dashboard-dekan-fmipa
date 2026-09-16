<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InstagramAnalyticsController extends Controller
{
    /**
     * Display Data Operasional & Analytics Instagram @fmipa_unpak
     */
    public function index(Request $request)
    {
        return view('pages.instagram-analytics.index');
    }
}
