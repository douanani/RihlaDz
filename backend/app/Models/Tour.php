<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tour extends Model
{

    protected $fillable = [
        'agency_id', 'title', 'description', 'price', 'start_date',
        'end_date', 'location', 'thumbnail', 'category_id'
    ];
    public function agency()
    {
        return $this->belongsTo(Agency::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function images()
    {
        return $this->hasMany(TourImage::class);
    }

}
