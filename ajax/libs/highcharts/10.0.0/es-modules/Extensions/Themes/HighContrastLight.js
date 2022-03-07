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
'use strict';
import D from '../../Core/DefaultOptions.js';
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
export default HighContrastLightTheme;
