import React, { useState } from 'react';
import styled from 'styled-components';
import { MapPin, Search } from 'lucide-react';
import Toast from './Toast';

interface SearchFormProps {
    onSearch: (city: string) => void;
    isLoading?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading = false }) => {
    const [city, setCity] = useState('');
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        
        const trimmedCity = city.trim();
        
        // Validation
        if (!trimmedCity) {
            setValidationError('City name is required');
            return;
        }
        
        if (trimmedCity.length < 2) {
            setValidationError('City name must be at least 2 characters');
            return;
        }
        
        if (trimmedCity.length > 50) {
            setValidationError('City name must be less than 50 characters');
            return;
        }
        
        setValidationError(null);
        onSearch(trimmedCity);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <FormContainer>
            <SearchBarWrapper>
                <StyledMapPin size={20} />
                <StyledInput
                    type="text"
                    placeholder="Search for a city..."
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value);
                        if (validationError) setValidationError(null);
                    }}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                />
                <SearchButton
                    type="button"
                    onClick={() => handleSubmit()}
                    disabled={isLoading}
                >
                    <Search size={20} />
                </SearchButton>
            </SearchBarWrapper>
            {validationError && (
                <Toast 
                    message={validationError} 
                    type="warning"
                    onClose={() => setValidationError(null)}
                    autoClose={true}
                    duration={4000}
                />
            )}
        </FormContainer>
    );
};


const FormContainer = styled.div`
  width: 100%;
`;

const SearchBarWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-radius: 50px;
  padding: 0.4rem 0.4rem 0.4rem 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:focus-within {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.15), 0 0 0 2px rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 0.35rem 0.35rem 0.35rem 0.9rem;
  }
`;

const StyledMapPin = styled(MapPin)`
  color: rgba(255, 255, 255, 0.7);
  flex-shrink: 0;
  margin-right: 0.75rem;
  transition: color 0.2s ease;

  ${SearchBarWrapper}:focus-within & {
    color: rgba(255, 255, 255, 0.95);
  }
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 0.6rem 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.95);
  font-family: 'Inter', sans-serif;

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.55rem 0.5rem;
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
  backdrop-filter: blur(10px);
  color: rgba(255, 255, 255, 0.95);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3));
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 2.25rem;
    height: 2.25rem;
  }
`;

export default SearchForm;
