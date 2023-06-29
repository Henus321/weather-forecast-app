import {
  METEO_API_URL,
  GEO_API_URL,
  TIMEZONE_API_URL,
  HOUR_CARDS_QUANTITY,
  DELAY_TO_DAYTIME,
  DELAY_TO_NIGHTTIME,
  HOURS_PER_DAY,
  WEEK_DAY_NAMES,
} from './config.js';
import {
  weatherCodeToIcon,
  convertDateToMonth,
  convertDayOfWeek,
  convertHourToDaytime,
} from './helpers.js';

import { async } from 'regenerator-runtime';

export const state = {
  forecast: {
    location: {},
    currentTime: {},
    todayForecast: {},
    hourlyCardsData: {},
    weekDayCardsData: {},
  },
};

export const loadLocation = async function (searchValue) {
  try {
    const responce = await fetch(`${GEO_API_URL}${searchValue}`);
    const data = await responce.json();
    state.forecast.location = createLocationObject(data);
  } catch (err) {
    throw new Error(`Woops! Can't load city with that name... ${err.message}`);
  }
};

export const loadCurrentTime = async function (timezone) {
  try {
    const responce = await fetch(`${TIMEZONE_API_URL}${timezone}`);
    const data = await responce.json();
    state.forecast.currentTime = createCurrentTimeObject(data);
  } catch (err) {
    throw new Error(`Woops! Can't load timezone... ${err.message}`);
  }
};

export const loadForecast = async function (forecast) {
  const [continent, city] = forecast.location.timezone.split('/');
  try {
    const responce = await fetch(
      `${METEO_API_URL}latitude=${forecast.location.latitude}&longitude=${forecast.location.longitude}&hourly=temperature_2m,weathercode&current_weather=true&windspeed_unit=ms&timezone=${continent}%2F${city}`
    );
    const data = await responce.json();
    state.forecast.todayForecast = createTodayForecastObject(data);
    state.forecast.hourlyCardsData = createHourlyCardsObject(data);
    state.forecast.weekDayCardsData = createWeekDayCardsObject(data, forecast);
  } catch (err) {
    throw new Error(`Woops! Can't load forecast... ${err.message}`);
  }
};

const createLocationObject = function (data) {
  const location = data.results[0];
  return {
    name: location.name,
    timezone: location.timezone,
    latitude: location.latitude,
    longitude: location.longitude,
  };
};

const createCurrentTimeObject = function (data) {
  const currentTime = data.datetime.slice(11, 16);
  const currentHour = data.datetime.slice(11, 13);
  const timeOfDay = convertHourToDaytime(currentHour);
  const dayOfWeek = convertDayOfWeek(data.day_of_week);
  return {
    time: currentTime,
    timeOfDay: timeOfDay,
    dayOfWeek: dayOfWeek,
    dayOfWeekIndex: data.day_of_week,
  };
};

const createTodayForecastObject = function (data) {
  const currentHour = data.current_weather.time.slice(11, 13);
  const currentDayTime = convertHourToDaytime(currentHour);
  const weatherIcon = weatherCodeToIcon(
    data.current_weather.weathercode,
    currentDayTime
  );
  return {
    temperature: data.current_weather.temperature,
    weatherIcon: weatherIcon,
    windSpeed: data.current_weather.windspeed,
  };
};

const createHourlyCardsObject = function (data) {
  const allWeekTime = data.hourly.time;
  const currentTimeIndex = allWeekTime.findIndex(
    (item) => item === data.current_weather.time
  );
  const lastTimeIndex = currentTimeIndex + HOUR_CARDS_QUANTITY;
  const hourlyCardsTime = allWeekTime
    .slice(currentTimeIndex, lastTimeIndex)
    .map((time) => time.slice(-5).trim());
  const hourlyCardsDayTime = hourlyCardsTime
    .map((time) => time.slice(0, 2))
    .map((time) => convertHourToDaytime(time));
  const hourlyCardsWeatherIcons = data.hourly.weathercode
    .slice(currentTimeIndex, lastTimeIndex)
    .map((code, idx) => weatherCodeToIcon(code, hourlyCardsDayTime[idx]));
  const hourlyCardsTemperature = data.hourly.temperature_2m.slice(
    currentTimeIndex,
    lastTimeIndex
  );
  return {
    time: hourlyCardsTime,
    weatherIcons: hourlyCardsWeatherIcons,
    temperature: hourlyCardsTemperature,
  };
};

const createWeekDayCardsObject = function (data, forecast) {
  const allWeekTime = data.hourly.time;
  const allWeekTemp = data.hourly.temperature_2m;
  const allWeatherCodes = data.hourly.weathercode;
  const currentDayOfWeekIndex = forecast.currentTime.dayOfWeekIndex;

  const weekDaytimeTemp = allWeekTemp.filter(
    (_, idx) => (idx - DELAY_TO_DAYTIME) % HOURS_PER_DAY === 0
  );
  const weekNightimeTemp = allWeekTemp.filter(
    (_, idx) => (idx - DELAY_TO_NIGHTTIME) % HOURS_PER_DAY === 0
  );
  const weekWeatherIcons = allWeatherCodes
    .filter((_, idx) => (idx - DELAY_TO_DAYTIME) % HOURS_PER_DAY === 0)
    .map((code) => weatherCodeToIcon(code));
  const currentWeekDays = [
    ...WEEK_DAY_NAMES.slice(currentDayOfWeekIndex - 1),
    ...WEEK_DAY_NAMES.slice(0, currentDayOfWeekIndex - 1),
  ];

  const allWeekDates = allWeekTime
    .filter((_, idx) => (idx - DELAY_TO_DAYTIME) % HOURS_PER_DAY === 0)
    .map((date) => date.slice(5, -6).trim());
  const currentDateMonthName = allWeekDates
    .map((date) => (date.slice(0, 1) === '0' ? date.slice(1) : date))
    .map((date) => convertDateToMonth(Number(date.slice(0, -3))));
  const currentDateOfMonth = allWeekDates.map((date) => date.slice(3));
  const currentDayAndMonth = currentDateMonthName.map((name, idx) =>
    [name, currentDateOfMonth[idx]].join(',').replace(',', ' ')
  );
  return {
    weekDaytimeTemp: weekDaytimeTemp,
    weekNighttimeTemp: weekNightimeTemp,
    weekWeatherIcons: weekWeatherIcons,
    weekDays: currentWeekDays,
    weekDates: currentDayAndMonth,
  };
};
