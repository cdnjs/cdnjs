/*!
 * chartjs-plugin-streaming v2.0.0
 * https://nagix.github.io/chartjs-plugin-streaming
 * (c) 2017-2021 Akihiko Kusanagi
 * Released under the MIT license
 */
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('chart.js'), require('chart.js/helpers')) :
typeof define === 'function' && define.amd ? define(['chart.js', 'chart.js/helpers'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ChartStreaming = factory(global.Chart, global.Chart.helpers));
}(this, (function (chart_js, helpers) { 'use strict';

function clamp(value, lower, upper) {
  return Math.min(Math.max(value, lower), upper);
}
function resolveOption(scale, key) {
  const realtimeOpts = scale.options.realtime;
  const streamingOpts = scale.chart.options.plugins.streaming;
  return helpers.valueOrDefault(realtimeOpts[key], streamingOpts[key]);
}
function getAxisMap(element, {x, y}, {xAxisID, yAxisID}) {
  const axisMap = {};
  helpers.each(x, key => {
    axisMap[key] = {axisId: xAxisID};
  });
  helpers.each(y, key => {
    axisMap[key] = {axisId: yAxisID};
  });
  return axisMap;
}
const cancelAnimFrame = (function() {
  if (typeof window === 'undefined') {
    return helpers.noop;
  }
  return window.cancelAnimationFrame;
}());
function startFrameRefreshTimer(context, func) {
  if (!context.frameRequestID) {
    const refresh = () => {
      const nextRefresh = context.nextRefresh || 0;
      const now = Date.now();
      if (nextRefresh <= now) {
        const newFrameRate = helpers.callback(func);
        const frameDuration = 1000 / (Math.max(newFrameRate, 0) || 30);
        const newNextRefresh = context.nextRefresh + frameDuration || 0;
        context.nextRefresh = newNextRefresh > now ? newNextRefresh : now + frameDuration;
      }
      context.frameRequestID = helpers.requestAnimFrame.call(window, refresh);
    };
    context.frameRequestID = helpers.requestAnimFrame.call(window, refresh);
  }
}
function stopFrameRefreshTimer(context) {
  const frameRequestID = context.frameRequestID;
  if (frameRequestID) {
    cancelAnimFrame.call(window, frameRequestID);
    delete context.frameRequestID;
  }
}
function stopDataRefreshTimer(context) {
  const refreshTimerID = context.refreshTimerID;
  if (refreshTimerID) {
    clearInterval(refreshTimerID);
    delete context.refreshTimerID;
    delete context.refreshInterval;
  }
}
function startDataRefreshTimer(context, func, interval) {
  if (!context.refreshTimerID) {
    context.refreshTimerID = setInterval(() => {
      const newInterval = helpers.callback(func);
      if (context.refreshInterval !== newInterval && !isNaN(newInterval)) {
        stopDataRefreshTimer(context);
        startDataRefreshTimer(context, func, newInterval);
      }
    }, interval || 0);
    context.refreshInterval = interval || 0;
  }
}

function scaleValue(scale, value, fallback) {
  value = typeof value === 'number' ? value : scale.parse(value);
  return helpers.isFinite(value) ?
    {value: scale.getPixelForValue(value), transitionable: true} :
    {value: fallback};
}
function updateBoxAnnotation(element, chart, options) {
  const {scales, chartArea} = chart;
  const {xScaleID, yScaleID, xMin, xMax, yMin, yMax} = options;
  const xScale = scales[xScaleID];
  const yScale = scales[yScaleID];
  const {top, left, bottom, right} = chartArea;
  const streaming = element.$streaming = {};
  if (xScale) {
    const min = scaleValue(xScale, xMin, left);
    const max = scaleValue(xScale, xMax, right);
    const reverse = min.value > max.value;
    if (min.transitionable) {
      streaming[reverse ? 'x2' : 'x'] = {axisId: xScaleID};
    }
    if (max.transitionable) {
      streaming[reverse ? 'x' : 'x2'] = {axisId: xScaleID};
    }
    if (min.transitionable !== max.transitionable) {
      streaming.width = {axisId: xScaleID, reverse: min.transitionable};
    }
  }
  if (yScale) {
    const min = scaleValue(yScale, yMin, top);
    const max = scaleValue(yScale, yMax, bottom);
    const reverse = min.value > max.value;
    if (min.transitionable) {
      streaming[reverse ? 'y2' : 'y'] = {axisId: yScaleID};
    }
    if (max.transitionable) {
      streaming[reverse ? 'y' : 'y2'] = {axisId: yScaleID};
    }
    if (min.transitionable !== max.transitionable) {
      streaming.height = {axisId: yScaleID, reverse: min.transitionable};
    }
  }
}
function updateLineAnnotation(element, chart, options) {
  const {scales, chartArea} = chart;
  const {scaleID, value} = options;
  const scale = scales[scaleID];
  const {top, left, bottom, right} = chartArea;
  const streaming = element.$streaming = {};
  if (scale) {
    const isHorizontal = scale.isHorizontal();
    const pixel = scaleValue(scale, value);
    if (pixel.transitionable) {
      streaming[isHorizontal ? 'x' : 'y'] = {axisId: scaleID};
      streaming[isHorizontal ? 'x2' : 'y2'] = {axisId: scaleID};
    }
    return isHorizontal ? {top, bottom} : {left, right};
  }
  const {xScaleID, yScaleID, xMin, xMax, yMin, yMax} = options;
  const xScale = scales[xScaleID];
  const yScale = scales[yScaleID];
  const clip = {};
  if (xScale) {
    const min = scaleValue(xScale, xMin);
    const max = scaleValue(xScale, xMax);
    if (min.transitionable) {
      streaming.x = {axisId: xScaleID};
    } else {
      clip.left = left;
    }
    if (max.transitionable) {
      streaming.x2 = {axisId: xScaleID};
    } else {
      clip.right = right;
    }
  }
  if (yScale) {
    const min = scaleValue(yScale, yMin);
    const max = scaleValue(yScale, yMax);
    if (min.transitionable) {
      streaming.y = {axisId: yScaleID};
    } else {
      clip.top = top;
    }
    if (max.transitionable) {
      streaming.y2 = {axisId: yScaleID};
    } else {
      clip.bottom = bottom;
    }
  }
  return clip;
}
function updatePointAnnotation(element, chart, options) {
  const scales = chart.scales;
  const {xScaleID, yScaleID, xValue, yValue} = options;
  const xScale = scales[xScaleID];
  const yScale = scales[yScaleID];
  const streaming = element.$streaming = {};
  if (xScale) {
    const x = scaleValue(xScale, xValue);
    if (x.transitionable) {
      streaming.x = {axisId: xScaleID};
    }
  }
  if (yScale) {
    const y = scaleValue(yScale, yValue);
    if (y.transitionable) {
      streaming.y = {axisId: yScaleID};
    }
  }
}
function initAnnotationPlugin() {
  const BoxAnnotation = chart_js.registry.getElement('boxAnnotation');
  const LineAnnotation = chart_js.registry.getElement('lineAnnotation');
  const PointAnnotation = chart_js.registry.getElement('pointAnnotation');
  const resolveBoxAnnotationProperties = BoxAnnotation.prototype.resolveElementProperties;
  const resolveLineAnnotationProperties = LineAnnotation.prototype.resolveElementProperties;
  const resolvePointAnnotationProperties = PointAnnotation.prototype.resolveElementProperties;
  BoxAnnotation.prototype.resolveElementProperties = function(chart, options) {
    updateBoxAnnotation(this, chart, options);
    return resolveBoxAnnotationProperties.call(this, chart, options);
  };
  LineAnnotation.prototype.resolveElementProperties = function(chart, options) {
    const chartArea = chart.chartArea;
    chart.chartArea = updateLineAnnotation(this, chart, options);
    const properties = resolveLineAnnotationProperties.call(this, chart, options);
    chart.chartArea = chartArea;
    return properties;
  };
  PointAnnotation.prototype.resolveElementProperties = function(chart, options) {
    updatePointAnnotation(this, chart, options);
    return resolvePointAnnotationProperties.call(this, chart, options);
  };
}
function attachChart$1(plugin, chart) {
  const streaming = chart.$streaming;
  if (streaming.annotationPlugin !== plugin) {
    const afterUpdate = plugin.afterUpdate;
    initAnnotationPlugin();
    streaming.annotationPlugin = plugin;
    plugin.afterUpdate = (_chart, args, options) => {
      const mode = args.mode;
      const animationOpts = options.animation;
      if (mode === 'quiet') {
        options.animation = false;
      }
      afterUpdate.call(this, _chart, args, options);
      if (mode === 'quiet') {
        options.animation = animationOpts;
      }
    };
  }
}
function getElements(chart) {
  const plugin = chart.$streaming.annotationPlugin;
  if (plugin) {
    const state = plugin._getState(chart);
    return state && state.elements || [];
  }
  return [];
}
function detachChart$1(chart) {
  delete chart.$streaming.annotationPlugin;
}

const transitionKeys$1 = {x: ['x', 'caretX'], y: ['y', 'caretY']};
function update$1(...args) {
  const me = this;
  const element = me.getActiveElements()[0];
  if (element) {
    const meta = me._chart.getDatasetMeta(element.datasetIndex);
    me.$streaming = getAxisMap(me, transitionKeys$1, meta);
  } else {
    me.$streaming = {};
  }
  me.constructor.prototype.update.call(me, ...args);
}

const chartStates = new WeakMap();
function getState(chart) {
  let state = chartStates.get(chart);
  if (!state) {
    state = {originalScaleOptions: {}};
    chartStates.set(chart, state);
  }
  return state;
}
function removeState(chart) {
  chartStates.delete(chart);
}
function storeOriginalScaleOptions(chart) {
  const {originalScaleOptions} = getState(chart);
  const scales = chart.scales;
  helpers.each(scales, scale => {
    const id = scale.id;
    if (!originalScaleOptions[id]) {
      originalScaleOptions[id] = {
        duration: resolveOption(scale, 'duration'),
        delay: resolveOption(scale, 'delay')
      };
    }
  });
  helpers.each(originalScaleOptions, (opt, key) => {
    if (!scales[key]) {
      delete originalScaleOptions[key];
    }
  });
  return originalScaleOptions;
}
function zoomRealTimeScale(scale, zoom, center, limits) {
  const {chart, axis} = scale;
  const {minDuration = 0, maxDuration = Infinity, minDelay = -Infinity, maxDelay = Infinity} = limits && limits[axis] || {};
  const realtimeOpts = scale.options.realtime;
  const duration = resolveOption(scale, 'duration');
  const delay = resolveOption(scale, 'delay');
  const newDuration = clamp(duration * (2 - zoom), minDuration, maxDuration);
  let maxPercent, newDelay;
  storeOriginalScaleOptions(chart);
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
  storeOriginalScaleOptions(chart);
  scale.options.realtime.delay = clamp(newDelay, minDelay, maxDelay);
  return true;
}
function resetRealTimeScaleOptions(chart) {
  const originalScaleOptions = storeOriginalScaleOptions(chart);
  helpers.each(chart.scales, scale => {
    const realtimeOptions = scale.options.realtime;
    if (realtimeOptions) {
      const original = originalScaleOptions[scale.id];
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
function initZoomPlugin(plugin) {
  plugin.zoomFunctions.realtime = zoomRealTimeScale;
  plugin.panFunctions.realtime = panRealTimeScale;
}
function attachChart(plugin, chart) {
  const streaming = chart.$streaming;
  if (streaming.zoomPlugin !== plugin) {
    const resetZoom = streaming.resetZoom = chart.resetZoom;
    initZoomPlugin(plugin);
    chart.resetZoom = transition => {
      resetRealTimeScaleOptions(chart);
      resetZoom(transition);
    };
    streaming.zoomPlugin = plugin;
  }
}
function detachChart(chart) {
  const streaming = chart.$streaming;
  if (streaming.zoomPlugin) {
    chart.resetZoom = streaming.resetZoom;
    removeState(chart);
    delete streaming.resetZoom;
    delete streaming.zoomPlugin;
  }
}

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
const UNITS = Object.keys(INTERVALS);
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
function determineMajorUnit(unit) {
  for (let i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) {
    if (INTERVALS[UNITS[i]].common) {
      return UNITS[i];
    }
  }
}
function addTick(ticks, time, timestamps) {
  if (!timestamps) {
    ticks[time] = true;
  } else if (timestamps.length) {
    const {lo, hi} = helpers._lookup(timestamps, time);
    const timestamp = timestamps[lo] >= time ? timestamps[lo] : timestamps[hi];
    ticks[timestamp] = true;
  }
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
function clean(scale) {
  const {chart, id, max} = scale;
  const duration = resolveOption(scale, 'duration');
  const delay = resolveOption(scale, 'delay');
  const ttl = resolveOption(scale, 'ttl');
  const pause = resolveOption(scale, 'pause');
  const min = Date.now() - (isNaN(ttl) ? duration + delay : ttl);
  let i, start, count, removalRange;
  helpers.each(chart.data.datasets, (dataset, datasetIndex) => {
    const meta = chart.getDatasetMeta(datasetIndex);
    const axis = id === meta.xAxisID && 'x' || id === meta.yAxisID && 'y';
    if (axis) {
      const controller = meta.controller;
      const data = dataset.data;
      const length = data.length;
      if (pause) {
        for (i = 0; i < length; ++i) {
          const point = controller.getParsed(i);
          if (point && !(point[axis] < max)) {
            break;
          }
        }
        start = i + 2;
      } else {
        start = 0;
      }
      for (i = start; i < length; ++i) {
        const point = controller.getParsed(i);
        if (!point || !(point[axis] <= min)) {
          break;
        }
      }
      count = i - start;
      if (isNaN(ttl)) {
        count = Math.max(count - 2, 0);
      }
      data.splice(start, count);
      helpers.each(datasetPropertyKeys, key => {
        if (helpers.isArray(dataset[key])) {
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
      helpers.each(chart._active, (item, index) => {
        if (item.datasetIndex === datasetIndex && item.index >= start) {
          if (item.index >= start + count) {
            item.index -= count;
          } else {
            chart._active.splice(index, 1);
          }
        }
      }, null, true);
    }
  });
  if (removalRange) {
    chart.data.labels.splice(removalRange.start, removalRange.count);
  }
}
function transition(element, id, translate) {
  const animations = element.$animations || {};
  helpers.each(element.$streaming, (item, key) => {
    if (item.axisId === id) {
      const delta = item.reverse ? -translate : translate;
      const animation = animations[key];
      if (helpers.isFinite(element[key])) {
        element[key] -= delta;
      }
      if (animation) {
        animation._from -= delta;
        animation._to -= delta;
      }
    }
  });
}
function scroll(scale) {
  const {chart, id, $realtime: realtime} = scale;
  const duration = resolveOption(scale, 'duration');
  const delay = resolveOption(scale, 'delay');
  const isHorizontal = scale.isHorizontal();
  const length = isHorizontal ? scale.width : scale.height;
  const now = Date.now();
  const tooltip = chart.tooltip;
  const annotations = getElements(chart);
  let offset = length * (now - realtime.head) / duration;
  if (isHorizontal === !!scale.options.reverse) {
    offset = -offset;
  }
  helpers.each(chart.data.datasets, (dataset, datasetIndex) => {
    const meta = chart.getDatasetMeta(datasetIndex);
    const {data: elements = [], dataset: element} = meta;
    for (let i = 0, ilen = elements.length; i < ilen; ++i) {
      transition(elements[i], id, offset);
    }
    if (element) {
      transition(element, id, offset);
      delete element._path;
    }
  });
  for (let i = 0, ilen = annotations.length; i < ilen; ++i) {
    transition(annotations[i], id, offset);
  }
  if (tooltip) {
    transition(tooltip, id, offset);
  }
  scale.max = now - delay;
  scale.min = scale.max - duration;
  realtime.head = now;
}
class RealTimeScale extends chart_js.TimeScale {
  constructor(props) {
    super(props);
    this.$realtime = this.$realtime || {};
  }
  init(scaleOpts, opts) {
    const me = this;
    super.init(scaleOpts, opts);
    startDataRefreshTimer(me.$realtime, () => {
      const chart = me.chart;
      const onRefresh = resolveOption(me, 'onRefresh');
      helpers.callback(onRefresh, [chart], me);
      clean(me);
      chart.update('quiet');
      return resolveOption(me, 'refresh');
    });
  }
  update(maxWidth, maxHeight, margins) {
    const me = this;
    const {$realtime: realtime, options} = me;
    const {bounds, offset, ticks: ticksOpts} = options;
    const {autoSkip, source, major: majorTicksOpts} = ticksOpts;
    const majorEnabled = majorTicksOpts.enabled;
    if (resolveOption(me, 'pause')) {
      stopFrameRefreshTimer(realtime);
    } else {
      if (!realtime.frameRequestID) {
        realtime.head = Date.now();
      }
      startFrameRefreshTimer(realtime, () => {
        const chart = me.chart;
        const streaming = chart.$streaming;
        scroll(me);
        if (streaming) {
          helpers.callback(streaming.render, [chart]);
        }
        return resolveOption(me, 'frameRate');
      });
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
    const max = me.$realtime.head - delay;
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
    helpers.clipArea(ctx, area);
    super.draw(chartArea);
    helpers.unclipArea(ctx);
  }
  destroy() {
    const realtime = this.$realtime;
    stopFrameRefreshTimer(realtime);
    stopDataRefreshTimer(realtime);
  }
  _generate() {
    const me = this;
    const adapter = me._adapter;
    const duration = resolveOption(me, 'duration');
    const delay = resolveOption(me, 'delay');
    const refresh = resolveOption(me, 'refresh');
    const max = me.$realtime.head - delay;
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
    if (hasWeekday) {
      first = +adapter.startOf(first, 'isoWeek', weekday);
    }
    first = +adapter.startOf(first, hasWeekday ? 'day' : minor);
    if (adapter.diff(max, min, minor) > 100000 * stepSize) {
      throw new Error(min + ' and ' + max + ' are too far apart with stepSize of ' + stepSize + ' ' + minor);
    }
    time = first;
    if (majorTicksEnabled && major && !hasWeekday && !timeOpts.round) {
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
    parser: false,
    unit: false,
    round: false,
    isoWeekday: false,
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
chart_js.defaults.describe('scale.realtime', {
  _scriptable: name => name !== 'onRefresh'
});

var version = "2.0.0";

chart_js.defaults.set('transitions', {
  quiet: {
    animation: {
      duration: 0
    }
  }
});
const transitionKeys = {x: ['x', 'cp1x', 'cp2x'], y: ['y', 'cp1y', 'cp2y']};
function update(mode) {
  const me = this;
  if (mode === 'quiet') {
    helpers.each(me.data.datasets, (dataset, datasetIndex) => {
      const controller = me.getDatasetMeta(datasetIndex).controller;
      controller._setStyle = function(element, index, _mode, active) {
        chart_js.DatasetController.prototype._setStyle.call(this, element, index, 'quiet', active);
      };
    });
  }
  chart_js.Chart.prototype.update.call(me, mode);
  if (mode === 'quiet') {
    helpers.each(me.data.datasets, (dataset, datasetIndex) => {
      delete me.getDatasetMeta(datasetIndex).controller._setStyle;
    });
  }
}
function render(chart) {
  const streaming = chart.$streaming;
  chart.render();
  if (streaming.lastMouseEvent) {
    setTimeout(() => {
      const lastMouseEvent = streaming.lastMouseEvent;
      if (lastMouseEvent) {
        chart._eventHandler(lastMouseEvent);
      }
    }, 0);
  }
}
var StreamingPlugin = {
  id: 'streaming',
  version,
  beforeInit(chart) {
    const streaming = chart.$streaming = chart.$streaming || {render};
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
  },
  afterInit(chart) {
    chart.update = update;
  },
  beforeUpdate(chart) {
    const {scales, elements} = chart.options;
    const tooltip = chart.tooltip;
    helpers.each(scales, ({type}) => {
      if (type === 'realtime') {
        elements.line.capBezierPoints = false;
      }
    });
    if (tooltip) {
      tooltip.update = update$1;
    }
    try {
      const plugin = chart_js.registry.getPlugin('annotation');
      attachChart$1(plugin, chart);
    } catch (e) {
      detachChart$1(chart);
    }
    try {
      const plugin = chart_js.registry.getPlugin('zoom');
      attachChart(plugin, chart);
    } catch (e) {
      detachChart(chart);
    }
  },
  beforeDatasetUpdate(chart, args) {
    const {meta, mode} = args;
    if (mode === 'quiet') {
      const {controller, $animations} = meta;
      if ($animations && $animations.visible && $animations.visible._active) {
        controller.updateElement = helpers.noop;
        controller.updateSharedOptions = helpers.noop;
      }
    }
  },
  afterDatasetUpdate(chart, args) {
    const {meta, mode} = args;
    const {data: elements = [], dataset: element, controller} = meta;
    for (let i = 0, ilen = elements.length; i < ilen; ++i) {
      elements[i].$streaming = getAxisMap(elements[i], transitionKeys, meta);
    }
    if (element) {
      element.$streaming = getAxisMap(element, transitionKeys, meta);
    }
    if (mode === 'quiet') {
      delete controller.updateElement;
      delete controller.updateSharedOptions;
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
  },
  afterDatasetDraw(chart) {
    helpers.unclipArea(chart.ctx);
  },
  beforeEvent(chart, args) {
    const streaming = chart.$streaming;
    const event = args.event;
    if (event.type === 'mousemove') {
      streaming.lastMouseEvent = event;
    } else if (event.type === 'mouseout') {
      delete streaming.lastMouseEvent;
    }
  },
  destroy(chart) {
    const {scales, $streaming: streaming, tooltip} = chart;
    const {canvas, mouseEventListener} = streaming;
    delete chart.update;
    if (tooltip) {
      delete tooltip.update;
    }
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

const registerables = [StreamingPlugin, RealTimeScale];
chart_js.Chart.register(registerables);

return registerables;

})));
