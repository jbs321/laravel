<?php

namespace App\Traits;

use Illuminate\Support\Facades\Crypt;

trait IdEncrypterTrait
{
    public function getIdAttribute($value)
    {
        return Crypt::encryptString($value);
    }
}
