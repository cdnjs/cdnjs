export default Geolocation;
export type Property = string;
export type Options = {
    /**
     * Start Tracking right after
     * instantiation.
     */
    tracking?: boolean;
    /**
     * Tracking options.
     * See https://www.w3.org/TR/geolocation-API/#position_options_interface.
     */
    trackingOptions?: PositionOptions;
    /**
     * The projection the position
     * is reported in.
     */
    projection?: string | import("./proj/Projection.js").default | undefined;
};
export type GeolocationObjectEventTypes = "propertychange" | "change:position" | "change:accuracy" | "change:accuracyGeometry" | "change:altitude" | "change:altitudeAccuracy" | "change:heading" | "change:projection" | "change:speed" | "change:tracking" | "change:trackingOptions";
/**
 * *
 */
export type GeolocationOnSignature<Return> = ((type: "change" | "error", listener: (event: BaseEvent) => any) => Return) & ((type: "propertychange" | "change:position" | "change:accuracy" | "change:accuracyGeometry" | "change:altitude" | "change:altitudeAccuracy" | "change:heading" | "change:projection" | "change:speed" | "change:tracking" | "change:trackingOptions", listener: (event: import("./Object.js").ObjectEvent) => any) => Return) & ((type: "error", listener: (event: GeolocationError) => any) => Return) & ((type: ("propertychange" | "change" | "error" | "change:position" | "change:accuracy" | "change:accuracyGeometry" | "change:altitude" | "change:altitudeAccuracy" | "change:heading" | "change:projection" | "change:speed" | "change:tracking" | "change:trackingOptions")[], listener: (event: BaseEvent | Event) => any) => Return extends void | null ? void : Return[]);
/**
 * @typedef {Object} Options
 * @property {boolean} [tracking=false] Start Tracking right after
 * instantiation.
 * @property {PositionOptions} [trackingOptions] Tracking options.
 * See https://www.w3.org/TR/geolocation-API/#position_options_interface.
 * @property {import("./proj.js").ProjectionLike} [projection] The projection the position
 * is reported in.
 */
/**
 * @typedef {import("./ObjectEventType").Types|'change:accuracy'|'change:accuracyGeometry'|'change:altitude'|
 *    'change:altitudeAccuracy'|'change:heading'|'change:position'|'change:projection'|'change:speed'|'change:tracking'|
 *    'change:trackingOptions'} GeolocationObjectEventTypes
 */
/***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *   import("./Observable").OnSignature<GeolocationObjectEventTypes, import("./Object").ObjectEvent, Return> &
 *   import("./Observable").OnSignature<'error', GeolocationError, Return> &
 *   import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|GeolocationObjectEventTypes|
 *     'error', Return>} GeolocationOnSignature
 */
/**
 * @classdesc
 * Helper class for providing HTML5 Geolocation capabilities.
 * The [Geolocation API](https://www.w3.org/TR/geolocation-API/)
 * is used to locate a user's position.
 *
 * To get notified of position changes, register a listener for the generic
 * `change` event on your instance of {@link module:ol/Geolocation~Geolocation}.
 *
 * Example:
 *
 *     var geolocation = new Geolocation({
 *       // take the projection to use from the map's view
 *       projection: view.getProjection()
 *     });
 *     // listen to changes in position
 *     geolocation.on('change', function(evt) {
 *       window.console.log(geolocation.getPosition());
 *     });
 *
 * @fires module:ol/events/Event~BaseEvent#event:error
 * @api
 */
