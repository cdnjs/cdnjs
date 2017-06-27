!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Slideout=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Module dependencies
 */
var decouple = require('decouple');
var Emitter = require('emitter');

/**
 * Privates
 */
var scrollTimeout;
var scrolling = false;
var doc = window.document;
var html = doc.documentElement;
var msPointerSupported = window.navigator.msPointerEnabled;
var touch = {
  'start': msPointerSupported ? 'MSPointerDown' : 'touchstart',
  'move': msPointerSupported ? 'MSPointerMove' : 'touchmove',
  'end': msPointerSupported ? 'MSPointerUp' : 'touchend'
};
var prefix = (function prefix() {
  var regex = /^(Webkit|Khtml|Moz|ms|O)(?=[A-Z])/;
  var styleDeclaration = doc.getElementsByTagName('script')[0].style;
  for (var prop in styleDeclaration) {
    if (regex.test(prop)) {
      return '-' + prop.match(regex)[0].toLowerCase() + '-';
    }
  }
  // Nothing found so far? Webkit does not enumerate over the CSS properties of the style object.
  // However (prop in style) returns the correct value, so we'll have to test for
  // the precence of a specific property
  if ('WebkitOpacity' in styleDeclaration) { return '-webkit-'; }
  if ('KhtmlOpacity' in styleDeclaration) { return '-khtml-'; }
  return '';
}());
function extend(destination, from) {
  for (var prop in from) {
    if (from[prop]) {
      destination[prop] = from[prop];
    }
  }
  return destination;
}
function inherits(child, uber) {
  child.prototype = extend(child.prototype || {}, uber.prototype);
}

/**
 * Slideout constructor
 */
function Slideout(options) {
  options = options || {};

  // Sets default values
  this._startOffsetX = 0;
  this._currentOffsetX = 0;
  this._opening = false;
  this._moved = false;
  this._opened = false;
  this._preventOpen = false;
  this._touch = options.touch === undefined ? true : options.touch && true;

  // Sets panel
  this.panel = options.panel;
  this.menu = options.menu;

  // Sets  classnames
  this.panel.className += ' slideout-panel';
  this.menu.className += ' slideout-menu';

  // Sets options
  this._fx = options.fx || 'ease';
  this._duration = parseInt(options.duration, 10) || 300;
  this._tolerance = parseInt(options.tolerance, 10) || 70;
  this._padding = parseInt(options.padding, 10) || 256;

  // Init touch events
  if(this._touch) {
    this._initTouchEvents();
  }
}

/**
 * Inherits from Emitter
 */
inherits(Slideout, Emitter);

/**
 * Opens the slideout menu.
 */
Slideout.prototype.open = function() {
  var self = this;
  this.emit('beforeopen');
  if (html.className.search('slideout-open') === -1) { html.className += ' slideout-open'; }
  this._setTransition();
  this._translateXTo(this._padding);
  this._opened = true;
  setTimeout(function() {
    self.panel.style.transition = self.panel.style['-webkit-transition'] = '';
    self.emit('open');
  }, this._duration + 50);
  return this;
};

/**
 * Closes slideout menu.
 */
Slideout.prototype.close = function() {
  var self = this;
  if (!this.isOpen() && !this._opening) { return this; }
  this.emit('beforeclose');
  this._setTransition();
  this._translateXTo(0);
  this._opened = false;
  setTimeout(function() {
    html.className = html.className.replace(/ slideout-open/, '');
    self.panel.style.transition = self.panel.style['-webkit-transition'] = self.panel.style[prefix + 'transform'] = self.panel.style.transform = '';
    self.emit('close');
  }, this._duration + 50);
  return this;
};

/**
 * Toggles (open/close) slideout menu.
 */
Slideout.prototype.toggle = function() {
  return this.isOpen() ? this.close() : this.open();
};

/**
 * Returns true if the slideout is currently open, and false if it is closed.
 */
Slideout.prototype.isOpen = function() {
  return this._opened;
};

/**
 * Translates panel and updates currentOffset with a given X point
 */
Slideout.prototype._translateXTo = function(translateX) {
  this._currentOffsetX = translateX;
  this.panel.style[prefix + 'transform'] = this.panel.style.transform = 'translate3d(' + translateX + 'px, 0, 0)';
};

/**
 * Set transition properties
 */
Slideout.prototype._setTransition = function() {
  this.panel.style[prefix + 'transition'] = this.panel.style.transition = prefix + 'transform ' + this._duration + 'ms ' + this._fx;
};

/**
 * Initializes touch event
 */
