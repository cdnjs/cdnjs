export default Overlay;
export type Options = {
    /**
     * Set the overlay id. The overlay id can be used
     * with the {@link module:ol/Map~Map#getOverlayById} method.
     */
    id?: string | number;
    /**
     * The overlay element.
     */
    element?: HTMLElement;
    /**
     * Offsets in pixels used when positioning
     * the overlay. The first element in the
     * array is the horizontal offset. A positive value shifts the overlay right.
     * The second element in the array is the vertical offset. A positive value
     * shifts the overlay down.
     */
    offset?: number[];
    /**
     * The overlay position
     * in map projection.
     */
    position?: number[];
    /**
     * Defines how
     * the overlay is actually positioned with respect to its `position` property.
     * Possible values are `'bottom-left'`, `'bottom-center'`, `'bottom-right'`,
     * `'center-left'`, `'center-center'`, `'center-right'`, `'top-left'`,
     * `'top-center'`, and `'top-right'`.
     */
    positioning?: any;
    /**
     * Whether event propagation to the map
     * viewport should be stopped. If `true` the overlay is placed in the same
     * container as that of the controls (CSS class name
     * `ol-overlaycontainer-stopevent`); if `false` it is placed in the container
     * with CSS class name specified by the `className` property.
     */
    stopEvent?: boolean;
    /**
     * Whether the overlay is inserted first
     * in the overlay container, or appended. If the overlay is placed in the same
     * container as that of the controls (see the `stopEvent` option) you will
     * probably set `insertFirst` to `true` so the overlay is displayed below the
     * controls.
     */
    insertFirst?: boolean;
    /**
     * Pan the map when calling
     * `setPosition`, so that the overlay is entirely visible in the current viewport?
     * If `true` (deprecated), then `autoPanAnimation` and `autoPanMargin` will be
     * used to determine the panning parameters; if an object is supplied then other
     * parameters are ignored.
     */
    autoPan?: boolean | PanIntoViewOptions;
    /**
     * The animation options used to pan
     * the overlay into view. This animation is only used when `autoPan` is enabled.
     * A `duration` and `easing` may be provided to customize the animation.
     * Deprecated and ignored if `autoPan` is supplied as an object.
     */
    autoPanAnimation?: PanOptions;
    /**
     * The margin (in pixels) between the
     * overlay and the borders of the map when autopanning. Deprecated and ignored
     * if `autoPan` is supplied as an object.
     */
    autoPanMargin?: number;
    /**
     * The options to use for the
     * autoPan. This is only used when `autoPan` is enabled and has preference over
     * the individual `autoPanMargin` and `autoPanOptions`.
     */
    autoPanOptions?: PanIntoViewOptions;
    /**
     * CSS class
     * name.
     */
    className?: string;
};
export type PanOptions = {
    /**
     * The duration of the animation in
     * milliseconds.
     */
    duration?: number;
    /**
     * The easing function to use. Can
     * be one from {@link module:ol/easing} or a custom function.
     * Default is {@link module:ol/easing.inAndOut}.
     */
    easing?: (arg0: number) => number;
};
export type PanIntoViewOptions = {
    /**
     * The animation parameters for the pan
     */
    animation?: PanOptions;
    /**
     * The margin (in pixels) between the
     * overlay and the borders of the map when panning into view.
     */
    margin?: number;
};
export type Property = string;
export type OverlayObjectEventTypes = "propertychange" | "change:element" | "change:map" | "change:offset" | "change:position" | "change:positioning";
/**
 * *
 */
export type OverlayOnSignature<Return> = ((type: "error" | "change", listener: (event: import("./events/Event.js").default) => any) => Return) & ((type: "propertychange" | "change:element" | "change:map" | "change:offset" | "change:position" | "change:positioning", listener: (event: import("./Object.js").ObjectEvent) => any) => Return) & ((type: ("error" | "change" | "propertychange" | "change:element" | "change:map" | "change:offset" | "change:position" | "change:positioning")[], listener: (event: Event | import("./events/Event.js").default) => any) => Return extends void | null ? void : Return[]);
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
 *     var popup = new Overlay({
 *       element: document.getElementById('popup')
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
     * @type {PanIntoViewOptions|false}
     */
    protected autoPan: PanIntoViewOptions | false;
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
    getId(): string | number | undefined;
    /**
     * Get the map associated with this overlay.
     * @return {import("./PluggableMap.js").default|undefined} The map that the
     * overlay is part of.
     * @observable
     * @api
     */
    getMap(): import("./PluggableMap.js").default | undefined;
    /**
     * Get the offset of this overlay.
     * @return {Array<number>} The offset.
     * @observable
     * @api
     */
    getOffset(): number[];
    /**
     * Get the current position of this overlay.
     * @return {import("./coordinate.js").Coordinate|undefined} The spatial point that the overlay is
     *     anchored at.
     * @observable
     * @api
     */
    getPosition(): number[] | undefined;
    /**
     * Get the current positioning of this overlay.
     * @return {import("./OverlayPositioning.js").default} How the overlay is positioned
     *     relative to its point on the map.
     * @observable
     * @api
     */
    getPositioning(): any;
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
     * @param {import("./PluggableMap.js").default|undefined} map The map that the
     * overlay is part of.
     * @observable
     * @api
     */
    setMap(map: import("./PluggableMap.js").default | undefined): void;
    /**
     * Set the offset for this overlay.
     * @param {Array<number>} offset Offset.
     * @observable
     * @api
     */
    setOffset(offset: number[]): void;
    /**
     * Set the position for this overlay. If the position is `undefined` the
     * overlay is hidden.
     * @param {import("./coordinate.js").Coordinate|undefined} position The spatial point that the overlay
     *     is anchored at.
     * @observable
     * @api
     */
    setPosition(position: number[] | undefined): void;
    /**
     * Pan the map so that the overlay is entirely visible in the current viewport
     * (if necessary) using the configured autoPan parameters
     * @protected
     */
    protected performAutoPan(): void;
    /**
     * Pan the map so that the overlay is entirely visible in the current viewport
     * (if necessary).
     * @param {PanIntoViewOptions} [opt_panIntoViewOptions] Options for the pan action
     * @api
     */
    panIntoView(opt_panIntoViewOptions?: PanIntoViewOptions | undefined): void;
    /**
     * Get the extent of an element relative to the document
     * @param {HTMLElement} element The element.
     * @param {import("./size.js").Size} size The size of the element.
     * @return {import("./extent.js").Extent} The extent.
     * @protected
     */
    protected getRect(element: HTMLElement, size: number[]): number[];
    /**
     * Set the positioning for this overlay.
     * @param {import("./OverlayPositioning.js").default} positioning how the overlay is
     *     positioned relative to its point on the map.
     * @observable
     * @api
     */
    setPositioning(positioning: any): void;
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
    protected updateRenderedPosition(pixel: number[], mapSize: number[] | undefined): void;
    /**
     * returns the options this Overlay has been created with
     * @return {Options} overlay options
     */
    getOptions(): Options;
}
import BaseObject from "./Object.js";
//# sourceMappingURL=Overlay.d.ts.map