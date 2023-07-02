export const Uniforms: {
    RENDER_EXTENT: string;
    GLOBAL_ALPHA: string;
    PROJECTION_MATRIX: string;
    OFFSET_SCALE_MATRIX: string;
    OFFSET_ROTATION_MATRIX: string;
    TIME: string;
    ZOOM: string;
    RESOLUTION: string;
    VIEWPORT_SIZE_PX: string;
    PIXEL_RATIO: string;
};
export default WebGLVectorLayerRenderer;
export type VectorStyle = import('../../render/webgl/VectorStyleRenderer.js').VectorStyle;
export type Options = {
    /**
     * A CSS class name to set to the canvas element.
     */
    className?: string | undefined;
    /**
     * Vector style as literal style or shaders; can also accept an array of styles
     */
    style: VectorStyle | Array<VectorStyle>;
    /**
     * Post-processes definitions
     */
    postProcesses?: import("./Layer.js").PostProcessesOptions[] | undefined;
};
/**
 * @typedef {import('../../render/webgl/VectorStyleRenderer.js').VectorStyle} VectorStyle
 */
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the canvas element.
 * @property {VectorStyle|Array<VectorStyle>} style Vector style as literal style or shaders; can also accept an array of styles
 * @property {Array<import("./Layer").PostProcessesOptions>} [postProcesses] Post-processes definitions
 */
/**
 * @classdesc
 * Experimental WebGL vector renderer. Supports polygons, lines and points:
 *  * Polygons are broken down into triangles
 *  * Lines are rendered as strips of quads
 *  * Points are rendered as quads
 *
 * You need to provide vertex and fragment shaders as well as custom attributes for each type of geometry. All shaders
 * can access the uniforms in the {@link module:ol/webgl/Helper~DefaultUniform} enum.
 * The vertex shaders can access the following attributes depending on the geometry type:
 *  * For polygons: {@link module:ol/render/webgl/PolygonBatchRenderer~Attributes}
 *  * For line strings: {@link module:ol/render/webgl/LineStringBatchRenderer~Attributes}
 *  * For points: {@link module:ol/render/webgl/PointBatchRenderer~Attributes}
 *
 * Please note that the fragment shaders output should have premultiplied alpha, otherwise visual anomalies may occur.
 *
 * Note: this uses {@link module:ol/webgl/Helper~WebGLHelper} internally.
 */
declare class WebGLVectorLayerRenderer extends WebGLLayerRenderer<any> {
    /**
     * @param {import("../../layer/Layer.js").default} layer Layer.
     * @param {Options} options Options.
     */
    constructor(layer: import("../../layer/Layer.js").default, options: Options);
    sourceRevision_: number;
    previousExtent_: import("../../extent.js").Extent;
    /**
     * This transform is updated on every frame and is the composition of:
     * - invert of the world->screen transform that was used when rebuilding buffers (see `this.renderTransform_`)
     * - current world->screen transform
     * @type {import("../../transform.js").Transform}
     * @private
     */
    private currentTransform_;
    tmpTransform_: number[];
    tmpMat4_: number[];
    /**
     * @type {import("../../transform.js").Transform}
     * @private
     */
    private currentFrameStateTransform_;
    /**
     * @type {Array<VectorStyle>}
     * @private
     */
    private styles_;
    /**
     * @type {Array<VectorStyleRenderer>}
     * @private
     */
    private styleRenderers_;
    /**
     * @type {Array<import('../../render/webgl/VectorStyleRenderer.js').WebGLBuffers>}
     * @private
     */
    private buffers_;
    /**
     * @private
     */
    private batch_;
    sourceListenKeys_: import("../../events.js").EventsKey[];
    /**
     * @param {Options} options Options.
     * @private
     */
    private applyOptions_;
    /**
     * @private
     */
    private createRenderers_;
    reset(options: any): void;
    /**
     * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
     * @private
     */
    private handleSourceFeatureAdded_;
    /**
     * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
     * @private
     */
    private handleSourceFeatureChanged_;
    /**
     * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
     * @private
     */
    private handleSourceFeatureDelete_;
    /**
     * @private
     */
    private handleSourceFeatureClear_;
    /**
     * @param {import("../../transform.js").Transform} batchInvertTransform Inverse of the transformation in which geometries are expressed
     * @private
     */
    private applyUniforms_;
    /**
     * Render the layer.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @return {HTMLElement} The rendered element.
     */
    renderFrame(frameState: import("../../Map.js").FrameState): HTMLElement;
}
import WebGLLayerRenderer from './Layer.js';
//# sourceMappingURL=VectorLayer.d.ts.map