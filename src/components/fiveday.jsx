import React from "react";

const FiveDayForecast = ({ forecastData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  const dailyForecast = forecastData.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 5);
    // #5f7efe

  return (
    <div
      style={{
        backgroundColor: "#334155",
        color: "white",
        borderRadius: "0.5rem",
        width: "90%",
        padding: "10px 12px",
      }}
    >
      {dailyForecast.map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "12px",
            gap: "10px",
          }}
        >
          <div style={{ fontSize: "15px", fontWeight: "bold" }}>
            {Math.round(item.main.temp)}°C
          </div>

          <div style={{ fontSize: "15px", fontWeight: "bold" }}>
            {formatDate(item.dt_txt)}
          </div>

          <div style={{ fontSize: "15px" }}>
            {item.weather[0].description}
          </div>

          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt="weather-icon"
            style={{ width: "40px", height: "40px" }}
          />
        </div>
      ))}
    </div>
  );
};

export default FiveDayForecast;
