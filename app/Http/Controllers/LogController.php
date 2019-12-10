<?php

namespace App\Http\Controllers;

use App\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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

    public function showDashboard()
    {
        $logs = DB::table('logs')
            ->select([
                'category_id',
                DB::raw('extract(month from datetime) as month'),
                DB::raw("sum(amount) as amount")
            ])
            ->where('user_id', Auth::user()->id)
            ->orderBy('category_id')
            ->orderBy(DB::raw('extract(month from datetime)'))
            ->groupBy([DB::raw("extract(month from datetime)"), 'category_id'])
            ->get()
            ->map(function (\stdClass $row) {
                return (array) $row;
            })
            ->extract2dColumn('category_id');

        foreach ($logs as &$log) {
            $log = array_combine(array_column($log, 'month'), $log);
        }

        return view('dashboard', compact('logs'));
    }
}
