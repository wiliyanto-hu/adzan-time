import { capitalize } from "../utils/string";
import "./AdzanTime.css";

export default function AdzanTime({ time, prayerName }) {
  return (
    <div className="Time">
      <span className="timeText">{capitalize(prayerName)}</span>
      <span className="timeText">{time}</span>
    </div>
  );
}
