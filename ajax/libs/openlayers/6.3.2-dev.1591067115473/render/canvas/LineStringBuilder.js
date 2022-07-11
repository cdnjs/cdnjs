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
 * @module ol/render/canvas/LineStringBuilder
 */
import CanvasBuilder from './Builder.js';
import CanvasInstruction, { beginPathInstruction, strokeInstruction, } from './Instruction.js';
var CanvasLineStringBuilder = /** @class */ (function (_super) {
    __extends(CanvasLineStringBuilder, _super);
    /**
     * @param {number} tolerance Tolerance.
     * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     */
    function CanvasLineStringBuilder(tolerance, maxExtent, resolution, pixelRatio) {
        return _super.call(this, tolerance, maxExtent, resolution, pixelRatio) || this;
    }
    /**
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} offset Offset.
     * @param {number} end End.
     * @param {number} stride Stride.
     * @private
     * @return {number} end.
     */
    CanvasLineStringBuilder.prototype.drawFlatCoordinates_ = function (flatCoordinates, offset, end, stride) {
        var myBegin = this.coordinates.length;
        var myEnd = this.appendFlatCoordinates(flatCoordinates, offset, end, stride, false, false);
        var moveToLineToInstruction = [
            CanvasInstruction.MOVE_TO_LINE_TO,
            myBegin,
            myEnd,
        ];
        this.instructions.push(moveToLineToInstruction);
        this.hitDetectionInstructions.push(moveToLineToInstruction);
        return end;
    };
    /**
     * @param {import("../../geom/LineString.js").default|import("../Feature.js").default} lineStringGeometry Line string geometry.
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     */
    CanvasLineStringBuilder.prototype.drawLineString = function (lineStringGeometry, feature) {
        var state = this.state;
        var strokeStyle = state.strokeStyle;
        var lineWidth = state.lineWidth;
        if (strokeStyle === undefined || lineWidth === undefined) {
            return;
        }
        this.updateStrokeStyle(state, this.applyStroke);
        this.beginGeometry(lineStringGeometry, feature);
        this.hitDetectionInstructions.push([
            CanvasInstruction.SET_STROKE_STYLE,
            state.strokeStyle,
            state.lineWidth,
            state.lineCap,
            state.lineJoin,
            state.miterLimit,
            state.lineDash,
            state.lineDashOffset,
        ], beginPathInstruction);
        var flatCoordinates = lineStringGeometry.getFlatCoordinates();
        var stride = lineStringGeometry.getStride();
        this.drawFlatCoordinates_(flatCoordinates, 0, flatCoordinates.length, stride);
        this.hitDetectionInstructions.push(strokeInstruction);
        this.endGeometry(feature);
    };
    /**
     * @param {import("../../geom/MultiLineString.js").default|import("../Feature.js").default} multiLineStringGeometry MultiLineString geometry.
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     */
    CanvasLineStringBuilder.prototype.drawMultiLineString = function (multiLineStringGeometry, feature) {
        var state = this.state;
        var strokeStyle = state.strokeStyle;
        var lineWidth = state.lineWidth;
        if (strokeStyle === undefined || lineWidth === undefined) {
            return;
        }
        this.updateStrokeStyle(state, this.applyStroke);
        this.beginGeometry(multiLineStringGeometry, feature);
        this.hitDetectionInstructions.push([
            CanvasInstruction.SET_STROKE_STYLE,
            state.strokeStyle,
            state.lineWidth,
            state.lineCap,
            state.lineJoin,
            state.miterLimit,
            state.lineDash,
            state.lineDashOffset,
        ], beginPathInstruction);
        var ends = multiLineStringGeometry.getEnds();
        var flatCoordinates = multiLineStringGeometry.getFlatCoordinates();
        var stride = multiLineStringGeometry.getStride();
        var offset = 0;
        for (var i = 0, ii = ends.length; i < ii; ++i) {
            offset = this.drawFlatCoordinates_(flatCoordinates, offset, 
            /** @type {number} */ (ends[i]), stride);
        }
        this.hitDetectionInstructions.push(strokeInstruction);
        this.endGeometry(feature);
    };
    /**
     * @return {import("./Builder.js").SerializableInstructions} the serializable instructions.
     */
    CanvasLineStringBuilder.prototype.finish = function () {
        var state = this.state;
        if (state.lastStroke != undefined &&
            state.lastStroke != this.coordinates.length) {
            this.instructions.push(strokeInstruction);
        }
        this.reverseHitDetectionInstructions();
        this.state = null;
        return _super.prototype.finish.call(this);
    };
    /**
     * @param {import("../canvas.js").FillStrokeState} state State.
     */
    CanvasLineStringBuilder.prototype.applyStroke = function (state) {
        if (state.lastStroke != undefined &&
            state.lastStroke != this.coordinates.length) {
            this.instructions.push(strokeInstruction);
            state.lastStroke = this.coordinates.length;
        }
        state.lastStroke = 0;
        _super.prototype.applyStroke.call(this, state);
        this.instructions.push(beginPathInstruction);
    };
    return CanvasLineStringBuilder;
}(CanvasBuilder));
export default CanvasLineStringBuilder;
//# sourceMappingURL=LineStringBuilder.js.map