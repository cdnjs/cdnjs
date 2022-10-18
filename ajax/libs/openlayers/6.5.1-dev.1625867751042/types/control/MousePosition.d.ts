export default MousePosition;
export type Options = {
    /**
     * CSS class name.
     */
    className?: string;
    /**
     * Coordinate format.
     */
    coordinateFormat?: import("../coordinate.js").CoordinateFormat;
    /**
     * Projection. Default is the view projection.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * Function called when the
     * control should be re-rendered. This is called in a `requestAnimationFrame`
     * callback.
     */
    render?: (arg0: import("../MapEvent.js").default) => void;
    /**
     * Specify a target if you want the
     * control to be rendered outside of the map's viewport.
     */
    target?: HTMLElement | string;
    /**
     * Markup to show when coordinates are not
     * available (e.g. when the pointer leaves the map viewport).  By default, the last position
     * will be replaced with `'&#160;'` (`&nbsp;`) when the pointer leaves the viewport.  To
     * retain the last rendered position, set this option to something falsey. An exception is an
     * empty string `''`. It does not count as falsey in this case.
     */
    undefinedHTML?: string;
};
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-mouse-position'] CSS class name.
 * @property {import("../coordinate.js").CoordinateFormat} [coordinateFormat] Coordinate format.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when the
 * control should be re-rendered. This is called in a `requestAnimationFrame`
 * callback.
 * @property {HTMLElement|string} [target] Specify a target if you want the
 * control to be rendered outside of the map's viewport.
 * @property {string} [undefinedHTML='&#160;'] Markup to show when coordinates are not
 * available (e.g. when the pointer leaves the map viewport).  By default, the last position
 * will be replaced with `'&#160;'` (`&nbsp;`) when the pointer leaves the viewport.  To
 * retain the last rendered position, set this option to something falsey. An exception is an
 * empty string `''`. It does not count as falsey in this case.
 */
/**
 * @classdesc
 * A control to show the 2D coordinates of the mouse cursor. By default, these
 * are in the view projection, but can be in any supported projection.
 * By default the control is shown in the top right corner of the map, but this
 * can be changed by using the css selector `.ol-mouse-position`.
 *
 * On touch devices, which usually do not have a mouse cursor, the coordinates
 * of the currently touched position are shown.
 *
 * @extends Control<'change:coordinaetFormat'|'change:projection'>
 * @api
 */
declare class MousePosition extends Control<"change:projection" | "change:coordinaetFormat"> {
    /**
     * @param {Options} [opt_options] Mouse position options.
     */
    constructor(opt_options?: Options);
    /**
     * @private
     * @type {string}
     */
    private undefinedHTML_;
    /**
     * @private
     * @type {boolean}
     */
    private renderOnMouseOut_;
    /**
     * @private
     * @type {string}
     */
    private renderedHTML_;
    /**
     * @private
     * @type {?import("../proj/Projection.js").default}
     */
    private mapProjection_;
    /**
     * @private
     * @type {?import("../proj.js").TransformFunction}
     */
    private transform_;
    /**
     * @private
     */
    private handleProjectionChanged_;
    /**
     * Return the coordinate format type used to render the current position or
     * undefined.
     * @return {import("../coordinate.js").CoordinateFormat|undefined} The format to render the current
     *     position in.
     * @observable
     * @api
     */
    getCoordinateFormat(): import("../coordinate.js").CoordinateFormat | undefined;
    /**
     * Return the projection that is used to report the mouse position.
     * @return {import("../proj/Projection.js").default|undefined} The projection to report mouse
     *     position in.
     * @observable
     * @api
     */
    getProjection(): import("../proj/Projection.js").default | undefined;
    /**
     * @param {MouseEvent} event Browser event.
     * @protected
     */
    protected handleMouseMove(event: MouseEvent): void;
    /**
     * @param {Event} event Browser event.
     * @protected
     */
    protected handleMouseOut(event: Event): void;
    /**
     * Set the coordinate format type used to render the current position.
     * @param {import("../coordinate.js").CoordinateFormat} format The format to render the current
     *     position in.
     * @observable
     * @api
     */
    setCoordinateFormat(format: import("../coordinate.js").CoordinateFormat): void;
    /**
     * Set the projection that is used to report the mouse position.
     * @param {import("../proj.js").ProjectionLike} projection The projection to report mouse
     *     position in.
     * @observable
     * @api
     */
    setProjection(projection: import("../proj.js").ProjectionLike): void;
    /**
     * @param {?import("../pixel.js").Pixel} pixel Pixel.
     * @private
     */
    private updateHTML_;
}
import Control from "./Control.js";
//# sourceMappingURL=MousePosition.d.ts.map