import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { TemperatureProvider, useTemperature } from './context/TemperatureContext';
import { GlobalStyles, theme } from './styles/GlobalStyles';
import Header from './components/Header';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherParticles from './components/WeatherParticles';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import { getWeatherForecast, getWeatherForecastByCoords, getCurrentWeather, getCurrentWeatherByCoords } from './services/weatherApi';
import { getUserCoordinates, NYC_COORDINATES } from './services/geolocation';
import { WeatherData, CurrentWeatherData } from './types/weather.types';
import { getWeatherBackground, isDayTime } from './utils/weatherBackgrounds';

function AppContent() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [background, setBackground] = useState<string>('linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
  const { unit } = useTemperature();

  // Load NYC weather immediately, then try user location
  useEffect(() => {
    const loadWeather = async () => {
      setIsLoading(true);
      
      // First, load NYC as placeholder
      try {
        const [nycCurrent, nycForecast] = await Promise.all([
          getCurrentWeatherByCoords(NYC_COORDINATES.lat, NYC_COORDINATES.lon, 'metric'),
          getWeatherForecastByCoords(NYC_COORDINATES.lat, NYC_COORDINATES.lon, 'metric')
        ]);
        setCurrentWeather(nycCurrent);
        setWeatherData(nycForecast);
        updateBackgroundFromCurrent(nycCurrent);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load weather');
        setIsLoading(false);
        return;
      }

      // Then try to get user's location in the background
      try {
        const coords = await getUserCoordinates();
        const [userCurrent, userForecast] = await Promise.all([
          getCurrentWeatherByCoords(coords.lat, coords.lon, 'metric'),
          getWeatherForecastByCoords(coords.lat, coords.lon, 'metric')
        ]);
        setCurrentWeather(userCurrent);
        setWeatherData(userForecast);
        updateBackgroundFromCurrent(userCurrent);
      } catch (err) {
        // Silently fail - we already have NYC data
        console.log('User location not available, showing New York');
      }
    };

    loadWeather();
  }, []);

  const updateBackgroundFromCurrent = (data: CurrentWeatherData) => {
    const now = Date.now() / 1000;
    const isDay = now >= data.sys.sunrise && now <= data.sys.sunset;
    const newBackground = getWeatherBackground(
      data.weather[0].main,
      data.weather[0].description,
      isDay
    );
    setBackground(newBackground);
  };

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const unitToUse = unit === 'celsius' ? 'metric' : 'imperial';
      
      // Fetch current weather first
      const current = await getCurrentWeather(city, unitToUse);
      
      // Only fetch forecast if current weather succeeded
      const forecast = await getWeatherForecast(city, unitToUse);
      
      setCurrentWeather(current);
      setWeatherData(forecast);
      updateBackgroundFromCurrent(current);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      // Don't clear weather data - keep showing previous weather
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
  };

  return (
    <>
      <GlobalStyles background={background} />
      <AppContainer>
        {currentWeather && (
          <WeatherParticles
            weatherMain={currentWeather.weather[0].main}
            rainAmount={currentWeather.rain?.['1h'] || currentWeather.rain?.['3h'] || 0}
            cloudiness={currentWeather.clouds.all}
            windSpeed={currentWeather.wind.speed}
          />
        )}
        
        <Header 
          onSearch={handleSearch} 
          isLoading={isLoading} 
          hasWeatherData={!!weatherData}
        />

        <ContentSection>
          {isLoading && !weatherData && <Loading message="Loading weather data..." />}
          {weatherData && currentWeather && <WeatherDisplay weatherData={weatherData} currentWeather={currentWeather} />}
          {error && <ErrorMessage message={error} onClose={handleRetry} />}
        </ContentSection>
      </AppContainer>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TemperatureProvider>
        <AppContent />
      </TemperatureProvider>
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentSection = styled.main`
  flex: 1;
  width: 100%;
`;

export default App;
