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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('cpf')->unique();
            $table->string('full_name');
            $table->date('birth_date');
            $table->date('date_first_dose')->nullable();
            $table->date('date_second_dose')->nullable();
            $table->date('date_third_dose')->nullable();
            $table->foreignId('vaccine_id')->nullable()->constrained('vaccines')->onDelete('restrict');
            $table->boolean('comorbidity_carrier')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
