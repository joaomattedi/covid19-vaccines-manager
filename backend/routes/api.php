<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\VaccineController;
use Illuminate\Support\Facades\Route;

// EmployeeController
Route::apiResource('employees', EmployeeController::class);
Route::post('employees/generate', [EmployeeController::class, 'generateEmployees']);

// VaccineController
Route::apiResource('vaccines', VaccineController::class);
Route::post('vaccines/generate', [VaccineController::class, 'generateVaccines']);
