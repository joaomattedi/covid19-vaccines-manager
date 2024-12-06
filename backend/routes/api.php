<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\VaccineController;
use Illuminate\Support\Facades\Route;

Route::apiResource('employees', EmployeeController::class);
Route::apiResource('vaccines', VaccineController::class);