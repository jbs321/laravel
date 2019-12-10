<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLoggingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string("name");

            $table->index('name');
        });

        Schema::create('logs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string("description");
            $table->string("retailer");
            $table->smallInteger('category_id');
            $table->integer('user_id');
            $table->decimal("amount",8, 2);
            $table->date("datetime");
            $table->timestamps();

            $table->index('description');
            $table->index('retailer');
            $table->index('category_id');
            $table->index('datetime');
            $table->index(['description', 'retailer', 'category_id', 'datetime']);

            $table->foreign('category_id')->references('id')->on('categories');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('logs');
        Schema::dropIfExists('categories');
    }
}
