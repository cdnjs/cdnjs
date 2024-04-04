/**
 * @license Highcharts JS v11.4.1 (2024-04-04)
 *
 * (c) 2009-2024 Sebastian Bochan, Rafal Sebestjanski
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/lollipop', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'Series/Lollipop/LollipopPoint.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { series: { prototype: { pointClass: Point } }, seriesTypes: { scatter: { prototype: { pointClass: ScatterPoint } }, dumbbell: { prototype: { pointClass: DumbbellPoint } } } } = SeriesRegistry;
        const { extend } = U;
        /* *
         *
         *  Class
         *
         * */
        class LollipopPoint extends Point {
        }
        extend(LollipopPoint.prototype, {
            destroy: DumbbellPoint.prototype.destroy,
            pointSetState: ScatterPoint.prototype.setState,
            setState: DumbbellPoint.prototype.setState
        });
        /* *
         *
         *  Default Export
         *
         * */

        return LollipopPoint;
    });
    _registerModule(_modules, 'Series/Lollipop/LollipopSeries.js', [_modules['Series/Lollipop/LollipopPoint.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Series/Series.js'], _modules['Core/Utilities.js']], function (LollipopPoint, SeriesRegistry, Series, U) {
        /* *
         *
         *  (c) 2010-2024 Sebastian Bochan, Rafal Sebestjanski
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { seriesTypes: { column: { prototype: colProto }, dumbbell: { prototype: dumbbellProto }, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        scatter: ScatterSeries } } = SeriesRegistry;
        const { extend, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Lollipop series type
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.lollipop
         *
         * @augments Highcharts.Series
         *
         */
        class LollipopSeries extends Series {
            /**
             * Extend the series' drawPoints method by applying a connector
             * and coloring markers.
             * @private
             *
             * @function Highcharts.Series#drawPoints
             */
            drawPoints() {
                const series = this, pointLength = series.points.length;
                let i = 0, point;
                super.drawPoints.apply(series, arguments);
                // Draw connectors
                while (i < pointLength) {
                    point = series.points[i];
                    series.drawConnector(point);
                    i++;
                }
            }
            /**
             * Extend the series' translate method to use grouping option.
             * @private
             *
             * @function Highcharts.Series#translate
             *
             */
            translate() {
                const series = this;
                colProto.translate.apply(series, arguments);
                // Correct x position
                for (const point of series.points) {
                    const { pointWidth, shapeArgs } = point;
                    if (shapeArgs?.x) {
                        shapeArgs.x += pointWidth / 2;
                        point.plotX = shapeArgs.x || 0;
                    }
                }
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * The lollipop series is a carteseian series with a line anchored from
         * the x axis and a dot at the end to mark the value.
         * Requires `highcharts-more.js`, `modules/dumbbell.js` and
         * `modules/lollipop.js`.
         *
         * @sample {highcharts} highcharts/demo/lollipop/
         *         Lollipop chart
         * @sample {highcharts} highcharts/series-dumbbell/styled-mode-dumbbell/
         *         Styled mode
         *
         * @extends      plotOptions.dumbbell
         * @product      highcharts highstock
         * @excluding    fillColor, fillOpacity, lineWidth, stack, stacking,
         *               lowColor, stickyTracking, trackByArea
         * @since        8.0.0
         * @optionparent plotOptions.lollipop
         */
        LollipopSeries.defaultOptions = merge(Series.defaultOptions, {
            /** @ignore-option */
            threshold: 0,
            /** @ignore-option */
            connectorWidth: 1,
            /** @ignore-option */
            groupPadding: 0.2,
            /**
             * Whether to group non-stacked lollipop points or to let them
             * render independent of each other. Non-grouped lollipop points
             * will be laid out individually and overlap each other.
             *
             * @sample highcharts/series-lollipop/enabled-grouping/
             *         Multiple lollipop series with grouping
             * @sample highcharts/series-lollipop/disabled-grouping/
             *         Multiple lollipop series with disabled grouping
             *
             * @type      {boolean}
             * @default   true
             * @since     8.0.0
             * @product   highcharts highstock
             * @apioption plotOptions.lollipop.grouping
             */
            /** @ignore-option */
            pointPadding: 0.1,
            /** @ignore-option */
            states: {
                hover: {
                    /** @ignore-option */
                    lineWidthPlus: 0,
                    /** @ignore-option */
                    connectorWidthPlus: 1,
                    /** @ignore-option */
                    halo: false
                }
            },
            /** @ignore-option */
            lineWidth: 0,
            dataLabels: {
                align: void 0,
                verticalAlign: void 0
            },
            pointRange: 1
        });
        extend(LollipopSeries.prototype, {
            alignDataLabel: colProto.alignDataLabel,
            crispCol: colProto.crispCol,
            drawConnector: dumbbellProto.drawConnector,
            drawDataLabels: colProto.drawDataLabels,
            getColumnMetrics: colProto.getColumnMetrics,
            getConnectorAttribs: dumbbellProto.getConnectorAttribs,
            pointClass: LollipopPoint
        });
        SeriesRegistry.registerSeriesType('lollipop', LollipopSeries);
        /* *
         *
         *  Default export
         *
         * */
        /**
         * The `lollipop` series. If the [type](#series.lollipop.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.lollipop
         * @excluding boostThreshold, boostBlending
         * @product   highcharts highstock
         * @requires  highcharts-more
         * @requires  modules/dumbbell
         * @requires  modules/lollipop
         * @apioption series.lollipop
         */
        /**
         * An array of data points for the series. For the `lollipop` series type,
         * points can be given in the following ways:
         *
         * 1. An array of numerical values. In this case, the numerical values will be
         *    interpreted as `y` options. The `x` values will be automatically
         *    calculated, either starting at 0 and incremented by 1, or from
         *    `pointStart` and `pointInterval` given in the series options. If the axis
         *    has categories, these will be used. Example:
         *    ```js
         *    data: [0, 5, 3, 5]
         *    ```
         *
         * 2. An array of arrays with 2 values. In this case, the values correspond to
         *    `x,y`. If the first value is a string, it is applied as the name of the
         *    point, and the `x` value is inferred.
         *    ```js
         *    data: [
         *        [0, 6],
         *        [1, 2],
         *        [2, 6]
         *    ]
         *    ```
         *
         * 3. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.lollipop.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        y: 9,
         *        name: "Point2",
         *        color: "#00FF00",
         *        connectorWidth: 3,
         *        connectorColor: "#FF00FF"
         *    }, {
         *        x: 1,
         *        y: 6,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/chart/reflow-true/
         *         Numerical values
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<number|Array<(number|string),(number|null)>|null|*>}
         * @extends   series.dumbbell.data
         * @excluding high, low, lowColor
         * @product   highcharts highstock
         * @apioption series.lollipop.data
         */
        /**
         * The y value of the point.
         *
         * @type      {number|null}
         * @product   highcharts highstock
         * @apioption series.line.data.y
         */
        (''); // Adds doclets above to transpiled file

        return LollipopSeries;
    });
    _registerModule(_modules, 'masters/modules/lollipop.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));