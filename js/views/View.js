export default class View {
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    // console.log(this._data);
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
