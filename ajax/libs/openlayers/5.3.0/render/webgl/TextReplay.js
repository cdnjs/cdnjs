/**
 * @module ol/render/webgl/TextReplay
 */
import {getUid} from '../../util.js';
import {asColorLike} from '../../colorlike.js';
import {createCanvasContext2D} from '../../dom.js';
import GeometryType from '../../geom/GeometryType.js';
import {CANVAS_LINE_DASH} from '../../has.js';
import {TEXT_ALIGN} from '../replay.js';
import {DEFAULT_FILLSTYLE, DEFAULT_FONT, DEFAULT_LINECAP, DEFAULT_LINEDASH,
  DEFAULT_LINEDASHOFFSET, DEFAULT_LINEJOIN, DEFAULT_LINEWIDTH, DEFAULT_MITERLIMIT,
  DEFAULT_STROKESTYLE, DEFAULT_TEXTALIGN, DEFAULT_TEXTBASELINE} from '../webgl.js';
import WebGLTextureReplay from './TextureReplay.js';
import AtlasManager from '../../style/AtlasManager.js';
import WebGLBuffer from '../../webgl/Buffer.js';

/**
 * @typedef {Object} GlyphAtlas
 * @property {import("../../style/AtlasManager.js").default} atlas
 * @property {Object<string, number>} width
 * @property {number} height
 */


