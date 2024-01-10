/**
 * @license Highcharts Gantt JS v11.3.0 (2024-01-10)
 *
 * StaticScale
 *
 * (c) 2016-2024 Torstein Honsi, Lars A. V. Cabrera
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
    _registerModule(_modules, 'Extensions/StaticScale.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2016-2024 Torstein Honsi, Lars Cabrera
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { composed } = H;
        const { addEvent, defined, isNumber, pick, pushUnique } = U;
        /* *
         *
         *  Composition
         *
         * */
        /** @private */
        function compose(AxisClass, ChartClass) {
            if (pushUnique(composed, compose)) {
                const chartProto = ChartClass.prototype;
                addEvent(AxisClass, 'afterSetOptions', onAxisAfterSetOptions);
                chartProto.adjustHeight = chartAdjustHeight;
                addEvent(ChartClass, 'render', chartProto.adjustHeight);
            }
        }
        /** @private */
        function onAxisAfterSetOptions() {
            const chartOptions = this.chart.options.chart;
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
            const chart = this;
            if (chart.redrawTrigger !== 'adjustHeight') {
                for (const axis of (chart.axes || [])) {
                    const chart = axis.chart, animate = !!chart.initiatedScale &&
                        chart.options.animation, staticScale = axis.options.staticScale;
                    if (axis.staticScale && defined(axis.min)) {
                        let height = pick(axis.brokenAxis && axis.brokenAxis.unitLength, axis.max + axis.tickInterval - axis.min) * staticScale;
                        // Minimum height is 1 x staticScale.
                        height = Math.max(height, staticScale);
                        let diff = height - chart.plotHeight;
                        if (!chart.scrollablePixelsY && Math.abs(diff) >= 1) {
                            chart.plotHeight = height;
                            chart.redrawTrigger = 'adjustHeight';
                            chart.setSize(void 0, chart.chartHeight + diff, animate);
                        }
                        // Make sure clip rects have the right height before initial
                        // animation.
                        axis.series.forEach(function (series) {
                            const clipRect = series.sharedClipKey &&
                                chart.sharedClips[series.sharedClipKey];
                            if (clipRect) {
                                clipRect.attr(chart.inverted ? {
                                    width: chart.plotHeight
                                } : {
                                    height: chart.plotHeight
                                });
                            }
                        });
                    }
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
        const StaticScale = {
            compose
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

        const G = Highcharts;
        StaticScale.compose(G.Axis, G.Chart);

    });
}));