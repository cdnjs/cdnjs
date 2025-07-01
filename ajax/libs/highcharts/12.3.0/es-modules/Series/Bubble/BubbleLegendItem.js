/* *
 *
 *  (c) 2010-2025 Highsoft AS
 *
 *  Author: Paweł Potaczek
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import F from '../../Core/Templating.js';
import H from '../../Core/Globals.js';
const { noop } = H;
import U from '../../Core/Utilities.js';
const { arrayMax, arrayMin, isNumber, merge, pick, stableSort } = U;
/* *
 *
 *  Class
 *
 * */
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
class BubbleLegendItem {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(options, legend) {
        this.setState = noop;
        this.init(options, legend);
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Create basic bubbleLegend properties similar to item in legend.
     * @private
     */
    init(options, legend) {
        this.options = options;
        this.visible = true;
        this.chart = legend.chart;
        this.legend = legend;
    }
    /**
     * Depending on the position option, add bubbleLegend to legend items.
     *
     * @private
     *
     * @param {Array<(Highcharts.Point|Highcharts.Series)>} items
     *        All legend items
     */
    addToLegend(items) {
        // Insert bubbleLegend into legend items
        items.splice(this.options.legendIndex, 0, this);
    }
    /**
     * Calculate ranges, sizes and call the next steps of bubbleLegend
     * creation.
     *
     * @private
     *
     * @param {Highcharts.Legend} legend
     *        Legend instance
     */
    drawLegendSymbol(legend) {
        const itemDistance = pick(legend.options.itemDistance, 20), legendItem = this.legendItem || {}, options = this.options, ranges = options.ranges, connectorDistance = options.connectorDistance;
        let connectorSpace;
        // Do not create bubbleLegend now if ranges or ranges values are not
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
        const maxLabel = this.getMaxLabelSize(), radius = this.ranges[0].radius, size = radius * 2;
        // Space for connectors and labels.
        connectorSpace =
            connectorDistance - radius + maxLabel.width;
        connectorSpace = connectorSpace > 0 ? connectorSpace : 0;
        this.maxLabel = maxLabel;
        this.movementX = options.labels.align === 'left' ?
            connectorSpace : 0;
        legendItem.labelWidth = size + connectorSpace + itemDistance;
        legendItem.labelHeight = size + maxLabel.height / 2;
    }
    /**
     * Set style options for each bubbleLegend range.
     * @private
     */
    setOptions() {
        const ranges = this.ranges, options = this.options, series = this.chart.series[options.seriesIndex], baseline = this.legend.baseline, bubbleAttribs = {
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
                bubbleAttribs.fill = range.color || options.color;
                if (!bubbleAttribs.fill) {
                    bubbleAttribs.fill = series.color;
                    bubbleAttribs['fill-opacity'] = fillOpacity ?? 1;
                }
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
    }
    /**
     * Calculate radius for each bubble range,
     * used code from BubbleSeries.js 'getRadius' method.
     *
     * @private
     *
     * @param {number} value
     *        Range value
     *
     * @return {number|null}
     *         Radius for one range
     */
    getRangeRadius(value) {
        const options = this.options, seriesIndex = this.options.seriesIndex, bubbleSeries = this.chart.series[seriesIndex], zMax = options.ranges[0].value, zMin = options.ranges[options.ranges.length - 1].value, minSize = options.minSize, maxSize = options.maxSize;
        return bubbleSeries.getRadius.call(this, zMin, zMax, minSize, maxSize, value);
    }
    /**
     * Render the legendItem group.
     * @private
     */
    render() {
        const legendItem = this.legendItem || {}, renderer = this.chart.renderer, zThreshold = this.options.zThreshold;
        if (!this.symbols) {
            this.symbols = {
                connectors: [],
                bubbleItems: [],
                labels: []
            };
        }
        // Nesting SVG groups to enable handleOverflow
        legendItem.symbol = renderer.g('bubble-legend');
        legendItem.label = renderer.g('bubble-legend-item')
            .css(this.legend.itemStyle || {});
        // To enable default 'hideOverlappingLabels' method
        legendItem.symbol.translateX = 0;
        legendItem.symbol.translateY = 0;
        // To use handleOverflow method
        legendItem.symbol.add(legendItem.label);
        legendItem.label.add(legendItem.group);
        for (const range of this.ranges) {
            if (range.value >= zThreshold) {
                this.renderRange(range);
            }
        }
        this.hideOverlappingLabels();
    }
    /**
     * Render one range, consisting of bubble symbol, connector and label.
     *
     * @private
     *
     * @param {Highcharts.LegendBubbleLegendRangesOptions} range
     *        Range options
     */
    renderRange(range) {
        const mainRange = this.ranges[0], legend = this.legend, options = this.options, labelsOptions = options.labels, chart = this.chart, bubbleSeries = chart.series[options.seriesIndex], renderer = chart.renderer, symbols = this.symbols, labels = symbols.labels, elementCenter = range.center, absoluteRadius = Math.abs(range.radius), connectorDistance = options.connectorDistance || 0, labelsAlign = labelsOptions.align, rtl = legend.options.rtl, borderWidth = options.borderWidth, connectorWidth = options.connectorWidth, posX = mainRange.radius || 0, posY = elementCenter - absoluteRadius -
            borderWidth / 2 + connectorWidth / 2, crispMovement = (posY % 1 ? 1 : 0.5) -
            (connectorWidth % 2 ? 0 : 0.5), styledMode = renderer.styledMode;
        let connectorLength = rtl || labelsAlign === 'left' ?
            -connectorDistance : connectorDistance;
        // Set options for centered labels
        if (labelsAlign === 'center') {
            connectorLength = 0; // Do not use connector
            options.connectorDistance = 0;
            range.labelAttribs.align = 'center';
        }
        // Render bubble symbol
        symbols.bubbleItems.push(renderer
            .circle(posX, elementCenter + crispMovement, absoluteRadius)
            .attr(styledMode ? {} : range.bubbleAttribs)
            .addClass((styledMode ?
            'highcharts-color-' +
                bubbleSeries.colorIndex + ' ' :
            '') +
            'highcharts-bubble-legend-symbol ' +
            (options.className || '')).add(this.legendItem.symbol));
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
            (options.connectorClassName || '')).add(this.legendItem.symbol));
        // Render label
        const label = renderer
            .text(this.formatLabel(range))
            .attr((styledMode ? {} : range.labelAttribs))
            .css(styledMode ? {} : labelsOptions.style)
            .addClass('highcharts-bubble-legend-labels ' +
            (options.labels.className || '')).add(this.legendItem.symbol);
        // Now that the label is added we can read the bounding box and
        // vertically align
        const position = {
            x: posX + connectorLength + options.labels.x,
            y: posY + options.labels.y + label.getBBox().height * 0.4
        };
        label.attr(position);
        labels.push(label);
        // To enable default 'hideOverlappingLabels' method
        label.placed = true;
        label.alignAttr = position;
    }
    /**
     * Get the label which takes up the most space.
     * @private
     */
    getMaxLabelSize() {
        const labels = this.symbols.labels;
        let maxLabel, labelSize;
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
    }
    /**
     * Get formatted label for range.
     *
     * @private
     *
     * @param {Highcharts.LegendBubbleLegendRangesOptions} range
     *        Range options
     *
     * @return {string}
     *         Range label text
     */
    formatLabel(range) {
        const options = this.options, formatter = options.labels.formatter, format = options.labels.format;
        const { numberFormatter } = this.chart;
        return format ? F.format(format, range, this.chart) :
            formatter ? formatter.call(range) :
                numberFormatter(range.value, 1);
    }
    /**
     * By using default chart 'hideOverlappingLabels' method, hide or show
     * labels and connectors.
     * @private
     */
    hideOverlappingLabels() {
        const chart = this.chart, allowOverlap = this.options.labels.allowOverlap, symbols = this.symbols;
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
    }
    /**
     * Calculate ranges from created series.
     *
     * @private
     *
     * @return {Array<Highcharts.LegendBubbleLegendRangesOptions>}
     *         Array of range objects
     */
    getRanges() {
        const bubbleLegend = this.legend.bubbleLegend, series = bubbleLegend.chart.series, rangesOptions = bubbleLegend.options.ranges;
        let ranges, zData, minZ = Number.MAX_VALUE, maxZ = -Number.MAX_VALUE;
        series.forEach(function (s) {
            // Find the min and max Z, like in bubble series
            if (s.isBubble && !s.ignoreSeries) {
                zData = s.getColumn('z').filter(isNumber);
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
    }
    /**
     * Calculate bubble legend sizes from rendered series.
     *
     * @private
     *
     * @return {Array<number,number>}
     *         Calculated min and max bubble sizes
     */
    predictBubbleSizes() {
        const chart = this.chart, legendOptions = chart.legend.options, floating = legendOptions.floating, horizontal = legendOptions.layout === 'horizontal', lastLineHeight = horizontal ? chart.legend.lastLineHeight : 0, plotSizeX = chart.plotSizeX, plotSizeY = chart.plotSizeY, bubbleSeries = chart.series[this.options.seriesIndex], pxSizes = bubbleSeries.getPxExtremes(), minSize = Math.ceil(pxSizes.minPxSize), maxPxSize = Math.ceil(pxSizes.maxPxSize), plotSize = Math.min(plotSizeY, plotSizeX);
        let calculatedSize, maxSize = bubbleSeries.options.maxSize;
        // Calculate predicted max size of bubble
        if (floating || !(/%$/.test(maxSize))) {
            calculatedSize = maxPxSize;
        }
        else {
            maxSize = parseFloat(maxSize);
            calculatedSize = ((plotSize + lastLineHeight) * maxSize / 100) /
                (maxSize / 100 + 1);
            // Get maxPxSize from bubble series if calculated bubble legend
            // size will not affect to bubbles series.
            if ((horizontal && plotSizeY - calculatedSize >=
                plotSizeX) || (!horizontal && plotSizeX -
                calculatedSize >= plotSizeY)) {
                calculatedSize = maxPxSize;
            }
        }
        return [minSize, Math.ceil(calculatedSize)];
    }
    /**
     * Correct ranges with calculated sizes.
     * @private
     */
    updateRanges(min, max) {
        const bubbleLegendOptions = this.legend.options.bubbleLegend;
        bubbleLegendOptions.minSize = min;
        bubbleLegendOptions.maxSize = max;
        bubbleLegendOptions.ranges = this.getRanges();
    }
    /**
     * Because of the possibility of creating another legend line, predicted
     * bubble legend sizes may differ by a few pixels, so it is necessary to
     * correct them.
     * @private
     */
    correctSizes() {
        const legend = this.legend, chart = this.chart, bubbleSeries = chart.series[this.options.seriesIndex], pxSizes = bubbleSeries.getPxExtremes(), bubbleSeriesSize = pxSizes.maxPxSize, bubbleLegendSize = this.options.maxSize;
        if (Math.abs(Math.ceil(bubbleSeriesSize) - bubbleLegendSize) >
            1) {
            this.updateRanges(this.options.minSize, pxSizes.maxPxSize);
            legend.render();
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default BubbleLegendItem;
/* *
 *
 *  API Declarations
 *
 * */
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
''; // Detach doclets above
