import View from './View.js';

class CurrentView extends View {
  _parentElement = document.querySelector('.content');

  _generateMarkup() {
    return `
    <div class="content__main-info">
        <h2>City?${this._data.currentLocation.latitude},${this._data.currentLocation.longitude}</h2>
        <span>${this._data.currentWeather.time}</span>
        <div>
        <span>${this._data.currentWeather.temperature}°C, code ${this._data.currentWeather.weatherCode}</span>
        <i class="fa-solid fa-sun"></i>
        </div>
        <span>wind: ${this._data.currentWeather.windSpeed} m/s</span>
    </div>
    `;
  }
}

export default new CurrentView();
