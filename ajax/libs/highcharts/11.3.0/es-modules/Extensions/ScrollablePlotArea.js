/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Highcharts feature to make the Y axis stay fixed when scrolling the chart
 *  horizontally on mobile devices. Supports left and right side axes.
 */
/*
WIP on vertical scrollable plot area (#9378). To do:
- Bottom axis positioning
- Test with Gantt
- Look for size optimizing the code
- API and demos
 */
'use strict';
import A from '../Core/Animation/AnimationUtilities.js';
const { stop } = A;
import H from '../Core/Globals.js';
const { composed } = H;
import RendererRegistry from '../Core/Renderer/RendererRegistry.js';
import U from '../Core/Utilities.js';
const { addEvent, createElement, css, defined, extend, merge, pick, pushUnique } = U;
/* *
 *
 *  Functions
 *
 * */
/** @private */
function chartApplyFixed() {
    const { axisOffset, chartWidth, chartHeight, container, plotHeight, plotLeft, plotTop, plotWidth, scrollablePixelsX = 0, scrollablePixelsY = 0, scrollingContainer } = this, firstTime = !this.fixedDiv, chartOptions = this.options.chart, scrollableOptions = chartOptions.scrollablePlotArea, { scrollPositionX, scrollPositionY } = scrollableOptions, Renderer = RendererRegistry.getRendererType();
    let { fixedRenderer } = this;
    // First render
    if (!fixedRenderer) {
        this.fixedDiv = createElement('div', {
            className: 'highcharts-fixed'
        }, {
            position: 'absolute',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: (chartOptions.style?.zIndex || 0) + 2,
            top: 0
        }, void 0, true);
        scrollingContainer?.parentNode.insertBefore(this.fixedDiv, scrollingContainer);
        css(this.renderTo, { overflow: 'visible' });
        this.fixedRenderer = fixedRenderer = new Renderer(this.fixedDiv, chartWidth, chartHeight, chartOptions.style);
        // Mask
        this.scrollableMask = fixedRenderer
            .path()
            .attr({
            fill: chartOptions.backgroundColor || '#fff',
            'fill-opacity': pick(scrollableOptions.opacity, 0.85),
            zIndex: -1
        })
            .addClass('highcharts-scrollable-mask')
            .add();
        addEvent(this, 'afterShowResetZoom', this.moveFixedElements);
        addEvent(this, 'afterApplyDrilldown', this.moveFixedElements);
        addEvent(this, 'afterLayOutTitles', this.moveFixedElements);
    }
    else {
        // Set the size of the fixed renderer to the visible width
        fixedRenderer.setSize(chartWidth, chartHeight);
    }
    if (this.scrollableDirty || firstTime) {
        this.scrollableDirty = false;
        this.moveFixedElements();
    }
    // Increase the size of the scrollable renderer and background
    const scrollableWidth = chartWidth + scrollablePixelsX, scrollableHeight = chartHeight + scrollablePixelsY;
    stop(this.container);
    css(container, {
        width: `${scrollableWidth}px`,
        height: `${scrollableHeight}px`
    });
    this.renderer.boxWrapper.attr({
        width: scrollableWidth,
        height: scrollableHeight,
        viewBox: [0, 0, scrollableWidth, scrollableHeight].join(' ')
    });
    this.chartBackground?.attr({
        width: scrollableWidth,
        height: scrollableHeight
    });
    if (scrollingContainer) {
        css(scrollingContainer, {
            width: `${this.chartWidth}px`,
            height: `${this.chartHeight}px`
        });
        // Set scroll position
        if (firstTime) {
            if (scrollPositionX) {
                scrollingContainer.scrollLeft =
                    scrollablePixelsX * scrollPositionX;
            }
            if (scrollPositionY) {
                scrollingContainer.scrollTop =
                    scrollablePixelsY * scrollPositionY;
            }
        }
    }
    // Mask behind the left and right side
    const maskTop = plotTop - axisOffset[0] - 1, maskLeft = plotLeft - axisOffset[3] - 1, maskBottom = plotTop + plotHeight + axisOffset[2] + 1, maskRight = plotLeft + plotWidth + axisOffset[1] + 1, maskPlotRight = plotLeft + plotWidth - scrollablePixelsX, maskPlotBottom = plotTop + plotHeight - scrollablePixelsY;
    let d;
    if (scrollablePixelsX) {
        d = [
            // Left side
            ['M', 0, maskTop],
            ['L', plotLeft - 1, maskTop],
            ['L', plotLeft - 1, maskBottom],
            ['L', 0, maskBottom],
            ['Z'],
            // Right side
            ['M', maskPlotRight, maskTop],
            ['L', chartWidth, maskTop],
            ['L', chartWidth, maskBottom],
            ['L', maskPlotRight, maskBottom],
            ['Z']
        ];
    }
    else if (scrollablePixelsY) {
        d = [
            // Top side
            ['M', maskLeft, 0],
            ['L', maskLeft, plotTop - 1],
            ['L', maskRight, plotTop - 1],
            ['L', maskRight, 0],
            ['Z'],
            // Bottom side
            ['M', maskLeft, maskPlotBottom],
            ['L', maskLeft, chartHeight],
            ['L', maskRight, chartHeight],
            ['L', maskRight, maskPlotBottom],
            ['Z']
        ];
    }
    else {
        d = [['M', 0, 0]];
    }
    if (this.redrawTrigger !== 'adjustHeight') {
        this.scrollableMask?.attr({ d });
    }
}
/**
 * These elements are moved over to the fixed renderer and stay fixed when the
 * user scrolls the chart
 * @private
 */
