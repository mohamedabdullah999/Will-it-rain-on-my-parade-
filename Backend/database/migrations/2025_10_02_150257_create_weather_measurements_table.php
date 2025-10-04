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
        Schema::create('weather_measurements', function (Blueprint $table) {
    $table->id();
    $table->integer('year');
    $table->integer('mo');
    $table->integer('dy');
    $table->float('t2m')->nullable();
    $table->float('t2m_max')->nullable();
    $table->float('t2m_min')->nullable();
    $table->float('t2m_range')->nullable();
    $table->float('rh2m')->nullable();
    $table->float('ws2m')->nullable();
    $table->float('ws2m_max')->nullable();
    $table->float('ws2m_range')->nullable();
    $table->decimal('lat', 8, 5)->nullable();
    $table->decimal('lon', 8, 5)->nullable();
    $table->string('location')->nullable();
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weather_measurements');
    }
};
