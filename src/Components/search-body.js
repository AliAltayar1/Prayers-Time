import { useState, useEffect } from "react";
import Search from "./search";
import Body from "./body";

export default function Content() {
  // Create Array Contains Country Names
  const islamicCountries = [
    "Afghanistan",
    "Algeria",
    "Bahrain",
    "Bangladesh",
    "Comoros",
    "Djibouti",
    "Egypt",
    "Indonesia",
    "Iran",
    "Iraq",
    "Jordan",
    "Kuwait",
    "Lebanon",
    "Libya",
    "Malaysia",
    "Mauritania",
    "Morocco",
    "Nigeria",
    "Oman",
    "Pakistan",
    "Palestine",
    "Qatar",
    "Saudi Arabia",
    "Somalia",
    "Sudan",
    "Syria",
    "Tunisia",
    "Turkey",
    "United Arab Emirates",
    "Yemen",
  ];

  // Create Object Contains Arays Of Cities Name
  const islamicCountryCities = {
    Afghanistan: ["Kabul", "Kandahar", "Herat", "Mazar-i-Sharif", "Jalalabad"],
    Algeria: ["Algiers", "Oran", "Constantine", "Batna", "Setif"],
    Bahrain: ["Manama", "Riffa", "Muharraq", "Hamad Town", "Isa Town"],
    Bangladesh: ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Barisal"],
    Comoros: ["Moroni", "Mutsamudu", "Fomboni", "Domoni", "Sima"],
    Djibouti: ["Djibouti City", "Ali Sabieh", "Tadjourah", "Obock", "Dikhil"],
    Egypt: [
      "Cairo",
      "Alexandria",
      "Giza",
      "Shubra El-Kheima",
      "Port Said",
      "Suez",
      "Luxor",
      "Asyut",
      "Ismailia",
      "Mansoura",
    ],
    Indonesia: ["Jakarta", "Surabaya", "Bandung", "Medan", "Semarang"],
    Iran: ["Tehran", "Mashhad", "Isfahan", "Karaj", "Tabriz"],
    Iraq: [
      "Baghdad",
      "Basra",
      "Mosul",
      "Erbil",
      "Kirkuk",
      "Najaf",
      "Karbala",
      "Hilla",
      "Diyala",
      "Sulaymaniyah",
      "Tikrit",
      "Fallujah",
      "Ramadi",
      "Nasiriyah",
      "Amara",
    ],
    Jordan: [
      "Amman",
      "Zarqa",
      "Irbid",
      "Aqaba",
      "Madaba",
      "Salt",
      "Mafraq",
      "Jerash",
      "Karak",
      "Tafilah",
    ],
    Kuwait: ["Kuwait City", "Hawalli", "Farwaniya", "Fahaheel", "Salmiya"],
    Lebanon: [
      "Beirut",
      "Tripoli",
      "Sidon",
      "Tyre (Sour)",
      "Byblos (Jbeil)",
      "Baabda",
      "Jounieh",
      "Zahle",
      "Nabatieh",
      "Baalbek",
    ],
    Libya: ["Tripoli", "Benghazi", "Misrata", "Tobruk", "Sabha"],
    Malaysia: [
      "Kuala Lumpur",
      "Penang",
      "Johor Bahru",
      "Kota Kinabalu",
      "Kuching",
    ],
    Mauritania: ["Nouakchott", "Nouadhibou", "Néma", "Kaédi", "Rosso"],
    Morocco: ["Casablanca", "Rabat", "Fes", "Marrakech", "Tangier"],
    Nigeria: ["Lagos", "Kano", "Ibadan", "Abuja", "Kaduna"],
    Oman: ["Muscat", "Salalah", "Sohar", "Nizwa", "Sur"],
    Pakistan: ["Karachi", "Lahore", "Islamabad", "Faisalabad", "Rawalpindi"],
    Palestine: [
      "Al Quds",
      "Ramallah",
      "Bethlehem",
      "Al-Khalil",
      "Nablus",
      "Aryha",
      "Jenin",
      "Tulkarm",
      "Gaza",
      "Alramla",
      "Rafah",
      "Yafa",
      "Khan Yunis",
      "Bisan",
      "Bir Alsabe",
      "Hayfa",
      "Fallujah",
    ],
    Qatar: ["Doha", "Al Rayyan", "Umm Salal", "Al Khor", "Al Wakrah"],
    "Saudi Arabia": [
      "Riyadh",
      "Jeddah",
      "Mecca",
      "Medina",
      "Dammam",
      "Khobar",
      "Abha",
      "Tabuk",
      "Hail",
      "Taif",
    ],
    Somalia: ["Mogadishu", "Hargeisa", "Bosaso", "Galkayo", "Garowe"],
    Sudan: ["Khartoum", "Omdurman", "Port Sudan", "Kassala", "Al-Ubayyid"],
    Syria: [
      "Damascus",
      "Aleppo",
      "Homs",
      "Hama",
      "Latakia",
      "Tartus",
      "Raqqa",
      "Deir ez-Zor",
      "Daraa",
      "Idlib",
    ],
    Tunisia: ["Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte"],
    Turkey: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"],
    "United Arab Emirates": [
      "Abu Dhabi",
      "Dubai",
      "Sharjah",
      "Ajman",
      "Umm Al-Quwain",
      "Ras Al Khaimah",
      "Fujairah",
      "Al Ain",
    ],
    Yemen: ["Sanaa", "Aden", "Taiz", "Hodeidah", "Ibb"],
  };

  const [countries, setCountries] = useState(islamicCountries);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  // Fill The Cities After Selecting A Country
  useEffect(() => {
    if (selectedCountry) {
      setCities(islamicCountryCities[selectedCountry]);
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

// Code To Fetch Country And Cities Name Form geonames API
// useEffect(() => {
//   axios
//     .get(`http://api.geonames.org/countryInfoJSON?username=${userName}`)
//     .then((response) => setCountries(response.data.geonames))
//     .catch((error) => console.log("Error fetching countries:", error));

//   // Reset Cities When A NEw Country Is Selected
//   setCities([]);
// }, []);

// useEffect(() => {
//   if (selectedCountry) {
//     {
//       // Get Country Code To Fetch The City
//       const countryCode = countries.find(
//         (country) => country.countryName === selectedCountry
//       )?.countryCode;

//       if (countryCode) {
//         axios
//           .get(
//             `http://api.geonames.org/searchJSON?country=${countryCode}&maxRows=10&username=${userName}`
//           )
//           .then((response) => setCities(response.data.geonames))
//           .catch((error) => console.error("Error fetching cities:", error));
//       }
//     }
//   }
// }, [selectedCountry]);
