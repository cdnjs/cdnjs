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
/**
 * @module ol/render/canvas/Builder
 */
import CanvasInstruction from './Instruction.js';
import Relationship from '../../extent/Relationship.js';
import VectorContext from '../VectorContext.js';
import { asColorLike } from '../../colorlike.js';
import { buffer, clone, containsCoordinate, coordinateRelationship, } from '../../extent.js';
import { defaultFillStyle, defaultLineCap, defaultLineDash, defaultLineDashOffset, defaultLineJoin, defaultLineWidth, defaultMiterLimit, defaultStrokeStyle, } from '../canvas.js';
import { equals, reverseSubArray } from '../../array.js';
import { inflateCoordinates, inflateCoordinatesArray, inflateMultiCoordinatesArray, } from '../../geom/flat/inflate.js';
var CanvasBuilder = /** @class */ (function (_super) {
    __extends(CanvasBuilder, _super);
    /**
     * @param {number} tolerance Tolerance.
     * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     */
    function CanvasBuilder(tolerance, maxExtent, resolution, pixelRatio) {
        var _this = _super.call(this) || this;
        /**
         * @protected
         * @type {number}
         */
        _this.tolerance = tolerance;
        /**
         * @protected
         * @const
         * @type {import("../../extent.js").Extent}
         */
        _this.maxExtent = maxExtent;
        /**
         * @protected
         * @type {number}
         */
        _this.pixelRatio = pixelRatio;
        /**
         * @protected
         * @type {number}
         */
        _this.maxLineWidth = 0;
        /**
         * @protected
         * @const
         * @type {number}
         */
        _this.resolution = resolution;
        /**
         * @private
         * @type {Array<*>}
         */
        _this.beginGeometryInstruction1_ = null;
        /**
         * @private
         * @type {Array<*>}
         */
        _this.beginGeometryInstruction2_ = null;
        /**
         * @private
         * @type {import("../../extent.js").Extent}
         */
        _this.bufferedMaxExtent_ = null;
        /**
         * @protected
         * @type {Array<*>}
         */
        _this.instructions = [];
        /**
         * @protected
         * @type {Array<number>}
         */
        _this.coordinates = [];
        /**
         * @private
         * @type {import("../../coordinate.js").Coordinate}
         */
        _this.tmpCoordinate_ = [];
        /**
         * @protected
         * @type {Array<*>}
         */
        _this.hitDetectionInstructions = [];
        /**
         * @protected
         * @type {import("../canvas.js").FillStrokeState}
         */
        _this.state = /** @type {import("../canvas.js").FillStrokeState} */ ({});
        return _this;
    }
    /**
     * @protected
     * @param {Array<number>} dashArray Dash array.
     * @return {Array<number>} Dash array with pixel ratio applied
     */
    CanvasBuilder.prototype.applyPixelRatio = function (dashArray) {
        var pixelRatio = this.pixelRatio;
        return pixelRatio == 1
            ? dashArray
            : dashArray.map(function (dash) {
                return dash * pixelRatio;
            });
    };
    /**
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} stride Stride.
     * @protected
     * @return {number} My end
     */
    CanvasBuilder.prototype.appendFlatPointCoordinates = function (flatCoordinates, stride) {
        var extent = this.getBufferedMaxExtent();
        var tmpCoord = this.tmpCoordinate_;
        var coordinates = this.coordinates;
        var myEnd = coordinates.length;
        for (var i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
            tmpCoord[0] = flatCoordinates[i];
            tmpCoord[1] = flatCoordinates[i + 1];
            if (containsCoordinate(extent, tmpCoord)) {
                coordinates[myEnd++] = tmpCoord[0];
                coordinates[myEnd++] = tmpCoord[1];
            }
        }
        return myEnd;
    };
    /**
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} offset Offset.
     * @param {number} end End.
     * @param {number} stride Stride.
     * @param {boolean} closed Last input coordinate equals first.
     * @param {boolean} skipFirst Skip first coordinate.
     * @protected
     * @return {number} My end.
     */
    CanvasBuilder.prototype.appendFlatLineCoordinates = function (flatCoordinates, offset, end, stride, closed, skipFirst) {
        var coordinates = this.coordinates;
        var myEnd = coordinates.length;
        var extent = this.getBufferedMaxExtent();
        if (skipFirst) {
            offset += stride;
        }
        var lastXCoord = flatCoordinates[offset];
        var lastYCoord = flatCoordinates[offset + 1];
        var nextCoord = this.tmpCoordinate_;
        var skipped = true;
        var i, lastRel, nextRel;
        for (i = offset + stride; i < end; i += stride) {
            nextCoord[0] = flatCoordinates[i];
            nextCoord[1] = flatCoordinates[i + 1];
            nextRel = coordinateRelationship(extent, nextCoord);
            if (nextRel !== lastRel) {
                if (skipped) {
                    coordinates[myEnd++] = lastXCoord;
                    coordinates[myEnd++] = lastYCoord;
                    skipped = false;
                }
                coordinates[myEnd++] = nextCoord[0];
                coordinates[myEnd++] = nextCoord[1];
            }
            else if (nextRel === Relationship.INTERSECTING) {
                coordinates[myEnd++] = nextCoord[0];
                coordinates[myEnd++] = nextCoord[1];
                skipped = false;
            }
            else {
                skipped = true;
            }
            lastXCoord = nextCoord[0];
            lastYCoord = nextCoord[1];
            lastRel = nextRel;
        }
        // Last coordinate equals first or only one point to append:
        if ((closed && skipped) || i === offset + stride) {
            coordinates[myEnd++] = lastXCoord;
            coordinates[myEnd++] = lastYCoord;
        }
        return myEnd;
    };
    /**
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} offset Offset.
     * @param {Array<number>} ends Ends.
     * @param {number} stride Stride.
     * @param {Array<number>} builderEnds Builder ends.
     * @return {number} Offset.
     */
    CanvasBuilder.prototype.drawCustomCoordinates_ = function (flatCoordinates, offset, ends, stride, builderEnds) {
        for (var i = 0, ii = ends.length; i < ii; ++i) {
            var end = ends[i];
            var builderEnd = this.appendFlatLineCoordinates(flatCoordinates, offset, end, stride, false, false);
            builderEnds.push(builderEnd);
            offset = end;
        }
        return offset;
    };
    /**
     * @param {import("../../geom/SimpleGeometry.js").default} geometry Geometry.
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     * @param {Function} renderer Renderer.
     * @param {Function} hitDetectionRenderer Renderer.
     */
    CanvasBuilder.prototype.drawCustom = function (geometry, feature, renderer, hitDetectionRenderer) {
        this.beginGeometry(geometry, feature);
        var type = geometry.getType();
        var stride = geometry.getStride();
        var builderBegin = this.coordinates.length;
        var flatCoordinates, builderEnd, builderEnds, builderEndss;
        var offset;
        switch (type) {
            case 'MultiPolygon':
                flatCoordinates =
                    /** @type {import("../../geom/MultiPolygon.js").default} */ (geometry).getOrientedFlatCoordinates();
                builderEndss = [];
                var endss = 
                /** @type {import("../../geom/MultiPolygon.js").default} */ (geometry).getEndss();
                offset = 0;
                for (var i = 0, ii = endss.length; i < ii; ++i) {
                    var myEnds = [];
                    offset = this.drawCustomCoordinates_(flatCoordinates, offset, endss[i], stride, myEnds);
                    builderEndss.push(myEnds);
                }
                this.instructions.push([
                    CanvasInstruction.CUSTOM,
                    builderBegin,
                    builderEndss,
                    geometry,
                    renderer,
                    inflateMultiCoordinatesArray,
                ]);
                this.hitDetectionInstructions.push([
                    CanvasInstruction.CUSTOM,
                    builderBegin,
                    builderEndss,
                    geometry,
                    hitDetectionRenderer || renderer,
                    inflateMultiCoordinatesArray,
                ]);
                break;
            case 'Polygon':
            case 'MultiLineString':
                builderEnds = [];
                flatCoordinates =
                    type == 'Polygon'
                        ? /** @type {import("../../geom/Polygon.js").default} */ (geometry).getOrientedFlatCoordinates()
                        : geometry.getFlatCoordinates();
                offset = this.drawCustomCoordinates_(flatCoordinates, 0, 
                /** @type {import("../../geom/Polygon.js").default|import("../../geom/MultiLineString.js").default} */ (geometry).getEnds(), stride, builderEnds);
                this.instructions.push([
                    CanvasInstruction.CUSTOM,
                    builderBegin,
                    builderEnds,
                    geometry,
                    renderer,
                    inflateCoordinatesArray,
                ]);
                this.hitDetectionInstructions.push([
                    CanvasInstruction.CUSTOM,
                    builderBegin,
                    builderEnds,
                    geometry,
                    hitDetectionRenderer || renderer,
                    inflateCoordinatesArray,
                ]);
                break;
            case 'LineString':
            case 'Circle':
                flatCoordinates = geometry.getFlatCoordinates();
                builderEnd = this.appendFlatLineCoordinates(flatCoordinates, 0, flatCoordinates.length, stride, false, false);
                this.instructions.push([
                    CanvasInstruction.CUSTOM,
                    builderBegin,
                    builderEnd,
                    geometry,
                    renderer,
                    inflateCoordinates,
                ]);
                this.hitDetectionInstructions.push([
                    CanvasInstruction.CUSTOM,
                    builderBegin,
                    builderEnd,
                    geometry,
                    hitDetectionRenderer || renderer,
                    inflateCoordinates,
                ]);
                break;
            case 'MultiPoint':
                flatCoordinates = geometry.getFlatCoordinates();
                builderEnd = this.appendFlatPointCoordinates(flatCoordinates, stride);
                if (builderEnd > builderBegin) {
                    this.instructions.push([
                        CanvasInstruction.CUSTOM,
                        builderBegin,
                        builderEnd,
                        geometry,
                        renderer,
                        inflateCoordinates,
                    ]);
                    this.hitDetectionInstructions.push([
                        CanvasInstruction.CUSTOM,
                        builderBegin,
                        builderEnd,
                        geometry,
                        hitDetectionRenderer || renderer,
                        inflateCoordinates,
                    ]);
                }
                break;
            case 'Point':
                flatCoordinates = geometry.getFlatCoordinates();
                this.coordinates.push(flatCoordinates[0], flatCoordinates[1]);
                builderEnd = this.coordinates.length;
                this.instructions.push([
                    CanvasInstruction.CUSTOM,
                    builderBegin,
                    builderEnd,
                    geometry,
                    renderer,
                ]);
                this.hitDetectionInstructions.push([
                    CanvasInstruction.CUSTOM,
                    builderBegin,
                    builderEnd,
                    geometry,
                    hitDetectionRenderer || renderer,
                ]);
                break;
            default:
        }
        this.endGeometry(feature);
    };
    /**
     * @protected
     * @param {import("../../geom/Geometry").default|import("../Feature.js").default} geometry The geometry.
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     */
    CanvasBuilder.prototype.beginGeometry = function (geometry, feature) {
        this.beginGeometryInstruction1_ = [
            CanvasInstruction.BEGIN_GEOMETRY,
            feature,
            0,
            geometry,
        ];
        this.instructions.push(this.beginGeometryInstruction1_);
        this.beginGeometryInstruction2_ = [
            CanvasInstruction.BEGIN_GEOMETRY,
            feature,
            0,
            geometry,
        ];
        this.hitDetectionInstructions.push(this.beginGeometryInstruction2_);
    };
    /**
     * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
     */
    CanvasBuilder.prototype.finish = function () {
        return {
            instructions: this.instructions,
            hitDetectionInstructions: this.hitDetectionInstructions,
            coordinates: this.coordinates,
        };
    };
    /**
     * Reverse the hit detection instructions.
     */
    CanvasBuilder.prototype.reverseHitDetectionInstructions = function () {
        var hitDetectionInstructions = this.hitDetectionInstructions;
        // step 1 - reverse array
        hitDetectionInstructions.reverse();
        // step 2 - reverse instructions within geometry blocks
        var i;
        var n = hitDetectionInstructions.length;
        var instruction;
        var type;
        var begin = -1;
        for (i = 0; i < n; ++i) {
            instruction = hitDetectionInstructions[i];
            type = /** @type {import("./Instruction.js").default} */ (instruction[0]);
            if (type == CanvasInstruction.END_GEOMETRY) {
                begin = i;
            }
            else if (type == CanvasInstruction.BEGIN_GEOMETRY) {
                instruction[2] = i;
                reverseSubArray(this.hitDetectionInstructions, begin, i);
                begin = -1;
            }
        }
    };
    /**
     * @param {import("../../style/Fill.js").default} fillStyle Fill style.
     * @param {import("../../style/Stroke.js").default} strokeStyle Stroke style.
     */
    CanvasBuilder.prototype.setFillStrokeStyle = function (fillStyle, strokeStyle) {
        var state = this.state;
        if (fillStyle) {
            var fillStyleColor = fillStyle.getColor();
            state.fillStyle = asColorLike(fillStyleColor ? fillStyleColor : defaultFillStyle);
        }
        else {
            state.fillStyle = undefined;
        }
        if (strokeStyle) {
            var strokeStyleColor = strokeStyle.getColor();
            state.strokeStyle = asColorLike(strokeStyleColor ? strokeStyleColor : defaultStrokeStyle);
            var strokeStyleLineCap = strokeStyle.getLineCap();
            state.lineCap =
                strokeStyleLineCap !== undefined ? strokeStyleLineCap : defaultLineCap;
            var strokeStyleLineDash = strokeStyle.getLineDash();
            state.lineDash = strokeStyleLineDash
                ? strokeStyleLineDash.slice()
                : defaultLineDash;
            var strokeStyleLineDashOffset = strokeStyle.getLineDashOffset();
            state.lineDashOffset = strokeStyleLineDashOffset
                ? strokeStyleLineDashOffset
                : defaultLineDashOffset;
            var strokeStyleLineJoin = strokeStyle.getLineJoin();
            state.lineJoin =
                strokeStyleLineJoin !== undefined
                    ? strokeStyleLineJoin
                    : defaultLineJoin;
            var strokeStyleWidth = strokeStyle.getWidth();
            state.lineWidth =
                strokeStyleWidth !== undefined ? strokeStyleWidth : defaultLineWidth;
            var strokeStyleMiterLimit = strokeStyle.getMiterLimit();
            state.miterLimit =
                strokeStyleMiterLimit !== undefined
                    ? strokeStyleMiterLimit
                    : defaultMiterLimit;
            if (state.lineWidth > this.maxLineWidth) {
                this.maxLineWidth = state.lineWidth;
                // invalidate the buffered max extent cache
                this.bufferedMaxExtent_ = null;
            }
        }
        else {
            state.strokeStyle = undefined;
            state.lineCap = undefined;
            state.lineDash = null;
            state.lineDashOffset = undefined;
            state.lineJoin = undefined;
            state.lineWidth = undefined;
            state.miterLimit = undefined;
        }
    };
    /**
     * @param {import("../canvas.js").FillStrokeState} state State.
     * @return {Array<*>} Fill instruction.
     */
    CanvasBuilder.prototype.createFill = function (state) {
        var fillStyle = state.fillStyle;
        /** @type {Array<*>} */
        var fillInstruction = [CanvasInstruction.SET_FILL_STYLE, fillStyle];
        if (typeof fillStyle !== 'string') {
            // Fill is a pattern or gradient - align it!
            fillInstruction.push(true);
        }
        return fillInstruction;
    };
    /**
     * @param {import("../canvas.js").FillStrokeState} state State.
     */
    CanvasBuilder.prototype.applyStroke = function (state) {
        this.instructions.push(this.createStroke(state));
    };
    /**
     * @param {import("../canvas.js").FillStrokeState} state State.
     * @return {Array<*>} Stroke instruction.
     */
    CanvasBuilder.prototype.createStroke = function (state) {
        return [
            CanvasInstruction.SET_STROKE_STYLE,
            state.strokeStyle,
            state.lineWidth * this.pixelRatio,
            state.lineCap,
            state.lineJoin,
            state.miterLimit,
            this.applyPixelRatio(state.lineDash),
            state.lineDashOffset * this.pixelRatio,
        ];
    };
    /**
     * @param {import("../canvas.js").FillStrokeState} state State.
     * @param {function(this:CanvasBuilder, import("../canvas.js").FillStrokeState):Array<*>} createFill Create fill.
     */
    CanvasBuilder.prototype.updateFillStyle = function (state, createFill) {
        var fillStyle = state.fillStyle;
        if (typeof fillStyle !== 'string' || state.currentFillStyle != fillStyle) {
            if (fillStyle !== undefined) {
                this.instructions.push(createFill.call(this, state));
            }
            state.currentFillStyle = fillStyle;
        }
    };
    /**
     * @param {import("../canvas.js").FillStrokeState} state State.
     * @param {function(this:CanvasBuilder, import("../canvas.js").FillStrokeState): void} applyStroke Apply stroke.
     */
    CanvasBuilder.prototype.updateStrokeStyle = function (state, applyStroke) {
        var strokeStyle = state.strokeStyle;
        var lineCap = state.lineCap;
        var lineDash = state.lineDash;
        var lineDashOffset = state.lineDashOffset;
        var lineJoin = state.lineJoin;
        var lineWidth = state.lineWidth;
        var miterLimit = state.miterLimit;
        if (state.currentStrokeStyle != strokeStyle ||
            state.currentLineCap != lineCap ||
            (lineDash != state.currentLineDash &&
                !equals(state.currentLineDash, lineDash)) ||
            state.currentLineDashOffset != lineDashOffset ||
            state.currentLineJoin != lineJoin ||
            state.currentLineWidth != lineWidth ||
            state.currentMiterLimit != miterLimit) {
            if (strokeStyle !== undefined) {
                applyStroke.call(this, state);
            }
            state.currentStrokeStyle = strokeStyle;
            state.currentLineCap = lineCap;
            state.currentLineDash = lineDash;
            state.currentLineDashOffset = lineDashOffset;
            state.currentLineJoin = lineJoin;
            state.currentLineWidth = lineWidth;
            state.currentMiterLimit = miterLimit;
        }
    };
    /**
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     */
    CanvasBuilder.prototype.endGeometry = function (feature) {
        this.beginGeometryInstruction1_[2] = this.instructions.length;
        this.beginGeometryInstruction1_ = null;
        this.beginGeometryInstruction2_[2] = this.hitDetectionInstructions.length;
        this.beginGeometryInstruction2_ = null;
        var endGeometryInstruction = [CanvasInstruction.END_GEOMETRY, feature];
        this.instructions.push(endGeometryInstruction);
        this.hitDetectionInstructions.push(endGeometryInstruction);
    };
    /**
     * Get the buffered rendering extent.  Rendering will be clipped to the extent
     * provided to the constructor.  To account for symbolizers that may intersect
     * this extent, we calculate a buffered extent (e.g. based on stroke width).
     * @return {import("../../extent.js").Extent} The buffered rendering extent.
     * @protected
     */
    CanvasBuilder.prototype.getBufferedMaxExtent = function () {
        if (!this.bufferedMaxExtent_) {
            this.bufferedMaxExtent_ = clone(this.maxExtent);
            if (this.maxLineWidth > 0) {
                var width = (this.resolution * (this.maxLineWidth + 1)) / 2;
                buffer(this.bufferedMaxExtent_, width, this.bufferedMaxExtent_);
            }
        }
        return this.bufferedMaxExtent_;
    };
    return CanvasBuilder;
}(VectorContext));
export default CanvasBuilder;
//# sourceMappingURL=Builder.js.map