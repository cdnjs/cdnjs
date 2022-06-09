export default CanvasVectorImageLayerRenderer;
/**
 * @classdesc
 * Canvas renderer for image layers.
 * @api
 */
declare class CanvasVectorImageLayerRenderer extends CanvasImageLayerRenderer {
    /**
     * @param {import("../../layer/VectorImage.js").default} layer Vector image layer.
     */
    constructor(layer: import("../../layer/VectorImage.js").default);
    /**
     * @private
     * @type {import("./VectorLayer.js").default}
     */
    private vectorRenderer_;
    /**
     * @private
     * @type {number}
     */
    private layerImageRatio_;
    /**
     * @private
     * @type {import("../../transform.js").Transform}
     */
    private coordinateToVectorPixelTransform_;
    /**
     * @private
     * @type {import("../../transform.js").Transform}
     */
    private renderedPixelToCoordinateTransform_;
    /**
     * @inheritDoc
     */
    getFeatures(pixel: any): Promise<any>;
    /**
     * @override
     */
    preRender(): void;
    /**
     * @override
     */
    postRender(): void;
    /**
     * @inheritDoc
     */
    forEachFeatureAtCoordinate(coordinate: any, frameState: any, hitTolerance: any, callback: any, declutteredFeatures: any): any;
}
import CanvasImageLayerRenderer from "./ImageLayer.js";
//# sourceMappingURL=VectorImageLayer.d.ts.map