function ForecastCard({ item }) {
  const date = new Date(item.dt * 1000);

  return (
    <div className="forecast-card">

      <p>
        {date.toLocaleDateString("en-US", {
          weekday: "short",
        })}
      </p>

      <img
        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
        alt={item.weather[0].description}
      />

      <h3>
        {Math.round(item.main.temp)}°C
      </h3>

      <p>
        {item.weather[0].description}
      </p>

    </div>
  );
}

export default ForecastCard;