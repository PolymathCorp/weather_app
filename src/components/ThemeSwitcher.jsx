import React from 'react';
import { RefreshCw, Droplets, Wind } from 'lucide-react';

const WeatherCard = ({ weatherData, unit, toggleUnit, onRefresh }) => {
  if (!weatherData) return null;

  return (
    <div className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden dark:bg-slate-700 dark:text-white">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{weatherData.name}, {weatherData.sys.country}</h2>
          <button 
            onClick={onRefresh} 
            className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
            title="Refresh weather data"
          >
            <RefreshCw size={20} />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col items-center">
            <img 
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              className="w-24 h-24"
            />
            <p className="text-xl capitalize">{weatherData.weather[0].description}</p>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <p className="text-4xl font-bold">
                {Math.round(weatherData.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
              </p>
              <button 
                onClick={toggleUnit}
                className="text-sm bg-blue-100 px-2 py-1 rounded hover:bg-blue-200 transition-colors dark:bg-blue-900 dark:hover:bg-blue-800"
              >
                Switch to {unit === 'metric' ? '°F' : '°C'}
              </button>
            </div>
            
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2">
                <Droplets className="text-blue-500" size={20} />
                <p>Humidity: {weatherData.main.humidity}%</p>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="text-blue-500" size={20} />
                <p>Wind: {weatherData.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
              </div>
              <p>Feels like: {Math.round(weatherData.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 px-6 py-4 dark:bg-slate-800">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Last updated: {new Date(weatherData.dt * 1000).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;