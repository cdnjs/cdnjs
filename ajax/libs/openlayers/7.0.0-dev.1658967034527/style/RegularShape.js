/**
 * @module ol/style/RegularShape
 */
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
import ImageState from '../ImageState.js';
import ImageStyle from './Image.js';
import { asArray } from '../color.js';
import { asColorLike } from '../colorlike.js';
import { createCanvasContext2D } from '../dom.js';
import { defaultFillStyle, defaultLineJoin, defaultLineWidth, defaultMiterLimit, defaultStrokeStyle, } from '../render/canvas.js';
/**
 * Specify radius for regular polygons, or radius1 and radius2 for stars.
 * @typedef {Object} Options
 * @property {import("./Fill.js").default} [fill] Fill style.
 * @property {number} points Number of points for stars and regular polygons. In case of a polygon, the number of points
 * is the number of sides.
 * @property {number} [radius] Radius of a regular polygon.
 * @property {number} [radius1] First radius of a star. Ignored if radius is set.
 * @property {number} [radius2] Second radius of a star.
 * @property {number} [angle=0] Shape's angle in radians. A value of 0 will have one of the shape's point facing up.
 * @property {Array<number>} [displacement=[0,0]] Displacement of the shape
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {boolean} [rotateWithView=false] Whether to rotate the shape with the view.
 * @property {number|import("../size.js").Size} [scale=1] Scale. Unless two dimensional scaling is required a better
 * result may be obtained with appropriate settings for `radius`, `radius1` and `radius2`.
 * @property {"declutter"|"obstacle"|"none"|undefined} [declutterMode] Declutter mode
 */
/**
 * @typedef {Object} RenderOptions
 * @property {import("../colorlike.js").ColorLike} [strokeStyle] StrokeStyle.
 * @property {number} strokeWidth StrokeWidth.
 * @property {number} size Size.
 * @property {Array<number>} lineDash LineDash.
 * @property {number} lineDashOffset LineDashOffset.
 * @property {CanvasLineJoin} lineJoin LineJoin.
 * @property {number} miterLimit MiterLimit.
 */
/**
 * @classdesc
 * Set regular shape style for vector features. The resulting shape will be
 * a regular polygon when `radius` is provided, or a star when `radius1` and
 * `radius2` are provided.
 * @api
 */
