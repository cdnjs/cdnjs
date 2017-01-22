(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Dygraph = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

(function () {
    try {
        cachedSetTimeout = setTimeout;
    } catch (e) {
        cachedSetTimeout = function () {
            throw new Error('setTimeout is not defined');
        }
    }
    try {
        cachedClearTimeout = clearTimeout;
    } catch (e) {
        cachedClearTimeout = function () {
            throw new Error('clearTimeout is not defined');
        }
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0);
    } else {
        return cachedSetTimeout.call(null, fun, 0);
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        clearTimeout(marker);
    } else {
        cachedClearTimeout.call(null, marker);
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
/**
 * @license
 * Copyright 2013 David Eberlein (david.eberlein@ch.sauter-bc.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview DataHandler implementation for the custom bars option.
 * @author David Eberlein (david.eberlein@ch.sauter-bc.com)
 */

/*global Dygraph:false */
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bars = require('./bars');

var _bars2 = _interopRequireDefault(_bars);

/**
 * @constructor
 * @extends Dygraph.DataHandlers.BarsHandler
 */
var CustomBarsHandler = function CustomBarsHandler() {};

CustomBarsHandler.prototype = new _bars2['default']();

/** @inheritDoc */
CustomBarsHandler.prototype.extractSeries = function (rawData, i, options) {
  // TODO(danvk): pre-allocate series here.
  var series = [];
  var x, y, point;
  var logScale = options.get('logscale');
  for (var j = 0; j < rawData.length; j++) {
    x = rawData[j][0];
    point = rawData[j][i];
    if (logScale && point !== null) {
      // On the log scale, points less than zero do not exist.
      // This will create a gap in the chart.
      if (point[0] <= 0 || point[1] <= 0 || point[2] <= 0) {
        point = null;
      }
    }
    // Extract to the unified data format.
    if (point !== null) {
      y = point[1];
      if (y !== null && !isNaN(y)) {
        series.push([x, y, [point[0], point[2]]]);
      } else {
        series.push([x, y, [y, y]]);
      }
    } else {
      series.push([x, null, [null, null]]);
    }
  }
  return series;
};

/** @inheritDoc */
CustomBarsHandler.prototype.rollingAverage = function (originalData, rollPeriod, options) {
  rollPeriod = Math.min(rollPeriod, originalData.length);
  var rollingData = [];
  var y, low, high, mid, count, i, extremes;

  low = 0;
  mid = 0;
  high = 0;
  count = 0;
  for (i = 0; i < originalData.length; i++) {
    y = originalData[i][1];
    extremes = originalData[i][2];
    rollingData[i] = originalData[i];

    if (y !== null && !isNaN(y)) {
      low += extremes[0];
      mid += y;
      high += extremes[1];
      count += 1;
    }
    if (i - rollPeriod >= 0) {
      var prev = originalData[i - rollPeriod];
      if (prev[1] !== null && !isNaN(prev[1])) {
        low -= prev[2][0];
        mid -= prev[1];
        high -= prev[2][1];
        count -= 1;
      }
    }
    if (count) {
      rollingData[i] = [originalData[i][0], 1.0 * mid / count, [1.0 * low / count, 1.0 * high / count]];
    } else {
      rollingData[i] = [originalData[i][0], null, [null, null]];
    }
  }

  return rollingData;
};

exports['default'] = CustomBarsHandler;
module.exports = exports['default'];

},{"./bars":5}],3:[function(require,module,exports){
/**
 * @license
 * Copyright 2013 David Eberlein (david.eberlein@ch.sauter-bc.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview DataHandler implementation for the error bars option.
 * @author David Eberlein (david.eberlein@ch.sauter-bc.com)
 */

/*global Dygraph:false */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _bars = require('./bars');

var _bars2 = _interopRequireDefault(_bars);

/**
 * @constructor
 * @extends BarsHandler
 */
var ErrorBarsHandler = function ErrorBarsHandler() {};

ErrorBarsHandler.prototype = new _bars2["default"]();

/** @inheritDoc */
ErrorBarsHandler.prototype.extractSeries = function (rawData, i, options) {
  // TODO(danvk): pre-allocate series here.
  var series = [];
  var x, y, variance, point;
  var sigma = options.get("sigma");
  var logScale = options.get('logscale');
  for (var j = 0; j < rawData.length; j++) {
    x = rawData[j][0];
    point = rawData[j][i];
    if (logScale && point !== null) {
      // On the log scale, points less than zero do not exist.
      // This will create a gap in the chart.
      if (point[0] <= 0 || point[0] - sigma * point[1] <= 0) {
        point = null;
      }
    }
    // Extract to the unified data format.
    if (point !== null) {
      y = point[0];
      if (y !== null && !isNaN(y)) {
        variance = sigma * point[1];
        // preserve original error value in extras for further
        // filtering
        series.push([x, y, [y - variance, y + variance, point[1]]]);
      } else {
        series.push([x, y, [y, y, y]]);
      }
    } else {
      series.push([x, null, [null, null, null]]);
    }
  }
  return series;
};

/** @inheritDoc */
ErrorBarsHandler.prototype.rollingAverage = function (originalData, rollPeriod, options) {
  rollPeriod = Math.min(rollPeriod, originalData.length);
  var rollingData = [];
  var sigma = options.get("sigma");

  var i, j, y, v, sum, num_ok, stddev, variance, value;

  // Calculate the rolling average for the first rollPeriod - 1 points
  // where there is not enough data to roll over the full number of points
  for (i = 0; i < originalData.length; i++) {
    sum = 0;
    variance = 0;
    num_ok = 0;
    for (j = Math.max(0, i - rollPeriod + 1); j < i + 1; j++) {
      y = originalData[j][1];
      if (y === null || isNaN(y)) continue;
      num_ok++;
      sum += y;
      variance += Math.pow(originalData[j][2][2], 2);
    }
    if (num_ok) {
      stddev = Math.sqrt(variance) / num_ok;
      value = sum / num_ok;
      rollingData[i] = [originalData[i][0], value, [value - sigma * stddev, value + sigma * stddev]];
    } else {
      // This explicitly preserves NaNs to aid with "independent
      // series".
      // See testRollingAveragePreservesNaNs.
      v = rollPeriod == 1 ? originalData[i][1] : null;
      rollingData[i] = [originalData[i][0], v, [v, v]];
    }
  }

  return rollingData;
};

exports["default"] = ErrorBarsHandler;
module.exports = exports["default"];

},{"./bars":5}],4:[function(require,module,exports){
/**
 * @license
 * Copyright 2013 David Eberlein (david.eberlein@ch.sauter-bc.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview DataHandler implementation for the combination 
 * of error bars and fractions options.
 * @author David Eberlein (david.eberlein@ch.sauter-bc.com)
 */

/*global Dygraph:false */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _bars = require('./bars');

var _bars2 = _interopRequireDefault(_bars);

/**
 * @constructor
 * @extends Dygraph.DataHandlers.BarsHandler
 */
var FractionsBarsHandler = function FractionsBarsHandler() {};

FractionsBarsHandler.prototype = new _bars2["default"]();

/** @inheritDoc */
FractionsBarsHandler.prototype.extractSeries = function (rawData, i, options) {
  // TODO(danvk): pre-allocate series here.
  var series = [];
  var x, y, point, num, den, value, stddev, variance;
  var mult = 100.0;
  var sigma = options.get("sigma");
  var logScale = options.get('logscale');
  for (var j = 0; j < rawData.length; j++) {
    x = rawData[j][0];
    point = rawData[j][i];
    if (logScale && point !== null) {
      // On the log scale, points less than zero do not exist.
      // This will create a gap in the chart.
      if (point[0] <= 0 || point[1] <= 0) {
        point = null;
      }
    }
    // Extract to the unified data format.
    if (point !== null) {
      num = point[0];
      den = point[1];
      if (num !== null && !isNaN(num)) {
        value = den ? num / den : 0.0;
        stddev = den ? sigma * Math.sqrt(value * (1 - value) / den) : 1.0;
        variance = mult * stddev;
        y = mult * value;
        // preserve original values in extras for further filtering
        series.push([x, y, [y - variance, y + variance, num, den]]);
      } else {
        series.push([x, num, [num, num, num, den]]);
      }
    } else {
      series.push([x, null, [null, null, null, null]]);
    }
  }
  return series;
};

/** @inheritDoc */
FractionsBarsHandler.prototype.rollingAverage = function (originalData, rollPeriod, options) {
  rollPeriod = Math.min(rollPeriod, originalData.length);
  var rollingData = [];
  var sigma = options.get("sigma");
  var wilsonInterval = options.get("wilsonInterval");

  var low, high, i, stddev;
  var num = 0;
  var den = 0; // numerator/denominator
  var mult = 100.0;
  for (i = 0; i < originalData.length; i++) {
    num += originalData[i][2][2];
    den += originalData[i][2][3];
    if (i - rollPeriod >= 0) {
      num -= originalData[i - rollPeriod][2][2];
      den -= originalData[i - rollPeriod][2][3];
    }

    var date = originalData[i][0];
    var value = den ? num / den : 0.0;
    if (wilsonInterval) {
      // For more details on this confidence interval, see:
      // http://en.wikipedia.org/wiki/Binomial_confidence_interval
      if (den) {
        var p = value < 0 ? 0 : value,
            n = den;
        var pm = sigma * Math.sqrt(p * (1 - p) / n + sigma * sigma / (4 * n * n));
        var denom = 1 + sigma * sigma / den;
        low = (p + sigma * sigma / (2 * den) - pm) / denom;
        high = (p + sigma * sigma / (2 * den) + pm) / denom;
        rollingData[i] = [date, p * mult, [low * mult, high * mult]];
      } else {
        rollingData[i] = [date, 0, [0, 0]];
      }
    } else {
      stddev = den ? sigma * Math.sqrt(value * (1 - value) / den) : 1.0;
      rollingData[i] = [date, mult * value, [mult * (value - stddev), mult * (value + stddev)]];
    }
  }

  return rollingData;
};

exports["default"] = FractionsBarsHandler;
module.exports = exports["default"];

},{"./bars":5}],5:[function(require,module,exports){
/**
 * @license
 * Copyright 2013 David Eberlein (david.eberlein@ch.sauter-bc.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview DataHandler base implementation for the "bar" 
 * data formats. This implementation must be extended and the
 * extractSeries and rollingAverage must be implemented.
 * @author David Eberlein (david.eberlein@ch.sauter-bc.com)
 */

/*global Dygraph:false */
/*global DygraphLayout:false */
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _datahandler = require('./datahandler');

var _datahandler2 = _interopRequireDefault(_datahandler);

var _dygraphLayout = require('../dygraph-layout');

var _dygraphLayout2 = _interopRequireDefault(_dygraphLayout);

/**
 * @constructor
 * @extends {Dygraph.DataHandler}
 */
var BarsHandler = function BarsHandler() {
  _datahandler2['default'].call(this);
};
BarsHandler.prototype = new _datahandler2['default']();

// TODO(danvk): figure out why the jsdoc has to be copy/pasted from superclass.
//   (I get closure compiler errors if this isn't here.)
/**
 * @override
 * @param {!Array.<Array>} rawData The raw data passed into dygraphs where 
 *     rawData[i] = [x,ySeries1,...,ySeriesN].
 * @param {!number} seriesIndex Index of the series to extract. All other
 *     series should be ignored.
 * @param {!DygraphOptions} options Dygraph options.
 * @return {Array.<[!number,?number,?]>} The series in the unified data format
 *     where series[i] = [x,y,{extras}]. 
 */
BarsHandler.prototype.extractSeries = function (rawData, seriesIndex, options) {
  // Not implemented here must be extended
};

/**
 * @override
 * @param {!Array.<[!number,?number,?]>} series The series in the unified 
 *          data format where series[i] = [x,y,{extras}].
 * @param {!number} rollPeriod The number of points over which to average the data
 * @param {!DygraphOptions} options The dygraph options.
 * TODO(danvk): be more specific than "Array" here.
 * @return {!Array.<[!number,?number,?]>} the rolled series.
 */
BarsHandler.prototype.rollingAverage = function (series, rollPeriod, options) {
  // Not implemented here, must be extended.
};

/** @inheritDoc */
BarsHandler.prototype.onPointsCreated_ = function (series, points) {
  for (var i = 0; i < series.length; ++i) {
    var item = series[i];
    var point = points[i];
    point.y_top = NaN;
    point.y_bottom = NaN;
    point.yval_minus = _datahandler2['default'].parseFloat(item[2][0]);
    point.yval_plus = _datahandler2['default'].parseFloat(item[2][1]);
  }
};

/** @inheritDoc */
BarsHandler.prototype.getExtremeYValues = function (series, dateWindow, options) {
  var minY = null,
      maxY = null,
      y;

  var firstIdx = 0;
  var lastIdx = series.length - 1;

  for (var j = firstIdx; j <= lastIdx; j++) {
    y = series[j][1];
    if (y === null || isNaN(y)) continue;

    var low = series[j][2][0];
    var high = series[j][2][1];

    if (low > y) low = y; // this can happen with custom bars,
    if (high < y) high = y; // e.g. in tests/custom-bars.html

    if (maxY === null || high > maxY) maxY = high;
    if (minY === null || low < minY) minY = low;
  }

  return [minY, maxY];
};

/** @inheritDoc */
BarsHandler.prototype.onLineEvaluated = function (points, axis, logscale) {
  var point;
  for (var j = 0; j < points.length; j++) {
    // Copy over the error terms
    point = points[j];
    point.y_top = _dygraphLayout2['default'].calcYNormal_(axis, point.yval_minus, logscale);
    point.y_bottom = _dygraphLayout2['default'].calcYNormal_(axis, point.yval_plus, logscale);
  }
};

exports['default'] = BarsHandler;
module.exports = exports['default'];

},{"../dygraph-layout":13,"./datahandler":6}],6:[function(require,module,exports){
/**
 * @license
 * Copyright 2013 David Eberlein (david.eberlein@ch.sauter-bc.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview This file contains the managment of data handlers
 * @author David Eberlein (david.eberlein@ch.sauter-bc.com)
 *
 * The idea is to define a common, generic data format that works for all data
 * structures supported by dygraphs. To make this possible, the DataHandler
 * interface is introduced. This makes it possible, that dygraph itself can work
 * with the same logic for every data type independent of the actual format and
 * the DataHandler takes care of the data format specific jobs.
 * DataHandlers are implemented for all data types supported by Dygraphs and
 * return Dygraphs compliant formats.
 * By default the correct DataHandler is chosen based on the options set.
 * Optionally the user may use his own DataHandler (similar to the plugin
 * system).
 *
 *
 * The unified data format returend by each handler is defined as so:
 * series[n][point] = [x,y,(extras)]
 *
 * This format contains the common basis that is needed to draw a simple line
 * series extended by optional extras for more complex graphing types. It
 * contains a primitive x value as first array entry, a primitive y value as
 * second array entry and an optional extras object for additional data needed.
 *
 * x must always be a number.
 * y must always be a number, NaN of type number or null.
 * extras is optional and must be interpreted by the DataHandler. It may be of
 * any type.
 *
 * In practice this might look something like this:
 * default: [x, yVal]
 * errorBar / customBar: [x, yVal, [yTopVariance, yBottomVariance] ]
 *
 */
/*global Dygraph:false */
/*global DygraphLayout:false */

"use strict";

/**
 *
 * The data handler is responsible for all data specific operations. All of the
 * series data it receives and returns is always in the unified data format.
 * Initially the unified data is created by the extractSeries method
 * @constructor
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
var DygraphDataHandler = function DygraphDataHandler() {};

var handler = DygraphDataHandler;

/**
 * X-value array index constant for unified data samples.
 * @const
 * @type {number}
 */
handler.X = 0;

/**
 * Y-value array index constant for unified data samples.
 * @const
 * @type {number}
 */
handler.Y = 1;

/**
 * Extras-value array index constant for unified data samples.
 * @const
 * @type {number}
 */
handler.EXTRAS = 2;

/**
 * Extracts one series from the raw data (a 2D array) into an array of the
 * unified data format.
 * This is where undesirable points (i.e. negative values on log scales and
 * missing values through which we wish to connect lines) are dropped.
 * TODO(danvk): the "missing values" bit above doesn't seem right.
 *
 * @param {!Array.<Array>} rawData The raw data passed into dygraphs where
 *     rawData[i] = [x,ySeries1,...,ySeriesN].
 * @param {!number} seriesIndex Index of the series to extract. All other
 *     series should be ignored.
 * @param {!DygraphOptions} options Dygraph options.
 * @return {Array.<[!number,?number,?]>} The series in the unified data format
 *     where series[i] = [x,y,{extras}].
 */
handler.prototype.extractSeries = function (rawData, seriesIndex, options) {};

/**
 * Converts a series to a Point array.  The resulting point array must be
 * returned in increasing order of idx property.
 *
 * @param {!Array.<[!number,?number,?]>} series The series in the unified
 *          data format where series[i] = [x,y,{extras}].
 * @param {!string} setName Name of the series.
 * @param {!number} boundaryIdStart Index offset of the first point, equal to the
 *          number of skipped points left of the date window minimum (if any).
 * @return {!Array.<Dygraph.PointType>} List of points for this series.
 */
handler.prototype.seriesToPoints = function (series, setName, boundaryIdStart) {
  // TODO(bhs): these loops are a hot-spot for high-point-count charts. In
  // fact,
  // on chrome+linux, they are 6 times more expensive than iterating through
  // the
  // points and drawing the lines. The brunt of the cost comes from allocating
  // the |point| structures.
  var points = [];
  for (var i = 0; i < series.length; ++i) {
    var item = series[i];
    var yraw = item[1];
    var yval = yraw === null ? null : handler.parseFloat(yraw);
    var point = {
      x: NaN,
      y: NaN,
      xval: handler.parseFloat(item[0]),
      yval: yval,
      name: setName, // TODO(danvk): is this really necessary?
      idx: i + boundaryIdStart
    };
    points.push(point);
  }
  this.onPointsCreated_(series, points);
  return points;
};

/**
 * Callback called for each series after the series points have been generated
 * which will later be used by the plotters to draw the graph.
 * Here data may be added to the seriesPoints which is needed by the plotters.
 * The indexes of series and points are in sync meaning the original data
 * sample for series[i] is points[i].
 *
 * @param {!Array.<[!number,?number,?]>} series The series in the unified
 *     data format where series[i] = [x,y,{extras}].
 * @param {!Array.<Dygraph.PointType>} points The corresponding points passed
 *     to the plotter.
 * @protected
 */
handler.prototype.onPointsCreated_ = function (series, points) {};

/**
 * Calculates the rolling average of a data set.
 *
 * @param {!Array.<[!number,?number,?]>} series The series in the unified
 *          data format where series[i] = [x,y,{extras}].
 * @param {!number} rollPeriod The number of points over which to average the data
 * @param {!DygraphOptions} options The dygraph options.
 * @return {!Array.<[!number,?number,?]>} the rolled series.
 */
handler.prototype.rollingAverage = function (series, rollPeriod, options) {};

/**
 * Computes the range of the data series (including confidence intervals).
 *
 * @param {!Array.<[!number,?number,?]>} series The series in the unified
 *     data format where series[i] = [x, y, {extras}].
 * @param {!Array.<number>} dateWindow The x-value range to display with
 *     the format: [min, max].
 * @param {!DygraphOptions} options The dygraph options.
 * @return {Array.<number>} The low and high extremes of the series in the
 *     given window with the format: [low, high].
 */
handler.prototype.getExtremeYValues = function (series, dateWindow, options) {};

/**
 * Callback called for each series after the layouting data has been
 * calculated before the series is drawn. Here normalized positioning data
 * should be calculated for the extras of each point.
 *
 * @param {!Array.<Dygraph.PointType>} points The points passed to
 *          the plotter.
 * @param {!Object} axis The axis on which the series will be plotted.
 * @param {!boolean} logscale Weather or not to use a logscale.
 */
handler.prototype.onLineEvaluated = function (points, axis, logscale) {};

/**
 * Optimized replacement for parseFloat, which was way too slow when almost
 * all values were type number, with few edge cases, none of which were strings.
 * @param {?number} val
 * @return {number}
 * @protected
 */
handler.parseFloat = function (val) {
  // parseFloat(null) is NaN
  if (val === null) {
    return NaN;
  }

  // Assume it's a number or NaN. If it's something else, I'll be shocked.
  return val;
};

exports["default"] = DygraphDataHandler;
module.exports = exports["default"];

},{}],7:[function(require,module,exports){
/**
 * @license
 * Copyright 2013 David Eberlein (david.eberlein@ch.sauter-bc.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview DataHandler implementation for the fractions option.
 * @author David Eberlein (david.eberlein@ch.sauter-bc.com)
 */

/*global Dygraph:false */
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _datahandler = require('./datahandler');

var _datahandler2 = _interopRequireDefault(_datahandler);

var _default = require('./default');

var _default2 = _interopRequireDefault(_default);

/**
 * @extends DefaultHandler
 * @constructor
 */
var DefaultFractionHandler = function DefaultFractionHandler() {};

DefaultFractionHandler.prototype = new _default2['default']();

DefaultFractionHandler.prototype.extractSeries = function (rawData, i, options) {
  // TODO(danvk): pre-allocate series here.
  var series = [];
  var x, y, point, num, den, value;
  var mult = 100.0;
  var logScale = options.get('logscale');
  for (var j = 0; j < rawData.length; j++) {
    x = rawData[j][0];
    point = rawData[j][i];
    if (logScale && point !== null) {
      // On the log scale, points less than zero do not exist.
      // This will create a gap in the chart.
      if (point[0] <= 0 || point[1] <= 0) {
        point = null;
      }
    }
    // Extract to the unified data format.
    if (point !== null) {
      num = point[0];
      den = point[1];
      if (num !== null && !isNaN(num)) {
        value = den ? num / den : 0.0;
        y = mult * value;
        // preserve original values in extras for further filtering
        series.push([x, y, [num, den]]);
      } else {
        series.push([x, num, [num, den]]);
      }
    } else {
      series.push([x, null, [null, null]]);
    }
  }
  return series;
};

DefaultFractionHandler.prototype.rollingAverage = function (originalData, rollPeriod, options) {
  rollPeriod = Math.min(rollPeriod, originalData.length);
  var rollingData = [];

  var i;
  var num = 0;
  var den = 0; // numerator/denominator
  var mult = 100.0;
  for (i = 0; i < originalData.length; i++) {
    num += originalData[i][2][0];
    den += originalData[i][2][1];
    if (i - rollPeriod >= 0) {
      num -= originalData[i - rollPeriod][2][0];
      den -= originalData[i - rollPeriod][2][1];
    }

    var date = originalData[i][0];
    var value = den ? num / den : 0.0;
    rollingData[i] = [date, mult * value];
  }

  return rollingData;
};

exports['default'] = DefaultFractionHandler;
module.exports = exports['default'];

},{"./datahandler":6,"./default":8}],8:[function(require,module,exports){
/**
 * @license
 * Copyright 2013 David Eberlein (david.eberlein@ch.sauter-bc.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview DataHandler default implementation used for simple line charts.
 * @author David Eberlein (david.eberlein@ch.sauter-bc.com)
 */

/*global Dygraph:false */
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _datahandler = require('./datahandler');

var _datahandler2 = _interopRequireDefault(_datahandler);

/**
 * @constructor
 * @extends Dygraph.DataHandler
 */
var DefaultHandler = function DefaultHandler() {};

DefaultHandler.prototype = new _datahandler2['default']();

/** @inheritDoc */
DefaultHandler.prototype.extractSeries = function (rawData, i, options) {
  // TODO(danvk): pre-allocate series here.
  var series = [];
  var logScale = options.get('logscale');
  for (var j = 0; j < rawData.length; j++) {
    var x = rawData[j][0];
    var point = rawData[j][i];
    if (logScale) {
      // On the log scale, points less than zero do not exist.
      // This will create a gap in the chart.
      if (point <= 0) {
        point = null;
      }
    }
    series.push([x, point]);
  }
  return series;
};

/** @inheritDoc */
DefaultHandler.prototype.rollingAverage = function (originalData, rollPeriod, options) {
  rollPeriod = Math.min(rollPeriod, originalData.length);
  var rollingData = [];

  var i, j, y, sum, num_ok;
  // Calculate the rolling average for the first rollPeriod - 1 points
  // where
  // there is not enough data to roll over the full number of points
  if (rollPeriod == 1) {
    return originalData;
  }
  for (i = 0; i < originalData.length; i++) {
    sum = 0;
    num_ok = 0;
    for (j = Math.max(0, i - rollPeriod + 1); j < i + 1; j++) {
      y = originalData[j][1];
      if (y === null || isNaN(y)) continue;
      num_ok++;
      sum += originalData[j][1];
    }
    if (num_ok) {
      rollingData[i] = [originalData[i][0], sum / num_ok];
    } else {
      rollingData[i] = [originalData[i][0], null];
    }
  }

  return rollingData;
};

/** @inheritDoc */
DefaultHandler.prototype.getExtremeYValues = function (series, dateWindow, options) {
  var minY = null,
      maxY = null,
      y;
  var firstIdx = 0,
      lastIdx = series.length - 1;

  for (var j = firstIdx; j <= lastIdx; j++) {
    y = series[j][1];
    if (y === null || isNaN(y)) continue;
    if (maxY === null || y > maxY) {
      maxY = y;
    }
    if (minY === null || y < minY) {
      minY = y;
    }
  }
  return [minY, maxY];
};

exports['default'] = DefaultHandler;
module.exports = exports['default'];

},{"./datahandler":6}],9:[function(require,module,exports){
/**
 * @license
 * Copyright 2006 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview Based on PlotKit.CanvasRenderer, but modified to meet the
 * needs of dygraphs.
 *
 * In particular, support for:
 * - grid overlays
 * - error bars
 * - dygraphs attribute system
 */

/**
 * The DygraphCanvasRenderer class does the actual rendering of the chart onto
 * a canvas. It's based on PlotKit.CanvasRenderer.
 * @param {Object} element The canvas to attach to
 * @param {Object} elementContext The 2d context of the canvas (injected so it
 * can be mocked for testing.)
 * @param {Layout} layout The DygraphLayout object for this graph.
 * @constructor
 */

/*global Dygraph:false */
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dygraphUtils = require('./dygraph-utils');

var utils = _interopRequireWildcard(_dygraphUtils);

var _dygraph = require('./dygraph');

var _dygraph2 = _interopRequireDefault(_dygraph);

/**
 * @constructor
 *
 * This gets called when there are "new points" to chart. This is generally the
 * case when the underlying data being charted has changed. It is _not_ called
 * in the common case that the user has zoomed or is panning the view.
 *
 * The chart canvas has already been created by the Dygraph object. The
 * renderer simply gets a drawing context.
 *
 * @param {Dygraph} dygraph The chart to which this renderer belongs.
 * @param {HTMLCanvasElement} element The &lt;canvas&gt; DOM element on which to draw.
 * @param {CanvasRenderingContext2D} elementContext The drawing context.
 * @param {DygraphLayout} layout The chart's DygraphLayout object.
 *
 * TODO(danvk): remove the elementContext property.
 */
var DygraphCanvasRenderer = function DygraphCanvasRenderer(dygraph, element, elementContext, layout) {
  this.dygraph_ = dygraph;

  this.layout = layout;
  this.element = element;
  this.elementContext = elementContext;

  this.height = dygraph.height_;
  this.width = dygraph.width_;

  // --- check whether everything is ok before we return
  if (!utils.isCanvasSupported(this.element)) {
    throw "Canvas is not supported.";
  }

  // internal state
  this.area = layout.getPlotArea();

  // Set up a clipping area for the canvas (and the interaction canvas).
  // This ensures that we don't overdraw.
  var ctx = this.dygraph_.canvas_ctx_;
  ctx.beginPath();
  ctx.rect(this.area.x, this.area.y, this.area.w, this.area.h);
  ctx.clip();

  ctx = this.dygraph_.hidden_ctx_;
  ctx.beginPath();
  ctx.rect(this.area.x, this.area.y, this.area.w, this.area.h);
  ctx.clip();
};

/**
 * Clears out all chart content and DOM elements.
 * This is called immediately before render() on every frame, including
 * during zooms and pans.
 * @private
 */
DygraphCanvasRenderer.prototype.clear = function () {
  this.elementContext.clearRect(0, 0, this.width, this.height);
};

/**
 * This method is responsible for drawing everything on the chart, including
 * lines, error bars, fills and axes.
 * It is called immediately after clear() on every frame, including during pans
 * and zooms.
 * @private
 */
DygraphCanvasRenderer.prototype.render = function () {
  // attaches point.canvas{x,y}
  this._updatePoints();

  // actually draws the chart.
  this._renderLineChart();
};

/**
 * Returns a predicate to be used with an iterator, which will
 * iterate over points appropriately, depending on whether
 * connectSeparatedPoints is true. When it's false, the predicate will
 * skip over points with missing yVals.
 */
DygraphCanvasRenderer._getIteratorPredicate = function (connectSeparatedPoints) {
  return connectSeparatedPoints ? DygraphCanvasRenderer._predicateThatSkipsEmptyPoints : null;
};

DygraphCanvasRenderer._predicateThatSkipsEmptyPoints = function (array, idx) {
  return array[idx].yval !== null;
};

/**
 * Draws a line with the styles passed in and calls all the drawPointCallbacks.
 * @param {Object} e The dictionary passed to the plotter function.
 * @private
 */
DygraphCanvasRenderer._drawStyledLine = function (e, color, strokeWidth, strokePattern, drawPoints, drawPointCallback, pointSize) {
  var g = e.dygraph;
  // TODO(konigsberg): Compute attributes outside this method call.
  var stepPlot = g.getBooleanOption("stepPlot", e.setName);

  if (!utils.isArrayLike(strokePattern)) {
    strokePattern = null;
  }

  var drawGapPoints = g.getBooleanOption('drawGapEdgePoints', e.setName);

  var points = e.points;
  var setName = e.setName;
  var iter = utils.createIterator(points, 0, points.length, DygraphCanvasRenderer._getIteratorPredicate(g.getBooleanOption("connectSeparatedPoints", setName)));

  var stroking = strokePattern && strokePattern.length >= 2;

  var ctx = e.drawingContext;
  ctx.save();
  if (stroking) {
    if (ctx.setLineDash) ctx.setLineDash(strokePattern);
  }

  var pointsOnLine = DygraphCanvasRenderer._drawSeries(e, iter, strokeWidth, pointSize, drawPoints, drawGapPoints, stepPlot, color);
  DygraphCanvasRenderer._drawPointsOnLine(e, pointsOnLine, drawPointCallback, color, pointSize);

  if (stroking) {
    if (ctx.setLineDash) ctx.setLineDash([]);
  }

  ctx.restore();
};

/**
 * This does the actual drawing of lines on the canvas, for just one series.
 * Returns a list of [canvasx, canvasy] pairs for points for which a
 * drawPointCallback should be fired.  These include isolated points, or all
 * points if drawPoints=true.
 * @param {Object} e The dictionary passed to the plotter function.
 * @private
 */
DygraphCanvasRenderer._drawSeries = function (e, iter, strokeWidth, pointSize, drawPoints, drawGapPoints, stepPlot, color) {

  var prevCanvasX = null;
  var prevCanvasY = null;
  var nextCanvasY = null;
  var isIsolated; // true if this point is isolated (no line segments)
  var point; // the point being processed in the while loop
  var pointsOnLine = []; // Array of [canvasx, canvasy] pairs.
  var first = true; // the first cycle through the while loop

  var ctx = e.drawingContext;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = strokeWidth;

  // NOTE: we break the iterator's encapsulation here for about a 25% speedup.
  var arr = iter.array_;
  var limit = iter.end_;
  var predicate = iter.predicate_;

  for (var i = iter.start_; i < limit; i++) {
    point = arr[i];
    if (predicate) {
      while (i < limit && !predicate(arr, i)) {
        i++;
      }
      if (i == limit) break;
      point = arr[i];
    }

    // FIXME: The 'canvasy != canvasy' test here catches NaN values but the test
    // doesn't catch Infinity values. Could change this to
    // !isFinite(point.canvasy), but I assume it avoids isNaN for performance?
    if (point.canvasy === null || point.canvasy != point.canvasy) {
      if (stepPlot && prevCanvasX !== null) {
        // Draw a horizontal line to the start of the missing data
        ctx.moveTo(prevCanvasX, prevCanvasY);
        ctx.lineTo(point.canvasx, prevCanvasY);
      }
      prevCanvasX = prevCanvasY = null;
    } else {
      isIsolated = false;
      if (drawGapPoints || prevCanvasX === null) {
        iter.nextIdx_ = i;
        iter.next();
        nextCanvasY = iter.hasNext ? iter.peek.canvasy : null;

        var isNextCanvasYNullOrNaN = nextCanvasY === null || nextCanvasY != nextCanvasY;
        isIsolated = prevCanvasX === null && isNextCanvasYNullOrNaN;
        if (drawGapPoints) {
          // Also consider a point to be "isolated" if it's adjacent to a
          // null point, excluding the graph edges.
          if (!first && prevCanvasX === null || iter.hasNext && isNextCanvasYNullOrNaN) {
            isIsolated = true;
          }
        }
      }

      if (prevCanvasX !== null) {
        if (strokeWidth) {
          if (stepPlot) {
            ctx.moveTo(prevCanvasX, prevCanvasY);
            ctx.lineTo(point.canvasx, prevCanvasY);
          }

          ctx.lineTo(point.canvasx, point.canvasy);
        }
      } else {
        ctx.moveTo(point.canvasx, point.canvasy);
      }
      if (drawPoints || isIsolated) {
        pointsOnLine.push([point.canvasx, point.canvasy, point.idx]);
      }
      prevCanvasX = point.canvasx;
      prevCanvasY = point.canvasy;
    }
    first = false;
  }
  ctx.stroke();
  return pointsOnLine;
};

/**
 * This fires the drawPointCallback functions, which draw dots on the points by
 * default. This gets used when the "drawPoints" option is set, or when there
 * are isolated points.
 * @param {Object} e The dictionary passed to the plotter function.
 * @private
 */
DygraphCanvasRenderer._drawPointsOnLine = function (e, pointsOnLine, drawPointCallback, color, pointSize) {
  var ctx = e.drawingContext;
  for (var idx = 0; idx < pointsOnLine.length; idx++) {
    var cb = pointsOnLine[idx];
    ctx.save();
    drawPointCallback.call(e.dygraph, e.dygraph, e.setName, ctx, cb[0], cb[1], color, pointSize, cb[2]);
    ctx.restore();
  }
};

/**
 * Attaches canvas coordinates to the points array.
 * @private
 */
DygraphCanvasRenderer.prototype._updatePoints = function () {
  // Update Points
  // TODO(danvk): here
  //
  // TODO(bhs): this loop is a hot-spot for high-point-count charts. These
  // transformations can be pushed into the canvas via linear transformation
  // matrices.
  // NOTE(danvk): this is trickier than it sounds at first. The transformation
  // needs to be done before the .moveTo() and .lineTo() calls, but must be
  // undone before the .stroke() call to ensure that the stroke width is
  // unaffected.  An alternative is to reduce the stroke width in the
  // transformed coordinate space, but you can't specify different values for
  // each dimension (as you can with .scale()). The speedup here is ~12%.
  var sets = this.layout.points;
  for (var i = sets.length; i--;) {
    var points = sets[i];
    for (var j = points.length; j--;) {
      var point = points[j];
      point.canvasx = this.area.w * point.x + this.area.x;
      point.canvasy = this.area.h * point.y + this.area.y;
    }
  }
};

/**
 * Add canvas Actually draw the lines chart, including error bars.
 *
 * This function can only be called if DygraphLayout's points array has been
 * updated with canvas{x,y} attributes, i.e. by
 * DygraphCanvasRenderer._updatePoints.
 *
 * @param {string=} opt_seriesName when specified, only that series will
 *     be drawn. (This is used for expedited redrawing with highlightSeriesOpts)
 * @param {CanvasRenderingContext2D} opt_ctx when specified, the drawing
 *     context.  However, lines are typically drawn on the object's
 *     elementContext.
 * @private
 */
DygraphCanvasRenderer.prototype._renderLineChart = function (opt_seriesName, opt_ctx) {
  var ctx = opt_ctx || this.elementContext;
  var i;

  var sets = this.layout.points;
  var setNames = this.layout.setNames;
  var setName;

  this.colors = this.dygraph_.colorsMap_;

  // Determine which series have specialized plotters.
  var plotter_attr = this.dygraph_.getOption("plotter");
  var plotters = plotter_attr;
  if (!utils.isArrayLike(plotters)) {
    plotters = [plotters];
  }

  var setPlotters = {}; // series name -> plotter fn.
  for (i = 0; i < setNames.length; i++) {
    setName = setNames[i];
    var setPlotter = this.dygraph_.getOption("plotter", setName);
    if (setPlotter == plotter_attr) continue; // not specialized.

    setPlotters[setName] = setPlotter;
  }

  for (i = 0; i < plotters.length; i++) {
    var plotter = plotters[i];
    var is_last = i == plotters.length - 1;

    for (var j = 0; j < sets.length; j++) {
      setName = setNames[j];
      if (opt_seriesName && setName != opt_seriesName) continue;

      var points = sets[j];

      // Only throw in the specialized plotters on the last iteration.
      var p = plotter;
      if (setName in setPlotters) {
        if (is_last) {
          p = setPlotters[setName];
        } else {
          // Don't use the standard plotters in this case.
          continue;
        }
      }

      var color = this.colors[setName];
      var strokeWidth = this.dygraph_.getOption("strokeWidth", setName);

      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;
      p({
        points: points,
        setName: setName,
        drawingContext: ctx,
        color: color,
        strokeWidth: strokeWidth,
        dygraph: this.dygraph_,
        axis: this.dygraph_.axisPropertiesForSeries(setName),
        plotArea: this.area,
        seriesIndex: j,
        seriesCount: sets.length,
        singleSeriesName: opt_seriesName,
        allSeriesPoints: sets
      });
      ctx.restore();
    }
  }
};

/**
 * Standard plotters. These may be used by clients via Dygraph.Plotters.
 * See comments there for more details.
 */
DygraphCanvasRenderer._Plotters = {
  linePlotter: function linePlotter(e) {
    DygraphCanvasRenderer._linePlotter(e);
  },

  fillPlotter: function fillPlotter(e) {
    DygraphCanvasRenderer._fillPlotter(e);
  },

  errorPlotter: function errorPlotter(e) {
    DygraphCanvasRenderer._errorPlotter(e);
  }
};

/**
 * Plotter which draws the central lines for a series.
 * @private
 */
DygraphCanvasRenderer._linePlotter = function (e) {
  var g = e.dygraph;
  var setName = e.setName;
  var strokeWidth = e.strokeWidth;

  // TODO(danvk): Check if there's any performance impact of just calling
  // getOption() inside of _drawStyledLine. Passing in so many parameters makes
  // this code a bit nasty.
  var borderWidth = g.getNumericOption("strokeBorderWidth", setName);
  var drawPointCallback = g.getOption("drawPointCallback", setName) || utils.Circles.DEFAULT;
  var strokePattern = g.getOption("strokePattern", setName);
  var drawPoints = g.getBooleanOption("drawPoints", setName);
  var pointSize = g.getNumericOption("pointSize", setName);

  if (borderWidth && strokeWidth) {
    DygraphCanvasRenderer._drawStyledLine(e, g.getOption("strokeBorderColor", setName), strokeWidth + 2 * borderWidth, strokePattern, drawPoints, drawPointCallback, pointSize);
  }

  DygraphCanvasRenderer._drawStyledLine(e, e.color, strokeWidth, strokePattern, drawPoints, drawPointCallback, pointSize);
};

/**
 * Draws the shaded error bars/confidence intervals for each series.
 * This happens before the center lines are drawn, since the center lines
 * need to be drawn on top of the error bars for all series.
 * @private
 */
DygraphCanvasRenderer._errorPlotter = function (e) {
  var g = e.dygraph;
  var setName = e.setName;
  var errorBars = g.getBooleanOption("errorBars") || g.getBooleanOption("customBars");
  if (!errorBars) return;

  var fillGraph = g.getBooleanOption("fillGraph", setName);
  if (fillGraph) {
    console.warn("Can't use fillGraph option with error bars");
  }

  var ctx = e.drawingContext;
  var color = e.color;
  var fillAlpha = g.getNumericOption('fillAlpha', setName);
  var stepPlot = g.getBooleanOption("stepPlot", setName);
  var points = e.points;

  var iter = utils.createIterator(points, 0, points.length, DygraphCanvasRenderer._getIteratorPredicate(g.getBooleanOption("connectSeparatedPoints", setName)));

  var newYs;

  // setup graphics context
  var prevX = NaN;
  var prevY = NaN;
  var prevYs = [-1, -1];
  // should be same color as the lines but only 15% opaque.
  var rgb = utils.toRGB_(color);
  var err_color = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + fillAlpha + ')';
  ctx.fillStyle = err_color;
  ctx.beginPath();

  var isNullUndefinedOrNaN = function isNullUndefinedOrNaN(x) {
    return x === null || x === undefined || isNaN(x);
  };

  while (iter.hasNext) {
    var point = iter.next();
    if (!stepPlot && isNullUndefinedOrNaN(point.y) || stepPlot && !isNaN(prevY) && isNullUndefinedOrNaN(prevY)) {
      prevX = NaN;
      continue;
    }

    newYs = [point.y_bottom, point.y_top];
    if (stepPlot) {
      prevY = point.y;
    }

    // The documentation specifically disallows nulls inside the point arrays,
    // but in case it happens we should do something sensible.
    if (isNaN(newYs[0])) newYs[0] = point.y;
    if (isNaN(newYs[1])) newYs[1] = point.y;

    newYs[0] = e.plotArea.h * newYs[0] + e.plotArea.y;
    newYs[1] = e.plotArea.h * newYs[1] + e.plotArea.y;
    if (!isNaN(prevX)) {
      if (stepPlot) {
        ctx.moveTo(prevX, prevYs[0]);
        ctx.lineTo(point.canvasx, prevYs[0]);
        ctx.lineTo(point.canvasx, prevYs[1]);
      } else {
        ctx.moveTo(prevX, prevYs[0]);
        ctx.lineTo(point.canvasx, newYs[0]);
        ctx.lineTo(point.canvasx, newYs[1]);
      }
      ctx.lineTo(prevX, prevYs[1]);
      ctx.closePath();
    }
    prevYs = newYs;
    prevX = point.canvasx;
  }
  ctx.fill();
};

/**
 * Proxy for CanvasRenderingContext2D which drops moveTo/lineTo calls which are
 * superfluous. It accumulates all movements which haven't changed the x-value
 * and only applies the two with the most extreme y-values.
 *
 * Calls to lineTo/moveTo must have non-decreasing x-values.
 */
DygraphCanvasRenderer._fastCanvasProxy = function (context) {
  var pendingActions = []; // array of [type, x, y] tuples
  var lastRoundedX = null;
  var lastFlushedX = null;

  var LINE_TO = 1,
      MOVE_TO = 2;

  var actionCount = 0; // number of moveTos and lineTos passed to context.

  // Drop superfluous motions
  // Assumes all pendingActions have the same (rounded) x-value.
  var compressActions = function compressActions(opt_losslessOnly) {
    if (pendingActions.length <= 1) return;

    // Lossless compression: drop inconsequential moveTos.
    for (var i = pendingActions.length - 1; i > 0; i--) {
      var action = pendingActions[i];
      if (action[0] == MOVE_TO) {
        var prevAction = pendingActions[i - 1];
        if (prevAction[1] == action[1] && prevAction[2] == action[2]) {
          pendingActions.splice(i, 1);
        }
      }
    }

    // Lossless compression: ... drop consecutive moveTos ...
    for (var i = 0; i < pendingActions.length - 1;) /* incremented internally */{
      var action = pendingActions[i];
      if (action[0] == MOVE_TO && pendingActions[i + 1][0] == MOVE_TO) {
        pendingActions.splice(i, 1);
      } else {
        i++;
      }
    }

    // Lossy compression: ... drop all but the extreme y-values ...
    if (pendingActions.length > 2 && !opt_losslessOnly) {
      // keep an initial moveTo, but drop all others.
      var startIdx = 0;
      if (pendingActions[0][0] == MOVE_TO) startIdx++;
      var minIdx = null,
          maxIdx = null;
      for (var i = startIdx; i < pendingActions.length; i++) {
        var action = pendingActions[i];
        if (action[0] != LINE_TO) continue;
        if (minIdx === null && maxIdx === null) {
          minIdx = i;
          maxIdx = i;
        } else {
          var y = action[2];
          if (y < pendingActions[minIdx][2]) {
            minIdx = i;
          } else if (y > pendingActions[maxIdx][2]) {
            maxIdx = i;
          }
        }
      }
      var minAction = pendingActions[minIdx],
          maxAction = pendingActions[maxIdx];
      pendingActions.splice(startIdx, pendingActions.length - startIdx);
      if (minIdx < maxIdx) {
        pendingActions.push(minAction);
        pendingActions.push(maxAction);
      } else if (minIdx > maxIdx) {
        pendingActions.push(maxAction);
        pendingActions.push(minAction);
      } else {
        pendingActions.push(minAction);
      }
    }
  };

  var flushActions = function flushActions(opt_noLossyCompression) {
    compressActions(opt_noLossyCompression);
    for (var i = 0, len = pendingActions.length; i < len; i++) {
      var action = pendingActions[i];
      if (action[0] == LINE_TO) {
        context.lineTo(action[1], action[2]);
      } else if (action[0] == MOVE_TO) {
        context.moveTo(action[1], action[2]);
      }
    }
    if (pendingActions.length) {
      lastFlushedX = pendingActions[pendingActions.length - 1][1];
    }
    actionCount += pendingActions.length;
    pendingActions = [];
  };

  var addAction = function addAction(action, x, y) {
    var rx = Math.round(x);
    if (lastRoundedX === null || rx != lastRoundedX) {
      // if there are large gaps on the x-axis, it's essential to keep the
      // first and last point as well.
      var hasGapOnLeft = lastRoundedX - lastFlushedX > 1,
          hasGapOnRight = rx - lastRoundedX > 1,
          hasGap = hasGapOnLeft || hasGapOnRight;
      flushActions(hasGap);
      lastRoundedX = rx;
    }
    pendingActions.push([action, x, y]);
  };

  return {
    moveTo: function moveTo(x, y) {
      addAction(MOVE_TO, x, y);
    },
    lineTo: function lineTo(x, y) {
      addAction(LINE_TO, x, y);
    },

    // for major operations like stroke/fill, we skip compression to ensure
    // that there are no artifacts at the right edge.
    stroke: function stroke() {
      flushActions(true);context.stroke();
    },
    fill: function fill() {
      flushActions(true);context.fill();
    },
    beginPath: function beginPath() {
      flushActions(true);context.beginPath();
    },
    closePath: function closePath() {
      flushActions(true);context.closePath();
    },

    _count: function _count() {
      return actionCount;
    }
  };
};

/**
 * Draws the shaded regions when "fillGraph" is set. Not to be confused with
 * error bars.
 *
 * For stacked charts, it's more convenient to handle all the series
 * simultaneously. So this plotter plots all the points on the first series
 * it's asked to draw, then ignores all the other series.
 *
 * @private
 */
DygraphCanvasRenderer._fillPlotter = function (e) {
  // Skip if we're drawing a single series for interactive highlight overlay.
  if (e.singleSeriesName) return;

  // We'll handle all the series at once, not one-by-one.
  if (e.seriesIndex !== 0) return;

  var g = e.dygraph;
  var setNames = g.getLabels().slice(1); // remove x-axis

  // getLabels() includes names for invisible series, which are not included in
  // allSeriesPoints. We remove those to make the two match.
  // TODO(danvk): provide a simpler way to get this information.
  for (var i = setNames.length; i >= 0; i--) {
    if (!g.visibility()[i]) setNames.splice(i, 1);
  }

  var anySeriesFilled = (function () {
    for (var i = 0; i < setNames.length; i++) {
      if (g.getBooleanOption("fillGraph", setNames[i])) return true;
    }
    return false;
  })();

  if (!anySeriesFilled) return;

  var area = e.plotArea;
  var sets = e.allSeriesPoints;
  var setCount = sets.length;

  var stackedGraph = g.getBooleanOption("stackedGraph");
  var colors = g.getColors();

  // For stacked graphs, track the baseline for filling.
  //
  // The filled areas below graph lines are trapezoids with two
  // vertical edges. The top edge is the line segment being drawn, and
  // the baseline is the bottom edge. Each baseline corresponds to the
  // top line segment from the previous stacked line. In the case of
  // step plots, the trapezoids are rectangles.
  var baseline = {};
  var currBaseline;
  var prevStepPlot; // for different line drawing modes (line/step) per series

  // Helper function to trace a line back along the baseline.
  var traceBackPath = function traceBackPath(ctx, baselineX, baselineY, pathBack) {
    ctx.lineTo(baselineX, baselineY);
    if (stackedGraph) {
      for (var i = pathBack.length - 1; i >= 0; i--) {
        var pt = pathBack[i];
        ctx.lineTo(pt[0], pt[1]);
      }
    }
  };

  // process sets in reverse order (needed for stacked graphs)
  for (var setIdx = setCount - 1; setIdx >= 0; setIdx--) {
    var ctx = e.drawingContext;
    var setName = setNames[setIdx];
    if (!g.getBooleanOption('fillGraph', setName)) continue;

    var fillAlpha = g.getNumericOption('fillAlpha', setName);
    var stepPlot = g.getBooleanOption('stepPlot', setName);
    var color = colors[setIdx];
    var axis = g.axisPropertiesForSeries(setName);
    var axisY = 1.0 + axis.minyval * axis.yscale;
    if (axisY < 0.0) axisY = 0.0;else if (axisY > 1.0) axisY = 1.0;
    axisY = area.h * axisY + area.y;

    var points = sets[setIdx];
    var iter = utils.createIterator(points, 0, points.length, DygraphCanvasRenderer._getIteratorPredicate(g.getBooleanOption("connectSeparatedPoints", setName)));

    // setup graphics context
    var prevX = NaN;
    var prevYs = [-1, -1];
    var newYs;
    // should be same color as the lines but only 15% opaque.
    var rgb = utils.toRGB_(color);
    var err_color = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + fillAlpha + ')';
    ctx.fillStyle = err_color;
    ctx.beginPath();
    var last_x,
        is_first = true;

    // If the point density is high enough, dropping segments on their way to
    // the canvas justifies the overhead of doing so.
    if (points.length > 2 * g.width_ || _dygraph2['default'].FORCE_FAST_PROXY) {
      ctx = DygraphCanvasRenderer._fastCanvasProxy(ctx);
    }

    // For filled charts, we draw points from left to right, then back along
    // the x-axis to complete a shape for filling.
    // For stacked plots, this "back path" is a more complex shape. This array
    // stores the [x, y] values needed to trace that shape.
    var pathBack = [];

    // TODO(danvk): there are a lot of options at play in this loop.
    //     The logic would be much clearer if some (e.g. stackGraph and
    //     stepPlot) were split off into separate sub-plotters.
    var point;
    while (iter.hasNext) {
      point = iter.next();
      if (!utils.isOK(point.y) && !stepPlot) {
        traceBackPath(ctx, prevX, prevYs[1], pathBack);
        pathBack = [];
        prevX = NaN;
        if (point.y_stacked !== null && !isNaN(point.y_stacked)) {
          baseline[point.canvasx] = area.h * point.y_stacked + area.y;
        }
        continue;
      }
      if (stackedGraph) {
        if (!is_first && last_x == point.xval) {
          continue;
        } else {
          is_first = false;
          last_x = point.xval;
        }

        currBaseline = baseline[point.canvasx];
        var lastY;
        if (currBaseline === undefined) {
          lastY = axisY;
        } else {
          if (prevStepPlot) {
            lastY = currBaseline[0];
          } else {
            lastY = currBaseline;
          }
        }
        newYs = [point.canvasy, lastY];

        if (stepPlot) {
          // Step plots must keep track of the top and bottom of
          // the baseline at each point.
          if (prevYs[0] === -1) {
            baseline[point.canvasx] = [point.canvasy, axisY];
          } else {
            baseline[point.canvasx] = [point.canvasy, prevYs[0]];
          }
        } else {
          baseline[point.canvasx] = point.canvasy;
        }
      } else {
        if (isNaN(point.canvasy) && stepPlot) {
          newYs = [area.y + area.h, axisY];
        } else {
          newYs = [point.canvasy, axisY];
        }
      }
      if (!isNaN(prevX)) {
        // Move to top fill point
        if (stepPlot) {
          ctx.lineTo(point.canvasx, prevYs[0]);
          ctx.lineTo(point.canvasx, newYs[0]);
        } else {
          ctx.lineTo(point.canvasx, newYs[0]);
        }

        // Record the baseline for the reverse path.
        if (stackedGraph) {
          pathBack.push([prevX, prevYs[1]]);
          if (prevStepPlot && currBaseline) {
            // Draw to the bottom of the baseline
            pathBack.push([point.canvasx, currBaseline[1]]);
          } else {
            pathBack.push([point.canvasx, newYs[1]]);
          }
        }
      } else {
        ctx.moveTo(point.canvasx, newYs[1]);
        ctx.lineTo(point.canvasx, newYs[0]);
      }
      prevYs = newYs;
      prevX = point.canvasx;
    }
    prevStepPlot = stepPlot;
    if (newYs && point) {
      traceBackPath(ctx, point.canvasx, newYs[1], pathBack);
      pathBack = [];
    }
    ctx.fill();
  }
};

exports['default'] = DygraphCanvasRenderer;
module.exports = exports['default'];

},{"./dygraph":18,"./dygraph-utils":17}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dygraphTickers = require('./dygraph-tickers');

var DygraphTickers = _interopRequireWildcard(_dygraphTickers);

var _dygraphInteractionModel = require('./dygraph-interaction-model');

var _dygraphInteractionModel2 = _interopRequireDefault(_dygraphInteractionModel);

var _dygraphCanvas = require('./dygraph-canvas');

var _dygraphCanvas2 = _interopRequireDefault(_dygraphCanvas);

var _dygraphUtils = require('./dygraph-utils');

var utils = _interopRequireWildcard(_dygraphUtils);

// Default attribute values.
var DEFAULT_ATTRS = {
  highlightCircleSize: 3,
  highlightSeriesOpts: null,
  highlightSeriesBackgroundAlpha: 0.5,
  highlightSeriesBackgroundColor: 'rgb(255, 255, 255)',

  labelsSeparateLines: false,
  labelsShowZeroValues: true,
  labelsKMB: false,
  labelsKMG2: false,
  showLabelsOnHighlight: true,

  digitsAfterDecimal: 2,
  maxNumberWidth: 6,
  sigFigs: null,

  strokeWidth: 1.0,
  strokeBorderWidth: 0,
  strokeBorderColor: "white",

  axisTickSize: 3,
  axisLabelFontSize: 14,
  rightGap: 5,

  showRoller: false,
  xValueParser: undefined,

  delimiter: ',',

  sigma: 2.0,
  errorBars: false,
  fractions: false,
  wilsonInterval: true, // only relevant if fractions is true
  customBars: false,
  fillGraph: false,
  fillAlpha: 0.15,
  connectSeparatedPoints: false,

  stackedGraph: false,
  stackedGraphNaNFill: 'all',
  hideOverlayOnMouseOut: true,

  legend: 'onmouseover',
  stepPlot: false,
  xRangePad: 0,
  yRangePad: null,
  drawAxesAtZero: false,

  // Sizes of the various chart labels.
  titleHeight: 28,
  xLabelHeight: 18,
  yLabelWidth: 18,

  axisLineColor: "black",
  axisLineWidth: 0.3,
  gridLineWidth: 0.3,
  axisLabelWidth: 50,
  gridLineColor: "rgb(128,128,128)",

  interactionModel: _dygraphInteractionModel2['default'].defaultModel,
  animatedZooms: false, // (for now)

  // Range selector options
  showRangeSelector: false,
  rangeSelectorHeight: 40,
  rangeSelectorPlotStrokeColor: "#808FAB",
  rangeSelectorPlotFillGradientColor: "white",
  rangeSelectorPlotFillColor: "#A7B1C4",
  rangeSelectorBackgroundStrokeColor: "gray",
  rangeSelectorBackgroundLineWidth: 1,
  rangeSelectorPlotLineWidth: 1.5,
  rangeSelectorForegroundStrokeColor: "black",
  rangeSelectorForegroundLineWidth: 1,
  rangeSelectorAlpha: 0.6,
  showInRangeSelector: null,

  // The ordering here ensures that central lines always appear above any
  // fill bars/error bars.
  plotter: [_dygraphCanvas2['default']._fillPlotter, _dygraphCanvas2['default']._errorPlotter, _dygraphCanvas2['default']._linePlotter],

  plugins: [],

  // per-axis options
  axes: {
    x: {
      pixelsPerLabel: 70,
      axisLabelWidth: 60,
      axisLabelFormatter: utils.dateAxisLabelFormatter,
      valueFormatter: utils.dateValueFormatter,
      drawGrid: true,
      drawAxis: true,
      independentTicks: true,
      ticker: DygraphTickers.dateTicker
    },
    y: {
      axisLabelWidth: 50,
      pixelsPerLabel: 30,
      valueFormatter: utils.numberValueFormatter,
      axisLabelFormatter: utils.numberAxisLabelFormatter,
      drawGrid: true,
      drawAxis: true,
      independentTicks: true,
      ticker: DygraphTickers.numericTicks
    },
    y2: {
      axisLabelWidth: 50,
      pixelsPerLabel: 30,
      valueFormatter: utils.numberValueFormatter,
      axisLabelFormatter: utils.numberAxisLabelFormatter,
      drawAxis: true, // only applies when there are two axes of data.
      drawGrid: false,
      independentTicks: false,
      ticker: DygraphTickers.numericTicks
    }
  }
};

exports['default'] = DEFAULT_ATTRS;
module.exports = exports['default'];

},{"./dygraph-canvas":9,"./dygraph-interaction-model":12,"./dygraph-tickers":16,"./dygraph-utils":17}],11:[function(require,module,exports){
/**
 * @license
 * Copyright 2011 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview A wrapper around the Dygraph class which implements the
 * interface for a GViz (aka Google Visualization API) visualization.
 * It is designed to be a drop-in replacement for Google's AnnotatedTimeline,
 * so the documentation at
 * http://code.google.com/apis/chart/interactive/docs/gallery/annotatedtimeline.html
 * translates over directly.
 *
 * For a full demo, see:
 * - http://dygraphs.com/tests/gviz.html
 * - http://dygraphs.com/tests/annotation-gviz.html
 */

/*global Dygraph:false */
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dygraph = require('./dygraph');

var _dygraph2 = _interopRequireDefault(_dygraph);

/**
 * A wrapper around Dygraph that implements the gviz API.
 * @param {!HTMLDivElement} container The DOM object the visualization should
 *     live in.
 * @constructor
 */
var GVizChart = function GVizChart(container) {
  this.container = container;
};

/**
 * @param {GVizDataTable} data
 * @param {Object.<*>} options
 */
GVizChart.prototype.draw = function (data, options) {
  // Clear out any existing dygraph.
  // TODO(danvk): would it make more sense to simply redraw using the current
  // date_graph object?
  this.container.innerHTML = '';
  if (typeof this.date_graph != 'undefined') {
    this.date_graph.destroy();
  }

  this.date_graph = new _dygraph2['default'](this.container, data, options);
};

/**
 * Google charts compatible setSelection
 * Only row selection is supported, all points in the row will be highlighted
 * @param {Array.<{row:number}>} selection_array array of the selected cells
 * @public
 */
GVizChart.prototype.setSelection = function (selection_array) {
  var row = false;
  if (selection_array.length) {
    row = selection_array[0].row;
  }
  this.date_graph.setSelection(row);
};

/**
 * Google charts compatible getSelection implementation
 * @return {Array.<{row:number,column:number}>} array of the selected cells
 * @public
 */
GVizChart.prototype.getSelection = function () {
  var selection = [];

  var row = this.date_graph.getSelection();

  if (row < 0) return selection;

  var points = this.date_graph.layout_.points;
  for (var setIdx = 0; setIdx < points.length; ++setIdx) {
    selection.push({ row: row, column: setIdx + 1 });
  }

  return selection;
};

exports['default'] = GVizChart;
module.exports = exports['default'];

},{"./dygraph":18}],12:[function(require,module,exports){
/**
 * @license
 * Copyright 2011 Robert Konigsberg (konigsberg@google.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview The default interaction model for Dygraphs. This is kept out
 * of dygraph.js for better navigability.
 * @author Robert Konigsberg (konigsberg@google.com)
 */

/*global Dygraph:false */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _dygraphUtils = require('./dygraph-utils');

var utils = _interopRequireWildcard(_dygraphUtils);

/**
 * You can drag this many pixels past the edge of the chart and still have it
 * be considered a zoom. This makes it easier to zoom to the exact edge of the
 * chart, a fairly common operation.
 */
var DRAG_EDGE_MARGIN = 100;

/**
 * A collection of functions to facilitate build custom interaction models.
 * @class
 */
var DygraphInteraction = {};

/**
 * Checks whether the beginning & ending of an event were close enough that it
 * should be considered a click. If it should, dispatch appropriate events.
 * Returns true if the event was treated as a click.
 *
 * @param {Event} event
 * @param {Dygraph} g
 * @param {Object} context
 */
DygraphInteraction.maybeTreatMouseOpAsClick = function (event, g, context) {
  context.dragEndX = utils.dragGetX_(event, context);
  context.dragEndY = utils.dragGetY_(event, context);
  var regionWidth = Math.abs(context.dragEndX - context.dragStartX);
  var regionHeight = Math.abs(context.dragEndY - context.dragStartY);

  if (regionWidth < 2 && regionHeight < 2 && g.lastx_ !== undefined && g.lastx_ != -1) {
    DygraphInteraction.treatMouseOpAsClick(g, event, context);
  }

  context.regionWidth = regionWidth;
  context.regionHeight = regionHeight;
};

/**
 * Called in response to an interaction model operation that
 * should start the default panning behavior.
 *
 * It's used in the default callback for "mousedown" operations.
 * Custom interaction model builders can use it to provide the default
 * panning behavior.
 *
 * @param {Event} event the event object which led to the startPan call.
 * @param {Dygraph} g The dygraph on which to act.
 * @param {Object} context The dragging context object (with
 *     dragStartX/dragStartY/etc. properties). This function modifies the
 *     context.
 */
DygraphInteraction.startPan = function (event, g, context) {
  var i, axis;
  context.isPanning = true;
  var xRange = g.xAxisRange();

  if (g.getOptionForAxis("logscale", "x")) {
    context.initialLeftmostDate = utils.log10(xRange[0]);
    context.dateRange = utils.log10(xRange[1]) - utils.log10(xRange[0]);
  } else {
    context.initialLeftmostDate = xRange[0];
    context.dateRange = xRange[1] - xRange[0];
  }
  context.xUnitsPerPixel = context.dateRange / (g.plotter_.area.w - 1);

  if (g.getNumericOption("panEdgeFraction")) {
    var maxXPixelsToDraw = g.width_ * g.getNumericOption("panEdgeFraction");
    var xExtremes = g.xAxisExtremes(); // I REALLY WANT TO CALL THIS xTremes!

    var boundedLeftX = g.toDomXCoord(xExtremes[0]) - maxXPixelsToDraw;
    var boundedRightX = g.toDomXCoord(xExtremes[1]) + maxXPixelsToDraw;

    var boundedLeftDate = g.toDataXCoord(boundedLeftX);
    var boundedRightDate = g.toDataXCoord(boundedRightX);
    context.boundedDates = [boundedLeftDate, boundedRightDate];

    var boundedValues = [];
    var maxYPixelsToDraw = g.height_ * g.getNumericOption("panEdgeFraction");

    for (i = 0; i < g.axes_.length; i++) {
      axis = g.axes_[i];
      var yExtremes = axis.extremeRange;

      var boundedTopY = g.toDomYCoord(yExtremes[0], i) + maxYPixelsToDraw;
      var boundedBottomY = g.toDomYCoord(yExtremes[1], i) - maxYPixelsToDraw;

      var boundedTopValue = g.toDataYCoord(boundedTopY, i);
      var boundedBottomValue = g.toDataYCoord(boundedBottomY, i);

      boundedValues[i] = [boundedTopValue, boundedBottomValue];
    }
    context.boundedValues = boundedValues;
  }

  // Record the range of each y-axis at the start of the drag.
  // If any axis has a valueRange, then we want a 2D pan.
  // We can't store data directly in g.axes_, because it does not belong to us
  // and could change out from under us during a pan (say if there's a data
  // update).
  context.is2DPan = false;
  context.axes = [];
  for (i = 0; i < g.axes_.length; i++) {
    axis = g.axes_[i];
    var axis_data = {};
    var yRange = g.yAxisRange(i);
    // TODO(konigsberg): These values should be in |context|.
    // In log scale, initialTopValue, dragValueRange and unitsPerPixel are log scale.
    var logscale = g.attributes_.getForAxis("logscale", i);
    if (logscale) {
      axis_data.initialTopValue = utils.log10(yRange[1]);
      axis_data.dragValueRange = utils.log10(yRange[1]) - utils.log10(yRange[0]);
    } else {
      axis_data.initialTopValue = yRange[1];
      axis_data.dragValueRange = yRange[1] - yRange[0];
    }
    axis_data.unitsPerPixel = axis_data.dragValueRange / (g.plotter_.area.h - 1);
    context.axes.push(axis_data);

    // While calculating axes, set 2dpan.
    if (axis.valueRange) context.is2DPan = true;
  }
};

/**
 * Called in response to an interaction model operation that
 * responds to an event that pans the view.
 *
 * It's used in the default callback for "mousemove" operations.
 * Custom interaction model builders can use it to provide the default
 * panning behavior.
 *
 * @param {Event} event the event object which led to the movePan call.
 * @param {Dygraph} g The dygraph on which to act.
 * @param {Object} context The dragging context object (with
 *     dragStartX/dragStartY/etc. properties). This function modifies the
 *     context.
 */
DygraphInteraction.movePan = function (event, g, context) {
  context.dragEndX = utils.dragGetX_(event, context);
  context.dragEndY = utils.dragGetY_(event, context);

  var minDate = context.initialLeftmostDate - (context.dragEndX - context.dragStartX) * context.xUnitsPerPixel;
  if (context.boundedDates) {
    minDate = Math.max(minDate, context.boundedDates[0]);
  }
  var maxDate = minDate + context.dateRange;
  if (context.boundedDates) {
    if (maxDate > context.boundedDates[1]) {
      // Adjust minDate, and recompute maxDate.
      minDate = minDate - (maxDate - context.boundedDates[1]);
      maxDate = minDate + context.dateRange;
    }
  }

  if (g.getOptionForAxis("logscale", "x")) {
    g.dateWindow_ = [Math.pow(utils.LOG_SCALE, minDate), Math.pow(utils.LOG_SCALE, maxDate)];
  } else {
    g.dateWindow_ = [minDate, maxDate];
  }

  // y-axis scaling is automatic unless this is a full 2D pan.
  if (context.is2DPan) {

    var pixelsDragged = context.dragEndY - context.dragStartY;

    // Adjust each axis appropriately.
    for (var i = 0; i < g.axes_.length; i++) {
      var axis = g.axes_[i];
      var axis_data = context.axes[i];
      var unitsDragged = pixelsDragged * axis_data.unitsPerPixel;

      var boundedValue = context.boundedValues ? context.boundedValues[i] : null;

      // In log scale, maxValue and minValue are the logs of those values.
      var maxValue = axis_data.initialTopValue + unitsDragged;
      if (boundedValue) {
        maxValue = Math.min(maxValue, boundedValue[1]);
      }
      var minValue = maxValue - axis_data.dragValueRange;
      if (boundedValue) {
        if (minValue < boundedValue[0]) {
          // Adjust maxValue, and recompute minValue.
          maxValue = maxValue - (minValue - boundedValue[0]);
          minValue = maxValue - axis_data.dragValueRange;
        }
      }
      if (g.attributes_.getForAxis("logscale", i)) {
        axis.valueRange = [Math.pow(utils.LOG_SCALE, minValue), Math.pow(utils.LOG_SCALE, maxValue)];
      } else {
        axis.valueRange = [minValue, maxValue];
      }
    }
  }

  g.drawGraph_(false);
};

/**
 * Called in response to an interaction model operation that
 * responds to an event that ends panning.
 *
 * It's used in the default callback for "mouseup" operations.
 * Custom interaction model builders can use it to provide the default
 * panning behavior.
 *
 * @param {Event} event the event object which led to the endPan call.
 * @param {Dygraph} g The dygraph on which to act.
 * @param {Object} context The dragging context object (with
 *     dragStartX/dragStartY/etc. properties). This function modifies the
 *     context.
 */
DygraphInteraction.endPan = DygraphInteraction.maybeTreatMouseOpAsClick;

/**
 * Called in response to an interaction model operation that
 * responds to an event that starts zooming.
 *
 * It's used in the default callback for "mousedown" operations.
 * Custom interaction model builders can use it to provide the default
 * zooming behavior.
 *
 * @param {Event} event the event object which led to the startZoom call.
 * @param {Dygraph} g The dygraph on which to act.
 * @param {Object} context The dragging context object (with
 *     dragStartX/dragStartY/etc. properties). This function modifies the
 *     context.
 */
DygraphInteraction.startZoom = function (event, g, context) {
  context.isZooming = true;
  context.zoomMoved = false;
};

/**
 * Called in response to an interaction model operation that
 * responds to an event that defines zoom boundaries.
 *
 * It's used in the default callback for "mousemove" operations.
 * Custom interaction model builders can use it to provide the default
 * zooming behavior.
 *
 * @param {Event} event the event object which led to the moveZoom call.
 * @param {Dygraph} g The dygraph on which to act.
 * @param {Object} context The dragging context object (with
 *     dragStartX/dragStartY/etc. properties). This function modifies the
 *     context.
 */
DygraphInteraction.moveZoom = function (event, g, context) {
  context.zoomMoved = true;
  context.dragEndX = utils.dragGetX_(event, context);
  context.dragEndY = utils.dragGetY_(event, context);

  var xDelta = Math.abs(context.dragStartX - context.dragEndX);
  var yDelta = Math.abs(context.dragStartY - context.dragEndY);

  // drag direction threshold for y axis is twice as large as x axis
  context.dragDirection = xDelta < yDelta / 2 ? utils.VERTICAL : utils.HORIZONTAL;

  g.drawZoomRect_(context.dragDirection, context.dragStartX, context.dragEndX, context.dragStartY, context.dragEndY, context.prevDragDirection, context.prevEndX, context.prevEndY);

  context.prevEndX = context.dragEndX;
  context.prevEndY = context.dragEndY;
  context.prevDragDirection = context.dragDirection;
};

/**
 * TODO(danvk): move this logic into dygraph.js
 * @param {Dygraph} g
 * @param {Event} event
 * @param {Object} context
 */
DygraphInteraction.treatMouseOpAsClick = function (g, event, context) {
  var clickCallback = g.getFunctionOption('clickCallback');
  var pointClickCallback = g.getFunctionOption('pointClickCallback');

  var selectedPoint = null;

  // Find out if the click occurs on a point.
  var closestIdx = -1;
  var closestDistance = Number.MAX_VALUE;

  // check if the click was on a particular point.
  for (var i = 0; i < g.selPoints_.length; i++) {
    var p = g.selPoints_[i];
    var distance = Math.pow(p.canvasx - context.dragEndX, 2) + Math.pow(p.canvasy - context.dragEndY, 2);
    if (!isNaN(distance) && (closestIdx == -1 || distance < closestDistance)) {
      closestDistance = distance;
      closestIdx = i;
    }
  }

  // Allow any click within two pixels of the dot.
  var radius = g.getNumericOption('highlightCircleSize') + 2;
  if (closestDistance <= radius * radius) {
    selectedPoint = g.selPoints_[closestIdx];
  }

  if (selectedPoint) {
    var e = {
      cancelable: true,
      point: selectedPoint,
      canvasx: context.dragEndX,
      canvasy: context.dragEndY
    };
    var defaultPrevented = g.cascadeEvents_('pointClick', e);
    if (defaultPrevented) {
      // Note: this also prevents click / clickCallback from firing.
      return;
    }
    if (pointClickCallback) {
      pointClickCallback.call(g, event, selectedPoint);
    }
  }

  var e = {
    cancelable: true,
    xval: g.lastx_, // closest point by x value
    pts: g.selPoints_,
    canvasx: context.dragEndX,
    canvasy: context.dragEndY
  };
  if (!g.cascadeEvents_('click', e)) {
    if (clickCallback) {
      // TODO(danvk): pass along more info about the points, e.g. 'x'
      clickCallback.call(g, event, g.lastx_, g.selPoints_);
    }
  }
};

/**
 * Called in response to an interaction model operation that
 * responds to an event that performs a zoom based on previously defined
 * bounds..
 *
 * It's used in the default callback for "mouseup" operations.
 * Custom interaction model builders can use it to provide the default
 * zooming behavior.
 *
 * @param {Event} event the event object which led to the endZoom call.
 * @param {Dygraph} g The dygraph on which to end the zoom.
 * @param {Object} context The dragging context object (with
 *     dragStartX/dragStartY/etc. properties). This function modifies the
 *     context.
 */
DygraphInteraction.endZoom = function (event, g, context) {
  g.clearZoomRect_();
  context.isZooming = false;
  DygraphInteraction.maybeTreatMouseOpAsClick(event, g, context);

  // The zoom rectangle is visibly clipped to the plot area, so its behavior
  // should be as well.
  // See http://code.google.com/p/dygraphs/issues/detail?id=280
  var plotArea = g.getArea();
  if (context.regionWidth >= 10 && context.dragDirection == utils.HORIZONTAL) {
    var left = Math.min(context.dragStartX, context.dragEndX),
        right = Math.max(context.dragStartX, context.dragEndX);
    left = Math.max(left, plotArea.x);
    right = Math.min(right, plotArea.x + plotArea.w);
    if (left < right) {
      g.doZoomX_(left, right);
    }
    context.cancelNextDblclick = true;
  } else if (context.regionHeight >= 10 && context.dragDirection == utils.VERTICAL) {
    var top = Math.min(context.dragStartY, context.dragEndY),
        bottom = Math.max(context.dragStartY, context.dragEndY);
    top = Math.max(top, plotArea.y);
    bottom = Math.min(bottom, plotArea.y + plotArea.h);
    if (top < bottom) {
      g.doZoomY_(top, bottom);
    }
    context.cancelNextDblclick = true;
  }
  context.dragStartX = null;
  context.dragStartY = null;
};

/**
 * @private
 */
DygraphInteraction.startTouch = function (event, g, context) {
  event.preventDefault(); // touch browsers are all nice.
  if (event.touches.length > 1) {
    // If the user ever puts two fingers down, it's not a double tap.
    context.startTimeForDoubleTapMs = null;
  }

  var touches = [];
  for (var i = 0; i < event.touches.length; i++) {
    var t = event.touches[i];
    // we dispense with 'dragGetX_' because all touchBrowsers support pageX
    touches.push({
      pageX: t.pageX,
      pageY: t.pageY,
      dataX: g.toDataXCoord(t.pageX),
      dataY: g.toDataYCoord(t.pageY)
      // identifier: t.identifier
    });
  }
  context.initialTouches = touches;

  if (touches.length == 1) {
    // This is just a swipe.
    context.initialPinchCenter = touches[0];
    context.touchDirections = { x: true, y: true };
  } else if (touches.length >= 2) {
    // It's become a pinch!
    // In case there are 3+ touches, we ignore all but the "first" two.

    // only screen coordinates can be averaged (data coords could be log scale).
    context.initialPinchCenter = {
      pageX: 0.5 * (touches[0].pageX + touches[1].pageX),
      pageY: 0.5 * (touches[0].pageY + touches[1].pageY),

      // TODO(danvk): remove
      dataX: 0.5 * (touches[0].dataX + touches[1].dataX),
      dataY: 0.5 * (touches[0].dataY + touches[1].dataY)
    };

    // Make pinches in a 45-degree swath around either axis 1-dimensional zooms.
    var initialAngle = 180 / Math.PI * Math.atan2(context.initialPinchCenter.pageY - touches[0].pageY, touches[0].pageX - context.initialPinchCenter.pageX);

    // use symmetry to get it into the first quadrant.
    initialAngle = Math.abs(initialAngle);
    if (initialAngle > 90) initialAngle = 90 - initialAngle;

    context.touchDirections = {
      x: initialAngle < 90 - 45 / 2,
      y: initialAngle > 45 / 2
    };
  }

  // save the full x & y ranges.
  context.initialRange = {
    x: g.xAxisRange(),
    y: g.yAxisRange()
  };
};

/**
 * @private
 */
DygraphInteraction.moveTouch = function (event, g, context) {
  // If the tap moves, then it's definitely not part of a double-tap.
  context.startTimeForDoubleTapMs = null;

  var i,
      touches = [];
  for (i = 0; i < event.touches.length; i++) {
    var t = event.touches[i];
    touches.push({
      pageX: t.pageX,
      pageY: t.pageY
    });
  }
  var initialTouches = context.initialTouches;

  var c_now;

  // old and new centers.
  var c_init = context.initialPinchCenter;
  if (touches.length == 1) {
    c_now = touches[0];
  } else {
    c_now = {
      pageX: 0.5 * (touches[0].pageX + touches[1].pageX),
      pageY: 0.5 * (touches[0].pageY + touches[1].pageY)
    };
  }

  // this is the "swipe" component
  // we toss it out for now, but could use it in the future.
  var swipe = {
    pageX: c_now.pageX - c_init.pageX,
    pageY: c_now.pageY - c_init.pageY
  };
  var dataWidth = context.initialRange.x[1] - context.initialRange.x[0];
  var dataHeight = context.initialRange.y[0] - context.initialRange.y[1];
  swipe.dataX = swipe.pageX / g.plotter_.area.w * dataWidth;
  swipe.dataY = swipe.pageY / g.plotter_.area.h * dataHeight;
  var xScale, yScale;

  // The residual bits are usually split into scale & rotate bits, but we split
  // them into x-scale and y-scale bits.
  if (touches.length == 1) {
    xScale = 1.0;
    yScale = 1.0;
  } else if (touches.length >= 2) {
    var initHalfWidth = initialTouches[1].pageX - c_init.pageX;
    xScale = (touches[1].pageX - c_now.pageX) / initHalfWidth;

    var initHalfHeight = initialTouches[1].pageY - c_init.pageY;
    yScale = (touches[1].pageY - c_now.pageY) / initHalfHeight;
  }

  // Clip scaling to [1/8, 8] to prevent too much blowup.
  xScale = Math.min(8, Math.max(0.125, xScale));
  yScale = Math.min(8, Math.max(0.125, yScale));

  var didZoom = false;
  if (context.touchDirections.x) {
    g.dateWindow_ = [c_init.dataX - swipe.dataX + (context.initialRange.x[0] - c_init.dataX) / xScale, c_init.dataX - swipe.dataX + (context.initialRange.x[1] - c_init.dataX) / xScale];
    didZoom = true;
  }

  if (context.touchDirections.y) {
    for (i = 0; i < 1 /*g.axes_.length*/; i++) {
      var axis = g.axes_[i];
      var logscale = g.attributes_.getForAxis("logscale", i);
      if (logscale) {
        // TODO(danvk): implement
      } else {
          axis.valueRange = [c_init.dataY - swipe.dataY + (context.initialRange.y[0] - c_init.dataY) / yScale, c_init.dataY - swipe.dataY + (context.initialRange.y[1] - c_init.dataY) / yScale];
          didZoom = true;
        }
    }
  }

  g.drawGraph_(false);

  // We only call zoomCallback on zooms, not pans, to mirror desktop behavior.
  if (didZoom && touches.length > 1 && g.getFunctionOption('zoomCallback')) {
    var viewWindow = g.xAxisRange();
    g.getFunctionOption("zoomCallback").call(g, viewWindow[0], viewWindow[1], g.yAxisRanges());
  }
};

/**
 * @private
 */
DygraphInteraction.endTouch = function (event, g, context) {
  if (event.touches.length !== 0) {
    // this is effectively a "reset"
    DygraphInteraction.startTouch(event, g, context);
  } else if (event.changedTouches.length == 1) {
    // Could be part of a "double tap"
    // The heuristic here is that it's a double-tap if the two touchend events
    // occur within 500ms and within a 50x50 pixel box.
    var now = new Date().getTime();
    var t = event.changedTouches[0];
    if (context.startTimeForDoubleTapMs && now - context.startTimeForDoubleTapMs < 500 && context.doubleTapX && Math.abs(context.doubleTapX - t.screenX) < 50 && context.doubleTapY && Math.abs(context.doubleTapY - t.screenY) < 50) {
      g.resetZoom();
    } else {
      context.startTimeForDoubleTapMs = now;
      context.doubleTapX = t.screenX;
      context.doubleTapY = t.screenY;
    }
  }
};

// Determine the distance from x to [left, right].
var distanceFromInterval = function distanceFromInterval(x, left, right) {
  if (x < left) {
    return left - x;
  } else if (x > right) {
    return x - right;
  } else {
    return 0;
  }
};

/**
 * Returns the number of pixels by which the event happens from the nearest
 * edge of the chart. For events in the interior of the chart, this returns zero.
 */
var distanceFromChart = function distanceFromChart(event, g) {
  var chartPos = utils.findPos(g.canvas_);
  var box = {
    left: chartPos.x,
    right: chartPos.x + g.canvas_.offsetWidth,
    top: chartPos.y,
    bottom: chartPos.y + g.canvas_.offsetHeight
  };

  var pt = {
    x: utils.pageX(event),
    y: utils.pageY(event)
  };

  var dx = distanceFromInterval(pt.x, box.left, box.right),
      dy = distanceFromInterval(pt.y, box.top, box.bottom);
  return Math.max(dx, dy);
};

/**
 * Default interation model for dygraphs. You can refer to specific elements of
 * this when constructing your own interaction model, e.g.:
 * g.updateOptions( {
 *   interactionModel: {
 *     mousedown: DygraphInteraction.defaultInteractionModel.mousedown
 *   }
 * } );
 */
DygraphInteraction.defaultModel = {
  // Track the beginning of drag events
  mousedown: function mousedown(event, g, context) {
    // Right-click should not initiate a zoom.
    if (event.button && event.button == 2) return;

    context.initializeMouseDown(event, g, context);

    if (event.altKey || event.shiftKey) {
      DygraphInteraction.startPan(event, g, context);
    } else {
      DygraphInteraction.startZoom(event, g, context);
    }

    // Note: we register mousemove/mouseup on document to allow some leeway for
    // events to move outside of the chart. Interaction model events get
    // registered on the canvas, which is too small to allow this.
    var mousemove = function mousemove(event) {
      if (context.isZooming) {
        // When the mouse moves >200px from the chart edge, cancel the zoom.
        var d = distanceFromChart(event, g);
        if (d < DRAG_EDGE_MARGIN) {
          DygraphInteraction.moveZoom(event, g, context);
        } else {
          if (context.dragEndX !== null) {
            context.dragEndX = null;
            context.dragEndY = null;
            g.clearZoomRect_();
          }
        }
      } else if (context.isPanning) {
        DygraphInteraction.movePan(event, g, context);
      }
    };
    var mouseup = function mouseup(event) {
      if (context.isZooming) {
        if (context.dragEndX !== null) {
          DygraphInteraction.endZoom(event, g, context);
        } else {
          DygraphInteraction.maybeTreatMouseOpAsClick(event, g, context);
        }
      } else if (context.isPanning) {
        DygraphInteraction.endPan(event, g, context);
      }

      utils.removeEvent(document, 'mousemove', mousemove);
      utils.removeEvent(document, 'mouseup', mouseup);
      context.destroy();
    };

    g.addAndTrackEvent(document, 'mousemove', mousemove);
    g.addAndTrackEvent(document, 'mouseup', mouseup);
  },
  willDestroyContextMyself: true,

  touchstart: function touchstart(event, g, context) {
    DygraphInteraction.startTouch(event, g, context);
  },
  touchmove: function touchmove(event, g, context) {
    DygraphInteraction.moveTouch(event, g, context);
  },
  touchend: function touchend(event, g, context) {
    DygraphInteraction.endTouch(event, g, context);
  },

  // Disable zooming out if panning.
  dblclick: function dblclick(event, g, context) {
    if (context.cancelNextDblclick) {
      context.cancelNextDblclick = false;
      return;
    }

    // Give plugins a chance to grab this event.
    var e = {
      canvasx: context.dragEndX,
      canvasy: context.dragEndY
    };
    if (g.cascadeEvents_('dblclick', e)) {
      return;
    }

    if (event.altKey || event.shiftKey) {
      return;
    }
    g.resetZoom();
  }
};

/*
Dygraph.DEFAULT_ATTRS.interactionModel = DygraphInteraction.defaultModel;

// old ways of accessing these methods/properties
Dygraph.defaultInteractionModel = DygraphInteraction.defaultModel;
Dygraph.endZoom = DygraphInteraction.endZoom;
Dygraph.moveZoom = DygraphInteraction.moveZoom;
Dygraph.startZoom = DygraphInteraction.startZoom;
Dygraph.endPan = DygraphInteraction.endPan;
Dygraph.movePan = DygraphInteraction.movePan;
Dygraph.startPan = DygraphInteraction.startPan;
*/

DygraphInteraction.nonInteractiveModel_ = {
  mousedown: function mousedown(event, g, context) {
    context.initializeMouseDown(event, g, context);
  },
  mouseup: DygraphInteraction.maybeTreatMouseOpAsClick
};

// Default interaction model when using the range selector.
DygraphInteraction.dragIsPanInteractionModel = {
  mousedown: function mousedown(event, g, context) {
    context.initializeMouseDown(event, g, context);
    DygraphInteraction.startPan(event, g, context);
  },
  mousemove: function mousemove(event, g, context) {
    if (context.isPanning) {
      DygraphInteraction.movePan(event, g, context);
    }
  },
  mouseup: function mouseup(event, g, context) {
    if (context.isPanning) {
      DygraphInteraction.endPan(event, g, context);
    }
  }
};

exports["default"] = DygraphInteraction;
module.exports = exports["default"];

},{"./dygraph-utils":17}],13:[function(require,module,exports){
/**
 * @license
 * Copyright 2011 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview Based on PlotKitLayout, but modified to meet the needs of
 * dygraphs.
 */

/*global Dygraph:false */
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dygraphUtils = require('./dygraph-utils');

var utils = _interopRequireWildcard(_dygraphUtils);

/**
 * Creates a new DygraphLayout object.
 *
 * This class contains all the data to be charted.
 * It uses data coordinates, but also records the chart range (in data
 * coordinates) and hence is able to calculate percentage positions ('In this
 * view, Point A lies 25% down the x-axis.')
 *
 * Two things that it does not do are:
 * 1. Record pixel coordinates for anything.
 * 2. (oddly) determine anything about the layout of chart elements.
 *
 * The naming is a vestige of Dygraph's original PlotKit roots.
 *
 * @constructor
 */
var DygraphLayout = function DygraphLayout(dygraph) {
  this.dygraph_ = dygraph;
  /**
   * Array of points for each series.
   *
   * [series index][row index in series] = |Point| structure,
   * where series index refers to visible series only, and the
   * point index is for the reduced set of points for the current
   * zoom region (including one point just outside the window).
   * All points in the same row index share the same X value.
   *
   * @type {Array.<Array.<Dygraph.PointType>>}
   */
  this.points = [];
  this.setNames = [];
  this.annotations = [];
  this.yAxes_ = null;

  // TODO(danvk): it's odd that xTicks_ and yTicks_ are inputs, but xticks and
  // yticks are outputs. Clean this up.
  this.xTicks_ = null;
  this.yTicks_ = null;
};

/**
 * Add points for a single series.
 *
 * @param {string} setname Name of the series.
 * @param {Array.<Dygraph.PointType>} set_xy Points for the series.
 */
DygraphLayout.prototype.addDataset = function (setname, set_xy) {
  this.points.push(set_xy);
  this.setNames.push(setname);
};

/**
 * Returns the box which the chart should be drawn in. This is the canvas's
 * box, less space needed for the axis and chart labels.
 *
 * @return {{x: number, y: number, w: number, h: number}}
 */
DygraphLayout.prototype.getPlotArea = function () {
  return this.area_;
};

// Compute the box which the chart should be drawn in. This is the canvas's
// box, less space needed for axis, chart labels, and other plug-ins.
// NOTE: This should only be called by Dygraph.predraw_().
DygraphLayout.prototype.computePlotArea = function () {
  var area = {
    // TODO(danvk): per-axis setting.
    x: 0,
    y: 0
  };

  area.w = this.dygraph_.width_ - area.x - this.dygraph_.getOption('rightGap');
  area.h = this.dygraph_.height_;

  // Let plugins reserve space.
  var e = {
    chart_div: this.dygraph_.graphDiv,
    reserveSpaceLeft: function reserveSpaceLeft(px) {
      var r = {
        x: area.x,
        y: area.y,
        w: px,
        h: area.h
      };
      area.x += px;
      area.w -= px;
      return r;
    },
    reserveSpaceRight: function reserveSpaceRight(px) {
      var r = {
        x: area.x + area.w - px,
        y: area.y,
        w: px,
        h: area.h
      };
      area.w -= px;
      return r;
    },
    reserveSpaceTop: function reserveSpaceTop(px) {
      var r = {
        x: area.x,
        y: area.y,
        w: area.w,
        h: px
      };
      area.y += px;
      area.h -= px;
      return r;
    },
    reserveSpaceBottom: function reserveSpaceBottom(px) {
      var r = {
        x: area.x,
        y: area.y + area.h - px,
        w: area.w,
        h: px
      };
      area.h -= px;
      return r;
    },
    chartRect: function chartRect() {
      return { x: area.x, y: area.y, w: area.w, h: area.h };
    }
  };
  this.dygraph_.cascadeEvents_('layout', e);

  this.area_ = area;
};

DygraphLayout.prototype.setAnnotations = function (ann) {
  // The Dygraph object's annotations aren't parsed. We parse them here and
  // save a copy. If there is no parser, then the user must be using raw format.
  this.annotations = [];
  var parse = this.dygraph_.getOption('xValueParser') || function (x) {
    return x;
  };
  for (var i = 0; i < ann.length; i++) {
    var a = {};
    if (!ann[i].xval && ann[i].x === undefined) {
      console.error("Annotations must have an 'x' property");
      return;
    }
    if (ann[i].icon && !(ann[i].hasOwnProperty('width') && ann[i].hasOwnProperty('height'))) {
      console.error("Must set width and height when setting " + "annotation.icon property");
      return;
    }
    utils.update(a, ann[i]);
    if (!a.xval) a.xval = parse(a.x);
    this.annotations.push(a);
  }
};

DygraphLayout.prototype.setXTicks = function (xTicks) {
  this.xTicks_ = xTicks;
};

// TODO(danvk): add this to the Dygraph object's API or move it into Layout.
DygraphLayout.prototype.setYAxes = function (yAxes) {
  this.yAxes_ = yAxes;
};

DygraphLayout.prototype.evaluate = function () {
  this._xAxis = {};
  this._evaluateLimits();
  this._evaluateLineCharts();
  this._evaluateLineTicks();
  this._evaluateAnnotations();
};

DygraphLayout.prototype._evaluateLimits = function () {
  var xlimits = this.dygraph_.xAxisRange();
  this._xAxis.minval = xlimits[0];
  this._xAxis.maxval = xlimits[1];
  var xrange = xlimits[1] - xlimits[0];
  this._xAxis.scale = xrange !== 0 ? 1 / xrange : 1.0;

  if (this.dygraph_.getOptionForAxis("logscale", 'x')) {
    this._xAxis.xlogrange = utils.log10(this._xAxis.maxval) - utils.log10(this._xAxis.minval);
    this._xAxis.xlogscale = this._xAxis.xlogrange !== 0 ? 1.0 / this._xAxis.xlogrange : 1.0;
  }
  for (var i = 0; i < this.yAxes_.length; i++) {
    var axis = this.yAxes_[i];
    axis.minyval = axis.computedValueRange[0];
    axis.maxyval = axis.computedValueRange[1];
    axis.yrange = axis.maxyval - axis.minyval;
    axis.yscale = axis.yrange !== 0 ? 1.0 / axis.yrange : 1.0;

    if (this.dygraph_.getOption("logscale")) {
      axis.ylogrange = utils.log10(axis.maxyval) - utils.log10(axis.minyval);
      axis.ylogscale = axis.ylogrange !== 0 ? 1.0 / axis.ylogrange : 1.0;
      if (!isFinite(axis.ylogrange) || isNaN(axis.ylogrange)) {
        console.error('axis ' + i + ' of graph at ' + axis.g + ' can\'t be displayed in log scale for range [' + axis.minyval + ' - ' + axis.maxyval + ']');
      }
    }
  }
};

DygraphLayout.calcXNormal_ = function (value, xAxis, logscale) {
  if (logscale) {
    return (utils.log10(value) - utils.log10(xAxis.minval)) * xAxis.xlogscale;
  } else {
    return (value - xAxis.minval) * xAxis.scale;
  }
};

/**
 * @param {DygraphAxisType} axis
 * @param {number} value
 * @param {boolean} logscale
 * @return {number}
 */
DygraphLayout.calcYNormal_ = function (axis, value, logscale) {
  if (logscale) {
    var x = 1.0 - (utils.log10(value) - utils.log10(axis.minyval)) * axis.ylogscale;
    return isFinite(x) ? x : NaN; // shim for v8 issue; see pull request 276
  } else {
      return 1.0 - (value - axis.minyval) * axis.yscale;
    }
};

DygraphLayout.prototype._evaluateLineCharts = function () {
  var isStacked = this.dygraph_.getOption("stackedGraph");
  var isLogscaleForX = this.dygraph_.getOptionForAxis("logscale", 'x');

  for (var setIdx = 0; setIdx < this.points.length; setIdx++) {
    var points = this.points[setIdx];
    var setName = this.setNames[setIdx];
    var connectSeparated = this.dygraph_.getOption('connectSeparatedPoints', setName);
    var axis = this.dygraph_.axisPropertiesForSeries(setName);
    // TODO (konigsberg): use optionsForAxis instead.
    var logscale = this.dygraph_.attributes_.getForSeries("logscale", setName);

    for (var j = 0; j < points.length; j++) {
      var point = points[j];

      // Range from 0-1 where 0 represents left and 1 represents right.
      point.x = DygraphLayout.calcXNormal_(point.xval, this._xAxis, isLogscaleForX);
      // Range from 0-1 where 0 represents top and 1 represents bottom
      var yval = point.yval;
      if (isStacked) {
        point.y_stacked = DygraphLayout.calcYNormal_(axis, point.yval_stacked, logscale);
        if (yval !== null && !isNaN(yval)) {
          yval = point.yval_stacked;
        }
      }
      if (yval === null) {
        yval = NaN;
        if (!connectSeparated) {
          point.yval = NaN;
        }
      }
      point.y = DygraphLayout.calcYNormal_(axis, yval, logscale);
    }

    this.dygraph_.dataHandler_.onLineEvaluated(points, axis, logscale);
  }
};

DygraphLayout.prototype._evaluateLineTicks = function () {
  var i, tick, label, pos, v, has_tick;
  this.xticks = [];
  for (i = 0; i < this.xTicks_.length; i++) {
    tick = this.xTicks_[i];
    label = tick.label;
    has_tick = !('label_v' in tick);
    v = has_tick ? tick.v : tick.label_v;
    pos = this.dygraph_.toPercentXCoord(v);
    if (pos >= 0.0 && pos < 1.0) {
      this.xticks.push({ pos: pos, label: label, has_tick: has_tick });
    }
  }

  this.yticks = [];
  for (i = 0; i < this.yAxes_.length; i++) {
    var axis = this.yAxes_[i];
    for (var j = 0; j < axis.ticks.length; j++) {
      tick = axis.ticks[j];
      label = tick.label;
      has_tick = !('label_v' in tick);
      v = has_tick ? tick.v : tick.label_v;
      pos = this.dygraph_.toPercentYCoord(v, i);
      if (pos > 0.0 && pos <= 1.0) {
        this.yticks.push({ axis: i, pos: pos, label: label, has_tick: has_tick });
      }
    }
  }
};

DygraphLayout.prototype._evaluateAnnotations = function () {
  // Add the annotations to the point to which they belong.
  // Make a map from (setName, xval) to annotation for quick lookups.
  var i;
  var annotations = {};
  for (i = 0; i < this.annotations.length; i++) {
    var a = this.annotations[i];
    annotations[a.xval + "," + a.series] = a;
  }

  this.annotated_points = [];

  // Exit the function early if there are no annotations.
  if (!this.annotations || !this.annotations.length) {
    return;
  }

  // TODO(antrob): loop through annotations not points.
  for (var setIdx = 0; setIdx < this.points.length; setIdx++) {
    var points = this.points[setIdx];
    for (i = 0; i < points.length; i++) {
      var p = points[i];
      var k = p.xval + "," + p.name;
      if (k in annotations) {
        p.annotation = annotations[k];
        this.annotated_points.push(p);
      }
    }
  }
};

/**
 * Convenience function to remove all the data sets from a graph
 */
DygraphLayout.prototype.removeAllDatasets = function () {
  delete this.points;
  delete this.setNames;
  delete this.setPointsLengths;
  delete this.setPointsOffsets;
  this.points = [];
  this.setNames = [];
  this.setPointsLengths = [];
  this.setPointsOffsets = [];
};

exports['default'] = DygraphLayout;
module.exports = exports['default'];

},{"./dygraph-utils":17}],14:[function(require,module,exports){
(function (process){
/**
 * @license
 * Copyright 2011 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});
var OPTIONS_REFERENCE = null;

// For "production" code, this gets removed by uglifyjs.
if (typeof process !== 'undefined') {
  if ("development" != 'production') {

    // NOTE: in addition to parsing as JS, this snippet is expected to be valid
    // JSON. This assumption cannot be checked in JS, but it will be checked when
    // documentation is generated by the generate-documentation.py script. For the
    // most part, this just means that you should always use double quotes.
    OPTIONS_REFERENCE = // <JSON>
    {
      "xValueParser": {
        "default": "parseFloat() or Date.parse()*",
        "labels": ["CSV parsing"],
        "type": "function(str) -> number",
        "description": "A function which parses x-values (i.e. the dependent series). Must return a number, even when the values are dates. In this case, millis since epoch are used. This is used primarily for parsing CSV data. *=Dygraphs is slightly more accepting in the dates which it will parse. See code for details."
      },
      "stackedGraph": {
        "default": "false",
        "labels": ["Data Line display"],
        "type": "boolean",
        "description": "If set, stack series on top of one another rather than drawing them independently. The first series specified in the input data will wind up on top of the chart and the last will be on bottom. NaN values are drawn as white areas without a line on top, see stackedGraphNaNFill for details."
      },
      "stackedGraphNaNFill": {
        "default": "all",
        "labels": ["Data Line display"],
        "type": "string",
        "description": "Controls handling of NaN values inside a stacked graph. NaN values are interpolated/extended for stacking purposes, but the actual point value remains NaN in the legend display. Valid option values are \"all\" (interpolate internally, repeat leftmost and rightmost value as needed), \"inside\" (interpolate internally only, use zero outside leftmost and rightmost value), and \"none\" (treat NaN as zero everywhere)."
      },
      "pointSize": {
        "default": "1",
        "labels": ["Data Line display"],
        "type": "integer",
        "description": "The size of the dot to draw on each point in pixels (see drawPoints). A dot is always drawn when a point is \"isolated\", i.e. there is a missing point on either side of it. This also controls the size of those dots."
      },
      "drawPoints": {
        "default": "false",
        "labels": ["Data Line display"],
        "type": "boolean",
        "description": "Draw a small dot at each point, in addition to a line going through the point. This makes the individual data points easier to see, but can increase visual clutter in the chart. The small dot can be replaced with a custom rendering by supplying a <a href='#drawPointCallback'>drawPointCallback</a>."
      },
      "drawGapEdgePoints": {
        "default": "false",
        "labels": ["Data Line display"],
        "type": "boolean",
        "description": "Draw points at the edges of gaps in the data. This improves visibility of small data segments or other data irregularities."
      },
      "drawPointCallback": {
        "default": "null",
        "labels": ["Data Line display"],
        "type": "function(g, seriesName, canvasContext, cx, cy, color, pointSize)",
        "parameters": [["g", "the reference graph"], ["seriesName", "the name of the series"], ["canvasContext", "the canvas to draw on"], ["cx", "center x coordinate"], ["cy", "center y coordinate"], ["color", "series color"], ["pointSize", "the radius of the image."], ["idx", "the row-index of the point in the data."]],
        "description": "Draw a custom item when drawPoints is enabled. Default is a small dot matching the series color. This method should constrain drawing to within pointSize pixels from (cx, cy).  Also see <a href='#drawHighlightPointCallback'>drawHighlightPointCallback</a>"
      },
      "height": {
        "default": "320",
        "labels": ["Overall display"],
        "type": "integer",
        "description": "Height, in pixels, of the chart. If the container div has been explicitly sized, this will be ignored."
      },
      "zoomCallback": {
        "default": "null",
        "labels": ["Callbacks"],
        "type": "function(minDate, maxDate, yRanges)",
        "parameters": [["minDate", "milliseconds since epoch"], ["maxDate", "milliseconds since epoch."], ["yRanges", "is an array of [bottom, top] pairs, one for each y-axis."]],
        "description": "A function to call when the zoom window is changed (either by zooming in or out). When animatedZooms is set, zoomCallback is called once at the end of the transition (it will not be called for intermediate frames)."
      },
      "pointClickCallback": {
        "snippet": "function(e, point){<br>&nbsp;&nbsp;alert(point);<br>}",
        "default": "null",
        "labels": ["Callbacks", "Interactive Elements"],
        "type": "function(e, point)",
        "parameters": [["e", "the event object for the click"], ["point", "the point that was clicked See <a href='#point_properties'>Point properties</a> for details"]],
        "description": "A function to call when a data point is clicked. and the point that was clicked."
      },
      "color": {
        "default": "(see description)",
        "labels": ["Data Series Colors"],
        "type": "string",
        "example": "red",
        "description": "A per-series color definition. Used in conjunction with, and overrides, the colors option."
      },
      "colors": {
        "default": "(see description)",
        "labels": ["Data Series Colors"],
        "type": "array<string>",
        "example": "['red', '#00FF00']",
        "description": "List of colors for the data series. These can be of the form \"#AABBCC\" or \"rgb(255,100,200)\" or \"yellow\", etc. If not specified, equally-spaced points around a color wheel are used. Overridden by the 'color' option."
      },
      "connectSeparatedPoints": {
        "default": "false",
        "labels": ["Data Line display"],
        "type": "boolean",
        "description": "Usually, when Dygraphs encounters a missing value in a data series, it interprets this as a gap and draws it as such. If, instead, the missing values represents an x-value for which only a different series has data, then you'll want to connect the dots by setting this to true. To explicitly include a gap with this option set, use a value of NaN."
      },
      "highlightCallback": {
        "default": "null",
        "labels": ["Callbacks"],
        "type": "function(event, x, points, row, seriesName)",
        "description": "When set, this callback gets called every time a new point is highlighted.",
        "parameters": [["event", "the JavaScript mousemove event"], ["x", "the x-coordinate of the highlighted points"], ["points", "an array of highlighted points: <code>[ {name: 'series', yval: y-value}, &hellip; ]</code>"], ["row", "integer index of the highlighted row in the data table, starting from 0"], ["seriesName", "name of the highlighted series, only present if highlightSeriesOpts is set."]]
      },
      "drawHighlightPointCallback": {
        "default": "null",
        "labels": ["Data Line display"],
        "type": "function(g, seriesName, canvasContext, cx, cy, color, pointSize)",
        "parameters": [["g", "the reference graph"], ["seriesName", "the name of the series"], ["canvasContext", "the canvas to draw on"], ["cx", "center x coordinate"], ["cy", "center y coordinate"], ["color", "series color"], ["pointSize", "the radius of the image."], ["idx", "the row-index of the point in the data."]],
        "description": "Draw a custom item when a point is highlighted.  Default is a small dot matching the series color. This method should constrain drawing to within pointSize pixels from (cx, cy) Also see <a href='#drawPointCallback'>drawPointCallback</a>"
      },
      "highlightSeriesOpts": {
        "default": "null",
        "labels": ["Interactive Elements"],
        "type": "Object",
        "description": "When set, the options from this object are applied to the timeseries closest to the mouse pointer for interactive highlighting. See also 'highlightCallback'. Example: highlightSeriesOpts: { strokeWidth: 3 }."
      },
      "highlightSeriesBackgroundAlpha": {
        "default": "0.5",
        "labels": ["Interactive Elements"],
        "type": "float",
        "description": "Fade the background while highlighting series. 1=fully visible background (disable fading), 0=hiddden background (show highlighted series only)."
      },
      "highlightSeriesBackgroundColor": {
        "default": "rgb(255, 255, 255)",
        "labels": ["Interactive Elements"],
        "type": "string",
        "description": "Sets the background color used to fade out the series in conjunction with 'highlightSeriesBackgroundAlpha'."
      },
      "includeZero": {
        "default": "false",
        "labels": ["Axis display"],
        "type": "boolean",
        "description": "Usually, dygraphs will use the range of the data plus some padding to set the range of the y-axis. If this option is set, the y-axis will always include zero, typically as the lowest value. This can be used to avoid exaggerating the variance in the data"
      },
      "rollPeriod": {
        "default": "1",
        "labels": ["Error Bars", "Rolling Averages"],
        "type": "integer &gt;= 1",
        "description": "Number of days over which to average data. Discussed extensively above."
      },
      "unhighlightCallback": {
        "default": "null",
        "labels": ["Callbacks"],
        "type": "function(event)",
        "parameters": [["event", "the mouse event"]],
        "description": "When set, this callback gets called every time the user stops highlighting any point by mousing out of the graph."
      },
      "axisTickSize": {
        "default": "3.0",
        "labels": ["Axis display"],
        "type": "number",
        "description": "The size of the line to display next to each tick mark on x- or y-axes."
      },
      "labelsSeparateLines": {
        "default": "false",
        "labels": ["Legend"],
        "type": "boolean",
        "description": "Put <code>&lt;br/&gt;</code> between lines in the label string. Often used in conjunction with <strong>labelsDiv</strong>."
      },
      "valueFormatter": {
        "default": "Depends on the type of your data.",
        "labels": ["Legend", "Value display/formatting"],
        "type": "function(num or millis, opts, seriesName, dygraph, row, col)",
        "description": "Function to provide a custom display format for the values displayed on mouseover. This does not affect the values that appear on tick marks next to the axes. To format those, see axisLabelFormatter. This is usually set on a <a href='per-axis.html'>per-axis</a> basis. .",
        "parameters": [["num_or_millis", "The value to be formatted. This is always a number. For date axes, it's millis since epoch. You can call new Date(millis) to get a Date object."], ["opts", "This is a function you can call to access various options (e.g. opts('labelsKMB')). It returns per-axis values for the option when available."], ["seriesName", "The name of the series from which the point came, e.g. 'X', 'Y', 'A', etc."], ["dygraph", "The dygraph object for which the formatting is being done"], ["row", "The row of the data from which this point comes. g.getValue(row, 0) will return the x-value for this point."], ["col", "The column of the data from which this point comes. g.getValue(row, col) will return the original y-value for this point. This can be used to get the full confidence interval for the point, or access un-rolled values for the point."]]
      },
      "annotationMouseOverHandler": {
        "default": "null",
        "labels": ["Annotations"],
        "type": "function(annotation, point, dygraph, event)",
        "description": "If provided, this function is called whenever the user mouses over an annotation."
      },
      "annotationMouseOutHandler": {
        "default": "null",
        "labels": ["Annotations"],
        "type": "function(annotation, point, dygraph, event)",
        "parameters": [["annotation", "the annotation left"], ["point", "the point associated with the annotation"], ["dygraph", "the reference graph"], ["event", "the mouse event"]],
        "description": "If provided, this function is called whenever the user mouses out of an annotation."
      },
      "annotationClickHandler": {
        "default": "null",
        "labels": ["Annotations"],
        "type": "function(annotation, point, dygraph, event)",
        "parameters": [["annotation", "the annotation left"], ["point", "the point associated with the annotation"], ["dygraph", "the reference graph"], ["event", "the mouse event"]],
        "description": "If provided, this function is called whenever the user clicks on an annotation."
      },
      "annotationDblClickHandler": {
        "default": "null",
        "labels": ["Annotations"],
        "type": "function(annotation, point, dygraph, event)",
        "parameters": [["annotation", "the annotation left"], ["point", "the point associated with the annotation"], ["dygraph", "the reference graph"], ["event", "the mouse event"]],
        "description": "If provided, this function is called whenever the user double-clicks on an annotation."
      },
      "drawCallback": {
        "default": "null",
        "labels": ["Callbacks"],
        "type": "function(dygraph, is_initial)",
        "parameters": [["dygraph", "The graph being drawn"], ["is_initial", "True if this is the initial draw, false for subsequent draws."]],
        "description": "When set, this callback gets called every time the dygraph is drawn. This includes the initial draw, after zooming and repeatedly while panning."
      },
      "labelsKMG2": {
        "default": "false",
        "labels": ["Value display/formatting"],
        "type": "boolean",
        "description": "Show k/M/G for kilo/Mega/Giga on y-axis. This is different than <code>labelsKMB</code> in that it uses base 2, not 10."
      },
      "delimiter": {
        "default": ",",
        "labels": ["CSV parsing"],
        "type": "string",
        "description": "The delimiter to look for when separating fields of a CSV file. Setting this to a tab is not usually necessary, since tab-delimited data is auto-detected."
      },
      "axisLabelFontSize": {
        "default": "14",
        "labels": ["Axis display"],
        "type": "integer",
        "description": "Size of the font (in pixels) to use in the axis labels, both x- and y-axis."
      },
      "underlayCallback": {
        "default": "null",
        "labels": ["Callbacks"],
        "type": "function(context, area, dygraph)",
        "parameters": [["context", "the canvas drawing context on which to draw"], ["area", "An object with {x,y,w,h} properties describing the drawing area."], ["dygraph", "the reference graph"]],
        "description": "When set, this callback gets called before the chart is drawn. It details on how to use this."
      },
      "width": {
        "default": "480",
        "labels": ["Overall display"],
        "type": "integer",
        "description": "Width, in pixels, of the chart. If the container div has been explicitly sized, this will be ignored."
      },
      "interactionModel": {
        "default": "...",
        "labels": ["Interactive Elements"],
        "type": "Object",
        "description": "TODO(konigsberg): document this"
      },
      "ticker": {
        "default": "Dygraph.dateTicker or Dygraph.numericTicks",
        "labels": ["Axis display"],
        "type": "function(min, max, pixels, opts, dygraph, vals) -> [{v: ..., label: ...}, ...]",
        "parameters": [["min", ""], ["max", ""], ["pixels", ""], ["opts", ""], ["dygraph", "the reference graph"], ["vals", ""]],
        "description": "This lets you specify an arbitrary function to generate tick marks on an axis. The tick marks are an array of (value, label) pairs. The built-in functions go to great lengths to choose good tick marks so, if you set this option, you'll most likely want to call one of them and modify the result. See dygraph-tickers.js for an extensive discussion. This is set on a <a href='per-axis.html'>per-axis</a> basis."
      },
      "xAxisHeight": {
        "default": "(null)",
        "labels": ["Axis display"],
        "type": "integer",
        "description": "Height, in pixels, of the x-axis. If not set explicitly, this is computed based on axisLabelFontSize and axisTickSize."
      },
      "showLabelsOnHighlight": {
        "default": "true",
        "labels": ["Interactive Elements", "Legend"],
        "type": "boolean",
        "description": "Whether to show the legend upon mouseover."
      },
      "axis": {
        "default": "(none)",
        "labels": ["Axis display"],
        "type": "string",
        "description": "Set to either 'y1' or 'y2' to assign a series to a y-axis (primary or secondary). Must be set per-series."
      },
      "pixelsPerLabel": {
        "default": "70 (x-axis) or 30 (y-axes)",
        "labels": ["Axis display", "Grid"],
        "type": "integer",
        "description": "Number of pixels to require between each x- and y-label. Larger values will yield a sparser axis with fewer ticks. This is set on a <a href='per-axis.html'>per-axis</a> basis."
      },
      "labelsDiv": {
        "default": "null",
        "labels": ["Legend"],
        "type": "DOM element or string",
        "example": "<code style='font-size: small'>document.getElementById('foo')</code>or<code>'foo'",
        "description": "Show data labels in an external div, rather than on the graph.  This value can either be a div element or a div id."
      },
      "fractions": {
        "default": "false",
        "labels": ["CSV parsing", "Error Bars"],
        "type": "boolean",
        "description": "When set, attempt to parse each cell in the CSV file as \"a/b\", where a and b are integers. The ratio will be plotted. This allows computation of Wilson confidence intervals (see below)."
      },
      "logscale": {
        "default": "false",
        "labels": ["Axis display"],
        "type": "boolean",
        "description": "When set for the y-axis or x-axis, the graph shows that axis in log scale. Any values less than or equal to zero are not displayed. Showing log scale with ranges that go below zero will result in an unviewable graph.\n\n Not compatible with showZero. connectSeparatedPoints is ignored. This is ignored for date-based x-axes."
      },
      "strokeWidth": {
        "default": "1.0",
        "labels": ["Data Line display"],
        "type": "float",
        "example": "0.5, 2.0",
        "description": "The width of the lines connecting data points. This can be used to increase the contrast or some graphs."
      },
      "strokePattern": {
        "default": "null",
        "labels": ["Data Line display"],
        "type": "array<integer>",
        "example": "[10, 2, 5, 2]",
        "description": "A custom pattern array where the even index is a draw and odd is a space in pixels. If null then it draws a solid line. The array should have a even length as any odd lengthed array could be expressed as a smaller even length array. This is used to create dashed lines."
      },
      "strokeBorderWidth": {
        "default": "null",
        "labels": ["Data Line display"],
        "type": "float",
        "example": "1.0",
        "description": "Draw a border around graph lines to make crossing lines more easily distinguishable. Useful for graphs with many lines."
      },
      "strokeBorderColor": {
        "default": "white",
        "labels": ["Data Line display"],
        "type": "string",
        "example": "red, #ccffdd",
        "description": "Color for the line border used if strokeBorderWidth is set."
      },
      "wilsonInterval": {
        "default": "true",
        "labels": ["Error Bars"],
        "type": "boolean",
        "description": "Use in conjunction with the \"fractions\" option. Instead of plotting +/- N standard deviations, dygraphs will compute a Wilson confidence interval and plot that. This has more reasonable behavior for ratios close to 0 or 1."
      },
      "fillGraph": {
        "default": "false",
        "labels": ["Data Line display"],
        "type": "boolean",
        "description": "Should the area underneath the graph be filled? This option is not compatible with error bars. This may be set on a <a href='per-axis.html'>per-series</a> basis."
      },
      "highlightCircleSize": {
        "default": "3",
        "labels": ["Interactive Elements"],
        "type": "integer",
        "description": "The size in pixels of the dot drawn over highlighted points."
      },
      "gridLineColor": {
        "default": "rgb(128,128,128)",
        "labels": ["Grid"],
        "type": "red, blue",
        "description": "The color of the gridlines. This may be set on a per-axis basis to define each axis' grid separately."
      },
      "gridLinePattern": {
        "default": "null",
        "labels": ["Grid"],
        "type": "array<integer>",
        "example": "[10, 2, 5, 2]",
        "description": "A custom pattern array where the even index is a draw and odd is a space in pixels. If null then it draws a solid line. The array should have a even length as any odd lengthed array could be expressed as a smaller even length array. This is used to create dashed gridlines."
      },
      "visibility": {
        "default": "[true, true, ...]",
        "labels": ["Data Line display"],
        "type": "Array of booleans",
        "description": "Which series should initially be visible? Once the Dygraph has been constructed, you can access and modify the visibility of each series using the <code>visibility</code> and <code>setVisibility</code> methods."
      },
      "valueRange": {
        "default": "Full range of the input is shown",
        "labels": ["Axis display"],
        "type": "Array of two numbers",
        "example": "[10, 110]",
        "description": "Explicitly set the vertical range of the graph to [low, high]. This may be set on a per-axis basis to define each y-axis separately. If either limit is unspecified, it will be calculated automatically (e.g. [null, 30] to automatically calculate just the lower bound)"
      },
      "colorSaturation": {
        "default": "1.0",
        "labels": ["Data Series Colors"],
        "type": "float (0.0 - 1.0)",
        "description": "If <strong>colors</strong> is not specified, saturation of the automatically-generated data series colors."
      },
      "hideOverlayOnMouseOut": {
        "default": "true",
        "labels": ["Interactive Elements", "Legend"],
        "type": "boolean",
        "description": "Whether to hide the legend when the mouse leaves the chart area."
      },
      "legend": {
        "default": "onmouseover",
        "labels": ["Legend"],
        "type": "string",
        "description": "When to display the legend. By default, it only appears when a user mouses over the chart. Set it to \"always\" to always display a legend of some sort. When set to \"follow\", legend follows highlighted points."
      },
      "legendFormatter": {
        "default": "null",
        "labels": ["Legend"],
        "type": "function(data): string",
        "params": [["data", "An object containing information about the selection (or lack of a selection). This includes formatted values and series information. See <a href=\"https://github.com/danvk/dygraphs/pull/683\">here</a> for sample values."]],
        "description": "Set this to supply a custom formatter for the legend. See <a href=\"https://github.com/danvk/dygraphs/pull/683\">this comment</a> and the <a href=\"tests/legend-formatter.html\">legendFormatter demo</a> for usage."
      },
      "labelsShowZeroValues": {
        "default": "true",
        "labels": ["Legend"],
        "type": "boolean",
        "description": "Show zero value labels in the labelsDiv."
      },
      "stepPlot": {
        "default": "false",
        "labels": ["Data Line display"],
        "type": "boolean",
        "description": "When set, display the graph as a step plot instead of a line plot. This option may either be set for the whole graph or for single series."
      },
      "labelsUTC": {
        "default": "false",
        "labels": ["Value display/formatting", "Axis display"],
        "type": "boolean",
        "description": "Show date/time labels according to UTC (instead of local time)."
      },
      "labelsKMB": {
        "default": "false",
        "labels": ["Value display/formatting"],
        "type": "boolean",
        "description": "Show K/M/B for thousands/millions/billions on y-axis."
      },
      "rightGap": {
        "default": "5",
        "labels": ["Overall display"],
        "type": "integer",
        "description": "Number of pixels to leave blank at the right edge of the Dygraph. This makes it easier to highlight the right-most data point."
      },
      "drawAxesAtZero": {
        "default": "false",
        "labels": ["Axis display"],
        "type": "boolean",
        "description": "When set, draw the X axis at the Y=0 position and the Y axis at the X=0 position if those positions are inside the graph's visible area. Otherwise, draw the axes at the bottom or left graph edge as usual."
      },
      "xRangePad": {
        "default": "0",
        "labels": ["Axis display"],
        "type": "float",
        "description": "Add the specified amount of extra space (in pixels) around the X-axis value range to ensure points at the edges remain visible."
      },
      "yRangePad": {
        "default": "null",
        "labels": ["Axis display"],
        "type": "float",
        "description": "If set, add the specified amount of extra space (in pixels) around the Y-axis value range to ensure points at the edges remain visible. If unset, use the traditional Y padding algorithm."
      },
      "axisLabelFormatter": {
        "default": "Depends on the data type",
        "labels": ["Axis display"],
        "type": "function(number or Date, granularity, opts, dygraph)",
        "parameters": [["number or date", "Either a number (for a numeric axis) or a Date object (for a date axis)"], ["granularity", "specifies how fine-grained the axis is. For date axes, this is a reference to the time granularity enumeration, defined in dygraph-tickers.js, e.g. Dygraph.WEEKLY."], ["opts", "a function which provides access to various options on the dygraph, e.g. opts('labelsKMB')."], ["dygraph", "the referenced graph"]],
        "description": "Function to call to format the tick values that appear along an axis. This is usually set on a <a href='per-axis.html'>per-axis</a> basis."
      },
      "clickCallback": {
        "snippet": "function(e, date_millis){<br>&nbsp;&nbsp;alert(new Date(date_millis));<br>}",
        "default": "null",
        "labels": ["Callbacks"],
        "type": "function(e, x, points)",
        "parameters": [["e", "The event object for the click"], ["x", "The x value that was clicked (for dates, this is milliseconds since epoch)"], ["points", "The closest points along that date. See <a href='#point_properties'>Point properties</a> for details."]],
        "description": "A function to call when the canvas is clicked."
      },
      "labels": {
        "default": "[\"X\", \"Y1\", \"Y2\", ...]*",
        "labels": ["Legend"],
        "type": "array<string>",
        "description": "A name for each data series, including the independent (X) series. For CSV files and DataTable objections, this is determined by context. For raw data, this must be specified. If it is not, default values are supplied and a warning is logged."
      },
      "dateWindow": {
        "default": "Full range of the input is shown",
        "labels": ["Axis display"],
        "type": "Array of two numbers",
        "example": "[<br>&nbsp;&nbsp;Date.parse('2006-01-01'),<br>&nbsp;&nbsp;(new Date()).valueOf()<br>]",
        "description": "Initially zoom in on a section of the graph. Is of the form [earliest, latest], where earliest/latest are milliseconds since epoch. If the data for the x-axis is numeric, the values in dateWindow must also be numbers."
      },
      "showRoller": {
        "default": "false",
        "labels": ["Interactive Elements", "Rolling Averages"],
        "type": "boolean",
        "description": "If the rolling average period text box should be shown."
      },
      "sigma": {
        "default": "2.0",
        "labels": ["Error Bars"],
        "type": "float",
        "description": "When errorBars is set, shade this many standard deviations above/below each point."
      },
      "customBars": {
        "default": "false",
        "labels": ["CSV parsing", "Error Bars"],
        "type": "boolean",
        "description": "When set, parse each CSV cell as \"low;middle;high\". Error bars will be drawn for each point between low and high, with the series itself going through middle."
      },
      "colorValue": {
        "default": "1.0",
        "labels": ["Data Series Colors"],
        "type": "float (0.0 - 1.0)",
        "description": "If colors is not specified, value of the data series colors, as in hue/saturation/value. (0.0-1.0, default 0.5)"
      },
      "errorBars": {
        "default": "false",
        "labels": ["CSV parsing", "Error Bars"],
        "type": "boolean",
        "description": "Does the data contain standard deviations? Setting this to true alters the input format (see above)."
      },
      "displayAnnotations": {
        "default": "false",
        "labels": ["Annotations"],
        "type": "boolean",
        "description": "Only applies when Dygraphs is used as a GViz chart. Causes string columns following a data series to be interpreted as annotations on points in that series. This is the same format used by Google's AnnotatedTimeLine chart."
      },
      "panEdgeFraction": {
        "default": "null",
        "labels": ["Axis display", "Interactive Elements"],
        "type": "float",
        "description": "A value representing the farthest a graph may be panned, in percent of the display. For example, a value of 0.1 means that the graph can only be panned 10% pased the edges of the displayed values. null means no bounds."
      },
      "title": {
        "labels": ["Chart labels"],
        "type": "string",
        "default": "null",
        "description": "Text to display above the chart. You can supply any HTML for this value, not just text. If you wish to style it using CSS, use the 'dygraph-label' or 'dygraph-title' classes."
      },
      "titleHeight": {
        "default": "18",
        "labels": ["Chart labels"],
        "type": "integer",
        "description": "Height of the chart title, in pixels. This also controls the default font size of the title. If you style the title on your own, this controls how much space is set aside above the chart for the title's div."
      },
      "xlabel": {
        "labels": ["Chart labels"],
        "type": "string",
        "default": "null",
        "description": "Text to display below the chart's x-axis. You can supply any HTML for this value, not just text. If you wish to style it using CSS, use the 'dygraph-label' or 'dygraph-xlabel' classes."
      },
      "xLabelHeight": {
        "labels": ["Chart labels"],
        "type": "integer",
        "default": "18",
        "description": "Height of the x-axis label, in pixels. This also controls the default font size of the x-axis label. If you style the label on your own, this controls how much space is set aside below the chart for the x-axis label's div."
      },
      "ylabel": {
        "labels": ["Chart labels"],
        "type": "string",
        "default": "null",
        "description": "Text to display to the left of the chart's y-axis. You can supply any HTML for this value, not just text. If you wish to style it using CSS, use the 'dygraph-label' or 'dygraph-ylabel' classes. The text will be rotated 90 degrees by default, so CSS rules may behave in unintuitive ways. No additional space is set aside for a y-axis label. If you need more space, increase the width of the y-axis tick labels using the yAxisLabelWidth option. If you need a wider div for the y-axis label, either style it that way with CSS (but remember that it's rotated, so width is controlled by the 'height' property) or set the yLabelWidth option."
      },
      "y2label": {
        "labels": ["Chart labels"],
        "type": "string",
        "default": "null",
        "description": "Text to display to the right of the chart's secondary y-axis. This label is only displayed if a secondary y-axis is present. See <a href='http://dygraphs.com/tests/two-axes.html'>this test</a> for an example of how to do this. The comments for the 'ylabel' option generally apply here as well. This label gets a 'dygraph-y2label' instead of a 'dygraph-ylabel' class."
      },
      "yLabelWidth": {
        "labels": ["Chart labels"],
        "type": "integer",
        "default": "18",
        "description": "Width of the div which contains the y-axis label. Since the y-axis label appears rotated 90 degrees, this actually affects the height of its div."
      },
      "drawGrid": {
        "default": "true for x and y, false for y2",
        "labels": ["Grid"],
        "type": "boolean",
        "description": "Whether to display gridlines in the chart. This may be set on a per-axis basis to define the visibility of each axis' grid separately."
      },
      "independentTicks": {
        "default": "true for y, false for y2",
        "labels": ["Axis display", "Grid"],
        "type": "boolean",
        "description": "Only valid for y and y2, has no effect on x: This option defines whether the y axes should align their ticks or if they should be independent. Possible combinations: 1.) y=true, y2=false (default): y is the primary axis and the y2 ticks are aligned to the the ones of y. (only 1 grid) 2.) y=false, y2=true: y2 is the primary axis and the y ticks are aligned to the the ones of y2. (only 1 grid) 3.) y=true, y2=true: Both axis are independent and have their own ticks. (2 grids) 4.) y=false, y2=false: Invalid configuration causes an error."
      },
      "drawAxis": {
        "default": "true for x and y, false for y2",
        "labels": ["Axis display"],
        "type": "boolean",
        "description": "Whether to draw the specified axis. This may be set on a per-axis basis to define the visibility of each axis separately. Setting this to false also prevents axis ticks from being drawn and reclaims the space for the chart grid/lines."
      },
      "gridLineWidth": {
        "default": "0.3",
        "labels": ["Grid"],
        "type": "float",
        "description": "Thickness (in pixels) of the gridlines drawn under the chart. The vertical/horizontal gridlines can be turned off entirely by using the drawGrid option. This may be set on a per-axis basis to define each axis' grid separately."
      },
      "axisLineWidth": {
        "default": "0.3",
        "labels": ["Axis display"],
        "type": "float",
        "description": "Thickness (in pixels) of the x- and y-axis lines."
      },
      "axisLineColor": {
        "default": "black",
        "labels": ["Axis display"],
        "type": "string",
        "description": "Color of the x- and y-axis lines. Accepts any value which the HTML canvas strokeStyle attribute understands, e.g. 'black' or 'rgb(0, 100, 255)'."
      },
      "fillAlpha": {
        "default": "0.15",
        "labels": ["Error Bars", "Data Series Colors"],
        "type": "float (0.0 - 1.0)",
        "description": "Error bars (or custom bars) for each series are drawn in the same color as the series, but with partial transparency. This sets the transparency. A value of 0.0 means that the error bars will not be drawn, whereas a value of 1.0 means that the error bars will be as dark as the line for the series itself. This can be used to produce chart lines whose thickness varies at each point."
      },
      "axisLabelWidth": {
        "default": "50 (y-axis), 60 (x-axis)",
        "labels": ["Axis display", "Chart labels"],
        "type": "integer",
        "description": "Width (in pixels) of the containing divs for x- and y-axis labels. For the y-axis, this also controls the width of the y-axis. Note that for the x-axis, this is independent from pixelsPerLabel, which controls the spacing between labels."
      },
      "sigFigs": {
        "default": "null",
        "labels": ["Value display/formatting"],
        "type": "integer",
        "description": "By default, dygraphs displays numbers with a fixed number of digits after the decimal point. If you'd prefer to have a fixed number of significant figures, set this option to that number of sig figs. A value of 2, for instance, would cause 1 to be display as 1.0 and 1234 to be displayed as 1.23e+3."
      },
      "digitsAfterDecimal": {
        "default": "2",
        "labels": ["Value display/formatting"],
        "type": "integer",
        "description": "Unless it's run in scientific mode (see the <code>sigFigs</code> option), dygraphs displays numbers with <code>digitsAfterDecimal</code> digits after the decimal point. Trailing zeros are not displayed, so with a value of 2 you'll get '0', '0.1', '0.12', '123.45' but not '123.456' (it will be rounded to '123.46'). Numbers with absolute value less than 0.1^digitsAfterDecimal (i.e. those which would show up as '0.00') will be displayed in scientific notation."
      },
      "maxNumberWidth": {
        "default": "6",
        "labels": ["Value display/formatting"],
        "type": "integer",
        "description": "When displaying numbers in normal (not scientific) mode, large numbers will be displayed with many trailing zeros (e.g. 100000000 instead of 1e9). This can lead to unwieldy y-axis labels. If there are more than <code>maxNumberWidth</code> digits to the left of the decimal in a number, dygraphs will switch to scientific notation, even when not operating in scientific mode. If you'd like to see all those digits, set this to something large, like 20 or 30."
      },
      "file": {
        "default": "(set when constructed)",
        "labels": ["Data"],
        "type": "string (URL of CSV or CSV), GViz DataTable or 2D Array",
        "description": "Sets the data being displayed in the chart. This can only be set when calling updateOptions; it cannot be set from the constructor. For a full description of valid data formats, see the <a href='http://dygraphs.com/data.html'>Data Formats</a> page."
      },
      "timingName": {
        "default": "null",
        "labels": ["Debugging", "Deprecated"],
        "type": "string",
        "description": "Set this option to log timing information. The value of the option will be logged along with the timimg, so that you can distinguish multiple dygraphs on the same page."
      },
      "showRangeSelector": {
        "default": "false",
        "labels": ["Range Selector"],
        "type": "boolean",
        "description": "Show or hide the range selector widget."
      },
      "rangeSelectorHeight": {
        "default": "40",
        "labels": ["Range Selector"],
        "type": "integer",
        "description": "Height, in pixels, of the range selector widget. This option can only be specified at Dygraph creation time."
      },
      "rangeSelectorPlotStrokeColor": {
        "default": "#808FAB",
        "labels": ["Range Selector"],
        "type": "string",
        "description": "The range selector mini plot stroke color. This can be of the form \"#AABBCC\" or \"rgb(255,100,200)\" or \"yellow\". You can also specify null or \"\" to turn off stroke."
      },
      "rangeSelectorPlotFillColor": {
        "default": "#A7B1C4",
        "labels": ["Range Selector"],
        "type": "string",
        "description": "The range selector mini plot fill color. This can be of the form \"#AABBCC\" or \"rgb(255,100,200)\" or \"yellow\". You can also specify null or \"\" to turn off fill."
      },
      "rangeSelectorPlotFillGradientColor": {
        "default": "white",
        "labels": ["Range Selector"],
        "type": "string",
        "description": "The top color for the range selector mini plot fill color gradient. This can be of the form \"#AABBCC\" or \"rgb(255,100,200)\" or \"rgba(255,100,200,42)\" or \"yellow\". You can also specify null or \"\" to disable the gradient and fill with one single color."
      },
      "rangeSelectorBackgroundStrokeColor": {
        "default": "gray",
        "labels": ["Range Selector"],
        "type": "string",
        "description": "The color of the lines below and on both sides of the range selector mini plot. This can be of the form \"#AABBCC\" or \"rgb(255,100,200)\" or \"yellow\"."
      },
      "rangeSelectorBackgroundLineWidth": {
        "default": "1",
        "labels": ["Range Selector"],
        "type": "float",
        "description": "The width of the lines below and on both sides of the range selector mini plot."
      },
      "rangeSelectorPlotLineWidth": {
        "default": "1.5",
        "labels": ["Range Selector"],
        "type": "float",
        "description": "The width of the range selector mini plot line."
      },
      "rangeSelectorForegroundStrokeColor": {
        "default": "black",
        "labels": ["Range Selector"],
        "type": "string",
        "description": "The color of the lines in the interactive layer of the range selector. This can be of the form \"#AABBCC\" or \"rgb(255,100,200)\" or \"yellow\"."
      },
      "rangeSelectorForegroundLineWidth": {
        "default": "1",
        "labels": ["Range Selector"],
        "type": "float",
        "description": "The width the lines in the interactive layer of the range selector."
      },
      "rangeSelectorAlpha": {
        "default": "0.6",
        "labels": ["Range Selector"],
        "type": "float (0.0 - 1.0)",
        "description": "The transparency of the veil that is drawn over the unselected portions of the range selector mini plot. A value of 0 represents full transparency and the unselected portions of the mini plot will appear as normal. A value of 1 represents full opacity and the unselected portions of the mini plot will be hidden."
      },
      "showInRangeSelector": {
        "default": "null",
        "labels": ["Range Selector"],
        "type": "boolean",
        "description": "Mark this series for inclusion in the range selector. The mini plot curve will be an average of all such series. If this is not specified for any series, the default behavior is to average all the visible series. Setting it for one series will result in that series being charted alone in the range selector. Once it's set for a single series, it needs to be set for all series which should be included (regardless of visibility)."
      },
      "animatedZooms": {
        "default": "false",
        "labels": ["Interactive Elements"],
        "type": "boolean",
        "description": "Set this option to animate the transition between zoom windows. Applies to programmatic and interactive zooms. Note that if you also set a drawCallback, it will be called several times on each zoom. If you set a zoomCallback, it will only be called after the animation is complete."
      },
      "plotter": {
        "default": "[DygraphCanvasRenderer.Plotters.fillPlotter, DygraphCanvasRenderer.Plotters.errorPlotter, DygraphCanvasRenderer.Plotters.linePlotter]",
        "labels": ["Data Line display"],
        "type": "array or function",
        "description": "A function (or array of functions) which plot each data series on the chart. TODO(danvk): more details! May be set per-series."
      },
      "axes": {
        "default": "null",
        "labels": ["Configuration"],
        "type": "Object",
        "description": "Defines per-axis options. Valid keys are 'x', 'y' and 'y2'. Only some options may be set on a per-axis basis. If an option may be set in this way, it will be noted on this page. See also documentation on <a href='http://dygraphs.com/per-axis.html'>per-series and per-axis options</a>."
      },
      "series": {
        "default": "null",
        "labels": ["Series"],
        "type": "Object",
        "description": "Defines per-series options. Its keys match the y-axis label names, and the values are dictionaries themselves that contain options specific to that series."
      },
      "plugins": {
        "default": "[]",
        "labels": ["Configuration"],
        "type": "Array<plugin>",
        "description": "Defines per-graph plugins. Useful for per-graph customization"
      },
      "dataHandler": {
        "default": "(depends on data)",
        "labels": ["Data"],
        "type": "Dygraph.DataHandler",
        "description": "Custom DataHandler. This is an advanced customization. See http://bit.ly/151E7Aq."
      }
    }; // </JSON>
    // NOTE: in addition to parsing as JS, this snippet is expected to be valid
    // JSON. This assumption cannot be checked in JS, but it will be checked when
    // documentation is generated by the generate-documentation.py script. For the
    // most part, this just means that you should always use double quotes.

    // Do a quick sanity check on the options reference.
    var warn = function warn(msg) {
      if (window.console) window.console.warn(msg);
    };
    var flds = ['type', 'default', 'description'];
    var valid_cats = ['Annotations', 'Axis display', 'Chart labels', 'CSV parsing', 'Callbacks', 'Data', 'Data Line display', 'Data Series Colors', 'Error Bars', 'Grid', 'Interactive Elements', 'Range Selector', 'Legend', 'Overall display', 'Rolling Averages', 'Series', 'Value display/formatting', 'Zooming', 'Debugging', 'Configuration', 'Deprecated'];
    var i;
    var cats = {};
    for (i = 0; i < valid_cats.length; i++) cats[valid_cats[i]] = true;

    for (var k in OPTIONS_REFERENCE) {
      if (!OPTIONS_REFERENCE.hasOwnProperty(k)) continue;
      var op = OPTIONS_REFERENCE[k];
      for (i = 0; i < flds.length; i++) {
        if (!op.hasOwnProperty(flds[i])) {
          warn('Option ' + k + ' missing "' + flds[i] + '" property');
        } else if (typeof op[flds[i]] != 'string') {
          warn(k + '.' + flds[i] + ' must be of type string');
        }
      }
      var labels = op.labels;
      if (typeof labels !== 'object') {
        warn('Option "' + k + '" is missing a "labels": [...] option');
      } else {
        for (i = 0; i < labels.length; i++) {
          if (!cats.hasOwnProperty(labels[i])) {
            warn('Option "' + k + '" has label "' + labels[i] + '", which is invalid.');
          }
        }
      }
    }
  }
}

exports['default'] = OPTIONS_REFERENCE;
module.exports = exports['default'];

}).call(this,require('_process'))

},{"_process":1}],15:[function(require,module,exports){
(function (process){
/**
 * @license
 * Copyright 2011 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview DygraphOptions is responsible for parsing and returning
 * information about options.
 */

// TODO: remove this jshint directive & fix the warnings.
/*jshint sub:true */
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dygraphUtils = require('./dygraph-utils');

var utils = _interopRequireWildcard(_dygraphUtils);

var _dygraphDefaultAttrs = require('./dygraph-default-attrs');

var _dygraphDefaultAttrs2 = _interopRequireDefault(_dygraphDefaultAttrs);

var _dygraphOptionsReference = require('./dygraph-options-reference');

var _dygraphOptionsReference2 = _interopRequireDefault(_dygraphOptionsReference);

/*
 * Interesting member variables: (REMOVING THIS LIST AS I CLOSURIZE)
 * global_ - global attributes (common among all graphs, AIUI)
 * user - attributes set by the user
 * series_ - { seriesName -> { idx, yAxis, options }}
 */

/**
 * This parses attributes into an object that can be easily queried.
 *
 * It doesn't necessarily mean that all options are available, specifically
 * if labels are not yet available, since those drive details of the per-series
 * and per-axis options.
 *
 * @param {Dygraph} dygraph The chart to which these options belong.
 * @constructor
 */
var DygraphOptions = function DygraphOptions(dygraph) {
  /**
   * The dygraph.
   * @type {!Dygraph}
   */
  this.dygraph_ = dygraph;

  /**
   * Array of axis index to { series : [ series names ] , options : { axis-specific options. }
   * @type {Array.<{series : Array.<string>, options : Object}>} @private
   */
  this.yAxes_ = [];

  /**
   * Contains x-axis specific options, which are stored in the options key.
   * This matches the yAxes_ object structure (by being a dictionary with an
   * options element) allowing for shared code.
   * @type {options: Object} @private
   */
  this.xAxis_ = {};
  this.series_ = {};

  // Once these two objects are initialized, you can call get();
  this.global_ = this.dygraph_.attrs_;
  this.user_ = this.dygraph_.user_attrs_ || {};

  /**
   * A list of series in columnar order.
   * @type {Array.<string>}
   */
  this.labels_ = [];

  this.highlightSeries_ = this.get("highlightSeriesOpts") || {};
  this.reparseSeries();
};

/**
 * Not optimal, but does the trick when you're only using two axes.
 * If we move to more axes, this can just become a function.
 *
 * @type {Object.<number>}
 * @private
 */
DygraphOptions.AXIS_STRING_MAPPINGS_ = {
  'y': 0,
  'Y': 0,
  'y1': 0,
  'Y1': 0,
  'y2': 1,
  'Y2': 1
};

/**
 * @param {string|number} axis
 * @private
 */
DygraphOptions.axisToIndex_ = function (axis) {
  if (typeof axis == "string") {
    if (DygraphOptions.AXIS_STRING_MAPPINGS_.hasOwnProperty(axis)) {
      return DygraphOptions.AXIS_STRING_MAPPINGS_[axis];
    }
    throw "Unknown axis : " + axis;
  }
  if (typeof axis == "number") {
    if (axis === 0 || axis === 1) {
      return axis;
    }
    throw "Dygraphs only supports two y-axes, indexed from 0-1.";
  }
  if (axis) {
    throw "Unknown axis : " + axis;
  }
  // No axis specification means axis 0.
  return 0;
};

/**
 * Reparses options that are all related to series. This typically occurs when
 * options are either updated, or source data has been made available.
 *
 * TODO(konigsberg): The method name is kind of weak; fix.
 */
DygraphOptions.prototype.reparseSeries = function () {
  var labels = this.get("labels");
  if (!labels) {
    return; // -- can't do more for now, will parse after getting the labels.
  }

  this.labels_ = labels.slice(1);

  this.yAxes_ = [{ series: [], options: {} }]; // Always one axis at least.
  this.xAxis_ = { options: {} };
  this.series_ = {};

  // Series are specified in the series element:
  //
  // {
  //   labels: [ "X", "foo", "bar" ],
  //   pointSize: 3,
  //   series : {
  //     foo : {}, // options for foo
  //     bar : {} // options for bar
  //   }
  // }
  //
  // So, if series is found, it's expected to contain per-series data, otherwise set a
  // default.
  var seriesDict = this.user_.series || {};
  for (var idx = 0; idx < this.labels_.length; idx++) {
    var seriesName = this.labels_[idx];
    var optionsForSeries = seriesDict[seriesName] || {};
    var yAxis = DygraphOptions.axisToIndex_(optionsForSeries["axis"]);

    this.series_[seriesName] = {
      idx: idx,
      yAxis: yAxis,
      options: optionsForSeries };

    if (!this.yAxes_[yAxis]) {
      this.yAxes_[yAxis] = { series: [seriesName], options: {} };
    } else {
      this.yAxes_[yAxis].series.push(seriesName);
    }
  }

  var axis_opts = this.user_["axes"] || {};
  utils.update(this.yAxes_[0].options, axis_opts["y"] || {});
  if (this.yAxes_.length > 1) {
    utils.update(this.yAxes_[1].options, axis_opts["y2"] || {});
  }
  utils.update(this.xAxis_.options, axis_opts["x"] || {});

  // For "production" code, this gets removed by uglifyjs.
  if (typeof process !== 'undefined') {
    if ("development" != 'production') {
      this.validateOptions_();
    }
  }
};

/**
 * Get a global value.
 *
 * @param {string} name the name of the option.
 */
DygraphOptions.prototype.get = function (name) {
  var result = this.getGlobalUser_(name);
  if (result !== null) {
    return result;
  }
  return this.getGlobalDefault_(name);
};

DygraphOptions.prototype.getGlobalUser_ = function (name) {
  if (this.user_.hasOwnProperty(name)) {
    return this.user_[name];
  }
  return null;
};

DygraphOptions.prototype.getGlobalDefault_ = function (name) {
  if (this.global_.hasOwnProperty(name)) {
    return this.global_[name];
  }
  if (_dygraphDefaultAttrs2['default'].hasOwnProperty(name)) {
    return _dygraphDefaultAttrs2['default'][name];
  }
  return null;
};

/**
 * Get a value for a specific axis. If there is no specific value for the axis,
 * the global value is returned.
 *
 * @param {string} name the name of the option.
 * @param {string|number} axis the axis to search. Can be the string representation
 * ("y", "y2") or the axis number (0, 1).
 */
DygraphOptions.prototype.getForAxis = function (name, axis) {
  var axisIdx;
  var axisString;

  // Since axis can be a number or a string, straighten everything out here.
  if (typeof axis == 'number') {
    axisIdx = axis;
    axisString = axisIdx === 0 ? "y" : "y2";
  } else {
    if (axis == "y1") {
      axis = "y";
    } // Standardize on 'y'. Is this bad? I think so.
    if (axis == "y") {
      axisIdx = 0;
    } else if (axis == "y2") {
      axisIdx = 1;
    } else if (axis == "x") {
      axisIdx = -1; // simply a placeholder for below.
    } else {
        throw "Unknown axis " + axis;
      }
    axisString = axis;
  }

  var userAxis = axisIdx == -1 ? this.xAxis_ : this.yAxes_[axisIdx];

  // Search the user-specified axis option first.
  if (userAxis) {
    // This condition could be removed if we always set up this.yAxes_ for y2.
    var axisOptions = userAxis.options;
    if (axisOptions.hasOwnProperty(name)) {
      return axisOptions[name];
    }
  }

  // User-specified global options second.
  // But, hack, ignore globally-specified 'logscale' for 'x' axis declaration.
  if (!(axis === 'x' && name === 'logscale')) {
    var result = this.getGlobalUser_(name);
    if (result !== null) {
      return result;
    }
  }
  // Default axis options third.
  var defaultAxisOptions = _dygraphDefaultAttrs2['default'].axes[axisString];
  if (defaultAxisOptions.hasOwnProperty(name)) {
    return defaultAxisOptions[name];
  }

  // Default global options last.
  return this.getGlobalDefault_(name);
};

/**
 * Get a value for a specific series. If there is no specific value for the series,
 * the value for the axis is returned (and afterwards, the global value.)
 *
 * @param {string} name the name of the option.
 * @param {string} series the series to search.
 */
DygraphOptions.prototype.getForSeries = function (name, series) {
  // Honors indexes as series.
  if (series === this.dygraph_.getHighlightSeries()) {
    if (this.highlightSeries_.hasOwnProperty(name)) {
      return this.highlightSeries_[name];
    }
  }

  if (!this.series_.hasOwnProperty(series)) {
    throw "Unknown series: " + series;
  }

  var seriesObj = this.series_[series];
  var seriesOptions = seriesObj["options"];
  if (seriesOptions.hasOwnProperty(name)) {
    return seriesOptions[name];
  }

  return this.getForAxis(name, seriesObj["yAxis"]);
};

/**
 * Returns the number of y-axes on the chart.
 * @return {number} the number of axes.
 */
DygraphOptions.prototype.numAxes = function () {
  return this.yAxes_.length;
};

/**
 * Return the y-axis for a given series, specified by name.
 */
DygraphOptions.prototype.axisForSeries = function (series) {
  return this.series_[series].yAxis;
};

/**
 * Returns the options for the specified axis.
 */
// TODO(konigsberg): this is y-axis specific. Support the x axis.
DygraphOptions.prototype.axisOptions = function (yAxis) {
  return this.yAxes_[yAxis].options;
};

/**
 * Return the series associated with an axis.
 */
DygraphOptions.prototype.seriesForAxis = function (yAxis) {
  return this.yAxes_[yAxis].series;
};

/**
 * Return the list of all series, in their columnar order.
 */
DygraphOptions.prototype.seriesNames = function () {
  return this.labels_;
};

// For "production" code, this gets removed by uglifyjs.
if (typeof process !== 'undefined') {
  if ("development" != 'production') {

    /**
     * Validate all options.
     * This requires OPTIONS_REFERENCE, which is only available in debug builds.
     * @private
     */
    DygraphOptions.prototype.validateOptions_ = function () {
      if (typeof _dygraphOptionsReference2['default'] === 'undefined') {
        throw 'Called validateOptions_ in prod build.';
      }

      var that = this;
      var validateOption = function validateOption(optionName) {
        if (!_dygraphOptionsReference2['default'][optionName]) {
          that.warnInvalidOption_(optionName);
        }
      };

      var optionsDicts = [this.xAxis_.options, this.yAxes_[0].options, this.yAxes_[1] && this.yAxes_[1].options, this.global_, this.user_, this.highlightSeries_];
      var names = this.seriesNames();
      for (var i = 0; i < names.length; i++) {
        var name = names[i];
        if (this.series_.hasOwnProperty(name)) {
          optionsDicts.push(this.series_[name].options);
        }
      }
      for (var i = 0; i < optionsDicts.length; i++) {
        var dict = optionsDicts[i];
        if (!dict) continue;
        for (var optionName in dict) {
          if (dict.hasOwnProperty(optionName)) {
            validateOption(optionName);
          }
        }
      }
    };

    var WARNINGS = {}; // Only show any particular warning once.

    /**
     * Logs a warning about invalid options.
     * TODO: make this throw for testing
     * @private
     */
    DygraphOptions.prototype.warnInvalidOption_ = function (optionName) {
      if (!WARNINGS[optionName]) {
        WARNINGS[optionName] = true;
        var isSeries = this.labels_.indexOf(optionName) >= 0;
        if (isSeries) {
          console.warn('Use new-style per-series options (saw ' + optionName + ' as top-level options key). See http://bit.ly/1tceaJs');
        } else {
          console.warn('Unknown option ' + optionName + ' (full list of options at dygraphs.com/options.html');
        }
        throw "invalid option " + optionName;
      }
    };

    // Reset list of previously-shown warnings. Used for testing.
    DygraphOptions.resetWarnings_ = function () {
      WARNINGS = {};
    };
  }
}

exports['default'] = DygraphOptions;
module.exports = exports['default'];

}).call(this,require('_process'))

},{"./dygraph-default-attrs":10,"./dygraph-options-reference":14,"./dygraph-utils":17,"_process":1}],16:[function(require,module,exports){
/**
 * @license
 * Copyright 2011 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview Description of this file.
 * @author danvk@google.com (Dan Vanderkam)
 *
 * A ticker is a function with the following interface:
 *
 * function(a, b, pixels, options_view, dygraph, forced_values);
 * -> [ { v: tick1_v, label: tick1_label[, label_v: label_v1] },
 *      { v: tick2_v, label: tick2_label[, label_v: label_v2] },
 *      ...
 *    ]
 *
 * The returned value is called a "tick list".
 *
 * Arguments
 * ---------
 *
 * [a, b] is the range of the axis for which ticks are being generated. For a
 * numeric axis, these will simply be numbers. For a date axis, these will be
 * millis since epoch (convertable to Date objects using "new Date(a)" and "new
 * Date(b)").
 *
 * opts provides access to chart- and axis-specific options. It can be used to
 * access number/date formatting code/options, check for a log scale, etc.
 *
 * pixels is the length of the axis in pixels. opts('pixelsPerLabel') is the
 * minimum amount of space to be allotted to each label. For instance, if
 * pixels=400 and opts('pixelsPerLabel')=40 then the ticker should return
 * between zero and ten (400/40) ticks.
 *
 * dygraph is the Dygraph object for which an axis is being constructed.
 *
 * forced_values is used for secondary y-axes. The tick positions are typically
 * set by the primary y-axis, so the secondary y-axis has no choice in where to
 * put these. It simply has to generate labels for these data values.
 *
 * Tick lists
 * ----------
 * Typically a tick will have both a grid/tick line and a label at one end of
 * that line (at the bottom for an x-axis, at left or right for the y-axis).
 *
 * A tick may be missing one of these two components:
 * - If "label_v" is specified instead of "v", then there will be no tick or
 *   gridline, just a label.
 * - Similarly, if "label" is not specified, then there will be a gridline
 *   without a label.
 *
 * This flexibility is useful in a few situations:
 * - For log scales, some of the tick lines may be too close to all have labels.
 * - For date scales where years are being displayed, it is desirable to display
 *   tick marks at the beginnings of years but labels (e.g. "2006") in the
 *   middle of the years.
 */

/*jshint sub:true */
/*global Dygraph:false */
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dygraphUtils = require('./dygraph-utils');

var utils = _interopRequireWildcard(_dygraphUtils);

/** @typedef {Array.<{v:number, label:string, label_v:(string|undefined)}>} */
var TickList = undefined; // the ' = undefined' keeps jshint happy.

/** @typedef {function(
 *    number,
 *    number,
 *    number,
 *    function(string):*,
 *    Dygraph=,
 *    Array.<number>=
 *  ): TickList}
 */
var Ticker = undefined; // the ' = undefined' keeps jshint happy.

/** @type {Ticker} */
var numericLinearTicks = function numericLinearTicks(a, b, pixels, opts, dygraph, vals) {
  var nonLogscaleOpts = function nonLogscaleOpts(opt) {
    if (opt === 'logscale') return false;
    return opts(opt);
  };
  return numericTicks(a, b, pixels, nonLogscaleOpts, dygraph, vals);
};

exports.numericLinearTicks = numericLinearTicks;
/** @type {Ticker} */
var numericTicks = function numericTicks(a, b, pixels, opts, dygraph, vals) {
  var pixels_per_tick = /** @type{number} */opts('pixelsPerLabel');
  var ticks = [];
  var i, j, tickV, nTicks;
  if (vals) {
    for (i = 0; i < vals.length; i++) {
      ticks.push({ v: vals[i] });
    }
  } else {
    // TODO(danvk): factor this log-scale block out into a separate function.
    if (opts("logscale")) {
      nTicks = Math.floor(pixels / pixels_per_tick);
      var minIdx = utils.binarySearch(a, PREFERRED_LOG_TICK_VALUES, 1);
      var maxIdx = utils.binarySearch(b, PREFERRED_LOG_TICK_VALUES, -1);
      if (minIdx == -1) {
        minIdx = 0;
      }
      if (maxIdx == -1) {
        maxIdx = PREFERRED_LOG_TICK_VALUES.length - 1;
      }
      // Count the number of tick values would appear, if we can get at least
      // nTicks / 4 accept them.
      var lastDisplayed = null;
      if (maxIdx - minIdx >= nTicks / 4) {
        for (var idx = maxIdx; idx >= minIdx; idx--) {
          var tickValue = PREFERRED_LOG_TICK_VALUES[idx];
          var pixel_coord = Math.log(tickValue / a) / Math.log(b / a) * pixels;
          var tick = { v: tickValue };
          if (lastDisplayed === null) {
            lastDisplayed = {
              tickValue: tickValue,
              pixel_coord: pixel_coord
            };
          } else {
            if (Math.abs(pixel_coord - lastDisplayed.pixel_coord) >= pixels_per_tick) {
              lastDisplayed = {
                tickValue: tickValue,
                pixel_coord: pixel_coord
              };
            } else {
              tick.label = "";
            }
          }
          ticks.push(tick);
        }
        // Since we went in backwards order.
        ticks.reverse();
      }
    }

    // ticks.length won't be 0 if the log scale function finds values to insert.
    if (ticks.length === 0) {
      // Basic idea:
      // Try labels every 1, 2, 5, 10, 20, 50, 100, etc.
      // Calculate the resulting tick spacing (i.e. this.height_ / nTicks).
      // The first spacing greater than pixelsPerYLabel is what we use.
      // TODO(danvk): version that works on a log scale.
      var kmg2 = opts("labelsKMG2");
      var mults, base;
      if (kmg2) {
        mults = [1, 2, 4, 8, 16, 32, 64, 128, 256];
        base = 16;
      } else {
        mults = [1, 2, 5, 10, 20, 50, 100];
        base = 10;
      }

      // Get the maximum number of permitted ticks based on the
      // graph's pixel size and pixels_per_tick setting.
      var max_ticks = Math.ceil(pixels / pixels_per_tick);

      // Now calculate the data unit equivalent of this tick spacing.
      // Use abs() since graphs may have a reversed Y axis.
      var units_per_tick = Math.abs(b - a) / max_ticks;

      // Based on this, get a starting scale which is the largest
      // integer power of the chosen base (10 or 16) that still remains
      // below the requested pixels_per_tick spacing.
      var base_power = Math.floor(Math.log(units_per_tick) / Math.log(base));
      var base_scale = Math.pow(base, base_power);

      // Now try multiples of the starting scale until we find one
      // that results in tick marks spaced sufficiently far apart.
      // The "mults" array should cover the range 1 .. base^2 to
      // adjust for rounding and edge effects.
      var scale, low_val, high_val, spacing;
      for (j = 0; j < mults.length; j++) {
        scale = base_scale * mults[j];
        low_val = Math.floor(a / scale) * scale;
        high_val = Math.ceil(b / scale) * scale;
        nTicks = Math.abs(high_val - low_val) / scale;
        spacing = pixels / nTicks;
        if (spacing > pixels_per_tick) break;
      }

      // Construct the set of ticks.
      // Allow reverse y-axis if it's explicitly requested.
      if (low_val > high_val) scale *= -1;
      for (i = 0; i <= nTicks; i++) {
        tickV = low_val + i * scale;
        ticks.push({ v: tickV });
      }
    }
  }

  var formatter = /**@type{AxisLabelFormatter}*/opts('axisLabelFormatter');

  // Add labels to the ticks.
  for (i = 0; i < ticks.length; i++) {
    if (ticks[i].label !== undefined) continue; // Use current label.
    // TODO(danvk): set granularity to something appropriate here.
    ticks[i].label = formatter.call(dygraph, ticks[i].v, 0, opts, dygraph);
  }

  return ticks;
};

exports.numericTicks = numericTicks;
/** @type {Ticker} */
var dateTicker = function dateTicker(a, b, pixels, opts, dygraph, vals) {
  var chosen = pickDateTickGranularity(a, b, pixels, opts);

  if (chosen >= 0) {
    return getDateAxis(a, b, chosen, opts, dygraph);
  } else {
    // this can happen if self.width_ is zero.
    return [];
  }
};

exports.dateTicker = dateTicker;
// Time granularity enumeration
var Granularity = {
  SECONDLY: 0,
  TWO_SECONDLY: 1,
  FIVE_SECONDLY: 2,
  TEN_SECONDLY: 3,
  THIRTY_SECONDLY: 4,
  MINUTELY: 5,
  TWO_MINUTELY: 6,
  FIVE_MINUTELY: 7,
  TEN_MINUTELY: 8,
  THIRTY_MINUTELY: 9,
  HOURLY: 10,
  TWO_HOURLY: 11,
  SIX_HOURLY: 12,
  DAILY: 13,
  TWO_DAILY: 14,
  WEEKLY: 15,
  MONTHLY: 16,
  QUARTERLY: 17,
  BIANNUAL: 18,
  ANNUAL: 19,
  DECADAL: 20,
  CENTENNIAL: 21,
  NUM_GRANULARITIES: 22
};

exports.Granularity = Granularity;
// Date components enumeration (in the order of the arguments in Date)
// TODO: make this an @enum
var DateField = {
  DATEFIELD_Y: 0,
  DATEFIELD_M: 1,
  DATEFIELD_D: 2,
  DATEFIELD_HH: 3,
  DATEFIELD_MM: 4,
  DATEFIELD_SS: 5,
  DATEFIELD_MS: 6,
  NUM_DATEFIELDS: 7
};

/**
 * The value of datefield will start at an even multiple of "step", i.e.
 *   if datefield=SS and step=5 then the first tick will be on a multiple of 5s.
 *
 * For granularities <= HOURLY, ticks are generated every `spacing` ms.
 *
 * At coarser granularities, ticks are generated by incrementing `datefield` by
 *   `step`. In this case, the `spacing` value is only used to estimate the
 *   number of ticks. It should roughly correspond to the spacing between
 *   adjacent ticks.
 *
 * @type {Array.<{datefield:number, step:number, spacing:number}>}
 */
var TICK_PLACEMENT = [];
TICK_PLACEMENT[Granularity.SECONDLY] = { datefield: DateField.DATEFIELD_SS, step: 1, spacing: 1000 * 1 };
TICK_PLACEMENT[Granularity.TWO_SECONDLY] = { datefield: DateField.DATEFIELD_SS, step: 2, spacing: 1000 * 2 };
TICK_PLACEMENT[Granularity.FIVE_SECONDLY] = { datefield: DateField.DATEFIELD_SS, step: 5, spacing: 1000 * 5 };
TICK_PLACEMENT[Granularity.TEN_SECONDLY] = { datefield: DateField.DATEFIELD_SS, step: 10, spacing: 1000 * 10 };
TICK_PLACEMENT[Granularity.THIRTY_SECONDLY] = { datefield: DateField.DATEFIELD_SS, step: 30, spacing: 1000 * 30 };
TICK_PLACEMENT[Granularity.MINUTELY] = { datefield: DateField.DATEFIELD_MM, step: 1, spacing: 1000 * 60 };
TICK_PLACEMENT[Granularity.TWO_MINUTELY] = { datefield: DateField.DATEFIELD_MM, step: 2, spacing: 1000 * 60 * 2 };
TICK_PLACEMENT[Granularity.FIVE_MINUTELY] = { datefield: DateField.DATEFIELD_MM, step: 5, spacing: 1000 * 60 * 5 };
TICK_PLACEMENT[Granularity.TEN_MINUTELY] = { datefield: DateField.DATEFIELD_MM, step: 10, spacing: 1000 * 60 * 10 };
TICK_PLACEMENT[Granularity.THIRTY_MINUTELY] = { datefield: DateField.DATEFIELD_MM, step: 30, spacing: 1000 * 60 * 30 };
TICK_PLACEMENT[Granularity.HOURLY] = { datefield: DateField.DATEFIELD_HH, step: 1, spacing: 1000 * 3600 };
TICK_PLACEMENT[Granularity.TWO_HOURLY] = { datefield: DateField.DATEFIELD_HH, step: 2, spacing: 1000 * 3600 * 2 };
TICK_PLACEMENT[Granularity.SIX_HOURLY] = { datefield: DateField.DATEFIELD_HH, step: 6, spacing: 1000 * 3600 * 6 };
TICK_PLACEMENT[Granularity.DAILY] = { datefield: DateField.DATEFIELD_D, step: 1, spacing: 1000 * 86400 };
TICK_PLACEMENT[Granularity.TWO_DAILY] = { datefield: DateField.DATEFIELD_D, step: 2, spacing: 1000 * 86400 * 2 };
TICK_PLACEMENT[Granularity.WEEKLY] = { datefield: DateField.DATEFIELD_D, step: 7, spacing: 1000 * 604800 };
TICK_PLACEMENT[Granularity.MONTHLY] = { datefield: DateField.DATEFIELD_M, step: 1, spacing: 1000 * 7200 * 365.2524 }; // 1e3 * 60 * 60 * 24 * 365.2524 / 12
TICK_PLACEMENT[Granularity.QUARTERLY] = { datefield: DateField.DATEFIELD_M, step: 3, spacing: 1000 * 21600 * 365.2524 }; // 1e3 * 60 * 60 * 24 * 365.2524 / 4
TICK_PLACEMENT[Granularity.BIANNUAL] = { datefield: DateField.DATEFIELD_M, step: 6, spacing: 1000 * 43200 * 365.2524 }; // 1e3 * 60 * 60 * 24 * 365.2524 / 2
TICK_PLACEMENT[Granularity.ANNUAL] = { datefield: DateField.DATEFIELD_Y, step: 1, spacing: 1000 * 86400 * 365.2524 }; // 1e3 * 60 * 60 * 24 * 365.2524 * 1
TICK_PLACEMENT[Granularity.DECADAL] = { datefield: DateField.DATEFIELD_Y, step: 10, spacing: 1000 * 864000 * 365.2524 }; // 1e3 * 60 * 60 * 24 * 365.2524 * 10
TICK_PLACEMENT[Granularity.CENTENNIAL] = { datefield: DateField.DATEFIELD_Y, step: 100, spacing: 1000 * 8640000 * 365.2524 }; // 1e3 * 60 * 60 * 24 * 365.2524 * 100

/**
 * This is a list of human-friendly values at which to show tick marks on a log
 * scale. It is k * 10^n, where k=1..9 and n=-39..+39, so:
 * ..., 1, 2, 3, 4, 5, ..., 9, 10, 20, 30, ..., 90, 100, 200, 300, ...
 * NOTE: this assumes that utils.LOG_SCALE = 10.
 * @type {Array.<number>}
 */
var PREFERRED_LOG_TICK_VALUES = (function () {
  var vals = [];
  for (var power = -39; power <= 39; power++) {
    var range = Math.pow(10, power);
    for (var mult = 1; mult <= 9; mult++) {
      var val = range * mult;
      vals.push(val);
    }
  }
  return vals;
})();

/**
 * Determine the correct granularity of ticks on a date axis.
 *
 * @param {number} a Left edge of the chart (ms)
 * @param {number} b Right edge of the chart (ms)
 * @param {number} pixels Size of the chart in the relevant dimension (width).
 * @param {function(string):*} opts Function mapping from option name -&gt; value.
 * @return {number} The appropriate axis granularity for this chart. See the
 *     enumeration of possible values in dygraph-tickers.js.
 */
var pickDateTickGranularity = function pickDateTickGranularity(a, b, pixels, opts) {
  var pixels_per_tick = /** @type{number} */opts('pixelsPerLabel');
  for (var i = 0; i < Granularity.NUM_GRANULARITIES; i++) {
    var num_ticks = numDateTicks(a, b, i);
    if (pixels / num_ticks >= pixels_per_tick) {
      return i;
    }
  }
  return -1;
};

/**
 * Compute the number of ticks on a date axis for a given granularity.
 * @param {number} start_time
 * @param {number} end_time
 * @param {number} granularity (one of the granularities enumerated above)
 * @return {number} (Approximate) number of ticks that would result.
 */
var numDateTicks = function numDateTicks(start_time, end_time, granularity) {
  var spacing = TICK_PLACEMENT[granularity].spacing;
  return Math.round(1.0 * (end_time - start_time) / spacing);
};

/**
 * Compute the positions and labels of ticks on a date axis for a given granularity.
 * @param {number} start_time
 * @param {number} end_time
 * @param {number} granularity (one of the granularities enumerated above)
 * @param {function(string):*} opts Function mapping from option name -&gt; value.
 * @param {Dygraph=} dg
 * @return {!TickList}
 */
var getDateAxis = function getDateAxis(start_time, end_time, granularity, opts, dg) {
  var formatter = /** @type{AxisLabelFormatter} */opts("axisLabelFormatter");
  var utc = opts("labelsUTC");
  var accessors = utc ? utils.DateAccessorsUTC : utils.DateAccessorsLocal;

  var datefield = TICK_PLACEMENT[granularity].datefield;
  var step = TICK_PLACEMENT[granularity].step;
  var spacing = TICK_PLACEMENT[granularity].spacing;

  // Choose a nice tick position before the initial instant.
  // Currently, this code deals properly with the existent daily granularities:
  // DAILY (with step of 1) and WEEKLY (with step of 7 but specially handled).
  // Other daily granularities (say TWO_DAILY) should also be handled specially
  // by setting the start_date_offset to 0.
  var start_date = new Date(start_time);
  var date_array = [];
  date_array[DateField.DATEFIELD_Y] = accessors.getFullYear(start_date);
  date_array[DateField.DATEFIELD_M] = accessors.getMonth(start_date);
  date_array[DateField.DATEFIELD_D] = accessors.getDate(start_date);
  date_array[DateField.DATEFIELD_HH] = accessors.getHours(start_date);
  date_array[DateField.DATEFIELD_MM] = accessors.getMinutes(start_date);
  date_array[DateField.DATEFIELD_SS] = accessors.getSeconds(start_date);
  date_array[DateField.DATEFIELD_MS] = accessors.getMilliseconds(start_date);

  var start_date_offset = date_array[datefield] % step;
  if (granularity == Granularity.WEEKLY) {
    // This will put the ticks on Sundays.
    start_date_offset = accessors.getDay(start_date);
  }

  date_array[datefield] -= start_date_offset;
  for (var df = datefield + 1; df < DateField.NUM_DATEFIELDS; df++) {
    // The minimum value is 1 for the day of month, and 0 for all other fields.
    date_array[df] = df === DateField.DATEFIELD_D ? 1 : 0;
  }

  // Generate the ticks.
  // For granularities not coarser than HOURLY we use the fact that:
  //   the number of milliseconds between ticks is constant
  //   and equal to the defined spacing.
  // Otherwise we rely on the 'roll over' property of the Date functions:
  //   when some date field is set to a value outside of its logical range,
  //   the excess 'rolls over' the next (more significant) field.
  // However, when using local time with DST transitions,
  // there are dates that do not represent any time value at all
  // (those in the hour skipped at the 'spring forward'),
  // and the JavaScript engines usually return an equivalent value.
  // Hence we have to check that the date is properly increased at each step,
  // returning a date at a nice tick position.
  var ticks = [];
  var tick_date = accessors.makeDate.apply(null, date_array);
  var tick_time = tick_date.getTime();
  if (granularity <= Granularity.HOURLY) {
    if (tick_time < start_time) {
      tick_time += spacing;
      tick_date = new Date(tick_time);
    }
    while (tick_time <= end_time) {
      ticks.push({ v: tick_time,
        label: formatter.call(dg, tick_date, granularity, opts, dg)
      });
      tick_time += spacing;
      tick_date = new Date(tick_time);
    }
  } else {
    if (tick_time < start_time) {
      date_array[datefield] += step;
      tick_date = accessors.makeDate.apply(null, date_array);
      tick_time = tick_date.getTime();
    }
    while (tick_time <= end_time) {
      if (granularity >= Granularity.DAILY || accessors.getHours(tick_date) % step === 0) {
        ticks.push({ v: tick_time,
          label: formatter.call(dg, tick_date, granularity, opts, dg)
        });
      }
      date_array[datefield] += step;
      tick_date = accessors.makeDate.apply(null, date_array);
      tick_time = tick_date.getTime();
    }
  }
  return ticks;
};
exports.getDateAxis = getDateAxis;

},{"./dygraph-utils":17}],17:[function(require,module,exports){
/**
 * @license
 * Copyright 2011 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview This file contains utility functions used by dygraphs. These
 * are typically static (i.e. not related to any particular dygraph). Examples
 * include date/time formatting functions, basic algorithms (e.g. binary
 * search) and generic DOM-manipulation functions.
 */

/*global Dygraph:false, Node:false */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeEvent = removeEvent;
exports.cancelEvent = cancelEvent;
exports.hsvToRGB = hsvToRGB;
exports.findPos = findPos;
exports.pageX = pageX;
exports.pageY = pageY;
exports.dragGetX_ = dragGetX_;
exports.dragGetY_ = dragGetY_;
exports.isOK = isOK;
exports.isValidPoint = isValidPoint;
exports.floatFormat = floatFormat;
exports.zeropad = zeropad;
exports.hmsString_ = hmsString_;
exports.dateString_ = dateString_;
exports.round_ = round_;
exports.binarySearch = binarySearch;
exports.dateParser = dateParser;
exports.dateStrToMillis = dateStrToMillis;
exports.update = update;
exports.updateDeep = updateDeep;
exports.isArrayLike = isArrayLike;
exports.isDateLike = isDateLike;
exports.clone = clone;
exports.createCanvas = createCanvas;
exports.getContextPixelRatio = getContextPixelRatio;
exports.Iterator = Iterator;
exports.createIterator = createIterator;
exports.repeatAndCleanup = repeatAndCleanup;
exports.isPixelChangingOptionList = isPixelChangingOptionList;
exports.detectLineDelimiter = detectLineDelimiter;
exports.isNodeContainedBy = isNodeContainedBy;
exports.pow = pow;
exports.toRGB_ = toRGB_;
exports.isCanvasSupported = isCanvasSupported;
exports.parseFloat_ = parseFloat_;
exports.numberValueFormatter = numberValueFormatter;
exports.numberAxisLabelFormatter = numberAxisLabelFormatter;
exports.dateAxisLabelFormatter = dateAxisLabelFormatter;
exports.dateValueFormatter = dateValueFormatter;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _dygraphTickers = require('./dygraph-tickers');

var DygraphTickers = _interopRequireWildcard(_dygraphTickers);

var LOG_SCALE = 10;
exports.LOG_SCALE = LOG_SCALE;
var LN_TEN = Math.log(LOG_SCALE);

exports.LN_TEN = LN_TEN;
/**
 * @private
 * @param {number} x
 * @return {number}
 */
var log10 = function log10(x) {
  return Math.log(x) / LN_TEN;
};

exports.log10 = log10;
/**
 * @private
 * @param {number} r0
 * @param {number} r1
 * @param {number} pct
 * @return {number}
 */
var logRangeFraction = function logRangeFraction(r0, r1, pct) {
  // Computing the inverse of toPercentXCoord. The function was arrived at with
  // the following steps:
  //
  // Original calcuation:
  // pct = (log(x) - log(xRange[0])) / (log(xRange[1]) - log(xRange[0])));
  //
  // Multiply both sides by the right-side demoninator.
  // pct * (log(xRange[1] - log(xRange[0]))) = log(x) - log(xRange[0])
  //
  // add log(xRange[0]) to both sides
  // log(xRange[0]) + (pct * (log(xRange[1]) - log(xRange[0])) = log(x);
  //
  // Swap both sides of the equation,
  // log(x) = log(xRange[0]) + (pct * (log(xRange[1]) - log(xRange[0]))
  //
  // Use both sides as the exponent in 10^exp and we're done.
  // x = 10 ^ (log(xRange[0]) + (pct * (log(xRange[1]) - log(xRange[0])))

  var logr0 = log10(r0);
  var logr1 = log10(r1);
  var exponent = logr0 + pct * (logr1 - logr0);
  var value = Math.pow(LOG_SCALE, exponent);
  return value;
};

exports.logRangeFraction = logRangeFraction;
/** A dotted line stroke pattern. */
var DOTTED_LINE = [2, 2];
exports.DOTTED_LINE = DOTTED_LINE;
/** A dashed line stroke pattern. */
var DASHED_LINE = [7, 3];
exports.DASHED_LINE = DASHED_LINE;
/** A dot dash stroke pattern. */
var DOT_DASH_LINE = [7, 2, 2, 2];

exports.DOT_DASH_LINE = DOT_DASH_LINE;
// Directions for panning and zooming. Use bit operations when combined
// values are possible.
var HORIZONTAL = 1;
exports.HORIZONTAL = HORIZONTAL;
var VERTICAL = 2;

exports.VERTICAL = VERTICAL;
/**
 * Return the 2d context for a dygraph canvas.
 *
 * This method is only exposed for the sake of replacing the function in
 * automated tests.
 *
 * @param {!HTMLCanvasElement} canvas
 * @return {!CanvasRenderingContext2D}
 * @private
 */
var getContext = function getContext(canvas) {
  return (/** @type{!CanvasRenderingContext2D}*/canvas.getContext("2d")
  );
};

exports.getContext = getContext;
/**
 * Add an event handler.
 * @param {!Node} elem The element to add the event to.
 * @param {string} type The type of the event, e.g. 'click' or 'mousemove'.
 * @param {function(Event):(boolean|undefined)} fn The function to call
 *     on the event. The function takes one parameter: the event object.
 * @private
 */
var addEvent = function addEvent(elem, type, fn) {
  elem.addEventListener(type, fn, false);
};

exports.addEvent = addEvent;
/**
 * Remove an event handler.
 * @param {!Node} elem The element to remove the event from.
 * @param {string} type The type of the event, e.g. 'click' or 'mousemove'.
 * @param {function(Event):(boolean|undefined)} fn The function to call
 *     on the event. The function takes one parameter: the event object.
 */

function removeEvent(elem, type, fn) {
  elem.removeEventListener(type, fn, false);
}

;

/**
 * Cancels further processing of an event. This is useful to prevent default
 * browser actions, e.g. highlighting text on a double-click.
 * Based on the article at
 * http://www.switchonthecode.com/tutorials/javascript-tutorial-the-scroll-wheel
 * @param {!Event} e The event whose normal behavior should be canceled.
 * @private
 */

function cancelEvent(e) {
  e = e ? e : window.event;
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.cancelBubble = true;
  e.cancel = true;
  e.returnValue = false;
  return false;
}

;

/**
 * Convert hsv values to an rgb(r,g,b) string. Taken from MochiKit.Color. This
 * is used to generate default series colors which are evenly spaced on the
 * color wheel.
 * @param { number } hue Range is 0.0-1.0.
 * @param { number } saturation Range is 0.0-1.0.
 * @param { number } value Range is 0.0-1.0.
 * @return { string } "rgb(r,g,b)" where r, g and b range from 0-255.
 * @private
 */

function hsvToRGB(hue, saturation, value) {
  var red;
  var green;
  var blue;
  if (saturation === 0) {
    red = value;
    green = value;
    blue = value;
  } else {
    var i = Math.floor(hue * 6);
    var f = hue * 6 - i;
    var p = value * (1 - saturation);
    var q = value * (1 - saturation * f);
    var t = value * (1 - saturation * (1 - f));
    switch (i) {
      case 1:
        red = q;green = value;blue = p;break;
      case 2:
        red = p;green = value;blue = t;break;
      case 3:
        red = p;green = q;blue = value;break;
      case 4:
        red = t;green = p;blue = value;break;
      case 5:
        red = value;green = p;blue = q;break;
      case 6: // fall through
      case 0:
        red = value;green = t;blue = p;break;
    }
  }
  red = Math.floor(255 * red + 0.5);
  green = Math.floor(255 * green + 0.5);
  blue = Math.floor(255 * blue + 0.5);
  return 'rgb(' + red + ',' + green + ',' + blue + ')';
}

;

/**
 * Find the coordinates of an object relative to the top left of the page.
 *
 * @param {Node} obj
 * @return {{x:number,y:number}}
 * @private
 */

function findPos(obj) {
  var p = obj.getBoundingClientRect(),
      w = window,
      d = document.documentElement;

  return {
    x: p.left + (w.pageXOffset || d.scrollLeft),
    y: p.top + (w.pageYOffset || d.scrollTop)
  };
}

;

/**
 * Returns the x-coordinate of the event in a coordinate system where the
 * top-left corner of the page (not the window) is (0,0).
 * Taken from MochiKit.Signal
 * @param {!Event} e
 * @return {number}
 * @private
 */

function pageX(e) {
  return !e.pageX || e.pageX < 0 ? 0 : e.pageX;
}

;

/**
 * Returns the y-coordinate of the event in a coordinate system where the
 * top-left corner of the page (not the window) is (0,0).
 * Taken from MochiKit.Signal
 * @param {!Event} e
 * @return {number}
 * @private
 */

function pageY(e) {
  return !e.pageY || e.pageY < 0 ? 0 : e.pageY;
}

;

/**
 * Converts page the x-coordinate of the event to pixel x-coordinates on the
 * canvas (i.e. DOM Coords).
 * @param {!Event} e Drag event.
 * @param {!DygraphInteractionContext} context Interaction context object.
 * @return {number} The amount by which the drag has moved to the right.
 */

function dragGetX_(e, context) {
  return pageX(e) - context.px;
}

;

/**
 * Converts page the y-coordinate of the event to pixel y-coordinates on the
 * canvas (i.e. DOM Coords).
 * @param {!Event} e Drag event.
 * @param {!DygraphInteractionContext} context Interaction context object.
 * @return {number} The amount by which the drag has moved down.
 */

function dragGetY_(e, context) {
  return pageY(e) - context.py;
}

;

/**
 * This returns true unless the parameter is 0, null, undefined or NaN.
 * TODO(danvk): rename this function to something like 'isNonZeroNan'.
 *
 * @param {number} x The number to consider.
 * @return {boolean} Whether the number is zero or NaN.
 * @private
 */

function isOK(x) {
  return !!x && !isNaN(x);
}

;

/**
 * @param {{x:?number,y:?number,yval:?number}} p The point to consider, valid
 *     points are {x, y} objects
 * @param {boolean=} opt_allowNaNY Treat point with y=NaN as valid
 * @return {boolean} Whether the point has numeric x and y.
 * @private
 */

function isValidPoint(p, opt_allowNaNY) {
  if (!p) return false; // null or undefined object
  if (p.yval === null) return false; // missing point
  if (p.x === null || p.x === undefined) return false;
  if (p.y === null || p.y === undefined) return false;
  if (isNaN(p.x) || !opt_allowNaNY && isNaN(p.y)) return false;
  return true;
}

;

/**
 * Number formatting function which mimicks the behavior of %g in printf, i.e.
 * either exponential or fixed format (without trailing 0s) is used depending on
 * the length of the generated string.  The advantage of this format is that
 * there is a predictable upper bound on the resulting string length,
 * significant figures are not dropped, and normal numbers are not displayed in
 * exponential notation.
 *
 * NOTE: JavaScript's native toPrecision() is NOT a drop-in replacement for %g.
 * It creates strings which are too long for absolute values between 10^-4 and
 * 10^-6, e.g. '0.00001' instead of '1e-5'. See tests/number-format.html for
 * output examples.
 *
 * @param {number} x The number to format
 * @param {number=} opt_precision The precision to use, default 2.
 * @return {string} A string formatted like %g in printf.  The max generated
 *                  string length should be precision + 6 (e.g 1.123e+300).
 */

function floatFormat(x, opt_precision) {
  // Avoid invalid precision values; [1, 21] is the valid range.
  var p = Math.min(Math.max(1, opt_precision || 2), 21);

  // This is deceptively simple.  The actual algorithm comes from:
  //
  // Max allowed length = p + 4
  // where 4 comes from 'e+n' and '.'.
  //
  // Length of fixed format = 2 + y + p
  // where 2 comes from '0.' and y = # of leading zeroes.
  //
  // Equating the two and solving for y yields y = 2, or 0.00xxxx which is
  // 1.0e-3.
  //
  // Since the behavior of toPrecision() is identical for larger numbers, we
  // don't have to worry about the other bound.
  //
  // Finally, the argument for toExponential() is the number of trailing digits,
  // so we take off 1 for the value before the '.'.
  return Math.abs(x) < 1.0e-3 && x !== 0.0 ? x.toExponential(p - 1) : x.toPrecision(p);
}

;

/**
 * Converts '9' to '09' (useful for dates)
 * @param {number} x
 * @return {string}
 * @private
 */

function zeropad(x) {
  if (x < 10) return "0" + x;else return "" + x;
}

;

/**
 * Date accessors to get the parts of a calendar date (year, month,
 * day, hour, minute, second and millisecond) according to local time,
 * and factory method to call the Date constructor with an array of arguments.
 */
var DateAccessorsLocal = {
  getFullYear: function getFullYear(d) {
    return d.getFullYear();
  },
  getMonth: function getMonth(d) {
    return d.getMonth();
  },
  getDate: function getDate(d) {
    return d.getDate();
  },
  getHours: function getHours(d) {
    return d.getHours();
  },
  getMinutes: function getMinutes(d) {
    return d.getMinutes();
  },
  getSeconds: function getSeconds(d) {
    return d.getSeconds();
  },
  getMilliseconds: function getMilliseconds(d) {
    return d.getMilliseconds();
  },
  getDay: function getDay(d) {
    return d.getDay();
  },
  makeDate: function makeDate(y, m, d, hh, mm, ss, ms) {
    return new Date(y, m, d, hh, mm, ss, ms);
  }
};

exports.DateAccessorsLocal = DateAccessorsLocal;
/**
 * Date accessors to get the parts of a calendar date (year, month,
 * day of month, hour, minute, second and millisecond) according to UTC time,
 * and factory method to call the Date constructor with an array of arguments.
 */
var DateAccessorsUTC = {
  getFullYear: function getFullYear(d) {
    return d.getUTCFullYear();
  },
  getMonth: function getMonth(d) {
    return d.getUTCMonth();
  },
  getDate: function getDate(d) {
    return d.getUTCDate();
  },
  getHours: function getHours(d) {
    return d.getUTCHours();
  },
  getMinutes: function getMinutes(d) {
    return d.getUTCMinutes();
  },
  getSeconds: function getSeconds(d) {
    return d.getUTCSeconds();
  },
  getMilliseconds: function getMilliseconds(d) {
    return d.getUTCMilliseconds();
  },
  getDay: function getDay(d) {
    return d.getUTCDay();
  },
  makeDate: function makeDate(y, m, d, hh, mm, ss, ms) {
    return new Date(Date.UTC(y, m, d, hh, mm, ss, ms));
  }
};

exports.DateAccessorsUTC = DateAccessorsUTC;
/**
 * Return a string version of the hours, minutes and seconds portion of a date.
 * @param {number} hh The hours (from 0-23)
 * @param {number} mm The minutes (from 0-59)
 * @param {number} ss The seconds (from 0-59)
 * @return {string} A time of the form "HH:MM" or "HH:MM:SS"
 * @private
 */

function hmsString_(hh, mm, ss, ms) {
  var ret = zeropad(hh) + ":" + zeropad(mm);
  if (ss) {
    ret += ":" + zeropad(ss);
    if (ms) {
      var str = "" + ms;
      ret += "." + ('000' + str).substring(str.length);
    }
  }
  return ret;
}

;

/**
 * Convert a JS date (millis since epoch) to a formatted string.
 * @param {number} time The JavaScript time value (ms since epoch)
 * @param {boolean} utc Wether output UTC or local time
 * @return {string} A date of one of these forms:
 *     "YYYY/MM/DD", "YYYY/MM/DD HH:MM" or "YYYY/MM/DD HH:MM:SS"
 * @private
 */

function dateString_(time, utc) {
  var accessors = utc ? DateAccessorsUTC : DateAccessorsLocal;
  var date = new Date(time);
  var y = accessors.getFullYear(date);
  var m = accessors.getMonth(date);
  var d = accessors.getDate(date);
  var hh = accessors.getHours(date);
  var mm = accessors.getMinutes(date);
  var ss = accessors.getSeconds(date);
  var ms = accessors.getMilliseconds(date);
  // Get a year string:
  var year = "" + y;
  // Get a 0 padded month string
  var month = zeropad(m + 1); //months are 0-offset, sigh
  // Get a 0 padded day string
  var day = zeropad(d);
  var frac = hh * 3600 + mm * 60 + ss + 1e-3 * ms;
  var ret = year + "/" + month + "/" + day;
  if (frac) {
    ret += " " + hmsString_(hh, mm, ss, ms);
  }
  return ret;
}

;

/**
 * Round a number to the specified number of digits past the decimal point.
 * @param {number} num The number to round
 * @param {number} places The number of decimals to which to round
 * @return {number} The rounded number
 * @private
 */

function round_(num, places) {
  var shift = Math.pow(10, places);
  return Math.round(num * shift) / shift;
}

;

/**
 * Implementation of binary search over an array.
 * Currently does not work when val is outside the range of arry's values.
 * @param {number} val the value to search for
 * @param {Array.<number>} arry is the value over which to search
 * @param {number} abs If abs > 0, find the lowest entry greater than val
 *     If abs < 0, find the highest entry less than val.
 *     If abs == 0, find the entry that equals val.
 * @param {number=} low The first index in arry to consider (optional)
 * @param {number=} high The last index in arry to consider (optional)
 * @return {number} Index of the element, or -1 if it isn't found.
 * @private
 */

function binarySearch(_x, _x2, _x3, _x4, _x5) {
  var _again = true;

  _function: while (_again) {
    var val = _x,
        arry = _x2,
        abs = _x3,
        low = _x4,
        high = _x5;
    _again = false;

    if (low === null || low === undefined || high === null || high === undefined) {
      low = 0;
      high = arry.length - 1;
    }
    if (low > high) {
      return -1;
    }
    if (abs === null || abs === undefined) {
      abs = 0;
    }
    var validIndex = function validIndex(idx) {
      return idx >= 0 && idx < arry.length;
    };
    var mid = parseInt((low + high) / 2, 10);
    var element = arry[mid];
    var idx;
    if (element == val) {
      return mid;
    } else if (element > val) {
      if (abs > 0) {
        // Accept if element > val, but also if prior element < val.
        idx = mid - 1;
        if (validIndex(idx) && arry[idx] < val) {
          return mid;
        }
      }
      _x = val;
      _x2 = arry;
      _x3 = abs;
      _x4 = low;
      _x5 = mid - 1;
      _again = true;
      validIndex = mid = element = idx = undefined;
      continue _function;
    } else if (element < val) {
      if (abs < 0) {
        // Accept if element < val, but also if prior element > val.
        idx = mid + 1;
        if (validIndex(idx) && arry[idx] > val) {
          return mid;
        }
      }
      _x = val;
      _x2 = arry;
      _x3 = abs;
      _x4 = mid + 1;
      _x5 = high;
      _again = true;
      validIndex = mid = element = idx = undefined;
      continue _function;
    }
    return -1; // can't actually happen, but makes closure compiler happy
  }
}

;

/**
 * Parses a date, returning the number of milliseconds since epoch. This can be
 * passed in as an xValueParser in the Dygraph constructor.
 * TODO(danvk): enumerate formats that this understands.
 *
 * @param {string} dateStr A date in a variety of possible string formats.
 * @return {number} Milliseconds since epoch.
 * @private
 */

function dateParser(dateStr) {
  var dateStrSlashed;
  var d;

  // Let the system try the format first, with one caveat:
  // YYYY-MM-DD[ HH:MM:SS] is interpreted as UTC by a variety of browsers.
  // dygraphs displays dates in local time, so this will result in surprising
  // inconsistencies. But if you specify "T" or "Z" (i.e. YYYY-MM-DDTHH:MM:SS),
  // then you probably know what you're doing, so we'll let you go ahead.
  // Issue: http://code.google.com/p/dygraphs/issues/detail?id=255
  if (dateStr.search("-") == -1 || dateStr.search("T") != -1 || dateStr.search("Z") != -1) {
    d = dateStrToMillis(dateStr);
    if (d && !isNaN(d)) return d;
  }

  if (dateStr.search("-") != -1) {
    // e.g. '2009-7-12' or '2009-07-12'
    dateStrSlashed = dateStr.replace("-", "/", "g");
    while (dateStrSlashed.search("-") != -1) {
      dateStrSlashed = dateStrSlashed.replace("-", "/");
    }
    d = dateStrToMillis(dateStrSlashed);
  } else if (dateStr.length == 8) {
    // e.g. '20090712'
    // TODO(danvk): remove support for this format. It's confusing.
    dateStrSlashed = dateStr.substr(0, 4) + "/" + dateStr.substr(4, 2) + "/" + dateStr.substr(6, 2);
    d = dateStrToMillis(dateStrSlashed);
  } else {
    // Any format that Date.parse will accept, e.g. "2009/07/12" or
    // "2009/07/12 12:34:56"
    d = dateStrToMillis(dateStr);
  }

  if (!d || isNaN(d)) {
    console.error("Couldn't parse " + dateStr + " as a date");
  }
  return d;
}

;

/**
 * This is identical to JavaScript's built-in Date.parse() method, except that
 * it doesn't get replaced with an incompatible method by aggressive JS
 * libraries like MooTools or Joomla.
 * @param {string} str The date string, e.g. "2011/05/06"
 * @return {number} millis since epoch
 * @private
 */

function dateStrToMillis(str) {
  return new Date(str).getTime();
}

;

// These functions are all based on MochiKit.
/**
 * Copies all the properties from o to self.
 *
 * @param {!Object} self
 * @param {!Object} o
 * @return {!Object}
 */

function update(self, o) {
  if (typeof o != 'undefined' && o !== null) {
    for (var k in o) {
      if (o.hasOwnProperty(k)) {
        self[k] = o[k];
      }
    }
  }
  return self;
}

;

/**
 * Copies all the properties from o to self.
 *
 * @param {!Object} self
 * @param {!Object} o
 * @return {!Object}
 * @private
 */

function updateDeep(self, o) {
  // Taken from http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
  function isNode(o) {
    return typeof Node === "object" ? o instanceof Node : typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string";
  }

  if (typeof o != 'undefined' && o !== null) {
    for (var k in o) {
      if (o.hasOwnProperty(k)) {
        if (o[k] === null) {
          self[k] = null;
        } else if (isArrayLike(o[k])) {
          self[k] = o[k].slice();
        } else if (isNode(o[k])) {
          // DOM objects are shallowly-copied.
          self[k] = o[k];
        } else if (typeof o[k] == 'object') {
          if (typeof self[k] != 'object' || self[k] === null) {
            self[k] = {};
          }
          updateDeep(self[k], o[k]);
        } else {
          self[k] = o[k];
        }
      }
    }
  }
  return self;
}

;

/**
 * @param {*} o
 * @return {boolean}
 * @private
 */

function isArrayLike(o) {
  var typ = typeof o;
  if (typ != 'object' && !(typ == 'function' && typeof o.item == 'function') || o === null || typeof o.length != 'number' || o.nodeType === 3) {
    return false;
  }
  return true;
}

;

/**
 * @param {Object} o
 * @return {boolean}
 * @private
 */

function isDateLike(o) {
  if (typeof o != "object" || o === null || typeof o.getTime != 'function') {
    return false;
  }
  return true;
}

;

/**
 * Note: this only seems to work for arrays.
 * @param {!Array} o
 * @return {!Array}
 * @private
 */

function clone(o) {
  // TODO(danvk): figure out how MochiKit's version works
  var r = [];
  for (var i = 0; i < o.length; i++) {
    if (isArrayLike(o[i])) {
      r.push(clone(o[i]));
    } else {
      r.push(o[i]);
    }
  }
  return r;
}

;

/**
 * Create a new canvas element.
 *
 * @return {!HTMLCanvasElement}
 * @private
 */

function createCanvas() {
  return document.createElement('canvas');
}

;

/**
 * Returns the context's pixel ratio, which is the ratio between the device
 * pixel ratio and the backing store ratio. Typically this is 1 for conventional
 * displays, and > 1 for HiDPI displays (such as the Retina MBP).
 * See http://www.html5rocks.com/en/tutorials/canvas/hidpi/ for more details.
 *
 * @param {!CanvasRenderingContext2D} context The canvas's 2d context.
 * @return {number} The ratio of the device pixel ratio and the backing store
 * ratio for the specified context.
 */

function getContextPixelRatio(context) {
  try {
    var devicePixelRatio = window.devicePixelRatio;
    var backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
    if (devicePixelRatio !== undefined) {
      return devicePixelRatio / backingStoreRatio;
    } else {
      // At least devicePixelRatio must be defined for this ratio to make sense.
      // We default backingStoreRatio to 1: this does not exist on some browsers
      // (i.e. desktop Chrome).
      return 1;
    }
  } catch (e) {
    return 1;
  }
}

;

/**
 * TODO(danvk): use @template here when it's better supported for classes.
 * @param {!Array} array
 * @param {number} start
 * @param {number} length
 * @param {function(!Array,?):boolean=} predicate
 * @constructor
 */

function Iterator(array, start, length, predicate) {
  start = start || 0;
  length = length || array.length;
  this.hasNext = true; // Use to identify if there's another element.
  this.peek = null; // Use for look-ahead
  this.start_ = start;
  this.array_ = array;
  this.predicate_ = predicate;
  this.end_ = Math.min(array.length, start + length);
  this.nextIdx_ = start - 1; // use -1 so initial advance works.
  this.next(); // ignoring result.
}

;

/**
 * @return {Object}
 */
Iterator.prototype.next = function () {
  if (!this.hasNext) {
    return null;
  }
  var obj = this.peek;

  var nextIdx = this.nextIdx_ + 1;
  var found = false;
  while (nextIdx < this.end_) {
    if (!this.predicate_ || this.predicate_(this.array_, nextIdx)) {
      this.peek = this.array_[nextIdx];
      found = true;
      break;
    }
    nextIdx++;
  }
  this.nextIdx_ = nextIdx;
  if (!found) {
    this.hasNext = false;
    this.peek = null;
  }
  return obj;
};

/**
 * Returns a new iterator over array, between indexes start and
 * start + length, and only returns entries that pass the accept function
 *
 * @param {!Array} array the array to iterate over.
 * @param {number} start the first index to iterate over, 0 if absent.
 * @param {number} length the number of elements in the array to iterate over.
 *     This, along with start, defines a slice of the array, and so length
 *     doesn't imply the number of elements in the iterator when accept doesn't
 *     always accept all values. array.length when absent.
 * @param {function(?):boolean=} opt_predicate a function that takes
 *     parameters array and idx, which returns true when the element should be
 *     returned.  If omitted, all elements are accepted.
 * @private
 */

function createIterator(array, start, length, opt_predicate) {
  return new Iterator(array, start, length, opt_predicate);
}

;

// Shim layer with setTimeout fallback.
// From: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// Should be called with the window context:
//   Dygraph.requestAnimFrame.call(window, function() {})
var requestAnimFrame = (function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

exports.requestAnimFrame = requestAnimFrame;
/**
 * Call a function at most maxFrames times at an attempted interval of
 * framePeriodInMillis, then call a cleanup function once. repeatFn is called
 * once immediately, then at most (maxFrames - 1) times asynchronously. If
 * maxFrames==1, then cleanup_fn() is also called synchronously.  This function
 * is used to sequence animation.
 * @param {function(number)} repeatFn Called repeatedly -- takes the frame
 *     number (from 0 to maxFrames-1) as an argument.
 * @param {number} maxFrames The max number of times to call repeatFn
 * @param {number} framePeriodInMillis Max requested time between frames.
 * @param {function()} cleanupFn A function to call after all repeatFn calls.
 * @private
 */

function repeatAndCleanup(repeatFn, maxFrames, framePeriodInMillis, cleanupFn) {
  var frameNumber = 0;
  var previousFrameNumber;
  var startTime = new Date().getTime();
  repeatFn(frameNumber);
  if (maxFrames == 1) {
    cleanupFn();
    return;
  }
  var maxFrameArg = maxFrames - 1;

  (function loop() {
    if (frameNumber >= maxFrames) return;
    requestAnimFrame.call(window, function () {
      // Determine which frame to draw based on the delay so far.  Will skip
      // frames if necessary.
      var currentTime = new Date().getTime();
      var delayInMillis = currentTime - startTime;
      previousFrameNumber = frameNumber;
      frameNumber = Math.floor(delayInMillis / framePeriodInMillis);
      var frameDelta = frameNumber - previousFrameNumber;
      // If we predict that the subsequent repeatFn call will overshoot our
      // total frame target, so our last call will cause a stutter, then jump to
      // the last call immediately.  If we're going to cause a stutter, better
      // to do it faster than slower.
      var predictOvershootStutter = frameNumber + frameDelta > maxFrameArg;
      if (predictOvershootStutter || frameNumber >= maxFrameArg) {
        repeatFn(maxFrameArg); // Ensure final call with maxFrameArg.
        cleanupFn();
      } else {
        if (frameDelta !== 0) {
          // Don't call repeatFn with duplicate frames.
          repeatFn(frameNumber);
        }
        loop();
      }
    });
  })();
}

;

// A whitelist of options that do not change pixel positions.
var pixelSafeOptions = {
  'annotationClickHandler': true,
  'annotationDblClickHandler': true,
  'annotationMouseOutHandler': true,
  'annotationMouseOverHandler': true,
  'axisLineColor': true,
  'axisLineWidth': true,
  'clickCallback': true,
  'drawCallback': true,
  'drawHighlightPointCallback': true,
  'drawPoints': true,
  'drawPointCallback': true,
  'drawGrid': true,
  'fillAlpha': true,
  'gridLineColor': true,
  'gridLineWidth': true,
  'hideOverlayOnMouseOut': true,
  'highlightCallback': true,
  'highlightCircleSize': true,
  'interactionModel': true,
  'labelsDiv': true,
  'labelsKMB': true,
  'labelsKMG2': true,
  'labelsSeparateLines': true,
  'labelsShowZeroValues': true,
  'legend': true,
  'panEdgeFraction': true,
  'pixelsPerYLabel': true,
  'pointClickCallback': true,
  'pointSize': true,
  'rangeSelectorPlotFillColor': true,
  'rangeSelectorPlotFillGradientColor': true,
  'rangeSelectorPlotStrokeColor': true,
  'rangeSelectorBackgroundStrokeColor': true,
  'rangeSelectorBackgroundLineWidth': true,
  'rangeSelectorPlotLineWidth': true,
  'rangeSelectorForegroundStrokeColor': true,
  'rangeSelectorForegroundLineWidth': true,
  'rangeSelectorAlpha': true,
  'showLabelsOnHighlight': true,
  'showRoller': true,
  'strokeWidth': true,
  'underlayCallback': true,
  'unhighlightCallback': true,
  'zoomCallback': true
};

/**
 * This function will scan the option list and determine if they
 * require us to recalculate the pixel positions of each point.
 * TODO: move this into dygraph-options.js
 * @param {!Array.<string>} labels a list of options to check.
 * @param {!Object} attrs
 * @return {boolean} true if the graph needs new points else false.
 * @private
 */

function isPixelChangingOptionList(labels, attrs) {
  // Assume that we do not require new points.
  // This will change to true if we actually do need new points.

  // Create a dictionary of series names for faster lookup.
  // If there are no labels, then the dictionary stays empty.
  var seriesNamesDictionary = {};
  if (labels) {
    for (var i = 1; i < labels.length; i++) {
      seriesNamesDictionary[labels[i]] = true;
    }
  }

  // Scan through a flat (i.e. non-nested) object of options.
  // Returns true/false depending on whether new points are needed.
  var scanFlatOptions = function scanFlatOptions(options) {
    for (var property in options) {
      if (options.hasOwnProperty(property) && !pixelSafeOptions[property]) {
        return true;
      }
    }
    return false;
  };

  // Iterate through the list of updated options.
  for (var property in attrs) {
    if (!attrs.hasOwnProperty(property)) continue;

    // Find out of this field is actually a series specific options list.
    if (property == 'highlightSeriesOpts' || seriesNamesDictionary[property] && !attrs.series) {
      // This property value is a list of options for this series.
      if (scanFlatOptions(attrs[property])) return true;
    } else if (property == 'series' || property == 'axes') {
      // This is twice-nested options list.
      var perSeries = attrs[property];
      for (var series in perSeries) {
        if (perSeries.hasOwnProperty(series) && scanFlatOptions(perSeries[series])) {
          return true;
        }
      }
    } else {
      // If this was not a series specific option list, check if it's a pixel
      // changing property.
      if (!pixelSafeOptions[property]) return true;
    }
  }

  return false;
}

;

var Circles = {
  DEFAULT: function DEFAULT(g, name, ctx, canvasx, canvasy, color, radius) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(canvasx, canvasy, radius, 0, 2 * Math.PI, false);
    ctx.fill();
  }
  // For more shapes, include extras/shapes.js
};

exports.Circles = Circles;
/**
 * Determine whether |data| is delimited by CR, CRLF, LF, LFCR.
 * @param {string} data
 * @return {?string} the delimiter that was detected (or null on failure).
 */

function detectLineDelimiter(data) {
  for (var i = 0; i < data.length; i++) {
    var code = data.charAt(i);
    if (code === '\r') {
      // Might actually be "\r\n".
      if (i + 1 < data.length && data.charAt(i + 1) === '\n') {
        return '\r\n';
      }
      return code;
    }
    if (code === '\n') {
      // Might actually be "\n\r".
      if (i + 1 < data.length && data.charAt(i + 1) === '\r') {
        return '\n\r';
      }
      return code;
    }
  }

  return null;
}

;

/**
 * Is one node contained by another?
 * @param {Node} containee The contained node.
 * @param {Node} container The container node.
 * @return {boolean} Whether containee is inside (or equal to) container.
 * @private
 */

function isNodeContainedBy(containee, container) {
  if (container === null || containee === null) {
    return false;
  }
  var containeeNode = /** @type {Node} */containee;
  while (containeeNode && containeeNode !== container) {
    containeeNode = containeeNode.parentNode;
  }
  return containeeNode === container;
}

;

// This masks some numeric issues in older versions of Firefox,
// where 1.0/Math.pow(10,2) != Math.pow(10,-2).
/** @type {function(number,number):number} */

function pow(base, exp) {
  if (exp < 0) {
    return 1.0 / Math.pow(base, -exp);
  }
  return Math.pow(base, exp);
}

;

var RGBA_RE = /^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*([01](?:\.\d+)?))?\)$/;

/**
 * Helper for toRGB_ which parses strings of the form:
 * rgb(123, 45, 67)
 * rgba(123, 45, 67, 0.5)
 * @return parsed {r,g,b,a?} tuple or null.
 */
function parseRGBA(rgbStr) {
  var bits = RGBA_RE.exec(rgbStr);
  if (!bits) return null;
  var r = parseInt(bits[1], 10),
      g = parseInt(bits[2], 10),
      b = parseInt(bits[3], 10);
  if (bits[4]) {
    return { r: r, g: g, b: b, a: parseFloat(bits[4]) };
  } else {
    return { r: r, g: g, b: b };
  }
}

/**
 * Converts any valid CSS color (hex, rgb(), named color) to an RGB tuple.
 *
 * @param {!string} colorStr Any valid CSS color string.
 * @return {{r:number,g:number,b:number,a:number?}} Parsed RGB tuple.
 * @private
 */

function toRGB_(colorStr) {
  // Strategy: First try to parse colorStr directly. This is fast & avoids DOM
  // manipulation.  If that fails (e.g. for named colors like 'red'), then
  // create a hidden DOM element and parse its computed color.
  var rgb = parseRGBA(colorStr);
  if (rgb) return rgb;

  var div = document.createElement('div');
  div.style.backgroundColor = colorStr;
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  var rgbStr = window.getComputedStyle(div, null).backgroundColor;
  document.body.removeChild(div);
  return parseRGBA(rgbStr);
}

;

/**
 * Checks whether the browser supports the &lt;canvas&gt; tag.
 * @param {HTMLCanvasElement=} opt_canvasElement Pass a canvas element as an
 *     optimization if you have one.
 * @return {boolean} Whether the browser supports canvas.
 */

function isCanvasSupported(opt_canvasElement) {
  try {
    var canvas = opt_canvasElement || document.createElement("canvas");
    canvas.getContext("2d");
  } catch (e) {
    return false;
  }
  return true;
}

;

/**
 * Parses the value as a floating point number. This is like the parseFloat()
 * built-in, but with a few differences:
 * - the empty string is parsed as null, rather than NaN.
 * - if the string cannot be parsed at all, an error is logged.
 * If the string can't be parsed, this method returns null.
 * @param {string} x The string to be parsed
 * @param {number=} opt_line_no The line number from which the string comes.
 * @param {string=} opt_line The text of the line from which the string comes.
 */

function parseFloat_(x, opt_line_no, opt_line) {
  var val = parseFloat(x);
  if (!isNaN(val)) return val;

  // Try to figure out what happeend.
  // If the value is the empty string, parse it as null.
  if (/^ *$/.test(x)) return null;

  // If it was actually "NaN", return it as NaN.
  if (/^ *nan *$/i.test(x)) return NaN;

  // Looks like a parsing error.
  var msg = "Unable to parse '" + x + "' as a number";
  if (opt_line !== undefined && opt_line_no !== undefined) {
    msg += " on line " + (1 + (opt_line_no || 0)) + " ('" + opt_line + "') of CSV.";
  }
  console.error(msg);

  return null;
}

;

// Label constants for the labelsKMB and labelsKMG2 options.
// (i.e. '100000' -> '100K')
var KMB_LABELS = ['K', 'M', 'B', 'T', 'Q'];
var KMG2_BIG_LABELS = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
var KMG2_SMALL_LABELS = ['m', 'u', 'n', 'p', 'f', 'a', 'z', 'y'];

/**
 * @private
 * Return a string version of a number. This respects the digitsAfterDecimal
 * and maxNumberWidth options.
 * @param {number} x The number to be formatted
 * @param {Dygraph} opts An options view
 */

function numberValueFormatter(x, opts) {
  var sigFigs = opts('sigFigs');

  if (sigFigs !== null) {
    // User has opted for a fixed number of significant figures.
    return floatFormat(x, sigFigs);
  }

  var digits = opts('digitsAfterDecimal');
  var maxNumberWidth = opts('maxNumberWidth');

  var kmb = opts('labelsKMB');
  var kmg2 = opts('labelsKMG2');

  var label;

  // switch to scientific notation if we underflow or overflow fixed display.
  if (x !== 0.0 && (Math.abs(x) >= Math.pow(10, maxNumberWidth) || Math.abs(x) < Math.pow(10, -digits))) {
    label = x.toExponential(digits);
  } else {
    label = '' + round_(x, digits);
  }

  if (kmb || kmg2) {
    var k;
    var k_labels = [];
    var m_labels = [];
    if (kmb) {
      k = 1000;
      k_labels = KMB_LABELS;
    }
    if (kmg2) {
      if (kmb) console.warn("Setting both labelsKMB and labelsKMG2. Pick one!");
      k = 1024;
      k_labels = KMG2_BIG_LABELS;
      m_labels = KMG2_SMALL_LABELS;
    }

    var absx = Math.abs(x);
    var n = pow(k, k_labels.length);
    for (var j = k_labels.length - 1; j >= 0; j--, n /= k) {
      if (absx >= n) {
        label = round_(x / n, digits) + k_labels[j];
        break;
      }
    }
    if (kmg2) {
      // TODO(danvk): clean up this logic. Why so different than kmb?
      var x_parts = String(x.toExponential()).split('e-');
      if (x_parts.length === 2 && x_parts[1] >= 3 && x_parts[1] <= 24) {
        if (x_parts[1] % 3 > 0) {
          label = round_(x_parts[0] / pow(10, x_parts[1] % 3), digits);
        } else {
          label = Number(x_parts[0]).toFixed(2);
        }
        label += m_labels[Math.floor(x_parts[1] / 3) - 1];
      }
    }
  }

  return label;
}

;

/**
 * variant for use as an axisLabelFormatter.
 * @private
 */

function numberAxisLabelFormatter(x, granularity, opts) {
  return numberValueFormatter.call(this, x, opts);
}

;

/**
 * @type {!Array.<string>}
 * @private
 * @constant
 */
var SHORT_MONTH_NAMES_ = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Convert a JS date to a string appropriate to display on an axis that
 * is displaying values at the stated granularity. This respects the
 * labelsUTC option.
 * @param {Date} date The date to format
 * @param {number} granularity One of the Dygraph granularity constants
 * @param {Dygraph} opts An options view
 * @return {string} The date formatted as local time
 * @private
 */

function dateAxisLabelFormatter(date, granularity, opts) {
  var utc = opts('labelsUTC');
  var accessors = utc ? DateAccessorsUTC : DateAccessorsLocal;

  var year = accessors.getFullYear(date),
      month = accessors.getMonth(date),
      day = accessors.getDate(date),
      hours = accessors.getHours(date),
      mins = accessors.getMinutes(date),
      secs = accessors.getSeconds(date),
      millis = accessors.getMilliseconds(date);

  if (granularity >= DygraphTickers.Granularity.DECADAL) {
    return '' + year;
  } else if (granularity >= DygraphTickers.Granularity.MONTHLY) {
    return SHORT_MONTH_NAMES_[month] + '&#160;' + year;
  } else {
    var frac = hours * 3600 + mins * 60 + secs + 1e-3 * millis;
    if (frac === 0 || granularity >= DygraphTickers.Granularity.DAILY) {
      // e.g. '21 Jan' (%d%b)
      return zeropad(day) + '&#160;' + SHORT_MONTH_NAMES_[month];
    } else {
      return hmsString_(hours, mins, secs, millis);
    }
  }
}

;
// alias in case anyone is referencing the old method.
// Dygraph.dateAxisFormatter = Dygraph.dateAxisLabelFormatter;

/**
 * Return a string version of a JS date for a value label. This respects the
 * labelsUTC option.
 * @param {Date} date The date to be formatted
 * @param {Dygraph} opts An options view
 * @private
 */

function dateValueFormatter(d, opts) {
  return dateString_(d, opts('labelsUTC'));
}

;

},{"./dygraph-tickers":16}],18:[function(require,module,exports){
(function (process){
/**
 * @license
 * Copyright 2006 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */ /**
 * @fileoverview Creates an interactive, zoomable graph based on a CSV file or
 * string. Dygraph can handle multiple series with or without error bars. The
 * date/value ranges will be automatically set. Dygraph uses the
 * &lt;canvas&gt; tag, so it only works in FF1.5+.
 * @author danvdk@gmail.com (Dan Vanderkam)

  Usage:
   <div id="graphdiv" style="width:800px; height:500px;"></div>
   <script type="text/javascript">
     new Dygraph(document.getElementById("graphdiv"),
                 "datafile.csv",  // CSV file with headers
                 { }); // options
   </script>

 The CSV file is of the form

   Date,SeriesA,SeriesB,SeriesC
   YYYYMMDD,A1,B1,C1
   YYYYMMDD,A2,B2,C2

 If the 'errorBars' option is set in the constructor, the input should be of
 the form
   Date,SeriesA,SeriesB,...
   YYYYMMDD,A1,sigmaA1,B1,sigmaB1,...
   YYYYMMDD,A2,sigmaA2,B2,sigmaB2,...

 If the 'fractions' option is set, the input should be of the form:

   Date,SeriesA,SeriesB,...
   YYYYMMDD,A1/B1,A2/B2,...
   YYYYMMDD,A1/B1,A2/B2,...

 And error bars will be calculated automatically using a binomial distribution.

 For further documentation and examples, see http://dygraphs.com/
 */'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _slicedToArray=(function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n = (_s = _i.next()).done);_n = true) {_arr.push(_s.value);if(i && _arr.length === i)break;}}catch(err) {_d = true;_e = err;}finally {try{if(!_n && _i['return'])_i['return']();}finally {if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i);}else {throw new TypeError('Invalid attempt to destructure non-iterable instance');}};})();function _interopRequireWildcard(obj){if(obj && obj.__esModule){return obj;}else {var newObj={};if(obj != null){for(var key in obj) {if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key] = obj[key];}}newObj['default'] = obj;return newObj;}}function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}var _dygraphLayout=require('./dygraph-layout');var _dygraphLayout2=_interopRequireDefault(_dygraphLayout);var _dygraphCanvas=require('./dygraph-canvas');var _dygraphCanvas2=_interopRequireDefault(_dygraphCanvas);var _dygraphOptions=require('./dygraph-options');var _dygraphOptions2=_interopRequireDefault(_dygraphOptions);var _dygraphInteractionModel=require('./dygraph-interaction-model');var _dygraphInteractionModel2=_interopRequireDefault(_dygraphInteractionModel);var _dygraphTickers=require('./dygraph-tickers');var DygraphTickers=_interopRequireWildcard(_dygraphTickers);var _dygraphUtils=require('./dygraph-utils');var utils=_interopRequireWildcard(_dygraphUtils);var _dygraphDefaultAttrs=require('./dygraph-default-attrs');var _dygraphDefaultAttrs2=_interopRequireDefault(_dygraphDefaultAttrs);var _dygraphOptionsReference=require('./dygraph-options-reference');var _dygraphOptionsReference2=_interopRequireDefault(_dygraphOptionsReference);var _iframeTarp=require('./iframe-tarp');var _iframeTarp2=_interopRequireDefault(_iframeTarp);var _datahandlerDefault=require('./datahandler/default');var _datahandlerDefault2=_interopRequireDefault(_datahandlerDefault);var _datahandlerBarsError=require('./datahandler/bars-error');var _datahandlerBarsError2=_interopRequireDefault(_datahandlerBarsError);var _datahandlerBarsCustom=require('./datahandler/bars-custom');var _datahandlerBarsCustom2=_interopRequireDefault(_datahandlerBarsCustom);var _datahandlerDefaultFractions=require('./datahandler/default-fractions');var _datahandlerDefaultFractions2=_interopRequireDefault(_datahandlerDefaultFractions);var _datahandlerBarsFractions=require('./datahandler/bars-fractions');var _datahandlerBarsFractions2=_interopRequireDefault(_datahandlerBarsFractions);var _datahandlerBars=require('./datahandler/bars');var _datahandlerBars2=_interopRequireDefault(_datahandlerBars);var _pluginsAnnotations=require('./plugins/annotations');var _pluginsAnnotations2=_interopRequireDefault(_pluginsAnnotations);var _pluginsAxes=require('./plugins/axes');var _pluginsAxes2=_interopRequireDefault(_pluginsAxes);var _pluginsChartLabels=require('./plugins/chart-labels');var _pluginsChartLabels2=_interopRequireDefault(_pluginsChartLabels);var _pluginsGrid=require('./plugins/grid');var _pluginsGrid2=_interopRequireDefault(_pluginsGrid);var _pluginsLegend=require('./plugins/legend');var _pluginsLegend2=_interopRequireDefault(_pluginsLegend);var _pluginsRangeSelector=require('./plugins/range-selector');var _pluginsRangeSelector2=_interopRequireDefault(_pluginsRangeSelector);var _dygraphGviz=require('./dygraph-gviz');var _dygraphGviz2=_interopRequireDefault(_dygraphGviz);"use strict"; /**
 * Creates an interactive, zoomable chart.
 *
 * @constructor
 * @param {div | String} div A div or the id of a div into which to construct
 * the chart.
 * @param {String | Function} file A file containing CSV data or a function
 * that returns this data. The most basic expected format for each line is
 * "YYYY/MM/DD,val1,val2,...". For more information, see
 * http://dygraphs.com/data.html.
 * @param {Object} attrs Various other attributes, e.g. errorBars determines
 * whether the input data contains error ranges. For a complete list of
 * options, see http://dygraphs.com/options.html.
 */var Dygraph=function Dygraph(div,data,opts){this.__init__(div,data,opts);};Dygraph.NAME = "Dygraph";Dygraph.VERSION = "2.0.0"; // Various default values
Dygraph.DEFAULT_ROLL_PERIOD = 1;Dygraph.DEFAULT_WIDTH = 480;Dygraph.DEFAULT_HEIGHT = 320; // For max 60 Hz. animation:
Dygraph.ANIMATION_STEPS = 12;Dygraph.ANIMATION_DURATION = 200; /**
 * Standard plotters. These may be used by clients.
 * Available plotters are:
 * - Dygraph.Plotters.linePlotter: draws central lines (most common)
 * - Dygraph.Plotters.errorPlotter: draws error bars
 * - Dygraph.Plotters.fillPlotter: draws fills under lines (used with fillGraph)
 *
 * By default, the plotter is [fillPlotter, errorPlotter, linePlotter].
 * This causes all the lines to be drawn over all the fills/error bars.
 */Dygraph.Plotters = _dygraphCanvas2['default']._Plotters; // Used for initializing annotation CSS rules only once.
Dygraph.addedAnnotationCSS = false; /**
 * Initializes the Dygraph. This creates a new DIV and constructs the PlotKit
 * and context &lt;canvas&gt; inside of it. See the constructor for details.
 * on the parameters.
 * @param {Element} div the Element to render the graph into.
 * @param {string | Function} file Source data
 * @param {Object} attrs Miscellaneous other options
 * @private
 */Dygraph.prototype.__init__ = function(div,file,attrs){this.is_initial_draw_ = true;this.readyFns_ = []; // Support two-argument constructor
if(attrs === null || attrs === undefined){attrs = {};}attrs = Dygraph.copyUserAttrs_(attrs);if(typeof div == 'string'){div = document.getElementById(div);}if(!div){throw new Error('Constructing dygraph with a non-existent div!');} // Copy the important bits into the object
// TODO(danvk): most of these should just stay in the attrs_ dictionary.
this.maindiv_ = div;this.file_ = file;this.rollPeriod_ = attrs.rollPeriod || Dygraph.DEFAULT_ROLL_PERIOD;this.previousVerticalX_ = -1;this.fractions_ = attrs.fractions || false;this.dateWindow_ = attrs.dateWindow || null;this.annotations_ = []; // Clear the div. This ensure that, if multiple dygraphs are passed the same
// div, then only one will be drawn.
div.innerHTML = ""; // For historical reasons, the 'width' and 'height' options trump all CSS
// rules _except_ for an explicit 'width' or 'height' on the div.
// As an added convenience, if the div has zero height (like <div></div> does
// without any styles), then we use a default height/width.
if(div.style.width === '' && attrs.width){div.style.width = attrs.width + "px";}if(div.style.height === '' && attrs.height){div.style.height = attrs.height + "px";}if(div.style.height === '' && div.clientHeight === 0){div.style.height = Dygraph.DEFAULT_HEIGHT + "px";if(div.style.width === ''){div.style.width = Dygraph.DEFAULT_WIDTH + "px";}} // These will be zero if the dygraph's div is hidden. In that case,
// use the user-specified attributes if present. If not, use zero
// and assume the user will call resize to fix things later.
this.width_ = div.clientWidth || attrs.width || 0;this.height_ = div.clientHeight || attrs.height || 0; // TODO(danvk): set fillGraph to be part of attrs_ here, not user_attrs_.
if(attrs.stackedGraph){attrs.fillGraph = true; // TODO(nikhilk): Add any other stackedGraph checks here.
} // DEPRECATION WARNING: All option processing should be moved from
// attrs_ and user_attrs_ to options_, which holds all this information.
//
// Dygraphs has many options, some of which interact with one another.
// To keep track of everything, we maintain two sets of options:
//
//  this.user_attrs_   only options explicitly set by the user.
//  this.attrs_        defaults, options derived from user_attrs_, data.
//
// Options are then accessed this.attr_('attr'), which first looks at
// user_attrs_ and then computed attrs_. This way Dygraphs can set intelligent
// defaults without overriding behavior that the user specifically asks for.
this.user_attrs_ = {};utils.update(this.user_attrs_,attrs); // This sequence ensures that Dygraph.DEFAULT_ATTRS is never modified.
this.attrs_ = {};utils.updateDeep(this.attrs_,_dygraphDefaultAttrs2['default']);this.boundaryIds_ = [];this.setIndexByName_ = {};this.datasetIndex_ = [];this.registeredEvents_ = [];this.eventListeners_ = {};this.attributes_ = new _dygraphOptions2['default'](this); // Create the containing DIV and other interactive elements
this.createInterface_(); // Activate plugins.
this.plugins_ = [];var plugins=Dygraph.PLUGINS.concat(this.getOption('plugins'));for(var i=0;i < plugins.length;i++) { // the plugins option may contain either plugin classes or instances.
// Plugin instances contain an activate method.
var Plugin=plugins[i]; // either a constructor or an instance.
var pluginInstance;if(typeof Plugin.activate !== 'undefined'){pluginInstance = Plugin;}else {pluginInstance = new Plugin();}var pluginDict={plugin:pluginInstance,events:{},options:{},pluginOptions:{}};var handlers=pluginInstance.activate(this);for(var eventName in handlers) {if(!handlers.hasOwnProperty(eventName))continue; // TODO(danvk): validate eventName.
pluginDict.events[eventName] = handlers[eventName];}this.plugins_.push(pluginDict);} // At this point, plugins can no longer register event handlers.
// Construct a map from event -> ordered list of [callback, plugin].
for(var i=0;i < this.plugins_.length;i++) {var plugin_dict=this.plugins_[i];for(var eventName in plugin_dict.events) {if(!plugin_dict.events.hasOwnProperty(eventName))continue;var callback=plugin_dict.events[eventName];var pair=[plugin_dict.plugin,callback];if(!(eventName in this.eventListeners_)){this.eventListeners_[eventName] = [pair];}else {this.eventListeners_[eventName].push(pair);}}}this.createDragInterface_();this.start_();}; /**
 * Triggers a cascade of events to the various plugins which are interested in them.
 * Returns true if the "default behavior" should be prevented, i.e. if one
 * of the event listeners called event.preventDefault().
 * @private
 */Dygraph.prototype.cascadeEvents_ = function(name,extra_props){if(!(name in this.eventListeners_))return false; // QUESTION: can we use objects & prototypes to speed this up?
var e={dygraph:this,cancelable:false,defaultPrevented:false,preventDefault:function preventDefault(){if(!e.cancelable)throw "Cannot call preventDefault on non-cancelable event.";e.defaultPrevented = true;},propagationStopped:false,stopPropagation:function stopPropagation(){e.propagationStopped = true;}};utils.update(e,extra_props);var callback_plugin_pairs=this.eventListeners_[name];if(callback_plugin_pairs){for(var i=callback_plugin_pairs.length - 1;i >= 0;i--) {var plugin=callback_plugin_pairs[i][0];var callback=callback_plugin_pairs[i][1];callback.call(plugin,e);if(e.propagationStopped)break;}}return e.defaultPrevented;}; /**
 * Fetch a plugin instance of a particular class. Only for testing.
 * @private
 * @param {!Class} type The type of the plugin.
 * @return {Object} Instance of the plugin, or null if there is none.
 */Dygraph.prototype.getPluginInstance_ = function(type){for(var i=0;i < this.plugins_.length;i++) {var p=this.plugins_[i];if(p.plugin instanceof type){return p.plugin;}}return null;}; /**
 * Returns the zoomed status of the chart for one or both axes.
 *
 * Axis is an optional parameter. Can be set to 'x' or 'y'.
 *
 * The zoomed status for an axis is set whenever a user zooms using the mouse
 * or when the dateWindow or valueRange are updated. Double-clicking or calling
 * resetZoom() resets the zoom status for the chart.
 */Dygraph.prototype.isZoomed = function(axis){var isZoomedX=!!this.dateWindow_;if(axis === 'x')return isZoomedX;var isZoomedY=this.axes_.map(function(axis){return !!axis.valueRange;}).indexOf(true) >= 0;if(axis === null || axis === undefined){return isZoomedX || isZoomedY;}if(axis === 'y')return isZoomedY;throw new Error('axis parameter is [' + axis + '] must be null, \'x\' or \'y\'.');}; /**
 * Returns information about the Dygraph object, including its containing ID.
 */Dygraph.prototype.toString = function(){var maindiv=this.maindiv_;var id=maindiv && maindiv.id?maindiv.id:maindiv;return "[Dygraph " + id + "]";}; /**
 * @private
 * Returns the value of an option. This may be set by the user (either in the
 * constructor or by calling updateOptions) or by dygraphs, and may be set to a
 * per-series value.
 * @param {string} name The name of the option, e.g. 'rollPeriod'.
 * @param {string} [seriesName] The name of the series to which the option
 * will be applied. If no per-series value of this option is available, then
 * the global value is returned. This is optional.
 * @return { ... } The value of the option.
 */Dygraph.prototype.attr_ = function(name,seriesName){ // For "production" code, this gets removed by uglifyjs.
if(typeof process !== 'undefined'){if("development" != 'production'){if(typeof _dygraphOptionsReference2['default'] === 'undefined'){console.error('Must include options reference JS for testing');}else if(!_dygraphOptionsReference2['default'].hasOwnProperty(name)){console.error('Dygraphs is using property ' + name + ', which has no ' + 'entry in the Dygraphs.OPTIONS_REFERENCE listing.'); // Only log this error once.
_dygraphOptionsReference2['default'][name] = true;}}}return seriesName?this.attributes_.getForSeries(name,seriesName):this.attributes_.get(name);}; /**
 * Returns the current value for an option, as set in the constructor or via
 * updateOptions. You may pass in an (optional) series name to get per-series
 * values for the option.
 *
 * All values returned by this method should be considered immutable. If you
 * modify them, there is no guarantee that the changes will be honored or that
 * dygraphs will remain in a consistent state. If you want to modify an option,
 * use updateOptions() instead.
 *
 * @param {string} name The name of the option (e.g. 'strokeWidth')
 * @param {string=} opt_seriesName Series name to get per-series values.
 * @return {*} The value of the option.
 */Dygraph.prototype.getOption = function(name,opt_seriesName){return this.attr_(name,opt_seriesName);}; /**
 * Like getOption(), but specifically returns a number.
 * This is a convenience function for working with the Closure Compiler.
 * @param {string} name The name of the option (e.g. 'strokeWidth')
 * @param {string=} opt_seriesName Series name to get per-series values.
 * @return {number} The value of the option.
 * @private
 */Dygraph.prototype.getNumericOption = function(name,opt_seriesName){return  (/** @type{number} */this.getOption(name,opt_seriesName));}; /**
 * Like getOption(), but specifically returns a string.
 * This is a convenience function for working with the Closure Compiler.
 * @param {string} name The name of the option (e.g. 'strokeWidth')
 * @param {string=} opt_seriesName Series name to get per-series values.
 * @return {string} The value of the option.
 * @private
 */Dygraph.prototype.getStringOption = function(name,opt_seriesName){return  (/** @type{string} */this.getOption(name,opt_seriesName));}; /**
 * Like getOption(), but specifically returns a boolean.
 * This is a convenience function for working with the Closure Compiler.
 * @param {string} name The name of the option (e.g. 'strokeWidth')
 * @param {string=} opt_seriesName Series name to get per-series values.
 * @return {boolean} The value of the option.
 * @private
 */Dygraph.prototype.getBooleanOption = function(name,opt_seriesName){return  (/** @type{boolean} */this.getOption(name,opt_seriesName));}; /**
 * Like getOption(), but specifically returns a function.
 * This is a convenience function for working with the Closure Compiler.
 * @param {string} name The name of the option (e.g. 'strokeWidth')
 * @param {string=} opt_seriesName Series name to get per-series values.
 * @return {function(...)} The value of the option.
 * @private
 */Dygraph.prototype.getFunctionOption = function(name,opt_seriesName){return  (/** @type{function(...)} */this.getOption(name,opt_seriesName));};Dygraph.prototype.getOptionForAxis = function(name,axis){return this.attributes_.getForAxis(name,axis);}; /**
 * @private
 * @param {string} axis The name of the axis (i.e. 'x', 'y' or 'y2')
 * @return { ... } A function mapping string -> option value
 */Dygraph.prototype.optionsViewForAxis_ = function(axis){var self=this;return function(opt){var axis_opts=self.user_attrs_.axes;if(axis_opts && axis_opts[axis] && axis_opts[axis].hasOwnProperty(opt)){return axis_opts[axis][opt];} // I don't like that this is in a second spot.
if(axis === 'x' && opt === 'logscale'){ // return the default value.
// TODO(konigsberg): pull the default from a global default.
return false;} // user-specified attributes always trump defaults, even if they're less
// specific.
if(typeof self.user_attrs_[opt] != 'undefined'){return self.user_attrs_[opt];}axis_opts = self.attrs_.axes;if(axis_opts && axis_opts[axis] && axis_opts[axis].hasOwnProperty(opt)){return axis_opts[axis][opt];} // check old-style axis options
// TODO(danvk): add a deprecation warning if either of these match.
if(axis == 'y' && self.axes_[0].hasOwnProperty(opt)){return self.axes_[0][opt];}else if(axis == 'y2' && self.axes_[1].hasOwnProperty(opt)){return self.axes_[1][opt];}return self.attr_(opt);};}; /**
 * Returns the current rolling period, as set by the user or an option.
 * @return {number} The number of points in the rolling window
 */Dygraph.prototype.rollPeriod = function(){return this.rollPeriod_;}; /**
 * Returns the currently-visible x-range. This can be affected by zooming,
 * panning or a call to updateOptions.
 * Returns a two-element array: [left, right].
 * If the Dygraph has dates on the x-axis, these will be millis since epoch.
 */Dygraph.prototype.xAxisRange = function(){return this.dateWindow_?this.dateWindow_:this.xAxisExtremes();}; /**
 * Returns the lower- and upper-bound x-axis values of the data set.
 */Dygraph.prototype.xAxisExtremes = function(){var pad=this.getNumericOption('xRangePad') / this.plotter_.area.w;if(this.numRows() === 0){return [0 - pad,1 + pad];}var left=this.rawData_[0][0];var right=this.rawData_[this.rawData_.length - 1][0];if(pad){ // Must keep this in sync with dygraph-layout _evaluateLimits()
var range=right - left;left -= range * pad;right += range * pad;}return [left,right];}; /**
 * Returns the lower- and upper-bound y-axis values for each axis. These are
 * the ranges you'll get if you double-click to zoom out or call resetZoom().
 * The return value is an array of [low, high] tuples, one for each y-axis.
 */Dygraph.prototype.yAxisExtremes = function(){ // TODO(danvk): this is pretty inefficient
var packed=this.gatherDatasets_(this.rolledSeries_,null);var extremes=packed.extremes;var saveAxes=this.axes_;this.computeYAxisRanges_(extremes);var newAxes=this.axes_;this.axes_ = saveAxes;return newAxes.map(function(axis){return axis.extremeRange;});}; /**
 * Returns the currently-visible y-range for an axis. This can be affected by
 * zooming, panning or a call to updateOptions. Axis indices are zero-based. If
 * called with no arguments, returns the range of the first axis.
 * Returns a two-element array: [bottom, top].
 */Dygraph.prototype.yAxisRange = function(idx){if(typeof idx == "undefined")idx = 0;if(idx < 0 || idx >= this.axes_.length){return null;}var axis=this.axes_[idx];return [axis.computedValueRange[0],axis.computedValueRange[1]];}; /**
 * Returns the currently-visible y-ranges for each axis. This can be affected by
 * zooming, panning, calls to updateOptions, etc.
 * Returns an array of [bottom, top] pairs, one for each y-axis.
 */Dygraph.prototype.yAxisRanges = function(){var ret=[];for(var i=0;i < this.axes_.length;i++) {ret.push(this.yAxisRange(i));}return ret;}; // TODO(danvk): use these functions throughout dygraphs.
/**
 * Convert from data coordinates to canvas/div X/Y coordinates.
 * If specified, do this conversion for the coordinate system of a particular
 * axis. Uses the first axis by default.
 * Returns a two-element array: [X, Y]
 *
 * Note: use toDomXCoord instead of toDomCoords(x, null) and use toDomYCoord
 * instead of toDomCoords(null, y, axis).
 */Dygraph.prototype.toDomCoords = function(x,y,axis){return [this.toDomXCoord(x),this.toDomYCoord(y,axis)];}; /**
 * Convert from data x coordinates to canvas/div X coordinate.
 * If specified, do this conversion for the coordinate system of a particular
 * axis.
 * Returns a single value or null if x is null.
 */Dygraph.prototype.toDomXCoord = function(x){if(x === null){return null;}var area=this.plotter_.area;var xRange=this.xAxisRange();return area.x + (x - xRange[0]) / (xRange[1] - xRange[0]) * area.w;}; /**
 * Convert from data x coordinates to canvas/div Y coordinate and optional
 * axis. Uses the first axis by default.
 *
 * returns a single value or null if y is null.
 */Dygraph.prototype.toDomYCoord = function(y,axis){var pct=this.toPercentYCoord(y,axis);if(pct === null){return null;}var area=this.plotter_.area;return area.y + pct * area.h;}; /**
 * Convert from canvas/div coords to data coordinates.
 * If specified, do this conversion for the coordinate system of a particular
 * axis. Uses the first axis by default.
 * Returns a two-element array: [X, Y].
 *
 * Note: use toDataXCoord instead of toDataCoords(x, null) and use toDataYCoord
 * instead of toDataCoords(null, y, axis).
 */Dygraph.prototype.toDataCoords = function(x,y,axis){return [this.toDataXCoord(x),this.toDataYCoord(y,axis)];}; /**
 * Convert from canvas/div x coordinate to data coordinate.
 *
 * If x is null, this returns null.
 */Dygraph.prototype.toDataXCoord = function(x){if(x === null){return null;}var area=this.plotter_.area;var xRange=this.xAxisRange();if(!this.attributes_.getForAxis("logscale",'x')){return xRange[0] + (x - area.x) / area.w * (xRange[1] - xRange[0]);}else {var pct=(x - area.x) / area.w;return utils.logRangeFraction(xRange[0],xRange[1],pct);}}; /**
 * Convert from canvas/div y coord to value.
 *
 * If y is null, this returns null.
 * if axis is null, this uses the first axis.
 */Dygraph.prototype.toDataYCoord = function(y,axis){if(y === null){return null;}var area=this.plotter_.area;var yRange=this.yAxisRange(axis);if(typeof axis == "undefined")axis = 0;if(!this.attributes_.getForAxis("logscale",axis)){return yRange[0] + (area.y + area.h - y) / area.h * (yRange[1] - yRange[0]);}else { // Computing the inverse of toDomCoord.
var pct=(y - area.y) / area.h; // Note reversed yRange, y1 is on top with pct==0.
return utils.logRangeFraction(yRange[1],yRange[0],pct);}}; /**
 * Converts a y for an axis to a percentage from the top to the
 * bottom of the drawing area.
 *
 * If the coordinate represents a value visible on the canvas, then
 * the value will be between 0 and 1, where 0 is the top of the canvas.
 * However, this method will return values outside the range, as
 * values can fall outside the canvas.
 *
 * If y is null, this returns null.
 * if axis is null, this uses the first axis.
 *
 * @param {number} y The data y-coordinate.
 * @param {number} [axis] The axis number on which the data coordinate lives.
 * @return {number} A fraction in [0, 1] where 0 = the top edge.
 */Dygraph.prototype.toPercentYCoord = function(y,axis){if(y === null){return null;}if(typeof axis == "undefined")axis = 0;var yRange=this.yAxisRange(axis);var pct;var logscale=this.attributes_.getForAxis("logscale",axis);if(logscale){var logr0=utils.log10(yRange[0]);var logr1=utils.log10(yRange[1]);pct = (logr1 - utils.log10(y)) / (logr1 - logr0);}else { // yRange[1] - y is unit distance from the bottom.
// yRange[1] - yRange[0] is the scale of the range.
// (yRange[1] - y) / (yRange[1] - yRange[0]) is the % from the bottom.
pct = (yRange[1] - y) / (yRange[1] - yRange[0]);}return pct;}; /**
 * Converts an x value to a percentage from the left to the right of
 * the drawing area.
 *
 * If the coordinate represents a value visible on the canvas, then
 * the value will be between 0 and 1, where 0 is the left of the canvas.
 * However, this method will return values outside the range, as
 * values can fall outside the canvas.
 *
 * If x is null, this returns null.
 * @param {number} x The data x-coordinate.
 * @return {number} A fraction in [0, 1] where 0 = the left edge.
 */Dygraph.prototype.toPercentXCoord = function(x){if(x === null){return null;}var xRange=this.xAxisRange();var pct;var logscale=this.attributes_.getForAxis("logscale",'x');if(logscale === true){ // logscale can be null so we test for true explicitly.
var logr0=utils.log10(xRange[0]);var logr1=utils.log10(xRange[1]);pct = (utils.log10(x) - logr0) / (logr1 - logr0);}else { // x - xRange[0] is unit distance from the left.
// xRange[1] - xRange[0] is the scale of the range.
// The full expression below is the % from the left.
pct = (x - xRange[0]) / (xRange[1] - xRange[0]);}return pct;}; /**
 * Returns the number of columns (including the independent variable).
 * @return {number} The number of columns.
 */Dygraph.prototype.numColumns = function(){if(!this.rawData_)return 0;return this.rawData_[0]?this.rawData_[0].length:this.attr_("labels").length;}; /**
 * Returns the number of rows (excluding any header/label row).
 * @return {number} The number of rows, less any header.
 */Dygraph.prototype.numRows = function(){if(!this.rawData_)return 0;return this.rawData_.length;}; /**
 * Returns the value in the given row and column. If the row and column exceed
 * the bounds on the data, returns null. Also returns null if the value is
 * missing.
 * @param {number} row The row number of the data (0-based). Row 0 is the
 *     first row of data, not a header row.
 * @param {number} col The column number of the data (0-based)
 * @return {number} The value in the specified cell or null if the row/col
 *     were out of range.
 */Dygraph.prototype.getValue = function(row,col){if(row < 0 || row > this.rawData_.length)return null;if(col < 0 || col > this.rawData_[row].length)return null;return this.rawData_[row][col];}; /**
 * Generates interface elements for the Dygraph: a containing div, a div to
 * display the current point, and a textbox to adjust the rolling average
 * period. Also creates the Renderer/Layout elements.
 * @private
 */Dygraph.prototype.createInterface_ = function(){ // Create the all-enclosing graph div
var enclosing=this.maindiv_;this.graphDiv = document.createElement("div"); // TODO(danvk): any other styles that are useful to set here?
this.graphDiv.style.textAlign = 'left'; // This is a CSS "reset"
this.graphDiv.style.position = 'relative';enclosing.appendChild(this.graphDiv); // Create the canvas for interactive parts of the chart.
this.canvas_ = utils.createCanvas();this.canvas_.style.position = "absolute"; // ... and for static parts of the chart.
this.hidden_ = this.createPlotKitCanvas_(this.canvas_);this.canvas_ctx_ = utils.getContext(this.canvas_);this.hidden_ctx_ = utils.getContext(this.hidden_);this.resizeElements_(); // The interactive parts of the graph are drawn on top of the chart.
this.graphDiv.appendChild(this.hidden_);this.graphDiv.appendChild(this.canvas_);this.mouseEventElement_ = this.createMouseEventElement_(); // Create the grapher
this.layout_ = new _dygraphLayout2['default'](this);var dygraph=this;this.mouseMoveHandler_ = function(e){dygraph.mouseMove_(e);};this.mouseOutHandler_ = function(e){ // The mouse has left the chart if:
// 1. e.target is inside the chart
// 2. e.relatedTarget is outside the chart
var target=e.target || e.fromElement;var relatedTarget=e.relatedTarget || e.toElement;if(utils.isNodeContainedBy(target,dygraph.graphDiv) && !utils.isNodeContainedBy(relatedTarget,dygraph.graphDiv)){dygraph.mouseOut_(e);}};this.addAndTrackEvent(window,'mouseout',this.mouseOutHandler_);this.addAndTrackEvent(this.mouseEventElement_,'mousemove',this.mouseMoveHandler_); // Don't recreate and register the resize handler on subsequent calls.
// This happens when the graph is resized.
if(!this.resizeHandler_){this.resizeHandler_ = function(e){dygraph.resize();}; // Update when the window is resized.
// TODO(danvk): drop frames depending on complexity of the chart.
this.addAndTrackEvent(window,'resize',this.resizeHandler_);}};Dygraph.prototype.resizeElements_ = function(){this.graphDiv.style.width = this.width_ + "px";this.graphDiv.style.height = this.height_ + "px";var canvasScale=utils.getContextPixelRatio(this.canvas_ctx_);this.canvas_.width = this.width_ * canvasScale;this.canvas_.height = this.height_ * canvasScale;this.canvas_.style.width = this.width_ + "px"; // for IE
this.canvas_.style.height = this.height_ + "px"; // for IE
if(canvasScale !== 1){this.canvas_ctx_.scale(canvasScale,canvasScale);}var hiddenScale=utils.getContextPixelRatio(this.hidden_ctx_);this.hidden_.width = this.width_ * hiddenScale;this.hidden_.height = this.height_ * hiddenScale;this.hidden_.style.width = this.width_ + "px"; // for IE
this.hidden_.style.height = this.height_ + "px"; // for IE
if(hiddenScale !== 1){this.hidden_ctx_.scale(hiddenScale,hiddenScale);}}; /**
 * Detach DOM elements in the dygraph and null out all data references.
 * Calling this when you're done with a dygraph can dramatically reduce memory
 * usage. See, e.g., the tests/perf.html example.
 */Dygraph.prototype.destroy = function(){this.canvas_ctx_.restore();this.hidden_ctx_.restore(); // Destroy any plugins, in the reverse order that they were registered.
for(var i=this.plugins_.length - 1;i >= 0;i--) {var p=this.plugins_.pop();if(p.plugin.destroy)p.plugin.destroy();}var removeRecursive=function removeRecursive(node){while(node.hasChildNodes()) {removeRecursive(node.firstChild);node.removeChild(node.firstChild);}};this.removeTrackedEvents_(); // remove mouse event handlers (This may not be necessary anymore)
utils.removeEvent(window,'mouseout',this.mouseOutHandler_);utils.removeEvent(this.mouseEventElement_,'mousemove',this.mouseMoveHandler_); // remove window handlers
utils.removeEvent(window,'resize',this.resizeHandler_);this.resizeHandler_ = null;removeRecursive(this.maindiv_);var nullOut=function nullOut(obj){for(var n in obj) {if(typeof obj[n] === 'object'){obj[n] = null;}}}; // These may not all be necessary, but it can't hurt...
nullOut(this.layout_);nullOut(this.plotter_);nullOut(this);}; /**
 * Creates the canvas on which the chart will be drawn. Only the Renderer ever
 * draws on this particular canvas. All Dygraph work (i.e. drawing hover dots
 * or the zoom rectangles) is done on this.canvas_.
 * @param {Object} canvas The Dygraph canvas over which to overlay the plot
 * @return {Object} The newly-created canvas
 * @private
 */Dygraph.prototype.createPlotKitCanvas_ = function(canvas){var h=utils.createCanvas();h.style.position = "absolute"; // TODO(danvk): h should be offset from canvas. canvas needs to include
// some extra area to make it easier to zoom in on the far left and far
// right. h needs to be precisely the plot area, so that clipping occurs.
h.style.top = canvas.style.top;h.style.left = canvas.style.left;h.width = this.width_;h.height = this.height_;h.style.width = this.width_ + "px"; // for IE
h.style.height = this.height_ + "px"; // for IE
return h;}; /**
 * Creates an overlay element used to handle mouse events.
 * @return {Object} The mouse event element.
 * @private
 */Dygraph.prototype.createMouseEventElement_ = function(){return this.canvas_;}; /**
 * Generate a set of distinct colors for the data series. This is done with a
 * color wheel. Saturation/Value are customizable, and the hue is
 * equally-spaced around the color wheel. If a custom set of colors is
 * specified, that is used instead.
 * @private
 */Dygraph.prototype.setColors_ = function(){var labels=this.getLabels();var num=labels.length - 1;this.colors_ = [];this.colorsMap_ = {}; // These are used for when no custom colors are specified.
var sat=this.getNumericOption('colorSaturation') || 1.0;var val=this.getNumericOption('colorValue') || 0.5;var half=Math.ceil(num / 2);var colors=this.getOption('colors');var visibility=this.visibility();for(var i=0;i < num;i++) {if(!visibility[i]){continue;}var label=labels[i + 1];var colorStr=this.attributes_.getForSeries('color',label);if(!colorStr){if(colors){colorStr = colors[i % colors.length];}else { // alternate colors for high contrast.
var idx=i % 2?half + (i + 1) / 2:Math.ceil((i + 1) / 2);var hue=1.0 * idx / (1 + num);colorStr = utils.hsvToRGB(hue,sat,val);}}this.colors_.push(colorStr);this.colorsMap_[label] = colorStr;}}; /**
 * Return the list of colors. This is either the list of colors passed in the
 * attributes or the autogenerated list of rgb(r,g,b) strings.
 * This does not return colors for invisible series.
 * @return {Array.<string>} The list of colors.
 */Dygraph.prototype.getColors = function(){return this.colors_;}; /**
 * Returns a few attributes of a series, i.e. its color, its visibility, which
 * axis it's assigned to, and its column in the original data.
 * Returns null if the series does not exist.
 * Otherwise, returns an object with column, visibility, color and axis properties.
 * The "axis" property will be set to 1 for y1 and 2 for y2.
 * The "column" property can be fed back into getValue(row, column) to get
 * values for this series.
 */Dygraph.prototype.getPropertiesForSeries = function(series_name){var idx=-1;var labels=this.getLabels();for(var i=1;i < labels.length;i++) {if(labels[i] == series_name){idx = i;break;}}if(idx == -1)return null;return {name:series_name,column:idx,visible:this.visibility()[idx - 1],color:this.colorsMap_[series_name],axis:1 + this.attributes_.axisForSeries(series_name)};}; /**
 * Create the text box to adjust the averaging period
 * @private
 */Dygraph.prototype.createRollInterface_ = function(){var _this=this; // Create a roller if one doesn't exist already.
var roller=this.roller_;if(!roller){this.roller_ = roller = document.createElement("input");roller.type = "text";roller.style.display = "none";roller.className = 'dygraph-roller';this.graphDiv.appendChild(roller);}var display=this.getBooleanOption('showRoller')?'block':'none';var area=this.getArea();var textAttr={"top":area.y + area.h - 25 + "px","left":area.x + 1 + "px","display":display};roller.size = "2";roller.value = this.rollPeriod_;utils.update(roller.style,textAttr);roller.onchange = function(){return _this.adjustRoll(roller.value);};}; /**
 * Set up all the mouse handlers needed to capture dragging behavior for zoom
 * events.
 * @private
 */Dygraph.prototype.createDragInterface_ = function(){var context={ // Tracks whether the mouse is down right now
isZooming:false,isPanning:false, // is this drag part of a pan?
is2DPan:false, // if so, is that pan 1- or 2-dimensional?
dragStartX:null, // pixel coordinates
dragStartY:null, // pixel coordinates
dragEndX:null, // pixel coordinates
dragEndY:null, // pixel coordinates
dragDirection:null,prevEndX:null, // pixel coordinates
prevEndY:null, // pixel coordinates
prevDragDirection:null,cancelNextDblclick:false, // see comment in dygraph-interaction-model.js
// The value on the left side of the graph when a pan operation starts.
initialLeftmostDate:null, // The number of units each pixel spans. (This won't be valid for log
// scales)
xUnitsPerPixel:null, // TODO(danvk): update this comment
// The range in second/value units that the viewport encompasses during a
// panning operation.
dateRange:null, // Top-left corner of the canvas, in DOM coords
// TODO(konigsberg): Rename topLeftCanvasX, topLeftCanvasY.
px:0,py:0, // Values for use with panEdgeFraction, which limit how far outside the
// graph's data boundaries it can be panned.
boundedDates:null, // [minDate, maxDate]
boundedValues:null, // [[minValue, maxValue] ...]
// We cover iframes during mouse interactions. See comments in
// dygraph-utils.js for more info on why this is a good idea.
tarp:new _iframeTarp2['default'](), // contextB is the same thing as this context object but renamed.
initializeMouseDown:function initializeMouseDown(event,g,contextB){ // prevents mouse drags from selecting page text.
if(event.preventDefault){event.preventDefault(); // Firefox, Chrome, etc.
}else {event.returnValue = false; // IE
event.cancelBubble = true;}var canvasPos=utils.findPos(g.canvas_);contextB.px = canvasPos.x;contextB.py = canvasPos.y;contextB.dragStartX = utils.dragGetX_(event,contextB);contextB.dragStartY = utils.dragGetY_(event,contextB);contextB.cancelNextDblclick = false;contextB.tarp.cover();},destroy:function destroy(){var context=this;if(context.isZooming || context.isPanning){context.isZooming = false;context.dragStartX = null;context.dragStartY = null;}if(context.isPanning){context.isPanning = false;context.draggingDate = null;context.dateRange = null;for(var i=0;i < self.axes_.length;i++) {delete self.axes_[i].draggingValue;delete self.axes_[i].dragValueRange;}}context.tarp.uncover();}};var interactionModel=this.getOption("interactionModel"); // Self is the graph.
var self=this; // Function that binds the graph and context to the handler.
var bindHandler=function bindHandler(handler){return function(event){handler(event,self,context);};};for(var eventName in interactionModel) {if(!interactionModel.hasOwnProperty(eventName))continue;this.addAndTrackEvent(this.mouseEventElement_,eventName,bindHandler(interactionModel[eventName]));} // If the user releases the mouse button during a drag, but not over the
// canvas, then it doesn't count as a zooming action.
if(!interactionModel.willDestroyContextMyself){var mouseUpHandler=function mouseUpHandler(event){context.destroy();};this.addAndTrackEvent(document,'mouseup',mouseUpHandler);}}; /**
 * Draw a gray zoom rectangle over the desired area of the canvas. Also clears
 * up any previous zoom rectangles that were drawn. This could be optimized to
 * avoid extra redrawing, but it's tricky to avoid interactions with the status
 * dots.
 *
 * @param {number} direction the direction of the zoom rectangle. Acceptable
 *     values are utils.HORIZONTAL and utils.VERTICAL.
 * @param {number} startX The X position where the drag started, in canvas
 *     coordinates.
 * @param {number} endX The current X position of the drag, in canvas coords.
 * @param {number} startY The Y position where the drag started, in canvas
 *     coordinates.
 * @param {number} endY The current Y position of the drag, in canvas coords.
 * @param {number} prevDirection the value of direction on the previous call to
 *     this function. Used to avoid excess redrawing
 * @param {number} prevEndX The value of endX on the previous call to this
 *     function. Used to avoid excess redrawing
 * @param {number} prevEndY The value of endY on the previous call to this
 *     function. Used to avoid excess redrawing
 * @private
 */Dygraph.prototype.drawZoomRect_ = function(direction,startX,endX,startY,endY,prevDirection,prevEndX,prevEndY){var ctx=this.canvas_ctx_; // Clean up from the previous rect if necessary
if(prevDirection == utils.HORIZONTAL){ctx.clearRect(Math.min(startX,prevEndX),this.layout_.getPlotArea().y,Math.abs(startX - prevEndX),this.layout_.getPlotArea().h);}else if(prevDirection == utils.VERTICAL){ctx.clearRect(this.layout_.getPlotArea().x,Math.min(startY,prevEndY),this.layout_.getPlotArea().w,Math.abs(startY - prevEndY));} // Draw a light-grey rectangle to show the new viewing area
if(direction == utils.HORIZONTAL){if(endX && startX){ctx.fillStyle = "rgba(128,128,128,0.33)";ctx.fillRect(Math.min(startX,endX),this.layout_.getPlotArea().y,Math.abs(endX - startX),this.layout_.getPlotArea().h);}}else if(direction == utils.VERTICAL){if(endY && startY){ctx.fillStyle = "rgba(128,128,128,0.33)";ctx.fillRect(this.layout_.getPlotArea().x,Math.min(startY,endY),this.layout_.getPlotArea().w,Math.abs(endY - startY));}}}; /**
 * Clear the zoom rectangle (and perform no zoom).
 * @private
 */Dygraph.prototype.clearZoomRect_ = function(){this.currentZoomRectArgs_ = null;this.canvas_ctx_.clearRect(0,0,this.width_,this.height_);}; /**
 * Zoom to something containing [lowX, highX]. These are pixel coordinates in
 * the canvas. The exact zoom window may be slightly larger if there are no data
 * points near lowX or highX. Don't confuse this function with doZoomXDates,
 * which accepts dates that match the raw data. This function redraws the graph.
 *
 * @param {number} lowX The leftmost pixel value that should be visible.
 * @param {number} highX The rightmost pixel value that should be visible.
 * @private
 */Dygraph.prototype.doZoomX_ = function(lowX,highX){this.currentZoomRectArgs_ = null; // Find the earliest and latest dates contained in this canvasx range.
// Convert the call to date ranges of the raw data.
var minDate=this.toDataXCoord(lowX);var maxDate=this.toDataXCoord(highX);this.doZoomXDates_(minDate,maxDate);}; /**
 * Zoom to something containing [minDate, maxDate] values. Don't confuse this
 * method with doZoomX which accepts pixel coordinates. This function redraws
 * the graph.
 *
 * @param {number} minDate The minimum date that should be visible.
 * @param {number} maxDate The maximum date that should be visible.
 * @private
 */Dygraph.prototype.doZoomXDates_ = function(minDate,maxDate){var _this2=this; // TODO(danvk): when xAxisRange is null (i.e. "fit to data", the animation
// can produce strange effects. Rather than the x-axis transitioning slowly
// between values, it can jerk around.)
var old_window=this.xAxisRange();var new_window=[minDate,maxDate];var zoomCallback=this.getFunctionOption('zoomCallback');this.doAnimatedZoom(old_window,new_window,null,null,function(){if(zoomCallback){zoomCallback.call(_this2,minDate,maxDate,_this2.yAxisRanges());}});}; /**
 * Zoom to something containing [lowY, highY]. These are pixel coordinates in
 * the canvas. This function redraws the graph.
 *
 * @param {number} lowY The topmost pixel value that should be visible.
 * @param {number} highY The lowest pixel value that should be visible.
 * @private
 */Dygraph.prototype.doZoomY_ = function(lowY,highY){var _this3=this;this.currentZoomRectArgs_ = null; // Find the highest and lowest values in pixel range for each axis.
// Note that lowY (in pixels) corresponds to the max Value (in data coords).
// This is because pixels increase as you go down on the screen, whereas data
// coordinates increase as you go up the screen.
var oldValueRanges=this.yAxisRanges();var newValueRanges=[];for(var i=0;i < this.axes_.length;i++) {var hi=this.toDataYCoord(lowY,i);var low=this.toDataYCoord(highY,i);newValueRanges.push([low,hi]);}var zoomCallback=this.getFunctionOption('zoomCallback');this.doAnimatedZoom(null,null,oldValueRanges,newValueRanges,function(){if(zoomCallback){var _xAxisRange=_this3.xAxisRange();var _xAxisRange2=_slicedToArray(_xAxisRange,2);var minX=_xAxisRange2[0];var maxX=_xAxisRange2[1];zoomCallback.call(_this3,minX,maxX,_this3.yAxisRanges());}});}; /**
 * Transition function to use in animations. Returns values between 0.0
 * (totally old values) and 1.0 (totally new values) for each frame.
 * @private
 */Dygraph.zoomAnimationFunction = function(frame,numFrames){var k=1.5;return (1.0 - Math.pow(k,-frame)) / (1.0 - Math.pow(k,-numFrames));}; /**
 * Reset the zoom to the original view coordinates. This is the same as
 * double-clicking on the graph.
 */Dygraph.prototype.resetZoom = function(){var _this4=this;var dirtyX=this.isZoomed('x');var dirtyY=this.isZoomed('y');var dirty=dirtyX || dirtyY; // Clear any selection, since it's likely to be drawn in the wrong place.
this.clearSelection();if(!dirty)return; // Calculate extremes to avoid lack of padding on reset.
var _xAxisExtremes=this.xAxisExtremes();var _xAxisExtremes2=_slicedToArray(_xAxisExtremes,2);var minDate=_xAxisExtremes2[0];var maxDate=_xAxisExtremes2[1];var animatedZooms=this.getBooleanOption('animatedZooms');var zoomCallback=this.getFunctionOption('zoomCallback'); // TODO(danvk): merge this block w/ the code below.
if(!animatedZooms){this.dateWindow_ = null;this.axes_.forEach(function(axis){if(axis.valueRange)delete axis.valueRange;});this.drawGraph_();if(zoomCallback){zoomCallback.call(this,minDate,maxDate,this.yAxisRanges());}return;}var oldWindow=null,newWindow=null,oldValueRanges=null,newValueRanges=null;if(dirtyX){oldWindow = this.xAxisRange();newWindow = [minDate,maxDate];}if(dirtyY){oldValueRanges = this.yAxisRanges();newValueRanges = this.yAxisExtremes();}this.doAnimatedZoom(oldWindow,newWindow,oldValueRanges,newValueRanges,function(){_this4.dateWindow_ = null;_this4.axes_.forEach(function(axis){if(axis.valueRange)delete axis.valueRange;});if(zoomCallback){zoomCallback.call(_this4,minDate,maxDate,_this4.yAxisRanges());}});}; /**
 * Combined animation logic for all zoom functions.
 * either the x parameters or y parameters may be null.
 * @private
 */Dygraph.prototype.doAnimatedZoom = function(oldXRange,newXRange,oldYRanges,newYRanges,callback){var _this5=this;var steps=this.getBooleanOption("animatedZooms")?Dygraph.ANIMATION_STEPS:1;var windows=[];var valueRanges=[];var step,frac;if(oldXRange !== null && newXRange !== null){for(step = 1;step <= steps;step++) {frac = Dygraph.zoomAnimationFunction(step,steps);windows[step - 1] = [oldXRange[0] * (1 - frac) + frac * newXRange[0],oldXRange[1] * (1 - frac) + frac * newXRange[1]];}}if(oldYRanges !== null && newYRanges !== null){for(step = 1;step <= steps;step++) {frac = Dygraph.zoomAnimationFunction(step,steps);var thisRange=[];for(var j=0;j < this.axes_.length;j++) {thisRange.push([oldYRanges[j][0] * (1 - frac) + frac * newYRanges[j][0],oldYRanges[j][1] * (1 - frac) + frac * newYRanges[j][1]]);}valueRanges[step - 1] = thisRange;}}utils.repeatAndCleanup(function(step){if(valueRanges.length){for(var i=0;i < _this5.axes_.length;i++) {var w=valueRanges[step][i];_this5.axes_[i].valueRange = [w[0],w[1]];}}if(windows.length){_this5.dateWindow_ = windows[step];}_this5.drawGraph_();},steps,Dygraph.ANIMATION_DURATION / steps,callback);}; /**
 * Get the current graph's area object.
 *
 * Returns: {x, y, w, h}
 */Dygraph.prototype.getArea = function(){return this.plotter_.area;}; /**
 * Convert a mouse event to DOM coordinates relative to the graph origin.
 *
 * Returns a two-element array: [X, Y].
 */Dygraph.prototype.eventToDomCoords = function(event){if(event.offsetX && event.offsetY){return [event.offsetX,event.offsetY];}else {var eventElementPos=utils.findPos(this.mouseEventElement_);var canvasx=utils.pageX(event) - eventElementPos.x;var canvasy=utils.pageY(event) - eventElementPos.y;return [canvasx,canvasy];}}; /**
 * Given a canvas X coordinate, find the closest row.
 * @param {number} domX graph-relative DOM X coordinate
 * Returns {number} row number.
 * @private
 */Dygraph.prototype.findClosestRow = function(domX){var minDistX=Infinity;var closestRow=-1;var sets=this.layout_.points;for(var i=0;i < sets.length;i++) {var points=sets[i];var len=points.length;for(var j=0;j < len;j++) {var point=points[j];if(!utils.isValidPoint(point,true))continue;var dist=Math.abs(point.canvasx - domX);if(dist < minDistX){minDistX = dist;closestRow = point.idx;}}}return closestRow;}; /**
 * Given canvas X,Y coordinates, find the closest point.
 *
 * This finds the individual data point across all visible series
 * that's closest to the supplied DOM coordinates using the standard
 * Euclidean X,Y distance.
 *
 * @param {number} domX graph-relative DOM X coordinate
 * @param {number} domY graph-relative DOM Y coordinate
 * Returns: {row, seriesName, point}
 * @private
 */Dygraph.prototype.findClosestPoint = function(domX,domY){var minDist=Infinity;var dist,dx,dy,point,closestPoint,closestSeries,closestRow;for(var setIdx=this.layout_.points.length - 1;setIdx >= 0;--setIdx) {var points=this.layout_.points[setIdx];for(var i=0;i < points.length;++i) {point = points[i];if(!utils.isValidPoint(point))continue;dx = point.canvasx - domX;dy = point.canvasy - domY;dist = dx * dx + dy * dy;if(dist < minDist){minDist = dist;closestPoint = point;closestSeries = setIdx;closestRow = point.idx;}}}var name=this.layout_.setNames[closestSeries];return {row:closestRow,seriesName:name,point:closestPoint};}; /**
 * Given canvas X,Y coordinates, find the touched area in a stacked graph.
 *
 * This first finds the X data point closest to the supplied DOM X coordinate,
 * then finds the series which puts the Y coordinate on top of its filled area,
 * using linear interpolation between adjacent point pairs.
 *
 * @param {number} domX graph-relative DOM X coordinate
 * @param {number} domY graph-relative DOM Y coordinate
 * Returns: {row, seriesName, point}
 * @private
 */Dygraph.prototype.findStackedPoint = function(domX,domY){var row=this.findClosestRow(domX);var closestPoint,closestSeries;for(var setIdx=0;setIdx < this.layout_.points.length;++setIdx) {var boundary=this.getLeftBoundary_(setIdx);var rowIdx=row - boundary;var points=this.layout_.points[setIdx];if(rowIdx >= points.length)continue;var p1=points[rowIdx];if(!utils.isValidPoint(p1))continue;var py=p1.canvasy;if(domX > p1.canvasx && rowIdx + 1 < points.length){ // interpolate series Y value using next point
var p2=points[rowIdx + 1];if(utils.isValidPoint(p2)){var dx=p2.canvasx - p1.canvasx;if(dx > 0){var r=(domX - p1.canvasx) / dx;py += r * (p2.canvasy - p1.canvasy);}}}else if(domX < p1.canvasx && rowIdx > 0){ // interpolate series Y value using previous point
var p0=points[rowIdx - 1];if(utils.isValidPoint(p0)){var dx=p1.canvasx - p0.canvasx;if(dx > 0){var r=(p1.canvasx - domX) / dx;py += r * (p0.canvasy - p1.canvasy);}}} // Stop if the point (domX, py) is above this series' upper edge
if(setIdx === 0 || py < domY){closestPoint = p1;closestSeries = setIdx;}}var name=this.layout_.setNames[closestSeries];return {row:row,seriesName:name,point:closestPoint};}; /**
 * When the mouse moves in the canvas, display information about a nearby data
 * point and draw dots over those points in the data series. This function
 * takes care of cleanup of previously-drawn dots.
 * @param {Object} event The mousemove event from the browser.
 * @private
 */Dygraph.prototype.mouseMove_ = function(event){ // This prevents JS errors when mousing over the canvas before data loads.
var points=this.layout_.points;if(points === undefined || points === null)return;var canvasCoords=this.eventToDomCoords(event);var canvasx=canvasCoords[0];var canvasy=canvasCoords[1];var highlightSeriesOpts=this.getOption("highlightSeriesOpts");var selectionChanged=false;if(highlightSeriesOpts && !this.isSeriesLocked()){var closest;if(this.getBooleanOption("stackedGraph")){closest = this.findStackedPoint(canvasx,canvasy);}else {closest = this.findClosestPoint(canvasx,canvasy);}selectionChanged = this.setSelection(closest.row,closest.seriesName);}else {var idx=this.findClosestRow(canvasx);selectionChanged = this.setSelection(idx);}var callback=this.getFunctionOption("highlightCallback");if(callback && selectionChanged){callback.call(this,event,this.lastx_,this.selPoints_,this.lastRow_,this.highlightSet_);}}; /**
 * Fetch left offset from the specified set index or if not passed, the
 * first defined boundaryIds record (see bug #236).
 * @private
 */Dygraph.prototype.getLeftBoundary_ = function(setIdx){if(this.boundaryIds_[setIdx]){return this.boundaryIds_[setIdx][0];}else {for(var i=0;i < this.boundaryIds_.length;i++) {if(this.boundaryIds_[i] !== undefined){return this.boundaryIds_[i][0];}}return 0;}};Dygraph.prototype.animateSelection_ = function(direction){var totalSteps=10;var millis=30;if(this.fadeLevel === undefined)this.fadeLevel = 0;if(this.animateId === undefined)this.animateId = 0;var start=this.fadeLevel;var steps=direction < 0?start:totalSteps - start;if(steps <= 0){if(this.fadeLevel){this.updateSelection_(1.0);}return;}var thisId=++this.animateId;var that=this;var cleanupIfClearing=function cleanupIfClearing(){ // if we haven't reached fadeLevel 0 in the max frame time,
// ensure that the clear happens and just go to 0
if(that.fadeLevel !== 0 && direction < 0){that.fadeLevel = 0;that.clearSelection();}};utils.repeatAndCleanup(function(n){ // ignore simultaneous animations
if(that.animateId != thisId)return;that.fadeLevel += direction;if(that.fadeLevel === 0){that.clearSelection();}else {that.updateSelection_(that.fadeLevel / totalSteps);}},steps,millis,cleanupIfClearing);}; /**
 * Draw dots over the selectied points in the data series. This function
 * takes care of cleanup of previously-drawn dots.
 * @private
 */Dygraph.prototype.updateSelection_ = function(opt_animFraction){ /*var defaultPrevented = */this.cascadeEvents_('select',{selectedRow:this.lastRow_ === -1?undefined:this.lastRow_,selectedX:this.lastx_ === -1?undefined:this.lastx_,selectedPoints:this.selPoints_}); // TODO(danvk): use defaultPrevented here?
// Clear the previously drawn vertical, if there is one
var i;var ctx=this.canvas_ctx_;if(this.getOption('highlightSeriesOpts')){ctx.clearRect(0,0,this.width_,this.height_);var alpha=1.0 - this.getNumericOption('highlightSeriesBackgroundAlpha');var backgroundColor=utils.toRGB_(this.getOption('highlightSeriesBackgroundColor'));if(alpha){ // Activating background fade includes an animation effect for a gradual
// fade. TODO(klausw): make this independently configurable if it causes
// issues? Use a shared preference to control animations?
var animateBackgroundFade=true;if(animateBackgroundFade){if(opt_animFraction === undefined){ // start a new animation
this.animateSelection_(1);return;}alpha *= opt_animFraction;}ctx.fillStyle = 'rgba(' + backgroundColor.r + ',' + backgroundColor.g + ',' + backgroundColor.b + ',' + alpha + ')';ctx.fillRect(0,0,this.width_,this.height_);} // Redraw only the highlighted series in the interactive canvas (not the
// static plot canvas, which is where series are usually drawn).
this.plotter_._renderLineChart(this.highlightSet_,ctx);}else if(this.previousVerticalX_ >= 0){ // Determine the maximum highlight circle size.
var maxCircleSize=0;var labels=this.attr_('labels');for(i = 1;i < labels.length;i++) {var r=this.getNumericOption('highlightCircleSize',labels[i]);if(r > maxCircleSize)maxCircleSize = r;}var px=this.previousVerticalX_;ctx.clearRect(px - maxCircleSize - 1,0,2 * maxCircleSize + 2,this.height_);}if(this.selPoints_.length > 0){ // Draw colored circles over the center of each selected point
var canvasx=this.selPoints_[0].canvasx;ctx.save();for(i = 0;i < this.selPoints_.length;i++) {var pt=this.selPoints_[i];if(isNaN(pt.canvasy))continue;var circleSize=this.getNumericOption('highlightCircleSize',pt.name);var callback=this.getFunctionOption("drawHighlightPointCallback",pt.name);var color=this.plotter_.colors[pt.name];if(!callback){callback = utils.Circles.DEFAULT;}ctx.lineWidth = this.getNumericOption('strokeWidth',pt.name);ctx.strokeStyle = color;ctx.fillStyle = color;callback.call(this,this,pt.name,ctx,canvasx,pt.canvasy,color,circleSize,pt.idx);}ctx.restore();this.previousVerticalX_ = canvasx;}}; /**
 * Manually set the selected points and display information about them in the
 * legend. The selection can be cleared using clearSelection() and queried
 * using getSelection().
 *
 * To set a selected series but not a selected point, call setSelection with
 * row=false and the selected series name.
 *
 * @param {number} row Row number that should be highlighted (i.e. appear with
 * hover dots on the chart).
 * @param {seriesName} optional series name to highlight that series with the
 * the highlightSeriesOpts setting.
 * @param { locked } optional If true, keep seriesName selected when mousing
 * over the graph, disabling closest-series highlighting. Call clearSelection()
 * to unlock it.
 */Dygraph.prototype.setSelection = function(row,opt_seriesName,opt_locked){ // Extract the points we've selected
this.selPoints_ = [];var changed=false;if(row !== false && row >= 0){if(row != this.lastRow_)changed = true;this.lastRow_ = row;for(var setIdx=0;setIdx < this.layout_.points.length;++setIdx) {var points=this.layout_.points[setIdx]; // Check if the point at the appropriate index is the point we're looking
// for.  If it is, just use it, otherwise search the array for a point
// in the proper place.
var setRow=row - this.getLeftBoundary_(setIdx);if(setRow >= 0 && setRow < points.length && points[setRow].idx == row){var point=points[setRow];if(point.yval !== null)this.selPoints_.push(point);}else {for(var pointIdx=0;pointIdx < points.length;++pointIdx) {var point=points[pointIdx];if(point.idx == row){if(point.yval !== null){this.selPoints_.push(point);}break;}}}}}else {if(this.lastRow_ >= 0)changed = true;this.lastRow_ = -1;}if(this.selPoints_.length){this.lastx_ = this.selPoints_[0].xval;}else {this.lastx_ = -1;}if(opt_seriesName !== undefined){if(this.highlightSet_ !== opt_seriesName)changed = true;this.highlightSet_ = opt_seriesName;}if(opt_locked !== undefined){this.lockedSet_ = opt_locked;}if(changed){this.updateSelection_(undefined);}return changed;}; /**
 * The mouse has left the canvas. Clear out whatever artifacts remain
 * @param {Object} event the mouseout event from the browser.
 * @private
 */Dygraph.prototype.mouseOut_ = function(event){if(this.getFunctionOption("unhighlightCallback")){this.getFunctionOption("unhighlightCallback").call(this,event);}if(this.getBooleanOption("hideOverlayOnMouseOut") && !this.lockedSet_){this.clearSelection();}}; /**
 * Clears the current selection (i.e. points that were highlighted by moving
 * the mouse over the chart).
 */Dygraph.prototype.clearSelection = function(){this.cascadeEvents_('deselect',{});this.lockedSet_ = false; // Get rid of the overlay data
if(this.fadeLevel){this.animateSelection_(-1);return;}this.canvas_ctx_.clearRect(0,0,this.width_,this.height_);this.fadeLevel = 0;this.selPoints_ = [];this.lastx_ = -1;this.lastRow_ = -1;this.highlightSet_ = null;}; /**
 * Returns the number of the currently selected row. To get data for this row,
 * you can use the getValue method.
 * @return {number} row number, or -1 if nothing is selected
 */Dygraph.prototype.getSelection = function(){if(!this.selPoints_ || this.selPoints_.length < 1){return -1;}for(var setIdx=0;setIdx < this.layout_.points.length;setIdx++) {var points=this.layout_.points[setIdx];for(var row=0;row < points.length;row++) {if(points[row].x == this.selPoints_[0].x){return points[row].idx;}}}return -1;}; /**
 * Returns the name of the currently-highlighted series.
 * Only available when the highlightSeriesOpts option is in use.
 */Dygraph.prototype.getHighlightSeries = function(){return this.highlightSet_;}; /**
 * Returns true if the currently-highlighted series was locked
 * via setSelection(..., seriesName, true).
 */Dygraph.prototype.isSeriesLocked = function(){return this.lockedSet_;}; /**
 * Fires when there's data available to be graphed.
 * @param {string} data Raw CSV data to be plotted
 * @private
 */Dygraph.prototype.loadedEvent_ = function(data){this.rawData_ = this.parseCSV_(data);this.cascadeDataDidUpdateEvent_();this.predraw_();}; /**
 * Add ticks on the x-axis representing years, months, quarters, weeks, or days
 * @private
 */Dygraph.prototype.addXTicks_ = function(){ // Determine the correct ticks scale on the x-axis: quarterly, monthly, ...
var range;if(this.dateWindow_){range = [this.dateWindow_[0],this.dateWindow_[1]];}else {range = this.xAxisExtremes();}var xAxisOptionsView=this.optionsViewForAxis_('x');var xTicks=xAxisOptionsView('ticker')(range[0],range[1],this.plotter_.area.w, // TODO(danvk): should be area.width
xAxisOptionsView,this); // var msg = 'ticker(' + range[0] + ', ' + range[1] + ', ' + this.width_ + ', ' + this.attr_('pixelsPerXLabel') + ') -> ' + JSON.stringify(xTicks);
// console.log(msg);
this.layout_.setXTicks(xTicks);}; /**
 * Returns the correct handler class for the currently set options.
 * @private
 */Dygraph.prototype.getHandlerClass_ = function(){var handlerClass;if(this.attr_('dataHandler')){handlerClass = this.attr_('dataHandler');}else if(this.fractions_){if(this.getBooleanOption('errorBars')){handlerClass = _datahandlerBarsFractions2['default'];}else {handlerClass = _datahandlerDefaultFractions2['default'];}}else if(this.getBooleanOption('customBars')){handlerClass = _datahandlerBarsCustom2['default'];}else if(this.getBooleanOption('errorBars')){handlerClass = _datahandlerBarsError2['default'];}else {handlerClass = _datahandlerDefault2['default'];}return handlerClass;}; /**
 * @private
 * This function is called once when the chart's data is changed or the options
 * dictionary is updated. It is _not_ called when the user pans or zooms. The
 * idea is that values derived from the chart's data can be computed here,
 * rather than every time the chart is drawn. This includes things like the
 * number of axes, rolling averages, etc.
 */Dygraph.prototype.predraw_ = function(){var start=new Date(); // Create the correct dataHandler
this.dataHandler_ = new (this.getHandlerClass_())();this.layout_.computePlotArea(); // TODO(danvk): move more computations out of drawGraph_ and into here.
this.computeYAxes_();if(!this.is_initial_draw_){this.canvas_ctx_.restore();this.hidden_ctx_.restore();}this.canvas_ctx_.save();this.hidden_ctx_.save(); // Create a new plotter.
this.plotter_ = new _dygraphCanvas2['default'](this,this.hidden_,this.hidden_ctx_,this.layout_); // The roller sits in the bottom left corner of the chart. We don't know where
// this will be until the options are available, so it's positioned here.
this.createRollInterface_();this.cascadeEvents_('predraw'); // Convert the raw data (a 2D array) into the internal format and compute
// rolling averages.
this.rolledSeries_ = [null]; // x-axis is the first series and it's special
for(var i=1;i < this.numColumns();i++) { // var logScale = this.attr_('logscale', i); // TODO(klausw): this looks wrong // konigsberg thinks so too.
var series=this.dataHandler_.extractSeries(this.rawData_,i,this.attributes_);if(this.rollPeriod_ > 1){series = this.dataHandler_.rollingAverage(series,this.rollPeriod_,this.attributes_);}this.rolledSeries_.push(series);} // If the data or options have changed, then we'd better redraw.
this.drawGraph_(); // This is used to determine whether to do various animations.
var end=new Date();this.drawingTimeMs_ = end - start;}; /**
 * Point structure.
 *
 * xval_* and yval_* are the original unscaled data values,
 * while x_* and y_* are scaled to the range (0.0-1.0) for plotting.
 * yval_stacked is the cumulative Y value used for stacking graphs,
 * and bottom/top/minus/plus are used for error bar graphs.
 *
 * @typedef {{
 *     idx: number,
 *     name: string,
 *     x: ?number,
 *     xval: ?number,
 *     y_bottom: ?number,
 *     y: ?number,
 *     y_stacked: ?number,
 *     y_top: ?number,
 *     yval_minus: ?number,
 *     yval: ?number,
 *     yval_plus: ?number,
 *     yval_stacked
 * }}
 */Dygraph.PointType = undefined; /**
 * Calculates point stacking for stackedGraph=true.
 *
 * For stacking purposes, interpolate or extend neighboring data across
 * NaN values based on stackedGraphNaNFill settings. This is for display
 * only, the underlying data value as shown in the legend remains NaN.
 *
 * @param {Array.<Dygraph.PointType>} points Point array for a single series.
 *     Updates each Point's yval_stacked property.
 * @param {Array.<number>} cumulativeYval Accumulated top-of-graph stacked Y
 *     values for the series seen so far. Index is the row number. Updated
 *     based on the current series's values.
 * @param {Array.<number>} seriesExtremes Min and max values, updated
 *     to reflect the stacked values.
 * @param {string} fillMethod Interpolation method, one of 'all', 'inside', or
 *     'none'.
 * @private
 */Dygraph.stackPoints_ = function(points,cumulativeYval,seriesExtremes,fillMethod){var lastXval=null;var prevPoint=null;var nextPoint=null;var nextPointIdx=-1; // Find the next stackable point starting from the given index.
var updateNextPoint=function updateNextPoint(idx){ // If we've previously found a non-NaN point and haven't gone past it yet,
// just use that.
if(nextPointIdx >= idx)return; // We haven't found a non-NaN point yet or have moved past it,
// look towards the right to find a non-NaN point.
for(var j=idx;j < points.length;++j) { // Clear out a previously-found point (if any) since it's no longer
// valid, we shouldn't use it for interpolation anymore.
nextPoint = null;if(!isNaN(points[j].yval) && points[j].yval !== null){nextPointIdx = j;nextPoint = points[j];break;}}};for(var i=0;i < points.length;++i) {var point=points[i];var xval=point.xval;if(cumulativeYval[xval] === undefined){cumulativeYval[xval] = 0;}var actualYval=point.yval;if(isNaN(actualYval) || actualYval === null){if(fillMethod == 'none'){actualYval = 0;}else { // Interpolate/extend for stacking purposes if possible.
updateNextPoint(i);if(prevPoint && nextPoint && fillMethod != 'none'){ // Use linear interpolation between prevPoint and nextPoint.
actualYval = prevPoint.yval + (nextPoint.yval - prevPoint.yval) * ((xval - prevPoint.xval) / (nextPoint.xval - prevPoint.xval));}else if(prevPoint && fillMethod == 'all'){actualYval = prevPoint.yval;}else if(nextPoint && fillMethod == 'all'){actualYval = nextPoint.yval;}else {actualYval = 0;}}}else {prevPoint = point;}var stackedYval=cumulativeYval[xval];if(lastXval != xval){ // If an x-value is repeated, we ignore the duplicates.
stackedYval += actualYval;cumulativeYval[xval] = stackedYval;}lastXval = xval;point.yval_stacked = stackedYval;if(stackedYval > seriesExtremes[1]){seriesExtremes[1] = stackedYval;}if(stackedYval < seriesExtremes[0]){seriesExtremes[0] = stackedYval;}}}; /**
 * Loop over all fields and create datasets, calculating extreme y-values for
 * each series and extreme x-indices as we go.
 *
 * dateWindow is passed in as an explicit parameter so that we can compute
 * extreme values "speculatively", i.e. without actually setting state on the
 * dygraph.
 *
 * @param {Array.<Array.<Array.<(number|Array<number>)>>} rolledSeries, where
 *     rolledSeries[seriesIndex][row] = raw point, where
 *     seriesIndex is the column number starting with 1, and
 *     rawPoint is [x,y] or [x, [y, err]] or [x, [y, yminus, yplus]].
 * @param {?Array.<number>} dateWindow [xmin, xmax] pair, or null.
 * @return {{
 *     points: Array.<Array.<Dygraph.PointType>>,
 *     seriesExtremes: Array.<Array.<number>>,
 *     boundaryIds: Array.<number>}}
 * @private
 */Dygraph.prototype.gatherDatasets_ = function(rolledSeries,dateWindow){var boundaryIds=[];var points=[];var cumulativeYval=[]; // For stacked series.
var extremes={}; // series name -> [low, high]
var seriesIdx,sampleIdx;var firstIdx,lastIdx;var axisIdx; // Loop over the fields (series).  Go from the last to the first,
// because if they're stacked that's how we accumulate the values.
var num_series=rolledSeries.length - 1;var series;for(seriesIdx = num_series;seriesIdx >= 1;seriesIdx--) {if(!this.visibility()[seriesIdx - 1])continue; // Prune down to the desired range, if necessary (for zooming)
// Because there can be lines going to points outside of the visible area,
// we actually prune to visible points, plus one on either side.
if(dateWindow){series = rolledSeries[seriesIdx];var low=dateWindow[0];var high=dateWindow[1]; // TODO(danvk): do binary search instead of linear search.
// TODO(danvk): pass firstIdx and lastIdx directly to the renderer.
firstIdx = null;lastIdx = null;for(sampleIdx = 0;sampleIdx < series.length;sampleIdx++) {if(series[sampleIdx][0] >= low && firstIdx === null){firstIdx = sampleIdx;}if(series[sampleIdx][0] <= high){lastIdx = sampleIdx;}}if(firstIdx === null)firstIdx = 0;var correctedFirstIdx=firstIdx;var isInvalidValue=true;while(isInvalidValue && correctedFirstIdx > 0) {correctedFirstIdx--; // check if the y value is null.
isInvalidValue = series[correctedFirstIdx][1] === null;}if(lastIdx === null)lastIdx = series.length - 1;var correctedLastIdx=lastIdx;isInvalidValue = true;while(isInvalidValue && correctedLastIdx < series.length - 1) {correctedLastIdx++;isInvalidValue = series[correctedLastIdx][1] === null;}if(correctedFirstIdx !== firstIdx){firstIdx = correctedFirstIdx;}if(correctedLastIdx !== lastIdx){lastIdx = correctedLastIdx;}boundaryIds[seriesIdx - 1] = [firstIdx,lastIdx]; // .slice's end is exclusive, we want to include lastIdx.
series = series.slice(firstIdx,lastIdx + 1);}else {series = rolledSeries[seriesIdx];boundaryIds[seriesIdx - 1] = [0,series.length - 1];}var seriesName=this.attr_("labels")[seriesIdx];var seriesExtremes=this.dataHandler_.getExtremeYValues(series,dateWindow,this.getBooleanOption("stepPlot",seriesName));var seriesPoints=this.dataHandler_.seriesToPoints(series,seriesName,boundaryIds[seriesIdx - 1][0]);if(this.getBooleanOption("stackedGraph")){axisIdx = this.attributes_.axisForSeries(seriesName);if(cumulativeYval[axisIdx] === undefined){cumulativeYval[axisIdx] = [];}Dygraph.stackPoints_(seriesPoints,cumulativeYval[axisIdx],seriesExtremes,this.getBooleanOption("stackedGraphNaNFill"));}extremes[seriesName] = seriesExtremes;points[seriesIdx] = seriesPoints;}return {points:points,extremes:extremes,boundaryIds:boundaryIds};}; /**
 * Update the graph with new data. This method is called when the viewing area
 * has changed. If the underlying data or options have changed, predraw_ will
 * be called before drawGraph_ is called.
 *
 * @private
 */Dygraph.prototype.drawGraph_ = function(){var start=new Date(); // This is used to set the second parameter to drawCallback, below.
var is_initial_draw=this.is_initial_draw_;this.is_initial_draw_ = false;this.layout_.removeAllDatasets();this.setColors_();this.attrs_.pointSize = 0.5 * this.getNumericOption('highlightCircleSize');var packed=this.gatherDatasets_(this.rolledSeries_,this.dateWindow_);var points=packed.points;var extremes=packed.extremes;this.boundaryIds_ = packed.boundaryIds;this.setIndexByName_ = {};var labels=this.attr_("labels");var dataIdx=0;for(var i=1;i < points.length;i++) {if(!this.visibility()[i - 1])continue;this.layout_.addDataset(labels[i],points[i]);this.datasetIndex_[i] = dataIdx++;}for(var i=0;i < labels.length;i++) {this.setIndexByName_[labels[i]] = i;}this.computeYAxisRanges_(extremes);this.layout_.setYAxes(this.axes_);this.addXTicks_(); // Tell PlotKit to use this new data and render itself
this.layout_.evaluate();this.renderGraph_(is_initial_draw);if(this.getStringOption("timingName")){var end=new Date();console.log(this.getStringOption("timingName") + " - drawGraph: " + (end - start) + "ms");}}; /**
 * This does the work of drawing the chart. It assumes that the layout and axis
 * scales have already been set (e.g. by predraw_).
 *
 * @private
 */Dygraph.prototype.renderGraph_ = function(is_initial_draw){this.cascadeEvents_('clearChart');this.plotter_.clear();var underlayCallback=this.getFunctionOption('underlayCallback');if(underlayCallback){ // NOTE: we pass the dygraph object to this callback twice to avoid breaking
// users who expect a deprecated form of this callback.
underlayCallback.call(this,this.hidden_ctx_,this.layout_.getPlotArea(),this,this);}var e={canvas:this.hidden_,drawingContext:this.hidden_ctx_};this.cascadeEvents_('willDrawChart',e);this.plotter_.render();this.cascadeEvents_('didDrawChart',e);this.lastRow_ = -1; // because plugins/legend.js clears the legend
// TODO(danvk): is this a performance bottleneck when panning?
// The interaction canvas should already be empty in that situation.
this.canvas_.getContext('2d').clearRect(0,0,this.width_,this.height_);var drawCallback=this.getFunctionOption("drawCallback");if(drawCallback !== null){drawCallback.call(this,this,is_initial_draw);}if(is_initial_draw){this.readyFired_ = true;while(this.readyFns_.length > 0) {var fn=this.readyFns_.pop();fn(this);}}}; /**
 * @private
 * Determine properties of the y-axes which are independent of the data
 * currently being displayed. This includes things like the number of axes and
 * the style of the axes. It does not include the range of each axis and its
 * tick marks.
 * This fills in this.axes_.
 * axes_ = [ { options } ]
 *   indices are into the axes_ array.
 */Dygraph.prototype.computeYAxes_ = function(){var axis,index,opts,v; // this.axes_ doesn't match this.attributes_.axes_.options. It's used for
// data computation as well as options storage.
// Go through once and add all the axes.
this.axes_ = [];for(axis = 0;axis < this.attributes_.numAxes();axis++) { // Add a new axis, making a copy of its per-axis options.
opts = {g:this};utils.update(opts,this.attributes_.axisOptions(axis));this.axes_[axis] = opts;}for(axis = 0;axis < this.axes_.length;axis++) {if(axis === 0){opts = this.optionsViewForAxis_('y' + (axis?'2':''));v = opts("valueRange");if(v)this.axes_[axis].valueRange = v;}else { // To keep old behavior
var axes=this.user_attrs_.axes;if(axes && axes.y2){v = axes.y2.valueRange;if(v)this.axes_[axis].valueRange = v;}}}}; /**
 * Returns the number of y-axes on the chart.
 * @return {number} the number of axes.
 */Dygraph.prototype.numAxes = function(){return this.attributes_.numAxes();}; /**
 * @private
 * Returns axis properties for the given series.
 * @param {string} setName The name of the series for which to get axis
 * properties, e.g. 'Y1'.
 * @return {Object} The axis properties.
 */Dygraph.prototype.axisPropertiesForSeries = function(series){ // TODO(danvk): handle errors.
return this.axes_[this.attributes_.axisForSeries(series)];}; /**
 * @private
 * Determine the value range and tick marks for each axis.
 * @param {Object} extremes A mapping from seriesName -> [low, high]
 * This fills in the valueRange and ticks fields in each entry of this.axes_.
 */Dygraph.prototype.computeYAxisRanges_ = function(extremes){var isNullUndefinedOrNaN=function isNullUndefinedOrNaN(num){return isNaN(parseFloat(num));};var numAxes=this.attributes_.numAxes();var ypadCompat,span,series,ypad;var p_axis; // Compute extreme values, a span and tick marks for each axis.
for(var i=0;i < numAxes;i++) {var axis=this.axes_[i];var logscale=this.attributes_.getForAxis("logscale",i);var includeZero=this.attributes_.getForAxis("includeZero",i);var independentTicks=this.attributes_.getForAxis("independentTicks",i);series = this.attributes_.seriesForAxis(i); // Add some padding. This supports two Y padding operation modes:
//
// - backwards compatible (yRangePad not set):
//   10% padding for automatic Y ranges, but not for user-supplied
//   ranges, and move a close-to-zero edge to zero, since drawing at the edge
//   results in invisible lines. Unfortunately lines drawn at the edge of a
//   user-supplied range will still be invisible. If logscale is
//   set, add a variable amount of padding at the top but
//   none at the bottom.
//
// - new-style (yRangePad set by the user):
//   always add the specified Y padding.
//
ypadCompat = true;ypad = 0.1; // add 10%
var yRangePad=this.getNumericOption('yRangePad');if(yRangePad !== null){ypadCompat = false; // Convert pixel padding to ratio
ypad = yRangePad / this.plotter_.area.h;}if(series.length === 0){ // If no series are defined or visible then use a reasonable default
axis.extremeRange = [0,1];}else { // Calculate the extremes of extremes.
var minY=Infinity; // extremes[series[0]][0];
var maxY=-Infinity; // extremes[series[0]][1];
var extremeMinY,extremeMaxY;for(var j=0;j < series.length;j++) { // this skips invisible series
if(!extremes.hasOwnProperty(series[j]))continue; // Only use valid extremes to stop null data series' from corrupting the scale.
extremeMinY = extremes[series[j]][0];if(extremeMinY !== null){minY = Math.min(extremeMinY,minY);}extremeMaxY = extremes[series[j]][1];if(extremeMaxY !== null){maxY = Math.max(extremeMaxY,maxY);}} // Include zero if requested by the user.
if(includeZero && !logscale){if(minY > 0)minY = 0;if(maxY < 0)maxY = 0;} // Ensure we have a valid scale, otherwise default to [0, 1] for safety.
if(minY == Infinity)minY = 0;if(maxY == -Infinity)maxY = 1;span = maxY - minY; // special case: if we have no sense of scale, center on the sole value.
if(span === 0){if(maxY !== 0){span = Math.abs(maxY);}else { // ... and if the sole value is zero, use range 0-1.
maxY = 1;span = 1;}}var maxAxisY=maxY,minAxisY=minY;if(ypadCompat){if(logscale){maxAxisY = maxY + ypad * span;minAxisY = minY;}else {maxAxisY = maxY + ypad * span;minAxisY = minY - ypad * span; // Backwards-compatible behavior: Move the span to start or end at zero if it's
// close to zero.
if(minAxisY < 0 && minY >= 0)minAxisY = 0;if(maxAxisY > 0 && maxY <= 0)maxAxisY = 0;}}axis.extremeRange = [minAxisY,maxAxisY];}if(axis.valueRange){ // This is a user-set value range for this axis.
var y0=isNullUndefinedOrNaN(axis.valueRange[0])?axis.extremeRange[0]:axis.valueRange[0];var y1=isNullUndefinedOrNaN(axis.valueRange[1])?axis.extremeRange[1]:axis.valueRange[1];axis.computedValueRange = [y0,y1];}else {axis.computedValueRange = axis.extremeRange;}if(!ypadCompat){ // When using yRangePad, adjust the upper/lower bounds to add
// padding unless the user has zoomed/panned the Y axis range.
if(logscale){y0 = axis.computedValueRange[0];y1 = axis.computedValueRange[1];var y0pct=ypad / (2 * ypad - 1);var y1pct=(ypad - 1) / (2 * ypad - 1);axis.computedValueRange[0] = utils.logRangeFraction(y0,y1,y0pct);axis.computedValueRange[1] = utils.logRangeFraction(y0,y1,y1pct);}else {y0 = axis.computedValueRange[0];y1 = axis.computedValueRange[1];span = y1 - y0;axis.computedValueRange[0] = y0 - span * ypad;axis.computedValueRange[1] = y1 + span * ypad;}}if(independentTicks){axis.independentTicks = independentTicks;var opts=this.optionsViewForAxis_('y' + (i?'2':''));var ticker=opts('ticker');axis.ticks = ticker(axis.computedValueRange[0],axis.computedValueRange[1],this.plotter_.area.h,opts,this); // Define the first independent axis as primary axis.
if(!p_axis)p_axis = axis;}}if(p_axis === undefined){throw "Configuration Error: At least one axis has to have the \"independentTicks\" option activated.";} // Add ticks. By default, all axes inherit the tick positions of the
// primary axis. However, if an axis is specifically marked as having
// independent ticks, then that is permissible as well.
for(var i=0;i < numAxes;i++) {var axis=this.axes_[i];if(!axis.independentTicks){var opts=this.optionsViewForAxis_('y' + (i?'2':''));var ticker=opts('ticker');var p_ticks=p_axis.ticks;var p_scale=p_axis.computedValueRange[1] - p_axis.computedValueRange[0];var scale=axis.computedValueRange[1] - axis.computedValueRange[0];var tick_values=[];for(var k=0;k < p_ticks.length;k++) {var y_frac=(p_ticks[k].v - p_axis.computedValueRange[0]) / p_scale;var y_val=axis.computedValueRange[0] + y_frac * scale;tick_values.push(y_val);}axis.ticks = ticker(axis.computedValueRange[0],axis.computedValueRange[1],this.plotter_.area.h,opts,this,tick_values);}}}; /**
 * Detects the type of the str (date or numeric) and sets the various
 * formatting attributes in this.attrs_ based on this type.
 * @param {string} str An x value.
 * @private
 */Dygraph.prototype.detectTypeFromString_ = function(str){var isDate=false;var dashPos=str.indexOf('-'); // could be 2006-01-01 _or_ 1.0e-2
if(dashPos > 0 && str[dashPos - 1] != 'e' && str[dashPos - 1] != 'E' || str.indexOf('/') >= 0 || isNaN(parseFloat(str))){isDate = true;}else if(str.length == 8 && str > '19700101' && str < '20371231'){ // TODO(danvk): remove support for this format.
isDate = true;}this.setXAxisOptions_(isDate);};Dygraph.prototype.setXAxisOptions_ = function(isDate){if(isDate){this.attrs_.xValueParser = utils.dateParser;this.attrs_.axes.x.valueFormatter = utils.dateValueFormatter;this.attrs_.axes.x.ticker = DygraphTickers.dateTicker;this.attrs_.axes.x.axisLabelFormatter = utils.dateAxisLabelFormatter;}else { /** @private (shut up, jsdoc!) */this.attrs_.xValueParser = function(x){return parseFloat(x);}; // TODO(danvk): use Dygraph.numberValueFormatter here?
/** @private (shut up, jsdoc!) */this.attrs_.axes.x.valueFormatter = function(x){return x;};this.attrs_.axes.x.ticker = DygraphTickers.numericTicks;this.attrs_.axes.x.axisLabelFormatter = this.attrs_.axes.x.valueFormatter;}}; /**
 * @private
 * Parses a string in a special csv format.  We expect a csv file where each
 * line is a date point, and the first field in each line is the date string.
 * We also expect that all remaining fields represent series.
 * if the errorBars attribute is set, then interpret the fields as:
 * date, series1, stddev1, series2, stddev2, ...
 * @param {[Object]} data See above.
 *
 * @return [Object] An array with one entry for each row. These entries
 * are an array of cells in that row. The first entry is the parsed x-value for
 * the row. The second, third, etc. are the y-values. These can take on one of
 * three forms, depending on the CSV and constructor parameters:
 * 1. numeric value
 * 2. [ value, stddev ]
 * 3. [ low value, center value, high value ]
 */Dygraph.prototype.parseCSV_ = function(data){var ret=[];var line_delimiter=utils.detectLineDelimiter(data);var lines=data.split(line_delimiter || "\n");var vals,j; // Use the default delimiter or fall back to a tab if that makes sense.
var delim=this.getStringOption('delimiter');if(lines[0].indexOf(delim) == -1 && lines[0].indexOf('\t') >= 0){delim = '\t';}var start=0;if(!('labels' in this.user_attrs_)){ // User hasn't explicitly set labels, so they're (presumably) in the CSV.
start = 1;this.attrs_.labels = lines[0].split(delim); // NOTE: _not_ user_attrs_.
this.attributes_.reparseSeries();}var line_no=0;var xParser;var defaultParserSet=false; // attempt to auto-detect x value type
var expectedCols=this.attr_("labels").length;var outOfOrder=false;for(var i=start;i < lines.length;i++) {var line=lines[i];line_no = i;if(line.length === 0)continue; // skip blank lines
if(line[0] == '#')continue; // skip comment lines
var inFields=line.split(delim);if(inFields.length < 2)continue;var fields=[];if(!defaultParserSet){this.detectTypeFromString_(inFields[0]);xParser = this.getFunctionOption("xValueParser");defaultParserSet = true;}fields[0] = xParser(inFields[0],this); // If fractions are expected, parse the numbers as "A/B"
if(this.fractions_){for(j = 1;j < inFields.length;j++) { // TODO(danvk): figure out an appropriate way to flag parse errors.
vals = inFields[j].split("/");if(vals.length != 2){console.error('Expected fractional "num/den" values in CSV data ' + "but found a value '" + inFields[j] + "' on line " + (1 + i) + " ('" + line + "') which is not of this form.");fields[j] = [0,0];}else {fields[j] = [utils.parseFloat_(vals[0],i,line),utils.parseFloat_(vals[1],i,line)];}}}else if(this.getBooleanOption("errorBars")){ // If there are error bars, values are (value, stddev) pairs
if(inFields.length % 2 != 1){console.error('Expected alternating (value, stdev.) pairs in CSV data ' + 'but line ' + (1 + i) + ' has an odd number of values (' + (inFields.length - 1) + "): '" + line + "'");}for(j = 1;j < inFields.length;j += 2) {fields[(j + 1) / 2] = [utils.parseFloat_(inFields[j],i,line),utils.parseFloat_(inFields[j + 1],i,line)];}}else if(this.getBooleanOption("customBars")){ // Bars are a low;center;high tuple
for(j = 1;j < inFields.length;j++) {var val=inFields[j];if(/^ *$/.test(val)){fields[j] = [null,null,null];}else {vals = val.split(";");if(vals.length == 3){fields[j] = [utils.parseFloat_(vals[0],i,line),utils.parseFloat_(vals[1],i,line),utils.parseFloat_(vals[2],i,line)];}else {console.warn('When using customBars, values must be either blank ' + 'or "low;center;high" tuples (got "' + val + '" on line ' + (1 + i));}}}}else { // Values are just numbers
for(j = 1;j < inFields.length;j++) {fields[j] = utils.parseFloat_(inFields[j],i,line);}}if(ret.length > 0 && fields[0] < ret[ret.length - 1][0]){outOfOrder = true;}if(fields.length != expectedCols){console.error("Number of columns in line " + i + " (" + fields.length + ") does not agree with number of labels (" + expectedCols + ") " + line);} // If the user specified the 'labels' option and none of the cells of the
// first row parsed correctly, then they probably double-specified the
// labels. We go with the values set in the option, discard this row and
// log a warning to the JS console.
if(i === 0 && this.attr_('labels')){var all_null=true;for(j = 0;all_null && j < fields.length;j++) {if(fields[j])all_null = false;}if(all_null){console.warn("The dygraphs 'labels' option is set, but the first row " + "of CSV data ('" + line + "') appears to also contain " + "labels. Will drop the CSV labels and use the option " + "labels.");continue;}}ret.push(fields);}if(outOfOrder){console.warn("CSV is out of order; order it correctly to speed loading.");ret.sort(function(a,b){return a[0] - b[0];});}return ret;}; // In native format, all values must be dates or numbers.
// This check isn't perfect but will catch most mistaken uses of strings.
function validateNativeFormat(data){var firstRow=data[0];var firstX=firstRow[0];if(typeof firstX !== 'number' && !utils.isDateLike(firstX)){throw new Error('Expected number or date but got ' + typeof firstX + ': ' + firstX + '.');}for(var i=1;i < firstRow.length;i++) {var val=firstRow[i];if(val === null || val === undefined)continue;if(typeof val === 'number')continue;if(utils.isArrayLike(val))continue; // e.g. error bars or custom bars.
throw new Error('Expected number or array but got ' + typeof val + ': ' + val + '.');}} /**
 * The user has provided their data as a pre-packaged JS array. If the x values
 * are numeric, this is the same as dygraphs' internal format. If the x values
 * are dates, we need to convert them from Date objects to ms since epoch.
 * @param {!Array} data
 * @return {Object} data with numeric x values.
 * @private
 */Dygraph.prototype.parseArray_ = function(data){ // Peek at the first x value to see if it's numeric.
if(data.length === 0){console.error("Can't plot empty data set");return null;}if(data[0].length === 0){console.error("Data set cannot contain an empty row");return null;}validateNativeFormat(data);var i;if(this.attr_("labels") === null){console.warn("Using default labels. Set labels explicitly via 'labels' " + "in the options parameter");this.attrs_.labels = ["X"];for(i = 1;i < data[0].length;i++) {this.attrs_.labels.push("Y" + i); // Not user_attrs_.
}this.attributes_.reparseSeries();}else {var num_labels=this.attr_("labels");if(num_labels.length != data[0].length){console.error("Mismatch between number of labels (" + num_labels + ")" + " and number of columns in array (" + data[0].length + ")");return null;}}if(utils.isDateLike(data[0][0])){ // Some intelligent defaults for a date x-axis.
this.attrs_.axes.x.valueFormatter = utils.dateValueFormatter;this.attrs_.axes.x.ticker = DygraphTickers.dateTicker;this.attrs_.axes.x.axisLabelFormatter = utils.dateAxisLabelFormatter; // Assume they're all dates.
var parsedData=utils.clone(data);for(i = 0;i < data.length;i++) {if(parsedData[i].length === 0){console.error("Row " + (1 + i) + " of data is empty");return null;}if(parsedData[i][0] === null || typeof parsedData[i][0].getTime != 'function' || isNaN(parsedData[i][0].getTime())){console.error("x value in row " + (1 + i) + " is not a Date");return null;}parsedData[i][0] = parsedData[i][0].getTime();}return parsedData;}else { // Some intelligent defaults for a numeric x-axis.
/** @private (shut up, jsdoc!) */this.attrs_.axes.x.valueFormatter = function(x){return x;};this.attrs_.axes.x.ticker = DygraphTickers.numericTicks;this.attrs_.axes.x.axisLabelFormatter = utils.numberAxisLabelFormatter;return data;}}; /**
 * Parses a DataTable object from gviz.
 * The data is expected to have a first column that is either a date or a
 * number. All subsequent columns must be numbers. If there is a clear mismatch
 * between this.xValueParser_ and the type of the first column, it will be
 * fixed. Fills out rawData_.
 * @param {!google.visualization.DataTable} data See above.
 * @private
 */Dygraph.prototype.parseDataTable_ = function(data){var shortTextForAnnotationNum=function shortTextForAnnotationNum(num){ // converts [0-9]+ [A-Z][a-z]*
// example: 0=A, 1=B, 25=Z, 26=Aa, 27=Ab
// and continues like.. Ba Bb .. Za .. Zz..Aaa...Zzz Aaaa Zzzz
var shortText=String.fromCharCode(65 /* A */ + num % 26);num = Math.floor(num / 26);while(num > 0) {shortText = String.fromCharCode(65 /* A */ + (num - 1) % 26) + shortText.toLowerCase();num = Math.floor((num - 1) / 26);}return shortText;};var cols=data.getNumberOfColumns();var rows=data.getNumberOfRows();var indepType=data.getColumnType(0);if(indepType == 'date' || indepType == 'datetime'){this.attrs_.xValueParser = utils.dateParser;this.attrs_.axes.x.valueFormatter = utils.dateValueFormatter;this.attrs_.axes.x.ticker = DygraphTickers.dateTicker;this.attrs_.axes.x.axisLabelFormatter = utils.dateAxisLabelFormatter;}else if(indepType == 'number'){this.attrs_.xValueParser = function(x){return parseFloat(x);};this.attrs_.axes.x.valueFormatter = function(x){return x;};this.attrs_.axes.x.ticker = DygraphTickers.numericTicks;this.attrs_.axes.x.axisLabelFormatter = this.attrs_.axes.x.valueFormatter;}else {throw new Error("only 'date', 'datetime' and 'number' types are supported " + "for column 1 of DataTable input (Got '" + indepType + "')");} // Array of the column indices which contain data (and not annotations).
var colIdx=[];var annotationCols={}; // data index -> [annotation cols]
var hasAnnotations=false;var i,j;for(i = 1;i < cols;i++) {var type=data.getColumnType(i);if(type == 'number'){colIdx.push(i);}else if(type == 'string' && this.getBooleanOption('displayAnnotations')){ // This is OK -- it's an annotation column.
var dataIdx=colIdx[colIdx.length - 1];if(!annotationCols.hasOwnProperty(dataIdx)){annotationCols[dataIdx] = [i];}else {annotationCols[dataIdx].push(i);}hasAnnotations = true;}else {throw new Error("Only 'number' is supported as a dependent type with Gviz." + " 'string' is only supported if displayAnnotations is true");}} // Read column labels
// TODO(danvk): add support back for errorBars
var labels=[data.getColumnLabel(0)];for(i = 0;i < colIdx.length;i++) {labels.push(data.getColumnLabel(colIdx[i]));if(this.getBooleanOption("errorBars"))i += 1;}this.attrs_.labels = labels;cols = labels.length;var ret=[];var outOfOrder=false;var annotations=[];for(i = 0;i < rows;i++) {var row=[];if(typeof data.getValue(i,0) === 'undefined' || data.getValue(i,0) === null){console.warn("Ignoring row " + i + " of DataTable because of undefined or null first column.");continue;}if(indepType == 'date' || indepType == 'datetime'){row.push(data.getValue(i,0).getTime());}else {row.push(data.getValue(i,0));}if(!this.getBooleanOption("errorBars")){for(j = 0;j < colIdx.length;j++) {var col=colIdx[j];row.push(data.getValue(i,col));if(hasAnnotations && annotationCols.hasOwnProperty(col) && data.getValue(i,annotationCols[col][0]) !== null){var ann={};ann.series = data.getColumnLabel(col);ann.xval = row[0];ann.shortText = shortTextForAnnotationNum(annotations.length);ann.text = '';for(var k=0;k < annotationCols[col].length;k++) {if(k)ann.text += "\n";ann.text += data.getValue(i,annotationCols[col][k]);}annotations.push(ann);}} // Strip out infinities, which give dygraphs problems later on.
for(j = 0;j < row.length;j++) {if(!isFinite(row[j]))row[j] = null;}}else {for(j = 0;j < cols - 1;j++) {row.push([data.getValue(i,1 + 2 * j),data.getValue(i,2 + 2 * j)]);}}if(ret.length > 0 && row[0] < ret[ret.length - 1][0]){outOfOrder = true;}ret.push(row);}if(outOfOrder){console.warn("DataTable is out of order; order it correctly to speed loading.");ret.sort(function(a,b){return a[0] - b[0];});}this.rawData_ = ret;if(annotations.length > 0){this.setAnnotations(annotations,true);}this.attributes_.reparseSeries();}; /**
 * Signals to plugins that the chart data has updated.
 * This happens after the data has updated but before the chart has redrawn.
 * @private
 */Dygraph.prototype.cascadeDataDidUpdateEvent_ = function(){ // TODO(danvk): there are some issues checking xAxisRange() and using
// toDomCoords from handlers of this event. The visible range should be set
// when the chart is drawn, not derived from the data.
this.cascadeEvents_('dataDidUpdate',{});}; /**
 * Get the CSV data. If it's in a function, call that function. If it's in a
 * file, do an XMLHttpRequest to get it.
 * @private
 */Dygraph.prototype.start_ = function(){var data=this.file_; // Functions can return references of all other types.
if(typeof data == 'function'){data = data();}if(utils.isArrayLike(data)){this.rawData_ = this.parseArray_(data);this.cascadeDataDidUpdateEvent_();this.predraw_();}else if(typeof data == 'object' && typeof data.getColumnRange == 'function'){ // must be a DataTable from gviz.
this.parseDataTable_(data);this.cascadeDataDidUpdateEvent_();this.predraw_();}else if(typeof data == 'string'){ // Heuristic: a newline means it's CSV data. Otherwise it's an URL.
var line_delimiter=utils.detectLineDelimiter(data);if(line_delimiter){this.loadedEvent_(data);}else { // REMOVE_FOR_IE
var req;if(window.XMLHttpRequest){ // Firefox, Opera, IE7, and other browsers will use the native object
req = new XMLHttpRequest();}else { // IE 5 and 6 will use the ActiveX control
req = new ActiveXObject("Microsoft.XMLHTTP");}var caller=this;req.onreadystatechange = function(){if(req.readyState == 4){if(req.status === 200 ||  // Normal http
req.status === 0){ // Chrome w/ --allow-file-access-from-files
caller.loadedEvent_(req.responseText);}}};req.open("GET",data,true);req.send(null);}}else {console.error("Unknown data format: " + typeof data);}}; /**
 * Changes various properties of the graph. These can include:
 * <ul>
 * <li>file: changes the source data for the graph</li>
 * <li>errorBars: changes whether the data contains stddev</li>
 * </ul>
 *
 * There's a huge variety of options that can be passed to this method. For a
 * full list, see http://dygraphs.com/options.html.
 *
 * @param {Object} input_attrs The new properties and values
 * @param {boolean} block_redraw Usually the chart is redrawn after every
 *     call to updateOptions(). If you know better, you can pass true to
 *     explicitly block the redraw. This can be useful for chaining
 *     updateOptions() calls, avoiding the occasional infinite loop and
 *     preventing redraws when it's not necessary (e.g. when updating a
 *     callback).
 */Dygraph.prototype.updateOptions = function(input_attrs,block_redraw){if(typeof block_redraw == 'undefined')block_redraw = false; // copyUserAttrs_ drops the "file" parameter as a convenience to us.
var file=input_attrs.file;var attrs=Dygraph.copyUserAttrs_(input_attrs); // TODO(danvk): this is a mess. Move these options into attr_.
if('rollPeriod' in attrs){this.rollPeriod_ = attrs.rollPeriod;}if('dateWindow' in attrs){this.dateWindow_ = attrs.dateWindow;} // TODO(danvk): validate per-series options.
// Supported:
// strokeWidth
// pointSize
// drawPoints
// highlightCircleSize
// Check if this set options will require new points.
var requiresNewPoints=utils.isPixelChangingOptionList(this.attr_("labels"),attrs);utils.updateDeep(this.user_attrs_,attrs);this.attributes_.reparseSeries();if(file){ // This event indicates that the data is about to change, but hasn't yet.
// TODO(danvk): support cancelation of the update via this event.
this.cascadeEvents_('dataWillUpdate',{});this.file_ = file;if(!block_redraw)this.start_();}else {if(!block_redraw){if(requiresNewPoints){this.predraw_();}else {this.renderGraph_(false);}}}}; /**
 * Make a copy of input attributes, removing file as a convenience.
 * @private
 */Dygraph.copyUserAttrs_ = function(attrs){var my_attrs={};for(var k in attrs) {if(!attrs.hasOwnProperty(k))continue;if(k == 'file')continue;if(attrs.hasOwnProperty(k))my_attrs[k] = attrs[k];}return my_attrs;}; /**
 * Resizes the dygraph. If no parameters are specified, resizes to fill the
 * containing div (which has presumably changed size since the dygraph was
 * instantiated. If the width/height are specified, the div will be resized.
 *
 * This is far more efficient than destroying and re-instantiating a
 * Dygraph, since it doesn't have to reparse the underlying data.
 *
 * @param {number} width Width (in pixels)
 * @param {number} height Height (in pixels)
 */Dygraph.prototype.resize = function(width,height){if(this.resize_lock){return;}this.resize_lock = true;if(width === null != (height === null)){console.warn("Dygraph.resize() should be called with zero parameters or " + "two non-NULL parameters. Pretending it was zero.");width = height = null;}var old_width=this.width_;var old_height=this.height_;if(width){this.maindiv_.style.width = width + "px";this.maindiv_.style.height = height + "px";this.width_ = width;this.height_ = height;}else {this.width_ = this.maindiv_.clientWidth;this.height_ = this.maindiv_.clientHeight;}if(old_width != this.width_ || old_height != this.height_){ // Resizing a canvas erases it, even when the size doesn't change, so
// any resize needs to be followed by a redraw.
this.resizeElements_();this.predraw_();}this.resize_lock = false;}; /**
 * Adjusts the number of points in the rolling average. Updates the graph to
 * reflect the new averaging period.
 * @param {number} length Number of points over which to average the data.
 */Dygraph.prototype.adjustRoll = function(length){this.rollPeriod_ = length;this.predraw_();}; /**
 * Returns a boolean array of visibility statuses.
 */Dygraph.prototype.visibility = function(){ // Do lazy-initialization, so that this happens after we know the number of
// data series.
if(!this.getOption("visibility")){this.attrs_.visibility = [];} // TODO(danvk): it looks like this could go into an infinite loop w/ user_attrs.
while(this.getOption("visibility").length < this.numColumns() - 1) {this.attrs_.visibility.push(true);}return this.getOption("visibility");}; /**
 * Changes the visibility of one or more series.
 *
 * @param {number|number[]|object} num the series index or an array of series indices
 *                                     or a boolean array of visibility states by index
 *                                     or an object mapping series numbers, as keys, to
 *                                     visibility state (boolean values)
 * @param {boolean} value the visibility state expressed as a boolean
 */Dygraph.prototype.setVisibility = function(num,value){var x=this.visibility();var numIsObject=false;if(!Array.isArray(num)){if(num !== null && typeof num === 'object'){numIsObject = true;}else {num = [num];}}if(numIsObject){for(var i in num) {if(num.hasOwnProperty(i)){if(i < 0 || i >= x.length){console.warn("Invalid series number in setVisibility: " + i);}else {x[i] = num[i];}}}}else {for(var i=0;i < num.length;i++) {if(typeof num[i] === 'boolean'){if(i >= x.length){console.warn("Invalid series number in setVisibility: " + i);}else {x[i] = num[i];}}else {if(num[i] < 0 || num[i] >= x.length){console.warn("Invalid series number in setVisibility: " + num[i]);}else {x[num[i]] = value;}}}}this.predraw_();}; /**
 * How large of an area will the dygraph render itself in?
 * This is used for testing.
 * @return A {width: w, height: h} object.
 * @private
 */Dygraph.prototype.size = function(){return {width:this.width_,height:this.height_};}; /**
 * Update the list of annotations and redraw the chart.
 * See dygraphs.com/annotations.html for more info on how to use annotations.
 * @param ann {Array} An array of annotation objects.
 * @param suppressDraw {Boolean} Set to "true" to block chart redraw (optional).
 */Dygraph.prototype.setAnnotations = function(ann,suppressDraw){ // Only add the annotation CSS rule once we know it will be used.
this.annotations_ = ann;if(!this.layout_){console.warn("Tried to setAnnotations before dygraph was ready. " + "Try setting them in a ready() block. See " + "dygraphs.com/tests/annotation.html");return;}this.layout_.setAnnotations(this.annotations_);if(!suppressDraw){this.predraw_();}}; /**
 * Return the list of annotations.
 */Dygraph.prototype.annotations = function(){return this.annotations_;}; /**
 * Get the list of label names for this graph. The first column is the
 * x-axis, so the data series names start at index 1.
 *
 * Returns null when labels have not yet been defined.
 */Dygraph.prototype.getLabels = function(){var labels=this.attr_("labels");return labels?labels.slice():null;}; /**
 * Get the index of a series (column) given its name. The first column is the
 * x-axis, so the data series start with index 1.
 */Dygraph.prototype.indexFromSetName = function(name){return this.setIndexByName_[name];}; /**
 * Find the row number corresponding to the given x-value.
 * Returns null if there is no such x-value in the data.
 * If there are multiple rows with the same x-value, this will return the
 * first one.
 * @param {number} xVal The x-value to look for (e.g. millis since epoch).
 * @return {?number} The row number, which you can pass to getValue(), or null.
 */Dygraph.prototype.getRowForX = function(xVal){var low=0,high=this.numRows() - 1;while(low <= high) {var idx=high + low >> 1;var x=this.getValue(idx,0);if(x < xVal){low = idx + 1;}else if(x > xVal){high = idx - 1;}else if(low != idx){ // equal, but there may be an earlier match.
high = idx;}else {return idx;}}return null;}; /**
 * Trigger a callback when the dygraph has drawn itself and is ready to be
 * manipulated. This is primarily useful when dygraphs has to do an XHR for the
 * data (i.e. a URL is passed as the data source) and the chart is drawn
 * asynchronously. If the chart has already drawn, the callback will fire
 * immediately.
 *
 * This is a good place to call setAnnotation().
 *
 * @param {function(!Dygraph)} callback The callback to trigger when the chart
 *     is ready.
 */Dygraph.prototype.ready = function(callback){if(this.is_initial_draw_){this.readyFns_.push(callback);}else {callback.call(this,this);}}; /**
 * Add an event handler. This event handler is kept until the graph is
 * destroyed with a call to graph.destroy().
 *
 * @param {!Node} elem The element to add the event to.
 * @param {string} type The type of the event, e.g. 'click' or 'mousemove'.
 * @param {function(Event):(boolean|undefined)} fn The function to call
 *     on the event. The function takes one parameter: the event object.
 * @private
 */Dygraph.prototype.addAndTrackEvent = function(elem,type,fn){utils.addEvent(elem,type,fn);this.registeredEvents_.push({elem:elem,type:type,fn:fn});};Dygraph.prototype.removeTrackedEvents_ = function(){if(this.registeredEvents_){for(var idx=0;idx < this.registeredEvents_.length;idx++) {var reg=this.registeredEvents_[idx];utils.removeEvent(reg.elem,reg.type,reg.fn);}}this.registeredEvents_ = [];}; // Installed plugins, in order of precedence (most-general to most-specific).
Dygraph.PLUGINS = [_pluginsLegend2['default'],_pluginsAxes2['default'],_pluginsRangeSelector2['default'], // Has to be before ChartLabels so that its callbacks are called after ChartLabels' callbacks.
_pluginsChartLabels2['default'],_pluginsAnnotations2['default'],_pluginsGrid2['default']]; // There are many symbols which have historically been available through the
// Dygraph class. These are exported here for backwards compatibility.
Dygraph.GVizChart = _dygraphGviz2['default'];Dygraph.DASHED_LINE = utils.DASHED_LINE;Dygraph.DOT_DASH_LINE = utils.DOT_DASH_LINE;Dygraph.dateAxisLabelFormatter = utils.dateAxisLabelFormatter;Dygraph.toRGB_ = utils.toRGB_;Dygraph.findPos = utils.findPos;Dygraph.pageX = utils.pageX;Dygraph.pageY = utils.pageY;Dygraph.dateString_ = utils.dateString_;Dygraph.defaultInteractionModel = _dygraphInteractionModel2['default'].defaultModel;Dygraph.nonInteractiveModel = Dygraph.nonInteractiveModel_ = _dygraphInteractionModel2['default'].nonInteractiveModel_;Dygraph.Circles = utils.Circles;Dygraph.Plugins = {Legend:_pluginsLegend2['default'],Axes:_pluginsAxes2['default'],Annotations:_pluginsAnnotations2['default'],ChartLabels:_pluginsChartLabels2['default'],Grid:_pluginsGrid2['default'],RangeSelector:_pluginsRangeSelector2['default']};Dygraph.DataHandlers = {DefaultHandler:_datahandlerDefault2['default'],BarsHandler:_datahandlerBars2['default'],CustomBarsHandler:_datahandlerBarsCustom2['default'],DefaultFractionHandler:_datahandlerDefaultFractions2['default'],ErrorBarsHandler:_datahandlerBarsError2['default'],FractionsBarsHandler:_datahandlerBarsFractions2['default']};Dygraph.startPan = _dygraphInteractionModel2['default'].startPan;Dygraph.startZoom = _dygraphInteractionModel2['default'].startZoom;Dygraph.movePan = _dygraphInteractionModel2['default'].movePan;Dygraph.moveZoom = _dygraphInteractionModel2['default'].moveZoom;Dygraph.endPan = _dygraphInteractionModel2['default'].endPan;Dygraph.endZoom = _dygraphInteractionModel2['default'].endZoom;Dygraph.numericLinearTicks = DygraphTickers.numericLinearTicks;Dygraph.numericTicks = DygraphTickers.numericTicks;Dygraph.dateTicker = DygraphTickers.dateTicker;Dygraph.Granularity = DygraphTickers.Granularity;Dygraph.getDateAxis = DygraphTickers.getDateAxis;Dygraph.floatFormat = utils.floatFormat;exports['default'] = Dygraph;module.exports = exports['default'];

}).call(this,require('_process'))

},{"./datahandler/bars":5,"./datahandler/bars-custom":2,"./datahandler/bars-error":3,"./datahandler/bars-fractions":4,"./datahandler/default":8,"./datahandler/default-fractions":7,"./dygraph-canvas":9,"./dygraph-default-attrs":10,"./dygraph-gviz":11,"./dygraph-interaction-model":12,"./dygraph-layout":13,"./dygraph-options":15,"./dygraph-options-reference":14,"./dygraph-tickers":16,"./dygraph-utils":17,"./iframe-tarp":19,"./plugins/annotations":20,"./plugins/axes":21,"./plugins/chart-labels":22,"./plugins/grid":23,"./plugins/legend":24,"./plugins/range-selector":25,"_process":1}],19:[function(require,module,exports){
/**
 * To create a "drag" interaction, you typically register a mousedown event
 * handler on the element where the drag begins. In that handler, you register a
 * mouseup handler on the window to determine when the mouse is released,
 * wherever that release happens. This works well, except when the user releases
 * the mouse over an off-domain iframe. In that case, the mouseup event is
 * handled by the iframe and never bubbles up to the window handler.
 *
 * To deal with this issue, we cover iframes with high z-index divs to make sure
 * they don't capture mouseup.
 *
 * Usage:
 * element.addEventListener('mousedown', function() {
 *   var tarper = new IFrameTarp();
 *   tarper.cover();
 *   var mouseUpHandler = function() {
 *     ...
 *     window.removeEventListener(mouseUpHandler);
 *     tarper.uncover();
 *   };
 *   window.addEventListener('mouseup', mouseUpHandler);
 * };
 *
 * @constructor
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _dygraphUtils = require('./dygraph-utils');

var utils = _interopRequireWildcard(_dygraphUtils);

function IFrameTarp() {
  /** @type {Array.<!HTMLDivElement>} */
  this.tarps = [];
};

/**
 * Find all the iframes in the document and cover them with high z-index
 * transparent divs.
 */
IFrameTarp.prototype.cover = function () {
  var iframes = document.getElementsByTagName("iframe");
  for (var i = 0; i < iframes.length; i++) {
    var iframe = iframes[i];
    var pos = utils.findPos(iframe),
        x = pos.x,
        y = pos.y,
        width = iframe.offsetWidth,
        height = iframe.offsetHeight;

    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = x + 'px';
    div.style.top = y + 'px';
    div.style.width = width + 'px';
    div.style.height = height + 'px';
    div.style.zIndex = 999;
    document.body.appendChild(div);
    this.tarps.push(div);
  }
};

/**
 * Remove all the iframe covers. You should call this in a mouseup handler.
 */
IFrameTarp.prototype.uncover = function () {
  for (var i = 0; i < this.tarps.length; i++) {
    this.tarps[i].parentNode.removeChild(this.tarps[i]);
  }
  this.tarps = [];
};

exports["default"] = IFrameTarp;
module.exports = exports["default"];

},{"./dygraph-utils":17}],20:[function(require,module,exports){
/**
 * @license
 * Copyright 2012 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/*global Dygraph:false */

"use strict";

/**
Current bits of jankiness:
- Uses dygraph.layout_ to get the parsed annotations.
- Uses dygraph.plotter_.area

It would be nice if the plugin didn't require so much special support inside
the core dygraphs classes, but annotations involve quite a bit of parsing and
layout.

TODO(danvk): cache DOM elements.
*/

Object.defineProperty(exports, "__esModule", {
  value: true
});
var annotations = function annotations() {
  this.annotations_ = [];
};

annotations.prototype.toString = function () {
  return "Annotations Plugin";
};

annotations.prototype.activate = function (g) {
  return {
    clearChart: this.clearChart,
    didDrawChart: this.didDrawChart
  };
};

annotations.prototype.detachLabels = function () {
  for (var i = 0; i < this.annotations_.length; i++) {
    var a = this.annotations_[i];
    if (a.parentNode) a.parentNode.removeChild(a);
    this.annotations_[i] = null;
  }
  this.annotations_ = [];
};

annotations.prototype.clearChart = function (e) {
  this.detachLabels();
};

annotations.prototype.didDrawChart = function (e) {
  var g = e.dygraph;

  // Early out in the (common) case of zero annotations.
  var points = g.layout_.annotated_points;
  if (!points || points.length === 0) return;

  var containerDiv = e.canvas.parentNode;

  var bindEvt = function bindEvt(eventName, classEventName, pt) {
    return function (annotation_event) {
      var a = pt.annotation;
      if (a.hasOwnProperty(eventName)) {
        a[eventName](a, pt, g, annotation_event);
      } else if (g.getOption(classEventName)) {
        g.getOption(classEventName)(a, pt, g, annotation_event);
      }
    };
  };

  // Add the annotations one-by-one.
  var area = e.dygraph.getArea();

  // x-coord to sum of previous annotation's heights (used for stacking).
  var xToUsedHeight = {};

  for (var i = 0; i < points.length; i++) {
    var p = points[i];
    if (p.canvasx < area.x || p.canvasx > area.x + area.w || p.canvasy < area.y || p.canvasy > area.y + area.h) {
      continue;
    }

    var a = p.annotation;
    var tick_height = 6;
    if (a.hasOwnProperty("tickHeight")) {
      tick_height = a.tickHeight;
    }

    // TODO: deprecate axisLabelFontSize in favor of CSS
    var div = document.createElement("div");
    div.style['fontSize'] = g.getOption('axisLabelFontSize') + "px";
    var className = 'dygraph-annotation';
    if (!a.hasOwnProperty('icon')) {
      // camelCase class names are deprecated.
      className += ' dygraphDefaultAnnotation dygraph-default-annotation';
    }
    if (a.hasOwnProperty('cssClass')) {
      className += " " + a.cssClass;
    }
    div.className = className;

    var width = a.hasOwnProperty('width') ? a.width : 16;
    var height = a.hasOwnProperty('height') ? a.height : 16;
    if (a.hasOwnProperty('icon')) {
      var img = document.createElement("img");
      img.src = a.icon;
      img.width = width;
      img.height = height;
      div.appendChild(img);
    } else if (p.annotation.hasOwnProperty('shortText')) {
      div.appendChild(document.createTextNode(p.annotation.shortText));
    }
    var left = p.canvasx - width / 2;
    div.style.left = left + "px";
    var divTop = 0;
    if (a.attachAtBottom) {
      var y = area.y + area.h - height - tick_height;
      if (xToUsedHeight[left]) {
        y -= xToUsedHeight[left];
      } else {
        xToUsedHeight[left] = 0;
      }
      xToUsedHeight[left] += tick_height + height;
      divTop = y;
    } else {
      divTop = p.canvasy - height - tick_height;
    }
    div.style.top = divTop + "px";
    div.style.width = width + "px";
    div.style.height = height + "px";
    div.title = p.annotation.text;
    div.style.color = g.colorsMap_[p.name];
    div.style.borderColor = g.colorsMap_[p.name];
    a.div = div;

    g.addAndTrackEvent(div, 'click', bindEvt('clickHandler', 'annotationClickHandler', p, this));
    g.addAndTrackEvent(div, 'mouseover', bindEvt('mouseOverHandler', 'annotationMouseOverHandler', p, this));
    g.addAndTrackEvent(div, 'mouseout', bindEvt('mouseOutHandler', 'annotationMouseOutHandler', p, this));
    g.addAndTrackEvent(div, 'dblclick', bindEvt('dblClickHandler', 'annotationDblClickHandler', p, this));

    containerDiv.appendChild(div);
    this.annotations_.push(div);

    var ctx = e.drawingContext;
    ctx.save();
    ctx.strokeStyle = a.hasOwnProperty('tickColor') ? a.tickColor : g.colorsMap_[p.name];
    ctx.lineWidth = a.hasOwnProperty('tickWidth') ? a.tickWidth : g.getOption('strokeWidth');
    ctx.beginPath();
    if (!a.attachAtBottom) {
      ctx.moveTo(p.canvasx, p.canvasy);
      ctx.lineTo(p.canvasx, p.canvasy - 2 - tick_height);
    } else {
      var y = divTop + height;
      ctx.moveTo(p.canvasx, y);
      ctx.lineTo(p.canvasx, y + tick_height);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
};

annotations.prototype.destroy = function () {
  this.detachLabels();
};

exports["default"] = annotations;
module.exports = exports["default"];

},{}],21:[function(require,module,exports){
/**
 * @license
 * Copyright 2012 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/*global Dygraph:false */

'use strict';

/*
Bits of jankiness:
- Direct layout access
- Direct area access
- Should include calculation of ticks, not just the drawing.

Options left to make axis-friendly.
  ('drawAxesAtZero')
  ('xAxisHeight')
*/

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dygraphUtils = require('../dygraph-utils');

var utils = _interopRequireWildcard(_dygraphUtils);

/**
 * Draws the axes. This includes the labels on the x- and y-axes, as well
 * as the tick marks on the axes.
 * It does _not_ draw the grid lines which span the entire chart.
 */
var axes = function axes() {
  this.xlabels_ = [];
  this.ylabels_ = [];
};

axes.prototype.toString = function () {
  return 'Axes Plugin';
};

axes.prototype.activate = function (g) {
  return {
    layout: this.layout,
    clearChart: this.clearChart,
    willDrawChart: this.willDrawChart
  };
};

axes.prototype.layout = function (e) {
  var g = e.dygraph;

  if (g.getOptionForAxis('drawAxis', 'y')) {
    var w = g.getOptionForAxis('axisLabelWidth', 'y') + 2 * g.getOptionForAxis('axisTickSize', 'y');
    e.reserveSpaceLeft(w);
  }

  if (g.getOptionForAxis('drawAxis', 'x')) {
    var h;
    // NOTE: I think this is probably broken now, since g.getOption() now
    // hits the dictionary. (That is, g.getOption('xAxisHeight') now always
    // has a value.)
    if (g.getOption('xAxisHeight')) {
      h = g.getOption('xAxisHeight');
    } else {
      h = g.getOptionForAxis('axisLabelFontSize', 'x') + 2 * g.getOptionForAxis('axisTickSize', 'x');
    }
    e.reserveSpaceBottom(h);
  }

  if (g.numAxes() == 2) {
    if (g.getOptionForAxis('drawAxis', 'y2')) {
      var w = g.getOptionForAxis('axisLabelWidth', 'y2') + 2 * g.getOptionForAxis('axisTickSize', 'y2');
      e.reserveSpaceRight(w);
    }
  } else if (g.numAxes() > 2) {
    g.error('Only two y-axes are supported at this time. (Trying ' + 'to use ' + g.numAxes() + ')');
  }
};

axes.prototype.detachLabels = function () {
  function removeArray(ary) {
    for (var i = 0; i < ary.length; i++) {
      var el = ary[i];
      if (el.parentNode) el.parentNode.removeChild(el);
    }
  }

  removeArray(this.xlabels_);
  removeArray(this.ylabels_);
  this.xlabels_ = [];
  this.ylabels_ = [];
};

axes.prototype.clearChart = function (e) {
  this.detachLabels();
};

axes.prototype.willDrawChart = function (e) {
  var _this = this;

  var g = e.dygraph;

  if (!g.getOptionForAxis('drawAxis', 'x') && !g.getOptionForAxis('drawAxis', 'y') && !g.getOptionForAxis('drawAxis', 'y2')) {
    return;
  }

  // Round pixels to half-integer boundaries for crisper drawing.
  function halfUp(x) {
    return Math.round(x) + 0.5;
  }
  function halfDown(y) {
    return Math.round(y) - 0.5;
  }

  var context = e.drawingContext;
  var containerDiv = e.canvas.parentNode;
  var canvasWidth = g.width_; // e.canvas.width is affected by pixel ratio.
  var canvasHeight = g.height_;

  var label, x, y, tick, i;

  var makeLabelStyle = function makeLabelStyle(axis) {
    return {
      position: 'absolute',
      fontSize: g.getOptionForAxis('axisLabelFontSize', axis) + 'px',
      width: g.getOptionForAxis('axisLabelWidth', axis) + 'px'
    };
  };

  var labelStyles = {
    x: makeLabelStyle('x'),
    y: makeLabelStyle('y'),
    y2: makeLabelStyle('y2')
  };

  var makeDiv = function makeDiv(txt, axis, prec_axis) {
    /*
     * This seems to be called with the following three sets of axis/prec_axis:
     * x: undefined
     * y: y1
     * y: y2
     */
    var div = document.createElement('div');
    var labelStyle = labelStyles[prec_axis == 'y2' ? 'y2' : axis];
    utils.update(div.style, labelStyle);
    // TODO: combine outer & inner divs
    var inner_div = document.createElement('div');
    inner_div.className = 'dygraph-axis-label' + ' dygraph-axis-label-' + axis + (prec_axis ? ' dygraph-axis-label-' + prec_axis : '');
    inner_div.innerHTML = txt;
    div.appendChild(inner_div);
    return div;
  };

  // axis lines
  context.save();

  var layout = g.layout_;
  var area = e.dygraph.plotter_.area;

  // Helper for repeated axis-option accesses.
  var makeOptionGetter = function makeOptionGetter(axis) {
    return function (option) {
      return g.getOptionForAxis(option, axis);
    };
  };

  if (g.getOptionForAxis('drawAxis', 'y')) {
    if (layout.yticks && layout.yticks.length > 0) {
      var num_axes = g.numAxes();
      var getOptions = [makeOptionGetter('y'), makeOptionGetter('y2')];
      layout.yticks.forEach(function (tick) {
        if (tick.label === undefined) return; // this tick only has a grid line.
        x = area.x;
        var sgn = 1;
        var prec_axis = 'y1';
        var getAxisOption = getOptions[0];
        if (tick.axis == 1) {
          // right-side y-axis
          x = area.x + area.w;
          sgn = -1;
          prec_axis = 'y2';
          getAxisOption = getOptions[1];
        }
        var fontSize = getAxisOption('axisLabelFontSize');
        y = area.y + tick.pos * area.h;

        /* Tick marks are currently clipped, so don't bother drawing them.
        context.beginPath();
        context.moveTo(halfUp(x), halfDown(y));
        context.lineTo(halfUp(x - sgn * this.attr_('axisTickSize')), halfDown(y));
        context.closePath();
        context.stroke();
        */

        label = makeDiv(tick.label, 'y', num_axes == 2 ? prec_axis : null);
        var top = y - fontSize / 2;
        if (top < 0) top = 0;

        if (top + fontSize + 3 > canvasHeight) {
          label.style.bottom = '0';
        } else {
          label.style.top = top + 'px';
        }
        // TODO: replace these with css classes?
        if (tick.axis === 0) {
          label.style.left = area.x - getAxisOption('axisLabelWidth') - getAxisOption('axisTickSize') + 'px';
          label.style.textAlign = 'right';
        } else if (tick.axis == 1) {
          label.style.left = area.x + area.w + getAxisOption('axisTickSize') + 'px';
          label.style.textAlign = 'left';
        }
        label.style.width = getAxisOption('axisLabelWidth') + 'px';
        containerDiv.appendChild(label);
        _this.ylabels_.push(label);
      });

      // The lowest tick on the y-axis often overlaps with the leftmost
      // tick on the x-axis. Shift the bottom tick up a little bit to
      // compensate if necessary.
      var bottomTick = this.ylabels_[0];
      // Interested in the y2 axis also?
      var fontSize = g.getOptionForAxis('axisLabelFontSize', 'y');
      var bottom = parseInt(bottomTick.style.top, 10) + fontSize;
      if (bottom > canvasHeight - fontSize) {
        bottomTick.style.top = parseInt(bottomTick.style.top, 10) - fontSize / 2 + 'px';
      }
    }

    // draw a vertical line on the left to separate the chart from the labels.
    var axisX;
    if (g.getOption('drawAxesAtZero')) {
      var r = g.toPercentXCoord(0);
      if (r > 1 || r < 0 || isNaN(r)) r = 0;
      axisX = halfUp(area.x + r * area.w);
    } else {
      axisX = halfUp(area.x);
    }

    context.strokeStyle = g.getOptionForAxis('axisLineColor', 'y');
    context.lineWidth = g.getOptionForAxis('axisLineWidth', 'y');

    context.beginPath();
    context.moveTo(axisX, halfDown(area.y));
    context.lineTo(axisX, halfDown(area.y + area.h));
    context.closePath();
    context.stroke();

    // if there's a secondary y-axis, draw a vertical line for that, too.
    if (g.numAxes() == 2) {
      context.strokeStyle = g.getOptionForAxis('axisLineColor', 'y2');
      context.lineWidth = g.getOptionForAxis('axisLineWidth', 'y2');
      context.beginPath();
      context.moveTo(halfDown(area.x + area.w), halfDown(area.y));
      context.lineTo(halfDown(area.x + area.w), halfDown(area.y + area.h));
      context.closePath();
      context.stroke();
    }
  }

  if (g.getOptionForAxis('drawAxis', 'x')) {
    if (layout.xticks) {
      var getAxisOption = makeOptionGetter('x');
      layout.xticks.forEach(function (tick) {
        if (tick.label === undefined) return; // this tick only has a grid line.
        x = area.x + tick.pos * area.w;
        y = area.y + area.h;

        /* Tick marks are currently clipped, so don't bother drawing them.
        context.beginPath();
        context.moveTo(halfUp(x), halfDown(y));
        context.lineTo(halfUp(x), halfDown(y + this.attr_('axisTickSize')));
        context.closePath();
        context.stroke();
        */

        label = makeDiv(tick.label, 'x');
        label.style.textAlign = 'center';
        label.style.top = y + getAxisOption('axisTickSize') + 'px';

        var left = x - getAxisOption('axisLabelWidth') / 2;
        if (left + getAxisOption('axisLabelWidth') > canvasWidth) {
          left = canvasWidth - getAxisOption('axisLabelWidth');
          label.style.textAlign = 'right';
        }
        if (left < 0) {
          left = 0;
          label.style.textAlign = 'left';
        }

        label.style.left = left + 'px';
        label.style.width = getAxisOption('axisLabelWidth') + 'px';
        containerDiv.appendChild(label);
        _this.xlabels_.push(label);
      });
    }

    context.strokeStyle = g.getOptionForAxis('axisLineColor', 'x');
    context.lineWidth = g.getOptionForAxis('axisLineWidth', 'x');
    context.beginPath();
    var axisY;
    if (g.getOption('drawAxesAtZero')) {
      var r = g.toPercentYCoord(0, 0);
      if (r > 1 || r < 0) r = 1;
      axisY = halfDown(area.y + r * area.h);
    } else {
      axisY = halfDown(area.y + area.h);
    }
    context.moveTo(halfUp(area.x), axisY);
    context.lineTo(halfUp(area.x + area.w), axisY);
    context.closePath();
    context.stroke();
  }

  context.restore();
};

exports['default'] = axes;
module.exports = exports['default'];

},{"../dygraph-utils":17}],22:[function(require,module,exports){
/**
 * @license
 * Copyright 2012 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */
/*global Dygraph:false */

"use strict";

// TODO(danvk): move chart label options out of dygraphs and into the plugin.
// TODO(danvk): only tear down & rebuild the DIVs when it's necessary.

Object.defineProperty(exports, "__esModule", {
  value: true
});
var chart_labels = function chart_labels() {
  this.title_div_ = null;
  this.xlabel_div_ = null;
  this.ylabel_div_ = null;
  this.y2label_div_ = null;
};

chart_labels.prototype.toString = function () {
  return "ChartLabels Plugin";
};

chart_labels.prototype.activate = function (g) {
  return {
    layout: this.layout,
    // clearChart: this.clearChart,
    didDrawChart: this.didDrawChart
  };
};

// QUESTION: should there be a plugin-utils.js?
var createDivInRect = function createDivInRect(r) {
  var div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.left = r.x + 'px';
  div.style.top = r.y + 'px';
  div.style.width = r.w + 'px';
  div.style.height = r.h + 'px';
  return div;
};

// Detach and null out any existing nodes.
chart_labels.prototype.detachLabels_ = function () {
  var els = [this.title_div_, this.xlabel_div_, this.ylabel_div_, this.y2label_div_];
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    if (!el) continue;
    if (el.parentNode) el.parentNode.removeChild(el);
  }

  this.title_div_ = null;
  this.xlabel_div_ = null;
  this.ylabel_div_ = null;
  this.y2label_div_ = null;
};

var createRotatedDiv = function createRotatedDiv(g, box, axis, classes, html) {
  // TODO(danvk): is this outer div actually necessary?
  var div = document.createElement("div");
  div.style.position = 'absolute';
  if (axis == 1) {
    // NOTE: this is cheating. Should be positioned relative to the box.
    div.style.left = '0px';
  } else {
    div.style.left = box.x + 'px';
  }
  div.style.top = box.y + 'px';
  div.style.width = box.w + 'px';
  div.style.height = box.h + 'px';
  div.style.fontSize = g.getOption('yLabelWidth') - 2 + 'px';

  var inner_div = document.createElement("div");
  inner_div.style.position = 'absolute';
  inner_div.style.width = box.h + 'px';
  inner_div.style.height = box.w + 'px';
  inner_div.style.top = box.h / 2 - box.w / 2 + 'px';
  inner_div.style.left = box.w / 2 - box.h / 2 + 'px';
  // TODO: combine inner_div and class_div.
  inner_div.className = 'dygraph-label-rotate-' + (axis == 1 ? 'right' : 'left');

  var class_div = document.createElement("div");
  class_div.className = classes;
  class_div.innerHTML = html;

  inner_div.appendChild(class_div);
  div.appendChild(inner_div);
  return div;
};

chart_labels.prototype.layout = function (e) {
  this.detachLabels_();

  var g = e.dygraph;
  var div = e.chart_div;
  if (g.getOption('title')) {
    // QUESTION: should this return an absolutely-positioned div instead?
    var title_rect = e.reserveSpaceTop(g.getOption('titleHeight'));
    this.title_div_ = createDivInRect(title_rect);
    this.title_div_.style.fontSize = g.getOption('titleHeight') - 8 + 'px';

    var class_div = document.createElement("div");
    class_div.className = 'dygraph-label dygraph-title';
    class_div.innerHTML = g.getOption('title');
    this.title_div_.appendChild(class_div);
    div.appendChild(this.title_div_);
  }

  if (g.getOption('xlabel')) {
    var x_rect = e.reserveSpaceBottom(g.getOption('xLabelHeight'));
    this.xlabel_div_ = createDivInRect(x_rect);
    this.xlabel_div_.style.fontSize = g.getOption('xLabelHeight') - 2 + 'px';

    var class_div = document.createElement("div");
    class_div.className = 'dygraph-label dygraph-xlabel';
    class_div.innerHTML = g.getOption('xlabel');
    this.xlabel_div_.appendChild(class_div);
    div.appendChild(this.xlabel_div_);
  }

  if (g.getOption('ylabel')) {
    // It would make sense to shift the chart here to make room for the y-axis
    // label, but the default yAxisLabelWidth is large enough that this results
    // in overly-padded charts. The y-axis label should fit fine. If it
    // doesn't, the yAxisLabelWidth option can be increased.
    var y_rect = e.reserveSpaceLeft(0);

    this.ylabel_div_ = createRotatedDiv(g, y_rect, 1, // primary (left) y-axis
    'dygraph-label dygraph-ylabel', g.getOption('ylabel'));
    div.appendChild(this.ylabel_div_);
  }

  if (g.getOption('y2label') && g.numAxes() == 2) {
    // same logic applies here as for ylabel.
    var y2_rect = e.reserveSpaceRight(0);
    this.y2label_div_ = createRotatedDiv(g, y2_rect, 2, // secondary (right) y-axis
    'dygraph-label dygraph-y2label', g.getOption('y2label'));
    div.appendChild(this.y2label_div_);
  }
};

chart_labels.prototype.didDrawChart = function (e) {
  var g = e.dygraph;
  if (this.title_div_) {
    this.title_div_.children[0].innerHTML = g.getOption('title');
  }
  if (this.xlabel_div_) {
    this.xlabel_div_.children[0].innerHTML = g.getOption('xlabel');
  }
  if (this.ylabel_div_) {
    this.ylabel_div_.children[0].children[0].innerHTML = g.getOption('ylabel');
  }
  if (this.y2label_div_) {
    this.y2label_div_.children[0].children[0].innerHTML = g.getOption('y2label');
  }
};

chart_labels.prototype.clearChart = function () {};

chart_labels.prototype.destroy = function () {
  this.detachLabels_();
};

exports["default"] = chart_labels;
module.exports = exports["default"];

},{}],23:[function(require,module,exports){
/**
 * @license
 * Copyright 2012 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */
/*global Dygraph:false */

/*

Current bits of jankiness:
- Direct layout access
- Direct area access

*/

"use strict";

/**
 * Draws the gridlines, i.e. the gray horizontal & vertical lines running the
 * length of the chart.
 *
 * @constructor
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
var grid = function grid() {};

grid.prototype.toString = function () {
  return "Gridline Plugin";
};

grid.prototype.activate = function (g) {
  return {
    willDrawChart: this.willDrawChart
  };
};

grid.prototype.willDrawChart = function (e) {
  // Draw the new X/Y grid. Lines appear crisper when pixels are rounded to
  // half-integers. This prevents them from drawing in two rows/cols.
  var g = e.dygraph;
  var ctx = e.drawingContext;
  var layout = g.layout_;
  var area = e.dygraph.plotter_.area;

  function halfUp(x) {
    return Math.round(x) + 0.5;
  }
  function halfDown(y) {
    return Math.round(y) - 0.5;
  }

  var x, y, i, ticks;
  if (g.getOptionForAxis('drawGrid', 'y')) {
    var axes = ["y", "y2"];
    var strokeStyles = [],
        lineWidths = [],
        drawGrid = [],
        stroking = [],
        strokePattern = [];
    for (var i = 0; i < axes.length; i++) {
      drawGrid[i] = g.getOptionForAxis('drawGrid', axes[i]);
      if (drawGrid[i]) {
        strokeStyles[i] = g.getOptionForAxis('gridLineColor', axes[i]);
        lineWidths[i] = g.getOptionForAxis('gridLineWidth', axes[i]);
        strokePattern[i] = g.getOptionForAxis('gridLinePattern', axes[i]);
        stroking[i] = strokePattern[i] && strokePattern[i].length >= 2;
      }
    }
    ticks = layout.yticks;
    ctx.save();
    // draw grids for the different y axes
    ticks.forEach(function (tick) {
      if (!tick.has_tick) return;
      var axis = tick.axis;
      if (drawGrid[axis]) {
        ctx.save();
        if (stroking[axis]) {
          if (ctx.setLineDash) ctx.setLineDash(strokePattern[axis]);
        }
        ctx.strokeStyle = strokeStyles[axis];
        ctx.lineWidth = lineWidths[axis];

        x = halfUp(area.x);
        y = halfDown(area.y + tick.pos * area.h);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + area.w, y);
        ctx.stroke();

        ctx.restore();
      }
    });
    ctx.restore();
  }

  // draw grid for x axis
  if (g.getOptionForAxis('drawGrid', 'x')) {
    ticks = layout.xticks;
    ctx.save();
    var strokePattern = g.getOptionForAxis('gridLinePattern', 'x');
    var stroking = strokePattern && strokePattern.length >= 2;
    if (stroking) {
      if (ctx.setLineDash) ctx.setLineDash(strokePattern);
    }
    ctx.strokeStyle = g.getOptionForAxis('gridLineColor', 'x');
    ctx.lineWidth = g.getOptionForAxis('gridLineWidth', 'x');
    ticks.forEach(function (tick) {
      if (!tick.has_tick) return;
      x = halfUp(area.x + tick.pos * area.w);
      y = halfDown(area.y + area.h);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, area.y);
      ctx.closePath();
      ctx.stroke();
    });
    if (stroking) {
      if (ctx.setLineDash) ctx.setLineDash([]);
    }
    ctx.restore();
  }
};

grid.prototype.destroy = function () {};

exports["default"] = grid;
module.exports = exports["default"];

},{}],24:[function(require,module,exports){
/**
 * @license
 * Copyright 2012 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */
/*global Dygraph:false */

/*
Current bits of jankiness:
- Uses two private APIs:
    1. Dygraph.optionsViewForAxis_
    2. dygraph.plotter_.area
- Registers for a "predraw" event, which should be renamed.
- I call calculateEmWidthInDiv more often than needed.
*/

/*global Dygraph:false */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _dygraphUtils = require('../dygraph-utils');

var utils = _interopRequireWildcard(_dygraphUtils);

/**
 * Creates the legend, which appears when the user hovers over the chart.
 * The legend can be either a user-specified or generated div.
 *
 * @constructor
 */
var Legend = function Legend() {
  this.legend_div_ = null;
  this.is_generated_div_ = false; // do we own this div, or was it user-specified?
};

Legend.prototype.toString = function () {
  return "Legend Plugin";
};

/**
 * This is called during the dygraph constructor, after options have been set
 * but before the data is available.
 *
 * Proper tasks to do here include:
 * - Reading your own options
 * - DOM manipulation
 * - Registering event listeners
 *
 * @param {Dygraph} g Graph instance.
 * @return {object.<string, function(ev)>} Mapping of event names to callbacks.
 */
Legend.prototype.activate = function (g) {
  var div;

  var userLabelsDiv = g.getOption('labelsDiv');
  if (userLabelsDiv && null !== userLabelsDiv) {
    if (typeof userLabelsDiv == "string" || userLabelsDiv instanceof String) {
      div = document.getElementById(userLabelsDiv);
    } else {
      div = userLabelsDiv;
    }
  } else {
    div = document.createElement("div");
    div.className = "dygraph-legend";
    // TODO(danvk): come up with a cleaner way to expose this.
    g.graphDiv.appendChild(div);
    this.is_generated_div_ = true;
  }

  this.legend_div_ = div;
  this.one_em_width_ = 10; // just a guess, will be updated.

  return {
    select: this.select,
    deselect: this.deselect,
    // TODO(danvk): rethink the name "predraw" before we commit to it in any API.
    predraw: this.predraw,
    didDrawChart: this.didDrawChart
  };
};

// Needed for dashed lines.
var calculateEmWidthInDiv = function calculateEmWidthInDiv(div) {
  var sizeSpan = document.createElement('span');
  sizeSpan.setAttribute('style', 'margin: 0; padding: 0 0 0 1em; border: 0;');
  div.appendChild(sizeSpan);
  var oneEmWidth = sizeSpan.offsetWidth;
  div.removeChild(sizeSpan);
  return oneEmWidth;
};

var escapeHTML = function escapeHTML(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

Legend.prototype.select = function (e) {
  var xValue = e.selectedX;
  var points = e.selectedPoints;
  var row = e.selectedRow;

  var legendMode = e.dygraph.getOption('legend');
  if (legendMode === 'never') {
    this.legend_div_.style.display = 'none';
    return;
  }

  if (legendMode === 'follow') {
    // create floating legend div
    var area = e.dygraph.plotter_.area;
    var labelsDivWidth = this.legend_div_.offsetWidth;
    var yAxisLabelWidth = e.dygraph.getOptionForAxis('axisLabelWidth', 'y');
    // determine floating [left, top] coordinates of the legend div
    // within the plotter_ area
    // offset 50 px to the right and down from the first selection point
    // 50 px is guess based on mouse cursor size
    var leftLegend = points[0].x * area.w + 50;
    var topLegend = points[0].y * area.h - 50;

    // if legend floats to end of the chart area, it flips to the other
    // side of the selection point
    if (leftLegend + labelsDivWidth + 1 > area.w) {
      leftLegend = leftLegend - 2 * 50 - labelsDivWidth - (yAxisLabelWidth - area.x);
    }

    e.dygraph.graphDiv.appendChild(this.legend_div_);
    this.legend_div_.style.left = yAxisLabelWidth + leftLegend + "px";
    this.legend_div_.style.top = topLegend + "px";
  }

  var html = Legend.generateLegendHTML(e.dygraph, xValue, points, this.one_em_width_, row);
  this.legend_div_.innerHTML = html;
  this.legend_div_.style.display = '';
};

Legend.prototype.deselect = function (e) {
  var legendMode = e.dygraph.getOption('legend');
  if (legendMode !== 'always') {
    this.legend_div_.style.display = "none";
  }

  // Have to do this every time, since styles might have changed.
  var oneEmWidth = calculateEmWidthInDiv(this.legend_div_);
  this.one_em_width_ = oneEmWidth;

  var html = Legend.generateLegendHTML(e.dygraph, undefined, undefined, oneEmWidth, null);
  this.legend_div_.innerHTML = html;
};

Legend.prototype.didDrawChart = function (e) {
  this.deselect(e);
};

// Right edge should be flush with the right edge of the charting area (which
// may not be the same as the right edge of the div, if we have two y-axes.
// TODO(danvk): is any of this really necessary? Could just set "right" in "activate".
/**
 * Position the labels div so that:
 * - its right edge is flush with the right edge of the charting area
 * - its top edge is flush with the top edge of the charting area
 * @private
 */
Legend.prototype.predraw = function (e) {
  // Don't touch a user-specified labelsDiv.
  if (!this.is_generated_div_) return;

  // TODO(danvk): only use real APIs for this.
  e.dygraph.graphDiv.appendChild(this.legend_div_);
  var area = e.dygraph.getArea();
  var labelsDivWidth = this.legend_div_.offsetWidth;
  this.legend_div_.style.left = area.x + area.w - labelsDivWidth - 1 + "px";
  this.legend_div_.style.top = area.y + "px";
};

/**
 * Called when dygraph.destroy() is called.
 * You should null out any references and detach any DOM elements.
 */
Legend.prototype.destroy = function () {
  this.legend_div_ = null;
};

/**
 * Generates HTML for the legend which is displayed when hovering over the
 * chart. If no selected points are specified, a default legend is returned
 * (this may just be the empty string).
 * @param {number} x The x-value of the selected points.
 * @param {Object} sel_points List of selected points for the given
 *   x-value. Should have properties like 'name', 'yval' and 'canvasy'.
 * @param {number} oneEmWidth The pixel width for 1em in the legend. Only
 *   relevant when displaying a legend with no selection (i.e. {legend:
 *   'always'}) and with dashed lines.
 * @param {number} row The selected row index.
 * @private
 */
Legend.generateLegendHTML = function (g, x, sel_points, oneEmWidth, row) {
  // Data about the selection to pass to legendFormatter
  var data = {
    dygraph: g,
    x: x,
    series: []
  };

  var labelToSeries = {};
  var labels = g.getLabels();
  if (labels) {
    for (var i = 1; i < labels.length; i++) {
      var series = g.getPropertiesForSeries(labels[i]);
      var strokePattern = g.getOption('strokePattern', labels[i]);
      var seriesData = {
        dashHTML: generateLegendDashHTML(strokePattern, series.color, oneEmWidth),
        label: labels[i],
        labelHTML: escapeHTML(labels[i]),
        isVisible: series.visible,
        color: series.color
      };

      data.series.push(seriesData);
      labelToSeries[labels[i]] = seriesData;
    }
  }

  if (typeof x !== 'undefined') {
    var xOptView = g.optionsViewForAxis_('x');
    var xvf = xOptView('valueFormatter');
    data.xHTML = xvf.call(g, x, xOptView, labels[0], g, row, 0);

    var yOptViews = [];
    var num_axes = g.numAxes();
    for (var i = 0; i < num_axes; i++) {
      // TODO(danvk): remove this use of a private API
      yOptViews[i] = g.optionsViewForAxis_('y' + (i ? 1 + i : ''));
    }

    var showZeros = g.getOption('labelsShowZeroValues');
    var highlightSeries = g.getHighlightSeries();
    for (i = 0; i < sel_points.length; i++) {
      var pt = sel_points[i];
      var seriesData = labelToSeries[pt.name];
      seriesData.y = pt.yval;

      if (pt.yval === 0 && !showZeros || isNaN(pt.canvasy)) {
        seriesData.isVisible = false;
        continue;
      }

      var series = g.getPropertiesForSeries(pt.name);
      var yOptView = yOptViews[series.axis - 1];
      var fmtFunc = yOptView('valueFormatter');
      var yHTML = fmtFunc.call(g, pt.yval, yOptView, pt.name, g, row, labels.indexOf(pt.name));

      utils.update(seriesData, { yHTML: yHTML });

      if (pt.name == highlightSeries) {
        seriesData.isHighlighted = true;
      }
    }
  }

  var formatter = g.getOption('legendFormatter') || Legend.defaultFormatter;
  return formatter.call(g, data);
};

Legend.defaultFormatter = function (data) {
  var g = data.dygraph;

  // TODO(danvk): deprecate this option in place of {legend: 'never'}
  // XXX should this logic be in the formatter?
  if (g.getOption('showLabelsOnHighlight') !== true) return '';

  var sepLines = g.getOption('labelsSeparateLines');
  var html;

  if (typeof data.x === 'undefined') {
    // TODO: this check is duplicated in generateLegendHTML. Put it in one place.
    if (g.getOption('legend') != 'always') {
      return '';
    }

    html = '';
    for (var i = 0; i < data.series.length; i++) {
      var series = data.series[i];
      if (!series.isVisible) continue;

      if (html !== '') html += sepLines ? '<br/>' : ' ';
      html += "<span style='font-weight: bold; color: " + series.color + ";'>" + series.dashHTML + " " + series.labelHTML + "</span>";
    }
    return html;
  }

  html = data.xHTML + ':';
  for (var i = 0; i < data.series.length; i++) {
    var series = data.series[i];
    if (!series.isVisible) continue;
    if (sepLines) html += '<br>';
    var cls = series.isHighlighted ? ' class="highlight"' : '';
    html += "<span" + cls + "> <b><span style='color: " + series.color + ";'>" + series.labelHTML + "</span></b>:&#160;" + series.yHTML + "</span>";
  }
  return html;
};

/**
 * Generates html for the "dash" displayed on the legend when using "legend: always".
 * In particular, this works for dashed lines with any stroke pattern. It will
 * try to scale the pattern to fit in 1em width. Or if small enough repeat the
 * pattern for 1em width.
 *
 * @param strokePattern The pattern
 * @param color The color of the series.
 * @param oneEmWidth The width in pixels of 1em in the legend.
 * @private
 */
// TODO(danvk): cache the results of this
function generateLegendDashHTML(strokePattern, color, oneEmWidth) {
  // Easy, common case: a solid line
  if (!strokePattern || strokePattern.length <= 1) {
    return "<div class=\"dygraph-legend-line\" style=\"border-bottom-color: " + color + ";\"></div>";
  }

  var i, j, paddingLeft, marginRight;
  var strokePixelLength = 0,
      segmentLoop = 0;
  var normalizedPattern = [];
  var loop;

  // Compute the length of the pixels including the first segment twice,
  // since we repeat it.
  for (i = 0; i <= strokePattern.length; i++) {
    strokePixelLength += strokePattern[i % strokePattern.length];
  }

  // See if we can loop the pattern by itself at least twice.
  loop = Math.floor(oneEmWidth / (strokePixelLength - strokePattern[0]));
  if (loop > 1) {
    // This pattern fits at least two times, no scaling just convert to em;
    for (i = 0; i < strokePattern.length; i++) {
      normalizedPattern[i] = strokePattern[i] / oneEmWidth;
    }
    // Since we are repeating the pattern, we don't worry about repeating the
    // first segment in one draw.
    segmentLoop = normalizedPattern.length;
  } else {
    // If the pattern doesn't fit in the legend we scale it to fit.
    loop = 1;
    for (i = 0; i < strokePattern.length; i++) {
      normalizedPattern[i] = strokePattern[i] / strokePixelLength;
    }
    // For the scaled patterns we do redraw the first segment.
    segmentLoop = normalizedPattern.length + 1;
  }

  // Now make the pattern.
  var dash = "";
  for (j = 0; j < loop; j++) {
    for (i = 0; i < segmentLoop; i += 2) {
      // The padding is the drawn segment.
      paddingLeft = normalizedPattern[i % normalizedPattern.length];
      if (i < strokePattern.length) {
        // The margin is the space segment.
        marginRight = normalizedPattern[(i + 1) % normalizedPattern.length];
      } else {
        // The repeated first segment has no right margin.
        marginRight = 0;
      }
      dash += "<div class=\"dygraph-legend-dash\" style=\"margin-right: " + marginRight + "em; padding-left: " + paddingLeft + "em;\"></div>";
    }
  }
  return dash;
};

exports["default"] = Legend;
module.exports = exports["default"];

},{"../dygraph-utils":17}],25:[function(require,module,exports){
/**
 * @license
 * Copyright 2011 Paul Felix (paul.eric.felix@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */
/*global Dygraph:false,TouchEvent:false */

/**
 * @fileoverview This file contains the RangeSelector plugin used to provide
 * a timeline range selector widget for dygraphs.
 */

/*global Dygraph:false */
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dygraphUtils = require('../dygraph-utils');

var utils = _interopRequireWildcard(_dygraphUtils);

var _dygraphInteractionModel = require('../dygraph-interaction-model');

var _dygraphInteractionModel2 = _interopRequireDefault(_dygraphInteractionModel);

var _iframeTarp = require('../iframe-tarp');

var _iframeTarp2 = _interopRequireDefault(_iframeTarp);

var rangeSelector = function rangeSelector() {
  this.hasTouchInterface_ = typeof TouchEvent != 'undefined';
  this.isMobileDevice_ = /mobile|android/gi.test(navigator.appVersion);
  this.interfaceCreated_ = false;
};

rangeSelector.prototype.toString = function () {
  return "RangeSelector Plugin";
};

rangeSelector.prototype.activate = function (dygraph) {
  this.dygraph_ = dygraph;
  if (this.getOption_('showRangeSelector')) {
    this.createInterface_();
  }
  return {
    layout: this.reserveSpace_,
    predraw: this.renderStaticLayer_,
    didDrawChart: this.renderInteractiveLayer_
  };
};

rangeSelector.prototype.destroy = function () {
  this.bgcanvas_ = null;
  this.fgcanvas_ = null;
  this.leftZoomHandle_ = null;
  this.rightZoomHandle_ = null;
};

//------------------------------------------------------------------
// Private methods
//------------------------------------------------------------------

rangeSelector.prototype.getOption_ = function (name, opt_series) {
  return this.dygraph_.getOption(name, opt_series);
};

rangeSelector.prototype.setDefaultOption_ = function (name, value) {
  this.dygraph_.attrs_[name] = value;
};

/**
 * @private
 * Creates the range selector elements and adds them to the graph.
 */
rangeSelector.prototype.createInterface_ = function () {
  this.createCanvases_();
  this.createZoomHandles_();
  this.initInteraction_();

  // Range selector and animatedZooms have a bad interaction. See issue 359.
  if (this.getOption_('animatedZooms')) {
    console.warn('Animated zooms and range selector are not compatible; disabling animatedZooms.');
    this.dygraph_.updateOptions({ animatedZooms: false }, true);
  }

  this.interfaceCreated_ = true;
  this.addToGraph_();
};

/**
 * @private
 * Adds the range selector to the graph.
 */
rangeSelector.prototype.addToGraph_ = function () {
  var graphDiv = this.graphDiv_ = this.dygraph_.graphDiv;
  graphDiv.appendChild(this.bgcanvas_);
  graphDiv.appendChild(this.fgcanvas_);
  graphDiv.appendChild(this.leftZoomHandle_);
  graphDiv.appendChild(this.rightZoomHandle_);
};

/**
 * @private
 * Removes the range selector from the graph.
 */
rangeSelector.prototype.removeFromGraph_ = function () {
  var graphDiv = this.graphDiv_;
  graphDiv.removeChild(this.bgcanvas_);
  graphDiv.removeChild(this.fgcanvas_);
  graphDiv.removeChild(this.leftZoomHandle_);
  graphDiv.removeChild(this.rightZoomHandle_);
  this.graphDiv_ = null;
};

/**
 * @private
 * Called by Layout to allow range selector to reserve its space.
 */
rangeSelector.prototype.reserveSpace_ = function (e) {
  if (this.getOption_('showRangeSelector')) {
    e.reserveSpaceBottom(this.getOption_('rangeSelectorHeight') + 4);
  }
};

/**
 * @private
 * Renders the static portion of the range selector at the predraw stage.
 */
rangeSelector.prototype.renderStaticLayer_ = function () {
  if (!this.updateVisibility_()) {
    return;
  }
  this.resize_();
  this.drawStaticLayer_();
};

/**
 * @private
 * Renders the interactive portion of the range selector after the chart has been drawn.
 */
rangeSelector.prototype.renderInteractiveLayer_ = function () {
  if (!this.updateVisibility_() || this.isChangingRange_) {
    return;
  }
  this.placeZoomHandles_();
  this.drawInteractiveLayer_();
};

/**
 * @private
 * Check to see if the range selector is enabled/disabled and update visibility accordingly.
 */
rangeSelector.prototype.updateVisibility_ = function () {
  var enabled = this.getOption_('showRangeSelector');
  if (enabled) {
    if (!this.interfaceCreated_) {
      this.createInterface_();
    } else if (!this.graphDiv_ || !this.graphDiv_.parentNode) {
      this.addToGraph_();
    }
  } else if (this.graphDiv_) {
    this.removeFromGraph_();
    var dygraph = this.dygraph_;
    setTimeout(function () {
      dygraph.width_ = 0;dygraph.resize();
    }, 1);
  }
  return enabled;
};

/**
 * @private
 * Resizes the range selector.
 */
rangeSelector.prototype.resize_ = function () {
  function setElementRect(canvas, context, rect) {
    var canvasScale = utils.getContextPixelRatio(context);

    canvas.style.top = rect.y + 'px';
    canvas.style.left = rect.x + 'px';
    canvas.width = rect.w * canvasScale;
    canvas.height = rect.h * canvasScale;
    canvas.style.width = rect.w + 'px';
    canvas.style.height = rect.h + 'px';

    if (canvasScale != 1) {
      context.scale(canvasScale, canvasScale);
    }
  }

  var plotArea = this.dygraph_.layout_.getPlotArea();

  var xAxisLabelHeight = 0;
  if (this.dygraph_.getOptionForAxis('drawAxis', 'x')) {
    xAxisLabelHeight = this.getOption_('xAxisHeight') || this.getOption_('axisLabelFontSize') + 2 * this.getOption_('axisTickSize');
  }
  this.canvasRect_ = {
    x: plotArea.x,
    y: plotArea.y + plotArea.h + xAxisLabelHeight + 4,
    w: plotArea.w,
    h: this.getOption_('rangeSelectorHeight')
  };

  setElementRect(this.bgcanvas_, this.bgcanvas_ctx_, this.canvasRect_);
  setElementRect(this.fgcanvas_, this.fgcanvas_ctx_, this.canvasRect_);
};

/**
 * @private
 * Creates the background and foreground canvases.
 */
rangeSelector.prototype.createCanvases_ = function () {
  this.bgcanvas_ = utils.createCanvas();
  this.bgcanvas_.className = 'dygraph-rangesel-bgcanvas';
  this.bgcanvas_.style.position = 'absolute';
  this.bgcanvas_.style.zIndex = 9;
  this.bgcanvas_ctx_ = utils.getContext(this.bgcanvas_);

  this.fgcanvas_ = utils.createCanvas();
  this.fgcanvas_.className = 'dygraph-rangesel-fgcanvas';
  this.fgcanvas_.style.position = 'absolute';
  this.fgcanvas_.style.zIndex = 9;
  this.fgcanvas_.style.cursor = 'default';
  this.fgcanvas_ctx_ = utils.getContext(this.fgcanvas_);
};

/**
 * @private
 * Creates the zoom handle elements.
 */
rangeSelector.prototype.createZoomHandles_ = function () {
  var img = new Image();
  img.className = 'dygraph-rangesel-zoomhandle';
  img.style.position = 'absolute';
  img.style.zIndex = 10;
  img.style.visibility = 'hidden'; // Initially hidden so they don't show up in the wrong place.
  img.style.cursor = 'col-resize';
  // TODO: change image to more options
  img.width = 9;
  img.height = 16;
  img.src = 'data:image/png;base64,' + 'iVBORw0KGgoAAAANSUhEUgAAAAkAAAAQCAYAAADESFVDAAAAAXNSR0IArs4c6QAAAAZiS0dEANAA' + 'zwDP4Z7KegAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9sHGw0cMqdt1UwAAAAZdEVYdENv' + 'bW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAaElEQVQoz+3SsRFAQBCF4Z9WJM8KCDVwownl' + '6YXsTmCUsyKGkZzcl7zkz3YLkypgAnreFmDEpHkIwVOMfpdi9CEEN2nGpFdwD03yEqDtOgCaun7s' + 'qSTDH32I1pQA2Pb9sZecAxc5r3IAb21d6878xsAAAAAASUVORK5CYII=';

  if (this.isMobileDevice_) {
    img.width *= 2;
    img.height *= 2;
  }

  this.leftZoomHandle_ = img;
  this.rightZoomHandle_ = img.cloneNode(false);
};

/**
 * @private
 * Sets up the interaction for the range selector.
 */
rangeSelector.prototype.initInteraction_ = function () {
  var self = this;
  var topElem = document;
  var clientXLast = 0;
  var handle = null;
  var isZooming = false;
  var isPanning = false;
  var dynamic = !this.isMobileDevice_;

  // We cover iframes during mouse interactions. See comments in
  // dygraph-utils.js for more info on why this is a good idea.
  var tarp = new _iframeTarp2['default']();

  // functions, defined below.  Defining them this way (rather than with
  // "function foo() {...}" makes JSHint happy.
  var toXDataWindow, onZoomStart, onZoom, onZoomEnd, doZoom, isMouseInPanZone, onPanStart, onPan, onPanEnd, doPan, onCanvasHover;

  // Touch event functions
  var onZoomHandleTouchEvent, onCanvasTouchEvent, addTouchEvents;

  toXDataWindow = function (zoomHandleStatus) {
    var xDataLimits = self.dygraph_.xAxisExtremes();
    var fact = (xDataLimits[1] - xDataLimits[0]) / self.canvasRect_.w;
    var xDataMin = xDataLimits[0] + (zoomHandleStatus.leftHandlePos - self.canvasRect_.x) * fact;
    var xDataMax = xDataLimits[0] + (zoomHandleStatus.rightHandlePos - self.canvasRect_.x) * fact;
    return [xDataMin, xDataMax];
  };

  onZoomStart = function (e) {
    utils.cancelEvent(e);
    isZooming = true;
    clientXLast = e.clientX;
    handle = e.target ? e.target : e.srcElement;
    if (e.type === 'mousedown' || e.type === 'dragstart') {
      // These events are removed manually.
      utils.addEvent(topElem, 'mousemove', onZoom);
      utils.addEvent(topElem, 'mouseup', onZoomEnd);
    }
    self.fgcanvas_.style.cursor = 'col-resize';
    tarp.cover();
    return true;
  };

  onZoom = function (e) {
    if (!isZooming) {
      return false;
    }
    utils.cancelEvent(e);

    var delX = e.clientX - clientXLast;
    if (Math.abs(delX) < 4) {
      return true;
    }
    clientXLast = e.clientX;

    // Move handle.
    var zoomHandleStatus = self.getZoomHandleStatus_();
    var newPos;
    if (handle == self.leftZoomHandle_) {
      newPos = zoomHandleStatus.leftHandlePos + delX;
      newPos = Math.min(newPos, zoomHandleStatus.rightHandlePos - handle.width - 3);
      newPos = Math.max(newPos, self.canvasRect_.x);
    } else {
      newPos = zoomHandleStatus.rightHandlePos + delX;
      newPos = Math.min(newPos, self.canvasRect_.x + self.canvasRect_.w);
      newPos = Math.max(newPos, zoomHandleStatus.leftHandlePos + handle.width + 3);
    }
    var halfHandleWidth = handle.width / 2;
    handle.style.left = newPos - halfHandleWidth + 'px';
    self.drawInteractiveLayer_();

    // Zoom on the fly.
    if (dynamic) {
      doZoom();
    }
    return true;
  };

  onZoomEnd = function (e) {
    if (!isZooming) {
      return false;
    }
    isZooming = false;
    tarp.uncover();
    utils.removeEvent(topElem, 'mousemove', onZoom);
    utils.removeEvent(topElem, 'mouseup', onZoomEnd);
    self.fgcanvas_.style.cursor = 'default';

    // If on a slower device, zoom now.
    if (!dynamic) {
      doZoom();
    }
    return true;
  };

  doZoom = function () {
    try {
      var zoomHandleStatus = self.getZoomHandleStatus_();
      self.isChangingRange_ = true;
      if (!zoomHandleStatus.isZoomed) {
        self.dygraph_.resetZoom();
      } else {
        var xDataWindow = toXDataWindow(zoomHandleStatus);
        self.dygraph_.doZoomXDates_(xDataWindow[0], xDataWindow[1]);
      }
    } finally {
      self.isChangingRange_ = false;
    }
  };

  isMouseInPanZone = function (e) {
    var rect = self.leftZoomHandle_.getBoundingClientRect();
    var leftHandleClientX = rect.left + rect.width / 2;
    rect = self.rightZoomHandle_.getBoundingClientRect();
    var rightHandleClientX = rect.left + rect.width / 2;
    return e.clientX > leftHandleClientX && e.clientX < rightHandleClientX;
  };

  onPanStart = function (e) {
    if (!isPanning && isMouseInPanZone(e) && self.getZoomHandleStatus_().isZoomed) {
      utils.cancelEvent(e);
      isPanning = true;
      clientXLast = e.clientX;
      if (e.type === 'mousedown') {
        // These events are removed manually.
        utils.addEvent(topElem, 'mousemove', onPan);
        utils.addEvent(topElem, 'mouseup', onPanEnd);
      }
      return true;
    }
    return false;
  };

  onPan = function (e) {
    if (!isPanning) {
      return false;
    }
    utils.cancelEvent(e);

    var delX = e.clientX - clientXLast;
    if (Math.abs(delX) < 4) {
      return true;
    }
    clientXLast = e.clientX;

    // Move range view
    var zoomHandleStatus = self.getZoomHandleStatus_();
    var leftHandlePos = zoomHandleStatus.leftHandlePos;
    var rightHandlePos = zoomHandleStatus.rightHandlePos;
    var rangeSize = rightHandlePos - leftHandlePos;
    if (leftHandlePos + delX <= self.canvasRect_.x) {
      leftHandlePos = self.canvasRect_.x;
      rightHandlePos = leftHandlePos + rangeSize;
    } else if (rightHandlePos + delX >= self.canvasRect_.x + self.canvasRect_.w) {
      rightHandlePos = self.canvasRect_.x + self.canvasRect_.w;
      leftHandlePos = rightHandlePos - rangeSize;
    } else {
      leftHandlePos += delX;
      rightHandlePos += delX;
    }
    var halfHandleWidth = self.leftZoomHandle_.width / 2;
    self.leftZoomHandle_.style.left = leftHandlePos - halfHandleWidth + 'px';
    self.rightZoomHandle_.style.left = rightHandlePos - halfHandleWidth + 'px';
    self.drawInteractiveLayer_();

    // Do pan on the fly.
    if (dynamic) {
      doPan();
    }
    return true;
  };

  onPanEnd = function (e) {
    if (!isPanning) {
      return false;
    }
    isPanning = false;
    utils.removeEvent(topElem, 'mousemove', onPan);
    utils.removeEvent(topElem, 'mouseup', onPanEnd);
    // If on a slower device, do pan now.
    if (!dynamic) {
      doPan();
    }
    return true;
  };

  doPan = function () {
    try {
      self.isChangingRange_ = true;
      self.dygraph_.dateWindow_ = toXDataWindow(self.getZoomHandleStatus_());
      self.dygraph_.drawGraph_(false);
    } finally {
      self.isChangingRange_ = false;
    }
  };

  onCanvasHover = function (e) {
    if (isZooming || isPanning) {
      return;
    }
    var cursor = isMouseInPanZone(e) ? 'move' : 'default';
    if (cursor != self.fgcanvas_.style.cursor) {
      self.fgcanvas_.style.cursor = cursor;
    }
  };

  onZoomHandleTouchEvent = function (e) {
    if (e.type == 'touchstart' && e.targetTouches.length == 1) {
      if (onZoomStart(e.targetTouches[0])) {
        utils.cancelEvent(e);
      }
    } else if (e.type == 'touchmove' && e.targetTouches.length == 1) {
      if (onZoom(e.targetTouches[0])) {
        utils.cancelEvent(e);
      }
    } else {
      onZoomEnd(e);
    }
  };

  onCanvasTouchEvent = function (e) {
    if (e.type == 'touchstart' && e.targetTouches.length == 1) {
      if (onPanStart(e.targetTouches[0])) {
        utils.cancelEvent(e);
      }
    } else if (e.type == 'touchmove' && e.targetTouches.length == 1) {
      if (onPan(e.targetTouches[0])) {
        utils.cancelEvent(e);
      }
    } else {
      onPanEnd(e);
    }
  };

  addTouchEvents = function (elem, fn) {
    var types = ['touchstart', 'touchend', 'touchmove', 'touchcancel'];
    for (var i = 0; i < types.length; i++) {
      self.dygraph_.addAndTrackEvent(elem, types[i], fn);
    }
  };

  this.setDefaultOption_('interactionModel', _dygraphInteractionModel2['default'].dragIsPanInteractionModel);
  this.setDefaultOption_('panEdgeFraction', 0.0001);

  var dragStartEvent = window.opera ? 'mousedown' : 'dragstart';
  this.dygraph_.addAndTrackEvent(this.leftZoomHandle_, dragStartEvent, onZoomStart);
  this.dygraph_.addAndTrackEvent(this.rightZoomHandle_, dragStartEvent, onZoomStart);

  this.dygraph_.addAndTrackEvent(this.fgcanvas_, 'mousedown', onPanStart);
  this.dygraph_.addAndTrackEvent(this.fgcanvas_, 'mousemove', onCanvasHover);

  // Touch events
  if (this.hasTouchInterface_) {
    addTouchEvents(this.leftZoomHandle_, onZoomHandleTouchEvent);
    addTouchEvents(this.rightZoomHandle_, onZoomHandleTouchEvent);
    addTouchEvents(this.fgcanvas_, onCanvasTouchEvent);
  }
};

/**
 * @private
 * Draws the static layer in the background canvas.
 */
rangeSelector.prototype.drawStaticLayer_ = function () {
  var ctx = this.bgcanvas_ctx_;
  ctx.clearRect(0, 0, this.canvasRect_.w, this.canvasRect_.h);
  try {
    this.drawMiniPlot_();
  } catch (ex) {
    console.warn(ex);
  }

  var margin = 0.5;
  this.bgcanvas_ctx_.lineWidth = this.getOption_('rangeSelectorBackgroundLineWidth');
  ctx.strokeStyle = this.getOption_('rangeSelectorBackgroundStrokeColor');
  ctx.beginPath();
  ctx.moveTo(margin, margin);
  ctx.lineTo(margin, this.canvasRect_.h - margin);
  ctx.lineTo(this.canvasRect_.w - margin, this.canvasRect_.h - margin);
  ctx.lineTo(this.canvasRect_.w - margin, margin);
  ctx.stroke();
};

/**
 * @private
 * Draws the mini plot in the background canvas.
 */
rangeSelector.prototype.drawMiniPlot_ = function () {
  var fillStyle = this.getOption_('rangeSelectorPlotFillColor');
  var fillGradientStyle = this.getOption_('rangeSelectorPlotFillGradientColor');
  var strokeStyle = this.getOption_('rangeSelectorPlotStrokeColor');
  if (!fillStyle && !strokeStyle) {
    return;
  }

  var stepPlot = this.getOption_('stepPlot');

  var combinedSeriesData = this.computeCombinedSeriesAndLimits_();
  var yRange = combinedSeriesData.yMax - combinedSeriesData.yMin;

  // Draw the mini plot.
  var ctx = this.bgcanvas_ctx_;
  var margin = 0.5;

  var xExtremes = this.dygraph_.xAxisExtremes();
  var xRange = Math.max(xExtremes[1] - xExtremes[0], 1.e-30);
  var xFact = (this.canvasRect_.w - margin) / xRange;
  var yFact = (this.canvasRect_.h - margin) / yRange;
  var canvasWidth = this.canvasRect_.w - margin;
  var canvasHeight = this.canvasRect_.h - margin;

  var prevX = null,
      prevY = null;

  ctx.beginPath();
  ctx.moveTo(margin, canvasHeight);
  for (var i = 0; i < combinedSeriesData.data.length; i++) {
    var dataPoint = combinedSeriesData.data[i];
    var x = dataPoint[0] !== null ? (dataPoint[0] - xExtremes[0]) * xFact : NaN;
    var y = dataPoint[1] !== null ? canvasHeight - (dataPoint[1] - combinedSeriesData.yMin) * yFact : NaN;

    // Skip points that don't change the x-value. Overly fine-grained points
    // can cause major slowdowns with the ctx.fill() call below.
    if (!stepPlot && prevX !== null && Math.round(x) == Math.round(prevX)) {
      continue;
    }

    if (isFinite(x) && isFinite(y)) {
      if (prevX === null) {
        ctx.lineTo(x, canvasHeight);
      } else if (stepPlot) {
        ctx.lineTo(x, prevY);
      }
      ctx.lineTo(x, y);
      prevX = x;
      prevY = y;
    } else {
      if (prevX !== null) {
        if (stepPlot) {
          ctx.lineTo(x, prevY);
          ctx.lineTo(x, canvasHeight);
        } else {
          ctx.lineTo(prevX, canvasHeight);
        }
      }
      prevX = prevY = null;
    }
  }
  ctx.lineTo(canvasWidth, canvasHeight);
  ctx.closePath();

  if (fillStyle) {
    var lingrad = this.bgcanvas_ctx_.createLinearGradient(0, 0, 0, canvasHeight);
    if (fillGradientStyle) {
      lingrad.addColorStop(0, fillGradientStyle);
    }
    lingrad.addColorStop(1, fillStyle);
    this.bgcanvas_ctx_.fillStyle = lingrad;
    ctx.fill();
  }

  if (strokeStyle) {
    this.bgcanvas_ctx_.strokeStyle = strokeStyle;
    this.bgcanvas_ctx_.lineWidth = this.getOption_('rangeSelectorPlotLineWidth');
    ctx.stroke();
  }
};

/**
 * @private
 * Computes and returns the combined series data along with min/max for the mini plot.
 * The combined series consists of averaged values for all series.
 * When series have error bars, the error bars are ignored.
 * @return {Object} An object containing combined series array, ymin, ymax.
 */
rangeSelector.prototype.computeCombinedSeriesAndLimits_ = function () {
  var g = this.dygraph_;
  var logscale = this.getOption_('logscale');
  var i;

  // Select series to combine. By default, all series are combined.
  var numColumns = g.numColumns();
  var labels = g.getLabels();
  var includeSeries = new Array(numColumns);
  var anySet = false;
  var visibility = g.visibility();
  var inclusion = [];

  for (i = 1; i < numColumns; i++) {
    var include = this.getOption_('showInRangeSelector', labels[i]);
    inclusion.push(include);
    if (include !== null) anySet = true; // it's set explicitly for this series
  }

  if (anySet) {
    for (i = 1; i < numColumns; i++) {
      includeSeries[i] = inclusion[i - 1];
    }
  } else {
    for (i = 1; i < numColumns; i++) {
      includeSeries[i] = visibility[i - 1];
    }
  }

  // Create a combined series (average of selected series values).
  // TODO(danvk): short-circuit if there's only one series.
  var rolledSeries = [];
  var dataHandler = g.dataHandler_;
  var options = g.attributes_;
  for (i = 1; i < g.numColumns(); i++) {
    if (!includeSeries[i]) continue;
    var series = dataHandler.extractSeries(g.rawData_, i, options);
    if (g.rollPeriod() > 1) {
      series = dataHandler.rollingAverage(series, g.rollPeriod(), options);
    }

    rolledSeries.push(series);
  }

  var combinedSeries = [];
  for (i = 0; i < rolledSeries[0].length; i++) {
    var sum = 0;
    var count = 0;
    for (var j = 0; j < rolledSeries.length; j++) {
      var y = rolledSeries[j][i][1];
      if (y === null || isNaN(y)) continue;
      count++;
      sum += y;
    }
    combinedSeries.push([rolledSeries[0][i][0], sum / count]);
  }

  // Compute the y range.
  var yMin = Number.MAX_VALUE;
  var yMax = -Number.MAX_VALUE;
  for (i = 0; i < combinedSeries.length; i++) {
    var yVal = combinedSeries[i][1];
    if (yVal !== null && isFinite(yVal) && (!logscale || yVal > 0)) {
      yMin = Math.min(yMin, yVal);
      yMax = Math.max(yMax, yVal);
    }
  }

  // Convert Y data to log scale if needed.
  // Also, expand the Y range to compress the mini plot a little.
  var extraPercent = 0.25;
  if (logscale) {
    yMax = utils.log10(yMax);
    yMax += yMax * extraPercent;
    yMin = utils.log10(yMin);
    for (i = 0; i < combinedSeries.length; i++) {
      combinedSeries[i][1] = utils.log10(combinedSeries[i][1]);
    }
  } else {
    var yExtra;
    var yRange = yMax - yMin;
    if (yRange <= Number.MIN_VALUE) {
      yExtra = yMax * extraPercent;
    } else {
      yExtra = yRange * extraPercent;
    }
    yMax += yExtra;
    yMin -= yExtra;
  }

  return { data: combinedSeries, yMin: yMin, yMax: yMax };
};

/**
 * @private
 * Places the zoom handles in the proper position based on the current X data window.
 */
rangeSelector.prototype.placeZoomHandles_ = function () {
  var xExtremes = this.dygraph_.xAxisExtremes();
  var xWindowLimits = this.dygraph_.xAxisRange();
  var xRange = xExtremes[1] - xExtremes[0];
  var leftPercent = Math.max(0, (xWindowLimits[0] - xExtremes[0]) / xRange);
  var rightPercent = Math.max(0, (xExtremes[1] - xWindowLimits[1]) / xRange);
  var leftCoord = this.canvasRect_.x + this.canvasRect_.w * leftPercent;
  var rightCoord = this.canvasRect_.x + this.canvasRect_.w * (1 - rightPercent);
  var handleTop = Math.max(this.canvasRect_.y, this.canvasRect_.y + (this.canvasRect_.h - this.leftZoomHandle_.height) / 2);
  var halfHandleWidth = this.leftZoomHandle_.width / 2;
  this.leftZoomHandle_.style.left = leftCoord - halfHandleWidth + 'px';
  this.leftZoomHandle_.style.top = handleTop + 'px';
  this.rightZoomHandle_.style.left = rightCoord - halfHandleWidth + 'px';
  this.rightZoomHandle_.style.top = this.leftZoomHandle_.style.top;

  this.leftZoomHandle_.style.visibility = 'visible';
  this.rightZoomHandle_.style.visibility = 'visible';
};

/**
 * @private
 * Draws the interactive layer in the foreground canvas.
 */
rangeSelector.prototype.drawInteractiveLayer_ = function () {
  var ctx = this.fgcanvas_ctx_;
  ctx.clearRect(0, 0, this.canvasRect_.w, this.canvasRect_.h);
  var margin = 1;
  var width = this.canvasRect_.w - margin;
  var height = this.canvasRect_.h - margin;
  var zoomHandleStatus = this.getZoomHandleStatus_();

  ctx.strokeStyle = this.getOption_('rangeSelectorForegroundStrokeColor');
  ctx.lineWidth = this.getOption_('rangeSelectorForegroundLineWidth');
  if (!zoomHandleStatus.isZoomed) {
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, height);
    ctx.lineTo(width, height);
    ctx.lineTo(width, margin);
    ctx.stroke();
  } else {
    var leftHandleCanvasPos = Math.max(margin, zoomHandleStatus.leftHandlePos - this.canvasRect_.x);
    var rightHandleCanvasPos = Math.min(width, zoomHandleStatus.rightHandlePos - this.canvasRect_.x);

    ctx.fillStyle = 'rgba(240, 240, 240, ' + this.getOption_('rangeSelectorAlpha').toString() + ')';
    ctx.fillRect(0, 0, leftHandleCanvasPos, this.canvasRect_.h);
    ctx.fillRect(rightHandleCanvasPos, 0, this.canvasRect_.w - rightHandleCanvasPos, this.canvasRect_.h);

    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(leftHandleCanvasPos, margin);
    ctx.lineTo(leftHandleCanvasPos, height);
    ctx.lineTo(rightHandleCanvasPos, height);
    ctx.lineTo(rightHandleCanvasPos, margin);
    ctx.lineTo(width, margin);
    ctx.stroke();
  }
};

/**
 * @private
 * Returns the current zoom handle position information.
 * @return {Object} The zoom handle status.
 */
rangeSelector.prototype.getZoomHandleStatus_ = function () {
  var halfHandleWidth = this.leftZoomHandle_.width / 2;
  var leftHandlePos = parseFloat(this.leftZoomHandle_.style.left) + halfHandleWidth;
  var rightHandlePos = parseFloat(this.rightZoomHandle_.style.left) + halfHandleWidth;
  return {
    leftHandlePos: leftHandlePos,
    rightHandlePos: rightHandlePos,
    isZoomed: leftHandlePos - 1 > this.canvasRect_.x || rightHandlePos + 1 < this.canvasRect_.x + this.canvasRect_.w
  };
};

exports['default'] = rangeSelector;
module.exports = exports['default'];

},{"../dygraph-interaction-model":12,"../dygraph-utils":17,"../iframe-tarp":19}]},{},[18])(18)
});
//# sourceMappingURL=dygraph.js.map
