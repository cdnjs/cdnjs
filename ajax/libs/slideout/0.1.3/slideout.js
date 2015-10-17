!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Slideout=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Module dependencies
 */
var decouple = require('decouple');

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
  this._initTouchEvents();
}

/**
 * Opens the slideout menu.
 */
Slideout.prototype.open = function() {
  var self = this;
  if (html.className.search('slideout-open') === -1) { html.className += ' slideout-open'; }
  this._translateXTo(this._padding);
  this._opened = true;
  setTimeout(function() {
    self.panel.style.transition = '';
  }, this._duration + 50);
  return this;
};

/**
 * Closes slideout menu.
 */
Slideout.prototype.close = function() {
  var self = this;
  if (!this.isOpen() && !this._opening) { return this; }
  this._translateXTo(0);
  this._opened = false;
  setTimeout(function() {
    html.className = html.className.replace(/ slideout-open/, '');
    self.panel.style.transition = '';
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
  this.panel.style.transition = prefix + 'transform ' + this._duration + 'ms ' + this._fx + ', transform ' + this._duration + 'ms ' + this._fx;
  this.panel.style[prefix + 'transform'] = this.panel.style.transform = 'translate3d(' + translateX + 'px, 0, 0)';
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

    if (scrolling || self._preventOpen) { return; }

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

      self._moved = true;
    }

  });

};

/**
 * Expose Slideout
 */
