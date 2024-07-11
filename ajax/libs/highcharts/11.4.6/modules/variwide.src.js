/**
 * @license Highcharts JS v11.4.6 (2024-07-08)
 *
 * Highcharts variwide module
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
        define('highcharts/modules/variwide', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'Series/Variwide/VariwideComposition.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  Highcharts variwide module
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { composed } = H;
        const { addEvent, pushUnique, wrap } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function compose(AxisClass, TickClass) {
            if (pushUnique(composed, 'Variwide')) {
                const tickProto = TickClass.prototype;
                addEvent(AxisClass, 'afterDrawCrosshair', onAxisAfterDrawCrosshair);
                addEvent(AxisClass, 'afterRender', onAxisAfterRender);
                addEvent(TickClass, 'afterGetPosition', onTickAfterGetPosition);
                tickProto.postTranslate = tickPostTranslate;
                wrap(tickProto, 'getLabelPosition', wrapTickGetLabelPosition);
            }
        }
        /**
         * Same width as the category (#8083)
         * @private
         */
        function onAxisAfterDrawCrosshair(e) {
            if (this.variwide && this.cross) {
                this.cross.attr('stroke-width', (e.point && e.point.crosshairWidth));
            }
        }
        /**
         * On a vertical axis, apply anti-collision logic to the labels.
         * @private
         */
        function onAxisAfterRender() {
            const axis = this;
            if (this.variwide) {
                this.chart.labelCollectors.push(function () {
                    return axis.tickPositions
                        .filter((pos) => !!axis.ticks[pos].label)
                        .map((pos, i) => {
                        const label = axis.ticks[pos].label;
                        label.labelrank = axis.zData[i];
                        return label;
                    });
                });
            }
        }
        /**
         * @private
         */
        function onTickAfterGetPosition(e) {
            const axis = this.axis, xOrY = axis.horiz ? 'x' : 'y';
            if (axis.variwide) {
                this[xOrY + 'Orig'] = e.pos[xOrY];
                this.postTranslate(e.pos, xOrY, this.pos);
            }
        }
        /**
         * @private
         */
        function tickPostTranslate(xy, xOrY, index) {
            const axis = this.axis;
            let pos = xy[xOrY] - axis.pos;
            if (!axis.horiz) {
                pos = axis.len - pos;
            }
            pos = axis.series[0].postTranslate(index, pos);
            if (!axis.horiz) {
                pos = axis.len - pos;
            }
            xy[xOrY] = axis.pos + pos;
        }
        /**
         * @private
         */
        function wrapTickGetLabelPosition(proceed, _x, _y, _label, horiz, 
        /* eslint-disable @typescript-eslint/no-unused-vars */
        _labelOptions, _tickmarkOffset, _index
        /* eslint-enable @typescript-eslint/no-unused-vars */
        ) {
            const args = Array.prototype.slice.call(arguments, 1), xOrY = horiz ? 'x' : 'y';
            // Replace the x with the original x
            if (this.axis.variwide &&
                typeof this[xOrY + 'Orig'] === 'number') {
                args[horiz ? 0 : 1] = this[xOrY + 'Orig'];
            }
            const xy = proceed.apply(this, args);
            // Post-translate
            if (this.axis.variwide && this.axis.categories) {
                this.postTranslate(xy, xOrY, this.pos);
            }
            return xy;
        }
        /* *
         *
         *  Default Export
         *
         * */
        const VariwideComposition = {
            compose
        };

        return VariwideComposition;
    });
    _registerModule(_modules, 'Series/Variwide/VariwidePoint.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  Highcharts variwide module
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
        class VariwidePoint extends ColumnPoint {
            /* *
             *
             *  Functions
             *
             * */
            isValid() {
                return isNumber(this.y) && isNumber(this.z);
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return VariwidePoint;
    });
    _registerModule(_modules, 'Series/Variwide/VariwideSeriesDefaults.js', [], function () {
        /* *
         *
         *  Highcharts variwide module
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
         * A variwide chart (related to marimekko chart) is a column chart with a
         * variable width expressing a third dimension.
         *
         * @sample {highcharts} highcharts/demo/variwide/
         *         Variwide chart
         * @sample {highcharts} highcharts/series-variwide/inverted/
         *         Inverted variwide chart
         * @sample {highcharts} highcharts/series-variwide/datetime/
         *         Variwide columns on a datetime axis
         *
         * @extends      plotOptions.column
         * @since        6.0.0
         * @product      highcharts
         * @excluding    boostThreshold, crisp, depth, edgeColor, edgeWidth,
         *               groupZPadding, boostBlending
         * @requires     modules/variwide
         * @optionparent plotOptions.variwide
         */
        const VariwideSeriesDefaults = {
            /**
             * In a variwide chart, the point padding is 0 in order to express the
             * horizontal stacking of items.
             */
            pointPadding: 0,
            /**
             * In a variwide chart, the group padding is 0 in order to express the
             * horizontal stacking of items.
             */
            groupPadding: 0
        };
        /**
         * A `variwide` series. If the [type](#series.variwide.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.variwide
         * @excluding boostThreshold, boostBlending
         * @product   highcharts
         * @requires  modules/variwide
         * @apioption series.variwide
         */
        /**
         * An array of data points for the series. For the `variwide` series type,
         * points can be given in the following ways:
         *
         * 1. An array of arrays with 3 or 2 values. In this case, the values correspond
         *    to `x,y,z`. If the first value is a string, it is applied as the name of
         *    the point, and the `x` value is inferred. The `x` value can also be
         *    omitted, in which case the inner arrays should be of length 2. Then the
         *    `x` value is automatically calculated, either starting at 0 and
         *    incremented by 1, or from `pointStart` and `pointInterval` given in the
         *    series options.
         *    ```js
         *       data: [
         *           [0, 1, 2],
         *           [1, 5, 5],
         *           [2, 0, 2]
         *       ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.variwide.turboThreshold), this option is not
         *    available.
         *    ```js
         *       data: [{
         *           x: 1,
         *           y: 1,
         *           z: 1,
         *           name: "Point2",
         *           color: "#00FF00"
         *       }, {
         *           x: 1,
         *           y: 5,
         *           z: 4,
         *           name: "Point1",
         *           color: "#FF00FF"
         *       }]
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
         * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
         * @extends   series.line.data
         * @excluding marker
         * @product   highcharts
         * @apioption series.variwide.data
         */
        /**
         * The relative width for each column. On a category axis, the widths are
         * distributed so they sum up to the X axis length. On linear and datetime axes,
         * the columns will be laid out from the X value and Z units along the axis.
         *
         * @type      {number}
         * @product   highcharts
         * @apioption series.variwide.data.z
         */
        ''; // Adds doclets above to transpiled file
        /* *
         *
         *  Default Export
         *
         * */

        return VariwideSeriesDefaults;
    });
    _registerModule(_modules, 'Series/Variwide/VariwideSeries.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Series/Variwide/VariwideComposition.js'], _modules['Series/Variwide/VariwidePoint.js'], _modules['Series/Variwide/VariwideSeriesDefaults.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, VariwideComposition, VariwidePoint, VariwideSeriesDefaults, U) {
        /* *
         *
         *  Highcharts variwide module
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { column: ColumnSeries } = SeriesRegistry.seriesTypes;
        const { addEvent, crisp, extend, merge, pick } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @class
         * @name Highcharts.seriesTypes.variwide
         *
         * @augments Highcharts.Series
         */
        class VariwideSeries extends ColumnSeries {
            /* *
             *
             * Functions
             *
             * */
            processData(force) {
                this.totalZ = 0;
                this.relZ = [];
                SeriesRegistry.seriesTypes.column.prototype.processData.call(this, force);
                (this.xAxis.reversed ?
                    this.zData.slice().reverse() :
                    this.zData).forEach(function (z, i) {
                    this.relZ[i] = this.totalZ;
                    this.totalZ += z;
                }, this);
                if (this.xAxis.categories) {
                    this.xAxis.variwide = true;
                    this.xAxis.zData = this.zData; // Used for label rank
                }
                return;
            }
            /**
             * Translate an x value inside a given category index into the distorted
             * axis translation.
             *
             * @private
             * @function Highcharts.Series#postTranslate
             *
             * @param {number} index
             *        The category index
             *
             * @param {number} x
             *        The X pixel position in undistorted axis pixels
             *
             * @param {Highcharts.Point} point
             *        For crosshairWidth for every point
             *
             * @return {number}
             *         Distorted X position
             */
            postTranslate(index, x, point) {
                const axis = this.xAxis, relZ = this.relZ, i = axis.reversed ? relZ.length - index : index, goRight = axis.reversed ? -1 : 1, minPx = axis.toPixels(axis.reversed ?
                    (axis.dataMax || 0) + axis.pointRange :
                    (axis.dataMin || 0)), maxPx = axis.toPixels(axis.reversed ?
                    (axis.dataMin || 0) :
                    (axis.dataMax || 0) + axis.pointRange), len = Math.abs(maxPx - minPx), totalZ = this.totalZ, left = this.chart.inverted ?
                    maxPx - (this.chart.plotTop - goRight * axis.minPixelPadding) :
                    minPx - this.chart.plotLeft - goRight * axis.minPixelPadding, linearSlotLeft = i / relZ.length * len, linearSlotRight = (i + goRight) / relZ.length * len, slotLeft = (pick(relZ[i], totalZ) / totalZ) * len, slotRight = (pick(relZ[i + goRight], totalZ) / totalZ) * len, xInsideLinearSlot = (x - (left + linearSlotLeft));
                // Set crosshairWidth for every point (#8173)
                if (point) {
                    point.crosshairWidth = slotRight - slotLeft;
                }
                return left + slotLeft +
                    xInsideLinearSlot * (slotRight - slotLeft) /
                        (linearSlotRight - linearSlotLeft);
            }
            /* eslint-enable valid-jsdoc */
            translate() {
                // Temporarily disable crisping when computing original shapeArgs
                this.crispOption = this.options.crisp;
                this.options.crisp = false;
                super.translate();
                // Reset option
                this.options.crisp = this.crispOption;
            }
            /**
             * Function that corrects stack labels positions
             * @private
             */
            correctStackLabels() {
                const series = this, options = series.options, yAxis = series.yAxis;
                let pointStack, pointWidth, stack, xValue;
                for (const point of series.points) {
                    xValue = point.x;
                    pointWidth = point.shapeArgs.width;
                    stack = yAxis.stacking.stacks[(series.negStacks &&
                        point.y < (options.startFromThreshold ?
                            0 :
                            options.threshold) ?
                        '-' :
                        '') + series.stackKey];
                    if (stack) {
                        pointStack = stack[xValue];
                        if (pointStack && !point.isNull) {
                            pointStack.setOffset(-(pointWidth / 2) || 0, pointWidth || 0, void 0, void 0, point.plotX, series.xAxis);
                        }
                    }
                }
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        VariwideSeries.compose = VariwideComposition.compose;
        VariwideSeries.defaultOptions = merge(ColumnSeries.defaultOptions, VariwideSeriesDefaults);
        // Extend translation by distorting X position based on Z.
        addEvent(VariwideSeries, 'afterColumnTranslate', function () {
            // Temporarily disable crisping when computing original shapeArgs
            const xAxis = this.xAxis, inverted = this.chart.inverted;
            let i = -1;
            // Distort the points to reflect z dimension
            for (const point of this.points) {
                ++i;
                const shapeArgs = point.shapeArgs || {}, { x = 0, width = 0 } = shapeArgs, { plotX = 0, tooltipPos, z = 0 } = point;
                let left, right;
                if (xAxis.variwide) {
                    left = this.postTranslate(i, x, point);
                    right = this.postTranslate(i, x + width);
                    // For linear or datetime axes, the variwide column should start with X
                    // and extend Z units, without modifying the axis.
                }
                else {
                    left = plotX;
                    right = xAxis.translate(point.x + z, false, false, false, true);
                }
                if (this.crispOption) {
                    left = crisp(left, this.borderWidth);
                    right = crisp(right, this.borderWidth);
                }
                shapeArgs.x = left;
                shapeArgs.width = Math.max(right - left, 1);
                // Crosshair position (#8083)
                point.plotX = (left + right) / 2;
                // Adjust the tooltip position
                if (tooltipPos) {
                    if (!inverted) {
                        tooltipPos[0] = shapeArgs.x + shapeArgs.width / 2;
                    }
                    else {
                        tooltipPos[1] = xAxis.len - shapeArgs.x - shapeArgs.width / 2;
                    }
                }
            }
            if (this.options.stacking) {
                this.correctStackLabels();
            }
        }, { order: 2 });
        extend(VariwideSeries.prototype, {
            irregularWidths: true,
            pointArrayMap: ['y', 'z'],
            parallelArrays: ['x', 'y', 'z'],
            pointClass: VariwidePoint
        });
        SeriesRegistry.registerSeriesType('variwide', VariwideSeries);
        /* *
         *
         *  Default Export
         *
         * */

        return VariwideSeries;
    });
    _registerModule(_modules, 'masters/modules/variwide.src.js', [_modules['Core/Globals.js'], _modules['Series/Variwide/VariwideSeries.js']], function (Highcharts, VariwideSeries) {

        const G = Highcharts;
        VariwideSeries.compose(G.Axis, G.Tick);

        return Highcharts;
    });
}));
