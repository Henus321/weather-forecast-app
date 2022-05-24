import * as model from './model.js';
import currentView from './views/currentView.js';
import perHourView from './views/perHourView.js';
import weekView from './views/WeekView.js';
import mapView from './views/mapView.js';

const controlForecast = async function () {
  try {
    await model.loadForecast();

    //temp
    model.concatAll(model.state.forecast);

    perHourView.render(model.state.forecast);
    currentView.render(model.state.forecast);
    weekView.render(model.state.forecast);
    mapView.render(model.state.forecast);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  controlForecast();
};
init();
