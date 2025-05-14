<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Agency;
use App\Models\Tour;
use Illuminate\Support\Facades\Notification;
use App\Notifications\AgencyApproved;

class AdminController extends Controller
{
    // ✅ عرض جميع المستخدمين مع علاقاتهم (للإدارة)
    public function index()
    {
        $users = User::with(['profile', 'tourist', 'agency'])->get();
        return response()->json($users);
    }

    // ✅ عرض مستخدم معيّن
    public function show($id)
    {
        $user = User::with(['profile', 'tourist', 'agency'])->findOrFail($id);
        return response()->json($user);
    }

    // ✅ حذف مستخدم معيّن
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

    // ✅ عرض الوكالات قيد الانتظار
    public function pendingAgencies()
    {
        $agencies = Agency::where('status', 'pending')->with('user')->get();
        return response()->json($agencies);
    }

    // ✅ قبول وكالة
    public function approveAgency($id)
    {
        $agency = Agency::with('user')->findOrFail($id);
        $agency->status = 'approved';
        $agency->save();

        // ⏩ إرسال إشعار للوكالة
        Notification::send($agency->user, new AgencyApproved($agency));

        return response()->json([
            'message' => 'Agency approved successfully',
            'agency' => $agency
        ]);
    }

    // ✅ إحصائيات لوحة تحكم المشرف
    public function stats()
    {
        return response()->json([
            'total_users' => User::count(),
            'total_agencies' => Agency::count(),
            'pending_agencies' => Agency::where('status', 'pending')->count(),
            'total_tours' => Tour::count(),
        ]);
    }
// ✅ عرض البروفايل الشخصي للمشرف الحالي
    public function profile()
    {
        $admin = Auth::user(); // نفترض أن admin مسجّل الدخول

        if (!$admin) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return response()->json($admin->load('profile'));
    }

    // ✅ تعديل بيانات البروفايل
    public function updateProfile(Request $request)
    {
        $admin = Auth::user();

        if (!$admin) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // نعدلو فقط البيانات المسموح بيها (مثلاً الاسم، البريد، وغيره حسب المشروع)
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $admin->id,
            'password' => 'sometimes|string|min:6|confirmed',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        }

        $admin->update($validated);

        return response()->json(['message' => 'Profile updated successfully', 'admin' => $admin]);
    }
}
