import { useState } from "react";
import DatePickerBar from "../../components/dashboard/DatePickerBar";
import { generateDates } from "../../utils/dateUtils";
import Map from "../../components/dashboard/Map";
import EventForm from "../../components/dashboard/EventForm";
import WeatherChart from "../../components/dashboard/WeatherChart";
import WeatherSummaryCard from "../../components/dashboard/WeatherSummaryCard";
import RecommendationCard from "../../components/dashboard/RecommendationCard";
import { Typography } from "@mui/material";
import { useDate } from "../../context/context";
import { useLocation } from "../../context/context";
import axios from "axios";
import { getWeatherSuggestion } from "../../utils/suggestUtils";

const dates = generateDates(2015, 2025);

const Dashboard = () => {
  const { selectedDate, setSelectedDate } = useDate();
  const { selectedLocation, setSelectedLocation } = useLocation();

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [recommendations, setRecommendations] = useState([]);

  const [historicalData, setHistoricalData] = useState([]);

  const handleCheckWeather = async () => {
    if (!selectedLocation || !selectedDate) return;

    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    try {
      setLoading(true);
      setError(null);

      // 1- fetch weather for a day
      const res = await axios.get(
        `http://localhost:8000/api/weather-by-location?lat=${selectedLocation.lat}&lon=${selectedLocation.lng}&year=${year}&mo=${month}&dy=${day}`
      );

      setWeatherData(res.data);

      // 2- fetch recommendations (best days)
      const recRes = await axios.get(
        `http://localhost:8000/api/best-visit-days?lat=${selectedLocation.lat}&lon=${selectedLocation.lng}&year=${year}&mo=${month}&dy=${day}`
      );

      // the first 4 days
      const days = recRes.data.best_days.slice(0, 4);
      const mapped = days.map((d) => {
        return {
          date: d.date,
          temperature: d.temperature,
          humidity: d.humidity,
          wind: d.wind_speed,
          weather_score: d.weather_score,
          suggestion: getWeatherSuggestion(d),
        };
      });
      setRecommendations(mapped);

      // 3- fetch historical data (last 10 years)
      const histRes = await axios.get(
        `http://localhost:8000/api/historical-data?lat=${selectedLocation.lat}&lon=${selectedLocation.lng}&year=${year}&mo=${month}&dy=${day}`
      );

      const formatted = histRes.data.map((d) => ({
        year: d.year,
        temperature: d.temperature,
        rain: parseFloat(d.rainProbability.replace("%", "")),
      }));

      setHistoricalData(formatted);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-8 p-6">
      <div className="col-span-9 space-y-6">
        <DatePickerBar
          dates={dates}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />

        <Map onLocationSelected={setSelectedLocation} />

        <EventForm
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          selectedLocation={selectedLocation}
          onSubmit={handleCheckWeather}
        />

        <WeatherChart
          selectedLocation={selectedLocation}
          historicalData={historicalData}
        />
      </div>

      <div className="col-span-3 space-y-6 h-screen overflow-y-auto pr-2">
        <div>
          <Typography variant="h6" className="font-semibold text-center">
            Will it rain in my parade?
          </Typography>
          <WeatherSummaryCard
            selectedLocation={selectedLocation}
            selectedDate={selectedDate}
            weatherData={weatherData}
            loading={loading}
            error={error}
          />
        </div>

        {/* Recommendations */}
        <div>
          <Typography variant="subtitle1" className="font-semibold mb-2">
            Recommendations For You <br />
            <span className="text-green-600 text-sm">
              (Best {recommendations.length} days)
            </span>
          </Typography>
          <div className="space-y-2">
            {recommendations.map((rec, i) => (
              <RecommendationCard key={i} {...rec} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
