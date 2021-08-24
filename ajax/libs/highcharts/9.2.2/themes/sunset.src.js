/**
 * @license Highcharts JS v9.2.2 (2021-08-24)
 *
 * (c) 2009-2021 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/themes/sunset', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'Extensions/Themes/Sunset.js', [_modules['Core/DefaultOptions.js']], function (D) {
        /* *
         *
         *  (c) 2010-2021 Highsoft AS
         *
         *  Author: Øystein Moseng
         *
         *  License: www.highcharts.com/license
         *
         *  Accessible high-contrast theme for Highcharts. Considers colorblindness and
         *  monochrome rendering.
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var setOptions = D.setOptions;
        /* *
         *
         *  Theme
         *
         * */
        var SunsetTheme;
        (function (SunsetTheme) {
            /* *
             *
             *  Constants
             *
             * */
            SunsetTheme.options = {
                colors: ['#FDD089', '#FF7F79', '#A0446E', '#251535'],
                colorAxis: {
                    maxColor: '#60042E',
                    minColor: '#FDD089'
                },
                plotOptions: {
                    map: {
                        nullColor: '#fefefc'
                    }
                },
                navigator: {
                    series: {
                        color: '#FF7F79',
                        lineColor: '#A0446E'
                    }
                }
            };
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Apply the theme.
             */
            function apply() {
                setOptions(SunsetTheme.options);
            }
            SunsetTheme.apply = apply;
        })(SunsetTheme || (SunsetTheme = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return SunsetTheme;
    });
    _registerModule(_modules, 'masters/themes/sunset.src.js', [_modules['Core/Globals.js'], _modules['Extensions/Themes/Sunset.js']], function (H, SunsetTheme) {

        H.theme = SunsetTheme.options;
        SunsetTheme.apply();

    });
}));