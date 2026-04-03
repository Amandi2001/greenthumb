<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;

Route::apiResource('products', ProductController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');




Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::post('/orders', [OrderController::class, 'store']);



// Public Routes (ඕනෑම කෙනෙකුට පේන දේවල්)
Route::get('/products', [ProductController::class, 'index']);

// Protected Routes (Login වූ Admin ට පමණක්)
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/products', [ProductController::class, 'store']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    
    // ලැබුණු ඇණවුම් බැලීමට (Orders)
    Route::get('/orders', [OrderController::class, 'index']); 
    
    
    
});

Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);