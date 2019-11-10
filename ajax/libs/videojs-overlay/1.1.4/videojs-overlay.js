/**
 * videojs-overlay
 * @version 1.1.4
 * @copyright 2017 Brightcove, Inc.
 * @license Apache-2.0
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsOverlay = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
module.exports = function tsmlj(ts) {
  var out = '';
  var i = 0;

  // Match normal template string behavior to get the full, formatted string.
  for (; i < arguments.length; i++) {
    out += ts[i] + (arguments[i + 1] || '');
  }

  return out.replace(/\s+/g, ' ').trim();
};

},{}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _templateObject = _taggedTemplateLiteral(['\n      created, listening to "', '" for "start" and\n      "', '" for "end"\n    '], ['\n      created, listening to "', '" for "start" and\n      "', '" for "end"\n    ']),
    _templateObject2 = _taggedTemplateLiteral(['\n          hiding; ', ' is an integer and overlay should not show at this time\n        '], ['\n          hiding; ', ' is an integer and overlay should not show at this time\n        ']),
    _templateObject3 = _taggedTemplateLiteral(['\n          hiding; show point (', ') is before now (', ') and end\n          point (', ') is an event\n        '], ['\n          hiding; show point (', ') is before now (', ') and end\n          point (', ') is an event\n        ']);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _tsmlj = require('tsmlj');

var _tsmlj2 = _interopRequireDefault(_tsmlj);

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

var defaults = {
  align: 'top-left',
  'class': '',
  content: 'This overlay will show up while the video is playing',
  debug: false,
  showBackground: true,
  attachToControlBar: false,
  overlays: [{
    start: 'playing',
    end: 'paused'
  }]
};

var Component = _videoJs2['default'].getComponent('Component');

// These are for cross-compatibility between Video.js 5 and 6.
var dom = _videoJs2['default'].dom || _videoJs2['default'];
var registerPlugin = _videoJs2['default'].registerPlugin || _videoJs2['default'].plugin;

/**
 * Whether the value is a `Number`.
 *
 * Both `Infinity` and `-Infinity` are accepted, but `NaN` is not.
 *
 * @param  {Number} n
 * @return {Boolean}
 */

/* eslint-disable no-self-compare */
var isNumber = function isNumber(n) {
  return typeof n === 'number' && n === n;
};
/* eslint-enable no-self-compare */

/**
 * Whether a value is a string with no whitespace.
 *
 * @param  {String} s
 * @return {Boolean}
 */
var hasNoWhitespace = function hasNoWhitespace(s) {
  return typeof s === 'string' && /^\S+$/.test(s);
};

/**
 * Overlay component.
 *
 * @class   Overlay
 * @extends {videojs.Component}
 */

