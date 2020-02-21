<?php


namespace App\Http\Controllers;


use App\RbcTransaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;

class RBCTransactionController
{
    public function index()
    {
        $transactions = RbcTransaction::all()->sortBy(RbcTransaction::FIELD__TRANSACTION_DATE, SORT_DESC, true)->values()->all();
        return new JsonResponse($transactions);
    }
}
