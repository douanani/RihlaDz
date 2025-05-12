<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{

    protected $fillable = [
        'user_id',
        'tour_id',
        'agency_id',
        'number_of_people',
        'booking_date',
        'status',
        'notes'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tour()
    {
        return $this->belongsTo(Tour::class);
    }

    public function agency()
    {
        return $this->belongsTo(Agency::class);
    }

}
