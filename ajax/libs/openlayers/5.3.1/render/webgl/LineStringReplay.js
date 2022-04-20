/**
 * @module ol/render/webgl/LineStringReplay
 */
import {getUid} from '../../util.js';
import {equals} from '../../array.js';
import {asArray} from '../../color.js';
import {intersects} from '../../extent.js';
import {linearRingIsClockwise} from '../../geom/flat/orient.js';
import {translate} from '../../geom/flat/transform.js';
import {lineStringIsClosed} from '../../geom/flat/topology.js';
import {isEmpty} from '../../obj.js';
import {DEFAULT_LINECAP, DEFAULT_LINEDASH, DEFAULT_LINEDASHOFFSET,
  DEFAULT_LINEJOIN, DEFAULT_LINEWIDTH, DEFAULT_MITERLIMIT, DEFAULT_STROKESTYLE,
  triangleIsCounterClockwise} from '../webgl.js';
import WebGLReplay from './Replay.js';
import {fragment, vertex} from './linestringreplay/defaultshader.js';
import Locations from './linestringreplay/defaultshader/Locations.js';
import {FLOAT} from '../../webgl.js';
import WebGLBuffer from '../../webgl/Buffer.js';


/**
 * @enum {number}
 */
var Instruction = {
  ROUND: 2,
  BEGIN_LINE: 3,
  END_LINE: 5,
  BEGIN_LINE_CAP: 7,
  END_LINE_CAP: 11,
  BEVEL_FIRST: 13,
  BEVEL_SECOND: 17,
  MITER_BOTTOM: 19,
  MITER_TOP: 23
};


