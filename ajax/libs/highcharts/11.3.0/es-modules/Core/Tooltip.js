/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import F from './Templating.js';
const { format } = F;
import H from './Globals.js';
const { composed, doc, isSafari } = H;
import R from './Renderer/RendererUtilities.js';
const { distribute } = R;
import RendererRegistry from './Renderer/RendererRegistry.js';
import U from './Utilities.js';
const { addEvent, clamp, css, discardElement, extend, fireEvent, isArray, isNumber, isString, merge, pick, pushUnique, splat, syncTimeout } = U;
/* *
 *
 *  Class
 *
 * */
/* eslint-disable no-invalid-this, valid-jsdoc */
/**
 * Tooltip of a chart.
 *
 * @class
 * @name Highcharts.Tooltip
 *
 * @param {Highcharts.Chart} chart
 * The chart instance.
 *
 * @param {Highcharts.TooltipOptions} options
 * Tooltip options.
 */
class Tooltip {
    /* *
     *
     *  Constructors
     *
     * */
    constructor(chart, options) {
        /* *
         *
         *  Properties
         *
         * */
        this.allowShared = true;
        this.crosshairs = [];
        this.distance = 0;
        this.isHidden = true;
        this.isSticky = false;
        this.now = {};
        this.options = {};
        this.outside = false;
        this.chart = chart;
        this.init(chart, options);
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Build the body (lines) of the tooltip by iterating over the items and
     * returning one entry for each item, abstracting this functionality allows
     * to easily overwrite and extend it.
     *
     * @private
     * @function Highcharts.Tooltip#bodyFormatter
     */
    bodyFormatter(items) {
        return items.map(function (item) {
            const tooltipOptions = item.series.tooltipOptions;
            return (tooltipOptions[(item.point.formatPrefix || 'point') + 'Formatter'] ||
                item.point.tooltipFormatter).call(item.point, tooltipOptions[(item.point.formatPrefix || 'point') + 'Format'] || '');
        });
    }
    /**
     * Destroy the single tooltips in a split tooltip.
     * If the tooltip is active then it is not destroyed, unless forced to.
     *
     * @private
     * @function Highcharts.Tooltip#cleanSplit
     *
     * @param {boolean} [force]
     * Force destroy all tooltips.
     */
    cleanSplit(force) {
        this.chart.series.forEach(function (series) {
            const tt = series && series.tt;
            if (tt) {
                if (!tt.isActive || force) {
                    series.tt = tt.destroy();
                }
                else {
                    tt.isActive = false;
                }
            }
        });
    }
    /**
     * In case no user defined formatter is given, this will be used. Note that
     * the context here is an object holding point, series, x, y etc.
     *
     * @function Highcharts.Tooltip#defaultFormatter
     *
     * @param {Highcharts.Tooltip} tooltip
     *
     * @return {string|Array<string>}
     * Returns a string (single tooltip and shared)
     * or an array of strings (split tooltip)
     */
    defaultFormatter(tooltip) {
        const items = this.points || splat(this);
        let s;
        // Build the header
        s = [tooltip.tooltipFooterHeaderFormatter(items[0])];
        // build the values
        s = s.concat(tooltip.bodyFormatter(items));
        // footer
        s.push(tooltip.tooltipFooterHeaderFormatter(items[0], true));
        return s;
    }
    /**
     * Removes and destroys the tooltip and its elements.
     *
     * @function Highcharts.Tooltip#destroy
     */
    destroy() {
        // Destroy and clear local variables
        if (this.label) {
            this.label = this.label.destroy();
        }
        if (this.split) {
            this.cleanSplit(true);
            if (this.tt) {
                this.tt = this.tt.destroy();
            }
        }
        if (this.renderer) {
            this.renderer = this.renderer.destroy();
            discardElement(this.container);
        }
        U.clearTimeout(this.hideTimer);
        U.clearTimeout(this.tooltipTimeout);
    }
    /**
     * Extendable method to get the anchor position of the tooltip
     * from a point or set of points
     *
     * @private
     * @function Highcharts.Tooltip#getAnchor
     */
    getAnchor(points, mouseEvent) {
        const chart = this.chart, pointer = chart.pointer, inverted = chart.inverted, plotTop = chart.plotTop, plotLeft = chart.plotLeft;
        let ret;
        points = splat(points);
        // If reversedStacks are false the tooltip position should be taken from
        // the last point (#17948)
        if (points[0].series &&
            points[0].series.yAxis &&
            !points[0].series.yAxis.options.reversedStacks) {
            points = points.slice().reverse();
        }
        // When tooltip follows mouse, relate the position to the mouse
        if (this.followPointer && mouseEvent) {
            if (typeof mouseEvent.chartX === 'undefined') {
                mouseEvent = pointer.normalize(mouseEvent);
            }
            ret = [
                mouseEvent.chartX - plotLeft,
                mouseEvent.chartY - plotTop
            ];
            // Some series types use a specificly calculated tooltip position for
            // each point
        }
        else if (points[0].tooltipPos) {
            ret = points[0].tooltipPos;
            // Calculate the average position and adjust for axis positions
        }
        else {
            let chartX = 0, chartY = 0;
            points.forEach(function (point) {
                const pos = point.pos(true);
                if (pos) {
                    chartX += pos[0];
                    chartY += pos[1];
                }
            });
            chartX /= points.length;
            chartY /= points.length;
            // When shared, place the tooltip next to the mouse (#424)
            if (this.shared && points.length > 1 && mouseEvent) {
                if (inverted) {
                    chartX = mouseEvent.chartX;
                }
                else {
                    chartY = mouseEvent.chartY;
                }
            }
            // Use the average position for multiple points
            ret = [chartX - plotLeft, chartY - plotTop];
        }
        return ret.map(Math.round);
    }
    /**
     * Get the CSS class names for the tooltip's label. Styles the label
     * by `colorIndex` or user-defined CSS.
     *
     * @function Highcharts.Tooltip#getClassName
     *
     * @return {string}
     *         The class names.
     */
    getClassName(point, isSplit, isHeader) {
        const options = this.options, series = point.series, seriesOptions = series.options;
        return [
            options.className,
            'highcharts-label',
            isHeader && 'highcharts-tooltip-header',
            isSplit ? 'highcharts-tooltip-box' : 'highcharts-tooltip',
            !isHeader && 'highcharts-color-' + pick(point.colorIndex, series.colorIndex),
            (seriesOptions && seriesOptions.className)
        ].filter(isString).join(' ');
    }
    /**
     * Creates the Tooltip label element if it does not exist, then returns it.
     *
     * @function Highcharts.Tooltip#getLabel
     *
     * @return {Highcharts.SVGElement}
     * Tooltip label
     */
    getLabel() {
        const tooltip = this, styledMode = this.chart.styledMode, options = this.options, doSplit = this.split && this.allowShared;
        let container = this.container, renderer = this.chart.renderer;
        // If changing from a split tooltip to a non-split tooltip, we must
        // destroy it in order to get the SVG right. #13868.
        if (this.label) {
            const wasSplit = !this.label.hasClass('highcharts-label');
            if ((!doSplit && wasSplit) || (doSplit && !wasSplit)) {
                this.destroy();
            }
        }
        if (!this.label) {
            if (this.outside) {
                const chartStyle = this.chart.options.chart.style, Renderer = RendererRegistry.getRendererType();
                /**
                 * Reference to the tooltip's container, when
                 * [Highcharts.Tooltip#outside] is set to true, otherwise
                 * it's undefined.
                 *
                 * @name Highcharts.Tooltip#container
                 * @type {Highcharts.HTMLDOMElement|undefined}
                 */
                this.container = container = H.doc.createElement('div');
                container.className = 'highcharts-tooltip-container';
                // We need to set pointerEvents = 'none' as otherwise it makes
                // the area under the tooltip non-hoverable even after the
                // tooltip disappears, #19035.
                css(container, {
                    position: 'absolute',
                    top: '1px',
                    pointerEvents: 'none',
                    zIndex: Math.max(this.options.style.zIndex || 0, (chartStyle && chartStyle.zIndex || 0) + 3)
                });
                /**
                 * Reference to the tooltip's renderer, when
                 * [Highcharts.Tooltip#outside] is set to true, otherwise
                 * it's undefined.
                 *
                 * @name Highcharts.Tooltip#renderer
                 * @type {Highcharts.SVGRenderer|undefined}
                 */
                this.renderer = renderer = new Renderer(container, 0, 0, chartStyle, void 0, void 0, renderer.styledMode);
            }
            // Create the label
            if (doSplit) {
                this.label = renderer.g('tooltip');
            }
            else {
                this.label = renderer
                    .label('', 0, 0, options.shape, void 0, void 0, options.useHTML, void 0, 'tooltip')
                    .attr({
                    padding: options.padding,
                    r: options.borderRadius
                });
                if (!styledMode) {
                    this.label
                        .attr({
                        fill: options.backgroundColor,
                        'stroke-width': options.borderWidth || 0
                    })
                        // #2301, #2657
                        .css(options.style)
                        .css({
                        pointerEvents: (options.style.pointerEvents ||
                            (this.shouldStickOnContact() ? 'auto' : 'none'))
                    });
                }
            }
            // Split tooltip use updateTooltipContainer to position the tooltip
            // container.
            if (tooltip.outside) {
                const label = this.label;
                const { xSetter, ySetter } = label;
                label.xSetter = function (value) {
                    xSetter.call(label, tooltip.distance);
                    if (container) {
                        container.style.left = value + 'px';
                    }
                };
                label.ySetter = function (value) {
                    ySetter.call(label, tooltip.distance);
                    if (container) {
                        container.style.top = value + 'px';
                    }
                };
            }
            this.label
                .attr({ zIndex: 8 })
                .shadow(options.shadow)
                .add();
        }
        if (container && !container.parentElement) {
            H.doc.body.appendChild(container);
        }
        return this.label;
    }
    /**
     * Get the total area available area to place the tooltip
     *
     * @private
     */
    getPlayingField() {
        const { body, documentElement } = doc, { chart, distance, outside } = this;
        return {
            width: outside ?
                // Substract distance to prevent scrollbars
                Math.max(body.scrollWidth, documentElement.scrollWidth, body.offsetWidth, documentElement.offsetWidth, documentElement.clientWidth) - 2 * distance :
                chart.chartWidth,
            height: outside ?
                Math.max(body.scrollHeight, documentElement.scrollHeight, body.offsetHeight, documentElement.offsetHeight, documentElement.clientHeight) :
                chart.chartHeight
        };
    }
    /**
     * Place the tooltip in a chart without spilling over and not covering the
     * point itself.
     *
     * @function Highcharts.Tooltip#getPosition
     *
     * @param {number} boxWidth
     *        Width of the tooltip box.
     *
     * @param {number} boxHeight
     *        Height of the tooltip box.
     *
     * @param {Highcharts.Point} point
     *        Tooltip related point.
     *
     * @return {Highcharts.PositionObject}
     *         Recommended position of the tooltip.
     */
    getPosition(boxWidth, boxHeight, point) {
        const { distance, chart, outside } = this, { inverted, plotLeft, plotTop, polar } = chart, { plotX = 0, plotY = 0 } = point, ret = {}, 
        // Don't use h if chart isn't inverted (#7242) ???
        h = (inverted && point.h) || 0, // #4117 ???
        { height: outerHeight, width: outerWidth } = this.getPlayingField(), chartPosition = chart.pointer.getChartPosition(), scaleX = (val) => (val * chartPosition.scaleX), scaleY = (val) => (val * chartPosition.scaleY), 
        // Build parameter arrays for firstDimension()/secondDimension()
        buildDimensionArray = (dim) => {
            const isX = dim === 'x';
            return [
                dim,
                isX ? outerWidth : outerHeight,
                isX ? boxWidth : boxHeight
            ].concat(outside ? [
                // If we are using tooltip.outside, we need to scale the
                // position to match scaling of the container in case there
                // is a transform/zoom on the container. #11329
                isX ? scaleX(boxWidth) : scaleY(boxHeight),
                isX ? chartPosition.left - distance +
                    scaleX(plotX + plotLeft) :
                    chartPosition.top - distance +
                        scaleY(plotY + plotTop),
                0,
                isX ? outerWidth : outerHeight
            ] : [
                // Not outside, no scaling is needed
                isX ? boxWidth : boxHeight,
                isX ? plotX + plotLeft : plotY + plotTop,
                isX ? plotLeft : plotTop,
                isX ? plotLeft + chart.plotWidth :
                    plotTop + chart.plotHeight
            ]);
        };
        let first = buildDimensionArray('y'), second = buildDimensionArray('x'), swapped;
        // Handle negative points or reversed axis (#13780)
        let flipped = !!point.negative;
        if (!polar &&
            chart.hoverSeries?.yAxis?.reversed) {
            flipped = !flipped;
        }
        // The far side is right or bottom
        const preferFarSide = !this.followPointer &&
            pick(point.ttBelow, polar ? false : !inverted === flipped), // #4984
        /*
         * Handle the preferred dimension. When the preferred dimension is
         * tooltip on top or bottom of the point, it will look for space
         * there.
         *
         * @private
         */
        firstDimension = function (dim, outerSize, innerSize, scaledInnerSize, // #11329
        point, min, max) {
            const scaledDist = outside ?
                (dim === 'y' ? scaleY(distance) : scaleX(distance)) :
                distance, scaleDiff = (innerSize - scaledInnerSize) / 2, roomLeft = scaledInnerSize < point - distance, roomRight = point + distance + scaledInnerSize < outerSize, alignedLeft = point - scaledDist - innerSize + scaleDiff, alignedRight = point + scaledDist - scaleDiff;
            if (preferFarSide && roomRight) {
                ret[dim] = alignedRight;
            }
            else if (!preferFarSide && roomLeft) {
                ret[dim] = alignedLeft;
            }
            else if (roomLeft) {
                ret[dim] = Math.min(max - scaledInnerSize, alignedLeft - h < 0 ? alignedLeft : alignedLeft - h);
            }
            else if (roomRight) {
                ret[dim] = Math.max(min, alignedRight + h + innerSize > outerSize ?
                    alignedRight :
                    alignedRight + h);
            }
            else {
                return false;
            }
        }, 
        /*
         * Handle the secondary dimension. If the preferred dimension is
         * tooltip on top or bottom of the point, the second dimension is to
         * align the tooltip above the point, trying to align center but
         * allowing left or right align within the chart box.
         *
         * @private
         */
        secondDimension = function (dim, outerSize, innerSize, scaledInnerSize, // #11329
        point) {
            // Too close to the edge, return false and swap dimensions
            if (point < distance || point > outerSize - distance) {
                return false;
            }
            // Align left/top
            if (point < innerSize / 2) {
                ret[dim] = 1;
                // Align right/bottom
            }
            else if (point > outerSize - scaledInnerSize / 2) {
                ret[dim] = outerSize - scaledInnerSize - 2;
                // Align center
            }
            else {
                ret[dim] = point - innerSize / 2;
            }
        }, 
        /*
         * Swap the dimensions
         */
        swap = function (count) {
            [first, second] = [second, first];
            swapped = count;
        }, run = () => {
            if (firstDimension.apply(0, first) !== false) {
                if (secondDimension.apply(0, second) === false &&
                    !swapped) {
                    swap(true);
                    run();
                }
            }
            else if (!swapped) {
                swap(true);
                run();
            }
            else {
                ret.x = ret.y = 0;
            }
        };
        // Under these conditions, prefer the tooltip on the side of the point
        if ((inverted && !polar) || this.len > 1) {
            swap();
        }
        run();
        return ret;
    }
    /**
     * Hides the tooltip with a fade out animation.
     *
     * @function Highcharts.Tooltip#hide
     *
     * @param {number} [delay]
     *        The fade out in milliseconds. If no value is provided the value
     *        of the tooltip.hideDelay option is used. A value of 0 disables
     *        the fade out animation.
     */
    hide(delay) {
        const tooltip = this;
        // Disallow duplicate timers (#1728, #1766)
        U.clearTimeout(this.hideTimer);
        delay = pick(delay, this.options.hideDelay);
        if (!this.isHidden) {
            this.hideTimer = syncTimeout(function () {
                const label = tooltip.getLabel();
                // If there is a delay, fade out with the default duration. If
                // the hideDelay is 0, we assume no animation is wanted, so we
                // pass 0 duration. #12994.
                tooltip.getLabel().animate({
                    opacity: 0
                }, {
                    duration: delay ? 150 : delay,
                    complete: () => {
                        // #3088, assuming we're only using this for tooltips
                        label.hide();
                        // Clear the container for outside tooltip (#18490)
                        if (tooltip.container) {
                            tooltip.container.remove();
                        }
                    }
                });
                tooltip.isHidden = true;
            }, delay);
        }
    }
    /**
     * Initialize tooltip.
     *
     * @private
     * @function Highcharts.Tooltip#init
     *
     * @param {Highcharts.Chart} chart
     *        The chart instance.
     *
     * @param {Highcharts.TooltipOptions} options
     *        Tooltip options.
     */
    init(chart, options) {
        /**
         * Chart of the tooltip.
         *
         * @readonly
         * @name Highcharts.Tooltip#chart
         * @type {Highcharts.Chart}
         */
        this.chart = chart;
        /**
         * Used tooltip options.
         *
         * @readonly
         * @name Highcharts.Tooltip#options
         * @type {Highcharts.TooltipOptions}
         */
        this.options = options;
        /**
         * List of crosshairs.
         *
         * @private
         * @readonly
         * @name Highcharts.Tooltip#crosshairs
         * @type {Array<null>}
         */
        this.crosshairs = [];
        /**
         * Current values of x and y when animating.
         *
         * @private
         * @readonly
         * @name Highcharts.Tooltip#now
         * @type {Highcharts.PositionObject}
         */
        this.now = { x: 0, y: 0 };
        /**
         * Tooltips are initially hidden.
         *
         * @private
         * @readonly
         * @name Highcharts.Tooltip#isHidden
         * @type {boolean}
         */
        this.isHidden = true;
        /**
         * True, if the tooltip is split into one label per series, with the
         * header close to the axis.
         *
         * @readonly
         * @name Highcharts.Tooltip#split
         * @type {boolean|undefined}
         */
        this.split = options.split && !chart.inverted && !chart.polar;
        /**
         * When the tooltip is shared, the entire plot area will capture mouse
         * movement or touch events.
         *
         * @readonly
         * @name Highcharts.Tooltip#shared
         * @type {boolean|undefined}
         */
        this.shared = options.shared || this.split;
        /**
         * Whether to allow the tooltip to render outside the chart's SVG
         * element box. By default (false), the tooltip is rendered within the
         * chart's SVG element, which results in the tooltip being aligned
         * inside the chart area.
         *
         * @readonly
         * @name Highcharts.Tooltip#outside
         * @type {boolean}
         *
         * @todo
         * Split tooltip does not support outside in the first iteration. Should
         * not be too complicated to implement.
         */
        this.outside = pick(options.outside, Boolean(chart.scrollablePixelsX || chart.scrollablePixelsY));
    }
    shouldStickOnContact(pointerEvent) {
        return !!(!this.followPointer &&
            this.options.stickOnContact &&
            (!pointerEvent || this.chart.pointer.inClass(pointerEvent.target, 'highcharts-tooltip')));
    }
    /**
     * Moves the tooltip with a soft animation to a new position.
     *
     * @private
     * @function Highcharts.Tooltip#move
     *
     * @param {number} x
     *
     * @param {number} y
     *
     * @param {number} anchorX
     *
     * @param {number} anchorY
     */
    move(x, y, anchorX, anchorY) {
        const tooltip = this, now = tooltip.now, animate = tooltip.options.animation !== false &&
            !tooltip.isHidden &&
            // When we get close to the target position, abort animation and
            // land on the right place (#3056)
            (Math.abs(x - now.x) > 1 || Math.abs(y - now.y) > 1), skipAnchor = tooltip.followPointer || tooltip.len > 1;
        // Get intermediate values for animation
        extend(now, {
            x: animate ? (2 * now.x + x) / 3 : x,
            y: animate ? (now.y + y) / 2 : y,
            anchorX: skipAnchor ?
                void 0 :
                animate ? (2 * now.anchorX + anchorX) / 3 : anchorX,
            anchorY: skipAnchor ?
                void 0 :
                animate ? (now.anchorY + anchorY) / 2 : anchorY
        });
        // Move to the intermediate value
        tooltip.getLabel().attr(now);
        tooltip.drawTracker();
        // Run on next tick of the mouse tracker
        if (animate) {
            // Never allow two timeouts
            U.clearTimeout(this.tooltipTimeout);
            // Set the fixed interval ticking for the smooth tooltip
            this.tooltipTimeout = setTimeout(function () {
                // The interval function may still be running during destroy,
                // so check that the chart is really there before calling.
                if (tooltip) {
                    tooltip.move(x, y, anchorX, anchorY);
                }
            }, 32);
        }
    }
    /**
     * Refresh the tooltip's text and position.
     *
     * @function Highcharts.Tooltip#refresh
     *
     * @param {Highcharts.Point|Array<Highcharts.Point>} pointOrPoints
     *        Either a point or an array of points.
     *
     * @param {Highcharts.PointerEventObject} [mouseEvent]
     *        Mouse event, that is responsible for the refresh and should be
     *        used for the tooltip update.
     */
    refresh(pointOrPoints, mouseEvent) {
        const tooltip = this, chart = this.chart, options = tooltip.options, pointer = chart.pointer, points = splat(pointOrPoints), point = points[0], pointConfig = [], formatString = options.format, formatter = options.formatter || tooltip.defaultFormatter, shared = tooltip.shared, styledMode = chart.styledMode;
        let formatterContext = {};
        if (!options.enabled || !point.series) { // #16820
            return;
        }
        U.clearTimeout(this.hideTimer);
        // A switch saying if this specific tooltip configuration allows shared
        // or split modes
        tooltip.allowShared = !(!isArray(pointOrPoints) &&
            pointOrPoints.series &&
            pointOrPoints.series.noSharedTooltip);
        // get the reference point coordinates (pie charts use tooltipPos)
        tooltip.followPointer = (!tooltip.split && point.series.tooltipOptions.followPointer);
        const anchor = tooltip.getAnchor(pointOrPoints, mouseEvent), x = anchor[0], y = anchor[1];
        // shared tooltip, array is sent over
        if (shared && tooltip.allowShared) {
            pointer.applyInactiveState(points);
            // Now set hover state for the choosen ones:
            points.forEach(function (item) {
                item.setState('hover');
                pointConfig.push(item.getLabelConfig());
            });
            formatterContext = point.getLabelConfig();
            formatterContext.points = pointConfig;
            // single point tooltip
        }
        else {
            formatterContext = point.getLabelConfig();
        }
        this.len = pointConfig.length; // #6128
        const text = isString(formatString) ?
            format(formatString, formatterContext, chart) :
            formatter.call(formatterContext, tooltip);
        // register the current series
        const currentSeries = point.series;
        this.distance = pick(currentSeries.tooltipOptions.distance, 16);
        // update the inner HTML
        if (text === false) {
            this.hide();
        }
        else {
            // update text
            if (tooltip.split && tooltip.allowShared) { // #13868
                this.renderSplit(text, points);
            }
            else {
                let checkX = x;
                let checkY = y;
                if (mouseEvent && pointer.isDirectTouch) {
                    checkX = mouseEvent.chartX - chart.plotLeft;
                    checkY = mouseEvent.chartY - chart.plotTop;
                }
                // #11493, #13095
                if (chart.polar ||
                    currentSeries.options.clip === false ||
                    points.some((p) => // #16004
                     pointer.isDirectTouch || // ##17929
                        p.series.shouldShowTooltip(checkX, checkY))) {
                    const label = tooltip.getLabel();
                    // Prevent the tooltip from flowing over the chart box
                    // (#6659)
                    if (!options.style.width || styledMode) {
                        label.css({
                            width: (this.outside ?
                                this.getPlayingField() :
                                chart.spacingBox).width + 'px'
                        });
                    }
                    label.attr({
                        text: text && text.join ?
                            text.join('') :
                            text
                    });
                    // Set the stroke color of the box to reflect the point
                    label.addClass(tooltip.getClassName(point), true);
                    if (!styledMode) {
                        label.attr({
                            stroke: (options.borderColor ||
                                point.color ||
                                currentSeries.color ||
                                "#666666" /* Palette.neutralColor60 */)
                        });
                    }
                    tooltip.updatePosition({
                        plotX: x,
                        plotY: y,
                        negative: point.negative,
                        ttBelow: point.ttBelow,
                        h: anchor[2] || 0
                    });
                }
                else {
                    tooltip.hide();
                    return;
                }
            }
            // show it
            if (tooltip.isHidden && tooltip.label) {
                tooltip.label.attr({
                    opacity: 1
                }).show();
            }
            tooltip.isHidden = false;
        }
        fireEvent(this, 'refresh');
    }
    /**
     * Render the split tooltip. Loops over each point's text and adds
     * a label next to the point, then uses the distribute function to
     * find best non-overlapping positions.
     *
     * @private
     * @function Highcharts.Tooltip#renderSplit
     *
     * @param {string|Array<(boolean|string)>} labels
     *
     * @param {Array<Highcharts.Point>} points
     */
    renderSplit(labels, points) {
        const tooltip = this;
        const { chart, chart: { chartWidth, chartHeight, plotHeight, plotLeft, plotTop, pointer, scrollablePixelsY = 0, scrollablePixelsX, scrollingContainer: { scrollLeft, scrollTop } = { scrollLeft: 0, scrollTop: 0 }, styledMode }, distance, options, options: { positioner } } = tooltip;
        // The area which the tooltip should be limited to. Limit to scrollable
        // plot area if enabled, otherwise limit to the chart container. If
        // outside is true it should be the whole viewport
        const bounds = (tooltip.outside &&
            typeof scrollablePixelsX !== 'number') ?
            doc.documentElement.getBoundingClientRect() : {
            left: scrollLeft,
            right: scrollLeft + chartWidth,
            top: scrollTop,
            bottom: scrollTop + chartHeight
        };
        const tooltipLabel = tooltip.getLabel();
        const ren = this.renderer || chart.renderer;
        const headerTop = Boolean(chart.xAxis[0] && chart.xAxis[0].opposite);
        const { left: chartLeft, top: chartTop } = pointer.getChartPosition();
        let distributionBoxTop = plotTop + scrollTop;
        let headerHeight = 0;
        let adjustedPlotHeight = plotHeight - scrollablePixelsY;
        /**
         * Calculates the anchor position for the partial tooltip
         *
         * @private
         * @param {Highcharts.Point} point The point related to the tooltip
         * @return {Object} Returns an object with anchorX and anchorY
         */
        function getAnchor(point) {
            const { isHeader, plotX = 0, plotY = 0, series } = point;
            let anchorX;
            let anchorY;
            if (isHeader) {
                // Set anchorX to plotX
                anchorX = Math.max(plotLeft + plotX, plotLeft);
                // Set anchorY to center of visible plot area.
                anchorY = plotTop + plotHeight / 2;
            }
            else {
                const { xAxis, yAxis } = series;
                // Set anchorX to plotX. Limit to within xAxis.
                anchorX = xAxis.pos + clamp(plotX, -distance, xAxis.len + distance);
                // Set anchorY, limit to the scrollable plot area
                if (series.shouldShowTooltip(0, yAxis.pos - plotTop + plotY, {
                    ignoreX: true
                })) {
                    anchorY = yAxis.pos + plotY;
                }
            }
            // Limit values to plot area
            anchorX = clamp(anchorX, bounds.left - distance, bounds.right + distance);
            return { anchorX, anchorY };
        }
        /**
         * Calculates the position of the partial tooltip
         *
         * @private
         * @param {number} anchorX
         * The partial tooltip anchor x position
         *
         * @param {number} anchorY
         * The partial tooltip anchor y position
         *
         * @param {boolean|undefined} isHeader
         * Whether the partial tooltip is a header
         *
         * @param {number} boxWidth
         * Width of the partial tooltip
         *
         * @return {Highcharts.PositionObject}
         * Returns the partial tooltip x and y position
         */
        function defaultPositioner(anchorX, anchorY, isHeader, boxWidth, alignedLeft = true) {
            let y;
            let x;
            if (isHeader) {
                y = headerTop ? 0 : adjustedPlotHeight;
                x = clamp(anchorX - (boxWidth / 2), bounds.left, bounds.right - boxWidth - (tooltip.outside ? chartLeft : 0));
            }
            else {
                y = anchorY - distributionBoxTop;
                x = alignedLeft ?
                    anchorX - boxWidth - distance :
                    anchorX + distance;
                x = clamp(x, alignedLeft ? x : bounds.left, bounds.right);
            }
            // NOTE: y is relative to distributionBoxTop
            return { x, y };
        }
        /**
         * Updates the attributes and styling of the partial tooltip. Creates a
         * new partial tooltip if it does not exists.
         *
         * @private
         * @param {Highcharts.SVGElement|undefined} partialTooltip
         *  The partial tooltip to update
         * @param {Highcharts.Point} point
         *  The point related to the partial tooltip
         * @param {boolean|string} str The text for the partial tooltip
         * @return {Highcharts.SVGElement} Returns the updated partial tooltip
         */
        function updatePartialTooltip(partialTooltip, point, str) {
            let tt = partialTooltip;
            const { isHeader, series } = point;
            if (!tt) {
                const attribs = {
                    padding: options.padding,
                    r: options.borderRadius
                };
                if (!styledMode) {
                    attribs.fill = options.backgroundColor;
                    attribs['stroke-width'] = options.borderWidth ?? 1;
                }
                tt = ren
                    .label('', 0, 0, (options[isHeader ? 'headerShape' : 'shape']), void 0, void 0, options.useHTML)
                    .addClass(tooltip.getClassName(point, true, isHeader))
                    .attr(attribs)
                    .add(tooltipLabel);
            }
            tt.isActive = true;
            tt.attr({
                text: str
            });
            if (!styledMode) {
                tt.css(options.style)
                    .attr({
                    stroke: (options.borderColor ||
                        point.color ||
                        series.color ||
                        "#333333" /* Palette.neutralColor80 */)
                });
            }
            return tt;
        }
        // Graceful degradation for legacy formatters
        if (isString(labels)) {
            labels = [false, labels];
        }
        // Create the individual labels for header and points, ignore footer
        let boxes = labels.slice(0, points.length + 1).reduce(function (boxes, str, i) {
            if (str !== false && str !== '') {
                const point = (points[i - 1] ||
                    {
                        // Item 0 is the header. Instead of this, we could also
                        // use the crosshair label
                        isHeader: true,
                        plotX: points[0].plotX,
                        plotY: plotHeight,
                        series: {}
                    });
                const isHeader = point.isHeader;
                // Store the tooltip label referance on the series
                const owner = isHeader ? tooltip : point.series;
                const tt = owner.tt = updatePartialTooltip(owner.tt, point, str.toString());
                // Get X position now, so we can move all to the other side in
                // case of overflow
                const bBox = tt.getBBox();
                const boxWidth = bBox.width + tt.strokeWidth();
                if (isHeader) {
                    headerHeight = bBox.height;
                    adjustedPlotHeight += headerHeight;
                    if (headerTop) {
                        distributionBoxTop -= headerHeight;
                    }
                }
                const { anchorX, anchorY } = getAnchor(point);
                if (typeof anchorY === 'number') {
                    const size = bBox.height + 1;
                    const boxPosition = (positioner ?
                        positioner.call(tooltip, boxWidth, size, point) :
                        defaultPositioner(anchorX, anchorY, isHeader, boxWidth));
                    boxes.push({
                        // 0-align to the top, 1-align to the bottom
                        align: positioner ? 0 : void 0,
                        anchorX,
                        anchorY,
                        boxWidth,
                        point,
                        rank: pick(boxPosition.rank, isHeader ? 1 : 0),
                        size,
                        target: boxPosition.y,
                        tt,
                        x: boxPosition.x
                    });
                }
                else {
                    // Hide tooltips which anchorY is outside the visible plot
                    // area
                    tt.isActive = false;
                }
            }
            return boxes;
        }, []);
        // Realign the tooltips towards the right if there is not enough space
        // to the left and there is space to to the right
        if (!positioner && boxes.some((box) => {
            // Always realign if the beginning of a label is outside bounds
            const { outside } = tooltip;
            const boxStart = (outside ? chartLeft : 0) + box.anchorX;
            if (boxStart < bounds.left &&
                boxStart + box.boxWidth < bounds.right) {
                return true;
            }
            // Otherwise, check if there is more space available to the right
            return boxStart < (chartLeft - bounds.left) + box.boxWidth &&
                bounds.right - boxStart > boxStart;
        })) {
            boxes = boxes.map((box) => {
                const { x, y } = defaultPositioner(box.anchorX, box.anchorY, box.point.isHeader, box.boxWidth, false);
                return extend(box, {
                    target: y,
                    x
                });
            });
        }
        // Clean previous run (for missing points)
        tooltip.cleanSplit();
        // Distribute and put in place
        distribute(boxes, adjustedPlotHeight);
        const boxExtremes = {
            left: chartLeft,
            right: chartLeft
        };
        // Get the extremes from series tooltips
        boxes.forEach(function (box) {
            const { x, boxWidth, isHeader } = box;
            if (!isHeader) {
                if (tooltip.outside && chartLeft + x < boxExtremes.left) {
                    boxExtremes.left = chartLeft + x;
                }
                if (!isHeader &&
                    tooltip.outside &&
                    boxExtremes.left + boxWidth > boxExtremes.right) {
                    boxExtremes.right = chartLeft + x;
                }
            }
        });
        boxes.forEach(function (box) {
            const { x, anchorX, anchorY, pos, point: { isHeader } } = box;
            const attributes = {
                visibility: typeof pos === 'undefined' ? 'hidden' : 'inherit',
                x,
                /* NOTE: y should equal pos to be consistent with !split
                 * tooltip, but is currently relative to plotTop. Is left as is
                 * to avoid breaking change. Remove distributionBoxTop to make
                 * it consistent.
                 */
                y: (pos || 0) + distributionBoxTop,
                anchorX,
                anchorY
            };
            // Handle left-aligned tooltips overflowing the chart area
            if (tooltip.outside && x < anchorX) {
                const offset = chartLeft - boxExtremes.left;
                // Skip this if there is no overflow
                if (offset > 0) {
                    if (!isHeader) {
                        attributes.x = x + offset;
                        attributes.anchorX = anchorX + offset;
                    }
                    if (isHeader) {
                        attributes.x = (boxExtremes.right - boxExtremes.left) / 2;
                        attributes.anchorX = anchorX + offset;
                    }
                }
            }
            // Put the label in place
            box.tt.attr(attributes);
        });
        /* If we have a seperate tooltip container, then update the necessary
         * container properties.
         * Test that tooltip has its own container and renderer before executing
         * the operation.
         */
        const { container, outside, renderer } = tooltip;
        if (outside && container && renderer) {
            // Set container size to fit the bounds
            const { width, height, x, y } = tooltipLabel.getBBox();
            renderer.setSize(width + x, height + y, false);
            // Position the tooltip container to the chart container
            container.style.left = boxExtremes.left + 'px';
            container.style.top = chartTop + 'px';
        }
        // Workaround for #18927, artefacts left by the shadows of split
        // tooltips in Safari v16 (2023). Check again with later versions if we
        // can remove this.
        if (isSafari) {
            tooltipLabel.attr({
                // Force a redraw of the whole group by chaning the opacity
                // slightly
                opacity: tooltipLabel.opacity === 1 ? 0.999 : 1
            });
        }
    }
    /**
     * If the `stickOnContact` option is active, this will add a tracker shape.
     *
     * @private
     * @function Highcharts.Tooltip#drawTracker
     */
    drawTracker() {
        const tooltip = this;
        if (!this.shouldStickOnContact()) {
            if (tooltip.tracker) {
                tooltip.tracker = tooltip.tracker.destroy();
            }
            return;
        }
        const chart = tooltip.chart;
        const label = tooltip.label;
        const points = tooltip.shared ? chart.hoverPoints : chart.hoverPoint;
        if (!label || !points) {
            return;
        }
        const box = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
        // Combine anchor and tooltip
        const anchorPos = this.getAnchor(points);
        const labelBBox = label.getBBox();
        anchorPos[0] += chart.plotLeft - (label.translateX || 0);
        anchorPos[1] += chart.plotTop - (label.translateY || 0);
        // When the mouse pointer is between the anchor point and the label,
        // the label should stick.
        box.x = Math.min(0, anchorPos[0]);
        box.y = Math.min(0, anchorPos[1]);
        box.width = (anchorPos[0] < 0 ?
            Math.max(Math.abs(anchorPos[0]), (labelBBox.width - anchorPos[0])) :
            Math.max(Math.abs(anchorPos[0]), labelBBox.width));
        box.height = (anchorPos[1] < 0 ?
            Math.max(Math.abs(anchorPos[1]), (labelBBox.height - Math.abs(anchorPos[1]))) :
            Math.max(Math.abs(anchorPos[1]), labelBBox.height));
        if (tooltip.tracker) {
            tooltip.tracker.attr(box);
        }
        else {
            tooltip.tracker = label.renderer
                .rect(box)
                .addClass('highcharts-tracker')
                .add(label);
            if (!chart.styledMode) {
                tooltip.tracker.attr({
                    fill: 'rgba(0,0,0,0)'
                });
            }
        }
    }
    /**
     * @private
     */
    styledModeFormat(formatString) {
        return formatString
            .replace('style="font-size: 0.8em"', 'class="highcharts-header"')
            .replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex} ' +
            '{series.options.className} ' +
            '{point.options.className}"');
    }
    /**
     * Format the footer/header of the tooltip
     * #3397: abstraction to enable formatting of footer and header
     *
     * @private
     * @function Highcharts.Tooltip#tooltipFooterHeaderFormatter
     */
    tooltipFooterHeaderFormatter(labelConfig, isFooter) {
        const series = labelConfig.series, tooltipOptions = series.tooltipOptions, xAxis = series.xAxis, dateTime = xAxis && xAxis.dateTime, e = {
            isFooter: isFooter,
            labelConfig: labelConfig
        };
        let xDateFormat = tooltipOptions.xDateFormat, formatString = tooltipOptions[isFooter ? 'footerFormat' : 'headerFormat'];
        fireEvent(this, 'headerFormatter', e, function (e) {
            // Guess the best date format based on the closest point distance
            // (#568, #3418)
            if (dateTime && !xDateFormat && isNumber(labelConfig.key)) {
                xDateFormat = dateTime.getXDateFormat(labelConfig.key, tooltipOptions.dateTimeLabelFormats);
            }
            // Insert the footer date format if any
            if (dateTime && xDateFormat) {
                ((labelConfig.point && labelConfig.point.tooltipDateKeys) ||
                    ['key']).forEach(function (key) {
                    formatString = formatString.replace('{point.' + key + '}', '{point.' + key + ':' + xDateFormat + '}');
                });
            }
            // Replace default header style with class name
            if (series.chart.styledMode) {
                formatString = this.styledModeFormat(formatString);
            }
            e.text = format(formatString, {
                point: labelConfig,
                series: series
            }, this.chart);
        });
        return e.text;
    }
    /**
     * Updates the tooltip with the provided tooltip options.
     *
     * @function Highcharts.Tooltip#update
     *
     * @param {Highcharts.TooltipOptions} options
     *        The tooltip options to update.
     */
    update(options) {
        this.destroy();
        this.init(this.chart, merge(true, this.options, options));
    }
    /**
     * Find the new position and perform the move
     *
     * @private
     * @function Highcharts.Tooltip#updatePosition
     *
     * @param {Highcharts.Point} point
     */
    updatePosition(point) {
        const { chart, container, distance, options, renderer } = this, { height = 0, width = 0 } = this.getLabel(), pointer = chart.pointer, 
        // Needed for outside: true (#11688)
        { left, top, scaleX, scaleY } = pointer.getChartPosition(), pos = (options.positioner || this.getPosition).call(this, width, height, point);
        let anchorX = (point.plotX || 0) + chart.plotLeft, anchorY = (point.plotY || 0) + chart.plotTop, pad;
        // Set the renderer size dynamically to prevent document size to change.
        // Renderer only exists when tooltip is outside.
        if (renderer && container) {
            // Corrects positions, occurs with tooltip positioner (#16944)
            if (options.positioner) {
                pos.x += left - distance;
                pos.y += top - distance;
            }
            // Pad it by the border width and distance. Add 2 to make room for
            // the default shadow (#19314).
            pad = (options.borderWidth || 0) + 2 * distance + 2;
            renderer.setSize(width + pad, height + pad, false);
            // Anchor and tooltip container need scaling if chart container has
            // scale transform/css zoom. #11329.
            if (scaleX !== 1 || scaleY !== 1) {
                css(container, {
                    transform: `scale(${scaleX}, ${scaleY})`
                });
                anchorX *= scaleX;
                anchorY *= scaleY;
            }
            anchorX += left - pos.x;
            anchorY += top - pos.y;
        }
        // Do the move
        this.move(Math.round(pos.x), Math.round(pos.y || 0), // Can be undefined (#3977)
        anchorX, anchorY);
    }
}
/* *
 *
 *  Class namespace
 *
 * */