module.exports = Slideout;

},{"decouple":2}],2:[function(require,module,exports){
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

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kZWNvdXBsZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzXG4gKi9cbnZhciBkZWNvdXBsZSA9IHJlcXVpcmUoJ2RlY291cGxlJyk7XG5cbi8qKlxuICogUHJpdmF0ZXNcbiAqL1xudmFyIHNjcm9sbFRpbWVvdXQ7XG52YXIgc2Nyb2xsaW5nID0gZmFsc2U7XG52YXIgZG9jID0gd2luZG93LmRvY3VtZW50O1xudmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xudmFyIG1zUG9pbnRlclN1cHBvcnRlZCA9IHdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZDtcbnZhciB0b3VjaCA9IHtcbiAgJ3N0YXJ0JzogbXNQb2ludGVyU3VwcG9ydGVkID8gJ01TUG9pbnRlckRvd24nIDogJ3RvdWNoc3RhcnQnLFxuICAnbW92ZSc6IG1zUG9pbnRlclN1cHBvcnRlZCA/ICdNU1BvaW50ZXJNb3ZlJyA6ICd0b3VjaG1vdmUnLFxuICAnZW5kJzogbXNQb2ludGVyU3VwcG9ydGVkID8gJ01TUG9pbnRlclVwJyA6ICd0b3VjaGVuZCdcbn07XG52YXIgcHJlZml4ID0gKGZ1bmN0aW9uIHByZWZpeCgpIHtcbiAgdmFyIHJlZ2V4ID0gL14oV2Via2l0fEtodG1sfE1venxtc3xPKSg/PVtBLVpdKS87XG4gIHZhciBzdHlsZURlY2xhcmF0aW9uID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXS5zdHlsZTtcbiAgZm9yICh2YXIgcHJvcCBpbiBzdHlsZURlY2xhcmF0aW9uKSB7XG4gICAgaWYgKHJlZ2V4LnRlc3QocHJvcCkpIHtcbiAgICAgIHJldHVybiAnLScgKyBwcm9wLm1hdGNoKHJlZ2V4KVswXS50b0xvd2VyQ2FzZSgpICsgJy0nO1xuICAgIH1cbiAgfVxuICAvLyBOb3RoaW5nIGZvdW5kIHNvIGZhcj8gV2Via2l0IGRvZXMgbm90IGVudW1lcmF0ZSBvdmVyIHRoZSBDU1MgcHJvcGVydGllcyBvZiB0aGUgc3R5bGUgb2JqZWN0LlxuICAvLyBIb3dldmVyIChwcm9wIGluIHN0eWxlKSByZXR1cm5zIHRoZSBjb3JyZWN0IHZhbHVlLCBzbyB3ZSdsbCBoYXZlIHRvIHRlc3QgZm9yXG4gIC8vIHRoZSBwcmVjZW5jZSBvZiBhIHNwZWNpZmljIHByb3BlcnR5XG4gIGlmICgnV2Via2l0T3BhY2l0eScgaW4gc3R5bGVEZWNsYXJhdGlvbikgeyByZXR1cm4gJy13ZWJraXQtJzsgfVxuICBpZiAoJ0todG1sT3BhY2l0eScgaW4gc3R5bGVEZWNsYXJhdGlvbikgeyByZXR1cm4gJy1raHRtbC0nOyB9XG4gIHJldHVybiAnJztcbn0oKSk7XG5cbi8qKlxuICogU2xpZGVvdXQgY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gU2xpZGVvdXQob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAvLyBTZXRzIGRlZmF1bHQgdmFsdWVzXG4gIHRoaXMuX3N0YXJ0T2Zmc2V0WCA9IDA7XG4gIHRoaXMuX2N1cnJlbnRPZmZzZXRYID0gMDtcbiAgdGhpcy5fb3BlbmluZyA9IGZhbHNlO1xuICB0aGlzLl9tb3ZlZCA9IGZhbHNlO1xuICB0aGlzLl9vcGVuZWQgPSBmYWxzZTtcbiAgdGhpcy5fcHJldmVudE9wZW4gPSBmYWxzZTtcblxuICAvLyBTZXRzIHBhbmVsXG4gIHRoaXMucGFuZWwgPSBvcHRpb25zLnBhbmVsO1xuICB0aGlzLm1lbnUgPSBvcHRpb25zLm1lbnU7XG5cbiAgLy8gU2V0cyAgY2xhc3NuYW1lc1xuICB0aGlzLnBhbmVsLmNsYXNzTmFtZSArPSAnIHNsaWRlb3V0LXBhbmVsJztcbiAgdGhpcy5tZW51LmNsYXNzTmFtZSArPSAnIHNsaWRlb3V0LW1lbnUnO1xuXG4gIC8vIFNldHMgb3B0aW9uc1xuICB0aGlzLl9meCA9IG9wdGlvbnMuZnggfHwgJ2Vhc2UnO1xuICB0aGlzLl9kdXJhdGlvbiA9IHBhcnNlSW50KG9wdGlvbnMuZHVyYXRpb24sIDEwKSB8fCAzMDA7XG4gIHRoaXMuX3RvbGVyYW5jZSA9IHBhcnNlSW50KG9wdGlvbnMudG9sZXJhbmNlLCAxMCkgfHwgNzA7XG4gIHRoaXMuX3BhZGRpbmcgPSBwYXJzZUludChvcHRpb25zLnBhZGRpbmcsIDEwKSB8fCAyNTY7XG5cbiAgLy8gSW5pdCB0b3VjaCBldmVudHNcbiAgdGhpcy5faW5pdFRvdWNoRXZlbnRzKCk7XG59XG5cbi8qKlxuICogT3BlbnMgdGhlIHNsaWRlb3V0IG1lbnUuXG4gKi9cblNsaWRlb3V0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgaWYgKGh0bWwuY2xhc3NOYW1lLnNlYXJjaCgnc2xpZGVvdXQtb3BlbicpID09PSAtMSkgeyBodG1sLmNsYXNzTmFtZSArPSAnIHNsaWRlb3V0LW9wZW4nOyB9XG4gIHRoaXMuX3RyYW5zbGF0ZVhUbyh0aGlzLl9wYWRkaW5nKTtcbiAgdGhpcy5fb3BlbmVkID0gdHJ1ZTtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBzZWxmLnBhbmVsLnN0eWxlLnRyYW5zaXRpb24gPSAnJztcbiAgfSwgdGhpcy5fZHVyYXRpb24gKyA1MCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDbG9zZXMgc2xpZGVvdXQgbWVudS5cbiAqL1xuU2xpZGVvdXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgaWYgKCF0aGlzLmlzT3BlbigpICYmICF0aGlzLl9vcGVuaW5nKSB7IHJldHVybiB0aGlzOyB9XG4gIHRoaXMuX3RyYW5zbGF0ZVhUbygwKTtcbiAgdGhpcy5fb3BlbmVkID0gZmFsc2U7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgaHRtbC5jbGFzc05hbWUgPSBodG1sLmNsYXNzTmFtZS5yZXBsYWNlKC8gc2xpZGVvdXQtb3Blbi8sICcnKTtcbiAgICBzZWxmLnBhbmVsLnN0eWxlLnRyYW5zaXRpb24gPSAnJztcbiAgfSwgdGhpcy5fZHVyYXRpb24gKyA1MCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBUb2dnbGVzIChvcGVuL2Nsb3NlKSBzbGlkZW91dCBtZW51LlxuICovXG5TbGlkZW91dC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmlzT3BlbigpID8gdGhpcy5jbG9zZSgpIDogdGhpcy5vcGVuKCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc2xpZGVvdXQgaXMgY3VycmVudGx5IG9wZW4sIGFuZCBmYWxzZSBpZiBpdCBpcyBjbG9zZWQuXG4gKi9cblNsaWRlb3V0LnByb3RvdHlwZS5pc09wZW4gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuX29wZW5lZDtcbn07XG5cbi8qKlxuICogVHJhbnNsYXRlcyBwYW5lbCBhbmQgdXBkYXRlcyBjdXJyZW50T2Zmc2V0IHdpdGggYSBnaXZlbiBYIHBvaW50XG4gKi9cblNsaWRlb3V0LnByb3RvdHlwZS5fdHJhbnNsYXRlWFRvID0gZnVuY3Rpb24odHJhbnNsYXRlWCkge1xuICB0aGlzLl9jdXJyZW50T2Zmc2V0WCA9IHRyYW5zbGF0ZVg7XG4gIHRoaXMucGFuZWwuc3R5bGUudHJhbnNpdGlvbiA9IHByZWZpeCArICd0cmFuc2Zvcm0gJyArIHRoaXMuX2R1cmF0aW9uICsgJ21zICcgKyB0aGlzLl9meCArICcsIHRyYW5zZm9ybSAnICsgdGhpcy5fZHVyYXRpb24gKyAnbXMgJyArIHRoaXMuX2Z4O1xuICB0aGlzLnBhbmVsLnN0eWxlW3ByZWZpeCArICd0cmFuc2Zvcm0nXSA9IHRoaXMucGFuZWwuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyB0cmFuc2xhdGVYICsgJ3B4LCAwLCAwKSc7XG59O1xuXG4vKipcbiAqIEluaXRpYWxpemVzIHRvdWNoIGV2ZW50XG4gKi9cblNsaWRlb3V0LnByb3RvdHlwZS5faW5pdFRvdWNoRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICAvKipcbiAgICogRGVjb3VwbGUgc2Nyb2xsIGV2ZW50XG4gICAqL1xuICBkZWNvdXBsZShkb2MsICdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXNlbGYuX21vdmVkKSB7XG4gICAgICBjbGVhclRpbWVvdXQoc2Nyb2xsVGltZW91dCk7XG4gICAgICBzY3JvbGxpbmcgPSB0cnVlO1xuICAgICAgc2Nyb2xsVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNjcm9sbGluZyA9IGZhbHNlO1xuICAgICAgfSwgMjUwKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBQcmV2ZW50cyB0b3VjaG1vdmUgZXZlbnQgaWYgc2xpZGVvdXQgaXMgbW92aW5nXG4gICAqL1xuICBkb2MuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaC5tb3ZlLCBmdW5jdGlvbihldmUpIHtcbiAgICBpZiAoc2VsZi5fbW92ZWQpIHtcbiAgICAgIGV2ZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB2YWx1ZXMgb24gdG91Y2hzdGFydFxuICAgKi9cbiAgdGhpcy5wYW5lbC5hZGRFdmVudExpc3RlbmVyKHRvdWNoLnN0YXJ0LCBmdW5jdGlvbihldmUpIHtcbiAgICBzZWxmLl9tb3ZlZCA9IGZhbHNlO1xuICAgIHNlbGYuX29wZW5pbmcgPSBmYWxzZTtcbiAgICBzZWxmLl9zdGFydE9mZnNldFggPSBldmUudG91Y2hlc1swXS5wYWdlWDtcbiAgICBzZWxmLl9wcmV2ZW50T3BlbiA9ICghc2VsZi5pc09wZW4oKSAmJiBzZWxmLm1lbnUuY2xpZW50V2lkdGggIT09IDApO1xuICB9KTtcblxuICAvKipcbiAgICogUmVzZXRzIHZhbHVlcyBvbiB0b3VjaGNhbmNlbFxuICAgKi9cbiAgdGhpcy5wYW5lbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIGZ1bmN0aW9uKCkge1xuICAgIHNlbGYuX21vdmVkID0gZmFsc2U7XG4gICAgc2VsZi5fb3BlbmluZyA9IGZhbHNlO1xuICB9KTtcblxuICAvKipcbiAgICogVG9nZ2xlcyBzbGlkZW91dCBvbiB0b3VjaGVuZFxuICAgKi9cbiAgdGhpcy5wYW5lbC5hZGRFdmVudExpc3RlbmVyKHRvdWNoLmVuZCwgZnVuY3Rpb24oKSB7XG4gICAgaWYgKHNlbGYuX21vdmVkKSB7XG4gICAgICAoc2VsZi5fb3BlbmluZyAmJiBNYXRoLmFicyhzZWxmLl9jdXJyZW50T2Zmc2V0WCkgPiBzZWxmLl90b2xlcmFuY2UpID8gc2VsZi5vcGVuKCkgOiBzZWxmLmNsb3NlKCk7XG4gICAgfVxuICAgIHNlbGYuX21vdmVkID0gZmFsc2U7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBUcmFuc2xhdGVzIHBhbmVsIG9uIHRvdWNobW92ZVxuICAgKi9cbiAgdGhpcy5wYW5lbC5hZGRFdmVudExpc3RlbmVyKHRvdWNoLm1vdmUsIGZ1bmN0aW9uKGV2ZSkge1xuXG4gICAgaWYgKHNjcm9sbGluZyB8fCBzZWxmLl9wcmV2ZW50T3BlbikgeyByZXR1cm47IH1cblxuICAgIHZhciBkaWZfeCA9IGV2ZS50b3VjaGVzWzBdLmNsaWVudFggLSBzZWxmLl9zdGFydE9mZnNldFg7XG4gICAgdmFyIHRyYW5zbGF0ZVggPSBzZWxmLl9jdXJyZW50T2Zmc2V0WCA9IGRpZl94O1xuXG4gICAgaWYgKE1hdGguYWJzKHRyYW5zbGF0ZVgpID4gc2VsZi5fcGFkZGluZykgeyByZXR1cm47IH1cblxuICAgIGlmIChNYXRoLmFicyhkaWZfeCkgPiAyMCkge1xuICAgICAgc2VsZi5fb3BlbmluZyA9IHRydWU7XG5cbiAgICAgIGlmIChzZWxmLl9vcGVuZWQgJiYgZGlmX3ggPiAwIHx8ICFzZWxmLl9vcGVuZWQgJiYgZGlmX3ggPCAwKSB7IHJldHVybjsgfVxuXG4gICAgICBpZiAoIXNlbGYuX21vdmVkICYmIGh0bWwuY2xhc3NOYW1lLnNlYXJjaCgnc2xpZGVvdXQtb3BlbicpID09PSAtMSkge1xuICAgICAgICBodG1sLmNsYXNzTmFtZSArPSAnIHNsaWRlb3V0LW9wZW4nO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGlmX3ggPD0gMCkge1xuICAgICAgICB0cmFuc2xhdGVYID0gZGlmX3ggKyBzZWxmLl9wYWRkaW5nO1xuICAgICAgICBzZWxmLl9vcGVuaW5nID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHNlbGYucGFuZWwuc3R5bGVbcHJlZml4ICsgJ3RyYW5zZm9ybSddID0gc2VsZi5wYW5lbC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIHRyYW5zbGF0ZVggKyAncHgsIDAsIDApJztcblxuICAgICAgc2VsZi5fbW92ZWQgPSB0cnVlO1xuICAgIH1cblxuICB9KTtcblxufTtcblxuLyoqXG4gKiBFeHBvc2UgU2xpZGVvdXRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBTbGlkZW91dDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKSB7XG4gIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgfTtcbn0oKSk7XG5cbmZ1bmN0aW9uIGRlY291cGxlKG5vZGUsIGV2ZW50LCBmbikge1xuICB2YXIgZXZlLFxuICAgICAgdHJhY2tpbmcgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBjYXB0dXJlRXZlbnQoZSkge1xuICAgIGV2ZSA9IGU7XG4gICAgdHJhY2soKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWNrKCkge1xuICAgIGlmICghdHJhY2tpbmcpIHtcbiAgICAgIHJlcXVlc3RBbmltRnJhbWUodXBkYXRlKTtcbiAgICAgIHRyYWNraW5nID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgZm4uY2FsbChub2RlLCBldmUpO1xuICAgIHRyYWNraW5nID0gZmFsc2U7XG4gIH1cblxuICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhcHR1cmVFdmVudCwgZmFsc2UpO1xufVxuXG4vKipcbiAqIEV4cG9zZSBkZWNvdXBsZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGRlY291cGxlO1xuIl19
