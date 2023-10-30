import { useEffect, useState } from "react";
import TimeLeft from "./Prayers Time Components/timeLeft";
import PrayerTime from "./Prayers Time Components/prayersTimes";
import CurrentTime from "./Prayers Time Components/currentTime";
import "../App.css";
import axios from "axios";

export default function Body({ selectedCountry, selectedCity }) {
  const Date1 = new Date();
  const timeNow = `${Date1.getHours()}:${Date1.getMinutes()}:${Date1.getSeconds()}`;
  const timeNowInMilli = timeStringToMilliseconds(timeNow);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentMonth = Date1.getMonth() + 1;
  const currentYear = Date1.getFullYear();
  const currentDay = Date1.getDate();
  const currentDayeOfWeek = daysOfWeek[Date1.getDay()];
  const currentDate = `${currentMonth}/${currentDay}/${currentYear}`;

  const [prayerTimes, setPrayerTimes] = useState({
    fajr: "",
    sunrise: "",
    dhuhr: "",
    asr: "",
    maghrib: "",
    isha: "",
  });

  useEffect(() => {
    async function fetchPrayerTime() {
      const response = await axios.get(
        ` https://api.aladhan.com/v1/calendarByCity/${currentYear}/${currentMonth}?city=${selectedCity}&country=${selectedCountry}`
      );
      // Store The Data in data var
      const data = response.data.data;
      for (let i = 0; i < response.data.data.length; i++) {
        // Looping on all data days to found the correct day and fill the prayer time information
        if (
          Date1.getDate() === parseInt(response.data.data[i].date.gregorian.day)
        ) {
          const apiPrayerTimes = {
            fajr: response.data.data[i].timings.Fajr.slice(0, 5),
            sunrise: response.data.data[i].timings.Sunrise.slice(0, 5),
            dhuhr: response.data.data[i].timings.Dhuhr.slice(0, 5),
            asr: response.data.data[i].timings.Asr.slice(0, 5),
            maghrib: response.data.data[i].timings.Maghrib.slice(0, 5),
            isha: response.data.data[i].timings.Isha.slice(0, 5),
          };

          // set the object for my state
          setPrayerTimes(apiPrayerTimes);

          break;
        }
      }
    }
    fetchPrayerTime();
  }, [selectedCity]);

  // Create Prayer Time In MilliSconds
  const prayerTimesInMilli = {
    fajrInMilli: timeStringToMilliseconds(prayerTimes.fajr),
    sunriseInMilli: timeStringToMilliseconds(prayerTimes.sunrise),
    dhuhrInMilli: timeStringToMilliseconds(prayerTimes.dhuhr),
    asrInMilli: timeStringToMilliseconds(prayerTimes.asr),
    maghribInMilli: timeStringToMilliseconds(prayerTimes.maghrib),
    ishaInMilli: timeStringToMilliseconds(prayerTimes.isha),
  };

  // Create State To Hold The Time Lift In Milliseonds
  const [timeLeft, setTimeLeft] = useState({});

  // Create Variable To Calculate Fajr Time If The Time Before Mid Night By Adding 24 Hours
  const fajrTimeBeforeMidNight = `${
    +prayerTimes.fajr.slice(0, 2) + 24
  }:${prayerTimes.fajr.slice(3, 5)}`;

  // Convert The Fajr Time To Millisconds
  const fajrTimeBeforeMidInMill = timeStringToMilliseconds(
    fajrTimeBeforeMidNight
  );

  useEffect(() => {
    // Function To Calculate The Time LEft Every One Second
    const calculateTimeLeft = () => {
      const timeNowInMilli = timeStringToMilliseconds(timeNow);
      const newTimeLeft = {};

      for (const prayer in prayerTimesInMilli) {
        if (prayerTimesInMilli.hasOwnProperty(prayer)) {
          // Check The Time Now If Before Mid Or After And Calc The Fajr Time Left Depend On The Condition
          if (prayer == "fajrInMilli") {
            if (+timeNow.slice(0, 2) < 24) {
              newTimeLeft[prayer] = fajrTimeBeforeMidInMill - timeNowInMilli;
            } else {
              newTimeLeft[prayer] = prayerTimesInMilli[prayer] - timeNowInMilli;
            }
          } else {
            newTimeLeft[prayer] = prayerTimesInMilli[prayer] - timeNowInMilli;
          }
        }
      }
      setTimeLeft(newTimeLeft);
    };
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  let nextPrayerTimeProp;
  let nextPrayerNameProp;

  // Search About The Next Prayer Name And Time
  if (
    timeNowInMilli > prayerTimesInMilli.fajrInMilli &&
    timeNowInMilli < prayerTimesInMilli.sunriseInMilli
  ) {
    nextPrayerTimeProp = timeLeft.sunriseInMilli;
    nextPrayerNameProp = "Al Shurooq";
  } else if (
    timeNowInMilli > prayerTimesInMilli.sunriseInMilli &&
    timeNowInMilli < prayerTimesInMilli.dhuhrInMilli
  ) {
    nextPrayerTimeProp = timeLeft.dhuhrInMilli;
    nextPrayerNameProp = "Al Dhuhr";
  } else if (
    timeNowInMilli > prayerTimesInMilli.dhuhrInMilli &&
    timeNowInMilli < prayerTimesInMilli.asrInMilli
  ) {
    nextPrayerTimeProp = timeLeft.asrInMilli;
    nextPrayerNameProp = "Al Asr";
  } else if (
    timeNowInMilli > prayerTimesInMilli.asrInMilli &&
    timeNowInMilli < prayerTimesInMilli.maghribInMilli
  ) {
    nextPrayerTimeProp = timeLeft.maghribInMilli;
    nextPrayerNameProp = "Al Maghrib";
  } else if (
    timeNowInMilli > prayerTimesInMilli.maghribInMilli &&
    timeNowInMilli < prayerTimesInMilli.ishaInMilli
  ) {
    nextPrayerTimeProp = timeLeft.ishaInMilli;
    nextPrayerNameProp = "Al Isha";
  } else {
    nextPrayerTimeProp = timeLeft.fajrInMilli;
    nextPrayerNameProp = "Al Fajr";
  }

  const dhuhrPeriod = prayerTimes.dhuhr.slice(0, 2) >= 12 ? "PM" : "AM";

  return (
    <div className="container">
      <div className="body">
        <h2>
          Prayer Time In {selectedCountry}, {selectedCity}
        </h2>
        <span>
          {currentDayeOfWeek}, {currentDate}
        </span>
        <TimeLeft
          nextPrayer={nextPrayerNameProp}
          timeLeft={nextPrayerTimeProp ? nextPrayerTimeProp : "000"}
        />
        <CurrentTime />
        <div className="prayers-container">
          <PrayerTime
            hours={prayerTimes.fajr ? prayerTimes.fajr.slice(0, 2) : "00"}
            minutes={
              prayerTimes.fajr ? prayerTimes.fajr.slice(3, 5) + " AM" : "00 AM"
            }
            prayerName={"Al Fajr"}
            src="//timesprayer.com/images/fajr.svg"
          />
          <PrayerTime
            hours={prayerTimes.sunrise ? prayerTimes.sunrise.slice(0, 2) : "00"}
            minutes={
              prayerTimes.sunrise
                ? prayerTimes.sunrise.slice(3, 5) + " AM"
                : "00 AM"
            }
            prayerName={"Al Shurooq"}
            src="//timesprayer.com/images/sunrise.svg"
          />
          <PrayerTime
            hours={
              prayerTimes.dhuhr
                ? prayerTimes.dhuhr.slice(0, 2) % 12 == "00"
                  ? prayerTimes.dhuhr.slice(0, 2)
                  : prayerTimes.dhuhr.slice(0, 2) % 12
                : "00"
            }
            minutes={
              prayerTimes.dhuhr
                ? prayerTimes.dhuhr.slice(3, 5) + " " + dhuhrPeriod
                : "00 " + dhuhrPeriod
            }
            prayerName={"Al Dhuhr"}
            src="//timesprayer.com/images/dhuhr.svg"
          />
          <PrayerTime
            hours={prayerTimes.asr ? +prayerTimes.asr.slice(0, 2) % 12 : "00"}
            minutes={
              prayerTimes.asr ? prayerTimes.asr.slice(3, 5) + " PM" : "00 PM"
            }
            prayerName={"Al Asr"}
            src="//timesprayer.com/images/asr.svg"
          />
          <PrayerTime
            hours={
              prayerTimes.maghrib ? +prayerTimes.maghrib.slice(0, 2) % 12 : "00"
            }
            minutes={
              prayerTimes.maghrib
                ? prayerTimes.maghrib.slice(3, 5) + " PM"
                : "00 PM"
            }
            prayerName={"Al Maghrib"}
            src="//timesprayer.com/images/maghrib.svg"
          />
          <PrayerTime
            hours={prayerTimes.isha ? +prayerTimes.isha.slice(0, 2) % 12 : "00"}
            minutes={
              prayerTimes.isha ? prayerTimes.isha.slice(3, 5) + " PM" : "00 PM"
            }
            prayerName={"Al Isha"}
            src="//timesprayer.com/images/isha.svg"
          />
        </div>
      </div>
    </div>
  );
}

// Create Function To Convert The String Of Time To Millisecond
function timeStringToMilliseconds(timeString) {
  // Split the time string into hours and minutes
  const [hoursStr = "00", minutesStr = "00", secondsStr = "00"] =
    timeString.split(":");

  // Parse hours and minutes as integers
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  const seconds = parseInt(secondsStr, 10);

  // Calculate the total milliseconds
  const totalMilliseconds =
    hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;

  return totalMilliseconds;
}
