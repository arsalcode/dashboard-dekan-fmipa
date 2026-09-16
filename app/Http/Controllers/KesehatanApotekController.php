<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class KesehatanApotekController extends Controller
{
    /**
     * Menampilkan dashboard operasional dan performa unit bisnis Kesehatan & Apotek FMIPA
     */
    public function index()
    {
        return view('pages.kesehatan-apotek.index');
    }
}
