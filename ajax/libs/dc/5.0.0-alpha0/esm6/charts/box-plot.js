import { scaleBand } from 'd3-scale';
import { select } from 'd3-selection';
import { max, min } from 'd3-array';
import { d3Box } from '../base/d3.box.js';
import { CoordinateGridMixin } from '../base/coordinate-grid-mixin.js';
import { transition } from '../core/core.js';
import { UnitsOrdinal } from '../core/units.js';
import { add, subtract } from '../core/utils.js';
// Returns a function to compute the interquartile range.
function defaultWhiskersIQR(k) {
    return d => {
        const q1 = d.quartiles[0];
        const q3 = d.quartiles[2];
        const iqr = (q3 - q1) * k;
        let i = -1;
        let j = d.length;
        do {
            ++i;
        } while (d[i] < q1 - iqr);
        do {
            --j;
        } while (d[j] > q3 + iqr);
        return [i, j];
    };
}
/**
 * A box plot is a chart that depicts numerical data via their quartile ranges.
 *
 * Examples:
 * - {@link http://dc-js.github.io/dc.js/examples/boxplot-basic.html | Boxplot Basic example}
 * - {@link http://dc-js.github.io/dc.js/examples/boxplot-enhanced.html | Boxplot Enhanced example}
 * - {@link http://dc-js.github.io/dc.js/examples/boxplot-render-data.html | Boxplot Render Data example}
 * - {@link http://dc-js.github.io/dc.js/examples/boxplot-time.html | Boxplot time example}
 */
