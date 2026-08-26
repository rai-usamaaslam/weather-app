import { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  function handleSearch() {
    if (city.trim() === "") {
      return;
    }

    onSearch(city.trim());
    setCity("");
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSearch();
          }
        }}
      />

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;