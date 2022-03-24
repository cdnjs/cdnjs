/*!
* chartjs-plugin-zoom v1.2.1
* undefined
 * (c) 2016-2022 chartjs-plugin-zoom Contributors
 * Released under the MIT License
 */
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('chart.js'), require('hammerjs'), require('chart.js/helpers')) :
typeof define === 'function' && define.amd ? define(['chart.js', 'hammerjs', 'chart.js/helpers'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ChartZoom = factory(global.Chart, global.Hammer, global.Chart.helpers));
})(this, (function (chart_js, Hammer, helpers) { 'use strict';

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Hammer__default = /*#__PURE__*/_interopDefaultLegacy(Hammer);

const getModifierKey = opts => opts && opts.enabled && opts.modifierKey;
const keyPressed = (key, event) => key && event[key + 'Key'];
const keyNotPressed = (key, event) => key && !event[key + 'Key'];

/**
 * @param {string|function} mode can be 'x', 'y' or 'xy'
 * @param {string} dir can be 'x' or 'y'
 * @param {import('chart.js').Chart} chart instance of the chart in question
 * @returns {boolean}
 */
function directionEnabled(mode, dir, chart) {
  if (mode === undefined) {
    return true;
  } else if (typeof mode === 'string') {
    return mode.indexOf(dir) !== -1;
  } else if (typeof mode === 'function') {
    return mode({chart}).indexOf(dir) !== -1;
  }

  return false;
}

/**
 * Debounces calling `fn` for `delay` ms
 * @param {function} fn - Function to call. No arguments are passed.
 * @param {number} delay - Delay in ms. 0 = immediate invocation.
 * @returns {function}
 */
function debounce(fn, delay) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
    return delay;
  };
}

/** This function use for check what axis now under mouse cursor.
 * @param {{x: number, y: number}} point - the mouse location
 * @param {import('chart.js').Chart} [chart] instance of the chart in question
 * @return {import('chart.js').Scale}
 */
function getScaleUnderPoint({x, y}, chart) {
  const scales = chart.scales;
  const scaleIds = Object.keys(scales);
  for (let i = 0; i < scaleIds.length; i++) {
    const scale = scales[scaleIds[i]];
    if (y >= scale.top && y <= scale.bottom && x >= scale.left && x <= scale.right) {
      return scale;
    }
  }
  return null;
}

/** This function return only one scale whose position is under mouse cursor and which direction is enabled.
 * If under mouse hasn't scale, then return all other scales which 'mode' is diffrent with overScaleMode.
 * So 'overScaleMode' works as a limiter to scale the user-selected scale (in 'mode') only when the cursor is under the scale,
 * and other directions in 'mode' works as before.
 * Example: mode = 'xy', overScaleMode = 'y' -> it's means 'x' - works as before, and 'y' only works for one scale when cursor is under it.
 * options.overScaleMode can be a function if user want zoom only one scale of many for example.
 * @param {string} mode - 'xy', 'x' or 'y'
 * @param {{x: number, y: number}} point - the mouse location
 * @param {import('chart.js').Chart} [chart] instance of the chart in question
 * @return {import('chart.js').Scale[]}
 */
function getEnabledScalesByPoint(mode, point, chart) {
  const scale = getScaleUnderPoint(point, chart);

  if (scale && directionEnabled(mode, scale.axis, chart)) {
    return [scale];
  }

  const enabledScales = [];
  helpers.each(chart.scales, function(scaleItem) {
    if (!directionEnabled(mode, scaleItem.axis, chart)) {
      enabledScales.push(scaleItem);
    }
  });
  return enabledScales;
}

const chartStates = new WeakMap();

function getState(chart) {
  let state = chartStates.get(chart);
  if (!state) {
    state = {
      originalScaleLimits: {},
      updatedScaleLimits: {},
      handlers: {},
      panDelta: {}
    };
    chartStates.set(chart, state);
  }
  return state;
}

function removeState(chart) {
  chartStates.delete(chart);
}

function zoomDelta(scale, zoom, center) {
  const range = scale.max - scale.min;
  const newRange = range * (zoom - 1);

  const centerPoint = scale.isHorizontal() ? center.x : center.y;
  // `scale.getValueForPixel()` can return a value less than the `scale.min` or
  // greater than `scale.max` when `centerPoint` is outside chartArea.
  const minPercent = Math.max(0, Math.min(1,
    (scale.getValueForPixel(centerPoint) - scale.min) / range || 0
  ));

  const maxPercent = 1 - minPercent;

  return {
    min: newRange * minPercent,
    max: newRange * maxPercent
  };
}

function getLimit(state, scale, scaleLimits, prop, fallback) {
  let limit = scaleLimits[prop];
  if (limit === 'original') {
    const original = state.originalScaleLimits[scale.id][prop];
    limit = helpers.valueOrDefault(original.options, original.scale);
  }
  return helpers.valueOrDefault(limit, fallback);
}

function updateRange(scale, {min, max}, limits, zoom = false) {
  const state = getState(scale.chart);
  const {id, axis, options: scaleOpts} = scale;

  const scaleLimits = limits && (limits[id] || limits[axis]) || {};
  const {minRange = 0} = scaleLimits;
  const minLimit = getLimit(state, scale, scaleLimits, 'min', -Infinity);
  const maxLimit = getLimit(state, scale, scaleLimits, 'max', Infinity);

  const cmin = Math.max(min, minLimit);
  const cmax = Math.min(max, maxLimit);
  const range = zoom ? Math.max(cmax - cmin, minRange) : scale.max - scale.min;
  if (cmax - cmin !== range) {
    if (minLimit > cmax - range) {
      min = cmin;
      max = cmin + range;
    } else if (maxLimit < cmin + range) {
      max = cmax;
      min = cmax - range;
    } else {
      const offset = (range - cmax + cmin) / 2;
      min = cmin - offset;
      max = cmax + offset;
    }
  } else {
    min = cmin;
    max = cmax;
  }
  scaleOpts.min = min;
  scaleOpts.max = max;

  state.updatedScaleLimits[scale.id] = {min, max};

  // return true if the scale range is changed
  return scale.parse(min) !== scale.min || scale.parse(max) !== scale.max;
}

function zoomNumericalScale(scale, zoom, center, limits) {
  const delta = zoomDelta(scale, zoom, center);
  const newRange = {min: scale.min + delta.min, max: scale.max - delta.max};
  return updateRange(scale, newRange, limits, true);
}

const integerChange = (v) => v === 0 || isNaN(v) ? 0 : v < 0 ? Math.min(Math.round(v), -1) : Math.max(Math.round(v), 1);

function existCategoryFromMaxZoom(scale) {
  const labels = scale.getLabels();
  const maxIndex = labels.length - 1;

  if (scale.min > 0) {
    scale.min -= 1;
  }
  if (scale.max < maxIndex) {
    scale.max += 1;
  }
}

function zoomCategoryScale(scale, zoom, center, limits) {
  const delta = zoomDelta(scale, zoom, center);
  if (scale.min === scale.max && zoom < 1) {
    existCategoryFromMaxZoom(scale);
  }
  const newRange = {min: scale.min + integerChange(delta.min), max: scale.max - integerChange(delta.max)};
  return updateRange(scale, newRange, limits, true);
}

function scaleLength(scale) {
  return scale.isHorizontal() ? scale.width : scale.height;
}

function panCategoryScale(scale, delta, limits) {
  const labels = scale.getLabels();
  const lastLabelIndex = labels.length - 1;
  let {min, max} = scale;
  // The visible range. Ticks can be skipped, and thus not reliable.
  const range = Math.max(max - min, 1);
  // How many pixels of delta is required before making a step. stepSize, but limited to max 1/10 of the scale length.
  const stepDelta = Math.round(scaleLength(scale) / Math.max(range, 10));
  const stepSize = Math.round(Math.abs(delta / stepDelta));
  let applied;
  if (delta < -stepDelta) {
    max = Math.min(max + stepSize, lastLabelIndex);
    min = range === 1 ? max : max - range;
    applied = max === lastLabelIndex;
  } else if (delta > stepDelta) {
    min = Math.max(0, min - stepSize);
    max = range === 1 ? min : min + range;
    applied = min === 0;
  }

  return updateRange(scale, {min, max}, limits) || applied;
}

const OFFSETS = {
  second: 500, // 500 ms
  minute: 30 * 1000, // 30 s
  hour: 30 * 60 * 1000, // 30 m
  day: 12 * 60 * 60 * 1000, // 12 h
  week: 3.5 * 24 * 60 * 60 * 1000, // 3.5 d
  month: 15 * 24 * 60 * 60 * 1000, // 15 d
  quarter: 60 * 24 * 60 * 60 * 1000, // 60 d
  year: 182 * 24 * 60 * 60 * 1000 // 182 d
};

function panNumericalScale(scale, delta, limits, canZoom = false) {
  const {min: prevStart, max: prevEnd, options} = scale;
  const round = options.time && options.time.round;
  const offset = OFFSETS[round] || 0;
  const newMin = scale.getValueForPixel(scale.getPixelForValue(prevStart + offset) - delta);
  const newMax = scale.getValueForPixel(scale.getPixelForValue(prevEnd + offset) - delta);
  const {min: minLimit = -Infinity, max: maxLimit = Infinity} = canZoom && limits && limits[scale.axis] || {};
  if (isNaN(newMin) || isNaN(newMax) || newMin < minLimit || newMax > maxLimit) {
    // At limit: No change but return true to indicate no need to store the delta.
    // NaN can happen for 0-dimension scales (either because they were configured
    // with min === max or because the chart has 0 plottable area).
    return true;
  }
  return updateRange(scale, {min: newMin, max: newMax}, limits, canZoom);
}

function panNonLinearScale(scale, delta, limits) {
  return panNumericalScale(scale, delta, limits, true);
}

const zoomFunctions = {
  category: zoomCategoryScale,
  default: zoomNumericalScale,
};

const panFunctions = {
  category: panCategoryScale,
  default: panNumericalScale,
  logarithmic: panNonLinearScale,
  timeseries: panNonLinearScale,
};

function shouldUpdateScaleLimits(scale, originalScaleLimits, updatedScaleLimits) {
  const {id, options: {min, max}} = scale;
  if (!originalScaleLimits[id] || !updatedScaleLimits[id]) {
    return true;
  }
  const previous = updatedScaleLimits[id];
  return previous.min !== min || previous.max !== max;
}

function removeMissingScales(limits, scales) {
  helpers.each(limits, (opt, key) => {
    if (!scales[key]) {
      delete limits[key];
    }
  });
}

function storeOriginalScaleLimits(chart, state) {
  const {scales} = chart;
  const {originalScaleLimits, updatedScaleLimits} = state;

  helpers.each(scales, function(scale) {
    if (shouldUpdateScaleLimits(scale, originalScaleLimits, updatedScaleLimits)) {
      originalScaleLimits[scale.id] = {
        min: {scale: scale.min, options: scale.options.min},
        max: {scale: scale.max, options: scale.options.max},
      };
    }
  });

  removeMissingScales(originalScaleLimits, scales);
  removeMissingScales(updatedScaleLimits, scales);
  return originalScaleLimits;
}

function doZoom(scale, amount, center, limits) {
  const fn = zoomFunctions[scale.type] || zoomFunctions.default;
  helpers.callback(fn, [scale, amount, center, limits]);
}

function getCenter(chart) {
  const ca = chart.chartArea;
  return {
    x: (ca.left + ca.right) / 2,
    y: (ca.top + ca.bottom) / 2,
  };
}

/**
 * @param chart The chart instance
 * @param {number | {x?: number, y?: number, focalPoint?: {x: number, y: number}}} amount The zoom percentage or percentages and focal point
 * @param {string} [transition] Which transition mode to use. Defaults to 'none'
 */
function zoom(chart, amount, transition = 'none') {
  const {x = 1, y = 1, focalPoint = getCenter(chart)} = typeof amount === 'number' ? {x: amount, y: amount} : amount;
  const state = getState(chart);
  const {options: {limits, zoom: zoomOptions}} = state;
  const {mode = 'xy', overScaleMode} = zoomOptions || {};

  storeOriginalScaleLimits(chart, state);

  const xEnabled = x !== 1 && directionEnabled(mode, 'x', chart);
  const yEnabled = y !== 1 && directionEnabled(mode, 'y', chart);
  const enabledScales = overScaleMode && getEnabledScalesByPoint(overScaleMode, focalPoint, chart);

  helpers.each(enabledScales || chart.scales, function(scale) {
    if (scale.isHorizontal() && xEnabled) {
      doZoom(scale, x, focalPoint, limits);
    } else if (!scale.isHorizontal() && yEnabled) {
      doZoom(scale, y, focalPoint, limits);
    }
  });

  chart.update(transition);

  helpers.callback(zoomOptions.onZoom, [{chart}]);
}

function getRange(scale, pixel0, pixel1) {
  const v0 = scale.getValueForPixel(pixel0);
  const v1 = scale.getValueForPixel(pixel1);
  return {
    min: Math.min(v0, v1),
    max: Math.max(v0, v1)
  };
}

function zoomRect(chart, p0, p1, transition = 'none') {
  const state = getState(chart);
  const {options: {limits, zoom: zoomOptions}} = state;
  const {mode = 'xy'} = zoomOptions;

  storeOriginalScaleLimits(chart, state);
  const xEnabled = directionEnabled(mode, 'x', chart);
  const yEnabled = directionEnabled(mode, 'y', chart);

  helpers.each(chart.scales, function(scale) {
    if (scale.isHorizontal() && xEnabled) {
      updateRange(scale, getRange(scale, p0.x, p1.x), limits, true);
    } else if (!scale.isHorizontal() && yEnabled) {
      updateRange(scale, getRange(scale, p0.y, p1.y), limits, true);
    }
  });

  chart.update(transition);

  helpers.callback(zoomOptions.onZoom, [{chart}]);
}

function zoomScale(chart, scaleId, range, transition = 'none') {
  storeOriginalScaleLimits(chart, getState(chart));
  const scale = chart.scales[scaleId];
  updateRange(scale, range, undefined, true);
  chart.update(transition);
}

function resetZoom(chart, transition = 'default') {
  const state = getState(chart);
  const originalScaleLimits = storeOriginalScaleLimits(chart, state);

  helpers.each(chart.scales, function(scale) {
    const scaleOptions = scale.options;
    if (originalScaleLimits[scale.id]) {
      scaleOptions.min = originalScaleLimits[scale.id].min.options;
      scaleOptions.max = originalScaleLimits[scale.id].max.options;
    } else {
      delete scaleOptions.min;
      delete scaleOptions.max;
    }
  });
  chart.update(transition);
  helpers.callback(state.options.zoom.onZoomComplete, [{chart}]);
}

function getOriginalRange(state, scaleId) {
  const original = state.originalScaleLimits[scaleId];
  if (!original) {
    return;
  }
  const {min, max} = original;
  return helpers.valueOrDefault(max.options, max.scale) - helpers.valueOrDefault(min.options, min.scale);
}

function getZoomLevel(chart) {
  const state = getState(chart);
  let min = 1;
  let max = 1;
  helpers.each(chart.scales, function(scale) {
    const origRange = getOriginalRange(state, scale.id);
    if (origRange) {
      const level = Math.round(origRange / (scale.max - scale.min) * 100) / 100;
      min = Math.min(min, level);
      max = Math.max(max, level);
    }
  });
  return min < 1 ? min : max;
}

function panScale(scale, delta, limits, state) {
  const {panDelta} = state;
  // Add possible cumulative delta from previous pan attempts where scale did not change
  const storedDelta = panDelta[scale.id] || 0;
  if (helpers.sign(storedDelta) === helpers.sign(delta)) {
    delta += storedDelta;
  }
  const fn = panFunctions[scale.type] || panFunctions.default;
  if (helpers.callback(fn, [scale, delta, limits])) {
    // The scale changed, reset cumulative delta
    panDelta[scale.id] = 0;
  } else {
    // The scale did not change, store cumulative delta
    panDelta[scale.id] = delta;
  }
}

function pan(chart, delta, enabledScales, transition = 'none') {
  const {x = 0, y = 0} = typeof delta === 'number' ? {x: delta, y: delta} : delta;
  const state = getState(chart);
  const {options: {pan: panOptions, limits}} = state;
  const {mode = 'xy', onPan} = panOptions || {};

  storeOriginalScaleLimits(chart, state);

  const xEnabled = x !== 0 && directionEnabled(mode, 'x', chart);
  const yEnabled = y !== 0 && directionEnabled(mode, 'y', chart);

  helpers.each(enabledScales || chart.scales, function(scale) {
    if (scale.isHorizontal() && xEnabled) {
      panScale(scale, x, limits, state);
    } else if (!scale.isHorizontal() && yEnabled) {
      panScale(scale, y, limits, state);
    }
  });

  chart.update(transition);

  helpers.callback(onPan, [{chart}]);
}

function getInitialScaleBounds(chart) {
  const state = getState(chart);
  const scaleBounds = {};
  for (const scaleId of Object.keys(chart.scales)) {
    const {min, max} = state.originalScaleLimits[scaleId] || {min: {}, max: {}};
    scaleBounds[scaleId] = {min: min.scale, max: max.scale};
  }

  return scaleBounds;
}

function isZoomedOrPanned(chart) {
  const scaleBounds = getInitialScaleBounds(chart);
  for (const scaleId of Object.keys(chart.scales)) {
    const {min: originalMin, max: originalMax} = scaleBounds[scaleId];

    if (originalMin !== undefined && chart.scales[scaleId].min !== originalMin) {
      return true;
    }

    if (originalMax !== undefined && chart.scales[scaleId].max !== originalMax) {
      return true;
    }
  }

  return false;
}

function removeHandler(chart, type) {
  const {handlers} = getState(chart);
  const handler = handlers[type];
  if (handler && handler.target) {
    handler.target.removeEventListener(type, handler);
    delete handlers[type];
  }
}

function addHandler(chart, target, type, handler) {
  const {handlers, options} = getState(chart);
  const oldHandler = handlers[type];
  if (oldHandler && oldHandler.target === target) {
    // already attached
    return;
  }
  removeHandler(chart, type);
  handlers[type] = (event) => handler(chart, event, options);
  handlers[type].target = target;
  target.addEventListener(type, handlers[type]);
}

function mouseMove(chart, event) {
  const state = getState(chart);
  if (state.dragStart) {
    state.dragging = true;
    state.dragEnd = event;
    chart.update('none');
  }
}

function zoomStart(chart, event, zoomOptions) {
  const {onZoomStart, onZoomRejected} = zoomOptions;
  if (onZoomStart) {
    const {left: offsetX, top: offsetY} = event.target.getBoundingClientRect();
    const point = {
      x: event.clientX - offsetX,
      y: event.clientY - offsetY
    };
    if (helpers.callback(onZoomStart, [{chart, event, point}]) === false) {
      helpers.callback(onZoomRejected, [{chart, event}]);
      return false;
    }
  }
}

function mouseDown(chart, event) {
  const state = getState(chart);
  const {pan: panOptions, zoom: zoomOptions = {}} = state.options;
  if (keyPressed(getModifierKey(panOptions), event) || keyNotPressed(getModifierKey(zoomOptions.drag), event)) {
    return helpers.callback(zoomOptions.onZoomRejected, [{chart, event}]);
  }

  if (zoomStart(chart, event, zoomOptions) === false) {
    return;
  }
  state.dragStart = event;

  addHandler(chart, chart.canvas, 'mousemove', mouseMove);
}

function computeDragRect(chart, mode, beginPoint, endPoint) {
  const {left: offsetX, top: offsetY} = beginPoint.target.getBoundingClientRect();
  const xEnabled = directionEnabled(mode, 'x', chart);
  const yEnabled = directionEnabled(mode, 'y', chart);
  let {top, left, right, bottom, width: chartWidth, height: chartHeight} = chart.chartArea;

  if (xEnabled) {
    left = Math.min(beginPoint.clientX, endPoint.clientX) - offsetX;
    right = Math.max(beginPoint.clientX, endPoint.clientX) - offsetX;
  }

  if (yEnabled) {
    top = Math.min(beginPoint.clientY, endPoint.clientY) - offsetY;
    bottom = Math.max(beginPoint.clientY, endPoint.clientY) - offsetY;
  }
  const width = right - left;
  const height = bottom - top;

  return {
    left,
    top,
    right,
    bottom,
    width,
    height,
    zoomX: xEnabled && width ? 1 + ((chartWidth - width) / chartWidth) : 1,
    zoomY: yEnabled && height ? 1 + ((chartHeight - height) / chartHeight) : 1
  };
}

function mouseUp(chart, event) {
  const state = getState(chart);
  if (!state.dragStart) {
    return;
  }

  removeHandler(chart, 'mousemove');
  const {mode, onZoomComplete, drag: {threshold = 0}} = state.options.zoom;
  const rect = computeDragRect(chart, mode, state.dragStart, event);
  const distanceX = directionEnabled(mode, 'x', chart) ? rect.width : 0;
  const distanceY = directionEnabled(mode, 'y', chart) ? rect.height : 0;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // Remove drag start and end before chart update to stop drawing selected area
  state.dragStart = state.dragEnd = null;

  if (distance <= threshold) {
    state.dragging = false;
    chart.update('none');
    return;
  }

  zoomRect(chart, {x: rect.left, y: rect.top}, {x: rect.right, y: rect.bottom}, 'zoom');

  setTimeout(() => (state.dragging = false), 500);
  helpers.callback(onZoomComplete, [{chart}]);
}

function wheelPreconditions(chart, event, zoomOptions) {
  // Before preventDefault, check if the modifier key required and pressed
  if (keyNotPressed(getModifierKey(zoomOptions.wheel), event)) {
    helpers.callback(zoomOptions.onZoomRejected, [{chart, event}]);
    return;
  }

  if (zoomStart(chart, event, zoomOptions) === false) {
    return;
  }

  // Prevent the event from triggering the default behavior (eg. Content scrolling).
  if (event.cancelable) {
    event.preventDefault();
  }

  // Firefox always fires the wheel event twice:
  // First without the delta and right after that once with the delta properties.
  if (event.deltaY === undefined) {
    return;
  }
  return true;
}

function wheel(chart, event) {
  const {handlers: {onZoomComplete}, options: {zoom: zoomOptions}} = getState(chart);

  if (!wheelPreconditions(chart, event, zoomOptions)) {
    return;
  }

  const rect = event.target.getBoundingClientRect();
  const speed = 1 + (event.deltaY >= 0 ? -zoomOptions.wheel.speed : zoomOptions.wheel.speed);
  const amount = {
    x: speed,
    y: speed,
    focalPoint: {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  };

  zoom(chart, amount);

  if (onZoomComplete) {
    onZoomComplete();
  }
}

function addDebouncedHandler(chart, name, handler, delay) {
  if (handler) {
    getState(chart).handlers[name] = debounce(() => helpers.callback(handler, [{chart}]), delay);
  }
}

function addListeners(chart, options) {
  const canvas = chart.canvas;
  const {wheel: wheelOptions, drag: dragOptions, onZoomComplete} = options.zoom;

  // Install listeners. Do this dynamically based on options so that we can turn zoom on and off
  // We also want to make sure listeners aren't always on. E.g. if you're scrolling down a page
  // and the mouse goes over a chart you don't want it intercepted unless the plugin is enabled
  if (wheelOptions.enabled) {
    addHandler(chart, canvas, 'wheel', wheel);
    addDebouncedHandler(chart, 'onZoomComplete', onZoomComplete, 250);
  } else {
    removeHandler(chart, 'wheel');
  }
  if (dragOptions.enabled) {
    addHandler(chart, canvas, 'mousedown', mouseDown);
    addHandler(chart, canvas.ownerDocument, 'mouseup', mouseUp);
  } else {
    removeHandler(chart, 'mousedown');
    removeHandler(chart, 'mousemove');
    removeHandler(chart, 'mouseup');
  }
}

function removeListeners(chart) {
  removeHandler(chart, 'mousedown');
  removeHandler(chart, 'mousemove');
  removeHandler(chart, 'mouseup');
  removeHandler(chart, 'wheel');
  removeHandler(chart, 'click');
}

function createEnabler(chart, state) {
  return function(recognizer, event) {
    const {pan: panOptions, zoom: zoomOptions = {}} = state.options;
    if (!panOptions || !panOptions.enabled) {
      return false;
    }
    const srcEvent = event && event.srcEvent;
    if (!srcEvent) { // Sometimes Hammer queries this with a null event.
      return true;
    }
    if (!state.panning && event.pointerType === 'mouse' && (
      keyNotPressed(getModifierKey(panOptions), srcEvent) || keyPressed(getModifierKey(zoomOptions.drag), srcEvent))
    ) {
      helpers.callback(panOptions.onPanRejected, [{chart, event}]);
      return false;
    }
    return true;
  };
}

function pinchAxes(p0, p1) {
  // fingers position difference
  const pinchX = Math.abs(p0.clientX - p1.clientX);
  const pinchY = Math.abs(p0.clientY - p1.clientY);

  // diagonal fingers will change both (xy) axes
  const p = pinchX / pinchY;
  let x, y;
  if (p > 0.3 && p < 1.7) {
    x = y = true;
  } else if (pinchX > pinchY) {
    x = true;
  } else {
    y = true;
  }
  return {x, y};
}

function handlePinch(chart, state, e) {
  if (state.scale) {
    const {center, pointers} = e;
    // Hammer reports the total scaling. We need the incremental amount
    const zoomPercent = 1 / state.scale * e.scale;
    const rect = e.target.getBoundingClientRect();
    const pinch = pinchAxes(pointers[0], pointers[1]);
    const mode = state.options.zoom.mode;
    const amount = {
      x: pinch.x && directionEnabled(mode, 'x', chart) ? zoomPercent : 1,
      y: pinch.y && directionEnabled(mode, 'y', chart) ? zoomPercent : 1,
      focalPoint: {
        x: center.x - rect.left,
        y: center.y - rect.top
      }
    };

    zoom(chart, amount);

    // Keep track of overall scale
    state.scale = e.scale;
  }
}

function startPinch(chart, state) {
  if (state.options.zoom.pinch.enabled) {
    state.scale = 1;
  }
}

function endPinch(chart, state, e) {
  if (state.scale) {
    handlePinch(chart, state, e);
    state.scale = null; // reset
    helpers.callback(state.options.zoom.onZoomComplete, [{chart}]);
  }
}

function handlePan(chart, state, e) {
  const delta = state.delta;
  if (delta) {
    state.panning = true;
    pan(chart, {x: e.deltaX - delta.x, y: e.deltaY - delta.y}, state.panScales);
    state.delta = {x: e.deltaX, y: e.deltaY};
  }
}

function startPan(chart, state, event) {
  const {enabled, overScaleMode, onPanStart, onPanRejected} = state.options.pan;
  if (!enabled) {
    return;
  }
  const rect = event.target.getBoundingClientRect();
  const point = {
    x: event.center.x - rect.left,
    y: event.center.y - rect.top
  };

  if (helpers.callback(onPanStart, [{chart, event, point}]) === false) {
    return helpers.callback(onPanRejected, [{chart, event}]);
  }

  state.panScales = overScaleMode && getEnabledScalesByPoint(overScaleMode, point, chart);
  state.delta = {x: 0, y: 0};
  clearTimeout(state.panEndTimeout);
  handlePan(chart, state, event);
}

function endPan(chart, state) {
  state.delta = null;
  if (state.panning) {
    state.panEndTimeout = setTimeout(() => (state.panning = false), 500);
    helpers.callback(state.options.pan.onPanComplete, [{chart}]);
  }
}

const hammers = new WeakMap();
function startHammer(chart, options) {
  const state = getState(chart);
  const canvas = chart.canvas;
  const {pan: panOptions, zoom: zoomOptions} = options;

  const mc = new Hammer__default["default"].Manager(canvas);
  if (zoomOptions && zoomOptions.pinch.enabled) {
    mc.add(new Hammer__default["default"].Pinch());
    mc.on('pinchstart', () => startPinch(chart, state));
    mc.on('pinch', (e) => handlePinch(chart, state, e));
    mc.on('pinchend', (e) => endPinch(chart, state, e));
  }

  if (panOptions && panOptions.enabled) {
    mc.add(new Hammer__default["default"].Pan({
      threshold: panOptions.threshold,
      enable: createEnabler(chart, state)
    }));
    mc.on('panstart', (e) => startPan(chart, state, e));
    mc.on('panmove', (e) => handlePan(chart, state, e));
    mc.on('panend', () => endPan(chart, state));
  }

  hammers.set(chart, mc);
}

function stopHammer(chart) {
  const mc = hammers.get(chart);
  if (mc) {
    mc.remove('pinchstart');
    mc.remove('pinch');
    mc.remove('pinchend');
    mc.remove('panstart');
    mc.remove('pan');
    mc.remove('panend');
    mc.destroy();
    hammers.delete(chart);
  }
}

var version = "1.2.1";

var Zoom = {
  id: 'zoom',

  version,

  defaults: {
    pan: {
      enabled: false,
      mode: 'xy',
      threshold: 10,
      modifierKey: null,
    },
    zoom: {
      wheel: {
        enabled: false,
        speed: 0.1,
        modifierKey: null
      },
      drag: {
        enabled: false,
        modifierKey: null
      },
      pinch: {
        enabled: false
      },
      mode: 'xy',
    }
  },

  start: function(chart, _args, options) {
    const state = getState(chart);
    state.options = options;

    if (Object.prototype.hasOwnProperty.call(options.zoom, 'enabled')) {
      console.warn('The option `zoom.enabled` is no longer supported. Please use `zoom.wheel.enabled`, `zoom.drag.enabled`, or `zoom.pinch.enabled`.');
    }

    if (Hammer__default["default"]) {
      startHammer(chart, options);
    }

    chart.pan = (delta, panScales, transition) => pan(chart, delta, panScales, transition);
    chart.zoom = (args, transition) => zoom(chart, args, transition);
    chart.zoomScale = (id, range, transition) => zoomScale(chart, id, range, transition);
    chart.resetZoom = (transition) => resetZoom(chart, transition);
    chart.getZoomLevel = () => getZoomLevel(chart);
    chart.getInitialScaleBounds = () => getInitialScaleBounds(chart);
    chart.isZoomedOrPanned = () => isZoomedOrPanned(chart);
  },

  beforeEvent(chart) {
    const state = getState(chart);
    if (state.panning || state.dragging) {
      // cancel any event handling while panning or dragging
      return false;
    }
  },

  beforeUpdate: function(chart, args, options) {
    const state = getState(chart);
    state.options = options;
    addListeners(chart, options);
  },

  beforeDatasetsDraw: function(chart, args, options) {
    const {dragStart, dragEnd} = getState(chart);

    if (dragEnd) {
      const {left, top, width, height} = computeDragRect(chart, options.zoom.mode, dragStart, dragEnd);

      const dragOptions = options.zoom.drag;
      const ctx = chart.ctx;

      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = dragOptions.backgroundColor || 'rgba(225,225,225,0.3)';
      ctx.fillRect(left, top, width, height);

      if (dragOptions.borderWidth > 0) {
        ctx.lineWidth = dragOptions.borderWidth;
        ctx.strokeStyle = dragOptions.borderColor || 'rgba(225,225,225)';
        ctx.strokeRect(left, top, width, height);
      }
      ctx.restore();
    }
  },

  stop: function(chart) {
    removeListeners(chart);

    if (Hammer__default["default"]) {
      stopHammer(chart);
    }
    removeState(chart);
  },

  panFunctions,

  zoomFunctions
};

chart_js.Chart.register(Zoom);

return Zoom;

}));
