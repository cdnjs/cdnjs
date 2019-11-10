// Pressure v0.0.3 | Created By Stuart Yamartino | MIT License | 2015-2016 
;(function(window) {
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// set global document to the library
var document = window !== false ? window.document : false;

//--------------------- Public API Section ---------------------//
// this is the start of the Pressure Object, this is the only object that is accessible to the end user
// only the methods in this object can be called, making it the "public api"
var Pressure = {

  // targets any device with Force of 3D Touch

  set: function set(selector, closure, css) {
    loopPressureElements(selector, closure, null, css);
  },

  // targets ONLY devices with Force Touch
  setForceTouch: function setForceTouch(selector, closure, css) {
    loopPressureElements(selector, closure, 'force', css);
  },

  // targets ONLY devices with 3D touch
  set3DTouch: function set3DTouch(selector, closure, css) {
    loopPressureElements(selector, closure, '3d', css);
  },

  // the map method allows for interpolating a value from one range of values to another
  // example from the Arduino documentation: https://www.arduino.cc/en/Reference/Map
  map: function map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
};

var Element = (function () {
  function Element(element, block, type) {
    _classCallCheck(this, Element);

    this.element = element;
    this.block = block;
    this.type = type;
  }

  _createClass(Element, [{
    key: 'routeEvents',
    value: function routeEvents() {
      // if on desktop and requesting Force Touch or not requesting 3D Touch
      if (Support.mobile === false && (this.type === 'force' || this.type !== '3d')) {
        this.touchForceAdapter();
      }
      // if on mobile and requesting 3D Touch or not requestion Force Touch
      else if (Support.mobile === true && (this.type === '3d' || this.type !== 'force')) {
          this.touch3DAdapter();
        }
        // if it is requesting a type and your browser is of other type
        else {
            this.failEvents();
          }
    }
  }, {
    key: 'touchForceAdapter',
    value: function touchForceAdapter() {
      var adapter = new Adapter(new TouchForceAdapter(this));
      adapter.handle();
    }
  }, {
    key: 'touch3DAdapter',
    value: function touch3DAdapter() {
      var adapter = new Adapter(new Touch3DAdapter(this));
      adapter.handle();
    }
  }, {
    key: 'failEvents',
    value: function failEvents() {
      var _this = this;

      if (Support.mobile) {
        this.element.addEventListener('touchstart', function () {
          return runClosure(_this.block, 'unsupported', _this.element);
        }, false);
      } else {
        this.element.addEventListener('mousedown', function () {
          return runClosure(_this.block, 'unsupported', _this.element);
        }, false);
      }
    }
  }]);

  return Element;
})();

var Adapter = (function () {
  function Adapter(adapter) {
    _classCallCheck(this, Adapter);

    this.adapter = adapter;
  }

  _createClass(Adapter, [{
    key: 'handle',
    value: function handle() {
      this.adapter.support();

      this.adapter.start();
      this.adapter.change();
      this.adapter.end();
      this.adapter.startDeepPress();
      this.adapter.endDeepPress();
    }
  }]);

  return Adapter;
})();

var BaseAdapter = (function () {
  function BaseAdapter(element) {
    _classCallCheck(this, BaseAdapter);

    this.element = element;
    this.el = element.element;
    this.block = element.block;
    this.down = false;
    this.deepDown = false;
  }

  _createClass(BaseAdapter, [{
    key: 'add',
    value: function add(event, set) {
      this.el.addEventListener(event, set, false);
    }
  }, {
    key: 'remove',
    value: function remove(event, set) {
      this.el.removeEventListener(event, set);
    }
  }, {
    key: '_dispatch',
    value: function _dispatch() {
      if (!Support.forPressure) {
        Support.didFail();
        runClosure(this.block, 'unsupported', this.el);
      } else {
        this.remove('webkitmouseforcewillbegin', this._touchForceEnabled);
      }
    }
  }, {
    key: '_setDown',
    value: function _setDown() {
      this.down = true;
    }
  }, {
    key: '_setUp',
    value: function _setUp() {
      this.down = false;
    }
  }, {
    key: '_setDeepDown',
    value: function _setDeepDown() {
      this.deepDown = true;
    }
  }, {
    key: '_setDeepUp',
    value: function _setDeepUp() {
      this.deepDown = false;
    }
  }]);

  return BaseAdapter;
})();

var Touch3DAdapter = (function (_BaseAdapter) {
  _inherits(Touch3DAdapter, _BaseAdapter);

  function Touch3DAdapter(element) {
    _classCallCheck(this, Touch3DAdapter);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Touch3DAdapter).call(this, element));

    _this2.startDeepPressSetEnabled = false;
    _this2.endDeepPressSetEnabled = false;
    return _this2;
  }

  _createClass(Touch3DAdapter, [{
    key: 'support',
    value: function support() {
      this.supportMethod = this._middleMan.bind(this);
      this.add('touchstart', this.supportMethod);
    }
  }, {
    key: '_middleMan',
    value: function _middleMan(event) {
      this._setDown();
      this._dispatch(0, event);
    }
  }, {
    key: '_dispatch',
    value: function _dispatch(iter, event) {
      // this checks up to 10 times on a touch to see if the touch can read a force value or not to get "support"
      if (Support.hasRun === false) {
        if (event.touches[0].force > 0) {
          Support.didSucceed('3d');
          this.remove('touchstart', this.supportMethod);
          runClosure(this.block, 'start', this.el);
          this._changeLogic(event);
        } else if (iter <= 10 && this.down === true) {
          iter += 1;
          setTimeout(this._dispatch.bind(this), 10, iter, event);
        } else if (this.down === true) {
          Support.didFail();
          runClosure(this.block, 'unsupported', this.el);
        }
      } else if (Support.forPressure) {
        this.remove('touchstart', this.supportMethod);
      } else {
        runClosure(this.block, 'unsupported', this.el);
      }
    }
  }, {
    key: 'start',
    value: function start() {
      var _this3 = this;

      // call 'start' when the touch goes down
      this.add('touchstart', function () {
        if (Support.forPressure) {
          _this3._setDown();
          runClosure(_this3.block, 'start', _this3.el);
        }
      });
    }
  }, {
    key: 'change',
    value: function change() {
      this.add('touchstart', this._changeLogic.bind(this));
    }
  }, {
    key: '_changeLogic',
    value: function _changeLogic(event) {
      if (Support.forPressure) {
        this._setDown();
        // set touch event
        this.touch = this._selectTouch(event);
        if (this.touch) {
          this._fetchForce(event);
        }
      }
    }
  }, {
    key: 'end',
    value: function end() {
      var _this4 = this;

      // call 'end' when the touch goes up
      this.add('touchend', function () {
        if (Support.forPressure) {
          _this4._setUp();
          runClosure(_this4.block, 'end', _this4.el);
          if (_this4.deepDown === true) {
            runClosure(_this4.block, 'endDeepPress', _this4.el);
            _this4._setDeepUp();
          }
        }
      });
    }
  }, {
    key: 'startDeepPress',
    value: function startDeepPress() {
      this.startDeepPressSetEnabled = true;
      // the logic for this runs in the '_callStartDeepPress' method
    }
  }, {
    key: 'endDeepPress',
    value: function endDeepPress() {
      this.endDeepPressSetEnabled = true;
      // the logic for this runs in the '_callEndDeepPress' method
    }
  }, {
    key: '_callStartDeepPress',
    value: function _callStartDeepPress() {
      if (this.startDeepPressSetEnabled === true && this.deepDown === false) {
        runClosure(this.block, 'startDeepPress', this.el);
      }
      this._setDeepDown();
    }
  }, {
    key: '_callEndDeepPress',
    value: function _callEndDeepPress() {
      if (this.endDeepPressSetEnabled === true && this.deepDown === true) {
        runClosure(this.block, 'endDeepPress', this.el);
      }
      this._setDeepUp();
    }
  }, {
    key: '_fetchForce',
    value: function _fetchForce(event) {
      if (this.down) {
        this.touch = this._selectTouch(event);
        setTimeout(this._fetchForce.bind(this), 10, event);
        runClosure(this.block, 'change', this.el, this.touch.force, event);
      }
    }

    // link up the touch point to the correct element, this is to support multitouch

  }, {
    key: '_selectTouch',
    value: function _selectTouch(event) {
      if (event.touches.length === 1) {
        event.touches[0].force >= 0.5 ? this._callStartDeepPress() : this._callEndDeepPress();
        return event.touches[0];
      }
      for (var i = 0; i < event.touches.length; i++) {
        if (event.touches[i].target === this.el) {
          // console.log(event.touches[i].force);
          event.touches[i].force >= 0.5 ? this._callStartDeepPress() : this._callEndDeepPress();
          return event.touches[i];
        }
      }
    }
  }]);

  return Touch3DAdapter;
})(BaseAdapter);

