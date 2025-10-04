<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\GeoDataController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\WeatherMeasurement;

class HistoricalDataRetrieval extends Controller
{
    public function getHistoricalData(Request $request)
    {
        $request->validate([
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'year' => 'required|numeric',
            'mo' => 'required|numeric',
            'dy' => 'required|numeric',
        ]);

    $lat = $request->lat;
    $lon = $request->lng;
    $year = $request->year;
    $mo = $request->mo;
    $dy = $request->dy;


    $years = range($year - 10, $year - 1);

    $results = [];

    foreach ($years as $y) {
        $weather = WeatherMeasurement::where('lat', $lat)
            ->where('lon', $lon)
            ->where('year', $y)
            ->where('mo', $mo)
            ->where('dy', $dy)
            ->first();

        if ($weather) {
            $results[] = [
                'year' => $y,
                'temperature' => $weather->t2m,
                'humidity' => $weather->rh2m,
                'wind_speed' => $weather->ws2m,
                'wind_max' => $weather->ws2m_max,
                'rainProbability' => (new GeoDataController())->getRainProbability($weather).'%',
            ];
        }
    }

    if (empty($results)) {
        return response()->json(['message' => 'No data found'], 404);
    }

    return response()->json($results);
}

}
