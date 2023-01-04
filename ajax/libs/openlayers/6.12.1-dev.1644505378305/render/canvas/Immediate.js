/**
 * @module ol/render/canvas/Immediate
 */
// FIXME test, especially polygons with holes and multipolygons
// FIXME need to handle large thick features (where pixel size matters)
// FIXME add offset and end to ol/geom/flat/transform~transform2D?
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
import GeometryType from '../../geom/GeometryType.js';
import VectorContext from '../VectorContext.js';
import { asColorLike } from '../../colorlike.js';
import { compose as composeTransform, create as createTransform, } from '../../transform.js';
import { defaultFillStyle, defaultFont, defaultLineCap, defaultLineDash, defaultLineDashOffset, defaultLineJoin, defaultLineWidth, defaultMiterLimit, defaultStrokeStyle, defaultTextAlign, defaultTextBaseline, } from '../canvas.js';
import { equals } from '../../array.js';
import { intersects } from '../../extent.js';
import { transform2D } from '../../geom/flat/transform.js';
import { transformGeom2D } from '../../geom/SimpleGeometry.js';
/**
 * @classdesc
 * A concrete subclass of {@link module:ol/render/VectorContext VectorContext} that implements
 * direct rendering of features and geometries to an HTML5 Canvas context.
 * Instances of this class are created internally by the library and
 * provided to application code as vectorContext member of the
 * {@link module:ol/render/Event~RenderEvent RenderEvent} object associated with postcompose, precompose and
 * render events emitted by layers and maps.
 */
