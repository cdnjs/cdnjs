/**
 * @module ol/control/MousePosition
 */
import {listen} from '../events.js';
import EventType from '../events/EventType.js';
import {getChangeEventType} from '../Object.js';
import Control from '../control/Control.js';
import {getTransformFromProjections, identityTransform, get as getProjection} from '../proj.js';


/**
 * @type {string}
 */
var PROJECTION = 'projection';

/**
 * @type {string}
 */
var COORDINATE_FORMAT = 'coordinateFormat';


/**
 * @typedef {Object} Options
 * @property {string} [className='ol-mouse-position'] CSS class name.
 * @property {module:ol/coordinate~CoordinateFormat} [coordinateFormat] Coordinate format.
 * @property {module:ol/proj~ProjectionLike} projection Projection.
 * @property {function(module:ol/MapEvent)} [render] Function called when the
 * control should be re-rendered. This is called in a `requestAnimationFrame`
 * callback.
 * @property {Element|string} [target] Specify a target if you want the
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
 * @api
 */
var MousePosition = (function (Control) {
  function MousePosition(opt_options) {

    var options = opt_options ? opt_options : {};

    var element = document.createElement('div');
    element.className = options.className !== undefined ? options.className : 'ol-mouse-position';

    Control.call(this, {
      element: element,
      render: options.render || render,
      target: options.target
    });

    listen(this,
      getChangeEventType(PROJECTION),
      this.handleProjectionChanged_, this);

    if (options.coordinateFormat) {
      this.setCoordinateFormat(options.coordinateFormat);
    }
    if (options.projection) {
      this.setProjection(options.projection);
    }

    /**
     * @private
     * @type {string}
     */
    this.undefinedHTML_ = 'undefinedHTML' in options ? options.undefinedHTML : '&#160;';

    /**
     * @private
     * @type {boolean}
     */
    this.renderOnMouseOut_ = !!this.undefinedHTML_;

    /**
     * @private
     * @type {string}
     */
    this.renderedHTML_ = element.innerHTML;

    /**
     * @private
     * @type {module:ol/proj/Projection}
     */
    this.mapProjection_ = null;

    /**
     * @private
     * @type {?module:ol/proj~TransformFunction}
     */
    this.transform_ = null;

    /**
     * @private
     * @type {module:ol/pixel~Pixel}
     */
    this.lastMouseMovePixel_ = null;

  }

  if ( Control ) MousePosition.__proto__ = Control;
  MousePosition.prototype = Object.create( Control && Control.prototype );
  MousePosition.prototype.constructor = MousePosition;

  /**
   * @private
   */
  MousePosition.prototype.handleProjectionChanged_ = function handleProjectionChanged_ () {
    this.transform_ = null;
  };

  /**
   * Return the coordinate format type used to render the current position or
   * undefined.
   * @return {module:ol/coordinate~CoordinateFormat|undefined} The format to render the current
   *     position in.
   * @observable
   * @api
   */
  MousePosition.prototype.getCoordinateFormat = function getCoordinateFormat () {
    return (
      /** @type {module:ol/coordinate~CoordinateFormat|undefined} */ (this.get(COORDINATE_FORMAT))
    );
  };

  /**
   * Return the projection that is used to report the mouse position.
   * @return {module:ol/proj/Projection|undefined} The projection to report mouse
   *     position in.
   * @observable
   * @api
   */
  MousePosition.prototype.getProjection = function getProjection () {
    return (
      /** @type {module:ol/proj/Projection|undefined} */ (this.get(PROJECTION))
    );
  };

  /**
   * @param {Event} event Browser event.
   * @protected
   */
  MousePosition.prototype.handleMouseMove = function handleMouseMove (event) {
    var map = this.getMap();
    this.lastMouseMovePixel_ = map.getEventPixel(event);
    this.updateHTML_(this.lastMouseMovePixel_);
  };

  /**
   * @param {Event} event Browser event.
   * @protected
   */
  MousePosition.prototype.handleMouseOut = function handleMouseOut (event) {
    this.updateHTML_(null);
    this.lastMouseMovePixel_ = null;
  };

  /**
   * @inheritDoc
   * @api
   */
  MousePosition.prototype.setMap = function setMap (map) {
    Control.prototype.setMap.call(this, map);
    if (map) {
      var viewport = map.getViewport();
      this.listenerKeys.push(
        listen(viewport, EventType.MOUSEMOVE, this.handleMouseMove, this)
      );
      if (this.renderOnMouseOut_) {
        this.listenerKeys.push(
          listen(viewport, EventType.MOUSEOUT, this.handleMouseOut, this)
        );
      }
    }
  };

  /**
   * Set the coordinate format type used to render the current position.
   * @param {module:ol/coordinate~CoordinateFormat} format The format to render the current
   *     position in.
   * @observable
   * @api
   */
  MousePosition.prototype.setCoordinateFormat = function setCoordinateFormat (format) {
    this.set(COORDINATE_FORMAT, format);
  };

  /**
   * Set the projection that is used to report the mouse position.
   * @param {module:ol/proj~ProjectionLike} projection The projection to report mouse
   *     position in.
   * @observable
   * @api
   */
  MousePosition.prototype.setProjection = function setProjection (projection) {
    this.set(PROJECTION, getProjection(projection));
  };

  /**
   * @param {?module:ol/pixel~Pixel} pixel Pixel.
   * @private
   */
  MousePosition.prototype.updateHTML_ = function updateHTML_ (pixel) {
    var html = this.undefinedHTML_;
    if (pixel && this.mapProjection_) {
      if (!this.transform_) {
        var projection = this.getProjection();
        if (projection) {
          this.transform_ = getTransformFromProjections(
            this.mapProjection_, projection);
        } else {
          this.transform_ = identityTransform;
        }
      }
      var map = this.getMap();
      var coordinate = map.getCoordinateFromPixel(pixel);
      if (coordinate) {
        this.transform_(coordinate, coordinate);
        var coordinateFormat = this.getCoordinateFormat();
        if (coordinateFormat) {
          html = coordinateFormat(coordinate);
        } else {
          html = coordinate.toString();
        }
      }
    }
    if (!this.renderedHTML_ || html !== this.renderedHTML_) {
      this.element.innerHTML = html;
      this.renderedHTML_ = html;
    }
  };

  return MousePosition;
}(Control));


/**
 * Update the mouseposition element.
 * @param {module:ol/MapEvent} mapEvent Map event.
 * @this {module:ol/control/MousePosition}
 * @api
 */
export function render(mapEvent) {
  var frameState = mapEvent.frameState;
  if (!frameState) {
    this.mapProjection_ = null;
  } else {
    if (this.mapProjection_ != frameState.viewState.projection) {
      this.mapProjection_ = frameState.viewState.projection;
      this.transform_ = null;
    }
  }
  this.updateHTML_(this.lastMouseMovePixel_);
}


export default MousePosition;

//# sourceMappingURL=MousePosition.js.map