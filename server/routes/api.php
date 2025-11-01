<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\OrderController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware(['auth:api'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me'] ?? fn() => Auth::user());
});

Route::apiResource('posts', PostController::class);

Route::get('/customers', [CustomersController::class, 'index']);
Route::post('/customers', [CustomersController::class, 'store']);
Route::get('/customers/{id}', [CustomersController::class, 'show']);
Route::delete('/customers/{id}', [CustomersController::class, 'destroy']);

Route::get('/orders', [OrderController::class, 'index']);

Route::post('/orders', [OrderController::class, 'store']);

Route::delete('/orders/{id}', [OrderController::class, 'destroy']);