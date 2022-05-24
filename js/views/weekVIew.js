import View from './View.js';

class WeekView extends View {
  _parentElement = document.querySelector('.week-container');

  _generateMarkup() {
    return `
    <div class="weekday">
        <span>Today</span>
        <span>date</span>
        <span>desc-icon</span>
        <span>+11</span>
        <span>-2</span>
        <span>rainy</span>
      </div>
      <div class="weekday">
        <span>Today</span>
        <span>date</span>
        <span>desc-icon</span>
        <span>+11</span>
        <span>-2</span>
        <span>rainy</span>
      </div>
      <div class="weekday">
        <span>Today</span>
        <span>date</span>
        <span>desc-icon</span>
        <span>+11</span>
        <span>-2</span>
        <span>rainy</span>
      </div>
      <div class="weekday">
        <span>Today</span>
        <span>date</span>
        <span>desc-icon</span>
        <span>+11</span>
        <span>-2</span>
        <span>rainy</span>
      </div>
      <div class="weekday">
        <span>Today</span>
        <span>date</span>
        <span>desc-icon</span>
        <span>+11</span>
        <span>-2</span>
        <span>rainy</span>
      </div>
      <div class="weekday">
        <span>Today</span>
        <span>date</span>
        <span>desc-icon</span>
        <span>+11</span>
        <span>-2</span>
        <span>rainy</span>
      </div>
      <div class="weekday">
        <span>Today</span>
        <span>date</span>
        <span>desc-icon</span>
        <span>+11</span>
        <span>-2</span>
        <span>rainy</span>
    </div>
    `;
  }
}

export default new WeekView();
