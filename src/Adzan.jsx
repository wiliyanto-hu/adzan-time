import { useEffect, useState } from "react";
import Select from "react-select";

import fetchData from "../utils/fetch";
import AdzanTime from "./AdzanTime";
import "./Adzan.css";
import Clock from "./Clock";
import { addLeadingZero } from "../utils/string";

const baseAPI = "https://api.myquran.com/v2";
const batamID = "0506";
const cityAPI = "/sholat/kota/cari/:keyword";
const time = new Date();
const currentDate = time.getDate();
const currentMonth = time.getMonth() + 1;
const currentYear = time.getFullYear();
const currentDay = time.getDay();
const weekdays = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

const getCityId = async (cityName) => {
  if (!cityName) return null;

  const requestUrl = `${baseAPI}/${cityAPI}/${cityName}`;

  const response = await fetch(requestUrl);
  const result = response.json();
  if (!result.status) return null;
  return result.data[0].id;

  /** EXAMPLE
 * 
 * 
 * {
  "status": true,
  "request": {
    "path": "/sholat/kota/cari/batam",
    "keyword": "batam"
  },
  "data": [
    {
      "id": "0506",
      "lokasi": "KOTA BATAM"
    }
  ]
}
 */
};

const getTodayPrayerTime = async (cityId) => {
  const sholatAPI = `/sholat/jadwal/${cityId}/${currentYear}-${currentMonth}-${currentDate}`;

  const requestUrl = `${baseAPI}/${sholatAPI}`;

  return await fetchData(requestUrl);
};

const getCities = async () => {
  const cityAPI = "/sholat/kota/semua";
  const requestUrl = `${baseAPI}/${cityAPI}`;

  return await fetchData(requestUrl);
};

export default function Adzan() {
  const prayerNames = new Set([
    "imsak",
    "subuh",
    "terbit",
    "dhuha",
    "dzuhur",
    "ashar",
    "maghrib",
    "isya",
  ]);
  const [prayerData, setPrayerData] = useState({
    dayAndDate: `${weekdays[currentDay]}, ${currentDate}/${addLeadingZero(
      currentMonth
    )}/${currentYear}`,
    schedule: [],
    city: "KOTA JAKARTA",
  });
  const [cities, setCities] = useState([{}]);
  const [error, setError] = useState(false);
  const [cityId, setCityId] = useState(batamID);

  const fetchPrayerData = async () => {
    const response = await getTodayPrayerTime(cityId);
    if (!response.status) {
      setError(true);
      return;
    }
    const result = response.data;
    const filteredData = [];
    Object.keys(result.jadwal).forEach((prayerName) => {
      if (prayerNames.has(prayerName)) {
        filteredData.push({
          prayerName,
          prayerTime: result.jadwal[prayerName],
        });
      }
    });
    setPrayerData({
      city: result.lokasi,
      schedule: filteredData,
      dayAndDate: result.jadwal.tanggal,
    });
    setError(false);
  };

  const fetchCitiesData = async () => {
    const response = await getCities();
    if (!response.status) {
      setError(true);
      return;
    }
    const result = response.data;
    const cities = result.map((resData) => ({
      value: resData.id,
      label: resData.lokasi,
    }));
    setCities(cities);
  };

  const handleCityChange = (city) => {
    setCityId(city.value);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    await fetchPrayerData();
  };

  useEffect(() => {
    fetchPrayerData();
    fetchCitiesData();
  }, []);

  return (
    <>
      <div className="AdzanHeader">
        <h2>{prayerData.city}</h2>
        <h2>{prayerData.dayAndDate}</h2>
        <Clock />
      </div>
      <Select
        options={cities}
        styles={{
          option: (baseStyles) => ({
            ...baseStyles,
            color: "black",
          }),
        }}
        onChange={handleCityChange}
      />
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Change City
      </button>
      <div className="PrayerTimeContainer">
        {error ? (
          <h2>Gagal mengambil data </h2>
        ) : (
          prayerData.schedule.map((prayer, idx) => (
            <AdzanTime
              key={idx}
              prayerName={prayer.prayerName}
              time={prayer.prayerTime}
            />
          ))
        )}
      </div>
    </>
  );
}
