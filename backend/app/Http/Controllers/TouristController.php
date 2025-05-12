<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Tourist;


class TouristController extends Controller
{
    public function index()
    {
        return Tourist::with('user')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'bio' => 'nullable|string',
        ]);

        return Tourist::create($validated);
    }

    public function show($id)
    {
        return Tourist::with(['bookings', 'reviews'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $tourist = Tourist::findOrFail($id);
        $tourist->update($request->all());

        return $tourist;
    }

    public function destroy($id)
    {
        Tourist::destroy($id);
        return response()->json(['message' => 'Tourist profile deleted']);
    }

    public function myBookings($id)
    {
        $tourist = Tourist::with('bookings.tour')->findOrFail($id);
        return $tourist->bookings;
    }

    public function myReviews($id)
    {
        $tourist = Tourist::with('reviews.tour')->findOrFail($id);
        return $tourist->reviews;
    }
}

