import React, { useState } from 'react';
import { useWeather } from '../WeatherContext';

const MapPage = () => {
  const { location, loading, searchLocation } = useWeather();
  const [mapType, setMapType] = useState('radar'); // 'radar', 'satellite', or 'temperature'
  const [searchQuery, setSearchQuery] = useState('');
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchLocation(searchQuery);
    }
  };
  
  const getMapUrl = () => {
    const baseUrl = 'https://tile.openweathermap.org/map';
    const zoom = 10;
    let layer = '';
    
    switch (mapType) {
      case 'radar':
        layer = 'precipitation_new';
        break;
      case 'satellite':
        layer = 'clouds_new';
        break;
      case 'temperature':
        layer = 'temp_new';
        break;
      default:
        layer = 'precipitation_new';
    }
    
    return `${baseUrl}/${layer}/${zoom}/${Math.floor(location.lat)}/${Math.floor(location.lon)}.png?appid=YOUR_OPENWEATHERMAP_API_KEY`;
  };
  
  return (
    <div className="w-full fixed inset-0 overflow-y-auto bg-blue-950 text-white p-2 sm:p-4 pb-12 sm:pb-16">
      <div className="flex items-center mb-2 sm:mb-4">
        <div className="flex-1">
          <button 
            className="p-1 sm:p-2"
            onClick={() => window.history.back()}
          >
            ← 
          </button>
        </div>
      </div>
      
      {/* Map Type Selector */}
      <div className="flex mb-3 sm:mb-4 bg-blue-950 rounded-full p-1">
        <button 
          className={`flex-1 py-1 sm:py-2 text-xs sm:text-sm rounded-full text-center ${mapType === 'radar' ? 'bg-white shadow text-blue-950' : 'text-white'}`}
          onClick={() => setMapType('radar')}
        >
          Radar
        </button>
        <button 
          className={`flex-1 py-1 sm:py-2 text-xs sm:text-sm rounded-full text-center ${mapType === 'satellite' ? 'bg-white shadow text-blue-950' : 'text-white'}`}
          onClick={() => setMapType('satellite')}
        >
          Satellite
        </button>
        <button 
          className={`flex-1 py-1 sm:py-2 text-xs sm:text-sm rounded-full text-center ${mapType === 'temperature' ? 'bg-white shadow text-blue-950' : 'text-white'}`}
          onClick={() => setMapType('temperature')}
        >
          Temp
        </button>
      </div>
      
      {/* Map Container */}
      <div className="mb-3 sm:mb-4 text-blue-950 bg-white border rounded p-2 sm:p-4 h-40 sm:h-64 md:h-80 flex items-center justify-center flex-col">
        <div className="text-center w-full">
          <p className="mb-2 sm:mb-4 text-sm sm:text-base">map</p>
          <p className="mb-2 sm:mb-4 text-xs sm:text-sm text-gray-500">
            Using OpenWeatherMap {mapType} layer for location: 
            {location.lat.toFixed(2)}, {location.lon.toFixed(2)}
          </p>
          <form onSubmit={handleSearch} className="w-full">
            <input
              type="text"
              placeholder="Search location..."
              className="w-full border rounded h-8 sm:h-10 px-2 sm:px-3 text-xs sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </div>
      
      {/* Nearby Conditions */}
      <div className="text-blue-950 mb-4">
        <h2 className="mb-2 text-white text-sm sm:text-base">nearby conditions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white border rounded p-2 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-500">Nearby Location {item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapPage;