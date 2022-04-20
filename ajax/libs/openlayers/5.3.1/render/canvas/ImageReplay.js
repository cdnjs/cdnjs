/**
 * @module ol/render/canvas/ImageReplay
 */
import CanvasInstruction from './Instruction.js';
import CanvasReplay from './Replay.js';

var CanvasImageReplay = /*@__PURE__*/(function (CanvasReplay) {
  function CanvasImageReplay(tolerance, maxExtent, resolution, pixelRatio, overlaps, declutterTree) {
    CanvasReplay.call(this, tolerance, maxExtent, resolution, pixelRatio, overlaps, declutterTree);

    /**
     * @private
     * @type {import("../canvas.js").DeclutterGroup}
     */
    this.declutterGroup_ = null;

    /**
     * @private
     * @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement}
     */
    this.hitDetectionImage_ = null;

    /**
     * @private
     * @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement}
     */
    this.image_ = null;

    /**
     * @private
     * @type {number|undefined}
     */
    this.anchorX_ = undefined;

    /**
     * @private
     * @type {number|undefined}
     */
    this.anchorY_ = undefined;

    /**
     * @private
     * @type {number|undefined}
     */
    this.height_ = undefined;

    /**
     * @private
     * @type {number|undefined}
     */
    this.opacity_ = undefined;

    /**
     * @private
     * @type {number|undefined}
     */
    this.originX_ = undefined;

    /**
     * @private
     * @type {number|undefined}
     */
    this.originY_ = undefined;

    /**
     * @private
     * @type {boolean|undefined}
     */
    this.rotateWithView_ = undefined;

    /**
     * @private
     * @type {number|undefined}
     */
    this.rotation_ = undefined;

    /**
     * @private
     * @type {number|undefined}
     */
    this.scale_ = undefined;

    /**
     * @private
     * @type {number|undefined}
     */
    this.width_ = undefined;

  }

  if ( CanvasReplay ) CanvasImageReplay.__proto__ = CanvasReplay;
  CanvasImageReplay.prototype = Object.create( CanvasReplay && CanvasReplay.prototype );
  CanvasImageReplay.prototype.constructor = CanvasImageReplay;

  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   * @return {number} My end.
   */
  CanvasImageReplay.prototype.drawCoordinates_ = function drawCoordinates_ (flatCoordinates, offset, end, stride) {
    return this.appendFlatCoordinates(flatCoordinates, offset, end, stride, false, false);
  };

  /**
   * @inheritDoc
   */
  CanvasImageReplay.prototype.drawPoint = function drawPoint (pointGeometry, feature) {
    if (!this.image_) {
      return;
    }
    this.beginGeometry(pointGeometry, feature);
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
    this.endGeometry(pointGeometry, feature);
  };

  /**
   * @inheritDoc
   */
  CanvasImageReplay.prototype.drawMultiPoint = function drawMultiPoint (multiPointGeometry, feature) {
    if (!this.image_) {
      return;
    }
    this.beginGeometry(multiPointGeometry, feature);
    var flatCoordinates = multiPointGeometry.getFlatCoordinates();
    var stride = multiPointGeometry.getStride();
    var myBegin = this.coordinates.length;
    var myEnd = this.drawCoordinates_(
      flatCoordinates, 0, flatCoordinates.length, stride);
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
    this.endGeometry(multiPointGeometry, feature);
  };

  /**
   * @inheritDoc
   */
  CanvasImageReplay.prototype.finish = function finish () {
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
  };

  /**
   * @inheritDoc
   */
  CanvasImageReplay.prototype.setImageStyle = function setImageStyle (imageStyle, declutterGroup) {
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

  return CanvasImageReplay;
}(CanvasReplay));


export default CanvasImageReplay;

//# sourceMappingURL=ImageReplay.js.map