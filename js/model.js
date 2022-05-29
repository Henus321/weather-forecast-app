import {
  METEO_API_URL,
  GEO_API_URL,
  TIMEZONE_API_URL,
  HOUR_CARDS_QUANTITY,
  DAWN_TIME,
  DUSK_TIME,
  DELAY_TO_DAYTIME,
  DELAY_TO_NIGHTTIME,
  HOURS_PER_DAY,
} from './config.js';
import {
  weatherCodeToIcon,
  convertDateToMonth,
  convertDayOfWeek,
} from './helpers.js';

import { async } from 'regenerator-runtime';

export const state = {
  forecast: {
    currentWeather: {},
    currentLocation: {},
    hourlyCardsData: {},
    weekdayCardsData: {},
  },
};

export const loadLocation = async function (searchValue) {
  try {
    const responce = await fetch(`${GEO_API_URL}${searchValue}`);
    const data = await responce.json();
    const searchResult = data.results[0];
    const cityName = searchResult.name;
    const latlang = [searchResult.latitude, searchResult.longitude];
    const timezone = searchResult.timezone;
    const timezoneSplit = timezone.split('/');
    const exactDate = await loadExactTime(timezone);
    await loadForecast(latlang, cityName, timezoneSplit, exactDate);
  } catch (err) {
    throw new Error("Woops! Can't find city with that name... try another one");
  }
};

const loadExactTime = async function (timezone) {
  try {
    const responce = await fetch(`${TIMEZONE_API_URL}${timezone}`);
    const data = await responce.json();
    const exactTime = data.datetime.slice(0, 16);
    const exactDayOfWeek = data.day_of_week;
    const exactDate = [exactTime, exactDayOfWeek];
    return exactDate;
  } catch (err) {
    throw new Error("Woops! Can't load timezone... try again later");
  }
};

const loadForecast = async function (latlng, cityName, timezone, exactDate) {
  const [lat, lng] = latlng;
  const [cont, city] = timezone;
  try {
    const responce = await fetch(
      `${METEO_API_URL}latitude=${lat}&longitude=${lng}&hourly=temperature_2m,weathercode&current_weather=true&windspeed_unit=ms&timezone=${cont}%2F${city}`
    );
    const data = await responce.json();
    state.forecast = createForecastObject(data, cityName, exactDate);
  } catch (err) {
    throw new Error("Woops! Can't load forecast... try again later");
  }
};

const createForecastObject = function (data, cityName, exactDate) {
  // Exact Time
  const [rawExactTime, rawDayOfWeek] = exactDate;
  const exactDayOfWeek = convertDayOfWeek(rawDayOfWeek);
  const exactTime = rawExactTime.slice(11);

  const currentLocation = {
    latitude: data.latitude,
    longitude: data.longitude,
    name: cityName,
  };
  // Current date index research
  const currentTime = data.current_weather.time;
  const allWeekTime = data.hourly.time;
  const allWeekTemp = data.hourly.temperature_2m;
  const allWeatherCodes = data.hourly.weathercode;
  const curIndexMatch = (item) => item === currentTime;
  const currentTimeIndex = allWeekTime.findIndex(curIndexMatch);

  const exactHour = exactTime.slice(0, 2);
  const timeOfDay =
    exactHour > DAWN_TIME && exactHour < DUSK_TIME ? 'day' : 'night';
  const currentWeatherIcon = weatherCodeToIcon(
    data.current_weather.weathercode,
    timeOfDay
  );
  const currentWeather = {
    temperature: data.current_weather.temperature,
    time: exactTime,
    dayOfWeek: exactDayOfWeek,
    weatherCode: currentWeatherIcon,
    windSpeed: data.current_weather.windspeed,
    timeOfDay: timeOfDay,
  };

  // Hourly Cards Data
  const lastTimeIndex = currentTimeIndex + HOUR_CARDS_QUANTITY;
  const hourlyCardsTime = allWeekTime
    .map((time) => time.slice(-5).trim())
    .slice(currentTimeIndex, lastTimeIndex);
  const hourlyCardsDaytime = hourlyCardsTime
    .map((time) => time.slice(0, 2))
    .map((time) => (time > DAWN_TIME && time < DUSK_TIME ? 'day' : 'night'));
  const hourlyCardsTemperature = allWeekTemp.slice(
    currentTimeIndex,
    lastTimeIndex
  );
  const hourlyCardsWeatherCode = allWeatherCodes
    .slice(currentTimeIndex, lastTimeIndex)
    .map((code, idx) => weatherCodeToIcon(code, hourlyCardsDaytime[idx]));
  const hourlyCardsData = hourlyCardsTime.map((_, idx) => {
    return {
      time: hourlyCardsTime[idx],
      temperature: hourlyCardsTemperature[idx],
      weatherCode: hourlyCardsWeatherCode[idx],
    };
  });

  // Weekly Cards Data
  const weekDates = allWeekTime
    .filter((_, idx) => (idx - DELAY_TO_DAYTIME) % HOURS_PER_DAY === 0)
    .map((date) => date.slice(5, -6).trim());
  const weekDaytimeTemp = allWeekTemp.filter(
    (_, idx) => (idx - DELAY_TO_DAYTIME) % HOURS_PER_DAY === 0
  );
  const weekNightimeTemp = allWeekTemp.filter(
    (_, idx) => (idx - DELAY_TO_NIGHTTIME) % HOURS_PER_DAY === 0
  );
  const weekWeatherCodes = allWeatherCodes
    .filter((_, idx) => (idx - DELAY_TO_DAYTIME) % HOURS_PER_DAY === 0)
    .map((code) => weatherCodeToIcon(code));

  const weekdayName = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const exactWeekdays = [
    ...weekdayName.slice(rawDayOfWeek - 1),
    ...weekdayName.slice(0, rawDayOfWeek - 1),
  ];

  const exactMonthName = weekDates
    .map((date) => (date.slice(0, 1) === '0' ? date.slice(1) : date))
    .map((date) => convertDateToMonth(Number(date.slice(0, -3))));
  const exactDay = weekDates.map((date) => date.slice(3));
  const convertedDayMonth = exactMonthName.map((name, idx) =>
    [name, exactDay[idx]].join(',').replace(',', ' ')
  );

  const weekdayCardsData = exactWeekdays.map((_, idx) => {
    return {
      weekDates: convertedDayMonth[idx],
      weekdays: exactWeekdays[idx],
      weekDaytimeTemp: weekDaytimeTemp[idx],
      weekNighttimeTemp: weekNightimeTemp[idx],
      weekWeatherCodes: weekWeatherCodes[idx],
    };
  });

  return {
    currentWeather,
    currentLocation,
    hourlyCardsData,
    weekdayCardsData,
  };
};
