import { capitalize } from "../utils/string";

const timeStyle = {
  display: "flex",
  justifyContent: "space-around",
  background: "rgba(0,0,0,0.3)",
  borderRadius: "10px",
  padding: "0.3rem",
};

const timeText = {
  color: "white",
  fontSize: "1.1rem",
};

export default function AdzanTime({ time, prayerName }) {
  return (
    <div className="time" style={timeStyle}>
      <span style={timeText}>{capitalize(prayerName)}</span>
      <span style={timeText}>{time}</span>
    </div>
  );
}
