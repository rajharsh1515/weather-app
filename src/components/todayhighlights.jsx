import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import HighlightBox from "../../src/components/Highlightbox";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompressIcon from '@mui/icons-material/Compress';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

const TodayHighlights = ({ weatherData, airQualityData }) => {
  const { main, wind, visibility, sys } = weatherData;
  const airQualityIndex = airQualityData?.main?.aqi;

  const renderAirQualityDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Unknown";
    }
  };

  const highlights = [
    { title: "Humidity", value: `${main.humidity}%`, Icon: InvertColorsIcon },
    { title: "Wind Speed", value: `${wind.speed}km/h`, Icon: AirIcon },
    {
      title: "Feels Like",
      value: `${main.feels_like}°C`,
      Icon: DeviceThermostatIcon,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#334155",
        color: "white",
        width: "840px",
        borderRadius: "0.5rem",
        padding: "30px",
      }}
    >
      <div style={{ fontSize: "20px" }}>Today's Highlights</div>

      <div style={{ display: "flex", gap: "18px" }}>
        <div
          style={{
            backgroundColor: "#000000",
            color: "white",
            padding: "1rem",
            borderRadius: "0.5rem",
            marginTop: "11px",
            width: "370px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "22px",
              }}
            >
              <p>Air Quality Index</p>
              <div
                style={{
                  marginTop: "1rem",
                  fontSize: "16px",
                  fontWeight: "700",
                  height: "20px",
                  width: "80px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {renderAirQualityDescription(airQualityIndex)}
              </div>
            </div>

            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <AirIcon style={{ fontSize: "35px" }} />
              <p style={{ fontSize: "20px", textAlign: "center", opacity: 0.8 }}>
                AQI ranges from 1 (Good) to 5 (Very Poor)
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#000000",
            color: "white",
            padding: "1rem",
            borderRadius: "0.5rem",
            marginTop: "11px",
            width: "385px",
          }}
        >
          <div style={{ fontSize: "22px" }}>
            <p>Sunrise And Sunset</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <div>
                <WbSunnyIcon style={{ fontSize: "40px", marginLeft: "30px" }} />
                <p style={{ fontSize: "25px", marginLeft: "20px" }}>
                  {new Date(sys.sunrise * 1000).toLocaleTimeString()}
                </p>
              </div>
              <div>
                <NightsStayIcon
                  style={{ fontSize: "40px", marginRight: "35px" }}
                />
                <p style={{ fontSize: "25px", marginRight: "50px" }}>
                  {new Date(sys.sunset * 1000).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          
          gap: "4px",
          marginTop: "10px",
        }}
      >
        {highlights.map((highlight, index) => (
          <HighlightBox
            key={index}
            title={highlight.title}
            value={highlight.value}
            Icon={highlight.Icon}
          />
        ))}
      </div>
    </div>
  );
};

export default TodayHighlights;
