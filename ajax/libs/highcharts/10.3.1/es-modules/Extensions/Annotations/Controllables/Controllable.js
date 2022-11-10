/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import ControlPoint from '../ControlPoint.js';
import MockPoint from '../MockPoint.js';
import Tooltip from '../../../Core/Tooltip.js';
import U from '../../../Core/Utilities.js';
var isObject = U.isObject, isString = U.isString, merge = U.merge, splat = U.splat;
/* *
 *
 *  Class
 *
 * */
/**
 * It provides methods for handling points, control points
 * and points transformations.
 * @private
 */
var Controllable = /** @class */ (function () {
    /* *
     *
     *  Constructor
     *
     * */
    function Controllable(annotation, options, index, itemType) {
        this.graphic = void 0;
        this.annotation = annotation;
        this.chart = annotation.chart;
        this.collection = (itemType === 'label' ? 'labels' : 'shapes');
        this.options = options;
        this.points = [];
        this.controlPoints = [];
        this.index = index;
        this.itemType = itemType;
        this.init(annotation, options, index);
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Add control points to a controllable.
     * @private
     */
    Controllable.prototype.addControlPoints = function () {
        var _this = this;
        var controlPoints = this.controlPoints, controlPointsOptions = this.options.controlPoints || [];
        controlPointsOptions.forEach(function (controlPointOptions, i) {
            var options = merge(_this.options.controlPointOptions, controlPointOptions);
            if (!options.index) {
                options.index = i;
            }
            controlPointsOptions[i] = options;
            controlPoints.push(new ControlPoint(_this.chart, _this, options));
        });
    };
    /**
     * Returns object which denotes anchor position - relative and absolute.
     * @private
     * @param {Highcharts.AnnotationPointType} point
     *        A point like object.
     * @return {Highcharts.AnnotationAnchorObject}
     *         A controllable anchor
     */
    Controllable.prototype.anchor = function (point) {
        var plotBox = point.series.getPlotBox(), chart = point.series.chart, box = point.mock ?
            point.toAnchor() :
            Tooltip.prototype.getAnchor.call({
                chart: point.series.chart
            }, point), anchor = {
            x: box[0] + (this.options.x || 0),
            y: box[1] + (this.options.y || 0),
            height: box[2] || 0,
            width: box[3] || 0
        };
        return {
            relativePosition: anchor,
            absolutePosition: merge(anchor, {
                x: anchor.x + (point.mock ? plotBox.translateX : chart.plotLeft),
                y: anchor.y + (point.mock ? plotBox.translateY : chart.plotTop)
            })
        };
    };
    /**
     * Redirect attr usage on the controllable graphic element.
     * @private
     */
    Controllable.prototype.attr = function () {
        var _args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _args[_i] = arguments[_i];
        }
        this.graphic.attr.apply(this.graphic, arguments);
    };
    /**
     * Utility function for mapping item's options
     * to element's attribute
     * @private
     * @param {Highcharts.AnnotationsLabelsOptions|Highcharts.AnnotationsShapesOptions} options
     * @return {Highcharts.SVGAttributes}
     *         Mapped options.
     */
    Controllable.prototype.attrsFromOptions = function (options) {
        var map = this.constructor.attrsMap, attrs = {}, styledMode = this.chart.styledMode;
        var key, mappedKey;
        for (key in options) { // eslint-disable-line guard-for-in
            mappedKey = map[key];
            if (typeof map[key] !== 'undefined' &&
                (!styledMode ||
                    ['fill', 'stroke', 'stroke-width']
                        .indexOf(mappedKey) === -1)) {
                attrs[mappedKey] = options[key];
            }
        }
        return attrs;
    };
    /**
     * Destroy a controllable.
     * @private
     */
    Controllable.prototype.destroy = function () {
        if (this.graphic) {
            this.graphic = this.graphic.destroy();
        }
        if (this.tracker) {
            this.tracker = this.tracker.destroy();
        }
        this.controlPoints.forEach(function (controlPoint) { return controlPoint.destroy(); });
        this.chart = null;
        this.points = null;
        this.controlPoints = null;
        this.options = null;
        if (this.annotation) {
            this.annotation = null;
        }
    };
    /**
     * Get the controllable's points options.
     * @private
     * @return {Array<Highcharts.PointOptionsObject>}
     *         An array of points' options.
     */
    Controllable.prototype.getPointsOptions = function () {
        var options = this.options;
        return (options.points ||
            (options.point && splat(options.point)));
    };
    /**
     * Init the controllable
     * @private
     */
    Controllable.prototype.init = function (annotation, options, index) {
        this.annotation = annotation;
        this.chart = annotation.chart;
        this.options = options;
        this.points = [];
        this.controlPoints = [];
        this.index = index;
        this.linkPoints();
        this.addControlPoints();
    };
    /**
     * Find point-like objects based on points options.
     * @private
     * @return {Array<Annotation.PointLike>}
     *         An array of point-like objects.
     */
    Controllable.prototype.linkPoints = function () {
        var pointsOptions = this.getPointsOptions(), points = this.points, len = (pointsOptions && pointsOptions.length) || 0;
        var i, point;
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
    };
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
    Controllable.prototype.point = function (pointOptions, point) {
        if (pointOptions && pointOptions.series) {
            return pointOptions;
        }
        if (!point || point.series === null) {
            if (isObject(pointOptions)) {
                point = new MockPoint(this.chart, this, pointOptions);
            }
            else if (isString(pointOptions)) {
                point = this.chart.get(pointOptions) || null;
            }
            else if (typeof pointOptions === 'function') {
                var pointConfig = pointOptions.call(point, this);
                point = pointConfig.series ?
                    pointConfig :
                    new MockPoint(this.chart, this, pointOptions);
            }
        }
        return point;
    };
    /**
     * Render a controllable.
     * @private
     */
    Controllable.prototype.render = function (_parentGroup) {
        this.controlPoints.forEach(function (controlPoint) { return controlPoint.render(); });
    };
    /**
     * Redraw a controllable.
     * @private
     */
    Controllable.prototype.redraw = function (animation) {
        this.controlPoints.forEach(function (controlPoint) { return controlPoint.redraw(animation); });
    };
    /**
     * Rotate a controllable.
     * @private
     * @param {number} cx
     *        Origin x rotation
     * @param {number} cy
     *        Origin y rotation
     * @param {number} radians
     **/
    Controllable.prototype.rotate = function (cx, cy, radians) {
        this.transform('rotate', cx, cy, radians);
    };
    /**
     * Scale a controllable.
     * @private
     * @param {number} cx
     *        Origin x rotation
     * @param {number} cy
     *        Origin y rotation
     * @param {number} sx
     *        Scale factor x
     * @param {number} sy
     *        Scale factor y
     */
    Controllable.prototype.scale = function (cx, cy, sx, sy) {
        this.transform('scale', cx, cy, sx, sy);
    };
    /**
     * Set control points' visibility.
     * @private
     */
    Controllable.prototype.setControlPointsVisibility = function (visible) {
        this.controlPoints.forEach(function (controlPoint) {
            controlPoint.setVisibility(visible);
        });
    };
    /**
     * Check if a controllable should be rendered/redrawn.
     * @private
     * @return {boolean}
     *         Whether a controllable should be drawn.
     */
    Controllable.prototype.shouldBeDrawn = function () {
        return !!this.points.length;
    };
    /**
     * Transform a controllable with a specific transformation.
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
    Controllable.prototype.transform = function (transformation, cx, cy, p1, p2) {
        var _this = this;
        if (this.chart.inverted) {
            var temp = cx;
            cx = cy;
            cy = temp;
        }
        this.points.forEach(function (_point, i) { return (_this.transformPoint(transformation, cx, cy, p1, p2, i)); }, this);
    };
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
    Controllable.prototype.transformPoint = function (transformation, cx, cy, p1, p2, i) {
        var point = this.points[i];
        if (!point.mock) {
            point = this.points[i] = MockPoint.fromPoint(point);
        }
        point[transformation](cx, cy, p1, p2);
    };
    /**
     * Translate a controllable.
     * @private
     * @param {number} dx
     *        Translation for x coordinate
     * @param {number} dy
     *        Translation for y coordinate
     **/
    Controllable.prototype.translate = function (dx, dy) {
        this.transform('translate', null, null, dx, dy);
    };
    /**
     * Translate a specific point within a controllable.
     * @private
     * @param {number} dx
     *        Translation for x coordinate
     * @param {number} dy
     *        Translation for y coordinate
     * @param {number} i
     *        Index of the point
     **/
    Controllable.prototype.translatePoint = function (dx, dy, i) {
        this.transformPoint('translate', null, null, dx, dy, i);
    };
    /**
     * Translate shape within controllable item.
     * Replaces `controllable.translate` method.
     * @private
     * @param {number} dx
     *        Translation for x coordinate
     * @param {number} dy
     *        Translation for y coordinate
     * @param {boolean|undefined} translateSecondPoint
     *        If the shape has two points attached to it, this option allows you
     *        to translate also the second point.
     */
    Controllable.prototype.translateShape = function (dx, dy, translateSecondPoint) {
        var chart = this.annotation.chart, 
        // Annotation.options
        shapeOptions = this.annotation.userOptions, 
        // Chart.options.annotations
        annotationIndex = chart.annotations.indexOf(this.annotation), chartOptions = chart.options.annotations[annotationIndex];
        this.translatePoint(dx, dy, 0);
        if (translateSecondPoint) {
            this.translatePoint(dx, dy, 1);
        }
        // Options stored in:
        // - chart (for exporting)
        // - current config (for redraws)
        chartOptions[this.collection][this.index]
            .point = this.options.point;
        shapeOptions[this.collection][this.index]
            .point = this.options.point;
    };
    /**
     * Update a controllable.
     * @private
     */
    Controllable.prototype.update = function (newOptions) {
        var annotation = this.annotation, options = merge(true, this.options, newOptions), parentGroup = this.graphic.parentGroup;
        this.destroy();
        this.constructor(annotation, options, this.index, this.itemType);
        this.render(parentGroup);
        this.redraw();
    };
    return Controllable;
}());
/* *
 *
 *  Default Export
 *
 * */
export default Controllable;
/* *
 *
 *  API Declarations
 *
 * */
/**
 * An object which denots a controllable's anchor positions - relative and
 * absolute.
 *
 * @private
 * @interface Highcharts.AnnotationAnchorObject
 */ /**
* Relative to the plot area position
* @name Highcharts.AnnotationAnchorObject#relativePosition
* @type {Highcharts.BBoxObject}
*/ /**
* Absolute position
* @name Highcharts.AnnotationAnchorObject#absolutePosition
* @type {Highcharts.BBoxObject}
*/
/**
 * @interface Highcharts.AnnotationControllable
 */ /**
* @name Highcharts.AnnotationControllable#annotation
* @type {Highcharts.Annotation}
*/ /**
* @name Highcharts.AnnotationControllable#chart
* @type {Highcharts.Chart}
*/ /**
* @name Highcharts.AnnotationControllable#collection
* @type {string}
*/ /**
* @private
* @name Highcharts.AnnotationControllable#controlPoints
* @type {Array<Highcharts.AnnotationControlPoint>}
*/ /**
* @name Highcharts.AnnotationControllable#points
* @type {Array<Highcharts.Point>}
*/
(''); // keeps doclets above in JS file
