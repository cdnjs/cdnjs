/*!
 *  dc 4.2.7
 *  http://dc-js.github.io/dc.js/
 *  Copyright 2012-2021 Nick Zhu & the dc.js Developers
 *  https://github.com/dc-js/dc.js/blob/master/AUTHORS
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3'], factory) :
  (global = global || self, factory(global.dc = {}, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3));
}(this, (function (exports, d3TimeFormat, d3Time, d3Format, d3Selection, d3Dispatch, d3Array, d3Scale, d3Interpolate, d3ScaleChromatic, d3Axis, d3Zoom, d3Brush, d3Timer, d3Shape, d3Geo, d3Ease, d3Hierarchy, d3, d3Collection) { 'use strict';

  const version = "4.2.7";

  class BadArgumentException extends Error { }

  const constants = {
      CHART_CLASS: 'dc-chart',
      DEBUG_GROUP_CLASS: 'debug',
      STACK_CLASS: 'stack',
      DESELECTED_CLASS: 'deselected',
      SELECTED_CLASS: 'selected',
      NODE_INDEX_NAME: '__index__',
      GROUP_INDEX_NAME: '__group_index__',
      DEFAULT_CHART_GROUP: '__default_chart_group__',
      EVENT_DELAY: 40,
      NEGLIGIBLE_NUMBER: 1e-10
  };

  /**
   * Provides basis logging and deprecation utilities
   */
  class Logger {

      constructor () {
          /**
           * Enable debug level logging. Set to `false` by default.
           * @name enableDebugLog
           * @memberof Logger
           * @instance
           */
          this.enableDebugLog = false;

          this._alreadyWarned = {};
      }

      /**
       * Put a warning message to console
       * @example
       * logger.warn('Invalid use of .tension on CurveLinear');
       * @param {String} [msg]
       * @returns {Logger}
       */
      warn (msg) {
          if (console) {
              if (console.warn) {
                  console.warn(msg);
              } else if (console.log) {
                  console.log(msg);
              }
          }

          return this;
      }

      /**
       * Put a warning message to console. It will warn only on unique messages.
       * @example
       * logger.warnOnce('Invalid use of .tension on CurveLinear');
       * @param {String} [msg]
       * @returns {Logger}
       */
      warnOnce (msg) {
          if (!this._alreadyWarned[msg]) {
              this._alreadyWarned[msg] = true;

              logger.warn(msg);
          }

          return this;
      }

      /**
       * Put a debug message to console. It is controlled by `logger.enableDebugLog`
       * @example
       * logger.debug('Total number of slices: ' + numSlices);
       * @param {String} [msg]
       * @returns {Logger}
       */
      debug (msg) {
          if (this.enableDebugLog && console) {
              if (console.debug) {
                  console.debug(msg);
              } else if (console.log) {
                  console.log(msg);
              }
          }

          return this;
      }
  }

  const logger = new Logger();

  /**
   * General configuration
   */
  class Config {
      constructor () {
          this._defaultColors = Config._schemeCategory20c;

          /**
           * The default date format for dc.js
           * @type {Function}
           * @default d3.timeFormat('%m/%d/%Y')
           */
          this.dateFormat = d3TimeFormat.timeFormat('%m/%d/%Y');

          this._renderlet = null;

          /**
           * If this boolean is set truthy, all transitions will be disabled, and changes to the charts will happen
           * immediately.
           * @type {Boolean}
           * @default false
           */
          this.disableTransitions = false;
      }

      /**
       * Set the default color scheme for ordinal charts. Changing it will impact all ordinal charts.
       *
       * By default it is set to a copy of
       * `d3.schemeCategory20c` for backward compatibility. This color scheme has been
       * [removed from D3v5](https://github.com/d3/d3/blob/master/CHANGES.md#changes-in-d3-50).
       * In DC 3.1 release it will change to a more appropriate default.
       *
       * @example
       * config.defaultColors(d3.schemeSet1)
       * @param {Array} [colors]
       * @returns {Array|config}
       */
      defaultColors (colors) {
          if (!arguments.length) {
              // Issue warning if it uses _schemeCategory20c
              if (this._defaultColors === Config._schemeCategory20c) {
                  logger.warnOnce('You are using d3.schemeCategory20c, which has been removed in D3v5. ' +
                      'See the explanation at https://github.com/d3/d3/blob/master/CHANGES.md#changes-in-d3-50. ' +
                      'DC is using it for backward compatibility, however it will be changed in DCv3.1. ' +
                      'You can change it by calling dc.config.defaultColors(newScheme). ' +
                      'See https://github.com/d3/d3-scale-chromatic for some alternatives.');
              }
              return this._defaultColors;
          }
          this._defaultColors = colors;
          return this;
      }

  }

  // D3v5 has removed schemeCategory20c, copied here for backward compatibility
  Config._schemeCategory20c = [
      '#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#e6550d',
      '#fd8d3c', '#fdae6b', '#fdd0a2', '#31a354', '#74c476',
      '#a1d99b', '#c7e9c0', '#756bb1', '#9e9ac8', '#bcbddc',
      '#dadaeb', '#636363', '#969696', '#bdbdbd', '#d9d9d9'];

  /**
   * General configuration object; see {@link Config} for members.
   */
  const config = new Config();

  /**
   * d3.js compatiblity layer
   */
  const d3compat = {
      eventHandler: handler => function eventHandler (a, b) {
          console.warn('No d3.js compatbility event handler registered, defaulting to v6 behavior.');
          handler.call(this, b, a);
      },
      nester: ({key, sortKeys, sortValues, entries}) => {
          throw new Error('No d3.js compatbility nester registered, load v5 or v6 compability layer.');
      },
      pointer: () => { throw new Error('No d3.js compatbility pointer registered, load v5 or v6 compability layer.'); }
  };

  /**
   * The ChartRegistry maintains sets of all instantiated dc.js charts under named groups
   * and the default group. There is a single global ChartRegistry object named `chartRegistry`
   *
   * A chart group often corresponds to a crossfilter instance. It specifies
   * the set of charts which should be updated when a filter changes on one of the charts or when the
   * global functions {@link filterAll filterAll}, {@link refocusAll refocusAll},
   * {@link renderAll renderAll}, {@link redrawAll redrawAll}, or chart functions
   * {@link baseMixin#renderGroup baseMixin.renderGroup},
   * {@link baseMixin#redrawGroup baseMixin.redrawGroup} are called.
   */
  class ChartRegistry {
      constructor () {
          // chartGroup:string => charts:array
          this._chartMap = {};
      }

      _initializeChartGroup (group) {
          if (!group) {
              group = constants.DEFAULT_CHART_GROUP;
          }

          if (!(this._chartMap)[group]) {
              (this._chartMap)[group] = [];
          }

          return group;
      }

      /**
       * Determine if a given chart instance resides in any group in the registry.
       * @param {Object} chart dc.js chart instance
       * @returns {Boolean}
       */
      has (chart) {
          for (const e in this._chartMap) {
              if ((this._chartMap)[e].indexOf(chart) >= 0) {
                  return true;
              }
          }
          return false;
      }

      /**
       * Add given chart instance to the given group, creating the group if necessary.
       * If no group is provided, the default group `constants.DEFAULT_CHART_GROUP` will be used.
       * @param {Object} chart dc.js chart instance
       * @param {String} [group] Group name
       * @return {undefined}
       */
      register (chart, group) {
          const _chartMap = this._chartMap;
          group = this._initializeChartGroup(group);
          _chartMap[group].push(chart);
      }

      /**
       * Remove given chart instance from the given group, creating the group if necessary.
       * If no group is provided, the default group `constants.DEFAULT_CHART_GROUP` will be used.
       * @param {Object} chart dc.js chart instance
       * @param {String} [group] Group name
       * @return {undefined}
       */
      deregister (chart, group) {
          group = this._initializeChartGroup(group);
          for (let i = 0; i < (this._chartMap)[group].length; i++) {
              if ((this._chartMap)[group][i].anchorName() === chart.anchorName()) {
                  (this._chartMap)[group].splice(i, 1);
                  break;
              }
          }
      }

      /**
       * Clear given group if one is provided, otherwise clears all groups.
       * @param {String} group Group name
       * @return {undefined}
       */
      clear (group) {
          if (group) {
              delete (this._chartMap)[group];
          } else {
              this._chartMap = {};
          }
      }

      /**
       * Get an array of each chart instance in the given group.
       * If no group is provided, the charts in the default group are returned.
       * @param {String} [group] Group name
       * @returns {Array<Object>}
       */
      list (group) {
          group = this._initializeChartGroup(group);
          return (this._chartMap)[group];
      }
  }

  /**
   * The chartRegistry object maintains sets of all instantiated dc.js charts under named groups
   * and the default group. See {@link ChartRegistry ChartRegistry} for its methods.
   */
  const chartRegistry = new ChartRegistry();

  /**
   * Add given chart instance to the given group, creating the group if necessary.
   * If no group is provided, the default group `constants.DEFAULT_CHART_GROUP` will be used.
   * @function registerChart
   * @param {Object} chart dc.js chart instance
   * @param {String} [group] Group name
   * @return {undefined}
   */
  const registerChart = function (chart, group) {
      chartRegistry.register(chart, group);
  };

  /**
   * Remove given chart instance from the given group, creating the group if necessary.
   * If no group is provided, the default group `constants.DEFAULT_CHART_GROUP` will be used.
   * @function deregisterChart
   * @param {Object} chart dc.js chart instance
   * @param {String} [group] Group name
   * @return {undefined}
   */
  const deregisterChart = function (chart, group) {
      chartRegistry.deregister(chart, group);
  };

  /**
   * Determine if a given chart instance resides in any group in the registry.
   * @function hasChart
   * @param {Object} chart dc.js chart instance
   * @returns {Boolean}
   */
  const hasChart = function (chart) {
      return chartRegistry.has(chart);
  };

  /**
   * Clear given group if one is provided, otherwise clears all groups.
   * @function deregisterAllCharts
   * @param {String} group Group name
   * @return {undefined}
   */
  const deregisterAllCharts = function (group) {
      chartRegistry.clear(group);
  };

  /**
   * Clear all filters on all charts within the given chart group. If the chart group is not given then
   * only charts that belong to the default chart group will be reset.
   * @function filterAll
   * @param {String} [group]
   * @return {undefined}
   */
  const filterAll = function (group) {
      const charts = chartRegistry.list(group);
      for (let i = 0; i < charts.length; ++i) {
          charts[i].filterAll();
      }
  };

  /**
   * Reset zoom level / focus on all charts that belong to the given chart group. If the chart group is
   * not given then only charts that belong to the default chart group will be reset.
   * @function refocusAll
   * @param {String} [group]
   * @return {undefined}
   */
  const refocusAll = function (group) {
      const charts = chartRegistry.list(group);
      for (let i = 0; i < charts.length; ++i) {
          if (charts[i].focus) {
              charts[i].focus();
          }
      }
  };

  /**
   * Re-render all charts belong to the given chart group. If the chart group is not given then only
   * charts that belong to the default chart group will be re-rendered.
   * @function renderAll
   * @param {String} [group]
   * @return {undefined}
   */
  const renderAll = function (group) {
      const charts = chartRegistry.list(group);
      for (let i = 0; i < charts.length; ++i) {
          charts[i].render();
      }

      if (config._renderlet !== null) {
          config._renderlet(group);
      }
  };

  /**
   * Redraw all charts belong to the given chart group. If the chart group is not given then only charts
   * that belong to the default chart group will be re-drawn. Redraw is different from re-render since
   * when redrawing dc tries to update the graphic incrementally, using transitions, instead of starting
   * from scratch.
   * @function redrawAll
   * @param {String} [group]
   * @return {undefined}
   */
  const redrawAll = function (group) {
      const charts = chartRegistry.list(group);
      for (let i = 0; i < charts.length; ++i) {
          charts[i].redraw();
      }

      if (config._renderlet !== null) {
          config._renderlet(group);
      }
  };

  /**
   * Start a transition on a selection if transitions are globally enabled
   * ({@link disableTransitions} is false) and the duration is greater than zero; otherwise return
   * the selection. Since most operations are the same on a d3 selection and a d3 transition, this
   * allows a common code path for both cases.
   * @function transition
   * @param {d3.selection} selection - the selection to be transitioned
   * @param {Number|Function} [duration=250] - the duration of the transition in milliseconds, a
   * function returning the duration, or 0 for no transition
   * @param {Number|Function} [delay] - the delay of the transition in milliseconds, or a function
   * returning the delay, or 0 for no delay
   * @param {String} [name] - the name of the transition (if concurrent transitions on the same
   * elements are needed)
   * @returns {d3.transition|d3.selection}
   */
  const transition = function (selection, duration, delay, name) {
      if (config.disableTransitions || duration <= 0) {
          return selection;
      }

      let s = selection.transition(name);

      if (duration >= 0 || duration !== undefined) {
          s = s.duration(duration);
      }
      if (delay >= 0 || delay !== undefined) {
          s = s.delay(delay);
      }

      return s;
  };

  /* somewhat silly, but to avoid duplicating logic */
  const optionalTransition = function (enable, duration, delay, name) {
      if (enable) {
          return function (selection) {
              return transition(selection, duration, delay, name);
          };
      } else {
          return function (selection) {
              return selection;
          };
      }
  };

  // See http://stackoverflow.com/a/20773846
  const afterTransition = function (_transition, callback) {
      if (_transition.empty() || !_transition.duration) {
          callback.call(_transition);
      } else {
          let n = 0;
          _transition
              .each(() => { ++n; })
              .on('end', () => {
                  if (!--n) {
                      callback.call(_transition);
                  }
              });
      }
  };

  const renderlet = function (_) {
      if (!arguments.length) {
          return config._renderlet;
      }
      config._renderlet = _;
      return null;
  };

  const instanceOfChart = function (o) {
      return o instanceof Object && o.__dcFlag__ && true;
  };

  const events = {
      current: null
  };

  /**
   * This function triggers a throttled event function with a specified delay (in milli-seconds).  Events
   * that are triggered repetitively due to user interaction such brush dragging might flood the library
   * and invoke more renders than can be executed in time. Using this function to wrap your event
   * function allows the library to smooth out the rendering by throttling events and only responding to
   * the most recent event.
   * @name events.trigger
   * @example
   * chart.on('renderlet', function(chart) {
   *     // smooth the rendering through event throttling
   *     events.trigger(function(){
   *         // focus some other chart to the range selected by user on this chart
   *         someOtherChart.focus(chart.filter());
   *     });
   * })
   * @param {Function} closure
   * @param {Number} [delay]
   * @return {undefined}
   */
  events.trigger = function (closure, delay) {
      if (!delay) {
          closure();
          return;
      }

      events.current = closure;

      setTimeout(() => {
          if (closure === events.current) {
              closure();
          }
      }, delay);
  };

  /**
   * The dc.js filters are functions which are passed into crossfilter to chose which records will be
   * accumulated to produce values for the charts.  In the crossfilter model, any filters applied on one
   * dimension will affect all the other dimensions but not that one.  dc always applies a filter
   * function to the dimension; the function combines multiple filters and if any of them accept a
   * record, it is filtered in.
   *
   * These filter constructors are used as appropriate by the various charts to implement brushing.  We
   * mention below which chart uses which filter.  In some cases, many instances of a filter will be added.
   *
   * Each of the dc.js filters is an object with the following properties:
   * * `isFiltered` - a function that returns true if a value is within the filter
   * * `filterType` - a string identifying the filter, here the name of the constructor
   *
   * Currently these filter objects are also arrays, but this is not a requirement. Custom filters
   * can be used as long as they have the properties above.
   * @namespace filters
   * @type {{}}
   */
  const filters = {};

  /**
   * RangedFilter is a filter which accepts keys between `low` and `high`.  It is used to implement X
   * axis brushing for the {@link CoordinateGridMixin coordinate grid charts}.
   *
   * Its `filterType` is 'RangedFilter'
   * @name RangedFilter
   * @memberof filters
   * @param {Number} low
   * @param {Number} high
   * @returns {Array<Number>}
   * @constructor
   */
  filters.RangedFilter = function (low, high) {
      const range = new Array(low, high);
      range.isFiltered = function (value) {
          return value >= this[0] && value < this[1];
      };
      range.filterType = 'RangedFilter';

      return range;
  };

  /**
   * TwoDimensionalFilter is a filter which accepts a single two-dimensional value.  It is used by the
   * {@link HeatMap heat map chart} to include particular cells as they are clicked.  (Rows and columns are
   * filtered by filtering all the cells in the row or column.)
   *
   * Its `filterType` is 'TwoDimensionalFilter'
   * @name TwoDimensionalFilter
   * @memberof filters
   * @param {Array<Number>} filter
   * @returns {Array<Number>}
   * @constructor
   */
  filters.TwoDimensionalFilter = function (filter) {
      if (filter === null) { return null; }

      const f = filter;
      f.isFiltered = function (value) {
          return value.length && value.length === f.length &&
                 value[0] === f[0] && value[1] === f[1];
      };
      f.filterType = 'TwoDimensionalFilter';

      return f;
  };

  /**
   * The RangedTwoDimensionalFilter allows filtering all values which fit within a rectangular
   * region. It is used by the {@link ScatterPlot scatter plot} to implement rectangular brushing.
   *
   * It takes two two-dimensional points in the form `[[x1,y1],[x2,y2]]`, and normalizes them so that
   * `x1 <= x2` and `y1 <= y2`. It then returns a filter which accepts any points which are in the
   * rectangular range including the lower values but excluding the higher values.
   *
   * If an array of two values are given to the RangedTwoDimensionalFilter, it interprets the values as
   * two x coordinates `x1` and `x2` and returns a filter which accepts any points for which `x1 <= x <
   * x2`.
   *
   * Its `filterType` is 'RangedTwoDimensionalFilter'
   * @name RangedTwoDimensionalFilter
   * @memberof filters
   * @param {Array<Array<Number>>} filter
   * @returns {Array<Array<Number>>}
   * @constructor
   */
  filters.RangedTwoDimensionalFilter = function (filter) {
      if (filter === null) { return null; }

      const f = filter;
      let fromBottomLeft;

      if (f[0] instanceof Array) {
          fromBottomLeft = [
              [Math.min(filter[0][0], filter[1][0]), Math.min(filter[0][1], filter[1][1])],
              [Math.max(filter[0][0], filter[1][0]), Math.max(filter[0][1], filter[1][1])]
          ];
      } else {
          fromBottomLeft = [[filter[0], -Infinity], [filter[1], Infinity]];
      }

      f.isFiltered = function (value) {
          let x, y;

          if (value instanceof Array) {
              x = value[0];
              y = value[1];
          } else {
              x = value;
              y = fromBottomLeft[0][1];
          }

          return x >= fromBottomLeft[0][0] && x < fromBottomLeft[1][0] &&
                 y >= fromBottomLeft[0][1] && y < fromBottomLeft[1][1];
      };
      f.filterType = 'RangedTwoDimensionalFilter';

      return f;
  };

  // ******** Sunburst Chart ********

  /**
   * HierarchyFilter is a filter which accepts a key path as an array. It matches any node at, or
   * child of, the given path. It is used by the {@link SunburstChart sunburst chart} to include particular cells and all
   * their children as they are clicked.
   *
   * @name HierarchyFilter
   * @memberof filters
   * @param {String} path
   * @returns {Array<String>}
   * @constructor
   */
  filters.HierarchyFilter = function (path) {
      if (path === null) {
          return null;
      }

      const filter = path.slice(0);
      filter.isFiltered = function (value) {
          if (!(filter.length && value && value.length && value.length >= filter.length)) {
              return false;
          }

          for (let i = 0; i < filter.length; i++) {
              if (value[i] !== filter[i]) {
                  return false;
              }
          }

          return true;
      };
      return filter;
  };

  class InvalidStateException extends Error { }

  /**
   * Returns a function that given a string property name, can be used to pluck the property off an object.  A function
   * can be passed as the second argument to also alter the data being returned.
   *
   * This can be a useful shorthand method to create accessor functions.
   * @example
   * var xPluck = pluck('x');
   * var objA = {x: 1};
   * xPluck(objA) // 1
   * @example
   * var xPosition = pluck('x', function (x, i) {
   *     // `this` is the original datum,
   *     // `x` is the x property of the datum,
   *     // `i` is the position in the array
   *     return this.radius + x;
   * });
   * selectAll('.circle').data(...).x(xPosition);
   * @function pluck
   * @param {String} n
   * @param {Function} [f]
   * @returns {Function}
   */
  const pluck = function (n, f) {
      if (!f) {
          return function (d) { return d[n]; };
      }
      return function (d, i) { return f.call(d, d[n], i); };
  };

  /**
   * @namespace utils
   * @type {{}}
   */
  const utils = {};

  /**
   * Print a single value filter.
   * @method printSingleValue
   * @memberof utils
   * @param {any} filter
   * @returns {String}
   */
  utils.printSingleValue = function (filter) {
      let s = `${filter}`;

      if (filter instanceof Date) {
          s = config.dateFormat(filter);
      } else if (typeof (filter) === 'string') {
          s = filter;
      } else if (utils.isFloat(filter)) {
          s = utils.printSingleValue.fformat(filter);
      } else if (utils.isInteger(filter)) {
          s = Math.round(filter);
      }

      return s;
  };
  utils.printSingleValue.fformat = d3Format.format('.2f');

  // convert 'day' to d3.timeDay and similar
  utils._toTimeFunc = function (t) {
      const mappings = {
          'second': d3Time.timeSecond,
          'minute': d3Time.timeMinute,
          'hour': d3Time.timeHour,
          'day': d3Time.timeDay,
          'week': d3Time.timeWeek,
          'month': d3Time.timeMonth,
          'year': d3Time.timeYear
      };
      return mappings[t];
  };

  /**
   * Arbitrary add one value to another.
   *
   * If the value l is of type Date, adds r units to it. t becomes the unit.
   * For example utils.add(dt, 3, 'week') will add 3 (r = 3) weeks (t= 'week') to dt.
   *
   * If l is of type numeric, t is ignored. In this case if r is of type string,
   * it is assumed to be percentage (whether or not it includes %). For example
   * utils.add(30, 10) will give 40 and utils.add(30, '10') will give 33.
   *
   * They also generate strange results if l is a string.
   * @method add
   * @memberof utils
   * @param {Date|Number} l the value to modify
   * @param {String|Number} r the amount by which to modify the value
   * @param {Function|String} [t=d3.timeDay] if `l` is a `Date`, then this should be a
   * [d3 time interval](https://github.com/d3/d3-time/blob/master/README.md#_interval).
   * For backward compatibility with dc.js 2.0, it can also be the name of an interval, i.e.
   * 'millis', 'second', 'minute', 'hour', 'day', 'week', 'month', or 'year'
   * @returns {Date|Number}
   */
  utils.add = function (l, r, t) {
      if (typeof r === 'string') {
          r = r.replace('%', '');
      }

      if (l instanceof Date) {
          if (typeof r === 'string') {
              r = +r;
          }
          if (t === 'millis') {
              return new Date(l.getTime() + r);
          }
          t = t || d3Time.timeDay;
          if (typeof t !== 'function') {
              t = utils._toTimeFunc(t);
          }
          return t.offset(l, r);
      } else if (typeof r === 'string') {
          const percentage = (+r / 100);
          return l > 0 ? l * (1 + percentage) : l * (1 - percentage);
      } else {
          return l + r;
      }
  };

  /**
   * Arbitrary subtract one value from another.
   *
   * If the value l is of type Date, subtracts r units from it. t becomes the unit.
   * For example utils.subtract(dt, 3, 'week') will subtract 3 (r = 3) weeks (t= 'week') from dt.
   *
   * If l is of type numeric, t is ignored. In this case if r is of type string,
   * it is assumed to be percentage (whether or not it includes %). For example
   * utils.subtract(30, 10) will give 20 and utils.subtract(30, '10') will give 27.
   *
   * They also generate strange results if l is a string.
   * @method subtract
   * @memberof utils
   * @param {Date|Number} l the value to modify
   * @param {String|Number} r the amount by which to modify the value
   * @param {Function|String} [t=d3.timeDay] if `l` is a `Date`, then this should be a
   * [d3 time interval](https://github.com/d3/d3-time/blob/master/README.md#_interval).
   * For backward compatibility with dc.js 2.0, it can also be the name of an interval, i.e.
   * 'millis', 'second', 'minute', 'hour', 'day', 'week', 'month', or 'year'
   * @returns {Date|Number}
   */
  utils.subtract = function (l, r, t) {
      if (typeof r === 'string') {
          r = r.replace('%', '');
      }

      if (l instanceof Date) {
          if (typeof r === 'string') {
              r = +r;
          }
          if (t === 'millis') {
              return new Date(l.getTime() - r);
          }
          t = t || d3Time.timeDay;
          if (typeof t !== 'function') {
              t = utils._toTimeFunc(t);
          }
          return t.offset(l, -r);
      } else if (typeof r === 'string') {
          const percentage = (+r / 100);
          return l < 0 ? l * (1 + percentage) : l * (1 - percentage);
      } else {
          return l - r;
      }
  };

  /**
   * Is the value a number?
   * @method isNumber
   * @memberof utils
   * @param {any} n
   * @returns {Boolean}
   */
  utils.isNumber = function (n) {
      return n === +n;
  };

  /**
   * Is the value a float?
   * @method isFloat
   * @memberof utils
   * @param {any} n
   * @returns {Boolean}
   */
  utils.isFloat = function (n) {
      return n === +n && n !== (n | 0);
  };

  /**
   * Is the value an integer?
   * @method isInteger
   * @memberof utils
   * @param {any} n
   * @returns {Boolean}
   */
  utils.isInteger = function (n) {
      return n === +n && n === (n | 0);
  };

  /**
   * Is the value very close to zero?
   * @method isNegligible
   * @memberof utils
   * @param {any} n
   * @returns {Boolean}
   */
  utils.isNegligible = function (n) {
      return !utils.isNumber(n) || (n < constants.NEGLIGIBLE_NUMBER && n > -constants.NEGLIGIBLE_NUMBER);
  };

  /**
   * Ensure the value is no greater or less than the min/max values.  If it is return the boundary value.
   * @method clamp
   * @memberof utils
   * @param {any} val
   * @param {any} min
   * @param {any} max
   * @returns {any}
   */
  utils.clamp = function (val, min, max) {
      return val < min ? min : (val > max ? max : val);
  };

  /**
   * Given `x`, return a function that always returns `x`.
   *
   * {@link https://github.com/d3/d3/blob/master/CHANGES.md#internals `d3.functor` was removed in d3 version 4}.
   * This function helps to implement the replacement,
   * `typeof x === "function" ? x : utils.constant(x)`
   * @method constant
   * @memberof utils
   * @param {any} x
   * @returns {Function}
   */
  utils.constant = function (x) {
      return function () {
          return x;
      };
  };

  /**
   * Using a simple static counter, provide a unique integer id.
   * @method uniqueId
   * @memberof utils
   * @returns {Number}
   */
  let _idCounter = 0;
  utils.uniqueId = function () {
      return ++_idCounter;
  };

  /**
   * Convert a name to an ID.
   * @method nameToId
   * @memberof utils
   * @param {String} name
   * @returns {String}
   */
  utils.nameToId = function (name) {
      return name.toLowerCase().replace(/[\s]/g, '_').replace(/[\.']/g, '');
  };

  /**
   * Append or select an item on a parent element.
   * @method appendOrSelect
   * @memberof utils
   * @param {d3.selection} parent
   * @param {String} selector
   * @param {String} tag
   * @returns {d3.selection}
   */
  utils.appendOrSelect = function (parent, selector, tag) {
      tag = tag || selector;
      let element = parent.select(selector);
      if (element.empty()) {
          element = parent.append(tag);
      }
      return element;
  };

  /**
   * Return the number if the value is a number; else 0.
   * @method safeNumber
   * @memberof utils
   * @param {Number|any} n
   * @returns {Number}
   */
  utils.safeNumber = function (n) { return utils.isNumber(+n) ? +n : 0;};

  /**
   * Return true if both arrays are equal, if both array are null these are considered equal
   * @method arraysEqual
   * @memberof utils
   * @param {Array|null} a1
   * @param {Array|null} a2
   * @returns {Boolean}
   */
  utils.arraysEqual = function (a1, a2) {
      if (!a1 && !a2) {
          return true;
      }

      if (!a1 || !a2) {
          return false;
      }

      return a1.length === a2.length &&
          // If elements are not integers/strings, we hope that it will match because of toString
          // Test cases cover dates as well.
          a1.every((elem, i) => elem.valueOf() === a2[i].valueOf());
  };

  // ******** Sunburst Chart ********
  utils.allChildren = function (node) {
      let paths = [];
      paths.push(node.path);
      console.log('currentNode', node);
      if (node.children) {
          for (let i = 0; i < node.children.length; i++) {
              paths = paths.concat(utils.allChildren(node.children[i]));
          }
      }
      return paths;
  };

  // builds a d3 Hierarchy from a collection
  // TODO: turn this monster method something better.
  utils.toHierarchy = function (list, accessor) {
      const root = {'key': 'root', 'children': []};
      for (let i = 0; i < list.length; i++) {
          const data = list[i];
          const parts = data.key;
          const value = accessor(data);
          let currentNode = root;
          for (let j = 0; j < parts.length; j++) {
              const currentPath = parts.slice(0, j + 1);
              const children = currentNode.children;
              const nodeName = parts[j];
              let childNode;
              if (j + 1 < parts.length) {
                  // Not yet at the end of the sequence; move down the tree.
                  childNode = findChild(children, nodeName);

                  // If we don't already have a child node for this branch, create it.
                  if (childNode === void 0) {
                      childNode = {'key': nodeName, 'children': [], 'path': currentPath};
                      children.push(childNode);
                  }
                  currentNode = childNode;
              } else {
                  // Reached the end of the sequence; create a leaf node.
                  childNode = {'key': nodeName, 'value': value, 'data': data, 'path': currentPath};
                  children.push(childNode);
              }
          }
      }
      return root;
  };

  function findChild (children, nodeName) {
      for (let k = 0; k < children.length; k++) {
          if (children[k].key === nodeName) {
              return children[k];
          }
      }
  }

  utils.getAncestors = function (node) {
      const path = [];
      let current = node;
      while (current.parent) {
          path.unshift(current.name);
          current = current.parent;
      }
      return path;
  };

  utils.arraysIdentical = function (a, b) {
      let i = a.length;
      if (i !== b.length) {
          return false;
      }
      while (i--) {
          if (a[i] !== b[i]) {
              return false;
          }
      }
      return true;
  };

  /**
   * @namespace printers
   * @type {{}}
   */
  const printers = {};

  /**
   * Converts a list of filters into a readable string.
   * @method filters
   * @memberof printers
   * @param {Array<filters>} filters
   * @returns {String}
   */
  printers.filters = function (filters) {
      let s = '';

      for (let i = 0; i < filters.length; ++i) {
          if (i > 0) {
              s += ', ';
          }
          s += printers.filter(filters[i]);
      }

      return s;
  };

  /**
   * Converts a filter into a readable string.
   * @method filter
   * @memberof printers
   * @param {filters|any|Array<any>} filter
   * @returns {String}
   */
  printers.filter = function (filter) {
      let s = '';

      if (typeof filter !== 'undefined' && filter !== null) {
          if (filter instanceof Array) {
              if (filter.length >= 2) {
                  s = `[${filter.map(e => utils.printSingleValue(e)).join(' -> ')}]`;
              } else if (filter.length >= 1) {
                  s = utils.printSingleValue(filter[0]);
              }
          } else {
              s = utils.printSingleValue(filter);
          }
      }

      return s;
  };

  /**
   * @namespace units
   * @type {{}}
   */
  const units = {};

  /**
   * The default value for {@link CoordinateGridMixin#xUnits .xUnits} for the
   * {@link CoordinateGridMixin Coordinate Grid Chart} and should
   * be used when the x values are a sequence of integers.
   * It is a function that counts the number of integers in the range supplied in its start and end parameters.
   * @method integers
   * @memberof units
   * @see {@link CoordinateGridMixin#xUnits coordinateGridMixin.xUnits}
   * @example
   * chart.xUnits(units.integers) // already the default
   * @param {Number} start
   * @param {Number} end
   * @returns {Number}
   */
  units.integers = function (start, end) {
      return Math.abs(end - start);
  };

  /**
   * This argument can be passed to the {@link CoordinateGridMixin#xUnits .xUnits} function of a
   * coordinate grid chart to specify ordinal units for the x axis. Usually this parameter is used in
   * combination with passing
   * {@link https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales d3.scaleOrdinal}
   * to {@link CoordinateGridMixin#x .x}.
   *
   * As of dc.js 3.0, this is purely a placeholder or magic value which causes the chart to go into ordinal mode; the
   * function is not called.
   * @method ordinal
   * @memberof units
   * @return {uncallable}
   * @see {@link https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales d3.scaleOrdinal}
   * @see {@link CoordinateGridMixin#xUnits coordinateGridMixin.xUnits}
   * @see {@link CoordinateGridMixin#x coordinateGridMixin.x}
   * @example
   * chart.xUnits(units.ordinal)
   *      .x(d3.scaleOrdinal())
   */
  units.ordinal = function () {
      throw new Error('dc.units.ordinal should not be called - it is a placeholder');
  };

  /**
   * @namespace fp
   * @memberof units
   * @type {{}}
   */
  units.fp = {};
  /**
   * This function generates an argument for the {@link CoordinateGridMixin Coordinate Grid Chart}
   * {@link CoordinateGridMixin#xUnits .xUnits} function specifying that the x values are floating-point
   * numbers with the given precision.
   * The returned function determines how many values at the given precision will fit into the range
   * supplied in its start and end parameters.
   * @method precision
   * @memberof units.fp
   * @see {@link CoordinateGridMixin#xUnits coordinateGridMixin.xUnits}
   * @example
   * // specify values (and ticks) every 0.1 units
   * chart.xUnits(units.fp.precision(0.1)
   * // there are 500 units between 0.5 and 1 if the precision is 0.001
   * var thousandths = units.fp.precision(0.001);
   * thousandths(0.5, 1.0) // returns 500
   * @param {Number} precision
   * @returns {Function} start-end unit function
   */
  units.fp.precision = function (precision) {
      const _f = function (s, e) {
          const d = Math.abs((e - s) / _f.resolution);
          if (utils.isNegligible(d - Math.floor(d))) {
              return Math.floor(d);
          } else {
              return Math.ceil(d);
          }
      };
      _f.resolution = precision;
      return _f;
  };

  const _defaultFilterHandler = (dimension, filters) => {
      if (filters.length === 0) {
          dimension.filter(null);
      } else if (filters.length === 1 && !filters[0].isFiltered) {
          // single value and not a function-based filter
          dimension.filterExact(filters[0]);
      } else if (filters.length === 1 && filters[0].filterType === 'RangedFilter') {
          // single range-based filter
          dimension.filterRange(filters[0]);
      } else {
          dimension.filterFunction(d => {
              for (let i = 0; i < filters.length; i++) {
                  const filter = filters[i];
                  if (filter.isFiltered) {
                      if(filter.isFiltered(d)) {
                          return true;
                      }
                  } else if (filter <= d && filter >= d) {
                      return true;
                  }
              }
              return false;
          });
      }
      return filters;
  };

  const _defaultHasFilterHandler = (filters, filter) => {
      if (filter === null || typeof (filter) === 'undefined') {
          return filters.length > 0;
      }
      return filters.some(f => filter <= f && filter >= f);
  };

  const _defaultRemoveFilterHandler = (filters, filter) => {
      for (let i = 0; i < filters.length; i++) {
          if (filters[i] <= filter && filters[i] >= filter) {
              filters.splice(i, 1);
              break;
          }
      }
      return filters;
  };

  const _defaultAddFilterHandler = (filters, filter) => {
      filters.push(filter);
      return filters;
  };

  const _defaultResetFilterHandler = filters => [];

  /**
   * `BaseMixin` is an abstract functional object representing a basic `dc` chart object
   * for all chart and widget implementations. Methods from the {@link #BaseMixin BaseMixin} are inherited
   * and available on all chart implementations in the `dc` library.
   * @mixin BaseMixin
   */
  class BaseMixin {
      constructor () {
          this.__dcFlag__ = utils.uniqueId();
          this._svgDescription = null;
          this._keyboardAccessible = false;

          this._dimension = undefined;
          this._group = undefined;

          this._anchor = undefined;
          this._root = undefined;
          this._svg = undefined;
          this._isChild = undefined;

          this._minWidth = 200;
          this._defaultWidthCalc = element => {
              const width = element && element.getBoundingClientRect && element.getBoundingClientRect().width;
              return (width && width > this._minWidth) ? width : this._minWidth;
          };
          this._widthCalc = this._defaultWidthCalc;

          this._minHeight = 200;
          this._defaultHeightCalc = element => {
              const height = element && element.getBoundingClientRect && element.getBoundingClientRect().height;
              return (height && height > this._minHeight) ? height : this._minHeight;
          };
          this._heightCalc = this._defaultHeightCalc;
          this._width = undefined;
          this._height = undefined;
          this._useViewBoxResizing = false;

          this._keyAccessor = pluck('key');
          this._valueAccessor = pluck('value');
          this._label = pluck('key');

          this._ordering = pluck('key');

          this._renderLabel = false;

          this._title = d => `${this.keyAccessor()(d)}: ${this.valueAccessor()(d)}`;
          this._renderTitle = true;
          this._controlsUseVisibility = false;

          this._transitionDuration = 750;

          this._transitionDelay = 0;

          this._filterPrinter = printers.filters;

          this._mandatoryAttributesList = ['dimension', 'group'];

          this._chartGroup = constants.DEFAULT_CHART_GROUP;

          this._listeners = d3Dispatch.dispatch(
              'preRender',
              'postRender',
              'preRedraw',
              'postRedraw',
              'filtered',
              'zoomed',
              'renderlet',
              'pretransition');

          this._legend = undefined;
          this._commitHandler = undefined;

          this._defaultData = group => group.all();
          this._data = this._defaultData;

          this._filters = [];

          this._filterHandler = _defaultFilterHandler;
          this._hasFilterHandler = _defaultHasFilterHandler;
          this._removeFilterHandler = _defaultRemoveFilterHandler;
          this._addFilterHandler = _defaultAddFilterHandler;
          this._resetFilterHandler = _defaultResetFilterHandler;
      }

      /**
       * Set or get the height attribute of a chart. The height is applied to the SVGElement generated by
       * the chart when rendered (or re-rendered). If a value is given, then it will be used to calculate
       * the new height and the chart returned for method chaining.  The value can either be a numeric, a
       * function, or falsy. If no value is specified then the value of the current height attribute will
       * be returned.
       *
       * By default, without an explicit height being given, the chart will select the width of its
       * anchor element. If that isn't possible it defaults to 200 (provided by the
       * {@link BaseMixin#minHeight minHeight} property). Setting the value falsy will return
       * the chart to the default behavior.
       * @see {@link BaseMixin#minHeight minHeight}
       * @example
       * // Default height
       * chart.height(function (element) {
       *     var height = element && element.getBoundingClientRect && element.getBoundingClientRect().height;
       *     return (height && height > chart.minHeight()) ? height : chart.minHeight();
       * });
       *
       * chart.height(250); // Set the chart's height to 250px;
       * chart.height(function(anchor) { return doSomethingWith(anchor); }); // set the chart's height with a function
       * chart.height(null); // reset the height to the default auto calculation
       * @param {Number|Function} [height]
       * @returns {Number|BaseMixin}
       */
      height (height) {
          if (!arguments.length) {
              if (!utils.isNumber(this._height)) {
                  // only calculate once
                  this._height = this._heightCalc(this._root.node());
              }
              return this._height;
          }
          this._heightCalc = height ? (typeof height === 'function' ? height : utils.constant(height)) : this._defaultHeightCalc;
          this._height = undefined;
          return this;
      }

      /**
       * Set or get the width attribute of a chart.
       * @see {@link BaseMixin#height height}
       * @see {@link BaseMixin#minWidth minWidth}
       * @example
       * // Default width
       * chart.width(function (element) {
       *     var width = element && element.getBoundingClientRect && element.getBoundingClientRect().width;
       *     return (width && width > chart.minWidth()) ? width : chart.minWidth();
       * });
       * @param {Number|Function} [width]
       * @returns {Number|BaseMixin}
       */
      width (width) {
          if (!arguments.length) {
              if (!utils.isNumber(this._width)) {
                  // only calculate once
                  this._width = this._widthCalc(this._root.node());
              }
              return this._width;
          }
          this._widthCalc = width ? (typeof width === 'function' ? width : utils.constant(width)) : this._defaultWidthCalc;
          this._width = undefined;
          return this;
      }

      /**
       * Set or get the minimum width attribute of a chart. This only has effect when used with the default
       * {@link BaseMixin#width width} function.
       * @see {@link BaseMixin#width width}
       * @param {Number} [minWidth=200]
       * @returns {Number|BaseMixin}
       */
      minWidth (minWidth) {
          if (!arguments.length) {
              return this._minWidth;
          }
          this._minWidth = minWidth;
          return this;
      }

      /**
       * Set or get the minimum height attribute of a chart. This only has effect when used with the default
       * {@link BaseMixin#height height} function.
       * @see {@link BaseMixin#height height}
       * @param {Number} [minHeight=200]
       * @returns {Number|BaseMixin}
       */
      minHeight (minHeight) {
          if (!arguments.length) {
              return this._minHeight;
          }
          this._minHeight = minHeight;
          return this;
      }

      /**
       * Turn on/off using the SVG
       * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox `viewBox` attribute}.
       * When enabled, `viewBox` will be set on the svg root element instead of `width` and `height`.
       * Requires that the chart aspect ratio be defined using chart.width(w) and chart.height(h).
       *
       * This will maintain the aspect ratio while enabling the chart to resize responsively to the
       * space given to the chart using CSS. For example, the chart can use `width: 100%; height:
       * 100%` or absolute positioning to resize to its parent div.
       *
       * Since the text will be sized as if the chart is drawn according to the width and height, and
       * will be resized if the chart is any other size, you need to set the chart width and height so
       * that the text looks good. In practice, 600x400 seems to work pretty well for most charts.
       *
       * You can see examples of this resizing strategy in the [Chart Resizing
       * Examples](http://dc-js.github.io/dc.js/resizing/); just add `?resize=viewbox` to any of the
       * one-chart examples to enable `useViewBoxResizing`.
       * @param {Boolean} [useViewBoxResizing=false]
       * @returns {Boolean|BaseMixin}
       */
      useViewBoxResizing (useViewBoxResizing) {
          if (!arguments.length) {
              return this._useViewBoxResizing;
          }
          this._useViewBoxResizing = useViewBoxResizing;
          return this;
      }

      /**
       * **mandatory**
       *
       * Set or get the dimension attribute of a chart. In `dc`, a dimension can be any valid
       * {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#dimension crossfilter dimension}
       *
       * If a value is given, then it will be used as the new dimension. If no value is specified then
       * the current dimension will be returned.
       * @see {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#dimension crossfilter.dimension}
       * @example
       * var index = crossfilter([]);
       * var dimension = index.dimension(pluck('key'));
       * chart.dimension(dimension);
       * @param {crossfilter.dimension} [dimension]
       * @returns {crossfilter.dimension|BaseMixin}
       */
      dimension (dimension) {
          if (!arguments.length) {
              return this._dimension;
          }
          this._dimension = dimension;
          this.expireCache();
          return this;
      }

      /**
       * Set the data callback or retrieve the chart's data set. The data callback is passed the chart's
       * group and by default will return
       * {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#group_all group.all}.
       * This behavior may be modified to, for instance, return only the top 5 groups.
       * @example
       * // Default data function
       * chart.data(function (group) { return group.all(); });
       *
       * chart.data(function (group) { return group.top(5); });
       * @param {Function} [callback]
       * @returns {*|BaseMixin}
       */
      data (callback) {
          if (!arguments.length) {
              return this._data(this._group);
          }
          this._data = typeof callback === 'function' ? callback : utils.constant(callback);
          this.expireCache();
          return this;
      }

      /**
       * **mandatory**
       *
       * Set or get the group attribute of a chart. In `dc` a group is a
       * {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#group-map-reduce crossfilter group}.
       * Usually the group should be created from the particular dimension associated with the same chart. If a value is
       * given, then it will be used as the new group.
       *
       * If no value specified then the current group will be returned.
       * If `name` is specified then it will be used to generate legend label.
       * @see {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#group-map-reduce crossfilter.group}
       * @example
       * var index = crossfilter([]);
       * var dimension = index.dimension(pluck('key'));
       * chart.dimension(dimension);
       * chart.group(dimension.group().reduceSum());
       * @param {crossfilter.group} [group]
       * @param {String} [name]
       * @returns {crossfilter.group|BaseMixin}
       */
      group (group, name) {
          if (!arguments.length) {
              return this._group;
          }
          this._group = group;
          this._groupName = name;
          this.expireCache();
          return this;
      }

      /**
       * Get or set an accessor to order ordinal dimensions.  The chart uses
       * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort Array.sort}
       * to sort elements; this accessor returns the value to order on.
       * @example
       * // Default ordering accessor
       * _chart.ordering(pluck('key'));
       * @param {Function} [orderFunction]
       * @returns {Function|BaseMixin}
       */
      ordering (orderFunction) {
          if (!arguments.length) {
              return this._ordering;
          }
          this._ordering = orderFunction;
          this.expireCache();
          return this;
      }

      _computeOrderedGroups (data) {
          // clone the array before sorting, otherwise Array.sort sorts in-place
          return Array.from(data).sort((a, b) => d3Array.ascending(this._ordering(a), this._ordering(b)));
      }

      /**
       * Clear all filters associated with this chart. The same effect can be achieved by calling
       * {@link BaseMixin#filter chart.filter(null)}.
       * @returns {BaseMixin}
       */
      filterAll () {
          return this.filter(null);
      }

      /**
       * Execute d3 single selection in the chart's scope using the given selector and return the d3
       * selection.
       *
       * This function is **not chainable** since it does not return a chart instance; however the d3
       * selection result can be chained to d3 function calls.
       * @see {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3.select}
       * @example
       * // Has the same effect as d3.select('#chart-id').select(selector)
       * chart.select(selector)
       * @param {String} sel CSS selector string
       * @returns {d3.selection}
       */
      select (sel) {
          return this._root.select(sel);
      }

      /**
       * Execute in scope d3 selectAll using the given selector and return d3 selection result.
       *
       * This function is **not chainable** since it does not return a chart instance; however the d3
       * selection result can be chained to d3 function calls.
       * @see {@link https://github.com/d3/d3-selection/blob/master/README.md#selectAll d3.selectAll}
       * @example
       * // Has the same effect as d3.select('#chart-id').selectAll(selector)
       * chart.selectAll(selector)
       * @param {String} sel CSS selector string
       * @returns {d3.selection}
       */
      selectAll (sel) {
          return this._root ? this._root.selectAll(sel) : null;
      }

      /**
       * Set the root SVGElement to either be an existing chart's root; or any valid [d3 single
       * selector](https://github.com/d3/d3-selection/blob/master/README.md#selecting-elements) specifying a dom
       * block element such as a div; or a dom element or d3 selection. Optionally registers the chart
       * within the chartGroup. This class is called internally on chart initialization, but be called
       * again to relocate the chart. However, it will orphan any previously created SVGElements.
       * @param {anchorChart|anchorSelector|anchorNode} [parent]
       * @param {String} [chartGroup]
       * @returns {String|node|d3.selection|BaseMixin}
       */
      anchor (parent, chartGroup) {
          if (!arguments.length) {
              return this._anchor;
          }
          if (instanceOfChart(parent)) {
              this._anchor = parent.anchor();
              if (this._anchor.children) { // is _anchor a div?
                  this._anchor = `#${parent.anchorName()}`;
              }
              this._root = parent.root();
              this._isChild = true;
          } else if (parent) {
              if (parent.select && parent.classed) { // detect d3 selection
                  this._anchor = parent.node();
              } else {
                  this._anchor = parent;
              }
              this._root = d3Selection.select(this._anchor);
              this._root.classed(constants.CHART_CLASS, true);
              registerChart(this, chartGroup);
              this._isChild = false;
          } else {
              throw new BadArgumentException('parent must be defined');
          }
          this._chartGroup = chartGroup;
          return this;
      }

      /**
       * Returns the DOM id for the chart's anchored location.
       * @returns {String}
       */
      anchorName () {
          const a = this.anchor();
          if (a && a.id) {
              return a.id;
          }
          if (a && a.replace) {
              return a.replace('#', '');
          }
          return `dc-chart${this.chartID()}`;
      }

      /**
       * Returns the root element where a chart resides. Usually it will be the parent div element where
       * the SVGElement was created. You can also pass in a new root element however this is usually handled by
       * dc internally. Resetting the root element on a chart outside of dc internals may have
       * unexpected consequences.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement HTMLElement}
       * @param {HTMLElement} [rootElement]
       * @returns {HTMLElement|BaseMixin}
       */
      root (rootElement) {
          if (!arguments.length) {
              return this._root;
          }
          this._root = rootElement;
          return this;
      }

      /**
       * Returns the top SVGElement for this specific chart. You can also pass in a new SVGElement,
       * however this is usually handled by dc internally. Resetting the SVGElement on a chart outside
       * of dc internals may have unexpected consequences.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/SVGElement SVGElement}
       * @param {SVGElement|d3.selection} [svgElement]
       * @returns {SVGElement|d3.selection|BaseMixin}
       */
      svg (svgElement) {
          if (!arguments.length) {
              return this._svg;
          }
          this._svg = svgElement;
          return this;
      }

      /**
       * Remove the chart's SVGElements from the dom and recreate the container SVGElement.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/SVGElement SVGElement}
       * @returns {SVGElement}
       */
      resetSvg () {
          this.select('svg').remove();
          return this.generateSvg();
      }

      sizeSvg () {
          if (this._svg) {
              if (!this._useViewBoxResizing) {
                  this._svg
                      .attr('width', this.width())
                      .attr('height', this.height());
              } else if (!this._svg.attr('viewBox')) {
                  this._svg
                      .attr('viewBox', `0 0 ${this.width()} ${this.height()}`);
              }
          }
      }

      generateSvg () {
          this._svg = this.root().append('svg');
      
          if (this._svgDescription || this._keyboardAccessible) {

              this._svg.append('desc')
                  .attr('id', `desc-id-${this.__dcFlag__}`)
                  .html(`${this.svgDescription()}`);

              this._svg
                  .attr('tabindex', '0')
                  .attr('role', 'img')
                  .attr('aria-labelledby', `desc-id-${this.__dcFlag__}`);
          }

          this.sizeSvg();
          return this._svg;
      }

      /**
       * Set or get description text for the entire SVG graphic. If set, will create a `<desc>` element as the first
       * child of the SVG with the description text and also make the SVG focusable from keyboard.
       * @param {String} [description]
       * @returns {String|BaseMixin}
       */
      svgDescription (description) {
          if (!arguments.length) {
              return this._svgDescription || this.constructor.name;
          }

          this._svgDescription = description;
          return this;
      }

      /**
       * If set, interactive chart elements like individual bars in a bar chart or symbols in a scatter plot
       * will be focusable from keyboard and on pressing Enter or Space will behave as if clicked on.
       * 
       * If `svgDescription` has not been explicitly set, will also set SVG description text to the class
       * constructor name, like BarChart or HeatMap, and make the entire SVG focusable.
       * @param {Boolean} [keyboardAccessible=false]
       * @returns {Boolean|BarChart}
       */
      keyboardAccessible (keyboardAccessible) {
          if (!arguments.length) {
              return this._keyboardAccessible;
          }
          this._keyboardAccessible = keyboardAccessible;
          return this;
      }

      /**
       * Set or get the filter printer function. The filter printer function is used to generate human
       * friendly text for filter value(s) associated with the chart instance. The text will get shown
       * in the `.filter element; see {@link BaseMixin#turnOnControls turnOnControls}.
       *
       * By default dc charts use a default filter printer {@link printers.filters printers.filters}
       * that provides simple printing support for both single value and ranged filters.
       * @example
       * // for a chart with an ordinal brush, print the filters in upper case
       * chart.filterPrinter(function(filters) {
       *   return filters.map(function(f) { return f.toUpperCase(); }).join(', ');
       * });
       * // for a chart with a range brush, print the filter as start and extent
       * chart.filterPrinter(function(filters) {
       *   return 'start ' + utils.printSingleValue(filters[0][0]) +
       *     ' extent ' + utils.printSingleValue(filters[0][1] - filters[0][0]);
       * });
       * @param {Function} [filterPrinterFunction=printers.filters]
       * @returns {Function|BaseMixin}
       */
      filterPrinter (filterPrinterFunction) {
          if (!arguments.length) {
              return this._filterPrinter;
          }
          this._filterPrinter = filterPrinterFunction;
          return this;
      }

      /**
       * If set, use the `visibility` attribute instead of the `display` attribute for showing/hiding
       * chart reset and filter controls, for less disruption to the layout.
       * @param {Boolean} [controlsUseVisibility=false]
       * @returns {Boolean|BaseMixin}
       */
      controlsUseVisibility (controlsUseVisibility) {
          if (!arguments.length) {
              return this._controlsUseVisibility;
          }
          this._controlsUseVisibility = controlsUseVisibility;
          return this;
      }

      /**
       * Turn on optional control elements within the root element. dc currently supports the
       * following html control elements.
       * * root.selectAll('.reset') - elements are turned on if the chart has an active filter. This type
       * of control element is usually used to store a reset link to allow user to reset filter on a
       * certain chart. This element will be turned off automatically if the filter is cleared.
       * * root.selectAll('.filter') elements are turned on if the chart has an active filter. The text
       * content of this element is then replaced with the current filter value using the filter printer
       * function. This type of element will be turned off automatically if the filter is cleared.
       * @returns {BaseMixin}
       */
      turnOnControls () {
          if (this._root) {
              const attribute = this.controlsUseVisibility() ? 'visibility' : 'display';
              this.selectAll('.reset').style(attribute, null);
              this.selectAll('.filter').text(this._filterPrinter(this.filters())).style(attribute, null);
          }
          return this;
      }

      /**
       * Turn off optional control elements within the root element.
       * @see {@link BaseMixin#turnOnControls turnOnControls}
       * @returns {BaseMixin}
       */
      turnOffControls () {
          if (this._root) {
              const attribute = this.controlsUseVisibility() ? 'visibility' : 'display';
              const value = this.controlsUseVisibility() ? 'hidden' : 'none';
              this.selectAll('.reset').style(attribute, value);
              this.selectAll('.filter').style(attribute, value).text(this.filter());
          }
          return this;
      }

      /**
       * Set or get the animation transition duration (in milliseconds) for this chart instance.
       * @param {Number} [duration=750]
       * @returns {Number|BaseMixin}
       */
      transitionDuration (duration) {
          if (!arguments.length) {
              return this._transitionDuration;
          }
          this._transitionDuration = duration;
          return this;
      }

      /**
       * Set or get the animation transition delay (in milliseconds) for this chart instance.
       * @param {Number} [delay=0]
       * @returns {Number|BaseMixin}
       */
      transitionDelay (delay) {
          if (!arguments.length) {
              return this._transitionDelay;
          }
          this._transitionDelay = delay;
          return this;
      }

      _mandatoryAttributes (_) {
          if (!arguments.length) {
              return this._mandatoryAttributesList;
          }
          this._mandatoryAttributesList = _;
          return this;
      }

      checkForMandatoryAttributes (a) {
          if (!this[a] || !this[a]()) {
              throw new InvalidStateException(`Mandatory attribute chart.${a} is missing on chart[#${this.anchorName()}]`);
          }
      }

      /**
       * Invoking this method will force the chart to re-render everything from scratch. Generally it
       * should only be used to render the chart for the first time on the page or if you want to make
       * sure everything is redrawn from scratch instead of relying on the default incremental redrawing
       * behaviour.
       * @returns {BaseMixin}
       */
      render () {
          this._height = this._width = undefined; // force recalculate
          this._listeners.call('preRender', this, this);

          if (this._mandatoryAttributesList) {
              this._mandatoryAttributesList.forEach(e => this.checkForMandatoryAttributes(e));
          }

          const result = this._doRender();

          if (this._legend) {
              this._legend.render();
          }

          this._activateRenderlets('postRender');

          return result;
      }

      _makeKeyboardAccessible (onClickFunction, ...onClickArgs) {
          // called from each chart module's render and redraw methods
          const tabElements = this._svg
              .selectAll('.dc-tabbable')
              .attr('tabindex', 0);
                  
          if (onClickFunction) {
              tabElements.on('keydown', d3compat.eventHandler((d, event) => {
                  // trigger only if d is an object undestood by KeyAccessor()
                  if (event.keyCode === 13 && typeof d === 'object') {
                      onClickFunction.call(this, d, ...onClickArgs);
                  } 
                  // special case for space key press - prevent scrolling
                  if (event.keyCode === 32 && typeof d === 'object') {
                      onClickFunction.call(this, d, ...onClickArgs);
                      event.preventDefault();                
                  }
              
              }));
          }
      }

      _activateRenderlets (event) {
          this._listeners.call('pretransition', this, this);
          if (this.transitionDuration() > 0 && this._svg) {
              this._svg.transition().duration(this.transitionDuration()).delay(this.transitionDelay())
                  .on('end', () => {
                      this._listeners.call('renderlet', this, this);
                      if (event) {
                          this._listeners.call(event, this, this);
                      }
                  });
          } else {
              this._listeners.call('renderlet', this, this);
              if (event) {
                  this._listeners.call(event, this, this);
              }
          }
      }

      /**
       * Calling redraw will cause the chart to re-render data changes incrementally. If there is no
       * change in the underlying data dimension then calling this method will have no effect on the
       * chart. Most chart interaction in dc will automatically trigger this method through internal
       * events (in particular {@link redrawAll redrawAll}); therefore, you only need to
       * manually invoke this function if data is manipulated outside of dc's control (for example if
       * data is loaded in the background using
       * {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#crossfilter_add crossfilter.add}).
       * @returns {BaseMixin}
       */
      redraw () {
          this.sizeSvg();
          this._listeners.call('preRedraw', this, this);

          const result = this._doRedraw();

          if (this._legend) {
              this._legend.render();
          }

          this._activateRenderlets('postRedraw');

          return result;
      }

      /**
       * Gets/sets the commit handler. If the chart has a commit handler, the handler will be called when
       * the chart's filters have changed, in order to send the filter data asynchronously to a server.
       *
       * Unlike other functions in dc.js, the commit handler is asynchronous. It takes two arguments:
       * a flag indicating whether this is a render (true) or a redraw (false), and a callback to be
       * triggered once the commit is done. The callback has the standard node.js continuation signature
       * with error first and result second.
       * @param {Function} commitHandler
       * @returns {BaseMixin}
       */
      commitHandler (commitHandler) {
          if (!arguments.length) {
              return this._commitHandler;
          }
          this._commitHandler = commitHandler;
          return this;
      }

      /**
       * Redraws all charts in the same group as this chart, typically in reaction to a filter
       * change. If the chart has a {@link BaseMixin.commitFilter commitHandler}, it will
       * be executed and waited for.
       * @returns {BaseMixin}
       */
      redrawGroup () {
          if (this._commitHandler) {
              this._commitHandler(false, (error, result) => {
                  if (error) {
                      console.log(error);
                  } else {
                      redrawAll(this.chartGroup());
                  }
              });
          } else {
              redrawAll(this.chartGroup());
          }
          return this;
      }

      /**
       * Renders all charts in the same group as this chart. If the chart has a
       * {@link BaseMixin.commitFilter commitHandler}, it will be executed and waited for
       * @returns {BaseMixin}
       */
      renderGroup () {
          if (this._commitHandler) {
              this._commitHandler(false, (error, result) => {
                  if (error) {
                      console.log(error);
                  } else {
                      renderAll(this.chartGroup());
                  }
              });
          } else {
              renderAll(this.chartGroup());
          }
          return this;
      }

      _invokeFilteredListener (f) {
          if (f !== undefined) {
              this._listeners.call('filtered', this, this, f);
          }
      }

      _invokeZoomedListener () {
          this._listeners.call('zoomed', this, this);
      }

      /**
       * Set or get the has-filter handler. The has-filter handler is a function that checks to see if
       * the chart's current filters (first argument) include a specific filter (second argument).  Using a custom has-filter handler allows
       * you to change the way filters are checked for and replaced.
       * @example
       * // default has-filter handler
       * chart.hasFilterHandler(function (filters, filter) {
       *     if (filter === null || typeof(filter) === 'undefined') {
       *         return filters.length > 0;
       *     }
       *     return filters.some(function (f) {
       *         return filter <= f && filter >= f;
       *     });
       * });
       *
       * // custom filter handler (no-op)
       * chart.hasFilterHandler(function(filters, filter) {
       *     return false;
       * });
       * @param {Function} [hasFilterHandler]
       * @returns {Function|BaseMixin}
       */
      hasFilterHandler (hasFilterHandler) {
          if (!arguments.length) {
              return this._hasFilterHandler;
          }
          this._hasFilterHandler = hasFilterHandler;
          return this;
      }

      /**
       * Check whether any active filter or a specific filter is associated with particular chart instance.
       * This function is **not chainable**.
       * @see {@link BaseMixin#hasFilterHandler hasFilterHandler}
       * @param {*} [filter]
       * @returns {Boolean}
       */
      hasFilter (filter) {
          return this._hasFilterHandler(this._filters, filter);
      }

      /**
       * Set or get the remove filter handler. The remove filter handler is a function that removes a
       * filter from the chart's current filters. Using a custom remove filter handler allows you to
       * change how filters are removed or perform additional work when removing a filter, e.g. when
       * using a filter server other than crossfilter.
       *
       * The handler should return a new or modified array as the result.
       * @example
       * // default remove filter handler
       * chart.removeFilterHandler(function (filters, filter) {
       *     for (var i = 0; i < filters.length; i++) {
       *         if (filters[i] <= filter && filters[i] >= filter) {
       *             filters.splice(i, 1);
       *             break;
       *         }
       *     }
       *     return filters;
       * });
       *
       * // custom filter handler (no-op)
       * chart.removeFilterHandler(function(filters, filter) {
       *     return filters;
       * });
       * @param {Function} [removeFilterHandler]
       * @returns {Function|BaseMixin}
       */
      removeFilterHandler (removeFilterHandler) {
          if (!arguments.length) {
              return this._removeFilterHandler;
          }
          this._removeFilterHandler = removeFilterHandler;
          return this;
      }

      /**
       * Set or get the add filter handler. The add filter handler is a function that adds a filter to
       * the chart's filter list. Using a custom add filter handler allows you to change the way filters
       * are added or perform additional work when adding a filter, e.g. when using a filter server other
       * than crossfilter.
       *
       * The handler should return a new or modified array as the result.
       * @example
       * // default add filter handler
       * chart.addFilterHandler(function (filters, filter) {
       *     filters.push(filter);
       *     return filters;
       * });
       *
       * // custom filter handler (no-op)
       * chart.addFilterHandler(function(filters, filter) {
       *     return filters;
       * });
       * @param {Function} [addFilterHandler]
       * @returns {Function|BaseMixin}
       */
      addFilterHandler (addFilterHandler) {
          if (!arguments.length) {
              return this._addFilterHandler;
          }
          this._addFilterHandler = addFilterHandler;
          return this;
      }

      /**
       * Set or get the reset filter handler. The reset filter handler is a function that resets the
       * chart's filter list by returning a new list. Using a custom reset filter handler allows you to
       * change the way filters are reset, or perform additional work when resetting the filters,
       * e.g. when using a filter server other than crossfilter.
       *
       * The handler should return a new or modified array as the result.
       * @example
       * // default remove filter handler
       * function (filters) {
       *     return [];
       * }
       *
       * // custom filter handler (no-op)
       * chart.resetFilterHandler(function(filters) {
       *     return filters;
       * });
       * @param {Function} [resetFilterHandler]
       * @returns {BaseMixin}
       */
      resetFilterHandler (resetFilterHandler) {
          if (!arguments.length) {
              return this._resetFilterHandler;
          }
          this._resetFilterHandler = resetFilterHandler;
          return this;
      }

      applyFilters (filters) {
          if (this.dimension() && this.dimension().filter) {
              const fs = this._filterHandler(this.dimension(), filters);
              if (fs) {
                  filters = fs;
              }
          }
          return filters;
      }

      /**
       * Replace the chart filter. This is equivalent to calling `chart.filter(null).filter(filter)`
       * but more efficient because the filter is only applied once.
       *
       * @param {*} [filter]
       * @returns {BaseMixin}
       */
      replaceFilter (filter) {
          this._filters = this._resetFilterHandler(this._filters);
          this.filter(filter);
          return this;
      }

      /**
       * Filter the chart by the given parameter, or return the current filter if no input parameter
       * is given.
       *
       * The filter parameter can take one of these forms:
       * * A single value: the value will be toggled (added if it is not present in the current
       * filters, removed if it is present)
       * * An array containing a single array of values (`[[value,value,value]]`): each value is
       * toggled
       * * When appropriate for the chart, a {@link filters dc filter object} such as
       *   * {@link filters.RangedFilter `filters.RangedFilter`} for the
       * {@link CoordinateGridMixin CoordinateGridMixin} charts
       *   * {@link filters.TwoDimensionalFilter `filters.TwoDimensionalFilter`} for the
       * {@link HeatMap heat map}
       *   * {@link filters.RangedTwoDimensionalFilter `filters.RangedTwoDimensionalFilter`}
       * for the {@link ScatterPlot scatter plot}
       * * `null`: the filter will be reset using the
       * {@link BaseMixin#resetFilterHandler resetFilterHandler}
       *
       * Note that this is always a toggle (even when it doesn't make sense for the filter type). If
       * you wish to replace the current filter, either call `chart.filter(null)` first - or it's more
       * efficient to call {@link BaseMixin#replaceFilter `chart.replaceFilter(filter)`} instead.
       *
       * Each toggle is executed by checking if the value is already present using the
       * {@link BaseMixin#hasFilterHandler hasFilterHandler}; if it is not present, it is added
       * using the {@link BaseMixin#addFilterHandler addFilterHandler}; if it is already present,
       * it is removed using the {@link BaseMixin#removeFilterHandler removeFilterHandler}.
       *
       * Once the filters array has been updated, the filters are applied to the
       * crossfilter dimension, using the {@link BaseMixin#filterHandler filterHandler}.
       *
       * Once you have set the filters, call {@link BaseMixin#redrawGroup `chart.redrawGroup()`}
       * (or {@link redrawAll `redrawAll()`}) to redraw the chart's group.
       * @see {@link BaseMixin#addFilterHandler addFilterHandler}
       * @see {@link BaseMixin#removeFilterHandler removeFilterHandler}
       * @see {@link BaseMixin#resetFilterHandler resetFilterHandler}
       * @see {@link BaseMixin#filterHandler filterHandler}
       * @example
       * // filter by a single string
       * chart.filter('Sunday');
       * // filter by a single age
       * chart.filter(18);
       * // filter by a set of states
       * chart.filter([['MA', 'TX', 'ND', 'WA']]);
       * // filter by range -- note the use of filters.RangedFilter, which is different
       * // from the syntax for filtering a crossfilter dimension directly, dimension.filter([15,20])
       * chart.filter(filters.RangedFilter(15,20));
       * @param {*} [filter]
       * @returns {BaseMixin}
       */
      filter (filter) {
          if (!arguments.length) {
              return this._filters.length > 0 ? this._filters[0] : null;
          }
          let filters = this._filters;
          if (filter instanceof Array && filter[0] instanceof Array && !filter.isFiltered) {
              // toggle each filter
              filter[0].forEach(f => {
                  if (this._hasFilterHandler(filters, f)) {
                      filters = this._removeFilterHandler(filters, f);
                  } else {
                      filters = this._addFilterHandler(filters, f);
                  }
              });
          } else if (filter === null) {
              filters = this._resetFilterHandler(filters);
          } else {
              if (this._hasFilterHandler(filters, filter)) {
                  filters = this._removeFilterHandler(filters, filter);
              } else {
                  filters = this._addFilterHandler(filters, filter);
              }
          }
          this._filters = this.applyFilters(filters);
          this._invokeFilteredListener(filter);

          if (this._root !== null && this.hasFilter()) {
              this.turnOnControls();
          } else {
              this.turnOffControls();
          }

          return this;
      }

      /**
       * Returns all current filters. This method does not perform defensive cloning of the internal
       * filter array before returning, therefore any modification of the returned array will effect the
       * chart's internal filter storage.
       * @returns {Array<*>}
       */
      filters () {
          return this._filters;
      }

      highlightSelected (e) {
          d3Selection.select(e).classed(constants.SELECTED_CLASS, true);
          d3Selection.select(e).classed(constants.DESELECTED_CLASS, false);
      }

      fadeDeselected (e) {
          d3Selection.select(e).classed(constants.SELECTED_CLASS, false);
          d3Selection.select(e).classed(constants.DESELECTED_CLASS, true);
      }

      resetHighlight (e) {
          d3Selection.select(e).classed(constants.SELECTED_CLASS, false);
          d3Selection.select(e).classed(constants.DESELECTED_CLASS, false);
      }

      /**
       * This function is passed to d3 as the onClick handler for each chart. The default behavior is to
       * filter on the clicked datum (passed to the callback) and redraw the chart group.
       *
       * This function can be replaced in order to change the click behavior (but first look at
       * @example
       * var oldHandler = chart.onClick;
       * chart.onClick = function(datum) {
       *   // use datum.
       * @param {*} datum
       * @return {undefined}
       */
      onClick (datum) {
          const filter = this.keyAccessor()(datum);
          events.trigger(() => {
              this.filter(filter);
              this.redrawGroup();
          });
      }

      /**
       * Set or get the filter handler. The filter handler is a function that performs the filter action
       * on a specific dimension. Using a custom filter handler allows you to perform additional logic
       * before or after filtering.
       * @see {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#dimension_filter crossfilter.dimension.filter}
       * @example
       * // the default filter handler handles all possible cases for the charts in dc.js
       * // you can replace it with something more specialized for your own chart
       * chart.filterHandler(function (dimension, filters) {
       *     if (filters.length === 0) {
       *         // the empty case (no filtering)
       *         dimension.filter(null);
       *     } else if (filters.length === 1 && !filters[0].isFiltered) {
       *         // single value and not a function-based filter
       *         dimension.filterExact(filters[0]);
       *     } else if (filters.length === 1 && filters[0].filterType === 'RangedFilter') {
       *         // single range-based filter
       *         dimension.filterRange(filters[0]);
       *     } else {
       *         // an array of values, or an array of filter objects
       *         dimension.filterFunction(function (d) {
       *             for (var i = 0; i < filters.length; i++) {
       *                 var filter = filters[i];
       *                 if (filter.isFiltered && filter.isFiltered(d)) {
       *                     return true;
       *                 } else if (filter <= d && filter >= d) {
       *                     return true;
       *                 }
       *             }
       *             return false;
       *         });
       *     }
       *     return filters;
       * });
       *
       * // custom filter handler
       * chart.filterHandler(function(dimension, filter){
       *     var newFilter = filter + 10;
       *     dimension.filter(newFilter);
       *     return newFilter; // set the actual filter value to the new value
       * });
       * @param {Function} [filterHandler]
       * @returns {Function|BaseMixin}
       */
      filterHandler (filterHandler) {
          if (!arguments.length) {
              return this._filterHandler;
          }
          this._filterHandler = filterHandler;
          return this;
      }

      // abstract function stub
      _doRender () {
          // do nothing in base, should be overridden by sub-function
          return this;
      }

      _doRedraw () {
          // do nothing in base, should be overridden by sub-function
          return this;
      }

      legendables () {
          // do nothing in base, should be overridden by sub-function
          return [];
      }

      legendHighlight () {
          // do nothing in base, should be overridden by sub-function
      }

      legendReset () {
          // do nothing in base, should be overridden by sub-function
      }

      legendToggle () {
          // do nothing in base, should be overriden by sub-function
      }

      isLegendableHidden () {
          // do nothing in base, should be overridden by sub-function
          return false;
      }

      /**
       * Set or get the key accessor function. The key accessor function is used to retrieve the key
       * value from the crossfilter group. Key values are used differently in different charts, for
       * example keys correspond to slices in a pie chart and x axis positions in a grid coordinate chart.
       * @example
       * // default key accessor
       * chart.keyAccessor(function(d) { return d.key; });
       * // custom key accessor for a multi-value crossfilter reduction
       * chart.keyAccessor(function(p) { return p.value.absGain; });
       * @param {Function} [keyAccessor]
       * @returns {Function|BaseMixin}
       */
      keyAccessor (keyAccessor) {
          if (!arguments.length) {
              return this._keyAccessor;
          }
          this._keyAccessor = keyAccessor;
          return this;
      }

      /**
       * Set or get the value accessor function. The value accessor function is used to retrieve the
       * value from the crossfilter group. Group values are used differently in different charts, for
       * example values correspond to slice sizes in a pie chart and y axis positions in a grid
       * coordinate chart.
       * @example
       * // default value accessor
       * chart.valueAccessor(function(d) { return d.value; });
       * // custom value accessor for a multi-value crossfilter reduction
       * chart.valueAccessor(function(p) { return p.value.percentageGain; });
       * @param {Function} [valueAccessor]
       * @returns {Function|BaseMixin}
       */
      valueAccessor (valueAccessor) {
          if (!arguments.length) {
              return this._valueAccessor;
          }
          this._valueAccessor = valueAccessor;
          return this;
      }

      /**
       * Set or get the label function. The chart class will use this function to render labels for each
       * child element in the chart, e.g. slices in a pie chart or bubbles in a bubble chart. Not every
       * chart supports the label function, for example line chart does not use this function
       * at all. By default, enables labels; pass false for the second parameter if this is not desired.
       * @example
       * // default label function just return the key
       * chart.label(function(d) { return d.key; });
       * // label function has access to the standard d3 data binding and can get quite complicated
       * chart.label(function(d) { return d.data.key + '(' + Math.floor(d.data.value / all.value() * 100) + '%)'; });
       * @param {Function} [labelFunction]
       * @param {Boolean} [enableLabels=true]
       * @returns {Function|BaseMixin}
       */
      label (labelFunction, enableLabels) {
          if (!arguments.length) {
              return this._label;
          }
          this._label = labelFunction;
          if ((enableLabels === undefined) || enableLabels) {
              this._renderLabel = true;
          }
          return this;
      }

      /**
       * Turn on/off label rendering
       * @param {Boolean} [renderLabel=false]
       * @returns {Boolean|BaseMixin}
       */
      renderLabel (renderLabel) {
          if (!arguments.length) {
              return this._renderLabel;
          }
          this._renderLabel = renderLabel;
          return this;
      }

      /**
       * Set or get the title function. The chart class will use this function to render the SVGElement title
       * (usually interpreted by browser as tooltips) for each child element in the chart, e.g. a slice
       * in a pie chart or a bubble in a bubble chart. Almost every chart supports the title function;
       * however in grid coordinate charts you need to turn off the brush in order to see titles, because
       * otherwise the brush layer will block tooltip triggering.
       * @example
       * // default title function shows "key: value"
       * chart.title(function(d) { return d.key + ': ' + d.value; });
       * // title function has access to the standard d3 data binding and can get quite complicated
       * chart.title(function(p) {
       *    return p.key.getFullYear()
       *        + '\n'
       *        + 'Index Gain: ' + numberFormat(p.value.absGain) + '\n'
       *        + 'Index Gain in Percentage: ' + numberFormat(p.value.percentageGain) + '%\n'
       *        + 'Fluctuation / Index Ratio: ' + numberFormat(p.value.fluctuationPercentage) + '%';
       * });
       * @param {Function} [titleFunction]
       * @returns {Function|BaseMixin}
       */
      title (titleFunction) {
          if (!arguments.length) {
              return this._title;
          }
          this._title = titleFunction;
          return this;
      }

      /**
       * Turn on/off title rendering, or return the state of the render title flag if no arguments are
       * given.
       * @param {Boolean} [renderTitle=true]
       * @returns {Boolean|BaseMixin}
       */
      renderTitle (renderTitle) {
          if (!arguments.length) {
              return this._renderTitle;
          }
          this._renderTitle = renderTitle;
          return this;
      }

      /**
       * Get or set the chart group to which this chart belongs. Chart groups are rendered or redrawn
       * together since it is expected they share the same underlying crossfilter data set.
       * @param {String} [chartGroup]
       * @returns {String|BaseMixin}
       */
      chartGroup (chartGroup) {
          if (!arguments.length) {
              return this._chartGroup;
          }
          if (!this._isChild) {
              deregisterChart(this, this._chartGroup);
          }
          this._chartGroup = chartGroup;
          if (!this._isChild) {
              registerChart(this, this._chartGroup);
          }
          return this;
      }

      /**
       * Expire the internal chart cache. dc charts cache some data internally on a per chart basis to
       * speed up rendering and avoid unnecessary calculation; however it might be useful to clear the
       * cache if you have changed state which will affect rendering.  For example, if you invoke
       * {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#crossfilter_add crossfilter.add}
       * function or reset group or dimension after rendering, it is a good idea to
       * clear the cache to make sure charts are rendered properly.
       * @returns {BaseMixin}
       */
      expireCache () {
          // do nothing in base, should be overridden by sub-function
          return this;
      }

      /**
       * Attach a Legend widget to this chart. The legend widget will automatically draw legend labels
       * based on the color setting and names associated with each group.
       * @example
       * chart.legend(new Legend().x(400).y(10).itemHeight(13).gap(5))
       * @param {Legend} [legend]
       * @returns {Legend|BaseMixin}
       */
      legend (legend) {
          if (!arguments.length) {
              return this._legend;
          }
          this._legend = legend;
          this._legend.parent(this);
          return this;
      }

      /**
       * Returns the internal numeric ID of the chart.
       * @returns {String}
       */
      chartID () {
          return this.__dcFlag__;
      }

      /**
       * Set chart options using a configuration object. Each key in the object will cause the method of
       * the same name to be called with the value to set that attribute for the chart.
       * @example
       * chart.options({dimension: myDimension, group: myGroup});
       * @param {{}} opts
       * @returns {BaseMixin}
       */
      options (opts) {
          const applyOptions = [
              'anchor',
              'group',
              'xAxisLabel',
              'yAxisLabel',
              'stack',
              'title',
              'point',
              'getColor',
              'overlayGeoJson'
          ];

          for (const o in opts) {
              if (typeof (this[o]) === 'function') {
                  if (opts[o] instanceof Array && applyOptions.indexOf(o) !== -1) {
                      this[o].apply(this, opts[o]);
                  } else {
                      this[o].call(this, opts[o]);
                  }
              } else {
                  logger.debug(`Not a valid option setter name: ${o}`);
              }
          }
          return this;
      }

      /**
       * All dc chart instance supports the following listeners.
       * Supports the following events:
       * * `renderlet` - This listener function will be invoked after transitions after redraw and render. Replaces the
       * deprecated {@link BaseMixin#renderlet renderlet} method.
       * * `pretransition` - Like `.on('renderlet', ...)` but the event is fired before transitions start.
       * * `preRender` - This listener function will be invoked before chart rendering.
       * * `postRender` - This listener function will be invoked after chart finish rendering including
       * all renderlets' logic.
       * * `preRedraw` - This listener function will be invoked before chart redrawing.
       * * `postRedraw` - This listener function will be invoked after chart finish redrawing
       * including all renderlets' logic.
       * * `filtered` - This listener function will be invoked after a filter is applied, added or removed.
       * * `zoomed` - This listener function will be invoked after a zoom is triggered.
       * @see {@link https://github.com/d3/d3-dispatch/blob/master/README.md#dispatch_on d3.dispatch.on}
       * @example
       * .on('renderlet', function(chart, filter){...})
       * .on('pretransition', function(chart, filter){...})
       * .on('preRender', function(chart){...})
       * .on('postRender', function(chart){...})
       * .on('preRedraw', function(chart){...})
       * .on('postRedraw', function(chart){...})
       * .on('filtered', function(chart, filter){...})
       * .on('zoomed', function(chart, filter){...})
       * @param {String} event
       * @param {Function} listener
       * @returns {BaseMixin}
       */
      on (event, listener) {
          this._listeners.on(event, listener);
          return this;
      }

      /**
       * A renderlet is similar to an event listener on rendering event. Multiple renderlets can be added
       * to an individual chart.  Each time a chart is rerendered or redrawn the renderlets are invoked
       * right after the chart finishes its transitions, giving you a way to modify the SVGElements.
       * Renderlet functions take the chart instance as the only input parameter and you can
       * use the dc API or use raw d3 to achieve pretty much any effect.
       *
       * Use {@link BaseMixin#on on} with a 'renderlet' prefix.
       * Generates a random key for the renderlet, which makes it hard to remove.
       * @deprecated chart.renderlet has been deprecated. Please use chart.on("renderlet.<renderletKey>", renderletFunction)
       * @example
       * // do this instead of .renderlet(function(chart) { ... })
       * chart.on("renderlet", function(chart){
       *     // mix of dc API and d3 manipulation
       *     chart.select('g.y').style('display', 'none');
       *     // its a closure so you can also access other chart variable available in the closure scope
       *     moveChart.filter(chart.filter());
       * });
       * @param {Function} renderletFunction
       * @returns {BaseMixin}
       */
      renderlet (renderletFunction) {
          logger.warnOnce('chart.renderlet has been deprecated. Please use chart.on("renderlet.<renderletKey>", renderletFunction)');
          this.on(`renderlet.${utils.uniqueId()}`, renderletFunction);
          return this;
      }
  }

  const baseMixin = () => new BaseMixin();

  /**
   * The Color Mixin is an abstract chart functional class providing universal coloring support
   * as a mix-in for any concrete chart implementation.
   * @mixin ColorMixin
   * @param {Object} Base
   * @returns {ColorMixin}
   */
  const ColorMixin = Base => class extends Base {
      constructor () {
          super();

          this._colors = d3Scale.scaleOrdinal(config.defaultColors());

          this._colorAccessor = d => this.keyAccessor()(d);
          this._colorCalculator = undefined;

          {
              const chart = this;
              // ES6: this method is called very differently from stack-mixin and derived charts
              // Removing and placing it as a member method is tricky

              /**
                   * Get the color for the datum d and counter i. This is used internally by charts to retrieve a color.
                   * @method getColor
                   * @memberof ColorMixin
                   * @instance
                   * @param {*} d
                   * @param {Number} [i]
                   * @returns {String}
                   */
              chart.getColor = function (d, i) {
                  return chart._colorCalculator ?
                      chart._colorCalculator.call(this, d, i) :
                      chart._colors(chart._colorAccessor.call(this, d, i));
              };
          }
      }

      /**
           * Set the domain by determining the min and max values as retrieved by
           * {@link ColorMixin#colorAccessor .colorAccessor} over the chart's dataset.
           * @memberof ColorMixin
           * @instance
           * @returns {ColorMixin}
           */
      calculateColorDomain () {
          const newDomain = [d3Array.min(this.data(), this.colorAccessor()),
                             d3Array.max(this.data(), this.colorAccessor())];
          this._colors.domain(newDomain);
          return this;
      }

      /**
           * Retrieve current color scale or set a new color scale. This methods accepts any function that
           * operates like a d3 scale.
           * @memberof ColorMixin
           * @instance
           * @see {@link https://github.com/d3/d3-scale/blob/master/README.md d3.scale}
           * @example
           * // alternate categorical scale
           * chart.colors(d3.scale.category20b());
           * // ordinal scale
           * chart.colors(d3.scaleOrdinal().range(['red','green','blue']));
           * // convenience method, the same as above
           * chart.ordinalColors(['red','green','blue']);
           * // set a linear scale
           * chart.linearColors(["#4575b4", "#ffffbf", "#a50026"]);
           * @param {d3.scale} [colorScale=d3.scaleOrdinal(d3.schemeCategory20c)]
           * @returns {d3.scale|ColorMixin}
           */
      colors (colorScale) {
          if (!arguments.length) {
              return this._colors;
          }
          if (colorScale instanceof Array) {
              this._colors = d3Scale.scaleQuantize().range(colorScale); // deprecated legacy support, note: this fails for ordinal domains
          } else {
              this._colors = typeof colorScale === 'function' ? colorScale : utils.constant(colorScale);
          }
          return this;
      }

      /**
           * Convenience method to set the color scale to
           * {@link https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales d3.scaleOrdinal} with
           * range `r`.
           * @memberof ColorMixin
           * @instance
           * @param {Array<String>} r
           * @returns {ColorMixin}
           */
      ordinalColors (r) {
          return this.colors(d3Scale.scaleOrdinal().range(r));
      }

      /**
           * Convenience method to set the color scale to an Hcl interpolated linear scale with range `r`.
           * @memberof ColorMixin
           * @instance
           * @param {Array<Number>} r
           * @returns {ColorMixin}
           */
      linearColors (r) {
          return this.colors(d3Scale.scaleLinear()
                  .range(r)
                  .interpolate(d3Interpolate.interpolateHcl));
      }

      /**
           * Set or the get color accessor function. This function will be used to map a data point in a
           * crossfilter group to a color value on the color scale. The default function uses the key
           * accessor.
           * @memberof ColorMixin
           * @instance
           * @example
           * // default index based color accessor
           * .colorAccessor(function (d, i){return i;})
           * // color accessor for a multi-value crossfilter reduction
           * .colorAccessor(function (d){return d.value.absGain;})
           * @param {Function} [colorAccessor]
           * @returns {Function|ColorMixin}
           */
      colorAccessor (colorAccessor) {
          if (!arguments.length) {
              return this._colorAccessor;
          }
          this._colorAccessor = colorAccessor;
          return this;
      }

      /**
           * Set or get the current domain for the color mapping function. The domain must be supplied as an
           * array.
           *
           * Note: previously this method accepted a callback function. Instead you may use a custom scale
           * set by {@link ColorMixin#colors .colors}.
           * @memberof ColorMixin
           * @instance
           * @param {Array<String>} [domain]
           * @returns {Array<String>|ColorMixin}
           */
      colorDomain (domain) {
          if (!arguments.length) {
              return this._colors.domain();
          }
          this._colors.domain(domain);
          return this;
      }

      /**
           * Overrides the color selection algorithm, replacing it with a simple function.
           *
           * Normally colors will be determined by calling the `colorAccessor` to get a value, and then passing that
           * value through the `colorScale`.
           *
           * But sometimes it is difficult to get a color scale to produce the desired effect. The `colorCalculator`
           * takes the datum and index and returns a color directly.
           * @memberof ColorMixin
           * @instance
           * @param {*} [colorCalculator]
           * @returns {Function|ColorMixin}
           */
      colorCalculator (colorCalculator) {
          if (!arguments.length) {
              return this._colorCalculator || this.getColor;
          }
          this._colorCalculator = colorCalculator;
          return this;
      }
  };

  /**
   * This Mixin provides reusable functionalities for any chart that needs to visualize data using bubbles.
   * @mixin BubbleMixin
   * @mixes ColorMixin
   * @param {Object} Base
   * @returns {BubbleMixin}
   */
  const BubbleMixin = Base => class extends ColorMixin(Base) {
      constructor () {
          super();

          this._maxBubbleRelativeSize = 0.3;
          this._minRadiusWithLabel = 10;
          this._sortBubbleSize = false;
          this._elasticRadius = false;
          this._excludeElasticZero = true;

          // These cane be used by derived classes as well, so member status
          this.BUBBLE_NODE_CLASS = 'node';
          this.BUBBLE_CLASS = 'bubble';
          this.MIN_RADIUS = 10;

          this.renderLabel(true);

          this.data(group => {
              const data = group.all();

              if (this._keyboardAccessible) {
                  // sort based on the x value (key)
                  data.sort((a, b) => d3Array.ascending(this.keyAccessor()(a), this.keyAccessor()(b)));
              }

              if (this._sortBubbleSize) {
                  // sort descending so smaller bubbles are on top
                  const radiusAccessor = this.radiusValueAccessor();
                  data.sort((a, b) => d3Array.descending(radiusAccessor(a), radiusAccessor(b)));
              }
              return data;
          });

          this._r = d3Scale.scaleLinear().domain([0, 100]);
      }

      _rValueAccessor (d) {
          return d.r;
      }

      /**
           * Get or set the bubble radius scale. By default the bubble chart uses
           * {@link https://github.com/d3/d3-scale/blob/master/README.md#scaleLinear d3.scaleLinear().domain([0, 100])}
           * as its radius scale.
           * @memberof BubbleMixin
           * @instance
           * @see {@link https://github.com/d3/d3-scale/blob/master/README.md d3.scale}
           * @param {d3.scale} [bubbleRadiusScale=d3.scaleLinear().domain([0, 100])]
           * @returns {d3.scale|BubbleMixin}
           */
      r (bubbleRadiusScale) {
          if (!arguments.length) {
              return this._r;
          }
          this._r = bubbleRadiusScale;
          return this;
      }

      /**
           * Turn on or off the elastic bubble radius feature, or return the value of the flag. If this
           * feature is turned on, then bubble radii will be automatically rescaled to fit the chart better.
           * @memberof BubbleMixin
           * @instance
           * @param {Boolean} [elasticRadius=false]
           * @returns {Boolean|BubbleChart}
           */
      elasticRadius (elasticRadius) {
          if (!arguments.length) {
              return this._elasticRadius;
          }
          this._elasticRadius = elasticRadius;
          return this;
      }

      calculateRadiusDomain () {
          if (this._elasticRadius) {
              this.r().domain([this.rMin(), this.rMax()]);
          }
      }

      /**
           * Get or set the radius value accessor function. If set, the radius value accessor function will
           * be used to retrieve a data value for each bubble. The data retrieved then will be mapped using
           * the r scale to the actual bubble radius. This allows you to encode a data dimension using bubble
           * size.
           * @memberof BubbleMixin
           * @instance
           * @param {Function} [radiusValueAccessor]
           * @returns {Function|BubbleMixin}
           */
      radiusValueAccessor (radiusValueAccessor) {
          if (!arguments.length) {
              return this._rValueAccessor;
          }
          this._rValueAccessor = radiusValueAccessor;
          return this;
      }

      rMin () {
          let values = this.data().map(this.radiusValueAccessor());
          if(this._excludeElasticZero) {
              values = values.filter(value => value > 0);
          }
          return d3Array.min(values);
      }

      rMax () {
          return d3Array.max(this.data(), e => this.radiusValueAccessor()(e));
      }

      bubbleR (d) {
          const value = this.radiusValueAccessor()(d);
          let r = this.r()(value);
          if (isNaN(r) || value <= 0) {
              r = 0;
          }
          return r;
      }

      _labelFunction (d) {
          return this.label()(d);
      }

      _shouldLabel (d) {
          return (this.bubbleR(d) > this._minRadiusWithLabel);
      }

      _labelOpacity (d) {
          return this._shouldLabel(d) ? 1 : 0;
      }

      _labelPointerEvent (d) {
          return this._shouldLabel(d) ? 'all' : 'none';
      }

      _doRenderLabel (bubbleGEnter) {
          if (this.renderLabel()) {
              let label = bubbleGEnter.select('text');

              if (label.empty()) {
                  label = bubbleGEnter.append('text')
                          .attr('text-anchor', 'middle')
                          .attr('dy', '.3em')
                          .on('click', d3compat.eventHandler(d => this.onClick(d)));
              }

              label
                      .attr('opacity', 0)
                      .attr('pointer-events', d => this._labelPointerEvent(d))
                      .text(d => this._labelFunction(d));
              transition(label, this.transitionDuration(), this.transitionDelay())
                      .attr('opacity', d => this._labelOpacity(d));
          }
      }

      doUpdateLabels (bubbleGEnter) {
          if (this.renderLabel()) {
              const labels = bubbleGEnter.select('text')
                      .attr('pointer-events', d => this._labelPointerEvent(d))
                      .text(d => this._labelFunction(d));
              transition(labels, this.transitionDuration(), this.transitionDelay())
                      .attr('opacity', d => this._labelOpacity(d));
          }
      }

      _titleFunction (d) {
          return this.title()(d);
      }

      _doRenderTitles (g) {
          if (this.renderTitle()) {
              const title = g.select('title');

              if (title.empty()) {
                  g.append('title').text(d => this._titleFunction(d));
              }
          }
      }

      doUpdateTitles (g) {
          if (this.renderTitle()) {
              g.select('title').text(d => this._titleFunction(d));
          }
      }

      /**
           * Turn on or off the bubble sorting feature, or return the value of the flag. If enabled,
           * bubbles will be sorted by their radius, with smaller bubbles in front.
           * @memberof BubbleChart
           * @instance
           * @param {Boolean} [sortBubbleSize=false]
           * @returns {Boolean|BubbleChart}
           */
      sortBubbleSize (sortBubbleSize) {
          if (!arguments.length) {
              return this._sortBubbleSize;
          }
          this._sortBubbleSize = sortBubbleSize;
          return this;
      }

      /**
           * Get or set the minimum radius. This will be used to initialize the radius scale's range.
           * @memberof BubbleMixin
           * @instance
           * @param {Number} [radius=10]
           * @returns {Number|BubbleMixin}
           */
      minRadius (radius) {
          if (!arguments.length) {
              return this.MIN_RADIUS;
          }
          this.MIN_RADIUS = radius;
          return this;
      }

      /**
           * Get or set the minimum radius for label rendering. If a bubble's radius is less than this value
           * then no label will be rendered.
           * @memberof BubbleMixin
           * @instance
           * @param {Number} [radius=10]
           * @returns {Number|BubbleMixin}
           */

      minRadiusWithLabel (radius) {
          if (!arguments.length) {
              return this._minRadiusWithLabel;
          }
          this._minRadiusWithLabel = radius;
          return this;
      }

      /**
           * Get or set the maximum relative size of a bubble to the length of x axis. This value is useful
           * when the difference in radius between bubbles is too great.
           * @memberof BubbleMixin
           * @instance
           * @param {Number} [relativeSize=0.3]
           * @returns {Number|BubbleMixin}
           */
      maxBubbleRelativeSize (relativeSize) {
          if (!arguments.length) {
              return this._maxBubbleRelativeSize;
          }
          this._maxBubbleRelativeSize = relativeSize;
          return this;
      }

      /**
       * Should the chart exclude zero when calculating elastic bubble radius?
       * @memberof BubbleMixin
       * @instance
       * @param  {Boolean} [excludeZero=true]
       * @returns {Boolean|BubbleMixin}
       */
      excludeElasticZero (excludeZero) {
          if (!arguments.length) {
              return this._excludeElasticZero;
          }
          this._excludeElasticZero = excludeZero;
          return this;
      }

      fadeDeselectedArea (selection) {
          if (this.hasFilter()) {
              const chart = this;
              this.selectAll(`g.${chart.BUBBLE_NODE_CLASS}`).each(function (d) {
                  if (chart.isSelectedNode(d)) {
                      chart.highlightSelected(this);
                  } else {
                      chart.fadeDeselected(this);
                  }
              });
          } else {
              const chart = this;
              this.selectAll(`g.${chart.BUBBLE_NODE_CLASS}`).each(function () {
                  chart.resetHighlight(this);
              });
          }
      }

      isSelectedNode (d) {
          return this.hasFilter(d.key);
      }

      onClick (d) {
          const filter = d.key;
          events.trigger(() => {
              this.filter(filter);
              this.redrawGroup();
          });
      }
  };

  /**
   * Cap is a mixin that groups small data elements below a _cap_ into an *others* grouping for both the
   * Row and Pie Charts.
   *
   * The top ordered elements in the group up to the cap amount will be kept in the chart, and the rest
   * will be replaced with an *others* element, with value equal to the sum of the replaced values. The
   * keys of the elements below the cap limit are recorded in order to filter by those keys when the
   * others* element is clicked.
   * @mixin CapMixin
   * @param {Object} Base
   * @returns {CapMixin}
   */
  const CapMixin = Base => class extends Base {
      constructor () {
          super();

          this._cap = Infinity;
          this._takeFront = true;
          this._othersLabel = 'Others';

          this._othersGrouper = (topItems, restItems) => {
              const restItemsSum = d3Array.sum(restItems, this.valueAccessor()),
                  restKeys = restItems.map(this.keyAccessor());
              if (restItemsSum > 0) {
                  return topItems.concat([{
                      others: restKeys,
                      key: this.othersLabel(),
                      value: restItemsSum
                  }]);
              }
              return topItems;
          };

          // emulate old group.top(N) ordering
          this.ordering(kv => -kv.value);

          // return N "top" groups, where N is the cap, sorted by baseMixin.ordering
          // whether top means front or back depends on takeFront
          this.data(group => {
              if (this._cap === Infinity) {
                  return this._computeOrderedGroups(group.all());
              } else {
                  let items = group.all(), rest;
                  items = this._computeOrderedGroups(items); // sort by baseMixin.ordering

                  if (this._cap) {
                      if (this._takeFront) {
                          rest = items.slice(this._cap);
                          items = items.slice(0, this._cap);
                      } else {
                          const start = Math.max(0, items.length - this._cap);
                          rest = items.slice(0, start);
                          items = items.slice(start);
                      }
                  }

                  if (this._othersGrouper) {
                      return this._othersGrouper(items, rest);
                  }
                  return items;
              }
          });
      }

      cappedKeyAccessor (d, i) {
          if (d.others) {
              return d.key;
          }
          return this.keyAccessor()(d, i);
      }

      cappedValueAccessor (d, i) {
          if (d.others) {
              return d.value;
          }
          return this.valueAccessor()(d, i);
      }

      /**
           * Get or set the count of elements to that will be included in the cap. If there is an
           * {@link CapMixin#othersGrouper othersGrouper}, any further elements will be combined in an
           * extra element with its name determined by {@link CapMixin#othersLabel othersLabel}.
           *
           * As of dc.js 2.1 and onward, the capped charts use
           * {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#group_all group.all()}
           * and {@link BaseMixin#ordering BaseMixin.ordering()} to determine the order of
           * elements. Then `cap` and {@link CapMixin#takeFront takeFront} determine how many elements
           * to keep, from which end of the resulting array.
           *
           * **Migration note:** Up through dc.js 2.0.*, capping used
           * {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#group_top group.top(N)},
           * which selects the largest items according to
           * {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#group_order group.order()}.
           * The chart then sorted the items according to {@link BaseMixin#ordering baseMixin.ordering()}.
           * So the two values essentially had to agree, but if the `group.order()` was incorrect (it's
           * easy to forget about), the wrong rows or slices would be displayed, in the correct order.
           *
           * If your chart previously relied on `group.order()`, use `chart.ordering()` instead. As of
           * 2.1.5, the ordering defaults to sorting from greatest to least like `group.top(N)` did.
           *
           * If you want to cap by one ordering but sort by another, you can still do this by
           * specifying your own {@link BaseMixin#data `.data()`} callback. For details, see the example
           * {@link https://dc-js.github.io/dc.js/examples/cap-and-sort-differently.html Cap and Sort Differently}.
           * @memberof CapMixin
           * @instance
           * @param {Number} [count=Infinity]
           * @returns {Number|CapMixin}
           */
      cap (count) {
          if (!arguments.length) {
              return this._cap;
          }
          this._cap = count;
          return this;
      }

      /**
           * Get or set the direction of capping. If set, the chart takes the first
           * {@link CapMixin#cap cap} elements from the sorted array of elements; otherwise
           * it takes the last `cap` elements.
           * @memberof CapMixin
           * @instance
           * @param {Boolean} [takeFront=true]
           * @returns {Boolean|CapMixin}
           */
      takeFront (takeFront) {
          if (!arguments.length) {
              return this._takeFront;
          }
          this._takeFront = takeFront;
          return this;
      }

      /**
           * Get or set the label for *Others* slice when slices cap is specified.
           * @memberof CapMixin
           * @instance
           * @param {String} [label="Others"]
           * @returns {String|CapMixin}
           */
      othersLabel (label) {
          if (!arguments.length) {
              return this._othersLabel;
          }
          this._othersLabel = label;
          return this;
      }

      /**
           * Get or set the grouper function that will perform the insertion of data for the *Others* slice
           * if the slices cap is specified. If set to a falsy value, no others will be added.
           *
           * The grouper function takes an array of included ("top") items, and an array of the rest of
           * the items. By default the grouper function computes the sum of the rest.
           * @memberof CapMixin
           * @instance
           * @example
           * // Do not show others
           * chart.othersGrouper(null);
           * // Default others grouper
           * chart.othersGrouper(function (topItems, restItems) {
           *     var restItemsSum = d3.sum(restItems, _chart.valueAccessor()),
           *         restKeys = restItems.map(_chart.keyAccessor());
           *     if (restItemsSum > 0) {
           *         return topItems.concat([{
           *             others: restKeys,
           *             key: _chart.othersLabel(),
           *             value: restItemsSum
           *         }]);
           *     }
           *     return topItems;
           * });
           * @param {Function} [grouperFunction]
           * @returns {Function|CapMixin}
           */
      othersGrouper (grouperFunction) {
          if (!arguments.length) {
              return this._othersGrouper;
          }
          this._othersGrouper = grouperFunction;
          return this;
      }

      onClick (d) {
          if (d.others) {
              this.filter([d.others]);
          }
          super.onClick(d);
      }
  };

  /**
   * Margin is a mixin that provides margin utility functions for both the Row Chart and Coordinate Grid
   * Charts.
   * @mixin MarginMixin
   * @param {Object} Base
   * @returns {MarginMixin}
   */
  class MarginMixin extends BaseMixin {
      constructor () {
          super();

          this._margin = {top: 10, right: 50, bottom: 30, left: 30};
      }

      /**
       * Get or set the margins for a particular coordinate grid chart instance. The margins is stored as
       * an associative Javascript array.
       * @memberof MarginMixin
       * @instance
       * @example
       * var leftMargin = chart.margins().left; // 30 by default
       * chart.margins().left = 50;
       * leftMargin = chart.margins().left; // now 50
       * @param {{top: Number, right: Number, left: Number, bottom: Number}} [margins={top: 10, right: 50, bottom: 30, left: 30}]
       * @returns {{top: Number, right: Number, left: Number, bottom: Number}|MarginMixin}
       */
      margins (margins) {
          if (!arguments.length) {
              return this._margin;
          }
          this._margin = margins;
          return this;
      }

      /**
       * Effective width of the chart excluding margins (in pixels).
       *
       * @returns {number}
       */
      effectiveWidth () {
          return this.width() - this.margins().left - this.margins().right;
      }

      /**
       * Effective height of the chart excluding margins (in pixels).
       *
       * @returns {number}
       */
      effectiveHeight () {
          return this.height() - this.margins().top - this.margins().bottom;
      }
  }

  const GRID_LINE_CLASS = 'grid-line';
  const HORIZONTAL_CLASS = 'horizontal';
  const VERTICAL_CLASS = 'vertical';
  const Y_AXIS_LABEL_CLASS = 'y-axis-label';
  const X_AXIS_LABEL_CLASS = 'x-axis-label';
  const CUSTOM_BRUSH_HANDLE_CLASS = 'custom-brush-handle';
  const DEFAULT_AXIS_LABEL_PADDING = 12;

  /**
   * Coordinate Grid is an abstract base chart designed to support a number of coordinate grid based
   * concrete chart types, e.g. bar chart, line chart, and bubble chart.
   * @mixin CoordinateGridMixin
   * @mixes ColorMixin
   * @mixes MarginMixin
   */
  class CoordinateGridMixin extends ColorMixin(MarginMixin) {
      constructor () {
          super();

          this.colors(d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10));
          this._mandatoryAttributes().push('x');
          this._parent = undefined;
          this._g = undefined;
          this._chartBodyG = undefined;

          this._x = undefined;
          this._origX = undefined; // Will hold original scale in case of zoom
          this._xOriginalDomain = undefined;
          this._xAxis = null;
          this._xUnits = units.integers;
          this._xAxisPadding = 0;
          this._xAxisPaddingUnit = d3Time.timeDay;
          this._xElasticity = false;
          this._xAxisLabel = undefined;
          this._xAxisLabelPadding = 0;
          this._lastXDomain = undefined;

          this._y = undefined;
          this._yAxis = null;
          this._yAxisPadding = 0;
          this._yElasticity = false;
          this._yAxisLabel = undefined;
          this._yAxisLabelPadding = 0;

          this._brush = d3Brush.brushX();

          this._gBrush = undefined;
          this._brushOn = true;
          this._parentBrushOn = false;
          this._round = undefined;
          this._ignoreBrushEvents = false; // ignore when carrying out programmatic brush operations

          this._renderHorizontalGridLine = false;
          this._renderVerticalGridLine = false;

          this._resizing = false;
          this._unitCount = undefined;

          this._zoomScale = [1, Infinity];
          this._zoomOutRestrict = true;

          this._zoom = d3Zoom.zoom().on('zoom', d3compat.eventHandler((d, evt) => this._onZoom(evt)));
          this._nullZoom = d3Zoom.zoom().on('zoom', null);
          this._hasBeenMouseZoomable = false;
          this._ignoreZoomEvents = false; // ignore when carrying out programmatic zoom operations

          this._rangeChart = undefined;
          this._focusChart = undefined;

          this._mouseZoomable = false;
          this._clipPadding = 0;

          this._fOuterRangeBandPadding = 0.5;
          this._fRangeBandPadding = 0;

          this._useRightYAxis = false;
          this._useTopXAxis = false;
      }

      /**
       * When changing the domain of the x or y scale, it is necessary to tell the chart to recalculate
       * and redraw the axes. (`.rescale()` is called automatically when the x or y scale is replaced
       * with {@link CoordinateGridMixin+x .x()} or {@link CoordinateGridMixin#y .y()}, and has
       * no effect on elastic scales.)
       * @returns {CoordinateGridMixin}
       */
      rescale () {
          this._unitCount = undefined;
          this._resizing = true;
          return this;
      }

      resizing (resizing) {
          if (!arguments.length) {
              return this._resizing;
          }
          this._resizing = resizing;
          return this;
      }

      /**
       * Get or set the range selection chart associated with this instance. Setting the range selection
       * chart using this function will automatically update its selection brush when the current chart
       * zooms in. In return the given range chart will also automatically attach this chart as its focus
       * chart hence zoom in when range brush updates.
       *
       * Usually the range and focus charts will share a dimension. The range chart will set the zoom
       * boundaries for the focus chart, so its dimension values must be compatible with the domain of
       * the focus chart.
       *
       * See the [Nasdaq 100 Index](http://dc-js.github.com/dc.js/) example for this effect in action.
       * @param {CoordinateGridMixin} [rangeChart]
       * @returns {CoordinateGridMixin}
       */
      rangeChart (rangeChart) {
          if (!arguments.length) {
              return this._rangeChart;
          }
          this._rangeChart = rangeChart;
          this._rangeChart.focusChart(this);
          return this;
      }

      /**
       * Get or set the scale extent for mouse zooms.
       * @param {Array<Number|Date>} [extent=[1, Infinity]]
       * @returns {Array<Number|Date>|CoordinateGridMixin}
       */
      zoomScale (extent) {
          if (!arguments.length) {
              return this._zoomScale;
          }
          this._zoomScale = extent;
          return this;
      }

      /**
       * Get or set the zoom restriction for the chart. If true limits the zoom to origional domain of the chart.
       * @param {Boolean} [zoomOutRestrict=true]
       * @returns {Boolean|CoordinateGridMixin}
       */
      zoomOutRestrict (zoomOutRestrict) {
          if (!arguments.length) {
              return this._zoomOutRestrict;
          }
          this._zoomOutRestrict = zoomOutRestrict;
          return this;
      }

      _generateG (parent) {
          if (parent === undefined) {
              this._parent = this.svg();
          } else {
              this._parent = parent;
          }

          const href = window.location.href.split('#')[0];

          this._g = this._parent.append('g');

          this._chartBodyG = this._g.append('g').attr('class', 'chart-body')
              .attr('transform', `translate(${this.margins().left}, ${this.margins().top})`)
              .attr('clip-path', `url(${href}#${this._getClipPathId()})`);

          return this._g;
      }

      /**
       * Get or set the root g element. This method is usually used to retrieve the g element in order to
       * overlay custom svg drawing programatically. **Caution**: The root g element is usually generated
       * by dc.js internals, and resetting it might produce unpredictable result.
       * @param {SVGElement} [gElement]
       * @returns {SVGElement|CoordinateGridMixin}
       */
      g (gElement) {
          if (!arguments.length) {
              return this._g;
          }
          this._g = gElement;
          return this;
      }

      /**
       * Set or get mouse zoom capability flag (default: false). When turned on the chart will be
       * zoomable using the mouse wheel. If the range selector chart is attached zooming will also update
       * the range selection brush on the associated range selector chart.
       * @param {Boolean} [mouseZoomable=false]
       * @returns {Boolean|CoordinateGridMixin}
       */
      mouseZoomable (mouseZoomable) {
          if (!arguments.length) {
              return this._mouseZoomable;
          }
          this._mouseZoomable = mouseZoomable;
          return this;
      }

      /**
       * Retrieve the svg group for the chart body.
       * @param {SVGElement} [chartBodyG]
       * @returns {SVGElement}
       */
      chartBodyG (chartBodyG) {
          if (!arguments.length) {
              return this._chartBodyG;
          }
          this._chartBodyG = chartBodyG;
          return this;
      }

      /**
       * **mandatory**
       *
       * Get or set the x scale. The x scale can be any d3
       * {@link https://github.com/d3/d3-scale/blob/master/README.md d3.scale} or
       * {@link https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales ordinal scale}
       * @see {@link https://github.com/d3/d3-scale/blob/master/README.md d3.scale}
       * @example
       * // set x to a linear scale
       * chart.x(d3.scaleLinear().domain([-2500, 2500]))
       * // set x to a time scale to generate histogram
       * chart.x(d3.scaleTime().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)]))
       * @param {d3.scale} [xScale]
       * @returns {d3.scale|CoordinateGridMixin}
       */
      x (xScale) {
          if (!arguments.length) {
              return this._x;
          }
          this._x = xScale;
          this._xOriginalDomain = this._x.domain();
          this.rescale();
          return this;
      }

      xOriginalDomain () {
          return this._xOriginalDomain;
      }

      /**
       * Set or get the xUnits function. The coordinate grid chart uses the xUnits function to calculate
       * the number of data projections on the x axis such as the number of bars for a bar chart or the
       * number of dots for a line chart.
       *
       * This function is expected to return a Javascript array of all data points on the x axis, or
       * the number of points on the axis. d3 time range functions [d3.timeDays, d3.timeMonths, and
       * d3.timeYears](https://github.com/d3/d3-time/blob/master/README.md#intervals) are all valid
       * xUnits functions.
       *
       * dc.js also provides a few units function, see the {@link units Units Namespace} for
       * a list of built-in units functions.
       *
       * Note that as of dc.js 3.0, `units.ordinal` is not a real function, because it is not
       * possible to define this function compliant with the d3 range functions. It was already a
       * magic value which caused charts to behave differently, and now it is completely so.
       * @example
       * // set x units to count days
       * chart.xUnits(d3.timeDays);
       * // set x units to count months
       * chart.xUnits(d3.timeMonths);
       *
       * // A custom xUnits function can be used as long as it follows the following interface:
       * // units in integer
       * function(start, end) {
       *      // simply calculates how many integers in the domain
       *      return Math.abs(end - start);
       * }
       *
       * // fixed units
       * function(start, end) {
       *      // be aware using fixed units will disable the focus/zoom ability on the chart
       *      return 1000;
       * }
       * @param {Function} [xUnits=units.integers]
       * @returns {Function|CoordinateGridMixin}
       */
      xUnits (xUnits) {
          if (!arguments.length) {
              return this._xUnits;
          }
          this._xUnits = xUnits;
          return this;
      }

      /**
       * Set or get the x axis used by a particular coordinate grid chart instance. This function is most
       * useful when x axis customization is required. The x axis in dc.js is an instance of a
       * {@link https://github.com/d3/d3-axis/blob/master/README.md#axisBottom d3 bottom axis object};
       * therefore it supports any valid d3 axisBottom manipulation.
       *
       * **Caution**: The x axis is usually generated internally by dc; resetting it may cause
       * unexpected results. Note also that when used as a getter, this function is not chainable:
       * it returns the axis, not the chart,
       * {@link https://github.com/dc-js/dc.js/wiki/FAQ#why-does-everything-break-after-a-call-to-xaxis-or-yaxis
           * so attempting to call chart functions after calling `.xAxis()` will fail}.
       * @see {@link https://github.com/d3/d3-axis/blob/master/README.md#axisBottom d3.axisBottom}
       * @example
       * // customize x axis tick format
       * chart.xAxis().tickFormat(function(v) {return v + '%';});
       * // customize x axis tick values
       * chart.xAxis().tickValues([0, 100, 200, 300]);
       * @param {d3.axis} [xAxis=d3.axisBottom()]
       * @returns {d3.axis|CoordinateGridMixin}
       */
      xAxis (xAxis) {
          if (!arguments.length) {
              if (!this._xAxis) {
                  this._xAxis = this._createXAxis();
              }
              return this._xAxis;
          }
          this._xAxis = xAxis;
          return this;
      }

      /**
       * Turn on/off elastic x axis behavior. If x axis elasticity is turned on, then the grid chart will
       * attempt to recalculate the x axis range whenever a redraw event is triggered.
       * @param {Boolean} [elasticX=false]
       * @returns {Boolean|CoordinateGridMixin}
       */
      elasticX (elasticX) {
          if (!arguments.length) {
              return this._xElasticity;
          }
          this._xElasticity = elasticX;
          return this;
      }

      /**
       * Set or get x axis padding for the elastic x axis. The padding will be added to both end of the x
       * axis if elasticX is turned on; otherwise it is ignored.
       *
       * Padding can be an integer or percentage in string (e.g. '10%'). Padding can be applied to
       * number or date x axes.  When padding a date axis, an integer represents number of units being padded
       * and a percentage string will be treated the same as an integer. The unit will be determined by the
       * xAxisPaddingUnit variable.
       * @param {Number|String} [padding=0]
       * @returns {Number|String|CoordinateGridMixin}
       */
      xAxisPadding (padding) {
          if (!arguments.length) {
              return this._xAxisPadding;
          }
          this._xAxisPadding = padding;
          return this;
      }

      /**
       * Set or get x axis padding unit for the elastic x axis. The padding unit will determine which unit to
       * use when applying xAxis padding if elasticX is turned on and if x-axis uses a time dimension;
       * otherwise it is ignored.
       *
       * The padding unit should be a
       * [d3 time interval](https://github.com/d3/d3-time/blob/master/README.md#self._interval).
       * For backward compatibility with dc.js 2.0, it can also be the name of a d3 time interval
       * ('day', 'hour', etc). Available arguments are the
       * [d3 time intervals](https://github.com/d3/d3-time/blob/master/README.md#intervals d3.timeInterval).
       * @param {String} [unit=d3.timeDay]
       * @returns {String|CoordinateGridMixin}
       */
      xAxisPaddingUnit (unit) {
          if (!arguments.length) {
              return this._xAxisPaddingUnit;
          }
          this._xAxisPaddingUnit = unit;
          return this;
      }

      /**
       * Returns the number of units displayed on the x axis. If the x axis is ordinal (`xUnits` is
       * `units.ordinal`), this is the number of items in the domain of the x scale. Otherwise, the
       * x unit count is calculated using the {@link CoordinateGridMixin#xUnits xUnits} function.
       * @returns {Number}
       */
      xUnitCount () {
          if (this._unitCount === undefined) {
              if (this.isOrdinal()) {
                  // In this case it number of items in domain
                  this._unitCount = this.x().domain().length;
              } else {
                  this._unitCount = this.xUnits()(this.x().domain()[0], this.x().domain()[1]);

                  // Sometimes xUnits() may return an array while sometimes directly the count
                  if (this._unitCount instanceof Array) {
                      this._unitCount = this._unitCount.length;
                  }
              }
          }

          return this._unitCount;
      }

      /**
       * Gets or sets whether the chart should be drawn with a right axis instead of a left axis. When
       * used with a chart in a composite chart, allows both left and right Y axes to be shown on a
       * chart.
       * @param {Boolean} [useRightYAxis=false]
       * @returns {Boolean|CoordinateGridMixin}
       */
      useRightYAxis (useRightYAxis) {
          if (!arguments.length) {
              return this._useRightYAxis;
          }

          // We need to warn if value is changing after self._yAxis was created
          if (this._useRightYAxis !== useRightYAxis && this._yAxis) {
              logger.warn('Value of useRightYAxis has been altered, after yAxis was created. ' +
                  'You might get unexpected yAxis behavior. ' +
                  'Make calls to useRightYAxis sooner in your chart creation process.');
          }

          this._useRightYAxis = useRightYAxis;
          return this;
      }

      /**
       * Gets or sets whether the chart should be drawn with a top axis instead of a bottom axis. When
       * used with a chart in a composite chart, allows both top and bottom X axes to be shown on a
       * chart.
       * @param {Boolean} [useTopXAxis=false]
       * @returns {Boolean|CoordinateGridMixin}
       */
      useTopXAxis (useTopXAxis) {
          if (!arguments.length) {
              return this._useTopXAxis;
          }

          // We need to warn if value is changing after self._yAxis was created
          if (this._useTopXAxis !== useTopXAxis && this._xAxis) {
              logger.warn('Value of useTopXAxis has been altered, after xAxis was created. ' +
                  'You might get unexpected yAxis behavior. ' +
                  'Make calls to useTopXAxis sooner in your chart creation process.');
          }

          this._useTopXAxis = useTopXAxis;
          return this;
      }

      /**
       * Returns true if the chart is using ordinal xUnits ({@link units.ordinal units.ordinal}, or false
       * otherwise. Most charts behave differently with ordinal data and use the result of this method to
       * trigger the appropriate logic.
       * @returns {Boolean}
       */
      isOrdinal () {
          return this.xUnits() === units.ordinal;
      }

      _useOuterPadding () {
          return true;
      }

      _ordinalXDomain () {
          const groups = this._computeOrderedGroups(this.data());
          return groups.map(this.keyAccessor());
      }

      _createXAxis () {
          return this._useTopXAxis ? d3Axis.axisTop() : d3Axis.axisBottom();
      }

      // eslint-disable-next-line complexity
      _prepareXAxis (g, render) {
          if (!this.isOrdinal()) {
              if (this.elasticX()) {
                  this._x.domain([this.xAxisMin(), this.xAxisMax()]);
              }
          } else { // self._chart.isOrdinal()
              // D3v4 - Ordinal charts would need scaleBand
              // bandwidth is a method in scaleBand
              // (https://github.com/d3/d3-scale/blob/master/README.md#scaleBand)
              if (!this._x.bandwidth) {
                  // If self._x is not a scaleBand create a new scale and
                  // copy the original domain to the new scale
                  logger.warn('For compatibility with d3v4+, dc.js d3.0 ordinal bar/line/bubble charts need ' +
                      'd3.scaleBand() for the x scale, instead of d3.scaleOrdinal(). ' +
                      'Replacing .x() with a d3.scaleBand with the same domain - ' +
                      'make the same change in your code to avoid this warning!');
                  this._x = d3Scale.scaleBand().domain(this._x.domain());
              }

              if (this.elasticX() || this._x.domain().length === 0) {
                  this._x.domain(this._ordinalXDomain());
              }
          }

          // has the domain changed?
          const xdom = this._x.domain();
          if (render || !utils.arraysEqual(this._lastXDomain, xdom)) {
              this.rescale();
          }
          this._lastXDomain = xdom;

          // please can't we always use rangeBands for bar charts?
          if (this.isOrdinal()) {
              this._x.range([0, this.xAxisLength()])
                  .paddingInner(this._fRangeBandPadding)
                  .paddingOuter(this._useOuterPadding() ? this._fOuterRangeBandPadding : 0);
          } else {
              this._x.range([0, this.xAxisLength()]);
          }

          if (!this._xAxis) {
              this._xAxis = this._createXAxis();
          }

          this._xAxis = this._xAxis.scale(this.x());

          this._renderVerticalGridLines(g);
      }

      renderXAxis (g) {
          let axisXG = g.select('g.x');

          if (axisXG.empty()) {
              axisXG = g.append('g')
                  .attr('class', 'axis x')
                  .attr('transform', `translate(${this.margins().left},${this._xAxisY()})`);
          }

          let axisXLab = g.select(`text.${X_AXIS_LABEL_CLASS}`);
          const axisXLabY = this._useTopXAxis ? this._xAxisLabelPadding : (this.height() - this._xAxisLabelPadding);
          if (axisXLab.empty() && this.xAxisLabel()) {
              axisXLab = g.append('text')
                  .attr('class', X_AXIS_LABEL_CLASS)
                  .attr('transform', `translate(${this.margins().left + this.xAxisLength() / 2},${axisXLabY})`)
                  .attr('text-anchor', 'middle');
          }
          if (this.xAxisLabel() && axisXLab.text() !== this.xAxisLabel()) {
              axisXLab.text(this.xAxisLabel());
          }

          transition(axisXG, this.transitionDuration(), this.transitionDelay())
              .attr('transform', `translate(${this.margins().left},${this._xAxisY()})`)
              .call(this._xAxis);
          transition(axisXLab, this.transitionDuration(), this.transitionDelay())
              .attr('transform', `translate(${this.margins().left + this.xAxisLength() / 2},${axisXLabY})`);
      }

      _renderVerticalGridLines (g) {
          let gridLineG = g.select(`g.${VERTICAL_CLASS}`);

          if (this._renderVerticalGridLine) {
              if (gridLineG.empty()) {
                  gridLineG = g.insert('g', ':first-child')
                      .attr('class', `${GRID_LINE_CLASS} ${VERTICAL_CLASS}`)
                      .attr('transform', `translate(${this.margins().left},${this.margins().top})`);
              }

              const ticks = this._xAxis.tickValues() ? this._xAxis.tickValues() :
                  (typeof this._x.ticks === 'function' ? this._x.ticks.apply(this._x, this._xAxis.tickArguments()) : this._x.domain());

              const lines = gridLineG.selectAll('line')
                  .data(ticks);

              // enter
              const linesGEnter = lines.enter()
                  .append('line')
                  .attr('x1', d => this._x(d))
                  .attr('y1', this._xAxisY() - this.margins().top)
                  .attr('x2', d => this._x(d))
                  .attr('y2', 0)
                  .attr('opacity', 0);
              transition(linesGEnter, this.transitionDuration(), this.transitionDelay())
                  .attr('opacity', 0.5);

              // update
              transition(lines, this.transitionDuration(), this.transitionDelay())
                  .attr('x1', d => this._x(d))
                  .attr('y1', this._xAxisY() - this.margins().top)
                  .attr('x2', d => this._x(d))
                  .attr('y2', 0);

              // exit
              lines.exit().remove();
          } else {
              gridLineG.selectAll('line').remove();
          }
      }

      _xAxisY () {
          return this._useTopXAxis ? this.margins().top : this.height() - this.margins().bottom;
      }

      xAxisLength () {
          return this.effectiveWidth();
      }

      /**
       * Set or get the x axis label. If setting the label, you may optionally include additional padding to
       * the margin to make room for the label. By default the padded is set to 12 to accomodate the text height.
       * @param {String} [labelText]
       * @param {Number} [padding=12]
       * @returns {String}
       */
      xAxisLabel (labelText, padding) {
          if (!arguments.length) {
              return this._xAxisLabel;
          }
          this._xAxisLabel = labelText;
          this.margins().bottom -= this._xAxisLabelPadding;
          this._xAxisLabelPadding = (padding === undefined) ? DEFAULT_AXIS_LABEL_PADDING : padding;
          this.margins().bottom += this._xAxisLabelPadding;
          return this;
      }

      _createYAxis () {
          return this._useRightYAxis ? d3Axis.axisRight() : d3Axis.axisLeft();
      }

      _prepareYAxis (g) {
          if (this._y === undefined || this.elasticY()) {
              if (this._y === undefined) {
                  this._y = d3Scale.scaleLinear();
              }
              const _min = this.yAxisMin() || 0;
              const _max = this.yAxisMax() || 0;
              this._y.domain([_min, _max]).rangeRound([this.yAxisHeight(), 0]);
          }

          this._y.range([this.yAxisHeight(), 0]);

          if (!this._yAxis) {
              this._yAxis = this._createYAxis();
          }

          this._yAxis.scale(this._y);

          this._renderHorizontalGridLinesForAxis(g, this._y, this._yAxis);
      }

      renderYAxisLabel (axisClass, text, rotation, labelXPosition) {
          labelXPosition = labelXPosition || this._yAxisLabelPadding;

          let axisYLab = this.g().select(`text.${Y_AXIS_LABEL_CLASS}.${axisClass}-label`);
          const labelYPosition = (this.margins().top + this.yAxisHeight() / 2);
          if (axisYLab.empty() && text) {
              axisYLab = this.g().append('text')
                  .attr('transform', `translate(${labelXPosition},${labelYPosition}),rotate(${rotation})`)
                  .attr('class', `${Y_AXIS_LABEL_CLASS} ${axisClass}-label`)
                  .attr('text-anchor', 'middle')
                  .text(text);
          }
          if (text && axisYLab.text() !== text) {
              axisYLab.text(text);
          }
          transition(axisYLab, this.transitionDuration(), this.transitionDelay())
              .attr('transform', `translate(${labelXPosition},${labelYPosition}),rotate(${rotation})`);
      }

      renderYAxisAt (axisClass, axis, position) {
          let axisYG = this.g().select(`g.${axisClass}`);
          if (axisYG.empty()) {
              axisYG = this.g().append('g')
                  .attr('class', `axis ${axisClass}`)
                  .attr('transform', `translate(${position},${this.margins().top})`);
          }

          transition(axisYG, this.transitionDuration(), this.transitionDelay())
              .attr('transform', `translate(${position},${this.margins().top})`)
              .call(axis);
      }

      renderYAxis () {
          const axisPosition = this._useRightYAxis ? (this.width() - this.margins().right) : this._yAxisX();
          this.renderYAxisAt('y', this._yAxis, axisPosition);
          const labelPosition = this._useRightYAxis ? (this.width() - this._yAxisLabelPadding) : this._yAxisLabelPadding;
          const rotation = this._useRightYAxis ? 90 : -90;
          this.renderYAxisLabel('y', this.yAxisLabel(), rotation, labelPosition);
      }

      _renderHorizontalGridLinesForAxis (g, scale, axis) {
          let gridLineG = g.select(`g.${HORIZONTAL_CLASS}`);

          if (this._renderHorizontalGridLine) {
              // see https://github.com/d3/d3-axis/blob/master/src/axis.js#L48
              const ticks = axis.tickValues() ? axis.tickValues() :
                  (scale.ticks ? scale.ticks.apply(scale, axis.tickArguments()) : scale.domain());

              if (gridLineG.empty()) {
                  gridLineG = g.insert('g', ':first-child')
                      .attr('class', `${GRID_LINE_CLASS} ${HORIZONTAL_CLASS}`)
                      .attr('transform', `translate(${this.margins().left},${this.margins().top})`);
              }

              const lines = gridLineG.selectAll('line')
                  .data(ticks);

              // enter
              const linesGEnter = lines.enter()
                  .append('line')
                  .attr('x1', 1)
                  .attr('y1', d => scale(d))
                  .attr('x2', this.xAxisLength())
                  .attr('y2', d => scale(d))
                  .attr('opacity', 0);
              transition(linesGEnter, this.transitionDuration(), this.transitionDelay())
                  .attr('opacity', 0.5);

              // update
              transition(lines, this.transitionDuration(), this.transitionDelay())
                  .attr('x1', 1)
                  .attr('y1', d => scale(d))
                  .attr('x2', this.xAxisLength())
                  .attr('y2', d => scale(d));

              // exit
              lines.exit().remove();
          } else {
              gridLineG.selectAll('line').remove();
          }
      }

      _yAxisX () {
          return this.useRightYAxis() ? this.width() - this.margins().right : this.margins().left;
      }

      /**
       * Set or get the y axis label. If setting the label, you may optionally include additional padding
       * to the margin to make room for the label. By default the padding is set to 12 to accommodate the
       * text height.
       * @param {String} [labelText]
       * @param {Number} [padding=12]
       * @returns {String|CoordinateGridMixin}
       */
      yAxisLabel (labelText, padding) {
          if (!arguments.length) {
              return this._yAxisLabel;
          }
          this._yAxisLabel = labelText;
          this.margins().left -= this._yAxisLabelPadding;
          this._yAxisLabelPadding = (padding === undefined) ? DEFAULT_AXIS_LABEL_PADDING : padding;
          this.margins().left += this._yAxisLabelPadding;
          return this;
      }

      /**
       * Get or set the y scale. The y scale is typically automatically determined by the chart implementation.
       * @see {@link https://github.com/d3/d3-scale/blob/master/README.md d3.scale}
       * @param {d3.scale} [yScale]
       * @returns {d3.scale|CoordinateGridMixin}
       */
      y (yScale) {
          if (!arguments.length) {
              return this._y;
          }
          this._y = yScale;
          this.rescale();
          return this;
      }

      /**
       * Set or get the y axis used by the coordinate grid chart instance. This function is most useful
       * when y axis customization is required. Depending on `useRightYAxis` the y axis in dc.js is an instance of
       * either [d3.axisLeft](https://github.com/d3/d3-axis/blob/master/README.md#axisLeft) or
       * [d3.axisRight](https://github.com/d3/d3-axis/blob/master/README.md#axisRight); therefore it supports any
       * valid d3 axis manipulation.
       *
       * **Caution**: The y axis is usually generated internally by dc; resetting it may cause
       * unexpected results.  Note also that when used as a getter, this function is not chainable: it
       * returns the axis, not the chart,
       * {@link https://github.com/dc-js/dc.js/wiki/FAQ#why-does-everything-break-after-a-call-to-xaxis-or-yaxis
           * so attempting to call chart functions after calling `.yAxis()` will fail}.
       * In addition, depending on whether you are going to use the axis on left or right
       * you need to appropriately pass [d3.axisLeft](https://github.com/d3/d3-axis/blob/master/README.md#axisLeft)
       * or [d3.axisRight](https://github.com/d3/d3-axis/blob/master/README.md#axisRight)
       * @see {@link https://github.com/d3/d3-axis/blob/master/README.md d3.axis}
       * @example
       * // customize y axis tick format
       * chart.yAxis().tickFormat(function(v) {return v + '%';});
       * // customize y axis tick values
       * chart.yAxis().tickValues([0, 100, 200, 300]);
       * @param {d3.axisLeft|d3.axisRight} [yAxis]
       * @returns {d3.axisLeft|d3.axisRight|CoordinateGridMixin}
       */
      yAxis (yAxis) {
          if (!arguments.length) {
              if (!this._yAxis) {
                  this._yAxis = this._createYAxis();
              }
              return this._yAxis;
          }
          this._yAxis = yAxis;
          return this;
      }

      /**
       * Turn on/off elastic y axis behavior. If y axis elasticity is turned on, then the grid chart will
       * attempt to recalculate the y axis range whenever a redraw event is triggered.
       * @param {Boolean} [elasticY=false]
       * @returns {Boolean|CoordinateGridMixin}
       */
      elasticY (elasticY) {
          if (!arguments.length) {
              return this._yElasticity;
          }
          this._yElasticity = elasticY;
          return this;
      }

      /**
       * Turn on/off horizontal grid lines.
       * @param {Boolean} [renderHorizontalGridLines=false]
       * @returns {Boolean|CoordinateGridMixin}
       */
      renderHorizontalGridLines (renderHorizontalGridLines) {
          if (!arguments.length) {
              return this._renderHorizontalGridLine;
          }
          this._renderHorizontalGridLine = renderHorizontalGridLines;
          return this;
      }

      /**
       * Turn on/off vertical grid lines.
       * @param {Boolean} [renderVerticalGridLines=false]
       * @returns {Boolean|CoordinateGridMixin}
       */
      renderVerticalGridLines (renderVerticalGridLines) {
          if (!arguments.length) {
              return this._renderVerticalGridLine;
          }
          this._renderVerticalGridLine = renderVerticalGridLines;
          return this;
      }

      /**
       * Calculates the minimum x value to display in the chart. Includes xAxisPadding if set.
       * @returns {*}
       */
      xAxisMin () {
          const m = d3Array.min(this.data(), e => this.keyAccessor()(e));
          return utils.subtract(m, this._xAxisPadding, this._xAxisPaddingUnit);
      }

      /**
       * Calculates the maximum x value to display in the chart. Includes xAxisPadding if set.
       * @returns {*}
       */
      xAxisMax () {
          const m = d3Array.max(this.data(), e => this.keyAccessor()(e));
          return utils.add(m, this._xAxisPadding, this._xAxisPaddingUnit);
      }

      /**
       * Calculates the minimum y value to display in the chart. Includes yAxisPadding if set.
       * @returns {*}
       */
      yAxisMin () {
          const m = d3Array.min(this.data(), e => this.valueAccessor()(e));
          return utils.subtract(m, this._yAxisPadding);
      }

      /**
       * Calculates the maximum y value to display in the chart. Includes yAxisPadding if set.
       * @returns {*}
       */
      yAxisMax () {
          const m = d3Array.max(this.data(), e => this.valueAccessor()(e));
          return utils.add(m, this._yAxisPadding);
      }

      /**
       * Set or get y axis padding for the elastic y axis. The padding will be added to the top and
       * bottom of the y axis if elasticY is turned on; otherwise it is ignored.
       *
       * Padding can be an integer or percentage in string (e.g. '10%'). Padding can be applied to
       * number or date axes. When padding a date axis, an integer represents number of days being padded
       * and a percentage string will be treated the same as an integer.
       * @param {Number|String} [padding=0]
       * @returns {Number|CoordinateGridMixin}
       */
      yAxisPadding (padding) {
          if (!arguments.length) {
              return this._yAxisPadding;
          }
          this._yAxisPadding = padding;
          return this;
      }

      yAxisHeight () {
          return this.effectiveHeight();
      }

      /**
       * Set or get the rounding function used to quantize the selection when brushing is enabled.
       * @example
       * // set x unit round to by month, this will make sure range selection brush will
       * // select whole months
       * chart.round(d3.timeMonth.round);
       * @param {Function} [round]
       * @returns {Function|CoordinateGridMixin}
       */
      round (round) {
          if (!arguments.length) {
              return this._round;
          }
          this._round = round;
          return this;
      }

      _rangeBandPadding (_) {
          if (!arguments.length) {
              return this._fRangeBandPadding;
          }
          this._fRangeBandPadding = _;
          return this;
      }

      _outerRangeBandPadding (_) {
          if (!arguments.length) {
              return this._fOuterRangeBandPadding;
          }
          this._fOuterRangeBandPadding = _;
          return this;
      }

      filter (_) {
          if (!arguments.length) {
              return super.filter();
          }

          super.filter(_);

          this.redrawBrush(_, false);

          return this;
      }

      /**
       * Get or set the brush. Brush must be an instance of d3 brushes
       * https://github.com/d3/d3-brush/blob/master/README.md
       * You will use this only if you are writing a new chart type that supports brushing.
       *
       * **Caution**: dc creates and manages brushes internally. Go through and understand the source code
       * if you want to pass a new brush object. Even if you are only using the getter,
       * the brush object may not behave the way you expect.
       *
       * @param {d3.brush} [_]
       * @returns {d3.brush|CoordinateGridMixin}
       */
      brush (_) {
          if (!arguments.length) {
              return this._brush;
          }
          this._brush = _;
          return this;
      }

      renderBrush (g, doTransition) {
          if (this._brushOn) {
              this._brush.on('start brush end', d3compat.eventHandler((d, evt) => this._brushing(evt)));

              // To retrieve selection we need self._gBrush
              this._gBrush = g.append('g')
                  .attr('class', 'brush')
                  .attr('transform', `translate(${this.margins().left},${this.margins().top})`);

              this.setBrushExtents();

              this.createBrushHandlePaths(this._gBrush, doTransition);

              this.redrawBrush(this.filter(), doTransition);
          }
      }

      createBrushHandlePaths (gBrush) {
          let brushHandles = gBrush.selectAll(`path.${CUSTOM_BRUSH_HANDLE_CLASS}`).data([{type: 'w'}, {type: 'e'}]);

          brushHandles = brushHandles
              .enter()
              .append('path')
              .attr('class', CUSTOM_BRUSH_HANDLE_CLASS)
              .merge(brushHandles);

          brushHandles
              .attr('d', d => this.resizeHandlePath(d));
      }

      extendBrush (brushSelection) {
          if (brushSelection && this.round()) {
              brushSelection[0] = this.round()(brushSelection[0]);
              brushSelection[1] = this.round()(brushSelection[1]);
          }
          return brushSelection;
      }

      brushIsEmpty (brushSelection) {
          return !brushSelection || brushSelection[1] <= brushSelection[0];
      }

      _brushing (evt) {
          if (this._ignoreBrushEvents) {
              return;
          }

          let brushSelection = evt.selection;
          if (brushSelection) {
              brushSelection = brushSelection.map(this.x().invert);
          }

          brushSelection = this.extendBrush(brushSelection);

          this.redrawBrush(brushSelection, false);

          const rangedFilter = this.brushIsEmpty(brushSelection) ? null : filters.RangedFilter(brushSelection[0], brushSelection[1]);

          events.trigger(() => {
              this.applyBrushSelection(rangedFilter);
          }, constants.EVENT_DELAY);
      }

      // This can be overridden in a derived chart. For example Composite chart overrides it
      applyBrushSelection (rangedFilter) {
          this.replaceFilter(rangedFilter);
          this.redrawGroup();
      }

      _withoutBrushEvents (closure) {
          const oldValue = this._ignoreBrushEvents;
          this._ignoreBrushEvents = true;

          try {
              closure();
          } finally {
              this._ignoreBrushEvents = oldValue;
          }
      }

      setBrushExtents (doTransition) {
          this._withoutBrushEvents(() => {
              // Set boundaries of the brush, must set it before applying to self._gBrush
              this._brush.extent([[0, 0], [this.effectiveWidth(), this.effectiveHeight()]]);
          });

          this._gBrush
              .call(this._brush);
      }

      redrawBrush (brushSelection, doTransition) {
          if (this._brushOn && this._gBrush) {
              if (this._resizing) {
                  this.setBrushExtents(doTransition);
              }

              if (!brushSelection) {
                  this._withoutBrushEvents(() => {
                      this._gBrush
                          .call(this._brush.move, null);
                  });

                  this._gBrush.selectAll(`path.${CUSTOM_BRUSH_HANDLE_CLASS}`)
                      .attr('display', 'none');
              } else {
                  const scaledSelection = [this._x(brushSelection[0]), this._x(brushSelection[1])];

                  const gBrush =
                      optionalTransition(doTransition, this.transitionDuration(), this.transitionDelay())(this._gBrush);

                  this._withoutBrushEvents(() => {
                      gBrush
                          .call(this._brush.move, scaledSelection);
                  });

                  gBrush.selectAll(`path.${CUSTOM_BRUSH_HANDLE_CLASS}`)
                      .attr('display', null)
                      .attr('transform', (d, i) => `translate(${this._x(brushSelection[i])}, 0)`)
                      .attr('d', d => this.resizeHandlePath(d));
              }
          }
          this.fadeDeselectedArea(brushSelection);
      }

      fadeDeselectedArea (brushSelection) {
          // do nothing, sub-chart should override this function
      }

      // borrowed from Crossfilter example
      resizeHandlePath (d) {
          d = d.type;
          const e = +(d === 'e'), x = e ? 1 : -1, y = this.effectiveHeight() / 3;
          return `M${0.5 * x},${y 
        }A6,6 0 0 ${e} ${6.5 * x},${y + 6 
        }V${2 * y - 6 
        }A6,6 0 0 ${e} ${0.5 * x},${2 * y 
        }Z` +
              `M${2.5 * x},${y + 8 
            }V${2 * y - 8 
            }M${4.5 * x},${y + 8 
            }V${2 * y - 8}`;
      }

      _getClipPathId () {
          return `${this.anchorName().replace(/[ .#=\[\]"]/g, '-')}-clip`;
      }

      /**
       * Get or set the padding in pixels for the clip path. Once set padding will be applied evenly to
       * the top, left, right, and bottom when the clip path is generated. If set to zero, the clip area
       * will be exactly the chart body area minus the margins.
       * @param {Number} [padding=5]
       * @returns {Number|CoordinateGridMixin}
       */
      clipPadding (padding) {
          if (!arguments.length) {
              return this._clipPadding;
          }
          this._clipPadding = padding;
          return this;
      }

      _generateClipPath () {
          const defs = utils.appendOrSelect(this._parent, 'defs');
          // cannot select <clippath> elements; bug in WebKit, must select by id
          // https://groups.google.com/forum/#!topic/d3-js/6EpAzQ2gU9I
          const id = this._getClipPathId();
          const chartBodyClip = utils.appendOrSelect(defs, `#${id}`, 'clipPath').attr('id', id);

          const padding = this._clipPadding * 2;

          utils.appendOrSelect(chartBodyClip, 'rect')
              .attr('width', this.xAxisLength() + padding)
              .attr('height', this.yAxisHeight() + padding)
              .attr('transform', `translate(-${this._clipPadding}, -${this._clipPadding})`);
      }

      _preprocessData () {
      }

      _doRender () {
          this.resetSvg();

          this._preprocessData();

          this._generateG();
          this._generateClipPath();

          this._drawChart(true);

          this._configureMouseZoom();

          return this;
      }

      _doRedraw () {
          this._preprocessData();

          this._drawChart(false);
          this._generateClipPath();

          return this;
      }

      _drawChart (render) {
          if (this.isOrdinal()) {
              this._brushOn = false;
          }

          this._prepareXAxis(this.g(), render);
          this._prepareYAxis(this.g());

          this.plotData();

          if (this.elasticX() || this._resizing || render) {
              this.renderXAxis(this.g());
          }

          if (this.elasticY() || this._resizing || render) {
              this.renderYAxis(this.g());
          }

          if (render) {
              this.renderBrush(this.g(), false);
          } else {
              // Animate the brush only while resizing
              this.redrawBrush(this.filter(), this._resizing);
          }
          this.fadeDeselectedArea(this.filter());
          this.resizing(false);
      }

      _configureMouseZoom () {
          // Save a copy of original x scale
          this._origX = this._x.copy();

          if (this._mouseZoomable) {
              this._enableMouseZoom();
          } else if (this._hasBeenMouseZoomable) {
              this._disableMouseZoom();
          }
      }

      _enableMouseZoom () {
          this._hasBeenMouseZoomable = true;

          const extent = [[0, 0], [this.effectiveWidth(), this.effectiveHeight()]];

          this._zoom
              .scaleExtent(this._zoomScale)
              .extent(extent)
              .duration(this.transitionDuration());

          if (this._zoomOutRestrict) {
              // Ensure minimum zoomScale is at least 1
              const zoomScaleMin = Math.max(this._zoomScale[0], 1);
              this._zoom
                  .translateExtent(extent)
                  .scaleExtent([zoomScaleMin, this._zoomScale[1]]);
          }

          this.root().call(this._zoom);

          // Tell D3 zoom our current zoom/pan status
          this._updateD3zoomTransform();
      }

      _disableMouseZoom () {
          this.root().call(this._nullZoom);
      }

      _zoomHandler (newDomain, noRaiseEvents) {
          let domFilter;

          if (this._hasRangeSelected(newDomain)) {
              this.x().domain(newDomain);
              domFilter = filters.RangedFilter(newDomain[0], newDomain[1]);
          } else {
              this.x().domain(this._xOriginalDomain);
              domFilter = null;
          }

          this.replaceFilter(domFilter);
          this.rescale();
          this.redraw();

          if (!noRaiseEvents) {
              if (this._rangeChart && !utils.arraysEqual(this.filter(), this._rangeChart.filter())) {
                  events.trigger(() => {
                      this._rangeChart.replaceFilter(domFilter);
                      this._rangeChart.redraw();
                  });
              }

              this._invokeZoomedListener();
              events.trigger(() => {
                  this.redrawGroup();
              }, constants.EVENT_DELAY);
          }
      }

      // event.transform.rescaleX(self._origX).domain() should give back newDomain
      _domainToZoomTransform (newDomain, origDomain, xScale) {
          const k = (origDomain[1] - origDomain[0]) / (newDomain[1] - newDomain[0]);
          const xt = -1 * xScale(newDomain[0]);

          return d3Zoom.zoomIdentity.scale(k).translate(xt, 0);
      }

      // If we changing zoom status (for example by calling focus), tell D3 zoom about it
      _updateD3zoomTransform () {
          if (this._zoom) {
              this._withoutZoomEvents(() => {
                  this._zoom.transform(this.root(), this._domainToZoomTransform(this.x().domain(), this._xOriginalDomain, this._origX));
              });
          }
      }

      _withoutZoomEvents (closure) {
          const oldValue = this._ignoreZoomEvents;
          this._ignoreZoomEvents = true;

          try {
              closure();
          } finally {
              this._ignoreZoomEvents = oldValue;
          }
      }

      _onZoom (evt) {
          // ignore zoom events if it was caused by a programmatic change
          if (this._ignoreZoomEvents) {
              return;
          }

          const newDomain = evt.transform.rescaleX(this._origX).domain();
          this.focus(newDomain, false);
      }

      _checkExtents (ext, outerLimits) {
          if (!ext || ext.length !== 2 || !outerLimits || outerLimits.length !== 2) {
              return ext;
          }

          if (ext[0] > outerLimits[1] || ext[1] < outerLimits[0]) {
              console.warn('Could not intersect extents, will reset');
          }
          // Math.max does not work (as the values may be dates as well)
          return [ext[0] > outerLimits[0] ? ext[0] : outerLimits[0], ext[1] < outerLimits[1] ? ext[1] : outerLimits[1]];
      }

      /**
       * Zoom this chart to focus on the given range. The given range should be an array containing only
       * 2 elements (`[start, end]`) defining a range in the x domain. If the range is not given or set
       * to null, then the zoom will be reset. _For focus to work elasticX has to be turned off;
       * otherwise focus will be ignored.
       *
       * To avoid ping-pong volley of events between a pair of range and focus charts please set
       * `noRaiseEvents` to `true`. In that case it will update this chart but will not fire `zoom` event
       * and not try to update back the associated range chart.
       * If you are calling it manually - typically you will leave it to `false` (the default).
       *
       * @example
       * chart.on('renderlet', function(chart) {
       *     // smooth the rendering through event throttling
       *     events.trigger(function(){
       *          // focus some other chart to the range selected by user on this chart
       *          someOtherChart.focus(chart.filter());
       *     });
       * })
       * @param {Array<Number>} [range]
       * @param {Boolean} [noRaiseEvents = false]
       * @return {undefined}
       */
      focus (range, noRaiseEvents) {
          if (this._zoomOutRestrict) {
              // ensure range is within self._xOriginalDomain
              range = this._checkExtents(range, this._xOriginalDomain);

              // If it has an associated range chart ensure range is within domain of that rangeChart
              if (this._rangeChart) {
                  range = this._checkExtents(range, this._rangeChart.x().domain());
              }
          }

          this._zoomHandler(range, noRaiseEvents);
          this._updateD3zoomTransform();
      }

      refocused () {
          return !utils.arraysEqual(this.x().domain(), this._xOriginalDomain);
      }

      focusChart (c) {
          if (!arguments.length) {
              return this._focusChart;
          }
          this._focusChart = c;
          this.on('filtered.dcjs-range-chart', chart => {
              if (!chart.filter()) {
                  events.trigger(() => {
                      this._focusChart.x().domain(this._focusChart.xOriginalDomain(), true);
                  });
              } else if (!utils.arraysEqual(chart.filter(), this._focusChart.filter())) {
                  events.trigger(() => {
                      this._focusChart.focus(chart.filter(), true);
                  });
              }
          });
          return this;
      }

      /**
       * Turn on/off the brush-based range filter. When brushing is on then user can drag the mouse
       * across a chart with a quantitative scale to perform range filtering based on the extent of the
       * brush, or click on the bars of an ordinal bar chart or slices of a pie chart to filter and
       * un-filter them. However turning on the brush filter will disable other interactive elements on
       * the chart such as highlighting, tool tips, and reference lines. Zooming will still be possible
       * if enabled, but only via scrolling (panning will be disabled.)
       * @param {Boolean} [brushOn=true]
       * @returns {Boolean|CoordinateGridMixin}
       */
      brushOn (brushOn) {
          if (!arguments.length) {
              return this._brushOn;
          }
          this._brushOn = brushOn;
          return this;
      }

      /**
       * This will be internally used by composite chart onto children. Please go not invoke directly.
       *
       * @protected
       * @param {Boolean} [brushOn=false]
       * @returns {Boolean|CoordinateGridMixin}
       */
      parentBrushOn (brushOn) {
          if (!arguments.length) {
              return this._parentBrushOn;
          }
          this._parentBrushOn = brushOn;
          return this;
      }

      // Get the SVG rendered brush
      gBrush () {
          return this._gBrush;
      }

      _hasRangeSelected (range) {
          return range instanceof Array && range.length > 1;
      }
  }

  // https://github.com/d3/d3-plugins/blob/master/box/box.js

  const d3Box = function () {
      let width = 1;
      let height = 1;
      let duration = 0;
      const delay = 0;
      let domain = null;
      let value = Number;
      let whiskers = boxWhiskers;
      let quartiles = boxQuartiles;
      let tickFormat = null;

      // Enhanced attributes
      let renderDataPoints = false;
      const dataRadius = 3;
      let dataOpacity = 0.3;
      let dataWidthPortion = 0.8;
      let renderTitle = false;
      let showOutliers = true;
      let boldOutlier = false;


      // For each small multiple…
      function box (g) {
          g.each(function (data, index) {
              data = data.map(value).sort(d3Array.ascending);
              const _g = d3Selection.select(this);
              const n = data.length;
              let min;
              let max;

              // Leave if there are no items.
              if (n === 0) {return;}

              // Compute quartiles. Must return exactly 3 elements.
              const quartileData = data.quartiles = quartiles(data);

              // Compute whiskers. Must return exactly 2 elements, or null.
              const whiskerIndices = whiskers && whiskers.call(this, data, index),
                  whiskerData = whiskerIndices && whiskerIndices.map(_i => data[_i]);

              // Compute outliers. If no whiskers are specified, all data are 'outliers'.
              // We compute the outliers as indices, so that we can join across transitions!
              const outlierIndices = whiskerIndices ?
                  d3Array.range(0, whiskerIndices[0]).concat(d3Array.range(whiskerIndices[1] + 1, n)) : d3Array.range(n);

              // Determine the maximum value based on if outliers are shown
              if (showOutliers) {
                  min = data[0];
                  max = data[n - 1];
              } else {
                  min = data[whiskerIndices[0]];
                  max = data[whiskerIndices[1]];
              }
              const pointIndices = d3Array.range(whiskerIndices[0], whiskerIndices[1] + 1);

              // Compute the new x-scale.
              const x1 = d3Scale.scaleLinear()
                  .domain(domain && domain.call(this, data, index) || [min, max])
                  .range([height, 0]);

              // Retrieve the old x-scale, if this is an update.
              const x0 = this.__chart__ || d3Scale.scaleLinear()
                  .domain([0, Infinity])
                  .range(x1.range());

              // Stash the new scale.
              this.__chart__ = x1;

              // Note: the box, median, and box tick elements are fixed in number,
              // so we only have to handle enter and update. In contrast, the outliers
              // and other elements are variable, so we need to exit them! Variable
              // elements also fade in and out.

              // Update center line: the vertical line spanning the whiskers.
              const center = _g.selectAll('line.center')
                  .data(whiskerData ? [whiskerData] : []);

              center.enter().insert('line', 'rect')
                  .attr('class', 'center')
                  .attr('x1', width / 2)
                  .attr('y1', d => x0(d[0]))
                  .attr('x2', width / 2)
                  .attr('y2', d => x0(d[1]))
                  .style('opacity', 1e-6)
                  .transition()
                  .duration(duration)
                  .delay(delay)
                  .style('opacity', 1)
                  .attr('y1', d => x1(d[0]))
                  .attr('y2', d => x1(d[1]));

              center.transition()
                  .duration(duration)
                  .delay(delay)
                  .style('opacity', 1)
                  .attr('x1', width / 2)
                  .attr('x2', width / 2)
                  .attr('y1', d => x1(d[0]))
                  .attr('y2', d => x1(d[1]));

              center.exit().transition()
                  .duration(duration)
                  .delay(delay)
                  .style('opacity', 1e-6)
                  .attr('y1', d => x1(d[0]))
                  .attr('y2', d => x1(d[1]))
                  .remove();

              // Update innerquartile box.
              const _box = _g.selectAll('rect.box')
                  .data([quartileData]);

              _box.enter().append('rect')
                  .attr('class', 'box')
                  .attr('x', 0)
                  .attr('y', d => x0(d[2]))
                  .attr('width', width)
                  .attr('height', d => x0(d[0]) - x0(d[2]))
                  .style('fill-opacity', (renderDataPoints) ? 0.1 : 1)
                  .transition()
                  .duration(duration)
                  .delay(delay)
                  .attr('y', d => x1(d[2]))
                  .attr('height', d => x1(d[0]) - x1(d[2]));

              _box.transition()
                  .duration(duration)
                  .delay(delay)
                  .attr('width', width)
                  .attr('y', d => x1(d[2]))
                  .attr('height', d => x1(d[0]) - x1(d[2]));

              // Update median line.
              const medianLine = _g.selectAll('line.median')
                  .data([quartileData[1]]);

              medianLine.enter().append('line')
                  .attr('class', 'median')
                  .attr('x1', 0)
                  .attr('y1', x0)
                  .attr('x2', width)
                  .attr('y2', x0)
                  .transition()
                  .duration(duration)
                  .delay(delay)
                  .attr('y1', x1)
                  .attr('y2', x1);

              medianLine.transition()
                  .duration(duration)
                  .delay(delay)
                  .attr('x1', 0)
                  .attr('x2', width)
                  .attr('y1', x1)
                  .attr('y2', x1);

              // Update whiskers.
              const whisker = _g.selectAll('line.whisker')
                  .data(whiskerData || []);

              whisker.enter().insert('line', 'circle, text')
                  .attr('class', 'whisker')
                  .attr('x1', 0)
                  .attr('y1', x0)
                  .attr('x2', width)
                  .attr('y2', x0)
                  .style('opacity', 1e-6)
                  .transition()
                  .duration(duration)
                  .delay(delay)
                  .attr('y1', x1)
                  .attr('y2', x1)
                  .style('opacity', 1);

              whisker.transition()
                  .duration(duration)
                  .delay(delay)
                  .attr('x1', 0)
                  .attr('x2', width)
                  .attr('y1', x1)
                  .attr('y2', x1)
                  .style('opacity', 1);

              whisker.exit().transition()
                  .duration(duration)
                  .delay(delay)
                  .attr('y1', x1)
                  .attr('y2', x1)
                  .style('opacity', 1e-6)
                  .remove();

              // Update outliers.
              if (showOutliers) {
                  const outlierClass = boldOutlier ? 'outlierBold' : 'outlier';
                  const outlierSize = boldOutlier ? 3 : 5;
                  const outlierX = boldOutlier ?
                      function () {
                          return Math.floor(Math.random() *
                              (width * dataWidthPortion) +
                              1 + ((width - (width * dataWidthPortion)) / 2));
                      } :
                      function () {
                          return width / 2;
                      };

                  const outlier = _g.selectAll(`circle.${outlierClass}`)
                      .data(outlierIndices, Number);

                  outlier.enter().insert('circle', 'text')
                      .attr('class', outlierClass)
                      .attr('r', outlierSize)
                      .attr('cx', outlierX)
                      .attr('cy', i => x0(data[i]))
                      .style('opacity', 1e-6)
                      .transition()
                      .duration(duration)
                      .delay(delay)
                      .attr('cy', i => x1(data[i]))
                      .style('opacity', 0.6);

                  if (renderTitle) {
                      outlier.selectAll('title').remove();
                      outlier.append('title').text(i => data[i]);
                  }

                  outlier.transition()
                      .duration(duration)
                      .delay(delay)
                      .attr('cx', outlierX)
                      .attr('cy', i => x1(data[i]))
                      .style('opacity', 0.6);

                  outlier.exit().transition()
                      .duration(duration)
                      .delay(delay)
                      .attr('cy', 0) //function (i) { return x1(d[i]); })
                      .style('opacity', 1e-6)
                      .remove();
              }

              // Update Values
              if (renderDataPoints) {
                  const point = _g.selectAll('circle.data')
                      .data(pointIndices);

                  point.enter().insert('circle', 'text')
                      .attr('class', 'data')
                      .attr('r', dataRadius)
                      .attr('cx', () => Math.floor(Math.random() *
                              (width * dataWidthPortion) +
                              1 + ((width - (width * dataWidthPortion)) / 2)))
                      .attr('cy', i => x0(data[i]))
                      .style('opacity', 1e-6)
                      .transition()
                      .duration(duration)
                      .delay(delay)
                      .attr('cy', i => x1(data[i]))
                      .style('opacity', dataOpacity);

                  if (renderTitle) {
                      point.selectAll('title').remove();
                      point.append('title').text(i => data[i]);
                  }

                  point.transition()
                      .duration(duration)
                      .delay(delay)
                      .attr('cx', () => Math.floor(Math.random() *
                              (width * dataWidthPortion) +
                              1 + ((width - (width * dataWidthPortion)) / 2)))
                      .attr('cy', i => x1(data[i]))
                      .style('opacity', dataOpacity);

                  point.exit().transition()
                      .duration(duration)
                      .delay(delay)
                      .attr('cy', 0)
                      .style('opacity', 1e-6)
                      .remove();
              }

              // Compute the tick format.
              const format = tickFormat || x1.tickFormat(8);

              // Update box ticks.
              const boxTick = _g.selectAll('text.box')
                  .data(quartileData);

              boxTick.enter().append('text')
                  .attr('class', 'box')
                  .attr('dy', '.3em')
                  .attr('dx', (d, i) => i & 1 ? 6 : -6)
                  .attr('x', (d, i) => i & 1 ? width : 0)
                  .attr('y', x0)
                  .attr('text-anchor', (d, i) => i & 1 ? 'start' : 'end')
                  .text(format)
                  .transition()
                  .duration(duration)
                  .delay(delay)
                  .attr('y', x1);

              boxTick.transition()
                  .duration(duration)
                  .delay(delay)
                  .text(format)
                  .attr('x', (d, i) => i & 1 ? width : 0)
                  .attr('y', x1);

              // Update whisker ticks. These are handled separately from the box
              // ticks because they may or may not exist, and we want don't want
              // to join box ticks pre-transition with whisker ticks post-.
              const whiskerTick = _g.selectAll('text.whisker')
                  .data(whiskerData || []);

              whiskerTick.enter().append('text')
                  .attr('class', 'whisker')
                  .attr('dy', '.3em')
                  .attr('dx', 6)
                  .attr('x', width)
                  .attr('y', x0)
                  .text(format)
                  .style('opacity', 1e-6)
                  .transition()
                  .duration(duration)
                  .delay(delay)
                  .attr('y', x1)
                  .style('opacity', 1);

              whiskerTick.transition()
                  .duration(duration)
                  .delay(delay)
                  .text(format)
                  .attr('x', width)
                  .attr('y', x1)
                  .style('opacity', 1);

              whiskerTick.exit().transition()
                  .duration(duration)
                  .delay(delay)
                  .attr('y', x1)
                  .style('opacity', 1e-6)
                  .remove();

              // Remove temporary quartiles element from within data array.
              delete data.quartiles;
          });
          d3Timer.timerFlush();
      }

      box.width = function (x) {
          if (!arguments.length) {
              return width;
          }
          width = x;
          return box;
      };

      box.height = function (x) {
          if (!arguments.length) {
              return height;
          }
          height = x;
          return box;
      };

      box.tickFormat = function (x) {
          if (!arguments.length) {
              return tickFormat;
          }
          tickFormat = x;
          return box;
      };

      box.showOutliers = function (x) {
          if (!arguments.length) {
              return showOutliers;
          }
          showOutliers = x;
          return box;
      };

      box.boldOutlier = function (x) {
          if (!arguments.length) {
              return boldOutlier;
          }
          boldOutlier = x;
          return box;
      };

      box.renderDataPoints = function (x) {
          if (!arguments.length) {
              return renderDataPoints;
          }
          renderDataPoints = x;
          return box;
      };

      box.renderTitle = function (x) {
          if (!arguments.length) {
              return renderTitle;
          }
          renderTitle = x;
          return box;
      };

      box.dataOpacity = function (x) {
          if (!arguments.length) {
              return dataOpacity;
          }
          dataOpacity = x;
          return box;
      };

      box.dataWidthPortion = function (x) {
          if (!arguments.length) {
              return dataWidthPortion;
          }
          dataWidthPortion = x;
          return box;
      };

      box.duration = function (x) {
          if (!arguments.length) {
              return duration;
          }
          duration = x;
          return box;
      };

      box.domain = function (x) {
          if (!arguments.length) {
              return domain;
          }
          domain = x === null ? x : typeof x === 'function' ? x : utils.constant(x);
          return box;
      };

      box.value = function (x) {
          if (!arguments.length) {
              return value;
          }
          value = x;
          return box;
      };

      box.whiskers = function (x) {
          if (!arguments.length) {
              return whiskers;
          }
          whiskers = x;
          return box;
      };

      box.quartiles = function (x) {
          if (!arguments.length) {
              return quartiles;
          }
          quartiles = x;
          return box;
      };

      return box;
  };

  function boxWhiskers (d) {
      return [0, d.length - 1];
  }

  function boxQuartiles (d) {
      return [
          d3Array.quantile(d, 0.25),
          d3Array.quantile(d, 0.5),
          d3Array.quantile(d, 0.75)
      ];
  }

  /**
   * Stack Mixin is an mixin that provides cross-chart support of stackability using d3.stack.
   * @mixin StackMixin
   * @mixes CoordinateGridMixin
   */
  class StackMixin extends CoordinateGridMixin {
      constructor () {
          super();

          this._stackLayout = d3Shape.stack();

          this._stack = [];
          this._titles = {};

          this._hidableStacks = false;
          this._evadeDomainFilter = false;

          this.data(() => {
              const layers = this._stack.filter(this._visibility);
              if (!layers.length) {
                  return [];
              }
              layers.forEach((l, i) => this._prepareValues(l, i));
              const v4data = layers[0].values.map((v, i) => {
                  const col = {x: v.x};
                  layers.forEach(layer => {
                      col[layer.name] = layer.values[i].y;
                  });
                  return col;
              });
              const keys = layers.map(layer => layer.name);
              const v4result = this.stackLayout().keys(keys)(v4data);
              v4result.forEach((series, i) => {
                  series.forEach((ys, j) => {
                      layers[i].values[j].y0 = ys[0];
                      layers[i].values[j].y1 = ys[1];
                  });
              });
              return layers;
          });

          this.colorAccessor(function (d) {
              return this.layer || this.name || d.name || d.layer;
          });
      }

      _prepareValues (layer, layerIdx) {
          const valAccessor = layer.accessor || this.valueAccessor();
          layer.name = String(layer.name || layerIdx);
          const allValues = layer.group.all().map((d, i) => ({
              x: this.keyAccessor()(d, i),
              y: layer.hidden ? null : valAccessor(d, i),
              data: d,
              layer: layer.name,
              hidden: layer.hidden
          }));

          layer.domainValues = allValues.filter(l => this._domainFilter()(l));
          layer.values = this.evadeDomainFilter() ? allValues : layer.domainValues;
      }

      _domainFilter () {
          if (!this.x()) {
              return utils.constant(true);
          }
          const xDomain = this.x().domain();
          if (this.isOrdinal()) {
              // TODO #416
              //var domainSet = d3.set(xDomain);
              return () => true //domainSet.has(p.x);
              ;
          }
          if (this.elasticX()) {
              return () => true;
          }
          return p => p.x >= xDomain[0] && p.x <= xDomain[xDomain.length - 1];
      }

      /**
       * Stack a new crossfilter group onto this chart with an optional custom value accessor. All stacks
       * in the same chart will share the same key accessor and therefore the same set of keys.
       *
       * For example, in a stacked bar chart, the bars of each stack will be positioned using the same set
       * of keys on the x axis, while stacked vertically. If name is specified then it will be used to
       * generate the legend label.
       * @see {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#group-map-reduce crossfilter.group}
       * @example
       * // stack group using default accessor
       * chart.stack(valueSumGroup)
       * // stack group using custom accessor
       * .stack(avgByDayGroup, function(d){return d.value.avgByDay;});
       * @param {crossfilter.group} group
       * @param {String} [name]
       * @param {Function} [accessor]
       * @returns {Array<{group: crossfilter.group, name: String, accessor: Function}>|StackMixin}
       */
      stack (group, name, accessor) {
          if (!arguments.length) {
              return this._stack;
          }

          if (arguments.length <= 2) {
              accessor = name;
          }

          const layer = {group: group};
          if (typeof name === 'string') {
              layer.name = name;
          }
          if (typeof accessor === 'function') {
              layer.accessor = accessor;
          }
          this._stack.push(layer);

          return this;
      }

      group (g, n, f) {
          if (!arguments.length) {
              return super.group();
          }
          this._stack = [];
          this._titles = {};
          this.stack(g, n);
          if (f) {
              this.valueAccessor(f);
          }
          return super.group(g, n);
      }

      /**
       * Allow named stacks to be hidden or shown by clicking on legend items.
       * This does not affect the behavior of hideStack or showStack.
       * @param {Boolean} [hidableStacks=false]
       * @returns {Boolean|StackMixin}
       */
      hidableStacks (hidableStacks) {
          if (!arguments.length) {
              return this._hidableStacks;
          }
          this._hidableStacks = hidableStacks;
          return this;
      }

      _findLayerByName (n) {
          const i = this._stack.map(pluck('name')).indexOf(n);
          return this._stack[i];
      }

      /**
       * Hide all stacks on the chart with the given name.
       * The chart must be re-rendered for this change to appear.
       * @param {String} stackName
       * @returns {StackMixin}
       */
      hideStack (stackName) {
          const layer = this._findLayerByName(stackName);
          if (layer) {
              layer.hidden = true;
          }
          return this;
      }

      /**
       * Show all stacks on the chart with the given name.
       * The chart must be re-rendered for this change to appear.
       * @param {String} stackName
       * @returns {StackMixin}
       */
      showStack (stackName) {
          const layer = this._findLayerByName(stackName);
          if (layer) {
              layer.hidden = false;
          }
          return this;
      }

      getValueAccessorByIndex (index) {
          return this._stack[index].accessor || this.valueAccessor();
      }

      yAxisMin () {
          const m = d3Array.min(this._flattenStack(), p => (p.y < 0) ? (p.y + p.y0) : p.y0);
          return utils.subtract(m, this.yAxisPadding());
      }

      yAxisMax () {
          const m = d3Array.max(this._flattenStack(), p => (p.y > 0) ? (p.y + p.y0) : p.y0);
          return utils.add(m, this.yAxisPadding());
      }

      _flattenStack () {
          // A round about way to achieve flatMap
          // When target browsers support flatMap, just replace map -> flatMap, no concat needed
          const values = this.data().map(layer => layer.domainValues);
          return [].concat(...values);
      }

      xAxisMin () {
          const m = d3Array.min(this._flattenStack(), pluck('x'));
          return utils.subtract(m, this.xAxisPadding(), this.xAxisPaddingUnit());
      }

      xAxisMax () {
          const m = d3Array.max(this._flattenStack(), pluck('x'));
          return utils.add(m, this.xAxisPadding(), this.xAxisPaddingUnit());
      }

      /**
       * Set or get the title function. Chart class will use this function to render svg title (usually interpreted by
       * browser as tooltips) for each child element in the chart, i.e. a slice in a pie chart or a bubble in a bubble chart.
       * Almost every chart supports title function however in grid coordinate chart you need to turn off brush in order to
       * use title otherwise the brush layer will block tooltip trigger.
       *
       * If the first argument is a stack name, the title function will get or set the title for that stack. If stackName
       * is not provided, the first stack is implied.
       * @example
       * // set a title function on 'first stack'
       * chart.title('first stack', function(d) { return d.key + ': ' + d.value; });
       * // get a title function from 'second stack'
       * var secondTitleFunction = chart.title('second stack');
       * @param {String} [stackName]
       * @param {Function} [titleAccessor]
       * @returns {String|StackMixin}
       */
      title (stackName, titleAccessor) {
          if (!stackName) {
              return super.title();
          }

          if (typeof stackName === 'function') {
              return super.title(stackName);
          }
          if (stackName === this._groupName && typeof titleAccessor === 'function') {
              return super.title(titleAccessor);
          }

          if (typeof titleAccessor !== 'function') {
              return this._titles[stackName] || super.title();
          }

          this._titles[stackName] = titleAccessor;

          return this;
      }

      /**
       * Gets or sets the stack layout algorithm, which computes a baseline for each stack and
       * propagates it to the next.
       * @see {@link https://github.com/d3/d3-3.x-api-reference/blob/master/Stack-Layout.md d3.stackD3v3}
       * @param {Function} [_stack=d3.stackD3v3]
       * @returns {Function|StackMixin}
       */
      stackLayout (_stack) {
          if (!arguments.length) {
              return this._stackLayout;
          }
          this._stackLayout = _stack;
          return this;
      }

      /**
       * Since dc.js 2.0, there has been {@link https://github.com/dc-js/dc.js/issues/949 an issue}
       * where points are filtered to the current domain. While this is a useful optimization, it is
       * incorrectly implemented: the next point outside the domain is required in order to draw lines
       * that are clipped to the bounds, as well as bars that are partly clipped.
       *
       * A fix will be included in dc.js 2.1.x, but a workaround is needed for dc.js 2.0 and until
       * that fix is published, so set this flag to skip any filtering of points.
       *
       * Once the bug is fixed, this flag will have no effect, and it will be deprecated.
       * @param {Boolean} [evadeDomainFilter=false]
       * @returns {Boolean|StackMixin}
       */
      evadeDomainFilter (evadeDomainFilter) {
          if (!arguments.length) {
              return this._evadeDomainFilter;
          }
          this._evadeDomainFilter = evadeDomainFilter;
          return this;
      }

      _visibility (l) {
          return !l.hidden;
      }

      _ordinalXDomain () {
          const flat = this._flattenStack().map(pluck('data'));
          const ordered = this._computeOrderedGroups(flat);
          return ordered.map(this.keyAccessor());
      }

      legendables () {
          return this._stack.map((layer, i) => ({
              chart: this,
              name: layer.name,
              hidden: layer.hidden || false,
              color: this.getColor.call(layer, layer.values, i)
          }));
      }

      isLegendableHidden (d) {
          const layer = this._findLayerByName(d.name);
          return layer ? layer.hidden : false;
      }

      legendToggle (d) {
          if (this._hidableStacks) {
              if (this.isLegendableHidden(d)) {
                  this.showStack(d.name);
              } else {
                  this.hideStack(d.name);
              }
              //_chart.redraw();
              this.renderGroup();
          }
      }
  }

  const MIN_BAR_WIDTH = 1;
  const DEFAULT_GAP_BETWEEN_BARS = 2;
  const LABEL_PADDING = 3;

  /**
   * Concrete bar chart/histogram implementation.
   *
   * Examples:
   * - {@link http://dc-js.github.com/dc.js/ Nasdaq 100 Index}
   * - {@link http://dc-js.github.com/dc.js/crime/index.html Canadian City Crime Stats}
   * @mixes StackMixin
   */
  class BarChart extends StackMixin {
      /**
       * Create a Bar Chart
       * @example
       * // create a bar chart under #chart-container1 element using the default global chart group
       * var chart1 = new BarChart('#chart-container1');
       * // create a bar chart under #chart-container2 element using chart group A
       * var chart2 = new BarChart('#chart-container2', 'chartGroupA');
       * // create a sub-chart under a composite parent chart
       * var chart3 = new BarChart(compositeChart);
       * @param {String|node|d3.selection|CompositeChart} parent - Any valid
       * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector}
       * specifying a dom block element such as a div; or a dom element or d3 selection.  If the bar
       * chart is a sub-chart in a {@link CompositeChart Composite Chart} then pass in the parent
       * composite chart instance instead.
       * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
       * Interaction with a chart will only trigger events and redraws within the chart's group.
       */
      constructor (parent, chartGroup) {
          super();

          this._gap = DEFAULT_GAP_BETWEEN_BARS;
          this._centerBar = false;
          this._alwaysUseRounding = false;

          this._barWidth = undefined;

          this.label(d => utils.printSingleValue(d.y0 + d.y), false);

          this.anchor(parent, chartGroup);
      }

      /**
       * Get or set the outer padding on an ordinal bar chart. This setting has no effect on non-ordinal charts.
       * Will pad the width by `padding * barWidth` on each side of the chart.
       * @param {Number} [padding=0.5]
       * @returns {Number|BarChart}
       */
      outerPadding (padding) {
          if (!arguments.length) {
              return this._outerRangeBandPadding();
          }
          return this._outerRangeBandPadding(padding);
      }

      rescale () {
          super.rescale();
          this._barWidth = undefined;
          return this;
      }

      render () {
          if (this.round() && this._centerBar && !this._alwaysUseRounding) {
              logger.warn('By default, brush rounding is disabled if bars are centered. ' +
                  'See dc.js bar chart API documentation for details.');
          }

          return super.render();
      }

      plotData () {
          let layers = this.chartBodyG().selectAll('g.stack')
              .data(this.data());

          this._calculateBarWidth();

          layers = layers
              .enter()
              .append('g')
              .attr('class', (d, i) => `stack _${i}`)
              .merge(layers);

          const last = layers.size() - 1;
          {
              const chart = this;
              layers.each(function (d, i) {
                  const layer = d3Selection.select(this);

                  chart._renderBars(layer, i, d);

                  if (chart.renderLabel() && last === i) {
                      chart._renderLabels(layer, i, d);
                  }
              });
          }
      }

      _barHeight (d) {
          return utils.safeNumber(Math.abs(this.y()(d.y + d.y0) - this.y()(d.y0)));
      }

      _labelXPos (d) {
          let x = this.x()(d.x);
          if (!this._centerBar) {
              x += this._barWidth / 2;
          }
          if (this.isOrdinal() && this._gap !== undefined) {
              x += this._gap / 2;
          }
          return utils.safeNumber(x);
      }

      _labelYPos (d) {
          let y = this.y()(d.y + d.y0);

          if (d.y < 0) {
              y -= this._barHeight(d);
          }

          return utils.safeNumber(y - LABEL_PADDING);
      }

      _renderLabels (layer, layerIndex, data) {
          const labels = layer.selectAll('text.barLabel')
              .data(data.values, pluck('x'));

          const labelsEnterUpdate = labels
              .enter()
              .append('text')
              .attr('class', 'barLabel')
              .attr('text-anchor', 'middle')
              .attr('x', d => this._labelXPos(d))
              .attr('y', d => this._labelYPos(d))
              .merge(labels);

          if (this.isOrdinal()) {
              labelsEnterUpdate.on('click', d3compat.eventHandler(d => this.onClick(d)));
              labelsEnterUpdate.attr('cursor', 'pointer');
          }

          transition(labelsEnterUpdate, this.transitionDuration(), this.transitionDelay())
              .attr('x', d => this._labelXPos(d))
              .attr('y', d => this._labelYPos(d))
              .text(d => this.label()(d));

          transition(labels.exit(), this.transitionDuration(), this.transitionDelay())
              .attr('height', 0)
              .remove();
      }

      _barXPos (d) {
          let x = this.x()(d.x);
          if (this._centerBar) {
              x -= this._barWidth / 2;
          }
          if (this.isOrdinal() && this._gap !== undefined) {
              x += this._gap / 2;
          }
          return utils.safeNumber(x);
      }

      _renderBars (layer, layerIndex, data) {
          const bars = layer.selectAll('rect.bar')
              .data(data.values, pluck('x'));

          const enter = bars.enter()
              .append('rect')
              .attr('class', 'bar')
              .classed('dc-tabbable', this._keyboardAccessible)
              .attr('fill', pluck('data', this.getColor))
              .attr('x', d => this._barXPos(d))
              .attr('y', this.yAxisHeight())
              .attr('height', 0);

          const barsEnterUpdate = enter.merge(bars);

          if (this.renderTitle()) {
              enter.append('title').text(pluck('data', this.title(data.name)));
          }

          if (this.isOrdinal()) {
              barsEnterUpdate.on('click', d3compat.eventHandler(d => this.onClick(d)));
          }

          if (this._keyboardAccessible) {
              this._makeKeyboardAccessible(this.onClick);
          }

          transition(barsEnterUpdate, this.transitionDuration(), this.transitionDelay())
              .attr('x', d => this._barXPos(d))
              .attr('y', d => {
                  let y = this.y()(d.y + d.y0);

                  if (d.y < 0) {
                      y -= this._barHeight(d);
                  }

                  return utils.safeNumber(y);
              })
              .attr('width', this._barWidth)
              .attr('height', d => this._barHeight(d))
              .attr('fill', pluck('data', this.getColor))
              .select('title').text(pluck('data', this.title(data.name)));

          transition(bars.exit(), this.transitionDuration(), this.transitionDelay())
              .attr('x', d => this.x()(d.x))
              .attr('width', this._barWidth * 0.9)
              .remove();
      }

      _calculateBarWidth () {
          if (this._barWidth === undefined) {
              const numberOfBars = this.xUnitCount();

              // please can't we always use rangeBands for bar charts?
              if (this.isOrdinal() && this._gap === undefined) {
                  this._barWidth = Math.floor(this.x().bandwidth());
              } else if (this._gap) {
                  this._barWidth = Math.floor((this.xAxisLength() - (numberOfBars - 1) * this._gap) / numberOfBars);
              } else {
                  this._barWidth = Math.floor(this.xAxisLength() / (1 + this.barPadding()) / numberOfBars);
              }

              if (this._barWidth === Infinity || isNaN(this._barWidth) || this._barWidth < MIN_BAR_WIDTH) {
                  this._barWidth = MIN_BAR_WIDTH;
              }
          }
      }

      fadeDeselectedArea (brushSelection) {
          const bars = this.chartBodyG().selectAll('rect.bar');

          if (this.isOrdinal()) {
              if (this.hasFilter()) {
                  bars.classed(constants.SELECTED_CLASS, d => this.hasFilter(d.x));
                  bars.classed(constants.DESELECTED_CLASS, d => !this.hasFilter(d.x));
              } else {
                  bars.classed(constants.SELECTED_CLASS, false);
                  bars.classed(constants.DESELECTED_CLASS, false);
              }
          } else if (this.brushOn() || this.parentBrushOn()) {
              if (!this.brushIsEmpty(brushSelection)) {
                  const start = brushSelection[0];
                  const end = brushSelection[1];

                  bars.classed(constants.DESELECTED_CLASS, d => d.x < start || d.x >= end);
              } else {
                  bars.classed(constants.DESELECTED_CLASS, false);
              }
          }
      }

      /**
       * Whether the bar chart will render each bar centered around the data position on the x-axis.
       * @param {Boolean} [centerBar=false]
       * @returns {Boolean|BarChart}
       */
      centerBar (centerBar) {
          if (!arguments.length) {
              return this._centerBar;
          }
          this._centerBar = centerBar;
          return this;
      }

      onClick (d) {
          super.onClick(d.data);
      }

      /**
       * Get or set the spacing between bars as a fraction of bar size. Valid values are between 0-1.
       * Setting this value will also remove any previously set {@link BarChart#gap gap}. See the
       * {@link https://github.com/d3/d3-scale/blob/master/README.md#scaleBand d3 docs}
       * for a visual description of how the padding is applied.
       * @param {Number} [barPadding=0]
       * @returns {Number|BarChart}
       */
      barPadding (barPadding) {
          if (!arguments.length) {
              return this._rangeBandPadding();
          }
          this._rangeBandPadding(barPadding);
          this._gap = undefined;
          return this;
      }

      _useOuterPadding () {
          return this._gap === undefined;
      }

      /**
       * Manually set fixed gap (in px) between bars instead of relying on the default auto-generated
       * gap.  By default the bar chart implementation will calculate and set the gap automatically
       * based on the number of data points and the length of the x axis.
       * @param {Number} [gap=2]
       * @returns {Number|BarChart}
       */
      gap (gap) {
          if (!arguments.length) {
              return this._gap;
          }
          this._gap = gap;
          return this;
      }

      extendBrush (brushSelection) {
          if (brushSelection && this.round() && (!this._centerBar || this._alwaysUseRounding)) {
              brushSelection[0] = this.round()(brushSelection[0]);
              brushSelection[1] = this.round()(brushSelection[1]);
          }
          return brushSelection;
      }

      /**
       * Set or get whether rounding is enabled when bars are centered. If false, using
       * rounding with centered bars will result in a warning and rounding will be ignored.  This flag
       * has no effect if bars are not {@link BarChart#centerBar centered}.
       * When using standard d3.js rounding methods, the brush often doesn't align correctly with
       * centered bars since the bars are offset.  The rounding function must add an offset to
       * compensate, such as in the following example.
       * @example
       * chart.round(function(n) { return Math.floor(n) + 0.5; });
       * @param {Boolean} [alwaysUseRounding=false]
       * @returns {Boolean|BarChart}
       */
      alwaysUseRounding (alwaysUseRounding) {
          if (!arguments.length) {
              return this._alwaysUseRounding;
          }
          this._alwaysUseRounding = alwaysUseRounding;
          return this;
      }

      legendHighlight (d) {
          const colorFilter = (color, inv) => function () {
              const item = d3Selection.select(this);
              const match = item.attr('fill') === color;
              return inv ? !match : match;
          };

          if (!this.isLegendableHidden(d)) {
              this.g().selectAll('rect.bar')
                  .classed('highlight', colorFilter(d.color))
                  .classed('fadeout', colorFilter(d.color, true));
          }
      }

      legendReset () {
          this.g().selectAll('rect.bar')
              .classed('highlight', false)
              .classed('fadeout', false);
      }

      xAxisMax () {
          let max = super.xAxisMax();
          if ('resolution' in this.xUnits()) {
              const res = this.xUnits().resolution;
              max += res;
          }
          return max;
      }
  }

  const barChart = (parent, chartGroup) => new BarChart(parent, chartGroup);

  // Returns a function to compute the interquartile range.
  function defaultWhiskersIQR (k) {
      return d => {
          const q1 = d.quartiles[0];
          const q3 = d.quartiles[2];
          const iqr = (q3 - q1) * k;

          let i = -1;
          let j = d.length;

          do {
              ++i;
          } while (d[i] < q1 - iqr);

          do {
              --j;
          } while (d[j] > q3 + iqr);

          return [i, j];
      };
  }

  /**
   * A box plot is a chart that depicts numerical data via their quartile ranges.
   *
   * Examples:
   * - {@link http://dc-js.github.io/dc.js/examples/boxplot-basic.html Boxplot Basic example}
   * - {@link http://dc-js.github.io/dc.js/examples/boxplot-enhanced.html Boxplot Enhanced example}
   * - {@link http://dc-js.github.io/dc.js/examples/boxplot-render-data.html Boxplot Render Data example}
   * - {@link http://dc-js.github.io/dc.js/examples/boxplot-time.html Boxplot time example}
   * @mixes CoordinateGridMixin
   */
  class BoxPlot extends CoordinateGridMixin {
      /**
       * Create a Box Plot.
       *
       * @example
       * // create a box plot under #chart-container1 element using the default global chart group
       * var boxPlot1 = new BoxPlot('#chart-container1');
       * // create a box plot under #chart-container2 element using chart group A
       * var boxPlot2 = new BoxPlot('#chart-container2', 'chartGroupA');
       * @param {String|node|d3.selection} parent - Any valid
       * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
       * a dom block element such as a div; or a dom element or d3 selection.
       * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
       * Interaction with a chart will only trigger events and redraws within the chart's group.
       */
      constructor (parent, chartGroup) {
          super();

          this._whiskerIqrFactor = 1.5;
          this._whiskersIqr = defaultWhiskersIQR;
          this._whiskers = this._whiskersIqr(this._whiskerIqrFactor);

          this._box = d3Box();
          this._tickFormat = null;
          this._renderDataPoints = false;
          this._dataOpacity = 0.3;
          this._dataWidthPortion = 0.8;
          this._showOutliers = true;
          this._boldOutlier = false;

          // Used in yAxisMin and yAxisMax to add padding in pixel coordinates
          // so the min and max data points/whiskers are within the chart
          this._yRangePadding = 8;

          this._boxWidth = (innerChartWidth, xUnits) => {
              if (this.isOrdinal()) {
                  return this.x().bandwidth();
              } else {
                  return innerChartWidth / (1 + this.boxPadding()) / xUnits;
              }
          };

          // default to ordinal
          this.x(d3Scale.scaleBand());
          this.xUnits(units.ordinal);

          // valueAccessor should return an array of values that can be coerced into numbers
          // or if data is overloaded for a static array of arrays, it should be `Number`.
          // Empty arrays are not included.
          this.data(group => group.all().map(d => {
              d.map = accessor => accessor.call(d, d);
              return d;
          }).filter(d => {
              const values = this.valueAccessor()(d);
              return values.length !== 0;
          }));

          this.boxPadding(0.8);
          this.outerPadding(0.5);

          this.anchor(parent, chartGroup);
      }

      /**
       * Get or set the spacing between boxes as a fraction of box size. Valid values are within 0-1.
       * See the {@link https://github.com/d3/d3-scale/blob/master/README.md#scaleBand d3 docs}
       * for a visual description of how the padding is applied.
       * @see {@link https://github.com/d3/d3-scale/blob/master/README.md#scaleBand d3.scaleBand}
       * @param {Number} [padding=0.8]
       * @returns {Number|BoxPlot}
       */
      boxPadding (padding) {
          if (!arguments.length) {
              return this._rangeBandPadding();
          }
          return this._rangeBandPadding(padding);
      }

      /**
       * Get or set the outer padding on an ordinal box chart. This setting has no effect on non-ordinal charts
       * or on charts with a custom {@link BoxPlot#boxWidth .boxWidth}. Will pad the width by
       * `padding * barWidth` on each side of the chart.
       * @param {Number} [padding=0.5]
       * @returns {Number|BoxPlot}
       */
      outerPadding (padding) {
          if (!arguments.length) {
              return this._outerRangeBandPadding();
          }
          return this._outerRangeBandPadding(padding);
      }

      /**
       * Get or set the numerical width of the boxplot box. The width may also be a function taking as
       * parameters the chart width excluding the right and left margins, as well as the number of x
       * units.
       * @example
       * // Using numerical parameter
       * chart.boxWidth(10);
       * // Using function
       * chart.boxWidth((innerChartWidth, xUnits) { ... });
       * @param {Number|Function} [boxWidth=0.5]
       * @returns {Number|Function|BoxPlot}
       */
      boxWidth (boxWidth) {
          if (!arguments.length) {
              return this._boxWidth;
          }
          this._boxWidth = typeof boxWidth === 'function' ? boxWidth : utils.constant(boxWidth);
          return this;
      }

      _boxTransform (d, i) {
          const xOffset = this.x()(this.keyAccessor()(d, i));
          return `translate(${xOffset}, 0)`;
      }

      _preprocessData () {
          if (this.elasticX()) {
              this.x().domain([]);
          }
      }

      plotData () {
          this._calculatedBoxWidth = this._boxWidth(this.effectiveWidth(), this.xUnitCount());

          this._box.whiskers(this._whiskers)
              .width(this._calculatedBoxWidth)
              .height(this.effectiveHeight())
              .value(this.valueAccessor())
              .domain(this.y().domain())
              .duration(this.transitionDuration())
              .tickFormat(this._tickFormat)
              .renderDataPoints(this._renderDataPoints)
              .dataOpacity(this._dataOpacity)
              .dataWidthPortion(this._dataWidthPortion)
              .renderTitle(this.renderTitle())
              .showOutliers(this._showOutliers)
              .boldOutlier(this._boldOutlier);

          const boxesG = this.chartBodyG().selectAll('g.box').data(this.data(), this.keyAccessor());

          const boxesGEnterUpdate = this._renderBoxes(boxesG);
          this._updateBoxes(boxesGEnterUpdate);
          this._removeBoxes(boxesG);

          this.fadeDeselectedArea(this.filter());
      }

      _renderBoxes (boxesG) {
          const boxesGEnter = boxesG.enter().append('g');

          boxesGEnter
              .attr('class', 'box')
              .classed('dc-tabbable', this._keyboardAccessible)
              .attr('transform', (d, i) => this._boxTransform(d, i))
              .call(this._box)
              .on('click', d3compat.eventHandler(d => {
                  this.filter(this.keyAccessor()(d));
                  this.redrawGroup();
              }))
              .selectAll('circle')
              .classed('dc-tabbable', this._keyboardAccessible);

          if (this._keyboardAccessible) {
              this._makeKeyboardAccessible(this.onClick);
          }

          return boxesGEnter.merge(boxesG);
      }

      _updateBoxes (boxesG) {
          const chart = this;
          transition(boxesG, this.transitionDuration(), this.transitionDelay())
              .attr('transform', (d, i) => this._boxTransform(d, i))
              .call(this._box)
              .each(function (d) {
                  const color = chart.getColor(d, 0);
                  d3Selection.select(this).select('rect.box').attr('fill', color);
                  d3Selection.select(this).selectAll('circle.data').attr('fill', color);
              });
      }

      _removeBoxes (boxesG) {
          boxesG.exit().remove().call(this._box);
      }

      _minDataValue () {
          return d3Array.min(this.data(), e => d3Array.min(this.valueAccessor()(e)));
      }

      _maxDataValue () {
          return d3Array.max(this.data(), e => d3Array.max(this.valueAccessor()(e)));
      }

      _yAxisRangeRatio () {
          return ((this._maxDataValue() - this._minDataValue()) / this.effectiveHeight());
      }

      onClick (d) {
          this.filter(this.keyAccessor()(d));
          this.redrawGroup();
      }

      fadeDeselectedArea (brushSelection) {
          const chart = this;
          if (this.hasFilter()) {
              if (this.isOrdinal()) {
                  this.g().selectAll('g.box').each(function (d) {
                      if (chart.isSelectedNode(d)) {
                          chart.highlightSelected(this);
                      } else {
                          chart.fadeDeselected(this);
                      }
                  });
              } else {
                  if (!(this.brushOn() || this.parentBrushOn())) {
                      return;
                  }
                  const start = brushSelection[0];
                  const end = brushSelection[1];
                  this.g().selectAll('g.box').each(function (d) {
                      const key = chart.keyAccessor()(d);
                      if (key < start || key >= end) {
                          chart.fadeDeselected(this);
                      } else {
                          chart.highlightSelected(this);
                      }
                  });
              }
          } else {
              this.g().selectAll('g.box').each(function () {
                  chart.resetHighlight(this);
              });
          }
      }

      isSelectedNode (d) {
          return this.hasFilter(this.keyAccessor()(d));
      }

      yAxisMin () {
          const padding = this._yRangePadding * this._yAxisRangeRatio();
          return utils.subtract(this._minDataValue() - padding, this.yAxisPadding());
      }

      yAxisMax () {
          const padding = this._yRangePadding * this._yAxisRangeRatio();
          return utils.add(this._maxDataValue() + padding, this.yAxisPadding());
      }

      /**
       * Get or set the numerical format of the boxplot median, whiskers and quartile labels. Defaults
       * to integer formatting.
       * @example
       * // format ticks to 2 decimal places
       * chart.tickFormat(d3.format('.2f'));
       * @param {Function} [tickFormat]
       * @returns {Number|Function|BoxPlot}
       */
      tickFormat (tickFormat) {
          if (!arguments.length) {
              return this._tickFormat;
          }
          this._tickFormat = tickFormat;
          return this;
      }

      /**
       * Get or set the amount of padding to add, in pixel coordinates, to the top and
       * bottom of the chart to accommodate box/whisker labels.
       * @example
       * // allow more space for a bigger whisker font
       * chart.yRangePadding(12);
       * @param {Function} [yRangePadding = 8]
       * @returns {Number|Function|BoxPlot}
       */
      yRangePadding (yRangePadding) {
          if (!arguments.length) {
              return this._yRangePadding;
          }
          this._yRangePadding = yRangePadding;
          return this;
      }

      /**
       * Get or set whether individual data points will be rendered.
       * @example
       * // Enable rendering of individual data points
       * chart.renderDataPoints(true);
       * @param {Boolean} [show=false]
       * @returns {Boolean|BoxPlot}
       */
      renderDataPoints (show) {
          if (!arguments.length) {
              return this._renderDataPoints;
          }
          this._renderDataPoints = show;
          return this;
      }

      /**
       * Get or set the opacity when rendering data.
       * @example
       * // If individual data points are rendered increase the opacity.
       * chart.dataOpacity(0.7);
       * @param {Number} [opacity=0.3]
       * @returns {Number|BoxPlot}
       */
      dataOpacity (opacity) {
          if (!arguments.length) {
              return this._dataOpacity;
          }
          this._dataOpacity = opacity;
          return this;
      }

      /**
       * Get or set the portion of the width of the box to show data points.
       * @example
       * // If individual data points are rendered increase the data box.
       * chart.dataWidthPortion(0.9);
       * @param {Number} [percentage=0.8]
       * @returns {Number|BoxPlot}
       */
      dataWidthPortion (percentage) {
          if (!arguments.length) {
              return this._dataWidthPortion;
          }
          this._dataWidthPortion = percentage;
          return this;
      }

      /**
       * Get or set whether outliers will be rendered.
       * @example
       * // Disable rendering of outliers
       * chart.showOutliers(false);
       * @param {Boolean} [show=true]
       * @returns {Boolean|BoxPlot}
       */
      showOutliers (show) {
          if (!arguments.length) {
              return this._showOutliers;
          }
          this._showOutliers = show;
          return this;
      }

      /**
       * Get or set whether outliers will be drawn bold.
       * @example
       * // If outliers are rendered display as bold
       * chart.boldOutlier(true);
       * @param {Boolean} [show=false]
       * @returns {Boolean|BoxPlot}
       */
      boldOutlier (show) {
          if (!arguments.length) {
              return this._boldOutlier;
          }
          this._boldOutlier = show;
          return this;
      }
  }

  const boxPlot = (parent, chartGroup) => new BoxPlot(parent, chartGroup);

  /**
   * A concrete implementation of a general purpose bubble chart that allows data visualization using the
   * following dimensions:
   * - x axis position
   * - y axis position
   * - bubble radius
   * - color
   *
   * Examples:
   * - {@link http://dc-js.github.com/dc.js/ Nasdaq 100 Index}
   * - {@link http://dc-js.github.com/dc.js/vc/index.html US Venture Capital Landscape 2011}
   * @mixes BubbleMixin
   * @mixes CoordinateGridMixin
   */
  class BubbleChart extends BubbleMixin(CoordinateGridMixin) {
      /**
       * Create a Bubble Chart.
       *
       * @example
       * // create a bubble chart under #chart-container1 element using the default global chart group
       * var bubbleChart1 = new BubbleChart('#chart-container1');
       * // create a bubble chart under #chart-container2 element using chart group A
       * var bubbleChart2 = new BubbleChart('#chart-container2', 'chartGroupA');
       * @param {String|node|d3.selection} parent - Any valid
       * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
       * a dom block element such as a div; or a dom element or d3 selection.
       * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
       * Interaction with a chart will only trigger events and redraws within the chart's group.
       */
      constructor (parent, chartGroup) {
          super();

          this.transitionDuration(750);

          this.transitionDelay(0);

          this.anchor(parent, chartGroup);
      }

      _bubbleLocator (d) {
          return `translate(${this._bubbleX(d)},${this._bubbleY(d)})`;
      }

      plotData () {
          this.calculateRadiusDomain();
          this.r().range([this.MIN_RADIUS, this.xAxisLength() * this.maxBubbleRelativeSize()]);

          const data = this.data();
          let bubbleG = this.chartBodyG().selectAll(`g.${this.BUBBLE_NODE_CLASS}`)
              .data(data, d => d.key);
          if (this.sortBubbleSize() || this.keyboardAccessible()) {
              // update dom order based on sort
              bubbleG.order();
          }

          this._removeNodes(bubbleG);

          bubbleG = this._renderNodes(bubbleG);

          this._updateNodes(bubbleG);

          this.fadeDeselectedArea(this.filter());
      }

      _renderNodes (bubbleG) {
          const bubbleGEnter = bubbleG.enter().append('g');

          bubbleGEnter
              .attr('class', this.BUBBLE_NODE_CLASS)
              .attr('transform', d => this._bubbleLocator(d))
              .append('circle').attr('class', (d, i) => `${this.BUBBLE_CLASS} _${i}`)
              .on('click', d3compat.eventHandler(d => this.onClick(d)))
              .classed('dc-tabbable', this._keyboardAccessible)
              .attr('fill', this.getColor)
              .attr('r', 0);

          bubbleG = bubbleGEnter.merge(bubbleG);

          transition(bubbleG, this.transitionDuration(), this.transitionDelay())
              .select(`circle.${this.BUBBLE_CLASS}`)
              .attr('r', d => this.bubbleR(d))
              .attr('opacity', d => (this.bubbleR(d) > 0) ? 1 : 0);

          if (this._keyboardAccessible) {
              this._makeKeyboardAccessible(this.onClick);
          }

          this._doRenderLabel(bubbleGEnter);

          this._doRenderTitles(bubbleGEnter);

          return bubbleG;
      }

      _updateNodes (bubbleG) {
          transition(bubbleG, this.transitionDuration(), this.transitionDelay())
              .attr('transform', d => this._bubbleLocator(d))
              .select(`circle.${this.BUBBLE_CLASS}`)
              .attr('fill', this.getColor)
              .attr('r', d => this.bubbleR(d))
              .attr('opacity', d => (this.bubbleR(d) > 0) ? 1 : 0);

          this.doUpdateLabels(bubbleG);
          this.doUpdateTitles(bubbleG);
      }

      _removeNodes (bubbleG) {
          bubbleG.exit().remove();
      }

      _bubbleX (d) {
          let x = this.x()(this.keyAccessor()(d));
          if (isNaN(x) || !isFinite(x)) {
              x = 0;
          }
          return x;
      }

      _bubbleY (d) {
          let y = this.y()(this.valueAccessor()(d));
          if (isNaN(y) || !isFinite(y)) {
              y = 0;
          }
          return y;
      }

      renderBrush () {
          // override default x axis brush from parent chart
      }

      redrawBrush (brushSelection, doTransition) {
          // override default x axis brush from parent chart
          this.fadeDeselectedArea(brushSelection);
      }
  }

  const bubbleChart = (parent, chartGroup) => new BubbleChart(parent, chartGroup);

  const BUBBLE_OVERLAY_CLASS = 'bubble-overlay';
  const BUBBLE_NODE_CLASS = 'node';
  const BUBBLE_CLASS = 'bubble';

  /**
   * The bubble overlay chart is quite different from the typical bubble chart. With the bubble overlay
   * chart you can arbitrarily place bubbles on an existing svg or bitmap image, thus changing the
   * typical x and y positioning while retaining the capability to visualize data using bubble radius
   * and coloring.
   *
   * Examples:
   * - {@link http://dc-js.github.com/dc.js/crime/index.html Canadian City Crime Stats}
   * @mixes BubbleMixin
   * @mixes BaseMixin
   */
  class BubbleOverlay extends BubbleMixin(BaseMixin) {
      /**
       * Create a Bubble Overlay.
       *
       * @example
       * // create a bubble overlay chart on top of the '#chart-container1 svg' element using the default global chart group
       * var bubbleChart1 = BubbleOverlayChart('#chart-container1').svg(d3.select('#chart-container1 svg'));
       * // create a bubble overlay chart on top of the '#chart-container2 svg' element using chart group A
       * var bubbleChart2 = new CompositeChart('#chart-container2', 'chartGroupA').svg(d3.select('#chart-container2 svg'));
       * @param {String|node|d3.selection} parent - Any valid
       * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
       * a dom block element such as a div; or a dom element or d3 selection.
       * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
       * Interaction with a chart will only trigger events and redraws within the chart's group.
       */
      constructor (parent, chartGroup) {
          super();

          /**
           * **mandatory**
           *
           * Set the underlying svg image element. Unlike other dc charts this chart will not generate a svg
           * element; therefore the bubble overlay chart will not work if this function is not invoked. If the
           * underlying image is a bitmap, then an empty svg will need to be created on top of the image.
           * @example
           * // set up underlying svg element
           * chart.svg(d3.select('#chart svg'));
           * @param {SVGElement|d3.selection} [imageElement]
           * @returns {BubbleOverlay}
           */
          this._g = undefined;
          this._points = [];
          this._keyboardAccessible = false;

          this.transitionDuration(750);

          this.transitionDelay(0);

          this.radiusValueAccessor(d => d.value);

          this.anchor(parent, chartGroup);
      }

      /**
       * **mandatory**
       *
       * Set up a data point on the overlay. The name of a data point should match a specific 'key' among
       * data groups generated using keyAccessor.  If a match is found (point name <-> data group key)
       * then a bubble will be generated at the position specified by the function. x and y
       * value specified here are relative to the underlying svg.
       * @param {String} name
       * @param {Number} x
       * @param {Number} y
       * @returns {BubbleOverlay}
       */
      point (name, x, y) {
          this._points.push({name: name, x: x, y: y});
          return this;
      }

      _doRender () {
          this._g = this._initOverlayG();

          this.r().range([this.MIN_RADIUS, this.width() * this.maxBubbleRelativeSize()]);

          this._initializeBubbles();

          this.fadeDeselectedArea(this.filter());

          return this;
      }

      _initOverlayG () {
          this._g = this.select(`g.${BUBBLE_OVERLAY_CLASS}`);
          if (this._g.empty()) {
              this._g = this.svg().append('g').attr('class', BUBBLE_OVERLAY_CLASS);
          }
          return this._g;
      }

      _initializeBubbles () {
          const data = this._mapData();
          this.calculateRadiusDomain();

          this._points.forEach(point => {
              const nodeG = this._getNodeG(point, data);

              let circle = nodeG.select(`circle.${BUBBLE_CLASS}`);

              if (circle.empty()) {
                  circle = nodeG.append('circle')
                      .attr('class', BUBBLE_CLASS)
                      .classed('dc-tabbable', this._keyboardAccessible)
                      .attr('r', 0)
                      .attr('fill', this.getColor)
                      .on('click', d3compat.eventHandler(d => this.onClick(d)));
              }

              if (this._keyboardAccessible) {
                  this._makeKeyboardAccessible(this.onClick);
              }

              transition(circle, this.transitionDuration(), this.transitionDelay())
                  .attr('r', d => this.bubbleR(d));

              this._doRenderLabel(nodeG);

              this._doRenderTitles(nodeG);
          });
      }

      _mapData () {
          const data = {};
          this.data().forEach(datum => {
              data[this.keyAccessor()(datum)] = datum;
          });
          return data;
      }

      _getNodeG (point, data) {
          const bubbleNodeClass = `${BUBBLE_NODE_CLASS} ${utils.nameToId(point.name)}`;

          let nodeG = this._g.select(`g.${utils.nameToId(point.name)}`);

          if (nodeG.empty()) {
              nodeG = this._g.append('g')
                  .attr('class', bubbleNodeClass)
                  .attr('transform', `translate(${point.x},${point.y})`);
          }

          nodeG.datum(data[point.name]);

          return nodeG;
      }

      _doRedraw () {
          this._updateBubbles();

          this.fadeDeselectedArea(this.filter());

          return this;
      }

      _updateBubbles () {
          const data = this._mapData();
          this.calculateRadiusDomain();

          this._points.forEach(point => {
              const nodeG = this._getNodeG(point, data);

              const circle = nodeG.select(`circle.${BUBBLE_CLASS}`);

              transition(circle, this.transitionDuration(), this.transitionDelay())
                  .attr('r', d => this.bubbleR(d))
                  .attr('fill', this.getColor);

              this.doUpdateLabels(nodeG);

              this.doUpdateTitles(nodeG);
          });
      }

      debug (flag) {
          if (flag) {
              let debugG = this.select(`g.${constants.DEBUG_GROUP_CLASS}`);

              if (debugG.empty()) {
                  debugG = this.svg()
                      .append('g')
                      .attr('class', constants.DEBUG_GROUP_CLASS);
              }

              const debugText = debugG.append('text')
                  .attr('x', 10)
                  .attr('y', 20);

              debugG
                  .append('rect')
                  .attr('width', this.width())
                  .attr('height', this.height())
                  .on('mousemove', d3compat.eventHandler((d, evt) => {
                      const position = d3compat.pointer(evt, debugG.node());
                      const msg = `${position[0]}, ${position[1]}`;
                      debugText.text(msg);
                  }));
          } else {
              this.selectAll('.debug').remove();
          }

          return this;
      }

  }

  const bubbleOverlay = (parent, chartGroup) => new BubbleOverlay(parent, chartGroup);

  const GROUP_CSS_CLASS = 'dc-cbox-group';
  const ITEM_CSS_CLASS = 'dc-cbox-item';

  /**
   * The CboxMenu is a simple widget designed to filter a dimension by
   * selecting option(s) from a set of HTML `<input />` elements. The menu can be
   * made into a set of radio buttons (single select) or checkboxes (multiple).
   * @mixes BaseMixin
   */
  class CboxMenu extends BaseMixin {
      /**
       * Create a Cbox Menu.
       *
       * @example
       * // create a cboxMenu under #cbox-container using the default global chart group
       * var cbox = new CboxMenu('#cbox-container')
       *                .dimension(states)
       *                .group(stateGroup);
       * // the option text can be set via the title() function
       * // by default the option text is '`key`: `value`'
       * cbox.title(function (d){
       *     return 'STATE: ' + d.key;
       * })
       * @param {String|node|d3.selection|CompositeChart} parent - Any valid
       * [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying
       * a dom block element such as a div; or a dom element or d3 selection.
       * @param {String} [chartGroup] - The name of the chart group this widget should be placed in.
       * Interaction with the widget will only trigger events and redraws within its group.
       */
      constructor (parent, chartGroup) {
          super();

          this._cbox = undefined;
          this._promptText = 'Select all';
          this._multiple = false;
          this._inputType = 'radio';
          this._promptValue = null;

          this._uniqueId = utils.uniqueId();

          this.data(group => group.all().filter(this._filterDisplayed));

          // There is an accessor for this attribute, initialized with default value
          this._filterDisplayed = d => this.valueAccessor()(d) > 0;

          this._order = (a, b) => {
              if (this.keyAccessor()(a) > this.keyAccessor()(b)) {
                  return 1;
              }
              if (this.keyAccessor()(a) < this.keyAccessor()(b)) {
                  return -1;
              }
              return 0;
          };

          this.anchor(parent, chartGroup);
      }

      _doRender () {
          return this._doRedraw();
      }

      _doRedraw () {
          this.select('ul').remove();
          this._cbox = this.root()
              .append('ul')
              .classed(GROUP_CSS_CLASS, true);
          this._renderOptions();

          if (this.hasFilter() && this._multiple) {
              this._cbox.selectAll('input')
              // adding `false` avoids failing test cases in phantomjs
                  .property('checked', d => d && this.filters().indexOf(String(this.keyAccessor()(d))) >= 0 || false);
          } else if (this.hasFilter()) {
              this._cbox.selectAll('input')
                  .property('checked', d => {
                      if (!d) {
                          return false;
                      }
                      return this.keyAccessor()(d) === this.filter();
                  });
          }
          return this;
      }

      _renderOptions () {
          let options = this._cbox
              .selectAll(`li.${ITEM_CSS_CLASS}`)
              .data(this.data(), d => this.keyAccessor()(d));

          options.exit().remove();

          options = options.enter()
              .append('li')
              .classed(ITEM_CSS_CLASS, true)
              .merge(options);

          options
              .append('input')
              .attr('type', this._inputType)
              .attr('value', d => this.keyAccessor()(d))
              .attr('name', `domain_${this._uniqueId}`)
              .attr('id', (d, i) => `input_${this._uniqueId}_${i}`);
          options
              .append('label')
              .attr('for', (d, i) => `input_${this._uniqueId}_${i}`)
              .text(this.title());

          const chart = this;
          // 'all' option
          if (this._multiple) {
              this._cbox
                  .append('li')
                  .append('input')
                  .attr('type', 'reset')
                  .text(this._promptText)
                  .on('click', d3compat.eventHandler(function (d, evt) {
                      return chart._onChange(d, evt, this);
                  }));
          } else {
              const li = this._cbox.append('li');
              li.append('input')
                  .attr('type', this._inputType)
                  .attr('value', this._promptValue)
                  .attr('name', `domain_${this._uniqueId}`)
                  .attr('id', (d, i) => `input_${this._uniqueId}_all`)
                  .property('checked', true);
              li.append('label')
                  .attr('for', (d, i) => `input_${this._uniqueId}_all`)
                  .text(this._promptText);
          }

          this._cbox
              .selectAll(`li.${ITEM_CSS_CLASS}`)
              .sort(this._order);

          this._cbox.on('change', d3compat.eventHandler(function (d, evt) {
              return chart._onChange(d, evt, this);
          }));
          return options;
      }

      _onChange (d, evt, element) {
          let values;

          const target = d3Selection.select(evt.target);
          let options;

          if (!target.datum()) {
              values = this._promptValue || null;
          } else {
              options = d3Selection.select(element).selectAll('input')
                  .filter(function (o) {
                      if (o) {
                          return this.checked;
                      }
                  });
              values = options.nodes().map(option => option.value);
              // check if only prompt option is selected
              if (!this._multiple && values.length === 1) {
                  values = values[0];
              }
          }
          this.onChange(values);
      }

      onChange (val) {
          if (val && this._multiple) {
              this.replaceFilter([val]);
          } else if (val) {
              this.replaceFilter(val);
          } else {
              this.filterAll();
          }
          events.trigger(() => {
              this.redrawGroup();
          });
      }

      /**
       * Get or set the function that controls the ordering of option tags in the
       * cbox menu. By default options are ordered by the group key in ascending
       * order.
       * @param {Function} [order]
       * @returns {Function|CboxMenu}
       * @example
       * // order by the group's value
       * chart.order(function (a,b) {
       *     return a.value > b.value ? 1 : b.value > a.value ? -1 : 0;
       * });
       */
      order (order) {
          if (!arguments.length) {
              return this._order;
          }
          this._order = order;
          return this;
      }

      /**
       * Get or set the text displayed in the options used to prompt selection.
       * @param {String} [promptText='Select all']
       * @returns {String|CboxMenu}
       * @example
       * chart.promptText('All states');
       */
      promptText (promptText) {
          if (!arguments.length) {
              return this._promptText;
          }
          this._promptText = promptText;
          return this;
      }

      /**
       * Get or set the function that filters options prior to display. By default options
       * with a value of < 1 are not displayed.
       * @param {function} [filterDisplayed]
       * @returns {Function|CboxMenu}
       * @example
       * // display all options override the `filterDisplayed` function:
       * chart.filterDisplayed(function () {
       *     return true;
       * });
       */
      filterDisplayed (filterDisplayed) {
          if (!arguments.length) {
              return this._filterDisplayed;
          }
          this._filterDisplayed = filterDisplayed;
          return this;
      }

      /**
       * Controls the type of input element. Setting it to true converts
       * the HTML `input` tags from radio buttons to checkboxes.
       * @param {boolean} [multiple=false]
       * @returns {Boolean|CboxMenu}
       * @example
       * chart.multiple(true);
       */
      multiple (multiple) {
          if (!arguments.length) {
              return this._multiple;
          }
          this._multiple = multiple;
          if (this._multiple) {
              this._inputType = 'checkbox';
          } else {
              this._inputType = 'radio';
          }
          return this;
      }

      /**
       * Controls the default value to be used for
       * [dimension.filter](https://github.com/crossfilter/crossfilter/wiki/API-Reference#dimension_filter)
       * when only the prompt value is selected. If `null` (the default), no filtering will occur when
       * just the prompt is selected.
       * @param {?*} [promptValue=null]
       * @returns {*|CboxMenu}
       */
      promptValue (promptValue) {
          if (!arguments.length) {
              return this._promptValue;
          }
          this._promptValue = promptValue;

          return this;
      }
  }

  const cboxMenu = (parent, chartGroup) => new CboxMenu(parent, chartGroup);

  const SUB_CHART_CLASS = 'sub';
  const DEFAULT_RIGHT_Y_AXIS_LABEL_PADDING = 12;

  /**
   * Composite charts are a special kind of chart that render multiple charts on the same Coordinate
   * Grid. You can overlay (compose) different bar/line/area charts in a single composite chart to
   * achieve some quite flexible charting effects.
   * @mixes CoordinateGridMixin
   */
  class CompositeChart extends CoordinateGridMixin {
      /**
       * Create a Composite Chart.
       * @example
       * // create a composite chart under #chart-container1 element using the default global chart group
       * var compositeChart1 = new CompositeChart('#chart-container1');
       * // create a composite chart under #chart-container2 element using chart group A
       * var compositeChart2 = new CompositeChart('#chart-container2', 'chartGroupA');
       * @param {String|node|d3.selection} parent - Any valid
       * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
       * a dom block element such as a div; or a dom element or d3 selection.
       * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
       * Interaction with a chart will only trigger events and redraws within the chart's group.
       */
      constructor (parent, chartGroup) {
          super();

          this._children = [];

          this._childOptions = {};

          this._shareColors = false;
          this._shareTitle = true;
          this._alignYAxes = false;

          this._rightYAxis = d3Axis.axisRight();
          this._rightYAxisLabel = 0;
          this._rightYAxisLabelPadding = DEFAULT_RIGHT_Y_AXIS_LABEL_PADDING;
          this._rightY = undefined;
          this._rightAxisGridLines = false;

          this._mandatoryAttributes([]);
          this.transitionDuration(500);
          this.transitionDelay(0);

          this.on('filtered.dcjs-composite-chart', chart => {
              // Propagate the filters onto the children
              // Notice that on children the call is .replaceFilter and not .filter
              //   the reason is that _chart.filter() returns the entire current set of filters not just the last added one
              for (let i = 0; i < this._children.length; ++i) {
                  this._children[i].replaceFilter(this.filter());
              }
          });

          this.anchor(parent, chartGroup);
      }

      _generateG () {
          const g = super._generateG();

          for (let i = 0; i < this._children.length; ++i) {
              const child = this._children[i];

              this._generateChildG(child, i);

              if (!child.dimension()) {
                  child.dimension(this.dimension());
              }
              if (!child.group()) {
                  child.group(this.group());
              }

              child.chartGroup(this.chartGroup());
              child.svg(this.svg());
              child.xUnits(this.xUnits());
              child.transitionDuration(this.transitionDuration(), this.transitionDelay());
              child.parentBrushOn(this.brushOn());
              child.brushOn(false);
              child.renderTitle(this.renderTitle());
              child.elasticX(this.elasticX());
          }

          return g;
      }

      rescale () {
          super.rescale();

          this._children.forEach(child => {
              child.rescale();
          });

          return this;
      }

      resizing (resizing) {
          if (!arguments.length) {
              return super.resizing();
          }
          super.resizing(resizing);

          this._children.forEach(child => {
              child.resizing(resizing);
          });

          return this;
      }

      _prepareYAxis () {
          const left = (this._leftYAxisChildren().length !== 0);
          const right = (this._rightYAxisChildren().length !== 0);
          const ranges = this._calculateYAxisRanges(left, right);

          if (left) {
              this._prepareLeftYAxis(ranges);
          }
          if (right) {
              this._prepareRightYAxis(ranges);
          }

          if (this._leftYAxisChildren().length > 0 && !this._rightAxisGridLines) {
              this._renderHorizontalGridLinesForAxis(this.g(), this.y(), this.yAxis());
          } else if (this._rightYAxisChildren().length > 0) {
              this._renderHorizontalGridLinesForAxis(this.g(), this._rightY, this._rightYAxis);
          }
      }

      renderYAxis () {
          if (this._leftYAxisChildren().length !== 0) {
              this.renderYAxisAt('y', this.yAxis(), this.margins().left);
              this.renderYAxisLabel('y', this.yAxisLabel(), -90);
          }

          if (this._rightYAxisChildren().length !== 0) {
              this.renderYAxisAt('yr', this.rightYAxis(), this.width() - this.margins().right);
              this.renderYAxisLabel('yr', this.rightYAxisLabel(), 90, this.width() - this._rightYAxisLabelPadding);
          }
      }

      _calculateYAxisRanges (left, right) {
          let lyAxisMin, lyAxisMax, ryAxisMin, ryAxisMax;
          let ranges;

          if (left) {
              lyAxisMin = this._yAxisMin();
              lyAxisMax = this._yAxisMax();
          }

          if (right) {
              ryAxisMin = this._rightYAxisMin();
              ryAxisMax = this._rightYAxisMax();
          }

          if (this.alignYAxes() && left && right) {
              ranges = this._alignYAxisRanges(lyAxisMin, lyAxisMax, ryAxisMin, ryAxisMax);
          }

          return ranges || {
              lyAxisMin: lyAxisMin,
              lyAxisMax: lyAxisMax,
              ryAxisMin: ryAxisMin,
              ryAxisMax: ryAxisMax
          };
      }

      _alignYAxisRanges (lyAxisMin, lyAxisMax, ryAxisMin, ryAxisMax) {
          // since the two series will share a zero, each Y is just a multiple
          // of the other. and the ratio should be the ratio of the ranges of the
          // input data, so that they come out the same height. so we just min/max

          // note: both ranges already include zero due to the stack mixin (#667)
          // if #667 changes, we can reconsider whether we want data height or
          // height from zero to be equal. and it will be possible for the axes
          // to be aligned but not visible.
          const extentRatio = (ryAxisMax - ryAxisMin) / (lyAxisMax - lyAxisMin);

          return {
              lyAxisMin: Math.min(lyAxisMin, ryAxisMin / extentRatio),
              lyAxisMax: Math.max(lyAxisMax, ryAxisMax / extentRatio),
              ryAxisMin: Math.min(ryAxisMin, lyAxisMin * extentRatio),
              ryAxisMax: Math.max(ryAxisMax, lyAxisMax * extentRatio)
          };
      }

      _prepareRightYAxis (ranges) {
          const needDomain = this.rightY() === undefined || this.elasticY(),
              needRange = needDomain || this.resizing();
          if (this.rightY() === undefined) {
              this.rightY(d3Scale.scaleLinear());
          }
          if (needDomain) {
              this.rightY().domain([ranges.ryAxisMin, ranges.ryAxisMax]);
          }
          if (needRange) {
              this.rightY().rangeRound([this.yAxisHeight(), 0]);
          }

          this.rightY().range([this.yAxisHeight(), 0]);
          this.rightYAxis(this.rightYAxis().scale(this.rightY()));

          // In D3v4 create a RightAxis
          // _chart.rightYAxis().orient('right');
      }

      _prepareLeftYAxis (ranges) {
          const needDomain = this.y() === undefined || this.elasticY(),
              needRange = needDomain || this.resizing();
          if (this.y() === undefined) {
              this.y(d3Scale.scaleLinear());
          }
          if (needDomain) {
              this.y().domain([ranges.lyAxisMin, ranges.lyAxisMax]);
          }
          if (needRange) {
              this.y().rangeRound([this.yAxisHeight(), 0]);
          }

          this.y().range([this.yAxisHeight(), 0]);
          this.yAxis(this.yAxis().scale(this.y()));

          // In D3v4 create a LeftAxis
          // _chart.yAxis().orient('left');
      }

      _generateChildG (child, i) {
          child._generateG(this.g());
          child.g().attr('class', `${SUB_CHART_CLASS} _${i}`);
      }

      plotData () {
          for (let i = 0; i < this._children.length; ++i) {
              const child = this._children[i];

              if (!child.g()) {
                  this._generateChildG(child, i);
              }

              if (this._shareColors) {
                  child.colors(this.colors());
              }

              child.x(this.x());

              child.xAxis(this.xAxis());

              if (child.useRightYAxis()) {
                  child.y(this.rightY());
                  child.yAxis(this.rightYAxis());
              } else {
                  child.y(this.y());
                  child.yAxis(this.yAxis());
              }

              child.plotData();

              child._activateRenderlets();
          }
      }

      /**
       * Get or set whether to draw gridlines from the right y axis.  Drawing from the left y axis is the
       * default behavior. This option is only respected when subcharts with both left and right y-axes
       * are present.
       * @param {Boolean} [useRightAxisGridLines=false]
       * @returns {Boolean|CompositeChart}
       */
      useRightAxisGridLines (useRightAxisGridLines) {
          if (!arguments) {
              return this._rightAxisGridLines;
          }

          this._rightAxisGridLines = useRightAxisGridLines;
          return this;
      }

      /**
       * Get or set chart-specific options for all child charts. This is equivalent to calling
       * {@link BaseMixin#options .options} on each child chart.
       * @param {Object} [childOptions]
       * @returns {Object|CompositeChart}
       */
      childOptions (childOptions) {
          if (!arguments.length) {
              return this._childOptions;
          }
          this._childOptions = childOptions;
          this._children.forEach(child => {
              child.options(this._childOptions);
          });
          return this;
      }

      fadeDeselectedArea (brushSelection) {
          if (this.brushOn()) {
              for (let i = 0; i < this._children.length; ++i) {
                  const child = this._children[i];
                  child.fadeDeselectedArea(brushSelection);
              }
          }
      }

      /**
       * Set or get the right y axis label.
       * @param {String} [rightYAxisLabel]
       * @param {Number} [padding]
       * @returns {String|CompositeChart}
       */
      rightYAxisLabel (rightYAxisLabel, padding) {
          if (!arguments.length) {
              return this._rightYAxisLabel;
          }
          this._rightYAxisLabel = rightYAxisLabel;
          this.margins().right -= this._rightYAxisLabelPadding;
          this._rightYAxisLabelPadding = (padding === undefined) ? DEFAULT_RIGHT_Y_AXIS_LABEL_PADDING : padding;
          this.margins().right += this._rightYAxisLabelPadding;
          return this;
      }

      /**
       * Combine the given charts into one single composite coordinate grid chart.
       * @example
       * moveChart.compose([
       *     // when creating sub-chart you need to pass in the parent chart
       *     new LineChart(moveChart)
       *         .group(indexAvgByMonthGroup) // if group is missing then parent's group will be used
       *         .valueAccessor(function (d){return d.value.avg;})
       *         // most of the normal functions will continue to work in a composed chart
       *         .renderArea(true)
       *         .stack(monthlyMoveGroup, function (d){return d.value;})
       *         .title(function (d){
       *             var value = d.value.avg?d.value.avg:d.value;
       *             if(isNaN(value)) value = 0;
       *             return dateFormat(d.key) + '\n' + numberFormat(value);
       *         }),
       *     new BarChart(moveChart)
       *         .group(volumeByMonthGroup)
       *         .centerBar(true)
       * ]);
       * @param {Array<Chart>} [subChartArray]
       * @returns {CompositeChart}
       */
      compose (subChartArray) {
          this._children = subChartArray;
          this._children.forEach(child => {
              child.height(this.height());
              child.width(this.width());
              child.margins(this.margins());

              if (this._shareTitle) {
                  child.title(this.title());
              }

              child.options(this._childOptions);
          });
          this.rescale();
          return this;
      }

      _setChildrenProperty (prop, value) {
          this._children.forEach(child => {
              child[prop](value);
          });
      }

      // properties passed through in compose()
      height (height) {
          if(!arguments.length) {
              return super.height();
          }
          super.height(height);
          this._setChildrenProperty('height', height);
          return this;
      }

      width (width) {
          if(!arguments.length) {
              return super.width();
          }
          super.width(width);
          this._setChildrenProperty('width', width);
          return this;
      }

      margins (margins) {
          if(!arguments.length) {
              return super.margins();
          }
          super.margins(margins);
          this._setChildrenProperty('margins', margins);
          return this;
      }

      /**
       * Returns the child charts which are composed into the composite chart.
       * @returns {Array<BaseMixin>}
       */
      children () {
          return this._children;
      }

      /**
       * Get or set color sharing for the chart. If set, the {@link ColorMixin#colors .colors()} value from this chart
       * will be shared with composed children. Additionally if the child chart implements
       * Stackable and has not set a custom .colorAccessor, then it will generate a color
       * specific to its order in the composition.
       * @param {Boolean} [shareColors=false]
       * @returns {Boolean|CompositeChart}
       */
      shareColors (shareColors) {
          if (!arguments.length) {
              return this._shareColors;
          }
          this._shareColors = shareColors;
          return this;
      }

      /**
       * Get or set title sharing for the chart. If set, the {@link BaseMixin#title .title()} value from
       * this chart will be shared with composed children.
       *
       * Note: currently you must call this before `compose` or the child will still get the parent's
       * `title` function!
       * @param {Boolean} [shareTitle=true]
       * @returns {Boolean|CompositeChart}
       */
      shareTitle (shareTitle) {
          if (!arguments.length) {
              return this._shareTitle;
          }
          this._shareTitle = shareTitle;
          return this;
      }

      /**
       * Get or set the y scale for the right axis. The right y scale is typically automatically
       * generated by the chart implementation.
       * @see {@link https://github.com/d3/d3-scale/blob/master/README.md d3.scale}
       * @param {d3.scale} [yScale]
       * @returns {d3.scale|CompositeChart}
       */
      rightY (yScale) {
          if (!arguments.length) {
              return this._rightY;
          }
          this._rightY = yScale;
          this.rescale();
          return this;
      }

      /**
       * Get or set alignment between left and right y axes. A line connecting '0' on both y axis
       * will be parallel to x axis. This only has effect when {@link CoordinateGridMixin#elasticY elasticY} is true.
       * @param {Boolean} [alignYAxes=false]
       * @returns {Chart}
       */
      alignYAxes (alignYAxes) {
          if (!arguments.length) {
              return this._alignYAxes;
          }
          this._alignYAxes = alignYAxes;
          this.rescale();
          return this;
      }

      _leftYAxisChildren () {
          return this._children.filter(child => !child.useRightYAxis());
      }

      _rightYAxisChildren () {
          return this._children.filter(child => child.useRightYAxis());
      }

      _getYAxisMin (charts) {
          return charts.map(c => c.yAxisMin());
      }

      _yAxisMin () {
          return d3Array.min(this._getYAxisMin(this._leftYAxisChildren()));
      }

      _rightYAxisMin () {
          return d3Array.min(this._getYAxisMin(this._rightYAxisChildren()));
      }

      _getYAxisMax (charts) {
          return charts.map(c => c.yAxisMax());
      }

      _yAxisMax () {
          return utils.add(d3Array.max(this._getYAxisMax(this._leftYAxisChildren())), this.yAxisPadding());
      }

      _rightYAxisMax () {
          return utils.add(d3Array.max(this._getYAxisMax(this._rightYAxisChildren())), this.yAxisPadding());
      }

      _getAllXAxisMinFromChildCharts () {
          return this._children.map(c => c.xAxisMin());
      }

      xAxisMin () {
          return utils.subtract(d3Array.min(this._getAllXAxisMinFromChildCharts()), this.xAxisPadding(), this.xAxisPaddingUnit());
      }

      _getAllXAxisMaxFromChildCharts () {
          return this._children.map(c => c.xAxisMax());
      }

      xAxisMax () {
          return utils.add(d3Array.max(this._getAllXAxisMaxFromChildCharts()), this.xAxisPadding(), this.xAxisPaddingUnit());
      }

      legendables () {
          return this._children.reduce((items, child) => {
              if (this._shareColors) {
                  child.colors(this.colors());
              }
              items.push.apply(items, child.legendables());
              return items;
          }, []);
      }

      legendHighlight (d) {
          for (let j = 0; j < this._children.length; ++j) {
              const child = this._children[j];
              child.legendHighlight(d);
          }
      }

      legendReset (d) {
          for (let j = 0; j < this._children.length; ++j) {
              const child = this._children[j];
              child.legendReset(d);
          }
      }

      legendToggle () {
          console.log('composite should not be getting legendToggle itself');
      }

      /**
       * Set or get the right y axis used by the composite chart. This function is most useful when y
       * axis customization is required. The y axis in dc.js is an instance of a
       * [d3.axisRight](https://github.com/d3/d3-axis/blob/master/README.md#axisRight) therefore it supports any valid
       * d3 axis manipulation.
       *
       * **Caution**: The right y axis is usually generated internally by dc; resetting it may cause
       * unexpected results.  Note also that when used as a getter, this function is not chainable: it
       * returns the axis, not the chart,
       * {@link https://github.com/dc-js/dc.js/wiki/FAQ#why-does-everything-break-after-a-call-to-xaxis-or-yaxis
       * so attempting to call chart functions after calling `.yAxis()` will fail}.
       * @see {@link https://github.com/d3/d3-axis/blob/master/README.md#axisRight}
       * @example
       * // customize y axis tick format
       * chart.rightYAxis().tickFormat(function (v) {return v + '%';});
       * // customize y axis tick values
       * chart.rightYAxis().tickValues([0, 100, 200, 300]);
       * @param {d3.axisRight} [rightYAxis]
       * @returns {d3.axisRight|CompositeChart}
       */
      rightYAxis (rightYAxis) {
          if (!arguments.length) {
              return this._rightYAxis;
          }
          this._rightYAxis = rightYAxis;
          return this;
      }

      yAxisMin () {
          throw new Error('Not supported for this chart type');
      }

      yAxisMax () {
          throw new Error('Not supported for this chart type');
      }
  }

  const compositeChart = (parent, chartGroup) => new CompositeChart(parent, chartGroup);

  /**
   * The data count widget is a simple widget designed to display the number of records selected by the
   * current filters out of the total number of records in the data set. Once created the data count widget
   * will automatically update the text content of child elements with the following classes:
   *
   * * `.total-count` - total number of records
   * * `.filter-count` - number of records matched by the current filters
   *
   * Note: this widget works best for the specific case of showing the number of records out of a
   * total. If you want a more general-purpose numeric display, please use the
   * {@link NumberDisplay} widget instead.
   *
   * Examples:
   * - {@link http://dc-js.github.com/dc.js/ Nasdaq 100 Index}
   * @mixes BaseMixin
   */
  class DataCount extends BaseMixin {
      /**
       * Create a Data Count widget.
       * @example
       * var ndx = crossfilter(data);
       * var all = ndx.groupAll();
       *
       * new DataCount('.dc-data-count')
       *     .crossfilter(ndx)
       *     .groupAll(all);
       * @param {String|node|d3.selection} parent - Any valid
       * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
       * a dom block element such as a div; or a dom element or d3 selection.
       * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
       * Interaction with a chart will only trigger events and redraws within the chart's group.
       */
      constructor (parent, chartGroup) {
          super();

          this._formatNumber = d3Format.format(',d');
          this._crossfilter = null;
          this._groupAll = null;
          this._html = {some: '', all: ''};

          this._mandatoryAttributes(['crossfilter', 'groupAll']);

          this.anchor(parent, chartGroup);
      }

      /**
       * Gets or sets an optional object specifying HTML templates to use depending how many items are
       * selected. The text `%total-count` will replaced with the total number of records, and the text
       * `%filter-count` will be replaced with the number of selected records.
       * - all: HTML template to use if all items are selected
       * - some: HTML template to use if not all items are selected
       * @example
       * counter.html({
       *      some: '%filter-count out of %total-count records selected',
       *      all: 'All records selected. Click on charts to apply filters'
       * })
       * @param {{some:String, all: String}} [options]
       * @returns {{some:String, all: String}|DataCount}
       */
      html (options) {
          if (!arguments.length) {
              return this._html;
          }
          if (options.all) {
              this._html.all = options.all;
          }
          if (options.some) {
              this._html.some = options.some;
          }
          return this;
      }

      /**
       * Gets or sets an optional function to format the filter count and total count.
       * @see {@link https://github.com/d3/d3-format/blob/master/README.md#format d3.format}
       * @example
       * counter.formatNumber(d3.format('.2g'))
       * @param {Function} [formatter=d3.format('.2g')]
       * @returns {Function|DataCount}
       */
      formatNumber (formatter) {
          if (!arguments.length) {
              return this._formatNumber;
          }
          this._formatNumber = formatter;
          return this;
      }

      _doRender () {
          const tot = this.crossfilter().size(),
              val = this.groupAll().value();
          const all = this._formatNumber(tot);
          const selected = this._formatNumber(val);

          if ((tot === val) && (this._html.all !== '')) {
              this.root().html(this._html.all.replace('%total-count', all).replace('%filter-count', selected));
          } else if (this._html.some !== '') {
              this.root().html(this._html.some.replace('%total-count', all).replace('%filter-count', selected));
          } else {
              this.selectAll('.total-count').text(all);
              this.selectAll('.filter-count').text(selected);
          }
          return this;
      }

      _doRedraw () {
          return this._doRender();
      }

      crossfilter (cf) {
          if (!arguments.length) {
              return this._crossfilter;
          }
          this._crossfilter = cf;
          return this;
      }

      dimension (cf) {
          logger.warnOnce('consider using dataCount.crossfilter instead of dataCount.dimension for clarity');
          if (!arguments.length) {
              return this.crossfilter();
          }
          return this.crossfilter(cf);
      }

      groupAll (groupAll) {
          if (!arguments.length) {
              return this._groupAll;
          }
          this._groupAll = groupAll;
          return this;
      }

      group (groupAll) {
          logger.warnOnce('consider using dataCount.groupAll instead of dataCount.group for clarity');
          if (!arguments.length) {
              return this.groupAll();
          }
          return this.groupAll(groupAll);
      }
  }

  const dataCount = (parent, chartGroup) => new DataCount(parent, chartGroup);

  const LABEL_CSS_CLASS = 'dc-grid-label';
  const ITEM_CSS_CLASS$1 = 'dc-grid-item';
  const SECTION_CSS_CLASS = 'dc-grid-section dc-grid-group';
  const GRID_CSS_CLASS = 'dc-grid-top';

  /**
   * Data grid is a simple widget designed to list the filtered records, providing
   * a simple way to define how the items are displayed.
   *
   * Note: Formerly the data grid chart (and data table) used the {@link DataGrid#group group} attribute as a
   * keying function for {@link https://github.com/d3/d3-collection/blob/master/README.md#nest nesting} the data
   * together in sections.  This was confusing so it has been renamed to `section`, although `group` still works.
   *
   * Examples:
   * - {@link https://dc-js.github.io/dc.js/ep/ List of members of the european parliament}
   * @mixes BaseMixin
   */
  class DataGrid extends BaseMixin {
      /**
       * Create a Data Grid.
       * @param {String|node|d3.selection} parent - Any valid
       * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
       * a dom block element such as a div; or a dom element or d3 selection.
       * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
       * Interaction with a chart will only trigger events and redraws within the chart's group.
       */
      constructor (parent, chartGroup) {
          super();

          this._section = null;
          this._size = 999; // shouldn't be needed, but you might
          this._html = function (d) {
              return `you need to provide an html() handling param:  ${JSON.stringify(d)}`;
          };
          this._sortBy = function (d) {
              return d;
          };
          this._order = d3Array.ascending;
          this._beginSlice = 0;
          this._endSlice = undefined;

          this._htmlSection = d => `<div class='${SECTION_CSS_CLASS}'><h1 class='${LABEL_CSS_CLASS}'>${ 
            this.keyAccessor()(d)}</h1></div>`;

          this._mandatoryAttributes(['dimension', 'section']);

          this.anchor(parent, chartGroup);
      }

      _doRender () {
          this.selectAll(`div.${GRID_CSS_CLASS}`).remove();

          this._renderItems(this._renderSections());

          return this;
      }

      _renderSections () {
          const sections = this.root().selectAll(`div.${GRID_CSS_CLASS}`)
              .data(this._nestEntries(), d => this.keyAccessor()(d));

          const itemSection = sections
              .enter()
              .append('div')
              .attr('class', GRID_CSS_CLASS);

          if (this._htmlSection) {
              itemSection
                  .html(d => this._htmlSection(d));
          }

          sections.exit().remove();
          return itemSection;
      }

      _nestEntries () {
          let entries = this.dimension().top(this._size);

          entries = entries
              .sort((a, b) => this._order(this._sortBy(a), this._sortBy(b)))
              .slice(this._beginSlice, this._endSlice);

          return d3compat.nester({
              key: this.section(),
              sortKeys: this._order,
              entries
          });
      }

      _renderItems (sections) {
          let items = sections.order()
              .selectAll(`div.${ITEM_CSS_CLASS$1}`)
              .data(d => d.values);

          items.exit().remove();

          items = items
              .enter()
              .append('div')
              .attr('class', ITEM_CSS_CLASS$1)
              .html(d => this._html(d))
              .merge(items);

          return items;
      }

      _doRedraw () {
          return this._doRender();
      }

      /**
       * Get or set the section function for the data grid. The section function takes a data row and
       * returns the key to specify to {@link https://github.com/d3/d3-collection/blob/master/README.md#nest d3.nest}
       * to split rows into sections.
       *
       * Do not pass in a crossfilter section as this will not work.
       * @example
       * // section rows by the value of their field
       * chart
       *     .section(function(d) { return d.field; })
       * @param {Function} section Function taking a row of data and returning the nest key.
       * @returns {Function|DataGrid}
       */
      section (section) {
          if (!arguments.length) {
              return this._section;
          }
          this._section = section;
          return this;
      }

      /**
       * Backward-compatible synonym for {@link DataGrid#section section}.
       *
       * @param {Function} section Function taking a row of data and returning the nest key.
       * @returns {Function|DataGrid}
       */
      group (section) {
          logger.warnOnce('consider using dataGrid.section instead of dataGrid.group for clarity');
          if (!arguments.length) {
              return this.section();
          }
          return this.section(section);
      }

      /**
       * Get or set the index of the beginning slice which determines which entries get displayed by the widget.
       * Useful when implementing pagination.
       * @param {Number} [beginSlice=0]
       * @returns {Number|DataGrid}
       */
      beginSlice (beginSlice) {
          if (!arguments.length) {
              return this._beginSlice;
          }
          this._beginSlice = beginSlice;
          return this;
      }

      /**
       * Get or set the index of the end slice which determines which entries get displayed by the widget.
       * Useful when implementing pagination.
       * @param {Number} [endSlice]
       * @returns {Number|DataGrid}
       */
      endSlice (endSlice) {
          if (!arguments.length) {
              return this._endSlice;
          }
          this._endSlice = endSlice;
          return this;
      }

      /**
       * Get or set the grid size which determines the number of items displayed by the widget.
       * @param {Number} [size=999]
       * @returns {Number|DataGrid}
       */
      size (size) {
          if (!arguments.length) {
              return this._size;
          }
          this._size = size;
          return this;
      }

      /**
       * Get or set the function that formats an item. The data grid widget uses a
       * function to generate dynamic html. Use your favourite templating engine or
       * generate the string directly.
       * @example
       * chart.html(function (d) { return '<div class='item '+data.exampleCategory+''>'+data.exampleString+'</div>';});
       * @param {Function} [html]
       * @returns {Function|DataGrid}
       */
      html (html) {
          if (!arguments.length) {
              return this._html;
          }
          this._html = html;
          return this;
      }

      /**
       * Get or set the function that formats a section label.
       * @example
       * chart.htmlSection (function (d) { return '<h2>'.d.key . 'with ' . d.values.length .' items</h2>'});
       * @param {Function} [htmlSection]
       * @returns {Function|DataGrid}
       */
      htmlSection (htmlSection) {
          if (!arguments.length) {
              return this._htmlSection;
          }
          this._htmlSection = htmlSection;
          return this;
      }

      /**
       * Backward-compatible synonym for {@link DataGrid#htmlSection htmlSection}.
       * @param {Function} [htmlSection]
       * @returns {Function|DataGrid}
       */
      htmlGroup (htmlSection) {
          logger.warnOnce('consider using dataGrid.htmlSection instead of dataGrid.htmlGroup for clarity');
          if (!arguments.length) {
              return this.htmlSection();
          }
          return this.htmlSection(htmlSection);
      }

      /**
       * Get or set sort-by function. This function works as a value accessor at the item
       * level and returns a particular field to be sorted.
       * @example
       * chart.sortBy(function(d) {
       *     return d.date;
       * });
       * @param {Function} [sortByFunction]
       * @returns {Function|DataGrid}
       */
      sortBy (sortByFunction) {
          if (!arguments.length) {
              return this._sortBy;
          }
          this._sortBy = sortByFunction;
          return this;
      }

      /**
       * Get or set sort the order function.
       * @see {@link https://github.com/d3/d3-array/blob/master/README.md#ascending d3.ascending}
       * @see {@link https://github.com/d3/d3-array/blob/master/README.md#descending d3.descending}
       * @example
       * chart.order(d3.descending);
       * @param {Function} [order=d3.ascending]
       * @returns {Function|DataGrid}
       */
      order (order) {
          if (!arguments.length) {
              return this._order;
          }
          this._order = order;
          return this;
      }
  }

  const dataGrid = (parent, chartGroup) => new DataGrid(parent, chartGroup);

  const LABEL_CSS_CLASS$1 = 'dc-table-label';
  const ROW_CSS_CLASS = 'dc-table-row';
  const COLUMN_CSS_CLASS = 'dc-table-column';
  const SECTION_CSS_CLASS$1 = 'dc-table-section dc-table-group';
  const HEAD_CSS_CLASS = 'dc-table-head';

  /**
   * The data table is a simple widget designed to list crossfilter focused data set (rows being
   * filtered) in a good old tabular fashion.
   *
   * An interesting feature of the data table is that you can pass a crossfilter group to the
   * `dimension`, if you want to show aggregated data instead of raw data rows. This requires no
   * special code as long as you specify the {@link DataTable#order order} as `d3.descending`,
   * since the data table will use `dimension.top()` to fetch the data in that case, and the method is
   * equally supported on the crossfilter group as the crossfilter dimension.
   *
   * If you want to display aggregated data in ascending order, you will need to wrap the group
   * in a [fake dimension](https://github.com/dc-js/dc.js/wiki/FAQ#fake-dimensions) to support the
   * `.bottom()` method. See the example linked below for more details.
   *
   * Note: Formerly the data table (and data grid chart) used the {@link DataTable#group group} attribute as a
   * keying function for {@link https://github.com/d3/d3-collection/blob/master/README.md#nest nesting} the data
   * together in sections.  This was confusing so it has been renamed to `section`, although `group` still works.
   * Examples:
   * - {@link http://dc-js.github.com/dc.js/ Nasdaq 100 Index}
   * - {@link http://dc-js.github.io/dc.js/examples/table-on-aggregated-data.html dataTable on a crossfilter group}
   * ({@link https://github.com/dc-js/dc.js/blob/master/web-src/examples/table-on-aggregated-data.html source})
   *
   * @mixes BaseMixin
   */
  class DataTable extends BaseMixin {
      /**
       * Create a Data Table.
       *
       * @param {String|node|d3.selection} parent - Any valid
       * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
       * a dom block element such as a div; or a dom element or d3 selection.
       * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
       * Interaction with a chart will only trigger events and redraws within the chart's group.
       */
      constructor (parent, chartGroup) {
          super();

          this._size = 25;
          this._columns = [];
          this._sortBy = d => d;
          this._order = d3Array.ascending;
          this._beginSlice = 0;
          this._endSlice = undefined;
          this._showSections = true;
          this._section = () => ''; // all in one section

          this._mandatoryAttributes(['dimension']);

          this.anchor(parent, chartGroup);
      }

      _doRender () {
          this.selectAll('tbody').remove();

          this._renderRows(this._renderSections());

          return this;
      }

      _doColumnValueFormat (v, d) {
          return (typeof v === 'function') ? v(d) :  // v as function
              (typeof v === 'string') ? d[v] :       // v is field name string
              v.format(d);                           // v is Object, use fn (element 2)
      }

      _doColumnHeaderFormat (d) {
          // if 'function', convert to string representation
          // show a string capitalized
          // if an object then display its label string as-is.
          return (typeof d === 'function') ? this._doColumnHeaderFnToString(d) :
              (typeof d === 'string') ? this._doColumnHeaderCapitalize(d) :
              String(d.label);
      }

      _doColumnHeaderCapitalize (s) {
          // capitalize
          return s.charAt(0).toUpperCase() + s.slice(1);
      }

      _doColumnHeaderFnToString (f) {
          // columnString(f) {
          let s = String(f);
          const i1 = s.indexOf('return ');
          if (i1 >= 0) {
              const i2 = s.lastIndexOf(';');
              if (i2 >= 0) {
                  s = s.substring(i1 + 7, i2);
                  const i3 = s.indexOf('numberFormat');
                  if (i3 >= 0) {
                      s = s.replace('numberFormat', '');
                  }
              }
          }
          return s;
      }

      _renderSections () {
          // The 'original' example uses all 'functions'.
          // If all 'functions' are used, then don't remove/add a header, and leave
          // the html alone. This preserves the functionality of earlier releases.
          // A 2nd option is a string representing a field in the data.
          // A third option is to supply an Object such as an array of 'information', and
          // supply your own _doColumnHeaderFormat and _doColumnValueFormat functions to
          // create what you need.
          let bAllFunctions = true;
          this._columns.forEach(f => {
              bAllFunctions = bAllFunctions & (typeof f === 'function');
          });

          if (!bAllFunctions) {
              // ensure one thead
              let thead = this.selectAll('thead').data([0]);
              thead.exit().remove();
              thead = thead.enter()
                  .append('thead')
                  .merge(thead);

              // with one tr
              let headrow = thead.selectAll('tr').data([0]);
              headrow.exit().remove();
              headrow = headrow.enter()
                  .append('tr')
                  .merge(headrow);

              // with a th for each column
              const headcols = headrow.selectAll('th')
                  .data(this._columns);
              headcols.exit().remove();
              headcols.enter().append('th')
                  .merge(headcols)
                  .attr('class', HEAD_CSS_CLASS)
                  .html(d => (this._doColumnHeaderFormat(d)));
          }

          const sections = this.root().selectAll('tbody')
              .data(this._nestEntries(), d => this.keyAccessor()(d));

          const rowSection = sections
              .enter()
              .append('tbody');

          if (this._showSections === true) {
              rowSection
                  .append('tr')
                  .attr('class', SECTION_CSS_CLASS$1)
                  .append('td')
                  .attr('class', LABEL_CSS_CLASS$1)
                  .attr('colspan', this._columns.length)
                  .html(d => this.keyAccessor()(d));
          }

          sections.exit().remove();

          return rowSection;
      }

      _nestEntries () {
          let entries;
          if (this._order === d3Array.ascending) {
              entries = this.dimension().bottom(this._size);
          } else {
              entries = this.dimension().top(this._size);
          }

          entries = entries.sort((a, b) => this._order(this._sortBy(a), this._sortBy(b))).slice(this._beginSlice, this._endSlice);

          return d3compat.nester({
              key: this.section(),
              sortKeys: this._order,
              entries
          });
      }

      _renderRows (sections) {
          const rows = sections.order()
              .selectAll(`tr.${ROW_CSS_CLASS}`)
              .data(d => d.values);

          const rowEnter = rows.enter()
              .append('tr')
              .attr('class', ROW_CSS_CLASS);

          this._columns.forEach((v, i) => {
              rowEnter.append('td')
                  .attr('class', `${COLUMN_CSS_CLASS} _${i}`)
                  .html(d => this._doColumnValueFormat(v, d));
          });

          rows.exit().remove();

          return rows;
      }

      _doRedraw () {
          return this._doRender();
      }

      /**
       * Get or set the section function for the data table. The section function takes a data row and
       * returns the key to specify to {@link https://github.com/d3/d3-collection/blob/master/README.md#nest d3.nest}
       * to split rows into sections. By default there will be only one section with no name.
       *
       * Set {@link DataTable#showSections showSections} to false to hide the section headers
       *
       * @example
       * // section rows by the value of their field
       * chart
       *     .section(function(d) { return d.field; })
       * @param {Function} section Function taking a row of data and returning the nest key.
       * @returns {Function|DataTable}
       */
      section (section) {
          if (!arguments.length) {
              return this._section;
          }
          this._section = section;
          return this;
      }

      /**
       * Backward-compatible synonym for {@link DataTable#section section}.
       *
       * @param {Function} section Function taking a row of data and returning the nest key.
       * @returns {Function|DataTable}
       */
      group (section) {
          logger.warnOnce('consider using dataTable.section instead of dataTable.group for clarity');
          if (!arguments.length) {
              return this.section();
          }
          return this.section(section);
      }

      /**
       * Get or set the table size which determines the number of rows displayed by the widget.
       * @param {Number} [size=25]
       * @returns {Number|DataTable}
       */
      size (size) {
          if (!arguments.length) {
              return this._size;
          }
          this._size = size;
          return this;
      }

      /**
       * Get or set the index of the beginning slice which determines which entries get displayed
       * by the widget. Useful when implementing pagination.
       *
       * Note: the sortBy function will determine how the rows are ordered for pagination purposes.

       * See the {@link http://dc-js.github.io/dc.js/examples/table-pagination.html table pagination example}
       * to see how to implement the pagination user interface using `beginSlice` and `endSlice`.
       * @param {Number} [beginSlice=0]
       * @returns {Number|DataTable}
       */
      beginSlice (beginSlice) {
          if (!arguments.length) {
              return this._beginSlice;
          }
          this._beginSlice = beginSlice;
          return this;
      }

      /**
       * Get or set the index of the end slice which determines which entries get displayed by the
       * widget. Useful when implementing pagination. See {@link DataTable#beginSlice `beginSlice`} for more information.
       * @param {Number|undefined} [endSlice=undefined]
       * @returns {Number|DataTable}
       */
      endSlice (endSlice) {
          if (!arguments.length) {
              return this._endSlice;
          }
          this._endSlice = endSlice;
          return this;
      }

      /**
       * Get or set column functions. The data table widget supports several methods of specifying the
       * columns to display.
       *
       * The original method uses an array of functions to generate dynamic columns. Column functions
       * are simple javascript functions with only one input argument `d` which represents a row in
       * the data set. The return value of these functions will be used to generate the content for
       * each cell. However, this method requires the HTML for the table to have a fixed set of column
       * headers.
       *
       * <pre><code>chart.columns([
       *     function(d) { return d.date; },
       *     function(d) { return d.open; },
       *     function(d) { return d.close; },
       *     function(d) { return numberFormat(d.close - d.open); },
       *     function(d) { return d.volume; }
       * ]);
       * </code></pre>
       *
       * In the second method, you can list the columns to read from the data without specifying it as
       * a function, except where necessary (ie, computed columns).  Note the data element name is
       * capitalized when displayed in the table header. You can also mix in functions as necessary,
       * using the third `{label, format}` form, as shown below.
       *
       * <pre><code>chart.columns([
       *     "date",    // d["date"], ie, a field accessor; capitalized automatically
       *     "open",    // ...
       *     "close",   // ...
       *     {
       *         label: "Change",
       *         format: function (d) {
       *             return numberFormat(d.close - d.open);
       *         }
       *     },
       *     "volume"   // d["volume"], ie, a field accessor; capitalized automatically
       * ]);
       * </code></pre>
       *
       * In the third example, we specify all fields using the `{label, format}` method:
       * <pre><code>chart.columns([
       *     {
       *         label: "Date",
       *         format: function (d) { return d.date; }
       *     },
       *     {
       *         label: "Open",
       *         format: function (d) { return numberFormat(d.open); }
       *     },
       *     {
       *         label: "Close",
       *         format: function (d) { return numberFormat(d.close); }
       *     },
       *     {
       *         label: "Change",
       *         format: function (d) { return numberFormat(d.close - d.open); }
       *     },
       *     {
       *         label: "Volume",
       *         format: function (d) { return d.volume; }
       *     }
       * ]);
       * </code></pre>
       *
       * You may wish to override the dataTable functions `_doColumnHeaderCapitalize` and
       * `_doColumnHeaderFnToString`, which are used internally to translate the column information or
       * function into a displayed header. The first one is used on the "string" column specifier; the
       * second is used to transform a stringified function into something displayable. For the Stock
       * example, the function for Change becomes the table header **d.close - d.open**.
       *
       * Finally, you can even specify a completely different form of column definition. To do this,
       * override `_chart._doColumnHeaderFormat` and `_chart._doColumnValueFormat` Be aware that
       * fields without numberFormat specification will be displayed just as they are stored in the
       * data, unformatted.
       * @param {Array<Function>} [columns=[]]
       * @returns {Array<Function>}|DataTable}
       */
      columns (columns) {
          if (!arguments.length) {
              return this._columns;
          }
          this._columns = columns;
          return this;
      }

      /**
       * Get or set sort-by function. This function works as a value accessor at row level and returns a
       * particular field to be sorted by.
       * @example
       * chart.sortBy(function(d) {
       *     return d.date;
       * });
       * @param {Function} [sortBy=identity function]
       * @returns {Function|DataTable}
       */
      sortBy (sortBy) {
          if (!arguments.length) {
              return this._sortBy;
          }
          this._sortBy = sortBy;
          return this;
      }

      /**
       * Get or set sort order. If the order is `d3.ascending`, the data table will use
       * `dimension().bottom()` to fetch the data; otherwise it will use `dimension().top()`
       * @see {@link https://github.com/d3/d3-array/blob/master/README.md#ascending d3.ascending}
       * @see {@link https://github.com/d3/d3-array/blob/master/README.md#descending d3.descending}
       * @example
       * chart.order(d3.descending);
       * @param {Function} [order=d3.ascending]
       * @returns {Function|DataTable}
       */
      order (order) {
          if (!arguments.length) {
              return this._order;
          }
          this._order = order;
          return this;
      }

      /**
       * Get or set if section header rows will be shown.
       * @example
       * chart
       *     .section([value], [name])
       *     .showSections(true|false);
       * @param {Boolean} [showSections=true]
       * @returns {Boolean|DataTable}
       */
      showSections (showSections) {
          if (!arguments.length) {
              return this._showSections;
          }
          this._showSections = showSections;
          return this;
      }

      /**
       * Backward-compatible synonym for {@link DataTable#showSections showSections}.
       * @param {Boolean} [showSections=true]
       * @returns {Boolean|DataTable}
       */
      showGroups (showSections) {
          logger.warnOnce('consider using dataTable.showSections instead of dataTable.showGroups for clarity');
          if (!arguments.length) {
              return this.showSections();
          }
          return this.showSections(showSections);
      }
  }

  const dataTable = (parent, chartGroup) => new DataTable(parent, chartGroup);

  /**
   * The geo choropleth chart is designed as an easy way to create a crossfilter driven choropleth map
   * from GeoJson data. This chart implementation was inspired by
   * {@link http://bl.ocks.org/4060606 the great d3 choropleth example}.
   *
   * Examples:
   * - {@link http://dc-js.github.com/dc.js/vc/index.html US Venture Capital Landscape 2011}
   * @mixes ColorMixin
   * @mixes BaseMixin
   */
  class GeoChoroplethChart extends ColorMixin(BaseMixin) {
      /**
       * Create a Geo Choropleth Chart.
       * @example
       * // create a choropleth chart under '#us-chart' element using the default global chart group
       * var chart1 = new GeoChoroplethChart('#us-chart');
       * // create a choropleth chart under '#us-chart2' element using chart group A
       * var chart2 = new CompositeChart('#us-chart2', 'chartGroupA');
       * @param {String|node|d3.selection} parent - Any valid
       * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
       * a dom block element such as a div; or a dom element or d3 selection.
       * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
       * Interaction with a chart will only trigger events and redraws within the chart's group.
       */
      constructor (parent, chartGroup) {
          super();

          this.colorAccessor(d => d || 0);

          this._geoPath = d3Geo.geoPath();
          this._projectionFlag = undefined;
          this._projection = undefined;

          this._geoJsons = [];

          this.anchor(parent, chartGroup);
      }

      _doRender () {
          this.resetSvg();
          for (let layerIndex = 0; layerIndex < this._geoJsons.length; ++layerIndex) {
              const states = this.svg().append('g')
                  .attr('class', `layer${layerIndex}`);

              let regionG = states.selectAll(`g.${this._geoJson(layerIndex).name}`)
                  .data(this._geoJson(layerIndex).data);

              regionG = regionG.enter()
                  .append('g')
                  .attr('class', this._geoJson(layerIndex).name)
                  .merge(regionG);

              regionG
                  .append('path')
                  .classed('dc-tabbable', this._keyboardAccessible)
                  .attr('fill', 'white')
                  .attr('d', this._getGeoPath());

              regionG.append('title');

              this._plotData(layerIndex);
          }
          this._projectionFlag = false;
      }

      _plotData (layerIndex) {
          const data = this._generateLayeredData();

          if (this._isDataLayer(layerIndex)) {
              const regionG = this._renderRegionG(layerIndex);

              this._renderPaths(regionG, layerIndex, data);

              this._renderTitles(regionG, layerIndex, data);
          }
      }

      _generateLayeredData () {
          const data = {};
          const groupAll = this.data();
          for (let i = 0; i < groupAll.length; ++i) {
              data[this.keyAccessor()(groupAll[i])] = this.valueAccessor()(groupAll[i]);
          }
          return data;
      }

      _isDataLayer (layerIndex) {
          return this._geoJson(layerIndex).keyAccessor;
      }

      _renderRegionG (layerIndex) {
          const regionG = this.svg()
              .selectAll(this._layerSelector(layerIndex))
              .classed('selected', d => this._isSelected(layerIndex, d))
              .classed('deselected', d => this._isDeselected(layerIndex, d))
              .attr('class', d => {
                  const layerNameClass = this._geoJson(layerIndex).name;
                  const regionClass = utils.nameToId(this._geoJson(layerIndex).keyAccessor(d));
                  let baseClasses = `${layerNameClass} ${regionClass}`;
                  if (this._isSelected(layerIndex, d)) {
                      baseClasses += ' selected';
                  }
                  if (this._isDeselected(layerIndex, d)) {
                      baseClasses += ' deselected';
                  }
                  return baseClasses;
              });
          return regionG;
      }

      _layerSelector (layerIndex) {
          return `g.layer${layerIndex} g.${this._geoJson(layerIndex).name}`;
      }

      _isSelected (layerIndex, d) {
          return this.hasFilter() && this.hasFilter(this._getKey(layerIndex, d));
      }

      _isDeselected (layerIndex, d) {
          return this.hasFilter() && !this.hasFilter(this._getKey(layerIndex, d));
      }

      _getKey (layerIndex, d) {
          return this._geoJson(layerIndex).keyAccessor(d);
      }

      _geoJson (index) {
          return this._geoJsons[index];
      }

      _renderPaths (regionG, layerIndex, data) {
          const paths = regionG
              .select('path')
              .attr('fill', function () {
                  const currentFill = d3Selection.select(this).attr('fill');
                  if (currentFill) {
                      return currentFill;
                  }
                  return 'none';
              })
              .on('click', d3compat.eventHandler(d => this.onClick(d, layerIndex)));

          if (this._keyboardAccessible) {
              this._makeKeyboardAccessible(this.onClick, layerIndex);
          }

          transition(paths, this.transitionDuration(),
                     this.transitionDelay()).attr('fill', (d, i) => this.getColor(data[this._geoJson(layerIndex).keyAccessor(d)], i));
      }

      onClick (d, layerIndex) {
          const selectedRegion = this._geoJson(layerIndex).keyAccessor(d);
          events.trigger(() => {
              this.filter(selectedRegion);
              this.redrawGroup();
          });
      }

      _renderTitles (regionG, layerIndex, data) {
          if (this.renderTitle()) {
              regionG.selectAll('title').text(d => {
                  const key = this._getKey(layerIndex, d);
                  const value = data[key];
                  return this.title()({key: key, value: value});
              });
          }
      }

      _doRedraw () {
          for (let layerIndex = 0; layerIndex < this._geoJsons.length; ++layerIndex) {
              this._plotData(layerIndex);
              if (this._projectionFlag) {
                  this.svg().selectAll(`g.${this._geoJson(layerIndex).name} path`).attr('d', this._getGeoPath());
              }
          }
          this._projectionFlag = false;
      }

      /**
       * **mandatory**
       *
       * Use this function to insert a new GeoJson map layer. This function can be invoked multiple times
       * if you have multiple GeoJson data layers to render on top of each other. If you overlay multiple
       * layers with the same name the new overlay will override the existing one.
       * @see {@link http://geojson.org/ GeoJSON}
       * @see {@link https://github.com/topojson/topojson/wiki TopoJSON}
       * @see {@link https://github.com/topojson/topojson-1.x-api-reference/blob/master/API-Reference.md#wiki-feature topojson.feature}
       * @example
       * // insert a layer for rendering US states
       * chart.overlayGeoJson(statesJson.features, 'state', function(d) {
       *      return d.properties.name;
       * });
       * @param {_geoJson} json - a geojson feed
       * @param {String} name - name of the layer
       * @param {Function} keyAccessor - accessor function used to extract 'key' from the GeoJson data. The key extracted by
       * this function should match the keys returned by the crossfilter groups.
       * @returns {GeoChoroplethChart}
       */
      overlayGeoJson (json, name, keyAccessor) {
          for (let i = 0; i < this._geoJsons.length; ++i) {
              if (this._geoJsons[i].name === name) {
                  this._geoJsons[i].data = json;
                  this._geoJsons[i].keyAccessor = keyAccessor;
                  return this;
              }
          }
          this._geoJsons.push({name: name, data: json, keyAccessor: keyAccessor});
          return this;
      }

      /**
       * Gets or sets a custom geo projection function. See the available
       * {@link https://github.com/d3/d3-geo/blob/master/README.md#projections d3 geo projection functions}.
       *
       * Starting version 3.0 it has been deprecated to rely on the default projection being
       * {@link https://github.com/d3/d3-geo/blob/master/README.md#geoAlbersUsa d3.geoAlbersUsa()}. Please
       * set it explicitly. {@link https://bl.ocks.org/mbostock/5557726
       * Considering that `null` is also a valid value for projection}, if you need
       * projection to be `null` please set it explicitly to `null`.
       * @see {@link https://github.com/d3/d3-geo/blob/master/README.md#projections d3.projection}
       * @see {@link https://github.com/d3/d3-geo-projection d3-geo-projection}
       * @param {d3.projection} [projection=d3.geoAlbersUsa()]
       * @returns {d3.projection|GeoChoroplethChart}
       */
      projection (projection) {
          if (!arguments.length) {
              return this._projection;
          }

          this._projection = projection;
          this._projectionFlag = true;
          return this;
      }

      _getGeoPath () {
          if (this._projection === undefined) {
              logger.warn('choropleth projection default of geoAlbers is deprecated,' +
                  ' in next version projection will need to be set explicitly');
              return this._geoPath.projection(d3Geo.geoAlbersUsa());
          }

          return this._geoPath.projection(this._projection);
      }

      /**
       * Returns all GeoJson layers currently registered with this chart. The returned array is a
       * reference to this chart's internal data structure, so any modification to this array will also
       * modify this chart's internal registration.
       * @returns {Array<{name:String, data: Object, accessor: Function}>}
       */
      geoJsons () {
          return this._geoJsons;
      }

      /**
       * Returns the {@link https://github.com/d3/d3-geo/blob/master/README.md#paths d3.geoPath} object used to
       * render the projection and features.  Can be useful for figuring out the bounding box of the
       * feature set and thus a way to calculate scale and translation for the projection.
       * @see {@link https://github.com/d3/d3-geo/blob/master/README.md#paths d3.geoPath}
       * @returns {d3.geoPath}
       */
      geoPath () {
          return this._geoPath;
      }

      /**
       * Remove a GeoJson layer from this chart by name
       * @param {String} name
       * @returns {GeoChoroplethChart}
       */
      removeGeoJson (name) {
          const geoJsons = [];

          for (let i = 0; i < this._geoJsons.length; ++i) {
              const layer = this._geoJsons[i];
              if (layer.name !== name) {
                  geoJsons.push(layer);
              }
          }

          this._geoJsons = geoJsons;

          return this;
      }
  }

  const geoChoroplethChart = (parent, chartGroup) => new GeoChoroplethChart(parent, chartGroup);

  const DEFAULT_BORDER_RADIUS = 6.75;

  /**
   * A heat map is matrix that represents the values of two dimensions of data using colors.
   * @mixes ColorMixin
   * @mixes MarginMixin
   * @mixes BaseMixin
   */
  class HeatMap extends ColorMixin(MarginMixin) {
      /**
       * Create a Heat Map
       * @example
       * // create a heat map under #chart-container1 element using the default global chart group
       * var heatMap1 = new HeatMap('#chart-container1');
       * // create a heat map under #chart-container2 element using chart group A
       * var heatMap2 = new HeatMap('#chart-container2', 'chartGroupA');
       * @param {String|node|d3.selection} parent - Any valid
       * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
       * a dom block element such as a div; or a dom element or d3 selection.
       * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
       * Interaction with a chart will only trigger events and redraws within the chart's group.
       */
      constructor (parent, chartGroup) {
          super();

          this._chartBody = undefined;

          this._cols = undefined;
          this._rows = undefined;
          this._colOrdering = d3Array.ascending;
          this._rowOrdering = d3Array.ascending;
          this._colScale = d3Scale.scaleBand();
          this._rowScale = d3Scale.scaleBand();

          this._xBorderRadius = DEFAULT_BORDER_RADIUS;
          this._yBorderRadius = DEFAULT_BORDER_RADIUS;

          this._mandatoryAttributes(['group']);
          this.title(this.colorAccessor());

          this._colsLabel = d => d;
          this._rowsLabel = d => d;

          this._xAxisOnClick = d => {
              this._filterAxis(0, d);
          };
          this._yAxisOnClick = d => {
              this._filterAxis(1, d);
          };
          this._boxOnClick = d => {
              const filter = d.key;
              events.trigger(() => {
                  this.filter(filters.TwoDimensionalFilter(filter));
                  this.redrawGroup();
              });
          };

          this.anchor(parent, chartGroup);
      }

      /**
       * Set or get the column label function. The chart class uses this function to render
       * column labels on the X axis. It is passed the column name.
       * @example
       * // the default label function just returns the name
       * chart.colsLabel(function(d) { return d; });
       * @param  {Function} [labelFunction=function(d) { return d; }]
       * @returns {Function|HeatMap}
       */
      colsLabel (labelFunction) {
          if (!arguments.length) {
              return this._colsLabel;
          }
          this._colsLabel = labelFunction;
          return this;
      }

      /**
       * Set or get the row label function. The chart class uses this function to render
       * row labels on the Y axis. It is passed the row name.
       * @example
       * // the default label function just returns the name
       * chart.rowsLabel(function(d) { return d; });
       * @param  {Function} [labelFunction=function(d) { return d; }]
       * @returns {Function|HeatMap}
       */
      rowsLabel (labelFunction) {
          if (!arguments.length) {
              return this._rowsLabel;
          }
          this._rowsLabel = labelFunction;
          return this;
      }

      _filterAxis (axis, value) {
          const cellsOnAxis = this.selectAll('.box-group').filter(d => d.key[axis] === value);
          const unfilteredCellsOnAxis = cellsOnAxis.filter(d => !this.hasFilter(d.key));
          events.trigger(() => {
              const selection = unfilteredCellsOnAxis.empty() ? cellsOnAxis : unfilteredCellsOnAxis;
              const filtersList = selection.data().map(kv => filters.TwoDimensionalFilter(kv.key));
              this.filter([filtersList]);
              this.redrawGroup();
          });
      }

      filter (filter) {
          const nonstandardFilter = f => {
              logger.warnOnce('heatmap.filter taking a coordinate is deprecated - please pass dc.filters.TwoDimensionalFilter instead');
              return this._filter(filters.TwoDimensionalFilter(f));
          };

          if (!arguments.length) {
              return super.filter();
          }
          if (filter !== null && filter.filterType !== 'TwoDimensionalFilter' &&
              !(Array.isArray(filter) && Array.isArray(filter[0]) && filter[0][0].filterType === 'TwoDimensionalFilter')) {
              return nonstandardFilter(filter);
          }
          return super.filter(filter);
      }

      /**
       * Gets or sets the values used to create the rows of the heatmap, as an array. By default, all
       * the values will be fetched from the data using the value accessor.
       * @param  {Array<String|Number>} [rows]
       * @returns {Array<String|Number>|HeatMap}
       */

      rows (rows) {
          if (!arguments.length) {
              return this._rows;
          }
          this._rows = rows;
          return this;
      }

      /**
       * Get or set a comparator to order the rows.
       * Default is {@link https://github.com/d3/d3-array#ascending d3.ascending}.
       * @param  {Function} [rowOrdering]
       * @returns {Function|HeatMap}
       */
      rowOrdering (rowOrdering) {
          if (!arguments.length) {
              return this._rowOrdering;
          }
          this._rowOrdering = rowOrdering;
          return this;
      }

      /**
       * Gets or sets the keys used to create the columns of the heatmap, as an array. By default, all
       * the values will be fetched from the data using the key accessor.
       * @param  {Array<String|Number>} [cols]
       * @returns {Array<String|Number>|HeatMap}
       */
      cols (cols) {
          if (!arguments.length) {
              return this._cols;
          }
          this._cols = cols;
          return this;
      }

      /**
       * Get or set a comparator to order the columns.
       * Default is  {@link https://github.com/d3/d3-array#ascending d3.ascending}.
       * @param  {Function} [colOrdering]
       * @returns {Function|HeatMap}
       */
      colOrdering (colOrdering) {
          if (!arguments.length) {
              return this._colOrdering;
          }
          this._colOrdering = colOrdering;
          return this;
      }

      _doRender () {
          this.resetSvg();

          this._chartBody = this.svg()
              .append('g')
              .attr('class', 'heatmap')
              .attr('transform', `translate(${this.margins().left},${this.margins().top})`);

          return this._doRedraw();
      }

      _doRedraw () {
          const data = this.data();
          let rows = this.rows() || data.map(this.valueAccessor()),
              cols = this.cols() || data.map(this.keyAccessor());
          if (this._rowOrdering) {
              rows = rows.sort(this._rowOrdering);
          }
          if (this._colOrdering) {
              cols = cols.sort(this._colOrdering);
          }
          rows = this._rowScale.domain(rows);
          cols = this._colScale.domain(cols);

          const rowCount = rows.domain().length,
              colCount = cols.domain().length,
              boxWidth = Math.floor(this.effectiveWidth() / colCount),
              boxHeight = Math.floor(this.effectiveHeight() / rowCount);

          cols.rangeRound([0, this.effectiveWidth()]);
          rows.rangeRound([this.effectiveHeight(), 0]);

          let boxes = this._chartBody.selectAll('g.box-group').data(this.data(),
                                                                    (d, i) => `${this.keyAccessor()(d, i)}\0${this.valueAccessor()(d, i)}`);

          boxes.exit().remove();

          const gEnter = boxes.enter().append('g')
              .attr('class', 'box-group');

          gEnter.append('rect')
              .attr('class', 'heat-box')
              .classed('dc-tabbable', this._keyboardAccessible)
              .attr('fill', 'white')
              .attr('x', (d, i) => cols(this.keyAccessor()(d, i)))
              .attr('y', (d, i) => rows(this.valueAccessor()(d, i)))
              .on('click', d3compat.eventHandler(this.boxOnClick()));

          if (this._keyboardAccessible) {
              this._makeKeyboardAccessible(this.boxOnClick);
          }

          boxes = gEnter.merge(boxes);

          if (this.renderTitle()) {
              gEnter.append('title');
              boxes.select('title').text(this.title());
          }

          transition(boxes.select('rect'), this.transitionDuration(), this.transitionDelay())
              .attr('x', (d, i) => cols(this.keyAccessor()(d, i)))
              .attr('y', (d, i) => rows(this.valueAccessor()(d, i)))
              .attr('rx', this._xBorderRadius)
              .attr('ry', this._yBorderRadius)
              .attr('fill', this.getColor)
              .attr('width', boxWidth)
              .attr('height', boxHeight);

          let gCols = this._chartBody.select('g.cols');
          if (gCols.empty()) {
              gCols = this._chartBody.append('g').attr('class', 'cols axis');
          }
          let gColsText = gCols.selectAll('text').data(cols.domain());

          gColsText.exit().remove();

          gColsText = gColsText
              .enter()
              .append('text')
              .attr('x', d => cols(d) + boxWidth / 2)
              .style('text-anchor', 'middle')
              .attr('y', this.effectiveHeight())
              .attr('dy', 12)
              .on('click', d3compat.eventHandler(this.xAxisOnClick()))
              .text(this.colsLabel())
              .merge(gColsText);

          transition(gColsText, this.transitionDuration(), this.transitionDelay())
              .text(this.colsLabel())
              .attr('x', d => cols(d) + boxWidth / 2)
              .attr('y', this.effectiveHeight());

          let gRows = this._chartBody.select('g.rows');
          if (gRows.empty()) {
              gRows = this._chartBody.append('g').attr('class', 'rows axis');
          }

          let gRowsText = gRows.selectAll('text').data(rows.domain());

          gRowsText.exit().remove();

          gRowsText = gRowsText
              .enter()
              .append('text')
              .style('text-anchor', 'end')
              .attr('x', 0)
              .attr('dx', -2)
              .attr('y', d => rows(d) + boxHeight / 2)
              .attr('dy', 6)
              .on('click', d3compat.eventHandler(this.yAxisOnClick()))
              .text(this.rowsLabel())
              .merge(gRowsText);

          transition(gRowsText, this.transitionDuration(), this.transitionDelay())
              .text(this.rowsLabel())
              .attr('y', d => rows(d) + boxHeight / 2);

          if (this.hasFilter()) {
              const chart = this;
              this.selectAll('g.box-group').each(function (d) {
                  if (chart.isSelectedNode(d)) {
                      chart.highlightSelected(this);
                  } else {
                      chart.fadeDeselected(this);
                  }
              });
          } else {
              const chart = this;
              this.selectAll('g.box-group').each(function () {
                  chart.resetHighlight(this);
              });
          }
          return this;
      }

      /**
       * Gets or sets the handler that fires when an individual cell is clicked in the heatmap.
       * By default, filtering of the cell will be toggled.
       * @example
       * // default box on click handler
       * chart.boxOnClick(function (d) {
       *     var filter = d.key;
       *     events.trigger(function () {
       *         _chart.filter(filter);
       *         _chart.redrawGroup();
       *     });
       * });
       * @param  {Function} [handler]
       * @returns {Function|HeatMap}
       */
      boxOnClick (handler) {
          if (!arguments.length) {
              return this._boxOnClick;
          }
          this._boxOnClick = handler;
          return this;
      }

      /**
       * Gets or sets the handler that fires when a column tick is clicked in the x axis.
       * By default, if any cells in the column are unselected, the whole column will be selected,
       * otherwise the whole column will be unselected.
       * @param  {Function} [handler]
       * @returns {Function|HeatMap}
       */
      xAxisOnClick (handler) {
          if (!arguments.length) {
              return this._xAxisOnClick;
          }
          this._xAxisOnClick = handler;
          return this;
      }

      /**
       * Gets or sets the handler that fires when a row tick is clicked in the y axis.
       * By default, if any cells in the row are unselected, the whole row will be selected,
       * otherwise the whole row will be unselected.
       * @param  {Function} [handler]
       * @returns {Function|HeatMap}
       */
      yAxisOnClick (handler) {
          if (!arguments.length) {
              return this._yAxisOnClick;
          }
          this._yAxisOnClick = handler;
          return this;
      }

      /**
       * Gets or sets the X border radius.  Set to 0 to get full rectangles.
       * @param  {Number} [xBorderRadius=6.75]
       * @returns {Number|HeatMap}
       */
      xBorderRadius (xBorderRadius) {
          if (!arguments.length) {
              return this._xBorderRadius;
          }
          this._xBorderRadius = xBorderRadius;
          return this;
      }

      /**
       * Gets or sets the Y border radius.  Set to 0 to get full rectangles.
       * @param  {Number} [yBorderRadius=6.75]
       * @returns {Number|HeatMap}
       */
      yBorderRadius (yBorderRadius) {
          if (!arguments.length) {
              return this._yBorderRadius;
          }
          this._yBorderRadius = yBorderRadius;
          return this;
      }

      isSelectedNode (d) {
          return this.hasFilter(d.key);
      }
  }

  const heatMap = (parent, chartGroup) => new HeatMap(parent, chartGroup);

  /**
   * htmlLegend is a attachable widget that can be added to other dc charts to render horizontal/vertical legend
   * labels.
   * @example
   * chart.legend(HtmlLegend().container(legendContainerElement).horizontal(false))
   * @returns {HtmlLegend}
   */
  class HtmlLegend {
      constructor () {
          this._htmlLegendDivCssClass = 'dc-html-legend';
          this._legendItemCssClassHorizontal = 'dc-legend-item-horizontal';
          this._legendItemCssClassVertical = 'dc-legend-item-vertical';
          this._parent = undefined;
          this._container = undefined;
          this._legendText = pluck('name');
          this._maxItems = undefined;
          this._horizontal = false;
          this._legendItemClass = undefined;
          this._highlightSelected = false;
          this._keyboardAccessible = false;
      }

      parent (p) {
          if (!arguments.length) {
              return this._parent;
          }
          this._parent = p;
          return this;
      }

      render () {
          this._defaultLegendItemCssClass = this._horizontal ? this._legendItemCssClassHorizontal : this._legendItemCssClassVertical;
          this._container.select(`div.${this._htmlLegendDivCssClass}`).remove();

          const container = this._container.append('div').attr('class', this._htmlLegendDivCssClass);
          container.attr('style', `max-width:${this._container.nodes()[0].style.width}`);

          let legendables = this._parent.legendables();
          const filters = this._parent.filters();

          if (this._maxItems !== undefined) {
              legendables = legendables.slice(0, this._maxItems);
          }

          const legendItemClassName = this._legendItemClass ? this._legendItemClass : this._defaultLegendItemCssClass;

          const itemEnter = container.selectAll(`div.${legendItemClassName}`)
              .data(legendables).enter()
              .append('div')
              .classed(legendItemClassName, true)
              .on('mouseover', d3compat.eventHandler(d => this._parent.legendHighlight(d)))
              .on('mouseout', d3compat.eventHandler(d => this._parent.legendReset(d)))
              .on('click', d3compat.eventHandler(d => this._parent.legendToggle(d)));

          if (this._highlightSelected) {
              itemEnter.classed(constants.SELECTED_CLASS, d => filters.indexOf(d.name) !== -1);
          }

          itemEnter.append('span')
              .attr('class', 'dc-legend-item-color')
              .style('background-color', pluck('color'));

          itemEnter.append('span')
              .attr('class', 'dc-legend-item-label')
              .classed('dc-tabbable', this._keyboardAccessible)
              .attr('title', this._legendText)
              .text(this._legendText);

          if (this._keyboardAccessible) {
              this._makeLegendKeyboardAccessible();
          }
      }

      /**
       * Set the container selector for the legend widget. Required.
       * @param {String} [container]
       * @return {String|HtmlLegend}
       */
      container (container) {
          if (!arguments.length) {
              return this._container;
          }
          this._container = d3Selection.select(container);
          return this;
      }

      /**
       * This can be optionally used to override class for legenditem and just use this class style.
       * This is helpful for overriding the style of a particular chart rather than overriding
       * the style for all charts.
       *
       * Setting this will disable the highlighting of selected items also.
       * @param {String} [legendItemClass]
       * @return {String|HtmlLegend}
       */
      legendItemClass (legendItemClass) {
          if (!arguments.length) {
              return this._legendItemClass;
          }
          this._legendItemClass = legendItemClass;
          return this;
      }

      /**
       * This can be optionally used to enable highlighting legends for the selections/filters for the
       * chart.
       * @param {String} [highlightSelected]
       * @return {String|HtmlLegend}
       */
      highlightSelected (highlightSelected) {
          if (!arguments.length) {
              return this._highlightSelected;
          }
          this._highlightSelected = highlightSelected;
          return this;
      }

      /**
       * Display the legend horizontally instead of vertically
       * @param {String} [horizontal]
       * @return {String|HtmlLegend}
       */
      horizontal (horizontal) {
          if (!arguments.length) {
              return this._horizontal;
          }
          this._horizontal = horizontal;
          return this;
      }

      /**
       * Set or get the legend text function. The legend widget uses this function to render the legend
       * text for each item. If no function is specified the legend widget will display the names
       * associated with each group.
       * @param  {Function} [legendText]
       * @returns {Function|HtmlLegend}
       * @example
       * // default legendText
       * legend.legendText(pluck('name'))
       *
       * // create numbered legend items
       * chart.legend(new HtmlLegend().legendText(function(d, i) { return i + '. ' + d.name; }))
       *
       * // create legend displaying group counts
       * chart.legend(new HtmlLegend().legendText(function(d) { return d.name + ': ' d.data; }))
       */
      legendText (legendText) {
          if (!arguments.length) {
              return this._legendText;
          }
          this._legendText = legendText;
          return this;
      }

      /**
       * Maximum number of legend items to display
       * @param  {Number} [maxItems]
       * @return {HtmlLegend}
       */
      maxItems (maxItems) {
          if (!arguments.length) {
              return this._maxItems;
          }
          this._maxItems = utils.isNumber(maxItems) ? maxItems : undefined;
          return this;
      }

      /**
       * If set, individual legend items will be focusable from keyboard and on pressing Enter or Space
       * will behave as if clicked on.
       * 
       * If `svgDescription` on the parent chart has not been explicitly set, will also set the default 
       * SVG description text to the class constructor name, like BarChart or HeatMap, and make the entire
       * SVG focusable.
       * @param {Boolean} [keyboardAccessible=false]
       * @returns {Boolean|HtmlLegend}
       */
      keyboardAccessible (keyboardAccessible) {
          if (!arguments.length) {
              return this._keyboardAccessible;
          }
          this._keyboardAccessible = keyboardAccessible;
          return this;
      }

      _makeLegendKeyboardAccessible () {

          if (!this._parent._svgDescription) {

              this._parent.svg().append('desc')
                  .attr('id', `desc-id-${this._parent.__dcFlag__}`)
                  .html(`${this._parent.svgDescription()}`);

              this._parent.svg()
                  .attr('tabindex', '0')
                  .attr('role', 'img')
                  .attr('aria-labelledby', `desc-id-${this._parent.__dcFlag__}`);
          }

          const tabElements = this.container()
              .selectAll('.dc-legend-item-label.dc-tabbable')
              .attr('tabindex', 0);

          tabElements
              .on('keydown', d3compat.eventHandler((d, event) => {
                  // trigger only if d is an object
                  if (event.keyCode === 13 && typeof d === 'object') {
                      d.chart.legendToggle(d);
                  } 
                  // special case for space key press - prevent scrolling
                  if (event.keyCode === 32 && typeof d === 'object') {
                      d.chart.legendToggle(d);
                      event.preventDefault();            
                  }
              }))
              .on('focus', d3compat.eventHandler(d => {
                  this._parent.legendHighlight(d);
              }))
              .on('blur', d3compat.eventHandler(d => {
                  this._parent.legendReset(d);
              }));
      }
  }

  const htmlLegend = () => new HtmlLegend();

  const LABEL_GAP = 2;

  /**
   * Legend is a attachable widget that can be added to other dc charts to render horizontal legend
   * labels.
   *
   * Examples:
   * - {@link http://dc-js.github.com/dc.js/ Nasdaq 100 Index}
   * - {@link http://dc-js.github.com/dc.js/crime/index.html Canadian City Crime Stats}
   * @example
   * chart.legend(new Legend().x(400).y(10).itemHeight(13).gap(5))
   * @returns {Legend}
   */
  class Legend {
      constructor () {
          this._parent = undefined;
          this._x = 0;
          this._y = 0;
          this._itemHeight = 12;
          this._gap = 5;
          this._horizontal = false;
          this._legendWidth = 560;
          this._itemWidth = 70;
          this._autoItemWidth = false;
          this._legendText = pluck('name');
          this._maxItems = undefined;
          this._highlightSelected = false;
          this._keyboardAccessible = false;

          this._g = undefined;
      }

      parent (p) {
          if (!arguments.length) {
              return this._parent;
          }
          this._parent = p;
          return this;
      }

      /**
       * Set or get x coordinate for legend widget.
       * @param  {Number} [x=0]
       * @returns {Number|Legend}
       */
      x (x) {
          if (!arguments.length) {
              return this._x;
          }
          this._x = x;
          return this;
      }

      /**
       * Set or get y coordinate for legend widget.
       * @param  {Number} [y=0]
       * @returns {Number|Legend}
       */
      y (y) {
          if (!arguments.length) {
              return this._y;
          }
          this._y = y;
          return this;
      }

      /**
       * Set or get gap between legend items.
       * @param  {Number} [gap=5]
       * @returns {Number|Legend}
       */
      gap (gap) {
          if (!arguments.length) {
              return this._gap;
          }
          this._gap = gap;
          return this;
      }

      /**
       * This can be optionally used to enable highlighting legends for the selections/filters for the
       * chart.
       * @param {String} [highlightSelected]
       * @return {String|dc.legend}
       **/
      highlightSelected (highlightSelected) {
          if (!arguments.length) {
              return this._highlightSelected;
          }
          this._highlightSelected = highlightSelected;
          return this;
      }

      /**
       * Set or get legend item height.
       * @param  {Number} [itemHeight=12]
       * @returns {Number|Legend}
       */
      itemHeight (itemHeight) {
          if (!arguments.length) {
              return this._itemHeight;
          }
          this._itemHeight = itemHeight;
          return this;
      }

      /**
       * Position legend horizontally instead of vertically.
       * @param  {Boolean} [horizontal=false]
       * @returns {Boolean|Legend}
       */
      horizontal (horizontal) {
          if (!arguments.length) {
              return this._horizontal;
          }
          this._horizontal = horizontal;
          return this;
      }

      /**
       * Maximum width for horizontal legend.
       * @param  {Number} [legendWidth=500]
       * @returns {Number|Legend}
       */
      legendWidth (legendWidth) {
          if (!arguments.length) {
              return this._legendWidth;
          }
          this._legendWidth = legendWidth;
          return this;
      }

      /**
       * Legend item width for horizontal legend.
       * @param  {Number} [itemWidth=70]
       * @returns {Number|Legend}
       */
      itemWidth (itemWidth) {
          if (!arguments.length) {
              return this._itemWidth;
          }
          this._itemWidth = itemWidth;
          return this;
      }

      /**
       * Turn automatic width for legend items on or off. If true, {@link Legend#itemWidth itemWidth} is ignored.
       * This setting takes into account the {@link Legend#gap gap}.
       * @param  {Boolean} [autoItemWidth=false]
       * @returns {Boolean|Legend}
       */
      autoItemWidth (autoItemWidth) {
          if (!arguments.length) {
              return this._autoItemWidth;
          }
          this._autoItemWidth = autoItemWidth;
          return this;
      }

      /**
       * Set or get the legend text function. The legend widget uses this function to render the legend
       * text for each item. If no function is specified the legend widget will display the names
       * associated with each group.
       * @param  {Function} [legendText]
       * @returns {Function|Legend}
       * @example
       * // default legendText
       * legend.legendText(pluck('name'))
       *
       * // create numbered legend items
       * chart.legend(new Legend().legendText(function(d, i) { return i + '. ' + d.name; }))
       *
       * // create legend displaying group counts
       * chart.legend(new Legend().legendText(function(d) { return d.name + ': ' d.data; }))
       */
      legendText (legendText) {
          if (!arguments.length) {
              return this._legendText;
          }
          this._legendText = legendText;
          return this;
      }

      /**
       * Maximum number of legend items to display
       * @param  {Number} [maxItems]
       * @return {Legend}
       */
      maxItems (maxItems) {
          if (!arguments.length) {
              return this._maxItems;
          }
          this._maxItems = utils.isNumber(maxItems) ? maxItems : undefined;
          return this;
      }

      /**
       * If set, individual legend items will be focusable from keyboard and on pressing Enter or Space
       * will behave as if clicked on.
       * 
       * If `svgDescription` on the parent chart has not been explicitly set, will also set the default 
       * SVG description text to the class constructor name, like BarChart or HeatMap, and make the entire
       * SVG focusable.
       * @param {Boolean} [keyboardAccessible=false]
       * @returns {Boolean|Legend}
       */
      keyboardAccessible (keyboardAccessible) {
          if (!arguments.length) {
              return this._keyboardAccessible;
          }
          this._keyboardAccessible = keyboardAccessible;
          return this;
      }

      // Implementation methods

      _legendItemHeight () {
          return this._gap + this._itemHeight;
      }

      _makeLegendKeyboardAccessible () {

          if (!this._parent._svgDescription) {

              this._parent.svg().append('desc')
                  .attr('id', `desc-id-${this._parent.__dcFlag__}`)
                  .html(`${this._parent.svgDescription()}`);

              this._parent.svg()
                  .attr('tabindex', '0')
                  .attr('role', 'img')
                  .attr('aria-labelledby', `desc-id-${this._parent.__dcFlag__}`);
          }

          const tabElements = this._parent.svg()
              .selectAll('.dc-legend .dc-tabbable')
              .attr('tabindex', 0);

          tabElements
              .on('keydown', d3compat.eventHandler((d, event) => {
                  // trigger only if d is an object
                  if (event.keyCode === 13 && typeof d === 'object') {
                      d.chart.legendToggle(d);
                  } 
                  // special case for space key press - prevent scrolling
                  if (event.keyCode === 32 && typeof d === 'object') {
                      d.chart.legendToggle(d);
                      event.preventDefault();            
                  }
              }))
              .on('focus', d3compat.eventHandler(d => {
                  this._parent.legendHighlight(d);
              }))
              .on('blur', d3compat.eventHandler(d => {
                  this._parent.legendReset(d);
              }));
      }

      render () {
          this._parent.svg().select('g.dc-legend').remove();
          this._g = this._parent.svg().append('g')
              .attr('class', 'dc-legend')
              .attr('transform', `translate(${this._x},${this._y})`);
          let legendables = this._parent.legendables();
          const filters = this._parent.filters();

          if (this._maxItems !== undefined) {
              legendables = legendables.slice(0, this._maxItems);
          }

          const itemEnter = this._g.selectAll('g.dc-legend-item')
              .data(legendables)
              .enter()
              .append('g')
              .attr('class', 'dc-legend-item')
              .on('mouseover', d3compat.eventHandler(d => {
                  this._parent.legendHighlight(d);
              }))
              .on('mouseout', d3compat.eventHandler(d => {
                  this._parent.legendReset(d);
              }))
              .on('click', d3compat.eventHandler(d => {
                  d.chart.legendToggle(d);
              }));

          if (this._highlightSelected) {
              itemEnter.classed(constants.SELECTED_CLASS,
                                d => filters.indexOf(d.name) !== -1);
          }


          this._g.selectAll('g.dc-legend-item')
              .classed('fadeout', d => d.chart.isLegendableHidden(d));

          if (legendables.some(pluck('dashstyle'))) {
              itemEnter
                  .append('line')
                  .attr('x1', 0)
                  .attr('y1', this._itemHeight / 2)
                  .attr('x2', this._itemHeight)
                  .attr('y2', this._itemHeight / 2)
                  .attr('stroke-width', 2)
                  .attr('stroke-dasharray', pluck('dashstyle'))
                  .attr('stroke', pluck('color'));
          } else {
              itemEnter
                  .append('rect')
                  .attr('width', this._itemHeight)
                  .attr('height', this._itemHeight)
                  .attr('fill', d => d ? d.color : 'blue');
          }

          {
              const self = this;

              itemEnter.append('text')
                  .text(self._legendText)
                  .classed('dc-tabbable', this._keyboardAccessible)
                  .attr('x', self._itemHeight + LABEL_GAP)
                  .attr('y', function () {
                      return self._itemHeight / 2 + (this.clientHeight ? this.clientHeight : 13) / 2 - 2;
                  });

              if (this._keyboardAccessible) {
                  this._makeLegendKeyboardAccessible();
              }
          }

          let cumulativeLegendTextWidth = 0;
          let row = 0;

          {
              const self = this;

              itemEnter.attr('transform', function (d, i) {
                  if (self._horizontal) {
                      const itemWidth = self._autoItemWidth === true ? this.getBBox().width + self._gap : self._itemWidth;
                      if ((cumulativeLegendTextWidth + itemWidth) > self._legendWidth && cumulativeLegendTextWidth > 0) {
                          ++row;
                          cumulativeLegendTextWidth = 0;
                      }
                      const translateBy = `translate(${cumulativeLegendTextWidth},${row * self._legendItemHeight()})`;
                      cumulativeLegendTextWidth += itemWidth;
                      return translateBy;
                  } else {
                      return `translate(0,${i * self._legendItemHeight()})`;
                  }
              });
          }
      }

  }

  const legend = () => new Legend();

  const DEFAULT_DOT_RADIUS = 5;
  const TOOLTIP_G_CLASS = 'dc-tooltip';
  const DOT_CIRCLE_CLASS = 'dot';
  const Y_AXIS_REF_LINE_CLASS = 'yRef';
  const X_AXIS_REF_LINE_CLASS = 'xRef';
  const DEFAULT_DOT_OPACITY = 1e-6;
  const LABEL_PADDING$1 = 3;

  /**
   * Concrete line/area chart implementation.
   *
   * Examples:
   * - {@link http://dc-js.github.com/dc.js/ Nasdaq 100 Index}
   * - {@link http://dc-js.github.com/dc.js/crime/index.html Canadian City Crime Stats}
   * @mixes StackMixin
   * @mixes CoordinateGridMixin
   */
  class LineChart extends StackMixin {
      /**
       * Create a Line Chart.
       * @example
       * // create a line chart under #chart-container1 element using the default global chart group
       * var chart1 = new LineChart('#chart-container1');
       * // create a line chart under #chart-container2 element using chart group A
       * var chart2 = new LineChart('#chart-container2', 'chartGroupA');
       * // create a sub-chart under a composite parent chart
       * var chart3 = new LineChart(compositeChart);
       * @param {String|node|d3.selection|CompositeChart} parent - Any valid
       * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector}
       * specifying a dom block element such as a div; or a dom element or d3 selection.  If the line
       * chart is a sub-chart in a {@link CompositeChart Composite Chart} then pass in the parent
       * composite chart instance instead.
       * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
       * Interaction with a chart will only trigger events and redraws within the chart's group.
       */
      constructor (parent, chartGroup) {
          super();

          this._renderArea = false;
          this._dotRadius = DEFAULT_DOT_RADIUS;
          this._dataPointRadius = null;
          this._dataPointFillOpacity = DEFAULT_DOT_OPACITY;
          this._dataPointStrokeOpacity = DEFAULT_DOT_OPACITY;
          this._curve = null;
          this._interpolate = null; // d3.curveLinear;  // deprecated in 3.0
          this._tension = null;  // deprecated in 3.0
          this._defined = undefined;
          this._dashStyle = undefined;
          this._xyTipsOn = true;

          this.transitionDuration(500);
          this.transitionDelay(0);
          this._rangeBandPadding(1);

          this.label(d => utils.printSingleValue(d.y0 + d.y), false);

          this.anchor(parent, chartGroup);
      }

      plotData () {
          const chartBody = this.chartBodyG();
          let layersList = chartBody.select('g.stack-list');

          if (layersList.empty()) {
              layersList = chartBody.append('g').attr('class', 'stack-list');
          }

          let layers = layersList.selectAll('g.stack').data(this.data());

          const layersEnter = layers
              .enter()
              .append('g')
              .attr('class', (d, i) => `stack _${i}`);

          layers = layersEnter.merge(layers);

          this._drawLine(layersEnter, layers);

          this._drawArea(layersEnter, layers);

          this._drawDots(chartBody, layers);

          if (this.renderLabel()) {
              this._drawLabels(layers);
          }
      }

      /**
       * Gets or sets the curve factory to use for lines and areas drawn, allowing e.g. step
       * functions, splines, and cubic interpolation. Typically you would use one of the interpolator functions
       * provided by {@link https://github.com/d3/d3-shape/blob/master/README.md#curves d3 curves}.
       *
       * Replaces the use of {@link LineChart#interpolate} and {@link LineChart#tension}
       * in dc.js < 3.0
       *
       * This is passed to
       * {@link https://github.com/d3/d3-shape/blob/master/README.md#line_curve line.curve} and
       * {@link https://github.com/d3/d3-shape/blob/master/README.md#area_curve area.curve}.
       * @example
       * // default
       * chart
       *     .curve(d3.curveLinear);
       * // Add tension to curves that support it
       * chart
       *     .curve(d3.curveCardinal.tension(0.5));
       * // You can use some specialized variation like
       * // https://en.wikipedia.org/wiki/Centripetal_Catmull%E2%80%93Rom_spline
       * chart
       *     .curve(d3.curveCatmullRom.alpha(0.5));
       * @see {@link https://github.com/d3/d3-shape/blob/master/README.md#line_curve line.curve}
       * @see {@link https://github.com/d3/d3-shape/blob/master/README.md#area_curve area.curve}
       * @param  {d3.curve} [curve=d3.curveLinear]
       * @returns {d3.curve|LineChart}
       */
      curve (curve) {
          if (!arguments.length) {
              return this._curve;
          }
          this._curve = curve;
          return this;
      }

      /**
       * Gets or sets the interpolator to use for lines drawn, by string name, allowing e.g. step
       * functions, splines, and cubic interpolation.
       *
       * Possible values are: 'linear', 'linear-closed', 'step', 'step-before', 'step-after', 'basis',
       * 'basis-open', 'basis-closed', 'bundle', 'cardinal', 'cardinal-open', 'cardinal-closed', and
       * 'monotone'.
       *
       * This function exists for backward compatibility. Use {@link LineChart#curve}
       * which is generic and provides more options.
       * Value set through `.curve` takes precedence over `.interpolate` and `.tension`.
       * @deprecated since version 3.0 use {@link LineChart#curve} instead
       * @see {@link LineChart#curve}
       * @param  {d3.curve} [interpolate=d3.curveLinear]
       * @returns {d3.curve|LineChart}
       */
      interpolate (interpolate) {
          logger.warnOnce('dc.lineChart.interpolate has been deprecated since version 3.0 use dc.lineChart.curve instead');
          if (!arguments.length) {
              return this._interpolate;
          }
          this._interpolate = interpolate;
          return this;
      }

      /**
       * Gets or sets the tension to use for lines drawn, in the range 0 to 1.
       *
       * Passed to the {@link https://github.com/d3/d3-shape/blob/master/README.md#curves d3 curve function}
       * if it provides a `.tension` function. Example:
       * {@link https://github.com/d3/d3-shape/blob/master/README.md#curveCardinal_tension curveCardinal.tension}.
       *
       * This function exists for backward compatibility. Use {@link LineChart#curve}
       * which is generic and provides more options.
       * Value set through `.curve` takes precedence over `.interpolate` and `.tension`.
       * @deprecated since version 3.0 use {@link LineChart#curve} instead
       * @see {@link LineChart#curve}
       * @param  {Number} [tension=0]
       * @returns {Number|LineChart}
       */
      tension (tension) {
          logger.warnOnce('dc.lineChart.tension has been deprecated since version 3.0 use dc.lineChart.curve instead');
          if (!arguments.length) {
              return this._tension;
          }
          this._tension = tension;
          return this;
      }

      /**
       * Gets or sets a function that will determine discontinuities in the line which should be
       * skipped: the path will be broken into separate subpaths if some points are undefined.
       * This function is passed to
       * {@link https://github.com/d3/d3-shape/blob/master/README.md#line_defined line.defined}
       *
       * Note: crossfilter will sometimes coerce nulls to 0, so you may need to carefully write
       * custom reduce functions to get this to work, depending on your data. See
       * {@link https://github.com/dc-js/dc.js/issues/615#issuecomment-49089248 this GitHub comment}
       * for more details and an example.
       * @see {@link https://github.com/d3/d3-shape/blob/master/README.md#line_defined line.defined}
       * @param  {Function} [defined]
       * @returns {Function|LineChart}
       */
      defined (defined) {
          if (!arguments.length) {
              return this._defined;
          }
          this._defined = defined;
          return this;
      }

      /**
       * Set the line's d3 dashstyle. This value becomes the 'stroke-dasharray' of line. Defaults to empty
       * array (solid line).
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray stroke-dasharray}
       * @example
       * // create a Dash Dot Dot Dot
       * chart.dashStyle([3,1,1,1]);
       * @param  {Array<Number>} [dashStyle=[]]
       * @returns {Array<Number>|LineChart}
       */
      dashStyle (dashStyle) {
          if (!arguments.length) {
              return this._dashStyle;
          }
          this._dashStyle = dashStyle;
          return this;
      }

      /**
       * Get or set render area flag. If the flag is set to true then the chart will render the area
       * beneath each line and the line chart effectively becomes an area chart.
       * @param  {Boolean} [renderArea=false]
       * @returns {Boolean|LineChart}
       */
      renderArea (renderArea) {
          if (!arguments.length) {
              return this._renderArea;
          }
          this._renderArea = renderArea;
          return this;
      }

      _getColor (d, i) {
          return this.getColor.call(d, d.values, i);
      }

      // To keep it backward compatible, this covers multiple cases
      // See https://github.com/dc-js/dc.js/issues/1376
      // It will be removed when interpolate and tension are removed.
      _getCurveFactory () {
          let curve = null;

          // _curve takes precedence
          if (this._curve) {
              return this._curve;
          }

          // Approximate the D3v3 behavior
          if (typeof this._interpolate === 'function') {
              curve = this._interpolate;
          } else {
              // If _interpolate is string
              const mapping = {
                  'linear': d3Shape.curveLinear,
                  'linear-closed': d3Shape.curveLinearClosed,
                  'step': d3Shape.curveStep,
                  'step-before': d3Shape.curveStepBefore,
                  'step-after': d3Shape.curveStepAfter,
                  'basis': d3Shape.curveBasis,
                  'basis-open': d3Shape.curveBasisOpen,
                  'basis-closed': d3Shape.curveBasisClosed,
                  'bundle': d3Shape.curveBundle,
                  'cardinal': d3Shape.curveCardinal,
                  'cardinal-open': d3Shape.curveCardinalOpen,
                  'cardinal-closed': d3Shape.curveCardinalClosed,
                  'monotone': d3Shape.curveMonotoneX
              };
              curve = mapping[this._interpolate];
          }

          // Default value
          if (!curve) {
              curve = d3Shape.curveLinear;
          }

          if (this._tension !== null) {
              if (typeof curve.tension !== 'function') {
                  logger.warn('tension was specified but the curve/interpolate does not support it.');
              } else {
                  curve = curve.tension(this._tension);
              }
          }
          return curve;
      }

      _drawLine (layersEnter, layers) {
          const _line = d3Shape.line()
              .x(d => this.x()(d.x))
              .y(d => this.y()(d.y + d.y0))
              .curve(this._getCurveFactory());
          if (this._defined) {
              _line.defined(this._defined);
          }

          const path = layersEnter.append('path')
              .attr('class', 'line')
              .attr('stroke', (d, i) => this._getColor(d, i));
          if (this._dashStyle) {
              path.attr('stroke-dasharray', this._dashStyle);
          }

          transition(layers.select('path.line'), this.transitionDuration(), this.transitionDelay())
          //.ease('linear')
              .attr('stroke', (d, i) => this._getColor(d, i))
              .attr('d', d => this._safeD(_line(d.values)));
      }

      _drawArea (layersEnter, layers) {
          if (this._renderArea) {
              const _area = d3Shape.area()
                  .x(d => this.x()(d.x))
                  .y1(d => this.y()(d.y + d.y0))
                  .y0(d => this.y()(d.y0))
                  .curve(this._getCurveFactory());
              if (this._defined) {
                  _area.defined(this._defined);
              }

              layersEnter.append('path')
                  .attr('class', 'area')
                  .attr('fill', (d, i) => this._getColor(d, i))
                  .attr('d', d => this._safeD(_area(d.values)));

              transition(layers.select('path.area'), this.transitionDuration(), this.transitionDelay())
              //.ease('linear')
                  .attr('fill', (d, i) => this._getColor(d, i))
                  .attr('d', d => this._safeD(_area(d.values)));
          }
      }

      _safeD (d) {
          return (!d || d.indexOf('NaN') >= 0) ? 'M0,0' : d;
      }

      _drawDots (chartBody, layers) {
          if (this.xyTipsOn() === 'always' || (!(this.brushOn() || this.parentBrushOn()) && this.xyTipsOn())) {
              const tooltipListClass = `${TOOLTIP_G_CLASS}-list`;
              let tooltips = chartBody.select(`g.${tooltipListClass}`);

              if (tooltips.empty()) {
                  tooltips = chartBody.append('g').attr('class', tooltipListClass);
              }

              layers.each((data, layerIndex) => {
                  let points = data.values;
                  if (this._defined) {
                      points = points.filter(this._defined);
                  }

                  let g = tooltips.select(`g.${TOOLTIP_G_CLASS}._${layerIndex}`);
                  if (g.empty()) {
                      g = tooltips.append('g').attr('class', `${TOOLTIP_G_CLASS} _${layerIndex}`);
                  }

                  this._createRefLines(g);

                  const dots = g.selectAll(`circle.${DOT_CIRCLE_CLASS}`)
                      .data(points, pluck('x'));

                  const chart = this;
                  const dotsEnterModify = dots
                      .enter()
                      .append('circle')
                      .attr('class', DOT_CIRCLE_CLASS)
                      .classed('dc-tabbable', this._keyboardAccessible)
                      .attr('cx', d => utils.safeNumber(this.x()(d.x)))
                      .attr('cy', d => utils.safeNumber(this.y()(d.y + d.y0)))
                      .attr('r', this._getDotRadius())
                      .style('fill-opacity', this._dataPointFillOpacity)
                      .style('stroke-opacity', this._dataPointStrokeOpacity)
                      .attr('fill', this.getColor)
                      .attr('stroke', this.getColor)
                      .on('mousemove', function () {
                          const dot = d3Selection.select(this);
                          chart._showDot(dot);
                          chart._showRefLines(dot, g);
                      })
                      .on('mouseout', function () {
                          const dot = d3Selection.select(this);
                          chart._hideDot(dot);
                          chart._hideRefLines(g);
                      })
                      .merge(dots);

                  // special case for on-focus for line chart and its dots
                  if (this._keyboardAccessible) {

                      this._svg.selectAll('.dc-tabbable')
                          .attr('tabindex', 0)
                          .on('focus', function () {
                              const dot = d3Selection.select(this);
                              chart._showDot(dot);
                              chart._showRefLines(dot, g);
                          })
                          .on('blur', function () {
                              const dot = d3Selection.select(this);
                              chart._hideDot(dot);
                              chart._hideRefLines(g);
                          });
                  }

                  dotsEnterModify.call(dot => this._doRenderTitle(dot, data));

                  transition(dotsEnterModify, this.transitionDuration())
                      .attr('cx', d => utils.safeNumber(this.x()(d.x)))
                      .attr('cy', d => utils.safeNumber(this.y()(d.y + d.y0)))
                      .attr('fill', this.getColor);

                  dots.exit().remove();
              });
          }
      }

      _drawLabels (layers) {
          const chart = this;
          layers.each(function (data, layerIndex) {
              const layer = d3Selection.select(this);
              const labels = layer.selectAll('text.lineLabel')
                  .data(data.values, pluck('x'));

              const labelsEnterModify = labels
                  .enter()
                  .append('text')
                  .attr('class', 'lineLabel')
                  .attr('text-anchor', 'middle')
                  .merge(labels);

              transition(labelsEnterModify, chart.transitionDuration())
                  .attr('x', d => utils.safeNumber(chart.x()(d.x)))
                  .attr('y', d => {
                      const y = chart.y()(d.y + d.y0) - LABEL_PADDING$1;
                      return utils.safeNumber(y);
                  })
                  .text(d => chart.label()(d));

              transition(labels.exit(), chart.transitionDuration())
                  .attr('height', 0)
                  .remove();
          });
      }

      _createRefLines (g) {
          const yRefLine = g.select(`path.${Y_AXIS_REF_LINE_CLASS}`).empty() ?
              g.append('path').attr('class', Y_AXIS_REF_LINE_CLASS) : g.select(`path.${Y_AXIS_REF_LINE_CLASS}`);
          yRefLine.style('display', 'none').attr('stroke-dasharray', '5,5');

          const xRefLine = g.select(`path.${X_AXIS_REF_LINE_CLASS}`).empty() ?
              g.append('path').attr('class', X_AXIS_REF_LINE_CLASS) : g.select(`path.${X_AXIS_REF_LINE_CLASS}`);
          xRefLine.style('display', 'none').attr('stroke-dasharray', '5,5');
      }

      _showDot (dot) {
          dot.style('fill-opacity', 0.8);
          dot.style('stroke-opacity', 0.8);
          dot.attr('r', this._dotRadius);
          return dot;
      }

      _showRefLines (dot, g) {
          const x = dot.attr('cx');
          const y = dot.attr('cy');
          const yAxisX = (this._yAxisX() - this.margins().left);
          const yAxisRefPathD = `M${yAxisX} ${y}L${x} ${y}`;
          const xAxisRefPathD = `M${x} ${this.yAxisHeight()}L${x} ${y}`;
          g.select(`path.${Y_AXIS_REF_LINE_CLASS}`).style('display', '').attr('d', yAxisRefPathD);
          g.select(`path.${X_AXIS_REF_LINE_CLASS}`).style('display', '').attr('d', xAxisRefPathD);
      }

      _getDotRadius () {
          return this._dataPointRadius || this._dotRadius;
      }

      _hideDot (dot) {
          dot.style('fill-opacity', this._dataPointFillOpacity)
              .style('stroke-opacity', this._dataPointStrokeOpacity)
              .attr('r', this._getDotRadius());
      }

      _hideRefLines (g) {
          g.select(`path.${Y_AXIS_REF_LINE_CLASS}`).style('display', 'none');
          g.select(`path.${X_AXIS_REF_LINE_CLASS}`).style('display', 'none');
      }

      _doRenderTitle (dot, d) {
          if (this.renderTitle()) {
              dot.select('title').remove();
              dot.append('title').text(pluck('data', this.title(d.name)));
          }
      }

      /**
       * Turn on/off the mouseover behavior of an individual data point which renders a circle and x/y axis
       * dashed lines back to each respective axis.  This is ignored if the chart
       * {@link CoordinateGridMixin#brushOn brush} is on
       * @param  {Boolean} [xyTipsOn=false]
       * @returns {Boolean|LineChart}
       */
      xyTipsOn (xyTipsOn) {
          if (!arguments.length) {
              return this._xyTipsOn;
          }
          this._xyTipsOn = xyTipsOn;
          return this;
      }

      /**
       * Get or set the radius (in px) for dots displayed on the data points.
       * @param  {Number} [dotRadius=5]
       * @returns {Number|LineChart}
       */
      dotRadius (dotRadius) {
          if (!arguments.length) {
              return this._dotRadius;
          }
          this._dotRadius = dotRadius;
          return this;
      }

      /**
       * Always show individual dots for each datapoint.
       *
       * If `options` is falsy, it disables data point rendering. If no `options` are provided, the
       * current `options` values are instead returned.
       * @example
       * chart.renderDataPoints({radius: 2, fillOpacity: 0.8, strokeOpacity: 0.0})
       * @param  {{fillOpacity: Number, strokeOpacity: Number, radius: Number}} [options={fillOpacity: 0.8, strokeOpacity: 0.0, radius: 2}]
       * @returns {{fillOpacity: Number, strokeOpacity: Number, radius: Number}|LineChart}
       */
      renderDataPoints (options) {
          if (!arguments.length) {
              return {
                  fillOpacity: this._dataPointFillOpacity,
                  strokeOpacity: this._dataPointStrokeOpacity,
                  radius: this._dataPointRadius
              };
          } else if (!options) {
              this._dataPointFillOpacity = DEFAULT_DOT_OPACITY;
              this._dataPointStrokeOpacity = DEFAULT_DOT_OPACITY;
              this._dataPointRadius = null;
          } else {
              this._dataPointFillOpacity = options.fillOpacity || 0.8;
              this._dataPointStrokeOpacity = options.strokeOpacity || 0.0;
              this._dataPointRadius = options.radius || 2;
          }
          return this;
      }

      _colorFilter (color, dashstyle, inv) {
          return function () {
              const item = d3Selection.select(this);
              const match = (item.attr('stroke') === color &&
                  item.attr('stroke-dasharray') === ((dashstyle instanceof Array) ?
                      dashstyle.join(',') : null)) || item.attr('fill') === color;
              return inv ? !match : match;
          };
      }

      legendHighlight (d) {
          if (!this.isLegendableHidden(d)) {
              this.g().selectAll('path.line, path.area')
                  .classed('highlight', this._colorFilter(d.color, d.dashstyle))
                  .classed('fadeout', this._colorFilter(d.color, d.dashstyle, true));
          }
      }

      legendReset () {
          this.g().selectAll('path.line, path.area')
              .classed('highlight', false)
              .classed('fadeout', false);
      }

      legendables () {
          const legendables = super.legendables();
          if (!this._dashStyle) {
              return legendables;
          }
          return legendables.map(l => {
              l.dashstyle = this._dashStyle;
              return l;
          });
      }
  }

  const lineChart = (parent, chartGroup) => new LineChart(parent, chartGroup);

  const SPAN_CLASS = 'number-display';

  /**
   * A display of a single numeric value.
   *
   * Unlike other charts, you do not need to set a dimension. Instead a group object must be provided and
   * a valueAccessor that returns a single value.
   *
   * If the group is a {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#crossfilter_groupAll groupAll}
   * then its `.value()` will be displayed. This is the recommended usage.
   *
   * However, if it is given an ordinary group, the `numberDisplay` will show the last bin's value, after
   * sorting with the {@link https://dc-js.github.io/dc.js/docs/html/dc.baseMixin.html#ordering__anchor ordering}
   * function. `numberDisplay` defaults the `ordering` function to sorting by value, so this will display
   * the largest value if the values are numeric.
   * @mixes BaseMixin
   */
  class NumberDisplay extends BaseMixin {
      /**
       * Create a Number Display widget.
       *
       * @example
       * // create a number display under #chart-container1 element using the default global chart group
       * var display1 = new NumberDisplay('#chart-container1');
       * @param {String|node|d3.selection} parent - Any valid
       * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
       * a dom block element such as a div; or a dom element or d3 selection.
       * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
       * Interaction with a chart will only trigger events and redraws within the chart's group.
       */
      constructor (parent, chartGroup) {
          super();

          this._formatNumber = d3Format.format('.2s');
          this._html = {one: '', some: '', none: ''};
          this._lastValue = undefined;
          this._ariaLiveRegion = false;

          // dimension not required
          this._mandatoryAttributes(['group']);

          // default to ordering by value, to emulate old group.top(1) behavior when multiple groups
          this.ordering(kv => kv.value);

          this.data(group => {
              const valObj = group.value ? group.value() : this._maxBin(group.all());
              return this.valueAccessor()(valObj);
          });

          this.transitionDuration(250); // good default
          this.transitionDelay(0);

          this.anchor(parent, chartGroup);
      }

      /**
       * Gets or sets an optional object specifying HTML templates to use depending on the number
       * displayed.  The text `%number` will be replaced with the current value.
       * - one: HTML template to use if the number is 1
       * - zero: HTML template to use if the number is 0
       * - some: HTML template to use otherwise
       * @example
       * numberWidget.html({
       *      one:'%number record',
       *      some:'%number records',
       *      none:'no records'})
       * @param {{one:String, some:String, none:String}} [html={one: '', some: '', none: ''}]
       * @returns {{one:String, some:String, none:String}|NumberDisplay}
       */
      html (html) {
          if (!arguments.length) {
              return this._html;
          }
          if (html.none) {
              this._html.none = html.none;//if none available
          } else if (html.one) {
              this._html.none = html.one;//if none not available use one
          } else if (html.some) {
              this._html.none = html.some;//if none and one not available use some
          }
          if (html.one) {
              this._html.one = html.one;//if one available
          } else if (html.some) {
              this._html.one = html.some;//if one not available use some
          }
          if (html.some) {
              this._html.some = html.some;//if some available
          } else if (html.one) {
              this._html.some = html.one;//if some not available use one
          }
          return this;
      }

      /**
       * Calculate and return the underlying value of the display.
       * @returns {Number}
       */
      value () {
          return this.data();
      }

      _maxBin (all) {
          if (!all.length) {
              return null;
          }
          const sorted = this._computeOrderedGroups(all);
          return sorted[sorted.length - 1];
      }

      _doRender () {
          const newValue = this.value();
          let span = this.selectAll(`.${SPAN_CLASS}`);

          if (span.empty()) {
              span = span.data([0])
                  .enter()
                  .append('span')
                  .attr('class', SPAN_CLASS)
                  .classed('dc-tabbable', this._keyboardAccessible)
                  .merge(span);

              if (this._keyboardAccessible) {
                  span.attr('tabindex', '0');
              }

              if (this._ariaLiveRegion) {
                  this.transitionDuration(0);
                  span.attr('aria-live', 'polite');
              }
          }

          {
              const chart = this;
              span.transition()
                  .duration(chart.transitionDuration())
                  .delay(chart.transitionDelay())
                  .ease(d3Ease.easeQuad)
                  .tween('text', function () {
                      // [XA] don't try and interpolate from Infinity, else this breaks.
                      const interpStart = isFinite(chart._lastValue) ? chart._lastValue : 0;
                      const interp = d3Interpolate.interpolateNumber(interpStart || 0, newValue);
                      chart._lastValue = newValue;

                      // need to save it in D3v4
                      const node = this;
                      return t => {
                          let html = null;
                          const num = chart.formatNumber()(interp(t));
                          if (newValue === 0 && (chart._html.none !== '')) {
                              html = chart._html.none;
                          } else if (newValue === 1 && (chart._html.one !== '')) {
                              html = chart._html.one;
                          } else if (chart._html.some !== '') {
                              html = chart._html.some;
                          }
                          node.innerHTML = html ? html.replace('%number', num) : num;
                      };
                  });
          }
      }

      _doRedraw () {
          return this._doRender();
      }

      /**
       * Get or set a function to format the value for the display.
       * @see {@link https://github.com/d3/d3-format/blob/master/README.md#format d3.format}
       * @param {Function} [formatter=d3.format('.2s')]
       * @returns {Function|NumberDisplay}
       */
      formatNumber (formatter) {
          if (!arguments.length) {
              return this._formatNumber;
          }
          this._formatNumber = formatter;
          return this;
      }

      /**
       * If set, the Number Display widget will have its aria-live attribute set to 'polite' which will
       * notify screen readers when the widget changes its value. Note that setting this method will also
       * disable the default transition between the old and the new values. This is to avoid change
       * notifications spoken out before the new value finishes re-drawing. It is also advisable to check
       * if the widget has appropriately set accessibility description or label. 
       * @param {Boolean} [ariaLiveRegion=false]
       * @returns {Boolean|NumberDisplay}
       */
      ariaLiveRegion (ariaLiveRegion) {
          if (!arguments.length) {
              return this._ariaLiveRegion;
          }
          this._ariaLiveRegion = ariaLiveRegion;
          return this;
      }

  }

  const numberDisplay = (parent, chartGroup) => new NumberDisplay(parent, chartGroup);

  const DEFAULT_MIN_ANGLE_FOR_LABEL = 0.5;

  /**
   * The pie chart implementation is usually used to visualize a small categorical distribution.  The pie
   * chart uses keyAccessor to determine the slices, and valueAccessor to calculate the size of each
   * slice relative to the sum of all values. Slices are ordered by {@link BaseMixin#ordering ordering}
   * which defaults to sorting by key.
   *
   * Examples:
   * - {@link http://dc-js.github.com/dc.js/ Nasdaq 100 Index}
   * @mixes CapMixin
   * @mixes ColorMixin
   * @mixes BaseMixin
   */
  class PieChart extends CapMixin(ColorMixin(BaseMixin)) {
      /**
       * Create a Pie Chart
       *
       * @example
       * // create a pie chart under #chart-container1 element using the default global chart group
       * var chart1 = new PieChart('#chart-container1');
       * // create a pie chart under #chart-container2 element using chart group A
       * var chart2 = new PieChart('#chart-container2', 'chartGroupA');
       * @param {String|node|d3.selection} parent - Any valid
       * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
       * a dom block element such as a div; or a dom element or d3 selection.
       * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
       * Interaction with a chart will only trigger events and redraws within the chart's group.
       */
      constructor (parent, chartGroup) {
          super();

          this._sliceCssClass = 'pie-slice';
          this._labelCssClass = 'pie-label';
          this._sliceGroupCssClass = 'pie-slice-group';
          this._labelGroupCssClass = 'pie-label-group';
          this._emptyCssClass = 'empty-chart';
          this._emptyTitle = 'empty';

          this._radius = undefined;
          this._givenRadius = undefined; // specified radius, if any
          this._innerRadius = 0;
          this._externalRadiusPadding = 0;


          this._g = undefined;
          this._cx = undefined;
          this._cy = undefined;
          this._minAngleForLabel = DEFAULT_MIN_ANGLE_FOR_LABEL;
          this._externalLabelRadius = undefined;
          this._drawPaths = false;

          this.colorAccessor(d => this.cappedKeyAccessor(d));

          this.title(d => `${this.cappedKeyAccessor(d)}: ${this.cappedValueAccessor(d)}`);

          this.label(d => this.cappedKeyAccessor(d));
          this.renderLabel(true);

          this.transitionDuration(350);
          this.transitionDelay(0);

          this.anchor(parent, chartGroup);
      }

      /**
       * Get or set the maximum number of slices the pie chart will generate. The top slices are determined by
       * value from high to low. Other slices exceeding the cap will be rolled up into one single *Others* slice.
       * @param {Number} [cap]
       * @returns {Number|PieChart}
       */
      slicesCap (cap) {
          return this.cap(cap)
      }

      _doRender () {
          this.resetSvg();

          this._g = this.svg()
              .append('g')
              .attr('transform', `translate(${this.cx()},${this.cy()})`);

          this._g.append('g').attr('class', this._sliceGroupCssClass);
          this._g.append('g').attr('class', this._labelGroupCssClass);

          this._drawChart();

          return this;
      }

      _drawChart () {
          // set radius from chart size if none given, or if given radius is too large
          const maxRadius = d3Array.min([this.width(), this.height()]) / 2;
          this._radius = this._givenRadius && this._givenRadius < maxRadius ? this._givenRadius : maxRadius;

          const arcs = this._buildArcs();

          const pieLayout = this._pieLayout();
          let pieData;
          // if we have data...
          if (d3Array.sum(this.data(), d => this.cappedValueAccessor(d))) {
              pieData = pieLayout(this.data());
              this._g.classed(this._emptyCssClass, false);
          } else {
              // otherwise we'd be getting NaNs, so override
              // note: abuse others for its ignoring the value accessor
              pieData = pieLayout([{key: this._emptyTitle, value: 1, others: [this._emptyTitle]}]);
              this._g.classed(this._emptyCssClass, true);
          }

          if (this._g) {
              const slices = this._g.select(`g.${this._sliceGroupCssClass}`)
                  .selectAll(`g.${this._sliceCssClass}`)
                  .data(pieData);

              const labels = this._g.select(`g.${this._labelGroupCssClass}`)
                  .selectAll(`text.${this._labelCssClass}`)
                  .data(pieData);

              this._removeElements(slices, labels);

              this._createElements(slices, labels, arcs, pieData);

              this._updateElements(pieData, arcs);

              this._highlightFilter();

              transition(this._g, this.transitionDuration(), this.transitionDelay())
                  .attr('transform', `translate(${this.cx()},${this.cy()})`);
          }
      }

      _createElements (slices, labels, arcs, pieData) {
          const slicesEnter = this._createSliceNodes(slices);

          this._createSlicePath(slicesEnter, arcs);

          this._createTitles(slicesEnter);

          this._createLabels(labels, pieData, arcs);
      }

      _createSliceNodes (slices) {
          return slices
              .enter()
              .append('g')
              .attr('class', (d, i) => `${this._sliceCssClass} _${i}`)
              .classed('dc-tabbable', this._keyboardAccessible);
      }

      _createSlicePath (slicesEnter, arcs) {
          const slicePath = slicesEnter.append('path')
              .attr('fill', (d, i) => this._fill(d, i))
              .on('click', d3compat.eventHandler(d => this._onClick(d)))
              .attr('d', (d, i) => this._safeArc(d, i, arcs));

          if (this._keyboardAccessible) {
              this._makeKeyboardAccessible(this._onClick);
          }

          const tranNodes = transition(slicePath, this.transitionDuration(), this.transitionDelay());
          if (tranNodes.attrTween) {
              const chart = this;
              tranNodes.attrTween('d', function (d) {
                  return chart._tweenPie(d, this);
              });
          }
      }

      _createTitles (slicesEnter) {
          if (this.renderTitle()) {
              slicesEnter.append('title').text(d => this.title()(d.data));
          }
      }

      _applyLabelText (labels) {
          labels
              .text(d => {
                  const data = d.data;
                  if ((this._sliceHasNoData(data) || this._sliceTooSmall(d)) && !this._isSelectedSlice(d)) {
                      return '';
                  }
                  return this.label()(d.data);
              });
      }

      _positionLabels (labels, arcs) {
          this._applyLabelText(labels);
          transition(labels, this.transitionDuration(), this.transitionDelay())
              .attr('transform', d => this._labelPosition(d, arcs))
              .attr('text-anchor', 'middle');
      }

      _highlightSlice (i, whether) {
          this.select(`g.pie-slice._${i}`)
              .classed('highlight', whether);
      }

      _createLabels (labels, pieData, arcs) {
          if (this.renderLabel()) {
              const labelsEnter = labels
                  .enter()
                  .append('text')
                  .attr('class', (d, i) => {
                      let classes = `${this._sliceCssClass} ${this._labelCssClass} _${i}`;
                      if (this._externalLabelRadius) {
                          classes += ' external';
                      }
                      return classes;
                  })
                  .on('click', d3compat.eventHandler(d => this._onClick(d)))
                  .on('mouseover', d3compat.eventHandler(d => {
                      this._highlightSlice(d.index, true);
                  }))
                  .on('mouseout', d3compat.eventHandler(d => {
                      this._highlightSlice(d.index, false);
                  }));
              this._positionLabels(labelsEnter, arcs);
              if (this._externalLabelRadius && this._drawPaths) {
                  this._updateLabelPaths(pieData, arcs);
              }
          }
      }

      _updateLabelPaths (pieData, arcs) {
          let polyline = this._g.selectAll(`polyline.${this._sliceCssClass}`)
              .data(pieData);

          polyline.exit().remove();

          polyline = polyline
              .enter()
              .append('polyline')
              .attr('class', (d, i) => `pie-path _${i} ${this._sliceCssClass}`)
              .on('click', d3compat.eventHandler(d => this._onClick(d)))
              .on('mouseover', d3compat.eventHandler(d => {
                  this._highlightSlice(d.index, true);
              }))
              .on('mouseout', d3compat.eventHandler(d => {
                  this._highlightSlice(d.index, false);
              }))
              .merge(polyline);

          const arc2 = d3Shape.arc()
              .outerRadius(this._radius - this._externalRadiusPadding + this._externalLabelRadius)
              .innerRadius(this._radius - this._externalRadiusPadding);
          const tranNodes = transition(polyline, this.transitionDuration(), this.transitionDelay());
          // this is one rare case where d3.selection differs from d3.transition
          if (tranNodes.attrTween) {
              tranNodes
                  .attrTween('points', function (d) {
                      let current = this._current || d;
                      current = {startAngle: current.startAngle, endAngle: current.endAngle};
                      const _interpolate = d3Interpolate.interpolate(current, d);
                      this._current = _interpolate(0);
                      return t => {
                          const d2 = _interpolate(t);
                          return [arcs.centroid(d2), arc2.centroid(d2)];
                      };
                  });
          } else {
              tranNodes.attr('points', d => [arcs.centroid(d), arc2.centroid(d)]);
          }
          tranNodes.style('visibility', d => d.endAngle - d.startAngle < 0.0001 ? 'hidden' : 'visible');

      }

      _updateElements (pieData, arcs) {
          this._updateSlicePaths(pieData, arcs);
          this._updateLabels(pieData, arcs);
          this._updateTitles(pieData);
      }

      _updateSlicePaths (pieData, arcs) {
          const slicePaths = this._g.selectAll(`g.${this._sliceCssClass}`)
              .data(pieData)
              .select('path')
              .attr('d', (d, i) => this._safeArc(d, i, arcs));
          const tranNodes = transition(slicePaths, this.transitionDuration(), this.transitionDelay());
          if (tranNodes.attrTween) {
              const chart = this;
              tranNodes.attrTween('d', function (d) {
                  return chart._tweenPie(d, this);
              });
          }
          tranNodes.attr('fill', (d, i) => this._fill(d, i));
      }

      _updateLabels (pieData, arcs) {
          if (this.renderLabel()) {
              const labels = this._g.selectAll(`text.${this._labelCssClass}`)
                  .data(pieData);
              this._positionLabels(labels, arcs);
              if (this._externalLabelRadius && this._drawPaths) {
                  this._updateLabelPaths(pieData, arcs);
              }
          }
      }

      _updateTitles (pieData) {
          if (this.renderTitle()) {
              this._g.selectAll(`g.${this._sliceCssClass}`)
                  .data(pieData)
                  .select('title')
                  .text(d => this.title()(d.data));
          }
      }

      _removeElements (slices, labels) {
          slices.exit().remove();
          labels.exit().remove();
      }

      _highlightFilter () {
          const chart = this;
          if (this.hasFilter()) {
              this.selectAll(`g.${this._sliceCssClass}`).each(function (d) {
                  if (chart._isSelectedSlice(d)) {
                      chart.highlightSelected(this);
                  } else {
                      chart.fadeDeselected(this);
                  }
              });
          } else {
              this.selectAll(`g.${this._sliceCssClass}`).each(function () {
                  chart.resetHighlight(this);
              });
          }
      }

      /**
       * Get or set the external radius padding of the pie chart. This will force the radius of the
       * pie chart to become smaller or larger depending on the value.
       * @param {Number} [externalRadiusPadding=0]
       * @returns {Number|PieChart}
       */
      externalRadiusPadding (externalRadiusPadding) {
          if (!arguments.length) {
              return this._externalRadiusPadding;
          }
          this._externalRadiusPadding = externalRadiusPadding;
          return this;
      }

      /**
       * Get or set the inner radius of the pie chart. If the inner radius is greater than 0px then the
       * pie chart will be rendered as a doughnut chart.
       * @param {Number} [innerRadius=0]
       * @returns {Number|PieChart}
       */
      innerRadius (innerRadius) {
          if (!arguments.length) {
              return this._innerRadius;
          }
          this._innerRadius = innerRadius;
          return this;
      }

      /**
       * Get or set the outer radius. If the radius is not set, it will be half of the minimum of the
       * chart width and height.
       * @param {Number} [radius]
       * @returns {Number|PieChart}
       */
      radius (radius) {
          if (!arguments.length) {
              return this._givenRadius;
          }
          this._givenRadius = radius;
          return this;
      }

      /**
       * Get or set center x coordinate position. Default is center of svg.
       * @param {Number} [cx]
       * @returns {Number|PieChart}
       */
      cx (cx) {
          if (!arguments.length) {
              return (this._cx || this.width() / 2);
          }
          this._cx = cx;
          return this;
      }

      /**
       * Get or set center y coordinate position. Default is center of svg.
       * @param {Number} [cy]
       * @returns {Number|PieChart}
       */
      cy (cy) {
          if (!arguments.length) {
              return (this._cy || this.height() / 2);
          }
          this._cy = cy;
          return this;
      }

      _buildArcs () {
          return d3Shape.arc()
              .outerRadius(this._radius - this._externalRadiusPadding)
              .innerRadius(this._innerRadius);
      }

      _isSelectedSlice (d) {
          return this.hasFilter(this.cappedKeyAccessor(d.data));
      }

      _doRedraw () {
          this._drawChart();
          return this;
      }

      /**
       * Get or set the minimal slice angle for label rendering. Any slice with a smaller angle will not
       * display a slice label.
       * @param {Number} [minAngleForLabel=0.5]
       * @returns {Number|PieChart}
       */
      minAngleForLabel (minAngleForLabel) {
          if (!arguments.length) {
              return this._minAngleForLabel;
          }
          this._minAngleForLabel = minAngleForLabel;
          return this;
      }

      _pieLayout () {
          return d3Shape.pie().sort(null).value(d => this.cappedValueAccessor(d));
      }

      _sliceTooSmall (d) {
          const angle = (d.endAngle - d.startAngle);
          return isNaN(angle) || angle < this._minAngleForLabel;
      }

      _sliceHasNoData (d) {
          return this.cappedValueAccessor(d) === 0;
      }

      _isOffCanvas (current) {
          return !current || isNaN(current.startAngle) || isNaN(current.endAngle);
      }

      _fill (d, i) {
          return this.getColor(d.data, i);
      }

      _onClick (d) {
          if (this._g.attr('class') !== this._emptyCssClass) {
              this.onClick(d.data);
          }
      }

      _safeArc (d, i, _arc) {
          let path = _arc(d, i);
          if (path.indexOf('NaN') >= 0) {
              path = 'M0,0';
          }
          return path;
      }

      /**
       * Title to use for the only slice when there is no data.
       * @param {String} [title]
       * @returns {String|PieChart}
       */
      emptyTitle (title) {
          if (arguments.length === 0) {
              return this._emptyTitle;
          }
          this._emptyTitle = title;
          return this;
      }

      /**
       * Position slice labels offset from the outer edge of the chart.
       *
       * The argument specifies the extra radius to be added for slice labels.
       * @param {Number} [externalLabelRadius]
       * @returns {Number|PieChart}
       */
      externalLabels (externalLabelRadius) {
          if (arguments.length === 0) {
              return this._externalLabelRadius;
          } else if (externalLabelRadius) {
              this._externalLabelRadius = externalLabelRadius;
          } else {
              this._externalLabelRadius = undefined;
          }

          return this;
      }

      /**
       * Get or set whether to draw lines from pie slices to their labels.
       *
       * @param {Boolean} [drawPaths]
       * @returns {Boolean|PieChart}
       */
      drawPaths (drawPaths) {
          if (arguments.length === 0) {
              return this._drawPaths;
          }
          this._drawPaths = drawPaths;
          return this;
      }

      _labelPosition (d, _arc) {
          let centroid;
          if (this._externalLabelRadius) {
              centroid = d3Shape.arc()
                  .outerRadius(this._radius - this._externalRadiusPadding + this._externalLabelRadius)
                  .innerRadius(this._radius - this._externalRadiusPadding + this._externalLabelRadius)
                  .centroid(d);
          } else {
              centroid = _arc.centroid(d);
          }
          if (isNaN(centroid[0]) || isNaN(centroid[1])) {
              return 'translate(0,0)';
          } else {
              return `translate(${centroid})`;
          }
      }

      legendables () {
          return this.data().map((d, i) => {
              const legendable = {name: d.key, data: d.value, others: d.others, chart: this};
              legendable.color = this.getColor(d, i);
              return legendable;
          });
      }

      legendHighlight (d) {
          this._highlightSliceFromLegendable(d, true);
      }

      legendReset (d) {
          this._highlightSliceFromLegendable(d, false);
      }

      legendToggle (d) {
          this.onClick({key: d.name, others: d.others});
      }

      _highlightSliceFromLegendable (legendable, highlighted) {
          this.selectAll('g.pie-slice').each(function (d) {
              if (legendable.name === d.data.key) {
                  d3Selection.select(this).classed('highlight', highlighted);
              }
          });
      }

      _tweenPie (b, element) {
          b.innerRadius = this._innerRadius;
          let current = element._current;
          if (this._isOffCanvas(current)) {
              current = {startAngle: 0, endAngle: 0};
          } else {
              // only interpolate startAngle & endAngle, not the whole data object
              current = {startAngle: current.startAngle, endAngle: current.endAngle};
          }
          const i = d3Interpolate.interpolate(current, b);
          element._current = i(0);
          return t => this._safeArc(i(t), 0, this._buildArcs());
      }


  }

  const pieChart = (parent, chartGroup) => new PieChart(parent, chartGroup);

  /**
   * Concrete row chart implementation.
   *
   * Examples:
   * - {@link http://dc-js.github.com/dc.js/ Nasdaq 100 Index}
   * @mixes CapMixin
   * @mixes MarginMixin
   * @mixes ColorMixin
   * @mixes BaseMixin
   */
  class RowChart extends CapMixin(ColorMixin(MarginMixin)) {
      /**
       * Create a Row Chart.
       * @example
       * // create a row chart under #chart-container1 element using the default global chart group
       * var chart1 = new RowChart('#chart-container1');
       * // create a row chart under #chart-container2 element using chart group A
       * var chart2 = new RowChart('#chart-container2', 'chartGroupA');
       * @param {String|node|d3.selection} parent - Any valid
       * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
       * a dom block element such as a div; or a dom element or d3 selection.
       * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
       * Interaction with a chart will only trigger events and redraws within the chart's group.
       */
      constructor (parent, chartGroup) {
          super();

          this._g = undefined;

          this._labelOffsetX = 10;
          this._labelOffsetY = 15;
          this._hasLabelOffsetY = false;
          this._dyOffset = '0.35em'; // this helps center labels https://github.com/d3/d3-3.x-api-reference/blob/master/SVG-Shapes.md#svg_text
          this._titleLabelOffsetX = 2;

          this._gap = 5;

          this._fixedBarHeight = false;
          this._rowCssClass = 'row';
          this._titleRowCssClass = 'titlerow';
          this._renderTitleLabel = false;

          this._x = undefined;

          this._elasticX = undefined;

          this._xAxis = d3Axis.axisBottom();

          this._rowData = undefined;

          this.rowsCap = this.cap;

          this.title(d => `${this.cappedKeyAccessor(d)}: ${this.cappedValueAccessor(d)}`);

          this.label(d => this.cappedKeyAccessor(d));

          this.anchor(parent, chartGroup);
      }

      _calculateAxisScale () {
          if (!this._x || this._elasticX) {
              const _extent = d3Array.extent(this._rowData, d => this.cappedValueAccessor(d));
              if (_extent[0] > 0) {
                  _extent[0] = 0;
              }
              if (_extent[1] < 0) {
                  _extent[1] = 0;
              }
              this._x = d3Scale.scaleLinear().domain(_extent)
                  .range([0, this.effectiveWidth()]);
          }
          this._xAxis.scale(this._x);
      }

      _drawAxis () {
          let axisG = this._g.select('g.axis');

          this._calculateAxisScale();

          if (axisG.empty()) {
              axisG = this._g.append('g').attr('class', 'axis');
          }
          axisG.attr('transform', `translate(0, ${this.effectiveHeight()})`);

          transition(axisG, this.transitionDuration(), this.transitionDelay())
              .call(this._xAxis);
      }

      _doRender () {
          this.resetSvg();

          this._g = this.svg()
              .append('g')
              .attr('transform', `translate(${this.margins().left},${this.margins().top})`);

          this._drawChart();

          return this;
      }

      /**
       * Gets or sets the x scale. The x scale can be any d3
       * {@link https://github.com/d3/d3-scale/blob/master/README.md d3.scale}.
       * @see {@link https://github.com/d3/d3-scale/blob/master/README.md d3.scale}
       * @param {d3.scale} [scale]
       * @returns {d3.scale|RowChart}
       */
      x (scale) {
          if (!arguments.length) {
              return this._x;
          }
          this._x = scale;
          return this;
      }

      _drawGridLines () {
          this._g.selectAll('g.tick')
              .select('line.grid-line')
              .remove();

          this._g.selectAll('g.tick')
              .append('line')
              .attr('class', 'grid-line')
              .attr('x1', 0)
              .attr('y1', 0)
              .attr('x2', 0)
              .attr('y2', () => -this.effectiveHeight());
      }

      _drawChart () {
          this._rowData = this.data();

          this._drawAxis();
          this._drawGridLines();

          let rows = this._g.selectAll(`g.${this._rowCssClass}`)
              .data(this._rowData);

          this._removeElements(rows);
          rows = this._createElements(rows)
              .merge(rows);
          this._updateElements(rows);
      }

      _createElements (rows) {
          const rowEnter = rows.enter()
              .append('g')
              .attr('class', (d, i) => `${this._rowCssClass} _${i}`);

          rowEnter.append('rect').attr('width', 0);

          this._createLabels(rowEnter);

          return rowEnter;
      }

      _removeElements (rows) {
          rows.exit().remove();
      }

      _rootValue () {
          const root = this._x(0);
          return (root === -Infinity || root !== root) ? this._x(1) : root;
      }

      _updateElements (rows) {
          const n = this._rowData.length;

          let height;
          if (!this._fixedBarHeight) {
              height = (this.effectiveHeight() - (n + 1) * this._gap) / n;
          } else {
              height = this._fixedBarHeight;
          }

          // vertically align label in center unless they override the value via property setter
          if (!this._hasLabelOffsetY) {
              this._labelOffsetY = height / 2;
          }

          const rect = rows.attr('transform', (d, i) => `translate(0,${(i + 1) * this._gap + i * height})`).select('rect')
              .attr('height', height)
              .attr('fill', this.getColor)
              .on('click', d3compat.eventHandler(d => this._onClick(d)))
              .classed('dc-tabbable', this._keyboardAccessible)
              .classed('deselected', d => (this.hasFilter()) ? !this._isSelectedRow(d) : false)
              .classed('selected', d => (this.hasFilter()) ? this._isSelectedRow(d) : false);

          if (this._keyboardAccessible) {
              this._makeKeyboardAccessible(d => this._onClick(d));
          }

          transition(rect, this.transitionDuration(), this.transitionDelay())
              .attr('width', d => Math.abs(this._rootValue() - this._x(this.cappedValueAccessor(d))))
              .attr('transform', d => this._translateX(d));

          this._createTitles(rows);
          this._updateLabels(rows);
      }

      _createTitles (rows) {
          if (this.renderTitle()) {
              rows.select('title').remove();
              rows.append('title').text(this.title());
          }
      }

      _createLabels (rowEnter) {
          if (this.renderLabel()) {
              rowEnter.append('text')
                  .on('click', d3compat.eventHandler(d => this._onClick(d)));
          }
          if (this.renderTitleLabel()) {
              rowEnter.append('text')
                  .attr('class', this._titleRowCssClass)
                  .on('click', d3compat.eventHandler(d => this._onClick(d)));
          }
      }

      _updateLabels (rows) {
          if (this.renderLabel()) {
              const lab = rows.select('text')
                  .attr('x', this._labelOffsetX)
                  .attr('y', this._labelOffsetY)
                  .attr('dy', this._dyOffset)
                  .on('click', d3compat.eventHandler(d => this._onClick(d)))
                  .attr('class', (d, i) => `${this._rowCssClass} _${i}`)
                  .text(d => this.label()(d));
              transition(lab, this.transitionDuration(), this.transitionDelay())
                  .attr('transform', d => this._translateX(d));
          }
          if (this.renderTitleLabel()) {
              const titlelab = rows.select(`.${this._titleRowCssClass}`)
                  .attr('x', this.effectiveWidth() - this._titleLabelOffsetX)
                  .attr('y', this._labelOffsetY)
                  .attr('dy', this._dyOffset)
                  .attr('text-anchor', 'end')
                  .on('click', d3compat.eventHandler(d => this._onClick(d)))
                  .attr('class', (d, i) => `${this._titleRowCssClass} _${i}`)
                  .text(d => this.title()(d));
              transition(titlelab, this.transitionDuration(), this.transitionDelay())
                  .attr('transform', d => this._translateX(d));
          }
      }

      /**
       * Turn on/off Title label rendering (values) using SVG style of text-anchor 'end'.
       * @param {Boolean} [renderTitleLabel=false]
       * @returns {Boolean|RowChart}
       */
      renderTitleLabel (renderTitleLabel) {
          if (!arguments.length) {
              return this._renderTitleLabel;
          }
          this._renderTitleLabel = renderTitleLabel;
          return this;
      }

      _onClick (d) {
          this.onClick(d);
      }

      _translateX (d) {
          const x = this._x(this.cappedValueAccessor(d)),
              x0 = this._rootValue(),
              s = x > x0 ? x0 : x;
          return `translate(${s},0)`;
      }

      _doRedraw () {
          this._drawChart();
          return this;
      }

      /**
       * Get or sets the x axis for the row chart instance.
       * See the {@link https://github.com/d3/d3-axis/blob/master/README.md d3.axis}
       * documention for more information.
       * @param {d3.axis} [xAxis]
       * @example
       * // customize x axis tick format
       * chart.xAxis().tickFormat(function (v) {return v + '%';});
       * // customize x axis tick values
       * chart.xAxis().tickValues([0, 100, 200, 300]);
       * // use a top-oriented axis. Note: position of the axis and grid lines will need to
       * // be set manually, see https://dc-js.github.io/dc.js/examples/row-top-axis.html
       * chart.xAxis(d3.axisTop())
       * @returns {d3.axis|RowChart}
       */
      xAxis (xAxis) {
          if (!arguments.length) {
              return this._xAxis;
          }
          this._xAxis = xAxis;
          return this;
      }

      /**
       * Get or set the fixed bar height. Default is [false] which will auto-scale bars.
       * For example, if you want to fix the height for a specific number of bars (useful in TopN charts)
       * you could fix height as follows (where count = total number of bars in your TopN and gap is
       * your vertical gap space).
       * @example
       * chart.fixedBarHeight( chartheight - (count + 1) * gap / count);
       * @param {Boolean|Number} [fixedBarHeight=false]
       * @returns {Boolean|Number|RowChart}
       */
      fixedBarHeight (fixedBarHeight) {
          if (!arguments.length) {
              return this._fixedBarHeight;
          }
          this._fixedBarHeight = fixedBarHeight;
          return this;
      }

      /**
       * Get or set the vertical gap space between rows on a particular row chart instance.
       * @param {Number} [gap=5]
       * @returns {Number|RowChart}
       */
      gap (gap) {
          if (!arguments.length) {
              return this._gap;
          }
          this._gap = gap;
          return this;
      }

      /**
       * Get or set the elasticity on x axis. If this attribute is set to true, then the x axis will rescale to auto-fit the
       * data range when filtered.
       * @param {Boolean} [elasticX]
       * @returns {Boolean|RowChart}
       */
      elasticX (elasticX) {
          if (!arguments.length) {
              return this._elasticX;
          }
          this._elasticX = elasticX;
          return this;
      }

      /**
       * Get or set the x offset (horizontal space to the top left corner of a row) for labels on a particular row chart.
       * @param {Number} [labelOffsetX=10]
       * @returns {Number|RowChart}
       */
      labelOffsetX (labelOffsetX) {
          if (!arguments.length) {
              return this._labelOffsetX;
          }
          this._labelOffsetX = labelOffsetX;
          return this;
      }

      /**
       * Get or set the y offset (vertical space to the top left corner of a row) for labels on a particular row chart.
       * @param {Number} [labelOffsety=15]
       * @returns {Number|RowChart}
       */
      labelOffsetY (labelOffsety) {
          if (!arguments.length) {
              return this._labelOffsetY;
          }
          this._labelOffsetY = labelOffsety;
          this._hasLabelOffsetY = true;
          return this;
      }

      /**
       * Get of set the x offset (horizontal space between right edge of row and right edge or text.
       * @param {Number} [titleLabelOffsetX=2]
       * @returns {Number|RowChart}
       */
      titleLabelOffsetX (titleLabelOffsetX) {
          if (!arguments.length) {
              return this._titleLabelOffsetX;
          }
          this._titleLabelOffsetX = titleLabelOffsetX;
          return this;
      }

      _isSelectedRow (d) {
          return this.hasFilter(this.cappedKeyAccessor(d));
      }
  }

  const rowChart = (parent, chartGroup) => new RowChart(parent, chartGroup);

  /**
   * A scatter plot chart
   *
   * Examples:
   * - {@link http://dc-js.github.io/dc.js/examples/scatter.html Scatter Chart}
   * - {@link http://dc-js.github.io/dc.js/examples/multi-scatter.html Multi-Scatter Chart}
   * @mixes CoordinateGridMixin
   */
  class ScatterPlot extends CoordinateGridMixin {
      /**
       * Create a Scatter Plot.
       * @example
       * // create a scatter plot under #chart-container1 element using the default global chart group
       * var chart1 = new ScatterPlot('#chart-container1');
       * // create a scatter plot under #chart-container2 element using chart group A
       * var chart2 = new ScatterPlot('#chart-container2', 'chartGroupA');
       * // create a sub-chart under a composite parent chart
       * var chart3 = new ScatterPlot(compositeChart);
       * @param {String|node|d3.selection} parent - Any valid
       * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
       * a dom block element such as a div; or a dom element or d3 selection.
       * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
       * Interaction with a chart will only trigger events and redraws within the chart's group.
       */
      constructor (parent, chartGroup) {
          super();

          this._symbol = d3Shape.symbol();

          this._existenceAccessor = d => d.value;

          const originalKeyAccessor = this.keyAccessor();
          this.keyAccessor(d => originalKeyAccessor(d)[0]);
          this.valueAccessor(d => originalKeyAccessor(d)[1]);
          this.colorAccessor(() => this._groupName);

          // this basically just counteracts the setting of its own key/value accessors
          // see https://github.com/dc-js/dc.js/issues/702
          this.title(d => `${this.keyAccessor()(d)},${this.valueAccessor()(d)}: ${this.existenceAccessor()(d)}`);

          this._highlightedSize = 7;
          this._symbolSize = 5;
          this._excludedSize = 3;
          this._excludedColor = null;
          this._excludedOpacity = 1.0;
          this._emptySize = 0;
          this._emptyOpacity = 0;
          this._nonemptyOpacity = 1;
          this._emptyColor = null;
          this._filtered = [];
          this._canvas = null;
          this._context = null;
          this._useCanvas = false;


          // Use a 2 dimensional brush
          this.brush(d3Brush.brush());

          this._symbol.size((d, i) => this._elementSize(d, i));

          this.anchor(parent, chartGroup);
      }

      // Calculates element radius for canvas plot to be comparable to D3 area based symbol sizes
      _canvasElementSize (d, isFiltered) {
          if (!this._existenceAccessor(d)) {
              return this._emptySize / Math.sqrt(Math.PI);
          } else if (isFiltered) {
              return this._symbolSize / Math.sqrt(Math.PI);
          } else {
              return this._excludedSize / Math.sqrt(Math.PI);
          }
      }

      _elementSize (d, i) {
          if (!this._existenceAccessor(d)) {
              return Math.pow(this._emptySize, 2);
          } else if (this._filtered[i]) {
              return Math.pow(this._symbolSize, 2);
          } else {
              return Math.pow(this._excludedSize, 2);
          }
      }

      _locator (d) {
          return `translate(${this.x()(this.keyAccessor()(d))},${ 
            this.y()(this.valueAccessor()(d))})`;
      }

      filter (filter) {
          if (!arguments.length) {
              return super.filter();
          }

          return super.filter(filters.RangedTwoDimensionalFilter(filter));
      }

      /**
       * Method that replaces original resetSvg and appropriately inserts canvas
       * element along with svg element and sets their CSS properties appropriately
       * so they are overlapped on top of each other.
       * Remove the chart's SVGElements from the dom and recreate the container SVGElement.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/SVGElement SVGElement}
       * @returns {SVGElement}
       */
      resetSvg () {
          if (!this._useCanvas) {
              return super.resetSvg();
          } else {
              super.resetSvg(); // Perform original svgReset inherited from baseMixin
              this.select('canvas').remove(); // remove old canvas

              const svgSel = this.svg();
              const rootSel = this.root();

              // Set root node to relative positioning and svg to absolute
              rootSel.style('position', 'relative');
              svgSel.style('position', 'relative');

              // Check if SVG element already has any extra top/left CSS offsets
              const svgLeft = isNaN(parseInt(svgSel.style('left'), 10)) ? 0 : parseInt(svgSel.style('left'), 10);
              const svgTop = isNaN(parseInt(svgSel.style('top'), 10)) ? 0 : parseInt(svgSel.style('top'), 10);
              const width = this.effectiveWidth();
              const height = this.effectiveHeight();
              const margins = this.margins(); // {top: 10, right: 130, bottom: 42, left: 42}

              // Add the canvas element such that it perfectly overlaps the plot area of the scatter plot SVG
              const devicePixelRatio = window.devicePixelRatio || 1;
              this._canvas = this.root().append('canvas')
                  .attr('x', 0)
                  .attr('y', 0)
                  .attr('width', (width) * devicePixelRatio)
                  .attr('height', (height) * devicePixelRatio)
                  .style('width', `${width}px`)
                  .style('height', `${height}px`)
                  .style('position', 'absolute')
                  .style('top', `${margins.top + svgTop}px`)
                  .style('left', `${margins.left + svgLeft}px`)
                  .style('z-index', -1) // Place behind SVG
                  .style('pointer-events', 'none'); // Disable pointer events on canvas so SVG can capture brushing

              // Define canvas context and set clipping path
              this._context = this._canvas.node().getContext('2d');
              this._context.scale(devicePixelRatio, devicePixelRatio);
              this._context.rect(0, 0, width, height);
              this._context.clip(); // Setup clipping path
              this._context.imageSmoothingQuality = 'high';

              return this.svg(); // Respect original return param for this.resetSvg;
          }
      }

      _resizeCanvas () {
          const width = this.effectiveWidth();
          const height = this.effectiveHeight();

          const devicePixelRatio = window.devicePixelRatio || 1;
          this._canvas
              .attr('width', (width) * devicePixelRatio)
              .attr('height', (height) * devicePixelRatio)
              .style('width', `${width}px`)
              .style('height', `${height}px`);
          this._context.scale(devicePixelRatio, devicePixelRatio);
      }


      /**
       * Set or get whether to use canvas backend for plotting scatterPlot. Note that the
       * canvas backend does not currently support
       * {@link ScatterPlot#customSymbol customSymbol} or
       * {@link ScatterPlot#symbol symbol} methods and is limited to always plotting
       * with filled circles. Symbols are drawn with
       * {@link ScatterPlot#symbolSize symbolSize} radius. By default, the SVG backend
       * is used when `useCanvas` is set to `false`.
       * @param {Boolean} [useCanvas=false]
       * @return {Boolean|d3.selection}
       */
      useCanvas (useCanvas) {
          if (!arguments.length) {
              return this._useCanvas;
          }
          this._useCanvas = useCanvas;
          return this;
      }

      /**
       * Set or get canvas element. You should usually only ever use the get method as
       * dc.js will handle canvas element generation.  Provides valid canvas only when
       * {@link ScatterPlot#useCanvas useCanvas} is set to `true`
       * @param {CanvasElement|d3.selection} [canvasElement]
       * @return {CanvasElement|d3.selection}
       */
      canvas (canvasElement) {
          if (!arguments.length) {
              return this._canvas;
          }
          this._canvas = canvasElement;
          return this;
      }

      /**
       * Get canvas 2D context. Provides valid context only when
       * {@link ScatterPlot#useCanvas useCanvas} is set to `true`
       * @return {CanvasContext}
       */
      context () {
          return this._context;
      }

      /*eslint complexity: [2,11] */
      // Plots data on canvas element. If argument provided, assumes legend is
      // currently being highlighted and modifies opacity/size of symbols accordingly
      // @param {Object} [legendHighlightDatum] - Datum provided to legendHighlight method
      _plotOnCanvas (legendHighlightDatum) {
          this._resizeCanvas();
          const context = this.context();
          context.clearRect(0, 0, (context.canvas.width + 2) * 1, (context.canvas.height + 2) * 1);
          const data = this.data();

          // Draw the data on canvas
          data.forEach((d, i) => {
              const isFiltered = !this.filter() || this.filter().isFiltered([d.key[0], d.key[1]]);
              // Calculate opacity for current data point
              let cOpacity = 1;
              if (!this._existenceAccessor(d)) {
                  cOpacity = this._emptyOpacity;
              } else if (isFiltered) {
                  cOpacity = this._nonemptyOpacity;
              } else {
                  cOpacity = this.excludedOpacity();
              }
              // Calculate color for current data point
              let cColor = null;
              if (this._emptyColor && !this._existenceAccessor(d)) {
                  cColor = this._emptyColor;
              } else if (this.excludedColor() && !isFiltered) {
                  cColor = this.excludedColor();
              } else {
                  cColor = this.getColor(d);
              }
              let cSize = this._canvasElementSize(d, isFiltered);

              // Adjust params for data points if legend is highlighted
              if (legendHighlightDatum) {
                  const isHighlighted = (cColor === legendHighlightDatum.color);
                  // Calculate opacity for current data point
                  const fadeOutOpacity = 0.1; // TODO: Make this programmatically setable
                  if (!isHighlighted) { // Fade out non-highlighted colors + highlighted colors outside filter
                      cOpacity = fadeOutOpacity;
                  }
                  if (isHighlighted) { // Set size for highlighted color data points
                      cSize = this._highlightedSize / Math.sqrt(Math.PI);
                  }
              }

              // Draw point on canvas
              context.save();
              context.globalAlpha = cOpacity;
              context.beginPath();
              context.arc(this.x()(this.keyAccessor()(d)), this.y()(this.valueAccessor()(d)), cSize, 0, 2 * Math.PI, true);
              context.fillStyle = cColor;
              context.fill();
              // context.lineWidth = 0.5; // Commented out code to add stroke around scatter points if desired
              // context.strokeStyle = '#333';
              // context.stroke();
              context.restore();
          });
      }

      _plotOnSVG () {

          const data = this.data();

          if (this._keyboardAccessible) {
              // sort based on the x value (key)
              data.sort((a, b) => d3Array.ascending(this.keyAccessor()(a), this.keyAccessor()(b)));
          }

          let symbols = this.chartBodyG().selectAll('path.symbol')
              .data(data);

          transition(symbols.exit(), this.transitionDuration(), this.transitionDelay())
              .attr('opacity', 0).remove();

          symbols = symbols
              .enter()
              .append('path')
              .attr('class', 'symbol')
              .classed('dc-tabbable', this._keyboardAccessible)
              .attr('opacity', 0)
              .attr('fill', this.getColor)
              .attr('transform', d => this._locator(d))
              .merge(symbols);

          // no click handler - just tabindex for reading out of tooltips
          if (this._keyboardAccessible) {
              this._makeKeyboardAccessible();
              symbols.order();
          }

          symbols.call(s => this._renderTitles(s, data));

          symbols.each((d, i) => {
              this._filtered[i] = !this.filter() || this.filter().isFiltered([this.keyAccessor()(d), this.valueAccessor()(d)]);
          });

          transition(symbols, this.transitionDuration(), this.transitionDelay())
              .attr('opacity', (d, i) => {
                  if (!this._existenceAccessor(d)) {
                      return this._emptyOpacity;
                  } else if (this._filtered[i]) {
                      return this._nonemptyOpacity;
                  } else {
                      return this.excludedOpacity();
                  }
              })
              .attr('fill', (d, i) => {
                  if (this._emptyColor && !this._existenceAccessor(d)) {
                      return this._emptyColor;
                  } else if (this.excludedColor() && !this._filtered[i]) {
                      return this.excludedColor();
                  } else {
                      return this.getColor(d);
                  }
              })
              .attr('transform', d => this._locator(d))
              .attr('d', this._symbol);
      }

      plotData () {
          if (this._useCanvas) {
              this._plotOnCanvas();
          } else {
              this._plotOnSVG();
          }
      }

      _renderTitles (_symbol, _d) {
          if (this.renderTitle()) {
              _symbol.selectAll('title').remove();
              _symbol.append('title').text(d => this.title()(d));
          }
      }

      /**
       * Get or set the existence accessor.  If a point exists, it is drawn with
       * {@link ScatterPlot#symbolSize symbolSize} radius and
       * opacity 1; if it does not exist, it is drawn with
       * {@link ScatterPlot#emptySize emptySize} radius and opacity 0. By default,
       * the existence accessor checks if the reduced value is truthy.
       * @see {@link ScatterPlot#symbolSize symbolSize}
       * @see {@link ScatterPlot#emptySize emptySize}
       * @example
       * // default accessor
       * chart.existenceAccessor(function (d) { return d.value; });
       * @param {Function} [accessor]
       * @returns {Function|ScatterPlot}
       */
      existenceAccessor (accessor) {
          if (!arguments.length) {
              return this._existenceAccessor;
          }
          this._existenceAccessor = accessor;
          return this;
      }

      /**
       * Get or set the symbol type used for each point. By default the symbol is a circle (d3.symbolCircle).
       * Type can be a constant or an accessor.
       * @see {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol_type symbol.type}
       * @example
       * // Circle type
       * chart.symbol(d3.symbolCircle);
       * // Square type
       * chart.symbol(d3.symbolSquare);
       * @param {Function} [type=d3.symbolCircle]
       * @returns {Function|ScatterPlot}
       */
      symbol (type) {
          if (!arguments.length) {
              return this._symbol.type();
          }
          this._symbol.type(type);
          return this;
      }

      /**
       * Get or set the symbol generator. By default `ScatterPlot` will use
       * {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol d3.symbol()}
       * to generate symbols. `ScatterPlot` will set the
       * {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol_size symbol size accessor}
       * on the symbol generator.
       * @see {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol d3.symbol}
       * @see {@link https://stackoverflow.com/questions/25332120/create-additional-d3-js-symbols Create additional D3.js symbols}
       * @param {String|Function} [customSymbol=d3.symbol()]
       * @returns {String|Function|ScatterPlot}
       */
      customSymbol (customSymbol) {
          if (!arguments.length) {
              return this._symbol;
          }
          this._symbol = customSymbol;
          this._symbol.size((d, i) => this._elementSize(d, i));
          return this;
      }

      /**
       * Set or get radius for symbols.
       * @see {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol_size d3.symbol.size}
       * @param {Number} [symbolSize=3]
       * @returns {Number|ScatterPlot}
       */
      symbolSize (symbolSize) {
          if (!arguments.length) {
              return this._symbolSize;
          }
          this._symbolSize = symbolSize;
          return this;
      }

      /**
       * Set or get radius for highlighted symbols.
       * @see {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol_size d3.symbol.size}
       * @param {Number} [highlightedSize=5]
       * @returns {Number|ScatterPlot}
       */
      highlightedSize (highlightedSize) {
          if (!arguments.length) {
              return this._highlightedSize;
          }
          this._highlightedSize = highlightedSize;
          return this;
      }

      /**
       * Set or get size for symbols excluded from this chart's filter. If null, no
       * special size is applied for symbols based on their filter status.
       * @see {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol_size d3.symbol.size}
       * @param {Number} [excludedSize=null]
       * @returns {Number|ScatterPlot}
       */
      excludedSize (excludedSize) {
          if (!arguments.length) {
              return this._excludedSize;
          }
          this._excludedSize = excludedSize;
          return this;
      }

      /**
       * Set or get color for symbols excluded from this chart's filter. If null, no
       * special color is applied for symbols based on their filter status.
       * @param {Number} [excludedColor=null]
       * @returns {Number|ScatterPlot}
       */
      excludedColor (excludedColor) {
          if (!arguments.length) {
              return this._excludedColor;
          }
          this._excludedColor = excludedColor;
          return this;
      }

      /**
       * Set or get opacity for symbols excluded from this chart's filter.
       * @param {Number} [excludedOpacity=1.0]
       * @returns {Number|ScatterPlot}
       */
      excludedOpacity (excludedOpacity) {
          if (!arguments.length) {
              return this._excludedOpacity;
          }
          this._excludedOpacity = excludedOpacity;
          return this;
      }

      /**
       * Set or get radius for symbols when the group is empty.
       * @see {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol_size d3.symbol.size}
       * @param {Number} [emptySize=0]
       * @returns {Number|ScatterPlot}
       */
      emptySize (emptySize) {
          if (!arguments.length) {
              return this._emptySize;
          }
          this._emptySize = emptySize;
          return this;
      }

      hiddenSize (emptySize) {
          if (!arguments.length) {
              return this.emptySize();
          }
          return this.emptySize(emptySize);
      }

      /**
       * Set or get color for symbols when the group is empty. If null, just use the
       * {@link ColorMixin#colors colorMixin.colors} color scale zero value.
       * @param {String} [emptyColor=null]
       * @return {String}
       * @return {ScatterPlot}/
       */
      emptyColor (emptyColor) {
          if (!arguments.length) {
              return this._emptyColor;
          }
          this._emptyColor = emptyColor;
          return this;
      }

      /**
       * Set or get opacity for symbols when the group is empty.
       * @param {Number} [emptyOpacity=0]
       * @return {Number}
       * @return {ScatterPlot}
       */
      emptyOpacity (emptyOpacity) {
          if (!arguments.length) {
              return this._emptyOpacity;
          }
          this._emptyOpacity = emptyOpacity;
          return this;
      }

      /**
       * Set or get opacity for symbols when the group is not empty.
       * @param {Number} [nonemptyOpacity=1]
       * @return {Number}
       * @return {ScatterPlot}
       */
      nonemptyOpacity (nonemptyOpacity) {
          if (!arguments.length) {
              return this._emptyOpacity;
          }
          this._nonemptyOpacity = nonemptyOpacity;
          return this;
      }

      legendables () {
          return [{chart: this, name: this._groupName, color: this.getColor()}];
      }

      legendHighlight (d) {
          if (this._useCanvas) {
              this._plotOnCanvas(d); // Supply legend datum to plotOnCanvas
          } else {
              this._resizeSymbolsWhere(s => s.attr('fill') === d.color, this._highlightedSize);
              this.chartBodyG().selectAll('.chart-body path.symbol').filter(function () {
                  return d3Selection.select(this).attr('fill') !== d.color;
              }).classed('fadeout', true);
          }
      }

      legendReset (d) {
          if (this._useCanvas) {
              this._plotOnCanvas(d); // Supply legend datum to plotOnCanvas
          } else {
              this._resizeSymbolsWhere(s => s.attr('fill') === d.color, this._symbolSize);
              this.chartBodyG().selectAll('.chart-body path.symbol').filter(function () {
                  return d3Selection.select(this).attr('fill') !== d.color;
              }).classed('fadeout', false);
          }
      }

      _resizeSymbolsWhere (condition, size) {
          const symbols = this.chartBodyG().selectAll('.chart-body path.symbol').filter(function () {
              return condition(d3Selection.select(this));
          });
          const oldSize = this._symbol.size();
          this._symbol.size(Math.pow(size, 2));
          transition(symbols, this.transitionDuration(), this.transitionDelay()).attr('d', this._symbol);
          this._symbol.size(oldSize);
      }
      createBrushHandlePaths () {
          // no handle paths for poly-brushes
      }

      extendBrush (brushSelection) {
          if (this.round()) {
              brushSelection[0] = brushSelection[0].map(this.round());
              brushSelection[1] = brushSelection[1].map(this.round());
          }
          return brushSelection;
      }

      brushIsEmpty (brushSelection) {
          return !brushSelection || brushSelection[0][0] >= brushSelection[1][0] || brushSelection[0][1] >= brushSelection[1][1];
      }

      _brushing (evt) {
          if (this._ignoreBrushEvents) {
              return;
          }

          let brushSelection = evt.selection;

          // Testing with pixels is more reliable
          let brushIsEmpty = this.brushIsEmpty(brushSelection);

          if (brushSelection) {
              brushSelection = brushSelection.map(point => point.map((coord, i) => {
                  const scale = i === 0 ? this.x() : this.y();
                  return scale.invert(coord);
              }));

              brushSelection = this.extendBrush(brushSelection);

              // The rounding process might have made brushSelection empty, so we need to recheck
              brushIsEmpty = brushIsEmpty && this.brushIsEmpty(brushSelection);
          }

          this.redrawBrush(brushSelection, false);

          const ranged2DFilter = brushIsEmpty ? null : filters.RangedTwoDimensionalFilter(brushSelection);

          events.trigger(() => {
              this.replaceFilter(ranged2DFilter);
              this.redrawGroup();
          }, constants.EVENT_DELAY);
      }

      redrawBrush (brushSelection, doTransition) {
          // override default x axis brush from parent chart
          this._gBrush = this.gBrush();

          if (this.brushOn() && this._gBrush) {
              if (this.resizing()) {
                  this.setBrushExtents(doTransition);
              }

              if (!brushSelection) {
                  this._withoutBrushEvents(() => {
                      this._gBrush
                          .call(this.brush().move, brushSelection);
                  });
              } else {
                  brushSelection = brushSelection.map(point => point.map((coord, i) => {
                      const scale = i === 0 ? this.x() : this.y();
                      return scale(coord);
                  }));

                  const gBrush =
                      optionalTransition(doTransition, this.transitionDuration(), this.transitionDelay())(this._gBrush);

                  this._withoutBrushEvents(() => {
                      gBrush
                          .call(this.brush().move, brushSelection);
                  });
              }
          }

          this.fadeDeselectedArea(brushSelection);
      }
  }

  const scatterPlot = (parent, chartGroup) => new ScatterPlot(parent, chartGroup);

  const SELECT_CSS_CLASS = 'dc-select-menu';
  const OPTION_CSS_CLASS = 'dc-select-option';

  /**
   * The select menu is a simple widget designed to filter a dimension by selecting an option from
   * an HTML `<select/>` menu. The menu can be optionally turned into a multiselect.
   * @mixes BaseMixin
   */
  class SelectMenu extends BaseMixin {
      /**
       * Create a Select Menu.
       * @example
       * // create a select menu under #select-container using the default global chart group
       * var select = new SelectMenu('#select-container')
       *                .dimension(states)
       *                .group(stateGroup);
       * // the option text can be set via the title() function
       * // by default the option text is '`key`: `value`'
       * select.title(function (d){
       *     return 'STATE: ' + d.key;
       * })
       * @param {String|node|d3.selection|CompositeChart} parent - Any valid
       * [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying
       * a dom block element such as a div; or a dom element or d3 selection.
       * @param {String} [chartGroup] - The name of the chart group this widget should be placed in.
       * Interaction with the widget will only trigger events and redraws within its group.
       */
      constructor (parent, chartGroup) {
          super();

          this._select = undefined;
          this._promptText = 'Select all';
          this._multiple = false;
          this._promptValue = null;
          this._numberVisible = null;

          this.data(group => group.all().filter(this._filterDisplayed));

          this._filterDisplayed = d => this.valueAccessor()(d) > 0;

          this._order = (a, b) => {
              if (this.keyAccessor()(a) > this.keyAccessor()(b)) {
                  return 1;
              }
              if (this.keyAccessor()(a) < this.keyAccessor()(b)) {
                  return -1;
              }
              return 0;
          };

          this.anchor(parent, chartGroup);
      }

      _doRender () {
          this.select('select').remove();
          this._select = this.root().append('select')
              .classed(SELECT_CSS_CLASS, true);
          this._select.append('option').text(this._promptText).attr('value', '');

          this._doRedraw();
          return this;
      }

      _doRedraw () {
          this._setAttributes();
          this._renderOptions();
          // select the option(s) corresponding to current filter(s)
          if (this.hasFilter() && this._multiple) {
              this._select.selectAll('option')
                  .property('selected', d => typeof d !== 'undefined' && this.filters().indexOf(String(this.keyAccessor()(d))) >= 0);
          } else if (this.hasFilter()) {
              this._select.property('value', this.filter());
          } else {
              this._select.property('value', '');
          }
          return this;
      }

      _renderOptions () {
          const options = this._select.selectAll(`option.${OPTION_CSS_CLASS}`)
              .data(this.data(), d => this.keyAccessor()(d));

          options.exit().remove();

          options.enter()
              .append('option')
              .classed(OPTION_CSS_CLASS, true)
              .attr('value', d => this.keyAccessor()(d))
              .merge(options)
              .text(this.title());

          this._select.selectAll(`option.${OPTION_CSS_CLASS}`).sort(this._order);

          this._select.on('change', d3compat.eventHandler((d, evt) => this._onChange(d, evt)));
      }

      _onChange (_d, evt) {
          let values;

          const target = evt.target;

          if (target.selectedOptions) {
              const selectedOptions = Array.prototype.slice.call(target.selectedOptions);
              values = selectedOptions.map(d => d.value);
          } else { // IE and other browsers do not support selectedOptions
              // adapted from this polyfill: https://gist.github.com/brettz9/4212217
              const options = [].slice.call(evt.target.options);
              values = options.filter(option => option.selected).map(option => option.value);
          }
          // console.log(values);
          // check if only prompt option is selected
          if (values.length === 1 && values[0] === '') {
              values = this._promptValue || null;
          } else if (!this._multiple && values.length === 1) {
              values = values[0];
          }
          this.onChange(values);
      }

      onChange (val) {
          if (val && this._multiple) {
              this.replaceFilter([val]);
          } else if (val) {
              this.replaceFilter(val);
          } else {
              this.filterAll();
          }
          events.trigger(() => {
              this.redrawGroup();
          });
      }

      _setAttributes () {
          if (this._multiple) {
              this._select.attr('multiple', true);
          } else {
              this._select.attr('multiple', null);
          }
          if (this._numberVisible !== null) {
              this._select.attr('size', this._numberVisible);
          } else {
              this._select.attr('size', null);
          }
      }

      /**
       * Get or set the function that controls the ordering of option tags in the
       * select menu. By default options are ordered by the group key in ascending
       * order.
       * @param {Function} [order]
       * @returns {Function|SelectMenu}
       * @example
       * // order by the group's value
       * chart.order(function (a,b) {
       *     return a.value > b.value ? 1 : b.value > a.value ? -1 : 0;
       * });
       */
      order (order) {
          if (!arguments.length) {
              return this._order;
          }
          this._order = order;
          return this;
      }

      /**
       * Get or set the text displayed in the options used to prompt selection.
       * @param {String} [promptText='Select all']
       * @returns {String|SelectMenu}
       * @example
       * chart.promptText('All states');
       */
      promptText (promptText) {
          if (!arguments.length) {
              return this._promptText;
          }
          this._promptText = promptText;
          return this;
      }

      /**
       * Get or set the function that filters option tags prior to display. By default options
       * with a value of < 1 are not displayed.
       * @param {function} [filterDisplayed]
       * @returns {Function|SelectMenu}
       * @example
       * // display all options override the `filterDisplayed` function:
       * chart.filterDisplayed(function () {
       *     return true;
       * });
       */
      filterDisplayed (filterDisplayed) {
          if (!arguments.length) {
              return this._filterDisplayed;
          }
          this._filterDisplayed = filterDisplayed;
          return this;
      }

      /**
       * Controls the type of select menu. Setting it to true converts the underlying
       * HTML tag into a multiple select.
       * @param {boolean} [multiple=false]
       * @returns {boolean|SelectMenu}
       * @example
       * chart.multiple(true);
       */
      multiple (multiple) {
          if (!arguments.length) {
              return this._multiple;
          }
          this._multiple = multiple;

          return this;
      }

      /**
       * Controls the default value to be used for
       * [dimension.filter](https://github.com/crossfilter/crossfilter/wiki/API-Reference#dimension_filter)
       * when only the prompt value is selected. If `null` (the default), no filtering will occur when
       * just the prompt is selected.
       * @param {?*} [promptValue=null]
       * @returns {*|SelectMenu}
       */
      promptValue (promptValue) {
          if (!arguments.length) {
              return this._promptValue;
          }
          this._promptValue = promptValue;

          return this;
      }

      /**
       * Controls the number of items to show in the select menu, when `.multiple()` is true. This
       * controls the [`size` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#Attributes) of
       * the `select` element. If `null` (the default), uses the browser's default height.
       * @param {?number} [numberVisible=null]
       * @returns {number|SelectMenu}
       * @example
       * chart.numberVisible(10);
       */
      numberVisible (numberVisible) {
          if (!arguments.length) {
              return this._numberVisible;
          }
          this._numberVisible = numberVisible;

          return this;
      }

      size (numberVisible) {
          logger.warnOnce('selectMenu.size is ambiguous - use selectMenu.numberVisible instead');
          if (!arguments.length) {
              return this.numberVisible();
          }
          return this.numberVisible(numberVisible);
      }
  }

  const selectMenu = (parent, chartGroup) => new SelectMenu(parent, chartGroup);

  /**
   * A series chart is a chart that shows multiple series of data overlaid on one chart, where the
   * series is specified in the data. It is a specialization of Composite Chart and inherits all
   * composite features other than recomposing the chart.
   *
   * Examples:
   * - {@link http://dc-js.github.io/dc.js/examples/series.html Series Chart}
   * @mixes CompositeChart
   */
  class SeriesChart extends CompositeChart {
      /**
       * Create a Series Chart.
       * @example
       * // create a series chart under #chart-container1 element using the default global chart group
       * var seriesChart1 = new SeriesChart("#chart-container1");
       * // create a series chart under #chart-container2 element using chart group A
       * var seriesChart2 = new SeriesChart("#chart-container2", "chartGroupA");
       * @param {String|node|d3.selection} parent - Any valid
       * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
       * a dom block element such as a div; or a dom element or d3 selection.
       * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
       * Interaction with a chart will only trigger events and redraws within the chart's group.
       */
      constructor (parent, chartGroup) {
          super(parent, chartGroup);

          this._keySort = (a, b) => d3Array.ascending(this.keyAccessor()(a), this.keyAccessor()(b));

          this._charts = {};
          this._chartFunction = lineChart;
          this._chartGroup = chartGroup;
          this._seriesAccessor = undefined;
          this._seriesSort = d3Array.ascending;
          this._valueSort = this._keySort;

          this._mandatoryAttributes().push('seriesAccessor', 'chart');
          this.shareColors(true);
      }

      _compose (subChartArray) {
          super.compose(subChartArray);
      }

      compose (subChartArray) {
          throw new Error('Not supported for this chart type');
      }

      _preprocessData () {
          const keep = [];
          let childrenChanged;

          const nesting = d3compat.nester({
              key: this._seriesAccessor,
              sortKeys: this._seriesSort,
              sortValues: this._valueSort,
              entries: this.data()
          });

          const children =
              nesting.map((sub, i) => {
                  const subChart = this._charts[sub.key] || this._chartFunction(this, this._chartGroup , sub.key, i);
                  if (!this._charts[sub.key]) {
                      childrenChanged = true;
                  }
                  this._charts[sub.key] = subChart;
                  keep.push(sub.key);
                  return subChart
                      .dimension(this.dimension())
                      .group({
                          all: typeof sub.values === 'function' ? sub.values : utils.constant(sub.values)
                      }, sub.key)
                      .keyAccessor(this.keyAccessor())
                      .valueAccessor(this.valueAccessor())
                      .brushOn(false);
              });
          // this works around the fact compositeChart doesn't really
          // have a removal interface
          Object.keys(this._charts)
              .filter(c => keep.indexOf(c) === -1)
              .forEach(c => {
                  this._clearChart(c);
                  childrenChanged = true;
              });
          this._compose(children);
          if (childrenChanged && this.legend()) {
              this.legend().render();
          }
      }

      _clearChart (c) {
          if (this._charts[c].g()) {
              this._charts[c].g().remove();
          }
          delete this._charts[c];
      }

      _resetChildren () {
          Object.keys(this._charts).map(this._clearChart.bind(this));
          this._charts = {};
      }

      /**
       * Get or set the chart function, which generates the child charts.
       * @example
       * // put curve on the line charts used for the series
       * chart.chart(function(c) { return new LineChart(c).curve(d3.curveBasis); })
       * // do a scatter series chart
       * chart.chart(anchor => new ScatterPlot(anchor))
       * @param {Function} [chartFunction= (anchor) =>  new LineChart(anchor)]
       * @returns {Function|SeriesChart}
       */
      chart (chartFunction) {
          if (!arguments.length) {
              return this._chartFunction;
          }
          this._chartFunction = chartFunction;
          this._resetChildren();
          return this;
      }

      /**
       * **mandatory**
       *
       * Get or set accessor function for the displayed series. Given a datum, this function
       * should return the series that datum belongs to.
       * @example
       * // simple series accessor
       * chart.seriesAccessor(function(d) { return "Expt: " + d.key[0]; })
       * @param {Function} [accessor]
       * @returns {Function|SeriesChart}
       */
      seriesAccessor (accessor) {
          if (!arguments.length) {
              return this._seriesAccessor;
          }
          this._seriesAccessor = accessor;
          this._resetChildren();
          return this;
      }

      /**
       * Get or set a function to sort the list of series by, given series values.
       * @see {@link https://github.com/d3/d3-array/blob/master/README.md#ascending d3.ascending}
       * @see {@link https://github.com/d3/d3-array/blob/master/README.md#descending d3.descending}
       * @example
       * chart.seriesSort(d3.descending);
       * @param {Function} [sortFunction=d3.ascending]
       * @returns {Function|SeriesChart}
       */
      seriesSort (sortFunction) {
          if (!arguments.length) {
              return this._seriesSort;
          }
          this._seriesSort = sortFunction;
          this._resetChildren();
          return this;
      }

      /**
       * Get or set a function to sort each series values by. By default this is the key accessor which,
       * for example, will ensure a lineChart series connects its points in increasing key/x order,
       * rather than haphazardly.
       * @see {@link https://github.com/d3/d3-array/blob/master/README.md#ascending d3.ascending}
       * @see {@link https://github.com/d3/d3-array/blob/master/README.md#descending d3.descending}
       * @example
       * // Default value sort
       * _chart.valueSort(function keySort (a, b) {
       *     return d3.ascending(_chart.keyAccessor()(a), _chart.keyAccessor()(b));
       * });
       * @param {Function} [sortFunction]
       * @returns {Function|SeriesChart}
       */
      valueSort (sortFunction) {
          if (!arguments.length) {
              return this._valueSort;
          }
          this._valueSort = sortFunction;
          this._resetChildren();
          return this;
      }

  }

  const seriesChart = (parent, chartGroup) => new SeriesChart(parent, chartGroup);

  const DEFAULT_MIN_ANGLE_FOR_LABEL$1 = 0.5;

  /**
   * The sunburst chart implementation is usually used to visualize a small tree distribution.  The sunburst
   * chart uses keyAccessor to determine the slices, and valueAccessor to calculate the size of each
   * slice relative to the sum of all values. Slices are ordered by {@link BaseMixin#ordering ordering} which defaults to sorting
   * by key.
   *
   * The keys used in the sunburst chart should be arrays, representing paths in the tree.
   *
   * When filtering, the sunburst chart creates instances of {@link Filters.HierarchyFilter HierarchyFilter}.
   *
   * @mixes CapMixin
   * @mixes ColorMixin
   * @mixes BaseMixin
   */
  class SunburstChart extends ColorMixin(BaseMixin) {
      /**
       * Create a Sunburst Chart
       * @example
       * // create a sunburst chart under #chart-container1 element using the default global chart group
       * var chart1 = new SunburstChart('#chart-container1');
       * // create a sunburst chart under #chart-container2 element using chart group A
       * var chart2 = new SunburstChart('#chart-container2', 'chartGroupA');
       *
       * @param {String|node|d3.selection} parent - Any valid
       * {@link https://github.com/d3/d3-3.x-api-reference/blob/master/Selections.md#selecting-elements d3 single selector} specifying
       * a dom block element such as a div; or a dom element or d3 selection.
       * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
       * Interaction with a chart will only trigger events and redraws within the chart's group.
       */
      constructor (parent, chartGroup) {
          super();

          this._sliceCssClass = 'pie-slice';
          this._emptyCssClass = 'empty-chart';
          this._emptyTitle = 'empty';

          this._radius = undefined;
          this._givenRadius = undefined; // given radius, if any
          this._innerRadius = 0;
          this._ringSizes = null;

          this._g = undefined;
          this._cx = undefined;
          this._cy = undefined;
          this._minAngleForLabel = DEFAULT_MIN_ANGLE_FOR_LABEL$1;
          this._externalLabelRadius = undefined;

          this.colorAccessor(d => this.keyAccessor()(d));

          // override cap mixin
          this.ordering(pluck('key'));

          this.title(d => `${this.keyAccessor()(d)}: ${this._extendedValueAccessor(d)}`);

          this.label(d => this.keyAccessor()(d));
          this.renderLabel(true);

          this.transitionDuration(350);

          this.anchor(parent, chartGroup);
      }

      // Handle cases if value corresponds to generated parent nodes
      _extendedValueAccessor (d) {
          if (d.path) {
              return d.value;
          }
          return this.valueAccessor()(d);
      }

      _scaleRadius (ringIndex, y) {
          if (ringIndex === 0) {
              return this._innerRadius;
          } else {
              const customRelativeRadius = d3Array.sum(this.ringSizes().relativeRingSizes.slice(0, ringIndex));
              const scaleFactor = (ringIndex * (1 / this.ringSizes().relativeRingSizes.length)) /
                    customRelativeRadius;
              const standardRadius = (y - this.ringSizes().rootOffset) /
                    (1 - this.ringSizes().rootOffset) * (this._radius - this._innerRadius);
              return this._innerRadius + standardRadius / scaleFactor;
          }
      }

      _doRender () {
          this.resetSvg();

          this._g = this.svg()
              .append('g')
              .attr('transform', `translate(${this.cx()},${this.cy()})`);

          this._drawChart();

          return this;
      }

      _drawChart () {
          // set radius from chart size if none given, or if given radius is too large
          const maxRadius = d3Array.min([this.width(), this.height()]) / 2;
          this._radius = this._givenRadius && this._givenRadius < maxRadius ? this._givenRadius : maxRadius;

          const arcs = this._buildArcs();

          let partitionedNodes, cdata;
          // if we have data...
          if (d3Array.sum(this.data(), this.valueAccessor())) {
              cdata = utils.toHierarchy(this.data(), this.valueAccessor());
              partitionedNodes = this._partitionNodes(cdata);
              // First one is the root, which is not needed
              partitionedNodes.nodes.shift();
              this._g.classed(this._emptyCssClass, false);
          } else {
              // otherwise we'd be getting NaNs, so override
              // note: abuse others for its ignoring the value accessor
              cdata = utils.toHierarchy([], d => d.value);
              partitionedNodes = this._partitionNodes(cdata);
              this._g.classed(this._emptyCssClass, true);
          }
          this.ringSizes().rootOffset = partitionedNodes.rootOffset;
          this.ringSizes().relativeRingSizes = partitionedNodes.relativeRingSizes;

          if (this._g) {
              const slices = this._g.selectAll(`g.${this._sliceCssClass}`)
                  .data(partitionedNodes.nodes);
              this._createElements(slices, arcs, partitionedNodes.nodes);

              this._updateElements(partitionedNodes.nodes, arcs);

              this._removeElements(slices);

              this._highlightFilter();

              transition(this._g, this.transitionDuration(), this.transitionDelay())
                  .attr('transform', `translate(${this.cx()},${this.cy()})`);
          }
      }

      _createElements (slices, arcs, sunburstData) {
          const slicesEnter = this._createSliceNodes(slices);

          this._createSlicePath(slicesEnter, arcs);
          this._createTitles(slicesEnter);
          this._createLabels(sunburstData, arcs);
      }

      _createSliceNodes (slices) {
          return slices
              .enter()
              .append('g')
              .attr('class', (d, i) => `${this._sliceCssClass
            } _${i} ${
                this._sliceCssClass}-level-${d.depth}`);
      }

      _createSlicePath (slicesEnter, arcs) {
          const slicePath = slicesEnter.append('path')
              .attr('fill', (d, i) => this._fill(d, i))
              .on('click', d3compat.eventHandler(d => this.onClick(d)))
              .classed('dc-tabbable', this._keyboardAccessible)
              .attr('d', d => this._safeArc(arcs, d));

          if (this._keyboardAccessible) {
              this._makeKeyboardAccessible(this.onClick);
          }

          const tranNodes = transition(slicePath, this.transitionDuration());
          if (tranNodes.attrTween) {
              const chart = this;
              tranNodes.attrTween('d', function (d) {
                  return chart._tweenSlice(d, this);
              });
          }
      }

      _createTitles (slicesEnter) {
          if (this.renderTitle()) {
              slicesEnter.append('title').text(d => this.title()(d));
          }
      }

      _positionLabels (labelsEnter, arcs) {
          transition(labelsEnter, this.transitionDuration())
              .attr('transform', d => this._labelPosition(d, arcs))
              .attr('text-anchor', 'middle')
              .text(d => {
                  // position label...
                  if (this._sliceHasNoData(d) || this._sliceTooSmall(d)) {
                      return '';
                  }
                  return this.label()(d);
              });
      }

      _createLabels (sunburstData, arcs) {
          if (this.renderLabel()) {
              const labels = this._g.selectAll(`text.${this._sliceCssClass}`)
                  .data(sunburstData);

              labels.exit().remove();

              const labelsEnter = labels
                  .enter()
                  .append('text')
                  .attr('class', (d, i) => {
                      let classes = `${this._sliceCssClass} _${i}`;
                      if (this._externalLabelRadius) {
                          classes += ' external';
                      }
                      return classes;
                  })
                  .on('click', d3compat.eventHandler(d => this.onClick(d)));
              this._positionLabels(labelsEnter, arcs);
          }
      }

      _updateElements (sunburstData, arcs) {
          this._updateSlicePaths(sunburstData, arcs);
          this._updateLabels(sunburstData, arcs);
          this._updateTitles(sunburstData);
      }

      _updateSlicePaths (sunburstData, arcs) {
          const slicePaths = this._g.selectAll(`g.${this._sliceCssClass}`)
              .data(sunburstData)
              .select('path')
              .attr('d', (d, i) => this._safeArc(arcs, d));
          const tranNodes = transition(slicePaths, this.transitionDuration());
          if (tranNodes.attrTween) {
              const chart = this;
              tranNodes.attrTween('d', function (d) {
                  return chart._tweenSlice(d, this);
              });
          }
          tranNodes.attr('fill', (d, i) => this._fill(d, i));
      }

      _updateLabels (sunburstData, arcs) {
          if (this.renderLabel()) {
              const labels = this._g.selectAll(`text.${this._sliceCssClass}`)
                  .data(sunburstData);
              this._positionLabels(labels, arcs);
          }
      }

      _updateTitles (sunburstData) {
          if (this.renderTitle()) {
              this._g.selectAll(`g.${this._sliceCssClass}`)
                  .data(sunburstData)
                  .select('title')
                  .text(d => this.title()(d));
          }
      }

      _removeElements (slices) {
          slices.exit().remove();
      }

      _highlightFilter () {
          const chart = this;
          if (chart.hasFilter()) {
              chart.selectAll(`g.${chart._sliceCssClass}`).each(function (d) {
                  if (chart._isSelectedSlice(d)) {
                      chart.highlightSelected(this);
                  } else {
                      chart.fadeDeselected(this);
                  }
              });
          } else {
              chart.selectAll(`g.${chart._sliceCssClass}`).each(function (d) {
                  chart.resetHighlight(this);
              });
          }
      }

      /**
       * Get or set the inner radius of the sunburst chart. If the inner radius is greater than 0px then the
       * sunburst chart will be rendered as a doughnut chart. Default inner radius is 0px.
       * @param {Number} [innerRadius=0]
       * @returns {Number|SunburstChart}
       */
      innerRadius (innerRadius) {
          if (!arguments.length) {
              return this._innerRadius;
          }
          this._innerRadius = innerRadius;
          return this;
      }

      /**
       * Get or set the outer radius. If the radius is not set, it will be half of the minimum of the
       * chart width and height.
       * @param {Number} [radius]
       * @returns {Number|SunburstChart}
       */
      radius (radius) {
          if (!arguments.length) {
              return this._givenRadius;
          }
          this._givenRadius = radius;
          return this;
      }

      /**
       * Get or set center x coordinate position. Default is center of svg.
       * @param {Number} [cx]
       * @returns {Number|SunburstChart}
       */
      cx (cx) {
          if (!arguments.length) {
              return (this._cx || this.width() / 2);
          }
          this._cx = cx;
          return this;
      }

      /**
       * Get or set center y coordinate position. Default is center of svg.
       * @param {Number} [cy]
       * @returns {Number|SunburstChart}
       */
      cy (cy) {
          if (!arguments.length) {
              return (this._cy || this.height() / 2);
          }
          this._cy = cy;
          return this;
      }

      /**
       * Get or set the minimal slice angle for label rendering. Any slice with a smaller angle will not
       * display a slice label.
       * @param {Number} [minAngleForLabel=0.5]
       * @returns {Number|SunburstChart}
       */
      minAngleForLabel (minAngleForLabel) {
          if (!arguments.length) {
              return this._minAngleForLabel;
          }
          this._minAngleForLabel = minAngleForLabel;
          return this;
      }

      /**
       * Title to use for the only slice when there is no data.
       * @param {String} [title]
       * @returns {String|SunburstChart}
       */
      emptyTitle (title) {
          if (arguments.length === 0) {
              return this._emptyTitle;
          }
          this._emptyTitle = title;
          return this;
      }

      /**
       * Position slice labels offset from the outer edge of the chart.
       *
       * The argument specifies the extra radius to be added for slice labels.
       * @param {Number} [externalLabelRadius]
       * @returns {Number|SunburstChart}
       */
      externalLabels (externalLabelRadius) {
          if (arguments.length === 0) {
              return this._externalLabelRadius;
          } else if (externalLabelRadius) {
              this._externalLabelRadius = externalLabelRadius;
          } else {
              this._externalLabelRadius = undefined;
          }

          return this;
      }

      /**
       * Constructs the default RingSizes parameter for {@link SunburstChart#ringSizes ringSizes()},
       * which makes the rings narrower as they get farther away from the center.
       *
       * Can be used as a parameter to ringSizes() to reset the default behavior, or modified for custom ring sizes.
       *
       * @example
       *   var chart = new dc.SunburstChart(...);
       *   chart.ringSizes(chart.defaultRingSizes())
       * @returns {RingSizes}
       */
      defaultRingSizes () {
          return {
              partitionDy: () => this._radius * this._radius,
              scaleInnerRadius: d => d.data.path && d.data.path.length === 1 ?
                  this._innerRadius :
                  Math.sqrt(d.y0),
              scaleOuterRadius: d => Math.sqrt(d.y1),
              relativeRingSizesFunction: () => []
          };
      }

      /**
       * Constructs a RingSizes parameter for {@link SunburstChart#ringSizes ringSizes()}
       * that will make the chart rings equally wide.
       *
       * @example
       *   var chart = new dc.SunburstChart(...);
       *   chart.ringSizes(chart.equalRingSizes())
       * @returns {RingSizes}
       */
      equalRingSizes () {
          return this.relativeRingSizes(
              ringCount => {
                  const result = [];
                  for (let i = 0; i < ringCount; i++) {
                      result.push(1 / ringCount);
                  }
                  return result;
              }
          );
      }

      /**
       * Constructs a RingSizes parameter for {@link SunburstChart#ringSizes ringSizes()} using the given function
       * to determine each rings width.
       *
       * * The function must return an array containing portion values for each ring/level of the chart.
       * * The length of the array must match the number of rings of the chart at runtime, which is provided as the only
       *   argument.
       * * The sum of all portions from the array must be 1 (100%).
       *
       * @example
       * // specific relative portions (the number of rings (3) is known in this case)
       * chart.ringSizes(chart.relativeRingSizes(function (ringCount) {
       *     return [.1, .3, .6];
       * });
       * @param {Function} [relativeRingSizesFunction]
       * @returns {RingSizes}
       */
      relativeRingSizes (relativeRingSizesFunction) {
          function assertPortionsArray (relativeSizes, numberOfRings) {
              if (!Array.isArray(relativeSizes)) {
                  throw new BadArgumentException('relativeRingSizes function must return an array');
              }

              const portionsSum = d3Array.sum(relativeSizes);
              if (Math.abs(portionsSum - 1) > constants.NEGLIGIBLE_NUMBER) {
                  throw new BadArgumentException(
                      `relativeRingSizes : portions must add up to 1, but sum was ${portionsSum}`);
              }

              if (relativeSizes.length !== numberOfRings) {
                  throw new BadArgumentException(
                      `relativeRingSizes : number of values must match number of rings (${
                        numberOfRings}) but was ${relativeSizes.length}`);
              }
          }
          return {
              partitionDy: () => 1,
              scaleInnerRadius: d => this._scaleRadius(d.data.path.length - 1, d.y0),
              scaleOuterRadius: d => this._scaleRadius(d.data.path.length, d.y1),
              relativeRingSizesFunction: ringCount => {
                  const result = relativeRingSizesFunction(ringCount);
                  assertPortionsArray(result, ringCount);
                  return result;
              }
          };
      }

      /**
       * Get or set the strategy to use for sizing the charts rings.
       *
       * There are three strategies available
       * * {@link SunburstChart#defaultRingSizes `defaultRingSizes`}: the rings get narrower farther away from the center
       * * {@link SunburstChart#relativeRingSizes `relativeRingSizes`}: set the ring sizes as portions of 1
       * * {@link SunburstChart#equalRingSizes `equalRingSizes`}: the rings are equally wide
       *
       * You can modify the returned strategy, or create your own, for custom ring sizing.
       *
       * RingSizes is a duck-typed interface that must support the following methods:
       * * `partitionDy()`: used for
       *   {@link https://github.com/d3/d3-hierarchy/blob/v1.1.9/README.md#partition_size `d3.partition.size`}
       * * `scaleInnerRadius(d)`: takes datum and returns radius for
       *    {@link https://github.com/d3/d3-shape/blob/v1.3.7/README.md#arc_innerRadius `d3.arc.innerRadius`}
       * * `scaleOuterRadius(d)`: takes datum and returns radius for
       *    {@link https://github.com/d3/d3-shape/blob/v1.3.7/README.md#arc_outerRadius `d3.arc.outerRadius`}
       * * `relativeRingSizesFunction(ringCount)`: takes ring count and returns an array of portions that
       *   must add up to 1
       *
       * @example
       * // make rings equally wide
       * chart.ringSizes(chart.equalRingSizes())
       * // reset to default behavior
       * chart.ringSizes(chart.defaultRingSizes()))
       * @param {RingSizes} ringSizes
       * @returns {Object|SunburstChart}
       */
      ringSizes (ringSizes) {
          if (!arguments.length) {
              if (!this._ringSizes) {
                  this._ringSizes = this.defaultRingSizes();
              }
              return this._ringSizes;
          }
          this._ringSizes = ringSizes;
          return this;
      }

      _buildArcs () {
          return d3Shape.arc()
              .startAngle(d => d.x0)
              .endAngle(d => d.x1)
              .innerRadius(d => this.ringSizes().scaleInnerRadius(d))
              .outerRadius(d => this.ringSizes().scaleOuterRadius(d));
      }

      _isSelectedSlice (d) {
          return this._isPathFiltered(d.path);
      }

      _isPathFiltered (path) {
          for (let i = 0; i < this.filters().length; i++) {
              const currentFilter = this.filters()[i];
              if (currentFilter.isFiltered(path)) {
                  return true;
              }
          }
          return false;
      }

      // returns all filters that are a parent or child of the path
      _filtersForPath (path) {
          const pathFilter = filters.HierarchyFilter(path);
          const filtersList = [];
          for (let i = 0; i < this.filters().length; i++) {
              const currentFilter = this.filters()[i];
              if (currentFilter.isFiltered(path) || pathFilter.isFiltered(currentFilter)) {
                  filtersList.push(currentFilter);
              }
          }
          return filtersList;
      }

      _doRedraw () {
          this._drawChart();
          return this;
      }

      _partitionNodes (data) {
          const getSortable = function (d) {
              return {'key': d.data.key, 'value': d.value};
          };
          const _hierarchy = d3Hierarchy.hierarchy(data)
              .sum(d => d.children ? 0 : this._extendedValueAccessor(d))
              .sort((a, b) => d3Array.ascending(this.ordering()(getSortable(a)), this.ordering()(getSortable(b))));

          const _partition = d3Hierarchy.partition()
                .size([2 * Math.PI, this.ringSizes().partitionDy()]);

          _partition(_hierarchy);

          // In D3v4 the returned data is slightly different, change it enough to suit our purposes.
          const nodes = _hierarchy.descendants().map(d => {
              d.key = d.data.key;
              d.path = d.data.path;
              return d;
          });

          const relativeSizes = this.ringSizes().relativeRingSizesFunction(_hierarchy.height);

          return {
              nodes,
              rootOffset: _hierarchy.y1,
              relativeRingSizes: relativeSizes
          };
      }

      _sliceTooSmall (d) {
          const angle = d.x1 - d.x0;
          return isNaN(angle) || angle < this._minAngleForLabel;
      }

      _sliceHasNoData (d) {
          return this._extendedValueAccessor(d) === 0;
      }

      _isOffCanvas (d) {
          return !d || isNaN(d.x0) || isNaN(d.y0);
      }

      _fill (d, i) {
          return this.getColor(d.data, i);
      }

      onClick (d) {
          if (this._g.attr('class') === this._emptyCssClass) {
              return;
          }

          // Must be better way to handle this, in legends we need to access `d.key`
          const path = d.path || d.key;
          const filter = filters.HierarchyFilter(path);

          // filters are equal to parents or children of the path.
          const filtersList = this._filtersForPath(path);
          let exactMatch = false;
          // clear out any filters that cover the path filtered.
          for (let j = filtersList.length - 1; j >= 0; j--) {
              const currentFilter = filtersList[j];
              if (utils.arraysIdentical(currentFilter, path)) {
                  exactMatch = true;
              }
              this.filter(filtersList[j]);
          }
          events.trigger(() => {
              // if it is a new filter - put it in.
              if (!exactMatch) {
                  this.filter(filter);
              }
              this.redrawGroup();
          });
      }

      _safeArc (_arc, d) {
          let path = _arc(d);
          if (path.indexOf('NaN') >= 0) {
              path = 'M0,0';
          }
          return path;
      }

      _labelPosition (d, _arc) {
          let centroid;
          if (this._externalLabelRadius) {
              centroid = d3Shape.arc()
                  .outerRadius(this._radius + this._externalLabelRadius)
                  .innerRadius(this._radius + this._externalLabelRadius)
                  .centroid(d);
          } else {
              centroid = _arc.centroid(d);
          }
          if (isNaN(centroid[0]) || isNaN(centroid[1])) {
              return 'translate(0,0)';
          } else {
              return `translate(${centroid})`;
          }
      }

      legendables () {
          return this.data().map((d, i) => {
              const legendable = {name: d.key, data: d.value, others: d.others, chart: this};
              legendable.color = this.getColor(d, i);
              return legendable;
          });
      }

      legendHighlight (d) {
          this._highlightSliceFromLegendable(d, true);
      }

      legendReset (d) {
          this._highlightSliceFromLegendable(d, false);
      }

      legendToggle (d) {
          this.onClick({key: d.name, others: d.others});
      }

      _highlightSliceFromLegendable (legendable, highlighted) {
          this.selectAll('g.pie-slice').each(function (d) {
              if (legendable.name === d.key) {
                  d3Selection.select(this).classed('highlight', highlighted);
              }
          });
      }

      _tweenSlice (d, element) {
          let current = element._current;
          if (this._isOffCanvas(current)) {
              current = {x0: 0, x1: 0, y0: 0, y1: 0};
          }
          const tweenTarget = {
              x0: d.x0,
              x1: d.x1,
              y0: d.y0,
              y1: d.y1
          };
          const i = d3Interpolate.interpolate(current, tweenTarget);
          element._current = i(0);
          return t => this._safeArc(this._buildArcs(), Object.assign({}, d, i(t)));
      }
  }

  const sunburstChart = (parent, chartGroup) => new SunburstChart(parent, chartGroup);

  const INPUT_CSS_CLASS = 'dc-text-filter-input';

  /**
   * Text Filter Widget
   *
   * The text filter widget is a simple widget designed to display an input field allowing to filter
   * data that matches the text typed.
   * As opposed to the other charts, this doesn't display any result and doesn't update its display,
   * it's just to input an filter other charts.
   *
   * @mixes BaseMixin
   */
  class TextFilterWidget extends BaseMixin {
      /**
       * Create Text Filter widget
       * @example
       *
       * var data = [{"firstName":"John","lastName":"Coltrane"}{"firstName":"Miles",lastName:"Davis"}]
       * var ndx = crossfilter(data);
       * var dimension = ndx.dimension(function(d) {
       *     return d.lastName.toLowerCase() + ' ' + d.firstName.toLowerCase();
       * });
       *
       * new TextFilterWidget('#search')
       *     .dimension(dimension);
       *     // you don't need the group() function
       *
       * @param {String|node|d3.selection|CompositeChart} parent - Any valid
       * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector}
       * specifying a dom block element such as a div; or a dom element or d3 selection.
       * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
       * Interaction with a chart will only trigger events and redraws within the chart's group.
       */
      constructor (parent, chartGroup) {
          super();

          this._normalize = s => s.toLowerCase();

          this._filterFunctionFactory = query => {
              query = this._normalize(query);
              return d => this._normalize(d).indexOf(query) !== -1;
          };

          this._placeHolder = 'search';

          this.group(() => {
              throw 'the group function on textFilterWidget should never be called, please report the issue';
          });

          this.anchor(parent, chartGroup);
      }

      _doRender () {
          this.select('input').remove();

          this._input = this.root().append('input')
              .classed(INPUT_CSS_CLASS, true);

          const chart = this;
          this._input.on('input', function () {
              chart.dimension().filterFunction(chart._filterFunctionFactory(this.value));
              events.trigger(() => {
                  chart.redrawGroup();
              }, constants.EVENT_DELAY);
          });

          this._doRedraw();

          return this;
      }

      _doRedraw () {
          this.root().selectAll('input')
              .attr('placeholder', this._placeHolder);

          return this;
      }

      /**
       * This function will be called on values before calling the filter function.
       * @example
       * // This is the default
       * chart.normalize(function (s) {
       *   return s.toLowerCase();
       * });
       * @param {function} [normalize]
       * @returns {TextFilterWidget|function}
       */
      normalize (normalize) {
          if (!arguments.length) {
              return this._normalize;
          }
          this._normalize = normalize;
          return this;
      }

      /**
       * Placeholder text in the search box.
       * @example
       * // This is the default
       * chart.placeHolder('type to filter');
       * @param {function} [placeHolder='search']
       * @returns {TextFilterWidget|string}
       */
      placeHolder (placeHolder) {
          if (!arguments.length) {
              return this._placeHolder;
          }
          this._placeHolder = placeHolder;
          return this;
      }

      /**
       * This function will be called with the search text, it needs to return a function that will be used to
       * filter the data. The default function checks presence of the search text.
       * @example
       * // This is the default
       * function (query) {
       *     query = _normalize(query);
       *     return function (d) {
       *         return _normalize(d).indexOf(query) !== -1;
       *     };
       * };
       * @param {function} [filterFunctionFactory]
       * @returns {TextFilterWidget|function}
       */
      filterFunctionFactory (filterFunctionFactory) {
          if (!arguments.length) {
              return this._filterFunctionFactory;
          }
          this._filterFunctionFactory = filterFunctionFactory;
          return this;
      }
  }

  const textFilterWidget = (parent, chartGroup) => new TextFilterWidget(parent, chartGroup);

  const majorVer = +d3.version[0];

  if (majorVer < 6) {
      Object.assign(d3compat, {
          eventHandler: handler => function eventHandler (d, _) {
              handler.call(this, d, d3Selection.event);
          },
          // manual firing of event, usu for tests
          callHandler: function callHandler (handler, that, _, d) {
              // note: dropping event as well as any extra args
              // d3@6 does not pass extra args anymore, so we can't use them and remain compatible
              handler.call(that, d);
          },
          nester: ({key, sortKeys, sortValues, entries}) => {
              const nester = d3Collection.nest().key(key);
              if (sortKeys) {
                  nester.sortKeys(sortKeys);
              }
              if (sortValues) {
                  nester.sortValues(sortValues);
              }
              return nester.entries(entries);
          },
          pointer: (evt, elem) => d3Selection.mouse(elem)
      });
  }

  const majorVer$1 = +d3.version[0];

  if (majorVer$1 > 5) {
      Object.assign(d3compat, {
          eventHandler: handler => function eventHandler (event, d) {
              handler.call(this, d, event);
          },
          // manual firing of event, usu for tests
          callHandler: function callHandler (handler, that, event, d) {
              handler.call(that, event, d);
          },
          nester: ({key, sortKeys, sortValues, entries}) => {
              if (sortValues) {
                  entries = [...entries].sort(sortValues);
              }
              let out = d3Array.groups(entries, key);
              if (sortKeys) {
                  out = out.sort(sortKeys);
              }

              // remap to d3@v5 structure
              return out.map(e => ({
                  key: `${e[0]}`, // d3@v5 always returns key as string
                  values: e[1]
              }));
          },
          pointer: d3Selection.pointer
      });
  }

  exports.BadArgumentException = BadArgumentException;
  exports.BarChart = BarChart;
  exports.BaseMixin = BaseMixin;
  exports.BoxPlot = BoxPlot;
  exports.BubbleChart = BubbleChart;
  exports.BubbleMixin = BubbleMixin;
  exports.BubbleOverlay = BubbleOverlay;
  exports.CapMixin = CapMixin;
  exports.CboxMenu = CboxMenu;
  exports.ColorMixin = ColorMixin;
  exports.CompositeChart = CompositeChart;
  exports.Config = Config;
  exports.CoordinateGridMixin = CoordinateGridMixin;
  exports.DataCount = DataCount;
  exports.DataGrid = DataGrid;
  exports.DataTable = DataTable;
  exports.GeoChoroplethChart = GeoChoroplethChart;
  exports.HeatMap = HeatMap;
  exports.HtmlLegend = HtmlLegend;
  exports.InvalidStateException = InvalidStateException;
  exports.Legend = Legend;
  exports.LineChart = LineChart;
  exports.Logger = Logger;
  exports.MarginMixin = MarginMixin;
  exports.NumberDisplay = NumberDisplay;
  exports.PieChart = PieChart;
  exports.RowChart = RowChart;
  exports.ScatterPlot = ScatterPlot;
  exports.SelectMenu = SelectMenu;
  exports.SeriesChart = SeriesChart;
  exports.StackMixin = StackMixin;
  exports.SunburstChart = SunburstChart;
  exports.TextFilterWidget = TextFilterWidget;
  exports.afterTransition = afterTransition;
  exports.barChart = barChart;
  exports.baseMixin = baseMixin;
  exports.boxPlot = boxPlot;
  exports.bubbleChart = bubbleChart;
  exports.bubbleOverlay = bubbleOverlay;
  exports.cboxMenu = cboxMenu;
  exports.chartRegistry = chartRegistry;
  exports.compositeChart = compositeChart;
  exports.config = config;
  exports.constants = constants;
  exports.d3Box = d3Box;
  exports.d3compat = d3compat;
  exports.dataCount = dataCount;
  exports.dataGrid = dataGrid;
  exports.dataTable = dataTable;
  exports.deregisterAllCharts = deregisterAllCharts;
  exports.deregisterChart = deregisterChart;
  exports.events = events;
  exports.filterAll = filterAll;
  exports.filters = filters;
  exports.geoChoroplethChart = geoChoroplethChart;
  exports.hasChart = hasChart;
  exports.heatMap = heatMap;
  exports.htmlLegend = htmlLegend;
  exports.instanceOfChart = instanceOfChart;
  exports.legend = legend;
  exports.lineChart = lineChart;
  exports.logger = logger;
  exports.numberDisplay = numberDisplay;
  exports.optionalTransition = optionalTransition;
  exports.pieChart = pieChart;
  exports.pluck = pluck;
  exports.printers = printers;
  exports.redrawAll = redrawAll;
  exports.refocusAll = refocusAll;
  exports.registerChart = registerChart;
  exports.renderAll = renderAll;
  exports.renderlet = renderlet;
  exports.rowChart = rowChart;
  exports.scatterPlot = scatterPlot;
  exports.selectMenu = selectMenu;
  exports.seriesChart = seriesChart;
  exports.sunburstChart = sunburstChart;
  exports.textFilterWidget = textFilterWidget;
  exports.transition = transition;
  exports.units = units;
  exports.utils = utils;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=dc.js.map
