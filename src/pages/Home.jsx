import SearchBar from "../components/SearchBar";

function Home() {
  function handleSearch(city) {
    console.log("Searching:", city);
  }

  return (
    <div>
      <h1>Weather App</h1>

      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default Home;
