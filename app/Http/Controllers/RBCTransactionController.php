<?php


namespace App\Http\Controllers;


use App\Http\Requests\RBCTransactionRequest;
use App\RbcTransaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * TODO:: Requires Validation
 * Class RBCTransactionController
 * @package App\Http\Controllers
 */
class RBCTransactionController
{
    public function index()
    {
        $transactions = RbcTransaction::with('retailer')->get()
            ->sortBy(RbcTransaction::FIELD__TRANSACTION_DATE, SORT_DESC, true)
            ->map(function (RbcTransaction $trans) {
                $trans->retailerName = $trans->retailer->name ?? null;
                return $trans;
            })
            ->values()->all();

        return new JsonResponse($transactions);
    }

    public function update(RbcTransaction $transaction, RBCTransactionRequest $request)
    {
        $transaction->fill($request->all());
        $transaction->save();
        return new JsonResponse($transaction);
    }

    public function create(Request $request)
    {
        $transaction = new RbcTransaction();
        $transaction->fill($request->all());
        $transaction->save();
        return new JsonResponse($transaction);
    }

    public function delete(RbcTransaction $transaction)
    {
        return $transaction->delete();
    }
}
