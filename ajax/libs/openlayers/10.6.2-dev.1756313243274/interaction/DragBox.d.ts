/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/DragBox~DragBox} instances are instances of
 * this type.
 */
export class DragBoxEvent extends Event {
    /**
     * @param {string} type The event type.
     * @param {import("../coordinate.js").Coordinate} coordinate The event coordinate.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Originating event.
     */
    constructor(type: string, coordinate: import("../coordinate.js").Coordinate, mapBrowserEvent: import("../MapBrowserEvent.js").default);
    /**
     * The coordinate of the drag event.
     * @const
     * @type {import("../coordinate.js").Coordinate}
     * @api
     */
    coordinate: import("../coordinate.js").Coordinate;
    /**
     * @const
     * @type {import("../MapBrowserEvent.js").default}
     * @api
     */
    mapBrowserEvent: import("../MapBrowserEvent.js").default;
}
export default DragBox;
/**
 * A function that takes a {@link module :ol/MapBrowserEvent~MapBrowserEvent} and two
 * {@link module :ol/pixel~Pixel}s and returns a `{boolean}`. If the condition is met,
 * true should be returned.
 */
export type EndCondition = (this: unknown, arg1: import("../MapBrowserEvent.js").default, arg2: import("../pixel.js").Pixel, arg3: import("../pixel.js").Pixel) => boolean;
export type Options = {
    /**
     * CSS class name for styling the box.
     */
    className?: string | undefined;
    /**
     * A function that takes a {@link module :ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
     * to indicate whether that event should be handled.
     * Default is {@link ol /events/condition~mouseActionButton}.
     */
    condition?: import("../events/condition.js").Condition | undefined;
    /**
     * The minimum area of the box in pixel, this value is used by the default
     * `boxEndCondition` function.
     */
    minArea?: number | undefined;
    /**
     * A function that takes a {@link module :ol/MapBrowserEvent~MapBrowserEvent} and two
     * {@link module :ol/pixel~Pixel}s to indicate whether a `boxend` event should be fired.
     * Default is `true` if the area of the box is bigger than the `minArea` option.
     */
    boxEndCondition?: EndCondition | undefined;
    /**
     * Code to execute just
     * before `boxend` is fired.
     */
    onBoxEnd?: ((this: DragBox, arg1: import("../MapBrowserEvent.js").default) => void) | undefined;
};
/**
 * *
 */
export type DragBoxOnSignature<Return> = import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> & import("../Observable").OnSignature<import("../ObjectEventType").Types | "change:active", import("../Object").ObjectEvent, Return> & import("../Observable").OnSignature<"boxcancel" | "boxdrag" | "boxend" | "boxstart", DragBoxEvent, Return> & import("../Observable").CombinedOnSignature<import("../Observable").EventTypes | import("../ObjectEventType").Types | "change:active" | "boxcancel" | "boxdrag" | "boxend", Return>;
import Event from '../events/Event.js';
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:active', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<'boxcancel'|'boxdrag'|'boxend'|'boxstart', DragBoxEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     'change:active'|'boxcancel'|'boxdrag'|'boxend', Return>} DragBoxOnSignature
 */
/**
 * @classdesc
 * Allows the user to draw a vector box by clicking and dragging on the map,
 * normally combined with a {@link module:ol/events/condition} that limits
 * it to when the shift or other key is held down. This is used, for example,
 * for zooming to a specific area of the map
 * (see {@link module:ol/interaction/DragZoom~DragZoom} and
 * {@link module:ol/interaction/DragRotateAndZoom~DragRotateAndZoom}).
 *
 * @fires DragBoxEvent
 * @api
 */
declare class DragBox extends PointerInteraction {
    /**
     * @param {Options} [options] Options.
     */
    constructor(options?: Options);
    /***
     * @type {DragBoxOnSignature<import("../events").EventsKey>}
     */
    on: DragBoxOnSignature<import("../events").EventsKey>;
    /***
     * @type {DragBoxOnSignature<import("../events").EventsKey>}
     */
    once: DragBoxOnSignature<import("../events").EventsKey>;
    /***
     * @type {DragBoxOnSignature<void>}
     */
    un: DragBoxOnSignature<void>;
    /**
     * @type {import("../render/Box.js").default}
     * @private
     */
    private box_;
    /**
     * @type {number}
     * @private
     */
    private minArea_;
    /**
     * Function to execute just before `onboxend` is fired
     * @param {import("../MapBrowserEvent.js").default} event Event.
     */
    onBoxEnd(event: import("../MapBrowserEvent.js").default): void;
    /**
     * @type {import("../pixel.js").Pixel}
     * @private
     */
    private startPixel_;
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    private condition_;
    /**
     * @private
     * @type {EndCondition}
     */
    private boxEndCondition_;
    /**
     * The default condition for determining whether the boxend event
     * should fire.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent The originating MapBrowserEvent
     *     leading to the box end.
     * @param {import("../pixel.js").Pixel} startPixel The starting pixel of the box.
     * @param {import("../pixel.js").Pixel} endPixel The end pixel of the box.
     * @return {boolean} Whether or not the boxend condition should be fired.
     */
    defaultBoxEndCondition(mapBrowserEvent: import("../MapBrowserEvent.js").default, startPixel: import("../pixel.js").Pixel, endPixel: import("../pixel.js").Pixel): boolean;
    /**
     * Returns geometry of last drawn box.
     * @return {import("../geom/Polygon.js").default} Geometry.
     * @api
     */
    getGeometry(): import("../geom/Polygon.js").default;
}
import PointerInteraction from './Pointer.js';
//# sourceMappingURL=DragBox.d.ts.map