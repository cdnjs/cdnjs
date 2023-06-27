export default WebGLVectorTileLayerRenderer;
/**
 * A callback computing
 * the value of a custom attribute (different for each feature) to be passed on to the GPU.
 * Properties are available as 2nd arg for quicker access.
 */
export type CustomAttributeCallback = (arg0: import("../../Feature").default, arg1: {
    [x: string]: any;
}) => number;
/**
 * An object containing both shaders (vertex and fragment) as well as the required attributes
 */
export type ShaderProgram = {
    /**
     * Vertex shader source (using the default one if unspecified).
     */
    vertexShader?: string | undefined;
    /**
     * Fragment shader source (using the default one if unspecified).
     */
    fragmentShader?: string | undefined;
    /**
     * Custom attributes made available in the vertex shader.
     * Keys are the names of the attributes which are then accessible in the vertex shader using the `a_` prefix, e.g.: `a_opacity`.
     * Default shaders rely on the attributes in {@link module :ol/render/webgl/shaders~DefaultAttributes}.
     */
    attributes: any;
};
export type Options = {
    /**
     * Attributes and shaders for filling polygons.
     */
    fill?: ShaderProgram | undefined;
    /**
     * Attributes and shaders for line strings and polygon strokes.
     */
    stroke?: ShaderProgram | undefined;
    /**
     * Attributes and shaders for points.
     */
    point?: ShaderProgram | undefined;
    /**
     * Additional uniforms
     * made available to shaders.
     */
    uniforms?: {
        [x: string]: import("../../webgl/Helper").UniformValue;
    } | undefined;
    /**
     * The vector tile cache size.
     */
    cacheSize?: number | undefined;
};
export type LayerType = import("../../layer/BaseTile.js").default<any, any>;
/**
 * @typedef {function(import("../../Feature").default, Object<string, *>):number} CustomAttributeCallback A callback computing
 * the value of a custom attribute (different for each feature) to be passed on to the GPU.
 * Properties are available as 2nd arg for quicker access.
 */
/**
 * @typedef {Object} ShaderProgram An object containing both shaders (vertex and fragment) as well as the required attributes
 * @property {string} [vertexShader] Vertex shader source (using the default one if unspecified).
 * @property {string} [fragmentShader] Fragment shader source (using the default one if unspecified).
 * @property {Object<import("./shaders.js").DefaultAttributes,CustomAttributeCallback>} attributes Custom attributes made available in the vertex shader.
 * Keys are the names of the attributes which are then accessible in the vertex shader using the `a_` prefix, e.g.: `a_opacity`.
 * Default shaders rely on the attributes in {@link module:ol/render/webgl/shaders~DefaultAttributes}.
 */
/**
 * @typedef {Object} Options
 * @property {ShaderProgram} [fill] Attributes and shaders for filling polygons.
 * @property {ShaderProgram} [stroke] Attributes and shaders for line strings and polygon strokes.
 * @property {ShaderProgram} [point] Attributes and shaders for points.
 * @property {Object<string, import("../../webgl/Helper").UniformValue>} [uniforms] Additional uniforms
 * made available to shaders.
 * @property {number} [cacheSize=512] The vector tile cache size.
 */
/**
 * @typedef {import("../../layer/BaseTile.js").default} LayerType
 */
/**
 * @classdesc
 * WebGL renderer for vector tile layers. Experimental.
 * @extends {WebGLBaseTileLayerRenderer<LayerType>}
 */
declare class WebGLVectorTileLayerRenderer extends WebGLBaseTileLayerRenderer<import("../../layer/BaseTile.js").default<any, any>, any, any> {
    /**
     * @param {LayerType} tileLayer Tile layer.
     * @param {Options} options Options.
     */
    constructor(tileLayer: import("../../layer/BaseTile.js").default<any, any>, options: Options);
    /**
     * @private
     */
    private worker_;
    /**
     * @type {PolygonBatchRenderer}
     * @private
     */
    private polygonRenderer_;
    /**
     * @type {PointBatchRenderer}
     * @private
     */
    private pointRenderer_;
    /**
     * @type {LineStringBatchRenderer}
     * @private
     */
    private lineStringRenderer_;
    /**
     * This transform is updated on every frame and is the composition of:
     * - invert of the world->screen transform that was used when rebuilding buffers (see `this.renderTransform_`)
     * - current world->screen transform
     * @type {import("../../transform.js").Transform}
     * @private
     */
    private currentFrameStateTransform_;
    tmpTransform_: number[];
    tmpMat4_: number[];
    /**
     * @param {Options} options Options.
     */
    reset(options: Options): void;
    /**
     * @param {Options} options Options.
     * @private
     */
    private applyOptions_;
    fillVertexShader_: string | undefined;
    fillFragmentShader_: string | undefined;
    fillAttributes_: import("../../render/webgl/BatchRenderer").CustomAttribute[] | undefined;
    strokeVertexShader_: string | undefined;
    strokeFragmentShader_: string | undefined;
    strokeAttributes_: import("../../render/webgl/BatchRenderer").CustomAttribute[] | undefined;
    pointVertexShader_: string | undefined;
    pointFragmentShader_: string | undefined;
    pointAttributes_: import("../../render/webgl/BatchRenderer").CustomAttribute[] | undefined;
    /**
     * @private
     */
    private createRenderers_;
    createTileRepresentation(options: any): TileGeometry;
    beforeTilesRender(frameState: any, tilesWithAlpha: any): void;
    /**
     * @param {number} alpha Alpha value of the tile
     * @param {import("../../extent.js").Extent} renderExtent Which extent to restrict drawing to
     * @param {import("../../transform.js").Transform} batchInvertTransform Inverse of the transformation in which tile geometries are expressed
     * @private
     */
    private applyUniforms_;
    renderTile(tileRepresentation: any, tileTransform: any, frameState: any, renderExtent: any, tileResolution: any, tileSize: any, tileOrigin: any, tileExtent: any, depth: any, gutter: any, alpha: any): void;
    /**
     * Render declutter items for this layer
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     */
    renderDeclutter(frameState: import("../../Map.js").FrameState): void;
}
import WebGLBaseTileLayerRenderer from './TileLayerBase.js';
import TileGeometry from '../../webgl/TileGeometry.js';
//# sourceMappingURL=VectorTileLayer.d.ts.map