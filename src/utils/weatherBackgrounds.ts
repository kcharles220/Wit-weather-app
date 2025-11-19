/**
 * Get background gradient based on weather condition and time of day
 */
export const getWeatherBackground = (
  weatherMain: string,
  weatherDescription: string,
  isDay: boolean = true
): string => {
  const condition = weatherMain.toLowerCase();
  const description = weatherDescription.toLowerCase();

  // Night backgrounds
  if (!isDay) {
    if (condition.includes('clear')) {
      return 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)';
    }
    if (condition.includes('cloud')) {
      return 'linear-gradient(135deg, #1a2a6c 0%, #2c3e50 50%, #34495e 100%)';
    }
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return 'linear-gradient(135deg, #1f1c2c 0%, #2c3e50 50%, #34495e 100%)';
    }
    if (condition.includes('thunder')) {
      return 'linear-gradient(135deg, #141e30 0%, #243b55 100%)';
    }
    if (condition.includes('snow')) {
      return 'linear-gradient(135deg, #2c3e50 0%, #3f5871 50%, #516b8b 100%)';
    }
    return 'linear-gradient(135deg, #232526 0%, #414345 100%)';
  }

  // Day backgrounds
  if (condition.includes('clear')) {
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)';
  }

  if (condition.includes('cloud')) {
    if (description.includes('few') || description.includes('scattered')) {
      return 'linear-gradient(135deg, #a8c0ff 0%, #6b73ff 50%, #9795f0 100%)';
    }
    if (description.includes('broken') || description.includes('overcast')) {
      return 'linear-gradient(135deg, #bdc3c7 0%, #8e9eab 50%, #718093 100%)';
    }
    return 'linear-gradient(135deg, #c9d6ff 0%, #a1c4fd 50%, #92b4ec 100%)';
  }

  if (condition.includes('rain')) {
    if (description.includes('light')) {
      return 'linear-gradient(135deg, #5f72bd 0%, #7f8c9f 50%, #8e9eab 100%)';
    }
    return 'linear-gradient(135deg, #3a6073 0%, #4a7c8f 50%, #5b8fa3 100%)';
  }

  if (condition.includes('drizzle')) {
    return 'linear-gradient(135deg, #6a85b6 0%, #7e9eb8 50%, #92b5c1 100%)';
  }

  if (condition.includes('thunder')) {
    return 'linear-gradient(135deg, #283048 0%, #3f5169 50%, #4e6388 100%)';
  }

  if (condition.includes('snow')) {
    return 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 50%, #dfe9f3 100%)';
  }

  if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze')) {
    return 'linear-gradient(135deg, #d7dde8 0%, #b8c6db 50%, #a2b1c6 100%)';
  }

  if (condition.includes('dust') || condition.includes('sand') || condition.includes('ash')) {
    return 'linear-gradient(135deg, #d4a574 0%, #b8936f 50%, #9d7f6a 100%)';
  }

  if (condition.includes('smoke')) {
    return 'linear-gradient(135deg, #757f9a 0%, #878ea0 50%, #9da5b4 100%)';
  }

  // Default
  return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
};

/**
 * Determine if it's day or night based on pod (part of day) from API
 */
export const isDayTime = (pod?: string): boolean => {
  if (!pod) {
    // Fallback to checking local time
    const hour = new Date().getHours();
    return hour >= 6 && hour < 20;
  }
  return pod === 'd';
};
