import { useEffect, useRef, useState } from "react";
import { getForecast } from "../services/weatherService";

function useForecast() {
  const [forecast, setForecast] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const controllerRef = useRef(null);

  async function searchForecast(city) {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();

    controllerRef.current = controller;

    setStatus("loading");
    setError("");

    try {
      const data = await getForecast(
        city,
        controller.signal
      );

      setForecast(data);
      setStatus("success");
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }

      setForecast([]);
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
    forecast,
    status,
    error,
    searchForecast,
  };
}

export default useForecast;