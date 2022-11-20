var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/layer/WebGLTile
 */
import BaseTileLayer from './BaseTile.js';
import WebGLTileLayerRenderer, { Attributes, Uniforms, } from '../renderer/webgl/TileLayer.js';
import { ValueTypes, expressionToGlsl, getStringNumberEquivalent, uniformNameForVariable, } from '../style/expressions.js';
import { assign } from '../obj.js';
/**
 * @typedef {Object} Style
 * Translates tile data to rendered pixels.
 *
 * @property {Object<string, number>} [variables] Style variables.  Each variable must hold a number.  These
 * variables can be used in the `color`, `brightness`, `contrast`, `exposure`, `saturation` and `gamma`
 * {@link import("../style/expressions.js").ExpressionValue expressions}, using the `['var', 'varName']` operator.
 * To update style variables, use the {@link import("./WebGLTile.js").default#updateStyleVariables} method.
 * @property {import("../style/expressions.js").ExpressionValue} [color] An expression applied to color values.
 * @property {import("../style/expressions.js").ExpressionValue} [brightness=0] Value used to decrease or increase
 * the layer brightness.  Values range from -1 to 1.
 * @property {import("../style/expressions.js").ExpressionValue} [contrast=0] Value used to decrease or increase
 * the layer contrast.  Values range from -1 to 1.
 * @property {import("../style/expressions.js").ExpressionValue} [exposure=0] Value used to decrease or increase
 * the layer exposure.  Values range from -1 to 1.
 * @property {import("../style/expressions.js").ExpressionValue} [saturation=0] Value used to decrease or increase
 * the layer saturation.  Values range from -1 to 1.
 * @property {import("../style/expressions.js").ExpressionValue} [gamma=1] Apply a gamma correction to the layer.
 * Values range from 0 to infinity.
 */
/**
 * @typedef {Object} Options
 * @property {Style} [style] Style to apply to the layer.
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {number} [preload=0] Preload. Load low-resolution tiles up to `preload` levels. `0`
 * means no preloading.
 * @property {import("../source/Tile.js").default} [source] Source for this layer.
 * @property {import("../PluggableMap.js").default} [map] Sets the layer as overlay on a map. The map will not manage
 * this layer in its layers collection, and the layer will be rendered on top. This is useful for
 * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
 * use {@link module:ol/Map#addLayer}.
 * @property {boolean} [useInterimTilesOnError=true] Use interim tiles on error.
 * @property {number} [cacheSize=512] The internal texture cache size.  This needs to be large enough to render
 * two zoom levels worth of tiles.
 */
/**
 * @typedef {Object} ParsedStyle
 * @property {string} vertexShader The vertex shader.
 * @property {string} fragmentShader The fragment shader.
 * @property {Object<string,import("../webgl/Helper.js").UniformValue>} uniforms Uniform definitions.
 */
/**
 * @param {Style} style The layer style.
 * @param {number} [bandCount] The number of bands.
 * @return {ParsedStyle} Shaders and uniforms generated from the style.
 */
