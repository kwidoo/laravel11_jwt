<?php

use App\Http\Controllers\FrontendController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Support\Facades\Route;

Route::group(
    ['domain' => 'localhost'],
    function () {
        Route::post('login', [LoginController::class, 'login']);
    }
);

Route::group(
    ['middleware' => Authenticate::class, 'domain' => 'localhost'],
    function () {
        Route::get('/user', [UserController::class, 'user']);
        Route::post('logout', [LoginController::class, 'logout']);
    }
);
