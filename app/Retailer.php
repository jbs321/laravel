<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Retailer extends Model
{
    const FIELD__NAME = "name";
    protected $table = 'retailers';

    protected $fillable = [
        self::FIELD__NAME,
    ];
}
