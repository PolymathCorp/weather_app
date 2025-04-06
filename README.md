Weather App
A responsive, modern weather application built with React that provides current weather conditions, forecasts, interactive maps, and customizable settings.

Features

Real-time Weather Data: Access current weather conditions from any location
Daily & Hourly Forecasts: View 7-day and 24-hour detailed weather predictions
Interactive Weather Maps: Explore radar, satellite, and temperature maps
Air Quality & UV Index: Monitor environmental conditions
Customizable Settings: Choose between metric/imperial units and light/dark themes
Responsive Design: Optimized for all devices from mobile to desktop
Location Search: Find weather for any location worldwide

Usage
After starting the app, you'll be presented with the home page showing current weather conditions for your default location. Use the search bar to find weather information for different places.
Getting an API Key

Create a free account at OpenWeatherMap
Navigate to the API keys section in your account dashboard
Generate a new API key
Place the key in your .env file as described in the installation steps

Pages
Home Page

Current weather conditions
Hourly forecast preview
Air quality and UV index
Sunrise and sunset times
Location search functionality

Forecast Page

Toggle between daily (7-day) and hourly (24-hour) forecasts
Detailed weather parameters for each time period
Additional weather details including humidity, wind, pressure, etc.

Map Page

Interactive weather maps with three view options:

Radar (precipitation)
Satellite (cloud cover)
Temperature


Nearby conditions for surrounding areas

Settings Page

Unit preferences (metric or imperial)
Theme selection (light or dark mode)
Notification preferences
Location management

API Integration
This application uses the OpenWeatherMap API to fetch weather data:

Current Weather: /weather
Forecast: /forecast
Air Pollution: /air_pollution
UV Index: /uvi
Weather Maps: /map/{layer}/{z}/{x}/{y}

Responsive Design Implementation
The app uses Tailwind CSS for responsive design with:

Mobile-first approach
Flexible grid layouts
Responsive text sizing
Optimized touch targets for mobile users
Appropriate padding and spacing for all devices
Scrollable areas for content that exceeds viewport

Breakpoints

Small (sm): 640px and up
Medium (md): 768px and up
Large (lg): 1024px and up
Extra Large (xl): 1280px and up