var CanvasImmediateRenderer = /** @class */ (function (_super) {
    __extends(CanvasImmediateRenderer, _super);
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../../extent.js").Extent} extent Extent.
     * @param {import("../../transform.js").Transform} transform Transform.
     * @param {number} viewRotation View rotation.
     * @param {number} [opt_squaredTolerance] Optional squared tolerance for simplification.
     * @param {import("../../proj.js").TransformFunction} [opt_userTransform] Transform from user to view projection.
     */
    function CanvasImmediateRenderer(context, pixelRatio, extent, transform, viewRotation, opt_squaredTolerance, opt_userTransform) {
        var _this = _super.call(this) || this;
        /**
         * @private
         * @type {CanvasRenderingContext2D}
         */
        _this.context_ = context;
        /**
         * @private
         * @type {number}
         */
        _this.pixelRatio_ = pixelRatio;
        /**
         * @private
         * @type {import("../../extent.js").Extent}
         */
        _this.extent_ = extent;
        /**
         * @private
         * @type {import("../../transform.js").Transform}
         */
        _this.transform_ = transform;
        /**
         * @private
         * @type {number}
         */
        _this.viewRotation_ = viewRotation;
        /**
         * @private
         * @type {number}
         */
        _this.squaredTolerance_ = opt_squaredTolerance;
        /**
         * @private
         * @type {import("../../proj.js").TransformFunction}
         */
        _this.userTransform_ = opt_userTransform;
        /**
         * @private
         * @type {?import("../canvas.js").FillState}
         */
        _this.contextFillState_ = null;
        /**
         * @private
         * @type {?import("../canvas.js").StrokeState}
         */
        _this.contextStrokeState_ = null;
        /**
         * @private
         * @type {?import("../canvas.js").TextState}
         */
        _this.contextTextState_ = null;
        /**
         * @private
         * @type {?import("../canvas.js").FillState}
         */
        _this.fillState_ = null;
        /**
         * @private
         * @type {?import("../canvas.js").StrokeState}
         */
        _this.strokeState_ = null;
        /**
         * @private
         * @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement}
         */
        _this.image_ = null;
        /**
         * @private
         * @type {number}
         */
        _this.imageAnchorX_ = 0;
        /**
         * @private
         * @type {number}
         */
        _this.imageAnchorY_ = 0;
        /**
         * @private
         * @type {number}
         */
        _this.imageHeight_ = 0;
        /**
         * @private
         * @type {number}
         */
        _this.imageOpacity_ = 0;
        /**
         * @private
         * @type {number}
         */
        _this.imageOriginX_ = 0;
        /**
         * @private
         * @type {number}
         */
        _this.imageOriginY_ = 0;
        /**
         * @private
         * @type {boolean}
         */
        _this.imageRotateWithView_ = false;
        /**
         * @private
         * @type {number}
         */
        _this.imageRotation_ = 0;
        /**
         * @private
         * @type {import("../../size.js").Size}
         */
        _this.imageScale_ = [0, 0];
        /**
         * @private
         * @type {number}
         */
        _this.imageWidth_ = 0;
        /**
         * @private
         * @type {string}
         */
        _this.text_ = '';
        /**
         * @private
         * @type {number}
         */
        _this.textOffsetX_ = 0;
        /**
         * @private
         * @type {number}
         */
        _this.textOffsetY_ = 0;
        /**
         * @private
         * @type {boolean}
         */
        _this.textRotateWithView_ = false;
        /**
         * @private
         * @type {number}
         */
        _this.textRotation_ = 0;
        /**
         * @private
         * @type {import("../../size.js").Size}
         */
        _this.textScale_ = [0, 0];
        /**
         * @private
         * @type {?import("../canvas.js").FillState}
         */
        _this.textFillState_ = null;
        /**
         * @private
         * @type {?import("../canvas.js").StrokeState}
         */
        _this.textStrokeState_ = null;
        /**
         * @private
         * @type {?import("../canvas.js").TextState}
         */
        _this.textState_ = null;
        /**
         * @private
         * @type {Array<number>}
         */
        _this.pixelCoordinates_ = [];
        /**
         * @private
         * @type {import("../../transform.js").Transform}
         */
        _this.tmpLocalTransform_ = createTransform();
        return _this;
    }
    /**
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} offset Offset.
     * @param {number} end End.
     * @param {number} stride Stride.
     * @private
     */
    CanvasImmediateRenderer.prototype.drawImages_ = function (flatCoordinates, offset, end, stride) {
        if (!this.image_) {
            return;
        }
        var pixelCoordinates = transform2D(flatCoordinates, offset, end, stride, this.transform_, this.pixelCoordinates_);
        var context = this.context_;
        var localTransform = this.tmpLocalTransform_;
        var alpha = context.globalAlpha;
        if (this.imageOpacity_ != 1) {
            context.globalAlpha = alpha * this.imageOpacity_;
        }
        var rotation = this.imageRotation_;
        if (this.imageRotateWithView_) {
            rotation += this.viewRotation_;
        }
        for (var i = 0, ii = pixelCoordinates.length; i < ii; i += 2) {
            var x = pixelCoordinates[i] - this.imageAnchorX_;
            var y = pixelCoordinates[i + 1] - this.imageAnchorY_;
            if (rotation !== 0 ||
                this.imageScale_[0] != 1 ||
                this.imageScale_[1] != 1) {
                var centerX = x + this.imageAnchorX_;
                var centerY = y + this.imageAnchorY_;
                composeTransform(localTransform, centerX, centerY, 1, 1, rotation, -centerX, -centerY);
                context.setTransform.apply(context, localTransform);
                context.translate(centerX, centerY);
                context.scale(this.imageScale_[0], this.imageScale_[1]);
                context.drawImage(this.image_, this.imageOriginX_, this.imageOriginY_, this.imageWidth_, this.imageHeight_, -this.imageAnchorX_, -this.imageAnchorY_, this.imageWidth_, this.imageHeight_);
                context.setTransform(1, 0, 0, 1, 0, 0);
            }
            else {
                context.drawImage(this.image_, this.imageOriginX_, this.imageOriginY_, this.imageWidth_, this.imageHeight_, x, y, this.imageWidth_, this.imageHeight_);
            }
        }
        if (this.imageOpacity_ != 1) {
            context.globalAlpha = alpha;
        }
    };
    /**
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} offset Offset.
     * @param {number} end End.
     * @param {number} stride Stride.
     * @private
     */
    CanvasImmediateRenderer.prototype.drawText_ = function (flatCoordinates, offset, end, stride) {
        if (!this.textState_ || this.text_ === '') {
            return;
        }
        if (this.textFillState_) {
            this.setContextFillState_(this.textFillState_);
        }
        if (this.textStrokeState_) {
            this.setContextStrokeState_(this.textStrokeState_);
        }
        this.setContextTextState_(this.textState_);
        var pixelCoordinates = transform2D(flatCoordinates, offset, end, stride, this.transform_, this.pixelCoordinates_);
        var context = this.context_;
        var rotation = this.textRotation_;
        if (this.textRotateWithView_) {
            rotation += this.viewRotation_;
        }
        for (; offset < end; offset += stride) {
            var x = pixelCoordinates[offset] + this.textOffsetX_;
            var y = pixelCoordinates[offset + 1] + this.textOffsetY_;
            if (rotation !== 0 ||
                this.textScale_[0] != 1 ||
                this.textScale_[1] != 1) {
                var localTransform = composeTransform(this.tmpLocalTransform_, x, y, 1, 1, rotation, -x, -y);
                context.setTransform.apply(context, localTransform);
                context.translate(x, y);
                context.scale(this.textScale_[0], this.textScale_[1]);
                if (this.textStrokeState_) {
                    context.strokeText(this.text_, 0, 0);
                }
                if (this.textFillState_) {
                    context.fillText(this.text_, 0, 0);
                }
                context.setTransform(1, 0, 0, 1, 0, 0);
            }
            else {
                if (this.textStrokeState_) {
                    context.strokeText(this.text_, x, y);
                }
                if (this.textFillState_) {
                    context.fillText(this.text_, x, y);
                }
            }
        }
    };
    /**
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} offset Offset.
     * @param {number} end End.
     * @param {number} stride Stride.
     * @param {boolean} close Close.
     * @private
     * @return {number} end End.
     */
    CanvasImmediateRenderer.prototype.moveToLineTo_ = function (flatCoordinates, offset, end, stride, close) {
        var context = this.context_;
        var pixelCoordinates = transform2D(flatCoordinates, offset, end, stride, this.transform_, this.pixelCoordinates_);
        context.moveTo(pixelCoordinates[0], pixelCoordinates[1]);
        var length = pixelCoordinates.length;
        if (close) {
            length -= 2;
        }
        for (var i = 2; i < length; i += 2) {
            context.lineTo(pixelCoordinates[i], pixelCoordinates[i + 1]);
        }
        if (close) {
            context.closePath();
        }
        return end;
    };
    /**
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} offset Offset.
     * @param {Array<number>} ends Ends.
     * @param {number} stride Stride.
     * @private
     * @return {number} End.
     */
    CanvasImmediateRenderer.prototype.drawRings_ = function (flatCoordinates, offset, ends, stride) {
        for (var i = 0, ii = ends.length; i < ii; ++i) {
            offset = this.moveToLineTo_(flatCoordinates, offset, ends[i], stride, true);
        }
        return offset;
    };
    /**
     * Render a circle geometry into the canvas.  Rendering is immediate and uses
     * the current fill and stroke styles.
     *
     * @param {import("../../geom/Circle.js").default} geometry Circle geometry.
     * @api
     */
    CanvasImmediateRenderer.prototype.drawCircle = function (geometry) {
        if (!intersects(this.extent_, geometry.getExtent())) {
            return;
        }
        if (this.fillState_ || this.strokeState_) {
            if (this.fillState_) {
                this.setContextFillState_(this.fillState_);
            }
            if (this.strokeState_) {
                this.setContextStrokeState_(this.strokeState_);
            }
            var pixelCoordinates = transformGeom2D(geometry, this.transform_, this.pixelCoordinates_);
            var dx = pixelCoordinates[2] - pixelCoordinates[0];
            var dy = pixelCoordinates[3] - pixelCoordinates[1];
            var radius = Math.sqrt(dx * dx + dy * dy);
            var context = this.context_;
            context.beginPath();
            context.arc(pixelCoordinates[0], pixelCoordinates[1], radius, 0, 2 * Math.PI);
            if (this.fillState_) {
                context.fill();
            }
            if (this.strokeState_) {
                context.stroke();
            }
        }
        if (this.text_ !== '') {
            this.drawText_(geometry.getCenter(), 0, 2, 2);
        }
    };
    /**
     * Set the rendering style.  Note that since this is an immediate rendering API,
     * any `zIndex` on the provided style will be ignored.
     *
     * @param {import("../../style/Style.js").default} style The rendering style.
     * @api
     */
    CanvasImmediateRenderer.prototype.setStyle = function (style) {
        this.setFillStrokeStyle(style.getFill(), style.getStroke());
        this.setImageStyle(style.getImage());
        this.setTextStyle(style.getText());
    };
    /**
     * @param {import("../../transform.js").Transform} transform Transform.
     */
    CanvasImmediateRenderer.prototype.setTransform = function (transform) {
        this.transform_ = transform;
    };
    /**
     * Render a geometry into the canvas.  Call
     * {@link module:ol/render/canvas/Immediate~CanvasImmediateRenderer#setStyle renderer.setStyle()} first to set the rendering style.
     *
     * @param {import("../../geom/Geometry.js").default|import("../Feature.js").default} geometry The geometry to render.
     * @api
     */
    CanvasImmediateRenderer.prototype.drawGeometry = function (geometry) {
        var type = geometry.getType();
        switch (type) {
            case GeometryType.POINT:
                this.drawPoint(
                /** @type {import("../../geom/Point.js").default} */ (geometry));
                break;
            case GeometryType.LINE_STRING:
                this.drawLineString(
                /** @type {import("../../geom/LineString.js").default} */ (geometry));
                break;
            case GeometryType.POLYGON:
                this.drawPolygon(
                /** @type {import("../../geom/Polygon.js").default} */ (geometry));
                break;
            case GeometryType.MULTI_POINT:
                this.drawMultiPoint(
                /** @type {import("../../geom/MultiPoint.js").default} */ (geometry));
                break;
            case GeometryType.MULTI_LINE_STRING:
                this.drawMultiLineString(
                /** @type {import("../../geom/MultiLineString.js").default} */ (geometry));
                break;
            case GeometryType.MULTI_POLYGON:
                this.drawMultiPolygon(
                /** @type {import("../../geom/MultiPolygon.js").default} */ (geometry));
                break;
            case GeometryType.GEOMETRY_COLLECTION:
                this.drawGeometryCollection(
                /** @type {import("../../geom/GeometryCollection.js").default} */ (geometry));
                break;
            case GeometryType.CIRCLE:
                this.drawCircle(
                /** @type {import("../../geom/Circle.js").default} */ (geometry));
                break;
            default:
        }
    };
    /**
     * Render a feature into the canvas.  Note that any `zIndex` on the provided
     * style will be ignored - features are rendered immediately in the order that
     * this method is called.  If you need `zIndex` support, you should be using an
     * {@link module:ol/layer/Vector~VectorLayer VectorLayer} instead.
     *
     * @param {import("../../Feature.js").default} feature Feature.
     * @param {import("../../style/Style.js").default} style Style.
     * @api
     */
    CanvasImmediateRenderer.prototype.drawFeature = function (feature, style) {
        var geometry = style.getGeometryFunction()(feature);
        if (!geometry || !intersects(this.extent_, geometry.getExtent())) {
            return;
        }
        this.setStyle(style);
        this.drawGeometry(geometry);
    };
    /**
     * Render a GeometryCollection to the canvas.  Rendering is immediate and
     * uses the current styles appropriate for each geometry in the collection.
     *
     * @param {import("../../geom/GeometryCollection.js").default} geometry Geometry collection.
     */
    CanvasImmediateRenderer.prototype.drawGeometryCollection = function (geometry) {
        var geometries = geometry.getGeometriesArray();
        for (var i = 0, ii = geometries.length; i < ii; ++i) {
            this.drawGeometry(geometries[i]);
        }
    };
    /**
     * Render a Point geometry into the canvas.  Rendering is immediate and uses
     * the current style.
     *
     * @param {import("../../geom/Point.js").default|import("../Feature.js").default} geometry Point geometry.
     */
    CanvasImmediateRenderer.prototype.drawPoint = function (geometry) {
        if (this.squaredTolerance_) {
            geometry = /** @type {import("../../geom/Point.js").default} */ (geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_));
        }
        var flatCoordinates = geometry.getFlatCoordinates();
        var stride = geometry.getStride();
        if (this.image_) {
            this.drawImages_(flatCoordinates, 0, flatCoordinates.length, stride);
        }
        if (this.text_ !== '') {
            this.drawText_(flatCoordinates, 0, flatCoordinates.length, stride);
        }
    };
    /**
     * Render a MultiPoint geometry  into the canvas.  Rendering is immediate and
     * uses the current style.
     *
     * @param {import("../../geom/MultiPoint.js").default|import("../Feature.js").default} geometry MultiPoint geometry.
     */
    CanvasImmediateRenderer.prototype.drawMultiPoint = function (geometry) {
        if (this.squaredTolerance_) {
            geometry = /** @type {import("../../geom/MultiPoint.js").default} */ (geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_));
        }
        var flatCoordinates = geometry.getFlatCoordinates();
        var stride = geometry.getStride();
        if (this.image_) {
            this.drawImages_(flatCoordinates, 0, flatCoordinates.length, stride);
        }
        if (this.text_ !== '') {
            this.drawText_(flatCoordinates, 0, flatCoordinates.length, stride);
        }
    };
    /**
     * Render a LineString into the canvas.  Rendering is immediate and uses
     * the current style.
     *
     * @param {import("../../geom/LineString.js").default|import("../Feature.js").default} geometry LineString geometry.
     */
    CanvasImmediateRenderer.prototype.drawLineString = function (geometry) {
        if (this.squaredTolerance_) {
            geometry = /** @type {import("../../geom/LineString.js").default} */ (geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_));
        }
        if (!intersects(this.extent_, geometry.getExtent())) {
            return;
        }
        if (this.strokeState_) {
            this.setContextStrokeState_(this.strokeState_);
            var context = this.context_;
            var flatCoordinates = geometry.getFlatCoordinates();
            context.beginPath();
            this.moveToLineTo_(flatCoordinates, 0, flatCoordinates.length, geometry.getStride(), false);
            context.stroke();
        }
        if (this.text_ !== '') {
            var flatMidpoint = geometry.getFlatMidpoint();
            this.drawText_(flatMidpoint, 0, 2, 2);
        }
    };
    /**
     * Render a MultiLineString geometry into the canvas.  Rendering is immediate
     * and uses the current style.
     *
     * @param {import("../../geom/MultiLineString.js").default|import("../Feature.js").default} geometry MultiLineString geometry.
     */
    CanvasImmediateRenderer.prototype.drawMultiLineString = function (geometry) {
        if (this.squaredTolerance_) {
            geometry =
                /** @type {import("../../geom/MultiLineString.js").default} */ (geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_));
        }
        var geometryExtent = geometry.getExtent();
        if (!intersects(this.extent_, geometryExtent)) {
            return;
        }
        if (this.strokeState_) {
            this.setContextStrokeState_(this.strokeState_);
            var context = this.context_;
            var flatCoordinates = geometry.getFlatCoordinates();
            var offset = 0;
            var ends = /** @type {Array<number>} */ (geometry.getEnds());
            var stride = geometry.getStride();
            context.beginPath();
            for (var i = 0, ii = ends.length; i < ii; ++i) {
                offset = this.moveToLineTo_(flatCoordinates, offset, ends[i], stride, false);
            }
            context.stroke();
        }
        if (this.text_ !== '') {
            var flatMidpoints = geometry.getFlatMidpoints();
            this.drawText_(flatMidpoints, 0, flatMidpoints.length, 2);
        }
    };
    /**
     * Render a Polygon geometry into the canvas.  Rendering is immediate and uses
     * the current style.
     *
     * @param {import("../../geom/Polygon.js").default|import("../Feature.js").default} geometry Polygon geometry.
     */
    CanvasImmediateRenderer.prototype.drawPolygon = function (geometry) {
        if (this.squaredTolerance_) {
            geometry = /** @type {import("../../geom/Polygon.js").default} */ (geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_));
        }
        if (!intersects(this.extent_, geometry.getExtent())) {
            return;
        }
        if (this.strokeState_ || this.fillState_) {
            if (this.fillState_) {
                this.setContextFillState_(this.fillState_);
            }
            if (this.strokeState_) {
                this.setContextStrokeState_(this.strokeState_);
            }
            var context = this.context_;
            context.beginPath();
            this.drawRings_(geometry.getOrientedFlatCoordinates(), 0, 
            /** @type {Array<number>} */ (geometry.getEnds()), geometry.getStride());
            if (this.fillState_) {
                context.fill();
            }
            if (this.strokeState_) {
                context.stroke();
            }
        }
        if (this.text_ !== '') {
            var flatInteriorPoint = geometry.getFlatInteriorPoint();
            this.drawText_(flatInteriorPoint, 0, 2, 2);
        }
    };
    /**
     * Render MultiPolygon geometry into the canvas.  Rendering is immediate and
     * uses the current style.
     * @param {import("../../geom/MultiPolygon.js").default} geometry MultiPolygon geometry.
     */
    CanvasImmediateRenderer.prototype.drawMultiPolygon = function (geometry) {
        if (this.squaredTolerance_) {
            geometry = /** @type {import("../../geom/MultiPolygon.js").default} */ (geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_));
        }
        if (!intersects(this.extent_, geometry.getExtent())) {
            return;
        }
        if (this.strokeState_ || this.fillState_) {
            if (this.fillState_) {
                this.setContextFillState_(this.fillState_);
            }
            if (this.strokeState_) {
                this.setContextStrokeState_(this.strokeState_);
            }
            var context = this.context_;
            var flatCoordinates = geometry.getOrientedFlatCoordinates();
            var offset = 0;
            var endss = geometry.getEndss();
            var stride = geometry.getStride();
            context.beginPath();
            for (var i = 0, ii = endss.length; i < ii; ++i) {
                var ends = endss[i];
                offset = this.drawRings_(flatCoordinates, offset, ends, stride);
            }
            if (this.fillState_) {
                context.fill();
            }
            if (this.strokeState_) {
                context.stroke();
            }
        }
        if (this.text_ !== '') {
            var flatInteriorPoints = geometry.getFlatInteriorPoints();
            this.drawText_(flatInteriorPoints, 0, flatInteriorPoints.length, 2);
        }
    };
    /**
     * @param {import("../canvas.js").FillState} fillState Fill state.
     * @private
     */
    CanvasImmediateRenderer.prototype.setContextFillState_ = function (fillState) {
        var context = this.context_;
        var contextFillState = this.contextFillState_;
        if (!contextFillState) {
            context.fillStyle = fillState.fillStyle;
            this.contextFillState_ = {
                fillStyle: fillState.fillStyle,
            };
        }
        else {
            if (contextFillState.fillStyle != fillState.fillStyle) {
                contextFillState.fillStyle = fillState.fillStyle;
                context.fillStyle = fillState.fillStyle;
            }
        }
    };
    /**
     * @param {import("../canvas.js").StrokeState} strokeState Stroke state.
     * @private
     */
    CanvasImmediateRenderer.prototype.setContextStrokeState_ = function (strokeState) {
        var context = this.context_;
        var contextStrokeState = this.contextStrokeState_;
        if (!contextStrokeState) {
            context.lineCap = strokeState.lineCap;
            if (context.setLineDash) {
                context.setLineDash(strokeState.lineDash);
                context.lineDashOffset = strokeState.lineDashOffset;
            }
            context.lineJoin = strokeState.lineJoin;
            context.lineWidth = strokeState.lineWidth;
            context.miterLimit = strokeState.miterLimit;
            context.strokeStyle = strokeState.strokeStyle;
            this.contextStrokeState_ = {
                lineCap: strokeState.lineCap,
                lineDash: strokeState.lineDash,
                lineDashOffset: strokeState.lineDashOffset,
                lineJoin: strokeState.lineJoin,
                lineWidth: strokeState.lineWidth,
                miterLimit: strokeState.miterLimit,
                strokeStyle: strokeState.strokeStyle,
            };
        }
        else {
            if (contextStrokeState.lineCap != strokeState.lineCap) {
                contextStrokeState.lineCap = strokeState.lineCap;
                context.lineCap = strokeState.lineCap;
            }
            if (context.setLineDash) {
                if (!equals(contextStrokeState.lineDash, strokeState.lineDash)) {
                    context.setLineDash((contextStrokeState.lineDash = strokeState.lineDash));
                }
                if (contextStrokeState.lineDashOffset != strokeState.lineDashOffset) {
                    contextStrokeState.lineDashOffset = strokeState.lineDashOffset;
                    context.lineDashOffset = strokeState.lineDashOffset;
                }
            }
            if (contextStrokeState.lineJoin != strokeState.lineJoin) {
                contextStrokeState.lineJoin = strokeState.lineJoin;
                context.lineJoin = strokeState.lineJoin;
            }
            if (contextStrokeState.lineWidth != strokeState.lineWidth) {
                contextStrokeState.lineWidth = strokeState.lineWidth;
                context.lineWidth = strokeState.lineWidth;
            }
            if (contextStrokeState.miterLimit != strokeState.miterLimit) {
                contextStrokeState.miterLimit = strokeState.miterLimit;
                context.miterLimit = strokeState.miterLimit;
            }
            if (contextStrokeState.strokeStyle != strokeState.strokeStyle) {
                contextStrokeState.strokeStyle = strokeState.strokeStyle;
                context.strokeStyle = strokeState.strokeStyle;
            }
        }
    };
    /**
     * @param {import("../canvas.js").TextState} textState Text state.
     * @private
     */
    CanvasImmediateRenderer.prototype.setContextTextState_ = function (textState) {
        var context = this.context_;
        var contextTextState = this.contextTextState_;
        var textAlign = textState.textAlign
            ? textState.textAlign
            : defaultTextAlign;
        if (!contextTextState) {
            context.font = textState.font;
            context.textAlign = /** @type {CanvasTextAlign} */ (textAlign);
            context.textBaseline = /** @type {CanvasTextBaseline} */ (textState.textBaseline);
            this.contextTextState_ = {
                font: textState.font,
                textAlign: textAlign,
                textBaseline: textState.textBaseline,
            };
        }
        else {
            if (contextTextState.font != textState.font) {
                contextTextState.font = textState.font;
                context.font = textState.font;
            }
            if (contextTextState.textAlign != textAlign) {
                contextTextState.textAlign = /** @type {CanvasTextAlign} */ (textAlign);
                context.textAlign = /** @type {CanvasTextAlign} */ (textAlign);
            }
            if (contextTextState.textBaseline != textState.textBaseline) {
                contextTextState.textBaseline = /** @type {CanvasTextBaseline} */ (textState.textBaseline);
                context.textBaseline = /** @type {CanvasTextBaseline} */ (textState.textBaseline);
            }
        }
    };
    /**
     * Set the fill and stroke style for subsequent draw operations.  To clear
     * either fill or stroke styles, pass null for the appropriate parameter.
     *
     * @param {import("../../style/Fill.js").default} fillStyle Fill style.
     * @param {import("../../style/Stroke.js").default} strokeStyle Stroke style.
     */
    CanvasImmediateRenderer.prototype.setFillStrokeStyle = function (fillStyle, strokeStyle) {
        var _this = this;
        if (!fillStyle) {
            this.fillState_ = null;
        }
        else {
            var fillStyleColor = fillStyle.getColor();
            this.fillState_ = {
                fillStyle: asColorLike(fillStyleColor ? fillStyleColor : defaultFillStyle),
            };
        }
        if (!strokeStyle) {
            this.strokeState_ = null;
        }
        else {
            var strokeStyleColor = strokeStyle.getColor();
            var strokeStyleLineCap = strokeStyle.getLineCap();
            var strokeStyleLineDash = strokeStyle.getLineDash();
            var strokeStyleLineDashOffset = strokeStyle.getLineDashOffset();
            var strokeStyleLineJoin = strokeStyle.getLineJoin();
            var strokeStyleWidth = strokeStyle.getWidth();
            var strokeStyleMiterLimit = strokeStyle.getMiterLimit();
            var lineDash = strokeStyleLineDash
                ? strokeStyleLineDash
                : defaultLineDash;
            this.strokeState_ = {
                lineCap: strokeStyleLineCap !== undefined
                    ? strokeStyleLineCap
                    : defaultLineCap,
                lineDash: this.pixelRatio_ === 1
                    ? lineDash
                    : lineDash.map(function (n) { return n * _this.pixelRatio_; }),
                lineDashOffset: (strokeStyleLineDashOffset
                    ? strokeStyleLineDashOffset
                    : defaultLineDashOffset) * this.pixelRatio_,
                lineJoin: strokeStyleLineJoin !== undefined
                    ? strokeStyleLineJoin
                    : defaultLineJoin,
                lineWidth: (strokeStyleWidth !== undefined
                    ? strokeStyleWidth
                    : defaultLineWidth) * this.pixelRatio_,
                miterLimit: strokeStyleMiterLimit !== undefined
                    ? strokeStyleMiterLimit
                    : defaultMiterLimit,
                strokeStyle: asColorLike(strokeStyleColor ? strokeStyleColor : defaultStrokeStyle),
            };
        }
    };
    /**
     * Set the image style for subsequent draw operations.  Pass null to remove
     * the image style.
     *
     * @param {import("../../style/Image.js").default} imageStyle Image style.
     */
    CanvasImmediateRenderer.prototype.setImageStyle = function (imageStyle) {
        var imageSize;
        if (!imageStyle || !(imageSize = imageStyle.getSize())) {
            this.image_ = null;
            return;
        }
        var imageAnchor = imageStyle.getAnchor();
        var imageOrigin = imageStyle.getOrigin();
        this.image_ = imageStyle.getImage(this.pixelRatio_);
        this.imageAnchorX_ = imageAnchor[0] * this.pixelRatio_;
        this.imageAnchorY_ = imageAnchor[1] * this.pixelRatio_;
        this.imageHeight_ = imageSize[1] * this.pixelRatio_;
        this.imageOpacity_ = imageStyle.getOpacity();
        this.imageOriginX_ = imageOrigin[0];
        this.imageOriginY_ = imageOrigin[1];
        this.imageRotateWithView_ = imageStyle.getRotateWithView();
        this.imageRotation_ = imageStyle.getRotation();
        this.imageScale_ = imageStyle.getScaleArray();
        this.imageWidth_ = imageSize[0] * this.pixelRatio_;
    };
    /**
     * Set the text style for subsequent draw operations.  Pass null to
     * remove the text style.
     *
     * @param {import("../../style/Text.js").default} textStyle Text style.
     */
    CanvasImmediateRenderer.prototype.setTextStyle = function (textStyle) {
        if (!textStyle) {
            this.text_ = '';
        }
        else {
            var textFillStyle = textStyle.getFill();
            if (!textFillStyle) {
                this.textFillState_ = null;
            }
            else {
                var textFillStyleColor = textFillStyle.getColor();
                this.textFillState_ = {
                    fillStyle: asColorLike(textFillStyleColor ? textFillStyleColor : defaultFillStyle),
                };
            }
            var textStrokeStyle = textStyle.getStroke();
            if (!textStrokeStyle) {
                this.textStrokeState_ = null;
            }
            else {
                var textStrokeStyleColor = textStrokeStyle.getColor();
                var textStrokeStyleLineCap = textStrokeStyle.getLineCap();
                var textStrokeStyleLineDash = textStrokeStyle.getLineDash();
                var textStrokeStyleLineDashOffset = textStrokeStyle.getLineDashOffset();
                var textStrokeStyleLineJoin = textStrokeStyle.getLineJoin();
                var textStrokeStyleWidth = textStrokeStyle.getWidth();
                var textStrokeStyleMiterLimit = textStrokeStyle.getMiterLimit();
                this.textStrokeState_ = {
                    lineCap: textStrokeStyleLineCap !== undefined
                        ? textStrokeStyleLineCap
                        : defaultLineCap,
                    lineDash: textStrokeStyleLineDash
                        ? textStrokeStyleLineDash
                        : defaultLineDash,
                    lineDashOffset: textStrokeStyleLineDashOffset
                        ? textStrokeStyleLineDashOffset
                        : defaultLineDashOffset,
                    lineJoin: textStrokeStyleLineJoin !== undefined
                        ? textStrokeStyleLineJoin
                        : defaultLineJoin,
                    lineWidth: textStrokeStyleWidth !== undefined
                        ? textStrokeStyleWidth
                        : defaultLineWidth,
                    miterLimit: textStrokeStyleMiterLimit !== undefined
                        ? textStrokeStyleMiterLimit
                        : defaultMiterLimit,
                    strokeStyle: asColorLike(textStrokeStyleColor ? textStrokeStyleColor : defaultStrokeStyle),
                };
            }
            var textFont = textStyle.getFont();
            var textOffsetX = textStyle.getOffsetX();
            var textOffsetY = textStyle.getOffsetY();
            var textRotateWithView = textStyle.getRotateWithView();
            var textRotation = textStyle.getRotation();
            var textScale = textStyle.getScaleArray();
            var textText = textStyle.getText();
            var textTextAlign = textStyle.getTextAlign();
            var textTextBaseline = textStyle.getTextBaseline();
            this.textState_ = {
                font: textFont !== undefined ? textFont : defaultFont,
                textAlign: textTextAlign !== undefined ? textTextAlign : defaultTextAlign,
                textBaseline: textTextBaseline !== undefined
                    ? textTextBaseline
                    : defaultTextBaseline,
            };
            this.text_ = textText !== undefined ? textText : '';
            this.textOffsetX_ =
                textOffsetX !== undefined ? this.pixelRatio_ * textOffsetX : 0;
            this.textOffsetY_ =
                textOffsetY !== undefined ? this.pixelRatio_ * textOffsetY : 0;
            this.textRotateWithView_ =
                textRotateWithView !== undefined ? textRotateWithView : false;
            this.textRotation_ = textRotation !== undefined ? textRotation : 0;
            this.textScale_ = [
                this.pixelRatio_ * textScale[0],
                this.pixelRatio_ * textScale[1],
            ];
        }
    };
    return CanvasImmediateRenderer;
}(VectorContext));
export default CanvasImmediateRenderer;
//# sourceMappingURL=Immediate.js.map