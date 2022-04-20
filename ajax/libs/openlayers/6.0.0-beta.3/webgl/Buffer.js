/**
 * @module ol/webgl/Buffer
 */
import { STATIC_DRAW, STREAM_DRAW, DYNAMIC_DRAW } from '../webgl.js';
/**
 * @enum {number}
 */
var BufferUsage = {
    STATIC_DRAW: STATIC_DRAW,
    STREAM_DRAW: STREAM_DRAW,
    DYNAMIC_DRAW: DYNAMIC_DRAW
};
var WebGLArrayBuffer = /** @class */ (function () {
    /**
     * @param {Array<number>=} opt_arr Array.
     * @param {number=} opt_usage Usage.
     */
    function WebGLArrayBuffer(opt_arr, opt_usage) {
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
    }
    /**
     * @return {Array<number>} Array.
     */
    WebGLArrayBuffer.prototype.getArray = function () {
        return this.arr_;
    };
    /**
     * @return {number} Usage.
     */
    WebGLArrayBuffer.prototype.getUsage = function () {
        return this.usage_;
    };
    return WebGLArrayBuffer;
}());
export default WebGLArrayBuffer;
//# sourceMappingURL=Buffer.js.map