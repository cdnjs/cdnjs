/**
 * @module ol/renderer/webgl/shaders
 */
import { asArray } from '../../color.js';
/** @typedef {'color'|'opacity'|'width'} DefaultAttributes */
/**
 * Packs red/green/blue channels of a color into a single float value; alpha is ignored.
 * This is how the color is expected to be computed.
 * @param {import("../../color.js").Color|string} color Color as array of numbers or string
 * @return {number} Float value containing the color
 */
export function packColor(color) {
    var array = asArray(color);
    var r = array[0] * 256 * 256;
    var g = array[1] * 256;
    var b = array[2];
    return r + g + b;
}
var DECODE_COLOR_EXPRESSION = "vec3(\n  fract(floor(a_color / 256.0 / 256.0) / 256.0),\n  fract(floor(a_color / 256.0) / 256.0),\n  fract(a_color / 256.0)\n);";
/**
 * Default polygon vertex shader.
 * Relies on the color and opacity attributes.
 * @type {string}
 */
export var FILL_VERTEX_SHADER = "\n  precision mediump float;\n  uniform mat4 u_projectionMatrix;\n  attribute vec2 a_position;\n  attribute float a_color;\n  attribute float a_opacity;\n  varying vec3 v_color;\n  varying float v_opacity;\n\n  void main(void) {\n    gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0);\n    v_color = ".concat(DECODE_COLOR_EXPRESSION, "\n    v_opacity = a_opacity;\n  }");
/**
 * Default polygon fragment shader.
 * @type {string}
 */
export var FILL_FRAGMENT_SHADER = "\n  precision mediump float;\n  varying vec3 v_color;\n  varying float v_opacity;\n\n  void main(void) {\n    gl_FragColor = vec4(v_color, 1.0) * v_opacity;\n  }";
/**
 * Default linestring vertex shader.
 * Relies on color, opacity and width attributes.
 * @type {string}
 */
export var STROKE_VERTEX_SHADER = "\n  precision mediump float;\n  uniform mat4 u_projectionMatrix;\n  uniform vec2 u_sizePx;\n  attribute vec2 a_segmentStart;\n  attribute vec2 a_segmentEnd;\n  attribute float a_parameters;\n  attribute float a_color;\n  attribute float a_opacity;\n  attribute float a_width;\n  varying vec2 v_segmentStart;\n  varying vec2 v_segmentEnd;\n  varying float v_angleStart;\n  varying float v_angleEnd;\n  varying vec3 v_color;\n  varying float v_opacity;\n  varying float v_width;\n\n  vec2 worldToPx(vec2 worldPos) {\n    vec4 screenPos = u_projectionMatrix * vec4(worldPos, 0.0, 1.0);\n    return (0.5 * screenPos.xy + 0.5) * u_sizePx;\n  }\n\n  vec4 pxToScreen(vec2 pxPos) {\n    vec2 screenPos = pxPos * 4.0 / u_sizePx;\n    return vec4(screenPos.xy, 0.0, 0.0);\n  }\n\n  vec2 getOffsetDirection(vec2 normalPx, vec2 tangentPx, float joinAngle) {\n    if (cos(joinAngle) > 0.93) return normalPx - tangentPx;\n    float halfAngle = joinAngle / 2.0;\n    vec2 angleBisectorNormal = vec2(\n      sin(halfAngle) * normalPx.x + cos(halfAngle) * normalPx.y,\n      -cos(halfAngle) * normalPx.x + sin(halfAngle) * normalPx.y\n    );\n    float length = 1.0 / sin(halfAngle);\n    return angleBisectorNormal * length;\n  }\n\n  void main(void) {\n    float anglePrecision = 1500.0;\n    float paramShift = 10000.0;\n    v_angleStart = fract(a_parameters / paramShift) * paramShift / anglePrecision;\n    v_angleEnd = fract(floor(a_parameters / paramShift + 0.5) / paramShift) * paramShift / anglePrecision;\n    float vertexNumber = floor(a_parameters / paramShift / paramShift + 0.0001);\n    vec2 tangentPx = worldToPx(a_segmentEnd) - worldToPx(a_segmentStart);\n    tangentPx = normalize(tangentPx);\n    vec2 normalPx = vec2(-tangentPx.y, tangentPx.x);\n    float normalDir = vertexNumber < 0.5 || (vertexNumber > 1.5 && vertexNumber < 2.5) ? 1.0 : -1.0;\n    float tangentDir = vertexNumber < 1.5 ? 1.0 : -1.0;\n    float angle = vertexNumber < 1.5 ? v_angleStart : v_angleEnd;\n    vec2 offsetPx = getOffsetDirection(normalPx * normalDir, tangentDir * tangentPx, angle) * a_width * 0.5;\n    vec2 position =  vertexNumber < 1.5 ? a_segmentStart : a_segmentEnd;\n    gl_Position = u_projectionMatrix * vec4(position, 0.0, 1.0) + pxToScreen(offsetPx);\n    v_segmentStart = worldToPx(a_segmentStart);\n    v_segmentEnd = worldToPx(a_segmentEnd);\n    v_color = ".concat(DECODE_COLOR_EXPRESSION, "\n    v_opacity = a_opacity;\n    v_width = a_width;\n  }");
/**
 * Default linestring fragment shader.
 * @type {string}
 */
