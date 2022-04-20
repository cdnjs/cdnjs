/**
 * @module ol/render/webgl/ImageReplay
 */
import {getUid} from '../../util.js';
import WebGLTextureReplay from './TextureReplay.js';
import WebGLBuffer from '../../webgl/Buffer.js';

var WebGLImageReplay = /*@__PURE__*/(function (WebGLTextureReplay) {
  function WebGLImageReplay(tolerance, maxExtent) {
    WebGLTextureReplay.call(this, tolerance, maxExtent);

    /**
     * @type {Array<HTMLCanvasElement|HTMLImageElement|HTMLVideoElement>}
     * @protected
     */
    this.images_ = [];

    /**
     * @type {Array<HTMLCanvasElement|HTMLImageElement|HTMLVideoElement>}
     * @protected
     */
    this.hitDetectionImages_ = [];

    /**
     * @type {Array<WebGLTexture>}
     * @private
     */
    this.textures_ = [];

    /**
     * @type {Array<WebGLTexture>}
     * @private
     */
    this.hitDetectionTextures_ = [];

  }

  if ( WebGLTextureReplay ) WebGLImageReplay.__proto__ = WebGLTextureReplay;
  WebGLImageReplay.prototype = Object.create( WebGLTextureReplay && WebGLTextureReplay.prototype );
  WebGLImageReplay.prototype.constructor = WebGLImageReplay;

  /**
   * @inheritDoc
   */
  WebGLImageReplay.prototype.drawMultiPoint = function drawMultiPoint (multiPointGeometry, feature) {
    this.startIndices.push(this.indices.length);
    this.startIndicesFeature.push(feature);
    var flatCoordinates = multiPointGeometry.getFlatCoordinates();
    var stride = multiPointGeometry.getStride();
    this.drawCoordinates(
      flatCoordinates, 0, flatCoordinates.length, stride);
  };

  /**
   * @inheritDoc
   */
  WebGLImageReplay.prototype.drawPoint = function drawPoint (pointGeometry, feature) {
    this.startIndices.push(this.indices.length);
    this.startIndicesFeature.push(feature);
    var flatCoordinates = pointGeometry.getFlatCoordinates();
    var stride = pointGeometry.getStride();
    this.drawCoordinates(
      flatCoordinates, 0, flatCoordinates.length, stride);
  };

  /**
   * @inheritDoc
   */
  WebGLImageReplay.prototype.finish = function finish (context) {
    var gl = context.getGL();

    this.groupIndices.push(this.indices.length);
    this.hitDetectionGroupIndices.push(this.indices.length);

    // create, bind, and populate the vertices buffer
    this.verticesBuffer = new WebGLBuffer(this.vertices);

    var indices = this.indices;

    // create, bind, and populate the indices buffer
    this.indicesBuffer = new WebGLBuffer(indices);

    // create textures
    /** @type {Object<string, WebGLTexture>} */
    var texturePerImage = {};

    this.createTextures(this.textures_, this.images_, texturePerImage, gl);

    this.createTextures(this.hitDetectionTextures_, this.hitDetectionImages_,
      texturePerImage, gl);

    this.images_ = null;
    this.hitDetectionImages_ = null;
    WebGLTextureReplay.prototype.finish.call(this, context);
  };

  /**
   * @inheritDoc
   */
  WebGLImageReplay.prototype.setImageStyle = function setImageStyle (imageStyle) {
    var anchor = imageStyle.getAnchor();
    var image = imageStyle.getImage(1);
    var imageSize = imageStyle.getImageSize();
    var hitDetectionImage = imageStyle.getHitDetectionImage(1);
    var opacity = imageStyle.getOpacity();
    var origin = imageStyle.getOrigin();
    var rotateWithView = imageStyle.getRotateWithView();
    var rotation = imageStyle.getRotation();
    var size = imageStyle.getSize();
    var scale = imageStyle.getScale();

    var currentImage;
    if (this.images_.length === 0) {
      this.images_.push(image);
    } else {
      currentImage = this.images_[this.images_.length - 1];
      if (getUid(currentImage) != getUid(image)) {
        this.groupIndices.push(this.indices.length);
        this.images_.push(image);
      }
    }

    if (this.hitDetectionImages_.length === 0) {
      this.hitDetectionImages_.push(hitDetectionImage);
    } else {
      currentImage =
          this.hitDetectionImages_[this.hitDetectionImages_.length - 1];
      if (getUid(currentImage) != getUid(hitDetectionImage)) {
        this.hitDetectionGroupIndices.push(this.indices.length);
        this.hitDetectionImages_.push(hitDetectionImage);
      }
    }

    this.anchorX = anchor[0];
    this.anchorY = anchor[1];
    this.height = size[1];
    this.imageHeight = imageSize[1];
    this.imageWidth = imageSize[0];
    this.opacity = opacity;
    this.originX = origin[0];
    this.originY = origin[1];
    this.rotation = rotation;
    this.rotateWithView = rotateWithView;
    this.scale = scale;
    this.width = size[0];
  };

  /**
   * @inheritDoc
   */
  WebGLImageReplay.prototype.getTextures = function getTextures (opt_all) {
    return opt_all ? this.textures_.concat(this.hitDetectionTextures_) : this.textures_;
  };

  /**
   * @inheritDoc
   */
  WebGLImageReplay.prototype.getHitDetectionTextures = function getHitDetectionTextures () {
    return this.hitDetectionTextures_;
  };

  return WebGLImageReplay;
}(WebGLTextureReplay));


export default WebGLImageReplay;

//# sourceMappingURL=ImageReplay.js.map