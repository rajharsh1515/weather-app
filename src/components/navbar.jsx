import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FilterDramaTwoToneIcon from '@mui/icons-material/FilterDramaTwoTone';
import RefreshIcon from '@mui/icons-material/Refresh';

const Navbar = ({ onSearch, onRefresh, darkMode, toggleDarkMode }) => {
  const [searchCity, setSearchCity] = useState("");

  const handleSearchClick = () => {
    if (searchCity.trim()) {
      onSearch(searchCity);
      setSearchCity("");
    }
  };

  return (
    <nav
      style={{
        justifyContent: "space-between",
        display: "flex",
        alignItems: "center",
        marginTop: "10px",
        padding: "10px",
        paddingLeft: '30px',
        paddingRight: '30px'
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
        <FilterDramaTwoToneIcon />
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>Weather Dashboard</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <TextField
          variant="outlined"
          placeholder="Search for a city"
          size="small"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          style={{
            backgroundColor: "white",
            borderRadius: "2rem",
            width: "22rem",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          onClick={handleSearchClick}
          style={{ borderRadius: "6px", backgroundColor: '#1E293B' }}
        >
          Search
        </Button>
      </div>

      <div
        onClick={toggleDarkMode}
        style={{
          cursor: "pointer",
          fontSize: "14px",
          backgroundColor: darkMode ? "#f1f1f1" : "#1E293B",
          color: darkMode ? "#333" : "#fff",
          height: "35px",
          width: "120px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </div>

      <div
        onClick={onRefresh}
        style={{
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "700",
          backgroundColor: '#1E293B',
          height: "35px",
          width: "150px",
          color: 'white',
          gap: '6px',
          borderRadius: "6px",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <RefreshIcon />
        <p style={{ fontSize: '14px' }}>Refresh</p>
      </div>
    </nav>
  );
};

export default Navbar;