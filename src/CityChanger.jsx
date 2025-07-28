import Select from "react-select";
import "./CityChanger.css";
import { useState } from "react";
export default function CityChanger({ cities, handleCityChange }) {
  const [formCityId, setFormCityId] = useState("");

  const handleSelectCity = (city) => {
    setFormCityId(city.value);
  };
  return (
    <div className="CityChanger">
      <Select
        options={cities}
        styles={{
          option: (baseStyles) => ({
            ...baseStyles,
            color: "black",
          }),
        }}
        onChange={handleSelectCity}
      />
      <button
        onClick={() => {
          handleCityChange(formCityId);
        }}
      >
        Change City
      </button>
    </div>
  );
}
