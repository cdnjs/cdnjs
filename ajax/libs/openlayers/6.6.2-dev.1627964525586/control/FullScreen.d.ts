export default FullScreen;
export type FullScreenEventType = string;
/**
 * *
 */
export type FullScreenOnSignature<Return> = ((type: "error" | "change" | "enterfullscreen" | "leavefullscreen" | ("error" | "change" | "enterfullscreen" | "leavefullscreen")[], listener: (event: import("../events/Event.js").default) => any) => Return) & ((type: "propertychange" | "propertychange"[], listener: (event: import("../Object.js").ObjectEvent) => any) => Return) & ((type: ("error" | "change" | "propertychange" | "enterfullscreen" | "leavefullscreen")[], listener: (event: Event | import("../events/Event.js").default) => any) => Return);
export type Options = {
    /**
     * CSS class name.
     */
    className?: string;
    /**
     * Text label to use for the button.
     * Instead of text, also an element (e.g. a `span` element) can be used.
     */
    label?: string | Text;
    /**
     * Text label to use for the
     * button when full-screen is active.
     */
    labelActive?: string | Text;
    /**
     * CSS class name for the button
     * when full-screen is active.
     */
    activeClassName?: string;
    /**
     * CSS class name for the button
     * when full-screen is inactive.
     * Instead of text, also an element (e.g. a `span` element) can be used.
     */
    inactiveClassName?: string;
    /**
     * Text label to use for the button tip.
     */
    tipLabel?: string;
    /**
     * Full keyboard access.
     */
    keys?: boolean;
    /**
     * Specify a target if you want the
     * control to be rendered outside of the map's viewport.
     */
    target?: string | HTMLElement;
    /**
     * The element to be displayed
     * fullscreen. When not provided, the element containing the map viewport will
     * be displayed fullscreen.
     */
    source?: string | HTMLElement;
};
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes|
 *     'enterfullscreen'|'leavefullscreen', import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|
 *     'enterfullscreen'|'leavefullscreen'|import("../ObjectEventType").Types, Return>} FullScreenOnSignature
 */
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-full-screen'] CSS class name.
 * @property {string|Text} [label='\u2922'] Text label to use for the button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string|Text} [labelActive='\u00d7'] Text label to use for the
 * button when full-screen is active.
 * @property {string} [activeClassName=className + '-true'] CSS class name for the button
 * when full-screen is active.
 * @property {string} [inactiveClassName=className + '-false'] CSS class name for the button
 * when full-screen is inactive.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [tipLabel='Toggle full-screen'] Text label to use for the button tip.
 * @property {boolean} [keys=false] Full keyboard access.
 * @property {HTMLElement|string} [target] Specify a target if you want the
 * control to be rendered outside of the map's viewport.
 * @property {HTMLElement|string} [source] The element to be displayed
 * fullscreen. When not provided, the element containing the map viewport will
 * be displayed fullscreen.
 */
/**
 * @classdesc
 * Provides a button that when clicked fills up the full screen with the map.
 * The full screen source element is by default the element containing the map viewport unless
 * overridden by providing the `source` option. In which case, the dom
 * element introduced using this parameter will be displayed in full screen.
 *
 * When in full screen mode, a close button is shown to exit full screen mode.
 * The [Fullscreen API](https://www.w3.org/TR/fullscreen/) is used to
 * toggle the map in full screen mode.
 *
 * @fires FullScreenEventType#enterfullscreen
 * @fires FullScreenEventType#leavefullscreen
 * @api
 */
declare class FullScreen extends Control {
    /**
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options);
    /***
     * @type {FullScreenOnSignature<import("../Observable.js").OnReturn>}
     */
    on: FullScreenOnSignature<import("../Observable.js").OnReturn>;
    /***
     * @type {FullScreenOnSignature<import("../Observable.js").OnReturn>}
     */
    once: FullScreenOnSignature<import("../Observable.js").OnReturn>;
    /***
     * @type {FullScreenOnSignature<void>}
     */
    un: FullScreenOnSignature<void>;
    /**
     * @private
     * @type {string}
     */
    private cssClassName_;
    /**
     * @private
     * @type {Array<string>}
     */
    private activeClassName_;
    /**
     * @private
     * @type {Array<string>}
     */
    private inactiveClassName_;
    /**
     * @private
     * @type {Text}
     */
    private labelNode_;
    /**
     * @private
     * @type {Text}
     */
    private labelActiveNode_;
    /**
     * @private
     * @type {HTMLElement}
     */
    private button_;
    /**
     * @private
     * @type {boolean}
     */
    private keys_;
    /**
     * @private
     * @type {HTMLElement|string|undefined}
     */
    private source_;
    /**
     * @param {MouseEvent} event The event to handle
     * @private
     */
    private handleClick_;
    /**
     * @private
     */
    private handleFullScreen_;
    /**
     * @private
     */
    private handleFullScreenChange_;
    /**
     * @param {HTMLElement} element Target element
     * @param {boolean} fullscreen True if fullscreen class name should be active
     * @private
     */
    private setClassName_;
}
import Control from "./Control.js";
//# sourceMappingURL=FullScreen.d.ts.map