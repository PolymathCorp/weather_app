import React, { useState } from 'react';
import { useWeather } from '../WeatherContext';

const ForecastPage = () => {
  const { forecast, hourlyForecast, loading } = useWeather();
  const [forecastType, setForecastType] = useState('daily'); // 'daily' or 'hourly'
  
  if (loading || !forecast) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  return (
    <div className="w-full fixed inset-0 overflow-y-auto bg-blue-950 text-white p-2 sm:p-4 pb-16">
      <div className="flex items-center mb-4">
        <h1 className="text-lg sm:text-xl font-bold">Forecast</h1>
      </div>
      
      {/* Toggle Forecast Type */}
      <div className="flex mb-4 bg-blue-950 rounded-full p-1">
        <button 
          className={`flex-1 py-1 sm:py-2 text-sm sm:text-base rounded-full text-center ${forecastType === 'daily' ? 'bg-white shadow text-blue-950' : 'text-white'}`}
          onClick={() => setForecastType('daily')}
        >
          daily forecast
        </button>
        <button 
          className={`flex-1 py-1 sm:py-2 text-sm sm:text-base rounded-full text-center ${forecastType === 'hourly' ? 'bg-white shadow text-blue-950' : 'text-white'}`}
          onClick={() => setForecastType('hourly')}
        >
          hourly forecast
        </button>
      </div>
      
      {/* 7-Day Forecast */}
      {forecastType === 'daily' && (
        <div className="mb-4 bg-white text-blue-950 border rounded p-2 sm:p-4">
          <h2 className="mb-2 text-sm sm:text-base font-medium">7-day forecast</h2>
          <div className="space-y-1 sm:space-y-2">
            {forecast.slice(0, 7).map((day, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-2 text-xs sm:text-sm">
                <div className="w-16 sm:w-24">
                  {new Date(day.date).toLocaleDateString([], { weekday: 'short' })}
                </div>
                <div className="flex items-center">
                  <img 
                    src={`http://openweathermap.org/img/wn/${day.icon}.png`} 
                    alt={day.condition}
                    className="w-6 h-6 sm:w-8 sm:h-8"
                  />
                  <span className="ml-1 sm:ml-2 hidden xs:inline">{day.condition}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold">{Math.round(day.maxTemp)}°</span> / {Math.round(day.minTemp)}°
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Hourly Forecast */}
      {forecastType === 'hourly' && (
        <div className="mb-4 bg-white text-blue-950 border rounded p-2 sm:p-4">
          <h2 className="mb-2 text-sm sm:text-base font-medium">24-hour forecast</h2>
          <div className="space-y-1 sm:space-y-2">
            {hourlyForecast.map((hour, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-2 text-xs sm:text-sm">
                <div className="w-16 sm:w-24">
                  {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="flex items-center">
                  <img 
                    src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} 
                    alt={hour.weather[0].description}
                    className="w-6 h-6 sm:w-8 sm:h-8"
                  />
                  <span className="ml-1 sm:ml-2 hidden xs:inline">{hour.weather[0].description}</span>
                </div>
                <div className="text-right font-bold">
                  {Math.round(hour.main.temp)}°
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Weather Details */}
      <div className="text-blue-950 mb-4">
        <h2 className="mb-2 text-white text-sm sm:text-base font-medium">weather details</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
          {forecast && forecast[0] && (
            <>
              <div className="bg-white border rounded p-2 sm:p-4">
                <h3 className="text-xs sm:text-sm text-gray-500">Humidity</h3>
                <p className="text-base sm:text-lg font-bold">{forecast[0].humidity}%</p>
              </div>
              <div className="bg-white border rounded p-2 sm:p-4">
                <h3 className="text-xs sm:text-sm text-gray-500">Wind Speed</h3>
                <p className="text-base sm:text-lg font-bold">{forecast[0].windSpeed} m/s</p>
              </div>
              <div className="bg-white border rounded p-2 sm:p-4">
                <h3 className="text-xs sm:text-sm text-gray-500">Pressure</h3>
                <p className="text-base sm:text-lg font-bold">{forecast[0].forecast[0].main.pressure} hPa</p>
              </div>
              <div className="bg-white border rounded p-2 sm:p-4">
                <h3 className="text-xs sm:text-sm text-gray-500">Visibility</h3>
                <p className="text-base sm:text-lg font-bold">{(forecast[0].forecast[0].visibility / 1000).toFixed(1)} km</p>
              </div>
              <div className="bg-white border rounded p-2 sm:p-4">
                <h3 className="text-xs sm:text-sm text-gray-500">Feels Like</h3>
                <p className="text-base sm:text-lg font-bold">{Math.round(forecast[0].forecast[0].main.feels_like)}°</p>
              </div>
              <div className="bg-white border rounded p-2 sm:p-4">
                <h3 className="text-xs sm:text-sm text-gray-500">Cloud Cover</h3>
                <p className="text-base sm:text-lg font-bold">{forecast[0].forecast[0].clouds.all}%</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForecastPage;