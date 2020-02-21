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

        $maxDateRaw = RbcTransaction::all()->max(RbcTransaction::FIELD__TRANSACTION_DATE);

        if(isset($maxDateRaw)) {
            $maxDate      =  Carbon::parse($maxDateRaw);
            if($maxDate) {
                $file = $file->filter(function($item) use ($maxDate) {
                    $transactionDate = Carbon::parse($item[RbcTransaction::FIELD__TRANSACTION_DATE]);
                    return $transactionDate->isAfter($maxDate);
                });
            }
        }

        $toSave = $file->toArray();
        $result = DB::table('rbc_transaction')->insert($toSave);
        return new JsonResponse($result);
    }
}
