/* *
 *
 *  (c) 2010-2024 Highsoft AS
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
'use strict';
import D from '../../Core/Defaults.js';
const { setOptions } = D;
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
export default SunsetTheme;
