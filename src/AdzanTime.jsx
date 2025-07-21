const timeStyle = {
  display: "flex",
  justifyContent: "space-around",
  background: "rgba(0,0,0,0.5)",
  borderRadius: "10px",
  padding: "0.3rem",
};

export default function AdzanTime({ time, prayerName }) {
  return (
    <div className="time" style={timeStyle}>
      <span>{prayerName}</span>
      <span>{time}</span>
    </div>
  );
}
