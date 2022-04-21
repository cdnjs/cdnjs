/**
 * @module ol/Geolocation
 */
import BaseObject, {getChangeEventType} from './Object.js';
import {listen} from './events.js';
import Event from './events/Event.js';
import EventType from './events/EventType.js';
import {circular as circularPolygon} from './geom/Polygon.js';
import {GEOLOCATION} from './has.js';
import {toRadians} from './math.js';
import {get as getProjection, getTransformFromProjections, identityTransform} from './proj.js';


/**
 * @enum {string}
 */
var Property = {
  ACCURACY: 'accuracy',
  ACCURACY_GEOMETRY: 'accuracyGeometry',
  ALTITUDE: 'altitude',
  ALTITUDE_ACCURACY: 'altitudeAccuracy',
  HEADING: 'heading',
  POSITION: 'position',
  PROJECTION: 'projection',
  SPEED: 'speed',
  TRACKING: 'tracking',
  TRACKING_OPTIONS: 'trackingOptions'
};


/**
 * @classdesc
 * Events emitted on Geolocation error.
 */
var GeolocationError = /*@__PURE__*/(function (Event) {
  function GeolocationError(error) {
    Event.call(this, EventType.ERROR);

    /**
     * @type {number}
     */
    this.code = error.code;

    /**
     * @type {string}
     */
    this.message = error.message;
  }

  if ( Event ) GeolocationError.__proto__ = Event;
  GeolocationError.prototype = Object.create( Event && Event.prototype );
  GeolocationError.prototype.constructor = GeolocationError;

  return GeolocationError;
}(Event));


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
 * @fires error
 * @api
 */
