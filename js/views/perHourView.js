import View from './View.js';

class PerHourView extends View {
  _parentElement = document.querySelector('.hourly__container');

  _generateMarkup() {
    const hourCards = String(
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
    const btnForward = this._parentElement.querySelector('.btn-forward');
    const btnBack = this._parentElement.querySelector('.btn-back');
    const hourlyCards = this._parentElement.querySelector('.hourly-cards');
    const leftArrow = this._parentElement.querySelector('.fa-caret-left');
    const rightArrow = this._parentElement.querySelector('.fa-caret-right');
    const cardsQuantity =
      this._parentElement.querySelectorAll('.hourly-item').length;
    let idx = 0;

    const scroll = function () {
      if (idx > cardsQuantity / 2) {
        idx = cardsQuantity / 2;
      }
      if (idx < 0) {
        idx = 0;
      }
      hourlyCards.style.transform = `translateX(${-idx}0%)`;
    };

    btnBack.addEventListener('click', () => {
      idx--;
      scroll();
      if (idx === 0) {
        leftArrow.style.color = '#d3d3d3';
      } else {
        rightArrow.style.color = '#3b3b3b';
      }
    });

    btnForward.addEventListener('click', () => {
      idx++;
      scroll();
      if (idx === cardsQuantity / 2) {
        rightArrow.style.color = '#d3d3d3';
      } else {
        leftArrow.style.color = '#3b3b3b';
      }
    });
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    this._scrollListeners();
  }
}

export default new PerHourView();
