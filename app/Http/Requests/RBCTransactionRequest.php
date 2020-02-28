<?php

namespace App\Http\Requests;

use App\RbcTransaction;
use Illuminate\Foundation\Http\FormRequest;

class RBCTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            RbcTransaction::FIELD__CAD => 'required|numeric|nullable',
            RbcTransaction::FIELD__USD => 'numeric|nullable',
            RbcTransaction::FIELD__RETAILER_ID => 'required|exists:retailers,id|numeric',
            RbcTransaction::FIELD__DESCRIPTION_1 => 'required',
            RbcTransaction::FIELD__TRANSACTION_DATE => 'required|date',
        ];
    }
}
