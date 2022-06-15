export default CanvasVectorLayerRenderer;
/**
 * @classdesc
 * Canvas renderer for vector layers.
 * @api
 */
declare class CanvasVectorLayerRenderer extends CanvasLayerRenderer<any> {
    /**
     * @param {import("../../layer/Vector.js").default} vectorLayer Vector layer.
     */
    constructor(vectorLayer: import("../../layer/Vector.js").default);
    /** @private */
    private boundHandleStyleImageChange_;
    /**
     * @type {boolean}
     */
    animatingOrInteracting_: boolean;
    /**
     * @private
     * @type {boolean}
     */
    private dirty_;
    /**
     * @type {ImageData}
     */
    hitDetectionImageData_: ImageData;
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
     * @inheritDoc
     */
    useContainer(target: any, transform: any, opacity: any): void;
    /**
     * @inheritDoc
     */
    renderFrame(frameState: any, target: any): HTMLElement;
    /**
     * @inheritDoc
     */
    getFeatures(pixel: any): Promise<any>;
    /**
     * @inheritDoc
     */
    forEachFeatureAtCoordinate(coordinate: any, frameState: any, hitTolerance: any, callback: any, declutteredFeatures: any): any;
    /**
     * Handle changes in image style state.
     * @param {import("../../events/Event.js").default} event Image style change event.
     * @private
     */
    private handleStyleImageChange_;
    /**
     * @inheritDoc
     */
    prepareFrame(frameState: any): boolean;
    /**
     * @param {import("../../Feature.js").default} feature Feature.
     * @param {number} squaredTolerance Squared render tolerance.
     * @param {import("../../style/Style.js").default|Array<import("../../style/Style.js").default>} styles The style or array of styles.
     * @param {import("../../render/canvas/BuilderGroup.js").default} builderGroup Builder group.
     * @param {import("../../proj.js").TransformFunction=} opt_transform Transform from user to view projection.
     * @return {boolean} `true` if an image is loading.
     */
    renderFeature(feature: import("../../Feature.js").default<any>, squaredTolerance: number, styles: import("../../style/Style.js").default | import("../../style/Style.js").default[], builderGroup: CanvasBuilderGroup, opt_transform?: (arg0: number[], arg1?: number[], arg2?: number) => number[]): boolean;
}
import CanvasLayerRenderer from "./Layer.js";
import CanvasBuilderGroup from "../../render/canvas/BuilderGroup.js";
//# sourceMappingURL=VectorLayer.d.ts.map