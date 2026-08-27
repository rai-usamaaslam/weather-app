function LocationButton({ onLocation, disabled }) {
  function handleLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        onLocation(latitude, longitude);
      },
      () => {
        alert("Unable to get your location.");
      },
    );
  }

  return (
    <button
      className="location-button"
      onClick={handleLocation}
      disabled={disabled}
    >
      📍 Use My Location
    </button>
  );
}

export default LocationButton;
