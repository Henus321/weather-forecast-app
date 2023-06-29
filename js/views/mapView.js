import View from './View.js';

class MapView extends View {
  _parentElement = document.querySelector('.content-map');

  _generateMarkup() {
    return `
    <div class="map" id="map"></div>
    `;
  }

  _getPosition() {
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
    });
  }

  _loadMap(lat, lng) {
    const map = L.map('map').setView([lat, lng], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    this._loadMap(this._data.latitude, this._data.longitude);
  }
}

export default new MapView();
