import { useEffect, useState } from "react";
import { fetchWeatherForcast } from "./weatherApi";
import { Weather } from "./weatherApi/types";

function App() {
  const [location, setLocation] = useState<string>("London");
  const [weatherForecast, setWeatherForecast] = useState<Weather>();

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        navigator.geolocation.getCurrentPosition((p) => {
          console.log(p);
        });
      }
    });
  }, []);

  const fetchWeatherHandler = async () => {
    const weather = await fetchWeatherForcast(location);
    setWeatherForecast(weather);
  };

  return (
    <div className="App">
      <span>Location:</span>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="button" onClick={fetchWeatherHandler}>
        Find
      </button>
      <div className="current-weather">
        {weatherForecast?.current.temp_c}&deg;
      </div>
    </div>
  );
}

export default App;
