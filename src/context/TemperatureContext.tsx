import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TemperatureUnit } from '../types/weather.types';

interface TemperatureContextType {
  unit: TemperatureUnit;
  toggleUnit: () => void;
  setUnit: (unit: TemperatureUnit) => void;
}

const TemperatureContext = createContext<TemperatureContextType | undefined>(undefined);

export const useTemperature = (): TemperatureContextType => {
  const context = useContext(TemperatureContext);
  if (!context) {
    throw new Error('useTemperature must be used within a TemperatureProvider');
  }
  return context;
};

interface TemperatureProviderProps {
  children: ReactNode;
}

export const TemperatureProvider: React.FC<TemperatureProviderProps> = ({ children }) => {
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  return (
    <TemperatureContext.Provider value={{ unit, toggleUnit, setUnit }}>
      {children}
    </TemperatureContext.Provider>
  );
};
