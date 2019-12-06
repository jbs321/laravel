<?php

namespace App\Http\Controllers;

use App\Log;
use Illuminate\Http\Request;

class LogController extends Controller
{
    public function index()
    {
        return view('log');
    }

    public function post(Request $request)
    {
        (new Log($request->all()))->save();
        return view('log');
    }
}
