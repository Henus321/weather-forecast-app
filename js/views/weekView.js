import View from './View.js';

class WeekView extends View {
  _parentElement = document.querySelector('.week__content');

  _generateMarkup() {
    const markup = String(
      this._data.map(
        (data) => `
    <div class="weekday">
      <span class="font-18">${data.weekdays}</span>
      <span class="weekday-item">${data.weekDates}</span>
      <span "weekday-item">${data.weekWeatherCodes}</span>
      <div class="weekday-item weekday__temperature-container">
        <strong>Day: ${data.weekDaytimeTemp}°C</strong>
        <small>Night: ${data.weekNighttimeTemp}°C</small>
      </div>
    </div>
    `
      )
    )
      .split(',')
      .join('');
    return markup;
  }
}

export default new WeekView();
