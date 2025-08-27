export default MousePosition;
/**
 * *
 */
export type MousePositionOnSignature<Return> = import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> & import("../Observable").OnSignature<import("../ObjectEventType").Types | "change:coordinateFormat" | "change:projection", import("../Object").ObjectEvent, Return> & import("../Observable").CombinedOnSignature<import("../Observable").EventTypes | import("../ObjectEventType").Types | "change:coordinateFormat" | "change:projection", Return>;
export type Options = {
    /**
     * CSS class name.
     */
    className?: string | undefined;
    /**
     * Coordinate format.
     */
    coordinateFormat?: import("../coordinate.js").CoordinateFormat | undefined;
    /**
     * Projection. Default is the view projection.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * Function called when the
     * control should be re-rendered. This is called in a `requestAnimationFrame`
     * callback.
     */
    render?: ((arg0: import("../MapEvent.js").default) => void) | undefined;
    /**
     * Specify a target if you want the
     * control to be rendered outside of the map's viewport.
     */
    target?: string | HTMLElement | undefined;
    /**
     * Markup to show when the mouse position is not
     * available (e.g. when the pointer leaves the map viewport).  By default, a non-breaking space is rendered
     * initially and the last position is retained when the mouse leaves the viewport.
     * When a string is provided (e.g. `'no position'` or `''` for an empty string) it is used as a
     * placeholder.
     */
    placeholder?: string | undefined;
    /**
     * Wrap the world horizontally on the projection's antimeridian, if it
     * is a global projection.
     */
    wrapX?: boolean | undefined;
};
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:coordinateFormat'|'change:projection', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     'change:coordinateFormat'|'change:projection', Return>} MousePositionOnSignature
 */
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
 * @property {string} [placeholder] Markup to show when the mouse position is not
 * available (e.g. when the pointer leaves the map viewport).  By default, a non-breaking space is rendered
 * initially and the last position is retained when the mouse leaves the viewport.
 * When a string is provided (e.g. `'no position'` or `''` for an empty string) it is used as a
 * placeholder.
 * @property {boolean} [wrapX=true] Wrap the world horizontally on the projection's antimeridian, if it
 * is a global projection.
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
     * @param {Options} [options] Mouse position options.
     */
    constructor(options?: Options);
    /***
     * @type {MousePositionOnSignature<import("../events").EventsKey>}
     */
    on: MousePositionOnSignature<import("../events").EventsKey>;
    /***
     * @type {MousePositionOnSignature<import("../events").EventsKey>}
     */
    once: MousePositionOnSignature<import("../events").EventsKey>;
    /***
     * @type {MousePositionOnSignature<void>}
     */
    un: MousePositionOnSignature<void>;
    /**
     * @private
     * @type {boolean}
     */
    private renderOnMouseOut_;
    /**
     * @private
     * @type {string}
     */
    private placeholder_;
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
     * @type {boolean}
     */
    private wrapX_;
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
import Control from './Control.js';
//# sourceMappingURL=MousePosition.d.ts.map