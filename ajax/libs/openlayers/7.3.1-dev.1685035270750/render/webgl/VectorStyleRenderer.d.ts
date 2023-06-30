/**
 * Names of attributes made available to the vertex shader.
 * Please note: changing these *will* break custom shaders!
 */
export type Attributes = string;
export namespace Attributes {
    const POSITION: string;
    const INDEX: string;
    const SEGMENT_START: string;
    const SEGMENT_END: string;
    const PARAMETERS: string;
}
export default VectorStyleRenderer;
/**
 * A description of a custom attribute to be passed on to the GPU, with a value different
 * for each feature.
 */
export type AttributeDefinition = {
    /**
     * Amount of numerical values composing the attribute, either 1, 2, 3 or 4; in case size is > 1, the return value
     * of the callback should be an array; if unspecified, assumed to be a single float value
     */
    size?: number | undefined;
    /**
     * This callback computes the numerical value of the
     * attribute for a given feature.
     */
    callback: (arg0: import("../../Feature").FeatureLike) => number | Array<number>;
};
export type AttributeDefinitions = {
    [x: string]: AttributeDefinition;
};
export type UniformDefinitions = {
    [x: string]: import("../../webgl/Helper").UniformValue;
};
export type WebGLBuffers = {
    /**
     * Polygon indices buffer
     */
    polygonIndicesBuffer: WebGLArrayBuffer;
    /**
     * Polygon vertices buffer
     */
    polygonVerticesBuffer: WebGLArrayBuffer;
    /**
     * LineString indices buffer
     */
    lineStringIndicesBuffer: WebGLArrayBuffer;
    /**
     * LineString vertices buffer
     */
    lineStringVerticesBuffer: WebGLArrayBuffer;
    /**
     * Point indices buffer
     */
    pointIndicesBuffer: WebGLArrayBuffer;
    /**
     * Point vertices buffer
     */
    pointVerticesBuffer: WebGLArrayBuffer;
    /**
     * Inverse of the transform applied when generating buffers
     */
    invertVerticesTransform: import("../../transform.js").Transform;
};
export type RenderInstructions = {
    /**
     * Polygon instructions
     */
    polygonInstructions: Float32Array;
    /**
     * LineString instructions
     */
    lineStringInstructions: Float32Array;
    /**
     * Point instructions
     */
    pointInstructions: Float32Array;
};
/**
 * An object containing both shaders (vertex and fragment)
 */
export type ShaderProgram = {
    /**
     * Vertex shader source
     */
    vertex: string;
    /**
     * Fragment shader source
     */
    fragment: string;
};
export type StyleShaders = {
    /**
     * Shaders for filling polygons.
     */
    fill?: ShaderProgram | undefined;
    /**
     * Shaders for line strings and polygon strokes.
     */
    stroke?: ShaderProgram | undefined;
    /**
     * Shaders for symbols.
     */
    symbol?: ShaderProgram | undefined;
    /**
     * Custom attributes made available in the vertex shaders.
     * Default shaders rely on the attributes in {@link Attributes }.
     */
    attributes?: {
        [x: string]: AttributeDefinition;
    } | undefined;
    /**
     * Additional uniforms usable in shaders.
     */
    uniforms?: {
        [x: string]: import("../../webgl/Helper.js").UniformValue;
    } | undefined;
};
export type VectorStyle = import('../../style/literal.js').LiteralStyle | StyleShaders;
/**
 * @typedef {Object} AttributeDefinition A description of a custom attribute to be passed on to the GPU, with a value different
 * for each feature.
 * @property {number} [size] Amount of numerical values composing the attribute, either 1, 2, 3 or 4; in case size is > 1, the return value
 * of the callback should be an array; if unspecified, assumed to be a single float value
 * @property {function(import("../../Feature").FeatureLike):number|Array<number>} callback This callback computes the numerical value of the
 * attribute for a given feature.
 */
/**
 * @typedef {Object<string, AttributeDefinition>} AttributeDefinitions
 * @typedef {Object<string, import("../../webgl/Helper").UniformValue>} UniformDefinitions
 */
/**
 * @typedef {Object} WebGLBuffers
 * @property {WebGLArrayBuffer} polygonIndicesBuffer Polygon indices buffer
 * @property {WebGLArrayBuffer} polygonVerticesBuffer Polygon vertices buffer
 * @property {WebGLArrayBuffer} lineStringIndicesBuffer LineString indices buffer
 * @property {WebGLArrayBuffer} lineStringVerticesBuffer LineString vertices buffer
 * @property {WebGLArrayBuffer} pointIndicesBuffer Point indices buffer
 * @property {WebGLArrayBuffer} pointVerticesBuffer Point vertices buffer
 * @property {import("../../transform.js").Transform} invertVerticesTransform Inverse of the transform applied when generating buffers
 */
/**
 * @typedef {Object} RenderInstructions
 * @property {Float32Array} polygonInstructions Polygon instructions
 * @property {Float32Array} lineStringInstructions LineString instructions
 * @property {Float32Array} pointInstructions Point instructions
 */
