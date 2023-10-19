import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./search";
import Body from "./body";

export default function Content() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const userName = "alialtayar";
  useEffect(() => {
    axios
      .get(`http://api.geonames.org/countryInfoJSON?username=${userName}`)
      .then((response) => setCountries(response.data.geonames))
      .catch((error) => console.log("Error fetching countries:", error));

    // Reset Cities When A NEw Country Is Selected
    setCities([]);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      {
        // Get Country Code To Fetch The City
        const countryCode = countries.find(
          (country) => country.countryName === selectedCountry
        )?.countryCode;

        if (countryCode) {
          axios
            .get(
              `http://api.geonames.org/searchJSON?country=${countryCode}&maxRows=10&username=${userName}`
            )
            .then((response) => setCities(response.data.geonames))
            .catch((error) => console.error("Error fetching cities:", error));
        }
      }
    }
  }, [selectedCountry]);

  function handleCountryChange(e) {
    setSelectedCountry(e.target.value);

    // Clear The City State
    setSelectedCity(" ");
  }
  function handleCityChange(e) {
    setSelectedCity(e.target.value);
  }

  return (
    <>
      <Search
        countries={countries}
        cities={cities}
        onChangeCountry={handleCountryChange}
        onChangeCity={handleCityChange}
      />
      <Body
        selectedCountry={
          selectedCountry ? selectedCountry : "United Arab Emirates"
        }
        selectedCity={selectedCity ? selectedCity : "Al Ain"}
      />
    </>
  );
}
