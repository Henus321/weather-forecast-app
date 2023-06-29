import View from './View.js';
import { HOUR_CARDS_QUANTITY } from './../config.js';

class PerHourView extends View {
  _parentElement = document.querySelector('.hourly__container');

  _generateMarkup() {
    const hourCards = String(
      this._data.time.map(
        (_, idx) => `
    <div class="hourly-item">
      <span>${this._data.time[idx]}</span>
      <span>${this._data.weatherIcons[idx]}</span>
      <span>${this._data.temperature[idx]}°C</span>
    </div>
    `
      )
    )
      .split(',')
      .join('');
    const markup = `
    <button class="btn-back">
      <i class="fa-solid fa-caret-left btn-icon"></i>
    </button>
    <div class="hourly-cards">
      ${hourCards}
    </div>
    <button class="btn-forward">
      <i class="fa-solid fa-caret-right btn-icon"></i>
    </button>
     `;
    return markup;
  }

  _scrollListeners() {
    const hourlyCards = this._parentElement.querySelector('.hourly-cards');
    const leftArrow = this._parentElement.querySelector('.fa-caret-left');
    const rightArrow = this._parentElement.querySelector('.fa-caret-right');

    const cardPerClick = 1;
    let idx = 0;

    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('button');
      if (!btn) return;
      btn.classList.value === 'btn-forward' ? _scroll(cardPerClick) : false;
      btn.classList.value === 'btn-back' ? _scroll(-cardPerClick) : false;
    });

    const _scroll = function (point) {
      idx += point;
      idx > HOUR_CARDS_QUANTITY / 2 ? (idx = HOUR_CARDS_QUANTITY / 2) : false;
      idx < 0 ? (idx = 0) : false;
      if (point === 1)
        idx === HOUR_CARDS_QUANTITY / 2
          ? (rightArrow.style.color = '#d3d3d3')
          : (leftArrow.style.color = '#3b3b3b');
      if (point === -1)
        idx === 0
          ? (leftArrow.style.color = '#d3d3d3')
          : (rightArrow.style.color = '#3b3b3b');

      hourlyCards.style.transform = `translateX(${-idx}0%)`;
    };
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    this._scrollListeners();
  }
}

export default new PerHourView();
