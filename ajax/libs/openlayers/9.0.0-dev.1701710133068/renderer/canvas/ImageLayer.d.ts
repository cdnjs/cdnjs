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
    constructor(imageLayer: import("../../layer/Image.js").default<any>);
    /**
     * @protected
     * @type {?import("../../Image.js").default}
     */
    protected image_: import("../../Image.js").default | null;
    /**
     * @return {import('../../DataTile.js').ImageLike} Image.
     */
    getImage(): import('../../DataTile.js').ImageLike;
    /**
     * @param {import("../../pixel.js").Pixel} pixel Pixel.
     * @return {Uint8ClampedArray} Data at the pixel location.
     */
    getData(pixel: import("../../pixel.js").Pixel): Uint8ClampedArray;
    /**
     * Render the layer.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {HTMLElement} target Target that may be used to render content to.
     * @return {HTMLElement} The rendered element.
     */
    renderFrame(frameState: import("../../Map.js").FrameState, target: HTMLElement): HTMLElement;
}
import CanvasLayerRenderer from './Layer.js';
//# sourceMappingURL=ImageLayer.d.ts.map