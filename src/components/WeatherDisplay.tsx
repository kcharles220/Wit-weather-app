import React from 'react';
import styled from 'styled-components';
import { WeatherData, CurrentWeatherData } from '../types/weather.types';
import { useTemperature } from '../context/TemperatureContext';
import { formatTemperature, formatDate } from '../utils/helpers';
import { getWeatherIconUrl } from '../services/weatherApi';

interface WeatherDisplayProps {
  weatherData: WeatherData;
  currentWeather: CurrentWeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, currentWeather }) => {
  const { unit } = useTemperature();

  // Group forecast by day and calculate min/max temperatures
  const getDailyForecasts = () => {
    const dailyData: { [key: string]: any } = {};
    
    weatherData.list.forEach((item) => {
      // Get date without time (YYYY-MM-DD)
      const date = item.dt_txt.split(' ')[0];
      
      if (!dailyData[date]) {
        dailyData[date] = {
          date: date,
          dt: item.dt,
          temps: [item.main.temp],
          temp_min: item.main.temp,
          temp_max: item.main.temp,
          weather: item.weather[0],
          // Use midday data for icon if available, otherwise first entry
          middayData: null,
        };
      } else {
        dailyData[date].temps.push(item.main.temp);
        dailyData[date].temp_min = Math.min(dailyData[date].temp_min, item.main.temp);
        dailyData[date].temp_max = Math.max(dailyData[date].temp_max, item.main.temp);
      }
      
      // Prefer data from midday (12:00-15:00) for the icon
      const hour = parseInt(item.dt_txt.split(' ')[1].split(':')[0]);
      if (hour >= 12 && hour <= 15) {
        dailyData[date].middayData = item;
        dailyData[date].weather = item.weather[0];
      }
    });
    
    // Convert to array and take first 5 days
    return Object.values(dailyData).slice(0, 5);
  };

  const dailyForecasts = getDailyForecasts();

  return (
    <Container>
      {/* Current Weather */}
      <CurrentWeatherCard>
        <CityName>
          {currentWeather.name}, {currentWeather.sys.country}
        </CityName>
        <CurrentTemp>{formatTemperature(currentWeather.main.temp, unit)}</CurrentTemp>
        <WeatherIcon
          src={getWeatherIconUrl(currentWeather.weather[0].icon)}
          alt={currentWeather.weather[0].description}
        />
        <WeatherDescription>{currentWeather.weather[0].description}</WeatherDescription>
        <WeatherDetails>
          <DetailItem>
            <DetailLabel>Feels like:</DetailLabel>
            <DetailValue>{formatTemperature(currentWeather.main.feels_like, unit)}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Humidity:</DetailLabel>
            <DetailValue>{currentWeather.main.humidity}%</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Wind:</DetailLabel>
            <DetailValue>{currentWeather.wind.speed} m/s</DetailValue>
          </DetailItem>
        </WeatherDetails>
      </CurrentWeatherCard>

      {/* 5-Day Forecast */}
      <ForecastSection>
        <SectionTitle>5-Day Forecast</SectionTitle>
        <ForecastGrid>
          {dailyForecasts.map((forecast: any, index) => (
            <ForecastCard key={index}>
              <ForecastDay>{formatDate(forecast.dt)}</ForecastDay>
              <ForecastIcon
                src={getWeatherIconUrl(forecast.weather.icon)}
                alt={forecast.weather.description}
              />
              <ForecastTemp>
                <TempHigh>{formatTemperature(forecast.temp_max, unit)}</TempHigh>
                <TempLow>{formatTemperature(forecast.temp_min, unit)}</TempLow>
              </ForecastTemp>
              <ForecastDescription>{forecast.weather.description}</ForecastDescription>
            </ForecastCard>
          ))}
        </ForecastGrid>
      </ForecastSection>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1.5rem 1rem;
  }
`;

const CurrentWeatherCard = styled.div`
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
  padding: 3rem;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  text-align: center;
  margin-bottom: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 2rem 1.5rem;
  }
`;

const CityName = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  font-weight: 700;
  letter-spacing: -0.5px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const CurrentTemp = styled.div`
  font-size: 5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 1rem 0;
  line-height: 1;
  letter-spacing: -2px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 3.5rem;
  }
`;

const WeatherIcon = styled.img`
  width: 140px;
  height: 140px;
  margin: 0.5rem auto;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100px;
    height: 100px;
  }
`;

const WeatherDescription = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textLight};
  text-transform: capitalize;
  margin-bottom: 2rem;
  font-weight: 500;
`;

const WeatherDetails = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 1.5rem;
  }
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

const DetailLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DetailValue = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const ForecastSection = styled.div`
  margin-top: 2.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.5px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.25rem;
    text-align: center;
  }
`;

const ForecastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.25rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ForecastCard = styled.div`
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1.75rem 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const ForecastDay = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.md};
`;

const ForecastIcon = styled.img`
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

const ForecastTemp = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: baseline;
`;

const TempHigh = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const TempLow = styled.span`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 500;
`;

const ForecastDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textLight};
  text-transform: capitalize;
  text-align: center;
  font-weight: 500;
`;

export default WeatherDisplay;
