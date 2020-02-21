<?php

namespace App;

use App\Traits\IdEncrypterTrait;
use Illuminate\Database\Eloquent\Model;

class RbcTransaction extends Model
{
    use IdEncrypterTrait;

    protected $table = 'rbc_transaction';

    const FIELD__ID = 'id';
    const FIELD__ACCOUNT_TYPE = 'account_type';
    const FIELD__ACCOUNT_NUMBER = 'account_number';
    const FIELD__TRANSACTION_DATE = 'transaction_date';
    const FIELD__CHEQUE_NUMBER = 'cheque_number';
    const FIELD__DESCRIPTION_1 = 'description_1';
    const FIELD__DESCRIPTION_2 = 'description_2';
    const FIELD__CAD = 'cad';
    const FIELD__USD = 'usd';

    protected $fillable = [
        self::FIELD__ACCOUNT_TYPE,
        self::FIELD__ACCOUNT_NUMBER,
        self::FIELD__TRANSACTION_DATE,
        self::FIELD__CHEQUE_NUMBER,
        self::FIELD__DESCRIPTION_1,
        self::FIELD__DESCRIPTION_2,
        self::FIELD__CAD,
        self::FIELD__USD,
    ];
}
