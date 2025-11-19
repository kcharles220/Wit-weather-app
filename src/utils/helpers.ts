import { TemperatureUnit } from '../types/weather.types';

/**
 * Convert temperature between Celsius and Fahrenheit
 * @param temp - Temperature value
 * @param from - Current unit
 * @param to - Target unit
 * @returns Converted temperature
 */
export const convertTemperature = (
  temp: number,
  from: TemperatureUnit,
  to: TemperatureUnit
): number => {
  if (from === to) return temp;
  
  if (from === 'celsius' && to === 'fahrenheit') {
    return (temp * 9) / 5 + 32;
  } else {
    return ((temp - 32) * 5) / 9;
  }
};

/**
 * Format temperature with unit symbol and conversion
 * API data is always in Celsius (metric), so we convert if needed
 * @param temp - Temperature value in Celsius
 * @param unit - Desired temperature unit
 * @returns Formatted temperature string
 */
export const formatTemperature = (temp: number, unit: TemperatureUnit): string => {
  let displayTemp = temp;
  
  // Convert from Celsius to Fahrenheit if needed
  if (unit === 'fahrenheit') {
    displayTemp = (temp * 9) / 5 + 32;
  }
  
  const rounded = Math.round(displayTemp);
  const symbol = unit === 'celsius' ? '°C' : '°F';
  return `${rounded}${symbol}`;
};

/**
 * Group forecast data by day
 * @param list - Array of weather list items
 * @returns Object with dates as keys and arrays of weather items
 */
export const groupForecastByDay = (list: any[]): { [key: string]: any[] } => {
  return list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
};

/**
 * Get formatted date string
 * @param timestamp - Unix timestamp
 * @returns Formatted date string
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Get formatted time string
 * @param timestamp - Unix timestamp
 * @returns Formatted time string
 */
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
