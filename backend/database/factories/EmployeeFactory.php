<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Employee;
use App\Models\Vaccine;
use Faker\Generator as Faker;

class EmployeeFactory extends Factory
{
    protected $model = Employee::class;

    public function definition()
    {
        return [
            'cpf' => $this->faker->unique()->numerify('###########'),
            'full_name' => $this->faker->name,
            'birth_date' => $this->faker->date('Y-m-d', '-18 years'),
            'date_first_dose' => $this->faker->dateTimeBetween('-1 year', 'now')->format('Y-m-d'),
            'date_second_dose' => $this->faker->dateTimeBetween('-1 year', 'now')->format('Y-m-d'),
            'date_third_dose' => $this->faker->dateTimeBetween('-1 year', 'now')->format('Y-m-d'),
            'vaccine_id' => Vaccine::factory(),
            'comorbidity_carrier' => $this->faker->boolean(50),
        ];
    }
}
