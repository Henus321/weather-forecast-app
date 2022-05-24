import View from './View.js';

class PerHourView extends View {
  _parentElement = document.querySelector('.content__temp-hours');

  _generateMarkup(data, idx) {
    const hour = data.time[idx].slice(-5).trim();
    const temperature = data.temperature[idx];
    const weatherCode = data.weatherCode[idx];

    return `
        <div class="hour">
        <span>${hour}</span>
        <span>${temperature}</span>
        <span>code ${weatherCode}</span>
        </div>
        `;
  }
}

export default new PerHourView();
