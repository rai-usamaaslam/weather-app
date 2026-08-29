function RecentCities({ cities, onSelect, onClear }) {
  if (cities.length === 0) {
    return null;
  }

  return (
    <div className="recent-cities">
      <div className="recent-header">
        <h3>Recent Cities</h3>

        {onClear && (
          <button className="clear-history" onClick={onClear} type="button">
            Clear
          </button>
        )}
      </div>

      <div className="recent-list">
        {cities.map((city) => (
          <button key={city} onClick={() => onSelect(city)} type="button">
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecentCities;
