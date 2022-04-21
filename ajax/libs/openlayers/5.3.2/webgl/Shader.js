/**
 * @module ol/webgl/Shader
 */
import {abstract} from '../util.js';

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
 * @return {boolean} Is animated?
 */
WebGLShader.prototype.isAnimated = function isAnimated () {
  return false;
};

/**
 * @abstract
 * @return {number} Type.
 */
WebGLShader.prototype.getType = function getType () {
  return abstract();
};

/**
 * @return {string} Source.
 */
WebGLShader.prototype.getSource = function getSource () {
  return this.source_;
};


export default WebGLShader;

//# sourceMappingURL=Shader.js.map