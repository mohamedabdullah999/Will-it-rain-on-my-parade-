import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const WeatherHistoryChart = ({ historicalData }) => {
  const dummyData = [
    { year: "2015", temperature: 0, rain: 0 },
    { year: "2016", temperature: 0, rain: 0 },
    { year: "2017", temperature: 0, rain: 0 },
    { year: "2018", temperature: 0, rain: 0 },
    { year: "2019", temperature: 0, rain: 0 },
    { year: "2020", temperature: 0, rain: 0 },
    { year: "2021", temperature: 0, rain: 0 },
    { year: "2022", temperature: 0, rain: 0 },
    { year: "2023", temperature: 0, rain: 0 },
    { year: "2024", temperature: 0, rain: 0 },
  ];

  const chartData =
    historicalData && historicalData.length > 0 ? historicalData : dummyData;

  return (
    <div className="ml-10 mb-10  h-[360px] !bg-[var(--primary-light)] p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Changes Rates Over 10Y</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis
            yAxisId="left"
            label={{ value: "Temp (°C)", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: "Rain Probability (%)",
              angle: -90,
              position: "insideRight",
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="temperature"
            stroke="#1d4ed8"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            name="Avg Temp (°C)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="rain"
            stroke="#06b6d4"
            strokeWidth={2}
            name="Avg Rainfall (mm)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherHistoryChart;
