/**
 * @module ol/style/RegularShape
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { asColorLike } from '../colorlike.js';
import { createCanvasContext2D } from '../dom.js';
import ImageState from '../ImageState.js';
import { defaultStrokeStyle, defaultFillStyle, defaultLineCap, defaultLineWidth, defaultLineJoin, defaultMiterLimit } from '../render/canvas.js';
import ImageStyle from './Image.js';
/**
 * Specify radius for regular polygons, or radius1 and radius2 for stars.
 * @typedef {Object} Options
 * @property {import("./Fill.js").default} [fill] Fill style.
 * @property {number} points Number of points for stars and regular polygons. In case of a polygon, the number of points
 * is the number of sides.
 * @property {number} [radius] Radius of a regular polygon.
 * @property {number} [radius1] Outer radius of a star.
 * @property {number} [radius2] Inner radius of a star.
 * @property {number} [angle=0] Shape's angle in radians. A value of 0 will have one of the shape's point facing up.
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {boolean} [rotateWithView=false] Whether to rotate the shape with the view.
 */
/**
 * @typedef {Object} RenderOptions
 * @property {import("../colorlike.js").ColorLike} [strokeStyle]
 * @property {number} strokeWidth
 * @property {number} size
 * @property {string} lineCap
 * @property {Array<number>} lineDash
 * @property {number} lineDashOffset
 * @property {string} lineJoin
 * @property {number} miterLimit
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
        var rotateWithView = options.rotateWithView !== undefined ?
            options.rotateWithView : false;
        _this = _super.call(this, {
            opacity: 1,
            rotateWithView: rotateWithView,
            rotation: options.rotation !== undefined ? options.rotation : 0,
            scale: 1
        }) || this;
        /**
         * @private
         * @type {HTMLCanvasElement}
         */
        _this.canvas_ = null;
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
        _this.radius_ = /** @type {number} */ (options.radius !== undefined ?
            options.radius : options.radius1);
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
         * @type {Array<number>}
         */
        _this.anchor_ = null;
        /**
         * @private
         * @type {import("../size.js").Size}
         */
        _this.size_ = null;
        /**
         * @private
         * @type {import("../size.js").Size}
         */
        _this.imageSize_ = null;
        /**
         * @private
         * @type {import("../size.js").Size}
         */
        _this.hitDetectionImageSize_ = null;
        _this.render_();
        return _this;
    }
    /**
     * Clones the style.
     * @return {RegularShape} The cloned style.
     * @api
     */
    RegularShape.prototype.clone = function () {
        var style = new RegularShape({
            fill: this.getFill() ? this.getFill().clone() : undefined,
            points: this.getPoints(),
            radius: this.getRadius(),
            radius2: this.getRadius2(),
            angle: this.getAngle(),
            stroke: this.getStroke() ? this.getStroke().clone() : undefined,
            rotation: this.getRotation(),
            rotateWithView: this.getRotateWithView()
        });
        style.setOpacity(this.getOpacity());
        style.setScale(this.getScale());
        return style;
    };
    /**
     * @inheritDoc
     * @api
     */
    RegularShape.prototype.getAnchor = function () {
        return this.anchor_;
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
     * @inheritDoc
     */
    RegularShape.prototype.getHitDetectionImage = function (pixelRatio) {
        return this.hitDetectionCanvas_;
    };
    /**
     * @inheritDoc
     * @api
     */
    RegularShape.prototype.getImage = function (pixelRatio) {
        return this.canvas_;
    };
    /**
     * @inheritDoc
     */
    RegularShape.prototype.getImageSize = function () {
        return this.imageSize_;
    };
    /**
     * @inheritDoc
     */
    RegularShape.prototype.getHitDetectionImageSize = function () {
        return this.hitDetectionImageSize_;
    };
    /**
     * @inheritDoc
     */
    RegularShape.prototype.getImageState = function () {
        return ImageState.LOADED;
    };
    /**
     * @inheritDoc
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
     * @inheritDoc
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
     * @inheritDoc
     */
    RegularShape.prototype.listenImageChange = function (listener, thisArg) {
        return undefined;
    };
    /**
     * @inheritDoc
     */
    RegularShape.prototype.load = function () { };
    /**
     * @inheritDoc
     */
    RegularShape.prototype.unlistenImageChange = function (listener, thisArg) { };
    /**
     * @protected
     */
    RegularShape.prototype.render_ = function () {
        var lineCap = '';
        var lineJoin = '';
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
            lineCap = this.stroke_.getLineCap();
            if (lineCap === undefined) {
                lineCap = defaultLineCap;
            }
            miterLimit = this.stroke_.getMiterLimit();
            if (miterLimit === undefined) {
                miterLimit = defaultMiterLimit;
            }
        }
        var size = 2 * (this.radius_ + strokeWidth) + 1;
        /** @type {RenderOptions} */
        var renderOptions = {
            strokeStyle: strokeStyle,
            strokeWidth: strokeWidth,
            size: size,
            lineCap: lineCap,
            lineDash: lineDash,
            lineDashOffset: lineDashOffset,
            lineJoin: lineJoin,
            miterLimit: miterLimit
        };
        var context = createCanvasContext2D(size, size);
        this.canvas_ = context.canvas;
        // canvas.width and height are rounded to the closest integer
        size = this.canvas_.width;
        var imageSize = size;
        this.draw_(renderOptions, context, 0, 0);
        this.createHitDetectionCanvas_(renderOptions);
        this.anchor_ = [size / 2, size / 2];
        this.size_ = [size, size];
        this.imageSize_ = [imageSize, imageSize];
    };
    /**
     * @private
     * @param {RenderOptions} renderOptions Render options.
     * @param {CanvasRenderingContext2D} context The rendering context.
     * @param {number} x The origin for the symbol (x).
     * @param {number} y The origin for the symbol (y).
     */
    RegularShape.prototype.draw_ = function (renderOptions, context, x, y) {
        var i, angle0, radiusC;
        // reset transform
        context.setTransform(1, 0, 0, 1, 0, 0);
        // then move to (x, y)
        context.translate(x, y);
        context.beginPath();
        var points = this.points_;
        if (points === Infinity) {
            context.arc(renderOptions.size / 2, renderOptions.size / 2, this.radius_, 0, 2 * Math.PI, true);
        }
        else {
            var radius2 = (this.radius2_ !== undefined) ? this.radius2_
                : this.radius_;
            if (radius2 !== this.radius_) {
                points = 2 * points;
            }
            for (i = 0; i <= points; i++) {
                angle0 = i * 2 * Math.PI / points - Math.PI / 2 + this.angle_;
                radiusC = i % 2 === 0 ? this.radius_ : radius2;
                context.lineTo(renderOptions.size / 2 + radiusC * Math.cos(angle0), renderOptions.size / 2 + radiusC * Math.sin(angle0));
            }
        }
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
            context.lineCap = /** @type {CanvasLineCap} */ (renderOptions.lineCap);
            context.lineJoin = /** @type {CanvasLineJoin} */ (renderOptions.lineJoin);
            context.miterLimit = renderOptions.miterLimit;
            context.stroke();
        }
        context.closePath();
    };
    /**
     * @private
     * @param {RenderOptions} renderOptions Render options.
     */
    RegularShape.prototype.createHitDetectionCanvas_ = function (renderOptions) {
        this.hitDetectionImageSize_ = [renderOptions.size, renderOptions.size];
        if (this.fill_) {
            this.hitDetectionCanvas_ = this.canvas_;
            return;
        }
        // if no fill style is set, create an extra hit-detection image with a
        // default fill style
        var context = createCanvasContext2D(renderOptions.size, renderOptions.size);
        this.hitDetectionCanvas_ = context.canvas;
        this.drawHitDetectionCanvas_(renderOptions, context, 0, 0);
    };
    /**
     * @private
     * @param {RenderOptions} renderOptions Render options.
     * @param {CanvasRenderingContext2D} context The context.
     * @param {number} x The origin for the symbol (x).
     * @param {number} y The origin for the symbol (y).
     */
    RegularShape.prototype.drawHitDetectionCanvas_ = function (renderOptions, context, x, y) {
        // reset transform
        context.setTransform(1, 0, 0, 1, 0, 0);
        // then move to (x, y)
        context.translate(x, y);
        context.beginPath();
        var points = this.points_;
        if (points === Infinity) {
            context.arc(renderOptions.size / 2, renderOptions.size / 2, this.radius_, 0, 2 * Math.PI, true);
        }
        else {
            var radius2 = (this.radius2_ !== undefined) ? this.radius2_
                : this.radius_;
            if (radius2 !== this.radius_) {
                points = 2 * points;
            }
            var i = void 0, radiusC = void 0, angle0 = void 0;
            for (i = 0; i <= points; i++) {
                angle0 = i * 2 * Math.PI / points - Math.PI / 2 + this.angle_;
                radiusC = i % 2 === 0 ? this.radius_ : radius2;
                context.lineTo(renderOptions.size / 2 + radiusC * Math.cos(angle0), renderOptions.size / 2 + radiusC * Math.sin(angle0));
            }
        }
        context.fillStyle = defaultFillStyle;
        context.fill();
        if (this.stroke_) {
            context.strokeStyle = renderOptions.strokeStyle;
            context.lineWidth = renderOptions.strokeWidth;
            if (renderOptions.lineDash) {
                context.setLineDash(renderOptions.lineDash);
                context.lineDashOffset = renderOptions.lineDashOffset;
            }
            context.stroke();
        }
        context.closePath();
    };
    return RegularShape;
}(ImageStyle));
export default RegularShape;
//# sourceMappingURL=RegularShape.js.map