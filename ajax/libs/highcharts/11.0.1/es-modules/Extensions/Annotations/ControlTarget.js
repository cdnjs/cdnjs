/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import ControlPoint from './ControlPoint.js';
import MockPoint from './MockPoint.js';
import U from '../../Core/Utilities.js';
/* *
 *
 *  Composition Namespace
 *
 * */
var ControlTarget;
(function (ControlTarget) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Constants
     *
     * */
    const composedMembers = [];
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Add control points.
     * @private
     */
    function addControlPoints() {
        const controlPoints = this.controlPoints, controlPointsOptions = this.options.controlPoints || [];
        controlPointsOptions.forEach((controlPointOptions, i) => {
            const options = U.merge(this.options.controlPointOptions, controlPointOptions);
            if (!options.index) {
                options.index = i;
            }
            controlPointsOptions[i] = options;
            controlPoints.push(new ControlPoint(this.chart, this, options));
        });
    }
    /**
     * Returns object which denotes anchor position - relative and absolute.
     * @private
     * @param {Highcharts.AnnotationPointType} point
     * An annotation point.
     *
     * @return {Highcharts.AnnotationAnchorObject}
     * An annotation anchor.
     */
    function anchor(point) {
        const plotBox = point.series.getPlotBox(), chart = point.series.chart, box = point.mock ?
            point.toAnchor() :
            chart.tooltip &&
                chart.tooltip.getAnchor.call({
                    chart: point.series.chart
                }, point) ||
                [0, 0, 0, 0], anchor = {
            x: box[0] + (this.options.x || 0),
            y: box[1] + (this.options.y || 0),
            height: box[2] || 0,
            width: box[3] || 0
        };
        return {
            relativePosition: anchor,
            absolutePosition: U.merge(anchor, {
                x: anchor.x + (point.mock ? plotBox.translateX : chart.plotLeft),
                y: anchor.y + (point.mock ? plotBox.translateY : chart.plotTop)
            })
        };
    }
    /**
     * Adds shared functions to be used with targets of ControlPoint.
     * @private
     */
    function compose(ControlTargetClass) {
        if (U.pushUnique(composedMembers, ControlTargetClass)) {
            U.merge(true, ControlTargetClass.prototype, {
                addControlPoints,
                anchor,
                destroyControlTarget,
                getPointsOptions,
                linkPoints,
                point,
                redrawControlPoints,
                renderControlPoints,
                transform,
                transformPoint,
                translate,
                translatePoint
            });
        }
    }
    ControlTarget.compose = compose;
    /**
     * Destroy control points.
     * @private
     */
    function destroyControlTarget() {
        this.controlPoints.forEach((controlPoint) => controlPoint.destroy());
        this.chart = null;
        this.controlPoints = null;
        this.points = null;
        this.options = null;
        if (this.annotation) {
            this.annotation = null;
        }
    }
    /**
     * Get the points options.
     * @private
     * @return {Array<Highcharts.PointOptionsObject>}
     * An array of points' options.
     */
    function getPointsOptions() {
        const options = this.options;
        return (options.points ||
            (options.point && U.splat(options.point)));
    }
    /**
     * Find point-like objects based on points options.
     * @private
     * @return {Array<Annotation.PointLike>}
     *         An array of point-like objects.
     */
    function linkPoints() {
        const pointsOptions = this.getPointsOptions(), points = this.points, len = (pointsOptions && pointsOptions.length) || 0;
        let i, point;
        for (i = 0; i < len; i++) {
            point = this.point(pointsOptions[i], points[i]);
            if (!point) {
                points.length = 0;
                return;
            }
            if (point.mock) {
                point.refresh();
            }
            points[i] = point;
        }
        return points;
    }
    /**
     * Map point's options to a point-like object.
     * @private
     * @param {string|Function|Highcharts.AnnotationMockPointOptionsObject|Highcharts.AnnotationPointType} pointOptions
     *        Point's options.
     * @param {Highcharts.AnnotationPointType} point
     *        A point-like instance.
     * @return {Highcharts.AnnotationPointType|null}
     *         If the point is found/set returns this point, otherwise null
     */
    function point(pointOptions, point) {
        if (pointOptions && pointOptions.series) {
            return pointOptions;
        }
        if (!point || point.series === null) {
            if (U.isObject(pointOptions)) {
                point = new MockPoint(this.chart, this, pointOptions);
            }
            else if (U.isString(pointOptions)) {
                point = this.chart.get(pointOptions) || null;
            }
            else if (typeof pointOptions === 'function') {
                const pointConfig = pointOptions.call(point, this);
                point = pointConfig.series ?
                    pointConfig :
                    new MockPoint(this.chart, this, pointOptions);
            }
        }
        return point;
    }
    /**
     * Redraw control points.
     * @private
     */
    function redrawControlPoints(animation) {
        this.controlPoints.forEach((controlPoint) => controlPoint.redraw(animation));
    }
    /**
     * Render controll points.
     * @private
     */
    function renderControlPoints() {
        this.controlPoints.forEach((controlPoint) => controlPoint.render());
    }
    /**
     * Transform control points with a specific transformation.
     * @private
     * @param {string} transformation
     *        A transformation name
     * @param {number|null} cx
     *        Origin x transformation
     * @param {number|null} cy
     *        Origin y transformation
     * @param {number} p1
     *        Param for the transformation
     * @param {number} [p2]
     *        Param for the transformation
     */
    function transform(transformation, cx, cy, p1, p2) {
        if (this.chart.inverted) {
            const temp = cx;
            cx = cy;
            cy = temp;
        }
        this.points.forEach((_point, i) => (this.transformPoint(transformation, cx, cy, p1, p2, i)), this);
    }
    /**
     * Transform a point with a specific transformation
     * If a transformed point is a real point it is replaced with
     * the mock point.
     * @private
     * @param {string} transformation
     *        A transformation name
     * @param {number|null} cx
     *        Origin x transformation
     * @param {number|null} cy
     *        Origin y transformation
     * @param {number} p1
     *        Param for the transformation
     * @param {number|undefined} p2
     *        Param for the transformation
     * @param {number} i
     *        Index of the point
     */
    function transformPoint(transformation, cx, cy, p1, p2, i) {
        let point = this.points[i];
        if (!point.mock) {
            point = this.points[i] = MockPoint.fromPoint(point);
        }
        point[transformation](cx, cy, p1, p2);
    }
    /**
     * Translate control points.
     * @private
     * @param {number} dx
     *        Translation for x coordinate
     * @param {number} dy
     *        Translation for y coordinate
     **/
    function translate(dx, dy) {
        this.transform('translate', null, null, dx, dy);
    }
    /**
     * Translate a specific control point.
     * @private
     * @param {number} dx
     *        Translation for x coordinate
     * @param {number} dy
     *        Translation for y coordinate
     * @param {number} i
     *        Index of the point
     **/
    function translatePoint(dx, dy, i) {
        this.transformPoint('translate', null, null, dx, dy, i);
    }
})(ControlTarget || (ControlTarget = {}));
/* *
 *
 *  Default Export
 *
 * */
export default ControlTarget;
