<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TouristController;
use App\Http\Controllers\AgencyController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\AdminController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('profiles', ProfileController::class)->names([
        'index'   => 'profiles.index',
        'store'   => 'profiles.store',
        'show'    => 'profiles.show',
        'update'  => 'profiles.update',
        'destroy' => 'profiles.destroy',
    ]);
    Route::apiResource('tourists', TouristController::class)->names([
        'index'   => 'tourists.index',
        'store'   => 'tourists.store',
        'show'    => 'tourists.show',
        'update'  => 'tourists.update',
        'destroy' => 'tourists.destroy',
    ]);
    Route::apiResource('agencies', AgencyController::class)->names([
        'index'   => 'agencies.index',
        'store'   => 'agencies.store',
        'show'    => 'agencies.show',
        'update'  => 'agencies.update',
        'destroy' => 'agencies.destroy',
    ]);
    Route::apiResource('tours', TourController::class)->names([
        'index'   => 'tours.index',
        'store'   => 'tours.store',
        'show'    => 'tours.show',
        'update'  => 'tours.update',
        'destroy' => 'tours.destroy',
    ]);
    Route::apiResource('bookings', BookingController::class)->names([
        'index'   => 'bookings.index',
        'store'   => 'bookings.store',
        'show'    => 'bookings.show',
        'update'  => 'bookings.update',
        'destroy' => 'bookings.destroy',
    ]);
    Route::apiResource('payments', PaymentController::class)->names([
        'index'   => 'payments.index',
        'store'   => 'payments.store',
        'show'    => 'payments.show',
        'update'  => 'payments.update',
        'destroy' => 'payments.destroy',
    ]);
    Route::apiResource('reviews', ReviewController::class)->names([
        'index'   => 'reviews.index',
        'store'   => 'reviews.store',
        'show'    => 'reviews.show',
        'update'  => 'reviews.update',
        'destroy' => 'reviews.destroy',
    ]);

    Route::prefix('admin')->middleware('is_admin')->as('admin')->controller(AdminController::class)->group(function () {
        Route::get('/', 'index');
        Route::get('/{id}', 'show');
        Route::delete('/{id}', 'destroy');
        Route::get('/pending-agencies', 'pendingAgencies');
        Route::post('/approve-agency/{id}', 'approveAgency');
        Route::get('/stats', 'stats');
    });

});
//accessible without login for guests
Route::get('/tours', [TourController::class, 'index']);
Route::get('/tours/{id}', [TourController::class, 'show']);
