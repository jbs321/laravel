<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $table = 'logs';

    protected $fillable = [
        'description',
        'category_id',
        'amount',
        'retailer',
        'datetime',
    ];

    public function category()
    {
        return $this->hasOne('App\Category');
    }
}
