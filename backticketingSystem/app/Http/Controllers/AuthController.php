<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller;
use App\Models\User;              // Import User model
use Illuminate\Http\Request;         // Handles incoming requests
use Illuminate\Support\Facades\Hash; // For password hashing
use Illuminate\Support\Str;          // For token generation

class AuthController extends Controller
{ 
    public function register (Request $request){
        
    //this will validate datass
        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);

    //returns JSON response
    return response()->json([
        'message'=> 'user register successfully',
        'user' => '$user'
    ], 201);
}

    public function login (Request $request){
        $this->validate ($request, [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->input('email'))->first();


        if ($user && Hash::check($request->input('password'), $user->password)) {
            return response()->json(['message' => 'Login successful', 'user' => $user]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }


    }
