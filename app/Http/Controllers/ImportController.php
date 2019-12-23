<?php

namespace App\Http\Controllers;

use App\Log;
use App\Retailer;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class ImportController extends Controller
{
    const CSV__HEADER = [];
    const HEADER__ACCOUNT = 'Account';
    const HEADER__TYPE = 'Type';
    const HEADER__ACCOUNT_NUMBER = 'Account Number';
    const HEADER__TRANSACTION_DATE = 'Transaction Date';
    const HEADER__CHEQUE = 'Cheque Number';
    const HEADER__DESCRIPTION_1 = 'Description 1';
    const HEADER__DESCRIPTION_2 = 'Description 2';
    const HEADER__CAD = 'CAD$';
    const HEADER__USD = 'USD$';

    public function import(Request $request)
    {
        $maxDate      =  Carbon::parse(Log::all()->max('datetime'));
        $allRetailers = Retailer::all('name')->toArray();

        /** @var Collection $file */
        $file = $request->files['file'];

        $forSaving = [];

        $file->each(function ($item) use (&$forSaving, $allRetailers, $maxDate) {

            $transactionDate = Carbon::parse($item[self::HEADER__TRANSACTION_DATE]);
            if($transactionDate->isBefore($maxDate)) {
                return null;
            }

            $description = join(", ", [
                $item[self::HEADER__DESCRIPTION_1],
                $item[self::HEADER__DESCRIPTION_2]
            ]);

            $retailer = $this->findRetailer($description, $allRetailers);

            $forSaving[] = [
                Log::FIELD__AMOUNT => $item[self::HEADER__CAD],
                Log::FIELD__DATETIME => $item[self::HEADER__TRANSACTION_DATE],
                Log::FIELD__RETAILER => $retailer,
                Log::FIELD__CATEGORY_ID => null,
                Log::FIELD__DESCRIPTION => $description,
            ];
        })->filter(function($item){
            return !is_null($item);
        });

        $result = DB::table('logs')->insert($forSaving);

        return new JsonResponse($result);
    }

    public function findRetailer($string, $retailers = []): string
    {
        $return = "";

        foreach ($retailers as $retailer) {
            $retailer = $retailer['name'];
            foreach (explode(" ", $retailer) as $ret) {
                if (stripos(strtolower($string), strtolower($ret)) !== false) {
                    $return = $ret;
                }
            }
        }

        return $return;
    }
}
