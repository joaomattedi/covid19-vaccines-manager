<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'cpf',
        'full_name',
        'birth_date',
        'date_first_dose',
        'date_second_dose',
        'date_third_dose',
        'vaccine_id',
        'comorbidity_carrier',
    ];

    public function vaccine()
    {
        return $this->belongsTo(Vaccine::class);
    }
}
