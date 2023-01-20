/* *
 *
 * Author: Pawel Lysy
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Controllable from './Controllable.js';
import ControllablePath from './ControllablePath.js';
import U from '../../../Core/Utilities.js';
var merge = U.merge, defined = U.defined;
/* *
 *
 *  Class
 *
 * */
/**
 * A controllable ellipse class.
 *
 * @requires modules/annotations
 *
 * @private
 * @class
 * @name Highcharts.AnnotationControllableEllipse
 *
 * @param {Highcharts.Annotation} annotation an annotation instance
 * @param {Highcharts.AnnotationsShapeOptions} options a shape's options
 * @param {number} index of the Ellipse
 */
var ControllableEllipse = /** @class */ (function (_super) {
    __extends(ControllableEllipse, _super);
    /* *
     *
     *  Constructor
     *
     * */
    function ControllableEllipse(annotation, options, index) {
        var _this = _super.call(this, annotation, options, index, 'shape') || this;
        /* *
         *
         *  Properties
         *
         * */
        _this.type = 'ellipse';
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    ControllableEllipse.prototype.init = function (annotation, options, index) {
        if (defined(options.yAxis)) {
            options.points.forEach(function (point) {
                point.yAxis = options.yAxis;
            });
        }
        if (defined(options.xAxis)) {
            options.points.forEach(function (point) {
                point.xAxis = options.xAxis;
            });
        }
        _super.prototype.init.call(this, annotation, options, index);
    };
    /**
     * Render the element
     * @private
     * @param parent
     *        Parent SVG element.
     */
    ControllableEllipse.prototype.render = function (parent) {
        this.graphic = this.annotation.chart.renderer.createElement('ellipse')
            .attr(this.attrsFromOptions(this.options))
            .add(parent);
        _super.prototype.render.call(this);
    };
    /**
     * Translate the points. Mostly used to handle dragging of the ellipse.
     * @private
     */
    ControllableEllipse.prototype.translate = function (dx, dy) {
        _super.prototype.translateShape.call(this, dx, dy, true);
    };
    /**
     * Get the distance from the line to the point.
     * @private
     * @param point1
     *        First point which is on the line
     * @param point2
     *        Second point
     * @param x0
     *        Point's x value from which you want to calculate the distance from
     * @param y0
     *        Point's y value from which you want to calculate the distance from
     */
    ControllableEllipse.prototype.getDistanceFromLine = function (point1, point2, x0, y0) {
        return Math.abs((point2.y - point1.y) * x0 - (point2.x - point1.x) * y0 +
            point2.x * point1.y - point2.y * point1.x) / Math.sqrt((point2.y - point1.y) * (point2.y - point1.y) +
            (point2.x - point1.x) * (point2.x - point1.x));
    };
    /**
     * The fuction calculates the svg attributes of the ellipse, and returns all
     * parameters neccessary to draw the ellipse.
     * @private
     * @param position
     *        Absolute position of the first point in points array
     * @param position2
     *        Absolute position of the second point in points array
     */
    ControllableEllipse.prototype.getAttrs = function (position, position2) {
        var x1 = position.x, y1 = position.y, x2 = position2.x, y2 = position2.y, cx = (x1 + x2) / 2, cy = (y1 + y2) / 2, rx = Math.sqrt((x1 - x2) * (x1 - x2) / 4 + (y1 - y2) * (y1 - y2) / 4), tan = (y2 - y1) / (x2 - x1);
        var angle = Math.atan(tan) * 180 / Math.PI;
        if (cx < x1) {
            angle += 180;
        }
        var ry = this.getRY();
        return { cx: cx, cy: cy, rx: rx, ry: ry, angle: angle };
    };
    /**
     * Get the value of minor radius of the ellipse.
     * @private
     */
    ControllableEllipse.prototype.getRY = function () {
        var yAxis = this.getYAxis();
        return defined(yAxis) ?
            Math.abs(yAxis.toPixels(this.options.ry) - yAxis.toPixels(0)) :
            this.options.ry;
    };
    /**
     * Get the yAxis object to which the ellipse is pinned.
     * @private
     */
    ControllableEllipse.prototype.getYAxis = function () {
        var yAxisIndex = this.options.yAxis;
        return this.chart.yAxis[yAxisIndex];
    };
    /**
     * Get the absolute coordinates of the MockPoint
     * @private
     * @param point
     *        MockPoint that is added through options
     */
    ControllableEllipse.prototype.getAbsolutePosition = function (point) {
        return this.anchor(point).absolutePosition;
    };
    /**
     * Redraw the element
     * @private
     * @param animation
     *        Display an annimation
     */
    ControllableEllipse.prototype.redraw = function (animation) {
        if (this.graphic) {
            var position = this.getAbsolutePosition(this.points[0]), position2 = this.getAbsolutePosition(this.points[1]), attrs = this.getAttrs(position, position2);
            if (position) {
                this.graphic[animation ? 'animate' : 'attr']({
                    cx: attrs.cx,
                    cy: attrs.cy,
                    rx: attrs.rx,
                    ry: attrs.ry,
                    rotation: attrs.angle,
                    rotationOriginX: attrs.cx,
                    rotationOriginY: attrs.cy
                });
            }
            else {
                this.graphic.attr({
                    x: 0,
                    y: -9e9
                });
            }
            this.graphic.placed = Boolean(position);
        }
        _super.prototype.redraw.call(this, animation);
    };
    /**
     * Set the radius Y.
     * @private
     * @param {number} ry
     *        A radius in y direction to be set
     */
    ControllableEllipse.prototype.setYRadius = function (ry) {
        var shapes = this.annotation.userOptions.shapes;
        this.options.ry = ry;
        if (shapes && shapes[0]) {
            shapes[0].ry = ry;
            shapes[0].ry = ry;
        }
    };
    /* *
     *
     *  Static Properties
     *
     * */
    /**
     * A map object which allows to map options attributes to element
     * attributes.
     *
     * @name Highcharts.AnnotationControllableEllipse.attrsMap
     * @type {Highcharts.Dictionary<string>}
     */
    ControllableEllipse.attrsMap = merge(ControllablePath.attrsMap, {
        ry: 'ry'
    });
    return ControllableEllipse;
}(Controllable));
/* *
 *
 *  Default Export
 *
 * */
export default ControllableEllipse;
