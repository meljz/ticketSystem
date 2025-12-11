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
        'users' => $user
    ], 201);
    }

    public function login(Request $request){
        //validate natin
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        //query sa db ng email
        $user = User::where('email', $request->input('email'))->first();

        //checking if true then fire
        if ($user && Hash::check($request->input('password'), $user->password)){

             // lumen dont support session based, only tokens
            $request->session()->put('user_id', $user->id);

            return response()->json([
                'message' => 'login successful',
                'user' => $user,
                'token' => session()->getId() // session ID
            ], 200);
        }
        return response()->json([
            'messaage' => 'invalid credentials'
        ], 401);   
     }  

    public function logout(Request $request) {
        $request->session()->invalidate();
        return response()->json(['message' => 'Logged out']);
}

}
