<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class TouristController extends Controller
{
    // ✅ نتحقق من الدور قبل كل عملية
    private function ensureTourist($user)
    {
        if ($user->role !== 'tourist') {
            abort(403, 'Access denied. Only tourists allowed.');
        }
    }

    // عرض الملف الشخصي للسائح
    public function show()
    {
        $user = Auth::user();
        $this->ensureTourist($user);

        return $user;
    }

    // تعديل معلومات السائح
    public function update(Request $request)
    {
        $user = Auth::user();
        $this->ensureTourist($user);

        $validated = $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
        ]);

        $user->update($validated);

        return response()->json(['message' => 'Tourist profile updated successfully.']);
    }

    // حذف الحساب مع تحقق من كلمة السر (Soft Delete)
    public function deleteAccount(Request $request)
    {
        $user = Auth::user();
        $this->ensureTourist($user);

        $request->validate([
            'password' => 'required|string',
        ]);

        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Incorrect password.'], 403);
        }

        $user->delete(); // soft delete

        return response()->json(['message' => 'Account deleted successfully.']);
    }

    // عرض الحجوزات المرتبطة بالسائح
    public function bookings()
    {
        $user = Auth::user();
        $this->ensureTourist($user);

        return $user->bookings()->with('tour.agency')->get();
    }
    
}