function chartMoveFixedElements() {
    const container = this.container, fixedRenderer = this.fixedRenderer, fixedSelectors = [
        '.highcharts-breadcrumbs-group',
        '.highcharts-contextbutton',
        '.highcharts-caption',
        '.highcharts-credits',
        '.highcharts-legend',
        '.highcharts-legend-checkbox',
        '.highcharts-navigator-series',
        '.highcharts-navigator-xaxis',
        '.highcharts-navigator-yaxis',
        '.highcharts-navigator',
        '.highcharts-reset-zoom',
        '.highcharts-drillup-button',
        '.highcharts-scrollbar',
        '.highcharts-subtitle',
        '.highcharts-title'
    ];
    let axisClass;
    if (this.scrollablePixelsX && !this.inverted) {
        axisClass = '.highcharts-yaxis';
    }
    else if (this.scrollablePixelsX && this.inverted) {
        axisClass = '.highcharts-xaxis';
    }
    else if (this.scrollablePixelsY && !this.inverted) {
        axisClass = '.highcharts-xaxis';
    }
    else if (this.scrollablePixelsY && this.inverted) {
        axisClass = '.highcharts-yaxis';
    }
    if (axisClass) {
        fixedSelectors.push(`${axisClass}:not(.highcharts-radial-axis)`, `${axisClass}-labels:not(.highcharts-radial-axis-labels)`);
    }
    for (const className of fixedSelectors) {
        [].forEach.call(container.querySelectorAll(className), (elem) => {
            (elem.namespaceURI === fixedRenderer.SVG_NS ?
                fixedRenderer.box :
                fixedRenderer.box.parentNode).appendChild(elem);
            elem.style.pointerEvents = 'auto';
        });
    }
}
/** @private */
function chartSetUpScrolling() {
    const css = {
        WebkitOverflowScrolling: 'touch',
        overflowX: 'hidden',
        overflowY: 'hidden'
    };
    if (this.scrollablePixelsX) {
        css.overflowX = 'auto';
    }
    if (this.scrollablePixelsY) {
        css.overflowY = 'auto';
    }
    // Insert a container with position relative
    // that scrolling and fixed container renders to (#10555)
    this.scrollingParent = createElement('div', {
        className: 'highcharts-scrolling-parent'
    }, {
        position: 'relative'
    }, this.renderTo);
    // Add the necessary divs to provide scrolling
    this.scrollingContainer = createElement('div', {
        'className': 'highcharts-scrolling'
    }, css, this.scrollingParent);
    // On scroll, reset the chart position because it applies to the scrolled
    // container
    let lastHoverPoint;
    addEvent(this.scrollingContainer, 'scroll', () => {
        if (this.pointer) {
            delete this.pointer.chartPosition;
            if (this.hoverPoint) {
                lastHoverPoint = this.hoverPoint;
            }
            this.pointer.runPointActions(void 0, lastHoverPoint, true);
        }
    });
    this.innerContainer = createElement('div', {
        'className': 'highcharts-inner-container'
    }, null, this.scrollingContainer);
    // Now move the container inside
    this.innerContainer.appendChild(this.container);
    // Don't run again
    this.setUpScrolling = null;
}
/** @private */
function compose(AxisClass, ChartClass, SeriesClass) {
    if (pushUnique(composed, compose)) {
        addEvent(AxisClass, 'afterInit', onAxisAfterInit);
        extend(ChartClass.prototype, {
            applyFixed: chartApplyFixed,
            moveFixedElements: chartMoveFixedElements,
            setUpScrolling: chartSetUpScrolling
        });
        addEvent(ChartClass, 'afterSetChartSize', onChartAfterSetChartSize);
        addEvent(ChartClass, 'render', onChartRender);
        addEvent(SeriesClass, 'show', onSeriesShow);
    }
}
/** @private */
function onAxisAfterInit() {
    this.chart.scrollableDirty = true;
}
/** @private */
function onChartAfterSetChartSize(e) {
    const scrollablePlotArea = this.options.chart.scrollablePlotArea, scrollableMinWidth = scrollablePlotArea && scrollablePlotArea.minWidth, scrollableMinHeight = scrollablePlotArea && scrollablePlotArea.minHeight;
    let scrollablePixelsX, scrollablePixelsY, corrections;
    if (!this.renderer.forExport) {
        // The amount of pixels to scroll, the difference between chart
        // width and scrollable width
        if (scrollableMinWidth) {
            this.scrollablePixelsX = scrollablePixelsX = Math.max(0, scrollableMinWidth - this.chartWidth);
            if (scrollablePixelsX) {
                this.scrollablePlotBox = (this.renderer.scrollablePlotBox = merge(this.plotBox));
                this.plotBox.width = this.plotWidth += scrollablePixelsX;
                if (this.inverted) {
                    this.clipBox.height += scrollablePixelsX;
                }
                else {
                    this.clipBox.width += scrollablePixelsX;
                }
                corrections = {
                    // Corrections for right side
                    1: { name: 'right', value: scrollablePixelsX }
                };
            }
            // Currently we can only do either X or Y
        }
        else if (scrollableMinHeight) {
            this.scrollablePixelsY = scrollablePixelsY = Math.max(0, scrollableMinHeight - this.chartHeight);
            if (defined(scrollablePixelsY)) {
                this.scrollablePlotBox = (this.renderer.scrollablePlotBox = merge(this.plotBox));
                this.plotBox.height = this.plotHeight += scrollablePixelsY;
                if (this.inverted) {
                    this.clipBox.width += scrollablePixelsY;
                }
                else {
                    this.clipBox.height += scrollablePixelsY;
                }
                corrections = {
                    2: { name: 'bottom', value: scrollablePixelsY }
                };
            }
        }
        if (corrections && !e.skipAxes) {
            for (const axis of this.axes) {
                // For right and bottom axes, only fix the plot line length
                if (corrections[axis.side]) {
                    const originalGetPlotLinePath = axis.getPlotLinePath;
                    // Get the plot lines right in getPlotLinePath,
                    // temporarily set it to the adjusted plot width.
                    // eslint-disable-next-line no-loop-func
                    axis.getPlotLinePath = function () {
                        const marginName = corrections[axis.side].name, correctionValue = corrections[axis.side].value, 
                        // axis.right or axis.bottom
                        margin = this[marginName];
                        // Temporarily adjust
                        this[marginName] = margin - correctionValue;
                        const path = originalGetPlotLinePath.apply(this, arguments);
                        // Reset
                        this[marginName] = margin;
                        return path;
                    };
                }
                else {
                    // Apply the corrected plotWidth
                    axis.setAxisSize();
                    axis.setAxisTranslation();
                }
            }
        }
    }
}
/** @private */
function onChartRender() {
    if (this.scrollablePixelsX || this.scrollablePixelsY) {
        if (this.setUpScrolling) {
            this.setUpScrolling();
        }
        this.applyFixed();
    }
    else if (this.fixedDiv) { // Has been in scrollable mode
        this.applyFixed();
    }
}
/** @private */
function onSeriesShow() {
    this.chart.scrollableDirty = true;
}
/* *
 *
 *  Default Export
 *
 * */
