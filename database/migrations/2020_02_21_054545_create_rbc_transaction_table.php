<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRbcTransactionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rbc_transaction', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('account_type');
            $table->string('account_number');
            $table->date('transaction_date');
            $table->string('cheque_number');
            $table->string('description_1');
            $table->string('description_2');
            $table->string('cad');
            $table->string('usd');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rbc_transaction');
    }
}
