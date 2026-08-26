import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import useWeather from "../hooks/useWeather";

function Home() {
  const {
    weather,
    status,
    error,
    searchWeather,
  } = useWeather();

  return (
    <div className="app">
      <div className="weather-container">

        <h1 className="title">
          Weather App
        </h1>

        <SearchBar onSearch={searchWeather} />

        {status === "loading" && <Loading />}

        {status === "error" && (
          <ErrorMessage message={error} />
        )}

        {status === "success" && (
          <WeatherCard weather={weather} />
        )}

      </div>
    </div>
  );
}

export default Home;