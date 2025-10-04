<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WeatherApiController;
use App\Http\Controllers\Api\GeoDataController;
use App\Http\Controllers\Api\BestWeatherLocationsController;
use App\Http\Controllers\Api\HistoricalDataRetrieval;
use App\Http\Controllers\Api\forecastWeek;

Route::get('/best-visit-days', [BestWeatherLocationsController::class, 'getBestVisitDays']);
Route::post('/import-weather', [WeatherApiController::class, 'import']);
Route::get('/import', [WeatherApiController::class, 'get']);
Route::get('/weather-by-location', [GeoDataController::class, 'getWeatherByLocation']);
Route::get('/recomendation', [BestWeatherLocationsController::class, 'getTopLocations']);
Route::get('/historical-data', [App\Http\Controllers\Api\HistoricalDataRetrieval::class, 'getHistoricalData']);
Route::get('/forecast-week', [App\Http\Controllers\Api\forecastWeek::class, 'getWeeklyForecast']);
