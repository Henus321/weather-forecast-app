import {
  METEO_API_URL,
  GEO_API_URL,
  TIMEZONE_API_URL,
  HOUR_CARDS_QUANTITY,
} from './config.js';
import { weatherCodeToIcon } from './helpers.js';

export const state = {
  forecast: {
    currentWeather: {},
    currentLocation: {},
    hourlyCardsData: {},
    weekdayCardsData: {},
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

const convertDateToMonth = function (idx) {
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
  const [correctMonth] = monthName.filter((_, monthIdx) => monthIdx === idx);
  return correctMonth;
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
  const currentWeatherIcon = weatherCodeToIcon(
    data.current_weather.weathercode
  );

  const currentWeather = {
    temperature: data.current_weather.temperature,
    time: exactTime,
    dayOfWeek: exactDayOfWeek,
    weatherCode: currentWeatherIcon,
    windSpeed: data.current_weather.windspeed,
  };

  // Hourly Cards Data
  const lastTimeIndex = currentTimeIndex + HOUR_CARDS_QUANTITY;
  const hourlyCardsTime = allWeekTime
    .map((time) => time.slice(-5).trim())
    .slice(currentTimeIndex, lastTimeIndex);
  const hourlyCardsTemperature = allWeekTemp.slice(
    currentTimeIndex,
    lastTimeIndex
  );
  const hourlyCardsWeatherCode = allWeatherCodes
    .slice(currentTimeIndex, lastTimeIndex)
    .map((code) => weatherCodeToIcon(code));

  const hourlyCardsData = hourlyCardsTime.map((_, idx) => {
    return {
      time: hourlyCardsTime[idx],
      temperature: hourlyCardsTemperature[idx],
      weatherCode: hourlyCardsWeatherCode[idx],
    };
  });

  // Weekly Cards Data
  const weekDates = allWeekTime
    .filter((_, idx) => (idx - 15) % 24 === 0)
    .map((date) => date.slice(5, -6).trim());
  const weekDaytimeTemp = allWeekTemp.filter((_, idx) => (idx - 15) % 24 === 0);
  const weekNightimeTemp = allWeekTemp.filter((_, idx) => (idx - 3) % 24 === 0);
  const weekWeatherCodes = allWeatherCodes
    .filter((_, idx) => (idx - 15) % 24 === 0)
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
  const weekPart1 = weekdayName.slice(rawDayOfWeek - 1);
  const weekPart2 = weekdayName.slice(0, rawDayOfWeek - 1);
  const weekdays = [...weekPart1, ...weekPart2];

  const correctFormatDate = weekDates.map((date) =>
    date.slice(0, 1) === '0' ? date.slice(1) : date
  );
  const exactMonthName = correctFormatDate.map((date) =>
    convertDateToMonth(Number(date.slice(0, -3)))
  );
  const exactDay = weekDates.map((date) => date.slice(3));
  const convertedDayMonth = exactMonthName.map((name, idx) =>
    [name, exactDay[idx]].join(',').replace(',', ' ')
  );
  const weekdayCardsData = weekdays.map((_, idx) => {
    return {
      weekDates: convertedDayMonth[idx],
      weekdays: weekdays[idx],
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
