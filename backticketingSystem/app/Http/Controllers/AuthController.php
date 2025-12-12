<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller;
use App\Models\User;              // Import User model
use Illuminate\Http\Request;         // Handles incoming requests
use Illuminate\Support\Facades\Hash; // For password hashing
use Illuminate\Support\Str;          // For token generation

class AuthController extends Controller
{ 
    public function index(Request $request) {
        $user = User::where('api_token', $request->bearerToken())->first();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return response()->json(User::all());
    }


    public function register (Request $request){    

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
            'users' => $user
        ], 201);
    }


   public function login(Request $request) {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->input('email'))->first();

        if ($user && Hash::check($request->input('password'), $user->password)) {

            // Generate random token
            $token = Str::random(60);
            $user->api_token = $token;
            $user->save();

            // sends json back with the user and token
            return response()->json([
                'message' => 'login successful',
                'user' => $user,
                'token' => $token
            ], 200);
            }

            return response()->json([
                'message' => 'invalid credentials'
            ], 401);
}


    public function logout(Request $request) {
        $user = User::where('api_token', $request->bearerToken())->first();
        if ($user) {
            $user->api_token = null;
            $user->save();
        }
        return response()->json(['message' => 'Logged out successfully']);
}



}


