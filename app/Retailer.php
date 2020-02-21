<?php

namespace App;

use App\Traits\IdEncrypterTrait;
use Illuminate\Database\Eloquent\Model;

class Retailer extends Model
{
    use IdEncrypterTrait;

    const FIELD__NAME = "name";
    protected $table = 'retailers';

    protected $fillable = [
        self::FIELD__NAME,
    ];
}
