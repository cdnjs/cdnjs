export default CanvasImageLayerRenderer;
/**
 * @classdesc
 * Canvas renderer for image layers.
 * @api
 */
declare class CanvasImageLayerRenderer extends CanvasLayerRenderer<any> {
    /**
     * @param {import("../../layer/Image.js").default} imageLayer Image layer.
     */
    constructor(imageLayer: import("../../layer/Image.js").default);
    /**
     * @protected
     * @type {?import("../../ImageBase.js").default}
     */
    protected image_: import("../../ImageBase.js").default | null;
    /**
     * @inheritDoc
     */
    getImage(): HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
    /**
     * @inheritDoc
     */
    prepareFrame(frameState: any): boolean;
    /**
     * @inheritDoc
     */
    renderFrame(frameState: any, target: any): HTMLElement;
}
import CanvasLayerRenderer from "./Layer.js";
//# sourceMappingURL=ImageLayer.d.ts.map