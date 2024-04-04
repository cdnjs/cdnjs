/**
 * @license Highstock JS v11.4.1 (2024-04-04)
 *
 * Highcharts Stock as a plugin for Highcharts
 *
 * (c) 2010-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/stock', ['highcharts'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    'use strict';
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);

            if (typeof CustomEvent === 'function') {
                window.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Series/DataModifyComposition.js', [_modules['Core/Axis/Axis.js'], _modules['Core/Series/Point.js'], _modules['Core/Series/Series.js'], _modules['Core/Utilities.js']], function (Axis, Point, Series, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { tooltipFormatter: pointTooltipFormatter } = Point.prototype;
        const { addEvent, arrayMax, arrayMin, correctFloat, defined, isArray, isNumber, isString, pick } = U;
        /* *
         *
         *  Composition
         *
         * */
        var DataModifyComposition;
        (function (DataModifyComposition) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Extends the series, axis and point classes with
             * compare and cumulative support.
             *
             * @private
             *
             * @param SeriesClass
             * Series class to use.
             *
             * @param AxisClass
             * Axis class to extend.
             *
             * @param PointClass
             * Point class to use.
             */
            function compose(SeriesClass, AxisClass, PointClass) {
                const axisProto = AxisClass.prototype, pointProto = PointClass.prototype, seriesProto = SeriesClass.prototype;
                if (!seriesProto.setCompare) {
                    seriesProto.setCompare = seriesSetCompare;
                    seriesProto.setCumulative = seriesSetCumulative;
                    addEvent(SeriesClass, 'afterInit', afterInit);
                    addEvent(SeriesClass, 'afterGetExtremes', afterGetExtremes);
                    addEvent(SeriesClass, 'afterProcessData', afterProcessData);
                }
                if (!axisProto.setCompare) {
                    axisProto.setCompare = axisSetCompare;
                    axisProto.setModifier = setModifier;
                    axisProto.setCumulative = axisSetCumulative;
                    pointProto.tooltipFormatter = tooltipFormatter;
                }
                return SeriesClass;
            }
            DataModifyComposition.compose = compose;
            /* ********************************************************************** *
             *  Start shared compare and cumulative logic                             *
             * ********************************************************************** */
            /**
             * Shared code for the axis.setCompare() and the axis.setCumulative()
             * methods. Inits the 'compare' or the 'cumulative' mode.
             * @private
             */
            function setModifier(mode, modeState, redraw) {
                if (!this.isXAxis) {
                    this.series.forEach(function (series) {
                        if (mode === 'compare' &&
                            typeof modeState !== 'boolean') {
                            series.setCompare(modeState, false);
                        }
                        else if (mode === 'cumulative' &&
                            !isString(modeState)) {
                            series.setCumulative(modeState, false);
                        }
                    });
                    if (pick(redraw, true)) {
                        this.chart.redraw();
                    }
                }
            }
            /**
             * Extend the tooltip formatter by adding support for the point.change
             * variable as well as the changeDecimals option.
             *
             * @ignore
             * @function Highcharts.Point#tooltipFormatter
             *
             * @param {string} pointFormat
             */
            function tooltipFormatter(pointFormat) {
                const point = this, { numberFormatter } = point.series.chart, replace = function (value) {
                    pointFormat = pointFormat.replace('{point.' + value + '}', (point[value] > 0 && value === 'change' ? '+' : '') +
                        numberFormatter(point[value], pick(point.series.tooltipOptions.changeDecimals, 2)));
                };
                if (defined(point.change)) {
                    replace('change');
                }
                if (defined(point.cumulativeSum)) {
                    replace('cumulativeSum');
                }
                return pointTooltipFormatter.apply(this, [pointFormat]);
            }
            /**
             * Extend series.init by adding a methods to modify the y values used
             * for plotting on the y axis. For compare mode, this method is called both
             * from the axis when finding dataMin and dataMax,
             * and from the series.translate method.
             *
             * @ignore
             * @function Highcharts.Series#init
             */
            function afterInit() {
                const compare = this.options.compare;
                let dataModify;
                if (compare === 'percent' ||
                    compare === 'value' ||
                    this.options.cumulative) {
                    dataModify = new Additions(this);
                    if (compare === 'percent' || compare === 'value') {
                        // Set comparison mode
                        dataModify.initCompare(compare);
                    }
                    else {
                        // Set Cumulative Sum mode
                        dataModify.initCumulative();
                    }
                }
                this.dataModify = dataModify;
            }
            /**
             * Adjust the extremes (compare and cumulative modify the data).
             * @private
             */
            function afterGetExtremes(e) {
                const dataExtremes = e.dataExtremes, activeYData = dataExtremes.activeYData;
                if (this.dataModify && dataExtremes) {
                    let extremes;
                    if (this.options.compare) {
                        extremes = [
                            this.dataModify.modifyValue(dataExtremes.dataMin),
                            this.dataModify.modifyValue(dataExtremes.dataMax)
                        ];
                    }
                    else if (this.options.cumulative &&
                        isArray(activeYData) &&
                        // If only one y visible, sum doesn't change
                        // so no need to change extremes
                        activeYData.length >= 2) {
                        extremes = Additions.getCumulativeExtremes(activeYData);
                    }
                    if (extremes) {
                        dataExtremes.dataMin = arrayMin(extremes);
                        dataExtremes.dataMax = arrayMax(extremes);
                    }
                }
            }
            /* ********************************************************************** *
             *  End shared compare and cumulative logic                               *
             * ********************************************************************** */
            /* ********************************************************************** *
             *  Start value compare logic                                             *
             * ********************************************************************** */
            /**
             * Highcharts Stock only. Set the
             * [compare](https://api.highcharts.com/highstock/plotOptions.series.compare)
             * mode of the series after render time.
             * In most cases it is more useful running
             * {@link Axis#setCompare} on the X axis to update all its series.
             *
             * @function Highcharts.Series#setCompare
             *
             * @param {string|null} [compare]
             *        Can be one of `undefined` (default), `null`, `"percent"`
             *        or `"value"`.
             *
             * @param {boolean} [redraw=true]
             *        Whether to redraw the chart or to wait for a later call to
             *        {@link Chart#redraw}.
             */
            function seriesSetCompare(compare, redraw) {
                // Survive to export, #5485 (and for options generally)
                this.options.compare = this.userOptions.compare = compare;
                // Fire series.init() that will set or delete series.dataModify
                this.update({}, pick(redraw, true));
                if (this.dataModify && (compare === 'value' || compare === 'percent')) {
                    this.dataModify.initCompare(compare);
                }
                else {
                    // When disabling, clear the points
                    this.points.forEach((point) => {
                        delete point.change;
                    });
                }
            }
            /**
             * Extend series.processData by finding the first y value in the plot area,
             * used for comparing the following values
             *
             * @ignore
             * @function Highcharts.Series#processData
             */
            function afterProcessData() {
                const series = this;
                if (series.xAxis && // Not pies
                    series.processedYData &&
                    series.dataModify) {
                    const processedXData = series.processedXData, processedYData = series.processedYData, length = processedYData.length, compareStart = series.options.compareStart === true ? 0 : 1;
                    let keyIndex = -1, i;
                    // For series with more than one value (range, OHLC etc), compare
                    // against close or the pointValKey (#4922, #3112, #9854)
                    if (series.pointArrayMap) {
                        keyIndex = series.pointArrayMap.indexOf(series.options.pointValKey || series.pointValKey || 'y');
                    }
                    // Find the first value for comparison
                    for (i = 0; i < length - compareStart; i++) {
                        const compareValue = processedYData[i] && keyIndex > -1 ?
                            processedYData[i][keyIndex] : processedYData[i];
                        if (isNumber(compareValue) &&
                            compareValue !== 0 &&
                            processedXData[i + compareStart] >= (series.xAxis.min || 0)) {
                            series.dataModify.compareValue = compareValue;
                            break;
                        }
                    }
                }
            }
            /**
             * Highcharts Stock only. Set the compare mode on all series
             * belonging to a Y axis.
             *
             * @see [plotOptions.series.compare](https://api.highcharts.com/highstock/plotOptions.series.compare)
             *
             * @sample stock/members/axis-setcompare/
             *         Set compare
             *
             * @function Highcharts.Axis#setCompare
             *
             * @param {string|null} [compare]
             *        The compare mode. Can be one of `undefined` (default), `null`,
             *        `"value"` or `"percent"`.
             *
             * @param {boolean} [redraw=true]
             *        Whether to redraw the chart or to wait for a later call to
             *        {@link Chart#redraw}.
             */
            function axisSetCompare(compare, redraw) {
                this.setModifier('compare', compare, redraw);
            }
            /* ********************************************************************** *
             *  End value compare logic                                               *
             * ********************************************************************** */
            /* ********************************************************************** *
             *  Start Cumulative Sum logic, author: Rafal Sebestjanski                *
             * ********************************************************************** */
            /**
             * Highcharts Stock only. Set the
             * [cumulative](https://api.highcharts.com/highstock/plotOptions.series.cumulative)
             * mode of the series after render time.
             * In most cases it is more useful running
             * {@link Axis#setCumulative} on the Y axis to update all its series.
             *
             * @function Highcharts.Series#setCumulative
             *
             * @param {boolean} [cumulative=false]
             *        Either enable or disable Cumulative Sum mode.
             *        Can be one of `false` (default) or `true`.
             *
             * @param {boolean} [redraw=true]
             *        Whether to redraw the chart or to wait for a later call to
             *        {@link Chart#redraw}.
             */
            function seriesSetCumulative(cumulative, redraw) {
                // Set default value to false
                cumulative = pick(cumulative, false);
                // Survive to export, #5485 (and for options generally)
                this.options.cumulative = this.userOptions.cumulative = cumulative;
                // Fire series.init() that will set or delete series.dataModify
                this.update({}, pick(redraw, true));
                // If should, turn on the Cumulative Sum mode
                if (this.dataModify) {
                    this.dataModify.initCumulative();
                }
                else {
                    // When disabling, clear the points
                    this.points.forEach((point) => {
                        delete point.cumulativeSum;
                    });
                }
            }
            /**
             * Highcharts Stock only. Set the cumulative mode on all series
             * belonging to a Y axis.
             *
             * @see [plotOptions.series.cumulative](https://api.highcharts.com/highstock/plotOptions.series.cumulative)
             *
             * @sample stock/members/axis-setcumulative/
             *         Set cumulative
             *
             * @function Highcharts.Axis#setCumulative
             *
             * @param {boolean} [cumulative]
             *        Whether to disable or enable the cumulative mode.
             *        Can be one of `undefined` (default, treated as `false`),
             *        `false` or `true`.
             *
             * @param {boolean} [redraw=true]
             *        Whether to redraw the chart or to wait for a later call to
             *        {@link Chart#redraw}.
             */
            function axisSetCumulative(cumulative, redraw) {
                this.setModifier('cumulative', cumulative, redraw);
            }
            /* *
             *
             *  Classes
             *
             * */
            /**
             * @private
             */
            class Additions {
                /* *
                 *
                 *  Constructors
                 *
                 * */
                /**
                 * @private
                 */
                constructor(series) {
                    this.series = series;
                }
                /* *
                *
                *  Functions
                *
                * */
                /**
                 * @private
                 */
                modifyValue() {
                    return 0;
                }
                /**
                 * @ignore
                 * @function Highcharts.Series#getCumulativeExtremes
                 *
                 * @param {Array} [activeYData]
                 *        An array cointaining all the points' y values
                 *        in a visible range.
                 */
                static getCumulativeExtremes(activeYData) {
                    let cumulativeDataMin = Infinity, cumulativeDataMax = -Infinity;
                    activeYData.reduce((prev, cur) => {
                        const sum = prev + cur;
                        cumulativeDataMin = Math.min(cumulativeDataMin, sum, prev);
                        cumulativeDataMax = Math.max(cumulativeDataMax, sum, prev);
                        return sum;
                    });
                    return [cumulativeDataMin, cumulativeDataMax];
                }
                /**
                 * @ignore
                 * @function Highcharts.Series#initCompare
                 *
                 * @param {string} [compare]
                 *        Can be one of `"percent"` or `"value"`.
                 */
                initCompare(compare) {
                    // Set the modifyValue method
                    this.modifyValue = function (value, index) {
                        if (value === null) {
                            value = 0;
                        }
                        const compareValue = this.compareValue;
                        if (typeof value !== 'undefined' &&
                            typeof compareValue !== 'undefined') { // #2601, #5814
                            // Get the modified value
                            if (compare === 'value') {
                                value -= compareValue;
                                // Compare percent
                            }
                            else {
                                const compareBase = this.series.options.compareBase;
                                value = 100 * (value / compareValue) -
                                    (compareBase === 100 ? 0 : 100);
                            }
                            // Record for tooltip etc.
                            if (typeof index !== 'undefined') {
                                const point = this.series.points[index];
                                if (point) {
                                    point.change = value;
                                }
                            }
                            return value;
                        }
                        return 0;
                    };
                }
                /**
                 * @ignore
                 * @function Highcharts.Series#initCumulative
                 */
                initCumulative() {
                    // Set the modifyValue method
                    this.modifyValue = function (value, index) {
                        if (value === null) {
                            value = 0;
                        }
                        if (value !== void 0 && index !== void 0) {
                            const prevPoint = index > 0 ?
                                this.series.points[index - 1] : null;
                            // Get the modified value
                            if (prevPoint && prevPoint.cumulativeSum) {
                                value = correctFloat(prevPoint.cumulativeSum + value);
                            }
                            // Record for tooltip etc.
                            const point = this.series.points[index];
                            if (point) {
                                point.cumulativeSum = value;
                            }
                            return value;
                        }
                        return 0;
                    };
                }
            }
            DataModifyComposition.Additions = Additions;
        })(DataModifyComposition || (DataModifyComposition = {}));
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        /**
         * Compare the values of the series against the first non-null, non-
         * zero value in the visible range. The y axis will show percentage
         * or absolute change depending on whether `compare` is set to `"percent"`
         * or `"value"`. When this is applied to multiple series, it allows
         * comparing the development of the series against each other. Adds
         * a `change` field to every point object.
         *
         * @see [compareBase](#plotOptions.series.compareBase)
         * @see [Axis.setCompare()](/class-reference/Highcharts.Axis#setCompare)
         * @see [Series.setCompare()](/class-reference/Highcharts.Series#setCompare)
         *
         * @sample {highstock} stock/plotoptions/series-compare-percent/
         *         Percent
         * @sample {highstock} stock/plotoptions/series-compare-value/
         *         Value
         *
         * @type      {string}
         * @since     1.0.1
         * @product   highstock
         * @validvalue ["percent", "value"]
         * @apioption plotOptions.series.compare
         */
        /**
         * Defines if comparison should start from the first point within the visible
         * range or should start from the first point **before** the range.
         *
         * In other words, this flag determines if first point within the visible range
         * will have 0% (`compareStart=true`) or should have been already calculated
         * according to the previous point (`compareStart=false`).
         *
         * @sample {highstock} stock/plotoptions/series-comparestart/
         *         Calculate compare within visible range
         *
         * @type      {boolean}
         * @default   false
         * @since     6.0.0
         * @product   highstock
         * @apioption plotOptions.series.compareStart
         */
        /**
         * When [compare](#plotOptions.series.compare) is `percent`, this option
         * dictates whether to use 0 or 100 as the base of comparison.
         *
         * @sample {highstock} stock/plotoptions/series-comparebase/
         *         Compare base is 100
         *
         * @type       {number}
         * @default    0
         * @since      5.0.6
         * @product    highstock
         * @validvalue [0, 100]
         * @apioption  plotOptions.series.compareBase
         */
        /**
         * Cumulative Sum feature replaces points' values with the following formula:
         * `sum of all previous points' values + current point's value`.
         * Works only for points in a visible range.
         * Adds the `cumulativeSum` field to each point object that can be accessed
         * e.g. in the [tooltip.pointFormat](https://api.highcharts.com/highstock/tooltip.pointFormat).
         *
         * With `dataGrouping` enabled, default grouping approximation is set to `sum`.
         *
         * @see [Axis.setCumulative()](/class-reference/Highcharts.Axis#setCumulative)
         * @see [Series.setCumulative()](/class-reference/Highcharts.Series#setCumulative)
         *
         * @sample {highstock} stock/plotoptions/series-cumulative-sum/
         *         Cumulative Sum
         *
         * @type      {boolean}
         * @default   false
         * @since 9.3.0
         * @product   highstock
         * @apioption plotOptions.series.cumulative
         */
        ''; // Keeps doclets above in transpiled file

        return DataModifyComposition;
    });
    _registerModule(_modules, 'Stock/Navigator/ChartNavigatorComposition.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { isTouchDevice } = H;
        const { addEvent, merge, pick } = U;
        /* *
         *
         *  Constants
         *
         * */
        const composedMembers = [];
        /* *
         *
         *  Variables
         *
         * */
        let NavigatorConstructor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function compose(ChartClass, NavigatorClass) {
            if (U.pushUnique(composedMembers, ChartClass)) {
                const chartProto = ChartClass.prototype;
                NavigatorConstructor = NavigatorClass;
                chartProto.callbacks.push(onChartCallback);
                addEvent(ChartClass, 'afterAddSeries', onChartAfterAddSeries);
                addEvent(ChartClass, 'afterSetChartSize', onChartAfterSetChartSize);
                addEvent(ChartClass, 'afterUpdate', onChartAfterUpdate);
                addEvent(ChartClass, 'beforeRender', onChartBeforeRender);
                addEvent(ChartClass, 'beforeShowResetZoom', onChartBeforeShowResetZoom);
                addEvent(ChartClass, 'update', onChartUpdate);
            }
        }
        /**
         * Handle adding new series.
         * @private
         */
        function onChartAfterAddSeries() {
            if (this.navigator) {
                // Recompute which series should be shown in navigator, and add them
                this.navigator.setBaseSeries(null, false);
            }
        }
        /**
         * For stock charts, extend the Chart.setChartSize method so that we can set the
         * final top position of the navigator once the height of the chart, including
         * the legend, is determined. #367. We can't use Chart.getMargins, because
         * labels offsets are not calculated yet.
         * @private
         */
        function onChartAfterSetChartSize() {
            const legend = this.legend, navigator = this.navigator;
            let legendOptions, xAxis, yAxis;
            if (navigator) {
                legendOptions = legend && legend.options;
                xAxis = navigator.xAxis;
                yAxis = navigator.yAxis;
                const { scrollbarHeight, scrollButtonSize } = navigator;
                // Compute the top position
                if (this.inverted) {
                    navigator.left = navigator.opposite ?
                        this.chartWidth - scrollbarHeight -
                            navigator.height :
                        this.spacing[3] + scrollbarHeight;
                    navigator.top = this.plotTop + scrollButtonSize;
                }
                else {
                    navigator.left = pick(xAxis.left, this.plotLeft + scrollButtonSize);
                    navigator.top = navigator.navigatorOptions.top ||
                        this.chartHeight -
                            navigator.height -
                            scrollbarHeight -
                            (this.scrollbar?.options.margin || 0) -
                            this.spacing[2] -
                            (this.rangeSelector && this.extraBottomMargin ?
                                this.rangeSelector.getHeight() :
                                0) -
                            ((legendOptions &&
                                legendOptions.verticalAlign === 'bottom' &&
                                legendOptions.layout !== 'proximate' && // #13392
                                legendOptions.enabled &&
                                !legendOptions.floating) ?
                                legend.legendHeight +
                                    pick(legendOptions.margin, 10) :
                                0) -
                            (this.titleOffset ? this.titleOffset[2] : 0);
                }
                if (xAxis && yAxis) { // False if navigator is disabled (#904)
                    if (this.inverted) {
                        xAxis.options.left = yAxis.options.left = navigator.left;
                    }
                    else {
                        xAxis.options.top = yAxis.options.top = navigator.top;
                    }
                    xAxis.setAxisSize();
                    yAxis.setAxisSize();
                }
            }
        }
        /**
         * Initialize navigator, if no scrolling exists yet.
         * @private
         */
        function onChartAfterUpdate(event) {
            if (!this.navigator && !this.scroller &&
                (this.options.navigator.enabled ||
                    this.options.scrollbar.enabled)) {
                this.scroller = this.navigator = new NavigatorConstructor(this);
                if (pick(event.redraw, true)) {
                    this.redraw(event.animation); // #7067
                }
            }
        }
        /**
         * Initialize navigator for stock charts
         * @private
         */
        function onChartBeforeRender() {
            const options = this.options;
            if (options.navigator.enabled ||
                options.scrollbar.enabled) {
                this.scroller = this.navigator = new NavigatorConstructor(this);
            }
        }
        /**
         * For Stock charts. For x only zooming, do not to create the zoom button
         * because X axis zooming is already allowed by the Navigator and Range
         * selector. (#9285)
         * @private
         */
        function onChartBeforeShowResetZoom() {
            const chartOptions = this.options, navigator = chartOptions.navigator, rangeSelector = chartOptions.rangeSelector;
            if (((navigator && navigator.enabled) ||
                (rangeSelector && rangeSelector.enabled)) &&
                ((!isTouchDevice &&
                    this.zooming.type === 'x') ||
                    (isTouchDevice && this.zooming.pinchType === 'x'))) {
                return false;
            }
        }
        /**
         * @private
         */
        function onChartCallback(chart) {
            const navigator = chart.navigator;
            // Initialize the navigator
            if (navigator && chart.xAxis[0]) {
                const extremes = chart.xAxis[0].getExtremes();
                navigator.render(extremes.min, extremes.max);
            }
        }
        /**
         * Merge options, if no scrolling exists yet
         * @private
         */
        function onChartUpdate(e) {
            const navigatorOptions = (e.options.navigator || {}), scrollbarOptions = (e.options.scrollbar || {});
            if (!this.navigator && !this.scroller &&
                (navigatorOptions.enabled || scrollbarOptions.enabled)) {
                merge(true, this.options.navigator, navigatorOptions);
                merge(true, this.options.scrollbar, scrollbarOptions);
                delete e.options.navigator;
                delete e.options.scrollbar;
            }
        }
        /* *
         *
         *  Default Export
         *
         * */
        const ChartNavigatorComposition = {
            compose
        };

        return ChartNavigatorComposition;
    });
    _registerModule(_modules, 'Core/Axis/NavigatorAxisComposition.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { isTouchDevice } = H;
        const { addEvent, correctFloat, defined, isNumber, pick } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function onAxisInit() {
            const axis = this;
            if (!axis.navigatorAxis) {
                axis.navigatorAxis = new NavigatorAxisAdditions(axis);
            }
        }
        /**
         * For Stock charts, override selection zooming with some special features
         * because X axis zooming is already allowed by the Navigator and Range
         * selector.
         * @private
         */
        function onAxisSetExtremes(e) {
            const axis = this, chart = axis.chart, chartOptions = chart.options, navigator = chartOptions.navigator, navigatorAxis = axis.navigatorAxis, pinchType = chart.zooming.pinchType, rangeSelector = chartOptions.rangeSelector, zoomType = chart.zooming.type;
            let zoomed;
            if (axis.isXAxis &&
                (navigator?.enabled || rangeSelector?.enabled)) {
                // For y only zooming, ignore the X axis completely
                if (zoomType === 'y' && e.trigger === 'zoom') {
                    zoomed = false;
                    // For xy zooming, record the state of the zoom before zoom selection,
                    // then when the reset button is pressed, revert to this state. This
                    // should apply only if the chart is initialized with a range (#6612),
                    // otherwise zoom all the way out.
                }
                else if (((e.trigger === 'zoom' && zoomType === 'xy') ||
                    (isTouchDevice && pinchType === 'xy')) &&
                    axis.options.range) {
                    const previousZoom = navigatorAxis.previousZoom;
                    // Minimum defined, zooming in
                    if (defined(e.min)) {
                        navigatorAxis.previousZoom = [axis.min, axis.max];
                        // Minimum undefined, resetting zoom
                    }
                    else if (previousZoom) {
                        e.min = previousZoom[0];
                        e.max = previousZoom[1];
                        navigatorAxis.previousZoom = void 0;
                    }
                }
            }
            if (typeof zoomed !== 'undefined') {
                e.preventDefault();
            }
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @class
         */
        class NavigatorAxisAdditions {
            /* *
             *
             *  Static Functions
             *
             * */
            /**
             * @private
             */
            static compose(AxisClass) {
                if (!AxisClass.keepProps.includes('navigatorAxis')) {
                    AxisClass.keepProps.push('navigatorAxis');
                    addEvent(AxisClass, 'init', onAxisInit);
                    addEvent(AxisClass, 'setExtremes', onAxisSetExtremes);
                }
            }
            /* *
             *
             *  Constructors
             *
             * */
            constructor(axis) {
                this.axis = axis;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * @private
             */
            destroy() {
                this.axis = void 0;
            }
            /**
             * Add logic to normalize the zoomed range in order to preserve the pressed
             * state of range selector buttons
             *
             * @private
             * @function Highcharts.Axis#toFixedRange
             */
            toFixedRange(pxMin, pxMax, fixedMin, fixedMax) {
                const axis = this.axis, halfPointRange = (axis.pointRange || 0) / 2;
                let newMin = pick(fixedMin, axis.translate(pxMin, true, !axis.horiz)), newMax = pick(fixedMax, axis.translate(pxMax, true, !axis.horiz));
                // Add/remove half point range to/from the extremes (#1172)
                if (!defined(fixedMin)) {
                    newMin = correctFloat(newMin + halfPointRange);
                }
                if (!defined(fixedMax)) {
                    newMax = correctFloat(newMax - halfPointRange);
                }
                if (!isNumber(newMin) || !isNumber(newMax)) { // #1195, #7411
                    newMin = newMax = void 0;
                }
                return {
                    min: newMin,
                    max: newMax
                };
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return NavigatorAxisAdditions;
    });
    _registerModule(_modules, 'Stock/Navigator/NavigatorDefaults.js', [_modules['Core/Color/Color.js'], _modules['Core/Series/SeriesRegistry.js']], function (Color, SeriesRegistry) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { parse: color } = Color;
        const { seriesTypes } = SeriesRegistry;
        /* *
         *
         *  Constants
         *
         * */
        /**
         * The navigator is a small series below the main series, displaying
         * a view of the entire data set. It provides tools to zoom in and
         * out on parts of the data as well as panning across the dataset.
         *
         * @product      highstock gantt
         * @optionparent navigator
         */
        const NavigatorDefaults = {
            /**
             * Whether the navigator and scrollbar should adapt to updated data
             * in the base X axis. When loading data async, as in the demo below,
             * this should be `false`. Otherwise new data will trigger navigator
             * redraw, which will cause unwanted looping. In the demo below, the
             * data in the navigator is set only once. On navigating, only the main
             * chart content is updated.
             *
             * @sample {highstock} stock/demo/lazy-loading/
             *         Set to false with async data loading
             *
             * @type      {boolean}
             * @default   true
             * @apioption navigator.adaptToUpdatedData
             */
            /**
             * An integer identifying the index to use for the base series, or a
             * string representing the id of the series.
             *
             * **Note**: As of Highcharts 5.0, this is now a deprecated option.
             * Prefer [series.showInNavigator](#plotOptions.series.showInNavigator).
             *
             * @see [series.showInNavigator](#plotOptions.series.showInNavigator)
             *
             * @deprecated
             * @type      {number|string}
             * @default   0
             * @apioption navigator.baseSeries
             */
            /**
             * Enable or disable the navigator.
             *
             * @sample {highstock} stock/navigator/enabled/
             *         Disable the navigator
             *
             * @type      {boolean}
             * @default   true
             * @apioption navigator.enabled
             */
            /**
             * When the chart is inverted, whether to draw the navigator on the
             * opposite side.
             *
             * @type      {boolean}
             * @default   false
             * @since     5.0.8
             * @apioption navigator.opposite
             */
            /**
             * The height of the navigator.
             *
             * @sample {highstock} stock/navigator/height/
             *         A higher navigator
             */
            height: 40,
            /**
             * The distance from the nearest element, the X axis or X axis labels.
             *
             * @sample {highstock} stock/navigator/margin/
             *         A margin of 2 draws the navigator closer to the X axis labels
             */
            margin: 25,
            /**
             * Whether the mask should be inside the range marking the zoomed
             * range, or outside. In Highcharts Stock 1.x it was always `false`.
             *
             * @sample {highstock} stock/demo/maskinside-false/
             *         False, mask outside
             *
             * @since   2.0
             */
            maskInside: true,
            /**
             * Options for the handles for dragging the zoomed area.
             *
             * @sample {highstock} stock/navigator/handles/
             *         Colored handles
             */
            handles: {
                /**
                 * Width for handles.
                 *
                 * @sample {highstock} stock/navigator/styled-handles/
                 *         Styled handles
                 *
                 * @since   6.0.0
                 */
                width: 7,
                /**
                 * Height for handles.
                 *
                 * @sample {highstock} stock/navigator/styled-handles/
                 *         Styled handles
                 *
                 * @since   6.0.0
                 */
                height: 15,
                /**
                 * Array to define shapes of handles. 0-index for left, 1-index for
                 * right.
                 *
                 * Additionally, the URL to a graphic can be given on this form:
                 * `url(graphic.png)`. Note that for the image to be applied to
                 * exported charts, its URL needs to be accessible by the export
                 * server.
                 *
                 * Custom callbacks for symbol path generation can also be added to
                 * `Highcharts.SVGRenderer.prototype.symbols`. The callback is then
                 * used by its method name, as shown in the demo.
                 *
                 * @sample {highstock} stock/navigator/styled-handles/
                 *         Styled handles
                 *
                 * @type    {Array<string>}
                 * @default ["navigator-handle", "navigator-handle"]
                 * @since   6.0.0
                 */
                symbols: ['navigator-handle', 'navigator-handle'],
                /**
                 * Allows to enable/disable handles.
                 *
                 * @since   6.0.0
                 */
                enabled: true,
                /**
                 * The width for the handle border and the stripes inside.
                 *
                 * @sample {highstock} stock/navigator/styled-handles/
                 *         Styled handles
                 *
                 * @since     6.0.0
                 * @apioption navigator.handles.lineWidth
                 */
                lineWidth: 1,
                /**
                 * The fill for the handle.
                 *
                 * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                backgroundColor: "#f2f2f2" /* Palette.neutralColor5 */,
                /**
                 * The stroke for the handle border and the stripes inside.
                 *
                 * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                borderColor: "#999999" /* Palette.neutralColor40 */
            },
            /**
             * The color of the mask covering the areas of the navigator series
             * that are currently not visible in the main series. The default
             * color is bluish with an opacity of 0.3 to see the series below.
             *
             * @see In styled mode, the mask is styled with the
             *      `.highcharts-navigator-mask` and
             *      `.highcharts-navigator-mask-inside` classes.
             *
             * @sample {highstock} stock/navigator/maskfill/
             *         Blue, semi transparent mask
             *
             * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @default rgba(102,133,194,0.3)
             */
            maskFill: color("#667aff" /* Palette.highlightColor60 */).setOpacity(0.3).get(),
            /**
             * The color of the line marking the currently zoomed area in the
             * navigator.
             *
             * @sample {highstock} stock/navigator/outline/
             *         2px blue outline
             *
             * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @default #cccccc
             */
            outlineColor: "#999999" /* Palette.neutralColor40 */,
            /**
             * The width of the line marking the currently zoomed area in the
             * navigator.
             *
             * @see In styled mode, the outline stroke width is set with the
             *      `.highcharts-navigator-outline` class.
             *
             * @sample {highstock} stock/navigator/outline/
             *         2px blue outline
             *
             * @type    {number}
             */
            outlineWidth: 1,
            /**
             * Options for the navigator series. Available options are the same
             * as any series, documented at [plotOptions](#plotOptions.series)
             * and [series](#series).
             *
             * Unless data is explicitly defined on navigator.series, the data
             * is borrowed from the first series in the chart.
             *
             * Default series options for the navigator series are:
             * ```js
             * series: {
             *     type: 'areaspline',
             *     fillOpacity: 0.05,
             *     dataGrouping: {
             *         smoothed: true
             *     },
             *     lineWidth: 1,
             *     marker: {
             *         enabled: false
             *     }
             * }
             * ```
             *
             * @see In styled mode, the navigator series is styled with the
             *      `.highcharts-navigator-series` class.
             *
             * @sample {highstock} stock/navigator/series-data/
             *         Using a separate data set for the navigator
             * @sample {highstock} stock/navigator/series/
             *         A green navigator series
             *
             * @type {*|Array<*>|Highcharts.SeriesOptionsType|Array<Highcharts.SeriesOptionsType>}
             */
            series: {
                /**
                 * The type of the navigator series.
                 *
                 * Heads up:
                 * In column-type navigator, zooming is limited to at least one
                 * point with its `pointRange`.
                 *
                 * @sample {highstock} stock/navigator/column/
                 *         Column type navigator
                 *
                 * @type    {string}
                 * @default {highstock} `areaspline` if defined, otherwise `line`
                 * @default {gantt} gantt
                 */
                type: (typeof seriesTypes.areaspline === 'undefined' ?
                    'line' :
                    'areaspline'),
                /**
                 * The fill opacity of the navigator series.
                 */
                fillOpacity: 0.05,
                /**
                 * The pixel line width of the navigator series.
                 */
                lineWidth: 1,
                /**
                 * @ignore-option
                 */
                compare: null,
                /**
                 * @ignore-option
                 */
                sonification: {
                    enabled: false
                },
                /**
                 * Unless data is explicitly defined, the data is borrowed from the
                 * first series in the chart.
                 *
                 * @type      {Array<number|Array<number|string|null>|object|null>}
                 * @product   highstock
                 * @apioption navigator.series.data
                 */
                /**
                 * Data grouping options for the navigator series.
                 *
                 * @extends plotOptions.series.dataGrouping
                 */
                dataGrouping: {
                    approximation: 'average',
                    enabled: true,
                    groupPixelWidth: 2,
                    // Replace smoothed property by anchors, #12455.
                    firstAnchor: 'firstPoint',
                    anchor: 'middle',
                    lastAnchor: 'lastPoint',
                    // Day and week differs from plotOptions.series.dataGrouping
                    units: [
                        ['millisecond', [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                        ['second', [1, 2, 5, 10, 15, 30]],
                        ['minute', [1, 2, 5, 10, 15, 30]],
                        ['hour', [1, 2, 3, 4, 6, 8, 12]],
                        ['day', [1, 2, 3, 4]],
                        ['week', [1, 2, 3]],
                        ['month', [1, 3, 6]],
                        ['year', null]
                    ]
                },
                /**
                 * Data label options for the navigator series. Data labels are
                 * disabled by default on the navigator series.
                 *
                 * @extends plotOptions.series.dataLabels
                 */
                dataLabels: {
                    enabled: false,
                    zIndex: 2 // #1839
                },
                id: 'highcharts-navigator-series',
                className: 'highcharts-navigator-series',
                /**
                 * Sets the fill color of the navigator series.
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @apioption navigator.series.color
                 */
                /**
                 * Line color for the navigator series. Allows setting the color
                 * while disallowing the default candlestick setting.
                 *
                 * @type {Highcharts.ColorString|null}
                 */
                lineColor: null,
                marker: {
                    enabled: false
                },
                /**
                 * Since Highcharts Stock v8, default value is the same as default
                 * `pointRange` defined for a specific type (e.g. `null` for
                 * column type).
                 *
                 * In Highcharts Stock version < 8, defaults to 0.
                 *
                 * @extends plotOptions.series.pointRange
                 * @type {number|null}
                 * @apioption navigator.series.pointRange
                 */
                /**
                 * The threshold option. Setting it to 0 will make the default
                 * navigator area series draw its area from the 0 value and up.
                 *
                 * @type {number|null}
                 */
                threshold: null
            },
            /**
             * Enable or disable navigator sticking to right, while adding new
             * points. If `undefined`, the navigator sticks to the axis maximum only
             * if it was already at the maximum prior to adding points.
             *
             * @type      {boolean}
             * @default   undefined
             * @since 10.2.1
             * @sample {highstock} stock/navigator/sticktomax-false/
             * stickToMax set to false
             * @apioption navigator.stickToMax
             */
            /**
             * Options for the navigator X axis. Default series options for the
             * navigator xAxis are:
             * ```js
             * xAxis: {
             *     tickWidth: 0,
             *     lineWidth: 0,
             *     gridLineWidth: 1,
             *     tickPixelInterval: 200,
             *     labels: {
             *            align: 'left',
             *         style: {
             *             color: '#888'
             *         },
             *         x: 3,
             *         y: -4
             *     }
             * }
             * ```
             *
             * @extends   xAxis
             * @excluding linkedTo, maxZoom, minRange, opposite, range, scrollbar,
             *            showEmpty, maxRange
             */
            xAxis: {
                /**
                 * Additional range on the right side of the xAxis. Works similar to
                 * `xAxis.maxPadding`, but the value is set in terms of axis values,
                 * percentage or pixels.
                 *
                 * If it's a number, it is interpreted as axis values, which in a
                 * datetime axis equals milliseconds.
                 *
                 * If it's a percentage string, is interpreted as percentages of the
                 * axis length. An overscroll of 50% will make a 100px axis 50px longer.
                 *
                 * If it's a pixel string, it is interpreted as a fixed pixel value, but
                 * limited to 90% of the axis length.
                 *
                 * If it's undefined, the value is inherited from `xAxis.overscroll`.
                 *
                 * Can be set for both, main xAxis and navigator's xAxis.
                 *
                 * @type    {number | string | undefined}
                 * @since   6.0.0
                 * @apioption navigator.xAxis.overscroll
                 */
                className: 'highcharts-navigator-xaxis',
                tickLength: 0,
                lineWidth: 0,
                gridLineColor: "#e6e6e6" /* Palette.neutralColor10 */,
                gridLineWidth: 1,
                tickPixelInterval: 200,
                labels: {
                    align: 'left',
                    /**
                     * @type {Highcharts.CSSObject}
                     */
                    style: {
                        /** @ignore */
                        color: "#000000" /* Palette.neutralColor100 */,
                        /** @ignore */
                        fontSize: '0.7em',
                        /** @ignore */
                        opacity: 0.6,
                        /** @ignore */
                        textOutline: '2px contrast'
                    },
                    x: 3,
                    y: -4
                },
                crosshair: false
            },
            /**
             * Options for the navigator Y axis. Default series options for the
             * navigator yAxis are:
             * ```js
             * yAxis: {
             *     gridLineWidth: 0,
             *     startOnTick: false,
             *     endOnTick: false,
             *     minPadding: 0.1,
             *     maxPadding: 0.1,
             *     labels: {
             *         enabled: false
             *     },
             *     title: {
             *         text: null
             *     },
             *     tickWidth: 0
             * }
             * ```
             *
             * @extends   yAxis
             * @excluding height, linkedTo, maxZoom, minRange, ordinal, range,
             *            showEmpty, scrollbar, top, units, maxRange, minLength,
             *            maxLength, resize
             */
            yAxis: {
                className: 'highcharts-navigator-yaxis',
                gridLineWidth: 0,
                startOnTick: false,
                endOnTick: false,
                minPadding: 0.1,
                maxPadding: 0.1,
                labels: {
                    enabled: false
                },
                crosshair: false,
                title: {
                    text: null
                },
                tickLength: 0,
                tickWidth: 0
            }
        };
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        /**
         * Maximum range which can be set using the navigator's handles.
         * Opposite of [xAxis.minRange](#xAxis.minRange).
         *
         * @sample {highstock} stock/navigator/maxrange/
         *         Defined max and min range
         *
         * @type      {number}
         * @since     6.0.0
         * @product   highstock gantt
         * @apioption xAxis.maxRange
         */
        (''); // Keeps doclets above in JS file

        return NavigatorDefaults;
    });
    _registerModule(_modules, 'Stock/Navigator/NavigatorSymbols.js', [], function () {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Constants
         *
         * */
        /**
         * Draw one of the handles on the side of the zoomed range in the navigator.
         * @private
         */
        function navigatorHandle(_x, _y, width, height, options = {}) {
            const halfWidth = options.width ? options.width / 2 : width, markerPosition = Math.round(halfWidth / 3) + 0.5;
            height = options.height || height;
            return [
                ['M', -halfWidth - 1, 0.5],
                ['L', halfWidth, 0.5],
                ['L', halfWidth, height + 0.5],
                ['L', -halfWidth - 1, height + 0.5],
                ['L', -halfWidth - 1, 0.5],
                ['M', -markerPosition, 4],
                ['L', -markerPosition, height - 3],
                ['M', markerPosition - 1, 4],
                ['L', markerPosition - 1, height - 3]
            ];
        }
        /* *
         *
         *  Default Export
         *
         * */
        const NavigatorSymbols = {
            'navigator-handle': navigatorHandle
        };

        return NavigatorSymbols;
    });
    _registerModule(_modules, 'Stock/Utilities/StockUtilities.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { defined } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Sets the chart.fixedRange to the specified value. If the value is larger
         * than actual range, sets it to the maximum possible range. (#20327)
         *
         * @private
         * @function Highcharts.StockChart#setFixedRange
         * @param {number|undefined} range
         *        Range to set in axis units.
         */
        function setFixedRange(range) {
            const xAxis = this.xAxis[0];
            if (defined(xAxis.dataMax) &&
                defined(xAxis.dataMin) &&
                range) {
                this.fixedRange = Math.min(range, xAxis.dataMax - xAxis.dataMin);
            }
            else {
                this.fixedRange = range;
            }
        }
        const StockUtilities = {
            setFixedRange
        };

        return StockUtilities;
    });
    _registerModule(_modules, 'Stock/Navigator/NavigatorComposition.js', [_modules['Core/Defaults.js'], _modules['Core/Globals.js'], _modules['Core/Axis/NavigatorAxisComposition.js'], _modules['Stock/Navigator/NavigatorDefaults.js'], _modules['Stock/Navigator/NavigatorSymbols.js'], _modules['Core/Renderer/RendererRegistry.js'], _modules['Stock/Utilities/StockUtilities.js'], _modules['Core/Utilities.js']], function (D, H, NavigatorAxisAdditions, NavigatorDefaults, NavigatorSymbols, RendererRegistry, StockUtilities, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { setOptions } = D;
        const { composed } = H;
        const { getRendererType } = RendererRegistry;
        const { setFixedRange } = StockUtilities;
        const { addEvent, extend, pushUnique } = U;
        /* *
         *
         *  Variables
         *
         * */
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function compose(ChartClass, AxisClass, SeriesClass) {
            NavigatorAxisAdditions.compose(AxisClass);
            if (pushUnique(composed, 'Navigator')) {
                ChartClass.prototype.setFixedRange = setFixedRange;
                extend(getRendererType().prototype.symbols, NavigatorSymbols);
                addEvent(SeriesClass, 'afterUpdate', onSeriesAfterUpdate);
                setOptions({ navigator: NavigatorDefaults });
            }
        }
        /**
         * Handle updating series
         * @private
         */
        function onSeriesAfterUpdate() {
            if (this.chart.navigator && !this.options.isInternal) {
                this.chart.navigator.setBaseSeries(null, false);
            }
        }
        /* *
         *
         *  Default Export
         *
         * */
        const NavigatorComposition = {
            compose
        };

        return NavigatorComposition;
    });
    _registerModule(_modules, 'Core/Axis/ScrollbarAxis.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { composed } = H;
        const { addEvent, defined, pick, pushUnique } = U;
        /* *
         *
         *  Composition
         *
         * */
        var ScrollbarAxis;
        (function (ScrollbarAxis) {
            /* *
             *
             *  Variables
             *
             * */
            let Scrollbar;
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Attaches to axis events to create scrollbars if enabled.
             *
             * @private
             *
             * @param {Highcharts.Axis} AxisClass
             * Axis class to extend.
             *
             * @param {Highcharts.Scrollbar} ScrollbarClass
             * Scrollbar class to use.
             */
            function compose(AxisClass, ScrollbarClass) {
                if (pushUnique(composed, 'Axis.Scrollbar')) {
                    Scrollbar = ScrollbarClass;
                    addEvent(AxisClass, 'afterGetOffset', onAxisAfterGetOffset);
                    addEvent(AxisClass, 'afterInit', onAxisAfterInit);
                    addEvent(AxisClass, 'afterRender', onAxisAfterRender);
                }
            }
            ScrollbarAxis.compose = compose;
            /** @private */
            function getExtremes(axis) {
                const axisMin = pick(axis.options && axis.options.min, axis.min);
                const axisMax = pick(axis.options && axis.options.max, axis.max);
                return {
                    axisMin,
                    axisMax,
                    scrollMin: defined(axis.dataMin) ?
                        Math.min(axisMin, axis.min, axis.dataMin, pick(axis.threshold, Infinity)) : axisMin,
                    scrollMax: defined(axis.dataMax) ?
                        Math.max(axisMax, axis.max, axis.dataMax, pick(axis.threshold, -Infinity)) : axisMax
                };
            }
            /**
             * Make space for a scrollbar.
             * @private
             */
            function onAxisAfterGetOffset() {
                const axis = this, scrollbar = axis.scrollbar, opposite = scrollbar && !scrollbar.options.opposite, index = axis.horiz ? 2 : opposite ? 3 : 1;
                if (scrollbar) {
                    // Reset scrollbars offsets
                    axis.chart.scrollbarsOffsets = [0, 0];
                    axis.chart.axisOffset[index] +=
                        scrollbar.size + (scrollbar.options.margin || 0);
                }
            }
            /**
             * Wrap axis initialization and create scrollbar if enabled.
             * @private
             */
            function onAxisAfterInit() {
                const axis = this;
                if (axis.options &&
                    axis.options.scrollbar &&
                    axis.options.scrollbar.enabled) {
                    // Predefined options:
                    axis.options.scrollbar.vertical = !axis.horiz;
                    axis.options.startOnTick = axis.options.endOnTick = false;
                    axis.scrollbar = new Scrollbar(axis.chart.renderer, axis.options.scrollbar, axis.chart);
                    addEvent(axis.scrollbar, 'changed', function (e) {
                        const { axisMin, axisMax, scrollMin: unitedMin, scrollMax: unitedMax } = getExtremes(axis), range = unitedMax - unitedMin;
                        let to, from;
                        // #12834, scroll when show/hide series, wrong extremes
                        if (!defined(axisMin) || !defined(axisMax)) {
                            return;
                        }
                        if ((axis.horiz && !axis.reversed) ||
                            (!axis.horiz && axis.reversed)) {
                            to = unitedMin + range * this.to;
                            from = unitedMin + range * this.from;
                        }
                        else {
                            // Y-values in browser are reversed, but this also
                            // applies for reversed horizontal axis:
                            to = unitedMin + range * (1 - this.from);
                            from = unitedMin + range * (1 - this.to);
                        }
                        if (this.shouldUpdateExtremes(e.DOMType)) {
                            // #17977, set animation to undefined instead of true
                            const animate = e.DOMType === 'mousemove' ||
                                e.DOMType === 'touchmove' ? false : void 0;
                            axis.setExtremes(from, to, true, animate, e);
                        }
                        else {
                            // When live redraw is disabled, don't change extremes
                            // Only change the position of the scrollbar thumb
                            this.setRange(this.from, this.to);
                        }
                    });
                }
            }
            /**
             * Wrap rendering axis, and update scrollbar if one is created.
             * @private
             */
            function onAxisAfterRender() {
                const axis = this, { scrollMin, scrollMax } = getExtremes(axis), scrollbar = axis.scrollbar, offset = (axis.axisTitleMargin + (axis.titleOffset || 0)), scrollbarsOffsets = axis.chart.scrollbarsOffsets, axisMargin = axis.options.margin || 0;
                let offsetsIndex, from, to;
                if (scrollbar && scrollbarsOffsets) {
                    if (axis.horiz) {
                        // Reserve space for labels/title
                        if (!axis.opposite) {
                            scrollbarsOffsets[1] += offset;
                        }
                        scrollbar.position(axis.left, (axis.top +
                            axis.height +
                            2 +
                            scrollbarsOffsets[1] -
                            (axis.opposite ? axisMargin : 0)), axis.width, axis.height);
                        // Next scrollbar should reserve space for margin (if set)
                        if (!axis.opposite) {
                            scrollbarsOffsets[1] += axisMargin;
                        }
                        offsetsIndex = 1;
                    }
                    else {
                        // Reserve space for labels/title
                        if (axis.opposite) {
                            scrollbarsOffsets[0] += offset;
                        }
                        let xPosition;
                        if (!scrollbar.options.opposite) {
                            xPosition = axis.opposite ? 0 : axisMargin;
                        }
                        else {
                            xPosition = axis.left +
                                axis.width +
                                2 +
                                scrollbarsOffsets[0] -
                                (axis.opposite ? 0 : axisMargin);
                        }
                        scrollbar.position(xPosition, axis.top, axis.width, axis.height);
                        // Next scrollbar should reserve space for margin (if set)
                        if (axis.opposite) {
                            scrollbarsOffsets[0] += axisMargin;
                        }
                        offsetsIndex = 0;
                    }
                    scrollbarsOffsets[offsetsIndex] += scrollbar.size +
                        (scrollbar.options.margin || 0);
                    if (isNaN(scrollMin) ||
                        isNaN(scrollMax) ||
                        !defined(axis.min) ||
                        !defined(axis.max) ||
                        axis.min === axis.max // #10733
                    ) {
                        // Default action: when extremes are the same or there is
                        // not extremes on the axis, but scrollbar exists, make it
                        // full size
                        scrollbar.setRange(0, 1);
                    }
                    else {
                        from = ((axis.min - scrollMin) /
                            (scrollMax - scrollMin));
                        to = ((axis.max - scrollMin) /
                            (scrollMax - scrollMin));
                        if ((axis.horiz && !axis.reversed) ||
                            (!axis.horiz && axis.reversed)) {
                            scrollbar.setRange(from, to);
                        }
                        else {
                            // Inverse vertical axis
                            scrollbar.setRange(1 - to, 1 - from);
                        }
                    }
                }
            }
        })(ScrollbarAxis || (ScrollbarAxis = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return ScrollbarAxis;
    });
    _registerModule(_modules, 'Stock/Scrollbar/ScrollbarDefaults.js', [], function () {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Constant
         *
         * */
        /**
         *
         * The scrollbar is a means of panning over the X axis of a stock chart.
         * Scrollbars can also be applied to other types of axes.
         *
         * Another approach to scrollable charts is the [chart.scrollablePlotArea](
         * https://api.highcharts.com/highcharts/chart.scrollablePlotArea) option that
         * is especially suitable for simpler cartesian charts on mobile.
         *
         * In styled mode, all the presentational options for the
         * scrollbar are replaced by the classes `.highcharts-scrollbar-thumb`,
         * `.highcharts-scrollbar-arrow`, `.highcharts-scrollbar-button`,
         * `.highcharts-scrollbar-rifles` and `.highcharts-scrollbar-track`.
         *
         * @sample stock/yaxis/inverted-bar-scrollbar/
         *         A scrollbar on a simple bar chart
         *
         * @product highstock gantt
         * @optionparent scrollbar
         *
         * @private
         */
        const ScrollbarDefaults = {
            /**
             * The height of the scrollbar. If `buttonsEnabled` is true , the height
             * also applies to the width of the scroll arrows so that they are always
             * squares.
             *
             * @sample stock/scrollbar/style/
             *         Non-default height
             *
             * @type    {number}
             */
            height: 10,
            /**
             * The border rounding radius of the bar.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            barBorderRadius: 5,
            /**
             * The corner radius of the scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            buttonBorderRadius: 0,
            /**
             * Enable or disable the buttons at the end of the scrollbar.
             *
             * @since 11.0.0
             */
            buttonsEnabled: false,
            /**
             * Enable or disable the scrollbar.
             *
             * @sample stock/scrollbar/enabled/
             *         Disable the scrollbar, only use navigator
             *
             * @type      {boolean}
             * @default   true
             * @apioption scrollbar.enabled
             */
            /**
             * Whether to redraw the main chart as the scrollbar or the navigator
             * zoomed window is moved. Defaults to `true` for modern browsers and
             * `false` for legacy IE browsers as well as mobile devices.
             *
             * @sample stock/scrollbar/liveredraw
             *         Setting live redraw to false
             *
             * @type  {boolean}
             * @since 1.3
             */
            liveRedraw: void 0,
            /**
             * The margin between the scrollbar and its axis when the scrollbar is
             * applied directly to an axis, or the navigator in case that is enabled.
             * Defaults to 10 for axis, 0 for navigator.
             *
             * @type {number|undefined}
             */
            margin: void 0,
            /**
             * The minimum width of the scrollbar.
             *
             * @since 1.2.5
             */
            minWidth: 6,
            /** @ignore-option */
            opposite: true,
            /**
             * Whether to show or hide the scrollbar when the scrolled content is
             * zoomed out to it full extent.
             *
             * @type      {boolean}
             * @default   true
             * @apioption scrollbar.showFull
             */
            step: 0.2,
            /**
             * The z index of the scrollbar group.
             */
            zIndex: 3,
            /**
             * The background color of the scrollbar itself.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            barBackgroundColor: "#cccccc" /* Palette.neutralColor20 */,
            /**
             * The width of the bar's border.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            barBorderWidth: 0,
            /**
             * The color of the scrollbar's border.
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            barBorderColor: "#cccccc" /* Palette.neutralColor20 */,
            /**
             * The color of the small arrow inside the scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            buttonArrowColor: "#333333" /* Palette.neutralColor80 */,
            /**
             * The color of scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            buttonBackgroundColor: "#e6e6e6" /* Palette.neutralColor10 */,
            /**
             * The color of the border of the scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            buttonBorderColor: "#cccccc" /* Palette.neutralColor20 */,
            /**
             * The border width of the scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            buttonBorderWidth: 1,
            /**
             * The color of the small rifles in the middle of the scrollbar.
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            rifleColor: 'none',
            /**
             * The color of the track background.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            trackBackgroundColor: 'rgba(255, 255, 255, 0.001)',
            /**
             * The color of the border of the scrollbar track.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            trackBorderColor: "#cccccc" /* Palette.neutralColor20 */,
            /**
             * The corner radius of the border of the scrollbar track.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            trackBorderRadius: 5,
            /**
             * The width of the border of the scrollbar track.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            trackBorderWidth: 1
        };
        /* *
         *
         *  Default Export
         *
         * */

        return ScrollbarDefaults;
    });
    _registerModule(_modules, 'Stock/Scrollbar/Scrollbar.js', [_modules['Core/Defaults.js'], _modules['Core/Globals.js'], _modules['Core/Axis/ScrollbarAxis.js'], _modules['Stock/Scrollbar/ScrollbarDefaults.js'], _modules['Core/Utilities.js']], function (D, H, ScrollbarAxis, ScrollbarDefaults, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { defaultOptions } = D;
        const { addEvent, correctFloat, defined, destroyObjectProperties, fireEvent, merge, pick, removeEvent } = U;
        /* *
         *
         *  Constants
         *
         * */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * A reusable scrollbar, internally used in Highcharts Stock's
         * navigator and optionally on individual axes.
         *
         * @private
         * @class
         * @name Highcharts.Scrollbar
         * @param {Highcharts.SVGRenderer} renderer
         * @param {Highcharts.ScrollbarOptions} options
         * @param {Highcharts.Chart} chart
         */
        class Scrollbar {
            /* *
             *
             *  Static Functions
             *
             * */
            static compose(AxisClass) {
                ScrollbarAxis.compose(AxisClass, Scrollbar);
            }
            /**
             * When we have vertical scrollbar, rifles and arrow in buttons should be
             * rotated. The same method is used in Navigator's handles, to rotate them.
             *
             * @function Highcharts.swapXY
             *
             * @param {Highcharts.SVGPathArray} path
             * Path to be rotated.
             *
             * @param {boolean} [vertical]
             * If vertical scrollbar, swap x-y values.
             *
             * @return {Highcharts.SVGPathArray}
             * Rotated path.
             *
             * @requires modules/stock
             */
            static swapXY(path, vertical) {
                if (vertical) {
                    path.forEach((seg) => {
                        const len = seg.length;
                        let temp;
                        for (let i = 0; i < len; i += 2) {
                            temp = seg[i + 1];
                            if (typeof temp === 'number') {
                                seg[i + 1] = seg[i + 2];
                                seg[i + 2] = temp;
                            }
                        }
                    });
                }
                return path;
            }
            /* *
             *
             *  Constructors
             *
             * */
            constructor(renderer, options, chart) {
                /* *
                 *
                 *  Properties
                 *
                 * */
                this._events = [];
                this.chartX = 0;
                this.chartY = 0;
                this.from = 0;
                this.scrollbarButtons = [];
                this.scrollbarLeft = 0;
                this.scrollbarStrokeWidth = 1;
                this.scrollbarTop = 0;
                this.size = 0;
                this.to = 0;
                this.trackBorderWidth = 1;
                this.x = 0;
                this.y = 0;
                this.init(renderer, options, chart);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Set up the mouse and touch events for the Scrollbar
             *
             * @private
             * @function Highcharts.Scrollbar#addEvents
             */
            addEvents() {
                const buttonsOrder = this.options.inverted ? [1, 0] : [0, 1], buttons = this.scrollbarButtons, bar = this.scrollbarGroup.element, track = this.track.element, mouseDownHandler = this.mouseDownHandler.bind(this), mouseMoveHandler = this.mouseMoveHandler.bind(this), mouseUpHandler = this.mouseUpHandler.bind(this);
                const _events = [
                    // Mouse events
                    [
                        buttons[buttonsOrder[0]].element,
                        'click',
                        this.buttonToMinClick.bind(this)
                    ],
                    [
                        buttons[buttonsOrder[1]].element,
                        'click',
                        this.buttonToMaxClick.bind(this)
                    ],
                    [track, 'click', this.trackClick.bind(this)],
                    [bar, 'mousedown', mouseDownHandler],
                    [bar.ownerDocument, 'mousemove', mouseMoveHandler],
                    [bar.ownerDocument, 'mouseup', mouseUpHandler],
                    // Touch events
                    [bar, 'touchstart', mouseDownHandler],
                    [bar.ownerDocument, 'touchmove', mouseMoveHandler],
                    [bar.ownerDocument, 'touchend', mouseUpHandler]
                ];
                // Add them all
                _events.forEach(function (args) {
                    addEvent.apply(null, args);
                });
                this._events = _events;
            }
            buttonToMaxClick(e) {
                const scroller = this;
                const range = ((scroller.to - scroller.from) *
                    pick(scroller.options.step, 0.2));
                scroller.updatePosition(scroller.from + range, scroller.to + range);
                fireEvent(scroller, 'changed', {
                    from: scroller.from,
                    to: scroller.to,
                    trigger: 'scrollbar',
                    DOMEvent: e
                });
            }
            buttonToMinClick(e) {
                const scroller = this;
                const range = correctFloat(scroller.to - scroller.from) *
                    pick(scroller.options.step, 0.2);
                scroller.updatePosition(correctFloat(scroller.from - range), correctFloat(scroller.to - range));
                fireEvent(scroller, 'changed', {
                    from: scroller.from,
                    to: scroller.to,
                    trigger: 'scrollbar',
                    DOMEvent: e
                });
            }
            /**
             * Get normalized (0-1) cursor position over the scrollbar
             *
             * @private
             * @function Highcharts.Scrollbar#cursorToScrollbarPosition
             *
             * @param  {*} normalizedEvent
             *         normalized event, with chartX and chartY values
             *
             * @return {Highcharts.Dictionary<number>}
             *         Local position {chartX, chartY}
             */
            cursorToScrollbarPosition(normalizedEvent) {
                const scroller = this, options = scroller.options, minWidthDifference = options.minWidth > scroller.calculatedWidth ?
                    options.minWidth :
                    0; // `minWidth` distorts translation
                return {
                    chartX: (normalizedEvent.chartX - scroller.x -
                        scroller.xOffset) /
                        (scroller.barWidth - minWidthDifference),
                    chartY: (normalizedEvent.chartY - scroller.y -
                        scroller.yOffset) /
                        (scroller.barWidth - minWidthDifference)
                };
            }
            /**
             * Destroys allocated elements.
             *
             * @private
             * @function Highcharts.Scrollbar#destroy
             */
            destroy() {
                const scroller = this, navigator = scroller.chart.scroller;
                // Disconnect events added in addEvents
                scroller.removeEvents();
                // Destroy properties
                [
                    'track',
                    'scrollbarRifles',
                    'scrollbar',
                    'scrollbarGroup',
                    'group'
                ].forEach(function (prop) {
                    if (scroller[prop] && scroller[prop].destroy) {
                        scroller[prop] = scroller[prop].destroy();
                    }
                });
                // #6421, chart may have more scrollbars
                if (navigator && scroller === navigator.scrollbar) {
                    navigator.scrollbar = null;
                    // Destroy elements in collection
                    destroyObjectProperties(navigator.scrollbarButtons);
                }
            }
            /**
             * Draw the scrollbar buttons with arrows
             *
             * @private
             * @function Highcharts.Scrollbar#drawScrollbarButton
             * @param {number} index
             *        0 is left, 1 is right
             */
            drawScrollbarButton(index) {
                const scroller = this, renderer = scroller.renderer, scrollbarButtons = scroller.scrollbarButtons, options = scroller.options, size = scroller.size, group = renderer.g().add(scroller.group);
                scrollbarButtons.push(group);
                if (options.buttonsEnabled) {
                    // Create a rectangle for the scrollbar button
                    const rect = renderer.rect()
                        .addClass('highcharts-scrollbar-button')
                        .add(group);
                    // Presentational attributes
                    if (!scroller.chart.styledMode) {
                        rect.attr({
                            stroke: options.buttonBorderColor,
                            'stroke-width': options.buttonBorderWidth,
                            fill: options.buttonBackgroundColor
                        });
                    }
                    // Place the rectangle based on the rendered stroke width
                    rect.attr(rect.crisp({
                        x: -0.5,
                        y: -0.5,
                        // +1 to compensate for crispifying in rect method
                        width: size + 1,
                        height: size + 1,
                        r: options.buttonBorderRadius
                    }, rect.strokeWidth()));
                    // Button arrow
                    const arrow = renderer
                        .path(Scrollbar.swapXY([[
                            'M',
                            size / 2 + (index ? -1 : 1),
                            size / 2 - 3
                        ], [
                            'L',
                            size / 2 + (index ? -1 : 1),
                            size / 2 + 3
                        ], [
                            'L',
                            size / 2 + (index ? 2 : -2),
                            size / 2
                        ]], options.vertical))
                        .addClass('highcharts-scrollbar-arrow')
                        .add(scrollbarButtons[index]);
                    if (!scroller.chart.styledMode) {
                        arrow.attr({
                            fill: options.buttonArrowColor
                        });
                    }
                }
            }
            /**
             * @private
             * @function Highcharts.Scrollbar#init
             * @param {Highcharts.SVGRenderer} renderer
             * @param {Highcharts.ScrollbarOptions} options
             * @param {Highcharts.Chart} chart
             */
            init(renderer, options, chart) {
                const scroller = this;
                scroller.scrollbarButtons = [];
                scroller.renderer = renderer;
                scroller.userOptions = options;
                scroller.options = merge(ScrollbarDefaults, defaultOptions.scrollbar, options);
                scroller.options.margin = pick(scroller.options.margin, 10);
                scroller.chart = chart;
                // Backward compatibility
                scroller.size = pick(scroller.options.size, scroller.options.height);
                // Init
                if (options.enabled) {
                    scroller.render();
                    scroller.addEvents();
                }
            }
            mouseDownHandler(e) {
                const scroller = this, normalizedEvent = scroller.chart.pointer?.normalize(e) || e, mousePosition = scroller.cursorToScrollbarPosition(normalizedEvent);
                scroller.chartX = mousePosition.chartX;
                scroller.chartY = mousePosition.chartY;
                scroller.initPositions = [scroller.from, scroller.to];
                scroller.grabbedCenter = true;
            }
            /**
             * Event handler for the mouse move event.
             * @private
             */
            mouseMoveHandler(e) {
                const scroller = this, normalizedEvent = scroller.chart.pointer?.normalize(e) || e, options = scroller.options, direction = options.vertical ?
                    'chartY' : 'chartX', initPositions = scroller.initPositions || [];
                let scrollPosition, chartPosition, change;
                // In iOS, a mousemove event with e.pageX === 0 is fired when
                // holding the finger down in the center of the scrollbar. This
                // should be ignored.
                if (scroller.grabbedCenter &&
                    // #4696, scrollbar failed on Android
                    (!e.touches || e.touches[0][direction] !== 0)) {
                    chartPosition = scroller.cursorToScrollbarPosition(normalizedEvent)[direction];
                    scrollPosition = scroller[direction];
                    change = chartPosition - scrollPosition;
                    scroller.hasDragged = true;
                    scroller.updatePosition(initPositions[0] + change, initPositions[1] + change);
                    if (scroller.hasDragged) {
                        fireEvent(scroller, 'changed', {
                            from: scroller.from,
                            to: scroller.to,
                            trigger: 'scrollbar',
                            DOMType: e.type,
                            DOMEvent: e
                        });
                    }
                }
            }
            /**
             * Event handler for the mouse up event.
             * @private
             */
            mouseUpHandler(e) {
                const scroller = this;
                if (scroller.hasDragged) {
                    fireEvent(scroller, 'changed', {
                        from: scroller.from,
                        to: scroller.to,
                        trigger: 'scrollbar',
                        DOMType: e.type,
                        DOMEvent: e
                    });
                }
                scroller.grabbedCenter =
                    scroller.hasDragged =
                        scroller.chartX =
                            scroller.chartY = null;
            }
            /**
             * Position the scrollbar, method called from a parent with defined
             * dimensions.
             *
             * @private
             * @function Highcharts.Scrollbar#position
             * @param {number} x
             *        x-position on the chart
             * @param {number} y
             *        y-position on the chart
             * @param {number} width
             *        width of the scrollbar
             * @param {number} height
             *        height of the scrollbar
             */
            position(x, y, width, height) {
                const scroller = this, options = scroller.options, { buttonsEnabled, margin = 0, vertical } = options, method = scroller.rendered ? 'animate' : 'attr';
                let xOffset = height, yOffset = 0;
                // Make the scrollbar visible when it is repositioned, #15763.
                scroller.group.show();
                scroller.x = x;
                scroller.y = y + this.trackBorderWidth;
                scroller.width = width; // Width with buttons
                scroller.height = height;
                scroller.xOffset = xOffset;
                scroller.yOffset = yOffset;
                // If Scrollbar is a vertical type, swap options:
                if (vertical) {
                    scroller.width = scroller.yOffset = width = yOffset = scroller.size;
                    scroller.xOffset = xOffset = 0;
                    scroller.yOffset = yOffset = buttonsEnabled ? scroller.size : 0;
                    // Width without buttons
                    scroller.barWidth = height - (buttonsEnabled ? width * 2 : 0);
                    scroller.x = x = x + margin;
                }
                else {
                    scroller.height = height = scroller.size;
                    scroller.xOffset = xOffset = buttonsEnabled ? scroller.size : 0;
                    // Width without buttons
                    scroller.barWidth = width - (buttonsEnabled ? height * 2 : 0);
                    scroller.y = scroller.y + margin;
                }
                // Set general position for a group:
                scroller.group[method]({
                    translateX: x,
                    translateY: scroller.y
                });
                // Resize background/track:
                scroller.track[method]({
                    width: width,
                    height: height
                });
                // Move right/bottom button to its place:
                scroller.scrollbarButtons[1][method]({
                    translateX: vertical ? 0 : width - xOffset,
                    translateY: vertical ? height - yOffset : 0
                });
            }
            /**
             * Removes the event handlers attached previously with addEvents.
             *
             * @private
             * @function Highcharts.Scrollbar#removeEvents
             */
            removeEvents() {
                this._events.forEach(function (args) {
                    removeEvent.apply(null, args);
                });
                this._events.length = 0;
            }
            /**
             * Render scrollbar with all required items.
             *
             * @private
             * @function Highcharts.Scrollbar#render
             */
            render() {
                const scroller = this, renderer = scroller.renderer, options = scroller.options, size = scroller.size, styledMode = scroller.chart.styledMode, group = renderer.g('scrollbar')
                    .attr({
                    zIndex: options.zIndex
                })
                    .hide() // Initially hide the scrollbar #15863
                    .add();
                // Draw the scrollbar group
                scroller.group = group;
                // Draw the scrollbar track:
                scroller.track = renderer.rect()
                    .addClass('highcharts-scrollbar-track')
                    .attr({
                    r: options.trackBorderRadius || 0,
                    height: size,
                    width: size
                }).add(group);
                if (!styledMode) {
                    scroller.track.attr({
                        fill: options.trackBackgroundColor,
                        stroke: options.trackBorderColor,
                        'stroke-width': options.trackBorderWidth
                    });
                }
                const trackBorderWidth = scroller.trackBorderWidth =
                    scroller.track.strokeWidth();
                scroller.track.attr({
                    x: -trackBorderWidth % 2 / 2,
                    y: -trackBorderWidth % 2 / 2
                });
                // Draw the scrollbar itself
                scroller.scrollbarGroup = renderer.g().add(group);
                scroller.scrollbar = renderer.rect()
                    .addClass('highcharts-scrollbar-thumb')
                    .attr({
                    height: size - trackBorderWidth,
                    width: size - trackBorderWidth,
                    r: options.barBorderRadius || 0
                }).add(scroller.scrollbarGroup);
                scroller.scrollbarRifles = renderer
                    .path(Scrollbar.swapXY([
                    ['M', -3, size / 4],
                    ['L', -3, 2 * size / 3],
                    ['M', 0, size / 4],
                    ['L', 0, 2 * size / 3],
                    ['M', 3, size / 4],
                    ['L', 3, 2 * size / 3]
                ], options.vertical))
                    .addClass('highcharts-scrollbar-rifles')
                    .add(scroller.scrollbarGroup);
                if (!styledMode) {
                    scroller.scrollbar.attr({
                        fill: options.barBackgroundColor,
                        stroke: options.barBorderColor,
                        'stroke-width': options.barBorderWidth
                    });
                    scroller.scrollbarRifles.attr({
                        stroke: options.rifleColor,
                        'stroke-width': 1
                    });
                }
                scroller.scrollbarStrokeWidth = scroller.scrollbar.strokeWidth();
                scroller.scrollbarGroup.translate(-scroller.scrollbarStrokeWidth % 2 / 2, -scroller.scrollbarStrokeWidth % 2 / 2);
                // Draw the buttons:
                scroller.drawScrollbarButton(0);
                scroller.drawScrollbarButton(1);
            }
            /**
             * Set scrollbar size, with a given scale.
             *
             * @private
             * @function Highcharts.Scrollbar#setRange
             * @param {number} from
             *        scale (0-1) where bar should start
             * @param {number} to
             *        scale (0-1) where bar should end
             */
            setRange(from, to) {
                const scroller = this, options = scroller.options, vertical = options.vertical, minWidth = options.minWidth, fullWidth = scroller.barWidth, method = (this.rendered &&
                    !this.hasDragged &&
                    !(this.chart.navigator && this.chart.navigator.hasDragged)) ? 'animate' : 'attr';
                if (!defined(fullWidth)) {
                    return;
                }
                const toPX = fullWidth * Math.min(to, 1);
                let fromPX, newSize;
                from = Math.max(from, 0);
                fromPX = Math.ceil(fullWidth * from);
                scroller.calculatedWidth = newSize = correctFloat(toPX - fromPX);
                // We need to recalculate position, if minWidth is used
                if (newSize < minWidth) {
                    fromPX = (fullWidth - minWidth + newSize) * from;
                    newSize = minWidth;
                }
                const newPos = Math.floor(fromPX + scroller.xOffset + scroller.yOffset);
                const newRiflesPos = newSize / 2 - 0.5; // -0.5 -> rifle line width / 2
                // Store current position:
                scroller.from = from;
                scroller.to = to;
                if (!vertical) {
                    scroller.scrollbarGroup[method]({
                        translateX: newPos
                    });
                    scroller.scrollbar[method]({
                        width: newSize
                    });
                    scroller.scrollbarRifles[method]({
                        translateX: newRiflesPos
                    });
                    scroller.scrollbarLeft = newPos;
                    scroller.scrollbarTop = 0;
                }
                else {
                    scroller.scrollbarGroup[method]({
                        translateY: newPos
                    });
                    scroller.scrollbar[method]({
                        height: newSize
                    });
                    scroller.scrollbarRifles[method]({
                        translateY: newRiflesPos
                    });
                    scroller.scrollbarTop = newPos;
                    scroller.scrollbarLeft = 0;
                }
                if (newSize <= 12) {
                    scroller.scrollbarRifles.hide();
                }
                else {
                    scroller.scrollbarRifles.show();
                }
                // Show or hide the scrollbar based on the showFull setting
                if (options.showFull === false) {
                    if (from <= 0 && to >= 1) {
                        scroller.group.hide();
                    }
                    else {
                        scroller.group.show();
                    }
                }
                scroller.rendered = true;
            }
            /**
             * Checks if the extremes should be updated in response to a scrollbar
             * change event.
             *
             * @private
             * @function Highcharts.Scrollbar#shouldUpdateExtremes
             */
            shouldUpdateExtremes(eventType) {
                return (pick(this.options.liveRedraw, H.svg &&
                    !H.isTouchDevice &&
                    !this.chart.boosted) ||
                    // Mouseup always should change extremes
                    eventType === 'mouseup' ||
                    eventType === 'touchend' ||
                    // Internal events
                    !defined(eventType));
            }
            trackClick(e) {
                const scroller = this;
                const normalizedEvent = scroller.chart.pointer?.normalize(e) || e, range = scroller.to - scroller.from, top = scroller.y + scroller.scrollbarTop, left = scroller.x + scroller.scrollbarLeft;
                if ((scroller.options.vertical && normalizedEvent.chartY > top) ||
                    (!scroller.options.vertical && normalizedEvent.chartX > left)) {
                    // On the top or on the left side of the track:
                    scroller.updatePosition(scroller.from + range, scroller.to + range);
                }
                else {
                    // On the bottom or the right side of the track:
                    scroller.updatePosition(scroller.from - range, scroller.to - range);
                }
                fireEvent(scroller, 'changed', {
                    from: scroller.from,
                    to: scroller.to,
                    trigger: 'scrollbar',
                    DOMEvent: e
                });
            }
            /**
             * Update the scrollbar with new options
             *
             * @private
             * @function Highcharts.Scrollbar#update
             * @param  {Highcharts.ScrollbarOptions} options
             */
            update(options) {
                this.destroy();
                this.init(this.chart.renderer, merge(true, this.options, options), this.chart);
            }
            /**
             * Update position option in the Scrollbar, with normalized 0-1 scale
             *
             * @private
             * @function Highcharts.Scrollbar#updatePosition
             * @param  {number} from
             * @param  {number} to
             */
            updatePosition(from, to) {
                if (to > 1) {
                    from = correctFloat(1 - correctFloat(to - from));
                    to = 1;
                }
                if (from < 0) {
                    to = correctFloat(to - from);
                    from = 0;
                }
                this.from = from;
                this.to = to;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        Scrollbar.defaultOptions = ScrollbarDefaults;
        /* *
         *
         *  Registry
         *
         * */
        defaultOptions.scrollbar = merge(true, Scrollbar.defaultOptions, defaultOptions.scrollbar);
        /* *
         *
         *  Default Export
         *
         * */

        return Scrollbar;
    });
    _registerModule(_modules, 'Stock/Navigator/Navigator.js', [_modules['Core/Axis/Axis.js'], _modules['Stock/Navigator/ChartNavigatorComposition.js'], _modules['Core/Defaults.js'], _modules['Core/Globals.js'], _modules['Core/Axis/NavigatorAxisComposition.js'], _modules['Stock/Navigator/NavigatorComposition.js'], _modules['Stock/Scrollbar/Scrollbar.js'], _modules['Core/Utilities.js']], function (Axis, ChartNavigatorComposition, D, H, NavigatorAxisAdditions, NavigatorComposition, Scrollbar, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { defaultOptions } = D;
        const { isTouchDevice } = H;
        const { addEvent, clamp, correctFloat, defined, destroyObjectProperties, erase, extend, find, fireEvent, isArray, isNumber, merge, pick, removeEvent, splat } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Finding the min or max of a set of variables where we don't know if they are
         * defined, is a pattern that is repeated several places in Highcharts. Consider
         * making this a global utility method.
         * @private
         */
        function numExt(extreme, ...args) {
            const numbers = [].filter.call(args, isNumber);
            if (numbers.length) {
                return Math[extreme].apply(0, numbers);
            }
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * The Navigator class
         *
         * @private
         * @class
         * @name Highcharts.Navigator
         *
         * @param {Highcharts.Chart} chart
         *        Chart object
         */
        class Navigator {
            /* *
             *
             *  Static Properties
             *
             * */
            static compose(ChartClass, AxisClass, SeriesClass) {
                ChartNavigatorComposition.compose(ChartClass, Navigator);
                NavigatorComposition.compose(ChartClass, AxisClass, SeriesClass);
            }
            /* *
             *
             *  Constructor
             *
             * */
            constructor(chart) {
                this.scrollbarHeight = 0;
                this.init(chart);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Draw one of the handles on the side of the zoomed range in the navigator.
             *
             * @private
             * @function Highcharts.Navigator#drawHandle
             *
             * @param {number} x
             *        The x center for the handle
             *
             * @param {number} index
             *        0 for left and 1 for right
             *
             * @param {boolean|undefined} inverted
             *        Flag for chart.inverted
             *
             * @param {string} verb
             *        Use 'animate' or 'attr'
             */
            drawHandle(x, index, inverted, verb) {
                const navigator = this, height = navigator.navigatorOptions.handles.height;
                // Place it
                navigator.handles[index][verb](inverted ? {
                    translateX: Math.round(navigator.left + navigator.height / 2),
                    translateY: Math.round(navigator.top + parseInt(x, 10) + 0.5 - height)
                } : {
                    translateX: Math.round(navigator.left + parseInt(x, 10)),
                    translateY: Math.round(navigator.top + navigator.height / 2 - height / 2 - 1)
                });
            }
            /**
             * Render outline around the zoomed range
             *
             * @private
             * @function Highcharts.Navigator#drawOutline
             *
             * @param {number} zoomedMin
             *        in pixels position where zoomed range starts
             *
             * @param {number} zoomedMax
             *        in pixels position where zoomed range ends
             *
             * @param {boolean|undefined} inverted
             *        flag if chart is inverted
             *
             * @param {string} verb
             *        use 'animate' or 'attr'
             */
            drawOutline(zoomedMin, zoomedMax, inverted, verb) {
                const navigator = this, maskInside = navigator.navigatorOptions.maskInside, outlineWidth = navigator.outline.strokeWidth(), halfOutline = outlineWidth / 2, outlineCorrection = (outlineWidth % 2) / 2, // #5800
                scrollButtonSize = navigator.scrollButtonSize, navigatorSize = navigator.size, navigatorTop = navigator.top, height = navigator.height, lineTop = navigatorTop - halfOutline, lineBtm = navigatorTop + height;
                let left = navigator.left, verticalMin, path;
                if (inverted) {
                    verticalMin = navigatorTop + zoomedMax + outlineCorrection;
                    zoomedMax = navigatorTop + zoomedMin + outlineCorrection;
                    path = [
                        [
                            'M',
                            left + height,
                            navigatorTop - scrollButtonSize - outlineCorrection
                        ],
                        // Top right of zoomed range
                        ['L', left + height, verticalMin],
                        ['L', left, verticalMin],
                        ['M', left, zoomedMax],
                        ['L', left + height, zoomedMax],
                        [
                            'L',
                            left + height,
                            navigatorTop + navigatorSize + scrollButtonSize
                        ]
                    ];
                    if (maskInside) {
                        path.push(
                        // Upper left of zoomed range
                        ['M', left + height, verticalMin - halfOutline], 
                        // Upper right of z.r.
                        [
                            'L',
                            left + height,
                            zoomedMax + halfOutline
                        ]);
                    }
                }
                else {
                    left -= scrollButtonSize;
                    zoomedMin += left + scrollButtonSize - outlineCorrection;
                    zoomedMax += left + scrollButtonSize - outlineCorrection;
                    path = [
                        // Left
                        ['M', left, lineTop],
                        // Upper left of zoomed range
                        ['L', zoomedMin, lineTop],
                        // Lower left of z.r.
                        ['L', zoomedMin, lineBtm],
                        // Lower right of z.r.
                        ['M', zoomedMax, lineBtm],
                        // Upper right of z.r.
                        ['L', zoomedMax, lineTop],
                        // Right
                        [
                            'L',
                            left + navigatorSize + scrollButtonSize * 2,
                            navigatorTop + halfOutline
                        ]
                    ];
                    if (maskInside) {
                        path.push(
                        // Upper left of zoomed range
                        ['M', zoomedMin - halfOutline, lineTop], 
                        // Upper right of z.r.
                        ['L', zoomedMax + halfOutline, lineTop]);
                    }
                }
                navigator.outline[verb]({
                    d: path
                });
            }
            /**
             * Render outline around the zoomed range
             *
             * @private
             * @function Highcharts.Navigator#drawMasks
             *
             * @param {number} zoomedMin
             *        in pixels position where zoomed range starts
             *
             * @param {number} zoomedMax
             *        in pixels position where zoomed range ends
             *
             * @param {boolean|undefined} inverted
             *        flag if chart is inverted
             *
             * @param {string} verb
             *        use 'animate' or 'attr'
             */
            drawMasks(zoomedMin, zoomedMax, inverted, verb) {
                const navigator = this, left = navigator.left, top = navigator.top, navigatorHeight = navigator.height;
                let height, width, x, y;
                // Determine rectangle position & size
                // According to (non)inverted position:
                if (inverted) {
                    x = [left, left, left];
                    y = [top, top + zoomedMin, top + zoomedMax];
                    width = [navigatorHeight, navigatorHeight, navigatorHeight];
                    height = [
                        zoomedMin,
                        zoomedMax - zoomedMin,
                        navigator.size - zoomedMax
                    ];
                }
                else {
                    x = [left, left + zoomedMin, left + zoomedMax];
                    y = [top, top, top];
                    width = [
                        zoomedMin,
                        zoomedMax - zoomedMin,
                        navigator.size - zoomedMax
                    ];
                    height = [navigatorHeight, navigatorHeight, navigatorHeight];
                }
                navigator.shades.forEach((shade, i) => {
                    shade[verb]({
                        x: x[i],
                        y: y[i],
                        width: width[i],
                        height: height[i]
                    });
                });
            }
            /**
             * Generate DOM elements for a navigator:
             *
             * - main navigator group
             *
             * - all shades
             *
             * - outline
             *
             * - handles
             *
             * @private
             * @function Highcharts.Navigator#renderElements
             */
            renderElements() {
                const navigator = this, navigatorOptions = navigator.navigatorOptions, maskInside = navigatorOptions.maskInside, chart = navigator.chart, inverted = chart.inverted, renderer = chart.renderer, mouseCursor = {
                    cursor: inverted ? 'ns-resize' : 'ew-resize'
                }, 
                // Create the main navigator group
                navigatorGroup = navigator.navigatorGroup = renderer
                    .g('navigator')
                    .attr({
                    zIndex: 8,
                    visibility: 'hidden'
                })
                    .add();
                // Create masks, each mask will get events and fill:
                [
                    !maskInside,
                    maskInside,
                    !maskInside
                ].forEach((hasMask, index) => {
                    const shade = renderer.rect()
                        .addClass('highcharts-navigator-mask' +
                        (index === 1 ? '-inside' : '-outside'))
                        .add(navigatorGroup);
                    if (!chart.styledMode) {
                        shade.attr({
                            fill: hasMask ?
                                navigatorOptions.maskFill :
                                'rgba(0,0,0,0)'
                        });
                        if (index === 1) {
                            shade.css(mouseCursor);
                        }
                    }
                    navigator.shades[index] = shade;
                });
                // Create the outline:
                navigator.outline = renderer.path()
                    .addClass('highcharts-navigator-outline')
                    .add(navigatorGroup);
                if (!chart.styledMode) {
                    navigator.outline.attr({
                        'stroke-width': navigatorOptions.outlineWidth,
                        stroke: navigatorOptions.outlineColor
                    });
                }
                // Create the handlers:
                if (navigatorOptions.handles && navigatorOptions.handles.enabled) {
                    const handlesOptions = navigatorOptions.handles, { height, width } = handlesOptions;
                    [0, 1].forEach((index) => {
                        navigator.handles[index] = renderer.symbol(handlesOptions.symbols[index], -width / 2 - 1, 0, width, height, handlesOptions);
                        if (chart.inverted) {
                            navigator.handles[index].attr({
                                rotation: 90,
                                rotationOriginX: Math.floor(-width / 2),
                                rotationOriginY: (height + width) / 2
                            });
                        }
                        // Z index is 6 for right handle, 7 for left. Can't be 10,
                        // because of the tooltip in inverted chart (#2908).
                        navigator.handles[index].attr({ zIndex: 7 - index })
                            .addClass('highcharts-navigator-handle ' +
                            'highcharts-navigator-handle-' +
                            ['left', 'right'][index]).add(navigatorGroup);
                        if (!chart.styledMode) {
                            navigator.handles[index]
                                .attr({
                                fill: handlesOptions.backgroundColor,
                                stroke: handlesOptions.borderColor,
                                'stroke-width': handlesOptions.lineWidth
                            })
                                .css(mouseCursor);
                        }
                    });
                }
            }
            /**
             * Update navigator
             *
             * @private
             * @function Highcharts.Navigator#update
             *
             * @param {Highcharts.NavigatorOptions} options
             *        Options to merge in when updating navigator
             */
            update(options) {
                // Remove references to old navigator series in base series
                (this.series || []).forEach((series) => {
                    if (series.baseSeries) {
                        delete series.baseSeries.navigatorSeries;
                    }
                });
                // Destroy and rebuild navigator
                this.destroy();
                const chartOptions = this.chart.options;
                merge(true, chartOptions.navigator, options);
                this.init(this.chart);
            }
            /**
             * Render the navigator
             *
             * @private
             * @function Highcharts.Navigator#render
             * @param {number} min
             *        X axis value minimum
             * @param {number} max
             *        X axis value maximum
             * @param {number} [pxMin]
             *        Pixel value minimum
             * @param {number} [pxMax]
             *        Pixel value maximum
             */
            render(min, max, pxMin, pxMax) {
                const navigator = this, chart = navigator.chart, xAxis = navigator.xAxis, pointRange = xAxis.pointRange || 0, scrollbarXAxis = xAxis.navigatorAxis.fake ? chart.xAxis[0] : xAxis, navigatorEnabled = navigator.navigatorEnabled, rendered = navigator.rendered, inverted = chart.inverted, minRange = chart.xAxis[0].minRange, maxRange = chart.xAxis[0].options.maxRange, scrollButtonSize = navigator.scrollButtonSize;
                let navigatorWidth, scrollbarLeft, scrollbarTop, scrollbarHeight = navigator.scrollbarHeight, navigatorSize, verb;
                // Don't redraw while moving the handles (#4703).
                if (this.hasDragged && !defined(pxMin)) {
                    return;
                }
                min = correctFloat(min - pointRange / 2);
                max = correctFloat(max + pointRange / 2);
                // Don't render the navigator until we have data (#486, #4202, #5172).
                if (!isNumber(min) || !isNumber(max)) {
                    // However, if navigator was already rendered, we may need to resize
                    // it. For example hidden series, but visible navigator (#6022).
                    if (rendered) {
                        pxMin = 0;
                        pxMax = pick(xAxis.width, scrollbarXAxis.width);
                    }
                    else {
                        return;
                    }
                }
                navigator.left = pick(xAxis.left, 
                // In case of scrollbar only, without navigator
                chart.plotLeft + scrollButtonSize +
                    (inverted ? chart.plotWidth : 0));
                let zoomedMax = navigator.size = navigatorSize = pick(xAxis.len, (inverted ? chart.plotHeight : chart.plotWidth) -
                    2 * scrollButtonSize);
                if (inverted) {
                    navigatorWidth = scrollbarHeight;
                }
                else {
                    navigatorWidth = navigatorSize + 2 * scrollButtonSize;
                }
                // Get the pixel position of the handles
                pxMin = pick(pxMin, xAxis.toPixels(min, true));
                pxMax = pick(pxMax, xAxis.toPixels(max, true));
                // Verify (#1851, #2238)
                if (!isNumber(pxMin) || Math.abs(pxMin) === Infinity) {
                    pxMin = 0;
                    pxMax = navigatorWidth;
                }
                // Are we below the minRange? (#2618, #6191)
                const newMin = xAxis.toValue(pxMin, true), newMax = xAxis.toValue(pxMax, true), currentRange = Math.abs(correctFloat(newMax - newMin));
                if (currentRange < minRange) {
                    if (this.grabbedLeft) {
                        pxMin = xAxis.toPixels(newMax - minRange - pointRange, true);
                    }
                    else if (this.grabbedRight) {
                        pxMax = xAxis.toPixels(newMin + minRange + pointRange, true);
                    }
                }
                else if (defined(maxRange) &&
                    correctFloat(currentRange - pointRange) > maxRange) {
                    if (this.grabbedLeft) {
                        pxMin = xAxis.toPixels(newMax - maxRange - pointRange, true);
                    }
                    else if (this.grabbedRight) {
                        pxMax = xAxis.toPixels(newMin + maxRange + pointRange, true);
                    }
                }
                // Handles are allowed to cross, but never exceed the plot area
                navigator.zoomedMax = clamp(Math.max(pxMin, pxMax), 0, zoomedMax);
                navigator.zoomedMin = clamp(navigator.fixedWidth ?
                    navigator.zoomedMax - navigator.fixedWidth :
                    Math.min(pxMin, pxMax), 0, zoomedMax);
                navigator.range = navigator.zoomedMax - navigator.zoomedMin;
                zoomedMax = Math.round(navigator.zoomedMax);
                const zoomedMin = Math.round(navigator.zoomedMin);
                if (navigatorEnabled) {
                    navigator.navigatorGroup.attr({
                        visibility: 'inherit'
                    });
                    // Place elements
                    verb = rendered && !navigator.hasDragged ? 'animate' : 'attr';
                    navigator.drawMasks(zoomedMin, zoomedMax, inverted, verb);
                    navigator.drawOutline(zoomedMin, zoomedMax, inverted, verb);
                    if (navigator.navigatorOptions.handles.enabled) {
                        navigator.drawHandle(zoomedMin, 0, inverted, verb);
                        navigator.drawHandle(zoomedMax, 1, inverted, verb);
                    }
                }
                if (navigator.scrollbar) {
                    if (inverted) {
                        scrollbarTop = navigator.top - scrollButtonSize;
                        scrollbarLeft = navigator.left - scrollbarHeight +
                            (navigatorEnabled || !scrollbarXAxis.opposite ? 0 :
                                // Multiple axes has offsets:
                                (scrollbarXAxis.titleOffset || 0) +
                                    // Self margin from the axis.title
                                    scrollbarXAxis.axisTitleMargin);
                        scrollbarHeight = navigatorSize + 2 * scrollButtonSize;
                    }
                    else {
                        scrollbarTop = navigator.top + (navigatorEnabled ?
                            navigator.height :
                            -scrollbarHeight);
                        scrollbarLeft = navigator.left - scrollButtonSize;
                    }
                    // Reposition scrollbar
                    navigator.scrollbar.position(scrollbarLeft, scrollbarTop, navigatorWidth, scrollbarHeight);
                    // Keep scale 0-1
                    navigator.scrollbar.setRange(
                    // Use real value, not rounded because range can be very small
                    // (#1716)
                    navigator.zoomedMin / (navigatorSize || 1), navigator.zoomedMax / (navigatorSize || 1));
                }
                navigator.rendered = true;
                fireEvent(this, 'afterRender');
            }
            /**
             * Set up the mouse and touch events for the navigator
             *
             * @private
             * @function Highcharts.Navigator#addMouseEvents
             */
            addMouseEvents() {
                const navigator = this, chart = navigator.chart, container = chart.container;
                let eventsToUnbind = [], mouseMoveHandler, mouseUpHandler;
                /**
                 * Create mouse events' handlers.
                 * Make them as separate functions to enable wrapping them:
                 */
                navigator.mouseMoveHandler = mouseMoveHandler = function (e) {
                    navigator.onMouseMove(e);
                };
                navigator.mouseUpHandler = mouseUpHandler = function (e) {
                    navigator.onMouseUp(e);
                };
                // Add shades and handles mousedown events
                eventsToUnbind = navigator.getPartsEvents('mousedown');
                eventsToUnbind.push(
                // Add mouse move and mouseup events. These are bind to doc/div,
                // because Navigator.grabbedSomething flags are stored in mousedown
                // events
                addEvent(chart.renderTo, 'mousemove', mouseMoveHandler), addEvent(container.ownerDocument, 'mouseup', mouseUpHandler), 
                // Touch events
                addEvent(chart.renderTo, 'touchmove', mouseMoveHandler), addEvent(container.ownerDocument, 'touchend', mouseUpHandler));
                eventsToUnbind.concat(navigator.getPartsEvents('touchstart'));
                navigator.eventsToUnbind = eventsToUnbind;
                // Data events
                if (navigator.series && navigator.series[0]) {
                    eventsToUnbind.push(addEvent(navigator.series[0].xAxis, 'foundExtremes', function () {
                        chart.navigator.modifyNavigatorAxisExtremes();
                    }));
                }
            }
            /**
             * Generate events for handles and masks
             *
             * @private
             * @function Highcharts.Navigator#getPartsEvents
             *
             * @param {string} eventName
             *        Event name handler, 'mousedown' or 'touchstart'
             *
             * @return {Array<Function>}
             *         An array of functions to remove navigator functions from the
             *         events again.
             */
            getPartsEvents(eventName) {
                const navigator = this, events = [];
                ['shades', 'handles'].forEach(function (name) {
                    navigator[name].forEach(function (navigatorItem, index) {
                        events.push(addEvent(navigatorItem.element, eventName, function (e) {
                            navigator[name + 'Mousedown'](e, index);
                        }));
                    });
                });
                return events;
            }
            /**
             * Mousedown on a shaded mask, either:
             *
             * - will be stored for future drag&drop
             *
             * - will directly shift to a new range
             *
             * @private
             * @function Highcharts.Navigator#shadesMousedown
             *
             * @param {Highcharts.PointerEventObject} e
             *        Mouse event
             *
             * @param {number} index
             *        Index of a mask in Navigator.shades array
             */
            shadesMousedown(e, index) {
                e = this.chart.pointer?.normalize(e) || e;
                const navigator = this, chart = navigator.chart, xAxis = navigator.xAxis, zoomedMin = navigator.zoomedMin, navigatorSize = navigator.size, range = navigator.range;
                let navigatorPosition = navigator.left, chartX = e.chartX, fixedMax, fixedMin, ext, left;
                // For inverted chart, swap some options:
                if (chart.inverted) {
                    chartX = e.chartY;
                    navigatorPosition = navigator.top;
                }
                if (index === 1) {
                    // Store information for drag&drop
                    navigator.grabbedCenter = chartX;
                    navigator.fixedWidth = range;
                    navigator.dragOffset = chartX - zoomedMin;
                }
                else {
                    // Shift the range by clicking on shaded areas
                    left = chartX - navigatorPosition - range / 2;
                    if (index === 0) {
                        left = Math.max(0, left);
                    }
                    else if (index === 2 && left + range >= navigatorSize) {
                        left = navigatorSize - range;
                        if (navigator.reversedExtremes) {
                            // #7713
                            left -= range;
                            fixedMin = navigator.getUnionExtremes().dataMin;
                        }
                        else {
                            // #2293, #3543
                            fixedMax = navigator.getUnionExtremes().dataMax;
                        }
                    }
                    if (left !== zoomedMin) { // It has actually moved
                        navigator.fixedWidth = range; // #1370
                        ext = xAxis.navigatorAxis.toFixedRange(left, left + range, fixedMin, fixedMax);
                        if (defined(ext.min)) { // #7411
                            fireEvent(this, 'setRange', {
                                min: Math.min(ext.min, ext.max),
                                max: Math.max(ext.min, ext.max),
                                redraw: true,
                                eventArguments: {
                                    trigger: 'navigator'
                                }
                            });
                        }
                    }
                }
            }
            /**
             * Mousedown on a handle mask.
             * Will store necessary information for drag&drop.
             *
             * @private
             * @function Highcharts.Navigator#handlesMousedown
             * @param {Highcharts.PointerEventObject} e
             *        Mouse event
             * @param {number} index
             *        Index of a handle in Navigator.handles array
             */
            handlesMousedown(e, index) {
                e = this.chart.pointer?.normalize(e) || e;
                const navigator = this, chart = navigator.chart, baseXAxis = chart.xAxis[0], 
                // For reversed axes, min and max are changed,
                // so the other extreme should be stored
                reverse = navigator.reversedExtremes;
                if (index === 0) {
                    // Grab the left handle
                    navigator.grabbedLeft = true;
                    navigator.otherHandlePos = navigator.zoomedMax;
                    navigator.fixedExtreme = reverse ? baseXAxis.min : baseXAxis.max;
                }
                else {
                    // Grab the right handle
                    navigator.grabbedRight = true;
                    navigator.otherHandlePos = navigator.zoomedMin;
                    navigator.fixedExtreme = reverse ? baseXAxis.max : baseXAxis.min;
                }
                chart.setFixedRange(void 0);
            }
            /**
             * Mouse move event based on x/y mouse position.
             *
             * @private
             * @function Highcharts.Navigator#onMouseMove
             *
             * @param {Highcharts.PointerEventObject} e
             *        Mouse event
             */
            onMouseMove(e) {
                const navigator = this, chart = navigator.chart, navigatorSize = navigator.navigatorSize, range = navigator.range, dragOffset = navigator.dragOffset, inverted = chart.inverted;
                let left = navigator.left, chartX;
                // In iOS, a mousemove event with e.pageX === 0 is fired when holding
                // the finger down in the center of the scrollbar. This should be
                // ignored.
                if (!e.touches || e.touches[0].pageX !== 0) { // #4696
                    e = chart.pointer?.normalize(e) || e;
                    chartX = e.chartX;
                    // Swap some options for inverted chart
                    if (inverted) {
                        left = navigator.top;
                        chartX = e.chartY;
                    }
                    // Drag left handle or top handle
                    if (navigator.grabbedLeft) {
                        navigator.hasDragged = true;
                        navigator.render(0, 0, chartX - left, navigator.otherHandlePos);
                        // Drag right handle or bottom handle
                    }
                    else if (navigator.grabbedRight) {
                        navigator.hasDragged = true;
                        navigator.render(0, 0, navigator.otherHandlePos, chartX - left);
                        // Drag scrollbar or open area in navigator
                    }
                    else if (navigator.grabbedCenter) {
                        navigator.hasDragged = true;
                        if (chartX < dragOffset) { // Outside left
                            chartX = dragOffset;
                            // Outside right
                        }
                        else if (chartX >
                            navigatorSize + dragOffset - range) {
                            chartX = navigatorSize + dragOffset - range;
                        }
                        navigator.render(0, 0, chartX - dragOffset, chartX - dragOffset + range);
                    }
                    if (navigator.hasDragged &&
                        navigator.scrollbar &&
                        pick(navigator.scrollbar.options.liveRedraw, 
                        // By default, don't run live redraw on touch
                        // devices or if the chart is in boost.
                        !isTouchDevice &&
                            !this.chart.boosted)) {
                        e.DOMType = e.type;
                        setTimeout(function () {
                            navigator.onMouseUp(e);
                        }, 0);
                    }
                }
            }
            /**
             * Mouse up event based on x/y mouse position.
             *
             * @private
             * @function Highcharts.Navigator#onMouseUp
             * @param {Highcharts.PointerEventObject} e
             *        Mouse event
             */
            onMouseUp(e) {
                const navigator = this, chart = navigator.chart, xAxis = navigator.xAxis, scrollbar = navigator.scrollbar, DOMEvent = e.DOMEvent || e, inverted = chart.inverted, verb = navigator.rendered && !navigator.hasDragged ?
                    'animate' : 'attr';
                let zoomedMax, zoomedMin, unionExtremes, fixedMin, fixedMax, ext;
                if (
                // MouseUp is called for both, navigator and scrollbar (that order),
                // which causes calling afterSetExtremes twice. Prevent first call
                // by checking if scrollbar is going to set new extremes (#6334)
                (navigator.hasDragged && (!scrollbar || !scrollbar.hasDragged)) ||
                    e.trigger === 'scrollbar') {
                    unionExtremes = navigator.getUnionExtremes();
                    // When dragging one handle, make sure the other one doesn't change
                    if (navigator.zoomedMin === navigator.otherHandlePos) {
                        fixedMin = navigator.fixedExtreme;
                    }
                    else if (navigator.zoomedMax === navigator.otherHandlePos) {
                        fixedMax = navigator.fixedExtreme;
                    }
                    // Snap to right edge (#4076)
                    if (navigator.zoomedMax === navigator.size) {
                        fixedMax = navigator.reversedExtremes ?
                            unionExtremes.dataMin :
                            unionExtremes.dataMax;
                    }
                    // Snap to left edge (#7576)
                    if (navigator.zoomedMin === 0) {
                        fixedMin = navigator.reversedExtremes ?
                            unionExtremes.dataMax :
                            unionExtremes.dataMin;
                    }
                    ext = xAxis.navigatorAxis.toFixedRange(navigator.zoomedMin, navigator.zoomedMax, fixedMin, fixedMax);
                    if (defined(ext.min)) {
                        fireEvent(this, 'setRange', {
                            min: Math.min(ext.min, ext.max),
                            max: Math.max(ext.min, ext.max),
                            redraw: true,
                            animation: navigator.hasDragged ? false : null,
                            eventArguments: {
                                trigger: 'navigator',
                                triggerOp: 'navigator-drag',
                                DOMEvent: DOMEvent // #1838
                            }
                        });
                    }
                }
                if (e.DOMType !== 'mousemove' &&
                    e.DOMType !== 'touchmove') {
                    navigator.grabbedLeft = navigator.grabbedRight =
                        navigator.grabbedCenter = navigator.fixedWidth =
                            navigator.fixedExtreme = navigator.otherHandlePos =
                                navigator.hasDragged = navigator.dragOffset = null;
                }
                // Update position of navigator shades, outline and handles (#12573)
                if (navigator.navigatorEnabled &&
                    isNumber(navigator.zoomedMin) &&
                    isNumber(navigator.zoomedMax)) {
                    zoomedMin = Math.round(navigator.zoomedMin);
                    zoomedMax = Math.round(navigator.zoomedMax);
                    if (navigator.shades) {
                        navigator.drawMasks(zoomedMin, zoomedMax, inverted, verb);
                    }
                    if (navigator.outline) {
                        navigator.drawOutline(zoomedMin, zoomedMax, inverted, verb);
                    }
                    if (navigator.navigatorOptions.handles.enabled &&
                        Object.keys(navigator.handles).length ===
                            navigator.handles.length) {
                        navigator.drawHandle(zoomedMin, 0, inverted, verb);
                        navigator.drawHandle(zoomedMax, 1, inverted, verb);
                    }
                }
            }
            /**
             * Removes the event handlers attached previously with addEvents.
             *
             * @private
             * @function Highcharts.Navigator#removeEvents
             */
            removeEvents() {
                if (this.eventsToUnbind) {
                    this.eventsToUnbind.forEach(function (unbind) {
                        unbind();
                    });
                    this.eventsToUnbind = void 0;
                }
                this.removeBaseSeriesEvents();
            }
            /**
             * Remove data events.
             *
             * @private
             * @function Highcharts.Navigator#removeBaseSeriesEvents
             */
            removeBaseSeriesEvents() {
                const baseSeries = this.baseSeries || [];
                if (this.navigatorEnabled && baseSeries[0]) {
                    if (this.navigatorOptions.adaptToUpdatedData !== false) {
                        baseSeries.forEach(function (series) {
                            removeEvent(series, 'updatedData', this.updatedDataHandler);
                        }, this);
                    }
                    // We only listen for extremes-events on the first baseSeries
                    if (baseSeries[0].xAxis) {
                        removeEvent(baseSeries[0].xAxis, 'foundExtremes', this.modifyBaseAxisExtremes);
                    }
                }
            }
            /**
             * Initialize the Navigator object
             *
             * @private
             * @function Highcharts.Navigator#init
             */
            init(chart) {
                const chartOptions = chart.options, navigatorOptions = chartOptions.navigator || {}, navigatorEnabled = navigatorOptions.enabled, scrollbarOptions = chartOptions.scrollbar || {}, scrollbarEnabled = scrollbarOptions.enabled, height = navigatorEnabled && navigatorOptions.height || 0, scrollbarHeight = scrollbarEnabled && scrollbarOptions.height || 0, scrollButtonSize = scrollbarOptions.buttonsEnabled && scrollbarHeight || 0;
                this.handles = [];
                this.shades = [];
                this.chart = chart;
                this.setBaseSeries();
                this.height = height;
                this.scrollbarHeight = scrollbarHeight;
                this.scrollButtonSize = scrollButtonSize;
                this.scrollbarEnabled = scrollbarEnabled;
                this.navigatorEnabled = navigatorEnabled;
                this.navigatorOptions = navigatorOptions;
                this.scrollbarOptions = scrollbarOptions;
                this.opposite = pick(navigatorOptions.opposite, Boolean(!navigatorEnabled && chart.inverted)); // #6262
                const navigator = this, baseSeries = navigator.baseSeries, xAxisIndex = chart.xAxis.length, yAxisIndex = chart.yAxis.length, baseXaxis = baseSeries && baseSeries[0] && baseSeries[0].xAxis ||
                    chart.xAxis[0] || { options: {} };
                chart.isDirtyBox = true;
                if (navigator.navigatorEnabled) {
                    // An x axis is required for scrollbar also
                    navigator.xAxis = new Axis(chart, merge({
                        // Inherit base xAxis' break, ordinal options and overscroll
                        breaks: baseXaxis.options.breaks,
                        ordinal: baseXaxis.options.ordinal,
                        overscroll: baseXaxis.options.overscroll
                    }, navigatorOptions.xAxis, {
                        id: 'navigator-x-axis',
                        yAxis: 'navigator-y-axis',
                        type: 'datetime',
                        index: xAxisIndex,
                        isInternal: true,
                        offset: 0,
                        keepOrdinalPadding: true,
                        startOnTick: false,
                        endOnTick: false,
                        minPadding: 0,
                        maxPadding: 0,
                        zoomEnabled: false
                    }, chart.inverted ? {
                        offsets: [scrollButtonSize, 0, -scrollButtonSize, 0],
                        width: height
                    } : {
                        offsets: [0, -scrollButtonSize, 0, scrollButtonSize],
                        height: height
                    }), 'xAxis');
                    navigator.yAxis = new Axis(chart, merge(navigatorOptions.yAxis, {
                        id: 'navigator-y-axis',
                        alignTicks: false,
                        offset: 0,
                        index: yAxisIndex,
                        isInternal: true,
                        reversed: pick((navigatorOptions.yAxis &&
                            navigatorOptions.yAxis.reversed), (chart.yAxis[0] && chart.yAxis[0].reversed), false),
                        zoomEnabled: false
                    }, chart.inverted ? {
                        width: height
                    } : {
                        height: height
                    }), 'yAxis');
                    // If we have a base series, initialize the navigator series
                    if (baseSeries || navigatorOptions.series.data) {
                        navigator.updateNavigatorSeries(false);
                        // If not, set up an event to listen for added series
                    }
                    else if (chart.series.length === 0) {
                        navigator.unbindRedraw = addEvent(chart, 'beforeRedraw', function () {
                            // We've got one, now add it as base
                            if (chart.series.length > 0 && !navigator.series) {
                                navigator.setBaseSeries();
                                navigator.unbindRedraw(); // Reset
                            }
                        });
                    }
                    navigator.reversedExtremes = (chart.inverted && !navigator.xAxis.reversed) || (!chart.inverted && navigator.xAxis.reversed);
                    // Render items, so we can bind events to them:
                    navigator.renderElements();
                    // Add mouse events
                    navigator.addMouseEvents();
                    // In case of scrollbar only, fake an x axis to get translation
                }
                else {
                    navigator.xAxis = {
                        chart,
                        navigatorAxis: {
                            fake: true
                        },
                        translate: function (value, reverse) {
                            const axis = chart.xAxis[0], ext = axis.getExtremes(), scrollTrackWidth = axis.len - 2 * scrollButtonSize, min = numExt('min', axis.options.min, ext.dataMin), valueRange = numExt('max', axis.options.max, ext.dataMax) - min;
                            return reverse ?
                                // From pixel to value
                                (value * valueRange / scrollTrackWidth) + min :
                                // From value to pixel
                                scrollTrackWidth * (value - min) / valueRange;
                        },
                        toPixels: function (value) {
                            return this.translate(value);
                        },
                        toValue: function (value) {
                            return this.translate(value, true);
                        }
                    };
                    navigator.xAxis.navigatorAxis.axis = navigator.xAxis;
                    navigator.xAxis.navigatorAxis.toFixedRange = (NavigatorAxisAdditions.prototype.toFixedRange.bind(navigator.xAxis.navigatorAxis));
                }
                // Initialize the scrollbar
                if (chart.options.scrollbar.enabled) {
                    const options = merge(chart.options.scrollbar, { vertical: chart.inverted });
                    if (!isNumber(options.margin) && navigator.navigatorEnabled) {
                        options.margin = chart.inverted ? -3 : 3;
                    }
                    chart.scrollbar = navigator.scrollbar = new Scrollbar(chart.renderer, options, chart);
                    addEvent(navigator.scrollbar, 'changed', function (e) {
                        const range = navigator.size, to = range * this.to, from = range * this.from;
                        navigator.hasDragged = navigator.scrollbar.hasDragged;
                        navigator.render(0, 0, from, to);
                        if (this.shouldUpdateExtremes(e.DOMType)) {
                            setTimeout(function () {
                                navigator.onMouseUp(e);
                            });
                        }
                    });
                }
                // Add data events
                navigator.addBaseSeriesEvents();
                // Add redraw events
                navigator.addChartEvents();
            }
            /**
             * Get the union data extremes of the chart - the outer data extremes of the
             * base X axis and the navigator axis.
             *
             * @private
             * @function Highcharts.Navigator#getUnionExtremes
             */
            getUnionExtremes(returnFalseOnNoBaseSeries) {
                const baseAxis = this.chart.xAxis[0], navAxis = this.xAxis, navAxisOptions = navAxis.options, baseAxisOptions = baseAxis.options;
                let ret;
                if (!returnFalseOnNoBaseSeries || baseAxis.dataMin !== null) {
                    ret = {
                        dataMin: pick(// #4053
                        navAxisOptions && navAxisOptions.min, numExt('min', baseAxisOptions.min, baseAxis.dataMin, navAxis.dataMin, navAxis.min)),
                        dataMax: pick(navAxisOptions && navAxisOptions.max, numExt('max', baseAxisOptions.max, baseAxis.dataMax, navAxis.dataMax, navAxis.max))
                    };
                }
                return ret;
            }
            /**
             * Set the base series and update the navigator series from this. With a bit
             * of modification we should be able to make this an API method to be called
             * from the outside
             *
             * @private
             * @function Highcharts.Navigator#setBaseSeries
             * @param {Highcharts.SeriesOptionsType} [baseSeriesOptions]
             *        Additional series options for a navigator
             * @param {boolean} [redraw]
             *        Whether to redraw after update.
             */
            setBaseSeries(baseSeriesOptions, redraw) {
                const chart = this.chart, baseSeries = this.baseSeries = [];
                baseSeriesOptions = (baseSeriesOptions ||
                    chart.options && chart.options.navigator.baseSeries ||
                    (chart.series.length ?
                        // Find the first non-navigator series (#8430)
                        find(chart.series, (s) => (!s.options.isInternal)).index :
                        0));
                // Iterate through series and add the ones that should be shown in
                // navigator.
                (chart.series || []).forEach((series, i) => {
                    if (
                    // Don't include existing nav series
                    !series.options.isInternal &&
                        (series.options.showInNavigator ||
                            (i === baseSeriesOptions ||
                                series.options.id === baseSeriesOptions) &&
                                series.options.showInNavigator !== false)) {
                        baseSeries.push(series);
                    }
                });
                // When run after render, this.xAxis already exists
                if (this.xAxis && !this.xAxis.navigatorAxis.fake) {
                    this.updateNavigatorSeries(true, redraw);
                }
            }
            /**
             * Update series in the navigator from baseSeries, adding new if does not
             * exist.
             *
             * @private
             * @function Highcharts.Navigator.updateNavigatorSeries
             */
            updateNavigatorSeries(addEvents, redraw) {
                const navigator = this, chart = navigator.chart, baseSeries = navigator.baseSeries, navSeriesMixin = {
                    enableMouseTracking: false,
                    index: null,
                    linkedTo: null,
                    group: 'nav',
                    padXAxis: false,
                    xAxis: 'navigator-x-axis',
                    yAxis: 'navigator-y-axis',
                    showInLegend: false,
                    stacking: void 0,
                    isInternal: true,
                    states: {
                        inactive: {
                            opacity: 1
                        }
                    }
                }, 
                // Remove navigator series that are no longer in the baseSeries
                navigatorSeries = navigator.series =
                    (navigator.series || []).filter((navSeries) => {
                        const base = navSeries.baseSeries;
                        if (baseSeries.indexOf(base) < 0) { // Not in array
                            // If there is still a base series connected to this
                            // series, remove event handler and reference.
                            if (base) {
                                removeEvent(base, 'updatedData', navigator.updatedDataHandler);
                                delete base.navigatorSeries;
                            }
                            // Kill the nav series. It may already have been
                            // destroyed (#8715).
                            if (navSeries.chart) {
                                navSeries.destroy();
                            }
                            return false;
                        }
                        return true;
                    });
                let baseOptions, mergedNavSeriesOptions, chartNavigatorSeriesOptions = navigator.navigatorOptions.series, baseNavigatorOptions;
                // Go through each base series and merge the options to create new
                // series
                if (baseSeries && baseSeries.length) {
                    baseSeries.forEach((base) => {
                        const linkedNavSeries = base.navigatorSeries, userNavOptions = extend(
                        // Grab color and visibility from base as default
                        {
                            color: base.color,
                            visible: base.visible
                        }, !isArray(chartNavigatorSeriesOptions) ?
                            chartNavigatorSeriesOptions :
                            defaultOptions.navigator.series);
                        // Don't update if the series exists in nav and we have disabled
                        // adaptToUpdatedData.
                        if (linkedNavSeries &&
                            navigator.navigatorOptions.adaptToUpdatedData === false) {
                            return;
                        }
                        navSeriesMixin.name = 'Navigator ' + baseSeries.length;
                        baseOptions = base.options || {};
                        baseNavigatorOptions = baseOptions.navigatorOptions || {};
                        // The dataLabels options are not merged correctly
                        // if the settings are an array, #13847.
                        userNavOptions.dataLabels = splat(userNavOptions.dataLabels);
                        mergedNavSeriesOptions = merge(baseOptions, navSeriesMixin, userNavOptions, baseNavigatorOptions);
                        // Once nav series type is resolved, pick correct pointRange
                        mergedNavSeriesOptions.pointRange = pick(
                        // Stricte set pointRange in options
                        userNavOptions.pointRange, baseNavigatorOptions.pointRange, 
                        // Fallback to default values, e.g. `null` for column
                        defaultOptions.plotOptions[mergedNavSeriesOptions.type || 'line'].pointRange);
                        // Merge data separately. Do a slice to avoid mutating the
                        // navigator options from base series (#4923).
                        const navigatorSeriesData = baseNavigatorOptions.data || userNavOptions.data;
                        navigator.hasNavigatorData =
                            navigator.hasNavigatorData || !!navigatorSeriesData;
                        mergedNavSeriesOptions.data =
                            navigatorSeriesData ||
                                baseOptions.data && baseOptions.data.slice(0);
                        // Update or add the series
                        if (linkedNavSeries && linkedNavSeries.options) {
                            linkedNavSeries.update(mergedNavSeriesOptions, redraw);
                        }
                        else {
                            base.navigatorSeries = chart.initSeries(mergedNavSeriesOptions);
                            // Set data on initial run with dataSorting enabled (#20318)
                            chart.setSortedData();
                            base.navigatorSeries.baseSeries = base; // Store ref
                            navigatorSeries.push(base.navigatorSeries);
                        }
                    });
                }
                // If user has defined data (and no base series) or explicitly defined
                // navigator.series as an array, we create these series on top of any
                // base series.
                if (chartNavigatorSeriesOptions.data &&
                    !(baseSeries && baseSeries.length) ||
                    isArray(chartNavigatorSeriesOptions)) {
                    navigator.hasNavigatorData = false;
                    // Allow navigator.series to be an array
                    chartNavigatorSeriesOptions =
                        splat(chartNavigatorSeriesOptions);
                    chartNavigatorSeriesOptions.forEach((userSeriesOptions, i) => {
                        navSeriesMixin.name =
                            'Navigator ' + (navigatorSeries.length + 1);
                        mergedNavSeriesOptions = merge(defaultOptions.navigator.series, {
                            // Since we don't have a base series to pull color from,
                            // try to fake it by using color from series with same
                            // index. Otherwise pull from the colors array. We need
                            // an explicit color as otherwise updates will increment
                            // color counter and we'll get a new color for each
                            // update of the nav series.
                            color: chart.series[i] &&
                                !chart.series[i].options.isInternal &&
                                chart.series[i].color ||
                                chart.options.colors[i] ||
                                chart.options.colors[0]
                        }, navSeriesMixin, userSeriesOptions);
                        mergedNavSeriesOptions.data = userSeriesOptions.data;
                        if (mergedNavSeriesOptions.data) {
                            navigator.hasNavigatorData = true;
                            navigatorSeries.push(chart.initSeries(mergedNavSeriesOptions));
                        }
                    });
                }
                if (addEvents) {
                    this.addBaseSeriesEvents();
                }
            }
            /**
             * Add data events.
             * For example when main series is updated we need to recalculate extremes
             *
             * @private
             * @function Highcharts.Navigator#addBaseSeriesEvent
             */
            addBaseSeriesEvents() {
                const navigator = this, baseSeries = navigator.baseSeries || [];
                // Bind modified extremes event to first base's xAxis only.
                // In event of > 1 base-xAxes, the navigator will ignore those.
                // Adding this multiple times to the same axis is no problem, as
                // duplicates should be discarded by the browser.
                if (baseSeries[0] && baseSeries[0].xAxis) {
                    baseSeries[0].eventsToUnbind.push(addEvent(baseSeries[0].xAxis, 'foundExtremes', this.modifyBaseAxisExtremes));
                }
                baseSeries.forEach((base) => {
                    // Link base series show/hide to navigator series visibility
                    base.eventsToUnbind.push(addEvent(base, 'show', function () {
                        if (this.navigatorSeries) {
                            this.navigatorSeries.setVisible(true, false);
                        }
                    }));
                    base.eventsToUnbind.push(addEvent(base, 'hide', function () {
                        if (this.navigatorSeries) {
                            this.navigatorSeries.setVisible(false, false);
                        }
                    }));
                    // Respond to updated data in the base series, unless explicitly
                    // not adapting to data changes.
                    if (this.navigatorOptions.adaptToUpdatedData !== false) {
                        if (base.xAxis) {
                            base.eventsToUnbind.push(addEvent(base, 'updatedData', this.updatedDataHandler));
                        }
                    }
                    // Handle series removal
                    base.eventsToUnbind.push(addEvent(base, 'remove', function () {
                        if (this.navigatorSeries) {
                            erase(navigator.series, this.navigatorSeries);
                            if (defined(this.navigatorSeries.options)) {
                                this.navigatorSeries.remove(false);
                            }
                            delete this.navigatorSeries;
                        }
                    }));
                });
            }
            /**
             * Get minimum from all base series connected to the navigator
             * @private
             * @param {number} currentSeriesMin
             *        Minium from the current series
             * @return {number}
             *         Minimum from all series
             */
            getBaseSeriesMin(currentSeriesMin) {
                return this.baseSeries.reduce(function (min, series) {
                    // (#10193)
                    return Math.min(min, series.xData && series.xData.length ?
                        series.xData[0] : min);
                }, currentSeriesMin);
            }
            /**
             * Set the navigator x axis extremes to reflect the total. The navigator
             * extremes should always be the extremes of the union of all series in the
             * chart as well as the navigator series.
             *
             * @private
             * @function Highcharts.Navigator#modifyNavigatorAxisExtremes
             */
            modifyNavigatorAxisExtremes() {
                const xAxis = this.xAxis;
                if (typeof xAxis.getExtremes !== 'undefined') {
                    const unionExtremes = this.getUnionExtremes(true);
                    if (unionExtremes &&
                        (unionExtremes.dataMin !== xAxis.min ||
                            unionExtremes.dataMax !== xAxis.max)) {
                        xAxis.min = unionExtremes.dataMin;
                        xAxis.max = unionExtremes.dataMax;
                    }
                }
            }
            /**
             * Hook to modify the base axis extremes with information from the Navigator
             *
             * @private
             * @function Highcharts.Navigator#modifyBaseAxisExtremes
             */
            modifyBaseAxisExtremes() {
                const baseXAxis = this, navigator = baseXAxis.chart.navigator, baseExtremes = baseXAxis.getExtremes(), baseMin = baseExtremes.min, baseMax = baseExtremes.max, baseDataMin = baseExtremes.dataMin, baseDataMax = baseExtremes.dataMax, range = baseMax - baseMin, stickToMin = navigator.stickToMin, stickToMax = navigator.stickToMax, overscroll = pick(baseXAxis.ordinal?.convertOverscroll(baseXAxis.options.overscroll), 0), navigatorSeries = navigator.series && navigator.series[0], hasSetExtremes = !!baseXAxis.setExtremes, 
                // When the extremes have been set by range selector button, don't
                // stick to min or max. The range selector buttons will handle the
                // extremes. (#5489)
                unmutable = baseXAxis.eventArgs &&
                    baseXAxis.eventArgs.trigger === 'rangeSelectorButton';
                let newMax, newMin;
                if (!unmutable) {
                    // If the zoomed range is already at the min, move it to the right
                    // as new data comes in
                    if (stickToMin) {
                        newMin = baseDataMin;
                        newMax = newMin + range;
                    }
                    // If the zoomed range is already at the max, move it to the right
                    // as new data comes in
                    if (stickToMax) {
                        newMax = baseDataMax + overscroll;
                        // If stickToMin is true, the new min value is set above
                        if (!stickToMin) {
                            newMin = Math.max(baseDataMin, // Don't go below data extremes (#13184)
                            newMax - range, navigator.getBaseSeriesMin(navigatorSeries && navigatorSeries.xData ?
                                navigatorSeries.xData[0] :
                                -Number.MAX_VALUE));
                        }
                    }
                    // Update the extremes
                    if (hasSetExtremes && (stickToMin || stickToMax)) {
                        if (isNumber(newMin)) {
                            baseXAxis.min = baseXAxis.userMin = newMin;
                            baseXAxis.max = baseXAxis.userMax = newMax;
                        }
                    }
                }
                // Reset
                navigator.stickToMin =
                    navigator.stickToMax = null;
            }
            /**
             * Handler for updated data on the base series. When data is modified, the
             * navigator series must reflect it. This is called from the Chart.redraw
             * function before axis and series extremes are computed.
             *
             * @private
             * @function Highcharts.Navigator#updateDataHandler
             */
            updatedDataHandler() {
                const navigator = this.chart.navigator, baseSeries = this, navigatorSeries = this.navigatorSeries, shouldStickToMax = navigator.reversedExtremes ?
                    Math.round(navigator.zoomedMin) === 0 :
                    Math.round(navigator.zoomedMax) >= Math.round(navigator.size);
                // If the scrollbar is scrolled all the way to the right, keep right as
                // new data comes in, unless user set navigator.stickToMax to false.
                navigator.stickToMax = pick(this.chart.options.navigator &&
                    this.chart.options.navigator.stickToMax, shouldStickToMax);
                navigator.stickToMin = navigator.shouldStickToMin(baseSeries, navigator);
                // Set the navigator series data to the new data of the base series
                if (navigatorSeries && !navigator.hasNavigatorData) {
                    navigatorSeries.options.pointStart = baseSeries.xData[0];
                    navigatorSeries.setData(baseSeries.options.data, false, null, false); // #5414
                }
            }
            /**
             * Detect if the zoomed area should stick to the minimum, #14742.
             *
             * @private
             * @function Highcharts.Navigator#shouldStickToMin
             */
            shouldStickToMin(baseSeries, navigator) {
                const xDataMin = navigator.getBaseSeriesMin(baseSeries.xData[0]), xAxis = baseSeries.xAxis, max = xAxis.max, min = xAxis.min, range = xAxis.options.range;
                let stickToMin = true;
                if (isNumber(max) && isNumber(min)) {
                    // If range declared, stick to the minimum only if the range
                    // is smaller than the data set range.
                    if (range && max - xDataMin > 0) {
                        stickToMin = max - xDataMin < range;
                    }
                    else {
                        // If the current axis minimum falls outside the new
                        // updated dataset, we must adjust.
                        stickToMin = min <= xDataMin;
                    }
                }
                else {
                    stickToMin = false; // #15864
                }
                return stickToMin;
            }
            /**
             * Add chart events, like redrawing navigator, when chart requires that.
             *
             * @private
             * @function Highcharts.Navigator#addChartEvents
             */
            addChartEvents() {
                if (!this.eventsToUnbind) {
                    this.eventsToUnbind = [];
                }
                this.eventsToUnbind.push(
                // Move the scrollbar after redraw, like after data updata even if
                // axes don't redraw
                addEvent(this.chart, 'redraw', function () {
                    const navigator = this.navigator, xAxis = navigator && (navigator.baseSeries &&
                        navigator.baseSeries[0] &&
                        navigator.baseSeries[0].xAxis ||
                        this.xAxis[0]); // #5709, #13114
                    if (xAxis) {
                        navigator.render(xAxis.min, xAxis.max);
                    }
                }), 
                // Make room for the navigator, can be placed around the chart:
                addEvent(this.chart, 'getMargins', function () {
                    const chart = this, navigator = chart.navigator;
                    let marginName = navigator.opposite ?
                        'plotTop' : 'marginBottom';
                    if (chart.inverted) {
                        marginName = navigator.opposite ?
                            'marginRight' : 'plotLeft';
                    }
                    chart[marginName] =
                        (chart[marginName] || 0) + (navigator.navigatorEnabled || !chart.inverted ?
                            navigator.height + navigator.scrollbarHeight :
                            0) + navigator.navigatorOptions.margin;
                }), addEvent(Navigator, 'setRange', function (e) {
                    this.chart.xAxis[0].setExtremes(e.min, e.max, e.redraw, e.animation, e.eventArguments);
                }));
            }
            /**
             * Destroys allocated elements.
             *
             * @private
             * @function Highcharts.Navigator#destroy
             */
            destroy() {
                // Disconnect events added in addEvents
                this.removeEvents();
                if (this.xAxis) {
                    erase(this.chart.xAxis, this.xAxis);
                    erase(this.chart.axes, this.xAxis);
                }
                if (this.yAxis) {
                    erase(this.chart.yAxis, this.yAxis);
                    erase(this.chart.axes, this.yAxis);
                }
                // Destroy series
                (this.series || []).forEach((s) => {
                    if (s.destroy) {
                        s.destroy();
                    }
                });
                // Destroy properties
                [
                    'series', 'xAxis', 'yAxis', 'shades', 'outline', 'scrollbarTrack',
                    'scrollbarRifles', 'scrollbarGroup', 'scrollbar', 'navigatorGroup',
                    'rendered'
                ].forEach((prop) => {
                    if (this[prop] && this[prop].destroy) {
                        this[prop].destroy();
                    }
                    this[prop] = null;
                });
                // Destroy elements in collection
                [this.handles].forEach((coll) => {
                    destroyObjectProperties(coll);
                });
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return Navigator;
    });
    _registerModule(_modules, 'Core/Axis/OrdinalAxis.js', [_modules['Core/Axis/Axis.js'], _modules['Core/Globals.js'], _modules['Core/Series/Series.js'], _modules['Core/Utilities.js']], function (Axis, H, Series, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { addEvent, correctFloat, css, defined, error, isNumber, pick, timeUnits, isString } = U;
        /* *
         *
         *  Composition
         *
         * */
        /**
         * Extends the axis with ordinal support.
         * @private
         */
        var OrdinalAxis;
        (function (OrdinalAxis) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Extends the axis with ordinal support.
             *
             * @private
             *
             * @param AxisClass
             * Axis class to extend.
             *
             * @param ChartClass
             * Chart class to use.
             *
             * @param SeriesClass
             * Series class to use.
             */
            function compose(AxisClass, SeriesClass, ChartClass) {
                const axisProto = AxisClass.prototype;
                if (!axisProto.ordinal2lin) {
                    axisProto.getTimeTicks = getTimeTicks;
                    axisProto.index2val = index2val;
                    axisProto.lin2val = lin2val;
                    axisProto.val2lin = val2lin;
                    // Record this to prevent overwriting by broken-axis module (#5979)
                    axisProto.ordinal2lin = axisProto.val2lin;
                    addEvent(AxisClass, 'afterInit', onAxisAfterInit);
                    addEvent(AxisClass, 'foundExtremes', onAxisFoundExtremes);
                    addEvent(AxisClass, 'afterSetScale', onAxisAfterSetScale);
                    addEvent(AxisClass, 'initialAxisTranslation', onAxisInitialAxisTranslation);
                    addEvent(ChartClass, 'pan', onChartPan);
                    addEvent(SeriesClass, 'updatedData', onSeriesUpdatedData);
                }
                return AxisClass;
            }
            OrdinalAxis.compose = compose;
            /**
             * In an ordinal axis, there might be areas with dense concentrations of
             * points, then large gaps between some. Creating equally distributed
             * ticks over this entire range may lead to a huge number of ticks that
             * will later be removed. So instead, break the positions up in
             * segments, find the tick positions for each segment then concatenize
             * them. This method is used from both data grouping logic and X axis
             * tick position logic.
             * @private
             */
            function getTimeTicks(normalizedInterval, min, max, startOfWeek, positions = [], closestDistance = 0, findHigherRanks) {
                const higherRanks = {}, tickPixelIntervalOption = this.options.tickPixelInterval, time = this.chart.time, 
                // Record all the start positions of a segment, to use when
                // deciding what's a gap in the data.
                segmentStarts = [];
                let end, segmentPositions, hasCrossedHigherRank, info, outsideMax, start = 0, groupPositions = [], lastGroupPosition = -Number.MAX_VALUE;
                // The positions are not always defined, for example for ordinal
                // positions when data has regular interval (#1557, #2090)
                if ((!this.options.ordinal && !this.options.breaks) ||
                    !positions ||
                    positions.length < 3 ||
                    typeof min === 'undefined') {
                    return time.getTimeTicks.apply(time, arguments);
                }
                // Analyze the positions array to split it into segments on gaps
                // larger than 5 times the closest distance. The closest distance is
                // already found at this point, so we reuse that instead of
                // computing it again.
                const posLength = positions.length;
                for (end = 0; end < posLength; end++) {
                    outsideMax = end && positions[end - 1] > max;
                    if (positions[end] < min) { // Set the last position before min
                        start = end;
                    }
                    if (end === posLength - 1 ||
                        positions[end + 1] - positions[end] > closestDistance * 5 ||
                        outsideMax) {
                        // For each segment, calculate the tick positions from the
                        // getTimeTicks utility function. The interval will be the
                        // same regardless of how long the segment is.
                        if (positions[end] > lastGroupPosition) { // #1475
                            segmentPositions = time.getTimeTicks(normalizedInterval, positions[start], positions[end], startOfWeek);
                            // Prevent duplicate groups, for example for multiple
                            // segments within one larger time frame (#1475)
                            while (segmentPositions.length &&
                                segmentPositions[0] <= lastGroupPosition) {
                                segmentPositions.shift();
                            }
                            if (segmentPositions.length) {
                                lastGroupPosition =
                                    segmentPositions[segmentPositions.length - 1];
                            }
                            segmentStarts.push(groupPositions.length);
                            groupPositions = groupPositions.concat(segmentPositions);
                        }
                        // Set start of next segment
                        start = end + 1;
                    }
                    if (outsideMax) {
                        break;
                    }
                }
                // Get the grouping info from the last of the segments. The info is
                // the same for all segments.
                if (segmentPositions) {
                    info = segmentPositions.info;
                    // Optionally identify ticks with higher rank, for example
                    // when the ticks have crossed midnight.
                    if (findHigherRanks && info.unitRange <= timeUnits.hour) {
                        end = groupPositions.length - 1;
                        // Compare points two by two
                        for (start = 1; start < end; start++) {
                            if (time.dateFormat('%d', groupPositions[start]) !==
                                time.dateFormat('%d', groupPositions[start - 1])) {
                                higherRanks[groupPositions[start]] = 'day';
                                hasCrossedHigherRank = true;
                            }
                        }
                        // If the complete array has crossed midnight, we want
                        // to mark the first positions also as higher rank
                        if (hasCrossedHigherRank) {
                            higherRanks[groupPositions[0]] = 'day';
                        }
                        info.higherRanks = higherRanks;
                    }
                    // Save the info
                    info.segmentStarts = segmentStarts;
                    groupPositions.info = info;
                }
                else {
                    error(12, false, this.chart);
                }
                // Don't show ticks within a gap in the ordinal axis, where the
                // space between two points is greater than a portion of the tick
                // pixel interval
                if (findHigherRanks && defined(tickPixelIntervalOption)) {
                    const length = groupPositions.length, translatedArr = [], distances = [];
                    let itemToRemove, translated, lastTranslated, medianDistance, distance, i = length;
                    // Find median pixel distance in order to keep a reasonably even
                    // distance between ticks (#748)
                    while (i--) {
                        translated = this.translate(groupPositions[i]);
                        if (lastTranslated) {
                            distances[i] = lastTranslated - translated;
                        }
                        translatedArr[i] = lastTranslated = translated;
                    }
                    distances.sort();
                    medianDistance = distances[Math.floor(distances.length / 2)];
                    if (medianDistance < tickPixelIntervalOption * 0.6) {
                        medianDistance = null;
                    }
                    // Now loop over again and remove ticks where needed
                    i = groupPositions[length - 1] > max ? length - 1 : length; // #817
                    lastTranslated = void 0;
                    while (i--) {
                        translated = translatedArr[i];
                        distance = Math.abs(lastTranslated - translated);
                        // #4175 - when axis is reversed, the distance, is negative but
                        // tickPixelIntervalOption positive, so we need to compare the
                        // same values
                        // Remove ticks that are closer than 0.6 times the pixel
                        // interval from the one to the right, but not if it is close to
                        // the median distance (#748).
                        if (lastTranslated &&
                            distance < tickPixelIntervalOption * 0.8 &&
                            (medianDistance === null || distance < medianDistance * 0.8)) {
                            // Is this a higher ranked position with a normal
                            // position to the right?
                            if (higherRanks[groupPositions[i]] &&
                                !higherRanks[groupPositions[i + 1]]) {
                                // Yes: remove the lower ranked neighbour to the
                                // right
                                itemToRemove = i + 1;
                                lastTranslated = translated; // #709
                            }
                            else {
                                // No: remove this one
                                itemToRemove = i;
                            }
                            groupPositions.splice(itemToRemove, 1);
                        }
                        else {
                            lastTranslated = translated;
                        }
                    }
                }
                return groupPositions;
            }
            /**
             * Get axis position of given index of the extended ordinal positions.
             * Used only when panning an ordinal axis.
             *
             * @private
             * @function Highcharts.Axis#index2val
             * @param {number} index
             * The index value of searched point
             */
            function index2val(index) {
                const axis = this, ordinal = axis.ordinal, 
                // Context could be changed to extendedOrdinalPositions.
                ordinalPositions = ordinal.positions;
                // The visible range contains only equally spaced values.
                if (!ordinalPositions) {
                    return index;
                }
                let i = ordinalPositions.length - 1, distance;
                if (index < 0) { // Out of range, in effect panning to the left
                    index = ordinalPositions[0];
                }
                else if (index > i) { // Out of range, panning to the right
                    index = ordinalPositions[i];
                }
                else { // Split it up
                    i = Math.floor(index);
                    distance = index - i; // The decimal
                }
                if (typeof distance !== 'undefined' &&
                    typeof ordinalPositions[i] !== 'undefined') {
                    return ordinalPositions[i] + (distance ?
                        distance *
                            (ordinalPositions[i + 1] - ordinalPositions[i]) :
                        0);
                }
                return index;
            }
            /**
             * Translate from linear (internal) to axis value.
             *
             * @private
             * @function Highcharts.Axis#lin2val
             * @param {number} val
             * The linear abstracted value.
             */
            function lin2val(val) {
                const axis = this, ordinal = axis.ordinal, localMin = axis.old ? axis.old.min : axis.min, localA = axis.old ? axis.old.transA : axis.transA;
                // Always use extendedPositions (#19816)
                const positions = ordinal.getExtendedPositions();
                // In some cases (especially in early stages of the chart creation) the
                // getExtendedPositions might return undefined.
                if (positions && positions.length) {
                    // Convert back from modivied value to pixels. // #15970
                    const pixelVal = correctFloat((val - localMin) * localA +
                        axis.minPixelPadding), index = correctFloat(ordinal.getIndexOfPoint(pixelVal, positions)), mantissa = correctFloat(index % 1);
                    // Check if the index is inside position array. If true,
                    // read/approximate value for that exact index.
                    if (index >= 0 && index <= positions.length - 1) {
                        const leftNeighbour = positions[Math.floor(index)], rightNeighbour = positions[Math.ceil(index)], distance = rightNeighbour - leftNeighbour;
                        return positions[Math.floor(index)] + mantissa * distance;
                    }
                }
                // If the value is outside positions array, return initial value
                return val; // #16784
            }
            /**
             * Internal function to calculate the precise index in ordinalPositions
             * array.
             * @private
             */
            function getIndexInArray(ordinalPositions, val) {
                const index = OrdinalAxis.Additions.findIndexOf(ordinalPositions, val, true);
                if (ordinalPositions[index] === val) {
                    return index;
                }
                const percent = (val - ordinalPositions[index]) /
                    (ordinalPositions[index + 1] - ordinalPositions[index]);
                return index + percent;
            }
            /**
            * @private
            */
            function onAxisAfterInit() {
                const axis = this;
                if (!axis.ordinal) {
                    axis.ordinal = new OrdinalAxis.Additions(axis);
                }
            }
            /**
             * @private
             */
            function onAxisFoundExtremes() {
                const axis = this, { eventArgs, options } = axis;
                if (axis.isXAxis &&
                    defined(options.overscroll) &&
                    options.overscroll !== 0 &&
                    isNumber(axis.max) &&
                    isNumber(axis.min)) {
                    if (axis.options.ordinal && !axis.ordinal.originalOrdinalRange) {
                        // Calculate the original ordinal range
                        axis.ordinal.getExtendedPositions(false);
                    }
                    if (axis.max === axis.dataMax &&
                        (
                        // Panning is an exception. We don't want to apply
                        // overscroll when panning over the dataMax
                        eventArgs?.trigger !== 'pan' ||
                            axis.isInternal) &&
                        // Scrollbar buttons are the other execption
                        eventArgs?.trigger !== 'navigator') {
                        const overscroll = axis.ordinal.convertOverscroll(options.overscroll);
                        axis.max += overscroll;
                        // Live data and buttons require translation for the min:
                        if (!axis.isInternal &&
                            defined(axis.userMin) &&
                            eventArgs?.trigger !== 'mousewheel') {
                            axis.min += overscroll;
                        }
                    }
                }
            }
            /**
             * For ordinal axis, that loads data async, redraw axis after data is
             * loaded. If we don't do that, axis will have the same extremes as
             * previously, but ordinal positions won't be calculated. See #10290
             * @private
             */
            function onAxisAfterSetScale() {
                const axis = this;
                if (axis.horiz && !axis.isDirty) {
                    axis.isDirty = axis.isOrdinal &&
                        axis.chart.navigator &&
                        !axis.chart.navigator.adaptToUpdatedData;
                }
            }
            /**
             * @private
             */
            function onAxisInitialAxisTranslation() {
                const axis = this;
                if (axis.ordinal) {
                    axis.ordinal.beforeSetTickPositions();
                    axis.tickInterval = axis.ordinal.postProcessTickInterval(axis.tickInterval);
                }
            }
            /**
             * Extending the Chart.pan method for ordinal axes
             * @private
             */
            function onChartPan(e) {
                const chart = this, xAxis = chart.xAxis[0], overscroll = xAxis.ordinal.convertOverscroll(xAxis.options.overscroll), chartX = e.originalEvent.chartX, panning = chart.options.chart.panning;
                let runBase = false;
                if (panning &&
                    panning.type !== 'y' &&
                    xAxis.options.ordinal &&
                    xAxis.series.length) {
                    const mouseDownX = chart.mouseDownX, extremes = xAxis.getExtremes(), dataMin = extremes.dataMin, dataMax = extremes.dataMax, min = extremes.min, max = extremes.max, hoverPoints = chart.hoverPoints, closestPointRange = (xAxis.closestPointRange ||
                        (xAxis.ordinal && xAxis.ordinal.overscrollPointsRange)), pointPixelWidth = (xAxis.translationSlope *
                        (xAxis.ordinal.slope || closestPointRange)), 
                    // How many ordinal units did we move?
                    movedUnits = Math.round((mouseDownX - chartX) / pointPixelWidth), 
                    // Get index of all the chart's points
                    extendedOrdinalPositions = xAxis.ordinal.getExtendedPositions(), extendedAxis = {
                        ordinal: {
                            positions: extendedOrdinalPositions,
                            extendedOrdinalPositions: extendedOrdinalPositions
                        }
                    }, index2val = xAxis.index2val, val2lin = xAxis.val2lin;
                    let trimmedRange, ordinalPositions;
                    // Make sure panning to the edges does not decrease the zoomed range
                    if ((min <= dataMin && movedUnits < 0) ||
                        (max + overscroll >= dataMax && movedUnits > 0)) {
                        return;
                    }
                    // We have an ordinal axis, but the data is equally spaced
                    if (!extendedAxis.ordinal.positions) {
                        runBase = true;
                    }
                    else if (Math.abs(movedUnits) > 1) {
                        // Remove active points for shared tooltip
                        if (hoverPoints) {
                            hoverPoints.forEach(function (point) {
                                point.setState();
                            });
                        }
                        // In grouped data series, the last ordinal position represents
                        // the grouped data, which is to the left of the real data max.
                        // If we don't compensate for this, we will be allowed to pan
                        // grouped data series passed the right of the plot area.
                        ordinalPositions = extendedAxis.ordinal.positions;
                        if (dataMax >
                            ordinalPositions[ordinalPositions.length - 1]) {
                            ordinalPositions.push(dataMax);
                        }
                        // Get the new min and max values by getting the ordinal index
                        // for the current extreme, then add the moved units and
                        // translate back to values. This happens on the extended
                        // ordinal positions if the new position is out of range, else
                        // it happens on the current x axis which is smaller and faster.
                        chart.setFixedRange(max - min);
                        trimmedRange = xAxis.navigatorAxis
                            .toFixedRange(void 0, void 0, index2val.apply(extendedAxis, [
                            val2lin.apply(extendedAxis, [min, true]) +
                                movedUnits
                        ]), index2val.apply(extendedAxis, [
                            val2lin.apply(extendedAxis, [max, true]) +
                                movedUnits
                        ]));
                        // Apply it if it is within the available data range
                        if (trimmedRange.min >= Math.min(extremes.dataMin, min) &&
                            trimmedRange.max <= Math.max(dataMax, max) + overscroll) {
                            xAxis.setExtremes(trimmedRange.min, trimmedRange.max, true, false, { trigger: 'pan' });
                        }
                        chart.mouseDownX = chartX; // Set new reference for next run
                        css(chart.container, { cursor: 'move' });
                    }
                }
                else {
                    runBase = true;
                }
                // Revert to the linear chart.pan version
                if (runBase || (panning && /y/.test(panning.type))) {
                    if (overscroll) {
                        xAxis.max = xAxis.dataMax + overscroll;
                    }
                }
                else {
                    e.preventDefault();
                }
            }
            /**
             * @private
             */
            function onSeriesUpdatedData() {
                const xAxis = this.xAxis;
                // Destroy the extended ordinal index on updated data
                // and destroy extendedOrdinalPositions, #16055.
                if (xAxis && xAxis.options.ordinal) {
                    delete xAxis.ordinal.index;
                    delete xAxis.ordinal.originalOrdinalRange;
                }
            }
            /**
             * Translate from a linear axis value to the corresponding ordinal axis
             * position. If there are no gaps in the ordinal axis this will be the
             * same. The translated value is the value that the point would have if
             * the axis was linear, using the same min and max.
             *
             * @private
             * @function Highcharts.Axis#val2lin
             * @param {number} val
             * The axis value.
             * @param {boolean} [toIndex]
             * Whether to return the index in the ordinalPositions or the new value.
             */
            function val2lin(val, toIndex) {
                const axis = this, ordinal = axis.ordinal, ordinalPositions = ordinal.positions;
                let slope = ordinal.slope, extendedOrdinalPositions;
                if (!ordinalPositions) {
                    return val;
                }
                const ordinalLength = ordinalPositions.length;
                let ordinalIndex;
                // If the searched value is inside visible plotArea, ivastigate the
                // value basing on ordinalPositions.
                if (ordinalPositions[0] <= val &&
                    ordinalPositions[ordinalLength - 1] >= val) {
                    ordinalIndex = getIndexInArray(ordinalPositions, val);
                    // Final return value is based on ordinalIndex
                }
                else {
                    extendedOrdinalPositions =
                        ordinal.getExtendedPositions &&
                            ordinal.getExtendedPositions();
                    if (!(extendedOrdinalPositions && extendedOrdinalPositions.length)) {
                        return val;
                    }
                    const length = extendedOrdinalPositions.length;
                    if (!slope) {
                        slope =
                            (extendedOrdinalPositions[length - 1] -
                                extendedOrdinalPositions[0]) /
                                length;
                    }
                    // `originalPointReference` is equal to the index of first point of
                    // ordinalPositions in extendedOrdinalPositions.
                    const originalPositionsReference = getIndexInArray(extendedOrdinalPositions, ordinalPositions[0]);
                    // If the searched value is outside the visiblePlotArea,
                    // check if it is inside extendedOrdinalPositions.
                    if (val >= extendedOrdinalPositions[0] &&
                        val <=
                            extendedOrdinalPositions[length - 1]) {
                        // Return Value
                        ordinalIndex = getIndexInArray(extendedOrdinalPositions, val) -
                            originalPositionsReference;
                    }
                    else {
                        if (!toIndex) {
                            // If the value is outside positions array,
                            // return initial value, #16784
                            return val;
                        }
                        // Since ordinal.slope is the average distance between 2
                        // points on visible plotArea, this can be used to calculate
                        // the approximate position of the point, which is outside
                        // the extendedOrdinalPositions.
                        if (val < extendedOrdinalPositions[0]) {
                            const diff = extendedOrdinalPositions[0] - val, approximateIndexOffset = diff / slope;
                            ordinalIndex =
                                -originalPositionsReference -
                                    approximateIndexOffset;
                        }
                        else {
                            const diff = val -
                                extendedOrdinalPositions[length - 1], approximateIndexOffset = diff / slope;
                            ordinalIndex =
                                approximateIndexOffset +
                                    length -
                                    originalPositionsReference;
                        }
                    }
                }
                return toIndex ? ordinalIndex : slope * (ordinalIndex || 0) +
                    ordinal.offset;
            }
            /* *
             *
             *  Classes
             *
             * */
            /**
             * @private
             */
            class Additions {
                /* *
                 *
                 *  Constructors
                 *
                 * */
                /**
                 * @private
                 */
                constructor(axis) {
                    this.index = {};
                    this.axis = axis;
                }
                /* *
                *
                *  Functions
                *
                * */
                /**
                 * Calculate the ordinal positions before tick positions are calculated.
                 * @private
                 */
                beforeSetTickPositions() {
                    const axis = this.axis, ordinal = axis.ordinal, extremes = axis.getExtremes(), min = extremes.min, max = extremes.max, hasBreaks = axis.brokenAxis?.hasBreaks, isOrdinal = axis.options.ordinal;
                    let len, uniqueOrdinalPositions, dist, minIndex, maxIndex, slope, i, ordinalPositions = [], overscrollPointsRange = Number.MAX_VALUE, useOrdinal = false, adjustOrdinalExtremesPoints = false, isBoosted = false;
                    // Apply the ordinal logic
                    if (isOrdinal || hasBreaks) { // #4167 YAxis is never ordinal ?
                        let distanceBetweenPoint = 0;
                        axis.series.forEach(function (series, i) {
                            uniqueOrdinalPositions = [];
                            // For an axis with multiple series, check if the distance
                            // between points is identical throughout all series.
                            if (i > 0 &&
                                series.options.id !== 'highcharts-navigator-series' &&
                                series.processedXData.length > 1) {
                                adjustOrdinalExtremesPoints =
                                    distanceBetweenPoint !== series.processedXData[1] -
                                        series.processedXData[0];
                            }
                            distanceBetweenPoint =
                                series.processedXData[1] - series.processedXData[0];
                            if (series.boosted) {
                                isBoosted = series.boosted;
                            }
                            if (series.reserveSpace() &&
                                (series
                                    .takeOrdinalPosition !== false || hasBreaks)) {
                                // Concatenate the processed X data into the existing
                                // positions, or the empty array
                                ordinalPositions = ordinalPositions.concat(series.processedXData);
                                len = ordinalPositions.length;
                                // Remove duplicates (#1588)
                                ordinalPositions.sort(function (a, b) {
                                    // Without a custom function it is sorted as strings
                                    return a - b;
                                });
                                overscrollPointsRange = Math.min(overscrollPointsRange, pick(
                                // Check for a single-point series:
                                series.closestPointRange, overscrollPointsRange));
                                if (len) {
                                    i = 0;
                                    while (i < len - 1) {
                                        if (ordinalPositions[i] !==
                                            ordinalPositions[i + 1]) {
                                            uniqueOrdinalPositions.push(ordinalPositions[i + 1]);
                                        }
                                        i++;
                                    }
                                    // Check first item:
                                    if (uniqueOrdinalPositions[0] !==
                                        ordinalPositions[0]) {
                                        uniqueOrdinalPositions.unshift(ordinalPositions[0]);
                                    }
                                    ordinalPositions = uniqueOrdinalPositions;
                                }
                            }
                        });
                        if (!axis.ordinal.originalOrdinalRange) {
                            // Calculate current originalOrdinalRange
                            axis.ordinal.originalOrdinalRange =
                                (ordinalPositions.length - 1) * overscrollPointsRange;
                        }
                        // If the distance between points is not identical throughout
                        // all series, remove the first and last ordinal position to
                        // avoid enabling ordinal logic when it is not needed, #17405.
                        // Only for boosted series because changes are negligible.
                        if (adjustOrdinalExtremesPoints && isBoosted) {
                            ordinalPositions.pop();
                            ordinalPositions.shift();
                        }
                        // Cache the length
                        len = ordinalPositions.length;
                        // Check if we really need the overhead of mapping axis data
                        // against the ordinal positions. If the series consist of
                        // evenly spaced data any way, we don't need any ordinal logic.
                        if (len > 2) { // Two points have equal distance by default
                            dist = ordinalPositions[1] - ordinalPositions[0];
                            i = len - 1;
                            while (i-- && !useOrdinal) {
                                if (ordinalPositions[i + 1] - ordinalPositions[i] !==
                                    dist) {
                                    useOrdinal = true;
                                }
                            }
                            // When zooming in on a week, prevent axis padding for
                            // weekends even though the data within the week is evenly
                            // spaced.
                            if (!axis.options.keepOrdinalPadding &&
                                (ordinalPositions[0] - min > dist ||
                                    (max -
                                        ordinalPositions[ordinalPositions.length - 1]) > dist)) {
                                useOrdinal = true;
                            }
                        }
                        else if (axis.options.overscroll) {
                            if (len === 2) {
                                // Exactly two points, distance for overscroll is fixed:
                                overscrollPointsRange =
                                    ordinalPositions[1] - ordinalPositions[0];
                            }
                            else if (len === 1) {
                                // We have just one point, closest distance is unknown.
                                // Assume then it is last point and overscrolled range:
                                overscrollPointsRange = axis.ordinal.convertOverscroll(axis.options.overscroll);
                                ordinalPositions = [
                                    ordinalPositions[0],
                                    ordinalPositions[0] + overscrollPointsRange
                                ];
                            }
                            else {
                                // In case of zooming in on overscrolled range, stick to
                                // the old range:
                                overscrollPointsRange = ordinal.overscrollPointsRange;
                            }
                        }
                        // Record the slope and offset to compute the linear values from
                        // the array index. Since the ordinal positions may exceed the
                        // current range, get the start and end positions within it
                        // (#719, #665b)
                        if (useOrdinal || axis.forceOrdinal) {
                            if (axis.options.overscroll) {
                                ordinal.overscrollPointsRange = overscrollPointsRange;
                                ordinalPositions = ordinalPositions.concat(ordinal.getOverscrollPositions());
                            }
                            // Register
                            ordinal.positions = ordinalPositions;
                            // This relies on the ordinalPositions being set. Use
                            // Math.max and Math.min to prevent padding on either sides
                            // of the data.
                            minIndex = axis.ordinal2lin(// #5979
                            Math.max(min, ordinalPositions[0]), true);
                            maxIndex = Math.max(axis.ordinal2lin(Math.min(max, ordinalPositions[ordinalPositions.length - 1]), true), 1); // #3339
                            // Set the slope and offset of the values compared to the
                            // indices in the ordinal positions.
                            ordinal.slope = slope =
                                (max - min) / (maxIndex - minIndex);
                            ordinal.offset = min - (minIndex * slope);
                        }
                        else {
                            ordinal.overscrollPointsRange = pick(axis.closestPointRange, ordinal.overscrollPointsRange);
                            ordinal.positions = axis.ordinal.slope = ordinal.offset =
                                void 0;
                        }
                    }
                    axis.isOrdinal = isOrdinal && useOrdinal; // #3818, #4196, #4926
                    ordinal.groupIntervalFactor = null; // Reset for next run
                }
                /**
                 * Faster way of using the Array.indexOf method.
                 * Works for sorted arrays only with unique values.
                 *
                 * @param {Array} sortedArray
                 *        The sorted array inside which we are looking for.
                 * @param {number} key
                 *        The key to being found.
                 * @param {boolean} indirectSearch
                 *        In case of lack of the point in the array, should return
                 *        value be equal to -1 or the closest smaller index.
                 *  @private
                 */
                static findIndexOf(sortedArray, key, indirectSearch) {
                    let start = 0, end = sortedArray.length - 1, middle;
                    while (start < end) {
                        middle = Math.ceil((start + end) / 2);
                        // Key found as the middle element.
                        if (sortedArray[middle] <= key) {
                            // Continue searching to the right.
                            start = middle;
                        }
                        else {
                            // Continue searching to the left.
                            end = middle - 1;
                        }
                    }
                    if (sortedArray[start] === key) {
                        return start;
                    }
                    // Key could not be found.
                    return !indirectSearch ? -1 : start;
                }
                /**
                 * Get the ordinal positions for the entire data set. This is necessary
                 * in chart panning because we need to find out what points or data
                 * groups are available outside the visible range. When a panning
                 * operation starts, if an index for the given grouping does not exists,
                 * it is created and cached. This index is deleted on updated data, so
                 * it will be regenerated the next time a panning operation starts.
                 * @private
                 */
                getExtendedPositions(withOverscroll = true) {
                    const ordinal = this, axis = ordinal.axis, axisProto = axis.constructor.prototype, chart = axis.chart, grouping = axis.series[0]?.currentDataGrouping, key = grouping ?
                        grouping.count + grouping.unitName :
                        'raw', overscroll = withOverscroll ?
                        axis.ordinal.convertOverscroll(axis.options.overscroll) : 0, extremes = axis.getExtremes();
                    let fakeAxis, fakeSeries = void 0, ordinalIndex = ordinal.index;
                    // If this is the first time, or the ordinal index is deleted by
                    // updatedData,
                    // create it.
                    if (!ordinalIndex) {
                        ordinalIndex = ordinal.index = {};
                    }
                    if (!ordinalIndex[key]) {
                        // Create a fake axis object where the extended ordinal
                        // positions are emulated
                        fakeAxis = {
                            series: [],
                            chart: chart,
                            forceOrdinal: false,
                            getExtremes: function () {
                                return {
                                    min: extremes.dataMin,
                                    max: extremes.dataMax + overscroll
                                };
                            },
                            applyGrouping: axisProto.applyGrouping,
                            getGroupPixelWidth: axisProto.getGroupPixelWidth,
                            getTimeTicks: axisProto.getTimeTicks,
                            options: {
                                ordinal: true
                            },
                            ordinal: {
                                getGroupIntervalFactor: this.getGroupIntervalFactor
                            },
                            ordinal2lin: axisProto.ordinal2lin,
                            getIndexOfPoint: axisProto.getIndexOfPoint,
                            val2lin: axisProto.val2lin // #2590
                        };
                        fakeAxis.ordinal.axis = fakeAxis;
                        // Add the fake series to hold the full data, then apply
                        // processData to it
                        axis.series.forEach(function (series) {
                            fakeSeries = {
                                xAxis: fakeAxis,
                                xData: series.xData.slice(),
                                chart: chart,
                                groupPixelWidth: series.groupPixelWidth,
                                destroyGroupedData: H.noop,
                                getProcessedData: Series.prototype.getProcessedData,
                                applyGrouping: Series.prototype.applyGrouping,
                                reserveSpace: Series.prototype.reserveSpace,
                                visible: series.visible
                            };
                            if (withOverscroll) {
                                fakeSeries.xData = fakeSeries.xData.concat(ordinal.getOverscrollPositions());
                            }
                            fakeSeries.options = {
                                dataGrouping: grouping ? {
                                    firstAnchor: series.options.dataGrouping?.firstAnchor,
                                    anchor: series.options.dataGrouping?.anchor,
                                    lastAnchor: series.options.dataGrouping?.firstAnchor,
                                    enabled: true,
                                    forced: true,
                                    // Doesn't matter which, use the fastest
                                    approximation: 'open',
                                    units: [[
                                            grouping.unitName,
                                            [grouping.count]
                                        ]]
                                } : {
                                    enabled: false
                                }
                            };
                            fakeAxis.series.push(fakeSeries);
                            series.processData.apply(fakeSeries);
                        });
                        fakeAxis.applyGrouping({ hasExtremesChanged: true });
                        // Force to use the ordinal when points are evenly spaced (e.g.
                        // weeks), #3825.
                        if ((fakeSeries?.closestPointRange !==
                            fakeSeries?.basePointRange) &&
                            fakeSeries.currentDataGrouping) {
                            fakeAxis.forceOrdinal = true;
                        }
                        // Run beforeSetTickPositions to compute the ordinalPositions
                        axis.ordinal.beforeSetTickPositions.apply({ axis: fakeAxis });
                        if (!axis.ordinal.originalOrdinalRange &&
                            fakeAxis.ordinal.originalOrdinalRange) {
                            axis.ordinal.originalOrdinalRange =
                                fakeAxis.ordinal.originalOrdinalRange;
                        }
                        // Cache it
                        ordinalIndex[key] = fakeAxis.ordinal.positions;
                    }
                    return ordinalIndex[key];
                }
                /**
                 * Find the factor to estimate how wide the plot area would have been if
                 * ordinal gaps were included. This value is used to compute an imagined
                 * plot width in order to establish the data grouping interval.
                 *
                 * A real world case is the intraday-candlestick example. Without this
                 * logic, it would show the correct data grouping when viewing a range
                 * within each day, but once moving the range to include the gap between
                 * two days, the interval would include the cut-away night hours and the
                 * data grouping would be wrong. So the below method tries to compensate
                 * by identifying the most common point interval, in this case days.
                 *
                 * An opposite case is presented in issue #718. We have a long array of
                 * daily data, then one point is appended one hour after the last point.
                 * We expect the data grouping not to change.
                 *
                 * In the future, if we find cases where this estimation doesn't work
                 * optimally, we might need to add a second pass to the data grouping
                 * logic, where we do another run with a greater interval if the number
                 * of data groups is more than a certain fraction of the desired group
                 * count.
                 * @private
                 */
                getGroupIntervalFactor(xMin, xMax, series) {
                    const ordinal = this, processedXData = series.processedXData, len = processedXData.length, distances = [];
                    let median, i, groupIntervalFactor = ordinal.groupIntervalFactor;
                    // Only do this computation for the first series, let the other
                    // inherit it (#2416)
                    if (!groupIntervalFactor) {
                        // Register all the distances in an array
                        for (i = 0; i < len - 1; i++) {
                            distances[i] = (processedXData[i + 1] -
                                processedXData[i]);
                        }
                        // Sort them and find the median
                        distances.sort(function (a, b) {
                            return a - b;
                        });
                        median = distances[Math.floor(len / 2)];
                        // Compensate for series that don't extend through the entire
                        // axis extent. #1675.
                        xMin = Math.max(xMin, processedXData[0]);
                        xMax = Math.min(xMax, processedXData[len - 1]);
                        ordinal.groupIntervalFactor = groupIntervalFactor =
                            (len * median) / (xMax - xMin);
                    }
                    // Return the factor needed for data grouping
                    return groupIntervalFactor;
                }
                /**
                 * Get index of point inside the ordinal positions array.
                 *
                 * @private
                 * @param {number} val
                 * The pixel value of a point.
                 *
                 * @param {Array<number>} [ordinalArray]
                 * An array of all points available on the axis for the given data set.
                 * Either ordinalPositions if the value is inside the plotArea or
                 * extendedOrdinalPositions if not.
                 */
                getIndexOfPoint(val, ordinalArray) {
                    const ordinal = this, axis = ordinal.axis;
                    let firstPointVal = 0;
                    // Check whether the series has at least one point inside the chart
                    const hasPointsInside = function (series) {
                        const { min, max } = axis;
                        if (defined(min) && defined(max)) {
                            return series.points.some((point) => point.x >= min && point.x <= max);
                        }
                        return false;
                    };
                    let firstPointX;
                    // When more series assign to axis, find the smallest one, #15987.
                    axis.series.forEach((series) => {
                        const firstPoint = series.points?.[0];
                        if (defined(firstPoint?.plotX) &&
                            (firstPoint.plotX < firstPointX ||
                                !defined(firstPointX)) &&
                            hasPointsInside(series)) {
                            firstPointX = firstPoint.plotX;
                            firstPointVal = firstPoint.x;
                        }
                    });
                    // If undefined, give a default value
                    firstPointX ?? (firstPointX = axis.minPixelPadding);
                    // Distance in pixels between two points on the ordinal axis in the
                    // current zoom.
                    const ordinalPointPixelInterval = axis.translationSlope * (ordinal.slope ||
                        axis.closestPointRange ||
                        ordinal.overscrollPointsRange), 
                    // `toValue` for the first point.
                    shiftIndex = correctFloat((val - firstPointX) / ordinalPointPixelInterval);
                    return Additions.findIndexOf(ordinalArray, firstPointVal, true) + shiftIndex;
                }
                /**
                 * Get ticks for an ordinal axis within a range where points don't
                 * exist. It is required when overscroll is enabled. We can't base on
                 * points, because we may not have any, so we use approximated
                 * pointRange and generate these ticks between Axis.dataMax,
                 * Axis.dataMax + Axis.overscroll evenly spaced. Used in panning and
                 * navigator scrolling.
                 * @private
                 */
                getOverscrollPositions() {
                    const ordinal = this, axis = ordinal.axis, extraRange = ordinal.convertOverscroll(axis.options.overscroll), distance = ordinal.overscrollPointsRange, positions = [];
                    let max = axis.dataMax;
                    if (defined(distance)) {
                        // Max + pointRange because we need to scroll to the last
                        while (max <= axis.dataMax + extraRange) {
                            max += distance;
                            positions.push(max);
                        }
                    }
                    return positions;
                }
                /**
                 * Make the tick intervals closer because the ordinal gaps make the
                 * ticks spread out or cluster.
                 * @private
                 */
                postProcessTickInterval(tickInterval) {
                    // Problem: https://jsfiddle.net/highcharts/FQm4E/1/. This is a case
                    // where this algorithm doesn't work optimally. In this case, the
                    // tick labels are spread out per week, but all the gaps reside
                    // within weeks. So we have a situation where the labels are courser
                    // than the ordinal gaps, and thus the tick interval should not be
                    // altered.
                    const ordinal = this, axis = ordinal.axis, ordinalSlope = ordinal.slope;
                    let ret;
                    if (ordinalSlope) {
                        if (!axis.options.breaks) {
                            ret = (tickInterval /
                                (ordinalSlope / axis.closestPointRange));
                        }
                        else {
                            ret = axis.closestPointRange || tickInterval; // #7275
                        }
                    }
                    else {
                        ret = tickInterval;
                    }
                    return ret;
                }
                /**
                 * If overscroll is pixel or pecentage value, convert it to axis range.
                 *
                 * @private
                 * @param {number | string} overscroll
                 * Overscroll value in axis range, pixels or percentage value.
                 * @return {number}
                 * Overscroll value in axis range.
                 */
                convertOverscroll(overscroll = 0) {
                    const ordinal = this, axis = ordinal.axis, calculateOverscroll = function (overscrollPercentage) {
                        return pick(ordinal.originalOrdinalRange, defined(axis.dataMax) && defined(axis.dataMin) ?
                            axis.dataMax - axis.dataMin : 0) * overscrollPercentage;
                    };
                    if (isString(overscroll)) {
                        const overscrollValue = parseInt(overscroll, 10);
                        if (/%$/.test(overscroll)) {
                            // If overscroll is percentage
                            return calculateOverscroll(overscrollValue / 100);
                        }
                        if (/px/.test(overscroll)) {
                            // If overscroll is pixels, it is limited to 90% of the axis
                            // length to prevent division by zero
                            const limitedOverscrollValue = Math.min(overscrollValue, axis.len * 0.9), pixelToPercent = limitedOverscrollValue / axis.len;
                            return calculateOverscroll(pixelToPercent / (1 - pixelToPercent));
                        }
                        // If overscroll is a string but not pixels or percentage,
                        // return 0 as no overscroll
                        return 0;
                    }
                    return overscroll;
                }
            }
            OrdinalAxis.Additions = Additions;
        })(OrdinalAxis || (OrdinalAxis = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return OrdinalAxis;
    });
    _registerModule(_modules, 'Stock/RangeSelector/RangeSelectorDefaults.js', [], function () {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Declarations
         *
         * */
        /**
         * Language object. The language object is global and it can't be set
         * on each chart initialization. Instead, use `Highcharts.setOptions` to
         * set it before any chart is initialized.
         *
         * ```js
         * Highcharts.setOptions({
         *     lang: {
         *         months: [
         *             'Janvier', 'Février', 'Mars', 'Avril',
         *             'Mai', 'Juin', 'Juillet', 'Août',
         *             'Septembre', 'Octobre', 'Novembre', 'Décembre'
         *         ],
         *         weekdays: [
         *             'Dimanche', 'Lundi', 'Mardi', 'Mercredi',
         *             'Jeudi', 'Vendredi', 'Samedi'
         *         ]
         *     }
         * });
         * ```
         *
         * @optionparent lang
         */
        const lang = {
            /**
             * The text for the label for the range selector buttons.
             *
             * @product highstock gantt
             */
            rangeSelectorZoom: 'Zoom',
            /**
             * The text for the label for the "from" input box in the range
             * selector. Since v9.0, this string is empty as the label is not
             * rendered by default.
             *
             * @product highstock gantt
             */
            rangeSelectorFrom: '',
            /**
             * The text for the label for the "to" input box in the range selector.
             *
             * @product highstock gantt
             */
            rangeSelectorTo: '→'
        };
        /**
         * The range selector is a tool for selecting ranges to display within
         * the chart. It provides buttons to select preconfigured ranges in
         * the chart, like 1 day, 1 week, 1 month etc. It also provides input
         * boxes where min and max dates can be manually input.
         *
         * @product      highstock gantt
         * @optionparent rangeSelector
         */
        const rangeSelector = {
            /**
             * Whether to enable all buttons from the start. By default buttons are
             * only enabled if the corresponding time range exists on the X axis,
             * but enabling all buttons allows for dynamically loading different
             * time ranges.
             *
             * @sample {highstock} stock/rangeselector/allbuttonsenabled-true/
             *         All buttons enabled
             *
             * @since     2.0.3
             */
            allButtonsEnabled: false,
            /**
             * An array of configuration objects for the buttons.
             *
             * Defaults to:
             * ```js
             * buttons: [{
             *     type: 'month',
             *     count: 1,
             *     text: '1m',
             *     title: 'View 1 month'
             * }, {
             *     type: 'month',
             *     count: 3,
             *     text: '3m',
             *     title: 'View 3 months'
             * }, {
             *     type: 'month',
             *     count: 6,
             *     text: '6m',
             *     title: 'View 6 months'
             * }, {
             *     type: 'ytd',
             *     text: 'YTD',
             *     title: 'View year to date'
             * }, {
             *     type: 'year',
             *     count: 1,
             *     text: '1y',
             *     title: 'View 1 year'
             * }, {
             *     type: 'all',
             *     text: 'All',
             *     title: 'View all'
             * }]
             * ```
             *
             * @sample {highstock} stock/demo/rangeselector-datagrouping/
             *         Data grouping by buttons
             *
             * @type      {Array<*>}
             */
            buttons: void 0,
            /**
             * How many units of the defined type the button should span. If `type`
             * is "month" and `count` is 3, the button spans three months.
             *
             * @type      {number}
             * @default   1
             * @apioption rangeSelector.buttons.count
             */
            /**
             * Fires when clicking on the rangeSelector button. One parameter,
             * event, is passed to the function, containing common event
             * information.
             *
             * ```js
             * click: function(e) {
             *   console.log(this);
             * }
             * ```
             *
             * Return false to stop default button's click action.
             *
             * @sample {highstock} stock/rangeselector/button-click/
             *         Click event on the button
             *
             * @type      {Highcharts.RangeSelectorClickCallbackFunction}
             * @apioption rangeSelector.buttons.events.click
             */
            /**
             * Additional range (in milliseconds) added to the end of the calculated
             * time span.
             *
             * @sample {highstock} stock/rangeselector/min-max-offsets/
             *         Button offsets
             *
             * @type      {number}
             * @default   0
             * @since     6.0.0
             * @apioption rangeSelector.buttons.offsetMax
             */
            /**
             * Additional range (in milliseconds) added to the start of the
             * calculated time span.
             *
             * @sample {highstock} stock/rangeselector/min-max-offsets/
             *         Button offsets
             *
             * @type      {number}
             * @default   0
             * @since     6.0.0
             * @apioption rangeSelector.buttons.offsetMin
             */
            /**
             * When buttons apply dataGrouping on a series, by default zooming
             * in/out will deselect buttons and unset dataGrouping. Enable this
             * option to keep buttons selected when extremes change.
             *
             * @sample {highstock} stock/rangeselector/preserve-datagrouping/
             *         Different preserveDataGrouping settings
             *
             * @type      {boolean}
             * @default   false
             * @since     6.1.2
             * @apioption rangeSelector.buttons.preserveDataGrouping
             */
            /**
             * A custom data grouping object for each button.
             *
             * @see [series.dataGrouping](#plotOptions.series.dataGrouping)
             *
             * @sample {highstock} stock/demo/rangeselector-datagrouping/
             *         Data grouping by range selector buttons
             *
             * @type      {*}
             * @extends   plotOptions.series.dataGrouping
             * @apioption rangeSelector.buttons.dataGrouping
             */
            /**
             * The text for the button itself.
             *
             * @type      {string}
             * @apioption rangeSelector.buttons.text
             */
            /**
             * Explanation for the button, shown as a tooltip on hover, and used by
             * assistive technology.
             *
             * @type      {string}
             * @apioption rangeSelector.buttons.title
             */
            /**
             * Defined the time span for the button. Can be one of `millisecond`,
             * `second`, `minute`, `hour`, `day`, `week`, `month`, `year`, `ytd`,
             * and `all`.
             *
             * @type       {Highcharts.RangeSelectorButtonTypeValue}
             * @apioption  rangeSelector.buttons.type
             */
            /**
             * The space in pixels between the buttons in the range selector.
             */
            buttonSpacing: 5,
            /**
             * Whether to collapse the range selector buttons into a dropdown when
             * there is not enough room to show everything in a single row, instead
             * of dividing the range selector into multiple rows.
             * Can be one of the following:
             *  - `always`: Always collapse
             *  - `responsive`: Only collapse when there is not enough room
             *  - `never`: Never collapse
             *
             * @sample {highstock} stock/rangeselector/dropdown/
             *         Dropdown option
             *
             * @validvalue ["always", "responsive", "never"]
             * @since 9.0.0
             */
            dropdown: 'responsive',
            /**
             * Enable or disable the range selector. Default to `true` for stock
             * charts, using the `stockChart` factory.
             *
             * @sample {highstock} stock/rangeselector/enabled/
             *         Disable the range selector
             *
             * @type {boolean|undefined}
             * @default {highstock} true
             */
            enabled: void 0,
            /**
             * The vertical alignment of the rangeselector box. Allowed properties
             * are `top`, `middle`, `bottom`.
             *
             * @sample {highstock} stock/rangeselector/vertical-align-middle/
             *         Middle
             * @sample {highstock} stock/rangeselector/vertical-align-bottom/
             *         Bottom
             *
             * @type  {Highcharts.VerticalAlignValue}
             * @since 6.0.0
             */
            verticalAlign: 'top',
            /**
             * A collection of attributes for the buttons. The object takes SVG
             * attributes like `fill`, `stroke`, `stroke-width`, as well as `style`,
             * a collection of CSS properties for the text.
             *
             * The object can also be extended with states, so you can set
             * presentational options for `hover`, `select` or `disabled` button
             * states.
             *
             * CSS styles for the text label.
             *
             * In styled mode, the buttons are styled by the
             * `.highcharts-range-selector-buttons .highcharts-button` rule with its
             * different states.
             *
             * @sample {highstock} stock/rangeselector/styling/
             *         Styling the buttons and inputs
             *
             * @type {Highcharts.SVGAttributes}
             */
            buttonTheme: {
                /** @ignore */
                width: 28,
                /** @ignore */
                height: 18,
                /** @ignore */
                padding: 2,
                /** @ignore */
                zIndex: 7 // #484, #852
            },
            /**
             * When the rangeselector is floating, the plot area does not reserve
             * space for it. This opens for positioning anywhere on the chart.
             *
             * @sample {highstock} stock/rangeselector/floating/
             *         Placing the range selector between the plot area and the
             *         navigator
             *
             * @since 6.0.0
             */
            floating: false,
            /**
             * The x offset of the range selector relative to its horizontal
             * alignment within `chart.spacingLeft` and `chart.spacingRight`.
             *
             * @since 6.0.0
             */
            x: 0,
            /**
             * The y offset of the range selector relative to its horizontal
             * alignment within `chart.spacingLeft` and `chart.spacingRight`.
             *
             * @since 6.0.0
             */
            y: 0,
            /**
             * Deprecated. The height of the range selector. Currently it is
             * calculated dynamically.
             *
             * @deprecated
             * @type  {number|undefined}
             * @since 2.1.9
             */
            height: void 0,
            /**
             * The border color of the date input boxes.
             *
             * @sample {highstock} stock/rangeselector/styling/
             *         Styling the buttons and inputs
             *
             * @type      {Highcharts.ColorString}
             * @since     1.3.7
             */
            inputBoxBorderColor: 'none',
            /**
             * The pixel height of the date input boxes.
             *
             * @sample {highstock} stock/rangeselector/styling/
             *         Styling the buttons and inputs
             *
             * @since     1.3.7
             */
            inputBoxHeight: 17,
            /**
             * The pixel width of the date input boxes. When `undefined`, the width
             * is fitted to the rendered content.
             *
             * @sample {highstock} stock/rangeselector/styling/
             *         Styling the buttons and inputs
             *
             * @type   {number|undefined}
             * @since  1.3.7
             */
            inputBoxWidth: void 0,
            /**
             * The date format in the input boxes when not selected for editing.
             * Defaults to `%e %b %Y`.
             *
             * This is used to determine which type of input to show,
             * `datetime-local`, `date` or `time` and falling back to `text` when
             * the browser does not support the input type or the format contains
             * milliseconds.
             *
             * @sample {highstock} stock/rangeselector/input-type/
             *         Input types
             * @sample {highstock} stock/rangeselector/input-format/
             *         Milliseconds in the range selector
             *
             */
            inputDateFormat: '%e %b %Y',
            /**
             * A custom callback function to parse values entered in the input boxes
             * and return a valid JavaScript time as milliseconds since 1970.
             * The first argument passed is a value to parse,
             * second is a boolean indicating use of the UTC time.
             *
             * This will only get called for inputs of type `text`. Since v8.2.3,
             * the input type is dynamically determined based on the granularity
             * of the `inputDateFormat` and the browser support.
             *
             * @sample {highstock} stock/rangeselector/input-format/
             *         Milliseconds in the range selector
             *
             * @type      {Highcharts.RangeSelectorParseCallbackFunction}
             * @since     1.3.3
             */
            inputDateParser: void 0,
            /**
             * The date format in the input boxes when they are selected for
             * editing. This must be a format that is recognized by JavaScript
             * Date.parse.
             *
             * This will only be used for inputs of type `text`. Since v8.2.3,
             * the input type is dynamically determined based on the granularity
             * of the `inputDateFormat` and the browser support.
             *
             * @sample {highstock} stock/rangeselector/input-format/
             *         Milliseconds in the range selector
             *
             */
            inputEditDateFormat: '%Y-%m-%d',
            /**
             * Enable or disable the date input boxes.
             */
            inputEnabled: true,
            /**
             * Positioning for the input boxes. Allowed properties are `align`,
             *  `x` and `y`.
             *
             * @since 1.2.4
             */
            inputPosition: {
                /**
                 * The alignment of the input box. Allowed properties are `left`,
                 * `center`, `right`.
                 *
                 * @sample {highstock} stock/rangeselector/input-button-position/
                 *         Alignment
                 *
                 * @type  {Highcharts.AlignValue}
                 * @since 6.0.0
                 */
                align: 'right',
                /**
                 * X offset of the input row.
                 */
                x: 0,
                /**
                 * Y offset of the input row.
                 */
                y: 0
            },
            /**
             * The space in pixels between the labels and the date input boxes in
             * the range selector.
             *
             * @since 9.0.0
             */
            inputSpacing: 5,
            /**
             * The index of the button to appear pre-selected. If the selected range
             * exceeds the total data range and the 'all' option is available,
             * the 'all' option, showing the full range, is automatically selected.
             *
             * @type      {number}
             */
            selected: void 0,
            /**
             * Positioning for the button row.
             *
             * @since 1.2.4
             */
            buttonPosition: {
                /**
                 * The alignment of the input box. Allowed properties are `left`,
                 * `center`, `right`.
                 *
                 * @sample {highstock} stock/rangeselector/input-button-position/
                 *         Alignment
                 *
                 * @type  {Highcharts.AlignValue}
                 * @since 6.0.0
                 */
                align: 'left',
                /**
                 * X offset of the button row.
                 */
                x: 0,
                /**
                 * Y offset of the button row.
                 */
                y: 0
            },
            /**
             * CSS for the HTML inputs in the range selector.
             *
             * In styled mode, the inputs are styled by the
             * `.highcharts-range-input text` rule in SVG mode, and
             * `input.highcharts-range-selector` when active.
             *
             * @sample {highstock} stock/rangeselector/styling/
             *         Styling the buttons and inputs
             *
             * @type      {Highcharts.CSSObject}
             * @apioption rangeSelector.inputStyle
             */
            inputStyle: {
                /** @ignore */
                color: "#334eff" /* Palette.highlightColor80 */,
                /** @ignore */
                cursor: 'pointer',
                /** @ignore */
                fontSize: '0.8em'
            },
            /**
             * CSS styles for the labels - the Zoom, From and To texts.
             *
             * In styled mode, the labels are styled by the
             * `.highcharts-range-label` class.
             *
             * @sample {highstock} stock/rangeselector/styling/
             *         Styling the buttons and inputs
             *
             * @type {Highcharts.CSSObject}
             */
            labelStyle: {
                /** @ignore */
                color: "#666666" /* Palette.neutralColor60 */,
                /** @ignore */
                fontSize: '0.8em'
            }
        };
        /* *
         *
         *  Default Export
         *
         * */
        const RangeSelectorDefaults = {
            lang,
            rangeSelector
        };

        return RangeSelectorDefaults;
    });
    _registerModule(_modules, 'Stock/RangeSelector/RangeSelectorComposition.js', [_modules['Core/Defaults.js'], _modules['Core/Globals.js'], _modules['Stock/RangeSelector/RangeSelectorDefaults.js'], _modules['Core/Utilities.js']], function (D, H, RangeSelectorDefaults, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { defaultOptions } = D;
        const { composed } = H;
        const { addEvent, defined, extend, find, isNumber, merge, pick, pushUnique } = U;
        /* *
         *
         *  Constants
         *
         * */
        const chartDestroyEvents = [];
        /* *
         *
         *  Variables
         *
         * */
        let RangeSelectorConstructor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Get the axis min value based on the range option and the current max. For
         * stock charts this is extended via the {@link RangeSelector} so that if the
         * selected range is a multiple of months or years, it is compensated for
         * various month lengths.
         *
         * @private
         * @function Highcharts.Axis#minFromRange
         * @return {number|undefined}
         *         The new minimum value.
         */
        function axisMinFromRange() {
            const rangeOptions = this.range, type = rangeOptions.type, max = this.max, time = this.chart.time, 
            // Get the true range from a start date
            getTrueRange = function (base, count) {
                const timeName = type === 'year' ?
                    'FullYear' : 'Month';
                const date = new time.Date(base);
                const basePeriod = time.get(timeName, date);
                time.set(timeName, date, basePeriod + count);
                if (basePeriod === time.get(timeName, date)) {
                    time.set('Date', date, 0); // #6537
                }
                return date.getTime() - base;
            };
            let min, range;
            if (isNumber(rangeOptions)) {
                min = max - rangeOptions;
                range = rangeOptions;
            }
            else if (rangeOptions) {
                min = max + getTrueRange(max, -(rangeOptions.count || 1));
                // Let the fixedRange reflect initial settings (#5930)
                if (this.chart) {
                    this.chart.setFixedRange(max - min);
                }
            }
            const dataMin = pick(this.dataMin, Number.MIN_VALUE);
            if (!isNumber(min)) {
                min = dataMin;
            }
            if (min <= dataMin) {
                min = dataMin;
                if (typeof range === 'undefined') { // #4501
                    range = getTrueRange(min, rangeOptions.count);
                }
                this.newMax = Math.min(min + range, pick(this.dataMax, Number.MAX_VALUE));
            }
            if (!isNumber(max)) {
                min = void 0;
            }
            else if (!isNumber(rangeOptions) &&
                rangeOptions &&
                rangeOptions._offsetMin) {
                min += rangeOptions._offsetMin;
            }
            return min;
        }
        /**
         * @private
         */
        function compose(AxisClass, ChartClass, RangeSelectorClass) {
            RangeSelectorConstructor = RangeSelectorClass;
            if (pushUnique(composed, 'RangeSelector')) {
                const chartProto = ChartClass.prototype;
                AxisClass.prototype.minFromRange = axisMinFromRange;
                addEvent(ChartClass, 'afterGetContainer', onChartAfterGetContainer);
                addEvent(ChartClass, 'beforeRender', onChartBeforeRender);
                addEvent(ChartClass, 'destroy', onChartDestroy);
                addEvent(ChartClass, 'getMargins', onChartGetMargins);
                addEvent(ChartClass, 'render', onChartRender);
                addEvent(ChartClass, 'update', onChartUpdate);
                chartProto.callbacks.push(onChartCallback);
                extend(defaultOptions, { rangeSelector: RangeSelectorDefaults.rangeSelector });
                extend(defaultOptions.lang, RangeSelectorDefaults.lang);
            }
        }
        /**
         * Initialize rangeselector for stock charts
         * @private
         */
        function onChartAfterGetContainer() {
            if (this.options.rangeSelector &&
                this.options.rangeSelector.enabled) {
                this.rangeSelector = new RangeSelectorConstructor(this);
            }
        }
        /**
         * @private
         */
        function onChartBeforeRender() {
            const chart = this, axes = chart.axes, rangeSelector = chart.rangeSelector;
            if (rangeSelector) {
                if (isNumber(rangeSelector.deferredYTDClick)) {
                    rangeSelector.clickButton(rangeSelector.deferredYTDClick);
                    delete rangeSelector.deferredYTDClick;
                }
                axes.forEach((axis) => {
                    axis.updateNames();
                    axis.setScale();
                });
                chart.getAxisMargins();
                rangeSelector.render();
                const verticalAlign = rangeSelector.options.verticalAlign;
                if (!rangeSelector.options.floating) {
                    if (verticalAlign === 'bottom') {
                        this.extraBottomMargin = true;
                    }
                    else if (verticalAlign !== 'middle') {
                        this.extraTopMargin = true;
                    }
                }
            }
        }
        /**
         * @private
         */
        function onChartCallback(chart) {
            let extremes, legend, alignTo, verticalAlign;
            const rangeSelector = chart.rangeSelector, redraw = () => {
                if (rangeSelector) {
                    extremes = chart.xAxis[0].getExtremes();
                    legend = chart.legend;
                    verticalAlign = (rangeSelector &&
                        rangeSelector.options.verticalAlign);
                    if (isNumber(extremes.min)) {
                        rangeSelector.render(extremes.min, extremes.max);
                    }
                    // Re-align the legend so that it's below the rangeselector
                    if (legend.display &&
                        verticalAlign === 'top' &&
                        verticalAlign === legend.options.verticalAlign) {
                        // Create a new alignment box for the legend.
                        alignTo = merge(chart.spacingBox);
                        if (legend.options.layout === 'vertical') {
                            alignTo.y = chart.plotTop;
                        }
                        else {
                            alignTo.y += rangeSelector.getHeight();
                        }
                        legend.group.placed = false; // Don't animate the alignment.
                        legend.align(alignTo);
                    }
                }
            };
            if (rangeSelector) {
                const events = find(chartDestroyEvents, (e) => e[0] === chart);
                if (!events) {
                    chartDestroyEvents.push([chart, [
                            // Redraw the scroller on setExtremes
                            addEvent(chart.xAxis[0], 'afterSetExtremes', function (e) {
                                if (rangeSelector) {
                                    rangeSelector.render(e.min, e.max);
                                }
                            }),
                            // Redraw the scroller chart resize
                            addEvent(chart, 'redraw', redraw)
                        ]]);
                }
                // Do it now
                redraw();
            }
        }
        /**
         * Remove resize/afterSetExtremes at chart destroy.
         * @private
         */
        function onChartDestroy() {
            for (let i = 0, iEnd = chartDestroyEvents.length; i < iEnd; ++i) {
                const events = chartDestroyEvents[i];
                if (events[0] === this) {
                    events[1].forEach((unbind) => unbind());
                    chartDestroyEvents.splice(i, 1);
                    return;
                }
            }
        }
        /**
         *
         */
        function onChartGetMargins() {
            const rangeSelector = this.rangeSelector;
            if (rangeSelector) {
                const rangeSelectorHeight = rangeSelector.getHeight();
                if (this.extraTopMargin) {
                    this.plotTop += rangeSelectorHeight;
                }
                if (this.extraBottomMargin) {
                    this.marginBottom += rangeSelectorHeight;
                }
            }
        }
        /**
         * @private
         */
        function onChartRender() {
            const chart = this, rangeSelector = chart.rangeSelector;
            if (rangeSelector && !rangeSelector.options.floating) {
                rangeSelector.render();
                const verticalAlign = rangeSelector.options.verticalAlign;
                if (verticalAlign === 'bottom') {
                    this.extraBottomMargin = true;
                }
                else if (verticalAlign !== 'middle') {
                    this.extraTopMargin = true;
                }
            }
        }
        /**
         * @private
         */
        function onChartUpdate(e) {
            const chart = this, options = e.options, optionsRangeSelector = options.rangeSelector, extraBottomMarginWas = this.extraBottomMargin, extraTopMarginWas = this.extraTopMargin;
            let rangeSelector = chart.rangeSelector;
            if (optionsRangeSelector &&
                optionsRangeSelector.enabled &&
                !defined(rangeSelector) &&
                this.options.rangeSelector) {
                this.options.rangeSelector.enabled = true;
                this.rangeSelector = rangeSelector = new RangeSelectorConstructor(this);
            }
            this.extraBottomMargin = false;
            this.extraTopMargin = false;
            if (rangeSelector) {
                onChartCallback(this);
                const verticalAlign = (optionsRangeSelector &&
                    optionsRangeSelector.verticalAlign) || (rangeSelector.options && rangeSelector.options.verticalAlign);
                if (!rangeSelector.options.floating) {
                    if (verticalAlign === 'bottom') {
                        this.extraBottomMargin = true;
                    }
                    else if (verticalAlign !== 'middle') {
                        this.extraTopMargin = true;
                    }
                }
                if (this.extraBottomMargin !== extraBottomMarginWas ||
                    this.extraTopMargin !== extraTopMarginWas) {
                    this.isDirtyBox = true;
                }
            }
        }
        /* *
         *
         *  Default Export
         *
         * */
        const RangeSelectorComposition = {
            compose
        };

        return RangeSelectorComposition;
    });
    _registerModule(_modules, 'Stock/RangeSelector/RangeSelector.js', [_modules['Core/Axis/Axis.js'], _modules['Core/Defaults.js'], _modules['Core/Globals.js'], _modules['Stock/RangeSelector/RangeSelectorComposition.js'], _modules['Core/Renderer/SVG/SVGElement.js'], _modules['Core/Utilities.js']], function (Axis, D, H, RangeSelectorComposition, SVGElement, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { defaultOptions } = D;
        const { addEvent, createElement, css, defined, destroyObjectProperties, discardElement, extend, fireEvent, isNumber, merge, objectEach, pad, pick, pInt, splat } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Get the preferred input type based on a date format string.
         *
         * @private
         * @function preferredInputType
         */
        function preferredInputType(format) {
            const ms = format.indexOf('%L') !== -1;
            if (ms) {
                return 'text';
            }
            const date = ['a', 'A', 'd', 'e', 'w', 'b', 'B', 'm', 'o', 'y', 'Y']
                .some((char) => format.indexOf('%' + char) !== -1);
            const time = ['H', 'k', 'I', 'l', 'M', 'S']
                .some((char) => format.indexOf('%' + char) !== -1);
            if (date && time) {
                return 'datetime-local';
            }
            if (date) {
                return 'date';
            }
            if (time) {
                return 'time';
            }
            return 'text';
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * The range selector.
         *
         * @private
         * @class
         * @name Highcharts.RangeSelector
         * @param {Highcharts.Chart} chart
         */
        class RangeSelector {
            /* *
             *
             *  Static Functions
             *
             * */
            /**
             * @private
             */
            static compose(AxisClass, ChartClass) {
                RangeSelectorComposition.compose(AxisClass, ChartClass, RangeSelector);
            }
            /* *
             *
             *  Constructor
             *
             * */
            constructor(chart) {
                this.buttonOptions = RangeSelector.prototype.defaultButtons;
                this.initialButtonGroupWidth = 0;
                this.chart = chart;
                this.init(chart);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * The method to run when one of the buttons in the range selectors is
             * clicked
             *
             * @private
             * @function Highcharts.RangeSelector#clickButton
             * @param {number} i
             *        The index of the button
             * @param {boolean} [redraw]
             */
            clickButton(i, redraw) {
                const rangeSelector = this, chart = rangeSelector.chart, rangeOptions = rangeSelector.buttonOptions[i], baseAxis = chart.xAxis[0], unionExtremes = (chart.scroller && chart.scroller.getUnionExtremes()) || baseAxis || {}, type = rangeOptions.type, dataGrouping = rangeOptions.dataGrouping;
                let dataMin = unionExtremes.dataMin, dataMax = unionExtremes.dataMax, newMin, newMax = baseAxis && Math.round(Math.min(baseAxis.max, pick(dataMax, baseAxis.max))), // #1568
                baseXAxisOptions, range = rangeOptions._range, rangeMin, minSetting, rangeSetting, ctx, ytdExtremes, addOffsetMin = true;
                // Chart has no data, base series is removed
                if (dataMin === null || dataMax === null) {
                    return;
                }
                rangeSelector.setSelected(i);
                // Apply dataGrouping associated to button
                if (dataGrouping) {
                    this.forcedDataGrouping = true;
                    Axis.prototype.setDataGrouping.call(baseAxis || { chart: this.chart }, dataGrouping, false);
                    this.frozenStates = rangeOptions.preserveDataGrouping;
                }
                // Apply range
                if (type === 'month' || type === 'year') {
                    if (!baseAxis) {
                        // This is set to the user options and picked up later when the
                        // axis is instantiated so that we know the min and max.
                        range = rangeOptions;
                    }
                    else {
                        ctx = {
                            range: rangeOptions,
                            max: newMax,
                            chart: chart,
                            dataMin: dataMin,
                            dataMax: dataMax
                        };
                        newMin = baseAxis.minFromRange.call(ctx);
                        if (isNumber(ctx.newMax)) {
                            newMax = ctx.newMax;
                        }
                        // #15799: offsetMin is added in minFromRange so that it works
                        // with pre-selected buttons as well
                        addOffsetMin = false;
                    }
                    // Fixed times like minutes, hours, days
                }
                else if (range) {
                    newMin = Math.max(newMax - range, dataMin);
                    newMax = Math.min(newMin + range, dataMax);
                    addOffsetMin = false;
                }
                else if (type === 'ytd') {
                    // On user clicks on the buttons, or a delayed action running from
                    // the beforeRender event (below), the baseAxis is defined.
                    if (baseAxis) {
                        // When "ytd" is the pre-selected button for the initial view,
                        // its calculation is delayed and rerun in the beforeRender
                        // event (below). When the series are initialized, but before
                        // the chart is rendered, we have access to the xData array
                        // (#942).
                        if (typeof dataMax === 'undefined' ||
                            typeof dataMin === 'undefined') {
                            dataMin = Number.MAX_VALUE;
                            dataMax = Number.MIN_VALUE;
                            chart.series.forEach((series) => {
                                // Reassign it to the last item
                                const xData = series.xData;
                                if (xData) {
                                    dataMin = Math.min(xData[0], dataMin);
                                    dataMax = Math.max(xData[xData.length - 1], dataMax);
                                }
                            });
                            redraw = false;
                        }
                        ytdExtremes = rangeSelector.getYTDExtremes(dataMax, dataMin, chart.time.useUTC);
                        newMin = rangeMin = ytdExtremes.min;
                        newMax = ytdExtremes.max;
                        // "ytd" is pre-selected. We don't yet have access to processed
                        // point and extremes data (things like pointStart and pointInterval
                        // are missing), so we delay the process (#942)
                    }
                    else {
                        rangeSelector.deferredYTDClick = i;
                        return;
                    }
                }
                else if (type === 'all' && baseAxis) {
                    // If the navigator exist and the axis range is declared reset that
                    // range and from now on only use the range set by a user, #14742.
                    if (chart.navigator && chart.navigator.baseSeries[0]) {
                        chart.navigator.baseSeries[0].xAxis.options.range = void 0;
                    }
                    newMin = dataMin;
                    newMax = dataMax;
                }
                if (addOffsetMin && rangeOptions._offsetMin && defined(newMin)) {
                    newMin += rangeOptions._offsetMin;
                }
                if (rangeOptions._offsetMax && defined(newMax)) {
                    newMax += rangeOptions._offsetMax;
                }
                if (this.dropdown) {
                    this.dropdown.selectedIndex = i + 1;
                }
                // Update the chart
                if (!baseAxis) {
                    // Axis not yet instantiated. Temporarily set min and range
                    // options and remove them on chart load (#4317).
                    baseXAxisOptions = splat(chart.options.xAxis)[0];
                    rangeSetting = baseXAxisOptions.range;
                    baseXAxisOptions.range = range;
                    minSetting = baseXAxisOptions.min;
                    baseXAxisOptions.min = rangeMin;
                    addEvent(chart, 'load', function resetMinAndRange() {
                        chart.setFixedRange(rangeOptions._range);
                        baseXAxisOptions.range = rangeSetting;
                        baseXAxisOptions.min = minSetting;
                    });
                }
                else {
                    // Existing axis object. Set extremes after render time.
                    baseAxis.setExtremes(newMin, newMax, pick(redraw, true), void 0, // Auto animation
                    {
                        trigger: 'rangeSelectorButton',
                        rangeSelectorButton: rangeOptions
                    });
                    chart.setFixedRange(rangeOptions._range);
                }
                fireEvent(this, 'afterBtnClick');
            }
            /**
             * Set the selected option. This method only sets the internal flag, it
             * doesn't update the buttons or the actual zoomed range.
             *
             * @private
             * @function Highcharts.RangeSelector#setSelected
             * @param {number} [selected]
             */
            setSelected(selected) {
                this.selected = this.options.selected = selected;
            }
            /**
             * Initialize the range selector
             *
             * @private
             * @function Highcharts.RangeSelector#init
             * @param {Highcharts.Chart} chart
             */
            init(chart) {
                const rangeSelector = this, options = chart.options.rangeSelector, buttonOptions = (options.buttons || rangeSelector.defaultButtons.slice()), selectedOption = options.selected, blurInputs = function () {
                    const minInput = rangeSelector.minInput, maxInput = rangeSelector.maxInput;
                    // #3274 in some case blur is not defined
                    if (minInput && !!minInput.blur) {
                        fireEvent(minInput, 'blur');
                    }
                    if (maxInput && !!maxInput.blur) {
                        fireEvent(maxInput, 'blur');
                    }
                };
                rangeSelector.chart = chart;
                rangeSelector.options = options;
                rangeSelector.buttons = [];
                rangeSelector.buttonOptions = buttonOptions;
                this.eventsToUnbind = [];
                this.eventsToUnbind.push(addEvent(chart.container, 'mousedown', blurInputs));
                this.eventsToUnbind.push(addEvent(chart, 'resize', blurInputs));
                // Extend the buttonOptions with actual range
                buttonOptions.forEach(rangeSelector.computeButtonRange);
                // Zoomed range based on a pre-selected button index
                if (typeof selectedOption !== 'undefined' &&
                    buttonOptions[selectedOption]) {
                    this.clickButton(selectedOption, false);
                }
                this.eventsToUnbind.push(addEvent(chart, 'load', function () {
                    // If a data grouping is applied to the current button, release it
                    // when extremes change
                    if (chart.xAxis && chart.xAxis[0]) {
                        addEvent(chart.xAxis[0], 'setExtremes', function (e) {
                            if (isNumber(this.max) &&
                                isNumber(this.min) &&
                                this.max - this.min !== chart.fixedRange &&
                                e.trigger !== 'rangeSelectorButton' &&
                                e.trigger !== 'updatedData' &&
                                rangeSelector.forcedDataGrouping &&
                                !rangeSelector.frozenStates) {
                                this.setDataGrouping(false, false);
                            }
                        });
                    }
                }));
            }
            /**
             * Dynamically update the range selector buttons after a new range has been
             * set
             *
             * @private
             * @function Highcharts.RangeSelector#updateButtonStates
             */
            updateButtonStates() {
                const rangeSelector = this, chart = this.chart, dropdown = this.dropdown, baseAxis = chart.xAxis[0], actualRange = Math.round(baseAxis.max - baseAxis.min), hasNoData = !baseAxis.hasVisibleSeries, day = 24 * 36e5, // A single day in milliseconds
                unionExtremes = (chart.scroller &&
                    chart.scroller.getUnionExtremes()) || baseAxis, dataMin = unionExtremes.dataMin, dataMax = unionExtremes.dataMax, ytdExtremes = rangeSelector.getYTDExtremes(dataMax, dataMin, chart.time.useUTC), ytdMin = ytdExtremes.min, ytdMax = ytdExtremes.max, selected = rangeSelector.selected, allButtonsEnabled = rangeSelector.options.allButtonsEnabled, buttons = rangeSelector.buttons;
                let selectedExists = isNumber(selected), isSelectedTooGreat = false;
                rangeSelector.buttonOptions.forEach((rangeOptions, i) => {
                    const range = rangeOptions._range, type = rangeOptions.type, count = rangeOptions.count || 1, button = buttons[i], offsetRange = rangeOptions._offsetMax -
                        rangeOptions._offsetMin, isSelected = i === selected, 
                    // Disable buttons where the range exceeds what is allowed in
                    // the current view
                    isTooGreatRange = range >
                        dataMax - dataMin, 
                    // Disable buttons where the range is smaller than the minimum
                    // range
                    isTooSmallRange = range < baseAxis.minRange;
                    let state = 0, 
                    // Do not select the YTD button if not explicitly told so
                    isYTDButNotSelected = false, 
                    // Disable the All button if we're already showing all
                    isAllButAlreadyShowingAll = false, isSameRange = range === actualRange;
                    if (isSelected && isTooGreatRange) {
                        isSelectedTooGreat = true;
                    }
                    if (baseAxis.isOrdinal &&
                        baseAxis.ordinal?.positions &&
                        range &&
                        actualRange < range) {
                        // Handle ordinal ranges
                        const positions = baseAxis.ordinal.positions;
                        if (positions[positions.length - 1] - positions[0] > range) {
                            isSameRange = true;
                        }
                    }
                    else if (
                    // Months and years have variable range so we check the extremes
                    (type === 'month' || type === 'year') &&
                        (actualRange + 36e5 >=
                            { month: 28, year: 365 }[type] * day * count - offsetRange) &&
                        (actualRange - 36e5 <=
                            { month: 31, year: 366 }[type] * day * count + offsetRange)) {
                        isSameRange = true;
                    }
                    else if (type === 'ytd') {
                        isSameRange = (ytdMax - ytdMin + offsetRange) === actualRange;
                        isYTDButNotSelected = !isSelected;
                    }
                    else if (type === 'all') {
                        isSameRange = (baseAxis.max - baseAxis.min >=
                            dataMax - dataMin);
                        isAllButAlreadyShowingAll = (!isSelected &&
                            selectedExists &&
                            isSameRange);
                    }
                    // The new zoom area happens to match the range for a button - mark
                    // it selected. This happens when scrolling across an ordinal gap.
                    // It can be seen in the intraday demos when selecting 1h and scroll
                    // across the night gap.
                    const disable = (!allButtonsEnabled &&
                        !(isSelectedTooGreat && type === 'all') &&
                        (isTooGreatRange ||
                            isTooSmallRange ||
                            isAllButAlreadyShowingAll ||
                            hasNoData));
                    const select = ((isSelectedTooGreat && type === 'all') ||
                        (isSelected && isSameRange) ||
                        (isSameRange && !selectedExists && !isYTDButNotSelected) ||
                        (isSelected && rangeSelector.frozenStates));
                    if (disable) {
                        state = 3;
                    }
                    else if (select) {
                        selectedExists = true; // Only one button can be selected
                        state = 2;
                    }
                    // If state has changed, update the button
                    if (button.state !== state) {
                        button.setState(state);
                        if (dropdown) {
                            dropdown.options[i + 1].disabled = disable;
                            if (state === 2) {
                                dropdown.selectedIndex = i + 1;
                            }
                        }
                        // Reset (#9209)
                        if (state === 0 && selected === i) {
                            rangeSelector.setSelected();
                        }
                        else if ((state === 2 && !defined(selected)) ||
                            isSelectedTooGreat) {
                            rangeSelector.setSelected(i);
                        }
                    }
                });
            }
            /**
             * Compute and cache the range for an individual button
             *
             * @private
             * @function Highcharts.RangeSelector#computeButtonRange
             * @param {Highcharts.RangeSelectorButtonsOptions} rangeOptions
             */
            computeButtonRange(rangeOptions) {
                const type = rangeOptions.type, count = rangeOptions.count || 1, 
                // These time intervals have a fixed number of milliseconds, as
                // opposed to month, ytd and year
                fixedTimes = {
                    millisecond: 1,
                    second: 1000,
                    minute: 60 * 1000,
                    hour: 3600 * 1000,
                    day: 24 * 3600 * 1000,
                    week: 7 * 24 * 3600 * 1000
                };
                // Store the range on the button object
                if (fixedTimes[type]) {
                    rangeOptions._range = fixedTimes[type] * count;
                }
                else if (type === 'month' || type === 'year') {
                    rangeOptions._range = {
                        month: 30,
                        year: 365
                    }[type] * 24 * 36e5 * count;
                }
                rangeOptions._offsetMin = pick(rangeOptions.offsetMin, 0);
                rangeOptions._offsetMax = pick(rangeOptions.offsetMax, 0);
                rangeOptions._range +=
                    rangeOptions._offsetMax - rangeOptions._offsetMin;
            }
            /**
             * Get the unix timestamp of a HTML input for the dates
             *
             * @private
             * @function Highcharts.RangeSelector#getInputValue
             */
            getInputValue(name) {
                const input = name === 'min' ? this.minInput : this.maxInput;
                const options = this.chart.options
                    .rangeSelector;
                const time = this.chart.time;
                if (input) {
                    return ((input.type === 'text' && options.inputDateParser) ||
                        this.defaultInputDateParser)(input.value, time.useUTC, time);
                }
                return 0;
            }
            /**
             * Set the internal and displayed value of a HTML input for the dates
             *
             * @private
             * @function Highcharts.RangeSelector#setInputValue
             */
            setInputValue(name, inputTime) {
                const options = this.options, time = this.chart.time, input = name === 'min' ? this.minInput : this.maxInput, dateBox = name === 'min' ? this.minDateBox : this.maxDateBox;
                if (input) {
                    const hcTimeAttr = input.getAttribute('data-hc-time');
                    let updatedTime = defined(hcTimeAttr) ? Number(hcTimeAttr) : void 0;
                    if (defined(inputTime)) {
                        const previousTime = updatedTime;
                        if (defined(previousTime)) {
                            input.setAttribute('data-hc-time-previous', previousTime);
                        }
                        input.setAttribute('data-hc-time', inputTime);
                        updatedTime = inputTime;
                    }
                    input.value = time.dateFormat((this.inputTypeFormats[input.type] ||
                        options.inputEditDateFormat), updatedTime);
                    if (dateBox) {
                        dateBox.attr({
                            text: time.dateFormat(options.inputDateFormat, updatedTime)
                        });
                    }
                }
            }
            /**
             * Set the min and max value of a HTML input for the dates
             *
             * @private
             * @function Highcharts.RangeSelector#setInputExtremes
             */
            setInputExtremes(name, min, max) {
                const input = name === 'min' ? this.minInput : this.maxInput;
                if (input) {
                    const format = this.inputTypeFormats[input.type];
                    const time = this.chart.time;
                    if (format) {
                        const newMin = time.dateFormat(format, min);
                        if (input.min !== newMin) {
                            input.min = newMin;
                        }
                        const newMax = time.dateFormat(format, max);
                        if (input.max !== newMax) {
                            input.max = newMax;
                        }
                    }
                }
            }
            /**
             * @private
             * @function Highcharts.RangeSelector#showInput
             * @param {string} name
             */
            showInput(name) {
                const dateBox = name === 'min' ? this.minDateBox : this.maxDateBox, input = name === 'min' ? this.minInput : this.maxInput;
                if (input && dateBox && this.inputGroup) {
                    const isTextInput = input.type === 'text', { translateX = 0, translateY = 0 } = this.inputGroup, { x = 0, width = 0, height = 0 } = dateBox, { inputBoxWidth } = this.options;
                    css(input, {
                        width: isTextInput ?
                            ((width + (inputBoxWidth ? -2 : 20)) + 'px') :
                            'auto',
                        height: (height - 2) + 'px',
                        border: '2px solid silver'
                    });
                    if (isTextInput && inputBoxWidth) {
                        css(input, {
                            left: (translateX + x) + 'px',
                            top: translateY + 'px'
                        });
                        // Inputs of types date, time or datetime-local should be centered
                        // on top of the dateBox
                    }
                    else {
                        css(input, {
                            left: Math.min(Math.round(x +
                                translateX -
                                (input.offsetWidth - width) / 2), this.chart.chartWidth - input.offsetWidth) + 'px',
                            top: (translateY - (input.offsetHeight - height) / 2) + 'px'
                        });
                    }
                }
            }
            /**
             * @private
             * @function Highcharts.RangeSelector#hideInput
             * @param {string} name
             */
            hideInput(name) {
                const input = name === 'min' ? this.minInput : this.maxInput;
                if (input) {
                    css(input, {
                        top: '-9999em',
                        border: 0,
                        width: '1px',
                        height: '1px'
                    });
                }
            }
            /**
             * @private
             * @function Highcharts.RangeSelector#defaultInputDateParser
             */
            defaultInputDateParser(inputDate, useUTC, time) {
                const hasTimezone = (str) => str.length > 6 &&
                    (str.lastIndexOf('-') === str.length - 6 ||
                        str.lastIndexOf('+') === str.length - 6);
                let input = inputDate.split('/').join('-').split(' ').join('T');
                if (input.indexOf('T') === -1) {
                    input += 'T00:00';
                }
                if (useUTC) {
                    input += 'Z';
                }
                else if (H.isSafari && !hasTimezone(input)) {
                    const offset = new Date(input).getTimezoneOffset() / 60;
                    input += offset <= 0 ? `+${pad(-offset)}:00` : `-${pad(offset)}:00`;
                }
                let date = Date.parse(input);
                // If the value isn't parsed directly to a value by the
                // browser's Date.parse method, try
                // parsing it a different way
                if (!isNumber(date)) {
                    const parts = inputDate.split('-');
                    date = Date.UTC(pInt(parts[0]), pInt(parts[1]) - 1, pInt(parts[2]));
                }
                if (time && useUTC && isNumber(date)) {
                    date += time.getTimezoneOffset(date);
                }
                return date;
            }
            /**
             * Draw either the 'from' or the 'to' HTML input box of the range selector
             *
             * @private
             * @function Highcharts.RangeSelector#drawInput
             */
            drawInput(name) {
                const { chart, div, inputGroup } = this;
                const rangeSelector = this, chartStyle = chart.renderer.style || {}, renderer = chart.renderer, options = chart.options.rangeSelector, lang = defaultOptions.lang, isMin = name === 'min';
                /**
                 * @private
                 */
                function updateExtremes() {
                    const { maxInput, minInput } = rangeSelector, chartAxis = chart.xAxis[0], unionExtremes = (chart.scroller && chart.scroller.getUnionExtremes()) || chartAxis, dataMin = unionExtremes.dataMin, dataMax = unionExtremes.dataMax;
                    let value = rangeSelector.getInputValue(name);
                    if (value !== Number(input.getAttribute('data-hc-time-previous')) &&
                        isNumber(value)) {
                        input.setAttribute('data-hc-time-previous', value);
                        // Validate the extremes. If it goes beyond the data min or
                        // max, use the actual data extreme (#2438).
                        if (isMin && maxInput && isNumber(dataMin)) {
                            if (value > Number(maxInput.getAttribute('data-hc-time'))) {
                                value = void 0;
                            }
                            else if (value < dataMin) {
                                value = dataMin;
                            }
                        }
                        else if (minInput && isNumber(dataMax)) {
                            if (value < Number(minInput.getAttribute('data-hc-time'))) {
                                value = void 0;
                            }
                            else if (value > dataMax) {
                                value = dataMax;
                            }
                        }
                        // Set the extremes
                        if (typeof value !== 'undefined') { // @todo typeof undefined
                            chartAxis.setExtremes(isMin ? value : chartAxis.min, isMin ? chartAxis.max : value, void 0, void 0, { trigger: 'rangeSelectorInput' });
                        }
                    }
                }
                // Create the text label
                const text = lang[isMin ? 'rangeSelectorFrom' : 'rangeSelectorTo'] || '';
                const label = renderer
                    .label(text, 0)
                    .addClass('highcharts-range-label')
                    .attr({
                    padding: text ? 2 : 0,
                    height: text ? options.inputBoxHeight : 0
                })
                    .add(inputGroup);
                // Create an SVG label that shows updated date ranges and records click
                // events that bring in the HTML input.
                const dateBox = renderer
                    .label('', 0)
                    .addClass('highcharts-range-input')
                    .attr({
                    padding: 2,
                    width: options.inputBoxWidth,
                    height: options.inputBoxHeight,
                    'text-align': 'center'
                })
                    .on('click', function () {
                    // If it is already focused, the onfocus event doesn't fire
                    // (#3713)
                    rangeSelector.showInput(name);
                    rangeSelector[name + 'Input'].focus();
                });
                if (!chart.styledMode) {
                    dateBox.attr({
                        stroke: options.inputBoxBorderColor,
                        'stroke-width': 1
                    });
                }
                dateBox.add(inputGroup);
                // Create the HTML input element. This is rendered as 1x1 pixel then set
                // to the right size when focused.
                const input = createElement('input', {
                    name: name,
                    className: 'highcharts-range-selector'
                }, void 0, div);
                // #14788: Setting input.type to an unsupported type throws in IE, so
                // we need to use setAttribute instead
                input.setAttribute('type', preferredInputType(options.inputDateFormat || '%e %b %Y'));
                if (!chart.styledMode) {
                    // Styles
                    label.css(merge(chartStyle, options.labelStyle));
                    dateBox.css(merge({
                        color: "#333333" /* Palette.neutralColor80 */
                    }, chartStyle, options.inputStyle));
                    css(input, extend({
                        position: 'absolute',
                        border: 0,
                        boxShadow: '0 0 15px rgba(0,0,0,0.3)',
                        width: '1px',
                        height: '1px',
                        padding: 0,
                        textAlign: 'center',
                        fontSize: chartStyle.fontSize,
                        fontFamily: chartStyle.fontFamily,
                        top: '-9999em' // #4798
                    }, options.inputStyle));
                }
                // Blow up the input box
                input.onfocus = () => {
                    rangeSelector.showInput(name);
                };
                // Hide away the input box
                input.onblur = () => {
                    // Update extremes only when inputs are active
                    if (input === H.doc.activeElement) { // Only when focused
                        // Update also when no `change` event is triggered, like when
                        // clicking inside the SVG (#4710)
                        updateExtremes();
                    }
                    // #10404 - move hide and blur outside focus
                    rangeSelector.hideInput(name);
                    rangeSelector.setInputValue(name);
                    input.blur(); // #4606
                };
                let keyDown = false;
                // Handle changes in the input boxes
                input.onchange = () => {
                    // Update extremes and blur input when clicking date input calendar
                    if (!keyDown) {
                        updateExtremes();
                        rangeSelector.hideInput(name);
                        input.blur();
                    }
                };
                input.onkeypress = (event) => {
                    // IE does not fire onchange on enter
                    if (event.keyCode === 13) {
                        updateExtremes();
                    }
                };
                input.onkeydown = (event) => {
                    keyDown = true;
                    // Arrow keys
                    if (event.keyCode === 38 || event.keyCode === 40) {
                        updateExtremes();
                    }
                };
                input.onkeyup = () => {
                    keyDown = false;
                };
                return { dateBox, input, label };
            }
            /**
             * Get the position of the range selector buttons and inputs. This can be
             * overridden from outside for custom positioning.
             *
             * @private
             * @function Highcharts.RangeSelector#getPosition
             */
            getPosition() {
                const chart = this.chart, options = chart.options.rangeSelector, top = options.verticalAlign === 'top' ?
                    chart.plotTop - chart.axisOffset[0] :
                    0; // Set offset only for verticalAlign top
                return {
                    buttonTop: top + options.buttonPosition.y,
                    inputTop: top + options.inputPosition.y - 10
                };
            }
            /**
             * Get the extremes of YTD. Will choose dataMax if its value is lower than
             * the current timestamp. Will choose dataMin if its value is higher than
             * the timestamp for the start of current year.
             *
             * @private
             * @function Highcharts.RangeSelector#getYTDExtremes
             * @return {*}
             * Returns min and max for the YTD
             */
            getYTDExtremes(dataMax, dataMin, useUTC) {
                const time = this.chart.time, now = new time.Date(dataMax), year = time.get('FullYear', now), startOfYear = useUTC ?
                    time.Date.UTC(year, 0, 1) : // eslint-disable-line new-cap
                    +new time.Date(year, 0, 1), min = Math.max(dataMin, startOfYear), ts = now.getTime();
                return {
                    max: Math.min(dataMax || ts, ts),
                    min
                };
            }
            /**
             * Render the range selector including the buttons and the inputs. The first
             * time render is called, the elements are created and positioned. On
             * subsequent calls, they are moved and updated.
             *
             * @private
             * @function Highcharts.RangeSelector#render
             * @param {number} [min]
             *        X axis minimum
             * @param {number} [max]
             *        X axis maximum
             */
            render(min, max) {
                const chart = this.chart, renderer = chart.renderer, container = chart.container, chartOptions = chart.options, options = chartOptions.rangeSelector, 
                // Place inputs above the container
                inputsZIndex = pick(chartOptions.chart.style &&
                    chartOptions.chart.style.zIndex, 0) + 1, inputEnabled = options.inputEnabled, rendered = this.rendered;
                if (options.enabled === false) {
                    return;
                }
                // Create the elements
                if (!rendered) {
                    this.group = renderer.g('range-selector-group')
                        .attr({
                        zIndex: 7
                    })
                        .add();
                    this.div = createElement('div', void 0, {
                        position: 'relative',
                        height: 0,
                        zIndex: inputsZIndex
                    });
                    if (this.buttonOptions.length) {
                        this.renderButtons();
                    }
                    // First create a wrapper outside the container in order to make
                    // the inputs work and make export correct
                    if (container.parentNode) {
                        container.parentNode.insertBefore(this.div, container);
                    }
                    if (inputEnabled) {
                        // Create the group to keep the inputs
                        this.inputGroup = renderer.g('input-group').add(this.group);
                        const minElems = this.drawInput('min');
                        this.minDateBox = minElems.dateBox;
                        this.minLabel = minElems.label;
                        this.minInput = minElems.input;
                        const maxElems = this.drawInput('max');
                        this.maxDateBox = maxElems.dateBox;
                        this.maxLabel = maxElems.label;
                        this.maxInput = maxElems.input;
                    }
                }
                if (inputEnabled) {
                    // Set or reset the input values
                    this.setInputValue('min', min);
                    this.setInputValue('max', max);
                    const unionExtremes = (chart.scroller && chart.scroller.getUnionExtremes()) || chart.xAxis[0] || {};
                    if (defined(unionExtremes.dataMin) &&
                        defined(unionExtremes.dataMax)) {
                        const minRange = chart.xAxis[0].minRange || 0;
                        this.setInputExtremes('min', unionExtremes.dataMin, Math.min(unionExtremes.dataMax, this.getInputValue('max')) - minRange);
                        this.setInputExtremes('max', Math.max(unionExtremes.dataMin, this.getInputValue('min')) + minRange, unionExtremes.dataMax);
                    }
                    // Reflow
                    if (this.inputGroup) {
                        let x = 0;
                        [
                            this.minLabel,
                            this.minDateBox,
                            this.maxLabel,
                            this.maxDateBox
                        ].forEach((label) => {
                            if (label) {
                                const { width } = label.getBBox();
                                if (width) {
                                    label.attr({ x });
                                    x += width + options.inputSpacing;
                                }
                            }
                        });
                    }
                }
                this.alignElements();
                this.rendered = true;
            }
            /**
             * Render the range buttons. This only runs the first time, later the
             * positioning is laid out in alignElements.
             *
             * @private
             * @function Highcharts.RangeSelector#renderButtons
             */
            renderButtons() {
                const { buttons, chart, options } = this;
                const lang = defaultOptions.lang;
                const renderer = chart.renderer;
                const buttonTheme = merge(options.buttonTheme);
                const states = buttonTheme && buttonTheme.states;
                // Prevent the button from resetting the width when the button state
                // changes since we need more control over the width when collapsing
                // the buttons
                const width = buttonTheme.width || 28;
                delete buttonTheme.width;
                delete buttonTheme.states;
                this.buttonGroup = renderer.g('range-selector-buttons').add(this.group);
                const dropdown = this.dropdown = createElement('select', void 0, {
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    padding: 0,
                    border: 0,
                    top: '-9999em',
                    cursor: 'pointer',
                    opacity: 0.0001
                }, this.div);
                // Prevent page zoom on iPhone
                addEvent(dropdown, 'touchstart', () => {
                    dropdown.style.fontSize = '16px';
                });
                // Forward events from select to button
                [
                    [H.isMS ? 'mouseover' : 'mouseenter'],
                    [H.isMS ? 'mouseout' : 'mouseleave'],
                    ['change', 'click']
                ].forEach(([from, to]) => {
                    addEvent(dropdown, from, () => {
                        const button = buttons[this.currentButtonIndex()];
                        if (button) {
                            fireEvent(button.element, to || from);
                        }
                    });
                });
                this.zoomText = renderer
                    .label((lang && lang.rangeSelectorZoom) || '', 0)
                    .attr({
                    padding: options.buttonTheme.padding,
                    height: options.buttonTheme.height,
                    paddingLeft: 0,
                    paddingRight: 0
                })
                    .add(this.buttonGroup);
                if (!this.chart.styledMode) {
                    this.zoomText.css(options.labelStyle);
                    buttonTheme['stroke-width'] = pick(buttonTheme['stroke-width'], 0);
                }
                createElement('option', {
                    textContent: this.zoomText.textStr,
                    disabled: true
                }, void 0, dropdown);
                this.buttonOptions.forEach((rangeOptions, i) => {
                    createElement('option', {
                        textContent: rangeOptions.title || rangeOptions.text
                    }, void 0, dropdown);
                    buttons[i] = renderer
                        .button(rangeOptions.text, 0, 0, (e) => {
                        // Extract events from button object and call
                        const buttonEvents = (rangeOptions.events && rangeOptions.events.click);
                        let callDefaultEvent;
                        if (buttonEvents) {
                            callDefaultEvent =
                                buttonEvents.call(rangeOptions, e);
                        }
                        if (callDefaultEvent !== false) {
                            this.clickButton(i);
                        }
                        this.isActive = true;
                    }, buttonTheme, states && states.hover, states && states.select, states && states.disabled)
                        .attr({
                        'text-align': 'center',
                        width
                    })
                        .add(this.buttonGroup);
                    if (rangeOptions.title) {
                        buttons[i].attr('title', rangeOptions.title);
                    }
                });
            }
            /**
             * Align the elements horizontally and vertically.
             *
             * @private
             * @function Highcharts.RangeSelector#alignElements
             */
            alignElements() {
                const { buttonGroup, buttons, chart, group, inputGroup, options, zoomText } = this;
                const chartOptions = chart.options;
                const navButtonOptions = (chartOptions.exporting &&
                    chartOptions.exporting.enabled !== false &&
                    chartOptions.navigation &&
                    chartOptions.navigation.buttonOptions);
                const { buttonPosition, inputPosition, verticalAlign } = options;
                // Get the X offset required to avoid overlapping with the exporting
                // button. This is used both by the buttonGroup and the inputGroup.
                const getXOffsetForExportButton = (group, position) => {
                    if (navButtonOptions &&
                        this.titleCollision(chart) &&
                        verticalAlign === 'top' &&
                        position.align === 'right' && ((position.y -
                        group.getBBox().height - 12) <
                        ((navButtonOptions.y || 0) +
                            (navButtonOptions.height || 0) +
                            chart.spacing[0]))) {
                        return -40;
                    }
                    return 0;
                };
                let plotLeft = chart.plotLeft;
                if (group && buttonPosition && inputPosition) {
                    let translateX = buttonPosition.x - chart.spacing[3];
                    if (buttonGroup) {
                        this.positionButtons();
                        if (!this.initialButtonGroupWidth) {
                            let width = 0;
                            if (zoomText) {
                                width += zoomText.getBBox().width + 5;
                            }
                            buttons.forEach((button, i) => {
                                width += button.width || 0;
                                if (i !== buttons.length - 1) {
                                    width += options.buttonSpacing;
                                }
                            });
                            this.initialButtonGroupWidth = width;
                        }
                        plotLeft -= chart.spacing[3];
                        this.updateButtonStates();
                        // Detect collision between button group and exporting
                        const xOffsetForExportButton = getXOffsetForExportButton(buttonGroup, buttonPosition);
                        this.alignButtonGroup(xOffsetForExportButton);
                        // Skip animation
                        group.placed = buttonGroup.placed = chart.hasLoaded;
                    }
                    let xOffsetForExportButton = 0;
                    if (inputGroup) {
                        // Detect collision between the input group and exporting button
                        xOffsetForExportButton = getXOffsetForExportButton(inputGroup, inputPosition);
                        if (inputPosition.align === 'left') {
                            translateX = plotLeft;
                        }
                        else if (inputPosition.align === 'right') {
                            translateX = -Math.max(chart.axisOffset[1], -xOffsetForExportButton);
                        }
                        // Update the alignment to the updated spacing box
                        inputGroup.align({
                            y: inputPosition.y,
                            width: inputGroup.getBBox().width,
                            align: inputPosition.align,
                            // Fix wrong getBBox() value on right align
                            x: inputPosition.x + translateX - 2
                        }, true, chart.spacingBox);
                        // Skip animation
                        inputGroup.placed = chart.hasLoaded;
                    }
                    this.handleCollision(xOffsetForExportButton);
                    // Vertical align
                    group.align({
                        verticalAlign
                    }, true, chart.spacingBox);
                    const alignTranslateY = group.alignAttr.translateY;
                    // Set position
                    let groupHeight = group.getBBox().height + 20; // # 20 padding
                    let translateY = 0;
                    // Calculate bottom position
                    if (verticalAlign === 'bottom') {
                        const legendOptions = chart.legend && chart.legend.options;
                        const legendHeight = (legendOptions &&
                            legendOptions.verticalAlign === 'bottom' &&
                            legendOptions.enabled &&
                            !legendOptions.floating ?
                            (chart.legend.legendHeight +
                                pick(legendOptions.margin, 10)) :
                            0);
                        groupHeight = groupHeight + legendHeight - 20;
                        translateY = (alignTranslateY -
                            groupHeight -
                            (options.floating ? 0 : options.y) -
                            (chart.titleOffset ? chart.titleOffset[2] : 0) -
                            10 // 10 spacing
                        );
                    }
                    if (verticalAlign === 'top') {
                        if (options.floating) {
                            translateY = 0;
                        }
                        if (chart.titleOffset && chart.titleOffset[0]) {
                            translateY = chart.titleOffset[0];
                        }
                        translateY += ((chart.margin[0] - chart.spacing[0]) || 0);
                    }
                    else if (verticalAlign === 'middle') {
                        if (inputPosition.y === buttonPosition.y) {
                            translateY = alignTranslateY;
                        }
                        else if (inputPosition.y || buttonPosition.y) {
                            if (inputPosition.y < 0 ||
                                buttonPosition.y < 0) {
                                translateY -= Math.min(inputPosition.y, buttonPosition.y);
                            }
                            else {
                                translateY = alignTranslateY - groupHeight;
                            }
                        }
                    }
                    group.translate(options.x, options.y + Math.floor(translateY));
                    // Translate HTML inputs
                    const { minInput, maxInput, dropdown } = this;
                    if (options.inputEnabled && minInput && maxInput) {
                        minInput.style.marginTop = group.translateY + 'px';
                        maxInput.style.marginTop = group.translateY + 'px';
                    }
                    if (dropdown) {
                        dropdown.style.marginTop = group.translateY + 'px';
                    }
                }
            }
            /**
             * Align the button group horizontally and vertically.
             *
             * @private
             * @function Highcharts.RangeSelector#alignButtonGroup
             * @param {number} xOffsetForExportButton
             * @param {number} [width]
             */
            alignButtonGroup(xOffsetForExportButton, width) {
                const { chart, options, buttonGroup } = this;
                const { buttonPosition } = options;
                const plotLeft = chart.plotLeft - chart.spacing[3];
                let translateX = buttonPosition.x - chart.spacing[3];
                if (buttonPosition.align === 'right') {
                    translateX += xOffsetForExportButton - plotLeft; // #13014
                }
                else if (buttonPosition.align === 'center') {
                    translateX -= plotLeft / 2;
                }
                if (buttonGroup) {
                    // Align button group
                    buttonGroup.align({
                        y: buttonPosition.y,
                        width: pick(width, this.initialButtonGroupWidth),
                        align: buttonPosition.align,
                        x: translateX
                    }, true, chart.spacingBox);
                }
            }
            /**
             * @private
             * @function Highcharts.RangeSelector#positionButtons
             */
            positionButtons() {
                const { buttons, chart, options, zoomText } = this;
                const verb = chart.hasLoaded ? 'animate' : 'attr';
                const { buttonPosition } = options;
                const plotLeft = chart.plotLeft;
                let buttonLeft = plotLeft;
                if (zoomText && zoomText.visibility !== 'hidden') {
                    // #8769, allow dynamically updating margins
                    zoomText[verb]({
                        x: pick(plotLeft + buttonPosition.x, plotLeft)
                    });
                    // Button start position
                    buttonLeft += buttonPosition.x +
                        zoomText.getBBox().width + 5;
                }
                for (let i = 0, iEnd = this.buttonOptions.length; i < iEnd; ++i) {
                    if (buttons[i].visibility !== 'hidden') {
                        buttons[i][verb]({ x: buttonLeft });
                        // Increase the button position for the next button
                        buttonLeft += (buttons[i].width || 0) + options.buttonSpacing;
                    }
                    else {
                        buttons[i][verb]({ x: plotLeft });
                    }
                }
            }
            /**
             * Handle collision between the button group and the input group
             *
             * @private
             * @function Highcharts.RangeSelector#handleCollision
             *
             * @param  {number} xOffsetForExportButton
             *                  The X offset of the group required to make room for the
             *                  exporting button
             */
            handleCollision(xOffsetForExportButton) {
                const { chart, buttonGroup, inputGroup } = this;
                const { buttonPosition, dropdown, inputPosition } = this.options;
                const maxButtonWidth = () => {
                    let buttonWidth = 0;
                    this.buttons.forEach((button) => {
                        const bBox = button.getBBox();
                        if (bBox.width > buttonWidth) {
                            buttonWidth = bBox.width;
                        }
                    });
                    return buttonWidth;
                };
                const groupsOverlap = (buttonGroupWidth) => {
                    if (inputGroup && buttonGroup) {
                        const inputGroupX = (inputGroup.alignAttr.translateX +
                            inputGroup.alignOptions.x -
                            xOffsetForExportButton +
                            // `getBBox` for detecing left margin
                            inputGroup.getBBox().x +
                            // 2px padding to not overlap input and label
                            2);
                        const inputGroupWidth = inputGroup.alignOptions.width;
                        const buttonGroupX = buttonGroup.alignAttr.translateX +
                            buttonGroup.getBBox().x;
                        return (buttonGroupX + buttonGroupWidth > inputGroupX) &&
                            (inputGroupX + inputGroupWidth > buttonGroupX) &&
                            (buttonPosition.y <
                                (inputPosition.y +
                                    inputGroup.getBBox().height));
                    }
                    return false;
                };
                const moveInputsDown = () => {
                    if (inputGroup && buttonGroup) {
                        inputGroup.attr({
                            translateX: inputGroup.alignAttr.translateX + (chart.axisOffset[1] >= -xOffsetForExportButton ?
                                0 :
                                -xOffsetForExportButton),
                            translateY: inputGroup.alignAttr.translateY +
                                buttonGroup.getBBox().height + 10
                        });
                    }
                };
                if (buttonGroup) {
                    if (dropdown === 'always') {
                        this.collapseButtons(xOffsetForExportButton);
                        if (groupsOverlap(maxButtonWidth())) {
                            // Move the inputs down if there is still a collision
                            // after collapsing the buttons
                            moveInputsDown();
                        }
                        return;
                    }
                    if (dropdown === 'never') {
                        this.expandButtons();
                    }
                }
                // Detect collision
                if (inputGroup && buttonGroup) {
                    if ((inputPosition.align === buttonPosition.align) ||
                        // 20 is minimal spacing between elements
                        groupsOverlap(this.initialButtonGroupWidth + 20)) {
                        if (dropdown === 'responsive') {
                            this.collapseButtons(xOffsetForExportButton);
                            if (groupsOverlap(maxButtonWidth())) {
                                moveInputsDown();
                            }
                        }
                        else {
                            moveInputsDown();
                        }
                    }
                    else if (dropdown === 'responsive') {
                        this.expandButtons();
                    }
                }
                else if (buttonGroup && dropdown === 'responsive') {
                    if (this.initialButtonGroupWidth > chart.plotWidth) {
                        this.collapseButtons(xOffsetForExportButton);
                    }
                    else {
                        this.expandButtons();
                    }
                }
            }
            /**
             * Collapse the buttons and put the select element on top.
             *
             * @private
             * @function Highcharts.RangeSelector#collapseButtons
             * @param {number} xOffsetForExportButton
             */
            collapseButtons(xOffsetForExportButton) {
                const { buttons, buttonOptions, chart, dropdown, options, zoomText } = this;
                // If the buttons are already collapsed do nothing.
                if (this.isCollapsed === true) {
                    return;
                }
                this.isCollapsed = true;
                const userButtonTheme = (chart.userOptions.rangeSelector &&
                    chart.userOptions.rangeSelector.buttonTheme) || {};
                const getAttribs = (text) => ({
                    text: text ? `${text} ▾` : '▾',
                    width: 'auto',
                    paddingLeft: pick(options.buttonTheme.paddingLeft, userButtonTheme.padding, 8),
                    paddingRight: pick(options.buttonTheme.paddingRight, userButtonTheme.padding, 8)
                });
                if (zoomText) {
                    zoomText.hide();
                }
                let hasActiveButton = false;
                buttonOptions.forEach((rangeOptions, i) => {
                    const button = buttons[i];
                    if (button.state !== 2) {
                        button.hide();
                    }
                    else {
                        button.show();
                        button.attr(getAttribs(rangeOptions.text));
                        hasActiveButton = true;
                    }
                });
                if (!hasActiveButton) {
                    if (dropdown) {
                        dropdown.selectedIndex = 0;
                    }
                    buttons[0].show();
                    buttons[0].attr(getAttribs(this.zoomText && this.zoomText.textStr));
                }
                const { align } = options.buttonPosition;
                this.positionButtons();
                if (align === 'right' || align === 'center') {
                    this.alignButtonGroup(xOffsetForExportButton, buttons[this.currentButtonIndex()].getBBox().width);
                }
                this.showDropdown();
            }
            /**
             * Show all the buttons and hide the select element.
             *
             * @private
             * @function Highcharts.RangeSelector#expandButtons
             */
            expandButtons() {
                const { buttons, buttonOptions, options, zoomText } = this;
                this.hideDropdown();
                // If buttons are already not collapsed, do nothing.
                if (this.isCollapsed === false) {
                    return;
                }
                this.isCollapsed = false;
                if (zoomText) {
                    zoomText.show();
                }
                buttonOptions.forEach((rangeOptions, i) => {
                    const button = buttons[i];
                    button.show();
                    button.attr({
                        text: rangeOptions.text,
                        width: options.buttonTheme.width || 28,
                        paddingLeft: pick(options.buttonTheme.paddingLeft, 'unset'),
                        paddingRight: pick(options.buttonTheme.paddingRight, 'unset')
                    });
                    if (button.state < 2) {
                        button.setState(0);
                    }
                });
                this.positionButtons();
            }
            /**
             * Get the index of the visible button when the buttons are collapsed.
             *
             * @private
             * @function Highcharts.RangeSelector#currentButtonIndex
             */
            currentButtonIndex() {
                const { dropdown } = this;
                if (dropdown && dropdown.selectedIndex > 0) {
                    return dropdown.selectedIndex - 1;
                }
                return 0;
            }
            /**
             * Position the select element on top of the button.
             *
             * @private
             * @function Highcharts.RangeSelector#showDropdown
             */
            showDropdown() {
                const { buttonGroup, buttons, chart, dropdown } = this;
                if (buttonGroup && dropdown) {
                    const { translateX = 0, translateY = 0 } = buttonGroup, bBox = buttons[this.currentButtonIndex()].getBBox();
                    css(dropdown, {
                        left: (chart.plotLeft + translateX) + 'px',
                        top: (translateY + 0.5) + 'px',
                        width: bBox.width + 'px',
                        height: bBox.height + 'px'
                    });
                    this.hasVisibleDropdown = true;
                }
            }
            /**
             * @private
             * @function Highcharts.RangeSelector#hideDropdown
             */
            hideDropdown() {
                const { dropdown } = this;
                if (dropdown) {
                    css(dropdown, {
                        top: '-9999em',
                        width: '1px',
                        height: '1px'
                    });
                    this.hasVisibleDropdown = false;
                }
            }
            /**
             * Extracts height of range selector
             *
             * @private
             * @function Highcharts.RangeSelector#getHeight
             * @return {number}
             * Returns rangeSelector height
             */
            getHeight() {
                const rangeSelector = this, options = rangeSelector.options, rangeSelectorGroup = rangeSelector.group, inputPosition = options.inputPosition, buttonPosition = options.buttonPosition, yPosition = options.y, buttonPositionY = buttonPosition.y, inputPositionY = inputPosition.y;
                let rangeSelectorHeight = 0;
                if (options.height) {
                    return options.height;
                }
                // Align the elements before we read the height in case we're switching
                // between wrapped and non-wrapped layout
                this.alignElements();
                rangeSelectorHeight = rangeSelectorGroup ?
                    // 13px to keep back compatibility
                    (rangeSelectorGroup.getBBox(true).height) + 13 +
                        yPosition :
                    0;
                const minPosition = Math.min(inputPositionY, buttonPositionY);
                if ((inputPositionY < 0 && buttonPositionY < 0) ||
                    (inputPositionY > 0 && buttonPositionY > 0)) {
                    rangeSelectorHeight += Math.abs(minPosition);
                }
                return rangeSelectorHeight;
            }
            /**
             * Detect collision with title or subtitle
             *
             * @private
             * @function Highcharts.RangeSelector#titleCollision
             * @return {boolean}
             * Returns collision status
             */
            titleCollision(chart) {
                return !(chart.options.title.text ||
                    chart.options.subtitle.text);
            }
            /**
             * Update the range selector with new options
             *
             * @private
             * @function Highcharts.RangeSelector#update
             * @param {Highcharts.RangeSelectorOptions} options
             */
            update(options) {
                const chart = this.chart;
                merge(true, chart.options.rangeSelector, options);
                this.destroy();
                this.init(chart);
                this.render();
            }
            /**
             * Destroys allocated elements.
             *
             * @private
             * @function Highcharts.RangeSelector#destroy
             */
            destroy() {
                const rSelector = this, minInput = rSelector.minInput, maxInput = rSelector.maxInput;
                if (rSelector.eventsToUnbind) {
                    rSelector.eventsToUnbind.forEach((unbind) => unbind());
                    rSelector.eventsToUnbind = void 0;
                }
                // Destroy elements in collections
                destroyObjectProperties(rSelector.buttons);
                // Clear input element events
                if (minInput) {
                    minInput.onfocus = minInput.onblur = minInput.onchange = null;
                }
                if (maxInput) {
                    maxInput.onfocus = maxInput.onblur = maxInput.onchange = null;
                }
                // Destroy HTML and SVG elements
                objectEach(rSelector, function (val, key) {
                    if (val && key !== 'chart') {
                        if (val instanceof SVGElement) {
                            // SVGElement
                            val.destroy();
                        }
                        else if (val instanceof window.HTMLElement) {
                            // HTML element
                            discardElement(val);
                        }
                    }
                    if (val !== RangeSelector.prototype[key]) {
                        rSelector[key] = null;
                    }
                }, this);
            }
        }
        extend(RangeSelector.prototype, {
            /**
             * The default buttons for pre-selecting time frames.
             * @private
             */
            defaultButtons: [{
                    type: 'month',
                    count: 1,
                    text: '1m',
                    title: 'View 1 month'
                }, {
                    type: 'month',
                    count: 3,
                    text: '3m',
                    title: 'View 3 months'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m',
                    title: 'View 6 months'
                }, {
                    type: 'ytd',
                    text: 'YTD',
                    title: 'View year to date'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1y',
                    title: 'View 1 year'
                }, {
                    type: 'all',
                    text: 'All',
                    title: 'View all'
                }],
            /**
             * The date formats to use when setting min, max and value on date inputs.
             * @private
             */
            inputTypeFormats: {
                'datetime-local': '%Y-%m-%dT%H:%M:%S',
                'date': '%Y-%m-%d',
                'time': '%H:%M:%S'
            }
        });
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        /**
         * Define the time span for the button
         *
         * @typedef {"all"|"day"|"hour"|"millisecond"|"minute"|"month"|"second"|"week"|"year"|"ytd"} Highcharts.RangeSelectorButtonTypeValue
         */
        /**
         * Callback function to react on button clicks.
         *
         * @callback Highcharts.RangeSelectorClickCallbackFunction
         *
         * @param {global.Event} e
         *        Event arguments.
         *
         * @param {boolean|undefined}
         *        Return false to cancel the default button event.
         */
        /**
         * Callback function to parse values entered in the input boxes and return a
         * valid JavaScript time as milliseconds since 1970.
         *
         * @callback Highcharts.RangeSelectorParseCallbackFunction
         *
         * @param {string} value
         *        Input value to parse.
         *
         * @return {number}
         *         Parsed JavaScript time value.
         */
        (''); // Keeps doclets above in JS file

        return RangeSelector;
    });
    _registerModule(_modules, 'Core/Chart/StockChart.js', [_modules['Core/Chart/Chart.js'], _modules['Core/Templating.js'], _modules['Core/Defaults.js'], _modules['Stock/Navigator/NavigatorDefaults.js'], _modules['Stock/RangeSelector/RangeSelectorDefaults.js'], _modules['Stock/Scrollbar/ScrollbarDefaults.js'], _modules['Stock/Utilities/StockUtilities.js'], _modules['Core/Utilities.js']], function (Chart, F, D, NavigatorDefaults, RangeSelectorDefaults, ScrollbarDefaults, StockUtilities, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { format } = F;
        const { getOptions } = D;
        const { setFixedRange } = StockUtilities;
        const { addEvent, clamp, defined, extend, find, isNumber, isString, merge, pick, splat } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Get stock-specific default axis options.
         *
         * @private
         * @function getDefaultAxisOptions
         */
        function getDefaultAxisOptions(coll, options, defaultOptions) {
            if (coll === 'xAxis') {
                return {
                    minPadding: 0,
                    maxPadding: 0,
                    overscroll: 0,
                    ordinal: true
                };
            }
            if (coll === 'yAxis') {
                return {
                    labels: {
                        y: -2
                    },
                    opposite: defaultOptions.opposite ?? options.opposite ?? true,
                    showLastLabel: !!(
                    // #6104, show last label by default for category axes
                    options.categories ||
                        options.type === 'category'),
                    title: {
                        text: defaultOptions.title?.text !== 'Values' ?
                            defaultOptions.title?.text :
                            null
                    }
                };
            }
            return {};
        }
        /**
         * Get stock-specific forced axis options.
         *
         * @private
         * @function getForcedAxisOptions
         */
        function getForcedAxisOptions(type, chartOptions) {
            if (type === 'xAxis') {
                // Always disable startOnTick:true on the main axis when the navigator
                // is enabled (#1090)
                const navigatorEnabled = pick(chartOptions.navigator && chartOptions.navigator.enabled, NavigatorDefaults.enabled, true);
                const axisOptions = {
                    type: 'datetime',
                    categories: void 0
                };
                if (navigatorEnabled) {
                    axisOptions.startOnTick = false;
                    axisOptions.endOnTick = false;
                }
                return axisOptions;
            }
            return {};
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * Stock-optimized chart. Use {@link Highcharts.Chart|Chart} for common charts.
         *
         * @requires modules/stock
         *
         * @class
         * @name Highcharts.StockChart
         * @extends Highcharts.Chart
         */
        class StockChart extends Chart {
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initializes the chart. The constructor's arguments are passed on
             * directly.
             *
             * @function Highcharts.StockChart#init
             *
             * @param {Highcharts.Options} userOptions
             *        Custom options.
             *
             * @param {Function} [callback]
             *        Function to run when the chart has loaded and all external
             *        images are loaded.
             *
             *
             * @emits Highcharts.StockChart#event:init
             * @emits Highcharts.StockChart#event:afterInit
             */
            init(userOptions, callback) {
                const defaultOptions = getOptions(), xAxisOptions = userOptions.xAxis, yAxisOptions = userOptions.yAxis, 
                // Always disable startOnTick:true on the main axis when the
                // navigator is enabled (#1090)
                navigatorEnabled = pick(userOptions.navigator && userOptions.navigator.enabled, NavigatorDefaults.enabled, true);
                // Avoid doing these twice
                userOptions.xAxis = userOptions.yAxis = void 0;
                const options = merge({
                    chart: {
                        panning: {
                            enabled: true,
                            type: 'x'
                        },
                        zooming: {
                            pinchType: 'x',
                            mouseWheel: {
                                type: 'x'
                            }
                        }
                    },
                    navigator: {
                        enabled: navigatorEnabled
                    },
                    scrollbar: {
                        // #4988 - check if setOptions was called
                        enabled: pick(ScrollbarDefaults.enabled, true)
                    },
                    rangeSelector: {
                        // #4988 - check if setOptions was called
                        enabled: pick(RangeSelectorDefaults.rangeSelector.enabled, true)
                    },
                    title: {
                        text: null
                    },
                    tooltip: {
                        split: pick(defaultOptions.tooltip && defaultOptions.tooltip.split, true),
                        crosshairs: true
                    },
                    legend: {
                        enabled: false
                    }
                }, userOptions, // User's options
                {
                    isStock: true // Internal flag
                });
                userOptions.xAxis = xAxisOptions;
                userOptions.yAxis = yAxisOptions;
                // Apply X axis options to both single and multi y axes
                options.xAxis = splat(userOptions.xAxis || {}).map((xAxisOptions) => merge(getDefaultAxisOptions('xAxis', xAxisOptions, defaultOptions.xAxis), 
                // #7690
                xAxisOptions, // User options
                getForcedAxisOptions('xAxis', userOptions)));
                // Apply Y axis options to both single and multi y axes
                options.yAxis = splat(userOptions.yAxis || {}).map((yAxisOptions) => merge(getDefaultAxisOptions('yAxis', yAxisOptions, defaultOptions.yAxis), 
                // #7690
                yAxisOptions // User options
                ));
                super.init(options, callback);
            }
            /**
             * Factory for creating different axis types.
             * Extended to add stock defaults.
             *
             * @private
             * @function Highcharts.StockChart#createAxis
             * @param {string} coll
             * An axis type.
             * @param {Chart.CreateAxisOptionsObject} options
             * The axis creation options.
             */
            createAxis(coll, options) {
                options.axis = merge(getDefaultAxisOptions(coll, options.axis, getOptions()[coll]), options.axis, getForcedAxisOptions(coll, this.userOptions));
                return super.createAxis(coll, options);
            }
        }
        addEvent(Chart, 'update', function (e) {
            const chart = this, options = e.options;
            // Use case: enabling scrollbar from a disabled state.
            // Scrollbar needs to be initialized from a controller, Navigator in this
            // case (#6615)
            if ('scrollbar' in options && chart.navigator) {
                merge(true, chart.options.scrollbar, options.scrollbar);
                chart.navigator.update({});
                delete options.scrollbar;
            }
        });
        /* *
         *
         *  Composition
         *
         * */
        (function (StockChart) {
            /* *
             *
             *  Functions
             *
             * */
            /** @private */
            function compose(ChartClass, AxisClass, SeriesClass, SVGRendererClass) {
                const seriesProto = SeriesClass.prototype;
                if (!seriesProto.forceCropping) {
                    addEvent(AxisClass, 'afterDrawCrosshair', onAxisAfterDrawCrosshair);
                    addEvent(AxisClass, 'afterHideCrosshair', onAxisAfterHideCrosshair);
                    addEvent(AxisClass, 'autoLabelAlign', onAxisAutoLabelAlign);
                    addEvent(AxisClass, 'destroy', onAxisDestroy);
                    addEvent(AxisClass, 'getPlotLinePath', onAxisGetPlotLinePath);
                    ChartClass.prototype.setFixedRange = setFixedRange;
                    seriesProto.forceCropping = seriesForceCropping;
                    addEvent(SeriesClass, 'setOptions', onSeriesSetOptions);
                    SVGRendererClass.prototype.crispPolyLine = svgRendererCrispPolyLine;
                }
            }
            StockChart.compose = compose;
            /**
             * Extend crosshairs to also draw the label.
             * @private
             */
            function onAxisAfterDrawCrosshair(event) {
                const axis = this;
                // Check if the label has to be drawn
                if (!axis.crosshair ||
                    !axis.crosshair.label ||
                    !axis.crosshair.label.enabled ||
                    !axis.cross ||
                    !isNumber(axis.min) ||
                    !isNumber(axis.max)) {
                    return;
                }
                const chart = axis.chart, log = axis.logarithmic, options = axis.crosshair.label, // The label's options
                horiz = axis.horiz, // Axis orientation
                opposite = axis.opposite, // Axis position
                left = axis.left, // Left position
                top = axis.top, // Top position
                width = axis.width, tickInside = axis.options.tickPosition === 'inside', snap = axis.crosshair.snap !== false, e = event.e || (axis.cross && axis.cross.e), point = event.point;
                let crossLabel = axis.crossLabel, // The svgElement
                posx, posy, formatOption = options.format, formatFormat = '', limit, offset = 0, 
                // Use last available event (#5287)
                min = axis.min, max = axis.max;
                if (log) {
                    min = log.lin2log(axis.min);
                    max = log.lin2log(axis.max);
                }
                const align = (horiz ? 'center' : opposite ?
                    (axis.labelAlign === 'right' ? 'right' : 'left') :
                    (axis.labelAlign === 'left' ? 'left' : 'center'));
                // If the label does not exist yet, create it.
                if (!crossLabel) {
                    crossLabel = axis.crossLabel = chart.renderer
                        .label('', 0, void 0, options.shape || 'callout')
                        .addClass('highcharts-crosshair-label highcharts-color-' + (point && point.series ?
                        point.series.colorIndex :
                        axis.series[0] && this.series[0].colorIndex))
                        .attr({
                        align: options.align || align,
                        padding: pick(options.padding, 8),
                        r: pick(options.borderRadius, 3),
                        zIndex: 2
                    })
                        .add(axis.labelGroup);
                    // Presentational
                    if (!chart.styledMode) {
                        crossLabel
                            .attr({
                            fill: options.backgroundColor ||
                                ( // #14888
                                point && point.series &&
                                    point.series.color) ||
                                "#666666" /* Palette.neutralColor60 */,
                            stroke: options.borderColor || '',
                            'stroke-width': options.borderWidth || 0
                        })
                            .css(extend({
                            color: "#ffffff" /* Palette.backgroundColor */,
                            fontWeight: 'normal',
                            fontSize: '0.7em',
                            textAlign: 'center'
                        }, options.style || {}));
                    }
                }
                if (horiz) {
                    posx = snap ? (point.plotX || 0) + left : e.chartX;
                    posy = top + (opposite ? 0 : axis.height);
                }
                else {
                    posx = left + axis.offset + (opposite ? width : 0);
                    posy = snap ? (point.plotY || 0) + top : e.chartY;
                }
                if (!formatOption && !options.formatter) {
                    if (axis.dateTime) {
                        formatFormat = '%b %d, %Y';
                    }
                    formatOption =
                        '{value' + (formatFormat ? ':' + formatFormat : '') + '}';
                }
                // Show the label
                const value = snap ?
                    (axis.isXAxis ? point.x : point.y) :
                    axis.toValue(horiz ? e.chartX : e.chartY);
                // Crosshair should be rendered within Axis range (#7219) and the point
                // of currentPriceIndicator should be inside the plot area (#14879).
                const isInside = point && point.series ?
                    point.series.isPointInside(point) :
                    (isNumber(value) && value > min && value < max);
                let text = '';
                if (formatOption) {
                    text = format(formatOption, { value }, chart);
                }
                else if (options.formatter && isNumber(value)) {
                    text = options.formatter.call(axis, value);
                }
                crossLabel.attr({
                    text,
                    x: posx,
                    y: posy,
                    visibility: isInside ? 'inherit' : 'hidden'
                });
                const crossBox = crossLabel.getBBox();
                // Now it is placed we can correct its position
                if (isNumber(crossLabel.x) && !horiz && !opposite) {
                    posx = crossLabel.x - (crossBox.width / 2);
                }
                if (isNumber(crossLabel.y)) {
                    if (horiz) {
                        if ((tickInside && !opposite) || (!tickInside && opposite)) {
                            posy = crossLabel.y - crossBox.height;
                        }
                    }
                    else {
                        posy = crossLabel.y - (crossBox.height / 2);
                    }
                }
                // Check the edges
                if (horiz) {
                    limit = {
                        left,
                        right: left + axis.width
                    };
                }
                else {
                    limit = {
                        left: axis.labelAlign === 'left' ? left : 0,
                        right: axis.labelAlign === 'right' ?
                            left + axis.width :
                            chart.chartWidth
                    };
                }
                const translateX = crossLabel.translateX || 0;
                // Left edge
                if (translateX < limit.left) {
                    offset = limit.left - translateX;
                }
                // Right edge
                if (translateX + crossBox.width >= limit.right) {
                    offset = -(translateX + crossBox.width - limit.right);
                }
                // Show the crosslabel
                crossLabel.attr({
                    x: posx + offset,
                    y: posy,
                    // First set x and y, then anchorX and anchorY, when box is actually
                    // calculated, #5702
                    anchorX: horiz ?
                        posx :
                        (axis.opposite ? 0 : chart.chartWidth),
                    anchorY: horiz ?
                        (axis.opposite ? chart.chartHeight : 0) :
                        posy + crossBox.height / 2
                });
            }
            /**
             * Wrapper to hide the label.
             * @private
             */
            function onAxisAfterHideCrosshair() {
                const axis = this;
                if (axis.crossLabel) {
                    axis.crossLabel = axis.crossLabel.hide();
                }
            }
            /**
             * Override the automatic label alignment so that the first Y axis' labels
             * are drawn on top of the grid line, and subsequent axes are drawn outside.
             * @private
             */
            function onAxisAutoLabelAlign(e) {
                const axis = this, chart = axis.chart, options = axis.options, panes = chart._labelPanes = chart._labelPanes || {}, labelOptions = options.labels;
                if (chart.options.isStock && axis.coll === 'yAxis') {
                    const key = options.top + ',' + options.height;
                    // Do it only for the first Y axis of each pane
                    if (!panes[key] && labelOptions.enabled) {
                        if (labelOptions.distance === 15 && // Default
                            axis.side === 1) {
                            labelOptions.distance = 0;
                        }
                        if (typeof labelOptions.align === 'undefined') {
                            labelOptions.align = 'right';
                        }
                        panes[key] = axis;
                        e.align = 'right';
                        e.preventDefault();
                    }
                }
            }
            /**
             * Clear axis from label panes. (#6071)
             * @private
             */
            function onAxisDestroy() {
                const axis = this, chart = axis.chart, key = (axis.options &&
                    (axis.options.top + ',' + axis.options.height));
                if (key && chart._labelPanes && chart._labelPanes[key] === axis) {
                    delete chart._labelPanes[key];
                }
            }
            /**
             * Override getPlotLinePath to allow for multipane charts.
             * @private
             */
            function onAxisGetPlotLinePath(e) {
                const axis = this, series = (axis.isLinked && !axis.series && axis.linkedParent ?
                    axis.linkedParent.series :
                    axis.series), chart = axis.chart, renderer = chart.renderer, axisLeft = axis.left, axisTop = axis.top, result = [], translatedValue = e.translatedValue, value = e.value, force = e.force, 
                /**
                 * Return the other axis based on either the axis option or on
                 * related series.
                 * @private
                 */
                getAxis = (coll) => {
                    const otherColl = coll === 'xAxis' ? 'yAxis' : 'xAxis', opt = axis.options[otherColl];
                    // Other axis indexed by number
                    if (isNumber(opt)) {
                        return [chart[otherColl][opt]];
                    }
                    // Other axis indexed by id (like navigator)
                    if (isString(opt)) {
                        return [chart.get(opt)];
                    }
                    // Auto detect based on existing series
                    return series.map((s) => s[otherColl]);
                };
                let x1, y1, x2, y2, axes = [], // #3416 need a default array
                axes2, uniqueAxes, transVal;
                if ( // For stock chart, by default render paths across the panes
                // except the case when `acrossPanes` is disabled by user (#6644)
                (chart.options.isStock && e.acrossPanes !== false) &&
                    // Ignore in case of colorAxis or zAxis. #3360, #3524, #6720
                    axis.coll === 'xAxis' || axis.coll === 'yAxis') {
                    e.preventDefault();
                    // Get the related axes based on series
                    axes = getAxis(axis.coll);
                    // Get the related axes based options.*Axis setting #2810
                    axes2 = (axis.isXAxis ? chart.yAxis : chart.xAxis);
                    for (const A of axes2) {
                        if (defined(A.options.id) ?
                            A.options.id.indexOf('navigator') === -1 :
                            true) {
                            const a = (A.isXAxis ? 'yAxis' : 'xAxis'), rax = (defined(A.options[a]) ?
                                chart[a][A.options[a]] :
                                chart[a][0]);
                            if (axis === rax) {
                                axes.push(A);
                            }
                        }
                    }
                    // Remove duplicates in the axes array. If there are no axes in the
                    // axes array, we are adding an axis without data, so we need to
                    // populate this with grid lines (#2796).
                    uniqueAxes = axes.length ?
                        [] :
                        [axis.isXAxis ? chart.yAxis[0] : chart.xAxis[0]]; // #3742
                    for (const axis2 of axes) {
                        if (uniqueAxes.indexOf(axis2) === -1 &&
                            // Do not draw on axis which overlap completely. #5424
                            !find(uniqueAxes, (unique) => (unique.pos === axis2.pos &&
                                unique.len === axis2.len))) {
                            uniqueAxes.push(axis2);
                        }
                    }
                    transVal = pick(translatedValue, axis.translate(value || 0, void 0, void 0, e.old));
                    if (isNumber(transVal)) {
                        if (axis.horiz) {
                            for (const axis2 of uniqueAxes) {
                                let skip;
                                y1 = axis2.pos;
                                y2 = y1 + axis2.len;
                                x1 = x2 = Math.round(transVal + axis.transB);
                                // Outside plot area
                                if (force !== 'pass' &&
                                    (x1 < axisLeft || x1 > axisLeft + axis.width)) {
                                    if (force) {
                                        x1 = x2 = clamp(x1, axisLeft, axisLeft + axis.width);
                                    }
                                    else {
                                        skip = true;
                                    }
                                }
                                if (!skip) {
                                    result.push(['M', x1, y1], ['L', x2, y2]);
                                }
                            }
                        }
                        else {
                            for (const axis2 of uniqueAxes) {
                                let skip;
                                x1 = axis2.pos;
                                x2 = x1 + axis2.len;
                                y1 = y2 = Math.round(axisTop + axis.height - transVal);
                                // Outside plot area
                                if (force !== 'pass' &&
                                    (y1 < axisTop || y1 > axisTop + axis.height)) {
                                    if (force) {
                                        y1 = y2 = clamp(y1, axisTop, axisTop + axis.height);
                                    }
                                    else {
                                        skip = true;
                                    }
                                }
                                if (!skip) {
                                    result.push(['M', x1, y1], ['L', x2, y2]);
                                }
                            }
                        }
                    }
                    e.path = result.length > 0 ?
                        renderer.crispPolyLine(result, e.lineWidth || 1) :
                        // #3557 getPlotLinePath in regular Highcharts also returns null
                        void 0;
                }
            }
            /**
             * Handle som Stock-specific series defaults, override the plotOptions
             * before series options are handled.
             * @private
             */
            function onSeriesSetOptions(e) {
                const series = this;
                if (series.chart.options.isStock) {
                    let overrides;
                    if (series.is('column') || series.is('columnrange')) {
                        overrides = {
                            borderWidth: 0,
                            shadow: false
                        };
                    }
                    else if (!series.is('scatter') && !series.is('sma')) {
                        overrides = {
                            marker: {
                                enabled: false,
                                radius: 2
                            }
                        };
                    }
                    if (overrides) {
                        e.plotOptions[series.type] = merge(e.plotOptions[series.type], overrides);
                    }
                }
            }
            /**
             * Based on the data grouping options decides whether
             * the data should be cropped while processing.
             *
             * @ignore
             * @function Highcharts.Series#forceCropping
             */
            function seriesForceCropping() {
                const series = this, chart = series.chart, options = series.options, dataGroupingOptions = options.dataGrouping, groupingEnabled = (series.allowDG !== false &&
                    dataGroupingOptions &&
                    pick(dataGroupingOptions.enabled, chart.options.isStock));
                return groupingEnabled;
            }
            /* eslint-disable jsdoc/check-param-names */
            /**
             * Factory function for creating new stock charts. Creates a new
             * {@link Highcharts.StockChart|StockChart} object with different default
             * options than the basic Chart.
             *
             * @example
             * let chart = Highcharts.stockChart('container', {
             *     series: [{
             *         data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
             *         pointInterval: 24 * 60 * 60 * 1000
             *     }]
             * });
             *
             * @function Highcharts.stockChart
             *
             * @param {string|Highcharts.HTMLDOMElement} [renderTo]
             *        The DOM element to render to, or its id.
             *
             * @param {Highcharts.Options} options
             *        The chart options structure as described in the
             *        [options reference](https://api.highcharts.com/highstock).
             *
             * @param {Highcharts.ChartCallbackFunction} [callback]
             *        A function to execute when the chart object is finished
             *        rendering and all external image files (`chart.backgroundImage`,
             *        `chart.plotBackgroundImage` etc) are loaded. Defining a
             *        [chart.events.load](https://api.highcharts.com/highstock/chart.events.load)
             *        handler is equivalent.
             *
             * @return {Highcharts.StockChart}
             *         The chart object.
             */
            function stockChart(a, b, c) {
                return new StockChart(a, b, c);
            }
            StockChart.stockChart = stockChart;
            /* eslint-enable jsdoc/check-param-names */
            /**
             * Function to crisp a line with multiple segments
             *
             * @private
             * @function Highcharts.SVGRenderer#crispPolyLine
             */
            function svgRendererCrispPolyLine(points, width) {
                // Points format: [['M', 0, 0], ['L', 100, 0]]
                // normalize to a crisp line
                for (let i = 0; i < points.length; i = i + 2) {
                    const start = points[i], end = points[i + 1];
                    if (start[1] === end[1]) {
                        // Subtract due to #1129. Now bottom and left axis gridlines
                        // behave the same.
                        start[1] = end[1] =
                            Math.round(start[1]) - (width % 2 / 2);
                    }
                    if (start[2] === end[2]) {
                        start[2] = end[2] =
                            Math.round(start[2]) + (width % 2 / 2);
                    }
                }
                return points;
            }
        })(StockChart || (StockChart = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return StockChart;
    });
    _registerModule(_modules, 'Series/HLC/HLCPoint.js', [_modules['Core/Series/SeriesRegistry.js']], function (SeriesRegistry) {
        /* *
         *
         *  (c) 2010-2024 Pawel Lysy
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { column: { prototype: { pointClass: ColumnPoint } } } = SeriesRegistry.seriesTypes;
        /* *
         *
         *  Class
         *
         * */
        class HLCPoint extends ColumnPoint {
        }
        /* *
         *
         *  Default Export
         *
         * */

        return HLCPoint;
    });
    _registerModule(_modules, 'Series/HLC/HLCSeriesDefaults.js', [], function () {
        /* *
         *
         *  (c) 2010-2024 Pawel Lysy
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        /**
         * An HLC chart is a style of financial chart used to describe price
         * movements over time. It displays high, low and close values per
         * data point.
         *
         * @sample stock/demo/hlc/
         *         HLC chart
         *
         * @extends      plotOptions.column
         * @excluding    borderColor, borderRadius, borderWidth, crisp, stacking,
         *               stack
         * @product      highstock
         * @optionparent plotOptions.hlc
         */
        const HLCSeriesDefaults = {
            /**
             * The approximate pixel width of each group. If for example a series
             * with 30 points is displayed over a 600 pixel wide plot area, no
             * grouping is performed. If however the series contains so many points
             * that the spacing is less than the groupPixelWidth, Highcharts will
             * try to group it into appropriate groups so that each is more or less
             * two pixels wide. Defaults to `5`.
             *
             * @type      {number}
             * @default   5
             * @product   highstock
             * @apioption plotOptions.hlc.dataGrouping.groupPixelWidth
             */
            /**
             * @type      {Highcharts.DataGroupingApproximationValue|Function}
             * @default   hlc
             * @product   highstock
             * @apioption plotOptions.hlc.dataGrouping.approximation
             */
            /**
             * @default   close
             * @apioption plotOptions.hlc.colorKey
             */
            /**
             * The pixel width of the line/border. Defaults to `1`.
             *
             * @sample {highstock} stock/plotoptions/hlc-linewidth/
             *         A greater line width
             *
             * @type    {number}
             * @default 1
             * @product highstock
             *
             * @public
             */
            lineWidth: 1,
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
                    '<b> {series.name}</b><br/>' +
                    'High: {point.high}<br/>' +
                    'Low: {point.low}<br/>' +
                    'Close: {point.close}<br/>'
            },
            /**
             * @type {number|null}
             */
            threshold: null,
            states: {
                /**
                 * @extends plotOptions.column.states.hover
                 * @product highstock
                 */
                hover: {
                    /**
                     * The pixel width of the line representing the HLC point.
                     *
                     * @type    {number}
                     * @default 3
                     * @product highstock
                     */
                    lineWidth: 3
                }
            },
            /**
             * Determines which one of  `high`, `low`, `close` values should
             * be represented as `point.y`, which is later used to set dataLabel
             * position and [compare](#plotOptions.series.compare).
             *
             * @sample {highstock} stock/plotoptions/hlc-pointvalkey/
             *         Possible values
             *
             * @declare    Highcharts.OptionsHLCPointValKeyValue
             * @type       {string}
             * @default    close
             * @validvalue ["high", "low", "close"]
             * @product    highstock
             * @apioption  plotOptions.hlc.pointValKey
             */
            /**
             * @default   close
             * @apioption plotOptions.hlc.colorKey
             */
            stickyTracking: true
        };
        /**
         * A `hlc` series. If the [type](#series.hlc.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.hlc
         * @excluding dataParser, dataURL
         * @product   highstock
         * @apioption series.hlc
         */
        /**
         * An array of data points for the series. For the `hlc` series type,
         * points can be given in the following ways:
         *
         * 1. An array of arrays with 4 or 3 values. In this case, the values correspond
         *    to `x,high,low,close`. If the first value is a string, it is applied
         *    as the name of the point, and the `x` value is inferred. The `x` value can
         *    also be omitted, in which case the inner arrays should be of length of 3\.
         *    Then the `x` value is automatically calculated, either starting at 0 and
         *    incremented by 1, or from `pointStart` and `pointInterval` given in the
         *    series options.
         *    ```js
         *    data: [
         *        [0, 5, 6, 7],
         *        [1, 4, 8, 2],
         *        [2, 3, 4, 10]
         *    ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.hlc.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        high: 4,
         *        low: 5,
         *        close: 2,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        high: 3,
         *        low: 6,
         *        close: 7,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @type      {Array<Array<(number|string),number,number>|Array<(number|string),number,number,number>|*>}
         * @extends   series.arearange.data
         * @excluding y, marker
         * @product   highstock
         * @apioption series.hlc.data
         */
        /**
         * The closing value of each data point.
         *
         * @type      {number}
         * @product   highstock
         * @apioption series.hlc.data.close
         */
        (''); // Keeps doclets above in JS file
        /* *
         *
         *  Default Export
         *
         * */

        return HLCSeriesDefaults;
    });
    _registerModule(_modules, 'Series/HLC/HLCSeries.js', [_modules['Series/HLC/HLCPoint.js'], _modules['Series/HLC/HLCSeriesDefaults.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (HLCPoint, HLCSeriesDefaults, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2024 Pawel Lysy
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { column: ColumnSeries } = SeriesRegistry.seriesTypes;
        const { extend, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The hlc series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.hlc
         *
         * @augments Highcharts.Series
         */
        class HLCSeries extends ColumnSeries {
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Extend the path if close is not between high and low.
             *
             * @param {SVGPath} path the path array of the point
             * @param {number} halfStrokeWidth
             * @param {number} value value of the point to which the stem should be extended
             */
            extendStem(path, halfStrokeWidth, value) {
                const start = path[0];
                const end = path[1];
                // We don't need to worry about crisp - close value
                // is already crisped and halfStrokeWidth should remove it.
                if (typeof start[2] === 'number') {
                    start[2] = Math.max(value + halfStrokeWidth, start[2]);
                }
                if (typeof end[2] === 'number') {
                    end[2] = Math.min(value - halfStrokeWidth, end[2]);
                }
            }
            /**
             * Function to create SVGPath of the point based on the
             * plot positions of this point.
             * @private
             */
            getPointPath(point, graphic) {
                // Crisp vector coordinates
                const strokeWidth = graphic.strokeWidth(), series = point.series, crispCorr = (strokeWidth % 2) / 2, 
                // #2596:
                crispX = Math.round(point.plotX) - crispCorr, halfWidth = Math.round(point.shapeArgs.width / 2);
                let plotClose = point.plotClose;
                // The vertical stem
                const path = [
                    ['M', crispX, Math.round(point.yBottom)],
                    ['L', crispX, Math.round(point.plotHigh)]
                ];
                // Close
                if (point.close !== null) {
                    plotClose = Math.round(point.plotClose) + crispCorr;
                    path.push(['M', crispX, plotClose], ['L', crispX + halfWidth, plotClose]);
                    series.extendStem(path, strokeWidth / 2, plotClose);
                }
                return path;
            }
            /**
             * Draw single point
             * @private
             */
            drawSinglePoint(point) {
                const series = point.series, chart = series.chart;
                let path, graphic = point.graphic;
                if (typeof point.plotY !== 'undefined') {
                    // Create and/or update the graphic
                    if (!graphic) {
                        point.graphic = graphic = chart.renderer.path()
                            .add(series.group);
                    }
                    if (!chart.styledMode) {
                        graphic.attr(series.pointAttribs(point, (point.selected && 'select'))); // #3897
                    }
                    // Crisp vector coordinates
                    path = series.getPointPath(point, graphic);
                    graphic[!graphic ? 'attr' : 'animate']({ d: path })
                        .addClass(point.getClassName(), true);
                }
            }
            /**
             * Draw the data points
             * @private
             */
            drawPoints() {
                this.points.forEach(this.drawSinglePoint);
            }
            /**
             * @private
             * @function Highcharts.seriesTypes.hlc#init
             */
            init() {
                super.init.apply(this, arguments);
                this.options.stacking = void 0; // #8817
            }
            /**
             * Postprocess mapping between options and SVG attributes
             * @private
             */
            pointAttribs(point, state) {
                const attribs = super.pointAttribs.call(this, point, state);
                delete attribs.fill;
                return attribs;
            }
            toYData(point) {
                // Return a plain array for speedy calculation
                return [point.high, point.low, point.close];
            }
            /**
             * Translate data points from raw values x and y to plotX and plotY
             *
             * @private
             * @function Highcharts.seriesTypes.hlc#translate
             */
            translate() {
                const series = this, yAxis = series.yAxis, names = (this.pointArrayMap && this.pointArrayMap.slice()) || [], translated = names.map((name) => `plot${name.charAt(0).toUpperCase() + name.slice(1)}`);
                translated.push('yBottom');
                names.push('low');
                super.translate.apply(series);
                // Do the translation
                series.points.forEach(function (point) {
                    names.forEach(function (name, i) {
                        let value = point[name];
                        if (value !== null) {
                            if (series.dataModify) {
                                value = series.dataModify.modifyValue(value);
                            }
                            point[translated[i]] =
                                yAxis.toPixels(value, true);
                        }
                    });
                    // Align the tooltip to the high value to avoid covering the
                    // point
                    point.tooltipPos[1] =
                        point.plotHigh + yAxis.pos - series.chart.plotTop;
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        HLCSeries.defaultOptions = merge(ColumnSeries.defaultOptions, HLCSeriesDefaults);
        extend(HLCSeries.prototype, {
            pointClass: HLCPoint,
            animate: null,
            directTouch: false,
            pointArrayMap: ['high', 'low', 'close'],
            pointAttrToOptions: {
                stroke: 'color',
                'stroke-width': 'lineWidth'
            },
            pointValKey: 'close'
        });
        SeriesRegistry.registerSeriesType('hlc', HLCSeries);
        /* *
         *
         *  Default Export
         *
         * */

        return HLCSeries;
    });
    _registerModule(_modules, 'Series/OHLC/OHLCPoint.js', [_modules['Core/Series/SeriesRegistry.js']], function (SeriesRegistry) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { seriesTypes: { hlc: HLCSeries } } = SeriesRegistry;
        /* *
         *
         *  Class
         *
         * */
        class OHLCPoint extends HLCSeries.prototype.pointClass {
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Extend the parent method by adding up or down to the class name.
             * @private
             * @function Highcharts.seriesTypes.ohlc#getClassName
             */
            getClassName() {
                return super.getClassName.call(this) +
                    (this.open < this.close ?
                        ' highcharts-point-up' :
                        ' highcharts-point-down');
            }
            /**
             * Save upColor as point color (#14826).
             * @private
             * @function Highcharts.seriesTypes.ohlc#resolveUpColor
             */
            resolveUpColor() {
                if (this.open < this.close &&
                    !this.options.color &&
                    this.series.options.upColor) {
                    this.color = this.series.options.upColor;
                }
            }
            /**
             * Extend the parent method by saving upColor.
             * @private
             * @function Highcharts.seriesTypes.ohlc#resolveColor
             */
            resolveColor() {
                super.resolveColor();
                if (!this.series.is('heikinashi')) {
                    this.resolveUpColor();
                }
            }
            /**
             * Extend the parent method by saving upColor.
             * @private
             * @function Highcharts.seriesTypes.ohlc#getZone
             *
             * @return {Highcharts.SeriesZonesOptionsObject}
             *         The zone item.
             */
            getZone() {
                const zone = super.getZone();
                this.resolveUpColor();
                return zone;
            }
            /**
             * Extend the parent method by resolving up/down colors (#15849)
             * @private
             **/
            applyOptions() {
                super.applyOptions.apply(this, arguments);
                if (this.resolveColor) {
                    this.resolveColor();
                }
                return this;
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return OHLCPoint;
    });
    _registerModule(_modules, 'Series/OHLC/OHLCSeriesDefaults.js', [], function () {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        /**
         * An OHLC chart is a style of financial chart used to describe price
         * movements over time. It displays open, high, low and close values per
         * data point.
         *
         * @sample stock/demo/ohlc
         *         OHLC chart
         *
         * @extends      plotOptions.hlc
         * @product      highstock
         * @optionparent plotOptions.ohlc
         */
        const OHLCSeriesDefaults = {
            /**
             * @type      {Highcharts.DataGroupingApproximationValue|Function}
             * @default   ohlc
             * @product   highstock
             * @apioption plotOptions.ohlc.dataGrouping.approximation
             */
            /**
             * Determines which one of  `open`, `high`, `low`, `close` values should
             * be represented as `point.y`, which is later used to set dataLabel
             * position and [compare](#plotOptions.series.compare).
             *
             * @declare    Highcharts.OptionsPointValKeyValue
             * @default    close
             * @validvalue ["open", "high", "low", "close"]
             * @product    highstock
             * @apioption  plotOptions.ohlc.pointValKey
             */
            /**
             * Line color for up points.
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @product   highstock
             * @apioption plotOptions.ohlc.upColor
             */
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
                    '<b> {series.name}</b><br/>' +
                    'Open: {point.open}<br/>' +
                    'High: {point.high}<br/>' +
                    'Low: {point.low}<br/>' +
                    'Close: {point.close}<br/>'
            }
        };
        /**
         * The parameter allows setting line series type and use OHLC indicators.
         * Data in OHLC format is required.
         *
         * @sample {highstock} stock/indicators/use-ohlc-data
         *         Use OHLC data format to plot line chart
         *
         * @type      {boolean}
         * @product   highstock
         * @apioption plotOptions.line.useOhlcData
         */
        /**
         * A `ohlc` series. If the [type](#series.ohlc.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.ohlc
         * @excluding dataParser, dataURL
         * @product   highstock
         * @apioption series.ohlc
         */
        /**
         * An array of data points for the series. For the `ohlc` series type,
         * points can be given in the following ways:
         *
         * 1. An array of arrays with 5 or 4 values. In this case, the values correspond
         *    to `x,open,high,low,close`. If the first value is a string, it is applied
         *    as the name of the point, and the `x` value is inferred. The `x` value can
         *    also be omitted, in which case the inner arrays should be of length 4\.
         *    Then the `x` value is automatically calculated, either starting at 0 and
         *    incremented by 1, or from `pointStart` and `pointInterval` given in the
         *    series options.
         *    ```js
         *    data: [
         *        [0, 6, 5, 6, 7],
         *        [1, 9, 4, 8, 2],
         *        [2, 6, 3, 4, 10]
         *    ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.ohlc.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        open: 3,
         *        high: 4,
         *        low: 5,
         *        close: 2,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        open: 4,
         *        high: 3,
         *        low: 6,
         *        close: 7,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @type      {Array<Array<(number|string),number,number,number>|Array<(number|string),number,number,number,number>|*>}
         * @extends   series.arearange.data
         * @excluding y, marker
         * @product   highstock
         * @apioption series.ohlc.data
         */
        /**
         * The closing value of each data point.
         *
         * @type      {number}
         * @product   highstock
         * @apioption series.ohlc.data.close
         */
        /**
         * The opening value of each data point.
         *
         * @type      {number}
         * @product   highstock
         * @apioption series.ohlc.data.open
         */
        ''; // Adds doclets above to transpiled
        /* *
         *
         *  Default Export
         *
         * */

        return OHLCSeriesDefaults;
    });
    _registerModule(_modules, 'Series/OHLC/OHLCSeries.js', [_modules['Core/Globals.js'], _modules['Series/OHLC/OHLCPoint.js'], _modules['Series/OHLC/OHLCSeriesDefaults.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (H, OHLCPoint, OHLCSeriesDefaults, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { composed } = H;
        const { hlc: HLCSeries } = SeriesRegistry.seriesTypes;
        const { addEvent, extend, merge, pushUnique } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function onSeriesAfterSetOptions(e) {
            const options = e.options, dataGrouping = options.dataGrouping;
            if (dataGrouping &&
                options.useOhlcData &&
                options.id !== 'highcharts-navigator-series') {
                dataGrouping.approximation = 'ohlc';
            }
        }
        /**
         * Add useOhlcData option
         * @private
         */
        function onSeriesInit(eventOptions) {
            // eslint-disable-next-line no-invalid-this
            const series = this, options = eventOptions.options;
            if (options.useOhlcData &&
                options.id !== 'highcharts-navigator-series') {
                extend(series, {
                    pointValKey: OHLCSeries.prototype.pointValKey,
                    // Keys: ohlcProto.keys, // @todo potentially nonsense
                    pointArrayMap: OHLCSeries.prototype.pointArrayMap,
                    toYData: OHLCSeries.prototype.toYData
                });
            }
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * The ohlc series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.ohlc
         *
         * @augments Highcharts.Series
         */
        class OHLCSeries extends HLCSeries {
            /* *
             *
             *  Static Functions
             *
             * */
            static compose(SeriesClass, ..._args) {
                if (pushUnique(composed, 'OHLCSeries')) {
                    addEvent(SeriesClass, 'afterSetOptions', onSeriesAfterSetOptions);
                    addEvent(SeriesClass, 'init', onSeriesInit);
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            getPointPath(point, graphic) {
                const path = super.getPointPath(point, graphic), strokeWidth = graphic.strokeWidth(), crispCorr = (strokeWidth % 2) / 2, crispX = Math.round(point.plotX) - crispCorr, halfWidth = Math.round(point.shapeArgs.width / 2);
                let plotOpen = point.plotOpen;
                // Crisp vector coordinates
                if (point.open !== null) {
                    plotOpen = Math.round(point.plotOpen) + crispCorr;
                    path.push(['M', crispX, plotOpen], ['L', crispX - halfWidth, plotOpen]);
                    super.extendStem(path, strokeWidth / 2, plotOpen);
                }
                return path;
            }
            /**
             * Postprocess mapping between options and SVG attributes
             * @private
             */
            pointAttribs(point, state) {
                const attribs = super.pointAttribs.call(this, point, state), options = this.options;
                delete attribs.fill;
                if (!point.options.color &&
                    options.upColor &&
                    point.open < point.close) {
                    attribs.stroke = options.upColor;
                }
                return attribs;
            }
            toYData(point) {
                // Return a plain array for speedy calculation
                return [point.open, point.high, point.low, point.close];
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        OHLCSeries.defaultOptions = merge(HLCSeries.defaultOptions, OHLCSeriesDefaults);
        extend(OHLCSeries.prototype, {
            pointClass: OHLCPoint,
            pointArrayMap: ['open', 'high', 'low', 'close']
        });
        SeriesRegistry.registerSeriesType('ohlc', OHLCSeries);
        /* *
         *
         *  Default Export
         *
         * */

        return OHLCSeries;
    });
    _registerModule(_modules, 'Series/Candlestick/CandlestickSeriesDefaults.js', [], function () {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        /**
         * A candlestick chart is a style of financial chart used to describe
         * price movements over time.
         *
         * @sample stock/demo/candlestick/
         *         Candlestick chart
         *
         * @extends      plotOptions.ohlc
         * @excluding    borderColor,borderRadius,borderWidth
         * @product      highstock
         * @optionparent plotOptions.candlestick
         */
        const CandlestickSeriesDefaults = {
            /**
             * The specific line color for up candle sticks. The default is to
             * inherit the general `lineColor` setting.
             *
             * @sample {highstock} stock/plotoptions/candlestick-linecolor/
             *         Candlestick line colors
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @since     1.3.6
             * @product   highstock
             * @apioption plotOptions.candlestick.upLineColor
             */
            states: {
                /**
                 * @extends plotOptions.column.states.hover
                 * @product highstock
                 */
                hover: {
                    /**
                     * The pixel width of the line/border around the
                     * candlestick.
                     *
                     * @product highstock
                     */
                    lineWidth: 2
                }
            },
            /**
             * @type    {number|null}
             * @product highstock
             */
            threshold: null,
            /**
             * The color of the line/border of the candlestick.
             *
             * In styled mode, the line stroke can be set with the
             * `.highcharts-candlestick-series .highcahrts-point` rule.
             *
             * @see [upLineColor](#plotOptions.candlestick.upLineColor)
             *
             * @sample {highstock} stock/plotoptions/candlestick-linecolor/
             *         Candlestick line colors
             *
             * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @default #000000
             * @product highstock
             */
            lineColor: "#000000" /* Palette.neutralColor100 */,
            /**
             * The pixel width of the candlestick line/border. Defaults to `1`.
             *
             *
             * In styled mode, the line stroke width can be set with the
             * `.highcharts-candlestick-series .highcahrts-point` rule.
             *
             * @product highstock
             */
            lineWidth: 1,
            /**
             * The fill color of the candlestick when values are rising.
             *
             * In styled mode, the up color can be set with the
             * `.highcharts-candlestick-series .highcharts-point-up` rule.
             *
             * @sample {highstock} stock/plotoptions/candlestick-color/
             *         Custom colors
             * @sample {highstock} highcharts/css/candlestick/
             *         Colors in styled mode
             *
             * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @default #ffffff
             * @product highstock
            */
            upColor: "#ffffff" /* Palette.backgroundColor */,
            /**
             * @product highstock
             */
            stickyTracking: true
        };
        /**
         * A `candlestick` series. If the [type](#series.candlestick.type)
         * option is not specified, it is inherited from [chart.type](
         * #chart.type).
         *
         * @type      {*}
         * @extends   series,plotOptions.candlestick
         * @excluding dataParser, dataURL, marker
         * @product   highstock
         * @apioption series.candlestick
         */
        /**
         * An array of data points for the series. For the `candlestick` series
         * type, points can be given in the following ways:
         *
         * 1. An array of arrays with 5 or 4 values. In this case, the values correspond
         *    to `x,open,high,low,close`. If the first value is a string, it is applied
         *    as the name of the point, and the `x` value is inferred. The `x` value can
         *    also be omitted, in which case the inner arrays should be of length 4.
         *    Then the `x` value is automatically calculated, either starting at 0 and
         *    incremented by 1, or from `pointStart` and `pointInterval` given in the
         *    series options.
         *    ```js
         *    data: [
         *        [0, 7, 2, 0, 4],
         *        [1, 1, 4, 2, 8],
         *        [2, 3, 3, 9, 3]
         *    ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.candlestick.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        open: 9,
         *        high: 2,
         *        low: 4,
         *        close: 6,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        open: 1,
         *        high: 4,
         *        low: 7,
         *        close: 7,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @type      {Array<Array<(number|string),number,number,number>|Array<(number|string),number,number,number,number>|*>}
         * @extends   series.ohlc.data
         * @excluding y
         * @product   highstock
         * @apioption series.candlestick.data
         */
        ''; // Adds doclets above to transpiled
        /* *
         *
         *  Default Export
         *
         * */

        return CandlestickSeriesDefaults;
    });
    _registerModule(_modules, 'Series/Candlestick/CandlestickSeries.js', [_modules['Series/Candlestick/CandlestickSeriesDefaults.js'], _modules['Core/Defaults.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (CandlestickSeriesDefaults, D, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { defaultOptions } = D;
        const { column: ColumnSeries, ohlc: OHLCSeries } = SeriesRegistry.seriesTypes;
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The candlestick series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.candlestick
         *
         * @augments Highcharts.seriesTypes.ohlc
         */
        class CandlestickSeries extends OHLCSeries {
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Postprocess mapping between options and SVG attributes
             *
             * @private
             * @function Highcharts.seriesTypes.candlestick#pointAttribs
             */
            pointAttribs(point, state) {
                const attribs = ColumnSeries.prototype.pointAttribs.call(this, point, state), options = this.options, isUp = point.open < point.close, stroke = options.lineColor || this.color, color = point.color || this.color; // (#14826)
                attribs['stroke-width'] = options.lineWidth;
                attribs.fill = point.options.color ||
                    (isUp ? (options.upColor || color) : color);
                attribs.stroke = point.options.lineColor ||
                    (isUp ? (options.upLineColor || stroke) : stroke);
                // Select or hover states
                if (state) {
                    const stateOptions = options.states[state];
                    attribs.fill = stateOptions.color || attribs.fill;
                    attribs.stroke = stateOptions.lineColor || attribs.stroke;
                    attribs['stroke-width'] =
                        stateOptions.lineWidth || attribs['stroke-width'];
                }
                return attribs;
            }
            /**
             * Draw the data points.
             *
             * @private
             * @function Highcharts.seriesTypes.candlestick#drawPoints
             */
            drawPoints() {
                const series = this, points = series.points, chart = series.chart, reversedYAxis = series.yAxis.reversed;
                for (const point of points) {
                    let graphic = point.graphic, plotOpen, plotClose, topBox, bottomBox, hasTopWhisker, hasBottomWhisker, crispCorr, crispX, path, halfWidth;
                    const isNew = !graphic;
                    if (typeof point.plotY !== 'undefined') {
                        if (!graphic) {
                            point.graphic = graphic = chart.renderer.path()
                                .add(series.group);
                        }
                        if (!series.chart.styledMode) {
                            graphic
                                .attr(series.pointAttribs(point, (point.selected && 'select'))) // #3897
                                .shadow(series.options.shadow);
                        }
                        // Crisp vector coordinates
                        crispCorr = (graphic.strokeWidth() % 2) / 2;
                        // #2596:
                        crispX = Math.round(point.plotX) - crispCorr;
                        plotOpen = point.plotOpen;
                        plotClose = point.plotClose;
                        topBox = Math.min(plotOpen, plotClose);
                        bottomBox = Math.max(plotOpen, plotClose);
                        halfWidth = Math.round(point.shapeArgs.width / 2);
                        hasTopWhisker = reversedYAxis ?
                            bottomBox !== point.yBottom :
                            Math.round(topBox) !==
                                Math.round(point.plotHigh);
                        hasBottomWhisker = reversedYAxis ?
                            Math.round(topBox) !==
                                Math.round(point.plotHigh) :
                            bottomBox !== point.yBottom;
                        topBox = Math.round(topBox) + crispCorr;
                        bottomBox = Math.round(bottomBox) + crispCorr;
                        // Create the path. Due to a bug in Chrome 49, the path is
                        // first instantiated with no values, then the values
                        // pushed. For unknown reasons, instantiating the path array
                        // with all the values would lead to a crash when updating
                        // frequently (#5193).
                        path = [];
                        path.push(['M', crispX - halfWidth, bottomBox], ['L', crispX - halfWidth, topBox], ['L', crispX + halfWidth, topBox], ['L', crispX + halfWidth, bottomBox], ['Z'], // Ensure a nice rectangle #2602
                        ['M', crispX, topBox], [
                            'L',
                            // #460, #2094
                            crispX,
                            hasTopWhisker ?
                                Math.round(reversedYAxis ?
                                    point.yBottom :
                                    point.plotHigh) :
                                topBox
                        ], ['M', crispX, bottomBox], [
                            'L',
                            // #460, #2094
                            crispX,
                            hasBottomWhisker ?
                                Math.round(reversedYAxis ?
                                    point.plotHigh :
                                    point.yBottom) :
                                bottomBox
                        ]);
                        graphic[isNew ? 'attr' : 'animate']({ d: path })
                            .addClass(point.getClassName(), true);
                    }
                }
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        CandlestickSeries.defaultOptions = merge(OHLCSeries.defaultOptions, defaultOptions.plotOptions, { tooltip: OHLCSeries.defaultOptions.tooltip }, CandlestickSeriesDefaults);
        SeriesRegistry.registerSeriesType('candlestick', CandlestickSeries);
        /* *
         *
         *  Default Export
         *
         * */

        return CandlestickSeries;
    });
    _registerModule(_modules, 'Series/Flags/FlagsPoint.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { column: { prototype: { pointClass: ColumnPoint } } } = SeriesRegistry.seriesTypes;
        const { isNumber } = U;
        /* *
         *
         *  Class
         *
         * */
        class FlagsPoint extends ColumnPoint {
            constructor() {
                /* *
                 *
                 *  Properties
                 *
                 * */
                super(...arguments);
                this.ttBelow = false;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * @private
             */
            isValid() {
                // #9233 - Prevent from treating flags as null points (even if
                // they have no y values defined).
                return isNumber(this.y) || typeof this.y === 'undefined';
            }
            /**
             * @private
             */
            hasNewShapeType() {
                const shape = this.options.shape || this.series.options.shape;
                return this.graphic && shape && shape !== this.graphic.symbolKey;
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return FlagsPoint;
    });
    _registerModule(_modules, 'Series/Flags/FlagsSeriesDefaults.js', [], function () {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        /**
         * Flags are used to mark events in stock charts. They can be added on the
         * timeline, or attached to a specific series.
         *
         * @sample stock/demo/flags-general/
         *         Flags on a line series
         *
         * @extends      plotOptions.column
         * @excluding    animation, borderColor, borderWidth,
         *               colorByPoint, cropThreshold, dataGrouping, pointPadding,
         *               pointWidth, turboThreshold
         * @product      highstock
         * @optionparent plotOptions.flags
         */
        const FlagsSeriesDefaults = {
            /**
             * The corner radius of the border surrounding each flag. For `squarepin`
             * shaped flags only. A number signifies pixels. A percentage string, like
             * for example 50%, signifies a relative size.
             */
            borderRadius: 0,
            /**
             * In case the flag is placed on a series, on what point key to place
             * it. Line and columns have one key, `y`. In range or OHLC-type series,
             * however, the flag can optionally be placed on the `open`, `high`,
             * `low` or `close` key.
             *
             * @sample {highstock} stock/plotoptions/flags-onkey/
             *         Range series, flag on high
             *
             * @type       {string}
             * @default    y
             * @since      4.2.2
             * @product    highstock
             * @validvalue ["y", "open", "high", "low", "close"]
             * @apioption  plotOptions.flags.onKey
             */
            /**
             * The id of the series that the flags should be drawn on. If no id
             * is given, the flags are drawn on the x axis.
             *
             * @sample {highstock} stock/plotoptions/flags/
             *         Flags on series and on x axis
             *
             * @type      {string}
             * @product   highstock
             * @apioption plotOptions.flags.onSeries
             */
            pointRange: 0,
            /**
             * Whether the flags are allowed to overlap sideways. If `false`, the
             * flags are moved sideways using an algorithm that seeks to place every
             * flag as close as possible to its original position.
             *
             * @sample {highstock} stock/plotoptions/flags-allowoverlapx
             *         Allow sideways overlap
             *
             * @since 6.0.4
             */
            allowOverlapX: false,
            /**
             * The shape of the marker. Can be one of "flag", "circlepin",
             * "squarepin", or an image of the format `url(/path-to-image.jpg)`.
             * Individual shapes can also be set for each point.
             *
             * @sample {highstock} stock/plotoptions/flags/
             *         Different shapes
             *
             * @type    {Highcharts.FlagsShapeValue}
             * @product highstock
             */
            shape: 'flag',
            /**
             * When multiple flags in the same series fall on the same value, this
             * number determines the vertical offset between them.
             *
             * @sample {highstock} stock/plotoptions/flags-stackdistance/
             *         A greater stack distance
             *
             * @product highstock
             */
            stackDistance: 12,
            /**
             * Text alignment for the text inside the flag.
             *
             * @since      5.0.0
             * @product    highstock
             * @validvalue ["left", "center", "right"]
             */
            textAlign: 'center',
            /**
             * Specific tooltip options for flag series. Flag series tooltips are
             * different from most other types in that a flag doesn't have a data
             * value, so the tooltip rather displays the `text` option for each
             * point.
             *
             * @extends   plotOptions.series.tooltip
             * @excluding changeDecimals, valueDecimals, valuePrefix, valueSuffix
             * @product   highstock
             */
            tooltip: {
                pointFormat: '{point.text}'
            },
            /**
             * @type {number|null}
             */
            threshold: null,
            /**
             * The text to display on each flag. This can be defined on series
             * level, or individually for each point. Defaults to `"A"`.
             *
             * @type      {string}
             * @default   A
             * @product   highstock
             * @apioption plotOptions.flags.title
             */
            /**
             * The y position of the top left corner of the flag relative to either
             * the series (if onSeries is defined), or the x axis. Defaults to
             * `-30`.
             *
             * @product highstock
             */
            y: -30,
            /**
             * Whether to use HTML to render the flag texts. Using HTML allows for
             * advanced formatting, images and reliable bi-directional text
             * rendering. Note that exported images won't respect the HTML, and that
             * HTML won't respect Z-index settings.
             *
             * @type      {boolean}
             * @default   false
             * @since     1.3
             * @product   highstock
             * @apioption plotOptions.flags.useHTML
             */
            /**
             * Fixed width of the flag's shape. By default, width is autocalculated
             * according to the flag's title.
             *
             * @sample {highstock} stock/demo/flags-shapes/
             *         Flags with fixed width
             *
             * @type      {number}
             * @product   highstock
             * @apioption plotOptions.flags.width
             */
            /**
             * Fixed height of the flag's shape. By default, height is
             * autocalculated according to the flag's title.
             *
             * @type      {number}
             * @product   highstock
             * @apioption plotOptions.flags.height
             */
            /**
             * The fill color for the flags.
             *
             * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @product highstock
             */
            fillColor: "#ffffff" /* Palette.backgroundColor */,
            /**
             * The color of the line/border of the flag.
             *
             * In styled mode, the stroke is set in the
             * `.highcharts-flag-series.highcharts-point` rule.
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @default   #000000
             * @product   highstock
             * @apioption plotOptions.flags.lineColor
             */
            /**
             * The pixel width of the flag's line/border.
             *
             * @product highstock
             */
            lineWidth: 1,
            states: {
                /**
                 * @extends plotOptions.column.states.hover
                 * @product highstock
                 */
                hover: {
                    /**
                     * The color of the line/border of the flag.
                     *
                     * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     * @product highstock
                     */
                    lineColor: "#000000" /* Palette.neutralColor100 */,
                    /**
                     * The fill or background color of the flag.
                     *
                     * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     * @product highstock
                     */
                    fillColor: "#ccd3ff" /* Palette.highlightColor20 */
                }
            },
            /**
             * The text styles of the flag.
             *
             * In styled mode, the styles are set in the
             * `.highcharts-flag-series .highcharts-point` rule.
             *
             * @type    {Highcharts.CSSObject}
             * @default {"fontSize": "11px", "fontWeight": "bold"}
             * @product highstock
             */
            style: {
                /** @ignore-option */
                fontSize: '0.7em',
                /** @ignore-option */
                fontWeight: 'bold'
            }
        };
        /**
         * A `flags` series. If the [type](#series.flags.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.flags
         * @excluding animation, borderColor, borderRadius, borderWidth, colorByPoint,
         *            connectNulls, cropThreshold, dashStyle, dataGrouping, dataParser,
         *            dataURL, gapSize, gapUnit, linecap, lineWidth, marker,
         *            pointPadding, pointWidth, step, turboThreshold, useOhlcData
         * @product   highstock
         * @apioption series.flags
         */
        /**
         * An array of data points for the series. For the `flags` series type,
         * points can be given in the following ways:
         *
         * 1. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.flags.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        title: "A",
         *        text: "First event"
         *    }, {
         *        x: 1,
         *        title: "B",
         *        text: "Second event"
         *    }]
         *    ```
         *
         * @type      {Array<*>}
         * @extends   series.line.data
         * @excluding dataLabels, marker, name, y
         * @product   highstock
         * @apioption series.flags.data
         */
        /**
         * The fill color of an individual flag. By default it inherits from
         * the series color.
         *
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @product   highstock
         * @apioption series.flags.data.fillColor
         */
        /**
         * The longer text to be shown in the flag's tooltip.
         *
         * @type      {string}
         * @product   highstock
         * @apioption series.flags.data.text
         */
        /**
         * The short text to be shown on the flag.
         *
         * @type      {string}
         * @product   highstock
         * @apioption series.flags.data.title
         */
        ''; // Keeps doclets above in transpiled file
        /* *
         *
         *  Default Export
         *
         * */

        return FlagsSeriesDefaults;
    });
    _registerModule(_modules, 'Series/Flags/FlagsSymbols.js', [_modules['Core/Renderer/RendererRegistry.js']], function (RendererRegistry) {
        /* *
         *
         *  Imports
         *
         * */
        /* *
         *
         *  Composition
         *
         * */
        var FlagsSymbols;
        (function (FlagsSymbols) {
            /* *
             *
             *  Constants
             *
             * */
            const modifiedMembers = [];
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * @private
             */
            function compose(SVGRendererClass) {
                if (modifiedMembers.indexOf(SVGRendererClass) === -1) {
                    modifiedMembers.push(SVGRendererClass);
                    const symbols = SVGRendererClass.prototype.symbols;
                    symbols.flag = flag;
                    createPinSymbol(symbols, 'circle');
                    createPinSymbol(symbols, 'square');
                }
                const RendererClass = RendererRegistry.getRendererType();
                // The symbol callbacks are generated on the SVGRenderer object in all
                // browsers.
                if (modifiedMembers.indexOf(RendererClass)) {
                    modifiedMembers.push(RendererClass);
                }
            }
            FlagsSymbols.compose = compose;
            /**
             * Create the flag icon with anchor.
             * @private
             */
            function flag(x, y, w, h, options) {
                const anchorX = (options && options.anchorX) || x, anchorY = (options && options.anchorY) || y;
                // To do: unwanted any cast because symbols.circle has wrong type, it
                // actually returns an SVGPathArray
                const path = this.circle(anchorX - 1, anchorY - 1, 2, 2);
                path.push(['M', anchorX, anchorY], ['L', x, y + h], ['L', x, y], ['L', x + w, y], ['L', x + w, y + h], ['L', x, y + h], ['Z']);
                return path;
            }
            /**
             * Create the circlepin and squarepin icons with anchor.
             * @private
             */
            function createPinSymbol(symbols, shape) {
                symbols[(shape + 'pin')] = function (x, y, w, h, options) {
                    const anchorX = options && options.anchorX, anchorY = options && options.anchorY;
                    let path;
                    // For single-letter flags, make sure circular flags are not taller
                    // than their width
                    if (shape === 'circle' && h > w) {
                        x -= Math.round((h - w) / 2);
                        w = h;
                    }
                    path = (symbols[shape])(x, y, w, h, options);
                    if (anchorX && anchorY) {
                        /**
                         * If the label is below the anchor, draw the connecting line
                         * from the top edge of the label, otherwise start drawing from
                         * the bottom edge
                         */
                        let labelX = anchorX;
                        if (shape === 'circle') {
                            labelX = x + w / 2;
                        }
                        else {
                            const startSeg = path[0];
                            const endSeg = path[1];
                            if (startSeg[0] === 'M' && endSeg[0] === 'L') {
                                labelX = (startSeg[1] + endSeg[1]) / 2;
                            }
                        }
                        const labelY = (y > anchorY) ? y : y + h;
                        path.push([
                            'M',
                            labelX,
                            labelY
                        ], [
                            'L',
                            anchorX,
                            anchorY
                        ]);
                        path = path.concat(symbols.circle(anchorX - 1, anchorY - 1, 2, 2));
                    }
                    return path;
                };
            }
        })(FlagsSymbols || (FlagsSymbols = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return FlagsSymbols;
    });
    _registerModule(_modules, 'Series/OnSeriesComposition.js', [_modules['Series/Column/ColumnSeries.js'], _modules['Core/Globals.js'], _modules['Core/Series/Series.js'], _modules['Core/Utilities.js']], function (ColumnSeries, H, Series, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { composed } = H;
        const { prototype: columnProto } = ColumnSeries;
        const { prototype: seriesProto } = Series;
        const { defined, pushUnique, stableSort } = U;
        /* *
         *
         *  Composition
         *
         * */
        var OnSeriesComposition;
        (function (OnSeriesComposition) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
             *
             *  Functions
             *
             * */
            /**
             * @private
             */
            function compose(SeriesClass) {
                if (pushUnique(composed, 'OnSeries')) {
                    const seriesProto = SeriesClass.prototype;
                    seriesProto.getPlotBox = getPlotBox;
                    seriesProto.translate = translate;
                }
                return SeriesClass;
            }
            OnSeriesComposition.compose = compose;
            /**
             * Override getPlotBox. If the onSeries option is valid, return the plot box
             * of the onSeries, otherwise proceed as usual.
             *
             * @private
             */
            function getPlotBox(name) {
                return seriesProto.getPlotBox.call((this.options.onSeries &&
                    this.chart.get(this.options.onSeries)) || this, name);
            }
            OnSeriesComposition.getPlotBox = getPlotBox;
            /**
             * Extend the translate method by placing the point on the related series
             *
             * @private
             */
            function translate() {
                columnProto.translate.apply(this);
                const series = this, options = series.options, chart = series.chart, points = series.points, optionsOnSeries = options.onSeries, onSeries = (optionsOnSeries &&
                    chart.get(optionsOnSeries)), step = onSeries && onSeries.options.step, onData = (onSeries && onSeries.points), inverted = chart.inverted, xAxis = series.xAxis, yAxis = series.yAxis;
                let cursor = points.length - 1, point, lastPoint, onKey = options.onKey || 'y', i = onData && onData.length, xOffset = 0, leftPoint, lastX, rightPoint, currentDataGrouping, distanceRatio;
                // Relate to a master series
                if (onSeries && onSeries.visible && i) {
                    xOffset = (onSeries.pointXOffset || 0) + (onSeries.barW || 0) / 2;
                    currentDataGrouping = onSeries.currentDataGrouping;
                    lastX = (onData[i - 1].x +
                        (currentDataGrouping ? currentDataGrouping.totalRange : 0)); // #2374
                    // sort the data points
                    stableSort(points, (a, b) => (a.x - b.x));
                    onKey = 'plot' + onKey[0].toUpperCase() + onKey.substr(1);
                    while (i-- && points[cursor]) {
                        leftPoint = onData[i];
                        point = points[cursor];
                        point.y = leftPoint.y;
                        if (leftPoint.x <= point.x &&
                            typeof leftPoint[onKey] !== 'undefined') {
                            if (point.x <= lastX) { // #803
                                point.plotY = leftPoint[onKey];
                                // Interpolate between points, #666
                                if (leftPoint.x < point.x &&
                                    !step) {
                                    rightPoint = onData[i + 1];
                                    if (rightPoint &&
                                        typeof rightPoint[onKey] !== 'undefined') {
                                        // If the series is spline, calculate Y of the
                                        // point on the bezier line. #19264
                                        if (defined(point.plotX) &&
                                            onSeries.is('spline')) {
                                            leftPoint = leftPoint;
                                            rightPoint = rightPoint;
                                            const p0 = [
                                                leftPoint.plotX || 0,
                                                leftPoint.plotY || 0
                                            ], p3 = [
                                                rightPoint.plotX || 0,
                                                rightPoint.plotY || 0
                                            ], p1 = (leftPoint.controlPoints?.high ||
                                                p0), p2 = (rightPoint.controlPoints?.low ||
                                                p3), pixelThreshold = 0.25, maxIterations = 100, calculateCoord = (t, key) => (
                                            // The parametric formula for the
                                            // cubic Bezier curve.
                                            Math.pow(1 - t, 3) * p0[key] +
                                                3 * (1 - t) * (1 - t) * t *
                                                    p1[key] + 3 * (1 - t) * t * t *
                                                p2[key] + t * t * t * p3[key]);
                                            let tMin = 0, tMax = 1, t;
                                            // Find `t` of the parametric function of
                                            // the bezier curve for the given `plotX`.
                                            for (let i = 0; i < maxIterations; i++) {
                                                const tMid = (tMin + tMax) / 2;
                                                const xMid = calculateCoord(tMid, 0);
                                                if (xMid === null) {
                                                    break;
                                                }
                                                if (Math.abs(xMid - point.plotX) < pixelThreshold) {
                                                    t = tMid;
                                                    break;
                                                }
                                                if (xMid < point.plotX) {
                                                    tMin = tMid;
                                                }
                                                else {
                                                    tMax = tMid;
                                                }
                                            }
                                            if (defined(t)) {
                                                point.plotY =
                                                    calculateCoord(t, 1);
                                                point.y =
                                                    yAxis.toValue(point.plotY, true);
                                            }
                                        }
                                        else {
                                            // The distance ratio, between 0 and 1
                                            distanceRatio =
                                                (point.x - leftPoint.x) /
                                                    (rightPoint.x - leftPoint.x);
                                            point.plotY +=
                                                distanceRatio *
                                                    // The plotY distance
                                                    (rightPoint[onKey] - leftPoint[onKey]);
                                            point.y +=
                                                distanceRatio *
                                                    (rightPoint.y - leftPoint.y);
                                        }
                                    }
                                }
                            }
                            cursor--;
                            i++; // Check again for points in the same x position
                            if (cursor < 0) {
                                break;
                            }
                        }
                    }
                }
                // Add plotY position and handle stacking
                points.forEach((point, i) => {
                    let stackIndex;
                    point.plotX += xOffset; // #2049
                    // Undefined plotY means the point is either on axis, outside series
                    // range or hidden series. If the series is outside the range of the
                    // x axis it should fall through with an undefined plotY, but then
                    // we must remove the shapeArgs (#847). For inverted charts, we need
                    // to calculate position anyway, because series.invertGroups is not
                    // defined
                    if (typeof point.plotY === 'undefined' || inverted) {
                        if (point.plotX >= 0 &&
                            point.plotX <= xAxis.len) {
                            // We're inside xAxis range
                            if (inverted) {
                                point.plotY = xAxis.translate(point.x, 0, 1, 0, 1);
                                point.plotX = defined(point.y) ?
                                    yAxis.translate(point.y, 0, 0, 0, 1) :
                                    0;
                            }
                            else {
                                point.plotY = (xAxis.opposite ? 0 : series.yAxis.len) +
                                    xAxis.offset; // For the windbarb demo
                            }
                        }
                        else {
                            point.shapeArgs = {}; // 847
                        }
                    }
                    // If multiple flags appear at the same x, order them into a stack
                    lastPoint = points[i - 1];
                    if (lastPoint && lastPoint.plotX === point.plotX) {
                        if (typeof lastPoint.stackIndex === 'undefined') {
                            lastPoint.stackIndex = 0;
                        }
                        stackIndex = lastPoint.stackIndex + 1;
                    }
                    point.stackIndex = stackIndex; // #3639
                });
                this.onSeries = onSeries;
            }
            OnSeriesComposition.translate = translate;
        })(OnSeriesComposition || (OnSeriesComposition = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return OnSeriesComposition;
    });
    _registerModule(_modules, 'Series/Flags/FlagsSeries.js', [_modules['Series/Flags/FlagsPoint.js'], _modules['Series/Flags/FlagsSeriesDefaults.js'], _modules['Series/Flags/FlagsSymbols.js'], _modules['Core/Globals.js'], _modules['Series/OnSeriesComposition.js'], _modules['Core/Renderer/RendererUtilities.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Renderer/SVG/SVGElement.js'], _modules['Core/Utilities.js']], function (FlagsPoint, FlagsSeriesDefaults, FlagsSymbols, H, OnSeriesComposition, R, SeriesRegistry, SVGElement, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { noop } = H;
        const { distribute } = R;
        const { series: Series, seriesTypes: { column: ColumnSeries } } = SeriesRegistry;
        const { addEvent, defined, extend, isNumber, merge, objectEach, wrap } = U;
        /* *
         *
         *  Classes
         *
         * */
        /**
         * The Flags series.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.flags
         *
         * @augments Highcharts.Series
         */
        class FlagsSeries extends ColumnSeries {
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Disable animation, but keep clipping (#8546).
             * @private
             */
            animate(init) {
                if (init) {
                    this.setClip();
                }
            }
            /**
             * Draw the markers.
             * @private
             */
            drawPoints() {
                const series = this, points = series.points, chart = series.chart, renderer = chart.renderer, inverted = chart.inverted, options = series.options, optionsY = options.y, yAxis = series.yAxis, boxesMap = {}, boxes = [], borderRadius = isNumber(options.borderRadius) ?
                    options.borderRadius : 0;
                let plotX, plotY, shape, i, point, graphic, stackIndex, anchorY, attribs, outsideRight, centered;
                i = points.length;
                while (i--) {
                    point = points[i];
                    outsideRight =
                        (inverted ? point.plotY : point.plotX) >
                            series.xAxis.len;
                    plotX = point.plotX;
                    stackIndex = point.stackIndex;
                    shape = point.options.shape || options.shape;
                    plotY = point.plotY;
                    if (typeof plotY !== 'undefined') {
                        plotY = point.plotY + optionsY -
                            (typeof stackIndex !== 'undefined' &&
                                (stackIndex * options.stackDistance));
                    }
                    // Skip connectors for higher level stacked points
                    point.anchorX = stackIndex ? void 0 : point.plotX;
                    anchorY = stackIndex ? void 0 : point.plotY;
                    centered = shape !== 'flag';
                    graphic = point.graphic;
                    // Only draw the point if y is defined and the flag is within
                    // the visible area
                    if (typeof plotY !== 'undefined' &&
                        plotX >= 0 &&
                        !outsideRight) {
                        // #15384
                        if (graphic && point.hasNewShapeType()) {
                            graphic = graphic.destroy();
                        }
                        // Create the flag
                        if (!graphic) {
                            graphic = point.graphic = renderer.label('', 0, void 0, shape, void 0, void 0, options.useHTML)
                                .addClass('highcharts-point')
                                .add(series.markerGroup);
                            // Add reference to the point for tracker (#6303)
                            if (point.graphic.div) {
                                point.graphic.div.point = point;
                            }
                            graphic.isNew = true;
                        }
                        graphic.attr({
                            align: centered ? 'center' : 'left',
                            width: options.width,
                            height: options.height,
                            'text-align': options.textAlign,
                            r: borderRadius
                        });
                        if (!chart.styledMode) {
                            graphic
                                .attr(series.pointAttribs(point))
                                .css(merge(options.style, point.style))
                                .shadow(options.shadow);
                        }
                        if (plotX > 0) { // #3119
                            plotX -= graphic.strokeWidth() % 2; // #4285
                        }
                        // Plant the flag
                        attribs = {
                            y: plotY,
                            anchorY: anchorY
                        };
                        if (options.allowOverlapX) {
                            attribs.x = plotX;
                            attribs.anchorX = point.anchorX;
                        }
                        graphic.attr({
                            text: point.options.title || options.title || 'A'
                        })[graphic.isNew ? 'attr' : 'animate'](attribs);
                        // Rig for the distribute function
                        if (!options.allowOverlapX) {
                            if (!boxesMap[point.plotX]) {
                                boxesMap[point.plotX] = {
                                    align: centered ? 0.5 : 0,
                                    size: graphic.width || 0,
                                    target: plotX,
                                    anchorX: plotX
                                };
                            }
                            else {
                                boxesMap[point.plotX].size = Math.max(boxesMap[point.plotX].size, graphic.width || 0);
                            }
                        }
                        // Set the tooltip anchor position
                        point.tooltipPos = [
                            plotX,
                            plotY + yAxis.pos - chart.plotTop
                        ]; // #6327
                    }
                    else if (graphic) {
                        point.graphic = graphic.destroy();
                    }
                }
                // Handle X-dimension overlapping
                if (!options.allowOverlapX) {
                    let maxDistance = 100;
                    objectEach(boxesMap, function (box) {
                        box.plotX = box.anchorX;
                        boxes.push(box);
                        maxDistance = Math.max(box.size, maxDistance);
                    });
                    // If necessary (for overlapping or long labels)  distribute it
                    // depending on the label width or a hardcoded value, #16041.
                    distribute(boxes, inverted ? yAxis.len : this.xAxis.len, maxDistance);
                    for (const point of points) {
                        const plotX = point.plotX, graphic = point.graphic, box = graphic && boxesMap[plotX];
                        if (box && graphic) {
                            // Hide flag when its box position is not specified
                            // (#8573, #9299)
                            if (!defined(box.pos)) {
                                graphic.hide().isNew = true;
                            }
                            else {
                                graphic[graphic.isNew ? 'attr' : 'animate']({
                                    x: box.pos + (box.align || 0) * box.size,
                                    anchorX: point.anchorX
                                }).show().isNew = false;
                            }
                        }
                    }
                }
                // Can be a mix of SVG and HTML and we need events for both (#6303)
                if (options.useHTML && series.markerGroup) {
                    wrap(series.markerGroup, 'on', function (proceed) {
                        return SVGElement.prototype.on.apply(
                        // For HTML
                        // eslint-disable-next-line no-invalid-this
                        proceed.apply(this, [].slice.call(arguments, 1)), 
                        // And for SVG
                        [].slice.call(arguments, 1));
                    });
                }
            }
            /**
             * Extend the column trackers with listeners to expand and contract
             * stacks.
             * @private
             */
            drawTracker() {
                const series = this, points = series.points;
                super.drawTracker();
                /* *
                * Bring each stacked flag up on mouse over, this allows readability
                * of vertically stacked elements as well as tight points on the x
                * axis. #1924.
                */
                for (const point of points) {
                    const graphic = point.graphic;
                    if (graphic) {
                        if (point.unbindMouseOver) {
                            point.unbindMouseOver();
                        }
                        point.unbindMouseOver = addEvent(graphic.element, 'mouseover', function () {
                            // Raise this point
                            if (point.stackIndex > 0 &&
                                !point.raised) {
                                point._y = graphic.y;
                                graphic.attr({
                                    y: point._y - 8
                                });
                                point.raised = true;
                            }
                            // Revert other raised points
                            for (const otherPoint of points) {
                                if (otherPoint !== point &&
                                    otherPoint.raised &&
                                    otherPoint.graphic) {
                                    otherPoint.graphic.attr({
                                        y: otherPoint._y
                                    });
                                    otherPoint.raised = false;
                                }
                            }
                        });
                    }
                }
            }
            /**
             * Get presentational attributes
             * @private
             */
            pointAttribs(point, state) {
                const options = this.options, color = (point && point.color) || this.color;
                let lineColor = options.lineColor, lineWidth = (point && point.lineWidth), fill = (point && point.fillColor) || options.fillColor;
                if (state) {
                    fill = options.states[state].fillColor;
                    lineColor = options.states[state].lineColor;
                    lineWidth = options.states[state].lineWidth;
                }
                return {
                    fill: fill || color,
                    stroke: lineColor || color,
                    'stroke-width': lineWidth || options.lineWidth || 0
                };
            }
            /**
             * @private
             */
            setClip() {
                Series.prototype.setClip.apply(this, arguments);
                if (this.options.clip !== false &&
                    this.sharedClipKey &&
                    this.markerGroup) {
                    this.markerGroup.clip(this.chart.sharedClips[this.sharedClipKey]);
                }
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        FlagsSeries.compose = FlagsSymbols.compose;
        FlagsSeries.defaultOptions = merge(ColumnSeries.defaultOptions, FlagsSeriesDefaults);
        OnSeriesComposition.compose(FlagsSeries);
        extend(FlagsSeries.prototype, {
            allowDG: false,
            forceCrop: true,
            invertible: false,
            noSharedTooltip: true,
            pointClass: FlagsPoint,
            sorted: false,
            takeOrdinalPosition: false,
            trackerGroups: ['markerGroup'],
            buildKDTree: noop,
            /**
             * Inherit the initialization from base Series.
             * @private
             */
            init: Series.prototype.init
        });
        SeriesRegistry.registerSeriesType('flags', FlagsSeries);
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * @typedef {"circlepin"|"flag"|"squarepin"} Highcharts.FlagsShapeValue
         */
        ''; // Detach doclets above

        return FlagsSeries;
    });
    _registerModule(_modules, 'Core/Axis/BrokenAxis.js', [_modules['Core/Axis/Stacking/StackItem.js'], _modules['Core/Utilities.js']], function (StackItem, U) {
        /* *
         *
         *  (c) 2009-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { addEvent, find, fireEvent, isArray, isNumber, pick } = U;
        /* *
         *
         *  Composition
         *
         * */
        /**
         * Axis with support of broken data rows.
         * @private
         */
        var BrokenAxis;
        (function (BrokenAxis) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Adds support for broken axes.
             * @private
             */
            function compose(AxisClass, SeriesClass) {
                if (!AxisClass.keepProps.includes('brokenAxis')) {
                    AxisClass.keepProps.push('brokenAxis');
                    addEvent(AxisClass, 'init', onAxisInit);
                    addEvent(AxisClass, 'afterInit', onAxisAfterInit);
                    addEvent(AxisClass, 'afterSetTickPositions', onAxisAfterSetTickPositions);
                    addEvent(AxisClass, 'afterSetOptions', onAxisAfterSetOptions);
                    const seriesProto = SeriesClass.prototype;
                    seriesProto.drawBreaks = seriesDrawBreaks;
                    seriesProto.gappedPath = seriesGappedPath;
                    addEvent(SeriesClass, 'afterGeneratePoints', onSeriesAfterGeneratePoints);
                    addEvent(SeriesClass, 'afterRender', onSeriesAfterRender);
                }
                return AxisClass;
            }
            BrokenAxis.compose = compose;
            /**
             * @private
             */
            function onAxisAfterInit() {
                if (typeof this.brokenAxis !== 'undefined') {
                    this.brokenAxis.setBreaks(this.options.breaks, false);
                }
            }
            /**
             * Force Axis to be not-ordinal when breaks are defined.
             * @private
             */
            function onAxisAfterSetOptions() {
                const axis = this;
                if (axis.brokenAxis?.hasBreaks) {
                    axis.options.ordinal = false;
                }
            }
            /**
             * @private
             */
            function onAxisAfterSetTickPositions() {
                const axis = this, brokenAxis = axis.brokenAxis;
                if (brokenAxis?.hasBreaks) {
                    const tickPositions = axis.tickPositions, info = axis.tickPositions.info, newPositions = [];
                    for (let i = 0; i < tickPositions.length; i++) {
                        if (!brokenAxis.isInAnyBreak(tickPositions[i])) {
                            newPositions.push(tickPositions[i]);
                        }
                    }
                    axis.tickPositions = newPositions;
                    axis.tickPositions.info = info;
                }
            }
            /**
             * @private
             */
            function onAxisInit() {
                const axis = this;
                if (!axis.brokenAxis) {
                    axis.brokenAxis = new Additions(axis);
                }
            }
            /**
             * @private
             */
            function onSeriesAfterGeneratePoints() {
                const { isDirty, options: { connectNulls }, points, xAxis, yAxis } = this;
                // Set, or reset visibility of the points. Axis.setBreaks marks
                // the series as isDirty
                if (isDirty) {
                    let i = points.length;
                    while (i--) {
                        const point = points[i];
                        // Respect nulls inside the break (#4275)
                        const nullGap = point.y === null && connectNulls === false;
                        const isPointInBreak = (!nullGap && (xAxis?.brokenAxis?.isInAnyBreak(point.x, true) ||
                            yAxis?.brokenAxis?.isInAnyBreak(point.y, true)));
                        // Set point.visible if in any break.
                        // If not in break, reset visible to original value.
                        point.visible = isPointInBreak ?
                            false :
                            point.options.visible !== false;
                    }
                }
            }
            /**
             * @private
             */
            function onSeriesAfterRender() {
                this.drawBreaks(this.xAxis, ['x']);
                this.drawBreaks(this.yAxis, pick(this.pointArrayMap, ['y']));
            }
            /**
             * @private
             */
            function seriesDrawBreaks(axis, keys) {
                const series = this, points = series.points;
                let breaks, threshold, y;
                if (axis?.brokenAxis?.hasBreaks) {
                    const brokenAxis = axis.brokenAxis;
                    keys.forEach(function (key) {
                        breaks = brokenAxis?.breakArray || [];
                        threshold = axis.isXAxis ?
                            axis.min :
                            pick(series.options.threshold, axis.min);
                        // Array of breaks that have been "zoomed-out" which means that
                        // they were shown previously, but now after zoom, they are not
                        // (#19885).
                        const breaksOutOfRange = axis?.options?.breaks?.filter(function (brk) {
                            let isOut = true;
                            // Iterate to see if "brk" is in axis range
                            for (let i = 0; i < breaks.length; i++) {
                                const otherBreak = breaks[i];
                                if (otherBreak.from === brk.from &&
                                    otherBreak.to === brk.to) {
                                    isOut = false;
                                    break;
                                }
                            }
                            return isOut;
                        });
                        points.forEach(function (point) {
                            y = pick(point['stack' + key.toUpperCase()], point[key]);
                            breaks.forEach(function (brk) {
                                if (isNumber(threshold) && isNumber(y)) {
                                    let eventName = '';
                                    if ((threshold < brk.from && y > brk.to) ||
                                        (threshold > brk.from && y < brk.from)) {
                                        eventName = 'pointBreak';
                                    }
                                    else if ((threshold < brk.from &&
                                        y > brk.from &&
                                        y < brk.to) || (threshold > brk.from &&
                                        y > brk.to &&
                                        y < brk.from)) {
                                        eventName = 'pointInBreak';
                                    }
                                    if (eventName) {
                                        fireEvent(axis, eventName, { point, brk });
                                    }
                                }
                            });
                            breaksOutOfRange?.forEach(function (brk) {
                                fireEvent(axis, 'pointOutsideOfBreak', { point, brk });
                            });
                        });
                    });
                }
            }
            /**
             * Extend getGraphPath by identifying gaps in the data so that we
             * can draw a gap in the line or area. This was moved from ordinal
             * axis module to broken axis module as of #5045.
             *
             * @private
             * @function Highcharts.Series#gappedPath
             *
             * @return {Highcharts.SVGPathArray}
             * Gapped path
             */
            function seriesGappedPath() {
                const currentDataGrouping = this.currentDataGrouping, groupingSize = currentDataGrouping?.gapSize, points = this.points.slice(), yAxis = this.yAxis;
                let gapSize = this.options.gapSize, i = points.length - 1, stack;
                /**
                 * Defines when to display a gap in the graph, together with the
                 * [gapUnit](plotOptions.series.gapUnit) option.
                 *
                 * In case when `dataGrouping` is enabled, points can be grouped
                 * into a larger time span. This can make the grouped points to
                 * have a greater distance than the absolute value of `gapSize`
                 * property, which will result in disappearing graph completely.
                 * To prevent this situation the mentioned distance between
                 * grouped points is used instead of previously defined
                 * `gapSize`.
                 *
                 * In practice, this option is most often used to visualize gaps
                 * in time series. In a stock chart, intraday data is available
                 * for daytime hours, while gaps will appear in nights and
                 * weekends.
                 *
                 * @see [gapUnit](plotOptions.series.gapUnit)
                 * @see [xAxis.breaks](#xAxis.breaks)
                 *
                 * @sample {highstock} stock/plotoptions/series-gapsize/
                 * Setting the gap size to 2 introduces gaps for weekends in
                 * daily datasets.
                 *
                 * @type      {number}
                 * @default   0
                 * @product   highstock
                 * @requires  modules/broken-axis
                 * @apioption plotOptions.series.gapSize
                 */
                /**
                 * Together with [gapSize](plotOptions.series.gapSize), this
                 * option defines where to draw gaps in the graph.
                 *
                 * When the `gapUnit` is `"relative"` (default), a gap size of 5
                 * means that if the distance between two points is greater than
                 * 5 times that of the two closest points, the graph will be
                 * broken.
                 *
                 * When the `gapUnit` is `"value"`, the gap is based on absolute
                 * axis values, which on a datetime axis is milliseconds. This
                 * also applies to the navigator series that inherits gap
                 * options from the base series.
                 *
                 * @see [gapSize](plotOptions.series.gapSize)
                 *
                 * @type       {string}
                 * @default    relative
                 * @since      5.0.13
                 * @product    highstock
                 * @validvalue ["relative", "value"]
                 * @requires   modules/broken-axis
                 * @apioption  plotOptions.series.gapUnit
                 */
                if (gapSize && i > 0) { // #5008
                    // Gap unit is relative
                    if (this.options.gapUnit !== 'value') {
                        gapSize *= this.basePointRange;
                    }
                    // Setting a new gapSize in case dataGrouping is enabled
                    // (#7686)
                    if (groupingSize &&
                        groupingSize > gapSize &&
                        // Except when DG is forced (e.g. from other series)
                        // and has lower granularity than actual points (#11351)
                        groupingSize >= this.basePointRange) {
                        gapSize = groupingSize;
                    }
                    // Extension for ordinal breaks
                    let current, next;
                    while (i--) {
                        // Reassign next if it is not visible
                        if (!(next && next.visible !== false)) {
                            next = points[i + 1];
                        }
                        current = points[i];
                        // Skip iteration if one of the points is not visible
                        if (next.visible === false || current.visible === false) {
                            continue;
                        }
                        if (next.x - current.x > gapSize) {
                            const xRange = (current.x + next.x) / 2;
                            points.splice(// Insert after this one
                            i + 1, 0, {
                                isNull: true,
                                x: xRange
                            });
                            // For stacked chart generate empty stack items, #6546
                            if (yAxis.stacking && this.options.stacking) {
                                stack = yAxis.stacking.stacks[this.stackKey][xRange] = new StackItem(yAxis, yAxis.options.stackLabels, false, xRange, this.stack);
                                stack.total = 0;
                            }
                        }
                        // Assign current to next for the upcoming iteration
                        next = current;
                    }
                }
                // Call base method
                return this.getGraphPath(points);
            }
            /* *
             *
             *  Class
             *
             * */
            /**
             * Provides support for broken axes.
             * @private
             * @class
             */
            class Additions {
                /* *
                 *
                 *  Static Functions
                 *
                 * */
                /**
                 * @private
                 */
                static isInBreak(brk, val) {
                    const repeat = brk.repeat || Infinity, from = brk.from, length = brk.to - brk.from, test = (val >= from ?
                        (val - from) % repeat :
                        repeat - ((from - val) % repeat));
                    let ret;
                    if (!brk.inclusive) {
                        ret = test < length && test !== 0;
                    }
                    else {
                        ret = test <= length;
                    }
                    return ret;
                }
                /**
                 * @private
                 */
                static lin2Val(val) {
                    const axis = this;
                    const brokenAxis = axis.brokenAxis;
                    const breakArray = brokenAxis && brokenAxis.breakArray;
                    if (!breakArray || !isNumber(val)) {
                        return val;
                    }
                    let nval = val, brk, i;
                    for (i = 0; i < breakArray.length; i++) {
                        brk = breakArray[i];
                        if (brk.from >= nval) {
                            break;
                        }
                        else if (brk.to < nval) {
                            nval += brk.len;
                        }
                        else if (Additions.isInBreak(brk, nval)) {
                            nval += brk.len;
                        }
                    }
                    return nval;
                }
                /**
                 * @private
                 */
                static val2Lin(val) {
                    const axis = this;
                    const brokenAxis = axis.brokenAxis;
                    const breakArray = brokenAxis && brokenAxis.breakArray;
                    if (!breakArray || !isNumber(val)) {
                        return val;
                    }
                    let nval = val, brk, i;
                    for (i = 0; i < breakArray.length; i++) {
                        brk = breakArray[i];
                        if (brk.to <= val) {
                            nval -= brk.len;
                        }
                        else if (brk.from >= val) {
                            break;
                        }
                        else if (Additions.isInBreak(brk, val)) {
                            nval -= (val - brk.from);
                            break;
                        }
                    }
                    return nval;
                }
                /* *
                 *
                 *  Constructors
                 *
                 * */
                constructor(axis) {
                    this.hasBreaks = false;
                    this.axis = axis;
                }
                /* *
                 *
                 *  Functions
                 *
                 * */
                /**
                 * Returns the first break found where the x is larger then break.from
                 * and smaller then break.to.
                 *
                 * @param {number} x
                 * The number which should be within a break.
                 *
                 * @param {Array<Highcharts.XAxisBreaksOptions>} breaks
                 * The array of breaks to search within.
                 *
                 * @return {Highcharts.XAxisBreaksOptions|undefined}
                 * Returns the first break found that matches, returns false if no break
                 * is found.
                 */
                findBreakAt(x, breaks) {
                    return find(breaks, function (b) {
                        return b.from < x && x < b.to;
                    });
                }
                /**
                 * @private
                 */
                isInAnyBreak(val, testKeep) {
                    const brokenAxis = this, axis = brokenAxis.axis, breaks = axis.options.breaks || [];
                    let i = breaks.length, inbrk, keep, ret;
                    if (i && isNumber(val)) {
                        while (i--) {
                            if (Additions.isInBreak(breaks[i], val)) {
                                inbrk = true;
                                if (!keep) {
                                    keep = pick(breaks[i].showPoints, !axis.isXAxis);
                                }
                            }
                        }
                        if (inbrk && testKeep) {
                            ret = inbrk && !keep;
                        }
                        else {
                            ret = inbrk;
                        }
                    }
                    return ret;
                }
                /**
                 * Dynamically set or unset breaks in an axis. This function in lighter
                 * than using Axis.update, and it also preserves animation.
                 *
                 * @private
                 * @function Highcharts.Axis#setBreaks
                 *
                 * @param {Array<Highcharts.XAxisBreaksOptions>} [breaks]
                 * The breaks to add. When `undefined` it removes existing breaks.
                 *
                 * @param {boolean} [redraw=true]
                 * Whether to redraw the chart immediately.
                 */
                setBreaks(breaks, redraw) {
                    const brokenAxis = this;
                    const axis = brokenAxis.axis;
                    const hasBreaks = isArray(breaks) &&
                        !!breaks.length &&
                        !!Object.keys(breaks[0]).length; // Check for [{}], #16368.
                    axis.isDirty = brokenAxis.hasBreaks !== hasBreaks;
                    brokenAxis.hasBreaks = hasBreaks;
                    if (breaks !== axis.options.breaks) {
                        axis.options.breaks = axis.userOptions.breaks = breaks;
                    }
                    axis.forceRedraw = true; // Force recalculation in setScale
                    // Recalculate series related to the axis.
                    axis.series.forEach(function (series) {
                        series.isDirty = true;
                    });
                    if (!hasBreaks && axis.val2lin === Additions.val2Lin) {
                        // Revert to prototype functions
                        delete axis.val2lin;
                        delete axis.lin2val;
                    }
                    if (hasBreaks) {
                        axis.userOptions.ordinal = false;
                        axis.lin2val = Additions.lin2Val;
                        axis.val2lin = Additions.val2Lin;
                        axis.setExtremes = function (newMin, newMax, redraw, animation, eventArguments) {
                            // If trying to set extremes inside a break, extend min to
                            // after, and max to before the break ( #3857 )
                            if (brokenAxis.hasBreaks) {
                                const breaks = (this.options.breaks || []);
                                let axisBreak;
                                while ((axisBreak = brokenAxis.findBreakAt(newMin, breaks))) {
                                    newMin = axisBreak.to;
                                }
                                while ((axisBreak = brokenAxis.findBreakAt(newMax, breaks))) {
                                    newMax = axisBreak.from;
                                }
                                // If both min and max is within the same break.
                                if (newMax < newMin) {
                                    newMax = newMin;
                                }
                            }
                            axis.constructor.prototype.setExtremes.call(this, newMin, newMax, redraw, animation, eventArguments);
                        };
                        axis.setAxisTranslation = function () {
                            axis.constructor.prototype.setAxisTranslation.call(this);
                            brokenAxis.unitLength = void 0;
                            if (brokenAxis.hasBreaks) {
                                const breaks = axis.options.breaks || [], 
                                // Temporary one:
                                breakArrayT = [], breakArray = [], pointRangePadding = pick(axis.pointRangePadding, 0);
                                let length = 0, inBrk, repeat, min = axis.userMin || axis.min, max = axis.userMax || axis.max, start, i;
                                // Min & max check (#4247)
                                breaks.forEach(function (brk) {
                                    repeat = brk.repeat || Infinity;
                                    if (isNumber(min) && isNumber(max)) {
                                        if (Additions.isInBreak(brk, min)) {
                                            min += ((brk.to % repeat) -
                                                (min % repeat));
                                        }
                                        if (Additions.isInBreak(brk, max)) {
                                            max -= ((max % repeat) -
                                                (brk.from % repeat));
                                        }
                                    }
                                });
                                // Construct an array holding all breaks in the axis
                                breaks.forEach(function (brk) {
                                    start = brk.from;
                                    repeat = brk.repeat || Infinity;
                                    if (isNumber(min) && isNumber(max)) {
                                        while (start - repeat > min) {
                                            start -= repeat;
                                        }
                                        while (start < min) {
                                            start += repeat;
                                        }
                                        for (i = start; i < max; i += repeat) {
                                            breakArrayT.push({
                                                value: i,
                                                move: 'in'
                                            });
                                            breakArrayT.push({
                                                value: i + brk.to - brk.from,
                                                move: 'out',
                                                size: brk.breakSize
                                            });
                                        }
                                    }
                                });
                                breakArrayT.sort(function (a, b) {
                                    return ((a.value === b.value) ?
                                        ((a.move === 'in' ? 0 : 1) -
                                            (b.move === 'in' ? 0 : 1)) :
                                        a.value - b.value);
                                });
                                // Simplify the breaks
                                inBrk = 0;
                                start = min;
                                breakArrayT.forEach(function (brk) {
                                    inBrk += (brk.move === 'in' ? 1 : -1);
                                    if (inBrk === 1 && brk.move === 'in') {
                                        start = brk.value;
                                    }
                                    if (inBrk === 0 && isNumber(start)) {
                                        breakArray.push({
                                            from: start,
                                            to: brk.value,
                                            len: brk.value - start - (brk.size || 0)
                                        });
                                        length += (brk.value -
                                            start -
                                            (brk.size || 0));
                                    }
                                });
                                brokenAxis.breakArray = breakArray;
                                // Used with staticScale, and below the actual axis
                                // length, when breaks are subtracted.
                                if (isNumber(min) &&
                                    isNumber(max) &&
                                    isNumber(axis.min)) {
                                    brokenAxis.unitLength = max - min - length +
                                        pointRangePadding;
                                    fireEvent(axis, 'afterBreaks');
                                    if (axis.staticScale) {
                                        axis.transA = axis.staticScale;
                                    }
                                    else if (brokenAxis.unitLength) {
                                        axis.transA *=
                                            (max - axis.min + pointRangePadding) /
                                                brokenAxis.unitLength;
                                    }
                                    if (pointRangePadding) {
                                        axis.minPixelPadding =
                                            axis.transA * (axis.minPointOffset || 0);
                                    }
                                    axis.min = min;
                                    axis.max = max;
                                }
                            }
                        };
                    }
                    if (pick(redraw, true)) {
                        axis.chart.redraw();
                    }
                }
            }
            BrokenAxis.Additions = Additions;
        })(BrokenAxis || (BrokenAxis = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return BrokenAxis;
    });
    _registerModule(_modules, 'masters/modules/broken-axis.src.js', [_modules['Core/Globals.js'], _modules['Core/Axis/BrokenAxis.js']], function (Highcharts, BrokenAxis) {

        const G = Highcharts;
        G.BrokenAxis = G.BrokenAxis || BrokenAxis;
        G.BrokenAxis.compose(G.Axis, G.Series);

        return Highcharts;
    });
    _registerModule(_modules, 'Extensions/DataGrouping/ApproximationRegistry.js', [], function () {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Constants
         *
         * */
        /**
         * Define the available approximation types. The data grouping
         * approximations takes an array or numbers as the first parameter. In case
         * of ohlc, four arrays are sent in as four parameters. Each array consists
         * only of numbers. In case null values belong to the group, the property
         * .hasNulls will be set to true on the array.
         *
         * @product highstock
         *
         * @private
         */
        const ApproximationRegistry = {
        // Approximations added programmatically
        };
        /* *
         *
         *  Default Export
         *
         * */

        return ApproximationRegistry;
    });
    _registerModule(_modules, 'Extensions/DataGrouping/ApproximationDefaults.js', [_modules['Extensions/DataGrouping/ApproximationRegistry.js'], _modules['Core/Utilities.js']], function (ApproximationRegistry, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { arrayMax, arrayMin, correctFloat, extend, isNumber } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function average(arr) {
            const len = arr.length;
            let ret = sum(arr);
            // If we have a number, return it divided by the length. If not,
            // return null or undefined based on what the sum method finds.
            if (isNumber(ret) && len) {
                ret = correctFloat(ret / len);
            }
            return ret;
        }
        /**
         * The same as average, but for series with multiple values, like area ranges.
         * @private
         */
        function averages() {
            const ret = [];
            [].forEach.call(arguments, function (arr) {
                ret.push(average(arr));
            });
            // Return undefined when first elem. is undefined and let
            // sum method handle null (#7377)
            return typeof ret[0] === 'undefined' ? void 0 : ret;
        }
        /**
         * @private
         */
        function close(arr) {
            return arr.length ?
                arr[arr.length - 1] :
                (arr.hasNulls ? null : void 0);
        }
        /**
         * @private
         */
        function high(arr) {
            return arr.length ?
                arrayMax(arr) :
                (arr.hasNulls ? null : void 0);
        }
        /**
         * HLC, OHLC and range are special cases where a multidimensional array is input
         * and an array is output.
         * @private
         */
        function hlc(high, low, close) {
            high = ApproximationRegistry.high(high);
            low = ApproximationRegistry.low(low);
            close = ApproximationRegistry.close(close);
            if (isNumber(high) ||
                isNumber(low) ||
                isNumber(close)) {
                return [high, low, close];
            }
        }
        /**
         * @private
         */
        function low(arr) {
            return arr.length ?
                arrayMin(arr) :
                (arr.hasNulls ? null : void 0);
        }
        /**
         * @private
         */
        function ohlc(open, high, low, close) {
            open = ApproximationRegistry.open(open);
            high = ApproximationRegistry.high(high);
            low = ApproximationRegistry.low(low);
            close = ApproximationRegistry.close(close);
            if (isNumber(open) ||
                isNumber(high) ||
                isNumber(low) ||
                isNumber(close)) {
                return [open, high, low, close];
            }
        }
        /**
         * @private
         */
        function open(arr) {
            return arr.length ? arr[0] : (arr.hasNulls ? null : void 0);
        }
        /**
         * @private
         */
        function range(low, high) {
            low = ApproximationRegistry.low(low);
            high = ApproximationRegistry.high(high);
            if (isNumber(low) || isNumber(high)) {
                return [low, high];
            }
            if (low === null && high === null) {
                return null;
            }
            // Else, return is undefined
        }
        /**
         * @private
         */
        function sum(arr) {
            let len = arr.length, ret;
            // 1. it consists of nulls exclusive
            if (!len && arr.hasNulls) {
                ret = null;
                // 2. it has a length and real values
            }
            else if (len) {
                ret = 0;
                while (len--) {
                    ret += arr[len];
                }
            }
            // 3. it has zero length, so just return undefined
            // => doNothing()
            return ret;
        }
        /* *
         *
         *  Default Export
         *
         * */
        const ApproximationDefaults = {
            average,
            averages,
            close,
            high,
            hlc,
            low,
            ohlc,
            open,
            range,
            sum
        };
        extend(ApproximationRegistry, ApproximationDefaults);

        return ApproximationDefaults;
    });
    _registerModule(_modules, 'Extensions/DataGrouping/DataGroupingDefaults.js', [], function () {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Constants
         *
         * */
        /**
         * Common options
         * @private
         */
        const common = {
            /// enabled: null, // (true for stock charts, false for basic),
            // forced: undefined,
            groupPixelWidth: 2,
            // The first one is the point or start value, the second is the start
            // value if we're dealing with range, the third one is the end value if
            // dealing with a range
            dateTimeLabelFormats: {
                millisecond: [
                    '%A, %e %b, %H:%M:%S.%L',
                    '%A, %e %b, %H:%M:%S.%L',
                    '-%H:%M:%S.%L'
                ],
                second: [
                    '%A, %e %b, %H:%M:%S',
                    '%A, %e %b, %H:%M:%S',
                    '-%H:%M:%S'
                ],
                minute: [
                    '%A, %e %b, %H:%M',
                    '%A, %e %b, %H:%M',
                    '-%H:%M'
                ],
                hour: [
                    '%A, %e %b, %H:%M',
                    '%A, %e %b, %H:%M',
                    '-%H:%M'
                ],
                day: [
                    '%A, %e %b %Y',
                    '%A, %e %b',
                    '-%A, %e %b %Y'
                ],
                week: [
                    'Week from %A, %e %b %Y',
                    '%A, %e %b',
                    '-%A, %e %b %Y'
                ],
                month: [
                    '%B %Y',
                    '%B',
                    '-%B %Y'
                ],
                year: [
                    '%Y',
                    '%Y',
                    '-%Y'
                ]
            }
            /// smoothed = false, // enable this for navigator series only
        };
        /**
         * Extends common options
         * @private
         */
        const seriesSpecific = {
            line: {},
            spline: {},
            area: {},
            areaspline: {},
            arearange: {},
            column: {
                groupPixelWidth: 10
            },
            columnrange: {
                groupPixelWidth: 10
            },
            candlestick: {
                groupPixelWidth: 10
            },
            ohlc: {
                groupPixelWidth: 5
            },
            hlc: {
                groupPixelWidth: 5
                // Move to HeikinAshiSeries.ts after refactoring data grouping.
            },
            heikinashi: {
                groupPixelWidth: 10
            }
        };
        /**
         * Units are defined in a separate array to allow complete overriding in
         * case of a user option.
         * @private
         */
        const units = [
            [
                'millisecond',
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // Allowed multiples
            ], [
                'second',
                [1, 2, 5, 10, 15, 30]
            ], [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ], [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ], [
                'day',
                [1]
            ], [
                'week',
                [1]
            ], [
                'month',
                [1, 3, 6]
            ], [
                'year',
                null
            ]
        ];
        /* *
         *
         *  Default Export
         *
         * */
        const DataGroupingDefaults = {
            common,
            seriesSpecific,
            units
        };

        return DataGroupingDefaults;
    });
    _registerModule(_modules, 'Extensions/DataGrouping/DataGroupingAxisComposition.js', [_modules['Extensions/DataGrouping/DataGroupingDefaults.js'], _modules['Core/Utilities.js']], function (DataGroupingDefaults, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { addEvent, extend, merge, pick } = U;
        /* *
         *
         *  Variables
         *
         * */
        let AxisConstructor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Check the groupPixelWidth and apply the grouping if needed.
         * Fired only after processing the data.
         *
         * @product highstock
         *
         * @function Highcharts.Axis#applyGrouping
         */
        function applyGrouping(e) {
            const axis = this, series = axis.series;
            // Reset the groupPixelWidth for all series, #17141.
            series.forEach(function (series) {
                series.groupPixelWidth = void 0; // #2110
            });
            series.forEach(function (series) {
                series.groupPixelWidth = (axis.getGroupPixelWidth &&
                    axis.getGroupPixelWidth());
                if (series.groupPixelWidth) {
                    series.hasProcessed = true; // #2692
                }
                // Fire independing on series.groupPixelWidth to always set a proper
                // dataGrouping state, (#16238)
                series.applyGrouping(!!e.hasExtremesChanged);
            });
        }
        /**
         * @private
         */
        function compose(AxisClass) {
            AxisConstructor = AxisClass;
            const axisProto = AxisClass.prototype;
            if (!axisProto.applyGrouping) {
                addEvent(AxisClass, 'afterSetScale', onAfterSetScale);
                // When all series are processed, calculate the group pixel width and
                // then if this value is different than zero apply groupings.
                addEvent(AxisClass, 'postProcessData', applyGrouping);
                extend(axisProto, {
                    applyGrouping,
                    getGroupPixelWidth,
                    setDataGrouping
                });
            }
        }
        /**
         * Get the data grouping pixel width based on the greatest defined individual
         * width of the axis' series, and if whether one of the axes need grouping.
         * @private
         */
        function getGroupPixelWidth() {
            const series = this.series;
            let i = series.length, groupPixelWidth = 0, doGrouping = false, dataLength, dgOptions;
            // If one of the series needs grouping, apply it to all (#1634)
            while (i--) {
                dgOptions = series[i].options.dataGrouping;
                if (dgOptions) { // #2692
                    // If multiple series are compared on the same x axis, give them the
                    // same group pixel width (#334)
                    groupPixelWidth = Math.max(groupPixelWidth, 
                    // Fallback to commonOptions (#9693)
                    pick(dgOptions.groupPixelWidth, DataGroupingDefaults.common.groupPixelWidth));
                    dataLength = (series[i].processedXData || series[i].data).length;
                    // Execute grouping if the amount of points is greater than the
                    // limit defined in groupPixelWidth
                    if (series[i].groupPixelWidth ||
                        (dataLength >
                            (this.chart.plotSizeX / groupPixelWidth)) ||
                        (dataLength && dgOptions.forced)) {
                        doGrouping = true;
                    }
                }
            }
            return doGrouping ? groupPixelWidth : 0;
        }
        /**
         * When resetting the scale reset the hasProcessed flag to avoid taking
         * previous data grouping of neighbour series into account when determining
         * group pixel width (#2692).
         * @private
         */
        function onAfterSetScale() {
            this.series.forEach(function (series) {
                series.hasProcessed = false;
            });
        }
        /**
         * Highcharts Stock only. Force data grouping on all the axis' series.
         *
         * @product highstock
         *
         * @function Highcharts.Axis#setDataGrouping
         *
         * @param {boolean|Highcharts.DataGroupingOptionsObject} [dataGrouping]
         *        A `dataGrouping` configuration. Use `false` to disable data grouping
         *        dynamically.
         *
         * @param {boolean} [redraw=true]
         *        Whether to redraw the chart or wait for a later call to
         *        {@link Chart#redraw}.
         */
        function setDataGrouping(dataGrouping, redraw) {
            const axis = this;
            let i;
            redraw = pick(redraw, true);
            if (!dataGrouping) {
                dataGrouping = {
                    forced: false,
                    units: null
                };
            }
            // Axis is instantiated, update all series
            if (this instanceof AxisConstructor) {
                i = this.series.length;
                while (i--) {
                    this.series[i].update({
                        dataGrouping: dataGrouping
                    }, false);
                }
                // Axis not yet instantiated, alter series options
            }
            else {
                this.chart.options.series.forEach(function (seriesOptions) {
                    // Merging dataGrouping options with already defined options #16759
                    seriesOptions.dataGrouping = typeof dataGrouping === 'boolean' ?
                        dataGrouping :
                        merge(dataGrouping, seriesOptions.dataGrouping);
                });
            }
            // Clear ordinal slope, so we won't accidentally use the old one (#7827)
            if (axis.ordinal) {
                axis.ordinal.slope = void 0;
            }
            if (redraw) {
                this.chart.redraw();
            }
        }
        /* *
         *
         *  Default Export
         *
         * */
        const DataGroupingAxisComposition = {
            compose
        };

        return DataGroupingAxisComposition;
    });
    _registerModule(_modules, 'Extensions/DataGrouping/DataGroupingSeriesComposition.js', [_modules['Extensions/DataGrouping/ApproximationRegistry.js'], _modules['Extensions/DataGrouping/DataGroupingDefaults.js'], _modules['Core/Axis/DateTimeAxis.js'], _modules['Core/Defaults.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (ApproximationRegistry, DataGroupingDefaults, DateTimeAxis, D, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { series: { prototype: seriesProto } } = SeriesRegistry;
        const { addEvent, defined, error, extend, isNumber, merge, pick } = U;
        /* *
         *
         *  Constants
         *
         * */
        const baseGeneratePoints = seriesProto.generatePoints;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function adjustExtremes(xAxis, groupedXData) {
            // Make sure the X axis extends to show the first group (#2533)
            // But only for visible series (#5493, #6393)
            if (defined(groupedXData[0]) &&
                isNumber(xAxis.min) &&
                isNumber(xAxis.dataMin) &&
                groupedXData[0] < xAxis.min) {
                if ((!defined(xAxis.options.min) &&
                    xAxis.min <= xAxis.dataMin) ||
                    xAxis.min === xAxis.dataMin) {
                    xAxis.min = Math.min(groupedXData[0], xAxis.min);
                }
                xAxis.dataMin = Math.min(groupedXData[0], xAxis.dataMin);
            }
            // When the last anchor set, change the extremes that
            // the last point is visible (#12455).
            if (defined(groupedXData[groupedXData.length - 1]) &&
                isNumber(xAxis.max) &&
                isNumber(xAxis.dataMax) &&
                groupedXData[groupedXData.length - 1] > xAxis.max) {
                if ((!defined(xAxis.options.max) &&
                    isNumber(xAxis.dataMax) &&
                    xAxis.max >= xAxis.dataMax) || xAxis.max === xAxis.dataMax) {
                    xAxis.max = Math.max(groupedXData[groupedXData.length - 1], xAxis.max);
                }
                xAxis.dataMax = Math.max(groupedXData[groupedXData.length - 1], xAxis.dataMax);
            }
        }
        /**
         * @private
         */
        function anchorPoints(series, groupedXData, xMax) {
            const options = series.options, dataGroupingOptions = options.dataGrouping, totalRange = (series.currentDataGrouping && series.currentDataGrouping.gapSize);
            if (!(dataGroupingOptions &&
                series.xData &&
                totalRange &&
                series.groupMap)) {
                return;
            }
            const groupedDataLastIndex = groupedXData.length - 1, anchor = dataGroupingOptions.anchor, firstAnchor = dataGroupingOptions.firstAnchor, lastAnchor = dataGroupingOptions.lastAnchor;
            let anchorIndexIterator = groupedXData.length - 1, anchorFirstIndex = 0;
            // Change the first point position, but only when it is
            // the first point in the data set not in the current zoom.
            if (firstAnchor && series.xData[0] >= groupedXData[0]) {
                anchorFirstIndex++;
                const groupStart = series.groupMap[0].start, groupLength = series.groupMap[0].length;
                let firstGroupEnd;
                if (isNumber(groupStart) && isNumber(groupLength)) {
                    firstGroupEnd = groupStart + (groupLength - 1);
                }
                groupedXData[0] = {
                    start: groupedXData[0],
                    middle: groupedXData[0] + 0.5 * totalRange,
                    end: groupedXData[0] + totalRange,
                    firstPoint: series.xData[0],
                    lastPoint: firstGroupEnd && series.xData[firstGroupEnd]
                }[firstAnchor];
            }
            // Change the last point position but only when it is
            // the last point in the data set not in the current zoom,
            // or if it is not the 1st point simultaneously.
            if (groupedDataLastIndex > 0 &&
                lastAnchor &&
                totalRange &&
                groupedXData[groupedDataLastIndex] >= xMax - totalRange) {
                anchorIndexIterator--;
                const lastGroupStart = series.groupMap[series.groupMap.length - 1].start;
                groupedXData[groupedDataLastIndex] = {
                    start: groupedXData[groupedDataLastIndex],
                    middle: groupedXData[groupedDataLastIndex] + 0.5 * totalRange,
                    end: groupedXData[groupedDataLastIndex] + totalRange,
                    firstPoint: lastGroupStart && series.xData[lastGroupStart],
                    lastPoint: series.xData[series.xData.length - 1]
                }[lastAnchor];
            }
            if (anchor && anchor !== 'start') {
                const shiftInterval = (totalRange *
                    { middle: 0.5, end: 1 }[anchor]);
                // Anchor the rest of the points apart from the ones, that were
                // previously moved.
                while (anchorIndexIterator >= anchorFirstIndex) {
                    groupedXData[anchorIndexIterator] += shiftInterval;
                    anchorIndexIterator--;
                }
            }
        }
        /**
         * For the processed data, calculate the grouped data if needed.
         *
         * @private
         * @function Highcharts.Series#applyGrouping
         */
        function applyGrouping(hasExtremesChanged) {
            const series = this, chart = series.chart, options = series.options, dataGroupingOptions = options.dataGrouping, groupingEnabled = series.allowDG !== false && dataGroupingOptions &&
                pick(dataGroupingOptions.enabled, chart.options.isStock), reserveSpace = series.reserveSpace(), lastDataGrouping = this.currentDataGrouping;
            let currentDataGrouping, croppedData, revertRequireSorting = false;
            // Data needs to be sorted for dataGrouping
            if (groupingEnabled && !series.requireSorting) {
                series.requireSorting = revertRequireSorting = true;
            }
            // Skip if skipDataGrouping method returns false or if grouping is disabled
            // (in that order).
            const skip = skipDataGrouping(series, hasExtremesChanged) === false || !groupingEnabled;
            // Revert original requireSorting value if changed
            if (revertRequireSorting) {
                series.requireSorting = false;
            }
            if (skip) {
                return;
            }
            series.destroyGroupedData();
            const processedXData = dataGroupingOptions.groupAll ?
                series.xData :
                series.processedXData, processedYData = dataGroupingOptions.groupAll ?
                series.yData :
                series.processedYData, plotSizeX = chart.plotSizeX, xAxis = series.xAxis, ordinal = xAxis.options.ordinal, groupPixelWidth = series.groupPixelWidth;
            let i, hasGroupedData;
            // Execute grouping if the amount of points is greater than the limit
            // defined in groupPixelWidth
            if (groupPixelWidth &&
                processedXData &&
                processedXData.length &&
                plotSizeX) {
                hasGroupedData = true;
                // Force recreation of point instances in series.translate, #5699
                series.isDirty = true;
                series.points = null; // #6709
                const extremes = xAxis.getExtremes(), xMin = extremes.min, xMax = extremes.max, groupIntervalFactor = (ordinal &&
                    xAxis.ordinal &&
                    xAxis.ordinal.getGroupIntervalFactor(xMin, xMax, series)) || 1, interval = (groupPixelWidth * (xMax - xMin) / plotSizeX) *
                    groupIntervalFactor, groupPositions = xAxis.getTimeTicks(DateTimeAxis.Additions.prototype.normalizeTimeTickInterval(interval, dataGroupingOptions.units ||
                    DataGroupingDefaults.units), 
                // Processed data may extend beyond axis (#4907)
                Math.min(xMin, processedXData[0]), Math.max(xMax, processedXData[processedXData.length - 1]), xAxis.options.startOfWeek, processedXData, series.closestPointRange), groupedData = seriesProto.groupData.apply(series, [
                    processedXData,
                    processedYData,
                    groupPositions,
                    dataGroupingOptions.approximation
                ]);
                let groupedXData = groupedData.groupedXData, groupedYData = groupedData.groupedYData, gapSize = 0;
                // The smoothed option is deprecated, instead, there is a fallback
                // to the new anchoring mechanism. #12455.
                if (dataGroupingOptions &&
                    dataGroupingOptions.smoothed &&
                    groupedXData.length) {
                    dataGroupingOptions.firstAnchor = 'firstPoint';
                    dataGroupingOptions.anchor = 'middle';
                    dataGroupingOptions.lastAnchor = 'lastPoint';
                    error(32, false, chart, {
                        'dataGrouping.smoothed': 'use dataGrouping.anchor'
                    });
                }
                // Record what data grouping values were used
                for (i = 1; i < groupPositions.length; i++) {
                    // The grouped gapSize needs to be the largest distance between
                    // the group to capture varying group sizes like months or DST
                    // crossing (#10000). Also check that the gap is not at the
                    // start of a segment.
                    if (!groupPositions.info.segmentStarts ||
                        groupPositions.info.segmentStarts.indexOf(i) === -1) {
                        gapSize = Math.max(groupPositions[i] - groupPositions[i - 1], gapSize);
                    }
                }
                currentDataGrouping = groupPositions.info;
                currentDataGrouping.gapSize = gapSize;
                series.closestPointRange = groupPositions.info.totalRange;
                series.groupMap = groupedData.groupMap;
                series.currentDataGrouping = currentDataGrouping;
                anchorPoints(series, groupedXData, xMax);
                if (reserveSpace) {
                    adjustExtremes(xAxis, groupedXData);
                }
                // We calculated all group positions but we should render
                // only the ones within the visible range
                if (dataGroupingOptions.groupAll) {
                    // Keep the reference to all grouped points
                    // for further calculation (eg. heikinashi).
                    series.allGroupedData = groupedYData;
                    croppedData = series.cropData(groupedXData, groupedYData, xAxis.min, xAxis.max);
                    groupedXData = croppedData.xData;
                    groupedYData = croppedData.yData;
                    series.cropStart = croppedData.start; // #15005
                }
                // Set series props
                series.processedXData = groupedXData;
                series.processedYData = groupedYData;
            }
            else {
                series.groupMap = null;
            }
            series.hasGroupedData = hasGroupedData;
            series.preventGraphAnimation =
                (lastDataGrouping && lastDataGrouping.totalRange) !==
                    (currentDataGrouping && currentDataGrouping.totalRange);
        }
        /**
         * @private
         */
        function compose(SeriesClass) {
            const seriesProto = SeriesClass.prototype;
            if (!seriesProto.applyGrouping) {
                const PointClass = SeriesClass.prototype.pointClass;
                // Override point prototype to throw a warning when trying to update
                // grouped points.
                addEvent(PointClass, 'update', function () {
                    if (this.dataGroup) {
                        error(24, false, this.series.chart);
                        return false;
                    }
                });
                addEvent(SeriesClass, 'afterSetOptions', onAfterSetOptions);
                addEvent(SeriesClass, 'destroy', destroyGroupedData);
                extend(seriesProto, {
                    applyGrouping,
                    destroyGroupedData,
                    generatePoints,
                    getDGApproximation,
                    groupData
                });
            }
        }
        /**
         * Destroy the grouped data points. #622, #740
         * @private
         */
        function destroyGroupedData() {
            // Clear previous groups
            if (this.groupedData) {
                this.groupedData.forEach(function (point, i) {
                    if (point) {
                        this.groupedData[i] = point.destroy ?
                            point.destroy() : null;
                    }
                }, this);
                // Clears all:
                // - `this.groupedData`
                // - `this.points`
                // - `preserve` object in series.update()
                this.groupedData.length = 0;
                delete this.allGroupedData; // #19892
            }
        }
        /**
         * Override the generatePoints method by adding a reference to grouped data
         * @private
         */
        function generatePoints() {
            baseGeneratePoints.apply(this);
            // Record grouped data in order to let it be destroyed the next time
            // processData runs
            this.destroyGroupedData(); // #622
            this.groupedData = this.hasGroupedData ? this.points : null;
        }
        /**
         * Set default approximations to the prototypes if present. Properties are
         * inherited down. Can be overridden for individual series types.
         * @private
         */
        function getDGApproximation() {
            if (this.is('arearange')) {
                return 'range';
            }
            if (this.is('ohlc')) {
                return 'ohlc';
            }
            if (this.is('hlc')) {
                return 'hlc';
            }
            if (
            // #18974, default approximation for cumulative
            // should be `sum` when `dataGrouping` is enabled
            this.is('column') ||
                this.options.cumulative) {
                return 'sum';
            }
            return 'average';
        }
        /**
         * Highcharts Stock only. Takes parallel arrays of x and y data and groups the
         * data into intervals defined by groupPositions, a collection of starting x
         * values for each group.
         *
         * @product highstock
         *
         * @function Highcharts.Series#groupData
         * @param {Array<number>} xData
         *        Parallel array of x data.
         * @param {Array<(number|null|undefined)>|Array<Array<(number|null|undefined)>>} yData
         *        Parallel array of y data.
         * @param {Array<number>} groupPositions
         *        Group positions.
         * @param {string|Function} [approximation]
         *        Approximation to use.
         * @return {Highcharts.DataGroupingResultObject}
         *         Mapped groups.
         */
        function groupData(xData, yData, groupPositions, approximation) {
            const series = this, data = series.data, dataOptions = series.options && series.options.data, groupedXData = [], groupedYData = [], groupMap = [], dataLength = xData.length, 
            // When grouping the fake extended axis for panning, we don't need to
            // consider y
            handleYData = !!yData, values = [], pointArrayMap = series.pointArrayMap, pointArrayMapLength = pointArrayMap && pointArrayMap.length, extendedPointArrayMap = ['x'].concat(pointArrayMap || ['y']), groupAll = (this.options.dataGrouping &&
                this.options.dataGrouping.groupAll);
            let pointX, pointY, groupedY, pos = 0, start = 0;
            const approximationFn = (typeof approximation === 'function' ?
                approximation :
                approximation && ApproximationRegistry[approximation] ?
                    ApproximationRegistry[approximation] :
                    ApproximationRegistry[(series.getDGApproximation && series.getDGApproximation() ||
                        'average')]);
            // Calculate values array size from pointArrayMap length
            if (pointArrayMapLength) {
                let len = pointArrayMap.length;
                while (len--) {
                    values.push([]);
                }
            }
            else {
                values.push([]);
            }
            const valuesLen = pointArrayMapLength || 1;
            for (let i = 0; i <= dataLength; i++) {
                // Start with the first point within the X axis range (#2696)
                if (xData[i] < groupPositions[0]) {
                    continue; // With next point
                }
                // When a new group is entered, summarize and initialize
                // the previous group
                while ((typeof groupPositions[pos + 1] !== 'undefined' &&
                    xData[i] >= groupPositions[pos + 1]) ||
                    i === dataLength) { // Get the last group
                    // get group x and y
                    pointX = groupPositions[pos];
                    series.dataGroupInfo = {
                        start: groupAll ? start : (series.cropStart + start),
                        length: values[0].length,
                        groupStart: pointX
                    };
                    groupedY = approximationFn.apply(series, values);
                    // By default, let options of the first grouped point be passed over
                    // to the grouped point. This allows preserving properties like
                    // `name` and `color` or custom properties. Implementers can
                    // override this from the approximation function, where they can
                    // write custom options to `this.dataGroupInfo.options`.
                    if (series.pointClass && !defined(series.dataGroupInfo.options)) {
                        // Convert numbers and arrays into objects
                        series.dataGroupInfo.options = merge(series.pointClass.prototype
                            .optionsToObject.call({ series: series }, series.options.data[series.cropStart + start]));
                        // Make sure the raw data (x, y, open, high etc) is not copied
                        // over and overwriting approximated data.
                        extendedPointArrayMap.forEach(function (key) {
                            delete series.dataGroupInfo.options[key];
                        });
                    }
                    // Push the grouped data
                    if (typeof groupedY !== 'undefined') {
                        groupedXData.push(pointX);
                        groupedYData.push(groupedY);
                        groupMap.push(series.dataGroupInfo);
                    }
                    // Reset the aggregate arrays
                    start = i;
                    for (let j = 0; j < valuesLen; j++) {
                        values[j].length = 0; // Faster than values[j] = []
                        values[j].hasNulls = false;
                    }
                    // Advance on the group positions
                    pos += 1;
                    // Don't loop beyond the last group
                    if (i === dataLength) {
                        break;
                    }
                }
                // Break out
                if (i === dataLength) {
                    break;
                }
                // For each raw data point, push it to an array that contains all values
                // for this specific group
                if (pointArrayMap) {
                    const index = (series.options.dataGrouping &&
                        series.options.dataGrouping.groupAll ?
                        i : series.cropStart + i), point = (data && data[index]) ||
                        series.pointClass.prototype.applyOptions.apply({
                            series: series
                        }, [dataOptions[index]]);
                    let val;
                    for (let j = 0; j < pointArrayMapLength; j++) {
                        val = point[pointArrayMap[j]];
                        if (isNumber(val)) {
                            values[j].push(val);
                        }
                        else if (val === null) {
                            values[j].hasNulls = true;
                        }
                    }
                }
                else {
                    pointY = handleYData ? yData[i] : null;
                    if (isNumber(pointY)) {
                        values[0].push(pointY);
                    }
                    else if (pointY === null) {
                        values[0].hasNulls = true;
                    }
                }
            }
            return {
                groupedXData,
                groupedYData,
                groupMap
            };
        }
        /**
         * Handle default options for data grouping. This must be set at runtime because
         * some series types are defined after this.
         * @private
         */
        function onAfterSetOptions(e) {
            const options = e.options, type = this.type, plotOptions = this.chart.options.plotOptions, 
            // External series, for example technical indicators should also inherit
            // commonOptions which are not available outside this module
            baseOptions = (this.useCommonDataGrouping &&
                DataGroupingDefaults.common), seriesSpecific = DataGroupingDefaults.seriesSpecific;
            let defaultOptions = D.defaultOptions.plotOptions[type].dataGrouping;
            if (plotOptions && (seriesSpecific[type] || baseOptions)) { // #1284
                const rangeSelector = this.chart.rangeSelector;
                if (!defaultOptions) {
                    defaultOptions = merge(DataGroupingDefaults.common, seriesSpecific[type]);
                }
                options.dataGrouping = merge(baseOptions, defaultOptions, plotOptions.series && plotOptions.series.dataGrouping, // #1228
                // Set by the StockChart constructor:
                plotOptions[type].dataGrouping, this.userOptions.dataGrouping, !options.isInternal &&
                    rangeSelector &&
                    isNumber(rangeSelector.selected) &&
                    rangeSelector.buttonOptions[rangeSelector.selected].dataGrouping);
            }
        }
        /**
         * @private
         */
        function skipDataGrouping(series, force) {
            return !(series.isCartesian &&
                !series.isDirty &&
                !series.xAxis.isDirty &&
                !series.yAxis.isDirty &&
                !force);
        }
        /* *
         *
         *  Default Export
         *
         * */
        const DataGroupingSeriesComposition = {
            compose,
            groupData
        };

        return DataGroupingSeriesComposition;
    });
    _registerModule(_modules, 'Extensions/DataGrouping/DataGrouping.js', [_modules['Extensions/DataGrouping/DataGroupingAxisComposition.js'], _modules['Extensions/DataGrouping/DataGroupingDefaults.js'], _modules['Extensions/DataGrouping/DataGroupingSeriesComposition.js'], _modules['Core/Templating.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (DataGroupingAxisComposition, DataGroupingDefaults, DataGroupingSeriesComposition, F, H, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { format } = F;
        const { composed } = H;
        const { addEvent, extend, isNumber, pick, pushUnique } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function compose(AxisClass, SeriesClass, TooltipClass) {
            DataGroupingAxisComposition.compose(AxisClass);
            DataGroupingSeriesComposition.compose(SeriesClass);
            if (TooltipClass &&
                pushUnique(composed, 'DataGrouping')) {
                addEvent(TooltipClass, 'headerFormatter', onTooltipHeaderFormatter);
            }
        }
        /**
         * Extend the original method, make the tooltip's header reflect the grouped
         * range.
         * @private
         */
        function onTooltipHeaderFormatter(e) {
            const chart = this.chart, time = chart.time, labelConfig = e.labelConfig, series = labelConfig.series, point = labelConfig.point, options = series.options, tooltipOptions = series.tooltipOptions, dataGroupingOptions = options.dataGrouping, xAxis = series.xAxis;
            let xDateFormat = tooltipOptions.xDateFormat, xDateFormatEnd, currentDataGrouping, dateTimeLabelFormats, labelFormats, formattedKey, formatString = tooltipOptions[e.isFooter ? 'footerFormat' : 'headerFormat'];
            // Apply only to grouped series
            if (xAxis &&
                xAxis.options.type === 'datetime' &&
                dataGroupingOptions &&
                isNumber(labelConfig.key)) {
                // Set variables
                currentDataGrouping = series.currentDataGrouping;
                dateTimeLabelFormats = dataGroupingOptions.dateTimeLabelFormats ||
                    // Fallback to commonOptions (#9693)
                    DataGroupingDefaults.common.dateTimeLabelFormats;
                // If we have grouped data, use the grouping information to get the
                // right format
                if (currentDataGrouping) {
                    labelFormats = dateTimeLabelFormats[currentDataGrouping.unitName];
                    if (currentDataGrouping.count === 1) {
                        xDateFormat = labelFormats[0];
                    }
                    else {
                        xDateFormat = labelFormats[1];
                        xDateFormatEnd = labelFormats[2];
                    }
                    // If not grouped, and we don't have set the xDateFormat option, get the
                    // best fit, so if the least distance between points is one minute, show
                    // it, but if the least distance is one day, skip hours and minutes etc.
                }
                else if (!xDateFormat && dateTimeLabelFormats && xAxis.dateTime) {
                    xDateFormat = xAxis.dateTime.getXDateFormat(labelConfig.x, tooltipOptions.dateTimeLabelFormats);
                }
                const groupStart = pick(series.groupMap?.[point.index].groupStart, labelConfig.key), groupEnd = groupStart + currentDataGrouping?.totalRange - 1;
                formattedKey = time.dateFormat(xDateFormat, groupStart);
                if (xDateFormatEnd) {
                    formattedKey += time.dateFormat(xDateFormatEnd, groupEnd);
                }
                // Replace default header style with class name
                if (series.chart.styledMode) {
                    formatString = this.styledModeFormat(formatString);
                }
                // Return the replaced format
                e.text = format(formatString, {
                    point: extend(labelConfig.point, { key: formattedKey }),
                    series: series
                }, chart);
                e.preventDefault();
            }
        }
        /* *
         *
         *  Default Export
         *
         * */
        const DataGroupingComposition = {
            compose,
            groupData: DataGroupingSeriesComposition.groupData
        };
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * @typedef {"average"|"averages"|"open"|"high"|"low"|"close"|"sum"} Highcharts.DataGroupingApproximationValue
         */
        /**
         * The position of the point inside the group.
         *
         * @typedef    {"start"|"middle"|"end"} Highcharts.DataGroupingAnchor
         */
        /**
         * The position of the first or last point in the series inside the group.
         *
         * @typedef    {"start"|"middle"|"end"|"firstPoint"|"lastPoint"} Highcharts.DataGroupingAnchorExtremes
         */
        /**
         * Highcharts Stock only.
         *
         * @product highstock
         * @interface Highcharts.DataGroupingInfoObject
         */ /**
        * @name Highcharts.DataGroupingInfoObject#length
        * @type {number}
        */ /**
        * @name Highcharts.DataGroupingInfoObject#options
        * @type {Highcharts.SeriesOptionsType|undefined}
        */ /**
        * @name Highcharts.DataGroupingInfoObject#start
        * @type {number}
        */
        /**
         * Highcharts Stock only.
         *
         * @product highstock
         * @interface Highcharts.DataGroupingResultObject
         */ /**
        * @name Highcharts.DataGroupingResultObject#groupedXData
        * @type {Array<number>}
        */ /**
        * @name Highcharts.DataGroupingResultObject#groupedYData
        * @type {Array<(number|null|undefined)>|Array<Array<(number|null|undefined)>>}
        */ /**
        * @name Highcharts.DataGroupingResultObject#groupMap
        * @type {Array<DataGroupingInfoObject>}
        */
        /**
         * Highcharts Stock only. If a point object is created by data
         * grouping, it doesn't reflect actual points in the raw
         * data. In this case, the `dataGroup` property holds
         * information that points back to the raw data.
         *
         * - `dataGroup.start` is the index of the first raw data
         *   point in the group.
         *
         * - `dataGroup.length` is the amount of points in the
         *   group.
         *
         * @sample stock/members/point-datagroup
         *         Click to inspect raw data points
         *
         * @product highstock
         *
         * @name Highcharts.Point#dataGroup
         * @type {Highcharts.DataGroupingInfoObject|undefined}
         */
        (''); // Detach doclets above
        /* *
         *
         *  API Options
         *
         * */
        /**
         * Data grouping is the concept of sampling the data values into larger
         * blocks in order to ease readability and increase performance of the
         * JavaScript charts. Highcharts Stock by default applies data grouping when
         * the points become closer than a certain pixel value, determined by
         * the `groupPixelWidth` option.
         *
         * If data grouping is applied, the grouping information of grouped
         * points can be read from the [Point.dataGroup](
         * /class-reference/Highcharts.Point#dataGroup). If point options other than
         * the data itself are set, for example `name` or `color` or custom properties,
         * the grouping logic doesn't know how to group it. In this case the options of
         * the first point instance are copied over to the group point. This can be
         * altered through a custom `approximation` callback function.
         *
         * @declare   Highcharts.DataGroupingOptionsObject
         * @product   highstock
         * @requires  product:highstock
         * @requires  module:modules/datagrouping
         * @apioption plotOptions.series.dataGrouping
         */
        /**
         * Specifies how the points should be located on the X axis inside the group.
         * Points that are extremes can be set separately. Available options:
         *
         * - `start` places the point at the beginning of the group
         * (e.g. range 00:00:00 - 23:59:59 -> 00:00:00)
         *
         * - `middle` places the point in the middle of the group
         * (e.g. range 00:00:00 - 23:59:59 -> 12:00:00)
         *
         * - `end` places the point at the end of the group
         * (e.g. range 00:00:00 - 23:59:59 -> 23:59:59)
         *
         * @sample {highstock} stock/plotoptions/series-datagrouping-anchor
         *         Changing the point x-coordinate inside the group.
         *
         * @see [dataGrouping.firstAnchor](#plotOptions.series.dataGrouping.firstAnchor)
         * @see [dataGrouping.lastAnchor](#plotOptions.series.dataGrouping.lastAnchor)
         *
         * @type       {Highcharts.DataGroupingAnchor}
         * @since 9.1.0
         * @default    start
         * @apioption  plotOptions.series.dataGrouping.anchor
         */
        /**
         * The method of approximation inside a group. When for example 30 days
         * are grouped into one month, this determines what value should represent
         * the group. Possible values are "average", "averages", "open", "high",
         * "low", "close" and "sum". For OHLC and candlestick series the approximation
         * is "ohlc" by default, which finds the open, high, low and close values
         * within all the grouped data. For ranges, the approximation is "range",
         * which finds the low and high values. For multi-dimensional data,
         * like ranges and OHLC, "averages" will compute the average for each
         * dimension.
         *
         * Custom aggregate methods can be added by assigning a callback function
         * as the approximation. This function takes a numeric array as the
         * argument and should return a single numeric value or `null`. Note
         * that the numeric array will never contain null values, only true
         * numbers. Instead, if null values are present in the raw data, the
         * numeric array will have an `.hasNulls` property set to `true`. For
         * single-value data sets the data is available in the first argument
         * of the callback function. For OHLC data sets, all the open values
         * are in the first argument, all high values in the second etc.
         *
         * Since v4.2.7, grouping meta data is available in the approximation
         * callback from `this.dataGroupInfo`. It can be used to extract information
         * from the raw data.
         *
         * Defaults to `average` for line-type series, `sum` for columns, `range`
         * for range series, `hlc` for HLC, and `ohlc` for OHLC and candlestick.
         *
         * @sample {highstock} stock/plotoptions/series-datagrouping-approximation
         *         Approximation callback with custom data
         * @sample {highstock} stock/plotoptions/series-datagrouping-simple-approximation
         *         Simple approximation demo
         *
         * @type       {Highcharts.DataGroupingApproximationValue|Function}
         * @apioption  plotOptions.series.dataGrouping.approximation
         */
        /**
         * Datetime formats for the header of the tooltip in a stock chart.
         * The format can vary within a chart depending on the currently selected
         * time range and the current data grouping.
         *
         * The default formats are:
         * ```js
         * {
         *     millisecond: [
         *         '%A, %e %b, %H:%M:%S.%L', '%A, %e %b, %H:%M:%S.%L', '-%H:%M:%S.%L'
         *     ],
         *     second: ['%A, %e %b, %H:%M:%S', '%A, %e %b, %H:%M:%S', '-%H:%M:%S'],
         *     minute: ['%A, %e %b, %H:%M', '%A, %e %b, %H:%M', '-%H:%M'],
         *     hour: ['%A, %e %b, %H:%M', '%A, %e %b, %H:%M', '-%H:%M'],
         *     day: ['%A, %e %b %Y', '%A, %e %b', '-%A, %e %b %Y'],
         *     week: ['Week from %A, %e %b %Y', '%A, %e %b', '-%A, %e %b %Y'],
         *     month: ['%B %Y', '%B', '-%B %Y'],
         *     year: ['%Y', '%Y', '-%Y']
         * }
         * ```
         *
         * For each of these array definitions, the first item is the format
         * used when the active time span is one unit. For instance, if the
         * current data applies to one week, the first item of the week array
         * is used. The second and third items are used when the active time
         * span is more than two units. For instance, if the current data applies
         * to two weeks, the second and third item of the week array are used,
         *  and applied to the start and end date of the time span.
         *
         * @type      {Object}
         * @apioption plotOptions.series.dataGrouping.dateTimeLabelFormats
         */
        /**
         * Enable or disable data grouping.
         *
         * @type      {boolean}
         * @default   true
         * @apioption plotOptions.series.dataGrouping.enabled
         */
        /**
         * Specifies how the first grouped point is positioned on the xAxis.
         * If firstAnchor and/or lastAnchor are defined, then those options take
         * precedence over anchor for the first and/or last grouped points.
         * Available options:
         *
         * -`start` places the point at the beginning of the group
         * (e.g. range 00:00:00 - 23:59:59 -> 00:00:00)
         *
         * -`middle` places the point in the middle of the group
         * (e.g. range 00:00:00 - 23:59:59 -> 12:00:00)
         *
         * -`end` places the point at the end of the group
         * (e.g. range 00:00:00 - 23:59:59 -> 23:59:59)
         *
         * -`firstPoint` the first point in the group
         * (e.g. points at 00:13, 00:35, 00:59 -> 00:13)
         *
         * -`lastPoint` the last point in the group
         * (e.g. points at 00:13, 00:35, 00:59 -> 00:59)
         *
         * @sample {highstock} stock/plotoptions/series-datagrouping-first-anchor
         *         Applying first and last anchor.
         *
         * @see [dataGrouping.anchor](#plotOptions.series.dataGrouping.anchor)
         *
         * @type       {Highcharts.DataGroupingAnchorExtremes}
         * @since 9.1.0
         * @default    start
         * @apioption  plotOptions.series.dataGrouping.firstAnchor
         */
        /**
         * When data grouping is forced, it runs no matter how small the intervals
         * are. This can be handy for example when the sum should be calculated
         * for values appearing at random times within each hour.
         *
         * @type      {boolean}
         * @default   false
         * @apioption plotOptions.series.dataGrouping.forced
         */
        /**
         * The approximate pixel width of each group. If for example a series
         * with 30 points is displayed over a 600 pixel wide plot area, no grouping
         * is performed. If however the series contains so many points that
         * the spacing is less than the groupPixelWidth, Highcharts will try
         * to group it into appropriate groups so that each is more or less
         * two pixels wide. If multiple series with different group pixel widths
         * are drawn on the same x axis, all series will take the greatest width.
         * For example, line series have 2px default group width, while column
         * series have 10px. If combined, both the line and the column will
         * have 10px by default.
         *
         * @type      {number}
         * @default   2
         * @apioption plotOptions.series.dataGrouping.groupPixelWidth
         */
        /**
         * By default only points within the visible range are grouped. Enabling this
         * option will force data grouping to calculate all grouped points for a given
         * dataset. That option prevents for example a column series from calculating
         * a grouped point partially. The effect is similar to
         * [Series.getExtremesFromAll](#plotOptions.series.getExtremesFromAll) but does
         * not affect yAxis extremes.
         *
         * @sample {highstock} stock/plotoptions/series-datagrouping-groupall/
         *         Two series with the same data but different groupAll setting
         *
         * @type      {boolean}
         * @default   false
         * @since     6.1.0
         * @apioption plotOptions.series.dataGrouping.groupAll
         */
        /**
         * Specifies how the last grouped point is positioned on the xAxis.
         * If firstAnchor and/or lastAnchor are defined, then those options take
         * precedence over anchor for the first and/or last grouped points.
         * Available options:
         *
         * -`start` places the point at the beginning of the group
         * (e.g. range 00:00:00 - 23:59:59 -> 00:00:00)
         *
         * -`middle` places the point in the middle of the group
         * (e.g. range 00:00:00 - 23:59:59 -> 12:00:00)
         *
         * -`end` places the point at the end of the group
         * (e.g. range 00:00:00 - 23:59:59 -> 23:59:59)
         *
         * -`firstPoint` the first point in the group
         * (e.g. points at 00:13, 00:35, 00:59 -> 00:13)
         *
         * -`lastPoint` the last point in the group
         * (e.g. points at 00:13, 00:35, 00:59 -> 00:59)
         *
         * @sample {highstock} stock/plotoptions/series-datagrouping-first-anchor
         *         Applying first and last anchor.
         *
         * @sample {highstock} stock/plotoptions/series-datagrouping-last-anchor
         *         Applying the last anchor in the chart with live data.
         *
         * @see [dataGrouping.anchor](#plotOptions.series.dataGrouping.anchor)
         *
         * @type       {Highcharts.DataGroupingAnchorExtremes}
         * @since 9.1.0
         * @default    start
         * @apioption  plotOptions.series.dataGrouping.lastAnchor
         */
        /**
         * Normally, a group is indexed by the start of that group, so for example
         * when 30 daily values are grouped into one month, that month's x value
         * will be the 1st of the month. This apparently shifts the data to
         * the left. When the smoothed option is true, this is compensated for.
         * The data is shifted to the middle of the group, and min and max
         * values are preserved. Internally, this is used in the Navigator series.
         *
         * @type      {boolean}
         * @default   false
         * @deprecated
         * @apioption plotOptions.series.dataGrouping.smoothed
         */
        /**
         * An array determining what time intervals the data is allowed to be
         * grouped to. Each array item is an array where the first value is
         * the time unit and the second value another array of allowed multiples.
         *
         * Defaults to:
         * ```js
         * units: [[
         *     'millisecond', // unit name
         *     [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
         * ], [
         *     'second',
         *     [1, 2, 5, 10, 15, 30]
         * ], [
         *     'minute',
         *     [1, 2, 5, 10, 15, 30]
         * ], [
         *     'hour',
         *     [1, 2, 3, 4, 6, 8, 12]
         * ], [
         *     'day',
         *     [1]
         * ], [
         *     'week',
         *     [1]
         * ], [
         *     'month',
         *     [1, 3, 6]
         * ], [
         *     'year',
         *     null
         * ]]
         * ```
         *
         * @type      {Array<Array<string,(Array<number>|null)>>}
         * @apioption plotOptions.series.dataGrouping.units
         */
        /**
         * The approximate pixel width of each group. If for example a series
         * with 30 points is displayed over a 600 pixel wide plot area, no grouping
         * is performed. If however the series contains so many points that
         * the spacing is less than the groupPixelWidth, Highcharts will try
         * to group it into appropriate groups so that each is more or less
         * two pixels wide. Defaults to `10`.
         *
         * @sample {highstock} stock/plotoptions/series-datagrouping-grouppixelwidth/
         *         Two series with the same data density but different groupPixelWidth
         *
         * @type      {number}
         * @default   10
         * @apioption plotOptions.column.dataGrouping.groupPixelWidth
         */
        ''; // Required by JSDoc parsing

        return DataGroupingComposition;
    });
    _registerModule(_modules, 'masters/modules/datagrouping.src.js', [_modules['Core/Globals.js'], _modules['Extensions/DataGrouping/ApproximationDefaults.js'], _modules['Extensions/DataGrouping/ApproximationRegistry.js'], _modules['Extensions/DataGrouping/DataGrouping.js']], function (Highcharts, ApproximationDefaults, ApproximationRegistry, DataGrouping) {

        const G = Highcharts;
        G.dataGrouping = G.dataGrouping || {};
        G.dataGrouping.approximationDefaults = (G.dataGrouping.approximationDefaults ||
            ApproximationDefaults);
        G.dataGrouping.approximations = (G.dataGrouping.approximations ||
            ApproximationRegistry);
        DataGrouping.compose(G.Axis, G.Series, G.Tooltip);

        return Highcharts;
    });
    _registerModule(_modules, 'Extensions/Annotations/NavigationBindingsUtilities.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft, Black Label
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { defined, isNumber, pick } = U;
        /* *
         *
         *  Constants
         *
         * */
        /**
         * Define types for editable fields per annotation. There is no need to define
         * numbers, because they won't change their type to string.
         * @private
         */
        const annotationsFieldsTypes = {
            backgroundColor: 'string',
            borderColor: 'string',
            borderRadius: 'string',
            color: 'string',
            fill: 'string',
            fontSize: 'string',
            labels: 'string',
            name: 'string',
            stroke: 'string',
            title: 'string'
        };
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Returns the first xAxis or yAxis that was clicked with its value.
         *
         * @private
         *
         * @param {Array<Highcharts.PointerAxisCoordinateObject>} coords
         *        All the chart's x or y axes with a current pointer's axis value.
         *
         * @return {Highcharts.PointerAxisCoordinateObject}
         *         Object with a first found axis and its value that pointer
         *         is currently pointing.
         */
        function getAssignedAxis(coords) {
            return coords.filter((coord) => {
                const extremes = coord.axis.getExtremes(), axisMin = extremes.min, axisMax = extremes.max, 
                // Correct axis edges when axis has series
                // with pointRange (like column)
                minPointOffset = pick(coord.axis.minPointOffset, 0);
                return isNumber(axisMin) && isNumber(axisMax) &&
                    coord.value >= (axisMin - minPointOffset) &&
                    coord.value <= (axisMax + minPointOffset) &&
                    // Don't count navigator axis
                    !coord.axis.options.isInternal;
            })[0]; // If the axes overlap, return the first axis that was found.
        }
        /**
         * Get field type according to value
         *
         * @private
         *
         * @param {'boolean'|'number'|'string'} value
         * Atomic type (one of: string, number, boolean)
         *
         * @return {'checkbox'|'number'|'text'}
         * Field type (one of: text, number, checkbox)
         */
        function getFieldType(key, value) {
            const predefinedType = annotationsFieldsTypes[key];
            let fieldType = typeof value;
            if (defined(predefinedType)) {
                fieldType = predefinedType;
            }
            return {
                'string': 'text',
                'number': 'number',
                'boolean': 'checkbox'
            }[fieldType];
        }
        /* *
         *
         *  Default Export
         *
         * */
        const NavigationBindingUtilities = {
            annotationsFieldsTypes,
            getAssignedAxis,
            getFieldType
        };

        return NavigationBindingUtilities;
    });
    _registerModule(_modules, 'Extensions/MouseWheelZoom/MouseWheelZoom.js', [_modules['Core/Utilities.js'], _modules['Extensions/Annotations/NavigationBindingsUtilities.js']], function (U, NBU) {
        /* *
         *
         *  (c) 2023 Torstein Honsi, Askel Eirik Johansson
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { addEvent, isObject, pick, defined, merge } = U;
        const { getAssignedAxis } = NBU;
        /* *
         *
         *  Constants
         *
         * */
        const composedClasses = [], defaultOptions = {
            enabled: true,
            sensitivity: 1.1
        };
        let wheelTimer;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        const optionsToObject = (options) => {
            if (!isObject(options)) {
                options = {
                    enabled: options ?? true
                };
            }
            return merge(defaultOptions, options);
        };
        /**
         * @private
         */
        const zoomBy = function (chart, howMuch, xAxis, yAxis, mouseX, mouseY, options) {
            const type = pick(options.type, chart.zooming.type, '');
            let axes = [];
            if (type === 'x') {
                axes = xAxis;
            }
            else if (type === 'y') {
                axes = yAxis;
            }
            else if (type === 'xy') {
                axes = chart.axes;
            }
            const hasZoomed = chart.transform({
                axes,
                // Create imaginary reference and target rectangles around the mouse
                // point that scales up or down with `howMuch`;
                to: {
                    x: mouseX - 5,
                    y: mouseY - 5,
                    // Must use 10 to get passed the limit for too small reference.
                    // Below this, the transform will default to a pan.
                    width: 10,
                    height: 10
                },
                from: {
                    x: mouseX - 5 * howMuch,
                    y: mouseY - 5 * howMuch,
                    width: 10 * howMuch,
                    height: 10 * howMuch
                },
                trigger: 'mousewheel'
            });
            if (hasZoomed) {
                if (defined(wheelTimer)) {
                    clearTimeout(wheelTimer);
                }
                // Some time after the last mousewheel event, run drop. In case any of
                // the affected axes had `startOnTick` or `endOnTick`, they will be
                // re-adjusted now.
                wheelTimer = setTimeout(() => {
                    chart.pointer?.drop();
                }, 400);
            }
            return hasZoomed;
        };
        /**
         * @private
         */
        function onAfterGetContainer() {
            const wheelZoomOptions = optionsToObject(this.zooming.mouseWheel);
            if (wheelZoomOptions.enabled) {
                addEvent(this.container, 'wheel', (e) => {
                    e = this.pointer?.normalize(e) || e;
                    const { pointer } = this, allowZoom = pointer && !pointer.inClass(e.target, 'highcharts-no-mousewheel');
                    // Firefox uses e.detail, WebKit and IE uses deltaX, deltaY, deltaZ.
                    if (this.isInsidePlot(e.chartX - this.plotLeft, e.chartY - this.plotTop) && allowZoom) {
                        const wheelSensitivity = wheelZoomOptions.sensitivity || 1.1, delta = e.detail || ((e.deltaY || 0) / 120), xAxisCoords = getAssignedAxis(pointer.getCoordinates(e).xAxis), yAxisCoords = getAssignedAxis(pointer.getCoordinates(e).yAxis);
                        const hasZoomed = zoomBy(this, Math.pow(wheelSensitivity, delta), xAxisCoords ? [xAxisCoords.axis] : this.xAxis, yAxisCoords ? [yAxisCoords.axis] : this.yAxis, e.chartX, e.chartY, wheelZoomOptions);
                        // Prevent page scroll
                        if (hasZoomed) {
                            e.preventDefault?.();
                        }
                    }
                });
            }
        }
        /**
         * @private
         */
        function compose(ChartClass) {
            if (composedClasses.indexOf(ChartClass) === -1) {
                composedClasses.push(ChartClass);
                addEvent(ChartClass, 'afterGetContainer', onAfterGetContainer);
            }
        }
        /* *
         *
         *  Default Export
         *
         * */
        const MouseWheelZoomComposition = {
            compose
        };
        /* *
         *
         *  API Options
         *
         * */
        /**
         * The mouse wheel zoom is a feature included in Highcharts Stock, but is also
         * available for Highcharts Core as a module. Zooming with the mouse wheel is
         * enabled by default in Highcharts Stock. In Highcharts Core it is enabled if
         * [chart.zooming.type](chart.zooming.type) is set. It can be disabled by
         * setting this option to `false`.
         *
         * @type      {boolean|object}
         * @since 11.1.0
         * @requires  modules/mouse-wheel-zoom
         * @sample    {highcharts} highcharts/mouse-wheel-zoom/enabled
         *            Enable or disable
         * @sample    {highstock} stock/mouse-wheel-zoom/enabled
         *            Enable or disable
         * @apioption chart.zooming.mouseWheel
         */
        /**
         * Zooming with the mouse wheel can be disabled by setting this option to
         * `false`.
         *
         * @type      {boolean}
         * @default   true
         * @since 11.1.0
         * @requires  modules/mouse-wheel-zoom
         * @apioption chart.zooming.mouseWheel.enabled
         */
        /**
         * Adjust the sensitivity of the zoom. Sensitivity of mouse wheel or trackpad
         * scrolling. `1` is no sensitivity, while with `2`, one mouse wheel delta will
         * zoom in `50%`.
         *
         * @type      {number}
         * @default   1.1
         * @since 11.1.0
         * @requires  modules/mouse-wheel-zoom
         * @sample    {highcharts} highcharts/mouse-wheel-zoom/sensitivity
         *            Change mouse wheel zoom sensitivity
         * @sample    {highstock} stock/mouse-wheel-zoom/sensitivity
         *            Change mouse wheel zoom sensitivity
         * @apioption chart.zooming.mouseWheel.sensitivity
         */
        /**
         * Decides in what dimensions the user can zoom scrolling the wheel. Can be one
         * of `x`, `y` or `xy`. In Highcharts Core, if not specified here, it will
         * inherit the type from [chart.zooming.type](chart.zooming.type). In Highcharts
         * Stock, it defaults to `x`.
         *
         * Note that particularly with mouse wheel in the y direction, the zoom is
         * affected by the default [yAxis.startOnTick](#yAxis.startOnTick) and
         * [endOnTick]((#yAxis.endOnTick)) settings. In order to respect these settings,
         * the zoom level will adjust after the user has stopped zooming. To prevent
         * this, consider setting `startOnTick` and `endOnTick` to `false`.
         *
         * @type      {string}
         * @default   {highcharts} undefined
         * @default   {highstock} x
         * @validvalue ["x", "y", "xy"]
         * @since 11.1.0
         * @requires  modules/mouse-wheel-zoom
         * @apioption chart.zooming.mouseWheel.type
         */
        (''); // Keeps doclets above in JS file

        return MouseWheelZoomComposition;
    });
    _registerModule(_modules, 'masters/modules/mouse-wheel-zoom.src.js', [_modules['Core/Globals.js'], _modules['Extensions/MouseWheelZoom/MouseWheelZoom.js']], function (Highcharts, MouseWheelZoom) {

        const G = Highcharts;
        G.MouseWheelZoom = G.MouseWheelZoom || MouseWheelZoom;
        G.MouseWheelZoom.compose(G.Chart);

        return Highcharts;
    });
    _registerModule(_modules, 'masters/modules/stock.src.js', [_modules['Core/Globals.js'], _modules['Series/DataModifyComposition.js'], _modules['Stock/Navigator/Navigator.js'], _modules['Core/Axis/OrdinalAxis.js'], _modules['Stock/RangeSelector/RangeSelector.js'], _modules['Stock/Scrollbar/Scrollbar.js'], _modules['Core/Chart/StockChart.js'], _modules['Series/OHLC/OHLCSeries.js'], _modules['Series/Flags/FlagsSeries.js']], function (Highcharts, DataModifyComposition, Navigator, OrdinalAxis, RangeSelector, Scrollbar, StockChart, OHLCSeries, FlagsSeries) {

        const G = Highcharts;
        // Classes
        G.Navigator = G.Navigator || Navigator;
        G.OrdinalAxis = G.OrdinalAxis || OrdinalAxis;
        G.RangeSelector = G.RangeSelector || RangeSelector;
        G.Scrollbar = G.Scrollbar || Scrollbar;
        // Functions
        G.stockChart = G.stockChart || StockChart.stockChart;
        G.StockChart = G.StockChart || G.stockChart;
        G.extend(G.StockChart, StockChart);
        // Compositions
        DataModifyComposition.compose(G.Series, G.Axis, G.Point);
        FlagsSeries.compose(G.Renderer);
        OHLCSeries.compose(G.Series);
        G.Navigator.compose(G.Chart, G.Axis, G.Series);
        G.OrdinalAxis.compose(G.Axis, G.Series, G.Chart);
        G.RangeSelector.compose(G.Axis, G.Chart);
        G.Scrollbar.compose(G.Axis);
        G.StockChart.compose(G.Chart, G.Axis, G.Series, G.SVGRenderer);

        return Highcharts;
    });
}));