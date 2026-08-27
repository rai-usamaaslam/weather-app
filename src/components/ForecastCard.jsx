import {
  formatTemperature,
  capitalizeText,
} from "../utils/weatherUtils";

function ForecastCard({ item }) {
  const date = new Date(item.dt * 1000);

  const day = date.toLocaleDateString(
    "en-US",
    {
      weekday: "short",
    }
  );

  return (
    <div className="forecast-card">

      <p className="forecast-day">
        {day}
      </p>

      <img
        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
        alt={item.weather[0].description}
      />

      <h3>
        {formatTemperature(item.main.temp)}
      </h3>

      <p>
        {capitalizeText(
          item.weather[0].description
        )}
      </p>

    </div>
  );
}

export default ForecastCard;