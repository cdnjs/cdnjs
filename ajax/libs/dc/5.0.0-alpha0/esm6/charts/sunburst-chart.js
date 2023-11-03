import { hierarchy, partition } from 'd3-hierarchy';
import { ascending, min, sum } from 'd3-array';
import { arc } from 'd3-shape';
import { select } from 'd3-selection';
import { interpolate } from 'd3-interpolate';
import { transition } from '../core/core.js';
import { arraysIdentical, toHierarchy } from '../core/utils.js';
import { events } from '../core/events.js';
import { ColorMixin } from '../base/color-mixin.js';
import { BaseMixin } from '../base/base-mixin.js';
import { constants } from '../core/constants.js';
import { BadArgumentException } from '../core/bad-argument-exception.js';
import { HierarchyFilter } from '../core/filters/hierarchy-filter.js';
const DEFAULT_MIN_ANGLE_FOR_LABEL = 0.5;
/**
 * The sunburst chart implementation is usually used to visualize a small tree distribution.  The sunburst
 * chart uses keyAccessor to determine the slices, and valueAccessor to calculate the size of each
 * slice relative to the sum of all values.
 * Slices are ordered by {@link ICFSimpleAdapterConf.ordering | ordering} which defaults to sorting by key.
 *
 * The keys used in the sunburst chart should be arrays, representing paths in the tree.
 *
 * When filtering, the sunburst chart creates instances of {@link HierarchyFilter}.
 *
 */
