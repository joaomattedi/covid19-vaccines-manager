<?php

namespace Database\Seeders;

use App\Models\Vaccine;
use Illuminate\Database\Seeder;

class VaccineSeeder extends Seeder
{
    public function run()
    {
        Vaccine::factory(10)->create();
    }
}
