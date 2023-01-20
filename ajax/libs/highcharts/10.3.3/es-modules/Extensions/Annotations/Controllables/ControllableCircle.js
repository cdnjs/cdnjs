/* *
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
var merge = U.merge;
/* *
 *
 *  Class
 *
 * */
/**
 * A controllable circle class.
 *
 * @requires modules/annotations
 *
 * @private
 * @class
 * @name Highcharts.AnnotationControllableCircle
 *
 * @param {Highcharts.Annotation} annotation an annotation instance
 * @param {Highcharts.AnnotationsShapeOptions} options a shape's options
 * @param {number} index of the circle
 */
var ControllableCircle = /** @class */ (function (_super) {
    __extends(ControllableCircle, _super);
    /* *
     *
     *  Constructors
     *
     * */
    function ControllableCircle(annotation, options, index) {
        var _this = _super.call(this, annotation, options, index, 'shape') || this;
        /* *
         *
         *  Properties
         *
         * */
        _this.type = 'circle';
        _this.translate = _super.prototype.translateShape;
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
    ControllableCircle.prototype.redraw = function (animation) {
        if (this.graphic) {
            var position = this.anchor(this.points[0]).absolutePosition;
            if (position) {
                this.graphic[animation ? 'animate' : 'attr']({
                    x: position.x,
                    y: position.y,
                    r: this.options.r
                });
            }
            else {
                this.graphic.attr({
                    x: 0,
                    y: -9e9
                });
            }
            this.graphic.placed = !!position;
        }
        _super.prototype.redraw.call(this, animation);
    };
    /**
     * @private
     */
    ControllableCircle.prototype.render = function (parent) {
        var attrs = this.attrsFromOptions(this.options);
        this.graphic = this.annotation.chart.renderer
            .circle(0, -9e9, 0)
            .attr(attrs)
            .add(parent);
        _super.prototype.render.call(this);
    };
    /**
     * Set the radius.
     * @private
     * @param {number} r
     *        A radius to be set
     */
    ControllableCircle.prototype.setRadius = function (r) {
        this.options.r = r;
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
     * @name Highcharts.AnnotationControllableCircle.attrsMap
     * @type {Highcharts.Dictionary<string>}
     */
    ControllableCircle.attrsMap = merge(ControllablePath.attrsMap, { r: 'r' });
    return ControllableCircle;
}(Controllable));
/* *
 *
 *  Default Export
 *
 * */
export default ControllableCircle;
