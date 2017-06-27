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
  this._setTransition();
  this._translateXTo(this._padding);
  this._opened = true;
  setTimeout(function() {
    self.panel.style.transition = self.panel.style['-webkit-transition'] = '';
  }, this._duration + 50);
  return this;
};

/**
 * Closes slideout menu.
 */
Slideout.prototype.close = function() {
  var self = this;
  if (!this.isOpen() && !this._opening) { return this; }
  this._setTransition();
  this._translateXTo(0);
  this._opened = false;
  setTimeout(function() {
    html.className = html.className.replace(/ slideout-open/, '');
    self.panel.style.transition = self.panel.style['-webkit-transition'] = '';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kZWNvdXBsZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llc1xuICovXG52YXIgZGVjb3VwbGUgPSByZXF1aXJlKCdkZWNvdXBsZScpO1xuXG4vKipcbiAqIFByaXZhdGVzXG4gKi9cbnZhciBzY3JvbGxUaW1lb3V0O1xudmFyIHNjcm9sbGluZyA9IGZhbHNlO1xudmFyIGRvYyA9IHdpbmRvdy5kb2N1bWVudDtcbnZhciBodG1sID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbnZhciBtc1BvaW50ZXJTdXBwb3J0ZWQgPSB3aW5kb3cubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQ7XG52YXIgdG91Y2ggPSB7XG4gICdzdGFydCc6IG1zUG9pbnRlclN1cHBvcnRlZCA/ICdNU1BvaW50ZXJEb3duJyA6ICd0b3VjaHN0YXJ0JyxcbiAgJ21vdmUnOiBtc1BvaW50ZXJTdXBwb3J0ZWQgPyAnTVNQb2ludGVyTW92ZScgOiAndG91Y2htb3ZlJyxcbiAgJ2VuZCc6IG1zUG9pbnRlclN1cHBvcnRlZCA/ICdNU1BvaW50ZXJVcCcgOiAndG91Y2hlbmQnXG59O1xudmFyIHByZWZpeCA9IChmdW5jdGlvbiBwcmVmaXgoKSB7XG4gIHZhciByZWdleCA9IC9eKFdlYmtpdHxLaHRtbHxNb3p8bXN8TykoPz1bQS1aXSkvO1xuICB2YXIgc3R5bGVEZWNsYXJhdGlvbiA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF0uc3R5bGU7XG4gIGZvciAodmFyIHByb3AgaW4gc3R5bGVEZWNsYXJhdGlvbikge1xuICAgIGlmIChyZWdleC50ZXN0KHByb3ApKSB7XG4gICAgICByZXR1cm4gJy0nICsgcHJvcC5tYXRjaChyZWdleClbMF0udG9Mb3dlckNhc2UoKSArICctJztcbiAgICB9XG4gIH1cbiAgLy8gTm90aGluZyBmb3VuZCBzbyBmYXI/IFdlYmtpdCBkb2VzIG5vdCBlbnVtZXJhdGUgb3ZlciB0aGUgQ1NTIHByb3BlcnRpZXMgb2YgdGhlIHN0eWxlIG9iamVjdC5cbiAgLy8gSG93ZXZlciAocHJvcCBpbiBzdHlsZSkgcmV0dXJucyB0aGUgY29ycmVjdCB2YWx1ZSwgc28gd2UnbGwgaGF2ZSB0byB0ZXN0IGZvclxuICAvLyB0aGUgcHJlY2VuY2Ugb2YgYSBzcGVjaWZpYyBwcm9wZXJ0eVxuICBpZiAoJ1dlYmtpdE9wYWNpdHknIGluIHN0eWxlRGVjbGFyYXRpb24pIHsgcmV0dXJuICctd2Via2l0LSc7IH1cbiAgaWYgKCdLaHRtbE9wYWNpdHknIGluIHN0eWxlRGVjbGFyYXRpb24pIHsgcmV0dXJuICcta2h0bWwtJzsgfVxuICByZXR1cm4gJyc7XG59KCkpO1xuXG4vKipcbiAqIFNsaWRlb3V0IGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFNsaWRlb3V0KG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgLy8gU2V0cyBkZWZhdWx0IHZhbHVlc1xuICB0aGlzLl9zdGFydE9mZnNldFggPSAwO1xuICB0aGlzLl9jdXJyZW50T2Zmc2V0WCA9IDA7XG4gIHRoaXMuX29wZW5pbmcgPSBmYWxzZTtcbiAgdGhpcy5fbW92ZWQgPSBmYWxzZTtcbiAgdGhpcy5fb3BlbmVkID0gZmFsc2U7XG4gIHRoaXMuX3ByZXZlbnRPcGVuID0gZmFsc2U7XG5cbiAgLy8gU2V0cyBwYW5lbFxuICB0aGlzLnBhbmVsID0gb3B0aW9ucy5wYW5lbDtcbiAgdGhpcy5tZW51ID0gb3B0aW9ucy5tZW51O1xuXG4gIC8vIFNldHMgIGNsYXNzbmFtZXNcbiAgdGhpcy5wYW5lbC5jbGFzc05hbWUgKz0gJyBzbGlkZW91dC1wYW5lbCc7XG4gIHRoaXMubWVudS5jbGFzc05hbWUgKz0gJyBzbGlkZW91dC1tZW51JztcblxuICAvLyBTZXRzIG9wdGlvbnNcbiAgdGhpcy5fZnggPSBvcHRpb25zLmZ4IHx8ICdlYXNlJztcbiAgdGhpcy5fZHVyYXRpb24gPSBwYXJzZUludChvcHRpb25zLmR1cmF0aW9uLCAxMCkgfHwgMzAwO1xuICB0aGlzLl90b2xlcmFuY2UgPSBwYXJzZUludChvcHRpb25zLnRvbGVyYW5jZSwgMTApIHx8IDcwO1xuICB0aGlzLl9wYWRkaW5nID0gcGFyc2VJbnQob3B0aW9ucy5wYWRkaW5nLCAxMCkgfHwgMjU2O1xuXG4gIC8vIEluaXQgdG91Y2ggZXZlbnRzXG4gIHRoaXMuX2luaXRUb3VjaEV2ZW50cygpO1xufVxuXG4vKipcbiAqIE9wZW5zIHRoZSBzbGlkZW91dCBtZW51LlxuICovXG5TbGlkZW91dC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGlmIChodG1sLmNsYXNzTmFtZS5zZWFyY2goJ3NsaWRlb3V0LW9wZW4nKSA9PT0gLTEpIHsgaHRtbC5jbGFzc05hbWUgKz0gJyBzbGlkZW91dC1vcGVuJzsgfVxuICB0aGlzLl9zZXRUcmFuc2l0aW9uKCk7XG4gIHRoaXMuX3RyYW5zbGF0ZVhUbyh0aGlzLl9wYWRkaW5nKTtcbiAgdGhpcy5fb3BlbmVkID0gdHJ1ZTtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBzZWxmLnBhbmVsLnN0eWxlLnRyYW5zaXRpb24gPSBzZWxmLnBhbmVsLnN0eWxlWyctd2Via2l0LXRyYW5zaXRpb24nXSA9ICcnO1xuICB9LCB0aGlzLl9kdXJhdGlvbiArIDUwKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENsb3NlcyBzbGlkZW91dCBtZW51LlxuICovXG5TbGlkZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBpZiAoIXRoaXMuaXNPcGVuKCkgJiYgIXRoaXMuX29wZW5pbmcpIHsgcmV0dXJuIHRoaXM7IH1cbiAgdGhpcy5fc2V0VHJhbnNpdGlvbigpO1xuICB0aGlzLl90cmFuc2xhdGVYVG8oMCk7XG4gIHRoaXMuX29wZW5lZCA9IGZhbHNlO1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGh0bWwuY2xhc3NOYW1lID0gaHRtbC5jbGFzc05hbWUucmVwbGFjZSgvIHNsaWRlb3V0LW9wZW4vLCAnJyk7XG4gICAgc2VsZi5wYW5lbC5zdHlsZS50cmFuc2l0aW9uID0gc2VsZi5wYW5lbC5zdHlsZVsnLXdlYmtpdC10cmFuc2l0aW9uJ10gPSAnJztcbiAgfSwgdGhpcy5fZHVyYXRpb24gKyA1MCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBUb2dnbGVzIChvcGVuL2Nsb3NlKSBzbGlkZW91dCBtZW51LlxuICovXG5TbGlkZW91dC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmlzT3BlbigpID8gdGhpcy5jbG9zZSgpIDogdGhpcy5vcGVuKCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc2xpZGVvdXQgaXMgY3VycmVudGx5IG9wZW4sIGFuZCBmYWxzZSBpZiBpdCBpcyBjbG9zZWQuXG4gKi9cblNsaWRlb3V0LnByb3RvdHlwZS5pc09wZW4gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuX29wZW5lZDtcbn07XG5cbi8qKlxuICogVHJhbnNsYXRlcyBwYW5lbCBhbmQgdXBkYXRlcyBjdXJyZW50T2Zmc2V0IHdpdGggYSBnaXZlbiBYIHBvaW50XG4gKi9cblNsaWRlb3V0LnByb3RvdHlwZS5fdHJhbnNsYXRlWFRvID0gZnVuY3Rpb24odHJhbnNsYXRlWCkge1xuICB0aGlzLl9jdXJyZW50T2Zmc2V0WCA9IHRyYW5zbGF0ZVg7XG4gIHRoaXMucGFuZWwuc3R5bGVbcHJlZml4ICsgJ3RyYW5zZm9ybSddID0gdGhpcy5wYW5lbC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIHRyYW5zbGF0ZVggKyAncHgsIDAsIDApJztcbn07XG5cbi8qKlxuICogU2V0IHRyYW5zaXRpb24gcHJvcGVydGllc1xuICovXG5TbGlkZW91dC5wcm90b3R5cGUuX3NldFRyYW5zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wYW5lbC5zdHlsZVtwcmVmaXggKyAndHJhbnNpdGlvbiddID0gdGhpcy5wYW5lbC5zdHlsZS50cmFuc2l0aW9uID0gcHJlZml4ICsgJ3RyYW5zZm9ybSAnICsgdGhpcy5fZHVyYXRpb24gKyAnbXMgJyArIHRoaXMuX2Z4O1xufTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyB0b3VjaCBldmVudFxuICovXG5TbGlkZW91dC5wcm90b3R5cGUuX2luaXRUb3VjaEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgLyoqXG4gICAqIERlY291cGxlIHNjcm9sbCBldmVudFxuICAgKi9cbiAgZGVjb3VwbGUoZG9jLCAnc2Nyb2xsJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFzZWxmLl9tb3ZlZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHNjcm9sbFRpbWVvdXQpO1xuICAgICAgc2Nyb2xsaW5nID0gdHJ1ZTtcbiAgICAgIHNjcm9sbFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBzY3JvbGxpbmcgPSBmYWxzZTtcbiAgICAgIH0sIDI1MCk7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogUHJldmVudHMgdG91Y2htb3ZlIGV2ZW50IGlmIHNsaWRlb3V0IGlzIG1vdmluZ1xuICAgKi9cbiAgZG9jLmFkZEV2ZW50TGlzdGVuZXIodG91Y2gubW92ZSwgZnVuY3Rpb24oZXZlKSB7XG4gICAgaWYgKHNlbGYuX21vdmVkKSB7XG4gICAgICBldmUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBSZXNldHMgdmFsdWVzIG9uIHRvdWNoc3RhcnRcbiAgICovXG4gIHRoaXMucGFuZWwuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaC5zdGFydCwgZnVuY3Rpb24oZXZlKSB7XG4gICAgc2VsZi5fbW92ZWQgPSBmYWxzZTtcbiAgICBzZWxmLl9vcGVuaW5nID0gZmFsc2U7XG4gICAgc2VsZi5fc3RhcnRPZmZzZXRYID0gZXZlLnRvdWNoZXNbMF0ucGFnZVg7XG4gICAgc2VsZi5fcHJldmVudE9wZW4gPSAoIXNlbGYuaXNPcGVuKCkgJiYgc2VsZi5tZW51LmNsaWVudFdpZHRoICE9PSAwKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB2YWx1ZXMgb24gdG91Y2hjYW5jZWxcbiAgICovXG4gIHRoaXMucGFuZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCBmdW5jdGlvbigpIHtcbiAgICBzZWxmLl9tb3ZlZCA9IGZhbHNlO1xuICAgIHNlbGYuX29wZW5pbmcgPSBmYWxzZTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgc2xpZGVvdXQgb24gdG91Y2hlbmRcbiAgICovXG4gIHRoaXMucGFuZWwuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaC5lbmQsIGZ1bmN0aW9uKCkge1xuICAgIGlmIChzZWxmLl9tb3ZlZCkge1xuICAgICAgKHNlbGYuX29wZW5pbmcgJiYgTWF0aC5hYnMoc2VsZi5fY3VycmVudE9mZnNldFgpID4gc2VsZi5fdG9sZXJhbmNlKSA/IHNlbGYub3BlbigpIDogc2VsZi5jbG9zZSgpO1xuICAgIH1cbiAgICBzZWxmLl9tb3ZlZCA9IGZhbHNlO1xuICB9KTtcblxuICAvKipcbiAgICogVHJhbnNsYXRlcyBwYW5lbCBvbiB0b3VjaG1vdmVcbiAgICovXG4gIHRoaXMucGFuZWwuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaC5tb3ZlLCBmdW5jdGlvbihldmUpIHtcblxuICAgIGlmIChzY3JvbGxpbmcgfHwgc2VsZi5fcHJldmVudE9wZW4pIHsgcmV0dXJuOyB9XG5cbiAgICB2YXIgZGlmX3ggPSBldmUudG91Y2hlc1swXS5jbGllbnRYIC0gc2VsZi5fc3RhcnRPZmZzZXRYO1xuICAgIHZhciB0cmFuc2xhdGVYID0gc2VsZi5fY3VycmVudE9mZnNldFggPSBkaWZfeDtcblxuICAgIGlmIChNYXRoLmFicyh0cmFuc2xhdGVYKSA+IHNlbGYuX3BhZGRpbmcpIHsgcmV0dXJuOyB9XG5cbiAgICBpZiAoTWF0aC5hYnMoZGlmX3gpID4gMjApIHtcbiAgICAgIHNlbGYuX29wZW5pbmcgPSB0cnVlO1xuXG4gICAgICBpZiAoc2VsZi5fb3BlbmVkICYmIGRpZl94ID4gMCB8fCAhc2VsZi5fb3BlbmVkICYmIGRpZl94IDwgMCkgeyByZXR1cm47IH1cblxuICAgICAgaWYgKCFzZWxmLl9tb3ZlZCAmJiBodG1sLmNsYXNzTmFtZS5zZWFyY2goJ3NsaWRlb3V0LW9wZW4nKSA9PT0gLTEpIHtcbiAgICAgICAgaHRtbC5jbGFzc05hbWUgKz0gJyBzbGlkZW91dC1vcGVuJztcbiAgICAgIH1cblxuICAgICAgaWYgKGRpZl94IDw9IDApIHtcbiAgICAgICAgdHJhbnNsYXRlWCA9IGRpZl94ICsgc2VsZi5fcGFkZGluZztcbiAgICAgICAgc2VsZi5fb3BlbmluZyA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBzZWxmLnBhbmVsLnN0eWxlW3ByZWZpeCArICd0cmFuc2Zvcm0nXSA9IHNlbGYucGFuZWwuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyB0cmFuc2xhdGVYICsgJ3B4LCAwLCAwKSc7XG5cbiAgICAgIHNlbGYuX21vdmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgfSk7XG5cbn07XG5cbi8qKlxuICogRXhwb3NlIFNsaWRlb3V0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gU2xpZGVvdXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgIH07XG59KCkpO1xuXG5mdW5jdGlvbiBkZWNvdXBsZShub2RlLCBldmVudCwgZm4pIHtcbiAgdmFyIGV2ZSxcbiAgICAgIHRyYWNraW5nID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gY2FwdHVyZUV2ZW50KGUpIHtcbiAgICBldmUgPSBlO1xuICAgIHRyYWNrKCk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFjaygpIHtcbiAgICBpZiAoIXRyYWNraW5nKSB7XG4gICAgICByZXF1ZXN0QW5pbUZyYW1lKHVwZGF0ZSk7XG4gICAgICB0cmFja2luZyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIGZuLmNhbGwobm9kZSwgZXZlKTtcbiAgICB0cmFja2luZyA9IGZhbHNlO1xuICB9XG5cbiAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYXB0dXJlRXZlbnQsIGZhbHNlKTtcbn1cblxuLyoqXG4gKiBFeHBvc2UgZGVjb3VwbGVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBkZWNvdXBsZTtcbiJdfQ==
