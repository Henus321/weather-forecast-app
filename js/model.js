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

export const loadLocation = async function (searchValue = 'tokyo') {
  try {
    const responce = await fetch(`${GEO_API_URL}${searchValue}`);
    const data = await responce.json();
    const searchResult = data.results[0];
    const cityName = searchResult.name;
    const latlang = [searchResult.latitude, searchResult.longitude];
    const timezone = searchResult.timezone;
    const timezoneSplit = timezone.split('/');
    const exactTime = await loadExactTime(timezone);
    await loadForecast(latlang, cityName, timezoneSplit, exactTime);
  } catch (err) {
    console.error(`${err}💥`);
  }
};

const loadExactTime = async function (timezone) {
  try {
    const responce = await fetch(`${TIMEZONE_API_URL}${timezone}`);
    const data = await responce.json();
    const exactTime = data.datetime.slice(0, 16);
    return exactTime;
  } catch (err) {
    console.error(err);
  }
};

const loadForecast = async function (latlng, cityName, timezone, exactTime) {
  const [lat, lng] = latlng;
  const [cont, city] = timezone;
  try {
    const responce = await fetch(
      `${METEO_API_URL}latitude=${lat}&longitude=${lng}&hourly=temperature_2m,weathercode&current_weather=true&windspeed_unit=ms&timezone=${cont}%2F${city}`
    );
    const data = await responce.json();
    state.forecast = createForecastObject(data, cityName, exactTime);
    // console.log(data);
    // console.log(state.forecast);
  } catch (err) {
    console.error(`${err}💥`);
  }
};

const createForecastObject = function (data, cityName, exactTime) {
  // Current date index research
  const currentTime = data.current_weather.time;
  const allWeekTime = data.hourly.time;
  const allWeekTemp = data.hourly.temperature_2m;
  const allWeatherCodes = data.hourly.weathercode;
  const curIndexMatch = (item) => item === currentTime;
  const currentTimeIndex = allWeekTime.findIndex(curIndexMatch);
  console.log(currentTimeIndex);

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
  console.log(hourlyCardsWeatherCode);

  // Weekly Cards Data
  const weekDays = allWeekTime.filter((_, idx) => idx % 24 === 0);
  // need Local time, not Moscow
  // Week Day temp and Evening temp arrays
  const weekTemp = allWeekTemp.filter((_, idx) => idx % 24 === 0);
  console.log(weekDays, weekTemp);

  return {
    currentWeather: {
      temperature: data.current_weather.temperature,
      time: exactTime,
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
      weekDay: weekDays,
      weekTemp: weekTemp,
      // averageDayTemp: 'averageTempArray',
      // averageNightTemp: 'averageTempArray',
      averageDayWeathercode: 'averageWeathercode',
    },
    testWeeks: [0, 1, 2, 3, 4, 5, 6],
  };
};

// Утро — с 06:00 до 12:00 часов (часть суток после пробуждения).
// День — с 12:00 до 18:00 часов (пик рабочей активности).
// Вечер — с 18:00 до 00:00 часов (время отдыха после работы).
// Ночь — с 00:00 до 06:00 часов (время сна).
