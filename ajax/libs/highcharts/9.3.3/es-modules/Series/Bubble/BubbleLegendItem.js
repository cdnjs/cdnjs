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
import Color from '../../Core/Color/Color.js';
var color = Color.parse;
import F from '../../Core/FormatUtilities.js';
import H from '../../Core/Globals.js';
var noop = H.noop;
import U from '../../Core/Utilities.js';
var arrayMax = U.arrayMax, arrayMin = U.arrayMin, isNumber = U.isNumber, merge = U.merge, pick = U.pick, stableSort = U.stableSort;
/**
 * @interface Highcharts.BubbleLegendFormatterContextObject
 */ /**
* The center y position of the range.
* @name Highcharts.BubbleLegendFormatterContextObject#center
* @type {number}
*/ /**
* The radius of the bubble range.
* @name Highcharts.BubbleLegendFormatterContextObject#radius
* @type {number}
*/ /**
* The bubble value.
* @name Highcharts.BubbleLegendFormatterContextObject#value
* @type {number}
*/
''; // detach doclets above
/* *
 *
 *  Class
 *
 * */
/* eslint-disable no-invalid-this, valid-jsdoc */
/**
 * BubbleLegend class.
 *
 * @private
 * @class
 * @name Highcharts.BubbleLegend
 * @param {Highcharts.LegendBubbleLegendOptions} options
 * Options of BubbleLegendItem.
 *
 * @param {Highcharts.Legend} legend
 * Legend of item.
 */
