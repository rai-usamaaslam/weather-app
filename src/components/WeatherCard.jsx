import {
  formatTemperature,
  formatWindSpeed,
  capitalizeText,
} from "../utils/weatherUtils";

function WeatherCard({ weather }) {
  if (!weather) {
    return null;
  }

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div>
          <h2>
            {weather.city}, {weather.country}
          </h2>

          <p>{capitalizeText(weather.description)}</p>
        </div>

        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
        />
      </div>

      <div className="temperature">
        <h1>{formatTemperature(weather.temperature)}</h1>

        <p>
          Feels like {formatTemperature(weather.feelsLike)}
        </p>
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
          <strong>{formatWindSpeed(weather.windSpeed)}</strong>
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