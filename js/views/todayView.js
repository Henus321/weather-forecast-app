import View from './View.js';
import { weatherCodeToIcon } from './../helpers.js';

class TodayView extends View {
  _parentElement = document.querySelector('.content__today');

  _generateMarkup() {
    const weatherIcon = weatherCodeToIcon(
      this._data.currentWeather.weatherCode
    );
    return `
        <h2>${this._data.currentLocation.name}</h2>
        <span>${this._data.currentWeather.dayOfWeek} ${this._data.currentWeather.time}</span>
        <div class="today-degrees">
        <span>${this._data.currentWeather.temperature}°C</span>
        <span>${weatherIcon}</span>
        </div>
        <span>wind: ${this._data.currentWeather.windSpeed} m/s</span>
    `;
  }
}

export default new TodayView();