Slideout.prototype._initTouchEvents = function() {
  var self = this;

  /**
   * Decouple scroll event
   */
  decouple(doc, 'scroll', function() {
    if (!self._moved) {
      clearTimeout(scrollTimeout);
      scrolling = true;
      scrollTimeout = setTimeout(function() {
        scrolling = false;
      }, 250);
    }
  });

  /**
   * Prevents touchmove event if slideout is moving
   */
  doc.addEventListener(touch.move, function(eve) {
    if (self._moved) {
      eve.preventDefault();
    }
  });

  /**
   * Resets values on touchstart
   */
  this.panel.addEventListener(touch.start, function(eve) {

    if (typeof eve.touches === 'undefined') { return; }

    self._moved = false;
    self._opening = false;
    self._startOffsetX = eve.touches[0].pageX;
    self._preventOpen = (!self.isOpen() && self.menu.clientWidth !== 0);
  });

  /**
   * Resets values on touchcancel
   */
  this.panel.addEventListener('touchcancel', function() {
    self._moved = false;
    self._opening = false;
  });

  /**
   * Toggles slideout on touchend
   */
  this.panel.addEventListener(touch.end, function() {
    if (self._moved) {
      (self._opening && Math.abs(self._currentOffsetX) > self._tolerance) ? self.open() : self.close();
    }
    self._moved = false;
  });

  /**
   * Translates panel on touchmove
   */
  this.panel.addEventListener(touch.move, function(eve) {

    if (scrolling || self._preventOpen || typeof eve.touches === 'undefined') { return; }

    var dif_x = eve.touches[0].clientX - self._startOffsetX;
    var translateX = self._currentOffsetX = dif_x;

    if (Math.abs(translateX) > self._padding) { return; }

    if (Math.abs(dif_x) > 20) {
      self._opening = true;

      if (self._opened && dif_x > 0 || !self._opened && dif_x < 0) { return; }

      if (!self._moved && html.className.search('slideout-open') === -1) {
        html.className += ' slideout-open';
      }

      if (dif_x <= 0) {
        translateX = dif_x + self._padding;
        self._opening = false;
      }

      self.panel.style[prefix + 'transform'] = self.panel.style.transform = 'translate3d(' + translateX + 'px, 0, 0)';
      self.emit('translate', translateX);
      self._moved = true;
    }

  });

};

/**
 * Expose Slideout
 */
module.exports = Slideout;

},{"decouple":2,"emitter":3}],2:[function(require,module,exports){
'use strict';

var requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
}());

function decouple(node, event, fn) {
  var eve,
      tracking = false;

  function captureEvent(e) {
    eve = e;
    track();
  }

  function track() {
    if (!tracking) {
      requestAnimFrame(update);
      tracking = true;
    }
  }

  function update() {
    fn.call(node, eve);
    tracking = false;
  }

  node.addEventListener(event, captureEvent, false);
}

/**
 * Expose decouple
 */
module.exports = decouple;

},{}],3:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

exports.__esModule = true;
/**
 * Creates a new instance of Emitter.
 * @class
 * @returns {Object} Returns a new instance of Emitter.
 * @example
 * // Creates a new instance of Emitter.
 * var Emitter = require('emitter');
 *
 * var emitter = new Emitter();
 */

