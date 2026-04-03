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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
    $table->string('name');
    $table->string('scientific_name')->nullable(); // Employer බලන විශේෂ දෙයක්
    $table->text('description');
    $table->decimal('price', 10, 2);
    $table->string('category'); // Indoor, Outdoor, Pots, Tools
    $table->string('sunlight'); // Low, Partial, Full Sun
    $table->string('water'); // Low, Medium, High
    $table->string('image')->nullable();
    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
