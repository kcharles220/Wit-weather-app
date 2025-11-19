import React from 'react';
import styled from 'styled-components';
import { useTemperature } from '../context/TemperatureContext';

const TemperatureToggle: React.FC = () => {
  const { unit, toggleUnit } = useTemperature();

  return (
    <ToggleButton onClick={toggleUnit}>
      <UnitText>{unit === 'celsius' ? '°C' : '°F'}</UnitText>
    </ToggleButton>
  );
};

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background: none;
border: none;
  cursor: pointer;

 

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

const UnitText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  user-select: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.25rem;
  }
`;

export default TemperatureToggle;
