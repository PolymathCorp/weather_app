import { useState, useEffect, useCallback } from 'react';

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const useWeatherApi = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);
  const [sunriseSunset, setSunriseSunset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ lat: 40.7128, lon: -74.0060 }); // Default: New York
  const [units, setUnits] = useState('metric'); // metric or imperial
  const [locationName, setLocationName] = useState('New York');

  const fetchCurrentWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${BASE_URL}/weather?lat=${location.lat}&lon=${location.lon}&units=${units}&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch current weather. Status: ${response.status}`);
      }
      
      const data = await response.json();
      setCurrentWeather(data);
      setLocationName(data.name);
      setSunriseSunset({
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset
      });
    } catch (err) {
      console.error('Current weather error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [location, units]);

  const fetchForecast = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${BASE_URL}/forecast?lat=${location.lat}&lon=${location.lon}&units=${units}&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch forecast. Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Process daily forecast data
      const dailyData = processDailyForecast(data.list);
      setForecast(dailyData);
      
      // Process hourly forecast data (next 24 hours)
      const hourlyData = data.list.slice(0, 8);
      setHourlyForecast(hourlyData);
    } catch (err) {
      console.error('Forecast error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [location, units]);

  const fetchAirQuality = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${BASE_URL}/air_pollution?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch air quality. Status: ${response.status}`);
      }
      
      const data = await response.json();
      setAirQuality(data);
    } catch (err) {
      console.error('Air quality error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [location]);

  const fetchUVIndex = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Note: OpenWeatherMap no longer offers a separate UV index endpoint
      // For production, you'd need to use the OneCall API or another source
      // This is a placeholder implementation
      const response = await fetch(
        `${BASE_URL}/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly,daily&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch UV index. Status: ${response.status}`);
      }
      
      const data = await response.json();
      setUvIndex({ value: data.current.uvi });
    } catch (err) {
      console.error('UV index error:', err);
      // Don't set error state for UV index to avoid breaking the whole app
      setUvIndex({ value: 0 });
    } finally {
      setLoading(false);
    }
  }, [location]);

  const processDailyForecast = (forecastList) => {
    // Group forecasts by day
    const groupedByDay = forecastList.reduce((acc, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});

    // Create daily summaries
    return Object.keys(groupedByDay).map(date => {
      const dayData = groupedByDay[date];
      
      // Find min and max temps for the day
      const temperatures = dayData.map(item => item.main.temp);
      const minTemp = Math.min(...temperatures);
      const maxTemp = Math.max(...temperatures);
      
      // Find most common weather condition
      const conditions = dayData.map(item => item.weather[0].main);
      const conditionCounts = conditions.reduce((acc, condition) => {
        acc[condition] = (acc[condition] || 0) + 1;
        return acc;
      }, {});
      
      const mostCommonCondition = Object.keys(conditionCounts).reduce(
        (a, b) => (conditionCounts[a] > conditionCounts[b] ? a : b)
      );
      
      // Use noon forecast for the icon if available, otherwise first entry
      const noonForecast = dayData.find(item => {
        const hour = new Date(item.dt * 1000).getHours();
        return hour >= 11 && hour <= 13;
      }) || dayData[0];
      
      return {
        date: new Date(date),
        minTemp,
        maxTemp,
        condition: mostCommonCondition,
        icon: noonForecast.weather[0].icon,
        humidity: noonForecast.main.humidity,
        windSpeed: noonForecast.wind.speed,
        forecast: dayData
      };
    });
  };

  const updateLocation = useCallback((newLocation) => {
    setLocation(newLocation);
  }, []);

  const updateUnits = useCallback((newUnits) => {
    setUnits(newUnits);
  }, []);

  const searchLocation = useCallback(async (query) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to find location. Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.length > 0) {
        const { lat, lon, name } = data[0];
        setLocation({ lat, lon });
        setLocationName(name);
      } else {
        throw new Error('Location not found');
      }
    } catch (err) {
      console.error('Location search error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      
      try {
        await Promise.all([
          fetchCurrentWeather(),
          fetchForecast(),
          fetchAirQuality(),
          fetchUVIndex()
        ]);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Failed to fetch weather data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllData();
  }, [fetchCurrentWeather, fetchForecast, fetchAirQuality, fetchUVIndex]);

  // Try to get user's location on initial load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Fallback to default location
        }
      );
    }
  }, [updateLocation]);

  return {
    currentWeather,
    forecast,
    hourlyForecast,
    airQuality,
    uvIndex,
    sunriseSunset,
    loading,
    error,
    location,
    locationName,
    units,
    updateLocation,
    updateUnits,
    searchLocation
  };
};