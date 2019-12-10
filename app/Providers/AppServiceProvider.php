<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Collection::macro('extract2dColumn', function ($key) {
            $reduced = [];
            foreach ($this->items as $item) {
                if(!isset($reduced[$item[$key]])) {
                    $reduced[$item[$key]] = [];
                }

                $reduced[$item[$key]][] = $item;
            }

            return $reduced;
        });
    }
}
