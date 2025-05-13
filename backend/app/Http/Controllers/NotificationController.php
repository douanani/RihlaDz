<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    // ✅ جلب جميع الإشعارات للمستخدم الحالي
    public function index()
    {
        $user = Auth::user();
        return response()->json($user->notifications);
    }

    // ✅ جلب الإشعارات غير المقروءة فقط
    public function unread()
    {
        $user = Auth::user();
        return response()->json($user->unreadNotifications);
    }

    // ✅ تعليم إشعار كمقروء
    public function markAsRead($id)
    {
        $notification = Auth::user()->notifications()->find($id);
        
        if (!$notification) {
            return response()->json(['message' => 'Notification not found'], 404);
        }

        $notification->markAsRead();
        return response()->json(['message' => 'Notification marked as read']);
    }

    // ✅ تعليم جميع الإشعارات كمقروءة
    public function markAllAsRead()
    {
        Auth::user()->unreadNotifications->markAsRead();
        return response()->json(['message' => 'All notifications marked as read']);
    }

    // ✅ حذف إشعار معين
    public function destroy($id)
    {
        $notification = Auth::user()->notifications()->find($id);

        if (!$notification) {
            return response()->json(['message' => 'Notification not found'], 404);
        }

        $notification->delete();
        return response()->json(['message' => 'Notification deleted']);
    }

    // ✅ حذف كل الإشعارات
    public function clear()
    {
        Auth::user()->notifications()->delete();
        return response()->json(['message' => 'All notifications deleted']);
    }
}
