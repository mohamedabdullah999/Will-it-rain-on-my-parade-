import WeatherIndices from "../../components/weatherexpectations/WeatherIndices";
import WeatherProbabilityCurves from "../../components/weatherexpectations/WeatherProbabilityCurves";
import CalendarSection from "../../components/weatherexpectations/CalendarSection";
import { useDate } from "../../context/context";
import { useLocation } from "../../context/context";
import { useState } from "react";
import axios from "axios";

export default function WeatherExpectaions() {
  const { selectedDate, setSelectedDate } = useDate();
  const { selectedLocation } = useLocation();

  const [weeklyData, setWeeklyData] = useState({
    rainfall: [],
    temp: [],
    wind: [],
    humidity: [],
  });
  const [dailyAvg, setDailyAvg] = useState({
    rainfall: 0,
    temp: 0,
    wind: 0,
    humidity: 0,
  });

  const handleFetchWeek = async () => {
    if (!selectedLocation) return;

    const { lat, lon } = selectedLocation;
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const mo = date.getMonth() + 1;
    const dy = date.getDate();

    try {
      const res = await axios.get(
        `http://localhost:8000/api/forecast-week?lat=${lat}&lon=${lon}&year=${year}&mo=${mo}&dy=${dy}`
      );

      const data = res.data;

      const formatted = {
        rainfall: data.map((d) => ({
          day: d.date,
          value: parseFloat(d.rainProbability),
        })),
        temp: data.map((d) => ({ day: d.date, value: d.temperature })),
        wind: data.map((d) => ({ day: d.date, value: d.wind_speed })),
        humidity: data.map((d) => ({ day: d.date, value: d.humidity })),
      };

      setWeeklyData(formatted);

      const avg =
        data.length > 0
          ? {
              rainfall:
                data.reduce(
                  (acc, d) => acc + parseFloat(d.rainProbability),
                  0
                ) / data.length,
              temp:
                data.reduce((acc, d) => acc + d.temperature, 0) / data.length,
              wind:
                data.reduce((acc, d) => acc + d.wind_speed, 0) / data.length,
              humidity:
                data.reduce((acc, d) => acc + d.humidity, 0) / data.length,
            }
          : { rainfall: 0, temp: 0, wind: 0, humidity: 0 };
      setDailyAvg(avg);
    } catch (err) {
      console.error("Error fetching weekly data", err);
    }
  };

  const futureDate = new Date(selectedDate);
  futureDate.setDate(futureDate.getDate() + 7);

  const options = { day: "numeric", month: "long", year: "numeric" };
  const displayDate = new Date(selectedDate).toLocaleDateString(
    "en-GB",
    options
  );
  const displayFutureDate = futureDate.toLocaleDateString("en-GB", options);

  return (
    <div className="p-6">
      <div className="flex  justify-between">
        <div>
          <h1>Weather Insights for {selectedLocation?.label}</h1>

          <p className="text-gray-600 my-2">
            From <span className="font-semibold">{displayDate}</span> to{" "}
            <span className="font-semibold">{displayFutureDate}</span>
          </p>
          <button
            onClick={handleFetchWeek}
            className="cursor-pointer flex flex-col mt-20 bg-sky-500 hover:bg-sky-600 text-white px-6 py-4 rounded-md text-sm font-medium"
          >
            Check Weather For a Week
          </button>
        </div>
        <CalendarSection
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </div>
      <WeatherIndices data={dailyAvg} />
      <WeatherProbabilityCurves weeklyData={weeklyData} />
    </div>
  );
}
