<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

    Schema::create('tours', function (Blueprint $table) {
    $table->id();
    $table->foreignId('agency_id')->constrained()->onDelete('cascade');
    $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');
    $table->string('title');
    $table->text('description');
    $table->decimal('price', 10, 2);
    $table->integer('duration')->comment('بالأيام');
    $table->date('start_date');
    $table->date('end_date')->nullable();
    $table->string('location');
    $table->string('thumbnail')->nullable(); // صورة رئيسية
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tours');
    }
};
