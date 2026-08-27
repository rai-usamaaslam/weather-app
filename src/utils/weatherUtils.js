export function formatTemperature(temperature) {
  return `${Math.round(temperature)}°C`;
}

export function formatWindSpeed(speed) {
  return `${speed} m/s`;
}

export function capitalizeText(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function groupForecastByDay(forecast) {
  const days = {};

  forecast.forEach((item) => {
    const date = new Date(item.dt * 1000);

    const day = date.toISOString().split("T")[0];

    if (!days[day]) {
      days[day] = [];
    }

    days[day].push(item);
  });

  return Object.values(days)
    .slice(0, 5)
    .map((day) => {
      const middayForecast =
        day.find((item) => {
          const hour = new Date(
            item.dt * 1000
          ).getHours();

          return hour >= 11 && hour <= 14;
        }) || day[Math.floor(day.length / 2)];

      return middayForecast;
    });
}