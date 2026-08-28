import {
  WeatherProvider as WeatherContextProvider,
} from "../../features/weather/context/WeatherContext";

function WeatherProvider({ children }) {
  return (
    <WeatherContextProvider>
      {children}
    </WeatherContextProvider>
  );
}

export default WeatherProvider;