(function (Tooltip) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    function compose(PointerClass) {
        if (pushUnique(composed, compose)) {
            addEvent(PointerClass, 'afterInit', function () {
                const chart = this.chart;
                if (chart.options.tooltip) {
                    /**
                     * Tooltip object for points of series.
                     *
                     * @name Highcharts.Chart#tooltip
                     * @type {Highcharts.Tooltip}
                     */
                    chart.tooltip = new Tooltip(chart, chart.options.tooltip);
                }
            });
        }
    }
    Tooltip.compose = compose;
})(Tooltip || (Tooltip = {}));
/* *
 *
 *  Default export
 *
 * */
export default Tooltip;
/* *
 *
 *  API Declarations
 *
 * */
/**
 * Callback function to format the text of the tooltip from scratch.
 *
 * In case of single or shared tooltips, a string should be be returned. In case
 * of splitted tooltips, it should return an array where the first item is the
 * header, and subsequent items are mapped to the points. Return `false` to
 * disable tooltip for a specific point on series.
 *
 * @callback Highcharts.TooltipFormatterCallbackFunction
 *
 * @param {Highcharts.TooltipFormatterContextObject} this
 * Context to format
 *
 * @param {Highcharts.Tooltip} tooltip
 * The tooltip instance
 *
 * @return {false|string|Array<(string|null|undefined)>|null|undefined}
 * Formatted text or false
 */
