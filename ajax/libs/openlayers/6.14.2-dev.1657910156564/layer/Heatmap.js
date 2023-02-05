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
 * @module ol/layer/Heatmap
 */
import BaseVector from './BaseVector.js';
import WebGLPointsLayerRenderer from '../renderer/webgl/PointsLayer.js';
import { assign } from '../obj.js';
import { clamp } from '../math.js';
import { createCanvasContext2D } from '../dom.js';
/**
 * @typedef {Object} Options
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
 * @property {Array<string>} [gradient=['#00f', '#0ff', '#0f0', '#ff0', '#f00']] The color gradient
 * of the heatmap, specified as an array of CSS color strings.
 * @property {number} [radius=8] Radius size in pixels.
 * @property {number} [blur=15] Blur size in pixels.
 * @property {string|function(import("../Feature.js").default):number} [weight='weight'] The feature
 * attribute to use for the weight or a function that returns a weight from a feature. Weight values
 * should range from 0 to 1 (and values outside will be clamped to that range).
 * @property {import("../source/Vector.js").default<import("../geom/Point.js").default>} [source] Point source.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */
/**
 * @enum {string}
 * @private
 */
var Property = {
    BLUR: 'blur',
    GRADIENT: 'gradient',
    RADIUS: 'radius',
};
/**
 * @const
 * @type {Array<string>}
 */
var DEFAULT_GRADIENT = ['#00f', '#0ff', '#0f0', '#ff0', '#f00'];
/**
 * @classdesc
 * Layer for rendering vector data as a heatmap.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @fires import("../render/Event.js").RenderEvent
 * @extends {BaseVector<import("../source/Vector.js").default, WebGLPointsLayerRenderer>}
 * @api
 */