var RegularShape = /** @class */ (function (_super) {
    __extends(RegularShape, _super);
    /**
     * @param {Options} options Options.
     */
    function RegularShape(options) {
        var _this = this;
        /**
         * @type {boolean}
         */
        var rotateWithView = options.rotateWithView !== undefined ? options.rotateWithView : false;
        _this = _super.call(this, {
            opacity: 1,
            rotateWithView: rotateWithView,
            rotation: options.rotation !== undefined ? options.rotation : 0,
            scale: options.scale !== undefined ? options.scale : 1,
            displacement: options.displacement !== undefined ? options.displacement : [0, 0],
            declutterMode: options.declutterMode,
        }) || this;
        /**
         * @private
         * @type {Object<number, HTMLCanvasElement>}
         */
        _this.canvas_ = undefined;
        /**
         * @private
         * @type {HTMLCanvasElement}
         */
        _this.hitDetectionCanvas_ = null;
        /**
         * @private
         * @type {import("./Fill.js").default}
         */
        _this.fill_ = options.fill !== undefined ? options.fill : null;
        /**
         * @private
         * @type {Array<number>}
         */
        _this.origin_ = [0, 0];
        /**
         * @private
         * @type {number}
         */
        _this.points_ = options.points;
        /**
         * @protected
         * @type {number}
         */
        _this.radius_ =
            options.radius !== undefined ? options.radius : options.radius1;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.radius2_ = options.radius2;
        /**
         * @private
         * @type {number}
         */
        _this.angle_ = options.angle !== undefined ? options.angle : 0;
        /**
         * @private
         * @type {import("./Stroke.js").default}
         */
        _this.stroke_ = options.stroke !== undefined ? options.stroke : null;
        /**
         * @private
         * @type {import("../size.js").Size}
         */
        _this.size_ = null;
        /**
         * @private
         * @type {RenderOptions}
         */
        _this.renderOptions_ = null;
        _this.render();
        return _this;
    }
    /**
     * Clones the style.
     * @return {RegularShape} The cloned style.
     * @api
     */
    RegularShape.prototype.clone = function () {
        var scale = this.getScale();
        var style = new RegularShape({
            fill: this.getFill() ? this.getFill().clone() : undefined,
            points: this.getPoints(),
            radius: this.getRadius(),
            radius2: this.getRadius2(),
            angle: this.getAngle(),
            stroke: this.getStroke() ? this.getStroke().clone() : undefined,
            rotation: this.getRotation(),
            rotateWithView: this.getRotateWithView(),
            scale: Array.isArray(scale) ? scale.slice() : scale,
            displacement: this.getDisplacement().slice(),
            declutterMode: this.getDeclutterMode(),
        });
        style.setOpacity(this.getOpacity());
        return style;
    };
    /**
     * Get the anchor point in pixels. The anchor determines the center point for the
     * symbolizer.
     * @return {Array<number>} Anchor.
     * @api
     */
    RegularShape.prototype.getAnchor = function () {
        var size = this.size_;
        if (!size) {
            return null;
        }
        var displacement = this.getDisplacement();
        return [size[0] / 2 - displacement[0], size[1] / 2 + displacement[1]];
    };
    /**
     * Get the angle used in generating the shape.
     * @return {number} Shape's rotation in radians.
     * @api
     */
    RegularShape.prototype.getAngle = function () {
        return this.angle_;
    };
    /**
     * Get the fill style for the shape.
     * @return {import("./Fill.js").default} Fill style.
     * @api
     */
    RegularShape.prototype.getFill = function () {
        return this.fill_;
    };
    /**
     * Set the fill style.
     * @param {import("./Fill.js").default} fill Fill style.
     * @api
     */
    RegularShape.prototype.setFill = function (fill) {
        this.fill_ = fill;
        this.render();
    };
    /**
     * @return {HTMLCanvasElement} Image element.
     */
    RegularShape.prototype.getHitDetectionImage = function () {
        if (!this.hitDetectionCanvas_) {
            this.createHitDetectionCanvas_(this.renderOptions_);
        }
        return this.hitDetectionCanvas_;
    };
    /**
     * Get the image icon.
     * @param {number} pixelRatio Pixel ratio.
     * @return {HTMLCanvasElement} Image or Canvas element.
     * @api
     */
    RegularShape.prototype.getImage = function (pixelRatio) {
        var image = this.canvas_[pixelRatio];
        if (!image) {
            var renderOptions = this.renderOptions_;
            var context = createCanvasContext2D(renderOptions.size * pixelRatio, renderOptions.size * pixelRatio);
            this.draw_(renderOptions, context, pixelRatio);
            image = context.canvas;
            this.canvas_[pixelRatio] = image;
        }
        return image;
    };
    /**
     * Get the image pixel ratio.
     * @param {number} pixelRatio Pixel ratio.
     * @return {number} Pixel ratio.
     */
    RegularShape.prototype.getPixelRatio = function (pixelRatio) {
        return pixelRatio;
    };
    /**
     * @return {import("../size.js").Size} Image size.
     */
    RegularShape.prototype.getImageSize = function () {
        return this.size_;
    };
    /**
     * @return {import("../ImageState.js").default} Image state.
     */
    RegularShape.prototype.getImageState = function () {
        return ImageState.LOADED;
    };
    /**
     * Get the origin of the symbolizer.
     * @return {Array<number>} Origin.
     * @api
     */
    RegularShape.prototype.getOrigin = function () {
        return this.origin_;
    };
    /**
     * Get the number of points for generating the shape.
     * @return {number} Number of points for stars and regular polygons.
     * @api
     */
    RegularShape.prototype.getPoints = function () {
        return this.points_;
    };
    /**
     * Get the (primary) radius for the shape.
     * @return {number} Radius.
     * @api
     */
    RegularShape.prototype.getRadius = function () {
        return this.radius_;
    };
    /**
     * Get the secondary radius for the shape.
     * @return {number|undefined} Radius2.
     * @api
     */
    RegularShape.prototype.getRadius2 = function () {
        return this.radius2_;
    };
    /**
     * Get the size of the symbolizer (in pixels).
     * @return {import("../size.js").Size} Size.
     * @api
     */
    RegularShape.prototype.getSize = function () {
        return this.size_;
    };
    /**
     * Get the stroke style for the shape.
     * @return {import("./Stroke.js").default} Stroke style.
     * @api
     */
    RegularShape.prototype.getStroke = function () {
        return this.stroke_;
    };
    /**
     * Set the stroke style.
     * @param {import("./Stroke.js").default} stroke Stroke style.
     * @api
     */
    RegularShape.prototype.setStroke = function (stroke) {
        this.stroke_ = stroke;
        this.render();
    };
    /**
     * @param {function(import("../events/Event.js").default): void} listener Listener function.
     */
    RegularShape.prototype.listenImageChange = function (listener) { };
    /**
     * Load not yet loaded URI.
     */
    RegularShape.prototype.load = function () { };
    /**
     * @param {function(import("../events/Event.js").default): void} listener Listener function.
     */
    RegularShape.prototype.unlistenImageChange = function (listener) { };
    /**
     * Calculate additional canvas size needed for the miter.
     * @param {string} lineJoin Line join
     * @param {number} strokeWidth Stroke width
     * @param {number} miterLimit Miter limit
     * @return {number} Additional canvas size needed
     * @private
     */
    RegularShape.prototype.calculateLineJoinSize_ = function (lineJoin, strokeWidth, miterLimit) {
        if (strokeWidth === 0 ||
            this.points_ === Infinity ||
            (lineJoin !== 'bevel' && lineJoin !== 'miter')) {
            return strokeWidth;
        }
        // m  | ^
        // i  | |\                  .
        // t >|  #\
        // e  | |\ \              .
        // r      \s\
        //      |  \t\          .                 .
        //          \r\                      .   .
        //      |    \o\      .          .  . . .
        //          e \k\            .  .    . .
        //      |      \e\  .    .  .       . .
        //       d      \ \  .  .          . .
        //      | _ _a_ _\#  .            . .
        //   r1          / `             . .
        //      |                       . .
        //       b     /               . .
        //      |                     . .
        //           / r2            . .
        //      |                        .   .
        //         /                           .   .
        //      |α                                   .   .
        //       /                                         .   .
        //      ° center
        var r1 = this.radius_;
        var r2 = this.radius2_ === undefined ? r1 : this.radius2_;
        if (r1 < r2) {
            var tmp = r1;
            r1 = r2;
            r2 = tmp;
        }
        var points = this.radius2_ === undefined ? this.points_ : this.points_ * 2;
        var alpha = (2 * Math.PI) / points;
        var a = r2 * Math.sin(alpha);
        var b = Math.sqrt(r2 * r2 - a * a);
        var d = r1 - b;
        var e = Math.sqrt(a * a + d * d);
        var miterRatio = e / a;
        if (lineJoin === 'miter' && miterRatio <= miterLimit) {
            return miterRatio * strokeWidth;
        }
        // Calculate the distnce from center to the stroke corner where
        // it was cut short because of the miter limit.
        //              l
        //        ----+---- <= distance from center to here is maxr
        //       /####|k ##\
        //      /#####^#####\
        //     /#### /+\# s #\
        //    /### h/+++\# t #\
        //   /### t/+++++\# r #\
        //  /### a/+++++++\# o #\
        // /### p/++ fill +\# k #\
        ///#### /+++++^+++++\# e #\
        //#####/+++++/+\+++++\#####\
        var k = strokeWidth / 2 / miterRatio;
        var l = (strokeWidth / 2) * (d / e);
        var maxr = Math.sqrt((r1 + k) * (r1 + k) + l * l);
        var bevelAdd = maxr - r1;
        if (this.radius2_ === undefined || lineJoin === 'bevel') {
            return bevelAdd * 2;
        }
        // If outer miter is over the miter limit the inner miter may reach through the
        // center and be longer than the bevel, same calculation as above but swap r1 / r2.
        var aa = r1 * Math.sin(alpha);
        var bb = Math.sqrt(r1 * r1 - aa * aa);
        var dd = r2 - bb;
        var ee = Math.sqrt(aa * aa + dd * dd);
        var innerMiterRatio = ee / aa;
        if (innerMiterRatio <= miterLimit) {
            var innerLength = (innerMiterRatio * strokeWidth) / 2 - r2 - r1;
            return 2 * Math.max(bevelAdd, innerLength);
        }
        return bevelAdd * 2;
    };
    /**
     * @return {RenderOptions}  The render options
     * @protected
     */
    RegularShape.prototype.createRenderOptions = function () {
        var lineJoin = defaultLineJoin;
        var miterLimit = 0;
        var lineDash = null;
        var lineDashOffset = 0;
        var strokeStyle;
        var strokeWidth = 0;
        if (this.stroke_) {
            strokeStyle = this.stroke_.getColor();
            if (strokeStyle === null) {
                strokeStyle = defaultStrokeStyle;
            }
            strokeStyle = asColorLike(strokeStyle);
            strokeWidth = this.stroke_.getWidth();
            if (strokeWidth === undefined) {
                strokeWidth = defaultLineWidth;
            }
            lineDash = this.stroke_.getLineDash();
            lineDashOffset = this.stroke_.getLineDashOffset();
            lineJoin = this.stroke_.getLineJoin();
            if (lineJoin === undefined) {
                lineJoin = defaultLineJoin;
            }
            miterLimit = this.stroke_.getMiterLimit();
            if (miterLimit === undefined) {
                miterLimit = defaultMiterLimit;
            }
        }
        var add = this.calculateLineJoinSize_(lineJoin, strokeWidth, miterLimit);
        var maxRadius = Math.max(this.radius_, this.radius2_ || 0);
        var size = Math.ceil(2 * maxRadius + add);
        return {
            strokeStyle: strokeStyle,
            strokeWidth: strokeWidth,
            size: size,
            lineDash: lineDash,
            lineDashOffset: lineDashOffset,
            lineJoin: lineJoin,
            miterLimit: miterLimit,
        };
    };
    /**
     * @protected
     */
    RegularShape.prototype.render = function () {
        this.renderOptions_ = this.createRenderOptions();
        var size = this.renderOptions_.size;
        this.canvas_ = {};
        this.size_ = [size, size];
    };
    /**
     * @private
     * @param {RenderOptions} renderOptions Render options.
     * @param {CanvasRenderingContext2D} context The rendering context.
     * @param {number} pixelRatio The pixel ratio.
     */
    RegularShape.prototype.draw_ = function (renderOptions, context, pixelRatio) {
        context.scale(pixelRatio, pixelRatio);
        // set origin to canvas center
        context.translate(renderOptions.size / 2, renderOptions.size / 2);
        this.createPath_(context);
        if (this.fill_) {
            var color = this.fill_.getColor();
            if (color === null) {
                color = defaultFillStyle;
            }
            context.fillStyle = asColorLike(color);
            context.fill();
        }
        if (this.stroke_) {
            context.strokeStyle = renderOptions.strokeStyle;
            context.lineWidth = renderOptions.strokeWidth;
            if (context.setLineDash && renderOptions.lineDash) {
                context.setLineDash(renderOptions.lineDash);
                context.lineDashOffset = renderOptions.lineDashOffset;
            }
            context.lineJoin = renderOptions.lineJoin;
            context.miterLimit = renderOptions.miterLimit;
            context.stroke();
        }
    };
    /**
     * @private
     * @param {RenderOptions} renderOptions Render options.
     */
    RegularShape.prototype.createHitDetectionCanvas_ = function (renderOptions) {
        if (this.fill_) {
            var color = this.fill_.getColor();
            // determine if fill is transparent (or pattern or gradient)
            var opacity = 0;
            if (typeof color === 'string') {
                color = asArray(color);
            }
            if (color === null) {
                opacity = 1;
            }
            else if (Array.isArray(color)) {
                opacity = color.length === 4 ? color[3] : 1;
            }
            if (opacity === 0) {
                // if a transparent fill style is set, create an extra hit-detection image
                // with a default fill style
                var context = createCanvasContext2D(renderOptions.size, renderOptions.size);
                this.hitDetectionCanvas_ = context.canvas;
                this.drawHitDetectionCanvas_(renderOptions, context);
            }
        }
        if (!this.hitDetectionCanvas_) {
            this.hitDetectionCanvas_ = this.getImage(1);
        }
    };
    /**
     * @private
     * @param {CanvasRenderingContext2D} context The context to draw in.
     */
    RegularShape.prototype.createPath_ = function (context) {
        var points = this.points_;
        var radius = this.radius_;
        if (points === Infinity) {
            context.arc(0, 0, radius, 0, 2 * Math.PI);
        }
        else {
            var radius2 = this.radius2_ === undefined ? radius : this.radius2_;
            if (this.radius2_ !== undefined) {
                points *= 2;
            }
            var startAngle = this.angle_ - Math.PI / 2;
            var step = (2 * Math.PI) / points;
            for (var i = 0; i < points; i++) {
                var angle0 = startAngle + i * step;
                var radiusC = i % 2 === 0 ? radius : radius2;
                context.lineTo(radiusC * Math.cos(angle0), radiusC * Math.sin(angle0));
            }
            context.closePath();
        }
    };
    /**
     * @private
     * @param {RenderOptions} renderOptions Render options.
     * @param {CanvasRenderingContext2D} context The context.
     */
    RegularShape.prototype.drawHitDetectionCanvas_ = function (renderOptions, context) {
        // set origin to canvas center
        context.translate(renderOptions.size / 2, renderOptions.size / 2);
        this.createPath_(context);
        context.fillStyle = defaultFillStyle;
        context.fill();
        if (this.stroke_) {
            context.strokeStyle = renderOptions.strokeStyle;
            context.lineWidth = renderOptions.strokeWidth;
            if (renderOptions.lineDash) {
                context.setLineDash(renderOptions.lineDash);
                context.lineDashOffset = renderOptions.lineDashOffset;
            }
            context.lineJoin = renderOptions.lineJoin;
            context.miterLimit = renderOptions.miterLimit;
            context.stroke();
        }
    };
    return RegularShape;
}(ImageStyle));
export default RegularShape;
//# sourceMappingURL=RegularShape.js.map