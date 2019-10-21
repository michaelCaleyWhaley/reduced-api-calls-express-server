export const fetchWeather = async location => {
  const response = await fetch("/api/weather", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(location),
  });
  const weatherJson = await response.json();
  setWeatherLocalStorage(weatherJson);
  return weatherJson;
};

export const getWeatherLocalStorage = (latitude, longitude) => {
  const localStorageWeather = localStorage.getItem("weather");
  if (!localStorageWeather) {
    return false;
  }
  const parsedLocalStorageWeather = JSON.parse(localStorageWeather);
  const { lat, lon } = parsedLocalStorageWeather.coord;
  if (lon.toString() !== longitude || lat.toString() !== latitude) {
    return false;
  }
  return parsedLocalStorageWeather;
};

export const setWeatherLocalStorage = weather => {
  localStorage.setItem("weather", weather);
};