var WebGLTextReplay = /*@__PURE__*/(function (WebGLTextureReplay) {
  function WebGLTextReplay(tolerance, maxExtent) {
    WebGLTextureReplay.call(this, tolerance, maxExtent);

    /**
     * @private
     * @type {Array<HTMLCanvasElement>}
     */
    this.images_ = [];

    /**
     * @private
     * @type {Array<WebGLTexture>}
     */
    this.textures_ = [];

    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    this.measureCanvas_ = createCanvasContext2D(0, 0).canvas;

    /**
     * @private
     * @type {{strokeColor: (import("../../colorlike.js").ColorLike|null),
     *         lineCap: (string|undefined),
     *         lineDash: Array<number>,
     *         lineDashOffset: (number|undefined),
     *         lineJoin: (string|undefined),
     *         lineWidth: number,
     *         miterLimit: (number|undefined),
     *         fillColor: (import("../../colorlike.js").ColorLike|null),
     *         font: (string|undefined),
     *         scale: (number|undefined)}}
     */
    this.state_ = {
      strokeColor: null,
      lineCap: undefined,
      lineDash: null,
      lineDashOffset: undefined,
      lineJoin: undefined,
      lineWidth: 0,
      miterLimit: undefined,
      fillColor: null,
      font: undefined,
      scale: undefined
    };

    /**
     * @private
     * @type {string}
     */
    this.text_ = '';

    /**
     * @private
     * @type {number|undefined}
     */
    this.textAlign_ = undefined;

    /**
     * @private
     * @type {number|undefined}
     */
    this.textBaseline_ = undefined;

    /**
     * @private
     * @type {number|undefined}
     */
    this.offsetX_ = undefined;

    /**
     * @private
     * @type {number|undefined}
     */
    this.offsetY_ = undefined;

    /**
     * @private
     * @type {Object<string, GlyphAtlas>}
     */
    this.atlases_ = {};

    /**
     * @private
     * @type {GlyphAtlas|undefined}
     */
    this.currAtlas_ = undefined;

    this.scale = 1;

    this.opacity = 1;

  }

  if ( WebGLTextureReplay ) WebGLTextReplay.__proto__ = WebGLTextureReplay;
  WebGLTextReplay.prototype = Object.create( WebGLTextureReplay && WebGLTextureReplay.prototype );
  WebGLTextReplay.prototype.constructor = WebGLTextReplay;

  /**
   * @inheritDoc
   */
  WebGLTextReplay.prototype.drawText = function drawText (geometry, feature) {
    if (this.text_) {
      var flatCoordinates = null;
      var offset = 0;
      var end = 2;
      var stride = 2;
      switch (geometry.getType()) {
        case GeometryType.POINT:
        case GeometryType.MULTI_POINT:
          flatCoordinates = geometry.getFlatCoordinates();
          end = flatCoordinates.length;
          stride = geometry.getStride();
          break;
        case GeometryType.CIRCLE:
          flatCoordinates = /** @type {import("../../geom/Circle.js").default} */ (geometry).getCenter();
          break;
        case GeometryType.LINE_STRING:
          flatCoordinates = /** @type {import("../../geom/LineString.js").default} */ (geometry).getFlatMidpoint();
          break;
        case GeometryType.MULTI_LINE_STRING:
          flatCoordinates = /** @type {import("../../geom/MultiLineString.js").default} */ (geometry).getFlatMidpoints();
          end = flatCoordinates.length;
          break;
        case GeometryType.POLYGON:
          flatCoordinates = /** @type {import("../../geom/Polygon.js").default} */ (geometry).getFlatInteriorPoint();
          break;
        case GeometryType.MULTI_POLYGON:
          flatCoordinates = /** @type {import("../../geom/MultiPolygon.js").default} */ (geometry).getFlatInteriorPoints();
          end = flatCoordinates.length;
          break;
        default:
      }
      this.startIndices.push(this.indices.length);
      this.startIndicesFeature.push(feature);

      var glyphAtlas = this.currAtlas_;
      var lines = this.text_.split('\n');
      var textSize = this.getTextSize_(lines);
      var i, ii, j, jj, currX, currY, charArr, charInfo;
      var anchorX = Math.round(textSize[0] * this.textAlign_ - this.offsetX_);
      var anchorY = Math.round(textSize[1] * this.textBaseline_ - this.offsetY_);
      var lineWidth = (this.state_.lineWidth / 2) * this.state_.scale;

      for (i = 0, ii = lines.length; i < ii; ++i) {
        currX = 0;
        currY = glyphAtlas.height * i;
        charArr = lines[i].split('');

        for (j = 0, jj = charArr.length; j < jj; ++j) {
          charInfo = glyphAtlas.atlas.getInfo(charArr[j]);

          if (charInfo) {
            var image = charInfo.image;

            this.anchorX = anchorX - currX;
            this.anchorY = anchorY - currY;
            this.originX = j === 0 ? charInfo.offsetX - lineWidth : charInfo.offsetX;
            this.originY = charInfo.offsetY;
            this.height = glyphAtlas.height;
            this.width = j === 0 || j === charArr.length - 1 ?
              glyphAtlas.width[charArr[j]] + lineWidth : glyphAtlas.width[charArr[j]];
            this.imageHeight = image.height;
            this.imageWidth = image.width;

            if (this.images_.length === 0) {
              this.images_.push(image);
            } else {
              var currentImage = this.images_[this.images_.length - 1];
              if (getUid(currentImage) != getUid(image)) {
                this.groupIndices.push(this.indices.length);
                this.images_.push(image);
              }
            }

            this.drawText_(flatCoordinates, offset, end, stride);
          }
          currX += this.width;
        }
      }
    }
  };

  /**
   * @private
   * @param {Array<string>} lines Label to draw split to lines.
   * @return {Array<number>} Size of the label in pixels.
   */
  WebGLTextReplay.prototype.getTextSize_ = function getTextSize_ (lines) {
    var self = this;
    var glyphAtlas = this.currAtlas_;
    var textHeight = lines.length * glyphAtlas.height;
    //Split every line to an array of chars, sum up their width, and select the longest.
    var textWidth = lines.map(function(str) {
      var sum = 0;
      for (var i = 0, ii = str.length; i < ii; ++i) {
        var curr = str[i];
        if (!glyphAtlas.width[curr]) {
          self.addCharToAtlas_(curr);
        }
        sum += glyphAtlas.width[curr] ? glyphAtlas.width[curr] : 0;
      }
      return sum;
    }).reduce(function(max, curr) {
      return Math.max(max, curr);
    });

    return [textWidth, textHeight];
  };

  /**
   * @private
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   */
  WebGLTextReplay.prototype.drawText_ = function drawText_ (flatCoordinates, offset, end, stride) {
    for (var i = offset, ii = end; i < ii; i += stride) {
      this.drawCoordinates(flatCoordinates, offset, end, stride);
    }
  };

  /**
   * @private
   * @param {string} char Character.
   */
  WebGLTextReplay.prototype.addCharToAtlas_ = function addCharToAtlas_ (char) {
    if (char.length === 1) {
      var glyphAtlas = this.currAtlas_;
      var state = this.state_;
      var mCtx = this.measureCanvas_.getContext('2d');
      mCtx.font = state.font;
      var width = Math.ceil(mCtx.measureText(char).width * state.scale);

      var info = glyphAtlas.atlas.add(char, width, glyphAtlas.height,
        function(ctx, x, y) {
          //Parameterize the canvas
          ctx.font = /** @type {string} */ (state.font);
          ctx.fillStyle = state.fillColor;
          ctx.strokeStyle = state.strokeColor;
          ctx.lineWidth = state.lineWidth;
          ctx.lineCap = /** @type {CanvasLineCap} */ (state.lineCap);
          ctx.lineJoin = /** @type {CanvasLineJoin} */ (state.lineJoin);
          ctx.miterLimit = /** @type {number} */ (state.miterLimit);
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          if (CANVAS_LINE_DASH && state.lineDash) {
            //FIXME: use pixelRatio
            ctx.setLineDash(state.lineDash);
            ctx.lineDashOffset = /** @type {number} */ (state.lineDashOffset);
          }
          if (state.scale !== 1) {
            //FIXME: use pixelRatio
            ctx.setTransform(/** @type {number} */ (state.scale), 0, 0,
              /** @type {number} */ (state.scale), 0, 0);
          }

          //Draw the character on the canvas
          if (state.strokeColor) {
            ctx.strokeText(char, x, y);
          }
          if (state.fillColor) {
            ctx.fillText(char, x, y);
          }
        });

      if (info) {
        glyphAtlas.width[char] = width;
      }
    }
  };

  /**
   * @inheritDoc
   */
  WebGLTextReplay.prototype.finish = function finish (context) {
    var gl = context.getGL();

    this.groupIndices.push(this.indices.length);
    this.hitDetectionGroupIndices = this.groupIndices;

    // create, bind, and populate the vertices buffer
    this.verticesBuffer = new WebGLBuffer(this.vertices);

    // create, bind, and populate the indices buffer
    this.indicesBuffer = new WebGLBuffer(this.indices);

    // create textures
    /** @type {Object<string, WebGLTexture>} */
    var texturePerImage = {};

    this.createTextures(this.textures_, this.images_, texturePerImage, gl);

    this.state_ = {
      strokeColor: null,
      lineCap: undefined,
      lineDash: null,
      lineDashOffset: undefined,
      lineJoin: undefined,
      lineWidth: 0,
      miterLimit: undefined,
      fillColor: null,
      font: undefined,
      scale: undefined
    };
    this.text_ = '';
    this.textAlign_ = undefined;
    this.textBaseline_ = undefined;
    this.offsetX_ = undefined;
    this.offsetY_ = undefined;
    this.images_ = null;
    this.atlases_ = {};
    this.currAtlas_ = undefined;
    WebGLTextureReplay.prototype.finish.call(this, context);
  };

  /**
   * @inheritDoc
   */
  WebGLTextReplay.prototype.setTextStyle = function setTextStyle (textStyle) {
    var state = this.state_;
    var textFillStyle = textStyle.getFill();
    var textStrokeStyle = textStyle.getStroke();
    if (!textStyle || !textStyle.getText() || (!textFillStyle && !textStrokeStyle)) {
      this.text_ = '';
    } else {
      if (!textFillStyle) {
        state.fillColor = null;
      } else {
        var textFillStyleColor = textFillStyle.getColor();
        state.fillColor = asColorLike(textFillStyleColor ?
          textFillStyleColor : DEFAULT_FILLSTYLE);
      }
      if (!textStrokeStyle) {
        state.strokeColor = null;
        state.lineWidth = 0;
      } else {
        var textStrokeStyleColor = textStrokeStyle.getColor();
        state.strokeColor = asColorLike(textStrokeStyleColor ?
          textStrokeStyleColor : DEFAULT_STROKESTYLE);
        state.lineWidth = textStrokeStyle.getWidth() || DEFAULT_LINEWIDTH;
        state.lineCap = textStrokeStyle.getLineCap() || DEFAULT_LINECAP;
        state.lineDashOffset = textStrokeStyle.getLineDashOffset() || DEFAULT_LINEDASHOFFSET;
        state.lineJoin = textStrokeStyle.getLineJoin() || DEFAULT_LINEJOIN;
        state.miterLimit = textStrokeStyle.getMiterLimit() || DEFAULT_MITERLIMIT;
        var lineDash = textStrokeStyle.getLineDash();
        state.lineDash = lineDash ? lineDash.slice() : DEFAULT_LINEDASH;
      }
      state.font = textStyle.getFont() || DEFAULT_FONT;
      state.scale = textStyle.getScale() || 1;
      this.text_ = /** @type {string} */ (textStyle.getText());
      var textAlign = TEXT_ALIGN[textStyle.getTextAlign()];
      var textBaseline = TEXT_ALIGN[textStyle.getTextBaseline()];
      this.textAlign_ = textAlign === undefined ?
        DEFAULT_TEXTALIGN : textAlign;
      this.textBaseline_ = textBaseline === undefined ?
        DEFAULT_TEXTBASELINE : textBaseline;
      this.offsetX_ = textStyle.getOffsetX() || 0;
      this.offsetY_ = textStyle.getOffsetY() || 0;
      this.rotateWithView = !!textStyle.getRotateWithView();
      this.rotation = textStyle.getRotation() || 0;

      this.currAtlas_ = this.getAtlas_(state);
    }
  };

  /**
   * @private
   * @param {Object} state Font attributes.
   * @return {GlyphAtlas} Glyph atlas.
   */
  WebGLTextReplay.prototype.getAtlas_ = function getAtlas_ (state) {
    var params = [];
    for (var i in state) {
      if (state[i] || state[i] === 0) {
        if (Array.isArray(state[i])) {
          params = params.concat(state[i]);
        } else {
          params.push(state[i]);
        }
      }
    }
    var hash = this.calculateHash_(params);
    if (!this.atlases_[hash]) {
      var mCtx = this.measureCanvas_.getContext('2d');
      mCtx.font = state.font;
      var height = Math.ceil((mCtx.measureText('M').width * 1.5 +
          state.lineWidth / 2) * state.scale);

      this.atlases_[hash] = {
        atlas: new AtlasManager({
          space: state.lineWidth + 1
        }),
        width: {},
        height: height
      };
    }
    return this.atlases_[hash];
  };

  /**
   * @private
   * @param {Array<string|number>} params Array of parameters.
   * @return {string} Hash string.
   */
  WebGLTextReplay.prototype.calculateHash_ = function calculateHash_ (params) {
    //TODO: Create a more performant, reliable, general hash function.
    var hash = '';
    for (var i = 0, ii = params.length; i < ii; ++i) {
      hash += params[i];
    }
    return hash;
  };

  /**
   * @inheritDoc
   */
  WebGLTextReplay.prototype.getTextures = function getTextures (opt_all) {
    return this.textures_;
  };

  /**
   * @inheritDoc
   */
  WebGLTextReplay.prototype.getHitDetectionTextures = function getHitDetectionTextures () {
    return this.textures_;
  };

  return WebGLTextReplay;
}(WebGLTextureReplay));


export default WebGLTextReplay;

//# sourceMappingURL=TextReplay.js.map