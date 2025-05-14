<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Payment;
use App\Models\Booking;

class PaymentController extends Controller
{
    // ✅ عرض كل عمليات الدفع (Admin فقط)
    public function index()
    {
        return Payment::with('booking.tour')->latest()->get();
    }

    // ✅ عرض دفعات المستخدم الحالي (سائح فقط)
    public function myPayments()
    {
        $tourist = Auth::user()->tourist;

        if (!$tourist) {
            return response()->json(['message' => 'Only tourists can view their payments'], 403);
        }

        $payments = Payment::whereHas('booking', function ($query) use ($tourist) {
            $query->where('tourist_id', $tourist->id);
        })->with('booking.tour')->latest()->get();

        return response()->json($payments);
    }

    // ✅ إنشاء دفعة لحجز معيّن
    public function store(Request $request)
    {
        $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string',
        ]);

        $booking = Booking::with('tourist')->findOrFail($request->booking_id);

        // فقط السائح صاحب الحجز يقدر يدفع
        if (Auth::user()->tourist?->id !== $booking->tourist_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $payment = Payment::create([
            'booking_id' => $request->booking_id,
            'amount' => $request->amount,
            'payment_method' => $request->payment_method,
            'paid_at' => now(),
        ]);

        return response()->json(['message' => 'Payment recorded', 'payment' => $payment], 201);
    }

    // ✅ عرض تفاصيل دفع معين
    public function show($id)
    {
        $payment = Payment::with('booking.tourist.user')->findOrFail($id);
        return response()->json($payment);
    }
}
