import View from './View.js';

class SearchView extends View {
  _examples = document.querySelectorAll('.example-item');
  _searchInput = document.querySelector('.search-field');

  addHandlerSearch(handler) {
    const searchInput = this._searchInput;
    this._examples.forEach((example) =>
      example.addEventListener('click', function (e) {
        searchInput.value = e.target.textContent;
        handler();
      })
    );
  }
}

export default new SearchView();
