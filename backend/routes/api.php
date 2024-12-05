<?php

use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return response('welcome');
// });

Route::apiResource('employees', EmployeeController::class);