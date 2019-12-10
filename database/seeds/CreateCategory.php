<?php

use Illuminate\Database\Seeder;

class CreateCategory extends Seeder
{
    const DEFAULT_CATEGORYS = [
        'bank',
        'clothes',
        'coffee',
        'contractor work',
        'eating out',
        'entertainment and leisure',
        'general',
        'groceries',
        'health',
        'online services',
        'online shopping',
        'rent',
        'salary',
        'savings',
        'school',
        'tax',
        'transport & fuel & insurance',
        'unknown',
        'utilities',
    ];


    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (self::DEFAULT_CATEGORYS as $category) {
            $catModel = new \App\Category;
            $catModel->name = $category;
            $catModel->save();
        }
    }
}
