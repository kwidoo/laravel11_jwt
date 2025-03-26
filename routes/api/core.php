<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\RedirectIfAuthenticated;
use Illuminate\Auth\Middleware\Authenticate;

$auth = function () {
    Route::post('logout', [LoginController::class, 'logout']);
    Route::get('/user', [UserController::class, 'user']);
};

$login = function () {
    Route::post('login', [LoginController::class, 'login']);
};

Route::group(['domain' => 'localhost', 'middleware' => Authenticate::class], $auth);
Route::group(['domain' => 'localhost', 'middleware' => RedirectIfAuthenticated::class], $login);
