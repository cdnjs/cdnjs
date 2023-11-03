/*!
 *  dc 5.0.0-alpha0
 *  http://dc-js.github.io/dc.js/
 *  Copyright 2012-2023 Nick Zhu & the dc.js Developers
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
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3'), require('d3')) :
    typeof define === 'function' && define.amd ? define(['exports', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3', 'd3'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.dc = {}, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3));
})(this, (function (exports, d3Dispatch, d3TimeFormat, d3Format, d3Time, d3Array, d3Selection, d3Scale, d3Timer, d3Interpolate, d3ScaleChromatic, d3Axis, d3Zoom, d3Brush, d3Shape, d3Geo, d3Ease, d3Hierarchy) { 'use strict';

    class BadArgumentException extends Error {
    }

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
        NEGLIGIBLE_NUMBER: 1e-10,
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    class RangedFilter extends Array {
        constructor(low, high) {
            super();
            this.filterType = 'RangedFilter';
            this[0] = low;
            this[1] = high;
        }
        isFiltered(value) {
            return value >= this[0] && value < this[1];
        }
        serialize() {
            return [...this];
        }
    }

    class RangedTwoDimensionalFilter extends Array {
        constructor(filter) {
            super();
            this.filterType = 'RangedTwoDimensionalFilter';
            for (let i = 0; i < filter.length; i++) {
                this[i] = filter[i];
            }
            if (filter[0] instanceof Array) {
                this.fromBottomLeft = [
                    [Math.min(filter[0][0], filter[1][0]), Math.min(filter[0][1], filter[1][1])],
                    [Math.max(filter[0][0], filter[1][0]), Math.max(filter[0][1], filter[1][1])],
                ];
            }
            else {
                this.fromBottomLeft = [
                    [filter[0], -Infinity],
                    [filter[1], Infinity],
                ];
            }
        }
        isFiltered(value) {
            let x;
            let y;
            if (value instanceof Array) {
                x = value[0];
                y = value[1];
            }
            else {
                x = value;
                y = this.fromBottomLeft[0][1];
            }
            return (x >= this.fromBottomLeft[0][0] &&
                x < this.fromBottomLeft[1][0] &&
                y >= this.fromBottomLeft[0][1] &&
                y < this.fromBottomLeft[1][1]);
        }
        serialize() {
            return [...this];
        }
    }

    class TwoDimensionalFilter extends Array {
        constructor(filter) {
            super();
            this.filterType = 'TwoDimensionalFilter';
            this[0] = filter[0];
            this[1] = filter[1];
        }
        isFiltered(value) {
            return (value.length &&
                value.length === this.length &&
                value[0] === this[0] &&
                value[1] === this[1]);
        }
        serialize() {
            return [...this];
        }
    }

    class HierarchyFilter extends Array {
        constructor(path) {
            super();
            this.filterType = 'HierarchyFilter';
            for (let i = 0; i < path.length; i++) {
                this[i] = path[i];
            }
        }
        isFiltered(value) {
            const filter = this;
            if (!(filter.length && value && value.length && value.length >= filter.length)) {
                return false;
            }
            for (let i = 0; i < filter.length; i++) {
                if (value[i] !== filter[i]) {
                    return false;
                }
            }
            return true;
        }
        serialize() {
            return [...this];
        }
    }

    const filterFactory = {
        HierarchyFilter: entry => new HierarchyFilter(entry),
        RangedFilter: entry => new RangedFilter(entry[0], entry[1]),
        RangedTwoDimensionalFilter: entry => new RangedTwoDimensionalFilter(entry),
        TwoDimensionalFilter: entry => new TwoDimensionalFilter(entry),
    };

    class FilterStorage {
        constructor() {
            this._filters = new Map();
            this._listenerChains = new Map();
            this._filterChangeListener = d3Dispatch.dispatch('filter-changed');
        }
        onFilterChange(key, callback) {
            this._filterChangeListener.on(`filter-changed.${key}`, callback);
        }
        registerFilterListener(params) {
            const storageKey = params.storageKey;
            if (!this._listenerChains.get(storageKey)) {
                this._listenerChains.set(storageKey, []);
            }
            const listener = Object.assign({}, params);
            this._listenerChains.get(storageKey).push(listener);
            return listener;
        }
        deRegisterFilterListener(storageKey, listener) {
            // exclude this listener and retain the rest
            let listenerChain = this._listenerChains.get(storageKey);
            listenerChain = listenerChain.filter(l => l !== listener);
            this._listenerChains.set(storageKey, listenerChain);
        }
        deRegisterAll() {
            this._filters = new Map();
            this._listenerChains = new Map();
        }
        notifyListeners(storageKey, filters) {
            const listenerChain = this._listenerChains.get(storageKey);
            listenerChain
                .filter(l => typeof l.onFiltersChanged === 'function')
                .forEach(l => {
                l.onFiltersChanged(filters);
            });
            const chartIds = listenerChain.map(lsnr => lsnr.chartId);
            this._filterChangeListener.call('filter-changed', this, {
                chartIds,
                filters: this._filters.get(storageKey),
            });
        }
        setFiltersFor(storageKey, filters) {
            this._filters.set(storageKey, filters);
        }
        getFiltersFor(storageKey) {
            if (!this._filters.get(storageKey)) {
                this._filters.set(storageKey, []);
            }
            return this._filters.get(storageKey);
        }
        resetFiltersAndNotify(storageKey) {
            this.setFiltersAndNotify(storageKey, []);
        }
        setFiltersAndNotify(storageKey, filters) {
            // Update filters in the storage
            this.setFiltersFor(storageKey, filters);
            // Apply filters with the DataProvider - it will update CrossFilter
            // Applying it to just first entry is sufficient as these share the underlying dimension
            const listenerChain = this._listenerChains.get(storageKey);
            if (listenerChain && listenerChain[0]) {
                listenerChain[0].applyFilters(filters);
            }
            // Notify charts that filter has been updated
            this.notifyListeners(storageKey, filters);
        }
        deserializeFiltersSetAndNotify(storageKey, entry) {
            const filters = this._deSerializeFilters(entry.filterType, entry.values);
            this.setFiltersAndNotify(storageKey, filters);
        }
        serialize({ includeStorageKey } = {}) {
            // Include items that have active filters
            // In case of Composite charts, include only the parent chart
            return Array.from(this._listenerChains.values())
                .map(listenersList => {
                // check if any item in the list corresponds to a non-child chart
                const listener = listenersList.find(l => l.primaryChart);
                if (listener) {
                    const filters = this._filters.get(listener.storageKey);
                    if (filters && filters.length > 0) {
                        const entry = this._serializeFilters(listener.chartId, filters);
                        if (includeStorageKey) {
                            entry.storageKey = listener.storageKey;
                        }
                        return entry;
                    }
                }
                return undefined;
            })
                .filter(o => o); // Exclude all undefined
        }
        restore(entries) {
            const listenerChains = Array.from(this._listenerChains.values());
            const filtersToRestore = new Map(entries.map(entry => {
                // Find a listenerChain that has same chartId registered
                const listenerChain = listenerChains.find((lsnrsChain) => lsnrsChain.find(listener => listener.chartId === entry.chartId));
                // convert to appropriate dc IFilter objects
                const filters = this._deSerializeFilters(entry.filterType, entry.values);
                // pickup storageKey from first entry - all entries will have same storage key
                const storageKey = listenerChain[0].storageKey;
                return [storageKey, filters];
            }));
            for (const storageKey of this._listenerChains.keys()) {
                // reset a filter if it is not getting restored
                const filters = filtersToRestore.has(storageKey)
                    ? filtersToRestore.get(storageKey)
                    : [];
                this.setFiltersAndNotify(storageKey, filters);
            }
        }
        _serializeFilters(chartId, filters) {
            if (typeof filters[0].isFiltered !== 'function') {
                return {
                    chartId,
                    filterType: 'Simple',
                    values: [...filters], // defensively clone
                };
            }
            const filtersWithType = filters;
            return {
                chartId,
                filterType: filtersWithType[0].filterType,
                values: filtersWithType.map(f => f.serialize()),
            };
        }
        _deSerializeFilters(filterType, values) {
            // Simple filters are simple list of items, not need to any additional instantiation
            if (filterType === 'Simple') {
                return values;
            }
            // Lookup filter factory based on the filter type
            const filterCreator = filterFactory[filterType];
            return values.map(f => filterCreator(f));
        }
    }

    /**
     * A chart group often corresponds to a set of linked charts.
     * For example, when using crossfilter, it is typically charts linked to same crossfilter instance.
     * It specifies the set of charts which should be updated when a filter changes on one of the charts.
     * The {@linkcode BaseMixin} methods {@linkcode BaseMixin.renderGroup | renderGroup} and
     * {@linkcode BaseMixin.redrawGroup | redrawGroup} call {@linkcode renderAll} and {@linkcode redrawAll}
     * on the chart group.
     *
     * `dc` charts created without specifying a chartGroup are registered with the default ChartGroup.
     * It is recommended that all `dc` charts are created with an explicit chartGroup.
     *
     * This has been introduced in v5 to facilitate automated garage collection of charts.
     * SPAs (Single Page Applications), or any other environments where set of charts need to be unloaded,
     * should use explicit chartGroups.
     *
     * It is possible to register non dc charts (or any other object) with the chartGroup.
     * Please see {@linkcode IMinimalChart} to understand the methods the chartGroup will be invoking.
     *
     * `dc` charts do not hard depend on this class. So, it is possible to replace it with any compliant
     * implementation. {@linkcode IChartGroup} specifies what rest of the `dc` expects.
     */
    class ChartGroup {
        /**
         * Create a new instance. Please note it does not take a name as parameter.
         */
        constructor() {
            this._charts = [];
            this.filterStorage = new FilterStorage();
        }
        /**
         * List of charts in the group. It returns the internal storage without defensive cloning.
         *
         * @category Intermediate
         */
        list() {
            return this._charts;
        }
        /**
         * Check if the chart is registered with this chartGroup.
         *
         * @category Intermediate
         */
        has(chart) {
            return this._charts.includes(chart);
        }
        /**
         * dc charts will register themselves. Non dc charts will need to call this method.
         *
         * @category Intermediate
         */
        register(chart) {
            this._charts.push(chart);
        }
        /**
         * dc charts will deregister themselves.
         *
         * @category Intermediate
         */
        deregister(chart) {
            if (typeof chart.dispose === 'function') {
                chart.dispose();
            }
            this._charts = this._charts.filter(ch => ch !== chart);
        }
        /**
         * Remove all charts from the registry.
         * Should not be called directly - it may leave charts in inconsistent state.
         *
         * @category Ninja
         */
        clear() {
            this._charts = [];
        }
        /**
         * Once all charts have been registered, this function should be called.
         * It will do the following in order:
         * - invoke async callback {@linkcode beforeRenderAll},
         * - invoke {@linkcode BaseMixin.render | render} on each of the charts,
         * - invoke callback {@linkcode renderlet}.
         *
         * Typically this will be called only once.
         */
        renderAll() {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof this.beforeRenderAll === 'function') {
                    yield this.beforeRenderAll();
                }
                for (const chart of this._charts) {
                    chart.render();
                }
                if (typeof this.renderlet === 'function') {
                    this.renderlet();
                }
            });
        }
        /**
         * Redraw all the charts.
         *
         * When a filter is modified for any of the charts or there is a change in the underlying data,
         * all linked charts will need be redrawn.
         *
         * It will do the following in order:
         * - invoke async callback {@linkcode beforeRedrawAll},
         * - invoke {@linkcode BaseMixin.redraw | redraw} on each of the charts,
         * - invoke callback {@linkcode renderlet}.
         *
         * For any filter changes, this will be called by dc charts internally.
         * However, if there is a change in data (like rows getting added), this function
         * needs to be called to see the updated data.
         */
        redrawAll() {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof this.beforeRedrawAll === 'function') {
                    yield this.beforeRedrawAll();
                }
                for (const chart of this._charts) {
                    chart.redraw();
                }
                if (typeof this.renderlet === 'function') {
                    this.renderlet();
                }
            });
        }
        /**
         * Reset filters for all the charts. This can be used to implement `Reset All` in the UI.
         */
        filterAll() {
            for (const chart of this._charts) {
                chart.filterAll();
            }
        }
        /**
         * Refocus all the charts that support focusing.
         */
        refocusAll() {
            for (const chart of this._charts) {
                if (chart.focus) {
                    chart.focus();
                }
            }
        }
    }

    /**
     * The ChartRegistry maintains sets of all instantiated dc.js charts under named groups
     * and the default group. There is a single global ChartRegistry object named `chartRegistry`
     *
     * A chart group often corresponds to a crossfilter instance. It specifies
     * the set of charts which should be updated when a filter changes on one of the charts or when the
     * global functions {@link filterAll | filterAll}, {@link refocusAll | refocusAll},
     * {@link renderAll | renderAll}, {@link redrawAll | redrawAll}, or chart functions
     * {@link BaseMixin.renderGroup},
     * {@link BaseMixin.redrawGroup} are called.
     */
    class ChartRegistry {
        constructor() {
            // chartGroup:string => charts:array
            this._chartMap = {};
        }
        chartGroup(group) {
            if (!group) {
                group = constants.DEFAULT_CHART_GROUP;
            }
            if (!this._chartMap[group]) {
                this._chartMap[group] = new ChartGroup();
            }
            return this._chartMap[group];
        }
        /**
         * Determine if a given chart instance resides in any group in the registry.
         */
        has(chart) {
            for (const chartGroupName in this._chartMap) {
                if (this._chartMap.hasOwnProperty(chartGroupName)) {
                    if (this._chartMap[chartGroupName].has(chart)) {
                        return true;
                    }
                }
            }
            return false;
        }
        /**
         * Clear given group if one is provided, otherwise clears all groups.
         */
        clear(group) {
            if (group) {
                if (this._chartMap[group]) {
                    this._chartMap[group].clear();
                    delete this._chartMap[group];
                }
            }
            else {
                for (const chartGroupName in this._chartMap) {
                    if (this._chartMap.hasOwnProperty(chartGroupName)) {
                        this._chartMap[chartGroupName].clear();
                    }
                }
                this._chartMap = {};
            }
        }
        /**
         * Get an array of each chart instance in the given group.
         * If no group is provided, the charts in the default group are returned.
         */
        list(group) {
            return this.chartGroup(group).list();
        }
    }
    /**
     * The chartRegistry object maintains sets of all instantiated dc.js charts under named groups
     * and the default group.
     */
    const chartRegistry = new ChartRegistry();

    /**
     * Provides basis logging and deprecation utilities
     */
    class Logger {
        constructor() {
            this.enableDebugLog = false;
            this._alreadyWarned = {};
        }
        /**
         * Put a warning message to console
         *
         * @example
         * ```
         * logger.warn('Invalid use of .tension on CurveLinear');
         * ```
         */
        warn(msg) {
            if (console) {
                if (console.warn) {
                    console.warn(msg);
                }
                else if (console.log) {
                    console.log(msg);
                }
            }
            return this;
        }
        /**
         * Put a warning message to console. It will warn only on unique messages.
         *
         * @example
         * ```
         * logger.warnOnce('Invalid use of .tension on CurveLinear');
         * ```
         */
        warnOnce(msg) {
            if (!this._alreadyWarned[msg]) {
                this._alreadyWarned[msg] = true;
                logger.warn(msg);
            }
            return this;
        }
        /**
         * Put a debug message to console. It is controlled by `logger.enableDebugLog`
         *
         * @example
         * ```
         * logger.debug('Total number of slices: ' + numSlices);
         * ```
         */
        debug(msg) {
            if (this.enableDebugLog && console) {
                if (console.debug) {
                    console.debug(msg);
                }
                else if (console.log) {
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
        constructor() {
            /**
             * The default floating point format for dc.js.
             */
            this.floatFormat = d3Format.format('.2f');
            this._defaultColors = Config._schemeCategory20c;
            this.dateFormat = d3TimeFormat.timeFormat('%m/%d/%Y');
            this.disableTransitions = false;
        }
        defaultColors(colors) {
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
    // prettier-ignore
    Config._schemeCategory20c = [
        '#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#e6550d',
        '#fd8d3c', '#fdae6b', '#fdd0a2', '#31a354', '#74c476',
        '#a1d99b', '#c7e9c0', '#756bb1', '#9e9ac8', '#bcbddc',
        '#dadaeb', '#636363', '#969696', '#bdbdbd', '#d9d9d9'
    ];
    /**
     * General configuration object; see {@link Config} for members.
     */
    const config = new Config();

    // @ts-ignore
    config._renderlet = null; // type (group:string) => void

    /**
     * Add given chart instance to the given group, creating the group if necessary.
     * If no group is provided, the default group `constants.DEFAULT_CHART_GROUP` will be used.
     */
    function registerChart(chart, group) {
        chartRegistry.chartGroup(group).register(chart);
    }
    /**
     * Remove given chart instance from the given group, creating the group if necessary.
     * If no group is provided, the default group `constants.DEFAULT_CHART_GROUP` will be used.
     */
    function deregisterChart(chart, group) {
        chartRegistry.chartGroup(group).deregister(chart);
    }
    /**
     * Determine if a given chart instance resides in any group in the registry.
     */
    function hasChart(chart) {
        return chartRegistry.has(chart);
    }
    /**
     * Clear given group if one is provided, otherwise clears all groups.
     */
    function deregisterAllCharts(group) {
        chartRegistry.clear(group);
    }
    /**
     * Clear all filters on all charts within the given chart group. If the chart group is not given then
     * only charts that belong to the default chart group will be reset.
     */
    function filterAll(group) {
        chartRegistry.chartGroup(group).filterAll();
    }
    /**
     * Reset zoom level / focus on all charts that belong to the given chart group. If the chart group is
     * not given then only charts that belong to the default chart group will be reset.
     */
    function refocusAll(group) {
        chartRegistry.chartGroup(group).refocusAll();
    }
    /**
     * Re-render all charts belong to the given chart group. If the chart group is not given then only
     * charts that belong to the default chart group will be re-rendered.
     */
    function renderAll(group) {
        chartRegistry.chartGroup(group).renderAll();
        // @ts-ignore
        if (config._renderlet !== null) {
            // @ts-ignore
            config._renderlet(group);
        }
    }
    /**
     * Redraw all charts belong to the given chart group. If the chart group is not given then only charts
     * that belong to the default chart group will be re-drawn. Redraw is different from re-render since
     * when redrawing dc tries to update the graphic incrementally, using transitions, instead of starting
     * from scratch.
     */
    function redrawAll(group) {
        chartRegistry.chartGroup(group).redrawAll();
        // @ts-ignore
        if (config._renderlet !== null) {
            // @ts-ignore
            config._renderlet(group);
        }
    }

    /**
     * Start a transition on a selection if transitions are globally enabled
     * ({@link Config.disableTransitions disableTransitions} is false) and the duration is greater than zero; otherwise return
     * the selection. Since most operations are the same on a d3 selection and a d3 transition, this
     * allows a common code path for both cases.
     * @param selection - the selection to be transitioned
     * @param [duration=250] - the duration of the transition in milliseconds, a
     * function returning the duration, or 0 for no transition
     * @param [delay] - the delay of the transition in milliseconds, or a function
     * returning the delay, or 0 for no delay
     * @param [name] - the name of the transition (if concurrent transitions on the same
     * elements are needed)
     */
    function transition(selection, duration, delay, name) {
        // TODO: can we do typing for selection here
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
    }
    /* somewhat silly, but to avoid duplicating logic */
    function optionalTransition(enable, duration, delay, name) {
        if (enable) {
            return function (selection) {
                return transition(selection, duration, delay, name);
            };
        }
        else {
            return function (selection) {
                return selection;
            };
        }
    }
    // See http://stackoverflow.com/a/20773846
    function afterTransition(_transition, callback) {
        if (_transition.empty() || !_transition.duration) {
            callback.call(_transition);
        }
        else {
            let n = 0;
            _transition
                .each(() => {
                ++n;
            })
                .on('end', () => {
                if (!--n) {
                    callback.call(_transition);
                }
            });
        }
    }
    function instanceOfChart(o) {
        return o instanceof Object && o.__dcFlag__ && true;
    }

    function renderlet(_) {
        if (!arguments.length) {
            // @ts-ignore
            return config._renderlet;
        }
        // @ts-ignore
        config._renderlet = _;
        return null;
    }

    // TODO: convert this to a class so that events is an Object of that class
    const events = {
        current: null,
        trigger: undefined,
    };
    /**
     * This function triggers a throttled event function with a specified delay (in milli-seconds).  Events
     * that are triggered repetitively due to user interaction such brush dragging might flood the library
     * and invoke more renders than can be executed in time. Using this function to wrap your event
     * function allows the library to smooth out the rendering by throttling events and only responding to
     * the most recent event.
     *
     * @example
     * ```
     * chart.on('renderlet', function(chart) {
     *     // smooth the rendering through event throttling
     *     events.trigger(function(){
     *         // focus some other chart to the range selected by user on this chart
     *         someOtherChart.focus(chart.filter());
     *     }, 500);
     * })
     * ```
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
     */
    const filters = {
        /**
         * RangedFilter is a filter which accepts keys between `low` and `high`.  It is used to implement X
         * axis brushing for the {@link CoordinateGridMixin coordinate grid charts}.
         *
         * Its `filterType` is 'RangedFilter'
         * @name RangedFilter
         * @constructor
         */
        RangedFilter: (low, high) => new RangedFilter(low, high),
        /**
         * TwoDimensionalFilter is a filter which accepts a single two-dimensional value.  It is used by the
         * {@link HeatMap heat map chart} to include particular cells as they are clicked.  (Rows and columns are
         * filtered by filtering all the cells in the row or column.)
         *
         * Its `filterType` is 'TwoDimensionalFilter'
         * @name TwoDimensionalFilter
         * @constructor
         */
        TwoDimensionalFilter: filter => new TwoDimensionalFilter(filter),
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
         * @constructor
         */
        RangedTwoDimensionalFilter: filter => new RangedTwoDimensionalFilter(filter),
        /**
         * HierarchyFilter is a filter which accepts a key path as an array. It matches any node at, or
         * child of, the given path. It is used by the {@link SunburstChart sunburst chart} to include particular cells and all
         * their children as they are clicked.
         *
         * @name HierarchyFilter
         * @constructor
         */
        HierarchyFilter: path => new HierarchyFilter(path),
    };

    class InvalidStateException extends Error {
    }

    const pluck2 = function (n, f) {
        return function (d, i) {
            return f.call(d, d[n], i);
        };
    };
    function sortBy(data, ordering) {
        // clone the array before sorting, otherwise Array.sort sorts in-place
        return [...data].sort((a, b) => {
            return d3Array.ascending(ordering(a), ordering(b));
        });
    }
    /**
     * Print a single value filter.
     */
    function printSingleValue(filter) {
        let s = `${filter}`;
        if (filter instanceof Date) {
            s = config.dateFormat(filter);
        }
        else if (typeof filter === 'string') {
            s = filter;
        }
        else if (isFloat(filter)) {
            s = config.floatFormat(filter);
        }
        else if (isInteger(filter)) {
            s = `${Math.round(filter)}`;
        }
        return s;
    }
    // convert 'day' to d3.timeDay and similar
    function _toTimeFunc(t) {
        const mappings = {
            second: d3Time.timeSecond,
            minute: d3Time.timeMinute,
            hour: d3Time.timeHour,
            day: d3Time.timeDay,
            week: d3Time.timeWeek,
            month: d3Time.timeMonth,
            year: d3Time.timeYear,
        };
        return mappings[t];
    }
    /**
     * Arbitrary add one value to another.
     *
     * If the value l is of type Date, adds r units to it. t becomes the unit.
     * For example add(dt, 3, 'week') will add 3 (r = 3) weeks (t= 'week') to dt.
     *
     * If l is of type numeric, t is ignored. In this case if r is of type string,
     * it is assumed to be percentage (whether or not it includes %). For example
     * add(30, 10) will give 40 and add(30, '10') will give 33.
     *
     * They also generate strange results if l is a string.
     * @method add
     * @memberof utils
     * @param l the value to modify
     * @param r the amount by which to modify the value
     * @param [t=d3.timeDay] if `l` is a `Date`, then this should be a
     * [d3 time interval](https://github.com/d3/d3-time/blob/master/README.md#_interval).
     * For backward compatibility with dc.js 2.0, it can also be the name of an interval, i.e.
     * 'millis', 'second', 'minute', 'hour', 'day', 'week', 'month', or 'year'
     */
    function add(l, r, t) {
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
                t = _toTimeFunc(t);
            }
            return t.offset(l, r);
        }
        else if (typeof r === 'string') {
            const percentage = +r / 100;
            return l > 0 ? l * (1 + percentage) : l * (1 - percentage);
        }
        else {
            return l + r;
        }
    }
    /**
     * Arbitrary subtract one value from another.
     *
     * If the value l is of type Date, subtracts r units from it. t becomes the unit.
     * For example subtract(dt, 3, 'week') will subtract 3 (r = 3) weeks (t= 'week') from dt.
     *
     * If l is of type numeric, t is ignored. In this case if r is of type string,
     * it is assumed to be percentage (whether or not it includes %). For example
     * subtract(30, 10) will give 20 and subtract(30, '10') will give 27.
     *
     * They also generate strange results if l is a string.
     * @method subtract
     * @param l the value to modify
     * @param r the amount by which to modify the value
     * @param [t=d3.timeDay] if `l` is a `Date`, then this should be a
     * [d3 time interval](https://github.com/d3/d3-time/blob/master/README.md#_interval).
     * For backward compatibility with dc.js 2.0, it can also be the name of an interval, i.e.
     * 'millis', 'second', 'minute', 'hour', 'day', 'week', 'month', or 'year'
     */
    function subtract(l, r, t) {
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
                t = _toTimeFunc(t);
            }
            return t.offset(l, -r);
        }
        else if (typeof r === 'string') {
            const percentage = +r / 100;
            return l < 0 ? l * (1 + percentage) : l * (1 - percentage);
        }
        else {
            return l - r;
        }
    }
    /**
     * Is the value a number?
     */
    function isNumber(n) {
        return n === +n;
    }
    /**
     * Is the value a float?
     */
    function isFloat(n) {
        // tslint:disable-next-line:no-bitwise
        return n === +n && n !== (n | 0);
    }
    /**
     * Is the value an integer?
     */
    function isInteger(n) {
        // tslint:disable-next-line:no-bitwise
        return n === +n && n === (n | 0);
    }
    /**
     * Is the value very close to zero?
     */
    function isNegligible(n) {
        return !isNumber(n) || (n < constants.NEGLIGIBLE_NUMBER && n > -constants.NEGLIGIBLE_NUMBER);
    }
    /**
     * Ensure the value is no greater or less than the min/max values.  If it is return the boundary value.
     */
    function clamp(val, min, max) {
        return val < min ? min : val > max ? max : val;
    }
    /**
     * Using a simple static counter, provide a unique integer id.
     */
    let _idCounter = 0;
    function uniqueId() {
        return ++_idCounter;
    }
    /**
     * Convert a name to an ID.
     */
    function nameToId(name) {
        return name.toLowerCase().replace(/[\s]/g, '_').replace(/[\.']/g, '');
    }
    /**
     * Append or select an item on a parent element.
     */
    function appendOrSelect(parent, selector, tag) {
        tag = tag || selector;
        let element = parent.select(selector);
        if (element.empty()) {
            element = parent.append(tag);
        }
        return element;
    }
    /**
     * Return the number if the value is a number; else 0.
     */
    function safeNumber(n) {
        return isNumber(+n) ? +n : 0;
    }
    /**
     * Return true if both arrays are equal, if both array are null these are considered equal
     */
    function arraysEqual(a1, a2) {
        if (!a1 && !a2) {
            return true;
        }
        if (!a1 || !a2) {
            return false;
        }
        return (a1.length === a2.length &&
            // If elements are not integers/strings, we hope that it will match because of toString
            // Test cases cover dates as well.
            a1.every((elem, i) => elem.valueOf() === a2[i].valueOf()));
    }
    // ******** Sunburst Chart ********
    function allChildren(node) {
        let paths = [];
        paths.push(node.path);
        console.log('currentNode', node);
        if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
                paths = paths.concat(allChildren(node.children[i]));
            }
        }
        return paths;
    }
    // builds a d3 Hierarchy from a collection
    // TODO: turn this monster method something better.
    function toHierarchy(list, accessor) {
        const root = { key: 'root', children: [] };
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
                    childNode = _findChild(children, nodeName);
                    // If we don't already have a child node for this branch, create it.
                    if (childNode === void 0) {
                        childNode = { key: nodeName, children: [], path: currentPath };
                        children.push(childNode);
                    }
                    currentNode = childNode;
                }
                else {
                    // Reached the end of the sequence; create a leaf node.
                    childNode = { key: nodeName, value, data, path: currentPath };
                    children.push(childNode);
                }
            }
        }
        return root;
    }
    function _findChild(children, nodeName) {
        for (let k = 0; k < children.length; k++) {
            if (children[k].key === nodeName) {
                return children[k];
            }
        }
    }
    function getAncestors(node) {
        const path = [];
        let current = node;
        while (current.parent) {
            path.unshift(current.name);
            current = current.parent;
        }
        return path;
    }
    function arraysIdentical(a, b) {
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
    }

    /**
     * Converts a list of filters into a readable string.
     */
    function printFilters(filters) {
        return filters.map(filter => printFilter(filter)).join(', ');
    }
    /**
     * Converts a filter into a readable string.
     */
    function printFilter(filter) {
        let s = '';
        if (typeof filter !== 'undefined' && filter !== null) {
            if (filter instanceof Array) {
                if (filter.length >= 2) {
                    s = `[${filter.map(e => printSingleValue(e)).join(' -> ')}]`;
                }
                else if (filter.length >= 1) {
                    s = printSingleValue(filter[0]);
                }
            }
            else {
                s = printSingleValue(filter);
            }
        }
        return s;
    }

    const printers = {
        filter: printFilter,
        filters: printFilters,
    };

    /**
     * The default value for {@link ICoordinateGridMixinConf.xUnits | .xUnits} for the
     * {@link CoordinateGridMixin | Coordinate Grid Chart} and should
     * be used when the x values are a sequence of integers.
     * It is a function that counts the number of integers in the range supplied in its start and end parameters.
     *
     * @see {@link ICoordinateGridMixinConf.xUnits}
     *
     * @example
     * ```
     * chart.xUnits(UnitsIntegers) // already the default
     * ```
     */
    const UnitsInteger = function (start, end) {
        return Math.abs(end - start);
    };
    /**
     * This argument can be passed to the {@link ICoordinateGridMixinConf.xUnits | .xUnits} function of a
     * coordinate grid chart to specify ordinal units for the x axis. Usually this parameter is used in
     * combination with passing
     * {@link https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales | d3.scaleOrdinal}
     * to {@link CoordinateGridMixin.x | .x}.
     *
     * As of dc.js 3.0, this is purely a placeholder or magic value which causes the chart to go into ordinal mode; the
     * function is not called.
     *
     * @see {@link https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales | d3.scaleOrdinal}
     * @see {@link ICoordinateGridMixinConf.xUnits}
     * @see {@link CoordinateGridMixin.x | coordinateGridMixin.x}
     *
     * @example
     * ```
     * chart.xUnits(UnitsOrdinal)
     *      .x(d3.scaleOrdinal())
     * ```
     */
    const UnitsOrdinal = function (start, end) {
        throw new Error('dc.units.ordinal should not be called - it is a placeholder');
    };
    /**
     * This function generates an argument for the {@link CoordinateGridMixin | Coordinate Grid Chart}
     * {@link ICoordinateGridMixinConf.xUnits | .xUnits} function specifying that the x values are floating-point
     * numbers with the given precision.
     * The returned function determines how many values at the given precision will fit into the range
     * supplied in its start and end parameters.
     *
     * @see {@link ICoordinateGridMixinConf.xUnits}
     *
     * @example
     * ```
     * // specify values (and ticks) every 0.1 units
     * chart.xUnits(UnitWithPrecision(0.1))
     *
     * // there are 500 units between 0.5 and 1 if the precision is 0.001
     * var thousandths = UnitWithPrecision(0.001);
     *
     * thousandths(0.5, 1.0) // returns 500
     * ```
     */
    const UnitWithPrecision = function (precision) {
        const _f = function (s, e) {
            const d = Math.abs((e - s) / _f.resolution);
            if (isNegligible(d - Math.floor(d))) {
                return Math.floor(d);
            }
            else {
                return Math.ceil(d);
            }
        };
        _f.resolution = precision;
        return _f;
    };

    const units = {
        integers: UnitsInteger,
        ordinal: UnitsOrdinal,
        fp: { precision: UnitWithPrecision },
    };

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
     */
    const pluck = function (n, f) {
        if (!f) {
            return function (d) {
                return d[n];
            };
        }
        return function (d, i) {
            return f.call(d, d[n], i);
        };
    };
    const utils = {
        add: add,
        allChildren: allChildren,
        appendOrSelect: appendOrSelect,
        arraysEqual: arraysEqual,
        arraysIdentical: arraysIdentical,
        clamp: clamp,
        constant: function (x) {
            return () => x;
        },
        getAncestors: getAncestors,
        isFloat: isFloat,
        isInteger: isInteger,
        isNegligible: isNegligible,
        isNumber: isNumber,
        nameToId: nameToId,
        printSingleValue: printSingleValue,
        safeNumber: safeNumber,
        subtract: subtract,
        toHierarchy: toHierarchy,
        uniqueId: uniqueId,
    };

    // https://github.com/d3/d3-plugins/blob/master/box/box.js
    /**
     * Used by BoxPlot
     *
     * @hidden
     */
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
        function box(g) {
            g.each(function (data, index) {
                data = data.map(value).sort(d3Array.ascending);
                const _g = d3Selection.select(this);
                const n = data.length;
                let min;
                let max;
                // Leave if there are no items.
                if (n === 0) {
                    return;
                }
                // Compute quartiles. Must return exactly 3 elements.
                const quartileData = (data.quartiles = quartiles(data));
                // Compute whiskers. Must return exactly 2 elements, or null.
                const whiskerIndices = whiskers && whiskers.call(this, data, index);
                const whiskerData = whiskerIndices && whiskerIndices.map(_i => data[_i]);
                // Compute outliers. If no whiskers are specified, all data are 'outliers'.
                // We compute the outliers as indices, so that we can join across transitions!
                const outlierIndices = whiskerIndices
                    ? d3Array.range(0, whiskerIndices[0]).concat(d3Array.range(whiskerIndices[1] + 1, n))
                    : d3Array.range(n);
                // Determine the maximum value based on if outliers are shown
                if (showOutliers) {
                    min = data[0];
                    max = data[n - 1];
                }
                else {
                    min = data[whiskerIndices[0]];
                    max = data[whiskerIndices[1]];
                }
                const pointIndices = d3Array.range(whiskerIndices[0], whiskerIndices[1] + 1);
                // Compute the new x-scale.
                const x1 = d3Scale.scaleLinear()
                    .domain((domain && domain.call(this, data, index)) || [min, max])
                    .range([height, 0]);
                // Retrieve the old x-scale, if this is an update.
                const x0 = this.__chart__ || d3Scale.scaleLinear().domain([0, Infinity]).range(x1.range());
                // Stash the new scale.
                this.__chart__ = x1;
                // Note: the box, median, and box tick elements are fixed in number,
                // so we only have to handle enter and update. In contrast, the outliers
                // and other elements are variable, so we need to exit them! Variable
                // elements also fade in and out.
                // Update center line: the vertical line spanning the whiskers.
                const center = _g.selectAll('line.center').data(whiskerData ? [whiskerData] : []);
                center
                    .enter()
                    .insert('line', 'rect')
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
                center
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .style('opacity', 1)
                    .attr('x1', width / 2)
                    .attr('x2', width / 2)
                    .attr('y1', d => x1(d[0]))
                    .attr('y2', d => x1(d[1]));
                center
                    .exit()
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .style('opacity', 1e-6)
                    .attr('y1', d => x1(d[0]))
                    .attr('y2', d => x1(d[1]))
                    .remove();
                // Update innerquartile box.
                const _box = _g.selectAll('rect.box').data([quartileData]);
                _box.enter()
                    .append('rect')
                    .attr('class', 'box')
                    .attr('x', 0)
                    .attr('y', d => x0(d[2]))
                    .attr('width', width)
                    .attr('height', d => x0(d[0]) - x0(d[2]))
                    .style('fill-opacity', renderDataPoints ? 0.1 : 1)
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
                const medianLine = _g.selectAll('line.median').data([quartileData[1]]);
                medianLine
                    .enter()
                    .append('line')
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
                medianLine
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .attr('x1', 0)
                    .attr('x2', width)
                    .attr('y1', x1)
                    .attr('y2', x1);
                // Update whiskers.
                const whisker = _g.selectAll('line.whisker').data(whiskerData || []);
                whisker
                    .enter()
                    .insert('line', 'circle, text')
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
                whisker
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .attr('x1', 0)
                    .attr('x2', width)
                    .attr('y1', x1)
                    .attr('y2', x1)
                    .style('opacity', 1);
                whisker
                    .exit()
                    .transition()
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
                    const outlierX = boldOutlier
                        ? function () {
                            return Math.floor(Math.random() * (width * dataWidthPortion) +
                                1 +
                                (width - width * dataWidthPortion) / 2);
                        }
                        : function () {
                            return width / 2;
                        };
                    const outlier = _g.selectAll(`circle.${outlierClass}`).data(outlierIndices, Number);
                    outlier
                        .enter()
                        .insert('circle', 'text')
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
                    outlier
                        .transition()
                        .duration(duration)
                        .delay(delay)
                        .attr('cx', outlierX)
                        .attr('cy', i => x1(data[i]))
                        .style('opacity', 0.6);
                    outlier
                        .exit()
                        .transition()
                        .duration(duration)
                        .delay(delay)
                        .attr('cy', 0) // function (i) { return x1(d[i]); })
                        .style('opacity', 1e-6)
                        .remove();
                }
                // Update Values
                if (renderDataPoints) {
                    const point = _g.selectAll('circle.data').data(pointIndices);
                    point
                        .enter()
                        .insert('circle', 'text')
                        .attr('class', 'data')
                        .attr('r', dataRadius)
                        .attr('cx', () => Math.floor(Math.random() * (width * dataWidthPortion) +
                        1 +
                        (width - width * dataWidthPortion) / 2))
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
                    point
                        .transition()
                        .duration(duration)
                        .delay(delay)
                        .attr('cx', () => Math.floor(Math.random() * (width * dataWidthPortion) +
                        1 +
                        (width - width * dataWidthPortion) / 2))
                        .attr('cy', i => x1(data[i]))
                        .style('opacity', dataOpacity);
                    point
                        .exit()
                        .transition()
                        .duration(duration)
                        .delay(delay)
                        .attr('cy', 0)
                        .style('opacity', 1e-6)
                        .remove();
                }
                // Compute the tick format.
                const format = tickFormat || x1.tickFormat(8);
                // Update box ticks.
                const boxTick = _g.selectAll('text.box').data(quartileData);
                // tslint:disable:no-bitwise
                boxTick
                    .enter()
                    .append('text')
                    .attr('class', 'box')
                    .attr('dy', '.3em')
                    .attr('dx', (d, i) => (i & 1 ? 6 : -6))
                    .attr('x', (d, i) => (i & 1 ? width : 0))
                    .attr('y', x0)
                    .attr('text-anchor', (d, i) => (i & 1 ? 'start' : 'end'))
                    .text(format)
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .attr('y', x1);
                boxTick
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .text(format)
                    .attr('x', (d, i) => (i & 1 ? width : 0))
                    .attr('y', x1);
                // tslint:enable:no-bitwise
                // Update whisker ticks. These are handled separately from the box
                // ticks because they may or may not exist, and we want don't want
                // to join box ticks pre-transition with whisker ticks post-.
                const whiskerTick = _g.selectAll('text.whisker').data(whiskerData || []);
                whiskerTick
                    .enter()
                    .append('text')
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
                whiskerTick
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .text(format)
                    .attr('x', width)
                    .attr('y', x1)
                    .style('opacity', 1);
                whiskerTick
                    .exit()
                    .transition()
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
            domain = x === null ? x : typeof x === 'function' ? x : () => x;
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
    /**
     * Used by BoxPlot
     *
     * @hidden
     */
    function boxWhiskers(d) {
        return [0, d.length - 1];
    }
    /**
     * Used by BoxPlot
     *
     * @hidden
     */
    function boxQuartiles(d) {
        return [d3Array.quantile(d, 0.25), d3Array.quantile(d, 0.5), d3Array.quantile(d, 0.75)];
    }

    class AbstractColorHelper {
        /**
         * Charts call this method to lookup actual colors.
         * Rarely called in user code.
         *
         * @category Intermediate
         */
        getColor(d, i) {
            return undefined;
        }
        /**
         * Composite charts need the same underlying scale, however, with a different {@link colorAccessor}.
         * It is unlikely that it will be used directly.
         *
         * @category Ninja
         */
        share(colorAccessor) {
            return this;
        }
    }

    /**
     * Overrides the color selection algorithm, replacing it with a simple function.
     *
     * Normally colors will be determined by calling the {@linkcode AbstractColorHelper.colorAccessor | colorAccessor}
     * to get a value, and then passing that value through the {@linkcode ColorScaleHelper.colorScale | colorScale}.
     *
     * But sometimes it is difficult to get a color scale to produce the desired effect. The `colorCalculator`
     * takes the datum and index and returns a color directly.
     */
    class ColorCalculator extends AbstractColorHelper {
        /**
         * Create a new instance
         */
        constructor(colorCalculator) {
            super();
            this.getColor = colorCalculator;
        }
    }

    class ColorScaleHelper extends AbstractColorHelper {
        constructor(colorScale) {
            super();
            this.colorScale = colorScale;
        }
        getColor(d, i) {
            return this.colorScale(this.colorAccessor(d, i));
        }
        /**
         * It is unlikely that it will be used directly.
         *
         * @category Ninja
         * @see {@link AbstractColorHelper.share}
         */
        share(colorAccessor) {
            const clonedScale = new ColorScaleHelper(this.colorScale);
            clonedScale.colorAccessor = colorAccessor;
            return clonedScale;
        }
    }

    class LinearColors extends ColorScaleHelper {
        constructor(range) {
            const scale = d3Scale.scaleLinear().range(range).interpolate(d3Interpolate.interpolateHcl);
            super(scale);
        }
    }

    /**
     * Provide colors based on {@link https://github.com/d3/d3-scale#scaleOrdinal | d3.scaleOrdinal}.
     *
     * This is most used option in `dc` charts and it is the default.
     * It needs a list of colors which can be any CSS accepted color values.
     *
     * Occasionally you would use one of the d3 supplied colors or color scales.
     * Please see {@link https://github.com/d3/d3-scale-chromatic}, any of the schemes may be used as
     * ordinal colors.
     *
     * ```
     * // TODO example
     * ```
     *
     * If a domain is set explicitly it maps the colors in sequence.
     *
     * ```
     * // TODO example
     * ```
     *
     * However, it is not mandatory to set a domain explicitly.
     * If domain is not explicitly provided it keeps getting built as the scale is queried for new domain values.
     *
     * ```
     * // TODO example
     * ```
     */
    class OrdinalColors extends ColorScaleHelper {
        constructor(colors) {
            const scale = d3Scale.scaleOrdinal().range(colors);
            super(scale);
        }
    }

    class FilterHandler {
        constructor() {
            this._filters = []; // TODO: find better types
        }
        get filters() {
            return this._filters;
        }
        set filters(value) {
            this._filters = value;
        }
        /**
         * Check whether any active filter or a specific filter is associated.
         */
        hasFilter(filter) {
            if (filter === null || typeof filter === 'undefined') {
                return this.filters.length > 0;
            }
            return this.filters.some(f => filter <= f && filter >= f);
        }
        /**
         * Different data backends will implement it differently.
         * Crossfilter version will apply the filter onto the corresponding dimension.
         */
        applyFilters() {
            // do nothing at this level, derived classes will actually implement it
        }
        /**
         * This will notify charts that filters have changed.
         * It will be implemented in one of derived classes.
         */
        notifyListeners(filter) { }
        filter(filter) {
            if (!arguments.length) {
                return this.filters.length > 0 ? this.filters[0] : null;
            }
            if (filter === null) {
                this.resetFilters();
            }
            else if (filter instanceof Array &&
                filter[0] instanceof Array &&
                !filter.isFiltered) {
                // list of filters
                filter[0].forEach(f => this.toggleFilter(f));
            }
            else {
                this.toggleFilter(filter);
            }
            this.applyFilters();
            this.notifyListeners(filter);
            return this;
        }
        toggleFilter(filter) {
            if (this.hasFilter(filter)) {
                this.removeFilter(filter);
            }
            else {
                this.addFilter(filter);
            }
        }
        /**
         * Add this filter to existing filters.
         *
         * Override this if you need to alter the default behaviour of this filter to be just appended to the current list.
         *
         * TODO: link to example
         */
        addFilter(f) {
            this.filters.push(f);
        }
        /**
         * Remove this filter from existing filters.
         *
         * Override this if you need to alter the default behaviour of this filter to be just removed from the current list.
         *
         * TODO: link to example
         */
        removeFilter(filter) {
            this.filters = this.filters.filter(f => !(filter <= f && filter >= f));
        }
        /**
         * Clear current filters.
         */
        resetFilters() {
            this.filters = [];
        }
        /**
         * An opportunity to cleanup.
         */
        dispose() {
            // use this to cleanup before discarding
        }
    }

    class CFFilterHandler extends FilterHandler {
        constructor(conf = {}) {
            super();
            this.configure(conf);
        }
        configure(conf) {
            this._conf = Object.assign(Object.assign({}, this._conf), conf);
            return this;
        }
        conf() {
            return this._conf;
        }
        applyFilters() {
            if (!(this._conf.dimension && this._conf.dimension.filter)) {
                return;
            }
            if (this.filters.length === 0) {
                this._conf.dimension.filter(null);
            }
            else if (this.filters.length === 1 && !this.filters[0].isFiltered) {
                // single value and not a function-based filter
                this._conf.dimension.filterExact(this.filters[0]);
            }
            else if (this.filters.length === 1 && this.filters[0].filterType === 'RangedFilter') {
                // single range-based filter
                this._conf.dimension.filterRange(this.filters[0]);
            }
            else {
                this._conf.dimension.filterFunction(d => {
                    for (let i = 0; i < this.filters.length; i++) {
                        const filter = this.filters[i];
                        if (filter.isFiltered) {
                            if (filter.isFiltered(d)) {
                                return true;
                            }
                        }
                        else if (filter <= d && filter >= d) {
                            return true;
                        }
                    }
                    return false;
                });
            }
        }
    }

    class FilterStorageHelper extends CFFilterHandler {
        constructor(conf = {}) {
            super(Object.assign({ 
                // @ts-ignore
                shareFilters: true }, conf));
        }
        conf() {
            return super.conf();
        }
        configure(conf) {
            super.configure(conf);
            this._ensureListenerRegistered();
            return this;
        }
        _ensureListenerRegistered() {
            if (!this._conf.filterStorage) {
                return;
            }
            // If it was already registered, we check if the storage ky is still same
            // in case that has changed we need to de-register and register afresh
            const storageKey = this._storageKey();
            if (this._listenerRegToken) {
                if (this._listenerRegToken.storageKey === storageKey) {
                    // all good, storageKey has not changed
                    return;
                }
                // storageKey changed, de-register first
                this._deRegisterListener();
            }
            this._listenerRegToken = this._conf.filterStorage.registerFilterListener({
                storageKey,
                onFiltersChanged: this._conf.onFiltersChanged,
                chartId: this._conf.chartId,
                primaryChart: this._conf.primaryChart,
                applyFilters: filters => this.applyFilters(),
            });
        }
        _deRegisterListener() {
            this._conf.filterStorage.deRegisterFilterListener(this._listenerRegToken.storageKey, this._listenerRegToken);
            this._listenerRegToken = undefined;
        }
        _storageKey() {
            if (this._conf.shareFilters) {
                return this._conf.dimension;
            }
            else {
                return this;
            }
        }
        get filters() {
            return this._conf.filterStorage.getFiltersFor(this._storageKey());
        }
        set filters(value) {
            this._conf.filterStorage.setFiltersFor(this._storageKey(), value);
        }
        notifyListeners(filters) {
            this._conf.filterStorage.notifyListeners(this._storageKey(), filters);
        }
        dispose() {
            super.dispose();
            if (this._listenerRegToken) {
                this._deRegisterListener();
            }
        }
    }

    class CFSimpleAdapter extends FilterStorageHelper {
        constructor(conf = {}) {
            super(Object.assign({ valueAccessor: d => d.value, ordering: d => d.key }, conf));
        }
        configure(conf) {
            return super.configure(conf);
        }
        conf() {
            return super.conf();
        }
        // TODO: better typing
        data() {
            const entities = this._conf.group.all();
            // create a two level deep copy defensively
            entities.map(val => (Object.assign({}, val)));
            entities.forEach(e => {
                e._value = this._conf.valueAccessor(e);
            });
            return entities;
        }
    }

    /**
     * `BaseMixin` is an abstract functional object representing a basic `dc` chart object
     * for all chart and widget implementations. Methods from this class are inherited
     * and available on all chart implementations in the `dc` library.
     */
    class BaseMixin$1 {
        /**
         * Create a new chart
         */
        constructor(parent, chartGroup) {
            this._anchor = undefined;
            this._root = undefined;
            this._svg = undefined;
            this._isChild = undefined;
            this.__dcFlag__ = uniqueId().toString();
            this._chartGroup = this._getChartGroup(chartGroup);
            this.anchor(parent);
            this.configure({
                minWidth: 200,
                minHeight: 200,
                useViewBoxResizing: false,
                filterPrinter: printFilters,
                controlsUseVisibility: false,
                transitionDuration: 750,
                transitionDelay: 0,
                commitHandler: undefined,
                keyAccessor: d => d.key,
                label: d => d.key,
                renderLabel: false,
                renderTitle: true,
                title: d => `${this._conf.keyAccessor(d)}: ${d._value}`,
            });
            this.dataProvider(new CFSimpleAdapter());
            this._calculatedWidth = undefined;
            this._calculatedHeight = undefined;
            this._mandatoryAttributesList = [];
            this._listeners = d3Dispatch.dispatch('preRender', 'postRender', 'preRedraw', 'postRedraw', 'filtered', 'zoomed', 'renderlet', 'pretransition');
            this._legend = undefined;
        }
        /**
         * An opportunity to cleanup.
         *
         * @category Ninja
         */
        dispose() {
            if (this._dataProvider) {
                this._dataProvider.dispose();
            }
        }
        /**
         * Configure this chart. The given options are merged with current options.
         */
        configure(conf) {
            this._conf = Object.assign(Object.assign({}, this._conf), conf);
            return this;
        }
        /**
         * Get the current configuration.
         *
         * It returns reference to the internal structure.
         * Any changes made may have unintended consequences.
         *
         * @category Intermediate
         */
        conf() {
            return this._conf;
        }
        dataProvider(dataProvider) {
            if (!arguments.length) {
                return this._dataProvider;
            }
            // cleanup previous data provider
            if (this._dataProvider) {
                this._dataProvider.dispose();
            }
            this._dataProvider = dataProvider;
            this._dataProvider.configure({
                chartId: this.anchorName(),
                primaryChart: !this._isChild,
                filterStorage: this.chartGroup().filterStorage,
                onFiltersChanged: filter => this._filtersChanged(filter),
            });
            return this;
        }
        /**
         * Current height of the chart.
         *
         * To explicitly set height, please set {@link IBaseMixinConf.height} as part of the
         * chart configuration.
         *
         * If not set explicitly the size will be as per the anchor HTML element subject to a minimum
         * as set in {@link IBaseMixinConf.minHeight}.
         * In that case it will keep automatically resizing as well.
         *
         * @see {@link width}
         * @see {@link IBaseMixinConf.minHeight}
         */
        height() {
            if (isNumber(this.conf().height)) {
                return this.conf().height;
            }
            return this._calculatedHeight;
        }
        /**
         * Current width of the chart.
         *
         * To explicitly set width, please set {@link IBaseMixinConf.width} as part of the
         * chart configuration.
         *
         * If not set explicitly the size will be as per the anchor HTML element subject to a minimum
         * as set in {@link IBaseMixinConf.minWidth}.
         * In that case it will keep automatically resizing as well.
         *
         * @see {@link height}
         * @see {@link IBaseMixinConf.minWidth}
         */
        width() {
            if (isNumber(this.conf().width)) {
                return this.conf().width;
            }
            return this._calculatedWidth;
        }
        /**
         * This is called to determine size of the chart based on the bounding rectangle.
         * The default implementation ensures that the chart is at least as big as the minimums defined
         * by {@link IBaseMixinConf.minWidth} and {@link IBaseMixinConf.minHeight}.
         *
         * @category Ninja
         */
        onResize(rect) {
            const width = d3Array.max([rect.width, this.conf().minWidth]);
            const height = d3Array.max([rect.height, this.conf().minHeight]);
            rect = { width, height };
            if (this.conf().beforeResize) {
                this.conf().beforeResize(rect);
            }
            return rect;
        }
        /**
         * Handle the actual resizing of the chart if the size needs to change based on bounding
         * rectangle.
         *
         * @category Ninja
         */
        handleResize(rect) {
            this.withoutTransitions(() => {
                this._calculatedWidth = rect.width;
                this._calculatedHeight = rect.height;
                this.redraw();
            });
        }
        /**
         * Return charts data, typically `group.all()`. Some charts override this method.
         * The derived classes may even use different return type.
         *
         * @category Ninja
         */
        data() {
            return this._dataProvider.data();
        }
        /**
         * @hidden
         */
        _computeOrderedGroups(data) {
            return sortBy(data, this._dataProvider.conf().ordering);
        }
        /**
         * Clear all filters associated with this chart. The same effect can be achieved by calling
         * {@link filter | chart.filter(null)}.
         *
         * @category Intermediate
         */
        filterAll() {
            return this.filter(null);
        }
        /**
         * Execute d3 single selection in the chart's scope using the given selector and return the d3
         * selection.
         *
         * This function is **not chainable** since it does not return a chart instance; however the d3
         * selection result can be chained to d3 function calls.
         *
         * This is typically used in augmenting/modifying a chart.
         *
         * TODO link to example
         *
         * @see {@link https://github.com/d3/d3-selection/blob/master/README.md#select | d3.select}
         *
         * @example
         * ```
         * // Has the same effect as d3.select('#chart-id').select(selector)
         * chart.select(selector)
         *
         * ```
         *
         * @category Intermediate
         * @param sel CSS selector string
         */
        select(sel) {
            return this._root.select(sel);
        }
        /**
         * Execute in scope d3 selectAll using the given selector and return d3 selection result.
         *
         * This function is **not chainable** since it does not return a chart instance; however the d3
         * selection result can be chained to d3 function calls.
         *
         * This is typically used in augmenting/modifying a chart.
         *
         * TODO link to example
         *
         * @see {@link https://github.com/d3/d3-selection/blob/master/README.md#selectAll | d3.selectAll}
         *
         * @example
         * ```
         * // Has the same effect as d3.select('#chart-id').selectAll(selector)
         * chart.selectAll(selector)
         * ```
         * @category Intermediate
         * @param sel CSS selector string
         */
        selectAll(sel) {
            return this._root ? this._root.selectAll(sel) : null;
        }
        anchor(parent) {
            if (!arguments.length) {
                return this._anchor;
            }
            if (instanceOfChart(parent)) {
                this._anchor = parent.anchor();
                if (this._anchor.children) {
                    // is _anchor a div?
                    this._anchor = `#${parent.anchorName()}`;
                }
                this._root = parent.root();
                this._isChild = true;
            }
            else if (parent) {
                if (parent.select && parent.classed) {
                    // detect d3 selection
                    this._anchor = parent.node();
                }
                else {
                    this._anchor = parent;
                }
                this._root = d3Selection.select(this._anchor); // _anchor can be either string or an Element, both are valid
                this._root.classed(constants.CHART_CLASS, true);
                this._chartGroup.register(this);
                this._isChild = false;
            }
            else {
                throw new BadArgumentException('parent must be defined');
            }
            return this;
        }
        _getChartGroup(chartGroup) {
            return !chartGroup || typeof chartGroup === 'string'
                ? chartRegistry.chartGroup(chartGroup)
                : chartGroup;
        }
        /**
         * Returns the DOM id for the chart's anchored location.
         * @category Intermediate
         */
        anchorName() {
            const a = this.anchor();
            if (a) {
                if (typeof a === 'string') {
                    return a.replace('#', '');
                }
                else if (a.id) {
                    return a.id;
                }
            }
            return `dc-chart${this.chartID()}`;
        }
        root(rootElement) {
            if (!arguments.length) {
                return this._root;
            }
            this._root = rootElement;
            return this;
        }
        svg(svgElement) {
            if (!arguments.length) {
                return this._svg;
            }
            this._svg = svgElement;
            return this;
        }
        /**
         * Remove the chart's SVGElements from the dom and recreate the container SVGElement.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/SVGElement | SVGElement}
         *
         * @hidden
         */
        resetSvg() {
            this.select('svg').remove();
            return this.generateSvg();
        }
        /**
         * @hidden
         */
        sizeSvg() {
            if (this._svg) {
                if (!this._conf.useViewBoxResizing) {
                    this._svg.attr('width', this.width()).attr('height', this.height());
                }
                else if (!this._svg.attr('viewBox')) {
                    this._svg.attr('viewBox', `0 0 ${this.width()} ${this.height()}`);
                }
            }
        }
        /**
         * @hidden
         */
        generateSvg() {
            this._svg = this.root().append('svg');
            this.sizeSvg();
            return this._svg;
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
         *
         * @see {@link turnOffControls}
         * @category Intermediate
         */
        turnOnControls() {
            if (this._root) {
                const attribute = this._conf.controlsUseVisibility ? 'visibility' : 'display';
                this.selectAll('.reset').style(attribute, null);
                this.selectAll('.filter')
                    .text(this._conf.filterPrinter(this.filters()))
                    .style(attribute, null);
            }
            return this;
        }
        /**
         * Turn off optional control elements within the root element.
         *
         * @see {@link turnOnControls}
         * @category Intermediate
         */
        turnOffControls() {
            if (this._root) {
                const attribute = this._conf.controlsUseVisibility ? 'visibility' : 'display';
                const value = this._conf.controlsUseVisibility ? 'hidden' : 'none';
                this.selectAll('.reset').style(attribute, value);
                this.selectAll('.filter').style(attribute, value).text(this.filter());
            }
            return this;
        }
        /**
         * @hidden
         */
        _mandatoryAttributes(_) {
            if (!arguments.length) {
                return this._mandatoryAttributesList;
            }
            this._mandatoryAttributesList = _;
            return this;
        }
        /**
         * @hidden
         */
        checkForMandatoryAttributes(a) {
            if (!this[a] || !this[a]()) {
                throw new InvalidStateException(`Mandatory attribute chart.${a} is missing on chart[#${this.anchorName()}]`);
            }
        }
        /**
         * Invoking this method will force the chart to re-render everything from scratch. Generally it
         * should only be used to render the chart for the first time on the page or if you want to make
         * sure everything is redrawn from scratch instead of relying on the default incremental redrawing
         * behaviour.
         *
         * Typically you would invoke {@link renderGroup} which will redraw all charts within the {@link chartGroup}.
         */
        render() {
            // the HTML element
            const elem = this.root() && this.root().node();
            // if there is a root HTML element, calculate initial size
            if (elem) {
                let { width, height } = this._calculateSize(elem);
                this._calculatedWidth = width;
                this._calculatedHeight = height;
            }
            this._listeners.call('preRender', this, this);
            // if (this._mandatoryAttributesList) {
            //     this._mandatoryAttributesList.forEach(e => this.checkForMandatoryAttributes(e));
            // }
            this._doRender();
            if (this._legend) {
                this._legend.render();
            }
            this._activateRenderlets('postRender');
            this._registerResizeObserver(elem);
            return this;
        }
        _calculateSize(elem) {
            const rect = elem.getBoundingClientRect();
            const cs = getComputedStyle(elem);
            const paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
            const paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
            const borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
            const borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
            const width = rect.width - paddingX - borderX;
            const height = rect.height - paddingY - borderY;
            return this.onResize({ width, height });
        }
        _registerResizeObserver(elem) {
            if (this._resizeObserver) {
                this._resizeObserver.disconnect();
                this._resizeObserver = null;
            }
            let firstTime = true;
            if (elem) {
                // If both width and height have been explicitly specified, do not install
                // the resizeObserver
                if (!isNumber(this.conf().width) || !isNumber(this.conf().height)) {
                    this._resizeObserver = new ResizeObserver(entries => {
                        // It is called just after we start observing, ignore the first call
                        if (firstTime) {
                            firstTime = false;
                        }
                        else {
                            const rect = this.onResize(entries[0].contentRect);
                            this.handleResize(rect);
                        }
                    });
                    this._resizeObserver.observe(elem);
                }
            }
        }
        /**
         * It needs to be public as it is used by Composite Charts
         * @hidden
         */
        _activateRenderlets(event) {
            this._listeners.call('pretransition', this, this);
            if (this._conf.transitionDuration > 0 && this._svg) {
                this._svg
                    .transition()
                    .duration(this._conf.transitionDuration)
                    .delay(this._conf.transitionDelay)
                    .on('end', () => {
                    this._listeners.call('renderlet', this, this);
                    if (event) {
                        this._listeners.call(event, this, this);
                    }
                });
            }
            else {
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
         * events; therefore, you only need to
         * manually invoke this function if data is manipulated outside of dc's control (for example if
         * data is loaded in the background using
         * {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#crossfilter_add | crossfilter.add}).
         *
         * Typically you would invoke {@link redrawGroup} which will redraw all charts within the {@link chartGroup}.
         */
        redraw() {
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
         * Redraw all charts in the same group as this chart, typically in reaction to a filter
         * change. If the chart has a {@link IBaseMixinConf.commitHandler commitHandler}, it will
         * be executed and waited for. It internally calls {@link ChartGroup.redrawAll}
         *
         * @see {@link redraw}
         * @see {@link chartGroup}
         */
        redrawGroup() {
            if (this._conf.commitHandler) {
                this._conf.commitHandler(false, (error, result) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        this.chartGroup().redrawAll();
                    }
                });
            }
            else {
                this.chartGroup().redrawAll();
            }
            return this;
        }
        /**
         * Renders all charts in the same group as this chart. If the chart has a
         * {@link IBaseMixinConf.commitHandler commitHandler}, it will be executed and waited for.
         * It internally calls {@link ChartGroup.redrawAll}
         *
         * @see {@link render}
         * @see {@link chartGroup}
         */
        renderGroup() {
            if (this._conf.commitHandler) {
                this._conf.commitHandler(false, (error, result) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        this.chartGroup().renderAll();
                    }
                });
            }
            else {
                this.chartGroup().renderAll();
            }
            return this;
        }
        /**
         * @hidden
         */
        _invokeFilteredListener(f) {
            if (f !== undefined) {
                this._listeners.call('filtered', this, this, f);
            }
        }
        /**
         * @hidden
         */
        _invokeZoomedListener() {
            this._listeners.call('zoomed', this, this);
        }
        /**
         * Check whether any active filter or a specific filter is associated with particular chart instance.
         * This function is **not chainable**.
         *
         * Starting version 5, filtering is provided by DataProvider.
         *
         * @see {@link CFSimpleAdapter.hasFilter}.
         * @category Intermediate
         */
        hasFilter(filter) {
            return this._dataProvider.hasFilter(filter);
        }
        /**
         * Replace the chart filter. This is equivalent to calling `chart.filter(null).filter(filter)`
         * but more efficient because the filter is only applied once.
         *
         * Starting version 5, filtering is provided by DataProvider.
         *
         * @see {@link CFSimpleAdapter.resetFilters}.
         * @category Intermediate
         */
        replaceFilter(filter) {
            // The following call resets the filters without actually applying those
            this._dataProvider.resetFilters();
            this.filter(filter);
            return this;
        }
        filter(filter) {
            if (!arguments.length) {
                return this._dataProvider.filter();
            }
            this._dataProvider.filter(filter);
            return this;
        }
        /**
         * TODO check if it can be made private
         *
         * @hidden
         */
        _filtersChanged(filters) {
            this._invokeFilteredListener(filters);
            if (this._root !== null && this.hasFilter()) {
                this.turnOnControls();
            }
            else {
                this.turnOffControls();
            }
        }
        /**
         * Returns all current filters. This method does not perform defensive cloning of the internal
         * filter array before returning, therefore any modification of the returned array will effect the
         * chart's internal filter storage.
         *
         * Starting version 5, filtering is provided by DataProvider.
         *
         * @see {@link CFSimpleAdapter.filters}.
         * @category Intermediate
         */
        filters() {
            return this._dataProvider.filters;
        }
        /**
         * @hidden
         */
        highlightSelected(e) {
            d3Selection.select(e).classed(constants.SELECTED_CLASS, true);
            d3Selection.select(e).classed(constants.DESELECTED_CLASS, false);
        }
        /**
         * @hidden
         */
        fadeDeselected(e) {
            d3Selection.select(e).classed(constants.SELECTED_CLASS, false);
            d3Selection.select(e).classed(constants.DESELECTED_CLASS, true);
        }
        /**
         * @hidden
         */
        resetHighlight(e) {
            d3Selection.select(e).classed(constants.SELECTED_CLASS, false);
            d3Selection.select(e).classed(constants.DESELECTED_CLASS, false);
        }
        /**
         * This function is passed to d3 as the onClick handler for each chart. The default behavior is to
         * filter on the clicked datum (passed to the callback) and redraw the chart group.
         *
         * This function can be replaced in order to change the click behavior (but first look at
         * @example
         * ```
         * const oldHandler = chart.onClick;
         * chart.onClick = function(datum) {
         *   // use datum.
         * }
         * ```
         *
         * @category Ninja
         */
        onClick(datum, i) {
            const filter = this._conf.keyAccessor(datum);
            events.trigger(() => {
                this.filter(filter);
                this.redrawGroup();
            });
        }
        /**
         * abstract function stub
         *
         * @hidden
         */
        _doRender() {
            // do nothing in base, should be overridden by sub-function
            return this;
        }
        /**
         * abstract function stub
         *
         * @hidden
         */
        _doRedraw() {
            // do nothing in base, should be overridden by sub-function
            return this;
        }
        /**
         * List of items that will show as legends.
         * The charts implement this method.
         *
         * @category Ninja
         */
        legendables() {
            // do nothing in base, should be overridden by sub-function
            return [];
        }
        /**
         * Need to be public as legend methods are used by Composite Charts
         *
         * @hidden
         */
        legendHighlight(d) {
            // do nothing in base, should be overridden by sub-function
        }
        /**
         * Need to be public as legend methods are used by Composite Charts
         *
         * @hidden
         */
        legendReset(d) {
            // do nothing in base, should be overridden by sub-function
        }
        /**
         * Need to be public as legend methods are used by Composite Charts
         *
         * @hidden
         */
        legendToggle(d) {
            // do nothing in base, should be overriden by sub-function
        }
        /**
         * Need to be public as legend methods are used by Composite Charts
         *
         * @hidden
         */
        isLegendableHidden(d) {
            // do nothing in base, should be overridden by sub-function
            return false;
        }
        chartGroup(chartGroup) {
            if (!arguments.length) {
                return this._chartGroup;
            }
            if (!this._isChild) {
                this._chartGroup.deregister(this);
            }
            this._chartGroup = this._getChartGroup(chartGroup);
            if (!this._isChild) {
                this._chartGroup.register(this);
            }
            return this;
        }
        /**
         * Expire the internal chart cache. dc charts cache some data internally on a per chart basis to
         * speed up rendering and avoid unnecessary calculation; however it might be useful to clear the
         * cache if you have changed state which will affect rendering.  For example, if you invoke
         * {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#crossfilter_add | crossfilter.add}
         * function or reset group or dimension after rendering, it is a good idea to
         * clear the cache to make sure charts are rendered properly.
         *
         * TODO determine if it can be removed, does not seem to be used
         * @category Ninja
         */
        expireCache() {
            // do nothing in base, should be overridden by sub-function
            return this;
        }
        legend(legend) {
            if (!arguments.length) {
                return this._legend;
            }
            this._legend = legend;
            this._legend.parent(this);
            return this;
        }
        /**
         * Returns the internal numeric ID of the chart.
         *
         * @category Intermediate
         */
        chartID() {
            return this.__dcFlag__;
        }
        /**
         * Set chart options using a configuration object. Each key in the object will cause the method of
         * the same name to be called with the value to set that attribute for the chart.
         * TODO: With concept of conf, this is less relevant now, consider moving it to compat.
         * @example
         * ```
         * chart.options({dimension: myDimension, group: myGroup});
         * ```
         * @category Ninja
         */
        options(opts) {
            const applyOptions = [
                'anchor',
                'group',
                'xAxisLabel',
                'yAxisLabel',
                'stack',
                'title',
                'point',
                'getColor',
                'overlayGeoJson',
            ];
            for (const o in opts) {
                if (typeof this[o] === 'function') {
                    if (opts[o] instanceof Array && applyOptions.indexOf(o) !== -1) {
                        this[o].apply(this, opts[o]);
                    }
                    else {
                        this[o].call(this, opts[o]);
                    }
                }
                else {
                    logger.debug(`Not a valid option setter name: ${o}`);
                }
            }
            return this;
        }
        /**
         * All dc chart instance supports the following listeners.
         * Supports the following events:
         * * `renderlet` - This listener function will be invoked after transitions after redraw and render. Replaces the
         * deprecated {@link renderlet} method.
         * * `pretransition` - Like `.on('renderlet', ...)` but the event is fired before transitions start.
         * * `preRender` - This listener function will be invoked before chart rendering.
         * * `postRender` - This listener function will be invoked after chart finish rendering including
         * all renderlets' logic.
         * * `preRedraw` - This listener function will be invoked before chart redrawing.
         * * `postRedraw` - This listener function will be invoked after chart finish redrawing
         * including all renderlets' logic.
         * * `filtered` - This listener function will be invoked after a filter is applied, added or removed.
         * * `zoomed` - This listener function will be invoked after a zoom is triggered.
         * @see {@link https://github.com/d3/d3-dispatch/blob/master/README.md#dispatch_on | d3.dispatch.on}
         * @example
         * ```
         * .on('renderlet', function(chart, filter){...})
         * .on('pretransition', function(chart, filter){...})
         * .on('preRender', function(chart){...})
         * .on('postRender', function(chart){...})
         * .on('preRedraw', function(chart){...})
         * .on('postRedraw', function(chart){...})
         * .on('filtered', function(chart, filter){...})
         * .on('zoomed', function(chart, filter){...})
         * ```
         * @category Intermediate
         */
        on(event, listener) {
            this._listeners.on(event, listener);
            return this;
        }
        /**
         * Execute the callback without transitions.
         * Internally it sets {@link IBaseMixinConf.transitionDuration} to 0 and restores it after
         * the `callback()`.
         */
        withoutTransitions(callback) {
            const oldVal = this.conf().transitionDuration;
            this.configure({ transitionDuration: 0 });
            callback();
            this.configure({ transitionDuration: oldVal });
        }
        /**
         * A renderlet is similar to an event listener on rendering event. Multiple renderlets can be added
         * to an individual chart.  Each time a chart is rerendered or redrawn the renderlets are invoked
         * right after the chart finishes its transitions, giving you a way to modify the SVGElements.
         * Renderlet functions take the chart instance as the only input parameter and you can
         * use the dc API or use raw d3 to achieve pretty much any effect.
         *
         * Use {@link on} with a 'renderlet' prefix.
         * Generates a random key for the renderlet, which makes it hard to remove.
         * @deprecated chart.renderlet has been deprecated. Please use chart.on("renderlet.<renderletKey>", renderletFunction)
         * @example
         * ```
         * // do this instead of .renderlet(function(chart) { ... })
         * chart.on("renderlet", function(chart){
         *     // mix of dc API and d3 manipulation
         *     chart.select('g.y').style('display', 'none');
         *     // its a closure so you can also access other chart variable available in the closure scope
         *     moveChart.filter(chart.filter());
         * });
         * ```
         *
         * TODO move to compat
         */
        renderlet(renderletFunction) {
            logger.warnOnce('chart.renderlet has been deprecated. Please use chart.on("renderlet.<renderletKey>", renderletFunction)');
            this.on(`renderlet.${uniqueId()}`, renderletFunction);
            return this;
        }
    }

    function BaseMixinExt(Base) {
        return class extends Base {
            constructor(...args) {
                super(...args);
            }
            minWidth(minWidth) {
                if (!arguments.length) {
                    return this._conf.minWidth;
                }
                this.configure({ minWidth: minWidth });
                return this;
            }
            minHeight(minHeight) {
                if (!arguments.length) {
                    return this._conf.minHeight;
                }
                this.configure({ minHeight: minHeight });
                return this;
            }
            height(height) {
                if (!arguments.length) {
                    return super.height();
                }
                this.configure({ height: height });
                return this;
            }
            width(width) {
                if (!arguments.length) {
                    return super.width();
                }
                this.configure({ width: width });
                return this;
            }
            useViewBoxResizing(useViewBoxResizing) {
                if (!arguments.length) {
                    return this._conf.useViewBoxResizing;
                }
                this.configure({ useViewBoxResizing: useViewBoxResizing });
                return this;
            }
            dimension(dimension) {
                if (!arguments.length) {
                    return this.dataProvider().conf().dimension;
                }
                this.dataProvider().configure({ dimension: dimension });
                this.expireCache();
                return this;
            }
            group(group, name, accessor) {
                if (!arguments.length) {
                    return this._dataProvider.conf().group;
                }
                this._dataProvider.configure({ group, groupName: name });
                this.expireCache();
                return this;
            }
            ordering(orderFunction) {
                if (!arguments.length) {
                    return this._dataProvider.conf().ordering;
                }
                this._dataProvider.configure({ ordering: orderFunction });
                this.expireCache();
                return this;
            }
            filterPrinter(filterPrinterFunction) {
                if (!arguments.length) {
                    return this._conf.filterPrinter;
                }
                this.configure({ filterPrinter: filterPrinterFunction });
                return this;
            }
            transitionDuration(duration) {
                if (!arguments.length) {
                    return this._conf.transitionDuration;
                }
                this.configure({ transitionDuration: duration });
                return this;
            }
            transitionDelay(delay) {
                if (!arguments.length) {
                    return this._conf.transitionDelay;
                }
                this.configure({ transitionDelay: delay });
                return this;
            }
            controlsUseVisibility(controlsUseVisibility) {
                if (!arguments.length) {
                    return this._conf.controlsUseVisibility;
                }
                this.configure({ controlsUseVisibility: controlsUseVisibility });
                return this;
            }
            commitHandler(commitHandler) {
                if (!arguments.length) {
                    return this._conf.commitHandler;
                }
                this.configure({ commitHandler: commitHandler });
                return this;
            }
            label(labelFunction, enableLabels) {
                if (!arguments.length) {
                    return this._conf.label;
                }
                this.configure({ label: labelFunction });
                if (enableLabels === undefined || enableLabels) {
                    this.configure({ renderLabel: true });
                }
                return this;
            }
            renderLabel(renderLabel) {
                if (!arguments.length) {
                    return this._conf.renderLabel;
                }
                this.configure({ renderLabel: renderLabel });
                return this;
            }
            renderTitle(renderTitle) {
                if (!arguments.length) {
                    return this._conf.renderTitle;
                }
                this.configure({ renderTitle: renderTitle });
                return this;
            }
            title(titleFunction) {
                if (!arguments.length) {
                    return this._conf.title;
                }
                this.configure({
                    title: titleFunction,
                });
                return this;
            }
            keyAccessor(keyAccessor) {
                if (!arguments.length) {
                    return this._conf.keyAccessor;
                }
                this.configure({ keyAccessor: keyAccessor });
                return this;
            }
            valueAccessor(valueAccessor) {
                if (!arguments.length) {
                    return this.dataProvider().conf().valueAccessor;
                }
                this.dataProvider().configure({ valueAccessor: valueAccessor });
                return this;
            }
        };
    }
    const BaseMixin = BaseMixinExt(BaseMixin$1);
    const baseMixin = (parent, chartGroup) => new BaseMixin(parent, chartGroup);

    /**
     * This Mixin provides reusable functionalities for any chart that needs to visualize data using bubbles.
     */
    // tslint:disable-next-line:variable-name
    function BubbleMixin(Base) {
        // @ts-ignore
        return class extends Base {
            constructor(...args) {
                super(...args);
                this.configure({
                    renderLabel: true,
                    maxBubbleRelativeSize: 0.3,
                    minRadiusWithLabel: 10,
                    sortBubbleSize: false,
                    elasticRadius: false,
                    excludeElasticZero: true,
                    radiusValueAccessor: d => d.r,
                });
                // These cane be used by derived classes as well, so member status
                this.BUBBLE_NODE_CLASS = 'node';
                this.BUBBLE_CLASS = 'bubble';
                this.MIN_RADIUS = 10;
                this._r = d3Scale.scaleLinear().domain([0, 100]);
            }
            /**
             * @see {@link BaseMixin.configure}
             */
            configure(conf) {
                super.configure(conf);
                return this;
            }
            /**
             * @see {@link BaseMixin.conf}
             */
            conf() {
                return this._conf;
            }
            data() {
                const data = super.data();
                if (this._conf.sortBubbleSize) {
                    // sort descending so smaller bubbles are on top
                    const radiusAccessor = this._conf.radiusValueAccessor;
                    data.sort((a, b) => d3Array.descending(radiusAccessor(a), radiusAccessor(b)));
                }
                return data;
            }
            r(bubbleRadiusScale) {
                if (!arguments.length) {
                    return this._r;
                }
                this._r = bubbleRadiusScale;
                return this;
            }
            /**
             * @hidden
             */
            calculateRadiusDomain() {
                if (this._conf.elasticRadius) {
                    this.r().domain([this.rMin(), this.rMax()]);
                }
            }
            /**
             * @hidden
             */
            rMin() {
                let values = this.data().map(this._conf.radiusValueAccessor);
                if (this._conf.excludeElasticZero) {
                    values = values.filter(value => value > 0);
                }
                return d3Array.min(values);
            }
            /**
             * @hidden
             */
            rMax() {
                return d3Array.max(this.data(), e => this._conf.radiusValueAccessor(e));
            }
            /**
             * @hidden
             */
            bubbleR(d) {
                const value = this._conf.radiusValueAccessor(d);
                let r = this.r()(value);
                if (isNaN(r) || value <= 0) {
                    r = 0;
                }
                return r;
            }
            /**
             * @hidden
             */
            _labelFunction(d) {
                return this._conf.label(d);
            }
            /**
             * @hidden
             */
            _shouldLabel(d) {
                return this.bubbleR(d) > this._conf.minRadiusWithLabel;
            }
            /**
             * @hidden
             */
            _labelOpacity(d) {
                return this._shouldLabel(d) ? 1 : 0;
            }
            /**
             * @hidden
             */
            _labelPointerEvent(d) {
                return this._shouldLabel(d) ? 'all' : 'none';
            }
            /**
             * @hidden
             */
            _doRenderLabel(bubbleGEnter) {
                if (this._conf.renderLabel) {
                    let label = bubbleGEnter.select('text');
                    if (label.empty()) {
                        label = bubbleGEnter
                            .append('text')
                            .attr('text-anchor', 'middle')
                            .attr('dy', '.3em')
                            .on('click', (evt, d) => this.onClick(d));
                    }
                    label
                        .attr('opacity', 0)
                        .attr('pointer-events', d => this._labelPointerEvent(d))
                        .text(d => this._labelFunction(d));
                    transition(label, this._conf.transitionDuration, this._conf.transitionDelay).attr('opacity', d => this._labelOpacity(d));
                }
            }
            /**
             * @hidden
             */
            doUpdateLabels(bubbleGEnter) {
                if (this._conf.renderLabel) {
                    const labels = bubbleGEnter
                        .select('text')
                        .attr('pointer-events', d => this._labelPointerEvent(d))
                        .text(d => this._labelFunction(d));
                    transition(labels, this._conf.transitionDuration, this._conf.transitionDelay).attr('opacity', d => this._labelOpacity(d));
                }
            }
            /**
             * @hidden
             */
            _titleFunction(d) {
                return this._conf.title(d);
            }
            /**
             * @hidden
             */
            _doRenderTitles(g) {
                if (this._conf.renderTitle) {
                    const title = g.select('title');
                    if (title.empty()) {
                        g.append('title').text(d => this._titleFunction(d));
                    }
                }
            }
            /**
             * @hidden
             */
            doUpdateTitles(g) {
                if (this._conf.renderTitle) {
                    g.select('title').text(d => this._titleFunction(d));
                }
            }
            minRadius(radius) {
                if (!arguments.length) {
                    return this.MIN_RADIUS;
                }
                this.MIN_RADIUS = radius;
                return this;
            }
            fadeDeselectedArea(selection) {
                if (this.hasFilter()) {
                    const chart = this;
                    this.selectAll(`g.${chart.BUBBLE_NODE_CLASS}`).each(function (d) {
                        if (chart.isSelectedNode(d)) {
                            chart.highlightSelected(this);
                        }
                        else {
                            chart.fadeDeselected(this);
                        }
                    });
                }
                else {
                    const chart = this;
                    this.selectAll(`g.${chart.BUBBLE_NODE_CLASS}`).each(function () {
                        chart.resetHighlight(this);
                    });
                }
            }
            /**
             * @hidden
             */
            isSelectedNode(d) {
                return this.hasFilter(d.key);
            }
            onClick(d) {
                const filter = d.key;
                events.trigger(() => {
                    this.filter(filter);
                    this.redrawGroup();
                });
            }
        };
    }

    function BubbleMixinExt(Base) {
        return class extends Base {
            constructor(...args) {
                super(...args);
            }
            sortBubbleSize(sortBubbleSize) {
                if (!arguments.length) {
                    return this._conf.sortBubbleSize;
                }
                this.configure({ sortBubbleSize: sortBubbleSize });
                return this;
            }
            radiusValueAccessor(radiusValueAccessor) {
                if (!arguments.length) {
                    return this._conf.radiusValueAccessor;
                }
                this.configure({ radiusValueAccessor: radiusValueAccessor });
                return this;
            }
            minRadiusWithLabel(radius) {
                if (!arguments.length) {
                    return this._conf.minRadiusWithLabel;
                }
                this.configure({ minRadiusWithLabel: radius });
                return this;
            }
            maxBubbleRelativeSize(relativeSize) {
                if (!arguments.length) {
                    return this._conf.maxBubbleRelativeSize;
                }
                this.configure({ maxBubbleRelativeSize: relativeSize });
                return this;
            }
            elasticRadius(elasticRadius) {
                if (!arguments.length) {
                    return this._conf.elasticRadius;
                }
                this.configure({ elasticRadius: elasticRadius });
                return this;
            }
            excludeElasticZero(excludeZero) {
                if (!arguments.length) {
                    return this._conf.excludeElasticZero;
                }
                this.configure({ excludeElasticZero: excludeZero });
                return this;
            }
        };
    }

    class CFDataCapHelper extends CFSimpleAdapter {
        constructor(conf = {}) {
            const defaultOthersGrouper = (topItems, restItems) => {
                // @ts-ignore
                const restItemsSum = d3Array.sum(restItems, d => d._value);
                if (restItemsSum > 0) {
                    return topItems.concat([
                        {
                            others: true,
                            key: this._conf.othersLabel,
                            _value: restItemsSum,
                        },
                    ]);
                }
                return topItems;
            };
            super(Object.assign({ cap: Infinity, takeFront: true, othersLabel: 'Others', othersGrouper: defaultOthersGrouper, ordering: kv => -kv.value }, conf));
        }
        configure(conf) {
            return super.configure(conf);
        }
        conf() {
            return super.conf();
        }
        data() {
            let items = sortBy(super.data(), this._conf.ordering);
            if (this._conf.cap === Infinity) {
                return items;
            }
            // return N "top" groups, where N is the cap, sorted by baseMixin.ordering
            // whether top means front or back depends on takeFront
            let rest;
            if (this._conf.cap) {
                if (this._conf.takeFront) {
                    rest = items.slice(this._conf.cap);
                    items = items.slice(0, this._conf.cap);
                }
                else {
                    const start = Math.max(0, items.length - this._conf.cap);
                    rest = items.slice(0, start);
                    items = items.slice(start);
                }
            }
            if (this._conf.othersGrouper) {
                this._restKeys = rest.map(d => d.key);
                return this._conf.othersGrouper(items, rest);
            }
            return items;
        }
        filter(filter) {
            if (!arguments.length) {
                return super.filter();
            }
            if (filter === this._conf.othersLabel) {
                // We have an interesting situation here. Cross filter expects lists of keys to filtered, while the chart needs
                // to see 'Others' also as part of the filters in order to fade that slice
                // A hack is to include all underlying keys as well as 'Others' to the filters.
                const filters = [...this._restKeys, this._conf.othersLabel];
                return super.filter([filters]);
            }
            return super.filter(filter);
        }
    }

    function CapMixinExt(Base) {
        return class extends Base {
            constructor(...args) {
                super(...args);
                this.dataProvider(new CFDataCapHelper());
            }
            cap(count) {
                if (!arguments.length) {
                    // @ts-ignore
                    return this._dataProvider.conf().cap;
                }
                // @ts-ignore
                this._dataProvider.configure({ cap: count });
                return this;
            }
            takeFront(takeFront) {
                if (!arguments.length) {
                    // @ts-ignore
                    return this._dataProvider.conf().takeFront;
                }
                // @ts-ignore
                this._dataProvider.configure({ takeFront: takeFront });
                return this;
            }
            othersLabel(label) {
                if (!arguments.length) {
                    // @ts-ignore
                    return this._dataProvider.conf().othersLabel;
                }
                // @ts-ignore
                this._dataProvider.configure({ othersLabel: label });
                return this;
            }
            othersGrouper(grouperFunction) {
                if (!arguments.length) {
                    // @ts-ignore
                    return this._dataProvider.conf().othersGrouper;
                }
                // @ts-ignore
                this._dataProvider.configure({ othersGrouper: grouperFunction });
                return this;
            }
        };
    }
    function CapMixin(Base) {
        return class extends CapMixinExt(BaseMixinExt(Base)) {
            constructor(...args) {
                super(...args);
            }
        };
    }

    /**
     * The Color Mixin is an abstract chart functional class providing universal coloring support
     * as a mix-in for any concrete chart implementation.
     */
    // tslint:disable-next-line:variable-name
    function ColorMixin$1(Base) {
        return class extends Base {
            constructor(...args) {
                super(...args);
                this.configure({
                    colorAccessor: (d, i) => this._conf.keyAccessor(d),
                });
                this.colorHelper(new OrdinalColors(config.defaultColors()));
            }
            configure(conf) {
                super.configure(conf);
                if ('colorAccessor' in conf && this._colorHelper) {
                    this._colorHelper.colorAccessor = conf.colorAccessor;
                }
                return this;
            }
            conf() {
                return this._conf;
            }
            colorHelper(colorHelper) {
                if (!arguments.length) {
                    return this._colorHelper;
                }
                this._colorHelper = colorHelper;
                this._colorHelper.colorAccessor = this._conf.colorAccessor;
                return this;
            }
            /**
             * Ordinal colors are used most commonly in `dc` charts.
             * This call is a shorthand for using an {@linkcode OrdinalColors} instance
             * as {@linkcode colorHelper}.
             *
             * ```
             * chart.ordinalColors(colorList); // same as chart.colorHelper(new OrdinalColors(colorList));
             * ```
             *
             * @see {@link OrdinalColors}
             * @see {@link https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales}
             */
            ordinalColors(colorList) {
                this.colorHelper(new OrdinalColors(colorList));
                return this;
            }
            /**
             * Use any of d3 scales for color. This method is a shorthand for the following:
             *
             * ```
             * chart.scaledColors(scale); // same as chart.colorHelper(new ColorScaleHelper(scale));
             * ```
             *
             * Depending on type of scale, it will need either setting domain for the scale or
             * compute it as per your data using {@linkcode calculateColorDomain}.
             *
             * @see {@link ColorScaleHelper}
             * @see {@link https://github.com/d3/d3-scale/}
             */
            colorScale(scale) {
                return this.colorHelper(new ColorScaleHelper(scale));
            }
            /**
             * Convenience method to set the color scale to an Hcl interpolated linear scale with range `r`.
             */
            linearColors(r) {
                this.colorHelper(new LinearColors(r));
                return this;
            }
            colorCalculator(colorCalculator) {
                if (!arguments.length) {
                    return this.colorHelper().getColor;
                }
                this.colorHelper(new ColorCalculator(colorCalculator));
                return this;
            }
            colorDomain(domain) {
                const scale = this.colorHelper().colorScale;
                if (!arguments.length) {
                    return scale.domain();
                }
                scale.domain(domain);
                return this;
            }
            /**
             * Set the domain by determining the min and max values as retrieved by
             * {@link IColorMixinConf.colorAccessor | .colorAccessor} over the chart's dataset.
             *
             * This is useful only for certain type of color scales.
             * In particular it will not work with {@linkcode ordinalColors}.
             *
             * @category Intermediate
             */
            calculateColorDomain() {
                const scale = this._colorHelper
                    .colorScale;
                if (scale && scale.domain) {
                    scale.domain(d3Array.extent(this.data(), this._conf.colorAccessor));
                }
                return this;
            }
        };
    }

    function ColorMixinExt(Base) {
        return class extends Base {
            constructor(...args) {
                super(...args);
            }
            colorAccessor(colorAccessor) {
                if (!arguments.length) {
                    return this._conf.colorAccessor;
                }
                this.configure({ colorAccessor: colorAccessor });
                return this;
            }
            colors(colorScale) {
                if (!arguments.length) {
                    return this.colorHelper().colorScale;
                }
                let newScale;
                if (colorScale instanceof Array) {
                    newScale = d3Scale.scaleQuantize().range(colorScale); // deprecated legacy support, note: this fails for ordinal domains
                }
                else {
                    newScale = typeof colorScale === 'function' ? colorScale : () => colorScale;
                }
                this.colorHelper(new ColorScaleHelper(newScale));
                return this;
            }
        };
    }
    function ColorMixin(Base) {
        return class extends ColorMixinExt(ColorMixin$1(BaseMixinExt(Base))) {
            constructor(...args) {
                super(...args);
            }
        };
    }

    /**
     * Margin is a mixin that provides margin utility functions for both the Row Chart and Coordinate Grid
     * Charts.
     */
    class MarginMixin extends BaseMixin$1 {
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this._margins = { top: 10, right: 50, bottom: 30, left: 30 };
        }
        configure(conf) {
            super.configure(conf);
            return this;
        }
        conf() {
            return this._conf;
        }
        margins(margins) {
            if (!arguments.length) {
                return this._margins;
            }
            this._margins = margins;
            return this;
        }
        /**
         * Effective width of the chart excluding margins (in pixels).
         *
         * @category Intermediate
         */
        effectiveWidth() {
            return this.width() - this.margins().left - this.margins().right;
        }
        /**
         * Effective height of the chart excluding margins (in pixels).
         *
         * @category Intermediate
         */
        effectiveHeight() {
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
     */
    class CoordinateGridMixin$1 extends ColorMixin$1(MarginMixin) {
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this.colorHelper(new OrdinalColors(d3ScaleChromatic.schemeCategory10));
            this._mandatoryAttributes().push('x');
            this._parent = undefined;
            this._g = undefined;
            this._chartBodyG = undefined;
            this.configure({
                xUnits: UnitsInteger,
                xAxisPadding: 0,
                xAxisPaddingUnit: d3Time.timeDay,
                elasticX: false,
                yAxisPadding: 0,
                elasticY: false,
                round: undefined,
                renderHorizontalGridLines: false,
                renderVerticalGridLines: false,
                zoomScale: [1, Infinity],
                zoomOutRestrict: true,
                mouseZoomable: false,
                autoFocus: false,
                clipPadding: 0,
                useRightYAxis: false,
                brushOn: true,
                parentBrushOn: false,
            });
            this._x = undefined;
            this._origX = undefined; // Will hold original scale in case of zoom
            this._xOriginalDomain = undefined;
            this._xAxis = d3Axis.axisBottom(undefined);
            // TODO: xAxisLabel and xAxisLabelPadding are linked to the same function, in addition the call updates margins
            // TODO: recheck in next iteration
            this._xAxisLabel = undefined;
            this._xAxisLabelPadding = 0;
            this._lastXDomain = undefined;
            this._y = undefined;
            this._yAxis = null;
            // TODO: see remarks for xAxisLabel and xAxisLabelPadding
            this._yAxisLabel = undefined;
            this._yAxisLabelPadding = 0;
            this._brush = d3Brush.brushX();
            this._gBrush = undefined;
            this._ignoreBrushEvents = false; // ignore when carrying out programmatic brush operations
            this._resizing = false;
            this._unitCount = undefined;
            this._zoom = d3Zoom.zoom().on('zoom', (evt, d) => this._onZoom(evt));
            this._nullZoom = d3Zoom.zoom().on('zoom', null);
            this._hasBeenMouseZoomable = false;
            this._ignoreZoomEvents = false; // ignore when carrying out programmatic zoom operations
            this.on('filtered._coordinate', () => {
                this._onFilterChange();
            });
            // TODO: These two parameters have been exposed differently in BarChart and BoxPlot. In addition _gap in BoxPlot
            // TODO: also interact with these. Need to change consistently
            this._fOuterRangeBandPadding = 0.5;
            this._fRangeBandPadding = 0;
        }
        configure(conf) {
            super.configure(conf);
            return this;
        }
        conf() {
            return this._conf;
        }
        /**
         * When changing the domain of the x or y scale, it is necessary to tell the chart to recalculate
         * and redraw the axes. (`.rescale()` is called automatically when the x or y scale is replaced
         * with {@link CoordinateGridMixin.x | .x()} or {@link CoordinateGridMixin.y | .y()}, and has
         * no effect on elastic scales.)
         *
         * @category Intermediate
         */
        rescale() {
            this._unitCount = undefined;
            this._resizing = true;
            return this;
        }
        resizing(resizing) {
            if (!arguments.length) {
                return this._resizing;
            }
            this._resizing = resizing;
            return this;
        }
        handleResize(rect) {
            this.rescale();
            super.handleResize(rect);
        }
        /**
         * @hidden
         */
        _generateG(parent) {
            if (parent === undefined) {
                this._parent = this.svg();
            }
            else {
                this._parent = parent;
            }
            const href = window.location.href.split('#')[0];
            this._g = this._parent.append('g');
            this._chartBodyG = this._g
                .append('g')
                .attr('class', 'chart-body')
                .attr('transform', `translate(${this.margins().left}, ${this.margins().top})`)
                .attr('clip-path', `url(${href}#${this._getClipPathId()})`);
            return this._g;
        }
        g(gElement) {
            if (!arguments.length) {
                return this._g;
            }
            this._g = gElement;
            return this;
        }
        chartBodyG(chartBodyG) {
            if (!arguments.length) {
                return this._chartBodyG;
            }
            this._chartBodyG = chartBodyG;
            return this;
        }
        x(xScale) {
            if (!arguments.length) {
                return this._x;
            }
            this._x = xScale;
            this._xOriginalDomain = this._x.domain();
            this.rescale();
            return this;
        }
        /**
         * TODO the return value needs correction
         *
         * @hidden
         */
        xOriginalDomain() {
            return this._xOriginalDomain;
        }
        xAxis(xAxis) {
            if (!arguments.length) {
                return this._xAxis;
            }
            this._xAxis = xAxis;
            return this;
        }
        /**
         * Returns the number of units displayed on the x axis. If the x axis is ordinal (`xUnits` is
         * `UnitsOrdinal`), this is the number of items in the domain of the x scale. Otherwise, the
         * x unit count is calculated using the {@link ICoordinateGridMixinConf.xUnits | xUnits} function.
         *
         * @category Intermediate
         */
        xUnitCount() {
            if (this._unitCount === undefined) {
                if (this.isOrdinal()) {
                    // In this case it number of items in domain
                    this._unitCount = this.x().domain().length;
                }
                else {
                    const [first, second] = this.x().domain();
                    const unitCount = this._conf.xUnits(first, second);
                    // Sometimes xUnits() may return an array while sometimes directly the count
                    this._unitCount = unitCount instanceof Array ? unitCount.length : unitCount;
                }
            }
            return this._unitCount;
        }
        /**
         * Returns true if the chart is using ordinal xUnits ({@link UnitsOrdinal}, or false
         * otherwise. Most charts behave differently with ordinal data and use the result of this method to
         * trigger the appropriate logic.
         *
         * @category Intermediate
         */
        isOrdinal() {
            return this._conf.xUnits === UnitsOrdinal;
        }
        /**
         * @hidden
         */
        _useOuterPadding() {
            return true;
        }
        /**
         * @hidden
         */
        _ordinalXDomain() {
            const groups = this._computeOrderedGroups(this.data());
            return groups.map(this._conf.keyAccessor);
        }
        _prepareXAxis(g, render) {
            if (!this.isOrdinal()) {
                if (this._conf.elasticX) {
                    this._x.domain([this.xAxisMin(), this.xAxisMax()]);
                }
            }
            else {
                // self._chart.isOrdinal()
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
                if (this._conf.elasticX || this._x.domain().length === 0) {
                    this._x.domain(this._ordinalXDomain());
                }
            }
            // has the domain changed?
            const xdom = this._x.domain();
            if (render || !arraysEqual(this._lastXDomain, xdom)) {
                this.rescale();
            }
            this._lastXDomain = xdom;
            // please can't we always use rangeBands for bar charts?
            if (this.isOrdinal()) {
                this._x
                    .range([0, this._xAxisLength()])
                    .paddingInner(this._fRangeBandPadding)
                    .paddingOuter(this._useOuterPadding() ? this._fOuterRangeBandPadding : 0);
            }
            else {
                this._x.range([0, this._xAxisLength()]);
            }
            this._xAxis = this._xAxis.scale(this.x());
            this._renderVerticalGridLines(g);
        }
        /**
         * @hidden
         */
        _renderXAxis(g) {
            let axisXG = g.select('g.x');
            if (axisXG.empty()) {
                axisXG = g
                    .append('g')
                    .attr('class', 'axis x')
                    .attr('transform', `translate(${this.margins().left},${this._xAxisY()})`);
            }
            let axisXLab = g.select(`text.${X_AXIS_LABEL_CLASS}`);
            if (axisXLab.empty() && this.xAxisLabel()) {
                axisXLab = g
                    .append('text')
                    .attr('class', X_AXIS_LABEL_CLASS)
                    .attr('transform', `translate(${this.margins().left + this._xAxisLength() / 2},${this.height() - this._xAxisLabelPadding})`)
                    .attr('text-anchor', 'middle');
            }
            if (this.xAxisLabel() && axisXLab.text() !== this.xAxisLabel()) {
                axisXLab.text(this.xAxisLabel());
            }
            transition(axisXG, this._conf.transitionDuration, this._conf.transitionDelay)
                .attr('transform', `translate(${this.margins().left},${this._xAxisY()})`)
                .call(this._xAxis);
            transition(axisXLab, this._conf.transitionDuration, this._conf.transitionDelay).attr('transform', `translate(${this.margins().left + this._xAxisLength() / 2},${this.height() - this._xAxisLabelPadding})`);
        }
        _renderVerticalGridLines(g) {
            let gridLineG = g.select(`g.${VERTICAL_CLASS}`);
            if (this._conf.renderVerticalGridLines) {
                if (gridLineG.empty()) {
                    gridLineG = g
                        .insert('g', ':first-child')
                        .attr('class', `${GRID_LINE_CLASS} ${VERTICAL_CLASS}`)
                        .attr('transform', `translate(${this.margins().left},${this.margins().top})`);
                }
                let ticks;
                if (this._xAxis.tickValues()) {
                    ticks = this._xAxis.tickValues();
                }
                else if (typeof this._x.ticks === 'function') {
                    ticks = this._x.ticks.apply(this._x, this._xAxis.tickArguments());
                }
                else {
                    ticks = this._x.domain();
                }
                const lines = gridLineG.selectAll('line').data(ticks);
                // enter
                const linesGEnter = lines
                    .enter()
                    .append('line')
                    .attr('x1', d => this._x(d))
                    .attr('y1', this._xAxisY() - this.margins().top)
                    .attr('x2', d => this._x(d))
                    .attr('y2', 0)
                    .attr('opacity', 0);
                transition(linesGEnter, this._conf.transitionDuration, this._conf.transitionDelay).attr('opacity', 0.5);
                // update
                transition(lines, this._conf.transitionDuration, this._conf.transitionDelay)
                    .attr('x1', d => this._x(d))
                    .attr('y1', this._xAxisY() - this.margins().top)
                    .attr('x2', d => this._x(d))
                    .attr('y2', 0);
                // exit
                lines.exit().remove();
            }
            else {
                gridLineG.selectAll('line').remove();
            }
        }
        _xAxisY() {
            return this.height() - this.margins().bottom;
        }
        /**
         * @hidden
         */
        _xAxisLength() {
            return this.effectiveWidth();
        }
        xAxisLabel(labelText, padding) {
            if (!arguments.length) {
                return this._xAxisLabel;
            }
            this._xAxisLabel = labelText;
            this.margins().bottom -= this._xAxisLabelPadding;
            this._xAxisLabelPadding = padding === undefined ? DEFAULT_AXIS_LABEL_PADDING : padding;
            this.margins().bottom += this._xAxisLabelPadding;
            return this;
        }
        _createYAxis() {
            return this._conf.useRightYAxis ? d3Axis.axisRight(undefined) : d3Axis.axisLeft(undefined);
        }
        /**
         * @hidden
         */
        _prepareYAxis(g) {
            if (this._y === undefined || this._conf.elasticY) {
                if (this._y === undefined) {
                    this._y = d3Scale.scaleLinear();
                }
                const _min = this.yAxisMin() || 0;
                const _max = this.yAxisMax() || 0;
                this._y.domain([_min, _max]).rangeRound([this._yAxisHeight(), 0]);
            }
            this._y.range([this._yAxisHeight(), 0]);
            if (!this._yAxis) {
                this._yAxis = this._createYAxis();
            }
            this._yAxis.scale(this._y);
            this._renderHorizontalGridLinesForAxis(g, this._y, this._yAxis);
        }
        /**
         * Composite chart needs it, hence public
         *
         * @hidden
         */
        _renderYAxisLabel(axisClass, text, rotation, labelXPosition) {
            labelXPosition = labelXPosition || this._yAxisLabelPadding;
            let axisYLab = this.g().select(`text.${Y_AXIS_LABEL_CLASS}.${axisClass}-label`);
            const labelYPosition = this.margins().top + this._yAxisHeight() / 2;
            if (axisYLab.empty() && text) {
                axisYLab = this.g()
                    .append('text')
                    .attr('transform', `translate(${labelXPosition},${labelYPosition}),rotate(${rotation})`)
                    .attr('class', `${Y_AXIS_LABEL_CLASS} ${axisClass}-label`)
                    .attr('text-anchor', 'middle')
                    .text(text);
            }
            if (text && axisYLab.text() !== text) {
                axisYLab.text(text);
            }
            transition(axisYLab, this._conf.transitionDuration, this._conf.transitionDelay).attr('transform', `translate(${labelXPosition},${labelYPosition}),rotate(${rotation})`);
        }
        /**
         * Composite chart needs it, hence public
         *
         * @hidden
         */
        _renderYAxisAt(axisClass, axis, position) {
            let axisYG = this.g().select(`g.${axisClass}`);
            if (axisYG.empty()) {
                axisYG = this.g()
                    .append('g')
                    .attr('class', `axis ${axisClass}`)
                    .attr('transform', `translate(${position},${this.margins().top})`);
            }
            transition(axisYG, this._conf.transitionDuration, this._conf.transitionDelay)
                .attr('transform', `translate(${position},${this.margins().top})`)
                .call(axis);
        }
        /**
         * Composite chart needs it, hence public
         *
         * @hidden
         */
        _renderYAxis() {
            const axisPosition = this._conf.useRightYAxis
                ? this.width() - this.margins().right
                : this._yAxisX();
            this._renderYAxisAt('y', this._yAxis, axisPosition);
            const labelPosition = this._conf.useRightYAxis
                ? this.width() - this._yAxisLabelPadding
                : this._yAxisLabelPadding;
            const rotation = this._conf.useRightYAxis ? 90 : -90;
            this._renderYAxisLabel('y', this.yAxisLabel(), rotation, labelPosition);
        }
        /**
         * @hidden
         */
        _renderHorizontalGridLinesForAxis(g, scale, axis) {
            let gridLineG = g.select(`g.${HORIZONTAL_CLASS}`);
            if (this._conf.renderHorizontalGridLines) {
                // see https://github.com/d3/d3-axis/blob/master/src/axis.js#L48
                let ticks;
                if (axis.tickValues()) {
                    ticks = axis.tickValues();
                }
                else if (scale.ticks) {
                    ticks = scale.ticks.apply(scale, axis.tickArguments());
                }
                else {
                    ticks = scale.domain();
                }
                if (gridLineG.empty()) {
                    gridLineG = g
                        .insert('g', ':first-child')
                        .attr('class', `${GRID_LINE_CLASS} ${HORIZONTAL_CLASS}`)
                        .attr('transform', `translate(${this.margins().left},${this.margins().top})`);
                }
                const lines = gridLineG.selectAll('line').data(ticks);
                // enter
                const linesGEnter = lines
                    .enter()
                    .append('line')
                    .attr('x1', 1)
                    .attr('y1', d => scale(d))
                    .attr('x2', this._xAxisLength())
                    .attr('y2', d => scale(d))
                    .attr('opacity', 0);
                transition(linesGEnter, this._conf.transitionDuration, this._conf.transitionDelay).attr('opacity', 0.5);
                // update
                transition(lines, this._conf.transitionDuration, this._conf.transitionDelay)
                    .attr('x1', 1)
                    .attr('y1', d => scale(d))
                    .attr('x2', this._xAxisLength())
                    .attr('y2', d => scale(d));
                // exit
                lines.exit().remove();
            }
            else {
                gridLineG.selectAll('line').remove();
            }
        }
        /**
         * @hidden
         */
        _yAxisX() {
            return this._conf.useRightYAxis ? this.width() - this.margins().right : this.margins().left;
        }
        yAxisLabel(labelText, padding) {
            if (!arguments.length) {
                return this._yAxisLabel;
            }
            this._yAxisLabel = labelText;
            this.margins().left -= this._yAxisLabelPadding;
            this._yAxisLabelPadding = padding === undefined ? DEFAULT_AXIS_LABEL_PADDING : padding;
            this.margins().left += this._yAxisLabelPadding;
            return this;
        }
        y(yScale) {
            if (!arguments.length) {
                return this._y;
            }
            this._y = yScale;
            this.rescale();
            return this;
        }
        yAxis(yAxis) {
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
         * Calculates the minimum x value to display in the chart. Includes xAxisPadding if set.
         *
         * @category Intermediate
         */
        xAxisMin() {
            // TODO: can these be anything other than number and Date
            const m = d3Array.min(this.data(), e => this._conf.keyAccessor(e));
            return subtract(m, this._conf.xAxisPadding, this._conf.xAxisPaddingUnit);
        }
        /**
         * Calculates the maximum x value to display in the chart. Includes xAxisPadding if set.
         *
         * @category Intermediate
         */
        xAxisMax() {
            // TODO: can these be anything other than number and Date
            const m = d3Array.max(this.data(), e => this._conf.keyAccessor(e));
            return add(m, this._conf.xAxisPadding, this._conf.xAxisPaddingUnit);
        }
        /**
         * Calculates the minimum y value to display in the chart. Includes yAxisPadding if set.
         *
         * @category Intermediate
         */
        yAxisMin() {
            // TODO: can these be anything other than number
            // @ts-ignore
            const m = d3Array.min(this.data(), e => e._value);
            return subtract(m, this._conf.yAxisPadding);
        }
        /**
         * Calculates the maximum y value to display in the chart. Includes yAxisPadding if set.
         *
         * @category Intermediate
         */
        yAxisMax() {
            // TODO: can these be anything other than number
            // @ts-ignore
            const m = d3Array.max(this.data(), e => e._value);
            return add(m, this._conf.yAxisPadding);
        }
        /**
         * @hidden
         */
        _yAxisHeight() {
            return this.effectiveHeight();
        }
        _rangeBandPadding(_) {
            if (!arguments.length) {
                return this._fRangeBandPadding;
            }
            this._fRangeBandPadding = _;
            return this;
        }
        _outerRangeBandPadding(_) {
            if (!arguments.length) {
                return this._fOuterRangeBandPadding;
            }
            this._fOuterRangeBandPadding = _;
            return this;
        }
        /**
         * @hidden
         */
        _onFilterChange() {
            const currentFilter = this.filter();
            this._redrawBrush(currentFilter, false);
            if (this._conf.autoFocus) {
                this._updateUIforZoom(currentFilter, true);
            }
        }
        brush(_) {
            if (!arguments.length) {
                return this._brush;
            }
            this._brush = _;
            return this;
        }
        /**
         * @hidden
         */
        _renderBrush(g, doTransition) {
            if (this._conf.brushOn) {
                this._brush.on('start brush end', (evt, d) => this._brushing(evt));
                // To retrieve selection we need self._gBrush
                this._gBrush = g
                    .append('g')
                    .attr('class', 'brush')
                    .attr('transform', `translate(${this.margins().left},${this.margins().top})`);
                this._setBrushExtents(doTransition);
                this._createBrushHandlePaths(this._gBrush, doTransition);
                this._redrawBrush(this.filter(), doTransition);
            }
        }
        /**
         * @hidden
         */
        _createBrushHandlePaths(gBrush, doTransition) {
            let brushHandles = gBrush
                .selectAll(`path.${CUSTOM_BRUSH_HANDLE_CLASS}`)
                .data([{ type: 'w' }, { type: 'e' }]);
            brushHandles = brushHandles
                .enter()
                .append('path')
                .attr('class', CUSTOM_BRUSH_HANDLE_CLASS)
                .merge(brushHandles);
            brushHandles.attr('d', d => this._resizeHandlePath(d));
        }
        /**
         * @hidden
         */
        _extendBrush(brushSelection) {
            if (brushSelection && this._conf.round) {
                brushSelection[0] = this._conf.round(brushSelection[0]);
                brushSelection[1] = this._conf.round(brushSelection[1]);
            }
            return brushSelection;
        }
        /**
         * @hidden
         */
        _brushIsEmpty(brushSelection) {
            return !brushSelection || brushSelection[1] <= brushSelection[0];
        }
        /**
         * @hidden
         */
        _brushing(evt) {
            if (this._ignoreBrushEvents) {
                return;
            }
            const rawBrushSelection = evt.selection;
            let brushSelection;
            if (rawBrushSelection) {
                brushSelection = rawBrushSelection.map(this.x().invert);
            }
            brushSelection = this._extendBrush(brushSelection);
            this._redrawBrush(brushSelection, false);
            const rangedFilter = this._brushIsEmpty(brushSelection)
                ? null
                : new RangedFilter(brushSelection[0], brushSelection[1]);
            events.trigger(() => {
                this._applyBrushSelection(rangedFilter);
            }, constants.EVENT_DELAY);
        }
        _applyBrushSelection(rangedFilter) {
            this.replaceFilter(rangedFilter);
            this.redrawGroup();
        }
        /**
         * @hidden
         */
        _withoutBrushEvents(closure) {
            const oldValue = this._ignoreBrushEvents;
            this._ignoreBrushEvents = true;
            try {
                closure();
            }
            finally {
                this._ignoreBrushEvents = oldValue;
            }
        }
        /**
         * @hidden
         */
        _setBrushExtents(doTransition) {
            this._withoutBrushEvents(() => {
                // Set boundaries of the brush, must set it before applying to self._gBrush
                this._brush.extent([
                    [0, 0],
                    [this.effectiveWidth(), this.effectiveHeight()],
                ]);
            });
            this._gBrush.call(this._brush);
        }
        /**
         * @hidden
         */
        _redrawBrush(brushSelection, doTransition) {
            if (this._conf.brushOn && this._gBrush) {
                if (this._resizing) {
                    this._setBrushExtents(doTransition);
                }
                if (!brushSelection) {
                    this._withoutBrushEvents(() => {
                        this._gBrush.call(this._brush.move, null);
                    });
                    this._gBrush.selectAll(`path.${CUSTOM_BRUSH_HANDLE_CLASS}`).attr('display', 'none');
                }
                else {
                    const scaledSelection = [this._x(brushSelection[0]), this._x(brushSelection[1])];
                    const gBrush = optionalTransition(doTransition, this._conf.transitionDuration, this._conf.transitionDelay)(this._gBrush);
                    this._withoutBrushEvents(() => {
                        gBrush.call(this._brush.move, scaledSelection);
                    });
                    gBrush
                        .selectAll(`path.${CUSTOM_BRUSH_HANDLE_CLASS}`)
                        .attr('display', null)
                        .attr('transform', (d, i) => `translate(${this._x(brushSelection[i])}, 0)`)
                        .attr('d', d => this._resizeHandlePath(d));
                }
            }
            this.fadeDeselectedArea(brushSelection);
        }
        /**
         * Composite chart needs it, hence public.
         *
         * @hidden
         */
        fadeDeselectedArea(brushSelection) {
            // do nothing, sub-chart should override this function
        }
        _resizeHandlePath(d) {
            d = d.type;
            const e = +(d === 'e');
            const x = e ? 1 : -1;
            const y = this.effectiveHeight() / 3;
            // TODO: revisit to see if + can be omitted
            return (`M${0.5 * x},${y}A6,6 0 0 ${e} ${6.5 * x},${y + 6}V${2 * y - 6}A6,6 0 0 ${e} ${0.5 * x},${2 * y}Z` + `M${2.5 * x},${y + 8}V${2 * y - 8}M${4.5 * x},${y + 8}V${2 * y - 8}`);
        }
        _getClipPathId() {
            return `${this.anchorName().replace(/[ .#=\[\]"]/g, '-')}-clip`;
        }
        _generateClipPath() {
            const defs = appendOrSelect(this._parent, 'defs');
            // cannot select <clippath> elements; bug in WebKit, must select by id
            // https://groups.google.com/forum/#!topic/d3-js/6EpAzQ2gU9I
            const id = this._getClipPathId();
            const chartBodyClip = appendOrSelect(defs, `#${id}`, 'clipPath').attr('id', id);
            const padding = this._conf.clipPadding * 2;
            appendOrSelect(chartBodyClip, 'rect')
                .attr('width', this._xAxisLength() + padding)
                .attr('height', this._yAxisHeight() + padding)
                .attr('transform', `translate(-${this._conf.clipPadding}, -${this._conf.clipPadding})`);
        }
        /**
         * @hidden
         */
        _preprocessData() { }
        /**
         * @hidden
         */
        _doRender() {
            this.resetSvg();
            this._preprocessData();
            this._generateG();
            this._generateClipPath();
            this._drawChart(true);
            this._configureMouseZoom();
            return this;
        }
        /**
         * @hidden
         */
        _doRedraw() {
            this._preprocessData();
            this._drawChart(false);
            this._generateClipPath();
            return this;
        }
        _drawChart(render) {
            if (this.isOrdinal()) {
                this.configure({ brushOn: false });
            }
            this._prepareXAxis(this.g(), render);
            this._prepareYAxis(this.g());
            this.plotData();
            if (this._conf.elasticX || this._resizing || render) {
                this._renderXAxis(this.g());
            }
            if (this._conf.elasticY || this._resizing || render) {
                this._renderYAxis();
            }
            if (render) {
                this._renderBrush(this.g(), false);
            }
            else {
                // Animate the brush only while resizing
                this._redrawBrush(this.filter(), this._resizing);
            }
            this.fadeDeselectedArea(this.filter());
            this.resizing(false);
        }
        /**
         * Implemented by derived charts. Composite chart needs it, hence public.
         *
         * @hidden
         */
        plotData() {
            // To be implemented in derived class
            throw new Error('Method not implemented.');
        }
        _configureMouseZoom() {
            // Save a copy of original x scale
            this._origX = this._x.copy();
            if (this._conf.mouseZoomable) {
                this._enableMouseZoom();
            }
            else if (this._hasBeenMouseZoomable) {
                this._disableMouseZoom();
            }
        }
        _enableMouseZoom() {
            this._hasBeenMouseZoomable = true;
            const extent = [
                [0, 0],
                [this.effectiveWidth(), this.effectiveHeight()],
            ];
            this._zoom
                .scaleExtent(this._conf.zoomScale)
                .extent(extent)
                .duration(this._conf.transitionDuration);
            if (this._conf.zoomOutRestrict) {
                // Ensure minimum zoomScale is at least 1
                const zoomScaleMin = Math.max(this._conf.zoomScale[0], 1);
                this._zoom.translateExtent(extent).scaleExtent([zoomScaleMin, this._conf.zoomScale[1]]);
            }
            this.root().call(this._zoom);
            // Tell D3 zoom our current zoom/pan status
            this._updateD3zoomTransform();
        }
        _disableMouseZoom() {
            this.root().call(this._nullZoom);
        }
        _updateUIforZoom(newDomain, noRaiseEvents) {
            if (newDomain instanceof Array && newDomain.length > 1) {
                this.x().domain(newDomain);
            }
            else {
                this.x().domain(this._xOriginalDomain);
            }
            this.rescale();
            this.redraw();
            this._updateD3zoomTransform();
            if (!noRaiseEvents) {
                this._invokeZoomedListener();
                events.trigger(() => {
                    this.redrawGroup();
                }, constants.EVENT_DELAY);
            }
        }
        // event.transform.rescaleX(self._origX).domain() should give back newDomain
        _domainToZoomTransform(newDomain, origDomain, xScale) {
            const k = (origDomain[1] - origDomain[0]) / (newDomain[1] - newDomain[0]);
            const xt = -1 * xScale(newDomain[0]);
            return d3Zoom.zoomIdentity.scale(k).translate(xt, 0);
        }
        // If we changing zoom status (for example by calling focus), tell D3 zoom about it
        _updateD3zoomTransform() {
            if (this._zoom) {
                this._withoutZoomEvents(() => {
                    this._zoom.transform(this.root(), this._domainToZoomTransform(this.x().domain(), this._xOriginalDomain, this._origX));
                });
            }
        }
        /**
         * @hidden
         */
        _withoutZoomEvents(closure) {
            const oldValue = this._ignoreZoomEvents;
            this._ignoreZoomEvents = true;
            try {
                closure();
            }
            finally {
                this._ignoreZoomEvents = oldValue;
            }
        }
        _onZoom(evt) {
            // ignore zoom events if it was caused by a programmatic change
            if (this._ignoreZoomEvents) {
                return;
            }
            const newDomain = evt.transform.rescaleX(this._origX).domain();
            this.focus(newDomain);
        }
        // TODO: come back for return type, currently forced, but generics may help
        _checkExtents(ext, outerLimits) {
            if (!ext || ext.length !== 2 || !outerLimits || outerLimits.length !== 2) {
                return ext;
            }
            if (ext[0] > outerLimits[1] || ext[1] < outerLimits[0]) {
                logger.warn('Could not intersect extents, will reset');
            }
            // Math.max does not work (as the values may be dates as well)
            return [
                ext[0] > outerLimits[0] ? ext[0] : outerLimits[0],
                ext[1] < outerLimits[1] ? ext[1] : outerLimits[1],
            ];
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
         * Starting with v5, this method is unlikely to be invoked directly.
         * A chart that needs to be focused should have {@linkcode ICoordinateGridMixinConf.autoFocus | autoFocus} set.
         * Such charts will focus when a {@linkcode filter} is applied.
         *
         * A {@linkcode ICoordinateGridMixinConf.mouseZoomable | mouseZoomable} chart focuses itself when zoomed.
         *
         * @example
         * ```
         * chart.focus([5, 10]);
         * // reset focus
         * chart.focus(null);
         * ```
         *
         * @see {@link filter}
         * @see {@link ICoordinateGridMixinConf.autoFocus}
         * @see {@link ICoordinateGridMixinConf.mouseZoomable}
         *
         * @category Intermediate
         */
        focus(range) {
            if (this._conf.zoomOutRestrict) {
                // ensure range is within self._xOriginalDomain
                range = this._checkExtents(range, this._xOriginalDomain);
            }
            let domFilter;
            if (range instanceof Array && range.length > 1) {
                domFilter = new RangedFilter(range[0], range[1]);
            }
            else {
                domFilter = null;
            }
            this.replaceFilter(domFilter);
            this._updateUIforZoom(range, false);
        }
        /**
         * Check if the chart has been focused.
         *
         * @see {@link focus}
         * @see {@link ICoordinateGridMixinConf.autoFocus}
         *
         * @category Intermediate
         */
        refocused() {
            return !arraysEqual(this.x().domain(), this._xOriginalDomain);
        }
    }

    function MarginMixinExt(Base) {
        return class extends Base {
            constructor(...args) {
                super(...args);
            }
        };
    }

    function CoordinateGridMixinExt(Base) {
        return class extends Base {
            constructor(...args) {
                super(...args);
                this._rangeChart = undefined;
                this._focusChart = undefined;
            }
            xUnits(xUnits) {
                if (!arguments.length) {
                    return this._conf.xUnits;
                }
                this.configure({ xUnits: xUnits });
                return this;
            }
            xAxisPadding(padding) {
                if (!arguments.length) {
                    return this._conf.xAxisPadding;
                }
                this.configure({ xAxisPadding: padding });
                return this;
            }
            xAxisPaddingUnit(unit) {
                if (!arguments.length) {
                    return this._conf.xAxisPaddingUnit;
                }
                this.configure({ xAxisPaddingUnit: unit });
                return this;
            }
            elasticX(elasticX) {
                if (!arguments.length) {
                    return this._conf.elasticX;
                }
                this.configure({ elasticX });
                return this;
            }
            yAxisPadding(padding) {
                if (!arguments.length) {
                    return this._conf.yAxisPadding;
                }
                this.configure({ yAxisPadding: padding });
                return this;
            }
            elasticY(elasticY) {
                if (!arguments.length) {
                    return this._conf.elasticY;
                }
                this.configure({ elasticY });
                return this;
            }
            round(round) {
                if (!arguments.length) {
                    return this._conf.round;
                }
                this.configure({ round: round });
                return this;
            }
            renderHorizontalGridLines(renderHorizontalGridLines) {
                if (!arguments.length) {
                    return this._conf.renderHorizontalGridLines;
                }
                this.configure({ renderHorizontalGridLines: renderHorizontalGridLines });
                return this;
            }
            renderVerticalGridLines(renderVerticalGridLines) {
                if (!arguments.length) {
                    return this._conf.renderVerticalGridLines;
                }
                this.configure({ renderVerticalGridLines: renderVerticalGridLines });
                return this;
            }
            zoomScale(extent) {
                if (!arguments.length) {
                    return this._conf.zoomScale;
                }
                this.configure({ zoomScale: extent });
                return this;
            }
            zoomOutRestrict(zoomOutRestrict) {
                if (!arguments.length) {
                    return this._conf.zoomOutRestrict;
                }
                this.configure({ zoomOutRestrict: zoomOutRestrict });
                return this;
            }
            mouseZoomable(mouseZoomable) {
                if (!arguments.length) {
                    return this._conf.mouseZoomable;
                }
                this.configure({ mouseZoomable: mouseZoomable });
                return this;
            }
            clipPadding(padding) {
                if (!arguments.length) {
                    return this._conf.clipPadding;
                }
                this.configure({ clipPadding: padding });
                return this;
            }
            useRightYAxis(useRightYAxis) {
                if (!arguments.length) {
                    return this._conf.useRightYAxis;
                }
                // We need to warn if value is changing after self._yAxis was created
                // @ts-ignore, _yAxis is private in CoordinateGridMixin
                if (this._conf.useRightYAxis !== useRightYAxis && this._yAxis) {
                    logger.warn('Value of useRightYAxis has been altered, after yAxis was created. ' +
                        'You might get unexpected yAxis behavior. ' +
                        'Make calls to useRightYAxis sooner in your chart creation process.');
                }
                this.configure({ useRightYAxis: useRightYAxis });
                return this;
            }
            rangeChart(rangeChart) {
                if (!arguments.length) {
                    return this._rangeChart;
                }
                this._rangeChart = rangeChart;
                this.configure({ autoFocus: true });
                // @ts-ignore
                this._rangeChart.focusChart(this);
                return this;
            }
            focusChart(c) {
                if (!arguments.length) {
                    return this._focusChart;
                }
                this._focusChart = c;
                return this;
            }
            brushOn(brushOn) {
                if (!arguments.length) {
                    return this._conf.brushOn;
                }
                this.configure({ brushOn });
                return this;
            }
            parentBrushOn(brushOn) {
                if (!arguments.length) {
                    return this._conf.parentBrushOn;
                }
                this.configure({ parentBrushOn: brushOn });
                return this;
            }
        };
    }
    // @ts-ignore
    const CoordinateGridMixin = CoordinateGridMixinExt(ColorMixinExt(MarginMixinExt(BaseMixinExt(CoordinateGridMixin$1))));

    class CFMultiAdapter extends CFSimpleAdapter {
        constructor(conf = {}) {
            super(Object.assign({ layers: [], valueAccessor: d => d.value }, conf));
        }
        configure(conf) {
            return super.configure(conf);
        }
        conf() {
            return super.conf();
        }
        // TODO: better typing
        data() {
            // Two level defensive copy
            return this.layers().map(layer => {
                const valueAccessor = layer.valueAccessor || this._conf.valueAccessor;
                // Two level defensive copy
                const rawData = layer.group.all().map(val => (Object.assign(Object.assign({}, val), { _value: valueAccessor(val) })));
                return { name: layer.name, rawData };
            });
        }
        layers() {
            if (this._conf.group) {
                // if a stack configuration includes a `group` as well, that become the first layer
                const firstLayer = { name: this._conf.groupName, group: this._conf.group };
                return [firstLayer].concat(this._conf.layers);
            }
            return this._conf.layers;
        }
        layerByName(name) {
            return this._conf.layers.find(l => l.name === name);
        }
    }

    /**
     * Stack Mixin is an mixin that provides cross-chart support of stackability using d3.stack.
     */
    class StackMixin$1 extends CoordinateGridMixin$1 {
        /**
         * Create a new instance.
         *
         * @see {@link BaseMixin.constructor}
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this.configure({
                colorAccessor: d => d.name,
                hidableStacks: false,
                evadeDomainFilter: false,
            });
            this.dataProvider(new CFMultiAdapter());
            this._stackLayout = d3Shape.stack();
            this._hiddenStacks = {};
        }
        /**
         * @see {@link BaseMixin.configure}
         */
        configure(conf) {
            super.configure(conf);
            return this;
        }
        /**
         * @see {@link BaseMixin.conf}
         */
        conf() {
            return this._conf;
        }
        dataProvider(dataProvider) {
            if (!arguments.length) {
                return super.dataProvider();
            }
            return super.dataProvider(dataProvider);
        }
        /**
         * @category Ninja
         * @see {@link BaseMixin.data}
         */
        data() {
            let layers = this.dataProvider().data();
            layers = layers.filter(l => this._isLayerVisible(l.name));
            if (!layers.length) {
                return [];
            }
            layers.forEach(l => {
                const allValues = l.rawData.map((d, i) => ({
                    x: this._conf.keyAccessor(d, i),
                    y: d._value,
                    data: d,
                    name: l.name,
                }));
                l.domainValues = allValues.filter(layer => this._domainFilter()(layer));
                l.values = this._conf.evadeDomainFilter ? allValues : l.domainValues;
            });
            const v4data = layers[0].values.map((v, i) => {
                const col = { x: v.x };
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
        }
        _domainFilter() {
            if (!this.x()) {
                return () => true;
            }
            const xDomain = this.x().domain();
            if (this.isOrdinal()) {
                // TODO #416
                // var domainSet = d3.set(xDomain);
                return () => true; // domainSet.has(p.x);
            }
            if (this._conf.elasticX) {
                return () => true;
            }
            return p => p.x >= xDomain[0] && p.x <= xDomain[xDomain.length - 1];
        }
        /**
         * Hide the stack with the given name.
         * The chart must be re-rendered for this change to appear.
         *
         * @category Intermediate
         */
        hideStack(stackName) {
            this._hiddenStacks[stackName] = true;
            return this;
        }
        /**
         * Make stack with the given name visible.
         * The chart must be re-rendered for this change to appear.
         *
         * @category Intermediate
         */
        showStack(stackName) {
            this._hiddenStacks[stackName] = false;
            return this;
        }
        _isLayerVisible(layerName) {
            return !this._hiddenStacks[layerName];
        }
        /**
         * @see {@link CoordinateGridMixin.yAxisMin}
         *
         * @category Intermediate
         */
        yAxisMin() {
            const m = d3Array.min(this._flattenStack(), p => (p.y < 0 ? p.y + p.y0 : p.y0));
            return subtract(m, this._conf.yAxisPadding);
        }
        /**
         * @see {@link CoordinateGridMixin.yAxisMax}
         *
         * @category Intermediate
         */
        yAxisMax() {
            const m = d3Array.max(this._flattenStack(), p => (p.y > 0 ? p.y + p.y0 : p.y0));
            return add(m, this._conf.yAxisPadding);
        }
        // TODO: better types
        _flattenStack() {
            // @ts-ignore     // TODO: better types
            return this.data().flatMap(layer => layer.domainValues);
        }
        /**
         * @see {@link CoordinateGridMixin.xAxisMin}
         *
         * @category Intermediate
         */
        xAxisMin() {
            const m = d3Array.min(this._flattenStack(), d => d.x);
            return subtract(m, this._conf.xAxisPadding, this._conf.xAxisPaddingUnit);
        }
        /**
         * @see {@link CoordinateGridMixin.xAxisMax}
         *
         * @category Intermediate
         */
        xAxisMax() {
            const m = d3Array.max(this._flattenStack(), d => d.x);
            return add(m, this._conf.xAxisPadding, this._conf.xAxisPaddingUnit);
        }
        /**
         * @hidden
         */
        titleFn(stackName) {
            return (this._conf.titles && this._conf.titles[stackName]) || this._conf.title;
        }
        stackLayout(_stack) {
            if (!arguments.length) {
                return this._stackLayout;
            }
            this._stackLayout = _stack;
            return this;
        }
        /**
         * @hidden
         */
        _ordinalXDomain() {
            const flat = this._flattenStack().map(d => d.data);
            const ordered = this._computeOrderedGroups(flat);
            return ordered.map(this._conf.keyAccessor);
        }
        /**
         * @see {@link BaseMixin.legendables}
         */
        legendables() {
            return this.dataProvider()
                .layers()
                .map((layer, i) => ({
                chart: this,
                name: layer.name,
                hidden: !this._isLayerVisible(layer.name),
                color: this._colorHelper.getColor(layer, i),
            }));
        }
        /**
         * @hidden
         */
        isLegendableHidden(d) {
            return !this._isLayerVisible(d.name);
        }
        /**
         * @hidden
         */
        legendToggle(d) {
            if (this._conf.hidableStacks) {
                if (this.isLegendableHidden(d)) {
                    this.showStack(d.name);
                }
                else {
                    this.hideStack(d.name);
                }
                // _chart.redraw();
                this.renderGroup();
            }
        }
    }

    function StackMixinExt(Base) {
        return class extends Base {
            constructor(...args) {
                super(...args);
            }
            stack(group, name, accessor) {
                if (!arguments.length) {
                    return this._dataProvider.layers();
                }
                const stack = this._dataProvider.conf().layers;
                if (arguments.length <= 2) {
                    accessor = name;
                }
                name = typeof name === 'string' ? name : String(stack.length);
                const layer = { group, name };
                if (typeof accessor === 'function') {
                    layer.valueAccessor = accessor;
                }
                stack.push(layer);
                return this;
            }
            group(g, n, f) {
                if (!arguments.length) {
                    return super.group();
                }
                this._dataProvider.configure({
                    layers: [],
                });
                this.configure({
                    titles: {},
                });
                if (f) {
                    this._dataProvider.configure({ valueAccessor: f });
                }
                return super.group(g, n);
            }
            title(stackName, titleAccessor) {
                if (!stackName) {
                    return super.title();
                }
                if (typeof stackName === 'function') {
                    return super.title(stackName);
                }
                if (stackName === this.dataProvider().conf().groupName &&
                    typeof titleAccessor === 'function') {
                    return super.title(titleAccessor);
                }
                if (typeof titleAccessor !== 'function') {
                    return this._conf.titles[stackName] || super.title();
                }
                this._conf.titles[stackName] = titleAccessor;
                return this;
            }
            /**
             * Allow named stacks to be hidden or shown by clicking on legend items.
             * This does not affect the behavior of hideStack or showStack.
             * @param [hidableStacks=false]
             */
            hidableStacks(hidableStacks) {
                if (!arguments.length) {
                    return this._conf.hidableStacks;
                }
                this.configure({ hidableStacks: hidableStacks });
                return this;
            }
            evadeDomainFilter(evadeDomainFilter) {
                if (!arguments.length) {
                    return this._conf.evadeDomainFilter;
                }
                this.configure({ evadeDomainFilter: evadeDomainFilter });
                return this;
            }
        };
    }
    const StackMixin = StackMixinExt(CoordinateGridMixinExt(ColorMixinExt(MarginMixinExt(BaseMixinExt(StackMixin$1)))));

    const MIN_BAR_WIDTH = 1;
    const DEFAULT_GAP_BETWEEN_BARS = 2;
    const LABEL_PADDING$1 = 3;
    /**
     * Concrete bar chart/histogram implementation.
     *
     * Examples:
     * - {@link http://dc-js.github.com/dc.js/ | Nasdaq 100 Index}
     * - {@link http://dc-js.github.com/dc.js/crime/index.html | Canadian City Crime Stats}
     */
    class BarChart$1 extends StackMixin$1 {
        /**
         * Create a Bar Chart
         *
         * TODO: update example for chartGroup
         *
         * @example
         * ```
         * // create a bar chart under #chart-container1 element using the default global chart group
         * var chart1 = new BarChart('#chart-container1');
         * // create a bar chart under #chart-container2 element using chart group A
         * var chart2 = new BarChart('#chart-container2', 'chartGroupA');
         * // create a sub-chart under a composite parent chart
         * var chart3 = new BarChart(compositeChart);
         * {@link https://github.com/d3/d3-selection/blob/master/README.md#select | d3 single selector}
         * specifying a dom block element such as a div; or a dom element or d3 selection.  If the bar
         * chart is a sub-chart in a {@link CompositeChart | Composite Chart} then pass in the parent
         * composite chart instance instead.
         * Interaction with a chart will only trigger events and redraws within the chart's group.
         * ```
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this.configure({
                label: d => printSingleValue(d.y0 + d.y),
                renderLabel: false,
                centerBar: false,
                alwaysUseRounding: false,
            });
            this._gap = DEFAULT_GAP_BETWEEN_BARS; // TODO: after untangling it with outer/inner paddings try to move to conf
            this._barWidth = undefined;
        }
        configure(conf) {
            super.configure(conf);
            return this;
        }
        conf() {
            return this._conf;
        }
        outerPadding(padding) {
            if (!arguments.length) {
                return this._outerRangeBandPadding();
            }
            return this._outerRangeBandPadding(padding);
        }
        rescale() {
            super.rescale();
            this._barWidth = undefined;
            return this;
        }
        render() {
            if (this._conf.round && this._conf.centerBar && !this._conf.alwaysUseRounding) {
                logger.warn('By default, brush rounding is disabled if bars are centered. ' +
                    'See dc.js bar chart API documentation for details.');
            }
            return super.render();
        }
        plotData() {
            let layers = this.chartBodyG().selectAll('g.stack').data(this.data());
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
                    if (chart._conf.renderLabel && last === i) {
                        chart._renderLabels(layer, i, d);
                    }
                });
            }
        }
        _barHeight(d) {
            return safeNumber(Math.abs(this.y()(d.y + d.y0) - this.y()(d.y0)));
        }
        _labelXPos(d) {
            let x = this.x()(d.x);
            if (!this._conf.centerBar) {
                x += this._barWidth / 2;
            }
            if (this.isOrdinal() && this._gap !== undefined) {
                x += this._gap / 2;
            }
            return safeNumber(x);
        }
        _labelYPos(d) {
            let y = this.y()(d.y + d.y0);
            if (d.y < 0) {
                y -= this._barHeight(d);
            }
            return safeNumber(y - LABEL_PADDING$1);
        }
        _renderLabels(layer, layerIndex, data) {
            const labels = layer
                .selectAll('text.barLabel')
                .data(data.values, d => d.x);
            const labelsEnterUpdate = labels
                .enter()
                .append('text')
                .attr('class', 'barLabel')
                .attr('text-anchor', 'middle')
                .attr('x', d => this._labelXPos(d))
                .attr('y', d => this._labelYPos(d))
                .merge(labels);
            if (this.isOrdinal()) {
                labelsEnterUpdate.on('click', (evt, d) => this.onClick(d));
                labelsEnterUpdate.attr('cursor', 'pointer');
            }
            transition(labelsEnterUpdate, this._conf.transitionDuration, this._conf.transitionDelay)
                .attr('x', d => this._labelXPos(d))
                .attr('y', d => this._labelYPos(d))
                .text(d => this._conf.label(d));
            transition(labels.exit(), this._conf.transitionDuration, this._conf.transitionDelay)
                .attr('height', 0)
                .remove();
        }
        _barXPos(d) {
            let x = this.x()(d.x);
            if (this._conf.centerBar) {
                x -= this._barWidth / 2;
            }
            if (this.isOrdinal() && this._gap !== undefined) {
                x += this._gap / 2;
            }
            return safeNumber(x);
        }
        _renderBars(layer, layerIndex, data) {
            const bars = layer
                .selectAll('rect.bar')
                .data(data.values, d => d.x);
            const enter = bars
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('fill', (d, i) => this._colorHelper.getColor(d, i))
                .attr('x', d => this._barXPos(d))
                .attr('y', this._yAxisHeight())
                .attr('height', 0);
            // prettier-ignore
            const barsEnterUpdate = enter.merge(bars);
            if (this._conf.renderTitle) {
                enter.append('title').text(pluck2('data', this.titleFn(data.name)));
            }
            if (this.isOrdinal()) {
                barsEnterUpdate.on('click', (evt, d) => this.onClick(d));
            }
            transition(barsEnterUpdate, this._conf.transitionDuration, this._conf.transitionDelay)
                .attr('x', d => this._barXPos(d))
                .attr('y', d => {
                let y = this.y()(d.y + d.y0);
                if (d.y < 0) {
                    y -= this._barHeight(d);
                }
                return safeNumber(y);
            })
                .attr('width', this._barWidth)
                .attr('height', d => this._barHeight(d))
                .attr('fill', (d, i) => this._colorHelper.getColor(d, i))
                .select('title')
                .text(pluck2('data', this.titleFn(data.name)));
            transition(bars.exit(), this._conf.transitionDuration, this._conf.transitionDelay)
                .attr('x', d => this.x()(d.x))
                .attr('width', this._barWidth * 0.9)
                .remove();
        }
        _calculateBarWidth() {
            if (this._barWidth === undefined) {
                const numberOfBars = this.xUnitCount();
                // please can't we always use rangeBands for bar charts?
                if (this.isOrdinal() && this._gap === undefined) {
                    this._barWidth = Math.floor(this.x().bandwidth());
                }
                else if (this._gap) {
                    this._barWidth = Math.floor((this._xAxisLength() - (numberOfBars - 1) * this._gap) / numberOfBars);
                }
                else {
                    this._barWidth = Math.floor(this._xAxisLength() / (1 + this.barPadding()) / numberOfBars);
                }
                if (this._barWidth === Infinity ||
                    isNaN(this._barWidth) ||
                    this._barWidth < MIN_BAR_WIDTH) {
                    this._barWidth = MIN_BAR_WIDTH;
                }
            }
        }
        fadeDeselectedArea(brushSelection) {
            // prettier-ignore
            const bars = this.chartBodyG().selectAll('rect.bar');
            if (this.isOrdinal()) {
                if (this.hasFilter()) {
                    bars.classed(constants.SELECTED_CLASS, d => this.hasFilter(d.x));
                    bars.classed(constants.DESELECTED_CLASS, d => !this.hasFilter(d.x));
                }
                else {
                    bars.classed(constants.SELECTED_CLASS, false);
                    bars.classed(constants.DESELECTED_CLASS, false);
                }
            }
            else if (this._conf.brushOn || this._conf.parentBrushOn) {
                if (!this._brushIsEmpty(brushSelection)) {
                    const start = brushSelection[0];
                    const end = brushSelection[1];
                    bars.classed(constants.DESELECTED_CLASS, d => d.x < start || d.x >= end);
                }
                else {
                    bars.classed(constants.DESELECTED_CLASS, false);
                }
            }
        }
        onClick(d, i) {
            super.onClick(d.data, i);
        }
        barPadding(barPadding) {
            if (!arguments.length) {
                return this._rangeBandPadding();
            }
            this._rangeBandPadding(barPadding);
            this._gap = undefined;
            return this;
        }
        _useOuterPadding() {
            return this._gap === undefined;
        }
        gap(gap) {
            if (!arguments.length) {
                return this._gap;
            }
            this._gap = gap;
            return this;
        }
        _extendBrush(brushSelection) {
            if (brushSelection &&
                this._conf.round &&
                (!this._conf.centerBar || this._conf.alwaysUseRounding)) {
                brushSelection[0] = this._conf.round(brushSelection[0]);
                brushSelection[1] = this._conf.round(brushSelection[1]);
            }
            return brushSelection;
        }
        legendHighlight(d) {
            const colorFilter = (color, inv) => function () {
                const item = d3Selection.select(this);
                const match = item.attr('fill') === color;
                return inv ? !match : match;
            };
            if (!this.isLegendableHidden(d)) {
                this.g()
                    .selectAll('rect.bar')
                    .classed('highlight', colorFilter(d.color))
                    .classed('fadeout', colorFilter(d.color, true));
            }
        }
        legendReset() {
            this.g().selectAll('rect.bar').classed('highlight', false).classed('fadeout', false);
        }
        xAxisMax() {
            let max = super.xAxisMax();
            if ('resolution' in this._conf.xUnits) {
                const res = this._conf.xUnits.resolution;
                max = max + res; // max can be date as well, this case refers when xUnits is floating point
            }
            return max;
        }
    }

    class BarChart extends StackMixinExt(CoordinateGridMixinExt(ColorMixinExt(MarginMixinExt(BaseMixinExt(BarChart$1))))) {
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
        }
        centerBar(centerBar) {
            if (!arguments.length) {
                return this._conf.centerBar;
            }
            this.configure({ centerBar: centerBar });
            return this;
        }
        alwaysUseRounding(alwaysUseRounding) {
            if (!arguments.length) {
                return this._conf.alwaysUseRounding;
            }
            this.configure({ alwaysUseRounding: alwaysUseRounding });
            return this;
        }
    }
    const barChart = (parent, chartGroup) => new BarChart(parent, chartGroup);

    // Returns a function to compute the interquartile range.
    function defaultWhiskersIQR(k) {
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
     * - {@link http://dc-js.github.io/dc.js/examples/boxplot-basic.html | Boxplot Basic example}
     * - {@link http://dc-js.github.io/dc.js/examples/boxplot-enhanced.html | Boxplot Enhanced example}
     * - {@link http://dc-js.github.io/dc.js/examples/boxplot-render-data.html | Boxplot Render Data example}
     * - {@link http://dc-js.github.io/dc.js/examples/boxplot-time.html | Boxplot time example}
     */
    class BoxPlot$1 extends CoordinateGridMixin$1 {
        /**
         * Create a BoxPlot.
         *
         * TODO: update example
         * @example
         * ```
         * // create a box plot under #chart-container1 element using the default global chart group
         * var boxPlot1 = new BoxPlot('#chart-container1');
         * // create a box plot under #chart-container2 element using chart group A
         * var boxPlot2 = new BoxPlot('#chart-container2', 'chartGroupA');
         * @param parent - Any valid {@link https://github.com/d3/d3-selection/blob/master/README.md#select | d3 single selector} specifying
         * a dom block element such as a div; or a dom element or d3 selection.
         * @param chartGroup - The name of the chart group this chart instance should be placed in.
         * Interaction with a chart will only trigger events and redraws within the chart's group.
         * ```
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            const whiskerIqrFactor = 1.5;
            this._whiskers = defaultWhiskersIQR(whiskerIqrFactor);
            this._box = d3Box();
            this.configure({
                xUnits: UnitsOrdinal,
                tickFormat: null,
                renderDataPoints: false,
                dataOpacity: 0.3,
                dataWidthPortion: 0.8,
                showOutliers: true,
                boldOutlier: false,
                // Used in yAxisMin and yAxisMax to add padding in pixel coordinates
                // so the min and max data points/whiskers are within the chart
                yRangePadding: 8,
            });
            this._boxWidth = (innerChartWidth, xUnits) => {
                if (this.isOrdinal()) {
                    return this.x().bandwidth();
                }
                else {
                    return innerChartWidth / (1 + this.boxPadding()) / xUnits;
                }
            };
            // default to ordinal
            this.x(d3Scale.scaleBand());
            this.boxPadding(0.8);
            this.outerPadding(0.5);
        }
        configure(conf) {
            super.configure(conf);
            return this;
        }
        conf() {
            return this._conf;
        }
        data() {
            // valueAccessor should return an array of values that can be coerced into numbers
            // or if data is overloaded for a static array of arrays, it should be `Number`.
            // Empty arrays are not included.
            return super
                .data()
                .map(d => {
                d.map = accessor => accessor.call(d, d);
                return d;
            })
                .filter(d => {
                const values = d._value;
                return values.length !== 0;
            });
        }
        boxPadding(padding) {
            if (!arguments.length) {
                return this._rangeBandPadding();
            }
            return this._rangeBandPadding(padding);
        }
        outerPadding(padding) {
            if (!arguments.length) {
                return this._outerRangeBandPadding();
            }
            return this._outerRangeBandPadding(padding);
        }
        boxWidth(boxWidth) {
            if (!arguments.length) {
                return this._boxWidth;
            }
            this._boxWidth = typeof boxWidth === 'function' ? boxWidth : () => boxWidth;
            return this;
        }
        _boxTransform(d, i) {
            const xOffset = this.x()(this._conf.keyAccessor(d, i));
            return `translate(${xOffset}, 0)`;
        }
        _preprocessData() {
            if (this._conf.elasticX) {
                this.x().domain([]);
            }
        }
        plotData() {
            const calculatedBoxWidth = this._boxWidth(this.effectiveWidth(), this.xUnitCount());
            this._box
                .whiskers(this._whiskers)
                .width(calculatedBoxWidth)
                .height(this.effectiveHeight())
                .value(d => d._value)
                .domain(this.y().domain())
                .duration(this._conf.transitionDuration)
                .tickFormat(this._conf.tickFormat)
                .renderDataPoints(this._conf.renderDataPoints)
                .dataOpacity(this._conf.dataOpacity)
                .dataWidthPortion(this._conf.dataWidthPortion)
                .renderTitle(this._conf.renderTitle)
                .showOutliers(this._conf.showOutliers)
                .boldOutlier(this._conf.boldOutlier);
            const boxesG = this.chartBodyG()
                .selectAll('g.box')
                .data(this.data(), this._conf.keyAccessor);
            const boxesGEnterUpdate = this._renderBoxes(boxesG);
            this._updateBoxes(boxesGEnterUpdate);
            this._removeBoxes(boxesG);
            this.fadeDeselectedArea(this.filter());
        }
        _renderBoxes(boxesG) {
            const boxesGEnter = boxesG.enter().append('g');
            boxesGEnter
                .attr('class', 'box')
                .attr('transform', (d, i) => this._boxTransform(d, i))
                .call(this._box)
                .on('click', (evt, d) => {
                this.filter(this._conf.keyAccessor(d));
                this.redrawGroup();
            });
            return boxesGEnter.merge(boxesG);
        }
        _updateBoxes(boxesG) {
            const chart = this;
            transition(boxesG, this._conf.transitionDuration, this._conf.transitionDelay)
                .attr('transform', (d, i) => this._boxTransform(d, i))
                .call(this._box)
                .each(function (d) {
                const color = chart._colorHelper.getColor(d, 0);
                d3Selection.select(this).select('rect.box').attr('fill', color);
                d3Selection.select(this).selectAll('circle.data').attr('fill', color);
            });
        }
        _removeBoxes(boxesG) {
            boxesG.exit().remove().call(this._box);
        }
        _minDataValue() {
            // @ts-ignore
            return d3Array.min(this.data(), e => d3Array.min(e._value));
        }
        _maxDataValue() {
            // @ts-ignore
            return d3Array.max(this.data(), e => d3Array.max(e._value));
        }
        _yAxisRangeRatio() {
            return (this._maxDataValue() - this._minDataValue()) / this.effectiveHeight();
        }
        fadeDeselectedArea(brushSelection) {
            const chart = this;
            if (this.hasFilter()) {
                if (this.isOrdinal()) {
                    this.g()
                        .selectAll('g.box')
                        .each(function (d) {
                        if (chart.isSelectedNode(d)) {
                            chart.highlightSelected(this);
                        }
                        else {
                            chart.fadeDeselected(this);
                        }
                    });
                }
                else {
                    if (!(this._conf.brushOn || this._conf.parentBrushOn)) {
                        return;
                    }
                    const start = brushSelection[0];
                    const end = brushSelection[1];
                    this.g()
                        .selectAll('g.box')
                        .each(function (d) {
                        const key = chart._conf.keyAccessor(d);
                        if (key < start || key >= end) {
                            chart.fadeDeselected(this);
                        }
                        else {
                            chart.highlightSelected(this);
                        }
                    });
                }
            }
            else {
                this.g()
                    .selectAll('g.box')
                    .each(function () {
                    chart.resetHighlight(this);
                });
            }
        }
        isSelectedNode(d) {
            return this.hasFilter(this._conf.keyAccessor(d));
        }
        yAxisMin() {
            const padding = this._conf.yRangePadding * this._yAxisRangeRatio();
            return subtract(this._minDataValue() - padding, this._conf.yAxisPadding);
        }
        yAxisMax() {
            const padding = this._conf.yRangePadding * this._yAxisRangeRatio();
            return add(this._maxDataValue() + padding, this._conf.yAxisPadding);
        }
    }

    class BoxPlot extends CoordinateGridMixinExt(ColorMixinExt(MarginMixinExt(BaseMixinExt(BoxPlot$1)))) {
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
        }
        tickFormat(tickFormat) {
            if (!arguments.length) {
                return this._conf.tickFormat;
            }
            this.configure({ tickFormat: tickFormat });
            return this;
        }
        renderDataPoints(show) {
            if (!arguments.length) {
                return this._conf.renderDataPoints;
            }
            this.configure({ renderDataPoints: show });
            return this;
        }
        dataOpacity(opacity) {
            if (!arguments.length) {
                return this._conf.dataOpacity;
            }
            this.configure({ dataOpacity: opacity });
            return this;
        }
        yRangePadding(yRangePadding) {
            if (!arguments.length) {
                return this._conf.yRangePadding;
            }
            this.configure({ yRangePadding: yRangePadding });
            return this;
        }
        dataWidthPortion(percentage) {
            if (!arguments.length) {
                return this._conf.dataWidthPortion;
            }
            this.configure({ dataWidthPortion: percentage });
            return this;
        }
        showOutliers(show) {
            if (!arguments.length) {
                return this._conf.showOutliers;
            }
            this.configure({ showOutliers: show });
            return this;
        }
        boldOutlier(show) {
            if (!arguments.length) {
                return this._conf.boldOutlier;
            }
            this.configure({ boldOutlier: show });
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
     * - {@link http://dc-js.github.com/dc.js/ | Nasdaq 100 Index}
     * - {@link http://dc-js.github.com/dc.js/vc/index.html | US Venture Capital Landscape 2011}
     */
    class BubbleChart$1 extends BubbleMixin(CoordinateGridMixin$1) {
        /**
         * Create a Bubble Chart.
         *
         * TODO update example
         *
         * @example
         * ```
         * // create a bubble chart under #chart-container1 element using the default global chart group
         * var bubbleChart1 = new BubbleChart('#chart-container1');
         * // create a bubble chart under #chart-container2 element using chart group A
         * var bubbleChart2 = new BubbleChart('#chart-container2', 'chartGroupA');
         * ```
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this.configure({
                // TODO: move following two to Mixin, BubbleOverlay has exactly same setup
                transitionDuration: 750,
                transitionDelay: 0,
                brushOn: false,
            });
            this._bubbleLocator = d => `translate(${this._bubbleX(d)},${this._bubbleY(d)})`;
        }
        /**
         * hidden
         */
        plotData() {
            this.calculateRadiusDomain();
            this.r().range([this.MIN_RADIUS, this._xAxisLength() * this._conf.maxBubbleRelativeSize]);
            const data = this.data();
            let bubbleG = this.chartBodyG()
                .selectAll(`g.${this.BUBBLE_NODE_CLASS}`)
                .data(data, d => d.key);
            if (this._conf.sortBubbleSize) {
                // update dom order based on sort
                bubbleG.order();
            }
            this._removeNodes(bubbleG);
            bubbleG = this._renderNodes(bubbleG);
            this._updateNodes(bubbleG);
            this.fadeDeselectedArea(this.filter());
        }
        _renderNodes(bubbleG) {
            const bubbleGEnter = bubbleG.enter().append('g');
            bubbleGEnter
                .attr('class', this.BUBBLE_NODE_CLASS)
                .attr('transform', d => this._bubbleLocator(d))
                .append('circle')
                .attr('class', (d, i) => `${this.BUBBLE_CLASS} _${i}`)
                .on('click', (evt, d) => this.onClick(d))
                .attr('fill', (d, i) => this._colorHelper.getColor(d, i))
                .attr('r', 0);
            bubbleG = bubbleGEnter.merge(bubbleG);
            transition(bubbleG, this._conf.transitionDuration, this._conf.transitionDelay)
                .select(`circle.${this.BUBBLE_CLASS}`)
                .attr('r', d => this.bubbleR(d))
                .attr('opacity', d => (this.bubbleR(d) > 0 ? 1 : 0));
            this._doRenderLabel(bubbleGEnter);
            this._doRenderTitles(bubbleGEnter);
            return bubbleG;
        }
        _updateNodes(bubbleG) {
            transition(bubbleG, this._conf.transitionDuration, this._conf.transitionDelay)
                .attr('transform', d => this._bubbleLocator(d))
                .select(`circle.${this.BUBBLE_CLASS}`)
                .attr('fill', (d, i) => this._colorHelper.getColor(d, i))
                .attr('r', d => this.bubbleR(d))
                .attr('opacity', d => (this.bubbleR(d) > 0 ? 1 : 0));
            this.doUpdateLabels(bubbleG);
            this.doUpdateTitles(bubbleG);
        }
        _removeNodes(bubbleG) {
            bubbleG.exit().remove();
        }
        _bubbleX(d) {
            let x = this.x()(this._conf.keyAccessor(d));
            if (isNaN(x) || !isFinite(x)) {
                x = 0;
            }
            return x;
        }
        _bubbleY(d) {
            let y = this.y()(d._value);
            if (isNaN(y) || !isFinite(y)) {
                y = 0;
            }
            return y;
        }
    }

    class BubbleChart extends BubbleMixinExt(
    // @ts-ignore
    CoordinateGridMixinExt(ColorMixinExt(MarginMixinExt(BaseMixinExt(BubbleChart$1))))) {
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
        }
    }
    const bubbleChart = (parent, chartGroup) => new BubbleChart(parent, chartGroup);

    // @ts-ignore, TODO, not supported in d3v6
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
     * - {@link http://dc-js.github.com/dc.js/crime/index.html | Canadian City Crime Stats}
     */
    class BubbleOverlay$1 extends BubbleMixin(ColorMixin$1(BaseMixin$1)) {
        /**
         * Create a Bubble Overlay.
         * Unlike other dc charts this chart will not generate a svg
         * element; therefore the bubble overlay chart will not work if svg is not explicitly set.
         * If the underlying image is a bitmap, then an empty svg will need to be created on top of the image.
         *
         * TODO update example
         *
         * @example
         * ```
         * // create a bubble overlay chart on top of the '#chart-container1 svg' element using the default global chart group
         * var bubbleChart1 = new BubbleOverlay('#chart-container1').svg(d3.select('#chart-container1 svg'));
         * // create a bubble overlay chart on top of the '#chart-container2 svg' element using chart group A
         * var bubbleChart2 = new BubbleOverlay('#chart-container2', 'chartGroupA').svg(d3.select('#chart-container2 svg'));
         * ```
         *
         * @see {@link BaseMixin.constructor}
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this.configure({
                points: [],
            });
            this._g = undefined;
            this.configure({
                // TODO: move following two to Mixin, BubbleChart has exactly same setup
                transitionDuration: 750,
                transitionDelay: 0,
                radiusValueAccessor: d => d.value,
            });
        }
        /**
         * @see {@link BaseMixin.configure}
         */
        configure(conf) {
            super.configure(conf);
            return this;
        }
        /**
         * @see {@link BaseMixin.conf}
         */
        conf() {
            return this._conf;
        }
        svg(svgElement) {
            if (!arguments.length) {
                return super.svg();
            }
            super.svg(svgElement);
            return this;
        }
        /**
         * @hidden
         */
        _doRender() {
            this._g = this._initOverlayG();
            this.r().range([this.MIN_RADIUS, this.width() * this._conf.maxBubbleRelativeSize]);
            this._initializeBubbles();
            this.fadeDeselectedArea(this.filter());
            return this;
        }
        _initOverlayG() {
            this._g = this.select(`g.${BUBBLE_OVERLAY_CLASS}`);
            if (this._g.empty()) {
                this._g = this.svg().append('g').attr('class', BUBBLE_OVERLAY_CLASS);
            }
            return this._g;
        }
        _initializeBubbles() {
            const data = this._mapData();
            this.calculateRadiusDomain();
            this._conf.points.forEach(point => {
                const nodeG = this._getNodeG(point, data);
                let circle = nodeG.select(`circle.${BUBBLE_CLASS}`);
                if (circle.empty()) {
                    circle = nodeG
                        .append('circle')
                        .attr('class', BUBBLE_CLASS)
                        .attr('r', 0)
                        .attr('fill', (d, i) => this._colorHelper.getColor(d, i))
                        .on('click', (evt, d) => this.onClick(d));
                }
                transition(circle, this._conf.transitionDuration, this._conf.transitionDelay).attr('r', d => this.bubbleR(d));
                this._doRenderLabel(nodeG);
                this._doRenderTitles(nodeG);
            });
        }
        _mapData() {
            const data = {};
            this.data().forEach(datum => {
                data[this._conf.keyAccessor(datum)] = datum;
            });
            return data;
        }
        _getNodeG(point, data) {
            const bubbleNodeClass = `${BUBBLE_NODE_CLASS} ${nameToId(point.name)}`;
            let nodeG = this._g.select(`g.${nameToId(point.name)}`);
            if (nodeG.empty()) {
                nodeG = this._g
                    .append('g')
                    .attr('class', bubbleNodeClass)
                    .attr('transform', `translate(${point.x},${point.y})`);
            }
            nodeG.datum(data[point.name]);
            return nodeG;
        }
        /**
         * @hidden
         */
        _doRedraw() {
            this._updateBubbles();
            this.fadeDeselectedArea(this.filter());
            return this;
        }
        _updateBubbles() {
            const data = this._mapData();
            this.calculateRadiusDomain();
            this._conf.points.forEach(point => {
                const nodeG = this._getNodeG(point, data);
                const circle = nodeG.select(`circle.${BUBBLE_CLASS}`);
                transition(circle, this._conf.transitionDuration, this._conf.transitionDelay)
                    .attr('r', d => this.bubbleR(d))
                    .attr('fill', (d, i) => this._colorHelper.getColor(d, i));
                this.doUpdateLabels(nodeG);
                this.doUpdateTitles(nodeG);
            });
        }
        /**
         * While creating a new chart, sometimes it may be tricky to find intended coordinates
         * of the bubbles.
         * Calling this method with `true` will enable displaying x/y coordinates on mouse move.
         *
         * It is intended to be used only during development.
         */
        debug(flag = false) {
            if (flag) {
                let debugG = this.select(`g.${constants.DEBUG_GROUP_CLASS}`);
                if (debugG.empty()) {
                    debugG = this.svg().append('g').attr('class', constants.DEBUG_GROUP_CLASS);
                }
                const debugText = debugG.append('text').attr('x', 10).attr('y', 20);
                debugG
                    .append('rect')
                    .attr('width', this.width())
                    .attr('height', this.height())
                    .on('mousemove', (evt, d) => {
                    const position = d3Selection.pointer(evt, debugG.node());
                    const msg = `${position[0]}, ${position[1]}`;
                    debugText.text(msg);
                });
            }
            else {
                this.selectAll('.debug').remove();
            }
            return this;
        }
    }

    class BubbleOverlay extends BubbleMixinExt(ColorMixinExt(BaseMixinExt(BubbleOverlay$1))) {
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
        }
        /**
         * **mandatory**
         *
         * Set up a data point on the overlay. The name of a data point should match a specific 'key' among
         * data groups generated using keyAccessor.  If a match is found (point name <-> data group key)
         * then a bubble will be generated at the position specified by the function. x and y
         * value specified here are relative to the underlying svg.
         */
        point(name, x, y) {
            this._conf.points.push({ name, x, y });
            return this;
        }
    }
    const bubbleOverlay = (parent, chartGroup) => new BubbleOverlay(parent, chartGroup);

    const GROUP_CSS_CLASS = 'dc-cbox-group';
    const ITEM_CSS_CLASS$1 = 'dc-cbox-item';
    /**
     * The CboxMenu is a simple widget designed to filter a dimension by
     * selecting option(s) from a set of HTML `<input />` elements. The menu can be
     * made into a set of radio buttons (single select) or checkboxes (multiple).
     */
    class CboxMenu$1 extends BaseMixin$1 {
        /**
         * Create a Cbox Menu.
         *
         * TODO update example
         *
         * @example
         * ```
         * // create a cboxMenu under #cbox-container using the default global chart group
         * const cbox = new CboxMenu('#cbox-container')
         *                .dimension(states)
         *                .group(stateGroup);
         * // the option text can be set via the title() function
         * // by default the option text is '`key`: `value`'
         * cbox.title(function (d){
         *     return 'STATE: ' + d.key;
         * })
         * ```
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this.configure({
                multiple: false,
                promptText: 'Select all',
                promptValue: null,
                filterDisplayed: d => d._value > 0,
                order: (a, b) => d3Array.ascending(this._conf.keyAccessor(a), this._conf.keyAccessor(b)),
            });
            this._cbox = undefined;
            this._uniqueId = uniqueId();
        }
        configure(conf) {
            super.configure(conf);
            return this;
        }
        conf() {
            return this._conf;
        }
        data() {
            return super.data().filter(this._conf.filterDisplayed);
        }
        _doRender() {
            return this._doRedraw();
        }
        _doRedraw() {
            this.select('ul').remove();
            this._cbox = this.root().append('ul').classed(GROUP_CSS_CLASS, true);
            this._renderOptions();
            if (this.hasFilter() && this._conf.multiple) {
                this._cbox
                    .selectAll('input')
                    // adding `false` avoids failing test cases in phantomjs
                    .property('checked', d => (d && this.filters().indexOf(String(this._conf.keyAccessor(d))) >= 0) ||
                    false);
            }
            else if (this.hasFilter()) {
                this._cbox.selectAll('input').property('checked', d => {
                    if (!d) {
                        return false;
                    }
                    return this._conf.keyAccessor(d) === this.filter();
                });
            }
            return this;
        }
        _renderOptions() {
            const inputType = this._conf.multiple ? 'checkbox' : 'radio';
            let options = this._cbox
                .selectAll(`li.${ITEM_CSS_CLASS$1}`)
                .data(this.data(), d => this._conf.keyAccessor(d));
            options.exit().remove();
            options = options.enter().append('li').classed(ITEM_CSS_CLASS$1, true).merge(options);
            options
                .append('input')
                .attr('type', inputType)
                .attr('value', d => this._conf.keyAccessor(d))
                .attr('name', `domain_${this._uniqueId}`)
                .attr('id', (d, i) => `input_${this._uniqueId}_${i}`);
            options
                .append('label')
                .attr('for', (d, i) => `input_${this._uniqueId}_${i}`)
                .text(this._conf.title);
            const chart = this;
            // 'all' option
            if (this._conf.multiple) {
                this._cbox
                    .append('li')
                    .append('input')
                    .attr('type', 'reset')
                    .text(this._conf.promptText)
                    .on('click', function (evt, d) {
                    return chart._onChange(d, evt, this);
                });
            }
            else {
                const li = this._cbox.append('li');
                li.append('input')
                    .attr('type', inputType)
                    .attr('value', this._conf.promptValue)
                    .attr('name', `domain_${this._uniqueId}`)
                    .attr('id', (d, i) => `input_${this._uniqueId}_all`)
                    .property('checked', true);
                li.append('label')
                    .attr('for', (d, i) => `input_${this._uniqueId}_all`)
                    .text(this._conf.promptText);
            }
            this._cbox.selectAll(`li.${ITEM_CSS_CLASS$1}`).sort(this._conf.order);
            this._cbox.on('change', function (evt, d) {
                return chart._onChange(d, evt, this);
            });
            return options;
        }
        _onChange(d, evt, element) {
            let values;
            const target = d3Selection.select(evt.target);
            let options;
            if (!target.datum()) {
                values = this._conf.promptValue || null;
            }
            else {
                options = d3Selection.select(element)
                    .selectAll('input')
                    .filter(function (o) {
                    if (o) {
                        return this.checked;
                    }
                });
                values = options.nodes().map(option => option.value);
                // check if only prompt option is selected
                if (!this._conf.multiple && values.length === 1) {
                    values = values[0];
                }
            }
            this.onChange(values);
        }
        // TODO: come back for better typing, probably generics
        onChange(val) {
            if (val && this._conf.multiple) {
                this.replaceFilter([val]);
            }
            else if (val) {
                this.replaceFilter(val);
            }
            else {
                this.filterAll();
            }
            events.trigger(() => {
                this.redrawGroup();
            });
        }
    }

    class CboxMenu extends BaseMixinExt(CboxMenu$1) {
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
        }
        order(order) {
            if (!arguments.length) {
                return this._conf.order;
            }
            this.configure({ order: order });
            return this;
        }
        promptText(promptText) {
            if (!arguments.length) {
                return this._conf.promptText;
            }
            this.configure({ promptText: promptText });
            return this;
        }
        filterDisplayed(filterDisplayed) {
            if (!arguments.length) {
                return this._conf.filterDisplayed;
            }
            this.configure({ filterDisplayed: filterDisplayed });
            return this;
        }
        multiple(multiple) {
            if (!arguments.length) {
                return this._conf.multiple;
            }
            this.configure({ multiple: multiple });
            return this;
        }
        promptValue(promptValue) {
            if (!arguments.length) {
                return this._conf.promptValue;
            }
            this.configure({ promptValue: promptValue });
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
     */
    class CompositeChart$1 extends CoordinateGridMixin$1 {
        /**
         * Create a Composite Chart.
         *
         * TODO update example
         * @example
         * ```
         * // create a composite chart under #chart-container1 element using the default global chart group
         * var compositeChart1 = new CompositeChart('#chart-container1');
         * // create a composite chart under #chart-container2 element using chart group A
         * var compositeChart2 = new CompositeChart('#chart-container2', 'chartGroupA');
         * ```
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this.configure({
                transitionDuration: 500,
                transitionDelay: 0,
                shareColors: false,
                shareTitle: true,
            });
            this._children = [];
            this._childOptions = {};
            this._alignYAxes = false; // TODO: the setter calls rescale, check in detail later
            this._rightYAxis = d3Axis.axisRight(undefined);
            this._rightYAxisLabel = undefined;
            this._rightYAxisLabelPadding = DEFAULT_RIGHT_Y_AXIS_LABEL_PADDING;
            this._rightY = undefined;
            this._rightAxisGridLines = false;
            this._mandatoryAttributes([]);
            this.on('filtered.dcjs-composite-chart', chart => {
                // Propagate the filters onto the children
                // Notice that on children the call is .replaceFilter and not .filter
                //   the reason is that _chart.filter() returns the entire current set of filters not just the last added one
                this._children.forEach(child => {
                    // Go defensive - the shareFilter option may have already set the correct filters
                    if (child.filter() !== this.filter()) {
                        child.replaceFilter(this.filter());
                    }
                });
            });
        }
        configure(conf) {
            super.configure(conf);
            return this;
        }
        conf() {
            return this._conf;
        }
        _generateG() {
            const g = super._generateG();
            for (let i = 0; i < this._children.length; ++i) {
                const child = this._children[i];
                this._generateChildG(child, i);
                if (!child.dataProvider().conf().dimension) {
                    child.dataProvider().configure({ dimension: this.dataProvider().conf().dimension });
                }
                if (!child.dataProvider().conf().group) {
                    child.dataProvider().configure({ group: this.dataProvider().conf().group });
                }
                child
                    .dataProvider()
                    .configure({ shareFilters: this.dataProvider().conf().shareFilters });
                child.configure({
                    xUnits: this._conf.xUnits,
                    transitionDuration: this._conf.transitionDuration,
                    transitionDelay: this._conf.transitionDelay,
                    renderTitle: this._conf.renderTitle,
                    elasticX: this._conf.elasticX,
                });
                child.chartGroup(this.chartGroup());
                child.svg(this.svg());
                child.configure({
                    parentBrushOn: this._conf.brushOn,
                    brushOn: false,
                });
            }
            return g;
        }
        rescale() {
            super.rescale();
            this._children.forEach(child => {
                child.rescale();
            });
            return this;
        }
        resizing(resizing) {
            if (!arguments.length) {
                return super.resizing();
            }
            super.resizing(resizing);
            this._children.forEach(child => {
                child.resizing(resizing);
            });
            return this;
        }
        _prepareYAxis() {
            const left = this._leftYAxisChildren().length !== 0;
            const right = this._rightYAxisChildren().length !== 0;
            const ranges = this._calculateYAxisRanges(left, right);
            if (left) {
                this._prepareLeftYAxis(ranges);
            }
            if (right) {
                this._prepareRightYAxis(ranges);
            }
            if (this._leftYAxisChildren().length > 0 && !this._rightAxisGridLines) {
                this._renderHorizontalGridLinesForAxis(this.g(), this.y(), this.yAxis());
            }
            else if (this._rightYAxisChildren().length > 0) {
                this._renderHorizontalGridLinesForAxis(this.g(), this._rightY, this._rightYAxis);
            }
        }
        _renderYAxis() {
            if (this._leftYAxisChildren().length !== 0) {
                this._renderYAxisAt('y', this.yAxis(), this.margins().left);
                this._renderYAxisLabel('y', this.yAxisLabel(), -90);
            }
            if (this._rightYAxisChildren().length !== 0) {
                this._renderYAxisAt('yr', this.rightYAxis(), this.width() - this.margins().right);
                this._renderYAxisLabel('yr', this.rightYAxisLabel(), 90, this.width() - this._rightYAxisLabelPadding);
            }
        }
        _calculateYAxisRanges(left, right) {
            let lyAxisMin;
            let lyAxisMax;
            let ryAxisMin;
            let ryAxisMax;
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
            return ranges || { lyAxisMin, lyAxisMax, ryAxisMin, ryAxisMax };
        }
        _alignYAxisRanges(lyAxisMin, lyAxisMax, ryAxisMin, ryAxisMax) {
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
                ryAxisMax: Math.max(ryAxisMax, lyAxisMax * extentRatio),
            };
        }
        _prepareRightYAxis(ranges) {
            const needDomain = this.rightY() === undefined || this._conf.elasticY;
            const needRange = needDomain || this.resizing();
            if (this.rightY() === undefined) {
                this.rightY(d3Scale.scaleLinear());
            }
            if (needDomain) {
                this.rightY().domain([ranges.ryAxisMin, ranges.ryAxisMax]);
            }
            if (needRange) {
                this.rightY().rangeRound([this._yAxisHeight(), 0]);
            }
            this.rightY().range([this._yAxisHeight(), 0]);
            this.rightYAxis(this.rightYAxis().scale(this.rightY()));
            // In D3v4 create a RightAxis
            // _chart.rightYAxis().orient('right');
        }
        _prepareLeftYAxis(ranges) {
            const needDomain = this.y() === undefined || this._conf.elasticY;
            const needRange = needDomain || this.resizing();
            if (this.y() === undefined) {
                this.y(d3Scale.scaleLinear());
            }
            if (needDomain) {
                this.y().domain([ranges.lyAxisMin, ranges.lyAxisMax]);
            }
            if (needRange) {
                this.y().rangeRound([this._yAxisHeight(), 0]);
            }
            this.y().range([this._yAxisHeight(), 0]);
            this.yAxis(this.yAxis().scale(this.y()));
            // In D3v4 create a LeftAxis
            // _chart.yAxis().orient('left');
        }
        _generateChildG(child, i) {
            child._generateG(this.g());
            child.g().attr('class', `${SUB_CHART_CLASS} _${i}`);
        }
        plotData() {
            for (let i = 0; i < this._children.length; ++i) {
                const child = this._children[i];
                if (!child.g()) {
                    this._generateChildG(child, i);
                }
                if (this._conf.shareColors) {
                    child.colorHelper(this.colorHelper().share(child.conf().colorAccessor));
                }
                child.x(this.x());
                child.xAxis(this.xAxis());
                if (child.conf().useRightYAxis) {
                    child.y(this.rightY());
                    child.yAxis(this.rightYAxis());
                }
                else {
                    child.y(this.y());
                    child.yAxis(this.yAxis());
                }
                child.plotData();
                child._activateRenderlets();
            }
        }
        useRightAxisGridLines(useRightAxisGridLines) {
            if (!arguments) {
                return this._rightAxisGridLines;
            }
            this._rightAxisGridLines = useRightAxisGridLines;
            return this;
        }
        childOptions(childOptions) {
            if (!arguments.length) {
                return this._childOptions;
            }
            this._childOptions = childOptions;
            this._children.forEach(child => {
                child.options(this._childOptions);
            });
            return this;
        }
        fadeDeselectedArea(brushSelection) {
            if (this._conf.brushOn) {
                for (let i = 0; i < this._children.length; ++i) {
                    const child = this._children[i];
                    child.fadeDeselectedArea(brushSelection);
                }
            }
        }
        rightYAxisLabel(rightYAxisLabel, padding) {
            if (!arguments.length) {
                return this._rightYAxisLabel;
            }
            this._rightYAxisLabel = rightYAxisLabel;
            this.margins().right -= this._rightYAxisLabelPadding;
            this._rightYAxisLabelPadding =
                padding === undefined ? DEFAULT_RIGHT_Y_AXIS_LABEL_PADDING : padding;
            this.margins().right += this._rightYAxisLabelPadding;
            return this;
        }
        /**
         * Combine the given charts into one single composite coordinate grid chart.
         *
         * TODO update example
         *
         * @example
         * ```
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
         * ```
         */
        compose(subChartArray) {
            this._children = subChartArray;
            this._children.forEach(child => {
                child.height = () => this.height();
                child.width = () => this.width();
                // @ts-ignore
                child.margins = () => this.margins();
                if (this._conf.shareTitle) {
                    child.configure({
                        title: this._conf.title,
                    });
                }
                child.options(this._childOptions);
            });
            this.rescale();
            return this;
        }
        withoutTransitions(callback) {
            const oldVals = this._children.map(child => child.conf().transitionDuration);
            this._children.forEach(child => child.configure({ transitionDuration: 0 }));
            super.withoutTransitions(callback);
            this._children.forEach((child, i) => child.configure({ transitionDuration: oldVals[i] }));
        }
        /**
         * Returns the child charts which are composed into the composite chart.
         */
        children() {
            return this._children;
        }
        rightY(yScale) {
            if (!arguments.length) {
                return this._rightY;
            }
            this._rightY = yScale;
            this.rescale();
            return this;
        }
        alignYAxes(alignYAxes) {
            if (!arguments.length) {
                return this._alignYAxes;
            }
            this._alignYAxes = alignYAxes;
            this.rescale();
            return this;
        }
        _leftYAxisChildren() {
            return this._children.filter(child => !child.conf().useRightYAxis);
        }
        _rightYAxisChildren() {
            return this._children.filter(child => child.conf().useRightYAxis);
        }
        // TODO: revisit all min/max functions after making charts to use Generics
        _getYAxisMin(charts) {
            return charts.map(c => c.yAxisMin());
        }
        _yAxisMin() {
            return d3Array.min(this._getYAxisMin(this._leftYAxisChildren()));
        }
        _rightYAxisMin() {
            return d3Array.min(this._getYAxisMin(this._rightYAxisChildren()));
        }
        _getYAxisMax(charts) {
            return charts.map(c => c.yAxisMax());
        }
        _yAxisMax() {
            return add(d3Array.max(this._getYAxisMax(this._leftYAxisChildren())), this._conf.yAxisPadding);
        }
        _rightYAxisMax() {
            return add(d3Array.max(this._getYAxisMax(this._rightYAxisChildren())), this._conf.yAxisPadding);
        }
        _getAllXAxisMinFromChildCharts() {
            return this._children.map(c => c.xAxisMin());
        }
        xAxisMin() {
            return subtract(d3Array.min(this._getAllXAxisMinFromChildCharts()), this._conf.xAxisPadding, this._conf.xAxisPaddingUnit);
        }
        _getAllXAxisMaxFromChildCharts() {
            return this._children.map(c => c.xAxisMax());
        }
        xAxisMax() {
            return add(d3Array.max(this._getAllXAxisMaxFromChildCharts()), this._conf.xAxisPadding, this._conf.xAxisPaddingUnit);
        }
        legendables() {
            return this._children.reduce((items, child) => {
                if (this._conf.shareColors) {
                    child.colorHelper(this.colorHelper().share(child.conf().colorAccessor));
                }
                items.push.apply(items, child.legendables());
                return items;
            }, []);
        }
        legendHighlight(d) {
            for (let j = 0; j < this._children.length; ++j) {
                const child = this._children[j];
                child.legendHighlight(d);
            }
        }
        legendReset(d) {
            for (let j = 0; j < this._children.length; ++j) {
                const child = this._children[j];
                child.legendReset(d);
            }
        }
        legendToggle() {
            console.log('composite should not be getting legendToggle itself');
        }
        rightYAxis(rightYAxis) {
            if (!arguments.length) {
                return this._rightYAxis;
            }
            this._rightYAxis = rightYAxis;
            return this;
        }
        yAxisMin() {
            throw new Error('Not supported for this chart type');
        }
        yAxisMax() {
            throw new Error('Not supported for this chart type');
        }
    }

    function CompositeChartExt(Base) {
        return class extends Base {
            constructor(...args) {
                super(...args);
            }
            shareColors(shareColors) {
                if (!arguments.length) {
                    return this._conf.shareColors;
                }
                this.configure({ shareColors: shareColors });
                return this;
            }
            shareTitle(shareTitle) {
                if (!arguments.length) {
                    return this._conf.shareTitle;
                }
                this.configure({ shareTitle: shareTitle });
                return this;
            }
        };
    }
    const CompositeChart = CompositeChartExt(CoordinateGridMixinExt(ColorMixinExt(MarginMixinExt(BaseMixinExt(CompositeChart$1)))));
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
     * - {@link http://dc-js.github.com/dc.js/ | Nasdaq 100 Index}
     */
    class DataCount$1 extends BaseMixin$1 {
        /**
         * Create a Data Count widget.
         *
         * TODO update example
         * @example
         * ```
         * var ndx = crossfilter(data);
         * var all = ndx.groupAll();
         *
         * new DataCount('.dc-data-count')
         *     .crossfilter(ndx)
         *     .groupAll(all);
         * ```
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this.configure({
                formatNumber: d3Format.format(',d'),
                html: { some: '', all: '' },
            });
            this._crossfilter = null;
            this._groupAll = null;
            this._mandatoryAttributes(['crossfilter', 'groupAll']);
        }
        configure(conf) {
            super.configure(conf);
            return this;
        }
        conf() {
            return this._conf;
        }
        _doRender() {
            const tot = this.crossfilter().size();
            const val = this.groupAll().value();
            const all = this._conf.formatNumber(tot);
            const selected = this._conf.formatNumber(val);
            if (tot === val && this._conf.html.all !== '') {
                this.root().html(this._conf.html.all.replace('%total-count', all).replace('%filter-count', selected));
            }
            else if (this._conf.html.some !== '') {
                this.root().html(this._conf.html.some.replace('%total-count', all).replace('%filter-count', selected));
            }
            else {
                this.selectAll('.total-count').text(all);
                this.selectAll('.filter-count').text(selected);
            }
            return this;
        }
        _doRedraw() {
            return this._doRender();
        }
        crossfilter(cf) {
            if (!arguments.length) {
                return this._crossfilter;
            }
            this._crossfilter = cf;
            return this;
        }
        groupAll(groupAll) {
            if (!arguments.length) {
                return this._groupAll;
            }
            this._groupAll = groupAll;
            return this;
        }
    }

    class DataCount extends BaseMixinExt(DataCount$1) {
        dimension(cf) {
            logger.warnOnce('consider using dataCount.crossfilter instead of dataCount.dimension for clarity');
            if (!arguments.length) {
                return this.crossfilter();
            }
            return this.crossfilter(cf);
        }
        group(groupAll) {
            logger.warnOnce('consider using dataCount.groupAll instead of dataCount.group for clarity');
            if (!arguments.length) {
                return this.groupAll();
            }
            return this.groupAll(groupAll);
        }
        html(options) {
            if (!arguments.length) {
                return this._conf.html;
            }
            if (options.all) {
                this._conf.html.all = options.all;
            }
            if (options.some) {
                this._conf.html.some = options.some;
            }
            return this;
        }
        formatNumber(formatter) {
            if (!arguments.length) {
                return this._conf.formatNumber;
            }
            this.configure({ formatNumber: formatter });
            return this;
        }
    }
    const dataCount = (parent, chartGroup) => new DataCount(parent, chartGroup);

    const LABEL_CSS_CLASS$1 = 'dc-grid-label';
    const ITEM_CSS_CLASS = 'dc-grid-item';
    const SECTION_CSS_CLASS$1 = 'dc-grid-section dc-grid-group';
    const GRID_CSS_CLASS = 'dc-grid-top';
    /**
     * Data grid is a simple widget designed to list the filtered records, providing
     * a simple way to define how the items are displayed.
     *
     * Examples:
     * - {@link https://dc-js.github.io/dc.js/ep/ | List of members of the european parliament}
     */
    class DataGrid$1 extends BaseMixin$1 {
        /**
         * Create a Data Grid.
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this.configure({
                section: null,
                size: 999,
                html: d => `you need to provide an html() handling param:  ${JSON.stringify(d)}`,
                sortBy: d => d,
                order: d3Array.ascending,
                beginSlice: 0,
                endSlice: undefined,
                htmlSection: d => `<div class='${SECTION_CSS_CLASS$1}'><h1 class='${LABEL_CSS_CLASS$1}'>${this._conf.keyAccessor(d)}</h1></div>`,
            });
            this._mandatoryAttributes(['dimension', 'section']);
        }
        configure(conf) {
            super.configure(conf);
            return this;
        }
        conf() {
            return this._conf;
        }
        _doRender() {
            this.selectAll(`div.${GRID_CSS_CLASS}`).remove();
            this._renderItems(this._renderSections());
            return this;
        }
        _renderSections() {
            const sections = this.root()
                .selectAll(`div.${GRID_CSS_CLASS}`)
                .data(this._nestEntries(), d => this._conf.keyAccessor(d));
            const itemSection = sections
                .enter()
                .append('div')
                .attr('class', GRID_CSS_CLASS);
            if (this._conf.htmlSection) {
                itemSection.html(d => this._conf.htmlSection(d));
            }
            sections.exit().remove();
            return itemSection;
        }
        _nestEntries() {
            // TODO: consider creating special DataProvider
            let entries = this.dataProvider().conf().dimension.top(this._conf.size);
            entries = entries
                .sort((a, b) => this._conf.order(this._conf.sortBy(a), this._conf.sortBy(b)))
                .slice(this._conf.beginSlice, this._conf.endSlice);
            return d3Array.groups(entries, this._conf.section)
                .sort(this._conf.order)
                .map(e => ({
                // The code expects key and values as attributes
                key: `${e[0]}`,
                values: e[1],
            }));
        }
        _renderItems(sections) {
            let items = sections
                .order()
                .selectAll(`div.${ITEM_CSS_CLASS}`)
                .data(d => d.values);
            items.exit().remove();
            items = items
                .enter()
                .append('div')
                .attr('class', ITEM_CSS_CLASS)
                .html(d => this._conf.html(d))
                .merge(items);
            return items;
        }
        _doRedraw() {
            return this._doRender();
        }
    }

    // @ts-ignore, remove after group method is moved here
    class DataGrid extends BaseMixinExt(DataGrid$1) {
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
        }
        section(section) {
            if (!arguments.length) {
                return this._conf.section;
            }
            this.configure({ section: section });
            return this;
        }
        // @ts-ignore, signature is different in BaseMixin
        group(section) {
            logger.warnOnce('consider using dataGrid.section instead of dataGrid.group for clarity');
            if (!arguments.length) {
                return this.section();
            }
            return this.section(section);
        }
        beginSlice(beginSlice) {
            if (!arguments.length) {
                return this._conf.beginSlice;
            }
            this.configure({ beginSlice: beginSlice });
            return this;
        }
        endSlice(endSlice) {
            if (!arguments.length) {
                return this._conf.endSlice;
            }
            this.configure({ endSlice: endSlice });
            return this;
        }
        size(size) {
            if (!arguments.length) {
                return this._conf.size;
            }
            this.configure({ size: size });
            return this;
        }
        html(html) {
            if (!arguments.length) {
                return this._conf.html;
            }
            this.configure({ html: html });
            return this;
        }
        htmlSection(htmlSection) {
            if (!arguments.length) {
                return this._conf.htmlSection;
            }
            this.configure({ htmlSection: htmlSection });
            return this;
        }
        htmlGroup(htmlSection) {
            logger.warnOnce('consider using dataGrid.htmlSection instead of dataGrid.htmlGroup for clarity');
            if (!arguments.length) {
                return this.htmlSection();
            }
            return this.htmlSection(htmlSection);
        }
        sortBy(sortByFunction) {
            if (!arguments.length) {
                return this._conf.sortBy;
            }
            this.configure({ sortBy: sortByFunction });
            return this;
        }
        order(order) {
            if (!arguments.length) {
                return this._conf.order;
            }
            this.configure({ order: order });
            return this;
        }
    }
    const dataGrid = (parent, chartGroup) => new DataGrid(parent, chartGroup);

    const LABEL_CSS_CLASS = 'dc-table-label';
    const ROW_CSS_CLASS = 'dc-table-row';
    const COLUMN_CSS_CLASS = 'dc-table-column';
    const SECTION_CSS_CLASS = 'dc-table-section dc-table-group';
    const HEAD_CSS_CLASS = 'dc-table-head';
    /**
     * The data table is a simple widget designed to list crossfilter focused data set (rows being
     * filtered) in a good old tabular fashion.
     *
     * An interesting feature of the data table is that you can pass a crossfilter group to the
     * `dimension`, if you want to show aggregated data instead of raw data rows. This requires no
     * special code as long as you specify the {@link IDataTableConf.order | order} as `d3.descending`,
     * since the data table will use `dimension.top()` to fetch the data in that case, and the method is
     * equally supported on the crossfilter group as the crossfilter dimension.
     *
     * If you want to display aggregated data in ascending order, you will need to wrap the group
     * in a [fake dimension](https://github.com/dc-js/dc.js/wiki/FAQ#fake-dimensions) to support the
     * `.bottom()` method. See the example linked below for more details.
     *
     * Examples:
     * - {@link http://dc-js.github.com/dc.js/ | Nasdaq 100 Index}
     * - {@link http://dc-js.github.io/dc.js/examples/table-on-aggregated-data.html | dataTable on a crossfilter group}
     * ({@link https://github.com/dc-js/dc.js/blob/master/web-src/examples/table-on-aggregated-data.html | source})
     *
     */
    class DataTable$1 extends BaseMixin$1 {
        /**
         * Create a Data Table.
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this.configure({
                size: 25,
                columns: [],
                sortBy: d => d,
                order: d3Array.ascending,
                beginSlice: 0,
                endSlice: undefined,
                showSections: true,
                section: () => '', // all in one section
            });
            this._mandatoryAttributes(['dimension']);
        }
        configure(conf) {
            super.configure(conf);
            return this;
        }
        conf() {
            return this._conf;
        }
        _doRender() {
            this.selectAll('tbody').remove();
            this._renderRows(this._renderSections());
            return this;
        }
        _doColumnValueFormat(v, d) {
            if (typeof v === 'function') {
                // v is function
                return v(d);
            }
            if (typeof v === 'string') {
                // v is field name string
                return d[v];
            }
            // v is Object, use fn (element 2)
            return v.format(d);
        }
        _doColumnHeaderFormat(d) {
            // if 'function', convert to string representation
            // show a string capitalized
            // if an object then display its label string as-is.
            if (typeof d === 'function') {
                return this._doColumnHeaderFnToString(d);
            }
            if (typeof d === 'string') {
                return this._doColumnHeaderCapitalize(d);
            }
            return String(d.label);
        }
        _doColumnHeaderCapitalize(s) {
            // capitalize
            return s.charAt(0).toUpperCase() + s.slice(1);
        }
        // TODO: This looks really peculiar, investigate, code is quite fragile
        _doColumnHeaderFnToString(f) {
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
        _renderSections() {
            // The 'original' example uses all 'functions'.
            // If all 'functions' are used, then don't remove/add a header, and leave
            // the html alone. This preserves the functionality of earlier releases.
            // A 2nd option is a string representing a field in the data.
            // A third option is to supply an Object such as an array of 'information', and
            // supply your own _doColumnHeaderFormat and _doColumnValueFormat functions to
            // create what you need.
            let bAllFunctions = true;
            this._conf.columns.forEach(f => {
                bAllFunctions = bAllFunctions && typeof f === 'function';
            });
            if (!bAllFunctions) {
                // ensure one thead
                // prettier-ignore
                let thead = this.selectAll('thead').data([0]);
                thead.exit().remove();
                thead = thead.enter().append('thead').merge(thead);
                // with one tr
                let headrow = thead.selectAll('tr').data([0]);
                headrow.exit().remove();
                headrow = headrow.enter().append('tr').merge(headrow);
                // with a th for each column
                const headcols = headrow
                    .selectAll('th')
                    .data(this._conf.columns);
                headcols.exit().remove();
                headcols
                    .enter()
                    .append('th')
                    .merge(headcols)
                    .attr('class', HEAD_CSS_CLASS)
                    .html(d => this._doColumnHeaderFormat(d));
            }
            const sections = this.root()
                .selectAll('tbody')
                .data(this._nestEntries(), d => this._conf.keyAccessor(d));
            const rowSection = sections.enter().append('tbody');
            if (this._conf.showSections === true) {
                rowSection
                    .append('tr')
                    .attr('class', SECTION_CSS_CLASS)
                    .append('td')
                    .attr('class', LABEL_CSS_CLASS)
                    .attr('colspan', this._conf.columns.length)
                    .html(d => this._conf.keyAccessor(d));
            }
            sections.exit().remove();
            return rowSection;
        }
        _nestEntries() {
            // TODO: consider creating special DataProvider
            const dimension = this.dataProvider().conf().dimension;
            let entries;
            if (this._conf.order === d3Array.ascending) {
                entries = dimension.bottom(this._conf.size);
            }
            else {
                entries = dimension.top(this._conf.size);
            }
            entries = entries
                .sort((a, b) => this._conf.order(this._conf.sortBy(a), this._conf.sortBy(b)))
                .slice(this._conf.beginSlice, this._conf.endSlice);
            return d3Array.groups(entries, this._conf.section)
                .sort(this._conf.order)
                .map(e => ({
                // The code expects key and values as attributes
                key: `${e[0]}`,
                values: e[1],
            }));
        }
        _renderRows(sections) {
            const rows = sections
                .order()
                .selectAll(`tr.${ROW_CSS_CLASS}`)
                .data(d => d.values);
            const rowEnter = rows.enter().append('tr').attr('class', ROW_CSS_CLASS);
            this._conf.columns.forEach((v, i) => {
                rowEnter
                    .append('td')
                    .attr('class', `${COLUMN_CSS_CLASS} _${i}`)
                    .html(d => this._doColumnValueFormat(v, d));
            });
            rows.exit().remove();
            return rows;
        }
        _doRedraw() {
            return this._doRender();
        }
    }

    // @ts-ignore, remove after group method is moved here
    class DataTable extends BaseMixinExt(DataTable$1) {
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
        }
        section(section) {
            if (!arguments.length) {
                return this._conf.section;
            }
            this.configure({ section: section });
            return this;
        }
        // @ts-ignore, signature is different in BaseMixin
        group(section) {
            logger.warnOnce('consider using dataTable.section instead of dataTable.group for clarity');
            if (!arguments.length) {
                return this.section();
            }
            return this.section(section);
        }
        size(size) {
            if (!arguments.length) {
                return this._conf.size;
            }
            this.configure({ size: size });
            return this;
        }
        beginSlice(beginSlice) {
            if (!arguments.length) {
                return this._conf.beginSlice;
            }
            this.configure({ beginSlice: beginSlice });
            return this;
        }
        endSlice(endSlice) {
            if (!arguments.length) {
                return this._conf.endSlice;
            }
            this.configure({ endSlice: endSlice });
            return this;
        }
        columns(columns) {
            if (!arguments.length) {
                return this._conf.columns;
            }
            this.configure({ columns: columns });
            return this;
        }
        sortBy(sortBy) {
            if (!arguments.length) {
                return this._conf.sortBy;
            }
            this.configure({ sortBy: sortBy });
            return this;
        }
        order(order) {
            if (!arguments.length) {
                return this._conf.order;
            }
            this.configure({ order: order });
            return this;
        }
        showSections(showSections) {
            if (!arguments.length) {
                return this._conf.showSections;
            }
            this.configure({ showSections: showSections });
            return this;
        }
        showGroups(showSections) {
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
     * {@link http://bl.ocks.org/4060606 | the great d3 choropleth example}.
     *
     * Examples:
     * - {@link http://dc-js.github.com/dc.js/vc/index.html | US Venture Capital Landscape 2011}
     */
    class GeoChoroplethChart$1 extends ColorMixin$1(BaseMixin$1) {
        /**
         * Create a Geo Choropleth Chart.
         *
         * TODO update example
         *
         * @example
         * ```
         * // create a choropleth chart under '#us-chart' element using the default global chart group
         * const chart1 = new GeoChoroplethChart('#us-chart');
         * // create a choropleth chart under '#us-chart2' element using chart group A
         * const chart2 = new CompositeChart('#us-chart2', 'chartGroupA');
         * ```
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this.configure({
                colorAccessor: d => d || 0,
                geoJsons: [],
            });
            this._geoPath = d3Geo.geoPath();
            this._projectionFlag = undefined;
            this._projection = undefined;
        }
        configure(conf) {
            super.configure(conf);
            return this;
        }
        conf() {
            return this._conf;
        }
        _doRender() {
            this.resetSvg();
            for (let layerIndex = 0; layerIndex < this._conf.geoJsons.length; ++layerIndex) {
                const states = this.svg()
                    .append('g')
                    .attr('class', `layer${layerIndex}`);
                let regionG = states
                    .selectAll(`g.${this._geoJson(layerIndex).name}`)
                    .data(this._geoJson(layerIndex).data);
                regionG = regionG
                    .enter()
                    .append('g')
                    .attr('class', this._geoJson(layerIndex).name)
                    .merge(regionG);
                regionG.append('path').attr('fill', 'white').attr('d', this._getGeoPath());
                regionG.append('title');
                this._plotData(layerIndex);
            }
            this._projectionFlag = false;
            return this;
        }
        _plotData(layerIndex) {
            const data = this._generateLayeredData();
            if (this._isDataLayer(layerIndex)) {
                const regionG = this._renderRegionG(layerIndex);
                this._renderPaths(regionG, layerIndex, data);
                this._renderTitles(regionG, layerIndex, data);
            }
        }
        _generateLayeredData() {
            const data = {};
            const groupAll = this.data();
            for (let i = 0; i < groupAll.length; ++i) {
                data[this._conf.keyAccessor(groupAll[i])] = groupAll[i]._value;
            }
            return data;
        }
        _isDataLayer(layerIndex) {
            return !!this._geoJson(layerIndex).keyAccessor;
        }
        _renderRegionG(layerIndex) {
            const regionG = this.svg()
                .selectAll(this._layerSelector(layerIndex))
                .classed('selected', d => this._isSelected(layerIndex, d))
                .classed('deselected', d => this._isDeselected(layerIndex, d))
                .attr('class', d => {
                const layerNameClass = this._geoJson(layerIndex).name;
                const regionClass = nameToId(this._geoJson(layerIndex).keyAccessor(d));
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
        _layerSelector(layerIndex) {
            return `g.layer${layerIndex} g.${this._geoJson(layerIndex).name}`;
        }
        _isSelected(layerIndex, d) {
            return this.hasFilter() && this.hasFilter(this._getKey(layerIndex, d));
        }
        _isDeselected(layerIndex, d) {
            return this.hasFilter() && !this.hasFilter(this._getKey(layerIndex, d));
        }
        _getKey(layerIndex, d) {
            return this._geoJson(layerIndex).keyAccessor(d);
        }
        _geoJson(index) {
            return this._conf.geoJsons[index];
        }
        _renderPaths(regionG, layerIndex, data) {
            const paths = regionG
                .select('path')
                .attr('fill', function () {
                const currentFill = d3Selection.select(this).attr('fill');
                if (currentFill) {
                    return currentFill;
                }
                return 'none';
            })
                .on('click', (evt, d) => this.onClick(d, layerIndex));
            transition(paths, this._conf.transitionDuration, this._conf.transitionDelay).attr('fill', (d, i) => this._colorHelper.getColor(data[this._geoJson(layerIndex).keyAccessor(d)], i));
        }
        onClick(d, layerIndex) {
            const selectedRegion = this._geoJson(layerIndex).keyAccessor(d);
            events.trigger(() => {
                this.filter(selectedRegion);
                this.redrawGroup();
            });
        }
        _renderTitles(regionG, layerIndex, data) {
            if (this._conf.renderTitle) {
                regionG.selectAll('title').text(d => {
                    const key = this._getKey(layerIndex, d);
                    const value = data[key];
                    return this._conf.title({ key, value });
                });
            }
        }
        _doRedraw() {
            for (let layerIndex = 0; layerIndex < this._conf.geoJsons.length; ++layerIndex) {
                this._plotData(layerIndex);
                if (this._projectionFlag) {
                    this.svg()
                        .selectAll(`g.${this._geoJson(layerIndex).name} path`)
                        .attr('d', this._getGeoPath());
                }
            }
            this._projectionFlag = false;
            return this;
        }
        projection(projection) {
            if (!arguments.length) {
                return this._projection;
            }
            this._projection = projection;
            this._projectionFlag = true;
            return this;
        }
        _getGeoPath() {
            if (this._projection === undefined) {
                logger.warn('choropleth projection default of geoAlbers is deprecated,' +
                    ' in next version projection will need to be set explicitly');
                return this._geoPath.projection(d3Geo.geoAlbersUsa());
            }
            return this._geoPath.projection(this._projection);
        }
        /**
         * Returns the {@link https://github.com/d3/d3-geo/blob/master/README.md#paths | d3.geoPath} object used to
         * render the projection and features.  Can be useful for figuring out the bounding box of the
         * feature set and thus a way to calculate scale and translation for the projection.
         * @see {@link https://github.com/d3/d3-geo/blob/master/README.md#paths | d3.geoPath}
         */
        geoPath() {
            return this._geoPath;
        }
    }

    class GeoChoroplethChart extends ColorMixinExt(BaseMixinExt(GeoChoroplethChart$1)) {
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
        }
        /**
         * Returns all GeoJson layers currently registered with this chart. The returned array is a
         * reference to this chart's internal data structure, so any modification to this array will also
         * modify this chart's internal registration.
         */
        geoJsons() {
            return this._conf.geoJsons;
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
         * @param json - a geojson feed
         * @param name - name of the layer
         * @param keyAccessor - accessor function used to extract 'key' from the GeoJson data. The key extracted by
         * this function should match the keys returned by the crossfilter groups.
         */
        overlayGeoJson(json, name, keyAccessor) {
            for (let i = 0; i < this._conf.geoJsons.length; ++i) {
                if (this._conf.geoJsons[i].name === name) {
                    this._conf.geoJsons[i].data = json;
                    this._conf.geoJsons[i].keyAccessor = keyAccessor;
                    return this;
                }
            }
            this._conf.geoJsons.push({ name, data: json, keyAccessor });
            return this;
        }
        /**
         * Remove a GeoJson layer from this chart by name
         */
        removeGeoJson(name) {
            const geoJsons = [];
            for (let i = 0; i < this._conf.geoJsons.length; ++i) {
                const layer = this._conf.geoJsons[i];
                if (layer.name !== name) {
                    geoJsons.push(layer);
                }
            }
            this.configure({ geoJsons: geoJsons });
            return this;
        }
    }
    const geoChoroplethChart = (parent, chartGroup) => new GeoChoroplethChart(parent, chartGroup);

    const DEFAULT_BORDER_RADIUS = 6.75;
    /**
     * A heat map is matrix that represents the values of two dimensions of data using colors.
     */
    class HeatMap$1 extends ColorMixin$1(MarginMixin) {
        /**
         * Create a Heat Map
         *
         * TODO update example
         * @example
         * ```
         * // create a heat map under #chart-container1 element using the default global chart group
         * const heatMap1 = new HeatMap('#chart-container1');
         * // create a heat map under #chart-container2 element using chart group A
         * const heatMap2 = new HeatMap('#chart-container2', 'chartGroupA');
         * ```
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this.configure({
                cols: undefined,
                rows: undefined,
                colOrdering: d3Array.ascending,
                rowOrdering: d3Array.ascending,
                xBorderRadius: DEFAULT_BORDER_RADIUS,
                yBorderRadius: DEFAULT_BORDER_RADIUS,
                colsLabel: d => d,
                rowsLabel: d => d,
                title: this._conf.colorAccessor,
                xAxisOnClick: d => {
                    this._filterAxis(0, d);
                },
                yAxisOnClick: d => {
                    this._filterAxis(1, d);
                },
                boxOnClick: d => {
                    const filter = d.key;
                    events.trigger(() => {
                        this.filter(new TwoDimensionalFilter(filter));
                        this.redrawGroup();
                    });
                },
            });
            this._chartBody = undefined;
            this._colScale = d3Scale.scaleBand();
            this._rowScale = d3Scale.scaleBand();
            this._mandatoryAttributes(['group']);
        }
        configure(conf) {
            super.configure(conf);
            return this;
        }
        conf() {
            return this._conf;
        }
        _filterAxis(axis, value) {
            const cellsOnAxis = this.selectAll('.box-group').filter(d => d.key[axis] === value);
            const unfilteredCellsOnAxis = cellsOnAxis.filter(d => !this.hasFilter(d.key));
            events.trigger(() => {
                const selection = unfilteredCellsOnAxis.empty() ? cellsOnAxis : unfilteredCellsOnAxis;
                const filtersList = selection.data().map(kv => new TwoDimensionalFilter(kv.key));
                this.filter([filtersList]);
                this.redrawGroup();
            });
        }
        filter(filter) {
            const nonstandardFilter = f => {
                logger.warnOnce('heatmap.filter taking a coordinate is deprecated - please pass dc.filters.TwoDimensionalFilter instead');
                return this.filter(new TwoDimensionalFilter(f));
            };
            if (!arguments.length) {
                return super.filter();
            }
            if (filter !== null &&
                filter.filterType !== 'TwoDimensionalFilter' &&
                !(Array.isArray(filter) &&
                    Array.isArray(filter[0]) &&
                    filter[0][0].filterType === 'TwoDimensionalFilter')) {
                return nonstandardFilter(filter);
            }
            return super.filter(filter);
        }
        _doRender() {
            this.resetSvg();
            this._chartBody = this.svg()
                .append('g')
                .attr('class', 'heatmap')
                .attr('transform', `translate(${this.margins().left},${this.margins().top})`);
            return this._doRedraw();
        }
        _doRedraw() {
            const data = this.data();
            let rows = this._conf.rows || data.map(d => d._value);
            let cols = this._conf.cols || data.map(this._conf.keyAccessor);
            if (this._conf.rowOrdering) {
                rows = rows.sort(this._conf.rowOrdering);
            }
            if (this._conf.colOrdering) {
                cols = cols.sort(this._conf.colOrdering);
            }
            rows = this._rowScale.domain(rows);
            cols = this._colScale.domain(cols);
            const rowCount = rows.domain().length;
            const colCount = cols.domain().length;
            const boxWidth = Math.floor(this.effectiveWidth() / colCount);
            const boxHeight = Math.floor(this.effectiveHeight() / rowCount);
            cols.rangeRound([0, this.effectiveWidth()]);
            rows.rangeRound([this.effectiveHeight(), 0]);
            let boxes = this._chartBody
                .selectAll('g.box-group')
                .data(this.data(), (d, i) => `${this._conf.keyAccessor(d, i)}\0${d._value}`);
            boxes.exit().remove();
            const gEnter = boxes.enter().append('g').attr('class', 'box-group');
            gEnter
                .append('rect')
                .attr('class', 'heat-box')
                .attr('fill', 'white')
                .attr('x', (d, i) => cols(this._conf.keyAccessor(d, i)))
                .attr('y', (d, i) => rows(d._value))
                .on('click', (evt, d) => this._conf.boxOnClick(d));
            boxes = gEnter.merge(boxes);
            if (this._conf.renderTitle) {
                gEnter.append('title');
                boxes.select('title').text(this._conf.title);
            }
            transition(boxes.select('rect'), this._conf.transitionDuration, this._conf.transitionDelay)
                .attr('x', (d, i) => cols(this._conf.keyAccessor(d, i)))
                .attr('y', (d, i) => rows(d._value))
                .attr('rx', this._conf.xBorderRadius)
                .attr('ry', this._conf.yBorderRadius)
                .attr('fill', (d, i) => this._colorHelper.getColor(d, i))
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
                .on('click', (evt, d) => this._conf.xAxisOnClick(d))
                .text(this._conf.colsLabel)
                .merge(gColsText);
            transition(gColsText, this._conf.transitionDuration, this._conf.transitionDelay)
                .text(this._conf.colsLabel)
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
                .on('click', (evt, d) => this._conf.yAxisOnClick(d))
                .text(this._conf.rowsLabel)
                .merge(gRowsText);
            transition(gRowsText, this._conf.transitionDuration, this._conf.transitionDelay)
                .text(this._conf.rowsLabel)
                .attr('y', d => rows(d) + boxHeight / 2);
            if (this.hasFilter()) {
                const chart = this;
                this.selectAll('g.box-group').each(function (d) {
                    if (chart._isSelectedNode(d)) {
                        chart.highlightSelected(this);
                    }
                    else {
                        chart.fadeDeselected(this);
                    }
                });
            }
            else {
                const chart = this;
                this.selectAll('g.box-group').each(function () {
                    chart.resetHighlight(this);
                });
            }
            return this;
        }
        _isSelectedNode(d) {
            return this.hasFilter(d.key);
        }
    }

    class HeatMap extends ColorMixinExt(MarginMixinExt(BaseMixinExt(HeatMap$1))) {
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
        }
        colsLabel(labelFunction) {
            if (!arguments.length) {
                return this._conf.colsLabel;
            }
            this.configure({ colsLabel: labelFunction });
            return this;
        }
        rowsLabel(labelFunction) {
            if (!arguments.length) {
                return this._conf.rowsLabel;
            }
            this.configure({ rowsLabel: labelFunction });
            return this;
        }
        rows(rows) {
            if (!arguments.length) {
                return this._conf.rows;
            }
            this.configure({ rows: rows });
            return this;
        }
        rowOrdering(rowOrdering) {
            if (!arguments.length) {
                return this._conf.rowOrdering;
            }
            this.configure({ rowOrdering: rowOrdering });
            return this;
        }
        cols(cols) {
            if (!arguments.length) {
                return this._conf.cols;
            }
            this.configure({ cols: cols });
            return this;
        }
        colOrdering(colOrdering) {
            if (!arguments.length) {
                return this._conf.colOrdering;
            }
            this.configure({ colOrdering: colOrdering });
            return this;
        }
        boxOnClick(handler) {
            if (!arguments.length) {
                return this._conf.boxOnClick;
            }
            this.configure({ boxOnClick: handler });
            return this;
        }
        xAxisOnClick(handler) {
            if (!arguments.length) {
                return this._conf.xAxisOnClick;
            }
            this.configure({ xAxisOnClick: handler });
            return this;
        }
        yAxisOnClick(handler) {
            if (!arguments.length) {
                return this._conf.yAxisOnClick;
            }
            this.configure({ yAxisOnClick: handler });
            return this;
        }
        xBorderRadius(xBorderRadius) {
            if (!arguments.length) {
                return this._conf.xBorderRadius;
            }
            this.configure({ xBorderRadius: xBorderRadius });
            return this;
        }
        yBorderRadius(yBorderRadius) {
            if (!arguments.length) {
                return this._conf.yBorderRadius;
            }
            this.configure({ yBorderRadius: yBorderRadius });
            return this;
        }
    }
    const heatMap = (parent, chartGroup) => new HeatMap(parent, chartGroup);

    const DEFAULT_DOT_RADIUS = 5;
    const TOOLTIP_G_CLASS = 'dc-tooltip';
    const DOT_CIRCLE_CLASS = 'dot';
    const Y_AXIS_REF_LINE_CLASS = 'yRef';
    const X_AXIS_REF_LINE_CLASS = 'xRef';
    const DEFAULT_DOT_OPACITY = 1e-6;
    const LABEL_PADDING = 3;
    /**
     * Concrete line/area chart implementation.
     *
     * Examples:
     * - {@link http://dc-js.github.com/dc.js/ | Nasdaq 100 Index}
     * - {@link http://dc-js.github.com/dc.js/crime/index.html | Canadian City Crime Stats}
     */
    class LineChart$1 extends StackMixin$1 {
        /**
         * Create a Line Chart.
         *
         * TODO update example
         * @example
         * ```
         * // create a line chart under #chart-container1 element using the default global chart group
         * var chart1 = new LineChart('#chart-container1');
         * // create a line chart under #chart-container2 element using chart group A
         * var chart2 = new LineChart('#chart-container2', 'chartGroupA');
         * // create a sub-chart under a composite parent chart
         * var chart3 = new LineChart(compositeChart);
         * ```
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this.configure({
                transitionDuration: 500,
                transitionDelay: 0,
                label: d => printSingleValue(d.y0 + d.y),
                renderLabel: false,
                renderArea: false,
            });
            this._dotRadius = DEFAULT_DOT_RADIUS;
            this._dataPointRadius = null;
            this._dataPointFillOpacity = DEFAULT_DOT_OPACITY;
            this._dataPointStrokeOpacity = DEFAULT_DOT_OPACITY;
            this._curve = null;
            this._interpolate = null; // d3.curveLinear;  // deprecated in 3.0
            this._tension = null; // deprecated in 3.0
            this._defined = undefined;
            this._dashStyle = undefined;
            this._xyTipsOn = true;
            this._rangeBandPadding(1);
        }
        configure(conf) {
            super.configure(conf);
            return this;
        }
        conf() {
            return this._conf;
        }
        plotData() {
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
            if (this._conf.renderLabel) {
                this._drawLabels(layers);
            }
        }
        curve(curve) {
            if (!arguments.length) {
                return this._curve;
            }
            this._curve = curve;
            return this;
        }
        interpolate(interpolate) {
            logger.warnOnce('dc.lineChart.interpolate has been deprecated since version 3.0 use dc.lineChart.curve instead');
            if (!arguments.length) {
                return this._interpolate;
            }
            this._interpolate = interpolate;
            return this;
        }
        tension(tension) {
            logger.warnOnce('dc.lineChart.tension has been deprecated since version 3.0 use dc.lineChart.curve instead');
            if (!arguments.length) {
                return this._tension;
            }
            this._tension = tension;
            return this;
        }
        defined(defined) {
            if (!arguments.length) {
                return this._defined;
            }
            this._defined = defined;
            return this;
        }
        dashStyle(dashStyle) {
            if (!arguments.length) {
                return this._dashStyle;
            }
            this._dashStyle = dashStyle;
            return this;
        }
        renderArea(renderArea) {
            if (!arguments.length) {
                return this._conf.renderArea;
            }
            this.configure({ renderArea: renderArea });
            return this;
        }
        // To keep it backward compatible, this covers multiple cases
        // See https://github.com/dc-js/dc.js/issues/1376
        // It will be removed when interpolate and tension are removed.
        _getCurveFactory() {
            let curve = null;
            // _curve takes precedence
            if (this._curve) {
                return this._curve;
            }
            // Approximate the D3v3 behavior
            if (typeof this._interpolate === 'function') {
                curve = this._interpolate;
            }
            else {
                // If _interpolate is string
                const mapping = {
                    linear: d3Shape.curveLinear,
                    'linear-closed': d3Shape.curveLinearClosed,
                    step: d3Shape.curveStep,
                    'step-before': d3Shape.curveStepBefore,
                    'step-after': d3Shape.curveStepAfter,
                    basis: d3Shape.curveBasis,
                    'basis-open': d3Shape.curveBasisOpen,
                    'basis-closed': d3Shape.curveBasisClosed,
                    bundle: d3Shape.curveBundle,
                    cardinal: d3Shape.curveCardinal,
                    'cardinal-open': d3Shape.curveCardinalOpen,
                    'cardinal-closed': d3Shape.curveCardinalClosed,
                    monotone: d3Shape.curveMonotoneX,
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
                }
                else {
                    curve = curve.tension(this._tension);
                }
            }
            return curve;
        }
        _drawLine(layersEnter, layers) {
            const _line = d3Shape.line()
                .x((d) => this.x()(d.x)) // TODO: revisit later to put proper type
                .y((d) => this.y()(d.y + d.y0)) // TODO: revisit later to put proper type
                .curve(this._getCurveFactory());
            if (this._defined) {
                _line.defined(this._defined);
            }
            const path = layersEnter
                .append('path')
                .attr('class', 'line')
                .attr('stroke', (d, i) => this._colorHelper.getColor(d, i));
            if (this._dashStyle) {
                // TODO: see https://github.com/dc-js/dc.js/issues/1723
                // @ts-ignore
                path.attr('stroke-dasharray', this._dashStyle);
            }
            transition(layers.select('path.line'), this._conf.transitionDuration, this._conf.transitionDelay)
                // .ease('linear')
                .attr('stroke', (d, i) => this._colorHelper.getColor(d, i))
                .attr('d', d => this._safeD(_line(d.values)));
        }
        _drawArea(layersEnter, layers) {
            if (this._conf.renderArea) {
                const _area = d3Shape.area()
                    .x((d) => this.x()(d.x)) // TODO: revisit later to put proper type
                    .y1((d) => this.y()(d.y + d.y0)) // TODO: revisit later to put proper type
                    .y0((d) => this.y()(d.y0)) // TODO: revisit later to put proper type
                    .curve(this._getCurveFactory()); // the types slightly differ for area and line
                if (this._defined) {
                    _area.defined(this._defined);
                }
                layersEnter
                    .append('path')
                    .attr('class', 'area')
                    .attr('fill', (d, i) => this._colorHelper.getColor(d, i))
                    .attr('d', d => this._safeD(_area(d.values)));
                transition(layers.select('path.area'), this._conf.transitionDuration, this._conf.transitionDelay)
                    // .ease('linear')
                    .attr('fill', (d, i) => this._colorHelper.getColor(d, i))
                    .attr('d', d => this._safeD(_area(d.values)));
            }
        }
        _safeD(d) {
            return !d || d.indexOf('NaN') >= 0 ? 'M0,0' : d;
        }
        _drawDots(chartBody, layers) {
            if (this.xyTipsOn() === 'always' ||
                (!(this._conf.brushOn || this._conf.parentBrushOn) && this.xyTipsOn())) {
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
                    const dots = g
                        .selectAll(`circle.${DOT_CIRCLE_CLASS}`)
                        .data(points, d => d.x);
                    const chart = this;
                    const dotsEnterModify = dots
                        .enter()
                        .append('circle')
                        .attr('class', DOT_CIRCLE_CLASS)
                        .attr('cx', d => safeNumber(this.x()(d.x)))
                        .attr('cy', d => safeNumber(this.y()(d.y + d.y0)))
                        .attr('r', this._getDotRadius())
                        .style('fill-opacity', this._dataPointFillOpacity)
                        .style('stroke-opacity', this._dataPointStrokeOpacity)
                        .attr('fill', (d, i) => this._colorHelper.getColor(d, i))
                        .attr('stroke', (d, i) => this._colorHelper.getColor(d, i))
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
                    dotsEnterModify.call(dot => this._doRenderTitle(dot, data));
                    transition(dotsEnterModify, this._conf.transitionDuration)
                        .attr('cx', d => safeNumber(this.x()(d.x)))
                        .attr('cy', d => safeNumber(this.y()(d.y + d.y0)))
                        .attr('fill', (d, i) => this._colorHelper.getColor(d, i));
                    dots.exit().remove();
                });
            }
        }
        _drawLabels(layers) {
            const chart = this;
            layers.each(function (data, layerIndex) {
                const layer = d3Selection.select(this);
                const labels = layer
                    .selectAll('text.lineLabel')
                    .data(data.values, d => d.x);
                const labelsEnterModify = labels
                    .enter()
                    .append('text')
                    .attr('class', 'lineLabel')
                    .attr('text-anchor', 'middle')
                    .merge(labels);
                transition(labelsEnterModify, chart._conf.transitionDuration)
                    .attr('x', d => safeNumber(chart.x()(d.x)))
                    .attr('y', d => {
                    const y = chart.y()(d.y + d.y0) - LABEL_PADDING;
                    return safeNumber(y);
                })
                    .text(d => chart._conf.label(d));
                transition(labels.exit(), chart._conf.transitionDuration).attr('height', 0).remove();
            });
        }
        _createRefLines(g) {
            let yRefLine = g.select(`path.${Y_AXIS_REF_LINE_CLASS}`);
            if (yRefLine.empty()) {
                yRefLine = g.append('path').attr('class', Y_AXIS_REF_LINE_CLASS);
            }
            yRefLine.style('display', 'none').attr('stroke-dasharray', '5,5');
            let xRefLine = g.select(`path.${X_AXIS_REF_LINE_CLASS}`);
            if (xRefLine.empty()) {
                xRefLine = g.append('path').attr('class', X_AXIS_REF_LINE_CLASS);
            }
            xRefLine.style('display', 'none').attr('stroke-dasharray', '5,5');
        }
        _showDot(dot) {
            dot.style('fill-opacity', 0.8);
            dot.style('stroke-opacity', 0.8);
            dot.attr('r', this._dotRadius);
            return dot;
        }
        _showRefLines(dot, g) {
            const x = dot.attr('cx');
            const y = dot.attr('cy');
            const yAxisX = this._yAxisX() - this.margins().left;
            const yAxisRefPathD = `M${yAxisX} ${y}L${x} ${y}`;
            const xAxisRefPathD = `M${x} ${this._yAxisHeight()}L${x} ${y}`;
            g.select(`path.${Y_AXIS_REF_LINE_CLASS}`).style('display', '').attr('d', yAxisRefPathD);
            g.select(`path.${X_AXIS_REF_LINE_CLASS}`).style('display', '').attr('d', xAxisRefPathD);
        }
        _getDotRadius() {
            return this._dataPointRadius || this._dotRadius;
        }
        _hideDot(dot) {
            dot.style('fill-opacity', this._dataPointFillOpacity)
                .style('stroke-opacity', this._dataPointStrokeOpacity)
                .attr('r', this._getDotRadius());
        }
        _hideRefLines(g) {
            g.select(`path.${Y_AXIS_REF_LINE_CLASS}`).style('display', 'none');
            g.select(`path.${X_AXIS_REF_LINE_CLASS}`).style('display', 'none');
        }
        _doRenderTitle(dot, d) {
            if (this._conf.renderTitle) {
                dot.select('title').remove();
                dot.append('title').text(pluck2('data', this.titleFn(d.name)));
            }
        }
        xyTipsOn(xyTipsOn) {
            if (!arguments.length) {
                return this._xyTipsOn;
            }
            this._xyTipsOn = xyTipsOn;
            return this;
        }
        dotRadius(dotRadius) {
            if (!arguments.length) {
                return this._dotRadius;
            }
            this._dotRadius = dotRadius;
            return this;
        }
        renderDataPoints(options) {
            if (!arguments.length) {
                return {
                    fillOpacity: this._dataPointFillOpacity,
                    strokeOpacity: this._dataPointStrokeOpacity,
                    radius: this._dataPointRadius,
                };
            }
            else if (!options) {
                this._dataPointFillOpacity = DEFAULT_DOT_OPACITY;
                this._dataPointStrokeOpacity = DEFAULT_DOT_OPACITY;
                this._dataPointRadius = null;
            }
            else {
                this._dataPointFillOpacity = options.fillOpacity || 0.8;
                this._dataPointStrokeOpacity = options.strokeOpacity || 0.0;
                this._dataPointRadius = options.radius || 2;
            }
            return this;
        }
        _colorFilter(color, dashstyle, inv) {
            return function () {
                const item = d3Selection.select(this);
                const match = (item.attr('stroke') === color &&
                    item.attr('stroke-dasharray') ===
                        (dashstyle instanceof Array ? dashstyle.join(',') : null)) ||
                    item.attr('fill') === color;
                return inv ? !match : match;
            };
        }
        legendHighlight(d) {
            if (!this.isLegendableHidden(d)) {
                this.g()
                    .selectAll('path.line, path.area')
                    .classed('highlight', this._colorFilter(d.color, d.dashstyle))
                    .classed('fadeout', this._colorFilter(d.color, d.dashstyle, true));
            }
        }
        legendReset() {
            this.g()
                .selectAll('path.line, path.area')
                .classed('highlight', false)
                .classed('fadeout', false);
        }
        legendables() {
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

    class LineChart extends StackMixinExt(CoordinateGridMixinExt(ColorMixinExt(MarginMixinExt(BaseMixinExt(LineChart$1))))) {
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
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
     * If the group is a {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#crossfilter_groupAll | groupAll}
     * then its `.value()` will be displayed. This is the recommended usage.
     *
     * However, if it is given an ordinary group, the `numberDisplay` will show the last bin's value, after
     * sorting with the {@link https://dc-js.github.io/dc.js/docs/html/dc.baseMixin.html#ordering__anchor | ordering}
     * function. `numberDisplay` defaults the `ordering` function to sorting by value, so this will display
     * the largest value if the values are numeric.
     */
    class NumberDisplay$1 extends BaseMixin$1 {
        /**
         * Create a Number Display widget.
         *
         * @example
         * ```
         * // create a number display under #chart-container1 element using the default global chart group
         * const display1 = new NumberDisplay('#chart-container1');
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this.configure({
                transitionDuration: 250,
                transitionDelay: 0,
                formatNumber: d3Format.format('.2s'),
            });
            this.dataProvider().configure({
                ordering: kv => kv.value, // default to ordering by value, to emulate old group.top(1) behavior when multiple groups
            });
            this._html = { one: '', some: '', none: '' };
            this._lastValue = undefined;
            // dimension not required
            this._mandatoryAttributes(['group']);
        }
        configure(conf) {
            super.configure(conf);
            return this;
        }
        conf() {
            return this._conf;
        }
        // TODO: chart specific DataProvider
        data() {
            const group = this.dataProvider().conf().group;
            const valObj = group.value ? group.value() : this._maxBin(group.all());
            return this.dataProvider().conf().valueAccessor(valObj);
        }
        html(html) {
            if (!arguments.length) {
                return this._html;
            }
            if (html.none) {
                this._html.none = html.none; // if none available
            }
            else if (html.one) {
                this._html.none = html.one; // if none not available use one
            }
            else if (html.some) {
                this._html.none = html.some; // if none and one not available use some
            }
            if (html.one) {
                this._html.one = html.one; // if one available
            }
            else if (html.some) {
                this._html.one = html.some; // if one not available use some
            }
            if (html.some) {
                this._html.some = html.some; // if some available
            }
            else if (html.one) {
                this._html.some = html.one; // if some not available use one
            }
            return this;
        }
        /**
         * Calculate and return the underlying value of the display.
         */
        value() {
            return this.data();
        }
        _maxBin(all) {
            if (!all.length) {
                return null;
            }
            const sorted = this._computeOrderedGroups(all);
            return sorted[sorted.length - 1];
        }
        _doRender() {
            const newValue = this.value();
            let span = this.selectAll(`.${SPAN_CLASS}`);
            if (span.empty()) {
                span = span.data([0]).enter().append('span').attr('class', SPAN_CLASS).merge(span);
            }
            {
                const chart = this;
                span.transition()
                    .duration(chart._conf.transitionDuration)
                    .delay(chart._conf.transitionDelay)
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
                        const num = chart._conf.formatNumber(interp(t));
                        if (newValue === 0 && chart._html.none !== '') {
                            html = chart._html.none;
                        }
                        else if (newValue === 1 && chart._html.one !== '') {
                            html = chart._html.one;
                        }
                        else if (chart._html.some !== '') {
                            html = chart._html.some;
                        }
                        node.innerHTML = html ? html.replace('%number', num) : num;
                    };
                });
            }
            return this;
        }
        _doRedraw() {
            return this._doRender();
        }
    }

    class NumberDisplay extends BaseMixinExt(NumberDisplay$1) {
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
        }
        formatNumber(formatter) {
            if (!arguments.length) {
                return this._conf.formatNumber;
            }
            this.configure({ formatNumber: formatter });
            return this;
        }
    }
    const numberDisplay = (parent, chartGroup) => new NumberDisplay(parent, chartGroup);

    const DEFAULT_MIN_ANGLE_FOR_LABEL$1 = 0.5;
    /**
     * The pie chart implementation is usually used to visualize a small categorical distribution.  The pie
     * chart uses keyAccessor to determine the slices, and valueAccessor to calculate the size of each
     * slice relative to the sum of all values. Slices are ordered by {@link ICFSimpleAdapterConf.ordering | ordering}
     * which defaults to sorting by key.
     *
     * Examples:
     * - {@link http://dc-js.github.com/dc.js/ | Nasdaq 100 Index}
     */
    class PieChart$1 extends ColorMixin$1(BaseMixin$1) {
        /**
         * Create a Pie Chart
         *
         * TODO update example
         *
         * @example
         * ```
         * // create a pie chart under #chart-container1 element using the default global chart group
         * const chart1 = new PieChart('#chart-container1');
         * // create a pie chart under #chart-container2 element using chart group A
         * const chart2 = new PieChart('#chart-container2', 'chartGroupA');
         * ```
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this.configure({
                colorAccessor: d => this._conf.keyAccessor(d),
                emptyTitle: 'empty',
                label: d => this._conf.keyAccessor(d),
                renderLabel: true,
                title: d => `${this._conf.keyAccessor(d)}: ${d._value}`,
                transitionDuration: 350,
                transitionDelay: 0,
                radius: undefined,
                innerRadius: 0,
                externalRadiusPadding: 0,
                minAngleForLabel: DEFAULT_MIN_ANGLE_FOR_LABEL$1,
                externalLabels: undefined,
                drawPaths: false,
            });
            this.dataProvider(new CFDataCapHelper());
            this._sliceCssClass = 'pie-slice';
            this._labelCssClass = 'pie-label';
            this._sliceGroupCssClass = 'pie-slice-group';
            this._labelGroupCssClass = 'pie-label-group';
            this._emptyCssClass = 'empty-chart';
            this._computedRadius = undefined;
            this._g = undefined;
            this._cx = undefined;
            this._cy = undefined;
        }
        configure(conf) {
            super.configure(conf);
            return this;
        }
        conf() {
            return this._conf;
        }
        _doRender() {
            this.resetSvg();
            this._g = this.svg().append('g').attr('transform', `translate(${this.cx()},${this.cy()})`);
            this._g.append('g').attr('class', this._sliceGroupCssClass);
            this._g.append('g').attr('class', this._labelGroupCssClass);
            this._drawChart();
            return this;
        }
        _drawChart() {
            // set radius from chart size if none given, or if given radius is too large
            const maxRadius = d3Array.min([this.width(), this.height()]) / 2;
            this._computedRadius =
                this._conf.radius && this._conf.radius < maxRadius ? this._conf.radius : maxRadius;
            const arcs = this._buildArcs();
            const pieLayout = this._pieLayout();
            let pieData;
            // if we have data...
            // @ts-ignore // TODO: better typing
            if (d3Array.sum(this.data(), d => d._value)) {
                pieData = pieLayout(this.data());
                this._g.classed(this._emptyCssClass, false);
            }
            else {
                // otherwise we'd be getting NaNs, so override
                // note: abuse others for its ignoring the value accessor
                pieData = pieLayout([
                    { key: this._conf.emptyTitle, _value: 1, others: [this._conf.emptyTitle] },
                ]);
                this._g.classed(this._emptyCssClass, true);
            }
            if (this._g) {
                const slices = this._g
                    .select(`g.${this._sliceGroupCssClass}`)
                    .selectAll(`g.${this._sliceCssClass}`)
                    .data(pieData);
                const labels = this._g
                    .select(`g.${this._labelGroupCssClass}`)
                    .selectAll(`text.${this._labelCssClass}`)
                    .data(pieData);
                this._removeElements(slices, labels);
                this._createElements(slices, labels, arcs, pieData);
                this._updateElements(pieData, arcs);
                this._highlightFilter();
                transition(this._g, this._conf.transitionDuration, this._conf.transitionDelay).attr('transform', `translate(${this.cx()},${this.cy()})`);
            }
        }
        _createElements(slices, labels, arcs, pieData) {
            const slicesEnter = this._createSliceNodes(slices);
            this._createSlicePath(slicesEnter, arcs);
            this._createTitles(slicesEnter);
            this._createLabels(labels, pieData, arcs);
        }
        _createSliceNodes(slices) {
            return slices
                .enter()
                .append('g')
                .attr('class', (d, i) => `${this._sliceCssClass} _${i}`);
        }
        _createSlicePath(slicesEnter, arcs) {
            const slicePath = slicesEnter
                .append('path')
                .attr('fill', (d, i) => this._fill(d, i))
                .on('click', (evt, d) => this._onClick(d))
                .attr('d', (d, i) => this._safeArc(d, i, arcs));
            const tranNodes = transition(slicePath, this._conf.transitionDuration, this._conf.transitionDelay);
            if (tranNodes.attrTween) {
                const chart = this;
                tranNodes.attrTween('d', function (d) {
                    return chart._tweenPie(d, this);
                });
            }
        }
        _createTitles(slicesEnter) {
            if (this._conf.renderTitle) {
                slicesEnter.append('title').text(d => this._conf.title(d.data));
            }
        }
        _applyLabelText(labels) {
            labels.text(d => {
                const data = d.data;
                if ((this._sliceHasNoData(data) || this._sliceTooSmall(d)) &&
                    !this._isSelectedSlice(d)) {
                    return '';
                }
                return this._conf.label(d.data);
            });
        }
        _positionLabels(labels, arcs) {
            this._applyLabelText(labels);
            transition(labels, this._conf.transitionDuration, this._conf.transitionDelay)
                .attr('transform', d => this._labelPosition(d, arcs))
                .attr('text-anchor', 'middle');
        }
        _highlightSlice(i, whether) {
            this.select(`g.pie-slice._${i}`).classed('highlight', whether);
        }
        _createLabels(labels, pieData, arcs) {
            if (this._conf.renderLabel) {
                const labelsEnter = labels
                    .enter()
                    .append('text')
                    .attr('class', (d, i) => {
                    let classes = `${this._sliceCssClass} ${this._labelCssClass} _${i}`;
                    if (this._conf.externalLabels) {
                        classes += ' external';
                    }
                    return classes;
                })
                    .on('click', (evt, d) => this._onClick(d))
                    .on('mouseover', (evt, d) => {
                    this._highlightSlice(d.index, true);
                })
                    .on('mouseout', (evt, d) => {
                    this._highlightSlice(d.index, false);
                });
                this._positionLabels(labelsEnter, arcs);
                if (this._conf.externalLabels && this._conf.drawPaths) {
                    this._updateLabelPaths(pieData, arcs);
                }
            }
        }
        _updateLabelPaths(pieData, arcs) {
            let polyline = this._g
                .selectAll(`polyline.${this._sliceCssClass}`)
                .data(pieData);
            polyline.exit().remove();
            polyline = polyline
                .enter()
                .append('polyline')
                .attr('class', (d, i) => `pie-path _${i} ${this._sliceCssClass}`)
                .on('click', (evt, d) => this._onClick(d))
                .on('mouseover', (evt, d) => {
                // @ts-ignore
                this._highlightSlice(d.index, true);
            })
                .on('mouseout', (evt, d) => {
                // @ts-ignore
                this._highlightSlice(d.index, false);
            })
                .merge(polyline);
            const arc2 = d3Shape.arc()
                .outerRadius(this._computedRadius - this._conf.externalRadiusPadding + this._conf.externalLabels)
                .innerRadius(this._computedRadius - this._conf.externalRadiusPadding);
            const tranNodes = transition(polyline, this._conf.transitionDuration, this._conf.transitionDelay);
            // this is one rare case where d3.selection differs from d3.transition
            if (tranNodes.attrTween) {
                tranNodes.attrTween('points', function (d) {
                    let current = this._current || d;
                    current = { startAngle: current.startAngle, endAngle: current.endAngle };
                    const _interpolate = d3Interpolate.interpolate(current, d);
                    this._current = _interpolate(0);
                    return t => {
                        const d2 = _interpolate(t);
                        return [arcs.centroid(d2), arc2.centroid(d2)];
                    };
                });
            }
            else {
                tranNodes.attr('points', d => [arcs.centroid(d), arc2.centroid(d)]);
            }
            tranNodes.style('visibility', d => d.endAngle - d.startAngle < 0.0001 ? 'hidden' : 'visible');
        }
        _updateElements(pieData, arcs) {
            this._updateSlicePaths(pieData, arcs);
            this._updateLabels(pieData, arcs);
            this._updateTitles(pieData);
        }
        _updateSlicePaths(pieData, arcs) {
            const slicePaths = this._g
                .selectAll(`g.${this._sliceCssClass}`)
                .data(pieData)
                .select('path')
                .attr('d', (d, i) => this._safeArc(d, i, arcs));
            const tranNodes = transition(slicePaths, this._conf.transitionDuration, this._conf.transitionDelay);
            if (tranNodes.attrTween) {
                const chart = this;
                tranNodes.attrTween('d', function (d) {
                    return chart._tweenPie(d, this);
                });
            }
            tranNodes.attr('fill', (d, i) => this._fill(d, i));
        }
        _updateLabels(pieData, arcs) {
            if (this._conf.renderLabel) {
                const labels = this._g
                    .selectAll(`text.${this._labelCssClass}`)
                    .data(pieData);
                this._positionLabels(labels, arcs);
                if (this._conf.externalLabels && this._conf.drawPaths) {
                    this._updateLabelPaths(pieData, arcs);
                }
            }
        }
        _updateTitles(pieData) {
            if (this._conf.renderTitle) {
                this._g
                    .selectAll(`g.${this._sliceCssClass}`)
                    .data(pieData)
                    .select('title')
                    .text(d => this._conf.title(d.data));
            }
        }
        _removeElements(slices, labels) {
            slices.exit().remove();
            labels.exit().remove();
        }
        _highlightFilter() {
            const chart = this;
            if (this.hasFilter()) {
                this.selectAll(`g.${this._sliceCssClass}`).each(function (d) {
                    if (chart._isSelectedSlice(d)) {
                        chart.highlightSelected(this);
                    }
                    else {
                        chart.fadeDeselected(this);
                    }
                });
            }
            else {
                this.selectAll(`g.${this._sliceCssClass}`).each(function () {
                    chart.resetHighlight(this);
                });
            }
        }
        cx(cx) {
            if (!arguments.length) {
                return this._cx || this.width() / 2;
            }
            this._cx = cx;
            return this;
        }
        cy(cy) {
            if (!arguments.length) {
                return this._cy || this.height() / 2;
            }
            this._cy = cy;
            return this;
        }
        _buildArcs() {
            return d3Shape.arc()
                .outerRadius(this._computedRadius - this._conf.externalRadiusPadding)
                .innerRadius(this._conf.innerRadius);
        }
        _isSelectedSlice(d) {
            return this.hasFilter(this._conf.keyAccessor(d.data));
        }
        _doRedraw() {
            this._drawChart();
            return this;
        }
        _pieLayout() {
            // The 2nd argument is type of datum that will be used. TODO: revisit after refactoring.
            return d3Shape.pie()
                .sort(null)
                // @ts-ignore // TODO: better typing
                .value(d => d._value);
        }
        _sliceTooSmall(d) {
            const angle = d.endAngle - d.startAngle;
            return isNaN(angle) || angle < this._conf.minAngleForLabel;
        }
        _sliceHasNoData(d) {
            return d._value === 0;
        }
        _isOffCanvas(current) {
            return !current || isNaN(current.startAngle) || isNaN(current.endAngle);
        }
        _fill(d, i) {
            return this._colorHelper.getColor(d.data, i);
        }
        _onClick(d) {
            if (this._g.attr('class') !== this._emptyCssClass) {
                this.onClick(d.data);
            }
        }
        _safeArc(d, i, _arc) {
            let path = _arc(d, i);
            if (path.indexOf('NaN') >= 0) {
                path = 'M0,0';
            }
            return path;
        }
        _labelPosition(d, _arc) {
            let centroid;
            if (this._conf.externalLabels) {
                centroid = d3Shape.arc()
                    .outerRadius(this._computedRadius -
                    this._conf.externalRadiusPadding +
                    this._conf.externalLabels)
                    .innerRadius(this._computedRadius -
                    this._conf.externalRadiusPadding +
                    this._conf.externalLabels)
                    .centroid(d);
            }
            else {
                centroid = _arc.centroid(d);
            }
            if (isNaN(centroid[0]) || isNaN(centroid[1])) {
                return 'translate(0,0)';
            }
            else {
                return `translate(${centroid})`;
            }
        }
        legendables() {
            return this.data().map((d, i) => {
                // TODO: correct typing
                const legendable = {
                    name: d.key,
                    data: d.value,
                    others: d.others,
                    chart: this,
                };
                legendable.color = this._colorHelper.getColor(d, i);
                return legendable;
            });
        }
        legendHighlight(d) {
            this._highlightSliceFromLegendable(d, true);
        }
        legendReset(d) {
            this._highlightSliceFromLegendable(d, false);
        }
        legendToggle(d) {
            this.onClick({ key: d.name, others: d.others });
        }
        _highlightSliceFromLegendable(legendable, highlighted) {
            this.selectAll('g.pie-slice').each(function (d) {
                if (legendable.name === d.data.key) {
                    d3Selection.select(this).classed('highlight', highlighted);
                }
            });
        }
        _tweenPie(b, element) {
            b.innerRadius = this._conf.innerRadius;
            let current = element._current;
            if (this._isOffCanvas(current)) {
                current = { startAngle: 0, endAngle: 0 };
            }
            else {
                // only interpolate startAngle & endAngle, not the whole data object
                current = { startAngle: current.startAngle, endAngle: current.endAngle };
            }
            const i = d3Interpolate.interpolate(current, b);
            element._current = i(0);
            return t => this._safeArc(i(t), 0, this._buildArcs());
        }
    }

    class PieChart extends CapMixinExt(ColorMixinExt(BaseMixinExt(PieChart$1))) {
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
        }
        emptyTitle(title) {
            if (arguments.length === 0) {
                return this._conf.emptyTitle;
            }
            this.configure({ emptyTitle: title });
            return this;
        }
        /**
         * Get or set the maximum number of slices the pie chart will generate. The top slices are determined by
         * value from high to low. Other slices exceeding the cap will be rolled up into one single *Others* slice.
         */
        slicesCap(cap) {
            return this.cap(cap);
        }
        externalRadiusPadding(externalRadiusPadding) {
            if (!arguments.length) {
                return this._conf.externalRadiusPadding;
            }
            this.configure({ externalRadiusPadding: externalRadiusPadding });
            return this;
        }
        innerRadius(innerRadius) {
            if (!arguments.length) {
                return this._conf.innerRadius;
            }
            this.configure({ innerRadius: innerRadius });
            return this;
        }
        radius(radius) {
            if (!arguments.length) {
                return this._conf.radius;
            }
            this.configure({ radius: radius });
            return this;
        }
        minAngleForLabel(minAngleForLabel) {
            if (!arguments.length) {
                return this._conf.minAngleForLabel;
            }
            this.configure({ minAngleForLabel: minAngleForLabel });
            return this;
        }
        externalLabels(externalLabels) {
            if (arguments.length === 0) {
                return this._conf.externalLabels;
            }
            else if (externalLabels) {
                // TODO: figure out why there is special handling, do we need it?
                this.configure({ externalLabels: externalLabels });
            }
            else {
                this.configure({ externalLabels: undefined });
            }
            return this;
        }
        drawPaths(drawPaths) {
            if (arguments.length === 0) {
                return this._conf.drawPaths;
            }
            this.configure({ drawPaths: drawPaths });
            return this;
        }
    }
    const pieChart = (parent, chartGroup) => new PieChart(parent, chartGroup);

    /**
     * Concrete row chart implementation.
     *
     * Examples:
     * - {@link http://dc-js.github.com/dc.js/ | Nasdaq 100 Index}
     */
    class RowChart$1 extends ColorMixin$1(MarginMixin) {
        /**
         * Create a Row Chart.
         *
         * TODO update example
         *
         * @example
         * ```
         * // create a row chart under #chart-container1 element using the default global chart group
         * const chart1 = new RowChart('#chart-container1');
         * // create a row chart under #chart-container2 element using chart group A
         * const chart2 = new RowChart('#chart-container2', 'chartGroupA');
         * ```
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this.configure({
                label: d => this._conf.keyAccessor(d),
                renderLabel: true,
                title: d => `${this._conf.keyAccessor(d)}: ${d._value}`,
                labelOffsetX: 10,
                labelOffsetY: undefined,
                titleLabelOffsetX: 2,
                gap: 5,
                fixedBarHeight: undefined,
                renderTitleLabel: false,
                elasticX: undefined,
            });
            this.dataProvider(new CFDataCapHelper());
            this._g = undefined;
            this._dyOffset = '0.35em'; // this helps center labels https://github.com/d3/d3-3.x-api-reference/blob/master/SVG-Shapes.md#svg_text
            this._rowCssClass = 'dc_row';
            this._titleRowCssClass = 'titlerow';
            this._x = undefined;
            this._xAxis = d3Axis.axisBottom(undefined);
            this._rowData = undefined;
        }
        configure(conf) {
            super.configure(conf);
            return this;
        }
        conf() {
            return this._conf;
        }
        _calculateAxisScale() {
            if (!this._x || this._conf.elasticX) {
                const _extent = d3Array.extent(this._rowData, d => d._value);
                if (_extent[0] > 0) {
                    _extent[0] = 0;
                }
                if (_extent[1] < 0) {
                    _extent[1] = 0;
                }
                this._x = d3Scale.scaleLinear().domain(_extent).range([0, this.effectiveWidth()]);
            }
            this._xAxis.scale(this._x);
        }
        _drawAxis() {
            let axisG = this._g.select('g.axis');
            this._calculateAxisScale();
            if (axisG.empty()) {
                axisG = this._g.append('g').attr('class', 'axis');
            }
            axisG.attr('transform', `translate(0, ${this.effectiveHeight()})`);
            transition(axisG, this._conf.transitionDuration, this._conf.transitionDelay).call(this._xAxis);
        }
        _doRender() {
            this.resetSvg();
            this._g = this.svg()
                .append('g')
                .attr('transform', `translate(${this.margins().left},${this.margins().top})`);
            this._drawChart();
            return this;
        }
        x(scale) {
            if (!arguments.length) {
                return this._x;
            }
            this._x = scale;
            return this;
        }
        _drawGridLines() {
            this._g
                .selectAll('g.tick')
                .select('line.grid-line')
                .remove();
            this._g
                .selectAll('g.tick')
                .append('line')
                .attr('class', 'grid-line')
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', 0)
                .attr('y2', () => -this.effectiveHeight());
        }
        _drawChart() {
            this._rowData = this.data();
            this._drawAxis();
            this._drawGridLines();
            let rows = this._g
                .selectAll(`g.${this._rowCssClass}`)
                .data(this._rowData);
            this._removeElements(rows);
            rows = this._createElements(rows).merge(rows);
            this._updateElements(rows);
        }
        _createElements(rows) {
            const rowEnter = rows
                .enter()
                .append('g')
                .attr('class', (d, i) => `${this._rowCssClass} _${i}`);
            rowEnter.append('rect').attr('width', 0);
            this._createLabels(rowEnter);
            return rowEnter;
        }
        _removeElements(rows) {
            rows.exit().remove();
        }
        _rootValue() {
            const root = this._x(0);
            return root === -Infinity || root !== root ? this._x(1) : root;
        }
        _updateElements(rows) {
            const n = this._rowData.length;
            let height;
            height = this._conf.fixedBarHeight
                ? this._conf.fixedBarHeight
                : (this.effectiveHeight() - (n + 1) * this._conf.gap) / n;
            // vertically align label in center unless they override the value via property setter
            this._labelOffsetY =
                this._conf.labelOffsetY === undefined ? height / 2 : this._conf.labelOffsetY;
            const rect = rows
                .attr('transform', (d, i) => `translate(0,${(i + 1) * this._conf.gap + i * height})`)
                .select('rect')
                .attr('height', height)
                .attr('fill', (d, i) => this._colorHelper.getColor(d, i))
                .on('click', (evt, d) => this._onClick(d))
                .classed('deselected', d => (this.hasFilter() ? !this._isSelectedRow(d) : false))
                .classed('selected', d => (this.hasFilter() ? this._isSelectedRow(d) : false));
            transition(rect, this._conf.transitionDuration, this._conf.transitionDelay)
                .attr('width', d => Math.abs(this._rootValue() - this._x(d._value)))
                .attr('transform', d => this._translateX(d));
            this._createTitles(rows);
            this._updateLabels(rows);
        }
        _createTitles(rows) {
            if (this._conf.renderTitle) {
                rows.select('title').remove();
                rows.append('title').text(this._conf.title);
            }
        }
        _createLabels(rowEnter) {
            if (this._conf.renderLabel) {
                rowEnter.append('text').on('click', (evt, d) => this._onClick(d));
            }
            if (this._conf.renderTitleLabel) {
                rowEnter
                    .append('text')
                    .attr('class', this._titleRowCssClass)
                    .on('click', (evt, d) => this._onClick(d));
            }
        }
        _updateLabels(rows) {
            if (this._conf.renderLabel) {
                const lab = rows
                    .select('text')
                    .attr('x', this._conf.labelOffsetX)
                    .attr('y', this._labelOffsetY)
                    .attr('dy', this._dyOffset)
                    .on('click', (evt, d) => this._onClick(d))
                    .attr('class', (d, i) => `${this._rowCssClass} _${i}`)
                    .text(d => this._conf.label(d));
                transition(lab, this._conf.transitionDuration, this._conf.transitionDelay).attr('transform', d => this._translateX(d));
            }
            if (this._conf.renderTitleLabel) {
                const titlelab = rows
                    .select(`.${this._titleRowCssClass}`)
                    .attr('x', this.effectiveWidth() - this._conf.titleLabelOffsetX)
                    .attr('y', this._labelOffsetY)
                    .attr('dy', this._dyOffset)
                    .attr('text-anchor', 'end')
                    .on('click', (evt, d) => this._onClick(d))
                    .attr('class', (d, i) => `${this._titleRowCssClass} _${i}`)
                    .text(d => this._conf.title(d));
                transition(titlelab, this._conf.transitionDuration, this._conf.transitionDelay).attr('transform', d => this._translateX(d));
            }
        }
        _onClick(d, i) {
            this.onClick(d, i);
        }
        _translateX(d) {
            const x = this._x(d._value);
            const x0 = this._rootValue();
            const s = x > x0 ? x0 : x;
            return `translate(${s},0)`;
        }
        _doRedraw() {
            this._drawChart();
            return this;
        }
        xAxis(xAxis) {
            if (!arguments.length) {
                return this._xAxis;
            }
            this._xAxis = xAxis;
            return this;
        }
        _isSelectedRow(d) {
            return this.hasFilter(this._conf.keyAccessor(d));
        }
    }

    class RowChart extends CapMixinExt(ColorMixinExt(MarginMixinExt(BaseMixinExt(RowChart$1)))) {
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this.rowsCap = this.cap;
        }
        renderTitleLabel(renderTitleLabel) {
            if (!arguments.length) {
                return this._conf.renderTitleLabel;
            }
            this.configure({ renderTitleLabel: renderTitleLabel });
            return this;
        }
        fixedBarHeight(fixedBarHeight) {
            if (!arguments.length) {
                return this._conf.fixedBarHeight;
            }
            this.configure({ fixedBarHeight: fixedBarHeight });
            return this;
        }
        gap(gap) {
            if (!arguments.length) {
                return this._conf.gap;
            }
            this.configure({ gap: gap });
            return this;
        }
        elasticX(elasticX) {
            if (!arguments.length) {
                return this._conf.elasticX;
            }
            this.configure({ elasticX: elasticX });
            return this;
        }
        labelOffsetX(labelOffsetX) {
            if (!arguments.length) {
                return this._conf.labelOffsetX;
            }
            this.configure({ labelOffsetX: labelOffsetX });
            return this;
        }
        labelOffsetY(labelOffsety) {
            if (!arguments.length) {
                return this._conf.labelOffsetY;
            }
            this.configure({ labelOffsetY: labelOffsety });
            return this;
        }
        titleLabelOffsetX(titleLabelOffsetX) {
            if (!arguments.length) {
                return this._conf.titleLabelOffsetX;
            }
            this.configure({ titleLabelOffsetX: titleLabelOffsetX });
            return this;
        }
    }
    const rowChart = (parent, chartGroup) => new RowChart(parent, chartGroup);

    /**
     * A scatter plot chart
     *
     * Examples:
     * - {@link http://dc-js.github.io/dc.js/examples/scatter.html | Scatter Chart}
     * - {@link http://dc-js.github.io/dc.js/examples/multi-scatter.html | Multi-Scatter Chart}
     */
    class ScatterPlot$1 extends CoordinateGridMixin$1 {
        /**
         * Create a Scatter Plot.
         *
         * TODO update example
         *
         * @example
         * ```
         * // create a scatter plot under #chart-container1 element using the default global chart group
         * const chart1 = new ScatterPlot('#chart-container1');
         * // create a scatter plot under #chart-container2 element using chart group A
         * const chart2 = new ScatterPlot('#chart-container2', 'chartGroupA');
         * // create a sub-chart under a composite parent chart
         * const chart3 = new ScatterPlot(compositeChart);
         * ```
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            const originalKeyAccessor = this._conf.keyAccessor;
            this.configure({
                keyAccessor: d => originalKeyAccessor(d)[0],
                colorAccessor: () => this.dataProvider().conf().groupName,
                existenceAccessor: d => d.value,
                // see https://github.com/dc-js/dc.js/issues/702
                title: d => `${this._conf.keyAccessor(d)},${d._value}: ${this._conf.existenceAccessor(d)}`,
                highlightedSize: 7,
                symbolSize: 5,
                excludedSize: 3,
                excludedColor: null,
                excludedOpacity: 1.0,
                emptySize: 0,
                emptyOpacity: 0,
                nonemptyOpacity: 1,
                emptyColor: null,
                useCanvas: false,
            });
            this.dataProvider().configure({
                valueAccessor: d => originalKeyAccessor(d)[1],
            });
            this._symbol = d3Shape.symbol();
            this._filtered = [];
            this._canvas = null;
            this._context = null;
            // Use a 2 dimensional brush
            this.brush(d3Brush.brush());
            this._symbol.size((d, i) => this._elementSize(d, i));
        }
        configure(conf) {
            super.configure(conf);
            return this;
        }
        conf() {
            return this._conf;
        }
        // Calculates element radius for canvas plot to be comparable to D3 area based symbol sizes
        _canvasElementSize(d, isFiltered) {
            if (!this._conf.existenceAccessor(d)) {
                return this._conf.emptySize / Math.sqrt(Math.PI);
            }
            else if (isFiltered) {
                return this._conf.symbolSize / Math.sqrt(Math.PI);
            }
            else {
                return this._conf.excludedSize / Math.sqrt(Math.PI);
            }
        }
        _elementSize(d, i) {
            if (!this._conf.existenceAccessor(d)) {
                return Math.pow(this._conf.emptySize, 2);
            }
            else if (this._filtered[i]) {
                return Math.pow(this._conf.symbolSize, 2);
            }
            else {
                return Math.pow(this._conf.excludedSize, 2);
            }
        }
        _locator(d) {
            return `translate(${this.x()(this._conf.keyAccessor(d))},${this.y()(d._value)})`;
        }
        filter(filter) {
            if (!arguments.length) {
                return super.filter();
            }
            if (filter === null) {
                return super.filter(null);
            }
            return super.filter(new RangedTwoDimensionalFilter(filter));
        }
        /**
         * Method that replaces original resetSvg and appropriately inserts canvas
         * element along with svg element and sets their CSS properties appropriately
         * so they are overlapped on top of each other.
         * Remove the chart's SVGElements from the dom and recreate the container SVGElement.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/SVGElement | SVGElement}
         */
        resetSvg() {
            if (!this._conf.useCanvas) {
                return super.resetSvg();
            }
            else {
                super.resetSvg(); // Perform original svgReset inherited from baseMixin
                this.select('canvas').remove(); // remove old canvas
                const svgSel = this.svg();
                const rootSel = this.root();
                // Set root node to relative positioning and svg to absolute
                rootSel.style('position', 'relative');
                svgSel.style('position', 'relative');
                // Check if SVG element already has any extra top/left CSS offsets
                const svgLeft = isNaN(parseInt(svgSel.style('left'), 10))
                    ? 0
                    : parseInt(svgSel.style('left'), 10);
                const svgTop = isNaN(parseInt(svgSel.style('top'), 10))
                    ? 0
                    : parseInt(svgSel.style('top'), 10);
                const width = this.effectiveWidth();
                const height = this.effectiveHeight();
                const margins = this.margins(); // {top: 10, right: 130, bottom: 42, left: 42}
                // Add the canvas element such that it perfectly overlaps the plot area of the scatter plot SVG
                const devicePixelRatio = window.devicePixelRatio || 1;
                this._canvas = this.root()
                    .append('canvas')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', width * devicePixelRatio)
                    .attr('height', height * devicePixelRatio)
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
        _resizeCanvas() {
            const width = this.effectiveWidth();
            const height = this.effectiveHeight();
            const devicePixelRatio = window.devicePixelRatio || 1;
            this._canvas
                .attr('width', width * devicePixelRatio)
                .attr('height', height * devicePixelRatio)
                .style('width', `${width}px`)
                .style('height', `${height}px`);
            this._context.scale(devicePixelRatio, devicePixelRatio);
        }
        canvas(canvasElement) {
            if (!arguments.length) {
                return this._canvas;
            }
            this._canvas = canvasElement;
            return this;
        }
        /**
         * Get canvas 2D context. Provides valid context only when
         * {@link IScatterPlotConf.useCanvas | useCanvas} is set to `true`
         */
        context() {
            return this._context;
        }
        /*eslint complexity: [2,11] */
        // Plots data on canvas element. If argument provided, assumes legend is
        // currently being highlighted and modifies opacity/size of symbols accordingly
        // @param {Object} [legendHighlightDatum] - Datum provided to legendHighlight method
        _plotOnCanvas(legendHighlightDatum) {
            this._resizeCanvas();
            const context = this.context();
            context.clearRect(0, 0, context.canvas.width + 2, context.canvas.height + 2);
            const data = this.data();
            // Draw the data on canvas
            data.forEach((d, i) => {
                const isFiltered = !this.filter() || this.filter().isFiltered([d.key[0], d.key[1]]);
                // Calculate opacity for current data point
                let cOpacity = 1;
                if (!this._conf.existenceAccessor(d)) {
                    cOpacity = this._conf.emptyOpacity;
                }
                else if (isFiltered) {
                    cOpacity = this._conf.nonemptyOpacity;
                }
                else {
                    cOpacity = this._conf.excludedOpacity;
                }
                // Calculate color for current data point
                let cColor = null;
                if (this._conf.emptyColor && !this._conf.existenceAccessor(d)) {
                    cColor = this._conf.emptyColor;
                }
                else if (this._conf.excludedColor && !isFiltered) {
                    cColor = this._conf.excludedColor;
                }
                else {
                    cColor = this._colorHelper.getColor(d, undefined);
                }
                let cSize = this._canvasElementSize(d, isFiltered);
                // Adjust params for data points if legend is highlighted
                if (legendHighlightDatum) {
                    const isHighlighted = cColor === legendHighlightDatum.color;
                    // Calculate opacity for current data point
                    const fadeOutOpacity = 0.1; // TODO: Make this programmatically settable
                    if (!isHighlighted) {
                        // Fade out non-highlighted colors + highlighted colors outside filter
                        cOpacity = fadeOutOpacity;
                    }
                    if (isHighlighted) {
                        // Set size for highlighted color data points
                        cSize = this._conf.highlightedSize / Math.sqrt(Math.PI);
                    }
                }
                // Draw point on canvas
                context.save();
                context.globalAlpha = cOpacity;
                context.beginPath();
                context.arc(this.x()(this._conf.keyAccessor(d)), this.y()(d._value), cSize, 0, 2 * Math.PI, true);
                context.fillStyle = cColor;
                context.fill();
                // context.lineWidth = 0.5; // Commented out code to add stroke around scatter points if desired
                // context.strokeStyle = '#333';
                // context.stroke();
                context.restore();
            });
        }
        _plotOnSVG() {
            // TODO: come back after fixing the type for this.chartBodyG()
            let symbols = this.chartBodyG()
                .selectAll('path.symbol')
                .data(this.data());
            transition(symbols.exit(), this._conf.transitionDuration, this._conf.transitionDelay)
                .attr('opacity', 0)
                .remove();
            symbols = symbols
                .enter()
                .append('path')
                .attr('class', 'symbol')
                .attr('opacity', 0)
                .attr('fill', (d, i) => this._colorHelper.getColor(d, i))
                .attr('transform', d => this._locator(d))
                .merge(symbols);
            symbols.call(s => this._renderTitles(s, this.data()));
            symbols.each((d, i) => {
                this._filtered[i] =
                    !this.filter() || this.filter().isFiltered([this._conf.keyAccessor(d), d._value]);
            });
            transition(symbols, this._conf.transitionDuration, this._conf.transitionDelay)
                .attr('opacity', (d, i) => {
                if (!this._conf.existenceAccessor(d)) {
                    return this._conf.emptyOpacity;
                }
                else if (this._filtered[i]) {
                    return this._conf.nonemptyOpacity;
                }
                else {
                    return this._conf.excludedOpacity;
                }
            })
                .attr('fill', (d, i) => {
                if (this._conf.emptyColor && !this._conf.existenceAccessor(d)) {
                    return this._conf.emptyColor;
                }
                else if (this._conf.excludedColor && !this._filtered[i]) {
                    return this._conf.excludedColor;
                }
                else {
                    return this._colorHelper.getColor(d, undefined);
                }
            })
                .attr('transform', d => this._locator(d))
                .attr('d', this._symbol);
        }
        plotData() {
            if (this._conf.useCanvas) {
                this._plotOnCanvas();
            }
            else {
                this._plotOnSVG();
            }
        }
        _renderTitles(_symbol, _d) {
            if (this._conf.renderTitle) {
                _symbol.selectAll('title').remove();
                _symbol.append('title').text(d => this._conf.title(d));
            }
        }
        symbol(type) {
            if (!arguments.length) {
                return this._symbol.type();
            }
            this._symbol.type(type);
            return this;
        }
        customSymbol(customSymbol) {
            if (!arguments.length) {
                return this._symbol;
            }
            this._symbol = customSymbol;
            this._symbol.size((d, i) => this._elementSize(d, i));
            return this;
        }
        legendables() {
            // Argument to getColor is ignored by the default color accessor for this chart
            return [
                {
                    chart: this,
                    name: this.dataProvider().conf().groupName,
                    color: this._colorHelper.getColor(this.dataProvider().conf().groupName, undefined),
                },
            ];
        }
        legendHighlight(d) {
            if (this._conf.useCanvas) {
                this._plotOnCanvas(d); // Supply legend datum to plotOnCanvas
            }
            else {
                this._resizeSymbolsWhere(s => s.attr('fill') === d.color, this._conf.highlightedSize);
                this.chartBodyG()
                    .selectAll('.chart-body path.symbol')
                    .filter(function () {
                    return d3Selection.select(this).attr('fill') !== d.color;
                })
                    .classed('fadeout', true);
            }
        }
        legendReset(d) {
            if (this._conf.useCanvas) {
                this._plotOnCanvas(d); // Supply legend datum to plotOnCanvas
            }
            else {
                this._resizeSymbolsWhere(s => s.attr('fill') === d.color, this._conf.symbolSize);
                this.chartBodyG()
                    .selectAll('.chart-body path.symbol')
                    .filter(function () {
                    return d3Selection.select(this).attr('fill') !== d.color;
                })
                    .classed('fadeout', false);
            }
        }
        _resizeSymbolsWhere(condition, size) {
            const symbols = this.chartBodyG()
                .selectAll('.chart-body path.symbol')
                .filter(function () {
                return condition(d3Selection.select(this));
            });
            const oldSize = this._symbol.size();
            this._symbol.size(Math.pow(size, 2));
            transition(symbols, this._conf.transitionDuration, this._conf.transitionDelay).attr('d', this._symbol);
            this._symbol.size(oldSize);
        }
        _createBrushHandlePaths() {
            // no handle paths for poly-brushes
        }
        _extendBrush(brushSelection) {
            if (this._conf.round) {
                brushSelection[0] = brushSelection[0].map(this._conf.round);
                brushSelection[1] = brushSelection[1].map(this._conf.round);
            }
            return brushSelection;
        }
        _brushIsEmpty(brushSelection) {
            return (!brushSelection ||
                brushSelection[0][0] >= brushSelection[1][0] ||
                brushSelection[0][1] >= brushSelection[1][1]);
        }
        _brushing(evt) {
            if (this._ignoreBrushEvents) {
                return;
            }
            let brushSelection = evt.selection;
            // TODO: data type of brush selection changes after scale.invert, need to introduce one more variable
            // Testing with pixels is more reliable
            let brushIsEmpty = this._brushIsEmpty(brushSelection);
            if (brushSelection) {
                brushSelection = brushSelection.map(point => point.map((coord, i) => {
                    const scale = i === 0 ? this.x() : this.y();
                    return scale.invert(coord);
                }));
                brushSelection = this._extendBrush(brushSelection);
                // The rounding process might have made brushSelection empty, so we need to recheck
                brushIsEmpty = brushIsEmpty && this._brushIsEmpty(brushSelection);
            }
            this._redrawBrush(brushSelection, false);
            const ranged2DFilter = brushIsEmpty ? null : new RangedTwoDimensionalFilter(brushSelection);
            events.trigger(() => {
                this.replaceFilter(ranged2DFilter);
                this.redrawGroup();
            }, constants.EVENT_DELAY);
        }
        _redrawBrush(brushSelection, doTransition) {
            // override default x axis brush from parent chart
            const gBrush = this._gBrush;
            if (this._conf.brushOn && gBrush) {
                if (this.resizing()) {
                    this._setBrushExtents(doTransition);
                }
                if (!brushSelection) {
                    this._withoutBrushEvents(() => {
                        gBrush.call(this.brush().move, brushSelection);
                    });
                }
                else {
                    brushSelection = brushSelection.map(point => point.map((coord, i) => {
                        const scale = i === 0 ? this.x() : this.y();
                        return scale(coord);
                    }));
                    const gBrushWithTransition = optionalTransition(doTransition, this._conf.transitionDuration, this._conf.transitionDelay)(gBrush);
                    this._withoutBrushEvents(() => {
                        gBrushWithTransition.call(this.brush().move, brushSelection);
                    });
                }
            }
            this.fadeDeselectedArea(brushSelection);
        }
    }

    class ScatterPlot extends CoordinateGridMixinExt(ColorMixinExt(MarginMixinExt(BaseMixinExt(ScatterPlot$1)))) {
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
        }
        useCanvas(useCanvas) {
            if (!arguments.length) {
                return this._conf.useCanvas;
            }
            this.configure({ useCanvas: useCanvas });
            return this;
        }
        existenceAccessor(accessor) {
            if (!arguments.length) {
                return this._conf.existenceAccessor;
            }
            this.configure({ existenceAccessor: accessor });
            return this;
        }
        highlightedSize(highlightedSize) {
            if (!arguments.length) {
                return this._conf.highlightedSize;
            }
            this.configure({ highlightedSize: highlightedSize });
            return this;
        }
        excludedSize(excludedSize) {
            if (!arguments.length) {
                return this._conf.excludedSize;
            }
            this.configure({ excludedSize: excludedSize });
            return this;
        }
        excludedColor(excludedColor) {
            if (!arguments.length) {
                return this._conf.excludedColor;
            }
            this.configure({ excludedColor: excludedColor });
            return this;
        }
        excludedOpacity(excludedOpacity) {
            if (!arguments.length) {
                return this._conf.excludedOpacity;
            }
            this.configure({ excludedOpacity: excludedOpacity });
            return this;
        }
        emptySize(emptySize) {
            if (!arguments.length) {
                return this._conf.emptySize;
            }
            this.configure({ emptySize: emptySize });
            return this;
        }
        hiddenSize(emptySize) {
            if (!arguments.length) {
                return this.emptySize();
            }
            return this.emptySize(emptySize);
        }
        emptyColor(emptyColor) {
            if (!arguments.length) {
                return this._conf.emptyColor;
            }
            this.configure({ emptyColor: emptyColor });
            return this;
        }
        emptyOpacity(emptyOpacity) {
            if (!arguments.length) {
                return this._conf.emptyOpacity;
            }
            this.configure({ emptyOpacity: emptyOpacity });
            return this;
        }
        nonemptyOpacity(nonemptyOpacity) {
            if (!arguments.length) {
                return this._conf.emptyOpacity;
            }
            this.configure({ nonemptyOpacity: nonemptyOpacity });
            return this;
        }
        symbolSize(symbolSize) {
            if (!arguments.length) {
                return this._conf.symbolSize;
            }
            this.configure({ symbolSize: symbolSize });
            return this;
        }
    }
    const scatterPlot = (parent, chartGroup) => new ScatterPlot(parent, chartGroup);

    const SELECT_CSS_CLASS = 'dc-select-menu';
    const OPTION_CSS_CLASS = 'dc-select-option';
    /**
     * The select menu is a simple widget designed to filter a dimension by selecting an option from
     * an HTML `<select/>` menu. The menu can be optionally turned into a multiselect.
     */
    class SelectMenu$1 extends BaseMixin$1 {
        /**
         * Create a Select Menu.
         *
         * TODO update example
         *
         * @example
         * ```
         * // create a select menu under #select-container using the default global chart group
         * const select = new SelectMenu('#select-container')
         *                .dimension(states)
         *                .group(stateGroup);
         * // the option text can be set via the title() function
         * // by default the option text is '`key`: `value`'
         * select.title(function (d){
         *     return 'STATE: ' + d.key;
         * })
         * ```
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this.configure({
                multiple: false,
                promptText: 'Select all',
                promptValue: null,
                filterDisplayed: d => d._value > 0,
                order: (a, b) => d3Array.ascending(this._conf.keyAccessor(a), this._conf.keyAccessor(b)),
                numberVisible: null,
            });
            this._select = undefined;
        }
        configure(conf) {
            super.configure(conf);
            return this;
        }
        conf() {
            return this._conf;
        }
        data() {
            return super.data().filter(this._conf.filterDisplayed);
        }
        _doRender() {
            this.select('select').remove();
            this._select = this.root().append('select').classed(SELECT_CSS_CLASS, true);
            this._select.append('option').text(this._conf.promptText).attr('value', '');
            this._doRedraw();
            return this;
        }
        _doRedraw() {
            this._setAttributes();
            this._renderOptions();
            // select the option(s) corresponding to current filter(s)
            if (this.hasFilter() && this._conf.multiple) {
                this._select
                    .selectAll('option')
                    .property('selected', d => typeof d !== 'undefined' &&
                    this.filters().indexOf(String(this._conf.keyAccessor(d))) >= 0);
            }
            else if (this.hasFilter()) {
                this._select.property('value', this.filter());
            }
            else {
                this._select.property('value', '');
            }
            return this;
        }
        _renderOptions() {
            const options = this._select
                .selectAll(`option.${OPTION_CSS_CLASS}`)
                .data(this.data(), d => this._conf.keyAccessor(d));
            options.exit().remove();
            options
                .enter()
                .append('option')
                .classed(OPTION_CSS_CLASS, true)
                .attr('value', d => this._conf.keyAccessor(d))
                .merge(options)
                .text(this._conf.title);
            this._select.selectAll(`option.${OPTION_CSS_CLASS}`).sort(this._conf.order);
            this._select.on('change', (evt, d) => this._onChange(d, evt));
        }
        _onChange(_d, evt) {
            let values;
            const target = evt.target;
            if (target.selectedOptions) {
                const selectedOptions = Array.prototype.slice.call(target.selectedOptions);
                values = selectedOptions.map(d => d.value);
            }
            else {
                // IE and other browsers do not support selectedOptions
                // adapted from this polyfill: https://gist.github.com/brettz9/4212217
                const options = [].slice.call(evt.target.options);
                values = options.filter(option => option.selected).map(option => option.value);
            }
            // console.log(values);
            // check if only prompt option is selected
            if (values.length === 1 && values[0] === '') {
                values = this._conf.promptValue || null;
            }
            else if (!this._conf.multiple && values.length === 1) {
                values = values[0];
            }
            this.onChange(values);
        }
        onChange(val) {
            if (val && this._conf.multiple) {
                this.replaceFilter([val]);
            }
            else if (val) {
                this.replaceFilter(val);
            }
            else {
                this.filterAll();
            }
            events.trigger(() => {
                this.redrawGroup();
            });
        }
        _setAttributes() {
            if (this._conf.multiple) {
                this._select.attr('multiple', true);
            }
            else {
                this._select.attr('multiple', null);
            }
            if (this._conf.numberVisible !== null) {
                this._select.attr('size', this._conf.numberVisible);
            }
            else {
                this._select.attr('size', null);
            }
        }
    }

    class SelectMenu extends BaseMixinExt(SelectMenu$1) {
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
        }
        order(order) {
            if (!arguments.length) {
                return this._conf.order;
            }
            this.configure({ order: order });
            return this;
        }
        promptText(promptText) {
            if (!arguments.length) {
                return this._conf.promptText;
            }
            this.configure({ promptText: promptText });
            return this;
        }
        filterDisplayed(filterDisplayed) {
            if (!arguments.length) {
                return this._conf.filterDisplayed;
            }
            this.configure({ filterDisplayed: filterDisplayed });
            return this;
        }
        multiple(multiple) {
            if (!arguments.length) {
                return this._conf.multiple;
            }
            this.configure({ multiple: multiple });
            return this;
        }
        promptValue(promptValue) {
            if (!arguments.length) {
                return this._conf.promptValue;
            }
            this.configure({ promptValue: promptValue });
            return this;
        }
        numberVisible(numberVisible) {
            if (!arguments.length) {
                return this._conf.numberVisible;
            }
            this.configure({ numberVisible: numberVisible });
            return this;
        }
        size(numberVisible) {
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
     * - {@link http://dc-js.github.io/dc.js/examples/series.html | Series Chart}
     */
    class SeriesChart$1 extends CompositeChart$1 {
        /**
         * Create a Series Chart.
         *
         * TODO update example
         *
         * @example
         * ```
         * // create a series chart under #chart-container1 element using the default global chart group
         * const seriesChart1 = new SeriesChart("#chart-container1");
         * // create a series chart under #chart-container2 element using chart group A
         * const seriesChart2 = new SeriesChart("#chart-container2", "chartGroupA");
         * ```
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            // This must precede the call to configure as that trigger _resetChildren which needs _charts to be a hash
            this._charts = {};
            this.configure({
                shareColors: true,
                chartFunction: (p, cg) => new LineChart$1(p, cg),
                seriesAccessor: undefined,
                seriesSort: d3Array.ascending,
                valueSort: (a, b) => d3Array.ascending(this._conf.keyAccessor(a), this._conf.keyAccessor(b)),
            });
            this._mandatoryAttributes().push('seriesAccessor', 'chart');
        }
        configure(conf) {
            super.configure(conf);
            // TODO: This is defensive, looking at the code - 'seriesAccessor', 'seriesSort', 'valueSort' do not need it
            if (['chartFunction', 'seriesAccessor', 'seriesSort', 'valueSort'].some(opt => opt in conf)) {
                this._resetChildren();
            }
            return this;
        }
        conf() {
            return this._conf;
        }
        _compose(subChartArray) {
            super.compose(subChartArray);
        }
        compose(subChartArray) {
            throw new Error('Not supported for this chart type');
        }
        _preprocessData() {
            const keep = [];
            let childrenChanged;
            // create a defensive copy before sorting
            let entries = [...this.data()].sort(this._conf.valueSort);
            const nesting = d3Array.groups(entries, this._conf.seriesAccessor)
                .sort(this._conf.seriesSort)
                .map(e => ({
                // The code expects key and values as attributes
                key: `${e[0]}`,
                values: e[1],
            }));
            const children = nesting.map((sub, i) => {
                const subChart = this._charts[sub.key] || this._conf.chartFunction(this, this.chartGroup());
                if (!this._charts[sub.key]) {
                    childrenChanged = true;
                }
                this._charts[sub.key] = subChart;
                keep.push(sub.key);
                subChart.dataProvider().configure({
                    dimension: this.dataProvider().conf().dimension,
                    valueAccessor: this.dataProvider().conf().valueAccessor,
                    groupName: sub.key,
                    group: {
                        all: typeof sub.values === 'function' ? sub.values : () => sub.values,
                    },
                });
                subChart.configure({
                    keyAccessor: this._conf.keyAccessor,
                });
                return subChart.configure({ brushOn: false });
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
        _clearChart(c) {
            if (this._charts[c].g()) {
                this._charts[c].g().remove();
            }
            delete this._charts[c];
        }
        _resetChildren() {
            Object.keys(this._charts).map(this._clearChart);
            this._charts = {};
        }
    }

    class SeriesChart extends CompositeChartExt(CoordinateGridMixinExt(ColorMixinExt(MarginMixinExt(BaseMixinExt(SeriesChart$1))))) {
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
        }
        chart(chartFunction) {
            if (!arguments.length) {
                return this._conf.chartFunction;
            }
            this.configure({ chartFunction: chartFunction });
            return this;
        }
        seriesAccessor(accessor) {
            if (!arguments.length) {
                return this._conf.seriesAccessor;
            }
            this.configure({ seriesAccessor: accessor });
            return this;
        }
        seriesSort(sortFunction) {
            if (!arguments.length) {
                return this._conf.seriesSort;
            }
            this.configure({ seriesSort: sortFunction });
            return this;
        }
        valueSort(sortFunction) {
            if (!arguments.length) {
                return this._conf.valueSort;
            }
            this.configure({ valueSort: sortFunction });
            return this;
        }
    }
    const seriesChart = (parent, chartGroup) => new SeriesChart(parent, chartGroup);

    const DEFAULT_MIN_ANGLE_FOR_LABEL = 0.5;
    /**
     * The sunburst chart implementation is usually used to visualize a small tree distribution.  The sunburst
     * chart uses keyAccessor to determine the slices, and valueAccessor to calculate the size of each
     * slice relative to the sum of all values.
     * Slices are ordered by {@link ICFSimpleAdapterConf.ordering | ordering} which defaults to sorting by key.
     *
     * The keys used in the sunburst chart should be arrays, representing paths in the tree.
     *
     * When filtering, the sunburst chart creates instances of {@link HierarchyFilter}.
     *
     */
    class SunburstChart$1 extends ColorMixin$1(BaseMixin$1) {
        /**
         * Create a Sunburst Chart
         *
         * TODO update example
         *
         * @example
         * ```
         * // create a sunburst chart under #chart-container1 element using the default global chart group
         * const chart1 = new SunburstChart('#chart-container1');
         * // create a sunburst chart under #chart-container2 element using chart group A
         * const chart2 = new SunburstChart('#chart-container2', 'chartGroupA');
         * ```
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this.configure({
                colorAccessor: d => this._conf.keyAccessor(d),
                label: d => this._conf.keyAccessor(d),
                renderLabel: true,
                title: d => `${this._conf.keyAccessor(d)}: ${this._extendedValueAccessor(d)}`,
                transitionDuration: 350,
                emptyTitle: 'empty',
                radius: undefined,
                innerRadius: 0,
                ringSizes: this.defaultRingSizes(),
                minAngleForLabel: DEFAULT_MIN_ANGLE_FOR_LABEL,
                externalLabels: undefined,
            });
            this.dataProvider().configure({
                ordering: d => d.key, // override cap mixin // TODO: not needed, does not mix CapMixin any longer
            });
            this._sliceCssClass = 'pie-slice';
            this._emptyCssClass = 'empty-chart';
            this._computedRadius = undefined;
            this._g = undefined;
            this._cx = undefined;
            this._cy = undefined;
        }
        configure(conf) {
            super.configure(conf);
            return this;
        }
        conf() {
            return this._conf;
        }
        // Handle cases if value corresponds to generated parent nodes
        _extendedValueAccessor(d) {
            if (d.path) {
                return d.value;
            }
            return d._value;
        }
        _scaleRadius(ringIndex, y) {
            if (ringIndex === 0) {
                return this._conf.innerRadius;
            }
            else {
                const customRelativeRadius = d3Array.sum(this._relativeRingSizes.slice(0, ringIndex));
                const scaleFactor = (ringIndex * (1 / this._relativeRingSizes.length)) / customRelativeRadius;
                const standardRadius = ((y - this._rootOffset) / (1 - this._rootOffset)) *
                    (this._computedRadius - this._conf.innerRadius);
                return this._conf.innerRadius + standardRadius / scaleFactor;
            }
        }
        _doRender() {
            this.resetSvg();
            this._g = this.svg().append('g').attr('transform', `translate(${this.cx()},${this.cy()})`);
            this._drawChart();
            return this;
        }
        _drawChart() {
            // set radius from chart size if none given, or if given radius is too large
            const maxRadius = d3Array.min([this.width(), this.height()]) / 2;
            this._computedRadius =
                this._conf.radius && this._conf.radius < maxRadius ? this._conf.radius : maxRadius;
            const arcs = this._buildArcs();
            let partitionedNodes;
            let cdata;
            // if we have data...
            // @ts-ignore
            if (d3Array.sum(this.data(), d => d._value)) {
                cdata = toHierarchy(this.data(), d => d._value);
                partitionedNodes = this._partitionNodes(cdata);
                // First one is the root, which is not needed
                partitionedNodes.nodes.shift();
                this._g.classed(this._emptyCssClass, false);
            }
            else {
                // otherwise we'd be getting NaNs, so override
                // note: abuse others for its ignoring the value accessor
                cdata = toHierarchy([], d => d.value);
                partitionedNodes = this._partitionNodes(cdata);
                this._g.classed(this._emptyCssClass, true);
            }
            this._rootOffset = partitionedNodes.rootOffset;
            this._relativeRingSizes = partitionedNodes.relativeRingSizes;
            // TODO: probably redundant check, this will always be true
            if (this._g) {
                const slices = this._g
                    .selectAll(`g.${this._sliceCssClass}`)
                    .data(partitionedNodes.nodes);
                this._createElements(slices, arcs, partitionedNodes.nodes);
                this._updateElements(partitionedNodes.nodes, arcs);
                this._removeElements(slices);
                this._highlightFilter();
                transition(this._g, this._conf.transitionDuration, this._conf.transitionDelay).attr('transform', `translate(${this.cx()},${this.cy()})`);
            }
        }
        _createElements(slices, arcs, sunburstData) {
            const slicesEnter = this._createSliceNodes(slices);
            this._createSlicePath(slicesEnter, arcs);
            this._createTitles(slicesEnter);
            this._createLabels(sunburstData, arcs);
        }
        _createSliceNodes(slices) {
            return slices
                .enter()
                .append('g')
                .attr('class', (d, i) => `${this._sliceCssClass} _${i} ${this._sliceCssClass}-level-${d.depth}`);
        }
        _createSlicePath(slicesEnter, arcs) {
            const slicePath = slicesEnter
                .append('path')
                .attr('fill', (d, i) => this._fill(d, i))
                .on('click', (evt, d) => this.onClick(d))
                .attr('d', d => this._safeArc(arcs, d));
            const tranNodes = transition(slicePath, this._conf.transitionDuration);
            if (tranNodes.attrTween) {
                const chart = this;
                tranNodes.attrTween('d', function (d) {
                    return chart._tweenSlice(d, this);
                });
            }
        }
        _createTitles(slicesEnter) {
            if (this._conf.renderTitle) {
                slicesEnter.append('title').text(d => this._conf.title(d));
            }
        }
        _positionLabels(labelsEnter, arcs) {
            transition(labelsEnter, this._conf.transitionDuration)
                .attr('transform', d => this._labelPosition(d, arcs))
                .attr('text-anchor', 'middle')
                .text(d => {
                // position label...
                if (this._sliceHasNoData(d) || this._sliceTooSmall(d)) {
                    return '';
                }
                return this._conf.label(d);
            });
        }
        _createLabels(sunburstData, arcs) {
            if (this._conf.renderLabel) {
                const labels = this._g
                    .selectAll(`text.${this._sliceCssClass}`)
                    .data(sunburstData);
                labels.exit().remove();
                const labelsEnter = labels
                    .enter()
                    .append('text')
                    .attr('class', (d, i) => {
                    let classes = `${this._sliceCssClass} _${i}`;
                    if (this._conf.externalLabels) {
                        classes += ' external';
                    }
                    return classes;
                })
                    .on('click', (evt, d) => this.onClick(d));
                this._positionLabels(labelsEnter, arcs);
            }
        }
        _updateElements(sunburstData, arcs) {
            this._updateSlicePaths(sunburstData, arcs);
            this._updateLabels(sunburstData, arcs);
            this._updateTitles(sunburstData);
        }
        _updateSlicePaths(sunburstData, arcs) {
            const slicePaths = this._g
                .selectAll(`g.${this._sliceCssClass}`)
                .data(sunburstData)
                .select('path')
                .attr('d', (d, i) => this._safeArc(arcs, d));
            const tranNodes = transition(slicePaths, this._conf.transitionDuration);
            if (tranNodes.attrTween) {
                const chart = this;
                tranNodes.attrTween('d', function (d) {
                    return chart._tweenSlice(d, this);
                });
            }
            tranNodes.attr('fill', (d, i) => this._fill(d, i));
        }
        _updateLabels(sunburstData, arcs) {
            if (this._conf.renderLabel) {
                const labels = this._g
                    .selectAll(`text.${this._sliceCssClass}`)
                    .data(sunburstData);
                this._positionLabels(labels, arcs);
            }
        }
        _updateTitles(sunburstData) {
            if (this._conf.renderTitle) {
                this._g
                    .selectAll(`g.${this._sliceCssClass}`)
                    .data(sunburstData)
                    .select('title')
                    .text(d => this._conf.title(d));
            }
        }
        _removeElements(slices) {
            slices.exit().remove();
        }
        _highlightFilter() {
            const chart = this;
            if (chart.hasFilter()) {
                chart.selectAll(`g.${chart._sliceCssClass}`).each(function (d) {
                    if (chart._isSelectedSlice(d)) {
                        chart.highlightSelected(this);
                    }
                    else {
                        chart.fadeDeselected(this);
                    }
                });
            }
            else {
                chart.selectAll(`g.${chart._sliceCssClass}`).each(function (d) {
                    chart.resetHighlight(this);
                });
            }
        }
        cx(cx) {
            if (!arguments.length) {
                return this._cx || this.width() / 2;
            }
            this._cx = cx;
            return this;
        }
        cy(cy) {
            if (!arguments.length) {
                return this._cy || this.height() / 2;
            }
            this._cy = cy;
            return this;
        }
        /**
         * Constructs the default RingSizes parameter for {@link ISunburstChartConf.ringSizes},
         * which makes the rings narrower as they get farther away from the center.
         *
         * Can be used as a parameter to ringSizes() to reset the default behavior, or modified for custom ring sizes.
         *
         * @example
         * ```
         *   const chart = new dc.SunburstChart(...);
         *   chart.ringSizes(chart.defaultRingSizes())
         * ```
         */
        defaultRingSizes() {
            return {
                partitionDy: () => this._computedRadius * this._computedRadius,
                scaleInnerRadius: d => d.data.path && d.data.path.length === 1 ? this._conf.innerRadius : Math.sqrt(d.y0),
                scaleOuterRadius: d => Math.sqrt(d.y1),
                relativeRingSizesFunction: () => [],
            };
        }
        /**
         * Constructs a RingSizes parameter for {@link ISunburstChartConf.ringSizes}
         * that will make the chart rings equally wide.
         *
         * @example
         * ```
         *   const chart = new dc.SunburstChart(...);
         *   chart.ringSizes(chart.equalRingSizes())
         * ```
         */
        equalRingSizes() {
            return this.relativeRingSizes(ringCount => {
                const result = [];
                for (let i = 0; i < ringCount; i++) {
                    result.push(1 / ringCount);
                }
                return result;
            });
        }
        /**
         * Constructs a RingSizes parameter for {@link ISunburstChartConf.ringSizes} using the given function
         * to determine each rings width.
         *
         * * The function must return an array containing portion values for each ring/level of the chart.
         * * The length of the array must match the number of rings of the chart at runtime, which is provided as the only
         *   argument.
         * * The sum of all portions from the array must be 1 (100%).
         *
         * @example
         * ```
         * // specific relative portions (the number of rings (3) is known in this case)
         * chart.ringSizes(chart.relativeRingSizes(function (ringCount) {
         *     return [.1, .3, .6];
         * });
         * ```
         */
        relativeRingSizes(relativeRingSizesFunction) {
            function assertPortionsArray(relativeSizes, numberOfRings) {
                if (!Array.isArray(relativeSizes)) {
                    throw new BadArgumentException('relativeRingSizes function must return an array');
                }
                const portionsSum = d3Array.sum(relativeSizes);
                if (Math.abs(portionsSum - 1) > constants.NEGLIGIBLE_NUMBER) {
                    throw new BadArgumentException(`relativeRingSizes : portions must add up to 1, but sum was ${portionsSum}`);
                }
                if (relativeSizes.length !== numberOfRings) {
                    throw new BadArgumentException(`relativeRingSizes : number of values must match number of rings (${numberOfRings}) but was ${relativeSizes.length}`);
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
                },
            };
        }
        _buildArcs() {
            return d3Shape.arc()
                .startAngle((d) => d.x0) // TODO: revisit and look for proper typing
                .endAngle((d) => d.x1) // TODO: revisit and look for proper typing
                .innerRadius(d => this._conf.ringSizes.scaleInnerRadius(d))
                .outerRadius(d => this._conf.ringSizes.scaleOuterRadius(d));
        }
        _isSelectedSlice(d) {
            return this._isPathFiltered(d.path);
        }
        _isPathFiltered(path) {
            for (let i = 0; i < this.filters().length; i++) {
                const currentFilter = this.filters()[i];
                if (currentFilter.isFiltered(path)) {
                    return true;
                }
            }
            return false;
        }
        // returns all filters that are a parent or child of the path
        _filtersForPath(path) {
            const pathFilter = new HierarchyFilter(path);
            const filtersList = [];
            for (let i = 0; i < this.filters().length; i++) {
                const currentFilter = this.filters()[i];
                if (currentFilter.isFiltered(path) || pathFilter.isFiltered(currentFilter)) {
                    filtersList.push(currentFilter);
                }
            }
            return filtersList;
        }
        _doRedraw() {
            this._drawChart();
            return this;
        }
        _partitionNodes(data) {
            const getSortable = function (d) {
                return { key: d.data.key, value: d.value };
            };
            const ordering = this.dataProvider().conf().ordering;
            const _hierarchy = d3Hierarchy.hierarchy(data)
                .sum(d => (d.children ? 0 : this._extendedValueAccessor(d)))
                .sort((a, b) => d3Array.ascending(ordering(getSortable(a)), ordering(getSortable(b))));
            const _partition = d3Hierarchy.partition().size([2 * Math.PI, this._conf.ringSizes.partitionDy()]);
            _partition(_hierarchy);
            // In D3v4 the returned data is slightly different, change it enough to suit our purposes.
            const nodes = _hierarchy.descendants().map(d => {
                // TODO: find a better way to augment `.key`; which is not part of the current type (HierarchyNode)
                // @ts-ignore
                d.key = d.data.key;
                d.path = d.data.path;
                return d;
            });
            const relativeSizes = this._conf.ringSizes.relativeRingSizesFunction(_hierarchy.height);
            return {
                nodes,
                // TODO: find a better way to augment `.y1`; which is not part of the current type (HierarchyNode)
                // @ts-ignore
                rootOffset: _hierarchy.y1,
                relativeRingSizes: relativeSizes,
            };
        }
        _sliceTooSmall(d) {
            const angle = d.x1 - d.x0;
            return isNaN(angle) || angle < this._conf.minAngleForLabel;
        }
        _sliceHasNoData(d) {
            return this._extendedValueAccessor(d) === 0;
        }
        _isOffCanvas(d) {
            return !d || isNaN(d.x0) || isNaN(d.y0);
        }
        _fill(d, i) {
            return this._colorHelper.getColor(d.data, i);
        }
        onClick(d, i) {
            if (this._g.attr('class') === this._emptyCssClass) {
                return;
            }
            // Must be better way to handle this, in legends we need to access `d.key`
            const path = d.path || d.key;
            const filter = new HierarchyFilter(path);
            // filters are equal to, parents or children of the path.
            const filtersList = this._filtersForPath(path);
            let exactMatch = false;
            // clear out any filters that cover the path filtered.
            for (let j = filtersList.length - 1; j >= 0; j--) {
                const currentFilter = filtersList[j];
                if (arraysIdentical(currentFilter, path)) {
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
        _safeArc(_arc, d) {
            let path = _arc(d);
            if (path.indexOf('NaN') >= 0) {
                path = 'M0,0';
            }
            return path;
        }
        _labelPosition(d, _arc) {
            let centroid;
            if (this._conf.externalLabels) {
                centroid = d3Shape.arc()
                    .outerRadius(this._computedRadius + this._conf.externalLabels)
                    .innerRadius(this._computedRadius + this._conf.externalLabels)
                    .centroid(d);
            }
            else {
                centroid = _arc.centroid(d);
            }
            if (isNaN(centroid[0]) || isNaN(centroid[1])) {
                return 'translate(0,0)';
            }
            else {
                return `translate(${centroid})`;
            }
        }
        legendables() {
            return this.data().map((d, i) => {
                const legendable = {
                    name: d.key,
                    data: d.value,
                    others: d.others,
                    chart: this,
                };
                legendable.color = this._colorHelper.getColor(d, i);
                return legendable;
            });
        }
        legendHighlight(d) {
            this._highlightSliceFromLegendable(d, true);
        }
        legendReset(d) {
            this._highlightSliceFromLegendable(d, false);
        }
        legendToggle(d) {
            this.onClick({ key: d.name, others: d.others });
        }
        _highlightSliceFromLegendable(legendable, highlighted) {
            this.selectAll('g.pie-slice').each(function (d) {
                if (legendable.name === d.key) {
                    d3Selection.select(this).classed('highlight', highlighted);
                }
            });
        }
        _tweenSlice(d, element) {
            let current = element._current;
            if (this._isOffCanvas(current)) {
                current = { x0: 0, x1: 0, y0: 0, y1: 0 };
            }
            const tweenTarget = {
                x0: d.x0,
                x1: d.x1,
                y0: d.y0,
                y1: d.y1,
            };
            const i = d3Interpolate.interpolate(current, tweenTarget);
            element._current = i(0);
            return t => this._safeArc(this._buildArcs(), Object.assign({}, d, i(t)));
        }
    }

    class SunburstChart extends ColorMixinExt(BaseMixinExt(SunburstChart$1)) {
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
        }
        innerRadius(innerRadius) {
            if (!arguments.length) {
                return this._conf.innerRadius;
            }
            this.configure({ innerRadius: innerRadius });
            return this;
        }
        radius(radius) {
            if (!arguments.length) {
                return this._conf.radius;
            }
            this.configure({ radius: radius });
            return this;
        }
        minAngleForLabel(minAngleForLabel) {
            if (!arguments.length) {
                return this._conf.minAngleForLabel;
            }
            this.configure({ minAngleForLabel: minAngleForLabel });
            return this;
        }
        emptyTitle(title) {
            if (arguments.length === 0) {
                return this._conf.emptyTitle;
            }
            this.configure({ emptyTitle: title });
            return this;
        }
        externalLabels(externalLabels) {
            if (arguments.length === 0) {
                return this._conf.externalLabels;
            }
            else if (externalLabels) {
                this.configure({ externalLabels: externalLabels });
            }
            else {
                this.configure({ externalLabels: undefined });
            }
            return this;
        }
        ringSizes(ringSizes) {
            if (!arguments.length) {
                return this._conf.ringSizes;
            }
            this.configure({ ringSizes: ringSizes });
            return this;
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
     */
    class TextFilterWidget$1 extends BaseMixin$1 {
        /**
         * Create Text Filter widget
         *
         * @example
         * ```
         * const data = [{"firstName":"John","lastName":"Coltrane"}{"firstName":"Miles",lastName:"Davis"}]
         * const ndx = crossfilter(data);
         * const dimension = ndx.dimension(d => `${d.lastName.toLowerCase()} ${d.firstName.toLowerCase()}`);
         *
         * new TextFilterWidget('#search')
         *     .dimension(dimension);
         *     // you don't need the group() function
         * ```
         */
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
            this.configure({
                placeHolder: 'search',
                normalize: s => s.toLowerCase(),
                filterFunctionFactory: query => {
                    query = this._conf.normalize(query);
                    return d => this._conf.normalize(d).indexOf(query) !== -1;
                },
            });
        }
        configure(conf) {
            super.configure(conf);
            return this;
        }
        conf() {
            return this._conf;
        }
        _doRender() {
            this.select('input').remove();
            this._input = this.root().append('input').classed(INPUT_CSS_CLASS, true);
            const chart = this;
            this._input.on('input', function () {
                chart
                    .dataProvider()
                    .conf()
                    .dimension.filterFunction(chart._conf.filterFunctionFactory(this.value));
                events.trigger(() => {
                    chart.redrawGroup();
                }, constants.EVENT_DELAY);
            });
            this._doRedraw();
            return this;
        }
        _doRedraw() {
            this.root().selectAll('input').attr('placeholder', this._conf.placeHolder);
            return this;
        }
    }

    class TextFilterWidget extends BaseMixinExt(TextFilterWidget$1) {
        constructor(parent, chartGroup) {
            super(parent, chartGroup);
        }
        normalize(normalize) {
            if (!arguments.length) {
                return this._conf.normalize;
            }
            this.configure({ normalize: normalize });
            return this;
        }
        placeHolder(placeHolder) {
            if (!arguments.length) {
                return this._conf.placeHolder;
            }
            this.configure({ placeHolder: placeHolder });
            return this;
        }
        filterFunctionFactory(filterFunctionFactory) {
            if (!arguments.length) {
                return this._conf.filterFunctionFactory;
            }
            this.configure({ filterFunctionFactory: filterFunctionFactory });
            return this;
        }
    }
    const textFilterWidget = (parent, chartGroup) => new TextFilterWidget(parent, chartGroup);

    /**
     * htmlLegend is a attachable widget that can be added to other dc charts to render horizontal/vertical legend
     * labels.
     *
     * @example
     * ```
     * chart.legend(HtmlLegend().container(legendContainerElement).horizontal(false))
     * ```
     */
    class HtmlLegend$1 {
        constructor() {
            this._htmlLegendDivCssClass = 'dc-html-legend';
            this._legendItemCssClassHorizontal = 'dc-legend-item-horizontal';
            this._legendItemCssClassVertical = 'dc-legend-item-vertical';
            this._parent = undefined;
            this._container = undefined;
            this._legendText = d => d.name;
            this._maxItems = undefined;
            this._horizontal = false;
            this._legendItemClass = undefined;
            this._highlightSelected = false;
        }
        parent(p) {
            if (!arguments.length) {
                return this._parent;
            }
            this._parent = p;
            return this;
        }
        render() {
            const defaultLegendItemCssClass = this._horizontal
                ? this._legendItemCssClassHorizontal
                : this._legendItemCssClassVertical;
            this._container.select(`div.${this._htmlLegendDivCssClass}`).remove();
            const container = this._container.append('div').attr('class', this._htmlLegendDivCssClass);
            container.attr('style', `max-width:${this._container.nodes()[0].style.width}`);
            let legendables = this._parent.legendables();
            const filters = this._parent.filters();
            if (this._maxItems !== undefined) {
                legendables = legendables.slice(0, this._maxItems);
            }
            const legendItemClassName = this._legendItemClass
                ? this._legendItemClass
                : defaultLegendItemCssClass;
            const itemEnter = container
                .selectAll(`div.${legendItemClassName}`)
                .data(legendables)
                .enter()
                .append('div')
                .classed(legendItemClassName, true)
                .on('mouseover', (evt, d) => this._parent.legendHighlight(d))
                .on('mouseout', (evt, d) => this._parent.legendReset(d))
                .on('click', (evt, d) => this._parent.legendToggle(d));
            if (this._highlightSelected) {
                // TODO: fragile code - there may be other types of filters
                itemEnter.classed(constants.SELECTED_CLASS, d => filters.indexOf(d.name) !== -1);
            }
            itemEnter
                .append('span')
                .attr('class', 'dc-legend-item-color')
                .style('background-color', d => d.color);
            itemEnter
                .append('span')
                .attr('class', 'dc-legend-item-label')
                .attr('title', this._legendText)
                .text(this._legendText);
        }
        container(container) {
            if (!arguments.length) {
                return this._container;
            }
            this._container = d3Selection.select(container);
            return this;
        }
        legendItemClass(legendItemClass) {
            if (!arguments.length) {
                return this._legendItemClass;
            }
            this._legendItemClass = legendItemClass;
            return this;
        }
        highlightSelected(highlightSelected) {
            if (!arguments.length) {
                return this._highlightSelected;
            }
            this._highlightSelected = highlightSelected;
            return this;
        }
        horizontal(horizontal) {
            if (!arguments.length) {
                return this._horizontal;
            }
            this._horizontal = horizontal;
            return this;
        }
        legendText(legendText) {
            if (!arguments.length) {
                return this._legendText;
            }
            this._legendText = legendText;
            return this;
        }
        maxItems(maxItems) {
            if (!arguments.length) {
                return this._maxItems;
            }
            this._maxItems = isNumber(maxItems) ? maxItems : undefined;
            return this;
        }
    }

    class HtmlLegend extends HtmlLegend$1 {
        constructor() {
            super();
        }
    }
    const htmlLegend = () => new HtmlLegend();

    const LABEL_GAP = 2;
    /**
     * Legend is a attachable widget that can be added to other dc charts to render horizontal legend
     * labels.
     *
     * Examples:
     * - {@link http://dc-js.github.com/dc.js/ | Nasdaq 100 Index}
     * - {@link http://dc-js.github.com/dc.js/crime/index.html | Canadian City Crime Stats}
     * @example
     * ```
     * chart.legend(new Legend().x(400).y(10).itemHeight(13).gap(5))
     * ```
     */
    class Legend$1 {
        constructor() {
            this._parent = undefined;
            this._x = 0;
            this._y = 0;
            this._itemHeight = 12;
            this._gap = 5;
            this._horizontal = false;
            this._legendWidth = 560;
            this._itemWidth = 70;
            this._autoItemWidth = false;
            this._legendText = d => d.name;
            this._maxItems = undefined;
            this._highlightSelected = false;
            this._g = undefined;
        }
        parent(p) {
            if (!arguments.length) {
                return this._parent;
            }
            this._parent = p;
            return this;
        }
        x(x) {
            if (!arguments.length) {
                return this._x;
            }
            this._x = x;
            return this;
        }
        y(y) {
            if (!arguments.length) {
                return this._y;
            }
            this._y = y;
            return this;
        }
        gap(gap) {
            if (!arguments.length) {
                return this._gap;
            }
            this._gap = gap;
            return this;
        }
        highlightSelected(highlightSelected) {
            if (!arguments.length) {
                return this._highlightSelected;
            }
            this._highlightSelected = highlightSelected;
            return this;
        }
        itemHeight(itemHeight) {
            if (!arguments.length) {
                return this._itemHeight;
            }
            this._itemHeight = itemHeight;
            return this;
        }
        horizontal(horizontal) {
            if (!arguments.length) {
                return this._horizontal;
            }
            this._horizontal = horizontal;
            return this;
        }
        legendWidth(legendWidth) {
            if (!arguments.length) {
                return this._legendWidth;
            }
            this._legendWidth = legendWidth;
            return this;
        }
        itemWidth(itemWidth) {
            if (!arguments.length) {
                return this._itemWidth;
            }
            this._itemWidth = itemWidth;
            return this;
        }
        autoItemWidth(autoItemWidth) {
            if (!arguments.length) {
                return this._autoItemWidth;
            }
            this._autoItemWidth = autoItemWidth;
            return this;
        }
        legendText(legendText) {
            if (!arguments.length) {
                return this._legendText;
            }
            this._legendText = legendText;
            return this;
        }
        maxItems(maxItems) {
            if (!arguments.length) {
                return this._maxItems;
            }
            this._maxItems = isNumber(maxItems) ? maxItems : undefined;
            return this;
        }
        // Implementation methods
        _legendItemHeight() {
            return this._gap + this._itemHeight;
        }
        render() {
            this._parent.svg().select('g.dc-legend').remove();
            this._g = this._parent
                .svg()
                .append('g')
                .attr('class', 'dc-legend')
                .attr('transform', `translate(${this._x},${this._y})`);
            let legendables = this._parent.legendables();
            const filters = this._parent.filters();
            if (this._maxItems !== undefined) {
                legendables = legendables.slice(0, this._maxItems);
            }
            const itemEnter = this._g
                .selectAll('g.dc-legend-item')
                .data(legendables)
                .enter()
                .append('g')
                .attr('class', 'dc-legend-item')
                .on('mouseover', (evt, d) => {
                this._parent.legendHighlight(d);
            })
                .on('mouseout', (evt, d) => {
                this._parent.legendReset(d);
            })
                .on('click', (evt, d) => {
                d.chart.legendToggle(d);
            });
            if (this._highlightSelected) {
                // TODO: fragile code - there may be other types of filters
                itemEnter.classed(constants.SELECTED_CLASS, d => filters.indexOf(d.name) !== -1);
            }
            this._g
                .selectAll('g.dc-legend-item')
                .classed('fadeout', d => d.chart.isLegendableHidden(d));
            if (legendables.some(d => d.dashstyle)) {
                itemEnter
                    .append('line')
                    .attr('x1', 0)
                    .attr('y1', this._itemHeight / 2)
                    .attr('x2', this._itemHeight)
                    .attr('y2', this._itemHeight / 2)
                    .attr('stroke-width', 2)
                    .attr('stroke-dasharray', d => d.dashstyle)
                    .attr('stroke', d => d.color);
            }
            else {
                itemEnter
                    .append('rect')
                    .attr('width', this._itemHeight)
                    .attr('height', this._itemHeight)
                    .attr('fill', d => (d ? d.color : 'blue'));
            }
            {
                const self = this;
                itemEnter
                    .append('text')
                    .text(self._legendText)
                    .attr('x', self._itemHeight + LABEL_GAP)
                    .attr('y', function () {
                    const clientHeight = this.getBoundingClientRect().height || 13;
                    return self._itemHeight / 2 + clientHeight / 2 - 2;
                });
            }
            let cumulativeLegendTextWidth = 0;
            let row = 0;
            {
                const self = this;
                itemEnter.attr('transform', function (d, i) {
                    if (self._horizontal) {
                        const itemWidth = self._autoItemWidth === true
                            ? this.getBBox().width + self._gap
                            : self._itemWidth;
                        if (cumulativeLegendTextWidth + itemWidth > self._legendWidth &&
                            cumulativeLegendTextWidth > 0) {
                            ++row;
                            cumulativeLegendTextWidth = 0;
                        }
                        const translateBy = `translate(${cumulativeLegendTextWidth},${row * self._legendItemHeight()})`;
                        cumulativeLegendTextWidth += itemWidth;
                        return translateBy;
                    }
                    else {
                        return `translate(0,${i * self._legendItemHeight()})`;
                    }
                });
            }
        }
    }

    class Legend extends Legend$1 {
        constructor() {
            super();
        }
    }
    const legend = () => new Legend();

    const version = '5.0.0-alpha0';

    exports.AbstractColorHelper = AbstractColorHelper;
    exports.BadArgumentException = BadArgumentException;
    exports.BarChart = BarChart;
    exports.BaseMixin = BaseMixin;
    exports.BaseMixinExt = BaseMixinExt;
    exports.BoxPlot = BoxPlot;
    exports.BubbleChart = BubbleChart;
    exports.BubbleMixinExt = BubbleMixinExt;
    exports.BubbleOverlay = BubbleOverlay;
    exports.CFDataCapHelper = CFDataCapHelper;
    exports.CFFilterHandler = CFFilterHandler;
    exports.CFMultiAdapter = CFMultiAdapter;
    exports.CFSimpleAdapter = CFSimpleAdapter;
    exports.CapMixin = CapMixin;
    exports.CapMixinExt = CapMixinExt;
    exports.CboxMenu = CboxMenu;
    exports.ChartGroup = ChartGroup;
    exports.ColorCalculator = ColorCalculator;
    exports.ColorMixin = ColorMixin;
    exports.ColorMixinExt = ColorMixinExt;
    exports.ColorScaleHelper = ColorScaleHelper;
    exports.CompositeChart = CompositeChart;
    exports.CompositeChartExt = CompositeChartExt;
    exports.Config = Config;
    exports.CoordinateGridMixin = CoordinateGridMixin;
    exports.CoordinateGridMixinExt = CoordinateGridMixinExt;
    exports.DataCount = DataCount;
    exports.DataGrid = DataGrid;
    exports.DataTable = DataTable;
    exports.FilterHandler = FilterHandler;
    exports.FilterStorage = FilterStorage;
    exports.GeoChoroplethChart = GeoChoroplethChart;
    exports.HeatMap = HeatMap;
    exports.HtmlLegend = HtmlLegend;
    exports.InvalidStateException = InvalidStateException;
    exports.Legend = Legend;
    exports.LineChart = LineChart;
    exports.LinearColors = LinearColors;
    exports.Logger = Logger;
    exports.MarginMixinExt = MarginMixinExt;
    exports.NumberDisplay = NumberDisplay;
    exports.OrdinalColors = OrdinalColors;
    exports.PieChart = PieChart;
    exports.RowChart = RowChart;
    exports.ScatterPlot = ScatterPlot;
    exports.SelectMenu = SelectMenu;
    exports.SeriesChart = SeriesChart;
    exports.StackMixin = StackMixin;
    exports.StackMixinExt = StackMixinExt;
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

}));
//# sourceMappingURL=dc-compat.js.map
