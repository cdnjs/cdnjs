/**
 * @module ol/webgl/Vertex
 */

import {VERTEX_SHADER} from '../webgl.js';
import WebGLShader from '../webgl/Shader.js';

var WebGLVertex = /*@__PURE__*/(function (WebGLShader) {
  function WebGLVertex(source) {
    WebGLShader.call(this, source);
  }

  if ( WebGLShader ) WebGLVertex.__proto__ = WebGLShader;
  WebGLVertex.prototype = Object.create( WebGLShader && WebGLShader.prototype );
  WebGLVertex.prototype.constructor = WebGLVertex;

  /**
   * @inheritDoc
   */
  WebGLVertex.prototype.getType = function getType () {
    return VERTEX_SHADER;
  };

  return WebGLVertex;
}(WebGLShader));


export default WebGLVertex;

//# sourceMappingURL=Vertex.js.map