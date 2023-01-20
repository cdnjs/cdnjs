/* *
 *
 *  (c) 2010-2021 Highsoft AS
 *
 *  Author: Paweł Potaczek
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import BubbleLegendDefaults from './BubbleLegendDefaults.js';
import BubbleLegendItem from './BubbleLegendItem.js';
import D from '../../Core/Defaults.js';
var setOptions = D.setOptions;
import U from '../../Core/Utilities.js';
var addEvent = U.addEvent, objectEach = U.objectEach, wrap = U.wrap;
/* *
 *
 *  Constants
 *
 * */
var composedClasses = [];
/* *
 *
 *  Functions
 *
 * */
/**
 * If ranges are not specified, determine ranges from rendered bubble series
 * and render legend again.
 */
function chartDrawChartBox(proceed, options, callback) {
    var chart = this, legend = chart.legend, bubbleSeries = getVisibleBubbleSeriesIndex(chart) >= 0;
    var bubbleLegendOptions, bubbleSizes, legendItem;
    if (legend && legend.options.enabled && legend.bubbleLegend &&
        legend.options.bubbleLegend.autoRanges && bubbleSeries) {
        bubbleLegendOptions = legend.bubbleLegend.options;
        bubbleSizes = legend.bubbleLegend.predictBubbleSizes();
        legend.bubbleLegend.updateRanges(bubbleSizes[0], bubbleSizes[1]);
        // Disable animation on init
        if (!bubbleLegendOptions.placed) {
            legend.group.placed = false;
            legend.allItems.forEach(function (item) {
                legendItem = item.legendItem || {};
                if (legendItem.group) {
                    legendItem.group.translateY = null;
                }
            });
        }
        // Create legend with bubbleLegend
        legend.render();
        chart.getMargins();
        chart.axes.forEach(function (axis) {
            if (axis.visible) { // #11448
                axis.render();
            }
            if (!bubbleLegendOptions.placed) {
                axis.setScale();
                axis.updateNames();
                // Disable axis animation on init
                objectEach(axis.ticks, function (tick) {
                    tick.isNew = true;
                    tick.isNewLabel = true;
                });
            }
        });
        bubbleLegendOptions.placed = true;
        // After recalculate axes, calculate margins again.
        chart.getMargins();
        // Call default 'drawChartBox' method.
        proceed.call(chart, options, callback);
        // Check bubble legend sizes and correct them if necessary.
        legend.bubbleLegend.correctSizes();
        // Correct items positions with different dimensions in legend.
        retranslateItems(legend, getLinesHeights(legend));
    }
    else {
        proceed.call(chart, options, callback);
        // Allow color change on static bubble legend after click on legend
        if (legend && legend.options.enabled && legend.bubbleLegend) {
            legend.render();
            retranslateItems(legend, getLinesHeights(legend));
        }
    }
}
/**
 * Compose classes for use with Bubble series.
 * @private
 *
 * @param {Highcharts.Chart} ChartClass
 * Core chart class to use with Bubble series.
 *
 * @param {Highcharts.Legend} LegendClass
 * Core legend class to use with Bubble series.
 *
 * @param {Highcharts.Series} SeriesClass
 * Core series class to use with Bubble series.
 */
function compose(ChartClass, LegendClass, SeriesClass) {
    if (composedClasses.indexOf(ChartClass) === -1) {
        composedClasses.push(ChartClass);
        setOptions({
            // Set default bubble legend options
            legend: {
                bubbleLegend: BubbleLegendDefaults
            }
        });
        wrap(ChartClass.prototype, 'drawChartBox', chartDrawChartBox);
    }
    if (composedClasses.indexOf(LegendClass) === -1) {
        composedClasses.push(LegendClass);
        addEvent(LegendClass, 'afterGetAllItems', onLegendAfterGetAllItems);
    }
    if (composedClasses.indexOf(SeriesClass) === -1) {
        composedClasses.push(SeriesClass);
        addEvent(SeriesClass, 'legendItemClick', onSeriesLegendItemClick);
    }
}
/**
 * Check if there is at least one visible bubble series.
 *
 * @private
 * @function getVisibleBubbleSeriesIndex
 * @param {Highcharts.Chart} chart
 * Chart to check.
 * @return {number}
 * First visible bubble series index
 */
