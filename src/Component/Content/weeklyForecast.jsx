import React from "react";
import Moment from "react-moment";

const WeeklyForecast = (props) => {
  const test = props.dailyWeatherForecast;
  const dataResponse = Object.entries(test);
  return (
    <div className="forecast">
      {dataResponse.map((items, index) => {
        return (
          <div key={index} className="forecastList">
            <Moment format="ddd">{items[1]?.dt_txt}</Moment>
            <Moment format="HH:MM">{items[1]?.dt_txt}</Moment>
            <img
              src={`http://openweathermap.org/img/w/${items[1]?.weather[0]?.icon}.png`}
              alt="weatherIcon"
            />
            <p>{items[1]?.weather[0]?.main}</p>
            <p>{items[1]?.main.temp}°C</p>
          </div>
        );
      })}
    </div>
  );
};
export default WeeklyForecast;
