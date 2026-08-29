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

  return Object.entries(days)
    .slice(0, 5)
    .map(([date, items]) => {
      let high = -Infinity;
      let low = Infinity;

      items.forEach((item) => {
        high = Math.max(high, item.main.temp_max);
        low = Math.min(low, item.main.temp_min);
      });

      // Use the forecast closest to midday for icon/description
      const representative =
        items.find((item) => {
          const hour = new Date(
            item.dt * 1000
          ).getHours();

          return hour >= 11 && hour <= 14;
        }) || items[Math.floor(items.length / 2)];

      return {
        date,
        high,
        low,
        icon: representative.weather[0].icon,
        description:
          representative.weather[0].description,
      };
    });
}