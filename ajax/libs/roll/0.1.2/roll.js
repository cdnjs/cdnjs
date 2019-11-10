(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x13, _x14, _x15) { var _again = true; _function: while (_again) { var object = _x13, property = _x14, receiver = _x15; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x13 = parent; _x14 = property; _x15 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('events').EventEmitter;

/**
 * Roll simply keep tracks of steps' positions inside a viewport.
 * Apart from the static helper functions and the `scroll` function, a roll instance doesn't depend on DOM manipulation.
 * That means you can use a Roll instance in contexts other than DOM.
 */

var Roll = (function (_EventEmitter) {
  _inherits(Roll, _EventEmitter);

  /**
   * Create a new Roll.
   * @param viewSize viewport size (single dimension)
   */

  function Roll(viewSize) {
    _classCallCheck(this, Roll);

    _get(Object.getPrototypeOf(Roll.prototype), "constructor", this).call(this);

    this.viewportSize = viewSize;
    this.paneSize = 0;

    // store the steps object {y1, y2, size, pad}, See Roll.chunk
    this.steps = [];

    this.pos = 0; // current position
    this.current = 0; // current step
    this.last = -1; // last step

    this.movingInterval = -1;
  }

  /**
   * Add a step object. You can also use Roll.chunk() static helper function to create a step object easily.
   * @param s an object with {p1, p2, size, pad} properties, or an array of steps object
   * @returns {Roll}
   */

  _createClass(Roll, [{
    key: "addStep",
    value: function addStep(s) {

      if (!Array.isArray(s)) {
        s = [s];
      }

      // get last recorded step
      var d = s[0].p1;
      if (this.steps.length > 0) {
        var last = this.steps[this.steps.length - 1];
        d = last.p2 + last.pad;
      }

      // append new steps
      for (var i = 0; i < s.length; i++) {
        s[i].p1 = d;
        s[i].p2 = s[i].p1 + s[i].size;
        d = s[i].p2 + s[i].pad;
        this.steps.push(s[i]);
      }

      // recalculate pane size
      this.getHeight(true);

      return this;
    }

    /**
     * Get step by index
     * @param index
     */
  }, {
    key: "getStepAt",
    value: function getStepAt(index) {
      return this.steps[Math.max(0, Math.min(this.steps.length - 1, index))];
    }

    /**
     * Calculate and return current step. When padding > 0, step will be -1 when current progress is on the padding area. This allows you to check progress against padding.
     * @returns {number}
     */
  }, {
    key: "getStep",
    value: function getStep() {
      for (var i = 0; i < this.steps.length; i++) {
        var st = this.steps[i];
        if (st.p1 >= -this.viewportSize && st.p2 <= st.size) {
          this.current = i;
          return i;
        }
      }
      return -1;
    }

    /**
     * Get current progress within the current step
     * @returns 0-1 if step.pad is 0. Otherwise it will range from negative to positive.
     */
  }, {
    key: "getStepProgress",
    value: function getStepProgress() {
      var curr = this.steps[this.current];
      return 1 - curr.p2 / curr.size;
    }

    /**
     * Get current position
     * @returns {number|*}
     */
  }, {
    key: "getPosition",
    value: function getPosition() {
      return this.pos;
    }

    /**
     * Get total height of the pane (including padding)
     * @returns {*}
     */
  }, {
    key: "getHeight",
    value: function getHeight() {
      var recalc = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      if (recalc) this.paneSize = this.steps.reduce(function (a, b) {
        return a + b.size + b.pad;
      }, 0);
      return this.paneSize;
    }

    /**
     * Get viewport's height (same as this.viewportSize)
     * @returns {*}
     */
  }, {
    key: "getViewportHeight",
    value: function getViewportHeight() {
      return this.viewportSize;
    }

    /**
     * Move the roll. This will emit two events `roll(step, currProgress, currPosition, totalProgress)` and `step(curr, last)`
     * @param pos new position
     * @returns {Roll}
     */
  }, {
    key: "move",
    value: function move(pos) {
      var last = this.pos;
      this.pos = -pos;
      var diff = this.pos - last;

      for (var i = 0; i < this.steps.length; i++) {
        var s = this.steps[i];
        s.p1 += diff;
        s.p2 = s.p1 + s.size;
      }

      var curr = this.getStep();
      var progress = this.getStepProgress();
      this.emit("roll", curr, progress, pos, pos / (this.paneSize - this.viewportSize));

      if (curr != this.last && curr >= 0) {
        this.emit("step", curr, this.last, this.viewportSize);
        this.last = curr;
      }

      return this;
    }

    /**
     * Animated scrolling a DOM element
     * @param index step index
     * @param scrollPane a DOM element with scrolling (overflow-y).
     * @param speed optional speed of animated scroll. Defaults to 0.1. Larger is faster
     * @param isVertical optional boolean to indicate horizontal or vertical scroll
     */
  }, {
    key: "scroll",
    value: function scroll(index, scrollPane) {
      var _this = this;

      var speed = arguments.length <= 2 || arguments[2] === undefined ? 0.1 : arguments[2];
      var isVertical = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

      if (!scrollPane || scrollPane.scrollTop == null) throw "scrollPane parameter requires a DOM element with scrollTop property";
      clearInterval(this.movingInterval);
      var _temp = Number.NEGATIVE_INFINITY;
      var dir = isVertical ? "scrollTop" : "scrollLeft";

      this.movingInterval = setInterval(function () {
        var target = _this.getStepAt(index);
        var d = (target.p1 + target.size / 4) * speed;
        scrollPane[dir] += d;
        if (Math.abs(d) < 1 || _temp === scrollPane[dir]) clearInterval(_this.movingInterval);
        _temp = scrollPane[dir];
      }, 17);
    }

    /**
     * A convenient static function to create a step object
     * @param size chunk size
     * @param pad optional padding (default to 0)
     * @returns {{p1: number, p2: *, size: *, pad: number}}
     */
  }], [{
    key: "chunk",
    value: function chunk(size) {
      var pad = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      return {
        p1: 0,
        p2: size,
        size: size,
        pad: pad
      };
    }

    /**
     * A convenient static function to compare a step with current step, and transform it to a name
     * @param step the step to check
     * @param currStep current step
     * @param prev optional class name for step is < currStep. Defaults to "prev"
     * @param next optional class name for step is > currStep. Defaults to "next"
     * @param match optional class name for step = currStep. Defaults to "curr"
     * @returns {string}
     */
  }, {
    key: "stepName",
    value: function stepName(step, currStep) {
      var prev = arguments.length <= 2 || arguments[2] === undefined ? "prev" : arguments[2];
      var next = arguments.length <= 3 || arguments[3] === undefined ? "next" : arguments[3];
      var match = arguments.length <= 4 || arguments[4] === undefined ? "curr" : arguments[4];

      return step === currStep ? match : step < currStep ? prev : next;
    }

    /**
     * Static helper to get a handle function for Roll's "step" event. The handler function will add class names to each step element based on current step value.
     * @param roll a Roll instance
     * @param views a list of DOM elements which are the steps
     * @param prev optional class name for step is < currStep. Defaults to "prev"
     * @param next optional class name for step is > currStep. Defaults to "next"
     * @param match optional class name for step = currStep. Defaults to "curr"
     * @returns {Function}
     */
  }, {
    key: "stepHandler",
    value: function stepHandler(roll, views) {
      var prev = arguments.length <= 2 || arguments[2] === undefined ? "prev" : arguments[2];
      var next = arguments.length <= 3 || arguments[3] === undefined ? "next" : arguments[3];
      var match = arguments.length <= 4 || arguments[4] === undefined ? "curr" : arguments[4];
      var trackTopPos = arguments.length <= 5 || arguments[5] === undefined ? false : arguments[5];

      return function (curr, last, viewportHeight) {
        for (var i = 0; i < roll.steps.length; i++) {
          var cls = Roll.stepName(i, curr, prev, next, match);
          views[i].className = "step " + cls;

          // if steps have different sizes, recalc top position and set style
          if (trackTopPos) {
            var p = cls === prev ? roll.steps[i].size * -1 : cls === next ? viewportHeight : 0;
            views[i].style.top = p + "px";
          }
        }
      };
    }

    /**
     * Static method to create a Roll instance with DOM elements
     * @param viewPortID id of viewport element, which is the parent of the viewPane. eg, "#viewport"
     * @param viewPaneID id of view pane element, eg, "#pane"
     * @param viewBox id of view box element, which is the parent the viewClass elements. eg, "#steps"
     * @param viewClass id of each step or slide element, eg, ".step"
     * @param pad optional padding between steps. Defaults to 0.
     * @returns the roll instance which you can listen for "step" and "roll" event via `roll.on(...)`
     */
  }, {
    key: "DOM",
    value: function DOM(viewPortID, viewPaneID, viewBoxID, viewClass) {
      var pad = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

      var viewport = document.querySelector(viewPortID);
      var viewpane = viewport.querySelector(viewPaneID);
      var viewbox = document.querySelector(viewBoxID);
      var views = viewbox.querySelectorAll(viewClass);

      if (!viewport || !viewpane) throw "Cannot find " + viewPortID + " or " + viewPaneID + " element id.";
      if (!viewClass) throw "Cannot find " + viewClass + " element class name";

      // create roll instance based on viewport element height
      var roll = new Roll(viewport.getBoundingClientRect().height);

      // add each viewClass element as a step
      for (var i = 0; i < views.length; i++) {
        var rect = views[i].getBoundingClientRect();
        roll.addStep(Roll.chunk(rect.height, pad));
      }

      // update viewpane height based on steps
      viewpane.style.height = roll.getHeight() + "px";

      // update viewbox width to account for scrollbar
      viewbox.style.width = viewpane.getBoundingClientRect().width + "px";

      // track scroll
      viewport.addEventListener("scroll", function (evt) {
        roll.move(viewport.scrollTop);
      });

      return roll;
    }
  }]);

  return Roll;
})(EventEmitter);

exports["default"] = Roll;
module.exports = exports["default"];

},{"events":1}],3:[function(require,module,exports){
"use strict";

var Roll = require("./roll.js");

if (window) window.Roll = Roll;

},{"./roll.js":2}]},{},[3])


//# sourceMappingURL=roll.js.map
