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
     * Asynchronous layer level hit detection.
     * @param {import("../../pixel.js").Pixel} pixel Pixel.
     * @return {Promise<Array<import("../../Feature").default>>} Promise that resolves with an array of features.
     * @override
     */
    override getFeatures(pixel: import("../../pixel.js").Pixel): Promise<Array<import("../../Feature").default>>;
    /**
     * @override
     */
    override preRender(): void;
    /**
     * @override
     */
    override postRender(): void;
    /**
     */
    renderDeclutter(): void;
}
import CanvasImageLayerRenderer from './ImageLayer.js';
//# sourceMappingURL=VectorImageLayer.d.ts.map