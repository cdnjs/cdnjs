/**
 * @module ol/webgl/Buffer
 */
import {STATIC_DRAW, STREAM_DRAW, DYNAMIC_DRAW} from '../webgl.js';

/**
 * @enum {number}
 */
var BufferUsage = {
  STATIC_DRAW: STATIC_DRAW,
  STREAM_DRAW: STREAM_DRAW,
  DYNAMIC_DRAW: DYNAMIC_DRAW
};


var WebGLBuffer = function WebGLBuffer(opt_arr, opt_usage) {

  /**
   * @private
   * @type {Array<number>}
   */
  this.arr_ = opt_arr !== undefined ? opt_arr : [];

  /**
   * @private
   * @type {number}
   */
  this.usage_ = opt_usage !== undefined ? opt_usage : BufferUsage.STATIC_DRAW;

};

/**
 * @return {Array<number>} Array.
 */
WebGLBuffer.prototype.getArray = function getArray () {
  return this.arr_;
};

/**
 * @return {number} Usage.
 */
WebGLBuffer.prototype.getUsage = function getUsage () {
  return this.usage_;
};

export default WebGLBuffer;

//# sourceMappingURL=Buffer.js.map