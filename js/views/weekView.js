import View from './View.js';

class WeekView extends View {
  _parentElement = document.querySelector('.content-week');

  _generateMarkup() {
    const weekCards = String(
      this._data.weekDays.map(
        (_, idx) => `
    <div class="weekly-item">
      <span class="weekday-title">${this._data.weekDays[idx]}</span>
      <span>${this._data.weekDates[idx]}</span>
      <span>${this._data.weekWeatherIcons[idx]}</span>
      <div class="temperature-container">
        <strong>Day: ${this._data.weekDaytimeTemp[idx]}°C</strong>
        <small>Night: ${this._data.weekNighttimeTemp[idx]}°C</small>
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
