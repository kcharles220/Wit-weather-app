import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchForm from './SearchForm';
import TemperatureToggle from './TemperatureToggle';

interface HeaderProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
  hasWeatherData: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSearch, isLoading, hasWeatherData }) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <SearchSection>
          <SearchForm onSearch={onSearch} isLoading={isLoading} />
        </SearchSection>
        
        {hasWeatherData && (
          <ToggleSection>
            <TemperatureToggle />
          </ToggleSection>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background: none;
  

  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 1rem;
    padding: 0.75rem 1rem;
  }
`;

const SearchSection = styled.div`
  flex: 1;
  max-width: 600px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    max-width: 100%;
  }
`;

const ToggleSection = styled.div`
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export default Header;
