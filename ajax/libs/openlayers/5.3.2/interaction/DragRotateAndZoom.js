/**
 * @module ol/interaction/DragRotateAndZoom
 */
import {disable} from '../rotationconstraint.js';
import ViewHint from '../ViewHint.js';
import {shiftKeyOnly, mouseOnly} from '../events/condition.js';
import {rotate, rotateWithoutConstraints, zoom, zoomWithoutConstraints} from './Interaction.js';
import PointerInteraction from './Pointer.js';


/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition~shiftKeyOnly}.
 * @property {number} [duration=400] Animation duration in milliseconds.
 */


/**
 * @classdesc
 * Allows the user to zoom and rotate the map by clicking and dragging
 * on the map.  By default, this interaction is limited to when the shift
 * key is held down.
 *
 * This interaction is only supported for mouse devices.
 *
 * And this interaction is not included in the default interactions.
 * @api
 */
var DragRotateAndZoom = /*@__PURE__*/(function (PointerInteraction) {
  function DragRotateAndZoom(opt_options) {

    var options = opt_options ? opt_options : {};

    PointerInteraction.call(/** @type {import("./Pointer.js").Options} */ this, (options));

    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    this.condition_ = options.condition ? options.condition : shiftKeyOnly;

    /**
     * @private
     * @type {number|undefined}
     */
    this.lastAngle_ = undefined;

    /**
     * @private
     * @type {number|undefined}
     */
    this.lastMagnitude_ = undefined;

    /**
     * @private
     * @type {number}
     */
    this.lastScaleDelta_ = 0;

    /**
     * @private
     * @type {number}
     */
    this.duration_ = options.duration !== undefined ? options.duration : 400;

  }

  if ( PointerInteraction ) DragRotateAndZoom.__proto__ = PointerInteraction;
  DragRotateAndZoom.prototype = Object.create( PointerInteraction && PointerInteraction.prototype );
  DragRotateAndZoom.prototype.constructor = DragRotateAndZoom;

  /**
   * @inheritDoc
   */
  DragRotateAndZoom.prototype.handleDragEvent = function handleDragEvent (mapBrowserEvent) {
    if (!mouseOnly(mapBrowserEvent)) {
      return;
    }

    var map = mapBrowserEvent.map;
    var size = map.getSize();
    var offset = mapBrowserEvent.pixel;
    var deltaX = offset[0] - size[0] / 2;
    var deltaY = size[1] / 2 - offset[1];
    var theta = Math.atan2(deltaY, deltaX);
    var magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    var view = map.getView();
    if (view.getConstraints().rotation !== disable && this.lastAngle_ !== undefined) {
      var angleDelta = theta - this.lastAngle_;
      rotateWithoutConstraints(view, view.getRotation() - angleDelta);
    }
    this.lastAngle_ = theta;
    if (this.lastMagnitude_ !== undefined) {
      var resolution = this.lastMagnitude_ * (view.getResolution() / magnitude);
      zoomWithoutConstraints(view, resolution);
    }
    if (this.lastMagnitude_ !== undefined) {
      this.lastScaleDelta_ = this.lastMagnitude_ / magnitude;
    }
    this.lastMagnitude_ = magnitude;
  };

  /**
   * @inheritDoc
   */
  DragRotateAndZoom.prototype.handleUpEvent = function handleUpEvent (mapBrowserEvent) {
    if (!mouseOnly(mapBrowserEvent)) {
      return true;
    }

    var map = mapBrowserEvent.map;
    var view = map.getView();
    view.setHint(ViewHint.INTERACTING, -1);
    var direction = this.lastScaleDelta_ - 1;
    rotate(view, view.getRotation());
    zoom(view, view.getResolution(), undefined, this.duration_, direction);
    this.lastScaleDelta_ = 0;
    return false;
  };

  /**
   * @inheritDoc
   */
  DragRotateAndZoom.prototype.handleDownEvent = function handleDownEvent (mapBrowserEvent) {
    if (!mouseOnly(mapBrowserEvent)) {
      return false;
    }

    if (this.condition_(mapBrowserEvent)) {
      mapBrowserEvent.map.getView().setHint(ViewHint.INTERACTING, 1);
      this.lastAngle_ = undefined;
      this.lastMagnitude_ = undefined;
      return true;
    } else {
      return false;
    }
  };

  return DragRotateAndZoom;
}(PointerInteraction));

export default DragRotateAndZoom;

//# sourceMappingURL=DragRotateAndZoom.js.map