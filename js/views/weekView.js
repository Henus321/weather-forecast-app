import View from './View.js';

class WeekView extends View {
  _parentElement = document.querySelector('.content-week');

  _generateMarkup() {
    const weekCards = String(
      this._data.map(
        (data) => `
    <div class="weekly-item">
      <span class="weekday-title">${data.weekdays}</span>
      <span>${data.weekDates}</span>
      <span>${data.weekWeatherCodes}</span>
      <div class="temperature-container">
        <strong>Day: ${data.weekDaytimeTemp}°C</strong>
        <small>Night: ${data.weekNighttimeTemp}°C</small>
      </div>
    </div>
    `
      )
    )
      .split(',')
      .join('');
    const markup = `
    <h3 class="week-title ">Forecast for the week</h3>
    <div class="weekly-cards">
    ${weekCards}
    </div>
     `;
    return markup;
  }
}

export default new WeekView();
