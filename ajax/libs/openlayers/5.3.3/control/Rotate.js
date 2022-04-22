/**
 * @module ol/control/Rotate
 */
import Control from './Control.js';
import {CLASS_CONTROL, CLASS_HIDDEN, CLASS_UNSELECTABLE} from '../css.js';
import {easeOut} from '../easing.js';
import {listen} from '../events.js';
import EventType from '../events/EventType.js';


/**
 * @typedef {Object} Options
 * @property {string} [className='ol-rotate'] CSS class name.
 * @property {string|HTMLElement} [label='⇧'] Text label to use for the rotate button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [tipLabel='Reset rotation'] Text label to use for the rotate tip.
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {boolean} [autoHide=true] Hide the control when rotation is 0.
 * @property {function(import("../MapEvent.js").default)} [render] Function called when the control should
 * be re-rendered. This is called in a `requestAnimationFrame` callback.
 * @property {function()} [resetNorth] Function called when the control is clicked.
 * This will override the default `resetNorth`.
 * @property {HTMLElement|string} [target] Specify a target if you want the control to be
 * rendered outside of the map's viewport.
 */


/**
 * @classdesc
 * A button control to reset rotation to 0.
 * To style this control use css selector `.ol-rotate`. A `.ol-hidden` css
 * selector is added to the button when the rotation is 0.
 *
 * @api
 */
var Rotate = /*@__PURE__*/(function (Control) {
  function Rotate(opt_options) {

    var options = opt_options ? opt_options : {};

    Control.call(this, {
      element: document.createElement('div'),
      render: options.render || render,
      target: options.target
    });

    var className = options.className !== undefined ? options.className : 'ol-rotate';

    var label = options.label !== undefined ? options.label : '\u21E7';

    /**
     * @type {HTMLElement}
     * @private
     */
    this.label_ = null;

    if (typeof label === 'string') {
      this.label_ = document.createElement('span');
      this.label_.className = 'ol-compass';
      this.label_.textContent = label;
    } else {
      this.label_ = label;
      this.label_.classList.add('ol-compass');
    }

    var tipLabel = options.tipLabel ? options.tipLabel : 'Reset rotation';

    var button = document.createElement('button');
    button.className = className + '-reset';
    button.setAttribute('type', 'button');
    button.title = tipLabel;
    button.appendChild(this.label_);

    listen(button, EventType.CLICK, this.handleClick_, this);

    var cssClasses = className + ' ' + CLASS_UNSELECTABLE + ' ' + CLASS_CONTROL;
    var element = this.element;
    element.className = cssClasses;
    element.appendChild(button);

    this.callResetNorth_ = options.resetNorth ? options.resetNorth : undefined;

    /**
     * @type {number}
     * @private
     */
    this.duration_ = options.duration !== undefined ? options.duration : 250;

    /**
     * @type {boolean}
     * @private
     */
    this.autoHide_ = options.autoHide !== undefined ? options.autoHide : true;

    /**
     * @private
     * @type {number|undefined}
     */
    this.rotation_ = undefined;

    if (this.autoHide_) {
      this.element.classList.add(CLASS_HIDDEN);
    }

  }

  if ( Control ) Rotate.__proto__ = Control;
  Rotate.prototype = Object.create( Control && Control.prototype );
  Rotate.prototype.constructor = Rotate;

  /**
   * @param {MouseEvent} event The event to handle
   * @private
   */
  Rotate.prototype.handleClick_ = function handleClick_ (event) {
    event.preventDefault();
    if (this.callResetNorth_ !== undefined) {
      this.callResetNorth_();
    } else {
      this.resetNorth_();
    }
  };

  /**
   * @private
   */
  Rotate.prototype.resetNorth_ = function resetNorth_ () {
    var map = this.getMap();
    var view = map.getView();
    if (!view) {
      // the map does not have a view, so we can't act
      // upon it
      return;
    }
    if (view.getRotation() !== undefined) {
      if (this.duration_ > 0) {
        view.animate({
          rotation: 0,
          duration: this.duration_,
          easing: easeOut
        });
      } else {
        view.setRotation(0);
      }
    }
  };

  return Rotate;
}(Control));


/**
 * Update the rotate control element.
 * @param {import("../MapEvent.js").default} mapEvent Map event.
 * @this {Rotate}
 * @api
 */
export function render(mapEvent) {
  var frameState = mapEvent.frameState;
  if (!frameState) {
    return;
  }
  var rotation = frameState.viewState.rotation;
  if (rotation != this.rotation_) {
    var transform = 'rotate(' + rotation + 'rad)';
    if (this.autoHide_) {
      var contains = this.element.classList.contains(CLASS_HIDDEN);
      if (!contains && rotation === 0) {
        this.element.classList.add(CLASS_HIDDEN);
      } else if (contains && rotation !== 0) {
        this.element.classList.remove(CLASS_HIDDEN);
      }
    }
    this.label_.style.msTransform = transform;
    this.label_.style.webkitTransform = transform;
    this.label_.style.transform = transform;
  }
  this.rotation_ = rotation;
}

export default Rotate;

//# sourceMappingURL=Rotate.js.map