import { defaults as defaults$3, Element, canvasHelpers, elements, helpers as helpers$2, controllers, scaleService, LinearScaleBase, Tooltip } from 'chart.js';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
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

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// See <http://en.wikipedia.org/wiki/Kernel_(statistics)>.
function gaussian(u) {
  return 1 / Math.sqrt(2 * Math.PI) * Math.exp(-.5 * u * u);
}

// Welford's algorithm.
function mean(x) {
  var n = x.length;
  if (n === 0) return NaN;
  var m = 0,
      i = -1;

  while (++i < n) {
    m += (x[i] - m) / (i + 1);
  }

  return m;
}

// Also known as the sample variance, where the denominator is n - 1.

function variance(x) {
  var n = x.length;
  if (n < 1) return NaN;
  if (n === 1) return 0;
  var mean$1 = mean(x),
      i = -1,
      s = 0;

  while (++i < n) {
    var v = x[i] - mean$1;
    s += v * v;
  }

  return s / (n - 1);
}

function ascending(a, b) {
  return a - b;
}

function quantiles(d, quantiles) {
  d = d.slice().sort(ascending);
  var n_1 = d.length - 1;
  return quantiles.map(function (q) {
    if (q === 0) return d[0];else if (q === 1) return d[n_1];
    var index = 1 + q * n_1,
        lo = Math.floor(index),
        h = index - lo,
        a = d[lo - 1];
    return h === 0 ? a : a + h * (d[lo] - a);
  });
}

function iqr(x) {
  var quartiles = quantiles(x, [.25, .75]);
  return quartiles[1] - quartiles[0];
}

// Visualization. Wiley.

function nrd(x) {
  var h = iqr(x) / 1.34;
  return 1.06 * Math.min(Math.sqrt(variance(x)), h) * Math.pow(x.length, -1 / 5);
}

function functor(v) {
  return typeof v === "function" ? v : function () {
    return v;
  };
}

function kde() {
  var kernel = gaussian,
      sample = [],
      bandwidth = nrd;

  function kde(points, i) {
    var bw = bandwidth.call(this, sample);
    return points.map(function (x) {
      var i = -1,
          y = 0,
          n = sample.length;

      while (++i < n) {
        y += kernel((x - sample[i]) / bw);
      }

      return [x, y / bw / n];
    });
  }

  kde.kernel = function (x) {
    if (!arguments.length) return kernel;
    kernel = x;
    return kde;
  };

  kde.sample = function (x) {
    if (!arguments.length) return sample;
    sample = x;
    return kde;
  };

  kde.bandwidth = function (x) {
    if (!arguments.length) return bandwidth;
    bandwidth = functor(x);
    return kde;
  };

  return kde;
}

// https://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population

function quantilesType7(arr) {
  var n1 = arr.length - 1;

  var compute = function compute(q) {
    var index = 1 + q * n1;
    var lo = Math.floor(index);
    var h = index - lo;
    var a = arr[lo - 1];
    return h === 0 ? a : a + h * (arr[lo] - a);
  };

  return {
    min: arr[0],
    q1: compute(0.25),
    median: compute(0.5),
    q3: compute(0.75),
    max: arr[n1]
  };
}
/**
 * The hinges equal the quartiles for odd n (where n <- length(x))
 * and differ for even n. Whereas the quartiles only equal observations
 * for n %% 4 == 1 (n = 1 mod 4), the hinges do so additionally
 * for n %% 4 == 2 (n = 2 mod 4), and are in the middle of
 * two observations otherwise.
 * @param {number[]} arr sorted array
 */

function fivenum(arr) {
  // based on R fivenum
  var n = arr.length; // assuming R 1 index system, so arr[1] is the first element

  var n4 = Math.floor((n + 3) / 2) / 2;

  var compute = function compute(d) {
    return 0.5 * (arr[Math.floor(d) - 1] + arr[Math.ceil(d) - 1]);
  };

  return {
    min: arr[0],
    q1: compute(n4),
    median: compute((n + 1) / 2),
    q3: compute(n + 1 - n4),
    max: arr[n - 1]
  };
}
/**
 * compute the whiskers
 * @param boxplot
 * @param {number[]} arr sorted array
 * @param {number} coef
 */

function whiskers(boxplot, arr) {
  var coef = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.5;
  var iqr = boxplot.q3 - boxplot.q1; // since top left is max

  var coefValid = typeof coef === 'number' && coef > 0;
  var whiskerMin = coefValid ? Math.max(boxplot.min, boxplot.q1 - coef * iqr) : boxplot.min;
  var whiskerMax = coefValid ? Math.min(boxplot.max, boxplot.q3 + coef * iqr) : boxplot.max;

  if (Array.isArray(arr)) {
    // compute the closest real element
    for (var i = 0; i < arr.length; i++) {
      var v = arr[i];

      if (v >= whiskerMin) {
        whiskerMin = v;
        break;
      }
    }

    for (var _i = arr.length - 1; _i >= 0; _i--) {
      var _v = arr[_i];

      if (_v <= whiskerMax) {
        whiskerMax = _v;
        break;
      }
    }
  }

  return {
    whiskerMin: whiskerMin,
    whiskerMax: whiskerMax
  };
}
var defaultStatsOptions = {
  coef: 1.5,
  quantiles: 7
};

