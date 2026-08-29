import { useEffect, useRef, useState } from "react";

import {
  getWeather,
  getWeatherByLocation,
  getForecast,
} from "../services/weatherService";

function useWeather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [forecastError, setForecastError] = useState("");

  const controllerRef = useRef(null);

  function createController() {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();

    controllerRef.current = controller;

    return controller;
  }

  async function searchWeather(city) {
    const controller = createController();

    setStatus("loading");
    setError("");
    setForecastError("");
    setWeather(null);
    setForecast([]);

    try {
      const results = await Promise.allSettled([
        getWeather(city, controller.signal),
        getForecast(city, controller.signal),
      ]);

      const weatherResult = results[0];
      const forecastResult = results[1];

      if (weatherResult.status === "rejected") {
        throw weatherResult.reason;
      }

      setWeather(weatherResult.value);
      setStatus("success");

      if (forecastResult.status === "fulfilled") {
        setForecast(forecastResult.value);
      } else {
        setForecast([]);
        setForecastError("Forecast is currently unavailable.");
      }

      return true;
    } catch (error) {
      if (error?.name === "AbortError") {
        return false;
      }

      setWeather(null);
      setForecast([]);
      setError(error?.message || "Unable to load weather data.");
      setStatus("error");
      return false;
    } finally {
      if (!controller.signal.aborted) {
        controllerRef.current = null;
      }
    }
  }

  async function searchByLocation(latitude, longitude) {
    const controller = createController();

    setStatus("loading");
    setError("");
    setForecastError("");
    setWeather(null);
    setForecast([]);

    try {
      const weatherData = await getWeatherByLocation(
        latitude,
        longitude,
        controller.signal,
      );

      setWeather(weatherData);
      setStatus("success");

      try {
        const forecastData = await getForecast(
          weatherData.city,
          controller.signal,
        );

        setForecast(forecastData);
      } catch (forecastError) {
        if (forecastError?.name === "AbortError") {
          return false;
        }

        setForecast([]);
        setForecastError("Forecast is currently unavailable.");
      }

      return true;
    } catch (error) {
      if (error?.name === "AbortError") {
        return false;
      }

      setWeather(null);
      setForecast([]);
      setError(error?.message || "Unable to load weather data.");
      setStatus("error");
      return false;
    } finally {
      if (!controller.signal.aborted) {
        controllerRef.current = null;
      }
    }
  }

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  return {
    weather,
    forecast,
    status,
    error,
    forecastError,
    searchWeather,
    searchByLocation,
  };
}

export default useWeather;
