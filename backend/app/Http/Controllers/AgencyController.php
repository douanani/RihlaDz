<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Agency;

class AgencyController extends Controller
{
    public function index()
    {
        return Agency::with('user')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string',
            'description' => 'nullable|string',
        ]);

        return Agency::create($validated);
    }

    public function show($id)
    {
        return Agency::with('tours')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $agency = Agency::findOrFail($id);
        $agency->update($request->all());

        return $agency;
    }

    public function destroy($id)
    {
        Agency::destroy($id);
        return response()->json(['message' => 'Agency deleted']);
    }

    // Optional: Agency can get their own tours
    public function myTours($id)
    {
        $agency = Agency::with('tours')->findOrFail($id);
        return $agency->tours;
    }
}

