import React from 'react';

const SplashScreen = () => {
  return (
    <div className="w-full px-0 fixed inset-0 overflow-y-auto flex flex-col items-center justify-center h-screen bg-blue-950">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Times and Seasons</h1>
        <p className="text-xl mb-8">Weather App</p>
        <button 
          className="bg-white text-gray-400 py-2 px-8 rounded-full"
          onClick={() => {}}
        >
          get started
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;