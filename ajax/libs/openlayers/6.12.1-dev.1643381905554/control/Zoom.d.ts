export default Zoom;
export type Options = {
    /**
     * Animation duration in milliseconds.
     */
    duration?: number | undefined;
    /**
     * CSS class name.
     */
    className?: string | undefined;
    /**
     * CSS class name for the zoom-in button.
     */
    zoomInClassName?: string | undefined;
    /**
     * CSS class name for the zoom-out button.
     */
    zoomOutClassName?: string | undefined;
    /**
     * Text label to use for the zoom-in
     * button. Instead of text, also an element (e.g. a `span` element) can be used.
     */
    zoomInLabel?: string | HTMLElement | undefined;
    /**
     * Text label to use for the zoom-out button.
     * Instead of text, also an element (e.g. a `span` element) can be used.
     */
    zoomOutLabel?: string | HTMLElement | undefined;
    /**
     * Text label to use for the button tip.
     */
    zoomInTipLabel?: string | undefined;
    /**
     * Text label to use for the button tip.
     */
    zoomOutTipLabel?: string | undefined;
    /**
     * The zoom delta applied on each click.
     */
    delta?: number | undefined;
    /**
     * Specify a target if you want the control to be
     * rendered outside of the map's viewport.
     */
    target?: string | HTMLElement | undefined;
};
/**
 * @typedef {Object} Options
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {string} [className='ol-zoom'] CSS class name.
 * @property {string} [zoomInClassName=className + '-in'] CSS class name for the zoom-in button.
 * @property {string} [zoomOutClassName=className + '-out'] CSS class name for the zoom-out button.
 * @property {string|HTMLElement} [zoomInLabel='+'] Text label to use for the zoom-in
 * button. Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string|HTMLElement} [zoomOutLabel='–'] Text label to use for the zoom-out button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [zoomInTipLabel='Zoom in'] Text label to use for the button tip.
 * @property {string} [zoomOutTipLabel='Zoom out'] Text label to use for the button tip.
 * @property {number} [delta=1] The zoom delta applied on each click.
 * @property {HTMLElement|string} [target] Specify a target if you want the control to be
 * rendered outside of the map's viewport.
 */
/**
 * @classdesc
 * A control with 2 buttons, one for zoom in and one for zoom out.
 * This control is one of the default controls of a map. To style this control
 * use css selectors `.ol-zoom-in` and `.ol-zoom-out`.
 *
 * @api
 */
declare class Zoom extends Control {
    /**
     * @param {Options} [opt_options] Zoom options.
     */
    constructor(opt_options?: Options | undefined);
    /**
     * @type {number}
     * @private
     */
    private duration_;
    /**
     * @param {number} delta Zoom delta.
     * @param {MouseEvent} event The event to handle
     * @private
     */
    private handleClick_;
    /**
     * @param {number} delta Zoom delta.
     * @private
     */
    private zoomByDelta_;
}
import Control from "./Control.js";
//# sourceMappingURL=Zoom.d.ts.map