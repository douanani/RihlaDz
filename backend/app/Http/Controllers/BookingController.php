<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Notifications\BookingConfirmed;

class BookingController extends Controller
{
    // ✅ عرض كل الحجوزات (Admin فقط أو في حالة الحاجة لعرض عام)
    public function index()
    {
        return Booking::with(['tour', 'tourist', 'tour.agency'])->get();
    }

    // ✅ حجز جديد من طرف سائح
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tour_id' => 'required|exists:tours,id',
            'booking_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // نجيب الـ tourist المرتبط بالمستخدم الحالي
        $tourist = Auth::user()->tourist;

        if (!$tourist) {
            return response()->json(['message' => 'Only tourists can make bookings'], 403);
        }

        $booking = Booking::create([
            'tourist_id' => $tourist->id,
            'tour_id' => $request->tour_id,
            'booking_date' => $request->booking_date,
            'status' => 'pending', // default
        ]);

        return response()->json(['message' => 'Booking created', 'booking' => $booking], 201);
    }

    // ✅ عرض حجز معيّن
    public function show($id)
    {
        $booking = Booking::with(['tour', 'payment', 'tourist.user'])->findOrFail($id);
        return response()->json($booking);
    }

    // ✅ تحديث حالة الحجز (من طرف الوكالة أو الادمين)
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $booking = Booking::with('tour', 'tourist.user')->findOrFail($id);

        // تحقق من أن المستخدم الحالي هو صاحب الوكالة المالكة للجولة
        if (Auth::user()->agency && $booking->tour->agency_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $booking->status = $request->status;
        $booking->save();

        // ⏩ إذا الحالة صارت "confirmed" نرسل إشعار للمستخدم
        if ($booking->status === 'confirmed') {
            $booking->tourist->user->notify(new BookingConfirmed($booking));
        }

        return response()->json(['message' => 'Booking status updated', 'booking' => $booking]);
    }

    // ✅ حذف حجز (من طرف السائح أو الادمين فقط)
    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);

        // تأكد أن المستخدم هو صاحب الحجز أو Admin
        if (Auth::user()->tourist && $booking->tourist->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $booking->delete();
        return response()->json(['message' => 'Booking cancelled']);
    }

    // ✅ عرض حجوزات المستخدم الحالي (سائح فقط)
    public function myBookings()
    {
        $tourist = Auth::user()->tourist;

        if (!$tourist) {
            return response()->json(['message' => 'Only tourists have bookings'], 403);
        }

        $bookings = Booking::where('tourist_id', $tourist->id)->with(['tour'])->latest()->get();

        return response()->json($bookings);
    }
}
