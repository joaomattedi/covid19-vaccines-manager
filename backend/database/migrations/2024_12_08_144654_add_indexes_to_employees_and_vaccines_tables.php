<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->index('full_name');
        });

        Schema::table('vaccines', function (Blueprint $table) {
            $table->index('name');
            $table->index('batch');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropIndex(['full_name']);
        });

        Schema::table('vaccines', function (Blueprint $table) {
            $table->dropIndex(['name']);
            $table->dropIndex(['batch']);
        });
    }
};
