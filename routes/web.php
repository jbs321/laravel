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
    Route::middleware(\App\Http\Middleware\FilesToArrays::class)->post('/import', 'ImportController@import');


    Route::get('/api/category', 'CategoryController@index');
    Route::post('/api/category', 'CategoryController@create');
    Route::post('/api/category/delete/{Category}', '
    @delete');

    //Navigate to react router
    Route::get( '/{any}', function () {
        return view('home');
    })->where('any', '.*');
});


