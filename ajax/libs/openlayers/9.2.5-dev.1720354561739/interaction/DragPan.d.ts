export default DragPan;
export type Options = {
    /**
     * A function that takes a {@link module :ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
     * to indicate whether that event should be handled.
     * Default is {@link module :ol/events/condition.noModifierKeys} and {@link module :ol/events/condition.primaryAction}.
     */
    condition?: import("../events/condition.js").Condition | undefined;
    /**
     * When the map's target has a `tabindex` attribute set,
     * the interaction will only handle events when the map has the focus.
     */
    onFocusOnly?: boolean | undefined;
    /**
     * Kinetic inertia to apply to the pan.
     */
    kinetic?: import("../Kinetic.js").default | undefined;
};
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
 * to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition.noModifierKeys} and {@link module:ol/events/condition.primaryAction}.
 * @property {boolean} [onFocusOnly=false] When the map's target has a `tabindex` attribute set,
 * the interaction will only handle events when the map has the focus.
 * @property {import("../Kinetic.js").default} [kinetic] Kinetic inertia to apply to the pan.
 */
/**
 * @classdesc
 * Allows the user to pan the map by dragging the map.
 * @api
 */
declare class DragPan extends PointerInteraction {
    /**
     * @param {Options} [options] Options.
     */
    constructor(options?: Options | undefined);
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
     * @private
     */
    private lastPointersCount_;
    /**
     * @type {boolean}
     * @private
     */
    private panning_;
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
}
import PointerInteraction from './Pointer.js';
//# sourceMappingURL=DragPan.d.ts.map