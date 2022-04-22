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
 * @module ol/renderer/webgl/Layer
 */
import LayerRenderer from '../Layer.js';
import WebGLHelper from '../../webgl/Helper.js';
/**
 * @typedef {Object} PostProcessesOptions
 * @property {number} [scaleRatio] Scale ratio; if < 1, the post process will render to a texture smaller than
 * the main canvas that will then be sampled up (useful for saving resource on blur steps).
 * @property {string} [vertexShader] Vertex shader source
 * @property {string} [fragmentShader] Fragment shader source
 * @property {Object.<string,import("../../webgl/Helper").UniformValue>} [uniforms] Uniform definitions for the post process step
 */
/**
 * @typedef {Object} Options
 * @property {Object.<string,import("../../webgl/Helper").UniformValue>} [uniforms] Uniform definitions for the post process steps
 * @property {Array<PostProcessesOptions>} [postProcesses] Post-processes definitions
 */
/**
 * @classdesc
 * Base WebGL renderer class.
 * Holds all logic related to data manipulation & some common rendering logic
 */
var WebGLLayerRenderer = /** @class */ (function (_super) {
    __extends(WebGLLayerRenderer, _super);
    /**
     * @param {import("../../layer/Layer.js").default} layer Layer.
     * @param {Options=} [opt_options] Options.
     */
    function WebGLLayerRenderer(layer, opt_options) {
        var _this = _super.call(this, layer) || this;
        var options = opt_options || {};
        _this.helper_ = new WebGLHelper({
            postProcesses: options.postProcesses,
            uniforms: options.uniforms
        });
        return _this;
    }
    /**
     * @inheritDoc
     */
    WebGLLayerRenderer.prototype.disposeInternal = function () {
        _super.prototype.disposeInternal.call(this);
    };
    /**
     * Will return the last shader compilation errors. If no error happened, will return null;
     * @return {string|null} Errors, or null if last compilation was successful
     * @api
     */
    WebGLLayerRenderer.prototype.getShaderCompileErrors = function () {
        return this.helper_.getShaderCompileErrors();
    };
    return WebGLLayerRenderer;
}(LayerRenderer));
/**
 * Pushes vertices and indices to the given buffers using the geometry coordinates and the following properties
 * from the feature:
 * - `color`
 * - `opacity`
 * - `size` (for points)
 * - `u0`, `v0`, `u1`, `v1` (for points)
 * - `rotateWithView` (for points)
 * - `width` (for lines)
 * Custom attributes can be designated using the `opt_attributes` argument, otherwise other properties on the
 * feature will be ignored.
 * @param {import("../../webgl/Buffer").default} vertexBuffer WebGL buffer in which new vertices will be pushed.
 * @param {import("../../webgl/Buffer").default} indexBuffer WebGL buffer in which new indices will be pushed.
 * @param {import("../../format/GeoJSON").GeoJSONFeature} geojsonFeature Feature in geojson format, coordinates
 * expressed in EPSG:4326.
 * @param {Array<string>} [opt_attributes] Custom attributes. An array of properties which will be read from the
 * feature and pushed in the buffer in the given order. Note: attributes can only be numerical! Any other type or
 * NaN will result in `0` being pushed in the buffer.
 */
export function pushFeatureToBuffer(vertexBuffer, indexBuffer, geojsonFeature, opt_attributes) {
    if (!geojsonFeature.geometry) {
        return;
    }
    switch (geojsonFeature.geometry.type) {
        case 'Point':
            pushPointFeatureToBuffer_(vertexBuffer, indexBuffer, geojsonFeature, opt_attributes);
            return;
        default:
            return;
    }
}
var tmpArray_ = [];
/**
 * Pushes a quad (two triangles) based on a point geometry
 * @param {import("../../webgl/Buffer").default} vertexBuffer WebGL buffer
 * @param {import("../../webgl/Buffer").default} indexBuffer WebGL buffer
 * @param {import("../../format/GeoJSON").GeoJSONFeature} geojsonFeature Feature
 * @param {Array<string>} [opt_attributes] Custom attributes
 * @private
 */
function pushPointFeatureToBuffer_(vertexBuffer, indexBuffer, geojsonFeature, opt_attributes) {
    var stride = 12 + (opt_attributes !== undefined ? opt_attributes.length : 0);
    var x = geojsonFeature.geometry.coordinates[0];
    var y = geojsonFeature.geometry.coordinates[1];
    var u0 = geojsonFeature.properties.u0;
    var v0 = geojsonFeature.properties.v0;
    var u1 = geojsonFeature.properties.u1;
    var v1 = geojsonFeature.properties.v1;
    var size = geojsonFeature.properties.size;
    var opacity = geojsonFeature.properties.opacity;
    var rotateWithView = geojsonFeature.properties.rotateWithView;
    var color = geojsonFeature.properties.color;
    var red = color[0];
    var green = color[1];
    var blue = color[2];
    var alpha = color[3];
    var baseIndex = vertexBuffer.getArray().length / stride;
    // read custom numerical attributes on the feature
    var customAttributeValues = tmpArray_;
    customAttributeValues.length = opt_attributes ? opt_attributes.length : 0;
    for (var i = 0; i < customAttributeValues.length; i++) {
        customAttributeValues[i] = parseFloat(geojsonFeature.properties[opt_attributes[i]]) || 0;
    }
    // push vertices for each of the four quad corners (first standard then custom attributes)
    vertexBuffer.getArray().push(x, y, -size / 2, -size / 2, u0, v0, opacity, rotateWithView, red, green, blue, alpha);
    Array.prototype.push.apply(vertexBuffer.getArray(), customAttributeValues);
    vertexBuffer.getArray().push(x, y, +size / 2, -size / 2, u1, v0, opacity, rotateWithView, red, green, blue, alpha);
    Array.prototype.push.apply(vertexBuffer.getArray(), customAttributeValues);
    vertexBuffer.getArray().push(x, y, +size / 2, +size / 2, u1, v1, opacity, rotateWithView, red, green, blue, alpha);
    Array.prototype.push.apply(vertexBuffer.getArray(), customAttributeValues);
    vertexBuffer.getArray().push(x, y, -size / 2, +size / 2, u0, v1, opacity, rotateWithView, red, green, blue, alpha);
    Array.prototype.push.apply(vertexBuffer.getArray(), customAttributeValues);
    indexBuffer.getArray().push(baseIndex, baseIndex + 1, baseIndex + 3, baseIndex + 1, baseIndex + 2, baseIndex + 3);
}
/**
 * Returns a texture of 1x1 pixel, white
 * @private
 * @return {ImageData} Image data.
 */
export function getBlankTexture() {
    var canvas = document.createElement('canvas');
    var image = canvas.getContext('2d').createImageData(1, 1);
    image.data[0] = image.data[1] = image.data[2] = image.data[3] = 255;
    return image;
}
export default WebGLLayerRenderer;
//# sourceMappingURL=Layer.js.map