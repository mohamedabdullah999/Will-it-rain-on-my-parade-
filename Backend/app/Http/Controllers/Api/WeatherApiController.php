<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\WeatherMeasurement;

class WeatherApiController extends Controller
{
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:csv,txt|max:20000'
        ]);

        if ($request->hasFile('file')) {
            $path = $request->file('file')->getRealPath();
            $handle = fopen($path, "r");

            $header = fgetcsv($handle);

            $count = 0;
            while (($row = fgetcsv($handle, 1000, ",")) !== false) {
                WeatherMeasurement::create([
                    'year'       => $row[0],
                    'mo'         => $row[1],
                    'dy'         => $row[2],
                    't2m'        => $row[3],
                    't2m_max'    => $row[4],
                    't2m_min'    => $row[5],
                    't2m_range'  => $row[6],
                    'rh2m'       => $row[7],
                    'ws2m'       => $row[8],
                    'ws2m_max'   => $row[9],
                    'ws2m_range' => $row[10],
                    'lat'        => $row[11],
                    'lon'        => $row[12],
                    'location'   => $row[13],
                ]);
                $count++;
            }
            fclose($handle);

            return response()->json([
                'message' => "Imported $count rows successfully"
            ]);
        }

        return response()->json([
            'message' => "No file received"
        ], 400);
    }

    public function get()
    {
        $data = WeatherMeasurement::all();
        return response()->json($data);
    }
}
