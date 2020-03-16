<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Retailer extends Model
{
    const FIELD__NAME = "name";
    protected $table = 'retailers';

    protected $fillable = [
        self::FIELD__NAME,
    ];

    public function transactions(): HasMany
    {
        return $this->hasMany(RbcTransaction::class);
    }

    public function categories()
    {
        return $this->hasManyThrough(Category::class, RetailerCategories::class, 'retailer_id', 'id', 'id', 'category_id');
    }
}
