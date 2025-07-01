/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import EventEmitter from './EventEmitter.js';
import U from '../../Core/Utilities.js';
const { merge, pick } = U;
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
class ControlPoint extends EventEmitter {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(chart, target, options, index) {
        super();
        /**
         * List of events for `annotation.options.events` that should not be
         * added to `annotation.graphic` but to the `annotation`.
         * @private
         * @name Highcharts.AnnotationControlPoint#nonDOMEvents
         * @type {Array<string>}
         */
        this.nonDOMEvents = ['drag'];
        this.chart = chart;
        this.target = target;
        this.options = options;
        this.index = pick(options.index, index);
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
    destroy() {
        super.destroy();
        if (this.graphic) {
            this.graphic = this.graphic.destroy();
        }
        this.chart = null;
        this.target = null;
        this.options = null;
    }
    /**
     * Redraw the control point.
     * @private
     * @param {boolean} [animation]
     */
    redraw(animation) {
        this.graphic[animation ? 'animate' : 'attr'](this.options.positioner.call(this, this.target));
    }
    /**
     * Render the control point.
     * @private
     */
    render() {
        const chart = this.chart, options = this.options;
        this.graphic = chart.renderer
            .symbol(options.symbol, 0, 0, options.width, options.height)
            .add(chart.controlPointsGroup)
            .css(options.style);
        this.setVisibility(options.visible);
        // `npm test -- --tests "@highcharts/highcharts/annotations-advanced/*"`
        this.addEvents();
    }
    /**
     * Set the visibility of the control point.
     *
     * @function Highcharts.AnnotationControlPoint#setVisibility
     *
     * @param {boolean} visible
     * Visibility of the control point.
     *
     */
    setVisibility(visible) {
        this.graphic[visible ? 'show' : 'hide']();
        this.options.visible = visible;
    }
    /**
     * Update the control point.
     *
     * @function Highcharts.AnnotationControlPoint#update
     *
     * @param {Partial<Highcharts.AnnotationControlPointOptionsObject>} userOptions
     * New options for the control point.
     */
    update(userOptions) {
        const chart = this.chart, target = this.target, index = this.index, options = merge(true, this.options, userOptions);
        this.destroy();
        this.constructor(chart, target, options, index);
        this.render(chart.controlPointsGroup);
        this.redraw();
    }
}
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
 * Callback to modify annotation's positioner controls.
 *
 * @callback Highcharts.AnnotationControlPointPositionerFunction
 * @param {Highcharts.AnnotationControlPoint} this
 * @param {Highcharts.AnnotationControllable} target
 * @return {Highcharts.PositionObject}
 */
(''); // Keeps doclets above in JS file
