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
 * @module ol/render/canvas/PolygonBuilder
 */
import { snap } from '../../geom/flat/simplify.js';
import { defaultFillStyle } from '../canvas.js';
import CanvasInstruction, { fillInstruction, strokeInstruction, beginPathInstruction, closePathInstruction } from './Instruction.js';
import CanvasBuilder from './Builder.js';
var CanvasPolygonBuilder = /** @class */ (function (_super) {
    __extends(CanvasPolygonBuilder, _super);
    /**
     * @param {number} tolerance Tolerance.
     * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     */
    function CanvasPolygonBuilder(tolerance, maxExtent, resolution, pixelRatio) {
        return _super.call(this, tolerance, maxExtent, resolution, pixelRatio) || this;
    }
    /**
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} offset Offset.
     * @param {Array<number>} ends Ends.
     * @param {number} stride Stride.
     * @private
     * @return {number} End.
     */
    CanvasPolygonBuilder.prototype.drawFlatCoordinatess_ = function (flatCoordinates, offset, ends, stride) {
        var state = this.state;
        var fill = state.fillStyle !== undefined;
        var stroke = state.strokeStyle != undefined;
        var numEnds = ends.length;
        this.instructions.push(beginPathInstruction);
        this.hitDetectionInstructions.push(beginPathInstruction);
        for (var i = 0; i < numEnds; ++i) {
            var end = ends[i];
            var myBegin = this.coordinates.length;
            var myEnd = this.appendFlatCoordinates(flatCoordinates, offset, end, stride, true, !stroke);
            var moveToLineToInstruction = [CanvasInstruction.MOVE_TO_LINE_TO, myBegin, myEnd];
            this.instructions.push(moveToLineToInstruction);
            this.hitDetectionInstructions.push(moveToLineToInstruction);
            if (stroke) {
                // Performance optimization: only call closePath() when we have a stroke.
                // Otherwise the ring is closed already (see appendFlatCoordinates above).
                this.instructions.push(closePathInstruction);
                this.hitDetectionInstructions.push(closePathInstruction);
            }
            offset = end;
        }
        if (fill) {
            this.instructions.push(fillInstruction);
            this.hitDetectionInstructions.push(fillInstruction);
        }
        if (stroke) {
            this.instructions.push(strokeInstruction);
            this.hitDetectionInstructions.push(strokeInstruction);
        }
        return offset;
    };
    /**
     * @inheritDoc
     */
    CanvasPolygonBuilder.prototype.drawCircle = function (circleGeometry, feature) {
        var state = this.state;
        var fillStyle = state.fillStyle;
        var strokeStyle = state.strokeStyle;
        if (fillStyle === undefined && strokeStyle === undefined) {
            return;
        }
        this.setFillStrokeStyles_();
        this.beginGeometry(feature);
        if (state.fillStyle !== undefined) {
            this.hitDetectionInstructions.push([
                CanvasInstruction.SET_FILL_STYLE,
                defaultFillStyle
            ]);
        }
        if (state.strokeStyle !== undefined) {
            this.hitDetectionInstructions.push([
                CanvasInstruction.SET_STROKE_STYLE,
                state.strokeStyle, state.lineWidth, state.lineCap, state.lineJoin,
                state.miterLimit, state.lineDash, state.lineDashOffset
            ]);
        }
        var flatCoordinates = circleGeometry.getFlatCoordinates();
        var stride = circleGeometry.getStride();
        var myBegin = this.coordinates.length;
        this.appendFlatCoordinates(flatCoordinates, 0, flatCoordinates.length, stride, false, false);
        var circleInstruction = [CanvasInstruction.CIRCLE, myBegin];
        this.instructions.push(beginPathInstruction, circleInstruction);
        this.hitDetectionInstructions.push(beginPathInstruction, circleInstruction);
        this.hitDetectionInstructions.push(fillInstruction);
        if (state.fillStyle !== undefined) {
            this.instructions.push(fillInstruction);
        }
        if (state.strokeStyle !== undefined) {
            this.instructions.push(strokeInstruction);
            this.hitDetectionInstructions.push(strokeInstruction);
        }
        this.endGeometry(feature);
    };
    /**
     * @inheritDoc
     */
    CanvasPolygonBuilder.prototype.drawPolygon = function (polygonGeometry, feature) {
        var state = this.state;
        var fillStyle = state.fillStyle;
        var strokeStyle = state.strokeStyle;
        if (fillStyle === undefined && strokeStyle === undefined) {
            return;
        }
        this.setFillStrokeStyles_();
        this.beginGeometry(feature);
        if (state.fillStyle !== undefined) {
            this.hitDetectionInstructions.push([
                CanvasInstruction.SET_FILL_STYLE,
                defaultFillStyle
            ]);
        }
        if (state.strokeStyle !== undefined) {
            this.hitDetectionInstructions.push([
                CanvasInstruction.SET_STROKE_STYLE,
                state.strokeStyle, state.lineWidth, state.lineCap, state.lineJoin,
                state.miterLimit, state.lineDash, state.lineDashOffset
            ]);
        }
        var ends = polygonGeometry.getEnds();
        var flatCoordinates = polygonGeometry.getOrientedFlatCoordinates();
        var stride = polygonGeometry.getStride();
        this.drawFlatCoordinatess_(flatCoordinates, 0, ends, stride);
        this.endGeometry(feature);
    };
    /**
     * @inheritDoc
     */
    CanvasPolygonBuilder.prototype.drawMultiPolygon = function (multiPolygonGeometry, feature) {
        var state = this.state;
        var fillStyle = state.fillStyle;
        var strokeStyle = state.strokeStyle;
        if (fillStyle === undefined && strokeStyle === undefined) {
            return;
        }
        this.setFillStrokeStyles_();
        this.beginGeometry(feature);
        if (state.fillStyle !== undefined) {
            this.hitDetectionInstructions.push([
                CanvasInstruction.SET_FILL_STYLE,
                defaultFillStyle
            ]);
        }
        if (state.strokeStyle !== undefined) {
            this.hitDetectionInstructions.push([
                CanvasInstruction.SET_STROKE_STYLE,
                state.strokeStyle, state.lineWidth, state.lineCap, state.lineJoin,
                state.miterLimit, state.lineDash, state.lineDashOffset
            ]);
        }
        var endss = multiPolygonGeometry.getEndss();
        var flatCoordinates = multiPolygonGeometry.getOrientedFlatCoordinates();
        var stride = multiPolygonGeometry.getStride();
        var offset = 0;
        for (var i = 0, ii = endss.length; i < ii; ++i) {
            offset = this.drawFlatCoordinatess_(flatCoordinates, offset, endss[i], stride);
        }
        this.endGeometry(feature);
    };
    /**
     * @inheritDoc
     */
    CanvasPolygonBuilder.prototype.finish = function () {
        this.reverseHitDetectionInstructions();
        this.state = null;
        // We want to preserve topology when drawing polygons.  Polygons are
        // simplified using quantization and point elimination. However, we might
        // have received a mix of quantized and non-quantized geometries, so ensure
        // that all are quantized by quantizing all coordinates in the batch.
        var tolerance = this.tolerance;
        if (tolerance !== 0) {
            var coordinates = this.coordinates;
            for (var i = 0, ii = coordinates.length; i < ii; ++i) {
                coordinates[i] = snap(coordinates[i], tolerance);
            }
        }
        return _super.prototype.finish.call(this);
    };
    /**
     * @private
     */
    CanvasPolygonBuilder.prototype.setFillStrokeStyles_ = function () {
        var state = this.state;
        var fillStyle = state.fillStyle;
        if (fillStyle !== undefined) {
            this.updateFillStyle(state, this.createFill);
        }
        if (state.strokeStyle !== undefined) {
            this.updateStrokeStyle(state, this.applyStroke);
        }
    };
    return CanvasPolygonBuilder;
}(CanvasBuilder));
export default CanvasPolygonBuilder;
//# sourceMappingURL=PolygonBuilder.js.map