import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Check for dark mode preference
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const isDarkMode = localStorage.getItem('darkMode') === 'true' || 
  (localStorage.getItem('darkMode') === null && darkModeMediaQuery.matches);

// Apply dark mode if needed
if (isDarkMode) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);