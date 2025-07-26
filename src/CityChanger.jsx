import Select from "react-select";
import "./CityChanger.css";
export default function CityChanger({
  cities,
  handleCityChange,
  handleSelectCity,
}) {
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
        onClick={(e) => {
          handleCityChange(e);
        }}
      >
        Change City
      </button>
    </div>
  );
}
