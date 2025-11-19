# Component Templates

## Basic Functional Component

```tsx
import React from 'react';
import styled from 'styled-components';

interface ComponentNameProps {
  // Add your props here
  title?: string;
}

const ComponentName: React.FC<ComponentNameProps> = ({ title }) => {
  return (
    <Container>
      <h2>{title}</h2>
    </Container>
  );
};

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export default ComponentName;
```

## Component with State

```tsx
import React, { useState } from 'react';
import styled from 'styled-components';

interface ComponentNameProps {
  initialValue?: string;
}

const ComponentName: React.FC<ComponentNameProps> = ({ initialValue = '' }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container>
      <input value={value} onChange={(e) => handleChange(e.target.value)} />
    </Container>
  );
};

const Container = styled.div`
  /* Your styles */
`;

export default ComponentName;
```

## Component with API Call

```tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface DataType {
  id: number;
  name: string;
}

const ComponentName: React.FC = () => {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Your API call here
        const response = await fetch('your-api-endpoint');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return (
    <Container>
      <h2>{data.name}</h2>
    </Container>
  );
};

const Container = styled.div`
  /* Your styles */
`;

export default ComponentName;
```

## Styled Component Patterns

### Conditional Styling

```tsx
const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ variant, theme }) => 
    variant === 'secondary' ? theme.colors.secondary : theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;
```

### Responsive Styling

```tsx
const ResponsiveContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ theme }) => theme.spacing.lg};
    max-width: 1200px;
    margin: 0 auto;
  }
`;
```

### With Animation

```tsx
import { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedDiv = styled.div`
  animation: ${fadeIn} 0.3s ease-in;
`;
```

## Custom Hook Template

```tsx
import { useState, useEffect } from 'react';

export const useCustomHook = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // Side effects here
  }, [value]);

  return { value, setValue };
};
```

## Context Template

```tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MyContextType {
  value: string;
  updateValue: (newValue: string) => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
};

interface MyProviderProps {
  children: ReactNode;
}

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [value, setValue] = useState('');

  const updateValue = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <MyContext.Provider value={{ value, updateValue }}>
      {children}
    </MyContext.Provider>
  );
};
```

## Form with Formik Template

```tsx
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too short')
    .required('Required'),
});

const MyForm: React.FC = () => {
  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <StyledForm>
          <Field name="email" type="email" placeholder="Email" />
          {errors.email && touched.email && <Error>{errors.email}</Error>}
          
          <Field name="password" type="password" placeholder="Password" />
          {errors.password && touched.password && <Error>{errors.password}</Error>}
          
          <button type="submit">Submit</button>
        </StyledForm>
      )}
    </Formik>
  );
};

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Error = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.875rem;
`;

export default MyForm;
```

---

## Quick Reference

### Import Examples
```tsx
// Component
import ComponentName from './components/ComponentName';

// Multiple exports
import { SearchForm, Loading } from './components';

// Context
import { useTemperature } from './context/TemperatureContext';

// Service
import { getWeatherForecast } from './services/weatherApi';

// Types
import { WeatherData } from './types/weather.types';

// Utils
import { formatTemperature } from './utils/helpers';
```

### TypeScript Interfaces
```tsx
// Props interface
interface Props {
  title: string;
  count?: number; // Optional
  onClick: () => void; // Function
  items: string[]; // Array
  data: { id: number; name: string }; // Object
}

// State interface
interface State {
  loading: boolean;
  error: string | null;
  data: DataType[];
}
```

---

Use these templates as a starting point for creating new components in your weather app!
