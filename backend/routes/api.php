<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
// AUTH
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\NotificationController;

// ADMIN
use App\Http\Controllers\AdminController;

// AGENCY
use App\Http\Controllers\AgencyController;
use App\Http\Controllers\TourController;

// TOURIST
use App\Http\Controllers\TouristController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReviewController;

use App\Http\Controllers\CategoryController;


// ✅ AUTH ROUTES
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('guest')->group(function () {
    Route::post('/register', [RegisteredUserController::class, 'store']);
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
    Route::post('/reset-password', [NewPasswordController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
    Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store']);
    Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)->middleware(['signed', 'throttle:6,1']);
});

// ✅ ADMIN ROUTES
Route::middleware(['auth', 'isAdmin'])->prefix('admin')->group(function () {
    Route::get('/users', [AdminController::class, 'index']);
    Route::get('/users/{id}', [AdminController::class, 'show']);
    Route::delete('/users/{id}', [AdminController::class, 'destroy']);

    Route::get('/agencies/pending', [AdminController::class, 'pendingAgencies']);
    Route::post('/agencies/approve/{id}', [AdminController::class, 'approveAgency']);

    Route::get('/stats', [AdminController::class, 'stats']);
    Route::get('/profile', [AdminController::class, 'profile']);
    Route::put('/profile', [AdminController::class, 'updateProfile']);
});

// ✅ AGENCY ROUTES
Route::middleware(['auth', 'isAgency'])->prefix('agency')->group(function () {
    Route::get('/profile', [AgencyController::class, 'profile']);
    Route::put('/profile', [AgencyController::class, 'updateProfile']);

    Route::get('/tours', [TourController::class, 'index']);
    Route::post('/tours', [TourController::class, 'store']);
    Route::get('/tours/{id}', [TourController::class, 'show']);
    Route::put('/tours/{id}', [TourController::class, 'update']);
    Route::delete('/tours/{id}', [TourController::class, 'destroy']);

    Route::get('/bookings', [AgencyController::class, 'bookings']);
    Route::post('/bookings/{id}/confirm', [AgencyController::class, 'confirmBooking']);
});

// ✅ TOURIST ROUTES
Route::middleware(['auth', 'isTourist'])->prefix('tourist')->group(function () {
    Route::get('/profile', [TouristController::class, 'profile']);
    Route::put('/profile', [TouristController::class, 'updateProfile']);
    
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);

    Route::post('/payments', [PaymentController::class, 'store']);

    Route::get('/reviews', [ReviewController::class, 'index']);
    Route::post('/reviews', [ReviewController::class, 'store']);
    Route::put('/reviews/{id}', [ReviewController::class, 'update']);
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);
});

// ✅ NOTIFICATIONS ROUTES
Route::middleware(['auth'])->prefix('notifications')->group(function () {
    Route::get('/', [NotificationController::class, 'index']);
    Route::get('/unread', [NotificationController::class, 'unread']);
    Route::post('/mark-as-read/{id}', [NotificationController::class, 'markAsRead']);
    Route::post('/mark-all-as-read', [NotificationController::class, 'markAllAsRead']);
    Route::delete('/{id}', [NotificationController::class, 'destroy']);
    Route::delete('/', [NotificationController::class, 'clear']);
});

// ✅ PUBLIC ROUTES FOR GUESTS TO BROWSE TOURS
Route::get('/tours', [TourController::class, 'index']);
Route::get('/tours/{id}', [TourController::class, 'show']);
Route::get('/tours/category/{categoryId}', [TourController::class, 'showByCategory']);


// ✅ CATEGORY ROUTES
Route::get('/categories', [CategoryController::class, 'index']); // 👈 مفتوحة للجميع

Route::middleware(['auth', 'isAdmin'])->prefix('admin/categories')->group(function () {
    Route::get('/{id}', [CategoryController::class, 'show']);
    Route::post('/', [CategoryController::class, 'store']);
    Route::put('/{id}', [CategoryController::class, 'update']);
    Route::delete('/{id}', [CategoryController::class, 'destroy']);
});

