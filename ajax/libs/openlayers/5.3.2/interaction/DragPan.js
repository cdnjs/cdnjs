/**
 * @module ol/interaction/DragPan
 */
import ViewHint from '../ViewHint.js';
import {scale as scaleCoordinate, rotate as rotateCoordinate, add as addCoordinate} from '../coordinate.js';
import {easeOut} from '../easing.js';
import {noModifierKeys} from '../events/condition.js';
import {FALSE} from '../functions.js';
import PointerInteraction, {centroid as centroidFromPointers} from './Pointer.js';


/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
 * to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition~noModifierKeys}.
 * @property {import("../Kinetic.js").default} [kinetic] Kinetic inertia to apply to the pan.
 */


/**
 * @classdesc
 * Allows the user to pan the map by dragging the map.
 * @api
 */
var DragPan = /*@__PURE__*/(function (PointerInteraction) {
  function DragPan(opt_options) {

    PointerInteraction.call(this, {
      stopDown: FALSE
    });

    var options = opt_options ? opt_options : {};

    /**
     * @private
     * @type {import("../Kinetic.js").default|undefined}
     */
    this.kinetic_ = options.kinetic;

    /**
     * @type {import("../pixel.js").Pixel}
     */
    this.lastCentroid = null;

    /**
     * @type {number}
     */
    this.lastPointersCount_;

    /**
     * @type {boolean}
     */
    this.panning_ = false;

    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    this.condition_ = options.condition ? options.condition : noModifierKeys;

    /**
     * @private
     * @type {boolean}
     */
    this.noKinetic_ = false;

  }

  if ( PointerInteraction ) DragPan.__proto__ = PointerInteraction;
  DragPan.prototype = Object.create( PointerInteraction && PointerInteraction.prototype );
  DragPan.prototype.constructor = DragPan;

  /**
   * @inheritDoc
   */
  DragPan.prototype.handleDragEvent = function handleDragEvent (mapBrowserEvent) {
    if (!this.panning_) {
      this.panning_ = true;
      this.getMap().getView().setHint(ViewHint.INTERACTING, 1);
    }
    var targetPointers = this.targetPointers;
    var centroid = centroidFromPointers(targetPointers);
    if (targetPointers.length == this.lastPointersCount_) {
      if (this.kinetic_) {
        this.kinetic_.update(centroid[0], centroid[1]);
      }
      if (this.lastCentroid) {
        var deltaX = this.lastCentroid[0] - centroid[0];
        var deltaY = centroid[1] - this.lastCentroid[1];
        var map = mapBrowserEvent.map;
        var view = map.getView();
        var center = [deltaX, deltaY];
        scaleCoordinate(center, view.getResolution());
        rotateCoordinate(center, view.getRotation());
        addCoordinate(center, view.getCenter());
        center = view.constrainCenter(center);
        view.setCenter(center);
      }
    } else if (this.kinetic_) {
      // reset so we don't overestimate the kinetic energy after
      // after one finger down, tiny drag, second finger down
      this.kinetic_.begin();
    }
    this.lastCentroid = centroid;
    this.lastPointersCount_ = targetPointers.length;
  };

  /**
   * @inheritDoc
   */
  DragPan.prototype.handleUpEvent = function handleUpEvent (mapBrowserEvent) {
    var map = mapBrowserEvent.map;
    var view = map.getView();
    if (this.targetPointers.length === 0) {
      if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
        var distance = this.kinetic_.getDistance();
        var angle = this.kinetic_.getAngle();
        var center = /** @type {!import("../coordinate.js").Coordinate} */ (view.getCenter());
        var centerpx = map.getPixelFromCoordinate(center);
        var dest = map.getCoordinateFromPixel([
          centerpx[0] - distance * Math.cos(angle),
          centerpx[1] - distance * Math.sin(angle)
        ]);
        view.animate({
          center: view.constrainCenter(dest),
          duration: 500,
          easing: easeOut
        });
      }
      if (this.panning_) {
        this.panning_ = false;
        view.setHint(ViewHint.INTERACTING, -1);
      }
      return false;
    } else {
      if (this.kinetic_) {
        // reset so we don't overestimate the kinetic energy after
        // after one finger up, tiny drag, second finger up
        this.kinetic_.begin();
      }
      this.lastCentroid = null;
      return true;
    }
  };

  /**
   * @inheritDoc
   */
  DragPan.prototype.handleDownEvent = function handleDownEvent (mapBrowserEvent) {
    if (this.targetPointers.length > 0 && this.condition_(mapBrowserEvent)) {
      var map = mapBrowserEvent.map;
      var view = map.getView();
      this.lastCentroid = null;
      // stop any current animation
      if (view.getAnimating()) {
        view.setCenter(mapBrowserEvent.frameState.viewState.center);
      }
      if (this.kinetic_) {
        this.kinetic_.begin();
      }
      // No kinetic as soon as more than one pointer on the screen is
      // detected. This is to prevent nasty pans after pinch.
      this.noKinetic_ = this.targetPointers.length > 1;
      return true;
    } else {
      return false;
    }
  };

  return DragPan;
}(PointerInteraction));

export default DragPan;

//# sourceMappingURL=DragPan.js.map