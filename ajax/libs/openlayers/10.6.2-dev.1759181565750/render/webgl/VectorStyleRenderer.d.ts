/**
 * Breaks down a vector style into an array of prebuilt shader builders with attributes and uniforms
 * @param {FlatStyleLike|StyleShaders|Array<StyleShaders>} style Vector style
 * @param {import('../../style/flat.js').StyleVariables} variables Style variables
 * @return {Array<StyleShaders>} Array of style shaders
 */
export function convertStyleToShaders(style: FlatStyleLike | StyleShaders | Array<StyleShaders>, variables: import("../../style/flat.js").StyleVariables): Array<StyleShaders>;
/**
 * Names of attributes made available to the vertex shader.
 * Please note: changing these *will* break custom shaders!
 */
export type Attributes = string;
export namespace Attributes {
    let POSITION: string;
    let LOCAL_POSITION: string;
    let SEGMENT_START: string;
    let SEGMENT_END: string;
    let MEASURE_START: string;
    let MEASURE_END: string;
    let ANGLE_TANGENT_SUM: string;
    let JOIN_ANGLES: string;
    let DISTANCE_LOW: string;
    let DISTANCE_HIGH: string;
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
    callback: (this: import("./MixedGeometryBatch.js").GeometryBatchItem, arg1: import("../../Feature").FeatureLike) => number | Array<number>;
};
export type AttributeDefinitions = {
    [x: string]: AttributeDefinition;
};
export type UniformDefinitions = {
    [x: string]: import("../../webgl/Helper.js").UniformValue;
};
/**
 * Buffers organized like so: [indicesBuffer, vertexAttributesBuffer, instanceAttributesBuffer]
 */
