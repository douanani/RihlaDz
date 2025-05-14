<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Tour;
use App\Models\Booking;

class AgencyController extends Controller
{
    // ✅ عرض بروفايل الوكالة
    public function profile()
    {
        $agency = Auth::user();
        return response()->json($agency);
    }

    // ✅ تحديث معلومات الوكالة
    public function updateProfile(Request $request)
    {
        $agency = Auth::user();

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $agency->id,
            'phone' => 'sometimes|string|max:20',
            'description' => 'nullable|string',
        ]);

        $agency->update($request->all());

        return response()->json(['message' => 'Profile updated', 'agency' => $agency]);
    }

    // ✅ عرض كل الرحلات الخاصة بالوكالة
    public function myTours()
    {
        $tours = Tour::where('agency_id', Auth::id())->latest()->get();
        return response()->json($tours);
    }

    // ✅ عرض الحجوزات الخاصة بجولة معيّنة (خاصة بالوكالة)
    public function bookingsForMyTour($tourId)
    {
        $tour = Tour::where('id', $tourId)->where('agency_id', Auth::id())->firstOrFail();

        $bookings = Booking::where('tour_id', $tour->id)->with('user')->latest()->get();

        return response()->json($bookings);
    }
    // ✅ حذف حساب الوكالة وكل الرحلات المرتبطة به
    public function deleteAccount()
    {
    $agency = Auth::user();

    // نحذف جميع الرحلات الخاصة بالوكالة
    $agency->tours()->delete();

    // نقدر نزيد هنا نحذف الصور من السيرفر لو كنت تخزنهم

    // نحذف الحساب نفسه
    $agency->delete();

    return response()->json(['message' => 'Agency account and all related tours deleted successfully']);
    }

    public function confirmBooking($bookingId)
{
    // 🔐 نتأكد أن الحجز تابع لجولة تابعة للوكالة المسجلة
    $booking = Booking::where('id', $bookingId)
        ->whereHas('tour', function ($query) {
            $query->where('agency_id', Auth::id());
        })->firstOrFail();

    // ✅ نأكد الحجز
    $booking->is_confirmed = true;
    $booking->save();

    // 📢 نرسل إشعار للمستخدم
    $user = $booking->user;
    $user->notify(new \App\Notifications\BookingConfirmed($booking));

    return response()->json(['message' => 'Booking confirmed!']);
}


}