var Heatmap = /** @class */ (function (_super) {
    __extends(Heatmap, _super);
    /**
     * @param {Options} [opt_options] Options.
     */
    function Heatmap(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        var baseOptions = assign({}, options);
        delete baseOptions.gradient;
        delete baseOptions.radius;
        delete baseOptions.blur;
        delete baseOptions.weight;
        _this = _super.call(this, baseOptions) || this;
        /**
         * @private
         * @type {HTMLCanvasElement}
         */
        _this.gradient_ = null;
        _this.addChangeListener(Property.GRADIENT, _this.handleGradientChanged_);
        _this.setGradient(options.gradient ? options.gradient : DEFAULT_GRADIENT);
        _this.setBlur(options.blur !== undefined ? options.blur : 15);
        _this.setRadius(options.radius !== undefined ? options.radius : 8);
        var weight = options.weight ? options.weight : 'weight';
        if (typeof weight === 'string') {
            _this.weightFunction_ = function (feature) {
                return feature.get(weight);
            };
        }
        else {
            _this.weightFunction_ = weight;
        }
        // For performance reasons, don't sort the features before rendering.
        // The render order is not relevant for a heatmap representation.
        _this.setRenderOrder(null);
        return _this;
    }
    /**
     * Return the blur size in pixels.
     * @return {number} Blur size in pixels.
     * @api
     * @observable
     */
    Heatmap.prototype.getBlur = function () {
        return /** @type {number} */ (this.get(Property.BLUR));
    };
    /**
     * Return the gradient colors as array of strings.
     * @return {Array<string>} Colors.
     * @api
     * @observable
     */
    Heatmap.prototype.getGradient = function () {
        return /** @type {Array<string>} */ (this.get(Property.GRADIENT));
    };
    /**
     * Return the size of the radius in pixels.
     * @return {number} Radius size in pixel.
     * @api
     * @observable
     */
    Heatmap.prototype.getRadius = function () {
        return /** @type {number} */ (this.get(Property.RADIUS));
    };
    /**
     * @private
     */
    Heatmap.prototype.handleGradientChanged_ = function () {
        this.gradient_ = createGradient(this.getGradient());
    };
    /**
     * Set the blur size in pixels.
     * @param {number} blur Blur size in pixels.
     * @api
     * @observable
     */
    Heatmap.prototype.setBlur = function (blur) {
        this.set(Property.BLUR, blur);
    };
    /**
     * Set the gradient colors as array of strings.
     * @param {Array<string>} colors Gradient.
     * @api
     * @observable
     */
    Heatmap.prototype.setGradient = function (colors) {
        this.set(Property.GRADIENT, colors);
    };
    /**
     * Set the size of the radius in pixels.
     * @param {number} radius Radius size in pixel.
     * @api
     * @observable
     */
    Heatmap.prototype.setRadius = function (radius) {
        this.set(Property.RADIUS, radius);
    };
    Heatmap.prototype.createRenderer = function () {
        return new WebGLPointsLayerRenderer(this, {
            className: this.getClassName(),
            attributes: [
                {
                    name: 'weight',
                    callback: function (feature) {
                        var weight = this.weightFunction_(feature);
                        return weight !== undefined ? clamp(weight, 0, 1) : 1;
                    }.bind(this),
                },
            ],
            vertexShader: "\n        precision mediump float;\n        uniform mat4 u_projectionMatrix;\n        uniform mat4 u_offsetScaleMatrix;\n        uniform float u_size;\n        attribute vec2 a_position;\n        attribute float a_index;\n        attribute float a_weight;\n\n        varying vec2 v_texCoord;\n        varying float v_weight;\n\n        void main(void) {\n          mat4 offsetMatrix = u_offsetScaleMatrix;\n          float offsetX = a_index == 0.0 || a_index == 3.0 ? -u_size / 2.0 : u_size / 2.0;\n          float offsetY = a_index == 0.0 || a_index == 1.0 ? -u_size / 2.0 : u_size / 2.0;\n          vec4 offsets = offsetMatrix * vec4(offsetX, offsetY, 0.0, 0.0);\n          gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0) + offsets;\n          float u = a_index == 0.0 || a_index == 3.0 ? 0.0 : 1.0;\n          float v = a_index == 0.0 || a_index == 1.0 ? 0.0 : 1.0;\n          v_texCoord = vec2(u, v);\n          v_weight = a_weight;\n        }",
            fragmentShader: "\n        precision mediump float;\n        uniform float u_blurSlope;\n\n        varying vec2 v_texCoord;\n        varying float v_weight;\n\n        void main(void) {\n          vec2 texCoord = v_texCoord * 2.0 - vec2(1.0, 1.0);\n          float sqRadius = texCoord.x * texCoord.x + texCoord.y * texCoord.y;\n          float value = (1.0 - sqrt(sqRadius)) * u_blurSlope;\n          float alpha = smoothstep(0.0, 1.0, value) * v_weight;\n          gl_FragColor = vec4(alpha, alpha, alpha, alpha);\n        }",
            hitVertexShader: "\n        precision mediump float;\n        uniform mat4 u_projectionMatrix;\n        uniform mat4 u_offsetScaleMatrix;\n        uniform float u_size;\n        attribute vec2 a_position;\n        attribute float a_index;\n        attribute float a_weight;\n        attribute vec4 a_hitColor;\n\n        varying vec2 v_texCoord;\n        varying float v_weight;\n        varying vec4 v_hitColor;\n\n        void main(void) {\n          mat4 offsetMatrix = u_offsetScaleMatrix;\n          float offsetX = a_index == 0.0 || a_index == 3.0 ? -u_size / 2.0 : u_size / 2.0;\n          float offsetY = a_index == 0.0 || a_index == 1.0 ? -u_size / 2.0 : u_size / 2.0;\n          vec4 offsets = offsetMatrix * vec4(offsetX, offsetY, 0.0, 0.0);\n          gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0) + offsets;\n          float u = a_index == 0.0 || a_index == 3.0 ? 0.0 : 1.0;\n          float v = a_index == 0.0 || a_index == 1.0 ? 0.0 : 1.0;\n          v_texCoord = vec2(u, v);\n          v_hitColor = a_hitColor;\n          v_weight = a_weight;\n        }",
            hitFragmentShader: "\n        precision mediump float;\n        uniform float u_blurSlope;\n\n        varying vec2 v_texCoord;\n        varying float v_weight;\n        varying vec4 v_hitColor;\n\n        void main(void) {\n          vec2 texCoord = v_texCoord * 2.0 - vec2(1.0, 1.0);\n          float sqRadius = texCoord.x * texCoord.x + texCoord.y * texCoord.y;\n          float value = (1.0 - sqrt(sqRadius)) * u_blurSlope;\n          float alpha = smoothstep(0.0, 1.0, value) * v_weight;\n          if (alpha < 0.05) {\n            discard;\n          }\n\n          gl_FragColor = v_hitColor;\n        }",
            uniforms: {
                u_size: function () {
                    return (this.get(Property.RADIUS) + this.get(Property.BLUR)) * 2;
                }.bind(this),
                u_blurSlope: function () {
                    return (this.get(Property.RADIUS) / Math.max(1, this.get(Property.BLUR)));
                }.bind(this),
            },
            postProcesses: [
                {
                    fragmentShader: "\n            precision mediump float;\n\n            uniform sampler2D u_image;\n            uniform sampler2D u_gradientTexture;\n            uniform float u_opacity;\n\n            varying vec2 v_texCoord;\n\n            void main() {\n              vec4 color = texture2D(u_image, v_texCoord);\n              gl_FragColor.a = color.a * u_opacity;\n              gl_FragColor.rgb = texture2D(u_gradientTexture, vec2(0.5, color.a)).rgb;\n              gl_FragColor.rgb *= gl_FragColor.a;\n            }",
                    uniforms: {
                        u_gradientTexture: function () {
                            return this.gradient_;
                        }.bind(this),
                        u_opacity: function () {
                            return this.getOpacity();
                        }.bind(this),
                    },
                },
            ],
        });
    };
    Heatmap.prototype.renderDeclutter = function () { };
    return Heatmap;
}(BaseVector));
/**
 * @param {Array<string>} colors A list of colored.
 * @return {HTMLCanvasElement} canvas with gradient texture.
 */
function createGradient(colors) {
    var width = 1;
    var height = 256;
    var context = createCanvasContext2D(width, height);
    var gradient = context.createLinearGradient(0, 0, width, height);
    var step = 1 / (colors.length - 1);
    for (var i = 0, ii = colors.length; i < ii; ++i) {
        gradient.addColorStop(i * step, colors[i]);
    }
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    return context.canvas;
}
export default Heatmap;
//# sourceMappingURL=Heatmap.js.map