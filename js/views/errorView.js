import View from './View.js';

class ErrorView extends View {
  _parentElement = document.querySelector('.container__error');

  _generateMarkup() {
    this._hideContent();
    return `
        <span class="error-text">${this._data}</span>
    `;
  }

  _hideContent() {
    this._parentElement.classList.remove('hidden');
    this._parentElement.parentElement
      .querySelector('.container__content')
      .classList.add('hidden');
  }
}

export default new ErrorView();
