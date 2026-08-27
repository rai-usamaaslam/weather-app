import { useEffect, useRef, useState } from "react";

import {
  getWeather,
  getWeatherByLocation,
} from "../services/weatherService";

function useWeather() {
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

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

    try {
      const data = await getWeather(
        city,
        controller.signal
      );

      setWeather(data);
      setStatus("success");
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }

      setWeather(null);
      setError(error.message);
      setStatus("error");
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

    try {
      const data = await getWeatherByLocation(
        latitude,
        longitude,
        controller.signal
      );

      setWeather(data);
      setStatus("success");
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }

      setWeather(null);
      setError(error.message);
      setStatus("error");
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
    status,
    error,
    searchWeather,
    searchByLocation,
  };
}

export default useWeather;