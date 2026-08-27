import {
  formatTemperature,
  capitalizeText,
} from "../utils/weatherUtils";

function ForecastCard({ item }) {
  const date = new Date(`${item.date}T12:00:00`);

  const day = date.toLocaleDateString("en-US", {
    weekday: "short",
  });

  return (
    <div className="forecast-card">

      <p className="forecast-day">
        {day}
      </p>

      <img
        src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
        alt={item.description}
      />

      <div className="forecast-temperatures">
        <strong>
          {formatTemperature(item.high)}
        </strong>

        <span>
          {formatTemperature(item.low)}
        </span>
      </div>

      <p>
        {capitalizeText(item.description)}
      </p>

    </div>
  );
}

export default ForecastCard;