const initialState = {
  weather: null,
  forecast: [],
  status: "idle",
  error: "",
  forecastError: "",
};

function weatherReducer(state, action) {
  switch (action.type) {
    case "SEARCH_START":
      return {
        ...state,
        weather: null,
        forecast: [],
        status: "loading",
        error: "",
        forecastError: "",
      };

    case "SEARCH_SUCCESS":
      return {
        ...state,
        weather: action.payload.weather,
        forecast: action.payload.forecast,
        status: "success",
        error: "",
        forecastError: "",
      };

    case "SEARCH_ERROR":
      return {
        ...state,
        weather: null,
        forecast: [],
        status: "error",
        error: action.payload,
        forecastError: "",
      };

    case "FORECAST_ERROR":
      return {
        ...state,
        forecast: [],
        forecastError: action.payload,
      };

    default:
      return state;
  }
}

export {
  initialState,
  weatherReducer,
};