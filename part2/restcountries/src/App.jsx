import axios from "axios";
import { useEffect, useState } from "react";

const CountryDetail = ({ country }) => {
  return (
    <div className="countryDetail" key={country.name.common}>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <p>Languages</p>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

const fetchAllCountries = () => {
  const countries = axios.get(
    "https://studies.cs.helsinki.fi/restcountries/api/all",
  );
  return countries.then((response) => response.data);
};

const App = () => {
  const [countryList, setCountryList] = useState(null);
  const [searchCountry, setSearchCountry] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetchAllCountries().then((countries) => {
      setCountryList(countries);
    });
  }, []);

  if (!countryList) return <p>Loading...</p>;
  return (
    <div>
      <p>
        Find Countries
        <input
          value={searchCountry}
          onChange={(e) => {
            setSearchCountry(e.target.value);
            setFilteredCountries(
              countryList
                .map((c) => c.name.common)
                .filter((c) =>
                  c.toLowerCase().includes(searchCountry.toLowerCase()),
                ),
            );
          }}
        />
      </p>
      {filteredCountries.length > 10 && <p>Too many results, specify query</p>}
      {filteredCountries.length < 1 && <p>No results</p>}
      {filteredCountries.length >= 2 && filteredCountries.length <= 10 && (
        <div className="filteredCountries">
          {filteredCountries.map((cName) => {
            return (
              <p key={cName}>
                {cName}{" "}
                <button
                  onClick={() => {
                    setSearchCountry(cName);
                    setFilteredCountries([cName]);
                  }}
                >
                  Show
                </button>
              </p>
            );
          })}
        </div>
      )}
      {filteredCountries.length === 1 &&
        countryList
          .filter((c) => {
            return (
              c.name.common.toLowerCase() === filteredCountries[0].toLowerCase()
            );
          })
          .map((c) => {
            return <CountryDetail country={c} />;
          })}
    </div>
  );
};

export default App;
