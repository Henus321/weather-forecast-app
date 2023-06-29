import View from './View.js';

class TodayView extends View {
  _parentElement = document.querySelector('.today-card');

  _generateMarkup() {
    this._backroundImage();
    return `
        <h2 class="today-item">${this._data.location.name}</h2>
        <span class="today-item">Today ${this._data.currentTime.dayOfWeek} ${this._data.currentTime.time}</span>
        <div class="today-item today-degrees">
        <span>${this._data.todayForecast.temperature}°C</span>
        <span>${this._data.todayForecast.weatherIcon}</span>
        </div>
        <span class="today-item"><i class="fa-solid fa-wind"></i> wind: ${this._data.todayForecast.windSpeed} m/s</span>
    `;
  }

  _backroundImage() {
    this._data.currentTime.timeOfDay === 'day'
      ? (this._parentElement.style.background =
          'url(https://images.unsplash.com/photo-1548266652-99cf27701ced?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80)')
      : (this._parentElement.style.background =
          'url(https://images.unsplash.com/photo-1530508777238-14544088c3ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)');
  }
}

export default new TodayView();
