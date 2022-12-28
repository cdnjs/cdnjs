export default DragZoom;
export type Options = {
    /**
     * CSS class name for styling the
     * box.
     */
    className?: string | undefined;
    /**
     * A function that
     * takes an {@link module :ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled.
     * Default is {@link module :ol/events/condition.shiftKeyOnly}.
     */
    condition?: import("../events/condition.js").Condition | undefined;
    /**
     * Animation duration in milliseconds.
     */
    duration?: number | undefined;
    /**
     * Use interaction for zooming out.
     */
    out?: boolean | undefined;
    /**
     * The minimum area of the box in pixel, this value is used by the parent default
     * `boxEndCondition` function.
     */
    minArea?: number | undefined;
};
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-dragzoom'] CSS class name for styling the
 * box.
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition.shiftKeyOnly}.
 * @property {number} [duration=200] Animation duration in milliseconds.
 * @property {boolean} [out=false] Use interaction for zooming out.
 * @property {number} [minArea=64] The minimum area of the box in pixel, this value is used by the parent default
 * `boxEndCondition` function.
 */
/**
 * @classdesc
 * Allows the user to zoom the map by clicking and dragging on the map,
 * normally combined with an {@link module:ol/events/condition} that limits
 * it to when a key, shift by default, is held down.
 *
 * To change the style of the box, use CSS and the `.ol-dragzoom` selector, or
 * your custom one configured with `className`.
 * @api
 */
declare class DragZoom extends DragBox {
    /**
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options | undefined);
    /**
     * @private
     * @type {number}
     */
    private duration_;
    /**
     * @private
     * @type {boolean}
     */
    private out_;
}
import DragBox from "./DragBox.js";
//# sourceMappingURL=DragZoom.d.ts.map