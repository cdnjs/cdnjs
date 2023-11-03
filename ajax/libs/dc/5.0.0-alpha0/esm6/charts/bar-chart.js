import { select } from 'd3-selection';
import { StackMixin } from '../base/stack-mixin.js';
import { transition } from '../core/core.js';
import { constants } from '../core/constants.js';
import { logger } from '../core/logger.js';
import { pluck2, printSingleValue, safeNumber } from '../core/utils.js';
const MIN_BAR_WIDTH = 1;
const DEFAULT_GAP_BETWEEN_BARS = 2;
const LABEL_PADDING = 3;
/**
 * Concrete bar chart/histogram implementation.
 *
 * Examples:
 * - {@link http://dc-js.github.com/dc.js/ | Nasdaq 100 Index}
 * - {@link http://dc-js.github.com/dc.js/crime/index.html | Canadian City Crime Stats}
 */
export class BarChart extends StackMixin {
    /**
     * Create a Bar Chart
     *
     * TODO: update example for chartGroup
     *
     * @example
     * ```
     * // create a bar chart under #chart-container1 element using the default global chart group
     * var chart1 = new BarChart('#chart-container1');
     * // create a bar chart under #chart-container2 element using chart group A
     * var chart2 = new BarChart('#chart-container2', 'chartGroupA');
     * // create a sub-chart under a composite parent chart
     * var chart3 = new BarChart(compositeChart);
     * {@link https://github.com/d3/d3-selection/blob/master/README.md#select | d3 single selector}
     * specifying a dom block element such as a div; or a dom element or d3 selection.  If the bar
     * chart is a sub-chart in a {@link CompositeChart | Composite Chart} then pass in the parent
     * composite chart instance instead.
     * Interaction with a chart will only trigger events and redraws within the chart's group.
     * ```
     */
    constructor(parent, chartGroup) {
        super(parent, chartGroup);
        this.configure({
            label: d => printSingleValue(d.y0 + d.y),
            renderLabel: false,
            centerBar: false,
            alwaysUseRounding: false,
        });
        this._gap = DEFAULT_GAP_BETWEEN_BARS; // TODO: after untangling it with outer/inner paddings try to move to conf
        this._barWidth = undefined;
    }
    configure(conf) {
        super.configure(conf);
        return this;
    }
    conf() {
        return this._conf;
    }
    outerPadding(padding) {
        if (!arguments.length) {
            return this._outerRangeBandPadding();
        }
        return this._outerRangeBandPadding(padding);
    }
    rescale() {
        super.rescale();
        this._barWidth = undefined;
        return this;
    }
    render() {
        if (this._conf.round && this._conf.centerBar && !this._conf.alwaysUseRounding) {
            logger.warn('By default, brush rounding is disabled if bars are centered. ' +
                'See dc.js bar chart API documentation for details.');
        }
        return super.render();
    }
    plotData() {
        let layers = this.chartBodyG().selectAll('g.stack').data(this.data());
        this._calculateBarWidth();
        layers = layers
            .enter()
            .append('g')
            .attr('class', (d, i) => `stack _${i}`)
            .merge(layers);
        const last = layers.size() - 1;
        {
            const chart = this;
            layers.each(function (d, i) {
                const layer = select(this);
                chart._renderBars(layer, i, d);
                if (chart._conf.renderLabel && last === i) {
                    chart._renderLabels(layer, i, d);
                }
            });
        }
    }
    _barHeight(d) {
        return safeNumber(Math.abs(this.y()(d.y + d.y0) - this.y()(d.y0)));
    }
    _labelXPos(d) {
        let x = this.x()(d.x);
        if (!this._conf.centerBar) {
            x += this._barWidth / 2;
        }
        if (this.isOrdinal() && this._gap !== undefined) {
            x += this._gap / 2;
        }
        return safeNumber(x);
    }
    _labelYPos(d) {
        let y = this.y()(d.y + d.y0);
        if (d.y < 0) {
            y -= this._barHeight(d);
        }
        return safeNumber(y - LABEL_PADDING);
    }
    _renderLabels(layer, layerIndex, data) {
        const labels = layer
            .selectAll('text.barLabel')
            .data(data.values, d => d.x);
        const labelsEnterUpdate = labels
            .enter()
            .append('text')
            .attr('class', 'barLabel')
            .attr('text-anchor', 'middle')
            .attr('x', d => this._labelXPos(d))
            .attr('y', d => this._labelYPos(d))
            .merge(labels);
        if (this.isOrdinal()) {
            labelsEnterUpdate.on('click', (evt, d) => this.onClick(d));
            labelsEnterUpdate.attr('cursor', 'pointer');
        }
        transition(labelsEnterUpdate, this._conf.transitionDuration, this._conf.transitionDelay)
            .attr('x', d => this._labelXPos(d))
            .attr('y', d => this._labelYPos(d))
            .text(d => this._conf.label(d));
        transition(labels.exit(), this._conf.transitionDuration, this._conf.transitionDelay)
            .attr('height', 0)
            .remove();
    }
    _barXPos(d) {
        let x = this.x()(d.x);
        if (this._conf.centerBar) {
            x -= this._barWidth / 2;
        }
        if (this.isOrdinal() && this._gap !== undefined) {
            x += this._gap / 2;
        }
        return safeNumber(x);
    }
    _renderBars(layer, layerIndex, data) {
        const bars = layer
            .selectAll('rect.bar')
            .data(data.values, d => d.x);
        const enter = bars
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('fill', (d, i) => this._colorHelper.getColor(d, i))
            .attr('x', d => this._barXPos(d))
            .attr('y', this._yAxisHeight())
            .attr('height', 0);
        // prettier-ignore
        const barsEnterUpdate = enter.merge(bars);
        if (this._conf.renderTitle) {
            enter.append('title').text(pluck2('data', this.titleFn(data.name)));
        }
        if (this.isOrdinal()) {
            barsEnterUpdate.on('click', (evt, d) => this.onClick(d));
        }
        transition(barsEnterUpdate, this._conf.transitionDuration, this._conf.transitionDelay)
            .attr('x', d => this._barXPos(d))
            .attr('y', d => {
            let y = this.y()(d.y + d.y0);
            if (d.y < 0) {
                y -= this._barHeight(d);
            }
            return safeNumber(y);
        })
            .attr('width', this._barWidth)
            .attr('height', d => this._barHeight(d))
            .attr('fill', (d, i) => this._colorHelper.getColor(d, i))
            .select('title')
            .text(pluck2('data', this.titleFn(data.name)));
        transition(bars.exit(), this._conf.transitionDuration, this._conf.transitionDelay)
            .attr('x', d => this.x()(d.x))
            .attr('width', this._barWidth * 0.9)
            .remove();
    }
    _calculateBarWidth() {
        if (this._barWidth === undefined) {
            const numberOfBars = this.xUnitCount();
            // please can't we always use rangeBands for bar charts?
            if (this.isOrdinal() && this._gap === undefined) {
                this._barWidth = Math.floor(this.x().bandwidth());
            }
            else if (this._gap) {
                this._barWidth = Math.floor((this._xAxisLength() - (numberOfBars - 1) * this._gap) / numberOfBars);
            }
            else {
                this._barWidth = Math.floor(this._xAxisLength() / (1 + this.barPadding()) / numberOfBars);
            }
            if (this._barWidth === Infinity ||
                isNaN(this._barWidth) ||
                this._barWidth < MIN_BAR_WIDTH) {
                this._barWidth = MIN_BAR_WIDTH;
            }
        }
    }
    fadeDeselectedArea(brushSelection) {
        // prettier-ignore
        const bars = this.chartBodyG().selectAll('rect.bar');
        if (this.isOrdinal()) {
            if (this.hasFilter()) {
                bars.classed(constants.SELECTED_CLASS, d => this.hasFilter(d.x));
                bars.classed(constants.DESELECTED_CLASS, d => !this.hasFilter(d.x));
            }
            else {
                bars.classed(constants.SELECTED_CLASS, false);
                bars.classed(constants.DESELECTED_CLASS, false);
            }
        }
        else if (this._conf.brushOn || this._conf.parentBrushOn) {
            if (!this._brushIsEmpty(brushSelection)) {
                const start = brushSelection[0];
                const end = brushSelection[1];
                bars.classed(constants.DESELECTED_CLASS, d => d.x < start || d.x >= end);
            }
            else {
                bars.classed(constants.DESELECTED_CLASS, false);
            }
        }
    }
    onClick(d, i) {
        super.onClick(d.data, i);
    }
    barPadding(barPadding) {
        if (!arguments.length) {
            return this._rangeBandPadding();
        }
        this._rangeBandPadding(barPadding);
        this._gap = undefined;
        return this;
    }
    _useOuterPadding() {
        return this._gap === undefined;
    }
    gap(gap) {
        if (!arguments.length) {
            return this._gap;
        }
        this._gap = gap;
        return this;
    }
    _extendBrush(brushSelection) {
        if (brushSelection &&
            this._conf.round &&
            (!this._conf.centerBar || this._conf.alwaysUseRounding)) {
            brushSelection[0] = this._conf.round(brushSelection[0]);
            brushSelection[1] = this._conf.round(brushSelection[1]);
        }
        return brushSelection;
    }
    legendHighlight(d) {
        const colorFilter = (color, inv) => function () {
            const item = select(this);
            const match = item.attr('fill') === color;
            return inv ? !match : match;
        };
        if (!this.isLegendableHidden(d)) {
            this.g()
                .selectAll('rect.bar')
                .classed('highlight', colorFilter(d.color))
                .classed('fadeout', colorFilter(d.color, true));
        }
    }
    legendReset() {
        this.g().selectAll('rect.bar').classed('highlight', false).classed('fadeout', false);
    }
    xAxisMax() {
        let max = super.xAxisMax();
        if ('resolution' in this._conf.xUnits) {
            const res = this._conf.xUnits.resolution;
            max = max + res; // max can be date as well, this case refers when xUnits is floating point
        }
        return max;
    }
}
//# sourceMappingURL=bar-chart.js.map