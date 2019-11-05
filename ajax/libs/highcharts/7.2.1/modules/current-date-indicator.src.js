/**
 * @license Highcharts Gantt JS v7.2.1 (2019-10-31)
 *
 * CurrentDateIndicator
 *
 * (c) 2010-2019 Lars A. V. Cabrera
 *
 * License: www.highcharts.com/license
 */
'use strict';
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
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);
        }
    }
    _registerModule(_modules, 'parts-gantt/CurrentDateIndicator.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2016-2019 Highsoft AS
         *
         *  Author: Lars A. V. Cabrera
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = H.addEvent, Axis = H.Axis, PlotLineOrBand = H.PlotLineOrBand, merge = H.merge, wrap = H.wrap;
        var defaultConfig = {
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
             * @type      {boolean|*}
             * @default   true
             * @extends   xAxis.plotLines
             * @excluding value
             * @product   gantt
             * @apioption xAxis.currentDateIndicator
             */
            currentDateIndicator: true,
            color: '#ccd6eb',
            width: 2,
            label: {
                /**
                 * Format of the label. This options is passed as the fist argument to
                 * [dateFormat](/class-reference/Highcharts#dateFormat) function.
                 *
                 * @type      {string}
                 * @default   '%a, %b %d %Y, %H:%M'
                 * @product   gantt
                 * @apioption xAxis.currentDateIndicator.label.format
                 */
                format: '%a, %b %d %Y, %H:%M',
                formatter: function (value, format) {
                    return H.dateFormat(format, value);
                },
                rotation: 0,
                style: {
                    fontSize: '10px'
                }
            }
        };
        /* eslint-disable no-invalid-this */
        addEvent(Axis, 'afterSetOptions', function () {
            var options = this.options, cdiOptions = options.currentDateIndicator;
            if (cdiOptions) {
                cdiOptions = typeof cdiOptions === 'object' ?
                    merge(defaultConfig, cdiOptions) : merge(defaultConfig);
                cdiOptions.value = new Date();
                if (!options.plotLines) {
                    options.plotLines = [];
                }
                options.plotLines.push(cdiOptions);
            }
        });
        addEvent(PlotLineOrBand, 'render', function () {
            // If the label already exists, update its text
            if (this.label) {
                this.label.attr({
                    text: this.getLabelText(this.options.label)
                });
            }
        });
        wrap(PlotLineOrBand.prototype, 'getLabelText', function (defaultMethod, defaultLabelOptions) {
            var options = this.options;
            if (options.currentDateIndicator && options.label &&
                typeof options.label.formatter === 'function') {
                options.value = new Date();
                return options.label.formatter
                    .call(this, options.value, options.label.format);
            }
            return defaultMethod.call(this, defaultLabelOptions);
        });

    });
    _registerModule(_modules, 'masters/modules/current-date-indicator.src.js', [], function () {


    });
}));