import React, { createContext, useContext } from 'react';
import { useWeatherApi } from '../hooks/useWeatherApi';

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const weatherData = useWeatherApi();
  
  return (
    <WeatherContext.Provider value={weatherData}>
      {children}
    </WeatherContext.Provider>
  );
};