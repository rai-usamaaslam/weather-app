import {
  WEATHER_API_URL,
  FORECAST_API_URL,
  WEATHER_API_KEY,
} from "../config/api";

import { apiClient } from "./apiClient";

function formatWeather(data) {
  return {
    city: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
}

export async function getWeather(city, signal) {
  const url = new URL(WEATHER_API_URL);

  url.searchParams.set("q", city);
  url.searchParams.set("appid", WEATHER_API_KEY);
  url.searchParams.set("units", "metric");

  const data = await apiClient(url, { signal });

  return formatWeather(data);
}

export async function getWeatherByLocation(
  latitude,
  longitude,
  signal
) {
  const url = new URL(WEATHER_API_URL);

  url.searchParams.set("lat", latitude);
  url.searchParams.set("lon", longitude);
  url.searchParams.set("appid", WEATHER_API_KEY);
  url.searchParams.set("units", "metric");

  const data = await apiClient(url, { signal });

  return formatWeather(data);
}

export async function getForecast(city, signal) {
  const url = new URL(FORECAST_API_URL);

  url.searchParams.set("q", city);
  url.searchParams.set("appid", WEATHER_API_KEY);
  url.searchParams.set("units", "metric");

  const data = await apiClient(url, { signal });

  return data.list;
}