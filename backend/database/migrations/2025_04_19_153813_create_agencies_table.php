<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Agency;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'phone_number' => '0555123456',
                'role' => 'admin',
                'remember_token' => Str::random(10),
            ]
        );

        // Agency User
        $agencyUser = User::firstOrCreate(
            ['email' => 'agency@example.com'],
            [
                'name' => 'Adventure Agency',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'phone_number' => '0666987654',
                'role' => 'agency',
                'remember_token' => Str::random(10),
            ]
        );

        // Tourist User
        $tourist = User::firstOrCreate(
            ['email' => 'tourist@example.com'],
            [
                'name' => 'Tourist Guy',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'phone_number' => '0777456123',
                'role' => 'tourist',
                'remember_token' => Str::random(10),
            ]
        );

        // 🟢 Categories
        $categories = [
            ['name' => 'Nature', 'comment' => 'Tours in natural environments'],
            ['name' => 'Cultural & Historical', 'comment' => 'Explore culture and history'],
            ['name' => 'Leisure & Relaxation', 'comment' => 'Chill and relax experiences'],
            ['name' => 'Adventure', 'comment' => 'Exciting and thrilling tours'],
            ['name' => 'Water', 'comment' => 'Sea, lakes, and water activities'],
            ['name' => 'Family', 'comment' => 'Fun for all family members'],
            ['name' => 'Food & Culinary', 'comment' => 'Gastronomy and food exploration'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['name' => $category['name']],
                ['comment' => $category['comment']]
            );
        }

        // 🟣 Agency Seeding
        Agency::firstOrCreate(
            ['user_id' => $agencyUser->id], // مرتبط بـ user عندو role = agency
            [
                'name' => 'Adventure Explorers',
                'description' => 'Specialized in extreme outdoor adventures and discovery tours.',
                'logo' => 'default_logo.png', // تقدر تبدلها بصور حقيقية
                'status' => 'approved',
            ]
        );

        Tour::firstOrcreate([
    'agency_id' => $agency->id,
    'category_id' => $category->id,
    'title' => 'Explore the Sahara',
    'description' => 'A magical journey through the Algerian desert.',
    'price' => 1200,
    'duration' => 5,
    'start_date' => now()->addDays(10),
    'end_date' => now()->addDays(15),
    'location' => 'Tamanrasset, Algeria',
    'thumbnail' => 'sahara.jpg',
]);
    }
}
