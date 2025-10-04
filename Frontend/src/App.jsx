import "./App.css";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import WeatherExpectaions from "./pages/weatherexpectations";
import { DateProvider } from "./context/DateContext";
import { LocationProvider } from "./context/LocationContext";

function App() {
  return (
    <>
      <DateProvider>
        <LocationProvider>
          <div className="app">
            <main className="content">
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route
                    path="/weatherexpectaions"
                    element={<WeatherExpectaions />}
                  />
                </Routes>
              </Layout>
            </main>
          </div>
        </LocationProvider>
      </DateProvider>
    </>
  );
}

export default App;
