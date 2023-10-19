import "../../App.css";

export default function CurrentTime() {
  const time = new Date();
  return (
    <div className="current-time">
      <span>{time.toLocaleTimeString()}</span>
      <p className="location">Time Now In Your Country</p>
    </div>
  );
}
