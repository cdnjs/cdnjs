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
import LayerProperty from '../layer/Property.js';
import SourceState from '../source/State.js';
import WebGLTileLayerRenderer, { Attributes, Uniforms, } from '../renderer/webgl/TileLayer.js';
import { PALETTE_TEXTURE_ARRAY, ValueTypes, expressionToGlsl, getStringNumberEquivalent, uniformNameForVariable, } from '../style/expressions.js';
import { assign } from '../obj.js';
/**
 * @typedef {import("../source/DataTile.js").default|import("../source/TileImage.js").default} SourceType
 */
/**
 * @typedef {Object} Style
 * Translates tile data to rendered pixels.
 *
 * @property {Object<string, (string|number)>} [variables] Style variables.  Each variable must hold a number or string.  These
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
 * @property {SourceType} [source] Source for this layer.
 * @property {Array<SourceType>|function(import("../extent.js").Extent, number):Array<SourceType>} [sources] Array
 * of sources for this layer. Takes precedence over `source`. Can either be an array of sources, or a function that
 * expects an extent and a resolution (in view projection units per pixel) and returns an array of sources. See
 * {@link module:ol/source.sourcesFromTileGrid} for a helper function to generate sources that are organized in a
 * pyramid following the same pattern as a tile grid.
 * @property {import("../PluggableMap.js").default} [map] Sets the layer as overlay on a map. The map will not manage
 * this layer in its layers collection, and the layer will be rendered on top. This is useful for
 * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
 * use {@link module:ol/Map~Map#addLayer}.
 * @property {boolean} [useInterimTilesOnError=true] Use interim tiles on error.
 * @property {number} [cacheSize=512] The internal texture cache size.  This needs to be large enough to render
 * two zoom levels worth of tiles.
 */
/**
 * @typedef {Object} ParsedStyle
 * @property {string} vertexShader The vertex shader.
 * @property {string} fragmentShader The fragment shader.
 * @property {Object<string,import("../webgl/Helper.js").UniformValue>} uniforms Uniform definitions.
 * @property {Array<import("../webgl/PaletteTexture.js").default>} paletteTextures Palette textures.
 */
/**
 * @param {Style} style The layer style.
 * @param {number} [bandCount] The number of bands.
 * @return {ParsedStyle} Shaders and uniforms generated from the style.
 */
