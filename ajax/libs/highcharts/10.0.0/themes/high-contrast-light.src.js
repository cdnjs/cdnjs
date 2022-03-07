/**
 * @license Highcharts JS v10.0.0 (2022-03-07)
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
                window.dispatchEvent(
                    new CustomEvent(
                        'HighchartsModuleLoaded',
                        { detail: { path: path, module: obj[path] }
                    })
                );
            }
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
                    '#4372da',
                    '#222',
                    '#0b7383',
                    '#6B26F0',
                    '#D42D1A',
                    '#3D239E',
                    '#7e7932',
                    '#b06320',
                    '#244a76',
                    '#76767A'
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