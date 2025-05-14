<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Review;
use App\Models\Tour;

class ReviewController extends Controller
{
    // ✅ عرض جميع التقييمات (Admin أو Agency)
    public function index()
    {
        return Review::with(['tour', 'user'])->latest()->get();
    }

    // ✅ عرض تقييمات المستخدم الحالي (سائح)
    public function myReviews()
    {
        $reviews = Review::where('user_id', Auth::id())->with('tour')->latest()->get();
        return response()->json($reviews);
    }

    // ✅ إنشاء تقييم
    public function store(Request $request)
    {
        $request->validate([
            'tour_id' => 'required|exists:tours,id',
            'rating' => 'required|numeric|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $user = Auth::user();

        // تأكد أن المستخدم راهو Tourist
        if (!$user->tourist) {
            return response()->json(['message' => 'Only tourists can leave reviews'], 403);
        }

        // تحقق إذا كتب تقييم مسبق لنفس الجولة
        $alreadyReviewed = Review::where('user_id', $user->id)
            ->where('tour_id', $request->tour_id)
            ->exists();

        if ($alreadyReviewed) {
            return response()->json(['message' => 'You have already reviewed this tour'], 409);
        }

        $review = Review::create([
            'tour_id' => $request->tour_id,
            'user_id' => $user->id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json(['message' => 'Review submitted', 'review' => $review], 201);
    }

    // ✅ عرض تقييم معيّن
    public function show($id)
    {
        $review = Review::with(['tour', 'user'])->findOrFail($id);
        return response()->json($review);
    }

    // ✅ تعديل تقييم (المستخدم فقط)
    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);

        if ($review->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'rating' => 'sometimes|numeric|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $review->update($request->only('rating', 'comment'));

        return response()->json(['message' => 'Review updated', 'review' => $review]);
    }

    // ✅ حذف تقييم (المستخدم فقط)
    public function destroy($id)
    {
        $review = Review::findOrFail($id);

        if ($review->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $review->delete();
        return response()->json(['message' => 'Review deleted']);
    }
}
