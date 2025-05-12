<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tour;

class TourController extends Controller
{
    public function index()
    {
        return Tour::with('agency')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'agency_id' => 'required|exists:agencies,id',
            'title' => 'required',
            'description' => 'nullable',
            'price' => 'required|numeric',
            'start_date' => 'required|date',
        ]);

        return Tour::create($validated);
    }

    public function show($id)
    {
        return Tour::with(['agency', 'reviews'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $tour = Tour::findOrFail($id);
        $tour->update($request->all());
        return $tour;
    }

    public function destroy($id)
    {
        Tour::destroy($id);
        return response()->json(['message' => 'Tour deleted']);
    }
}

