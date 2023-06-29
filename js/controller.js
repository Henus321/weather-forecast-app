import * as model from './model.js';
import todayView from './views/todayView.js';
import perHourView from './views/perHourView.js';
import weekView from './views/weekView.js';
import mapView from './views/mapView.js';
import searchView from './views/searchView.js';
import errorView from './views/errorView.js';
import exampleView from './views/exampleView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

const controlForecast = async function () {
  try {
    const state = model.state.forecast;
    await model.loadLocation(searchView.getQuery());
    await model.loadCurrentTime(state.location.timezone);
    await model.loadForecast(state);

    todayView.render(state);
    mapView.render(state.location);
    perHourView.render(state.hourlyCardsData);
    weekView.render(state.weekDayCardsData);
  } catch (err) {
    errorView.render(err.message);
  }
};

const init = function () {
  searchView.addHandlerSearch(controlForecast);
  exampleView.addHandlerSearch(controlForecast);
};
init();
