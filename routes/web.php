<?php

use App\Http\Controllers\FrontendController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

$common = function () {
    Route::get('{path}', function () {
        return view('index');
    })->where('path', '(.*)');

    Route::get('login', [LoginController::class, 'login'])->name('login');
};

Route::get('customer', [FrontendController::class, 'home']);
Route::group(['domain' => 'localhost'], $common);
