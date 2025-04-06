import React from 'react';

const WeatherIcon = ({ iconCode, description, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <img 
      src={`http://openweathermap.org/img/wn/${iconCode}${size === 'sm' ? '.png' : '@2x.png'}`} 
      alt={description || 'Weather icon'}
      className={sizeClasses[size] || sizeClasses.md}
    />
  );
};

export default WeatherIcon;
