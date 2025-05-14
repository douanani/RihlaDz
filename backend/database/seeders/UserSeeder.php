<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Admin User
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'), // تغييرها في الإنتاج
            'phone_number' => '0555123456',
            'role' => 'admin',
            'remember_token' => Str::random(10),
        ]);

        // Agency User
        User::create([
            'name' => 'Adventure Agency',
            'email' => 'agency@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'phone_number' => '0666987654',
            'role' => 'agency',
            'remember_token' => Str::random(10),
        ]);

        // Tourist User
        User::create([
            'name' => 'Tourist Guy',
            'email' => 'tourist@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'phone_number' => '0777456123',
            'role' => 'tourist',
            'remember_token' => Str::random(10),
        ]);

        // Optional: Generate random tourists
        User::factory()->count(10)->create([
            'role' => 'tourist',
        ]);
    }
}
