import { extent } from 'd3-array';
import { axisBottom } from 'd3-axis';
import { scaleLinear } from 'd3-scale';
import { MarginMixin } from '../base/margin-mixin.js';
import { ColorMixin } from '../base/color-mixin.js';
import { transition } from '../core/core.js';
import { CFDataCapHelper } from '../data/c-f-data-cap-helper.js';
/**
 * Concrete row chart implementation.
 *
 * Examples:
 * - {@link http://dc-js.github.com/dc.js/ | Nasdaq 100 Index}
 */
export class RowChart extends ColorMixin(MarginMixin) {
    /**
     * Create a Row Chart.
     *
     * TODO update example
     *
     * @example
     * ```
     * // create a row chart under #chart-container1 element using the default global chart group
     * const chart1 = new RowChart('#chart-container1');
     * // create a row chart under #chart-container2 element using chart group A
     * const chart2 = new RowChart('#chart-container2', 'chartGroupA');
     * ```
     */
    constructor(parent, chartGroup) {
        super(parent, chartGroup);
        this.configure({
            label: d => this._conf.keyAccessor(d),
            renderLabel: true,
            title: d => `${this._conf.keyAccessor(d)}: ${d._value}`,
            labelOffsetX: 10,
            labelOffsetY: undefined,
            titleLabelOffsetX: 2,
            gap: 5,
            fixedBarHeight: undefined,
            renderTitleLabel: false,
            elasticX: undefined,
        });
        this.dataProvider(new CFDataCapHelper());
        this._g = undefined;
        this._dyOffset = '0.35em'; // this helps center labels https://github.com/d3/d3-3.x-api-reference/blob/master/SVG-Shapes.md#svg_text
        this._rowCssClass = 'dc_row';
        this._titleRowCssClass = 'titlerow';
        this._x = undefined;
        this._xAxis = axisBottom(undefined);
        this._rowData = undefined;
    }
    configure(conf) {
        super.configure(conf);
        return this;
    }
    conf() {
        return this._conf;
    }
    _calculateAxisScale() {
        if (!this._x || this._conf.elasticX) {
            const _extent = extent(this._rowData, d => d._value);
            if (_extent[0] > 0) {
                _extent[0] = 0;
            }
            if (_extent[1] < 0) {
                _extent[1] = 0;
            }
            this._x = scaleLinear().domain(_extent).range([0, this.effectiveWidth()]);
        }
        this._xAxis.scale(this._x);
    }
    _drawAxis() {
        let axisG = this._g.select('g.axis');
        this._calculateAxisScale();
        if (axisG.empty()) {
            axisG = this._g.append('g').attr('class', 'axis');
        }
        axisG.attr('transform', `translate(0, ${this.effectiveHeight()})`);
        transition(axisG, this._conf.transitionDuration, this._conf.transitionDelay).call(this._xAxis);
    }
    _doRender() {
        this.resetSvg();
        this._g = this.svg()
            .append('g')
            .attr('transform', `translate(${this.margins().left},${this.margins().top})`);
        this._drawChart();
        return this;
    }
    x(scale) {
        if (!arguments.length) {
            return this._x;
        }
        this._x = scale;
        return this;
    }
    _drawGridLines() {
        this._g
            .selectAll('g.tick')
            .select('line.grid-line')
            .remove();
        this._g
            .selectAll('g.tick')
            .append('line')
            .attr('class', 'grid-line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', () => -this.effectiveHeight());
    }
    _drawChart() {
        this._rowData = this.data();
        this._drawAxis();
        this._drawGridLines();
        let rows = this._g
            .selectAll(`g.${this._rowCssClass}`)
            .data(this._rowData);
        this._removeElements(rows);
        rows = this._createElements(rows).merge(rows);
        this._updateElements(rows);
    }
    _createElements(rows) {
        const rowEnter = rows
            .enter()
            .append('g')
            .attr('class', (d, i) => `${this._rowCssClass} _${i}`);
        rowEnter.append('rect').attr('width', 0);
        this._createLabels(rowEnter);
        return rowEnter;
    }
    _removeElements(rows) {
        rows.exit().remove();
    }
    _rootValue() {
        const root = this._x(0);
        return root === -Infinity || root !== root ? this._x(1) : root;
    }
    _updateElements(rows) {
        const n = this._rowData.length;
        let height;
        height = this._conf.fixedBarHeight
            ? this._conf.fixedBarHeight
            : (this.effectiveHeight() - (n + 1) * this._conf.gap) / n;
        // vertically align label in center unless they override the value via property setter
        this._labelOffsetY =
            this._conf.labelOffsetY === undefined ? height / 2 : this._conf.labelOffsetY;
        const rect = rows
            .attr('transform', (d, i) => `translate(0,${(i + 1) * this._conf.gap + i * height})`)
            .select('rect')
            .attr('height', height)
            .attr('fill', (d, i) => this._colorHelper.getColor(d, i))
            .on('click', (evt, d) => this._onClick(d))
            .classed('deselected', d => (this.hasFilter() ? !this._isSelectedRow(d) : false))
            .classed('selected', d => (this.hasFilter() ? this._isSelectedRow(d) : false));
        transition(rect, this._conf.transitionDuration, this._conf.transitionDelay)
            .attr('width', d => Math.abs(this._rootValue() - this._x(d._value)))
            .attr('transform', d => this._translateX(d));
        this._createTitles(rows);
        this._updateLabels(rows);
    }
    _createTitles(rows) {
        if (this._conf.renderTitle) {
            rows.select('title').remove();
            rows.append('title').text(this._conf.title);
        }
    }
    _createLabels(rowEnter) {
        if (this._conf.renderLabel) {
            rowEnter.append('text').on('click', (evt, d) => this._onClick(d));
        }
        if (this._conf.renderTitleLabel) {
            rowEnter
                .append('text')
                .attr('class', this._titleRowCssClass)
                .on('click', (evt, d) => this._onClick(d));
        }
    }
    _updateLabels(rows) {
        if (this._conf.renderLabel) {
            const lab = rows
                .select('text')
                .attr('x', this._conf.labelOffsetX)
                .attr('y', this._labelOffsetY)
                .attr('dy', this._dyOffset)
                .on('click', (evt, d) => this._onClick(d))
                .attr('class', (d, i) => `${this._rowCssClass} _${i}`)
                .text(d => this._conf.label(d));
            transition(lab, this._conf.transitionDuration, this._conf.transitionDelay).attr('transform', d => this._translateX(d));
        }
        if (this._conf.renderTitleLabel) {
            const titlelab = rows
                .select(`.${this._titleRowCssClass}`)
                .attr('x', this.effectiveWidth() - this._conf.titleLabelOffsetX)
                .attr('y', this._labelOffsetY)
                .attr('dy', this._dyOffset)
                .attr('text-anchor', 'end')
                .on('click', (evt, d) => this._onClick(d))
                .attr('class', (d, i) => `${this._titleRowCssClass} _${i}`)
                .text(d => this._conf.title(d));
            transition(titlelab, this._conf.transitionDuration, this._conf.transitionDelay).attr('transform', d => this._translateX(d));
        }
    }
    _onClick(d, i) {
        this.onClick(d, i);
    }
    _translateX(d) {
        const x = this._x(d._value);
        const x0 = this._rootValue();
        const s = x > x0 ? x0 : x;
        return `translate(${s},0)`;
    }
    _doRedraw() {
        this._drawChart();
        return this;
    }
    xAxis(xAxis) {
        if (!arguments.length) {
            return this._xAxis;
        }
        this._xAxis = xAxis;
        return this;
    }
    _isSelectedRow(d) {
        return this.hasFilter(this._conf.keyAccessor(d));
    }
}
//# sourceMappingURL=row-chart.js.map