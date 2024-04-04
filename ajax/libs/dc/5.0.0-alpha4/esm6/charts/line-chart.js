import { area, curveBasis, curveBasisClosed, curveBasisOpen, curveBundle, curveCardinal, curveCardinalClosed, curveCardinalOpen, curveLinear, curveLinearClosed, curveMonotoneX, curveStep, curveStepAfter, curveStepBefore, line, } from 'd3-shape';
import { select } from 'd3-selection';
import { logger } from '../core/logger.js';
import { pluck2, printSingleValue, safeNumber } from '../core/utils.js';
import { StackMixin } from '../base/stack-mixin.js';
import { transition } from '../core/core.js';
const DEFAULT_DOT_RADIUS = 5;
const TOOLTIP_G_CLASS = 'dc-tooltip';
const DOT_CIRCLE_CLASS = 'dot';
const Y_AXIS_REF_LINE_CLASS = 'yRef';
const X_AXIS_REF_LINE_CLASS = 'xRef';
const DEFAULT_DOT_OPACITY = 1e-6;
const LABEL_PADDING = 3;
/**
 * Concrete line/area chart implementation.
 *
 * Examples:
 * - {@link http://dc-js.github.com/dc.js/ | Nasdaq 100 Index}
 * - {@link http://dc-js.github.com/dc.js/crime/index.html | Canadian City Crime Stats}
 */
