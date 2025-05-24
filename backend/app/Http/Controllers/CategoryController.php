<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // ✅ رجع جميع التصنيفات
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    // ✅ إضافة تصنيف جديد
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = Category::create($validated);

        return response()->json($category, 201); // 201 = Created
    }

    // ✅ جلب تصنيف واحد
    public function show($id)
    {
        $category = Category::findOrFail($id);
        return response()->json($category);
    }

    // ✅ تعديل تصنيف
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category->update($validated);

        return response()->json($category);
    }

    // ✅ حذف تصنيف
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}
