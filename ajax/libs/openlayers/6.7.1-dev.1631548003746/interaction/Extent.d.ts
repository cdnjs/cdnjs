/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/Extent~Extent} instances are
 * instances of this type.
 */
export class ExtentEvent extends Event {
    /**
     * @param {import("../extent.js").Extent} extent the new extent
     */
    constructor(extent: number[]);
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
     * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled.
     * Default is {@link module:ol/events/condition.always}.
     */
    condition?: (this: any, arg1: import("../MapBrowserEvent.js").default<any>) => boolean;
    /**
     * Initial extent. Defaults to no
     * initial extent.
     */
    extent?: number[];
    /**
     * Style for the drawn extent box. Defaults to
     * {@link module:ol/style/Style~createEditing()['Polygon']}
     */
    boxStyle?: import("../style/Style.js").default | import("../style/Style.js").default[] | ((arg0: import("../render/Feature.js").default | Feature<import("../geom/Geometry.js").default>, arg1: number) => void | import("../style/Style.js").default | import("../style/Style.js").default[]);
    /**
     * Pixel tolerance for considering the
     * pointer close enough to a segment or vertex for editing.
     */
    pixelTolerance?: number;
    /**
     * Style for the cursor used to draw the extent. Defaults to
     * {@link module:ol/style/Style~createEditing()['Point']}
     */
    pointerStyle?: import("../style/Style.js").default | import("../style/Style.js").default[] | ((arg0: import("../render/Feature.js").default | Feature<import("../geom/Geometry.js").default>, arg1: number) => void | import("../style/Style.js").default | import("../style/Style.js").default[]);
    /**
     * Wrap the drawn extent across multiple maps
     * in the X direction? Only affects visuals, not functionality.
     */
    wrapX?: boolean;
};
export type ExtentEventType = string;
/**
 * *
 */
export type ExtentOnSignature<Return> = ((type: "error" | "change", listener: (event: Event) => any) => Return) & ((type: "propertychange" | "change:active", listener: (event: import("../Object.js").ObjectEvent) => any) => Return) & ((type: "extentchanged", listener: (event: ExtentEvent) => any) => Return) & ((type: ("error" | "change" | "propertychange" | "change:active" | "extentchanged")[], listener: (event: globalThis.Event | Event) => any) => Return extends void | null ? void : Return[]);
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
     * Returns the current drawn extent in the view projection (or user projection if set)
     *
     * @return {import("../extent.js").Extent} Drawn extent in the view projection.
     * @api
     */
    getExtent(): number[];
    /**
     * Returns the current drawn extent in the view projection
     *
     * @return {import("../extent.js").Extent} Drawn extent in the view projection.
     * @api
     */
    getExtentInternal(): number[];
    /**
     * Manually sets the drawn extent, using the view projection.
     *
     * @param {import("../extent.js").Extent} extent Extent
     * @api
     */
    setExtent(extent: number[]): void;
}
import Feature from "../Feature.js";
import PointerInteraction from "./Pointer.js";
//# sourceMappingURL=Extent.d.ts.map