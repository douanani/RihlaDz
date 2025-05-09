<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tour extends Model
{

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

}
