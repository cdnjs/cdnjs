/**
 * @license Highcharts Gantt JS v11.2.0 (2023-10-30)
 *
 * StaticScale
 *
 * (c) 2016-2021 Torstein Honsi, Lars A. V. Cabrera
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/static-scale', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'Extensions/StaticScale.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2016-2021 Torstein Honsi, Lars Cabrera
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = U.addEvent,
            defined = U.defined,
            isNumber = U.isNumber,
            pick = U.pick,
            pushUnique = U.pushUnique;
        /* *
         *
         *  Constants
         *
         * */
        var composedMembers = [];
        /* *
         *
         *  Composition
         *
         * */
        /** @private */
        function compose(AxisClass, ChartClass) {
            if (pushUnique(composedMembers, AxisClass)) {
                addEvent(AxisClass, 'afterSetOptions', onAxisAfterSetOptions);
            }
            if (pushUnique(composedMembers, ChartClass)) {
                var chartProto = ChartClass.prototype;
                chartProto.adjustHeight = chartAdjustHeight;
                addEvent(ChartClass, 'render', chartProto.adjustHeight);
            }
        }
        /** @private */
        function onAxisAfterSetOptions() {
            var chartOptions = this.chart.options.chart;
            if (!this.horiz &&
                isNumber(this.options.staticScale) &&
                (!chartOptions.height ||
                    (chartOptions.scrollablePlotArea &&
                        chartOptions.scrollablePlotArea.minHeight))) {
                this.staticScale = this.options.staticScale;
            }
        }
        /** @private */
        function chartAdjustHeight() {
            var chart = this;
            if (chart.redrawTrigger !== 'adjustHeight') {
                var _loop_1 = function (axis) {
                        var chart_1 = axis.chart,
                    animate = !!chart_1.initiatedScale &&
                            chart_1.options.animation,
                    staticScale = axis.options.staticScale;
                    if (axis.staticScale && defined(axis.min)) {
                        var height = pick(axis.brokenAxis && axis.brokenAxis.unitLength,
                            axis.max + axis.tickInterval - axis.min) * staticScale;
                        // Minimum height is 1 x staticScale.
                        height = Math.max(height, staticScale);
                        var diff = height - chart_1.plotHeight;
                        if (!chart_1.scrollablePixelsY && Math.abs(diff) >= 1) {
                            chart_1.plotHeight = height;
                            chart_1.redrawTrigger = 'adjustHeight';
                            chart_1.setSize(void 0, chart_1.chartHeight + diff, animate);
                        }
                        // Make sure clip rects have the right height before initial
                        // animation.
                        axis.series.forEach(function (series) {
                            var clipRect = series.sharedClipKey &&
                                    chart_1.sharedClips[series.sharedClipKey];
                            if (clipRect) {
                                clipRect.attr(chart_1.inverted ? {
                                    width: chart_1.plotHeight
                                } : {
                                    height: chart_1.plotHeight
                                });
                            }
                        });
                    }
                };
                for (var _i = 0, _a = (chart.axes || []); _i < _a.length; _i++) {
                    var axis = _a[_i];
                    _loop_1(axis);
                }
                this.initiatedScale = true;
            }
            this.redrawTrigger = null;
        }
        /* *
         *
         *  Default Export
         *
         * */
        var StaticScale = {
                compose: compose
            };
        /* *
         *
         *  API Options
         *
         * */
        /**
         * For vertical axes only. Setting the static scale ensures that each tick unit
         * is translated into a fixed pixel height. For example, setting the static
         * scale to 24 results in each Y axis category taking up 24 pixels, and the
         * height of the chart adjusts. Adding or removing items will make the chart
         * resize.
         *
         * @sample gantt/xrange-series/demo/
         *         X-range series with static scale
         *
         * @type      {number}
         * @default   50
         * @since     6.2.0
         * @product   gantt
         * @apioption yAxis.staticScale
         */
        ''; // keeps doclets above in JS file

        return StaticScale;
    });
    _registerModule(_modules, 'masters/modules/static-scale.src.js', [_modules['Core/Globals.js'], _modules['Extensions/StaticScale.js']], function (Highcharts, StaticScale) {

        var G = Highcharts;
        StaticScale.compose(G.Axis, G.Chart);

    });
}));