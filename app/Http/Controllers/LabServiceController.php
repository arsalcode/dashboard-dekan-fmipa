<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LabServiceController extends Controller
{
    /**
     * Menampilkan dashboard operasional dan performa unit bisnis Lab Service FMIPA
     */
    public function index()
    {
        return view('pages.lab-service.index');
    }
}
