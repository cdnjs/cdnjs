export default RenderEvent;
declare class RenderEvent extends Event {
    /**
     * @param {import("./EventType.js").default} type Type.
     * @param {import("../transform.js").Transform} [inversePixelTransform] Transform for
     *     CSS pixels to rendered pixels.
     * @param {import("../Map.js").FrameState} [frameState] Frame state.
     * @param {?(CanvasRenderingContext2D|WebGLRenderingContext)} [context] Context.
     */
    constructor(type: any, inversePixelTransform?: number[] | undefined, frameState?: import("../Map.js").FrameState | undefined, context?: CanvasRenderingContext2D | WebGLRenderingContext | null | undefined);
    /**
     * Transform from CSS pixels (relative to the top-left corner of the map viewport)
     * to rendered pixels on this event's `context`. Only available when a Canvas renderer is used, null otherwise.
     * @type {import("../transform.js").Transform|undefined}
     * @api
     */
    inversePixelTransform: import("../transform.js").Transform | undefined;
    /**
     * An object representing the current render frame state.
     * @type {import("../Map.js").FrameState|undefined}
     * @api
     */
    frameState: import("../Map.js").FrameState | undefined;
    /**
     * Canvas context. Not available when the event is dispatched by the map. For Canvas 2D layers,
     * the context will be the 2D rendering context.  For WebGL layers, the context will be the WebGL
     * context.
     * @type {CanvasRenderingContext2D|WebGLRenderingContext|undefined}
     * @api
     */
    context: CanvasRenderingContext2D | WebGLRenderingContext | undefined;
}
import Event from '../events/Event.js';
//# sourceMappingURL=Event.d.ts.map