<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RetailerCategories extends Model
{
    protected $table = 'retailer_categories';
    protected $fillable = [
        'category_id',
        'retailer_id',
    ];
}
