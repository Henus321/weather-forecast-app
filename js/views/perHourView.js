import View from './View.js';
import { weatherCodeToIcon } from './../helpers.js';

class PerHourView extends View {
  _parentElement = document.querySelector('.content__hourly');

  _generateMarkup(data, idx) {
    const hour = data.time[idx].slice(-5).trim();
    const temperature = data.temperature[idx];
    const weatherIcon = weatherCodeToIcon(data.weatherCode[idx]);

    return `
        <div class="hour">
        <span>${hour}</span>
        <span>${weatherIcon}</span>
        <span>${temperature}°C</span>
        </div>
        `;
  }
}

export default new PerHourView();