var Overlay = (function (_Component) {
  _inherits(Overlay, _Component);

  function Overlay(player, options) {
    var _this = this;

    _classCallCheck(this, Overlay);

    _get(Object.getPrototypeOf(Overlay.prototype), 'constructor', this).call(this, player, options);

    ['start', 'end'].forEach(function (key) {
      var value = _this.options_[key];

      if (isNumber(value)) {
        _this[key + 'Event_'] = 'timeupdate';
      } else if (hasNoWhitespace(value)) {
        _this[key + 'Event_'] = value;

        // An overlay MUST have a start option. Otherwise, it's pointless.
      } else if (key === 'start') {
          throw new Error('invalid "start" option; expected number or string');
        }
    });

    // video.js does not like components with multiple instances binding
    // events to the player because it tracks them at the player level,
    // not at the level of the object doing the binding. This could also be
    // solved with Function.prototype.bind (but not videojs.bind because of
    // its GUID magic), but the anonymous function approach avoids any issues
    // caused by crappy libraries clobbering Function.prototype.bind.
    // - https://github.com/videojs/video.js/issues/3097
    ['endListener_', 'rewindListener_', 'startListener_'].forEach(function (name) {
      _this[name] = function (e) {
        return Overlay.prototype[name].call(_this, e);
      };
    });

    // If the start event is a timeupdate, we need to watch for rewinds (i.e.,
    // when the user seeks backward).
    if (this.startEvent_ === 'timeupdate') {
      this.on(player, 'timeupdate', this.rewindListener_);
    }

    this.debug((0, _tsmlj2['default'])(_templateObject, this.startEvent_, this.endEvent_ || 'nothing'));

    this.hide();
  }

  _createClass(Overlay, [{
    key: 'createEl',
    value: function createEl() {
      var options = this.options_;
      var content = options.content;

      var background = options.showBackground ? 'vjs-overlay-background' : 'vjs-overlay-no-background';
      var el = dom.createEl('div', {
        className: '\n        vjs-overlay\n        vjs-overlay-' + options.align + '\n        ' + options['class'] + '\n        ' + background + '\n        vjs-hidden\n      '
      });

      if (typeof content === 'string') {
        el.innerHTML = content;
      } else if (content instanceof _globalWindow2['default'].DocumentFragment) {
        el.appendChild(content);
      } else {
        dom.appendContent(el, content);
      }

      return el;
    }

    /**
     * Logs debug errors
     * @param  {...[type]} args [description]
     * @return {[type]}         [description]
     */
  }, {
    key: 'debug',
    value: function debug() {
      if (!this.options_.debug) {
        return;
      }

      var log = _videoJs2['default'].log;
      var fn = log;

      // Support `videojs.log.foo` calls.

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (log.hasOwnProperty(args[0]) && typeof log[args[0]] === 'function') {
        fn = log[args.shift()];
      }

      fn.apply(undefined, ['overlay#' + this.id() + ': '].concat(args));
    }

    /**
     * Overrides the inherited method to perform some event binding
     *
     * @return {Overlay}
     */
  }, {
    key: 'hide',
    value: function hide() {
      _get(Object.getPrototypeOf(Overlay.prototype), 'hide', this).call(this);

      this.debug('hidden');
      this.debug('bound `startListener_` to "' + this.startEvent_ + '"');

      // Overlays without an "end" are valid.
      if (this.endEvent_) {
        this.debug('unbound `endListener_` from "' + this.endEvent_ + '"');
        this.off(this.player(), this.endEvent_, this.endListener_);
      }

      this.on(this.player(), this.startEvent_, this.startListener_);

      return this;
    }

    /**
     * Determine whether or not the overlay should hide.
     *
     * @param  {Number} time
     *         The current time reported by the player.
     * @param  {String} type
     *         An event type.
     * @return {Boolean}
     */
  }, {
    key: 'shouldHide_',
    value: function shouldHide_(time, type) {
      var end = this.options_.end;

      return isNumber(end) ? time >= end : end === type;
    }

    /**
     * Overrides the inherited method to perform some event binding
     *
     * @return {Overlay}
     */
  }, {
    key: 'show',
    value: function show() {
      _get(Object.getPrototypeOf(Overlay.prototype), 'show', this).call(this);
      this.off(this.player(), this.startEvent_, this.startListener_);
      this.debug('shown');
      this.debug('unbound `startListener_` from "' + this.startEvent_ + '"');

      // Overlays without an "end" are valid.
      if (this.endEvent_) {
        this.debug('bound `endListener_` to "' + this.endEvent_ + '"');
        this.on(this.player(), this.endEvent_, this.endListener_);
      }

      return this;
    }

    /**
     * Determine whether or not the overlay should show.
     *
     * @param  {Number} time
     *         The current time reported by the player.
     * @param  {String} type
     *         An event type.
     * @return {Boolean}
     */
  }, {
    key: 'shouldShow_',
    value: function shouldShow_(time, type) {
      var start = this.options_.start;
      var end = this.options_.end;

      if (isNumber(start)) {

        if (isNumber(end)) {
          return time >= start && time < end;

          // In this case, the start is a number and the end is a string. We need
          // to check whether or not the overlay has shown since the last seek.
        } else if (!this.hasShownSinceSeek_) {
            this.hasShownSinceSeek_ = true;
            return time >= start;
          }

        // In this case, the start is a number and the end is a string, but
        // the overlay has shown since the last seek. This means that we need
        // to be sure we aren't re-showing it at a later time than it is
        // scheduled to appear.
        return Math.floor(time) === start;
      }

      return start === type;
    }

    /**
     * Event listener that can trigger the overlay to show.
     *
     * @param  {Event} e
     */
  }, {
    key: 'startListener_',
    value: function startListener_(e) {
      var time = this.player().currentTime();

      if (this.shouldShow_(time, e.type)) {
        this.show();
      }
    }

    /**
     * Event listener that can trigger the overlay to show.
     *
     * @param  {Event} e
     */
  }, {
    key: 'endListener_',
    value: function endListener_(e) {
      var time = this.player().currentTime();

      if (this.shouldHide_(time, e.type)) {
        this.hide();
      }
    }

    /**
     * Event listener that can looks for rewinds - that is, backward seeks
     * and may hide the overlay as needed.
     *
     * @param  {Event} e
     */
  }, {
    key: 'rewindListener_',
    value: function rewindListener_(e) {
      var time = this.player().currentTime();
      var previous = this.previousTime_;
      var start = this.options_.start;
      var end = this.options_.end;

      // Did we seek backward?
      if (time < previous) {
        this.debug('rewind detected');

        // The overlay remains visible if two conditions are met: the end value
        // MUST be an integer and the the current time indicates that the
        // overlay should NOT be visible.
        if (isNumber(end) && !this.shouldShow_(time)) {
          this.debug((0, _tsmlj2['default'])(_templateObject2, end));
          this.hasShownSinceSeek_ = false;
          this.hide();

          // If the end value is an event name, we cannot reliably decide if the
          // overlay should still be displayed based solely on time; so, we can
          // only queue it up for showing if the seek took us to a point before
          // the start time.
        } else if (hasNoWhitespace(end) && time < start) {
            this.debug((0, _tsmlj2['default'])(_templateObject3, start, time, end));
            this.hasShownSinceSeek_ = false;
            this.hide();
          }
      }

      this.previousTime_ = time;
    }
  }]);

  return Overlay;
})(Component);

