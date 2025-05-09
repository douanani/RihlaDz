<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{
    public function index()
    {
        return Booking::with(['tour', 'tourist'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tourist_id' => 'required|exists:tourists,id',
            'tour_id' => 'required|exists:tours,id',
            'booking_date' => 'required|date',
        ]);

        return Booking::create($validated);
    }

    public function show($id)
    {
        return Booking::with(['tour', 'payment'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);
        $booking->update($request->all());
        return $booking;
    }

    public function destroy($id)
    {
        Booking::destroy($id);
        return response()->json(['message' => 'Booking cancelled']);
    }
}

