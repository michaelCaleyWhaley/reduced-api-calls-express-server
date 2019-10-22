import React, { Component } from "react";
import Layout from "../components/Layout";
import {
  getWeatherLocalStorage,
  fetchWeather,
} from "../components/helpers/helpers";

import "./styles/index.scss";

class Index extends Component {
  constructor() {
    super();

    this.state = {
      weather: undefined,
      loading: false,
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
    this.setState({ loading: true, weather: false });
    navigator.geolocation.getCurrentPosition(
      async success => {
        const { latitude, longitude } = success.coords;
        const weather = await this.getWeather(latitude, longitude);
        this.setState({ weather, loading: false });
      },
      error => {
        this.setState({ loading: false });
      },
    );
  };

  render() {
    const { weather, loading } = this.state;
    return (
      <Layout>
        <h1>LOCAL WEATHER</h1>

        <button className="weather-button" onClick={this.handleClick}>
          fetch weather
          <img
            className="weather-button__icon"
            src="/img/current-location.png"
            alt="current location"
          />
        </button>

        {weather && (
          <div>
            <h2>Weather in {weather.name}</h2>
            <p>{weather.main.temp} &#176;</p>
            <p>{weather.weather[0].description}</p>
          </div>
        )}
        {loading && (
          <div>
            <h2>LOADING...</h2>
          </div>
        )}
      </Layout>
    );
  }
}

export default Index;
