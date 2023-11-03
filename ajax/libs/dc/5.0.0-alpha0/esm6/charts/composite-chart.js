import { max, min } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { axisRight } from 'd3-axis';
import { add, subtract } from '../core/utils.js';
import { CoordinateGridMixin } from '../base/coordinate-grid-mixin.js';
const SUB_CHART_CLASS = 'sub';
const DEFAULT_RIGHT_Y_AXIS_LABEL_PADDING = 12;
/**
 * Composite charts are a special kind of chart that render multiple charts on the same Coordinate
 * Grid. You can overlay (compose) different bar/line/area charts in a single composite chart to
 * achieve some quite flexible charting effects.
 */
export class CompositeChart extends CoordinateGridMixin {
    /**
     * Create a Composite Chart.
     *
     * TODO update example
     * @example
     * ```
     * // create a composite chart under #chart-container1 element using the default global chart group
     * var compositeChart1 = new CompositeChart('#chart-container1');
     * // create a composite chart under #chart-container2 element using chart group A
     * var compositeChart2 = new CompositeChart('#chart-container2', 'chartGroupA');
     * ```
     */
    constructor(parent, chartGroup) {
        super(parent, chartGroup);
        this.configure({
            transitionDuration: 500,
            transitionDelay: 0,
            shareColors: false,
            shareTitle: true,
        });
        this._children = [];
        this._childOptions = {};
        this._alignYAxes = false; // TODO: the setter calls rescale, check in detail later
        this._rightYAxis = axisRight(undefined);
        this._rightYAxisLabel = undefined;
        this._rightYAxisLabelPadding = DEFAULT_RIGHT_Y_AXIS_LABEL_PADDING;
        this._rightY = undefined;
        this._rightAxisGridLines = false;
        this._mandatoryAttributes([]);
        this.on('filtered.dcjs-composite-chart', chart => {
            // Propagate the filters onto the children
            // Notice that on children the call is .replaceFilter and not .filter
            //   the reason is that _chart.filter() returns the entire current set of filters not just the last added one
            this._children.forEach(child => {
                // Go defensive - the shareFilter option may have already set the correct filters
                if (child.filter() !== this.filter()) {
                    child.replaceFilter(this.filter());
                }
            });
        });
    }
    configure(conf) {
        super.configure(conf);
        return this;
    }
    conf() {
        return this._conf;
    }
    _generateG() {
        const g = super._generateG();
        for (let i = 0; i < this._children.length; ++i) {
            const child = this._children[i];
            this._generateChildG(child, i);
            if (!child.dataProvider().conf().dimension) {
                child.dataProvider().configure({ dimension: this.dataProvider().conf().dimension });
            }
            if (!child.dataProvider().conf().group) {
                child.dataProvider().configure({ group: this.dataProvider().conf().group });
            }
            child
                .dataProvider()
                .configure({ shareFilters: this.dataProvider().conf().shareFilters });
            child.configure({
                xUnits: this._conf.xUnits,
                transitionDuration: this._conf.transitionDuration,
                transitionDelay: this._conf.transitionDelay,
                renderTitle: this._conf.renderTitle,
                elasticX: this._conf.elasticX,
            });
            child.chartGroup(this.chartGroup());
            child.svg(this.svg());
            child.configure({
                parentBrushOn: this._conf.brushOn,
                brushOn: false,
            });
        }
        return g;
    }
    rescale() {
        super.rescale();
        this._children.forEach(child => {
            child.rescale();
        });
        return this;
    }
    resizing(resizing) {
        if (!arguments.length) {
            return super.resizing();
        }
        super.resizing(resizing);
        this._children.forEach(child => {
            child.resizing(resizing);
        });
        return this;
    }
    _prepareYAxis() {
        const left = this._leftYAxisChildren().length !== 0;
        const right = this._rightYAxisChildren().length !== 0;
        const ranges = this._calculateYAxisRanges(left, right);
        if (left) {
            this._prepareLeftYAxis(ranges);
        }
        if (right) {
            this._prepareRightYAxis(ranges);
        }
        if (this._leftYAxisChildren().length > 0 && !this._rightAxisGridLines) {
            this._renderHorizontalGridLinesForAxis(this.g(), this.y(), this.yAxis());
        }
        else if (this._rightYAxisChildren().length > 0) {
            this._renderHorizontalGridLinesForAxis(this.g(), this._rightY, this._rightYAxis);
        }
    }
    _renderYAxis() {
        if (this._leftYAxisChildren().length !== 0) {
            this._renderYAxisAt('y', this.yAxis(), this.margins().left);
            this._renderYAxisLabel('y', this.yAxisLabel(), -90);
        }
        if (this._rightYAxisChildren().length !== 0) {
            this._renderYAxisAt('yr', this.rightYAxis(), this.width() - this.margins().right);
            this._renderYAxisLabel('yr', this.rightYAxisLabel(), 90, this.width() - this._rightYAxisLabelPadding);
        }
    }
    _calculateYAxisRanges(left, right) {
        let lyAxisMin;
        let lyAxisMax;
        let ryAxisMin;
        let ryAxisMax;
        let ranges;
        if (left) {
            lyAxisMin = this._yAxisMin();
            lyAxisMax = this._yAxisMax();
        }
        if (right) {
            ryAxisMin = this._rightYAxisMin();
            ryAxisMax = this._rightYAxisMax();
        }
        if (this.alignYAxes() && left && right) {
            ranges = this._alignYAxisRanges(lyAxisMin, lyAxisMax, ryAxisMin, ryAxisMax);
        }
        return ranges || { lyAxisMin, lyAxisMax, ryAxisMin, ryAxisMax };
    }
    _alignYAxisRanges(lyAxisMin, lyAxisMax, ryAxisMin, ryAxisMax) {
        // since the two series will share a zero, each Y is just a multiple
        // of the other. and the ratio should be the ratio of the ranges of the
        // input data, so that they come out the same height. so we just min/max
        // note: both ranges already include zero due to the stack mixin (#667)
        // if #667 changes, we can reconsider whether we want data height or
        // height from zero to be equal. and it will be possible for the axes
        // to be aligned but not visible.
        const extentRatio = (ryAxisMax - ryAxisMin) / (lyAxisMax - lyAxisMin);
        return {
            lyAxisMin: Math.min(lyAxisMin, ryAxisMin / extentRatio),
            lyAxisMax: Math.max(lyAxisMax, ryAxisMax / extentRatio),
            ryAxisMin: Math.min(ryAxisMin, lyAxisMin * extentRatio),
            ryAxisMax: Math.max(ryAxisMax, lyAxisMax * extentRatio),
        };
    }
    _prepareRightYAxis(ranges) {
        const needDomain = this.rightY() === undefined || this._conf.elasticY;
        const needRange = needDomain || this.resizing();
        if (this.rightY() === undefined) {
            this.rightY(scaleLinear());
        }
        if (needDomain) {
            this.rightY().domain([ranges.ryAxisMin, ranges.ryAxisMax]);
        }
        if (needRange) {
            this.rightY().rangeRound([this._yAxisHeight(), 0]);
        }
        this.rightY().range([this._yAxisHeight(), 0]);
        this.rightYAxis(this.rightYAxis().scale(this.rightY()));
        // In D3v4 create a RightAxis
        // _chart.rightYAxis().orient('right');
    }
    _prepareLeftYAxis(ranges) {
        const needDomain = this.y() === undefined || this._conf.elasticY;
        const needRange = needDomain || this.resizing();
        if (this.y() === undefined) {
            this.y(scaleLinear());
        }
        if (needDomain) {
            this.y().domain([ranges.lyAxisMin, ranges.lyAxisMax]);
        }
        if (needRange) {
            this.y().rangeRound([this._yAxisHeight(), 0]);
        }
        this.y().range([this._yAxisHeight(), 0]);
        this.yAxis(this.yAxis().scale(this.y()));
        // In D3v4 create a LeftAxis
        // _chart.yAxis().orient('left');
    }
    _generateChildG(child, i) {
        child._generateG(this.g());
        child.g().attr('class', `${SUB_CHART_CLASS} _${i}`);
    }
    plotData() {
        for (let i = 0; i < this._children.length; ++i) {
            const child = this._children[i];
            if (!child.g()) {
                this._generateChildG(child, i);
            }
            if (this._conf.shareColors) {
                child.colorHelper(this.colorHelper().share(child.conf().colorAccessor));
            }
            child.x(this.x());
            child.xAxis(this.xAxis());
            if (child.conf().useRightYAxis) {
                child.y(this.rightY());
                child.yAxis(this.rightYAxis());
            }
            else {
                child.y(this.y());
                child.yAxis(this.yAxis());
            }
            child.plotData();
            child._activateRenderlets();
        }
    }
    useRightAxisGridLines(useRightAxisGridLines) {
        if (!arguments) {
            return this._rightAxisGridLines;
        }
        this._rightAxisGridLines = useRightAxisGridLines;
        return this;
    }
    childOptions(childOptions) {
        if (!arguments.length) {
            return this._childOptions;
        }
        this._childOptions = childOptions;
        this._children.forEach(child => {
            child.options(this._childOptions);
        });
        return this;
    }
    fadeDeselectedArea(brushSelection) {
        if (this._conf.brushOn) {
            for (let i = 0; i < this._children.length; ++i) {
                const child = this._children[i];
                child.fadeDeselectedArea(brushSelection);
            }
        }
    }
    rightYAxisLabel(rightYAxisLabel, padding) {
        if (!arguments.length) {
            return this._rightYAxisLabel;
        }
        this._rightYAxisLabel = rightYAxisLabel;
        this.margins().right -= this._rightYAxisLabelPadding;
        this._rightYAxisLabelPadding =
            padding === undefined ? DEFAULT_RIGHT_Y_AXIS_LABEL_PADDING : padding;
        this.margins().right += this._rightYAxisLabelPadding;
        return this;
    }
    /**
     * Combine the given charts into one single composite coordinate grid chart.
     *
     * TODO update example
     *
     * @example
     * ```
     * moveChart.compose([
     *     // when creating sub-chart you need to pass in the parent chart
     *     new LineChart(moveChart)
     *         .group(indexAvgByMonthGroup) // if group is missing then parent's group will be used
     *         .valueAccessor(function (d){return d.value.avg;})
     *         // most of the normal functions will continue to work in a composed chart
     *         .renderArea(true)
     *         .stack(monthlyMoveGroup, function (d){return d.value;})
     *         .title(function (d){
     *             var value = d.value.avg?d.value.avg:d.value;
     *             if(isNaN(value)) value = 0;
     *             return dateFormat(d.key) + '\n' + numberFormat(value);
     *         }),
     *     new BarChart(moveChart)
     *         .group(volumeByMonthGroup)
     *         .centerBar(true)
     * ]);
     * ```
     */
    compose(subChartArray) {
        this._children = subChartArray;
        this._children.forEach(child => {
            child.height = () => this.height();
            child.width = () => this.width();
            // @ts-ignore
            child.margins = () => this.margins();
            if (this._conf.shareTitle) {
                child.configure({
                    title: this._conf.title,
                });
            }
            child.options(this._childOptions);
        });
        this.rescale();
        return this;
    }
    withoutTransitions(callback) {
        const oldVals = this._children.map(child => child.conf().transitionDuration);
        this._children.forEach(child => child.configure({ transitionDuration: 0 }));
        super.withoutTransitions(callback);
        this._children.forEach((child, i) => child.configure({ transitionDuration: oldVals[i] }));
    }
    /**
     * Returns the child charts which are composed into the composite chart.
     */
    children() {
        return this._children;
    }
    rightY(yScale) {
        if (!arguments.length) {
            return this._rightY;
        }
        this._rightY = yScale;
        this.rescale();
        return this;
    }
    alignYAxes(alignYAxes) {
        if (!arguments.length) {
            return this._alignYAxes;
        }
        this._alignYAxes = alignYAxes;
        this.rescale();
        return this;
    }
    _leftYAxisChildren() {
        return this._children.filter(child => !child.conf().useRightYAxis);
    }
    _rightYAxisChildren() {
        return this._children.filter(child => child.conf().useRightYAxis);
    }
    // TODO: revisit all min/max functions after making charts to use Generics
    _getYAxisMin(charts) {
        return charts.map(c => c.yAxisMin());
    }
    _yAxisMin() {
        return min(this._getYAxisMin(this._leftYAxisChildren()));
    }
    _rightYAxisMin() {
        return min(this._getYAxisMin(this._rightYAxisChildren()));
    }
    _getYAxisMax(charts) {
        return charts.map(c => c.yAxisMax());
    }
    _yAxisMax() {
        return add(max(this._getYAxisMax(this._leftYAxisChildren())), this._conf.yAxisPadding);
    }
    _rightYAxisMax() {
        return add(max(this._getYAxisMax(this._rightYAxisChildren())), this._conf.yAxisPadding);
    }
    _getAllXAxisMinFromChildCharts() {
        return this._children.map(c => c.xAxisMin());
    }
    xAxisMin() {
        return subtract(min(this._getAllXAxisMinFromChildCharts()), this._conf.xAxisPadding, this._conf.xAxisPaddingUnit);
    }
    _getAllXAxisMaxFromChildCharts() {
        return this._children.map(c => c.xAxisMax());
    }
    xAxisMax() {
        return add(max(this._getAllXAxisMaxFromChildCharts()), this._conf.xAxisPadding, this._conf.xAxisPaddingUnit);
    }
    legendables() {
        return this._children.reduce((items, child) => {
            if (this._conf.shareColors) {
                child.colorHelper(this.colorHelper().share(child.conf().colorAccessor));
            }
            items.push.apply(items, child.legendables());
            return items;
        }, []);
    }
    legendHighlight(d) {
        for (let j = 0; j < this._children.length; ++j) {
            const child = this._children[j];
            child.legendHighlight(d);
        }
    }
    legendReset(d) {
        for (let j = 0; j < this._children.length; ++j) {
            const child = this._children[j];
            child.legendReset(d);
        }
    }
    legendToggle() {
        console.log('composite should not be getting legendToggle itself');
    }
    rightYAxis(rightYAxis) {
        if (!arguments.length) {
            return this._rightYAxis;
        }
        this._rightYAxis = rightYAxis;
        return this;
    }
    yAxisMin() {
        throw new Error('Not supported for this chart type');
    }
    yAxisMax() {
        throw new Error('Not supported for this chart type');
    }
}
//# sourceMappingURL=composite-chart.js.map