<?php

namespace Database\Factories;

use App\Models\Vaccine;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vaccine>
 */
class VaccineFactory extends Factory
{
    protected $model = Vaccine::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'batch' => $this->faker->numberBetween(1000000, 9999999),
            'expiration_date' => $this->faker->dateTimeBetween('+1 year', '+5 years')->format('Y-m-d'),
        ];
    }
}
