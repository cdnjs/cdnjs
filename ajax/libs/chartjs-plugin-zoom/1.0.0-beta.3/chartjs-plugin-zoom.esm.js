/*!
* chartjs-plugin-zoom v1.0.0-beta.3
* undefined
 * (c) 2016-2021 chartjs-plugin-zoom Contributors
 * Released under the MIT License
 */
import Hammer from 'hammerjs';
import { each, callback } from 'chart.js/helpers';

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
  each(chart.scales, function(scaleItem) {
    if (!directionEnabled(mode, scaleItem.axis, chart)) {
      enabledScales.push(scaleItem);
    }
  });
  return enabledScales;
}

function zoomDelta(scale, zoom, center) {
  const range = scale.max - scale.min;
  const newRange = range * (zoom - 1);

  const centerPoint = scale.isHorizontal() ? center.x : center.y;
  const minPercent = (scale.getValueForPixel(centerPoint) - scale.min) / range || 0;
  const maxPercent = 1 - minPercent;

  return {
    min: newRange * minPercent,
    max: newRange * maxPercent
  };
}

function updateRange(scale, {min, max}, limits, zoom = false) {
  const {axis, options: scaleOpts} = scale;
  const {min: minLimit = -Infinity, max: maxLimit = Infinity, minRange = 0} = limits && limits[axis] || {};
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
    } else if (zoom && range === minRange) {
      min = scale.min;
      max = scale.max;
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
}

function zoomNumericalScale(scale, zoom, center, limits) {
  const delta = zoomDelta(scale, zoom, center);
  const newRange = {min: scale.min + delta.min, max: scale.max - delta.max};
  updateRange(scale, newRange, limits, true);
}

const integerChange = (v) => v === 0 || isNaN(v) ? 0 : v < 0 ? Math.min(Math.round(v), -1) : Math.max(Math.round(v), 1);

function zoomCategoryScale(scale, zoom, center, limits) {
  const labels = scale.getLabels();
  const maxIndex = labels.length - 1;
  if (scale.min === scale.max && zoom < 1) {
    if (scale.min > 0) {
      scale.min--;
    } else if (scale.max < maxIndex) {
      scale.max++;
    }
  }
  const delta = zoomDelta(scale, zoom, center);
  const newRange = {min: scale.min + integerChange(delta.min), max: scale.max - integerChange(delta.max)};
  updateRange(scale, newRange, limits, true);
}

const categoryDelta = new WeakMap();
function panCategoryScale(scale, delta, panOptions, limits) {
  const labels = scale.getLabels();
  const lastLabelIndex = labels.length - 1;
  const offsetAmt = Math.max(scale.ticks.length, 1);
  const panSpeed = panOptions.speed;
  const step = Math.round(scale.width / (offsetAmt * panSpeed));
  const cumDelta = (categoryDelta.get(scale) || 0) + delta;
  const scaleMin = scale.min;
  const minIndex = cumDelta > step ? Math.max(0, scaleMin - 1)
    : cumDelta < -step ? Math.min(lastLabelIndex - offsetAmt + 1, scaleMin + 1)
    : scaleMin;
  const maxIndex = Math.min(lastLabelIndex, minIndex + offsetAmt - 1);

  categoryDelta.set(scale, minIndex !== scaleMin ? 0 : cumDelta);

  updateRange(scale, {min: minIndex, max: maxIndex}, limits);
}

function panNumericalScale(scale, delta, panOptions, limits) {
  const {min: prevStart, max: prevEnd} = scale;
  const newMin = scale.getValueForPixel(scale.getPixelForValue(prevStart) - delta);
  const newMax = scale.getValueForPixel(scale.getPixelForValue(prevEnd) - delta);
  updateRange(scale, {min: newMin, max: newMax}, limits);
}

const zoomFunctions = {
  category: zoomCategoryScale,
  default: zoomNumericalScale,
};

const panFunctions = {
  category: panCategoryScale,
  default: panNumericalScale,
};

const chartStates = new WeakMap();

