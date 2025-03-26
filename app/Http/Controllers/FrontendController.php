<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class FrontendController extends Controller
{
    /**
     * @return Application|Factory|View
     */
    public function home(Request $request)
    {
        dd($request->user(), Auth::user());
        abort_if(!$request->user() || !$request->user()->is_super_user, 403);
    }
}
