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
    const didSearchSucceed = await searchWeather(city);

    if (!didSearchSucceed) {
      return;
    }

    setRecentCities((previousCities) => {
      const filteredCities = previousCities.filter(
        (item) => item.toLowerCase() !== city.toLowerCase(),
      );

      return [city, ...filteredCities].slice(0, 5);
    });
  }

  function handleClearHistory() {
    setRecentCities([]);
  }

  function handleLocation(latitude, longitude) {
    searchByLocation(latitude, longitude);
  }

  return (
    <div className="app">
      <div className="weather-container">
        <aside className="weather-sidebar">
          <div className="brand-row">
            <h1 className="title">Weather Nest</h1>
          </div>

          <div className="mini-card">
            <div className="status-row">
              <span className="status-label">Status</span>
              <span className="status-badge">● Online</span>
            </div>

            <div className="mini-weather">
              <span>{weather ? Math.round(weather.temperature) : "--"}°</span>
            </div>

            <div className="mini-meter">
              <div className="mini-meter-track">
                <div className="mini-meter-fill" />
              </div>
            </div>

            <button type="button" className="secondary-button">
              See More Details
            </button>
          </div>

          <div className="controls-box">
            <SearchBar
              onSearch={handleSearch}
              disabled={status === "loading"}
            />

            <LocationButton
              onLocation={handleLocation}
              disabled={status === "loading"}
            />
          </div>

          <RecentCities
            cities={recentCities}
            onSelect={handleSearch}
            onClear={handleClearHistory}
          />
        </aside>

        <main className="weather-main">
          <div className="topbar">
            <div className="location-pill">
              <span className="location-dot" />
              {weather
                ? `${weather.city}, ${weather.country}`
                : "Brooklyn, New York, USA"}
            </div>

            <button type="button" className="download-button">
              Download App
            </button>
          </div>

          {status === "loading" && <Loading />}

          {status === "error" && <ErrorMessage message={error} />}

          {!status && !weather && (
            <div className="empty-state">
              <h2>
                Stormy
                <br />
                with partly cloudy
              </h2>
              <p>
                Search for a city or use your location to check the forecast.
              </p>
            </div>
          )}

          {status === "success" && (
            <>
              <div className="current-weather-wrap">
                <div className="current-temp-block">
                  <div className="temperature-stack">
                    <div className="temp-line">
                      <span className="current-temp">
                        {Math.round(weather.temperature)}°
                      </span>
                      <div className="temp-range">
                        <span>H {Math.round(weather.temperature + 3)}°</span>
                        <span>L {Math.round(weather.temperature - 6)}°</span>
                      </div>
                    </div>
                  </div>
                </div>

                <WeatherCard weather={weather} />
              </div>

              {forecastError && <p className="error">{forecastError}</p>}

              {!forecastError && <Forecast forecast={forecast} />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home;