function parseStyle(style, bandCount) {
    var vertexShader = "\n    attribute vec2 ".concat(Attributes.TEXTURE_COORD, ";\n    uniform mat4 ").concat(Uniforms.TILE_TRANSFORM, ";\n    uniform float ").concat(Uniforms.TEXTURE_PIXEL_WIDTH, ";\n    uniform float ").concat(Uniforms.TEXTURE_PIXEL_HEIGHT, ";\n    uniform float ").concat(Uniforms.TEXTURE_RESOLUTION, ";\n    uniform float ").concat(Uniforms.TEXTURE_ORIGIN_X, ";\n    uniform float ").concat(Uniforms.TEXTURE_ORIGIN_Y, ";\n    uniform float ").concat(Uniforms.DEPTH, ";\n\n    varying vec2 v_textureCoord;\n    varying vec2 v_mapCoord;\n\n    void main() {\n      v_textureCoord = ").concat(Attributes.TEXTURE_COORD, ";\n      v_mapCoord = vec2(\n        ").concat(Uniforms.TEXTURE_ORIGIN_X, " + ").concat(Uniforms.TEXTURE_RESOLUTION, " * ").concat(Uniforms.TEXTURE_PIXEL_WIDTH, " * v_textureCoord[0],\n        ").concat(Uniforms.TEXTURE_ORIGIN_Y, " - ").concat(Uniforms.TEXTURE_RESOLUTION, " * ").concat(Uniforms.TEXTURE_PIXEL_HEIGHT, " * v_textureCoord[1]\n      );\n      gl_Position = ").concat(Uniforms.TILE_TRANSFORM, " * vec4(").concat(Attributes.TEXTURE_COORD, ", ").concat(Uniforms.DEPTH, ", 1.0);\n    }\n  ");
    /**
     * @type {import("../style/expressions.js").ParsingContext}
     */
    var context = {
        inFragmentShader: true,
        variables: [],
        attributes: [],
        stringLiteralsMap: {},
        functions: {},
        bandCount: bandCount,
    };
    var pipeline = [];
    if (style.color !== undefined) {
        var color = expressionToGlsl(context, style.color, ValueTypes.COLOR);
        pipeline.push("color = ".concat(color, ";"));
    }
    if (style.contrast !== undefined) {
        var contrast = expressionToGlsl(context, style.contrast, ValueTypes.NUMBER);
        pipeline.push("color.rgb = clamp((".concat(contrast, " + 1.0) * color.rgb - (").concat(contrast, " / 2.0), vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0));"));
    }
    if (style.exposure !== undefined) {
        var exposure = expressionToGlsl(context, style.exposure, ValueTypes.NUMBER);
        pipeline.push("color.rgb = clamp((".concat(exposure, " + 1.0) * color.rgb, vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0));"));
    }
    if (style.saturation !== undefined) {
        var saturation = expressionToGlsl(context, style.saturation, ValueTypes.NUMBER);
        pipeline.push("\n      float saturation = ".concat(saturation, " + 1.0;\n      float sr = (1.0 - saturation) * 0.2126;\n      float sg = (1.0 - saturation) * 0.7152;\n      float sb = (1.0 - saturation) * 0.0722;\n      mat3 saturationMatrix = mat3(\n        sr + saturation, sr, sr,\n        sg, sg + saturation, sg,\n        sb, sb, sb + saturation\n      );\n      color.rgb = clamp(saturationMatrix * color.rgb, vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0));\n    "));
    }
    if (style.gamma !== undefined) {
        var gamma = expressionToGlsl(context, style.gamma, ValueTypes.NUMBER);
        pipeline.push("color.rgb = pow(color.rgb, vec3(1.0 / ".concat(gamma, "));"));
    }
    if (style.brightness !== undefined) {
        var brightness = expressionToGlsl(context, style.brightness, ValueTypes.NUMBER);
        pipeline.push("color.rgb = clamp(color.rgb + ".concat(brightness, ", vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0));"));
    }
    /** @type {Object<string,import("../webgl/Helper").UniformValue>} */
    var uniforms = {};
    var numVariables = context.variables.length;
    if (numVariables > 1 && !style.variables) {
        throw new Error("Missing variables in style (expected ".concat(context.variables, ")"));
    }
    var _loop_1 = function (i) {
        var variableName = context.variables[i];
        if (!(variableName in style.variables)) {
            throw new Error("Missing '".concat(variableName, "' in style variables"));
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
        return "uniform float ".concat(name, ";");
    });
    var textureCount = Math.ceil(bandCount / 4);
    uniformDeclarations.push("uniform sampler2D ".concat(Uniforms.TILE_TEXTURE_ARRAY, "[").concat(textureCount, "];"));
    if (context.paletteTextures) {
        uniformDeclarations.push("uniform sampler2D ".concat(PALETTE_TEXTURE_ARRAY, "[").concat(context.paletteTextures.length, "];"));
    }
    var functionDefintions = Object.keys(context.functions).map(function (name) {
        return context.functions[name];
    });
    var fragmentShader = "\n    #ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    #else\n    precision mediump float;\n    #endif\n\n    varying vec2 v_textureCoord;\n    varying vec2 v_mapCoord;\n    uniform vec4 ".concat(Uniforms.RENDER_EXTENT, ";\n    uniform float ").concat(Uniforms.TRANSITION_ALPHA, ";\n    uniform float ").concat(Uniforms.TEXTURE_PIXEL_WIDTH, ";\n    uniform float ").concat(Uniforms.TEXTURE_PIXEL_HEIGHT, ";\n    uniform float ").concat(Uniforms.RESOLUTION, ";\n    uniform float ").concat(Uniforms.ZOOM, ";\n\n    ").concat(uniformDeclarations.join('\n'), "\n\n    ").concat(functionDefintions.join('\n'), "\n\n    void main() {\n      if (\n        v_mapCoord[0] < ").concat(Uniforms.RENDER_EXTENT, "[0] ||\n        v_mapCoord[1] < ").concat(Uniforms.RENDER_EXTENT, "[1] ||\n        v_mapCoord[0] > ").concat(Uniforms.RENDER_EXTENT, "[2] ||\n        v_mapCoord[1] > ").concat(Uniforms.RENDER_EXTENT, "[3]\n      ) {\n        discard;\n      }\n\n      vec4 color = texture2D(").concat(Uniforms.TILE_TEXTURE_ARRAY, "[0],  v_textureCoord);\n\n      ").concat(pipeline.join('\n'), "\n\n      if (color.a == 0.0) {\n        discard;\n      }\n\n      gl_FragColor = color;\n      gl_FragColor.rgb *= gl_FragColor.a;\n      gl_FragColor *= ").concat(Uniforms.TRANSITION_ALPHA, ";\n    }");
    return {
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: uniforms,
        paletteTextures: context.paletteTextures,
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
 * @extends BaseTileLayer<SourceType, WebGLTileLayerRenderer>
 * @fires import("../render/Event.js").RenderEvent
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
         * @type {Array<SourceType>|function(import("../extent.js").Extent, number):Array<SourceType>}
         * @private
         */
        _this.sources_ = options.sources;
        /**
         * @type {SourceType|null}
         * @private
         */
        _this.renderedSource_ = null;
        /**
         * @type {number}
         * @private
         */
        _this.renderedResolution_ = NaN;
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
        /**
         * @type {Object<string, (string|number)>}
         * @private
         */
        _this.styleVariables_ = _this.style_.variables || {};
        _this.addChangeListener(LayerProperty.SOURCE, _this.handleSourceUpdate_);
        return _this;
    }
    /**
     * Gets the sources for this layer, for a given extent and resolution.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @return {Array<SourceType>} Sources.
     */
    WebGLTileLayer.prototype.getSources = function (extent, resolution) {
        var source = this.getSource();
        return this.sources_
            ? typeof this.sources_ === 'function'
                ? this.sources_(extent, resolution)
                : this.sources_
            : source
                ? [source]
                : [];
    };
    /**
     * @return {SourceType} The source being rendered.
     */
    WebGLTileLayer.prototype.getRenderSource = function () {
        return this.renderedSource_ || this.getSource();
    };
    /**
     * @return {import("../source/State.js").default} Source state.
     */
    WebGLTileLayer.prototype.getSourceState = function () {
        var source = this.getRenderSource();
        return source ? source.getState() : SourceState.UNDEFINED;
    };
    /**
     * @private
     */
    WebGLTileLayer.prototype.handleSourceUpdate_ = function () {
        if (this.getSource()) {
            this.setStyle(this.style_);
        }
    };
    /**
     * @private
     * @return {number} The number of source bands.
     */
    WebGLTileLayer.prototype.getSourceBandCount_ = function () {
        var source = this.getSource();
        return source && 'bandCount' in source ? source.bandCount : 4;
    };
    WebGLTileLayer.prototype.createRenderer = function () {
        var parsedStyle = parseStyle(this.style_, this.getSourceBandCount_());
        return new WebGLTileLayerRenderer(this, {
            vertexShader: parsedStyle.vertexShader,
            fragmentShader: parsedStyle.fragmentShader,
            uniforms: parsedStyle.uniforms,
            cacheSize: this.cacheSize_,
            paletteTextures: parsedStyle.paletteTextures,
        });
    };
    /**
     * @param {import("../PluggableMap").FrameState} frameState Frame state.
     * @param {Array<SourceType>} sources Sources.
     * @return {HTMLElement} Canvas.
     */
    WebGLTileLayer.prototype.renderSources = function (frameState, sources) {
        var layerRenderer = this.getRenderer();
        var canvas;
        for (var i = 0, ii = sources.length; i < ii; ++i) {
            this.renderedSource_ = sources[i];
            if (layerRenderer.prepareFrame(frameState)) {
                canvas = layerRenderer.renderFrame(frameState);
            }
        }
        return canvas;
    };
    /**
     * @param {?import("../PluggableMap.js").FrameState} frameState Frame state.
     * @param {HTMLElement} target Target which the renderer may (but need not) use
     * for rendering its content.
     * @return {HTMLElement} The rendered element.
     */
    WebGLTileLayer.prototype.render = function (frameState, target) {
        var _this = this;
        this.rendered = true;
        var viewState = frameState.viewState;
        var sources = this.getSources(frameState.extent, viewState.resolution);
        var ready = true;
        var _loop_2 = function (i, ii) {
            var source = sources[i];
            var sourceState = source.getState();
            if (sourceState == SourceState.LOADING) {
                var onChange_1 = function () {
                    if (source.getState() == SourceState.READY) {
                        source.removeEventListener('change', onChange_1);
                        _this.changed();
                    }
                };
                source.addEventListener('change', onChange_1);
            }
            ready = ready && sourceState == SourceState.READY;
        };
        for (var i = 0, ii = sources.length; i < ii; ++i) {
            _loop_2(i, ii);
        }
        var canvas = this.renderSources(frameState, sources);
        if (this.getRenderer().renderComplete && ready) {
            // Fully rendered, done.
            this.renderedResolution_ = viewState.resolution;
            return canvas;
        }
        // Render sources from previously fully rendered frames
        if (this.renderedResolution_ > 0.5 * viewState.resolution) {
            var altSources = this.getSources(frameState.extent, this.renderedResolution_).filter(function (source) { return !sources.includes(source); });
            if (altSources.length > 0) {
                return this.renderSources(frameState, altSources);
            }
        }
        return canvas;
    };
    /**
     * Update the layer style.  The `updateStyleVariables` function is a more efficient
     * way to update layer rendering.  In cases where the whole style needs to be updated,
     * this method may be called instead.  Note that calling this method will also replace
     * any previously set variables, so the new style also needs to include new variables,
     * if needed.
     * @param {Style} style The new style.
     */
    WebGLTileLayer.prototype.setStyle = function (style) {
        this.styleVariables_ = style.variables || {};
        this.style_ = style;
        var parsedStyle = parseStyle(this.style_, this.getSourceBandCount_());
        var renderer = this.getRenderer();
        renderer.reset({
            vertexShader: parsedStyle.vertexShader,
            fragmentShader: parsedStyle.fragmentShader,
            uniforms: parsedStyle.uniforms,
            paletteTextures: parsedStyle.paletteTextures,
        });
        this.changed();
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