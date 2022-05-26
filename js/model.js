import {
  METEO_API_URL,
  GEO_API_URL,
  TIMEZONE_API_URL,
  HOUR_CARDS_QUANTITY,
} from './config.js';
import { convertDate } from './helpers.js';

export const state = {
  forecast: {
    currentWeather: {},
    currentLocation: {},
    weekForecast: {},
    hourlyCards: {},
    weeklyCards: {},
  },
};

export const loadLocation = async function (searchValue = 'berlin') {
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
    console.error(`${err}💥`);
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
    console.error(err);
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
    // console.log(data);
    // console.log(state.forecast);
  } catch (err) {
    console.error(`${err}💥`);
  }
};

const convertDayOfWeek = function (idx) {
  const weekdayName = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  return weekdayName.filter((_, dayWeekIdx) => dayWeekIdx === idx - 1);
};

const createForecastObject = function (data, cityName, exactDate) {
  // Exact Time
  const [exactTime, rawDayOfWeek] = exactDate;
  const exactDayOfWeek = convertDayOfWeek(rawDayOfWeek);

  // Current date index research
  const currentTime = data.current_weather.time;
  const allWeekTime = data.hourly.time;
  const allWeekTemp = data.hourly.temperature_2m;
  const allWeatherCodes = data.hourly.weathercode;
  const curIndexMatch = (item) => item === currentTime;
  const currentTimeIndex = allWeekTime.findIndex(curIndexMatch);

  // Hourly Cards Data
  const lastTimeIndex = currentTimeIndex + HOUR_CARDS_QUANTITY;
  const hourlyCardsTime = allWeekTime.slice(currentTimeIndex, lastTimeIndex);
  const hourlyCardsTemperature = allWeekTemp.slice(
    currentTimeIndex,
    lastTimeIndex
  );
  const hourlyCardsWeatherCode = allWeatherCodes.slice(
    currentTimeIndex,
    lastTimeIndex
  );

  // Weekly Cards Data
  const weekDates = allWeekTime.filter((_, idx) => (idx - 15) % 24 === 0);
  const weekDaytimeTemp = allWeekTemp.filter((_, idx) => (idx - 15) % 24 === 0);
  const weekNightimeTemp = allWeekTemp.filter((_, idx) => (idx - 3) % 24 === 0);
  const weekWeatherCodes = allWeatherCodes.filter(
    (_, idx) => (idx - 15) % 24 === 0
  );
  const weekdayName = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const weekPart1 = weekdayName.slice(rawDayOfWeek - 1);
  const weekPart2 = weekdayName.slice(0, rawDayOfWeek - 1);
  const weekDays = [...weekPart1, ...weekPart2];

  return {
    currentWeather: {
      temperature: data.current_weather.temperature,
      time: exactTime,
      dayOfWeek: exactDayOfWeek,
      weatherCode: data.current_weather.weathercode,
      windSpeed: data.current_weather.windspeed,
    },
    currentLocation: {
      latitude: data.latitude,
      longitude: data.longitude,
      name: cityName,
    },
    weekForecast: {
      time: data.hourly.time,
      temperature: data.hourly.temperature_2m,
    },
    hourlyCardsData: {
      time: hourlyCardsTime,
      temperature: hourlyCardsTemperature,
      weatherCode: hourlyCardsWeatherCode,
    },
    weeklyCardsData: {
      weekDates: weekDates,
      weekDays: weekDays,
      weekDaytimeTemp: weekDaytimeTemp,
      weekNighttimeTemp: weekNightimeTemp,
      weekWeatherCodes: weekWeatherCodes,
    },
  };
};

// Утро — с 06:00 до 12:00 часов (часть суток после пробуждения).
// День — с 12:00 до 18:00 часов (пик рабочей активности).
// Вечер — с 18:00 до 00:00 часов (время отдыха после работы).
// Ночь — с 00:00 до 06:00 часов (время сна).
