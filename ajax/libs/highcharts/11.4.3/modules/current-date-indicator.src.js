/**
 * @license Highcharts Gantt JS v11.4.3 (2024-05-22)
 *
 * CurrentDateIndicator
 *
 * (c) 2010-2024 Lars A. V. Cabrera
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/current-date-indicator', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'Extensions/CurrentDateIndication.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2016-2024 Highsoft AS
         *
         *  Author: Lars A. V. Cabrera
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { composed } = H;
        const { addEvent, merge, pushUnique, wrap } = U;
        /* *
         *
         *  Constants
         *
         * */
        /**
         * Show an indicator on the axis for the current date and time. Can be a
         * boolean or a configuration object similar to
         * [xAxis.plotLines](#xAxis.plotLines).
         *
         * @sample gantt/current-date-indicator/demo
         *         Current date indicator enabled
         * @sample gantt/current-date-indicator/object-config
         *         Current date indicator with custom options
         *
         * @declare   Highcharts.CurrentDateIndicatorOptions
         * @type      {boolean|CurrentDateIndicatorOptions}
         * @default   true
         * @extends   xAxis.plotLines
         * @excluding value
         * @product   gantt
         * @apioption xAxis.currentDateIndicator
         */
        const defaultOptions = {
            color: "#ccd3ff" /* Palette.highlightColor20 */,
            width: 2,
            /**
             * @declare Highcharts.AxisCurrentDateIndicatorLabelOptions
             */
            label: {
                /**
                 * Format of the label. This options is passed as the fist argument to
                 * [dateFormat](/class-reference/Highcharts.Time#dateFormat) function.
                 *
                 * @type      {string}
                 * @default   %a, %b %d %Y, %H:%M
                 * @product   gantt
                 * @apioption xAxis.currentDateIndicator.label.format
                 */
                format: '%a, %b %d %Y, %H:%M',
                formatter: function (value, format) {
                    return this.axis.chart.time.dateFormat(format || '', value);
                },
                rotation: 0,
                /**
                 * @type {Highcharts.CSSObject}
                 */
                style: {
                    /** @internal */
                    fontSize: '0.7em'
                }
            }
        };
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function compose(AxisClass, PlotLineOrBandClass) {
            if (pushUnique(composed, 'CurrentDateIndication')) {
                addEvent(AxisClass, 'afterSetOptions', onAxisAfterSetOptions);
                addEvent(PlotLineOrBandClass, 'render', onPlotLineOrBandRender);
                wrap(PlotLineOrBandClass.prototype, 'getLabelText', wrapPlotLineOrBandGetLabelText);
            }
        }
        /**
         * @private
         */
        function onAxisAfterSetOptions() {
            const options = this.options, cdiOptions = options.currentDateIndicator;
            if (cdiOptions) {
                const plotLineOptions = typeof cdiOptions === 'object' ?
                    merge(defaultOptions, cdiOptions) :
                    merge(defaultOptions);
                plotLineOptions.value = Date.now();
                plotLineOptions.className = 'highcharts-current-date-indicator';
                if (!options.plotLines) {
                    options.plotLines = [];
                }
                options.plotLines.push(plotLineOptions);
            }
        }
        /**
         * @private
         */
        function onPlotLineOrBandRender() {
            // If the label already exists, update its text
            if (this.label) {
                this.label.attr({
                    text: this.getLabelText(this.options.label)
                });
            }
        }
        /**
         * @private
         */
        function wrapPlotLineOrBandGetLabelText(defaultMethod, defaultLabelOptions) {
            const options = this.options;
            if (options &&
                options.className &&
                options.className.indexOf('highcharts-current-date-indicator') !== -1 &&
                options.label &&
                typeof options.label.formatter === 'function') {
                options.value = Date.now();
                return options.label.formatter
                    .call(this, options.value, options.label.format);
            }
            return defaultMethod.call(this, defaultLabelOptions);
        }
        /* *
         *
         *  Default Export
         *
         * */
        const CurrentDateIndication = {
            compose
        };

        return CurrentDateIndication;
    });
    _registerModule(_modules, 'masters/modules/current-date-indicator.src.js', [_modules['Core/Globals.js'], _modules['Extensions/CurrentDateIndication.js']], function (Highcharts, CurrentDateIndication) {

        const G = Highcharts;
        CurrentDateIndication.compose(G.Axis, G.PlotLineOrBand);

        return Highcharts;
    });
}));