// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"1pDGL":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "af599da5850bd9e5";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else if ('reload' in location) location.reload();
            else {
                // Web extension context
                var ext = typeof chrome === 'undefined' ? typeof browser === 'undefined' ? null : browser : chrome;
                if (ext && ext.runtime && ext.runtime.reload) ext.runtime.reload();
            }
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"1GgH0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _modelJs = require("./model.js");
var _todayViewJs = require("./views/TodayView.js");
var _todayViewJsDefault = parcelHelpers.interopDefault(_todayViewJs);
var _perHourViewJs = require("./views/perHourView.js");
var _perHourViewJsDefault = parcelHelpers.interopDefault(_perHourViewJs);
var _weekViewJs = require("./views/weekView.js");
var _weekViewJsDefault = parcelHelpers.interopDefault(_weekViewJs);
var _mapViewJs = require("./views/mapView.js");
var _mapViewJsDefault = parcelHelpers.interopDefault(_mapViewJs);
var _searchViewJs = require("./views/searchView.js");
var _searchViewJsDefault = parcelHelpers.interopDefault(_searchViewJs);
const controlForecast = async function() {
    clearView();
    try {
        const query = _searchViewJsDefault.default.getQuery();
        query ? await _modelJs.loadLocation(query) : await _modelJs.loadLocation();
        const hourlyCards = _modelJs.state.forecast.hourlyCardsData.time;
        const weeklyCards = _modelJs.state.forecast.weeklyCardsData.weekDaytimeTemp;
        _todayViewJsDefault.default.render(_modelJs.state.forecast);
        _mapViewJsDefault.default.render(_modelJs.state.forecast);
        hourlyCards.forEach(function(_, idx) {
            _perHourViewJsDefault.default.render(_modelJs.state.forecast.hourlyCardsData, idx);
        });
        weeklyCards.forEach(function(_, idx) {
            _weekViewJsDefault.default.render(_modelJs.state.forecast.weeklyCardsData, idx);
        });
    } catch (err) {
        console.log(err);
    }
};
const clearView = function() {
    _todayViewJsDefault.default.clear();
    _perHourViewJsDefault.default.clear();
    _weekViewJsDefault.default.clear();
    _mapViewJsDefault.default.clear();
};
const init = function() {
    _searchViewJsDefault.default.addHandlerSearch(controlForecast);
    controlForecast();
};
init();

},{"./model.js":"Py0LO","./views/TodayView.js":"3UjMD","./views/perHourView.js":"czWZg","./views/weekView.js":"6BEXi","./views/mapView.js":"kRWdp","./views/searchView.js":"jYSxB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"Py0LO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "state", ()=>state
);
parcelHelpers.export(exports, "loadLocation", ()=>loadLocation
);
var _configJs = require("./config.js");
var _helpersJs = require("./helpers.js");
const state = {
    forecast: {
        currentWeather: {},
        currentLocation: {},
        weekForecast: {},
        hourlyCards: {},
        weeklyCards: {}
    }
};
const loadLocation = async function(searchValue = 'berlin') {
    try {
        const responce = await fetch(`${_configJs.GEO_API_URL}${searchValue}`);
        const data = await responce.json();
        const searchResult = data.results[0];
        const cityName = searchResult.name;
        const latlang = [
            searchResult.latitude,
            searchResult.longitude
        ];
        const timezone = searchResult.timezone;
        const timezoneSplit = timezone.split('/');
        const exactDate = await loadExactTime(timezone);
        await loadForecast(latlang, cityName, timezoneSplit, exactDate);
    } catch (err) {
        console.error(`${err}💥`);
    }
};
const loadExactTime = async function(timezone) {
    try {
        const responce = await fetch(`${_configJs.TIMEZONE_API_URL}${timezone}`);
        const data = await responce.json();
        const exactTime = data.datetime.slice(0, 16);
        const exactDayOfWeek = data.day_of_week;
        const exactDate = [
            exactTime,
            exactDayOfWeek
        ];
        return exactDate;
    } catch (err) {
        console.error(err);
    }
};
const loadForecast = async function(latlng, cityName, timezone, exactDate) {
    const [lat, lng] = latlng;
    const [cont, city] = timezone;
    try {
        const responce = await fetch(`${_configJs.METEO_API_URL}latitude=${lat}&longitude=${lng}&hourly=temperature_2m,weathercode&current_weather=true&windspeed_unit=ms&timezone=${cont}%2F${city}`);
        const data = await responce.json();
        state.forecast = createForecastObject(data, cityName, exactDate);
    // console.log(data);
    // console.log(state.forecast);
    } catch (err) {
        console.error(`${err}💥`);
    }
};
const convertDayOfWeek = function(idx) {
    const weekdayName = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday', 
    ];
    return weekdayName.filter((_, dayWeekIdx)=>dayWeekIdx === idx - 1
    );
};
const createForecastObject = function(data, cityName, exactDate) {
    // Exact Time
    const [exactTime, rawDayOfWeek] = exactDate;
    const exactDayOfWeek = convertDayOfWeek(rawDayOfWeek);
    // Current date index research
    const currentTime = data.current_weather.time;
    const allWeekTime = data.hourly.time;
    const allWeekTemp = data.hourly.temperature_2m;
    const allWeatherCodes = data.hourly.weathercode;
    const curIndexMatch = (item)=>item === currentTime
    ;
    const currentTimeIndex = allWeekTime.findIndex(curIndexMatch);
    // Hourly Cards Data
    const lastTimeIndex = currentTimeIndex + _configJs.HOUR_CARDS_QUANTITY;
    const hourlyCardsTime = allWeekTime.slice(currentTimeIndex, lastTimeIndex);
    const hourlyCardsTemperature = allWeekTemp.slice(currentTimeIndex, lastTimeIndex);
    const hourlyCardsWeatherCode = allWeatherCodes.slice(currentTimeIndex, lastTimeIndex);
    // Weekly Cards Data
    const weekDates = allWeekTime.filter((_, idx)=>(idx - 15) % 24 === 0
    );
    const weekDaytimeTemp = allWeekTemp.filter((_, idx)=>(idx - 15) % 24 === 0
    );
    const weekNightimeTemp = allWeekTemp.filter((_, idx)=>(idx - 3) % 24 === 0
    );
    const weekWeatherCodes = allWeatherCodes.filter((_, idx)=>(idx - 15) % 24 === 0
    );
    const weekdayName = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday', 
    ];
    const weekPart1 = weekdayName.slice(rawDayOfWeek - 1);
    const weekPart2 = weekdayName.slice(0, rawDayOfWeek - 1);
    const weekDays = [
        ...weekPart1,
        ...weekPart2
    ];
    return {
        currentWeather: {
            temperature: data.current_weather.temperature,
            time: exactTime,
            dayOfWeek: exactDayOfWeek,
            weatherCode: data.current_weather.weathercode,
            windSpeed: data.current_weather.windspeed
        },
        currentLocation: {
            latitude: data.latitude,
            longitude: data.longitude,
            name: cityName
        },
        weekForecast: {
            time: data.hourly.time,
            temperature: data.hourly.temperature_2m
        },
        hourlyCardsData: {
            time: hourlyCardsTime,
            temperature: hourlyCardsTemperature,
            weatherCode: hourlyCardsWeatherCode
        },
        weeklyCardsData: {
            weekDates: weekDates,
            weekDays: weekDays,
            weekDaytimeTemp: weekDaytimeTemp,
            weekNighttimeTemp: weekNightimeTemp,
            weekWeatherCodes: weekWeatherCodes
        }
    };
}; // Утро — с 06:00 до 12:00 часов (часть суток после пробуждения).
 // День — с 12:00 до 18:00 часов (пик рабочей активности).
 // Вечер — с 18:00 до 00:00 часов (время отдыха после работы).
 // Ночь — с 00:00 до 06:00 часов (время сна).

},{"./config.js":"4Wc5b","./helpers.js":"6s1be","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4Wc5b":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "METEO_API_URL", ()=>METEO_API_URL
);
parcelHelpers.export(exports, "GEO_API_URL", ()=>GEO_API_URL
);
parcelHelpers.export(exports, "TIMEZONE_API_URL", ()=>TIMEZONE_API_URL
);
parcelHelpers.export(exports, "HOUR_CARDS_QUANTITY", ()=>HOUR_CARDS_QUANTITY
);
const METEO_API_URL = 'https://api.open-meteo.com/v1/forecast?';
const GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1/search?name=';
const TIMEZONE_API_URL = 'https://worldtimeapi.org/api/timezone/';
const HOUR_CARDS_QUANTITY = 6;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"6s1be":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "convertDate", ()=>convertDate
);
parcelHelpers.export(exports, "weatherCodeToIcon", ()=>weatherCodeToIcon
);
const convertDate = function(data) {
    const monthName = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December', 
    ];
    const weekdayName = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday', 
    ];
    const month = monthName[data.getMonth()];
    const weekday = weekdayName[data.getDay()];
    const day = data.getDate();
    const hours = data.getHours();
    const minutes = data.getMinutes();
    // СУПЕР УРОДЛИВАЯ СТРОКА
    const fullDate = `${day > 9 ? day : `0${day}`} ${month}, ${weekday}, ${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}`;
    return fullDate;
};
const weatherCodeToIcon = function(weatherCode) {
    switch(weatherCode){
        case 0:
            //   console.log('Clear sky');
            return '<i class="fa-solid fa-sun"></i>';
        //   break;
        case 1:
        case 2:
        case 3:
            //   console.log('Mainly clear, partly cloudy, and overcast');
            return '<i class="fa-solid fa-cloud-sun"></i>';
        case 45:
        case 48:
            // console.log('Fog and depositing rime fog');
            return '<i class="fa-solid fa-cloud"></i>';
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
        case 61:
        case 63:
        case 65:
        case 67:
        case 66:
        case 80:
        case 81:
        case 82:
            // console.log('Drizzle Light, moderate, and dense intensity');
            // console.log('Freezing Drizzle: Light and dense intensity');
            // console.log('Rain: Slight, moderate and heavy intensity');
            // console.log('Freezing Rain: Light and heavy intensity');
            // console.log('Rain showers: Slight, moderate, and violent');
            return '<i class="fa-solid fa-cloud-rain"></i>';
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            // console.log('Snow fall: Slight, moderate, and heavy intensity');
            // console.log('Snow grains');
            // console.log('Snow showers slight and heavy');
            return '<i class="fa-solid fa-snowflake"></i>';
        case 95:
        case 96:
        case 99:
            // console.log('Thunderstorm: Slight or moderate');
            // console.log('Thunderstorm with slight and heavy hail');
            return '<i class="fa-solid fa-cloud-bolt"></i>';
        default:
            // console.log('Condition not found');
            return '<i class="fa-solid fa-circle-question"></i>';
    }
}; // 0	Clear sky
 // 1, 2, 3	Mainly clear, partly cloudy, and overcast
 // 45, 48	Fog and depositing rime fog
 // 51, 53, 55	Drizzle: Light, moderate, and dense intensity
 // 56, 57	Freezing Drizzle: Light and dense intensity
 // 61, 63, 65	Rain: Slight, moderate and heavy intensity
 // 66, 67	Freezing Rain: Light and heavy intensity
 // 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
 // 77	Snow grains
 // 80, 81, 82	Rain showers: Slight, moderate, and violent
 // 85, 86	Snow showers slight and heavy
 // 95 *	Thunderstorm: Slight or moderate
 // 96, 99 *	Thunderstorm with slight and heavy hail

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3UjMD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _helpersJs = require("./../helpers.js");
class TodayView extends _viewJsDefault.default {
    _parentElement = document.querySelector('.content__today');
    _generateMarkup() {
        const weatherIcon = _helpersJs.weatherCodeToIcon(this._data.currentWeather.weatherCode);
        return `
        <h2>${this._data.currentLocation.name}</h2>
        <span>${this._data.currentWeather.dayOfWeek} ${this._data.currentWeather.time}</span>
        <div class="today-degrees">
        <span>${this._data.currentWeather.temperature}°C</span>
        <span>${weatherIcon}</span>
        </div>
        <span>wind: ${this._data.currentWeather.windSpeed} m/s</span>
    `;
    }
}
exports.default = new TodayView();

},{"./View.js":"iS7pi","./../helpers.js":"6s1be","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iS7pi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class View {
    _data;
    render(data, idx = null) {
        this._data = data;
        this._idx = idx;
        const markup = this._generateMarkup(this._data, this._idx);
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    clear() {
        this._parentElement.innerHTML = '';
    }
}
exports.default = View;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"czWZg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _helpersJs = require("./../helpers.js");
class PerHourView extends _viewJsDefault.default {
    _parentElement = document.querySelector('.content__hourly');
    _generateMarkup(data, idx) {
        const hour = data.time[idx].slice(-5).trim();
        const temperature = data.temperature[idx];
        const weatherIcon = _helpersJs.weatherCodeToIcon(data.weatherCode[idx]);
        return `
        <div class="hour">
        <span>${hour}</span>
        <span>${weatherIcon}</span>
        <span>${temperature}°C</span>
        </div>
        `;
    }
}
exports.default = new PerHourView();

},{"./View.js":"iS7pi","./../helpers.js":"6s1be","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6BEXi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _helpersJs = require("./../helpers.js");
class WeekView extends _viewJsDefault.default {
    _parentElement = document.querySelector('.week__content');
    _generateMarkup(data, idx) {
        const weekDay = data.weekDays[idx];
        const day = data.weekDates[idx].slice(5, -6);
        const daytimeTemp = data.weekDaytimeTemp[idx];
        const nighttimeTemp = data.weekNighttimeTemp[idx];
        const weatherIcon = _helpersJs.weatherCodeToIcon(data.weekWeatherCodes[idx]);
        return `
    <div class="weekday">
        <span class="font-18">${weekDay}</span>
        <span>${day}</span>
        <span>${weatherIcon}</i></span>
        <div class="weekday__temperature-container">
          <strong>Day: ${daytimeTemp}°C</strong>
          <small>Night: ${nighttimeTemp}°C</small>
        </div>

      </div>
    `;
    }
}
exports.default = new WeekView();

},{"./View.js":"iS7pi","./../helpers.js":"6s1be","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kRWdp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
class MapView extends _viewJsDefault.default {
    _parentElement = document.querySelector('.map-container');
    _generateMarkup() {
        return `
    <div class="map" id="map"></div>
    `;
    }
    _loadMap(lat, lng) {
        const map = L.map('map').setView([
            lat,
            lng
        ], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }
    render(data) {
        this._data = data;
        const markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
        this._loadMap(this._data.currentLocation.latitude, this._data.currentLocation.longitude);
    }
}
exports.default = new MapView();

},{"./View.js":"iS7pi","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jYSxB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
class SearchView extends _viewJsDefault.default {
    _parentElement = document.getElementById('search');
    getQuery() {
        const query = this._parentElement.querySelector('.search__field').value;
        this._clearInput();
        return query;
    }
    _clearInput() {
        this._parentElement.querySelector('.search__field').value = '';
    }
    addHandlerSearch(handler) {
        this._parentElement.addEventListener('submit', function(e) {
            e.preventDefault();
            handler();
        });
    }
}
exports.default = new SearchView();

},{"./View.js":"iS7pi","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["1pDGL","1GgH0"], "1GgH0", "parcelRequire9c6b")

//# sourceMappingURL=index.850bd9e5.js.map