var Emitter = (function () {
  function Emitter() {
    _classCallCheck(this, Emitter);
  }

  /**
   * Adds a listener to the collection for the specified event.
   * @memberof! Emitter.prototype
   * @function
   * @param {String} event - The event name.
   * @param {Function} listener - A listener function to add.
   * @returns {Object} Returns an instance of Emitter.
   * @example
   * // Add an event listener to "foo" event.
   * emitter.on('foo', listener);
   */

  Emitter.prototype.on = function on(event, listener) {
    // Use the current collection or create it.
    this._eventCollection = this._eventCollection || {};

    // Use the current collection of an event or create it.
    this._eventCollection[event] = this._eventCollection[event] || [];

    // Appends the listener into the collection of the given event
    this._eventCollection[event].push(listener);

    return this;
  };

  /**
   * Adds a listener to the collection for the specified event that will be called only once.
   * @memberof! Emitter.prototype
   * @function
   * @param {String} event - The event name.
   * @param {Function} listener - A listener function to add.
   * @returns {Object} Returns an instance of Emitter.
   * @example
   * // Will add an event handler to "foo" event once.
   * emitter.once('foo', listener);
   */

  Emitter.prototype.once = function once(event, listener) {
    var self = this;

    function fn() {
      self.off(event, fn);
      listener.apply(this, arguments);
    }

    fn.listener = listener;

    this.on(event, fn);

    return this;
  };

  /**
   * Removes a listener from the collection for the specified event.
   * @memberof! Emitter.prototype
   * @function
   * @param {String} event - The event name.
   * @param {Function} listener - A listener function to remove.
   * @returns {Object} Returns an instance of Emitter.
   * @example
   * // Remove a given listener.
   * emitter.off('foo', listener);
   */

  Emitter.prototype.off = function off(event, listener) {

    var listeners = undefined;

    // Defines listeners value.
    if (!this._eventCollection || !(listeners = this._eventCollection[event])) {
      return this;
    }

    listeners.forEach(function (fn, i) {
      if (fn === listener || fn.listener === listener) {
        // Removes the given listener.
        listeners.splice(i, 1);
      }
    });

    // Removes an empty event collection.
    if (listeners.length === 0) {
      delete this._eventCollection[event];
    }

    return this;
  };

  /**
   * Execute each item in the listener collection in order with the specified data.
   * @memberof! Emitter.prototype
   * @function
   * @param {String} event - The name of the event you want to emit.
   * @param {...Object} data - Data to pass to the listeners.
   * @returns {Object} Returns an instance of Emitter.
   * @example
   * // Emits the "foo" event with 'param1' and 'param2' as arguments.
   * emitter.emit('foo', 'param1', 'param2');
   */

  Emitter.prototype.emit = function emit(event) {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var listeners = undefined;

    // Defines listeners value.
    if (!this._eventCollection || !(listeners = this._eventCollection[event])) {
      return this;
    }

    // Clone listeners
    listeners = listeners.slice(0);

    listeners.forEach(function (fn) {
      return fn.apply(_this, args);
    });

    return this;
  };

  return Emitter;
})();

/**
 * Exports Emitter
 */