export var STROKE_FRAGMENT_SHADER = "\n  precision mediump float;\n  uniform float u_pixelRatio;\n  varying vec2 v_segmentStart;\n  varying vec2 v_segmentEnd;\n  varying float v_angleStart;\n  varying float v_angleEnd;\n  varying vec3 v_color;\n  varying float v_opacity;\n  varying float v_width;\n\n  float segmentDistanceField(vec2 point, vec2 start, vec2 end, float radius) {\n    vec2 startToPoint = point - start;\n    vec2 startToEnd = end - start;\n    float ratio = clamp(dot(startToPoint, startToEnd) / dot(startToEnd, startToEnd), 0.0, 1.0);\n    float dist = length(startToPoint - ratio * startToEnd);\n    return 1.0 - smoothstep(radius - 1.0, radius, dist);\n  }\n\n  void main(void) {\n    vec2 v_currentPoint = gl_FragCoord.xy / u_pixelRatio;\n    gl_FragColor = vec4(v_color, 1.0) * v_opacity;\n    gl_FragColor *= segmentDistanceField(v_currentPoint, v_segmentStart, v_segmentEnd, v_width);\n  }";
/**
 * Default point vertex shader.
 * Relies on color and opacity attributes.
 * @type {string}
 */
export var POINT_VERTEX_SHADER = "\n  precision mediump float;\n  uniform mat4 u_projectionMatrix;\n  uniform mat4 u_offsetScaleMatrix;\n  attribute vec2 a_position;\n  attribute float a_index;\n  attribute float a_color;\n  attribute float a_opacity;\n  varying vec2 v_texCoord;\n  varying vec3 v_color;\n  varying float v_opacity;\n\n  void main(void) {\n    mat4 offsetMatrix = u_offsetScaleMatrix;\n    float size = 6.0;\n    float offsetX = a_index == 0.0 || a_index == 3.0 ? -size / 2.0 : size / 2.0;\n    float offsetY = a_index == 0.0 || a_index == 1.0 ? -size / 2.0 : size / 2.0;\n    vec4 offsets = offsetMatrix * vec4(offsetX, offsetY, 0.0, 0.0);\n    gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0) + offsets;\n    float u = a_index == 0.0 || a_index == 3.0 ? 0.0 : 1.0;\n    float v = a_index == 0.0 || a_index == 1.0 ? 0.0 : 1.0;\n    v_texCoord = vec2(u, v);\n    v_color = ".concat(DECODE_COLOR_EXPRESSION, "\n    v_opacity = a_opacity;\n  }");
/**
 * Default point fragment shader.
 * @type {string}
 */
export var POINT_FRAGMENT_SHADER = "\n  precision mediump float;\n  varying vec3 v_color;\n  varying float v_opacity;\n\n  void main(void) {\n      gl_FragColor = vec4(v_color, 1.0) * v_opacity;\n  }";
//# sourceMappingURL=shaders.js.map