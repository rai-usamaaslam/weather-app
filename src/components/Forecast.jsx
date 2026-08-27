import ForecastCard from "./ForecastCard";
import { groupForecastByDay } from "../utils/weatherUtils";

function Forecast({ forecast }) {
  if (!forecast.length) {
    return null;
  }

  const dailyForecast = groupForecastByDay(
    forecast
  );

  return (
    <div className="forecast">
      <h2>5-Day Forecast</h2>

      <div className="forecast-list">
        {dailyForecast.map((item) => (
          <ForecastCard
            key={item.dt}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}

export default Forecast;