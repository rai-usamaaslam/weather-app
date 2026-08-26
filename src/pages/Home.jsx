import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import useWeather from "../hooks/useWeather";

function Home() {
  const { weather, loading, error, searchWeather } = useWeather();

  return (
    <div>
      <h1>Weather App</h1>

      <SearchBar onSearch={searchWeather} />

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      <WeatherCard weather={weather} />
    </div>
  );
}

export default Home;
