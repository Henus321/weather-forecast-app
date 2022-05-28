import View from './View.js';

class SearchView extends View {
  _parentElement = document.getElementById('search');

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    this._revealContent();
    return query;
  }

  _revealContent() {
    this._parentElement.parentElement
      .querySelector('.content-container')
      .classList.remove('hidden');
    this._parentElement.parentElement
      .querySelector('.error-container')
      .classList.add('hidden');
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
