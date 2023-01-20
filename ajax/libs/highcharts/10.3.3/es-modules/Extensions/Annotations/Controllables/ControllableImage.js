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
var ControllableImage = /** @class */ (function (_super) {
    __extends(ControllableImage, _super);
    /* *
     *
     *  Constructors
     *
     * */
    function ControllableImage(annotation, options, index) {
        var _this = _super.call(this, annotation, options, index, 'shape') || this;
        /* *
         *
         *  Properties
         *
         * */
        _this.type = 'image';
        _this.translate = _super.prototype.translateShape;
        return _this;
    }
    ControllableImage.prototype.render = function (parent) {
        var attrs = this.attrsFromOptions(this.options), options = this.options;
        this.graphic = this.annotation.chart.renderer
            .image(options.src, 0, -9e9, options.width, options.height)
            .attr(attrs)
            .add(parent);
        this.graphic.width = options.width;
        this.graphic.height = options.height;
        _super.prototype.render.call(this);
    };
    ControllableImage.prototype.redraw = function (animation) {
        if (this.graphic) {
            var anchor = this.anchor(this.points[0]), position = ControllableLabel.prototype.position.call(this, anchor);
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
        _super.prototype.redraw.call(this, animation);
    };
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
    return ControllableImage;
}(Controllable));
/* *
 *
 *  Default Export
 *
 * */
export default ControllableImage;
