// Pressure v2.1.2 | Created By Stuart Yamartino | MIT License | 2015 - 2017
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.jQuery__pressure = factory(root.jQuery);
  }
}(this, function($) {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//--------------------- Public jQuery API Section ---------------------//

if ($) {

  $.fn.pressure = function (closure, options) {
    loopPressureElements(this, closure, options);
    return this;
  };

  $.pressureConfig = function (options) {
    Config.set(options);
  };

  $.pressureMap = function (x, in_min, in_max, out_min, out_max) {
    return map.apply(null, arguments);
  };
} else {
  throw new Error("Pressure jQuery requires jQuery to be loaded.");
}

var Element = function () {
  function Element(el, block, options) {
    _classCallCheck(this, Element);

    this.routeEvents(el, block, options);
    this.preventSelect(el, options);
  }

  _createClass(Element, [{
    key: 'routeEvents',
    value: function routeEvents(el, block, options) {
      var type = Config.get('only', options);
      // for devices that support pointer events
      if (supportsPointer && (type === 'pointer' || type === null)) {
        this.adapter = new AdapterPointer(el, block, options).bindEvents();
      }
      // for devices that support 3D Touch
      else if (supportsTouch && (type === 'touch' || type === null)) {
          this.adapter = new Adapter3DTouch(el, block, options).bindEvents();
        }
        // for devices that support Force Touch
        else if (supportsMouse && (type === 'mouse' || type === null)) {
            this.adapter = new AdapterForceTouch(el, block, options).bindEvents();
          }
          // unsupported if it is requesting a type and your browser is of other type
          else {
              this.adapter = new Adapter(el, block).bindUnsupportedEvent();
            }
    }

    // prevent the default action of text selection, "peak & pop", and force touch special feature

  }, {
    key: 'preventSelect',
    value: function preventSelect(el, options) {
      if (Config.get('preventSelect', options)) {
        el.style.webkitTouchCallout = "none";
        el.style.webkitUserSelect = "none";
        el.style.khtmlUserSelect = "none";
        el.style.MozUserSelect = "none";
        el.style.msUserSelect = "none";
        el.style.userSelect = "none";
      }
    }
  }]);

  return Element;
}();

/*
This is the base adapter from which all the other adapters extend.
*/

var Adapter = function () {
  function Adapter(el, block, options) {
    _classCallCheck(this, Adapter);

    this.el = el;
    this.block = block;
    this.options = options;
    this.pressed = false;
    this.deepPressed = false;
    this.nativeSupport = false;
    this.runningPolyfill = false;
    this.runKey = Math.random();
  }

  _createClass(Adapter, [{
    key: 'setPressed',
    value: function setPressed(boolean) {
      this.pressed = boolean;
    }
  }, {
    key: 'setDeepPressed',
    value: function setDeepPressed(boolean) {
      this.deepPressed = boolean;
    }
  }, {
    key: 'isPressed',
    value: function isPressed() {
      return this.pressed;
    }
  }, {
    key: 'isDeepPressed',
    value: function isDeepPressed() {
      return this.deepPressed;
    }
  }, {
    key: 'add',
    value: function add(event, set) {
      this.el.addEventListener(event, set, false);
    }
  }, {
    key: 'runClosure',
    value: function runClosure(method) {
      if (method in this.block) {
        // call the closure method and apply nth arguments if they exist
        this.block[method].apply(this.el, Array.prototype.slice.call(arguments, 1));
      }
    }
  }, {
    key: 'fail',
    value: function fail(event, runKey) {
      if (Config.get('polyfill', this.options)) {
        if (this.runKey === runKey) {
          this.runPolyfill(event);
        }
      } else {
        this.runClosure('unsupported', event);
      }
    }
  }, {
    key: 'bindUnsupportedEvent',
    value: function bindUnsupportedEvent() {
      var _this = this;

      this.add(supportsTouch ? 'touchstart' : 'mousedown', function (event) {
        return _this.runClosure('unsupported', event);
      });
    }
  }, {
    key: '_startPress',
    value: function _startPress(event) {
      if (this.isPressed() === false) {
        this.runningPolyfill = false;
        this.setPressed(true);
        this.runClosure('start', event);
      }
    }
  }, {
    key: '_startDeepPress',
    value: function _startDeepPress(event) {
      if (this.isPressed() && this.isDeepPressed() === false) {
        this.setDeepPressed(true);
        this.runClosure('startDeepPress', event);
      }
    }
  }, {
    key: '_changePress',
    value: function _changePress(force, event) {
      this.nativeSupport = true;
      this.runClosure('change', force, event);
    }
  }, {
    key: '_endDeepPress',
    value: function _endDeepPress() {
      if (this.isPressed() && this.isDeepPressed()) {
        this.setDeepPressed(false);
        this.runClosure('endDeepPress');
      }
    }
  }, {
    key: '_endPress',
    value: function _endPress() {
      if (this.runningPolyfill === false) {
        if (this.isPressed()) {
          this._endDeepPress();
          this.setPressed(false);
          this.runClosure('end');
        }
        this.runKey = Math.random();
        this.nativeSupport = false;
      } else {
        this.setPressed(false);
      }
    }
  }, {
    key: 'deepPress',
    value: function deepPress(force, event) {
      force >= 0.5 ? this._startDeepPress(event) : this._endDeepPress();
    }
  }, {
    key: 'runPolyfill',
    value: function runPolyfill(event) {
      this.increment = Config.get('polyfillSpeedUp', this.options) === 0 ? 1 : 10 / Config.get('polyfillSpeedUp', this.options);
      this.decrement = Config.get('polyfillSpeedDown', this.options) === 0 ? 1 : 10 / Config.get('polyfillSpeedDown', this.options);
      this.setPressed(true);
      this.runClosure('start', event);
      if (this.runningPolyfill === false) {
        this.loopPolyfillForce(0, event);
      }
    }
  }, {
    key: 'loopPolyfillForce',
    value: function loopPolyfillForce(force, event) {
      if (this.nativeSupport === false) {
        if (this.isPressed()) {
          this.runningPolyfill = true;
          force = force + this.increment > 1 ? 1 : force + this.increment;
          this.runClosure('change', force, event);
          this.deepPress(force, event);
          setTimeout(this.loopPolyfillForce.bind(this, force, event), 10);
        } else {
          force = force - this.decrement < 0 ? 0 : force - this.decrement;
          if (force < 0.5 && this.isDeepPressed()) {
            this.setDeepPressed(false);
            this.runClosure('endDeepPress');
          }
          if (force === 0) {
            this.runningPolyfill = false;
            this.setPressed(true);
            this._endPress();
          } else {
            this.runClosure('change', force, event);
            this.deepPress(force, event);
            setTimeout(this.loopPolyfillForce.bind(this, force, event), 10);
          }
        }
      }
    }
  }]);

  return Adapter;
}();

/*
This adapter is for Macs with Force Touch trackpads.
*/

var AdapterForceTouch = function (_Adapter) {
  _inherits(AdapterForceTouch, _Adapter);

  function AdapterForceTouch(el, block, options) {
    _classCallCheck(this, AdapterForceTouch);

    return _possibleConstructorReturn(this, (AdapterForceTouch.__proto__ || Object.getPrototypeOf(AdapterForceTouch)).call(this, el, block, options));
  }

  _createClass(AdapterForceTouch, [{
    key: 'bindEvents',
    value: function bindEvents() {
      this.add('webkitmouseforcewillbegin', this._startPress.bind(this));
      this.add('mousedown', this.support.bind(this));
      this.add('webkitmouseforcechanged', this.change.bind(this));
      this.add('webkitmouseforcedown', this._startDeepPress.bind(this));
      this.add('webkitmouseforceup', this._endDeepPress.bind(this));
      this.add('mouseleave', this._endPress.bind(this));
      this.add('mouseup', this._endPress.bind(this));
    }
  }, {
    key: 'support',
    value: function support(event) {
      if (this.isPressed() === false) {
        this.fail(event, this.runKey);
      }
    }
  }, {
    key: 'change',
    value: function change(event) {
      if (this.isPressed() && event.webkitForce > 0) {
        this._changePress(this.normalizeForce(event.webkitForce), event);
      }
    }

    // make the force the standard 0 to 1 scale and not the 1 to 3 scale

  }, {
    key: 'normalizeForce',
    value: function normalizeForce(force) {
      return this.reachOne(map(force, 1, 3, 0, 1));
    }

    // if the force value is above 0.995 set the force to 1

  }, {
    key: 'reachOne',
    value: function reachOne(force) {
      return force > 0.995 ? 1 : force;
    }
  }]);

  return AdapterForceTouch;
}(Adapter);

/*
This adapter is more mobile devices that support 3D Touch.
*/

var Adapter3DTouch = function (_Adapter2) {
  _inherits(Adapter3DTouch, _Adapter2);

  function Adapter3DTouch(el, block, options) {
    _classCallCheck(this, Adapter3DTouch);

    return _possibleConstructorReturn(this, (Adapter3DTouch.__proto__ || Object.getPrototypeOf(Adapter3DTouch)).call(this, el, block, options));
  }

  _createClass(Adapter3DTouch, [{
    key: 'bindEvents',
    value: function bindEvents() {
      if (supportsTouchForceChange) {
        this.add('touchforcechange', this.start.bind(this));
        this.add('touchstart', this.support.bind(this, 0));
        this.add('touchend', this._endPress.bind(this));
      } else {
        this.add('touchstart', this.startLegacy.bind(this));
        this.add('touchend', this._endPress.bind(this));
      }
    }
  }, {
    key: 'start',
    value: function start(event) {
      if (event.touches.length > 0) {
        this._startPress(event);
        this.touch = this.selectTouch(event);
        if (this.touch) {
          this._changePress(this.touch.force, event);
        }
      }
    }
  }, {
    key: 'support',
    value: function support(iter, event) {
      var runKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.runKey;

      if (this.isPressed() === false) {
        if (iter <= 6) {
          iter++;
          setTimeout(this.support.bind(this, iter, event, runKey), 10);
        } else {
          this.fail(event, runKey);
        }
      }
    }
  }, {
    key: 'startLegacy',
    value: function startLegacy(event) {
      this.initialForce = event.touches[0].force;
      this.supportLegacy(0, event, this.runKey, this.initialForce);
    }

    // this checks up to 6 times on a touch to see if the touch can read a force value
    // if the force value has changed it means the device supports pressure
    // more info from this issue https://github.com/yamartino/pressure/issues/15

  }, {
    key: 'supportLegacy',
    value: function supportLegacy(iter, event, runKey, force) {
      if (force !== this.initialForce) {
        this._startPress(event);
        this.loopForce(event);
      } else if (iter <= 6) {
        iter++;
        setTimeout(this.supportLegacy.bind(this, iter, event, runKey, force), 10);
      } else {
        this.fail(event, runKey);
      }
    }
  }, {
    key: 'loopForce',
    value: function loopForce(event) {
      if (this.isPressed()) {
        this.touch = this.selectTouch(event);
        setTimeout(this.loopForce.bind(this, event), 10);
        this._changePress(this.touch.force, event);
      }
    }

    // link up the touch point to the correct element, this is to support multitouch

  }, {
    key: 'selectTouch',
    value: function selectTouch(event) {
      if (event.touches.length === 1) {
        return this.returnTouch(event.touches[0], event);
      } else {
        for (var i = 0; i < event.touches.length; i++) {
          // if the target press is on this element
          if (event.touches[i].target === this.el || this.el.contains(event.touches[i].target)) {
            return this.returnTouch(event.touches[i], event);
          }
        }
      }
    }

    // return the touch and run a start or end for deep press

  }, {
    key: 'returnTouch',
    value: function returnTouch(touch, event) {
      this.deepPress(touch.force, event);
      return touch;
    }
  }]);

  return Adapter3DTouch;
}(Adapter);

/*
This adapter is for devices that support pointer events.
*/

var AdapterPointer = function (_Adapter3) {
  _inherits(AdapterPointer, _Adapter3);

  function AdapterPointer(el, block, options) {
    _classCallCheck(this, AdapterPointer);

    return _possibleConstructorReturn(this, (AdapterPointer.__proto__ || Object.getPrototypeOf(AdapterPointer)).call(this, el, block, options));
  }

  _createClass(AdapterPointer, [{
    key: 'bindEvents',
    value: function bindEvents() {
      this.add('pointerdown', this.support.bind(this));
      this.add('pointermove', this.change.bind(this));
      this.add('pointerup', this._endPress.bind(this));
      this.add('pointerleave', this._endPress.bind(this));
    }
  }, {
    key: 'support',
    value: function support(event) {
      if (this.isPressed() === false) {
        if (event.pressure === 0 || event.pressure === 0.5 || event.pressure > 1) {
          this.fail(event, this.runKey);
        } else {
          this._startPress(event);
          this._changePress(event.pressure, event);
        }
      }
    }
  }, {
    key: 'change',
    value: function change(event) {
      if (this.isPressed() && event.pressure > 0 && event.pressure !== 0.5) {
        this._changePress(event.pressure, event);
        this.deepPress(event.pressure, event);
      }
    }
  }]);

  return AdapterPointer;
}(Adapter);

// This class holds the states of the the Pressure config


var Config = {

  // 'false' will make polyfill not run when pressure is not supported and the 'unsupported' method will be called
  polyfill: true,

  // milliseconds it takes to go from 0 to 1 for the polyfill
  polyfillSpeedUp: 1000,

  // milliseconds it takes to go from 1 to 0 for the polyfill
  polyfillSpeedDown: 0,

  // 'true' prevents the selecting of text and images via css properties
  preventSelect: true,

  // 'touch', 'mouse', or 'pointer' will make it run only on that type of device
  only: null,

  // this will get the correct config / option settings for the current pressure check
  get: function get(option, options) {
    return options.hasOwnProperty(option) ? options[option] : this[option];
  },


  // this will set the global configs
  set: function set(options) {
    for (var k in options) {
      if (options.hasOwnProperty(k) && this.hasOwnProperty(k) && k != 'get' && k != 'set') {
        this[k] = options[k];
      }
    }
  }
};

//------------------- Helpers -------------------//

// accepts jQuery object, node list, string selector, then called a setup for each element
var loopPressureElements = function loopPressureElements(selector, closure) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  // if a string is passed in as an element
  if (typeof selector === 'string' || selector instanceof String) {
    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
      new Element(elements[i], closure, options);
    }
    // if a single element object is passed in
  } else if (isElement(selector)) {
    new Element(selector, closure, options);
    // if a node list is passed in ex. jQuery $() object
  } else {
    for (var i = 0; i < selector.length; i++) {
      new Element(selector[i], closure, options);
    }
  }
};

//Returns true if it is a DOM element
var isElement = function isElement(o) {
  return (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === "object" ? o instanceof HTMLElement : //DOM2
  o && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
};

// the map method allows for interpolating a value from one range of values to another
// example from the Arduino documentation: https://www.arduino.cc/en/Reference/Map
var map = function map(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

var supportsMouse = false;
var supportsTouch = false;
var supportsPointer = false;
var supportsTouchForce = false;
var supportsTouchForceChange = false;

if (typeof window !== 'undefined') {
  // only attempt to assign these in a browser environment.
  // on the server, this is a no-op, like the rest of the library
  if (typeof Touch !== 'undefined') {
    // In Android, new Touch requires arguments.
    try {
      if (Touch.prototype.hasOwnProperty('force') || 'force' in new Touch()) {
        supportsTouchForce = true;
      }
    } catch (e) {}
  }
  supportsTouch = 'ontouchstart' in window.document && supportsTouchForce;
  supportsMouse = 'onmousemove' in window.document && !supportsTouch;
  supportsPointer = 'onpointermove' in window.document;
  supportsTouchForceChange = 'ontouchforcechange' in window.document;
}
return void 0;
}));
