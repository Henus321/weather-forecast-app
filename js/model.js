import { API_URL, API_URL2 } from './config.js';

export const state = {
  forecast: {
    currentWeather: {},
    currentLocation: {},
    weekForecast: {},
  },
};

const createForecastObject = function (data) {
  const convertedDate = convertDate(data.current_weather.time);
  return {
    currentWeather: {
      temperature: data.current_weather.temperature,
      time: convertedDate,
      weatherCode: data.current_weather.weathercode,
      windSpeed: data.current_weather.windspeed,
    },
    currentLocation: {
      latitude: data.latitude,
      longitude: data.longitude,
    },
    weekForecast: {
      time: data.hourly.time,
      temperature: data.hourly.temperature_2m,
    },
  };
};

export const loadForecast = async function () {
  try {
    const responce = await fetch(API_URL);
    const data = await responce.json();
    console.log(data);
    state.forecast = createForecastObject(data);
    console.log(state.forecast);
  } catch (err) {
    console.error(`${err}💥`);
  }
};

const convertDate = function (data) {
  const date = new Date(data * 1000);
  return date;
};

export const concatAll = function (data) {
  const weekTime = data.weekTime;
  const weekTemp = data.weekTemperature;

  const monthName = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const weekDay = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  // const convertedDate = convertDate(state.forecast.currentWeather.time);
  // console.log(convertedDate);
};
