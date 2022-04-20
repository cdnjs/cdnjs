/**
 * @module ol/webgl/Fragment
 */

import {FRAGMENT_SHADER} from '../webgl.js';
import WebGLShader from '../webgl/Shader.js';

var WebGLFragment = /*@__PURE__*/(function (WebGLShader) {
  function WebGLFragment(source) {
    WebGLShader.call(this, source);
  }

  if ( WebGLShader ) WebGLFragment.__proto__ = WebGLShader;
  WebGLFragment.prototype = Object.create( WebGLShader && WebGLShader.prototype );
  WebGLFragment.prototype.constructor = WebGLFragment;

  /**
   * @inheritDoc
   */
  WebGLFragment.prototype.getType = function getType () {
    return FRAGMENT_SHADER;
  };

  return WebGLFragment;
}(WebGLShader));


export default WebGLFragment;

//# sourceMappingURL=Fragment.js.map