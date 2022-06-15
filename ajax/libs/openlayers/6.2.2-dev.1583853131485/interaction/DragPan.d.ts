export default DragPan;
export type Options = {
    /**
     * A function that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
     * to indicate whether that event should be handled.
     * Default is {@link module:ol/events/condition~noModifierKeys} and {@link module:ol/events/condition~primaryAction}.
     * In addition, if there is a `tabindex` attribute on the map element,
     * {@link module:ol/events/condition~focus} will also be applied.
     */
    condition?: (this: any, arg1: import("../MapBrowserEvent.js").default) => boolean;
    /**
     * Kinetic inertia to apply to the pan.
     */
    kinetic?: import("../Kinetic.js").default;
};
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
 * to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition~noModifierKeys} and {@link module:ol/events/condition~primaryAction}.
 * In addition, if there is a `tabindex` attribute on the map element,
 * {@link module:ol/events/condition~focus} will also be applied.
 * @property {import("../Kinetic.js").default} [kinetic] Kinetic inertia to apply to the pan.
 */
/**
 * @classdesc
 * Allows the user to pan the map by dragging the map.
 * @api
 */
declare class DragPan extends PointerInteraction {
    /**
     * @param {Options=} opt_options Options.
     */
    constructor(opt_options?: Options);
    /**
     * @private
     * @type {import("../Kinetic.js").default|undefined}
     */
    private kinetic_;
    /**
     * @type {import("../pixel.js").Pixel}
     */
    lastCentroid: import("../pixel.js").Pixel;
    /**
     * @type {number}
     */
    lastPointersCount_: number;
    /**
     * @type {boolean}
     */
    panning_: boolean;
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    private condition_;
    /**
     * @private
     * @type {boolean}
     */
    private noKinetic_;
    /**
     * @private
     * @param {import("../MapBrowserEvent").default} mapBrowserEvent Event.
     * @return {boolean} Condition passes.
     */
    private conditionInternal_;
    /**
     * @inheritDoc
     */
    handleDragEvent(mapBrowserEvent: any): void;
    /**
     * @inheritDoc
     */
    handleUpEvent(mapBrowserEvent: any): boolean;
    /**
     * @inheritDoc
     */
    handleDownEvent(mapBrowserEvent: any): boolean;
}
import PointerInteraction from "./Pointer.js";
//# sourceMappingURL=DragPan.d.ts.map