/*!
 * chartjs-plugin-streaming v2.0.0-beta.1
 * https://nagix.github.io/chartjs-plugin-streaming
 * (c) 2021 Akihiko Kusanagi
 * Released under the MIT license
 */
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('chart.js'), require('chart.js/helpers')) :
typeof define === 'function' && define.amd ? define(['chart.js', 'chart.js/helpers'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ChartStreaming = factory(global.Chart, global.Chart.helpers));
}(this, (function (Chart, helpers) { 'use strict';

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Chart__default = /*#__PURE__*/_interopDefaultLegacy(Chart);

function clamp(value, lower, upper) {
  return Math.min(Math.max(value, lower), upper);
}

function resolveOption(scale, key) {
  const realtimeOpts = scale.options.realtime;
  const streamingOpts = scale.chart.options.plugins.streaming;
  return helpers.valueOrDefault(realtimeOpts[key], streamingOpts[key]);
}

/**
* Cancel animation polyfill
*/
const cancelAnimFrame = (function() {
  if (typeof window === 'undefined') {
    return helpers.noop;
  }
  return window.cancelAnimationFrame;
}());

function startFrameRefreshTimer(context, func) {
  if (!context.frameRequestID) {
    const frameRefresh = function() {
      func();
      context.frameRequestID = helpers.requestAnimFrame.call(window, frameRefresh);
    };
    context.frameRequestID = helpers.requestAnimFrame.call(window, frameRefresh);
  }
}

function stopFrameRefreshTimer(context) {
  const frameRequestID = context.frameRequestID;

  if (frameRequestID) {
    cancelAnimFrame.call(window, frameRequestID);
    delete context.frameRequestID;
  }
}

var StreamingHelper = /*#__PURE__*/Object.freeze({
__proto__: null,
clamp: clamp,
resolveOption: resolveOption,
cancelAnimFrame: cancelAnimFrame,
startFrameRefreshTimer: startFrameRefreshTimer,
stopFrameRefreshTimer: stopFrameRefreshTimer
});

const chartStates = new WeakMap();

function getState(chart) {
  let state = chartStates.get(chart);

  if (!state) {
    state = {originalScaleLimits: {}};
    chartStates.set(chart, state);
  }
  return state;
}

function storeOriginalScaleLimits(chart) {
  const {originalScaleLimits} = getState(chart);
  const scales = chart.scales;

  helpers.each(scales, scale => {
    const id = scale.id;

    if (!originalScaleLimits[id]) {
      originalScaleLimits[id] = {
        duration: resolveOption(scale, 'duration'),
        delay: resolveOption(scale, 'delay')
      };
    }
  });
  helpers.each(originalScaleLimits, (opt, key) => {
    if (!scales[key]) {
      delete originalScaleLimits[key];
    }
  });
  return originalScaleLimits;
}

function zoomRealTimeScale(scale, zoom, center, limits) {
  const {chart, axis} = scale;
  const {minDuration = 0, maxDuration = Infinity, minDelay = -Infinity, maxDelay = Infinity} = limits && limits[axis] || {};
  const realtimeOpts = scale.options.realtime;
  const duration = resolveOption(scale, 'duration');
  const delay = resolveOption(scale, 'delay');
  const newDuration = clamp(duration * (2 - zoom), minDuration, maxDuration);
  let maxPercent, newDelay;

  storeOriginalScaleLimits(chart);

  if (scale.isHorizontal()) {
    maxPercent = (scale.right - center.x) / (scale.right - scale.left);
  } else {
    maxPercent = (scale.bottom - center.y) / (scale.bottom - scale.top);
  }
  newDelay = delay + maxPercent * (duration - newDuration);
  realtimeOpts.duration = newDuration;
  realtimeOpts.delay = clamp(newDelay, minDelay, maxDelay);
  return newDuration !== scale.max - scale.min;
}

function panRealTimeScale(scale, delta, limits) {
  const {chart, axis} = scale;
  const {minDelay = -Infinity, maxDelay = Infinity} = limits && limits[axis] || {};
  const delay = resolveOption(scale, 'delay');
  const newDelay = delay + (scale.getValueForPixel(delta) - scale.getValueForPixel(0));

  storeOriginalScaleLimits(chart);

  scale.options.realtime.delay = clamp(newDelay, minDelay, maxDelay);
  return true;
}

function resetRealTimeOptions(chart) {
  const originalScaleLimits = storeOriginalScaleLimits(chart);

  helpers.each(chart.scales, scale => {
    const realtimeOptions = scale.options.realtime;

    if (realtimeOptions) {
      const original = originalScaleLimits[scale.id];

      if (original) {
        realtimeOptions.duration = original.duration;
        realtimeOptions.delay = original.delay;
      } else {
        delete realtimeOptions.duration;
        delete realtimeOptions.delay;
      }
    }
  });
}

const TimeScale = Chart__default['default'].registry.getScale('time');

// Ported from Chart.js 2.8.0 35273ee.
const INTERVALS = {
  millisecond: {
    common: true,
    size: 1,
    steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
  },
  second: {
    common: true,
    size: 1000,
    steps: [1, 2, 5, 10, 15, 30]
  },
  minute: {
    common: true,
    size: 60000,
    steps: [1, 2, 5, 10, 15, 30]
  },
  hour: {
    common: true,
    size: 3600000,
    steps: [1, 2, 3, 6, 12]
  },
  day: {
    common: true,
    size: 86400000,
    steps: [1, 2, 5]
  },
  week: {
    common: false,
    size: 604800000,
    steps: [1, 2, 3, 4]
  },
  month: {
    common: true,
    size: 2.628e9,
    steps: [1, 2, 3]
  },
  quarter: {
    common: false,
    size: 7.884e9,
    steps: [1, 2, 3, 4]
  },
  year: {
    common: true,
    size: 3.154e10
  }
};

// Ported from Chart.js 2.8.0 35273ee.
const UNITS = Object.keys(INTERVALS);

// Ported from Chart.js 2.8.0 35273ee.
function determineStepSize(min, max, unit, capacity) {
  const range = max - min;
  const {size: milliseconds, steps} = INTERVALS[unit];
  let factor;

  if (!steps) {
    return Math.ceil(range / (capacity * milliseconds));
  }

  for (let i = 0, ilen = steps.length; i < ilen; ++i) {
    factor = steps[i];
    if (Math.ceil(range / (milliseconds * factor)) <= capacity) {
      break;
    }
  }

  return factor;
}

// Ported from Chart.js 2.8.0 35273ee.
function determineUnitForAutoTicks(minUnit, min, max, capacity) {
  const range = max - min;
  const ilen = UNITS.length;

  for (let i = UNITS.indexOf(minUnit); i < ilen - 1; ++i) {
    const {common, size, steps} = INTERVALS[UNITS[i]];
    const factor = steps ? steps[steps.length - 1] : Number.MAX_SAFE_INTEGER;

    if (common && Math.ceil(range / (factor * size)) <= capacity) {
      return UNITS[i];
    }
  }

  return UNITS[ilen - 1];
}

// Ported from Chart.js 2.8.0 35273ee.
function determineMajorUnit(unit) {
  for (let i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) {
    if (INTERVALS[UNITS[i]].common) {
      return UNITS[i];
    }
  }
}

// Ported from Chart.js 3.2.0 e1404ac.
function addTick(ticks, time, timestamps) {
  if (!timestamps) {
    ticks[time] = true;
  } else if (timestamps.length) {
    const {lo, hi} = helpers._lookup(timestamps, time);
    const timestamp = timestamps[lo] >= time ? timestamps[lo] : timestamps[hi];
    ticks[timestamp] = true;
  }
}

function getAxisKey(meta, id) {
  return id === meta.xAxisID && 'x' || id === meta.yAxisID && 'y';
}

const datasetPropertyKeys = [
  'pointBackgroundColor',
  'pointBorderColor',
  'pointBorderWidth',
  'pointRadius',
  'pointRotation',
  'pointStyle',
  'pointHitRadius',
  'pointHoverBackgroundColor',
  'pointHoverBorderColor',
  'pointHoverBorderWidth',
  'pointHoverRadius',
  'backgroundColor',
  'borderColor',
  'borderSkipped',
  'borderWidth',
  'hoverBackgroundColor',
  'hoverBorderColor',
  'hoverBorderWidth',
  'hoverRadius',
  'hitRadius',
  'radius',
  'rotation'
];

function refreshData(scale) {
  const {chart, id, max} = scale;
  const duration = resolveOption(scale, 'duration');
  const delay = resolveOption(scale, 'delay');
  const ttl = resolveOption(scale, 'ttl');
  const pause = resolveOption(scale, 'pause');
  const onRefresh = resolveOption(scale, 'onRefresh');
  const min = Date.now() - (isNaN(ttl) ? duration + delay : ttl);
  let i, start, count, removalRange;

  helpers.callback(onRefresh, [chart]);

  // Remove old data
  chart.data.datasets.forEach((dataset, datasetIndex) => {
    const meta = chart.getDatasetMeta(datasetIndex);
    const axis = getAxisKey(meta, id);

    if (axis) {
      const controller = meta.controller;
      const data = dataset.data;
      const length = data.length;

      if (pause) {
        // If the scale is paused, preserve the visible data points
        for (i = 0; i < length; ++i) {
          if (!(controller.getParsed(i)[axis] < max)) {
            break;
          }
        }
        start = i + 2;
      } else {
        start = 0;
      }

      for (i = start; i < length; ++i) {
        if (!(controller.getParsed(i)[axis] <= min)) {
          break;
        }
      }
      count = i - start;
      if (isNaN(ttl)) {
        // Keep the last two data points outside the range not to affect the existing bezier curve
        count = Math.max(count - 2, 0);
      }

      data.splice(start, count);
      datasetPropertyKeys.forEach(key => {
        if (dataset.hasOwnProperty(key) && helpers.isArray(dataset[key])) {
          dataset[key].splice(start, count);
        }
      });
      helpers.each(dataset.datalabels, value => {
        if (helpers.isArray(value)) {
          value.splice(start, count);
        }
      });
      if (typeof data[0] !== 'object') {
        removalRange = {
          start: start,
          count: count
        };
      }
    }
  });
  if (removalRange) {
    chart.data.labels.splice(removalRange.start, removalRange.count);
  }

  chart.update('quiet');
}

function stopDataRefreshTimer(scale) {
  const realtime = scale.realtime;
  const refreshTimerID = realtime.refreshTimerID;

  if (refreshTimerID) {
    clearInterval(refreshTimerID);
    delete realtime.refreshTimerID;
    delete realtime.refreshInterval;
  }
}

function startDataRefreshTimer(scale) {
  const realtime = scale.realtime;
  const interval = resolveOption(scale, 'refresh');

  if (realtime.refreshTimerID) {
    return;
  }

  realtime.refreshTimerID = setInterval(() => {
    const newInterval = resolveOption(scale, 'refresh');

    refreshData(scale);
    if (realtime.refreshInterval !== newInterval && !isNaN(newInterval)) {
      stopDataRefreshTimer(scale);
      startDataRefreshTimer(scale);
    }
  }, interval);
  realtime.refreshInterval = interval;
}

const transitionKeys = {
  x: {
    data: ['x', 'controlPointPreviousX', 'controlPointNextX'],
    dataset: ['x'],
    tooltip: ['x', 'caretX']
  },
  y: {
    data: ['y', 'controlPointPreviousY', 'controlPointNextY'],
    dataset: ['y'],
    tooltip: ['y', 'caretY']
  }
};

function transition(element, keys, translate) {
  const animations = element.$animations;

  for (let i = 0, ilen = keys.length; i < ilen; ++i) {
    const key = keys[i];

    if (!isNaN(element[key])) {
      element[key] -= translate;
    }
  }
  if (animations) {
    for (let i = 0, ilen = keys.length; i < ilen; ++i) {
      const value = animations[keys[i]];

      if (value) {
        value._from -= translate;
        value._to -= translate;
      }
    }
  }
}

function scroll(scale) {
  const {chart, id, realtime} = scale;
  const duration = resolveOption(scale, 'duration');
  const delay = resolveOption(scale, 'delay');
  const isHorizontal = scale.isHorizontal();
  const tooltip = chart.tooltip;
  const activeTooltip = tooltip._active;
  const now = Date.now();
  let length, keys, offset;

  if (isHorizontal) {
    length = scale.width;
    keys = transitionKeys.x;
  } else {
    length = scale.height;
    keys = transitionKeys.y;
  }
  offset = length * (now - realtime.head) / duration;

  if (!!isHorizontal === !!scale.options.reverse) {
    offset = -offset;
  }

  // Shift all the elements leftward or upward
  helpers.each(chart.data.datasets, (dataset, datasetIndex) => {
    const meta = chart.getDatasetMeta(datasetIndex);

    if (getAxisKey(meta, id)) {
      const {data, dataset: element} = meta;
      const elements = data || [];

      for (let i = 0, ilen = elements.length; i < ilen; ++i) {
        transition(elements[i], keys.data, offset);
      }

      if (element) {
        transition(element, keys.dataset, offset);
      }
    }
  });

  // Shift tooltip leftward or upward
  if (activeTooltip && activeTooltip[0]) {
    const meta = chart.getDatasetMeta(activeTooltip[0].datasetIndex);

    if (getAxisKey(meta, id)) {
      transition(tooltip, keys.tooltip, offset);
    }
  }

  scale.max = now - delay;
  scale.min = scale.max - duration;

  realtime.head = now;
}

class RealTimeScale extends TimeScale {

  constructor(props) {
    super(props);
    this.realtime = this.realtime || {};
  }

  init(scaleOpts, opts) {
    super.init(scaleOpts, opts);
    startDataRefreshTimer(this);
  }

  update(maxWidth, maxHeight, margins) {
    const me = this;
    const {realtime, options} = me;
    const {bounds, offset, ticks: ticksOpts} = options;
    const {autoSkip, source, major: majorTicksOpts} = ticksOpts;
    const majorEnabled = majorTicksOpts.enabled;

    if (resolveOption(me, 'pause')) {
      stopFrameRefreshTimer(realtime);
    } else {
      startFrameRefreshTimer(realtime, () => {
        scroll(me);
      });
      realtime.head = Date.now();
    }

    options.bounds = undefined;
    options.offset = false;
    ticksOpts.autoSkip = false;
    ticksOpts.source = source === 'auto' ? '' : source;
    majorTicksOpts.enabled = true;

    super.update(maxWidth, maxHeight, margins);

    options.bounds = bounds;
    options.offset = offset;
    ticksOpts.autoSkip = autoSkip;
    ticksOpts.source = source;
    majorTicksOpts.enabled = majorEnabled;
  }

  buildTicks() {
    const me = this;
    const duration = resolveOption(me, 'duration');
    const delay = resolveOption(me, 'delay');
    const max = me.realtime.head - delay;
    const min = max - duration;
    const maxArray = [1e15, max];
    const minArray = [-1e15, min];

    Object.defineProperty(me, 'min', {
      get: () => minArray.shift(),
      set: helpers.noop
    });
    Object.defineProperty(me, 'max', {
      get: () => maxArray.shift(),
      set: helpers.noop
    });

    const ticks = super.buildTicks();

    delete me.min;
    delete me.max;
    me.min = min;
    me.max = max;

    return ticks;
  }

  calculateLabelRotation() {
    const ticksOpts = this.options.ticks;
    const maxRotation = ticksOpts.maxRotation;

    ticksOpts.maxRotation = ticksOpts.minRotation || 0;
    super.calculateLabelRotation();
    ticksOpts.maxRotation = maxRotation;
  }

  fit() {
    const me = this;
    const options = me.options;

    super.fit();

    if (options.ticks.display && options.display && me.isHorizontal()) {
      me.paddingLeft = 3;
      me.paddingRight = 3;
      me._handleMargins();
    }
  }

  draw(chartArea) {
    const me = this;
    const {chart, ctx} = me;
    const area = me.isHorizontal() ?
      {
        left: chartArea.left,
        top: 0,
        right: chartArea.right,
        bottom: chart.height
      } : {
        left: 0,
        top: chartArea.top,
        right: chart.width,
        bottom: chartArea.bottom
      };

    me._gridLineItems = null;
    me._labelItems = null;

    // Clip and draw the scale
    helpers.clipArea(ctx, area);
    super.draw(chartArea);
    helpers.unclipArea(ctx);
  }

  destroy() {
    const me = this;

    stopFrameRefreshTimer(me.realtime);
    stopDataRefreshTimer(me);
  }

  _generate() {
    const me = this;
    const adapter = me._adapter;
    const duration = resolveOption(me, 'duration');
    const delay = resolveOption(me, 'delay');
    const refresh = resolveOption(me, 'refresh');
    const max = me.realtime.head - delay;
    const min = max - duration;
    const capacity = me._getLabelCapacity(min);
    const {time: timeOpts, ticks: ticksOpts} = me.options;
    const minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, capacity);
    const major = determineMajorUnit(minor);
    const stepSize = timeOpts.stepSize || determineStepSize(min, max, minor, capacity);
    const weekday = minor === 'week' ? timeOpts.isoWeekday : false;
    const majorTicksEnabled = ticksOpts.major.enabled;
    const hasWeekday = helpers.isNumber(weekday) || weekday === true;
    const interval = INTERVALS[minor];
    const ticks = {};
    let first = min;
    let time, count;

    // For 'week' unit, handle the first day of week option
    if (hasWeekday) {
      first = +adapter.startOf(first, 'isoWeek', weekday);
    }

    // Align first ticks on unit
    first = +adapter.startOf(first, hasWeekday ? 'day' : minor);

    // Prevent browser from freezing in case user options request millions of milliseconds
    if (adapter.diff(max, min, minor) > 100000 * stepSize) {
      throw new Error(min + ' and ' + max + ' are too far apart with stepSize of ' + stepSize + ' ' + minor);
    }

    time = first;

    if (majorTicksEnabled && major && !hasWeekday && !timeOpts.round) {
      // Align the first tick on the previous `minor` unit aligned on the `major` unit:
      // we first aligned time on the previous `major` unit then add the number of full
      // stepSize there is between first and the previous major time.
      time = +adapter.startOf(time, major);
      time = +adapter.add(time, ~~((first - time) / (interval.size * stepSize)) * stepSize, minor);
    }

    const timestamps = ticksOpts.source === 'data' && me.getDataTimestamps();
    for (count = 0; time < max + refresh; time = +adapter.add(time, stepSize, minor), count++) {
      addTick(ticks, time, timestamps);
    }

    if (time === max + refresh || count === 1) {
      addTick(ticks, time, timestamps);
    }

    return Object.keys(ticks).sort((a, b) => a - b).map(x => +x);
  }
}

RealTimeScale.id = 'realtime';

RealTimeScale.defaults = {
  bounds: 'data',
  adapters: {},
  time: {
    parser: false, // false == a pattern string from or a custom callback that converts its argument to a timestamp
    unit: false, // false == automatic or override with week, month, year, etc.
    round: false, // none, or override with week, month, year, etc.
    isoWeekday: false, // override week start day - see http://momentjs.com/docs/#/get-set/iso-weekday/
    minUnit: 'millisecond',
    displayFormats: {}
  },
  realtime: {},
  ticks: {
    autoSkip: false,
    source: 'auto',
    major: {
      enabled: true
    }
  }
};

Chart__default['default'].defaults.describe('scale.realtime', {
  _scriptable: name => name !== 'onRefresh'
});

// Draw chart at frameRate
function drawChart(chart) {
  const streaming = chart.streaming;
  const frameRate = chart.options.plugins.streaming.frameRate;
  const frameDuration = 1000 / (Math.max(frameRate, 0) || 30);
  const next = streaming.lastDrawn + frameDuration || 0;
  const now = Date.now();

  if (next <= now) {
    chart.render();
    if (streaming.lastMouseEvent) {
      setTimeout(() => {
        const lastMouseEvent = streaming.lastMouseEvent;
        if (lastMouseEvent) {
          chart._eventHandler(lastMouseEvent);
        }
      }, 0);
    }
    streaming.lastDrawn = (next + frameDuration > now) ? next : now;
  }
}

var StreamingPlugin = {
  id: 'streaming',

  beforeInit(chart) {
    const streaming = chart.streaming = chart.streaming || {};
    const canvas = streaming.canvas = chart.canvas;
    const mouseEventListener = streaming.mouseEventListener = event => {
      const pos = helpers.getRelativePosition(event, chart);
      streaming.lastMouseEvent = {
        type: 'mousemove',
        chart: chart,
        native: event,
        x: pos.x,
        y: pos.y
      };
    };

    canvas.addEventListener('mousedown', mouseEventListener);
    canvas.addEventListener('mouseup', mouseEventListener);

    chart.options.transitions.quiet = {
      animation: {
        duration: 0
      }
    };
  },

  afterInit(chart) {
    const {update, render, resetZoom} = chart;

    chart.update = mode => {
      if (mode === 'quiet') {
        // Skip the render call in the quiet mode
        chart.render = helpers.noop;
        update.call(chart, mode);
        chart.render = render;
      } else {
        update.call(chart, mode);
      }
    };

    if (resetZoom) {
      const zoomPlugin = Chart__default['default'].registry.getPlugin('zoom');

      zoomPlugin.zoomFunctions.realtime = zoomRealTimeScale;
      zoomPlugin.panFunctions.realtime = panRealTimeScale;
      chart.resetZoom = transition => {
        resetRealTimeOptions(chart);
        resetZoom(transition);
      };
    }
  },

  beforeUpdate(chart) {
    const chartOpts = chart.options;
    const scalesOpts = chartOpts.scales;

    if (scalesOpts) {
      Object.keys(scalesOpts).forEach(id => {
        const scaleOpts = scalesOpts[id];

        if (scaleOpts.type === 'realtime') {
          // Allow Bézier control to be outside the chart
          chartOpts.elements.line.capBezierPoints = false;
        }
      });
    }
    return true;
  },

  afterUpdate(chart) {
    const {scales, streaming} = chart;
    let pause = true;

    // if all scales are paused, stop refreshing frames
    helpers.each(scales, scale => {
      if (scale instanceof RealTimeScale) {
        pause &= resolveOption(scale, 'pause');
      }
    });
    if (pause) {
      stopFrameRefreshTimer(streaming);
    } else {
      startFrameRefreshTimer(streaming, () => {
        drawChart(chart);
      });
    }
  },

  beforeDatasetDraw(chart, args) {
    const {ctx, chartArea, width, height} = chart;
    const {xAxisID, yAxisID, controller} = args.meta;
    const area = {
      left: 0,
      top: 0,
      right: width,
      bottom: height
    };

    if (xAxisID && controller.getScaleForId(xAxisID) instanceof RealTimeScale) {
      area.left = chartArea.left;
      area.right = chartArea.right;
    }
    if (yAxisID && controller.getScaleForId(yAxisID) instanceof RealTimeScale) {
      area.top = chartArea.top;
      area.bottom = chartArea.bottom;
    }
    helpers.clipArea(ctx, area);
    return true;
  },

  afterDatasetDraw(chart) {
    helpers.unclipArea(chart.ctx);
  },

  beforeEvent(chart, args) {
    const streaming = chart.streaming;
    const event = args.event;

    if (event.type === 'mousemove') {
      // Save mousemove event for reuse
      streaming.lastMouseEvent = event;
    } else if (event.type === 'mouseout') {
      // Remove mousemove event
      delete streaming.lastMouseEvent;
    }
    return true;
  },

  destroy(chart) {
    const {scales, streaming} = chart;
    const {canvas, mouseEventListener} = streaming;

    stopFrameRefreshTimer(streaming);

    canvas.removeEventListener('mousedown', mouseEventListener);
    canvas.removeEventListener('mouseup', mouseEventListener);

    helpers.each(scales, scale => {
      if (scale instanceof RealTimeScale) {
        scale.destroy();
      }
    });
  },

  defaults: {
    duration: 10000,
    delay: 0,
    frameRate: 30,
    refresh: 1000,
    onRefresh: null,
    pause: false,
    ttl: undefined
  },

  descriptors: {
    _scriptable: name => name !== 'onRefresh'
  }
};

Chart__default['default'].helpers.streaming = StreamingHelper;

Chart__default['default'].register(StreamingPlugin, RealTimeScale);

return StreamingPlugin;

})));
