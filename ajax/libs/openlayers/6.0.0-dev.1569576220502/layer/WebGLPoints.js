var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/layer/WebGLPoints
 */
import { assign } from '../obj.js';
import WebGLPointsLayerRenderer from '../renderer/webgl/PointsLayer.js';
import { getSymbolFragmentShader, getSymbolVertexShader, parseSymbolStyle } from '../webgl/ShaderBuilder.js';
import { assert } from '../asserts.js';
import Layer from './Layer.js';
/**
 * @typedef {Object} Options
 * @property {import('../style/LiteralStyle.js').LiteralStyle} style Literal style to apply to the layer features.
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
 * @property {import("../source/Vector.js").default} [source] Source.
 */
/**
 * @classdesc
 * Layer optimized for rendering large point datasets. Takes a `style` property which
 * is a serializable JSON object describing how the layer should be rendered.
 *
 * Here are a few samples of literal style objects:
 * ```js
 * const style = {
 *   symbol: {
 *     symbolType: 'circle',
 *     size: 8,
 *     color: '#33AAFF',
 *     opacity: 0.9
 *   }
 * }
 * ```
 *
 * ```js
 * const style = {
 *   symbol: {
 *     symbolType: 'image',
 *     offset: [0, 12],
 *     size: [4, 8],
 *     src: '../static/exclamation-mark.png'
 *   }
 * }
 * ```
 *
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @fires import("../render/Event.js").RenderEvent
 */
var WebGLPointsLayer = /** @class */ (function (_super) {
    __extends(WebGLPointsLayer, _super);
    /**
     * @param {Options} options Options.
     */
    function WebGLPointsLayer(options) {
        var _this = this;
        var baseOptions = assign({}, options);
        _this = _super.call(this, baseOptions) || this;
        /**
         * @type {import('../style/LiteralStyle.js').LiteralStyle}
         */
        _this.style = options.style;
        assert(_this.style.symbol !== undefined, 65);
        return _this;
    }
    /**
     * @inheritDoc
     */
    WebGLPointsLayer.prototype.createRenderer = function () {
        var parseResult = parseSymbolStyle(this.style.symbol);
        return new WebGLPointsLayerRenderer(this, {
            vertexShader: getSymbolVertexShader(parseResult.params),
            fragmentShader: getSymbolFragmentShader(parseResult.params),
            uniforms: parseResult.uniforms,
            attributes: parseResult.attributes
        });
    };
    return WebGLPointsLayer;
}(Layer));
export default WebGLPointsLayer;
//# sourceMappingURL=WebGLPoints.js.map