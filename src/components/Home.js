import React, { useState, useEffect } from "react";

function Home() {

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    const getDateAndTime = () => {
      const date = new Date();
      const time = date.toLocaleTimeString();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const dateString = date.toLocaleDateString(undefined, options);
      setTime(time);
      setDate(dateString);

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeather(data.weather[0].description);
        })
        .catch((error) => {
          console.error("Error fetching weather data: ", error);
        });
    };

    getDateAndTime();
    setInterval(getDateAndTime, 1000);
  }, []);

  return (
    <div className="Home">
      <div className="recent">
        <h1>{time}</h1>
        <h2>{date}</h2>
        <p>{weather}</p>
      </div>
    </div>
  );
}

export default Home;
