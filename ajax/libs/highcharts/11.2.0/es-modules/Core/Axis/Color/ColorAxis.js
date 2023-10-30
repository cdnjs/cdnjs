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
import Axis from '../Axis.js';
import ColorAxisComposition from './ColorAxisComposition.js';
import ColorAxisDefaults from './ColorAxisDefaults.js';
import ColorAxisLike from './ColorAxisLike.js';
import LegendSymbol from '../../Legend/LegendSymbol.js';
import SeriesRegistry from '../../Series/SeriesRegistry.js';
const { series: Series } = SeriesRegistry;
import U from '../../Utilities.js';
const { extend, fireEvent, isArray, isNumber, merge, pick } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * The ColorAxis object for inclusion in gradient legends.
 *
 * @class
 * @name Highcharts.ColorAxis
 * @augments Highcharts.Axis
 *
 * @param {Highcharts.Chart} chart
 * The related chart of the color axis.
 *
 * @param {Highcharts.ColorAxisOptions} userOptions
 * The color axis options for initialization.
 */
class ColorAxis extends Axis {
    /* *
     *
     *  Static Functions
     *
     * */
    static compose(ChartClass, FxClass, LegendClass, SeriesClass) {
        ColorAxisComposition.compose(ColorAxis, ChartClass, FxClass, LegendClass, SeriesClass);
    }
    /* *
     *
     *  Constructors
     *
     * */
    /**
     * @private
     */
    constructor(chart, userOptions) {
        super(chart, userOptions);
        // Prevents unnecessary padding with `hc-more`
        this.beforePadding = false;
        this.chart = void 0;
        this.coll = 'colorAxis';
        this.dataClasses = void 0;
        this.options = void 0;
        this.stops = void 0;
        this.visible = true;
        this.init(chart, userOptions);
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Initializes the color axis.
     *
     * @function Highcharts.ColorAxis#init
     *
     * @param {Highcharts.Chart} chart
     * The related chart of the color axis.
     *
     * @param {Highcharts.ColorAxisOptions} userOptions
     * The color axis options for initialization.
     */
    init(chart, userOptions) {
        const axis = this;
        const legend = chart.options.legend || {}, horiz = userOptions.layout ?
            userOptions.layout !== 'vertical' :
            legend.layout !== 'vertical', visible = userOptions.visible;
        const options = merge(ColorAxis.defaultColorAxisOptions, userOptions, {
            showEmpty: false,
            title: null,
            visible: legend.enabled && visible !== false
        });
        axis.side = userOptions.side || horiz ? 2 : 1;
        axis.reversed = userOptions.reversed || !horiz;
        axis.opposite = !horiz;
        super.init(chart, options, 'colorAxis');
        // Super.init saves the extended user options, now replace it with the
        // originals
        this.userOptions = userOptions;
        if (isArray(chart.userOptions.colorAxis)) {
            chart.userOptions.colorAxis[this.index] = userOptions;
        }
        // Prepare data classes
        if (userOptions.dataClasses) {
            axis.initDataClasses(userOptions);
        }
        axis.initStops();
        // Override original axis properties
        axis.horiz = horiz;
        axis.zoomEnabled = false;
    }
    /**
     * Returns true if the series has points at all.
     *
     * @function Highcharts.ColorAxis#hasData
     *
     * @return {boolean}
     * True, if the series has points, otherwise false.
     */
    hasData() {
        return !!(this.tickPositions || []).length;
    }
    /**
     * Override so that ticks are not added in data class axes (#6914)
     * @private
     */
    setTickPositions() {
        if (!this.dataClasses) {
            return super.setTickPositions();
        }
    }
    /**
     * Extend the setOptions method to process extreme colors and color stops.
     * @private
     */
    setOptions(userOptions) {
        const axis = this;
        super.setOptions(userOptions);
        axis.options.crosshair = axis.options.marker;
    }
    /**
     * @private
     */
    setAxisSize() {
        const axis = this;
        const symbol = axis.legendItem && axis.legendItem.symbol;
        const chart = axis.chart;
        const legendOptions = chart.options.legend || {};
        let x, y, width, height;
        if (symbol) {
            this.left = x = symbol.attr('x');
            this.top = y = symbol.attr('y');
            this.width = width = symbol.attr('width');
            this.height = height = symbol.attr('height');
            this.right = chart.chartWidth - x - width;
            this.bottom = chart.chartHeight - y - height;
            this.len = this.horiz ? width : height;
            this.pos = this.horiz ? x : y;
        }
        else {
            // Fake length for disabled legend to avoid tick issues
            // and such (#5205)
            this.len = (this.horiz ?
                legendOptions.symbolWidth :
                legendOptions.symbolHeight) || ColorAxis.defaultLegendLength;
        }
    }
    /**
     * Override the getOffset method to add the whole axis groups inside the
     * legend.
     * @private
     */
    getOffset() {
        const axis = this;
        const group = axis.legendItem && axis.legendItem.group;
        const sideOffset = axis.chart.axisOffset[axis.side];
        if (group) {
            // Hook for the getOffset method to add groups to this parent
            // group
            axis.axisParent = group;
            // Call the base
            super.getOffset();
            const legend = this.chart.legend;
            // Adds `maxLabelLength` needed for label padding corrections done
            // by `render()` and `getMargins()` (#15551).
            legend.allItems.forEach(function (item) {
                if (item instanceof ColorAxis) {
                    item.drawLegendSymbol(legend, item);
                }
            });
            legend.render();
            this.chart.getMargins(true);
            // First time only
            if (!axis.added) {
                axis.added = true;
                axis.labelLeft = 0;
                axis.labelRight = axis.width;
            }
            // Reset it to avoid color axis reserving space
            axis.chart.axisOffset[axis.side] = sideOffset;
        }
    }
    /**
     * Create the color gradient.
     * @private
     */
    setLegendColor() {
        const axis = this;
        const horiz = axis.horiz;
        const reversed = axis.reversed;
        const one = reversed ? 1 : 0;
        const zero = reversed ? 0 : 1;
        const grad = horiz ? [one, 0, zero, 0] : [0, zero, 0, one]; // #3190
        axis.legendColor = {
            linearGradient: {
                x1: grad[0],
                y1: grad[1],
                x2: grad[2],
                y2: grad[3]
            },
            stops: axis.stops
        };
    }
    /**
     * The color axis appears inside the legend and has its own legend symbol.
     * @private
     */
    drawLegendSymbol(legend, item) {
        const axis = this, legendItem = item.legendItem || {}, padding = legend.padding, legendOptions = legend.options, labelOptions = axis.options.labels, itemDistance = pick(legendOptions.itemDistance, 10), horiz = axis.horiz, width = pick(legendOptions.symbolWidth, horiz ? ColorAxis.defaultLegendLength : 12), height = pick(legendOptions.symbolHeight, horiz ? 12 : ColorAxis.defaultLegendLength), labelPadding = pick(
        // @todo: This option is not documented, nor implemented when
        // vertical
        legendOptions.labelPadding, horiz ? 16 : 30);
        this.setLegendColor();
        // Create the gradient
        if (!legendItem.symbol) {
            legendItem.symbol = this.chart.renderer.symbol('roundedRect', 0, legend.baseline - 11, width, height, { r: legendOptions.symbolRadius ?? 3 }).attr({
                zIndex: 1
            }).add(legendItem.group);
        }
        // Set how much space this legend item takes up
        legendItem.labelWidth = (width +
            padding +
            (horiz ?
                itemDistance :
                pick(labelOptions.x, labelOptions.distance) +
                    this.maxLabelLength));
        legendItem.labelHeight = height + padding + (horiz ? labelPadding : 0);
    }
    /**
     * Fool the legend.
     * @private
     */
    setState(state) {
        this.series.forEach(function (series) {
            series.setState(state);
        });
    }
    /**
     * @private
     */
    setVisible() {
    }
    /**
     * @private
     */
    getSeriesExtremes() {
        const axis = this;
        const series = axis.series;
        let colorValArray, colorKey, colorValIndex, pointArrayMap, calculatedExtremes, cSeries, i = series.length, yData, j;
        this.dataMin = Infinity;
        this.dataMax = -Infinity;
        while (i--) { // x, y, value, other
            cSeries = series[i];
            colorKey = cSeries.colorKey = pick(cSeries.options.colorKey, cSeries.colorKey, cSeries.pointValKey, cSeries.zoneAxis, 'y');
            pointArrayMap = cSeries.pointArrayMap;
            calculatedExtremes = cSeries[colorKey + 'Min'] &&
                cSeries[colorKey + 'Max'];
            if (cSeries[colorKey + 'Data']) {
                colorValArray = cSeries[colorKey + 'Data'];
            }
            else {
                if (!pointArrayMap) {
                    colorValArray = cSeries.yData;
                }
                else {
                    colorValArray = [];
                    colorValIndex = pointArrayMap.indexOf(colorKey);
                    yData = cSeries.yData;
                    if (colorValIndex >= 0 && yData) {
                        for (j = 0; j < yData.length; j++) {
                            colorValArray.push(pick(yData[j][colorValIndex], yData[j]));
                        }
                    }
                }
            }
            // If color key extremes are already calculated, use them.
            if (calculatedExtremes) {
                cSeries.minColorValue = cSeries[colorKey + 'Min'];
                cSeries.maxColorValue = cSeries[colorKey + 'Max'];
            }
            else {
                const cExtremes = Series.prototype.getExtremes.call(cSeries, colorValArray);
                cSeries.minColorValue = cExtremes.dataMin;
                cSeries.maxColorValue = cExtremes.dataMax;
            }
            if (typeof cSeries.minColorValue !== 'undefined') {
                this.dataMin =
                    Math.min(this.dataMin, cSeries.minColorValue);
                this.dataMax =
                    Math.max(this.dataMax, cSeries.maxColorValue);
            }
            if (!calculatedExtremes) {
                Series.prototype.applyExtremes.call(cSeries);
            }
        }
    }
    /**
     * Internal function to draw a crosshair.
     *
     * @function Highcharts.ColorAxis#drawCrosshair
     *
     * @param {Highcharts.PointerEventObject} [e]
     *        The event arguments from the modified pointer event, extended with
     *        `chartX` and `chartY`
     *
     * @param {Highcharts.Point} [point]
     *        The Point object if the crosshair snaps to points.
     *
     * @emits Highcharts.ColorAxis#event:afterDrawCrosshair
     * @emits Highcharts.ColorAxis#event:drawCrosshair
     */
    drawCrosshair(e, point) {
        const axis = this, legendItem = axis.legendItem || {}, plotX = point && point.plotX, plotY = point && point.plotY, axisPos = axis.pos, axisLen = axis.len;
        let crossPos;
        if (point) {
            crossPos = axis.toPixels(point.getNestedProperty(point.series.colorKey));
            if (crossPos < axisPos) {
                crossPos = axisPos - 2;
            }
            else if (crossPos > axisPos + axisLen) {
                crossPos = axisPos + axisLen + 2;
            }
            point.plotX = crossPos;
            point.plotY = axis.len - crossPos;
            super.drawCrosshair(e, point);
            point.plotX = plotX;
            point.plotY = plotY;
            if (axis.cross &&
                !axis.cross.addedToColorAxis &&
                legendItem.group) {
                axis.cross
                    .addClass('highcharts-coloraxis-marker')
                    .add(legendItem.group);
                axis.cross.addedToColorAxis = true;
                if (!axis.chart.styledMode &&
                    typeof axis.crosshair === 'object') {
                    axis.cross.attr({
                        fill: axis.crosshair.color
                    });
                }
            }
        }
    }
    /**
     * @private
     */
    getPlotLinePath(options) {
        const axis = this, left = axis.left, pos = options.translatedValue, top = axis.top;
        // crosshairs only
        return isNumber(pos) ? // pos can be 0 (#3969)
            (axis.horiz ? [
                ['M', pos - 4, top - 6],
                ['L', pos + 4, top - 6],
                ['L', pos, top],
                ['Z']
            ] : [
                ['M', left, pos],
                ['L', left - 6, pos + 6],
                ['L', left - 6, pos - 6],
                ['Z']
            ]) :
            super.getPlotLinePath(options);
    }
    /**
     * Updates a color axis instance with a new set of options. The options are
     * merged with the existing options, so only new or altered options need to
     * be specified.
     *
     * @function Highcharts.ColorAxis#update
     *
     * @param {Highcharts.ColorAxisOptions} newOptions
     * The new options that will be merged in with existing options on the color
     * axis.
     *
     * @param {boolean} [redraw]
     * Whether to redraw the chart after the color axis is altered. If doing
     * more operations on the chart, it is a good idea to set redraw to `false`
     * and call {@link Highcharts.Chart#redraw} after.
     */
    update(newOptions, redraw) {
        const axis = this, chart = axis.chart, legend = chart.legend;
        this.series.forEach((series) => {
            // Needed for Axis.update when choropleth colors change
            series.isDirtyData = true;
        });
        // When updating data classes, destroy old items and make sure new
        // ones are created (#3207)
        if (newOptions.dataClasses && legend.allItems || axis.dataClasses) {
            axis.destroyItems();
        }
        super.update(newOptions, redraw);
        if (axis.legendItem && axis.legendItem.label) {
            axis.setLegendColor();
            legend.colorizeItem(this, true);
        }
    }
    /**
     * Destroy color axis legend items.
     * @private
     */
    destroyItems() {
        const axis = this, chart = axis.chart, legendItem = axis.legendItem || {};
        if (legendItem.label) {
            chart.legend.destroyItem(axis);
        }
        else if (legendItem.labels) {
            for (const item of legendItem.labels) {
                chart.legend.destroyItem(item);
            }
        }
        chart.isDirtyLegend = true;
    }
    //   Removing the whole axis (#14283)
    destroy() {
        this.chart.isDirtyLegend = true;
        this.destroyItems();
        super.destroy(...[].slice.call(arguments));
    }
    /**
     * Removes the color axis and the related legend item.
     *
     * @function Highcharts.ColorAxis#remove
     *
     * @param {boolean} [redraw=true]
     *        Whether to redraw the chart following the remove.
     */
    remove(redraw) {
        this.destroyItems();
        super.remove(redraw);
    }
    /**
     * Get the legend item symbols for data classes.
     * @private
     */
    getDataClassLegendSymbols() {
        const axis = this, chart = axis.chart, legendItems = (axis.legendItem &&
            axis.legendItem.labels ||
            []), legendOptions = chart.options.legend, valueDecimals = pick(legendOptions.valueDecimals, -1), valueSuffix = pick(legendOptions.valueSuffix, '');
        const getPointsInDataClass = (i) => axis.series.reduce((points, s) => {
            points.push(...s.points.filter((point) => point.dataClass === i));
            return points;
        }, []);
        let name;
        if (!legendItems.length) {
            axis.dataClasses.forEach((dataClass, i) => {
                const from = dataClass.from, to = dataClass.to, { numberFormatter } = chart;
                let vis = true;
                // Assemble the default name. This can be overridden
                // by legend.options.labelFormatter
                name = '';
                if (typeof from === 'undefined') {
                    name = '< ';
                }
                else if (typeof to === 'undefined') {
                    name = '> ';
                }
                if (typeof from !== 'undefined') {
                    name += numberFormatter(from, valueDecimals) + valueSuffix;
                }
                if (typeof from !== 'undefined' && typeof to !== 'undefined') {
                    name += ' - ';
                }
                if (typeof to !== 'undefined') {
                    name += numberFormatter(to, valueDecimals) + valueSuffix;
                }
                // Add a mock object to the legend items
                legendItems.push(extend({
                    chart,
                    name,
                    options: {},
                    drawLegendSymbol: LegendSymbol.rectangle,
                    visible: true,
                    isDataClass: true,
                    // Override setState to set either normal or inactive
                    // state to all points in this data class
                    setState: (state) => {
                        for (const point of getPointsInDataClass(i)) {
                            point.setState(state);
                        }
                    },
                    // Override setState to show or hide all points in this
                    // data class
                    setVisible: function () {
                        this.visible = vis = axis.visible = !vis;
                        const affectedSeries = [];
                        for (const point of getPointsInDataClass(i)) {
                            point.setVisible(vis);
                            if (affectedSeries.indexOf(point.series) === -1) {
                                affectedSeries.push(point.series);
                            }
                        }
                        chart.legend.colorizeItem(this, vis);
                        affectedSeries.forEach((series) => {
                            fireEvent(series, 'afterDataClassLegendClick');
                        });
                    }
                }, dataClass));
            });
        }
        return legendItems;
    }
}
/* *
 *
 *  Static Properties
 *
 * */
ColorAxis.defaultColorAxisOptions = ColorAxisDefaults;
ColorAxis.defaultLegendLength = 200;
/**
 * @private
 */
ColorAxis.keepProps = [
    'legendItem'
];
extend(ColorAxis.prototype, ColorAxisLike);
/* *
 *
 *  Registry
 *
 * */
// Properties to preserve after destroy, for Axis.update (#5881, #6025).
Array.prototype.push.apply(Axis.keepProps, ColorAxis.keepProps);
/* *
 *
 *  Default Export
 *
 * */
export default ColorAxis;
/* *
 *
 *  API Declarations
 *
 * */
/**
 * Color axis types
 *
 * @typedef {"linear"|"logarithmic"} Highcharts.ColorAxisTypeValue
 */
''; // detach doclet above
