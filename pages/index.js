import React, { Component } from "react";
import Link from "next/link";
import { getWeatherLocalStorage, fetchWeather } from "./helpers/helpers";

class Index extends Component {
  constructor() {
    super();

    this.state = {
      weather: undefined,
    };
  }

  getWeather = async (latitude, longitude) => {
    let weather = getWeatherLocalStorage(latitude, longitude);

    if (!weather) {
      weather = await fetchWeather({
        lat: latitude,
        long: longitude,
      });
    }
    return weather;
  };

  handleClick = async () => {
    navigator.geolocation.getCurrentPosition(
      async success => {
        const { latitude, longitude } = success.coords;
        const weather = await this.getWeather(latitude, longitude);
        this.setState({ weather });
      },
      error => {},
    );
  };

  render() {
    const { weather } = this.state;
    return (
      <div>
        <h1>API app</h1>

        <button onClick={this.handleClick}>fetch weather</button>

        {weather && (
          <div>
            <h2>Weather in {weather.name}</h2>
            <p>{weather.main.temp}</p>
            <p>{weather.weather[0].description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Index;
