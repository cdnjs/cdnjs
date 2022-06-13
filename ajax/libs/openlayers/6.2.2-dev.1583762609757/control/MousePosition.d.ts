/**
 * Update the projection. Rendering of the coordinates is done in
 * `handleMouseMove` and `handleMouseUp`.
 * @param {import("../MapEvent.js").default} mapEvent Map event.
 * @this {MousePosition}
 */
export function render(mapEvent: import("../MapEvent.js").default): void;
export class render {
    /**
     * Update the projection. Rendering of the coordinates is done in
     * `handleMouseMove` and `handleMouseUp`.
     * @param {import("../MapEvent.js").default} mapEvent Map event.
     * @this {MousePosition}
     */
    constructor(mapEvent: import("../MapEvent.js").default);
    mapProjection_: import("../proj/Projection.js").default;
    transform_: any;
}
export default MousePosition;
export type Options = {
    /**
     * CSS class name.
     */
    className?: string;
    /**
     * Coordinate format.
     */
    coordinateFormat?: (arg0: number[]) => string;
    /**
     * Projection. Default is the view projection.
     */
    projection?: string | import("../proj/Projection.js").default;
    /**
     * Function called when the
     * control should be re-rendered. This is called in a `requestAnimationFrame`
     * callback.
     */
    render?: (arg0: import("../MapEvent.js").default) => any;
    /**
     * Specify a target if you want the
     * control to be rendered outside of the map's viewport.
     */
    target?: string | HTMLElement;
    /**
     * Markup to show when coordinates are not
     * available (e.g. when the pointer leaves the map viewport).  By default, the last position
     * will be replaced with `'&#160;'` (`&nbsp;`) when the pointer leaves the viewport.  To
     * retain the last rendered position, set this option to something falsey (like an empty
     * string `''`).
     */
    undefinedHTML?: string;
};
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-mouse-position'] CSS class name.
 * @property {import("../coordinate.js").CoordinateFormat} [coordinateFormat] Coordinate format.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {function(import("../MapEvent.js").default)} [render] Function called when the
 * control should be re-rendered. This is called in a `requestAnimationFrame`
 * callback.
 * @property {HTMLElement|string} [target] Specify a target if you want the
 * control to be rendered outside of the map's viewport.
 * @property {string} [undefinedHTML='&#160;'] Markup to show when coordinates are not
 * available (e.g. when the pointer leaves the map viewport).  By default, the last position
 * will be replaced with `'&#160;'` (`&nbsp;`) when the pointer leaves the viewport.  To
 * retain the last rendered position, set this option to something falsey (like an empty
 * string `''`).
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
 * @api
 */
declare class MousePosition extends Control {
    /**
     * @param {Options=} opt_options Mouse position options.
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
    getCoordinateFormat(): (arg0: number[]) => string;
    /**
     * Return the projection that is used to report the mouse position.
     * @return {import("../proj/Projection.js").default|undefined} The projection to report mouse
     *     position in.
     * @observable
     * @api
     */
    getProjection(): import("../proj/Projection.js").default;
    /**
     * @param {Event} event Browser event.
     * @protected
     */
    protected handleMouseMove(event: Event): void;
    /**
     * @param {Event} event Browser event.
     * @protected
     */
    protected handleMouseOut(event: Event): void;
    /**
     * @inheritDoc
     * @api
     */
    setMap(map: any): void;
    /**
     * Set the coordinate format type used to render the current position.
     * @param {import("../coordinate.js").CoordinateFormat} format The format to render the current
     *     position in.
     * @observable
     * @api
     */
    setCoordinateFormat(format: (arg0: number[]) => string): void;
    /**
     * Set the projection that is used to report the mouse position.
     * @param {import("../proj.js").ProjectionLike} projection The projection to report mouse
     *     position in.
     * @observable
     * @api
     */
    setProjection(projection: string | import("../proj/Projection.js").default): void;
    /**
     * @param {?import("../pixel.js").Pixel} pixel Pixel.
     * @private
     */
    private updateHTML_;
}
import Control from "./Control.js";
//# sourceMappingURL=MousePosition.d.ts.map