<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();

Route::middleware(['auth'])->group(function () {
    //API - ROUTES TEMPORARY
    Route::post('/logs/annual-summary', 'LogController@showDashboard');

    Route::middleware([
        \App\Http\Middleware\FilesToArrays::class,
        \App\Http\Middleware\PrepareRBCStatement::class,
    ])->post('/import', 'ImportController@import');

    Route::get('/api/category', 'CategoryController@index');
    Route::post('/api/category', 'CategoryController@create');
    Route::put('/api/category/{category}', 'CategoryController@update');
    Route::post('/api/category/delete/{category}', 'CategoryController@delete');

    Route::get('/api/retailer', 'RetailerController@index');
    Route::post('/api/retailer', 'RetailerController@create');
    Route::put('/api/retailer/{retailer}', 'RetailerController@update');
    Route::post('/api/retailer/delete/{retailer}', 'RetailerController@delete');

    Route::get('/api/transaction', 'RBCTransactionController@index');
    Route::post('/api/transaction/{transaction}', 'RBCTransactionController@update');
    Route::put('/api/transaction', 'RBCTransactionController@update');
    Route::post('/api/transaction/overview/{year}', 'LogController@showOverview');

    //Navigate to react router
    Route::get('/{any}', function () {
        return view('home');
    })->where('any', '.*');
});