var BubbleLegendItem = /** @class */ (function () {
    function BubbleLegendItem(options, legend) {
        this.chart = void 0;
        this.fontMetrics = void 0;
        this.legend = void 0;
        this.legendGroup = void 0;
        this.legendItem = void 0;
        this.legendItemHeight = void 0;
        this.legendItemWidth = void 0;
        this.legendSymbol = void 0;
        this.maxLabel = void 0;
        this.movementX = void 0;
        this.ranges = void 0;
        this.selected = void 0;
        this.visible = void 0;
        this.symbols = void 0;
        this.options = void 0;
        this.setState = noop;
        this.init(options, legend);
    }
    /**
     * Create basic bubbleLegend properties similar to item in legend.
     *
     * @private
     * @function Highcharts.BubbleLegend#init
     * @param {Highcharts.LegendBubbleLegendOptions} options
     *        Bubble legend options
     * @param {Highcharts.Legend} legend
     *        Legend
     */
    BubbleLegendItem.prototype.init = function (options, legend) {
        this.options = options;
        this.visible = true;
        this.chart = legend.chart;
        this.legend = legend;
    };
    /**
     * Depending on the position option, add bubbleLegend to legend items.
     *
     * @private
     * @function Highcharts.BubbleLegend#addToLegend
     * @param {Array<(Highcharts.Point|Highcharts.Series)>} items
     * All legend items
     */
    BubbleLegendItem.prototype.addToLegend = function (items) {
        // Insert bubbleLegend into legend items
        items.splice(this.options.legendIndex, 0, this);
    };
    /**
     * Calculate ranges, sizes and call the next steps of bubbleLegend
     * creation.
     *
     * @private
     * @function Highcharts.BubbleLegend#drawLegendSymbol
     * @param {Highcharts.Legend} legend
     *        Legend instance
     */
    BubbleLegendItem.prototype.drawLegendSymbol = function (legend) {
        var chart = this.chart, options = this.options, itemDistance = pick(legend.options.itemDistance, 20), ranges = options.ranges, connectorDistance = options.connectorDistance;
        var connectorSpace;
        // Predict label dimensions
        this.fontMetrics = chart.renderer.fontMetrics(options.labels.style.fontSize);
        // Do not create bubbleLegend now if ranges or ranges valeus are not
        // specified or if are empty array.
        if (!ranges || !ranges.length || !isNumber(ranges[0].value)) {
            legend.options.bubbleLegend.autoRanges = true;
            return;
        }
        // Sort ranges to right render order
        stableSort(ranges, function (a, b) {
            return b.value - a.value;
        });
        this.ranges = ranges;
        this.setOptions();
        this.render();
        // Get max label size
        var maxLabel = this.getMaxLabelSize(), radius = this.ranges[0].radius, size = radius * 2;
        // Space for connectors and labels.
        connectorSpace =
            connectorDistance - radius + maxLabel.width;
        connectorSpace = connectorSpace > 0 ? connectorSpace : 0;
        this.maxLabel = maxLabel;
        this.movementX = options.labels.align === 'left' ?
            connectorSpace : 0;
        this.legendItemWidth = size + connectorSpace + itemDistance;
        this.legendItemHeight = size + this.fontMetrics.h / 2;
    };
    /**
     * Set style options for each bubbleLegend range.
     *
     * @private
     * @function Highcharts.BubbleLegend#setOptions
     */
    BubbleLegendItem.prototype.setOptions = function () {
        var ranges = this.ranges, options = this.options, series = this.chart.series[options.seriesIndex], baseline = this.legend.baseline, bubbleAttribs = {
            zIndex: options.zIndex,
            'stroke-width': options.borderWidth
        }, connectorAttribs = {
            zIndex: options.zIndex,
            'stroke-width': options.connectorWidth
        }, labelAttribs = {
            align: (this.legend.options.rtl ||
                options.labels.align === 'left') ? 'right' : 'left',
            zIndex: options.zIndex
        }, fillOpacity = series.options.marker.fillOpacity, styledMode = this.chart.styledMode;
        // Allow to parts of styles be used individually for range
        ranges.forEach(function (range, i) {
            if (!styledMode) {
                bubbleAttribs.stroke = pick(range.borderColor, options.borderColor, series.color);
                bubbleAttribs.fill = pick(range.color, options.color, fillOpacity !== 1 ?
                    color(series.color).setOpacity(fillOpacity)
                        .get('rgba') :
                    series.color);
                connectorAttribs.stroke = pick(range.connectorColor, options.connectorColor, series.color);
            }
            // Set options needed for rendering each range
            ranges[i].radius = this.getRangeRadius(range.value);
            ranges[i] = merge(ranges[i], {
                center: (ranges[0].radius - ranges[i].radius +
                    baseline)
            });
            if (!styledMode) {
                merge(true, ranges[i], {
                    bubbleAttribs: merge(bubbleAttribs),
                    connectorAttribs: merge(connectorAttribs),
                    labelAttribs: labelAttribs
                });
            }
        }, this);
    };
    /**
     * Calculate radius for each bubble range,
     * used code from BubbleSeries.js 'getRadius' method.
     *
     * @private
     * @function Highcharts.BubbleLegend#getRangeRadius
     * @param {number} value
     *        Range value
     * @return {number|null}
     *         Radius for one range
     */
    BubbleLegendItem.prototype.getRangeRadius = function (value) {
        var options = this.options, seriesIndex = this.options.seriesIndex, bubbleSeries = this.chart.series[seriesIndex], zMax = options.ranges[0].value, zMin = options.ranges[options.ranges.length - 1].value, minSize = options.minSize, maxSize = options.maxSize;
        return bubbleSeries.getRadius.call(this, zMin, zMax, minSize, maxSize, value);
    };
    /**
     * Render the legendSymbol group.
     *
     * @private
     * @function Highcharts.BubbleLegend#render
     */
    BubbleLegendItem.prototype.render = function () {
        var renderer = this.chart.renderer, zThreshold = this.options.zThreshold;
        if (!this.symbols) {
            this.symbols = {
                connectors: [],
                bubbleItems: [],
                labels: []
            };
        }
        // Nesting SVG groups to enable handleOverflow
        this.legendSymbol = renderer.g('bubble-legend');
        this.legendItem = renderer.g('bubble-legend-item');
        // To enable default 'hideOverlappingLabels' method
        this.legendSymbol.translateX = 0;
        this.legendSymbol.translateY = 0;
        this.ranges.forEach(function (range) {
            if (range.value >= zThreshold) {
                this.renderRange(range);
            }
        }, this);
        // To use handleOverflow method
        this.legendSymbol.add(this.legendItem);
        this.legendItem.add(this.legendGroup);
        this.hideOverlappingLabels();
    };
    /**
     * Render one range, consisting of bubble symbol, connector and label.
     *
     * @private
     * @function Highcharts.BubbleLegend#renderRange
     * @param {Highcharts.LegendBubbleLegendRangesOptions} range
     *        Range options
     */
    BubbleLegendItem.prototype.renderRange = function (range) {
        var mainRange = this.ranges[0], legend = this.legend, options = this.options, labelsOptions = options.labels, chart = this.chart, bubbleSeries = chart.series[options.seriesIndex], renderer = chart.renderer, symbols = this.symbols, labels = symbols.labels, elementCenter = range.center, absoluteRadius = Math.abs(range.radius), connectorDistance = options.connectorDistance || 0, labelsAlign = labelsOptions.align, rtl = legend.options.rtl, borderWidth = options.borderWidth, connectorWidth = options.connectorWidth, posX = mainRange.radius || 0, posY = elementCenter - absoluteRadius -
            borderWidth / 2 + connectorWidth / 2, fontMetrics = this.fontMetrics, labelMovement = fontMetrics.f / 2 -
            (fontMetrics.h - fontMetrics.f) / 2, crispMovement = (posY % 1 ? 1 : 0.5) -
            (connectorWidth % 2 ? 0 : 0.5), styledMode = renderer.styledMode;
        var connectorLength = rtl || labelsAlign === 'left' ?
            -connectorDistance : connectorDistance;
        // Set options for centered labels
        if (labelsAlign === 'center') {
            connectorLength = 0; // do not use connector
            options.connectorDistance = 0;
            range.labelAttribs.align = 'center';
        }
        var labelY = posY + options.labels.y, labelX = posX + connectorLength + options.labels.x;
        // Render bubble symbol
        symbols.bubbleItems.push(renderer
            .circle(posX, elementCenter + crispMovement, absoluteRadius)
            .attr(styledMode ? {} : range.bubbleAttribs)
            .addClass((styledMode ?
            'highcharts-color-' +
                bubbleSeries.colorIndex + ' ' :
            '') +
            'highcharts-bubble-legend-symbol ' +
            (options.className || '')).add(this.legendSymbol));
        // Render connector
        symbols.connectors.push(renderer
            .path(renderer.crispLine([
            ['M', posX, posY],
            ['L', posX + connectorLength, posY]
        ], options.connectorWidth))
            .attr((styledMode ? {} : range.connectorAttribs))
            .addClass((styledMode ?
            'highcharts-color-' +
                this.options.seriesIndex + ' ' : '') +
            'highcharts-bubble-legend-connectors ' +
            (options.connectorClassName || '')).add(this.legendSymbol));
        // Render label
        var label = renderer
            .text(this.formatLabel(range), labelX, labelY + labelMovement)
            .attr((styledMode ? {} : range.labelAttribs))
            .css(styledMode ? {} : labelsOptions.style)
            .addClass('highcharts-bubble-legend-labels ' +
            (options.labels.className || '')).add(this.legendSymbol);
        labels.push(label);
        // To enable default 'hideOverlappingLabels' method
        label.placed = true;
        label.alignAttr = {
            x: labelX,
            y: labelY + labelMovement
        };
    };
    /**
     * Get the label which takes up the most space.
     *
     * @private
     * @function Highcharts.BubbleLegend#getMaxLabelSize
     */
    BubbleLegendItem.prototype.getMaxLabelSize = function () {
        var labels = this.symbols.labels;
        var maxLabel, labelSize;
        labels.forEach(function (label) {
            labelSize = label.getBBox(true);
            if (maxLabel) {
                maxLabel = labelSize.width > maxLabel.width ?
                    labelSize : maxLabel;
            }
            else {
                maxLabel = labelSize;
            }
        });
        return maxLabel || {};
    };
    /**
     * Get formatted label for range.
     *
     * @private
     * @function Highcharts.BubbleLegend#formatLabel
     * @param {Highcharts.LegendBubbleLegendRangesOptions} range
     *        Range options
     * @return {string}
     *         Range label text
     */
    BubbleLegendItem.prototype.formatLabel = function (range) {
        var options = this.options, formatter = options.labels.formatter, format = options.labels.format;
        var numberFormatter = this.chart.numberFormatter;
        return format ? F.format(format, range) :
            formatter ? formatter.call(range) :
                numberFormatter(range.value, 1);
    };
    /**
     * By using default chart 'hideOverlappingLabels' method, hide or show
     * labels and connectors.
     *
     * @private
     * @function Highcharts.BubbleLegend#hideOverlappingLabels
     */
    BubbleLegendItem.prototype.hideOverlappingLabels = function () {
        var chart = this.chart, allowOverlap = this.options.labels.allowOverlap, symbols = this.symbols;
        if (!allowOverlap && symbols) {
            chart.hideOverlappingLabels(symbols.labels);
            // Hide or show connectors
            symbols.labels.forEach(function (label, index) {
                if (!label.newOpacity) {
                    symbols.connectors[index].hide();
                }
                else if (label.newOpacity !== label.oldOpacity) {
                    symbols.connectors[index].show();
                }
            });
        }
    };
    /**
     * Calculate ranges from created series.
     *
     * @private
     * @function Highcharts.BubbleLegend#getRanges
     * @return {Array<Highcharts.LegendBubbleLegendRangesOptions>}
     *         Array of range objects
     */
    BubbleLegendItem.prototype.getRanges = function () {
        var bubbleLegend = this.legend.bubbleLegend, series = bubbleLegend.chart.series, rangesOptions = bubbleLegend.options.ranges;
        var ranges, zData, minZ = Number.MAX_VALUE, maxZ = -Number.MAX_VALUE;
        series.forEach(function (s) {
            // Find the min and max Z, like in bubble series
            if (s.isBubble && !s.ignoreSeries) {
                zData = s.zData.filter(isNumber);
                if (zData.length) {
                    minZ = pick(s.options.zMin, Math.min(minZ, Math.max(arrayMin(zData), s.options.displayNegative === false ?
                        s.options.zThreshold :
                        -Number.MAX_VALUE)));
                    maxZ = pick(s.options.zMax, Math.max(maxZ, arrayMax(zData)));
                }
            }
        });
        // Set values for ranges
        if (minZ === maxZ) {
            // Only one range if min and max values are the same.
            ranges = [{ value: maxZ }];
        }
        else {
            ranges = [
                { value: minZ },
                { value: (minZ + maxZ) / 2 },
                { value: maxZ, autoRanges: true }
            ];
        }
        // Prevent reverse order of ranges after redraw
        if (rangesOptions.length && rangesOptions[0].radius) {
            ranges.reverse();
        }
        // Merge ranges values with user options
        ranges.forEach(function (range, i) {
            if (rangesOptions && rangesOptions[i]) {
                ranges[i] = merge(rangesOptions[i], range);
            }
        });
        return ranges;
    };
    /**
     * Calculate bubble legend sizes from rendered series.
     *
     * @private
     * @function Highcharts.BubbleLegend#predictBubbleSizes
     * @return {Array<number,number>}
     *         Calculated min and max bubble sizes
     */
    BubbleLegendItem.prototype.predictBubbleSizes = function () {
        var chart = this.chart, fontMetrics = this.fontMetrics, legendOptions = chart.legend.options, floating = legendOptions.floating, horizontal = legendOptions.layout === 'horizontal', lastLineHeight = horizontal ? chart.legend.lastLineHeight : 0, plotSizeX = chart.plotSizeX, plotSizeY = chart.plotSizeY, bubbleSeries = chart.series[this.options.seriesIndex], pxSizes = bubbleSeries.getPxExtremes(), minSize = Math.ceil(pxSizes.minPxSize), maxPxSize = Math.ceil(pxSizes.maxPxSize), plotSize = Math.min(plotSizeY, plotSizeX);
        var calculatedSize, maxSize = bubbleSeries.options.maxSize;
        // Calculate prediceted max size of bubble
        if (floating || !(/%$/.test(maxSize))) {
            calculatedSize = maxPxSize;
        }
        else {
            maxSize = parseFloat(maxSize);
            calculatedSize = ((plotSize + lastLineHeight -
                fontMetrics.h / 2) * maxSize / 100) / (maxSize / 100 + 1);
            // Get maxPxSize from bubble series if calculated bubble legend
            // size will not affect to bubbles series.
            if ((horizontal && plotSizeY - calculatedSize >=
                plotSizeX) || (!horizontal && plotSizeX -
                calculatedSize >= plotSizeY)) {
                calculatedSize = maxPxSize;
            }
        }
        return [minSize, Math.ceil(calculatedSize)];
    };
    /**
     * Correct ranges with calculated sizes.
     *
     * @private
     * @function Highcharts.BubbleLegend#updateRanges
     * @param {number} min
     * @param {number} max
     */
    BubbleLegendItem.prototype.updateRanges = function (min, max) {
        var bubbleLegendOptions = this.legend.options.bubbleLegend;
        bubbleLegendOptions.minSize = min;
        bubbleLegendOptions.maxSize = max;
        bubbleLegendOptions.ranges = this.getRanges();
    };
    /**
     * Because of the possibility of creating another legend line, predicted
     * bubble legend sizes may differ by a few pixels, so it is necessary to
     * correct them.
     *
     * @private
     * @function Highcharts.BubbleLegend#correctSizes
     */
    BubbleLegendItem.prototype.correctSizes = function () {
        var legend = this.legend, chart = this.chart, bubbleSeries = chart.series[this.options.seriesIndex], pxSizes = bubbleSeries.getPxExtremes(), bubbleSeriesSize = pxSizes.maxPxSize, bubbleLegendSize = this.options.maxSize;
        if (Math.abs(Math.ceil(bubbleSeriesSize) - bubbleLegendSize) >
            1) {
            this.updateRanges(this.options.minSize, pxSizes.maxPxSize);
            legend.render();
        }
    };
    return BubbleLegendItem;
}());
/* *
 *
 *  Default Export
 *
 * */
export default BubbleLegendItem;
