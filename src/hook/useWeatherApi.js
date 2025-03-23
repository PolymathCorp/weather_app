import { useState } from "react";

export const useWeatherApi = ( initialUnit = 'metric') => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [unit, setUnit] = useState(initialUnit);
  
    const fetchWeatherData = async (city) => {
        if(!city.trim()) return;

        setLoading(true);
        setError(null);
    
        try {
            const API_KEY = '50d7999390ca15759101b40e6c91ed23'; 
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
            );
            
            if (!response.ok) {
              throw new Error(
                response.status === 404 
                  ? 'City not found. Please check the spelling and try again.' 
                  : 'Failed to fetch weather data. Please try again later.'
              );
            }
            
            const data = await response.json();
            setWeatherData(data);
            return data;
            
          } catch (err) {
            setError(err.message);
            return null;
          } finally {
            setLoading(false);
          }
        };
      
        const toggleUnit = () => {
          setUnit(prev => {
            const newUnit = prev === 'metric' ? 'imperial' : 'metric';
            if (weatherData) {
              fetchWeatherData(weatherData.name);
            }
            return newUnit;
          });
        };
      
        return {
          loading,
          error,
          weatherData,
          unit,
          fetchWeatherData,
          toggleUnit
        };
    }
