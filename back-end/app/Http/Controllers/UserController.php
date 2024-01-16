<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validateData = $request->validate([
            "name" => "required|string|max:255",
            "email" => "required|string|unique:users,email|max:255",
            "password" => "required|string|min:8|confirmed"
        ]);

        $user = User::create([
            "name" => $validateData["name"],
            "email" => $validateData["email"],
            "password" => Hash::make($validateData["password"]),
        ]);

        return response()->json([
            "message" => "User has been created",
            "data" => $user,
        ]);
    }


    public function login(Request $request)
    {
        $validateData = $request->validate([
            "email" => "required|string",
            "password" => "required|string"
        ]);

        if (!Auth::attempt($request->only(['email', 'password']))) {
            return response()->json([
                'message' => "Email and Password doesn't match"
            ], 401);
        }

        $user = User::where('email', $validateData["email"])->first();
        $token = $user->createToken('kanban_token')->plainTextToken;

        return response()->json([
            'message' => "User logged in successfully",
            // 'token' => $token,
            'user' => $user,
        ])->withCookie(cookie('access_token', $token, 60));
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();

        return response()->json([
            'message' => "User has been logged out"
        ])->withCookie(cookie('access_token', null, -1));
    }
}
