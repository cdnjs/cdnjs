export default CanvasLayerRenderer;
/**
 * @abstract
 * @template {import("../../layer/Layer.js").default} LayerType
 */
declare class CanvasLayerRenderer<LayerType extends import("../../layer/Layer.js").default<any>> extends LayerRenderer<any> {
    /**
     * @param {LayerType} layer Layer.
     */
    constructor(layer: LayerType);
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
     * @private
     * @type {import("../../transform.js").Transform}
     */
    private tempTransform_;
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
     * @protected
     * @type {CanvasRenderingContext2D}
     */
    protected context: CanvasRenderingContext2D;
    /**
     * @type {boolean}
     */
    containerReused: boolean;
    /**
     * @type {HTMLCanvasElement}
     * @private
     */
    private createTransformStringCanvas_;
    /**
     * Get a rendering container from an existing target, if compatible.
     * @param {HTMLElement} target Potential render target.
     * @param {string} transform CSS Transform.
     * @param {number} opacity Opacity.
     */
    useContainer(target: HTMLElement, transform: string, opacity: number): void;
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @param {import("../../extent.js").Extent} extent Clip extent.
     * @protected
     */
    protected clip(context: CanvasRenderingContext2D, frameState: import("../../PluggableMap.js").FrameState, extent: number[]): void;
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @param {import("../../extent.js").Extent} extent Clip extent.
     * @protected
     */
    protected clipUnrotated(context: CanvasRenderingContext2D, frameState: import("../../PluggableMap.js").FrameState, extent: number[]): void;
    /**
     * @param {import("../../render/EventType.js").default} type Event type.
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @private
     */
    private dispatchRenderEvent_;
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @protected
     */
    protected preRender(context: CanvasRenderingContext2D, frameState: import("../../PluggableMap.js").FrameState): void;
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @protected
     */
    protected postRender(context: CanvasRenderingContext2D, frameState: import("../../PluggableMap.js").FrameState): void;
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
    protected getRenderTransform(center: number[], resolution: number, rotation: number, pixelRatio: number, width: number, height: number, offsetX: number): number[];
    /**
     * @param {import("../../transform.js").Transform} transform Transform.
     * @return {string} CSS transform.
     */
    createTransformString(transform: number[]): string;
}
import LayerRenderer from "../Layer.js";
//# sourceMappingURL=Layer.d.ts.map