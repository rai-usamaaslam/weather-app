import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import useWeather from "../hooks/useWeather";

function Home() {
  const {
    weather,
    loading,
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

        {loading && <Loading />}

        {error && <ErrorMessage message={error} />}

        <WeatherCard weather={weather} />

      </div>
    </div>
  );
}

export default Home;