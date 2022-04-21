/**
 * @module ol/interaction/PinchZoom
 */
import ViewHint from '../ViewHint.js';
import {FALSE} from '../functions.js';
import {zoom, zoomWithoutConstraints} from './Interaction.js';
import PointerInteraction, {centroid as centroidFromPointers} from './Pointer.js';


/**
 * @typedef {Object} Options
 * @property {number} [duration=400] Animation duration in milliseconds.
 * @property {boolean} [constrainResolution=false] Zoom to the closest integer
 * zoom level after the pinch gesture ends.
 */


/**
 * @classdesc
 * Allows the user to zoom the map by pinching with two fingers
 * on a touch screen.
 * @api
 */
var PinchZoom = /*@__PURE__*/(function (PointerInteraction) {
  function PinchZoom(opt_options) {

    var options = opt_options ? opt_options : {};

    var pointerOptions = /** @type {import("./Pointer.js").Options} */ (options);

    if (!pointerOptions.stopDown) {
      pointerOptions.stopDown = FALSE;
    }

    PointerInteraction.call(this, pointerOptions);

    /**
     * @private
     * @type {boolean}
     */
    this.constrainResolution_ = options.constrainResolution || false;

    /**
     * @private
     * @type {import("../coordinate.js").Coordinate}
     */
    this.anchor_ = null;

    /**
     * @private
     * @type {number}
     */
    this.duration_ = options.duration !== undefined ? options.duration : 400;

    /**
     * @private
     * @type {number|undefined}
     */
    this.lastDistance_ = undefined;

    /**
     * @private
     * @type {number}
     */
    this.lastScaleDelta_ = 1;

  }

  if ( PointerInteraction ) PinchZoom.__proto__ = PointerInteraction;
  PinchZoom.prototype = Object.create( PointerInteraction && PointerInteraction.prototype );
  PinchZoom.prototype.constructor = PinchZoom;

  /**
   * @inheritDoc
   */
  PinchZoom.prototype.handleDragEvent = function handleDragEvent (mapBrowserEvent) {
    var scaleDelta = 1.0;

    var touch0 = this.targetPointers[0];
    var touch1 = this.targetPointers[1];
    var dx = touch0.clientX - touch1.clientX;
    var dy = touch0.clientY - touch1.clientY;

    // distance between touches
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (this.lastDistance_ !== undefined) {
      scaleDelta = this.lastDistance_ / distance;
    }
    this.lastDistance_ = distance;


    var map = mapBrowserEvent.map;
    var view = map.getView();
    var resolution = view.getResolution();
    var maxResolution = view.getMaxResolution();
    var minResolution = view.getMinResolution();
    var newResolution = resolution * scaleDelta;
    if (newResolution > maxResolution) {
      scaleDelta = maxResolution / resolution;
      newResolution = maxResolution;
    } else if (newResolution < minResolution) {
      scaleDelta = minResolution / resolution;
      newResolution = minResolution;
    }

    if (scaleDelta != 1.0) {
      this.lastScaleDelta_ = scaleDelta;
    }

    // scale anchor point.
    var viewportPosition = map.getViewport().getBoundingClientRect();
    var centroid = centroidFromPointers(this.targetPointers);
    centroid[0] -= viewportPosition.left;
    centroid[1] -= viewportPosition.top;
    this.anchor_ = map.getCoordinateFromPixel(centroid);

    // scale, bypass the resolution constraint
    map.render();
    zoomWithoutConstraints(view, newResolution, this.anchor_);
  };

  /**
   * @inheritDoc
   */
  PinchZoom.prototype.handleUpEvent = function handleUpEvent (mapBrowserEvent) {
    if (this.targetPointers.length < 2) {
      var map = mapBrowserEvent.map;
      var view = map.getView();
      view.setHint(ViewHint.INTERACTING, -1);
      var resolution = view.getResolution();
      if (this.constrainResolution_ ||
          resolution < view.getMinResolution() ||
          resolution > view.getMaxResolution()) {
        // Zoom to final resolution, with an animation, and provide a
        // direction not to zoom out/in if user was pinching in/out.
        // Direction is > 0 if pinching out, and < 0 if pinching in.
        var direction = this.lastScaleDelta_ - 1;
        zoom(view, resolution, this.anchor_, this.duration_, direction);
      }
      return false;
    } else {
      return true;
    }
  };

  /**
   * @inheritDoc
   */
  PinchZoom.prototype.handleDownEvent = function handleDownEvent (mapBrowserEvent) {
    if (this.targetPointers.length >= 2) {
      var map = mapBrowserEvent.map;
      this.anchor_ = null;
      this.lastDistance_ = undefined;
      this.lastScaleDelta_ = 1;
      if (!this.handlingDownUpSequence) {
        map.getView().setHint(ViewHint.INTERACTING, 1);
      }
      return true;
    } else {
      return false;
    }
  };

  return PinchZoom;
}(PointerInteraction));

export default PinchZoom;

//# sourceMappingURL=PinchZoom.js.map