const ScrollablePlotArea = {
    compose
};
export default ScrollablePlotArea;
/* *
 *
 *  API Declarations
 *
 * */
/**
 * Options for a scrollable plot area. This feature provides a minimum size for
 * the plot area of the chart. If the size gets smaller than this, typically
 * on mobile devices, a native browser scrollbar is presented. This scrollbar
 * provides smooth scrolling for the contents of the plot area, whereas the
 * title, legend and unaffected axes are fixed.
 *
 * Since v7.1.2, a scrollable plot area can be defined for either horizontal or
 * vertical scrolling, depending on whether the `minWidth` or `minHeight`
 * option is set.
 *
 * @sample highcharts/chart/scrollable-plotarea
 *         Scrollable plot area
 * @sample highcharts/chart/scrollable-plotarea-vertical
 *         Vertically scrollable plot area
 * @sample {gantt} gantt/chart/scrollable-plotarea-vertical
 *         Gantt chart with vertically scrollable plot area
 *
 * @since     6.1.0
 * @product   highcharts gantt
 * @apioption chart.scrollablePlotArea
 */
/**
 * The minimum height for the plot area. If it gets smaller than this, the plot
 * area will become scrollable.
 *
 * @type      {number}
 * @since     7.1.2
 * @apioption chart.scrollablePlotArea.minHeight
 */
/**
 * The minimum width for the plot area. If it gets smaller than this, the plot
 * area will become scrollable.
 *
 * @type      {number}
 * @since     6.1.0
 * @apioption chart.scrollablePlotArea.minWidth
 */
/**
 * The initial scrolling position of the scrollable plot area. Ranges from 0 to
 * 1, where 0 aligns the plot area to the left and 1 aligns it to the right.
 * Typically we would use 1 if the chart has right aligned Y axes.
 *
 * @type      {number}
 * @since     6.1.0
 * @apioption chart.scrollablePlotArea.scrollPositionX
 */
/**
 * The initial scrolling position of the scrollable plot area. Ranges from 0 to
 * 1, where 0 aligns the plot area to the top and 1 aligns it to the bottom.
 *
 * @type      {number}
 * @since     7.1.2
 * @apioption chart.scrollablePlotArea.scrollPositionY
 */
/**
 * The opacity of mask applied on one of the sides of the plot
 * area.
 *
 * @sample {highcharts} highcharts/chart/scrollable-plotarea-opacity
 *         Disabled opacity for the mask
 *
 * @type        {number}
 * @default     0.85
 * @since       7.1.1
 * @apioption   chart.scrollablePlotArea.opacity
 */
(''); // keep doclets above in transpiled file
