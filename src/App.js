import './App.css';
import React, { useState, useEffect } from 'react';
import Home from "./components/Home.js";
import Health from "./components/Health.js";
import Settings from "./components/Settings.js";
import Activities from "./components/Activities.js";

function App() {
  const [icon, setIcon] = useState(null);

  function updateIcon(weather) {
    switch (weather) {
      case "Thunderstorm":
        setIcon(<ion-icon name="thunderstorm"></ion-icon>);
        break;
      case "Drizzle":
        setIcon(<ion-icon name="umbrella"></ion-icon>);
        break;
      case "Rain":
        setIcon(<ion-icon name="rainy"></ion-icon>);
        break;
      case "Snow":
        setIcon(<ion-icon name="snow"></ion-icon>);
        break;
      case "Clear":
        setIcon(<ion-icon name="sunny"></ion-icon>);
        break;
      case "Clouds":
        setIcon(<ion-icon name="cloudy"></ion-icon>);
        break;
      default:
        setIcon(null);
        break;
    }
  }

  useEffect(() => {
    const apiKey = 'b66d2e221a79bdd2bbccc8003ff02c2c';
    const city = 'Virginia Beach';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    function fetchData() {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const weather = data.weather[0].main;
          updateIcon(weather);
        })
        .catch(error => {
          console.log(error);
        });
    }

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const [activeTab, setActiveTab] = useState("home");
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <div className='App'>
      <div className='navigation'>
        <a className={activeTab === "home" ? "active" : ""} onClick={() => handleTabClick("home")}>{icon}</a>
        <a className={activeTab === "health" ? "active" : ""} onClick={() => handleTabClick("health")}><ion-icon name="fitness"></ion-icon></a>
        <a className={activeTab === "activities" ? "active" : ""} onClick={() => handleTabClick("activities")}><ion-icon name="calendar"></ion-icon></a>
        <a className={activeTab === "settings" ? "active" : ""} onClick={() => handleTabClick("settings")}><ion-icon name="settings"></ion-icon></a>
      </div>
      <div className='content'>
        <div className={activeTab === "home" ? "active" : ""}>
          <Home />
        </div>
        <div className={activeTab === "health" ? "active" : ""}>
            <Health />
        </div>
        <div className={activeTab === "activities" ? "active" : ""}>
            <Activities />
        </div>
        <div className={activeTab === "settings" ? "active" : ""}>
            <Settings />
        </div>
      </div>
    </div>
  );
}

export default App;
