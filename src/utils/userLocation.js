export const getUserLocation = () => {
    if (navigator.geolocation) {
      let coords = [0, 0];
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          coords = [ latitude, longitude];
        },
        (error) => {
          console.error('Ошибка получения геолокации:', error);
        }
      );
      return coords;
    }
    else {
      console.error('Работа с геолокацией не поддерживается браузером.');
    }
  };