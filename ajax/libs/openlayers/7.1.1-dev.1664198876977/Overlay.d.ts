export default Overlay;
/**
 * The overlay position: `'bottom-left'`, `'bottom-center'`,  `'bottom-right'`,
 * `'center-left'`, `'center-center'`, `'center-right'`, `'top-left'`,
 * `'top-center'`, or `'top-right'`.
 */
export type Positioning = 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center-left' | 'center-center' | 'center-right' | 'top-left' | 'top-center' | 'top-right';
export type Options = {
    /**
     * Set the overlay id. The overlay id can be used
     * with the {@link module :ol/Map~Map#getOverlayById} method.
     */
    id?: string | number | undefined;
    /**
     * The overlay element.
     */
    element?: HTMLElement | undefined;
    /**
     * Offsets in pixels used when positioning
     * the overlay. The first element in the
     * array is the horizontal offset. A positive value shifts the overlay right.
     * The second element in the array is the vertical offset. A positive value
     * shifts the overlay down.
     */
    offset?: number[] | undefined;
    /**
     * The overlay position
     * in map projection.
     */
    position?: import("./coordinate.js").Coordinate | undefined;
    /**
     * Defines how
     * the overlay is actually positioned with respect to its `position` property.
     * Possible values are `'bottom-left'`, `'bottom-center'`, `'bottom-right'`,
     * `'center-left'`, `'center-center'`, `'center-right'`, `'top-left'`,
     * `'top-center'`, and `'top-right'`.
     */
    positioning?: Positioning | undefined;
    /**
     * Whether event propagation to the map
     * viewport should be stopped. If `true` the overlay is placed in the same
     * container as that of the controls (CSS class name
     * `ol-overlaycontainer-stopevent`); if `false` it is placed in the container
     * with CSS class name specified by the `className` property.
     */
    stopEvent?: boolean | undefined;
    /**
     * Whether the overlay is inserted first
     * in the overlay container, or appended. If the overlay is placed in the same
     * container as that of the controls (see the `stopEvent` option) you will
     * probably set `insertFirst` to `true` so the overlay is displayed below the
     * controls.
     */
    insertFirst?: boolean | undefined;
    /**
     * Pan the map when calling
     * `setPosition`, so that the overlay is entirely visible in the current viewport.
     */
    autoPan?: boolean | PanIntoViewOptions | undefined;
    /**
     * CSS class
     * name.
     */
    className?: string | undefined;
};
export type PanOptions = {
    /**
     * The duration of the animation in
     * milliseconds.
     */
    duration?: number | undefined;
    /**
     * The easing function to use. Can
     * be one from {@link module :ol/easing} or a custom function.
     * Default is {@link module :ol/easing.inAndOut}.
     */
    easing?: ((arg0: number) => number) | undefined;
};
export type PanIntoViewOptions = {
    /**
     * The animation parameters for the pan
     */
    animation?: PanOptions | undefined;
    /**
     * The margin (in pixels) between the
     * overlay and the borders of the map when panning into view.
     */
    margin?: number | undefined;
};
export type OverlayObjectEventTypes = import("./ObjectEventType").Types | 'change:element' | 'change:map' | 'change:offset' | 'change:position' | 'change:positioning';
/**
 * *
 */
export type OverlayOnSignature<Return> = import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> & import("./Observable").OnSignature<OverlayObjectEventTypes, import("./Object").ObjectEvent, Return> & import("./Observable").CombinedOnSignature<import("./Observable").EventTypes | OverlayObjectEventTypes, Return>;
/**
 * @typedef {import("./ObjectEventType").Types|'change:element'|'change:map'|'change:offset'|'change:position'|
 *   'change:positioning'} OverlayObjectEventTypes
 */
/***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *   import("./Observable").OnSignature<OverlayObjectEventTypes, import("./Object").ObjectEvent, Return> &
 *   import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|OverlayObjectEventTypes, Return>} OverlayOnSignature
 */
/**
 * @classdesc
 * An element to be displayed over the map and attached to a single map
 * location.  Like {@link module:ol/control/Control~Control}, Overlays are
 * visible widgets. Unlike Controls, they are not in a fixed position on the
 * screen, but are tied to a geographical coordinate, so panning the map will
 * move an Overlay but not a Control.
 *
 * Example:
 *
 *     import Overlay from 'ol/Overlay';
 *
 *     // ...
 *     const popup = new Overlay({
 *       element: document.getElementById('popup'),
 *     });
 *     popup.setPosition(coordinate);
 *     map.addOverlay(popup);
 *
 * @api
 */
