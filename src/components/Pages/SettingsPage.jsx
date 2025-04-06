import React, { useState } from 'react';
import { useWeather } from '../WeatherContext';

const SettingsPage = () => {
  const { units, updateUnits, updateLocation } = useWeather();
  const [tempUnits, setTempUnits] = useState(units);
  const [appearance, setAppearance] = useState('light'); // 'light' or 'dark'
  const [notifications, setNotifications] = useState(true);
  const [locationSearch, setLocationSearch] = useState('');
  
  const handleUnitsChange = (newUnits) => {
    setTempUnits(newUnits);
    updateUnits(newUnits);
  };
  
  const handleLocationSearch = async () => {
    if (locationSearch.trim()) {
      // In a real app, this would call a geocoding API
      console.log('Searching for:', locationSearch);
      // For demo purposes, set a dummy location
      updateLocation({ lat: 40.7128, lon: -74.0060 });
    }
  };
  
  return (
    <div className="w-full fixed inset-0 overflow-y-auto bg-blue-950 text-white">
      <div className="flex items-center p-2 sm:p-4 mb-2 sm:mb-4">
        <div className="flex justify-start flex-1 items-center">
          <button 
            className="p-1 sm:p-2"
            onClick={() => window.history.back()}
          >
            ← 
          </button>
          <h2 className='text-xl sm:text-3xl ml-2 sm:ml-5'>settings</h2>
        </div>
      </div>
      
      {/* Units */}
      <div className="mb-2 sm:mb-4 text-blue-950 bg-white border-t border-b p-3 sm:p-4 rounded-none">
        <h2 className="mb-2 text-sm sm:text-base font-medium">units</h2>
        <div className="space-y-2 text-xs sm:text-sm">
          <div className="flex items-center">
            <input
              type="radio"
              id="metric"
              checked={tempUnits === 'metric'}
              onChange={() => handleUnitsChange('metric')}
              className="mr-2"
            />
            <label htmlFor="metric">Metric (°C, m/s)</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="imperial"
              checked={tempUnits === 'imperial'}
              onChange={() => handleUnitsChange('imperial')}
              className="mr-2"
            />
            <label htmlFor="imperial">Imperial (°F, mph)</label>
          </div>
        </div>
      </div>
      
      {/* Appearance */}
      <div className="mb-2 sm:mb-4 text-blue-950 bg-white border rounded p-3 sm:p-4">
        <h2 className="mb-2 text-sm sm:text-base font-medium">appearance</h2>
        <div className="space-y-2 text-xs sm:text-sm">
          <div className="flex items-center">
            <input
              type="radio"
              id="light"
              checked={appearance === 'light'}
              onChange={() => setAppearance('light')}
              className="mr-2"
            />
            <label htmlFor="light">Light Mode</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="dark"
              checked={appearance === 'dark'}
              onChange={() => setAppearance('dark')}
              className="mr-2"
            />
            <label htmlFor="dark">Dark Mode</label>
          </div>
        </div>
      </div>
      
      {/* Notifications */}
      <div className="mb-2 sm:mb-4 text-blue-950 bg-white border rounded p-3 sm:p-4">
        <h2 className="mb-2 text-sm sm:text-base font-medium">notification</h2>
        <div className="space-y-2 text-xs sm:text-sm">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="notifications"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="mr-2"
            />
            <label htmlFor="notifications">Weather Alerts</label>
          </div>
        </div>
      </div>
      
      {/* Location */}
      <div className="mb-12 sm:mb-15 text-blue-950 bg-white border rounded p-3 sm:p-4">
        <h2 className="mb-2 text-sm sm:text-base font-medium">location</h2>
        <div className="space-y-2">
          <div className="flex items-center mb-2">
            <input
              type="text"
              placeholder="Search for a city"
              className="w-full p-2 border rounded text-xs sm:text-sm"
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
            />
          </div>
          <button 
            className="w-full p-1 sm:p-2 bg-blue-500 text-white rounded text-xs sm:text-sm"
            onClick={handleLocationSearch}
          >
            Update Location
          </button>
          <div className="pt-2">
            <button className="text-blue-950 w-full p-1 sm:p-2 border rounded text-xs sm:text-sm">
              Use Current Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;