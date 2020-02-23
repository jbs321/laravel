<?php

namespace App\Http\Controllers;

use App\Log;
use App\RbcTransaction;
use App\Retailer;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class ImportController extends Controller
{
    public function import(Request $request)
    {
        $file = $request->files['file'];
        $file->each(function($transaction) {
           RbcTransaction::firstOrCreate($transaction);
        });

        return new JsonResponse($file);
    }
}
