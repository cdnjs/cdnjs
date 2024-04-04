/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Controllable from './Controllable.js';
import ControllablePath from './ControllablePath.js';
import U from '../../../Core/Utilities.js';
const { merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * A controllable rect class.
 *
 * @requires modules/annotations
 *
 * @private
 * @class
 * @name Highcharts.AnnotationControllableRect
 *
 * @param {Highcharts.Annotation} annotation
 * An annotation instance.
 *
 * @param {Highcharts.AnnotationsShapeOptions} options
 * A rect's options.
 *
 * @param {number} index
 * Index of the rectangle
 */
class ControllableRect extends Controllable {
    /* *
     *
     *  Constructors
     *
     * */
    constructor(annotation, options, index) {
        super(annotation, options, index, 'shape');
        /* *
         *
         *  Properties
         *
         * */
        this.type = 'rect';
        this.translate = super.translateShape;
    }
    /* *
     *
     *  Functions
     *
     * */
    render(parent) {
        const attrs = this.attrsFromOptions(this.options);
        this.graphic = this.annotation.chart.renderer
            .rect(0, -9e9, 0, 0)
            .attr(attrs)
            .add(parent);
        super.render();
    }
    redraw(animation) {
        if (this.graphic) {
            const position = this.anchor(this.points[0]).absolutePosition;
            if (position) {
                this.graphic[animation ? 'animate' : 'attr']({
                    x: position.x,
                    y: position.y,
                    width: this.options.width,
                    height: this.options.height
                });
            }
            else {
                this.attr({
                    x: 0,
                    y: -9e9
                });
            }
            this.graphic.placed = Boolean(position);
        }
        super.redraw(animation);
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * A map object which allows to map options attributes to element attributes
 *
 * @type {Annotation.ControllableRect.AttrsMap}
 */
ControllableRect.attrsMap = merge(ControllablePath.attrsMap, {
    width: 'width',
    height: 'height'
});
/* *
 *
 *  Default Export
 *
 * */
export default ControllableRect;