function getState(chart) {
  let state = chartStates.get(chart);
  if (!state) {
    state = {
      originalScaleLimits: {},
      handlers: {},
    };
    chartStates.set(chart, state);
  }
  return state;
}

function removeState(chart) {
  chartStates.delete(chart);
}

function storeOriginalScaleLimits(chart) {
  const {originalScaleLimits} = getState(chart);
  each(chart.scales, function(scale) {
    if (!originalScaleLimits[scale.id]) {
      originalScaleLimits[scale.id] = {min: scale.options.min, max: scale.options.max};
    }
  });
  each(originalScaleLimits, function(opt, key) {
    if (!chart.scales[key]) {
      delete originalScaleLimits[key];
    }
  });
  return originalScaleLimits;
}

function zoomScale(scale, zoom, center, limits) {
  const fn = zoomFunctions[scale.type] || zoomFunctions.default;
  callback(fn, [scale, zoom, center, limits]);
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
 * @param {number | {x?: number, y?: number, focalPoint?: {x: number, y: number}}} zoom The zoom percentage or percentages and focal point
 * @param {boolean} [useTransition] Whether to use `zoom` transition
 */
function doZoom(chart, zoom, useTransition) {
  const {x = 1, y = 1, focalPoint = getCenter(chart)} = typeof zoom === 'number' ? {x: zoom, y: zoom} : zoom;
  const {options: {limits, zoom: zoomOptions}} = getState(chart);
  const {mode = 'xy', overScaleMode} = zoomOptions || {};

  storeOriginalScaleLimits(chart);

  const xEnabled = x !== 1 && directionEnabled(mode, 'x', chart);
  const yEnabled = y !== 1 && directionEnabled(mode, 'y', chart);
  const enabledScales = overScaleMode && getEnabledScalesByPoint(overScaleMode, focalPoint, chart);

  each(enabledScales || chart.scales, function(scale) {
    if (scale.isHorizontal() && xEnabled) {
      zoomScale(scale, x, focalPoint, limits);
    } else if (!scale.isHorizontal() && yEnabled) {
      zoomScale(scale, y, focalPoint, limits);
    }
  });

  chart.update(useTransition ? 'zoom' : 'none');

  callback(zoomOptions.onZoom, [{chart}]);
}

function resetZoom(chart) {
  const originalScaleLimits = storeOriginalScaleLimits(chart);

  each(chart.scales, function(scale) {
    const scaleOptions = scale.options;
    if (originalScaleLimits[scale.id]) {
      scaleOptions.min = originalScaleLimits[scale.id].min;
      scaleOptions.max = originalScaleLimits[scale.id].max;
    } else {
      delete scaleOptions.min;
      delete scaleOptions.max;
    }
  });
  chart.update();
}

function panScale(scale, delta, panOptions, limits) {
  const fn = panFunctions[scale.type] || panFunctions.default;
  callback(fn, [scale, delta, panOptions, limits]);
}

function doPan(chart, pan, enabledScales) {
  const {x = 0, y = 0} = typeof pan === 'number' ? {x: pan, y: pan} : pan;
  const {options: {pan: panOptions, limits}} = getState(chart);
  const {mode = 'xy', onPan} = panOptions || {};

  storeOriginalScaleLimits(chart);

  const xEnabled = x !== 0 && directionEnabled(mode, 'x', chart);
  const yEnabled = y !== 0 && directionEnabled(mode, 'y', chart);

  each(enabledScales || chart.scales, function(scale) {
    if (scale.isHorizontal() && xEnabled) {
      panScale(scale, x, panOptions, limits);
    } else if (!scale.isHorizontal() && yEnabled) {
      panScale(scale, y, panOptions, limits);
    }
  });

  chart.update('none');

  callback(onPan, [{chart}]);
}

function removeHandler(chart, target, type) {
  const {handlers} = getState(chart);
  const handler = handlers[type];
  if (handler) {
    target.removeEventListener(type, handler);
    delete handlers[type];
  }
}

function addHandler(chart, target, type, handler) {
  const {handlers, options} = getState(chart);
  removeHandler(chart, target, type);
  handlers[type] = (event) => handler(chart, event, options);
  target.addEventListener(type, handlers[type]);
}

function mouseMove(chart, event) {
  const state = getState(chart);
  if (state.dragStart) {
    state.dragEnd = event;
    chart.update('none');
  }
}

function mouseDown(chart, event) {
  const state = getState(chart);
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

  removeHandler(chart.canvas, 'mousemove', chart);
  const zoomOptions = state.options.zoom;
  const rect = computeDragRect(chart, zoomOptions.mode, state.dragStart, event);
  const {width: dragDistanceX, height: dragDistanceY} = rect;

  // Remove drag start and end before chart update to stop drawing selected area
  state.dragStart = null;
  state.dragEnd = null;

  const zoomThreshold = zoomOptions.threshold || 0;
  if (dragDistanceX <= zoomThreshold && dragDistanceY <= zoomThreshold) {
    return;
  }

  const {top, left, width, height} = chart.chartArea;
  const zoom = {
    x: rect.zoomX,
    y: rect.zoomY,
    focalPoint: {
      x: (rect.left - left) / (1 - dragDistanceX / width) + left,
      y: (rect.top - top) / (1 - dragDistanceY / height) + top
    }
  };
  doZoom(chart, zoom, true);

  callback(zoomOptions.onZoomComplete, [chart]);
}

function wheel(chart, event) {
  const {options: {zoom: zoomOptions}} = getState(chart);
  const {wheelModifierKey, onZoomRejected, onZoomComplete} = zoomOptions;

  // Before preventDefault, check if the modifier key required and pressed
  if (wheelModifierKey && !event[wheelModifierKey + 'Key']) {
    return callback(onZoomRejected, [{chart, event}]);
  }

  // Prevent the event from triggering the default behavior (eg. Content scrolling).
  if (event.cancelable) {
    event.preventDefault();
  }

  // Firefox always fires the wheel event twice:
  // First without the delta and right after that once with the delta properties.
  if (typeof event.deltaY === 'undefined') {
    return;
  }

  const rect = event.target.getBoundingClientRect();
  const speed = 1 + (event.deltaY >= 0 ? -zoomOptions.speed : zoomOptions.speed);
  const zoom = {
    x: speed,
    y: speed,
    focalPoint: {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  };

  doZoom(chart, zoom);
}

function addListeners(chart, options) {
  const canvas = chart.canvas;

  // Install listeners. Do this dynamically based on options so that we can turn zoom on and off
  // We also want to make sure listeners aren't always on. E.g. if you're scrolling down a page
  // and the mouse goes over a chart you don't want it intercepted unless the plugin is enabled
  const zoomEnabled = options.zoom && options.zoom.enabled;
  const dragEnabled = options.zoom.drag;
  if (zoomEnabled && !dragEnabled) {
    addHandler(chart, canvas, 'wheel', wheel);
  } else {
    removeHandler(chart, canvas, 'wheel');
  }
  if (zoomEnabled && dragEnabled) {
    addHandler(chart, canvas, 'mousedown', mouseDown);
    addHandler(chart, canvas.ownerDocument, 'mouseup', mouseUp);
  } else {
    removeHandler(chart, canvas, 'mousedown');
    removeHandler(chart, canvas, 'mousemove');
    removeHandler(chart, canvas.ownerDocument, 'mouseup');
  }
}

function removeListeners(chart) {
  const {canvas} = chart;
  if (!canvas) {
    return;
  }
  removeHandler(chart, canvas, 'mousedown');
  removeHandler(chart, canvas, 'mousemove');
  removeHandler(chart, canvas.ownerDocument, 'mouseup');
  removeHandler(chart, canvas, 'wheel');
  removeHandler(chart, canvas, 'click');
}

function createEnabler(chart) {
  const state = getState(chart);
  return function(recognizer, event) {
    const panOptions = state.options.pan;
    if (!panOptions || !panOptions.enabled) {
      return false;
    }
    if (!event || !event.srcEvent) { // Sometimes Hammer queries this with a null event.
      return true;
    }
    const modifierKey = panOptions.modifierKey;
    const requireModifier = modifierKey && (event.pointerType === 'mouse');
    if (requireModifier && !event.srcEvent[modifierKey + 'Key']) {
      callback(panOptions.onPanRejected, [{chart, event}]);
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
    const zoom = {
      x: pinch.x && directionEnabled(mode, 'x', chart) ? zoomPercent : 1,
      y: pinch.y && directionEnabled(mode, 'y', chart) ? zoomPercent : 1,
      focalPoint: {
        x: center.x - rect.left,
        y: center.y - rect.top
      }
    };

    doZoom(chart, zoom);

    // Keep track of overall scale
    state.scale = e.scale;
  }
}

function startPinch(chart, state) {
  if (state.options.zoom.enabled) {
    state.scale = 1;
  }
}

function endPinch(chart, state, e) {
  if (state.scale) {
    handlePinch(chart, state, e);
    state.scale = null; // reset
    callback(state.options.zoom.onZoomComplete, [{chart}]);
  }
}


function handlePan(chart, state, e) {
  const delta = state.delta;
  if (delta !== null) {
    state.panning = true;
    doPan(chart, {x: e.deltaX - delta.x, y: e.deltaY - delta.y}, state.panScales);
    state.delta = {x: e.deltaX, y: e.deltaY};
  }
}

function startPan(chart, state, e) {
  const {enabled, overScaleMode} = state.options.pan;
  if (!enabled) {
    return;
  }
  const rect = e.target.getBoundingClientRect();
  const point = {
    x: e.center.x - rect.left,
    y: e.center.y - rect.top
  };

  state.panScales = overScaleMode && getEnabledScalesByPoint(overScaleMode, point, chart);
  state.delta = {x: 0, y: 0};
  handlePan(chart, state, e);
}

function endPan(chart, state) {
  state.delta = null;
  if (state.panning) {
    setTimeout(() => (state.panning = false), 500);
    callback(state.options.pan.onPanComplete, [{chart}]);
  }
}

const hammers = new WeakMap();
function startHammer(chart, options) {
  const state = getState(chart);
  const canvas = chart.canvas;
  const {pan: panOptions, zoom: zoomOptions} = options;

  const mc = new Hammer.Manager(canvas);
  if (zoomOptions && zoomOptions.enabled) {
    mc.add(new Hammer.Pinch());
    mc.on('pinchstart', () => startPinch(chart, state));
    mc.on('pinch', (e) => handlePinch(chart, state, e));
    mc.on('pinchend', (e) => endPinch(chart, state, e));
  }

  if (panOptions && panOptions.enabled) {
    mc.add(new Hammer.Pan({
      threshold: panOptions.threshold,
      enable: createEnabler(chart)
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

var version = "1.0.0-beta.3";

var plugin = {
  id: 'zoom',

  version,

  defaults: {
    pan: {
      enabled: false,
      mode: 'xy',
      speed: 20,
      threshold: 10,
      modifierKey: null,
    },
    zoom: {
      enabled: false,
      mode: 'xy',
      speed: 0.1,
      wheelModifierKey: null
    }
  },

  start: function(chart, args, options) {
    const state = getState(chart);
    state.options = options;

    if (Hammer) {
      startHammer(chart, options);
    }

    chart.pan = (pan, panScales) => doPan(chart, pan, panScales);
    chart.zoom = (zoom, useTransition) => doZoom(chart, zoom, useTransition);
    chart.resetZoom = () => resetZoom(chart);
  },

  beforeEvent(chart, args) {
    const state = getState(chart);
    if (args.event.type === 'click' && state.panning) {
      // cancel the click event at pan end
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

    if (Hammer) {
      stopHammer(chart);
    }
    removeState(chart);
  }
};

export default plugin;
export { doPan, doZoom, resetZoom };
