import View from './View.js';

class TodayView extends View {
  _parentElement = document.querySelector('.content__today');

  _generateMarkup() {
    return `
        <h2>${this._data.currentLocation.name}</h2>
        <span>Today ${this._data.currentWeather.dayOfWeek} ${this._data.currentWeather.time}</span>
        <div class="today-degrees">
        <span>${this._data.currentWeather.temperature}°C</span>
        <span>${this._data.currentWeather.weatherCode}</span>
        </div>
        <span>wind: ${this._data.currentWeather.windSpeed} m/s</span>
    `;
  }
}

export default new TodayView();
