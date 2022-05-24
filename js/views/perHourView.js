import View from './View.js';

class PerHourView extends View {
  _parentElement = document.querySelector('.content');

  _generateMarkup() {
    return `
    <div class="content__temp-hours">
        <div class="hour">
        <span>13:00</span>
        <span>Sun</span>
        <span>+11</span>
        </div>
        <div class="hour">
        <span>13:00</span>
        <span>Sun</span>
        <span>+11</span>
        </div>
        <div class="hour">
        <span>13:00</span>
        <span>Sun</span>
        <span>+11</span>
        </div>
        <div class="hour">
        <span>13:00</span>
        <span>Sun</span>
        <span>+11</span>
        </div>
        <div class="hour">
        <span>13:00</span>
        <span>Sun</span>
        <span>+11</span>
        </div>
        <div class="hour">
        <span>13:00</span>
        <span>Sun</span>
        <span>+11</span>
        </div>

    </div>
    `;
  }
}

export default new PerHourView();
