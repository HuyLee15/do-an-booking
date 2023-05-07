import { compact } from "lodash";
import { useMemo } from "react";
import { City, State } from "country-state-city";
import countries from "world-countries";

const formattedCities = City.getAllCities().map((city) => {
  const country = countries.find((country) => country.cca2 === city.countryCode);
  const state = State.getStatesOfCountry(country?.cca2).find((state) => state.isoCode === city.stateCode);

  if (!country) {
    return null;
  }

  return {
    label: `${city.name}, ${state?.name} ,${country.name.common}`,
    value: `${country.name.common}-${state?.name}-${city.name}`,
    flag: country.flag,
    latlng: [+city.latitude, +city.longitude],
    region: country.region,
  };
});

const useCountries = () => {
  const cities = useMemo(() => compact(formattedCities), []);
  const getAll = () => cities;

  const getByValue = (value: string) => {
    return cities.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
