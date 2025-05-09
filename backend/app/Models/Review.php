<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{

    public function tour()
    {
        return $this->belongsTo(Tour::class);
    }

    public function tourist()
    {
        return $this->belongsTo(Tourist::class);
    }

}