export type WebGLArrayBufferSet = Array<WebGLArrayBuffer>;
export type WebGLBuffers = {
    /**
     * Array containing indices and vertices buffers for polygons
     */
    polygonBuffers: WebGLArrayBufferSet;
    /**
     * Array containing indices and vertices buffers for line strings
     */
    lineStringBuffers: WebGLArrayBufferSet;
    /**
     * Array containing indices and vertices buffers for points
     */
    pointBuffers: WebGLArrayBufferSet;
    /**
     * Inverse of the transform applied when generating buffers
     */
    invertVerticesTransform: import("../../transform.js").Transform;
};
export type RenderInstructions = {
    /**
     * Polygon instructions; null if nothing to render
     */
    polygonInstructions: Float32Array | null;
    /**
     * LineString instructions; null if nothing to render
     */
    lineStringInstructions: Float32Array | null;
    /**
     * Point instructions; null if nothing to render
     */
    pointInstructions: Float32Array | null;
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
export type StyleShaders = import("./style.js").StyleParseResult;
export type FlatStyleLike = import("../../style/flat.js").FlatStyleLike;
export type FlatStyle = import("../../style/flat.js").FlatStyle;
export type FlatStyleRule = import("../../style/flat.js").Rule;
export type SubRenderPass = {
    /**
     * Vertex shader
     */
    vertexShader: string;
    /**
     * Fragment shader
     */
    fragmentShader: string;
    /**
     * Attributes description, defined for each primitive vertex
     */
    attributesDesc: Array<import("../../webgl/Helper.js").AttributeDescription>;
    /**
     * Attributes description, defined once per primitive
     */
    instancedAttributesDesc: Array<import("../../webgl/Helper.js").AttributeDescription>;
    /**
     * Number of vertices per instance primitive in this render pass
     */
    instancePrimitiveVertexCount: number;
    /**
     * Program; this has to be recreated if the helper is lost/changed
     */
    program?: WebGLProgram | undefined;
};
export type RenderPass = {
    /**
     * Fill render pass; undefined if no fill in pass
     */
    fillRenderPass?: SubRenderPass | undefined;
    /**
     * Stroke render pass; undefined if no stroke in pass
     */
    strokeRenderPass?: SubRenderPass | undefined;
    /**
     * Symbol render pass; undefined if no symbol in pass
     */
    symbolRenderPass?: SubRenderPass | undefined;
};
/**
 * @typedef {Object} AttributeDefinition A description of a custom attribute to be passed on to the GPU, with a value different
 * for each feature.
 * @property {number} [size] Amount of numerical values composing the attribute, either 1, 2, 3 or 4; in case size is > 1, the return value
 * of the callback should be an array; if unspecified, assumed to be a single float value
 * @property {function(this:import("./MixedGeometryBatch.js").GeometryBatchItem, import("../../Feature").FeatureLike):number|Array<number>} callback This callback computes the numerical value of the
 * attribute for a given feature.
 */
/**
 * @typedef {Object<string, AttributeDefinition>} AttributeDefinitions
 * @typedef {Object<string, import("../../webgl/Helper").UniformValue>} UniformDefinitions
 */
/**
 * @typedef {Array<WebGLArrayBuffer>} WebGLArrayBufferSet Buffers organized like so: [indicesBuffer, vertexAttributesBuffer, instanceAttributesBuffer]
 */
/**
 * @typedef {Object} WebGLBuffers
 * @property {WebGLArrayBufferSet} polygonBuffers Array containing indices and vertices buffers for polygons
 * @property {WebGLArrayBufferSet} lineStringBuffers Array containing indices and vertices buffers for line strings
 * @property {WebGLArrayBufferSet} pointBuffers Array containing indices and vertices buffers for points
 * @property {import("../../transform.js").Transform} invertVerticesTransform Inverse of the transform applied when generating buffers
 */
/**
 * @typedef {Object} RenderInstructions
 * @property {Float32Array|null} polygonInstructions Polygon instructions; null if nothing to render
 * @property {Float32Array|null} lineStringInstructions LineString instructions; null if nothing to render
 * @property {Float32Array|null} pointInstructions Point instructions; null if nothing to render
 */
/**
 * @typedef {Object} ShaderProgram An object containing both shaders (vertex and fragment)
 * @property {string} vertex Vertex shader source
 * @property {string} fragment Fragment shader source
 */
/**
 * @typedef {import('./style.js').StyleParseResult} StyleShaders
 */
/**
 * @typedef {import('../../style/flat.js').FlatStyleLike} FlatStyleLike
 */
/**
 * @typedef {import('../../style/flat.js').FlatStyle} FlatStyle
 */
/**
 * @typedef {import('../../style/flat.js').Rule} FlatStyleRule
 */
/**
 * @typedef {Object} SubRenderPass
 * @property {string} vertexShader Vertex shader
 * @property {string} fragmentShader Fragment shader
 * @property {Array<import('../../webgl/Helper.js').AttributeDescription>} attributesDesc Attributes description, defined for each primitive vertex
 * @property {Array<import('../../webgl/Helper.js').AttributeDescription>} instancedAttributesDesc Attributes description, defined once per primitive
 * @property {number} instancePrimitiveVertexCount Number of vertices per instance primitive in this render pass
 * @property {WebGLProgram} [program] Program; this has to be recreated if the helper is lost/changed
 */
/**
 * @typedef {Object} RenderPass
 * @property {SubRenderPass} [fillRenderPass] Fill render pass; undefined if no fill in pass
 * @property {SubRenderPass} [strokeRenderPass] Stroke render pass; undefined if no stroke in pass
 * @property {SubRenderPass} [symbolRenderPass] Symbol render pass; undefined if no symbol in pass
 */
/**
 * @classdesc This class is responsible for:
 * 1. generating WebGL buffers according to a provided style, using a MixedGeometryBatch as input
 * 2. rendering geometries contained in said buffers
 *
 * A VectorStyleRenderer instance can be created either from a literal style or from shaders.
 * The shaders should not be provided explicitly but instead as a preconfigured ShaderBuilder instance.
 *
 * The `generateBuffers` method returns a promise resolving to WebGL buffers that are intended to be rendered by the
 * same renderer.
 */
declare class VectorStyleRenderer {
    /**
     * @param {FlatStyleLike|StyleShaders|Array<StyleShaders>} styles Vector styles expressed as flat styles, flat style rules or style shaders
     * @param {import('../../style/flat.js').StyleVariables} variables Style variables
     * @param {import('../../webgl/Helper.js').default} helper Helper
     * @param {boolean} [enableHitDetection] Whether to enable the hit detection (needs compatible shader)
     */
    constructor(styles: FlatStyleLike | StyleShaders | Array<StyleShaders>, variables: import("../../style/flat.js").StyleVariables, helper: import("../../webgl/Helper.js").default, enableHitDetection?: boolean);
    /**
     * @private
     * @type {import('../../webgl/Helper.js').default}
     */
    private helper_;
    /**
     * @private
     */
    private hitDetectionEnabled_;
    /**
     * @type {Array<StyleShaders>}
     * @private
     */
    private styleShaders;
    /**
     * @type {AttributeDefinitions}
     * @private
     */
    private customAttributes_;
    /**
     @type {UniformDefinitions}
     * @private
     */
    private uniforms_;
    /**
     * @type {Array<RenderPass>}
     * @private
     */
    private renderPasses_;
    hasFill_: boolean;
    hasStroke_: boolean;
    hasSymbol_: boolean;
    /**
     * @param {import('./MixedGeometryBatch.js').default} geometryBatch Geometry batch
     * @param {import("../../transform.js").Transform} transform Transform to apply to coordinates
     * @return {Promise<WebGLBuffers|null>} A promise resolving to WebGL buffers; returns null if buffers are empty
     */
    generateBuffers(geometryBatch: import("./MixedGeometryBatch.js").default, transform: import("../../transform.js").Transform): Promise<WebGLBuffers | null>;
    /**
     * @param {import('./MixedGeometryBatch.js').default} geometryBatch Geometry batch
     * @param {import("../../transform.js").Transform} transform Transform to apply to coordinates
     * @return {RenderInstructions} Render instructions
     * @private
     */
    private generateRenderInstructions_;
    /**
     * @param {Float32Array|null} renderInstructions Render instructions
     * @param {import("../../geom/Geometry.js").Type} geometryType Geometry type
     * @param {import("../../transform.js").Transform} transform Transform to apply to coordinates
     * @return {Promise<WebGLArrayBufferSet>|null} Indices buffer and vertices buffer; null if nothing to render
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
     * @param {WebGLArrayBuffer} vertexAttributesBuffer Vertex attributes buffer
     * @param {WebGLArrayBuffer} instanceAttributesBuffer Instance attributes buffer
     * @param {SubRenderPass} subRenderPass Render pass (program, attributes, etc.) specific to one geometry type
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {function(): void} preRenderCallback This callback will be called right before drawing, and can be used to set uniforms
     * @private
     */
    private renderInternal_;
    /**
     * @param {import('../../webgl/Helper.js').default} helper Helper
     * @param {WebGLBuffers} buffers WebGL Buffers to reload if any
     */
    setHelper(helper: import("../../webgl/Helper.js").default, buffers?: WebGLBuffers): void;
}
import WebGLArrayBuffer from '../../webgl/Buffer.js';
//# sourceMappingURL=VectorStyleRenderer.d.ts.map