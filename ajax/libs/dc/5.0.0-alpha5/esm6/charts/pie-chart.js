import { min, sum } from 'd3-array';
import { arc, pie } from 'd3-shape';
import { select } from 'd3-selection';
import { interpolate } from 'd3-interpolate';
import { ColorMixin } from '../base/color-mixin.js';
import { BaseMixin } from '../base/base-mixin.js';
import { transition } from '../core/core.js';
import { SimpleDataCapHelper } from '../data/index.js';
const DEFAULT_MIN_ANGLE_FOR_LABEL = 0.5;
/**
 * The pie chart implementation is usually used to visualize a small categorical distribution.  The pie
 * chart uses keyAccessor to determine the slices, and valueAccessor to calculate the size of each
 * slice relative to the sum of all values. Slices are ordered by {@link ICFSimpleAdapterConf.ordering | ordering}
 * which defaults to sorting by key.
 *
 * Examples:
 * - {@link http://dc-js.github.com/dc.js/ | Nasdaq 100 Index}
 */
export class PieChart extends ColorMixin(BaseMixin) {
    /**
     * Create a Pie Chart
     *
     * TODO update example
     *
     * @example
     * ```
     * // create a pie chart under #chart-container1 element using the default global chart group
     * const chart1 = new PieChart('#chart-container1');
     * // create a pie chart under #chart-container2 element using chart group A
     * const chart2 = new PieChart('#chart-container2', 'chartGroupA');
     * ```
     */
    constructor(parent, chartGroup) {
        super(parent, chartGroup);
        this.configure({
            colorAccessor: d => this._conf.keyAccessor(d),
            emptyTitle: 'empty',
            label: d => this._conf.keyAccessor(d),
            renderLabel: true,
            title: d => `${this._conf.keyAccessor(d)}: ${d._value}`,
            transitionDuration: 350,
            transitionDelay: 0,
            radius: undefined,
            innerRadius: 0,
            externalRadiusPadding: 0,
            minAngleForLabel: DEFAULT_MIN_ANGLE_FOR_LABEL,
            externalLabels: undefined,
            drawPaths: false,
        });
        this.dataProvider(new SimpleDataCapHelper());
        this._sliceCssClass = 'pie-slice';
        this._labelCssClass = 'pie-label';
        this._sliceGroupCssClass = 'pie-slice-group';
        this._labelGroupCssClass = 'pie-label-group';
        this._emptyCssClass = 'empty-chart';
        this._computedRadius = undefined;
        this._g = undefined;
        this._cx = undefined;
        this._cy = undefined;
    }
    configure(conf) {
        super.configure(conf);
        return this;
    }
    conf() {
        return this._conf;
    }
    _doRender() {
        this.resetSvg();
        this._g = this.svg().append('g').attr('transform', `translate(${this.cx()},${this.cy()})`);
        this._g.append('g').attr('class', this._sliceGroupCssClass);
        this._g.append('g').attr('class', this._labelGroupCssClass);
        this._drawChart();
        return this;
    }
    _drawChart() {
        // set radius from chart size if none given, or if given radius is too large
        const maxRadius = min([this.width(), this.height()]) / 2;
        this._computedRadius =
            this._conf.radius && this._conf.radius < maxRadius ? this._conf.radius : maxRadius;
        const arcs = this._buildArcs();
        const pieLayout = this._pieLayout();
        let pieData;
        // if we have data...
        // @ts-ignore // TODO: better typing
        if (sum(this.data(), d => d._value)) {
            pieData = pieLayout(this.data());
            this._g.classed(this._emptyCssClass, false);
        }
        else {
            // otherwise we'd be getting NaNs, so override
            // note: abuse others for its ignoring the value accessor
            pieData = pieLayout([
                { key: this._conf.emptyTitle, _value: 1, others: [this._conf.emptyTitle] },
            ]);
            this._g.classed(this._emptyCssClass, true);
        }
        if (this._g) {
            const slices = this._g
                .select(`g.${this._sliceGroupCssClass}`)
                .selectAll(`g.${this._sliceCssClass}`)
                .data(pieData);
            const labels = this._g
                .select(`g.${this._labelGroupCssClass}`)
                .selectAll(`text.${this._labelCssClass}`)
                .data(pieData);
            this._removeElements(slices, labels);
            this._createElements(slices, labels, arcs, pieData);
            this._updateElements(pieData, arcs);
            this._highlightFilter();
            transition(this._g, this._conf.transitionDuration, this._conf.transitionDelay).attr('transform', `translate(${this.cx()},${this.cy()})`);
        }
    }
    _createElements(slices, labels, arcs, pieData) {
        const slicesEnter = this._createSliceNodes(slices);
        this._createSlicePath(slicesEnter, arcs);
        this._createTitles(slicesEnter);
        this._createLabels(labels, pieData, arcs);
    }
    _createSliceNodes(slices) {
        return slices
            .enter()
            .append('g')
            .attr('class', (d, i) => `${this._sliceCssClass} _${i}`);
    }
    _createSlicePath(slicesEnter, arcs) {
        const slicePath = slicesEnter
            .append('path')
            .attr('fill', (d, i) => this._fill(d, i))
            .on('click', (evt, d) => this._onClick(d))
            .attr('d', (d, i) => this._safeArc(d, i, arcs));
        const tranNodes = transition(slicePath, this._conf.transitionDuration, this._conf.transitionDelay);
        if (tranNodes.attrTween) {
            const chart = this;
            tranNodes.attrTween('d', function (d) {
                return chart._tweenPie(d, this);
            });
        }
    }
    _createTitles(slicesEnter) {
        if (this._conf.renderTitle) {
            slicesEnter.append('title').text(d => this._conf.title(d.data));
        }
    }
    _applyLabelText(labels) {
        labels.text(d => {
            const data = d.data;
            if ((this._sliceHasNoData(data) || this._sliceTooSmall(d)) &&
                !this._isSelectedSlice(d)) {
                return '';
            }
            return this._conf.label(d.data);
        });
    }
    _positionLabels(labels, arcs) {
        this._applyLabelText(labels);
        transition(labels, this._conf.transitionDuration, this._conf.transitionDelay)
            .attr('transform', d => this._labelPosition(d, arcs))
            .attr('text-anchor', 'middle');
    }
    _highlightSlice(i, whether) {
        this.select(`g.pie-slice._${i}`).classed('highlight', whether);
    }
    _createLabels(labels, pieData, arcs) {
        if (this._conf.renderLabel) {
            const labelsEnter = labels
                .enter()
                .append('text')
                .attr('class', (d, i) => {
                let classes = `${this._sliceCssClass} ${this._labelCssClass} _${i}`;
                if (this._conf.externalLabels) {
                    classes += ' external';
                }
                return classes;
            })
                .on('click', (evt, d) => this._onClick(d))
                .on('mouseover', (evt, d) => {
                this._highlightSlice(d.index, true);
            })
                .on('mouseout', (evt, d) => {
                this._highlightSlice(d.index, false);
            });
            this._positionLabels(labelsEnter, arcs);
            if (this._conf.externalLabels && this._conf.drawPaths) {
                this._updateLabelPaths(pieData, arcs);
            }
        }
    }
    _updateLabelPaths(pieData, arcs) {
        let polyline = this._g
            .selectAll(`polyline.${this._sliceCssClass}`)
            .data(pieData);
        polyline.exit().remove();
        polyline = polyline
            .enter()
            .append('polyline')
            .attr('class', (d, i) => `pie-path _${i} ${this._sliceCssClass}`)
            .on('click', (evt, d) => this._onClick(d))
            .on('mouseover', (evt, d) => {
            // @ts-ignore
            this._highlightSlice(d.index, true);
        })
            .on('mouseout', (evt, d) => {
            // @ts-ignore
            this._highlightSlice(d.index, false);
        })
            .merge(polyline);
        const arc2 = arc()
            .outerRadius(this._computedRadius - this._conf.externalRadiusPadding + this._conf.externalLabels)
            .innerRadius(this._computedRadius - this._conf.externalRadiusPadding);
        const tranNodes = transition(polyline, this._conf.transitionDuration, this._conf.transitionDelay);
        // this is one rare case where d3.selection differs from d3.transition
        if (tranNodes.attrTween) {
            tranNodes.attrTween('points', function (d) {
                let current = this._current || d;
                current = { startAngle: current.startAngle, endAngle: current.endAngle };
                const _interpolate = interpolate(current, d);
                this._current = _interpolate(0);
                return t => {
                    const d2 = _interpolate(t);
                    return [arcs.centroid(d2), arc2.centroid(d2)];
                };
            });
        }
        else {
            tranNodes.attr('points', d => [arcs.centroid(d), arc2.centroid(d)]);
        }
        tranNodes.style('visibility', d => d.endAngle - d.startAngle < 0.0001 ? 'hidden' : 'visible');
    }
    _updateElements(pieData, arcs) {
        this._updateSlicePaths(pieData, arcs);
        this._updateLabels(pieData, arcs);
        this._updateTitles(pieData);
    }
    _updateSlicePaths(pieData, arcs) {
        const slicePaths = this._g
            .selectAll(`g.${this._sliceCssClass}`)
            .data(pieData)
            .select('path')
            .attr('d', (d, i) => this._safeArc(d, i, arcs));
        const tranNodes = transition(slicePaths, this._conf.transitionDuration, this._conf.transitionDelay);
        if (tranNodes.attrTween) {
            const chart = this;
            tranNodes.attrTween('d', function (d) {
                return chart._tweenPie(d, this);
            });
        }
        tranNodes.attr('fill', (d, i) => this._fill(d, i));
    }
    _updateLabels(pieData, arcs) {
        if (this._conf.renderLabel) {
            const labels = this._g
                .selectAll(`text.${this._labelCssClass}`)
                .data(pieData);
            this._positionLabels(labels, arcs);
            if (this._conf.externalLabels && this._conf.drawPaths) {
                this._updateLabelPaths(pieData, arcs);
            }
        }
    }
    _updateTitles(pieData) {
        if (this._conf.renderTitle) {
            this._g
                .selectAll(`g.${this._sliceCssClass}`)
                .data(pieData)
                .select('title')
                .text(d => this._conf.title(d.data));
        }
    }
    _removeElements(slices, labels) {
        slices.exit().remove();
        labels.exit().remove();
    }
    _highlightFilter() {
        const chart = this;
        if (this.hasFilter()) {
            this.selectAll(`g.${this._sliceCssClass}`).each(function (d) {
                if (chart._isSelectedSlice(d)) {
                    chart.highlightSelected(this);
                }
                else {
                    chart.fadeDeselected(this);
                }
            });
        }
        else {
            this.selectAll(`g.${this._sliceCssClass}`).each(function () {
                chart.resetHighlight(this);
            });
        }
    }
    cx(cx) {
        if (!arguments.length) {
            return this._cx || this.width() / 2;
        }
        this._cx = cx;
        return this;
    }
    cy(cy) {
        if (!arguments.length) {
            return this._cy || this.height() / 2;
        }
        this._cy = cy;
        return this;
    }
    _buildArcs() {
        return arc()
            .outerRadius(this._computedRadius - this._conf.externalRadiusPadding)
            .innerRadius(this._conf.innerRadius);
    }
    _isSelectedSlice(d) {
        return this.hasFilter(this._conf.keyAccessor(d.data));
    }
    _doRedraw() {
        this._drawChart();
        return this;
    }
    _pieLayout() {
        // The 2nd argument is type of datum that will be used. TODO: revisit after refactoring.
        return pie()
            .sort(null)
            // @ts-ignore // TODO: better typing
            .value(d => d._value);
    }
    _sliceTooSmall(d) {
        const angle = d.endAngle - d.startAngle;
        return isNaN(angle) || angle < this._conf.minAngleForLabel;
    }
    _sliceHasNoData(d) {
        return d._value === 0;
    }
    _isOffCanvas(current) {
        return !current || isNaN(current.startAngle) || isNaN(current.endAngle);
    }
    _fill(d, i) {
        return this._colorHelper.getColor(d.data, i);
    }
    _onClick(d) {
        if (this._g.attr('class') !== this._emptyCssClass) {
            this.onClick(d.data);
        }
    }
    _safeArc(d, i, _arc) {
        let path = _arc(d, i);
        if (path.indexOf('NaN') >= 0) {
            path = 'M0,0';
        }
        return path;
    }
    _labelPosition(d, _arc) {
        let centroid;
        if (this._conf.externalLabels) {
            centroid = arc()
                .outerRadius(this._computedRadius -
                this._conf.externalRadiusPadding +
                this._conf.externalLabels)
                .innerRadius(this._computedRadius -
                this._conf.externalRadiusPadding +
                this._conf.externalLabels)
                .centroid(d);
        }
        else {
            centroid = _arc.centroid(d);
        }
        if (isNaN(centroid[0]) || isNaN(centroid[1])) {
            return 'translate(0,0)';
        }
        else {
            return `translate(${centroid})`;
        }
    }
    legendables() {
        return this.data().map((d, i) => {
            // TODO: correct typing
            const legendable = {
                name: d.key,
                data: d.value,
                others: d.others,
                chart: this,
            };
            legendable.color = this._colorHelper.getColor(d, i);
            return legendable;
        });
    }
    legendHighlight(d) {
        this._highlightSliceFromLegendable(d, true);
    }
    legendReset(d) {
        this._highlightSliceFromLegendable(d, false);
    }
    legendToggle(d) {
        this.onClick({ key: d.name, others: d.others });
    }
    _highlightSliceFromLegendable(legendable, highlighted) {
        this.selectAll('g.pie-slice').each(function (d) {
            if (legendable.name === d.data.key) {
                select(this).classed('highlight', highlighted);
            }
        });
    }
    _tweenPie(b, element) {
        b.innerRadius = this._conf.innerRadius;
        let current = element._current;
        if (this._isOffCanvas(current)) {
            current = { startAngle: 0, endAngle: 0 };
        }
        else {
            // only interpolate startAngle & endAngle, not the whole data object
            current = { startAngle: current.startAngle, endAngle: current.endAngle };
        }
        const i = interpolate(current, b);
        element._current = i(0);
        return t => this._safeArc(i(t), 0, this._buildArcs());
    }
}
//# sourceMappingURL=pie-chart.js.map