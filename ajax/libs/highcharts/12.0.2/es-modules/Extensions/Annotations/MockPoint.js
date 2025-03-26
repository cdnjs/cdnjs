/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { series: { prototype: seriesProto } } = SeriesRegistry;
import U from '../../Core/Utilities.js';
const { defined, fireEvent } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * A trimmed point object which imitates {@link Highchart.Point} class. It is
 * created when there is a need of pointing to some chart's position using axis
 * values or pixel values
 *
 * @requires modules/annotations
 *
 * @private
 * @class
 * @name Highcharts.AnnotationMockPoint
 *
 * @hideconstructor
 *
 * @param {Highcharts.Chart} chart
 * The chart instance.
 *
 * @param {Highcharts.AnnotationControllable|null} target
 * The related controllable.
 *
 * @param {Highcharts.AnnotationMockPointOptionsObject|Function} options
 * The options object.
 */
class MockPoint {
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * Create a mock point from a real Highcharts point.
     *
     * @private
     * @static
     *
     * @param {Highcharts.Point} point
     *
     * @return {Highcharts.AnnotationMockPoint}
     * A mock point instance.
     */
    static fromPoint(point) {
        return new MockPoint(point.series.chart, null, {
            x: point.x,
            y: point.y,
            xAxis: point.series.xAxis,
            yAxis: point.series.yAxis
        });
    }
    /**
     * Get the pixel position from the point like object.
     *
     * @private
     * @static
     *
     * @param {Highcharts.AnnotationPointType} point
     *
     * @param {boolean} [paneCoordinates]
     *        Whether the pixel position should be relative
     *
     * @return {Highcharts.PositionObject} pixel position
     */
    static pointToPixels(point, paneCoordinates) {
        const series = point.series, chart = series.chart;
        let x = point.plotX || 0, y = point.plotY || 0, plotBox;
        if (chart.inverted) {
            if (point.mock) {
                x = point.plotY;
                y = point.plotX;
            }
            else {
                x = chart.plotWidth - (point.plotY || 0);
                y = chart.plotHeight - (point.plotX || 0);
            }
        }
        if (series && !paneCoordinates) {
            plotBox = series.getPlotBox();
            x += plotBox.translateX;
            y += plotBox.translateY;
        }
        return {
            x: x,
            y: y
        };
    }
    /**
     * Get fresh mock point options from the point like object.
     *
     * @private
     * @static
     *
     * @param {Highcharts.AnnotationPointType} point
     *
     * @return {Highcharts.AnnotationMockPointOptionsObject}
     * A mock point's options.
     */
    static pointToOptions(point) {
        return {
            x: point.x,
            y: point.y,
            xAxis: point.series.xAxis,
            yAxis: point.series.yAxis
        };
    }
    /* *
     *
     *  Constructor
     *
     * */
    constructor(chart, target, options) {
        /* *
         *
         * Functions
         *
         * */
        /**
         * A flag indicating that a point is not the real one.
         *
         * @type {boolean}
         * @default true
         */
        this.mock = true;
        // Circular reference for formats and formatters
        this.point = this;
        /**
         * A mock series instance imitating a real series from a real point.
         *
         * @name Annotation.AnnotationMockPoint#series
         * @type {Highcharts.AnnotationMockSeries}
         */
        this.series = {
            visible: true,
            chart: chart,
            getPlotBox: seriesProto.getPlotBox
        };
        /**
         * @name Annotation.AnnotationMockPoint#target
         * @type {Highcharts.AnnotationControllable|null}
         */
        this.target = target || null;
        /**
         * Options for the mock point.
         *
         * @name Annotation.AnnotationMockPoint#options
         * @type {Highcharts.AnnotationsMockPointOptionsObject}
         */
        this.options = options;
        /**
         * If an xAxis is set it represents the point's value in terms of the
         * xAxis.
         *
         * @name Annotation.AnnotationMockPoint#x
         * @type {number|undefined}
         */
        /**
         * If an yAxis is set it represents the point's value in terms of the
         * yAxis.
         *
         * @name Annotation.AnnotationMockPoint#y
         * @type {number|undefined}
         */
        /**
         * It represents the point's pixel x coordinate relative to its plot
         * box.
         *
         * @name Annotation.AnnotationMockPoint#plotX
         * @type {number|undefined}
         */
        /**
         * It represents the point's pixel y position relative to its plot box.
         *
         * @name Annotation.AnnotationMockPoint#plotY
         * @type {number|undefined}
         */
        /**
         * Whether the point is inside the plot box.
         *
         * @name Annotation.AnnotationMockPoint#isInside
         * @type {boolean|undefined}
         */
        this.applyOptions(this.getOptions());
    }
    /**
     * Apply options for the point.
     * @private
     * @param {Highcharts.AnnotationMockPointOptionsObject} options
     */
    applyOptions(options) {
        this.command = options.command;
        this.setAxis(options, 'x');
        this.setAxis(options, 'y');
        this.refresh();
    }
    /**
     * Get the point's options.
     * @private
     * @return {Highcharts.AnnotationMockPointOptionsObject}
     * The mock point's options.
     */
    getOptions() {
        return this.hasDynamicOptions() ?
            this.options(this.target) :
            this.options;
    }
    /**
     * Check if the point has dynamic options.
     * @private
     * @return {boolean}
     * A positive flag if the point has dynamic options.
     */
    hasDynamicOptions() {
        return typeof this.options === 'function';
    }
    /**
     * Check if the point is inside its pane.
     * @private
     * @return {boolean} A flag indicating whether the point is inside the pane.
     */
    isInsidePlot() {
        const plotX = this.plotX, plotY = this.plotY, xAxis = this.series.xAxis, yAxis = this.series.yAxis, e = {
            x: plotX,
            y: plotY,
            isInsidePlot: true,
            options: {}
        };
        if (xAxis) {
            e.isInsidePlot = defined(plotX) && plotX >= 0 && plotX <= xAxis.len;
        }
        if (yAxis) {
            e.isInsidePlot =
                e.isInsidePlot &&
                    defined(plotY) &&
                    plotY >= 0 && plotY <= yAxis.len;
        }
        fireEvent(this.series.chart, 'afterIsInsidePlot', e);
        return e.isInsidePlot;
    }
    /**
     * Refresh point values and coordinates based on its options.
     * @private
     */
    refresh() {
        const series = this.series, xAxis = series.xAxis, yAxis = series.yAxis, options = this.getOptions();
        if (xAxis) {
            this.x = options.x;
            this.plotX = xAxis.toPixels(options.x, true);
        }
        else {
            this.x = void 0;
            this.plotX = options.x;
        }
        if (yAxis) {
            this.y = options.y;
            this.plotY = yAxis.toPixels(options.y, true);
        }
        else {
            this.y = null;
            this.plotY = options.y;
        }
        this.isInside = this.isInsidePlot();
    }
    /**
     * Refresh point options based on its plot coordinates.
     * @private
     */
    refreshOptions() {
        const series = this.series, xAxis = series.xAxis, yAxis = series.yAxis;
        this.x = this.options.x = xAxis ?
            this.options.x = xAxis.toValue(this.plotX, true) :
            this.plotX;
        this.y = this.options.y = yAxis ?
            yAxis.toValue(this.plotY, true) :
            this.plotY;
    }
    /**
     * Rotate the point.
     * @private
     * @param {number} cx origin x rotation
     * @param {number} cy origin y rotation
     * @param {number} radians
     */
    rotate(cx, cy, radians) {
        if (!this.hasDynamicOptions()) {
            const cos = Math.cos(radians), sin = Math.sin(radians), x = this.plotX - cx, y = this.plotY - cy, tx = x * cos - y * sin, ty = x * sin + y * cos;
            this.plotX = tx + cx;
            this.plotY = ty + cy;
            this.refreshOptions();
        }
    }
    /**
     * Scale the point.
     *
     * @private
     *
     * @param {number} cx
     * Origin x transformation.
     *
     * @param {number} cy
     * Origin y transformation.
     *
     * @param {number} sx
     * Scale factor x.
     *
     * @param {number} sy
     * Scale factor y.
     */
    scale(cx, cy, sx, sy) {
        if (!this.hasDynamicOptions()) {
            const x = this.plotX * sx, y = this.plotY * sy, tx = (1 - sx) * cx, ty = (1 - sy) * cy;
            this.plotX = tx + x;
            this.plotY = ty + y;
            this.refreshOptions();
        }
    }
    /**
     * Set x or y axis.
     * @private
     * @param {Highcharts.AnnotationMockPointOptionsObject} options
     * @param {string} xOrY
     * 'x' or 'y' string literal
     */
    setAxis(options, xOrY) {
        const axisName = (xOrY + 'Axis'), axisOptions = options[axisName], chart = this.series.chart;
        this.series[axisName] =
            typeof axisOptions === 'object' ?
                axisOptions :
                defined(axisOptions) ?
                    (chart[axisName][axisOptions] ||
                        // @todo v--- (axisName)[axisOptions] ?
                        chart.get(axisOptions)) :
                    null;
    }
    /**
     * Transform the mock point to an anchor (relative position on the chart).
     * @private
     * @return {Array<number>}
     * A quadruple of numbers which denotes x, y, width and height of the box
     **/
    toAnchor() {
        const anchor = [this.plotX, this.plotY, 0, 0];
        if (this.series.chart.inverted) {
            anchor[0] = this.plotY;
            anchor[1] = this.plotX;
        }
        return anchor;
    }
    /**
     * Translate the point.
     *
     * @private
     *
     * @param {number|undefined} cx
     * Origin x transformation.
     *
     * @param {number|undefined} cy
     * Origin y transformation.
     *
     * @param {number} dx
     * Translation for x coordinate.
     *
     * @param {number} dy
     * Translation for y coordinate.
     **/
    translate(_cx, _cy, dx, dy) {
        if (!this.hasDynamicOptions()) {
            this.plotX += dx;
            this.plotY += dy;
            this.refreshOptions();
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default MockPoint;
/* *
 *
 *  API Declarations
 *
 * */
/**
 * @private
 * @interface Highcharts.AnnotationMockLabelOptionsObject
 */ /**
* Point instance of the point.
* @name Highcharts.AnnotationMockLabelOptionsObject#point
* @type {Highcharts.AnnotationMockPoint}
*/ /**
* X value translated to x axis scale.
* @name Highcharts.AnnotationMockLabelOptionsObject#x
* @type {number|null}
*/ /**
* Y value translated to y axis scale.
* @name Highcharts.AnnotationMockLabelOptionsObject#y
* @type {number|null}
*/
/**
 * Object of shape point.
 *
 * @interface Highcharts.AnnotationMockPointOptionsObject
 */ /**
* The x position of the point. Units can be either in axis
* or chart pixel coordinates.
*
* @type      {number}
* @name      Highcharts.AnnotationMockPointOptionsObject.x
*/ /**
* The y position of the point. Units can be either in axis
* or chart pixel coordinates.
*
* @type      {number}
* @name      Highcharts.AnnotationMockPointOptionsObject.y
*/ /**
* This number defines which xAxis the point is connected to.
* It refers to either the axis id or the index of the axis in
* the xAxis array. If the option is not configured or the axis
* is not found the point's x coordinate refers to the chart
* pixels.
*
* @type      {number|string|null}
* @name      Highcharts.AnnotationMockPointOptionsObject.xAxis
*/ /**
* This number defines which yAxis the point is connected to.
* It refers to either the axis id or the index of the axis in
* the yAxis array. If the option is not configured or the axis
* is not found the point's y coordinate refers to the chart
* pixels.
*
* @type      {number|string|null}
* @name      Highcharts.AnnotationMockPointOptionsObject.yAxis
*/
/**
 * Callback function that returns the annotation shape point.
 *
 * @callback Highcharts.AnnotationMockPointFunction
 *
 * @param  {Highcharts.Annotation} annotation
 *         An annotation instance.
 *
 * @return {Highcharts.AnnotationMockPointOptionsObject}
 *         Annotations shape point.
 */
/**
 * A mock series instance imitating a real series from a real point.
 * @private
 * @interface Highcharts.AnnotationMockSeries
 */ /**
* Whether a series is visible.
* @name Highcharts.AnnotationMockSeries#visible
* @type {boolean}
*/ /**
* A chart instance.
* @name Highcharts.AnnotationMockSeries#chart
* @type {Highcharts.Chart}
*/ /**
* @name Highcharts.AnnotationMockSeries#getPlotBox
* @type {Function}
*/
/**
 * Indicates if this is a mock point for an annotation.
 * @name Highcharts.Point#mock
 * @type {boolean|undefined}
 */
(''); // Keeps doclets above in JS file
