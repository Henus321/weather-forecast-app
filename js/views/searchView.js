import View from './View.js';

class SearchView extends View {
  _parentElement = document.getElementById('search');

  getQuery() {
    const query = this._parentElement.querySelector('.search-field').value;
    this._clearInput();
    this._revealContent();
    return query;
  }

  _revealContent() {
    this._parentElement.parentElement
      .querySelector('.container__content')
      .classList.remove('hidden');
    this._parentElement.parentElement
      .querySelector('.container__error')
      .classList.add('hidden');
  }

  _clearInput() {
    this._parentElement.querySelector('.search-field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
