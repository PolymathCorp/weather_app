import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-around py-4 border-t bg-white">
      <Link to="/" className={`text-center ${isActive('/') ? 'font-bold text-blue-500' : ''}`}>
        Home
      </Link>
      <Link to="/forecast" className={`text-center ${isActive('/forecast') ? 'font-bold text-blue-500' : ''}`}>
        Forecast
      </Link>
      <Link to="/map" className={`text-center ${isActive('/map') ? 'font-bold text-blue-500' : ''}`}>
        Map
      </Link>
      <Link to="/settings" className={`text-center ${isActive('/settings') ? 'font-bold text-blue-500' : ''}`}>
        Settings
      </Link>
    </div>
  );
};

export default Navbar;