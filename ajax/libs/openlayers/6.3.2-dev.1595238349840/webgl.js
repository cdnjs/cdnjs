/**
 * @module ol/webgl
 */
/**
 * Constants taken from goog.webgl
 */
/**
 * Used by {@link module:ol/webgl/Helper~WebGLHelper} for buffers containing vertices data, such as
 * position, color, texture coordinate, etc. These vertices are then referenced by an index buffer
 * to be drawn on screen (see {@link module:ol/webgl.ELEMENT_ARRAY_BUFFER}).
 * @const
 * @type {number}
 * @api
 */
export var ARRAY_BUFFER = 0x8892;
/**
 * Used by {@link module:ol/webgl/Helper~WebGLHelper} for buffers containing indices data.
 * Index buffers are essentially lists of references to vertices defined in a vertex buffer
 * (see {@link module:ol/webgl.ARRAY_BUFFER}), and define the primitives (triangles) to be drawn.
 * @const
 * @type {number}
 * @api
 */
export var ELEMENT_ARRAY_BUFFER = 0x8893;
/**
 * Used by {link module:ol/webgl/Buffer~WebGLArrayBuffer}.
 * @const
 * @type {number}
 * @api
 */
export var STREAM_DRAW = 0x88e0;
/**
 * Used by {link module:ol/webgl/Buffer~WebGLArrayBuffer}.
 * @const
 * @type {number}
 * @api
 */
export var STATIC_DRAW = 0x88e4;
/**
 * Used by {link module:ol/webgl/Buffer~WebGLArrayBuffer}.
 * @const
 * @type {number}
 * @api
 */
export var DYNAMIC_DRAW = 0x88e8;
/**
 * @const
 * @type {number}
 */
export var UNSIGNED_BYTE = 0x1401;
/**
 * @const
 * @type {number}
 */
export var UNSIGNED_SHORT = 0x1403;
/**
 * @const
 * @type {number}
 */
export var UNSIGNED_INT = 0x1405;
/**
 * @const
 * @type {number}
 */
export var FLOAT = 0x1406;
/** end of goog.webgl constants
 */
/**
 * @const
 * @type {Array<string>}
 */
var CONTEXT_IDS = ['experimental-webgl', 'webgl', 'webkit-3d', 'moz-webgl'];
/**
 * @param {HTMLCanvasElement} canvas Canvas.
 * @param {Object=} opt_attributes Attributes.
 * @return {WebGLRenderingContext} WebGL rendering context.
 */
export function getContext(canvas, opt_attributes) {
    var ii = CONTEXT_IDS.length;
    for (var i = 0; i < ii; ++i) {
        try {
            var context = canvas.getContext(CONTEXT_IDS[i], opt_attributes);
            if (context) {
                return /** @type {!WebGLRenderingContext} */ (context);
            }
        }
        catch (e) {
            // pass
        }
    }
    return null;
}
/**
 * @type {Array<string>}
 */
var supportedExtensions;
/**
 * @return {Array<string>} List of supported WebGL extensions.
 */
export function getSupportedExtensions() {
    if (!supportedExtensions) {
        var canvas = document.createElement('canvas');
        var gl = getContext(canvas);
        if (gl) {
            supportedExtensions = gl.getSupportedExtensions();
        }
    }
    return supportedExtensions;
}
//# sourceMappingURL=webgl.js.map