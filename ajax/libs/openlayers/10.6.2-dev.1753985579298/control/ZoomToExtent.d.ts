export default ZoomToExtent;
export type Options = {
    /**
     * Class name.
     */
    className?: string | undefined;
    /**
     * Specify a target if you want the control
     * to be rendered outside of the map's viewport.
     */
    target?: string | HTMLElement | undefined;
    /**
     * Text label to use for the button.
     * Instead of text, also an element (e.g. a `span` element) can be used.
     */
    label?: string | HTMLElement | undefined;
    /**
     * Text label to use for the button tip.
     */
    tipLabel?: string | undefined;
    /**
     * The extent to zoom to. If undefined the validity
     * extent of the view projection is used.
     */
    extent?: import("../extent.js").Extent | undefined;
    /**
     * Options to pass to the view when fitting
     * the extent (e.g. `padding`, `duration`, `minResolution`, `maxZoom`, `easing`, `callback`).
     */
    fitOptions?: import("../View.js").FitOptions | undefined;
};
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-zoom-extent'] Class name.
 * @property {HTMLElement|string} [target] Specify a target if you want the control
 * to be rendered outside of the map's viewport.
 * @property {string|HTMLElement} [label='E'] Text label to use for the button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [tipLabel='Fit to extent'] Text label to use for the button tip.
 * @property {import("../extent.js").Extent} [extent] The extent to zoom to. If undefined the validity
 * extent of the view projection is used.
 * @property {import("../View.js").FitOptions} [fitOptions] Options to pass to the view when fitting
 * the extent (e.g. `padding`, `duration`, `minResolution`, `maxZoom`, `easing`, `callback`).
 */
/**
 * @classdesc
 * A button control which, when pressed, changes the map view to a specific
 * extent. To style this control use the css selector `.ol-zoom-extent`.
 *
 * @api
 */
declare class ZoomToExtent extends Control {
    /**
     * @param {Options} [options] Options.
     */
    constructor(options?: Options);
    /**
     * @type {?import("../extent.js").Extent|null}
     * @protected
     */
    protected extent: (import("../extent.js").Extent | null) | null;
    /**
     * @type {import("../View.js").FitOptions}
     * @protected
     */
    protected fitOptions: import("../View.js").FitOptions;
    /**
     * @param {MouseEvent} event The event to handle
     * @private
     */
    private handleClick_;
    /**
     * @protected
     */
    protected handleZoomToExtent(): void;
}
import Control from './Control.js';
//# sourceMappingURL=ZoomToExtent.d.ts.map