/**
 * @module ol/webgl/Shader
 */
import {FALSE} from '../functions.js';

/**
 * @abstract
 */
var WebGLShader = function WebGLShader(source) {

  /**
   * @private
   * @type {string}
   */
  this.source_ = source;

};

/**
 * @abstract
 * @return {number} Type.
 */
WebGLShader.prototype.getType = function getType () {};

/**
 * @return {string} Source.
 */
WebGLShader.prototype.getSource = function getSource () {
  return this.source_;
};


/**
 * @return {boolean} Is animated?
 */
WebGLShader.prototype.isAnimated = FALSE;
export default WebGLShader;

//# sourceMappingURL=Shader.js.map