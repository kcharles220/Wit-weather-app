# Weather Forecast App 🌤️# Getting Started with Create React App



A responsive React TypeScript weather application that provides 5-day weather forecasts for any city using the OpenWeatherMap API.This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



## 🎯 Challenge Goals## Available Scripts



This project is developed for the WIT Web Developer challenge, demonstrating:In the project directory, you can run:

- Learning and implementing React with TypeScript

- Building responsive, user-friendly interfaces### `npm start`

- Working with external APIs

- Following best practices in modern web developmentRuns the app in the development mode.\

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## ✨ Features

The page will reload if you make edits.\

### Core FeaturesYou will also see any lint errors in the console.

- ✅ **5-Day Weather Forecast**: Get detailed weather predictions for any city

- ✅ **Current Temperature Display**: Real-time temperature information### `npm test`

- ✅ **Error Handling**: Contextualized error messages for better UX

- ✅ **Responsive Design**: Optimized for desktop, tablet, and mobile devicesLaunches the test runner in the interactive watch mode.\

- ✅ **Form Validation**: Using Formik + Yup for robust input validationSee the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.



### Extra Challenges Implemented### `npm run build`

- ✅ **Temperature Unit Toggle** (+1): Switch between Celsius and Fahrenheit without page refresh

- 🚧 **Temperature Graph** (+3): Visualize temperature evolution (To be implemented)Builds the app for production to the `build` folder.\

- 🚧 **Temperature Map** (+2): Interactive map centered on selected city (To be implemented)It correctly bundles React in production mode and optimizes the build for the best performance.



## 🛠️ Technologies UsedThe build is minified and the filenames include the hashes.\

Your app is ready to be deployed!

- **React 18** - UI library

- **TypeScript** - Type safety and better developer experienceSee the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

- **Styled Components** - CSS-in-JS for component styling

- **Formik + Yup** - Form handling and validation### `npm run eject`

- **Axios** - HTTP client for API requests

- **OpenWeatherMap API** - Weather data provider**Note: this is a one-way operation. Once you `eject`, you can’t go back!**



## 📁 Project StructureIf you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.



```Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

weather-app/

├── public/You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

├── src/

│   ├── components/          # React components## Learn More

│   │   ├── SearchForm.tsx

│   │   ├── WeatherDisplay.tsxYou can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

│   │   ├── TemperatureToggle.tsx

│   │   ├── Loading.tsxTo learn React, check out the [React documentation](https://reactjs.org/).

│   │   └── ErrorMessage.tsx
│   ├── context/            # React Context providers
│   │   └── TemperatureContext.tsx
│   ├── hooks/              # Custom React hooks (for future use)
│   ├── services/           # API services
│   │   └── weatherApi.ts
│   ├── styles/             # Global styles and theme
│   │   ├── GlobalStyles.ts
│   │   └── styled.d.ts
│   ├── types/              # TypeScript type definitions
│   │   └── weather.types.ts
│   ├── utils/              # Helper functions
│   │   └── helpers.ts
│   ├── App.tsx             # Main app component
│   └── index.tsx           # App entry point
├── .env                    # Environment variables
├── .env.example            # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key (free tier available)

### Installation

1. **Install dependencies** (already done if you set up the project)
   ```bash
   npm install
   ```

2. **Get your OpenWeatherMap API key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key

3. **Configure environment variables**
   - Open the `.env` file in the root directory
   - Add your API key:
   ```
   REACT_APP_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`

## 📱 Responsive Design

The app is fully responsive and optimized for:
- 📱 **Mobile**: < 480px
- 📱 **Tablet**: 768px - 1024px
- 💻 **Desktop**: > 1024px

## 🎨 Design Decisions

### UI/UX Considerations
- **Clean, modern interface** with gradient backgrounds
- **Clear visual hierarchy** for weather information
- **Smooth transitions** and hover effects
- **Loading states** to keep users informed
- **Descriptive error messages** for better user guidance
- **Accessible color contrasts** for readability

### Code Quality
- **TypeScript** for type safety and better IDE support
- **Function components** with React Hooks
- **Styled Components** for scoped, maintainable CSS
- **Separation of concerns** with clear folder structure
- **Reusable components** for better maintainability
- **Context API** for state management

## 🔧 Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (not recommended)

## 🎯 Future Enhancements

- [ ] Add temperature graph visualization (Chart.js or Recharts)
- [ ] Integrate interactive temperature map (Leaflet or Google Maps)
- [ ] Add weather forecast for multiple cities
- [ ] Implement local storage for recent searches
- [ ] Add dark/light theme toggle
- [ ] Include hourly forecast details
- [ ] Add weather alerts and warnings
- [ ] Implement geolocation for automatic city detection

## 📊 Performance Optimizations

- Lazy loading of components (can be added)
- Debounced API calls to reduce requests
- Optimized images and assets
- Code splitting for faster initial load

## 🐛 Troubleshooting

### API Key Issues
If you see "API key is invalid" error:
- Ensure your `.env` file contains the correct API key
- Restart the development server after adding the API key
- Wait a few hours after generating a new API key (activation time)

### CORS Issues
If you encounter CORS errors:
- The OpenWeatherMap API should work without CORS issues
- If problems persist, check your firewall/network settings

## 📝 License

This project is created for educational purposes as part of the WIT challenge.

## 👨‍💻 Development Time

**Estimated development time**: [To be filled upon completion]

## 🙏 Acknowledgments

- OpenWeatherMap for providing the weather API
- React and TypeScript communities for excellent documentation
- WIT for the challenge opportunity

---

**Note**: This is a work in progress. The core functionality is complete, with extra challenges to be implemented.
