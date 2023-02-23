export default Rotate;
export type Options = {
    /**
     * CSS class name.
     */
    className?: string | undefined;
    /**
     * Text label to use for the rotate button.
     * Instead of text, also an element (e.g. a `span` element) can be used.
     */
    label?: string | HTMLElement | undefined;
    /**
     * Text label to use for the rotate tip.
     */
    tipLabel?: string | undefined;
    /**
     * CSS class name for the compass.
     */
    compassClassName?: string | undefined;
    /**
     * Animation duration in milliseconds.
     */
    duration?: number | undefined;
    /**
     * Hide the control when rotation is 0.
     */
    autoHide?: boolean | undefined;
    /**
     * Function called when the control should
     * be re-rendered. This is called in a `requestAnimationFrame` callback.
     */
    render?: ((arg0: import("../MapEvent.js").default) => void) | undefined;
    /**
     * Function called when the control is clicked.
     * This will override the default `resetNorth`.
     */
    resetNorth?: (() => void) | undefined;
    /**
     * Specify a target if you want the control to be
     * rendered outside of the map's viewport.
     */
    target?: string | HTMLElement | undefined;
};
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-rotate'] CSS class name.
 * @property {string|HTMLElement} [label='⇧'] Text label to use for the rotate button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [tipLabel='Reset rotation'] Text label to use for the rotate tip.
 * @property {string} [compassClassName='ol-compass'] CSS class name for the compass.
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {boolean} [autoHide=true] Hide the control when rotation is 0.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when the control should
 * be re-rendered. This is called in a `requestAnimationFrame` callback.
 * @property {function():void} [resetNorth] Function called when the control is clicked.
 * This will override the default `resetNorth`.
 * @property {HTMLElement|string} [target] Specify a target if you want the control to be
 * rendered outside of the map's viewport.
 */
/**
 * @classdesc
 * A button control to reset rotation to 0.
 * To style this control use css selector `.ol-rotate`. A `.ol-hidden` css
 * selector is added to the button when the rotation is 0.
 *
 * @api
 */
declare class Rotate extends Control {
    /**
     * @param {Options} [options] Rotate options.
     */
    constructor(options?: Options | undefined);
    /**
     * @type {HTMLElement}
     * @private
     */
    private label_;
    callResetNorth_: (() => void) | undefined;
    /**
     * @type {number}
     * @private
     */
    private duration_;
    /**
     * @type {boolean}
     * @private
     */
    private autoHide_;
    /**
     * @private
     * @type {number|undefined}
     */
    private rotation_;
    /**
     * @param {MouseEvent} event The event to handle
     * @private
     */
    private handleClick_;
    /**
     * @private
     */
    private resetNorth_;
}
import Control from "./Control.js";
//# sourceMappingURL=Rotate.d.ts.map