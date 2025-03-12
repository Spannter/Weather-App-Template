import { useState, useEffect } from 'react';
import './App.css';
import { getWeather } from './services/WeatherService';
import { getDateFromHours } from './utils';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('New York');
  const [weather, setWeather] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = (cityName) => {
    setLoading(true);
    setError(null);
    getWeather(cityName)
      .then((data) => {
        setWeather(data);
        setLoading(false);
        toast.success("Weather updated!");
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        toast.error("Error fetching weather.");
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setCity(search.trim());
      setSearch('');
    }
  };

  return (
    <main className="weather-container">
      <ToastContainer />
      
      {/* 🌥 Weather Search */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* ⚠️ Error Message */}
      {error && <p className="error">{error}</p>}

      {/* ⏳ Loading State */}
      {loading ? (
        <p>Weather Loading...</p>
      ) : (
        weather && (
          <section>
            <h2>{city}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="weather-icon"
            />
            <p className="temp">{weather.main.temp}°C</p>
            <p className="weather-description">{weather.weather[0].description}</p>
            <p>Sunset: {getDateFromHours(weather.sys.sunset)}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Sea Level: {weather.main.sea_level || "N/A"}</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </section>
        )
      )}
    </main>
  );
}

export default App;
