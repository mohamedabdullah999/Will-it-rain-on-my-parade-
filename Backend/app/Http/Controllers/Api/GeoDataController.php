<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\WeatherMeasurement;

class GeoDataController extends Controller
{

    public function getLocationName($lat, $lon)
    {
        $url = "https://nominatim.openstreetmap.org/reverse?format=json&lat={$lat}&lon={$lon}&zoom=18&addressdetails=1";

        $opts = [
            "http" => [
                "header" => "User-Agent: LaravelApp/1.0\r\n"
            ]
        ];
        $context = stream_context_create($opts);

        $response = file_get_contents($url, false, $context);

        if (!$response) {
            return 'Unknown location';
        }

        $data = json_decode($response, true);

        return $data['display_name'] ?? 'Unknown location';
    }

    public function getRainProbability($weather)
    {
        $rh = $weather->rh2m;

        if ($rh < 50) {
            return 10;
        } elseif ($rh < 70) {
            return 40;
        } elseif ($rh < 85) {
            return 70;
        } else {
            return 90;
        }
    }

    // This function returns an array of weather icons based on the weather data
    private function getWeatherIcons($weather)
    {
        $icons = [];

        // Temperature
        if ($weather->t2m < 15) {
            $icons[] = '&#10052;'; // cold
        } elseif ($weather->t2m <= 25) {
            $icons[] = '&#127780;'; // mild
        } else {
            $icons[] = '&#9728;'; // hot
        }

        // Wind
        if ($weather->ws2m >= 15) {
            $icons[] = '&#127786;'; // strong wind / tornado
        } elseif ($weather->ws2m >= 8) {
            $icons[] = '&#127744;'; // moderate wind / cyclone
        }

        // Rain / Humidity
        if ($weather->rh2m >= 80) {
            if ($weather->t2m < 15) {
                $icons[] = '&#127784;'; // snow cloud
            } else {
                $icons[] = '&#127783;'; // rain cloud
            }
        }

        return $icons;
    }

    // This function returns weather data along with icons for a given location
    public function getWeatherByLocation(Request $request)
    {
        $request->validate([
            'lat' => 'required|numeric',
            'lon' => 'required|numeric',
        ]);

        $lat = $request->query('lat');
        $lon = $request->query('lon');

        // Retrieve the closest record from the database
        $query = WeatherMeasurement::select(
        'id' , 'location', 'lat', 'lon', 't2m', 'rh2m', 'ws2m', 'ws2m_max', 'ws2m_range'
        );

        // Filter by year
        if ($request->has('year')) {
            $query->where('year', $request->year);
        }

       // Filter by month
        if ($request->has('mo')) {
            $query->where('mo', $request->mo);
        }

        // Filter by day
        if ($request->has('dy')) {
            $query->where('dy', $request->dy);
        }

        // Optional: filter by closest coordinates
        if ($request->has(['lat', 'lon'])) {
            $lat = $request->lat;
            $lon = $request->lon;
            $query->orderByRaw("ABS(lat - ?) + ABS(lon - ?) ASC", [$lat, $lon]);
        }

        // Get first matching record
        $weather = $query->first();

        if (!$weather) {
            return response()->json(['message' => 'No weather data found'], 404);
        }

        // Get the array of icons based on weather data
        $icons = $this->getWeatherIcons($weather);

        //Get rain probability
        $rainProbability = $this->getRainProbability($weather);

        $locationName = $this->getLocationName($weather->lat, $weather->lon);

        // Return JSON response
        return response()->json([
            'id' => $weather->id,
            'location'    => $locationName,
            'latitude'    => $weather->lat,
            'longitude'   => $weather->lon,
            'temperature' => $weather->t2m,
            'humidity'    => $weather->rh2m,
            'wind_speed'  => $weather->ws2m,
            'wind_max'    => $weather->ws2m_max,
            'wind_range'  => $weather->ws2m_range,
            'rain_probability' => $rainProbability.'%',
            'year'        => $request->year,
            'month'       => $request->mo,
            'day'         => $request->dy,
            'icons'       => $icons,
        ]);
    }
}
