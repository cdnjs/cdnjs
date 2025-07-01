/* *
 *
 *  (c) 2009-2025 Øystein Moseng
 *
 *  Handling for Windows High Contrast Mode.
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import H from '../Core/Globals.js';
const { doc, isMS, win } = H;
/* *
 *
 *  Functions
 *
 * */
/**
 * Detect WHCM in the browser.
 *
 * @function Highcharts#isHighContrastModeActive
 * @private
 * @return {boolean} Returns true if the browser is in High Contrast mode.
 */
function isHighContrastModeActive() {
    // Test BG image for IE
    if (isMS && win.getComputedStyle) {
        const testDiv = doc.createElement('div');
        const imageSrc = 'data:image/gif;base64,' +
            'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        testDiv.style.backgroundImage = `url(${imageSrc})`; // #13071
        doc.body.appendChild(testDiv);
        const bi = (testDiv.currentStyle ||
            win.getComputedStyle(testDiv)).backgroundImage;
        doc.body.removeChild(testDiv);
        return bi === 'none';
    }
    // Other browsers use the forced-colors standard
    return win.matchMedia && win.matchMedia('(forced-colors: active)').matches;
}
/**
 * Force high contrast theme for the chart. The default theme is defined in
 * a separate file.
 *
 * @function Highcharts#setHighContrastTheme
 * @private
 * @param {Highcharts.AccessibilityChart} chart The chart to set the theme of.
 * @return {void}
 */
function setHighContrastTheme(chart) {
    // We might want to add additional functionality here in the future for
    // storing the old state so that we can reset the theme if HC mode is
    // disabled. For now, the user will have to reload the page.
    chart.highContrastModeActive = true;
    // Apply theme to chart
    const theme = (chart.options.accessibility.highContrastTheme);
    chart.update(theme, false);
    const hasCustomColors = theme.colors?.length > 1;
    // Force series colors (plotOptions is not enough)
    chart.series.forEach(function (s) {
        const plotOpts = theme.plotOptions[s.type] || {};
        const fillColor = hasCustomColors && s.colorIndex !== void 0 ?
            theme.colors[s.colorIndex] :
            plotOpts.color || 'window';
        const seriesOptions = {
            color: plotOpts.color || 'windowText',
            colors: hasCustomColors ?
                theme.colors : [plotOpts.color || 'windowText'],
            borderColor: plotOpts.borderColor || 'window',
            fillColor
        };
        s.update(seriesOptions, false);
        if (s.points) {
            // Force point colors if existing
            s.points.forEach(function (p) {
                if (p.options && p.options.color) {
                    p.update({
                        color: plotOpts.color || 'windowText',
                        borderColor: plotOpts.borderColor || 'window'
                    }, false);
                }
            });
        }
    });
    // The redraw for each series and after is required for 3D pie
    // (workaround)
    chart.redraw();
}
/* *
 *
 *  Default Export
 *
 * */
const whcm = {
    isHighContrastModeActive,
    setHighContrastTheme
};
export default whcm;
