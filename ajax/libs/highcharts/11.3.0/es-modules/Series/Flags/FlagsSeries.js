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
import FlagsPoint from './FlagsPoint.js';
import FlagsSeriesDefaults from './FlagsSeriesDefaults.js';
import FlagsSymbols from './FlagsSymbols.js';
import H from '../../Core/Globals.js';
const { noop } = H;
import OnSeriesComposition from '../OnSeriesComposition.js';
import R from '../../Core/Renderer/RendererUtilities.js';
const { distribute } = R;
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { series: Series, seriesTypes: { column: ColumnSeries } } = SeriesRegistry;
import SVGElement from '../../Core/Renderer/SVG/SVGElement.js';
import U from '../../Core/Utilities.js';
const { addEvent, defined, extend, merge, objectEach, wrap } = U;
/* *
 *
 *  Classes
 *
 * */
/**
 * The Flags series.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.flags
 *
 * @augments Highcharts.Series
 */
class FlagsSeries extends ColumnSeries {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Disable animation, but keep clipping (#8546).
     * @private
     */
    animate(init) {
        if (init) {
            this.setClip();
        }
    }
    /**
     * Draw the markers.
     * @private
     */
    drawPoints() {
        const series = this, points = series.points, chart = series.chart, renderer = chart.renderer, inverted = chart.inverted, options = series.options, optionsY = options.y, yAxis = series.yAxis, boxesMap = {}, boxes = [];
        let plotX, plotY, shape, i, point, graphic, stackIndex, anchorY, attribs, outsideRight, centered;
        i = points.length;
        while (i--) {
            point = points[i];
            outsideRight =
                (inverted ? point.plotY : point.plotX) >
                    series.xAxis.len;
            plotX = point.plotX;
            stackIndex = point.stackIndex;
            shape = point.options.shape || options.shape;
            plotY = point.plotY;
            if (typeof plotY !== 'undefined') {
                plotY = point.plotY + optionsY -
                    (typeof stackIndex !== 'undefined' &&
                        (stackIndex * options.stackDistance));
            }
            // skip connectors for higher level stacked points
            point.anchorX = stackIndex ? void 0 : point.plotX;
            anchorY = stackIndex ? void 0 : point.plotY;
            centered = shape !== 'flag';
            graphic = point.graphic;
            // Only draw the point if y is defined and the flag is within
            // the visible area
            if (typeof plotY !== 'undefined' &&
                plotX >= 0 &&
                !outsideRight) {
                // #15384
                if (graphic && point.hasNewShapeType()) {
                    graphic = graphic.destroy();
                }
                // Create the flag
                if (!graphic) {
                    graphic = point.graphic = renderer.label('', null, null, shape, null, null, options.useHTML)
                        .addClass('highcharts-point')
                        .add(series.markerGroup);
                    // Add reference to the point for tracker (#6303)
                    if (point.graphic.div) {
                        point.graphic.div.point = point;
                    }
                    graphic.isNew = true;
                }
                graphic.attr({
                    align: centered ? 'center' : 'left',
                    width: options.width,
                    height: options.height,
                    'text-align': options.textAlign
                });
                if (!chart.styledMode) {
                    graphic
                        .attr(series.pointAttribs(point))
                        .css(merge(options.style, point.style))
                        .shadow(options.shadow);
                }
                if (plotX > 0) { // #3119
                    plotX -= graphic.strokeWidth() % 2; // #4285
                }
                // Plant the flag
                attribs = {
                    y: plotY,
                    anchorY: anchorY
                };
                if (options.allowOverlapX) {
                    attribs.x = plotX;
                    attribs.anchorX = point.anchorX;
                }
                graphic.attr({
                    text: point.options.title || options.title || 'A'
                })[graphic.isNew ? 'attr' : 'animate'](attribs);
                // Rig for the distribute function
                if (!options.allowOverlapX) {
                    if (!boxesMap[point.plotX]) {
                        boxesMap[point.plotX] = {
                            align: centered ? 0.5 : 0,
                            size: graphic.width || 0,
                            target: plotX,
                            anchorX: plotX
                        };
                    }
                    else {
                        boxesMap[point.plotX].size = Math.max(boxesMap[point.plotX].size, graphic.width || 0);
                    }
                }
                // Set the tooltip anchor position
                point.tooltipPos = [
                    plotX,
                    plotY + yAxis.pos - chart.plotTop
                ]; // #6327
            }
            else if (graphic) {
                point.graphic = graphic.destroy();
            }
        }
        // Handle X-dimension overlapping
        if (!options.allowOverlapX) {
            let maxDistance = 100;
            objectEach(boxesMap, function (box) {
                box.plotX = box.anchorX;
                boxes.push(box);
                maxDistance = Math.max(box.size, maxDistance);
            });
            // If necessary (for overlapping or long labels)  distribute it
            // depending on the label width or a hardcoded value, #16041.
            distribute(boxes, inverted ? yAxis.len : this.xAxis.len, maxDistance);
            for (const point of points) {
                const plotX = point.plotX, graphic = point.graphic, box = graphic && boxesMap[plotX];
                if (box && graphic) {
                    // Hide flag when its box position is not specified
                    // (#8573, #9299)
                    if (!defined(box.pos)) {
                        graphic.hide().isNew = true;
                    }
                    else {
                        graphic[graphic.isNew ? 'attr' : 'animate']({
                            x: box.pos + (box.align || 0) * box.size,
                            anchorX: point.anchorX
                        }).show().isNew = false;
                    }
                }
            }
        }
        // Can be a mix of SVG and HTML and we need events for both (#6303)
        if (options.useHTML && series.markerGroup) {
            wrap(series.markerGroup, 'on', function (proceed) {
                return SVGElement.prototype.on.apply(
                // for HTML
                // eslint-disable-next-line no-invalid-this
                proceed.apply(this, [].slice.call(arguments, 1)), 
                // and for SVG
                [].slice.call(arguments, 1));
            });
        }
    }
    /**
     * Extend the column trackers with listeners to expand and contract
     * stacks.
     * @private
     */
    drawTracker() {
        const series = this, points = series.points;
        super.drawTracker();
        /* *
        * Bring each stacked flag up on mouse over, this allows readability
        * of vertically stacked elements as well as tight points on the x
        * axis. #1924.
        */
        for (const point of points) {
            const graphic = point.graphic;
            if (graphic) {
                if (point.unbindMouseOver) {
                    point.unbindMouseOver();
                }
                point.unbindMouseOver = addEvent(graphic.element, 'mouseover', function () {
                    // Raise this point
                    if (point.stackIndex > 0 &&
                        !point.raised) {
                        point._y = graphic.y;
                        graphic.attr({
                            y: point._y - 8
                        });
                        point.raised = true;
                    }
                    // Revert other raised points
                    for (const otherPoint of points) {
                        if (otherPoint !== point &&
                            otherPoint.raised &&
                            otherPoint.graphic) {
                            otherPoint.graphic.attr({
                                y: otherPoint._y
                            });
                            otherPoint.raised = false;
                        }
                    }
                });
            }
        }
    }
    /**
     * Get presentational attributes
     * @private
     */
    pointAttribs(point, state) {
        const options = this.options, color = (point && point.color) || this.color;
        let lineColor = options.lineColor, lineWidth = (point && point.lineWidth), fill = (point && point.fillColor) || options.fillColor;
        if (state) {
            fill = options.states[state].fillColor;
            lineColor = options.states[state].lineColor;
            lineWidth = options.states[state].lineWidth;
        }
        return {
            fill: fill || color,
            stroke: lineColor || color,
            'stroke-width': lineWidth || options.lineWidth || 0
        };
    }
    /**
     * @private
     */
    setClip() {
        Series.prototype.setClip.apply(this, arguments);
        if (this.options.clip !== false &&
            this.sharedClipKey &&
            this.markerGroup) {
            this.markerGroup.clip(this.chart.sharedClips[this.sharedClipKey]);
        }
    }
}
/* *
 *
 *  Static Properties
 *
 * */
FlagsSeries.compose = FlagsSymbols.compose;
FlagsSeries.defaultOptions = merge(ColumnSeries.defaultOptions, FlagsSeriesDefaults);
OnSeriesComposition.compose(FlagsSeries);
extend(FlagsSeries.prototype, {
    allowDG: false,
    forceCrop: true,
    invertible: false,
    noSharedTooltip: true,
    pointClass: FlagsPoint,
    sorted: false,
    takeOrdinalPosition: false,
    trackerGroups: ['markerGroup'],
    buildKDTree: noop,
    /**
     * Inherit the initialization from base Series.
     * @private
     */
    init: Series.prototype.init
});
SeriesRegistry.registerSeriesType('flags', FlagsSeries);
/* *
 *
 *  Default Export
 *
 * */
export default FlagsSeries;
/* *
 *
 *  API Declarations
 *
 * */
/**
 * @typedef {"circlepin"|"flag"|"squarepin"} Highcharts.FlagsShapeValue
 */
''; // detach doclets above
