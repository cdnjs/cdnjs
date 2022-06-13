export default Extent;
export type Options = {
    /**
     * Initial extent. Defaults to no
     * initial extent.
     */
    extent?: number[];
    /**
     * Style for the drawn extent box. Defaults to
     * {@link module:ol/style/Style~createEditing()['Polygon']}
     */
    boxStyle?: import("../style/Style.js").default | import("../style/Style.js").default[] | ((arg0: import("../render/Feature.js").default | Feature<any>, arg1: number) => void | import("../style/Style.js").default | import("../style/Style.js").default[]);
    /**
     * Pixel tolerance for considering the
     * pointer close enough to a segment or vertex for editing.
     */
    pixelTolerance?: number;
    /**
     * Style for the cursor used to draw the extent. Defaults to
     * {@link module:ol/style/Style~createEditing()['Point']}
     */
    pointerStyle?: import("../style/Style.js").default | import("../style/Style.js").default[] | ((arg0: import("../render/Feature.js").default | Feature<any>, arg1: number) => void | import("../style/Style.js").default | import("../style/Style.js").default[]);
    /**
     * Wrap the drawn extent across multiple maps
     * in the X direction? Only affects visuals, not functionality.
     */
    wrapX?: boolean;
};
export type ExtentEventType = string;
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
     * @param {Options=} opt_options Options.
     */
    constructor(opt_options?: Options);
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
     * @returns {import("../coordinate.js").Coordinate|null} snapped vertex on extent
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
     * @returns {Feature} extent as featrue
     * @private
     */
    private createOrUpdateExtentFeature_;
    /**
     * @param {import("../coordinate.js").Coordinate} vertex location of feature
     * @returns {Feature} vertex as feature
     * @private
     */
    private createOrUpdatePointerFeature_;
    /**
     * @inheritDoc
     */
    handleDownEvent(mapBrowserEvent: any): boolean;
    /**
     * @inheritDoc
     */
    handleDragEvent(mapBrowserEvent: any): boolean;
    /**
     * @inheritDoc
     */
    handleUpEvent(mapBrowserEvent: any): boolean;
    /**
     * @inheritDoc
     */
    setMap(map: any): void;
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