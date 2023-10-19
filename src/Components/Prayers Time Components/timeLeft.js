import { useEffect, useState } from "react";
import "../../App.css";

export default function TimeLeft({ nextPrayer, timeLeft }) {
  const totalSeconds = Math.floor(timeLeft / 1000);
  const hours =
    Math.floor(totalSeconds / 3600) > 10
      ? Math.floor(totalSeconds / 3600)
      : "0" + Math.floor(totalSeconds / 3600);
  const minutes =
    Math.floor((totalSeconds % 3600) / 60) > 10
      ? Math.floor((totalSeconds % 3600) / 60)
      : "0" + Math.floor((totalSeconds % 3600) / 60);
  const seconds =
    totalSeconds % 60 > 10 ? totalSeconds % 60 : "0" + (totalSeconds % 60);

  return (
    <div className="time-left-container">
      <span className="prayer-name">{nextPrayer}</span>
      <div className="time-left">
        <span>{hours}:</span>
        <span>{minutes}:</span>
        <span>{seconds}</span>
      </div>
      <p>Time Left For {nextPrayer}</p>
    </div>
  );
}
