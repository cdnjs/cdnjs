/**
 * @type {Array<HTMLCanvasElement>}
 */
export const canvasPool: Array<HTMLCanvasElement>;
export default CanvasLayerRenderer;
/**
 * @abstract
 * @template {import("../../layer/Layer.js").default} LayerType
 * @extends {LayerRenderer<LayerType>}
 */
declare class CanvasLayerRenderer<LayerType extends import("../../layer/Layer.js").default> extends LayerRenderer<LayerType> {
    /**
     * @protected
     * @type {HTMLElement}
     */
    protected container: HTMLElement;
    /**
     * @protected
     * @type {number}
     */
    protected renderedResolution: number;
    /**
     * A temporary transform.  The values in this transform should only be used in a
     * function that sets the values.
     * @protected
     * @type {import("../../transform.js").Transform}
     */
    protected tempTransform: import("../../transform.js").Transform;
    /**
     * The transform for rendered pixels to viewport CSS pixels.  This transform must
     * be set when rendering a frame and may be used by other functions after rendering.
     * @protected
     * @type {import("../../transform.js").Transform}
     */
    protected pixelTransform: import("../../transform.js").Transform;
    /**
     * The transform for viewport CSS pixels to rendered pixels.  This transform must
     * be set when rendering a frame and may be used by other functions after rendering.
     * @protected
     * @type {import("../../transform.js").Transform}
     */
    protected inversePixelTransform: import("../../transform.js").Transform;
    /**
     * @type {CanvasRenderingContext2D}
     */
    context: CanvasRenderingContext2D;
    /**
     * @private
     * @type {ZIndexContext}
     */
    private deferredContext_;
    /**
     * @type {boolean}
     */
    containerReused: boolean;
    /**
     * @protected
     * @type {import("../../Map.js").FrameState|null}
     */
    protected frameState: import("../../Map.js").FrameState | null;
    /**
     * @param {import('../../DataTile.js').ImageLike} image Image.
     * @param {number} col The column index.
     * @param {number} row The row index.
     * @return {Uint8ClampedArray|null} The image data.
     */
    getImageData(image: import("../../DataTile.js").ImageLike, col: number, row: number): Uint8ClampedArray | null;
    /**
     * @param {import('../../Map.js').FrameState} frameState Frame state.
     * @return {string} Background color.
     */
    getBackground(frameState: import("../../Map.js").FrameState): string;
    /**
     * Get a rendering container from an existing target, if compatible.
     * @param {HTMLElement} target Potential render target.
     * @param {string} transform CSS transform matrix.
     * @param {string} [backgroundColor] Background color.
     */
    useContainer(target: HTMLElement, transform: string, backgroundColor?: string): void;
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {import("../../extent.js").Extent} extent Clip extent.
     * @protected
     */
    protected clipUnrotated(context: CanvasRenderingContext2D, frameState: import("../../Map.js").FrameState, extent: import("../../extent.js").Extent): void;
    /**
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {HTMLElement} target Target that may be used to render content to.
     * @protected
     */
    protected prepareContainer(frameState: import("../../Map.js").FrameState, target: HTMLElement): void;
    /**
     * @param {import("../../render/EventType.js").default} type Event type.
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @private
     */
    private dispatchRenderEvent_;
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @protected
     */
    protected preRender(context: CanvasRenderingContext2D, frameState: import("../../Map.js").FrameState): void;
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @protected
     */
    protected postRender(context: CanvasRenderingContext2D, frameState: import("../../Map.js").FrameState): void;
    /**
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     */
    renderDeferredInternal(frameState: import("../../Map.js").FrameState): void;
    /**
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @return {import('../../render/canvas/ZIndexContext.js').ZIndexContextProxy} Context.
     */
    getRenderContext(frameState: import("../../Map.js").FrameState): import("../../render/canvas/ZIndexContext.js").ZIndexContextProxy;
    /**
     * Creates a transform for rendering to an element that will be rotated after rendering.
     * @param {import("../../coordinate.js").Coordinate} center Center.
     * @param {number} resolution Resolution.
     * @param {number} rotation Rotation.
     * @param {number} pixelRatio Pixel ratio.
     * @param {number} width Width of the rendered element (in pixels).
     * @param {number} height Height of the rendered element (in pixels).
     * @param {number} offsetX Offset on the x-axis in view coordinates.
     * @protected
     * @return {!import("../../transform.js").Transform} Transform.
     */
    protected getRenderTransform(center: import("../../coordinate.js").Coordinate, resolution: number, rotation: number, pixelRatio: number, width: number, height: number, offsetX: number): import("../../transform.js").Transform;
}
import LayerRenderer from '../Layer.js';
//# sourceMappingURL=Layer.d.ts.map