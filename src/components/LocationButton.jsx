import { useState } from "react";

function LocationButton({ onLocation, disabled }) {
  const [locationError, setLocationError] = useState("");

  function handleLocation() {
    if (!navigator.geolocation) {
      setLocationError(
        "Geolocation is not supported by your browser."
      );
      return;
    }

    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        onLocation(latitude, longitude);
      },

      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError(
              "Location permission was denied. Please allow location access."
            );
            break;

          case error.POSITION_UNAVAILABLE:
            setLocationError(
              "Your location could not be determined."
            );
            break;

          case error.TIMEOUT:
            setLocationError(
              "Location request timed out. Please try again."
            );
            break;

          default:
            setLocationError(
              "Unable to get your location."
            );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }

  return (
    <div>
      <button
        className="location-button"
        onClick={handleLocation}
        disabled={disabled}
      >
        📍 {disabled ? "Getting Weather..." : "Use My Location"}
      </button>

      {locationError && (
        <p className="error">
          {locationError}
        </p>
      )}
    </div>
  );
}

export default LocationButton;