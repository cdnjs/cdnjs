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
/**
 * @module ol/render/canvas/Builder
 */
import { equals, reverseSubArray } from '../../array.js';
import { asColorLike } from '../../colorlike.js';
import { buffer, clone, coordinateRelationship } from '../../extent.js';
import Relationship from '../../extent/Relationship.js';
import GeometryType from '../../geom/GeometryType.js';
import { inflateCoordinates, inflateCoordinatesArray, inflateMultiCoordinatesArray } from '../../geom/flat/inflate.js';
import VectorContext from '../VectorContext.js';
import { defaultFillStyle, defaultStrokeStyle, defaultMiterLimit, defaultLineWidth, defaultLineJoin, defaultLineDashOffset, defaultLineDash, defaultLineCap } from '../canvas.js';
import CanvasInstruction from './Instruction.js';
/**
 * @typedef {Object} SerializableInstructions
 * @property {Array<*>} instructions The rendering instructions.
 * @property {Array<*>} hitDetectionInstructions The rendering hit detection instructions.
 * @property {Array<number>} coordinates The array of all coordinates.
 * @property {!Object<string, import("../canvas.js").TextState>} [textStates] The text states (decluttering).
 * @property {!Object<string, import("../canvas.js").FillState>} [fillStates] The fill states (decluttering).
 * @property {!Object<string, import("../canvas.js").StrokeState>} [strokeStates] The stroke states (decluttering).
 */
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
        return pixelRatio == 1 ? dashArray : dashArray.map(function (dash) {
            return dash * pixelRatio;
        });
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
    CanvasBuilder.prototype.appendFlatCoordinates = function (flatCoordinates, offset, end, stride, closed, skipFirst) {
        var myEnd = this.coordinates.length;
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
                    this.coordinates[myEnd++] = lastXCoord;
                    this.coordinates[myEnd++] = lastYCoord;
                }
                this.coordinates[myEnd++] = nextCoord[0];
                this.coordinates[myEnd++] = nextCoord[1];
                skipped = false;
            }
            else if (nextRel === Relationship.INTERSECTING) {
                this.coordinates[myEnd++] = nextCoord[0];
                this.coordinates[myEnd++] = nextCoord[1];
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
            this.coordinates[myEnd++] = lastXCoord;
            this.coordinates[myEnd++] = lastYCoord;
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
            var builderEnd = this.appendFlatCoordinates(flatCoordinates, offset, end, stride, false, false);
            builderEnds.push(builderEnd);
            offset = end;
        }
        return offset;
    };
    /**
     * @inheritDoc.
     */
    CanvasBuilder.prototype.drawCustom = function (geometry, feature, renderer) {
        this.beginGeometry(feature);
        var type = geometry.getType();
        var stride = geometry.getStride();
        var builderBegin = this.coordinates.length;
        var flatCoordinates, builderEnd, builderEnds, builderEndss;
        var offset;
        if (type == GeometryType.MULTI_POLYGON) {
            geometry = /** @type {import("../../geom/MultiPolygon.js").default} */ (geometry);
            flatCoordinates = geometry.getOrientedFlatCoordinates();
            builderEndss = [];
            var endss = geometry.getEndss();
            offset = 0;
            for (var i = 0, ii = endss.length; i < ii; ++i) {
                var myEnds = [];
                offset = this.drawCustomCoordinates_(flatCoordinates, offset, endss[i], stride, myEnds);
                builderEndss.push(myEnds);
            }
            this.instructions.push([CanvasInstruction.CUSTOM,
                builderBegin, builderEndss, geometry, renderer, inflateMultiCoordinatesArray]);
        }
        else if (type == GeometryType.POLYGON || type == GeometryType.MULTI_LINE_STRING) {
            builderEnds = [];
            flatCoordinates = (type == GeometryType.POLYGON) ?
                /** @type {import("../../geom/Polygon.js").default} */ (geometry).getOrientedFlatCoordinates() :
                geometry.getFlatCoordinates();
            offset = this.drawCustomCoordinates_(flatCoordinates, 0, 
            /** @type {import("../../geom/Polygon.js").default|import("../../geom/MultiLineString.js").default} */ (geometry).getEnds(), stride, builderEnds);
            this.instructions.push([CanvasInstruction.CUSTOM,
                builderBegin, builderEnds, geometry, renderer, inflateCoordinatesArray]);
        }
        else if (type == GeometryType.LINE_STRING || type == GeometryType.MULTI_POINT) {
            flatCoordinates = geometry.getFlatCoordinates();
            builderEnd = this.appendFlatCoordinates(flatCoordinates, 0, flatCoordinates.length, stride, false, false);
            this.instructions.push([CanvasInstruction.CUSTOM,
                builderBegin, builderEnd, geometry, renderer, inflateCoordinates]);
        }
        else if (type == GeometryType.POINT) {
            flatCoordinates = geometry.getFlatCoordinates();
            this.coordinates.push(flatCoordinates[0], flatCoordinates[1]);
            builderEnd = this.coordinates.length;
            this.instructions.push([CanvasInstruction.CUSTOM,
                builderBegin, builderEnd, geometry, renderer]);
        }
        this.endGeometry(feature);
    };
    /**
     * @protected
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     */
    CanvasBuilder.prototype.beginGeometry = function (feature) {
        this.beginGeometryInstruction1_ = [CanvasInstruction.BEGIN_GEOMETRY, feature, 0];
        this.instructions.push(this.beginGeometryInstruction1_);
        this.beginGeometryInstruction2_ = [CanvasInstruction.BEGIN_GEOMETRY, feature, 0];
        this.hitDetectionInstructions.push(this.beginGeometryInstruction2_);
    };
    /**
     * @return {SerializableInstructions} the serializable instructions.
     */
    CanvasBuilder.prototype.finish = function () {
        return {
            instructions: this.instructions,
            hitDetectionInstructions: this.hitDetectionInstructions,
            coordinates: this.coordinates
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
            type = /** @type {CanvasInstruction} */ (instruction[0]);
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
     * @inheritDoc
     */
    CanvasBuilder.prototype.setFillStrokeStyle = function (fillStyle, strokeStyle) {
        var state = this.state;
        if (fillStyle) {
            var fillStyleColor = fillStyle.getColor();
            state.fillStyle = asColorLike(fillStyleColor ?
                fillStyleColor : defaultFillStyle);
        }
        else {
            state.fillStyle = undefined;
        }
        if (strokeStyle) {
            var strokeStyleColor = strokeStyle.getColor();
            state.strokeStyle = asColorLike(strokeStyleColor ?
                strokeStyleColor : defaultStrokeStyle);
            var strokeStyleLineCap = strokeStyle.getLineCap();
            state.lineCap = strokeStyleLineCap !== undefined ?
                strokeStyleLineCap : defaultLineCap;
            var strokeStyleLineDash = strokeStyle.getLineDash();
            state.lineDash = strokeStyleLineDash ?
                strokeStyleLineDash.slice() : defaultLineDash;
            var strokeStyleLineDashOffset = strokeStyle.getLineDashOffset();
            state.lineDashOffset = strokeStyleLineDashOffset ?
                strokeStyleLineDashOffset : defaultLineDashOffset;
            var strokeStyleLineJoin = strokeStyle.getLineJoin();
            state.lineJoin = strokeStyleLineJoin !== undefined ?
                strokeStyleLineJoin : defaultLineJoin;
            var strokeStyleWidth = strokeStyle.getWidth();
            state.lineWidth = strokeStyleWidth !== undefined ?
                strokeStyleWidth : defaultLineWidth;
            var strokeStyleMiterLimit = strokeStyle.getMiterLimit();
            state.miterLimit = strokeStyleMiterLimit !== undefined ?
                strokeStyleMiterLimit : defaultMiterLimit;
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
            state.strokeStyle, state.lineWidth * this.pixelRatio, state.lineCap,
            state.lineJoin, state.miterLimit,
            this.applyPixelRatio(state.lineDash), state.lineDashOffset * this.pixelRatio
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
            (lineDash != state.currentLineDash && !equals(state.currentLineDash, lineDash)) ||
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
                var width = this.resolution * (this.maxLineWidth + 1) / 2;
                buffer(this.bufferedMaxExtent_, width, this.bufferedMaxExtent_);
            }
        }
        return this.bufferedMaxExtent_;
    };
    return CanvasBuilder;
}(VectorContext));
export default CanvasBuilder;
//# sourceMappingURL=Builder.js.map