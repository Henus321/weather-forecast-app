import View from './View.js';

class ErrorView extends View {
  _parentElement = document.querySelector('.error-container');

  _generateMarkup() {
    this._hideContent();
    return `
        <span>${this._data}</span>
    `;
  }

  _hideContent() {
    this._parentElement.classList.remove('hidden');
    this._parentElement.parentElement
      .querySelector('.content-container')
      .classList.add('hidden');
  }
}

export default new ErrorView();
