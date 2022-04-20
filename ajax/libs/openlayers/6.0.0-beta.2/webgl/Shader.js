/**
 * @module ol/webgl/Shader
 */
import { abstract } from '../util.js';
/**
 * @abstract
 */
var WebGLShader = /** @class */ (function () {
    /**
     * @param {string} source Source.
     */
    function WebGLShader(source) {
        /**
         * @private
         * @type {string}
         */
        this.source_ = source;
    }
    /**
     * @return {boolean} Is animated?
     */
    WebGLShader.prototype.isAnimated = function () {
        return false;
    };
    /**
     * @abstract
     * @return {number} Type.
     */
    WebGLShader.prototype.getType = function () {
        return abstract();
    };
    /**
     * @return {string} Source.
     */
    WebGLShader.prototype.getSource = function () {
        return this.source_;
    };
    return WebGLShader;
}());
export default WebGLShader;
//# sourceMappingURL=Shader.js.map