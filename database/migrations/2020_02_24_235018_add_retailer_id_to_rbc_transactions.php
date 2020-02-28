<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRetailerIdToRbcTransactions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('rbc_transaction', function (Blueprint $table) {
            $table->unsignedSmallInteger('retailer_id')->nullable();
            $table->string('usd')->nullable()->change();
            $table->string('description_2')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('rbc_transaction', function (Blueprint $table) {
            $table->dropColumn('retailer_id');
            $table->string('usd')->nullable(false)->change();
            $table->string('description_2')->nullable(false)->change();
        });
    }
}