function determineStatsOptions(options) {
  var coef = options == null || typeof options.coef !== 'number' ? defaultStatsOptions.coef : options.coef;
  var q = options == null ? null : options.quantiles;
  var quantiles = typeof q === 'function' ? q : q === 'hinges' || q === 'fivenum' ? fivenum : quantilesType7;
  return {
    coef: coef,
    quantiles: quantiles
  };
}

function boxplotStats(arr, options) {
  // console.assert(Array.isArray(arr));
  if (arr.length === 0) {
    return {
      min: NaN,
      max: NaN,
      median: NaN,
      q1: NaN,
      q3: NaN,
      whiskerMin: NaN,
      whiskerMax: NaN,
      outliers: []
    };
  }

  arr = arr.filter(function (v) {
    return typeof v === 'number' && !isNaN(v);
  });
  arr.sort(function (a, b) {
    return a - b;
  });

  var _determineStatsOption = determineStatsOptions(options),
      quantiles = _determineStatsOption.quantiles,
      coef = _determineStatsOption.coef;

  var stats = quantiles(arr);

  var _whiskers = whiskers(stats, arr, coef),
      whiskerMin = _whiskers.whiskerMin,
      whiskerMax = _whiskers.whiskerMax;

  stats.outliers = arr.filter(function (v) {
    return v < whiskerMin || v > whiskerMax;
  });
  stats.whiskerMin = whiskerMin;
  stats.whiskerMax = whiskerMax;
  return stats;
}
function violinStats(arr, options) {
  // console.assert(Array.isArray(arr));
  if (arr.length === 0) {
    return {};
  }

  arr = arr.filter(function (v) {
    return typeof v === 'number' && !isNaN(v);
  });
  arr.sort(function (a, b) {
    return a - b;
  });

  var _determineStatsOption2 = determineStatsOptions(options),
      quantiles = _determineStatsOption2.quantiles;

  var stats = quantiles(arr);
  stats.kde = kde().sample(arr);
  return stats;
}
function asBoxPlotStats(value, options) {
  if (!value) {
    return null;
  }

  if (typeof value.median === 'number' && typeof value.q1 === 'number' && typeof value.q3 === 'number') {
    // sounds good, check for helper
    if (typeof value.whiskerMin === 'undefined') {
      var _determineStatsOption3 = determineStatsOptions(options),
          coef = _determineStatsOption3.coef;

      var _whiskers2 = whiskers(value, Array.isArray(value.items) ? value.items.slice().sort(function (a, b) {
        return a - b;
      }) : null, coef),
          whiskerMin = _whiskers2.whiskerMin,
          whiskerMax = _whiskers2.whiskerMax;

      value.whiskerMin = whiskerMin;
      value.whiskerMax = whiskerMax;
    }

    return value;
  }

  if (!Array.isArray(value)) {
    return undefined;
  }

  if (value.__stats === undefined) {
    value.__stats = boxplotStats(value, options);
  }

  return value.__stats;
}
function asViolinStats(value, options) {
  if (!value) {
    return null;
  }

  if (typeof value.median === 'number' && (typeof value.kde === 'function' || Array.isArray(value.coords))) {
    return value;
  }

  if (!Array.isArray(value)) {
    return undefined;
  }

  if (value.__kde === undefined) {
    value.__kde = violinStats(value, options);
  }

  return value.__kde;
}
function asValueStats(value, minStats, maxStats, options) {
  if (typeof value[minStats] === 'number' && typeof value[maxStats] === 'number') {
    return value;
  }

  if (!Array.isArray(value) || value.length === 0) {
    return undefined;
  }

  return asBoxPlotStats(value, options);
}
function getRightValue(rawValue, options) {
  if (!rawValue) {
    return rawValue;
  }

  if (typeof rawValue === 'number' || typeof rawValue === 'string') {
    return Number(rawValue);
  }

  var b = asBoxPlotStats(rawValue, options);
  return b ? b.median : rawValue;
}
var commonScaleOptions = {
  ticks: _objectSpread2({
    minStats: 'min',
    maxStats: 'max'
  }, defaultStatsOptions)
};
function commonDataLimits(extraCallback) {
  var _this = this;

  var chart = this.chart;
  var isHorizontal = this.isHorizontal();
  var _this$options$ticks = this.options.ticks,
      minStats = _this$options$ticks.minStats,
      maxStats = _this$options$ticks.maxStats;

  var matchID = function matchID(meta) {
    return isHorizontal ? meta.xAxisID === _this.id : meta.yAxisID === _this.id;
  }; // First Calculate the range


  this.min = null;
  this.max = null; // Regular charts use x, y values
  // For the boxplot chart we have rawValue.min and rawValue.max for each point

  chart.data.datasets.forEach(function (d, i) {
    var meta = chart.getDatasetMeta(i);

    if (!chart.isDatasetVisible(i) || !matchID(meta)) {
      return;
    }

    d.data.forEach(function (value, j) {
      if (value == null || meta.data[j].hidden) {
        return;
      }

      var stats = asValueStats(value, minStats, maxStats, _this.options.ticks);
      var minValue;
      var maxValue;

      if (stats) {
        minValue = stats[minStats];
        maxValue = stats[maxStats];
      } else {
        // if stats are not available use the plain value
        var parsed = +_this.getRightValue(value);

        if (isNaN(parsed)) {
          return;
        }

        minValue = maxValue = parsed;
      }

      if (_this.min === null || minValue < _this.min) {
        _this.min = minValue;
      }

      if (_this.max === null || maxValue > _this.max) {
        _this.max = maxValue;
      }

      if (extraCallback) {
        extraCallback(stats);
      }
    });
  });
}
function rnd(seed) {
  // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
  if (seed === undefined) {
    seed = Date.now();
  }

  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

var defaults = _objectSpread2(_objectSpread2({}, defaults$3.global.elements.rectangle), {}, {
  borderWidth: 1,
  outlierRadius: 2,
  outlierColor: defaults$3.global.elements.rectangle.backgroundColor,
  lowerColor: defaults$3.global.elements.rectangle.lowerColor,
  medianColor: null,
  itemRadius: 0,
  itemStyle: 'circle',
  itemBackgroundColor: defaults$3.global.elements.rectangle.backgroundColor,
  itemBorderColor: defaults$3.global.elements.rectangle.borderColor,
  hitPadding: 2,
  outlierHitRadius: 4,
  tooltipDecimals: 2
});
var ArrayElementBase = Element.extend({
  isVertical: function isVertical() {
    return this._view.width !== undefined;
  },
  draw: function draw() {// abstract
  },
  _drawItems: function _drawItems(vm, container, ctx, vert) {
    if (vm.itemRadius <= 0 || !container.items || container.items.length <= 0) {
      return;
    }

    ctx.save();
    ctx.strokeStyle = vm.itemBorderColor;
    ctx.fillStyle = vm.itemBackgroundColor; // jitter based on random data
    // use the datesetindex and index to initialize the random number generator

    var random = rnd(this._datasetIndex * 1000 + this._index);

    if (vert) {
      container.items.forEach(function (v) {
        canvasHelpers.drawPoint(ctx, vm.itemStyle, vm.itemRadius, vm.x - vm.width / 2 + random() * vm.width, v);
      });
    } else {
      container.items.forEach(function (v) {
        canvasHelpers.drawPoint(ctx, vm.itemStyle, vm.itemRadius, v, vm.y - vm.height / 2 + random() * vm.height);
      });
    }

    ctx.restore();
  },
  _drawOutliers: function _drawOutliers(vm, container, ctx, vert) {
    if (vm.outlierRadius <= 0 || !container.outliers || container.outliers.length === 0) {
      return;
    }

    ctx.fillStyle = vm.outlierColor;
    ctx.beginPath();

    if (vert) {
      container.outliers.forEach(function (v) {
        ctx.arc(vm.x, v, vm.outlierRadius, 0, Math.PI * 2);
      });
    } else {
      container.outliers.forEach(function (v) {
        ctx.arc(v, vm.y, vm.outlierRadius, 0, Math.PI * 2);
      });
    }

    ctx.fill();
    ctx.closePath();
  },
  _getBounds: function _getBounds() {
    // abstract
    return {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
  },
  _getHitBounds: function _getHitBounds() {
    var padding = this._view.hitPadding;

    var b = this._getBounds();

    return {
      left: b.left - padding,
      top: b.top - padding,
      right: b.right + padding,
      bottom: b.bottom + padding
    };
  },
  height: function height() {
    return 0; // abstract
  },
  inRange: function inRange(mouseX, mouseY) {
    if (!this._view) {
      return false;
    }

    return this._boxInRange(mouseX, mouseY) || this._outlierIndexInRange(mouseX, mouseY) >= 0;
  },
  inLabelRange: function inLabelRange(mouseX, mouseY) {
    if (!this._view) {
      return false;
    }

    var bounds = this._getHitBounds();

    if (this.isVertical()) {
      return mouseX >= bounds.left && mouseX <= bounds.right;
    }

    return mouseY >= bounds.top && mouseY <= bounds.bottom;
  },
  inXRange: function inXRange(mouseX) {
    var bounds = this._getHitBounds();

    return mouseX >= bounds.left && mouseX <= bounds.right;
  },
  inYRange: function inYRange(mouseY) {
    var bounds = this._getHitBounds();

    return mouseY >= bounds.top && mouseY <= bounds.bottom;
  },
  _outlierIndexInRange: function _outlierIndexInRange(mouseX, mouseY) {
    var vm = this._view;
    var hitRadius = vm.outlierHitRadius;

    var outliers = this._getOutliers();

    var vertical = this.isVertical(); // check if along the outlier line

    if (vertical && Math.abs(mouseX - vm.x) > hitRadius || !vertical && Math.abs(mouseY - vm.y) > hitRadius) {
      return -1;
    }

    var toCompare = vertical ? mouseY : mouseX;

    for (var i = 0; i < outliers.length; i++) {
      if (Math.abs(outliers[i] - toCompare) <= hitRadius) {
        return i;
      }
    }

    return -1;
  },
  _boxInRange: function _boxInRange(mouseX, mouseY) {
    var bounds = this._getHitBounds();

    return mouseX >= bounds.left && mouseX <= bounds.right && mouseY >= bounds.top && mouseY <= bounds.bottom;
  },
  getCenterPoint: function getCenterPoint() {
    var _this$_view = this._view,
        x = _this$_view.x,
        y = _this$_view.y;
    return {
      x: x,
      y: y
    };
  },
  getArea: function getArea() {
    return 0; // abstract
  },
  _getOutliers: function _getOutliers() {
    return []; // abstract
  },
  tooltipPosition: function tooltipPosition(eventPosition, tooltip) {
    if (!eventPosition) {
      // fallback
      return this.getCenterPoint();
    }

    delete tooltip._tooltipOutlier;
    var vm = this._view;

    var index = this._outlierIndexInRange(eventPosition.x, eventPosition.y);

    if (index < 0) {
      return this.getCenterPoint();
    }

    tooltip._tooltipOutlier = index;

    if (this.isVertical()) {
      return {
        x: vm.x,
        y: this._getOutliers()[index]
      };
    }

    return {
      x: this._getOutliers()[index],
      y: vm.y
    };
  }
});

defaults$3.global.elements.boxandwhiskers = _objectSpread2({}, defaults);

function transitionBoxPlot(start, view, model, ease) {
  var keys = Object.keys(model);

  for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
    var key = _keys[_i];
    var target = model[key];
    var origin = start[key];

    if (origin === target) {
      continue;
    }

    if (typeof target === 'number') {
      view[key] = origin + (target - origin) * ease;
      continue;
    }

    if (Array.isArray(target)) {
      var v = view[key];
      var common = Math.min(target.length, origin.length);

      for (var i = 0; i < common; ++i) {
        v[i] = origin[i] + (target[i] - origin[i]) * ease;
      }
    }
  }
}

var BoxAndWiskers = elements.BoxAndWhiskers = ArrayElementBase.extend({
  transition: function transition(ease) {
    var r = Element.prototype.transition.call(this, ease);
    var model = this._model;
    var start = this._start;
    var view = this._view; // No animation -> No Transition

    if (!model || ease === 1) {
      return r;
    }

    if (start.boxplot == null) {
      return r; // model === view -> not copied
    } // create deep copy to avoid alternation


    if (model.boxplot === view.boxplot) {
      view.boxplot = helpers$2.clone(view.boxplot);
    }

    transitionBoxPlot(start.boxplot, view.boxplot, model.boxplot, ease);
    return r;
  },
  draw: function draw() {
    var ctx = this._chart.ctx;
    var vm = this._view;
    var boxplot = vm.boxplot;
    var vert = this.isVertical();
    ctx.save();
    ctx.fillStyle = vm.backgroundColor;
    ctx.strokeStyle = vm.borderColor;
    ctx.lineWidth = vm.borderWidth;

    this._drawBoxPlot(vm, boxplot, ctx, vert);

    this._drawOutliers(vm, boxplot, ctx, vert);

    ctx.restore();

    this._drawItems(vm, boxplot, ctx, vert);
  },
  _drawBoxPlot: function _drawBoxPlot(vm, boxplot, ctx, vert) {
    if (vert) {
      this._drawBoxPlotVert(vm, boxplot, ctx);
    } else {
      this._drawBoxPlotHoriz(vm, boxplot, ctx);
    }
  },
  _drawBoxPlotVert: function _drawBoxPlotVert(vm, boxplot, ctx) {
    var x = vm.x;
    var width = vm.width;
    var x0 = x - width / 2; // Draw the q1>q3 box

    if (boxplot.q3 > boxplot.q1) {
      ctx.fillRect(x0, boxplot.q1, width, boxplot.q3 - boxplot.q1);
    } else {
      ctx.fillRect(x0, boxplot.q3, width, boxplot.q1 - boxplot.q3);
    } // Draw the median line


    ctx.save();

    if (vm.medianColor) {
      ctx.strokeStyle = vm.medianColor;
    }

    ctx.beginPath();
    ctx.moveTo(x0, boxplot.median);
    ctx.lineTo(x0 + width, boxplot.median);
    ctx.closePath();
    ctx.stroke(); // Draw the segment line

    if (boxplot.segment != null) {
      if (vm.segmentColor) {
        ctx.strokeStyle = vm.segmentColor;
      }

      ctx.beginPath();
      ctx.moveTo(x0, boxplot.segment);
      ctx.lineTo(x0 + width, boxplot.segment);
      ctx.closePath();
    } // fill the part below the median with lowerColor


    if (vm.lowerColor) {
      ctx.fillStyle = vm.lowerColor;

      if (boxplot.q3 > boxplot.q1) {
        ctx.fillRect(x0, boxplot.median, width, boxplot.q3 - boxplot.median);
      } else {
        ctx.fillRect(x0, boxplot.median, width, boxplot.q1 - boxplot.median);
      }
    }

    ctx.closePath();
    ctx.stroke();
    ctx.restore(); // Draw the border around the main q1>q3 box

    if (boxplot.q3 > boxplot.q1) {
      ctx.strokeRect(x0, boxplot.q1, width, boxplot.q3 - boxplot.q1);
    } else {
      ctx.strokeRect(x0, boxplot.q3, width, boxplot.q1 - boxplot.q3);
    } // Draw the whiskers


    ctx.beginPath();
    ctx.moveTo(x0, boxplot.whiskerMin);
    ctx.lineTo(x0 + width, boxplot.whiskerMin);
    ctx.moveTo(x, boxplot.whiskerMin);
    ctx.lineTo(x, boxplot.q1);
    ctx.moveTo(x0, boxplot.whiskerMax);
    ctx.lineTo(x0 + width, boxplot.whiskerMax);
    ctx.moveTo(x, boxplot.whiskerMax);
    ctx.lineTo(x, boxplot.q3);
    ctx.closePath();
    ctx.stroke();
  },
  _drawBoxPlotHoriz: function _drawBoxPlotHoriz(vm, boxplot, ctx) {
    var y = vm.y;
    var height = vm.height;
    var y0 = y - height / 2; // Draw the q1>q3 box

    if (boxplot.q3 > boxplot.q1) {
      ctx.fillRect(boxplot.q1, y0, boxplot.q3 - boxplot.q1, height);
    } else {
      ctx.fillRect(boxplot.q3, y0, boxplot.q1 - boxplot.q3, height);
    } // Draw the median line


    ctx.save();

    if (vm.medianColor) {
      ctx.strokeStyle = vm.medianColor;
    }

    ctx.beginPath();
    ctx.moveTo(boxplot.median, y0);
    ctx.lineTo(boxplot.median, y0 + height);
    ctx.closePath();
    ctx.stroke();
    ctx.restore(); // Draw the border around the main q1>q3 box

    if (boxplot.q3 > boxplot.q1) {
      ctx.strokeRect(boxplot.q1, y0, boxplot.q3 - boxplot.q1, height);
    } else {
      ctx.strokeRect(boxplot.q3, y0, boxplot.q1 - boxplot.q3, height);
    } // Draw the whiskers


    ctx.beginPath();
    ctx.moveTo(boxplot.whiskerMin, y0);
    ctx.lineTo(boxplot.whiskerMin, y0 + height);
    ctx.moveTo(boxplot.whiskerMin, y);
    ctx.lineTo(boxplot.q1, y);
    ctx.moveTo(boxplot.whiskerMax, y0);
    ctx.lineTo(boxplot.whiskerMax, y0 + height);
    ctx.moveTo(boxplot.whiskerMax, y);
    ctx.lineTo(boxplot.q3, y);
    ctx.closePath();
    ctx.stroke();
  },
  _getBounds: function _getBounds() {
    var vm = this._view;
    var vert = this.isVertical();
    var boxplot = vm.boxplot;

    if (!boxplot) {
      return {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
    }

    if (vert) {
      var x = vm.x,
          width = vm.width;
      var x0 = x - width / 2;
      return {
        left: x0,
        top: boxplot.whiskerMax,
        right: x0 + width,
        bottom: boxplot.whiskerMin
      };
    }

    var y = vm.y,
        height = vm.height;
    var y0 = y - height / 2;
    return {
      left: boxplot.whiskerMin,
      top: y0,
      right: boxplot.whiskerMax,
      bottom: y0 + height
    };
  },
  height: function height() {
    var vm = this._view;
    return vm.base - Math.min(vm.boxplot.q1, vm.boxplot.q3);
  },
  getArea: function getArea() {
    var vm = this._view;
    var iqr = Math.abs(vm.boxplot.q3 - vm.boxplot.q1);

    if (this.isVertical()) {
      return iqr * vm.width;
    }

    return iqr * vm.height;
  },
  _getOutliers: function _getOutliers() {
    return this._view.boxplot ? this._view.boxplot.outliers || [] : [];
  }
});

defaults$3.global.elements.violin = _objectSpread2({
  points: 100
}, defaults);

function transitionViolin(start, view, model, ease) {
  var keys = Object.keys(model);

  for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
    var key = _keys[_i];
    var target = model[key];
    var origin = start[key];

    if (origin === target) {
      continue;
    }

    if (typeof target === 'number') {
      view[key] = origin + (target - origin) * ease;
      continue;
    }

    if (key === 'coords') {
      var v = view[key];
      var common = Math.min(target.length, origin.length);

      for (var i = 0; i < common; ++i) {
        v[i].v = origin[i].v + (target[i].v - origin[i].v) * ease;
        v[i].estimate = origin[i].estimate + (target[i].estimate - origin[i].estimate) * ease;
      }
    }
  }
}

var Violin = elements.Violin = ArrayElementBase.extend({
  transition: function transition(ease) {
    var r = Element.prototype.transition.call(this, ease);
    var model = this._model;
    var start = this._start;
    var view = this._view; // No animation -> No Transition

    if (!model || ease === 1) {
      return r;
    }

    if (start.violin == null) {
      return r; // model === view -> not copied
    } // create deep copy to avoid alternation


    if (model.violin === view.violin) {
      view.violin = helpers$2.clone(view.violin);
    }

    transitionViolin(start.violin, view.violin, model.violin, ease);
    return r;
  },
  draw: function draw() {
    var ctx = this._chart.ctx;
    var vm = this._view;
    var violin = vm.violin;
    var vert = this.isVertical();
    ctx.save();
    ctx.fillStyle = vm.backgroundColor;
    ctx.strokeStyle = vm.borderColor;
    ctx.lineWidth = vm.borderWidth;
    var coords = violin.coords;
    canvasHelpers.drawPoint(ctx, 'rectRot', 5, vm.x, vm.y);
    ctx.stroke();
    ctx.beginPath();

    if (vert) {
      var x = vm.x;
      var width = vm.width;
      var factor = width / 2 / violin.maxEstimate;
      ctx.moveTo(x, violin.min);
      coords.forEach(function (_ref) {
        var v = _ref.v,
            estimate = _ref.estimate;
        ctx.lineTo(x - estimate * factor, v);
      });
      ctx.lineTo(x, violin.max);
      ctx.moveTo(x, violin.min);
      coords.forEach(function (_ref2) {
        var v = _ref2.v,
            estimate = _ref2.estimate;
        ctx.lineTo(x + estimate * factor, v);
      });
      ctx.lineTo(x, violin.max);
    } else {
      var y = vm.y;
      var height = vm.height;

      var _factor = height / 2 / violin.maxEstimate;

      ctx.moveTo(violin.min, y);
      coords.forEach(function (_ref3) {
        var v = _ref3.v,
            estimate = _ref3.estimate;
        ctx.lineTo(v, y - estimate * _factor);
      });
      ctx.lineTo(violin.max, y);
      ctx.moveTo(violin.min, y);
      coords.forEach(function (_ref4) {
        var v = _ref4.v,
            estimate = _ref4.estimate;
        ctx.lineTo(v, y + estimate * _factor);
      });
      ctx.lineTo(violin.max, y);
    }

    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    this._drawOutliers(vm, violin, ctx, vert);

    ctx.restore();

    this._drawItems(vm, violin, ctx, vert);
  },
  _getBounds: function _getBounds() {
    var vm = this._view;
    var vert = this.isVertical();
    var violin = vm.violin;

    if (vert) {
      var x = vm.x,
          width = vm.width;
      var x0 = x - width / 2;
      return {
        left: x0,
        top: violin.max,
        right: x0 + width,
        bottom: violin.min
      };
    }

    var y = vm.y,
        height = vm.height;
    var y0 = y - height / 2;
    return {
      left: violin.min,
      top: y0,
      right: violin.max,
      bottom: y0 + height
    };
  },
  height: function height() {
    var vm = this._view;
    return vm.base - Math.min(vm.violin.min, vm.violin.max);
  },
  getArea: function getArea() {
    var vm = this._view;
    var iqr = Math.abs(vm.violin.max - vm.violin.min);

    if (this.isVertical()) {
      return iqr * vm.width;
    }

    return iqr * vm.height;
  },
  _getOutliers: function _getOutliers() {
    return this._view.violin.outliers || [];
  }
});

var verticalDefaults = {
  scales: {
    yAxes: [{
      type: 'arrayLinear'
    }]
  }
};
var horizontalDefaults = {
  scales: {
    xAxes: [{
      type: 'arrayLinear'
    }]
  }
};
function toFixed(value) {
  var decimals = this._chart.config.options.tooltipDecimals; // inject number of decimals from config

  if (decimals == null || typeof decimals !== 'number' || decimals < 0) {
    return value;
  }

  return Number.parseFloat(value).toFixed(decimals);
}
var configKeys = ['outlierRadius', 'itemRadius', 'itemStyle', 'itemBackgroundColor', 'itemBorderColor', 'outlierColor', 'medianColor', 'segmentColor', 'hitPadding', 'outlierHitRadius', 'lowerColor'];
var configKeyIsColor = [false, false, false, true, true, true, true, true, false, false, true];
var array = {
  _elementOptions: function _elementOptions() {
    return {};
  },
  updateElement: function updateElement(elem, index, reset) {
    var dataset = this.getDataset();
    var custom = elem.custom || {};

    var options = this._elementOptions();

    controllers.bar.prototype.updateElement.call(this, elem, index, reset);
    var resolve = helpers$2.options.resolve; // Scriptable options

    var context = {
      chart: this.chart,
      dataIndex: index,
      dataset: dataset,
      datasetIndex: this.index
    };
    configKeys.forEach(function (item) {
      elem._model[item] = resolve([custom[item], dataset[item], options[item]], context, index);
    });
  },
  _calculateCommonModel: function _calculateCommonModel(r, data, container, scale) {
    if (container.outliers) {
      r.outliers = container.outliers.map(function (d) {
        return scale.getPixelForValue(Number(d));
      });
    }

    if (Array.isArray(data)) {
      r.items = data.map(function (d) {
        return scale.getPixelForValue(Number(d));
      });
    } else if (container.items) {
      r.items = container.items.map(function (d) {
        return scale.getPixelForValue(Number(d));
      });
    }
  },
  setHoverStyle: function setHoverStyle(element) {
    controllers.bar.prototype.setHoverStyle.call(this, element);
    var dataset = this.chart.data.datasets[element._datasetIndex];
    var index = element._index;
    var custom = element.custom || {};
    var model = element._model;
    var getHoverColor = helpers$2.getHoverColor;
    var resolve = helpers$2.options.resolve;
    configKeys.forEach(function (item, i) {
      element.$previousStyle[item] = model[item];
      var hoverKey = "hover".concat(item.charAt(0).toUpperCase()).concat(item.slice(1));
      var modelValue = configKeyIsColor[i] && model[item] != null ? getHoverColor(model[item]) : model[item];
      element._model[item] = resolve([custom[hoverKey], dataset[hoverKey], modelValue], undefined, index);
    });
  }
};

function boxplotTooltip(item, data) {
  var value = data.datasets[item.datasetIndex].data[item.index];

  var options = this._chart.getDatasetMeta(item.datasetIndex).controller._getValueScale().options.ticks;

  var b = asBoxPlotStats(value, options);
  var hoveredOutlierIndex = this._tooltipOutlier == null ? -1 : this._tooltipOutlier;
  var label = this._options.callbacks.boxplotLabel;

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return label.apply(this, [item, data, b, hoveredOutlierIndex].concat(args));
}

var defaults$1 = {
  tooltips: {
    position: 'boxplot',
    callbacks: {
      label: boxplotTooltip,
      boxplotLabel: function boxplotLabel(item, data, b, hoveredOutlierIndex) {
        var datasetLabel = data.datasets[item.datasetIndex].label || '';
        var label = "".concat(datasetLabel, " ").concat(typeof item.xLabel === 'string' ? item.xLabel : item.yLabel);

        if (!b) {
          return "".concat(label, " (NaN)");
        }

        if (hoveredOutlierIndex >= 0) {
          var outlier = b.outliers[hoveredOutlierIndex];
          return "".concat(label, " (outlier: ").concat(toFixed.call(this, outlier), ")");
        }

        return "".concat(label, " (min: ").concat(toFixed.call(this, b.min), ", q1: ").concat(toFixed.call(this, b.q1), ", median: ").concat(toFixed.call(this, b.median), ", q3: ").concat(toFixed.call(this, b.q3), ", max: ").concat(toFixed.call(this, b.max), ")");
      }
    }
  }
};
defaults$3.boxplot = helpers$2.merge({}, [defaults$3.bar, verticalDefaults, defaults$1]);
defaults$3.horizontalBoxplot = helpers$2.merge({}, [defaults$3.horizontalBar, horizontalDefaults, defaults$1]);

if (defaults$3.global.datasets && defaults$3.global.datasets.bar) {
  defaults$3.global.datasets.boxplot = _objectSpread2({}, defaults$3.global.datasets.bar);
}

if (defaults$3.global.datasets && defaults$3.global.datasets.horizontalBar) {
  defaults$3.global.datasets.horizontalBoxplot = _objectSpread2({}, defaults$3.global.datasets.horizontalBar);
}

var boxplot = _objectSpread2(_objectSpread2({}, array), {}, {
  dataElementType: elements.BoxAndWhiskers,
  _elementOptions: function _elementOptions() {
    return this.chart.options.elements.boxandwhiskers;
  },

  /**
   * @private
   */
  _updateElementGeometry: function _updateElementGeometry(elem, index, reset) {
    var _Chart$controllers$ba;

    for (var _len2 = arguments.length, args = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      args[_key2 - 3] = arguments[_key2];
    }

    (_Chart$controllers$ba = controllers.bar.prototype._updateElementGeometry).call.apply(_Chart$controllers$ba, [this, elem, index, reset].concat(args));

    elem._model.boxplot = this._calculateBoxPlotValuesPixels(this.index, index);
  },

  /**
   * @private
   */
  _calculateBoxPlotValuesPixels: function _calculateBoxPlotValuesPixels(datasetIndex, index) {
    var scale = this._getValueScale();

    var data = this.chart.data.datasets[datasetIndex].data[index];

    if (!data) {
      return null;
    }

    var v = asBoxPlotStats(data, scale.options.ticks);
    var r = {};
    Object.keys(v).forEach(function (key) {
      if (key !== 'outliers' && key !== 'items') {
        r[key] = scale.getPixelForValue(Number(v[key]));
      }
    });

    this._calculateCommonModel(r, data, v, scale);

    return r;
  }
});
/**
 * This class is based off controller.bar.js from the upstream Chart.js library
 */


var BoxPlot = controllers.boxplot = controllers.bar.extend(boxplot);
var HorizontalBoxPlot = controllers.horizontalBoxplot = controllers.horizontalBar.extend(boxplot);

function violinTooltip(item, data) {
  var value = data.datasets[item.datasetIndex].data[item.index];

  var options = this._chart.getDatasetMeta(item.datasetIndex).controller._getValueScale().options.ticks;

  var v = asViolinStats(value, options);
  var label = this._options.callbacks.violinLabel;

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return label.apply(this, [item, data, v].concat(args));
}

var defaults$2 = {
  tooltips: {
    callbacks: {
      label: violinTooltip,
      violinLabel: function violinLabel(item, data) {
        var datasetLabel = data.datasets[item.datasetIndex].label || '';
        var value = item.value;
        var label = "".concat(datasetLabel, " ").concat(typeof item.xLabel === 'string' ? item.xLabel : item.yLabel);
        return "".concat(label, " (").concat(toFixed.call(this, value), ")");
      }
    }
  }
};
defaults$3.violin = helpers$2.merge({}, [defaults$3.bar, verticalDefaults, defaults$2]);
defaults$3.horizontalViolin = helpers$2.merge({}, [defaults$3.horizontalBar, horizontalDefaults, defaults$2]);

if (defaults$3.global.datasets && defaults$3.global.datasets.bar) {
  defaults$3.global.datasets.violin = _objectSpread2({}, defaults$3.global.datasets.bar);
}

if (defaults$3.global.datasets && defaults$3.global.datasets.horizontalBar) {
  defaults$3.global.datasets.horizontalViolin = _objectSpread2({}, defaults$3.global.datasets.horizontalBar);
}

var controller = _objectSpread2(_objectSpread2({}, array), {}, {
  dataElementType: elements.Violin,
  _elementOptions: function _elementOptions() {
    return this.chart.options.elements.violin;
  },

  /**
   * @private
   */
  _updateElementGeometry: function _updateElementGeometry(elem, index, reset) {
    var _Chart$controllers$ba;

    for (var _len2 = arguments.length, args = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      args[_key2 - 3] = arguments[_key2];
    }

    (_Chart$controllers$ba = controllers.bar.prototype._updateElementGeometry).call.apply(_Chart$controllers$ba, [this, elem, index, reset].concat(args));

    var custom = elem.custom || {};

    var options = this._elementOptions();

    elem._model.violin = this._calculateViolinValuesPixels(this.index, index, custom.points !== undefined ? custom.points : options.points);
  },

  /**
   * @private
   */
  _calculateViolinValuesPixels: function _calculateViolinValuesPixels(datasetIndex, index, points) {
    var scale = this._getValueScale();

    var data = this.chart.data.datasets[datasetIndex].data[index];
    var violin = asViolinStats(data, scale.options.ticks);

    if (!Array.isArray(data) && typeof data === 'number' && !Number.isNaN || violin == null) {
      return {
        min: data,
        max: data,
        median: data,
        coords: [{
          v: data,
          estimate: Number.NEGATIVE_INFINITY
        }],
        maxEstimate: Number.NEGATIVE_INFINITY
      };
    }

    var range = violin.max - violin.min;
    var samples = [];
    var inc = range / points;

    for (var v = violin.min; v <= violin.max && inc > 0; v += inc) {
      samples.push(v);
    }

    if (samples[samples.length - 1] !== violin.max) {
      samples.push(violin.max);
    }

    var coords = violin.coords || violin.kde(samples).map(function (v) {
      return {
        v: v[0],
        estimate: v[1]
      };
    });
    var r = {
      min: scale.getPixelForValue(violin.min),
      max: scale.getPixelForValue(violin.max),
      median: scale.getPixelForValue(violin.median),
      coords: coords.map(function (_ref) {
        var v = _ref.v,
            estimate = _ref.estimate;
        return {
          v: scale.getPixelForValue(v),
          estimate: estimate
        };
      }),
      maxEstimate: coords.reduce(function (a, d) {
        return Math.max(a, d.estimate);
      }, Number.NEGATIVE_INFINITY)
    };

    this._calculateCommonModel(r, data, violin, scale);

    return r;
  }
});
/**
 * This class is based off controller.bar.js from the upstream Chart.js library
 */


var Violin$1 = controllers.violin = controllers.bar.extend(controller);
var HorizontalViolin = controllers.horizontalViolin = controllers.horizontalBar.extend(controller);

var helpers = helpers$2;
var ArrayLinearScaleOptions = helpers.merge({}, [commonScaleOptions, scaleService.getScaleDefaults('linear')]);
var ArrayLinearScale = scaleService.getScaleConstructor('linear').extend({
  getRightValue: function getRightValue$1(rawValue) {
    return LinearScaleBase.prototype.getRightValue.call(this, getRightValue(rawValue, this.options.ticks));
  },
  _parseValue: function _parseValue(rawValue) {
    return LinearScaleBase.prototype._parseValue.call(this, getRightValue(rawValue, this.options.ticks));
  },
  determineDataLimits: function determineDataLimits() {
    commonDataLimits.call(this); // Common base implementation to handle ticks.min, ticks.max, ticks.beginAtZero

    this.handleTickRangeOptions();
  }
});
scaleService.registerScaleType('arrayLinear', ArrayLinearScale, ArrayLinearScaleOptions);

var helpers$1 = helpers$2;
var ArrayLogarithmicScaleOptions = helpers$1.merge({}, [commonScaleOptions, scaleService.getScaleDefaults('logarithmic')]);
var ArrayLogarithmicScale = scaleService.getScaleConstructor('logarithmic').extend({
  getRightValue: function getRightValue$1(rawValue) {
    return LinearScaleBase.prototype.getRightValue.call(this, getRightValue(rawValue, this.options.ticks));
  },
  _parseValue: function _parseValue(rawValue) {
    return LinearScaleBase.prototype._parseValue.call(this, getRightValue(rawValue, this.options.ticks));
  },
  determineDataLimits: function determineDataLimits() {
    var _this = this;

    // Add whitespace around bars. Axis shouldn't go exactly from min to max
    var tickOpts = this.options.ticks;
    this.minNotZero = null;
    commonDataLimits.call(this, function (boxPlot) {
      var value = boxPlot[tickOpts.minStats];

      if (value !== 0 && (_this.minNotZero === null || value < _this.minNotZero)) {
        _this.minNotZero = value;
      }
    });
    this.min = helpers$1.valueOrDefault(tickOpts.min, this.min - this.min * 0.05);
    this.max = helpers$1.valueOrDefault(tickOpts.max, this.max + this.max * 0.05);

    if (this.min === this.max) {
      if (this.min !== 0 && this.min !== null) {
        this.min = Math.pow(10, Math.floor(helpers$1.log10(this.min)) - 1);
        this.max = Math.pow(10, Math.floor(helpers$1.log10(this.max)) + 1);
      } else {
        this.min = 1;
        this.max = 10;
      }
    }
  }
});
scaleService.registerScaleType('arrayLogarithmic', ArrayLogarithmicScale, ArrayLogarithmicScaleOptions);

function boxplotPositioner(elements, eventPosition) {
  var _this = this;

  if (!elements.length) {
    return false;
  }

  var _elements$reduce = elements.reduce(function (_ref, el) {
    var _ref2 = _slicedToArray(_ref, 3),
        xi = _ref2[0],
        ci = _ref2[1],
        counti = _ref2[2];

    if (el && el.hasValue()) {
      var pos = el.tooltipPosition(eventPosition, _this);
      return [xi + pos.x, ci + pos.y, counti + 1];
    }

    return [xi, ci, counti];
  }, [0, 0, 0]),
      _elements$reduce2 = _slicedToArray(_elements$reduce, 3),
      x = _elements$reduce2[0],
      y = _elements$reduce2[1],
      count = _elements$reduce2[2];

  return {
    x: x / count,
    y: y / count
  };
}
Tooltip.positioners.boxplot = boxplotPositioner;

export { ArrayLinearScale, ArrayLogarithmicScale, BoxAndWiskers as BoxAndWhiskers, BoxPlot, HorizontalBoxPlot, HorizontalViolin, Violin };
