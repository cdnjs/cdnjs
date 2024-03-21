// @ts-ignore, TODO, not supported in d3v6
import { pointer } from 'd3-selection';
import { BaseMixin } from '../base/base-mixin.js';
import { BubbleMixin } from '../base/bubble-mixin.js';
import { transition } from '../core/core.js';
import { constants } from '../core/constants.js';
import { nameToId } from '../core/utils.js';
import { ColorMixin } from '../base/color-mixin.js';
const BUBBLE_OVERLAY_CLASS = 'bubble-overlay';
const BUBBLE_NODE_CLASS = 'node';
const BUBBLE_CLASS = 'bubble';
/**
 * The bubble overlay chart is quite different from the typical bubble chart. With the bubble overlay
 * chart you can arbitrarily place bubbles on an existing svg or bitmap image, thus changing the
 * typical x and y positioning while retaining the capability to visualize data using bubble radius
 * and coloring.
 *
 * Examples:
 * - {@link http://dc-js.github.com/dc.js/crime/index.html | Canadian City Crime Stats}
 */
export class BubbleOverlay extends BubbleMixin(ColorMixin(BaseMixin)) {
    /**
     * Create a Bubble Overlay.
     * Unlike other dc charts this chart will not generate a svg
     * element; therefore the bubble overlay chart will not work if svg is not explicitly set.
     * If the underlying image is a bitmap, then an empty svg will need to be created on top of the image.
     *
     * TODO update example
     *
     * @example
     * ```
     * // create a bubble overlay chart on top of the '#chart-container1 svg' element using the default global chart group
     * var bubbleChart1 = new BubbleOverlay('#chart-container1').svg(d3.select('#chart-container1 svg'));
     * // create a bubble overlay chart on top of the '#chart-container2 svg' element using chart group A
     * var bubbleChart2 = new BubbleOverlay('#chart-container2', 'chartGroupA').svg(d3.select('#chart-container2 svg'));
     * ```
     *
     * @see {@link BaseMixin.constructor}
     */
    constructor(parent, chartGroup) {
        super(parent, chartGroup);
        this.configure({
            points: [],
        });
        this._g = undefined;
        this.configure({
            // TODO: move following two to Mixin, BubbleChart has exactly same setup
            transitionDuration: 750,
            transitionDelay: 0,
            radiusValueAccessor: d => d.value,
        });
    }
    /**
     * @see {@link BaseMixin.configure}
     */
    configure(conf) {
        super.configure(conf);
        return this;
    }
    /**
     * @see {@link BaseMixin.conf}
     */
    conf() {
        return this._conf;
    }
    svg(svgElement) {
        if (!arguments.length) {
            return super.svg();
        }
        super.svg(svgElement);
        return this;
    }
    /**
     * @hidden
     */
    _doRender() {
        this._g = this._initOverlayG();
        this.r().range([this.MIN_RADIUS, this.width() * this._conf.maxBubbleRelativeSize]);
        this._initializeBubbles();
        this.fadeDeselectedArea(this.filter());
        return this;
    }
    _initOverlayG() {
        this._g = this.select(`g.${BUBBLE_OVERLAY_CLASS}`);
        if (this._g.empty()) {
            this._g = this.svg().append('g').attr('class', BUBBLE_OVERLAY_CLASS);
        }
        return this._g;
    }
    _initializeBubbles() {
        const data = this._mapData();
        this.calculateRadiusDomain();
        this._conf.points.forEach(point => {
            const nodeG = this._getNodeG(point, data);
            let circle = nodeG.select(`circle.${BUBBLE_CLASS}`);
            if (circle.empty()) {
                circle = nodeG
                    .append('circle')
                    .attr('class', BUBBLE_CLASS)
                    .attr('r', 0)
                    .attr('fill', (d, i) => this._colorHelper.getColor(d, i))
                    .on('click', (evt, d) => this.onClick(d));
            }
            transition(circle, this._conf.transitionDuration, this._conf.transitionDelay).attr('r', d => this.bubbleR(d));
            this._doRenderLabel(nodeG);
            this._doRenderTitles(nodeG);
        });
    }
    _mapData() {
        const data = {};
        this.data().forEach(datum => {
            data[this._conf.keyAccessor(datum)] = datum;
        });
        return data;
    }
    _getNodeG(point, data) {
        const bubbleNodeClass = `${BUBBLE_NODE_CLASS} ${nameToId(point.name)}`;
        let nodeG = this._g.select(`g.${nameToId(point.name)}`);
        if (nodeG.empty()) {
            nodeG = this._g
                .append('g')
                .attr('class', bubbleNodeClass)
                .attr('transform', `translate(${point.x},${point.y})`);
        }
        nodeG.datum(data[point.name]);
        return nodeG;
    }
    /**
     * @hidden
     */
    _doRedraw() {
        this._updateBubbles();
        this.fadeDeselectedArea(this.filter());
        return this;
    }
    _updateBubbles() {
        const data = this._mapData();
        this.calculateRadiusDomain();
        this._conf.points.forEach(point => {
            const nodeG = this._getNodeG(point, data);
            const circle = nodeG.select(`circle.${BUBBLE_CLASS}`);
            transition(circle, this._conf.transitionDuration, this._conf.transitionDelay)
                .attr('r', d => this.bubbleR(d))
                .attr('fill', (d, i) => this._colorHelper.getColor(d, i));
            this.doUpdateLabels(nodeG);
            this.doUpdateTitles(nodeG);
        });
    }
    /**
     * While creating a new chart, sometimes it may be tricky to find intended coordinates
     * of the bubbles.
     * Calling this method with `true` will enable displaying x/y coordinates on mouse move.
     *
     * It is intended to be used only during development.
     */
    debug(flag = false) {
        if (flag) {
            let debugG = this.select(`g.${constants.DEBUG_GROUP_CLASS}`);
            if (debugG.empty()) {
                debugG = this.svg().append('g').attr('class', constants.DEBUG_GROUP_CLASS);
            }
            const debugText = debugG.append('text').attr('x', 10).attr('y', 20);
            debugG
                .append('rect')
                .attr('width', this.width())
                .attr('height', this.height())
                .on('mousemove', (evt, d) => {
                const position = pointer(evt, debugG.node());
                const msg = `${position[0]}, ${position[1]}`;
                debugText.text(msg);
            });
        }
        else {
            this.selectAll('.debug').remove();
        }
        return this;
    }
}
//# sourceMappingURL=bubble-overlay.js.map