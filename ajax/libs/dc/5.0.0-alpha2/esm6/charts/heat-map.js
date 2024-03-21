import { ascending } from 'd3-array';
import { scaleBand } from 'd3-scale';
import { transition } from '../core/core.js';
import { logger } from '../core/logger.js';
import { events } from '../core/events.js';
import { ColorMixin } from '../base/color-mixin.js';
import { MarginMixin } from '../base/margin-mixin.js';
import { TwoDimensionalFilter } from '../core/filters/two-dimensional-filter.js';
const DEFAULT_BORDER_RADIUS = 6.75;
/**
 * A heat map is matrix that represents the values of two dimensions of data using colors.
 */
export class HeatMap extends ColorMixin(MarginMixin) {
    /**
     * Create a Heat Map
     *
     * TODO update example
     * @example
     * ```
     * // create a heat map under #chart-container1 element using the default global chart group
     * const heatMap1 = new HeatMap('#chart-container1');
     * // create a heat map under #chart-container2 element using chart group A
     * const heatMap2 = new HeatMap('#chart-container2', 'chartGroupA');
     * ```
     */
    constructor(parent, chartGroup) {
        super(parent, chartGroup);
        this.configure({
            cols: undefined,
            rows: undefined,
            colOrdering: ascending,
            rowOrdering: ascending,
            xBorderRadius: DEFAULT_BORDER_RADIUS,
            yBorderRadius: DEFAULT_BORDER_RADIUS,
            colsLabel: d => d,
            rowsLabel: d => d,
            title: this._conf.colorAccessor,
            xAxisOnClick: d => {
                this._filterAxis(0, d);
            },
            yAxisOnClick: d => {
                this._filterAxis(1, d);
            },
            boxOnClick: d => {
                const filter = d.key;
                events.trigger(() => {
                    this.filter(new TwoDimensionalFilter(filter));
                    this.redrawGroup();
                });
            },
        });
        this._chartBody = undefined;
        this._colScale = scaleBand();
        this._rowScale = scaleBand();
        this._mandatoryAttributes(['group']);
    }
    configure(conf) {
        super.configure(conf);
        return this;
    }
    conf() {
        return this._conf;
    }
    _filterAxis(axis, value) {
        const cellsOnAxis = this.selectAll('.box-group').filter(d => d.key[axis] === value);
        const unfilteredCellsOnAxis = cellsOnAxis.filter(d => !this.hasFilter(d.key));
        events.trigger(() => {
            const selection = unfilteredCellsOnAxis.empty() ? cellsOnAxis : unfilteredCellsOnAxis;
            const filtersList = selection.data().map(kv => new TwoDimensionalFilter(kv.key));
            this.filter([filtersList]);
            this.redrawGroup();
        });
    }
    filter(filter) {
        const nonstandardFilter = f => {
            logger.warnOnce('heatmap.filter taking a coordinate is deprecated - please pass dc.filters.TwoDimensionalFilter instead');
            return this.filter(new TwoDimensionalFilter(f));
        };
        if (!arguments.length) {
            return super.filter();
        }
        if (filter !== null &&
            filter.filterType !== 'TwoDimensionalFilter' &&
            !(Array.isArray(filter) &&
                Array.isArray(filter[0]) &&
                filter[0][0].filterType === 'TwoDimensionalFilter')) {
            return nonstandardFilter(filter);
        }
        return super.filter(filter);
    }
    _doRender() {
        this.resetSvg();
        this._chartBody = this.svg()
            .append('g')
            .attr('class', 'heatmap')
            .attr('transform', `translate(${this.margins().left},${this.margins().top})`);
        return this._doRedraw();
    }
    _doRedraw() {
        const data = this.data();
        let rows = this._conf.rows || data.map(d => d._value);
        let cols = this._conf.cols || data.map(this._conf.keyAccessor);
        if (this._conf.rowOrdering) {
            rows = rows.sort(this._conf.rowOrdering);
        }
        if (this._conf.colOrdering) {
            cols = cols.sort(this._conf.colOrdering);
        }
        rows = this._rowScale.domain(rows);
        cols = this._colScale.domain(cols);
        const rowCount = rows.domain().length;
        const colCount = cols.domain().length;
        const boxWidth = Math.floor(this.effectiveWidth() / colCount);
        const boxHeight = Math.floor(this.effectiveHeight() / rowCount);
        cols.rangeRound([0, this.effectiveWidth()]);
        rows.rangeRound([this.effectiveHeight(), 0]);
        let boxes = this._chartBody
            .selectAll('g.box-group')
            .data(this.data(), (d, i) => `${this._conf.keyAccessor(d, i)}\0${d._value}`);
        boxes.exit().remove();
        const gEnter = boxes.enter().append('g').attr('class', 'box-group');
        gEnter
            .append('rect')
            .attr('class', 'heat-box')
            .attr('fill', 'white')
            .attr('x', (d, i) => cols(this._conf.keyAccessor(d, i)))
            .attr('y', (d, i) => rows(d._value))
            .on('click', (evt, d) => this._conf.boxOnClick(d));
        boxes = gEnter.merge(boxes);
        if (this._conf.renderTitle) {
            gEnter.append('title');
            boxes.select('title').text(this._conf.title);
        }
        transition(boxes.select('rect'), this._conf.transitionDuration, this._conf.transitionDelay)
            .attr('x', (d, i) => cols(this._conf.keyAccessor(d, i)))
            .attr('y', (d, i) => rows(d._value))
            .attr('rx', this._conf.xBorderRadius)
            .attr('ry', this._conf.yBorderRadius)
            .attr('fill', (d, i) => this._colorHelper.getColor(d, i))
            .attr('width', boxWidth)
            .attr('height', boxHeight);
        let gCols = this._chartBody.select('g.cols');
        if (gCols.empty()) {
            gCols = this._chartBody.append('g').attr('class', 'cols axis');
        }
        let gColsText = gCols.selectAll('text').data(cols.domain());
        gColsText.exit().remove();
        gColsText = gColsText
            .enter()
            .append('text')
            .attr('x', d => cols(d) + boxWidth / 2)
            .style('text-anchor', 'middle')
            .attr('y', this.effectiveHeight())
            .attr('dy', 12)
            .on('click', (evt, d) => this._conf.xAxisOnClick(d))
            .text(this._conf.colsLabel)
            .merge(gColsText);
        transition(gColsText, this._conf.transitionDuration, this._conf.transitionDelay)
            .text(this._conf.colsLabel)
            .attr('x', d => cols(d) + boxWidth / 2)
            .attr('y', this.effectiveHeight());
        let gRows = this._chartBody.select('g.rows');
        if (gRows.empty()) {
            gRows = this._chartBody.append('g').attr('class', 'rows axis');
        }
        let gRowsText = gRows.selectAll('text').data(rows.domain());
        gRowsText.exit().remove();
        gRowsText = gRowsText
            .enter()
            .append('text')
            .style('text-anchor', 'end')
            .attr('x', 0)
            .attr('dx', -2)
            .attr('y', d => rows(d) + boxHeight / 2)
            .attr('dy', 6)
            .on('click', (evt, d) => this._conf.yAxisOnClick(d))
            .text(this._conf.rowsLabel)
            .merge(gRowsText);
        transition(gRowsText, this._conf.transitionDuration, this._conf.transitionDelay)
            .text(this._conf.rowsLabel)
            .attr('y', d => rows(d) + boxHeight / 2);
        if (this.hasFilter()) {
            const chart = this;
            this.selectAll('g.box-group').each(function (d) {
                if (chart._isSelectedNode(d)) {
                    chart.highlightSelected(this);
                }
                else {
                    chart.fadeDeselected(this);
                }
            });
        }
        else {
            const chart = this;
            this.selectAll('g.box-group').each(function () {
                chart.resetHighlight(this);
            });
        }
        return this;
    }
    _isSelectedNode(d) {
        return this.hasFilter(d.key);
    }
}
//# sourceMappingURL=heat-map.js.map