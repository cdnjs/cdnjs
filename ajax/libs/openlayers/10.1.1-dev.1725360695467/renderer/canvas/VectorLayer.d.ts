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
    constructor(vectorLayer: import("../../layer/BaseVector.js").default<any, any, any>);
    /** @private */
    private boundHandleStyleImageChange_;
    /**
     * @private
     * @type {boolean}
     */
    private animatingOrInteracting_;
    /**
     * @private
     * @type {ImageData|null}
     */
    private hitDetectionImageData_;
    /**
     * @private
     * @type {boolean}
     */
    private clipped_;
    /**
     * @private
     * @type {Array<import("../../Feature.js").default>}
     */
    private renderedFeatures_;
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
     * @type {number}
     */
    private renderedPixelRatio_;
    /**
     * @private
     * @type {function(import("../../Feature.js").default, import("../../Feature.js").default): number|null}
     */
    private renderedRenderOrder_;
    /**
     * @private
     * @type {boolean}
     */
    private renderedFrameDeclutter_;
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
    private targetContext_;
    /**
     * @private
     * @type {number}
     */
    private opacity_;
    /**
     * @param {ExecutorGroup} executorGroup Executor group.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {boolean} [declutterable] `true` to only render declutterable items,
     *     `false` to only render non-declutterable items, `undefined` to render all.
     */
    renderWorlds(executorGroup: ExecutorGroup, frameState: import("../../Map.js").FrameState, declutterable?: boolean | undefined): void;
    /**
     * @private
     */
    private setDrawContext_;
    /**
     * @private
     */
    private resetDrawContext_;
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
     * @override
     */
    override getFeatures(pixel: import("../../pixel.js").Pixel): Promise<Array<import("../../Feature").default>>;
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
     * @param {boolean} [declutter] Enable decluttering.
     * @param {number} [index] Render order index.
     * @return {boolean} `true` if an image is loading.
     */
    renderFeature(feature: import("../../Feature.js").default, squaredTolerance: number, styles: import("../../style/Style.js").default | Array<import("../../style/Style.js").default>, builderGroup: import("../../render/canvas/BuilderGroup.js").default, transform?: import("../../proj.js").TransformFunction | undefined, declutter?: boolean | undefined, index?: number | undefined): boolean;
}
import CanvasLayerRenderer from './Layer.js';
import ExecutorGroup from '../../render/canvas/ExecutorGroup.js';
//# sourceMappingURL=VectorLayer.d.ts.map