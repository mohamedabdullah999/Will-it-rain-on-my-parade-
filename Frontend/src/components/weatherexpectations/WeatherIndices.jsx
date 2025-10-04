import WeatherIndexCard from "./WeatherIndexCard";

export default function WeatherIndices({ data }) {
  return (
    <div className="mb-10">
      <h4>Weather Indics</h4>
      <div className="my-4 flex justify-between gap-4">
        <div className="flex-1">
          <WeatherIndexCard
            title="Rainfall"
            value={`${data.rainfall.toFixed(1)}%`}
          />
        </div>
        <div className="flex-1">
          <WeatherIndexCard
            title="Temperature"
            value={`${data.temp.toFixed(1)}°C`}
          />
        </div>
        <div className="flex-1">
          <WeatherIndexCard
            title="Wind"
            value={`${data.wind.toFixed(1)} km/h`}
          />
        </div>
        <div className="flex-1">
          <WeatherIndexCard
            title="Humidity"
            value={`${data.humidity.toFixed(1)}%`}
          />
        </div>
      </div>
    </div>
  );
}