function parseStyle(style, bandCount) {
    var vertexShader = "\n    attribute vec2 " + Attributes.TEXTURE_COORD + ";\n    uniform mat4 " + Uniforms.TILE_TRANSFORM + ";\n    uniform float " + Uniforms.DEPTH + ";\n\n    varying vec2 v_textureCoord;\n\n    void main() {\n      v_textureCoord = " + Attributes.TEXTURE_COORD + ";\n      gl_Position = " + Uniforms.TILE_TRANSFORM + " * vec4(" + Attributes.TEXTURE_COORD + ", " + Uniforms.DEPTH + ", 1.0);\n    }\n  ";
    /**
     * @type {import("../style/expressions.js").ParsingContext}
     */
    var context = {
        inFragmentShader: true,
        variables: [],
        attributes: [],
        stringLiteralsMap: {},
        bandCount: bandCount,
    };
    var pipeline = [];
    if (style.color !== undefined) {
        var color = expressionToGlsl(context, style.color, ValueTypes.COLOR);
        pipeline.push("color = " + color + ";");
    }
    if (style.contrast !== undefined) {
        var contrast = expressionToGlsl(context, style.contrast, ValueTypes.NUMBER);
        pipeline.push("color.rgb = clamp((" + contrast + " + 1.0) * color.rgb - (" + contrast + " / 2.0), vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0));");
    }
    if (style.exposure !== undefined) {
        var exposure = expressionToGlsl(context, style.exposure, ValueTypes.NUMBER);
        pipeline.push("color.rgb = clamp((" + exposure + " + 1.0) * color.rgb, vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0));");
    }
    if (style.saturation !== undefined) {
        var saturation = expressionToGlsl(context, style.saturation, ValueTypes.NUMBER);
        pipeline.push("\n      float saturation = " + saturation + " + 1.0;\n      float sr = (1.0 - saturation) * 0.2126;\n      float sg = (1.0 - saturation) * 0.7152;\n      float sb = (1.0 - saturation) * 0.0722;\n      mat3 saturationMatrix = mat3(\n        sr + saturation, sr, sr,\n        sg, sg + saturation, sg,\n        sb, sb, sb + saturation\n      );\n      color.rgb = clamp(saturationMatrix * color.rgb, vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0));\n    ");
    }
    if (style.gamma !== undefined) {
        var gamma = expressionToGlsl(context, style.gamma, ValueTypes.NUMBER);
        pipeline.push("color.rgb = pow(color.rgb, vec3(1.0 / " + gamma + "));");
    }
    if (style.brightness !== undefined) {
        var brightness = expressionToGlsl(context, style.brightness, ValueTypes.NUMBER);
        pipeline.push("color.rgb = clamp(color.rgb + " + brightness + ", vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0));");
    }
    /** @type {Object<string,import("../webgl/Helper").UniformValue>} */
    var uniforms = {};
    var numVariables = context.variables.length;
    if (numVariables > 1 && !style.variables) {
        throw new Error("Missing variables in style (expected " + context.variables + ")");
    }
    var _loop_1 = function (i) {
        var variableName = context.variables[i];
        if (!(variableName in style.variables)) {
            throw new Error("Missing '" + variableName + "' in style variables");
        }
        var uniformName = uniformNameForVariable(variableName);
        uniforms[uniformName] = function () {
            var value = style.variables[variableName];
            if (typeof value === 'string') {
                value = getStringNumberEquivalent(context, value);
            }
            return value !== undefined ? value : -9999999; // to avoid matching with the first string literal
        };
    };
    for (var i = 0; i < numVariables; ++i) {
        _loop_1(i);
    }
    var uniformDeclarations = Object.keys(uniforms).map(function (name) {
        return "uniform float " + name + ";";
    });
    var textureCount = Math.ceil(bandCount / 4);
    var colorAssignments = new Array(textureCount);
    for (var textureIndex = 0; textureIndex < textureCount; ++textureIndex) {
        var uniformName = Uniforms.TILE_TEXTURE_PREFIX + textureIndex;
        uniformDeclarations.push("uniform sampler2D " + uniformName + ";");
        colorAssignments[textureIndex] = "vec4 color" + textureIndex + " = texture2D(" + uniformName + ", v_textureCoord);";
    }
    var fragmentShader = "\n    #ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    #else\n    precision mediump float;\n    #endif\n\n    varying vec2 v_textureCoord;\n    uniform float " + Uniforms.TRANSITION_ALPHA + ";\n    uniform float " + Uniforms.TEXTURE_PIXEL_WIDTH + ";\n    uniform float " + Uniforms.TEXTURE_PIXEL_HEIGHT + ";\n    uniform float " + Uniforms.RESOLUTION + ";\n    uniform float " + Uniforms.ZOOM + ";\n\n    " + uniformDeclarations.join('\n') + "\n\n    void main() {\n      " + colorAssignments.join('\n') + "\n\n      vec4 color = color0;\n\n      " + pipeline.join('\n') + "\n\n      if (color.a == 0.0) {\n        discard;\n      }\n\n      gl_FragColor = color;\n      gl_FragColor.rgb *= gl_FragColor.a;\n      gl_FragColor *= " + Uniforms.TRANSITION_ALPHA + ";\n    }";
    return {
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: uniforms,
    };
}
/**
 * @classdesc
 * For layer sources that provide pre-rendered, tiled images in grids that are
 * organized by zoom levels for specific resolutions.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * **Important**: after removing a `WebGLTile` layer from your map, call `layer.dispose()`
 * to clean up underlying resources.
 *
 * @extends BaseTileLayer<import("../source/DataTile.js").default|import("../source/TileImage.js").default>
 * @api
 */
var WebGLTileLayer = /** @class */ (function (_super) {
    __extends(WebGLTileLayer, _super);
    /**
     * @param {Options} opt_options Tile layer options.
     */
    function WebGLTileLayer(opt_options) {
        var _this = this;
        var options = opt_options ? assign({}, opt_options) : {};
        var style = options.style || {};
        delete options.style;
        var cacheSize = options.cacheSize;
        delete options.cacheSize;
        _this = _super.call(this, options) || this;
        /**
         * @type {Style}
         * @private
         */
        _this.style_ = style;
        /**
         * @type {number}
         * @private
         */
        _this.cacheSize_ = cacheSize;
        return _this;
    }
    /**
     * Create a renderer for this layer.
     * @return {import("../renderer/Layer.js").default} A layer renderer.
     * @protected
     */
    WebGLTileLayer.prototype.createRenderer = function () {
        var source = this.getSource();
        var parsedStyle = parseStyle(this.style_, 'bandCount' in source ? source.bandCount : 4);
        this.styleVariables_ = this.style_.variables || {};
        return new WebGLTileLayerRenderer(this, {
            vertexShader: parsedStyle.vertexShader,
            fragmentShader: parsedStyle.fragmentShader,
            uniforms: parsedStyle.uniforms,
            className: this.getClassName(),
            cacheSize: this.cacheSize_,
        });
    };
    /**
     * Update any variables used by the layer style and trigger a re-render.
     * @param {Object<string, number>} variables Variables to update.
     * @api
     */
    WebGLTileLayer.prototype.updateStyleVariables = function (variables) {
        assign(this.styleVariables_, variables);
        this.changed();
    };
    return WebGLTileLayer;
}(BaseTileLayer));
/**
 * Clean up underlying WebGL resources.
 * @function
 * @api
 */
WebGLTileLayer.prototype.dispose;
export default WebGLTileLayer;
//# sourceMappingURL=WebGLTile.js.map