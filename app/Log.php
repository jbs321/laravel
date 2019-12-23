<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    const FIELD__AMOUNT = "amount";
    const FIELD__DESCRIPTION = "description";
    const FIELD__CATEGORY_ID = "category_id";
    const FIELD__RETAILER = "retailer";
    const FIELD__DATETIME = "datetime";

    protected $table = 'logs';

    protected $fillable = [
        self::FIELD__AMOUNT,
        self::FIELD__DESCRIPTION,
        self::FIELD__CATEGORY_ID,
        self::FIELD__RETAILER,
        self::FIELD__DATETIME,
    ];

    public function category()
    {
        return $this->hasOne('App\Category');
    }
}
