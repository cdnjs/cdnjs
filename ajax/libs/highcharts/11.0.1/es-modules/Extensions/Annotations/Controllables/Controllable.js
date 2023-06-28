/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import ControlTarget from '../ControlTarget.js';
import U from '../../../Core/Utilities.js';
const { merge } = U;
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
class Controllable {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(annotation, options, index, itemType) {
        this.graphic = void 0;
        this.annotation = annotation;
        this.chart = annotation.chart;
        this.collection = (itemType === 'label' ? 'labels' : 'shapes');
        this.controlPoints = [];
        this.options = options;
        this.points = [];
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
     * Redirect attr usage on the controllable graphic element.
     * @private
     */
    attr(..._args) {
        this.graphic.attr.apply(this.graphic, arguments);
    }
    /**
     * Utility function for mapping item's options
     * to element's attribute
     * @private
     * @param {Highcharts.AnnotationsLabelsOptions|Highcharts.AnnotationsShapesOptions} options
     * @return {Highcharts.SVGAttributes}
     *         Mapped options.
     */
    attrsFromOptions(options) {
        const map = this.constructor.attrsMap, attrs = {}, styledMode = this.chart.styledMode;
        let key, mappedKey;
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
    }
    /**
     * Destroy a controllable.
     * @private
     */
    destroy() {
        if (this.graphic) {
            this.graphic = this.graphic.destroy();
        }
        if (this.tracker) {
            this.tracker = this.tracker.destroy();
        }
        this.destroyControlTarget();
    }
    /**
     * Init the controllable
     * @private
     */
    init(annotation, options, index) {
        this.annotation = annotation;
        this.chart = annotation.chart;
        this.options = options;
        this.points = [];
        this.controlPoints = [];
        this.index = index;
        this.linkPoints();
        this.addControlPoints();
    }
    /**
     * Redraw a controllable.
     * @private
     */
    redraw(animation) {
        this.redrawControlPoints(animation);
    }
    /**
     * Render a controllable.
     * @private
     */
    render(_parentGroup) {
        this.renderControlPoints();
    }
    /**
     * Rotate a controllable.
     * @private
     * @param {number} cx
     *        Origin x rotation
     * @param {number} cy
     *        Origin y rotation
     * @param {number} radians
     **/
    rotate(cx, cy, radians) {
        this.transform('rotate', cx, cy, radians);
    }
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
    scale(cx, cy, sx, sy) {
        this.transform('scale', cx, cy, sx, sy);
    }
    /**
     * Set control points' visibility.
     * @private
     */
    setControlPointsVisibility(visible) {
        this.controlPoints.forEach((controlPoint) => {
            controlPoint.setVisibility(visible);
        });
    }
    /**
     * Check if a controllable should be rendered/redrawn.
     * @private
     * @return {boolean}
     *         Whether a controllable should be drawn.
     */
    shouldBeDrawn() {
        return !!this.points.length;
    }
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
    translateShape(dx, dy, translateSecondPoint) {
        const chart = this.annotation.chart, 
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
    }
    /**
     * Update a controllable.
     * @private
     */
    update(newOptions) {
        const annotation = this.annotation, options = merge(true, this.options, newOptions), parentGroup = this.graphic.parentGroup, Constructor = this.constructor;
        this.destroy();
        const newControllable = new Constructor(annotation, options, this.index, this.itemType);
        merge(true, this, newControllable);
        this.render(parentGroup);
        this.redraw();
    }
}
ControlTarget.compose(Controllable);
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
