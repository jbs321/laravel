<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class Category extends Model
{
    public $timestamps = false;

    protected $table = 'categories';

    protected $fillable = [
        'name'
    ];

    public function getIdAttribute($value)
    {
        return Crypt::encryptString($value);
    }

    public function setIdAttribute($value)
    {
        return Crypt::decryptString($value);
    }
}