export class LineChart extends StackMixin {
    /**
     * Create a Line Chart.
     *
     * TODO update example
     * @example
     * ```
     * // create a line chart under #chart-container1 element using the default global chart group
     * var chart1 = new LineChart('#chart-container1');
     * // create a line chart under #chart-container2 element using chart group A
     * var chart2 = new LineChart('#chart-container2', 'chartGroupA');
     * // create a sub-chart under a composite parent chart
     * var chart3 = new LineChart(compositeChart);
     * ```
     */
    constructor(parent, chartGroup) {
        super(parent, chartGroup);
        this.configure({
            transitionDuration: 500,
            transitionDelay: 0,
            label: d => printSingleValue(d.y0 + d.y),
            renderLabel: false,
            renderArea: false,
        });
        this._dotRadius = DEFAULT_DOT_RADIUS;
        this._dataPointRadius = null;
        this._dataPointFillOpacity = DEFAULT_DOT_OPACITY;
        this._dataPointStrokeOpacity = DEFAULT_DOT_OPACITY;
        this._curve = null;
        this._interpolate = null; // d3.curveLinear;  // deprecated in 3.0
        this._tension = null; // deprecated in 3.0
        this._defined = undefined;
        this._dashStyle = undefined;
        this._xyTipsOn = true;
        this._rangeBandPadding(1);
    }
    configure(conf) {
        super.configure(conf);
        return this;
    }
    conf() {
        return this._conf;
    }
    plotData() {
        const chartBody = this.chartBodyG();
        let layersList = chartBody.select('g.stack-list');
        if (layersList.empty()) {
            layersList = chartBody.append('g').attr('class', 'stack-list');
        }
        let layers = layersList.selectAll('g.stack').data(this.data());
        const layersEnter = layers
            .enter()
            .append('g')
            .attr('class', (d, i) => `stack _${i}`);
        layers = layersEnter.merge(layers);
        this._drawLine(layersEnter, layers);
        this._drawArea(layersEnter, layers);
        this._drawDots(chartBody, layers);
        if (this._conf.renderLabel) {
            this._drawLabels(layers);
        }
    }
    curve(curve) {
        if (!arguments.length) {
            return this._curve;
        }
        this._curve = curve;
        return this;
    }
    interpolate(interpolate) {
        logger.warnOnce('dc.lineChart.interpolate has been deprecated since version 3.0 use dc.lineChart.curve instead');
        if (!arguments.length) {
            return this._interpolate;
        }
        this._interpolate = interpolate;
        return this;
    }
    tension(tension) {
        logger.warnOnce('dc.lineChart.tension has been deprecated since version 3.0 use dc.lineChart.curve instead');
        if (!arguments.length) {
            return this._tension;
        }
        this._tension = tension;
        return this;
    }
    defined(defined) {
        if (!arguments.length) {
            return this._defined;
        }
        this._defined = defined;
        return this;
    }
    dashStyle(dashStyle) {
        if (!arguments.length) {
            return this._dashStyle;
        }
        this._dashStyle = dashStyle;
        return this;
    }
    renderArea(renderArea) {
        if (!arguments.length) {
            return this._conf.renderArea;
        }
        this.configure({ renderArea: renderArea });
        return this;
    }
    // To keep it backward compatible, this covers multiple cases
    // See https://github.com/dc-js/dc.js/issues/1376
    // It will be removed when interpolate and tension are removed.
    _getCurveFactory() {
        let curve = null;
        // _curve takes precedence
        if (this._curve) {
            return this._curve;
        }
        // Approximate the D3v3 behavior
        if (typeof this._interpolate === 'function') {
            curve = this._interpolate;
        }
        else {
            // If _interpolate is string
            const mapping = {
                linear: curveLinear,
                'linear-closed': curveLinearClosed,
                step: curveStep,
                'step-before': curveStepBefore,
                'step-after': curveStepAfter,
                basis: curveBasis,
                'basis-open': curveBasisOpen,
                'basis-closed': curveBasisClosed,
                bundle: curveBundle,
                cardinal: curveCardinal,
                'cardinal-open': curveCardinalOpen,
                'cardinal-closed': curveCardinalClosed,
                monotone: curveMonotoneX,
            };
            curve = mapping[this._interpolate];
        }
        // Default value
        if (!curve) {
            curve = curveLinear;
        }
        if (this._tension !== null) {
            if (typeof curve.tension !== 'function') {
                logger.warn('tension was specified but the curve/interpolate does not support it.');
            }
            else {
                curve = curve.tension(this._tension);
            }
        }
        return curve;
    }
    _drawLine(layersEnter, layers) {
        const _line = line()
            .x((d) => this.x()(d.x)) // TODO: revisit later to put proper type
            .y((d) => this.y()(d.y + d.y0)) // TODO: revisit later to put proper type
            .curve(this._getCurveFactory());
        if (this._defined) {
            _line.defined(this._defined);
        }
        const path = layersEnter
            .append('path')
            .attr('class', 'line')
            .attr('stroke', (d, i) => this._colorHelper.getColor(d, i));
        if (this._dashStyle) {
            // TODO: see https://github.com/dc-js/dc.js/issues/1723
            // @ts-ignore
            path.attr('stroke-dasharray', this._dashStyle);
        }
        transition(layers.select('path.line'), this._conf.transitionDuration, this._conf.transitionDelay)
            // .ease('linear')
            .attr('stroke', (d, i) => this._colorHelper.getColor(d, i))
            .attr('d', d => this._safeD(_line(d.values)));
    }
    _drawArea(layersEnter, layers) {
        if (this._conf.renderArea) {
            const _area = area()
                .x((d) => this.x()(d.x)) // TODO: revisit later to put proper type
                .y1((d) => this.y()(d.y + d.y0)) // TODO: revisit later to put proper type
                .y0((d) => this.y()(d.y0)) // TODO: revisit later to put proper type
                .curve(this._getCurveFactory()); // the types slightly differ for area and line
            if (this._defined) {
                _area.defined(this._defined);
            }
            layersEnter
                .append('path')
                .attr('class', 'area')
                .attr('fill', (d, i) => this._colorHelper.getColor(d, i))
                .attr('d', d => this._safeD(_area(d.values)));
            transition(layers.select('path.area'), this._conf.transitionDuration, this._conf.transitionDelay)
                // .ease('linear')
                .attr('fill', (d, i) => this._colorHelper.getColor(d, i))
                .attr('d', d => this._safeD(_area(d.values)));
        }
    }
    _safeD(d) {
        return !d || d.indexOf('NaN') >= 0 ? 'M0,0' : d;
    }
    _drawDots(chartBody, layers) {
        if (this.xyTipsOn() === 'always' ||
            (!(this._conf.brushOn || this._conf.parentBrushOn) && this.xyTipsOn())) {
            const tooltipListClass = `${TOOLTIP_G_CLASS}-list`;
            let tooltips = chartBody.select(`g.${tooltipListClass}`);
            if (tooltips.empty()) {
                tooltips = chartBody.append('g').attr('class', tooltipListClass);
            }
            layers.each((data, layerIndex) => {
                let points = data.values;
                if (this._defined) {
                    points = points.filter(this._defined);
                }
                let g = tooltips.select(`g.${TOOLTIP_G_CLASS}._${layerIndex}`);
                if (g.empty()) {
                    g = tooltips.append('g').attr('class', `${TOOLTIP_G_CLASS} _${layerIndex}`);
                }
                this._createRefLines(g);
                const dots = g
                    .selectAll(`circle.${DOT_CIRCLE_CLASS}`)
                    .data(points, d => d.x);
                const chart = this;
                const dotsEnterModify = dots
                    .enter()
                    .append('circle')
                    .attr('class', DOT_CIRCLE_CLASS)
                    .attr('cx', d => safeNumber(this.x()(d.x)))
                    .attr('cy', d => safeNumber(this.y()(d.y + d.y0)))
                    .attr('r', this._getDotRadius())
                    .style('fill-opacity', this._dataPointFillOpacity)
                    .style('stroke-opacity', this._dataPointStrokeOpacity)
                    .attr('fill', (d, i) => this._colorHelper.getColor(d, i))
                    .attr('stroke', (d, i) => this._colorHelper.getColor(d, i))
                    .on('mousemove', function () {
                    const dot = select(this);
                    chart._showDot(dot);
                    chart._showRefLines(dot, g);
                })
                    .on('mouseout', function () {
                    const dot = select(this);
                    chart._hideDot(dot);
                    chart._hideRefLines(g);
                })
                    .merge(dots);
                dotsEnterModify.call(dot => this._doRenderTitle(dot, data));
                transition(dotsEnterModify, this._conf.transitionDuration)
                    .attr('cx', d => safeNumber(this.x()(d.x)))
                    .attr('cy', d => safeNumber(this.y()(d.y + d.y0)))
                    .attr('fill', (d, i) => this._colorHelper.getColor(d, i));
                dots.exit().remove();
            });
        }
    }
    _drawLabels(layers) {
        const chart = this;
        layers.each(function (data, layerIndex) {
            const layer = select(this);
            const labels = layer
                .selectAll('text.lineLabel')
                .data(data.values, d => d.x);
            const labelsEnterModify = labels
                .enter()
                .append('text')
                .attr('class', 'lineLabel')
                .attr('text-anchor', 'middle')
                .merge(labels);
            transition(labelsEnterModify, chart._conf.transitionDuration)
                .attr('x', d => safeNumber(chart.x()(d.x)))
                .attr('y', d => {
                const y = chart.y()(d.y + d.y0) - LABEL_PADDING;
                return safeNumber(y);
            })
                .text(d => chart._conf.label(d));
            transition(labels.exit(), chart._conf.transitionDuration).attr('height', 0).remove();
        });
    }
    _createRefLines(g) {
        let yRefLine = g.select(`path.${Y_AXIS_REF_LINE_CLASS}`);
        if (yRefLine.empty()) {
            yRefLine = g.append('path').attr('class', Y_AXIS_REF_LINE_CLASS);
        }
        yRefLine.style('display', 'none').attr('stroke-dasharray', '5,5');
        let xRefLine = g.select(`path.${X_AXIS_REF_LINE_CLASS}`);
        if (xRefLine.empty()) {
            xRefLine = g.append('path').attr('class', X_AXIS_REF_LINE_CLASS);
        }
        xRefLine.style('display', 'none').attr('stroke-dasharray', '5,5');
    }
    _showDot(dot) {
        dot.style('fill-opacity', 0.8);
        dot.style('stroke-opacity', 0.8);
        dot.attr('r', this._dotRadius);
        return dot;
    }
    _showRefLines(dot, g) {
        const x = dot.attr('cx');
        const y = dot.attr('cy');
        const yAxisX = this._yAxisX() - this.margins().left;
        const yAxisRefPathD = `M${yAxisX} ${y}L${x} ${y}`;
        const xAxisRefPathD = `M${x} ${this._yAxisHeight()}L${x} ${y}`;
        g.select(`path.${Y_AXIS_REF_LINE_CLASS}`).style('display', '').attr('d', yAxisRefPathD);
        g.select(`path.${X_AXIS_REF_LINE_CLASS}`).style('display', '').attr('d', xAxisRefPathD);
    }
    _getDotRadius() {
        return this._dataPointRadius || this._dotRadius;
    }
    _hideDot(dot) {
        dot.style('fill-opacity', this._dataPointFillOpacity)
            .style('stroke-opacity', this._dataPointStrokeOpacity)
            .attr('r', this._getDotRadius());
    }
    _hideRefLines(g) {
        g.select(`path.${Y_AXIS_REF_LINE_CLASS}`).style('display', 'none');
        g.select(`path.${X_AXIS_REF_LINE_CLASS}`).style('display', 'none');
    }
    _doRenderTitle(dot, d) {
        if (this._conf.renderTitle) {
            dot.select('title').remove();
            dot.append('title').text(pluck2('data', this.titleFn(d.name)));
        }
    }
    xyTipsOn(xyTipsOn) {
        if (!arguments.length) {
            return this._xyTipsOn;
        }
        this._xyTipsOn = xyTipsOn;
        return this;
    }
    dotRadius(dotRadius) {
        if (!arguments.length) {
            return this._dotRadius;
        }
        this._dotRadius = dotRadius;
        return this;
    }
    renderDataPoints(options) {
        if (!arguments.length) {
            return {
                fillOpacity: this._dataPointFillOpacity,
                strokeOpacity: this._dataPointStrokeOpacity,
                radius: this._dataPointRadius,
            };
        }
        else if (!options) {
            this._dataPointFillOpacity = DEFAULT_DOT_OPACITY;
            this._dataPointStrokeOpacity = DEFAULT_DOT_OPACITY;
            this._dataPointRadius = null;
        }
        else {
            this._dataPointFillOpacity = options.fillOpacity || 0.8;
            this._dataPointStrokeOpacity = options.strokeOpacity || 0.0;
            this._dataPointRadius = options.radius || 2;
        }
        return this;
    }
    _colorFilter(color, dashstyle, inv) {
        return function () {
            const item = select(this);
            const match = (item.attr('stroke') === color &&
                item.attr('stroke-dasharray') ===
                    (dashstyle instanceof Array ? dashstyle.join(',') : null)) ||
                item.attr('fill') === color;
            return inv ? !match : match;
        };
    }
    legendHighlight(d) {
        if (!this.isLegendableHidden(d)) {
            this.g()
                .selectAll('path.line, path.area')
                .classed('highlight', this._colorFilter(d.color, d.dashstyle))
                .classed('fadeout', this._colorFilter(d.color, d.dashstyle, true));
        }
    }
    legendReset() {
        this.g()
            .selectAll('path.line, path.area')
            .classed('highlight', false)
            .classed('fadeout', false);
    }
    legendables() {
        const legendables = super.legendables();
        if (!this._dashStyle) {
            return legendables;
        }
        return legendables.map(l => {
            l.dashstyle = this._dashStyle;
            return l;
        });
    }
}
//# sourceMappingURL=line-chart.js.map