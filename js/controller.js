import * as model from './model.js';
import currentView from './views/currentView.js';
import perHourView from './views/perHourView.js';
import weekView from './views/WeekView.js';
import mapView from './views/mapView.js';

const controlForecast = async function () {
  try {
    await model.loadForecast();

    const hourlyCards = model.state.forecast.hourlyCardsData.time;
    const testWeeksArray = model.state.forecast.testWeeks;
    // const hourlyCardsData = model.state.forecast.hourlyCardsData;
    currentView.render(model.state.forecast);
    mapView.render(model.state.forecast);
    hourlyCards.forEach(function (_, idx) {
      perHourView.render(model.state.forecast.hourlyCardsData, idx);
    });
    testWeeksArray.forEach(function (data) {
      weekView.render(data);
    });
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  controlForecast();
};
init();
