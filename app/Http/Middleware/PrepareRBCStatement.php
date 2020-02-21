<?php

namespace App\Http\Middleware;

use App\RbcTransaction;
use Carbon\Carbon;
use Closure;

class PrepareRBCStatement
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        foreach ($request->files as &$file) {
            $file = $file->map(function($item) {
                $data = [];
                $data[RbcTransaction::FIELD__ACCOUNT_TYPE]      = $item["Account Type"];
                $data[RbcTransaction::FIELD__ACCOUNT_NUMBER]    = $item["Account Number"];
                $data[RbcTransaction::FIELD__TRANSACTION_DATE]  = Carbon::parse($item["Transaction Date"]);
                $data[RbcTransaction::FIELD__CHEQUE_NUMBER]     = $item["Cheque Number"];
                $data[RbcTransaction::FIELD__DESCRIPTION_1]     = $item["Description 1"];
                $data[RbcTransaction::FIELD__DESCRIPTION_2]     = $item["Description 2"];
                $data[RbcTransaction::FIELD__CAD]               = $item["CAD$"];
                $data[RbcTransaction::FIELD__USD]               = $item["USD$"];
                return $data;
            });
        }
        return $next($request);
    }
}
