/**
 * Shader uniforms.
 */
export type U = string;
export namespace U {
    let TEXTURE: string;
    let VELOCITY_TEXTURE: string;
    let POSITION_TEXTURE: string;
    let PARTICLE_COUNT_SQRT: string;
    let MAX_SPEED: string;
    let GAIN: string;
    let OFFSET: string;
    let IS_FLOAT: string;
    let RANDOM_SEED: string;
    let SPEED_FACTOR: string;
    let DROP_RATE: string;
    let DROP_RATE_BUMP: string;
    let OPACITY: string;
    let ROTATION: string;
    let VIEWPORT_SIZE_PX: string;
}
/**
 * Shader attributes.
 */
export type A = string;
export namespace A {
    let POSITION: string;
    let INDEX: string;
}
/**
 * Shader varyings.
 */
export type V = string;
export namespace V {
    let POSITION_1: string;
    export { POSITION_1 as POSITION };
}
export default FlowLayerRenderer;
export type LayerType = import("../../layer/Flow.js").default;
export type Options = {
    /**
     * The maximum particle speed in the input data.
     */
    maxSpeed: number;
    /**
     * A larger factor increases the rate at which particles cross the screen.
     */
    speedFactor?: number | undefined;
    /**
     * The number of particles to render.
     */
    particles?: number | undefined;
    /**
     * The texture cache size.
     */
    cacheSize?: number | undefined;
    /**
     * The flow tile vertex shader.
     */
    tileVertexShader: string;
    /**
     * The flow tile fragment shader.
     */
    tileFragmentShader: string;
    /**
     * Generic texture fragment shader.
     */
    textureVertexShader: string;
    /**
     * Generic texture fragment shader.
     */
    textureFragmentShader: string;
    /**
     * The particle position vertex shader.
     */
    particlePositionVertexShader: string;
    /**
     * The particle position fragment shader.
     */
    particlePositionFragmentShader: string;
    /**
     * The particle color vertex shader.
     */
    particleColorVertexShader: string;
    /**
     * The particle color fragment shader.
     */
    particleColorFragmentShader: string;
};
/**
 * @classdesc
 * Experimental WebGL renderer for vector fields.
 * @extends {WebGLTileLayerRenderer<LayerType>}
 */
declare class FlowLayerRenderer extends WebGLTileLayerRenderer<import("../../layer/Flow.js").default> {
    /**
     * @param {LayerType} layer The tiled field layer.
     * @param {Options} options The renderer options.
     */
    constructor(layer: LayerType, options: Options);
    /**
     * @type {string}
     * @private
     */
    private particleColorFragmentShader_;
    /**
     * @type {WebGLTexture|null}
     * @private
     */
    private velocityTexture_;
    /**
     * @type {number}
     * @private
     */
    private particleCountSqrt_;
    /**
     * @type {WebGLArrayBuffer}
     * @private
     */
    private particleIndexBuffer_;
    /**
     * @type {WebGLArrayBuffer}
     * @private
     */
    private quadBuffer_;
    /**
     * @type {WebGLProgram}
     * @private
     */
    private particlePositionProgram_;
    /**
     * @type {string}
     * @private
     */
    private particlePositionVertexShader_;
    /**
     * @type {string}
     * @private
     */
    private particlePositionFragmentShader_;
    /**
     * @type {WebGLTexture}
     * @private
     */
    private previousPositionTexture_;
    /**
     * @type {WebGLTexture}
     * @private
     */
    private nextPositionTexture_;
    /**
     * @type {WebGLProgram}
     * @private
     */
    private particleColorProgram_;
    /**
     * @type {string}
     * @private
     */
    private particleColorVertexShader_;
    /**
     * @type {WebGLProgram}
     * @private
     */
    private textureProgram_;
    /**
     * @type {string}
     * @private
     */
    private textureVertexShader_;
    /**
     * @type {string}
     * @private
     */
    private textureFragmentShader_;
    /**
     * @type {WebGLTexture}
     * @private
     */
    private previousTrailsTexture_;
    /**
     * @type {WebGLTexture}
     * @private
     */
    private nextTrailsTexture_;
    /**
     * @type {number}
     * @private
     */
    private fadeOpacity_;
    /**
     * @type {number}
     * @private
     */
    private maxSpeed_;
    /**
     * @type {number}
     * @private
     */
    private speedFactor_;
    /**
     * @type {number}
     * @private
     */
    private dropRate_;
    /**
     * @type {number}
     * @private
     */
    private dropRateBump_;
    /**
     * @type {Array<number>}
     * @private
     */
    private tempVec2_;
    /**
     * @type {number}
     * @private
     */
    private renderedWidth_;
    /**
     * @type {number}
     * @private
     */
    private renderedHeight_;
    framebuffer_: WebGLFramebuffer | undefined;
    createSizeDependentTextures_(): void;
    /**
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     */
    drawParticleTrails_(frameState: import("../../Map.js").FrameState): void;
    /**
     * @param {WebGLTexture} texture The texture to draw.
     * @param {number} opacity The opacity.
     */
    drawTexture_(texture: WebGLTexture, opacity: number): void;
    /**
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     */
    drawParticleColor_(frameState: import("../../Map.js").FrameState): void;
    /**
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     */
    updateParticlePositions_(frameState: import("../../Map.js").FrameState): void;
}
import WebGLTileLayerRenderer from './TileLayer.js';
//# sourceMappingURL=FlowLayer.d.ts.map