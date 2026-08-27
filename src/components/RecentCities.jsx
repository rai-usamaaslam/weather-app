function RecentCities({ cities, onSelect }) {
  if (cities.length === 0) {
    return null;
  }

  return (
    <div className="recent-cities">
      <h3>Recent Cities</h3>

      <div className="recent-list">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => onSelect(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecentCities;