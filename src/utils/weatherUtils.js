export const getWeatherDescription = (code) => {
    const descriptions = {
      200: 'Thunderstorm with light rain',
      201: 'Thunderstorm with rain',
      202: 'Thunderstorm with heavy rain',
      // Add more mappings as needed
    };
  
    return descriptions[code] || 'Unknown weather condition';
  };
  
  export const getAirQualityDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return 'Good';
      case 2:
        return 'Fair';
      case 3:
        return 'Moderate';
      case 4:
        return 'Poor';
      case 5:
        return 'Very Poor';
      default:
        return 'Unknown';
    }
  };
  
  export const getUVIndexDescription = (uvIndex) => {
    if (uvIndex < 3) return 'Low';
    if (uvIndex < 6) return 'Moderate';
    if (uvIndex < 8) return 'High';
    if (uvIndex < 11) return 'Very High';
    return 'Extreme';
  };
  