var TouchForceAdapter = (function (_BaseAdapter2) {
  _inherits(TouchForceAdapter, _BaseAdapter2);

  function TouchForceAdapter(element) {
    _classCallCheck(this, TouchForceAdapter);

    var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(TouchForceAdapter).call(this, element));

    _this5._preventDefaultForceTouch();
    return _this5;
  }

  // Support check methods

  _createClass(TouchForceAdapter, [{
    key: 'support',
    value: function support() {
      this.add('webkitmouseforcewillbegin', this._touchForceEnabled);
      this.add('mousedown', this._dispatch.bind(this));
    }
  }, {
    key: '_touchForceEnabled',
    value: function _touchForceEnabled(event) {
      event.preventDefault();
      Support.didSucceed('force');
    }
  }, {
    key: '_dispatch',
    value: function _dispatch() {
      if (Support.forPressure === false) {
        Support.didFail();
        runClosure(this.block, 'unsupported', this.el);
      } else {
        this.remove('webkitmouseforcewillbegin', this._touchForceEnabled);
      }
    }
  }, {
    key: 'start',
    value: function start() {
      var _this6 = this;

      // call 'start' when the mouse goes down
      this.add('mousedown', function () {
        if (Support.forPressure) {
          _this6._setDown();
          runClosure(_this6.block, 'start', _this6.el);
        }
      });
    }
  }, {
    key: 'change',
    value: function change() {
      var _this7 = this;

      this.add('webkitmouseforcechanged', function (event) {
        if (Support.forPressure && event.webkitForce !== 0) {
          runClosure(_this7.block, 'change', _this7.el, _this7._normalizeForce(event.webkitForce), event);
        }
      });
    }
  }, {
    key: 'end',
    value: function end() {
      var _this8 = this;

      // call 'end' when the mouse goes up or leaves the element
      this.add('mouseup', function () {
        if (Support.forPressure) {
          _this8._setUp();
          runClosure(_this8.block, 'end', _this8.el);
        }
      });
      this.add('mouseleave', function () {
        if (Support.forPressure) {
          if (_this8.down === true) {
            runClosure(_this8.block, 'end', _this8.el);
            runClosure(_this8.block, 'endDeepPress', _this8.el);
          }
          _this8._setUp();
        }
      });
    }
  }, {
    key: 'startDeepPress',
    value: function startDeepPress() {
      var _this9 = this;

      this.add('webkitmouseforcedown', function () {
        if (Support.forPressure) {
          _this9._setDeepDown();
          runClosure(_this9.block, 'startDeepPress', _this9.el);
        }
      });
    }
  }, {
    key: 'endDeepPress',
    value: function endDeepPress() {
      var _this10 = this;

      this.add('webkitmouseforceup', function () {
        if (Support.forPressure) {
          _this10._setDeepUp();
          runClosure(_this10.block, 'endDeepPress', _this10.el);
        }
      });
    }
  }, {
    key: '_preventDefaultForceTouch',
    value: function _preventDefaultForceTouch() {
      // prevent the default force touch action for bound elements
      this.add('webkitmouseforcewillbegin', function (event) {
        if (Support.forPressure) {
          event.preventDefault();
        }
      });
    }

    // make the force the standard 0 to 1 scale and not the 1 to 3 scale

  }, {
    key: '_normalizeForce',
    value: function _normalizeForce(force) {
      return (force - 1) / 2;
    }
  }]);

  return TouchForceAdapter;
})(BaseAdapter);

