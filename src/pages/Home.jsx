import SearchBar from "../features/weather/components/SearchBar";
import WeatherCard from "../features/weather/components/WeatherCard";
import Loading from "../features/weather/components/Loading";
import ErrorMessage from "../features/weather/components/ErrorMessage";
import RecentCities from "../features/weather/components/RecentCities";
import LocationButton from "../features/weather/components/LocationButton";
import Forecast from "../features/weather/components/Forecast";

import { useWeatherContext } from "../features/weather/context/WeatherContext";

import useLocalStorage from "../hooks/useLocalStorage";

function Home() {
  const {
    weather,
    forecast,
    status,
    error,
    forecastError,
    searchWeather,
    searchByLocation,
  } = useWeatherContext();

  const [recentCities, setRecentCities] = useLocalStorage("recentCities", []);

  async function handleSearch(city) {
    await searchWeather(city);

    setRecentCities((previousCities) => {
      const filteredCities = previousCities.filter(
        (item) => item.toLowerCase() !== city.toLowerCase(),
      );

      return [city, ...filteredCities].slice(0, 5);
    });
  }

  function handleLocation(latitude, longitude) {
    searchByLocation(latitude, longitude);
  }

  return (
    <div className="app">
      <div className="weather-container">
        <h1 className="title">Weather App</h1>

        <SearchBar onSearch={handleSearch} disabled={status === "loading"} />

        <LocationButton
          onLocation={handleLocation}
          disabled={status === "loading"}
        />

        <RecentCities cities={recentCities} onSelect={handleSearch} />

        {status === "loading" && <Loading />}

        {status === "error" && <ErrorMessage message={error} />}

        {status === "success" && (
          <>
            <WeatherCard weather={weather} />

            {forecastError && <p className="error">{forecastError}</p>}

            {!forecastError && <Forecast forecast={forecast} />}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