_videoJs2['default'].registerComponent('Overlay', Overlay);

/**
 * Initialize the plugin.
 *
 * @function plugin
 * @param    {Object} [options={}]
 */
var plugin = function plugin(options) {
  var _this2 = this;

  var settings = _videoJs2['default'].mergeOptions(defaults, options);

  // De-initialize the plugin if it already has an array of overlays.
  if (Array.isArray(this.overlays_)) {
    this.overlays_.forEach(function (overlay) {
      _this2.removeChild(overlay);
      if (_this2.controlBar) {
        _this2.controlBar.removeChild(overlay);
      }
      overlay.dispose();
    });
  }

  var overlays = settings.overlays;

  // We don't want to keep the original array of overlay options around
  // because it doesn't make sense to pass it to each Overlay component.
  delete settings.overlays;

  this.overlays_ = overlays.map(function (o) {
    var mergeOptions = _videoJs2['default'].mergeOptions(settings, o);

    // Attach bottom aligned overlays to the control bar so
    // they will adjust positioning when the control bar minimizes
    if (mergeOptions.attachToControlBar && _this2.controlBar && mergeOptions.align.indexOf('bottom') !== -1) {
      return _this2.controlBar.addChild('overlay', mergeOptions);
    }

    return _this2.addChild('overlay', mergeOptions);
  });
};

plugin.VERSION = '1.1.4';

registerPlugin('overlay', plugin);

exports['default'] = plugin;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"global/window":1,"tsmlj":2}]},{},[3])(3)
});