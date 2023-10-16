export default OverviewMap;
export type Options = {
    /**
     * CSS class name.
     */
    className?: string | undefined;
    /**
     * Whether the control should start collapsed or not (expanded).
     */
    collapsed?: boolean | undefined;
    /**
     * Text label to use for the
     * expanded overviewmap button. Instead of text, also an element (e.g. a `span` element) can be used.
     */
    collapseLabel?: string | HTMLElement | undefined;
    /**
     * Whether the control can be collapsed or not.
     */
    collapsible?: boolean | undefined;
    /**
     * Text label to use for the collapsed
     * overviewmap button. Instead of text, also an element (e.g. a `span` element) can be used.
     */
    label?: string | HTMLElement | undefined;
    /**
     * Layers for the overview map.
     */
    layers?: import("../layer/Base.js").default[] | Collection<import("../layer/Base.js").default> | undefined;
    /**
     * Function called when the control
     * should be re-rendered. This is called in a `requestAnimationFrame` callback.
     */
    render?: ((arg0: import("../MapEvent.js").default) => void) | undefined;
    /**
     * Whether the control view should rotate with the main map view.
     */
    rotateWithView?: boolean | undefined;
    /**
     * Specify a target if you want the control
     * to be rendered outside of the map's viewport.
     */
    target?: string | HTMLElement | undefined;
    /**
     * Text label to use for the button tip.
     */
    tipLabel?: string | undefined;
    /**
     * Custom view for the overview map (should use same projection as main map). If not provided,
     * a default view with the same projection as the main map will be used.
     */
    view?: View | undefined;
};
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-overviewmap'] CSS class name.
 * @property {boolean} [collapsed=true] Whether the control should start collapsed or not (expanded).
 * @property {string|HTMLElement} [collapseLabel='‹'] Text label to use for the
 * expanded overviewmap button. Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {boolean} [collapsible=true] Whether the control can be collapsed or not.
 * @property {string|HTMLElement} [label='›'] Text label to use for the collapsed
 * overviewmap button. Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {Array<import("../layer/Base.js").default>|import("../Collection.js").default<import("../layer/Base.js").default>} [layers]
 * Layers for the overview map.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when the control
 * should be re-rendered. This is called in a `requestAnimationFrame` callback.
 * @property {boolean} [rotateWithView=false] Whether the control view should rotate with the main map view.
 * @property {HTMLElement|string} [target] Specify a target if you want the control
 * to be rendered outside of the map's viewport.
 * @property {string} [tipLabel='Overview map'] Text label to use for the button tip.
 * @property {View} [view] Custom view for the overview map (should use same projection as main map). If not provided,
 * a default view with the same projection as the main map will be used.
 */
/**
 * Create a new control with a map acting as an overview map for another
 * defined map.
 *
 * @api
 */
declare class OverviewMap extends Control {
    /**
     * @param {Options} [options] OverviewMap options.
     */
    constructor(options?: Options | undefined);
    /**
     * @private
     */
    private boundHandleRotationChanged_;
    /**
     * @type {boolean}
     * @private
     */
    private collapsed_;
    /**
     * @private
     * @type {boolean}
     */
    private collapsible_;
    /**
     * @private
     * @type {boolean}
     */
    private rotateWithView_;
    /**
     * @private
     * @type {import("../extent.js").Extent|undefined}
     */
    private viewExtent_;
    /**
     * @private
     * @type {HTMLElement}
     */
    private collapseLabel_;
    /**
     * @private
     * @type {HTMLElement}
     */
    private label_;
    /**
     * @type {HTMLElement}
     * @private
     */
    private ovmapDiv_;
    /**
     * Explicitly given view to be used instead of a view derived from the main map.
     * @type {View}
     * @private
     */
    private view_;
    /**
     * @type {Map}
     * @private
     */
    private ovmap_;
    /**
     * @type {import("../Overlay.js").default}
     * @private
     */
    private boxOverlay_;
    /**
     * Handle map property changes.  This only deals with changes to the map's view.
     * @param {import("../Object.js").ObjectEvent} event The propertychange event.
     * @private
     */
    private handleMapPropertyChange_;
    /**
     * Register listeners for view property changes.
     * @param {import("../View.js").default} view The view.
     * @private
     */
    private bindView_;
    /**
     * Unregister listeners for view property changes.
     * @param {import("../View.js").default} view The view.
     * @private
     */
    private unbindView_;
    /**
     * Handle rotation changes to the main map.
     * @private
     */
    private handleRotationChanged_;
    /**
     * Reset the overview map extent if the box size (width or
     * height) is less than the size of the overview map size times minRatio
     * or is greater than the size of the overview size times maxRatio.
     *
     * If the map extent was not reset, the box size can fits in the defined
     * ratio sizes. This method then checks if is contained inside the overview
     * map current extent. If not, recenter the overview map to the current
     * main map center location.
     * @private
     */
    private validateExtent_;
    /**
     * Reset the overview map extent to half calculated min and max ratio times
     * the extent of the main map.
     * @private
     */
    private resetExtent_;
    /**
     * Set the center of the overview map to the map center without changing its
     * resolution.
     * @private
     */
    private recenter_;
    /**
     * Update the box using the main map extent
     * @private
     */
    private updateBox_;
    /**
     * @private
     */
    private updateBoxAfterOvmapIsRendered_;
    ovmapPostrenderKey_: any;
    /**
     * @param {MouseEvent} event The event to handle
     * @private
     */
    private handleClick_;
    /**
     * @private
     */
    private handleToggle_;
    /**
     * Return `true` if the overview map is collapsible, `false` otherwise.
     * @return {boolean} True if the widget is collapsible.
     * @api
     */
    getCollapsible(): boolean;
    /**
     * Set whether the overview map should be collapsible.
     * @param {boolean} collapsible True if the widget is collapsible.
     * @api
     */
    setCollapsible(collapsible: boolean): void;
    /**
     * Collapse or expand the overview map according to the passed parameter. Will
     * not do anything if the overview map isn't collapsible or if the current
     * collapsed state is already the one requested.
     * @param {boolean} collapsed True if the widget is collapsed.
     * @api
     */
    setCollapsed(collapsed: boolean): void;
    /**
     * Determine if the overview map is collapsed.
     * @return {boolean} The overview map is collapsed.
     * @api
     */
    getCollapsed(): boolean;
    /**
     * Return `true` if the overview map view can rotate, `false` otherwise.
     * @return {boolean} True if the control view can rotate.
     * @api
     */
    getRotateWithView(): boolean;
    /**
     * Set whether the overview map view should rotate with the main map view.
     * @param {boolean} rotateWithView True if the control view should rotate.
     * @api
     */
    setRotateWithView(rotateWithView: boolean): void;
    /**
     * Return the overview map.
     * @return {import("../Map.js").default} Overview map.
     * @api
     */
    getOverviewMap(): import("../Map.js").default;
}
import Collection from '../Collection.js';
import View from '../View.js';
import Control from './Control.js';
//# sourceMappingURL=OverviewMap.d.ts.map