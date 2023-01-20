/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import ErrorMessages from './ErrorMessages.js';
import H from '../../Core/Globals.js';
import D from '../../Core/Defaults.js';
var setOptions = D.setOptions;
import U from '../../Core/Utilities.js';
var addEvent = U.addEvent, find = U.find, isNumber = U.isNumber;
/* *
 *
 *  Constants
 *
 * */
var composedClasses = [];
var defaultOptions = {
    /**
     * @optionparent chart
     */
    chart: {
        /**
         * Whether to display errors on the chart. When `false`, the errors will
         * be shown only in the console.
         *
         * @sample highcharts/chart/display-errors/
         *         Show errors on chart
         *
         * @since    7.0.0
         * @requires modules/debugger
         */
        displayErrors: true
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
function compose(ChartClass) {
    if (composedClasses.indexOf(ChartClass) === -1) {
        composedClasses.push(ChartClass);
        addEvent(ChartClass, 'beforeRedraw', onChartBeforeRedraw);
    }
    if (composedClasses.indexOf(H) === -1) {
        composedClasses.push(H);
        addEvent(H, 'displayError', onHighchartsDisplayError);
    }
    if (composedClasses.indexOf(setOptions) === -1) {
        composedClasses.push(setOptions);
        setOptions(defaultOptions);
    }
}
/**
 * @private
 */
function onChartBeforeRedraw() {
    var errorElements = this.errorElements;
    if (errorElements && errorElements.length) {
        for (var _i = 0, errorElements_1 = errorElements; _i < errorElements_1.length; _i++) {
            var el = errorElements_1[_i];
            el.destroy();
        }
    }
    delete this.errorElements;
}
/**
 * @private
 */
function onHighchartsDisplayError(e) {
    // Display error on the chart causing the error or the last created chart.
    var chart = (e.chart ||
        find(this.charts.slice().reverse(), function (c) { return !!c; }));
    if (!chart) {
        return;
    }
    var code = e.code, options = chart.options.chart, renderer = chart.renderer;
    var msg, chartWidth, chartHeight;
    if (chart.errorElements) {
        for (var _i = 0, _a = chart.errorElements; _i < _a.length; _i++) {
            var el = _a[_i];
            if (el) {
                el.destroy();
            }
        }
    }
    if (options && options.displayErrors && renderer) {
        chart.errorElements = [];
        msg = isNumber(code) ?
            ('Highcharts error #' + code + ': ' +
                ErrorMessages[code].text) :
            code;
        chartWidth = chart.chartWidth;
        chartHeight = chart.chartHeight;
        // Format msg so SVGRenderer can handle it
        msg = msg
            .replace(/<h1>(.*)<\/h1>/g, '<br><span style="font-size: 24px">$1</span><br>')
            .replace(/<p>/g, '')
            .replace(/<\/p>/g, '<br>');
        // Render red chart frame.
        chart.errorElements[0] = renderer.rect(2, 2, chartWidth - 4, chartHeight - 4).attr({
            'stroke-width': 4,
            stroke: '#ff0000',
            zIndex: 3
        }).add();
        // Render error message
        chart.errorElements[1] = renderer.label(msg, 0, 0, 'rect', void 0, void 0, void 0, void 0, 'debugger').css({
            color: '#ffffff',
            width: (chartWidth - 16) + 'px',
            padding: 0
        }).attr({
            fill: 'rgba(255, 0, 0, 0.9)',
            width: chartWidth,
            padding: 8,
            zIndex: 10
        }).add();
        chart.errorElements[1].attr({
            y: chartHeight - chart.errorElements[1].getBBox().height
        });
    }
}
/* *
 *
 *  Default Export
 *
 * */
var Debugger = {
    compose: compose
};
export default Debugger;
