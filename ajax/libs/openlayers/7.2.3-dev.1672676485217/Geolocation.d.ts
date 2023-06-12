/**
 * @classdesc
 * Events emitted on [GeolocationPositionError](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError).
 */
export class GeolocationError extends BaseEvent {
    /**
     * @param {GeolocationPositionError} error error object.
     */
    constructor(error: GeolocationPositionError);
    /**
     * Code of the underlying `GeolocationPositionError`.
     * @type {number}
     * @api
     */
    code: number;
    /**
     * Message of the underlying `GeolocationPositionError`.
     * @type {string}
     * @api
     */
    message: string;
}
export default Geolocation;
export type Options = {
    /**
     * Start Tracking right after
     * instantiation.
     */
    tracking?: boolean | undefined;
    /**
     * Tracking options.
     * See https://www.w3.org/TR/geolocation-API/#position_options_interface.
     */
    trackingOptions?: PositionOptions | undefined;
    /**
     * The projection the position
     * is reported in.
     */
    projection?: import("./proj.js").ProjectionLike;
};
export type GeolocationObjectEventTypes = import("./ObjectEventType").Types | 'change:accuracy' | 'change:accuracyGeometry' | 'change:altitude' | 'change:altitudeAccuracy' | 'change:heading' | 'change:position' | 'change:projection' | 'change:speed' | 'change:tracking' | 'change:trackingOptions';
/**
 * *
 */
export type GeolocationOnSignature<Return> = import("./Observable").OnSignature<'change', import("./events/Event.js").default, Return> & import("./Observable").OnSignature<GeolocationObjectEventTypes, import("./Object").ObjectEvent, Return> & import("./Observable").OnSignature<'error', GeolocationError, Return> & import("./Observable").CombinedOnSignature<import("./Observable").EventTypes | GeolocationObjectEventTypes, Return>;
import BaseEvent from "./events/Event.js";
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
 * @typedef {import("./Observable").OnSignature<'change', import("./events/Event.js").default, Return> &
 *   import("./Observable").OnSignature<GeolocationObjectEventTypes, import("./Object").ObjectEvent, Return> &
 *   import("./Observable").OnSignature<'error', GeolocationError, Return> &
 *   import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|GeolocationObjectEventTypes, Return>} GeolocationOnSignature
 */
/**
 * @classdesc
 * Helper class for providing HTML5 Geolocation capabilities.
 * The [Geolocation API](https://www.w3.org/TR/geolocation-API/)
 * is used to locate a user's position.
 *
 * To get notified of position changes and errors, register listeners for the generic
 * `change` event and the `error` event on your instance of {@link module:ol/Geolocation~Geolocation}.
 *
 * Example:
 *
 *     const geolocation = new Geolocation({
 *       // take the projection to use from the map's view
 *       projection: view.getProjection()
 *     });
 *     // listen to changes in position
 *     geolocation.on('change', function(evt) {
 *       console.log(geolocation.getPosition());
 *     });
 *     // listen to error
 *     geolocation.on('error', function(evt) {
 *       window.console.log(evt.message);
 *     });
 *
 * @fires GeolocationError
 * @api
 */
declare class Geolocation extends BaseObject {
    /**
     * @param {Options} [options] Options.
     */
    constructor(options?: Options | undefined);
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
    getPosition(): import("./coordinate.js").Coordinate | undefined;
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
    setProjection(projection: import("./proj.js").ProjectionLike): void;
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
import BaseObject from "./Object.js";
//# sourceMappingURL=Geolocation.d.ts.map