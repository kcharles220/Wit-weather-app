# Project Setup Guide

## What Has Been Created

This React TypeScript weather app has been set up with a professional structure following best practices.

### Installed Dependencies

**Production Dependencies:**
- `react` & `react-dom` - Core React libraries
- `typescript` - TypeScript support
- `styled-components` - CSS-in-JS styling solution
- `formik` - Form state management
- `yup` - Schema validation
- `axios` - HTTP client for API calls

**Development Dependencies:**
- `@types/styled-components` - TypeScript definitions for styled-components
- All Create React App dependencies (react-scripts, testing-library, etc.)

### Project Architecture

```
src/
├── components/              # Reusable React components
│   ├── SearchForm.tsx      # City search form with validation
│   ├── WeatherDisplay.tsx  # Main weather display component
│   ├── TemperatureToggle.tsx # Celsius/Fahrenheit toggle
│   ├── Loading.tsx         # Loading spinner component
│   └── ErrorMessage.tsx    # Error display component
│
├── context/                # React Context for global state
│   └── TemperatureContext.tsx # Temperature unit state management
│
├── services/               # External API integration
│   └── weatherApi.ts      # OpenWeatherMap API functions
│
├── types/                  # TypeScript type definitions
│   └── weather.types.ts   # Weather data interfaces
│
├── utils/                  # Helper/utility functions
│   └── helpers.ts         # Temperature conversion, formatting, etc.
│
├── styles/                 # Global styles and theming
│   ├── GlobalStyles.ts    # Global CSS and theme definition
│   └── styled.d.ts        # TypeScript declaration for theme
│
├── hooks/                  # Custom React hooks (ready for expansion)
│
├── App.tsx                # Main application component
└── index.tsx              # Application entry point
```

## Next Steps

### 1. Get Your API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. After signing in, go to "API keys" section
4. Copy your API key (or generate a new one)
5. **Important**: New API keys may take up to 2 hours to activate

### 2. Configure Environment Variables

Open the `.env` file in the root directory and add your API key:

```env
REACT_APP_OPENWEATHER_API_KEY=paste_your_api_key_here
```

**Example:**
```env
REACT_APP_OPENWEATHER_API_KEY=abc123def456ghi789jkl012mno345pq
```

### 3. Start Development

Run the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

### 4. Test the App

1. Wait for the page to load
2. Enter a city name (e.g., "London", "New York", "Tokyo")
3. Click "Search"
4. View the 5-day weather forecast
5. Toggle between Celsius and Fahrenheit

## Component Overview

### SearchForm Component
- Uses Formik for form state management
- Yup for validation (min 2 chars, max 50 chars)
- Displays validation errors
- Disables while loading

### WeatherDisplay Component
- Shows current weather with large temperature display
- Weather icon from OpenWeatherMap
- Detailed info: feels like, humidity, wind speed
- 5-day forecast cards in a responsive grid
- Adapts to mobile, tablet, and desktop screens

### TemperatureToggle Component
- Celsius/Fahrenheit switcher
- Uses React Context to update temperature globally
- No page refresh needed - all temperatures update instantly

### Loading Component
- Animated spinner
- Shows while fetching data
- Clean, professional look

### ErrorMessage Component
- Contextual error messages
- Retry button for user convenience
- Explains what went wrong (city not found, API issues, etc.)

## Architecture Decisions

### Why Styled Components?
- **Scoped styles** - No CSS class name conflicts
- **Dynamic styling** - Use props and theme
- **TypeScript support** - Type-safe styling
- **No separate CSS files** - Colocated with components

### Why Formik + Yup?
- **Industry standard** for React forms
- **Declarative validation** - Easy to read and maintain
- **Built-in error handling** - Simplifies form logic
- **TypeScript support** - Type-safe forms

### Why Context API?
- **Simple global state** for temperature unit
- **No external library needed** (like Redux)
- **React built-in** - No extra dependencies
- **Perfect for this use case** - Small, simple state

### Why TypeScript?
- **Catch errors early** - Before runtime
- **Better IDE support** - Autocomplete, refactoring
- **Self-documenting** - Types explain the code
- **Easier refactoring** - Rename with confidence

## Development Guidelines

### Adding a New Component

1. Create file in `src/components/ComponentName.tsx`
2. Use functional component with TypeScript:
```tsx
import React from 'react';
import styled from 'styled-components';

interface ComponentNameProps {
  // Define props here
}

const ComponentName: React.FC<ComponentNameProps> = ({ }) => {
  return (
    <Container>
      {/* Component JSX */}
    </Container>
  );
};

const Container = styled.div`
  /* Styled components CSS */
`;

export default ComponentName;
```

### Using the Theme

Access theme values in styled components:
```tsx
const StyledDiv = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;
```

### API Error Handling

The `weatherApi.ts` service handles common errors:
- **404** - City not found
- **401** - Invalid API key
- **429** - Too many requests
- **Network errors** - Connection issues

### Adding Types

Add new interfaces to `src/types/` directory:
```tsx
export interface YourType {
  property: string;
  number: number;
}
```

## Extra Challenges - Implementation Guide

### 1. Temperature Graph (+3 points)

**Recommended library:** Recharts (React-friendly)

```bash
npm install recharts
```

Create `src/components/TemperatureChart.tsx`:
- Extract temperature data from 5-day forecast
- Create line chart showing temperature over time
- Make it responsive
- Use theme colors

### 2. Temperature Map (+2 points)

**Recommended library:** React Leaflet

```bash
npm install leaflet react-leaflet
npm install --save-dev @types/leaflet
```

Create `src/components/WeatherMap.tsx`:
- Show map centered on city coordinates
- Display temperature overlay
- Add markers for the selected city
- Make it responsive

## Common Issues & Solutions

### Issue: API Key Not Working
**Solution:** 
- Check if key is in `.env` file
- Restart development server
- Wait 2 hours for new keys to activate

### Issue: "Module not found" errors
**Solution:**
```bash
npm install
```

### Issue: TypeScript errors in styled-components
**Solution:** The `styled.d.ts` file should fix this. If not, restart VS Code.

### Issue: Changes not showing
**Solution:**
- Clear browser cache (Ctrl+Shift+R)
- Check browser console for errors
- Restart development server

## Performance Tips

1. **Lazy loading:** Use React.lazy() for route-based code splitting
2. **Memoization:** Use React.memo() for expensive components
3. **Debouncing:** Add debounce to search input (future enhancement)
4. **Image optimization:** Use WebP format for better performance

## Testing Checklist

- [ ] Search for valid city names
- [ ] Search for invalid city names
- [ ] Toggle temperature units
- [ ] Check responsive design on mobile
- [ ] Check responsive design on tablet
- [ ] Verify error messages
- [ ] Test with slow network (DevTools throttling)
- [ ] Check accessibility (keyboard navigation)

## Deployment

When ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

Deploy to:
- **Vercel** (recommended for React apps)
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**

## Resources

- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Styled Components Docs](https://styled-components.com/)
- [Formik Docs](https://formik.org/)
- [OpenWeatherMap API Docs](https://openweathermap.org/api)

---

**Happy Coding! 🚀**
