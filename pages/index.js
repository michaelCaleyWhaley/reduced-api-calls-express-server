import React, { Component } from "react";
import Link from "next/link";

class Index extends Component {
  constructor() {
    super();
  }

  makeWeatherRequest = async location => {
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

    return await response.json();
  };

  handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      async success => {
        const { latitude, longitude } = success.coords;
        const { weather } = await this.makeWeatherRequest({
          lat: latitude,
          long: longitude,
        });
        console.log(`weather: `, JSON.parse(weather));

        // write weather to local storage
        // emit event for dom to get weather from local storage
        // prevent fetch if weather already present
      },
      error => {},
    );

    // console.log(`JSON.parse(weather): `, JSON.parse(weather));
  };

  render() {
    return (
      <div>
        <h1>API app</h1>

        <button onClick={this.handleClick}>fetch weather</button>
      </div>
    );
  }
}

export default Index;
