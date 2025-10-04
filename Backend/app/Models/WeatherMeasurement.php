<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WeatherMeasurement extends Model
{
    protected $fillable = [
    'year', 'mo', 'dy', 't2m', 't2m_max', 't2m_min', 't2m_range',
    'rh2m', 'ws2m', 'ws2m_max', 'ws2m_range',
    'lat', 'lon', 'location'
];
}
