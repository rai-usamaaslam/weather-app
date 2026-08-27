import ForecastCard from "./ForecastCard";

function Forecast({ forecast }) {
  if (!forecast.length) {
    return null;
  }

  return (
    <div className="forecast">
      <h2>Forecast</h2>

      <div className="forecast-list">
        {forecast.slice(0, 5).map((item) => (
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