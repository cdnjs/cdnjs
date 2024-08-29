/**
 * @license Highstock JS v11.4.8 (2024-08-29)
 *
 * HeikinAshi series type for Highcharts Stock
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
        define('highcharts/modules/heikinashi', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
                Highcharts.win.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Series/HeikinAshi/HeikinAshiPoint.js', [_modules['Core/Series/SeriesRegistry.js']], function (SeriesRegistry) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { candlestick: { prototype: { pointClass: CandlestickPoint } }, hlc: { prototype: { 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        pointClass: HLCPoint } } } = SeriesRegistry.seriesTypes;
        /* *
         *
         *  Class
         *
         * */
        class HeikinAshiPoint extends CandlestickPoint {
        }
        /* *
         *
         *  Default Export
         *
         * */

        return HeikinAshiPoint;
    });
    _registerModule(_modules, 'Series/HeikinAshi/HeikinAshiSeriesDefaults.js', [], function () {
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
         * An HeikinAshi series is a style of financial chart used to describe price
         * movements over time. It displays open, high, low and close values per
         * data point.
         *
         * @sample stock/demo/heikinashi/
         *         Heikin Ashi series
         *
         * @extends      plotOptions.candlestick
         * @product      highstock
         * @requires     modules/heikinashi
         * @optionparent plotOptions.heikinashi
         */
        const HeikinAshiDefaults = {
            dataGrouping: {
                groupAll: true
            }
        };
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
        ''; // Adds doclets above to transpiled
        /* *
         *
         *  Default Export
         *
         * */

        return HeikinAshiDefaults;
    });
    _registerModule(_modules, 'Series/HeikinAshi/HeikinAshiSeries.js', [_modules['Core/Globals.js'], _modules['Series/HeikinAshi/HeikinAshiPoint.js'], _modules['Series/HeikinAshi/HeikinAshiSeriesDefaults.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (H, HeikinAshiPoint, HeikinAshiSeriesDefaults, SeriesRegistry, U) {
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
        const { candlestick: CandlestickSeries } = SeriesRegistry.seriesTypes;
        const { addEvent, merge, pushUnique } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * After processing and grouping the data, calculate how the heikeinashi data
         * set should look like.
         * @private
         */
        function onAxisPostProcessData() {
            const series = this.series;
            series.forEach((series) => {
                if (series.is('heikinashi')) {
                    const heikinashiSeries = series;
                    heikinashiSeries.heikiashiData.length = 0;
                    heikinashiSeries.getHeikinashiData();
                }
            });
        }
        /**
         * Assign heikinashi data into the points.
         * @private
         * @todo move to HeikinAshiPoint class
         */
        function onHeikinAshiSeriesAfterTranslate() {
            const series = this, points = series.points, heikiashiData = series.heikiashiData, cropStart = series.cropStart || 0;
            // Reset the processed data.
            series.processedYData.length = 0;
            // Modify points.
            for (let i = 0; i < points.length; i++) {
                const point = points[i], heikiashiDataPoint = heikiashiData[i + cropStart];
                point.open = heikiashiDataPoint[0];
                point.high = heikiashiDataPoint[1];
                point.low = heikiashiDataPoint[2];
                point.close = heikiashiDataPoint[3];
                series.processedYData.push([point.open, point.high, point.low, point.close]);
            }
        }
        /**
         * Force to recalculate the heikinashi data set after updating data.
         * @private
         */
        function onHeikinAshiSeriesUpdatedData() {
            if (this.heikiashiData.length) {
                this.heikiashiData.length = 0;
            }
        }
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
        class HeikinAshiSeries extends CandlestickSeries {
            constructor() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                super(...arguments);
                this.heikiashiData = [];
            }
            /* *
             *
             *  Static Functions
             *
             * */
            static compose(SeriesClass, AxisClass) {
                CandlestickSeries.compose(SeriesClass);
                if (pushUnique(composed, 'HeikinAshi')) {
                    addEvent(AxisClass, 'postProcessData', onAxisPostProcessData);
                    addEvent(HeikinAshiSeries, 'afterTranslate', onHeikinAshiSeriesAfterTranslate);
                    addEvent(HeikinAshiSeries, 'updatedData', onHeikinAshiSeriesUpdatedData);
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Calculate data set for the heikinashi series before creating the points.
             * @private
             */
            getHeikinashiData() {
                const series = this, processedYData = series.allGroupedData || series.yData, heikiashiData = series.heikiashiData;
                if (!heikiashiData.length && processedYData && processedYData.length) {
                    // Cast to `any` in order to avoid checks before calculation.
                    // Adding null doesn't change anything.
                    const firstPoint = processedYData[0];
                    // Modify the first point.
                    this.modifyFirstPointValue(firstPoint);
                    // Modify other points.
                    for (let i = 1; i < processedYData.length; i++) {
                        const dataPoint = processedYData[i], previousDataPoint = heikiashiData[i - 1];
                        this.modifyDataPoint(dataPoint, previousDataPoint);
                    }
                }
                series.heikiashiData = heikiashiData;
            }
            /**
             * @private
             */
            init() {
                super.init.apply(this, arguments);
                this.heikiashiData = [];
            }
            /**
             * Calculate and modify the first data point value.
             * @private
             * @param {Array<(number)>} dataPoint
             *        Current data point.
             */
            modifyFirstPointValue(dataPoint) {
                const open = (dataPoint[0] +
                    dataPoint[1] +
                    dataPoint[2] +
                    dataPoint[3]) / 4, close = (dataPoint[0] + dataPoint[3]) / 2;
                this.heikiashiData.push([open, dataPoint[1], dataPoint[2], close]);
            }
            /**
             * Calculate and modify the data point's value.
             * @private
             * @param {Array<(number)>} dataPoint
             *        Current data point.
             * @param {Array<(number)>} previousDataPoint
             *        Previous data point.
             */
            modifyDataPoint(dataPoint, previousDataPoint) {
                const newOpen = (previousDataPoint[0] + previousDataPoint[3]) / 2, newClose = (dataPoint[0] +
                    dataPoint[1] +
                    dataPoint[2] +
                    dataPoint[3]) / 4, newHigh = Math.max(dataPoint[1], newClose, newOpen), newLow = Math.min(dataPoint[2], newClose, newOpen);
                // Add new points to the array in order to properly calculate extremes.
                this.heikiashiData.push([newOpen, newHigh, newLow, newClose]);
            }
        }
        HeikinAshiSeries.defaultOptions = merge(CandlestickSeries.defaultOptions, HeikinAshiSeriesDefaults);
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

        return HeikinAshiSeries;
    });
    _registerModule(_modules, 'masters/modules/heikinashi.src.js', [_modules['Core/Globals.js'], _modules['Series/HeikinAshi/HeikinAshiSeries.js']], function (Highcharts, HeikinAshiSeries) {

        const G = Highcharts;
        HeikinAshiSeries.compose(G.Series, G.Axis);

        return Highcharts;
    });
}));
