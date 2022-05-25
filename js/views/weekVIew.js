import View from './View.js';

class WeekView extends View {
  _parentElement = document.querySelector('.week__content');

  _generateMarkup(data, idx) {
    const day = data.weekDay[idx];
    const temperature = data.weekTemp[idx];

    return `
    <div class="weekday">
        <span>${day}</span>
        <span><i class="fa-solid fa-sun"></i></span>
        <span>${temperature}°C</span>
      </div>
    `;
  }
}

export default new WeekView();
