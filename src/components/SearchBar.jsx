import { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  function handleSearch() {
    if (city.trim() === "") {
      return;
    }

    onSearch(city);
    setCity("");
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;