declare class Geolocation extends BaseObject {
    /**
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options | undefined);
    /***
     * @type {GeolocationOnSignature<import("./events").EventsKey>}
     */
    on: GeolocationOnSignature<import("./events").EventsKey>;
    /***
     * @type {GeolocationOnSignature<import("./events").EventsKey>}
     */
    once: GeolocationOnSignature<import("./events").EventsKey>;
    /***
     * @type {GeolocationOnSignature<void>}
     */
    un: GeolocationOnSignature<void>;
    /**
     * The unprojected (EPSG:4326) device position.
     * @private
     * @type {?import("./coordinate.js").Coordinate}
     */
    private position_;
    /**
     * @private
     * @type {import("./proj.js").TransformFunction}
     */
    private transform_;
    /**
     * @private
     * @type {number|undefined}
     */
    private watchId_;
    /**
     * @private
     */
    private handleProjectionChanged_;
    /**
     * @private
     */
    private handleTrackingChanged_;
    /**
     * @private
     * @param {GeolocationPosition} position position event.
     */
    private positionChange_;
    /**
     * @private
     * @param {GeolocationPositionError} error error object.
     */
    private positionError_;
    /**
     * Get the accuracy of the position in meters.
     * @return {number|undefined} The accuracy of the position measurement in
     *     meters.
     * @observable
     * @api
     */
    getAccuracy(): number | undefined;
    /**
     * Get a geometry of the position accuracy.
     * @return {?import("./geom/Polygon.js").default} A geometry of the position accuracy.
     * @observable
     * @api
     */
    getAccuracyGeometry(): import("./geom/Polygon.js").default | null;
    /**
     * Get the altitude associated with the position.
     * @return {number|undefined} The altitude of the position in meters above mean
     *     sea level.
     * @observable
     * @api
     */
    getAltitude(): number | undefined;
    /**
     * Get the altitude accuracy of the position.
     * @return {number|undefined} The accuracy of the altitude measurement in
     *     meters.
     * @observable
     * @api
     */
    getAltitudeAccuracy(): number | undefined;
    /**
     * Get the heading as radians clockwise from North.
     * Note: depending on the browser, the heading is only defined if the `enableHighAccuracy`
     * is set to `true` in the tracking options.
     * @return {number|undefined} The heading of the device in radians from north.
     * @observable
     * @api
     */
    getHeading(): number | undefined;
    /**
     * Get the position of the device.
     * @return {import("./coordinate.js").Coordinate|undefined} The current position of the device reported
     *     in the current projection.
     * @observable
     * @api
     */
    getPosition(): number[] | undefined;
    /**
     * Get the projection associated with the position.
     * @return {import("./proj/Projection.js").default|undefined} The projection the position is
     *     reported in.
     * @observable
     * @api
     */
    getProjection(): import("./proj/Projection.js").default | undefined;
    /**
     * Get the speed in meters per second.
     * @return {number|undefined} The instantaneous speed of the device in meters
     *     per second.
     * @observable
     * @api
     */
    getSpeed(): number | undefined;
    /**
     * Determine if the device location is being tracked.
     * @return {boolean} The device location is being tracked.
     * @observable
     * @api
     */
    getTracking(): boolean;
    /**
     * Get the tracking options.
     * See https://www.w3.org/TR/geolocation-API/#position-options.
     * @return {PositionOptions|undefined} PositionOptions as defined by
     *     the [HTML5 Geolocation spec
     *     ](https://www.w3.org/TR/geolocation-API/#position_options_interface).
     * @observable
     * @api
     */
    getTrackingOptions(): PositionOptions | undefined;
    /**
     * Set the projection to use for transforming the coordinates.
     * @param {import("./proj.js").ProjectionLike} projection The projection the position is
     *     reported in.
     * @observable
     * @api
     */
    setProjection(projection: string | import("./proj/Projection.js").default | undefined): void;
    /**
     * Enable or disable tracking.
     * @param {boolean} tracking Enable tracking.
     * @observable
     * @api
     */
    setTracking(tracking: boolean): void;
    /**
     * Set the tracking options.
     * See http://www.w3.org/TR/geolocation-API/#position-options.
     * @param {PositionOptions} options PositionOptions as defined by the
     *     [HTML5 Geolocation spec
     *     ](http://www.w3.org/TR/geolocation-API/#position_options_interface).
     * @observable
     * @api
     */
    setTrackingOptions(options: PositionOptions): void;
}
import BaseEvent from "./events/Event.js";
/**
 * @classdesc
 * Events emitted on Geolocation error.
 */
declare class GeolocationError extends BaseEvent {
    /**
     * @param {GeolocationPositionError} error error object.
     */
    constructor(error: any);
    /**
     * @type {number}
     */
    code: number;
    /**
     * @type {string}
     */
    message: string;
}
import BaseObject from "./Object.js";
//# sourceMappingURL=Geolocation.d.ts.map