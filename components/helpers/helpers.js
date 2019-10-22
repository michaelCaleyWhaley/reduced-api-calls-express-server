const numberDifference = function(a, b) {
  return Math.abs(a - b);
};

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
  const weatherString = await response.json();
  const weatherParsed = JSON.parse(weatherString.weather);
  setWeatherLocalStorage(weatherParsed);
  return weatherParsed;
};

export const getWeatherLocalStorage = (latitude, longitude) => {
  const localStorageWeather = localStorage.getItem("weather");
  if (!localStorageWeather) {
    return false;
  }
  const parsedLocalStorageWeather = JSON.parse(localStorageWeather);
  const { lat, lon } = parsedLocalStorageWeather.coord;
  if (
    numberDifference(latitude, lat) > 2 ||
    numberDifference(longitude, lon) > 2
  ) {
    return false;
  }

  const timeDifference = numberDifference(
    parsedLocalStorageWeather.date,
    Date.now(),
  );
  if (timeDifference > 3600000) {
    return false;
  }
  return parsedLocalStorageWeather;
};

export const setWeatherLocalStorage = weather => {
  localStorage.setItem(
    "weather",
    JSON.stringify({ ...weather, date: Date.now() }),
  );
};
