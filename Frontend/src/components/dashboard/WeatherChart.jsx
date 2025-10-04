import WeatherHistoryChart from "./WeatherHistoryChart";
import SideCards from "./SideCards";

const WeatherChart = ({ selectedLocation, historicalData }) => {
  return (
    <div className="grid grid-cols-12 gap-2 ">
      <div className="col-span-3 space-y-6">
        <SideCards selectedLocation={selectedLocation} />
      </div>
      <div className="col-span-9 space-y-6">
        <WeatherHistoryChart historicalData={historicalData} />
      </div>
    </div>
  );
};

export default WeatherChart;
