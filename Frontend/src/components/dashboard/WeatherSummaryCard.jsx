import { Card, CardContent, Typography } from "@mui/material";

function decodeHtmlEntity(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}
const WeatherSummaryCard = ({
  selectedLocation,
  selectedDate,
  weatherData,
  loading,
  error,
}) => {
  if (loading) return <p>Loading weather...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!weatherData) {
    return (
      <p className="text-gray-500 text-center mt-15">
        No data yet — Please select location & date, then click "Check Weather"
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {/* Title */}

      {/* Location + Date */}
      <div className="flex justify-between p-3 rounded-xl shadow-md bg-[var(--primary-light)]">
        <div>
          <Typography variant="caption" color="text.secondary">
            Location
          </Typography>
          <Typography variant="body1" className="max-w-[200px] break-words">
            {selectedLocation?.label || "Choose on map"}
          </Typography>
        </div>
        <div className="text-right">
          <Typography variant="caption" color="text.secondary">
            Selected Date
          </Typography>
          <Typography variant="body1">{selectedDate}</Typography>
        </div>
      </div>

      {/* Seasonal Outlook */}
      <Typography variant="p" className="font-semibold ">
        Seasonal Outlook
      </Typography>
      <Card className="!mt-3 shadow-md !bg-[var(--primary-light)]">
        <CardContent className="flex justify-between items-center">
          <div>
            <Typography variant="caption" color="text.secondary !text-md">
              Humidity
            </Typography>
            <Typography variant="body1">{weatherData.humidity}%</Typography>
            <Typography variant="caption" color="text.secondary !text-md">
              Rain
            </Typography>
            <Typography variant="body1">
              {weatherData.rain_probability}
            </Typography>
          </div>
        </CardContent>
      </Card>

      {/* Weather Forecast */}
      <Card className="shadow-md !bg-[var(--primary-light)]">
        <CardContent className="flex justify-between items-center">
          <div>
            <Typography variant="caption" color="text.secondary">
              Weather Forecast
            </Typography>
            <Typography variant="body1">{weatherData.temperature}°C</Typography>
          </div>

          <div className="flex space-x-2 text-3xl">
            {weatherData.icons?.map((icon, idx) => (
              <span key={idx}>{decodeHtmlEntity(icon)}</span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* the wind */}
      <Card className="shadow-md !bg-[var(--primary-light)]">
        <CardContent className="flex justify-between items-center">
          <div>
            <Typography variant="caption" color="text.secondary">
              Wind Speed
            </Typography>
            <Typography variant="body1">
              {weatherData.wind_speed} m/s
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Wind Max
            </Typography>
            <Typography variant="body1">{weatherData.wind_max} m/s</Typography>
            <Typography variant="caption" color="text.secondary">
              Wind Range
            </Typography>
            <Typography variant="body1">{weatherData.wind_range}</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherSummaryCard;
