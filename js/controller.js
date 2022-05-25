import * as model from './model.js';
import todayView from './views/TodayView.js';
import perHourView from './views/perHourView.js';
import weekView from './views/weekView.js';
import mapView from './views/mapView.js';
import searchView from './views/searchView.js';

const controlForecast = async function () {
  clearView();
  try {
    const query = searchView.getQuery();
    query ? await model.loadLocation(query) : await model.loadLocation();

    const hourlyCards = model.state.forecast.hourlyCardsData.time;
    const weeklyCards = model.state.forecast.weeklyCardsData.weekDay;

    todayView.render(model.state.forecast);
    mapView.render(model.state.forecast);
    hourlyCards.forEach(function (_, idx) {
      perHourView.render(model.state.forecast.hourlyCardsData, idx);
    });
    weeklyCards.forEach(function (_, idx) {
      weekView.render(model.state.forecast.weeklyCardsData, idx);
    });
  } catch (err) {
    console.log(err);
  }
};

const clearView = function () {
  todayView.clear();
  perHourView.clear();
  weekView.clear();
  mapView.clear();
};

const init = function () {
  searchView.addHandlerSearch(controlForecast);
  controlForecast();
};
init();
