import React, { useState, useEffect } from "react";
import Navbar from "../src/components/navbar";
import MainWeatherCard from "../src/components/mainweathercard";
import FiveDayForecast from "../src/components/fiveday";
import TodayHighlights from "../src/components/todayhighlights";
import axios from "axios";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  useEffect(() => {
    localStorage.removeItem("searchHistory");
    setSearchHistory([]);
    const savedHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (savedHistory) {
      setSearchHistory(savedHistory);
    }
  }, []);


  const fetchAirQualityData = (lat, lon) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    axios
      .get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then((response) => {
        setAirQualityData(response.data.list[0]);
      })
      .catch((error) => console.error("Error fetching the air quality data:", error));
  };

  const fetchWeatherData = (city) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    setError("");
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found or API error");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        fetchAirQualityData(data.coord.lat, data.coord.lon);
        axios
          .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
          .then((response) => {
            setFiveDayForecast(response.data);
          })
          .catch(() => {
            setError("Failed to fetch 5-day forecast.");
          });
      })
      .catch((err) => {
        console.error(err);
        setWeatherData(null);
        setFiveDayForecast(null);
        setAirQualityData(null);
        setError(err.message || "Something went wrong.");
      });
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
    setSearchHistory((prevHistory) => {
      const updatedHistory = [searchedCity, ...prevHistory.filter(c => c !== searchedCity)].slice(0, 5);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  const handleRefresh = () => {
    fetchWeatherData(city);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // #1F2937
  return (
    <div
      style={{
        backgroundColor: darkMode ? "#000000" : "#f3f4f6",
        color: darkMode ? "white" : "black",
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >
      <Navbar
        onSearch={handleSearch}
        onRefresh={handleRefresh}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {searchHistory.length > 0 && (
        <div style={{ margin: "0 30px", marginTop: "10px" }}>
          <h3 style={{ marginBottom: "8px", fontWeight: "600" }}>Recent Searches:</h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {searchHistory.map((cityName, index) => (
              <button
                key={index}
                onClick={() => handleSearch(cityName)}
                style={{
                  backgroundColor: "#4B5563",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {cityName}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div
          style={{
            backgroundColor: "#f44336",
            color: "white",
            padding: "10px 20px",
            margin: "10px 30px",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          {error}
        </div>
      )}

      {weatherData && airQualityData && (
        <div style={{ display: "flex", padding: "30px", gap: "20px" }}>
          <div style={{ flex: "1", marginRight: "10px" }}>
            <MainWeatherCard weatherData={weatherData} />
            <p style={{ fontWeight: "700", fontSize: "20px", marginTop: "20px" }}>5 Days Forecast</p>
            {fiveDayForecast && <FiveDayForecast forecastData={fiveDayForecast} />}
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: "0.5", gap: "20px" }}>
            <TodayHighlights weatherData={weatherData} airQualityData={airQualityData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