export class BoxPlot extends CoordinateGridMixin {
    /**
     * Create a BoxPlot.
     *
     * TODO: update example
     * @example
     * ```
     * // create a box plot under #chart-container1 element using the default global chart group
     * var boxPlot1 = new BoxPlot('#chart-container1');
     * // create a box plot under #chart-container2 element using chart group A
     * var boxPlot2 = new BoxPlot('#chart-container2', 'chartGroupA');
     * @param parent - Any valid {@link https://github.com/d3/d3-selection/blob/master/README.md#select | d3 single selector} specifying
     * a dom block element such as a div; or a dom element or d3 selection.
     * @param chartGroup - The name of the chart group this chart instance should be placed in.
     * Interaction with a chart will only trigger events and redraws within the chart's group.
     * ```
     */
    constructor(parent, chartGroup) {
        super(parent, chartGroup);
        const whiskerIqrFactor = 1.5;
        this._whiskers = defaultWhiskersIQR(whiskerIqrFactor);
        this._box = d3Box();
        this.configure({
            xUnits: UnitsOrdinal,
            tickFormat: null,
            renderDataPoints: false,
            dataOpacity: 0.3,
            dataWidthPortion: 0.8,
            showOutliers: true,
            boldOutlier: false,
            // Used in yAxisMin and yAxisMax to add padding in pixel coordinates
            // so the min and max data points/whiskers are within the chart
            yRangePadding: 8,
        });
        this._boxWidth = (innerChartWidth, xUnits) => {
            if (this.isOrdinal()) {
                return this.x().bandwidth();
            }
            else {
                return innerChartWidth / (1 + this.boxPadding()) / xUnits;
            }
        };
        // default to ordinal
        this.x(scaleBand());
        this.boxPadding(0.8);
        this.outerPadding(0.5);
    }
    configure(conf) {
        super.configure(conf);
        return this;
    }
    conf() {
        return this._conf;
    }
    data() {
        // valueAccessor should return an array of values that can be coerced into numbers
        // or if data is overloaded for a static array of arrays, it should be `Number`.
        // Empty arrays are not included.
        return super
            .data()
            .map(d => {
            d.map = accessor => accessor.call(d, d);
            return d;
        })
            .filter(d => {
            const values = d._value;
            return values.length !== 0;
        });
    }
    boxPadding(padding) {
        if (!arguments.length) {
            return this._rangeBandPadding();
        }
        return this._rangeBandPadding(padding);
    }
    outerPadding(padding) {
        if (!arguments.length) {
            return this._outerRangeBandPadding();
        }
        return this._outerRangeBandPadding(padding);
    }
    boxWidth(boxWidth) {
        if (!arguments.length) {
            return this._boxWidth;
        }
        this._boxWidth = typeof boxWidth === 'function' ? boxWidth : () => boxWidth;
        return this;
    }
    _boxTransform(d, i) {
        const xOffset = this.x()(this._conf.keyAccessor(d, i));
        return `translate(${xOffset}, 0)`;
    }
    _preprocessData() {
        if (this._conf.elasticX) {
            this.x().domain([]);
        }
    }
    plotData() {
        const calculatedBoxWidth = this._boxWidth(this.effectiveWidth(), this.xUnitCount());
        this._box
            .whiskers(this._whiskers)
            .width(calculatedBoxWidth)
            .height(this.effectiveHeight())
            .value(d => d._value)
            .domain(this.y().domain())
            .duration(this._conf.transitionDuration)
            .tickFormat(this._conf.tickFormat)
            .renderDataPoints(this._conf.renderDataPoints)
            .dataOpacity(this._conf.dataOpacity)
            .dataWidthPortion(this._conf.dataWidthPortion)
            .renderTitle(this._conf.renderTitle)
            .showOutliers(this._conf.showOutliers)
            .boldOutlier(this._conf.boldOutlier);
        const boxesG = this.chartBodyG()
            .selectAll('g.box')
            .data(this.data(), this._conf.keyAccessor);
        const boxesGEnterUpdate = this._renderBoxes(boxesG);
        this._updateBoxes(boxesGEnterUpdate);
        this._removeBoxes(boxesG);
        this.fadeDeselectedArea(this.filter());
    }
    _renderBoxes(boxesG) {
        const boxesGEnter = boxesG.enter().append('g');
        boxesGEnter
            .attr('class', 'box')
            .attr('transform', (d, i) => this._boxTransform(d, i))
            .call(this._box)
            .on('click', (evt, d) => {
            this.filter(this._conf.keyAccessor(d));
            this.redrawGroup();
        });
        return boxesGEnter.merge(boxesG);
    }
    _updateBoxes(boxesG) {
        const chart = this;
        transition(boxesG, this._conf.transitionDuration, this._conf.transitionDelay)
            .attr('transform', (d, i) => this._boxTransform(d, i))
            .call(this._box)
            .each(function (d) {
            const color = chart._colorHelper.getColor(d, 0);
            select(this).select('rect.box').attr('fill', color);
            select(this).selectAll('circle.data').attr('fill', color);
        });
    }
    _removeBoxes(boxesG) {
        boxesG.exit().remove().call(this._box);
    }
    _minDataValue() {
        // @ts-ignore
        return min(this.data(), e => min(e._value));
    }
    _maxDataValue() {
        // @ts-ignore
        return max(this.data(), e => max(e._value));
    }
    _yAxisRangeRatio() {
        return (this._maxDataValue() - this._minDataValue()) / this.effectiveHeight();
    }
    fadeDeselectedArea(brushSelection) {
        const chart = this;
        if (this.hasFilter()) {
            if (this.isOrdinal()) {
                this.g()
                    .selectAll('g.box')
                    .each(function (d) {
                    if (chart.isSelectedNode(d)) {
                        chart.highlightSelected(this);
                    }
                    else {
                        chart.fadeDeselected(this);
                    }
                });
            }
            else {
                if (!(this._conf.brushOn || this._conf.parentBrushOn)) {
                    return;
                }
                const start = brushSelection[0];
                const end = brushSelection[1];
                this.g()
                    .selectAll('g.box')
                    .each(function (d) {
                    const key = chart._conf.keyAccessor(d);
                    if (key < start || key >= end) {
                        chart.fadeDeselected(this);
                    }
                    else {
                        chart.highlightSelected(this);
                    }
                });
            }
        }
        else {
            this.g()
                .selectAll('g.box')
                .each(function () {
                chart.resetHighlight(this);
            });
        }
    }
    isSelectedNode(d) {
        return this.hasFilter(this._conf.keyAccessor(d));
    }
    yAxisMin() {
        const padding = this._conf.yRangePadding * this._yAxisRangeRatio();
        return subtract(this._minDataValue() - padding, this._conf.yAxisPadding);
    }
    yAxisMax() {
        const padding = this._conf.yRangePadding * this._yAxisRangeRatio();
        return add(this._maxDataValue() + padding, this._conf.yAxisPadding);
    }
}
//# sourceMappingURL=box-plot.js.map