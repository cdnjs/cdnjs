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
export default HighContrastLightTheme;
