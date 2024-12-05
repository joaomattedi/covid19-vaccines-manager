<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaccine extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'batch',
        'expiration_date',
    ];

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }
}
