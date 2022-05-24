import { API_URL, HOUR_CARDS_QUANTITY } from './config.js';
import { convertDate } from './helpers.js';

export const state = {
  forecast: {
    currentWeather: {},
    currentLocation: {},
    weekForecast: {},
    hourlyCards: {},
  },
};

const createForecastObject = function (data) {
  const currentDate = convertDate(new Date());

  // Current date index research
  const currentUnixTime = data.current_weather.time;
  const allWeeks = data.hourly.time;
  const allTemps = data.hourly.temperature_2m;
  const allWeatherCodes = data.hourly.weathercode;
  const match = (item) => item === currentUnixTime;
  const currentTimeIndex = allWeeks.findIndex(match);

  // Hourly Cards Data
  const lastTimeIndex = currentTimeIndex + HOUR_CARDS_QUANTITY;
  const hourlyCardsUnixTime = allWeeks.slice(currentTimeIndex, lastTimeIndex);
  const hourlyCardsTime = hourlyCardsUnixTime.map((time) =>
    convertDate(new Date(time * 1000))
  );
  const hourlyCardsTemperature = allTemps.slice(
    currentTimeIndex,
    lastTimeIndex
  );
  const hourlyCardsWeatherCode = allWeatherCodes.slice(
    currentTimeIndex,
    lastTimeIndex
  );

  return {
    currentWeather: {
      temperature: data.current_weather.temperature,
      time: currentDate,
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
    hourlyCardsData: {
      time: hourlyCardsTime,
      temperature: hourlyCardsTemperature,
      weatherCode: hourlyCardsWeatherCode,
    },
    testWeeks: [0, 1, 2, 3, 4, 5, 6],
  };
};

export const loadForecast = async function () {
  try {
    const responce = await fetch(API_URL);
    const data = await responce.json();
    state.forecast = createForecastObject(data);
    console.log(data);
    console.log(state.forecast);
  } catch (err) {
    console.error(`${err}💥`);
  }
};

// Утро — с 06:00 до 12:00 часов (часть суток после пробуждения).
// День — с 12:00 до 18:00 часов (пик рабочей активности).
// Вечер — с 18:00 до 00:00 часов (время отдыха после работы).
// Ночь — с 00:00 до 06:00 часов (время сна).

// 0	Clear sky
// 1, 2, 3	Mainly clear, partly cloudy, and overcast
// 45, 48	Fog and depositing rime fog
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
// 56, 57	Freezing Drizzle: Light and dense intensity
// 61, 63, 65	Rain: Slight, moderate and heavy intensity
// 66, 67	Freezing Rain: Light and heavy intensity
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
// 77	Snow grains
// 80, 81, 82	Rain showers: Slight, moderate, and violent
// 85, 86	Snow showers slight and heavy
// 95 *	Thunderstorm: Slight or moderate
// 96, 99 *	Thunderstorm with slight and heavy hail
