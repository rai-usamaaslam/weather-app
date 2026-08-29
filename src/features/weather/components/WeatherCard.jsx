function WeatherCard({ weather }) {
  if (!weather) {
    return null;
  }

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="weather-location">
          <h2>
            {weather.city}, {weather.country}
          </h2>

          <p>{weather.description}</p>
        </div>

        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
        />
      </div>

      <div className="temperature">
        <h1>{Math.round(weather.temperature)}°C</h1>

        <p>Feels like {Math.round(weather.feelsLike)}°C</p>
      </div>

      <div className="weather-details">
        <div>
          <span>💧</span>
          <p>Humidity</p>
          <strong>{weather.humidity}%</strong>
        </div>

        <div>
          <span>💨</span>
          <p>Wind</p>
          <strong>{weather.windSpeed} m/s</strong>
        </div>

        <div>
          <span>🌡️</span>
          <p>Pressure</p>
          <strong>{weather.pressure} hPa</strong>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
