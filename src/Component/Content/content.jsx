/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./content.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Weather_Api_Key from "../Api_Keys/api_key";
import axios from "axios";
import {
  faMagnifyingGlass,
  faWind,
  faDroplet,
  faTemperatureEmpty,
} from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import WeeklyForecast from "./weeklyForecast";
import ErrorPage from "../ErrorPage/ErrorPage";
import Header from "../Header/header";
import Footer from "../Footer/footer";

const iconStyle = {
  background: "#97b9b9",
  height: "16px",
  borderRadius: "0px 20px 20px 0px",
  border: "none",
  textDecoration: "none",
  textAlign: "center",
  opacity: "0.8",
  position: "relative",
  left: "46%",
  bottom: "27px",
  cursor: "pointer",
}

const inputStyle = {
  background: "#c5dddd",
  height: "37px",
  border: "none",
  textDecoration: "none",
  textAlign: "center",
  opacity: "0.8",
}

const Content = (props) =>{
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState([]);
  const [time, setTime] = useState(new Date());
  const [baseWeatherDetails, setBaseWeatherDetails] = useState("");
  const [temp, setTemp] = useState("");
  const [weatherParam, setWeatherParam] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState("");
  const [dailyWeatherForecast, setDailyWeatherForecast] = useState("");
  const [errorRes, setErrorRes] = useState("");

  // console.log(props,'props')
  // debugger

  const weatherIcon = baseWeatherDetails?.weather?.[0].icon;

  const WEATHER_URL = `${Weather_Api_Key.base}weather?q=${search}&units=metric&APPID=7a4e9a47dcb442bb145459951e36b8ac`;
  const FORECAST_URL = `${Weather_Api_Key.base}forecast?q=${search}&units=metric&APPID=7a4e9a47dcb442bb145459951e36b8ac`;

  const currentLatitude = props.currentLocationLongitudeLatitude.latitude;
  const currentLongitude = props.currentLocationLongitudeLatitude.longitude;
  const currentLocationWeather = `${Weather_Api_Key.base}weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=${Weather_Api_Key.key}&units=metric`;
  const currentWeatherForecast = `${Weather_Api_Key.base}forecast?lat=${currentLatitude}&lon=${currentLongitude}&appid=${Weather_Api_Key.key}&units=metric`;
  useEffect(() => {
    axios
      .get(currentLocationWeather)
      .then((response) => {
        setCurrentCity(response.data);
        setCurrentWeather(response.data);
      })
      .catch((error) => {
        console.log("Location improperly formatted");
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios
      .get(currentWeatherForecast)
      .then((response) => {
        setDailyWeatherForecast(response.data.list);
      })
      .catch((error) => {
        console.log("Location improperly formatted");
      });
  }, []);

  useEffect(() => {
    setInterval(() => {
      setTime(new Date(), 1000);
    });
  });

  const inputChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  const urls = [WEATHER_URL, FORECAST_URL];

  const searchHandler = async (e) => {
    e.preventDefault();
    Promise.all(urls.map((url) => fetch(url).then((r) => r.json())))
      .then(([weatherResponse, forecastResponse]) => {
        setBaseWeatherDetails(weatherResponse);
        setWeather(weatherResponse.name);
        setTemp(weatherResponse.main.temp);
        setWeatherParam(weatherResponse.main);
        setDailyWeatherForecast(forecastResponse.list);
      })
      .catch((error) => {
        if (error.code === undefined) {
          setErrorRes("City Not Found");
        } else {
          setErrorRes("Invalid response");
        }
      });
  };

  return (
    <>
      {errorRes ? (
        <ErrorPage searchHandler={errorRes} />
      ) : (
        <>
          <Header />
          <div className="contentWrapper">
            <div className="searchHeaderPart">
              <button className="search_section">
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Enter your City..."
                  onChange={inputChangeHandler}
                  className="search_box"
                />

                <FontAwesomeIcon
                  style={iconStyle}
                  onClick={searchHandler}
                  icon={faMagnifyingGlass}
                  size="lg"
                  className="icon"
                />
              </button>
            </div>
            <div className="details">
              <div>
                <div className="city_name">
                  {`${baseWeatherDetails?.name || currentCity.name || ''},  ${
                    baseWeatherDetails?.sys?.country ||
                    currentCity?.sys?.country || ''
                  }`}
                </div>
                <div className="temperature">
                  <img
                    src={`https://openweathermap.org/img/w/${
                      weatherIcon || currentWeather.weather?.[0]?.icon
                    }.png`}
                    alt="weatherIcon"
                  />
                  <div>{temp || currentWeather?.main?.temp}</div>

                  <h3>
                    {baseWeatherDetails?.weather?.[0].main ||
                      currentWeather.weather?.[0].main}
                  </h3>
                </div>
                Feels like:
                {baseWeatherDetails?.main?.feels_like ||
                  currentWeather?.main?.feels_like}
                °C
                <div>
                  <p>{weather?.clouds}</p>
                </div>
              </div>
              <div className="extraParams">
                <p>
                  {/* <FontAwesomeIcon icon={faCloud} size="sm" /> */}
                  <FontAwesomeIcon icon={faDroplet} size="sm" />{" "}
                  {window.screen.width > 768 ? "Humidity" : null}
                  {weatherParam.humidity || currentWeather?.main?.humidity}%
                </p>
                <p>
                  {" "}
                  <FontAwesomeIcon icon={faWind} size="sm" />{" "}
                  {window.screen.width > 768 ? "Wind" : null}{" "}
                  {baseWeatherDetails.wind?.speed ||
                    currentWeather?.wind?.speed}{" "}
                  kph
                </p>
                <p>
                  <FontAwesomeIcon icon={faTemperatureEmpty} size="sm" />{" "}
                  {window.screen.width > 768 ? "Pressure" : null}
                  {weatherParam.pressure || currentWeather?.main?.pressure} hPa
                </p>
              </div>
              <WeeklyForecast
                dailyWeatherForecast={dailyWeatherForecast}
                searchHandler={searchHandler}
              />
            </div>

            <div className="time_zone">
              <Moment format="h:mm:ss a">{time}</Moment>
            </div>
            <div>
              <Moment format="Do MMMM 'YY">{time}</Moment>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Content;