var Geolocation = /*@__PURE__*/(function (BaseObject) {
  function Geolocation(opt_options) {

    BaseObject.call(this);

    var options = opt_options || {};

    /**
     * The unprojected (EPSG:4326) device position.
     * @private
     * @type {import("./coordinate.js").Coordinate}
     */
    this.position_ = null;

    /**
     * @private
     * @type {import("./proj.js").TransformFunction}
     */
    this.transform_ = identityTransform;

    /**
     * @private
     * @type {number|undefined}
     */
    this.watchId_ = undefined;

    listen(
      this, getChangeEventType(Property.PROJECTION),
      this.handleProjectionChanged_, this);
    listen(
      this, getChangeEventType(Property.TRACKING),
      this.handleTrackingChanged_, this);

    if (options.projection !== undefined) {
      this.setProjection(options.projection);
    }
    if (options.trackingOptions !== undefined) {
      this.setTrackingOptions(options.trackingOptions);
    }

    this.setTracking(options.tracking !== undefined ? options.tracking : false);

  }

  if ( BaseObject ) Geolocation.__proto__ = BaseObject;
  Geolocation.prototype = Object.create( BaseObject && BaseObject.prototype );
  Geolocation.prototype.constructor = Geolocation;

  /**
   * @inheritDoc
   */
  Geolocation.prototype.disposeInternal = function disposeInternal () {
    this.setTracking(false);
    BaseObject.prototype.disposeInternal.call(this);
  };

  /**
   * @private
   */
  Geolocation.prototype.handleProjectionChanged_ = function handleProjectionChanged_ () {
    var projection = this.getProjection();
    if (projection) {
      this.transform_ = getTransformFromProjections(
        getProjection('EPSG:4326'), projection);
      if (this.position_) {
        this.set(Property.POSITION, this.transform_(this.position_));
      }
    }
  };

  /**
   * @private
   */
  Geolocation.prototype.handleTrackingChanged_ = function handleTrackingChanged_ () {
    if (GEOLOCATION) {
      var tracking = this.getTracking();
      if (tracking && this.watchId_ === undefined) {
        this.watchId_ = navigator.geolocation.watchPosition(
          this.positionChange_.bind(this),
          this.positionError_.bind(this),
          this.getTrackingOptions());
      } else if (!tracking && this.watchId_ !== undefined) {
        navigator.geolocation.clearWatch(this.watchId_);
        this.watchId_ = undefined;
      }
    }
  };

  /**
   * @private
   * @param {Position} position position event.
   */
  Geolocation.prototype.positionChange_ = function positionChange_ (position) {
    var coords = position.coords;
    this.set(Property.ACCURACY, coords.accuracy);
    this.set(Property.ALTITUDE,
      coords.altitude === null ? undefined : coords.altitude);
    this.set(Property.ALTITUDE_ACCURACY,
      coords.altitudeAccuracy === null ?
        undefined : coords.altitudeAccuracy);
    this.set(Property.HEADING, coords.heading === null ?
      undefined : toRadians(coords.heading));
    if (!this.position_) {
      this.position_ = [coords.longitude, coords.latitude];
    } else {
      this.position_[0] = coords.longitude;
      this.position_[1] = coords.latitude;
    }
    var projectedPosition = this.transform_(this.position_);
    this.set(Property.POSITION, projectedPosition);
    this.set(Property.SPEED,
      coords.speed === null ? undefined : coords.speed);
    var geometry = circularPolygon(this.position_, coords.accuracy);
    geometry.applyTransform(this.transform_);
    this.set(Property.ACCURACY_GEOMETRY, geometry);
    this.changed();
  };

  /**
   * Triggered when the Geolocation returns an error.
   * @event error
   * @api
   */

  /**
   * @private
   * @param {PositionError} error error object.
   */
  Geolocation.prototype.positionError_ = function positionError_ (error) {
    this.setTracking(false);
    this.dispatchEvent(new GeolocationError(error));
  };

  /**
   * Get the accuracy of the position in meters.
   * @return {number|undefined} The accuracy of the position measurement in
   *     meters.
   * @observable
   * @api
   */
  Geolocation.prototype.getAccuracy = function getAccuracy () {
    return /** @type {number|undefined} */ (this.get(Property.ACCURACY));
  };

  /**
   * Get a geometry of the position accuracy.
   * @return {?import("./geom/Polygon.js").default} A geometry of the position accuracy.
   * @observable
   * @api
   */
  Geolocation.prototype.getAccuracyGeometry = function getAccuracyGeometry () {
    return (
      /** @type {?import("./geom/Polygon.js").default} */ (this.get(Property.ACCURACY_GEOMETRY) || null)
    );
  };

  /**
   * Get the altitude associated with the position.
   * @return {number|undefined} The altitude of the position in meters above mean
   *     sea level.
   * @observable
   * @api
   */
  Geolocation.prototype.getAltitude = function getAltitude () {
    return /** @type {number|undefined} */ (this.get(Property.ALTITUDE));
  };

  /**
   * Get the altitude accuracy of the position.
   * @return {number|undefined} The accuracy of the altitude measurement in
   *     meters.
   * @observable
   * @api
   */
  Geolocation.prototype.getAltitudeAccuracy = function getAltitudeAccuracy () {
    return /** @type {number|undefined} */ (this.get(Property.ALTITUDE_ACCURACY));
  };

  /**
   * Get the heading as radians clockwise from North.
   * Note: depending on the browser, the heading is only defined if the `enableHighAccuracy`
   * is set to `true` in the tracking options.
   * @return {number|undefined} The heading of the device in radians from north.
   * @observable
   * @api
   */
  Geolocation.prototype.getHeading = function getHeading () {
    return /** @type {number|undefined} */ (this.get(Property.HEADING));
  };

  /**
   * Get the position of the device.
   * @return {import("./coordinate.js").Coordinate|undefined} The current position of the device reported
   *     in the current projection.
   * @observable
   * @api
   */
  Geolocation.prototype.getPosition = function getPosition () {
    return (
      /** @type {import("./coordinate.js").Coordinate|undefined} */ (this.get(Property.POSITION))
    );
  };

  /**
   * Get the projection associated with the position.
   * @return {import("./proj/Projection.js").default|undefined} The projection the position is
   *     reported in.
   * @observable
   * @api
   */
  Geolocation.prototype.getProjection = function getProjection () {
    return (
      /** @type {import("./proj/Projection.js").default|undefined} */ (this.get(Property.PROJECTION))
    );
  };

  /**
   * Get the speed in meters per second.
   * @return {number|undefined} The instantaneous speed of the device in meters
   *     per second.
   * @observable
   * @api
   */
  Geolocation.prototype.getSpeed = function getSpeed () {
    return /** @type {number|undefined} */ (this.get(Property.SPEED));
  };

  /**
   * Determine if the device location is being tracked.
   * @return {boolean} The device location is being tracked.
   * @observable
   * @api
   */
  Geolocation.prototype.getTracking = function getTracking () {
    return /** @type {boolean} */ (this.get(Property.TRACKING));
  };

  /**
   * Get the tracking options.
   * See http://www.w3.org/TR/geolocation-API/#position-options.
   * @return {PositionOptions|undefined} PositionOptions as defined by
   *     the [HTML5 Geolocation spec
   *     ](http://www.w3.org/TR/geolocation-API/#position_options_interface).
   * @observable
   * @api
   */
  Geolocation.prototype.getTrackingOptions = function getTrackingOptions () {
    return /** @type {PositionOptions|undefined} */ (this.get(Property.TRACKING_OPTIONS));
  };

  /**
   * Set the projection to use for transforming the coordinates.
   * @param {import("./proj.js").ProjectionLike} projection The projection the position is
   *     reported in.
   * @observable
   * @api
   */
  Geolocation.prototype.setProjection = function setProjection (projection) {
    this.set(Property.PROJECTION, getProjection(projection));
  };

  /**
   * Enable or disable tracking.
   * @param {boolean} tracking Enable tracking.
   * @observable
   * @api
   */
  Geolocation.prototype.setTracking = function setTracking (tracking) {
    this.set(Property.TRACKING, tracking);
  };

  /**
   * Set the tracking options.
   * See http://www.w3.org/TR/geolocation-API/#position-options.
   * @param {PositionOptions} options PositionOptions as defined by the
   *     [HTML5 Geolocation spec
   *     ](http://www.w3.org/TR/geolocation-API/#position_options_interface).
   * @observable
   * @api
   */
  Geolocation.prototype.setTrackingOptions = function setTrackingOptions (options) {
    this.set(Property.TRACKING_OPTIONS, options);
  };

  return Geolocation;
}(BaseObject));


export default Geolocation;

//# sourceMappingURL=Geolocation.js.map