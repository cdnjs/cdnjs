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
     * See http://www.w3.org/TR/geolocation-API/#position_options_interface.
     */
    trackingOptions?: PositionOptions;
    /**
     * The projection the position
     * is reported in.
     */
    projection?: string | import("./proj/Projection.js").default;
};
/**
 * @typedef {Object} Options
 * @property {boolean} [tracking=false] Start Tracking right after
 * instantiation.
 * @property {PositionOptions} [trackingOptions] Tracking options.
 * See http://www.w3.org/TR/geolocation-API/#position_options_interface.
 * @property {import("./proj.js").ProjectionLike} [projection] The projection the position
 * is reported in.
 */
/**
 * @classdesc
 * Helper class for providing HTML5 Geolocation capabilities.
 * The [Geolocation API](http://www.w3.org/TR/geolocation-API/)
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
     * @param {Options=} opt_options Options.
     */
    constructor(opt_options?: Options);
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
     * @param {Position} position position event.
     */
    private positionChange_;
    /**
     * @private
     * @param {PositionError} error error object.
     */
    private positionError_;
    /**
     * Get the accuracy of the position in meters.
     * @return {number|undefined} The accuracy of the position measurement in
     *     meters.
     * @observable
     * @api
     */
    getAccuracy(): number;
    /**
     * Get a geometry of the position accuracy.
     * @return {?import("./geom/Polygon.js").default} A geometry of the position accuracy.
     * @observable
     * @api
     */
    getAccuracyGeometry(): import("./geom/Polygon.js").default;
    /**
     * Get the altitude associated with the position.
     * @return {number|undefined} The altitude of the position in meters above mean
     *     sea level.
     * @observable
     * @api
     */
    getAltitude(): number;
    /**
     * Get the altitude accuracy of the position.
     * @return {number|undefined} The accuracy of the altitude measurement in
     *     meters.
     * @observable
     * @api
     */
    getAltitudeAccuracy(): number;
    /**
     * Get the heading as radians clockwise from North.
     * Note: depending on the browser, the heading is only defined if the `enableHighAccuracy`
     * is set to `true` in the tracking options.
     * @return {number|undefined} The heading of the device in radians from north.
     * @observable
     * @api
     */
    getHeading(): number;
    /**
     * Get the position of the device.
     * @return {import("./coordinate.js").Coordinate|undefined} The current position of the device reported
     *     in the current projection.
     * @observable
     * @api
     */
    getPosition(): number[];
    /**
     * Get the projection associated with the position.
     * @return {import("./proj/Projection.js").default|undefined} The projection the position is
     *     reported in.
     * @observable
     * @api
     */
    getProjection(): import("./proj/Projection.js").default;
    /**
     * Get the speed in meters per second.
     * @return {number|undefined} The instantaneous speed of the device in meters
     *     per second.
     * @observable
     * @api
     */
    getSpeed(): number;
    /**
     * Determine if the device location is being tracked.
     * @return {boolean} The device location is being tracked.
     * @observable
     * @api
     */
    getTracking(): boolean;
    /**
     * Get the tracking options.
     * See http://www.w3.org/TR/geolocation-API/#position-options.
     * @return {PositionOptions|undefined} PositionOptions as defined by
     *     the [HTML5 Geolocation spec
     *     ](http://www.w3.org/TR/geolocation-API/#position_options_interface).
     * @observable
     * @api
     */
    getTrackingOptions(): PositionOptions;
    /**
     * Set the projection to use for transforming the coordinates.
     * @param {import("./proj.js").ProjectionLike} projection The projection the position is
     *     reported in.
     * @observable
     * @api
     */
    setProjection(projection: string | import("./proj/Projection.js").default): void;
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