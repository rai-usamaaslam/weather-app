function useWeather() {
  return {
    weather: null,
    forecast: [],
    status: "idle",
    error: "",
    forecastError: "",
    searchWeather: async () => {},
    searchByLocation: async () => {},
  };
}

export default useWeather;