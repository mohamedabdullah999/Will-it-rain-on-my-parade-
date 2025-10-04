<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\WeatherMeasurement;
use App\Http\Controllers\Api\GeoDataController;

class forecastWeek extends Controller
{
    public function getWeeklyForecast(Request $request)
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
    $month = $request->mo;
    $day = $request->dy;

    $results = [];

    for ($i = 0; $i < 7; $i++) {
        $currentDate = strtotime("+$i days", mktime(0, 0, 0, $month, $day, $year));
        $curYear = date('Y', $currentDate);
        $curMonth = date('m', $currentDate);
        $curDay = date('d', $currentDate);

        $weather = WeatherMeasurement::where('lat', $lat)
            ->where('lon', $lon)
            ->where('year', $curYear)
            ->where('mo', $curMonth)
            ->where('dy', $curDay)
            ->first();

        if ($weather) {
            $score = 0;
            if ($weather->t2m >= 20 && $weather->t2m <= 28) $score += 40;
            if ($weather->rh2m <= 80) $score += 30;
            if ($weather->ws2m <= 10) $score += 30;

            $results[] = [
                'date' => date('Y-m-d', $currentDate),
                'temperature' => $weather->t2m,
                'humidity' => $weather->rh2m,
                'wind_speed' => $weather->ws2m,
                'wind_max' => $weather->ws2m_max,
                'weather_score' => $score,
                'rainProbability' => (new GeoDataController())->getRainProbability($weather).'%',
            ];
        }
    }

    if (empty($results)) {
        return response()->json(['message' => 'No data found for this week'], 404);
    }

    return response()->json($results);
}

}
