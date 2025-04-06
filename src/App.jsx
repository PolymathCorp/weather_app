import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/Pages/HomePage';
import ForecastPage from './components/Pages/ForecastPage';
import MapPage from './components/Pages/MapPage';
import SettingsPage from './components/Pages/SettingsPage';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import { WeatherProvider } from './components/WeatherContext';

function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate splash screen loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <SplashScreen />;
  }
  
  return (
    <WeatherProvider>
      <Router>
        <div className="w-full px-0 fixed inset-0 overflow-hidden bg-gray-100">
          <div className="max-w-md mx-auto w-full bg-white h-full relative">
            <div className="h-full pb-16 overflow-y-auto">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/forecast" element={<ForecastPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            <Navbar />
          </div>
        </div>
      </Router>
    </WeatherProvider>
  );
}

export default App;