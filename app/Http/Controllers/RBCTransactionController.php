<?php


namespace App\Http\Controllers;


use App\Http\Requests\RBCTransactionRequest;
use App\RbcTransaction;
use App\Retailer;
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
//        ->where('retailer_id', '=', null)
        $transactions = RbcTransaction::with('retailer')->get()
            ->sortBy(RbcTransaction::FIELD__TRANSACTION_DATE, SORT_DESC, true)
            ->map(function (RbcTransaction $trans) {
                $trans->retailerName = $trans->retailer->name ?? null;
                return $trans;
            })
            ->values()->all();

        return new JsonResponse($transactions);
    }

    public function updateTransactionRetailers(Request $request, Retailer $retailer)
    {
        $request->validate([
            'transactions' => 'required|array|min:1',
            'transactions.*' => 'required|array',
            'transactions.*.id' => 'required|integer|exists:rbc_transaction,id',
        ]);

        $data = $request->all();

        $transactions = array_map(function (array $trans) {
            return ['id' => $trans['id']];
        }, $data['transactions']);

        $id = $request->get('retailer')['id'];
        RbcTransaction::whereIn('id', $transactions)->update(['retailer_id' => $id]);

        return $this->index();
    }

    public function update(Request $request, RbcTransaction $transaction)
    {
        $request->validate([
            'account_type' => "required|string|max:255",
            'account_number' => "string|max:255",
            'transaction_date' => "string|max:20",
            'cheque_number' => "string|nullable|max:255",
            'description_1' => "required|string|min:1|max:255",
            'description_2' => "string|nullable|max:255",
            'cad' => "string|max:255",
            'usd' => "string|nullable|max:255",
//            'retailer_id' => "integer",
        ]);

        $transaction->fill($request->all());
        $transaction->save();

        $transaction->retailer;

        return $transaction;
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
        $transaction->delete();
        return new JsonResponse($transaction->id);
    }
}
