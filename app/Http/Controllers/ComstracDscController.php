<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ComstracDscController extends Controller
{
    /**
     * Menampilkan dashboard operasional dan performa unit bisnis ComSTraC & DSC
     */
    public function index()
    {
        return view('pages.comstrac-dsc.index');
    }
}
