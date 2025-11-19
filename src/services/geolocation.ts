interface GeolocationCoordinates {
  lat: number;
  lon: number;
}

/**
 * Get user's current position using browser geolocation
 */
export const getUserCoordinates = (): Promise<GeolocationCoordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      {
        timeout: 5000, // Reduced timeout to 5 seconds
        maximumAge: 0,
      }
    );
  });
};

/**
 * New York coordinates as default fallback
 */
export const NYC_COORDINATES: GeolocationCoordinates = {
  lat: 40.7128,
  lon: -74.0060,
};
