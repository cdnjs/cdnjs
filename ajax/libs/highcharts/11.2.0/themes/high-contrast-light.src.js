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
        define('highcharts/themes/high-contrast-light', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'Extensions/Themes/HighContrastLight.js', [_modules['Core/Defaults.js']], function (D) {
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
        const { setOptions } = D;
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
                    '#265FB5',
                    '#222',
                    '#698F01',
                    '#F4693E',
                    '#4C0684',
                    '#0FA388',
                    '#B7104A',
                    '#AF9023',
                    '#1A704C',
                    '#B02FDD'
                ],
                credits: {
                    style: {
                        color: '#767676'
                    }
                },
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