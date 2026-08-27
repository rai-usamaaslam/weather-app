import { useState } from "react";

function SearchBar({ onSearch, disabled }) {
  const [city, setCity] = useState("");
  const [inputError, setInputError] = useState("");

  function handleSearch() {
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setInputError("Please enter a city name");
      return;
    }

    setInputError("");
    onSearch(trimmedCity);
    setCity("");
  }

  function handleChange(event) {
    setCity(event.target.value);

    if (inputError) {
      setInputError("");
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />

        <button
          onClick={handleSearch}
          disabled={disabled}
        >
          {disabled ? "Searching..." : "Search"}
        </button>
      </div>

      {inputError && (
        <p className="error">{inputError}</p>
      )}
    </div>
  );
}

export default SearchBar;