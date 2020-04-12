<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeTransactionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function change()
    {
        Schema::table('rbc_transaction', function (Blueprint $table) {
            $table->string('account_type')->nullable()->change();
            $table->string('account_number')->nullable()->change();
            $table->string('cheque_number')->nullable()->change();
            $table->string('description_2')->nullable()->change();
        });
    }
}
