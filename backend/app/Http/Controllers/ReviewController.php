<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Review;


class ReviewController extends Controller
{
    public function index()
    {
        return Review::with(['tour', 'tourist'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tour_id' => 'required|exists:tours,id',
            'tourist_id' => 'required|exists:tourists,id',
            'rating' => 'required|numeric|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        return Review::create($validated);
    }

    public function show($id)
    {
        return Review::with(['tour', 'tourist'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);
        $review->update($request->all());

        return $review;
    }

    public function destroy($id)
    {
        Review::destroy($id);
        return response()->json(['message' => 'Review deleted']);
    }
}
