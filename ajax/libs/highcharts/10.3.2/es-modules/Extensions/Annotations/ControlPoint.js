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
import EventEmitter from './EventEmitter.js';
import U from '../../Core/Utilities.js';
var merge = U.merge, pick = U.pick;
/* *
 *
 *  Class
 *
 * */
/**
 * A control point class which is a connection between controllable
 * transform methods and a user actions.
 *
 * @requires modules/annotations
 *
 * @class
 * @name Highcharts.AnnotationControlPoint
 *
 * @hideconstructor
 *
 * @param {Highcharts.Chart} chart
 * A chart instance.
 *
 * @param {Highcharts.AnnotationControllable} target
 * A controllable instance which is a target for a control point.
 *
 * @param {Highcharts.AnnotationControlPointOptionsObject} options
 * An options object.
 *
 * @param {number} [index]
 * Point index.
 */
var ControlPoint = /** @class */ (function (_super) {
    __extends(ControlPoint, _super);
    /* *
     *
     *  Constructor
     *
     * */
    function ControlPoint(chart, target, options, index) {
        var _this = _super.call(this) || this;
        _this.graphic = void 0;
        /**
         * List of events for `anntation.options.events` that should not be
         * added to `annotation.graphic` but to the `annotation`.
         * @private
         * @name Highcharts.AnnotationControlPoint#nonDOMEvents
         * @type {Array<string>}
         */
        _this.nonDOMEvents = ['drag'];
        _this.chart = chart;
        _this.target = target;
        _this.options = options;
        _this.index = pick(options.index, index);
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Destroy the control point.
     * @private
     */
    ControlPoint.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.graphic) {
            this.graphic = this.graphic.destroy();
        }
        this.chart = null;
        this.target = null;
        this.options = null;
    };
    /**
     * Redraw the control point.
     * @private
     * @param {boolean} [animation]
     */
    ControlPoint.prototype.redraw = function (animation) {
        this.graphic[animation ? 'animate' : 'attr'](this.options.positioner.call(this, this.target));
    };
    /**
     * Render the control point.
     * @private
     */
    ControlPoint.prototype.render = function () {
        var chart = this.chart, options = this.options;
        this.graphic = chart.renderer
            .symbol(options.symbol, 0, 0, options.width, options.height)
            .add(chart.controlPointsGroup)
            .css(options.style);
        this.setVisibility(options.visible);
        // npm test -- --tests "highcharts/annotations-advanced/*"
        this.addEvents();
    };
    /**
     * Set the visibility of the control point.
     *
     * @function Highcharts.AnnotationControlPoint#setVisibility
     *
     * @param {boolean} visible
     * Visibility of the control point.
     *
     */
    ControlPoint.prototype.setVisibility = function (visible) {
        this.graphic[visible ? 'show' : 'hide']();
        this.options.visible = visible;
    };
    /**
     * Update the control point.
     *
     * @function Highcharts.AnnotationControlPoint#update
     *
     * @param {Partial<Highcharts.AnnotationControlPointOptionsObject>} userOptions
     * New options for the control point.
     */
    ControlPoint.prototype.update = function (userOptions) {
        var chart = this.chart, target = this.target, index = this.index, options = merge(true, this.options, userOptions);
        this.destroy();
        this.constructor(chart, target, options, index);
        this.render(chart.controlPointsGroup);
        this.redraw();
    };
    return ControlPoint;
}(EventEmitter));
/* *
 *
 *  Default Export
 *
 * */
export default ControlPoint;
/* *
 *
 *  API Declarations
 *
 * */
/**
 * Callback to modify annotation's possitioner controls.
 *
 * @callback Highcharts.AnnotationControlPointPositionerFunction
 * @param {Highcharts.AnnotationControlPoint} this
 * @param {Highcharts.AnnotationControllable} target
 * @return {Highcharts.PositionObject}
 */
(''); // keeps doclets above in JS file
