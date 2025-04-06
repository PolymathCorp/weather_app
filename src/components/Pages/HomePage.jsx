import React, { useState } from 'react';
import { useWeather } from '../WeatherContext';

const HomePage = () => {
  const { 
    currentWeather, 
    hourlyForecast, 
    airQuality, 
    uvIndex, 
    sunriseSunset, 
    loading, 
    searchLocation 
  } = useWeather();
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchLocation(searchQuery);
    }
  };
  
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  if (loading || !currentWeather) {
    return <div className="w-full flex items-center justify-center h-screen">Loading...</div>;
  }
  
  return (
    <div className="w-full fixed inset-0 overflow-y-auto text-blue-950 bg-blue-950 max-w-full p-2 sm:p-4">
      {/* Search */}
      <div className="mb-3 sm:mb-4">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="search"
            className="w-full p-2 bg-white border rounded text-sm sm:text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
      
      {/* Current Weather */}
      <div className="mb-3 sm:mb-4 bg-white border rounded p-3 sm:p-4">
        <h2 className="text-lg sm:text-xl mb-1 sm:mb-2">current weather</h2>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold">
              {Math.round(currentWeather.main.temp)}°
            </h3>
            <p className="text-sm sm:text-base">{currentWeather.name}</p>
            <p className="text-xs sm:text-sm">{currentWeather.weather[0].description}</p>
          </div>
          <div>
            <img 
              src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} 
              alt={currentWeather.weather[0].description}
              className="w-12 h-12 sm:w-16 sm:h-16"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1 sm:gap-2 mt-2 sm:mt-4 text-xs sm:text-sm">
          <div>
            <p>Feels like: {Math.round(currentWeather.main.feels_like)}°</p>
            <p>Humidity: {currentWeather.main.humidity}%</p>
          </div>
          <div>
            <p>Wind: {currentWeather.wind.speed} m/s</p>
            <p>Pressure: {currentWeather.main.pressure} hPa</p>
          </div>
        </div>
      </div>
      
      {/* Hourly Weather */}
      <div className="mb-3 sm:mb-4">
        <div className="flex justify-between mb-1 sm:mb-2">
          <h2 className="text-lg sm:text-xl text-white">hourly weather</h2>
        
        </div>
        <div className="flex overflow-x-auto space-x-2 sm:space-x-4 pb-2">
          {hourlyForecast && hourlyForecast.map((hour, index) => (
            <div key={index} className="flex-shrink-0 w-12 sm:w-16 h-20 sm:h-24 bg-white border rounded p-1 sm:p-2 flex flex-col items-center justify-center">
              <p className="text-xs">{new Date(hour.dt * 1000).getHours()}:00</p>
              <img 
                src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} 
                alt={hour.weather[0].description}
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
              <p className="text-xs sm:text-sm font-bold">{Math.round(hour.main.temp)}°</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Air Quality & UV Index */}
      <div className="flex space-x-2 sm:space-x-4 mb-3 sm:mb-4">
        <div className="w-1/2 bg-white border rounded p-2 sm:p-4">
          <h2 className="text-sm sm:text-base">air quality</h2>
          {airQuality && (
            <p className="text-base sm:text-lg font-bold mt-1 sm:mt-2">
              {airQuality.list[0].main.aqi}/5
            </p>
          )}
        </div>
        <div className="w-1/2 bg-white border rounded p-2 sm:p-4">
          <h2 className="text-sm sm:text-base">uv index</h2>
          {uvIndex && (
            <p className="text-base sm:text-lg font-bold mt-1 sm:mt-2">
              {Math.round(uvIndex.value)}
            </p>
          )}
        </div>
      </div>
      
      {/* Sunrise and Sunset */}
      <div className="bg-white border rounded mb-12 sm:mb-15 p-2 sm:p-4">
        <h2 className="text-sm sm:text-base">sunrise and sunset</h2>
        {sunriseSunset && (
          <div className="flex justify-between mt-1 sm:mt-2 text-xs sm:text-sm">
            <div>
              <p className="text-xs sm:text-sm">Sunrise</p>
              <p className="font-bold">{formatTime(sunriseSunset.sunrise)}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm">Sunset</p>
              <p className="font-bold">{formatTime(sunriseSunset.sunset)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;