/**
 * Configuration for the tooltip formatters.
 *
 * @interface Highcharts.TooltipFormatterContextObject
 * @extends Highcharts.PointLabelObject
 */ /**
* Array of points in shared tooltips.
* @name Highcharts.TooltipFormatterContextObject#points
* @type {Array<Highcharts.TooltipFormatterContextObject>|undefined}
*/
/**
 * A callback function to place the tooltip in a specific position.
 *
 * @callback Highcharts.TooltipPositionerCallbackFunction
 *
 * @param {Highcharts.Tooltip} this
 * Tooltip context of the callback.
 *
 * @param {number} labelWidth
 * Width of the tooltip.
 *
 * @param {number} labelHeight
 * Height of the tooltip.
 *
 * @param {Highcharts.TooltipPositionerPointObject} point
 * Point information for positioning a tooltip.
 *
 * @return {Highcharts.PositionObject}
 * New position for the tooltip.
 */
/**
 * Point information for positioning a tooltip.
 *
 * @interface Highcharts.TooltipPositionerPointObject
 * @extends Highcharts.Point
 */ /**
* If `tooltip.split` option is enabled and positioner is called for each of the
* boxes separately, this property indicates the call on the xAxis header, which
* is not a point itself.
* @name Highcharts.TooltipPositionerPointObject#isHeader
* @type {boolean}
*/ /**
* The reference point relative to the plot area. Add chart.plotLeft to get the
* full coordinates.
* @name Highcharts.TooltipPositionerPointObject#plotX
* @type {number}
*/ /**
* The reference point relative to the plot area. Add chart.plotTop to get the
* full coordinates.
* @name Highcharts.TooltipPositionerPointObject#plotY
* @type {number}
*/
/**
 * @typedef {"callout"|"circle"|"rect"} Highcharts.TooltipShapeValue
 */
''; // keeps doclets above in JS file
