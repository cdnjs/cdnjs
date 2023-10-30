/**
 * @license Highcharts JS v11.2.0 (2023-10-30)
 *
 * Vector plot series module
 *
 * (c) 2010-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/vector', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'Series/Vector/VectorSeriesDefaults.js', [], function () {
        /* *
         *
         *  Vector plot series module
         *
         *  (c) 2010-2021 Torstein Honsi
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
         * A vector plot is a type of cartesian chart where each point has an X and
         * Y position, a length and a direction. Vectors are drawn as arrows.
         *
         * @sample {highcharts|highstock} highcharts/demo/vector-plot/
         *         Vector pot
         *
         * @since        6.0.0
         * @extends      plotOptions.scatter
         * @excluding    boostThreshold, marker, connectEnds, connectNulls,
         *               cropThreshold, dashStyle, dragDrop, gapSize, gapUnit,
         *               dataGrouping, linecap, shadow, stacking, step, jitter,
         *               boostBlending
         * @product      highcharts highstock
         * @requires     modules/vector
         * @optionparent plotOptions.vector
         */
        const VectorSeriesDefaults = {
            /**
             * The line width for each vector arrow.
             */
            lineWidth: 2,
            marker: void 0,
            /**
             * What part of the vector it should be rotated around. Can be one of
             * `start`, `center` and `end`. When `start`, the vectors will start
             * from the given [x, y] position, and when `end` the vectors will end
             * in the [x, y] position.
             *
             * @sample highcharts/plotoptions/vector-rotationorigin-start/
             *         Rotate from start
             *
             * @validvalue ["start", "center", "end"]
             */
            rotationOrigin: 'center',
            states: {
                hover: {
                    /**
                     * Additonal line width for the vector errors when they are
                     * hovered.
                     */
                    lineWidthPlus: 1
                }
            },
            tooltip: {
                /**
                 * @default [{point.x}, {point.y}] Length: {point.length} Direction: {point.direction}°
                 */
                pointFormat: '<b>[{point.x}, {point.y}]</b><br/>Length: <b>{point.length}</b><br/>Direction: <b>{point.direction}\u00B0</b><br/>'
            },
            /**
             * Maximum length of the arrows in the vector plot. The individual arrow
             * length is computed between 0 and this value.
             */
            vectorLength: 20
        };
        /**
         * A `vector` series. If the [type](#series.vector.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.vector
         * @excluding dataParser, dataURL, boostThreshold, boostBlending
         * @product   highcharts highstock
         * @requires  modules/vector
         * @apioption series.vector
         */
        /**
         * An array of data points for the series. For the `vector` series type,
         * points can be given in the following ways:
         *
         * 1. An array of arrays with 4 values. In this case, the values correspond to
         *    to `x,y,length,direction`. If the first value is a string, it is applied
         *    as the name of the point, and the `x` value is inferred.
         *    ```js
         *    data: [
         *        [0, 0, 10, 90],
         *        [0, 1, 5, 180],
         *        [1, 1, 2, 270]
         *    ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.area.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 0,
         *        y: 0,
         *        name: "Point2",
         *        length: 10,
         *        direction: 90
         *    }, {
         *        x: 1,
         *        y: 1,
         *        name: "Point1",
         *        direction: 270
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<Array<(number|string),number,number,number>|*>}
         * @extends   series.line.data
         * @product   highcharts highstock
         * @apioption series.vector.data
         */
        /**
         * The length of the vector. The rendered length will relate to the
         * `vectorLength` setting.
         *
         * @type      {number}
         * @product   highcharts highstock
         * @apioption series.vector.data.length
         */
        /**
         * The vector direction in degrees, where 0 is north (pointing towards south).
         *
         * @type      {number}
         * @product   highcharts highstock
         * @apioption series.vector.data.direction
         */
        ''; // adds doclets above to the transpiled file
        /* *
         *
         *  Default Export
         *
         * */

        return VectorSeriesDefaults;
    });
    _registerModule(_modules, 'Series/Vector/VectorSeries.js', [_modules['Core/Animation/AnimationUtilities.js'], _modules['Core/Globals.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js'], _modules['Series/Vector/VectorSeriesDefaults.js']], function (A, H, SeriesRegistry, U, VectorSeriesDefaults) {
        /* *
         *
         *  Vector plot series module
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { animObject } = A;
        const { series: Series, seriesTypes: { scatter: ScatterSeries } } = SeriesRegistry;
        const { arrayMax, extend, merge, pick } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The vector series class.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.vector
         *
         * @augments Highcharts.seriesTypes.scatter
         */
        class VectorSeries extends ScatterSeries {
            constructor() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                super(...arguments);
                /* *
                 *
                 *  Properties
                 *
                 * */
                this.data = void 0;
                this.lengthMax = void 0;
                this.options = void 0;
                this.points = void 0;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Fade in the arrows on initializing series.
             * @private
             */
            animate(init) {
                if (init) {
                    this.markerGroup.attr({
                        opacity: 0.01
                    });
                }
                else {
                    this.markerGroup.animate({
                        opacity: 1
                    }, animObject(this.options.animation));
                }
            }
            /**
             * Create a single arrow. It is later rotated around the zero
             * centerpoint.
             * @private
             */
            arrow(point) {
                const fraction = point.length / this.lengthMax, u = fraction * this.options.vectorLength / 20, o = {
                    start: 10 * u,
                    center: 0,
                    end: -10 * u
                }[this.options.rotationOrigin] || 0, 
                // The stem and the arrow head. Draw the arrow first with rotation
                // 0, which is the arrow pointing down (vector from north to south).
                path = [
                    ['M', 0, 7 * u + o],
                    ['L', -1.5 * u, 7 * u + o],
                    ['L', 0, 10 * u + o],
                    ['L', 1.5 * u, 7 * u + o],
                    ['L', 0, 7 * u + o],
                    ['L', 0, -10 * u + o] // top
                ];
                return path;
            }
            /*
            drawLegendSymbol: function (legend, item) {
                let options = legend.options,
                    symbolHeight = legend.symbolHeight,
                    square = options.squareSymbol,
                    symbolWidth = square ? symbolHeight : legend.symbolWidth,
                    path = this.arrow.call({
                        lengthMax: 1,
                        options: {
                            vectorLength: symbolWidth
                        }
                    }, {
                        length: 1
                    });
                legendItem.line = this.chart.renderer.path(path)
                .addClass('highcharts-point')
                .attr({
                    zIndex: 3,
                    translateY: symbolWidth / 2,
                    rotation: 270,
                    'stroke-width': 1,
                    'stroke': 'black'
                }).add(item.legendItem.group);
            },
            */
            /**
             * @private
             */
            drawPoints() {
                const chart = this.chart;
                for (const point of this.points) {
                    const plotX = point.plotX, plotY = point.plotY;
                    if (this.options.clip === false ||
                        chart.isInsidePlot(plotX, plotY, { inverted: chart.inverted })) {
                        if (!point.graphic) {
                            point.graphic = this.chart.renderer
                                .path()
                                .add(this.markerGroup)
                                .addClass('highcharts-point ' +
                                'highcharts-color-' +
                                pick(point.colorIndex, point.series.colorIndex));
                        }
                        point.graphic
                            .attr({
                            d: this.arrow(point),
                            translateX: plotX,
                            translateY: plotY,
                            rotation: point.direction
                        });
                        if (!this.chart.styledMode) {
                            point.graphic
                                .attr(this.pointAttribs(point));
                        }
                    }
                    else if (point.graphic) {
                        point.graphic = point.graphic.destroy();
                    }
                }
            }
            /**
             * Get presentational attributes.
             * @private
             */
            pointAttribs(point, state) {
                const options = this.options;
                let stroke = point?.color || this.color, strokeWidth = this.options.lineWidth;
                if (state) {
                    stroke = options.states[state].color || stroke;
                    strokeWidth =
                        (options.states[state].lineWidth || strokeWidth) +
                            (options.states[state].lineWidthPlus || 0);
                }
                return {
                    'stroke': stroke,
                    'stroke-width': strokeWidth
                };
            }
            /**
             * @private
             */
            translate() {
                Series.prototype.translate.call(this);
                this.lengthMax = arrayMax(this.lengthData);
            }
        }
        VectorSeries.defaultOptions = merge(ScatterSeries.defaultOptions, VectorSeriesDefaults);
        extend(VectorSeries.prototype, {
            /**
             * @ignore
             * @deprecated
             */
            drawGraph: H.noop,
            /**
             * @ignore
             * @deprecated
             */
            getSymbol: H.noop,
            /**
             * @ignore
             * @deprecated
             */
            markerAttribs: H.noop,
            parallelArrays: ['x', 'y', 'length', 'direction'],
            pointArrayMap: ['y', 'length', 'direction']
        });
        SeriesRegistry.registerSeriesType('vector', VectorSeries);
        /* *
         *
         *  Default Export
         *
         * */

        return VectorSeries;
    });
    _registerModule(_modules, 'masters/modules/vector.src.js', [], function () {


    });
}));