import { Card, CardContent, Typography } from "@mui/material";

const RecommendationCard = ({
  date,
  temperature,
  humidity,
  wind,
  weather_score,
  suggestion,
}) => {
  return (
    <Card className="shadow-sm !bg-[var(--primary-light)]">
      <CardContent>
        <Typography variant="subtitle2" className="font-semibold">
          {date}
        </Typography>

        <Typography variant="body2">
          🌡️ Temp: {temperature}°C | 💧 Humidity: {humidity}%
        </Typography>

        <Typography variant="body2">
          💨 Wind: {wind} m/s | ⭐ Score: {weather_score}
        </Typography>

        <Typography variant="body2" className="text-green-700 mt-1 font-medium">
          {suggestion}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
