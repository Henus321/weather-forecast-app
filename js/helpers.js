import { DAWN_TIME, DUSK_TIME } from './config';

export const convertHourToDaytime = function (time) {
  return time > DAWN_TIME && time < DUSK_TIME ? 'day' : 'night';
};

export const convertDateToMonth = function (idx) {
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

export const convertDayOfWeek = function (idx) {
  const weekdayName = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const [correctWeekday] = weekdayName.filter(
    (_, dayWeekIdx) => dayWeekIdx === idx - 1
  );
  return correctWeekday;
};

export const weatherCodeToIcon = function (weatherCode, timeOfDay) {
  switch (weatherCode) {
    case 0:
      //   console.log('Clear sky');
      return timeOfDay === 'night'
        ? '<i class="fa-solid fa-moon"></i>'
        : '<i class="fa-solid fa-sun"></i>';
    //   break;
    case 1:
    case 2:
    case 3:
    case 45:
    case 48:
      //   console.log('Mainly clear, partly cloudy, and overcast');
      // console.log('Fog and depositing rime fog');
      return timeOfDay === 'night'
        ? '<i class="fa-solid fa-cloud-moon"></i>'
        : '<i class="fa-solid fa-cloud-sun"></i>';
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 67:
    case 66:
    case 80:
    case 81:
    case 82:
      // console.log('Drizzle Light, moderate, and dense intensity');
      // console.log('Freezing Drizzle: Light and dense intensity');
      // console.log('Rain: Slight, moderate and heavy intensity');
      // console.log('Freezing Rain: Light and heavy intensity');
      // console.log('Rain showers: Slight, moderate, and violent');
      return timeOfDay === 'night'
        ? '<i class="fa-solid fa-cloud-moon-rain"></i>'
        : '<i class="fa-solid fa-cloud-sun-rain"></i>';
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      // console.log('Snow fall: Slight, moderate, and heavy intensity');
      // console.log('Snow grains');
      // console.log('Snow showers slight and heavy');
      return '<i class="fa-solid fa-snowflake"></i>';
    case 95:
    case 96:
    case 99:
      // console.log('Thunderstorm: Slight or moderate');
      // console.log('Thunderstorm with slight and heavy hail');
      return '<i class="fa-solid fa-cloud-bolt"></i>';
    default:
      // console.log('Condition not found');
      return '<i class="fa-solid fa-circle-question"></i>';
  }
};
