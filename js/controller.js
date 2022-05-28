import * as model from './model.js';
import todayView from './views/todayView.js';
import perHourView from './views/perHourView.js';
import weekView from './views/weekView.js';
import mapView from './views/mapView.js';
import searchView from './views/searchView.js';

const controlForecast = async function () {
  try {
    const query = searchView.getQuery();
    query ? await model.loadLocation(query) : await model.loadLocation();

    todayView.render(model.state.forecast);
    mapView.render(model.state.forecast.currentLocation);
    perHourView.render(model.state.forecast.hourlyCardsData);
    weekView.render(model.state.forecast.weekdayCardsData);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  searchView.addHandlerSearch(controlForecast);
  controlForecast();
};
init();
