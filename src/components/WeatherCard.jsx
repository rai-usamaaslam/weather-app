function WeatherCard({ weather }) {
  if (!weather) {
    return null;
  }

  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    weather: weatherInfo,
    wind,
  } = weather;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div>
          <h2>{name}</h2>
          <p>{weatherInfo[0].description}</p>
        </div>

        <img
          src={`https://openweathermap.org/img/wn/${weatherInfo[0].icon}@2x.png`}
          alt={weatherInfo[0].description}
        />
      </div>

      <div className="temperature">
        <h1>{Math.round(temp)}°C</h1>
        <p>Feels like {Math.round(feels_like)}°C</p>
      </div>

      <div className="weather-details">
        <div>
          <span>💧</span>
          <p>Humidity</p>
          <strong>{humidity}%</strong>
        </div>

        <div>
          <span>💨</span>
          <p>Wind</p>
          <strong>{wind.speed} m/s</strong>
        </div>

        <div>
          <span>🌡️</span>
          <p>Pressure</p>
          <strong>{pressure} hPa</strong>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
