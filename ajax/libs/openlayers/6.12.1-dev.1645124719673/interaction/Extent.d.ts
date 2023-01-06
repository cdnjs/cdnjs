/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/Extent~Extent} instances are
 * instances of this type.
 */
export class ExtentEvent extends Event {
    /**
     * @param {import("../extent.js").Extent} extent the new extent
     */
    constructor(extent: import("../extent.js").Extent);
    /**
     * The current extent.
     * @type {import("../extent.js").Extent}
     * @api
     */
    extent: import("../extent.js").Extent;
}
export default Extent;
export type Options = {
    /**
     * A function that
     * takes an {@link module :ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled.
     * Default is {@link module :ol/events/condition.always}.
     */
    condition?: import("../events/condition.js").Condition | undefined;
    /**
     * Initial extent. Defaults to no
     * initial extent.
     */
    extent?: import("../extent.js").Extent | undefined;
    /**
     * Style for the drawn extent box. Defaults to the `Polygon` editing style
     * documented in {@link module :ol/style/Style~Style}
     */
    boxStyle?: import("../style/Style.js").StyleLike | undefined;
    /**
     * Pixel tolerance for considering the
     * pointer close enough to a segment or vertex for editing.
     */
    pixelTolerance?: number | undefined;
    /**
     * Style for the cursor used to draw the extent. Defaults to the `Point` editing style
     * documented in {@link module :ol/style/Style~Style}
     */
    pointerStyle?: import("../style/Style.js").StyleLike | undefined;
    /**
     * Wrap the drawn extent across multiple maps
     * in the X direction? Only affects visuals, not functionality.
     */
    wrapX?: boolean | undefined;
};
/**
 * *
 */
export type ExtentOnSignature<Return> = import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> & import("../Observable").OnSignature<import("../ObjectEventType").Types | 'change:active', import("../Object").ObjectEvent, Return> & import("../Observable").OnSignature<'extentchanged', ExtentEvent, Return> & import("../Observable").CombinedOnSignature<import("../Observable").EventTypes | import("../ObjectEventType").Types | 'change:active' | 'extentchanged', Return>;
import Event from "../events/Event.js";
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:active', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<'extentchanged', ExtentEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     'change:active'|'extentchanged', Return>} ExtentOnSignature
 */
/**
 * @classdesc
 * Allows the user to draw a vector box by clicking and dragging on the map.
 * Once drawn, the vector box can be modified by dragging its vertices or edges.
 * This interaction is only supported for mouse devices.
 *
 * @fires ExtentEvent
 * @api
 */
declare class Extent extends PointerInteraction {
    /**
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options | undefined);
    /***
     * @type {ExtentOnSignature<import("../events").EventsKey>}
     */
    on: ExtentOnSignature<import("../events").EventsKey>;
    /***
     * @type {ExtentOnSignature<import("../events").EventsKey>}
     */
    once: ExtentOnSignature<import("../events").EventsKey>;
    /***
     * @type {ExtentOnSignature<void>}
     */
    un: ExtentOnSignature<void>;
    /**
     * Condition
     * @type {import("../events/condition.js").Condition}
     * @private
     */
    private condition_;
    /**
     * Extent of the drawn box
     * @type {import("../extent.js").Extent}
     * @private
     */
    private extent_;
    /**
     * Handler for pointer move events
     * @type {function (import("../coordinate.js").Coordinate): import("../extent.js").Extent|null}
     * @private
     */
    private pointerHandler_;
    /**
     * Pixel threshold to snap to extent
     * @type {number}
     * @private
     */
    private pixelTolerance_;
    /**
     * Is the pointer snapped to an extent vertex
     * @type {boolean}
     * @private
     */
    private snappedToVertex_;
    /**
     * Feature for displaying the visible extent
     * @type {Feature}
     * @private
     */
    private extentFeature_;
    /**
     * Feature for displaying the visible pointer
     * @type {Feature<Point>}
     * @private
     */
    private vertexFeature_;
    /**
     * Layer for the extentFeature
     * @type {VectorLayer}
     * @private
     */
    private extentOverlay_;
    /**
     * Layer for the vertexFeature
     * @type {VectorLayer}
     * @private
     */
    private vertexOverlay_;
    /**
     * @param {import("../pixel.js").Pixel} pixel cursor location
     * @param {import("../PluggableMap.js").default} map map
     * @return {import("../coordinate.js").Coordinate|null} snapped vertex on extent
     * @private
     */
    private snapToVertex_;
    /**
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent pointer move event
     * @private
     */
    private handlePointerMove_;
    /**
     * @param {import("../extent.js").Extent} extent extent
     * @return {Feature} extent as featrue
     * @private
     */
    private createOrUpdateExtentFeature_;
    /**
     * @param {import("../coordinate.js").Coordinate} vertex location of feature
     * @return {Feature} vertex as feature
     * @private
     */
    private createOrUpdatePointerFeature_;
    /**
     * Remove the interaction from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {import("../PluggableMap.js").default} map Map.
     */
    setMap(map: import("../PluggableMap.js").default): void;
    /**
     * Returns the current drawn extent in the view projection (or user projection if set)
     *
     * @return {import("../extent.js").Extent} Drawn extent in the view projection.
     * @api
     */
    getExtent(): import("../extent.js").Extent;
    /**
     * Returns the current drawn extent in the view projection
     *
     * @return {import("../extent.js").Extent} Drawn extent in the view projection.
     * @api
     */
    getExtentInternal(): import("../extent.js").Extent;
    /**
     * Manually sets the drawn extent, using the view projection.
     *
     * @param {import("../extent.js").Extent} extent Extent
     * @api
     */
    setExtent(extent: import("../extent.js").Extent): void;
}
import PointerInteraction from "./Pointer.js";
//# sourceMappingURL=Extent.d.ts.map