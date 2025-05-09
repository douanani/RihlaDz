<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function show()
    {
        return Auth::user()->profile;
    }

    public function update(Request $request)
    {
        $profile = Auth::user()->profile;
        $profile = Auth::user()->profile;

        $profile->update($request->all());

        return response()->json(['message' => 'Profile updated', 'profile' => $profile]);
    }
}

