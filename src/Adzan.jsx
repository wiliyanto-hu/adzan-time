import { useEffect, useState } from "react";
import fetchData from "../utils/fetch";
import AdzanTime from "./AdzanTime";

const baseAPI = "https://api.myquran.com/v2";
const batamID = "0506";
const cityAPI = "/sholat/kota/cari/:keyword";
const time = new Date();
const currentDate = time.getDate();
const currentMonth = time.getMonth() + 1;
const currentYear = time.getFullYear();

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

const getTodayPrayerTime = async (cityId = batamID) => {
  const sholatAPI = `/sholat/jadwal/${cityId}/${currentYear}-${currentMonth}-${currentDate}`;

  const requestUrl = `${baseAPI}/${sholatAPI}`;

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
  const [prayerData, setPrayerData] = useState([]);
  const fetchPrayerData = async () => {
    const response = await getTodayPrayerTime();
    // setPrayerData(response.data);
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

    setPrayerData(filteredData);
  };

  useEffect(() => {
    fetchPrayerData();
  }, []);

  return (
    <>
      {prayerData.map((prayer, idx) => (
        <AdzanTime
          key={idx}
          prayerName={prayer.prayerName}
          time={prayer.prayerTime}
        />
      ))}
    </>
  );
}
