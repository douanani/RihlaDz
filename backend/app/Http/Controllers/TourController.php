<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tour;

class TourController extends Controller
{
    // هادي دالة index ترجع قائمة الرحلات، فيها العلاقات مع category و agency، مرتبة من الأحدث للأقدم، ومقسمين على صفحات (10 في كل صفحة)
   public function index(Request $request)
{
    $query = Tour::with('category', 'agency');

    // 🔍 Keyword (title أو description)
    if ($request->filled('keyword')) {
        $keyword = $request->keyword;
        $query->where(function ($q) use ($keyword) {
            $q->where('title', 'like', "%$keyword%")
              ->orWhere('description', 'like', "%$keyword%");
        });
    }

    // 📍 Location
    if ($request->filled('location')) {
        $query->where('location', $request->location);
    }

    // 🗓️ Start Date
    if ($request->filled('date')) {
        $query->whereDate('start_date', '>=', $request->date);
    }

    // ⏳ Duration
    if ($request->filled('duration')) {
        $query->where('duration', $request->duration);
    }

    // 🏷️ Category
    if ($request->filled('category')) {
        $query->where('category_id', $request->category);
    }

    // 💰 Price range
    if ($request->filled('minPrice')) {
        $query->where('price', '>=', $request->minPrice);
    }
    if ($request->filled('maxPrice')) {
        $query->where('price', '<=', $request->maxPrice);
    }

    // 🧾 Pagination
    $perPage = $request->input('per_page', 9);
    $tours = $query->latest()->paginate($perPage);

    return response()->json($tours);
}


    // هادي الدالة تستعمل باش تسجل رحلة جديدة
    public function store(Request $request)
    {
        // نتحققو من البيانات اللي جاو في الطلب ونتأكدو بلي كلش صحيح
        $validated = $request->validate([
            'agency_id' => 'required|exists:agencies,id', // لازم تكون الوكالة موجودة
            'title' => 'required', // العنوان إجباري
            'description' => 'nullable', // الوصف اختياري
            'price' => 'required|numeric', // السعر لازم يكون رقم
            'start_date' => 'required|date', // تاريخ البداية إجباري
            'category_id' => 'required|exists:categories,id', // لازم التصنيف يكون موجود
            'thumbnail' => 'required|image', // الصورة الرئيسية إجباري تكون صورة
            'images.*' => 'nullable|image', // باقي الصور اختياريين
            'location' => 'required|string', // الموقع إجباري
        ]);

        // نخزنو الصورة الرئيسية في مجلد thumbnails في التخزين العمومي
        $thumbnailPath = $request->file('thumbnail')->store('thumbnails', 'public');

        // نحضرو مصفوفة باش نخزنو فيها الصور التانية
        $images = [];
        if ($request->hasFile('images')) {
            // نمرّو على كل صورة ونديرولها تخزين ونزيدوها فالمصفوفة
            foreach ($request->file('images') as $img) {
                $images[] = $img->store('tour-images', 'public');
            }
        }

        // ننشئو الرحلة الجديدة
        $tour = Tour::create([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'thumbnail' => $thumbnailPath,
            'images' => json_encode($images), // نحولو الصور JSON باش نخزنوهم فقاعدة البيانات
            'category_id' => $request->category_id,
            'agency_id' => Auth::user()->agency->id, // نربطوها بالوكالة التابعة للمستخدم
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'location' => $request->location,
        ]);
        // نرجعو الرحلة الجديدة مع التفاصيل
        return response()->json(['message' => 'Tour created', 'tour' => $tour]);
    }

    // هادي الدالة ترجع تفاصيل رحلة معينة برقم ID، مع العلاقات المرتبطة بيها
    public function show($id)
    {
        return Tour::with(['category','agency', 'reviews'])->findOrFail($id);
    }

    // دالة التحديث
    public function update(Request $request, $id)
    {
        // نجيبو الرحلة من قاعدة البيانات أو نرجعو 404 إذا ما لقاهاش
        $tour = Tour::findOrFail($id);

        // نتحققو من الصلاحيات (بوليصيات Laravel)، لازم تكون الوكالة صاحبة الرحلة
        $this->authorize('update', $tour);

        // نحدّثو الحقول الأساسية فقط
        $tour->update($request->only('title', 'description', 'price', 'category_id', 'start_date', 'end_date', 'location'));

        // إذا بعت صورة جديدة، نخزنوها ونديرو update
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('thumbnails', 'public');
            $tour->update(['thumbnail' => $thumbnailPath]);
        }

        // إذا بعت صور جديدة، نخزنوهم ونديرو update
        if ($request->hasFile('images')) {
            $images = [];
            foreach ($request->file('images') as $img) {
                $images[] = $img->store('tour-images', 'public');
            }
            $tour->update(['images' => json_encode($images)]);
        }

        // إذا طلب حذف بعض الصور، نحذفهم من القائمة
        if ($request->has('delete_images')) {
            $images = json_decode($tour->images, true); // نفكو JSON للمصفوفة
            foreach ($request->delete_images as $img) {
                if (($key = array_search($img, $images)) !== false) {
                    unset($images[$key]); // نحذف الصورة من المصفوفة
                }
            }
            // نحدّثو القائمة بعد الحذف
            $tour->update(['images' => json_encode(array_values($images))]);
        }

        return response()->json(['message' => 'Tour updated']);
    }
    // دالة ترجع قائمة الرحلات حسب التصنيف
    public function showByCategory($categoryId)
    {
        // نتحققو بلي التصنيف موجود
        $tours = Tour::with('agency')
            ->where('category_id', $categoryId)
            ->latest()
            ->paginate(10);

        return response()->json($tours);
    }
    // دالة حذف الرحلة
    public function destroy($id)
    {
        $tour = Tour::findOrFail($id); // نجيبو الرحلة ولا نرجعو 404 إذا ما لقاهاش

        $this->authorize('delete', $tour); // نتحققو بلي عندو الحق يحذفها

        // نحذفو الصورة الرئيسية من التخزين
        Storage::disk('public')->delete($tour->thumbnail);

        // نحذفو باقي الصور من التخزين
        foreach (json_decode($tour->images) as $img) {
            Storage::disk('public')->delete($img);
        }

        // نحذفو الرحلة من قاعدة البيانات
        $tour->delete();

        return response()->json(['message' => 'Tour deleted']);
    }
}
