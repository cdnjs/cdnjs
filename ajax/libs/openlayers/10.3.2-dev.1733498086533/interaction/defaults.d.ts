/**
 * @typedef {Object} DefaultsOptions
 * @property {boolean} [altShiftDragRotate=true] Whether Alt-Shift-drag rotate is
 * desired.
 * @property {boolean} [onFocusOnly=false] Interact only when the map has the
 * focus. This affects the `MouseWheelZoom` and `DragPan` interactions and is
 * useful when page scroll is desired for maps that do not have the browser's
 * focus.
 * @property {boolean} [doubleClickZoom=true] Whether double click zoom is
 * desired.
 * @property {boolean} [keyboard=true] Whether keyboard interaction is desired.
 * @property {boolean} [mouseWheelZoom=true] Whether mousewheel zoom is desired.
 * @property {boolean} [shiftDragZoom=true] Whether Shift-drag zoom is desired.
 * @property {boolean} [dragPan=true] Whether drag pan is desired.
 * @property {boolean} [pinchRotate=true] Whether pinch rotate is desired.
 * @property {boolean} [pinchZoom=true] Whether pinch zoom is desired.
 * @property {number} [zoomDelta] Zoom level delta when using keyboard or double click zoom.
 * @property {number} [zoomDuration] Duration of the zoom animation in
 * milliseconds.
 */
/**
 * Set of interactions included in maps by default. Specific interactions can be
 * excluded by setting the appropriate option to false in the constructor
 * options, but the order of the interactions is fixed.  If you want to specify
 * a different order for interactions, you will need to create your own
 * {@link module:ol/interaction/Interaction~Interaction} instances and insert
 * them into a {@link module:ol/Collection~Collection} in the order you want
 * before creating your {@link module:ol/Map~Map} instance. Changing the order can
 * be of interest if the event propagation needs to be stopped at a point.
 * The default set of interactions, in sequence, is:
 * * {@link module:ol/interaction/DragRotate~DragRotate}
 * * {@link module:ol/interaction/DoubleClickZoom~DoubleClickZoom}
 * * {@link module:ol/interaction/DragPan~DragPan}
 * * {@link module:ol/interaction/PinchRotate~PinchRotate}
 * * {@link module:ol/interaction/PinchZoom~PinchZoom}
 * * {@link module:ol/interaction/KeyboardPan~KeyboardPan}
 * * {@link module:ol/interaction/KeyboardZoom~KeyboardZoom}
 * * {@link module:ol/interaction/MouseWheelZoom~MouseWheelZoom}
 * * {@link module:ol/interaction/DragZoom~DragZoom}
 *
 * @param {DefaultsOptions} [options] Defaults options.
 * @return {Collection<import("./Interaction.js").default>}
 * A collection of interactions to be used with the {@link module:ol/Map~Map}
 * constructor's `interactions` option.
 * @api
 */
export function defaults(options?: DefaultsOptions): Collection<import("./Interaction.js").default>;
export type DefaultsOptions = {
    /**
     * Whether Alt-Shift-drag rotate is
     * desired.
     */
    altShiftDragRotate?: boolean | undefined;
    /**
     * Interact only when the map has the
     * focus. This affects the `MouseWheelZoom` and `DragPan` interactions and is
     * useful when page scroll is desired for maps that do not have the browser's
     * focus.
     */
    onFocusOnly?: boolean | undefined;
    /**
     * Whether double click zoom is
     * desired.
     */
    doubleClickZoom?: boolean | undefined;
    /**
     * Whether keyboard interaction is desired.
     */
    keyboard?: boolean | undefined;
    /**
     * Whether mousewheel zoom is desired.
     */
    mouseWheelZoom?: boolean | undefined;
    /**
     * Whether Shift-drag zoom is desired.
     */
    shiftDragZoom?: boolean | undefined;
    /**
     * Whether drag pan is desired.
     */
    dragPan?: boolean | undefined;
    /**
     * Whether pinch rotate is desired.
     */
    pinchRotate?: boolean | undefined;
    /**
     * Whether pinch zoom is desired.
     */
    pinchZoom?: boolean | undefined;
    /**
     * Zoom level delta when using keyboard or double click zoom.
     */
    zoomDelta?: number | undefined;
    /**
     * Duration of the zoom animation in
     * milliseconds.
     */
    zoomDuration?: number | undefined;
};
import Collection from '../Collection.js';
//# sourceMappingURL=defaults.d.ts.map