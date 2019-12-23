<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RetailerCategories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('retailer_categories', function (Blueprint $table) {
            $table->smallInteger('retailer_id');
            $table->smallInteger('category_id');

            $table->index("retailer_id");
            $table->index("category_id");
            $table->index(["retailer_id", "category_id"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop("retailer_categories");
    }
}
