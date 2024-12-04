<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response('welcome');
});

Route::get('/teste', function () {
    return response('teste');
});