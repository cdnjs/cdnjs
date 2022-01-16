/**
 * @license Highstock JS v9.3.2 (2021-11-29)
 *
 * HeikinAshi series type for Highcharts Stock
 *
 * (c) 2010-2021 Karol Kolodziej
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/heikinashi', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);
        }
    }
    _registerModule(_modules, 'Series/HeikinAshi/HeikinAshiPoint.js', [_modules['Core/Series/SeriesRegistry.js']], function (SeriesRegistry) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        /* *
         *
         *  Imports
         *
         * */
        var CandlestickSeries = SeriesRegistry.seriesTypes.candlestick;
        /* *
         *
         *  Class
         *
         * */
        var HeikinAshiPoint = /** @class */ (function (_super) {
                __extends(HeikinAshiPoint, _super);
            function HeikinAshiPoint() {
                /* *
                 *
                 *  Properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                _this.series = void 0;
                return _this;
                /* *
                 *
                 *  Functions
                 *
                 * */
            }
            return HeikinAshiPoint;
        }(CandlestickSeries.prototype.pointClass));
        /* *
         *
         *  Default Export
         *
         * */

        return HeikinAshiPoint;
    });
    _registerModule(_modules, 'Series/HeikinAshi/HeikinAshiSeries.js', [_modules['Series/HeikinAshi/HeikinAshiPoint.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js'], _modules['Core/Axis/Axis.js']], function (HeikinAshiPoint, SeriesRegistry, U, Axis) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var CandlestickSeries = SeriesRegistry.seriesTypes.candlestick;
        var addEvent = U.addEvent,
            merge = U.merge;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The Heikin Ashi series.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.heikinashi
         *
         * @augments Highcharts.Series
         */
        var HeikinAshiSeries = /** @class */ (function (_super) {
                __extends(HeikinAshiSeries, _super);
            function HeikinAshiSeries() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                /* *
                 *
                 *  Properties
                 *
                 * */
                _this.data = void 0;
                _this.heikiashiData = [];
                _this.options = void 0;
                _this.points = void 0;
                _this.yData = void 0;
                _this.processedYData = void 0;
                return _this;
                /* eslint-enable valid-jsdoc */
            }
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * Calculate data set for the heikinashi series before creating the points.
             * @private
             *
             * @function Highcharts.seriesTypes.heikinashi#getHeikinashiData
             *
             *
             */
            HeikinAshiSeries.prototype.getHeikinashiData = function () {
                var series = this,
                    processedYData = series.allGroupedData || series.yData,
                    heikiashiData = series.heikiashiData;
                if (!heikiashiData.length && processedYData && processedYData.length) {
                    // Cast to `any` in order to avoid checks before calculation.
                    // Adding null doesn't change anything.
                    var firstPoint = processedYData[0];
                    // Modify the first point.
                    this.modifyFirstPointValue(firstPoint);
                    // Modify other points.
                    for (var i = 1; i < processedYData.length; i++) {
                        var dataPoint = processedYData[i],
                            previousDataPoint = heikiashiData[i - 1];
                        this.modifyDataPoint(dataPoint, previousDataPoint);
                    }
                }
                series.heikiashiData = heikiashiData;
            };
            /**
             * @private
             * @function Highcarts.seriesTypes.heikinashi#init
             */
            HeikinAshiSeries.prototype.init = function () {
                _super.prototype.init.apply(this, arguments);
                this.heikiashiData = [];
            };
            /**
             * Calculate and modify the first data point value.
             * @private
             *
             * @function Highcharts.seriesTypes.heikinashi#modifyFirstPointValue
             *
             * @param {Array<(number)>} dataPoint
             *        Current data point.
             *
             *
             */
            HeikinAshiSeries.prototype.modifyFirstPointValue = function (dataPoint) {
                var open = (dataPoint[0] +
                        dataPoint[1] +
                        dataPoint[2] +
                        dataPoint[3]) / 4,
                    close = (dataPoint[0] + dataPoint[3]) / 2;
                this.heikiashiData.push([open, dataPoint[1], dataPoint[2], close]);
            };
            /**
             * Calculate and modify the data point's value.
             * @private
             *
             * @function Highcharts.seriesTypes.heikinashi#modifyDataPoint
             *
             * @param {Array<(number)>} dataPoint
             *        Current data point.
             *
             * @param {Array<(number)>} previousDataPoint
             *        Previous data point.
             *
             *
             */
            HeikinAshiSeries.prototype.modifyDataPoint = function (dataPoint, previousDataPoint) {
                var newOpen = (previousDataPoint[0] + previousDataPoint[3]) / 2,
                    newClose = (dataPoint[0] +
                        dataPoint[1] +
                        dataPoint[2] +
                        dataPoint[3]) / 4,
                    newHigh = Math.max(dataPoint[1],
                    newClose,
                    newOpen),
                    newLow = Math.min(dataPoint[2],
                    newClose,
                    newOpen);
                // Add new points to the array in order to properly calculate extremes.
                this.heikiashiData.push([newOpen, newHigh, newLow, newClose]);
            };
            /**
             * An HeikinAshi series is a style of financial chart used to describe price
             * movements over time. It displays open, high, low and close values per
             * data point.
             *
             * @sample stock/demo/heikinashi/
             *         Heikin Ashi series
             *
             * @extends      plotOptions.candlestick
             * @product      highstock
             * @requires  modules/heikinashi
             * @optionparent plotOptions.heikinashi
             */
            HeikinAshiSeries.defaultOptions = merge(CandlestickSeries.defaultOptions, {
                dataGrouping: {
                    groupAll: true
                }
            });
            return HeikinAshiSeries;
        }(CandlestickSeries));
        // Assign haikinashi data into the points.
        addEvent(HeikinAshiSeries, 'afterTranslate', function () {
            var series = this,
                points = series.points,
                heikiashiData = series.heikiashiData,
                cropStart = series.cropStart || 0;
            // Reset the proccesed data.
            series.processedYData.length = 0;
            // Modify points.
            for (var i = 0; i < points.length; i++) {
                var point = points[i],
                    heikiashiDataPoint = heikiashiData[i + cropStart];
                point.open = heikiashiDataPoint[0];
                point.high = heikiashiDataPoint[1];
                point.low = heikiashiDataPoint[2];
                point.close = heikiashiDataPoint[3];
                series.processedYData.push([point.open, point.high, point.low, point.close]);
            }
        });
        // Force to recalculate the heikinashi data set after updating data.
        addEvent(HeikinAshiSeries, 'updatedData', function () {
            if (this.heikiashiData.length) {
                this.heikiashiData.length = 0;
            }
        });
        // After processing and grouping the data,
        // calculate how the heikeinashi data set should look like.
        addEvent(Axis, 'postProcessData', function () {
            var series = this.series;
            series.forEach(function (series) {
                if (series.is('heikinashi')) {
                    var heikinashiSeries = series;
                    heikinashiSeries.heikiashiData.length = 0;
                    heikinashiSeries.getHeikinashiData();
                }
            });
        });
        /* *
         *
         *  Class Prototype
         *
         * */
        HeikinAshiSeries.prototype.pointClass = HeikinAshiPoint;
        SeriesRegistry.registerSeriesType('heikinashi', HeikinAshiSeries);
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
         * A `heikinashi` series. If the [type](#series.heikinashi.type)
         * option is not specified, it is inherited from [chart.type](
         * #chart.type).
         *
         * @type      {*}
         * @extends   series,plotOptions.heikinashi
         * @excluding dataParser, dataURL, marker
         * @product   highstock
         * @requires  modules/heikinashi
         * @apioption series.heikinashi
         */
        /**
         * An array of data points for the series. For the `heikinashi` series
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
         *    [turboThreshold](#series.heikinashi.turboThreshold), this option is not
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
         * @apioption series.heikinashi.data
         */
        ''; // adds doclets above to transpilat

        return HeikinAshiSeries;
    });
    _registerModule(_modules, 'masters/modules/heikinashi.src.js', [], function () {


    });
}));