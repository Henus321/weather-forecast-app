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
