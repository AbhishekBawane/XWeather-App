
import './App.css';
import React from 'react';
import {useState} from "react";

function App() {
     const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchWeather() {
    if (!city.trim()) return;

    setLoading(true);
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=12645e2af4c04719b0c191606251411&q=${city}`
      );

      if (!response.ok) throw new Error("Invalid City");

      const data = await response.json();
      setWeather({
        temp: data.current.temp_c,
        humidity: data.current.humidity,
        condition: data.current.condition.text,
        wind: data.current.wind_kph,
      });
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  }

   

  return (
    <div className="App">
         <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="button" onClick={fetchWeather}>Search</button>
      </div>

     {loading && <p>Loading data…</p>}

      {weather && (
        <div className="weather-cards">
           
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weather.temp} °C</p>
          </div>

          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weather.humidity}%</p>
          </div>

          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weather.condition}</p>
          </div>

          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weather.wind} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
