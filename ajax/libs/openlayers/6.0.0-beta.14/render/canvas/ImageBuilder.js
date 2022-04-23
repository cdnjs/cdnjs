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
 * @module ol/render/canvas/ImageBuilder
 */
import CanvasInstruction from './Instruction.js';
import CanvasBuilder from './Builder.js';
var CanvasImageBuilder = /** @class */ (function (_super) {
    __extends(CanvasImageBuilder, _super);
    /**
     * @param {number} tolerance Tolerance.
     * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     */
    function CanvasImageBuilder(tolerance, maxExtent, resolution, pixelRatio) {
        var _this = _super.call(this, tolerance, maxExtent, resolution, pixelRatio) || this;
        /**
         * @private
         * @type {import("../canvas.js").DeclutterGroup}
         */
        _this.declutterGroup_ = null;
        /**
         * @private
         * @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement}
         */
        _this.hitDetectionImage_ = null;
        /**
         * @private
         * @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement}
         */
        _this.image_ = null;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.anchorX_ = undefined;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.anchorY_ = undefined;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.height_ = undefined;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.opacity_ = undefined;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.originX_ = undefined;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.originY_ = undefined;
        /**
         * @private
         * @type {boolean|undefined}
         */
        _this.rotateWithView_ = undefined;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.rotation_ = undefined;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.scale_ = undefined;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.width_ = undefined;
        return _this;
    }
    /**
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} offset Offset.
     * @param {number} end End.
     * @param {number} stride Stride.
     * @private
     * @return {number} My end.
     */
    CanvasImageBuilder.prototype.drawCoordinates_ = function (flatCoordinates, offset, end, stride) {
        return this.appendFlatCoordinates(flatCoordinates, offset, end, stride, false, false);
    };
    /**
     * @inheritDoc
     */
    CanvasImageBuilder.prototype.drawPoint = function (pointGeometry, feature) {
        if (!this.image_) {
            return;
        }
        this.beginGeometry(feature);
        var flatCoordinates = pointGeometry.getFlatCoordinates();
        var stride = pointGeometry.getStride();
        var myBegin = this.coordinates.length;
        var myEnd = this.drawCoordinates_(flatCoordinates, 0, flatCoordinates.length, stride);
        this.instructions.push([
            CanvasInstruction.DRAW_IMAGE, myBegin, myEnd, this.image_,
            // Remaining arguments to DRAW_IMAGE are in alphabetical order
            this.anchorX_, this.anchorY_, this.declutterGroup_, this.height_, this.opacity_,
            this.originX_, this.originY_, this.rotateWithView_, this.rotation_,
            this.scale_ * this.pixelRatio, this.width_
        ]);
        this.hitDetectionInstructions.push([
            CanvasInstruction.DRAW_IMAGE, myBegin, myEnd, this.hitDetectionImage_,
            // Remaining arguments to DRAW_IMAGE are in alphabetical order
            this.anchorX_, this.anchorY_, this.declutterGroup_, this.height_, this.opacity_,
            this.originX_, this.originY_, this.rotateWithView_, this.rotation_,
            this.scale_, this.width_
        ]);
        this.endGeometry(feature);
    };
    /**
     * @inheritDoc
     */
    CanvasImageBuilder.prototype.drawMultiPoint = function (multiPointGeometry, feature) {
        if (!this.image_) {
            return;
        }
        this.beginGeometry(feature);
        var flatCoordinates = multiPointGeometry.getFlatCoordinates();
        var stride = multiPointGeometry.getStride();
        var myBegin = this.coordinates.length;
        var myEnd = this.drawCoordinates_(flatCoordinates, 0, flatCoordinates.length, stride);
        this.instructions.push([
            CanvasInstruction.DRAW_IMAGE, myBegin, myEnd, this.image_,
            // Remaining arguments to DRAW_IMAGE are in alphabetical order
            this.anchorX_, this.anchorY_, this.declutterGroup_, this.height_, this.opacity_,
            this.originX_, this.originY_, this.rotateWithView_, this.rotation_,
            this.scale_ * this.pixelRatio, this.width_
        ]);
        this.hitDetectionInstructions.push([
            CanvasInstruction.DRAW_IMAGE, myBegin, myEnd, this.hitDetectionImage_,
            // Remaining arguments to DRAW_IMAGE are in alphabetical order
            this.anchorX_, this.anchorY_, this.declutterGroup_, this.height_, this.opacity_,
            this.originX_, this.originY_, this.rotateWithView_, this.rotation_,
            this.scale_, this.width_
        ]);
        this.endGeometry(feature);
    };
    /**
     * @inheritDoc
     */
    CanvasImageBuilder.prototype.finish = function () {
        this.reverseHitDetectionInstructions();
        // FIXME this doesn't really protect us against further calls to draw*Geometry
        this.anchorX_ = undefined;
        this.anchorY_ = undefined;
        this.hitDetectionImage_ = null;
        this.image_ = null;
        this.height_ = undefined;
        this.scale_ = undefined;
        this.opacity_ = undefined;
        this.originX_ = undefined;
        this.originY_ = undefined;
        this.rotateWithView_ = undefined;
        this.rotation_ = undefined;
        this.width_ = undefined;
        return _super.prototype.finish.call(this);
    };
    /**
     * @inheritDoc
     */
    CanvasImageBuilder.prototype.setImageStyle = function (imageStyle, declutterGroup) {
        var anchor = imageStyle.getAnchor();
        var size = imageStyle.getSize();
        var hitDetectionImage = imageStyle.getHitDetectionImage(1);
        var image = imageStyle.getImage(1);
        var origin = imageStyle.getOrigin();
        this.anchorX_ = anchor[0];
        this.anchorY_ = anchor[1];
        this.declutterGroup_ = /** @type {import("../canvas.js").DeclutterGroup} */ (declutterGroup);
        this.hitDetectionImage_ = hitDetectionImage;
        this.image_ = image;
        this.height_ = size[1];
        this.opacity_ = imageStyle.getOpacity();
        this.originX_ = origin[0];
        this.originY_ = origin[1];
        this.rotateWithView_ = imageStyle.getRotateWithView();
        this.rotation_ = imageStyle.getRotation();
        this.scale_ = imageStyle.getScale();
        this.width_ = size[0];
    };
    return CanvasImageBuilder;
}(CanvasBuilder));
export default CanvasImageBuilder;
//# sourceMappingURL=ImageBuilder.js.map