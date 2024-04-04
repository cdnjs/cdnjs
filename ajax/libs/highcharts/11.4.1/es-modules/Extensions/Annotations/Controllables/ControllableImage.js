/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Controllable from './Controllable.js';
import ControllableLabel from './ControllableLabel.js';
/* *
 *
 *  Class
 *
 * */
/**
 * A controllable image class.
 *
 * @requires modules/annotations
 *
 * @private
 * @class
 * @name Highcharts.AnnotationControllableImage
 *
 * @param {Highcharts.Annotation} annotation
 * An annotation instance.
 *
 * @param {Highcharts.AnnotationsShapeOptions} options
 * A controllable's options.
 *
 * @param {number} index
 * Index of the image.
 */
class ControllableImage extends Controllable {
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
        this.type = 'image';
        this.translate = super.translateShape;
    }
    render(parent) {
        const attrs = this.attrsFromOptions(this.options), options = this.options;
        this.graphic = this.annotation.chart.renderer
            .image(options.src, 0, -9e9, options.width, options.height)
            .attr(attrs)
            .add(parent);
        this.graphic.width = options.width;
        this.graphic.height = options.height;
        super.render();
    }
    redraw(animation) {
        if (this.graphic) {
            const anchor = this.anchor(this.points[0]), position = ControllableLabel.prototype.position.call(this, anchor);
            if (position) {
                this.graphic[animation ? 'animate' : 'attr']({
                    x: position.x,
                    y: position.y
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
 * @name Highcharts.AnnotationControllableImage.attrsMap
 * @type {Highcharts.Dictionary<string>}
 */
ControllableImage.attrsMap = {
    width: 'width',
    height: 'height',
    zIndex: 'zIndex'
};
/* *
 *
 *  Default Export
 *
 * */
export default ControllableImage;
