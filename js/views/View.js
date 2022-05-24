export default class View {
  _data;

  render(data, idx = null) {
    this._data = data;
    this._idx = idx;
    const markup = this._generateMarkup(this._data, this._idx);
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
