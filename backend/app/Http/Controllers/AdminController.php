<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Agency;
use App\Models\Tour;


class AdminController extends Controller
{
    // View all users
    public function index()
    {
        return User::with(['profile', 'tourist', 'agency'])->get();
    }

    // Show a specific user
    public function show($id)
    {
        return User::with(['profile', 'tourist', 'agency'])->findOrFail($id);
    }

    // Delete a user
    public function destroy($id)
    {
        User::destroy($id);
        return response()->json(['message' => 'User deleted']);
    }

    // List all pending agencies
    public function pendingAgencies()
    {
        return Agency::where('status', 'pending')->get();
    }

    // Approve an agency
    public function approveAgency($id)
    {
        $agency = Agency::findOrFail($id);
        $agency->status = 'approved';
        $agency->save();

        return response()->json(['message' => 'Agency approved', 'agency' => $agency]);
    }

    // Admin dashboard statistics
    public function stats()
    {
        return response()->json([
            'total_users' => User::count(),
            'total_agencies' => Agency::count(),
            'pending_agencies' => Agency::where('status', 'pending')->count(),
            'total_tours' => Tour::count(),
        ]);
    }
}