declare class Overlay extends BaseObject {
    /**
     * @param {Options} options Overlay options.
     */
    constructor(options: Options);
    /***
     * @type {OverlayOnSignature<import("./events").EventsKey>}
     */
    on: OverlayOnSignature<import("./events").EventsKey>;
    /***
     * @type {OverlayOnSignature<import("./events").EventsKey>}
     */
    once: OverlayOnSignature<import("./events").EventsKey>;
    /***
     * @type {OverlayOnSignature<void>}
     */
    un: OverlayOnSignature<void>;
    /**
     * @protected
     * @type {Options}
     */
    protected options: Options;
    /**
     * @protected
     * @type {number|string|undefined}
     */
    protected id: number | string | undefined;
    /**
     * @protected
     * @type {boolean}
     */
    protected insertFirst: boolean;
    /**
     * @protected
     * @type {boolean}
     */
    protected stopEvent: boolean;
    /**
     * @protected
     * @type {HTMLElement}
     */
    protected element: HTMLElement;
    /**
     * @protected
     * @type {PanIntoViewOptions|undefined}
     */
    protected autoPan: PanIntoViewOptions | undefined;
    /**
     * @protected
     * @type {{transform_: string,
     *         visible: boolean}}
     */
    protected rendered: {
        transform_: string;
        visible: boolean;
    };
    /**
     * @protected
     * @type {?import("./events.js").EventsKey}
     */
    protected mapPostrenderListenerKey: import("./events.js").EventsKey | null;
    /**
     * Get the DOM element of this overlay.
     * @return {HTMLElement|undefined} The Element containing the overlay.
     * @observable
     * @api
     */
    getElement(): HTMLElement | undefined;
    /**
     * Get the overlay identifier which is set on constructor.
     * @return {number|string|undefined} Id.
     * @api
     */
    getId(): number | string | undefined;
    /**
     * Get the map associated with this overlay.
     * @return {import("./Map.js").default|null} The map that the
     * overlay is part of.
     * @observable
     * @api
     */
    getMap(): import("./Map.js").default | null;
    /**
     * Get the offset of this overlay.
     * @return {Array<number>} The offset.
     * @observable
     * @api
     */
    getOffset(): Array<number>;
    /**
     * Get the current position of this overlay.
     * @return {import("./coordinate.js").Coordinate|undefined} The spatial point that the overlay is
     *     anchored at.
     * @observable
     * @api
     */
    getPosition(): import("./coordinate.js").Coordinate | undefined;
    /**
     * Get the current positioning of this overlay.
     * @return {Positioning} How the overlay is positioned
     *     relative to its point on the map.
     * @observable
     * @api
     */
    getPositioning(): Positioning;
    /**
     * @protected
     */
    protected handleElementChanged(): void;
    /**
     * @protected
     */
    protected handleMapChanged(): void;
    /**
     * @protected
     */
    protected render(): void;
    /**
     * @protected
     */
    protected handleOffsetChanged(): void;
    /**
     * @protected
     */
    protected handlePositionChanged(): void;
    /**
     * @protected
     */
    protected handlePositioningChanged(): void;
    /**
     * Set the DOM element to be associated with this overlay.
     * @param {HTMLElement|undefined} element The Element containing the overlay.
     * @observable
     * @api
     */
    setElement(element: HTMLElement | undefined): void;
    /**
     * Set the map to be associated with this overlay.
     * @param {import("./Map.js").default|null} map The map that the
     * overlay is part of. Pass `null` to just remove the overlay from the current map.
     * @observable
     * @api
     */
    setMap(map: import("./Map.js").default | null): void;
    /**
     * Set the offset for this overlay.
     * @param {Array<number>} offset Offset.
     * @observable
     * @api
     */
    setOffset(offset: Array<number>): void;
    /**
     * Set the position for this overlay. If the position is `undefined` the
     * overlay is hidden.
     * @param {import("./coordinate.js").Coordinate|undefined} position The spatial point that the overlay
     *     is anchored at.
     * @observable
     * @api
     */
    setPosition(position: import("./coordinate.js").Coordinate | undefined): void;
    /**
     * Pan the map so that the overlay is entirely visible in the current viewport
     * (if necessary) using the configured autoPan parameters
     * @protected
     */
    protected performAutoPan(): void;
    /**
     * Pan the map so that the overlay is entirely visible in the current viewport
     * (if necessary).
     * @param {PanIntoViewOptions} [panIntoViewOptions] Options for the pan action
     * @api
     */
    panIntoView(panIntoViewOptions?: PanIntoViewOptions | undefined): void;
    /**
     * Get the extent of an element relative to the document
     * @param {HTMLElement} element The element.
     * @param {import("./size.js").Size} size The size of the element.
     * @return {import("./extent.js").Extent} The extent.
     * @protected
     */
    protected getRect(element: HTMLElement, size: import("./size.js").Size): import("./extent.js").Extent;
    /**
     * Set the positioning for this overlay.
     * @param {Positioning} positioning how the overlay is
     *     positioned relative to its point on the map.
     * @observable
     * @api
     */
    setPositioning(positioning: Positioning): void;
    /**
     * Modify the visibility of the element.
     * @param {boolean} visible Element visibility.
     * @protected
     */
    protected setVisible(visible: boolean): void;
    /**
     * Update pixel position.
     * @protected
     */
    protected updatePixelPosition(): void;
    /**
     * @param {import("./pixel.js").Pixel} pixel The pixel location.
     * @param {import("./size.js").Size|undefined} mapSize The map size.
     * @protected
     */
    protected updateRenderedPosition(pixel: import("./pixel.js").Pixel, mapSize: import("./size.js").Size | undefined): void;
    /**
     * returns the options this Overlay has been created with
     * @return {Options} overlay options
     */
    getOptions(): Options;
}
import BaseObject from "./Object.js";
//# sourceMappingURL=Overlay.d.ts.map