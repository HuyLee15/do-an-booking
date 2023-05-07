"use client";

import Select from "react-select";

import useCountries from "@/app/hooks/useCountries";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import axios from "axios";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();
  const [inputValue, setInputValue] = useState("");

  const countries = useMemo(() => getAll(), [getAll]);
  const options = useMemo(
    () => countries.filter((option) => option.label.toLowerCase().trim().includes(inputValue)),
    [countries, inputValue]
  );

  const handleSetInputValue = (newValue: string) => setInputValue(newValue);

  return (
    <div>
      <Select
        inputValue={inputValue}
        onInputChange={handleSetInputValue}
        placeholder="Anywhere"
        isClearable
        options={options.slice(0, 100)}
        maxMenuHeight={400}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div
            className="
          flex flex-row items-center gap-3"
          >
            <div>{option.flag}</div>
            <div>
              {option.label},<span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