// This class holds the states of the the Pressure support the user has

var Support = {

  hasRun: false,

  forPressure: false,

  type: false,

  didFail: function didFail() {
    this.hasRun = true;
    this.forPressure = false;
  },
  didSucceed: function didSucceed(type) {
    this.hasRun = true;
    this.forPressure = true;
    this.type = type;
  }
};

//------------------- Helpers Section -------------------//

var loopPressureElements = function loopPressureElements(selector, closure, type) {
  var css = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

  // if a string is passed in as an element
  if (typeof selector === 'string' || selector instanceof String) {
    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
      runPressureElement(elements[i], closure, type, css);
    }
    // if an element object is passed in
  } else if (isElement(selector)) {
      runPressureElement(selector, closure, type, css);
      // if a node list is passed in ex. jQuery $() object
    } else {
        for (var i = 0; i < selector.length; i++) {
          runPressureElement(selector[i], closure, type, css);
        }
      }
};

var runPressureElement = function runPressureElement(element, closure, type, css) {
  if (css) {
    element.style.webkitUserSelect = "none";
    // elements[i].style.cursor = "pointer";
  }
  var el = new Element(element, closure, type);
  el.routeEvents();
};

//Returns true if it is a DOM element
var isElement = function isElement(o) {
  return (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === "object" ? o instanceof HTMLElement : //DOM2
  o && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
};

// run the closure if the property exists in the object
var runClosure = function runClosure(closure, method, element) {
  if (closure.hasOwnProperty(method)) {
    // call the closure method and apply nth arguments if they exist
    closure[method].apply(element || this, Array.prototype.slice.call(arguments, 3));
  }
};

// Check if the device is mobile or desktop
Support.mobile = 'ontouchstart' in document;

// Assign the Pressure object to the global object (or module for npm) so it can be called from inside the self executing anonymous function
if (window !== false) {
  if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    // For CommonJS and CommonJS-like environments where a proper `window`
    // is present, execute Pressure.
    // For environments that do not have a `window` with a `document`
    // (such as Node.js) Pressure does not work
    module.exports = Pressure;
  } else {
    window.Pressure = Pressure;
  }
} else {
  throw new Error("Pressure requires a window with a document");
}
}(typeof window !== "undefined" ? window : false));
