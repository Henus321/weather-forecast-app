import View from './View.js';

class PerHourView extends View {
  _parentElement = document.querySelector('.hourly-cards');

  _generateMarkup() {
    const markup = String(
      this._data.map(
        (data) => `
    <div class="hourly-item">
      <span>${data.time}</span>
      <span>${data.weatherCode}</span>
      <span>${data.temperature}°C</span>
    </div>
    `
      )
    )
      .split(',')
      .join('');
    return markup;
  }
}

export default new PerHourView();
