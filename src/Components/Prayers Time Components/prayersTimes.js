import "../../App.css";

export default function PrayerTime({ hours, minutes, prayerName, src }) {
  return (
    <div className="prayer-time">
      <span className="time">
        <span className="hours">{hours}</span>
        <span className="minutes">:{minutes}</span>
      </span>
      <img
        className="icon"
        src={src}
        width="45"
        height="45"
        alt={prayerName + " Icon"}
      ></img>
      <span className="name">{prayerName}</span>
    </div>
  );
}
