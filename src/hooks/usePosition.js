import { useState, useEffect } from 'react';

export function usePosition(initial) {
  const [position, setPosition] = useState([initial]);
  const [error, setError] = useState(null);

  const onError = (err) => {
    setError(err.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      setError('Геолокация не поддерживается браузером');
      return;
    }

    geo.getCurrentPosition(
        (coords) => {
          const { latitude, longitude } = coords.coords;
          setPosition([latitude, longitude] );
        },
        (err) => {
          onError('Ошибка получения геолокации:', err);
        }
      );
  }, []);

  return { position, error };
}
