/**
 * @module ol/render/webgl/Replay
 */

import {getCenter} from '../../extent.js';
import VectorContext from '../VectorContext.js';
import {
  create as createTransform,
  reset as resetTransform,
  rotate as rotateTransform,
  scale as scaleTransform,
  translate as translateTransform
} from '../../transform.js';
import {create, fromTransform} from '../../vec/mat4.js';
import {ARRAY_BUFFER, ELEMENT_ARRAY_BUFFER, TRIANGLES,
  UNSIGNED_INT, UNSIGNED_SHORT} from '../../webgl.js';

var WebGLReplay = (function (VectorContext) {
  function WebGLReplay(tolerance, maxExtent) {
    VectorContext.call(this);

    /**
     * @protected
     * @type {number}
     */
    this.tolerance = tolerance;

    /**
     * @protected
     * @const
     * @type {module:ol/extent~Extent}
     */
    this.maxExtent = maxExtent;

    /**
     * The origin of the coordinate system for the point coordinates sent to
     * the GPU. To eliminate jitter caused by precision problems in the GPU
     * we use the "Rendering Relative to Eye" technique described in the "3D
     * Engine Design for Virtual Globes" book.
     * @protected
     * @type {module:ol/coordinate~Coordinate}
     */
    this.origin = getCenter(maxExtent);

    /**
     * @private
     * @type {module:ol/transform~Transform}
     */
    this.projectionMatrix_ = createTransform();

    /**
     * @private
     * @type {module:ol/transform~Transform}
     */
    this.offsetRotateMatrix_ = createTransform();

    /**
     * @private
     * @type {module:ol/transform~Transform}
     */
    this.offsetScaleMatrix_ = createTransform();

    /**
     * @private
     * @type {Array<number>}
     */
    this.tmpMat4_ = create();

    /**
     * @protected
     * @type {Array<number>}
     */
    this.indices = [];

    /**
     * @protected
     * @type {?module:ol/webgl/Buffer}
     */
    this.indicesBuffer = null;

    /**
     * Start index per feature (the index).
     * @protected
     * @type {Array<number>}
     */
    this.startIndices = [];

    /**
     * Start index per feature (the feature).
     * @protected
     * @type {Array<module:ol/Feature|module:ol/render/Feature>}
     */
    this.startIndicesFeature = [];

    /**
     * @protected
     * @type {Array<number>}
     */
    this.vertices = [];

    /**
     * @protected
     * @type {?module:ol/webgl/Buffer}
     */
    this.verticesBuffer = null;

    /**
     * Optional parameter for PolygonReplay instances.
     * @protected
     * @type {module:ol/render/webgl/LineStringReplay|undefined}
     */
    this.lineStringReplay = undefined;

  }

  if ( VectorContext ) WebGLReplay.__proto__ = VectorContext;
  WebGLReplay.prototype = Object.create( VectorContext && VectorContext.prototype );
  WebGLReplay.prototype.constructor = WebGLReplay;

  /**
   * @abstract
   * @param {module:ol/webgl/Context} context WebGL context.
   * @return {function()} Delete resources function.
   */
  WebGLReplay.prototype.getDeleteResourcesFunction = function getDeleteResourcesFunction (context) {};

  /**
   * @abstract
   * @param {module:ol/webgl/Context} context Context.
   */
  WebGLReplay.prototype.finish = function finish (context) {};

  /**
   * @abstract
   * @protected
   * @param {WebGLRenderingContext} gl gl.
   * @param {module:ol/webgl/Context} context Context.
   * @param {module:ol/size~Size} size Size.
   * @param {number} pixelRatio Pixel ratio.
   * @return {module:ol/render/webgl/circlereplay/defaultshader/Locations|
     module:ol/render/webgl/linestringreplay/defaultshader/Locations|
     module:ol/render/webgl/polygonreplay/defaultshader/Locations|
     module:ol/render/webgl/texturereplay/defaultshader/Locations} Locations.
   */
  WebGLReplay.prototype.setUpProgram = function setUpProgram (gl, context, size, pixelRatio) {};

  /**
   * @abstract
   * @protected
   * @param {WebGLRenderingContext} gl gl.
   * @param {module:ol/render/webgl/circlereplay/defaultshader/Locations|
     module:ol/render/webgl/linestringreplay/defaultshader/Locations|
     module:ol/render/webgl/polygonreplay/defaultshader/Locations|
     module:ol/render/webgl/texturereplay/defaultshader/Locations} locations Locations.
   */
  WebGLReplay.prototype.shutDownProgram = function shutDownProgram (gl, locations) {};

  /**
   * @abstract
   * @protected
   * @param {WebGLRenderingContext} gl gl.
   * @param {module:ol/webgl/Context} context Context.
   * @param {Object<string, boolean>} skippedFeaturesHash Ids of features to skip.
   * @param {boolean} hitDetection Hit detection mode.
   */
  WebGLReplay.prototype.drawReplay = function drawReplay (gl, context, skippedFeaturesHash, hitDetection) {};

  /**
   * @abstract
   * @protected
   * @param {WebGLRenderingContext} gl gl.
   * @param {module:ol/webgl/Context} context Context.
   * @param {Object<string, boolean>} skippedFeaturesHash Ids of features to skip.
   * @param {function((module:ol/Feature|module:ol/render/Feature)): T|undefined} featureCallback Feature callback.
   * @param {module:ol/extent~Extent=} opt_hitExtent Hit extent: Only features intersecting this extent are checked.
   * @return {T|undefined} Callback result.
   * @template T
   */
  WebGLReplay.prototype.drawHitDetectionReplayOneByOne = function drawHitDetectionReplayOneByOne (gl, context, skippedFeaturesHash, featureCallback, opt_hitExtent) {};

  /**
   * @protected
   * @param {WebGLRenderingContext} gl gl.
   * @param {module:ol/webgl/Context} context Context.
   * @param {Object<string, boolean>} skippedFeaturesHash Ids of features to skip.
   * @param {function((module:ol/Feature|module:ol/render/Feature)): T|undefined} featureCallback Feature callback.
   * @param {boolean} oneByOne Draw features one-by-one for the hit-detecion.
   * @param {module:ol/extent~Extent=} opt_hitExtent Hit extent: Only features intersecting this extent are checked.
   * @return {T|undefined} Callback result.
   * @template T
   */
  WebGLReplay.prototype.drawHitDetectionReplay = function drawHitDetectionReplay (gl, context, skippedFeaturesHash, featureCallback, oneByOne, opt_hitExtent) {
    if (!oneByOne) {
      // draw all hit-detection features in "once" (by texture group)
      return this.drawHitDetectionReplayAll(gl, context,
        skippedFeaturesHash, featureCallback);
    } else {
      // draw hit-detection features one by one
      return this.drawHitDetectionReplayOneByOne(gl, context,
        skippedFeaturesHash, featureCallback, opt_hitExtent);
    }
  };

  /**
   * @protected
   * @param {WebGLRenderingContext} gl gl.
   * @param {module:ol/webgl/Context} context Context.
   * @param {Object<string, boolean>} skippedFeaturesHash Ids of features to skip.
   * @param {function((module:ol/Feature|module:ol/render/Feature)): T|undefined} featureCallback Feature callback.
   * @return {T|undefined} Callback result.
   * @template T
   */
  WebGLReplay.prototype.drawHitDetectionReplayAll = function drawHitDetectionReplayAll (gl, context, skippedFeaturesHash, featureCallback) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.drawReplay(gl, context, skippedFeaturesHash, true);

    var result = featureCallback(null);
    if (result) {
      return result;
    } else {
      return undefined;
    }
  };

  /**
   * @param {module:ol/webgl/Context} context Context.
   * @param {module:ol/coordinate~Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {module:ol/size~Size} size Size.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} opacity Global opacity.
   * @param {Object<string, boolean>} skippedFeaturesHash Ids of features to skip.
   * @param {function((module:ol/Feature|module:ol/render/Feature)): T|undefined} featureCallback Feature callback.
   * @param {boolean} oneByOne Draw features one-by-one for the hit-detecion.
   * @param {module:ol/extent~Extent=} opt_hitExtent Hit extent: Only features intersecting this extent are checked.
   * @return {T|undefined} Callback result.
   * @template T
   */
  WebGLReplay.prototype.replay = function replay (
    context,
    center,
    resolution,
    rotation,
    size,
    pixelRatio,
    opacity,
    skippedFeaturesHash,
    featureCallback,
    oneByOne,
    opt_hitExtent
  ) {
    var gl = context.getGL();
    var tmpStencil, tmpStencilFunc, tmpStencilMaskVal, tmpStencilRef, tmpStencilMask,
        tmpStencilOpFail, tmpStencilOpPass, tmpStencilOpZFail;

    if (this.lineStringReplay) {
      tmpStencil = gl.isEnabled(gl.STENCIL_TEST);
      tmpStencilFunc = gl.getParameter(gl.STENCIL_FUNC);
      tmpStencilMaskVal = gl.getParameter(gl.STENCIL_VALUE_MASK);
      tmpStencilRef = gl.getParameter(gl.STENCIL_REF);
      tmpStencilMask = gl.getParameter(gl.STENCIL_WRITEMASK);
      tmpStencilOpFail = gl.getParameter(gl.STENCIL_FAIL);
      tmpStencilOpPass = gl.getParameter(gl.STENCIL_PASS_DEPTH_PASS);
      tmpStencilOpZFail = gl.getParameter(gl.STENCIL_PASS_DEPTH_FAIL);

      gl.enable(gl.STENCIL_TEST);
      gl.clear(gl.STENCIL_BUFFER_BIT);
      gl.stencilMask(255);
      gl.stencilFunc(gl.ALWAYS, 1, 255);
      gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);

      this.lineStringReplay.replay(context,
        center, resolution, rotation, size, pixelRatio,
        opacity, skippedFeaturesHash,
        featureCallback, oneByOne, opt_hitExtent);

      gl.stencilMask(0);
      gl.stencilFunc(gl.NOTEQUAL, 1, 255);
    }

    context.bindBuffer(ARRAY_BUFFER, this.verticesBuffer);

    context.bindBuffer(ELEMENT_ARRAY_BUFFER, this.indicesBuffer);

    var locations = this.setUpProgram(gl, context, size, pixelRatio);

    // set the "uniform" values
    var projectionMatrix = resetTransform(this.projectionMatrix_);
    scaleTransform(projectionMatrix, 2 / (resolution * size[0]), 2 / (resolution * size[1]));
    rotateTransform(projectionMatrix, -rotation);
    translateTransform(projectionMatrix, -(center[0] - this.origin[0]), -(center[1] - this.origin[1]));

    var offsetScaleMatrix = resetTransform(this.offsetScaleMatrix_);
    scaleTransform(offsetScaleMatrix, 2 / size[0], 2 / size[1]);

    var offsetRotateMatrix = resetTransform(this.offsetRotateMatrix_);
    if (rotation !== 0) {
      rotateTransform(offsetRotateMatrix, -rotation);
    }

    gl.uniformMatrix4fv(locations.u_projectionMatrix, false,
      fromTransform(this.tmpMat4_, projectionMatrix));
    gl.uniformMatrix4fv(locations.u_offsetScaleMatrix, false,
      fromTransform(this.tmpMat4_, offsetScaleMatrix));
    gl.uniformMatrix4fv(locations.u_offsetRotateMatrix, false,
      fromTransform(this.tmpMat4_, offsetRotateMatrix));
    gl.uniform1f(locations.u_opacity, opacity);

    // draw!
    var result;
    if (featureCallback === undefined) {
      this.drawReplay(gl, context, skippedFeaturesHash, false);
    } else {
      // draw feature by feature for the hit-detection
      result = this.drawHitDetectionReplay(gl, context, skippedFeaturesHash,
        featureCallback, oneByOne, opt_hitExtent);
    }

    // disable the vertex attrib arrays
    this.shutDownProgram(gl, locations);

    if (this.lineStringReplay) {
      if (!tmpStencil) {
        gl.disable(gl.STENCIL_TEST);
      }
      gl.clear(gl.STENCIL_BUFFER_BIT);
      gl.stencilFunc(/** @type {number} */ (tmpStencilFunc),
        /** @type {number} */ (tmpStencilRef), /** @type {number} */ (tmpStencilMaskVal));
      gl.stencilMask(/** @type {number} */ (tmpStencilMask));
      gl.stencilOp(/** @type {number} */ (tmpStencilOpFail),
        /** @type {number} */ (tmpStencilOpZFail), /** @type {number} */ (tmpStencilOpPass));
    }

    return result;
  };

  /**
   * @protected
   * @param {WebGLRenderingContext} gl gl.
   * @param {module:ol/webgl/Context} context Context.
   * @param {number} start Start index.
   * @param {number} end End index.
   */
  WebGLReplay.prototype.drawElements = function drawElements (gl, context, start, end) {
    var elementType = context.hasOESElementIndexUint ?
      UNSIGNED_INT : UNSIGNED_SHORT;
    var elementSize = context.hasOESElementIndexUint ? 4 : 2;

    var numItems = end - start;
    var offsetInBytes = start * elementSize;
    gl.drawElements(TRIANGLES, numItems, elementType, offsetInBytes);
  };

  return WebGLReplay;
}(VectorContext));


export default WebGLReplay;

//# sourceMappingURL=Replay.js.map