(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Clappr"] = factory();
	else
		root["Clappr"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 84);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(33);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(116);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(70);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(33);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(69);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(31);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _typeof2 = __webpack_require__(33);

var _typeof3 = _interopRequireDefault(_typeof2);

var _log = __webpack_require__(71);

var _log2 = _interopRequireDefault(_log);

var _utils = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var slice = Array.prototype.slice;

var eventSplitter = /\s+/;

var eventsApi = function eventsApi(obj, action, name, rest) {
  if (!name) return true;

  // Handle event maps.
  if ((typeof name === 'undefined' ? 'undefined' : (0, _typeof3.default)(name)) === 'object') {
    for (var key in name) {
      obj[action].apply(obj, [key, name[key]].concat(rest));
    }return false;
  }

  // Handle space separated event names.
  if (eventSplitter.test(name)) {
    var names = name.split(eventSplitter);
    for (var i = 0, l = names.length; i < l; i++) {
      obj[action].apply(obj, [names[i]].concat(rest));
    }return false;
  }

  return true;
};

var triggerEvents = function triggerEvents(events, args, klass, name) {
  var ev = void 0,
      i = -1;
  var l = events.length,
      a1 = args[0],
      a2 = args[1],
      a3 = args[2];
  run();

  function run() {
    try {
      switch (args.length) {
        /* eslint-disable curly */
        case 0:
          while (++i < l) {
            (ev = events[i]).callback.call(ev.ctx);
          }return;
        case 1:
          while (++i < l) {
            (ev = events[i]).callback.call(ev.ctx, a1);
          }return;
        case 2:
          while (++i < l) {
            (ev = events[i]).callback.call(ev.ctx, a1, a2);
          }return;
        case 3:
          while (++i < l) {
            (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
          }return;
        default:
          while (++i < l) {
            (ev = events[i]).callback.apply(ev.ctx, args);
          }return;
      }
    } catch (exception) {
      _log2.default.error.apply(_log2.default, [klass, 'error on event', name, 'trigger', '-', exception]);
      run();
    }
  }
};

/**
 * @class Events
 * @constructor
 * @module base
 */

var Events = function () {
  function Events() {
    (0, _classCallCheck3.default)(this, Events);
  }

  /**
   * listen to an event indefinitely, if you want to stop you need to call `off`
   * @method on
   * @param {String} name
   * @param {Function} callback
   * @param {Object} context
   */
  Events.prototype.on = function on(name, callback, context) {
    if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
    this._events || (this._events = {});
    var events = this._events[name] || (this._events[name] = []);
    events.push({ callback: callback, context: context, ctx: context || this });
    return this;
  };

  /**
   * listen to an event only once
   * @method once
   * @param {String} name
   * @param {Function} callback
   * @param {Object} context
   */


  Events.prototype.once = function once(name, callback, context) {
    var _this = this;

    var _once = void 0;
    if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
    var off = function off() {
      return _this.off(name, _once);
    };
    _once = function once() {
      off(name, _once);
      callback.apply(this, arguments);
    };
    return this.on(name, _once, context);
  };

  /**
   * stop listening to an event
   * @method off
   * @param {String} name
   * @param {Function} callback
   * @param {Object} context
   */


  Events.prototype.off = function off(name, callback, context) {
    var retain = void 0,
        ev = void 0,
        events = void 0,
        names = void 0,
        i = void 0,
        l = void 0,
        j = void 0,
        k = void 0;
    if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
    if (!name && !callback && !context) {
      this._events = void 0;
      return this;
    }
    names = name ? [name] : (0, _keys2.default)(this._events);
    // jshint maxdepth:5
    for (i = 0, l = names.length; i < l; i++) {
      name = names[i];
      events = this._events[name];
      if (events) {
        this._events[name] = retain = [];
        if (callback || context) {
          for (j = 0, k = events.length; j < k; j++) {
            ev = events[j];
            if (callback && callback !== ev.callback && callback !== ev.callback._callback || context && context !== ev.context) retain.push(ev);
          }
        }
        if (!retain.length) delete this._events[name];
      }
    }
    return this;
  };

  /**
   * triggers an event given its `name`
   * @method trigger
   * @param {String} name
   */


  Events.prototype.trigger = function trigger(name) {
    var klass = this.name || this.constructor.name;
    _log2.default.debug.apply(_log2.default, [klass].concat(Array.prototype.slice.call(arguments)));
    if (!this._events) return this;
    var args = slice.call(arguments, 1);
    if (!eventsApi(this, 'trigger', name, args)) return this;
    var events = this._events[name];
    var allEvents = this._events.all;
    if (events) triggerEvents(events, args, klass, name);
    if (allEvents) triggerEvents(allEvents, arguments, klass, name);
    return this;
  };

  /**
   * stop listening an event for a given object
   * @method stopListening
   * @param {Object} obj
   * @param {String} name
   * @param {Function} callback
   */


  Events.prototype.stopListening = function stopListening(obj, name, callback) {
    var listeningTo = this._listeningTo;
    if (!listeningTo) return this;
    var remove = !name && !callback;
    if (!callback && (typeof name === 'undefined' ? 'undefined' : (0, _typeof3.default)(name)) === 'object') callback = this;
    if (obj) (listeningTo = {})[obj._listenId] = obj;
    for (var id in listeningTo) {
      obj = listeningTo[id];
      obj.off(name, callback, this);
      if (remove || (0, _keys2.default)(obj._events).length === 0) delete this._listeningTo[id];
    }
    return this;
  };

  Events.register = function register(eventName) {
    Events.Custom || (Events.Custom = {});
    var property = typeof eventName === 'string' && eventName.toUpperCase().trim();

    if (property && !Events.Custom[property]) {
      Events.Custom[property] = property.toLowerCase().split('_').map(function (value, index) {
        return index === 0 ? value : value = value[0].toUpperCase() + value.slice(1);
      }).join('');
    } else _log2.default.error('Events', 'Error when register event: ' + eventName);
  };

  Events.listAvailableCustomEvents = function listAvailableCustomEvents() {
    Events.Custom || (Events.Custom = {});
    return (0, _keys2.default)(Events.Custom).filter(function (property) {
      return typeof Events.Custom[property] === 'string';
    });
  };

  return Events;
}();

/**
 * listen to an event indefinitely for a given `obj`
 * @method listenTo
 * @param {Object} obj
 * @param {String} name
 * @param {Function} callback
 * @param {Object} context
 * @example
 * ```javascript
 * this.listenTo(this.core.playback, Events.PLAYBACK_PAUSE, this.callback)
 * ```
 */
/**
 * listen to an event once for a given `obj`
 * @method listenToOnce
 * @param {Object} obj
 * @param {String} name
 * @param {Function} callback
 * @param {Object} context
 * @example
 * ```javascript
 * this.listenToOnce(this.core.playback, Events.PLAYBACK_PAUSE, this.callback)
 * ```
 */


exports.default = Events;
var listenMethods = { listenTo: 'on', listenToOnce: 'once' };

(0, _keys2.default)(listenMethods).forEach(function (method) {
  Events.prototype[method] = function (obj, name, callback) {
    var listeningTo = this._listeningTo || (this._listeningTo = {});
    var id = obj._listenId || (obj._listenId = (0, _utils.uniqueId)('l'));
    listeningTo[id] = obj;
    if (!callback && (typeof name === 'undefined' ? 'undefined' : (0, _typeof3.default)(name)) === 'object') callback = this;
    obj[listenMethods[method]](name, callback, this);
    return this;
  };
});

// PLAYER EVENTS
/**
 * Fired when the player is ready on startup
 *
 * @event PLAYER_READY
 */
Events.PLAYER_READY = 'ready';
/**
 * Fired when player resizes
 *
 * @event PLAYER_RESIZE
 * @param {Object} currentSize an object with the current size
 */
Events.PLAYER_RESIZE = 'resize';
/**
 * Fired when player changes its fullscreen state
 *
 * @event PLAYER_FULLSCREEN
 * @param {Boolean} whether or not the player is on fullscreen mode
 */
Events.PLAYER_FULLSCREEN = 'fullscreen';
/**
 * Fired when player starts to play
 *
 * @event PLAYER_PLAY
 */
Events.PLAYER_PLAY = 'play';
/**
 * Fired when player pauses
 *
 * @event PLAYER_PAUSE
 */
Events.PLAYER_PAUSE = 'pause';
/**
 * Fired when player stops
 *
 * @event PLAYER_STOP
 */
Events.PLAYER_STOP = 'stop';
/**
 * Fired when player ends the video
 *
 * @event PLAYER_ENDED
 */
Events.PLAYER_ENDED = 'ended';
/**
 * Fired when player seeks the video
 *
 * @event PLAYER_SEEK
 * @param {Number} time the current time in seconds
 */
Events.PLAYER_SEEK = 'seek';
/**
 * Fired when player receives an error
 *
 * @event PLAYER_ERROR
 * @param {Object} error the error
 */
Events.PLAYER_ERROR = 'error';
/**
 * Fired when the time is updated on player
 *
 * @event PLAYER_TIMEUPDATE
 * @param {Object} progress Data
 * progress object
 * @param {Number} [progress.current]
 * current time
 * @param {Number} [progress.total]
 * total time
 */
Events.PLAYER_TIMEUPDATE = 'timeupdate';
/**
 * Fired when player updates its volume
 *
 * @event PLAYER_VOLUMEUPDATE
 * @param {Number} volume the current volume
 */
Events.PLAYER_VOLUMEUPDATE = 'volumeupdate';

/**
 * Fired when subtitle is available
 *
 * @event PLAYER_SUBTITLE_AVAILABLE
 */
Events.PLAYER_SUBTITLE_AVAILABLE = 'subtitleavailable';

// Playback Events
/**
 * Fired when the playback is downloading the media
 *
 * @event PLAYBACK_PROGRESS
 * @param progress {Object}
 * Data progress object
 * @param [progress.start] {Number}
 * start position of buffered content at current position
 * @param [progress.current] {Number}
 * end position of buffered content at current position
 * @param [progress.total] {Number}
 * total content to be downloaded
 * @param buffered {Array}
 * array of buffered segments ({start, end}). [Only for supported playbacks]
 */
Events.PLAYBACK_PROGRESS = 'playback:progress';
/**
 * Fired when the time is updated on playback
 *
 * @event PLAYBACK_TIMEUPDATE
 * @param {Object} progress Data
 * progress object
 * @param {Number} [progress.current]
 * current time
 * @param {Number} [progress.total]
 * total time
 */
Events.PLAYBACK_TIMEUPDATE = 'playback:timeupdate';
/**
 * Fired when playback is ready
 *
 * @event PLAYBACK_READY
 */
Events.PLAYBACK_READY = 'playback:ready';
/**
 * Fired when the playback starts having to buffer because
 * playback can currently not be smooth.
 *
 * This corresponds to the playback `buffering` property being
 * `true`.
 *
 * @event PLAYBACK_BUFFERING
 */
Events.PLAYBACK_BUFFERING = 'playback:buffering';
/**
 * Fired when the playback has enough in the buffer to be
 * able to play smoothly, after previously being unable to
 * do this.
 *
 * This corresponds to the playback `buffering` property being
 * `false`.
 *
 * @event PLAYBACK_BUFFERFULL
 */
Events.PLAYBACK_BUFFERFULL = 'playback:bufferfull';
/**
 * Fired when playback changes any settings (volume, seek and etc)
 *
 * @event PLAYBACK_SETTINGSUPDATE
 */
Events.PLAYBACK_SETTINGSUPDATE = 'playback:settingsupdate';
/**
 * Fired when playback loaded its metadata
 *
 * @event PLAYBACK_LOADEDMETADATA
 * @param {Object} metadata Data
 * settings object
 * @param {Number} [metadata.duration]
 * the playback duration
 * @param {Object} [metadata.data]
 * extra meta data
 */
Events.PLAYBACK_LOADEDMETADATA = 'playback:loadedmetadata';
/**
 * Fired when playback updates its video quality
 *
 * @event PLAYBACK_HIGHDEFINITIONUPDATE
 * @param {Boolean} isHD
 * true when is on HD, false otherwise
 */
Events.PLAYBACK_HIGHDEFINITIONUPDATE = 'playback:highdefinitionupdate';
/**
 * Fired when playback updates its bitrate
 *
 * @event PLAYBACK_BITRATE
 * @param {Object} bitrate Data
 * bitrate object
 * @param {Number} [bitrate.bandwidth]
 * bitrate bandwidth when it's available
 * @param {Number} [bitrate.width]
 * playback width (ex: 720, 640, 1080)
 * @param {Number} [bitrate.height]
 * playback height (ex: 240, 480, 720)
 * @param {Number} [bitrate.level]
 * playback level when it's available, it could be just a map for width (0 => 240, 1 => 480, 2 => 720)
 */
Events.PLAYBACK_BITRATE = 'playback:bitrate';
/**
 * Fired when the playback has its levels
 *
 * @event PLAYBACK_LEVELS_AVAILABLE
 * @param {Array} levels
 * the ordered levels, each one with the following format `{id: 1, label: '500kbps'}` ps: id should be a number >= 0
 * @param {Number} initial
 * the initial level otherwise -1 (AUTO)
 */
Events.PLAYBACK_LEVELS_AVAILABLE = 'playback:levels:available';
/**
 * Fired when the playback starts to switch level
 *
 * @event PLAYBACK_LEVEL_SWITCH_START
 *
 */
Events.PLAYBACK_LEVEL_SWITCH_START = 'playback:levels:switch:start';
/**
 * Fired when the playback ends the level switch
 *
 * @event PLAYBACK_LEVEL_SWITCH_END
 *
 */
Events.PLAYBACK_LEVEL_SWITCH_END = 'playback:levels:switch:end';

/**
 * Fired when playback internal state changes
 *
 * @event PLAYBACK_PLAYBACKSTATE
 * @param {Object} state Data
 * state object
 * @param {String} [state.type]
 * the playback type
 */
Events.PLAYBACK_PLAYBACKSTATE = 'playback:playbackstate';
/**
 * Fired when DVR becomes enabled/disabled.
 *
 * @event PLAYBACK_DVR
 * @param {boolean} state true if dvr enabled
 */
Events.PLAYBACK_DVR = 'playback:dvr';
// TODO doc
Events.PLAYBACK_MEDIACONTROL_DISABLE = 'playback:mediacontrol:disable';
// TODO doc
Events.PLAYBACK_MEDIACONTROL_ENABLE = 'playback:mediacontrol:enable';
/**
 * Fired when the media for a playback ends.
 *
 * @event PLAYBACK_ENDED
 * @param {String} name the name of the playback
 */
Events.PLAYBACK_ENDED = 'playback:ended';
/**
 * Fired when user requests `play()`
 *
 * @event PLAYBACK_PLAY_INTENT
 */
Events.PLAYBACK_PLAY_INTENT = 'playback:play:intent';
/**
 * Fired when the media for a playback starts playing.
 * This is not necessarily when the user requests `play()`
 * The media may have to buffer first.
 * I.e. `isPlaying()` might return `true` before this event is fired,
 * because `isPlaying()` represents the intended state.
 *
 * @event PLAYBACK_PLAY
 */
Events.PLAYBACK_PLAY = 'playback:play';
/**
 * Fired when the media for a playback pauses.
 *
 * @event PLAYBACK_PAUSE
 */
Events.PLAYBACK_PAUSE = 'playback:pause';
/**
 * Fired when the media for a playback is seeked.
 *
 * @event PLAYBACK_SEEKED
 */
Events.PLAYBACK_SEEKED = 'playback:seeked';
/**
 * Fired when the media for a playback is stopped.
 *
 * @event PLAYBACK_STOP
 */
Events.PLAYBACK_STOP = 'playback:stop';
/**
 * Fired if an error occurs in the playback.
 *
 * @event PLAYBACK_ERROR
 * @param {Object} error An object containing the error details
 * @param {String} name Playback name
 */
Events.PLAYBACK_ERROR = 'playback:error';
// TODO doc
Events.PLAYBACK_STATS_ADD = 'playback:stats:add';
// TODO doc
Events.PLAYBACK_FRAGMENT_LOADED = 'playback:fragment:loaded';
// TODO doc
Events.PLAYBACK_LEVEL_SWITCH = 'playback:level:switch';
/**
 * Fired when subtitle is available on playback for display
 *
 * @event PLAYBACK_SUBTITLE_AVAILABLE
 */
Events.PLAYBACK_SUBTITLE_AVAILABLE = 'playback:subtitle:available';
/**
 * Fired when playback subtitle track has changed
 *
 * @event CONTAINER_SUBTITLE_CHANGED
 * @param {Object} track Data
 * track object
 * @param {Number} [track.id]
 * selected track id
 */
Events.PLAYBACK_SUBTITLE_CHANGED = 'playback:subtitle:changed';

// Core Events
/**
 * Fired when the containers are created
 *
 * @event CORE_CONTAINERS_CREATED
 */
Events.CORE_CONTAINERS_CREATED = 'core:containers:created';
/**
 * Fired when the options were changed for the core
 *
 * @event CORE_OPTIONS_CHANGE
 */
Events.CORE_OPTIONS_CHANGE = 'core:options:change';
/**
 * Fired after creating containers, when the core is ready
 *
 * @event CORE_READY
 */
Events.CORE_READY = 'core:ready';
/**
 * Fired when the fullscreen state change
 *
 * @event CORE_FULLSCREEN
 * @param {Boolean} whether or not the player is on fullscreen mode
 */
Events.CORE_FULLSCREEN = 'core:fullscreen';
/**
 * Fired when the screen orientation has changed.
 * This event is trigger only for mobile devices.
 *
 * @event CORE_SCREEN_ORIENTATION_CHANGED
 * @param {Object} screen An object with screen orientation
 * screen object
 * @param {Object} [screen.event]
 * window resize event object
 * @param {String} [screen.orientation]
 * screen orientation (ie: 'landscape' or 'portrait')
 */
Events.CORE_SCREEN_ORIENTATION_CHANGED = 'core:screen:orientation:changed';

// Container Events
/**
 * Fired when the container internal state changes
 *
 * @event CONTAINER_PLAYBACKSTATE
 * @param {Object} state Data
 * state object
 * @param {String} [state.type]
 * the playback type
 */
Events.CONTAINER_PLAYBACKSTATE = 'container:playbackstate';
Events.CONTAINER_PLAYBACKDVRSTATECHANGED = 'container:dvr';
/**
 * Fired when the container updates its bitrate
 *
 * @event CONTAINER_BITRATE
 * @param {Object} bitrate Data
 * bitrate object
 * @param {Number} [bitrate.bandwidth]
 * bitrate bandwidth when it's available
 * @param {Number} [bitrate.width]
 * playback width (ex: 720, 640, 1080)
 * @param {Number} [bitrate.height]
 * playback height (ex: 240, 480, 720)
 * @param {Number} [bitrate.level]
 * playback level when it's available, it could be just a map for width (0 => 240, 1 => 480, 2 => 720)
 */
Events.CONTAINER_BITRATE = 'container:bitrate';
Events.CONTAINER_STATS_REPORT = 'container:stats:report';
Events.CONTAINER_DESTROYED = 'container:destroyed';
/**
 * Fired when the container is ready
 *
 * @event CONTAINER_READY
 */
Events.CONTAINER_READY = 'container:ready';
Events.CONTAINER_ERROR = 'container:error';
/**
 * Fired when the container loaded its metadata
 *
 * @event CONTAINER_LOADEDMETADATA
 * @param {Object} metadata Data
 * settings object
 * @param {Number} [metadata.duration]
 * the playback duration
 * @param {Object} [metadata.data]
 * extra meta data
 */
Events.CONTAINER_LOADEDMETADATA = 'container:loadedmetadata';

/**
 * Fired when subtitle is available on container for display
 *
 * @event CONTAINER_SUBTITLE_AVAILABLE
 */
Events.CONTAINER_SUBTITLE_AVAILABLE = 'container:subtitle:available';
/**
 * Fired when subtitle track has changed
 *
 * @event CONTAINER_SUBTITLE_CHANGED
 * @param {Object} track Data
 * track object
 * @param {Number} [track.id]
 * selected track id
 */
Events.CONTAINER_SUBTITLE_CHANGED = 'container:subtitle:changed';

/**
 * Fired when the time is updated on container
 *
 * @event CONTAINER_TIMEUPDATE
 * @param {Object} progress Data
 * progress object
 * @param {Number} [progress.current]
 * current time
 * @param {Number} [progress.total]
 * total time
 */
Events.CONTAINER_TIMEUPDATE = 'container:timeupdate';
/**
 * Fired when the container is downloading the media
 *
 * @event CONTAINER_PROGRESS
 * @param {Object} progress Data
 * progress object
 * @param {Number} [progress.start]
 * initial downloaded content
 * @param {Number} [progress.current]
 * current dowloaded content
 * @param {Number} [progress.total]
 * total content to be downloaded
 */
Events.CONTAINER_PROGRESS = 'container:progress';
Events.CONTAINER_PLAY = 'container:play';
Events.CONTAINER_STOP = 'container:stop';
Events.CONTAINER_PAUSE = 'container:pause';
Events.CONTAINER_ENDED = 'container:ended';
Events.CONTAINER_CLICK = 'container:click';
Events.CONTAINER_DBLCLICK = 'container:dblclick';
Events.CONTAINER_CONTEXTMENU = 'container:contextmenu';
Events.CONTAINER_MOUSE_ENTER = 'container:mouseenter';
Events.CONTAINER_MOUSE_LEAVE = 'container:mouseleave';
/**
 * Fired when the container seeks the video
 *
 * @event CONTAINER_SEEK
 * @param {Number} time the current time in seconds
 */
Events.CONTAINER_SEEK = 'container:seek';
/**
 * Fired when the container was finished the seek video
 *
 * @event CONTAINER_SEEKED
 * @param {Number} time the current time in seconds
 */
Events.CONTAINER_SEEKED = 'container:seeked';
Events.CONTAINER_VOLUME = 'container:volume';
Events.CONTAINER_FULLSCREEN = 'container:fullscreen';
/**
 * Fired when container is buffering
 *
 * @event CONTAINER_STATE_BUFFERING
 */
Events.CONTAINER_STATE_BUFFERING = 'container:state:buffering';
/**
 * Fired when the container filled the buffer
 *
 * @event CONTAINER_STATE_BUFFERFULL
 */
Events.CONTAINER_STATE_BUFFERFULL = 'container:state:bufferfull';
/**
 * Fired when the container changes any settings (volume, seek and etc)
 *
 * @event CONTAINER_SETTINGSUPDATE
 */
Events.CONTAINER_SETTINGSUPDATE = 'container:settingsupdate';
/**
 * Fired when container updates its video quality
 *
 * @event CONTAINER_HIGHDEFINITIONUPDATE
 * @param {Boolean} isHD
 * true when is on HD, false otherwise
 */
Events.CONTAINER_HIGHDEFINITIONUPDATE = 'container:highdefinitionupdate';

/**
 * Fired when the media control shows
 *
 * @event CONTAINER_MEDIACONTROL_SHOW
 */
Events.CONTAINER_MEDIACONTROL_SHOW = 'container:mediacontrol:show';
/**
 * Fired when the media control hides
 *
 * @event CONTAINER_MEDIACONTROL_HIDE
 */
Events.CONTAINER_MEDIACONTROL_HIDE = 'container:mediacontrol:hide';

Events.CONTAINER_MEDIACONTROL_DISABLE = 'container:mediacontrol:disable';
Events.CONTAINER_MEDIACONTROL_ENABLE = 'container:mediacontrol:enable';
Events.CONTAINER_STATS_ADD = 'container:stats:add';
/**
 * Fired when the options were changed for the container
 *
 * @event CONTAINER_OPTIONS_CHANGE
 */
Events.CONTAINER_OPTIONS_CHANGE = 'container:options:change';

// MediaControl Events
Events.MEDIACONTROL_RENDERED = 'mediacontrol:rendered';
/**
 * Fired when the player enters/exit on fullscreen
 *
 * @event MEDIACONTROL_FULLSCREEN
 */
Events.MEDIACONTROL_FULLSCREEN = 'mediacontrol:fullscreen';
/**
 * Fired when the media control shows
 *
 * @event MEDIACONTROL_SHOW
 */
Events.MEDIACONTROL_SHOW = 'mediacontrol:show';
/**
 * Fired when the media control hides
 *
 * @event MEDIACONTROL_HIDE
 */
Events.MEDIACONTROL_HIDE = 'mediacontrol:hide';
/**
 * Fired when mouse enters on the seekbar
 *
 * @event MEDIACONTROL_MOUSEMOVE_SEEKBAR
 * @param {Object} event
 * the javascript event
 */
Events.MEDIACONTROL_MOUSEMOVE_SEEKBAR = 'mediacontrol:mousemove:seekbar';
/**
 * Fired when mouse leaves the seekbar
 *
 * @event MEDIACONTROL_MOUSELEAVE_SEEKBAR
 * @param {Object} event
 * the javascript event
 */
Events.MEDIACONTROL_MOUSELEAVE_SEEKBAR = 'mediacontrol:mouseleave:seekbar';
/**
 * Fired when the media is being played
 *
 * @event MEDIACONTROL_PLAYING
 */
Events.MEDIACONTROL_PLAYING = 'mediacontrol:playing';
/**
 * Fired when the media is not being played
 *
 * @event MEDIACONTROL_NOTPLAYING
 */
Events.MEDIACONTROL_NOTPLAYING = 'mediacontrol:notplaying';
/**
 * Fired when the container was changed
 *
 * @event MEDIACONTROL_CONTAINERCHANGED
 */
Events.MEDIACONTROL_CONTAINERCHANGED = 'mediacontrol:containerchanged';
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DomRecycler = exports.cancelAnimationFrame = exports.requestAnimationFrame = exports.QueryString = exports.Config = exports.Fullscreen = undefined;

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _defineProperty = __webpack_require__(69);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyDescriptor = __webpack_require__(122);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

exports.extend = extend;
exports.formatTime = formatTime;
exports.seekStringToSeconds = seekStringToSeconds;
exports.uniqueId = uniqueId;
exports.isNumber = isNumber;
exports.currentScriptUrl = currentScriptUrl;
exports.getBrowserLanguage = getBrowserLanguage;
exports.now = now;
exports.removeArrayItem = removeArrayItem;

__webpack_require__(125);

var _browser = __webpack_require__(24);

var _browser2 = _interopRequireDefault(_browser);

var _clapprZepto = __webpack_require__(6);

var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assign(obj, source) {
  if (source) {
    for (var prop in source) {
      var propDescriptor = (0, _getOwnPropertyDescriptor2.default)(source, prop);
      propDescriptor ? (0, _defineProperty2.default)(obj, prop, propDescriptor) : obj[prop] = source[prop];
    }
  }
  return obj;
} // Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
/*jshint -W079 */

function extend(parent, properties) {
  var Surrogate = function (_parent) {
    (0, _inherits3.default)(Surrogate, _parent);

    function Surrogate() {
      (0, _classCallCheck3.default)(this, Surrogate);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = (0, _possibleConstructorReturn3.default)(this, _parent.call.apply(_parent, [this].concat(args)));

      if (properties.initialize) properties.initialize.apply(_this, args);

      return _this;
    }

    return Surrogate;
  }(parent);

  assign(Surrogate.prototype, properties);
  return Surrogate;
}

function formatTime(time, paddedHours) {
  if (!isFinite(time)) return '--:--';

  time = time * 1000;
  time = parseInt(time / 1000);
  var seconds = time % 60;
  time = parseInt(time / 60);
  var minutes = time % 60;
  time = parseInt(time / 60);
  var hours = time % 24;
  var days = parseInt(time / 24);
  var out = '';
  if (days && days > 0) {
    out += days + ':';
    if (hours < 1) out += '00:';
  }
  if (hours && hours > 0 || paddedHours) out += ('0' + hours).slice(-2) + ':';
  out += ('0' + minutes).slice(-2) + ':';
  out += ('0' + seconds).slice(-2);
  return out.trim();
}

var Fullscreen = exports.Fullscreen = {
  isFullscreen: function isFullscreen() {
    return !!(document.webkitFullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement);
  },
  requestFullscreen: function requestFullscreen(el) {
    if (el.requestFullscreen) el.requestFullscreen();else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();else if (el.mozRequestFullScreen) el.mozRequestFullScreen();else if (el.msRequestFullscreen) el.msRequestFullscreen();else if (el.querySelector && el.querySelector('video') && el.querySelector('video').webkitEnterFullScreen) el.querySelector('video').webkitEnterFullScreen();else if (el.webkitEnterFullScreen) el.webkitEnterFullScreen();
  },
  cancelFullscreen: function cancelFullscreen() {
    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    if (el.exitFullscreen) el.exitFullscreen();else if (el.webkitCancelFullScreen) el.webkitCancelFullScreen();else if (el.webkitExitFullscreen) el.webkitExitFullscreen();else if (el.mozCancelFullScreen) el.mozCancelFullScreen();else if (el.msExitFullscreen) el.msExitFullscreen();
  },
  fullscreenEnabled: function fullscreenEnabled() {
    return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
  }
};

var Config = exports.Config = function () {
  function Config() {
    (0, _classCallCheck3.default)(this, Config);
  }

  Config._defaultConfig = function _defaultConfig() {
    return {
      volume: {
        value: 100,
        parse: parseInt
      }
    };
  };

  Config._defaultValueFor = function _defaultValueFor(key) {
    try {
      return this._defaultConfig()[key].parse(this._defaultConfig()[key].value);
    } catch (e) {
      return undefined;
    }
  };

  Config._createKeyspace = function _createKeyspace(key) {
    return 'clappr.' + document.domain + '.' + key;
  };

  Config.restore = function restore(key) {
    if (_browser2.default.hasLocalstorage && localStorage[this._createKeyspace(key)]) return this._defaultConfig()[key].parse(localStorage[this._createKeyspace(key)]);

    return this._defaultValueFor(key);
  };

  Config.persist = function persist(key, value) {
    if (_browser2.default.hasLocalstorage) {
      try {
        localStorage[this._createKeyspace(key)] = value;
        return true;
      } catch (e) {
        return false;
      }
    }
  };

  return Config;
}();

var QueryString = exports.QueryString = function () {
  function QueryString() {
    (0, _classCallCheck3.default)(this, QueryString);
  }

  QueryString.parse = function parse(paramsString) {
    var match = void 0;
    var pl = /\+/g,
        // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
        decode = function decode(s) {
      return decodeURIComponent(s.replace(pl, ' '));
    },
        params = {};
    while (match = search.exec(paramsString)) {
      // eslint-disable-line no-cond-assign
      params[decode(match[1]).toLowerCase()] = decode(match[2]);
    }
    return params;
  };

  (0, _createClass3.default)(QueryString, null, [{
    key: 'params',
    get: function get() {
      var query = window.location.search.substring(1);
      if (query !== this.query) {
        this._urlParams = this.parse(query);
        this.query = query;
      }
      return this._urlParams;
    }
  }, {
    key: 'hashParams',
    get: function get() {
      var hash = window.location.hash.substring(1);
      if (hash !== this.hash) {
        this._hashParams = this.parse(hash);
        this.hash = hash;
      }
      return this._hashParams;
    }
  }]);
  return QueryString;
}();

function seekStringToSeconds() {
  var paramName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 't';

  var seconds = 0;
  var seekString = QueryString.params[paramName] || QueryString.hashParams[paramName] || '';
  var parts = seekString.match(/[0-9]+[hms]+/g) || [];
  if (parts.length > 0) {
    (function () {
      var factor = { 'h': 3600, 'm': 60, 's': 1 };
      parts.forEach(function (el) {
        if (el) {
          var suffix = el[el.length - 1];
          var time = parseInt(el.slice(0, el.length - 1), 10);
          seconds += time * factor[suffix];
        }
      });
    })();
  } else if (seekString) {
    seconds = parseInt(seekString, 10);
  }

  return seconds;
}

var idsCounter = {};

function uniqueId(prefix) {
  idsCounter[prefix] || (idsCounter[prefix] = 0);
  var id = ++idsCounter[prefix];
  return prefix + id;
}

function isNumber(value) {
  return value - parseFloat(value) + 1 >= 0;
}

function currentScriptUrl() {
  var scripts = document.getElementsByTagName('script');
  return scripts.length ? scripts[scripts.length - 1].src : '';
}

var requestAnimationFrame = exports.requestAnimationFrame = (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
  window.setTimeout(fn, 1000 / 60);
}).bind(window);

var cancelAnimationFrame = exports.cancelAnimationFrame = (window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout).bind(window);

function getBrowserLanguage() {
  return window.navigator && window.navigator.language;
}

function now() {
  if (window.performance && window.performance.now) return performance.now();

  return Date.now();
}

// remove the item from the array if it exists in the array
function removeArrayItem(arr, item) {
  var i = arr.indexOf(item);
  if (i >= 0) arr.splice(i, 1);
}

// Simple Zepto element factory with video recycle feature.
var videoStack = [];

var DomRecycler = exports.DomRecycler = function () {
  function DomRecycler() {
    (0, _classCallCheck3.default)(this, DomRecycler);
  }

  DomRecycler.configure = function configure(options) {
    this.options = _clapprZepto2.default.extend(this.options, options);
  };

  DomRecycler.create = function create(name) {
    if (this.options.recycleVideo && name === 'video' && videoStack.length > 0) return videoStack.shift();

    return (0, _clapprZepto2.default)('<' + name + '>');
  };

  DomRecycler.garbage = function garbage($el) {
    // Expect Zepto collection with single element (does not iterate!)
    if (!this.options.recycleVideo || $el[0].tagName.toUpperCase() !== 'VIDEO') return;
    $el.children().remove();
    videoStack.push($el);
  };

  return DomRecycler;
}();

DomRecycler.options = { recycleVideo: false };

exports.default = {
  Config: Config,
  Fullscreen: Fullscreen,
  QueryString: QueryString,
  DomRecycler: DomRecycler,
  extend: extend,
  formatTime: formatTime,
  seekStringToSeconds: seekStringToSeconds,
  uniqueId: uniqueId,
  currentScriptUrl: currentScriptUrl,
  isNumber: isNumber,
  requestAnimationFrame: requestAnimationFrame,
  cancelAnimationFrame: cancelAnimationFrame,
  getBrowserLanguage: getBrowserLanguage,
  now: now,
  removeArrayItem: removeArrayItem
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

/* Zepto v1.2.0 - zepto ajax callbacks deferred event ie selector - zeptojs.com/license */


var Zepto = (function() {
  var undefined, key, $, classList, emptyArray = [], concat = emptyArray.concat, filter = emptyArray.filter, slice = emptyArray.slice,
    document = window.document,
    elementDisplay = {}, classCache = {},
    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    rootNodeRE = /^(?:body|html)$/i,
    capitalRE = /([A-Z])/g,

    // special attributes that should be get/set via method calls
    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
    table = document.createElement('table'),
    tableRow = document.createElement('tr'),
    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
    readyRE = /complete|loaded|interactive/,
    simpleSelectorRE = /^[\w-]*$/,
    class2type = {},
    toString = class2type.toString,
    zepto = {},
    camelize, uniq,
    tempParent = document.createElement('div'),
    propMap = {
      'tabindex': 'tabIndex',
      'readonly': 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      'maxlength': 'maxLength',
      'cellspacing': 'cellSpacing',
      'cellpadding': 'cellPadding',
      'rowspan': 'rowSpan',
      'colspan': 'colSpan',
      'usemap': 'useMap',
      'frameborder': 'frameBorder',
      'contenteditable': 'contentEditable'
    },
    isArray = Array.isArray ||
      function(object){ return object instanceof Array }

  zepto.matches = function(element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false
    var matchesSelector = element.matches || element.webkitMatchesSelector ||
                          element.mozMatchesSelector || element.oMatchesSelector ||
                          element.matchesSelector
    if (matchesSelector) return matchesSelector.call(element, selector)
    // fall back to performing a selector:
    var match, parent = element.parentNode, temp = !parent
    if (temp) (parent = tempParent).appendChild(element)
    match = ~zepto.qsa(parent, selector).indexOf(element)
    temp && tempParent.removeChild(element)
    return match
  }

  function type(obj) {
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || "object"
  }

  function isFunction(value) { return type(value) == "function" }
  function isWindow(obj)     { return obj != null && obj == obj.window }
  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
  function isObject(obj)     { return type(obj) == "object" }
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
  }

  function likeArray(obj) {
    var length = !!obj && 'length' in obj && obj.length,
      type = $.type(obj)

    return 'function' != type && !isWindow(obj) && (
      'array' == type || length === 0 ||
        (typeof length == 'number' && length > 0 && (length - 1) in obj)
    )
  }

  function compact(array) { return filter.call(array, function(item){ return item != null }) }
  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
  function dasherize(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
  }
  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

  function classRE(name) {
    return name in classCache ?
      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
  }

  function maybeAddPx(name, value) {
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
  }

  function defaultDisplay(nodeName) {
    var element, display
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName)
      document.body.appendChild(element)
      display = getComputedStyle(element, '').getPropertyValue("display")
      element.parentNode.removeChild(element)
      display == "none" && (display = "block")
      elementDisplay[nodeName] = display
    }
    return elementDisplay[nodeName]
  }

  function children(element) {
    return 'children' in element ?
      slice.call(element.children) :
      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
  }

  function Z(dom, selector) {
    var i, len = dom ? dom.length : 0
    for (i = 0; i < len; i++) this[i] = dom[i]
    this.length = len
    this.selector = selector || ''
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overridden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function(html, name, properties) {
    var dom, nodes, container

    // A special case optimization for a single tag
    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

    if (!dom) {
      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
      if (!(name in containers)) name = '*'

      container = containers[name]
      container.innerHTML = '' + html
      dom = $.each(slice.call(container.childNodes), function(){
        container.removeChild(this)
      })
    }

    if (isPlainObject(properties)) {
      nodes = $(dom)
      $.each(properties, function(key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
        else nodes.attr(key, value)
      })
    }

    return dom
  }

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. This method can be overridden in plugins.
  zepto.Z = function(dom, selector) {
    return new Z(dom, selector)
  }

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overridden in plugins.
  zepto.isZ = function(object) {
    return object instanceof zepto.Z
  }

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overridden in plugins.
  zepto.init = function(selector, context) {
    var dom
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z()
    // Optimize for string selectors
    else if (typeof selector == 'string') {
      selector = selector.trim()
      // If it's a html fragment, create nodes from it
      // Note: In both Chrome 21 and Firefox 15, DOM error 12
      // is thrown if the fragment doesn't begin with <
      if (selector[0] == '<' && fragmentRE.test(selector))
        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // If it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return $(document).ready(selector)
    // If a Zepto collection is given, just return it
    else if (zepto.isZ(selector)) return selector
    else {
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)
      // Wrap DOM nodes.
      else if (isObject(selector))
        dom = [selector], selector = null
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector)
  }

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function(selector, context){
    return zepto.init(selector, context)
  }

  function extend(target, source, deep) {
    for (key in source)
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = []
        extend(target[key], source[key], deep)
      }
      else if (source[key] !== undefined) target[key] = source[key]
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function(target){
    var deep, args = slice.call(arguments, 1)
    if (typeof target == 'boolean') {
      deep = target
      target = args.shift()
    }
    args.forEach(function(arg){ extend(target, arg, deep) })
    return target
  }

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overridden in plugins.
  zepto.qsa = function(element, selector){
    var found,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
        isSimple = simpleSelectorRE.test(nameOnly)
    return (element.getElementById && isSimple && maybeID) ? // Safari DocumentFragment doesn't have getElementById
      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
      (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :
      slice.call(
        isSimple && !maybeID && element.getElementsByClassName ? // DocumentFragment doesn't have getElementsByClassName/TagName
          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
          element.getElementsByTagName(selector) : // Or a tag
          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
      )
  }

  function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector)
  }

  $.contains = document.documentElement.contains ?
    function(parent, node) {
      return parent !== node && parent.contains(node)
    } :
    function(parent, node) {
      while (node && (node = node.parentNode))
        if (node === parent) return true
      return false
    }

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg
  }

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value){
    var klass = node.className || '',
        svg   = klass && klass.baseVal !== undefined

    if (value === undefined) return svg ? klass.baseVal : klass
    svg ? (klass.baseVal = value) : (node.className = value)
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // "08"    => "08"
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    try {
      return value ?
        value == "true" ||
        ( value == "false" ? false :
          value == "null" ? null :
          +value + "" == value ? +value :
          /^[\[\{]/.test(value) ? $.parseJSON(value) :
          value )
        : value
    } catch(e) {
      return value
    }
  }

  $.type = type
  $.isFunction = isFunction
  $.isWindow = isWindow
  $.isArray = isArray
  $.isPlainObject = isPlainObject

  $.isEmptyObject = function(obj) {
    var name
    for (name in obj) return false
    return true
  }

  $.isNumeric = function(val) {
    var num = Number(val), type = typeof val
    return val != null && type != 'boolean' &&
      (type != 'string' || val.length) &&
      !isNaN(num) && isFinite(num) || false
  }

  $.inArray = function(elem, array, i){
    return emptyArray.indexOf.call(array, elem, i)
  }

  $.camelCase = camelize
  $.trim = function(str) {
    return str == null ? "" : String.prototype.trim.call(str)
  }

  // plugin compatibility
  $.uuid = 0
  $.support = { }
  $.expr = { }
  $.noop = function() {}

  $.map = function(elements, callback){
    var value, values = [], i, key
    if (likeArray(elements))
      for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i)
        if (value != null) values.push(value)
      }
    else
      for (key in elements) {
        value = callback(elements[key], key)
        if (value != null) values.push(value)
      }
    return flatten(values)
  }

  $.each = function(elements, callback){
    var i, key
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++)
        if (callback.call(elements[i], i, elements[i]) === false) return elements
    } else {
      for (key in elements)
        if (callback.call(elements[key], key, elements[key]) === false) return elements
    }

    return elements
  }

  $.grep = function(elements, callback){
    return filter.call(elements, callback)
  }

  if (window.JSON) $.parseJSON = JSON.parse

  // Populate the class2type map
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase()
  })

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    constructor: zepto.Z,
    length: 0,

    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    splice: emptyArray.splice,
    indexOf: emptyArray.indexOf,
    concat: function(){
      var i, value, args = []
      for (i = 0; i < arguments.length; i++) {
        value = arguments[i]
        args[i] = zepto.isZ(value) ? value.toArray() : value
      }
      return concat.apply(zepto.isZ(this) ? this.toArray() : this, args)
    },

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function(fn){
      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
    },
    slice: function(){
      return $(slice.apply(this, arguments))
    },

    ready: function(callback){
      // need to check if document.body exists for IE as that browser reports
      // document ready when it hasn't yet created the body element
      if (readyRE.test(document.readyState) && document.body) callback($)
      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
      return this
    },
    get: function(idx){
      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
    },
    toArray: function(){ return this.get() },
    size: function(){
      return this.length
    },
    remove: function(){
      return this.each(function(){
        if (this.parentNode != null)
          this.parentNode.removeChild(this)
      })
    },
    each: function(callback){
      emptyArray.every.call(this, function(el, idx){
        return callback.call(el, idx, el) !== false
      })
      return this
    },
    filter: function(selector){
      if (isFunction(selector)) return this.not(this.not(selector))
      return $(filter.call(this, function(element){
        return zepto.matches(element, selector)
      }))
    },
    add: function(selector,context){
      return $(uniq(this.concat($(selector,context))))
    },
    is: function(selector){
      return this.length > 0 && zepto.matches(this[0], selector)
    },
    not: function(selector){
      var nodes=[]
      if (isFunction(selector) && selector.call !== undefined)
        this.each(function(idx){
          if (!selector.call(this,idx)) nodes.push(this)
        })
      else {
        var excludes = typeof selector == 'string' ? this.filter(selector) :
          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
        this.forEach(function(el){
          if (excludes.indexOf(el) < 0) nodes.push(el)
        })
      }
      return $(nodes)
    },
    has: function(selector){
      return this.filter(function(){
        return isObject(selector) ?
          $.contains(this, selector) :
          $(this).find(selector).size()
      })
    },
    eq: function(idx){
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
    },
    first: function(){
      var el = this[0]
      return el && !isObject(el) ? el : $(el)
    },
    last: function(){
      var el = this[this.length - 1]
      return el && !isObject(el) ? el : $(el)
    },
    find: function(selector){
      var result, $this = this
      if (!selector) result = $()
      else if (typeof selector == 'object')
        result = $(selector).filter(function(){
          var node = this
          return emptyArray.some.call($this, function(parent){
            return $.contains(parent, node)
          })
        })
      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
      else result = this.map(function(){ return zepto.qsa(this, selector) })
      return result
    },
    closest: function(selector, context){
      var nodes = [], collection = typeof selector == 'object' && $(selector)
      this.each(function(_, node){
        while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
          node = node !== context && !isDocument(node) && node.parentNode
        if (node && nodes.indexOf(node) < 0) nodes.push(node)
      })
      return $(nodes)
    },
    parents: function(selector){
      var ancestors = [], nodes = this
      while (nodes.length > 0)
        nodes = $.map(nodes, function(node){
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node)
            return node
          }
        })
      return filtered(ancestors, selector)
    },
    parent: function(selector){
      return filtered(uniq(this.pluck('parentNode')), selector)
    },
    children: function(selector){
      return filtered(this.map(function(){ return children(this) }), selector)
    },
    contents: function() {
      return this.map(function() { return this.contentDocument || slice.call(this.childNodes) })
    },
    siblings: function(selector){
      return filtered(this.map(function(i, el){
        return filter.call(children(el.parentNode), function(child){ return child!==el })
      }), selector)
    },
    empty: function(){
      return this.each(function(){ this.innerHTML = '' })
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function(property){
      return $.map(this, function(el){ return el[property] })
    },
    show: function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display = '')
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          this.style.display = defaultDisplay(this.nodeName)
      })
    },
    replaceWith: function(newContent){
      return this.before(newContent).remove()
    },
    wrap: function(structure){
      var func = isFunction(structure)
      if (this[0] && !func)
        var dom   = $(structure).get(0),
            clone = dom.parentNode || this.length > 1

      return this.each(function(index){
        $(this).wrapAll(
          func ? structure.call(this, index) :
            clone ? dom.cloneNode(true) : dom
        )
      })
    },
    wrapAll: function(structure){
      if (this[0]) {
        $(this[0]).before(structure = $(structure))
        var children
        // drill down to the inmost element
        while ((children = structure.children()).length) structure = children.first()
        $(structure).append(this)
      }
      return this
    },
    wrapInner: function(structure){
      var func = isFunction(structure)
      return this.each(function(index){
        var self = $(this), contents = self.contents(),
            dom  = func ? structure.call(this, index) : structure
        contents.length ? contents.wrapAll(dom) : self.append(dom)
      })
    },
    unwrap: function(){
      this.parent().each(function(){
        $(this).replaceWith($(this).children())
      })
      return this
    },
    clone: function(){
      return this.map(function(){ return this.cloneNode(true) })
    },
    hide: function(){
      return this.css("display", "none")
    },
    toggle: function(setting){
      return this.each(function(){
        var el = $(this)
        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
      })
    },
    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
    html: function(html){
      return 0 in arguments ?
        this.each(function(idx){
          var originHtml = this.innerHTML
          $(this).empty().append( funcArg(this, html, idx, originHtml) )
        }) :
        (0 in this ? this[0].innerHTML : null)
    },
    text: function(text){
      return 0 in arguments ?
        this.each(function(idx){
          var newText = funcArg(this, text, idx, this.textContent)
          this.textContent = newText == null ? '' : ''+newText
        }) :
        (0 in this ? this.pluck('textContent').join("") : null)
    },
    attr: function(name, value){
      var result
      return (typeof name == 'string' && !(1 in arguments)) ?
        (0 in this && this[0].nodeType == 1 && (result = this[0].getAttribute(name)) != null ? result : undefined) :
        this.each(function(idx){
          if (this.nodeType !== 1) return
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
        })
    },
    removeAttr: function(name){
      return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){
        setAttribute(this, attribute)
      }, this)})
    },
    prop: function(name, value){
      name = propMap[name] || name
      return (1 in arguments) ?
        this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        }) :
        (this[0] && this[0][name])
    },
    removeProp: function(name){
      name = propMap[name] || name
      return this.each(function(){ delete this[name] })
    },
    data: function(name, value){
      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

      var data = (1 in arguments) ?
        this.attr(attrName, value) :
        this.attr(attrName)

      return data !== null ? deserializeValue(data) : undefined
    },
    val: function(value){
      if (0 in arguments) {
        if (value == null) value = ""
        return this.each(function(idx){
          this.value = funcArg(this, value, idx, this.value)
        })
      } else {
        return this[0] && (this[0].multiple ?
           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
           this[0].value)
      }
    },
    offset: function(coordinates){
      if (coordinates) return this.each(function(index){
        var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
              top:  coords.top  - parentOffset.top,
              left: coords.left - parentOffset.left
            }

        if ($this.css('position') == 'static') props['position'] = 'relative'
        $this.css(props)
      })
      if (!this.length) return null
      if (document.documentElement !== this[0] && !$.contains(document.documentElement, this[0]))
        return {top: 0, left: 0}
      var obj = this[0].getBoundingClientRect()
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      }
    },
    css: function(property, value){
      if (arguments.length < 2) {
        var element = this[0]
        if (typeof property == 'string') {
          if (!element) return
          return element.style[camelize(property)] || getComputedStyle(element, '').getPropertyValue(property)
        } else if (isArray(property)) {
          if (!element) return
          var props = {}
          var computedStyle = getComputedStyle(element, '')
          $.each(property, function(_, prop){
            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
          })
          return props
        }
      }

      var css = ''
      if (type(property) == 'string') {
        if (!value && value !== 0)
          this.each(function(){ this.style.removeProperty(dasherize(property)) })
        else
          css = dasherize(property) + ":" + maybeAddPx(property, value)
      } else {
        for (key in property)
          if (!property[key] && property[key] !== 0)
            this.each(function(){ this.style.removeProperty(dasherize(key)) })
          else
            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
      }

      return this.each(function(){ this.style.cssText += ';' + css })
    },
    index: function(element){
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
    },
    hasClass: function(name){
      if (!name) return false
      return emptyArray.some.call(this, function(el){
        return this.test(className(el))
      }, classRE(name))
    },
    addClass: function(name){
      if (!name) return this
      return this.each(function(idx){
        if (!('className' in this)) return
        classList = []
        var cls = className(this), newName = funcArg(this, name, idx, cls)
        newName.split(/\s+/g).forEach(function(klass){
          if (!$(this).hasClass(klass)) classList.push(klass)
        }, this)
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
      })
    },
    removeClass: function(name){
      return this.each(function(idx){
        if (!('className' in this)) return
        if (name === undefined) return className(this, '')
        classList = className(this)
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
          classList = classList.replace(classRE(klass), " ")
        })
        className(this, classList.trim())
      })
    },
    toggleClass: function(name, when){
      if (!name) return this
      return this.each(function(idx){
        var $this = $(this), names = funcArg(this, name, idx, className(this))
        names.split(/\s+/g).forEach(function(klass){
          (when === undefined ? !$this.hasClass(klass) : when) ?
            $this.addClass(klass) : $this.removeClass(klass)
        })
      })
    },
    scrollTop: function(value){
      if (!this.length) return
      var hasScrollTop = 'scrollTop' in this[0]
      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
      return this.each(hasScrollTop ?
        function(){ this.scrollTop = value } :
        function(){ this.scrollTo(this.scrollX, value) })
    },
    scrollLeft: function(value){
      if (!this.length) return
      var hasScrollLeft = 'scrollLeft' in this[0]
      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
      return this.each(hasScrollLeft ?
        function(){ this.scrollLeft = value } :
        function(){ this.scrollTo(value, this.scrollY) })
    },
    position: function() {
      if (!this.length) return

      var elem = this[0],
        // Get *real* offsetParent
        offsetParent = this.offsetParent(),
        // Get correct offsets
        offset       = this.offset(),
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

      // Add offsetParent borders
      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

      // Subtract the two offsets
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      }
    },
    offsetParent: function() {
      return this.map(function(){
        var parent = this.offsetParent || document.body
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
          parent = parent.offsetParent
        return parent
      })
    }
  }

  // for now
  $.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach(function(dimension){
    var dimensionProperty =
      dimension.replace(/./, function(m){ return m[0].toUpperCase() })

    $.fn[dimension] = function(value){
      var offset, el = this[0]
      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
        (offset = this.offset()) && offset[dimension]
      else return this.each(function(idx){
        el = $(this)
        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
      })
    }
  })

  function traverseNode(node, fun) {
    fun(node)
    for (var i = 0, len = node.childNodes.length; i < len; i++)
      traverseNode(node.childNodes[i], fun)
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2 //=> prepend, append

    $.fn[operator] = function(){
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var argType, nodes = $.map(arguments, function(arg) {
            var arr = []
            argType = type(arg)
            if (argType == "array") {
              arg.forEach(function(el) {
                if (el.nodeType !== undefined) return arr.push(el)
                else if ($.zepto.isZ(el)) return arr = arr.concat(el.get())
                arr = arr.concat(zepto.fragment(el))
              })
              return arr
            }
            return argType == "object" || arg == null ?
              arg : zepto.fragment(arg)
          }),
          parent, copyByClone = this.length > 1
      if (nodes.length < 1) return this

      return this.each(function(_, target){
        parent = inside ? target : target.parentNode

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling :
                 operatorIndex == 1 ? target.firstChild :
                 operatorIndex == 2 ? target :
                 null

        var parentInDocument = $.contains(document.documentElement, parent)

        nodes.forEach(function(node){
          if (copyByClone) node = node.cloneNode(true)
          else if (!parent) return $(node).remove()

          parent.insertBefore(node, target)
          if (parentInDocument) traverseNode(node, function(el){
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
               (!el.type || el.type === 'text/javascript') && !el.src){
              var target = el.ownerDocument ? el.ownerDocument.defaultView : window
              target['eval'].call(target, el.innerHTML)
            }
          })
        })
      })
    }

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
      $(html)[operator](this)
      return this
    }
  })

  zepto.Z.prototype = Z.prototype = $.fn

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq
  zepto.deserializeValue = deserializeValue
  $.zepto = zepto

  return $
})()

window.Zepto = Zepto
window.$ === undefined && (window.$ = Zepto)

;(function($){
  var jsonpID = +new Date(),
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/,
      originAnchor = document.createElement('a')

  originAnchor.href = window.location.href

  // trigger a custom event and return false if it was cancelled
  function triggerAndReturn(context, eventName, data) {
    var event = $.Event(eventName)
    $(context).trigger(event, data)
    return !event.isDefaultPrevented()
  }

  // trigger an Ajax "global" event
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) return triggerAndReturn(context || document, eventName, data)
  }

  // Number of active Ajax requests
  $.active = 0

  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
  }
  function ajaxStop(settings) {
    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
  }

  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
  function ajaxBeforeSend(xhr, settings) {
    var context = settings.context
    if (settings.beforeSend.call(context, xhr, settings) === false ||
        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
      return false

    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
  }
  function ajaxSuccess(data, xhr, settings, deferred) {
    var context = settings.context, status = 'success'
    settings.success.call(context, data, status, xhr)
    if (deferred) deferred.resolveWith(context, [data, status, xhr])
    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
    ajaxComplete(status, xhr, settings)
  }
  // type: "timeout", "error", "abort", "parsererror"
  function ajaxError(error, type, xhr, settings, deferred) {
    var context = settings.context
    settings.error.call(context, xhr, type, error)
    if (deferred) deferred.rejectWith(context, [xhr, type, error])
    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
    ajaxComplete(type, xhr, settings)
  }
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  function ajaxComplete(status, xhr, settings) {
    var context = settings.context
    settings.complete.call(context, xhr, status)
    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
    ajaxStop(settings)
  }

  function ajaxDataFilter(data, type, settings) {
    if (settings.dataFilter == empty) return data
    var context = settings.context
    return settings.dataFilter.call(context, data, type)
  }

  // Empty function, used as default callback
  function empty() {}

  $.ajaxJSONP = function(options, deferred){
    if (!('type' in options)) return $.ajax(options)

    var _callbackName = options.jsonpCallback,
      callbackName = ($.isFunction(_callbackName) ?
        _callbackName() : _callbackName) || ('Zepto' + (jsonpID++)),
      script = document.createElement('script'),
      originalCallback = window[callbackName],
      responseData,
      abort = function(errorType) {
        $(script).triggerHandler('error', errorType || 'abort')
      },
      xhr = { abort: abort }, abortTimeout

    if (deferred) deferred.promise(xhr)

    $(script).on('load error', function(e, errorType){
      clearTimeout(abortTimeout)
      $(script).off().remove()

      if (e.type == 'error' || !responseData) {
        ajaxError(null, errorType || 'error', xhr, options, deferred)
      } else {
        ajaxSuccess(responseData[0], xhr, options, deferred)
      }

      window[callbackName] = originalCallback
      if (responseData && $.isFunction(originalCallback))
        originalCallback(responseData[0])

      originalCallback = responseData = undefined
    })

    if (ajaxBeforeSend(xhr, options) === false) {
      abort('abort')
      return xhr
    }

    window[callbackName] = function(){
      responseData = arguments
    }

    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
    document.head.appendChild(script)

    if (options.timeout > 0) abortTimeout = setTimeout(function(){
      abort('timeout')
    }, options.timeout)

    return xhr
  }

  $.ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    // Transport
    xhr: function () {
      return new window.XMLHttpRequest()
    },
    // MIME types mapping
    // IIS returns Javascript as "application/x-javascript"
    accepts: {
      script: 'text/javascript, application/javascript, application/x-javascript',
      json:   jsonType,
      xml:    'application/xml, text/xml',
      html:   htmlType,
      text:   'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0,
    // Whether data should be serialized to string
    processData: true,
    // Whether the browser should be allowed to cache GET responses
    cache: true,
    //Used to handle the raw response data of XMLHttpRequest.
    //This is a pre-filtering function to sanitize the response.
    //The sanitized response should be returned
    dataFilter: empty
  }

  function mimeToDataType(mime) {
    if (mime) mime = mime.split(';', 2)[0]
    return mime && ( mime == htmlType ? 'html' :
      mime == jsonType ? 'json' :
      scriptTypeRE.test(mime) ? 'script' :
      xmlTypeRE.test(mime) && 'xml' ) || 'text'
  }

  function appendQuery(url, query) {
    if (query == '') return url
    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
  }

  // serialize payload and append it to the URL for GET requests
  function serializeData(options) {
    if (options.processData && options.data && $.type(options.data) != "string")
      options.data = $.param(options.data, options.traditional)
    if (options.data && (!options.type || options.type.toUpperCase() == 'GET' || 'jsonp' == options.dataType))
      options.url = appendQuery(options.url, options.data), options.data = undefined
  }

  $.ajax = function(options){
    var settings = $.extend({}, options || {}),
        deferred = $.Deferred && $.Deferred(),
        urlAnchor, hashIndex
    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

    ajaxStart(settings)

    if (!settings.crossDomain) {
      urlAnchor = document.createElement('a')
      urlAnchor.href = settings.url
      // cleans up URL for .href (IE only), see https://github.com/madrobby/zepto/pull/1049
      urlAnchor.href = urlAnchor.href
      settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)
    }

    if (!settings.url) settings.url = window.location.toString()
    if ((hashIndex = settings.url.indexOf('#')) > -1) settings.url = settings.url.slice(0, hashIndex)
    serializeData(settings)

    var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
    if (hasPlaceholder) dataType = 'jsonp'

    if (settings.cache === false || (
         (!options || options.cache !== true) &&
         ('script' == dataType || 'jsonp' == dataType)
        ))
      settings.url = appendQuery(settings.url, '_=' + Date.now())

    if ('jsonp' == dataType) {
      if (!hasPlaceholder)
        settings.url = appendQuery(settings.url,
          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
      return $.ajaxJSONP(settings, deferred)
    }

    var mime = settings.accepts[dataType],
        headers = { },
        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(),
        nativeSetHeader = xhr.setRequestHeader,
        abortTimeout

    if (deferred) deferred.promise(xhr)

    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
    setHeader('Accept', mime || '*/*')
    if (mime = settings.mimeType || mime) {
      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
      xhr.overrideMimeType && xhr.overrideMimeType(mime)
    }
    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
    xhr.setRequestHeader = setHeader

    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = empty
        clearTimeout(abortTimeout)
        var result, error = false
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))

          if (xhr.responseType == 'arraybuffer' || xhr.responseType == 'blob')
            result = xhr.response
          else {
            result = xhr.responseText

            try {
              // http://perfectionkills.com/global-eval-what-are-the-options/
              // sanitize response accordingly if data filter callback provided
              result = ajaxDataFilter(result, dataType, settings)
              if (dataType == 'script')    (1,eval)(result)
              else if (dataType == 'xml')  result = xhr.responseXML
              else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
            } catch (e) { error = e }

            if (error) return ajaxError(error, 'parsererror', xhr, settings, deferred)
          }

          ajaxSuccess(result, xhr, settings, deferred)
        } else {
          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
        }
      }
    }

    if (ajaxBeforeSend(xhr, settings) === false) {
      xhr.abort()
      ajaxError(null, 'abort', xhr, settings, deferred)
      return xhr
    }

    var async = 'async' in settings ? settings.async : true
    xhr.open(settings.type, settings.url, async, settings.username, settings.password)

    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

    for (name in headers) nativeSetHeader.apply(xhr, headers[name])

    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
        xhr.onreadystatechange = empty
        xhr.abort()
        ajaxError(null, 'timeout', xhr, settings, deferred)
      }, settings.timeout)

    // avoid sending empty string (#319)
    xhr.send(settings.data ? settings.data : null)
    return xhr
  }

  // handle optional data/success arguments
  function parseArguments(url, data, success, dataType) {
    if ($.isFunction(data)) dataType = success, success = data, data = undefined
    if (!$.isFunction(success)) dataType = success, success = undefined
    return {
      url: url
    , data: data
    , success: success
    , dataType: dataType
    }
  }

  $.get = function(/* url, data, success, dataType */){
    return $.ajax(parseArguments.apply(null, arguments))
  }

  $.post = function(/* url, data, success, dataType */){
    var options = parseArguments.apply(null, arguments)
    options.type = 'POST'
    return $.ajax(options)
  }

  $.getJSON = function(/* url, data, success */){
    var options = parseArguments.apply(null, arguments)
    options.dataType = 'json'
    return $.ajax(options)
  }

  $.fn.load = function(url, data, success){
    if (!this.length) return this
    var self = this, parts = url.split(/\s/), selector,
        options = parseArguments(url, data, success),
        callback = options.success
    if (parts.length > 1) options.url = parts[0], selector = parts[1]
    options.success = function(response){
      self.html(selector ?
        $('<div>').html(response.replace(rscript, "")).find(selector)
        : response)
      callback && callback.apply(self, arguments)
    }
    $.ajax(options)
    return this
  }

  var escape = encodeURIComponent

  function serialize(params, obj, traditional, scope){
    var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
    $.each(obj, function(key, value) {
      type = $.type(value)
      if (scope) key = traditional ? scope :
        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
      // handle data in serializeArray() format
      if (!scope && array) params.add(value.name, value.value)
      // recurse into nested objects
      else if (type == "array" || (!traditional && type == "object"))
        serialize(params, value, traditional, key)
      else params.add(key, value)
    })
  }

  $.param = function(obj, traditional){
    var params = []
    params.add = function(key, value) {
      if ($.isFunction(value)) value = value()
      if (value == null) value = ""
      this.push(escape(key) + '=' + escape(value))
    }
    serialize(params, obj, traditional)
    return params.join('&').replace(/%20/g, '+')
  }
})(Zepto)

;(function($){
  // Create a collection of callbacks to be fired in a sequence, with configurable behaviour
  // Option flags:
  //   - once: Callbacks fired at most one time.
  //   - memory: Remember the most recent context and arguments
  //   - stopOnFalse: Cease iterating over callback list
  //   - unique: Permit adding at most one instance of the same callback
  $.Callbacks = function(options) {
    options = $.extend({}, options)

    var memory, // Last fire value (for non-forgettable lists)
        fired,  // Flag to know if list was already fired
        firing, // Flag to know if list is currently firing
        firingStart, // First callback to fire (used internally by add and fireWith)
        firingLength, // End of the loop when firing
        firingIndex, // Index of currently firing callback (modified by remove if needed)
        list = [], // Actual callback list
        stack = !options.once && [], // Stack of fire calls for repeatable lists
        fire = function(data) {
          memory = options.memory && data
          fired = true
          firingIndex = firingStart || 0
          firingStart = 0
          firingLength = list.length
          firing = true
          for ( ; list && firingIndex < firingLength ; ++firingIndex ) {
            if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
              memory = false
              break
            }
          }
          firing = false
          if (list) {
            if (stack) stack.length && fire(stack.shift())
            else if (memory) list.length = 0
            else Callbacks.disable()
          }
        },

        Callbacks = {
          add: function() {
            if (list) {
              var start = list.length,
                  add = function(args) {
                    $.each(args, function(_, arg){
                      if (typeof arg === "function") {
                        if (!options.unique || !Callbacks.has(arg)) list.push(arg)
                      }
                      else if (arg && arg.length && typeof arg !== 'string') add(arg)
                    })
                  }
              add(arguments)
              if (firing) firingLength = list.length
              else if (memory) {
                firingStart = start
                fire(memory)
              }
            }
            return this
          },
          remove: function() {
            if (list) {
              $.each(arguments, function(_, arg){
                var index
                while ((index = $.inArray(arg, list, index)) > -1) {
                  list.splice(index, 1)
                  // Handle firing indexes
                  if (firing) {
                    if (index <= firingLength) --firingLength
                    if (index <= firingIndex) --firingIndex
                  }
                }
              })
            }
            return this
          },
          has: function(fn) {
            return !!(list && (fn ? $.inArray(fn, list) > -1 : list.length))
          },
          empty: function() {
            firingLength = list.length = 0
            return this
          },
          disable: function() {
            list = stack = memory = undefined
            return this
          },
          disabled: function() {
            return !list
          },
          lock: function() {
            stack = undefined
            if (!memory) Callbacks.disable()
            return this
          },
          locked: function() {
            return !stack
          },
          fireWith: function(context, args) {
            if (list && (!fired || stack)) {
              args = args || []
              args = [context, args.slice ? args.slice() : args]
              if (firing) stack.push(args)
              else fire(args)
            }
            return this
          },
          fire: function() {
            return Callbacks.fireWith(this, arguments)
          },
          fired: function() {
            return !!fired
          }
        }

    return Callbacks
  }
})(Zepto)

;(function($){
  var slice = Array.prototype.slice

  function Deferred(func) {
    var tuples = [
          // action, add listener, listener list, final state
          [ "resolve", "done", $.Callbacks({once:1, memory:1}), "resolved" ],
          [ "reject", "fail", $.Callbacks({once:1, memory:1}), "rejected" ],
          [ "notify", "progress", $.Callbacks({memory:1}) ]
        ],
        state = "pending",
        promise = {
          state: function() {
            return state
          },
          always: function() {
            deferred.done(arguments).fail(arguments)
            return this
          },
          then: function(/* fnDone [, fnFailed [, fnProgress]] */) {
            var fns = arguments
            return Deferred(function(defer){
              $.each(tuples, function(i, tuple){
                var fn = $.isFunction(fns[i]) && fns[i]
                deferred[tuple[1]](function(){
                  var returned = fn && fn.apply(this, arguments)
                  if (returned && $.isFunction(returned.promise)) {
                    returned.promise()
                      .done(defer.resolve)
                      .fail(defer.reject)
                      .progress(defer.notify)
                  } else {
                    var context = this === promise ? defer.promise() : this,
                        values = fn ? [returned] : arguments
                    defer[tuple[0] + "With"](context, values)
                  }
                })
              })
              fns = null
            }).promise()
          },

          promise: function(obj) {
            return obj != null ? $.extend( obj, promise ) : promise
          }
        },
        deferred = {}

    $.each(tuples, function(i, tuple){
      var list = tuple[2],
          stateString = tuple[3]

      promise[tuple[1]] = list.add

      if (stateString) {
        list.add(function(){
          state = stateString
        }, tuples[i^1][2].disable, tuples[2][2].lock)
      }

      deferred[tuple[0]] = function(){
        deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments)
        return this
      }
      deferred[tuple[0] + "With"] = list.fireWith
    })

    promise.promise(deferred)
    if (func) func.call(deferred, deferred)
    return deferred
  }

  $.when = function(sub) {
    var resolveValues = slice.call(arguments),
        len = resolveValues.length,
        i = 0,
        remain = len !== 1 || (sub && $.isFunction(sub.promise)) ? len : 0,
        deferred = remain === 1 ? sub : Deferred(),
        progressValues, progressContexts, resolveContexts,
        updateFn = function(i, ctx, val){
          return function(value){
            ctx[i] = this
            val[i] = arguments.length > 1 ? slice.call(arguments) : value
            if (val === progressValues) {
              deferred.notifyWith(ctx, val)
            } else if (!(--remain)) {
              deferred.resolveWith(ctx, val)
            }
          }
        }

    if (len > 1) {
      progressValues = new Array(len)
      progressContexts = new Array(len)
      resolveContexts = new Array(len)
      for ( ; i < len; ++i ) {
        if (resolveValues[i] && $.isFunction(resolveValues[i].promise)) {
          resolveValues[i].promise()
            .done(updateFn(i, resolveContexts, resolveValues))
            .fail(deferred.reject)
            .progress(updateFn(i, progressContexts, progressValues))
        } else {
          --remain
        }
      }
    }
    if (!remain) deferred.resolveWith(resolveContexts, resolveValues)
    return deferred.promise()
  }

  $.Deferred = Deferred
})(Zepto)

;(function($){
  var _zid = 1, undefined,
      slice = Array.prototype.slice,
      isFunction = $.isFunction,
      isString = function(obj){ return typeof obj == 'string' },
      handlers = {},
      specialEvents={},
      focusinSupported = 'onfocusin' in window,
      focus = { focus: 'focusin', blur: 'focusout' },
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

  function zid(element) {
    return element._zid || (element._zid = _zid++)
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event)
    if (event.ns) var matcher = matcherFor(event.ns)
    return (handlers[zid(element)] || []).filter(function(handler) {
      return handler
        && (!event.e  || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn       || zid(handler.fn) === zid(fn))
        && (!selector || handler.sel == selector)
    })
  }
  function parse(event) {
    var parts = ('' + event).split('.')
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
  }

  function eventCapture(handler, captureSetting) {
    return handler.del &&
      (!focusinSupported && (handler.e in focus)) ||
      !!captureSetting
  }

  function realEvent(type) {
    return hover[type] || (focusinSupported && focus[type]) || type
  }

  function add(element, events, fn, data, selector, delegator, capture){
    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
    events.split(/\s/).forEach(function(event){
      if (event == 'ready') return $(document).ready(fn)
      var handler   = parse(event)
      handler.fn    = fn
      handler.sel   = selector
      // emulate mouseenter, mouseleave
      if (handler.e in hover) fn = function(e){
        var related = e.relatedTarget
        if (!related || (related !== this && !$.contains(this, related)))
          return handler.fn.apply(this, arguments)
      }
      handler.del   = delegator
      var callback  = delegator || fn
      handler.proxy = function(e){
        e = compatible(e)
        if (e.isImmediatePropagationStopped()) return
        e.data = data
        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
        if (result === false) e.preventDefault(), e.stopPropagation()
        return result
      }
      handler.i = set.length
      set.push(handler)
      if ('addEventListener' in element)
        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
    })
  }
  function remove(element, events, fn, selector, capture){
    var id = zid(element)
    ;(events || '').split(/\s/).forEach(function(event){
      findHandlers(element, event, fn, selector).forEach(function(handler){
        delete handlers[id][handler.i]
      if ('removeEventListener' in element)
        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
    })
  }

  $.event = { add: add, remove: remove }

  $.proxy = function(fn, context) {
    var args = (2 in arguments) && slice.call(arguments, 2)
    if (isFunction(fn)) {
      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
      proxyFn._zid = zid(fn)
      return proxyFn
    } else if (isString(context)) {
      if (args) {
        args.unshift(fn[context], fn)
        return $.proxy.apply(null, args)
      } else {
        return $.proxy(fn[context], fn)
      }
    } else {
      throw new TypeError("expected function")
    }
  }

  $.fn.bind = function(event, data, callback){
    return this.on(event, data, callback)
  }
  $.fn.unbind = function(event, callback){
    return this.off(event, callback)
  }
  $.fn.one = function(event, selector, data, callback){
    return this.on(event, selector, data, callback, 1)
  }

  var returnTrue = function(){return true},
      returnFalse = function(){return false},
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      }

  function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
      source || (source = event)

      $.each(eventMethods, function(name, predicate) {
        var sourceMethod = source[name]
        event[name] = function(){
          this[predicate] = returnTrue
          return sourceMethod && sourceMethod.apply(source, arguments)
        }
        event[predicate] = returnFalse
      })

      event.timeStamp || (event.timeStamp = Date.now())

      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
          'returnValue' in source ? source.returnValue === false :
          source.getPreventDefault && source.getPreventDefault())
        event.isDefaultPrevented = returnTrue
    }
    return event
  }

  function createProxy(event) {
    var key, proxy = { originalEvent: event }
    for (key in event)
      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

    return compatible(proxy, event)
  }

  $.fn.delegate = function(selector, event, callback){
    return this.on(event, selector, callback)
  }
  $.fn.undelegate = function(selector, event, callback){
    return this.off(event, selector, callback)
  }

  $.fn.live = function(event, callback){
    $(document.body).delegate(this.selector, event, callback)
    return this
  }
  $.fn.die = function(event, callback){
    $(document.body).undelegate(this.selector, event, callback)
    return this
  }

  $.fn.on = function(event, selector, data, callback, one){
    var autoRemove, delegator, $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.on(type, selector, data, fn, one)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = data, data = selector, selector = undefined
    if (callback === undefined || data === false)
      callback = data, data = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(_, element){
      if (one) autoRemove = function(e){
        remove(element, e.type, callback)
        return callback.apply(this, arguments)
      }

      if (selector) delegator = function(e){
        var evt, match = $(e.target).closest(selector, element).get(0)
        if (match && match !== element) {
          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
        }
      }

      add(element, event, callback, data, selector, delegator || autoRemove)
    })
  }
  $.fn.off = function(event, selector, callback){
    var $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.off(type, selector, fn)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = selector, selector = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(){
      remove(this, event, callback, selector)
    })
  }

  $.fn.trigger = function(event, args){
    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
    event._args = args
    return this.each(function(){
      // handle focus(), blur() by calling them directly
      if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
      // items in the collection might not be DOM elements
      else if ('dispatchEvent' in this) this.dispatchEvent(event)
      else $(this).triggerHandler(event, args)
    })
  }

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function(event, args){
    var e, result
    this.each(function(i, element){
      e = createProxy(isString(event) ? $.Event(event) : event)
      e._args = args
      e.target = element
      $.each(findHandlers(element, event.type || event), function(i, handler){
        result = handler.proxy(e)
        if (e.isImmediatePropagationStopped()) return false
      })
    })
    return result
  }

  // shortcut methods for `.bind(event, fn)` for each event type
  ;('focusin focusout focus blur load resize scroll unload click dblclick '+
  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
    $.fn[event] = function(callback) {
      return (0 in arguments) ?
        this.bind(event, callback) :
        this.trigger(event)
    }
  })

  $.Event = function(type, props) {
    if (!isString(type)) props = type, type = props.type
    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
    event.initEvent(type, bubbles, true)
    return compatible(event)
  }

})(Zepto)

;(function(){
  // getComputedStyle shouldn't freak out when called
  // without a valid element as argument
  try {
    getComputedStyle(undefined)
  } catch(e) {
    var nativeGetComputedStyle = getComputedStyle
    window.getComputedStyle = function(element, pseudoElement){
      try {
        return nativeGetComputedStyle(element, pseudoElement)
      } catch(e) {
        return null
      }
    }
  }
})()

;(function($){
  var zepto = $.zepto, oldQsa = zepto.qsa, oldMatches = zepto.matches

  function visible(elem){
    elem = $(elem)
    return !!(elem.width() || elem.height()) && elem.css("display") !== "none"
  }

  // Implements a subset from:
  // http://api.jquery.com/category/selectors/jquery-selector-extensions/
  //
  // Each filter function receives the current index, all nodes in the
  // considered set, and a value if there were parentheses. The value
  // of `this` is the node currently being considered. The function returns the
  // resulting node(s), null, or undefined.
  //
  // Complex selectors are not supported:
  //   li:has(label:contains("foo")) + li:has(label:contains("bar"))
  //   ul.inner:first > li
  var filters = $.expr[':'] = {
    visible:  function(){ if (visible(this)) return this },
    hidden:   function(){ if (!visible(this)) return this },
    selected: function(){ if (this.selected) return this },
    checked:  function(){ if (this.checked) return this },
    parent:   function(){ return this.parentNode },
    first:    function(idx){ if (idx === 0) return this },
    last:     function(idx, nodes){ if (idx === nodes.length - 1) return this },
    eq:       function(idx, _, value){ if (idx === value) return this },
    contains: function(idx, _, text){ if ($(this).text().indexOf(text) > -1) return this },
    has:      function(idx, _, sel){ if (zepto.qsa(this, sel).length) return this }
  }

  var filterRe = new RegExp('(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*'),
      childRe  = /^\s*>/,
      classTag = 'Zepto' + (+new Date())

  function process(sel, fn) {
    // quote the hash in `a[href^=#]` expression
    sel = sel.replace(/=#\]/g, '="#"]')
    var filter, arg, match = filterRe.exec(sel)
    if (match && match[2] in filters) {
      filter = filters[match[2]], arg = match[3]
      sel = match[1]
      if (arg) {
        var num = Number(arg)
        if (isNaN(num)) arg = arg.replace(/^["']|["']$/g, '')
        else arg = num
      }
    }
    return fn(sel, filter, arg)
  }

  zepto.qsa = function(node, selector) {
    return process(selector, function(sel, filter, arg){
      try {
        var taggedParent
        if (!sel && filter) sel = '*'
        else if (childRe.test(sel))
          // support "> *" child queries by tagging the parent node with a
          // unique class and prepending that classname onto the selector
          taggedParent = $(node).addClass(classTag), sel = '.'+classTag+' '+sel

        var nodes = oldQsa(node, sel)
      } catch(e) {
        console.error('error performing selector: %o', selector)
        throw e
      } finally {
        if (taggedParent) taggedParent.removeClass(classTag)
      }
      return !filter ? nodes :
        zepto.uniq($.map(nodes, function(n, i){ return filter.call(n, i, nodes, arg) }))
    })
  }

  zepto.matches = function(node, selector){
    return process(selector, function(sel, filter, arg){
      return (!sel || oldMatches(node, sel)) &&
        (!filter || filter.call(node, null, arg) === node)
    })
  }
})(Zepto)
module.exports = Zepto


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(136);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-var */
// Simple JavaScript Templating
// Paul Miller (http://paulmillr.com)
// http://underscorejs.org
// (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors

// By default, Underscore uses ERB-style template delimiters, change the
// following template settings to use alternative delimiters.
var settings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};

// When customizing `templateSettings`, if you don't want to define an
// interpolation, evaluation or escaping regex, we need one that is
// guaranteed not to match.
var noMatch = /(.)^/;

// Certain characters need to be escaped so that they can be put into a
// string literal.
var escapes = {
  '\'': '\'',
  '\\': '\\',
  '\r': 'r',
  '\n': 'n',
  '\t': 't',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};

var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

// List of HTML entities for escaping.
var htmlEntities = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#x27;'
};

var entityRe = new RegExp('[&<>"\']', 'g');

var escapeExpr = function escapeExpr(string) {
  if (string === null) return '';
  return ('' + string).replace(entityRe, function (match) {
    return htmlEntities[match];
  });
};

var counter = 0;

// JavaScript micro-templating, similar to John Resig's implementation.
// Underscore templating handles arbitrary delimiters, preserves whitespace,
// and correctly escapes quotes within interpolated code.
var tmpl = function tmpl(text, data) {
  var render;

  // Combine delimiters into one regular expression via alternation.
  var matcher = new RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g');

  // Compile the template source, escaping string literals appropriately.
  var index = 0;
  var source = '__p+=\'';
  text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
    source += text.slice(index, offset).replace(escaper, function (match) {
      return '\\' + escapes[match];
    });

    if (escape) source += '\'+\n((__t=(' + escape + '))==null?\'\':escapeExpr(__t))+\n\'';

    if (interpolate) source += '\'+\n((__t=(' + interpolate + '))==null?\'\':__t)+\n\'';

    if (evaluate) source += '\';\n' + evaluate + '\n__p+=\'';

    index = offset + match.length;
    return match;
  });
  source += '\';\n';

  // If a variable is not specified, place data values in local scope.
  if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

  source = 'var __t,__p=\'\',__j=Array.prototype.join,' + 'print=function(){__p+=__j.call(arguments,\'\');};\n' + source + 'return __p;\n//# sourceURL=/microtemplates/source[' + counter++ + ']';

  try {
    /*jshint -W054 */
    // TODO: find a way to avoid eval
    render = new Function(settings.variable || 'obj', 'escapeExpr', source);
  } catch (e) {
    e.source = source;
    throw e;
  }

  if (data) return render(data, escapeExpr);
  var template = function template(data) {
    return render.call(this, data, escapeExpr);
  };

  // Provide the compiled function source as a convenience for precompilation.
  template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

  return template;
};
tmpl.settings = settings;

exports.default = tmpl;
module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(43)('wks')
  , uid        = __webpack_require__(32)
  , Symbol     = __webpack_require__(14).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = __webpack_require__(5);

var _ui_object = __webpack_require__(20);

var _ui_object2 = _interopRequireDefault(_ui_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An abstraction to represent a generic playback, it's like an interface to be implemented by subclasses.
 * @class Playback
 * @constructor
 * @extends UIObject
 * @module base
 */
var Playback = function (_UIObject) {
  (0, _inherits3.default)(Playback, _UIObject);
  (0, _createClass3.default)(Playback, [{
    key: 'isAudioOnly',

    /**
    * Determine if the playback does not contain video/has video but video should be ignored.
    * @property isAudioOnly
    * @type Boolean
    */
    get: function get() {
      return false;
    }

    /**
     * Determine if the playback has ended.
     * @property ended
     * @type Boolean
     */

  }, {
    key: 'ended',
    get: function get() {
      return false;
    }

    /**
     * The internationalization plugin.
     * @property i18n
     * @type {Strings}
     */

  }, {
    key: 'i18n',
    get: function get() {
      return this._i18n;
    }

    /**
     * Determine if the playback is having to buffer in order for
     * playback to be smooth.
     * (i.e if a live stream is playing smoothly, this will be false)
     * @property buffering
     * @type Boolean
     */

  }, {
    key: 'buffering',
    get: function get() {
      return false;
    }

    /**
     * @method constructor
     * @param {Object} options the options object
     * @param {Strings} i18n the internationalization component
     */

  }]);

  function Playback(options, i18n) {
    (0, _classCallCheck3.default)(this, Playback);

    var _this = (0, _possibleConstructorReturn3.default)(this, _UIObject.call(this, options));

    _this.settings = {};
    _this._i18n = i18n;
    return _this;
  }

  /**
   * Gives user consent to playback (mobile devices).
   * @method consent
   */


  Playback.prototype.consent = function consent() {};

  /**
   * plays the playback.
   * @method play
   */


  Playback.prototype.play = function play() {};

  /**
   * pauses the playback.
   * @method pause
   */


  Playback.prototype.pause = function pause() {};

  /**
   * stops the playback.
   * @method stop
   */


  Playback.prototype.stop = function stop() {};

  /**
   * seeks the playback to a given `time` in seconds
   * @method seek
   * @param {Number} time should be a number between 0 and the video duration
   */


  Playback.prototype.seek = function seek(time) {}; // eslint-disable-line no-unused-vars

  /**
   * seeks the playback to a given `percentage` in percentage
   * @method seekPercentage
   * @param {Number} time should be a number between 0 and 100
   */


  Playback.prototype.seekPercentage = function seekPercentage(percentage) {}; // eslint-disable-line no-unused-vars


  /**
   * The time that "0" now represents relative to when playback started.
   * For a stream with a sliding window this will increase as content is
   * removed from the beginning.
   * @method getStartTimeOffset
   * @return {Number} time (in seconds) that time "0" represents.
   */


  Playback.prototype.getStartTimeOffset = function getStartTimeOffset() {
    return 0;
  };

  /**
   * gets the duration in seconds
   * @method getDuration
   * @return {Number} duration (in seconds) of the current source
   */


  Playback.prototype.getDuration = function getDuration() {
    return 0;
  };

  /**
   * checks if the playback is playing.
   * @method isPlaying
   * @return {Boolean} `true` if the current playback is playing, otherwise `false`
   */


  Playback.prototype.isPlaying = function isPlaying() {
    return false;
  };

  /**
   * checks if the playback is ready.
   * @property isReady
   * @type {Boolean} `true` if the current playback is ready, otherwise `false`
   */


  // eslint-disable-line no-unused-vars

  /**
   * gets the playback type (`'vod', 'live', 'aod'`)
   * @method getPlaybackType
   * @return {String} you should write the playback type otherwise it'll assume `'no_op'`
   * @example
   * ```javascript
   * html5VideoPlayback.getPlaybackType() //vod
   * html5AudioPlayback.getPlaybackType() //aod
   * html5VideoPlayback.getPlaybackType() //live
   * flashHlsPlayback.getPlaybackType() //live
   * ```
   */
  Playback.prototype.getPlaybackType = function getPlaybackType() {
    return Playback.NO_OP;
  };

  /**
   * checks if the playback is in HD.
   * @method isHighDefinitionInUse
   * @return {Boolean} `true` if the playback is playing in HD, otherwise `false`
   */


  Playback.prototype.isHighDefinitionInUse = function isHighDefinitionInUse() {
    return false;
  };

  /**
   * sets the volume for the playback
   * @method volume
   * @param {Number} value a number between 0 (`muted`) to 100 (`max`)
   */


  Playback.prototype.volume = function volume(value) {}; // eslint-disable-line no-unused-vars

  /**
   * destroys the playback, removing it from DOM
   * @method destroy
   */


  Playback.prototype.destroy = function destroy() {
    this.$el.remove();
  };

  (0, _createClass3.default)(Playback, [{
    key: 'isReady',
    get: function get() {
      return false;
    }

    /**
     * checks if the playback has closed caption tracks.
     * @property hasClosedCaptionsTracks
     * @type {Boolean}
     */

  }, {
    key: 'hasClosedCaptionsTracks',
    get: function get() {
      return this.closedCaptionsTracks.length > 0;
    }

    /**
     * gets the playback available closed caption tracks.
     * @property closedCaptionsTracks
     * @type {Array} an array of objects with at least 'id' and 'name' properties
     */

  }, {
    key: 'closedCaptionsTracks',
    get: function get() {
      return [];
    }

    /**
     * gets the selected closed caption track index. (-1 is disabled)
     * @property closedCaptionsTrackId
     * @type {Number}
     */

  }, {
    key: 'closedCaptionsTrackId',
    get: function get() {
      return -1;
    }

    /**
     * sets the selected closed caption track index. (-1 is disabled)
     * @property closedCaptionsTrackId
     * @type {Number}
     */
    ,
    set: function set(trackId) {}
  }]);
  return Playback;
}(_ui_object2.default);

exports.default = Playback;


Playback.extend = function (properties) {
  return (0, _utils.extend)(Playback, properties);
};

/**
 * checks if the playback can play a given `source`
 * If a mimeType is provided then this will be used instead of inferring the mimetype
 * from the source extension.
 * @method canPlay
 * @static
 * @param {String} source the given source ex: `http://example.com/play.mp4`
 * @param {String} [mimeType] the given mime type, ex: `'application/vnd.apple.mpegurl'`
 * @return {Boolean} `true` if the playback is playable, otherwise `false`
 */
Playback.canPlay = function (source, mimeType) {
  // eslint-disable-line no-unused-vars
  return false;
};

/**
 * a playback type for video on demand
 *
 * @property VOD
 * @static
 * @type String
 */
Playback.VOD = 'vod';
/**
 * a playback type for audio on demand
 *
 * @property AOD
 * @static
 * @type String
 */
Playback.AOD = 'aod';
/**
 * a playback type for live video
 *
 * @property LIVE
 * @static
 * @type String
 */
Playback.LIVE = 'live';
/**
 * a default playback type
 *
 * @property NO_OP
 * @static
 * @type String
 */
Playback.NO_OP = 'no_op';
/**
 * the plugin type
 *
 * @property type
 * @static
 * @type String
 */
Playback.type = 'playback';
module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(88)
  , defined = __webpack_require__(39);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(23)
  , IE8_DOM_DEFINE = __webpack_require__(62)
  , toPrimitive    = __webpack_require__(46)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(19) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = __webpack_require__(5);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class BaseObject
 * @constructor
 * @extends Events
 * @module base
 */
// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var BaseObject = function (_Events) {
  (0, _inherits3.default)(BaseObject, _Events);
  (0, _createClass3.default)(BaseObject, [{
    key: 'options',

    /**
     * returns the object options
     * @property options
     * @type Object
     */
    get: function get() {
      return this._options;
    }

    /**
     * @method constructor
     * @param {Object} options
     */

  }]);

  function BaseObject() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, BaseObject);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Events.call(this, options));

    _this._options = options;
    _this.uniqueId = (0, _utils.uniqueId)('o');
    return _this;
  }
  /**
  * a unique id prefixed with `'o'`, `o1, o232`
  *
  * @property uniqueId
  * @type String
  */


  return BaseObject;
}(_events2.default);

exports.default = BaseObject;
module.exports = exports['default'];

/***/ }),
/* 17 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(14)
  , core      = __webpack_require__(8)
  , ctx       = __webpack_require__(45)
  , hide      = __webpack_require__(22)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(27)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _clapprZepto = __webpack_require__(6);

var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

var _utils = __webpack_require__(5);

var _base_object = __webpack_require__(16);

var _base_object2 = _interopRequireDefault(_base_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var delegateEventSplitter = /^(\S+)\s*(.*)$/;

/**
 * A base class to create ui object.
 * @class UIObject
 * @constructor
 * @extends BaseObject
 * @module base
 */
// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var UIObject = function (_BaseObject) {
  (0, _inherits3.default)(UIObject, _BaseObject);
  (0, _createClass3.default)(UIObject, [{
    key: 'tagName',

    /**
     * a unique id prefixed with `'c'`, `c1, c232`
     *
     * @property cid
     * @type String
     */
    /**
     * the dom element itself
     *
     * @property el
     * @type HTMLElement
     */
    /**
     * the dom element wrapped by `$`
     *
     * @property $el
     * @type HTMLElement
     */

    /**
     * gets the tag name for the ui component
     * @method tagName
     * @default div
     * @return {String} tag's name
     */
    get: function get() {
      return 'div';
    }
    /**
     * a literal object mapping element's events to methods
     * @property events
     * @type Object
     * @example
     *
     *```javascript
     *
     * class MyButton extends UIObject {
     *   constructor(options) {
     *     super(options)
     *     this.myId = 0
     *   }
     *   get events() { return { 'click': 'myClick' } }
     *   myClick(){ this.myId = 42 }
     * }
     *
     * // when you click on MyButton the method `myClick` will be called
     *```
     */

  }, {
    key: 'events',
    get: function get() {
      return {};
    }
    /**
     * a literal object mapping attributes and values to the element
     * element's attribute name and the value the attribute value
     * @property attributes
     * @type Object
     * @example
     *
     *```javascript
     *
     * class MyButton extends UIObject {
     *    constructor(options) { super(options) }
     *    get attributes() { return { class: 'my-button'} }
     * }
     *
     * // MyButton.el.className will be 'my-button'
     * ```
     */

  }, {
    key: 'attributes',
    get: function get() {
      return {};
    }

    /**
     * it builds an ui component by:
     *  * creating an id for the component `cid`
     *  * making sure the element is created `$el`
     *  * delegating all `events` to the element
     * @method constructor
     * @param {Object} options the options object
     */

  }]);

  function UIObject(options) {
    (0, _classCallCheck3.default)(this, UIObject);

    var _this = (0, _possibleConstructorReturn3.default)(this, _BaseObject.call(this, options));

    _this.cid = (0, _utils.uniqueId)('c');
    _this._ensureElement();
    _this.delegateEvents();
    return _this;
  }

  /**
   * selects within the component.
   * @method $
   * @param {String} selector a selector to find within the component.
   * @return {HTMLElement} an element, if it exists.
   * @example
   * ```javascript
   * fullScreenBarUIComponent.$('.button-full') //will return only `.button-full` within the component
   * ```
   */


  UIObject.prototype.$ = function $(selector) {
    return this.$el.find(selector);
  };

  /**
   * render the component, usually attach it to a real existent `element`
   * @method render
   * @return {UIObject} itself
   */


  UIObject.prototype.render = function render() {
    return this;
  };

  /**
   * removes the ui component from DOM
   * @method remove
   * @return {UIObject} itself
   */


  UIObject.prototype.remove = function remove() {
    this.$el.remove();
    this.stopListening();
    this.undelegateEvents();
    return this;
  };

  /**
   * set element to `el` and `$el`
   * @method setElement
   * @param {HTMLElement} element
   * @param {Boolean} delegate whether is delegate or not
   * @return {UIObject} itself
   */


  UIObject.prototype.setElement = function setElement(element, delegate) {
    if (this.$el) this.undelegateEvents();
    this.$el = _clapprZepto2.default.zepto.isZ(element) ? element : (0, _clapprZepto2.default)(element);
    this.el = this.$el[0];
    if (delegate !== false) this.delegateEvents();
    return this;
  };

  /**
   * delegates all the original `events` on `element` to its callbacks
   * @method delegateEvents
   * @param {Object} events
   * @return {UIObject} itself
   */


  UIObject.prototype.delegateEvents = function delegateEvents(events) {
    if (!(events || (events = this.events))) return this;
    this.undelegateEvents();
    for (var key in events) {
      var method = events[key];
      if (method && method.constructor !== Function) method = this[events[key]];
      if (!method) continue;

      var match = key.match(delegateEventSplitter);
      var eventName = match[1],
          selector = match[2];
      eventName += '.delegateEvents' + this.cid;
      if (selector === '') this.$el.on(eventName, method.bind(this));else this.$el.on(eventName, selector, method.bind(this));
    }
    return this;
  };

  /**
   * undelegats all the `events`
   * @method undelegateEvents
   * @return {UIObject} itself
   */


  UIObject.prototype.undelegateEvents = function undelegateEvents() {
    this.$el.off('.delegateEvents' + this.cid);
    return this;
  };

  /**
   * ensures the creation of this ui component
   * @method _ensureElement
   * @private
   */


  UIObject.prototype._ensureElement = function _ensureElement() {
    if (!this.el) {
      var attrs = _clapprZepto2.default.extend({}, this.attributes);
      if (this.id) attrs.id = this.id;
      if (this.className) attrs['class'] = this.className;
      var $el = _utils.DomRecycler.create(this.tagName).attr(attrs);
      this.setElement($el, false);
    } else {
      this.setElement(this.el, false);
    }
  };

  return UIObject;
}(_base_object2.default);

exports.default = UIObject;
module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = void 0;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(15)
  , createDesc = __webpack_require__(28);
module.exports = __webpack_require__(19) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(26);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var Browser = {};

var hasLocalstorage = function hasLocalstorage() {
  try {
    localStorage.setItem('clappr', 'clappr');
    localStorage.removeItem('clappr');
    return true;
  } catch (e) {
    return false;
  }
};

var hasFlash = function hasFlash() {
  try {
    var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
    return !!fo;
  } catch (e) {
    return !!(navigator.mimeTypes && navigator.mimeTypes['application/x-shockwave-flash'] !== undefined && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin);
  }
};

var getBrowserInfo = exports.getBrowserInfo = function getBrowserInfo(ua) {
  var parts = ua.match(/\b(playstation 4|nx|opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [],
      extra = void 0;
  if (/trident/i.test(parts[1])) {
    extra = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: 'IE', version: parseInt(extra[1] || '') };
  } else if (parts[1] === 'Chrome') {
    extra = ua.match(/\bOPR\/(\d+)/);
    if (extra != null) return { name: 'Opera', version: parseInt(extra[1]) };

    extra = ua.match(/\bEdge\/(\d+)/);
    if (extra != null) return { name: 'Edge', version: parseInt(extra[1]) };
  } else if (/android/i.test(ua) && (extra = ua.match(/version\/(\d+)/i))) {
    parts.splice(1, 1, 'Android WebView');
    parts.splice(2, 1, extra[1]);
  }
  parts = parts[2] ? [parts[1], parts[2]] : [navigator.appName, navigator.appVersion, '-?'];

  return { name: parts[0], version: parseInt(parts[1]) };
};

var browserInfo = getBrowserInfo(navigator.userAgent);

Browser.isEdge = /edge/i.test(navigator.userAgent);
Browser.isChrome = /chrome|CriOS/i.test(navigator.userAgent) && !Browser.isEdge;
Browser.isSafari = /safari/i.test(navigator.userAgent) && !Browser.isChrome && !Browser.isEdge;
Browser.isFirefox = /firefox/i.test(navigator.userAgent);
Browser.isLegacyIE = !!window.ActiveXObject;
Browser.isIE = Browser.isLegacyIE || /trident.*rv:1\d/i.test(navigator.userAgent);
Browser.isIE11 = /trident.*rv:11/i.test(navigator.userAgent);
Browser.isChromecast = Browser.isChrome && /CrKey/i.test(navigator.userAgent);
Browser.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Mobile Safari|Opera Mini/i.test(navigator.userAgent);
Browser.isiOS = /iPad|iPhone|iPod/i.test(navigator.userAgent);
Browser.isAndroid = /Android/i.test(navigator.userAgent);
Browser.isWindowsPhone = /Windows Phone/i.test(navigator.userAgent);
Browser.isWin8App = /MSAppHost/i.test(navigator.userAgent);
Browser.isWiiU = /WiiU/i.test(navigator.userAgent);
Browser.isPS4 = /PlayStation 4/i.test(navigator.userAgent);
Browser.hasLocalstorage = hasLocalstorage();
Browser.hasFlash = hasFlash();

Browser.name = browserInfo.name;
Browser.version = browserInfo.version;

exports.default = Browser;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(59)
  , enumBugKeys = __webpack_require__(44);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = __webpack_require__(5);

var _base_object = __webpack_require__(16);

var _base_object2 = _interopRequireDefault(_base_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CorePlugin = function (_BaseObject) {
  (0, _inherits3.default)(CorePlugin, _BaseObject);

  function CorePlugin(core) {
    (0, _classCallCheck3.default)(this, CorePlugin);

    var _this = (0, _possibleConstructorReturn3.default)(this, _BaseObject.call(this, core.options));

    _this.core = core;
    _this.enabled = true;
    _this.bindEvents();
    return _this;
  }

  CorePlugin.prototype.bindEvents = function bindEvents() {};

  CorePlugin.prototype.enable = function enable() {
    if (!this.enabled) {
      this.bindEvents();
      this.enabled = true;
    }
  };

  CorePlugin.prototype.disable = function disable() {
    if (this.enabled) {
      this.stopListening();
      this.enabled = false;
    }
  };

  CorePlugin.prototype.getExternalInterface = function getExternalInterface() {
    return {};
  };

  CorePlugin.prototype.destroy = function destroy() {
    this.stopListening();
  };

  return CorePlugin;
}(_base_object2.default);

exports.default = CorePlugin;


CorePlugin.extend = function (properties) {
  return (0, _utils.extend)(CorePlugin, properties);
};

CorePlugin.type = 'core';
module.exports = exports['default'];

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ }),
/* 32 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(92);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(103);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var PlayerInfo = function PlayerInfo() {
  (0, _classCallCheck3.default)(this, PlayerInfo);

  this.options = {};
  this.playbackPlugins = [];
  this.currentSize = { width: 0, height: 0 };
};

PlayerInfo._players = {};

PlayerInfo.getInstance = function (playerId) {
  return PlayerInfo._players[playerId] || (PlayerInfo._players[playerId] = new PlayerInfo());
};

exports.default = PlayerInfo;
module.exports = exports["default"];

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = __webpack_require__(5);

var _ui_object = __webpack_require__(20);

var _ui_object2 = _interopRequireDefault(_ui_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The base class for an ui container plugin
 * @class UIContainerPlugin
 * @constructor
 * @extends UIObject
 * @module base
 */
// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var UIContainerPlugin = function (_UIObject) {
  (0, _inherits3.default)(UIContainerPlugin, _UIObject);

  function UIContainerPlugin(container) {
    (0, _classCallCheck3.default)(this, UIContainerPlugin);

    var _this = (0, _possibleConstructorReturn3.default)(this, _UIObject.call(this, container.options));

    _this.container = container;
    _this.enabled = true;
    _this.bindEvents();
    return _this;
  }

  UIContainerPlugin.prototype.enable = function enable() {
    if (!this.enabled) {
      this.bindEvents();
      this.$el.show();
      this.enabled = true;
    }
  };

  UIContainerPlugin.prototype.disable = function disable() {
    this.stopListening();
    this.$el.hide();
    this.enabled = false;
  };

  UIContainerPlugin.prototype.bindEvents = function bindEvents() {};

  UIContainerPlugin.prototype.destroy = function destroy() {
    this.remove();
  };

  return UIContainerPlugin;
}(_ui_object2.default);

exports.default = UIContainerPlugin;


UIContainerPlugin.extend = function (properties) {
  return (0, _utils.extend)(UIContainerPlugin, properties);
};

UIContainerPlugin.type = 'container';
module.exports = exports['default'];

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _base_object = __webpack_require__(16);

var _base_object2 = _interopRequireDefault(_base_object);

var _utils = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The base class for a container plugin
 * @class ContainerPlugin
 * @constructor
 * @extends UIObject
 * @module base
 */
var ContainerPlugin = function (_BaseObject) {
  (0, _inherits3.default)(ContainerPlugin, _BaseObject);

  function ContainerPlugin(container) {
    (0, _classCallCheck3.default)(this, ContainerPlugin);

    var _this = (0, _possibleConstructorReturn3.default)(this, _BaseObject.call(this, container.options));

    _this.container = container;
    _this.enabled = true;
    _this.bindEvents();
    return _this;
  }

  ContainerPlugin.prototype.enable = function enable() {
    if (!this.enabled) {
      this.bindEvents();
      this.enabled = true;
    }
  };

  ContainerPlugin.prototype.disable = function disable() {
    if (this.enabled) {
      this.stopListening();
      this.enabled = false;
    }
  };

  ContainerPlugin.prototype.bindEvents = function bindEvents() {};

  ContainerPlugin.prototype.destroy = function destroy() {
    this.stopListening();
  };

  return ContainerPlugin;
}(_base_object2.default);

exports.default = ContainerPlugin;


ContainerPlugin.extend = function (properties) {
  return (0, _utils.extend)(ContainerPlugin, properties);
};

ContainerPlugin.type = 'container';
module.exports = exports['default'];

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = __webpack_require__(5);

var _ui_object = __webpack_require__(20);

var _ui_object2 = _interopRequireDefault(_ui_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UICorePlugin = function (_UIObject) {
  (0, _inherits3.default)(UICorePlugin, _UIObject);

  function UICorePlugin(core) {
    (0, _classCallCheck3.default)(this, UICorePlugin);

    var _this = (0, _possibleConstructorReturn3.default)(this, _UIObject.call(this, core.options));

    _this.core = core;
    _this.enabled = true;
    _this.bindEvents();
    _this.render();
    return _this;
  }

  UICorePlugin.prototype.bindEvents = function bindEvents() {};

  UICorePlugin.prototype.getExternalInterface = function getExternalInterface() {
    return {};
  };

  UICorePlugin.prototype.enable = function enable() {
    if (!this.enabled) {
      this.bindEvents();
      this.$el.show();
      this.enabled = true;
    }
  };

  UICorePlugin.prototype.disable = function disable() {
    this.stopListening();
    this.$el.hide();
    this.enabled = false;
  };

  UICorePlugin.prototype.destroy = function destroy() {
    this.remove();
  };

  UICorePlugin.prototype.render = function render() {
    return this;
  };

  return UICorePlugin;
}(_ui_object2.default);

exports.default = UICorePlugin;


UICorePlugin.extend = function (properties) {
  return (0, _utils.extend)(UICorePlugin, properties);
};

UICorePlugin.type = 'core';
module.exports = exports['default'];

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(39);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 39 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 41 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(43)('keys')
  , uid    = __webpack_require__(32);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(14)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 44 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(91);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(26);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(23)
  , dPs         = __webpack_require__(96)
  , enumBugKeys = __webpack_require__(44)
  , IE_PROTO    = __webpack_require__(42)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(63)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(97).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(15).f
  , has = __webpack_require__(17)
  , TAG = __webpack_require__(11)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(11);

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(14)
  , core           = __webpack_require__(8)
  , LIBRARY        = __webpack_require__(47)
  , wksExt         = __webpack_require__(50)
  , defineProperty = __webpack_require__(15).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 52 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(52)
  , createDesc     = __webpack_require__(28)
  , toIObject      = __webpack_require__(13)
  , toPrimitive    = __webpack_require__(46)
  , has            = __webpack_require__(17)
  , IE8_DOM_DEFINE = __webpack_require__(62)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(19) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _kibo = __webpack_require__(127);

var _kibo2 = _interopRequireDefault(_kibo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { Kibo: _kibo2.default };
module.exports = exports['default'];

/***/ }),
/* 55 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var events = new _events2.default(); // Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/**
 * The mediator is a singleton for handling global events.
 */

var Mediator = function Mediator() {
  (0, _classCallCheck3.default)(this, Mediator);
};

exports.default = Mediator;


Mediator.on = function (name, callback, context) {
  events.on(name, callback, context);
  return;
};

Mediator.once = function (name, callback, context) {
  events.once(name, callback, context);
  return;
};

Mediator.off = function (name, callback, context) {
  events.off(name, callback, context);
  return;
};

Mediator.trigger = function (name) {
  for (var _len = arguments.length, opts = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    opts[_key - 1] = arguments[_key];
  }

  events.trigger.apply(events, [name].concat(opts));
  return;
};

Mediator.stopListening = function (obj, name, callback) {
  events.stopListening(obj, name, callback);
  return;
};
module.exports = exports['default'];

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\"><path fill=\"#010101\" d=\"M1.425.35L14.575 8l-13.15 7.65V.35z\"></path></svg>"

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _html5_video = __webpack_require__(154);

var _html5_video2 = _interopRequireDefault(_html5_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _html5_video2.default;
module.exports = exports['default'];

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(17)
  , toIObject    = __webpack_require__(13)
  , arrayIndexOf = __webpack_require__(89)(false)
  , IE_PROTO     = __webpack_require__(42)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(41)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(18)
  , core    = __webpack_require__(8)
  , fails   = __webpack_require__(27);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(19) && !__webpack_require__(27)(function(){
  return Object.defineProperty(__webpack_require__(63)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(26)
  , document = __webpack_require__(14).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(94)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(65)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(47)
  , $export        = __webpack_require__(18)
  , redefine       = __webpack_require__(66)
  , hide           = __webpack_require__(22)
  , has            = __webpack_require__(17)
  , Iterators      = __webpack_require__(29)
  , $iterCreate    = __webpack_require__(95)
  , setToStringTag = __webpack_require__(49)
  , getPrototypeOf = __webpack_require__(98)
  , ITERATOR       = __webpack_require__(11)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(22);

/***/ }),
/* 67 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(59)
  , hiddenKeys = __webpack_require__(44).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(120), __esModule: true };

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _log = __webpack_require__(126);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _log2.default;
module.exports = exports['default'];

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = __webpack_require__(130);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _core2.default;
module.exports = exports['default'];

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _container = __webpack_require__(133);

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _container2.default;
module.exports = exports['default'];

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _media_control = __webpack_require__(137);

var _media_control2 = _interopRequireDefault(_media_control);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _media_control2.default;
module.exports = exports['default'];

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = "<%=baseUrl%>/a8c874b93b3d848f39a71260c57e3863.cur";

/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#010101\" d=\"M1.712 14.76H6.43V1.24H1.71v13.52zm7.86-13.52v13.52h4.716V1.24H9.573z\"></path></svg>"

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clapprZepto = __webpack_require__(6);

var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

var _template = __webpack_require__(10);

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var Styler = {
  getStyleFor: function getStyleFor(style) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { baseUrl: '' };

    return (0, _clapprZepto2.default)('<style class="clappr-style"></style>').html((0, _template2.default)(style.toString())(options));
  }
};

exports.default = Styler;
module.exports = exports['default'];

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loader = __webpack_require__(153);

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _loader2.default;
module.exports = exports['default'];

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(155), __esModule: true };

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _html5_audio = __webpack_require__(167);

var _html5_audio2 = _interopRequireDefault(_html5_audio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _html5_audio2.default;
module.exports = exports['default'];

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _html_img = __webpack_require__(168);

var _html_img2 = _interopRequireDefault(_html_img);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _html_img2.default;
module.exports = exports['default'];

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _no_op = __webpack_require__(171);

var _no_op2 = _interopRequireDefault(_no_op);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _no_op2.default;
module.exports = exports['default'];

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _poster = __webpack_require__(187);

var _poster2 = _interopRequireDefault(_poster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _poster2.default;
module.exports = exports['default'];

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _player = __webpack_require__(85);

var _player2 = _interopRequireDefault(_player);

var _utils = __webpack_require__(5);

var _utils2 = _interopRequireDefault(_utils);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _playback = __webpack_require__(12);

var _playback2 = _interopRequireDefault(_playback);

var _container_plugin = __webpack_require__(36);

var _container_plugin2 = _interopRequireDefault(_container_plugin);

var _core_plugin = __webpack_require__(30);

var _core_plugin2 = _interopRequireDefault(_core_plugin);

var _ui_core_plugin = __webpack_require__(37);

var _ui_core_plugin2 = _interopRequireDefault(_ui_core_plugin);

var _ui_container_plugin = __webpack_require__(35);

var _ui_container_plugin2 = _interopRequireDefault(_ui_container_plugin);

var _base_object = __webpack_require__(16);

var _base_object2 = _interopRequireDefault(_base_object);

var _ui_object = __webpack_require__(20);

var _ui_object2 = _interopRequireDefault(_ui_object);

var _browser = __webpack_require__(24);

var _browser2 = _interopRequireDefault(_browser);

var _container = __webpack_require__(73);

var _container2 = _interopRequireDefault(_container);

var _core = __webpack_require__(72);

var _core2 = _interopRequireDefault(_core);

var _loader = __webpack_require__(78);

var _loader2 = _interopRequireDefault(_loader);

var _mediator = __webpack_require__(56);

var _mediator2 = _interopRequireDefault(_mediator);

var _media_control = __webpack_require__(74);

var _media_control2 = _interopRequireDefault(_media_control);

var _player_info = __webpack_require__(34);

var _player_info2 = _interopRequireDefault(_player_info);

var _base_flash_playback = __webpack_require__(21);

var _base_flash_playback2 = _interopRequireDefault(_base_flash_playback);

var _flash = __webpack_require__(21);

var _flash2 = _interopRequireDefault(_flash);

var _flashls = __webpack_require__(21);

var _flashls2 = _interopRequireDefault(_flashls);

var _hls = __webpack_require__(21);

var _hls2 = _interopRequireDefault(_hls);

var _html5_audio = __webpack_require__(80);

var _html5_audio2 = _interopRequireDefault(_html5_audio);

var _html5_video = __webpack_require__(58);

var _html5_video2 = _interopRequireDefault(_html5_video);

var _html_img = __webpack_require__(81);

var _html_img2 = _interopRequireDefault(_html_img);

var _no_op = __webpack_require__(82);

var _no_op2 = _interopRequireDefault(_no_op);

var _poster = __webpack_require__(83);

var _poster2 = _interopRequireDefault(_poster);

var _log = __webpack_require__(71);

var _log2 = _interopRequireDefault(_log);

var _styler = __webpack_require__(77);

var _styler2 = _interopRequireDefault(_styler);

var _vendor = __webpack_require__(54);

var _vendor2 = _interopRequireDefault(_vendor);

var _template = __webpack_require__(10);

var _template2 = _interopRequireDefault(_template);

var _clapprZepto = __webpack_require__(6);

var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = "0.2.81"; // Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

exports.default = {
  Player: _player2.default,
  Mediator: _mediator2.default,
  Events: _events2.default,
  Browser: _browser2.default,
  PlayerInfo: _player_info2.default,
  MediaControl: _media_control2.default,
  ContainerPlugin: _container_plugin2.default,
  UIContainerPlugin: _ui_container_plugin2.default,
  CorePlugin: _core_plugin2.default,
  UICorePlugin: _ui_core_plugin2.default,
  Playback: _playback2.default,
  Container: _container2.default,
  Core: _core2.default,
  Loader: _loader2.default,
  BaseObject: _base_object2.default,
  UIObject: _ui_object2.default,
  Utils: _utils2.default,
  BaseFlashPlayback: _base_flash_playback2.default,
  Flash: _flash2.default,
  FlasHLS: _flashls2.default,
  HLS: _hls2.default,
  HTML5Audio: _html5_audio2.default,
  HTML5Video: _html5_video2.default,
  HTMLImg: _html_img2.default,
  NoOp: _no_op2.default,
  Poster: _poster2.default,
  Log: _log2.default,
  Styler: _styler2.default,
  Vendor: _vendor2.default,
  version: version,
  template: _template2.default,
  $: _clapprZepto2.default
};
module.exports = exports['default'];

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(31);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = __webpack_require__(5);

var _base_object = __webpack_require__(16);

var _base_object2 = _interopRequireDefault(_base_object);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _browser = __webpack_require__(24);

var _browser2 = _interopRequireDefault(_browser);

var _core_factory = __webpack_require__(128);

var _core_factory2 = _interopRequireDefault(_core_factory);

var _loader = __webpack_require__(78);

var _loader2 = _interopRequireDefault(_loader);

var _player_info = __webpack_require__(34);

var _player_info2 = _interopRequireDefault(_player_info);

var _clapprZepto = __webpack_require__(6);

var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var baseUrl = (0, _utils.currentScriptUrl)().replace(/\/[^/]+$/, '');

/**
 * @class Player
 * @constructor
 * @extends BaseObject
 * @module components
 * @example
 * ### Using the Player
 *
 * Add the following script on your HTML:
 * ```html
 * <head>
 *   <script type="text/javascript" src="http://cdn.clappr.io/latest/clappr.min.js"></script>
 * </head>
 * ```
 * Now, create the player:
 * ```html
 * <body>
 *   <div id="player"></div>
 *   <script>
 *     var player = new Clappr.Player({source: "http://your.video/here.mp4", parentId: "#player"});
 *   </script>
 * </body>
 * ```
 */

var Player = function (_BaseObject) {
  (0, _inherits3.default)(Player, _BaseObject);
  (0, _createClass3.default)(Player, [{
    key: 'loader',
    set: function set(loader) {
      this._loader = loader;
    },
    get: function get() {
      if (!this._loader) this._loader = new _loader2.default(this.options.plugins || {}, this.options.playerId);

      return this._loader;
    }

    /**
     * Determine if the playback has ended.
     * @property ended
     * @type Boolean
     */

  }, {
    key: 'ended',
    get: function get() {
      return this.core.mediaControl.container.ended;
    }

    /**
     * Determine if the playback is having to buffer in order for
     * playback to be smooth.
     * (i.e if a live stream is playing smoothly, this will be false)
     * @property buffering
     * @type Boolean
     */

  }, {
    key: 'buffering',
    get: function get() {
      return this.core.mediaControl.container.buffering;
    }

    /*
     * determine if the player is ready.
     * @property isReady
     * @type {Boolean} `true` if the player is ready. ie PLAYER_READY event has fired
     */

  }, {
    key: 'isReady',
    get: function get() {
      return !!this._ready;
    }

    /**
     * An events map that allows the user to add custom callbacks in player's options.
     * @property eventsMapping
     * @type {Object}
     */

  }, {
    key: 'eventsMapping',
    get: function get() {
      return {
        onReady: _events2.default.PLAYER_READY,
        onResize: _events2.default.PLAYER_RESIZE,
        onPlay: _events2.default.PLAYER_PLAY,
        onPause: _events2.default.PLAYER_PAUSE,
        onStop: _events2.default.PLAYER_STOP,
        onEnded: _events2.default.PLAYER_ENDED,
        onSeek: _events2.default.PLAYER_SEEK,
        onError: _events2.default.PLAYER_ERROR,
        onTimeUpdate: _events2.default.PLAYER_TIMEUPDATE,
        onVolumeUpdate: _events2.default.PLAYER_VOLUMEUPDATE,
        onSubtitleAvailable: _events2.default.PLAYER_SUBTITLE_AVAILABLE
      };
    }

    /**
     * ## Player's constructor
     *
     * You might pass the options object to build the player.
     * ```javascript
     * var options = {source: "http://example.com/video.mp4", param1: "val1"};
     * var player = new Clappr.Player(options);
     * ```
     *
     * @method constructor
     * @param {Object} options Data
     * options to build a player instance
     * @param {Number} [options.width]
     * player's width **default**: `640`
     * @param {Number} [options.height]
     * player's height **default**: `360`
     * @param {String} [options.parentId]
     * the id of the element on the page that the player should be inserted into
     * @param {Object} [options.parent]
     * a reference to a dom element that the player should be inserted into
     * @param {String} [options.source]
     * The media source URL, or {source: <<source URL>>, mimeType: <<source mime type>>}
     * @param {Object} [options.sources]
     * An array of media source URL's, or an array of {source: <<source URL>>, mimeType: <<source mime type>>}
     * @param {Boolean} [options.autoPlay]
     * automatically play after page load **default**: `false`
     * @param {Boolean} [options.loop]
     * automatically replay after it ends **default**: `false`
     * @param {Boolean} [options.chromeless]
     * player acts in chromeless mode **default**: `false`
     * @param {Boolean} [options.allowUserInteraction]
     * whether or not the player should handle click events when in chromeless mode **default**: `false` on desktops browsers, `true` on mobile.
     * @param {Boolean} [options.disableKeyboardShortcuts]
     * disable keyboard shortcuts. **default**: `false`. `true` if `allowUserInteraction` is `false`.
     * @param {Boolean} [options.mute]
     * start the video muted **default**: `false`
     * @param {String} [options.mimeType]
     * add `mimeType: "application/vnd.apple.mpegurl"` if you need to use a url without extension.
     * @param {String} [options.actualLiveTime]
     * show duration and seek time relative to actual time.
     * @param {String} [options.actualLiveServerTime]
     * specify server time as a string, format: "2015/11/26 06:01:03". This option is meant to be used with actualLiveTime.
     * @param {Boolean} [options.persistConfig]
     * persist player's settings (volume) through the same domain **default**: `true`
     * @param {String} [options.preload]
     * video will be preloaded according to `preload` attribute options **default**: `'metadata'`
     * @param {Number} [options.maxBufferLength]
     * the default behavior for the **HLS playback** is to keep buffering indefinitely, even on VoD.
     * This replicates the behavior for progressive download, which continues buffering when pausing the video, thus making the video available for playback even on slow networks.
     * To change this behavior use `maxBufferLength` where **value is in seconds**.
     * @param {String} [options.gaAccount]
     * enable Google Analytics events dispatch **(play/pause/stop/buffering/etc)** by adding your `gaAccount`
     * @param {String} [options.gaTrackerName]
     * besides `gaAccount` you can optionally, pass your favorite trackerName as `gaTrackerName`
     * @param {Object} [options.mediacontrol]
     * customize control bar colors, example: `mediacontrol: {seekbar: "#E113D3", buttons: "#66B2FF"}`
     * @param {Boolean} [options.hideMediaControl]
     * control media control auto hide **default**: `true`
     * @param {Boolean} [options.hideVolumeBar]
     * when embedded with width less than 320, volume bar will hide. You can force this behavior for all sizes by adding `true` **default**: `false`
     * @param {String} [options.watermark]
     * put `watermark: 'http://url/img.png'` on your embed parameters to automatically add watermark on your video.
     * You can customize corner position by defining position parameter. Positions can be `bottom-left`, `bottom-right`, `top-left` and `top-right`.
     * @param {String} [options.watermarkLink]
     * `watermarkLink: 'http://example.net/'` - define URL to open when the watermark is clicked. If not provided watermark will not be clickable.
     * @param {Boolean} [options.disableVideoTagContextMenu]
     * disables the context menu (right click) on the video element if a HTML5Video playback is used.
     * @param {Boolean} [options.autoSeekFromUrl]
     * Automatically seek to the seconds provided in the url (e.g example.com?t=100) **default**: `true`
     * @param {Boolean} [options.exitFullscreenOnEnd]
     * Automatically exit full screen when the media finishes. **default**: `true`
     * @param {String} [options.poster]
     * define a poster by adding its address `poster: 'http://url/img.png'`. It will appear after video embed, disappear on play and go back when user stops the video.
     * @param {String} [options.playbackNotSupportedMessage]
     * define a custom message to be displayed when a playback is not supported.
     * @param {Object} [options.events]
     * Specify listeners which will be registered with their corresponding player events.
     * E.g. onReady -> "PLAYER_READY", onTimeUpdate -> "PLAYER_TIMEUPDATE"
     */

  }]);

  function Player(options) {
    (0, _classCallCheck3.default)(this, Player);

    var _this = (0, _possibleConstructorReturn3.default)(this, _BaseObject.call(this, options));

    var defaultOptions = { playerId: (0, _utils.uniqueId)(''), persistConfig: true, width: 640, height: 360, baseUrl: baseUrl, allowUserInteraction: _browser2.default.isMobile };
    _this._options = _clapprZepto2.default.extend(defaultOptions, options);
    _this.options.sources = _this._normalizeSources(options);
    if (!_this.options.chromeless) {
      // "allowUserInteraction" cannot be false if not in chromeless mode.
      _this.options.allowUserInteraction = true;
    }
    if (!_this.options.allowUserInteraction) {
      // if user iteraction is not allowed ensure keyboard shortcuts are disabled
      _this.options.disableKeyboardShortcuts = true;
    }
    _this._registerOptionEventListeners();
    _this._coreFactory = new _core_factory2.default(_this);
    _this.playerInfo = _player_info2.default.getInstance(_this.options.playerId);
    _this.playerInfo.currentSize = { width: options.width, height: options.height };
    _this.playerInfo.options = _this.options;
    if (_this.options.parentId) _this.setParentId(_this.options.parentId);else if (_this.options.parent) _this.attachTo(_this.options.parent);

    return _this;
  }

  /**
   * Specify a `parentId` to the player.
   * @method setParentId
   * @param {String} parentId the element parent id.
   * @return {Player} itself
   */


  Player.prototype.setParentId = function setParentId(parentId) {
    var el = document.querySelector(parentId);
    if (el) this.attachTo(el);

    return this;
  };

  /**
   * You can use this method to attach the player to a given element. You don't need to do this when you specify it during the player instantiation passing the `parentId` param.
   * @method attachTo
   * @param {Object} element a given element.
   * @return {Player} itself
   */


  Player.prototype.attachTo = function attachTo(element) {
    this.options.parentElement = element;
    this.core = this._coreFactory.create();
    this._addEventListeners();
    return this;
  };

  Player.prototype._addEventListeners = function _addEventListeners() {
    if (!this.core.isReady) this.listenToOnce(this.core, _events2.default.CORE_READY, this._onReady);else this._onReady();

    this.listenTo(this.core.mediaControl, _events2.default.MEDIACONTROL_CONTAINERCHANGED, this._containerChanged);
    this.listenTo(this.core, _events2.default.CORE_FULLSCREEN, this._onFullscreenChange);
    return this;
  };

  Player.prototype._addContainerEventListeners = function _addContainerEventListeners() {
    var container = this.core.mediaControl.container;
    if (container) {
      this.listenTo(container, _events2.default.CONTAINER_PLAY, this._onPlay);
      this.listenTo(container, _events2.default.CONTAINER_PAUSE, this._onPause);
      this.listenTo(container, _events2.default.CONTAINER_STOP, this._onStop);
      this.listenTo(container, _events2.default.CONTAINER_ENDED, this._onEnded);
      this.listenTo(container, _events2.default.CONTAINER_SEEK, this._onSeek);
      this.listenTo(container, _events2.default.CONTAINER_ERROR, this._onError);
      this.listenTo(container, _events2.default.CONTAINER_TIMEUPDATE, this._onTimeUpdate);
      this.listenTo(container, _events2.default.CONTAINER_VOLUME, this._onVolumeUpdate);
      this.listenTo(container, _events2.default.CONTAINER_SUBTITLE_AVAILABLE, this._onSubtitleAvailable);
    }
    return this;
  };

  Player.prototype._registerOptionEventListeners = function _registerOptionEventListeners() {
    var _this2 = this;

    var userEvents = this.options.events || {};
    (0, _keys2.default)(userEvents).forEach(function (userEvent) {
      var eventType = _this2.eventsMapping[userEvent];
      if (eventType) {
        var eventFunction = userEvents[userEvent];
        eventFunction = typeof eventFunction === 'function' && eventFunction;
        eventFunction && _this2.on(eventType, eventFunction);
      }
    });
    return this;
  };

  Player.prototype._containerChanged = function _containerChanged() {
    this.stopListening();
    this._addEventListeners();
  };

  Player.prototype._onReady = function _onReady() {
    this._ready = true;
    this._addContainerEventListeners();
    this.trigger(_events2.default.PLAYER_READY);
  };

  Player.prototype._onFullscreenChange = function _onFullscreenChange(fullscreen) {
    this.trigger(_events2.default.PLAYER_FULLSCREEN, fullscreen);
  };

  Player.prototype._onVolumeUpdate = function _onVolumeUpdate(volume) {
    this.trigger(_events2.default.PLAYER_VOLUMEUPDATE, volume);
  };

  Player.prototype._onSubtitleAvailable = function _onSubtitleAvailable() {
    this.trigger(_events2.default.PLAYER_SUBTITLE_AVAILABLE);
  };

  Player.prototype._onPlay = function _onPlay() {
    this.trigger(_events2.default.PLAYER_PLAY);
  };

  Player.prototype._onPause = function _onPause() {
    this.trigger(_events2.default.PLAYER_PAUSE);
  };

  Player.prototype._onStop = function _onStop() {
    this.trigger(_events2.default.PLAYER_STOP, this.getCurrentTime());
  };

  Player.prototype._onEnded = function _onEnded() {
    this.trigger(_events2.default.PLAYER_ENDED);
  };

  Player.prototype._onSeek = function _onSeek(time) {
    this.trigger(_events2.default.PLAYER_SEEK, time);
  };

  Player.prototype._onTimeUpdate = function _onTimeUpdate(timeProgress) {
    this.trigger(_events2.default.PLAYER_TIMEUPDATE, timeProgress);
  };

  Player.prototype._onError = function _onError(error) {
    this.trigger(_events2.default.PLAYER_ERROR, error);
  };

  Player.prototype._normalizeSources = function _normalizeSources(options) {
    var sources = options.sources || (options.source !== undefined ? [options.source] : []);
    return sources.length === 0 ? [{ source: '', mimeType: '' }] : sources;
  };

  /**
   * resizes the current player canvas.
   * @method resize
   * @param {Object} size should be a literal object with `height` and `width`.
   * @return {Player} itself
   * @example
   * ```javascript
   * player.resize({height: 360, width: 640})
   * ```
   */


  Player.prototype.resize = function resize(size) {
    this.core.resize(size);
    return this;
  };

  /**
   * loads a new source.
   * @method load
   * @param {Array|String} sources source or sources of video.
   * An array item can be a string or {source: <<source URL>>, mimeType: <<source mime type>>}
   * @param {String} mimeType a mime type, example: `'application/vnd.apple.mpegurl'`
   * @param {Boolean} [autoPlay=false] whether playing should be started immediately
   * @return {Player} itself
   */


  Player.prototype.load = function load(sources, mimeType, autoPlay) {
    if (autoPlay !== undefined) this.configure({ autoPlay: !!autoPlay });

    this.core.load(sources, mimeType);
    return this;
  };

  /**
   * destroys the current player and removes it from the DOM.
   * @method destroy
   * @return {Player} itself
   */


  Player.prototype.destroy = function destroy() {
    this.core.destroy();
    return this;
  };

  /**
   * Gives user consent to playback. Required by mobile device after a click event before Player.load().
   * @method consent
   * @return {Player} itself
   */


  Player.prototype.consent = function consent() {
    this.core.getCurrentPlayback().consent();
    return this;
  };

  /**
   * plays the current video (`source`).
   * @method play
   * @return {Player} itself
   */


  Player.prototype.play = function play() {
    this.core.mediaControl.container.play();
    return this;
  };

  /**
   * pauses the current video (`source`).
   * @method pause
   * @return {Player} itself
   */


  Player.prototype.pause = function pause() {
    this.core.mediaControl.container.pause();
    return this;
  };

  /**
   * stops the current video (`source`).
   * @method stop
   * @return {Player} itself
   */


  Player.prototype.stop = function stop() {
    this.core.mediaControl.container.stop();
    return this;
  };

  /**
   * seeks the current video (`source`). For example, `player.seek(120)` will seek to second 120 (2minutes) of the current video.
   * @method seek
   * @param {Number} time should be a number between 0 and the video duration.
   * @return {Player} itself
   */


  Player.prototype.seek = function seek(time) {
    this.core.mediaControl.container.seek(time);
    return this;
  };

  /**
   * seeks the current video (`source`). For example, `player.seek(50)` will seek to the middle of the current video.
   * @method seekPercentage
   * @param {Number} time should be a number between 0 and 100.
   * @return {Player} itself
   */


  Player.prototype.seekPercentage = function seekPercentage(percentage) {
    this.core.mediaControl.container.seekPercentage(percentage);
    return this;
  };

  /**
   * Set the volume for the current video (`source`).
   * @method setVolume
   * @param {Number} volume should be a number between 0 and 100, 0 being mute and 100 the max volume.
   * @return {Player} itself
   */


  Player.prototype.setVolume = function setVolume(volume) {
    if (this.core && this.core.mediaControl) this.core.mediaControl.setVolume(volume);

    return this;
  };

  /**
   * Get the volume for the current video
   * @method getVolume
   * @return {Number} volume should be a number between 0 and 100, 0 being mute and 100 the max volume.
   */


  Player.prototype.getVolume = function getVolume() {
    return this.core && this.core.mediaControl ? this.core.mediaControl.volume : 0;
  };

  /**
   * mutes the current video (`source`).
   * @method mute
   * @return {Player} itself
   */


  Player.prototype.mute = function mute() {
    this._mutedVolume = this.getVolume();
    this.setVolume(0);
    return this;
  };

  /**
   * unmutes the current video (`source`).
   * @method unmute
   * @return {Player} itself
   */


  Player.prototype.unmute = function unmute() {
    this.setVolume(typeof this._mutedVolume === 'number' ? this._mutedVolume : 100);
    this._mutedVolume = null;
    return this;
  };

  /**
   * checks if the player is playing.
   * @method isPlaying
   * @return {Boolean} `true` if the current source is playing, otherwise `false`
   */


  Player.prototype.isPlaying = function isPlaying() {
    return this.core.mediaControl.container.isPlaying();
  };

  /**
   * returns `true` if DVR is enable otherwise `false`.
   * @method isDvrEnabled
   * @return {Boolean}
   */


  Player.prototype.isDvrEnabled = function isDvrEnabled() {
    return this.core.mediaControl.container.isDvrEnabled();
  };

  /**
   * returns `true` if DVR is in use otherwise `false`.
   * @method isDvrInUse
   * @return {Boolean}
   */


  Player.prototype.isDvrInUse = function isDvrInUse() {
    return this.core.mediaControl.container.isDvrInUse();
  };

  /**
   * enables to configure a player after its creation
   * @method configure
   * @param {Object} options all the options to change in form of a javascript object
   * @return {Player} itself
   */


  Player.prototype.configure = function configure(options) {
    this.core.configure(options);
    return this;
  };

  /**
   * get a plugin by its name.
   * @method getPlugin
   * @param {String} name of the plugin.
   * @return {Object} the plugin instance
   * @example
   * ```javascript
   * var poster = player.getPlugin('poster');
   * poster.hidePlayButton();
   * ```
   */


  Player.prototype.getPlugin = function getPlugin(name) {
    var plugins = this.core.plugins.concat(this.core.mediaControl.container.plugins);
    return plugins.filter(function (plugin) {
      return plugin.name === name;
    })[0];
  };

  /**
   * the current time in seconds.
   * @method getCurrentTime
   * @return {Number} current time (in seconds) of the current source
   */


  Player.prototype.getCurrentTime = function getCurrentTime() {
    return this.core.mediaControl.container.getCurrentTime();
  };

  /**
   * The time that "0" now represents relative to when playback started.
   * For a stream with a sliding window this will increase as content is
   * removed from the beginning.
   * @method getStartTimeOffset
   * @return {Number} time (in seconds) that time "0" represents.
   */


  Player.prototype.getStartTimeOffset = function getStartTimeOffset() {
    return this.core.mediaControl.container.getStartTimeOffset();
  };

  /**
   * the duration time in seconds.
   * @method getDuration
   * @return {Number} duration time (in seconds) of the current source
   */


  Player.prototype.getDuration = function getDuration() {
    return this.core.mediaControl.container.getDuration();
  };

  return Player;
}(_base_object2.default);

exports.default = Player;
module.exports = exports['default'];

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(87);
module.exports = __webpack_require__(8).Object.keys;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(38)
  , $keys    = __webpack_require__(25);

__webpack_require__(61)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(40);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(13)
  , toLength  = __webpack_require__(60)
  , toIndex   = __webpack_require__(90);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(41)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(64);
__webpack_require__(99);
module.exports = __webpack_require__(50).f('iterator');

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(41)
  , defined   = __webpack_require__(39);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(48)
  , descriptor     = __webpack_require__(28)
  , setToStringTag = __webpack_require__(49)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(22)(IteratorPrototype, __webpack_require__(11)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(15)
  , anObject = __webpack_require__(23)
  , getKeys  = __webpack_require__(25);

module.exports = __webpack_require__(19) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14).document && document.documentElement;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(17)
  , toObject    = __webpack_require__(38)
  , IE_PROTO    = __webpack_require__(42)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(100);
var global        = __webpack_require__(14)
  , hide          = __webpack_require__(22)
  , Iterators     = __webpack_require__(29)
  , TO_STRING_TAG = __webpack_require__(11)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(101)
  , step             = __webpack_require__(102)
  , Iterators        = __webpack_require__(29)
  , toIObject        = __webpack_require__(13);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(65)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(104), __esModule: true };

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(105);
__webpack_require__(111);
__webpack_require__(112);
__webpack_require__(113);
module.exports = __webpack_require__(8).Symbol;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(14)
  , has            = __webpack_require__(17)
  , DESCRIPTORS    = __webpack_require__(19)
  , $export        = __webpack_require__(18)
  , redefine       = __webpack_require__(66)
  , META           = __webpack_require__(106).KEY
  , $fails         = __webpack_require__(27)
  , shared         = __webpack_require__(43)
  , setToStringTag = __webpack_require__(49)
  , uid            = __webpack_require__(32)
  , wks            = __webpack_require__(11)
  , wksExt         = __webpack_require__(50)
  , wksDefine      = __webpack_require__(51)
  , keyOf          = __webpack_require__(107)
  , enumKeys       = __webpack_require__(108)
  , isArray        = __webpack_require__(109)
  , anObject       = __webpack_require__(23)
  , toIObject      = __webpack_require__(13)
  , toPrimitive    = __webpack_require__(46)
  , createDesc     = __webpack_require__(28)
  , _create        = __webpack_require__(48)
  , gOPNExt        = __webpack_require__(110)
  , $GOPD          = __webpack_require__(53)
  , $DP            = __webpack_require__(15)
  , $keys          = __webpack_require__(25)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(68).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(52).f  = $propertyIsEnumerable;
  __webpack_require__(67).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(47)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(22)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(32)('meta')
  , isObject = __webpack_require__(26)
  , has      = __webpack_require__(17)
  , setDesc  = __webpack_require__(15).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(27)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(25)
  , toIObject = __webpack_require__(13);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(25)
  , gOPS    = __webpack_require__(67)
  , pIE     = __webpack_require__(52);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(40);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(13)
  , gOPN      = __webpack_require__(68).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 111 */
/***/ (function(module, exports) {



/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51)('asyncIterator');

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51)('observable');

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(115);
var $Object = __webpack_require__(8).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(18);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(19), 'Object', {defineProperty: __webpack_require__(15).f});

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(117), __esModule: true };

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(118);
module.exports = __webpack_require__(8).Object.setPrototypeOf;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(18);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(119).set});

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(26)
  , anObject = __webpack_require__(23);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(45)(Function.call, __webpack_require__(53).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(121);
var $Object = __webpack_require__(8).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(18)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(48)});

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(123), __esModule: true };

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(124);
var $Object = __webpack_require__(8).Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(13)
  , $getOwnPropertyDescriptor = __webpack_require__(53).f;

__webpack_require__(61)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/**
 * Array.prototype.find
 *
 * Original source : https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/find
 * See also : https://tc39.github.io/ecma262/#sec-array.prototype.find
 */
if (!Array.prototype.find) {
  // eslint-disable-next-line
  Object.defineProperty(Array.prototype, 'find', {
    // Note: ES6 arrow function syntax is not used on purpose to avoid this to be undefined
    value: function value(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) throw new TypeError('"this" is null or not defined');

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') throw new TypeError('predicate must be a function');

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) return kValue;

        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _vendor = __webpack_require__(54);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BOLD = 'font-weight: bold; font-size: 13px;';
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var INFO = 'color: #006600;' + BOLD;
var DEBUG = 'color: #0000ff;' + BOLD;
var WARN = 'color: #ff8000;' + BOLD;
var ERROR = 'color: #ff0000;' + BOLD;

var LEVEL_DEBUG = 0;
var LEVEL_INFO = 1;
var LEVEL_WARN = 2;
var LEVEL_ERROR = 3;
var LEVEL_DISABLED = LEVEL_ERROR;

var COLORS = [DEBUG, INFO, WARN, ERROR, ERROR];
var DESCRIPTIONS = ['debug', 'info', 'warn', 'error', 'disabled'];

var Log = function () {
  function Log() {
    var _this = this;

    var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LEVEL_INFO;
    var offLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LEVEL_DISABLED;
    (0, _classCallCheck3.default)(this, Log);

    this.kibo = new _vendor.Kibo();
    this.kibo.down(['ctrl shift d'], function () {
      return _this.onOff();
    });
    this.BLACKLIST = ['timeupdate', 'playback:timeupdate', 'playback:progress', 'container:hover', 'container:timeupdate', 'container:progress'];
    this.level = level;
    this.offLevel = offLevel;
  }

  Log.prototype.debug = function debug(klass) {
    this.log(klass, LEVEL_DEBUG, Array.prototype.slice.call(arguments, 1));
  };

  Log.prototype.info = function info(klass) {
    this.log(klass, LEVEL_INFO, Array.prototype.slice.call(arguments, 1));
  };

  Log.prototype.warn = function warn(klass) {
    this.log(klass, LEVEL_WARN, Array.prototype.slice.call(arguments, 1));
  };

  Log.prototype.error = function error(klass) {
    this.log(klass, LEVEL_ERROR, Array.prototype.slice.call(arguments, 1));
  };

  Log.prototype.onOff = function onOff() {
    if (this.level === this.offLevel) {
      this.level = this.previousLevel;
    } else {
      this.previousLevel = this.level;
      this.level = this.offLevel;
    }
    // handle instances where console.log is unavailable
    if (window.console && window.console.log) window.console.log('%c[Clappr.Log] set log level to ' + DESCRIPTIONS[this.level], WARN);
  };

  Log.prototype.level = function level(newLevel) {
    this.level = newLevel;
  };

  Log.prototype.log = function log(klass, level, message) {
    if (this.BLACKLIST.indexOf(message[0]) >= 0) return;
    if (level < this.level) return;

    if (!message) {
      message = klass;
      klass = null;
    }
    var color = COLORS[level];
    var klassDescription = '';
    if (klass) klassDescription = '[' + klass + ']';

    if (window.console && window.console.log) window.console.log.apply(console, ['%c[' + DESCRIPTIONS[level] + ']' + klassDescription, color].concat(message));
  };

  return Log;
}();

exports.default = Log;


Log.LEVEL_DEBUG = LEVEL_DEBUG;
Log.LEVEL_INFO = LEVEL_INFO;
Log.LEVEL_WARN = LEVEL_WARN;
Log.LEVEL_ERROR = LEVEL_ERROR;

Log.getInstance = function () {
  if (this._instance === undefined) {
    this._instance = new this();
    this._instance.previousLevel = this._instance.level;
    this._instance.level = this._instance.offLevel;
  }
  return this._instance;
};

Log.setLevel = function (level) {
  this.getInstance().level = level;
};

Log.debug = function () {
  this.getInstance().debug.apply(this.getInstance(), arguments);
};
Log.info = function () {
  this.getInstance().info.apply(this.getInstance(), arguments);
};
Log.warn = function () {
  this.getInstance().warn.apply(this.getInstance(), arguments);
};
Log.error = function () {
  this.getInstance().error.apply(this.getInstance(), arguments);
};
module.exports = exports['default'];

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable */
// Kibo is released under the MIT License. Copyright (c) 2013 marquete.
// see https://github.com/marquete/kibo

var Kibo = function Kibo(element) {
  this.element = element || window.document;
  this.initialize();
};

Kibo.KEY_NAMES_BY_CODE = {
  8: 'backspace', 9: 'tab', 13: 'enter',
  16: 'shift', 17: 'ctrl', 18: 'alt',
  20: 'caps_lock',
  27: 'esc',
  32: 'space',
  37: 'left', 38: 'up', 39: 'right', 40: 'down',
  48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9',
  65: 'a', 66: 'b', 67: 'c', 68: 'd', 69: 'e', 70: 'f', 71: 'g', 72: 'h', 73: 'i', 74: 'j',
  75: 'k', 76: 'l', 77: 'm', 78: 'n', 79: 'o', 80: 'p', 81: 'q', 82: 'r', 83: 's', 84: 't',
  85: 'u', 86: 'v', 87: 'w', 88: 'x', 89: 'y', 90: 'z', 112: 'f1', 113: 'f2', 114: 'f3',
  115: 'f4', 116: 'f5', 117: 'f6', 118: 'f7', 119: 'f8', 120: 'f9', 121: 'f10', 122: 'f11', 123: 'f12'
};

Kibo.KEY_CODES_BY_NAME = {};
(function () {
  for (var key in Kibo.KEY_NAMES_BY_CODE) {
    if (Object.prototype.hasOwnProperty.call(Kibo.KEY_NAMES_BY_CODE, key)) {
      Kibo.KEY_CODES_BY_NAME[Kibo.KEY_NAMES_BY_CODE[key]] = +key;
    }
  }
})();

Kibo.MODIFIERS = ['shift', 'ctrl', 'alt'];

Kibo.registerEvent = function () {
  if (document.addEventListener) {
    return function (element, eventName, func) {
      element.addEventListener(eventName, func, false);
    };
  } else if (document.attachEvent) {
    return function (element, eventName, func) {
      element.attachEvent('on' + eventName, func);
    };
  }
}();

Kibo.unregisterEvent = function () {
  if (document.removeEventListener) {
    return function (element, eventName, func) {
      element.removeEventListener(eventName, func, false);
    };
  } else if (document.detachEvent) {
    return function (element, eventName, func) {
      element.detachEvent('on' + eventName, func);
    };
  }
}();

Kibo.stringContains = function (string, substring) {
  return string.indexOf(substring) !== -1;
};

Kibo.neatString = function (string) {
  return string.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
};

Kibo.capitalize = function (string) {
  return string.toLowerCase().replace(/^./, function (match) {
    return match.toUpperCase();
  });
};

Kibo.isString = function (what) {
  return Kibo.stringContains(Object.prototype.toString.call(what), 'String');
};

Kibo.arrayIncludes = function () {
  if (Array.prototype.indexOf) {
    return function (haystack, needle) {
      return haystack.indexOf(needle) !== -1;
    };
  } else {
    return function (haystack, needle) {
      for (var i = 0; i < haystack.length; i++) {
        if (haystack[i] === needle) {
          return true;
        }
      }
      return false;
    };
  }
}();

Kibo.extractModifiers = function (keyCombination) {
  var modifiers, i;
  modifiers = [];
  for (i = 0; i < Kibo.MODIFIERS.length; i++) {
    if (Kibo.stringContains(keyCombination, Kibo.MODIFIERS[i])) {
      modifiers.push(Kibo.MODIFIERS[i]);
    }
  }
  return modifiers;
};

Kibo.extractKey = function (keyCombination) {
  var keys, i;
  keys = Kibo.neatString(keyCombination).split(' ');
  for (i = 0; i < keys.length; i++) {
    if (!Kibo.arrayIncludes(Kibo.MODIFIERS, keys[i])) {
      return keys[i];
    }
  }
};

Kibo.modifiersAndKey = function (keyCombination) {
  var result, key;

  if (Kibo.stringContains(keyCombination, 'any')) {
    return Kibo.neatString(keyCombination).split(' ').slice(0, 2).join(' ');
  }

  result = Kibo.extractModifiers(keyCombination);

  key = Kibo.extractKey(keyCombination);
  if (key && !Kibo.arrayIncludes(Kibo.MODIFIERS, key)) {
    result.push(key);
  }

  return result.join(' ');
};

Kibo.keyName = function (keyCode) {
  return Kibo.KEY_NAMES_BY_CODE[keyCode + ''];
};

Kibo.keyCode = function (keyName) {
  return +Kibo.KEY_CODES_BY_NAME[keyName];
};

Kibo.prototype.initialize = function () {
  var i,
      that = this;

  this.lastKeyCode = -1;
  this.lastModifiers = {};
  for (i = 0; i < Kibo.MODIFIERS.length; i++) {
    this.lastModifiers[Kibo.MODIFIERS[i]] = false;
  }

  this.keysDown = { any: [] };
  this.keysUp = { any: [] };
  this.downHandler = this.handler('down');
  this.upHandler = this.handler('up');

  Kibo.registerEvent(this.element, 'keydown', this.downHandler);
  Kibo.registerEvent(this.element, 'keyup', this.upHandler);
  Kibo.registerEvent(window, 'unload', function unloader() {
    Kibo.unregisterEvent(that.element, 'keydown', that.downHandler);
    Kibo.unregisterEvent(that.element, 'keyup', that.upHandler);
    Kibo.unregisterEvent(window, 'unload', unloader);
  });
};

Kibo.prototype.handler = function (upOrDown) {
  var that = this;
  return function (e) {
    var i, registeredKeys, lastModifiersAndKey;

    e = e || window.event;

    that.lastKeyCode = e.keyCode;
    for (i = 0; i < Kibo.MODIFIERS.length; i++) {
      that.lastModifiers[Kibo.MODIFIERS[i]] = e[Kibo.MODIFIERS[i] + 'Key'];
    }
    if (Kibo.arrayIncludes(Kibo.MODIFIERS, Kibo.keyName(that.lastKeyCode))) {
      that.lastModifiers[Kibo.keyName(that.lastKeyCode)] = true;
    }

    registeredKeys = that['keys' + Kibo.capitalize(upOrDown)];

    for (i = 0; i < registeredKeys.any.length; i++) {
      if (registeredKeys.any[i](e) === false && e.preventDefault) {
        e.preventDefault();
      }
    }

    lastModifiersAndKey = that.lastModifiersAndKey();
    if (registeredKeys[lastModifiersAndKey]) {
      for (i = 0; i < registeredKeys[lastModifiersAndKey].length; i++) {
        if (registeredKeys[lastModifiersAndKey][i](e) === false && e.preventDefault) {
          e.preventDefault();
        }
      }
    }
  };
};

Kibo.prototype.registerKeys = function (upOrDown, newKeys, func) {
  var i,
      keys,
      registeredKeys = this['keys' + Kibo.capitalize(upOrDown)];

  if (Kibo.isString(newKeys)) {
    newKeys = [newKeys];
  }

  for (i = 0; i < newKeys.length; i++) {
    keys = newKeys[i];
    keys = Kibo.modifiersAndKey(keys + '');

    if (registeredKeys[keys]) {
      registeredKeys[keys].push(func);
    } else {
      registeredKeys[keys] = [func];
    }
  }

  return this;
};

// jshint maxdepth:5
Kibo.prototype.unregisterKeys = function (upOrDown, newKeys, func) {
  var i,
      j,
      keys,
      registeredKeys = this['keys' + Kibo.capitalize(upOrDown)];

  if (Kibo.isString(newKeys)) {
    newKeys = [newKeys];
  }

  for (i = 0; i < newKeys.length; i++) {
    keys = newKeys[i];
    keys = Kibo.modifiersAndKey(keys + '');

    if (func === null) {
      delete registeredKeys[keys];
    } else {
      if (registeredKeys[keys]) {
        for (j = 0; j < registeredKeys[keys].length; j++) {
          if (String(registeredKeys[keys][j]) === String(func)) {
            registeredKeys[keys].splice(j, 1);
            break;
          }
        }
      }
    }
  }

  return this;
};

Kibo.prototype.off = function (keys) {
  return this.unregisterKeys('down', keys, null);
};

Kibo.prototype.delegate = function (upOrDown, keys, func) {
  return func !== null || func !== undefined ? this.registerKeys(upOrDown, keys, func) : this.unregisterKeys(upOrDown, keys, func);
};

Kibo.prototype.down = function (keys, func) {
  return this.delegate('down', keys, func);
};

Kibo.prototype.up = function (keys, func) {
  return this.delegate('up', keys, func);
};

Kibo.prototype.lastKey = function (modifier) {
  if (!modifier) {
    return Kibo.keyName(this.lastKeyCode);
  }

  return this.lastModifiers[modifier];
};

Kibo.prototype.lastModifiersAndKey = function () {
  var result, i;

  result = [];
  for (i = 0; i < Kibo.MODIFIERS.length; i++) {
    if (this.lastKey(Kibo.MODIFIERS[i])) {
      result.push(Kibo.MODIFIERS[i]);
    }
  }

  if (!Kibo.arrayIncludes(result, this.lastKey())) {
    result.push(this.lastKey());
  }

  return result.join(' ');
};

exports.default = Kibo;
module.exports = exports['default'];

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core_factory = __webpack_require__(129);

var _core_factory2 = _interopRequireDefault(_core_factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _core_factory2.default;
module.exports = exports['default'];

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _base_object = __webpack_require__(16);

var _base_object2 = _interopRequireDefault(_base_object);

var _core = __webpack_require__(72);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The Core Factory is responsible for instantiate the core and it's plugins.
 * @class CoreFactory
 * @constructor
 * @extends BaseObject
 * @module components
 */
// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var CoreFactory = function (_BaseObject) {
  (0, _inherits3.default)(CoreFactory, _BaseObject);
  (0, _createClass3.default)(CoreFactory, [{
    key: 'loader',
    get: function get() {
      return this.player.loader;
    }

    /**
     * it builds the core factory
     * @method constructor
     * @param {Player} player the player object
     */

  }]);

  function CoreFactory(player) {
    (0, _classCallCheck3.default)(this, CoreFactory);

    var _this = (0, _possibleConstructorReturn3.default)(this, _BaseObject.call(this));

    _this.player = player;
    _this._options = player.options;
    return _this;
  }

  /**
   * creates a core and its plugins
   * @method create
   * @return {Core} created core
   */


  CoreFactory.prototype.create = function create() {
    this.options.loader = this.loader;
    this.core = new _core2.default(this.options);
    this.addCorePlugins();
    this.core.createContainers(this.options);
    return this.core;
  };

  /**
   * given the core plugins (`loader.corePlugins`) it builds each one
   * @method addCorePlugins
   * @return {Core} the core with all plugins
   */


  CoreFactory.prototype.addCorePlugins = function addCorePlugins() {
    var _this2 = this;

    this.loader.corePlugins.forEach(function (Plugin) {
      var plugin = new Plugin(_this2.core);
      _this2.core.addPlugin(plugin);
      _this2.setupExternalInterface(plugin);
    });
    return this.core;
  };

  CoreFactory.prototype.setupExternalInterface = function setupExternalInterface(plugin) {
    var externalFunctions = plugin.getExternalInterface();
    for (var key in externalFunctions) {
      this.player[key] = externalFunctions[key].bind(plugin);
    }
  };

  return CoreFactory;
}(_base_object2.default);

exports.default = CoreFactory;
module.exports = exports['default'];

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = __webpack_require__(5);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _ui_object = __webpack_require__(20);

var _ui_object2 = _interopRequireDefault(_ui_object);

var _browser = __webpack_require__(24);

var _browser2 = _interopRequireDefault(_browser);

var _container_factory = __webpack_require__(131);

var _container_factory2 = _interopRequireDefault(_container_factory);

var _media_control = __webpack_require__(74);

var _media_control2 = _interopRequireDefault(_media_control);

var _mediator = __webpack_require__(56);

var _mediator2 = _interopRequireDefault(_mediator);

var _player_info = __webpack_require__(34);

var _player_info2 = _interopRequireDefault(_player_info);

var _styler = __webpack_require__(77);

var _styler2 = _interopRequireDefault(_styler);

var _clapprZepto = __webpack_require__(6);

var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

__webpack_require__(149);

var _fonts = __webpack_require__(151);

var _fonts2 = _interopRequireDefault(_fonts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var style = void 0;

/**
 * The Core is responsible to manage Containers, the mediator, MediaControl
 * and the player state.
 * @class Core
 * @constructor
 * @extends UIObject
 * @module components
 */

var Core = function (_UIObject) {
  (0, _inherits3.default)(Core, _UIObject);
  (0, _createClass3.default)(Core, [{
    key: 'events',
    get: function get() {
      return {
        'webkitfullscreenchange': 'handleFullscreenChange',
        'mousemove': 'showMediaControl',
        'mouseleave': 'hideMediaControl'
      };
    }
  }, {
    key: 'attributes',
    get: function get() {
      return {
        'data-player': '',
        tabindex: 9999
      };
    }

    /**
     * checks if the core is ready.
     * @property isReady
     * @type {Boolean} `true` if the core is ready, otherwise `false`
     */

  }, {
    key: 'isReady',
    get: function get() {
      return !!this.ready;
    }

    /**
     * The internationalization plugin.
     * @property i18n
     * @type {Strings}
     */

  }, {
    key: 'i18n',
    get: function get() {
      return this.getPlugin('strings') || { t: function t(key) {
          return key;
        } };
    }
  }]);

  function Core(options) {
    (0, _classCallCheck3.default)(this, Core);

    var _this = (0, _possibleConstructorReturn3.default)(this, _UIObject.call(this, options));

    _this.configureDomRecycler();
    _this.playerInfo = _player_info2.default.getInstance(options.playerId);
    _this.firstResize = true;
    _this.plugins = [];
    _this.containers = [];
    _this.setupMediaControl(null);
    //FIXME fullscreen api sucks
    _this._boundFullscreenHandler = function () {
      return _this.handleFullscreenChange();
    };
    (0, _clapprZepto2.default)(document).bind('fullscreenchange', _this._boundFullscreenHandler);
    (0, _clapprZepto2.default)(document).bind('MSFullscreenChange', _this._boundFullscreenHandler);
    (0, _clapprZepto2.default)(document).bind('mozfullscreenchange', _this._boundFullscreenHandler);
    _browser2.default.isMobile && (0, _clapprZepto2.default)(window).bind('resize', function (o) {
      _this.handleWindowResize(o);
    });
    return _this;
  }

  Core.prototype.configureDomRecycler = function configureDomRecycler() {
    var recycleVideo = this.options && this.options.playback && this.options.playback.recycleVideo ? true : false;
    _utils.DomRecycler.configure({
      recycleVideo: recycleVideo
    });
  };

  Core.prototype.createContainers = function createContainers(options) {
    var _this2 = this;

    this.defer = _clapprZepto2.default.Deferred();
    this.defer.promise(this);
    this.containerFactory = new _container_factory2.default(options, options.loader, this.i18n);
    this.containerFactory.createContainers().then(function (containers) {
      return _this2.setupContainers(containers);
    }).then(function (containers) {
      return _this2.resolveOnContainersReady(containers);
    });
  };

  Core.prototype.updateSize = function updateSize() {
    if (_utils.Fullscreen.isFullscreen()) this.setFullscreen();else this.setPlayerSize();
  };

  Core.prototype.setFullscreen = function setFullscreen() {
    if (!_browser2.default.isiOS) {
      this.$el.addClass('fullscreen');
      this.$el.removeAttr('style');
      this.playerInfo.previousSize = { width: this.options.width, height: this.options.height };
      this.playerInfo.currentSize = { width: (0, _clapprZepto2.default)(window).width(), height: (0, _clapprZepto2.default)(window).height() };
    }
  };

  Core.prototype.setPlayerSize = function setPlayerSize() {
    this.$el.removeClass('fullscreen');
    this.playerInfo.currentSize = this.playerInfo.previousSize;
    this.playerInfo.previousSize = { width: (0, _clapprZepto2.default)(window).width(), height: (0, _clapprZepto2.default)(window).height() };
    this.resize(this.playerInfo.currentSize);
  };

  Core.prototype.resize = function resize(options) {
    if (!(0, _utils.isNumber)(options.height) && !(0, _utils.isNumber)(options.width)) {
      this.el.style.height = '' + options.height;
      this.el.style.width = '' + options.width;
    } else {
      this.el.style.height = options.height + 'px';
      this.el.style.width = options.width + 'px';
    }
    this.playerInfo.previousSize = { width: this.options.width, height: this.options.height };
    this.options.width = options.width;
    this.options.height = options.height;
    this.playerInfo.currentSize = options;
    this.triggerResize(this.playerInfo.currentSize);
  };

  Core.prototype.enableResizeObserver = function enableResizeObserver() {
    var _this3 = this;

    var checkSizeCallback = function checkSizeCallback() {
      if (_this3.playerInfo.computedSize.width !== _this3.el.clientWidth || _this3.playerInfo.computedSize.height !== _this3.el.clientHeight) {
        _this3.playerInfo.computedSize = { width: _this3.el.clientWidth, height: _this3.el.clientHeight };
        _this3.triggerResize(_this3.playerInfo.computedSize);
      }
    };
    this.resizeObserverInterval = setInterval(checkSizeCallback, 500);
  };

  Core.prototype.triggerResize = function triggerResize(newSize) {
    var thereWasChange = this.firstResize || this.oldHeight !== newSize.height || this.oldWidth !== newSize.width;
    if (thereWasChange) {
      _mediator2.default.trigger(this.options.playerId + ':' + _events2.default.PLAYER_RESIZE, newSize);
      this.oldHeight = newSize.height;
      this.oldWidth = newSize.width;
      this.firstResize = false;
    }
  };

  Core.prototype.disableResizeObserver = function disableResizeObserver() {
    if (this.resizeObserverInterval) clearInterval(this.resizeObserverInterval);
  };

  Core.prototype.resolveOnContainersReady = function resolveOnContainersReady(containers) {
    var _this4 = this;

    _clapprZepto2.default.when.apply(_clapprZepto2.default, containers).done(function () {
      _this4.defer.resolve(_this4);
      _this4.ready = true;
      _this4.trigger(_events2.default.CORE_READY);
    });
  };

  Core.prototype.addPlugin = function addPlugin(plugin) {
    this.plugins.push(plugin);
  };

  Core.prototype.hasPlugin = function hasPlugin(name) {
    return !!this.getPlugin(name);
  };

  Core.prototype.getPlugin = function getPlugin(name) {
    return this.plugins.filter(function (plugin) {
      return plugin.name === name;
    })[0];
  };

  Core.prototype.load = function load(sources, mimeType) {
    var _this5 = this;

    this.options.mimeType = mimeType;
    sources = sources && sources.constructor === Array ? sources : [sources];
    this.containers.forEach(function (container) {
      return container.destroy();
    });
    this.mediaControl.container = null;
    this.containerFactory.options = _clapprZepto2.default.extend(this.options, { sources: sources });
    this.containerFactory.createContainers().then(function (containers) {
      _this5.setupContainers(containers);
    });
  };

  Core.prototype.destroy = function destroy() {
    this.disableResizeObserver();
    this.containers.forEach(function (container) {
      return container.destroy();
    });
    this.plugins.forEach(function (plugin) {
      return plugin.destroy();
    });
    this.$el.remove();
    this.mediaControl.destroy();
    (0, _clapprZepto2.default)(document).unbind('fullscreenchange', this._boundFullscreenHandler);
    (0, _clapprZepto2.default)(document).unbind('MSFullscreenChange', this._boundFullscreenHandler);
    (0, _clapprZepto2.default)(document).unbind('mozfullscreenchange', this._boundFullscreenHandler);
  };

  Core.prototype.handleFullscreenChange = function handleFullscreenChange() {
    this.trigger(_events2.default.CORE_FULLSCREEN, _utils.Fullscreen.isFullscreen());
    this.updateSize();
    this.mediaControl.show();
  };

  Core.prototype.handleWindowResize = function handleWindowResize(event) {
    var orientation = (0, _clapprZepto2.default)(window).width() > (0, _clapprZepto2.default)(window).height() ? 'landscape' : 'portrait';
    if (this._screenOrientation === orientation) return;
    this._screenOrientation = orientation;

    this.trigger(_events2.default.CORE_SCREEN_ORIENTATION_CHANGED, {
      event: event,
      orientation: this._screenOrientation
    });
  };

  Core.prototype.setMediaControlContainer = function setMediaControlContainer(container) {
    this.mediaControl.setContainer(container);
    this.mediaControl.render();
  };

  Core.prototype.disableMediaControl = function disableMediaControl() {
    this.mediaControl.disable();
    this.$el.removeClass('nocursor');
  };

  Core.prototype.enableMediaControl = function enableMediaControl() {
    this.mediaControl.enable();
  };

  Core.prototype.removeContainer = function removeContainer(container) {
    this.stopListening(container);
    this.containers = this.containers.filter(function (c) {
      return c !== container;
    });
  };

  Core.prototype.appendContainer = function appendContainer(container) {
    this.listenTo(container, _events2.default.CONTAINER_DESTROYED, this.removeContainer);
    this.containers.push(container);
  };

  Core.prototype.setupContainers = function setupContainers(containers) {
    containers.map(this.appendContainer.bind(this));
    this.trigger(_events2.default.CORE_CONTAINERS_CREATED);
    this.renderContainers();
    this.setupMediaControl(this.getCurrentContainer());
    this.render();
    this.appendToParent();
    return this.containers;
  };

  Core.prototype.renderContainers = function renderContainers() {
    var _this6 = this;

    this.containers.map(function (container) {
      return _this6.el.appendChild(container.render().el);
    });
  };

  Core.prototype.createContainer = function createContainer(source, options) {
    var container = this.containerFactory.createContainer(source, options);
    this.appendContainer(container);
    this.el.appendChild(container.render().el);
    return container;
  };

  Core.prototype.setupMediaControl = function setupMediaControl(container) {
    if (this.mediaControl) {
      this.mediaControl.setContainer(container);
    } else {
      this.mediaControl = this.createMediaControl(_clapprZepto2.default.extend({ container: container, focusElement: this.el }, this.options));
      this.listenTo(this.mediaControl, _events2.default.MEDIACONTROL_FULLSCREEN, this.toggleFullscreen);
      this.listenTo(this.mediaControl, _events2.default.MEDIACONTROL_SHOW, this.onMediaControlShow.bind(this, true));
      this.listenTo(this.mediaControl, _events2.default.MEDIACONTROL_HIDE, this.onMediaControlShow.bind(this, false));
    }
  };

  Core.prototype.createMediaControl = function createMediaControl(options) {
    if (options.mediacontrol && options.mediacontrol.external) return new options.mediacontrol.external(options).render();else return new _media_control2.default(options).render();
  };

  Core.prototype.getCurrentContainer = function getCurrentContainer() {
    if (!this.mediaControl || !this.mediaControl.container) return this.containers[0];

    return this.mediaControl.container;
  };

  Core.prototype.getCurrentPlayback = function getCurrentPlayback() {
    var container = this.getCurrentContainer();
    return container && container.playback;
  };

  Core.prototype.getPlaybackType = function getPlaybackType() {
    var container = this.getCurrentContainer();
    return container && container.getPlaybackType();
  };

  Core.prototype.toggleFullscreen = function toggleFullscreen() {
    if (!_utils.Fullscreen.isFullscreen()) {
      _utils.Fullscreen.requestFullscreen(this.el);
      if (!_browser2.default.isiOS) this.$el.addClass('fullscreen');
    } else {
      _utils.Fullscreen.cancelFullscreen();
      if (!_browser2.default.isiOS) this.$el.removeClass('fullscreen nocursor');
    }
    this.mediaControl.show();
  };

  Core.prototype.showMediaControl = function showMediaControl(event) {
    this.mediaControl.show(event);
  };

  Core.prototype.hideMediaControl = function hideMediaControl() {
    this.mediaControl.hide(this.options.hideMediaControlDelay);
  };

  Core.prototype.onMediaControlShow = function onMediaControlShow(showing) {
    this.getCurrentContainer().trigger(showing ? _events2.default.CONTAINER_MEDIACONTROL_SHOW : _events2.default.CONTAINER_MEDIACONTROL_HIDE);

    if (showing) this.$el.removeClass('nocursor');else if (_utils.Fullscreen.isFullscreen()) this.$el.addClass('nocursor');
  };

  /**
   * enables to configure the container after its creation
   * @method configure
   * @param {Object} options all the options to change in form of a javascript object
   */


  Core.prototype.configure = function configure(options) {
    var _this7 = this;

    this._options = _clapprZepto2.default.extend(this._options, options);
    this.configureDomRecycler();
    var sources = options.source || options.sources;

    if (sources) {
      this.load(sources, options.mimeType || this.options.mimeType);
    } else {
      this.trigger(_events2.default.CORE_OPTIONS_CHANGE);

      this.containers.forEach(function (container) {
        container.configure(_this7.options);
      });
    }
  };

  Core.prototype.appendToParent = function appendToParent() {
    var hasCoreParent = this.$el.parent() && this.$el.parent().length;
    !hasCoreParent && this.$el.appendTo(this.options.parentElement);
  };

  Core.prototype.render = function render() {
    this.$el.append(this.mediaControl.render().el);

    if (!style) style = _styler2.default.getStyleFor(_fonts2.default, { baseUrl: this.options.baseUrl });

    (0, _clapprZepto2.default)('head').append(style);

    this.options.width = this.options.width || this.$el.width();
    this.options.height = this.options.height || this.$el.height();
    var size = { width: this.options.width, height: this.options.height };
    this.playerInfo.previousSize = this.playerInfo.currentSize = this.playerInfo.computedSize = size;
    this.updateSize();

    this.previousSize = { width: this.$el.width(), height: this.$el.height() };

    this.enableResizeObserver();

    return this;
  };

  return Core;
}(_ui_object2.default);

exports.default = Core;
module.exports = exports['default'];

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _container_factory = __webpack_require__(132);

var _container_factory2 = _interopRequireDefault(_container_factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _container_factory2.default;
module.exports = exports['default'];

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = __webpack_require__(33);

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _base_object = __webpack_require__(16);

var _base_object2 = _interopRequireDefault(_base_object);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _container = __webpack_require__(73);

var _container2 = _interopRequireDefault(_container);

var _clapprZepto = __webpack_require__(6);

var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/**
 * The ContainerFactory is responsible for manage playback bootstrap and create containers.
 */

var ContainerFactory = function (_BaseObject) {
  (0, _inherits3.default)(ContainerFactory, _BaseObject);
  (0, _createClass3.default)(ContainerFactory, [{
    key: 'options',
    get: function get() {
      return this._options;
    },
    set: function set(options) {
      this._options = options;
    }
  }]);

  function ContainerFactory(options, loader, i18n) {
    (0, _classCallCheck3.default)(this, ContainerFactory);

    var _this = (0, _possibleConstructorReturn3.default)(this, _BaseObject.call(this, options));

    _this._i18n = i18n;
    _this.loader = loader;
    return _this;
  }

  ContainerFactory.prototype.createContainers = function createContainers() {
    var _this2 = this;

    return _clapprZepto2.default.Deferred(function (promise) {
      promise.resolve(_this2.options.sources.map(function (source) {
        return _this2.createContainer(source);
      }));
    });
  };

  ContainerFactory.prototype.findPlaybackPlugin = function findPlaybackPlugin(source, mimeType) {
    return this.loader.playbackPlugins.filter(function (p) {
      return p.canPlay(source, mimeType);
    })[0];
  };

  ContainerFactory.prototype.createContainer = function createContainer(source) {
    var resolvedSource = null,
        mimeType = this.options.mimeType;
    if ((typeof source === 'undefined' ? 'undefined' : (0, _typeof3.default)(source)) === 'object') {
      resolvedSource = source.source.toString();
      if (source.mimeType) mimeType = source.mimeType;
    } else {
      resolvedSource = source.toString();
    }

    if (resolvedSource.match(/^\/\//)) resolvedSource = window.location.protocol + resolvedSource;

    var options = _clapprZepto2.default.extend({}, this.options, {
      src: resolvedSource,
      mimeType: mimeType
    });
    var playbackPlugin = this.findPlaybackPlugin(resolvedSource, mimeType);
    var playback = new playbackPlugin(options, this._i18n);

    options = _clapprZepto2.default.extend({}, options, { playback: playback });

    var container = new _container2.default(options, this._i18n);
    var defer = _clapprZepto2.default.Deferred();
    defer.promise(container);
    this.addContainerPlugins(container);
    this.listenToOnce(container, _events2.default.CONTAINER_READY, function () {
      return defer.resolve(container);
    });
    return container;
  };

  ContainerFactory.prototype.addContainerPlugins = function addContainerPlugins(container) {
    this.loader.containerPlugins.forEach(function (Plugin) {
      container.addPlugin(new Plugin(container));
    });
  };

  return ContainerFactory;
}(_base_object2.default);

exports.default = ContainerFactory;
module.exports = exports['default'];

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _ui_object = __webpack_require__(20);

var _ui_object2 = _interopRequireDefault(_ui_object);

__webpack_require__(134);

var _clapprZepto = __webpack_require__(6);

var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An abstraction to represent a container for a given playback
 * TODO: describe its responsabilities
 * @class Container
 * @constructor
 * @extends UIObject
 * @module base
 */
// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/**
 * Container is responsible for the video rendering and state
 */

var Container = function (_UIObject) {
  (0, _inherits3.default)(Container, _UIObject);
  (0, _createClass3.default)(Container, [{
    key: 'name',

    /**
     * container's name
     * @method name
     * @default Container
     * @return {String} container's name
     */
    get: function get() {
      return 'Container';
    }
  }, {
    key: 'attributes',
    get: function get() {
      return { class: 'container', 'data-container': '' };
    }
  }, {
    key: 'events',
    get: function get() {
      return {
        'click': 'clicked',
        'dblclick': 'dblClicked',
        'doubleTap': 'dblClicked',
        'contextmenu': 'onContextMenu',
        'mouseenter': 'mouseEnter',
        'mouseleave': 'mouseLeave'
      };
    }

    /**
     * Determine if the playback has ended.
     * @property ended
     * @type Boolean
     */

  }, {
    key: 'ended',
    get: function get() {
      return this.playback.ended;
    }

    /**
     * Determine if the playback is having to buffer in order for
     * playback to be smooth.
     * (i.e if a live stream is playing smoothly, this will be false)
     * @property buffering
     * @type Boolean
     */

  }, {
    key: 'buffering',
    get: function get() {
      return this.playback.buffering;
    }

    /**
     * The internationalization plugin.
     * @property i18n
     * @type {Strings}
     */

  }, {
    key: 'i18n',
    get: function get() {
      return this._i18n;
    }

    /**
     * checks if has closed caption tracks.
     * @property hasClosedCaptionsTracks
     * @type {Boolean}
     */

  }, {
    key: 'hasClosedCaptionsTracks',
    get: function get() {
      return this.playback.hasClosedCaptionsTracks;
    }

    /**
     * gets the available closed caption tracks.
     * @property closedCaptionsTracks
     * @type {Array} an array of objects with at least 'id' and 'name' properties
     */

  }, {
    key: 'closedCaptionsTracks',
    get: function get() {
      return this.playback.closedCaptionsTracks;
    }

    /**
     * gets the selected closed caption track index. (-1 is disabled)
     * @property closedCaptionsTrackId
     * @type {Number}
     */

  }, {
    key: 'closedCaptionsTrackId',
    get: function get() {
      return this.playback.closedCaptionsTrackId;
    }

    /**
     * sets the selected closed caption track index. (-1 is disabled)
     * @property closedCaptionsTrackId
     * @type {Number}
     */
    ,
    set: function set(trackId) {
      this.playback.closedCaptionsTrackId = trackId;
    }

    /**
     * it builds a container
     * @method constructor
     * @param {Object} options the options object
     * @param {Strings} i18n the internationalization component
     */

  }]);

  function Container(options, i18n) {
    (0, _classCallCheck3.default)(this, Container);

    var _this = (0, _possibleConstructorReturn3.default)(this, _UIObject.call(this, options));

    _this._i18n = i18n;
    _this.currentTime = 0;
    _this.volume = 100;
    _this.playback = options.playback;
    _this.settings = _clapprZepto2.default.extend({}, _this.playback.settings);
    _this.isReady = false;
    _this.mediaControlDisabled = false;
    _this.plugins = [_this.playback];
    _this.bindEvents();
    return _this;
  }

  /**
   * binds playback events to the methods of the container.
   * it listens to playback's events and triggers them as container events.
   *
   * | Playback |
   * |----------|
   * | progress |
   * | timeupdate |
   * | ready |
   * | buffering |
   * | bufferfull |
   * | settingsupdate |
   * | loadedmetadata |
   * | highdefinitionupdate |
   * | bitrate |
   * | playbackstate |
   * | dvr |
   * | mediacontrol_disable |
   * | mediacontrol_enable |
   * | ended |
   * | play |
   * | pause |
   * | error |
   *
   * ps: the events usually translate from PLABACK_x to CONTAINER_x, you can check all the events at `Event` class.
   *
   * @method bindEvents
   */


  Container.prototype.bindEvents = function bindEvents() {
    this.listenTo(this.playback, _events2.default.PLAYBACK_PROGRESS, this.progress);
    this.listenTo(this.playback, _events2.default.PLAYBACK_TIMEUPDATE, this.timeUpdated);
    this.listenTo(this.playback, _events2.default.PLAYBACK_READY, this.ready);
    this.listenTo(this.playback, _events2.default.PLAYBACK_BUFFERING, this.onBuffering);
    this.listenTo(this.playback, _events2.default.PLAYBACK_BUFFERFULL, this.bufferfull);
    this.listenTo(this.playback, _events2.default.PLAYBACK_SETTINGSUPDATE, this.settingsUpdate);
    this.listenTo(this.playback, _events2.default.PLAYBACK_LOADEDMETADATA, this.loadedMetadata);
    this.listenTo(this.playback, _events2.default.PLAYBACK_HIGHDEFINITIONUPDATE, this.highDefinitionUpdate);
    this.listenTo(this.playback, _events2.default.PLAYBACK_BITRATE, this.updateBitrate);
    this.listenTo(this.playback, _events2.default.PLAYBACK_PLAYBACKSTATE, this.playbackStateChanged);
    this.listenTo(this.playback, _events2.default.PLAYBACK_DVR, this.playbackDvrStateChanged);
    this.listenTo(this.playback, _events2.default.PLAYBACK_MEDIACONTROL_DISABLE, this.disableMediaControl);
    this.listenTo(this.playback, _events2.default.PLAYBACK_MEDIACONTROL_ENABLE, this.enableMediaControl);
    this.listenTo(this.playback, _events2.default.PLAYBACK_SEEKED, this.onSeeked);
    this.listenTo(this.playback, _events2.default.PLAYBACK_ENDED, this.onEnded);
    this.listenTo(this.playback, _events2.default.PLAYBACK_PLAY, this.playing);
    this.listenTo(this.playback, _events2.default.PLAYBACK_PAUSE, this.paused);
    this.listenTo(this.playback, _events2.default.PLAYBACK_STOP, this.stopped);
    this.listenTo(this.playback, _events2.default.PLAYBACK_ERROR, this.error);
    this.listenTo(this.playback, _events2.default.PLAYBACK_SUBTITLE_AVAILABLE, this.subtitleAvailable);
    this.listenTo(this.playback, _events2.default.PLAYBACK_SUBTITLE_CHANGED, this.subtitleChanged);
  };

  Container.prototype.subtitleAvailable = function subtitleAvailable() {
    this.trigger(_events2.default.CONTAINER_SUBTITLE_AVAILABLE);
  };

  Container.prototype.subtitleChanged = function subtitleChanged(track) {
    this.trigger(_events2.default.CONTAINER_SUBTITLE_CHANGED, track);
  };

  Container.prototype.playbackStateChanged = function playbackStateChanged(state) {
    this.trigger(_events2.default.CONTAINER_PLAYBACKSTATE, state);
  };

  Container.prototype.playbackDvrStateChanged = function playbackDvrStateChanged(dvrInUse) {
    this.settings = this.playback.settings;
    this.dvrInUse = dvrInUse;
    this.trigger(_events2.default.CONTAINER_PLAYBACKDVRSTATECHANGED, dvrInUse);
  };

  Container.prototype.updateBitrate = function updateBitrate(newBitrate) {
    this.trigger(_events2.default.CONTAINER_BITRATE, newBitrate);
  };

  Container.prototype.statsReport = function statsReport(metrics) {
    this.trigger(_events2.default.CONTAINER_STATS_REPORT, metrics);
  };

  Container.prototype.getPlaybackType = function getPlaybackType() {
    return this.playback.getPlaybackType();
  };

  /**
   * returns `true` if DVR is enable otherwise `false`.
   * @method isDvrEnabled
   * @return {Boolean}
   */


  Container.prototype.isDvrEnabled = function isDvrEnabled() {
    return !!this.playback.dvrEnabled;
  };

  /**
   * returns `true` if DVR is in use otherwise `false`.
   * @method isDvrInUse
   * @return {Boolean}
   */


  Container.prototype.isDvrInUse = function isDvrInUse() {
    return !!this.dvrInUse;
  };

  /**
   * destroys the container
   * @method destroy
   */


  Container.prototype.destroy = function destroy() {
    this.trigger(_events2.default.CONTAINER_DESTROYED, this, this.name);
    this.stopListening();
    this.plugins.forEach(function (plugin) {
      return plugin.destroy();
    });
    this.$el.remove();
  };

  Container.prototype.setStyle = function setStyle(style) {
    this.$el.css(style);
  };

  Container.prototype.animate = function animate(style, duration) {
    return this.$el.animate(style, duration).promise();
  };

  Container.prototype.ready = function ready() {
    this.isReady = true;
    this.trigger(_events2.default.CONTAINER_READY, this.name);
  };

  Container.prototype.isPlaying = function isPlaying() {
    return this.playback.isPlaying();
  };

  Container.prototype.getStartTimeOffset = function getStartTimeOffset() {
    return this.playback.getStartTimeOffset();
  };

  Container.prototype.getCurrentTime = function getCurrentTime() {
    return this.currentTime;
  };

  Container.prototype.getDuration = function getDuration() {
    return this.playback.getDuration();
  };

  Container.prototype.error = function error(errorObj) {
    if (!this.isReady) this.ready();

    this.trigger(_events2.default.CONTAINER_ERROR, { error: errorObj, container: this }, this.name);
  };

  Container.prototype.loadedMetadata = function loadedMetadata(metadata) {
    this.trigger(_events2.default.CONTAINER_LOADEDMETADATA, metadata);
  };

  Container.prototype.timeUpdated = function timeUpdated(timeProgress) {
    this.currentTime = timeProgress.current;
    this.trigger(_events2.default.CONTAINER_TIMEUPDATE, timeProgress, this.name);
  };

  Container.prototype.progress = function progress() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this.trigger.apply(this, [_events2.default.CONTAINER_PROGRESS].concat(args, [this.name]));
  };

  Container.prototype.playing = function playing() {
    this.trigger(_events2.default.CONTAINER_PLAY, this.name);
  };

  Container.prototype.paused = function paused() {
    this.trigger(_events2.default.CONTAINER_PAUSE, this.name);
  };

  /**
   * plays the playback
   * @method play
   */


  Container.prototype.play = function play() {
    this.playback.play();
  };

  /**
   * stops the playback
   * @method stop
   */


  Container.prototype.stop = function stop() {
    this.playback.stop();
    this.currentTime = 0;
  };

  /**
   * pauses the playback
   * @method pause
   */


  Container.prototype.pause = function pause() {
    this.playback.pause();
  };

  Container.prototype.onEnded = function onEnded() {
    this.trigger(_events2.default.CONTAINER_ENDED, this, this.name);
    this.currentTime = 0;
  };

  Container.prototype.stopped = function stopped() {
    this.trigger(_events2.default.CONTAINER_STOP);
  };

  Container.prototype.clicked = function clicked() {
    if (!this.options.chromeless || this.options.allowUserInteraction) this.trigger(_events2.default.CONTAINER_CLICK, this, this.name);
  };

  Container.prototype.dblClicked = function dblClicked() {
    if (!this.options.chromeless || this.options.allowUserInteraction) this.trigger(_events2.default.CONTAINER_DBLCLICK, this, this.name);
  };

  Container.prototype.onContextMenu = function onContextMenu(event) {
    if (!this.options.chromeless || this.options.allowUserInteraction) this.trigger(_events2.default.CONTAINER_CONTEXTMENU, event, this.name);
  };

  Container.prototype.seek = function seek(time) {
    this.trigger(_events2.default.CONTAINER_SEEK, time, this.name);
    this.playback.seek(time);
  };

  Container.prototype.onSeeked = function onSeeked() {
    this.trigger(_events2.default.CONTAINER_SEEKED, this.name);
  };

  Container.prototype.seekPercentage = function seekPercentage(percentage) {
    var duration = this.getDuration();
    if (percentage >= 0 && percentage <= 100) {
      var time = duration * (percentage / 100);
      this.seek(time);
    }
  };

  Container.prototype.setVolume = function setVolume(value) {
    this.volume = parseInt(value, 10);
    this.trigger(_events2.default.CONTAINER_VOLUME, value, this.name);
    this.playback.volume(value);
  };

  Container.prototype.fullscreen = function fullscreen() {
    this.trigger(_events2.default.CONTAINER_FULLSCREEN, this.name);
  };

  Container.prototype.onBuffering = function onBuffering() {
    this.trigger(_events2.default.CONTAINER_STATE_BUFFERING, this.name);
  };

  Container.prototype.bufferfull = function bufferfull() {
    this.trigger(_events2.default.CONTAINER_STATE_BUFFERFULL, this.name);
  };

  /**
   * adds plugin to the container
   * @method addPlugin
   * @param {Object} plugin
   */


  Container.prototype.addPlugin = function addPlugin(plugin) {
    this.plugins.push(plugin);
  };

  /**
   * checks if a plugin, given its name, exist
   * @method hasPlugin
   * @param {String} name
   * @return {Boolean}
   */


  Container.prototype.hasPlugin = function hasPlugin(name) {
    return !!this.getPlugin(name);
  };

  /**
   * get the plugin given its name
   * @method getPlugin
   * @param {String} name
   */


  Container.prototype.getPlugin = function getPlugin(name) {
    return this.plugins.filter(function (plugin) {
      return plugin.name === name;
    })[0];
  };

  Container.prototype.mouseEnter = function mouseEnter() {
    if (!this.options.chromeless || this.options.allowUserInteraction) this.trigger(_events2.default.CONTAINER_MOUSE_ENTER);
  };

  Container.prototype.mouseLeave = function mouseLeave() {
    if (!this.options.chromeless || this.options.allowUserInteraction) this.trigger(_events2.default.CONTAINER_MOUSE_LEAVE);
  };

  Container.prototype.settingsUpdate = function settingsUpdate() {
    this.settings = this.playback.settings;
    this.trigger(_events2.default.CONTAINER_SETTINGSUPDATE);
  };

  Container.prototype.highDefinitionUpdate = function highDefinitionUpdate(isHD) {
    this.trigger(_events2.default.CONTAINER_HIGHDEFINITIONUPDATE, isHD);
  };

  Container.prototype.isHighDefinitionInUse = function isHighDefinitionInUse() {
    return this.playback.isHighDefinitionInUse();
  };

  Container.prototype.disableMediaControl = function disableMediaControl() {
    if (!this.mediaControlDisabled) {
      this.mediaControlDisabled = true;
      this.trigger(_events2.default.CONTAINER_MEDIACONTROL_DISABLE);
    }
  };

  Container.prototype.enableMediaControl = function enableMediaControl() {
    if (this.mediaControlDisabled) {
      this.mediaControlDisabled = false;
      this.trigger(_events2.default.CONTAINER_MEDIACONTROL_ENABLE);
    }
  };

  Container.prototype.updateStyle = function updateStyle() {
    if (!this.options.chromeless || this.options.allowUserInteraction) this.$el.removeClass('chromeless');else this.$el.addClass('chromeless');
  };

  /**
   * enables to configure the container after its creation
   * @method configure
   * @param {Object} options all the options to change in form of a javascript object
   */


  Container.prototype.configure = function configure(options) {
    this._options = _clapprZepto2.default.extend(this._options, options);
    this.updateStyle();
    this.trigger(_events2.default.CONTAINER_OPTIONS_CHANGE);
  };

  Container.prototype.render = function render() {
    this.$el.append(this.playback.render().el);
    this.updateStyle();
    return this;
  };

  return Container;
}(_ui_object2.default);

exports.default = Container;
module.exports = exports['default'];

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(135);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"singleton":true,"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./style.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, ".container[data-container] {\n  position: absolute;\n  background-color: black;\n  height: 100%;\n  width: 100%; }\n  .container[data-container] .chromeless {\n    cursor: default; }\n\n[data-player]:not(.nocursor) .container[data-container]:not(.chromeless).pointer-enabled {\n  cursor: pointer; }\n", ""]);

// exports


/***/ }),
/* 136 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(138);

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = __webpack_require__(5);

var _vendor = __webpack_require__(54);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _ui_object = __webpack_require__(20);

var _ui_object2 = _interopRequireDefault(_ui_object);

var _browser = __webpack_require__(24);

var _browser2 = _interopRequireDefault(_browser);

var _mediator = __webpack_require__(56);

var _mediator2 = _interopRequireDefault(_mediator);

var _template = __webpack_require__(10);

var _template2 = _interopRequireDefault(_template);

var _playback = __webpack_require__(12);

var _playback2 = _interopRequireDefault(_playback);

var _clapprZepto = __webpack_require__(6);

var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

__webpack_require__(140);

var _mediaControl = __webpack_require__(142);

var _mediaControl2 = _interopRequireDefault(_mediaControl);

var _play = __webpack_require__(57);

var _play2 = _interopRequireDefault(_play);

var _pause = __webpack_require__(76);

var _pause2 = _interopRequireDefault(_pause);

var _stop = __webpack_require__(143);

var _stop2 = _interopRequireDefault(_stop);

var _volume = __webpack_require__(144);

var _volume2 = _interopRequireDefault(_volume);

var _mute = __webpack_require__(145);

var _mute2 = _interopRequireDefault(_mute);

var _expand = __webpack_require__(146);

var _expand2 = _interopRequireDefault(_expand);

var _shrink = __webpack_require__(147);

var _shrink2 = _interopRequireDefault(_shrink);

var _hd = __webpack_require__(148);

var _hd2 = _interopRequireDefault(_hd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MediaControl = function (_UIObject) {
  (0, _inherits3.default)(MediaControl, _UIObject);
  (0, _createClass3.default)(MediaControl, [{
    key: 'name',
    get: function get() {
      return 'MediaControl';
    }
  }, {
    key: 'disabled',
    get: function get() {
      return this.userDisabled || this.container && this.container.getPlaybackType() === _playback2.default.NO_OP;
    }
  }, {
    key: 'attributes',
    get: function get() {
      return {
        'class': 'media-control',
        'data-media-control': ''
      };
    }
  }, {
    key: 'events',
    get: function get() {
      return {
        'click [data-play]': 'play',
        'click [data-pause]': 'pause',
        'click [data-playpause]': 'togglePlayPause',
        'click [data-stop]': 'stop',
        'click [data-playstop]': 'togglePlayStop',
        'click [data-fullscreen]': 'toggleFullscreen',
        'click .bar-container[data-seekbar]': 'seek',
        'click .bar-container[data-volume]': 'onVolumeClick',
        'click .drawer-icon[data-volume]': 'toggleMute',
        'mouseenter .drawer-container[data-volume]': 'showVolumeBar',
        'mouseleave .drawer-container[data-volume]': 'hideVolumeBar',
        'mousedown .bar-container[data-volume]': 'startVolumeDrag',
        'mousemove .bar-container[data-volume]': 'mousemoveOnVolumeBar',
        'mousedown .bar-scrubber[data-seekbar]': 'startSeekDrag',
        'mousemove .bar-container[data-seekbar]': 'mousemoveOnSeekBar',
        'mouseleave .bar-container[data-seekbar]': 'mouseleaveOnSeekBar',
        'mouseenter .media-control-layer[data-controls]': 'setUserKeepVisible',
        'mouseleave .media-control-layer[data-controls]': 'resetUserKeepVisible'
      };
    }
  }, {
    key: 'template',
    get: function get() {
      return (0, _template2.default)(_mediaControl2.default);
    }
  }, {
    key: 'volume',
    get: function get() {
      return this.container && this.container.isReady ? this.container.volume : this.intendedVolume;
    }
  }, {
    key: 'muted',
    get: function get() {
      return this.volume === 0;
    }
  }]);

  function MediaControl(options) {
    (0, _classCallCheck3.default)(this, MediaControl);

    var _this = (0, _possibleConstructorReturn3.default)(this, _UIObject.call(this, options));

    _this.persistConfig = _this.options.persistConfig;
    _this.container = options.container;
    _this.currentPositionValue = null;
    _this.currentDurationValue = null;
    var initialVolume = _this.persistConfig ? _utils.Config.restore('volume') : 100;
    _this.setVolume(_this.options.mute ? 0 : initialVolume);
    _this.keepVisible = false;
    _this.fullScreenOnVideoTagSupported = null; // unknown
    _this.addEventListeners();
    _this.settings = {
      left: ['play', 'stop', 'pause'],
      right: ['volume'],
      default: ['position', 'seekbar', 'duration']
    };

    if (_this.container) {
      if (!_clapprZepto2.default.isEmptyObject(_this.container.settings)) _this.settings = _clapprZepto2.default.extend({}, _this.container.settings);
    } else {
      _this.settings = {};
    }

    _this.userDisabled = false;
    if (_this.container && _this.container.mediaControlDisabled || _this.options.chromeless) _this.disable();

    _this.stopDragHandler = function (event) {
      return _this.stopDrag(event);
    };
    _this.updateDragHandler = function (event) {
      return _this.updateDrag(event);
    };
    (0, _clapprZepto2.default)(document).bind('mouseup', _this.stopDragHandler);
    (0, _clapprZepto2.default)(document).bind('mousemove', _this.updateDragHandler);
    return _this;
  }

  MediaControl.prototype.addEventListeners = function addEventListeners() {
    if (this.container) {
      _mediator2.default.on(this.options.playerId + ':' + _events2.default.PLAYER_RESIZE, this.playerResize, this);
      this.listenTo(this.container, _events2.default.CONTAINER_PLAY, this.changeTogglePlay);
      this.listenTo(this.container, _events2.default.CONTAINER_PAUSE, this.changeTogglePlay);
      this.listenTo(this.container, _events2.default.CONTAINER_STOP, this.changeTogglePlay);
      this.listenTo(this.container, _events2.default.CONTAINER_DBLCLICK, this.toggleFullscreen);
      this.listenTo(this.container, _events2.default.CONTAINER_TIMEUPDATE, this.onTimeUpdate);
      this.listenTo(this.container, _events2.default.CONTAINER_PROGRESS, this.updateProgressBar);
      this.listenTo(this.container, _events2.default.CONTAINER_SETTINGSUPDATE, this.settingsUpdate);
      this.listenTo(this.container, _events2.default.CONTAINER_PLAYBACKDVRSTATECHANGED, this.settingsUpdate);
      this.listenTo(this.container, _events2.default.CONTAINER_HIGHDEFINITIONUPDATE, this.highDefinitionUpdate);
      this.listenTo(this.container, _events2.default.CONTAINER_MEDIACONTROL_DISABLE, this.disable);
      this.listenTo(this.container, _events2.default.CONTAINER_MEDIACONTROL_ENABLE, this.enable);
      this.listenTo(this.container, _events2.default.CONTAINER_ENDED, this.ended);
      this.listenTo(this.container, _events2.default.CONTAINER_VOLUME, this.onVolumeChanged);
      if (this.container.playback.el.nodeName.toLowerCase() === 'video') {
        // wait until the metadata has loaded and then check if fullscreen on video tag is supported
        this.listenToOnce(this.container, _events2.default.CONTAINER_LOADEDMETADATA, this.onLoadedMetadataOnVideoTag);
      }
    }
  };

  MediaControl.prototype.disable = function disable() {
    this.userDisabled = true;
    this.hide();
    this.$el.hide();
  };

  MediaControl.prototype.enable = function enable() {
    if (this.options.chromeless) return;
    this.userDisabled = false;
    this.show();
  };

  MediaControl.prototype.play = function play() {
    this.container.play();
  };

  MediaControl.prototype.pause = function pause() {
    this.container.pause();
  };

  MediaControl.prototype.stop = function stop() {
    this.container.stop();
  };

  MediaControl.prototype.onVolumeChanged = function onVolumeChanged() {
    this.updateVolumeUI();
  };

  MediaControl.prototype.onLoadedMetadataOnVideoTag = function onLoadedMetadataOnVideoTag() {
    var video = this.container.playback.el;
    // video.webkitSupportsFullscreen is deprecated but iOS appears to only use this
    // see https://github.com/clappr/clappr/issues/1127
    if (!_utils.Fullscreen.fullscreenEnabled() && video.webkitSupportsFullscreen) {
      this.fullScreenOnVideoTagSupported = true;
      this.settingsUpdate();
    }
  };

  MediaControl.prototype.updateVolumeUI = function updateVolumeUI() {
    if (!this.rendered) {
      // this will be called after a render
      return;
    }
    // update volume bar scrubber/fill on bar mode
    this.$volumeBarContainer.find('.bar-fill-2').css({});
    var containerWidth = this.$volumeBarContainer.width();
    var barWidth = this.$volumeBarBackground.width();
    var offset = (containerWidth - barWidth) / 2.0;
    var pos = barWidth * this.volume / 100.0 + offset;
    this.$volumeBarFill.css({ width: this.volume + '%' });
    this.$volumeBarScrubber.css({ left: pos });

    // update volume bar segments on segmented bar mode
    this.$volumeBarContainer.find('.segmented-bar-element').removeClass('fill');
    var item = Math.ceil(this.volume / 10.0);
    this.$volumeBarContainer.find('.segmented-bar-element').slice(0, item).addClass('fill');
    this.$volumeIcon.html('');
    this.$volumeIcon.removeClass('muted');
    if (!this.muted) {
      this.$volumeIcon.append(_volume2.default);
    } else {
      this.$volumeIcon.append(_mute2.default);
      this.$volumeIcon.addClass('muted');
    }
    this.applyButtonStyle(this.$volumeIcon);
  };

  MediaControl.prototype.changeTogglePlay = function changeTogglePlay() {
    this.$playPauseToggle.html('');
    this.$playStopToggle.html('');
    if (this.container && this.container.isPlaying()) {
      this.$playPauseToggle.append(_pause2.default);
      this.$playStopToggle.append(_stop2.default);
      this.trigger(_events2.default.MEDIACONTROL_PLAYING);
    } else {
      this.$playPauseToggle.append(_play2.default);
      this.$playStopToggle.append(_play2.default);
      this.trigger(_events2.default.MEDIACONTROL_NOTPLAYING);
      if (_browser2.default.isMobile) this.show();
    }
    this.applyButtonStyle(this.$playPauseToggle);
    this.applyButtonStyle(this.$playStopToggle);
  };

  MediaControl.prototype.mousemoveOnSeekBar = function mousemoveOnSeekBar(event) {
    if (this.settings.seekEnabled) {
      var offsetX = event.pageX - this.$seekBarContainer.offset().left - this.$seekBarHover.width() / 2;
      this.$seekBarHover.css({ left: offsetX });
    }
    this.trigger(_events2.default.MEDIACONTROL_MOUSEMOVE_SEEKBAR, event);
  };

  MediaControl.prototype.mouseleaveOnSeekBar = function mouseleaveOnSeekBar(event) {
    this.trigger(_events2.default.MEDIACONTROL_MOUSELEAVE_SEEKBAR, event);
  };

  MediaControl.prototype.onVolumeClick = function onVolumeClick(event) {
    this.setVolume(this.getVolumeFromUIEvent(event));
  };

  MediaControl.prototype.mousemoveOnVolumeBar = function mousemoveOnVolumeBar(event) {
    if (this.draggingVolumeBar) this.setVolume(this.getVolumeFromUIEvent(event));
  };

  MediaControl.prototype.playerResize = function playerResize(size) {
    this.$fullscreenToggle.html('');
    if (_utils.Fullscreen.isFullscreen()) this.$fullscreenToggle.append(_shrink2.default);else this.$fullscreenToggle.append(_expand2.default);

    this.applyButtonStyle(this.$fullscreenToggle);
    this.$el.removeClass('w320');
    if (size.width <= 320 || this.options.hideVolumeBar) this.$el.addClass('w320');
  };

  MediaControl.prototype.togglePlayPause = function togglePlayPause() {
    if (this.container.isPlaying()) this.container.pause();else this.container.play();

    return false;
  };

  MediaControl.prototype.togglePlayStop = function togglePlayStop() {
    if (this.container.isPlaying()) this.container.stop();else this.container.play();
  };

  MediaControl.prototype.startSeekDrag = function startSeekDrag(event) {
    if (!this.settings.seekEnabled) return;
    this.draggingSeekBar = true;
    this.$el.addClass('dragging');
    this.$seekBarLoaded.addClass('media-control-notransition');
    this.$seekBarPosition.addClass('media-control-notransition');
    this.$seekBarScrubber.addClass('media-control-notransition');
    if (event) event.preventDefault();
  };

  MediaControl.prototype.startVolumeDrag = function startVolumeDrag(event) {
    this.draggingVolumeBar = true;
    this.$el.addClass('dragging');
    if (event) event.preventDefault();
  };

  MediaControl.prototype.stopDrag = function stopDrag(event) {
    if (this.draggingSeekBar) this.seek(event);

    this.$el.removeClass('dragging');
    this.$seekBarLoaded.removeClass('media-control-notransition');
    this.$seekBarPosition.removeClass('media-control-notransition');
    this.$seekBarScrubber.removeClass('media-control-notransition dragging');
    this.draggingSeekBar = false;
    this.draggingVolumeBar = false;
  };

  MediaControl.prototype.updateDrag = function updateDrag(event) {
    if (this.draggingSeekBar) {
      event.preventDefault();
      var offsetX = event.pageX - this.$seekBarContainer.offset().left;
      var pos = offsetX / this.$seekBarContainer.width() * 100;
      pos = Math.min(100, Math.max(pos, 0));
      this.setSeekPercentage(pos);
    } else if (this.draggingVolumeBar) {
      event.preventDefault();
      this.setVolume(this.getVolumeFromUIEvent(event));
    }
  };

  MediaControl.prototype.getVolumeFromUIEvent = function getVolumeFromUIEvent(event) {
    var offsetY = event.pageX - this.$volumeBarContainer.offset().left;
    var volumeFromUI = offsetY / this.$volumeBarContainer.width() * 100;
    return volumeFromUI;
  };

  MediaControl.prototype.toggleMute = function toggleMute() {
    this.setVolume(this.muted ? 100 : 0);
  };

  MediaControl.prototype.setVolume = function setVolume(value) {
    var _this2 = this;

    value = Math.min(100, Math.max(value, 0));
    // this will hold the intended volume
    // it may not actually get set to this straight away
    // if the container is not ready etc
    this.intendedVolume = value;
    this.persistConfig && _utils.Config.persist('volume', value);
    var setWhenContainerReady = function setWhenContainerReady() {
      if (_this2.container.isReady) {
        _this2.container.setVolume(value);
      } else {
        _this2.listenToOnce(_this2.container, _events2.default.CONTAINER_READY, function () {
          _this2.container.setVolume(value);
        });
      }
    };

    if (!this.container) {
      this.listenToOnce(this, _events2.default.MEDIACONTROL_CONTAINERCHANGED, function () {
        setWhenContainerReady();
      });
    } else {
      setWhenContainerReady();
    }
  };

  MediaControl.prototype.toggleFullscreen = function toggleFullscreen() {
    this.trigger(_events2.default.MEDIACONTROL_FULLSCREEN, this.name);
    this.container.fullscreen();
    this.resetUserKeepVisible();
  };

  MediaControl.prototype.setContainer = function setContainer(container) {
    if (this.container) {
      this.stopListening(this.container);
      this.fullScreenOnVideoTagSupported = null;
    }
    _mediator2.default.off(this.options.playerId + ':' + _events2.default.PLAYER_RESIZE, this.playerResize, this);
    this.container = container;
    // set the new container to match the volume of the last one
    this.setVolume(this.intendedVolume);
    this.changeTogglePlay();
    this.addEventListeners();
    this.settingsUpdate();
    this.container.trigger(_events2.default.CONTAINER_PLAYBACKDVRSTATECHANGED, this.container.isDvrInUse());
    if (this.container.mediaControlDisabled) this.disable();

    this.trigger(_events2.default.MEDIACONTROL_CONTAINERCHANGED);
  };

  MediaControl.prototype.showVolumeBar = function showVolumeBar() {
    if (this.hideVolumeId) clearTimeout(this.hideVolumeId);

    this.$volumeBarContainer.removeClass('volume-bar-hide');
  };

  MediaControl.prototype.hideVolumeBar = function hideVolumeBar() {
    var _this3 = this;

    var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 400;

    if (!this.$volumeBarContainer) return;
    if (this.draggingVolumeBar) {
      this.hideVolumeId = setTimeout(function () {
        return _this3.hideVolumeBar();
      }, timeout);
    } else {
      if (this.hideVolumeId) clearTimeout(this.hideVolumeId);

      this.hideVolumeId = setTimeout(function () {
        return _this3.$volumeBarContainer.addClass('volume-bar-hide');
      }, timeout);
    }
  };

  MediaControl.prototype.ended = function ended() {
    this.changeTogglePlay();
  };

  MediaControl.prototype.updateProgressBar = function updateProgressBar(progress) {
    var loadedStart = progress.start / progress.total * 100;
    var loadedEnd = progress.current / progress.total * 100;
    this.$seekBarLoaded.css({ left: loadedStart + '%', width: loadedEnd - loadedStart + '%' });
  };

  MediaControl.prototype.onTimeUpdate = function onTimeUpdate(timeProgress) {
    if (this.draggingSeekBar) return;
    // TODO why should current time ever be negative?
    var position = timeProgress.current < 0 ? timeProgress.total : timeProgress.current;

    this.currentPositionValue = position;
    this.currentDurationValue = timeProgress.total;
    this.renderSeekBar();
  };

  MediaControl.prototype.renderSeekBar = function renderSeekBar() {
    if (this.currentPositionValue === null || this.currentDurationValue === null) {
      // this will be triggered as soon as these beocome available
      return;
    }

    // default to 100%
    this.currentSeekBarPercentage = 100;
    if (this.container.getPlaybackType() !== _playback2.default.LIVE || this.container.isDvrInUse()) this.currentSeekBarPercentage = this.currentPositionValue / this.currentDurationValue * 100;

    this.setSeekPercentage(this.currentSeekBarPercentage);

    var newPosition = (0, _utils.formatTime)(this.currentPositionValue);
    var newDuration = (0, _utils.formatTime)(this.currentDurationValue);
    if (newPosition !== this.displayedPosition) {
      this.$position.text(newPosition);
      this.displayedPosition = newPosition;
    }
    if (newDuration !== this.displayedDuration) {
      this.$duration.text(newDuration);
      this.displayedDuration = newDuration;
    }
  };

  MediaControl.prototype.seek = function seek(event) {
    if (!this.settings.seekEnabled) return;
    var offsetX = event.pageX - this.$seekBarContainer.offset().left;
    var pos = offsetX / this.$seekBarContainer.width() * 100;
    pos = Math.min(100, Math.max(pos, 0));
    this.container.seekPercentage(pos);
    this.setSeekPercentage(pos);
    return false;
  };

  MediaControl.prototype.setKeepVisible = function setKeepVisible() {
    this.keepVisible = true;
  };

  MediaControl.prototype.resetKeepVisible = function resetKeepVisible() {
    this.keepVisible = false;
  };

  MediaControl.prototype.setUserKeepVisible = function setUserKeepVisible() {
    this.userKeepVisible = true;
  };

  MediaControl.prototype.resetUserKeepVisible = function resetUserKeepVisible() {
    this.userKeepVisible = false;
  };

  MediaControl.prototype.isVisible = function isVisible() {
    return !this.$el.hasClass('media-control-hide');
  };

  MediaControl.prototype.show = function show(event) {
    var _this4 = this;

    if (this.disabled) return;

    var timeout = 2000;
    if (!event || event.clientX !== this.lastMouseX && event.clientY !== this.lastMouseY || navigator.userAgent.match(/firefox/i)) {
      clearTimeout(this.hideId);
      this.$el.show();
      this.trigger(_events2.default.MEDIACONTROL_SHOW, this.name);
      this.$el.removeClass('media-control-hide');
      this.hideId = setTimeout(function () {
        return _this4.hide();
      }, timeout);
      if (event) {
        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;
      }
    }
  };

  MediaControl.prototype.hide = function hide() {
    var _this5 = this;

    var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    if (!this.isVisible() || _browser2.default.isMobile && !this.container.isPlaying()) return;

    var timeout = delay || 2000;
    clearTimeout(this.hideId);
    if (!this.disabled && this.options.hideMediaControl === false) return;

    if (!this.disabled && (delay || this.userKeepVisible || this.keepVisible || this.draggingSeekBar || this.draggingVolumeBar)) {
      this.hideId = setTimeout(function () {
        return _this5.hide();
      }, timeout);
    } else {
      this.trigger(_events2.default.MEDIACONTROL_HIDE, this.name);
      this.$el.addClass('media-control-hide');
      this.hideVolumeBar(0);
    }
  };

  MediaControl.prototype.settingsUpdate = function settingsUpdate() {
    var newSettings = this.getSettings();
    if (newSettings && !this.fullScreenOnVideoTagSupported && !_utils.Fullscreen.fullscreenEnabled()) {
      // remove fullscreen from settings if it is present
      newSettings.default && (0, _utils.removeArrayItem)(newSettings.default, 'fullscreen');
      newSettings.left && (0, _utils.removeArrayItem)(newSettings.left, 'fullscreen');
      newSettings.right && (0, _utils.removeArrayItem)(newSettings.right, 'fullscreen');
    }
    var settingsChanged = (0, _stringify2.default)(this.settings) !== (0, _stringify2.default)(newSettings);
    if (settingsChanged) {
      this.settings = newSettings;
      this.render();
    }
  };

  MediaControl.prototype.getSettings = function getSettings() {
    return _clapprZepto2.default.extend(true, {}, this.container.settings);
  };

  MediaControl.prototype.highDefinitionUpdate = function highDefinitionUpdate(isHD) {
    var method = isHD ? 'addClass' : 'removeClass';
    this.$hdIndicator[method]('enabled');
  };

  MediaControl.prototype.createCachedElements = function createCachedElements() {
    var $layer = this.$el.find('.media-control-layer');
    this.$duration = $layer.find('.media-control-indicator[data-duration]');
    this.$fullscreenToggle = $layer.find('button.media-control-button[data-fullscreen]');
    this.$playPauseToggle = $layer.find('button.media-control-button[data-playpause]');
    this.$playStopToggle = $layer.find('button.media-control-button[data-playstop]');
    this.$position = $layer.find('.media-control-indicator[data-position]');
    this.$seekBarContainer = $layer.find('.bar-container[data-seekbar]');
    this.$seekBarHover = $layer.find('.bar-hover[data-seekbar]');
    this.$seekBarLoaded = $layer.find('.bar-fill-1[data-seekbar]');
    this.$seekBarPosition = $layer.find('.bar-fill-2[data-seekbar]');
    this.$seekBarScrubber = $layer.find('.bar-scrubber[data-seekbar]');
    this.$volumeBarContainer = $layer.find('.bar-container[data-volume]');
    this.$volumeContainer = $layer.find('.drawer-container[data-volume]');
    this.$volumeIcon = $layer.find('.drawer-icon[data-volume]');
    this.$volumeBarBackground = this.$el.find('.bar-background[data-volume]');
    this.$volumeBarFill = this.$el.find('.bar-fill-1[data-volume]');
    this.$volumeBarScrubber = this.$el.find('.bar-scrubber[data-volume]');
    this.$hdIndicator = this.$el.find('button.media-control-button[data-hd-indicator]');
    this.resetIndicators();
    this.initializeIcons();
  };

  MediaControl.prototype.resetIndicators = function resetIndicators() {
    this.displayedPosition = this.$position.text();
    this.displayedDuration = this.$duration.text();
  };

  MediaControl.prototype.initializeIcons = function initializeIcons() {
    var $layer = this.$el.find('.media-control-layer');
    $layer.find('button.media-control-button[data-play]').append(_play2.default);
    $layer.find('button.media-control-button[data-pause]').append(_pause2.default);
    $layer.find('button.media-control-button[data-stop]').append(_stop2.default);
    this.$playPauseToggle.append(_play2.default);
    this.$playStopToggle.append(_play2.default);
    this.$volumeIcon.append(_volume2.default);
    this.$fullscreenToggle.append(_expand2.default);
    this.$hdIndicator.append(_hd2.default);
  };

  MediaControl.prototype.setSeekPercentage = function setSeekPercentage(value) {
    value = Math.max(Math.min(value, 100.0), 0);
    if (this.displayedSeekBarPercentage === value) {
      // not changed since last update
      return;
    }
    this.displayedSeekBarPercentage = value;

    this.$seekBarPosition.removeClass('media-control-notransition');
    this.$seekBarScrubber.removeClass('media-control-notransition');
    this.$seekBarPosition.css({ width: value + '%' });
    this.$seekBarScrubber.css({ left: value + '%' });
  };

  MediaControl.prototype.seekRelative = function seekRelative(delta) {
    if (!this.settings.seekEnabled) return;
    var currentTime = this.container.getCurrentTime();
    var duration = this.container.getDuration();
    var position = Math.min(Math.max(currentTime + delta, 0), duration);
    position = Math.min(position * 100 / duration, 100);
    this.container.seekPercentage(position);
  };

  MediaControl.prototype.bindKeyAndShow = function bindKeyAndShow(key, cb) {
    var _this6 = this;

    this.kibo.down(key, function () {
      _this6.show();
      return cb();
    });
  };

  MediaControl.prototype.bindKeyEvents = function bindKeyEvents() {
    var _this7 = this;

    this.unbindKeyEvents();
    this.kibo = new _vendor.Kibo(this.options.focusElement);

    this.bindKeyAndShow('space', function () {
      return _this7.togglePlayPause();
    });
    this.bindKeyAndShow('left', function () {
      return _this7.seekRelative(-5);
    });
    this.bindKeyAndShow('right', function () {
      return _this7.seekRelative(5);
    });
    this.bindKeyAndShow('shift left', function () {
      return _this7.seekRelative(-10);
    });
    this.bindKeyAndShow('shift right', function () {
      return _this7.seekRelative(10);
    });
    this.bindKeyAndShow('shift ctrl left', function () {
      return _this7.seekRelative(-15);
    });
    this.bindKeyAndShow('shift ctrl right', function () {
      return _this7.seekRelative(15);
    });
    // this.kibo.down(['']) // should it be here?
    var keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    keys.forEach(function (i) {
      _this7.bindKeyAndShow(i, function () {
        return _this7.settings.seekEnabled && _this7.container.seekPercentage(i * 10);
      });
    });
  };

  MediaControl.prototype.unbindKeyEvents = function unbindKeyEvents() {
    if (this.kibo) {
      this.kibo.off('space');
      this.kibo.off('left');
      this.kibo.off('right');
      this.kibo.off('shift left');
      this.kibo.off('shift right');
      this.kibo.off('shift ctrl left');
      this.kibo.off('shift ctrl right');
      this.kibo.off(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
    }
  };

  MediaControl.prototype.parseColors = function parseColors() {
    if (this.options.mediacontrol) {
      this.buttonsColor = this.options.mediacontrol.buttons;
      var seekbarColor = this.options.mediacontrol.seekbar;
      this.$el.find('.bar-fill-2[data-seekbar]').css('background-color', seekbarColor);
      this.$el.find('.media-control-icon svg path').css('fill', this.buttonsColor);
      this.$el.find('.segmented-bar-element[data-volume]').css('boxShadow', 'inset 2px 0 0 ' + this.buttonsColor);
    }
  };

  MediaControl.prototype.applyButtonStyle = function applyButtonStyle(element) {
    if (this.buttonsColor && element) (0, _clapprZepto2.default)(element).find('svg path').css('fill', this.buttonsColor);
  };

  MediaControl.prototype.destroy = function destroy() {
    this.remove();
    (0, _clapprZepto2.default)(document).unbind('mouseup', this.stopDragHandler);
    (0, _clapprZepto2.default)(document).unbind('mousemove', this.updateDragHandler);
    this.unbindKeyEvents();
  };

  MediaControl.prototype.render = function render() {
    var _this8 = this;

    var timeout = 1000;
    this.$el.html(this.template({ settings: this.settings }));
    this.createCachedElements();
    this.$playPauseToggle.addClass('paused');
    this.$playStopToggle.addClass('stopped');

    this.changeTogglePlay();
    this.hideId = setTimeout(function () {
      return _this8.hide();
    }, timeout);
    if (this.disabled) this.hide();

    // Video volume cannot be changed with Safari on mobile devices
    // Display mute/unmute icon only if Safari version >= 10
    if (_browser2.default.isSafari && _browser2.default.isMobile) {
      if (_browser2.default.version < 10) this.$volumeContainer.css('display', 'none');else this.$volumeBarContainer.css('display', 'none');
    }

    this.$seekBarPosition.addClass('media-control-notransition');
    this.$seekBarScrubber.addClass('media-control-notransition');

    var previousSeekPercentage = 0;
    if (this.displayedSeekBarPercentage) previousSeekPercentage = this.displayedSeekBarPercentage;

    this.displayedSeekBarPercentage = null;
    this.setSeekPercentage(previousSeekPercentage);

    process.nextTick(function () {
      if (!_this8.settings.seekEnabled) _this8.$seekBarContainer.addClass('seek-disabled');

      if (!_browser2.default.isMobile && !_this8.options.disableKeyboardShortcuts) _this8.bindKeyEvents();

      _this8.playerResize({ width: _this8.options.width, height: _this8.options.height });
      _this8.hideVolumeBar(0);
    });

    this.parseColors();
    this.highDefinitionUpdate();

    this.rendered = true;
    this.updateVolumeUI();
    this.trigger(_events2.default.MEDIACONTROL_RENDERED);
    return this;
  };

  return MediaControl;
}(_ui_object2.default); // Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/**
 * The MediaControl is responsible for displaying the Player controls.
 */

exports.default = MediaControl;


MediaControl.extend = function (properties) {
  return (0, _utils.extend)(MediaControl, properties);
};
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(55)))

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(139), __esModule: true };

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var core  = __webpack_require__(8)
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(141);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"singleton":true,"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./media-control.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./media-control.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, ".media-control-notransition {\n  transition: none !important; }\n\n.media-control[data-media-control] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  z-index: 9999;\n  pointer-events: none; }\n  .media-control[data-media-control].dragging {\n    pointer-events: auto;\n    cursor: -webkit-grabbing !important;\n    cursor: grabbing !important;\n    cursor: url(" + __webpack_require__(75) + "), move; }\n    .media-control[data-media-control].dragging * {\n      cursor: -webkit-grabbing !important;\n      cursor: grabbing !important;\n      cursor: url(" + __webpack_require__(75) + "), move; }\n  .media-control[data-media-control] .media-control-background[data-background] {\n    position: absolute;\n    height: 40%;\n    width: 100%;\n    bottom: 0;\n    background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));\n    transition: opacity 0.6s ease-out; }\n  .media-control[data-media-control] .media-control-icon {\n    line-height: 0;\n    letter-spacing: 0;\n    speak: none;\n    color: #fff;\n    opacity: 0.5;\n    vertical-align: middle;\n    text-align: left;\n    transition: all 0.1s ease; }\n  .media-control[data-media-control] .media-control-icon:hover {\n    color: white;\n    opacity: 0.75;\n    text-shadow: rgba(255, 255, 255, 0.8) 0 0 5px; }\n  .media-control[data-media-control].media-control-hide .media-control-background[data-background] {\n    opacity: 0; }\n  .media-control[data-media-control].media-control-hide .media-control-layer[data-controls] {\n    bottom: -50px; }\n    .media-control[data-media-control].media-control-hide .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar] {\n      opacity: 0; }\n  .media-control[data-media-control] .media-control-layer[data-controls] {\n    position: absolute;\n    bottom: 7px;\n    width: 100%;\n    height: 32px;\n    font-size: 0;\n    vertical-align: middle;\n    pointer-events: auto;\n    transition: bottom 0.4s ease-out; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-left-panel[data-media-control] {\n      position: absolute;\n      top: 0;\n      left: 4px;\n      height: 100%; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-center-panel[data-media-control] {\n      height: 100%;\n      text-align: center;\n      line-height: 32px; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-right-panel[data-media-control] {\n      position: absolute;\n      top: 0;\n      right: 4px;\n      height: 100%; }\n    .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button {\n      background-color: transparent;\n      border: 0;\n      margin: 0 6px;\n      padding: 0;\n      cursor: pointer;\n      display: inline-block;\n      width: 32px;\n      height: 100%; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button svg {\n        width: 100%;\n        height: 22px; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button svg path {\n          fill: white; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button:focus {\n        outline: none; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play] {\n        float: left;\n        height: 100%; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause] {\n        float: left;\n        height: 100%; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop] {\n        float: left;\n        height: 100%; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen] {\n        float: right;\n        background-color: transparent;\n        border: 0;\n        height: 100%; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator] {\n        background-color: transparent;\n        border: 0;\n        cursor: default;\n        display: none;\n        float: right;\n        height: 100%; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled {\n          display: block;\n          opacity: 1.0; }\n          .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled:hover {\n            opacity: 1.0;\n            text-shadow: none; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause] {\n        float: left; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop] {\n        float: left; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position], .media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration] {\n      display: inline-block;\n      font-size: 10px;\n      color: white;\n      cursor: default;\n      line-height: 32px;\n      position: relative; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position] {\n      margin: 0 6px 0 7px; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration] {\n      color: rgba(255, 255, 255, 0.5);\n      margin-right: 6px; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration]:before {\n        content: \"|\";\n        margin-right: 7px; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] {\n      position: absolute;\n      top: -20px;\n      left: 0;\n      display: inline-block;\n      vertical-align: middle;\n      width: 100%;\n      height: 25px;\n      cursor: pointer; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] {\n        width: 100%;\n        height: 1px;\n        position: relative;\n        top: 12px;\n        background-color: #666666; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-1[data-seekbar] {\n          position: absolute;\n          top: 0;\n          left: 0;\n          width: 0;\n          height: 100%;\n          background-color: #c2c2c2;\n          transition: all 0.1s ease-out; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar] {\n          position: absolute;\n          top: 0;\n          left: 0;\n          width: 0;\n          height: 100%;\n          background-color: #005aff;\n          transition: all 0.1s ease-out; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-hover[data-seekbar] {\n          opacity: 0;\n          position: absolute;\n          top: -3px;\n          width: 5px;\n          height: 7px;\n          background-color: rgba(255, 255, 255, 0.5);\n          transition: opacity 0.1s ease; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar]:hover .bar-background[data-seekbar] .bar-hover[data-seekbar] {\n        opacity: 1; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled {\n        cursor: default; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled:hover .bar-background[data-seekbar] .bar-hover[data-seekbar] {\n          opacity: 0; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar] {\n        position: absolute;\n        -webkit-transform: translateX(-50%);\n                transform: translateX(-50%);\n        top: 2px;\n        left: 0;\n        width: 20px;\n        height: 20px;\n        opacity: 1;\n        transition: all 0.1s ease-out; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar] .bar-scrubber-icon[data-seekbar] {\n          position: absolute;\n          left: 6px;\n          top: 6px;\n          width: 8px;\n          height: 8px;\n          border-radius: 10px;\n          box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.2);\n          background-color: white; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] {\n      float: right;\n      display: inline-block;\n      height: 32px;\n      cursor: pointer;\n      margin: 0 6px;\n      box-sizing: border-box; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] {\n        float: left;\n        bottom: 0; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume] {\n          background-color: transparent;\n          border: 0;\n          box-sizing: content-box;\n          width: 32px;\n          height: 32px;\n          opacity: 0.5; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:hover {\n            opacity: 0.75; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume] svg {\n            height: 24px;\n            position: relative;\n            top: 3px; }\n            .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume] svg path {\n              fill: white; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted svg {\n            margin-left: 2px; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] {\n        float: left;\n        position: relative;\n        overflow: hidden;\n        top: 6px;\n        width: 42px;\n        height: 18px;\n        padding: 3px 0;\n        transition: width .2s ease-out; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .bar-background[data-volume] {\n          height: 1px;\n          position: relative;\n          top: 7px;\n          margin: 0 3px;\n          background-color: #666666; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .bar-background[data-volume] .bar-fill-1[data-volume] {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 0;\n            height: 100%;\n            background-color: #c2c2c2;\n            transition: all 0.1s ease-out; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .bar-background[data-volume] .bar-fill-2[data-volume] {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 0;\n            height: 100%;\n            background-color: #005aff;\n            transition: all 0.1s ease-out; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .bar-background[data-volume] .bar-hover[data-volume] {\n            opacity: 0;\n            position: absolute;\n            top: -3px;\n            width: 5px;\n            height: 7px;\n            background-color: rgba(255, 255, 255, 0.5);\n            transition: opacity 0.1s ease; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .bar-scrubber[data-volume] {\n          position: absolute;\n          -webkit-transform: translateX(-50%);\n                  transform: translateX(-50%);\n          top: 0px;\n          left: 0;\n          width: 20px;\n          height: 20px;\n          opacity: 1;\n          transition: all 0.1s ease-out; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .bar-scrubber[data-volume] .bar-scrubber-icon[data-volume] {\n            position: absolute;\n            left: 6px;\n            top: 6px;\n            width: 8px;\n            height: 8px;\n            border-radius: 10px;\n            box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.2);\n            background-color: white; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume] {\n          float: left;\n          width: 4px;\n          padding-left: 2px;\n          height: 12px;\n          opacity: 0.5;\n          box-shadow: inset 2px 0 0 white;\n          transition: -webkit-transform .2s ease-out;\n          transition: transform .2s ease-out;\n          transition: transform .2s ease-out, -webkit-transform .2s ease-out; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume].fill {\n            box-shadow: inset 2px 0 0 #fff;\n            opacity: 1; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:nth-of-type(1) {\n            padding-left: 0; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:hover {\n            -webkit-transform: scaleY(1.5);\n                    transform: scaleY(1.5); }\n  .media-control[data-media-control].w320 .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume].volume-bar-hide {\n    width: 0;\n    height: 12px;\n    top: 9px;\n    padding: 0; }\n", ""]);

// exports


/***/ }),
/* 142 */
/***/ (function(module, exports) {

module.exports = "<div class=\"media-control-background\" data-background></div>\n<div class=\"media-control-layer\" data-controls>\n  <%  var renderBar = function(name) { %>\n      <div class=\"bar-container\" data-<%= name %>>\n        <div class=\"bar-background\" data-<%= name %>>\n          <div class=\"bar-fill-1\" data-<%= name %>></div>\n          <div class=\"bar-fill-2\" data-<%= name %>></div>\n          <div class=\"bar-hover\" data-<%= name %>></div>\n        </div>\n        <div class=\"bar-scrubber\" data-<%= name %>>\n          <div class=\"bar-scrubber-icon\" data-<%= name %>></div>\n        </div>\n      </div>\n  <%  }; %>\n  <%  var renderSegmentedBar = function(name, segments) {\n      segments = segments || 10; %>\n    <div class=\"bar-container\" data-<%= name %>>\n    <% for (var i = 0; i < segments; i++) { %>\n      <div class=\"segmented-bar-element\" data-<%= name %>></div>\n    <% } %>\n    </div>\n  <% }; %>\n  <% var renderDrawer = function(name, renderContent) { %>\n      <div class=\"drawer-container\" data-<%= name %>>\n        <div class=\"drawer-icon-container\" data-<%= name %>>\n          <div class=\"drawer-icon media-control-icon\" data-<%= name %>></div>\n          <span class=\"drawer-text\" data-<%= name %>></span>\n        </div>\n        <% renderContent(name); %>\n      </div>\n  <% }; %>\n  <% var renderIndicator = function(name) { %>\n      <div class=\"media-control-indicator\" data-<%= name %>></div>\n  <% }; %>\n  <% var renderButton = function(name) { %>\n    <button type=\"button\" class=\"media-control-button media-control-icon\" data-<%= name %> aria-label=\"<%= name %>\"></button>\n  <% }; %>\n  <%  var templates = {\n        bar: renderBar,\n        segmentedBar: renderSegmentedBar,\n      };\n      var render = function(settingsList) {\n        settingsList.forEach(function(setting) {\n          if(setting === \"seekbar\") {\n            renderBar(setting);\n          } else if (setting === \"volume\") {\n            renderDrawer(setting, settings.volumeBarTemplate ? templates[settings.volumeBarTemplate] : function(name) { return renderSegmentedBar(name); });\n          } else if (setting === \"duration\" || setting === \"position\") {\n            renderIndicator(setting);\n          } else {\n            renderButton(setting);\n          }\n        });\n      }; %>\n  <% if (settings.default && settings.default.length) { %>\n  <div class=\"media-control-center-panel\" data-media-control>\n    <% render(settings.default); %>\n  </div>\n  <% } %>\n  <% if (settings.left && settings.left.length) { %>\n  <div class=\"media-control-left-panel\" data-media-control>\n    <% render(settings.left); %>\n  </div>\n  <% } %>\n  <% if (settings.right && settings.right.length) { %>\n  <div class=\"media-control-right-panel\" data-media-control>\n    <% render(settings.right); %>\n  </div>\n  <% } %>\n</div>\n";

/***/ }),
/* 143 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#010101\" d=\"M1.712 1.24h12.6v13.52h-12.6z\"></path></svg>"

/***/ }),
/* 144 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#010101\" d=\"M11.5 11h-.002v1.502L7.798 10H4.5V6h3.297l3.7-2.502V4.5h.003V11zM11 4.49L7.953 6.5H5v3h2.953L11 11.51V4.49z\"></path></svg>"

/***/ }),
/* 145 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#010101\" d=\"M9.75 11.51L6.7 9.5H3.75v-3H6.7L9.75 4.49v.664l.497.498V3.498L6.547 6H3.248v4h3.296l3.7 2.502v-2.154l-.497.5v.662zm3-5.165L12.404 6l-1.655 1.653L9.093 6l-.346.345L10.402 8 8.747 9.654l.346.347 1.655-1.653L12.403 10l.348-.346L11.097 8l1.655-1.655z\"></path></svg>"

/***/ }),
/* 146 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\"><path fill=\"#010101\" d=\"M7.156 8L4 11.156V8.5H3V13h4.5v-1H4.844L8 8.844 7.156 8zM8.5 3v1h2.657L8 7.157 8.846 8 12 4.844V7.5h1V3H8.5z\"></path></svg>"

/***/ }),
/* 147 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\"><path fill=\"#010101\" d=\"M13.5 3.344l-.844-.844L9.5 5.656V3h-1v4.5H13v-1h-2.656L13.5 3.344zM3 9.5h2.656L2.5 12.656l.844.844L6.5 10.344V13h1V8.5H3v1z\"></path></svg>"

/***/ }),
/* 148 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\"><path fill=\"#010101\" d=\"M5.375 7.062H2.637V4.26H.502v7.488h2.135V8.9h2.738v2.848h2.133V4.26H5.375v2.802zm5.97-2.81h-2.84v7.496h2.798c2.65 0 4.195-1.607 4.195-3.77v-.022c0-2.162-1.523-3.704-4.154-3.704zm2.06 3.758c0 1.21-.81 1.896-2.03 1.896h-.83V6.093h.83c1.22 0 2.03.696 2.03 1.896v.02z\"></path></svg>"

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(150);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"singleton":true,"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./style.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, "[data-player] {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -o-user-select: none;\n  user-select: none;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  position: relative;\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-style: normal;\n  font-weight: normal;\n  text-align: center;\n  overflow: hidden;\n  font-size: 100%;\n  font-family: \"Roboto\", \"Open Sans\", Arial, sans-serif;\n  text-shadow: 0 0 0;\n  box-sizing: border-box; }\n  [data-player] div, [data-player] span, [data-player] applet, [data-player] object, [data-player] iframe,\n  [data-player] h1, [data-player] h2, [data-player] h3, [data-player] h4, [data-player] h5, [data-player] h6, [data-player] p, [data-player] blockquote, [data-player] pre,\n  [data-player] a, [data-player] abbr, [data-player] acronym, [data-player] address, [data-player] big, [data-player] cite, [data-player] code,\n  [data-player] del, [data-player] dfn, [data-player] em, [data-player] img, [data-player] ins, [data-player] kbd, [data-player] q, [data-player] s, [data-player] samp,\n  [data-player] small, [data-player] strike, [data-player] strong, [data-player] sub, [data-player] sup, [data-player] tt, [data-player] var,\n  [data-player] b, [data-player] u, [data-player] i, [data-player] center,\n  [data-player] dl, [data-player] dt, [data-player] dd, [data-player] ol, [data-player] ul, [data-player] li,\n  [data-player] fieldset, [data-player] form, [data-player] label, [data-player] legend,\n  [data-player] table, [data-player] caption, [data-player] tbody, [data-player] tfoot, [data-player] thead, [data-player] tr, [data-player] th, [data-player] td,\n  [data-player] article, [data-player] aside, [data-player] canvas, [data-player] details, [data-player] embed,\n  [data-player] figure, [data-player] figcaption, [data-player] footer, [data-player] header, [data-player] hgroup,\n  [data-player] menu, [data-player] nav, [data-player] output, [data-player] ruby, [data-player] section, [data-player] summary,\n  [data-player] time, [data-player] mark, [data-player] audio, [data-player] video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font: inherit;\n    font-size: 100%;\n    vertical-align: baseline; }\n  [data-player] table {\n    border-collapse: collapse;\n    border-spacing: 0; }\n  [data-player] caption, [data-player] th, [data-player] td {\n    text-align: left;\n    font-weight: normal;\n    vertical-align: middle; }\n  [data-player] q, [data-player] blockquote {\n    quotes: none; }\n    [data-player] q:before, [data-player] q:after, [data-player] blockquote:before, [data-player] blockquote:after {\n      content: \"\";\n      content: none; }\n  [data-player] a img {\n    border: none; }\n  [data-player]:focus {\n    outline: 0; }\n  [data-player] * {\n    max-width: none;\n    box-sizing: inherit;\n    float: none; }\n  [data-player] div {\n    display: block; }\n  [data-player].fullscreen {\n    width: 100% !important;\n    height: 100% !important;\n    top: 0;\n    left: 0; }\n  [data-player].nocursor {\n    cursor: none; }\n\n.clappr-style {\n  display: none !important; }\n", ""]);

// exports


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: \"Roboto\";\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Roboto\"), local(\"Roboto-Regular\"), url(" + __webpack_require__(152) + ") format(\"truetype\");\n}\n", ""]);

// exports


/***/ }),
/* 152 */
/***/ (function(module, exports) {

module.exports = "<%=baseUrl%>/38861cba61c66739c1452c3a71e39852.ttf";

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = __webpack_require__(70);

var _create2 = _interopRequireDefault(_create);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _base_object = __webpack_require__(16);

var _base_object2 = _interopRequireDefault(_base_object);

var _player_info = __webpack_require__(34);

var _player_info2 = _interopRequireDefault(_player_info);

var _html5_video = __webpack_require__(58);

var _html5_video2 = _interopRequireDefault(_html5_video);

var _flash = __webpack_require__(21);

var _flash2 = _interopRequireDefault(_flash);

var _html5_audio = __webpack_require__(80);

var _html5_audio2 = _interopRequireDefault(_html5_audio);

var _flashls = __webpack_require__(21);

var _flashls2 = _interopRequireDefault(_flashls);

var _hls = __webpack_require__(21);

var _hls2 = _interopRequireDefault(_hls);

var _html_img = __webpack_require__(81);

var _html_img2 = _interopRequireDefault(_html_img);

var _no_op = __webpack_require__(82);

var _no_op2 = _interopRequireDefault(_no_op);

var _spinner_three_bounce = __webpack_require__(175);

var _spinner_three_bounce2 = _interopRequireDefault(_spinner_three_bounce);

var _stats = __webpack_require__(180);

var _stats2 = _interopRequireDefault(_stats);

var _watermark = __webpack_require__(182);

var _watermark2 = _interopRequireDefault(_watermark);

var _poster = __webpack_require__(83);

var _poster2 = _interopRequireDefault(_poster);

var _google_analytics = __webpack_require__(191);

var _google_analytics2 = _interopRequireDefault(_google_analytics);

var _click_to_pause = __webpack_require__(193);

var _click_to_pause2 = _interopRequireDefault(_click_to_pause);

var _dvr_controls = __webpack_require__(195);

var _dvr_controls2 = _interopRequireDefault(_dvr_controls);

var _closed_captions = __webpack_require__(200);

var _closed_captions2 = _interopRequireDefault(_closed_captions);

var _favicon = __webpack_require__(206);

var _favicon2 = _interopRequireDefault(_favicon);

var _seek_time = __webpack_require__(208);

var _seek_time2 = _interopRequireDefault(_seek_time);

var _sources = __webpack_require__(213);

var _sources2 = _interopRequireDefault(_sources);

var _end_video = __webpack_require__(214);

var _end_video2 = _interopRequireDefault(_end_video);

var _strings = __webpack_require__(215);

var _strings2 = _interopRequireDefault(_strings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * It keeps a list of the default plugins (playback, container, core) and it merges external plugins with its internals.
 * @class Loader
 * @constructor
 * @extends BaseObject
 * @module components
 */


/* Playback Plugins */
// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var Loader = function (_BaseObject) {
  (0, _inherits3.default)(Loader, _BaseObject);

  /**
   * builds the loader
   * @method constructor
   * @param {Object} externalPlugins the external plugins
   * @param {Number} playerId you can embed multiple instances of clappr, therefore this is the unique id of each one.
   */
  function Loader(externalPlugins, playerId) {
    (0, _classCallCheck3.default)(this, Loader);

    var _this = (0, _possibleConstructorReturn3.default)(this, _BaseObject.call(this));

    _this.playerId = playerId;
    _this.playbackPlugins = [_html5_video2.default, _html5_audio2.default, _html_img2.default, _no_op2.default];

    if (false) {
      _this.playbackPlugins = _this.playbackPlugins.concat([_hls2.default, _flash2.default, _flashls2.default]);
    }

    _this.containerPlugins = [_spinner_three_bounce2.default, _watermark2.default, _poster2.default, _stats2.default, _google_analytics2.default, _click_to_pause2.default];
    _this.corePlugins = [_dvr_controls2.default, _closed_captions2.default, _favicon2.default, _seek_time2.default, _sources2.default, _end_video2.default, _strings2.default];
    if (externalPlugins) {
      if (!Array.isArray(externalPlugins)) _this.validateExternalPluginsType(externalPlugins);

      _this.addExternalPlugins(externalPlugins);
    }
    return _this;
  }

  /**
   * groups by type the external plugins that were passed through `options.plugins` it they're on a flat array
   * @method addExternalPlugins
   * @private
   * @param {Object} an config object or an array of plugins
   * @return {Object} plugins the config object with the plugins separated by type
   */


  Loader.prototype.groupPluginsByType = function groupPluginsByType(plugins) {
    if (Array.isArray(plugins)) {
      plugins = plugins.reduce(function (memo, plugin) {
        memo[plugin.type] || (memo[plugin.type] = []);
        memo[plugin.type].push(plugin);
        return memo;
      }, {});
    }
    return plugins;
  };

  Loader.prototype.removeDups = function removeDups(list) {
    var groupUp = function groupUp(plugins, plugin) {
      plugins[plugin.prototype.name] && delete plugins[plugin.prototype.name];
      plugins[plugin.prototype.name] = plugin;
      return plugins;
    };
    var pluginsMap = list.reduceRight(groupUp, (0, _create2.default)(null));

    var plugins = [];
    for (var key in pluginsMap) {
      plugins.unshift(pluginsMap[key]);
    }return plugins;
  };

  /**
   * adds all the external plugins that were passed through `options.plugins`
   * @method addExternalPlugins
   * @private
   * @param {Object} plugins the config object with all plugins
   */


  Loader.prototype.addExternalPlugins = function addExternalPlugins(plugins) {
    plugins = this.groupPluginsByType(plugins);
    if (plugins.playback) this.playbackPlugins = this.removeDups(plugins.playback.concat(this.playbackPlugins));

    if (plugins.container) this.containerPlugins = this.removeDups(plugins.container.concat(this.containerPlugins));

    if (plugins.core) this.corePlugins = this.removeDups(plugins.core.concat(this.corePlugins));

    _player_info2.default.getInstance(this.playerId).playbackPlugins = this.playbackPlugins;
  };

  /**
   * validate if the external plugins that were passed through `options.plugins` are associated to the correct type
   * @method validateExternalPluginsType
   * @private
   * @param {Object} plugins the config object with all plugins
   */


  Loader.prototype.validateExternalPluginsType = function validateExternalPluginsType(plugins) {
    var plugintypes = ['playback', 'container', 'core'];
    plugintypes.forEach(function (type) {
      (plugins[type] || []).forEach(function (el) {
        var errorMessage = 'external ' + el.type + ' plugin on ' + type + ' array';
        if (el.type !== type) throw new ReferenceError(errorMessage);
      });
    });
  };

  return Loader;
}(_base_object2.default);

/* Core Plugins */


/* Container Plugins */


exports.default = Loader;
module.exports = exports['default'];

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = __webpack_require__(79);

var _from2 = _interopRequireDefault(_from);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _toConsumableArray2 = __webpack_require__(163);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = __webpack_require__(31);

var _keys2 = _interopRequireDefault(_keys);

var _utils = __webpack_require__(5);

var _playback = __webpack_require__(12);

var _playback2 = _interopRequireDefault(_playback);

var _browser = __webpack_require__(24);

var _browser2 = _interopRequireDefault(_browser);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _clapprZepto = __webpack_require__(6);

var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

var _template = __webpack_require__(10);

var _template2 = _interopRequireDefault(_template);

var _tracks = __webpack_require__(164);

var _tracks2 = _interopRequireDefault(_tracks);

__webpack_require__(165);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var MIMETYPES = {
  'mp4': ['avc1.42E01E', 'avc1.58A01E', 'avc1.4D401E', 'avc1.64001E', 'mp4v.20.8', 'mp4v.20.240', 'mp4a.40.2'].map(function (codec) {
    return 'video/mp4; codecs="' + codec + ', mp4a.40.2"';
  }),
  'ogg': ['video/ogg; codecs="theora, vorbis"', 'video/ogg; codecs="dirac"', 'video/ogg; codecs="theora, speex"'],
  '3gpp': ['video/3gpp; codecs="mp4v.20.8, samr"'],
  'webm': ['video/webm; codecs="vp8, vorbis"'],
  'mkv': ['video/x-matroska; codecs="theora, vorbis"'],
  'm3u8': ['application/x-mpegurl']
};
MIMETYPES['ogv'] = MIMETYPES['ogg'];
MIMETYPES['3gp'] = MIMETYPES['3gpp'];

var AUDIO_MIMETYPES = {
  'wav': ['audio/wav'],
  'mp3': ['audio/mp3', 'audio/mpeg;codecs="mp3"'],
  'aac': ['audio/mp4;codecs="mp4a.40.5"'],
  'oga': ['audio/ogg']
};

var KNOWN_AUDIO_MIMETYPES = (0, _keys2.default)(AUDIO_MIMETYPES).reduce(function (acc, k) {
  return [].concat((0, _toConsumableArray3.default)(acc), (0, _toConsumableArray3.default)(AUDIO_MIMETYPES[k]));
}, []);

// TODO: rename this Playback to HTML5Playback (breaking change, only after 0.3.0)

var HTML5Video = function (_Playback) {
  (0, _inherits3.default)(HTML5Video, _Playback);
  (0, _createClass3.default)(HTML5Video, [{
    key: 'name',
    get: function get() {
      return 'html5_video';
    }
  }, {
    key: 'tagName',
    get: function get() {
      return this.isAudioOnly ? 'audio' : 'video';
    }
  }, {
    key: 'isAudioOnly',
    get: function get() {
      var resourceUrl = this.options.src;
      var mimeTypes = HTML5Video._mimeTypesForUrl(resourceUrl, AUDIO_MIMETYPES, this.options.mimeType);
      return this.options.playback && this.options.playback.audioOnly || this.options.audioOnly || KNOWN_AUDIO_MIMETYPES.indexOf(mimeTypes[0]) >= 0;
    }
  }, {
    key: 'attributes',
    get: function get() {
      return {
        'data-html5-video': ''
      };
    }
  }, {
    key: 'events',
    get: function get() {
      return {
        'canplay': '_onCanPlay',
        'canplaythrough': '_handleBufferingEvents',
        'durationchange': '_onDurationChange',
        'ended': '_onEnded',
        'error': '_onError',
        'loadeddata': '_onLoadedData',
        'loadedmetadata': '_onLoadedMetadata',
        'pause': '_onPause',
        'playing': '_onPlaying',
        'progress': '_onProgress',
        'seeking': '_handleBufferingEvents',
        'seeked': '_onSeeked',
        'stalled': '_handleBufferingEvents',
        'timeupdate': '_onTimeUpdate',
        'waiting': '_onWaiting'
      };
    }

    /**
     * Determine if the playback has ended.
     * @property ended
     * @type Boolean
     */

  }, {
    key: 'ended',
    get: function get() {
      return this.el.ended;
    }

    /**
     * Determine if the playback is having to buffer in order for
     * playback to be smooth.
     * This is related to the PLAYBACK_BUFFERING and PLAYBACK_BUFFERFULL events
     * @property buffering
     * @type Boolean
     */

  }, {
    key: 'buffering',
    get: function get() {
      return this._isBuffering;
    }
  }]);

  function HTML5Video() {
    (0, _classCallCheck3.default)(this, HTML5Video);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, _Playback.call.apply(_Playback, [this].concat(args)));

    _this._destroyed = false;
    _this._loadStarted = false;
    _this._isBuffering = false;
    _this._playheadMoving = false;
    _this._playheadMovingTimer = null;
    _this._stopped = false;
    _this._ccTrackId = -1;
    _this._setupSrc(_this.options.src);
    // backwards compatibility (TODO: remove on 0.3.0)
    _this.options.playback || (_this.options.playback = _this.options || {});
    _this.options.playback.disableContextMenu = _this.options.playback.disableContextMenu || _this.options.disableVideoTagContextMenu;

    var playbackConfig = _this.options.playback;
    var preload = playbackConfig.preload || (_browser2.default.isSafari ? 'auto' : _this.options.preload);

    var posterUrl = void 0; // FIXME: poster plugin should always convert poster to object with expected properties ?
    if (_this.options.poster) {
      if (typeof _this.options.poster === 'string') posterUrl = _this.options.poster;else if (typeof _this.options.poster.url === 'string') posterUrl = _this.options.poster.url;
    }

    _clapprZepto2.default.extend(_this.el, {
      muted: _this.options.mute,
      defaultMuted: _this.options.mute,
      loop: _this.options.loop,
      poster: posterUrl,
      preload: preload || 'metadata',
      controls: (playbackConfig.controls || _this.options.useVideoTagDefaultControls) && 'controls',
      crossOrigin: playbackConfig.crossOrigin,
      'x-webkit-playsinline': playbackConfig.playInline
    });

    playbackConfig.playInline && _this.$el.attr({ playsinline: 'playsinline' });
    playbackConfig.crossOrigin && _this.$el.attr({ crossorigin: playbackConfig.crossOrigin });

    // TODO should settings be private?
    _this.settings = { default: ['seekbar'] };
    _this.settings.left = ['playpause', 'position', 'duration'];
    _this.settings.right = ['fullscreen', 'volume', 'hd-indicator'];

    playbackConfig.externalTracks && _this._setupExternalTracks(playbackConfig.externalTracks);

    // https://github.com/clappr/clappr/issues/1076
    _this.options.autoPlay && process.nextTick(function () {
      return !_this._destroyed && _this.play();
    });
    return _this;
  }

  HTML5Video.prototype._setupExternalTracks = function _setupExternalTracks(tracks) {
    this._externalTracks = tracks.map(function (track) {
      return {
        kind: track.kind || 'subtitles', // Default is 'subtitles'
        label: track.label,
        lang: track.lang,
        src: track.src
      };
    });
  };

  /**
   * Sets the source url on the <video> element, and also the 'src' property.
   * @method setupSrc
   * @private
   * @param {String} srcUrl The source URL.
   */


  HTML5Video.prototype._setupSrc = function _setupSrc(srcUrl) {
    if (this.el.src === srcUrl) return;

    this._ccIsSetup = false;
    this.el.src = srcUrl;
    this._src = this.el.src;
  };

  HTML5Video.prototype._onLoadedMetadata = function _onLoadedMetadata(e) {
    this._handleBufferingEvents();
    this.trigger(_events2.default.PLAYBACK_LOADEDMETADATA, { duration: e.target.duration, data: e });
    this._updateSettings();
    var autoSeekFromUrl = typeof this._options.autoSeekFromUrl === 'undefined' || this._options.autoSeekFromUrl;
    if (this.getPlaybackType() !== _playback2.default.LIVE && autoSeekFromUrl) this._checkInitialSeek();
  };

  HTML5Video.prototype._onDurationChange = function _onDurationChange() {
    this._updateSettings();
    this._onTimeUpdate();
    // onProgress uses the duration
    this._onProgress();
  };

  HTML5Video.prototype._updateSettings = function _updateSettings() {
    // we can't figure out if hls resource is VoD or not until it is being loaded or duration has changed.
    // that's why we check it again and update media control accordingly.
    if (this.getPlaybackType() === _playback2.default.VOD || this.getPlaybackType() === _playback2.default.AOD) this.settings.left = ['playpause', 'position', 'duration'];else this.settings.left = ['playstop'];

    this.settings.seekEnabled = this.isSeekEnabled();
    this.trigger(_events2.default.PLAYBACK_SETTINGSUPDATE);
  };

  HTML5Video.prototype.isSeekEnabled = function isSeekEnabled() {
    return isFinite(this.getDuration());
  };

  HTML5Video.prototype.getPlaybackType = function getPlaybackType() {
    var onDemandType = this.tagName === 'audio' ? _playback2.default.AOD : _playback2.default.VOD;
    return [0, undefined, Infinity].indexOf(this.el.duration) >= 0 ? _playback2.default.LIVE : onDemandType;
  };

  HTML5Video.prototype.isHighDefinitionInUse = function isHighDefinitionInUse() {
    return false;
  };

  // On mobile device, HTML5 video element "retains" user action consent if
  // load() method is called. See Player.consent().


  HTML5Video.prototype.consent = function consent() {
    !this.isPlaying() && this.el.load();
  };

  HTML5Video.prototype.play = function play() {
    this.trigger(_events2.default.PLAYBACK_PLAY_INTENT);
    this._stopped = false;
    this._setupSrc(this._src);
    this._handleBufferingEvents();
    var promise = this.el.play();
    // For more details, see https://developers.google.com/web/updates/2016/03/play-returns-promise
    if (promise && promise.catch) promise.catch(function () {});
  };

  HTML5Video.prototype.pause = function pause() {
    this.el.pause();
  };

  HTML5Video.prototype.stop = function stop() {
    this.pause();
    this._stopped = true;
    // src will be added again in play()
    this.el.removeAttribute('src');
    this._stopPlayheadMovingChecks();
    this._handleBufferingEvents();
    this.trigger(_events2.default.PLAYBACK_STOP);
  };

  HTML5Video.prototype.volume = function volume(value) {
    if (value === 0) {
      this.$el.attr({ muted: 'true' });
      this.el.muted = true;
    } else {
      this.$el.attr({ muted: null });
      this.el.muted = false;
    }
    this.el.volume = value / 100;
  };

  /**
   * @deprecated
   * @private
   */


  HTML5Video.prototype.mute = function mute() {
    this.el.muted = true;
  };

  /**
   * @deprecated
   * @private
   */


  HTML5Video.prototype.unmute = function unmute() {
    this.el.muted = false;
  };

  HTML5Video.prototype.isMuted = function isMuted() {
    return !!this.el.volume;
  };

  HTML5Video.prototype.isPlaying = function isPlaying() {
    return !this.el.paused && !this.el.ended;
  };

  HTML5Video.prototype._startPlayheadMovingChecks = function _startPlayheadMovingChecks() {
    if (this._playheadMovingTimer !== null) return;

    this._playheadMovingTimeOnCheck = null;
    this._determineIfPlayheadMoving();
    this._playheadMovingTimer = setInterval(this._determineIfPlayheadMoving.bind(this), 500);
  };

  HTML5Video.prototype._stopPlayheadMovingChecks = function _stopPlayheadMovingChecks() {
    if (this._playheadMovingTimer === null) return;

    clearInterval(this._playheadMovingTimer);
    this._playheadMovingTimer = null;
    this._playheadMoving = false;
  };

  HTML5Video.prototype._determineIfPlayheadMoving = function _determineIfPlayheadMoving() {
    var before = this._playheadMovingTimeOnCheck;
    var now = this.el.currentTime;
    this._playheadMoving = before !== now;
    this._playheadMovingTimeOnCheck = now;
    this._handleBufferingEvents();
  };

  // this seems to happen when the user is having to wait
  // for something to happen AFTER A USER INTERACTION
  // e.g the player might be buffering, but when `play()` is called
  // only at this point will this be called.
  // Or the user may seek somewhere but the new area requires buffering,
  // so it will fire then as well.
  // On devices where playing is blocked until requested with a user action,
  // buffering may start, but never finish until the user initiates a play,
  // but this only happens when play is actually requested


  HTML5Video.prototype._onWaiting = function _onWaiting() {
    this._loadStarted = true;
    this._handleBufferingEvents();
  };

  // called after the first frame has loaded
  // note this doesn't fire on ios before the user has requested play
  // ideally the "loadstart" event would be used instead, but this fires
  // before a user has requested play on iOS, and also this is always fired
  // even if the preload setting is "none". In both these cases this causes
  // infinite buffering until the user does something which isn't great.


  HTML5Video.prototype._onLoadedData = function _onLoadedData() {
    this._loadStarted = true;
    this._handleBufferingEvents();
  };

  // note this doesn't fire on ios before user has requested play


  HTML5Video.prototype._onCanPlay = function _onCanPlay() {
    this._handleBufferingEvents();
  };

  HTML5Video.prototype._onPlaying = function _onPlaying() {
    this._checkForClosedCaptions();
    this._startPlayheadMovingChecks();
    this._handleBufferingEvents();
    this.trigger(_events2.default.PLAYBACK_PLAY);
  };

  HTML5Video.prototype._onPause = function _onPause() {
    this._stopPlayheadMovingChecks();
    this._handleBufferingEvents();
    this.trigger(_events2.default.PLAYBACK_PAUSE);
  };

  HTML5Video.prototype._onSeeked = function _onSeeked() {
    this._handleBufferingEvents();
    this.trigger(_events2.default.PLAYBACK_SEEKED);
  };

  HTML5Video.prototype._onEnded = function _onEnded() {
    this._handleBufferingEvents();
    this.trigger(_events2.default.PLAYBACK_ENDED, this.name);
  };

  // The playback should be classed as buffering if the following are true:
  // - the ready state is less then HAVE_FUTURE_DATA or the playhead isn't moving and it should be
  // - the media hasn't "ended",
  // - the media hasn't been stopped
  // - loading has started


  HTML5Video.prototype._handleBufferingEvents = function _handleBufferingEvents() {
    var playheadShouldBeMoving = !this.el.ended && !this.el.paused;
    var buffering = this._loadStarted && !this.el.ended && !this._stopped && (playheadShouldBeMoving && !this._playheadMoving || this.el.readyState < this.el.HAVE_FUTURE_DATA);
    if (this._isBuffering !== buffering) {
      this._isBuffering = buffering;
      if (buffering) this.trigger(_events2.default.PLAYBACK_BUFFERING, this.name);else this.trigger(_events2.default.PLAYBACK_BUFFERFULL, this.name);
    }
  };

  HTML5Video.prototype._onError = function _onError() {
    this.trigger(_events2.default.PLAYBACK_ERROR, this.el.error, this.name);
  };

  HTML5Video.prototype.destroy = function destroy() {
    this._destroyed = true;
    this.handleTextTrackChange && this.el.textTracks.removeEventListener('change', this.handleTextTrackChange);
    this.$el.remove();
    this.el.src = '';
    this._src = null;
    _utils.DomRecycler.garbage(this.$el);
  };

  HTML5Video.prototype.seek = function seek(time) {
    this.el.currentTime = time;
  };

  HTML5Video.prototype.seekPercentage = function seekPercentage(percentage) {
    var time = this.el.duration * (percentage / 100);
    this.seek(time);
  };

  HTML5Video.prototype._checkInitialSeek = function _checkInitialSeek() {
    var seekTime = (0, _utils.seekStringToSeconds)();
    if (seekTime !== 0) this.seek(seekTime);
  };

  HTML5Video.prototype.getCurrentTime = function getCurrentTime() {
    return this.el.currentTime;
  };

  HTML5Video.prototype.getDuration = function getDuration() {
    return this.el.duration;
  };

  HTML5Video.prototype._onTimeUpdate = function _onTimeUpdate() {
    if (this.getPlaybackType() === _playback2.default.LIVE) this.trigger(_events2.default.PLAYBACK_TIMEUPDATE, { current: 1, total: 1 }, this.name);else this.trigger(_events2.default.PLAYBACK_TIMEUPDATE, { current: this.el.currentTime, total: this.el.duration }, this.name);
  };

  HTML5Video.prototype._onProgress = function _onProgress() {
    if (!this.el.buffered.length) return;

    var buffered = [];
    var bufferedPos = 0;
    for (var i = 0; i < this.el.buffered.length; i++) {
      buffered = [].concat((0, _toConsumableArray3.default)(buffered), [{ start: this.el.buffered.start(i), end: this.el.buffered.end(i) }]);
      if (this.el.currentTime >= buffered[i].start && this.el.currentTime <= buffered[i].end) bufferedPos = i;
    }
    var progress = {
      start: buffered[bufferedPos].start,
      current: buffered[bufferedPos].end,
      total: this.el.duration
    };
    this.trigger(_events2.default.PLAYBACK_PROGRESS, progress, buffered);
  };

  HTML5Video.prototype._typeFor = function _typeFor(src) {
    var mimeTypes = HTML5Video._mimeTypesForUrl(src, MIMETYPES, this.options.mimeType);
    if (mimeTypes.length === 0) mimeTypes = HTML5Video._mimeTypesForUrl(src, AUDIO_MIMETYPES, this.options.mimeType);

    var mimeType = mimeTypes[0] || '';
    return mimeType.split(';')[0];
  };

  HTML5Video.prototype._ready = function _ready() {
    if (this._isReadyState) return;

    this._isReadyState = true;
    this.trigger(_events2.default.PLAYBACK_READY, this.name);
  };

  HTML5Video.prototype._checkForClosedCaptions = function _checkForClosedCaptions() {
    // Check if CC available only if current playback is HTML5Video
    if (this.isHTML5Video && !this._ccIsSetup) {
      if (this.hasClosedCaptionsTracks) {
        this.trigger(_events2.default.PLAYBACK_SUBTITLE_AVAILABLE);
        var trackId = this.closedCaptionsTrackId;
        this.closedCaptionsTrackId = trackId;
        this.handleTextTrackChange = this._handleTextTrackChange.bind(this);
        this.el.textTracks.addEventListener('change', this.handleTextTrackChange);
      }
      this._ccIsSetup = true;
    }
  };

  HTML5Video.prototype._handleTextTrackChange = function _handleTextTrackChange() {
    var tracks = this.closedCaptionsTracks;
    var track = tracks.find(function (track) {
      return track.track.mode === 'showing';
    }) || { id: -1 };

    if (this._ccTrackId !== track.id) {
      this._ccTrackId = track.id;
      this.trigger(_events2.default.PLAYBACK_SUBTITLE_CHANGED, {
        id: track.id
      });
    }
  };

  HTML5Video.prototype.render = function render() {
    if (this.options.playback.disableContextMenu) {
      this.$el.on('contextmenu', function () {
        return false;
      });
    }

    if (this._externalTracks && this._externalTracks.length > 0) {
      this.$el.html(this.template({
        tracks: this._externalTracks
      }));
    }

    this._ready();
    return this;
  };

  (0, _createClass3.default)(HTML5Video, [{
    key: 'isReady',
    get: function get() {
      return this._isReadyState;
    }
  }, {
    key: 'isHTML5Video',
    get: function get() {
      return this.name === HTML5Video.prototype.name;
    }
  }, {
    key: 'closedCaptionsTracks',
    get: function get() {
      var id = 0;
      var trackId = function trackId() {
        return id++;
      };
      var textTracks = this.el.textTracks ? (0, _from2.default)(this.el.textTracks) : [];

      return textTracks.filter(function (track) {
        return track.kind === 'subtitles' || track.kind === 'captions';
      }).map(function (track) {
        return { id: trackId(), name: track.label, track: track };
      });
    }
  }, {
    key: 'closedCaptionsTrackId',
    get: function get() {
      return this._ccTrackId;
    },
    set: function set(trackId) {
      if (!(0, _utils.isNumber)(trackId)) return;

      var tracks = this.closedCaptionsTracks;
      var showingTrack = void 0;

      // Note: -1 is for hide all tracks
      if (trackId !== -1) {
        showingTrack = tracks.find(function (track) {
          return track.id === trackId;
        });
        if (!showingTrack) return; // Track id not found

        if (showingTrack.track.mode === 'showing') return; // Track already showing
      }

      // Since it is possible to display multiple tracks,
      // ensure that all tracks are hidden.
      tracks.filter(function (track) {
        return track.track.mode !== 'hidden';
      }).forEach(function (track) {
        return track.track.mode = 'hidden';
      });

      showingTrack && (showingTrack.track.mode = 'showing');

      this._ccTrackId = trackId;
      this.trigger(_events2.default.PLAYBACK_SUBTITLE_CHANGED, {
        id: trackId
      });
    }
  }, {
    key: 'template',
    get: function get() {
      return (0, _template2.default)(_tracks2.default);
    }
  }]);
  return HTML5Video;
}(_playback2.default);

exports.default = HTML5Video;


HTML5Video._mimeTypesForUrl = function (resourceUrl, mimeTypesByExtension, mimeType) {
  var extension = (resourceUrl.split('?')[0].match(/.*\.(.*)$/) || [])[1];
  var mimeTypes = mimeType || extension && mimeTypesByExtension[extension.toLowerCase()] || [];
  return mimeTypes.constructor === Array ? mimeTypes : [mimeTypes];
};

HTML5Video._canPlay = function (type, mimeTypesByExtension, resourceUrl, mimeType) {
  var mimeTypes = HTML5Video._mimeTypesForUrl(resourceUrl, mimeTypesByExtension, mimeType);
  var media = document.createElement(type);
  return !!mimeTypes.filter(function (mediaType) {
    return !!media.canPlayType(mediaType).replace(/no/, '');
  })[0];
};

HTML5Video.canPlay = function (resourceUrl, mimeType) {
  return HTML5Video._canPlay('audio', AUDIO_MIMETYPES, resourceUrl, mimeType) || HTML5Video._canPlay('video', MIMETYPES, resourceUrl, mimeType);
};
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(55)))

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(64);
__webpack_require__(156);
module.exports = __webpack_require__(8).Array.from;

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(45)
  , $export        = __webpack_require__(18)
  , toObject       = __webpack_require__(38)
  , call           = __webpack_require__(157)
  , isArrayIter    = __webpack_require__(158)
  , toLength       = __webpack_require__(60)
  , createProperty = __webpack_require__(159)
  , getIterFn      = __webpack_require__(160);

$export($export.S + $export.F * !__webpack_require__(162)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(23);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(29)
  , ITERATOR   = __webpack_require__(11)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(15)
  , createDesc      = __webpack_require__(28);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(161)
  , ITERATOR  = __webpack_require__(11)('iterator')
  , Iterators = __webpack_require__(29);
module.exports = __webpack_require__(8).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(40)
  , TAG = __webpack_require__(11)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(11)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(79);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 164 */
/***/ (function(module, exports) {

module.exports = "<% for (var i = 0; i < tracks.length; i++) { %>\n  <track data-html5-video-track=\"<%= i %>\" kind=\"<%= tracks[i].kind %>\" label=\"<%= tracks[i].label %>\" srclang=\"<%= tracks[i].lang %>\" src=\"<%= tracks[i].src %>\" />\n<% }; %>\n";

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(166);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"singleton":true,"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./style.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, "[data-html5-video] {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  display: block; }\n", ""]);

// exports


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _playback = __webpack_require__(12);

var _playback2 = _interopRequireDefault(_playback);

var _html5_video = __webpack_require__(58);

var _html5_video2 = _interopRequireDefault(_html5_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: remove this playback and change HTML5Video to HTML5Playback (breaking change, only after 0.3.0)
var HTML5Audio = function (_HTML5Video) {
  (0, _inherits3.default)(HTML5Audio, _HTML5Video);

  function HTML5Audio() {
    (0, _classCallCheck3.default)(this, HTML5Audio);
    return (0, _possibleConstructorReturn3.default)(this, _HTML5Video.apply(this, arguments));
  }

  HTML5Audio.prototype.updateSettings = function updateSettings() {
    this.settings.left = ['playpause', 'position', 'duration'];
    this.settings.seekEnabled = this.isSeekEnabled();
    this.trigger(_events2.default.PLAYBACK_SETTINGSUPDATE);
  };

  HTML5Audio.prototype.getPlaybackType = function getPlaybackType() {
    return _playback2.default.AOD;
  };

  (0, _createClass3.default)(HTML5Audio, [{
    key: 'name',
    get: function get() {
      return 'html5_audio';
    }
  }, {
    key: 'tagName',
    get: function get() {
      return 'audio';
    }
  }, {
    key: 'isAudioOnly',
    get: function get() {
      return true;
    }
  }]);
  return HTML5Audio;
}(_html5_video2.default); // Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

exports.default = HTML5Audio;


HTML5Audio.canPlay = function (resourceUrl, mimeType) {
  var mimetypes = {
    'wav': ['audio/wav'],
    'mp3': ['audio/mp3', 'audio/mpeg;codecs="mp3"'],
    'aac': ['audio/mp4;codecs="mp4a.40.5"'],
    'oga': ['audio/ogg']
  };
  return _html5_video2.default._canPlay('audio', mimetypes, resourceUrl, mimeType);
};
module.exports = exports['default'];

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _playback = __webpack_require__(12);

var _playback2 = _interopRequireDefault(_playback);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

__webpack_require__(169);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HTMLImg = function (_Playback) {
  (0, _inherits3.default)(HTMLImg, _Playback);

  HTMLImg.prototype.getPlaybackType = function getPlaybackType() {
    return _playback2.default.NO_OP;
  };

  (0, _createClass3.default)(HTMLImg, [{
    key: 'name',
    get: function get() {
      return 'html_img';
    }
  }, {
    key: 'tagName',
    get: function get() {
      return 'img';
    }
  }, {
    key: 'attributes',
    get: function get() {
      return {
        'data-html-img': ''
      };
    }
  }, {
    key: 'events',
    get: function get() {
      return {
        'load': '_onLoad',
        'abort': '_onError',
        'error': '_onError'
      };
    }
  }]);

  function HTMLImg(params) {
    (0, _classCallCheck3.default)(this, HTMLImg);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Playback.call(this, params));

    _this.el.src = params.src;
    return _this;
  }

  HTMLImg.prototype.render = function render() {
    this.trigger(_events2.default.PLAYBACK_READY, this.name);
    return this;
  };

  HTMLImg.prototype._onLoad = function _onLoad() {
    this.trigger(_events2.default.PLAYBACK_ENDED, this.name);
  };

  HTMLImg.prototype._onError = function _onError(evt) {
    var m = evt.type === 'error' ? 'load error' : 'loading aborted';
    this.trigger(_events2.default.PLAYBACK_ERROR, { message: m }, this.name);
  };

  return HTMLImg;
}(_playback2.default); // Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

exports.default = HTMLImg;


HTMLImg.canPlay = function (resource) {
  return (/\.(png|jpg|jpeg|gif|bmp|tiff|pgm|pnm|webp)(|\?.*)$/i.test(resource)
  );
};
module.exports = exports['default'];

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(170);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"singleton":true,"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./style.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, "[data-html-img] {\n  max-width: 100%;\n  max-height: 100%; }\n", ""]);

// exports


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = __webpack_require__(5);

var _playback = __webpack_require__(12);

var _playback2 = _interopRequireDefault(_playback);

var _template = __webpack_require__(10);

var _template2 = _interopRequireDefault(_template);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _error = __webpack_require__(172);

var _error2 = _interopRequireDefault(_error);

__webpack_require__(173);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NoOp = function (_Playback) {
  (0, _inherits3.default)(NoOp, _Playback);
  (0, _createClass3.default)(NoOp, [{
    key: 'name',
    get: function get() {
      return 'no_op';
    }
  }, {
    key: 'template',
    get: function get() {
      return (0, _template2.default)(_error2.default);
    }
  }, {
    key: 'attributes',
    get: function get() {
      return { 'data-no-op': '' };
    }
  }]);

  function NoOp() {
    (0, _classCallCheck3.default)(this, NoOp);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, _Playback.call.apply(_Playback, [this].concat(args)));

    _this._noiseFrameNum = -1;
    _this._started = false;
    return _this;
  }

  NoOp.prototype.render = function render() {
    var playbackNotSupported = this.options.playbackNotSupportedMessage || this.i18n.t('playback_not_supported');
    this.$el.html(this.template({ message: playbackNotSupported }));
    this.trigger(_events2.default.PLAYBACK_READY, this.name);
    var showForNoOp = !!(this.options.poster && this.options.poster.showForNoOp);
    if (this.options.autoPlay || !showForNoOp) this.play();

    return this;
  };

  NoOp.prototype.play = function play() {
    if (!this._started) {
      this._started = true;
      this.trigger(_events2.default.PLAYBACK_PLAY);
      this._animate();
    }
  };

  NoOp.prototype._noise = function _noise() {
    this._noiseFrameNum = (this._noiseFrameNum + 1) % 5;
    if (this._noiseFrameNum) {
      // only update noise every 5 frames to save cpu
      return;
    }

    var idata = this.context.createImageData(this.context.canvas.width, this.context.canvas.height);
    var buffer32 = void 0;
    try {
      buffer32 = new Uint32Array(idata.data.buffer);
    } catch (err) {
      buffer32 = new Uint32Array(this.context.canvas.width * this.context.canvas.height * 4);
      var data = idata.data;
      for (var i = 0; i < data.length; i++) {
        buffer32[i] = data[i];
      }
    }

    var len = buffer32.length,
        m = Math.random() * 6 + 4;
    var run = 0,
        color = 0;
    for (var _i = 0; _i < len;) {
      if (run < 0) {
        run = m * Math.random();
        var p = Math.pow(Math.random(), 0.4);
        color = 255 * p << 24;
      }
      run -= 1;
      buffer32[_i++] = color;
    }
    this.context.putImageData(idata, 0, 0);
  };

  NoOp.prototype._loop = function _loop() {
    var _this2 = this;

    if (this._stop) return;

    this._noise();
    this._animationHandle = (0, _utils.requestAnimationFrame)(function () {
      return _this2._loop();
    });
  };

  NoOp.prototype.destroy = function destroy() {
    if (this._animationHandle) {
      (0, _utils.cancelAnimationFrame)(this._animationHandle);
      this._stop = true;
    }
  };

  NoOp.prototype._animate = function _animate() {
    this.canvas = this.$el.find('canvas[data-no-op-canvas]')[0];
    this.context = this.canvas.getContext('2d');
    this._loop();
  };

  return NoOp;
}(_playback2.default);

exports.default = NoOp;


NoOp.canPlay = function (source) {
  // eslint-disable-line no-unused-vars
  return true;
};
module.exports = exports['default'];

/***/ }),
/* 172 */
/***/ (function(module, exports) {

module.exports = "<canvas data-no-op-canvas></canvas>\n<p data-no-op-msg><%=message%><p>\n";

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(174);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"singleton":true,"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./style.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, "[data-no-op] {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  text-align: center; }\n\n[data-no-op] p[data-no-op-msg] {\n  position: absolute;\n  text-align: center;\n  font-size: 25px;\n  left: 0;\n  right: 0;\n  color: white;\n  padding: 10px;\n  /* center vertically */\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  max-height: 100%;\n  overflow: auto; }\n\n[data-no-op] canvas[data-no-op-canvas] {\n  background-color: #777;\n  height: 100%;\n  width: 100%; }\n", ""]);

// exports


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _spinner_three_bounce = __webpack_require__(176);

var _spinner_three_bounce2 = _interopRequireDefault(_spinner_three_bounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _spinner_three_bounce2.default;
module.exports = exports['default'];

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _ui_container_plugin = __webpack_require__(35);

var _ui_container_plugin2 = _interopRequireDefault(_ui_container_plugin);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _template = __webpack_require__(10);

var _template2 = _interopRequireDefault(_template);

var _spinner = __webpack_require__(177);

var _spinner2 = _interopRequireDefault(_spinner);

__webpack_require__(178);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SpinnerThreeBouncePlugin = function (_UIContainerPlugin) {
  (0, _inherits3.default)(SpinnerThreeBouncePlugin, _UIContainerPlugin);
  (0, _createClass3.default)(SpinnerThreeBouncePlugin, [{
    key: 'name',
    get: function get() {
      return 'spinner';
    }
  }, {
    key: 'attributes',
    get: function get() {
      return {
        'data-spinner': '',
        'class': 'spinner-three-bounce'
      };
    }
  }]);

  function SpinnerThreeBouncePlugin(container) {
    (0, _classCallCheck3.default)(this, SpinnerThreeBouncePlugin);

    var _this = (0, _possibleConstructorReturn3.default)(this, _UIContainerPlugin.call(this, container));

    _this.template = (0, _template2.default)(_spinner2.default);
    _this.showTimeout = null;
    _this.listenTo(_this.container, _events2.default.CONTAINER_STATE_BUFFERING, _this.onBuffering);
    _this.listenTo(_this.container, _events2.default.CONTAINER_STATE_BUFFERFULL, _this.onBufferFull);
    _this.listenTo(_this.container, _events2.default.CONTAINER_STOP, _this.onStop);
    _this.listenTo(_this.container, _events2.default.CONTAINER_ENDED, _this.onStop);
    _this.listenTo(_this.container, _events2.default.CONTAINER_ERROR, _this.onStop);
    _this.render();
    return _this;
  }

  SpinnerThreeBouncePlugin.prototype.onBuffering = function onBuffering() {
    this.show();
  };

  SpinnerThreeBouncePlugin.prototype.onBufferFull = function onBufferFull() {
    this.hide();
  };

  SpinnerThreeBouncePlugin.prototype.onStop = function onStop() {
    this.hide();
  };

  SpinnerThreeBouncePlugin.prototype.show = function show() {
    var _this2 = this;

    if (this.showTimeout === null) this.showTimeout = setTimeout(function () {
      return _this2.$el.show();
    }, 300);
  };

  SpinnerThreeBouncePlugin.prototype.hide = function hide() {
    if (this.showTimeout !== null) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
    this.$el.hide();
  };

  SpinnerThreeBouncePlugin.prototype.render = function render() {
    this.$el.html(this.template());
    this.container.$el.append(this.$el);
    this.$el.hide();
    if (this.container.buffering) this.onBuffering();

    return this;
  };

  return SpinnerThreeBouncePlugin;
}(_ui_container_plugin2.default); // Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

exports.default = SpinnerThreeBouncePlugin;
module.exports = exports['default'];

/***/ }),
/* 177 */
/***/ (function(module, exports) {

module.exports = "<div data-bounce1></div><div data-bounce2></div><div data-bounce3></div>\n";

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(179);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"singleton":true,"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./spinner.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./spinner.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, ".spinner-three-bounce[data-spinner] {\n  position: absolute;\n  margin: 0 auto;\n  width: 70px;\n  text-align: center;\n  z-index: 999;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  /* center vertically */\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%); }\n  .spinner-three-bounce[data-spinner] > div {\n    width: 18px;\n    height: 18px;\n    background-color: #FFFFFF;\n    border-radius: 100%;\n    display: inline-block;\n    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;\n            animation: bouncedelay 1.4s infinite ease-in-out;\n    /* Prevent first frame from flickering when animation starts */\n    -webkit-animation-fill-mode: both;\n            animation-fill-mode: both; }\n  .spinner-three-bounce[data-spinner] [data-bounce1] {\n    -webkit-animation-delay: -0.32s;\n            animation-delay: -0.32s; }\n  .spinner-three-bounce[data-spinner] [data-bounce2] {\n    -webkit-animation-delay: -0.16s;\n            animation-delay: -0.16s; }\n\n@-webkit-keyframes bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n            transform: scale(0); }\n  40% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@keyframes bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n            transform: scale(0); }\n  40% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n", ""]);

// exports


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stats = __webpack_require__(181);

var _stats2 = _interopRequireDefault(_stats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _stats2.default;
module.exports = exports['default'];

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _container_plugin = __webpack_require__(36);

var _container_plugin2 = _interopRequireDefault(_container_plugin);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _clapprZepto = __webpack_require__(6);

var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StatsPlugin = function (_ContainerPlugin) {
  (0, _inherits3.default)(StatsPlugin, _ContainerPlugin);
  (0, _createClass3.default)(StatsPlugin, [{
    key: 'name',
    get: function get() {
      return 'stats';
    }
  }]);

  function StatsPlugin(container) {
    (0, _classCallCheck3.default)(this, StatsPlugin);

    var _this = (0, _possibleConstructorReturn3.default)(this, _ContainerPlugin.call(this, container));

    _this.setInitialAttrs();
    _this.reportInterval = _this.options.reportInterval || 5000;
    _this.state = 'IDLE';
    return _this;
  }

  StatsPlugin.prototype.bindEvents = function bindEvents() {
    this.listenTo(this.container.playback, _events2.default.PLAYBACK_PLAY, this.onPlay);
    this.listenTo(this.container, _events2.default.CONTAINER_STOP, this.onStop);
    this.listenTo(this.container, _events2.default.CONTAINER_ENDED, this.onStop);
    this.listenTo(this.container, _events2.default.CONTAINER_DESTROYED, this.onStop);
    this.listenTo(this.container, _events2.default.CONTAINER_STATE_BUFFERING, this.onBuffering);
    this.listenTo(this.container, _events2.default.CONTAINER_STATE_BUFFERFULL, this.onBufferFull);
    this.listenTo(this.container, _events2.default.CONTAINER_STATS_ADD, this.onStatsAdd);
    this.listenTo(this.container, _events2.default.CONTAINER_BITRATE, this.onStatsAdd);
    this.listenTo(this.container.playback, _events2.default.PLAYBACK_STATS_ADD, this.onStatsAdd);
  };

  StatsPlugin.prototype.setInitialAttrs = function setInitialAttrs() {
    this.firstPlay = true;
    this.startupTime = 0;
    this.rebufferingTime = 0;
    this.watchingTime = 0;
    this.rebuffers = 0;
    this.externalMetrics = {};
  };

  StatsPlugin.prototype.onPlay = function onPlay() {
    this.state = 'PLAYING';
    this.watchingTimeInit = Date.now();
    if (!this.intervalId) this.intervalId = setInterval(this.report.bind(this), this.reportInterval);
  };

  StatsPlugin.prototype.onStop = function onStop() {
    clearInterval(this.intervalId);
    this.report();
    this.intervalId = undefined;
    this.state = 'STOPPED';
  };

  StatsPlugin.prototype.onBuffering = function onBuffering() {
    if (this.firstPlay) this.startupTimeInit = Date.now();else this.rebufferingTimeInit = Date.now();

    this.state = 'BUFFERING';
    this.rebuffers++;
  };

  StatsPlugin.prototype.onBufferFull = function onBufferFull() {
    if (this.firstPlay && this.startupTimeInit) {
      this.firstPlay = false;
      this.startupTime = Date.now() - this.startupTimeInit;
      this.watchingTimeInit = Date.now();
    } else if (this.rebufferingTimeInit) {
      this.rebufferingTime += this.getRebufferingTime();
    }

    this.rebufferingTimeInit = undefined;
    this.state = 'PLAYING';
  };

  StatsPlugin.prototype.getRebufferingTime = function getRebufferingTime() {
    return Date.now() - this.rebufferingTimeInit;
  };

  StatsPlugin.prototype.getWatchingTime = function getWatchingTime() {
    var totalTime = Date.now() - this.watchingTimeInit;
    return totalTime - this.rebufferingTime;
  };

  StatsPlugin.prototype.isRebuffering = function isRebuffering() {
    return !!this.rebufferingTimeInit;
  };

  StatsPlugin.prototype.onStatsAdd = function onStatsAdd(metric) {
    _clapprZepto2.default.extend(this.externalMetrics, metric);
  };

  StatsPlugin.prototype.getStats = function getStats() {
    var metrics = {
      startupTime: this.startupTime,
      rebuffers: this.rebuffers,
      rebufferingTime: this.isRebuffering() ? this.rebufferingTime + this.getRebufferingTime() : this.rebufferingTime,
      watchingTime: this.isRebuffering() ? this.getWatchingTime() - this.getRebufferingTime() : this.getWatchingTime()
    };
    _clapprZepto2.default.extend(metrics, this.externalMetrics);
    return metrics;
  };

  StatsPlugin.prototype.report = function report() {
    this.container.statsReport(this.getStats());
  };

  return StatsPlugin;
}(_container_plugin2.default); // Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

exports.default = StatsPlugin;
module.exports = exports['default'];

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _watermark = __webpack_require__(183);

var _watermark2 = _interopRequireDefault(_watermark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _watermark2.default;
module.exports = exports['default'];

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _ui_container_plugin = __webpack_require__(35);

var _ui_container_plugin2 = _interopRequireDefault(_ui_container_plugin);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _template = __webpack_require__(10);

var _template2 = _interopRequireDefault(_template);

var _watermark = __webpack_require__(184);

var _watermark2 = _interopRequireDefault(_watermark);

__webpack_require__(185);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WaterMarkPlugin = function (_UIContainerPlugin) {
  (0, _inherits3.default)(WaterMarkPlugin, _UIContainerPlugin);
  (0, _createClass3.default)(WaterMarkPlugin, [{
    key: 'name',
    get: function get() {
      return 'watermark';
    }
  }, {
    key: 'template',
    get: function get() {
      return (0, _template2.default)(_watermark2.default);
    }
  }]);

  function WaterMarkPlugin(container) {
    (0, _classCallCheck3.default)(this, WaterMarkPlugin);

    var _this = (0, _possibleConstructorReturn3.default)(this, _UIContainerPlugin.call(this, container));

    _this.configure();
    return _this;
  }

  WaterMarkPlugin.prototype.bindEvents = function bindEvents() {
    this.listenTo(this.container, _events2.default.CONTAINER_PLAY, this.onPlay);
    this.listenTo(this.container, _events2.default.CONTAINER_STOP, this.onStop);
    this.listenTo(this.container, _events2.default.CONTAINER_OPTIONS_CHANGE, this.configure);
  };

  WaterMarkPlugin.prototype.configure = function configure() {
    this.position = this.options.position || 'bottom-right';
    if (this.options.watermark) {
      this.imageUrl = this.options.watermark;
      this.imageLink = this.options.watermarkLink;
      this.render();
    } else {
      this.$el.remove();
    }
  };

  WaterMarkPlugin.prototype.onPlay = function onPlay() {
    if (!this.hidden) this.$el.show();
  };

  WaterMarkPlugin.prototype.onStop = function onStop() {
    this.$el.hide();
  };

  WaterMarkPlugin.prototype.render = function render() {
    this.$el.hide();
    var templateOptions = { position: this.position, imageUrl: this.imageUrl, imageLink: this.imageLink };
    this.$el.html(this.template(templateOptions));
    this.container.$el.append(this.$el);
    return this;
  };

  return WaterMarkPlugin;
}(_ui_container_plugin2.default); // Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

exports.default = WaterMarkPlugin;
module.exports = exports['default'];

/***/ }),
/* 184 */
/***/ (function(module, exports) {

module.exports = "<div data-watermark data-watermark-<%=position %>>\n<% if(typeof imageLink !== 'undefined') { %>\n<a target=_blank href=\"<%= imageLink %>\">\n<% } %>\n<img src=\"<%= imageUrl %>\">\n<% if(typeof imageLink !== 'undefined') { %>\n</a>\n<% } %>\n</div>\n";

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(186);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"singleton":true,"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./watermark.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./watermark.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, "[data-watermark] {\n  position: absolute;\n  min-width: 70px;\n  max-width: 200px;\n  width: 12%;\n  text-align: center;\n  z-index: 10; }\n\n[data-watermark] a {\n  outline: none;\n  cursor: pointer; }\n\n[data-watermark] img {\n  max-width: 100%; }\n\n[data-watermark-bottom-left] {\n  bottom: 10px;\n  left: 10px; }\n\n[data-watermark-bottom-right] {\n  bottom: 10px;\n  right: 42px; }\n\n[data-watermark-top-left] {\n  top: 10px;\n  left: 10px; }\n\n[data-watermark-top-right] {\n  top: 10px;\n  right: 37px; }\n", ""]);

// exports


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _ui_container_plugin = __webpack_require__(35);

var _ui_container_plugin2 = _interopRequireDefault(_ui_container_plugin);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _template = __webpack_require__(10);

var _template2 = _interopRequireDefault(_template);

var _playback = __webpack_require__(12);

var _playback2 = _interopRequireDefault(_playback);

var _poster = __webpack_require__(188);

var _poster2 = _interopRequireDefault(_poster);

var _play = __webpack_require__(57);

var _play2 = _interopRequireDefault(_play);

__webpack_require__(189);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PosterPlugin = function (_UIContainerPlugin) {
  (0, _inherits3.default)(PosterPlugin, _UIContainerPlugin);
  (0, _createClass3.default)(PosterPlugin, [{
    key: 'name',
    get: function get() {
      return 'poster';
    }
  }, {
    key: 'template',
    get: function get() {
      return (0, _template2.default)(_poster2.default);
    }
  }, {
    key: 'shouldRender',
    get: function get() {
      var showForNoOp = !!(this.options.poster && this.options.poster.showForNoOp);
      return this.container.playback.name !== 'html_img' && (this.container.playback.getPlaybackType() !== _playback2.default.NO_OP || showForNoOp);
    }
  }, {
    key: 'attributes',
    get: function get() {
      return {
        'class': 'player-poster',
        'data-poster': ''
      };
    }
  }, {
    key: 'events',
    get: function get() {
      return {
        'click': 'clicked'
      };
    }
  }, {
    key: 'showOnVideoEnd',
    get: function get() {
      return !this.options.poster || this.options.poster.showOnVideoEnd || this.options.poster.showOnVideoEnd === undefined;
    }
  }]);

  function PosterPlugin(container) {
    (0, _classCallCheck3.default)(this, PosterPlugin);

    var _this = (0, _possibleConstructorReturn3.default)(this, _UIContainerPlugin.call(this, container));

    _this.hasStartedPlaying = false;
    _this.playRequested = false;
    _this.render();
    process.nextTick(function () {
      return _this.update();
    });
    return _this;
  }

  PosterPlugin.prototype.bindEvents = function bindEvents() {
    this.listenTo(this.container, _events2.default.CONTAINER_STOP, this.onStop);
    this.listenTo(this.container, _events2.default.CONTAINER_PLAY, this.onPlay);
    this.listenTo(this.container, _events2.default.CONTAINER_STATE_BUFFERING, this.update);
    this.listenTo(this.container, _events2.default.CONTAINER_STATE_BUFFERFULL, this.update);
    this.listenTo(this.container, _events2.default.CONTAINER_OPTIONS_CHANGE, this.render);
    this.showOnVideoEnd && this.listenTo(this.container, _events2.default.CONTAINER_ENDED, this.onStop);
  };

  PosterPlugin.prototype.stopListening = function stopListening() {
    _UIContainerPlugin.prototype.stopListening.call(this);
  };

  PosterPlugin.prototype.onPlay = function onPlay() {
    this.hasStartedPlaying = true;
    this.update();
  };

  PosterPlugin.prototype.onStop = function onStop() {
    this.hasStartedPlaying = false;
    this.playRequested = false;
    this.update();
  };

  PosterPlugin.prototype.showPlayButton = function showPlayButton(show) {
    if (show && (!this.options.chromeless || this.options.allowUserInteraction)) {
      this.$playButton.show();
      this.$el.addClass('clickable');
    } else {
      this.$playButton.hide();
      this.$el.removeClass('clickable');
    }
  };

  PosterPlugin.prototype.clicked = function clicked() {
    if (!this.options.chromeless || this.options.allowUserInteraction) {
      this.playRequested = true;
      this.update();
      this.container.play();
    }
    return false;
  };

  PosterPlugin.prototype.shouldHideOnPlay = function shouldHideOnPlay() {
    // Audio broadcasts should keep the poster up; video should hide poster while playing.
    return !this.container.playback.isAudioOnly;
  };

  PosterPlugin.prototype.update = function update() {
    if (!this.shouldRender) return;

    var showPlayButton = !this.playRequested && !this.hasStartedPlaying && !this.container.buffering;
    this.showPlayButton(showPlayButton);
    if (!this.hasStartedPlaying) {
      this.container.disableMediaControl();
      this.$el.show();
    } else {
      this.container.enableMediaControl();
      if (this.shouldHideOnPlay()) this.$el.hide();
    }
  };

  PosterPlugin.prototype.render = function render() {
    if (!this.shouldRender) return;

    this.$el.html(this.template());

    var isRegularPoster = this.options.poster && this.options.poster.custom === undefined;

    if (isRegularPoster) {
      var posterUrl = this.options.poster.url || this.options.poster;
      this.$el.css({ 'background-image': 'url(' + posterUrl + ')' });
    } else if (this.options.poster) {
      this.$el.css({ 'background': this.options.poster.custom });
    }

    this.container.$el.append(this.el);
    this.$playWrapper = this.$el.find('.play-wrapper');
    this.$playWrapper.append(_play2.default);
    this.$playButton = this.$playWrapper.find('svg');
    this.$playButton.addClass('poster-icon');
    this.$playButton.attr('data-poster', '');

    var buttonsColor = this.options.mediacontrol && this.options.mediacontrol.buttons;
    if (buttonsColor) this.$el.find('svg path').css('fill', buttonsColor);

    if (this.options.mediacontrol && this.options.mediacontrol.buttons) {
      buttonsColor = this.options.mediacontrol.buttons;
      this.$playButton.css('color', buttonsColor);
    }
    this.update();
    return this;
  };

  return PosterPlugin;
}(_ui_container_plugin2.default); //Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

exports.default = PosterPlugin;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(55)))

/***/ }),
/* 188 */
/***/ (function(module, exports) {

module.exports = "<div class=\"play-wrapper\" data-poster></div>\n";

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(190);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"singleton":true,"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./poster.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./poster.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, ".player-poster[data-poster] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  z-index: 998;\n  top: 0;\n  left: 0;\n  background-color: #000;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: 50% 50%; }\n  .player-poster[data-poster].clickable {\n    cursor: pointer; }\n  .player-poster[data-poster]:hover .play-wrapper[data-poster] {\n    opacity: 1; }\n  .player-poster[data-poster] .play-wrapper[data-poster] {\n    width: 100%;\n    height: 25%;\n    margin: 0 auto;\n    opacity: 0.75;\n    transition: opacity 0.1s ease; }\n    .player-poster[data-poster] .play-wrapper[data-poster] svg {\n      height: 100%; }\n      .player-poster[data-poster] .play-wrapper[data-poster] svg path {\n        fill: #fff; }\n", ""]);

// exports


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _google_analytics = __webpack_require__(192);

var _google_analytics2 = _interopRequireDefault(_google_analytics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _google_analytics2.default;
module.exports = exports['default'];

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _container_plugin = __webpack_require__(36);

var _container_plugin2 = _interopRequireDefault(_container_plugin);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var GoogleAnalytics = function (_ContainerPlugin) {
  (0, _inherits3.default)(GoogleAnalytics, _ContainerPlugin);
  (0, _createClass3.default)(GoogleAnalytics, [{
    key: 'name',
    get: function get() {
      return 'google_analytics';
    }
  }]);

  function GoogleAnalytics(container) {
    (0, _classCallCheck3.default)(this, GoogleAnalytics);

    var _this = (0, _possibleConstructorReturn3.default)(this, _ContainerPlugin.call(this, container));

    if (_this.container.options.gaAccount) {
      _this.account = _this.container.options.gaAccount;
      _this.trackerName = _this.container.options.gaTrackerName ? _this.container.options.gaTrackerName + '.' : 'Clappr.';
      _this.domainName = _this.container.options.gaDomainName;
      _this.currentHDState = undefined;
      _this.embedScript();
    }
    return _this;
  }

  GoogleAnalytics.prototype.embedScript = function embedScript() {
    var _this2 = this;

    if (!window._gat) {
      var script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('async', 'async');
      script.setAttribute('src', '//www.google-analytics.com/ga.js');
      script.onload = function () {
        return _this2.addEventListeners();
      };
      document.body.appendChild(script);
    } else {
      this.addEventListeners();
    }
  };

  GoogleAnalytics.prototype.addEventListeners = function addEventListeners() {
    var _this3 = this;

    if (this.container) {
      this.listenTo(this.container, _events2.default.CONTAINER_READY, this.onReady);
      this.listenTo(this.container, _events2.default.CONTAINER_PLAY, this.onPlay);
      this.listenTo(this.container, _events2.default.CONTAINER_STOP, this.onStop);
      this.listenTo(this.container, _events2.default.CONTAINER_PAUSE, this.onPause);
      this.listenTo(this.container, _events2.default.CONTAINER_ENDED, this.onEnded);
      this.listenTo(this.container, _events2.default.CONTAINER_STATE_BUFFERING, this.onBuffering);
      this.listenTo(this.container, _events2.default.CONTAINER_STATE_BUFFERFULL, this.onBufferFull);
      this.listenTo(this.container, _events2.default.CONTAINER_ERROR, this.onError);
      this.listenTo(this.container, _events2.default.CONTAINER_PLAYBACKSTATE, this.onPlaybackChanged);
      this.listenTo(this.container, _events2.default.CONTAINER_VOLUME, function (event) {
        return _this3.onVolumeChanged(event);
      });
      this.listenTo(this.container, _events2.default.CONTAINER_SEEK, function (event) {
        return _this3.onSeek(event);
      });
      this.listenTo(this.container, _events2.default.CONTAINER_FULL_SCREEN, this.onFullscreen);
      this.listenTo(this.container, _events2.default.CONTAINER_HIGHDEFINITIONUPDATE, this.onHD);
      this.listenTo(this.container, _events2.default.CONTAINER_PLAYBACKDVRSTATECHANGED, this.onDVR);
    }
    _gaq.push([this.trackerName + '_setAccount', this.account]);
    if (this.domainName) _gaq.push([this.trackerName + '_setDomainName', this.domainName]);
  };

  GoogleAnalytics.prototype.onReady = function onReady() {
    this.push(['Video', 'Playback', this.container.playback.name]);
  };

  GoogleAnalytics.prototype.onPlay = function onPlay() {
    this.push(['Video', 'Play', this.container.playback.src]);
  };

  GoogleAnalytics.prototype.onStop = function onStop() {
    this.push(['Video', 'Stop', this.container.playback.src]);
  };

  GoogleAnalytics.prototype.onEnded = function onEnded() {
    this.push(['Video', 'Ended', this.container.playback.src]);
  };

  GoogleAnalytics.prototype.onBuffering = function onBuffering() {
    this.push(['Video', 'Buffering', this.container.playback.src]);
  };

  GoogleAnalytics.prototype.onBufferFull = function onBufferFull() {
    this.push(['Video', 'Bufferfull', this.container.playback.src]);
  };

  GoogleAnalytics.prototype.onError = function onError() {
    this.push(['Video', 'Error', this.container.playback.src]);
  };

  GoogleAnalytics.prototype.onHD = function onHD(isHD) {
    var status = isHD ? 'ON' : 'OFF';
    if (status !== this.currentHDState) {
      this.currentHDState = status;
      this.push(['Video', 'HD - ' + status, this.container.playback.src]);
    }
  };

  GoogleAnalytics.prototype.onPlaybackChanged = function onPlaybackChanged(playbackState) {
    if (playbackState.type !== null) this.push(['Video', 'Playback Type - ' + playbackState.type, this.container.playback.src]);
  };

  GoogleAnalytics.prototype.onDVR = function onDVR(dvrInUse) {
    var status = dvrInUse ? 'ON' : 'OFF';
    this.push(['Interaction', 'DVR - ' + status, this.container.playback.src]);
  };

  GoogleAnalytics.prototype.onPause = function onPause() {
    this.push(['Video', 'Pause', this.container.playback.src]);
  };

  GoogleAnalytics.prototype.onSeek = function onSeek() {
    this.push(['Video', 'Seek', this.container.playback.src]);
  };

  GoogleAnalytics.prototype.onVolumeChanged = function onVolumeChanged() {
    this.push(['Interaction', 'Volume', this.container.playback.src]);
  };

  GoogleAnalytics.prototype.onFullscreen = function onFullscreen() {
    this.push(['Interaction', 'Fullscreen', this.container.playback.src]);
  };

  GoogleAnalytics.prototype.push = function push(array) {
    var res = [this.trackerName + '_trackEvent'].concat(array);
    _gaq.push(res);
  };

  return GoogleAnalytics;
}(_container_plugin2.default);

exports.default = GoogleAnalytics;
module.exports = exports['default'];

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _click_to_pause = __webpack_require__(194);

var _click_to_pause2 = _interopRequireDefault(_click_to_pause);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _click_to_pause2.default;
module.exports = exports['default'];

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _container_plugin = __webpack_require__(36);

var _container_plugin2 = _interopRequireDefault(_container_plugin);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _playback = __webpack_require__(12);

var _playback2 = _interopRequireDefault(_playback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClickToPausePlugin = function (_ContainerPlugin) {
  (0, _inherits3.default)(ClickToPausePlugin, _ContainerPlugin);
  (0, _createClass3.default)(ClickToPausePlugin, [{
    key: 'name',
    get: function get() {
      return 'click_to_pause';
    }
  }]);

  function ClickToPausePlugin(container) {
    (0, _classCallCheck3.default)(this, ClickToPausePlugin);
    return (0, _possibleConstructorReturn3.default)(this, _ContainerPlugin.call(this, container));
  }

  ClickToPausePlugin.prototype.bindEvents = function bindEvents() {
    this.listenTo(this.container, _events2.default.CONTAINER_CLICK, this.click);
    this.listenTo(this.container, _events2.default.CONTAINER_SETTINGSUPDATE, this.settingsUpdate);
  };

  ClickToPausePlugin.prototype.click = function click() {
    if (this.container.getPlaybackType() !== _playback2.default.LIVE || this.container.isDvrEnabled()) {
      if (this.container.isPlaying()) this.container.pause();else this.container.play();
    }
  };

  ClickToPausePlugin.prototype.settingsUpdate = function settingsUpdate() {
    var pointerEnabled = this.container.getPlaybackType() !== _playback2.default.LIVE || this.container.isDvrEnabled();
    if (pointerEnabled === this.pointerEnabled) return;

    var method = pointerEnabled ? 'addClass' : 'removeClass';
    this.container.$el[method]('pointer-enabled');
    this.pointerEnabled = pointerEnabled;
  };

  return ClickToPausePlugin;
}(_container_plugin2.default); //Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

exports.default = ClickToPausePlugin;
module.exports = exports['default'];

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dvr_controls = __webpack_require__(196);

var _dvr_controls2 = _interopRequireDefault(_dvr_controls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _dvr_controls2.default;
module.exports = exports['default'];

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _ui_core_plugin = __webpack_require__(37);

var _ui_core_plugin2 = _interopRequireDefault(_ui_core_plugin);

var _template = __webpack_require__(10);

var _template2 = _interopRequireDefault(_template);

var _playback = __webpack_require__(12);

var _playback2 = _interopRequireDefault(_playback);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _index = __webpack_require__(197);

var _index2 = _interopRequireDefault(_index);

__webpack_require__(198);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DVRControls = function (_UICorePlugin) {
  (0, _inherits3.default)(DVRControls, _UICorePlugin);
  (0, _createClass3.default)(DVRControls, [{
    key: 'template',
    get: function get() {
      return (0, _template2.default)(_index2.default);
    }
  }, {
    key: 'name',
    get: function get() {
      return 'dvr_controls';
    }
  }, {
    key: 'events',
    get: function get() {
      return {
        'click .live-button': 'click'
      };
    }
  }, {
    key: 'attributes',
    get: function get() {
      return {
        'class': 'dvr-controls',
        'data-dvr-controls': ''
      };
    }
  }]);

  function DVRControls(core) {
    (0, _classCallCheck3.default)(this, DVRControls);

    var _this = (0, _possibleConstructorReturn3.default)(this, _UICorePlugin.call(this, core));

    _this.settingsUpdate();
    return _this;
  }

  DVRControls.prototype.bindEvents = function bindEvents() {
    this.listenTo(this.core.mediaControl, _events2.default.MEDIACONTROL_CONTAINERCHANGED, this.containerChanged);
    this.listenTo(this.core.mediaControl, _events2.default.MEDIACONTROL_RENDERED, this.settingsUpdate);
    this.listenTo(this.core, _events2.default.CORE_OPTIONS_CHANGE, this.render);
    if (this.core.getCurrentContainer()) {
      this.listenToOnce(this.core.getCurrentContainer(), _events2.default.CONTAINER_TIMEUPDATE, this.render);
      this.listenTo(this.core.getCurrentContainer(), _events2.default.CONTAINER_PLAYBACKDVRSTATECHANGED, this.dvrChanged);
    }
  };

  DVRControls.prototype.containerChanged = function containerChanged() {
    this.stopListening();
    this.bindEvents();
  };

  DVRControls.prototype.dvrChanged = function dvrChanged(dvrEnabled) {
    if (this.core.getPlaybackType() !== _playback2.default.LIVE) return;
    this.settingsUpdate();
    this.core.mediaControl.$el.addClass('live');
    if (dvrEnabled) {
      this.core.mediaControl.$el.addClass('dvr');
      this.core.mediaControl.$el.find('.media-control-indicator[data-position], .media-control-indicator[data-duration]').hide();
    } else {
      this.core.mediaControl.$el.removeClass('dvr');
    }
  };

  DVRControls.prototype.click = function click() {
    var mediaControl = this.core.mediaControl;
    var container = mediaControl.container;
    if (!container.isPlaying()) container.play();

    if (mediaControl.$el.hasClass('dvr')) container.seek(container.getDuration());
  };

  DVRControls.prototype.settingsUpdate = function settingsUpdate() {
    var _this2 = this;

    this.stopListening();
    this.core.mediaControl.$el.removeClass('live');
    if (this.shouldRender()) {
      this.render();
      this.$el.click(function () {
        return _this2.click();
      });
    }
    this.bindEvents();
  };

  DVRControls.prototype.shouldRender = function shouldRender() {
    var useDvrControls = this.core.options.useDvrControls === undefined || !!this.core.options.useDvrControls;
    return useDvrControls && this.core.getPlaybackType() === _playback2.default.LIVE;
  };

  DVRControls.prototype.render = function render() {
    this.$el.html(this.template({
      live: this.core.i18n.t('live'),
      backToLive: this.core.i18n.t('back_to_live')
    }));
    if (this.shouldRender()) {
      this.core.mediaControl.$el.addClass('live');
      this.core.mediaControl.$('.media-control-left-panel[data-media-control]').append(this.$el);
    }
    return this;
  };

  return DVRControls;
}(_ui_core_plugin2.default);

exports.default = DVRControls;
module.exports = exports['default'];

/***/ }),
/* 197 */
/***/ (function(module, exports) {

module.exports = "<div class=\"live-info\"><%= live %></div>\n<button type=\"button\" class=\"live-button\" aria-label=\"<%= backToLive %>\"><%= backToLive %></button>\n";

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(199);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"singleton":true,"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./dvr_controls.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./dvr_controls.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, ".dvr-controls[data-dvr-controls] {\n  display: inline-block;\n  float: left;\n  color: #fff;\n  line-height: 32px;\n  font-size: 10px;\n  font-weight: bold;\n  margin-left: 6px; }\n  .dvr-controls[data-dvr-controls] .live-info {\n    cursor: default;\n    font-family: \"Roboto\", \"Open Sans\", Arial, sans-serif;\n    text-transform: uppercase; }\n    .dvr-controls[data-dvr-controls] .live-info:before {\n      content: \"\";\n      display: inline-block;\n      position: relative;\n      width: 7px;\n      height: 7px;\n      border-radius: 3.5px;\n      margin-right: 3.5px;\n      background-color: #ff0101; }\n    .dvr-controls[data-dvr-controls] .live-info.disabled {\n      opacity: 0.3; }\n      .dvr-controls[data-dvr-controls] .live-info.disabled:before {\n        background-color: #fff; }\n  .dvr-controls[data-dvr-controls] .live-button {\n    cursor: pointer;\n    outline: none;\n    display: none;\n    border: 0;\n    color: #fff;\n    background-color: transparent;\n    height: 32px;\n    padding: 0;\n    opacity: 0.7;\n    font-family: \"Roboto\", \"Open Sans\", Arial, sans-serif;\n    text-transform: uppercase;\n    transition: all 0.1s ease; }\n    .dvr-controls[data-dvr-controls] .live-button:before {\n      content: \"\";\n      display: inline-block;\n      position: relative;\n      width: 7px;\n      height: 7px;\n      border-radius: 3.5px;\n      margin-right: 3.5px;\n      background-color: #fff; }\n    .dvr-controls[data-dvr-controls] .live-button:hover {\n      opacity: 1;\n      text-shadow: rgba(255, 255, 255, 0.75) 0 0 5px; }\n\n.dvr .dvr-controls[data-dvr-controls] .live-info {\n  display: none; }\n\n.dvr .dvr-controls[data-dvr-controls] .live-button {\n  display: block; }\n\n.dvr.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar] {\n  background-color: #005aff; }\n\n.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar] {\n  background-color: #ff0101; }\n", ""]);

// exports


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _closed_captions = __webpack_require__(201);

var _closed_captions2 = _interopRequireDefault(_closed_captions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _closed_captions2.default;
module.exports = exports['default'];

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _ui_core_plugin = __webpack_require__(37);

var _ui_core_plugin2 = _interopRequireDefault(_ui_core_plugin);

var _template = __webpack_require__(10);

var _template2 = _interopRequireDefault(_template);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _cc = __webpack_require__(202);

var _cc2 = _interopRequireDefault(_cc);

var _closed_captions = __webpack_require__(203);

var _closed_captions2 = _interopRequireDefault(_closed_captions);

__webpack_require__(204);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClosedCaptions = function (_UICorePlugin) {
  (0, _inherits3.default)(ClosedCaptions, _UICorePlugin);
  (0, _createClass3.default)(ClosedCaptions, [{
    key: 'name',
    get: function get() {
      return 'closed_captions';
    }
  }, {
    key: 'template',
    get: function get() {
      return (0, _template2.default)(_closed_captions2.default);
    }
  }, {
    key: 'events',
    get: function get() {
      return {
        'click [data-cc-button]': 'toggleContextMenu',
        'click [data-cc-select]': 'onTrackSelect'
      };
    }
  }, {
    key: 'attributes',
    get: function get() {
      return {
        'class': 'cc-controls',
        'data-cc-controls': ''
      };
    }
  }]);

  function ClosedCaptions(core) {
    (0, _classCallCheck3.default)(this, ClosedCaptions);

    var _this = (0, _possibleConstructorReturn3.default)(this, _UICorePlugin.call(this, core));

    var config = core.options.closedCaptionsConfig;
    _this._title = config && config.title ? config.title : null;
    _this._ariaLabel = config && config.ariaLabel ? config.ariaLabel : 'cc-button';
    _this._labelCb = config && config.labelCallback && typeof config.labelCallback === 'function' ? config.labelCallback : function (track) {
      return track.name;
    };
    return _this;
  }

  ClosedCaptions.prototype.bindEvents = function bindEvents() {
    this.listenTo(this.core.mediaControl, _events2.default.MEDIACONTROL_CONTAINERCHANGED, this.containerChanged);
    this.listenTo(this.core.mediaControl, _events2.default.MEDIACONTROL_RENDERED, this.render);
    this.listenTo(this.core.mediaControl, _events2.default.MEDIACONTROL_HIDE, this.hideContextMenu);
    this.container = this.core.getCurrentContainer();
    if (this.container) {
      this.listenTo(this.container, _events2.default.CONTAINER_SUBTITLE_AVAILABLE, this.onSubtitleAvailable);
      this.listenTo(this.container, _events2.default.CONTAINER_SUBTITLE_CHANGED, this.onSubtitleChanged);
      this.listenTo(this.container, _events2.default.CONTAINER_STOP, this.onContainerStop);
    }
  };

  ClosedCaptions.prototype.onContainerStop = function onContainerStop() {
    this.ccAvailable(false);
  };

  ClosedCaptions.prototype.containerChanged = function containerChanged() {
    this.ccAvailable(false);
    this.stopListening();
    this.bindEvents();
  };

  ClosedCaptions.prototype.onSubtitleAvailable = function onSubtitleAvailable() {
    this.renderCcButton();
    this.ccAvailable(true);
  };

  ClosedCaptions.prototype.onSubtitleChanged = function onSubtitleChanged(track) {
    this.setCurrentContextMenuElement(track.id);
  };

  ClosedCaptions.prototype.onTrackSelect = function onTrackSelect(event) {
    var trackId = parseInt(event.target.dataset.ccSelect, 10);
    this.container.closedCaptionsTrackId = trackId;
    this.hideContextMenu();
    event.stopPropagation();
    return false;
  };

  ClosedCaptions.prototype.ccAvailable = function ccAvailable(hasCC) {
    var method = hasCC ? 'addClass' : 'removeClass';
    this.$el[method]('available');
  };

  ClosedCaptions.prototype.toggleContextMenu = function toggleContextMenu() {
    this.$el.find('ul').toggle();
  };

  ClosedCaptions.prototype.hideContextMenu = function hideContextMenu() {
    this.$el.find('ul').hide();
  };

  ClosedCaptions.prototype.contextMenuElement = function contextMenuElement(id) {
    return this.$el.find('ul a' + (!isNaN(id) ? '[data-cc-select="' + id + '"]' : '')).parent();
  };

  ClosedCaptions.prototype.setCurrentContextMenuElement = function setCurrentContextMenuElement(trackId) {
    if (this._trackId !== trackId) {
      this.contextMenuElement().removeClass('current');
      this.contextMenuElement(trackId).addClass('current');
      var method = trackId > -1 ? 'addClass' : 'removeClass';
      this.$ccButton[method]('enabled');
      this._trackId = trackId;
    }
  };

  ClosedCaptions.prototype.renderCcButton = function renderCcButton() {
    var tracks = this.container ? this.container.closedCaptionsTracks : [];
    for (var i = 0; i < tracks.length; i++) {
      tracks[i].label = this._labelCb(tracks[i]);
    }this.$el.html(this.template({
      ariaLabel: this._ariaLabel,
      disabledLabel: this.core.i18n.t('disabled'),
      title: this._title,
      tracks: tracks
    }));

    this.$ccButton = this.$el.find('button.cc-button[data-cc-button]');
    this.$ccButton.append(_cc2.default);
    this.$el.append(this.style);
  };

  ClosedCaptions.prototype.render = function render() {
    this.renderCcButton();

    var $fullscreen = this.core.mediaControl.$el.find('button[data-fullscreen]');
    if ($fullscreen[0]) this.$el.insertAfter($fullscreen);else this.core.mediaControl.$el.find('.media-control-right-panel[data-media-control]').prepend(this.$el);

    return this;
  };

  return ClosedCaptions;
}(_ui_core_plugin2.default);

exports.default = ClosedCaptions;
module.exports = exports['default'];

/***/ }),
/* 202 */
/***/ (function(module, exports) {

module.exports = "<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 49 41.8\" style=\"enable-background:new 0 0 49 41.8;\" xml:space=\"preserve\"><path d=\"M47.1,0H3.2C1.6,0,0,1.2,0,2.8v31.5C0,35.9,1.6,37,3.2,37h11.9l3.2,1.9l4.7,2.7c0.9,0.5,2-0.1,2-1.1V37h22.1 c1.6,0,1.9-1.1,1.9-2.7V2.8C49,1.2,48.7,0,47.1,0z M7.2,18.6c0-4.8,3.5-9.3,9.9-9.3c4.8,0,7.1,2.7,7.1,2.7l-2.5,4 c0,0-1.7-1.7-4.2-1.7c-2.8,0-4.3,2.1-4.3,4.3c0,2.1,1.5,4.4,4.5,4.4c2.5,0,4.9-2.1,4.9-2.1l2.2,4.2c0,0-2.7,2.9-7.6,2.9 C10.8,27.9,7.2,23.5,7.2,18.6z M36.9,27.9c-6.4,0-9.9-4.4-9.9-9.3c0-4.8,3.5-9.3,9.9-9.3C41.7,9.3,44,12,44,12l-2.5,4 c0,0-1.7-1.7-4.2-1.7c-2.8,0-4.3,2.1-4.3,4.3c0,2.1,1.5,4.4,4.5,4.4c2.5,0,4.9-2.1,4.9-2.1l2.2,4.2C44.5,25,41.9,27.9,36.9,27.9z\"></path></svg>"

/***/ }),
/* 203 */
/***/ (function(module, exports) {

module.exports = "<button type=\"button\" class=\"cc-button media-control-button media-control-icon\" data-cc-button aria-label=\"<%= ariaLabel %>\"></button>\n<ul>\n  <% if (title) { %>\n  <li data-title><%= title %></li>\n  <% }; %>\n  <li><a href=\"#\" data-cc-select=\"-1\"><%= disabledLabel %></a></li>\n  <% for (var i = 0; i < tracks.length; i++) { %>\n    <li><a href=\"#\" data-cc-select=\"<%= tracks[i].id %>\"><%= tracks[i].label %></a></li>\n  <% }; %>\n</ul>\n";

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(205);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"singleton":true,"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./closed_captions.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./closed_captions.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, ".cc-controls[data-cc-controls] {\n  float: right;\n  position: relative;\n  display: none; }\n  .cc-controls[data-cc-controls].available {\n    display: block; }\n  .cc-controls[data-cc-controls] .cc-button {\n    padding: 6px !important; }\n    .cc-controls[data-cc-controls] .cc-button.enabled {\n      display: block;\n      opacity: 1.0; }\n      .cc-controls[data-cc-controls] .cc-button.enabled:hover {\n        opacity: 1.0;\n        text-shadow: none; }\n  .cc-controls[data-cc-controls] > ul {\n    list-style-type: none;\n    position: absolute;\n    bottom: 25px;\n    border: 1px solid black;\n    display: none;\n    background-color: #e6e6e6; }\n  .cc-controls[data-cc-controls] li {\n    font-size: 10px; }\n    .cc-controls[data-cc-controls] li[data-title] {\n      background-color: #c3c2c2;\n      padding: 5px; }\n    .cc-controls[data-cc-controls] li a {\n      color: #444;\n      padding: 2px 10px;\n      display: block;\n      text-decoration: none; }\n      .cc-controls[data-cc-controls] li a:hover {\n        background-color: #555;\n        color: white; }\n        .cc-controls[data-cc-controls] li a:hover a {\n          color: white;\n          text-decoration: none; }\n    .cc-controls[data-cc-controls] li.current a {\n      color: #f00; }\n", ""]);

// exports


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _favicon = __webpack_require__(207);

var _favicon2 = _interopRequireDefault(_favicon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _favicon2.default;
module.exports = exports['default'];

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _core_plugin = __webpack_require__(30);

var _core_plugin2 = _interopRequireDefault(_core_plugin);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _clapprZepto = __webpack_require__(6);

var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

var _play = __webpack_require__(57);

var _play2 = _interopRequireDefault(_play);

var _pause = __webpack_require__(76);

var _pause2 = _interopRequireDefault(_pause);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var oldIcon = (0, _clapprZepto2.default)('link[rel="shortcut icon"]');

var Favicon = function (_CorePlugin) {
  (0, _inherits3.default)(Favicon, _CorePlugin);
  (0, _createClass3.default)(Favicon, [{
    key: 'name',
    get: function get() {
      return 'favicon';
    }
  }, {
    key: 'oldIcon',
    get: function get() {
      return oldIcon;
    }
  }]);

  function Favicon(core) {
    (0, _classCallCheck3.default)(this, Favicon);

    var _this = (0, _possibleConstructorReturn3.default)(this, _CorePlugin.call(this, core));

    _this._container = null;
    _this.configure();
    return _this;
  }

  Favicon.prototype.configure = function configure() {
    if (this.core.options.changeFavicon) {
      if (!this.enabled) {
        this.stopListening(this.core, _events2.default.CORE_OPTIONS_CHANGE);
        this.enable();
      }
    } else if (this.enabled) {
      this.disable();
      this.listenTo(this.core, _events2.default.CORE_OPTIONS_CHANGE, this.configure);
    }
  };

  Favicon.prototype.bindEvents = function bindEvents() {
    this.listenTo(this.core, _events2.default.CORE_OPTIONS_CHANGE, this.configure);
    this.listenTo(this.core.mediaControl, _events2.default.MEDIACONTROL_CONTAINERCHANGED, this.containerChanged);
    if (this.core.mediaControl.container) this.containerChanged();
  };

  Favicon.prototype.containerChanged = function containerChanged() {
    this._container && this.stopListening(this._container);
    this._container = this.core.mediaControl.container;
    this.listenTo(this._container, _events2.default.CONTAINER_PLAY, this.setPlayIcon);
    this.listenTo(this._container, _events2.default.CONTAINER_PAUSE, this.setPauseIcon);
    this.listenTo(this._container, _events2.default.CONTAINER_STOP, this.resetIcon);
    this.listenTo(this._container, _events2.default.CONTAINER_ENDED, this.resetIcon);
    this.listenTo(this._container, _events2.default.CONTAINER_ERROR, this.resetIcon);
    this.resetIcon();
  };

  Favicon.prototype.disable = function disable() {
    _CorePlugin.prototype.disable.call(this);
    this.resetIcon();
  };

  Favicon.prototype.destroy = function destroy() {
    _CorePlugin.prototype.destroy.call(this);
    this.resetIcon();
  };

  Favicon.prototype.createIcon = function createIcon(svg) {
    var canvas = (0, _clapprZepto2.default)('<canvas/>');
    canvas[0].width = 16;
    canvas[0].height = 16;
    var ctx = canvas[0].getContext('2d');
    ctx.fillStyle = '#000';
    var d = (0, _clapprZepto2.default)(svg).find('path').attr('d');
    var path = new Path2D(d);
    ctx.fill(path);
    var icon = (0, _clapprZepto2.default)('<link rel="shortcut icon" type="image/png"/>');
    icon.attr('href', canvas[0].toDataURL('image/png'));
    return icon;
  };

  Favicon.prototype.setPlayIcon = function setPlayIcon() {
    if (!this.playIcon) this.playIcon = this.createIcon(_play2.default);

    this.changeIcon(this.playIcon);
  };

  Favicon.prototype.setPauseIcon = function setPauseIcon() {
    if (!this.pauseIcon) this.pauseIcon = this.createIcon(_pause2.default);

    this.changeIcon(this.pauseIcon);
  };

  Favicon.prototype.resetIcon = function resetIcon() {
    (0, _clapprZepto2.default)('link[rel="shortcut icon"]').remove();
    (0, _clapprZepto2.default)('head').append(this.oldIcon);
  };

  Favicon.prototype.changeIcon = function changeIcon(icon) {
    if (icon) {
      (0, _clapprZepto2.default)('link[rel="shortcut icon"]').remove();
      (0, _clapprZepto2.default)('head').append(icon);
    }
  };

  return Favicon;
}(_core_plugin2.default);

exports.default = Favicon;
module.exports = exports['default'];

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _seek_time = __webpack_require__(209);

var _seek_time2 = _interopRequireDefault(_seek_time);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _seek_time2.default;
module.exports = exports['default'];

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = __webpack_require__(5);

var _ui_core_plugin = __webpack_require__(37);

var _ui_core_plugin2 = _interopRequireDefault(_ui_core_plugin);

var _template = __webpack_require__(10);

var _template2 = _interopRequireDefault(_template);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _playback = __webpack_require__(12);

var _playback2 = _interopRequireDefault(_playback);

var _seek_time = __webpack_require__(210);

var _seek_time2 = _interopRequireDefault(_seek_time);

__webpack_require__(211);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SeekTime = function (_UICorePlugin) {
  (0, _inherits3.default)(SeekTime, _UICorePlugin);
  (0, _createClass3.default)(SeekTime, [{
    key: 'name',
    get: function get() {
      return 'seek_time';
    }
  }, {
    key: 'template',
    get: function get() {
      return (0, _template2.default)(_seek_time2.default);
    }
  }, {
    key: 'attributes',
    get: function get() {
      return {
        'class': 'seek-time',
        'data-seek-time': ''
      };
    }
  }, {
    key: 'mediaControl',
    get: function get() {
      return this.core.mediaControl;
    }
  }, {
    key: 'mediaControlContainer',
    get: function get() {
      return this.mediaControl.container;
    }
  }, {
    key: 'isLiveStreamWithDvr',
    get: function get() {
      return this.mediaControlContainer && this.mediaControlContainer.getPlaybackType() === _playback2.default.LIVE && this.mediaControlContainer.isDvrEnabled();
    }
  }, {
    key: 'durationShown',
    get: function get() {
      return this.isLiveStreamWithDvr && !this.useActualLiveTime;
    }
  }, {
    key: 'useActualLiveTime',
    get: function get() {
      return this.actualLiveTime && this.isLiveStreamWithDvr;
    }
  }]);

  function SeekTime(core) {
    (0, _classCallCheck3.default)(this, SeekTime);

    var _this = (0, _possibleConstructorReturn3.default)(this, _UICorePlugin.call(this, core));

    _this.hoveringOverSeekBar = false;
    _this.hoverPosition = null;
    _this.duration = null;
    _this.actualLiveTime = !!_this.mediaControl.options.actualLiveTime;
    if (_this.actualLiveTime) {
      if (_this.mediaControl.options.actualLiveServerTime) _this.actualLiveServerTimeDiff = new Date().getTime() - new Date(_this.mediaControl.options.actualLiveServerTime).getTime();else _this.actualLiveServerTimeDiff = 0;
    }
    return _this;
  }

  SeekTime.prototype.bindEvents = function bindEvents() {
    this.listenTo(this.mediaControl, _events2.default.MEDIACONTROL_RENDERED, this.render);
    this.listenTo(this.mediaControl, _events2.default.MEDIACONTROL_MOUSEMOVE_SEEKBAR, this.showTime);
    this.listenTo(this.mediaControl, _events2.default.MEDIACONTROL_MOUSELEAVE_SEEKBAR, this.hideTime);
    this.listenTo(this.mediaControl, _events2.default.MEDIACONTROL_CONTAINERCHANGED, this.onContainerChanged);
    if (this.mediaControlContainer) {
      this.listenTo(this.mediaControlContainer, _events2.default.CONTAINER_PLAYBACKDVRSTATECHANGED, this.update);
      this.listenTo(this.mediaControlContainer, _events2.default.CONTAINER_TIMEUPDATE, this.updateDuration);
    }
  };

  SeekTime.prototype.onContainerChanged = function onContainerChanged() {
    this.stopListening();
    this.bindEvents();
  };

  SeekTime.prototype.updateDuration = function updateDuration(timeProgress) {
    this.duration = timeProgress.total;
    this.update();
  };

  SeekTime.prototype.showTime = function showTime(event) {
    this.hoveringOverSeekBar = true;
    this.calculateHoverPosition(event);
    this.update();
  };

  SeekTime.prototype.hideTime = function hideTime() {
    this.hoveringOverSeekBar = false;
    this.update();
  };

  SeekTime.prototype.calculateHoverPosition = function calculateHoverPosition(event) {
    var offset = event.pageX - this.mediaControl.$seekBarContainer.offset().left;
    // proportion into the seek bar that the mouse is hovered over 0-1
    this.hoverPosition = Math.min(1, Math.max(offset / this.mediaControl.$seekBarContainer.width(), 0));
  };

  SeekTime.prototype.getSeekTime = function getSeekTime() {
    var seekTime = void 0,
        secondsSinceMidnight = void 0;
    if (this.useActualLiveTime) {
      var d = new Date(new Date().getTime() - this.actualLiveServerTimeDiff),
          e = new Date(d);
      secondsSinceMidnight = (e - d.setHours(0, 0, 0, 0)) / 1000;
      seekTime = secondsSinceMidnight - this.duration + this.hoverPosition * this.duration;
      if (seekTime < 0) seekTime += 86400;
    } else {
      seekTime = this.hoverPosition * this.duration;
    }

    return { seekTime: seekTime, secondsSinceMidnight: secondsSinceMidnight };
  };

  SeekTime.prototype.update = function update() {
    if (!this.rendered) {
      // update() is always called after a render
      return;
    }
    if (!this.shouldBeVisible()) {
      this.$el.hide();
      this.$el.css('left', '-100%');
    } else {
      var seekTime = this.getSeekTime();
      var currentSeekTime = (0, _utils.formatTime)(seekTime.seekTime, this.useActualLiveTime);
      // only update dom if necessary, ie time actually changed
      if (currentSeekTime !== this.displayedSeekTime) {
        this.$seekTimeEl.text(currentSeekTime);
        this.displayedSeekTime = currentSeekTime;
      }

      if (this.durationShown) {
        this.$durationEl.show();
        var currentDuration = (0, _utils.formatTime)(this.actualLiveTime ? seekTime.secondsSinceMidnight : this.duration, this.actualLiveTime);
        if (currentDuration !== this.displayedDuration) {
          this.$durationEl.text(currentDuration);
          this.displayedDuration = currentDuration;
        }
      } else {
        this.$durationEl.hide();
      }

      // the element must be unhidden before its width is requested, otherwise it's width will be reported as 0
      this.$el.show();
      var containerWidth = this.mediaControl.$seekBarContainer.width();
      var elWidth = this.$el.width();
      var elLeftPos = this.hoverPosition * containerWidth;
      elLeftPos -= elWidth / 2;
      elLeftPos = Math.max(0, Math.min(elLeftPos, containerWidth - elWidth));
      this.$el.css('left', elLeftPos);
    }
  };

  SeekTime.prototype.shouldBeVisible = function shouldBeVisible() {
    return this.mediaControlContainer && this.mediaControlContainer.settings.seekEnabled && this.hoveringOverSeekBar && this.hoverPosition !== null && this.duration !== null;
  };

  SeekTime.prototype.render = function render() {
    this.rendered = true;
    this.displayedDuration = null;
    this.displayedSeekTime = null;
    this.$el.html(this.template());
    this.$el.hide();
    this.mediaControl.$el.append(this.el);
    this.$seekTimeEl = this.$el.find('[data-seek-time]');
    this.$durationEl = this.$el.find('[data-duration]');
    this.$durationEl.hide();
    this.update();
  };

  return SeekTime;
}(_ui_core_plugin2.default); // Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

exports.default = SeekTime;
module.exports = exports['default'];

/***/ }),
/* 210 */
/***/ (function(module, exports) {

module.exports = "<span data-seek-time></span>\n<span data-duration></span>\n";

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(212);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"singleton":true,"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./seek_time.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js?includePaths[]=/Users/bruno/workspace/player/clappr/clappr/src/base/scss!./seek_time.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, ".seek-time[data-seek-time] {\n  position: absolute;\n  white-space: nowrap;\n  height: 20px;\n  line-height: 20px;\n  font-size: 0;\n  left: -100%;\n  bottom: 55px;\n  background-color: rgba(2, 2, 2, 0.5);\n  z-index: 9999;\n  transition: opacity 0.1s ease; }\n  .seek-time[data-seek-time].hidden[data-seek-time] {\n    opacity: 0; }\n  .seek-time[data-seek-time] [data-seek-time] {\n    display: inline-block;\n    color: white;\n    font-size: 10px;\n    padding-left: 7px;\n    padding-right: 7px;\n    vertical-align: top; }\n  .seek-time[data-seek-time] [data-duration] {\n    display: inline-block;\n    color: rgba(255, 255, 255, 0.5);\n    font-size: 10px;\n    padding-right: 7px;\n    vertical-align: top; }\n    .seek-time[data-seek-time] [data-duration]:before {\n      content: \"|\";\n      margin-right: 7px; }\n", ""]);

// exports


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _core_plugin = __webpack_require__(30);

var _core_plugin2 = _interopRequireDefault(_core_plugin);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SourcesPlugin = function (_CorePlugin) {
  (0, _inherits3.default)(SourcesPlugin, _CorePlugin);

  function SourcesPlugin() {
    (0, _classCallCheck3.default)(this, SourcesPlugin);
    return (0, _possibleConstructorReturn3.default)(this, _CorePlugin.apply(this, arguments));
  }

  SourcesPlugin.prototype.bindEvents = function bindEvents() {
    this.listenTo(this.core, _events2.default.CORE_CONTAINERS_CREATED, this.onContainersCreated);
  };

  SourcesPlugin.prototype.onContainersCreated = function onContainersCreated() {
    var firstValidSource = this.core.containers.filter(function (container) {
      return container.playback.name !== 'no_op';
    })[0] || this.core.containers[0];
    if (firstValidSource) {
      this.core.containers.forEach(function (container) {
        if (container !== firstValidSource) container.destroy();
      });
    }
  };

  (0, _createClass3.default)(SourcesPlugin, [{
    key: 'name',
    get: function get() {
      return 'sources';
    }
  }]);
  return SourcesPlugin;
}(_core_plugin2.default);

exports.default = SourcesPlugin;
module.exports = exports['default'];

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _core_plugin = __webpack_require__(30);

var _core_plugin2 = _interopRequireDefault(_core_plugin);

var _utils = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EndVideo = function (_CorePlugin) {
  (0, _inherits3.default)(EndVideo, _CorePlugin);

  function EndVideo() {
    (0, _classCallCheck3.default)(this, EndVideo);
    return (0, _possibleConstructorReturn3.default)(this, _CorePlugin.apply(this, arguments));
  }

  EndVideo.prototype.bindEvents = function bindEvents() {
    this.listenTo(this.core.mediaControl, _events2.default.MEDIACONTROL_CONTAINERCHANGED, this.containerChanged);
    var container = this.core.getCurrentContainer();
    if (container) {
      this.listenTo(container, _events2.default.CONTAINER_ENDED, this.ended);
      this.listenTo(container, _events2.default.CONTAINER_STOP, this.ended);
    }
  };

  EndVideo.prototype.containerChanged = function containerChanged() {
    this.stopListening();
    this.bindEvents();
  };

  EndVideo.prototype.ended = function ended() {
    var exitOnEnd = typeof this.core.options.exitFullscreenOnEnd === 'undefined' || this.core.options.exitFullscreenOnEnd;
    if (exitOnEnd && _utils.Fullscreen.isFullscreen()) this.core.toggleFullscreen();
  };

  (0, _createClass3.default)(EndVideo, [{
    key: 'name',
    get: function get() {
      return 'end_video';
    }
  }]);
  return EndVideo;
}(_core_plugin2.default);

exports.default = EndVideo;
module.exports = exports['default'];

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(31);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = __webpack_require__(5);

var _clapprZepto = __webpack_require__(6);

var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

var _core_plugin = __webpack_require__(30);

var _core_plugin2 = _interopRequireDefault(_core_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The internationalization (i18n) plugin
 * @class Strings
 * @constructor
 * @extends CorePlugin
 * @module plugins
 */
var Strings = function (_CorePlugin) {
  (0, _inherits3.default)(Strings, _CorePlugin);
  (0, _createClass3.default)(Strings, [{
    key: 'name',
    get: function get() {
      return 'strings';
    }
  }]);

  function Strings(core) {
    (0, _classCallCheck3.default)(this, Strings);

    var _this = (0, _possibleConstructorReturn3.default)(this, _CorePlugin.call(this, core));

    _this._initializeMessages();
    return _this;
  }
  /**
   * Gets a translated string for the given key.
   * @method t
   * @param {String} key the key to all messages
   * @return {String} translated label
   */


  Strings.prototype.t = function t(key) {
    var lang = this._language();
    var i18n = lang && this._messages[lang] || this._messages['en'];
    return i18n[key] || key;
  };

  Strings.prototype._language = function _language() {
    return this.core.options.language || (0, _utils.getBrowserLanguage)();
  };

  Strings.prototype._initializeMessages = function _initializeMessages() {
    var defaultMessages = {
      'en': {
        'live': 'live',
        'back_to_live': 'back to live',
        'disabled': 'Disabled',
        'playback_not_supported': 'Your browser does not support the playback of this video. Please try using a different browser.'
      },
      'pt': {
        'live': 'ao vivo',
        'back_to_live': 'voltar para o ao vivo',
        'disabled': 'Desativado',
        'playback_not_supported': 'Seu navegador não supporta a reprodução deste video. Por favor, tente usar um navegador diferente.'
      },
      'es': {
        'live': 'vivo',
        'back_to_live': 'volver en vivo',
        'disabled': 'Discapacitado',
        'playback_not_supported': 'Su navegador no soporta la reproducción de un video. Por favor, trate de usar un navegador diferente.'
      },
      'ru': {
        'live': 'прямой эфир',
        'back_to_live': 'к прямому эфиру',
        'disabled': 'Отключено',
        'playback_not_supported': 'Ваш браузер не поддерживает воспроизведение этого видео. Пожалуйста, попробуйте другой браузер.'
      },
      'fr': {
        'live': 'en direct',
        'disabled': 'Désactivé',
        'back_to_live': 'retour au direct',
        'playback_not_supported': 'Votre navigateur ne supporte pas la lecture de cette vidéo. Merci de tenter sur un autre navigateur.'
      },
      'tr': {
        'live': 'canlı',
        'back_to_live': 'canlı yayına dön',
        'disabled': 'Engelli',
        'playback_not_supported': 'Tarayıcınız bu videoyu oynatma desteğine sahip değil. Lütfen farklı bir tarayıcı ile deneyin.'
      },
      'et': {
        'live': 'Otseülekanne',
        'back_to_live': 'Tagasi otseülekande juurde',
        'disabled': 'Keelatud',
        'playback_not_supported': 'Teie brauser ei toeta selle video taasesitust. Proovige kasutada muud brauserit.'
      }
    };
    var strings = this.core.options.strings || {};
    this._messages = (0, _keys2.default)(defaultMessages).reduce(function (messages, lang) {
      messages[lang] = _clapprZepto2.default.extend({}, defaultMessages[lang], strings[lang]);
      return messages;
    }, {});

    this._messages['pt-BR'] = this._messages['pt'];
    this._messages['en-US'] = this._messages['en'];
    this._messages['es-419'] = this._messages['es'];
    this._messages['fr-FR'] = this._messages['fr'];
    this._messages['tr-TR'] = this._messages['tr'];
    this._messages['et-EE'] = this._messages['et'];
  };

  return Strings;
}(_core_plugin2.default);

exports.default = Strings;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=clappr.plainhtml5.js.map