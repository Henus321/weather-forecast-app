import View from './View.js';
import { weatherCodeToIcon } from './../helpers.js';

class WeekView extends View {
  _parentElement = document.querySelector('.week__content');

  _generateMarkup(data, idx) {
    const weekDay = data.weekDays[idx];
    const day = data.weekDates[idx].slice(5, -6);
    const daytimeTemp = data.weekDaytimeTemp[idx];
    const nighttimeTemp = data.weekNighttimeTemp[idx];
    const weatherIcon = weatherCodeToIcon(data.weekWeatherCodes[idx]);
    return `
    <div class="weekday">
        <span class="font-18">${weekDay}</span>
        <span>${day}</span>
        <span>${weatherIcon}</i></span>
        <div class="weekday__temperature-container">
          <strong>Day: ${daytimeTemp}°C</strong>
          <small>Night: ${nighttimeTemp}°C</small>
        </div>

      </div>
    `;
  }
}

export default new WeekView();
