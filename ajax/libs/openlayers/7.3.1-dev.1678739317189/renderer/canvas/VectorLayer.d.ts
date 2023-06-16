export default CanvasVectorLayerRenderer;
/**
 * @classdesc
 * Canvas renderer for vector layers.
 * @api
 */
declare class CanvasVectorLayerRenderer extends CanvasLayerRenderer<any> {
    /**
     * @param {import("../../layer/BaseVector.js").default} vectorLayer Vector layer.
     */
    constructor(vectorLayer: import("../../layer/BaseVector.js").default<any, any>);
    /** @private */
    private boundHandleStyleImageChange_;
    /**
     * @type {boolean}
     */
    animatingOrInteracting_: boolean;
    /**
     * @type {ImageData|null}
     */
    hitDetectionImageData_: ImageData | null;
    /**
     * @type {Array<import("../../Feature.js").default>}
     */
    renderedFeatures_: Array<import("../../Feature.js").default>;
    /**
     * @private
     * @type {number}
     */
    private renderedRevision_;
    /**
     * @private
     * @type {number}
     */
    private renderedResolution_;
    /**
     * @private
     * @type {import("../../extent.js").Extent}
     */
    private renderedExtent_;
    /**
     * @private
     * @type {import("../../extent.js").Extent}
     */
    private wrappedRenderedExtent_;
    /**
     * @private
     * @type {number}
     */
    private renderedRotation_;
    /**
     * @private
     * @type {import("../../coordinate").Coordinate}
     */
    private renderedCenter_;
    /**
     * @private
     * @type {import("../../proj/Projection").default}
     */
    private renderedProjection_;
    /**
     * @private
     * @type {function(import("../../Feature.js").default, import("../../Feature.js").default): number|null}
     */
    private renderedRenderOrder_;
    /**
     * @private
     * @type {import("../../render/canvas/ExecutorGroup").default}
     */
    private replayGroup_;
    /**
     * A new replay group had to be created by `prepareFrame()`
     * @type {boolean}
     */
    replayGroupChanged: boolean;
    /**
     * Clipping to be performed by `renderFrame()`
     * @type {boolean}
     */
    clipping: boolean;
    /**
     * @private
     * @type {CanvasRenderingContext2D}
     */
    private compositionContext_;
    /**
     * @private
     * @type {number}
     */
    private opacity_;
    /**
     * @param {ExecutorGroup} executorGroup Executor group.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {import("rbush").default} [declutterTree] Declutter tree.
     */
    renderWorlds(executorGroup: ExecutorGroup, frameState: import("../../Map.js").FrameState, declutterTree?: any): void;
    setupCompositionContext_(): void;
    releaseCompositionContext_(): void;
    /**
     * Render declutter items for this layer
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     */
    renderDeclutter(frameState: import("../../Map.js").FrameState): void;
    /**
     * Asynchronous layer level hit detection.
     * @param {import("../../pixel.js").Pixel} pixel Pixel.
     * @return {Promise<Array<import("../../Feature").default>>} Promise
     * that resolves with an array of features.
     */
    getFeatures(pixel: import("../../pixel.js").Pixel): Promise<Array<import("../../Feature").default>>;
    /**
     * Handle changes in image style state.
     * @param {import("../../events/Event.js").default} event Image style change event.
     * @private
     */
    private handleStyleImageChange_;
    /**
     * @param {import("../../Feature.js").default} feature Feature.
     * @param {number} squaredTolerance Squared render tolerance.
     * @param {import("../../style/Style.js").default|Array<import("../../style/Style.js").default>} styles The style or array of styles.
     * @param {import("../../render/canvas/BuilderGroup.js").default} builderGroup Builder group.
     * @param {import("../../proj.js").TransformFunction} [transform] Transform from user to view projection.
     * @param {import("../../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
     * @return {boolean} `true` if an image is loading.
     */
    renderFeature(feature: import("../../Feature.js").default, squaredTolerance: number, styles: import("../../style/Style.js").default | Array<import("../../style/Style.js").default>, builderGroup: import("../../render/canvas/BuilderGroup.js").default, transform?: import("../../proj.js").TransformFunction | undefined, declutterBuilderGroup?: CanvasBuilderGroup | undefined): boolean;
}
import CanvasLayerRenderer from "./Layer.js";
import ExecutorGroup from "../../render/canvas/ExecutorGroup.js";
import CanvasBuilderGroup from "../../render/canvas/BuilderGroup.js";
//# sourceMappingURL=VectorLayer.d.ts.map