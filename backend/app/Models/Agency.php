<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agency extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'status',
        'logo',
    ];

    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Define the relationship with the Tour model
    public function tours()
    {
        return $this->hasMany(Tour::class);
    }
}
