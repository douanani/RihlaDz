<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tour_Images extends Model
{
    use HasFactory;

    protected $fillable = ['tour_id', 'url'];

    public function tour()
    {
        return $this->belongsTo(Tour::class);
    }
}