function getVisibleBubbleSeriesIndex(chart) {
    var series = chart.series;
    var i = 0;
    while (i < series.length) {
        if (series[i] &&
            series[i].isBubble &&
            series[i].visible &&
            series[i].zData.length) {
            return i;
        }
        i++;
    }
    return -1;
}
/**
 * Calculate height for each row in legend.
 *
 * @private
 * @function getLinesHeights
 *
 * @param {Highcharts.Legend} legend
 * Legend to calculate from.
 *
 * @return {Array<Highcharts.Dictionary<number>>}
 * Informations about line height and items amount
 */
function getLinesHeights(legend) {
    var items = legend.allItems, lines = [], length = items.length;
    var lastLine, legendItem, legendItem2, i = 0, j = 0;
    for (i = 0; i < length; i++) {
        legendItem = items[i].legendItem || {};
        legendItem2 = (items[i + 1] || {}).legendItem || {};
        if (legendItem.labelHeight) {
            // for bubbleLegend
            items[i].itemHeight = legendItem.labelHeight;
        }
        if ( // Line break
        items[i] === items[length - 1] ||
            legendItem.y !== legendItem2.y) {
            lines.push({ height: 0 });
            lastLine = lines[lines.length - 1];
            // Find the highest item in line
            for (j; j <= i; j++) {
                if (items[j].itemHeight > lastLine.height) {
                    lastLine.height = items[j].itemHeight;
                }
            }
            lastLine.step = i;
        }
    }
    return lines;
}
/**
 * Start the bubble legend creation process.
 */
function onLegendAfterGetAllItems(e) {
    var legend = this, bubbleLegend = legend.bubbleLegend, legendOptions = legend.options, options = legendOptions.bubbleLegend, bubbleSeriesIndex = getVisibleBubbleSeriesIndex(legend.chart);
    // Remove unnecessary element
    if (bubbleLegend && bubbleLegend.ranges && bubbleLegend.ranges.length) {
        // Allow change the way of calculating ranges in update
        if (options.ranges.length) {
            options.autoRanges =
                !!options.ranges[0].autoRanges;
        }
        // Update bubbleLegend dimensions in each redraw
        legend.destroyItem(bubbleLegend);
    }
    // Create bubble legend
    if (bubbleSeriesIndex >= 0 &&
        legendOptions.enabled &&
        options.enabled) {
        options.seriesIndex = bubbleSeriesIndex;
        legend.bubbleLegend = new BubbleLegendItem(options, legend);
        legend.bubbleLegend.addToLegend(e.allItems);
    }
}
/**
 * Toggle bubble legend depending on the visible status of bubble series.
 */
function onSeriesLegendItemClick() {
    var series = this, chart = series.chart, visible = series.visible, legend = series.chart.legend;
    var status;
    if (legend && legend.bubbleLegend) {
        // Temporary correct 'visible' property
        series.visible = !visible;
        // Save future status for getRanges method
        series.ignoreSeries = visible;
        // Check if at lest one bubble series is visible
        status = getVisibleBubbleSeriesIndex(chart) >= 0;
        // Hide bubble legend if all bubble series are disabled
        if (legend.bubbleLegend.visible !== status) {
            // Show or hide bubble legend
            legend.update({
                bubbleLegend: { enabled: status }
            });
            legend.bubbleLegend.visible = status; // Restore default status
        }
        series.visible = visible;
    }
}
/**
 * Correct legend items translation in case of different elements heights.
 *
 * @private
 * @function Highcharts.Legend#retranslateItems
 *
 * @param {Highcharts.Legend} legend
 * Legend to translate in.
 *
 * @param {Array<Highcharts.Dictionary<number>>} lines
 * Informations about line height and items amount
 */
function retranslateItems(legend, lines) {
    var items = legend.allItems, rtl = legend.options.rtl;
    var orgTranslateX, orgTranslateY, movementX, legendItem, actualLine = 0;
    items.forEach(function (item, index) {
        legendItem = item.legendItem || {};
        if (!legendItem.group) {
            return;
        }
        orgTranslateX = legendItem.group.translateX || 0;
        orgTranslateY = legendItem.y || 0;
        movementX = item.movementX;
        if (movementX || (rtl && item.ranges)) {
            movementX = rtl ?
                orgTranslateX - item.options.maxSize / 2 :
                orgTranslateX + movementX;
            legendItem.group.attr({ translateX: movementX });
        }
        if (index > lines[actualLine].step) {
            actualLine++;
        }
        legendItem.group.attr({
            translateY: Math.round(orgTranslateY + lines[actualLine].height / 2)
        });
        legendItem.y = orgTranslateY + lines[actualLine].height / 2;
    });
}
/* *
 *
 *  Default Export
 *
 * */
var BubbleLegendComposition = {
    compose: compose
};
export default BubbleLegendComposition;