exports["default"] = Emitter;
module.exports = exports["default"];
},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kZWNvdXBsZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lbWl0dGVyL2Rpc3QvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llc1xuICovXG52YXIgZGVjb3VwbGUgPSByZXF1aXJlKCdkZWNvdXBsZScpO1xudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdlbWl0dGVyJyk7XG5cbi8qKlxuICogUHJpdmF0ZXNcbiAqL1xudmFyIHNjcm9sbFRpbWVvdXQ7XG52YXIgc2Nyb2xsaW5nID0gZmFsc2U7XG52YXIgZG9jID0gd2luZG93LmRvY3VtZW50O1xudmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xudmFyIG1zUG9pbnRlclN1cHBvcnRlZCA9IHdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZDtcbnZhciB0b3VjaCA9IHtcbiAgJ3N0YXJ0JzogbXNQb2ludGVyU3VwcG9ydGVkID8gJ01TUG9pbnRlckRvd24nIDogJ3RvdWNoc3RhcnQnLFxuICAnbW92ZSc6IG1zUG9pbnRlclN1cHBvcnRlZCA/ICdNU1BvaW50ZXJNb3ZlJyA6ICd0b3VjaG1vdmUnLFxuICAnZW5kJzogbXNQb2ludGVyU3VwcG9ydGVkID8gJ01TUG9pbnRlclVwJyA6ICd0b3VjaGVuZCdcbn07XG52YXIgcHJlZml4ID0gKGZ1bmN0aW9uIHByZWZpeCgpIHtcbiAgdmFyIHJlZ2V4ID0gL14oV2Via2l0fEtodG1sfE1venxtc3xPKSg/PVtBLVpdKS87XG4gIHZhciBzdHlsZURlY2xhcmF0aW9uID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXS5zdHlsZTtcbiAgZm9yICh2YXIgcHJvcCBpbiBzdHlsZURlY2xhcmF0aW9uKSB7XG4gICAgaWYgKHJlZ2V4LnRlc3QocHJvcCkpIHtcbiAgICAgIHJldHVybiAnLScgKyBwcm9wLm1hdGNoKHJlZ2V4KVswXS50b0xvd2VyQ2FzZSgpICsgJy0nO1xuICAgIH1cbiAgfVxuICAvLyBOb3RoaW5nIGZvdW5kIHNvIGZhcj8gV2Via2l0IGRvZXMgbm90IGVudW1lcmF0ZSBvdmVyIHRoZSBDU1MgcHJvcGVydGllcyBvZiB0aGUgc3R5bGUgb2JqZWN0LlxuICAvLyBIb3dldmVyIChwcm9wIGluIHN0eWxlKSByZXR1cm5zIHRoZSBjb3JyZWN0IHZhbHVlLCBzbyB3ZSdsbCBoYXZlIHRvIHRlc3QgZm9yXG4gIC8vIHRoZSBwcmVjZW5jZSBvZiBhIHNwZWNpZmljIHByb3BlcnR5XG4gIGlmICgnV2Via2l0T3BhY2l0eScgaW4gc3R5bGVEZWNsYXJhdGlvbikgeyByZXR1cm4gJy13ZWJraXQtJzsgfVxuICBpZiAoJ0todG1sT3BhY2l0eScgaW4gc3R5bGVEZWNsYXJhdGlvbikgeyByZXR1cm4gJy1raHRtbC0nOyB9XG4gIHJldHVybiAnJztcbn0oKSk7XG5mdW5jdGlvbiBleHRlbmQoZGVzdGluYXRpb24sIGZyb20pIHtcbiAgZm9yICh2YXIgcHJvcCBpbiBmcm9tKSB7XG4gICAgaWYgKGZyb21bcHJvcF0pIHtcbiAgICAgIGRlc3RpbmF0aW9uW3Byb3BdID0gZnJvbVtwcm9wXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlc3RpbmF0aW9uO1xufVxuZnVuY3Rpb24gaW5oZXJpdHMoY2hpbGQsIHViZXIpIHtcbiAgY2hpbGQucHJvdG90eXBlID0gZXh0ZW5kKGNoaWxkLnByb3RvdHlwZSB8fCB7fSwgdWJlci5wcm90b3R5cGUpO1xufVxuXG4vKipcbiAqIFNsaWRlb3V0IGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFNsaWRlb3V0KG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgLy8gU2V0cyBkZWZhdWx0IHZhbHVlc1xuICB0aGlzLl9zdGFydE9mZnNldFggPSAwO1xuICB0aGlzLl9jdXJyZW50T2Zmc2V0WCA9IDA7XG4gIHRoaXMuX29wZW5pbmcgPSBmYWxzZTtcbiAgdGhpcy5fbW92ZWQgPSBmYWxzZTtcbiAgdGhpcy5fb3BlbmVkID0gZmFsc2U7XG4gIHRoaXMuX3ByZXZlbnRPcGVuID0gZmFsc2U7XG4gIHRoaXMuX3RvdWNoID0gb3B0aW9ucy50b3VjaCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdGlvbnMudG91Y2ggJiYgdHJ1ZTtcblxuICAvLyBTZXRzIHBhbmVsXG4gIHRoaXMucGFuZWwgPSBvcHRpb25zLnBhbmVsO1xuICB0aGlzLm1lbnUgPSBvcHRpb25zLm1lbnU7XG5cbiAgLy8gU2V0cyAgY2xhc3NuYW1lc1xuICB0aGlzLnBhbmVsLmNsYXNzTmFtZSArPSAnIHNsaWRlb3V0LXBhbmVsJztcbiAgdGhpcy5tZW51LmNsYXNzTmFtZSArPSAnIHNsaWRlb3V0LW1lbnUnO1xuXG4gIC8vIFNldHMgb3B0aW9uc1xuICB0aGlzLl9meCA9IG9wdGlvbnMuZnggfHwgJ2Vhc2UnO1xuICB0aGlzLl9kdXJhdGlvbiA9IHBhcnNlSW50KG9wdGlvbnMuZHVyYXRpb24sIDEwKSB8fCAzMDA7XG4gIHRoaXMuX3RvbGVyYW5jZSA9IHBhcnNlSW50KG9wdGlvbnMudG9sZXJhbmNlLCAxMCkgfHwgNzA7XG4gIHRoaXMuX3BhZGRpbmcgPSBwYXJzZUludChvcHRpb25zLnBhZGRpbmcsIDEwKSB8fCAyNTY7XG5cbiAgLy8gSW5pdCB0b3VjaCBldmVudHNcbiAgaWYodGhpcy5fdG91Y2gpIHtcbiAgICB0aGlzLl9pbml0VG91Y2hFdmVudHMoKTtcbiAgfVxufVxuXG4vKipcbiAqIEluaGVyaXRzIGZyb20gRW1pdHRlclxuICovXG5pbmhlcml0cyhTbGlkZW91dCwgRW1pdHRlcik7XG5cbi8qKlxuICogT3BlbnMgdGhlIHNsaWRlb3V0IG1lbnUuXG4gKi9cblNsaWRlb3V0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5lbWl0KCdiZWZvcmVvcGVuJyk7XG4gIGlmIChodG1sLmNsYXNzTmFtZS5zZWFyY2goJ3NsaWRlb3V0LW9wZW4nKSA9PT0gLTEpIHsgaHRtbC5jbGFzc05hbWUgKz0gJyBzbGlkZW91dC1vcGVuJzsgfVxuICB0aGlzLl9zZXRUcmFuc2l0aW9uKCk7XG4gIHRoaXMuX3RyYW5zbGF0ZVhUbyh0aGlzLl9wYWRkaW5nKTtcbiAgdGhpcy5fb3BlbmVkID0gdHJ1ZTtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBzZWxmLnBhbmVsLnN0eWxlLnRyYW5zaXRpb24gPSBzZWxmLnBhbmVsLnN0eWxlWyctd2Via2l0LXRyYW5zaXRpb24nXSA9ICcnO1xuICAgIHNlbGYuZW1pdCgnb3BlbicpO1xuICB9LCB0aGlzLl9kdXJhdGlvbiArIDUwKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENsb3NlcyBzbGlkZW91dCBtZW51LlxuICovXG5TbGlkZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBpZiAoIXRoaXMuaXNPcGVuKCkgJiYgIXRoaXMuX29wZW5pbmcpIHsgcmV0dXJuIHRoaXM7IH1cbiAgdGhpcy5lbWl0KCdiZWZvcmVjbG9zZScpO1xuICB0aGlzLl9zZXRUcmFuc2l0aW9uKCk7XG4gIHRoaXMuX3RyYW5zbGF0ZVhUbygwKTtcbiAgdGhpcy5fb3BlbmVkID0gZmFsc2U7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgaHRtbC5jbGFzc05hbWUgPSBodG1sLmNsYXNzTmFtZS5yZXBsYWNlKC8gc2xpZGVvdXQtb3Blbi8sICcnKTtcbiAgICBzZWxmLnBhbmVsLnN0eWxlLnRyYW5zaXRpb24gPSBzZWxmLnBhbmVsLnN0eWxlWyctd2Via2l0LXRyYW5zaXRpb24nXSA9IHNlbGYucGFuZWwuc3R5bGVbcHJlZml4ICsgJ3RyYW5zZm9ybSddID0gc2VsZi5wYW5lbC5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICBzZWxmLmVtaXQoJ2Nsb3NlJyk7XG4gIH0sIHRoaXMuX2R1cmF0aW9uICsgNTApO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogVG9nZ2xlcyAob3Blbi9jbG9zZSkgc2xpZGVvdXQgbWVudS5cbiAqL1xuU2xpZGVvdXQucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5pc09wZW4oKSA/IHRoaXMuY2xvc2UoKSA6IHRoaXMub3BlbigpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHNsaWRlb3V0IGlzIGN1cnJlbnRseSBvcGVuLCBhbmQgZmFsc2UgaWYgaXQgaXMgY2xvc2VkLlxuICovXG5TbGlkZW91dC5wcm90b3R5cGUuaXNPcGVuID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9vcGVuZWQ7XG59O1xuXG4vKipcbiAqIFRyYW5zbGF0ZXMgcGFuZWwgYW5kIHVwZGF0ZXMgY3VycmVudE9mZnNldCB3aXRoIGEgZ2l2ZW4gWCBwb2ludFxuICovXG5TbGlkZW91dC5wcm90b3R5cGUuX3RyYW5zbGF0ZVhUbyA9IGZ1bmN0aW9uKHRyYW5zbGF0ZVgpIHtcbiAgdGhpcy5fY3VycmVudE9mZnNldFggPSB0cmFuc2xhdGVYO1xuICB0aGlzLnBhbmVsLnN0eWxlW3ByZWZpeCArICd0cmFuc2Zvcm0nXSA9IHRoaXMucGFuZWwuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyB0cmFuc2xhdGVYICsgJ3B4LCAwLCAwKSc7XG59O1xuXG4vKipcbiAqIFNldCB0cmFuc2l0aW9uIHByb3BlcnRpZXNcbiAqL1xuU2xpZGVvdXQucHJvdG90eXBlLl9zZXRUcmFuc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGFuZWwuc3R5bGVbcHJlZml4ICsgJ3RyYW5zaXRpb24nXSA9IHRoaXMucGFuZWwuc3R5bGUudHJhbnNpdGlvbiA9IHByZWZpeCArICd0cmFuc2Zvcm0gJyArIHRoaXMuX2R1cmF0aW9uICsgJ21zICcgKyB0aGlzLl9meDtcbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgdG91Y2ggZXZlbnRcbiAqL1xuU2xpZGVvdXQucHJvdG90eXBlLl9pbml0VG91Y2hFdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIC8qKlxuICAgKiBEZWNvdXBsZSBzY3JvbGwgZXZlbnRcbiAgICovXG4gIGRlY291cGxlKGRvYywgJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgIGlmICghc2VsZi5fbW92ZWQpIHtcbiAgICAgIGNsZWFyVGltZW91dChzY3JvbGxUaW1lb3V0KTtcbiAgICAgIHNjcm9sbGluZyA9IHRydWU7XG4gICAgICBzY3JvbGxUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgc2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICB9LCAyNTApO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIFByZXZlbnRzIHRvdWNobW92ZSBldmVudCBpZiBzbGlkZW91dCBpcyBtb3ZpbmdcbiAgICovXG4gIGRvYy5hZGRFdmVudExpc3RlbmVyKHRvdWNoLm1vdmUsIGZ1bmN0aW9uKGV2ZSkge1xuICAgIGlmIChzZWxmLl9tb3ZlZCkge1xuICAgICAgZXZlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogUmVzZXRzIHZhbHVlcyBvbiB0b3VjaHN0YXJ0XG4gICAqL1xuICB0aGlzLnBhbmVsLmFkZEV2ZW50TGlzdGVuZXIodG91Y2guc3RhcnQsIGZ1bmN0aW9uKGV2ZSkge1xuXG4gICAgaWYgKHR5cGVvZiBldmUudG91Y2hlcyA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuOyB9XG5cbiAgICBzZWxmLl9tb3ZlZCA9IGZhbHNlO1xuICAgIHNlbGYuX29wZW5pbmcgPSBmYWxzZTtcbiAgICBzZWxmLl9zdGFydE9mZnNldFggPSBldmUudG91Y2hlc1swXS5wYWdlWDtcbiAgICBzZWxmLl9wcmV2ZW50T3BlbiA9ICghc2VsZi5pc09wZW4oKSAmJiBzZWxmLm1lbnUuY2xpZW50V2lkdGggIT09IDApO1xuICB9KTtcblxuICAvKipcbiAgICogUmVzZXRzIHZhbHVlcyBvbiB0b3VjaGNhbmNlbFxuICAgKi9cbiAgdGhpcy5wYW5lbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIGZ1bmN0aW9uKCkge1xuICAgIHNlbGYuX21vdmVkID0gZmFsc2U7XG4gICAgc2VsZi5fb3BlbmluZyA9IGZhbHNlO1xuICB9KTtcblxuICAvKipcbiAgICogVG9nZ2xlcyBzbGlkZW91dCBvbiB0b3VjaGVuZFxuICAgKi9cbiAgdGhpcy5wYW5lbC5hZGRFdmVudExpc3RlbmVyKHRvdWNoLmVuZCwgZnVuY3Rpb24oKSB7XG4gICAgaWYgKHNlbGYuX21vdmVkKSB7XG4gICAgICAoc2VsZi5fb3BlbmluZyAmJiBNYXRoLmFicyhzZWxmLl9jdXJyZW50T2Zmc2V0WCkgPiBzZWxmLl90b2xlcmFuY2UpID8gc2VsZi5vcGVuKCkgOiBzZWxmLmNsb3NlKCk7XG4gICAgfVxuICAgIHNlbGYuX21vdmVkID0gZmFsc2U7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBUcmFuc2xhdGVzIHBhbmVsIG9uIHRvdWNobW92ZVxuICAgKi9cbiAgdGhpcy5wYW5lbC5hZGRFdmVudExpc3RlbmVyKHRvdWNoLm1vdmUsIGZ1bmN0aW9uKGV2ZSkge1xuXG4gICAgaWYgKHNjcm9sbGluZyB8fCBzZWxmLl9wcmV2ZW50T3BlbiB8fCB0eXBlb2YgZXZlLnRvdWNoZXMgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybjsgfVxuXG4gICAgdmFyIGRpZl94ID0gZXZlLnRvdWNoZXNbMF0uY2xpZW50WCAtIHNlbGYuX3N0YXJ0T2Zmc2V0WDtcbiAgICB2YXIgdHJhbnNsYXRlWCA9IHNlbGYuX2N1cnJlbnRPZmZzZXRYID0gZGlmX3g7XG5cbiAgICBpZiAoTWF0aC5hYnModHJhbnNsYXRlWCkgPiBzZWxmLl9wYWRkaW5nKSB7IHJldHVybjsgfVxuXG4gICAgaWYgKE1hdGguYWJzKGRpZl94KSA+IDIwKSB7XG4gICAgICBzZWxmLl9vcGVuaW5nID0gdHJ1ZTtcblxuICAgICAgaWYgKHNlbGYuX29wZW5lZCAmJiBkaWZfeCA+IDAgfHwgIXNlbGYuX29wZW5lZCAmJiBkaWZfeCA8IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgIGlmICghc2VsZi5fbW92ZWQgJiYgaHRtbC5jbGFzc05hbWUuc2VhcmNoKCdzbGlkZW91dC1vcGVuJykgPT09IC0xKSB7XG4gICAgICAgIGh0bWwuY2xhc3NOYW1lICs9ICcgc2xpZGVvdXQtb3Blbic7XG4gICAgICB9XG5cbiAgICAgIGlmIChkaWZfeCA8PSAwKSB7XG4gICAgICAgIHRyYW5zbGF0ZVggPSBkaWZfeCArIHNlbGYuX3BhZGRpbmc7XG4gICAgICAgIHNlbGYuX29wZW5pbmcgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgc2VsZi5wYW5lbC5zdHlsZVtwcmVmaXggKyAndHJhbnNmb3JtJ10gPSBzZWxmLnBhbmVsLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgdHJhbnNsYXRlWCArICdweCwgMCwgMCknO1xuICAgICAgc2VsZi5lbWl0KCd0cmFuc2xhdGUnLCB0cmFuc2xhdGVYKTtcbiAgICAgIHNlbGYuX21vdmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgfSk7XG5cbn07XG5cbi8qKlxuICogRXhwb3NlIFNsaWRlb3V0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gU2xpZGVvdXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgIH07XG59KCkpO1xuXG5mdW5jdGlvbiBkZWNvdXBsZShub2RlLCBldmVudCwgZm4pIHtcbiAgdmFyIGV2ZSxcbiAgICAgIHRyYWNraW5nID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gY2FwdHVyZUV2ZW50KGUpIHtcbiAgICBldmUgPSBlO1xuICAgIHRyYWNrKCk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFjaygpIHtcbiAgICBpZiAoIXRyYWNraW5nKSB7XG4gICAgICByZXF1ZXN0QW5pbUZyYW1lKHVwZGF0ZSk7XG4gICAgICB0cmFja2luZyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIGZuLmNhbGwobm9kZSwgZXZlKTtcbiAgICB0cmFja2luZyA9IGZhbHNlO1xuICB9XG5cbiAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYXB0dXJlRXZlbnQsIGZhbHNlKTtcbn1cblxuLyoqXG4gKiBFeHBvc2UgZGVjb3VwbGVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBkZWNvdXBsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH07XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgRW1pdHRlci5cbiAqIEBjbGFzc1xuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBhIG5ldyBpbnN0YW5jZSBvZiBFbWl0dGVyLlxuICogQGV4YW1wbGVcbiAqIC8vIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgRW1pdHRlci5cbiAqIHZhciBFbWl0dGVyID0gcmVxdWlyZSgnZW1pdHRlcicpO1xuICpcbiAqIHZhciBlbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAqL1xuXG52YXIgRW1pdHRlciA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEVtaXR0ZXIoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEVtaXR0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBsaXN0ZW5lciB0byB0aGUgY29sbGVjdGlvbiBmb3IgdGhlIHNwZWNpZmllZCBldmVudC5cbiAgICogQG1lbWJlcm9mISBFbWl0dGVyLnByb3RvdHlwZVxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IC0gVGhlIGV2ZW50IG5hbWUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0gQSBsaXN0ZW5lciBmdW5jdGlvbiB0byBhZGQuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgRW1pdHRlci5cbiAgICogQGV4YW1wbGVcbiAgICogLy8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIFwiZm9vXCIgZXZlbnQuXG4gICAqIGVtaXR0ZXIub24oJ2ZvbycsIGxpc3RlbmVyKTtcbiAgICovXG5cbiAgRW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldmVudCwgbGlzdGVuZXIpIHtcbiAgICAvLyBVc2UgdGhlIGN1cnJlbnQgY29sbGVjdGlvbiBvciBjcmVhdGUgaXQuXG4gICAgdGhpcy5fZXZlbnRDb2xsZWN0aW9uID0gdGhpcy5fZXZlbnRDb2xsZWN0aW9uIHx8IHt9O1xuXG4gICAgLy8gVXNlIHRoZSBjdXJyZW50IGNvbGxlY3Rpb24gb2YgYW4gZXZlbnQgb3IgY3JlYXRlIGl0LlxuICAgIHRoaXMuX2V2ZW50Q29sbGVjdGlvbltldmVudF0gPSB0aGlzLl9ldmVudENvbGxlY3Rpb25bZXZlbnRdIHx8IFtdO1xuXG4gICAgLy8gQXBwZW5kcyB0aGUgbGlzdGVuZXIgaW50byB0aGUgY29sbGVjdGlvbiBvZiB0aGUgZ2l2ZW4gZXZlbnRcbiAgICB0aGlzLl9ldmVudENvbGxlY3Rpb25bZXZlbnRdLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBsaXN0ZW5lciB0byB0aGUgY29sbGVjdGlvbiBmb3IgdGhlIHNwZWNpZmllZCBldmVudCB0aGF0IHdpbGwgYmUgY2FsbGVkIG9ubHkgb25jZS5cbiAgICogQG1lbWJlcm9mISBFbWl0dGVyLnByb3RvdHlwZVxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IC0gVGhlIGV2ZW50IG5hbWUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0gQSBsaXN0ZW5lciBmdW5jdGlvbiB0byBhZGQuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgRW1pdHRlci5cbiAgICogQGV4YW1wbGVcbiAgICogLy8gV2lsbCBhZGQgYW4gZXZlbnQgaGFuZGxlciB0byBcImZvb1wiIGV2ZW50IG9uY2UuXG4gICAqIGVtaXR0ZXIub25jZSgnZm9vJywgbGlzdGVuZXIpO1xuICAgKi9cblxuICBFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZShldmVudCwgbGlzdGVuZXIpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBmbigpIHtcbiAgICAgIHNlbGYub2ZmKGV2ZW50LCBmbik7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIGZuLmxpc3RlbmVyID0gbGlzdGVuZXI7XG5cbiAgICB0aGlzLm9uKGV2ZW50LCBmbik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGxpc3RlbmVyIGZyb20gdGhlIGNvbGxlY3Rpb24gZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAqIEBtZW1iZXJvZiEgRW1pdHRlci5wcm90b3R5cGVcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCAtIFRoZSBldmVudCBuYW1lLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciAtIEEgbGlzdGVuZXIgZnVuY3Rpb24gdG8gcmVtb3ZlLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIEVtaXR0ZXIuXG4gICAqIEBleGFtcGxlXG4gICAqIC8vIFJlbW92ZSBhIGdpdmVuIGxpc3RlbmVyLlxuICAgKiBlbWl0dGVyLm9mZignZm9vJywgbGlzdGVuZXIpO1xuICAgKi9cblxuICBFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiBvZmYoZXZlbnQsIGxpc3RlbmVyKSB7XG5cbiAgICB2YXIgbGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gRGVmaW5lcyBsaXN0ZW5lcnMgdmFsdWUuXG4gICAgaWYgKCF0aGlzLl9ldmVudENvbGxlY3Rpb24gfHwgIShsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudENvbGxlY3Rpb25bZXZlbnRdKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGZuLCBpKSB7XG4gICAgICBpZiAoZm4gPT09IGxpc3RlbmVyIHx8IGZuLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAvLyBSZW1vdmVzIHRoZSBnaXZlbiBsaXN0ZW5lci5cbiAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFJlbW92ZXMgYW4gZW1wdHkgZXZlbnQgY29sbGVjdGlvbi5cbiAgICBpZiAobGlzdGVuZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50Q29sbGVjdGlvbltldmVudF07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGUgZWFjaCBpdGVtIGluIHRoZSBsaXN0ZW5lciBjb2xsZWN0aW9uIGluIG9yZGVyIHdpdGggdGhlIHNwZWNpZmllZCBkYXRhLlxuICAgKiBAbWVtYmVyb2YhIEVtaXR0ZXIucHJvdG90eXBlXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgeW91IHdhbnQgdG8gZW1pdC5cbiAgICogQHBhcmFtIHsuLi5PYmplY3R9IGRhdGEgLSBEYXRhIHRvIHBhc3MgdG8gdGhlIGxpc3RlbmVycy5cbiAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBFbWl0dGVyLlxuICAgKiBAZXhhbXBsZVxuICAgKiAvLyBFbWl0cyB0aGUgXCJmb29cIiBldmVudCB3aXRoICdwYXJhbTEnIGFuZCAncGFyYW0yJyBhcyBhcmd1bWVudHMuXG4gICAqIGVtaXR0ZXIuZW1pdCgnZm9vJywgJ3BhcmFtMScsICdwYXJhbTInKTtcbiAgICovXG5cbiAgRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgbGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gRGVmaW5lcyBsaXN0ZW5lcnMgdmFsdWUuXG4gICAgaWYgKCF0aGlzLl9ldmVudENvbGxlY3Rpb24gfHwgIShsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudENvbGxlY3Rpb25bZXZlbnRdKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gQ2xvbmUgbGlzdGVuZXJzXG4gICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLnNsaWNlKDApO1xuXG4gICAgbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkoX3RoaXMsIGFyZ3MpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIEVtaXR0ZXI7XG59KSgpO1xuXG4vKipcbiAqIEV4cG9ydHMgRW1pdHRlclxuICovXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEVtaXR0ZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyJdfQ==
