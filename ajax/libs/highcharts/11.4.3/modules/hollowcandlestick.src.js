/**
 * @license Highstock JS v11.4.3 (2024-05-22)
 *
 * Hollow Candlestick series type for Highcharts Stock
 *
 * (c) 2010-2024 Karol Kolodziej
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/hollowcandlestick', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'Series/HollowCandlestick/HollowCandlestickPoint.js', [_modules['Core/Series/SeriesRegistry.js']], function (SeriesRegistry) {
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
         *  Imports
         *
         * */
        const { seriesTypes: { candlestick: CandlestickSeries } } = SeriesRegistry;
        /* *
         *
         *  Class
         *
         * */
        class HollowCandlestickPoint extends CandlestickSeries.prototype.pointClass {
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * Update class name if needed.
             * @private
             * @function Highcharts.seriesTypes.hollowcandlestick#getClassName
             */
            getClassName() {
                let className = super.getClassName.apply(this);
                const point = this, index = point.index, currentPoint = point.series.hollowCandlestickData[index];
                if (!currentPoint.isBullish && currentPoint.trendDirection === 'up') {
                    className += '-bearish-up';
                }
                return className;
            }
        }
        /* *
         *
         *  Class Namespace
         *
         * */
        /* *
         *
         *  Default Export
         *
         * */

        return HollowCandlestickPoint;
    });
    _registerModule(_modules, 'Series/HollowCandlestick/HollowCandlestickSeries.js', [_modules['Series/HollowCandlestick/HollowCandlestickPoint.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js'], _modules['Core/Axis/Axis.js']], function (HollowCandlestickPoint, SeriesRegistry, U, Axis) {
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
         *  Imports
         *
         * */
        const { seriesTypes: { candlestick: CandlestickSeries } } = SeriesRegistry;
        const { addEvent, merge } = U;
        /* *
         *
         *  Code
         *
         * */
        /**
         * The hollowcandlestick series.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.hollowcandlestick
         *
         * @augments Highcharts.seriesTypes.candlestick
         */
        class HollowCandlestickSeries extends CandlestickSeries {
            constructor() {
                /* *
                 *
                 * Static properties
                 *
                 * */
                super(...arguments);
                this.hollowCandlestickData = [];
                /* eslint-disable valid-jsdoc */
            }
            /* *
             *
             * Functions
             *
             * */
            /**
             * Iterate through all points and get their type.
             * @private
             *
             * @function Highcharts.seriesTypes.hollowcandlestick#getPriceMovement
             *
             *
             */
            getPriceMovement() {
                const series = this, 
                // Processed and grouped data
                processedYData = series.allGroupedData || series.yData, hollowCandlestickData = this.hollowCandlestickData;
                hollowCandlestickData.length = 0;
                // First point is always bullish (transparent).
                hollowCandlestickData.push({
                    isBullish: true,
                    trendDirection: 'up'
                });
                for (let i = 1; i < processedYData.length; i++) {
                    const dataPoint = processedYData[i], previousDataPoint = processedYData[i - 1];
                    hollowCandlestickData.push(series.isBullish(dataPoint, previousDataPoint));
                }
            }
            /**
             * Return line color based on candle type.
             * @private
             *
             * @function Highcharts.seriesTypes.hollowcandlestick#getLineColor
             *
             * @param {string} trendDirection
             * Type of candle direction (bearish/bullish)(down/up).
             *
             * @return {ColorType}
             * Line color
             */
            getLineColor(trendDirection) {
                const series = this;
                // Return line color based on trend direction
                return trendDirection === 'up' ?
                    series.options.upColor || "#06b535" /* Palette.positiveColor */ :
                    series.options.color || "#f21313" /* Palette.negativeColor */;
            }
            /**
             * Return fill color based on candle type.
             * @private
             *
             * @function Highcharts.seriesTypes.hollowcandlestick#getPointFill
             *
             * @param {HollowcandleInfo} hollowcandleInfo
             *        Information about the current candle.
             *
             * @return {ColorType}
             * Point fill color
             */
            getPointFill(hollowcandleInfo) {
                const series = this;
                // Return fill color only for bearish candles.
                if (hollowcandleInfo.isBullish) {
                    return 'transparent';
                }
                return hollowcandleInfo.trendDirection === 'up' ?
                    series.options.upColor || "#06b535" /* Palette.positiveColor */ :
                    series.options.color || "#f21313" /* Palette.negativeColor */;
            }
            /**
             * @private
             * @function Highcharts.seriesTypes.hollowcandlestick#init
             */
            init() {
                super.init.apply(this, arguments);
                this.hollowCandlestickData = [];
            }
            /**
             * Check if the candle is bearish or bullish. For bullish one, return true.
             * For bearish, return string depending on the previous point.
             *
             * @function Highcharts.seriesTypes.hollowcandlestick#isBullish
             *
             * @param {Array<(number)>} dataPoint
             * Current point which we calculate.
             *
             * @param {Array<(number)>} previousDataPoint
             * Previous point.
             */
            isBullish(dataPoint, previousDataPoint) {
                return {
                    // Compare points' open and close value.
                    isBullish: dataPoint[0] <= dataPoint[3],
                    // For bearish candles.
                    trendDirection: dataPoint[3] < previousDataPoint[3] ? 'down' : 'up'
                };
            }
            /**
             * Add color and fill attribute for each point.
             *
             * @private
             *
             * @function Highcharts.seriesTypes.hollowcandlestick#pointAttribs
             *
             * @param {HollowCandlestickPoint} point
             * Point to which we are adding attributes.
             *
             * @param {StatesOptionsKey} state
             * Current point state.
             */
            pointAttribs(point, state) {
                const attribs = super.pointAttribs.call(this, point, state);
                let stateOptions;
                const index = point.index, hollowcandleInfo = this.hollowCandlestickData[index];
                attribs.fill = this.getPointFill(hollowcandleInfo) || attribs.fill;
                attribs.stroke = this.getLineColor(hollowcandleInfo.trendDirection) ||
                    attribs.stroke;
                // Select or hover states
                if (state) {
                    stateOptions = this.options.states[state];
                    attribs.fill = stateOptions.color || attribs.fill;
                    attribs.stroke = stateOptions.lineColor || attribs.stroke;
                    attribs['stroke-width'] =
                        stateOptions.lineWidth || attribs['stroke-width'];
                }
                return attribs;
            }
        }
        /**
         * A hollow candlestick chart is a style of financial chart used to
         * describe price movements over time.
         *
         * @sample stock/demo/hollow-candlestick/
         *         Hollow Candlestick chart
         *
         * @extends      plotOptions.candlestick
         * @product      highstock
         * @requires     modules/hollowcandlestick
         * @optionparent plotOptions.hollowcandlestick
         */
        HollowCandlestickSeries.defaultOptions = merge(CandlestickSeries.defaultOptions, {
            /**
             * The fill color of the candlestick when the current
             * close is lower than the previous one.
             *
             * @sample stock/plotoptions/hollow-candlestick-color/
             *     Custom colors
             * @sample {highstock} highcharts/css/hollow-candlestick/
             *         Colors in styled mode
             *
             * @type    {ColorType}
             * @product highstock
             */
            color: "#f21313" /* Palette.negativeColor */,
            dataGrouping: {
                groupAll: true,
                groupPixelWidth: 10
            },
            /**
             * The color of the line/border of the hollow candlestick when
             * the current close is lower than the previous one.
             *
             * @sample stock/plotoptions/hollow-candlestick-color/
             *     Custom colors
             * @sample {highstock} highcharts/css/hollow-candlestick/
             *         Colors in styled mode
             *
             * @type    {ColorType}
             * @product highstock
             */
            lineColor: "#f21313" /* Palette.negativeColor */,
            /**
             * The fill color of the candlestick when the current
             * close is higher than the previous one.
             *
             * @sample stock/plotoptions/hollow-candlestick-color/
             *     Custom colors
             * @sample {highstock} highcharts/css/hollow-candlestick/
             *         Colors in styled mode
             *
             * @type    {ColorType}
             * @product highstock
             */
            upColor: "#06b535" /* Palette.positiveColor */,
            /**
             * The color of the line/border of the hollow candlestick when
             * the current close is higher than the previous one.
             *
             * @sample stock/plotoptions/hollow-candlestick-color/
             *     Custom colors
             * @sample {highstock} highcharts/css/hollow-candlestick/
             *         Colors in styled mode
             *
             * @type    {ColorType}
             * @product highstock
             */
            upLineColor: "#06b535" /* Palette.positiveColor */
        });
        // Force to recalculate the hollowcandlestick data set after updating data.
        addEvent(HollowCandlestickSeries, 'updatedData', function () {
            if (this.hollowCandlestickData.length) {
                this.hollowCandlestickData.length = 0;
            }
        });
        // After processing and grouping the data,
        // check if the candle is bearish or bullish.
        // Required for further calculation.
        addEvent(Axis, 'postProcessData', function () {
            const axis = this, series = axis.series;
            series.forEach(function (series) {
                if (series.is('hollowcandlestick')) {
                    const hollowcandlestickSeries = series;
                    hollowcandlestickSeries.getPriceMovement();
                }
            });
        });
        /* *
         *
         *  Class Prototype
         *
         * */
        HollowCandlestickSeries.prototype.pointClass = HollowCandlestickPoint;
        SeriesRegistry.registerSeriesType('hollowcandlestick', HollowCandlestickSeries);
        /* *
         *
         * Default Export
         *
         * */
        /* *
         *
         * API Options
         *
         * */
        /**
         * A `hollowcandlestick` series. If the [type](#series.candlestick.type)
         * option is not specified, it is inherited from [chart.type](
         * #chart.type).
         *
         * @type      {*}
         * @extends   series,plotOptions.hollowcandlestick
         * @excluding dataParser, dataURL, marker
         * @product   highstock
         * @apioption series.hollowcandlestick
         */
        /**
         * An array of data points for the series. For the `hollowcandlestick` series
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
         *    [turboThreshold](#series.hollowcandlestick.turboThreshold), this option is not
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
         * @extends   series.candlestick.data
         * @excluding y
         * @product   highstock
         * @apioption series.hollowcandlestick.data
         */
        ''; // Adds doclets above to transpiled

        return HollowCandlestickSeries;
    });
    _registerModule(_modules, 'masters/modules/hollowcandlestick.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));