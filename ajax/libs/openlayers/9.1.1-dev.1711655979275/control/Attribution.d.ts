export default Attribution;
export type Options = {
    /**
     * CSS class name.
     */
    className?: string | undefined;
    /**
     * Specify a target if you
     * want the control to be rendered outside of the map's
     * viewport.
     */
    target?: string | HTMLElement | undefined;
    /**
     * Specify if attributions can
     * be collapsed. If not specified, sources control this behavior with their
     * `attributionsCollapsible` setting.
     */
    collapsible?: boolean | undefined;
    /**
     * Specify if attributions should
     * be collapsed at startup.
     */
    collapsed?: boolean | undefined;
    /**
     * Text label to use for the button tip.
     */
    tipLabel?: string | undefined;
    /**
     * Text label to use for the
     * collapsed attributions button.
     * Instead of text, also an element (e.g. a `span` element) can be used.
     */
    label?: string | HTMLElement | undefined;
    /**
     * CSS class name for the
     * collapsed attributions button.
     */
    expandClassName?: string | undefined;
    /**
     * Text label to use
     * for the expanded attributions button.
     * Instead of text, also an element (e.g. a `span` element) can be used.
     */
    collapseLabel?: string | HTMLElement | undefined;
    /**
     * CSS class name for the
     * expanded attributions button.
     */
    collapseClassName?: string | undefined;
    /**
     * Function called when
     * the control should be re-rendered. This is called in a `requestAnimationFrame`
     * callback.
     */
    render?: ((arg0: import("../MapEvent.js").default) => void) | undefined;
};
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-attribution'] CSS class name.
 * @property {HTMLElement|string} [target] Specify a target if you
 * want the control to be rendered outside of the map's
 * viewport.
 * @property {boolean} [collapsible] Specify if attributions can
 * be collapsed. If not specified, sources control this behavior with their
 * `attributionsCollapsible` setting.
 * @property {boolean} [collapsed=true] Specify if attributions should
 * be collapsed at startup.
 * @property {string} [tipLabel='Attributions'] Text label to use for the button tip.
 * @property {string|HTMLElement} [label='i'] Text label to use for the
 * collapsed attributions button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [expandClassName=className + '-expand'] CSS class name for the
 * collapsed attributions button.
 * @property {string|HTMLElement} [collapseLabel='›'] Text label to use
 * for the expanded attributions button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [collapseClassName=className + '-collapse'] CSS class name for the
 * expanded attributions button.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when
 * the control should be re-rendered. This is called in a `requestAnimationFrame`
 * callback.
 */
/**
 * @classdesc
 * Control to show all the attributions associated with the layer sources
 * in the map. This control is one of the default controls included in maps.
 * By default it will show in the bottom right portion of the map, but this can
 * be changed by using a css selector for `.ol-attribution`.
 *
 * @api
 */
declare class Attribution extends Control {
    /**
     * @param {Options} [options] Attribution options.
     */
    constructor(options?: Options | undefined);
    /**
     * @private
     * @type {HTMLElement}
     */
    private ulElement_;
    /**
     * @private
     * @type {boolean}
     */
    private collapsed_;
    /**
     * @private
     * @type {boolean}
     */
    private userCollapsed_;
    /**
     * @private
     * @type {boolean}
     */
    private overrideCollapsible_;
    /**
     * @private
     * @type {boolean}
     */
    private collapsible_;
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
     * @private
     * @type {HTMLElement}
     */
    private toggleButton_;
    /**
     * A list of currently rendered resolutions.
     * @type {Array<string>}
     * @private
     */
    private renderedAttributions_;
    /**
     * @private
     * @type {boolean}
     */
    private renderedVisible_;
    /**
     * Collect a list of visible attributions and set the collapsible state.
     * @param {import("../Map.js").FrameState} frameState Frame state.
     * @return {Array<string>} Attributions.
     * @private
     */
    private collectSourceAttributions_;
    /**
     * @private
     * @param {?import("../Map.js").FrameState} frameState Frame state.
     */
    private updateElement_;
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
     * Return `true` if the attribution is collapsible, `false` otherwise.
     * @return {boolean} True if the widget is collapsible.
     * @api
     */
    getCollapsible(): boolean;
    /**
     * Set whether the attribution should be collapsible.
     * @param {boolean} collapsible True if the widget is collapsible.
     * @api
     */
    setCollapsible(collapsible: boolean): void;
    /**
     * Collapse or expand the attribution according to the passed parameter. Will
     * not do anything if the attribution isn't collapsible or if the current
     * collapsed state is already the one requested.
     * @param {boolean} collapsed True if the widget is collapsed.
     * @api
     */
    setCollapsed(collapsed: boolean): void;
    /**
     * Return `true` when the attribution is currently collapsed or `false`
     * otherwise.
     * @return {boolean} True if the widget is collapsed.
     * @api
     */
    getCollapsed(): boolean;
}
import Control from './Control.js';
//# sourceMappingURL=Attribution.d.ts.map