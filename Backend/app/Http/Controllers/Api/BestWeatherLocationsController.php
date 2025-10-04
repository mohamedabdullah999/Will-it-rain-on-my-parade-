<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\GeoDataController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\WeatherMeasurement;
use Illuminate\Support\Facades\DB;

class BestWeatherLocationsController extends Controller
{
    private function calculateWeatherScore($weather)
    {
        $score = 0;

        if ($weather->t2m >= 15 && $weather->t2m <= 28) {
            $score += 40;
        }

        if ($weather->rh2m <= 80) {
            $score += 30;
        }

        if ($weather->ws2m <= 10) {
            $score += 30;
        }

        return $score;
    }

    // Haversine formula for distance in km
    private function calculateDistance($lat1, $lon1, $lat2, $lon2)
    {
        $earthRadius = 6371; // km

        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);

        $a = sin($dLat / 2) * sin($dLat / 2) +
             cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
             sin($dLon / 2) * sin($dLon / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return $earthRadius * $c;
    }

    public function getBestVisitDays(Request $request)
    {


        $request->validate([
        'lat' => 'required|numeric',
        'lon' => 'required|numeric',
        'year' => 'required|numeric',
        'mo' => 'required|numeric',
        'dy' => 'required|numeric',
        ]);

        $lat = $request->lat;
        $lon = $request->lon;
        $year = $request->year;
        $mo = $request->mo;
        $dy = $request->dy;

    $geo = new GeoDataController();

    $startDate = \Carbon\Carbon::createFromDate($year, $mo, $dy)->startOfDay();
    $endDate = $startDate->copy()->addDays(30)->endOfDay();

    $weatherData = WeatherMeasurement::whereRaw("ABS(lat - ?) < 0.05 AND ABS(lon - ?) < 0.05", [$lat, $lon])
        ->whereRaw("
            STR_TO_DATE(CONCAT(year,'-',mo,'-',dy), '%Y-%m-%d') BETWEEN ? AND ?
        ", [$startDate->toDateString(), $endDate->toDateString()])
        ->get();

    if ($weatherData->isEmpty()) {
        return response()->json(['message' => 'No weather data found'], 404);
    }

    $bestDays = [];
    foreach ($weatherData as $row) {
        $score = $this->calculateWeatherScore($row);

        $bestDays[] = [
            'date' => "{$row->year}-{$row->mo}-{$row->dy}",
            'temperature' => $row->t2m,
            'humidity' => $row->rh2m,
            'wind_speed' => $row->ws2m,
            'weather_score' => $score,
            'rainProbability' => $geo->getRainProbability($row).'%',
        ];
    }

    usort($bestDays, fn($a, $b) => $b['weather_score'] <=> $a['weather_score']);

    $topDays = array_slice($bestDays, 0, 5);

    $locationName = $geo->getLocationName($lat, $lon);

    return response()->json([
        'location' => $locationName,
        'best_days' => $topDays
    ]);
    }

}
