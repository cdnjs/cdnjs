/*!
* chartjs-plugin-zoom v2.2.0
* https://www.chartjs.org/chartjs-plugin-zoom/2.2.0/
 * (c) 2016-2024 chartjs-plugin-zoom Contributors
 * Released under the MIT License
 */
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('chart.js'), require('hammerjs'), require('chart.js/helpers')) :
typeof define === 'function' && define.amd ? define(['chart.js', 'hammerjs', 'chart.js/helpers'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ChartZoom = factory(global.Chart, global.Hammer, global.Chart.helpers));
})(this, (function (chart_js, Hammer, helpers) { 'use strict';

const getModifierKey = opts => opts && opts.enabled && opts.modifierKey;
const keyPressed = (key, event) => key && event[key + 'Key'];
const keyNotPressed = (key, event) => key && !event[key + 'Key'];
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
function directionsEnabled(mode, chart) {
  if (typeof mode === 'function') {
    mode = mode({chart});
  }
  if (typeof mode === 'string') {
    return {x: mode.indexOf('x') !== -1, y: mode.indexOf('y') !== -1};
  }
  return {x: false, y: false};
}
function debounce(fn, delay) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
    return delay;
  };
}
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
function getEnabledScalesByPoint(options, point, chart) {
  const {mode = 'xy', scaleMode, overScaleMode} = options || {};
  const scale = getScaleUnderPoint(point, chart);
  const enabled = directionsEnabled(mode, chart);
  const scaleEnabled = directionsEnabled(scaleMode, chart);
  if (overScaleMode) {
    const overScaleEnabled = directionsEnabled(overScaleMode, chart);
    for (const axis of ['x', 'y']) {
      if (overScaleEnabled[axis]) {
        scaleEnabled[axis] = enabled[axis];
        enabled[axis] = false;
      }
    }
  }
  if (scale && scaleEnabled[scale.axis]) {
    return [scale];
  }
  const enabledScales = [];
  helpers.each(chart.scales, function(scaleItem) {
    if (enabled[scaleItem.axis]) {
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
      panDelta: {},
      dragging: false,
      panning: false
    };
    chartStates.set(chart, state);
  }
  return state;
}
function removeState(chart) {
  chartStates.delete(chart);
}

function zoomDelta(val, min, range, newRange) {
  const minPercent = Math.max(0, Math.min(1, (val - min) / range || 0));
  const maxPercent = 1 - minPercent;
  return {
    min: newRange * minPercent,
    max: newRange * maxPercent
  };
}
function getValueAtPoint(scale, point) {
  const pixel = scale.isHorizontal() ? point.x : point.y;
  return scale.getValueForPixel(pixel);
}
function linearZoomDelta(scale, zoom, center) {
  const range = scale.max - scale.min;
  const newRange = range * (zoom - 1);
  const centerValue = getValueAtPoint(scale, center);
  return zoomDelta(centerValue, scale.min, range, newRange);
}
function logarithmicZoomRange(scale, zoom, center) {
  const centerValue = getValueAtPoint(scale, center);
  if (centerValue === undefined) {
    return {min: scale.min, max: scale.max};
  }
  const logMin = Math.log10(scale.min);
  const logMax = Math.log10(scale.max);
  const logCenter = Math.log10(centerValue);
  const logRange = logMax - logMin;
  const newLogRange = logRange * (zoom - 1);
  const delta = zoomDelta(logCenter, logMin, logRange, newLogRange);
  return {
    min: Math.pow(10, logMin + delta.min),
    max: Math.pow(10, logMax - delta.max),
  };
}
function getScaleLimits(scale, limits) {
  return limits && (limits[scale.id] || limits[scale.axis]) || {};
}
function getLimit(state, scale, scaleLimits, prop, fallback) {
  let limit = scaleLimits[prop];
  if (limit === 'original') {
    const original = state.originalScaleLimits[scale.id][prop];
    limit = helpers.valueOrDefault(original.options, original.scale);
  }
  return helpers.valueOrDefault(limit, fallback);
}
function linearRange(scale, pixel0, pixel1) {
  const v0 = scale.getValueForPixel(pixel0);
  const v1 = scale.getValueForPixel(pixel1);
  return {
    min: Math.min(v0, v1),
    max: Math.max(v0, v1)
  };
}
function fixRange(range, {min, max, minLimit, maxLimit}, originalLimits) {
  const offset = (range - max + min) / 2;
  min -= offset;
  max += offset;
  const origMin = originalLimits.min.options ?? originalLimits.min.scale;
  const origMax = originalLimits.max.options ?? originalLimits.max.scale;
  const epsilon = range / 1e6;
  if (helpers.almostEquals(min, origMin, epsilon)) {
    min = origMin;
  }
  if (helpers.almostEquals(max, origMax, epsilon)) {
    max = origMax;
  }
  if (min < minLimit) {
    min = minLimit;
    max = Math.min(minLimit + range, maxLimit);
  } else if (max > maxLimit) {
    max = maxLimit;
    min = Math.max(maxLimit - range, minLimit);
  }
  return {min, max};
}
function updateRange(scale, {min, max}, limits, zoom = false) {
  const state = getState(scale.chart);
  const {options: scaleOpts} = scale;
  const scaleLimits = getScaleLimits(scale, limits);
  const {minRange = 0} = scaleLimits;
  const minLimit = getLimit(state, scale, scaleLimits, 'min', -Infinity);
  const maxLimit = getLimit(state, scale, scaleLimits, 'max', Infinity);
  if (zoom === 'pan' && (min < minLimit || max > maxLimit)) {
    return true;
  }
  const scaleRange = scale.max - scale.min;
  const range = zoom ? Math.max(max - min, minRange) : scaleRange;
  if (zoom && range === minRange && scaleRange <= minRange) {
    return true;
  }
  const newRange = fixRange(range, {min, max, minLimit, maxLimit}, state.originalScaleLimits[scale.id]);
  scaleOpts.min = newRange.min;
  scaleOpts.max = newRange.max;
  state.updatedScaleLimits[scale.id] = newRange;
  return scale.parse(newRange.min) !== scale.min || scale.parse(newRange.max) !== scale.max;
}
function zoomNumericalScale(scale, zoom, center, limits) {
  const delta = linearZoomDelta(scale, zoom, center);
  const newRange = {min: scale.min + delta.min, max: scale.max - delta.max};
  return updateRange(scale, newRange, limits, true);
}
function zoomLogarithmicScale(scale, zoom, center, limits) {
  const newRange = logarithmicZoomRange(scale, zoom, center);
  return updateRange(scale, newRange, limits, true);
}
function zoomRectNumericalScale(scale, from, to, limits) {
  updateRange(scale, linearRange(scale, from, to), limits, true);
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
  const delta = linearZoomDelta(scale, zoom, center);
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
  const range = Math.max(max - min, 1);
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
  second: 500,
  minute: 30 * 1000,
  hour: 30 * 60 * 1000,
  day: 12 * 60 * 60 * 1000,
  week: 3.5 * 24 * 60 * 60 * 1000,
  month: 15 * 24 * 60 * 60 * 1000,
  quarter: 60 * 24 * 60 * 60 * 1000,
  year: 182 * 24 * 60 * 60 * 1000
};
function panNumericalScale(scale, delta, limits, pan = false) {
  const {min: prevStart, max: prevEnd, options} = scale;
  const round = options.time && options.time.round;
  const offset = OFFSETS[round] || 0;
  const newMin = scale.getValueForPixel(scale.getPixelForValue(prevStart + offset) - delta);
  const newMax = scale.getValueForPixel(scale.getPixelForValue(prevEnd + offset) - delta);
  if (isNaN(newMin) || isNaN(newMax)) {
    return true;
  }
  return updateRange(scale, {min: newMin, max: newMax}, limits, pan ? 'pan' : false);
}
function panNonLinearScale(scale, delta, limits) {
  return panNumericalScale(scale, delta, limits, true);
}
const zoomFunctions = {
  category: zoomCategoryScale,
  default: zoomNumericalScale,
  logarithmic: zoomLogarithmicScale,
};
const zoomRectFunctions = {
  default: zoomRectNumericalScale,
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
function doZoomRect(scale, from, to, limits) {
  const fn = zoomRectFunctions[scale.type] || zoomRectFunctions.default;
  helpers.callback(fn, [scale, from, to, limits]);
}
function getCenter(chart) {
  const ca = chart.chartArea;
  return {
    x: (ca.left + ca.right) / 2,
    y: (ca.top + ca.bottom) / 2,
  };
}
function zoom(chart, amount, transition = 'none', trigger = 'api') {
  const {x = 1, y = 1, focalPoint = getCenter(chart)} = typeof amount === 'number' ? {x: amount, y: amount} : amount;
  const state = getState(chart);
  const {options: {limits, zoom: zoomOptions}} = state;
  storeOriginalScaleLimits(chart, state);
  const xEnabled = x !== 1;
  const yEnabled = y !== 1;
  const enabledScales = getEnabledScalesByPoint(zoomOptions, focalPoint, chart);
  helpers.each(enabledScales || chart.scales, function(scale) {
    if (scale.isHorizontal() && xEnabled) {
      doZoom(scale, x, focalPoint, limits);
    } else if (!scale.isHorizontal() && yEnabled) {
      doZoom(scale, y, focalPoint, limits);
    }
  });
  chart.update(transition);
  helpers.callback(zoomOptions.onZoom, [{chart, trigger}]);
}
function zoomRect(chart, p0, p1, transition = 'none', trigger = 'api') {
  const state = getState(chart);
  const {options: {limits, zoom: zoomOptions}} = state;
  const {mode = 'xy'} = zoomOptions;
  storeOriginalScaleLimits(chart, state);
  const xEnabled = directionEnabled(mode, 'x', chart);
  const yEnabled = directionEnabled(mode, 'y', chart);
  helpers.each(chart.scales, function(scale) {
    if (scale.isHorizontal() && xEnabled) {
      doZoomRect(scale, p0.x, p1.x, limits);
    } else if (!scale.isHorizontal() && yEnabled) {
      doZoomRect(scale, p0.y, p1.y, limits);
    }
  });
  chart.update(transition);
  helpers.callback(zoomOptions.onZoom, [{chart, trigger}]);
}
function zoomScale(chart, scaleId, range, transition = 'none', trigger = 'api') {
  const state = getState(chart);
  storeOriginalScaleLimits(chart, state);
  const scale = chart.scales[scaleId];
  updateRange(scale, range, undefined, true);
  chart.update(transition);
  helpers.callback(state.options.zoom?.onZoom, [{chart, trigger}]);
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
    delete state.updatedScaleLimits[scale.id];
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
  const storedDelta = panDelta[scale.id] || 0;
  if (helpers.sign(storedDelta) === helpers.sign(delta)) {
    delta += storedDelta;
  }
  const fn = panFunctions[scale.type] || panFunctions.default;
  if (helpers.callback(fn, [scale, delta, limits])) {
    panDelta[scale.id] = 0;
  } else {
    panDelta[scale.id] = delta;
  }
}
function pan(chart, delta, enabledScales, transition = 'none') {
  const {x = 0, y = 0} = typeof delta === 'number' ? {x: delta, y: delta} : delta;
  const state = getState(chart);
  const {options: {pan: panOptions, limits}} = state;
  const {onPan} = panOptions || {};
  storeOriginalScaleLimits(chart, state);
  const xEnabled = x !== 0;
  const yEnabled = y !== 0;
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
  storeOriginalScaleLimits(chart, state);
  const scaleBounds = {};
  for (const scaleId of Object.keys(chart.scales)) {
    const {min, max} = state.originalScaleLimits[scaleId] || {min: {}, max: {}};
    scaleBounds[scaleId] = {min: min.scale, max: max.scale};
  }
  return scaleBounds;
}
function getZoomedScaleBounds(chart) {
  const state = getState(chart);
  const scaleBounds = {};
  for (const scaleId of Object.keys(chart.scales)) {
    scaleBounds[scaleId] = state.updatedScaleLimits[scaleId];
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
function isZoomingOrPanning(chart) {
  const state = getState(chart);
  return state.panning || state.dragging;
}

const clamp = (x, from, to) => Math.min(to, Math.max(from, x));
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
    return;
  }
  removeHandler(chart, type);
  handlers[type] = (event) => handler(chart, event, options);
  handlers[type].target = target;
  const passive = type === 'wheel' ? false : undefined;
  target.addEventListener(type, handlers[type], {passive});
}
function mouseMove(chart, event) {
  const state = getState(chart);
  if (state.dragStart) {
    state.dragging = true;
    state.dragEnd = event;
    chart.update('none');
  }
}
function keyDown(chart, event) {
  const state = getState(chart);
  if (!state.dragStart || event.key !== 'Escape') {
    return;
  }
  removeHandler(chart, 'keydown');
  state.dragging = false;
  state.dragStart = state.dragEnd = null;
  chart.update('none');
}
function getPointPosition(event, chart) {
  if (event.target !== chart.canvas) {
    const canvasArea = chart.canvas.getBoundingClientRect();
    return {
      x: event.clientX - canvasArea.left,
      y: event.clientY - canvasArea.top,
    };
  }
  return helpers.getRelativePosition(event, chart);
}
function zoomStart(chart, event, zoomOptions) {
  const {onZoomStart, onZoomRejected} = zoomOptions;
  if (onZoomStart) {
    const point = getPointPosition(event, chart);
    if (helpers.callback(onZoomStart, [{chart, event, point}]) === false) {
      helpers.callback(onZoomRejected, [{chart, event}]);
      return false;
    }
  }
}
function mouseDown(chart, event) {
  if (chart.legend) {
    const point = helpers.getRelativePosition(event, chart);
    if (helpers._isPointInArea(point, chart.legend)) {
      return;
    }
  }
  const state = getState(chart);
  const {pan: panOptions, zoom: zoomOptions = {}} = state.options;
  if (
    event.button !== 0 ||
    keyPressed(getModifierKey(panOptions), event) ||
    keyNotPressed(getModifierKey(zoomOptions.drag), event)
  ) {
    return helpers.callback(zoomOptions.onZoomRejected, [{chart, event}]);
  }
  if (zoomStart(chart, event, zoomOptions) === false) {
    return;
  }
  state.dragStart = event;
  addHandler(chart, chart.canvas.ownerDocument, 'mousemove', mouseMove);
  addHandler(chart, window.document, 'keydown', keyDown);
}
function applyAspectRatio({begin, end}, aspectRatio) {
  let width = end.x - begin.x;
  let height = end.y - begin.y;
  const ratio = Math.abs(width / height);
  if (ratio > aspectRatio) {
    width = Math.sign(width) * Math.abs(height * aspectRatio);
  } else if (ratio < aspectRatio) {
    height = Math.sign(height) * Math.abs(width / aspectRatio);
  }
  end.x = begin.x + width;
  end.y = begin.y + height;
}
function applyMinMaxProps(rect, chartArea, points, {min, max, prop}) {
  rect[min] = clamp(Math.min(points.begin[prop], points.end[prop]), chartArea[min], chartArea[max]);
  rect[max] = clamp(Math.max(points.begin[prop], points.end[prop]), chartArea[min], chartArea[max]);
}
function getRelativePoints(chart, pointEvents, maintainAspectRatio) {
  const points = {
    begin: getPointPosition(pointEvents.dragStart, chart),
    end: getPointPosition(pointEvents.dragEnd, chart),
  };
  if (maintainAspectRatio) {
    const aspectRatio = chart.chartArea.width / chart.chartArea.height;
    applyAspectRatio(points, aspectRatio);
  }
  return points;
}
function computeDragRect(chart, mode, pointEvents, maintainAspectRatio) {
  const xEnabled = directionEnabled(mode, 'x', chart);
  const yEnabled = directionEnabled(mode, 'y', chart);
  const {top, left, right, bottom, width: chartWidth, height: chartHeight} = chart.chartArea;
  const rect = {top, left, right, bottom};
  const points = getRelativePoints(chart, pointEvents, maintainAspectRatio && xEnabled && yEnabled);
  if (xEnabled) {
    applyMinMaxProps(rect, chart.chartArea, points, {min: 'left', max: 'right', prop: 'x'});
  }
  if (yEnabled) {
    applyMinMaxProps(rect, chart.chartArea, points, {min: 'top', max: 'bottom', prop: 'y'});
  }
  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  return {
    ...rect,
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
  const {mode, onZoomComplete, drag: {threshold = 0, maintainAspectRatio}} = state.options.zoom;
  const rect = computeDragRect(chart, mode, {dragStart: state.dragStart, dragEnd: event}, maintainAspectRatio);
  const distanceX = directionEnabled(mode, 'x', chart) ? rect.width : 0;
  const distanceY = directionEnabled(mode, 'y', chart) ? rect.height : 0;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  state.dragStart = state.dragEnd = null;
  if (distance <= threshold) {
    state.dragging = false;
    chart.update('none');
    return;
  }
  zoomRect(chart, {x: rect.left, y: rect.top}, {x: rect.right, y: rect.bottom}, 'zoom', 'drag');
  state.dragging = false;
  state.filterNextClick = true;
  helpers.callback(onZoomComplete, [{chart}]);
}
function wheelPreconditions(chart, event, zoomOptions) {
  if (keyNotPressed(getModifierKey(zoomOptions.wheel), event)) {
    helpers.callback(zoomOptions.onZoomRejected, [{chart, event}]);
    return;
  }
  if (zoomStart(chart, event, zoomOptions) === false) {
    return;
  }
  if (event.cancelable) {
    event.preventDefault();
  }
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
  const speed = zoomOptions.wheel.speed;
  const percentage = event.deltaY >= 0 ? 2 - 1 / (1 - speed) : 1 + speed;
  const amount = {
    x: percentage,
    y: percentage,
    focalPoint: {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  };
  zoom(chart, amount, 'zoom', 'wheel');
  helpers.callback(onZoomComplete, [{chart}]);
}
function addDebouncedHandler(chart, name, handler, delay) {
  if (handler) {
    getState(chart).handlers[name] = debounce(() => helpers.callback(handler, [{chart}]), delay);
  }
}
function addListeners(chart, options) {
  const canvas = chart.canvas;
  const {wheel: wheelOptions, drag: dragOptions, onZoomComplete} = options.zoom;
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
    removeHandler(chart, 'keydown');
  }
}
function removeListeners(chart) {
  removeHandler(chart, 'mousedown');
  removeHandler(chart, 'mousemove');
  removeHandler(chart, 'mouseup');
  removeHandler(chart, 'wheel');
  removeHandler(chart, 'click');
  removeHandler(chart, 'keydown');
}

function createEnabler(chart, state) {
  return function(recognizer, event) {
    const {pan: panOptions, zoom: zoomOptions = {}} = state.options;
    if (!panOptions || !panOptions.enabled) {
      return false;
    }
    const srcEvent = event && event.srcEvent;
    if (!srcEvent) {
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
  const pinchX = Math.abs(p0.clientX - p1.clientX);
  const pinchY = Math.abs(p0.clientY - p1.clientY);
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
    zoom(chart, amount, 'zoom', 'pinch');
    state.scale = e.scale;
  }
}
function startPinch(chart, state, event) {
  if (state.options.zoom.pinch.enabled) {
    const point = helpers.getRelativePosition(event, chart);
    if (helpers.callback(state.options.zoom.onZoomStart, [{chart, event, point}]) === false) {
      state.scale = null;
      helpers.callback(state.options.zoom.onZoomRejected, [{chart, event}]);
    } else {
      state.scale = 1;
    }
  }
}
function endPinch(chart, state, e) {
  if (state.scale) {
    handlePinch(chart, state, e);
    state.scale = null;
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
  const {enabled, onPanStart, onPanRejected} = state.options.pan;
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
  state.panScales = getEnabledScalesByPoint(state.options.pan, point, chart);
  state.delta = {x: 0, y: 0};
  handlePan(chart, state, event);
}
function endPan(chart, state) {
  state.delta = null;
  if (state.panning) {
    state.panning = false;
    state.filterNextClick = true;
    helpers.callback(state.options.pan.onPanComplete, [{chart}]);
  }
}
const hammers = new WeakMap();
function startHammer(chart, options) {
  const state = getState(chart);
  const canvas = chart.canvas;
  const {pan: panOptions, zoom: zoomOptions} = options;
  const mc = new Hammer.Manager(canvas);
  if (zoomOptions && zoomOptions.pinch.enabled) {
    mc.add(new Hammer.Pinch());
    mc.on('pinchstart', (e) => startPinch(chart, state, e));
    mc.on('pinch', (e) => handlePinch(chart, state, e));
    mc.on('pinchend', (e) => endPinch(chart, state, e));
  }
  if (panOptions && panOptions.enabled) {
    mc.add(new Hammer.Pan({
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
function hammerOptionsChanged(oldOptions, newOptions) {
  const {pan: oldPan, zoom: oldZoom} = oldOptions;
  const {pan: newPan, zoom: newZoom} = newOptions;
  if (oldZoom?.zoom?.pinch?.enabled !== newZoom?.zoom?.pinch?.enabled) {
    return true;
  }
  if (oldPan?.enabled !== newPan?.enabled) {
    return true;
  }
  if (oldPan?.threshold !== newPan?.threshold) {
    return true;
  }
  return false;
}

var version = "2.2.0";

function draw(chart, caller, options) {
  const dragOptions = options.zoom.drag;
  const {dragStart, dragEnd} = getState(chart);
  if (dragOptions.drawTime !== caller || !dragEnd) {
    return;
  }
  const {left, top, width, height} = computeDragRect(chart, options.zoom.mode, {dragStart, dragEnd}, dragOptions.maintainAspectRatio);
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
        drawTime: 'beforeDatasetsDraw',
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
    if (Object.prototype.hasOwnProperty.call(options.zoom, 'overScaleMode')
      || Object.prototype.hasOwnProperty.call(options.pan, 'overScaleMode')) {
      console.warn('The option `overScaleMode` is deprecated. Please use `scaleMode` instead (and update `mode` as desired).');
    }
    if (Hammer) {
      startHammer(chart, options);
    }
    chart.pan = (delta, panScales, transition) => pan(chart, delta, panScales, transition);
    chart.zoom = (args, transition) => zoom(chart, args, transition);
    chart.zoomRect = (p0, p1, transition) => zoomRect(chart, p0, p1, transition);
    chart.zoomScale = (id, range, transition) => zoomScale(chart, id, range, transition);
    chart.resetZoom = (transition) => resetZoom(chart, transition);
    chart.getZoomLevel = () => getZoomLevel(chart);
    chart.getInitialScaleBounds = () => getInitialScaleBounds(chart);
    chart.getZoomedScaleBounds = () => getZoomedScaleBounds(chart);
    chart.isZoomedOrPanned = () => isZoomedOrPanned(chart);
    chart.isZoomingOrPanning = () => isZoomingOrPanning(chart);
  },
  beforeEvent(chart, {event}) {
    if (isZoomingOrPanning(chart)) {
      return false;
    }
    if (event.type === 'click' || event.type === 'mouseup') {
      const state = getState(chart);
      if (state.filterNextClick) {
        state.filterNextClick = false;
        return false;
      }
    }
  },
  beforeUpdate: function(chart, args, options) {
    const state = getState(chart);
    const previousOptions = state.options;
    state.options = options;
    if (hammerOptionsChanged(previousOptions, options)) {
      stopHammer(chart);
      startHammer(chart, options);
    }
    addListeners(chart, options);
  },
  beforeDatasetsDraw(chart, _args, options) {
    draw(chart, 'beforeDatasetsDraw', options);
  },
  afterDatasetsDraw(chart, _args, options) {
    draw(chart, 'afterDatasetsDraw', options);
  },
  beforeDraw(chart, _args, options) {
    draw(chart, 'beforeDraw', options);
  },
  afterDraw(chart, _args, options) {
    draw(chart, 'afterDraw', options);
  },
  stop: function(chart) {
    removeListeners(chart);
    if (Hammer) {
      stopHammer(chart);
    }
    removeState(chart);
  },
  panFunctions,
  zoomFunctions,
  zoomRectFunctions,
};

chart_js.Chart.register(Zoom);

return Zoom;

}));
