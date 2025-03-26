<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Fractal\Fractal;

class UserController extends Controller
{
    /**
     * @return Fractal
     */
    public function user(Request $request)
    {
        return $request->user();
    }
}
