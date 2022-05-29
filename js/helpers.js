export const convertDate = function (data) {
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
  const weekdayName = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const month = monthName[data.getMonth()];
  const weekday = weekdayName[data.getDay()];
  const day = data.getDate();
  const hours = data.getHours();
  const minutes = data.getMinutes();
  // СУПЕР УРОДЛИВАЯ СТРОКА
  const fullDate = `${day > 9 ? day : `0${day}`} ${month}, ${weekday}, ${
    hours > 9 ? hours : `0${hours}`
  }:${minutes > 9 ? minutes : `0${minutes}`}`;

  return fullDate;
};

export const weatherCodeToIcon = function (weatherCode) {
  switch (weatherCode) {
    case 0:
      //   console.log('Clear sky');
      return '<i class="fa-solid fa-sun"></i>';
    //   break;
    case 1:
    case 2:
    case 3:
      //   console.log('Mainly clear, partly cloudy, and overcast');
      return '<i class="fa-solid fa-cloud-sun"></i>';
    case 45:
    case 48:
      // console.log('Fog and depositing rime fog');
      return '<i class="fa-solid fa-cloud"></i>';
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
      return '<i class="fa-solid fa-cloud-rain"></i>';
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
