<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\ForceJsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Auth route
Route::prefix('/auth')->group(function () {
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('auth/logout', [UserController::class, 'logout']);
    Route::get('/', [TaskController::class, 'index']);
    Route::get('/:id', [TaskController::class, 'show']);
    Route::post('/create', [TaskController::class, 'create']);
});
