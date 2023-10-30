/**
 * @license Highcharts JS v11.2.0 (2023-10-30)
 *
 * (c) 2009-2021 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/themes/avocado', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'Extensions/Themes/Avocado.js', [_modules['Core/Defaults.js']], function (D) {
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
        const { setOptions } = D;
        /* *
         *
         *  Theme
         *
         * */
        var AvocadoTheme;
        (function (AvocadoTheme) {
            /* *
             *
             *  Constants
             *
             * */
            AvocadoTheme.options = {
                colors: ['#F3E796', '#95C471', '#35729E', '#251735'],
                colorAxis: {
                    maxColor: '#05426E',
                    minColor: '#F3E796'
                },
                plotOptions: {
                    map: {
                        nullColor: '#FCFEFE'
                    }
                },
                navigator: {
                    maskFill: 'rgba(170, 205, 170, 0.5)',
                    series: {
                        color: '#95C471',
                        lineColor: '#35729E'
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
                setOptions(AvocadoTheme.options);
            }
            AvocadoTheme.apply = apply;
        })(AvocadoTheme || (AvocadoTheme = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return AvocadoTheme;
    });
    _registerModule(_modules, 'masters/themes/avocado.src.js', [_modules['Core/Globals.js'], _modules['Extensions/Themes/Avocado.js']], function (H, AvocadoTheme) {

        H.theme = AvocadoTheme.options;
        AvocadoTheme.apply();

    });
}));