export class SunburstChart extends ColorMixin(BaseMixin) {
    /**
     * Create a Sunburst Chart
     *
     * TODO update example
     *
     * @example
     * ```
     * // create a sunburst chart under #chart-container1 element using the default global chart group
     * const chart1 = new SunburstChart('#chart-container1');
     * // create a sunburst chart under #chart-container2 element using chart group A
     * const chart2 = new SunburstChart('#chart-container2', 'chartGroupA');
     * ```
     */
    constructor(parent, chartGroup) {
        super(parent, chartGroup);
        this.configure({
            colorAccessor: d => this._conf.keyAccessor(d),
            label: d => this._conf.keyAccessor(d),
            renderLabel: true,
            title: d => `${this._conf.keyAccessor(d)}: ${this._extendedValueAccessor(d)}`,
            transitionDuration: 350,
            emptyTitle: 'empty',
            radius: undefined,
            innerRadius: 0,
            ringSizes: this.defaultRingSizes(),
            minAngleForLabel: DEFAULT_MIN_ANGLE_FOR_LABEL,
            externalLabels: undefined,
        });
        this.dataProvider().configure({
            ordering: d => d.key, // override cap mixin // TODO: not needed, does not mix CapMixin any longer
        });
        this._sliceCssClass = 'pie-slice';
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
    // Handle cases if value corresponds to generated parent nodes
    _extendedValueAccessor(d) {
        if (d.path) {
            return d.value;
        }
        return d._value;
    }
    _scaleRadius(ringIndex, y) {
        if (ringIndex === 0) {
            return this._conf.innerRadius;
        }
        else {
            const customRelativeRadius = sum(this._relativeRingSizes.slice(0, ringIndex));
            const scaleFactor = (ringIndex * (1 / this._relativeRingSizes.length)) / customRelativeRadius;
            const standardRadius = ((y - this._rootOffset) / (1 - this._rootOffset)) *
                (this._computedRadius - this._conf.innerRadius);
            return this._conf.innerRadius + standardRadius / scaleFactor;
        }
    }
    _doRender() {
        this.resetSvg();
        this._g = this.svg().append('g').attr('transform', `translate(${this.cx()},${this.cy()})`);
        this._drawChart();
        return this;
    }
    _drawChart() {
        // set radius from chart size if none given, or if given radius is too large
        const maxRadius = min([this.width(), this.height()]) / 2;
        this._computedRadius =
            this._conf.radius && this._conf.radius < maxRadius ? this._conf.radius : maxRadius;
        const arcs = this._buildArcs();
        let partitionedNodes;
        let cdata;
        // if we have data...
        // @ts-ignore
        if (sum(this.data(), d => d._value)) {
            cdata = toHierarchy(this.data(), d => d._value);
            partitionedNodes = this._partitionNodes(cdata);
            // First one is the root, which is not needed
            partitionedNodes.nodes.shift();
            this._g.classed(this._emptyCssClass, false);
        }
        else {
            // otherwise we'd be getting NaNs, so override
            // note: abuse others for its ignoring the value accessor
            cdata = toHierarchy([], d => d.value);
            partitionedNodes = this._partitionNodes(cdata);
            this._g.classed(this._emptyCssClass, true);
        }
        this._rootOffset = partitionedNodes.rootOffset;
        this._relativeRingSizes = partitionedNodes.relativeRingSizes;
        // TODO: probably redundant check, this will always be true
        if (this._g) {
            const slices = this._g
                .selectAll(`g.${this._sliceCssClass}`)
                .data(partitionedNodes.nodes);
            this._createElements(slices, arcs, partitionedNodes.nodes);
            this._updateElements(partitionedNodes.nodes, arcs);
            this._removeElements(slices);
            this._highlightFilter();
            transition(this._g, this._conf.transitionDuration, this._conf.transitionDelay).attr('transform', `translate(${this.cx()},${this.cy()})`);
        }
    }
    _createElements(slices, arcs, sunburstData) {
        const slicesEnter = this._createSliceNodes(slices);
        this._createSlicePath(slicesEnter, arcs);
        this._createTitles(slicesEnter);
        this._createLabels(sunburstData, arcs);
    }
    _createSliceNodes(slices) {
        return slices
            .enter()
            .append('g')
            .attr('class', (d, i) => `${this._sliceCssClass} _${i} ${this._sliceCssClass}-level-${d.depth}`);
    }
    _createSlicePath(slicesEnter, arcs) {
        const slicePath = slicesEnter
            .append('path')
            .attr('fill', (d, i) => this._fill(d, i))
            .on('click', (evt, d) => this.onClick(d))
            .attr('d', d => this._safeArc(arcs, d));
        const tranNodes = transition(slicePath, this._conf.transitionDuration);
        if (tranNodes.attrTween) {
            const chart = this;
            tranNodes.attrTween('d', function (d) {
                return chart._tweenSlice(d, this);
            });
        }
    }
    _createTitles(slicesEnter) {
        if (this._conf.renderTitle) {
            slicesEnter.append('title').text(d => this._conf.title(d));
        }
    }
    _positionLabels(labelsEnter, arcs) {
        transition(labelsEnter, this._conf.transitionDuration)
            .attr('transform', d => this._labelPosition(d, arcs))
            .attr('text-anchor', 'middle')
            .text(d => {
            // position label...
            if (this._sliceHasNoData(d) || this._sliceTooSmall(d)) {
                return '';
            }
            return this._conf.label(d);
        });
    }
    _createLabels(sunburstData, arcs) {
        if (this._conf.renderLabel) {
            const labels = this._g
                .selectAll(`text.${this._sliceCssClass}`)
                .data(sunburstData);
            labels.exit().remove();
            const labelsEnter = labels
                .enter()
                .append('text')
                .attr('class', (d, i) => {
                let classes = `${this._sliceCssClass} _${i}`;
                if (this._conf.externalLabels) {
                    classes += ' external';
                }
                return classes;
            })
                .on('click', (evt, d) => this.onClick(d));
            this._positionLabels(labelsEnter, arcs);
        }
    }
    _updateElements(sunburstData, arcs) {
        this._updateSlicePaths(sunburstData, arcs);
        this._updateLabels(sunburstData, arcs);
        this._updateTitles(sunburstData);
    }
    _updateSlicePaths(sunburstData, arcs) {
        const slicePaths = this._g
            .selectAll(`g.${this._sliceCssClass}`)
            .data(sunburstData)
            .select('path')
            .attr('d', (d, i) => this._safeArc(arcs, d));
        const tranNodes = transition(slicePaths, this._conf.transitionDuration);
        if (tranNodes.attrTween) {
            const chart = this;
            tranNodes.attrTween('d', function (d) {
                return chart._tweenSlice(d, this);
            });
        }
        tranNodes.attr('fill', (d, i) => this._fill(d, i));
    }
    _updateLabels(sunburstData, arcs) {
        if (this._conf.renderLabel) {
            const labels = this._g
                .selectAll(`text.${this._sliceCssClass}`)
                .data(sunburstData);
            this._positionLabels(labels, arcs);
        }
    }
    _updateTitles(sunburstData) {
        if (this._conf.renderTitle) {
            this._g
                .selectAll(`g.${this._sliceCssClass}`)
                .data(sunburstData)
                .select('title')
                .text(d => this._conf.title(d));
        }
    }
    _removeElements(slices) {
        slices.exit().remove();
    }
    _highlightFilter() {
        const chart = this;
        if (chart.hasFilter()) {
            chart.selectAll(`g.${chart._sliceCssClass}`).each(function (d) {
                if (chart._isSelectedSlice(d)) {
                    chart.highlightSelected(this);
                }
                else {
                    chart.fadeDeselected(this);
                }
            });
        }
        else {
            chart.selectAll(`g.${chart._sliceCssClass}`).each(function (d) {
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
    /**
     * Constructs the default RingSizes parameter for {@link ISunburstChartConf.ringSizes},
     * which makes the rings narrower as they get farther away from the center.
     *
     * Can be used as a parameter to ringSizes() to reset the default behavior, or modified for custom ring sizes.
     *
     * @example
     * ```
     *   const chart = new dc.SunburstChart(...);
     *   chart.ringSizes(chart.defaultRingSizes())
     * ```
     */
    defaultRingSizes() {
        return {
            partitionDy: () => this._computedRadius * this._computedRadius,
            scaleInnerRadius: d => d.data.path && d.data.path.length === 1 ? this._conf.innerRadius : Math.sqrt(d.y0),
            scaleOuterRadius: d => Math.sqrt(d.y1),
            relativeRingSizesFunction: () => [],
        };
    }
    /**
     * Constructs a RingSizes parameter for {@link ISunburstChartConf.ringSizes}
     * that will make the chart rings equally wide.
     *
     * @example
     * ```
     *   const chart = new dc.SunburstChart(...);
     *   chart.ringSizes(chart.equalRingSizes())
     * ```
     */
    equalRingSizes() {
        return this.relativeRingSizes(ringCount => {
            const result = [];
            for (let i = 0; i < ringCount; i++) {
                result.push(1 / ringCount);
            }
            return result;
        });
    }
    /**
     * Constructs a RingSizes parameter for {@link ISunburstChartConf.ringSizes} using the given function
     * to determine each rings width.
     *
     * * The function must return an array containing portion values for each ring/level of the chart.
     * * The length of the array must match the number of rings of the chart at runtime, which is provided as the only
     *   argument.
     * * The sum of all portions from the array must be 1 (100%).
     *
     * @example
     * ```
     * // specific relative portions (the number of rings (3) is known in this case)
     * chart.ringSizes(chart.relativeRingSizes(function (ringCount) {
     *     return [.1, .3, .6];
     * });
     * ```
     */
    relativeRingSizes(relativeRingSizesFunction) {
        function assertPortionsArray(relativeSizes, numberOfRings) {
            if (!Array.isArray(relativeSizes)) {
                throw new BadArgumentException('relativeRingSizes function must return an array');
            }
            const portionsSum = sum(relativeSizes);
            if (Math.abs(portionsSum - 1) > constants.NEGLIGIBLE_NUMBER) {
                throw new BadArgumentException(`relativeRingSizes : portions must add up to 1, but sum was ${portionsSum}`);
            }
            if (relativeSizes.length !== numberOfRings) {
                throw new BadArgumentException(`relativeRingSizes : number of values must match number of rings (${numberOfRings}) but was ${relativeSizes.length}`);
            }
        }
        return {
            partitionDy: () => 1,
            scaleInnerRadius: d => this._scaleRadius(d.data.path.length - 1, d.y0),
            scaleOuterRadius: d => this._scaleRadius(d.data.path.length, d.y1),
            relativeRingSizesFunction: ringCount => {
                const result = relativeRingSizesFunction(ringCount);
                assertPortionsArray(result, ringCount);
                return result;
            },
        };
    }
    _buildArcs() {
        return arc()
            .startAngle((d) => d.x0) // TODO: revisit and look for proper typing
            .endAngle((d) => d.x1) // TODO: revisit and look for proper typing
            .innerRadius(d => this._conf.ringSizes.scaleInnerRadius(d))
            .outerRadius(d => this._conf.ringSizes.scaleOuterRadius(d));
    }
    _isSelectedSlice(d) {
        return this._isPathFiltered(d.path);
    }
    _isPathFiltered(path) {
        for (let i = 0; i < this.filters().length; i++) {
            const currentFilter = this.filters()[i];
            if (currentFilter.isFiltered(path)) {
                return true;
            }
        }
        return false;
    }
    // returns all filters that are a parent or child of the path
    _filtersForPath(path) {
        const pathFilter = new HierarchyFilter(path);
        const filtersList = [];
        for (let i = 0; i < this.filters().length; i++) {
            const currentFilter = this.filters()[i];
            if (currentFilter.isFiltered(path) || pathFilter.isFiltered(currentFilter)) {
                filtersList.push(currentFilter);
            }
        }
        return filtersList;
    }
    _doRedraw() {
        this._drawChart();
        return this;
    }
    _partitionNodes(data) {
        const getSortable = function (d) {
            return { key: d.data.key, value: d.value };
        };
        const ordering = this.dataProvider().conf().ordering;
        const _hierarchy = hierarchy(data)
            .sum(d => (d.children ? 0 : this._extendedValueAccessor(d)))
            .sort((a, b) => ascending(ordering(getSortable(a)), ordering(getSortable(b))));
        const _partition = partition().size([2 * Math.PI, this._conf.ringSizes.partitionDy()]);
        _partition(_hierarchy);
        // In D3v4 the returned data is slightly different, change it enough to suit our purposes.
        const nodes = _hierarchy.descendants().map(d => {
            // TODO: find a better way to augment `.key`; which is not part of the current type (HierarchyNode)
            // @ts-ignore
            d.key = d.data.key;
            d.path = d.data.path;
            return d;
        });
        const relativeSizes = this._conf.ringSizes.relativeRingSizesFunction(_hierarchy.height);
        return {
            nodes,
            // TODO: find a better way to augment `.y1`; which is not part of the current type (HierarchyNode)
            // @ts-ignore
            rootOffset: _hierarchy.y1,
            relativeRingSizes: relativeSizes,
        };
    }
    _sliceTooSmall(d) {
        const angle = d.x1 - d.x0;
        return isNaN(angle) || angle < this._conf.minAngleForLabel;
    }
    _sliceHasNoData(d) {
        return this._extendedValueAccessor(d) === 0;
    }
    _isOffCanvas(d) {
        return !d || isNaN(d.x0) || isNaN(d.y0);
    }
    _fill(d, i) {
        return this._colorHelper.getColor(d.data, i);
    }
    onClick(d, i) {
        if (this._g.attr('class') === this._emptyCssClass) {
            return;
        }
        // Must be better way to handle this, in legends we need to access `d.key`
        const path = d.path || d.key;
        const filter = new HierarchyFilter(path);
        // filters are equal to, parents or children of the path.
        const filtersList = this._filtersForPath(path);
        let exactMatch = false;
        // clear out any filters that cover the path filtered.
        for (let j = filtersList.length - 1; j >= 0; j--) {
            const currentFilter = filtersList[j];
            if (arraysIdentical(currentFilter, path)) {
                exactMatch = true;
            }
            this.filter(filtersList[j]);
        }
        events.trigger(() => {
            // if it is a new filter - put it in.
            if (!exactMatch) {
                this.filter(filter);
            }
            this.redrawGroup();
        });
    }
    _safeArc(_arc, d) {
        let path = _arc(d);
        if (path.indexOf('NaN') >= 0) {
            path = 'M0,0';
        }
        return path;
    }
    _labelPosition(d, _arc) {
        let centroid;
        if (this._conf.externalLabels) {
            centroid = arc()
                .outerRadius(this._computedRadius + this._conf.externalLabels)
                .innerRadius(this._computedRadius + this._conf.externalLabels)
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
            if (legendable.name === d.key) {
                select(this).classed('highlight', highlighted);
            }
        });
    }
    _tweenSlice(d, element) {
        let current = element._current;
        if (this._isOffCanvas(current)) {
            current = { x0: 0, x1: 0, y0: 0, y1: 0 };
        }
        const tweenTarget = {
            x0: d.x0,
            x1: d.x1,
            y0: d.y0,
            y1: d.y1,
        };
        const i = interpolate(current, tweenTarget);
        element._current = i(0);
        return t => this._safeArc(this._buildArcs(), Object.assign({}, d, i(t)));
    }
}
//# sourceMappingURL=sunburst-chart.js.map