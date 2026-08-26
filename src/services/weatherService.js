const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  const data = await response.json();

  if (!response.ok) {
    console.log("API ERROR:", data);
    throw new Error(data.message || "Weather request failed");
  }

  return data;
}