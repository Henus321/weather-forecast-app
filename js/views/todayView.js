import View from './View.js';

class TodayView extends View {
  _parentElement = document.querySelector('.content__today');

  _generateMarkup() {
    this._backroundImage();
    return `
        <h2 class="today-item">${this._data.currentLocation.name}</h2>
        <span class="today-item">Today ${this._data.currentWeather.dayOfWeek} ${this._data.currentWeather.time}</span>
        <div class="today-item today-degrees">
        <span>${this._data.currentWeather.temperature}°C</span>
        <span>${this._data.currentWeather.weatherCode}</span>
        </div>
        <span class="today-item">wind: ${this._data.currentWeather.windSpeed} m/s</span>
    `;
  }

  _backroundImage() {
    this._data.currentWeather.timeOfDay === 'day'
      ? (this._parentElement.style.background =
          'url(https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80)')
      : (this._parentElement.style.background =
          'url(https://images.unsplash.com/photo-1530508777238-14544088c3ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)');
  }
}

export default new TodayView();