/**
 * @typedef {Object} ShaderProgram An object containing both shaders (vertex and fragment)
 * @property {string} vertex Vertex shader source
 * @property {string} fragment Fragment shader source
 */
/**
 * @typedef {Object} StyleShaders
 * @property {ShaderProgram} [fill] Shaders for filling polygons.
 * @property {ShaderProgram} [stroke] Shaders for line strings and polygon strokes.
 * @property {ShaderProgram} [symbol] Shaders for symbols.
 * @property {AttributeDefinitions} [attributes] Custom attributes made available in the vertex shaders.
 * Default shaders rely on the attributes in {@link Attributes}.
 * @property {UniformDefinitions} [uniforms] Additional uniforms usable in shaders.
 */
/**
 * @typedef {import('../../style/literal.js').LiteralStyle|StyleShaders} VectorStyle
 */
/**
 * @classdesc This class is responsible for:
 * 1. generate WebGL buffers according to a provided style, using a MixedGeometryBatch as input
 * 2. rendering geometries contained in said buffers
 *
 * A layer renderer will typically maintain several of these in order to have several styles rendered separately.
 *
 * A VectorStyleRenderer instance can be created either from a literal style or from shaders using either
 * `VectorStyleRenderer.fromStyle` or `VectorStyleRenderer.fromShaders`.
 *
 * The `generateBuffers` method returns a promise resolving to WebGL buffers that are intended to be rendered by the
 * same renderer.
 */
declare class VectorStyleRenderer {
    /**
     * @param {VectorStyle} styleOrShaders Literal style or custom shaders
     * @param {import('../../webgl/Helper.js').default} helper Helper
     */
    constructor(styleOrShaders: VectorStyle, helper: import('../../webgl/Helper.js').default);
    helper_: import("../../webgl/Helper.js").default;
    fillVertexShader_: string | undefined;
    fillFragmentShader_: string | undefined;
    fillProgram_: WebGLProgram;
    strokeVertexShader_: string | undefined;
    strokeFragmentShader_: string | undefined;
    strokeProgram_: WebGLProgram;
    symbolVertexShader_: string | undefined;
    symbolFragmentShader_: string | undefined;
    symbolProgram_: WebGLProgram;
    customAttributes_: {
        [x: string]: AttributeDefinition;
    } | undefined;
    uniforms_: {
        [x: string]: import("../../webgl/Helper.js").UniformValue;
    } | undefined;
    /**
     * @type {Array<import('../../webgl/Helper.js').AttributeDescription>}
     * @private
     */
    private polygonAttributesDesc_;
    /**
     * @type {Array<import('../../webgl/Helper.js').AttributeDescription>}
     * @private
     */
    private lineStringAttributesDesc_;
    /**
     * @type {Array<import('../../webgl/Helper.js').AttributeDescription>}
     * @private
     */
    private pointAttributesDesc_;
    /**
     * @param {import('./MixedGeometryBatch.js').default} geometryBatch Geometry batch
     * @param {import("../../transform.js").Transform} transform Transform to apply to coordinates
     * @return {Promise<WebGLBuffers>} A promise resolving to WebGL buffers
     */
    generateBuffers(geometryBatch: import('./MixedGeometryBatch.js').default, transform: import("../../transform.js").Transform): Promise<WebGLBuffers>;
    /**
     * @param {import('./MixedGeometryBatch.js').default} geometryBatch Geometry batch
     * @param {import("../../transform.js").Transform} transform Transform to apply to coordinates
     * @return {RenderInstructions} Render instructions
     * @private
     */
    private generateRenderInstructions_;
    /**
     * @param {Float32Array} renderInstructions Render instructions
     * @param {import("../../geom/Geometry.js").Type} geometryType Geometry type
     * @param {import("../../transform.js").Transform} transform Transform to apply to coordinates
     * @return {Promise<Array<WebGLArrayBuffer>>} Vertices buffer and indices buffer
     * @private
     */
    private generateBuffersForType_;
    /**
     * Render the geometries in the given buffers.
     * @param {WebGLBuffers} buffers WebGL Buffers to draw
     * @param {import("../../Map.js").FrameState} frameState Frame state
     * @param {function(): void} preRenderCallback This callback will be called right before drawing, and can be used to set uniforms
     */
    render(buffers: WebGLBuffers, frameState: import("../../Map.js").FrameState, preRenderCallback: () => void): void;
    /**
     * @param {WebGLArrayBuffer} indicesBuffer Indices buffer
     * @param {WebGLArrayBuffer} verticesBuffer Vertices buffer
     * @param {WebGLProgram} program Program
     * @param {Array<import('../../webgl/Helper.js').AttributeDescription>} attributes Attribute descriptions
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {function(): void} preRenderCallback This callback will be called right before drawing, and can be used to set uniforms
     * @private
     */
    private renderInternal_;
}
import WebGLArrayBuffer from '../../webgl/Buffer.js';
//# sourceMappingURL=VectorStyleRenderer.d.ts.map