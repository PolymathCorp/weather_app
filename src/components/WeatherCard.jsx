import React from 'react';
import WeatherIcon from './WeatherIcon';

const WeatherCard = ({ title, data, iconCode, description, temperature, details }) => {
  return (
    <div className="bg-white border rounded p-4 shadow-sm">
      <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
      
      <div className="flex items-center">
        {iconCode && (
          <WeatherIcon 
            iconCode={iconCode} 
            description={description}
            size="sm"
          />
        )}
        
        {temperature && (
          <div className="text-2xl font-bold ml-2">{Math.round(temperature)}°</div>
        )}
        
        {description && !iconCode && (
          <div className="text-lg">{description}</div>
        )}
      </div>
      
      {details && (
        <div className="mt-2 text-sm text-gray-600">
          {details}
        </div>
      )}
      
      {data && typeof data === 'object' && Object.keys(data).length > 0 && (
        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              <span className="text-gray-500">{key}: </span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
