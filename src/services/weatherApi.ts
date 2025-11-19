import axios from 'axios';
import { WeatherData, CurrentWeatherData } from '../types/weather.types';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY || 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetch current weather for a given city
 * @param city - City name
 * @param units - Temperature units (metric for Celsius, imperial for Fahrenheit)
 * @returns Promise with current weather data
 */
export const getCurrentWeather = async (
  city: string,
  units: 'metric' | 'imperial' = 'metric'
): Promise<CurrentWeatherData> => {
  try {
    const response = await axios.get<CurrentWeatherData>(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: units,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      } else if (error.response?.status === 401) {
        throw new Error('API key is invalid. Please check your configuration.');
      } else if (error.response?.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      } else {
        throw new Error(error.response?.data?.message || 'Failed to fetch weather data. Please try again.');
      }
    }
    throw new Error('Network error. Please check your internet connection.');
  }
};

/**
 * Fetch current weather using coordinates
 * @param lat - Latitude
 * @param lon - Longitude
 * @param units - Temperature units (metric for Celsius, imperial for Fahrenheit)
 * @returns Promise with current weather data
 */
export const getCurrentWeatherByCoords = async (
  lat: number,
  lon: number,
  units: 'metric' | 'imperial' = 'metric'
): Promise<CurrentWeatherData> => {
  try {
    const response = await axios.get<CurrentWeatherData>(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: units,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('API key is invalid. Please check your configuration.');
      } else if (error.response?.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      } else {
        throw new Error(error.response?.data?.message || 'Failed to fetch weather data. Please try again.');
      }
    }
    throw new Error('Network error. Please check your internet connection.');
  }
};

/**
 * Fetch 5-day weather forecast for a given city
 * @param city - City name
 * @param units - Temperature units (metric for Celsius, imperial for Fahrenheit)
 * @returns Promise with weather data
 */
export const getWeatherForecast = async (
  city: string,
  units: 'metric' | 'imperial' = 'metric'
): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: units,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      } else if (error.response?.status === 401) {
        throw new Error('API key is invalid. Please check your configuration.');
      } else if (error.response?.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      } else {
        throw new Error(error.response?.data?.message || 'Failed to fetch weather data. Please try again.');
      }
    }
    throw new Error('Network error. Please check your internet connection.');
  }
};

/**
 * Fetch 5-day weather forecast using coordinates
 * @param lat - Latitude
 * @param lon - Longitude
 * @param units - Temperature units (metric for Celsius, imperial for Fahrenheit)
 * @returns Promise with weather data
 */
export const getWeatherForecastByCoords = async (
  lat: number,
  lon: number,
  units: 'metric' | 'imperial' = 'metric'
): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: units,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('API key is invalid. Please check your configuration.');
      } else if (error.response?.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      } else {
        throw new Error(error.response?.data?.message || 'Failed to fetch weather data. Please try again.');
      }
    }
    throw new Error('Network error. Please check your internet connection.');
  }
};

/**
 * Get weather icon URL
 * @param iconCode - Icon code from API response
 * @returns URL to the weather icon
 */
export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
