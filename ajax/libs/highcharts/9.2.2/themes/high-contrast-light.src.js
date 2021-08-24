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
        define('highcharts/themes/high-contrast-light', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'Extensions/Themes/HighContrastLight.js', [_modules['Core/DefaultOptions.js']], function (D) {
        /* *
         *
         *  (c) 2010-2021 Highsoft AS
         *
         *  Author: Øystein Moseng
         *
         *  License: www.highcharts.com/license
         *
         *  Accessible high-contrast theme for Highcharts. Specifically tailored
         *  towards 3:1 contrast against white/off-white backgrounds. Neighboring
         *  colors are tested for color blindness.
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
        var HighContrastLightTheme;
        (function (HighContrastLightTheme) {
            /* *
             *
             *  Constants
             *
             * */
            HighContrastLightTheme.options = {
                colors: [
                    '#5f98cf',
                    '#434348',
                    '#49a65e',
                    '#f45b5b',
                    '#708090',
                    '#b68c51',
                    '#397550',
                    '#c0493d',
                    '#4f4a7a',
                    '#b381b3'
                ],
                navigator: {
                    series: {
                        color: '#5f98cf',
                        lineColor: '#5f98cf'
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
                setOptions(HighContrastLightTheme.options);
            }
            HighContrastLightTheme.apply = apply;
        })(HighContrastLightTheme || (HighContrastLightTheme = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return HighContrastLightTheme;
    });
    _registerModule(_modules, 'masters/themes/high-contrast-light.src.js', [_modules['Core/Globals.js'], _modules['Extensions/Themes/HighContrastLight.js']], function (H, HighContrastLightTheme) {

        H.theme = HighContrastLightTheme.options;
        HighContrastLightTheme.apply();

    });
}));