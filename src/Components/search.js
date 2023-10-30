import "../App.css";

export default function Search({
  countries,
  cities,
  onChangeCountry,
  onChangeCity,
}) {
  return (
    <div className="container">
      <div className="search">
        <h1>Prayers Time</h1>
        <div className="search-by-name">
          <div className="search-by-country">
            <label htmlFor="countrySelect">Select a Country: </label>
            <select id="countrySelect" onChange={onChangeCountry}>
              <option value="">Select a country</option>
              {/* Mapping On All Countries Name And Make Selection Of their Names */}
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="search-by-city">
            <label htmlFor="citySelect">Select a City: </label>
            <select id="citySelect" onChange={onChangeCity}>
              <option value="">Select a city</option>
              {/* Mapping On All Cities Name And Make Selection Of their Names */}
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