var WebGLLineStringReplay = /*@__PURE__*/(function (WebGLReplay) {
  function WebGLLineStringReplay(tolerance, maxExtent) {
    WebGLReplay.call(this, tolerance, maxExtent);

    /**
     * @private
     * @type {import("./linestringreplay/defaultshader/Locations.js").default}
     */
    this.defaultLocations_ = null;

    /**
     * @private
     * @type {Array<Array<?>>}
     */
    this.styles_ = [];

    /**
     * @private
     * @type {Array<number>}
     */
    this.styleIndices_ = [];

    /**
     * @private
     * @type {{strokeColor: (Array<number>|null),
     *         lineCap: (string|undefined),
     *         lineDash: Array<number>,
     *         lineDashOffset: (number|undefined),
     *         lineJoin: (string|undefined),
     *         lineWidth: (number|undefined),
     *         miterLimit: (number|undefined),
     *         changed: boolean}|null}
     */
    this.state_ = {
      strokeColor: null,
      lineCap: undefined,
      lineDash: null,
      lineDashOffset: undefined,
      lineJoin: undefined,
      lineWidth: undefined,
      miterLimit: undefined,
      changed: false
    };

  }

  if ( WebGLReplay ) WebGLLineStringReplay.__proto__ = WebGLReplay;
  WebGLLineStringReplay.prototype = Object.create( WebGLReplay && WebGLReplay.prototype );
  WebGLLineStringReplay.prototype.constructor = WebGLLineStringReplay;

  /**
   * Draw one segment.
   * @private
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   */
  WebGLLineStringReplay.prototype.drawCoordinates_ = function drawCoordinates_ (flatCoordinates, offset, end, stride) {

    var i, ii;
    var numVertices = this.vertices.length;
    var numIndices = this.indices.length;
    //To save a vertex, the direction of a point is a product of the sign (1 or -1), a prime from
    //Instruction, and a rounding factor (1 or 2). If the product is even,
    //we round it. If it is odd, we don't.
    var lineJoin = this.state_.lineJoin === 'bevel' ? 0 :
      this.state_.lineJoin === 'miter' ? 1 : 2;
    var lineCap = this.state_.lineCap === 'butt' ? 0 :
      this.state_.lineCap === 'square' ? 1 : 2;
    var closed = lineStringIsClosed(flatCoordinates, offset, end, stride);
    var startCoords, sign, n;
    var lastIndex = numIndices;
    var lastSign = 1;
    //We need the adjacent vertices to define normals in joins. p0 = last, p1 = current, p2 = next.
    var p0, p1, p2;

    for (i = offset, ii = end; i < ii; i += stride) {

      n = numVertices / 7;

      p0 = p1;
      p1 = p2 || [flatCoordinates[i], flatCoordinates[i + 1]];
      //First vertex.
      if (i === offset) {
        p2 = [flatCoordinates[i + stride], flatCoordinates[i + stride + 1]];
        if (end - offset === stride * 2 && equals(p1, p2)) {
          break;
        }
        if (closed) {
          //A closed line! Complete the circle.
          p0 = [flatCoordinates[end - stride * 2],
            flatCoordinates[end - stride * 2 + 1]];

          startCoords = p2;
        } else {
          //Add the first two/four vertices.

          if (lineCap) {
            numVertices = this.addVertices_([0, 0], p1, p2,
              lastSign * Instruction.BEGIN_LINE_CAP * lineCap, numVertices);

            numVertices = this.addVertices_([0, 0], p1, p2,
              -lastSign * Instruction.BEGIN_LINE_CAP * lineCap, numVertices);

            this.indices[numIndices++] = n + 2;
            this.indices[numIndices++] = n;
            this.indices[numIndices++] = n + 1;

            this.indices[numIndices++] = n + 1;
            this.indices[numIndices++] = n + 3;
            this.indices[numIndices++] = n + 2;

          }

          numVertices = this.addVertices_([0, 0], p1, p2,
            lastSign * Instruction.BEGIN_LINE * (lineCap || 1), numVertices);

          numVertices = this.addVertices_([0, 0], p1, p2,
            -lastSign * Instruction.BEGIN_LINE * (lineCap || 1), numVertices);

          lastIndex = numVertices / 7 - 1;

          continue;
        }
      } else if (i === end - stride) {
        //Last vertex.
        if (closed) {
          //Same as the first vertex.
          p2 = startCoords;
          break;
        } else {
          p0 = p0 || [0, 0];

          numVertices = this.addVertices_(p0, p1, [0, 0],
            lastSign * Instruction.END_LINE * (lineCap || 1), numVertices);

          numVertices = this.addVertices_(p0, p1, [0, 0],
            -lastSign * Instruction.END_LINE * (lineCap || 1), numVertices);

          this.indices[numIndices++] = n;
          this.indices[numIndices++] = lastIndex - 1;
          this.indices[numIndices++] = lastIndex;

          this.indices[numIndices++] = lastIndex;
          this.indices[numIndices++] = n + 1;
          this.indices[numIndices++] = n;

          if (lineCap) {
            numVertices = this.addVertices_(p0, p1, [0, 0],
              lastSign * Instruction.END_LINE_CAP * lineCap, numVertices);

            numVertices = this.addVertices_(p0, p1, [0, 0],
              -lastSign * Instruction.END_LINE_CAP * lineCap, numVertices);

            this.indices[numIndices++] = n + 2;
            this.indices[numIndices++] = n;
            this.indices[numIndices++] = n + 1;

            this.indices[numIndices++] = n + 1;
            this.indices[numIndices++] = n + 3;
            this.indices[numIndices++] = n + 2;

          }

          break;
        }
      } else {
        p2 = [flatCoordinates[i + stride], flatCoordinates[i + stride + 1]];
      }

      // We group CW and straight lines, thus the not so inituitive CCW checking function.
      sign = triangleIsCounterClockwise(p0[0], p0[1], p1[0], p1[1], p2[0], p2[1])
        ? -1 : 1;

      numVertices = this.addVertices_(p0, p1, p2,
        sign * Instruction.BEVEL_FIRST * (lineJoin || 1), numVertices);

      numVertices = this.addVertices_(p0, p1, p2,
        sign * Instruction.BEVEL_SECOND * (lineJoin || 1), numVertices);

      numVertices = this.addVertices_(p0, p1, p2,
        -sign * Instruction.MITER_BOTTOM * (lineJoin || 1), numVertices);

      if (i > offset) {
        this.indices[numIndices++] = n;
        this.indices[numIndices++] = lastIndex - 1;
        this.indices[numIndices++] = lastIndex;

        this.indices[numIndices++] = n + 2;
        this.indices[numIndices++] = n;
        this.indices[numIndices++] = lastSign * sign > 0 ? lastIndex : lastIndex - 1;
      }

      this.indices[numIndices++] = n;
      this.indices[numIndices++] = n + 2;
      this.indices[numIndices++] = n + 1;

      lastIndex = n + 2;
      lastSign = sign;

      //Add miter
      if (lineJoin) {
        numVertices = this.addVertices_(p0, p1, p2,
          sign * Instruction.MITER_TOP * lineJoin, numVertices);

        this.indices[numIndices++] = n + 1;
        this.indices[numIndices++] = n + 3;
        this.indices[numIndices++] = n;
      }
    }

    if (closed) {
      n = n || numVertices / 7;
      sign = linearRingIsClockwise([p0[0], p0[1], p1[0], p1[1], p2[0], p2[1]], 0, 6, 2)
        ? 1 : -1;

      numVertices = this.addVertices_(p0, p1, p2,
        sign * Instruction.BEVEL_FIRST * (lineJoin || 1), numVertices);

      numVertices = this.addVertices_(p0, p1, p2,
        -sign * Instruction.MITER_BOTTOM * (lineJoin || 1), numVertices);

      this.indices[numIndices++] = n;
      this.indices[numIndices++] = lastIndex - 1;
      this.indices[numIndices++] = lastIndex;

      this.indices[numIndices++] = n + 1;
      this.indices[numIndices++] = n;
      this.indices[numIndices++] = lastSign * sign > 0 ? lastIndex : lastIndex - 1;
    }
  };

  /**
   * @param {Array<number>} p0 Last coordinates.
   * @param {Array<number>} p1 Current coordinates.
   * @param {Array<number>} p2 Next coordinates.
   * @param {number} product Sign, instruction, and rounding product.
   * @param {number} numVertices Vertex counter.
   * @return {number} Vertex counter.
   * @private
   */
  WebGLLineStringReplay.prototype.addVertices_ = function addVertices_ (p0, p1, p2, product, numVertices) {
    this.vertices[numVertices++] = p0[0];
    this.vertices[numVertices++] = p0[1];
    this.vertices[numVertices++] = p1[0];
    this.vertices[numVertices++] = p1[1];
    this.vertices[numVertices++] = p2[0];
    this.vertices[numVertices++] = p2[1];
    this.vertices[numVertices++] = product;

    return numVertices;
  };

  /**
   * Check if the linestring can be drawn (i. e. valid).
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @return {boolean} The linestring can be drawn.
   * @private
   */
  WebGLLineStringReplay.prototype.isValid_ = function isValid_ (flatCoordinates, offset, end, stride) {
    var range = end - offset;
    if (range < stride * 2) {
      return false;
    } else if (range === stride * 2) {
      var firstP = [flatCoordinates[offset], flatCoordinates[offset + 1]];
      var lastP = [flatCoordinates[offset + stride], flatCoordinates[offset + stride + 1]];
      return !equals(firstP, lastP);
    }

    return true;
  };

  /**
   * @inheritDoc
   */
  WebGLLineStringReplay.prototype.drawLineString = function drawLineString (lineStringGeometry, feature) {
    var flatCoordinates = lineStringGeometry.getFlatCoordinates();
    var stride = lineStringGeometry.getStride();
    if (this.isValid_(flatCoordinates, 0, flatCoordinates.length, stride)) {
      flatCoordinates = translate(flatCoordinates, 0, flatCoordinates.length,
        stride, -this.origin[0], -this.origin[1]);
      if (this.state_.changed) {
        this.styleIndices_.push(this.indices.length);
        this.state_.changed = false;
      }
      this.startIndices.push(this.indices.length);
      this.startIndicesFeature.push(feature);
      this.drawCoordinates_(
        flatCoordinates, 0, flatCoordinates.length, stride);
    }
  };

  /**
   * @inheritDoc
   */
  WebGLLineStringReplay.prototype.drawMultiLineString = function drawMultiLineString (multiLineStringGeometry, feature) {
    var indexCount = this.indices.length;
    var ends = multiLineStringGeometry.getEnds();
    ends.unshift(0);
    var flatCoordinates = multiLineStringGeometry.getFlatCoordinates();
    var stride = multiLineStringGeometry.getStride();
    var i, ii;
    if (ends.length > 1) {
      for (i = 1, ii = ends.length; i < ii; ++i) {
        if (this.isValid_(flatCoordinates, ends[i - 1], ends[i], stride)) {
          var lineString = translate(flatCoordinates, ends[i - 1], ends[i],
            stride, -this.origin[0], -this.origin[1]);
          this.drawCoordinates_(
            lineString, 0, lineString.length, stride);
        }
      }
    }
    if (this.indices.length > indexCount) {
      this.startIndices.push(indexCount);
      this.startIndicesFeature.push(feature);
      if (this.state_.changed) {
        this.styleIndices_.push(indexCount);
        this.state_.changed = false;
      }
    }
  };

  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {Array<Array<number>>} holeFlatCoordinates Hole flat coordinates.
   * @param {number} stride Stride.
   */
  WebGLLineStringReplay.prototype.drawPolygonCoordinates = function drawPolygonCoordinates (flatCoordinates, holeFlatCoordinates, stride) {
    if (!lineStringIsClosed(flatCoordinates, 0, flatCoordinates.length, stride)) {
      flatCoordinates.push(flatCoordinates[0]);
      flatCoordinates.push(flatCoordinates[1]);
    }
    this.drawCoordinates_(flatCoordinates, 0, flatCoordinates.length, stride);
    if (holeFlatCoordinates.length) {
      var i, ii;
      for (i = 0, ii = holeFlatCoordinates.length; i < ii; ++i) {
        if (!lineStringIsClosed(holeFlatCoordinates[i], 0, holeFlatCoordinates[i].length, stride)) {
          holeFlatCoordinates[i].push(holeFlatCoordinates[i][0]);
          holeFlatCoordinates[i].push(holeFlatCoordinates[i][1]);
        }
        this.drawCoordinates_(holeFlatCoordinates[i], 0,
          holeFlatCoordinates[i].length, stride);
      }
    }
  };

  /**
   * @param {import("../../Feature.js").default|import("../Feature.js").default} feature Feature.
   * @param {number=} opt_index Index count.
   */
  WebGLLineStringReplay.prototype.setPolygonStyle = function setPolygonStyle (feature, opt_index) {
    var index = opt_index === undefined ? this.indices.length : opt_index;
    this.startIndices.push(index);
    this.startIndicesFeature.push(feature);
    if (this.state_.changed) {
      this.styleIndices_.push(index);
      this.state_.changed = false;
    }
  };

  /**
   * @return {number} Current index.
   */
  WebGLLineStringReplay.prototype.getCurrentIndex = function getCurrentIndex () {
    return this.indices.length;
  };

  /**
   * @inheritDoc
   **/
  WebGLLineStringReplay.prototype.finish = function finish (context) {
    // create, bind, and populate the vertices buffer
    this.verticesBuffer = new WebGLBuffer(this.vertices);

    // create, bind, and populate the indices buffer
    this.indicesBuffer = new WebGLBuffer(this.indices);

    this.startIndices.push(this.indices.length);

    //Clean up, if there is nothing to draw
    if (this.styleIndices_.length === 0 && this.styles_.length > 0) {
      this.styles_ = [];
    }

    this.vertices = null;
    this.indices = null;
  };

  /**
   * @inheritDoc
   */
  WebGLLineStringReplay.prototype.getDeleteResourcesFunction = function getDeleteResourcesFunction (context) {
    var verticesBuffer = this.verticesBuffer;
    var indicesBuffer = this.indicesBuffer;
    return function() {
      context.deleteBuffer(verticesBuffer);
      context.deleteBuffer(indicesBuffer);
    };
  };

  /**
   * @inheritDoc
   */
  WebGLLineStringReplay.prototype.setUpProgram = function setUpProgram (gl, context, size, pixelRatio) {
    // get the program
    var program = context.getProgram(fragment, vertex);

    // get the locations
    var locations;
    if (!this.defaultLocations_) {
      locations = new Locations(gl, program);
      this.defaultLocations_ = locations;
    } else {
      locations = this.defaultLocations_;
    }

    context.useProgram(program);

    // enable the vertex attrib arrays
    gl.enableVertexAttribArray(locations.a_lastPos);
    gl.vertexAttribPointer(locations.a_lastPos, 2, FLOAT,
      false, 28, 0);

    gl.enableVertexAttribArray(locations.a_position);
    gl.vertexAttribPointer(locations.a_position, 2, FLOAT,
      false, 28, 8);

    gl.enableVertexAttribArray(locations.a_nextPos);
    gl.vertexAttribPointer(locations.a_nextPos, 2, FLOAT,
      false, 28, 16);

    gl.enableVertexAttribArray(locations.a_direction);
    gl.vertexAttribPointer(locations.a_direction, 1, FLOAT,
      false, 28, 24);

    // Enable renderer specific uniforms.
    gl.uniform2fv(locations.u_size, size);
    gl.uniform1f(locations.u_pixelRatio, pixelRatio);

    return locations;
  };

  /**
   * @inheritDoc
   */
  WebGLLineStringReplay.prototype.shutDownProgram = function shutDownProgram (gl, locations) {
    gl.disableVertexAttribArray(locations.a_lastPos);
    gl.disableVertexAttribArray(locations.a_position);
    gl.disableVertexAttribArray(locations.a_nextPos);
    gl.disableVertexAttribArray(locations.a_direction);
  };

  /**
   * @inheritDoc
   */
  WebGLLineStringReplay.prototype.drawReplay = function drawReplay (gl, context, skippedFeaturesHash, hitDetection) {
    //Save GL parameters.
    var tmpDepthFunc = /** @type {number} */ (gl.getParameter(gl.DEPTH_FUNC));
    var tmpDepthMask = /** @type {boolean} */ (gl.getParameter(gl.DEPTH_WRITEMASK));

    if (!hitDetection) {
      gl.enable(gl.DEPTH_TEST);
      gl.depthMask(true);
      gl.depthFunc(gl.NOTEQUAL);
    }

    if (!isEmpty(skippedFeaturesHash)) {
      this.drawReplaySkipping_(gl, context, skippedFeaturesHash);
    } else {
      //Draw by style groups to minimize drawElements() calls.
      var i, start, end, nextStyle;
      end = this.startIndices[this.startIndices.length - 1];
      for (i = this.styleIndices_.length - 1; i >= 0; --i) {
        start = this.styleIndices_[i];
        nextStyle = this.styles_[i];
        this.setStrokeStyle_(gl, nextStyle[0], nextStyle[1], nextStyle[2]);
        this.drawElements(gl, context, start, end);
        gl.clear(gl.DEPTH_BUFFER_BIT);
        end = start;
      }
    }
    if (!hitDetection) {
      gl.disable(gl.DEPTH_TEST);
      gl.clear(gl.DEPTH_BUFFER_BIT);
      //Restore GL parameters.
      gl.depthMask(tmpDepthMask);
      gl.depthFunc(tmpDepthFunc);
    }
  };

  /**
   * @private
   * @param {WebGLRenderingContext} gl gl.
   * @param {import("../../webgl/Context.js").default} context Context.
   * @param {Object} skippedFeaturesHash Ids of features to skip.
   */
  WebGLLineStringReplay.prototype.drawReplaySkipping_ = function drawReplaySkipping_ (gl, context, skippedFeaturesHash) {
    var i, start, end, nextStyle, groupStart, feature, featureIndex, featureStart;
    featureIndex = this.startIndices.length - 2;
    end = start = this.startIndices[featureIndex + 1];
    for (i = this.styleIndices_.length - 1; i >= 0; --i) {
      nextStyle = this.styles_[i];
      this.setStrokeStyle_(gl, nextStyle[0], nextStyle[1], nextStyle[2]);
      groupStart = this.styleIndices_[i];

      while (featureIndex >= 0 &&
          this.startIndices[featureIndex] >= groupStart) {
        featureStart = this.startIndices[featureIndex];
        feature = this.startIndicesFeature[featureIndex];

        if (skippedFeaturesHash[getUid(feature)]) {
          if (start !== end) {
            this.drawElements(gl, context, start, end);
            gl.clear(gl.DEPTH_BUFFER_BIT);
          }
          end = featureStart;
        }
        featureIndex--;
        start = featureStart;
      }
      if (start !== end) {
        this.drawElements(gl, context, start, end);
        gl.clear(gl.DEPTH_BUFFER_BIT);
      }
      start = end = groupStart;
    }
  };

  /**
   * @inheritDoc
   */
  WebGLLineStringReplay.prototype.drawHitDetectionReplayOneByOne = function drawHitDetectionReplayOneByOne (gl, context, skippedFeaturesHash, featureCallback, opt_hitExtent) {
    var i, start, end, nextStyle, groupStart, feature, featureIndex;
    featureIndex = this.startIndices.length - 2;
    end = this.startIndices[featureIndex + 1];
    for (i = this.styleIndices_.length - 1; i >= 0; --i) {
      nextStyle = this.styles_[i];
      this.setStrokeStyle_(gl, nextStyle[0], nextStyle[1], nextStyle[2]);
      groupStart = this.styleIndices_[i];

      while (featureIndex >= 0 &&
          this.startIndices[featureIndex] >= groupStart) {
        start = this.startIndices[featureIndex];
        feature = this.startIndicesFeature[featureIndex];

        if (skippedFeaturesHash[getUid(feature)] === undefined &&
            feature.getGeometry() &&
            (opt_hitExtent === undefined || intersects(
              /** @type {Array<number>} */ (opt_hitExtent),
              feature.getGeometry().getExtent()))) {
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
          this.drawElements(gl, context, start, end);

          var result = featureCallback(feature);

          if (result) {
            return result;
          }

        }
        featureIndex--;
        end = start;
      }
    }
    return undefined;
  };

  /**
   * @private
   * @param {WebGLRenderingContext} gl gl.
   * @param {Array<number>} color Color.
   * @param {number} lineWidth Line width.
   * @param {number} miterLimit Miter limit.
   */
  WebGLLineStringReplay.prototype.setStrokeStyle_ = function setStrokeStyle_ (gl, color, lineWidth, miterLimit) {
    gl.uniform4fv(this.defaultLocations_.u_color, color);
    gl.uniform1f(this.defaultLocations_.u_lineWidth, lineWidth);
    gl.uniform1f(this.defaultLocations_.u_miterLimit, miterLimit);
  };

  /**
   * @inheritDoc
   */
  WebGLLineStringReplay.prototype.setFillStrokeStyle = function setFillStrokeStyle (fillStyle, strokeStyle) {
    var strokeStyleLineCap = strokeStyle.getLineCap();
    this.state_.lineCap = strokeStyleLineCap !== undefined ?
      strokeStyleLineCap : DEFAULT_LINECAP;
    var strokeStyleLineDash = strokeStyle.getLineDash();
    this.state_.lineDash = strokeStyleLineDash ?
      strokeStyleLineDash : DEFAULT_LINEDASH;
    var strokeStyleLineDashOffset = strokeStyle.getLineDashOffset();
    this.state_.lineDashOffset = strokeStyleLineDashOffset ?
      strokeStyleLineDashOffset : DEFAULT_LINEDASHOFFSET;
    var strokeStyleLineJoin = strokeStyle.getLineJoin();
    this.state_.lineJoin = strokeStyleLineJoin !== undefined ?
      strokeStyleLineJoin : DEFAULT_LINEJOIN;
    var strokeStyleColor = strokeStyle.getColor();
    if (!(strokeStyleColor instanceof CanvasGradient) &&
        !(strokeStyleColor instanceof CanvasPattern)) {
      strokeStyleColor = asArray(strokeStyleColor).map(function(c, i) {
        return i != 3 ? c / 255 : c;
      }) || DEFAULT_STROKESTYLE;
    } else {
      strokeStyleColor = DEFAULT_STROKESTYLE;
    }
    var strokeStyleWidth = strokeStyle.getWidth();
    strokeStyleWidth = strokeStyleWidth !== undefined ?
      strokeStyleWidth : DEFAULT_LINEWIDTH;
    var strokeStyleMiterLimit = strokeStyle.getMiterLimit();
    strokeStyleMiterLimit = strokeStyleMiterLimit !== undefined ?
      strokeStyleMiterLimit : DEFAULT_MITERLIMIT;
    if (!this.state_.strokeColor || !equals(this.state_.strokeColor, strokeStyleColor) ||
        this.state_.lineWidth !== strokeStyleWidth || this.state_.miterLimit !== strokeStyleMiterLimit) {
      this.state_.changed = true;
      this.state_.strokeColor = strokeStyleColor;
      this.state_.lineWidth = strokeStyleWidth;
      this.state_.miterLimit = strokeStyleMiterLimit;
      this.styles_.push([strokeStyleColor, strokeStyleWidth, strokeStyleMiterLimit]);
    }
  };

  return WebGLLineStringReplay;
}(WebGLReplay));


export default WebGLLineStringReplay;

//# sourceMappingURL=LineStringReplay.js.map