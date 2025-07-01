/* *
 *
 *  X-range series module
 *
 *  (c) 2010-2025 Torstein Honsi, Lars A. V. Cabrera
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { column: { prototype: { pointClass: ColumnPoint } } } = SeriesRegistry.seriesTypes;
import U from '../../Core/Utilities.js';
const { extend } = U;
/* *
 *
 *  Class
 *
 * */
class XRangePoint extends ColumnPoint {
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * Return color of a point based on its category.
     *
     * @private
     * @function getColorByCategory
     *
     * @param {object} series
     *        The series which the point belongs to.
     *
     * @param {object} point
     *        The point to calculate its color for.
     *
     * @return {object}
     *         Returns an object containing the properties color and colorIndex.
     */
    static getColorByCategory(series, point) {
        const colors = series.options.colors || series.chart.options.colors, colorCount = colors ?
            colors.length :
            series.chart.options.chart.colorCount, colorIndex = point.y % colorCount, color = colors?.[colorIndex];
        return {
            colorIndex: colorIndex,
            color: color
        };
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    resolveColor() {
        const series = this.series;
        if (series.options.colorByPoint && !this.options.color) {
            const colorByPoint = XRangePoint.getColorByCategory(series, this);
            if (!series.chart.styledMode) {
                this.color = colorByPoint.color;
            }
            if (!this.options.colorIndex) {
                this.colorIndex = colorByPoint.colorIndex;
            }
        }
        else {
            this.color = this.options.color || series.color;
        }
    }
    /**
     * Extend init to have y default to 0.
     *
     * @private
     */
    constructor(series, options) {
        super(series, options);
        if (!this.y) {
            this.y = 0;
        }
    }
    /**
     * Extend applyOptions to handle time strings for x2
     *
     * @private
     */
    applyOptions(options, x) {
        super.applyOptions(options, x);
        this.x2 = this.series.chart.time.parse(this.x2);
        this.isNull = !this.isValid?.();
        return this;
    }
    /**
     * @private
     */
    setState() {
        super.setState.apply(this, arguments);
        this.series.drawPoint(this, this.series.getAnimationVerb());
    }
    /**
     * @private
     */
    isValid() {
        return typeof this.x === 'number' &&
            typeof this.x2 === 'number';
    }
}
extend(XRangePoint.prototype, {
    ttBelow: false,
    tooltipDateKeys: ['x', 'x2']
});
/* *
 *
 *  Class Namespace
 *
 * */
/* *
 *
 *  Default Export
 *
 * */
export default XRangePoint;
/* *
 *
 *  API Declarations
 *
 * */
/**
 * The ending X value of the range point.
 * @name Highcharts.Point#x2
 * @type {number|undefined}
 * @requires modules/xrange
 */
/**
 * @interface Highcharts.PointOptionsObject in parts/Point.ts
 */ /**
* The ending X value of the range point.
* @name Highcharts.PointOptionsObject#x2
* @type {number|undefined}
* @requires modules/xrange
*/
(''); // Keeps doclets above in JS file
