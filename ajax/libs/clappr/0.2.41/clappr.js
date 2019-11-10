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

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "<%=baseUrl%>/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _player = __webpack_require__(1);

	var _player2 = _interopRequireDefault(_player);

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _playback = __webpack_require__(38);

	var _playback2 = _interopRequireDefault(_playback);

	var _container_plugin = __webpack_require__(122);

	var _container_plugin2 = _interopRequireDefault(_container_plugin);

	var _core_plugin = __webpack_require__(143);

	var _core_plugin2 = _interopRequireDefault(_core_plugin);

	var _ui_core_plugin = __webpack_require__(137);

	var _ui_core_plugin2 = _interopRequireDefault(_ui_core_plugin);

	var _ui_container_plugin = __webpack_require__(117);

	var _ui_container_plugin2 = _interopRequireDefault(_ui_container_plugin);

	var _base_object = __webpack_require__(5);

	var _base_object2 = _interopRequireDefault(_base_object);

	var _ui_object = __webpack_require__(18);

	var _ui_object2 = _interopRequireDefault(_ui_object);

	var _browser = __webpack_require__(3);

	var _browser2 = _interopRequireDefault(_browser);

	var _container = __webpack_require__(25);

	var _container2 = _interopRequireDefault(_container);

	var _core = __webpack_require__(14);

	var _core2 = _interopRequireDefault(_core);

	var _loader = __webpack_require__(47);

	var _loader2 = _interopRequireDefault(_loader);

	var _mediator = __webpack_require__(37);

	var _mediator2 = _interopRequireDefault(_mediator);

	var _media_control = __webpack_require__(34);

	var _media_control2 = _interopRequireDefault(_media_control);

	var _player_info = __webpack_require__(45);

	var _player_info2 = _interopRequireDefault(_player_info);

	var _base_flash_playback = __webpack_require__(59);

	var _base_flash_playback2 = _interopRequireDefault(_base_flash_playback);

	var _flash = __webpack_require__(57);

	var _flash2 = _interopRequireDefault(_flash);

	var _flashls = __webpack_require__(66);

	var _flashls2 = _interopRequireDefault(_flashls);

	var _hls = __webpack_require__(70);

	var _hls2 = _interopRequireDefault(_hls);

	var _html5_audio = __webpack_require__(64);

	var _html5_audio2 = _interopRequireDefault(_html5_audio);

	var _html5_video = __webpack_require__(53);

	var _html5_video2 = _interopRequireDefault(_html5_video);

	var _html_img = __webpack_require__(108);

	var _html_img2 = _interopRequireDefault(_html_img);

	var _no_op = __webpack_require__(111);

	var _no_op2 = _interopRequireDefault(_no_op);

	var _poster = __webpack_require__(127);

	var _poster2 = _interopRequireDefault(_poster);

	var _log = __webpack_require__(7);

	var _log2 = _interopRequireDefault(_log);

	var _styler = __webpack_require__(16);

	var _styler2 = _interopRequireDefault(_styler);

	var _template = __webpack_require__(17);

	var _template2 = _interopRequireDefault(_template);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var version = ("0.2.40");

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
	    version: version,
	    template: _template2.default,
	    $: _clapprZepto2.default
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	var _base_object = __webpack_require__(5);

	var _base_object2 = _interopRequireDefault(_base_object);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _browser = __webpack_require__(3);

	var _browser2 = _interopRequireDefault(_browser);

	var _core_factory = __webpack_require__(12);

	var _core_factory2 = _interopRequireDefault(_core_factory);

	var _loader = __webpack_require__(47);

	var _loader2 = _interopRequireDefault(_loader);

	var _player_info = __webpack_require__(45);

	var _player_info2 = _interopRequireDefault(_player_info);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _lodash = __webpack_require__(29);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var baseUrl = (0, _utils.currentScriptUrl)().replace(/\/[^\/]+$/, "");

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
	  _inherits(Player, _BaseObject);

	  _createClass(Player, [{
	    key: 'loader',
	    set: function set(loader) {
	      this._loader = loader;
	    },
	    get: function get() {
	      return this._loader = this._loader || new _loader2.default(this.options.plugins || {}, this.options.playerId);
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
	      return !!this.ready;
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
	     * @param {Boolean} [options.muted]
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
	     * the default behavior for the **HLS playback** is to keep buffering indefinitely, even on VoD. This replicates the behavior for progressive download, which continues buffering when pausing the video, thus making the video available for playback even on slow networks. To change this behavior use `maxBufferLength` where **value is in seconds**.
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
	     * put `watermark: 'http://url/img.png'` on your embed parameters to automatically add watermark on your video. You can customize corner position by defining position parameter. Positions can be `bottom-left`, `bottom-right`, `top-left` and `top-right`.
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
	    _classCallCheck(this, Player);

	    var _this = _possibleConstructorReturn(this, _BaseObject.call(this, options));

	    var defaultOptions = { playerId: (0, _utils.uniqueId)(""), persistConfig: true, width: 640, height: 360, baseUrl: baseUrl, allowUserInteraction: _browser2.default.isMobile };
	    _this.options = _clapprZepto2.default.extend(defaultOptions, options);
	    _this.options.sources = _this.normalizeSources(options);
	    _this.registerOptionEventListeners();
	    _this.coreFactory = new _core_factory2.default(_this);
	    _this.playerInfo = _player_info2.default.getInstance(_this.options.playerId);
	    _this.playerInfo.currentSize = { width: options.width, height: options.height };
	    _this.playerInfo.options = _this.options;
	    if (_this.options.parentId) {
	      _this.setParentId(_this.options.parentId);
	    } else if (_this.options.parent) {
	      _this.attachTo(_this.options.parent);
	    }
	    return _this;
	  }

	  /**
	   * Specify a `parentId` to the player.
	   * @method setParentId
	   * @param {String} parentId the element parent id.
	   */


	  Player.prototype.setParentId = function setParentId(parentId) {
	    var el = document.querySelector(parentId);
	    if (el) {
	      this.attachTo(el);
	    }
	  };

	  /**
	   * You can use this method to attach the player to a given element. You don't need to do this when you specify it during the player instantiation passing the `parentId` param.
	   * @method attachTo
	   * @param {Object} element a given element.
	   */


	  Player.prototype.attachTo = function attachTo(element) {
	    this.options.parentElement = element;
	    this.core = this.coreFactory.create();
	    this.addEventListeners();
	  };

	  Player.prototype.addEventListeners = function addEventListeners() {
	    if (!this.core.isReady) {
	      this.listenToOnce(this.core, _events2.default.CORE_READY, this.onReady);
	    } else {
	      this.onReady();
	    }
	    this.listenTo(this.core.mediaControl, _events2.default.MEDIACONTROL_CONTAINERCHANGED, this.containerChanged);
	  };

	  Player.prototype.addContainerEventListeners = function addContainerEventListeners() {
	    var container = this.core.mediaControl.container;
	    if (!!container) {
	      this.listenTo(container, _events2.default.CONTAINER_PLAY, this.onPlay);
	      this.listenTo(container, _events2.default.CONTAINER_PAUSE, this.onPause);
	      this.listenTo(container, _events2.default.CONTAINER_STOP, this.onStop);
	      this.listenTo(container, _events2.default.CONTAINER_ENDED, this.onEnded);
	      this.listenTo(container, _events2.default.CONTAINER_SEEK, this.onSeek);
	      this.listenTo(container, _events2.default.CONTAINER_ERROR, this.onError);
	      this.listenTo(container, _events2.default.CONTAINER_TIMEUPDATE, this.onTimeUpdate);
	      this.listenTo(container, _events2.default.CONTAINER_VOLUME, this.onVolumeUpdate);
	    }
	  };

	  Player.prototype.registerOptionEventListeners = function registerOptionEventListeners() {
	    var _this2 = this;

	    var eventsMapping = {
	      "onReady": _events2.default.PLAYER_READY,
	      "onResize": _events2.default.PLAYER_RESIZE,
	      "onPlay": _events2.default.PLAYER_PLAY,
	      "onPause": _events2.default.PLAYER_PAUSE,
	      "onStop": _events2.default.PLAYER_STOP,
	      "onEnded": _events2.default.PLAYER_ENDED,
	      "onSeek": _events2.default.PLAYER_SEEK,
	      "onError": _events2.default.PLAYER_ERROR,
	      "onTimeUpdate": _events2.default.PLAYER_TIMEUPDATE,
	      "onVolumeUpdate": _events2.default.PLAYER_VOLUMEUPDATE
	    };
	    var userEvents = this.options.events || {};

	    Object.keys(userEvents).forEach(function (userEvent) {
	      var eventType = eventsMapping[userEvent];
	      if (eventType) {
	        var eventFunction = userEvents[userEvent];
	        eventFunction = typeof eventFunction === "function" && eventFunction;
	        eventFunction && _this2.listenTo(_this2, eventType, eventFunction);
	      }
	    });
	  };

	  Player.prototype.containerChanged = function containerChanged() {
	    this.stopListening();
	    this.addEventListeners();
	  };

	  Player.prototype.onReady = function onReady() {
	    this.ready = true;
	    this.addContainerEventListeners();
	    this.trigger(_events2.default.PLAYER_READY);
	  };

	  Player.prototype.onVolumeUpdate = function onVolumeUpdate(volume) {
	    this.trigger(_events2.default.PLAYER_VOLUMEUPDATE, volume);
	  };

	  Player.prototype.onPlay = function onPlay() {
	    this.trigger(_events2.default.PLAYER_PLAY);
	  };

	  Player.prototype.onPause = function onPause() {
	    this.trigger(_events2.default.PLAYER_PAUSE);
	  };

	  Player.prototype.onStop = function onStop() {
	    this.trigger(_events2.default.PLAYER_STOP, this.getCurrentTime());
	  };

	  Player.prototype.onEnded = function onEnded() {
	    this.trigger(_events2.default.PLAYER_ENDED);
	  };

	  Player.prototype.onSeek = function onSeek(time) {
	    this.trigger(_events2.default.PLAYER_SEEK, time);
	  };

	  Player.prototype.onTimeUpdate = function onTimeUpdate(timeProgress) {
	    this.trigger(_events2.default.PLAYER_TIMEUPDATE, timeProgress);
	  };

	  Player.prototype.onError = function onError(error) {
	    this.trigger(_events2.default.PLAYER_ERROR, error);
	  };

	  Player.prototype.is = function is(value, type) {
	    return value.constructor === type;
	  };

	  Player.prototype.normalizeSources = function normalizeSources(options) {
	    var sources = options.sources || (options.source !== undefined ? [options.source] : []);
	    return sources.length === 0 ? [{ source: "", mimeType: "" }] : sources;
	  };

	  /**
	   * resizes the current player canvas.
	   * @method resize
	   * @param {Object} size should be a literal object with `height` and `width`.
	   * @example
	   * ```javascript
	   * player.resize({height: 360, width: 640})
	   * ```
	   */


	  Player.prototype.resize = function resize(size) {
	    this.core.resize(size);
	  };

	  /**
	   * loads a new source.
	   * @method load
	   * @param {Object} sources source or sources of video.
	   * sources can be a string or {source: <<source URL>>, mimeType: <<source mime type>>}
	   * @param {Object} mimeType a mime type, example: `'application/vnd.apple.mpegurl'`
	   *
	   */


	  Player.prototype.load = function load(sources, mimeType) {
	    this.core.load(sources, mimeType);
	  };

	  /**
	   * destroys the current player and removes it from the DOM.
	   * @method destroy
	   */


	  Player.prototype.destroy = function destroy() {
	    this.core.destroy();
	  };

	  /**
	   * plays the current video (`source`).
	   * @method play
	   */


	  Player.prototype.play = function play() {
	    this.core.mediaControl.container.play();
	  };

	  /**
	   * pauses the current video (`source`).
	   * @method pause
	   */


	  Player.prototype.pause = function pause() {
	    this.core.mediaControl.container.pause();
	  };

	  /**
	   * stops the current video (`source`).
	   * @method stop
	   */


	  Player.prototype.stop = function stop() {
	    this.core.mediaControl.container.stop();
	  };

	  /**
	   * seeks the current video (`source`). For example, `player.seek(120)` will seek to second 120 (2minutes) of the current video.
	   * @method seek
	   * @param {Number} time should be a number between 0 and the video duration.
	   */


	  Player.prototype.seek = function seek(time) {
	    this.core.mediaControl.container.seek(time);
	  };

	  /**
	   * seeks the current video (`source`). For example, `player.seek(50)` will seek to the middle of the current video.
	   * @method seekPercentage
	   * @param {Number} time should be a number between 0 and 100.
	   */


	  Player.prototype.seekPercentage = function seekPercentage(percentage) {
	    this.core.mediaControl.container.seekPercentage(percentage);
	  };

	  /**
	   * Set the volume for the current video (`source`).
	   * @method setVolume
	   * @param {Number} volume should be a number between 0 and 100, 0 being mute and 100 the max volume.
	   */


	  Player.prototype.setVolume = function setVolume(volume) {
	    this.core.mediaControl.container.setVolume(volume);
	  };

	  /**
	   * Get the volume for the current video
	   * @method getVolume
	   * @return {Number} volume should be a number between 0 and 100, 0 being mute and 100 the max volume.
	   */


	  Player.prototype.getVolume = function getVolume() {
	    return this.core.mediaControl.container.volume;
	  };

	  /**
	   * mutes the current video (`source`).
	   * @method mute
	   */


	  Player.prototype.mute = function mute() {
	    this.core.mediaControl.container.setVolume(0);
	  };

	  /**
	   * unmutes the current video (`source`).
	   * @method unmute
	   */


	  Player.prototype.unmute = function unmute() {
	    this.core.mediaControl.container.setVolume(100);
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
	   * enables to configure a player after its creation
	   * @method configure
	   * @param {Object} options all the options to change in form of a javascript object
	   */


	  Player.prototype.configure = function configure(options) {
	    this.core.configure(options);
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
	    return (0, _lodash2.default)(plugins, function (plugin) {
	      return plugin.name === name;
	    });
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.cancelAnimationFrame = exports.requestAnimationFrame = exports.Config = exports.Fullscreen = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.extend = extend;
	exports.formatTime = formatTime;
	exports.seekStringToSeconds = seekStringToSeconds;
	exports.uniqueId = uniqueId;
	exports.isNumber = isNumber;
	exports.currentScriptUrl = currentScriptUrl;
	exports.getBrowserLanguage = getBrowserLanguage;

	var _browser = __webpack_require__(3);

	var _browser2 = _interopRequireDefault(_browser);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.
	/*jshint -W079 */

	function extend(parent, properties) {
	  var pluginName = properties.name || "";

	  var MergedPlugin = function (_parent) {
	    _inherits(MergedPlugin, _parent);

	    function MergedPlugin(args) {
	      _classCallCheck(this, MergedPlugin);

	      var _this = _possibleConstructorReturn(this, _parent.call(this, args));

	      if (properties.initialize) {
	        properties.initialize.apply(_this, Array.prototype.slice.apply(arguments));
	      }
	      return _this;
	    }

	    _createClass(MergedPlugin, [{
	      key: 'name',
	      get: function get() {
	        return pluginName;
	      }
	    }]);

	    return MergedPlugin;
	  }(parent);

	  delete properties.name;
	  _clapprZepto2.default.extend(MergedPlugin.prototype, properties);
	  return MergedPlugin;
	}

	function formatTime(time, paddedHours) {
	  if (!isFinite(time)) {
	    return "--:--";
	  }
	  time = time * 1000;
	  time = parseInt(time / 1000);
	  var seconds = time % 60;
	  time = parseInt(time / 60);
	  var minutes = time % 60;
	  time = parseInt(time / 60);
	  var hours = time % 24;
	  var days = parseInt(time / 24);
	  var out = "";
	  if (days && days > 0) {
	    out += days + ":";
	    if (hours < 1) {
	      out += "00:";
	    }
	  }
	  if (hours && hours > 0 || paddedHours) {
	    out += ("0" + hours).slice(-2) + ":";
	  }
	  out += ("0" + minutes).slice(-2) + ":";
	  out += ("0" + seconds).slice(-2);
	  return out.trim();
	}

	var Fullscreen = exports.Fullscreen = {
	  isFullscreen: function isFullscreen() {
	    return document.webkitFullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || !!document.msFullscreenElement;
	  },
	  requestFullscreen: function requestFullscreen(el) {
	    if (el.requestFullscreen) {
	      el.requestFullscreen();
	    } else if (el.webkitRequestFullscreen) {
	      el.webkitRequestFullscreen();
	    } else if (el.mozRequestFullScreen) {
	      el.mozRequestFullScreen();
	    } else if (el.msRequestFullscreen) {
	      el.msRequestFullscreen();
	    } else if (el.querySelector && el.querySelector("video") && el.querySelector("video").webkitEnterFullScreen) {
	      el.querySelector("video").webkitEnterFullScreen();
	    }
	  },
	  cancelFullscreen: function cancelFullscreen() {
	    if (document.exitFullscreen) {
	      document.exitFullscreen();
	    } else if (document.webkitCancelFullScreen) {
	      document.webkitCancelFullScreen();
	    } else if (document.webkitExitFullscreen) {
	      document.webkitExitFullscreen();
	    } else if (document.mozCancelFullScreen) {
	      document.mozCancelFullScreen();
	    } else if (document.msExitFullscreen) {
	      document.msExitFullscreen();
	    }
	  }
	};

	var Config = exports.Config = function () {
	  function Config() {
	    _classCallCheck(this, Config);
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
	    if (_browser2.default.hasLocalstorage && localStorage[this._createKeyspace(key)]) {
	      return this._defaultConfig()[key].parse(localStorage[this._createKeyspace(key)]);
	    }
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

	function seekStringToSeconds(url) {
	  var parts = url.match(/t=([0-9]*)(&|\/|$)/);
	  if (parts && parts.length > 0) {
	    return parseInt(parts[1], 10);
	  } else {
	    var seconds = 0;
	    var factor = { 'h': 3600, 'm': 60, 's': 1 };
	    parts = url.match(/[0-9]+[hms]+/g) || [];
	    parts.forEach(function (el) {
	      if (el) {
	        var suffix = el[el.length - 1];
	        var time = parseInt(el.slice(0, el.length - 1), 10);
	        seconds += time * factor[suffix];
	      }
	    });
	    return seconds;
	  }
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
	  return scripts[scripts.length - 1].src;
	}

	var requestAnimationFrame = exports.requestAnimationFrame = (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
	  window.setTimeout(fn, 1000 / 60);
	}).bind(window);

	var cancelAnimationFrame = exports.cancelAnimationFrame = (window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout).bind(window);

	function getBrowserLanguage() {
	  if (window.navigator && window.navigator.language) {
	    return window.navigator.language.toLowerCase();
	  }
	  return null;
	}

	exports.default = {
	  Config: Config,
	  Fullscreen: Fullscreen,
	  extend: extend,
	  formatTime: formatTime,
	  seekStringToSeconds: seekStringToSeconds,
	  uniqueId: uniqueId,
	  currentScriptUrl: currentScriptUrl,
	  isNumber: isNumber,
	  requestAnimationFrame: requestAnimationFrame,
	  cancelAnimationFrame: cancelAnimationFrame,
	  getBrowserLanguage: getBrowserLanguage
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

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

	var getBrowserInfo = function getBrowserInfo() {
	  var ua = navigator.userAgent;
	  var parts = ua.match(/\b(playstation 4|nx|opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	  var extra;
	  if (/trident/i.test(parts[1])) {
	    extra = /\brv[ :]+(\d+)/g.exec(ua) || [];
	    return { name: 'IE', version: parseInt(extra[1] || '') };
	  } else if (parts[1] === 'Chrome') {
	    extra = ua.match(/\bOPR\/(\d+)/);
	    if (extra != null) {
	      return { name: 'Opera', version: parseInt(extra[1]) };
	    }
	  }
	  parts = parts[2] ? [parts[1], parts[2]] : [navigator.appName, navigator.appVersion, '-?'];

	  if (extra = ua.match(/version\/(\d+)/i)) {
	    parts.splice(1, 1, extra[1]);
	  }
	  return { name: parts[0], version: parseInt(parts[1]) };
	};

	var browserInfo = getBrowserInfo();

	Browser.isSafari = /safari/i.test(navigator.userAgent) && navigator.userAgent.indexOf('Chrome') === -1;
	Browser.isChrome = /chrome/i.test(navigator.userAgent);
	Browser.isFirefox = /firefox/i.test(navigator.userAgent);
	Browser.isLegacyIE = !!window.ActiveXObject;
	Browser.isIE = Browser.isLegacyIE || /trident.*rv:1\d/i.test(navigator.userAgent);
	Browser.isIE11 = /trident.*rv:11/i.test(navigator.userAgent);
	Browser.isChromecast = Browser.isChrome && /CrKey/i.test(navigator.userAgent);
	Browser.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini/i.test(navigator.userAgent);
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
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/* Zepto v1.1.4-80-ga9184b2 - zepto event ajax callbacks deferred touch selector ie - zeptojs.com/license */
	var Zepto = function () {
	  function D(t) {
	    return null == t ? String(t) : j[S.call(t)] || "object";
	  }function L(t) {
	    return "function" == D(t);
	  }function k(t) {
	    return null != t && t == t.window;
	  }function Z(t) {
	    return null != t && t.nodeType == t.DOCUMENT_NODE;
	  }function $(t) {
	    return "object" == D(t);
	  }function F(t) {
	    return $(t) && !k(t) && Object.getPrototypeOf(t) == Object.prototype;
	  }function R(t) {
	    return "number" == typeof t.length;
	  }function q(t) {
	    return s.call(t, function (t) {
	      return null != t;
	    });
	  }function W(t) {
	    return t.length > 0 ? n.fn.concat.apply([], t) : t;
	  }function z(t) {
	    return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
	  }function H(t) {
	    return t in c ? c[t] : c[t] = new RegExp("(^|\\s)" + t + "(\\s|$)");
	  }function _(t, e) {
	    return "number" != typeof e || l[z(t)] ? e : e + "px";
	  }function I(t) {
	    var e, n;return f[t] || (e = u.createElement(t), u.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), f[t] = n), f[t];
	  }function U(t) {
	    return "children" in t ? a.call(t.children) : n.map(t.childNodes, function (t) {
	      return 1 == t.nodeType ? t : void 0;
	    });
	  }function X(t, e) {
	    var n,
	        i = t ? t.length : 0;for (n = 0; i > n; n++) {
	      this[n] = t[n];
	    }this.length = i, this.selector = e || "";
	  }function B(n, i, r) {
	    for (e in i) {
	      r && (F(i[e]) || A(i[e])) ? (F(i[e]) && !F(n[e]) && (n[e] = {}), A(i[e]) && !A(n[e]) && (n[e] = []), B(n[e], i[e], r)) : i[e] !== t && (n[e] = i[e]);
	    }
	  }function V(t, e) {
	    return null == e ? n(t) : n(t).filter(e);
	  }function Y(t, e, n, i) {
	    return L(e) ? e.call(t, n, i) : e;
	  }function J(t, e, n) {
	    null == n ? t.removeAttribute(e) : t.setAttribute(e, n);
	  }function G(e, n) {
	    var i = e.className || "",
	        r = i && i.baseVal !== t;return n === t ? r ? i.baseVal : i : void (r ? i.baseVal = n : e.className = n);
	  }function K(t) {
	    try {
	      return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? n.parseJSON(t) : t) : t;
	    } catch (e) {
	      return t;
	    }
	  }function Q(t, e) {
	    e(t);for (var n = 0, i = t.childNodes.length; i > n; n++) {
	      Q(t.childNodes[n], e);
	    }
	  }var t,
	      e,
	      n,
	      i,
	      N,
	      P,
	      r = [],
	      o = r.concat,
	      s = r.filter,
	      a = r.slice,
	      u = window.document,
	      f = {},
	      c = {},
	      l = { "column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1 },
	      h = /^\s*<(\w+|!)[^>]*>/,
	      p = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	      d = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	      m = /^(?:body|html)$/i,
	      g = /([A-Z])/g,
	      v = ["val", "css", "html", "text", "data", "width", "height", "offset"],
	      y = ["after", "prepend", "before", "append"],
	      w = u.createElement("table"),
	      x = u.createElement("tr"),
	      b = { tr: u.createElement("tbody"), tbody: w, thead: w, tfoot: w, td: x, th: x, "*": u.createElement("div") },
	      E = /complete|loaded|interactive/,
	      T = /^[\w-]*$/,
	      j = {},
	      S = j.toString,
	      C = {},
	      O = u.createElement("div"),
	      M = { tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable" },
	      A = Array.isArray || function (t) {
	    return t instanceof Array;
	  };return C.matches = function (t, e) {
	    if (!e || !t || 1 !== t.nodeType) return !1;var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;if (n) return n.call(t, e);var i,
	        r = t.parentNode,
	        o = !r;return o && (r = O).appendChild(t), i = ~C.qsa(r, e).indexOf(t), o && O.removeChild(t), i;
	  }, N = function N(t) {
	    return t.replace(/-+(.)?/g, function (t, e) {
	      return e ? e.toUpperCase() : "";
	    });
	  }, P = function P(t) {
	    return s.call(t, function (e, n) {
	      return t.indexOf(e) == n;
	    });
	  }, C.fragment = function (e, i, r) {
	    var o, s, f;return p.test(e) && (o = n(u.createElement(RegExp.$1))), o || (e.replace && (e = e.replace(d, "<$1></$2>")), i === t && (i = h.test(e) && RegExp.$1), i in b || (i = "*"), f = b[i], f.innerHTML = "" + e, o = n.each(a.call(f.childNodes), function () {
	      f.removeChild(this);
	    })), F(r) && (s = n(o), n.each(r, function (t, e) {
	      v.indexOf(t) > -1 ? s[t](e) : s.attr(t, e);
	    })), o;
	  }, C.Z = function (t, e) {
	    return new X(t, e);
	  }, C.isZ = function (t) {
	    return t instanceof C.Z;
	  }, C.init = function (e, i) {
	    var r;if (!e) return C.Z();if ("string" == typeof e) {
	      if (e = e.trim(), "<" == e[0] && h.test(e)) r = C.fragment(e, RegExp.$1, i), e = null;else {
	        if (i !== t) return n(i).find(e);r = C.qsa(u, e);
	      }
	    } else {
	      if (L(e)) return n(u).ready(e);if (C.isZ(e)) return e;if (A(e)) r = q(e);else if ($(e)) r = [e], e = null;else if (h.test(e)) r = C.fragment(e.trim(), RegExp.$1, i), e = null;else {
	        if (i !== t) return n(i).find(e);r = C.qsa(u, e);
	      }
	    }return C.Z(r, e);
	  }, n = function n(t, e) {
	    return C.init(t, e);
	  }, n.extend = function (t) {
	    var e,
	        n = a.call(arguments, 1);return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function (n) {
	      B(t, n, e);
	    }), t;
	  }, C.qsa = function (t, e) {
	    var n,
	        i = "#" == e[0],
	        r = !i && "." == e[0],
	        o = i || r ? e.slice(1) : e,
	        s = T.test(o);return t.getElementById && s && i ? (n = t.getElementById(o)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType ? [] : a.call(s && !i && t.getElementsByClassName ? r ? t.getElementsByClassName(o) : t.getElementsByTagName(e) : t.querySelectorAll(e));
	  }, n.contains = u.documentElement.contains ? function (t, e) {
	    return t !== e && t.contains(e);
	  } : function (t, e) {
	    for (; e && (e = e.parentNode);) {
	      if (e === t) return !0;
	    }return !1;
	  }, n.type = D, n.isFunction = L, n.isWindow = k, n.isArray = A, n.isPlainObject = F, n.isEmptyObject = function (t) {
	    var e;for (e in t) {
	      return !1;
	    }return !0;
	  }, n.inArray = function (t, e, n) {
	    return r.indexOf.call(e, t, n);
	  }, n.camelCase = N, n.trim = function (t) {
	    return null == t ? "" : String.prototype.trim.call(t);
	  }, n.uuid = 0, n.support = {}, n.expr = {}, n.noop = function () {}, n.map = function (t, e) {
	    var n,
	        r,
	        o,
	        i = [];if (R(t)) for (r = 0; r < t.length; r++) {
	      n = e(t[r], r), null != n && i.push(n);
	    } else for (o in t) {
	      n = e(t[o], o), null != n && i.push(n);
	    }return W(i);
	  }, n.each = function (t, e) {
	    var n, i;if (R(t)) {
	      for (n = 0; n < t.length; n++) {
	        if (e.call(t[n], n, t[n]) === !1) return t;
	      }
	    } else for (i in t) {
	      if (e.call(t[i], i, t[i]) === !1) return t;
	    }return t;
	  }, n.grep = function (t, e) {
	    return s.call(t, e);
	  }, window.JSON && (n.parseJSON = JSON.parse), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
	    j["[object " + e + "]"] = e.toLowerCase();
	  }), n.fn = { constructor: C.Z, length: 0, forEach: r.forEach, reduce: r.reduce, push: r.push, sort: r.sort, splice: r.splice, indexOf: r.indexOf, concat: function concat() {
	      var t,
	          e,
	          n = [];for (t = 0; t < arguments.length; t++) {
	        e = arguments[t], n[t] = C.isZ(e) ? e.toArray() : e;
	      }return o.apply(C.isZ(this) ? this.toArray() : this, n);
	    }, map: function map(t) {
	      return n(n.map(this, function (e, n) {
	        return t.call(e, n, e);
	      }));
	    }, slice: function slice() {
	      return n(a.apply(this, arguments));
	    }, ready: function ready(t) {
	      return E.test(u.readyState) && u.body ? t(n) : u.addEventListener("DOMContentLoaded", function () {
	        t(n);
	      }, !1), this;
	    }, get: function get(e) {
	      return e === t ? a.call(this) : this[e >= 0 ? e : e + this.length];
	    }, toArray: function toArray() {
	      return this.get();
	    }, size: function size() {
	      return this.length;
	    }, remove: function remove() {
	      return this.each(function () {
	        null != this.parentNode && this.parentNode.removeChild(this);
	      });
	    }, each: function each(t) {
	      return r.every.call(this, function (e, n) {
	        return t.call(e, n, e) !== !1;
	      }), this;
	    }, filter: function filter(t) {
	      return L(t) ? this.not(this.not(t)) : n(s.call(this, function (e) {
	        return C.matches(e, t);
	      }));
	    }, add: function add(t, e) {
	      return n(P(this.concat(n(t, e))));
	    }, is: function is(t) {
	      return this.length > 0 && C.matches(this[0], t);
	    }, not: function not(e) {
	      var i = [];if (L(e) && e.call !== t) this.each(function (t) {
	        e.call(this, t) || i.push(this);
	      });else {
	        var r = "string" == typeof e ? this.filter(e) : R(e) && L(e.item) ? a.call(e) : n(e);this.forEach(function (t) {
	          r.indexOf(t) < 0 && i.push(t);
	        });
	      }return n(i);
	    }, has: function has(t) {
	      return this.filter(function () {
	        return $(t) ? n.contains(this, t) : n(this).find(t).size();
	      });
	    }, eq: function eq(t) {
	      return -1 === t ? this.slice(t) : this.slice(t, +t + 1);
	    }, first: function first() {
	      var t = this[0];return t && !$(t) ? t : n(t);
	    }, last: function last() {
	      var t = this[this.length - 1];return t && !$(t) ? t : n(t);
	    }, find: function find(t) {
	      var e,
	          i = this;return e = t ? "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? n(t).filter(function () {
	        var t = this;return r.some.call(i, function (e) {
	          return n.contains(e, t);
	        });
	      }) : 1 == this.length ? n(C.qsa(this[0], t)) : this.map(function () {
	        return C.qsa(this, t);
	      }) : n();
	    }, closest: function closest(t, e) {
	      var i = this[0],
	          r = !1;for ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && (r = n(t)); i && !(r ? r.indexOf(i) >= 0 : C.matches(i, t));) {
	        i = i !== e && !Z(i) && i.parentNode;
	      }return n(i);
	    }, parents: function parents(t) {
	      for (var e = [], i = this; i.length > 0;) {
	        i = n.map(i, function (t) {
	          return (t = t.parentNode) && !Z(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0;
	        });
	      }return V(e, t);
	    }, parent: function parent(t) {
	      return V(P(this.pluck("parentNode")), t);
	    }, children: function children(t) {
	      return V(this.map(function () {
	        return U(this);
	      }), t);
	    }, contents: function contents() {
	      return this.map(function () {
	        return this.contentDocument || a.call(this.childNodes);
	      });
	    }, siblings: function siblings(t) {
	      return V(this.map(function (t, e) {
	        return s.call(U(e.parentNode), function (t) {
	          return t !== e;
	        });
	      }), t);
	    }, empty: function empty() {
	      return this.each(function () {
	        this.innerHTML = "";
	      });
	    }, pluck: function pluck(t) {
	      return n.map(this, function (e) {
	        return e[t];
	      });
	    }, show: function show() {
	      return this.each(function () {
	        "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = I(this.nodeName));
	      });
	    }, replaceWith: function replaceWith(t) {
	      return this.before(t).remove();
	    }, wrap: function wrap(t) {
	      var e = L(t);if (this[0] && !e) var i = n(t).get(0),
	          r = i.parentNode || this.length > 1;return this.each(function (o) {
	        n(this).wrapAll(e ? t.call(this, o) : r ? i.cloneNode(!0) : i);
	      });
	    }, wrapAll: function wrapAll(t) {
	      if (this[0]) {
	        n(this[0]).before(t = n(t));for (var e; (e = t.children()).length;) {
	          t = e.first();
	        }n(t).append(this);
	      }return this;
	    }, wrapInner: function wrapInner(t) {
	      var e = L(t);return this.each(function (i) {
	        var r = n(this),
	            o = r.contents(),
	            s = e ? t.call(this, i) : t;o.length ? o.wrapAll(s) : r.append(s);
	      });
	    }, unwrap: function unwrap() {
	      return this.parent().each(function () {
	        n(this).replaceWith(n(this).children());
	      }), this;
	    }, clone: function clone() {
	      return this.map(function () {
	        return this.cloneNode(!0);
	      });
	    }, hide: function hide() {
	      return this.css("display", "none");
	    }, toggle: function toggle(e) {
	      return this.each(function () {
	        var i = n(this);(e === t ? "none" == i.css("display") : e) ? i.show() : i.hide();
	      });
	    }, prev: function prev(t) {
	      return n(this.pluck("previousElementSibling")).filter(t || "*");
	    }, next: function next(t) {
	      return n(this.pluck("nextElementSibling")).filter(t || "*");
	    }, html: function html(t) {
	      return 0 in arguments ? this.each(function (e) {
	        var i = this.innerHTML;n(this).empty().append(Y(this, t, e, i));
	      }) : 0 in this ? this[0].innerHTML : null;
	    }, text: function text(t) {
	      return 0 in arguments ? this.each(function (e) {
	        var n = Y(this, t, e, this.textContent);this.textContent = null == n ? "" : "" + n;
	      }) : 0 in this ? this[0].textContent : null;
	    }, attr: function attr(n, i) {
	      var r;return "string" != typeof n || 1 in arguments ? this.each(function (t) {
	        if (1 === this.nodeType) if ($(n)) for (e in n) {
	          J(this, e, n[e]);
	        } else J(this, n, Y(this, i, t, this.getAttribute(n)));
	      }) : this.length && 1 === this[0].nodeType ? !(r = this[0].getAttribute(n)) && n in this[0] ? this[0][n] : r : t;
	    }, removeAttr: function removeAttr(t) {
	      return this.each(function () {
	        1 === this.nodeType && t.split(" ").forEach(function (t) {
	          J(this, t);
	        }, this);
	      });
	    }, prop: function prop(t, e) {
	      return t = M[t] || t, 1 in arguments ? this.each(function (n) {
	        this[t] = Y(this, e, n, this[t]);
	      }) : this[0] && this[0][t];
	    }, data: function data(e, n) {
	      var i = "data-" + e.replace(g, "-$1").toLowerCase(),
	          r = 1 in arguments ? this.attr(i, n) : this.attr(i);return null !== r ? K(r) : t;
	    }, val: function val(t) {
	      return 0 in arguments ? this.each(function (e) {
	        this.value = Y(this, t, e, this.value);
	      }) : this[0] && (this[0].multiple ? n(this[0]).find("option").filter(function () {
	        return this.selected;
	      }).pluck("value") : this[0].value);
	    }, offset: function offset(t) {
	      if (t) return this.each(function (e) {
	        var i = n(this),
	            r = Y(this, t, e, i.offset()),
	            o = i.offsetParent().offset(),
	            s = { top: r.top - o.top, left: r.left - o.left };"static" == i.css("position") && (s.position = "relative"), i.css(s);
	      });if (!this.length) return null;if (!n.contains(u.documentElement, this[0])) return { top: 0, left: 0 };var e = this[0].getBoundingClientRect();return { left: e.left + window.pageXOffset, top: e.top + window.pageYOffset, width: Math.round(e.width), height: Math.round(e.height) };
	    }, css: function css(t, i) {
	      if (arguments.length < 2) {
	        var r,
	            o = this[0];if (!o) return;if (r = getComputedStyle(o, ""), "string" == typeof t) return o.style[N(t)] || r.getPropertyValue(t);if (A(t)) {
	          var s = {};return n.each(t, function (t, e) {
	            s[e] = o.style[N(e)] || r.getPropertyValue(e);
	          }), s;
	        }
	      }var a = "";if ("string" == D(t)) i || 0 === i ? a = z(t) + ":" + _(t, i) : this.each(function () {
	        this.style.removeProperty(z(t));
	      });else for (e in t) {
	        t[e] || 0 === t[e] ? a += z(e) + ":" + _(e, t[e]) + ";" : this.each(function () {
	          this.style.removeProperty(z(e));
	        });
	      }return this.each(function () {
	        this.style.cssText += ";" + a;
	      });
	    }, index: function index(t) {
	      return t ? this.indexOf(n(t)[0]) : this.parent().children().indexOf(this[0]);
	    }, hasClass: function hasClass(t) {
	      return t ? r.some.call(this, function (t) {
	        return this.test(G(t));
	      }, H(t)) : !1;
	    }, addClass: function addClass(t) {
	      return t ? this.each(function (e) {
	        if ("className" in this) {
	          i = [];var r = G(this),
	              o = Y(this, t, e, r);o.split(/\s+/g).forEach(function (t) {
	            n(this).hasClass(t) || i.push(t);
	          }, this), i.length && G(this, r + (r ? " " : "") + i.join(" "));
	        }
	      }) : this;
	    }, removeClass: function removeClass(e) {
	      return this.each(function (n) {
	        if ("className" in this) {
	          if (e === t) return G(this, "");i = G(this), Y(this, e, n, i).split(/\s+/g).forEach(function (t) {
	            i = i.replace(H(t), " ");
	          }), G(this, i.trim());
	        }
	      });
	    }, toggleClass: function toggleClass(e, i) {
	      return e ? this.each(function (r) {
	        var o = n(this),
	            s = Y(this, e, r, G(this));s.split(/\s+/g).forEach(function (e) {
	          (i === t ? !o.hasClass(e) : i) ? o.addClass(e) : o.removeClass(e);
	        });
	      }) : this;
	    }, scrollTop: function scrollTop(e) {
	      if (this.length) {
	        var n = "scrollTop" in this[0];return e === t ? n ? this[0].scrollTop : this[0].pageYOffset : this.each(n ? function () {
	          this.scrollTop = e;
	        } : function () {
	          this.scrollTo(this.scrollX, e);
	        });
	      }
	    }, scrollLeft: function scrollLeft(e) {
	      if (this.length) {
	        var n = "scrollLeft" in this[0];return e === t ? n ? this[0].scrollLeft : this[0].pageXOffset : this.each(n ? function () {
	          this.scrollLeft = e;
	        } : function () {
	          this.scrollTo(e, this.scrollY);
	        });
	      }
	    }, position: function position() {
	      if (this.length) {
	        var t = this[0],
	            e = this.offsetParent(),
	            i = this.offset(),
	            r = m.test(e[0].nodeName) ? { top: 0, left: 0 } : e.offset();return i.top -= parseFloat(n(t).css("margin-top")) || 0, i.left -= parseFloat(n(t).css("margin-left")) || 0, r.top += parseFloat(n(e[0]).css("border-top-width")) || 0, r.left += parseFloat(n(e[0]).css("border-left-width")) || 0, { top: i.top - r.top, left: i.left - r.left };
	      }
	    }, offsetParent: function offsetParent() {
	      return this.map(function () {
	        for (var t = this.offsetParent || u.body; t && !m.test(t.nodeName) && "static" == n(t).css("position");) {
	          t = t.offsetParent;
	        }return t;
	      });
	    } }, n.fn.detach = n.fn.remove, ["width", "height"].forEach(function (e) {
	    var i = e.replace(/./, function (t) {
	      return t[0].toUpperCase();
	    });n.fn[e] = function (r) {
	      var o,
	          s = this[0];return r === t ? k(s) ? s["inner" + i] : Z(s) ? s.documentElement["scroll" + i] : (o = this.offset()) && o[e] : this.each(function (t) {
	        s = n(this), s.css(e, Y(this, r, t, s[e]()));
	      });
	    };
	  }), y.forEach(function (t, e) {
	    var i = e % 2;n.fn[t] = function () {
	      var t,
	          o,
	          r = n.map(arguments, function (e) {
	        return t = D(e), "object" == t || "array" == t || null == e ? e : C.fragment(e);
	      }),
	          s = this.length > 1;return r.length < 1 ? this : this.each(function (t, a) {
	        o = i ? a : a.parentNode, a = 0 == e ? a.nextSibling : 1 == e ? a.firstChild : 2 == e ? a : null;var f = n.contains(u.documentElement, o);r.forEach(function (t) {
	          if (s) t = t.cloneNode(!0);else if (!o) return n(t).remove();o.insertBefore(t, a), f && Q(t, function (t) {
	            null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML);
	          });
	        });
	      });
	    }, n.fn[i ? t + "To" : "insert" + (e ? "Before" : "After")] = function (e) {
	      return n(e)[t](this), this;
	    };
	  }), C.Z.prototype = X.prototype = n.fn, C.uniq = P, C.deserializeValue = K, n.zepto = C, n;
	}();window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto), function (t) {
	  function l(t) {
	    return t._zid || (t._zid = e++);
	  }function h(t, e, n, i) {
	    if (e = p(e), e.ns) var r = d(e.ns);return (s[l(t)] || []).filter(function (t) {
	      return !(!t || e.e && t.e != e.e || e.ns && !r.test(t.ns) || n && l(t.fn) !== l(n) || i && t.sel != i);
	    });
	  }function p(t) {
	    var e = ("" + t).split(".");return { e: e[0], ns: e.slice(1).sort().join(" ") };
	  }function d(t) {
	    return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)");
	  }function m(t, e) {
	    return t.del && !u && t.e in f || !!e;
	  }function g(t) {
	    return c[t] || u && f[t] || t;
	  }function v(e, i, r, o, a, u, f) {
	    var h = l(e),
	        d = s[h] || (s[h] = []);i.split(/\s/).forEach(function (i) {
	      if ("ready" == i) return t(document).ready(r);var s = p(i);s.fn = r, s.sel = a, s.e in c && (r = function r(e) {
	        var n = e.relatedTarget;return !n || n !== this && !t.contains(this, n) ? s.fn.apply(this, arguments) : void 0;
	      }), s.del = u;var l = u || r;s.proxy = function (t) {
	        if (t = T(t), !t.isImmediatePropagationStopped()) {
	          t.data = o;var i = l.apply(e, t._args == n ? [t] : [t].concat(t._args));return i === !1 && (t.preventDefault(), t.stopPropagation()), i;
	        }
	      }, s.i = d.length, d.push(s), "addEventListener" in e && e.addEventListener(g(s.e), s.proxy, m(s, f));
	    });
	  }function y(t, e, n, i, r) {
	    var o = l(t);(e || "").split(/\s/).forEach(function (e) {
	      h(t, e, n, i).forEach(function (e) {
	        delete s[o][e.i], "removeEventListener" in t && t.removeEventListener(g(e.e), e.proxy, m(e, r));
	      });
	    });
	  }function T(e, i) {
	    return (i || !e.isDefaultPrevented) && (i || (i = e), t.each(E, function (t, n) {
	      var r = i[t];e[t] = function () {
	        return this[n] = w, r && r.apply(i, arguments);
	      }, e[n] = x;
	    }), (i.defaultPrevented !== n ? i.defaultPrevented : "returnValue" in i ? i.returnValue === !1 : i.getPreventDefault && i.getPreventDefault()) && (e.isDefaultPrevented = w)), e;
	  }function j(t) {
	    var e,
	        i = { originalEvent: t };for (e in t) {
	      b.test(e) || t[e] === n || (i[e] = t[e]);
	    }return T(i, t);
	  }var n,
	      e = 1,
	      i = Array.prototype.slice,
	      r = t.isFunction,
	      o = function o(t) {
	    return "string" == typeof t;
	  },
	      s = {},
	      a = {},
	      u = "onfocusin" in window,
	      f = { focus: "focusin", blur: "focusout" },
	      c = { mouseenter: "mouseover", mouseleave: "mouseout" };a.click = a.mousedown = a.mouseup = a.mousemove = "MouseEvents", t.event = { add: v, remove: y }, t.proxy = function (e, n) {
	    var s = 2 in arguments && i.call(arguments, 2);if (r(e)) {
	      var a = function a() {
	        return e.apply(n, s ? s.concat(i.call(arguments)) : arguments);
	      };return a._zid = l(e), a;
	    }if (o(n)) return s ? (s.unshift(e[n], e), t.proxy.apply(null, s)) : t.proxy(e[n], e);throw new TypeError("expected function");
	  }, t.fn.bind = function (t, e, n) {
	    return this.on(t, e, n);
	  }, t.fn.unbind = function (t, e) {
	    return this.off(t, e);
	  }, t.fn.one = function (t, e, n, i) {
	    return this.on(t, e, n, i, 1);
	  };var w = function w() {
	    return !0;
	  },
	      x = function x() {
	    return !1;
	  },
	      b = /^([A-Z]|returnValue$|layer[XY]$)/,
	      E = { preventDefault: "isDefaultPrevented", stopImmediatePropagation: "isImmediatePropagationStopped", stopPropagation: "isPropagationStopped" };t.fn.delegate = function (t, e, n) {
	    return this.on(e, t, n);
	  }, t.fn.undelegate = function (t, e, n) {
	    return this.off(e, t, n);
	  }, t.fn.live = function (e, n) {
	    return t(document.body).delegate(this.selector, e, n), this;
	  }, t.fn.die = function (e, n) {
	    return t(document.body).undelegate(this.selector, e, n), this;
	  }, t.fn.on = function (e, s, a, u, f) {
	    var c,
	        l,
	        h = this;return e && !o(e) ? (t.each(e, function (t, e) {
	      h.on(t, s, a, e, f);
	    }), h) : (o(s) || r(u) || u === !1 || (u = a, a = s, s = n), (u === n || a === !1) && (u = a, a = n), u === !1 && (u = x), h.each(function (n, r) {
	      f && (c = function c(t) {
	        return y(r, t.type, u), u.apply(this, arguments);
	      }), s && (l = function l(e) {
	        var n,
	            o = t(e.target).closest(s, r).get(0);return o && o !== r ? (n = t.extend(j(e), { currentTarget: o, liveFired: r }), (c || u).apply(o, [n].concat(i.call(arguments, 1)))) : void 0;
	      }), v(r, e, u, a, s, l || c);
	    }));
	  }, t.fn.off = function (e, i, s) {
	    var a = this;return e && !o(e) ? (t.each(e, function (t, e) {
	      a.off(t, i, e);
	    }), a) : (o(i) || r(s) || s === !1 || (s = i, i = n), s === !1 && (s = x), a.each(function () {
	      y(this, e, s, i);
	    }));
	  }, t.fn.trigger = function (e, n) {
	    return e = o(e) || t.isPlainObject(e) ? t.Event(e) : T(e), e._args = n, this.each(function () {
	      e.type in f && "function" == typeof this[e.type] ? this[e.type]() : "dispatchEvent" in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n);
	    });
	  }, t.fn.triggerHandler = function (e, n) {
	    var i, r;return this.each(function (s, a) {
	      i = j(o(e) ? t.Event(e) : e), i._args = n, i.target = a, t.each(h(a, e.type || e), function (t, e) {
	        return r = e.proxy(i), i.isImmediatePropagationStopped() ? !1 : void 0;
	      });
	    }), r;
	  }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (e) {
	    t.fn[e] = function (t) {
	      return 0 in arguments ? this.bind(e, t) : this.trigger(e);
	    };
	  }), t.Event = function (t, e) {
	    o(t) || (e = t, t = e.type);var n = document.createEvent(a[t] || "Events"),
	        i = !0;if (e) for (var r in e) {
	      "bubbles" == r ? i = !!e[r] : n[r] = e[r];
	    }return n.initEvent(t, i, !0), T(n);
	  };
	}(Zepto), function (t) {
	  function h(e, n, i) {
	    var r = t.Event(n);return t(e).trigger(r, i), !r.isDefaultPrevented();
	  }function p(t, e, i, r) {
	    return t.global ? h(e || n, i, r) : void 0;
	  }function d(e) {
	    e.global && 0 === t.active++ && p(e, null, "ajaxStart");
	  }function m(e) {
	    e.global && ! --t.active && p(e, null, "ajaxStop");
	  }function g(t, e) {
	    var n = e.context;return e.beforeSend.call(n, t, e) === !1 || p(e, n, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void p(e, n, "ajaxSend", [t, e]);
	  }function v(t, e, n, i) {
	    var r = n.context,
	        o = "success";n.success.call(r, t, o, e), i && i.resolveWith(r, [t, o, e]), p(n, r, "ajaxSuccess", [e, n, t]), w(o, e, n);
	  }function y(t, e, n, i, r) {
	    var o = i.context;i.error.call(o, n, e, t), r && r.rejectWith(o, [n, e, t]), p(i, o, "ajaxError", [n, i, t || e]), w(e, n, i);
	  }function w(t, e, n) {
	    var i = n.context;n.complete.call(i, e, t), p(n, i, "ajaxComplete", [e, n]), m(n);
	  }function x() {}function b(t) {
	    return t && (t = t.split(";", 2)[0]), t && (t == f ? "html" : t == u ? "json" : s.test(t) ? "script" : a.test(t) && "xml") || "text";
	  }function E(t, e) {
	    return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?");
	  }function T(e) {
	    e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = E(e.url, e.data), e.data = void 0);
	  }function j(e, n, i, r) {
	    return t.isFunction(n) && (r = i, i = n, n = void 0), t.isFunction(i) || (r = i, i = void 0), { url: e, data: n, success: i, dataType: r };
	  }function C(e, n, i, r) {
	    var o,
	        s = t.isArray(n),
	        a = t.isPlainObject(n);t.each(n, function (n, u) {
	      o = t.type(u), r && (n = i ? r : r + "[" + (a || "object" == o || "array" == o ? n : "") + "]"), !r && s ? e.add(u.name, u.value) : "array" == o || !i && "object" == o ? C(e, u, i, n) : e.add(n, u);
	    });
	  }var i,
	      r,
	      e = 0,
	      n = window.document,
	      o = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	      s = /^(?:text|application)\/javascript/i,
	      a = /^(?:text|application)\/xml/i,
	      u = "application/json",
	      f = "text/html",
	      c = /^\s*$/,
	      l = n.createElement("a");l.href = window.location.href, t.active = 0, t.ajaxJSONP = function (i, r) {
	    if (!("type" in i)) return t.ajax(i);var f,
	        h,
	        o = i.jsonpCallback,
	        s = (t.isFunction(o) ? o() : o) || "jsonp" + ++e,
	        a = n.createElement("script"),
	        u = window[s],
	        c = function c(e) {
	      t(a).triggerHandler("error", e || "abort");
	    },
	        l = { abort: c };return r && r.promise(l), t(a).on("load error", function (e, n) {
	      clearTimeout(h), t(a).off().remove(), "error" != e.type && f ? v(f[0], l, i, r) : y(null, n || "error", l, i, r), window[s] = u, f && t.isFunction(u) && u(f[0]), u = f = void 0;
	    }), g(l, i) === !1 ? (c("abort"), l) : (window[s] = function () {
	      f = arguments;
	    }, a.src = i.url.replace(/\?(.+)=\?/, "?$1=" + s), n.head.appendChild(a), i.timeout > 0 && (h = setTimeout(function () {
	      c("timeout");
	    }, i.timeout)), l);
	  }, t.ajaxSettings = { type: "GET", beforeSend: x, success: x, error: x, complete: x, context: null, global: !0, xhr: function xhr() {
	      return new window.XMLHttpRequest();
	    }, accepts: { script: "text/javascript, application/javascript, application/x-javascript", json: u, xml: "application/xml, text/xml", html: f, text: "text/plain" }, crossDomain: !1, timeout: 0, processData: !0, cache: !0 }, t.ajax = function (e) {
	    var a,
	        u,
	        o = t.extend({}, e || {}),
	        s = t.Deferred && t.Deferred();for (i in t.ajaxSettings) {
	      void 0 === o[i] && (o[i] = t.ajaxSettings[i]);
	    }d(o), o.crossDomain || (a = n.createElement("a"), a.href = o.url, a.href = a.href, o.crossDomain = l.protocol + "//" + l.host != a.protocol + "//" + a.host), o.url || (o.url = window.location.toString()), (u = o.url.indexOf("#")) > -1 && (o.url = o.url.slice(0, u)), T(o);var f = o.dataType,
	        h = /\?.+=\?/.test(o.url);if (h && (f = "jsonp"), o.cache !== !1 && (e && e.cache === !0 || "script" != f && "jsonp" != f) || (o.url = E(o.url, "_=" + Date.now())), "jsonp" == f) return h || (o.url = E(o.url, o.jsonp ? o.jsonp + "=?" : o.jsonp === !1 ? "" : "callback=?")), t.ajaxJSONP(o, s);var N,
	        p = o.accepts[f],
	        m = {},
	        w = function w(t, e) {
	      m[t.toLowerCase()] = [t, e];
	    },
	        j = /^([\w-]+:)\/\//.test(o.url) ? RegExp.$1 : window.location.protocol,
	        S = o.xhr(),
	        C = S.setRequestHeader;if (s && s.promise(S), o.crossDomain || w("X-Requested-With", "XMLHttpRequest"), w("Accept", p || "*/*"), (p = o.mimeType || p) && (p.indexOf(",") > -1 && (p = p.split(",", 2)[0]), S.overrideMimeType && S.overrideMimeType(p)), (o.contentType || o.contentType !== !1 && o.data && "GET" != o.type.toUpperCase()) && w("Content-Type", o.contentType || "application/x-www-form-urlencoded"), o.headers) for (r in o.headers) {
	      w(r, o.headers[r]);
	    }if (S.setRequestHeader = w, S.onreadystatechange = function () {
	      if (4 == S.readyState) {
	        S.onreadystatechange = x, clearTimeout(N);var e,
	            n = !1;if (S.status >= 200 && S.status < 300 || 304 == S.status || 0 == S.status && "file:" == j) {
	          f = f || b(o.mimeType || S.getResponseHeader("content-type")), e = S.responseText;try {
	            "script" == f ? (1, eval)(e) : "xml" == f ? e = S.responseXML : "json" == f && (e = c.test(e) ? null : t.parseJSON(e));
	          } catch (i) {
	            n = i;
	          }n ? y(n, "parsererror", S, o, s) : v(e, S, o, s);
	        } else y(S.statusText || null, S.status ? "error" : "abort", S, o, s);
	      }
	    }, g(S, o) === !1) return S.abort(), y(null, "abort", S, o, s), S;if (o.xhrFields) for (r in o.xhrFields) {
	      S[r] = o.xhrFields[r];
	    }var P = "async" in o ? o.async : !0;S.open(o.type, o.url, P, o.username, o.password);for (r in m) {
	      C.apply(S, m[r]);
	    }return o.timeout > 0 && (N = setTimeout(function () {
	      S.onreadystatechange = x, S.abort(), y(null, "timeout", S, o, s);
	    }, o.timeout)), S.send(o.data ? o.data : null), S;
	  }, t.get = function () {
	    return t.ajax(j.apply(null, arguments));
	  }, t.post = function () {
	    var e = j.apply(null, arguments);return e.type = "POST", t.ajax(e);
	  }, t.getJSON = function () {
	    var e = j.apply(null, arguments);return e.dataType = "json", t.ajax(e);
	  }, t.fn.load = function (e, n, i) {
	    if (!this.length) return this;var a,
	        r = this,
	        s = e.split(/\s/),
	        u = j(e, n, i),
	        f = u.success;return s.length > 1 && (u.url = s[0], a = s[1]), u.success = function (e) {
	      r.html(a ? t("<div>").html(e.replace(o, "")).find(a) : e), f && f.apply(r, arguments);
	    }, t.ajax(u), this;
	  };var S = encodeURIComponent;t.param = function (e, n) {
	    var i = [];return i.add = function (e, n) {
	      t.isFunction(n) && (n = n()), null == n && (n = ""), this.push(S(e) + "=" + S(n));
	    }, C(i, e, n), i.join("&").replace(/%20/g, "+");
	  };
	}(Zepto), function (t) {
	  t.Callbacks = function (e) {
	    e = t.extend({}, e);var n,
	        i,
	        r,
	        o,
	        s,
	        a,
	        u = [],
	        f = !e.once && [],
	        c = function c(t) {
	      for (n = e.memory && t, i = !0, a = o || 0, o = 0, s = u.length, r = !0; u && s > a; ++a) {
	        if (u[a].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
	          n = !1;break;
	        }
	      }r = !1, u && (f ? f.length && c(f.shift()) : n ? u.length = 0 : l.disable());
	    },
	        l = { add: function add() {
	        if (u) {
	          var i = u.length,
	              a = function a(n) {
	            t.each(n, function (t, n) {
	              "function" == typeof n ? e.unique && l.has(n) || u.push(n) : n && n.length && "string" != typeof n && a(n);
	            });
	          };a(arguments), r ? s = u.length : n && (o = i, c(n));
	        }return this;
	      }, remove: function remove() {
	        return u && t.each(arguments, function (e, n) {
	          for (var i; (i = t.inArray(n, u, i)) > -1;) {
	            u.splice(i, 1), r && (s >= i && --s, a >= i && --a);
	          }
	        }), this;
	      }, has: function has(e) {
	        return !(!u || !(e ? t.inArray(e, u) > -1 : u.length));
	      }, empty: function empty() {
	        return s = u.length = 0, this;
	      }, disable: function disable() {
	        return u = f = n = void 0, this;
	      }, disabled: function disabled() {
	        return !u;
	      }, lock: function lock() {
	        return f = void 0, n || l.disable(), this;
	      }, locked: function locked() {
	        return !f;
	      }, fireWith: function fireWith(t, e) {
	        return !u || i && !f || (e = e || [], e = [t, e.slice ? e.slice() : e], r ? f.push(e) : c(e)), this;
	      }, fire: function fire() {
	        return l.fireWith(this, arguments);
	      }, fired: function fired() {
	        return !!i;
	      } };return l;
	  };
	}(Zepto), function (t) {
	  function n(e) {
	    var i = [["resolve", "done", t.Callbacks({ once: 1, memory: 1 }), "resolved"], ["reject", "fail", t.Callbacks({ once: 1, memory: 1 }), "rejected"], ["notify", "progress", t.Callbacks({ memory: 1 })]],
	        r = "pending",
	        o = { state: function state() {
	        return r;
	      }, always: function always() {
	        return s.done(arguments).fail(arguments), this;
	      }, then: function then() {
	        var e = arguments;return n(function (n) {
	          t.each(i, function (i, r) {
	            var a = t.isFunction(e[i]) && e[i];s[r[1]](function () {
	              var e = a && a.apply(this, arguments);if (e && t.isFunction(e.promise)) e.promise().done(n.resolve).fail(n.reject).progress(n.notify);else {
	                var i = this === o ? n.promise() : this,
	                    s = a ? [e] : arguments;n[r[0] + "With"](i, s);
	              }
	            });
	          }), e = null;
	        }).promise();
	      }, promise: function promise(e) {
	        return null != e ? t.extend(e, o) : o;
	      } },
	        s = {};return t.each(i, function (t, e) {
	      var n = e[2],
	          a = e[3];o[e[1]] = n.add, a && n.add(function () {
	        r = a;
	      }, i[1 ^ t][2].disable, i[2][2].lock), s[e[0]] = function () {
	        return s[e[0] + "With"](this === s ? o : this, arguments), this;
	      }, s[e[0] + "With"] = n.fireWith;
	    }), o.promise(s), e && e.call(s, s), s;
	  }var e = Array.prototype.slice;t.when = function (i) {
	    var f,
	        c,
	        l,
	        r = e.call(arguments),
	        o = r.length,
	        s = 0,
	        a = 1 !== o || i && t.isFunction(i.promise) ? o : 0,
	        u = 1 === a ? i : n(),
	        h = function h(t, n, i) {
	      return function (r) {
	        n[t] = this, i[t] = arguments.length > 1 ? e.call(arguments) : r, i === f ? u.notifyWith(n, i) : --a || u.resolveWith(n, i);
	      };
	    };if (o > 1) for (f = new Array(o), c = new Array(o), l = new Array(o); o > s; ++s) {
	      r[s] && t.isFunction(r[s].promise) ? r[s].promise().done(h(s, l, r)).fail(u.reject).progress(h(s, c, f)) : --a;
	    }return a || u.resolveWith(l, r), u.promise();
	  }, t.Deferred = n;
	}(Zepto), function (t) {
	  function u(t, e, n, i) {
	    return Math.abs(t - e) >= Math.abs(n - i) ? t - e > 0 ? "Left" : "Right" : n - i > 0 ? "Up" : "Down";
	  }function f() {
	    o = null, e.last && (e.el.trigger("longTap"), e = {});
	  }function c() {
	    o && clearTimeout(o), o = null;
	  }function l() {
	    n && clearTimeout(n), i && clearTimeout(i), r && clearTimeout(r), o && clearTimeout(o), n = i = r = o = null, e = {};
	  }function h(t) {
	    return ("touch" == t.pointerType || t.pointerType == t.MSPOINTER_TYPE_TOUCH) && t.isPrimary;
	  }function p(t, e) {
	    return t.type == "pointer" + e || t.type.toLowerCase() == "mspointer" + e;
	  }var n,
	      i,
	      r,
	      o,
	      a,
	      e = {},
	      s = 750;t(document).ready(function () {
	    var d,
	        m,
	        y,
	        w,
	        g = 0,
	        v = 0;"MSGesture" in window && (a = new MSGesture(), a.target = document.body), t(document).bind("MSGestureEnd", function (t) {
	      var n = t.velocityX > 1 ? "Right" : t.velocityX < -1 ? "Left" : t.velocityY > 1 ? "Down" : t.velocityY < -1 ? "Up" : null;n && (e.el.trigger("swipe"), e.el.trigger("swipe" + n));
	    }).on("touchstart MSPointerDown pointerdown", function (i) {
	      (!(w = p(i, "down")) || h(i)) && (y = w ? i : i.touches[0], i.touches && 1 === i.touches.length && e.x2 && (e.x2 = void 0, e.y2 = void 0), d = Date.now(), m = d - (e.last || d), e.el = t("tagName" in y.target ? y.target : y.target.parentNode), n && clearTimeout(n), e.x1 = y.pageX, e.y1 = y.pageY, m > 0 && 250 >= m && (e.isDoubleTap = !0), e.last = d, o = setTimeout(f, s), a && w && a.addPointer(i.pointerId));
	    }).on("touchmove MSPointerMove pointermove", function (t) {
	      (!(w = p(t, "move")) || h(t)) && (y = w ? t : t.touches[0], c(), e.x2 = y.pageX, e.y2 = y.pageY, g += Math.abs(e.x1 - e.x2), v += Math.abs(e.y1 - e.y2));
	    }).on("touchend MSPointerUp pointerup", function (o) {
	      (!(w = p(o, "up")) || h(o)) && (c(), e.x2 && Math.abs(e.x1 - e.x2) > 30 || e.y2 && Math.abs(e.y1 - e.y2) > 30 ? r = setTimeout(function () {
	        e.el.trigger("swipe"), e.el.trigger("swipe" + u(e.x1, e.x2, e.y1, e.y2)), e = {};
	      }, 0) : "last" in e && (30 > g && 30 > v ? i = setTimeout(function () {
	        var i = t.Event("tap");i.cancelTouch = l, e.el.trigger(i), e.isDoubleTap ? (e.el && e.el.trigger("doubleTap"), e = {}) : n = setTimeout(function () {
	          n = null, e.el && e.el.trigger("singleTap"), e = {};
	        }, 250);
	      }, 0) : e = {}), g = v = 0);
	    }).on("touchcancel MSPointerCancel pointercancel", l), t(window).on("scroll", l);
	  }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function (e) {
	    t.fn[e] = function (t) {
	      return this.on(e, t);
	    };
	  });
	}(Zepto), function (t) {
	  function r(e) {
	    return e = t(e), !(!e.width() && !e.height()) && "none" !== e.css("display");
	  }function f(t, e) {
	    t = t.replace(/=#\]/g, '="#"]');var n,
	        i,
	        r = s.exec(t);if (r && r[2] in o && (n = o[r[2]], i = r[3], t = r[1], i)) {
	      var a = Number(i);i = isNaN(a) ? i.replace(/^["']|["']$/g, "") : a;
	    }return e(t, n, i);
	  }var e = t.zepto,
	      n = e.qsa,
	      i = e.matches,
	      o = t.expr[":"] = { visible: function visible() {
	      return r(this) ? this : void 0;
	    }, hidden: function hidden() {
	      return r(this) ? void 0 : this;
	    }, selected: function selected() {
	      return this.selected ? this : void 0;
	    }, checked: function checked() {
	      return this.checked ? this : void 0;
	    }, parent: function parent() {
	      return this.parentNode;
	    }, first: function first(t) {
	      return 0 === t ? this : void 0;
	    }, last: function last(t, e) {
	      return t === e.length - 1 ? this : void 0;
	    }, eq: function eq(t, e, n) {
	      return t === n ? this : void 0;
	    }, contains: function contains(e, n, i) {
	      return t(this).text().indexOf(i) > -1 ? this : void 0;
	    }, has: function has(t, n, i) {
	      return e.qsa(this, i).length ? this : void 0;
	    } },
	      s = new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),
	      a = /^\s*>/,
	      u = "Zepto" + +new Date();e.qsa = function (i, r) {
	    return f(r, function (o, s, f) {
	      try {
	        var c;!o && s ? o = "*" : a.test(o) && (c = t(i).addClass(u), o = "." + u + " " + o);var l = n(i, o);
	      } catch (h) {
	        throw console.error("error performing selector: %o", r), h;
	      } finally {
	        c && c.removeClass(u);
	      }return s ? e.uniq(t.map(l, function (t, e) {
	        return s.call(t, e, l, f);
	      })) : l;
	    });
	  }, e.matches = function (t, e) {
	    return f(e, function (e, n, r) {
	      return !(e && !i(t, e) || n && n.call(t, null, r) !== t);
	    });
	  };
	}(Zepto), function () {
	  try {
	    getComputedStyle(void 0);
	  } catch (t) {
	    var e = getComputedStyle;window.getComputedStyle = function (t) {
	      try {
	        return e(t);
	      } catch (n) {
	        return null;
	      }
	    };
	  }
	}();
	module.exports = Zepto;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(2);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	/**
	 * @class BaseObject
	 * @constructor
	 * @extends Events
	 * @module base
	 */

	var BaseObject = function (_Events) {
	  _inherits(BaseObject, _Events);

	  /**
	   * @method constructor
	   * @param {Object} options
	   */

	  function BaseObject() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, BaseObject);

	    var _this = _possibleConstructorReturn(this, _Events.call(this, options));

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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var _log = __webpack_require__(7);

	var _log2 = _interopRequireDefault(_log);

	var _utils = __webpack_require__(2);

	var _lodash = __webpack_require__(10);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var slice = Array.prototype.slice;

	var eventSplitter = /\s+/;

	var eventsApi = function eventsApi(obj, action, name, rest) {
	  if (!name) {
	    return true;
	  }

	  // Handle event maps.
	  if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
	    for (var key in name) {
	      obj[action].apply(obj, [key, name[key]].concat(rest));
	    }
	    return false;
	  }

	  // Handle space separated event names.
	  if (eventSplitter.test(name)) {
	    var names = name.split(eventSplitter);
	    for (var i = 0, l = names.length; i < l; i++) {
	      obj[action].apply(obj, [names[i]].concat(rest));
	    }
	    return false;
	  }

	  return true;
	};

	var triggerEvents = function triggerEvents(events, args) {
	  var ev,
	      i = -1,
	      l = events.length,
	      a1 = args[0],
	      a2 = args[1],
	      a3 = args[2];
	  switch (args.length) {
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
	};

	/**
	 * @class Events
	 * @constructor
	 * @module base
	 */

	var Events = function () {
	  function Events() {
	    _classCallCheck(this, Events);
	  }

	  /**
	   * listen to an event indefinitely, if you want to stop you need to call `off`
	   * @method on
	   * @param {String} name
	   * @param {Function} callback
	   * @param {Object} context
	   */

	  Events.prototype.on = function on(name, callback, context) {
	    if (!eventsApi(this, 'on', name, [callback, context]) || !callback) {
	      return this;
	    }
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
	    if (!eventsApi(this, 'once', name, [callback, context]) || !callback) {
	      return this;
	    }
	    var self = this;
	    var once = (0, _lodash2.default)(function () {
	      self.off(name, once);
	      callback.apply(this, arguments);
	    });
	    once._callback = callback;
	    return this.on(name, once, context);
	  };

	  /**
	   * stop listening to an event
	   * @method off
	   * @param {String} name
	   * @param {Function} callback
	   * @param {Object} context
	   */


	  Events.prototype.off = function off(name, callback, context) {
	    var retain, ev, events, names, i, l, j, k;
	    if (!this._events || !eventsApi(this, 'off', name, [callback, context])) {
	      return this;
	    }
	    if (!name && !callback && !context) {
	      this._events = void 0;
	      return this;
	    }
	    names = name ? [name] : Object.keys(this._events);
	    // jshint maxdepth:5
	    for (i = 0, l = names.length; i < l; i++) {
	      name = names[i];
	      events = this._events[name];
	      if (events) {
	        this._events[name] = retain = [];
	        if (callback || context) {
	          for (j = 0, k = events.length; j < k; j++) {
	            ev = events[j];
	            if (callback && callback !== ev.callback && callback !== ev.callback._callback || context && context !== ev.context) {
	              retain.push(ev);
	            }
	          }
	        }
	        if (!retain.length) {
	          delete this._events[name];
	        }
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
	    try {
	      _log2.default.debug.apply(_log2.default, [klass].concat(Array.prototype.slice.call(arguments)));
	      if (!this._events) {
	        return this;
	      }
	      var args = slice.call(arguments, 1);
	      if (!eventsApi(this, 'trigger', name, args)) {
	        return this;
	      }
	      var events = this._events[name];
	      var allEvents = this._events.all;
	      if (events) {
	        triggerEvents(events, args);
	      }
	      if (allEvents) {
	        triggerEvents(allEvents, arguments);
	      }
	    } catch (exception) {
	      _log2.default.error.apply(_log2.default, [klass, 'error on event', name, 'trigger', '-', exception]);
	    }
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
	    if (!listeningTo) {
	      return this;
	    }
	    var remove = !name && !callback;
	    if (!callback && (typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
	      callback = this;
	    }
	    if (obj) {
	      (listeningTo = {})[obj._listenId] = obj;
	    }
	    for (var id in listeningTo) {
	      obj = listeningTo[id];
	      obj.off(name, callback, this);
	      if (remove || Object.keys(obj._events).length === 0) {
	        delete this._listeningTo[id];
	      }
	    }
	    return this;
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

	Object.keys(listenMethods).forEach(function (method) {
	  Events.prototype[method] = function (obj, name, callback) {
	    var listeningTo = this._listeningTo || (this._listeningTo = {});
	    var id = obj._listenId || (obj._listenId = (0, _utils.uniqueId)('l'));
	    listeningTo[id] = obj;
	    if (!callback && (typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
	      callback = this;
	    }
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

	// Playback Events
	/**
	 * Fired when the playback is downloading the media
	 *
	 * @event PLAYBACK_PROGRESS
	 * @param {Object} progress Data
	 * progress object
	 * @param {Number} [progress.start]
	 * initial downloaded content
	 * @param {Number} [progress.current]
	 * current dowloaded content
	 * @param {Number} [progress.total]
	 * total content to be downloaded
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

	// Core Events
	Events.CORE_CONTAINERS_CREATED = 'core:containers:created';
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(8);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _kibo = __webpack_require__(9);

	var _kibo2 = _interopRequireDefault(_kibo);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var BOLD = 'font-weight: bold; font-size: 13px;';
	var INFO = 'color: #006600;' + BOLD;
	var DEBUG = 'color: #0000ff;' + BOLD;
	var WARN = 'color: #ff8000;' + BOLD;
	var ERROR = 'color: #ff0000;' + BOLD;

	var LEVEL_DEBUG = 0;
	var LEVEL_INFO = 1;
	var LEVEL_WARN = 2;
	var LEVEL_ERROR = 3;
	var LEVEL_DISABLED = 4;

	var COLORS = [DEBUG, INFO, WARN, ERROR, ERROR];
	var DESCRIPTIONS = ['debug', 'info', 'warn', 'error', 'disabled'];

	var Log = function () {
	  function Log() {
	    var _this = this;

	    var level = arguments.length <= 0 || arguments[0] === undefined ? LEVEL_INFO : arguments[0];
	    var offLevel = arguments.length <= 1 || arguments[1] === undefined ? LEVEL_DISABLED : arguments[1];

	    _classCallCheck(this, Log);

	    this.kibo = new _kibo2.default();
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
	    if (window.console && window.console.log) {
	      console.log("%c[Clappr.Log] set log level to " + DESCRIPTIONS[this.level], WARN);
	    }
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
	    var klassDescription = "";
	    var color = COLORS[level];
	    if (klass) {
	      klassDescription = "[" + klass + "]";
	    }
	    if (window.console && window.console.log) {
	      console.log.apply(console, ["%c[" + DESCRIPTIONS[level] + "]" + klassDescription, color].concat(message));
	    }
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

	Log.debug = function (klass) {
	  this.getInstance().debug.apply(this.getInstance(), arguments);
	};
	Log.info = function (klass) {
	  this.getInstance().info.apply(this.getInstance(), arguments);
	};
	Log.warn = function (klass) {
	  this.getInstance().warn.apply(this.getInstance(), arguments);
	};
	Log.error = function (klass) {
	  this.getInstance().error.apply(this.getInstance(), arguments);
	};
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * lodash 4.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var before = __webpack_require__(11);

	/**
	 * Creates a function that is restricted to invoking `func` once. Repeat calls
	 * to the function return the value of the first invocation. The `func` is
	 * invoked with the `this` binding and arguments of the created function.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new restricted function.
	 * @example
	 *
	 * var initialize = _.once(createApplication);
	 * initialize();
	 * initialize();
	 * // `initialize` invokes `createApplication` once
	 */
	function once(func) {
	  return before(2, func);
	}

	module.exports = once;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * lodash 4.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308,
	    NAN = 0 / 0;

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Creates a function that invokes `func`, with the `this` binding and arguments
	 * of the created function, while it's called less than `n` times. Subsequent
	 * calls to the created function return the result of the last `func` invocation.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {number} n The number of calls at which `func` is no longer invoked.
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new restricted function.
	 * @example
	 *
	 * jQuery(element).on('click', _.before(5, addContactToList));
	 * // => allows adding up to 4 contacts to the list
	 */
	function before(n, func) {
	  var result;
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  n = toInteger(n);
	  return function () {
	    if (--n > 0) {
	      result = func.apply(this, arguments);
	    }
	    if (n <= 1) {
	      func = undefined;
	    }
	    return result;
	  };
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array constructors, and
	  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3');
	 * // => 3
	 */
	function toInteger(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = value < 0 ? -1 : 1;
	    return sign * MAX_INTEGER;
	  }
	  var remainder = value % 1;
	  return value === value ? remainder ? value - remainder : value : 0;
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? other + '' : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
	}

	module.exports = before;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(13);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base_object = __webpack_require__(5);

	var _base_object2 = _interopRequireDefault(_base_object);

	var _core = __webpack_require__(14);

	var _core2 = _interopRequireDefault(_core);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	/**
	 * The Core Factory is responsible for instantiate the core and it's plugins.
	 * @class CoreFactory
	 * @constructor
	 * @extends BaseObject
	 * @module components
	 */

	var CoreFactory = function (_BaseObject) {
	  _inherits(CoreFactory, _BaseObject);

	  _createClass(CoreFactory, [{
	    key: 'loader',
	    get: function get() {
	      return this.player.loader;
	    }

	    /**
	     * it builds the core factory
	     * @method constructor
	     * @param {Player} player the player object
	     * @param {Loader} loader the loader object
	     */

	  }]);

	  function CoreFactory(player, loader) {
	    _classCallCheck(this, CoreFactory);

	    var _this = _possibleConstructorReturn(this, _BaseObject.call(this));

	    _this.player = player;
	    _this.options = player.options;
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

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(15);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _styler = __webpack_require__(16);

	var _styler2 = _interopRequireDefault(_styler);

	var _ui_object = __webpack_require__(18);

	var _ui_object2 = _interopRequireDefault(_ui_object);

	var _browser = __webpack_require__(3);

	var _browser2 = _interopRequireDefault(_browser);

	var _container_factory = __webpack_require__(23);

	var _container_factory2 = _interopRequireDefault(_container_factory);

	var _media_control = __webpack_require__(34);

	var _media_control2 = _interopRequireDefault(_media_control);

	var _mediator = __webpack_require__(37);

	var _mediator2 = _interopRequireDefault(_mediator);

	var _player_info = __webpack_require__(45);

	var _player_info2 = _interopRequireDefault(_player_info);

	var _lodash = __webpack_require__(29);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _style = __webpack_require__(46);

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	/**
	 * The Core is responsible to manage Containers, the mediator, MediaControl
	 * and the player state.
	 * @class Core
	 * @constructor
	 * @extends UIObject
	 * @module components
	 */

	var Core = function (_UIObject) {
	  _inherits(Core, _UIObject);

	  _createClass(Core, [{
	    key: 'events',
	    get: function get() {
	      return {
	        'webkitfullscreenchange': 'exit',
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
	  }]);

	  function Core(options) {
	    _classCallCheck(this, Core);

	    var _this = _possibleConstructorReturn(this, _UIObject.call(this, options));

	    _this.playerInfo = _player_info2.default.getInstance(options.playerId);
	    _this.options = options;
	    _this.plugins = [];
	    _this.containers = [];
	    _this.setupMediaControl(null);
	    //FIXME fullscreen api sucks
	    (0, _clapprZepto2.default)(document).bind('fullscreenchange', function () {
	      return _this.exit();
	    });
	    (0, _clapprZepto2.default)(document).bind('MSFullscreenChange', function () {
	      return _this.exit();
	    });
	    (0, _clapprZepto2.default)(document).bind('mozfullscreenchange', function () {
	      return _this.exit();
	    });
	    return _this;
	  }

	  Core.prototype.createContainers = function createContainers(options) {
	    var _this2 = this;

	    this.defer = _clapprZepto2.default.Deferred();
	    this.defer.promise(this);
	    this.containerFactory = new _container_factory2.default(options, options.loader);
	    this.containerFactory.createContainers().then(function (containers) {
	      return _this2.setupContainers(containers);
	    }).then(function (containers) {
	      return _this2.resolveOnContainersReady(containers);
	    });
	  };

	  Core.prototype.updateSize = function updateSize() {
	    if (_utils.Fullscreen.isFullscreen()) {
	      this.setFullscreen();
	    } else {
	      this.setPlayerSize();
	    }
	    _mediator2.default.trigger(this.options.playerId + ':' + _events2.default.PLAYER_RESIZE, this.playerInfo.currentSize);
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
	    _mediator2.default.trigger(this.options.playerId + ':' + _events2.default.PLAYER_RESIZE, this.playerInfo.currentSize);
	  };

	  Core.prototype.enableResizeObserver = function enableResizeObserver() {
	    var _this3 = this;

	    var checkSizeCallback = function checkSizeCallback() {
	      if (_this3.playerInfo.computedSize.width != _this3.el.clientWidth || _this3.playerInfo.computedSize.height != _this3.el.clientHeight) {
	        _this3.playerInfo.computedSize = { width: _this3.el.clientWidth, height: _this3.el.clientHeight };
	        _mediator2.default.trigger(_this3.options.playerId + ':' + _events2.default.PLAYER_RESIZE, _this3.playerInfo.computedSize);
	      }
	    };
	    this.resizeObserverInterval = setInterval(checkSizeCallback, 500);
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
	    return (0, _lodash2.default)(this.plugins, function (plugin) {
	      return plugin.name === name;
	    });
	  };

	  Core.prototype.load = function load(sources, mimeType) {
	    var _this5 = this;

	    this.options.mimeType = mimeType;
	    sources = sources && sources.constructor === Array ? sources : [sources.toString()];
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
	    (0, _clapprZepto2.default)(document).unbind('fullscreenchange');
	    (0, _clapprZepto2.default)(document).unbind('MSFullscreenChange');
	    (0, _clapprZepto2.default)(document).unbind('mozfullscreenchange');
	  };

	  Core.prototype.exit = function exit() {
	    this.updateSize();
	    this.mediaControl.show();
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
	    this.$el.appendTo(this.options.parentElement);
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
	    if (options.mediacontrol && options.mediacontrol.external) {
	      return new options.mediacontrol.external(options);
	    } else {
	      return new _media_control2.default(options).render();
	    }
	  };

	  Core.prototype.getCurrentContainer = function getCurrentContainer() {
	    if (!this.mediaControl || !this.mediaControl.container) {
	      return this.containers[0];
	    }
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
	      if (!_browser2.default.isiOS) {
	        this.$el.addClass('fullscreen');
	      }
	    } else {
	      _utils.Fullscreen.cancelFullscreen();
	      if (!_browser2.default.isiOS) {
	        this.$el.removeClass('fullscreen nocursor');
	      }
	    }
	    this.mediaControl.show();
	  };

	  Core.prototype.showMediaControl = function showMediaControl(event) {
	    this.mediaControl.show(event);
	  };

	  Core.prototype.hideMediaControl = function hideMediaControl(event) {
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

	    this.options = _clapprZepto2.default.extend(this.options, options);
	    var sources = options.source || options.sources;

	    if (sources) {
	      this.load(sources);
	    } else {
	      this.trigger(_events2.default.CORE_OPTIONS_CHANGE);

	      this.containers.forEach(function (container) {
	        container.configure(_this7.options);
	      });
	    }
	  };

	  Core.prototype.render = function render() {
	    var style = _styler2.default.getStyleFor(_style2.default);
	    this.$el.append(style);
	    this.$el.append(this.mediaControl.render().el);

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

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _template = __webpack_require__(17);

	var _template2 = _interopRequireDefault(_template);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var Styler = {
	  getStyleFor: function getStyleFor(style) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? { baseUrl: '' } : arguments[1];

	    return (0, _clapprZepto2.default)('<style class="clappr-style"></style>').html((0, _template2.default)(style.toString())(options));
	  }
	};

	exports.default = Styler;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

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
	  "'": "'",
	  '\\': '\\',
	  '\r': 'r',
	  '\n': 'n',
	  '\t': 't',
	  "\u2028": 'u2028',
	  "\u2029": 'u2029'
	};

	var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

	// List of HTML entities for escaping.
	var htmlEntities = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;'
	};

	var entityRe = new RegExp('[&<>"\']', 'g');

	var escapeExpr = function escapeExpr(string) {
	  if (string === null) {
	    return '';
	  }
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
	  var source = "__p+='";
	  text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
	    source += text.slice(index, offset).replace(escaper, function (match) {
	      return '\\' + escapes[match];
	    });

	    if (escape) {
	      source += "'+\n((__t=(" + escape + "))==null?'':escapeExpr(__t))+\n'";
	    }
	    if (interpolate) {
	      source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	    }
	    if (evaluate) {
	      source += "';\n" + evaluate + "\n__p+='";
	    }
	    index = offset + match.length;
	    return match;
	  });
	  source += "';\n";

	  // If a variable is not specified, place data values in local scope.
	  if (!settings.variable) {
	    source = 'with(obj||{}){\n' + source + '}\n';
	  }

	  source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n//# sourceURL=/microtemplates/source[" + counter++ + "]";

	  try {
	    /*jshint -W054 */
	    // TODO: find a way to avoid eval
	    render = new Function(settings.variable || 'obj', 'escapeExpr', source);
	  } catch (e) {
	    e.source = source;
	    throw e;
	  }

	  if (data) {
	    return render(data, escapeExpr);
	  }
	  var template = function template(data) {
	    return render.call(this, data, escapeExpr);
	  };

	  // Provide the compiled function source as a convenience for precompilation.
	  template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

	  return template;
	};
	tmpl.settings = settings;

	module.exports = tmpl;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _lodash = __webpack_require__(19);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _base_object = __webpack_require__(5);

	var _base_object2 = _interopRequireDefault(_base_object);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var delegateEventSplitter = /^(\S+)\s*(.*)$/;

	/**
	 * A base class to create ui object.
	 * @class UIObject
	 * @constructor
	 * @extends BaseObject
	 * @module base
	 */

	var UIObject = function (_BaseObject) {
	  _inherits(UIObject, _BaseObject);

	  _createClass(UIObject, [{
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
	    _classCallCheck(this, UIObject);

	    var _this = _possibleConstructorReturn(this, _BaseObject.call(this, options));

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
	    if (this.$el) {
	      this.undelegateEvents();
	    }
	    this.$el = element instanceof _clapprZepto2.default ? element : (0, _clapprZepto2.default)(element);
	    this.el = this.$el[0];
	    if (delegate !== false) {
	      this.delegateEvents();
	    }
	    return this;
	  };

	  /**
	   * delegates all the original `events` on `element` to its callbacks
	   * @method delegateEvents
	   * @param {Object} events
	   * @return {UIObject} itself
	   */


	  UIObject.prototype.delegateEvents = function delegateEvents(events) {
	    if (!(events || (events = (0, _lodash2.default)(this, 'events')))) {
	      return this;
	    }
	    this.undelegateEvents();
	    for (var key in events) {
	      var method = events[key];
	      if (method && method.constructor !== Function) {
	        method = this[events[key]];
	      }
	      if (!method) {
	        continue;
	      }

	      var match = key.match(delegateEventSplitter);
	      var eventName = match[1],
	          selector = match[2];
	      //method = _.bind(method, this)
	      eventName += '.delegateEvents' + this.cid;
	      if (selector === '') {
	        this.$el.on(eventName, method.bind(this));
	      } else {
	        this.$el.on(eventName, selector, method.bind(this));
	      }
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
	      var attrs = _clapprZepto2.default.extend({}, (0, _lodash2.default)(this, 'attributes'));
	      if (this.id) {
	        attrs.id = (0, _lodash2.default)(this, 'id');
	      }
	      if (this.className) {
	        attrs['class'] = (0, _lodash2.default)(this, 'className');
	      }
	      var $el = (0, _clapprZepto2.default)('<' + (0, _lodash2.default)(this, 'tagName') + '>').attr(attrs);
	      this.setElement($el, false);
	    } else {
	      this.setElement((0, _lodash2.default)(this, 'el'), false);
	    }
	  };

	  return UIObject;
	}(_base_object2.default);

	exports.default = UIObject;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * lodash 4.2.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseSlice = __webpack_require__(20),
	    toString = __webpack_require__(21);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function baseCastPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path + ''] : baseCastPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return index && index == length ? object : undefined;
	}

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (typeof value == 'number') {
	    return true;
	  }
	  return !isArray(value) && (reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object));
	}

	/**
	 * Gets the parent value at `path` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path to get the parent value of.
	 * @returns {*} Returns the parent value.
	 */
	function parent(object, path) {
	  return path.length == 1 ? object : get(object, baseSlice(path, 0, -1));
	}

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	function stringToPath(string) {
	  var result = [];
	  toString(string).replace(rePropName, function (match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
	  });
	  return result;
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array constructors, and
	  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined` the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	/**
	 * This method is like `_.get` except that if the resolved value is a function
	 * it's invoked with the `this` binding of its parent object and its result
	 * is returned.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to resolve.
	 * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
	 *
	 * _.result(object, 'a[0].b.c1');
	 * // => 3
	 *
	 * _.result(object, 'a[0].b.c2');
	 * // => 4
	 *
	 * _.result(object, 'a[0].b.c3', 'default');
	 * // => 'default'
	 *
	 * _.result(object, 'a[0].b.c3', _.constant('default'));
	 * // => 'default'
	 */
	function result(object, path, defaultValue) {
	  if (!isKey(path, object)) {
	    path = baseCastPath(path);
	    var result = get(object, path);
	    object = parent(object, path);
	  } else {
	    result = object == null ? undefined : object[path];
	  }
	  if (result === undefined) {
	    result = defaultValue;
	  }
	  return isFunction(result) ? result.call(object) : result;
	}

	module.exports = result;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * lodash 4.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  if (start < 0) {
	    start = -start > length ? 0 : length + start;
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : end - start >>> 0;
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * lodash 4.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = objectTypes[ false ? 'undefined' : _typeof(exports)] && exports && !exports.nodeType ? exports : undefined;

	/** Detect free variable `module`. */
	var freeModule = objectTypes[ false ? 'undefined' : _typeof(module)] && module && !module.nodeType ? module : undefined;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global);

	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self === 'undefined' ? 'undefined' : _typeof(self)] && self);

	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window === 'undefined' ? 'undefined' : _typeof(window)] && window);

	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[_typeof(undefined)] && undefined);

	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal || freeWindow !== (thisGlobal && thisGlobal.window) && freeWindow || freeSelf || thisGlobal || Function('return this')();

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return value && value.Object === Object ? value : null;
	}

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var _Symbol = root.Symbol;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
	}

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
	}

	module.exports = toString;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)(module), (function() { return this; }())))

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(24);

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _base_object = __webpack_require__(5);

	var _base_object2 = _interopRequireDefault(_base_object);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _container = __webpack_require__(25);

	var _container2 = _interopRequireDefault(_container);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _lodash = __webpack_require__(29);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	/**
	 * The ContainerFactory is responsible for manage playback bootstrap and create containers.
	 */

	var ContainerFactory = function (_BaseObject) {
	  _inherits(ContainerFactory, _BaseObject);

	  function ContainerFactory(options, loader) {
	    _classCallCheck(this, ContainerFactory);

	    var _this = _possibleConstructorReturn(this, _BaseObject.call(this, options));

	    _this.options = options;
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
	    return (0, _lodash2.default)(this.loader.playbackPlugins, function (p) {
	      return p.canPlay(source, mimeType);
	    });
	  };

	  ContainerFactory.prototype.createContainer = function createContainer(source) {
	    var resolvedSource = null;
	    var mimeType = this.options.mimeType;
	    if (typeof source === "string" || source instanceof String) {
	      resolvedSource = source.toString();
	    } else {
	      resolvedSource = source.source.toString();
	      if (source.mimeType) {
	        mimeType = source.mimeType;
	      }
	    }

	    if (!!resolvedSource.match(/^\/\//)) resolvedSource = window.location.protocol + resolvedSource;

	    var options = _clapprZepto2.default.extend({}, this.options, {
	      src: resolvedSource,
	      mimeType: mimeType
	    });
	    var playbackPlugin = this.findPlaybackPlugin(resolvedSource, mimeType);
	    var playback = new playbackPlugin(options);

	    options = _clapprZepto2.default.extend(options, { playback: playback });

	    var container = new _container2.default(options);
	    var defer = _clapprZepto2.default.Deferred();
	    defer.promise(container);
	    this.addContainerPlugins(container, resolvedSource);
	    this.listenToOnce(container, _events2.default.CONTAINER_READY, function () {
	      return defer.resolve(container);
	    });
	    return container;
	  };

	  ContainerFactory.prototype.addContainerPlugins = function addContainerPlugins(container, source) {
	    this.loader.containerPlugins.forEach(function (Plugin) {
	      container.addPlugin(new Plugin(container));
	    });
	  };

	  return ContainerFactory;
	}(_base_object2.default);

	exports.default = ContainerFactory;
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(26);

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _ui_object = __webpack_require__(18);

	var _ui_object2 = _interopRequireDefault(_ui_object);

	var _styler = __webpack_require__(16);

	var _styler2 = _interopRequireDefault(_styler);

	var _style = __webpack_require__(27);

	var _style2 = _interopRequireDefault(_style);

	var _lodash = __webpack_require__(29);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	/**
	 * Container is responsible for the video rendering and state
	 */

	/**
	 * An abstraction to represent a container for a given playback
	 * TODO: describe its responsabilities
	 * @class Container
	 * @constructor
	 * @extends UIObject
	 * @module base
	 */

	var Container = function (_UIObject) {
	  _inherits(Container, _UIObject);

	  _createClass(Container, [{
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
	     * it builds a container
	     * @method constructor
	     * @param {Object} options the options object
	     */

	  }]);

	  function Container(options) {
	    _classCallCheck(this, Container);

	    var _this = _possibleConstructorReturn(this, _UIObject.call(this, options));

	    _this.currentTime = 0;
	    _this.volume = 100;
	    _this.options = options;
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
	    this.listenTo(this.playback, _events2.default.PLAYBACK_ENDED, this.onEnded);
	    this.listenTo(this.playback, _events2.default.PLAYBACK_PLAY, this.playing);
	    this.listenTo(this.playback, _events2.default.PLAYBACK_PAUSE, this.paused);
	    this.listenTo(this.playback, _events2.default.PLAYBACK_STOP, this.stopped);
	    this.listenTo(this.playback, _events2.default.PLAYBACK_ERROR, this.error);
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
	    this.playback.destroy();
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
	    if (!this.isReady) {
	      this.ready();
	    }
	    this.trigger(_events2.default.CONTAINER_ERROR, { error: errorObj, container: this }, this.name);
	  };

	  Container.prototype.loadedMetadata = function loadedMetadata(metadata) {
	    this.trigger(_events2.default.CONTAINER_LOADEDMETADATA, metadata);
	  };

	  Container.prototype.timeUpdated = function timeUpdated(timeProgress) {
	    this.currentTime = timeProgress.current;
	    this.trigger(_events2.default.CONTAINER_TIMEUPDATE, timeProgress, this.name);
	  };

	  Container.prototype.progress = function progress(progressObj) {
	    this.trigger(_events2.default.CONTAINER_PROGRESS, progressObj, this.name);
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
	    if (!this.options.chromeless || this.options.allowUserInteraction) {
	      this.trigger(_events2.default.CONTAINER_CLICK, this, this.name);
	    }
	  };

	  Container.prototype.dblClicked = function dblClicked() {
	    if (!this.options.chromeless || this.options.allowUserInteraction) {
	      this.trigger(_events2.default.CONTAINER_DBLCLICK, this, this.name);
	    }
	  };

	  Container.prototype.onContextMenu = function onContextMenu() {
	    if (!this.options.chromeless || this.options.allowUserInteraction) {
	      this.trigger(_events2.default.CONTAINER_CONTEXTMENU, this, this.name);
	    }
	  };

	  Container.prototype.seek = function seek(time) {
	    this.trigger(_events2.default.CONTAINER_SEEK, time, this.name);
	    this.playback.seek(time);
	  };

	  Container.prototype.seekPercentage = function seekPercentage(percentage) {
	    var duration = this.getDuration();
	    if (percentage > 0 && percentage <= 100) {
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
	   * @method addPlugin
	   * @param {String} name
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
	    return (0, _lodash2.default)(this.plugins, function (plugin) {
	      return plugin.name === name;
	    });
	  };

	  Container.prototype.mouseEnter = function mouseEnter() {
	    if (!this.options.chromeless || this.options.allowUserInteraction) {
	      this.trigger(_events2.default.CONTAINER_MOUSE_ENTER);
	    }
	  };

	  Container.prototype.mouseLeave = function mouseLeave() {
	    if (!this.options.chromeless || this.options.allowUserInteraction) {
	      this.trigger(_events2.default.CONTAINER_MOUSE_LEAVE);
	    }
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
	    this.mediaControlDisabled = true;
	    this.trigger(_events2.default.CONTAINER_MEDIACONTROL_DISABLE);
	  };

	  Container.prototype.enableMediaControl = function enableMediaControl() {
	    this.mediaControlDisabled = false;
	    this.trigger(_events2.default.CONTAINER_MEDIACONTROL_ENABLE);
	  };

	  Container.prototype.updateStyle = function updateStyle() {
	    if (!this.options.chromeless || this.options.allowUserInteraction) {
	      this.$el.removeClass('chromeless');
	    } else {
	      this.$el.addClass('chromeless');
	    }
	  };

	  /**
	   * enables to configure the container after its creation
	   * @method configure
	   * @param {Object} options all the options to change in form of a javascript object
	   */


	  Container.prototype.configure = function configure(options) {
	    this.options = _clapprZepto2.default.extend(this.options, options);
	    this.updateStyle();
	    this.trigger(_events2.default.CONTAINER_OPTIONS_CHANGE);
	  };

	  Container.prototype.render = function render() {
	    var s = _styler2.default.getStyleFor(_style2.default);
	    this.$el.append(s);
	    this.$el.append(this.playback.render().el);
	    this.updateStyle();
	    return this;
	  };

	  return Container;
	}(_ui_object2.default);

	exports.default = Container;
	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports


	// module
	exports.push([module.id, ".container[data-container] {\n  position: absolute;\n  background-color: black;\n  height: 100%;\n  width: 100%; }\n  .container[data-container] .chromeless {\n    cursor: default; }\n\n[data-player]:not(.nocursor) .container[data-container]:not(.chromeless).pointer-enabled {\n  cursor: pointer; }\n", ""]);

	// exports


/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * lodash 4.2.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseEach = __webpack_require__(30),
	    baseFind = __webpack_require__(31),
	    baseFindIndex = __webpack_require__(32),
	    baseIteratee = __webpack_require__(33);

	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object} collection The collection to search.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': true },
	 *   { 'user': 'fred',    'age': 40, 'active': false },
	 *   { 'user': 'pebbles', 'age': 1,  'active': true }
	 * ];
	 *
	 * _.find(users, function(o) { return o.age < 40; });
	 * // => object for 'barney'
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.find(users, { 'age': 1, 'active': true });
	 * // => object for 'pebbles'
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.find(users, ['active', false]);
	 * // => object for 'fred'
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.find(users, 'active');
	 * // => object for 'barney'
	 */
	function find(collection, predicate) {
	  predicate = baseIteratee(predicate, 3);
	  if (isArray(collection)) {
	    var index = baseFindIndex(collection, predicate);
	    return index > -1 ? collection[index] : undefined;
	  }
	  return baseFind(collection, predicate, baseEach);
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = find;

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * lodash 4.1.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    stringTag = '[object String]';

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = typeof value == 'number' || reIsUint.test(value) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;

	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object' && key in object && getPrototypeOf(object) === null;
	}

	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function (object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function (collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

	    while (fromRight ? index-- : ++index < length) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	/**
	 * Creates a base function for methods like `_.forIn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function (object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) && (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;

	  return value === proto;
	}

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
	}

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  for (var key in object) {
	    if (baseHas(object, key) && !(skipIndexes && (key == 'length' || isIndex(key, length))) && !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseEach;

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
	 * without support for callback shorthands and `this` binding, which iterates
	 * over `collection` using the provided `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @param {boolean} [retKey] Specify returning the key of the found element
	 *  instead of the element itself.
	 * @returns {*} Returns the found element or its key, else `undefined`.
	 */
	function baseFind(collection, predicate, eachFunc, retKey) {
	  var result;
	  eachFunc(collection, function (value, key, collection) {
	    if (predicate(value, key, collection)) {
	      result = retKey ? key : value;
	      return false;
	    }
	  });
	  return result;
	}

	module.exports = baseFind;

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * lodash 3.6.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for callback shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromRight) {
	  var length = array.length,
	      index = fromRight ? length : -1;

	  while (fromRight ? index-- : ++index < length) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * lodash 4.5.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;

	/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = objectTypes[ false ? 'undefined' : _typeof(exports)] && exports && !exports.nodeType ? exports : undefined;

	/** Detect free variable `module`. */
	var freeModule = objectTypes[ false ? 'undefined' : _typeof(module)] && module && !module.nodeType ? module : undefined;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global);

	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self === 'undefined' ? 'undefined' : _typeof(self)] && self);

	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window === 'undefined' ? 'undefined' : _typeof(window)] && window);

	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[_typeof(undefined)] && undefined);

	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal || freeWindow !== (thisGlobal && thisGlobal.window) && freeWindow || freeSelf || thisGlobal || Function('return this')();

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	/**
	 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
	 * of key-value pairs for `object` corresponding to the property names of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the new array of key-value pairs.
	 */
	function baseToPairs(object, props) {
	  return arrayMap(props, function (key) {
	    return [key, object[key]];
	  });
	}

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return value && value.Object === Object ? value : null;
	}

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = typeof value == 'number' || reIsUint.test(value) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	/**
	 * Converts `map` to an array.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function (value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	/**
	 * Converts `set` to an array.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function (value) {
	    result[++index] = value;
	  });
	  return result;
	}

	/** Used for built-in method references. */
	var arrayProto = Array.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/** Built-in value references. */
	var _Symbol = root.Symbol,
	    Uint8Array = root.Uint8Array,
	    getPrototypeOf = Object.getPrototypeOf,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable,
	    splice = arrayProto.splice;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map'),
	    Set = getNative(root, 'Set'),
	    WeakMap = getNative(root, 'WeakMap'),
	    nativeCreate = getNative(Object, 'create');

	/** Used to detect maps, sets, and weakmaps. */
	var mapCtorString = Map ? funcToString.call(Map) : '',
	    setCtorString = Set ? funcToString.call(Set) : '',
	    weakMapCtorString = WeakMap ? funcToString.call(WeakMap) : '';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * Creates an hash object.
	 *
	 * @private
	 * @constructor
	 * @returns {Object} Returns the new hash object.
	 */
	function Hash() {}

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(hash, key) {
	  return hashHas(hash, key) && delete hash[key];
	}

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(hash, key) {
	  if (nativeCreate) {
	    var result = hash[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
	}

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(hash, key) {
	  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
	}

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function hashSet(hash, key, value) {
	  hash[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
	}

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function MapCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapClear() {
	  this.__data__ = {
	    'hash': new Hash(),
	    'map': Map ? new Map() : [],
	    'string': new Hash()
	  };
	}

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapDelete(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
	}

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapGet(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.get(key) : assocGet(data.map, key);
	}

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapHas(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.has(key) : assocHas(data.map, key);
	}

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache object.
	 */
	function mapSet(key, value) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
	  } else if (Map) {
	    data.map.set(key, value);
	  } else {
	    assocSet(data.map, key, value);
	  }
	  return this;
	}

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function Stack(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = { 'array': [], 'map': null };
	}

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocDelete(array, key) : data.map['delete'](key);
	}

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocGet(array, key) : data.map.get(key);
	}

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocHas(array, key) : data.map.has(key);
	}

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache object.
	 */
	function stackSet(key, value) {
	  var data = this.__data__,
	      array = data.array;

	  if (array) {
	    if (array.length < LARGE_ARRAY_SIZE - 1) {
	      assocSet(array, key, value);
	    } else {
	      data.array = null;
	      data.map = new MapCache(array);
	    }
	  }
	  var map = data.map;
	  if (map) {
	    map.set(key, value);
	  }
	  return this;
	}

	/**
	 * Removes `key` and its value from the associative array.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function assocDelete(array, key) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = array.length - 1;
	  if (index == lastIndex) {
	    array.pop();
	  } else {
	    splice.call(array, index, 1);
	  }
	  return true;
	}

	/**
	 * Gets the associative array value for `key`.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function assocGet(array, key) {
	  var index = assocIndexOf(array, key);
	  return index < 0 ? undefined : array[index][1];
	}

	/**
	 * Checks if an associative array value for `key` exists.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function assocHas(array, key) {
	  return assocIndexOf(array, key) > -1;
	}

	/**
	 * Gets the index at which the first occurrence of `key` is found in `array`
	 * of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	/**
	 * Sets the associative array `key` to `value`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function assocSet(array, key, value) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    array.push([key, value]);
	  } else {
	    array[index][1] = value;
	  }
	}

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function baseCastPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path + ''] : baseCastPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return index && index == length ? object : undefined;
	}

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object' && key in object && getPrototypeOf(object) === null;
	}

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return key in Object(object);
	}

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;

	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack());
	    return objIsArr || isTypedArray(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      stack || (stack = new Stack());
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack());
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack(),
	          result = customizer ? customizer(objValue, srcValue, key, object, source, stack) : undefined;

	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  if (type == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
	  }
	  return property(value);
	}

	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    var key = matchData[0][0],
	        value = matchData[0][1];

	    return function (object) {
	      if (object == null) {
	        return false;
	      }
	      return object[key] === value && (value !== undefined || key in Object(object));
	    };
	  }
	  return function (object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  return function (object) {
	    var objValue = get(object, path);
	    return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function (object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  return function (object) {
	    return baseGet(object, path);
	  };
	}

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  if (start < 0) {
	    start = -start > length ? 0 : length + start;
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : end - start >>> 0;
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var index = -1,
	      isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      isUnordered = bitmask & UNORDERED_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(array, other);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isUnordered) {
	      if (!arraySome(other, function (othValue) {
	        return arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack);
	      })) {
	        result = false;
	        break;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  return result;
	}

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case arrayBufferTag:
	      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return object != +object ? other != +other : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == other + '';

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      // Recursively compare objects (susceptible to call stack limits).
	      return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask | UNORDERED_COMPARE_FLAG, stack.set(object, other));

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : baseHas(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  return result;
	}

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = toPairs(object),
	      length = result.length;

	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString.call(value);
	}

	// Fallback for IE 11 providing `toStringTag` values for maps, sets, and weakmaps.
	if (Map && getTag(new Map()) != mapTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
	  getTag = function getTag(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : null,
	        ctorString = typeof Ctor == 'function' ? funcToString.call(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case mapCtorString:
	          return mapTag;
	        case setCtorString:
	          return setTag;
	        case weakMapCtorString:
	          return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  if (object == null) {
	    return false;
	  }
	  var result = hasFunc(object, path);
	  if (!result && !isKey(path)) {
	    path = baseCastPath(path);
	    object = parent(object, path);
	    if (object != null) {
	      path = last(path);
	      result = hasFunc(object, path);
	    }
	  }
	  var length = object ? object.length : undefined;
	  return result || !!length && isLength(length) && isIndex(path, length) && (isArray(object) || isString(object) || isArguments(object));
	}

	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) && (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (typeof value == 'number') {
	    return true;
	  }
	  return !isArray(value) && (reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object));
	}

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return type == 'number' || type == 'boolean' || type == 'string' && value != '__proto__' || value == null;
	}

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;

	  return value === proto;
	}

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	/**
	 * Gets the parent value at `path` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path to get the parent value of.
	 * @returns {*} Returns the parent value.
	 */
	function parent(object, path) {
	  return path.length == 1 ? object : get(object, baseSlice(path, 0, -1));
	}

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	function stringToPath(string) {
	  var result = [];
	  toString(string).replace(rePropName, function (match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
	  });
	  return result;
	}

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}

	/**
	 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || value !== value && other !== other;
	}

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(funcToString.call(value));
	  }
	  return isObjectLike(value) && (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
	}

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
	}

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
	}

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined` the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b.c');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b', 'c']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return hasPath(object, path, baseHasIn);
	}

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  for (var key in object) {
	    if (baseHas(object, key) && !(skipIndexes && (key == 'length' || isIndex(key, length))) && !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Creates an array of own enumerable key-value pairs for `object` which
	 * can be consumed by `_.fromPairs`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.toPairs(new Foo);
	 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
	 */
	function toPairs(object) {
	  return baseToPairs(object, keys(object));
	}

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': { 'c': 2 } } },
	 *   { 'a': { 'b': { 'c': 1 } } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b.c'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}

	// Avoid inheriting from `Object.prototype` when possible.
	Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;

	// Add functions to the `MapCache`.
	MapCache.prototype.clear = mapClear;
	MapCache.prototype['delete'] = mapDelete;
	MapCache.prototype.get = mapGet;
	MapCache.prototype.has = mapHas;
	MapCache.prototype.set = mapSet;

	// Add functions to the `Stack` cache.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = baseIteratee;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)(module), (function() { return this; }())))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(35);

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _kibo = __webpack_require__(9);

	var _kibo2 = _interopRequireDefault(_kibo);

	var _styler = __webpack_require__(16);

	var _styler2 = _interopRequireDefault(_styler);

	var _ui_object = __webpack_require__(18);

	var _ui_object2 = _interopRequireDefault(_ui_object);

	var _browser = __webpack_require__(3);

	var _browser2 = _interopRequireDefault(_browser);

	var _mediator = __webpack_require__(37);

	var _mediator2 = _interopRequireDefault(_mediator);

	var _template = __webpack_require__(17);

	var _template2 = _interopRequireDefault(_template);

	var _playback = __webpack_require__(38);

	var _playback2 = _interopRequireDefault(_playback);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _mediaControl = __webpack_require__(39);

	var _mediaControl2 = _interopRequireDefault(_mediaControl);

	var _mediaControl3 = __webpack_require__(44);

	var _mediaControl4 = _interopRequireDefault(_mediaControl3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	/**
	 * The MediaControl is responsible for displaying the Player controls.
	 */

	var MediaControl = function (_UIObject) {
	  _inherits(MediaControl, _UIObject);

	  _createClass(MediaControl, [{
	    key: 'name',
	    get: function get() {
	      return 'MediaControl';
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
	      return (0, _template2.default)(_mediaControl4.default);
	    }
	  }, {
	    key: 'stylesheet',
	    get: function get() {
	      return _styler2.default.getStyleFor(_mediaControl2.default, { baseUrl: this.options.baseUrl });
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
	    _classCallCheck(this, MediaControl);

	    var _this = _possibleConstructorReturn(this, _UIObject.call(this, options));

	    _this.options = options;
	    _this.persistConfig = _this.options.persistConfig;
	    _this.container = options.container;
	    _this.currentPositionValue = null;
	    _this.currentDurationValue = null;
	    var initialVolume = _this.persistConfig ? _utils.Config.restore("volume") : 100;
	    _this.setVolume(_this.options.mute ? 0 : initialVolume);
	    _this.keepVisible = false;
	    _this.addEventListeners();
	    _this.settings = {
	      left: ['play', 'stop', 'pause'],
	      right: ['volume'],
	      default: ['position', 'seekbar', 'duration']
	    };

	    if (_this.container) {
	      if (!_clapprZepto2.default.isEmptyObject(_this.container.settings)) {
	        _this.settings = _clapprZepto2.default.extend({}, _this.container.settings);
	      }
	    } else {
	      _this.settings = {};
	    }

	    _this.disabled = false;
	    if (_this.container && _this.container.mediaControlDisabled || _this.options.chromeless) {
	      _this.disable();
	    }
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
	    }
	  };

	  MediaControl.prototype.disable = function disable() {
	    this.disabled = true;
	    this.hide();
	    this.$el.hide();
	  };

	  MediaControl.prototype.enable = function enable() {
	    if (this.options.chromeless) return;
	    this.disabled = false;
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
	    if (!this.muted) {
	      this.$volumeIcon.removeClass('muted');
	    } else {
	      this.$volumeIcon.addClass('muted');
	    }
	  };

	  MediaControl.prototype.changeTogglePlay = function changeTogglePlay() {
	    if (this.container && this.container.isPlaying()) {
	      this.$playPauseToggle.removeClass('paused').addClass('playing');
	      this.$playStopToggle.removeClass('stopped').addClass('playing');
	      this.trigger(_events2.default.MEDIACONTROL_PLAYING);
	    } else {
	      this.$playPauseToggle.removeClass('playing').addClass('paused');
	      this.$playStopToggle.removeClass('playing').addClass('stopped');
	      this.trigger(_events2.default.MEDIACONTROL_NOTPLAYING);
	    }
	  };

	  MediaControl.prototype.mousemoveOnSeekBar = function mousemoveOnSeekBar(event) {
	    if (this.container.settings.seekEnabled) {
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
	    if (this.draggingVolumeBar) {
	      this.setVolume(this.getVolumeFromUIEvent(event));
	    }
	  };

	  MediaControl.prototype.playerResize = function playerResize(size) {
	    if (_utils.Fullscreen.isFullscreen()) {
	      this.$fullscreenToggle.addClass('shrink');
	    } else {
	      this.$fullscreenToggle.removeClass('shrink');
	    }
	    this.$el.removeClass('w320');
	    if (size.width <= 320 || this.options.hideVolumeBar) {
	      this.$el.addClass('w320');
	    }
	  };

	  MediaControl.prototype.togglePlayPause = function togglePlayPause() {
	    if (this.container.isPlaying()) {
	      this.container.pause();
	    } else {
	      this.container.play();
	    }
	    return false;
	  };

	  MediaControl.prototype.togglePlayStop = function togglePlayStop() {
	    if (this.container.isPlaying()) {
	      this.container.stop();
	    } else {
	      this.container.play();
	    }
	  };

	  MediaControl.prototype.startSeekDrag = function startSeekDrag(event) {
	    if (!this.container.settings.seekEnabled) return;
	    this.draggingSeekBar = true;
	    this.$el.addClass('dragging');
	    this.$seekBarLoaded.addClass('media-control-notransition');
	    this.$seekBarPosition.addClass('media-control-notransition');
	    this.$seekBarScrubber.addClass('media-control-notransition');
	    if (event) {
	      event.preventDefault();
	    }
	  };

	  MediaControl.prototype.startVolumeDrag = function startVolumeDrag(event) {
	    this.draggingVolumeBar = true;
	    this.$el.addClass('dragging');
	    if (event) {
	      event.preventDefault();
	    }
	  };

	  MediaControl.prototype.stopDrag = function stopDrag(event) {
	    if (this.draggingSeekBar) {
	      this.seek(event);
	    }
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
	    this.persistConfig && _utils.Config.persist("volume", value);
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
	    }
	    _mediator2.default.off(this.options.playerId + ':' + _events2.default.PLAYER_RESIZE, this.playerResize, this);
	    this.container = container;
	    // set the new container to match the volume of the last one
	    this.setVolume(this.intendedVolume);
	    this.changeTogglePlay();
	    this.addEventListeners();
	    this.settingsUpdate();
	    this.container.trigger(_events2.default.CONTAINER_PLAYBACKDVRSTATECHANGED, this.container.isDvrInUse());
	    if (this.container.mediaControlDisabled) {
	      this.disable();
	    }
	    this.trigger(_events2.default.MEDIACONTROL_CONTAINERCHANGED);
	  };

	  MediaControl.prototype.showVolumeBar = function showVolumeBar() {
	    if (this.hideVolumeId) {
	      clearTimeout(this.hideVolumeId);
	    }
	    this.$volumeBarContainer.removeClass('volume-bar-hide');
	  };

	  MediaControl.prototype.hideVolumeBar = function hideVolumeBar() {
	    var _this3 = this;

	    var timeout = arguments.length <= 0 || arguments[0] === undefined ? 400 : arguments[0];

	    if (!this.$volumeBarContainer) return;
	    if (this.draggingVolumeBar) {
	      this.hideVolumeId = setTimeout(function () {
	        return _this3.hideVolumeBar();
	      }, timeout);
	    } else {
	      if (this.hideVolumeId) {
	        clearTimeout(this.hideVolumeId);
	      }
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
	    if (this.container.getPlaybackType() !== _playback2.default.LIVE || this.container.isDvrInUse()) {
	      this.currentSeekBarPercentage = this.currentPositionValue / this.currentDurationValue * 100;
	    }
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
	    if (!this.container.settings.seekEnabled) return;
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

	    var delay = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	    var timeout = delay || 2000;
	    clearTimeout(this.hideId);
	    if (!this.isVisible() || this.options.hideMediaControl === false) return;
	    if (delay || this.userKeepVisible || this.keepVisible || this.draggingSeekBar || this.draggingVolumeBar) {
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
	    var settingsChanged = JSON.stringify(this.settings) !== JSON.stringify(this.container.settings);
	    if (this.container.getPlaybackType() && settingsChanged) {
	      this.settings = _clapprZepto2.default.extend({}, this.container.settings);
	      this.render();
	    }
	  };

	  MediaControl.prototype.highDefinitionUpdate = function highDefinitionUpdate(isHD) {
	    var method = !!isHD ? 'addClass' : 'removeClass';
	    this.$el.find('button[data-hd-indicator]')[method]('enabled');
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
	    this.resetIndicators();
	  };

	  MediaControl.prototype.resetIndicators = function resetIndicators() {
	    this.displayedPosition = this.$position.text();
	    this.displayedDuration = this.$duration.text();
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
	    if (!this.container.settings.seekEnabled) return;
	    var currentTime = this.container.getCurrentTime();
	    var duration = this.container.getDuration();
	    var position = Math.min(Math.max(currentTime + delta, 0), duration);
	    position = Math.min(position * 100 / duration, 100);
	    this.container.seekPercentage(position);
	  };

	  MediaControl.prototype.bindKeyEvents = function bindKeyEvents() {
	    var _this6 = this;

	    this.unbindKeyEvents();
	    this.kibo = new _kibo2.default(this.options.focusElement);
	    this.kibo.down(['space'], function () {
	      return _this6.togglePlayPause();
	    });
	    this.kibo.down(['left'], function () {
	      return _this6.seekRelative(-15);
	    });
	    this.kibo.down(['right'], function () {
	      return _this6.seekRelative(15);
	    });
	    var keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
	    keys.forEach(function (i) {
	      _this6.kibo.down(i.toString(), function () {
	        return _this6.container.settings.seekEnabled && _this6.container.seekPercentage(i * 10);
	      });
	    });
	  };

	  MediaControl.prototype.unbindKeyEvents = function unbindKeyEvents() {
	    if (this.kibo) {
	      this.kibo.off('space');
	      this.kibo.off('left');
	      this.kibo.off('right');
	      this.kibo.off([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
	    }
	  };

	  MediaControl.prototype.parseColors = function parseColors() {
	    if (this.options.mediacontrol) {
	      var buttonsColor = this.options.mediacontrol.buttons;
	      var seekbarColor = this.options.mediacontrol.seekbar;
	      this.$el.find('.bar-fill-2[data-seekbar]').css('background-color', seekbarColor);
	      this.$el.find('[data-media-control] > .media-control-icon, .drawer-icon').css('color', buttonsColor);
	      this.$el.find('.segmented-bar-element[data-volume]').css('boxShadow', "inset 2px 0 0 " + buttonsColor);
	    }
	  };

	  MediaControl.prototype.destroy = function destroy() {
	    this.remove();
	    (0, _clapprZepto2.default)(document).unbind('mouseup', this.stopDragHandler);
	    (0, _clapprZepto2.default)(document).unbind('mousemove', this.updateDragHandler);
	    this.unbindKeyEvents();
	  };

	  MediaControl.prototype.render = function render() {
	    var _this7 = this;

	    var timeout = 1000;
	    this.$el.html(this.template({ settings: this.settings }));
	    this.$el.append(this.stylesheet);
	    this.createCachedElements();
	    this.$playPauseToggle.addClass('paused');
	    this.$playStopToggle.addClass('stopped');

	    this.changeTogglePlay();
	    this.hideId = setTimeout(function () {
	      return _this7.hide();
	    }, timeout);
	    if (this.disabled) {
	      this.hide();
	    }

	    if (_browser2.default.isSafari && _browser2.default.isMobile) {
	      this.$volumeContainer.css('display', 'none');
	    }

	    this.$seekBarPosition.addClass('media-control-notransition');
	    this.$seekBarScrubber.addClass('media-control-notransition');

	    var previousSeekPercentage = 0;
	    if (this.displayedSeekBarPercentage) {
	      previousSeekPercentage = this.displayedSeekBarPercentage;
	    }
	    this.displayedSeekBarPercentage = null;
	    this.setSeekPercentage(previousSeekPercentage);

	    process.nextTick(function () {
	      if (!_this7.container.settings.seekEnabled) {
	        _this7.$seekBarContainer.addClass('seek-disabled');
	      }

	      _this7.bindKeyEvents();
	      _this7.playerResize({ width: _this7.options.width, height: _this7.options.height });
	      _this7.hideVolumeBar(0);
	    });

	    this.parseColors();
	    this.highDefinitionUpdate();

	    this.rendered = true;
	    this.updateVolumeUI();
	    this.trigger(_events2.default.MEDIACONTROL_RENDERED);
	    return this;
	  };

	  return MediaControl;
	}(_ui_object2.default);

	exports.default = MediaControl;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36)))

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
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
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
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
	    clearTimeout(timeout);
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
	        setTimeout(drainQueue, 0);
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

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	/**
	 * The mediator is a singleton for handling global events.
	 */

	var events = new _events2.default();

	var Mediator = function Mediator() {
	  _classCallCheck(this, Mediator);
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

	Mediator.trigger = function (name, opts) {
	  events.trigger.apply(events, Array.prototype.slice.call(arguments));
	  return;
	};

	Mediator.stopListening = function (obj, name, callback) {
	  events.stopListening(obj, name, callback);
	  return;
	};
	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	var _ui_object = __webpack_require__(18);

	var _ui_object2 = _interopRequireDefault(_ui_object);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * An abstraction to represent a generic playback, it's like an interface to be implemented by subclasses.
	 * @class Playback
	 * @constructor
	 * @extends UIObject
	 * @module base
	 */

	var Playback = function (_UIObject) {
	  _inherits(Playback, _UIObject);

	  _createClass(Playback, [{
	    key: 'ended',

	    /**
	     * Determine if the playback has ended.
	     * @property ended
	     * @type Boolean
	     */
	    get: function get() {
	      return false;
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
	     */

	  }]);

	  function Playback(options) {
	    _classCallCheck(this, Playback);

	    var _this = _possibleConstructorReturn(this, _UIObject.call(this, options));

	    _this.settings = {};
	    return _this;
	  }

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


	  Playback.prototype.seek = function seek(time) {} /*jshint unused:false*/

	  /**
	   * seeks the playback to a given `percentage` in percentage
	   * @method seekPercentage
	   * @param {Number} time should be a number between 0 and 100
	   */
	  ;

	  Playback.prototype.seekPercentage = function seekPercentage(percentage) {} /*jshint unused:false*/

	  /**
	   * The time that "0" now represents relative to when playback started.
	   * For a stream with a sliding window this will increase as content is
	   * removed from the beginning.
	   * @method getStartTimeOffset
	   * @return {Number} time (in seconds) that time "0" represents.
	   */
	  ;

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


	  Playback.prototype.volume = function volume(value) {} /*jshint unused:false*/

	  /**
	   * destroys the playback, removing it from DOM
	   * @method destroy
	   */
	  ;

	  Playback.prototype.destroy = function destroy() {
	    this.$el.remove();
	  };

	  _createClass(Playback, [{
	    key: 'isReady',
	    get: function get() {
	      return false;
	    }
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
	  /*jshint unused:false*/
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

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports


	// module
	exports.push([module.id, "@font-face {\n  font-family: \"Player\";\n  src: url(" + __webpack_require__(40) + ");\n  src: url(" + __webpack_require__(40) + "?#iefix) format(\"embedded-opentype\"), url(" + __webpack_require__(41) + ") format(\"truetype\"), url(" + __webpack_require__(42) + "#player) format(\"svg\"); }\n\n.media-control-notransition {\n  -webkit-transition: none !important false;\n  -moz-transition: none !important false false;\n  -o-transition: none !important false false;\n  transition: none !important; }\n\n.media-control[data-media-control] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  z-index: 9999;\n  pointer-events: none; }\n  .media-control[data-media-control].dragging {\n    pointer-events: auto;\n    cursor: -webkit-grabbing !important;\n    cursor: grabbing !important;\n    cursor: url(" + __webpack_require__(43) + "), move; }\n    .media-control[data-media-control].dragging * {\n      cursor: -webkit-grabbing !important;\n      cursor: grabbing !important;\n      cursor: url(" + __webpack_require__(43) + "), move; }\n  .media-control[data-media-control] .media-control-background[data-background] {\n    position: absolute;\n    height: 40%;\n    width: 100%;\n    bottom: 0;\n    background: -owg-linear-gradient(transparent, rgba(0, 0, 0, 0.9));\n    background: -webkit-linear-gradient(transparent, rgba(0, 0, 0, 0.9));\n    background: -moz-linear-gradient(transparent, rgba(0, 0, 0, 0.9));\n    background: -o-linear-gradient(transparent, rgba(0, 0, 0, 0.9));\n    -pie-background: -pie-linear-gradient(transparent, rgba(0, 0, 0, 0.9));\n    background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));\n    -webkit-transition: opacity 0.6s ease-out;\n    -moz-transition: opacity 0.6s ease-out false;\n    -o-transition: opacity 0.6s ease-out false;\n    transition: opacity 0.6s ease-out; }\n  .media-control[data-media-control] .media-control-icon {\n    font-family: \"Player\";\n    font-weight: normal;\n    font-style: normal;\n    font-size: 26px;\n    line-height: 32px;\n    letter-spacing: 0;\n    speak: none;\n    color: #fff;\n    opacity: 0.5;\n    vertical-align: middle;\n    text-align: left;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-transition: all 0.1s ease;\n    -moz-transition: all 0.1s ease false;\n    -o-transition: all 0.1s ease false;\n    transition: all 0.1s ease; }\n  .media-control[data-media-control] .media-control-icon:hover {\n    color: white;\n    opacity: 0.75;\n    text-shadow: rgba(255, 255, 255, 0.8) 0 0 5px; }\n  .media-control[data-media-control].media-control-hide .media-control-background[data-background] {\n    opacity: 0; }\n  .media-control[data-media-control].media-control-hide .media-control-layer[data-controls] {\n    bottom: -50px; }\n    .media-control[data-media-control].media-control-hide .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar] {\n      opacity: 0; }\n  .media-control[data-media-control] .media-control-layer[data-controls] {\n    position: absolute;\n    bottom: 7px;\n    width: 100%;\n    height: 32px;\n    vertical-align: middle;\n    pointer-events: auto;\n    -webkit-transition: bottom 0.4s ease-out;\n    -moz-transition: bottom 0.4s ease-out false;\n    -o-transition: bottom 0.4s ease-out false;\n    transition: bottom 0.4s ease-out; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-left-panel[data-media-control] {\n      position: absolute;\n      top: 0;\n      left: 4px;\n      height: 100%; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-center-panel[data-media-control] {\n      height: 100%;\n      text-align: center;\n      line-height: 32px; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-right-panel[data-media-control] {\n      position: absolute;\n      top: 0;\n      right: 4px;\n      height: 100%; }\n    .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button {\n      background-color: transparent;\n      border: 0;\n      margin: 0 6px;\n      padding: 0;\n      cursor: pointer;\n      display: inline-block; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button:focus {\n        outline: none; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play] {\n        float: left;\n        height: 100%;\n        font-size: 20px; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play]:before {\n          content: \"\\E001\"; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause] {\n        float: left;\n        height: 100%;\n        font-size: 20px; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause]:before {\n          content: \"\\E002\"; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop] {\n        float: left;\n        height: 100%;\n        font-size: 20px; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop]:before {\n          content: \"\\E003\"; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen] {\n        float: right;\n        background-color: transparent;\n        border: 0;\n        height: 100%; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen]:before {\n          content: \"\\E006\"; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen].shrink:before {\n          content: \"\\E007\"; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator] {\n        cursor: default;\n        float: right;\n        background-color: transparent;\n        border: 0;\n        height: 100%;\n        opacity: 0; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator]:before {\n          content: \"\\E008\"; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled {\n          opacity: 1.0; }\n          .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled:hover {\n            opacity: 1.0;\n            text-shadow: none; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause] {\n        float: left;\n        height: 100%;\n        font-size: 20px; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]:before {\n          content: \"\\E001\"; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].playing:before {\n          content: \"\\E002\"; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].paused:before {\n          content: \"\\E001\"; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop] {\n        float: left;\n        height: 100%;\n        font-size: 20px; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop]:before {\n          content: \"\\E001\"; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].playing:before {\n          content: \"\\E003\"; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].stopped:before {\n          content: \"\\E001\"; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position], .media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration] {\n      display: inline-block;\n      font-size: 10px;\n      color: white;\n      cursor: default;\n      line-height: 32px;\n      position: relative; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position] {\n      margin-left: 6px; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration] {\n      color: rgba(255, 255, 255, 0.5);\n      margin-right: 6px; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration]:before {\n        content: \"|\";\n        margin: 0 3px; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] {\n      position: absolute;\n      top: -20px;\n      left: 0;\n      display: inline-block;\n      vertical-align: middle;\n      width: 100%;\n      height: 25px;\n      cursor: pointer; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] {\n        width: 100%;\n        height: 1px;\n        position: relative;\n        top: 12px;\n        background-color: #666666; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-1[data-seekbar] {\n          position: absolute;\n          top: 0;\n          left: 0;\n          width: 0;\n          height: 100%;\n          background-color: #c2c2c2;\n          -webkit-transition: all 0.1s ease-out;\n          -moz-transition: all 0.1s ease-out false;\n          -o-transition: all 0.1s ease-out false;\n          transition: all 0.1s ease-out; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar] {\n          position: absolute;\n          top: 0;\n          left: 0;\n          width: 0;\n          height: 100%;\n          background-color: #005aff;\n          -webkit-transition: all 0.1s ease-out;\n          -moz-transition: all 0.1s ease-out false;\n          -o-transition: all 0.1s ease-out false;\n          transition: all 0.1s ease-out; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-hover[data-seekbar] {\n          opacity: 0;\n          position: absolute;\n          top: -3px;\n          width: 5px;\n          height: 7px;\n          background-color: rgba(255, 255, 255, 0.5);\n          -webkit-transition: opacity 0.1s ease;\n          -moz-transition: opacity 0.1s ease false;\n          -o-transition: opacity 0.1s ease false;\n          transition: opacity 0.1s ease; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar]:hover .bar-background[data-seekbar] .bar-hover[data-seekbar] {\n        opacity: 1; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled {\n        cursor: default; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled:hover .bar-background[data-seekbar] .bar-hover[data-seekbar] {\n          opacity: 0; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar] {\n        position: absolute;\n        -webkit-transform: translateX(-50%);\n        -moz-transform: translateX(-50%);\n        -ms-transform: translateX(-50%);\n        -o-transform: translateX(-50%);\n        transform: translateX(-50%);\n        top: 2px;\n        left: 0;\n        width: 20px;\n        height: 20px;\n        opacity: 1;\n        -webkit-transition: all 0.1s ease-out;\n        -moz-transition: all 0.1s ease-out false;\n        -o-transition: all 0.1s ease-out false;\n        transition: all 0.1s ease-out; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar] .bar-scrubber-icon[data-seekbar] {\n          position: absolute;\n          left: 6px;\n          top: 6px;\n          width: 8px;\n          height: 8px;\n          border-radius: 10px;\n          box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.2);\n          background-color: white; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] {\n      float: right;\n      display: inline-block;\n      height: 32px;\n      cursor: pointer;\n      margin: 0 6px;\n      box-sizing: border-box; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] {\n        float: left;\n        bottom: 0; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume] {\n          background-color: transparent;\n          border: 0;\n          box-sizing: content-box;\n          width: 16px;\n          height: 32px;\n          margin-right: 6px;\n          opacity: 1; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:hover {\n            opacity: 1; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:before {\n            content: \"\\E004\"; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted {\n            opacity: 0.5; }\n            .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:hover {\n              opacity: 0.7; }\n            .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:before {\n              content: \"\\E005\"; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] {\n        float: left;\n        position: relative;\n        top: 6px;\n        width: 42px;\n        height: 18px;\n        padding: 3px 0;\n        -webkit-transition: width 0.2s ease-out;\n        -moz-transition: width 0.2s ease-out false;\n        -o-transition: width 0.2s ease-out false;\n        transition: width 0.2s ease-out; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .bar-background[data-volume] {\n          height: 1px;\n          position: relative;\n          top: 7px;\n          margin: 0 3px;\n          background-color: #666666; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .bar-background[data-volume] .bar-fill-1[data-volume] {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 0;\n            height: 100%;\n            background-color: #c2c2c2;\n            -webkit-transition: all 0.1s ease-out;\n            -moz-transition: all 0.1s ease-out false;\n            -o-transition: all 0.1s ease-out false;\n            transition: all 0.1s ease-out; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .bar-background[data-volume] .bar-fill-2[data-volume] {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 0;\n            height: 100%;\n            background-color: #005aff;\n            -webkit-transition: all 0.1s ease-out;\n            -moz-transition: all 0.1s ease-out false;\n            -o-transition: all 0.1s ease-out false;\n            transition: all 0.1s ease-out; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .bar-background[data-volume] .bar-hover[data-volume] {\n            opacity: 0;\n            position: absolute;\n            top: -3px;\n            width: 5px;\n            height: 7px;\n            background-color: rgba(255, 255, 255, 0.5);\n            -webkit-transition: opacity 0.1s ease;\n            -moz-transition: opacity 0.1s ease false;\n            -o-transition: opacity 0.1s ease false;\n            transition: opacity 0.1s ease; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .bar-scrubber[data-volume] {\n          position: absolute;\n          -webkit-transform: translateX(-50%);\n          -moz-transform: translateX(-50%);\n          -ms-transform: translateX(-50%);\n          -o-transform: translateX(-50%);\n          transform: translateX(-50%);\n          top: 0px;\n          left: 0;\n          width: 20px;\n          height: 20px;\n          opacity: 1;\n          -webkit-transition: all 0.1s ease-out;\n          -moz-transition: all 0.1s ease-out false;\n          -o-transition: all 0.1s ease-out false;\n          transition: all 0.1s ease-out; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .bar-scrubber[data-volume] .bar-scrubber-icon[data-volume] {\n            position: absolute;\n            left: 6px;\n            top: 6px;\n            width: 8px;\n            height: 8px;\n            border-radius: 10px;\n            box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.2);\n            background-color: white; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume] {\n          float: left;\n          width: 4px;\n          padding-left: 2px;\n          height: 12px;\n          opacity: 0.5;\n          -webkit-box-shadow: inset 2px 0 0 white;\n          -moz-box-shadow: inset 2px 0 0 white;\n          box-shadow: inset 2px 0 0 white;\n          -webkit-transition: -webkit-transform 0.2s ease-out;\n          -moz-transition: -moz-transform 0.2s ease-out false;\n          -o-transition: -o-transform 0.2s ease-out false;\n          transition: transform 0.2s ease-out; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume].fill {\n            -webkit-box-shadow: inset 2px 0 0 #fff;\n            -moz-box-shadow: inset 2px 0 0 #fff;\n            box-shadow: inset 2px 0 0 #fff;\n            opacity: 1; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:nth-of-type(1) {\n            padding-left: 0; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:hover {\n            -webkit-transform: scaleY(1.5);\n            -moz-transform: scaleY(1.5);\n            -ms-transform: scaleY(1.5);\n            -o-transform: scaleY(1.5);\n            transform: scaleY(1.5); }\n  .media-control[data-media-control].w320 .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume].volume-bar-hide {\n    height: 12px;\n    top: 9px;\n    padding: 0;\n    width: 0; }\n", ""]);

	// exports


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ed8735c27adb521e625717506cfcfb04.eot";

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "3e43a5d764f841e7e78896de82cd6c50.ttf";

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "5d7ec830fd8d1c440f165111719aa4a0.svg";

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "a8c874b93b3d848f39a71260c57e3863.cur";

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = "<div class=\"media-control-background\" data-background></div>\n<div class=\"media-control-layer\" data-controls>\n  <%  var renderBar = function(name) { %>\n      <div class=\"bar-container\" data-<%= name %>>\n        <div class=\"bar-background\" data-<%= name %>>\n          <div class=\"bar-fill-1\" data-<%= name %>></div>\n          <div class=\"bar-fill-2\" data-<%= name %>></div>\n          <div class=\"bar-hover\" data-<%= name %>></div>\n        </div>\n        <div class=\"bar-scrubber\" data-<%= name %>>\n          <div class=\"bar-scrubber-icon\" data-<%= name %>></div>\n        </div>\n      </div>\n  <%  }; %>\n  <%  var renderSegmentedBar = function(name, segments) {\n      segments = segments || 10; %>\n    <div class=\"bar-container\" data-<%= name %>>\n    <% for (var i = 0; i < segments; i++) { %>\n      <div class=\"segmented-bar-element\" data-<%= name %>></div>\n    <% } %>\n    </div>\n  <% }; %>\n  <% var renderDrawer = function(name, renderContent) { %>\n      <div class=\"drawer-container\" data-<%= name %>>\n        <div class=\"drawer-icon-container\" data-<%= name %>>\n          <div class=\"drawer-icon media-control-icon\" data-<%= name %>></div>\n          <span class=\"drawer-text\" data-<%= name %>></span>\n        </div>\n        <% renderContent(name); %>\n      </div>\n  <% }; %>\n  <% var renderIndicator = function(name) { %>\n      <div class=\"media-control-indicator\" data-<%= name %>></div>\n  <% }; %>\n  <% var renderButton = function(name) { %>\n      <button class=\"media-control-button media-control-icon\" data-<%= name %>></button>\n  <% }; %>\n  <%  var templates = {\n        bar: renderBar,\n        segmentedBar: renderSegmentedBar,\n      };\n      var render = function(settingsList) {\n        settingsList.forEach(function(setting) {\n          if(setting === \"seekbar\") {\n            renderBar(setting);\n          } else if (setting === \"volume\") {\n            renderDrawer(setting, settings.volumeBarTemplate ? templates[settings.volumeBarTemplate] : function(name) { return renderSegmentedBar(name); });\n          } else if (setting === \"duration\" || setting === \"position\") {\n            renderIndicator(setting);\n          } else {\n            renderButton(setting);\n          }\n        });\n      }; %>\n  <% if (settings.default && settings.default.length) { %>\n  <div class=\"media-control-center-panel\" data-media-control>\n    <% render(settings.default); %>\n  </div>\n  <% } %>\n  <% if (settings.left && settings.left.length) { %>\n  <div class=\"media-control-left-panel\" data-media-control>\n    <% render(settings.left); %>\n  </div>\n  <% } %>\n  <% if (settings.right && settings.right.length) { %>\n  <div class=\"media-control-right-panel\" data-media-control>\n    <% render(settings.right); %>\n  </div>\n  <% } %>\n</div>\n";

/***/ },
/* 45 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var PlayerInfo = function PlayerInfo() {
	  _classCallCheck(this, PlayerInfo);

	  this.options = {};
	  this.playbackPlugins = [];
	  this.currentSize = { width: 0, height: 0 };
	};

	PlayerInfo._players = {};

	PlayerInfo.getInstance = function (playerId) {
	  return PlayerInfo._players[playerId] || (PlayerInfo._players[playerId] = new PlayerInfo());
	};

	exports.default = PlayerInfo;
	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports


	// module
	exports.push([module.id, "[data-player] {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -o-user-select: none;\n  user-select: none;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-transform: translate3d(0, 0, 0);\n  -moz-transform: translate3d(0, 0, 0);\n  -ms-transform: translate3d(0, 0, 0);\n  -o-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n  position: relative;\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-style: normal;\n  font-weight: normal;\n  text-align: center;\n  overflow: hidden;\n  font-size: 100%;\n  font-family: \"lucida grande\", tahoma, verdana, arial, sans-serif;\n  text-shadow: 0 0 0;\n  box-sizing: border-box; }\n  [data-player] div, [data-player] span, [data-player] applet, [data-player] object, [data-player] iframe,\n  [data-player] h1, [data-player] h2, [data-player] h3, [data-player] h4, [data-player] h5, [data-player] h6, [data-player] p, [data-player] blockquote, [data-player] pre,\n  [data-player] a, [data-player] abbr, [data-player] acronym, [data-player] address, [data-player] big, [data-player] cite, [data-player] code,\n  [data-player] del, [data-player] dfn, [data-player] em, [data-player] img, [data-player] ins, [data-player] kbd, [data-player] q, [data-player] s, [data-player] samp,\n  [data-player] small, [data-player] strike, [data-player] strong, [data-player] sub, [data-player] sup, [data-player] tt, [data-player] var,\n  [data-player] b, [data-player] u, [data-player] i, [data-player] center,\n  [data-player] dl, [data-player] dt, [data-player] dd, [data-player] ol, [data-player] ul, [data-player] li,\n  [data-player] fieldset, [data-player] form, [data-player] label, [data-player] legend,\n  [data-player] table, [data-player] caption, [data-player] tbody, [data-player] tfoot, [data-player] thead, [data-player] tr, [data-player] th, [data-player] td,\n  [data-player] article, [data-player] aside, [data-player] canvas, [data-player] details, [data-player] embed,\n  [data-player] figure, [data-player] figcaption, [data-player] footer, [data-player] header, [data-player] hgroup,\n  [data-player] menu, [data-player] nav, [data-player] output, [data-player] ruby, [data-player] section, [data-player] summary,\n  [data-player] time, [data-player] mark, [data-player] audio, [data-player] video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font: inherit;\n    font-size: 100%;\n    vertical-align: baseline; }\n  [data-player] table {\n    border-collapse: collapse;\n    border-spacing: 0; }\n  [data-player] caption, [data-player] th, [data-player] td {\n    text-align: left;\n    font-weight: normal;\n    vertical-align: middle; }\n  [data-player] q, [data-player] blockquote {\n    quotes: none; }\n    [data-player] q:before, [data-player] q:after, [data-player] blockquote:before, [data-player] blockquote:after {\n      content: \"\";\n      content: none; }\n  [data-player] a img {\n    border: none; }\n  [data-player]:focus {\n    outline: 0; }\n  [data-player] * {\n    max-width: none;\n    box-sizing: inherit;\n    float: none; }\n  [data-player] div {\n    display: block; }\n  [data-player].fullscreen {\n    width: 100% !important;\n    height: 100% !important;\n    top: 0;\n    left: 0; }\n  [data-player].nocursor {\n    cursor: none; }\n\n.clappr-style {\n  display: none !important; }\n", ""]);

	// exports


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(48);

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _base_object = __webpack_require__(5);

	var _base_object2 = _interopRequireDefault(_base_object);

	var _player_info = __webpack_require__(45);

	var _player_info2 = _interopRequireDefault(_player_info);

	var _lodash = __webpack_require__(49);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _html5_video = __webpack_require__(53);

	var _html5_video2 = _interopRequireDefault(_html5_video);

	var _flash = __webpack_require__(57);

	var _flash2 = _interopRequireDefault(_flash);

	var _html5_audio = __webpack_require__(64);

	var _html5_audio2 = _interopRequireDefault(_html5_audio);

	var _flashls = __webpack_require__(66);

	var _flashls2 = _interopRequireDefault(_flashls);

	var _hls = __webpack_require__(70);

	var _hls2 = _interopRequireDefault(_hls);

	var _html_img = __webpack_require__(108);

	var _html_img2 = _interopRequireDefault(_html_img);

	var _no_op = __webpack_require__(111);

	var _no_op2 = _interopRequireDefault(_no_op);

	var _spinner_three_bounce = __webpack_require__(115);

	var _spinner_three_bounce2 = _interopRequireDefault(_spinner_three_bounce);

	var _stats = __webpack_require__(120);

	var _stats2 = _interopRequireDefault(_stats);

	var _watermark = __webpack_require__(123);

	var _watermark2 = _interopRequireDefault(_watermark);

	var _poster = __webpack_require__(127);

	var _poster2 = _interopRequireDefault(_poster);

	var _google_analytics = __webpack_require__(131);

	var _google_analytics2 = _interopRequireDefault(_google_analytics);

	var _click_to_pause = __webpack_require__(133);

	var _click_to_pause2 = _interopRequireDefault(_click_to_pause);

	var _dvr_controls = __webpack_require__(135);

	var _dvr_controls2 = _interopRequireDefault(_dvr_controls);

	var _favicon = __webpack_require__(141);

	var _favicon2 = _interopRequireDefault(_favicon);

	var _seek_time = __webpack_require__(144);

	var _seek_time2 = _interopRequireDefault(_seek_time);

	var _sources = __webpack_require__(148);

	var _sources2 = _interopRequireDefault(_sources);

	var _end_video = __webpack_require__(149);

	var _end_video2 = _interopRequireDefault(_end_video);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	/* Playback Plugins */


	/* Container Plugins */


	/* Core Plugins */


	/**
	 * It keeps a list of the default plugins (playback, container, core) and it merges external plugins with its internals.
	 * @class Loader
	 * @constructor
	 * @extends BaseObject
	 * @module components
	 */

	var Loader = function (_BaseObject) {
	  _inherits(Loader, _BaseObject);

	  /**
	   * builds the loader
	   * @method constructor
	   * @param {Object} externalPlugins the external plugins
	   * @param {Number} playerId you can embed multiple instances of clappr, therefore this is the unique id of each one.
	   */

	  function Loader(externalPlugins, playerId) {
	    _classCallCheck(this, Loader);

	    var _this = _possibleConstructorReturn(this, _BaseObject.call(this));

	    _this.playerId = playerId;
	    _this.playbackPlugins = [_html5_video2.default, _html5_audio2.default, _flash2.default, _hls2.default, _flashls2.default, _html_img2.default, _no_op2.default];
	    _this.containerPlugins = [_spinner_three_bounce2.default, _watermark2.default, _poster2.default, _stats2.default, _google_analytics2.default, _click_to_pause2.default];
	    _this.corePlugins = [_dvr_controls2.default, _favicon2.default, _seek_time2.default, _sources2.default, _end_video2.default];
	    if (externalPlugins) {
	      if (!Array.isArray(externalPlugins)) {
	        _this.validateExternalPluginsType(externalPlugins);
	      }
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

	  /**
	   * adds all the external plugins that were passed through `options.plugins`
	   * @method addExternalPlugins
	   * @private
	   * @param {Object} plugins the config object with all plugins
	   */


	  Loader.prototype.addExternalPlugins = function addExternalPlugins(plugins) {
	    plugins = this.groupPluginsByType(plugins);
	    var pluginName = function pluginName(plugin) {
	      return plugin.prototype.name;
	    };
	    if (plugins.playback) {
	      this.playbackPlugins = (0, _lodash2.default)(plugins.playback.concat(this.playbackPlugins), pluginName);
	    }
	    if (plugins.container) {
	      this.containerPlugins = (0, _lodash2.default)(plugins.container.concat(this.containerPlugins), pluginName);
	    }
	    if (plugins.core) {
	      this.corePlugins = (0, _lodash2.default)(plugins.core.concat(this.corePlugins), pluginName);
	    }
	    _player_info2.default.getInstance(this.playerId).playbackPlugins = this.playbackPlugins;
	  };

	  /**
	   * validate if the external plugins that were passed through `options.plugins` are associated to the correct type
	   * @method validateExternalPluginsType
	   * @private
	   * @param {Object} plugins the config object with all plugins
	   */


	  Loader.prototype.validateExternalPluginsType = function validateExternalPluginsType(plugins) {
	    var plugintypes = ["playback", "container", "core"];
	    plugintypes.forEach(function (type) {
	      (plugins[type] || []).forEach(function (el) {
	        var errorMessage = "external " + el.type + " plugin on " + type + " array";
	        if (el.type !== type) {
	          throw new ReferenceError(errorMessage);
	        }
	      });
	    });
	  };

	  return Loader;
	}(_base_object2.default);

	exports.default = Loader;
	module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * lodash 4.2.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseIteratee = __webpack_require__(33),
	    baseUniq = __webpack_require__(50);

	/**
	 * This method is like `_.uniq` except that it accepts `iteratee` which is
	 * invoked for each element in `array` to generate the criterion by which
	 * uniqueness is computed. The iteratee is invoked with one argument: (value).
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
	 * @returns {Array} Returns the new duplicate free array.
	 * @example
	 *
	 * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
	 * // => [2.1, 1.2]
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	 * // => [{ 'x': 1 }, { 'x': 2 }]
	 */
	function uniqBy(array, iteratee) {
	  return array && array.length ? baseUniq(array, baseIteratee(iteratee)) : [];
	}

	module.exports = uniqBy;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * lodash 4.5.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var SetCache = __webpack_require__(51),
	    createSet = __webpack_require__(52);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  return !!array.length && baseIndexOf(array, value, 0) > -1;
	}

	/**
	 * A specialized version of `_.includesWith` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return indexOfNaN(array, fromIndex);
	  }
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	/**
	 * Gets the index at which the first occurrence of `NaN` is found in `array`.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	 */
	function indexOfNaN(array, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 0 : -1);

	  while (fromRight ? index-- : ++index < length) {
	    var other = array[index];
	    if (other !== other) {
	      return index;
	    }
	  }
	  return -1;
	}

	/**
	 * Converts `set` to an array.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function (value) {
	    result[++index] = value;
	  });
	  return result;
	}

	/**
	 * Checks if `value` is in `cache`.
	 *
	 * @private
	 * @param {Object} cache The set cache to search.
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function cacheHas(cache, value) {
	  var map = cache.__data__;
	  if (isKeyable(value)) {
	    var data = map.__data__,
	        hash = typeof value == 'string' ? data.string : data.hash;

	    return hash[value] === HASH_UNDEFINED;
	  }
	  return map.has(value);
	}

	/**
	 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new duplicate free array.
	 */
	function baseUniq(array, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      length = array.length,
	      isCommon = true,
	      result = [],
	      seen = result;

	  if (comparator) {
	    isCommon = false;
	    includes = arrayIncludesWith;
	  } else if (length >= LARGE_ARRAY_SIZE) {
	    var set = iteratee ? null : createSet(array);
	    if (set) {
	      return setToArray(set);
	    }
	    isCommon = false;
	    includes = cacheHas;
	    seen = new SetCache();
	  } else {
	    seen = iteratee ? [] : result;
	  }
	  outer: while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;

	    if (isCommon && computed === computed) {
	      var seenIndex = seen.length;
	      while (seenIndex--) {
	        if (seen[seenIndex] === computed) {
	          continue outer;
	        }
	      }
	      if (iteratee) {
	        seen.push(computed);
	      }
	      result.push(value);
	    } else if (!includes(seen, computed, comparator)) {
	      if (seen !== result) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	  }
	  return result;
	}

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return type == 'number' || type == 'boolean' || type == 'string' && value != '__proto__' || value == null;
	}

	module.exports = baseUniq;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * lodash 4.1.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = objectTypes[ false ? 'undefined' : _typeof(exports)] && exports && !exports.nodeType ? exports : undefined;

	/** Detect free variable `module`. */
	var freeModule = objectTypes[ false ? 'undefined' : _typeof(module)] && module && !module.nodeType ? module : undefined;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global);

	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self === 'undefined' ? 'undefined' : _typeof(self)] && self);

	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window === 'undefined' ? 'undefined' : _typeof(window)] && window);

	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[_typeof(undefined)] && undefined);

	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal || freeWindow !== (thisGlobal && thisGlobal.window) && freeWindow || freeSelf || thisGlobal || Function('return this')();

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return value && value.Object === Object ? value : null;
	}

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	/** Used for built-in method references. */
	var arrayProto = Array.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map'),
	    nativeCreate = getNative(Object, 'create');

	/**
	 * Creates an hash object.
	 *
	 * @private
	 * @constructor
	 * @returns {Object} Returns the new hash object.
	 */
	function Hash() {}

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(hash, key) {
	  return hashHas(hash, key) && delete hash[key];
	}

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(hash, key) {
	  if (nativeCreate) {
	    var result = hash[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
	}

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(hash, key) {
	  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
	}

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function hashSet(hash, key, value) {
	  hash[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
	}

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function MapCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapClear() {
	  this.__data__ = {
	    'hash': new Hash(),
	    'map': Map ? new Map() : [],
	    'string': new Hash()
	  };
	}

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapDelete(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
	}

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapGet(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.get(key) : assocGet(data.map, key);
	}

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapHas(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.has(key) : assocHas(data.map, key);
	}

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache object.
	 */
	function mapSet(key, value) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
	  } else if (Map) {
	    data.map.set(key, value);
	  } else {
	    assocSet(data.map, key, value);
	  }
	  return this;
	}

	/**
	 *
	 * Creates a set cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.__data__ = new MapCache();
	  while (++index < length) {
	    this.push(values[index]);
	  }
	}

	/**
	 * Adds `value` to the set cache.
	 *
	 * @private
	 * @name push
	 * @memberOf SetCache
	 * @param {*} value The value to cache.
	 */
	function cachePush(value) {
	  var map = this.__data__;
	  if (isKeyable(value)) {
	    var data = map.__data__,
	        hash = typeof value == 'string' ? data.string : data.hash;

	    hash[value] = HASH_UNDEFINED;
	  } else {
	    map.set(value, HASH_UNDEFINED);
	  }
	}

	/**
	 * Removes `key` and its value from the associative array.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function assocDelete(array, key) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = array.length - 1;
	  if (index == lastIndex) {
	    array.pop();
	  } else {
	    splice.call(array, index, 1);
	  }
	  return true;
	}

	/**
	 * Gets the associative array value for `key`.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function assocGet(array, key) {
	  var index = assocIndexOf(array, key);
	  return index < 0 ? undefined : array[index][1];
	}

	/**
	 * Checks if an associative array value for `key` exists.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function assocHas(array, key) {
	  return assocIndexOf(array, key) > -1;
	}

	/**
	 * Gets the index at which the first occurrence of `key` is found in `array`
	 * of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	/**
	 * Sets the associative array `key` to `value`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function assocSet(array, key, value) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    array.push([key, value]);
	  } else {
	    array[index][1] = value;
	  }
	}

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return type == 'number' || type == 'boolean' || type == 'string' && value != '__proto__' || value == null;
	}

	/**
	 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || value !== value && other !== other;
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(funcToString.call(value));
	  }
	  return isObjectLike(value) && (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
	}

	// Avoid inheriting from `Object.prototype` when possible.
	Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;

	// Add functions to the `MapCache`.
	MapCache.prototype.clear = mapClear;
	MapCache.prototype['delete'] = mapDelete;
	MapCache.prototype.get = mapGet;
	MapCache.prototype.has = mapHas;
	MapCache.prototype.set = mapSet;

	// Add functions to the `SetCache`.
	SetCache.prototype.push = cachePush;

	module.exports = SetCache;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)(module), (function() { return this; }())))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * lodash 4.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = objectTypes[ false ? 'undefined' : _typeof(exports)] && exports && !exports.nodeType ? exports : undefined;

	/** Detect free variable `module`. */
	var freeModule = objectTypes[ false ? 'undefined' : _typeof(module)] && module && !module.nodeType ? module : undefined;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global);

	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self === 'undefined' ? 'undefined' : _typeof(self)] && self);

	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window === 'undefined' ? 'undefined' : _typeof(window)] && window);

	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[_typeof(undefined)] && undefined);

	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal || freeWindow !== (thisGlobal && thisGlobal.window) && freeWindow || freeSelf || thisGlobal || Function('return this')();

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return value && value.Object === Object ? value : null;
	}

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	/**
	 * Creates a set of `values`.
	 *
	 * @private
	 * @param {Array} values The values to add to the set.
	 * @returns {Object} Returns the new set.
	 */
	var createSet = !(Set && new Set([1, 2]).size === 2) ? noop : function (values) {
	  return new Set(values);
	};

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(funcToString.call(value));
	  }
	  return isObjectLike(value) && (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
	}

	/**
	 * A no-operation function that returns `undefined` regardless of the
	 * arguments it receives.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.noop(object) === undefined;
	 * // => true
	 */
	function noop() {
	  // No operation performed.
	}

	module.exports = createSet;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)(module), (function() { return this; }())))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(54);

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	var _playback = __webpack_require__(38);

	var _playback2 = _interopRequireDefault(_playback);

	var _template = __webpack_require__(17);

	var _template2 = _interopRequireDefault(_template);

	var _styler = __webpack_require__(16);

	var _styler2 = _interopRequireDefault(_styler);

	var _browser = __webpack_require__(3);

	var _browser2 = _interopRequireDefault(_browser);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _style = __webpack_require__(55);

	var _style2 = _interopRequireDefault(_style);

	var _index = __webpack_require__(56);

	var _index2 = _interopRequireDefault(_index);

	var _lodash = __webpack_require__(29);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var MIMETYPES = {
	  'mp4': ["avc1.42E01E", "avc1.58A01E", "avc1.4D401E", "avc1.64001E", "mp4v.20.8", "mp4v.20.240", "mp4a.40.2"].map(function (codec) {
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

	var HTML5Video = function (_Playback) {
	  _inherits(HTML5Video, _Playback);

	  _createClass(HTML5Video, [{
	    key: 'name',
	    get: function get() {
	      return 'html5_video';
	    }
	  }, {
	    key: 'tagName',
	    get: function get() {
	      return 'video';
	    }
	  }, {
	    key: 'template',
	    get: function get() {
	      return (0, _template2.default)(_index2.default);
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
	        'canplay': 'onCanPlay',
	        'canplaythrough': 'handleBufferingEvents',
	        'durationchange': 'onDurationChange',
	        'ended': 'onEnded',
	        'error': 'onError',
	        'loadeddata': 'onLoadedData',
	        'loadedmetadata': 'onLoadedMetadata',
	        'pause': 'onPause',
	        'playing': 'onPlaying',
	        'progress': 'onProgress',
	        'seeked': 'handleBufferingEvents',
	        'seeking': 'handleBufferingEvents',
	        'stalled': 'handleBufferingEvents',
	        'timeupdate': 'onTimeUpdate',
	        'waiting': 'onWaiting'
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
	      return !!this.bufferingState;
	    }
	  }]);

	  function HTML5Video(options) {
	    _classCallCheck(this, HTML5Video);

	    var _this = _possibleConstructorReturn(this, _Playback.call(this, options));

	    _this.loadStarted = false;
	    _this.playheadMoving = false;
	    _this.playheadMovingTimer = null;
	    _this.stopped = false;
	    _this.options = options;
	    _this.setupSrc(options.src);
	    _this.el.loop = options.loop;
	    if (options.poster) {
	      _this.$el.attr("poster", options.poster);
	    }
	    _this.el.autoplay = options.autoPlay;
	    if (_browser2.default.isSafari) {
	      _this.setupSafari();
	    } else {
	      _this.el.preload = options.preload ? options.preload : 'metadata';
	      _this.settings.seekEnabled = true;
	    }
	    _this.settings = { default: ['seekbar'] };
	    _this.settings.left = ["playpause", "position", "duration"];
	    _this.settings.right = ["fullscreen", "volume", "hd-indicator"];
	    return _this;
	  }

	  /**
	   * Sets the source url on the <video> element, and also the 'src' property.
	   * @method setupSrc
	   * @param {String} srcUrl The source URL.
	   */


	  HTML5Video.prototype.setupSrc = function setupSrc(srcUrl) {
	    this.src = srcUrl;
	    this.el.src = srcUrl;
	  };

	  HTML5Video.prototype.setupSafari = function setupSafari() {
	    this.el.preload = 'auto';
	  };

	  HTML5Video.prototype.onLoadedMetadata = function onLoadedMetadata(e) {
	    this.handleBufferingEvents();
	    this.trigger(_events2.default.PLAYBACK_LOADEDMETADATA, { duration: e.target.duration, data: e });
	    this.updateSettings();
	    var autoSeekFromUrl = typeof this.options.autoSeekFromUrl === "undefined" || this.options.autoSeekFromUrl;
	    if (this.getPlaybackType() !== _playback2.default.LIVE && autoSeekFromUrl) {
	      this.checkInitialSeek();
	    }
	  };

	  HTML5Video.prototype.onDurationChange = function onDurationChange() {
	    this.updateSettings();
	    this.onTimeUpdate();
	  };

	  HTML5Video.prototype.updateSettings = function updateSettings() {
	    // we can't figure out if hls resource is VoD or not until it is being loaded or duration has changed.
	    // that's why we check it again and update media control accordingly.
	    if (this.getPlaybackType() === _playback2.default.VOD) {
	      this.settings.left = ["playpause", "position", "duration"];
	    } else {
	      this.settings.left = ["playstop"];
	    }
	    this.settings.seekEnabled = this.isSeekEnabled();
	    this.trigger(_events2.default.PLAYBACK_SETTINGSUPDATE);
	  };

	  HTML5Video.prototype.isSeekEnabled = function isSeekEnabled() {
	    return isFinite(this.getDuration());
	  };

	  HTML5Video.prototype.getPlaybackType = function getPlaybackType() {
	    return [0, undefined, Infinity].indexOf(this.el.duration) >= 0 ? _playback2.default.LIVE : _playback2.default.VOD;
	  };

	  HTML5Video.prototype.isHighDefinitionInUse = function isHighDefinitionInUse() {
	    return false;
	  };

	  HTML5Video.prototype.play = function play() {
	    this.stopped = false;
	    this.handleBufferingEvents();
	    this.el.play();
	  };

	  HTML5Video.prototype.pause = function pause() {
	    this.el.pause();
	  };

	  HTML5Video.prototype.stop = function stop() {
	    this.pause();
	    this.stopped = true;
	    this.el.currentTime = 0;
	    this.stopPlayheadMovingChecks();
	    this.handleBufferingEvents();
	    this.trigger(_events2.default.PLAYBACK_STOP);
	  };

	  HTML5Video.prototype.volume = function volume(value) {
	    this.el.volume = value / 100;
	  };

	  HTML5Video.prototype.mute = function mute() {
	    this.el.volume = 0;
	  };

	  HTML5Video.prototype.unmute = function unmute() {
	    this.el.volume = 1;
	  };

	  HTML5Video.prototype.isMuted = function isMuted() {
	    return !!this.el.volume;
	  };

	  HTML5Video.prototype.isPlaying = function isPlaying() {
	    return !this.el.paused && !this.el.ended;
	  };

	  HTML5Video.prototype.startPlayheadMovingChecks = function startPlayheadMovingChecks() {
	    if (this.playheadMovingTimer !== null) {
	      return;
	    }
	    this.playheadMovingTimeOnCheck = null;
	    this.determineIfPlayheadMoving();
	    this.playheadMovingTimer = setInterval(this.determineIfPlayheadMoving.bind(this), 500);
	  };

	  HTML5Video.prototype.stopPlayheadMovingChecks = function stopPlayheadMovingChecks() {
	    if (this.playheadMovingTimer === null) {
	      return;
	    }
	    clearInterval(this.playheadMovingTimer);
	    this.playheadMovingTimer = null;
	    this.playheadMoving = false;
	  };

	  HTML5Video.prototype.determineIfPlayheadMoving = function determineIfPlayheadMoving() {
	    var before = this.playheadMovingTimeOnCheck;
	    var now = this.el.currentTime;
	    this.playheadMoving = before !== now;
	    this.playheadMovingTimeOnCheck = now;
	    this.handleBufferingEvents();
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


	  HTML5Video.prototype.onWaiting = function onWaiting() {
	    this.loadStarted = true;
	    this.handleBufferingEvents();
	  };

	  // called after the first frame has loaded
	  // note this doesn't fire on ios before the user has requested play
	  // ideally the "loadstart" event would be used instead, but this fires
	  // before a user has requested play on iOS, and also this is always fired
	  // even if the preload setting is "none". In both these cases this causes
	  // infinite buffering until the user does something which isn't great.


	  HTML5Video.prototype.onLoadedData = function onLoadedData() {
	    this.loadStarted = true;
	    this.handleBufferingEvents();
	  };

	  // note this doesn't fire on ios before user has requested play


	  HTML5Video.prototype.onCanPlay = function onCanPlay() {
	    this.handleBufferingEvents();
	  };

	  HTML5Video.prototype.onPlaying = function onPlaying() {
	    this.startPlayheadMovingChecks();
	    this.handleBufferingEvents();
	    this.trigger(_events2.default.PLAYBACK_PLAY);
	  };

	  HTML5Video.prototype.onPause = function onPause() {
	    this.stopPlayheadMovingChecks();
	    this.handleBufferingEvents();
	    this.trigger(_events2.default.PLAYBACK_PAUSE);
	  };

	  HTML5Video.prototype.onEnded = function onEnded() {
	    this.handleBufferingEvents();
	    this.trigger(_events2.default.PLAYBACK_ENDED, this.name);
	  };

	  // The playback should be classed as buffering if the following are true:
	  // - the ready state is less then HAVE_FUTURE_DATA or the playhead isn't moving and it should be
	  // - the media hasn't "ended",
	  // - the media hasn't been stopped
	  // - loading has started


	  HTML5Video.prototype.handleBufferingEvents = function handleBufferingEvents() {
	    var playheadShouldBeMoving = !this.el.ended && !this.el.paused;
	    var buffering = this.loadStarted && !this.el.ended && !this.stopped && (playheadShouldBeMoving && !this.playheadMoving || this.el.readyState < this.el.HAVE_FUTURE_DATA);
	    if (this.bufferingState !== buffering) {
	      this.bufferingState = buffering;
	      if (buffering) {
	        this.trigger(_events2.default.PLAYBACK_BUFFERING, this.name);
	      } else {
	        this.trigger(_events2.default.PLAYBACK_BUFFERFULL, this.name);
	      }
	    }
	  };

	  HTML5Video.prototype.onError = function onError(event) {
	    this.trigger(_events2.default.PLAYBACK_ERROR, this.el.error, this.name);
	  };

	  HTML5Video.prototype.destroy = function destroy() {
	    this.stop();
	    this.el.src = '';
	    this.src = null;
	    this.$el.remove();
	  };

	  HTML5Video.prototype.seek = function seek(time) {
	    this.el.currentTime = time;
	  };

	  HTML5Video.prototype.seekPercentage = function seekPercentage(percentage) {
	    var time = this.el.duration * (percentage / 100);
	    this.seek(time);
	  };

	  HTML5Video.prototype.checkInitialSeek = function checkInitialSeek() {
	    var seekTime = (0, _utils.seekStringToSeconds)(window.location.href);
	    if (seekTime !== 0) {
	      this.seek(seekTime);
	    }
	  };

	  HTML5Video.prototype.getCurrentTime = function getCurrentTime() {
	    return this.el.currentTime;
	  };

	  HTML5Video.prototype.getDuration = function getDuration() {
	    return this.el.duration;
	  };

	  HTML5Video.prototype.onTimeUpdate = function onTimeUpdate() {
	    this.handleBufferingEvents();
	    if (this.getPlaybackType() === _playback2.default.LIVE) {
	      this.trigger(_events2.default.PLAYBACK_TIMEUPDATE, { current: 1, total: 1 }, this.name);
	    } else {
	      this.trigger(_events2.default.PLAYBACK_TIMEUPDATE, { current: this.el.currentTime, total: this.el.duration }, this.name);
	    }
	  };

	  HTML5Video.prototype.onProgress = function onProgress() {
	    if (!this.el.buffered.length) {
	      return;
	    }
	    var bufferedPos = 0;
	    for (var i = 0; i < this.el.buffered.length; i++) {
	      if (this.el.currentTime >= this.el.buffered.start(i) && this.el.currentTime <= this.el.buffered.end(i)) {
	        bufferedPos = i;
	        break;
	      }
	    }
	    this.trigger(_events2.default.PLAYBACK_PROGRESS, {
	      start: this.el.buffered.start(bufferedPos),
	      current: this.el.buffered.end(bufferedPos),
	      total: this.el.duration
	    });
	  };

	  HTML5Video.prototype.typeFor = function typeFor(src) {
	    var resourceParts = src.split('?')[0].match(/.*\.(.*)$/) || [];
	    var isHls = resourceParts.length > 1 && resourceParts[1] === "m3u8";
	    return isHls ? 'application/vnd.apple.mpegurl' : 'video/mp4';
	  };

	  HTML5Video.prototype.ready = function ready() {
	    if (this.isReadyState) {
	      return;
	    }
	    this.isReadyState = true;
	    this.trigger(_events2.default.PLAYBACK_READY, this.name);
	  };

	  HTML5Video.prototype.render = function render() {
	    var style = _styler2.default.getStyleFor(_style2.default);

	    this.src && this.$el.html(this.template({ src: this.src, type: this.typeFor(this.src) }));

	    if (this.options.useVideoTagDefaultControls) {
	      this.$el.attr('controls', 'controls');
	    }

	    if (this.options.disableVideoTagContextMenu) {
	      this.$el.on("contextmenu", function () {
	        return false;
	      });
	    }

	    this.$el.append(style);
	    this.ready();
	    return this;
	  };

	  _createClass(HTML5Video, [{
	    key: 'isReady',
	    get: function get() {
	      return this.isReadyState;
	    }
	  }]);

	  return HTML5Video;
	}(_playback2.default);

	exports.default = HTML5Video;


	HTML5Video._canPlay = function (type, mimeTypesByExtension, resourceUrl, mimeType) {
	  var extension = (resourceUrl.split('?')[0].match(/.*\.(.*)$/) || [])[1];
	  var mimeTypes = mimeType || mimeTypesByExtension[extension] || [];
	  mimeTypes = mimeTypes.constructor === Array ? mimeTypes : [mimeTypes];

	  var media = document.createElement(type);
	  return !!(0, _lodash2.default)(mimeTypes, function (mediaType) {
	    return !!media.canPlayType(mediaType).replace(/no/, '');
	  });
	};

	HTML5Video.canPlay = function (resourceUrl, mimeType) {
	  return HTML5Video._canPlay('video', MIMETYPES, resourceUrl, mimeType);
	};

	module.exports = HTML5Video;
	module.exports = exports['default'];

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports


	// module
	exports.push([module.id, "[data-html5-video] {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  display: block; }\n", ""]);

	// exports


/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = "<source src=\"<%=src%>\" type=\"<%=type%>\">\n";

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(58);

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	var _base_flash_playback = __webpack_require__(59);

	var _base_flash_playback2 = _interopRequireDefault(_base_flash_playback);

	var _browser = __webpack_require__(3);

	var _browser2 = _interopRequireDefault(_browser);

	var _mediator = __webpack_require__(37);

	var _mediator2 = _interopRequireDefault(_mediator);

	var _template = __webpack_require__(17);

	var _template2 = _interopRequireDefault(_template);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _playback = __webpack_require__(38);

	var _playback2 = _interopRequireDefault(_playback);

	var _Player = __webpack_require__(63);

	var _Player2 = _interopRequireDefault(_Player);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var MAX_ATTEMPTS = 60;

	var Flash = function (_BaseFlashPlayback) {
	  _inherits(Flash, _BaseFlashPlayback);

	  _createClass(Flash, [{
	    key: 'name',
	    get: function get() {
	      return 'flash';
	    }
	  }, {
	    key: 'swfPath',
	    get: function get() {
	      return (0, _template2.default)(_Player2.default)({ baseUrl: this.baseUrl });
	    }

	    /**
	     * Determine if the playback has ended.
	     * @property ended
	     * @type Boolean
	     */

	  }, {
	    key: 'ended',
	    get: function get() {
	      return this.currentState === "ENDED";
	    }

	    /**
	     * Determine if the playback is buffering.
	     * This is related to the PLAYBACK_BUFFERING and PLAYBACK_BUFFERFULL events
	     * @property buffering
	     * @type Boolean
	     */

	  }, {
	    key: 'buffering',
	    get: function get() {
	      return !!this.bufferingState && this.currentState !== "ENDED";
	    }
	  }]);

	  function Flash(options) {
	    _classCallCheck(this, Flash);

	    var _this = _possibleConstructorReturn(this, _BaseFlashPlayback.call(this, options));

	    _this.src = options.src;
	    _this.baseUrl = options.baseUrl;
	    _this.autoPlay = options.autoPlay;
	    _this.settings = { default: ['seekbar'] };
	    _this.settings.left = ["playpause", "position", "duration"];
	    _this.settings.right = ["fullscreen", "volume"];
	    _this.settings.seekEnabled = true;
	    _this.isReadyState = false;
	    _this.addListeners();
	    return _this;
	  }

	  Flash.prototype.bootstrap = function bootstrap() {
	    var _this2 = this;

	    if (this.el.playerPlay) {
	      this.el.width = "100%";
	      this.el.height = "100%";
	      if (this.currentState === 'PLAYING') {
	        this.firstPlay();
	      } else {
	        this.currentState = "IDLE";
	        this.autoPlay && this.play();
	      }
	      (0, _clapprZepto2.default)('<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" />').insertAfter(this.$el);
	      if (this.getDuration() > 0) {
	        this.metadataLoaded();
	      } else {
	        _mediator2.default.once(this.uniqueId + ':timeupdate', this.metadataLoaded, this);
	      }
	    } else {
	      this._attempts = this._attempts || 0;
	      if (++this._attempts <= MAX_ATTEMPTS) {
	        setTimeout(function () {
	          return _this2.bootstrap();
	        }, 50);
	      } else {
	        this.trigger(_events2.default.PLAYBACK_ERROR, { message: "Max number of attempts reached" }, this.name);
	      }
	    }
	  };

	  Flash.prototype.metadataLoaded = function metadataLoaded() {
	    this.isReadyState = true;
	    this.trigger(_events2.default.PLAYBACK_READY, this.name);
	    this.trigger(_events2.default.PLAYBACK_SETTINGSUPDATE, this.name);
	  };

	  Flash.prototype.getPlaybackType = function getPlaybackType() {
	    return _playback2.default.VOD;
	  };

	  Flash.prototype.isHighDefinitionInUse = function isHighDefinitionInUse() {
	    return false;
	  };

	  Flash.prototype.updateTime = function updateTime() {
	    this.trigger(_events2.default.PLAYBACK_TIMEUPDATE, { current: this.el.getPosition(), total: this.el.getDuration() }, this.name);
	  };

	  Flash.prototype.addListeners = function addListeners() {
	    _mediator2.default.on(this.uniqueId + ':progress', this.progress, this);
	    _mediator2.default.on(this.uniqueId + ':timeupdate', this.updateTime, this);
	    _mediator2.default.on(this.uniqueId + ':statechanged', this.checkState, this);
	    _mediator2.default.on(this.uniqueId + ':flashready', this.bootstrap, this);
	  };

	  Flash.prototype.stopListening = function stopListening() {
	    _BaseFlashPlayback.prototype.stopListening.call(this);
	    _mediator2.default.off(this.uniqueId + ':progress');
	    _mediator2.default.off(this.uniqueId + ':timeupdate');
	    _mediator2.default.off(this.uniqueId + ':statechanged');
	    _mediator2.default.off(this.uniqueId + ':flashready');
	  };

	  Flash.prototype.checkState = function checkState() {
	    if (this.isIdle || this.currentState === "PAUSED") {
	      return;
	    } else if (this.currentState !== "PLAYING_BUFFERING" && this.el.getState() === "PLAYING_BUFFERING") {
	      this.bufferingState = true;
	      this.trigger(_events2.default.PLAYBACK_BUFFERING, this.name);
	      this.currentState = "PLAYING_BUFFERING";
	    } else if (this.el.getState() === "PLAYING") {
	      this.bufferingState = false;
	      this.trigger(_events2.default.PLAYBACK_BUFFERFULL, this.name);
	      this.currentState = "PLAYING";
	    } else if (this.el.getState() === "IDLE") {
	      this.currentState = "IDLE";
	    } else if (this.el.getState() === "ENDED") {
	      this.trigger(_events2.default.PLAYBACK_ENDED, this.name);
	      this.trigger(_events2.default.PLAYBACK_TIMEUPDATE, { current: 0, total: this.el.getDuration() }, this.name);
	      this.currentState = "ENDED";
	      this.isIdle = true;
	    }
	  };

	  Flash.prototype.progress = function progress() {
	    if (this.currentState !== "IDLE" && this.currentState !== "ENDED") {
	      this.trigger(_events2.default.PLAYBACK_PROGRESS, {
	        start: 0,
	        current: this.el.getBytesLoaded(),
	        total: this.el.getBytesTotal()
	      });
	    }
	  };

	  Flash.prototype.firstPlay = function firstPlay() {
	    var _this3 = this;

	    if (this.el.playerPlay) {
	      this.isIdle = false;
	      this.el.playerPlay(this.src);
	      this.listenToOnce(this, _events2.default.PLAYBACK_BUFFERFULL, function () {
	        return _this3.checkInitialSeek();
	      });
	      this.currentState = "PLAYING";
	    } else {
	      this.listenToOnce(this, _events2.default.PLAYBACK_READY, this.firstPlay);
	    }
	  };

	  Flash.prototype.checkInitialSeek = function checkInitialSeek() {
	    var seekTime = (0, _utils.seekStringToSeconds)(window.location.href);
	    if (seekTime !== 0) {
	      this.seekSeconds(seekTime);
	    }
	  };

	  Flash.prototype.play = function play() {
	    if (this.currentState === 'PAUSED' || this.currentState === 'PLAYING_BUFFERING') {
	      this.currentState = "PLAYING";
	      this.el.playerResume();
	      this.trigger(_events2.default.PLAYBACK_PLAY, this.name);
	    } else if (this.currentState !== 'PLAYING') {
	      this.firstPlay();
	      this.trigger(_events2.default.PLAYBACK_PLAY, this.name);
	    }
	  };

	  Flash.prototype.volume = function volume(value) {
	    var _this4 = this;

	    if (this.isReady) {
	      this.el.playerVolume(value);
	    } else {
	      this.listenToOnce(this, _events2.default.PLAYBACK_BUFFERFULL, function () {
	        return _this4.volume(value);
	      });
	    }
	  };

	  Flash.prototype.pause = function pause() {
	    this.currentState = "PAUSED";
	    this.el.playerPause();
	    this.trigger(_events2.default.PLAYBACK_PAUSE, this.name);
	  };

	  Flash.prototype.stop = function stop() {
	    this.el.playerStop();
	    this.trigger(_events2.default.PLAYBACK_STOP);
	    this.trigger(_events2.default.PLAYBACK_TIMEUPDATE, { current: 0, total: 0 }, this.name);
	  };

	  Flash.prototype.isPlaying = function isPlaying() {
	    return !!(this.isReady && this.currentState.indexOf("PLAYING") > -1);
	  };

	  Flash.prototype.getDuration = function getDuration() {
	    return this.el.getDuration();
	  };

	  Flash.prototype.seekPercentage = function seekPercentage(percentage) {
	    var _this5 = this;

	    if (this.el.getDuration() > 0) {
	      var seekSeconds = this.el.getDuration() * (percentage / 100);
	      this.seek(seekSeconds);
	    } else {
	      this.listenToOnce(this, _events2.default.PLAYBACK_BUFFERFULL, function () {
	        return _this5.seekPercentage(percentage);
	      });
	    }
	  };

	  Flash.prototype.seek = function seek(time) {
	    var _this6 = this;

	    if (this.isReady && this.el.playerSeek) {
	      this.el.playerSeek(time);
	      this.trigger(_events2.default.PLAYBACK_TIMEUPDATE, { current: time, total: this.el.getDuration() }, this.name);
	      if (this.currentState === "PAUSED") {
	        this.el.playerPause();
	      }
	    } else {
	      this.listenToOnce(this, _events2.default.PLAYBACK_BUFFERFULL, function () {
	        return _this6.seek(time);
	      });
	    }
	  };

	  Flash.prototype.destroy = function destroy() {
	    clearInterval(this.bootstrapId);
	    _BaseFlashPlayback.prototype.stopListening.call(this);
	    this.$el.remove();
	  };

	  _createClass(Flash, [{
	    key: 'isReady',
	    get: function get() {
	      return this.isReadyState;
	    }
	  }]);

	  return Flash;
	}(_base_flash_playback2.default);

	exports.default = Flash;


	Flash.canPlay = function (resource) {
	  if (!_browser2.default.hasFlash || !resource || resource.constructor !== String) {
	    return false;
	  } else {
	    var resourceParts = resource.split('?')[0].match(/.*\.(.*)$/) || [];
	    return resourceParts.length > 1 && !_browser2.default.isMobile && resourceParts[1].match(/^(mp4|mov|f4v|3gpp|3gp)$/);
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = __webpack_require__(60);
	module.exports = exports['default'];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _playback = __webpack_require__(38);

	var _playback2 = _interopRequireDefault(_playback);

	var _styler = __webpack_require__(16);

	var _styler2 = _interopRequireDefault(_styler);

	var _template = __webpack_require__(17);

	var _template2 = _interopRequireDefault(_template);

	var _browser = __webpack_require__(3);

	var _browser2 = _interopRequireDefault(_browser);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _flash = __webpack_require__(61);

	var _flash2 = _interopRequireDefault(_flash);

	var _flash3 = __webpack_require__(62);

	var _flash4 = _interopRequireDefault(_flash3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2015 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var IE_CLASSID = 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000';

	var BaseFlashPlayback = function (_Playback) {
	  _inherits(BaseFlashPlayback, _Playback);

	  function BaseFlashPlayback() {
	    _classCallCheck(this, BaseFlashPlayback);

	    return _possibleConstructorReturn(this, _Playback.apply(this, arguments));
	  }

	  BaseFlashPlayback.prototype.setElement = function setElement(element) {
	    this.$el = element;
	    this.el = element[0];
	  };

	  BaseFlashPlayback.prototype.setupFirefox = function setupFirefox() {
	    var $el = this.$('embed');
	    $el.attr('data-flash-playback', this.name);
	    $el.addClass(this.attributes.class);
	    this.setElement($el);
	  };

	  BaseFlashPlayback.prototype.render = function render() {
	    this.$el.html(this.template({
	      cid: this.cid,
	      swfPath: this.swfPath,
	      baseUrl: this.baseUrl,
	      playbackId: this.uniqueId,
	      wmode: this.wmode,
	      callbackName: 'window.Clappr.flashlsCallbacks.' + this.cid }));

	    if (_browser2.default.isIE) {
	      this.$('embed').remove();

	      if (_browser2.default.isLegacyIE) {
	        this.$el.attr('classid', IE_CLASSID);
	      }
	    }

	    if (_browser2.default.isFirefox) {
	      this.setupFirefox();
	    }

	    this.el.id = this.cid;
	    this.$el.append(_styler2.default.getStyleFor(_flash4.default));

	    return this;
	  };

	  _createClass(BaseFlashPlayback, [{
	    key: 'tagName',
	    get: function get() {
	      return 'object';
	    }
	  }, {
	    key: 'swfPath',
	    get: function get() {
	      return '';
	    }
	  }, {
	    key: 'wmode',
	    get: function get() {
	      return 'transparent';
	    }
	  }, {
	    key: 'template',
	    get: function get() {
	      return (0, _template2.default)(_flash2.default);
	    }
	  }, {
	    key: 'attributes',
	    get: function get() {
	      var type = 'application/x-shockwave-flash';

	      if (_browser2.default.isLegacyIE) {
	        type = '';
	      }

	      return {
	        class: 'clappr-flash-playback',
	        type: type,
	        width: '100%',
	        height: '100%',
	        'data-flash-playback': this.name
	      };
	    }
	  }]);

	  return BaseFlashPlayback;
	}(_playback2.default);

	exports.default = BaseFlashPlayback;
	module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = "<param name=\"movie\" value=\"<%= swfPath %>?inline=1\">\n<param name=\"quality\" value=\"autohigh\">\n<param name=\"swliveconnect\" value=\"true\">\n<param name=\"allowScriptAccess\" value=\"always\">\n<param name=\"bgcolor\" value=\"#000000\">\n<param name=\"allowFullScreen\" value=\"false\">\n<param name=\"wmode\" value=\"<%= wmode %>\">\n<param name=\"tabindex\" value=\"1\">\n<param name=\"FlashVars\" value=\"playbackId=<%= playbackId %>&callback=<%= callbackName %>\">\n<embed\n  name=\"<%= cid %>\"\n  type=\"application/x-shockwave-flash\"\n  disabled=\"disabled\"\n  tabindex=\"-1\"\n  enablecontextmenu=\"false\"\n  allowScriptAccess=\"always\"\n  quality=\"autohigh\"\n  pluginspage=\"http://www.macromedia.com/go/getflashplayer\"\n  wmode=\"<%= wmode %>\"\n  swliveconnect=\"true\"\n  allowfullscreen=\"false\"\n  bgcolor=\"#000000\"\n  FlashVars=\"playbackId=<%= playbackId %>&callback=<%= callbackName %>\"\n  src=\"<%= swfPath %>\"\n  width=\"100%\"\n  height=\"100%\">\n</embed>\n";

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports


	// module
	exports.push([module.id, ".clappr-flash-playback[data-flash-playback] {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  pointer-events: none; }\n", ""]);

	// exports


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "4b76590b32dab62bc95c1b7951efae78.swf";

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(65);

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _playback = __webpack_require__(38);

	var _playback2 = _interopRequireDefault(_playback);

	var _html5_video = __webpack_require__(53);

	var _html5_video2 = _interopRequireDefault(_html5_video);

	var _lodash = __webpack_require__(29);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var HTML5Audio = function (_HTML5Video) {
	  _inherits(HTML5Audio, _HTML5Video);

	  function HTML5Audio() {
	    _classCallCheck(this, HTML5Audio);

	    return _possibleConstructorReturn(this, _HTML5Video.apply(this, arguments));
	  }

	  HTML5Audio.prototype.updateSettings = function updateSettings() {
	    this.settings.left = ["playpause", "position", "duration"];
	    this.settings.seekEnabled = this.isSeekEnabled();
	    this.trigger(_events2.default.PLAYBACK_SETTINGSUPDATE);
	  };

	  HTML5Audio.prototype.getPlaybackType = function getPlaybackType() {
	    return _playback2.default.AOD;
	  };

	  _createClass(HTML5Audio, [{
	    key: 'name',
	    get: function get() {
	      return 'html5_audio';
	    }
	  }, {
	    key: 'tagName',
	    get: function get() {
	      return 'audio';
	    }
	  }]);

	  return HTML5Audio;
	}(_html5_video2.default);

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

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(67);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base_flash_playback = __webpack_require__(59);

	var _base_flash_playback2 = _interopRequireDefault(_base_flash_playback);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _template = __webpack_require__(17);

	var _template2 = _interopRequireDefault(_template);

	var _playback = __webpack_require__(38);

	var _playback2 = _interopRequireDefault(_playback);

	var _mediator = __webpack_require__(37);

	var _mediator2 = _interopRequireDefault(_mediator);

	var _browser = __webpack_require__(3);

	var _browser2 = _interopRequireDefault(_browser);

	var _flashls_events = __webpack_require__(68);

	var _flashls_events2 = _interopRequireDefault(_flashls_events);

	var _HLSPlayer = __webpack_require__(69);

	var _HLSPlayer2 = _interopRequireDefault(_HLSPlayer);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var MAX_ATTEMPTS = 60;
	var AUTO = -1;

	var FlasHLS = function (_BaseFlashPlayback) {
	  _inherits(FlasHLS, _BaseFlashPlayback);

	  _createClass(FlasHLS, [{
	    key: 'name',
	    get: function get() {
	      return 'flashls';
	    }
	  }, {
	    key: 'swfPath',
	    get: function get() {
	      return (0, _template2.default)(_HLSPlayer2.default)({ baseUrl: this.baseUrl });
	    }
	  }, {
	    key: 'levels',
	    get: function get() {
	      return this._levels || [];
	    }
	  }, {
	    key: 'currentLevel',
	    get: function get() {
	      if (this._currentLevel === null || this._currentLevel === undefined) {
	        return AUTO;
	      } else {
	        return this._currentLevel; //0 is a valid level ID
	      }
	    },
	    set: function set(id) {
	      this._currentLevel = id;
	      this.trigger(_events2.default.PLAYBACK_LEVEL_SWITCH_START);
	      this.el.playerSetCurrentLevel(id);
	    }

	    /**
	     * Determine if the playback has ended.
	     * @property ended
	     * @type Boolean
	     */

	  }, {
	    key: 'ended',
	    get: function get() {
	      return this.hasEnded;
	    }

	    /**
	     * Determine if the playback is buffering.
	     * This is related to the PLAYBACK_BUFFERING and PLAYBACK_BUFFERFULL events
	     * @property buffering
	     * @type Boolean
	     */

	  }, {
	    key: 'buffering',
	    get: function get() {
	      return !!this.bufferingState && !this.hasEnded;
	    }
	  }]);

	  function FlasHLS(options) {
	    _classCallCheck(this, FlasHLS);

	    var _this = _possibleConstructorReturn(this, _BaseFlashPlayback.call(this, options));

	    _this.src = options.src;
	    _this.baseUrl = options.baseUrl;
	    _this.initHlsParameters(options);
	    _this.highDefinition = false;
	    _this.autoPlay = options.autoPlay;
	    _this.loop = options.loop;
	    _this.defaultSettings = {
	      left: ["playstop"],
	      default: ['seekbar'],
	      right: ["fullscreen", "volume", "hd-indicator"],
	      seekEnabled: false
	    };
	    _this.settings = _clapprZepto2.default.extend({}, _this.defaultSettings);
	    _this.playbackType = _playback2.default.LIVE;
	    _this.hasEnded = false;
	    _this.addListeners();
	    return _this;
	  }

	  FlasHLS.prototype.initHlsParameters = function initHlsParameters(options) {
	    this.autoStartLoad = options.autoStartLoad === undefined ? true : options.autoStartLoad;
	    this.capLevelToStage = options.capLevelToStage === undefined ? false : options.capLevelToStage;
	    this.maxLevelCappingMode = options.maxLevelCappingMode === undefined ? "downscale" : options.maxLevelCappingMode;
	    this.minBufferLength = options.minBufferLength === undefined ? -1 : options.minBufferLength;
	    this.minBufferLengthCapping = options.minBufferLengthCapping === undefined ? -1 : options.minBufferLengthCapping;
	    this.maxBufferLength = options.maxBufferLength === undefined ? 120 : options.maxBufferLength;
	    this.maxBackBufferLength = options.maxBackBufferLength === undefined ? 30 : options.maxBackBufferLength;
	    this.lowBufferLength = options.lowBufferLength === undefined ? 3 : options.lowBufferLength;
	    this.mediaTimePeriod = options.mediaTimePeriod === undefined ? 100 : options.mediaTimePeriod;
	    this.fpsDroppedMonitoringPeriod = options.fpsDroppedMonitoringPeriod === undefined ? 5000 : options.fpsDroppedMonitoringPeriod;
	    this.fpsDroppedMonitoringThreshold = options.fpsDroppedMonitoringThreshold === undefined ? 0.2 : options.fpsDroppedMonitoringThreshold;
	    this.capLevelonFPSDrop = options.capLevelonFPSDrop === undefined ? false : options.capLevelonFPSDrop;
	    this.smoothAutoSwitchonFPSDrop = options.smoothAutoSwitchonFPSDrop === undefined ? this.capLevelonFPSDrop : options.smoothAutoSwitchonFPSDrop;
	    this.switchDownOnLevelError = options.switchDownOnLevelError === undefined ? true : options.switchDownOnLevelError;
	    this.seekMode = options.seekMode === undefined ? "ACCURATE" : options.seekMode;
	    this.keyLoadMaxRetry = options.keyLoadMaxRetry === undefined ? 3 : options.keyLoadMaxRetry;
	    this.keyLoadMaxRetryTimeout = options.keyLoadMaxRetryTimeout === undefined ? 64000 : options.keyLoadMaxRetryTimeout;
	    this.fragmentLoadMaxRetry = options.fragmentLoadMaxRetry === undefined ? 3 : options.fragmentLoadMaxRetry;
	    this.fragmentLoadMaxRetryTimeout = options.fragmentLoadMaxRetryTimeout === undefined ? 4000 : options.fragmentLoadMaxRetryTimeout;
	    this.fragmentLoadSkipAfterMaxRetry = options.fragmentLoadSkipAfterMaxRetry === undefined ? true : options.fragmentLoadSkipAfterMaxRetry;
	    this.maxSkippedFragments = options.maxSkippedFragments === undefined ? 5 : options.maxSkippedFragments;
	    this.flushLiveURLCache = options.flushLiveURLCache === undefined ? false : options.flushLiveURLCache;
	    this.initialLiveManifestSize = options.initialLiveManifestSize === undefined ? 1 : options.initialLiveManifestSize;
	    this.manifestLoadMaxRetry = options.manifestLoadMaxRetry === undefined ? 3 : options.manifestLoadMaxRetry;
	    this.manifestLoadMaxRetryTimeout = options.manifestLoadMaxRetryTimeout === undefined ? 64000 : options.manifestLoadMaxRetryTimeout;
	    this.manifestRedundantLoadmaxRetry = options.manifestRedundantLoadmaxRetry === undefined ? 3 : options.manifestRedundantLoadmaxRetry;
	    this.startFromBitrate = options.startFromBitrate === undefined ? -1 : options.startFromBitrate;
	    this.startFromLevel = options.startFromLevel === undefined ? -1 : options.startFromLevel;
	    this.autoStartMaxDuration = options.autoStartMaxDuration === undefined ? -1 : options.autoStartMaxDuration;
	    this.seekFromLevel = options.seekFromLevel === undefined ? -1 : options.seekFromLevel;
	    this.useHardwareVideoDecoder = options.useHardwareVideoDecoder === undefined ? false : options.useHardwareVideoDecoder;
	    this.hlsLogEnabled = options.hlsLogEnabled === undefined ? true : options.hlsLogEnabled;
	    this.logDebug = options.logDebug === undefined ? false : options.logDebug;
	    this.logDebug2 = options.logDebug2 === undefined ? false : options.logDebug2;
	    this.logWarn = options.logWarn === undefined ? true : options.logWarn;
	    this.logError = options.logError === undefined ? true : options.logError;
	    this.hlsMinimumDvrSize = options.hlsMinimumDvrSize === undefined ? 60 : options.hlsMinimumDvrSize;
	  };

	  FlasHLS.prototype.addListeners = function addListeners() {
	    var _this2 = this;

	    _mediator2.default.on(this.cid + ':flashready', function () {
	      return _this2.bootstrap();
	    });
	    _mediator2.default.on(this.cid + ':timeupdate', function (timeMetrics) {
	      return _this2.updateTime(timeMetrics);
	    });
	    _mediator2.default.on(this.cid + ':playbackstate', function (state) {
	      return _this2.setPlaybackState(state);
	    });
	    _mediator2.default.on(this.cid + ':levelchanged', function (level) {
	      return _this2.levelChanged(level);
	    });
	    _mediator2.default.on(this.cid + ':error', function (code, url, message) {
	      return _this2.flashPlaybackError(code, url, message);
	    });
	    _mediator2.default.on(this.cid + ':fragmentloaded', function (loadmetrics) {
	      return _this2.onFragmentLoaded(loadmetrics);
	    });
	    _mediator2.default.once(this.cid + ':manifestloaded', function (duration, loadmetrics) {
	      return _this2.manifestLoaded(duration, loadmetrics);
	    });
	  };

	  FlasHLS.prototype.stopListening = function stopListening() {
	    _BaseFlashPlayback.prototype.stopListening.call(this);
	    _mediator2.default.off(this.cid + ':flashready');
	    _mediator2.default.off(this.cid + ':timeupdate');
	    _mediator2.default.off(this.cid + ':playbackstate');
	    _mediator2.default.off(this.cid + ':levelchanged');
	    _mediator2.default.off(this.cid + ':playbackerror');
	    _mediator2.default.off(this.cid + ':fragmentloaded');
	    _mediator2.default.off(this.cid + ':manifestloaded');
	  };

	  FlasHLS.prototype.bootstrap = function bootstrap() {
	    var _this3 = this;

	    if (this.el.playerLoad) {
	      this.el.width = "100%";
	      this.el.height = "100%";
	      this.isReadyState = true;
	      this.srcLoaded = false;
	      this.currentState = "IDLE";
	      this.setFlashSettings();
	      this.updatePlaybackType();
	      if (this.autoPlay || this._shouldPlayOnManifestLoaded) {
	        this.play();
	      }
	      this.trigger(_events2.default.PLAYBACK_READY, this.name);
	    } else {
	      this._bootstrapAttempts = this._bootstrapAttempts || 0;
	      if (++this._bootstrapAttempts <= MAX_ATTEMPTS) {
	        setTimeout(function () {
	          return _this3.bootstrap();
	        }, 50);
	      } else {
	        this.trigger(_events2.default.PLAYBACK_ERROR, { message: "Max number of attempts reached" }, this.name);
	      }
	    }
	  };

	  FlasHLS.prototype.setFlashSettings = function setFlashSettings() {
	    this.el.playerSetAutoStartLoad(this.autoStartLoad);
	    this.el.playerSetCapLevelToStage(this.capLevelToStage);
	    this.el.playerSetMaxLevelCappingMode(this.maxLevelCappingMode);
	    this.el.playerSetMinBufferLength(this.minBufferLength);
	    this.el.playerSetMinBufferLengthCapping(this.minBufferLengthCapping);
	    this.el.playerSetMaxBufferLength(this.maxBufferLength);
	    this.el.playerSetMaxBackBufferLength(this.maxBackBufferLength);
	    this.el.playerSetLowBufferLength(this.lowBufferLength);
	    this.el.playerSetMediaTimePeriod(this.mediaTimePeriod);
	    this.el.playerSetFpsDroppedMonitoringPeriod(this.fpsDroppedMonitoringPeriod);
	    this.el.playerSetFpsDroppedMonitoringThreshold(this.fpsDroppedMonitoringThreshold);
	    this.el.playerSetCapLevelonFPSDrop(this.capLevelonFPSDrop);
	    this.el.playerSetSmoothAutoSwitchonFPSDrop(this.smoothAutoSwitchonFPSDrop);
	    this.el.playerSetSwitchDownOnLevelError(this.switchDownOnLevelError);
	    this.el.playerSetSeekMode(this.seekMode);
	    this.el.playerSetKeyLoadMaxRetry(this.keyLoadMaxRetry);
	    this.el.playerSetKeyLoadMaxRetryTimeout(this.keyLoadMaxRetryTimeout);
	    this.el.playerSetFragmentLoadMaxRetry(this.fragmentLoadMaxRetry);
	    this.el.playerSetFragmentLoadMaxRetryTimeout(this.fragmentLoadMaxRetryTimeout);
	    this.el.playerSetFragmentLoadSkipAfterMaxRetry(this.fragmentLoadSkipAfterMaxRetry);
	    this.el.playerSetMaxSkippedFragments(this.maxSkippedFragments);
	    this.el.playerSetFlushLiveURLCache(this.flushLiveURLCache);
	    this.el.playerSetInitialLiveManifestSize(this.initialLiveManifestSize);
	    this.el.playerSetManifestLoadMaxRetry(this.manifestLoadMaxRetry);
	    this.el.playerSetManifestLoadMaxRetryTimeout(this.manifestLoadMaxRetryTimeout);
	    this.el.playerSetManifestRedundantLoadmaxRetry(this.manifestRedundantLoadmaxRetry);
	    this.el.playerSetStartFromBitrate(this.startFromBitrate);
	    this.el.playerSetStartFromLevel(this.startFromLevel);
	    this.el.playerSetAutoStartMaxDuration(this.autoStartMaxDuration);
	    this.el.playerSetSeekFromLevel(this.seekFromLevel);
	    this.el.playerSetUseHardwareVideoDecoder(this.useHardwareVideoDecoder);
	    this.el.playerSetLogInfo(this.hlsLogEnabled);
	    this.el.playerSetLogDebug(this.logDebug);
	    this.el.playerSetLogDebug2(this.logDebug2);
	    this.el.playerSetLogWarn(this.logWarn);
	    this.el.playerSetLogError(this.logError);
	  };

	  FlasHLS.prototype.setAutoStartLoad = function setAutoStartLoad(autoStartLoad) {
	    this.autoStartLoad = autoStartLoad;
	    this.el.playerSetAutoStartLoad(this.autoStartLoad);
	  };

	  FlasHLS.prototype.setCapLevelToStage = function setCapLevelToStage(capLevelToStage) {
	    this.capLevelToStage = capLevelToStage;
	    this.el.playerSetCapLevelToStage(this.capLevelToStage);
	  };

	  FlasHLS.prototype.setMaxLevelCappingMode = function setMaxLevelCappingMode(maxLevelCappingMode) {
	    this.maxLevelCappingMode = maxLevelCappingMode;
	    this.el.playerSetMaxLevelCappingMode(this.maxLevelCappingMode);
	  };

	  FlasHLS.prototype.setSetMinBufferLength = function setSetMinBufferLength(minBufferLength) {
	    this.minBufferLength = minBufferLength;
	    this.el.playerSetMinBufferLength(this.minBufferLength);
	  };

	  FlasHLS.prototype.setMinBufferLengthCapping = function setMinBufferLengthCapping(minBufferLengthCapping) {
	    this.minBufferLengthCapping = minBufferLengthCapping;
	    this.el.playerSetMinBufferLengthCapping(this.minBufferLengthCapping);
	  };

	  FlasHLS.prototype.setMaxBufferLength = function setMaxBufferLength(maxBufferLength) {
	    this.maxBufferLength = maxBufferLength;
	    this.el.playerSetMaxBufferLength(this.maxBufferLength);
	  };

	  FlasHLS.prototype.setMaxBackBufferLength = function setMaxBackBufferLength(maxBackBufferLength) {
	    this.maxBackBufferLength = maxBackBufferLength;
	    this.el.playerSetMaxBackBufferLength(this.maxBackBufferLength);
	  };

	  FlasHLS.prototype.setLowBufferLength = function setLowBufferLength(lowBufferLength) {
	    this.lowBufferLength = lowBufferLength;
	    this.el.playerSetLowBufferLength(this.lowBufferLength);
	  };

	  FlasHLS.prototype.setMediaTimePeriod = function setMediaTimePeriod(mediaTimePeriod) {
	    this.mediaTimePeriod = mediaTimePeriod;
	    this.el.playerSetMediaTimePeriod(this.mediaTimePeriod);
	  };

	  FlasHLS.prototype.setFpsDroppedMonitoringPeriod = function setFpsDroppedMonitoringPeriod(fpsDroppedMonitoringPeriod) {
	    this.fpsDroppedMonitoringPeriod = fpsDroppedMonitoringPeriod;
	    this.el.playerSetFpsDroppedMonitoringPeriod(this.fpsDroppedMonitoringPeriod);
	  };

	  FlasHLS.prototype.setFpsDroppedMonitoringThreshold = function setFpsDroppedMonitoringThreshold(fpsDroppedMonitoringThreshold) {
	    this.fpsDroppedMonitoringThreshold = fpsDroppedMonitoringThreshold;
	    this.el.playerSetFpsDroppedMonitoringThreshold(this.fpsDroppedMonitoringThreshold);
	  };

	  FlasHLS.prototype.setCapLevelonFPSDrop = function setCapLevelonFPSDrop(capLevelonFPSDrop) {
	    this.capLevelonFPSDrop = capLevelonFPSDrop;
	    this.el.playerSetCapLevelonFPSDrop(this.capLevelonFPSDrop);
	  };

	  FlasHLS.prototype.setSmoothAutoSwitchonFPSDrop = function setSmoothAutoSwitchonFPSDrop(smoothAutoSwitchonFPSDrop) {
	    this.smoothAutoSwitchonFPSDrop = smoothAutoSwitchonFPSDrop;
	    this.el.playerSetSmoothAutoSwitchonFPSDrop(this.smoothAutoSwitchonFPSDrop);
	  };

	  FlasHLS.prototype.setSwitchDownOnLevelError = function setSwitchDownOnLevelError(switchDownOnLevelError) {
	    this.switchDownOnLevelError = switchDownOnLevelError;
	    this.el.playerSetSwitchDownOnLevelError(this.switchDownOnLevelError);
	  };

	  FlasHLS.prototype.setSeekMode = function setSeekMode(seekMode) {
	    this.seekMode = seekMode;
	    this.el.playerSetSeekMode(this.seekMode);
	  };

	  FlasHLS.prototype.setKeyLoadMaxRetry = function setKeyLoadMaxRetry(keyLoadMaxRetry) {
	    this.keyLoadMaxRetry = keyLoadMaxRetry;
	    this.el.playerSetKeyLoadMaxRetry(this.keyLoadMaxRetry);
	  };

	  FlasHLS.prototype.setKeyLoadMaxRetryTimeout = function setKeyLoadMaxRetryTimeout(keyLoadMaxRetryTimeout) {
	    this.keyLoadMaxRetryTimeout = keyLoadMaxRetryTimeout;
	    this.el.playerSetKeyLoadMaxRetryTimeout(this.keyLoadMaxRetryTimeout);
	  };

	  FlasHLS.prototype.setFragmentLoadMaxRetry = function setFragmentLoadMaxRetry(fragmentLoadMaxRetry) {
	    this.fragmentLoadMaxRetry = fragmentLoadMaxRetry;
	    this.el.playerSetFragmentLoadMaxRetry(this.fragmentLoadMaxRetry);
	  };

	  FlasHLS.prototype.setFragmentLoadMaxRetryTimeout = function setFragmentLoadMaxRetryTimeout(fragmentLoadMaxRetryTimeout) {
	    this.fragmentLoadMaxRetryTimeout = fragmentLoadMaxRetryTimeout;
	    this.el.playerSetFragmentLoadMaxRetryTimeout(this.fragmentLoadMaxRetryTimeout);
	  };

	  FlasHLS.prototype.setFragmentLoadSkipAfterMaxRetry = function setFragmentLoadSkipAfterMaxRetry(fragmentLoadSkipAfterMaxRetry) {
	    this.fragmentLoadSkipAfterMaxRetry = fragmentLoadSkipAfterMaxRetry;
	    this.el.playerSetFragmentLoadSkipAfterMaxRetry(this.fragmentLoadSkipAfterMaxRetry);
	  };

	  FlasHLS.prototype.setMaxSkippedFragments = function setMaxSkippedFragments(maxSkippedFragments) {
	    this.maxSkippedFragments = maxSkippedFragments;
	    this.el.playerSetMaxSkippedFragments(this.maxSkippedFragments);
	  };

	  FlasHLS.prototype.setFlushLiveURLCache = function setFlushLiveURLCache(flushLiveURLCache) {
	    this.flushLiveURLCache = flushLiveURLCache;
	    this.el.playerSetFlushLiveURLCache(this.flushLiveURLCache);
	  };

	  FlasHLS.prototype.setInitialLiveManifestSize = function setInitialLiveManifestSize(initialLiveManifestSize) {
	    this.initialLiveManifestSize = initialLiveManifestSize;
	    this.el.playerSetInitialLiveManifestSize(this.initialLiveManifestSize);
	  };

	  FlasHLS.prototype.setManifestLoadMaxRetry = function setManifestLoadMaxRetry(manifestLoadMaxRetry) {
	    this.manifestLoadMaxRetry = manifestLoadMaxRetry;
	    this.el.playerSetManifestLoadMaxRetry(this.manifestLoadMaxRetry);
	  };

	  FlasHLS.prototype.setManifestLoadMaxRetryTimeout = function setManifestLoadMaxRetryTimeout(manifestLoadMaxRetryTimeout) {
	    this.manifestLoadMaxRetryTimeout = manifestLoadMaxRetryTimeout;
	    this.el.playerSetManifestLoadMaxRetryTimeout(this.manifestLoadMaxRetryTimeout);
	  };

	  FlasHLS.prototype.setManifestRedundantLoadmaxRetry = function setManifestRedundantLoadmaxRetry(manifestRedundantLoadmaxRetry) {
	    this.manifestRedundantLoadmaxRetry = manifestRedundantLoadmaxRetry;
	    this.el.playerSetManifestRedundantLoadmaxRetry(this.manifestRedundantLoadmaxRetry);
	  };

	  FlasHLS.prototype.setStartFromBitrate = function setStartFromBitrate(startFromBitrate) {
	    this.startFromBitrate = startFromBitrate;
	    this.el.playerSetStartFromBitrate(this.startFromBitrate);
	  };

	  FlasHLS.prototype.setStartFromLevel = function setStartFromLevel(startFromLevel) {
	    this.startFromLevel = startFromLevel;
	    this.el.playerSetStartFromLevel(this.startFromLevel);
	  };

	  FlasHLS.prototype.setAutoStartMaxDuration = function setAutoStartMaxDuration(autoStartMaxDuration) {
	    this.autoStartMaxDuration = autoStartMaxDuration;
	    this.el.playerSetAutoStartMaxDuration(this.autoStartMaxDuration);
	  };

	  FlasHLS.prototype.setSeekFromLevel = function setSeekFromLevel(seekFromLevel) {
	    this.seekFromLevel = seekFromLevel;
	    this.el.playerSetSeekFromLevel(this.seekFromLevel);
	  };

	  FlasHLS.prototype.setUseHardwareVideoDecoder = function setUseHardwareVideoDecoder(useHardwareVideoDecoder) {
	    this.useHardwareVideoDecoder = useHardwareVideoDecoder;
	    this.el.playerSetUseHardwareVideoDecoder(this.useHardwareVideoDecoder);
	  };

	  FlasHLS.prototype.setSetLogInfo = function setSetLogInfo(hlsLogEnabled) {
	    this.hlsLogEnabled = hlsLogEnabled;
	    this.el.playerSetLogInfo(this.hlsLogEnabled);
	  };

	  FlasHLS.prototype.setLogDebug = function setLogDebug(logDebug) {
	    this.logDebug = logDebug;
	    this.el.playerSetLogDebug(this.logDebug);
	  };

	  FlasHLS.prototype.setLogDebug2 = function setLogDebug2(logDebug2) {
	    this.logDebug2 = logDebug2;
	    this.el.playerSetLogDebug2(this.logDebug2);
	  };

	  FlasHLS.prototype.setLogWarn = function setLogWarn(logWarn) {
	    this.logWarn = logWarn;
	    this.el.playerSetLogWarn(this.logWarn);
	  };

	  FlasHLS.prototype.setLogError = function setLogError(logError) {
	    this.logError = logError;
	    this.el.playerSetLogError(this.logError);
	  };

	  FlasHLS.prototype.levelChanged = function levelChanged(level) {
	    var currentLevel = this.el.getLevels()[level];
	    if (currentLevel) {
	      this.highDefinition = currentLevel.height >= 720 || currentLevel.bitrate / 1000 >= 2000;
	      this.trigger(_events2.default.PLAYBACK_HIGHDEFINITIONUPDATE, this.highDefinition);
	      this.trigger(_events2.default.PLAYBACK_BITRATE, {
	        height: currentLevel.height,
	        width: currentLevel.width,
	        bandwidth: currentLevel.bandwidth,
	        bitrate: currentLevel.bitrate,
	        level: level
	      });
	      this.trigger(_events2.default.PLAYBACK_LEVEL_SWITCH_END);
	    }
	  };

	  FlasHLS.prototype.updateTime = function updateTime(timeMetrics) {
	    if (this.currentState === 'IDLE') {
	      return;
	    }

	    var duration = this.normalizeDuration(timeMetrics.duration);
	    var position = Math.min(Math.max(timeMetrics.position, 0), duration);
	    var previousDVRStatus = this.dvrEnabled;
	    var livePlayback = this.playbackType === _playback2.default.LIVE;
	    this.dvrEnabled = livePlayback && duration > this.hlsMinimumDvrSize;

	    if (duration === 100 || livePlayback === undefined) {
	      return;
	    }

	    if (this.dvrEnabled !== previousDVRStatus) {
	      this.updateSettings();
	      this.trigger(_events2.default.PLAYBACK_SETTINGSUPDATE, this.name);
	    }

	    if (livePlayback && (!this.dvrEnabled || !this.dvrInUse)) {
	      position = duration;
	    }

	    this.trigger(_events2.default.PLAYBACK_TIMEUPDATE, { current: position, total: duration }, this.name);
	  };

	  FlasHLS.prototype.play = function play() {
	    if (this.currentState === 'PAUSED') {
	      this.el.playerResume();
	    } else if (!this.srcLoaded && this.currentState !== "PLAYING") {
	      this.firstPlay();
	    } else {
	      this.el.playerPlay();
	    }
	  };

	  FlasHLS.prototype.getPlaybackType = function getPlaybackType() {
	    return this.playbackType ? this.playbackType : null;
	  };

	  FlasHLS.prototype.getCurrentLevelIndex = function getCurrentLevelIndex() {
	    return this.currentLevel;
	  };

	  FlasHLS.prototype.getCurrentLevel = function getCurrentLevel() {
	    return this.levels[this.currentLevel];
	  };

	  FlasHLS.prototype.getCurrentBitrate = function getCurrentBitrate() {
	    return this.levels[this.currentLevel].bitrate;
	  };

	  FlasHLS.prototype.setCurrentLevel = function setCurrentLevel(level) {
	    this.currentLevel = level;
	  };

	  FlasHLS.prototype.isHighDefinitionInUse = function isHighDefinitionInUse() {
	    return this.highDefinition;
	  };

	  FlasHLS.prototype.getLevels = function getLevels() {
	    return this.levels;
	  };

	  FlasHLS.prototype.setPlaybackState = function setPlaybackState(state) {
	    if (["PLAYING_BUFFERING", "PAUSED_BUFFERING"].indexOf(state) >= 0) {
	      this.bufferingState = true;
	      this.trigger(_events2.default.PLAYBACK_BUFFERING, this.name);
	      this.updateCurrentState(state);
	    } else if (["PLAYING", "PAUSED"].indexOf(state) >= 0) {
	      if (["PLAYING_BUFFERING", "PAUSED_BUFFERING", "IDLE"].indexOf(this.currentState) >= 0) {
	        this.bufferingState = false;
	        this.trigger(_events2.default.PLAYBACK_BUFFERFULL, this.name);
	      }
	      this.updateCurrentState(state);
	    } else if (state === "IDLE") {
	      this.srcLoaded = false;
	      if (this.loop && ["PLAYING_BUFFERING", "PLAYING"].indexOf(this.currentState) >= 0) {
	        this.play();
	        this.seek(0);
	      } else {
	        this.updateCurrentState(state);
	        this.hasEnded = true;
	        this.trigger(_events2.default.PLAYBACK_TIMEUPDATE, { current: 0, total: this.getDuration() }, this.name);
	        this.trigger(_events2.default.PLAYBACK_ENDED, this.name);
	      }
	    }
	  };

	  FlasHLS.prototype.updateCurrentState = function updateCurrentState(state) {
	    this.currentState = state;
	    if (state !== "IDLE") {
	      this.hasEnded = false;
	    }
	    this.updatePlaybackType();
	    if (state === "PLAYING") {
	      this.trigger(_events2.default.PLAYBACK_PLAY, this.name);
	    } else if (state === "PAUSED") {
	      this.trigger(_events2.default.PLAYBACK_PAUSE, this.name);
	    }
	  };

	  FlasHLS.prototype.updatePlaybackType = function updatePlaybackType() {
	    this.playbackType = this.el.getType();
	    if (this.playbackType) {
	      this.playbackType = this.playbackType.toLowerCase();
	      if (this.playbackType === _playback2.default.VOD) {
	        this.startReportingProgress();
	      } else {
	        this.stopReportingProgress();
	      }
	    }
	    this.trigger(_events2.default.PLAYBACK_PLAYBACKSTATE, { type: this.playbackType });
	  };

	  FlasHLS.prototype.startReportingProgress = function startReportingProgress() {
	    if (!this.reportingProgress) {
	      this.reportingProgress = true;
	    }
	  };

	  FlasHLS.prototype.stopReportingProgress = function stopReportingProgress() {
	    this.reportingProgress = false;
	  };

	  FlasHLS.prototype.onFragmentLoaded = function onFragmentLoaded(loadmetrics) {
	    this.trigger(_events2.default.PLAYBACK_FRAGMENT_LOADED, loadmetrics);
	    if (this.reportingProgress && this.el.getPosition) {
	      var buffered = this.el.getPosition() + this.el.getbufferLength();
	      this.trigger(_events2.default.PLAYBACK_PROGRESS, {
	        start: this.el.getPosition(),
	        current: buffered,
	        total: this.el.getDuration()
	      });
	    }
	  };

	  FlasHLS.prototype.firstPlay = function firstPlay() {
	    this._shouldPlayOnManifestLoaded = true;
	    if (this.el.playerLoad) {
	      this.setFlashSettings(); //ensure flushLiveURLCache will work (#327)
	      this.el.playerLoad(this.src);
	      this.srcLoaded = true;
	    }
	  };

	  FlasHLS.prototype.volume = function volume(value) {
	    var _this4 = this;

	    if (this.isReady) {
	      this.el.playerVolume(value);
	    } else {
	      this.listenToOnce(this, _events2.default.PLAYBACK_BUFFERFULL, function () {
	        return _this4.volume(value);
	      });
	    }
	  };

	  FlasHLS.prototype.pause = function pause() {
	    if (this.playbackType !== _playback2.default.LIVE || this.dvrEnabled) {
	      this.el.playerPause();
	      if (this.playbackType === _playback2.default.LIVE && this.dvrEnabled) {
	        this.updateDvr(true);
	      }
	    }
	  };

	  FlasHLS.prototype.stop = function stop() {
	    this.srcLoaded = false;
	    this.el.playerStop();
	    this.trigger(_events2.default.PLAYBACK_STOP);
	    this.trigger(_events2.default.PLAYBACK_TIMEUPDATE, { current: 0, total: 0 }, this.name);
	  };

	  FlasHLS.prototype.isPlaying = function isPlaying() {
	    if (this.currentState) {
	      return !!this.currentState.match(/playing/i);
	    }
	    return false;
	  };

	  FlasHLS.prototype.getDuration = function getDuration() {
	    return this.normalizeDuration(this.el.getDuration());
	  };

	  FlasHLS.prototype.normalizeDuration = function normalizeDuration(duration) {
	    if (this.playbackType === _playback2.default.LIVE) {
	      // estimate 10 seconds of buffer time for live streams for seek positions
	      duration = Math.max(0, duration - 10);
	    }
	    return duration;
	  };

	  FlasHLS.prototype.seekPercentage = function seekPercentage(percentage) {
	    var duration = this.el.getDuration();
	    var time = 0;
	    if (percentage > 0) {
	      time = duration * percentage / 100;
	    }
	    this.seek(time);
	  };

	  FlasHLS.prototype.seek = function seek(time) {
	    var duration = this.getDuration();
	    if (this.playbackType === _playback2.default.LIVE) {
	      // seek operations to a time within 3 seconds from live stream will position playhead back to live
	      var dvrInUse = duration - time > 3;
	      this.updateDvr(dvrInUse);
	    }
	    this.el.playerSeek(time);
	    this.trigger(_events2.default.PLAYBACK_TIMEUPDATE, { current: time, total: duration }, this.name);
	  };

	  FlasHLS.prototype.updateDvr = function updateDvr(dvrInUse) {
	    var previousDvrInUse = !!this.dvrInUse;
	    this.dvrInUse = dvrInUse;
	    if (this.dvrInUse !== previousDvrInUse) {
	      this.updateSettings();
	      this.trigger(_events2.default.PLAYBACK_DVR, this.dvrInUse);
	      this.trigger(_events2.default.PLAYBACK_STATS_ADD, { 'dvr': this.dvrInUse });
	    }
	  };

	  FlasHLS.prototype.flashPlaybackError = function flashPlaybackError(code, url, message) {
	    this.trigger(_events2.default.PLAYBACK_ERROR, { code: code, url: url, message: message });
	    this.trigger(_events2.default.PLAYBACK_STOP);
	  };

	  FlasHLS.prototype.manifestLoaded = function manifestLoaded(duration, loadmetrics) {
	    if (this._shouldPlayOnManifestLoaded) {
	      this._shouldPlayOnManifestLoaded = false;
	      // this method initialises the player (and starts playback)
	      // this needs to happen before PLAYBACK_LOADEDMETADATA is fired
	      // as the user may call seek() in a LOADEDMETADATA listener.
	      /// when playerPlay() is called the player seeks to 0
	      this.el.playerPlay();
	    }

	    var levels = this.el.getLevels();
	    var levelsLength = levels.length;
	    this._levels = [];

	    for (var index = 0; index < levelsLength; index++) {
	      this._levels.push({ id: index, label: levels[index].height + 'p', level: levels[index] });
	    }
	    this.trigger(_events2.default.PLAYBACK_LEVELS_AVAILABLE, this._levels);
	    this.trigger(_events2.default.PLAYBACK_LOADEDMETADATA, { duration: duration, data: loadmetrics });
	  };

	  FlasHLS.prototype.destroy = function destroy() {
	    this.stopListening();
	    this.$el.remove();
	  };

	  FlasHLS.prototype.updateSettings = function updateSettings() {
	    this.settings = _clapprZepto2.default.extend({}, this.defaultSettings);
	    if (this.playbackType === _playback2.default.VOD || this.dvrInUse) {
	      this.settings.left = ["playpause", "position", "duration"];
	      this.settings.seekEnabled = true;
	    } else if (this.dvrEnabled) {
	      this.settings.left = ["playpause"];
	      this.settings.seekEnabled = true;
	    } else {
	      this.settings.seekEnabled = false;
	    }
	  };

	  FlasHLS.prototype.createCallbacks = function createCallbacks() {
	    var _this5 = this;

	    if (!window.Clappr) {
	      window.Clappr = {};
	    }
	    if (!window.Clappr.flashlsCallbacks) {
	      window.Clappr.flashlsCallbacks = {};
	    }
	    this.flashlsEvents = new _flashls_events2.default(this.cid);
	    window.Clappr.flashlsCallbacks[this.cid] = function (eventName, args) {
	      _this5.flashlsEvents[eventName].apply(_this5.flashlsEvents, args);
	    };
	  };

	  FlasHLS.prototype.render = function render() {
	    _BaseFlashPlayback.prototype.render.call(this);
	    this.createCallbacks();
	    return this;
	  };

	  _createClass(FlasHLS, [{
	    key: 'isReady',
	    get: function get() {
	      return this.isReadyState;
	    }
	  }]);

	  return FlasHLS;
	}(_base_flash_playback2.default);

	exports.default = FlasHLS;


	FlasHLS.canPlay = function (resource, mimeType) {
	  var resourceParts = resource.split('?')[0].match(/.*\.(.*)$/) || [];
	  return _browser2.default.hasFlash && (resourceParts.length > 1 && resourceParts[1] === "m3u8" || mimeType === 'application/x-mpegURL' || mimeType === 'application/vnd.apple.mpegurl');
	};
	module.exports = exports['default'];

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mediator = __webpack_require__(37);

	var _mediator2 = _interopRequireDefault(_mediator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HLSEvents = function () {
	  function HLSEvents(instanceId) {
	    _classCallCheck(this, HLSEvents);

	    this.instanceId = instanceId;
	  }

	  HLSEvents.prototype.ready = function ready() {
	    _mediator2.default.trigger(this.instanceId + ':flashready');
	  };

	  HLSEvents.prototype.videoSize = function videoSize(width, height) {
	    _mediator2.default.trigger(this.instanceId + ':videosizechanged', width, height);
	  };

	  HLSEvents.prototype.complete = function complete() {
	    _mediator2.default.trigger(this.instanceId + ':complete');
	  };

	  HLSEvents.prototype.error = function error(code, url, message) {
	    _mediator2.default.trigger(this.instanceId + ':error', code, url, message);
	  };

	  HLSEvents.prototype.manifest = function manifest(duration, loadmetrics) {
	    _mediator2.default.trigger(this.instanceId + ':manifestloaded', duration, loadmetrics);
	  };

	  HLSEvents.prototype.audioLevelLoaded = function audioLevelLoaded(loadmetrics) {
	    _mediator2.default.trigger(this.instanceId + ':audiolevelloaded', loadmetrics);
	  };

	  HLSEvents.prototype.levelLoaded = function levelLoaded(loadmetrics) {
	    _mediator2.default.trigger(this.instanceId + ':levelloaded', loadmetrics);
	  };

	  HLSEvents.prototype.fragmentLoaded = function fragmentLoaded(loadmetrics) {
	    _mediator2.default.trigger(this.instanceId + ':fragmentloaded', loadmetrics);
	  };

	  HLSEvents.prototype.fragmentPlaying = function fragmentPlaying(playmetrics) {
	    _mediator2.default.trigger(this.instanceId + ':fragmentplaying', playmetrics);
	  };

	  HLSEvents.prototype.position = function position(timemetrics) {
	    _mediator2.default.trigger(this.instanceId + ':timeupdate', timemetrics);
	  };

	  HLSEvents.prototype.state = function state(newState) {
	    _mediator2.default.trigger(this.instanceId + ':playbackstate', newState);
	  };

	  HLSEvents.prototype.seekState = function seekState(newState) {
	    _mediator2.default.trigger(this.instanceId + ':seekstate', newState);
	  };

	  HLSEvents.prototype.switch = function _switch(newLevel) {
	    _mediator2.default.trigger(this.instanceId + ':levelchanged', newLevel);
	  };

	  HLSEvents.prototype.audioTracksListChange = function audioTracksListChange(trackList) {
	    _mediator2.default.trigger(this.instanceId + ':audiotracklistchanged', trackList);
	  };

	  HLSEvents.prototype.audioTrackChange = function audioTrackChange(trackId) {
	    _mediator2.default.trigger(this.instanceId + ':audiotrackchanged', trackId);
	  };

	  return HLSEvents;
	}();

	exports.default = HLSEvents;
	module.exports = exports['default'];

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "d218edf766218c19b416107bfb05ef0f.swf";

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(71);

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _html5_video = __webpack_require__(53);

	var _html5_video2 = _interopRequireDefault(_html5_video);

	var _hls = __webpack_require__(72);

	var _hls2 = _interopRequireDefault(_hls);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _playback = __webpack_require__(38);

	var _playback2 = _interopRequireDefault(_playback);

	var _browser = __webpack_require__(3);

	var _browser2 = _interopRequireDefault(_browser);

	var _log = __webpack_require__(7);

	var _log2 = _interopRequireDefault(_log);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var AUTO = -1;

	var HLS = function (_HTML5VideoPlayback) {
	  _inherits(HLS, _HTML5VideoPlayback);

	  _createClass(HLS, [{
	    key: 'name',
	    get: function get() {
	      return 'hls';
	    }
	  }, {
	    key: 'levels',
	    get: function get() {
	      return this._levels || [];
	    }
	  }, {
	    key: 'currentLevel',
	    get: function get() {
	      if (this._currentLevel === null || this._currentLevel === undefined) {
	        return AUTO;
	      } else {
	        return this._currentLevel; //0 is a valid level ID
	      }
	    },
	    set: function set(id) {
	      this._currentLevel = id;
	      this.trigger(_events2.default.PLAYBACK_LEVEL_SWITCH_START);
	      this.hls.currentLevel = this._currentLevel;
	    }
	  }]);

	  function HLS(options) {
	    _classCallCheck(this, HLS);

	    var _this = _possibleConstructorReturn(this, _HTML5VideoPlayback.call(this, options));

	    _this.minDvrSize = options.hlsMinimumDvrSize === undefined ? 60 : options.hlsMinimumDvrSize;
	    _this.playbackType = _playback2.default.VOD;
	    // for hls streams which have dvr with a sliding window,
	    // the content at the start of the playlist is removed as new
	    // content is appended at the end.
	    // this means the actual playable start time will increase as the
	    // start content is deleted
	    // For streams with dvr where the entire recording is kept from the
	    // beginning this should stay as 0
	    _this.playableRegionStartTime = 0;
	    // if content is removed from the beginning then this empty area should
	    // be ignored. "playableRegionDuration" does not consider this
	    _this.playableRegionDuration = 0;
	    options.autoPlay && _this.setupHls();
	    return _this;
	  }

	  HLS.prototype.setupHls = function setupHls() {
	    var _this2 = this;

	    this.hls = new _hls2.default(this.options.hlsjsConfig || {});
	    this.hls.on(_hls2.default.Events.MEDIA_ATTACHED, function () {
	      return _this2.hls.loadSource(_this2.options.src);
	    });
	    this.hls.on(_hls2.default.Events.LEVEL_LOADED, function (evt, data) {
	      return _this2.updatePlaybackType(evt, data);
	    });
	    this.hls.on(_hls2.default.Events.LEVEL_UPDATED, function (evt, data) {
	      return _this2.onLevelUpdated(evt, data);
	    });
	    this.hls.on(_hls2.default.Events.LEVEL_SWITCH, function (evt, data) {
	      return _this2.onLevelSwitch(evt, data);
	    });
	    this.hls.on(_hls2.default.Events.FRAG_LOADED, function (evt, data) {
	      return _this2.onFragmentLoaded(evt, data);
	    });
	    this.hls.attachMedia(this.el);
	  };

	  // override


	  HLS.prototype.setupSrc = function setupSrc(srcUrl) {}
	  // this playback manages the src on the video element itself


	  // the duration on the video element itself should not be used
	  // as this does not necesarily represent the duration of the stream
	  // https://github.com/clappr/clappr/issues/668#issuecomment-157036678
	  ;

	  HLS.prototype.getDuration = function getDuration() {
	    return this.playableRegionDuration;
	  };

	  HLS.prototype.getCurrentTime = function getCurrentTime() {
	    return this.el.currentTime - this.playableRegionStartTime;
	  };

	  // the time that "0" now represents relative to when playback started
	  // for a stream with a sliding window this will increase as content is
	  // removed from the beginning


	  HLS.prototype.getStartTimeOffset = function getStartTimeOffset() {
	    return this.playableRegionStartTime;
	  };

	  HLS.prototype.seekPercentage = function seekPercentage(percentage) {
	    var seekTo = this.playableRegionDuration;
	    if (percentage > 0) {
	      seekTo = this.playableRegionDuration * (percentage / 100);
	    }
	    this.seek(seekTo);
	  };

	  HLS.prototype.seek = function seek(time) {
	    if (time < 0) {
	      _log2.default.warn("Attempt to seek to a negative time. Resetting to live point. Use seekToLivePoint() to seek to the live point.");
	      time = this.getDuration();
	    }
	    // assume live if time within 3 seconds of end of stream
	    this.dvrEnabled && this.updateDvr(time < this.getDuration() - 3);
	    time += this.playableRegionStartTime;
	    _HTML5VideoPlayback.prototype.seek.call(this, time);
	  };

	  HLS.prototype.seekToLivePoint = function seekToLivePoint() {
	    this.seek(this.getDuration());
	  };

	  HLS.prototype.updateDvr = function updateDvr(status) {
	    this.trigger(_events2.default.PLAYBACK_DVR, status);
	    this.trigger(_events2.default.PLAYBACK_STATS_ADD, { 'dvr': status });
	  };

	  HLS.prototype.updateSettings = function updateSettings() {
	    if (this.playbackType === _playback2.default.VOD) {
	      this.settings.left = ["playpause", "position", "duration"];
	    } else if (this.dvrEnabled) {
	      this.settings.left = ["playpause"];
	    } else {
	      this.settings.left = ["playstop"];
	    }
	    this.settings.seekEnabled = this.isSeekEnabled();
	    this.trigger(_events2.default.PLAYBACK_SETTINGSUPDATE);
	  };

	  HLS.prototype.onTimeUpdate = function onTimeUpdate() {
	    this.trigger(_events2.default.PLAYBACK_TIMEUPDATE, { current: this.getCurrentTime(), total: this.getDuration() }, this.name);
	  };

	  HLS.prototype.play = function play() {
	    if (!this.hls) {
	      this.setupHls();
	    }
	    _HTML5VideoPlayback.prototype.play.call(this);
	  };

	  HLS.prototype.pause = function pause() {
	    _HTML5VideoPlayback.prototype.pause.call(this);
	    if (this.dvrEnabled) {
	      this.updateDvr(true);
	    }
	  };

	  HLS.prototype.stop = function stop() {
	    _HTML5VideoPlayback.prototype.stop.call(this);
	    if (this.hls) {
	      this.hls.destroy();
	      delete this.hls;
	    }
	  };

	  HLS.prototype.updatePlaybackType = function updatePlaybackType(evt, data) {
	    this.playbackType = data.details.live ? _playback2.default.LIVE : _playback2.default.VOD;
	    this.fillLevels();
	    this.onLevelUpdated(evt, data);
	  };

	  HLS.prototype.fillLevels = function fillLevels() {
	    this._levels = this.hls.levels.map(function (level, index) {
	      return { id: index, level: level, label: level.bitrate / 1000 + 'Kbps'
	      };
	    });
	    this.trigger(_events2.default.PLAYBACK_LEVELS_AVAILABLE, this._levels);
	  };

	  HLS.prototype.onLevelUpdated = function onLevelUpdated(evt, data) {
	    var fragments = data.details.fragments;
	    if (fragments.length > 0) {
	      this.playableRegionStartTime = fragments[0].start;
	    }
	    var newDuration = data.details.totalduration;

	    // if it's a live stream then shorten the duration to remove access
	    // to the area after hlsjs's live sync point
	    // seeks to areas after this point sometimes have issues
	    if (this.playbackType === _playback2.default.LIVE) {
	      var currentLevel = this.hls.levels[data.level];
	      var fragmentTargetDuration = currentLevel.details.targetduration;
	      var hlsjsConfig = this.options.hlsjsConfig || {};
	      var liveSyncDurationCount = hlsjsConfig.liveSyncDurationCount || _hls2.default.DefaultConfig.liveSyncDurationCount;
	      var hiddenAreaDuration = fragmentTargetDuration * liveSyncDurationCount;
	      if (hiddenAreaDuration <= newDuration) {
	        newDuration -= hiddenAreaDuration;
	      }
	    }
	    if (newDuration !== this.playableRegionDuration) {
	      this.playableRegionDuration = newDuration;
	      this.onDurationChange();
	    }
	  };

	  HLS.prototype.onFragmentLoaded = function onFragmentLoaded(evt, data) {
	    this.trigger(_events2.default.PLAYBACK_FRAGMENT_LOADED, data);
	  };

	  HLS.prototype.onLevelSwitch = function onLevelSwitch(evt, data) {
	    if (!this.levels.length) {
	      this.fillLevels();
	    }
	    this.trigger(_events2.default.PLAYBACK_LEVEL_SWITCH_END);
	    this.trigger(_events2.default.PLAYBACK_LEVEL_SWITCH, data);
	    var currentLevel = this.hls.levels[data.level];
	    if (currentLevel) {
	      this.highDefinition = currentLevel.height >= 720 || currentLevel.bitrate / 1000 >= 2000;
	      this.trigger(_events2.default.PLAYBACK_HIGHDEFINITIONUPDATE, this.highDefinition);
	      this.trigger(_events2.default.PLAYBACK_BITRATE, {
	        height: currentLevel.height,
	        width: currentLevel.width,
	        bandwidth: currentLevel.bandwidth,
	        bitrate: currentLevel.bitrate,
	        level: data.level
	      });
	    }
	  };

	  HLS.prototype.getPlaybackType = function getPlaybackType() {
	    return this.playbackType;
	  };

	  HLS.prototype.isSeekEnabled = function isSeekEnabled() {
	    return this.playbackType === _playback2.default.VOD || this.dvrEnabled;
	  };

	  _createClass(HLS, [{
	    key: 'dvrEnabled',
	    get: function get() {
	      return this.playableRegionDuration >= this.minDvrSize && this.getPlaybackType() === _playback2.default.LIVE;
	    }
	  }]);

	  return HLS;
	}(_html5_video2.default);

	exports.default = HLS;


	HLS.canPlay = function (resource, mimeType) {
	  var resourceParts = resource.split('?')[0].match(/.*\.(.*)$/) || [];
	  var isHls = resourceParts.length > 1 && resourceParts[1] === "m3u8" || mimeType === 'application/x-mpegURL' || mimeType === 'application/vnd.apple.mpegurl';

	  return !!(_hls2.default.isSupported() && isHls && !_browser2.default.isSafari);
	};
	module.exports = exports['default'];

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// This is mostly for support of the es6 module export
	// syntax with the babel compiler, it looks like it doesnt support
	// function exports like we are used to in node/commonjs

	module.exports = __webpack_require__(73).default;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * HLS interface
	 */
	'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();
	//import FPSController from './controller/fps-controller';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(74);

	var _events2 = _interopRequireDefault(_events);

	var _errors = __webpack_require__(75);

	var _playlistLoader = __webpack_require__(76);

	var _playlistLoader2 = _interopRequireDefault(_playlistLoader);

	var _fragmentLoader = __webpack_require__(80);

	var _fragmentLoader2 = _interopRequireDefault(_fragmentLoader);

	var _abrController = __webpack_require__(81);

	var _abrController2 = _interopRequireDefault(_abrController);

	var _bufferController = __webpack_require__(82);

	var _bufferController2 = _interopRequireDefault(_bufferController);

	var _streamController = __webpack_require__(84);

	var _streamController2 = _interopRequireDefault(_streamController);

	var _levelController = __webpack_require__(103);

	var _levelController2 = _interopRequireDefault(_levelController);

	var _timelineController = __webpack_require__(104);

	var _timelineController2 = _interopRequireDefault(_timelineController);

	var _logger = __webpack_require__(83);

	var _xhrLoader = __webpack_require__(106);

	var _xhrLoader2 = _interopRequireDefault(_xhrLoader);

	var _events3 = __webpack_require__(96);

	var _events4 = _interopRequireDefault(_events3);

	var _keyLoader = __webpack_require__(107);

	var _keyLoader2 = _interopRequireDefault(_keyLoader);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var Hls = function () {
	  _createClass(Hls, null, [{
	    key: 'isSupported',
	    value: function isSupported() {
	      return window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
	    }
	  }, {
	    key: 'Events',
	    get: function get() {
	      return _events2.default;
	    }
	  }, {
	    key: 'ErrorTypes',
	    get: function get() {
	      return _errors.ErrorTypes;
	    }
	  }, {
	    key: 'ErrorDetails',
	    get: function get() {
	      return _errors.ErrorDetails;
	    }
	  }, {
	    key: 'DefaultConfig',
	    get: function get() {
	      if (!Hls.defaultConfig) {
	        Hls.defaultConfig = {
	          autoStartLoad: true,
	          debug: false,
	          maxBufferLength: 30,
	          maxBufferSize: 60 * 1000 * 1000,
	          maxBufferHole: 0.5,
	          maxSeekHole: 2,
	          liveSyncDurationCount: 3,
	          liveMaxLatencyDurationCount: Infinity,
	          liveSyncDuration: undefined,
	          liveMaxLatencyDuration: undefined,
	          maxMaxBufferLength: 600,
	          enableWorker: true,
	          enableSoftwareAES: true,
	          manifestLoadingTimeOut: 10000,
	          manifestLoadingMaxRetry: 1,
	          manifestLoadingRetryDelay: 1000,
	          levelLoadingTimeOut: 10000,
	          levelLoadingMaxRetry: 4,
	          levelLoadingRetryDelay: 1000,
	          fragLoadingTimeOut: 20000,
	          fragLoadingMaxRetry: 6,
	          fragLoadingRetryDelay: 1000,
	          fragLoadingLoopThreshold: 3,
	          startFragPrefetch: false,
	          // fpsDroppedMonitoringPeriod: 5000,
	          // fpsDroppedMonitoringThreshold: 0.2,
	          appendErrorMaxRetry: 3,
	          loader: _xhrLoader2.default,
	          fLoader: undefined,
	          pLoader: undefined,
	          abrController: _abrController2.default,
	          bufferController: _bufferController2.default,
	          streamController: _streamController2.default,
	          timelineController: _timelineController2.default,
	          enableCEA708Captions: true,
	          enableMP2TPassThrough: false
	        };
	      }
	      return Hls.defaultConfig;
	    },
	    set: function set(defaultConfig) {
	      Hls.defaultConfig = defaultConfig;
	    }
	  }]);

	  function Hls() {
	    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, Hls);

	    var defaultConfig = Hls.DefaultConfig;

	    if ((config.liveSyncDurationCount || config.liveMaxLatencyDurationCount) && (config.liveSyncDuration || config.liveMaxLatencyDuration)) {
	      throw new Error('Illegal hls.js config: don\'t mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration');
	    }

	    for (var prop in defaultConfig) {
	      if (prop in config) {
	        continue;
	      }
	      config[prop] = defaultConfig[prop];
	    }

	    if (config.liveMaxLatencyDurationCount !== undefined && config.liveMaxLatencyDurationCount <= config.liveSyncDurationCount) {
	      throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be gt "liveSyncDurationCount"');
	    }

	    if (config.liveMaxLatencyDuration !== undefined && (config.liveMaxLatencyDuration <= config.liveSyncDuration || config.liveSyncDuration === undefined)) {
	      throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be gt "liveSyncDuration"');
	    }

	    (0, _logger.enableLogs)(config.debug);
	    this.config = config;
	    // observer setup
	    var observer = this.observer = new _events4.default();
	    observer.trigger = function trigger(event) {
	      for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        data[_key - 1] = arguments[_key];
	      }

	      observer.emit.apply(observer, [event, event].concat(data));
	    };

	    observer.off = function off(event) {
	      for (var _len2 = arguments.length, data = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        data[_key2 - 1] = arguments[_key2];
	      }

	      observer.removeListener.apply(observer, [event].concat(data));
	    };
	    this.on = observer.on.bind(observer);
	    this.off = observer.off.bind(observer);
	    this.trigger = observer.trigger.bind(observer);
	    this.playlistLoader = new _playlistLoader2.default(this);
	    this.fragmentLoader = new _fragmentLoader2.default(this);
	    this.levelController = new _levelController2.default(this);
	    this.abrController = new config.abrController(this);
	    this.bufferController = new config.bufferController(this);
	    this.streamController = new config.streamController(this);
	    this.timelineController = new config.timelineController(this);
	    this.keyLoader = new _keyLoader2.default(this);
	    //this.fpsController = new FPSController(this);
	  }

	  _createClass(Hls, [{
	    key: 'destroy',
	    value: function destroy() {
	      _logger.logger.log('destroy');
	      this.trigger(_events2.default.DESTROYING);
	      this.detachMedia();
	      this.playlistLoader.destroy();
	      this.fragmentLoader.destroy();
	      this.levelController.destroy();
	      this.bufferController.destroy();
	      this.streamController.destroy();
	      this.timelineController.destroy();
	      this.keyLoader.destroy();
	      //this.fpsController.destroy();
	      this.url = null;
	      this.observer.removeAllListeners();
	    }
	  }, {
	    key: 'attachMedia',
	    value: function attachMedia(media) {
	      _logger.logger.log('attachMedia');
	      this.media = media;
	      this.trigger(_events2.default.MEDIA_ATTACHING, { media: media });
	    }
	  }, {
	    key: 'detachMedia',
	    value: function detachMedia() {
	      _logger.logger.log('detachMedia');
	      this.trigger(_events2.default.MEDIA_DETACHING);
	      this.media = null;
	    }
	  }, {
	    key: 'loadSource',
	    value: function loadSource(url) {
	      _logger.logger.log('loadSource:' + url);
	      this.url = url;
	      // when attaching to a source URL, trigger a playlist load
	      this.trigger(_events2.default.MANIFEST_LOADING, { url: url });
	    }
	  }, {
	    key: 'startLoad',
	    value: function startLoad() {
	      _logger.logger.log('startLoad');
	      this.streamController.startLoad();
	    }
	  }, {
	    key: 'swapAudioCodec',
	    value: function swapAudioCodec() {
	      _logger.logger.log('swapAudioCodec');
	      this.streamController.swapAudioCodec();
	    }
	  }, {
	    key: 'recoverMediaError',
	    value: function recoverMediaError() {
	      _logger.logger.log('recoverMediaError');
	      var media = this.media;
	      this.detachMedia();
	      this.attachMedia(media);
	    }

	    /** Return all quality levels **/

	  }, {
	    key: 'levels',
	    get: function get() {
	      return this.levelController.levels;
	    }

	    /** Return current playback quality level **/

	  }, {
	    key: 'currentLevel',
	    get: function get() {
	      return this.streamController.currentLevel;
	    }

	    /* set quality level immediately (-1 for automatic level selection) */

	    , set: function set(newLevel) {
	      _logger.logger.log('set currentLevel:' + newLevel);
	      this.loadLevel = newLevel;
	      this.streamController.immediateLevelSwitch();
	    }

	    /** Return next playback quality level (quality level of next fragment) **/

	  }, {
	    key: 'nextLevel',
	    get: function get() {
	      return this.streamController.nextLevel;
	    }

	    /* set quality level for next fragment (-1 for automatic level selection) */

	    , set: function set(newLevel) {
	      _logger.logger.log('set nextLevel:' + newLevel);
	      this.levelController.manualLevel = newLevel;
	      this.streamController.nextLevelSwitch();
	    }

	    /** Return the quality level of current/last loaded fragment **/

	  }, {
	    key: 'loadLevel',
	    get: function get() {
	      return this.levelController.level;
	    }

	    /* set quality level for current/next loaded fragment (-1 for automatic level selection) */

	    , set: function set(newLevel) {
	      _logger.logger.log('set loadLevel:' + newLevel);
	      this.levelController.manualLevel = newLevel;
	    }

	    /** Return the quality level of next loaded fragment **/

	  }, {
	    key: 'nextLoadLevel',
	    get: function get() {
	      return this.levelController.nextLoadLevel();
	    }

	    /** set quality level of next loaded fragment **/

	    , set: function set(level) {
	      this.levelController.level = level;
	    }

	    /** Return first level (index of first level referenced in manifest)
	    **/

	  }, {
	    key: 'firstLevel',
	    get: function get() {
	      return this.levelController.firstLevel;
	    }

	    /** set first level (index of first level referenced in manifest)
	    **/

	    , set: function set(newLevel) {
	      _logger.logger.log('set firstLevel:' + newLevel);
	      this.levelController.firstLevel = newLevel;
	    }

	    /** Return start level (level of first fragment that will be played back)
	        if not overrided by user, first level appearing in manifest will be used as start level
	        if -1 : automatic start level selection, playback will start from level matching download bandwidth (determined from download of first segment)
	    **/

	  }, {
	    key: 'startLevel',
	    get: function get() {
	      return this.levelController.startLevel;
	    }

	    /** set  start level (level of first fragment that will be played back)
	        if not overrided by user, first level appearing in manifest will be used as start level
	        if -1 : automatic start level selection, playback will start from level matching download bandwidth (determined from download of first segment)
	    **/

	    , set: function set(newLevel) {
	      _logger.logger.log('set startLevel:' + newLevel);
	      this.levelController.startLevel = newLevel;
	    }

	    /** Return the capping/max level value that could be used by automatic level selection algorithm **/

	  }, {
	    key: 'autoLevelCapping',
	    get: function get() {
	      return this.abrController.autoLevelCapping;
	    }

	    /** set the capping/max level value that could be used by automatic level selection algorithm **/

	    , set: function set(newLevel) {
	      _logger.logger.log('set autoLevelCapping:' + newLevel);
	      this.abrController.autoLevelCapping = newLevel;
	    }

	    /* check if we are in automatic level selection mode */

	  }, {
	    key: 'autoLevelEnabled',
	    get: function get() {
	      return this.levelController.manualLevel === -1;
	    }

	    /* return manual level */

	  }, {
	    key: 'manualLevel',
	    get: function get() {
	      return this.levelController.manualLevel;
	    }
	  }]);

	  return Hls;
	}();

	exports.default = Hls;

/***/ },
/* 74 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  // fired before MediaSource is attaching to media element - data: { media }
	  MEDIA_ATTACHING: 'hlsMediaAttaching',
	  // fired when MediaSource has been succesfully attached to media element - data: { }
	  MEDIA_ATTACHED: 'hlsMediaAttached',
	  // fired before detaching MediaSource from media element - data: { }
	  MEDIA_DETACHING: 'hlsMediaDetaching',
	  // fired when MediaSource has been detached from media element - data: { }
	  MEDIA_DETACHED: 'hlsMediaDetached',
	  // fired when we buffer is going to be resetted
	  BUFFER_RESET: 'hlsBufferReset',
	  // fired when we know about the codecs that we need buffers for to push into - data: {tracks : { container, codec, levelCodec, initSegment, metadata }}
	  BUFFER_CODECS: 'hlsBufferCodecs',
	  // fired when we append a segment to the buffer - data: { segment: segment object }
	  BUFFER_APPENDING: 'hlsBufferAppending',
	  // fired when we are done with appending a media segment to the buffer
	  BUFFER_APPENDED: 'hlsBufferAppended',
	  // fired when the stream is finished and we want to notify the media buffer that there will be no more data
	  BUFFER_EOS: 'hlsBufferEos',
	  // fired when the media buffer should be flushed - data {startOffset, endOffset}
	  BUFFER_FLUSHING: 'hlsBufferFlushing',
	  // fired when the media has been flushed
	  BUFFER_FLUSHED: 'hlsBufferFlushed',
	  // fired to signal that a manifest loading starts - data: { url : manifestURL}
	  MANIFEST_LOADING: 'hlsManifestLoading',
	  // fired after manifest has been loaded - data: { levels : [available quality levels] , url : manifestURL, stats : { trequest, tfirst, tload, mtime}}
	  MANIFEST_LOADED: 'hlsManifestLoaded',
	  // fired after manifest has been parsed - data: { levels : [available quality levels] , firstLevel : index of first quality level appearing in Manifest}
	  MANIFEST_PARSED: 'hlsManifestParsed',
	  // fired when a level playlist loading starts - data: { url : level URL  level : id of level being loaded}
	  LEVEL_LOADING: 'hlsLevelLoading',
	  // fired when a level playlist loading finishes - data: { details : levelDetails object, level : id of loaded level, stats : { trequest, tfirst, tload, mtime} }
	  LEVEL_LOADED: 'hlsLevelLoaded',
	  // fired when a level's details have been updated based on previous details, after it has been loaded. - data: { details : levelDetails object, level : id of updated level }
	  LEVEL_UPDATED: 'hlsLevelUpdated',
	  // fired when a level's PTS information has been updated after parsing a fragment - data: { details : levelDetails object, level : id of updated level, drift: PTS drift observed when parsing last fragment }
	  LEVEL_PTS_UPDATED: 'hlsLevelPtsUpdated',
	  // fired when a level switch is requested - data: { level : id of new level }
	  LEVEL_SWITCH: 'hlsLevelSwitch',
	  // fired when a fragment loading starts - data: { frag : fragment object}
	  FRAG_LOADING: 'hlsFragLoading',
	  // fired when a fragment loading is progressing - data: { frag : fragment object, { trequest, tfirst, loaded}}
	  FRAG_LOAD_PROGRESS: 'hlsFragLoadProgress',
	  // Identifier for fragment load aborting for emergency switch down - data: {frag : fragment object}
	  FRAG_LOAD_EMERGENCY_ABORTED: 'hlsFragLoadEmergencyAborted',
	  // fired when a fragment loading is completed - data: { frag : fragment object, payload : fragment payload, stats : { trequest, tfirst, tload, length}}
	  FRAG_LOADED: 'hlsFragLoaded',
	  // fired when Init Segment has been extracted from fragment - data: { moov : moov MP4 box, codecs : codecs found while parsing fragment}
	  FRAG_PARSING_INIT_SEGMENT: 'hlsFragParsingInitSegment',
	  // fired when parsing sei text is completed - data: { samples : [ sei samples pes ] }
	  FRAG_PARSING_USERDATA: 'hlsFragParsingUserdata',
	  // fired when parsing id3 is completed - data: { samples : [ id3 samples pes ] }
	  FRAG_PARSING_METADATA: 'hlsFragParsingMetadata',
	  // fired when data have been extracted from fragment - data: { data1 : moof MP4 box or TS fragments, data2 : mdat MP4 box or null}
	  FRAG_PARSING_DATA: 'hlsFragParsingData',
	  // fired when fragment parsing is completed - data: undefined
	  FRAG_PARSED: 'hlsFragParsed',
	  // fired when fragment remuxed MP4 boxes have all been appended into SourceBuffer - data: { frag : fragment object, stats : { trequest, tfirst, tload, tparsed, tbuffered, length} }
	  FRAG_BUFFERED: 'hlsFragBuffered',
	  // fired when fragment matching with current media position is changing - data : { frag : fragment object }
	  FRAG_CHANGED: 'hlsFragChanged',
	  // Identifier for a FPS drop event - data: {curentDropped, currentDecoded, totalDroppedFrames}
	  FPS_DROP: 'hlsFpsDrop',
	  // Identifier for an error event - data: { type : error type, details : error details, fatal : if true, hls.js cannot/will not try to recover, if false, hls.js will try to recover,other error specific data}
	  ERROR: 'hlsError',
	  // fired when hls.js instance starts destroying. Different from MEDIA_DETACHED as one could want to detach and reattach a media to the instance of hls.js to handle mid-rolls for example
	  DESTROYING: 'hlsDestroying',
	  // fired when a decrypt key loading starts - data: { frag : fragment object}
	  KEY_LOADING: 'hlsKeyLoading',
	  // fired when a decrypt key loading is completed - data: { frag : fragment object, payload : key payload, stats : { trequest, tfirst, tload, length}}
	  KEY_LOADED: 'hlsKeyLoaded'
	};

/***/ },
/* 75 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ErrorTypes = exports.ErrorTypes = {
	  // Identifier for a network error (loading error / timeout ...)
	  NETWORK_ERROR: 'networkError',
	  // Identifier for a media Error (video/parsing/mediasource error)
	  MEDIA_ERROR: 'mediaError',
	  // Identifier for all other errors
	  OTHER_ERROR: 'otherError'
	};

	var ErrorDetails = exports.ErrorDetails = {
	  // Identifier for a manifest load error - data: { url : faulty URL, response : XHR response}
	  MANIFEST_LOAD_ERROR: 'manifestLoadError',
	  // Identifier for a manifest load timeout - data: { url : faulty URL, response : XHR response}
	  MANIFEST_LOAD_TIMEOUT: 'manifestLoadTimeOut',
	  // Identifier for a manifest parsing error - data: { url : faulty URL, reason : error reason}
	  MANIFEST_PARSING_ERROR: 'manifestParsingError',
	  // Identifier for a manifest with only incompatible codecs error - data: { url : faulty URL, reason : error reason}
	  MANIFEST_INCOMPATIBLE_CODECS_ERROR: 'manifestIncompatibleCodecsError',
	  // Identifier for playlist load error - data: { url : faulty URL, response : XHR response}
	  LEVEL_LOAD_ERROR: 'levelLoadError',
	  // Identifier for playlist load timeout - data: { url : faulty URL, response : XHR response}
	  LEVEL_LOAD_TIMEOUT: 'levelLoadTimeOut',
	  // Identifier for a level switch error - data: { level : faulty level Id, event : error description}
	  LEVEL_SWITCH_ERROR: 'levelSwitchError',
	  // Identifier for fragment load error - data: { frag : fragment object, response : XHR response}
	  FRAG_LOAD_ERROR: 'fragLoadError',
	  // Identifier for fragment loop loading error - data: { frag : fragment object}
	  FRAG_LOOP_LOADING_ERROR: 'fragLoopLoadingError',
	  // Identifier for fragment load timeout error - data: { frag : fragment object}
	  FRAG_LOAD_TIMEOUT: 'fragLoadTimeOut',
	  // Identifier for a fragment decryption error event - data: parsing error description
	  FRAG_DECRYPT_ERROR: 'fragDecryptError',
	  // Identifier for a fragment parsing error event - data: parsing error description
	  FRAG_PARSING_ERROR: 'fragParsingError',
	  // Identifier for decrypt key load error - data: { frag : fragment object, response : XHR response}
	  KEY_LOAD_ERROR: 'keyLoadError',
	  // Identifier for decrypt key load timeout error - data: { frag : fragment object}
	  KEY_LOAD_TIMEOUT: 'keyLoadTimeOut',
	  // Identifier for a buffer append error - data: append error description
	  BUFFER_APPEND_ERROR: 'bufferAppendError',
	  // Identifier for a buffer appending error event - data: appending error description
	  BUFFER_APPENDING_ERROR: 'bufferAppendingError',
	  // Identifier for a buffer stalled error event
	  BUFFER_STALLED_ERROR: 'bufferStalledError',
	  // Identifier for a buffer full event
	  BUFFER_FULL_ERROR: 'bufferFullError',
	  // Identifier for a buffer seek over hole event
	  BUFFER_SEEK_OVER_HOLE: 'bufferSeekOverHole'
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(74);

	var _events2 = _interopRequireDefault(_events);

	var _eventHandler = __webpack_require__(77);

	var _eventHandler2 = _interopRequireDefault(_eventHandler);

	var _errors = __webpack_require__(75);

	var _url = __webpack_require__(78);

	var _url2 = _interopRequireDefault(_url);

	var _attrList = __webpack_require__(79);

	var _attrList2 = _interopRequireDefault(_attrList);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	} /**
	   * Playlist Loader
	  */

	//import {logger} from '../utils/logger';

	var PlaylistLoader = function (_EventHandler) {
	  _inherits(PlaylistLoader, _EventHandler);

	  function PlaylistLoader(hls) {
	    _classCallCheck(this, PlaylistLoader);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(PlaylistLoader).call(this, hls, _events2.default.MANIFEST_LOADING, _events2.default.LEVEL_LOADING));
	  }

	  _createClass(PlaylistLoader, [{
	    key: 'destroy',
	    value: function destroy() {
	      if (this.loader) {
	        this.loader.destroy();
	        this.loader = null;
	      }
	      this.url = this.id = null;
	      _eventHandler2.default.prototype.destroy.call(this);
	    }
	  }, {
	    key: 'onManifestLoading',
	    value: function onManifestLoading(data) {
	      this.load(data.url, null);
	    }
	  }, {
	    key: 'onLevelLoading',
	    value: function onLevelLoading(data) {
	      this.load(data.url, data.level, data.id);
	    }
	  }, {
	    key: 'load',
	    value: function load(url, id1, id2) {
	      var config = this.hls.config,
	          retry,
	          timeout,
	          retryDelay;
	      this.url = url;
	      this.id = id1;
	      this.id2 = id2;
	      if (this.id === null) {
	        retry = config.manifestLoadingMaxRetry;
	        timeout = config.manifestLoadingTimeOut;
	        retryDelay = config.manifestLoadingRetryDelay;
	      } else {
	        retry = config.levelLoadingMaxRetry;
	        timeout = config.levelLoadingTimeOut;
	        retryDelay = config.levelLoadingRetryDelay;
	      }
	      this.loader = typeof config.pLoader !== 'undefined' ? new config.pLoader(config) : new config.loader(config);
	      this.loader.load(url, '', this.loadsuccess.bind(this), this.loaderror.bind(this), this.loadtimeout.bind(this), timeout, retry, retryDelay);
	    }
	  }, {
	    key: 'resolve',
	    value: function resolve(url, baseUrl) {
	      return _url2.default.buildAbsoluteURL(baseUrl, url);
	    }
	  }, {
	    key: 'parseMasterPlaylist',
	    value: function parseMasterPlaylist(string, baseurl) {
	      var levels = [],
	          result = undefined;

	      // https://regex101.com is your friend
	      var re = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g;
	      while ((result = re.exec(string)) != null) {
	        var level = {};

	        var attrs = level.attrs = new _attrList2.default(result[1]);
	        level.url = this.resolve(result[2], baseurl);

	        var resolution = attrs.decimalResolution('RESOLUTION');
	        if (resolution) {
	          level.width = resolution.width;
	          level.height = resolution.height;
	        }
	        level.bitrate = attrs.decimalInteger('BANDWIDTH');
	        level.name = attrs.NAME;

	        var codecs = attrs.CODECS;
	        if (codecs) {
	          codecs = codecs.split(',');
	          for (var i = 0; i < codecs.length; i++) {
	            var codec = codecs[i];
	            if (codec.indexOf('avc1') !== -1) {
	              level.videoCodec = this.avc1toavcoti(codec);
	            } else {
	              level.audioCodec = codec;
	            }
	          }
	        }

	        levels.push(level);
	      }
	      return levels;
	    }
	  }, {
	    key: 'avc1toavcoti',
	    value: function avc1toavcoti(codec) {
	      var result,
	          avcdata = codec.split('.');
	      if (avcdata.length > 2) {
	        result = avcdata.shift() + '.';
	        result += parseInt(avcdata.shift()).toString(16);
	        result += ('000' + parseInt(avcdata.shift()).toString(16)).substr(-4);
	      } else {
	        result = codec;
	      }
	      return result;
	    }
	  }, {
	    key: 'cloneObj',
	    value: function cloneObj(obj) {
	      return JSON.parse(JSON.stringify(obj));
	    }
	  }, {
	    key: 'parseLevelPlaylist',
	    value: function parseLevelPlaylist(string, baseurl, id) {
	      var currentSN = 0,
	          totalduration = 0,
	          level = { url: baseurl, fragments: [], live: true, startSN: 0 },
	          levelkey = { method: null, key: null, iv: null, uri: null },
	          cc = 0,
	          programDateTime = null,
	          frag = null,
	          result,
	          regexp,
	          byteRangeEndOffset,
	          byteRangeStartOffset;

	      regexp = /(?:#EXT-X-(MEDIA-SEQUENCE):(\d+))|(?:#EXT-X-(TARGETDURATION):(\d+))|(?:#EXT-X-(KEY):(.*))|(?:#EXT(INF):([\d\.]+)[^\r\n]*([\r\n]+[^#|\r\n]+)?)|(?:#EXT-X-(BYTERANGE):([\d]+[@[\d]*)]*[\r\n]+([^#|\r\n]+)?|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(PROGRAM-DATE-TIME):(.*))/g;
	      while ((result = regexp.exec(string)) !== null) {
	        result.shift();
	        result = result.filter(function (n) {
	          return n !== undefined;
	        });
	        switch (result[0]) {
	          case 'MEDIA-SEQUENCE':
	            currentSN = level.startSN = parseInt(result[1]);
	            break;
	          case 'TARGETDURATION':
	            level.targetduration = parseFloat(result[1]);
	            break;
	          case 'ENDLIST':
	            level.live = false;
	            break;
	          case 'DIS':
	            cc++;
	            break;
	          case 'BYTERANGE':
	            var params = result[1].split('@');
	            if (params.length === 1) {
	              byteRangeStartOffset = byteRangeEndOffset;
	            } else {
	              byteRangeStartOffset = parseInt(params[1]);
	            }
	            byteRangeEndOffset = parseInt(params[0]) + byteRangeStartOffset;
	            if (frag && !frag.url) {
	              frag.byteRangeStartOffset = byteRangeStartOffset;
	              frag.byteRangeEndOffset = byteRangeEndOffset;
	              frag.url = this.resolve(result[2], baseurl);
	            }
	            break;
	          case 'INF':
	            var duration = parseFloat(result[1]);
	            if (!isNaN(duration)) {
	              var fragdecryptdata,
	                  sn = currentSN++;
	              if (levelkey.method && levelkey.uri && !levelkey.iv) {
	                fragdecryptdata = this.cloneObj(levelkey);
	                var uint8View = new Uint8Array(16);
	                for (var i = 12; i < 16; i++) {
	                  uint8View[i] = sn >> 8 * (15 - i) & 0xff;
	                }
	                fragdecryptdata.iv = uint8View;
	              } else {
	                fragdecryptdata = levelkey;
	              }
	              var url = result[2] ? this.resolve(result[2], baseurl) : null;
	              frag = { url: url, duration: duration, start: totalduration, sn: sn, level: id, cc: cc, byteRangeStartOffset: byteRangeStartOffset, byteRangeEndOffset: byteRangeEndOffset, decryptdata: fragdecryptdata, programDateTime: programDateTime };
	              level.fragments.push(frag);
	              totalduration += duration;
	              byteRangeStartOffset = null;
	              programDateTime = null;
	            }
	            break;
	          case 'KEY':
	            // https://tools.ietf.org/html/draft-pantos-http-live-streaming-08#section-3.4.4
	            var decryptparams = result[1];
	            var keyAttrs = new _attrList2.default(decryptparams);
	            var decryptmethod = keyAttrs.enumeratedString('METHOD'),
	                decrypturi = keyAttrs.URI,
	                decryptiv = keyAttrs.hexadecimalInteger('IV');
	            if (decryptmethod) {
	              levelkey = { method: null, key: null, iv: null, uri: null };
	              if (decrypturi && decryptmethod === 'AES-128') {
	                levelkey.method = decryptmethod;
	                // URI to get the key
	                levelkey.uri = this.resolve(decrypturi, baseurl);
	                levelkey.key = null;
	                // Initialization Vector (IV)
	                levelkey.iv = decryptiv;
	              }
	            }
	            break;
	          case 'PROGRAM-DATE-TIME':
	            programDateTime = new Date(Date.parse(result[1]));
	            break;
	          default:
	            break;
	        }
	      }
	      //logger.log('found ' + level.fragments.length + ' fragments');
	      if (frag && !frag.url) {
	        level.fragments.pop();
	        totalduration -= frag.duration;
	      }
	      level.totalduration = totalduration;
	      level.endSN = currentSN - 1;
	      return level;
	    }
	  }, {
	    key: 'loadsuccess',
	    value: function loadsuccess(event, stats) {
	      var target = event.currentTarget,
	          string = target.responseText,
	          url = target.responseURL,
	          id = this.id,
	          id2 = this.id2,
	          hls = this.hls,
	          levels;
	      // responseURL not supported on some browsers (it is used to detect URL redirection)
	      if (url === undefined) {
	        // fallback to initial URL
	        url = this.url;
	      }
	      stats.tload = performance.now();
	      stats.mtime = new Date(target.getResponseHeader('Last-Modified'));
	      if (string.indexOf('#EXTM3U') === 0) {
	        if (string.indexOf('#EXTINF:') > 0) {
	          // 1 level playlist
	          // if first request, fire manifest loaded event, level will be reloaded afterwards
	          // (this is to have a uniform logic for 1 level/multilevel playlists)
	          if (this.id === null) {
	            hls.trigger(_events2.default.MANIFEST_LOADED, { levels: [{ url: url }], url: url, stats: stats });
	          } else {
	            var levelDetails = this.parseLevelPlaylist(string, url, id);
	            stats.tparsed = performance.now();
	            hls.trigger(_events2.default.LEVEL_LOADED, { details: levelDetails, level: id, id: id2, stats: stats });
	          }
	        } else {
	          levels = this.parseMasterPlaylist(string, url);
	          // multi level playlist, parse level info
	          if (levels.length) {
	            hls.trigger(_events2.default.MANIFEST_LOADED, { levels: levels, url: url, stats: stats });
	          } else {
	            hls.trigger(_events2.default.ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: _errors.ErrorDetails.MANIFEST_PARSING_ERROR, fatal: true, url: url, reason: 'no level found in manifest' });
	          }
	        }
	      } else {
	        hls.trigger(_events2.default.ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: _errors.ErrorDetails.MANIFEST_PARSING_ERROR, fatal: true, url: url, reason: 'no EXTM3U delimiter' });
	      }
	    }
	  }, {
	    key: 'loaderror',
	    value: function loaderror(event) {
	      var details, fatal;
	      if (this.id === null) {
	        details = _errors.ErrorDetails.MANIFEST_LOAD_ERROR;
	        fatal = true;
	      } else {
	        details = _errors.ErrorDetails.LEVEL_LOAD_ERROR;
	        fatal = false;
	      }
	      if (this.loader) {
	        this.loader.abort();
	      }
	      this.hls.trigger(_events2.default.ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: details, fatal: fatal, url: this.url, loader: this.loader, response: event.currentTarget, level: this.id, id: this.id2 });
	    }
	  }, {
	    key: 'loadtimeout',
	    value: function loadtimeout() {
	      var details, fatal;
	      if (this.id === null) {
	        details = _errors.ErrorDetails.MANIFEST_LOAD_TIMEOUT;
	        fatal = true;
	      } else {
	        details = _errors.ErrorDetails.LEVEL_LOAD_TIMEOUT;
	        fatal = false;
	      }
	      if (this.loader) {
	        this.loader.abort();
	      }
	      this.hls.trigger(_events2.default.ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: details, fatal: fatal, url: this.url, loader: this.loader, level: this.id, id: this.id2 });
	    }
	  }]);

	  return PlaylistLoader;
	}(_eventHandler2.default);

	exports.default = PlaylistLoader;

/***/ },
/* 77 */
/***/ function(module, exports) {

	'use strict';

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	};

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	/*
	*
	* All objects in the event handling chain should inherit from this class
	*
	*/

	//import {logger} from './utils/logger';

	var EventHandler = function () {
	  function EventHandler(hls) {
	    _classCallCheck(this, EventHandler);

	    this.hls = hls;
	    this.onEvent = this.onEvent.bind(this);

	    for (var _len = arguments.length, events = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      events[_key - 1] = arguments[_key];
	    }

	    this.handledEvents = events;
	    this.useGenericHandler = true;

	    this.registerListeners();
	  }

	  _createClass(EventHandler, [{
	    key: 'destroy',
	    value: function destroy() {
	      this.unregisterListeners();
	    }
	  }, {
	    key: 'isEventHandler',
	    value: function isEventHandler() {
	      return _typeof(this.handledEvents) === 'object' && this.handledEvents.length && typeof this.onEvent === 'function';
	    }
	  }, {
	    key: 'registerListeners',
	    value: function registerListeners() {
	      if (this.isEventHandler()) {
	        this.handledEvents.forEach(function (event) {
	          if (event === 'hlsEventGeneric') {
	            throw new Error('Forbidden event name: ' + event);
	          }
	          this.hls.on(event, this.onEvent);
	        }.bind(this));
	      }
	    }
	  }, {
	    key: 'unregisterListeners',
	    value: function unregisterListeners() {
	      if (this.isEventHandler()) {
	        this.handledEvents.forEach(function (event) {
	          this.hls.off(event, this.onEvent);
	        }.bind(this));
	      }
	    }

	    /*
	    * arguments: event (string), data (any)
	    */

	  }, {
	    key: 'onEvent',
	    value: function onEvent(event, data) {
	      this.onEventGeneric(event, data);
	    }
	  }, {
	    key: 'onEventGeneric',
	    value: function onEventGeneric(event, data) {
	      var eventToFunction = function eventToFunction(event, data) {
	        var funcName = 'on' + event.replace('hls', '');
	        if (typeof this[funcName] !== 'function') {
	          throw new Error('Event ' + event + ' has no generic handler in this ' + this.constructor.name + ' class (tried ' + funcName + ')');
	        }
	        return this[funcName].bind(this, data);
	      };
	      eventToFunction.call(this, event, data).call();
	    }
	  }]);

	  return EventHandler;
	}();

	exports.default = EventHandler;

/***/ },
/* 78 */
/***/ function(module, exports) {

	'use strict';

	var URLHelper = {

	  // build an absolute URL from a relative one using the provided baseURL
	  // if relativeURL is an absolute URL it will be returned as is.
	  buildAbsoluteURL: function buildAbsoluteURL(baseURL, relativeURL) {
	    // remove any remaining space and CRLF
	    relativeURL = relativeURL.trim();
	    if (/^[a-z]+:/i.test(relativeURL)) {
	      // complete url, not relative
	      return relativeURL;
	    }

	    var relativeURLQuery = null;
	    var relativeURLHash = null;

	    var relativeURLHashSplit = /^([^#]*)(.*)$/.exec(relativeURL);
	    if (relativeURLHashSplit) {
	      relativeURLHash = relativeURLHashSplit[2];
	      relativeURL = relativeURLHashSplit[1];
	    }
	    var relativeURLQuerySplit = /^([^\?]*)(.*)$/.exec(relativeURL);
	    if (relativeURLQuerySplit) {
	      relativeURLQuery = relativeURLQuerySplit[2];
	      relativeURL = relativeURLQuerySplit[1];
	    }

	    var baseURLHashSplit = /^([^#]*)(.*)$/.exec(baseURL);
	    if (baseURLHashSplit) {
	      baseURL = baseURLHashSplit[1];
	    }
	    var baseURLQuerySplit = /^([^\?]*)(.*)$/.exec(baseURL);
	    if (baseURLQuerySplit) {
	      baseURL = baseURLQuerySplit[1];
	    }

	    var baseURLDomainSplit = /^((([a-z]+):)?\/\/[a-z0-9\.\-_~]+(:[0-9]+)?\/)(.*)$/i.exec(baseURL);
	    var baseURLProtocol = baseURLDomainSplit[3];
	    var baseURLDomain = baseURLDomainSplit[1];
	    var baseURLPath = baseURLDomainSplit[5];

	    var builtURL = null;
	    if (/^\/\//.test(relativeURL)) {
	      builtURL = baseURLProtocol + '://' + URLHelper.buildAbsolutePath('', relativeURL.substring(2));
	    } else if (/^\//.test(relativeURL)) {
	      builtURL = baseURLDomain + URLHelper.buildAbsolutePath('', relativeURL.substring(1));
	    } else {
	      builtURL = URLHelper.buildAbsolutePath(baseURLDomain + baseURLPath, relativeURL);
	    }

	    // put the query and hash parts back
	    if (relativeURLQuery) {
	      builtURL += relativeURLQuery;
	    }
	    if (relativeURLHash) {
	      builtURL += relativeURLHash;
	    }
	    return builtURL;
	  },

	  // build an absolute path using the provided basePath
	  // adapted from https://developer.mozilla.org/en-US/docs/Web/API/document/cookie#Using_relative_URLs_in_the_path_parameter
	  // this does not handle the case where relativePath is "/" or "//". These cases should be handled outside this.
	  buildAbsolutePath: function buildAbsolutePath(basePath, relativePath) {
	    var sRelPath = relativePath;
	    var nUpLn,
	        sDir = '',
	        sPath = basePath.replace(/[^\/]*$/, sRelPath.replace(/(\/|^)(?:\.?\/+)+/g, '$1'));
	    for (var nEnd, nStart = 0; nEnd = sPath.indexOf('/../', nStart), nEnd > -1; nStart = nEnd + nUpLn) {
	      nUpLn = /^\/(?:\.\.\/)*/.exec(sPath.slice(nEnd))[0].length;
	      sDir = (sDir + sPath.substring(nStart, nEnd)).replace(new RegExp('(?:\\\/+[^\\\/]*){0,' + (nUpLn - 1) / 3 + '}$'), '/');
	    }
	    return sDir + sPath.substr(nStart);
	  }
	};

	module.exports = URLHelper;

/***/ },
/* 79 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	// adapted from https://github.com/kanongil/node-m3u8parse/blob/master/attrlist.js

	var AttrList = function () {
	  function AttrList(attrs) {
	    _classCallCheck(this, AttrList);

	    if (typeof attrs === 'string') {
	      attrs = AttrList.parseAttrList(attrs);
	    }
	    for (var attr in attrs) {
	      if (attrs.hasOwnProperty(attr)) {
	        this[attr] = attrs[attr];
	      }
	    }
	  }

	  _createClass(AttrList, [{
	    key: 'decimalInteger',
	    value: function decimalInteger(attrName) {
	      var intValue = parseInt(this[attrName], 10);
	      if (intValue > Number.MAX_SAFE_INTEGER) {
	        return Infinity;
	      }
	      return intValue;
	    }
	  }, {
	    key: 'hexadecimalInteger',
	    value: function hexadecimalInteger(attrName) {
	      if (this[attrName]) {
	        var stringValue = (this[attrName] || '0x').slice(2);
	        stringValue = (stringValue.length & 1 ? '0' : '') + stringValue;

	        var value = new Uint8Array(stringValue.length / 2);
	        for (var i = 0; i < stringValue.length / 2; i++) {
	          value[i] = parseInt(stringValue.slice(i * 2, i * 2 + 2), 16);
	        }
	        return value;
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: 'hexadecimalIntegerAsNumber',
	    value: function hexadecimalIntegerAsNumber(attrName) {
	      var intValue = parseInt(this[attrName], 16);
	      if (intValue > Number.MAX_SAFE_INTEGER) {
	        return Infinity;
	      }
	      return intValue;
	    }
	  }, {
	    key: 'decimalFloatingPoint',
	    value: function decimalFloatingPoint(attrName) {
	      return parseFloat(this[attrName]);
	    }
	  }, {
	    key: 'enumeratedString',
	    value: function enumeratedString(attrName) {
	      return this[attrName];
	    }
	  }, {
	    key: 'decimalResolution',
	    value: function decimalResolution(attrName) {
	      var res = /^(\d+)x(\d+)$/.exec(this[attrName]);
	      if (res === null) {
	        return undefined;
	      }
	      return {
	        width: parseInt(res[1], 10),
	        height: parseInt(res[2], 10)
	      };
	    }
	  }], [{
	    key: 'parseAttrList',
	    value: function parseAttrList(input) {
	      var re = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g;
	      var match,
	          attrs = {};
	      while ((match = re.exec(input)) !== null) {
	        var value = match[2],
	            quote = '"';

	        if (value.indexOf(quote) === 0 && value.lastIndexOf(quote) === value.length - 1) {
	          value = value.slice(1, -1);
	        }
	        attrs[match[1]] = value;
	      }
	      return attrs;
	    }
	  }]);

	  return AttrList;
	}();

	exports.default = AttrList;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(74);

	var _events2 = _interopRequireDefault(_events);

	var _eventHandler = __webpack_require__(77);

	var _eventHandler2 = _interopRequireDefault(_eventHandler);

	var _errors = __webpack_require__(75);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	} /*
	   * Fragment Loader
	  */

	var FragmentLoader = function (_EventHandler) {
	  _inherits(FragmentLoader, _EventHandler);

	  function FragmentLoader(hls) {
	    _classCallCheck(this, FragmentLoader);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(FragmentLoader).call(this, hls, _events2.default.FRAG_LOADING));
	  }

	  _createClass(FragmentLoader, [{
	    key: 'destroy',
	    value: function destroy() {
	      if (this.loader) {
	        this.loader.destroy();
	        this.loader = null;
	      }
	      _eventHandler2.default.prototype.destroy.call(this);
	    }
	  }, {
	    key: 'onFragLoading',
	    value: function onFragLoading(data) {
	      var frag = data.frag;
	      this.frag = frag;
	      this.frag.loaded = 0;
	      var config = this.hls.config;
	      frag.loader = this.loader = typeof config.fLoader !== 'undefined' ? new config.fLoader(config) : new config.loader(config);
	      this.loader.load(frag.url, 'arraybuffer', this.loadsuccess.bind(this), this.loaderror.bind(this), this.loadtimeout.bind(this), config.fragLoadingTimeOut, 1, 0, this.loadprogress.bind(this), frag);
	    }
	  }, {
	    key: 'loadsuccess',
	    value: function loadsuccess(event, stats) {
	      var payload = event.currentTarget.response;
	      stats.length = payload.byteLength;
	      // detach fragment loader on load success
	      this.frag.loader = undefined;
	      this.hls.trigger(_events2.default.FRAG_LOADED, { payload: payload, frag: this.frag, stats: stats });
	    }
	  }, {
	    key: 'loaderror',
	    value: function loaderror(event) {
	      if (this.loader) {
	        this.loader.abort();
	      }
	      this.hls.trigger(_events2.default.ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: _errors.ErrorDetails.FRAG_LOAD_ERROR, fatal: false, frag: this.frag, response: event });
	    }
	  }, {
	    key: 'loadtimeout',
	    value: function loadtimeout() {
	      if (this.loader) {
	        this.loader.abort();
	      }
	      this.hls.trigger(_events2.default.ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: _errors.ErrorDetails.FRAG_LOAD_TIMEOUT, fatal: false, frag: this.frag });
	    }
	  }, {
	    key: 'loadprogress',
	    value: function loadprogress(event, stats) {
	      this.frag.loaded = stats.loaded;
	      this.hls.trigger(_events2.default.FRAG_LOAD_PROGRESS, { frag: this.frag, stats: stats });
	    }
	  }]);

	  return FragmentLoader;
	}(_eventHandler2.default);

	exports.default = FragmentLoader;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(74);

	var _events2 = _interopRequireDefault(_events);

	var _eventHandler = __webpack_require__(77);

	var _eventHandler2 = _interopRequireDefault(_eventHandler);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	} /*
	   * simple ABR Controller
	  */

	var AbrController = function (_EventHandler) {
	  _inherits(AbrController, _EventHandler);

	  function AbrController(hls) {
	    _classCallCheck(this, AbrController);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AbrController).call(this, hls, _events2.default.FRAG_LOAD_PROGRESS));

	    _this.lastfetchlevel = 0;
	    _this._autoLevelCapping = -1;
	    _this._nextAutoLevel = -1;
	    return _this;
	  }

	  _createClass(AbrController, [{
	    key: 'destroy',
	    value: function destroy() {
	      _eventHandler2.default.prototype.destroy.call(this);
	    }
	  }, {
	    key: 'onFragLoadProgress',
	    value: function onFragLoadProgress(data) {
	      var stats = data.stats;
	      // only update stats if first frag loading
	      // if same frag is loaded multiple times, it might be in browser cache, and loaded quickly
	      // and leading to wrong bw estimation
	      if (stats.aborted === undefined && data.frag.loadCounter === 1) {
	        this.lastfetchduration = (performance.now() - stats.trequest) / 1000;
	        this.lastfetchlevel = data.frag.level;
	        this.lastbw = stats.loaded * 8 / this.lastfetchduration;
	        //console.log(`fetchDuration:${this.lastfetchduration},bw:${(this.lastbw/1000).toFixed(0)}/${stats.aborted}`);
	      }
	    }

	    /** Return the capping/max level value that could be used by automatic level selection algorithm **/

	  }, {
	    key: 'autoLevelCapping',
	    get: function get() {
	      return this._autoLevelCapping;
	    }

	    /** set the capping/max level value that could be used by automatic level selection algorithm **/

	    , set: function set(newLevel) {
	      this._autoLevelCapping = newLevel;
	    }
	  }, {
	    key: 'nextAutoLevel',
	    get: function get() {
	      var lastbw = this.lastbw,
	          hls = this.hls,
	          adjustedbw,
	          i,
	          maxAutoLevel;
	      if (this._autoLevelCapping === -1) {
	        maxAutoLevel = hls.levels.length - 1;
	      } else {
	        maxAutoLevel = this._autoLevelCapping;
	      }

	      if (this._nextAutoLevel !== -1) {
	        var nextLevel = Math.min(this._nextAutoLevel, maxAutoLevel);
	        if (nextLevel === this.lastfetchlevel) {
	          this._nextAutoLevel = -1;
	        } else {
	          return nextLevel;
	        }
	      }

	      // follow algorithm captured from stagefright :
	      // https://android.googlesource.com/platform/frameworks/av/+/master/media/libstagefright/httplive/LiveSession.cpp
	      // Pick the highest bandwidth stream below or equal to estimated bandwidth.
	      for (i = 0; i <= maxAutoLevel; i++) {
	        // consider only 80% of the available bandwidth, but if we are switching up,
	        // be even more conservative (70%) to avoid overestimating and immediately
	        // switching back.
	        if (i <= this.lastfetchlevel) {
	          adjustedbw = 0.8 * lastbw;
	        } else {
	          adjustedbw = 0.7 * lastbw;
	        }
	        if (adjustedbw < hls.levels[i].bitrate) {
	          return Math.max(0, i - 1);
	        }
	      }
	      return i - 1;
	    },
	    set: function set(nextLevel) {
	      this._nextAutoLevel = nextLevel;
	    }
	  }]);

	  return AbrController;
	}(_eventHandler2.default);

	exports.default = AbrController;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(74);

	var _events2 = _interopRequireDefault(_events);

	var _eventHandler = __webpack_require__(77);

	var _eventHandler2 = _interopRequireDefault(_eventHandler);

	var _logger = __webpack_require__(83);

	var _errors = __webpack_require__(75);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	} /*
	   * Buffer Controller
	  */

	var BufferController = function (_EventHandler) {
	  _inherits(BufferController, _EventHandler);

	  function BufferController(hls) {
	    _classCallCheck(this, BufferController);

	    // Source Buffer listeners

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BufferController).call(this, hls, _events2.default.MEDIA_ATTACHING, _events2.default.MEDIA_DETACHING, _events2.default.BUFFER_RESET, _events2.default.BUFFER_APPENDING, _events2.default.BUFFER_CODECS, _events2.default.BUFFER_EOS, _events2.default.BUFFER_FLUSHING));

	    _this.onsbue = _this.onSBUpdateEnd.bind(_this);
	    _this.onsbe = _this.onSBUpdateError.bind(_this);
	    return _this;
	  }

	  _createClass(BufferController, [{
	    key: 'destroy',
	    value: function destroy() {
	      _eventHandler2.default.prototype.destroy.call(this);
	    }
	  }, {
	    key: 'onMediaAttaching',
	    value: function onMediaAttaching(data) {
	      var media = this.media = data.media;
	      // setup the media source
	      var ms = this.mediaSource = new MediaSource();
	      //Media Source listeners
	      this.onmso = this.onMediaSourceOpen.bind(this);
	      this.onmse = this.onMediaSourceEnded.bind(this);
	      this.onmsc = this.onMediaSourceClose.bind(this);
	      ms.addEventListener('sourceopen', this.onmso);
	      ms.addEventListener('sourceended', this.onmse);
	      ms.addEventListener('sourceclose', this.onmsc);
	      // link video and media Source
	      media.src = URL.createObjectURL(ms);
	    }
	  }, {
	    key: 'onMediaDetaching',
	    value: function onMediaDetaching() {
	      var ms = this.mediaSource;
	      if (ms) {
	        if (ms.readyState === 'open') {
	          try {
	            // endOfStream could trigger exception if any sourcebuffer is in updating state
	            // we don't really care about checking sourcebuffer state here,
	            // as we are anyway detaching the MediaSource
	            // let's just avoid this exception to propagate
	            ms.endOfStream();
	          } catch (err) {
	            _logger.logger.warn('onMediaDetaching:' + err.message + ' while calling endOfStream');
	          }
	        }
	        ms.removeEventListener('sourceopen', this.onmso);
	        ms.removeEventListener('sourceended', this.onmse);
	        ms.removeEventListener('sourceclose', this.onmsc);
	        // unlink MediaSource from video tag
	        this.media.src = '';
	        this.media.removeAttribute('src');
	        this.mediaSource = null;
	        this.media = null;
	        this.pendingTracks = null;
	      }
	      this.onmso = this.onmse = this.onmsc = null;
	      this.hls.trigger(_events2.default.MEDIA_DETACHED);
	    }
	  }, {
	    key: 'onMediaSourceOpen',
	    value: function onMediaSourceOpen() {
	      _logger.logger.log('media source opened');
	      this.hls.trigger(_events2.default.MEDIA_ATTACHED, { media: this.media });
	      // once received, don't listen anymore to sourceopen event
	      this.mediaSource.removeEventListener('sourceopen', this.onmso);
	      // if any buffer codecs pending, treat it here.
	      var pendingTracks = this.pendingTracks;
	      if (pendingTracks) {
	        this.onBufferCodecs(pendingTracks);
	        this.pendingTracks = null;
	        this.doAppending();
	      }
	    }
	  }, {
	    key: 'onMediaSourceClose',
	    value: function onMediaSourceClose() {
	      _logger.logger.log('media source closed');
	    }
	  }, {
	    key: 'onMediaSourceEnded',
	    value: function onMediaSourceEnded() {
	      _logger.logger.log('media source ended');
	    }
	  }, {
	    key: 'onSBUpdateEnd',
	    value: function onSBUpdateEnd() {

	      if (this._needsFlush) {
	        this.doFlush();
	      }

	      if (this._needsEos) {
	        this.onBufferEos();
	      }

	      this.hls.trigger(_events2.default.BUFFER_APPENDED);

	      this.doAppending();
	    }
	  }, {
	    key: 'onSBUpdateError',
	    value: function onSBUpdateError(event) {
	      _logger.logger.error('sourceBuffer error:' + event);
	      // according to http://www.w3.org/TR/media-source/#sourcebuffer-append-error
	      // this error might not always be fatal (it is fatal if decode error is set, in that case
	      // it will be followed by a mediaElement error ...)
	      this.hls.trigger(_events2.default.ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.BUFFER_APPENDING_ERROR, fatal: false });
	      // we don't need to do more than that, as accordin to the spec, updateend will be fired just after
	    }
	  }, {
	    key: 'onBufferReset',
	    value: function onBufferReset() {
	      var sourceBuffer = this.sourceBuffer;
	      if (sourceBuffer) {
	        for (var type in sourceBuffer) {
	          var sb = sourceBuffer[type];
	          try {
	            this.mediaSource.removeSourceBuffer(sb);
	            sb.removeEventListener('updateend', this.onsbue);
	            sb.removeEventListener('error', this.onsbe);
	          } catch (err) {}
	        }
	        this.sourceBuffer = null;
	      }
	      this.flushRange = [];
	      this.appended = 0;
	    }
	  }, {
	    key: 'onBufferCodecs',
	    value: function onBufferCodecs(tracks) {
	      var sb, trackName, track, codec, mimeType;

	      if (!this.media) {
	        this.pendingTracks = tracks;
	        return;
	      }

	      if (!this.sourceBuffer) {
	        var sourceBuffer = {},
	            mediaSource = this.mediaSource;
	        for (trackName in tracks) {
	          track = tracks[trackName];
	          // use levelCodec as first priority
	          codec = track.levelCodec || track.codec;
	          mimeType = track.container + ';codecs=' + codec;
	          _logger.logger.log('creating sourceBuffer with mimeType:' + mimeType);
	          sb = sourceBuffer[trackName] = mediaSource.addSourceBuffer(mimeType);
	          sb.addEventListener('updateend', this.onsbue);
	          sb.addEventListener('error', this.onsbe);
	        }
	        this.sourceBuffer = sourceBuffer;
	      }
	    }
	  }, {
	    key: 'onBufferAppending',
	    value: function onBufferAppending(data) {
	      if (!this.segments) {
	        this.segments = [data];
	      } else {
	        this.segments.push(data);
	      }
	      this.doAppending();
	    }
	  }, {
	    key: 'onBufferAppendFail',
	    value: function onBufferAppendFail(data) {
	      _logger.logger.error('sourceBuffer error:' + data.event);
	      // according to http://www.w3.org/TR/media-source/#sourcebuffer-append-error
	      // this error might not always be fatal (it is fatal if decode error is set, in that case
	      // it will be followed by a mediaElement error ...)
	      this.hls.trigger(_events2.default.ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.BUFFER_APPENDING_ERROR, fatal: false, frag: this.fragCurrent });
	    }
	  }, {
	    key: 'onBufferEos',
	    value: function onBufferEos() {
	      var sb = this.sourceBuffer,
	          mediaSource = this.mediaSource;
	      if (!mediaSource || mediaSource.readyState !== 'open') {
	        return;
	      }
	      if (!(sb.audio && sb.audio.updating || sb.video && sb.video.updating)) {
	        _logger.logger.log('all media data available, signal endOfStream() to MediaSource and stop loading fragment');
	        //Notify the media element that it now has all of the media data
	        mediaSource.endOfStream();
	        this._needsEos = false;
	      } else {
	        this._needsEos = true;
	      }
	    }
	  }, {
	    key: 'onBufferFlushing',
	    value: function onBufferFlushing(data) {
	      this.flushRange.push({ start: data.startOffset, end: data.endOffset });
	      // attempt flush immediatly
	      this.flushBufferCounter = 0;
	      this.doFlush();
	    }
	  }, {
	    key: 'doFlush',
	    value: function doFlush() {
	      // loop through all buffer ranges to flush
	      while (this.flushRange.length) {
	        var range = this.flushRange[0];
	        // flushBuffer will abort any buffer append in progress and flush Audio/Video Buffer
	        if (this.flushBuffer(range.start, range.end)) {
	          // range flushed, remove from flush array
	          this.flushRange.shift();
	          this.flushBufferCounter = 0;
	        } else {
	          this._needsFlush = true;
	          // avoid looping, wait for SB update end to retrigger a flush
	          return;
	        }
	      }
	      if (this.flushRange.length === 0) {
	        // everything flushed
	        this._needsFlush = false;

	        // let's recompute this.appended, which is used to avoid flush looping
	        var appended = 0;
	        var sourceBuffer = this.sourceBuffer;
	        if (sourceBuffer) {
	          for (var type in sourceBuffer) {
	            appended += sourceBuffer[type].buffered.length;
	          }
	        }
	        this.appended = appended;
	        this.hls.trigger(_events2.default.BUFFER_FLUSHED);
	      }
	    }
	  }, {
	    key: 'doAppending',
	    value: function doAppending() {
	      var hls = this.hls,
	          sourceBuffer = this.sourceBuffer,
	          segments = this.segments;
	      if (sourceBuffer) {
	        if (this.media.error) {
	          segments = [];
	          _logger.logger.error('trying to append although a media error occured, flush segment and abort');
	          return;
	        }
	        for (var type in sourceBuffer) {
	          if (sourceBuffer[type].updating) {
	            //logger.log('sb update in progress');
	            return;
	          }
	        }
	        if (segments.length) {
	          var segment = segments.shift();
	          try {
	            //logger.log(`appending ${segment.type} SB, size:${segment.data.length});
	            sourceBuffer[segment.type].appendBuffer(segment.data);
	            this.appendError = 0;
	            this.appended++;
	          } catch (err) {
	            // in case any error occured while appending, put back segment in segments table
	            _logger.logger.error('error while trying to append buffer:' + err.message);
	            segments.unshift(segment);
	            var event = { type: _errors.ErrorTypes.MEDIA_ERROR };
	            if (err.code !== 22) {
	              if (this.appendError) {
	                this.appendError++;
	              } else {
	                this.appendError = 1;
	              }
	              event.details = _errors.ErrorDetails.BUFFER_APPEND_ERROR;
	              event.frag = this.fragCurrent;
	              /* with UHD content, we could get loop of quota exceeded error until
	                browser is able to evict some data from sourcebuffer. retrying help recovering this
	              */
	              if (this.appendError > hls.config.appendErrorMaxRetry) {
	                _logger.logger.log('fail ' + hls.config.appendErrorMaxRetry + ' times to append segment in sourceBuffer');
	                segments = [];
	                event.fatal = true;
	                hls.trigger(_events2.default.ERROR, event);
	                return;
	              } else {
	                event.fatal = false;
	                hls.trigger(_events2.default.ERROR, event);
	              }
	            } else {
	              // QuotaExceededError: http://www.w3.org/TR/html5/infrastructure.html#quotaexceedederror
	              // let's stop appending any segments, and report BUFFER_FULL_ERROR error
	              segments = [];
	              event.details = _errors.ErrorDetails.BUFFER_FULL_ERROR;
	              hls.trigger(_events2.default.ERROR, event);
	            }
	          }
	        }
	      }
	    }

	    /*
	      flush specified buffered range,
	      return true once range has been flushed.
	      as sourceBuffer.remove() is asynchronous, flushBuffer will be retriggered on sourceBuffer update end
	    */

	  }, {
	    key: 'flushBuffer',
	    value: function flushBuffer(startOffset, endOffset) {
	      var sb, i, bufStart, bufEnd, flushStart, flushEnd;
	      //logger.log('flushBuffer,pos/start/end: ' + this.media.currentTime + '/' + startOffset + '/' + endOffset);
	      // safeguard to avoid infinite looping : don't try to flush more than the nb of appended segments
	      if (this.flushBufferCounter < this.appended && this.sourceBuffer) {
	        for (var type in this.sourceBuffer) {
	          sb = this.sourceBuffer[type];
	          if (!sb.updating) {
	            for (i = 0; i < sb.buffered.length; i++) {
	              bufStart = sb.buffered.start(i);
	              bufEnd = sb.buffered.end(i);
	              // workaround firefox not able to properly flush multiple buffered range.
	              if (navigator.userAgent.toLowerCase().indexOf('firefox') !== -1 && endOffset === Number.POSITIVE_INFINITY) {
	                flushStart = startOffset;
	                flushEnd = endOffset;
	              } else {
	                flushStart = Math.max(bufStart, startOffset);
	                flushEnd = Math.min(bufEnd, endOffset);
	              }
	              /* sometimes sourcebuffer.remove() does not flush
	                 the exact expected time range.
	                 to avoid rounding issues/infinite loop,
	                 only flush buffer range of length greater than 500ms.
	              */
	              if (Math.min(flushEnd, bufEnd) - flushStart > 0.5) {
	                this.flushBufferCounter++;
	                _logger.logger.log('flush ' + type + ' [' + flushStart + ',' + flushEnd + '], of [' + bufStart + ',' + bufEnd + '], pos:' + this.media.currentTime);
	                sb.remove(flushStart, flushEnd);
	                return false;
	              }
	            }
	          } else {
	            //logger.log('abort ' + type + ' append in progress');
	            // this will abort any appending in progress
	            //sb.abort();
	            _logger.logger.warn('cannot flush, sb updating in progress');
	            return false;
	          }
	        }
	      } else {
	        _logger.logger.warn('abort flushing too many retries');
	      }
	      _logger.logger.log('buffer flushed');
	      // everything flushed !
	      return true;
	    }
	  }]);

	  return BufferController;
	}(_eventHandler2.default);

	exports.default = BufferController;

/***/ },
/* 83 */
/***/ function(module, exports) {

	'use strict';

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	};

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function noop() {}

	var fakeLogger = {
	  trace: noop,
	  debug: noop,
	  log: noop,
	  warn: noop,
	  info: noop,
	  error: noop
	};

	var exportedLogger = fakeLogger;

	//let lastCallTime;
	// function formatMsgWithTimeInfo(type, msg) {
	//   const now = Date.now();
	//   const diff = lastCallTime ? '+' + (now - lastCallTime) : '0';
	//   lastCallTime = now;
	//   msg = (new Date(now)).toISOString() + ' | [' +  type + '] > ' + msg + ' ( ' + diff + ' ms )';
	//   return msg;
	// }

	function formatMsg(type, msg) {
	  msg = '[' + type + '] > ' + msg;
	  return msg;
	}

	function consolePrintFn(type) {
	  var func = window.console[type];
	  if (func) {
	    return function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      if (args[0]) {
	        args[0] = formatMsg(type, args[0]);
	      }
	      func.apply(window.console, args);
	    };
	  }
	  return noop;
	}

	function exportLoggerFunctions(debugConfig) {
	  for (var _len2 = arguments.length, functions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    functions[_key2 - 1] = arguments[_key2];
	  }

	  functions.forEach(function (type) {
	    exportedLogger[type] = debugConfig[type] ? debugConfig[type].bind(debugConfig) : consolePrintFn(type);
	  });
	}

	var enableLogs = exports.enableLogs = function enableLogs(debugConfig) {
	  if (debugConfig === true || (typeof debugConfig === 'undefined' ? 'undefined' : _typeof(debugConfig)) === 'object') {
	    exportLoggerFunctions(debugConfig,
	    // Remove out from list here to hard-disable a log-level
	    //'trace',
	    'debug', 'log', 'info', 'warn', 'error');
	    // Some browsers don't allow to use bind on console object anyway
	    // fallback to default if needed
	    try {
	      exportedLogger.log();
	    } catch (e) {
	      exportedLogger = fakeLogger;
	    }
	  } else {
	    exportedLogger = fakeLogger;
	  }
	};

	var logger = exports.logger = exportedLogger;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _demuxer = __webpack_require__(85);

	var _demuxer2 = _interopRequireDefault(_demuxer);

	var _events = __webpack_require__(74);

	var _events2 = _interopRequireDefault(_events);

	var _eventHandler = __webpack_require__(77);

	var _eventHandler2 = _interopRequireDefault(_eventHandler);

	var _logger = __webpack_require__(83);

	var _binarySearch = __webpack_require__(101);

	var _binarySearch2 = _interopRequireDefault(_binarySearch);

	var _levelHelper = __webpack_require__(102);

	var _levelHelper2 = _interopRequireDefault(_levelHelper);

	var _errors = __webpack_require__(75);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	} /*
	   * Stream Controller
	  */

	var State = {
	  ERROR: 'ERROR',
	  STARTING: 'STARTING',
	  IDLE: 'IDLE',
	  PAUSED: 'PAUSED',
	  KEY_LOADING: 'KEY_LOADING',
	  FRAG_LOADING: 'FRAG_LOADING',
	  FRAG_LOADING_WAITING_RETRY: 'FRAG_LOADING_WAITING_RETRY',
	  WAITING_LEVEL: 'WAITING_LEVEL',
	  PARSING: 'PARSING',
	  PARSED: 'PARSED',
	  ENDED: 'ENDED'
	};

	var StreamController = function (_EventHandler) {
	  _inherits(StreamController, _EventHandler);

	  function StreamController(hls) {
	    _classCallCheck(this, StreamController);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StreamController).call(this, hls, _events2.default.MEDIA_ATTACHED, _events2.default.MEDIA_DETACHING, _events2.default.MANIFEST_PARSED, _events2.default.LEVEL_LOADED, _events2.default.KEY_LOADED, _events2.default.FRAG_LOADED, _events2.default.FRAG_PARSING_INIT_SEGMENT, _events2.default.FRAG_PARSING_DATA, _events2.default.FRAG_PARSED, _events2.default.ERROR, _events2.default.BUFFER_APPENDED, _events2.default.BUFFER_FLUSHED));

	    _this.config = hls.config;
	    _this.audioCodecSwap = false;
	    _this.ticks = 0;
	    _this.ontick = _this.tick.bind(_this);
	    return _this;
	  }

	  _createClass(StreamController, [{
	    key: 'destroy',
	    value: function destroy() {
	      this.stop();
	      _eventHandler2.default.prototype.destroy.call(this);
	      this.state = State.IDLE;
	    }
	  }, {
	    key: 'startLoad',
	    value: function startLoad() {
	      if (this.levels) {
	        var media = this.media,
	            lastCurrentTime = this.lastCurrentTime;
	        this.stop();
	        this.demuxer = new _demuxer2.default(this.hls);
	        this.timer = setInterval(this.ontick, 100);
	        this.level = -1;
	        this.fragLoadError = 0;
	        if (media && lastCurrentTime) {
	          _logger.logger.log('configure startPosition @' + lastCurrentTime);
	          if (!this.lastPaused) {
	            _logger.logger.log('resuming video');
	            media.play();
	          }
	          this.state = State.IDLE;
	        } else {
	          this.lastCurrentTime = this.startPosition ? this.startPosition : 0;
	          this.state = State.STARTING;
	        }
	        this.nextLoadPosition = this.startPosition = this.lastCurrentTime;
	        this.tick();
	      } else {
	        _logger.logger.warn('cannot start loading as manifest not parsed yet');
	      }
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.bufferRange = [];
	      this.stalled = false;
	      var frag = this.fragCurrent;
	      if (frag) {
	        if (frag.loader) {
	          frag.loader.abort();
	        }
	        this.fragCurrent = null;
	      }
	      this.fragPrevious = null;
	      _logger.logger.log('trigger BUFFER_RESET');
	      this.hls.trigger(_events2.default.BUFFER_RESET);
	      if (this.timer) {
	        clearInterval(this.timer);
	        this.timer = null;
	      }
	      if (this.demuxer) {
	        this.demuxer.destroy();
	        this.demuxer = null;
	      }
	    }
	  }, {
	    key: 'tick',
	    value: function tick() {
	      this.ticks++;
	      if (this.ticks === 1) {
	        this.doTick();
	        if (this.ticks > 1) {
	          setTimeout(this.tick, 1);
	        }
	        this.ticks = 0;
	      }
	    }
	  }, {
	    key: 'doTick',
	    value: function doTick() {
	      var pos,
	          level,
	          levelDetails,
	          hls = this.hls,
	          config = hls.config;
	      //logger.log(this.state);
	      switch (this.state) {
	        case State.ERROR:
	        //don't do anything in error state to avoid breaking further ...
	        case State.PAUSED:
	          //don't do anything in paused state either ...
	          break;
	        case State.STARTING:
	          // determine load level
	          this.startLevel = hls.startLevel;
	          if (this.startLevel === -1) {
	            // -1 : guess start Level by doing a bitrate test by loading first fragment of lowest quality level
	            this.startLevel = 0;
	            this.fragBitrateTest = true;
	          }
	          // set new level to playlist loader : this will trigger start level load
	          this.level = hls.nextLoadLevel = this.startLevel;
	          this.state = State.WAITING_LEVEL;
	          this.loadedmetadata = false;
	          break;
	        case State.IDLE:
	          // if video not attached AND
	          // start fragment already requested OR start frag prefetch disable
	          // exit loop
	          // => if media not attached but start frag prefetch is enabled and start frag not requested yet, we will not exit loop
	          if (!this.media && (this.startFragRequested || !config.startFragPrefetch)) {
	            break;
	          }
	          // determine next candidate fragment to be loaded, based on current position and
	          //  end of buffer position
	          //  ensure 60s of buffer upfront
	          // if we have not yet loaded any fragment, start loading from start position
	          if (this.loadedmetadata) {
	            pos = this.media.currentTime;
	          } else {
	            pos = this.nextLoadPosition;
	          }
	          // determine next load level
	          if (this.startFragRequested === false) {
	            level = this.startLevel;
	          } else {
	            // we are not at playback start, get next load level from level Controller
	            level = hls.nextLoadLevel;
	          }
	          var bufferInfo = this.bufferInfo(pos, config.maxBufferHole),
	              bufferLen = bufferInfo.len,
	              bufferEnd = bufferInfo.end,
	              fragPrevious = this.fragPrevious,
	              maxBufLen;
	          // compute max Buffer Length that we could get from this load level, based on level bitrate. don't buffer more than 60 MB and more than 30s
	          if (this.levels[level].hasOwnProperty('bitrate')) {
	            maxBufLen = Math.max(8 * config.maxBufferSize / this.levels[level].bitrate, config.maxBufferLength);
	            maxBufLen = Math.min(maxBufLen, config.maxMaxBufferLength);
	          } else {
	            maxBufLen = config.maxBufferLength;
	          }
	          // if buffer length is less than maxBufLen try to load a new fragment
	          if (bufferLen < maxBufLen) {
	            // set next load level : this will trigger a playlist load if needed
	            hls.nextLoadLevel = level;
	            this.level = level;
	            levelDetails = this.levels[level].details;
	            // if level info not retrieved yet, switch state and wait for level retrieval
	            // if live playlist, ensure that new playlist has been refreshed to avoid loading/try to load
	            // a useless and outdated fragment (that might even introduce load error if it is already out of the live playlist)
	            if (typeof levelDetails === 'undefined' || levelDetails.live && this.levelLastLoaded !== level) {
	              this.state = State.WAITING_LEVEL;
	              break;
	            }
	            // find fragment index, contiguous with end of buffer position
	            var fragments = levelDetails.fragments,
	                fragLen = fragments.length,
	                start = fragments[0].start,
	                end = fragments[fragLen - 1].start + fragments[fragLen - 1].duration,
	                _frag = undefined;

	            // in case of live playlist we need to ensure that requested position is not located before playlist start
	            if (levelDetails.live) {
	              // check if requested position is within seekable boundaries :
	              //logger.log(`start/pos/bufEnd/seeking:${start.toFixed(3)}/${pos.toFixed(3)}/${bufferEnd.toFixed(3)}/${this.media.seeking}`);
	              var maxLatency = config.liveMaxLatencyDuration !== undefined ? config.liveMaxLatencyDuration : config.liveMaxLatencyDurationCount * levelDetails.targetduration;

	              if (bufferEnd < Math.max(start, end - maxLatency)) {
	                var targetLatency = config.liveSyncDuration !== undefined ? config.liveSyncDuration : config.liveSyncDurationCount * levelDetails.targetduration;
	                this.seekAfterBuffered = start + Math.max(0, levelDetails.totalduration - targetLatency);
	                _logger.logger.log('buffer end: ' + bufferEnd + ' is located too far from the end of live sliding playlist, media position will be reseted to: ' + this.seekAfterBuffered.toFixed(3));
	                bufferEnd = this.seekAfterBuffered;
	              }
	              if (this.startFragRequested && !levelDetails.PTSKnown) {
	                /* we are switching level on live playlist, but we don't have any PTS info for that quality level ...
	                   try to load frag matching with next SN.
	                   even if SN are not synchronized between playlists, loading this frag will help us
	                   compute playlist sliding and find the right one after in case it was not the right consecutive one */
	                if (fragPrevious) {
	                  var targetSN = fragPrevious.sn + 1;
	                  if (targetSN >= levelDetails.startSN && targetSN <= levelDetails.endSN) {
	                    _frag = fragments[targetSN - levelDetails.startSN];
	                    _logger.logger.log('live playlist, switching playlist, load frag with next SN: ' + _frag.sn);
	                  }
	                }
	                if (!_frag) {
	                  /* we have no idea about which fragment should be loaded.
	                     so let's load mid fragment. it will help computing playlist sliding and find the right one
	                  */
	                  _frag = fragments[Math.min(fragLen - 1, Math.round(fragLen / 2))];
	                  _logger.logger.log('live playlist, switching playlist, unknown, load middle frag : ' + _frag.sn);
	                }
	              }
	            } else {
	              // VoD playlist: if bufferEnd before start of playlist, load first fragment
	              if (bufferEnd < start) {
	                _frag = fragments[0];
	              }
	            }
	            if (!_frag) {
	              var foundFrag;
	              if (bufferEnd < end) {
	                foundFrag = _binarySearch2.default.search(fragments, function (candidate) {
	                  //logger.log(`level/sn/start/end/bufEnd:${level}/${candidate.sn}/${candidate.start}/${(candidate.start+candidate.duration)}/${bufferEnd}`);
	                  // offset should be within fragment boundary
	                  if (candidate.start + candidate.duration <= bufferEnd) {
	                    return 1;
	                  } else if (candidate.start > bufferEnd) {
	                    return -1;
	                  }
	                  return 0;
	                });
	              } else {
	                // reach end of playlist
	                foundFrag = fragments[fragLen - 1];
	              }
	              if (foundFrag) {
	                _frag = foundFrag;
	                start = foundFrag.start;
	                //logger.log('find SN matching with pos:' +  bufferEnd + ':' + frag.sn);
	                if (fragPrevious && _frag.level === fragPrevious.level && _frag.sn === fragPrevious.sn) {
	                  if (_frag.sn < levelDetails.endSN) {
	                    _frag = fragments[_frag.sn + 1 - levelDetails.startSN];
	                    _logger.logger.log('SN just loaded, load next one: ' + _frag.sn);
	                  } else {
	                    // have we reached end of VOD playlist ?
	                    if (!levelDetails.live) {
	                      this.hls.trigger(_events2.default.BUFFER_EOS);
	                      this.state = State.ENDED;
	                    }
	                    _frag = null;
	                  }
	                }
	              }
	            }
	            if (_frag) {
	              //logger.log('      loading frag ' + i +',pos/bufEnd:' + pos.toFixed(3) + '/' + bufferEnd.toFixed(3));
	              if (_frag.decryptdata.uri != null && _frag.decryptdata.key == null) {
	                _logger.logger.log('Loading key for ' + _frag.sn + ' of [' + levelDetails.startSN + ' ,' + levelDetails.endSN + '],level ' + level);
	                this.state = State.KEY_LOADING;
	                hls.trigger(_events2.default.KEY_LOADING, { frag: _frag });
	              } else {
	                _logger.logger.log('Loading ' + _frag.sn + ' of [' + levelDetails.startSN + ' ,' + levelDetails.endSN + '],level ' + level + ', currentTime:' + pos + ',bufferEnd:' + bufferEnd.toFixed(3));
	                _frag.autoLevel = hls.autoLevelEnabled;
	                if (this.levels.length > 1) {
	                  _frag.expectedLen = Math.round(_frag.duration * this.levels[level].bitrate / 8);
	                  _frag.trequest = performance.now();
	                }
	                // ensure that we are not reloading the same fragments in loop ...
	                if (this.fragLoadIdx !== undefined) {
	                  this.fragLoadIdx++;
	                } else {
	                  this.fragLoadIdx = 0;
	                }
	                if (_frag.loadCounter) {
	                  _frag.loadCounter++;
	                  var maxThreshold = config.fragLoadingLoopThreshold;
	                  // if this frag has already been loaded 3 times, and if it has been reloaded recently
	                  if (_frag.loadCounter > maxThreshold && Math.abs(this.fragLoadIdx - _frag.loadIdx) < maxThreshold) {
	                    hls.trigger(_events2.default.ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.FRAG_LOOP_LOADING_ERROR, fatal: false, frag: _frag });
	                    return;
	                  }
	                } else {
	                  _frag.loadCounter = 1;
	                }
	                _frag.loadIdx = this.fragLoadIdx;
	                this.fragCurrent = _frag;
	                this.startFragRequested = true;
	                hls.trigger(_events2.default.FRAG_LOADING, { frag: _frag });
	                this.state = State.FRAG_LOADING;
	              }
	            }
	          }
	          break;
	        case State.WAITING_LEVEL:
	          level = this.levels[this.level];
	          // check if playlist is already loaded
	          if (level && level.details) {
	            this.state = State.IDLE;
	          }
	          break;
	        case State.FRAG_LOADING:
	          /*
	            monitor fragment retrieval time...
	            we compute expected time of arrival of the complete fragment.
	            we compare it to expected time of buffer starvation
	          */
	          var v = this.media,
	              frag = this.fragCurrent;
	          /* only monitor frag retrieval time if
	          (video not paused OR first fragment being loaded) AND autoswitching enabled AND not lowest level AND multiple levels */
	          if (v && (!v.paused || this.loadedmetadata === false) && frag.autoLevel && this.level && this.levels.length > 1) {
	            var requestDelay = performance.now() - frag.trequest;
	            // monitor fragment load progress after half of expected fragment duration,to stabilize bitrate
	            if (requestDelay > 500 * frag.duration) {
	              var loadRate = frag.loaded * 1000 / requestDelay; // byte/s
	              if (frag.expectedLen < frag.loaded) {
	                frag.expectedLen = frag.loaded;
	              }
	              pos = v.currentTime;
	              var fragLoadedDelay = (frag.expectedLen - frag.loaded) / loadRate;
	              var bufferStarvationDelay = this.bufferInfo(pos, config.maxBufferHole).end - pos;
	              var fragLevelNextLoadedDelay = frag.duration * this.levels[hls.nextLoadLevel].bitrate / (8 * loadRate); //bps/Bps
	              /* if we have less than 2 frag duration in buffer and if frag loaded delay is greater than buffer starvation delay
	                ... and also bigger than duration needed to load fragment at next level ...*/
	              if (bufferStarvationDelay < 2 * frag.duration && fragLoadedDelay > bufferStarvationDelay && fragLoadedDelay > fragLevelNextLoadedDelay) {
	                // abort fragment loading ...
	                _logger.logger.warn('loading too slow, abort fragment loading');
	                _logger.logger.log('fragLoadedDelay/bufferStarvationDelay/fragLevelNextLoadedDelay :' + fragLoadedDelay.toFixed(1) + '/' + bufferStarvationDelay.toFixed(1) + '/' + fragLevelNextLoadedDelay.toFixed(1));
	                //abort fragment loading
	                frag.loader.abort();
	                hls.trigger(_events2.default.FRAG_LOAD_EMERGENCY_ABORTED, { frag: frag });
	                // switch back to IDLE state to request new fragment at lowest level
	                this.state = State.IDLE;
	              }
	            }
	          }
	          break;
	        case State.FRAG_LOADING_WAITING_RETRY:
	          var now = performance.now();
	          var retryDate = this.retryDate;
	          var media = this.media;
	          var isSeeking = media && media.seeking;
	          // if current time is gt than retryDate, or if media seeking let's switch to IDLE state to retry loading
	          if (!retryDate || now >= retryDate || isSeeking) {
	            _logger.logger.log('mediaController: retryDate reached, switch back to IDLE state');
	            this.state = State.IDLE;
	          }
	          break;
	        case State.PARSING:
	          // nothing to do, wait for fragment being parsed
	          break;
	        case State.PARSED:
	          // nothing to do, wait for all buffers to be appended
	          break;
	        case State.ENDED:
	          break;
	        default:
	          break;
	      }
	      // check buffer
	      this._checkBuffer();
	      // check/update current fragment
	      this._checkFragmentChanged();
	    }
	  }, {
	    key: 'bufferInfo',
	    value: function bufferInfo(pos, maxHoleDuration) {
	      var media = this.media;
	      if (media) {
	        var vbuffered = media.buffered,
	            buffered = [],
	            i;
	        for (i = 0; i < vbuffered.length; i++) {
	          buffered.push({ start: vbuffered.start(i), end: vbuffered.end(i) });
	        }
	        return this.bufferedInfo(buffered, pos, maxHoleDuration);
	      } else {
	        return { len: 0, start: 0, end: 0, nextStart: undefined };
	      }
	    }
	  }, {
	    key: 'bufferedInfo',
	    value: function bufferedInfo(buffered, pos, maxHoleDuration) {
	      var buffered2 = [],


	      // bufferStart and bufferEnd are buffer boundaries around current video position
	      bufferLen,
	          bufferStart,
	          bufferEnd,
	          bufferStartNext,
	          i;
	      // sort on buffer.start/smaller end (IE does not always return sorted buffered range)
	      buffered.sort(function (a, b) {
	        var diff = a.start - b.start;
	        if (diff) {
	          return diff;
	        } else {
	          return b.end - a.end;
	        }
	      });
	      // there might be some small holes between buffer time range
	      // consider that holes smaller than maxHoleDuration are irrelevant and build another
	      // buffer time range representations that discards those holes
	      for (i = 0; i < buffered.length; i++) {
	        var buf2len = buffered2.length;
	        if (buf2len) {
	          var buf2end = buffered2[buf2len - 1].end;
	          // if small hole (value between 0 or maxHoleDuration ) or overlapping (negative)
	          if (buffered[i].start - buf2end < maxHoleDuration) {
	            // merge overlapping time ranges
	            // update lastRange.end only if smaller than item.end
	            // e.g.  [ 1, 15] with  [ 2,8] => [ 1,15] (no need to modify lastRange.end)
	            // whereas [ 1, 8] with  [ 2,15] => [ 1,15] ( lastRange should switch from [1,8] to [1,15])
	            if (buffered[i].end > buf2end) {
	              buffered2[buf2len - 1].end = buffered[i].end;
	            }
	          } else {
	            // big hole
	            buffered2.push(buffered[i]);
	          }
	        } else {
	          // first value
	          buffered2.push(buffered[i]);
	        }
	      }
	      for (i = 0, bufferLen = 0, bufferStart = bufferEnd = pos; i < buffered2.length; i++) {
	        var start = buffered2[i].start,
	            end = buffered2[i].end;
	        //logger.log('buf start/end:' + buffered.start(i) + '/' + buffered.end(i));
	        if (pos + maxHoleDuration >= start && pos < end) {
	          // play position is inside this buffer TimeRange, retrieve end of buffer position and buffer length
	          bufferStart = start;
	          bufferEnd = end;
	          bufferLen = bufferEnd - pos;
	        } else if (pos + maxHoleDuration < start) {
	          bufferStartNext = start;
	          break;
	        }
	      }
	      return { len: bufferLen, start: bufferStart, end: bufferEnd, nextStart: bufferStartNext };
	    }
	  }, {
	    key: 'getBufferRange',
	    value: function getBufferRange(position) {
	      var i,
	          range,
	          bufferRange = this.bufferRange;
	      if (bufferRange) {
	        for (i = bufferRange.length - 1; i >= 0; i--) {
	          range = bufferRange[i];
	          if (position >= range.start && position <= range.end) {
	            return range;
	          }
	        }
	      }
	      return null;
	    }
	  }, {
	    key: 'followingBufferRange',
	    value: function followingBufferRange(range) {
	      if (range) {
	        // try to get range of next fragment (500ms after this range)
	        return this.getBufferRange(range.end + 0.5);
	      }
	      return null;
	    }
	  }, {
	    key: 'isBuffered',
	    value: function isBuffered(position) {
	      var v = this.media,
	          buffered = v.buffered;
	      for (var i = 0; i < buffered.length; i++) {
	        if (position >= buffered.start(i) && position <= buffered.end(i)) {
	          return true;
	        }
	      }
	      return false;
	    }
	  }, {
	    key: '_checkFragmentChanged',
	    value: function _checkFragmentChanged() {
	      var rangeCurrent,
	          currentTime,
	          video = this.media;
	      if (video && video.seeking === false) {
	        currentTime = video.currentTime;
	        /* if video element is in seeked state, currentTime can only increase.
	          (assuming that playback rate is positive ...)
	          As sometimes currentTime jumps back to zero after a
	          media decode error, check this, to avoid seeking back to
	          wrong position after a media decode error
	        */
	        if (currentTime > video.playbackRate * this.lastCurrentTime) {
	          this.lastCurrentTime = currentTime;
	        }
	        if (this.isBuffered(currentTime)) {
	          rangeCurrent = this.getBufferRange(currentTime);
	        } else if (this.isBuffered(currentTime + 0.1)) {
	          /* ensure that FRAG_CHANGED event is triggered at startup,
	            when first video frame is displayed and playback is paused.
	            add a tolerance of 100ms, in case current position is not buffered,
	            check if current pos+100ms is buffered and use that buffer range
	            for FRAG_CHANGED event reporting */
	          rangeCurrent = this.getBufferRange(currentTime + 0.1);
	        }
	        if (rangeCurrent) {
	          var fragPlaying = rangeCurrent.frag;
	          if (fragPlaying !== this.fragPlaying) {
	            this.fragPlaying = fragPlaying;
	            this.hls.trigger(_events2.default.FRAG_CHANGED, { frag: fragPlaying });
	          }
	        }
	      }
	    }

	    /*
	      on immediate level switch :
	       - pause playback if playing
	       - cancel any pending load request
	       - and trigger a buffer flush
	    */

	  }, {
	    key: 'immediateLevelSwitch',
	    value: function immediateLevelSwitch() {
	      _logger.logger.log('immediateLevelSwitch');
	      if (!this.immediateSwitch) {
	        this.immediateSwitch = true;
	        this.previouslyPaused = this.media.paused;
	        this.media.pause();
	      }
	      var fragCurrent = this.fragCurrent;
	      if (fragCurrent && fragCurrent.loader) {
	        fragCurrent.loader.abort();
	      }
	      this.fragCurrent = null;
	      // flush everything
	      this.hls.trigger(_events2.default.BUFFER_FLUSHING, { startOffset: 0, endOffset: Number.POSITIVE_INFINITY });
	      this.state = State.PAUSED;
	      // increase fragment load Index to avoid frag loop loading error after buffer flush
	      this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold;
	      // speed up switching, trigger timer function
	      this.tick();
	    }

	    /*
	       on immediate level switch end, after new fragment has been buffered :
	        - nudge video decoder by slightly adjusting video currentTime
	        - resume the playback if needed
	    */

	  }, {
	    key: 'immediateLevelSwitchEnd',
	    value: function immediateLevelSwitchEnd() {
	      this.immediateSwitch = false;
	      this.media.currentTime -= 0.0001;
	      if (!this.previouslyPaused) {
	        this.media.play();
	      }
	    }
	  }, {
	    key: 'nextLevelSwitch',
	    value: function nextLevelSwitch() {
	      /* try to switch ASAP without breaking video playback :
	         in order to ensure smooth but quick level switching,
	        we need to find the next flushable buffer range
	        we should take into account new segment fetch time
	      */
	      var fetchdelay, currentRange, nextRange;
	      currentRange = this.getBufferRange(this.media.currentTime);
	      if (currentRange && currentRange.start > 1) {
	        // flush buffer preceding current fragment (flush until current fragment start offset)
	        // minus 1s to avoid video freezing, that could happen if we flush keyframe of current video ...
	        this.hls.trigger(_events2.default.BUFFER_FLUSHING, { startOffset: 0, endOffset: currentRange.start - 1 });
	        this.state = State.PAUSED;
	      }
	      if (!this.media.paused) {
	        // add a safety delay of 1s
	        var nextLevelId = this.hls.nextLoadLevel,
	            nextLevel = this.levels[nextLevelId],
	            fragLastKbps = this.fragLastKbps;
	        if (fragLastKbps && this.fragCurrent) {
	          fetchdelay = this.fragCurrent.duration * nextLevel.bitrate / (1000 * fragLastKbps) + 1;
	        } else {
	          fetchdelay = 0;
	        }
	      } else {
	        fetchdelay = 0;
	      }
	      //logger.log('fetchdelay:'+fetchdelay);
	      // find buffer range that will be reached once new fragment will be fetched
	      nextRange = this.getBufferRange(this.media.currentTime + fetchdelay);
	      if (nextRange) {
	        // we can flush buffer range following this one without stalling playback
	        nextRange = this.followingBufferRange(nextRange);
	        if (nextRange) {
	          // flush position is the start position of this new buffer
	          this.hls.trigger(_events2.default.BUFFER_FLUSHING, { startOffset: nextRange.start, endOffset: Number.POSITIVE_INFINITY });
	          this.state = State.PAUSED;
	          // if we are here, we can also cancel any loading/demuxing in progress, as they are useless
	          var fragCurrent = this.fragCurrent;
	          if (fragCurrent && fragCurrent.loader) {
	            fragCurrent.loader.abort();
	          }
	          this.fragCurrent = null;
	          // increase fragment load Index to avoid frag loop loading error after buffer flush
	          this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold;
	        }
	      }
	    }
	  }, {
	    key: 'onMediaAttached',
	    value: function onMediaAttached(data) {
	      var media = this.media = data.media;
	      this.onvseeking = this.onMediaSeeking.bind(this);
	      this.onvseeked = this.onMediaSeeked.bind(this);
	      this.onvended = this.onMediaEnded.bind(this);
	      media.addEventListener('seeking', this.onvseeking);
	      media.addEventListener('seeked', this.onvseeked);
	      media.addEventListener('ended', this.onvended);
	      if (this.levels && this.config.autoStartLoad) {
	        this.startLoad();
	      }
	    }
	  }, {
	    key: 'onMediaDetaching',
	    value: function onMediaDetaching() {
	      var media = this.media;
	      if (media && media.ended) {
	        _logger.logger.log('MSE detaching and video ended, reset startPosition');
	        this.startPosition = this.lastCurrentTime = 0;
	      }

	      // reset fragment loading counter on MSE detaching to avoid reporting FRAG_LOOP_LOADING_ERROR after error recovery
	      var levels = this.levels;
	      if (levels) {
	        // reset fragment load counter
	        levels.forEach(function (level) {
	          if (level.details) {
	            level.details.fragments.forEach(function (fragment) {
	              fragment.loadCounter = undefined;
	            });
	          }
	        });
	      }
	      // remove video listeners
	      if (media) {
	        media.removeEventListener('seeking', this.onvseeking);
	        media.removeEventListener('seeked', this.onvseeked);
	        media.removeEventListener('ended', this.onvended);
	        this.onvseeking = this.onvseeked = this.onvended = null;
	      }
	      this.media = null;
	      this.loadedmetadata = false;
	      this.stop();
	    }
	  }, {
	    key: 'onMediaSeeking',
	    value: function onMediaSeeking() {
	      if (this.state === State.FRAG_LOADING) {
	        // check if currently loaded fragment is inside buffer.
	        //if outside, cancel fragment loading, otherwise do nothing
	        if (this.bufferInfo(this.media.currentTime, this.config.maxBufferHole).len === 0) {
	          _logger.logger.log('seeking outside of buffer while fragment load in progress, cancel fragment load');
	          var fragCurrent = this.fragCurrent;
	          if (fragCurrent) {
	            if (fragCurrent.loader) {
	              fragCurrent.loader.abort();
	            }
	            this.fragCurrent = null;
	          }
	          this.fragPrevious = null;
	          // switch to IDLE state to load new fragment
	          this.state = State.IDLE;
	        }
	      } else if (this.state === State.ENDED) {
	        // switch to IDLE state to check for potential new fragment
	        this.state = State.IDLE;
	      }
	      if (this.media) {
	        this.lastCurrentTime = this.media.currentTime;
	      }
	      // avoid reporting fragment loop loading error in case user is seeking several times on same position
	      if (this.fragLoadIdx !== undefined) {
	        this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold;
	      }
	      // tick to speed up processing
	      this.tick();
	    }
	  }, {
	    key: 'onMediaSeeked',
	    value: function onMediaSeeked() {
	      // tick to speed up FRAGMENT_PLAYING triggering
	      this.tick();
	    }
	  }, {
	    key: 'onMediaEnded',
	    value: function onMediaEnded() {
	      _logger.logger.log('media ended');
	      // reset startPosition and lastCurrentTime to restart playback @ stream beginning
	      this.startPosition = this.lastCurrentTime = 0;
	    }
	  }, {
	    key: 'onManifestParsed',
	    value: function onManifestParsed(data) {
	      var aac = false,
	          heaac = false,
	          codec;
	      data.levels.forEach(function (level) {
	        // detect if we have different kind of audio codecs used amongst playlists
	        codec = level.audioCodec;
	        if (codec) {
	          if (codec.indexOf('mp4a.40.2') !== -1) {
	            aac = true;
	          }
	          if (codec.indexOf('mp4a.40.5') !== -1) {
	            heaac = true;
	          }
	        }
	      });
	      this.audioCodecSwitch = aac && heaac;
	      if (this.audioCodecSwitch) {
	        _logger.logger.log('both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC');
	      }
	      this.levels = data.levels;
	      this.startLevelLoaded = false;
	      this.startFragRequested = false;
	      if (this.config.autoStartLoad) {
	        this.startLoad();
	      }
	    }
	  }, {
	    key: 'onLevelLoaded',
	    value: function onLevelLoaded(data) {
	      var newDetails = data.details,
	          newLevelId = data.level,
	          curLevel = this.levels[newLevelId],
	          duration = newDetails.totalduration,
	          sliding = 0;

	      _logger.logger.log('level ' + newLevelId + ' loaded [' + newDetails.startSN + ',' + newDetails.endSN + '],duration:' + duration);
	      this.levelLastLoaded = newLevelId;

	      if (newDetails.live) {
	        var curDetails = curLevel.details;
	        if (curDetails) {
	          // we already have details for that level, merge them
	          _levelHelper2.default.mergeDetails(curDetails, newDetails);
	          sliding = newDetails.fragments[0].start;
	          if (newDetails.PTSKnown) {
	            _logger.logger.log('live playlist sliding:' + sliding.toFixed(3));
	          } else {
	            _logger.logger.log('live playlist - outdated PTS, unknown sliding');
	          }
	        } else {
	          newDetails.PTSKnown = false;
	          _logger.logger.log('live playlist - first load, unknown sliding');
	        }
	      } else {
	        newDetails.PTSKnown = false;
	      }
	      // override level info
	      curLevel.details = newDetails;
	      this.hls.trigger(_events2.default.LEVEL_UPDATED, { details: newDetails, level: newLevelId });

	      // compute start position
	      if (this.startFragRequested === false) {
	        // if live playlist, set start position to be fragment N-this.config.liveSyncDurationCount (usually 3)
	        if (newDetails.live) {
	          var targetLatency = this.config.liveSyncDuration !== undefined ? this.config.liveSyncDuration : this.config.liveSyncDurationCount * newDetails.targetduration;
	          this.startPosition = Math.max(0, sliding + duration - targetLatency);
	        }
	        this.nextLoadPosition = this.startPosition;
	      }
	      // only switch batck to IDLE state if we were waiting for level to start downloading a new fragment
	      if (this.state === State.WAITING_LEVEL) {
	        this.state = State.IDLE;
	      }
	      //trigger handler right now
	      this.tick();
	    }
	  }, {
	    key: 'onKeyLoaded',
	    value: function onKeyLoaded() {
	      if (this.state === State.KEY_LOADING) {
	        this.state = State.IDLE;
	        this.tick();
	      }
	    }
	  }, {
	    key: 'onFragLoaded',
	    value: function onFragLoaded(data) {
	      var fragCurrent = this.fragCurrent;
	      if (this.state === State.FRAG_LOADING && fragCurrent && data.frag.level === fragCurrent.level && data.frag.sn === fragCurrent.sn) {
	        if (this.fragBitrateTest === true) {
	          // switch back to IDLE state ... we just loaded a fragment to determine adequate start bitrate and initialize autoswitch algo
	          this.state = State.IDLE;
	          this.fragBitrateTest = false;
	          data.stats.tparsed = data.stats.tbuffered = performance.now();
	          this.hls.trigger(_events2.default.FRAG_BUFFERED, { stats: data.stats, frag: fragCurrent });
	        } else {
	          this.state = State.PARSING;
	          // transmux the MPEG-TS data to ISO-BMFF segments
	          this.stats = data.stats;
	          var currentLevel = this.levels[this.level],
	              details = currentLevel.details,
	              duration = details.totalduration,
	              start = fragCurrent.start,
	              level = fragCurrent.level,
	              sn = fragCurrent.sn,
	              audioCodec = currentLevel.audioCodec || this.config.defaultAudioCodec;
	          if (this.audioCodecSwap) {
	            _logger.logger.log('swapping playlist audio codec');
	            if (audioCodec === undefined) {
	              audioCodec = this.lastAudioCodec;
	            }
	            if (audioCodec) {
	              if (audioCodec.indexOf('mp4a.40.5') !== -1) {
	                audioCodec = 'mp4a.40.2';
	              } else {
	                audioCodec = 'mp4a.40.5';
	              }
	            }
	          }
	          this.pendingAppending = 0;
	          _logger.logger.log('Demuxing ' + sn + ' of [' + details.startSN + ' ,' + details.endSN + '],level ' + level);
	          this.demuxer.push(data.payload, audioCodec, currentLevel.videoCodec, start, fragCurrent.cc, level, sn, duration, fragCurrent.decryptdata);
	        }
	      }
	      this.fragLoadError = 0;
	    }
	  }, {
	    key: 'onFragParsingInitSegment',
	    value: function onFragParsingInitSegment(data) {
	      if (this.state === State.PARSING) {
	        var tracks = data.tracks,
	            trackName,
	            track;

	        // include levelCodec in audio and video tracks
	        track = tracks.audio;
	        if (track) {
	          var audioCodec = this.levels[this.level].audioCodec,
	              ua = navigator.userAgent.toLowerCase();
	          if (audioCodec && this.audioCodecSwap) {
	            _logger.logger.log('swapping playlist audio codec');
	            if (audioCodec.indexOf('mp4a.40.5') !== -1) {
	              audioCodec = 'mp4a.40.2';
	            } else {
	              audioCodec = 'mp4a.40.5';
	            }
	          }
	          // in case AAC and HE-AAC audio codecs are signalled in manifest
	          // force HE-AAC , as it seems that most browsers prefers that way,
	          // except for mono streams OR on FF
	          // these conditions might need to be reviewed ...
	          if (this.audioCodecSwitch) {
	            // don't force HE-AAC if mono stream
	            if (track.metadata.channelCount !== 1 &&
	            // don't force HE-AAC if firefox
	            ua.indexOf('firefox') === -1) {
	              audioCodec = 'mp4a.40.5';
	            }
	          }
	          // HE-AAC is broken on Android, always signal audio codec as AAC even if variant manifest states otherwise
	          if (ua.indexOf('android') !== -1) {
	            audioCodec = 'mp4a.40.2';
	            _logger.logger.log('Android: force audio codec to' + audioCodec);
	          }
	          track.levelCodec = audioCodec;
	        }
	        track = tracks.video;
	        if (track) {
	          track.levelCodec = this.levels[this.level].videoCodec;
	        }

	        // if remuxer specify that a unique track needs to generated,
	        // let's merge all tracks together
	        if (data.unique) {
	          var mergedTrack = {
	            codec: '',
	            levelCodec: ''
	          };
	          for (trackName in data.tracks) {
	            track = tracks[trackName];
	            mergedTrack.container = track.container;
	            if (mergedTrack.codec) {
	              mergedTrack.codec += ',';
	              mergedTrack.levelCodec += ',';
	            }
	            if (track.codec) {
	              mergedTrack.codec += track.codec;
	            }
	            if (track.levelCodec) {
	              mergedTrack.levelCodec += track.levelCodec;
	            }
	          }
	          tracks = { audiovideo: mergedTrack };
	        }
	        this.hls.trigger(_events2.default.BUFFER_CODECS, tracks);
	        // loop through tracks that are going to be provided to bufferController
	        for (trackName in tracks) {
	          track = tracks[trackName];
	          _logger.logger.log('track:' + trackName + ',container:' + track.container + ',codecs[level/parsed]=[' + track.levelCodec + '/' + track.codec + ']');
	          var initSegment = track.initSegment;
	          if (initSegment) {
	            this.pendingAppending++;
	            this.hls.trigger(_events2.default.BUFFER_APPENDING, { type: trackName, data: initSegment });
	          }
	        }
	        //trigger handler right now
	        this.tick();
	      }
	    }
	  }, {
	    key: 'onFragParsingData',
	    value: function onFragParsingData(data) {
	      var _this2 = this;

	      if (this.state === State.PARSING) {
	        this.tparse2 = Date.now();
	        var level = this.levels[this.level],
	            frag = this.fragCurrent;

	        _logger.logger.log('parsed ' + data.type + ',PTS:[' + data.startPTS.toFixed(3) + ',' + data.endPTS.toFixed(3) + '],DTS:[' + data.startDTS.toFixed(3) + '/' + data.endDTS.toFixed(3) + '],nb:' + data.nb);

	        var drift = _levelHelper2.default.updateFragPTS(level.details, frag.sn, data.startPTS, data.endPTS),
	            hls = this.hls;
	        hls.trigger(_events2.default.LEVEL_PTS_UPDATED, { details: level.details, level: this.level, drift: drift });

	        [data.data1, data.data2].forEach(function (buffer) {
	          if (buffer) {
	            _this2.pendingAppending++;
	            hls.trigger(_events2.default.BUFFER_APPENDING, { type: data.type, data: buffer });
	          }
	        });

	        this.nextLoadPosition = data.endPTS;
	        this.bufferRange.push({ type: data.type, start: data.startPTS, end: data.endPTS, frag: frag });

	        //trigger handler right now
	        this.tick();
	      } else {
	        _logger.logger.warn('not in PARSING state but ' + this.state + ', ignoring FRAG_PARSING_DATA event');
	      }
	    }
	  }, {
	    key: 'onFragParsed',
	    value: function onFragParsed() {
	      if (this.state === State.PARSING) {
	        this.stats.tparsed = performance.now();
	        this.state = State.PARSED;
	        this._checkAppendedParsed();
	      }
	    }
	  }, {
	    key: 'onBufferAppended',
	    value: function onBufferAppended() {
	      switch (this.state) {
	        case State.PARSING:
	        case State.PARSED:
	          this.pendingAppending--;
	          this._checkAppendedParsed();
	          break;
	        default:
	          break;
	      }
	    }
	  }, {
	    key: '_checkAppendedParsed',
	    value: function _checkAppendedParsed() {
	      //trigger handler right now
	      if (this.state === State.PARSED && this.pendingAppending === 0) {
	        var frag = this.fragCurrent,
	            stats = this.stats;
	        if (frag) {
	          this.fragPrevious = frag;
	          stats.tbuffered = performance.now();
	          this.fragLastKbps = Math.round(8 * stats.length / (stats.tbuffered - stats.tfirst));
	          this.hls.trigger(_events2.default.FRAG_BUFFERED, { stats: stats, frag: frag });
	          _logger.logger.log('media buffered : ' + this.timeRangesToString(this.media.buffered));
	          this.state = State.IDLE;
	        }
	        this.tick();
	      }
	    }
	  }, {
	    key: 'onError',
	    value: function onError(data) {
	      switch (data.details) {
	        case _errors.ErrorDetails.FRAG_LOAD_ERROR:
	        case _errors.ErrorDetails.FRAG_LOAD_TIMEOUT:
	          if (!data.fatal) {
	            var loadError = this.fragLoadError;
	            if (loadError) {
	              loadError++;
	            } else {
	              loadError = 1;
	            }
	            if (loadError <= this.config.fragLoadingMaxRetry) {
	              this.fragLoadError = loadError;
	              // reset load counter to avoid frag loop loading error
	              data.frag.loadCounter = 0;
	              // exponential backoff capped to 64s
	              var delay = Math.min(Math.pow(2, loadError - 1) * this.config.fragLoadingRetryDelay, 64000);
	              _logger.logger.warn('mediaController: frag loading failed, retry in ' + delay + ' ms');
	              this.retryDate = performance.now() + delay;
	              // retry loading state
	              this.state = State.FRAG_LOADING_WAITING_RETRY;
	            } else {
	              _logger.logger.error('mediaController: ' + data.details + ' reaches max retry, redispatch as fatal ...');
	              // redispatch same error but with fatal set to true
	              data.fatal = true;
	              this.hls.trigger(_events2.default.ERROR, data);
	              this.state = State.ERROR;
	            }
	          }
	          break;
	        case _errors.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
	        case _errors.ErrorDetails.LEVEL_LOAD_ERROR:
	        case _errors.ErrorDetails.LEVEL_LOAD_TIMEOUT:
	        case _errors.ErrorDetails.KEY_LOAD_ERROR:
	        case _errors.ErrorDetails.KEY_LOAD_TIMEOUT:
	          // if fatal error, stop processing, otherwise move to IDLE to retry loading
	          _logger.logger.warn('mediaController: ' + data.details + ' while loading frag,switch to ' + (data.fatal ? 'ERROR' : 'IDLE') + ' state ...');
	          this.state = data.fatal ? State.ERROR : State.IDLE;
	          break;
	        case _errors.ErrorDetails.BUFFER_FULL_ERROR:
	          // trigger a smooth level switch to empty buffers
	          // also reduce max buffer length as it might be too high. we do this to avoid loop flushing ...
	          this.config.maxMaxBufferLength /= 2;
	          _logger.logger.warn('reduce max buffer length to ' + this.config.maxMaxBufferLength + 's and trigger a nextLevelSwitch to flush old buffer and fix QuotaExceededError');
	          this.nextLevelSwitch();
	          break;
	        default:
	          break;
	      }
	    }
	  }, {
	    key: '_checkBuffer',
	    value: function _checkBuffer() {
	      var media = this.media;
	      if (media) {
	        // compare readyState
	        var readyState = media.readyState;
	        // if ready state different from HAVE_NOTHING (numeric value 0), we are allowed to seek
	        if (readyState) {
	          var targetSeekPosition, currentTime;
	          // if seek after buffered defined, let's seek if within acceptable range
	          var seekAfterBuffered = this.seekAfterBuffered;
	          if (seekAfterBuffered) {
	            if (media.duration >= seekAfterBuffered) {
	              targetSeekPosition = seekAfterBuffered;
	              this.seekAfterBuffered = undefined;
	            }
	          } else {
	            currentTime = media.currentTime;
	            var loadedmetadata = this.loadedmetadata;

	            // adjust currentTime to start position on loaded metadata
	            if (!loadedmetadata && media.buffered.length) {
	              this.loadedmetadata = true;
	              // only adjust currentTime if not equal to 0
	              if (!currentTime && currentTime !== this.startPosition) {
	                targetSeekPosition = this.startPosition;
	              }
	            }
	          }
	          if (targetSeekPosition) {
	            currentTime = targetSeekPosition;
	            _logger.logger.log('target seek position:' + targetSeekPosition);
	          }
	          var bufferInfo = this.bufferInfo(currentTime, 0),
	              expectedPlaying = !(media.paused || media.ended || media.seeking || readyState < 2),
	              jumpThreshold = 0.4,

	          // tolerance needed as some browsers stalls playback before reaching buffered range end
	          playheadMoving = currentTime > media.playbackRate * this.lastCurrentTime;

	          if (this.stalled && playheadMoving) {
	            this.stalled = false;
	          }
	          // check buffer upfront
	          // if less than 200ms is buffered, and media is expected to play but playhead is not moving,
	          // and we have a new buffer range available upfront, let's seek to that one
	          if (bufferInfo.len <= jumpThreshold) {
	            if (playheadMoving || !expectedPlaying) {
	              // playhead moving or media not playing
	              jumpThreshold = 0;
	            } else {
	              // playhead not moving AND media expected to play
	              _logger.logger.log('playback seems stuck @' + currentTime);
	              if (!this.stalled) {
	                this.hls.trigger(_events2.default.ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.BUFFER_STALLED_ERROR, fatal: false });
	                this.stalled = true;
	              }
	            }
	            // if we are below threshold, try to jump if next buffer range is close
	            if (bufferInfo.len <= jumpThreshold) {
	              // no buffer available @ currentTime, check if next buffer is close (within a config.maxSeekHole second range)
	              var nextBufferStart = bufferInfo.nextStart,
	                  delta = nextBufferStart - currentTime;
	              if (nextBufferStart && delta < this.config.maxSeekHole && delta > 0 && !media.seeking) {
	                // next buffer is close ! adjust currentTime to nextBufferStart
	                // this will ensure effective video decoding
	                _logger.logger.log('adjust currentTime from ' + media.currentTime + ' to next buffered @ ' + nextBufferStart);
	                media.currentTime = nextBufferStart;
	                this.hls.trigger(_events2.default.ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.BUFFER_SEEK_OVER_HOLE, fatal: false });
	              }
	            }
	          } else {
	            if (targetSeekPosition && media.currentTime !== targetSeekPosition) {
	              _logger.logger.log('adjust currentTime from ' + media.currentTime + ' to ' + targetSeekPosition);
	              media.currentTime = targetSeekPosition;
	            }
	          }
	        }
	      }
	    }
	  }, {
	    key: 'onBufferFlushed',
	    value: function onBufferFlushed() {
	      /* after successful buffer flushing, rebuild buffer Range array
	        loop through existing buffer range and check if
	        corresponding range is still buffered. only push to new array already buffered range
	      */
	      var newRange = [],
	          range,
	          i;
	      for (i = 0; i < this.bufferRange.length; i++) {
	        range = this.bufferRange[i];
	        if (this.isBuffered((range.start + range.end) / 2)) {
	          newRange.push(range);
	        }
	      }
	      this.bufferRange = newRange;

	      // handle end of immediate switching if needed
	      if (this.immediateSwitch) {
	        this.immediateLevelSwitchEnd();
	      }
	      // move to IDLE once flush complete. this should trigger new fragment loading
	      this.state = State.IDLE;
	      // reset reference to frag
	      this.fragPrevious = null;
	    }
	  }, {
	    key: 'swapAudioCodec',
	    value: function swapAudioCodec() {
	      this.audioCodecSwap = !this.audioCodecSwap;
	    }
	  }, {
	    key: 'timeRangesToString',
	    value: function timeRangesToString(r) {
	      var log = '',
	          len = r.length;
	      for (var i = 0; i < len; i++) {
	        log += '[' + r.start(i) + ',' + r.end(i) + ']';
	      }
	      return log;
	    }
	  }, {
	    key: 'currentLevel',
	    get: function get() {
	      if (this.media) {
	        var range = this.getBufferRange(this.media.currentTime);
	        if (range) {
	          return range.frag.level;
	        }
	      }
	      return -1;
	    }
	  }, {
	    key: 'nextBufferRange',
	    get: function get() {
	      if (this.media) {
	        // first get end range of current fragment
	        return this.followingBufferRange(this.getBufferRange(this.media.currentTime));
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: 'nextLevel',
	    get: function get() {
	      var range = this.nextBufferRange;
	      if (range) {
	        return range.frag.level;
	      } else {
	        return -1;
	      }
	    }
	  }]);

	  return StreamController;
	}(_eventHandler2.default);

	exports.default = StreamController;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(74);

	var _events2 = _interopRequireDefault(_events);

	var _demuxerInline = __webpack_require__(86);

	var _demuxerInline2 = _interopRequireDefault(_demuxerInline);

	var _demuxerWorker = __webpack_require__(95);

	var _demuxerWorker2 = _interopRequireDefault(_demuxerWorker);

	var _logger = __webpack_require__(83);

	var _decrypter = __webpack_require__(97);

	var _decrypter2 = _interopRequireDefault(_decrypter);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var Demuxer = function () {
	  function Demuxer(hls) {
	    _classCallCheck(this, Demuxer);

	    this.hls = hls;
	    var typeSupported = {
	      mp4: MediaSource.isTypeSupported('video/mp4'),
	      mp2t: hls.config.enableMP2TPassThrough && MediaSource.isTypeSupported('video/mp2t')
	    };
	    if (hls.config.enableWorker && typeof Worker !== 'undefined') {
	      _logger.logger.log('demuxing in webworker');
	      try {
	        var work = __webpack_require__(100);
	        this.w = work(_demuxerWorker2.default);
	        this.onwmsg = this.onWorkerMessage.bind(this);
	        this.w.addEventListener('message', this.onwmsg);
	        this.w.postMessage({ cmd: 'init', typeSupported: typeSupported });
	      } catch (err) {
	        _logger.logger.error('error while initializing DemuxerWorker, fallback on DemuxerInline');
	        this.demuxer = new _demuxerInline2.default(hls, typeSupported);
	      }
	    } else {
	      this.demuxer = new _demuxerInline2.default(hls, typeSupported);
	    }
	    this.demuxInitialized = true;
	  }

	  _createClass(Demuxer, [{
	    key: 'destroy',
	    value: function destroy() {
	      if (this.w) {
	        this.w.removeEventListener('message', this.onwmsg);
	        this.w.terminate();
	        this.w = null;
	      } else {
	        this.demuxer.destroy();
	        this.demuxer = null;
	      }
	      if (this.decrypter) {
	        this.decrypter.destroy();
	        this.decrypter = null;
	      }
	    }
	  }, {
	    key: 'pushDecrypted',
	    value: function pushDecrypted(data, audioCodec, videoCodec, timeOffset, cc, level, sn, duration) {
	      if (this.w) {
	        // post fragment payload as transferable objects (no copy)
	        this.w.postMessage({ cmd: 'demux', data: data, audioCodec: audioCodec, videoCodec: videoCodec, timeOffset: timeOffset, cc: cc, level: level, sn: sn, duration: duration }, [data]);
	      } else {
	        this.demuxer.push(new Uint8Array(data), audioCodec, videoCodec, timeOffset, cc, level, sn, duration);
	      }
	    }
	  }, {
	    key: 'push',
	    value: function push(data, audioCodec, videoCodec, timeOffset, cc, level, sn, duration, decryptdata) {
	      if (data.byteLength > 0 && decryptdata != null && decryptdata.key != null && decryptdata.method === 'AES-128') {
	        if (this.decrypter == null) {
	          this.decrypter = new _decrypter2.default(this.hls);
	        }

	        var localthis = this;
	        this.decrypter.decrypt(data, decryptdata.key, decryptdata.iv, function (decryptedData) {
	          localthis.pushDecrypted(decryptedData, audioCodec, videoCodec, timeOffset, cc, level, sn, duration);
	        });
	      } else {
	        this.pushDecrypted(data, audioCodec, videoCodec, timeOffset, cc, level, sn, duration);
	      }
	    }
	  }, {
	    key: 'onWorkerMessage',
	    value: function onWorkerMessage(ev) {
	      var data = ev.data;
	      //console.log('onWorkerMessage:' + data.event);
	      switch (data.event) {
	        case _events2.default.FRAG_PARSING_INIT_SEGMENT:
	          var obj = {};
	          obj.tracks = data.tracks;
	          obj.unique = data.unique;
	          this.hls.trigger(_events2.default.FRAG_PARSING_INIT_SEGMENT, obj);
	          break;
	        case _events2.default.FRAG_PARSING_DATA:
	          this.hls.trigger(_events2.default.FRAG_PARSING_DATA, {
	            data1: new Uint8Array(data.data1),
	            data2: new Uint8Array(data.data2),
	            startPTS: data.startPTS,
	            endPTS: data.endPTS,
	            startDTS: data.startDTS,
	            endDTS: data.endDTS,
	            type: data.type,
	            nb: data.nb
	          });
	          break;
	        case _events2.default.FRAG_PARSING_METADATA:
	          this.hls.trigger(_events2.default.FRAG_PARSING_METADATA, {
	            samples: data.samples
	          });
	          break;
	        case _events2.default.FRAG_PARSING_USERDATA:
	          this.hls.trigger(_events2.default.FRAG_PARSING_USERDATA, {
	            samples: data.samples
	          });
	          break;
	        default:
	          this.hls.trigger(data.event, data.data);
	          break;
	      }
	    }
	  }]);

	  return Demuxer;
	}();

	exports.default = Demuxer;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}(); /*  inline demuxer.
	      *   probe fragments and instantiate appropriate demuxer depending on content type (TSDemuxer, AACDemuxer, ...)
	      */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(74);

	var _events2 = _interopRequireDefault(_events);

	var _errors = __webpack_require__(75);

	var _aacdemuxer = __webpack_require__(87);

	var _aacdemuxer2 = _interopRequireDefault(_aacdemuxer);

	var _tsdemuxer = __webpack_require__(90);

	var _tsdemuxer2 = _interopRequireDefault(_tsdemuxer);

	var _mp4Remuxer = __webpack_require__(92);

	var _mp4Remuxer2 = _interopRequireDefault(_mp4Remuxer);

	var _passthroughRemuxer = __webpack_require__(94);

	var _passthroughRemuxer2 = _interopRequireDefault(_passthroughRemuxer);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var DemuxerInline = function () {
	  function DemuxerInline(hls, typeSupported) {
	    _classCallCheck(this, DemuxerInline);

	    this.hls = hls;
	    this.typeSupported = typeSupported;
	  }

	  _createClass(DemuxerInline, [{
	    key: 'destroy',
	    value: function destroy() {
	      var demuxer = this.demuxer;
	      if (demuxer) {
	        demuxer.destroy();
	      }
	    }
	  }, {
	    key: 'push',
	    value: function push(data, audioCodec, videoCodec, timeOffset, cc, level, sn, duration) {
	      var demuxer = this.demuxer;
	      if (!demuxer) {
	        var hls = this.hls;
	        // probe for content type
	        if (_tsdemuxer2.default.probe(data)) {
	          if (this.typeSupported.mp2t === true) {
	            demuxer = new _tsdemuxer2.default(hls, _passthroughRemuxer2.default);
	          } else {
	            demuxer = new _tsdemuxer2.default(hls, _mp4Remuxer2.default);
	          }
	        } else if (_aacdemuxer2.default.probe(data)) {
	          demuxer = new _aacdemuxer2.default(hls, _mp4Remuxer2.default);
	        } else {
	          hls.trigger(_events2.default.ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.FRAG_PARSING_ERROR, fatal: true, reason: 'no demux matching with content found' });
	          return;
	        }
	        this.demuxer = demuxer;
	      }
	      demuxer.push(data, audioCodec, videoCodec, timeOffset, cc, level, sn, duration);
	    }
	  }]);

	  return DemuxerInline;
	}();

	exports.default = DemuxerInline;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}(); /**
	      * AAC demuxer
	      */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _adts = __webpack_require__(88);

	var _adts2 = _interopRequireDefault(_adts);

	var _logger = __webpack_require__(83);

	var _id = __webpack_require__(89);

	var _id2 = _interopRequireDefault(_id);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var AACDemuxer = function () {
	  function AACDemuxer(observer, remuxerClass) {
	    _classCallCheck(this, AACDemuxer);

	    this.observer = observer;
	    this.remuxerClass = remuxerClass;
	    this.remuxer = new this.remuxerClass(observer);
	    this._aacTrack = { container: 'audio/adts', type: 'audio', id: -1, sequenceNumber: 0, samples: [], len: 0 };
	  }

	  _createClass(AACDemuxer, [{
	    key: 'push',

	    // feed incoming data to the front of the parsing pipeline
	    value: function push(data, audioCodec, videoCodec, timeOffset, cc, level, sn, duration) {
	      var track = this._aacTrack,
	          id3 = new _id2.default(data),
	          pts = 90 * id3.timeStamp,
	          config,
	          frameLength,
	          frameDuration,
	          frameIndex,
	          offset,
	          headerLength,
	          stamp,
	          len,
	          aacSample;
	      // look for ADTS header (0xFFFx)
	      for (offset = id3.length, len = data.length; offset < len - 1; offset++) {
	        if (data[offset] === 0xff && (data[offset + 1] & 0xf0) === 0xf0) {
	          break;
	        }
	      }

	      if (!track.audiosamplerate) {
	        config = _adts2.default.getAudioConfig(this.observer, data, offset, audioCodec);
	        track.config = config.config;
	        track.audiosamplerate = config.samplerate;
	        track.channelCount = config.channelCount;
	        track.codec = config.codec;
	        track.timescale = config.samplerate;
	        track.duration = config.samplerate * duration;
	        _logger.logger.log('parsed codec:' + track.codec + ',rate:' + config.samplerate + ',nb channel:' + config.channelCount);
	      }
	      frameIndex = 0;
	      frameDuration = 1024 * 90000 / track.audiosamplerate;
	      while (offset + 5 < len) {
	        // The protection skip bit tells us if we have 2 bytes of CRC data at the end of the ADTS header
	        headerLength = !!(data[offset + 1] & 0x01) ? 7 : 9;
	        // retrieve frame size
	        frameLength = (data[offset + 3] & 0x03) << 11 | data[offset + 4] << 3 | (data[offset + 5] & 0xE0) >>> 5;
	        frameLength -= headerLength;
	        //stamp = pes.pts;

	        if (frameLength > 0 && offset + headerLength + frameLength <= len) {
	          stamp = pts + frameIndex * frameDuration;
	          //logger.log(`AAC frame, offset/length/total/pts:${offset+headerLength}/${frameLength}/${data.byteLength}/${(stamp/90).toFixed(0)}`);
	          aacSample = { unit: data.subarray(offset + headerLength, offset + headerLength + frameLength), pts: stamp, dts: stamp };
	          track.samples.push(aacSample);
	          track.len += frameLength;
	          offset += frameLength + headerLength;
	          frameIndex++;
	          // look for ADTS header (0xFFFx)
	          for (; offset < len - 1; offset++) {
	            if (data[offset] === 0xff && (data[offset + 1] & 0xf0) === 0xf0) {
	              break;
	            }
	          }
	        } else {
	          break;
	        }
	      }
	      this.remuxer.remux(this._aacTrack, { samples: [] }, { samples: [{ pts: pts, dts: pts, unit: id3.payload }] }, { samples: [] }, timeOffset);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {}
	  }], [{
	    key: 'probe',
	    value: function probe(data) {
	      // check if data contains ID3 timestamp and ADTS sync worc
	      var id3 = new _id2.default(data),
	          offset,
	          len;
	      if (id3.hasTimeStamp) {
	        // look for ADTS header (0xFFFx)
	        for (offset = id3.length, len = data.length; offset < len - 1; offset++) {
	          if (data[offset] === 0xff && (data[offset + 1] & 0xf0) === 0xf0) {
	            //logger.log('ADTS sync word found !');
	            return true;
	          }
	        }
	      }
	      return false;
	    }
	  }]);

	  return AACDemuxer;
	}();

	exports.default = AACDemuxer;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}(); /**
	      *  ADTS parser helper
	      */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _logger = __webpack_require__(83);

	var _errors = __webpack_require__(75);

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var ADTS = function () {
	  function ADTS() {
	    _classCallCheck(this, ADTS);
	  }

	  _createClass(ADTS, null, [{
	    key: 'getAudioConfig',
	    value: function getAudioConfig(observer, data, offset, audioCodec) {
	      var adtsObjectType,

	      // :int
	      adtsSampleingIndex,

	      // :int
	      adtsExtensionSampleingIndex,

	      // :int
	      adtsChanelConfig,

	      // :int
	      config,
	          userAgent = navigator.userAgent.toLowerCase(),
	          adtsSampleingRates = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
	      // byte 2
	      adtsObjectType = ((data[offset + 2] & 0xC0) >>> 6) + 1;
	      adtsSampleingIndex = (data[offset + 2] & 0x3C) >>> 2;
	      if (adtsSampleingIndex > adtsSampleingRates.length - 1) {
	        observer.trigger(Event.ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.FRAG_PARSING_ERROR, fatal: true, reason: 'invalid ADTS sampling index:' + adtsSampleingIndex });
	        return;
	      }
	      adtsChanelConfig = (data[offset + 2] & 0x01) << 2;
	      // byte 3
	      adtsChanelConfig |= (data[offset + 3] & 0xC0) >>> 6;
	      _logger.logger.log('manifest codec:' + audioCodec + ',ADTS data:type:' + adtsObjectType + ',sampleingIndex:' + adtsSampleingIndex + '[' + adtsSampleingRates[adtsSampleingIndex] + 'Hz],channelConfig:' + adtsChanelConfig);
	      // firefox: freq less than 24kHz = AAC SBR (HE-AAC)
	      if (userAgent.indexOf('firefox') !== -1) {
	        if (adtsSampleingIndex >= 6) {
	          adtsObjectType = 5;
	          config = new Array(4);
	          // HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
	          // there is a factor 2 between frame sample rate and output sample rate
	          // multiply frequency by 2 (see table below, equivalent to substract 3)
	          adtsExtensionSampleingIndex = adtsSampleingIndex - 3;
	        } else {
	          adtsObjectType = 2;
	          config = new Array(2);
	          adtsExtensionSampleingIndex = adtsSampleingIndex;
	        }
	        // Android : always use AAC
	      } else if (userAgent.indexOf('android') !== -1) {
	          adtsObjectType = 2;
	          config = new Array(2);
	          adtsExtensionSampleingIndex = adtsSampleingIndex;
	        } else {
	          /*  for other browsers (chrome ...)
	              always force audio type to be HE-AAC SBR, as some browsers do not support audio codec switch properly (like Chrome ...)
	          */
	          adtsObjectType = 5;
	          config = new Array(4);
	          // if (manifest codec is HE-AAC or HE-AACv2) OR (manifest codec not specified AND frequency less than 24kHz)
	          if (audioCodec && (audioCodec.indexOf('mp4a.40.29') !== -1 || audioCodec.indexOf('mp4a.40.5') !== -1) || !audioCodec && adtsSampleingIndex >= 6) {
	            // HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
	            // there is a factor 2 between frame sample rate and output sample rate
	            // multiply frequency by 2 (see table below, equivalent to substract 3)
	            adtsExtensionSampleingIndex = adtsSampleingIndex - 3;
	          } else {
	            // if (manifest codec is AAC) AND (frequency less than 24kHz OR nb channel is 1) OR (manifest codec not specified and mono audio)
	            // Chrome fails to play back with AAC LC mono when initialized with HE-AAC.  This is not a problem with stereo.
	            if (audioCodec && audioCodec.indexOf('mp4a.40.2') !== -1 && (adtsSampleingIndex >= 6 || adtsChanelConfig === 1) || !audioCodec && adtsChanelConfig === 1) {
	              adtsObjectType = 2;
	              config = new Array(2);
	            }
	            adtsExtensionSampleingIndex = adtsSampleingIndex;
	          }
	        }
	      /* refer to http://wiki.multimedia.cx/index.php?title=MPEG-4_Audio#Audio_Specific_Config
	          ISO 14496-3 (AAC).pdf - Table 1.13 — Syntax of AudioSpecificConfig()
	        Audio Profile / Audio Object Type
	        0: Null
	        1: AAC Main
	        2: AAC LC (Low Complexity)
	        3: AAC SSR (Scalable Sample Rate)
	        4: AAC LTP (Long Term Prediction)
	        5: SBR (Spectral Band Replication)
	        6: AAC Scalable
	       sampling freq
	        0: 96000 Hz
	        1: 88200 Hz
	        2: 64000 Hz
	        3: 48000 Hz
	        4: 44100 Hz
	        5: 32000 Hz
	        6: 24000 Hz
	        7: 22050 Hz
	        8: 16000 Hz
	        9: 12000 Hz
	        10: 11025 Hz
	        11: 8000 Hz
	        12: 7350 Hz
	        13: Reserved
	        14: Reserved
	        15: frequency is written explictly
	        Channel Configurations
	        These are the channel configurations:
	        0: Defined in AOT Specifc Config
	        1: 1 channel: front-center
	        2: 2 channels: front-left, front-right
	      */
	      // audioObjectType = profile => profile, the MPEG-4 Audio Object Type minus 1
	      config[0] = adtsObjectType << 3;
	      // samplingFrequencyIndex
	      config[0] |= (adtsSampleingIndex & 0x0E) >> 1;
	      config[1] |= (adtsSampleingIndex & 0x01) << 7;
	      // channelConfiguration
	      config[1] |= adtsChanelConfig << 3;
	      if (adtsObjectType === 5) {
	        // adtsExtensionSampleingIndex
	        config[1] |= (adtsExtensionSampleingIndex & 0x0E) >> 1;
	        config[2] = (adtsExtensionSampleingIndex & 0x01) << 7;
	        // adtsObjectType (force to 2, chrome is checking that object type is less than 5 ???
	        //    https://chromium.googlesource.com/chromium/src.git/+/master/media/formats/mp4/aac.cc
	        config[2] |= 2 << 2;
	        config[3] = 0;
	      }
	      return { config: config, samplerate: adtsSampleingRates[adtsSampleingIndex], channelCount: adtsChanelConfig, codec: 'mp4a.40.' + adtsObjectType };
	    }
	  }]);

	  return ADTS;
	}();

	exports.default = ADTS;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}(); /**
	      * ID3 parser
	      */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _logger = __webpack_require__(83);

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	//import Hex from '../utils/hex';

	var ID3 = function () {
	  function ID3(data) {
	    _classCallCheck(this, ID3);

	    this._hasTimeStamp = false;
	    var offset = 0,
	        byte1,
	        byte2,
	        byte3,
	        byte4,
	        tagSize,
	        endPos,
	        header,
	        len;
	    do {
	      header = this.readUTF(data, offset, 3);
	      offset += 3;
	      // first check for ID3 header
	      if (header === 'ID3') {
	        // skip 24 bits
	        offset += 3;
	        // retrieve tag(s) length
	        byte1 = data[offset++] & 0x7f;
	        byte2 = data[offset++] & 0x7f;
	        byte3 = data[offset++] & 0x7f;
	        byte4 = data[offset++] & 0x7f;
	        tagSize = (byte1 << 21) + (byte2 << 14) + (byte3 << 7) + byte4;
	        endPos = offset + tagSize;
	        //logger.log(`ID3 tag found, size/end: ${tagSize}/${endPos}`);

	        // read ID3 tags
	        this._parseID3Frames(data, offset, endPos);
	        offset = endPos;
	      } else if (header === '3DI') {
	        // http://id3.org/id3v2.4.0-structure chapter 3.4.   ID3v2 footer
	        offset += 7;
	        _logger.logger.log('3DI footer found, end: ' + offset);
	      } else {
	        offset -= 3;
	        len = offset;
	        if (len) {
	          //logger.log(`ID3 len: ${len}`);
	          if (!this.hasTimeStamp) {
	            _logger.logger.warn('ID3 tag found, but no timestamp');
	          }
	          this._length = len;
	          this._payload = data.subarray(0, len);
	        }
	        return;
	      }
	    } while (true);
	  }

	  _createClass(ID3, [{
	    key: 'readUTF',
	    value: function readUTF(data, start, len) {

	      var result = '',
	          offset = start,
	          end = start + len;
	      do {
	        result += String.fromCharCode(data[offset++]);
	      } while (offset < end);
	      return result;
	    }
	  }, {
	    key: '_parseID3Frames',
	    value: function _parseID3Frames(data, offset, endPos) {
	      var tagId, tagLen, tagStart, tagFlags, timestamp;
	      while (offset + 8 <= endPos) {
	        tagId = this.readUTF(data, offset, 4);
	        offset += 4;

	        tagLen = data[offset++] << 24 + data[offset++] << 16 + data[offset++] << 8 + data[offset++];

	        tagFlags = data[offset++] << 8 + data[offset++];

	        tagStart = offset;
	        //logger.log("ID3 tag id:" + tagId);
	        switch (tagId) {
	          case 'PRIV':
	            //logger.log('parse frame:' + Hex.hexDump(data.subarray(offset,endPos)));
	            // owner should be "com.apple.streaming.transportStreamTimestamp"
	            if (this.readUTF(data, offset, 44) === 'com.apple.streaming.transportStreamTimestamp') {
	              offset += 44;
	              // smelling even better ! we found the right descriptor
	              // skip null character (string end) + 3 first bytes
	              offset += 4;

	              // timestamp is 33 bit expressed as a big-endian eight-octet number, with the upper 31 bits set to zero.
	              var pts33Bit = data[offset++] & 0x1;
	              this._hasTimeStamp = true;

	              timestamp = ((data[offset++] << 23) + (data[offset++] << 15) + (data[offset++] << 7) + data[offset++]) / 45;

	              if (pts33Bit) {
	                timestamp += 47721858.84; // 2^32 / 90
	              }
	              timestamp = Math.round(timestamp);
	              _logger.logger.trace('ID3 timestamp found: ' + timestamp);
	              this._timeStamp = timestamp;
	            }
	            break;
	          default:
	            break;
	        }
	      }
	    }
	  }, {
	    key: 'hasTimeStamp',
	    get: function get() {
	      return this._hasTimeStamp;
	    }
	  }, {
	    key: 'timeStamp',
	    get: function get() {
	      return this._timeStamp;
	    }
	  }, {
	    key: 'length',
	    get: function get() {
	      return this._length;
	    }
	  }, {
	    key: 'payload',
	    get: function get() {
	      return this._payload;
	    }
	  }]);

	  return ID3;
	}();

	exports.default = ID3;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}(); /**
	      * highly optimized TS demuxer:
	      * parse PAT, PMT
	      * extract PES packet from audio and video PIDs
	      * extract AVC/H264 NAL units and AAC/ADTS samples from PES packet
	      * trigger the remuxer upon parsing completion
	      * it also tries to workaround as best as it can audio codec switch (HE-AAC to AAC and vice versa), without having to restart the MediaSource.
	      * it also controls the remuxing process :
	      * upon discontinuity or level switch detection, it will also notifies the remuxer so that it can reset its state.
	     */

	// import Hex from '../utils/hex';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _adts = __webpack_require__(88);

	var _adts2 = _interopRequireDefault(_adts);

	var _events = __webpack_require__(74);

	var _events2 = _interopRequireDefault(_events);

	var _expGolomb = __webpack_require__(91);

	var _expGolomb2 = _interopRequireDefault(_expGolomb);

	var _logger = __webpack_require__(83);

	var _errors = __webpack_require__(75);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var TSDemuxer = function () {
	  function TSDemuxer(observer, remuxerClass) {
	    _classCallCheck(this, TSDemuxer);

	    this.observer = observer;
	    this.remuxerClass = remuxerClass;
	    this.lastCC = 0;
	    this.remuxer = new this.remuxerClass(observer);
	  }

	  _createClass(TSDemuxer, [{
	    key: 'switchLevel',
	    value: function switchLevel() {
	      this.pmtParsed = false;
	      this._pmtId = -1;
	      this.lastAacPTS = null;
	      this.aacOverFlow = null;
	      this._avcTrack = { container: 'video/mp2t', type: 'video', id: -1, sequenceNumber: 0, samples: [], len: 0, nbNalu: 0 };
	      this._aacTrack = { container: 'video/mp2t', type: 'audio', id: -1, sequenceNumber: 0, samples: [], len: 0 };
	      this._id3Track = { type: 'id3', id: -1, sequenceNumber: 0, samples: [], len: 0 };
	      this._txtTrack = { type: 'text', id: -1, sequenceNumber: 0, samples: [], len: 0 };
	      this.remuxer.switchLevel();
	    }
	  }, {
	    key: 'insertDiscontinuity',
	    value: function insertDiscontinuity() {
	      this.switchLevel();
	      this.remuxer.insertDiscontinuity();
	    }

	    // feed incoming data to the front of the parsing pipeline

	  }, {
	    key: 'push',
	    value: function push(data, audioCodec, videoCodec, timeOffset, cc, level, sn, duration) {
	      var avcData,
	          aacData,
	          id3Data,
	          start,
	          len = data.length,
	          stt,
	          pid,
	          atf,
	          offset,
	          codecsOnly = this.remuxer.passthrough;

	      this.audioCodec = audioCodec;
	      this.videoCodec = videoCodec;
	      this.timeOffset = timeOffset;
	      this._duration = duration;
	      this.contiguous = false;
	      if (cc !== this.lastCC) {
	        _logger.logger.log('discontinuity detected');
	        this.insertDiscontinuity();
	        this.lastCC = cc;
	      } else if (level !== this.lastLevel) {
	        _logger.logger.log('level switch detected');
	        this.switchLevel();
	        this.lastLevel = level;
	      } else if (sn === this.lastSN + 1) {
	        this.contiguous = true;
	      }
	      this.lastSN = sn;

	      if (!this.contiguous) {
	        // flush any partial content
	        this.aacOverFlow = null;
	      }

	      var pmtParsed = this.pmtParsed,
	          avcId = this._avcTrack.id,
	          aacId = this._aacTrack.id,
	          id3Id = this._id3Track.id;

	      // don't parse last TS packet if incomplete
	      len -= len % 188;
	      // loop through TS packets
	      for (start = 0; start < len; start += 188) {
	        if (data[start] === 0x47) {
	          stt = !!(data[start + 1] & 0x40);
	          // pid is a 13-bit field starting at the last bit of TS[1]
	          pid = ((data[start + 1] & 0x1f) << 8) + data[start + 2];
	          atf = (data[start + 3] & 0x30) >> 4;
	          // if an adaption field is present, its length is specified by the fifth byte of the TS packet header.
	          if (atf > 1) {
	            offset = start + 5 + data[start + 4];
	            // continue if there is only adaptation field
	            if (offset === start + 188) {
	              continue;
	            }
	          } else {
	            offset = start + 4;
	          }
	          if (pmtParsed) {
	            if (pid === avcId) {
	              if (stt) {
	                if (avcData) {
	                  this._parseAVCPES(this._parsePES(avcData));
	                  if (codecsOnly) {
	                    // if we have video codec info AND
	                    // if audio PID is undefined OR if we have audio codec info,
	                    // we have all codec info !
	                    if (this._avcTrack.codec && (aacId === -1 || this._aacTrack.codec)) {
	                      this.remux(data);
	                      return;
	                    }
	                  }
	                }
	                avcData = { data: [], size: 0 };
	              }
	              if (avcData) {
	                avcData.data.push(data.subarray(offset, start + 188));
	                avcData.size += start + 188 - offset;
	              }
	            } else if (pid === aacId) {
	              if (stt) {
	                if (aacData) {
	                  this._parseAACPES(this._parsePES(aacData));
	                  if (codecsOnly) {
	                    // here we now that we have audio codec info
	                    // if video PID is undefined OR if we have video codec info,
	                    // we have all codec infos !
	                    if (this._aacTrack.codec && (avcId === -1 || this._avcTrack.codec)) {
	                      this.remux(data);
	                      return;
	                    }
	                  }
	                }
	                aacData = { data: [], size: 0 };
	              }
	              if (aacData) {
	                aacData.data.push(data.subarray(offset, start + 188));
	                aacData.size += start + 188 - offset;
	              }
	            } else if (pid === id3Id) {
	              if (stt) {
	                if (id3Data) {
	                  this._parseID3PES(this._parsePES(id3Data));
	                }
	                id3Data = { data: [], size: 0 };
	              }
	              if (id3Data) {
	                id3Data.data.push(data.subarray(offset, start + 188));
	                id3Data.size += start + 188 - offset;
	              }
	            }
	          } else {
	            if (stt) {
	              offset += data[offset] + 1;
	            }
	            if (pid === 0) {
	              this._parsePAT(data, offset);
	            } else if (pid === this._pmtId) {
	              this._parsePMT(data, offset);
	              pmtParsed = this.pmtParsed = true;
	              avcId = this._avcTrack.id;
	              aacId = this._aacTrack.id;
	              id3Id = this._id3Track.id;
	            }
	          }
	        } else {
	          this.observer.trigger(_events2.default.ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.FRAG_PARSING_ERROR, fatal: false, reason: 'TS packet did not start with 0x47' });
	        }
	      }
	      // parse last PES packet
	      if (avcData) {
	        this._parseAVCPES(this._parsePES(avcData));
	      }
	      if (aacData) {
	        this._parseAACPES(this._parsePES(aacData));
	      }
	      if (id3Data) {
	        this._parseID3PES(this._parsePES(id3Data));
	      }
	      this.remux(null);
	    }
	  }, {
	    key: 'remux',
	    value: function remux(data) {
	      this.remuxer.remux(this._aacTrack, this._avcTrack, this._id3Track, this._txtTrack, this.timeOffset, this.contiguous, data);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.switchLevel();
	      this._initPTS = this._initDTS = undefined;
	      this._duration = 0;
	    }
	  }, {
	    key: '_parsePAT',
	    value: function _parsePAT(data, offset) {
	      // skip the PSI header and parse the first PMT entry
	      this._pmtId = (data[offset + 10] & 0x1F) << 8 | data[offset + 11];
	      //logger.log('PMT PID:'  + this._pmtId);
	    }
	  }, {
	    key: '_parsePMT',
	    value: function _parsePMT(data, offset) {
	      var sectionLength, tableEnd, programInfoLength, pid;
	      sectionLength = (data[offset + 1] & 0x0f) << 8 | data[offset + 2];
	      tableEnd = offset + 3 + sectionLength - 4;
	      // to determine where the table is, we have to figure out how
	      // long the program info descriptors are
	      programInfoLength = (data[offset + 10] & 0x0f) << 8 | data[offset + 11];
	      // advance the offset to the first entry in the mapping table
	      offset += 12 + programInfoLength;
	      while (offset < tableEnd) {
	        pid = (data[offset + 1] & 0x1F) << 8 | data[offset + 2];
	        switch (data[offset]) {
	          // ISO/IEC 13818-7 ADTS AAC (MPEG-2 lower bit-rate audio)
	          case 0x0f:
	            //logger.log('AAC PID:'  + pid);
	            this._aacTrack.id = pid;
	            break;
	          // Packetized metadata (ID3)
	          case 0x15:
	            //logger.log('ID3 PID:'  + pid);
	            this._id3Track.id = pid;
	            break;
	          // ITU-T Rec. H.264 and ISO/IEC 14496-10 (lower bit-rate video)
	          case 0x1b:
	            //logger.log('AVC PID:'  + pid);
	            this._avcTrack.id = pid;
	            break;
	          default:
	            _logger.logger.log('unkown stream type:' + data[offset]);
	            break;
	        }
	        // move to the next table entry
	        // skip past the elementary stream descriptors, if present
	        offset += ((data[offset + 3] & 0x0F) << 8 | data[offset + 4]) + 5;
	      }
	    }
	  }, {
	    key: '_parsePES',
	    value: function _parsePES(stream) {
	      var i = 0,
	          frag,
	          pesFlags,
	          pesPrefix,
	          pesLen,
	          pesHdrLen,
	          pesData,
	          pesPts,
	          pesDts,
	          payloadStartOffset,
	          data = stream.data;
	      //retrieve PTS/DTS from first fragment
	      frag = data[0];
	      pesPrefix = (frag[0] << 16) + (frag[1] << 8) + frag[2];
	      if (pesPrefix === 1) {
	        pesLen = (frag[4] << 8) + frag[5];
	        pesFlags = frag[7];
	        if (pesFlags & 0xC0) {
	          /* PES header described here : http://dvd.sourceforge.net/dvdinfo/pes-hdr.html
	              as PTS / DTS is 33 bit we cannot use bitwise operator in JS,
	              as Bitwise operators treat their operands as a sequence of 32 bits */
	          pesPts = (frag[9] & 0x0E) * 536870912 + // 1 << 29
	          (frag[10] & 0xFF) * 4194304 + // 1 << 22
	          (frag[11] & 0xFE) * 16384 + // 1 << 14
	          (frag[12] & 0xFF) * 128 + // 1 << 7
	          (frag[13] & 0xFE) / 2;
	          // check if greater than 2^32 -1
	          if (pesPts > 4294967295) {
	            // decrement 2^33
	            pesPts -= 8589934592;
	          }
	          if (pesFlags & 0x40) {
	            pesDts = (frag[14] & 0x0E) * 536870912 + // 1 << 29
	            (frag[15] & 0xFF) * 4194304 + // 1 << 22
	            (frag[16] & 0xFE) * 16384 + // 1 << 14
	            (frag[17] & 0xFF) * 128 + // 1 << 7
	            (frag[18] & 0xFE) / 2;
	            // check if greater than 2^32 -1
	            if (pesDts > 4294967295) {
	              // decrement 2^33
	              pesDts -= 8589934592;
	            }
	          } else {
	            pesDts = pesPts;
	          }
	        }
	        pesHdrLen = frag[8];
	        payloadStartOffset = pesHdrLen + 9;

	        stream.size -= payloadStartOffset;
	        //reassemble PES packet
	        pesData = new Uint8Array(stream.size);
	        while (data.length) {
	          frag = data.shift();
	          var len = frag.byteLength;
	          if (payloadStartOffset) {
	            if (payloadStartOffset > len) {
	              // trim full frag if PES header bigger than frag
	              payloadStartOffset -= len;
	              continue;
	            } else {
	              // trim partial frag if PES header smaller than frag
	              frag = frag.subarray(payloadStartOffset);
	              len -= payloadStartOffset;
	              payloadStartOffset = 0;
	            }
	          }
	          pesData.set(frag, i);
	          i += len;
	        }
	        return { data: pesData, pts: pesPts, dts: pesDts, len: pesLen };
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: '_parseAVCPES',
	    value: function _parseAVCPES(pes) {
	      var _this = this;

	      var track = this._avcTrack,
	          samples = track.samples,
	          units = this._parseAVCNALu(pes.data),
	          units2 = [],
	          debug = false,
	          key = false,
	          length = 0,
	          expGolombDecoder,
	          avcSample,
	          push,
	          i;
	      // no NALu found
	      if (units.length === 0 && samples.length > 0) {
	        // append pes.data to previous NAL unit
	        var lastavcSample = samples[samples.length - 1];
	        var lastUnit = lastavcSample.units.units[lastavcSample.units.units.length - 1];
	        var tmp = new Uint8Array(lastUnit.data.byteLength + pes.data.byteLength);
	        tmp.set(lastUnit.data, 0);
	        tmp.set(pes.data, lastUnit.data.byteLength);
	        lastUnit.data = tmp;
	        lastavcSample.units.length += pes.data.byteLength;
	        track.len += pes.data.byteLength;
	      }
	      //free pes.data to save up some memory
	      pes.data = null;
	      var debugString = '';

	      units.forEach(function (unit) {
	        switch (unit.type) {
	          //NDR
	          case 1:
	            push = true;
	            if (debug) {
	              debugString += 'NDR ';
	            }
	            break;
	          //IDR
	          case 5:
	            push = true;
	            if (debug) {
	              debugString += 'IDR ';
	            }
	            key = true;
	            break;
	          //SEI
	          case 6:
	            push = true;
	            if (debug) {
	              debugString += 'SEI ';
	            }
	            expGolombDecoder = new _expGolomb2.default(unit.data);

	            // skip frameType
	            expGolombDecoder.readUByte();

	            var payloadType = expGolombDecoder.readUByte();

	            // TODO: there can be more than one payload in an SEI packet...
	            // TODO: need to read type and size in a while loop to get them all
	            if (payloadType === 4) {
	              var payloadSize = 0;

	              do {
	                payloadSize = expGolombDecoder.readUByte();
	              } while (payloadSize === 255);

	              var countryCode = expGolombDecoder.readUByte();

	              if (countryCode === 181) {
	                var providerCode = expGolombDecoder.readUShort();

	                if (providerCode === 49) {
	                  var userStructure = expGolombDecoder.readUInt();

	                  if (userStructure === 0x47413934) {
	                    var userDataType = expGolombDecoder.readUByte();

	                    // Raw CEA-608 bytes wrapped in CEA-708 packet
	                    if (userDataType === 3) {
	                      var firstByte = expGolombDecoder.readUByte();
	                      var secondByte = expGolombDecoder.readUByte();

	                      var totalCCs = 31 & firstByte;
	                      var byteArray = [firstByte, secondByte];

	                      for (i = 0; i < totalCCs; i++) {
	                        // 3 bytes per CC
	                        byteArray.push(expGolombDecoder.readUByte());
	                        byteArray.push(expGolombDecoder.readUByte());
	                        byteArray.push(expGolombDecoder.readUByte());
	                      }

	                      _this._txtTrack.samples.push({ type: 3, pts: pes.pts, bytes: byteArray });
	                    }
	                  }
	                }
	              }
	            }
	            break;
	          //SPS
	          case 7:
	            push = true;
	            if (debug) {
	              debugString += 'SPS ';
	            }
	            if (!track.sps) {
	              expGolombDecoder = new _expGolomb2.default(unit.data);
	              var config = expGolombDecoder.readSPS();
	              track.width = config.width;
	              track.height = config.height;
	              track.sps = [unit.data];
	              track.timescale = _this.remuxer.timescale;
	              track.duration = _this.remuxer.timescale * _this._duration;
	              var codecarray = unit.data.subarray(1, 4);
	              var codecstring = 'avc1.';
	              for (i = 0; i < 3; i++) {
	                var h = codecarray[i].toString(16);
	                if (h.length < 2) {
	                  h = '0' + h;
	                }
	                codecstring += h;
	              }
	              track.codec = codecstring;
	            }
	            break;
	          //PPS
	          case 8:
	            push = true;
	            if (debug) {
	              debugString += 'PPS ';
	            }
	            if (!track.pps) {
	              track.pps = [unit.data];
	            }
	            break;
	          case 9:
	            push = false;
	            if (debug) {
	              debugString += 'AUD ';
	            }
	            break;
	          default:
	            push = false;
	            debugString += 'unknown NAL ' + unit.type + ' ';
	            break;
	        }
	        if (push) {
	          units2.push(unit);
	          length += unit.data.byteLength;
	        }
	      });
	      if (debug || debugString.length) {
	        _logger.logger.log(debugString);
	      }
	      //build sample from PES
	      // Annex B to MP4 conversion to be done
	      if (units2.length) {
	        // only push AVC sample if keyframe already found. browsers expect a keyframe at first to start decoding
	        if (key === true || track.sps) {
	          avcSample = { units: { units: units2, length: length }, pts: pes.pts, dts: pes.dts, key: key };
	          samples.push(avcSample);
	          track.len += length;
	          track.nbNalu += units2.length;
	        }
	      }
	    }
	  }, {
	    key: '_parseAVCNALu',
	    value: function _parseAVCNALu(array) {
	      var i = 0,
	          len = array.byteLength,
	          value,
	          overflow,
	          state = 0;
	      var units = [],
	          unit,
	          unitType,
	          lastUnitStart,
	          lastUnitType;
	      //logger.log('PES:' + Hex.hexDump(array));
	      while (i < len) {
	        value = array[i++];
	        // finding 3 or 4-byte start codes (00 00 01 OR 00 00 00 01)
	        switch (state) {
	          case 0:
	            if (value === 0) {
	              state = 1;
	            }
	            break;
	          case 1:
	            if (value === 0) {
	              state = 2;
	            } else {
	              state = 0;
	            }
	            break;
	          case 2:
	          case 3:
	            if (value === 0) {
	              state = 3;
	            } else if (value === 1 && i < len) {
	              unitType = array[i] & 0x1f;
	              //logger.log('find NALU @ offset:' + i + ',type:' + unitType);
	              if (lastUnitStart) {
	                unit = { data: array.subarray(lastUnitStart, i - state - 1), type: lastUnitType };
	                //logger.log('pushing NALU, type/size:' + unit.type + '/' + unit.data.byteLength);
	                units.push(unit);
	              } else {
	                // If NAL units are not starting right at the beginning of the PES packet, push preceding data into previous NAL unit.
	                overflow = i - state - 1;
	                if (overflow) {
	                  var track = this._avcTrack,
	                      samples = track.samples;
	                  //logger.log('first NALU found with overflow:' + overflow);
	                  if (samples.length) {
	                    var lastavcSample = samples[samples.length - 1],
	                        lastUnits = lastavcSample.units.units,
	                        lastUnit = lastUnits[lastUnits.length - 1],
	                        tmp = new Uint8Array(lastUnit.data.byteLength + overflow);
	                    tmp.set(lastUnit.data, 0);
	                    tmp.set(array.subarray(0, overflow), lastUnit.data.byteLength);
	                    lastUnit.data = tmp;
	                    lastavcSample.units.length += overflow;
	                    track.len += overflow;
	                  }
	                }
	              }
	              lastUnitStart = i;
	              lastUnitType = unitType;
	              state = 0;
	            } else {
	              state = 0;
	            }
	            break;
	          default:
	            break;
	        }
	      }
	      if (lastUnitStart) {
	        unit = { data: array.subarray(lastUnitStart, len), type: lastUnitType };
	        units.push(unit);
	        //logger.log('pushing NALU, type/size:' + unit.type + '/' + unit.data.byteLength);
	      }
	      return units;
	    }
	  }, {
	    key: '_parseAACPES',
	    value: function _parseAACPES(pes) {
	      var track = this._aacTrack,
	          data = pes.data,
	          pts = pes.pts,
	          startOffset = 0,
	          duration = this._duration,
	          audioCodec = this.audioCodec,
	          aacOverFlow = this.aacOverFlow,
	          lastAacPTS = this.lastAacPTS,
	          config,
	          frameLength,
	          frameDuration,
	          frameIndex,
	          offset,
	          headerLength,
	          stamp,
	          len,
	          aacSample;
	      if (aacOverFlow) {
	        var tmp = new Uint8Array(aacOverFlow.byteLength + data.byteLength);
	        tmp.set(aacOverFlow, 0);
	        tmp.set(data, aacOverFlow.byteLength);
	        //logger.log(`AAC: append overflowing ${aacOverFlow.byteLength} bytes to beginning of new PES`);
	        data = tmp;
	      }
	      // look for ADTS header (0xFFFx)
	      for (offset = startOffset, len = data.length; offset < len - 1; offset++) {
	        if (data[offset] === 0xff && (data[offset + 1] & 0xf0) === 0xf0) {
	          break;
	        }
	      }
	      // if ADTS header does not start straight from the beginning of the PES payload, raise an error
	      if (offset) {
	        var reason, fatal;
	        if (offset < len - 1) {
	          reason = 'AAC PES did not start with ADTS header,offset:' + offset;
	          fatal = false;
	        } else {
	          reason = 'no ADTS header found in AAC PES';
	          fatal = true;
	        }
	        this.observer.trigger(_events2.default.ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.FRAG_PARSING_ERROR, fatal: fatal, reason: reason });
	        if (fatal) {
	          return;
	        }
	      }
	      if (!track.audiosamplerate) {
	        config = _adts2.default.getAudioConfig(this.observer, data, offset, audioCodec);
	        track.config = config.config;
	        track.audiosamplerate = config.samplerate;
	        track.channelCount = config.channelCount;
	        track.codec = config.codec;
	        track.timescale = config.samplerate;
	        track.duration = config.samplerate * duration;
	        _logger.logger.log('parsed codec:' + track.codec + ',rate:' + config.samplerate + ',nb channel:' + config.channelCount);
	      }
	      frameIndex = 0;
	      frameDuration = 1024 * 90000 / track.audiosamplerate;

	      // if last AAC frame is overflowing, we should ensure timestamps are contiguous:
	      // first sample PTS should be equal to last sample PTS + frameDuration
	      if (aacOverFlow && lastAacPTS) {
	        var newPTS = lastAacPTS + frameDuration;
	        if (Math.abs(newPTS - pts) > 1) {
	          _logger.logger.log('AAC: align PTS for overlapping frames by ' + Math.round((newPTS - pts) / 90));
	          pts = newPTS;
	        }
	      }

	      while (offset + 5 < len) {
	        // The protection skip bit tells us if we have 2 bytes of CRC data at the end of the ADTS header
	        headerLength = !!(data[offset + 1] & 0x01) ? 7 : 9;
	        // retrieve frame size
	        frameLength = (data[offset + 3] & 0x03) << 11 | data[offset + 4] << 3 | (data[offset + 5] & 0xE0) >>> 5;
	        frameLength -= headerLength;
	        //stamp = pes.pts;

	        if (frameLength > 0 && offset + headerLength + frameLength <= len) {
	          stamp = pts + frameIndex * frameDuration;
	          //logger.log(`AAC frame, offset/length/total/pts:${offset+headerLength}/${frameLength}/${data.byteLength}/${(stamp/90).toFixed(0)}`);
	          aacSample = { unit: data.subarray(offset + headerLength, offset + headerLength + frameLength), pts: stamp, dts: stamp };
	          track.samples.push(aacSample);
	          track.len += frameLength;
	          offset += frameLength + headerLength;
	          frameIndex++;
	          // look for ADTS header (0xFFFx)
	          for (; offset < len - 1; offset++) {
	            if (data[offset] === 0xff && (data[offset + 1] & 0xf0) === 0xf0) {
	              break;
	            }
	          }
	        } else {
	          break;
	        }
	      }
	      if (offset < len) {
	        aacOverFlow = data.subarray(offset, len);
	        //logger.log(`AAC: overflow detected:${len-offset}`);
	      } else {
	          aacOverFlow = null;
	        }
	      this.aacOverFlow = aacOverFlow;
	      this.lastAacPTS = stamp;
	    }
	  }, {
	    key: '_parseID3PES',
	    value: function _parseID3PES(pes) {
	      this._id3Track.samples.push(pes);
	    }
	  }], [{
	    key: 'probe',
	    value: function probe(data) {
	      // a TS fragment should contain at least 3 TS packets, a PAT, a PMT, and one PID, each starting with 0x47
	      if (data.length >= 3 * 188 && data[0] === 0x47 && data[188] === 0x47 && data[2 * 188] === 0x47) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }]);

	  return TSDemuxer;
	}();

	exports.default = TSDemuxer;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}(); /**
	      * Parser for exponential Golomb codes, a variable-bitwidth number encoding scheme used by h264.
	     */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _logger = __webpack_require__(83);

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var ExpGolomb = function () {
	  function ExpGolomb(data) {
	    _classCallCheck(this, ExpGolomb);

	    this.data = data;
	    // the number of bytes left to examine in this.data
	    this.bytesAvailable = this.data.byteLength;
	    // the current word being examined
	    this.word = 0; // :uint
	    // the number of bits left to examine in the current word
	    this.bitsAvailable = 0; // :uint
	  }

	  // ():void

	  _createClass(ExpGolomb, [{
	    key: 'loadWord',
	    value: function loadWord() {
	      var position = this.data.byteLength - this.bytesAvailable,
	          workingBytes = new Uint8Array(4),
	          availableBytes = Math.min(4, this.bytesAvailable);
	      if (availableBytes === 0) {
	        throw new Error('no bytes available');
	      }
	      workingBytes.set(this.data.subarray(position, position + availableBytes));
	      this.word = new DataView(workingBytes.buffer).getUint32(0);
	      // track the amount of this.data that has been processed
	      this.bitsAvailable = availableBytes * 8;
	      this.bytesAvailable -= availableBytes;
	    }

	    // (count:int):void

	  }, {
	    key: 'skipBits',
	    value: function skipBits(count) {
	      var skipBytes; // :int
	      if (this.bitsAvailable > count) {
	        this.word <<= count;
	        this.bitsAvailable -= count;
	      } else {
	        count -= this.bitsAvailable;
	        skipBytes = count >> 3;
	        count -= skipBytes >> 3;
	        this.bytesAvailable -= skipBytes;
	        this.loadWord();
	        this.word <<= count;
	        this.bitsAvailable -= count;
	      }
	    }

	    // (size:int):uint

	  }, {
	    key: 'readBits',
	    value: function readBits(size) {
	      var bits = Math.min(this.bitsAvailable, size),

	      // :uint
	      valu = this.word >>> 32 - bits; // :uint
	      if (size > 32) {
	        _logger.logger.error('Cannot read more than 32 bits at a time');
	      }
	      this.bitsAvailable -= bits;
	      if (this.bitsAvailable > 0) {
	        this.word <<= bits;
	      } else if (this.bytesAvailable > 0) {
	        this.loadWord();
	      }
	      bits = size - bits;
	      if (bits > 0) {
	        return valu << bits | this.readBits(bits);
	      } else {
	        return valu;
	      }
	    }

	    // ():uint

	  }, {
	    key: 'skipLZ',
	    value: function skipLZ() {
	      var leadingZeroCount; // :uint
	      for (leadingZeroCount = 0; leadingZeroCount < this.bitsAvailable; ++leadingZeroCount) {
	        if (0 !== (this.word & 0x80000000 >>> leadingZeroCount)) {
	          // the first bit of working word is 1
	          this.word <<= leadingZeroCount;
	          this.bitsAvailable -= leadingZeroCount;
	          return leadingZeroCount;
	        }
	      }
	      // we exhausted word and still have not found a 1
	      this.loadWord();
	      return leadingZeroCount + this.skipLZ();
	    }

	    // ():void

	  }, {
	    key: 'skipUEG',
	    value: function skipUEG() {
	      this.skipBits(1 + this.skipLZ());
	    }

	    // ():void

	  }, {
	    key: 'skipEG',
	    value: function skipEG() {
	      this.skipBits(1 + this.skipLZ());
	    }

	    // ():uint

	  }, {
	    key: 'readUEG',
	    value: function readUEG() {
	      var clz = this.skipLZ(); // :uint
	      return this.readBits(clz + 1) - 1;
	    }

	    // ():int

	  }, {
	    key: 'readEG',
	    value: function readEG() {
	      var valu = this.readUEG(); // :int
	      if (0x01 & valu) {
	        // the number is odd if the low order bit is set
	        return 1 + valu >>> 1; // add 1 to make it even, and divide by 2
	      } else {
	          return -1 * (valu >>> 1); // divide by two then make it negative
	        }
	    }

	    // Some convenience functions
	    // :Boolean

	  }, {
	    key: 'readBoolean',
	    value: function readBoolean() {
	      return 1 === this.readBits(1);
	    }

	    // ():int

	  }, {
	    key: 'readUByte',
	    value: function readUByte() {
	      return this.readBits(8);
	    }

	    // ():int

	  }, {
	    key: 'readUShort',
	    value: function readUShort() {
	      return this.readBits(16);
	    }
	    // ():int

	  }, {
	    key: 'readUInt',
	    value: function readUInt() {
	      return this.readBits(32);
	    }

	    /**
	     * Advance the ExpGolomb decoder past a scaling list. The scaling
	     * list is optionally transmitted as part of a sequence parameter
	     * set and is not relevant to transmuxing.
	     * @param count {number} the number of entries in this scaling list
	     * @see Recommendation ITU-T H.264, Section 7.3.2.1.1.1
	     */

	  }, {
	    key: 'skipScalingList',
	    value: function skipScalingList(count) {
	      var lastScale = 8,
	          nextScale = 8,
	          j,
	          deltaScale;
	      for (j = 0; j < count; j++) {
	        if (nextScale !== 0) {
	          deltaScale = this.readEG();
	          nextScale = (lastScale + deltaScale + 256) % 256;
	        }
	        lastScale = nextScale === 0 ? lastScale : nextScale;
	      }
	    }

	    /**
	     * Read a sequence parameter set and return some interesting video
	     * properties. A sequence parameter set is the H264 metadata that
	     * describes the properties of upcoming video frames.
	     * @param data {Uint8Array} the bytes of a sequence parameter set
	     * @return {object} an object with configuration parsed from the
	     * sequence parameter set, including the dimensions of the
	     * associated video frames.
	     */

	  }, {
	    key: 'readSPS',
	    value: function readSPS() {
	      var frameCropLeftOffset = 0,
	          frameCropRightOffset = 0,
	          frameCropTopOffset = 0,
	          frameCropBottomOffset = 0,
	          sarScale = 1,
	          profileIdc,
	          profileCompat,
	          levelIdc,
	          numRefFramesInPicOrderCntCycle,
	          picWidthInMbsMinus1,
	          picHeightInMapUnitsMinus1,
	          frameMbsOnlyFlag,
	          scalingListCount,
	          i;
	      this.readUByte();
	      profileIdc = this.readUByte(); // profile_idc
	      profileCompat = this.readBits(5); // constraint_set[0-4]_flag, u(5)
	      this.skipBits(3); // reserved_zero_3bits u(3),
	      levelIdc = this.readUByte(); //level_idc u(8)
	      this.skipUEG(); // seq_parameter_set_id
	      // some profiles have more optional data we don't need
	      if (profileIdc === 100 || profileIdc === 110 || profileIdc === 122 || profileIdc === 244 || profileIdc === 44 || profileIdc === 83 || profileIdc === 86 || profileIdc === 118 || profileIdc === 128) {
	        var chromaFormatIdc = this.readUEG();
	        if (chromaFormatIdc === 3) {
	          this.skipBits(1); // separate_colour_plane_flag
	        }
	        this.skipUEG(); // bit_depth_luma_minus8
	        this.skipUEG(); // bit_depth_chroma_minus8
	        this.skipBits(1); // qpprime_y_zero_transform_bypass_flag
	        if (this.readBoolean()) {
	          // seq_scaling_matrix_present_flag
	          scalingListCount = chromaFormatIdc !== 3 ? 8 : 12;
	          for (i = 0; i < scalingListCount; i++) {
	            if (this.readBoolean()) {
	              // seq_scaling_list_present_flag[ i ]
	              if (i < 6) {
	                this.skipScalingList(16);
	              } else {
	                this.skipScalingList(64);
	              }
	            }
	          }
	        }
	      }
	      this.skipUEG(); // log2_max_frame_num_minus4
	      var picOrderCntType = this.readUEG();
	      if (picOrderCntType === 0) {
	        this.readUEG(); //log2_max_pic_order_cnt_lsb_minus4
	      } else if (picOrderCntType === 1) {
	          this.skipBits(1); // delta_pic_order_always_zero_flag
	          this.skipEG(); // offset_for_non_ref_pic
	          this.skipEG(); // offset_for_top_to_bottom_field
	          numRefFramesInPicOrderCntCycle = this.readUEG();
	          for (i = 0; i < numRefFramesInPicOrderCntCycle; i++) {
	            this.skipEG(); // offset_for_ref_frame[ i ]
	          }
	        }
	      this.skipUEG(); // max_num_ref_frames
	      this.skipBits(1); // gaps_in_frame_num_value_allowed_flag
	      picWidthInMbsMinus1 = this.readUEG();
	      picHeightInMapUnitsMinus1 = this.readUEG();
	      frameMbsOnlyFlag = this.readBits(1);
	      if (frameMbsOnlyFlag === 0) {
	        this.skipBits(1); // mb_adaptive_frame_field_flag
	      }
	      this.skipBits(1); // direct_8x8_inference_flag
	      if (this.readBoolean()) {
	        // frame_cropping_flag
	        frameCropLeftOffset = this.readUEG();
	        frameCropRightOffset = this.readUEG();
	        frameCropTopOffset = this.readUEG();
	        frameCropBottomOffset = this.readUEG();
	      }
	      if (this.readBoolean()) {
	        // vui_parameters_present_flag
	        if (this.readBoolean()) {
	          // aspect_ratio_info_present_flag
	          var sarRatio = undefined;
	          var aspectRatioIdc = this.readUByte();
	          switch (aspectRatioIdc) {
	            case 1:
	              sarRatio = [1, 1];break;
	            case 2:
	              sarRatio = [12, 11];break;
	            case 3:
	              sarRatio = [10, 11];break;
	            case 4:
	              sarRatio = [16, 11];break;
	            case 5:
	              sarRatio = [40, 33];break;
	            case 6:
	              sarRatio = [24, 11];break;
	            case 7:
	              sarRatio = [20, 11];break;
	            case 8:
	              sarRatio = [32, 11];break;
	            case 9:
	              sarRatio = [80, 33];break;
	            case 10:
	              sarRatio = [18, 11];break;
	            case 11:
	              sarRatio = [15, 11];break;
	            case 12:
	              sarRatio = [64, 33];break;
	            case 13:
	              sarRatio = [160, 99];break;
	            case 14:
	              sarRatio = [4, 3];break;
	            case 15:
	              sarRatio = [3, 2];break;
	            case 16:
	              sarRatio = [2, 1];break;
	            case 255:
	              {
	                sarRatio = [this.readUByte() << 8 | this.readUByte(), this.readUByte() << 8 | this.readUByte()];
	                break;
	              }
	          }
	          if (sarRatio) {
	            sarScale = sarRatio[0] / sarRatio[1];
	          }
	        }
	      }
	      return {
	        width: Math.ceil(((picWidthInMbsMinus1 + 1) * 16 - frameCropLeftOffset * 2 - frameCropRightOffset * 2) * sarScale),
	        height: (2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16 - (frameMbsOnlyFlag ? 2 : 4) * (frameCropTopOffset + frameCropBottomOffset)
	      };
	    }
	  }, {
	    key: 'readSliceType',
	    value: function readSliceType() {
	      // skip NALu type
	      this.readUByte();
	      // discard first_mb_in_slice
	      this.readUEG();
	      // return slice_type
	      return this.readUEG();
	    }
	  }]);

	  return ExpGolomb;
	}();

	exports.default = ExpGolomb;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}(); /**
	      * fMP4 remuxer
	     */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(74);

	var _events2 = _interopRequireDefault(_events);

	var _logger = __webpack_require__(83);

	var _mp4Generator = __webpack_require__(93);

	var _mp4Generator2 = _interopRequireDefault(_mp4Generator);

	var _errors = __webpack_require__(75);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var MP4Remuxer = function () {
	  function MP4Remuxer(observer) {
	    _classCallCheck(this, MP4Remuxer);

	    this.observer = observer;
	    this.ISGenerated = false;
	    this.PES2MP4SCALEFACTOR = 4;
	    this.PES_TIMESCALE = 90000;
	    this.MP4_TIMESCALE = this.PES_TIMESCALE / this.PES2MP4SCALEFACTOR;
	  }

	  _createClass(MP4Remuxer, [{
	    key: 'destroy',
	    value: function destroy() {}
	  }, {
	    key: 'insertDiscontinuity',
	    value: function insertDiscontinuity() {
	      this._initPTS = this._initDTS = this.nextAacPts = this.nextAvcDts = undefined;
	    }
	  }, {
	    key: 'switchLevel',
	    value: function switchLevel() {
	      this.ISGenerated = false;
	    }
	  }, {
	    key: 'remux',
	    value: function remux(audioTrack, videoTrack, id3Track, textTrack, timeOffset, contiguous) {
	      // generate Init Segment if needed
	      if (!this.ISGenerated) {
	        this.generateIS(audioTrack, videoTrack, timeOffset);
	      }
	      //logger.log('nb AVC samples:' + videoTrack.samples.length);
	      if (videoTrack.samples.length) {
	        this.remuxVideo(videoTrack, timeOffset, contiguous);
	      }
	      //logger.log('nb AAC samples:' + audioTrack.samples.length);
	      if (audioTrack.samples.length) {
	        this.remuxAudio(audioTrack, timeOffset, contiguous);
	      }
	      //logger.log('nb ID3 samples:' + audioTrack.samples.length);
	      if (id3Track.samples.length) {
	        this.remuxID3(id3Track, timeOffset);
	      }
	      //logger.log('nb ID3 samples:' + audioTrack.samples.length);
	      if (textTrack.samples.length) {
	        this.remuxText(textTrack, timeOffset);
	      }
	      //notify end of parsing
	      this.observer.trigger(_events2.default.FRAG_PARSED);
	    }
	  }, {
	    key: 'generateIS',
	    value: function generateIS(audioTrack, videoTrack, timeOffset) {
	      var observer = this.observer,
	          audioSamples = audioTrack.samples,
	          videoSamples = videoTrack.samples,
	          pesTimeScale = this.PES_TIMESCALE,
	          tracks = {},
	          data = { tracks: tracks, unique: false },
	          computePTSDTS = this._initPTS === undefined,
	          initPTS,
	          initDTS;

	      if (computePTSDTS) {
	        initPTS = initDTS = Infinity;
	      }

	      if (audioTrack.config && audioSamples.length) {
	        tracks.audio = {
	          container: 'audio/mp4',
	          codec: audioTrack.codec,
	          initSegment: _mp4Generator2.default.initSegment([audioTrack]),
	          metadata: {
	            channelCount: audioTrack.channelCount
	          }
	        };
	        if (computePTSDTS) {
	          // remember first PTS of this demuxing context. for audio, PTS + DTS ...
	          initPTS = initDTS = audioSamples[0].pts - pesTimeScale * timeOffset;
	        }
	      }

	      if (videoTrack.sps && videoTrack.pps && videoSamples.length) {
	        tracks.video = {
	          container: 'video/mp4',
	          codec: videoTrack.codec,
	          initSegment: _mp4Generator2.default.initSegment([videoTrack]),
	          metadata: {
	            width: videoTrack.width,
	            height: videoTrack.height
	          }
	        };
	        if (computePTSDTS) {
	          initPTS = Math.min(initPTS, videoSamples[0].pts - pesTimeScale * timeOffset);
	          initDTS = Math.min(initDTS, videoSamples[0].dts - pesTimeScale * timeOffset);
	        }
	      }

	      if (!Object.keys(tracks)) {
	        observer.trigger(_events2.default.ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.FRAG_PARSING_ERROR, fatal: false, reason: 'no audio/video samples found' });
	      } else {
	        observer.trigger(_events2.default.FRAG_PARSING_INIT_SEGMENT, data);
	        this.ISGenerated = true;
	        if (computePTSDTS) {
	          this._initPTS = initPTS;
	          this._initDTS = initDTS;
	        }
	      }
	    }
	  }, {
	    key: 'remuxVideo',
	    value: function remuxVideo(track, timeOffset, contiguous) {
	      var view,
	          offset = 8,
	          pesTimeScale = this.PES_TIMESCALE,
	          pes2mp4ScaleFactor = this.PES2MP4SCALEFACTOR,
	          avcSample,
	          mp4Sample,
	          mp4SampleLength,
	          unit,
	          mdat,
	          moof,
	          firstPTS,
	          firstDTS,
	          lastDTS,
	          pts,
	          dts,
	          ptsnorm,
	          dtsnorm,
	          flags,
	          samples = [];
	      /* concatenate the video data and construct the mdat in place
	        (need 8 more bytes to fill length and mpdat type) */
	      mdat = new Uint8Array(track.len + 4 * track.nbNalu + 8);
	      view = new DataView(mdat.buffer);
	      view.setUint32(0, mdat.byteLength);
	      mdat.set(_mp4Generator2.default.types.mdat, 4);
	      while (track.samples.length) {
	        avcSample = track.samples.shift();
	        mp4SampleLength = 0;
	        // convert NALU bitstream to MP4 format (prepend NALU with size field)
	        while (avcSample.units.units.length) {
	          unit = avcSample.units.units.shift();
	          view.setUint32(offset, unit.data.byteLength);
	          offset += 4;
	          mdat.set(unit.data, offset);
	          offset += unit.data.byteLength;
	          mp4SampleLength += 4 + unit.data.byteLength;
	        }
	        pts = avcSample.pts - this._initDTS;
	        dts = avcSample.dts - this._initDTS;
	        // ensure DTS is not bigger than PTS
	        dts = Math.min(pts, dts);
	        //logger.log(`Video/PTS/DTS:${Math.round(pts/90)}/${Math.round(dts/90)}`);
	        // if not first AVC sample of video track, normalize PTS/DTS with previous sample value
	        // and ensure that sample duration is positive
	        if (lastDTS !== undefined) {
	          ptsnorm = this._PTSNormalize(pts, lastDTS);
	          dtsnorm = this._PTSNormalize(dts, lastDTS);
	          var sampleDuration = (dtsnorm - lastDTS) / pes2mp4ScaleFactor;
	          if (sampleDuration <= 0) {
	            _logger.logger.log('invalid sample duration at PTS/DTS: ' + avcSample.pts + '/' + avcSample.dts + ':' + sampleDuration);
	            sampleDuration = 1;
	          }
	          mp4Sample.duration = sampleDuration;
	        } else {
	          var nextAvcDts = this.nextAvcDts,
	              delta;
	          // first AVC sample of video track, normalize PTS/DTS
	          ptsnorm = this._PTSNormalize(pts, nextAvcDts);
	          dtsnorm = this._PTSNormalize(dts, nextAvcDts);
	          delta = Math.round((dtsnorm - nextAvcDts) / 90);
	          // if fragment are contiguous, or delta less than 600ms, ensure there is no overlap/hole between fragments
	          if (contiguous || Math.abs(delta) < 600) {
	            if (delta) {
	              if (delta > 1) {
	                _logger.logger.log('AVC:' + delta + ' ms hole between fragments detected,filling it');
	              } else if (delta < -1) {
	                _logger.logger.log('AVC:' + -delta + ' ms overlapping between fragments detected');
	              }
	              // set DTS to next DTS
	              dtsnorm = nextAvcDts;
	              // offset PTS as well, ensure that PTS is smaller or equal than new DTS
	              ptsnorm = Math.max(ptsnorm - delta, dtsnorm);
	              _logger.logger.log('Video/PTS/DTS adjusted: ' + ptsnorm + '/' + dtsnorm + ',delta:' + delta);
	            }
	          }
	          // remember first PTS of our avcSamples, ensure value is positive
	          firstPTS = Math.max(0, ptsnorm);
	          firstDTS = Math.max(0, dtsnorm);
	        }
	        //console.log('PTS/DTS/initDTS/normPTS/normDTS/relative PTS : ${avcSample.pts}/${avcSample.dts}/${this._initDTS}/${ptsnorm}/${dtsnorm}/${(avcSample.pts/4294967296).toFixed(3)}');
	        mp4Sample = {
	          size: mp4SampleLength,
	          duration: 0,
	          cts: (ptsnorm - dtsnorm) / pes2mp4ScaleFactor,
	          flags: {
	            isLeading: 0,
	            isDependedOn: 0,
	            hasRedundancy: 0,
	            degradPrio: 0
	          }
	        };
	        flags = mp4Sample.flags;
	        if (avcSample.key === true) {
	          // the current sample is a key frame
	          flags.dependsOn = 2;
	          flags.isNonSync = 0;
	        } else {
	          flags.dependsOn = 1;
	          flags.isNonSync = 1;
	        }
	        samples.push(mp4Sample);
	        lastDTS = dtsnorm;
	      }
	      var lastSampleDuration = 0;
	      if (samples.length >= 2) {
	        lastSampleDuration = samples[samples.length - 2].duration;
	        mp4Sample.duration = lastSampleDuration;
	      }
	      // next AVC sample DTS should be equal to last sample DTS + last sample duration
	      this.nextAvcDts = dtsnorm + lastSampleDuration * pes2mp4ScaleFactor;
	      track.len = 0;
	      track.nbNalu = 0;
	      if (samples.length && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
	        flags = samples[0].flags;
	        // chrome workaround, mark first sample as being a Random Access Point to avoid sourcebuffer append issue
	        // https://code.google.com/p/chromium/issues/detail?id=229412
	        flags.dependsOn = 2;
	        flags.isNonSync = 0;
	      }
	      track.samples = samples;
	      moof = _mp4Generator2.default.moof(track.sequenceNumber++, firstDTS / pes2mp4ScaleFactor, track);
	      track.samples = [];
	      this.observer.trigger(_events2.default.FRAG_PARSING_DATA, {
	        data1: moof,
	        data2: mdat,
	        startPTS: firstPTS / pesTimeScale,
	        endPTS: (ptsnorm + pes2mp4ScaleFactor * lastSampleDuration) / pesTimeScale,
	        startDTS: firstDTS / pesTimeScale,
	        endDTS: this.nextAvcDts / pesTimeScale,
	        type: 'video',
	        nb: samples.length
	      });
	    }
	  }, {
	    key: 'remuxAudio',
	    value: function remuxAudio(track, timeOffset, contiguous) {
	      var view,
	          offset = 8,
	          pesTimeScale = this.PES_TIMESCALE,
	          mp4timeScale = track.timescale,
	          pes2mp4ScaleFactor = pesTimeScale / mp4timeScale,
	          aacSample,
	          mp4Sample,
	          unit,
	          mdat,
	          moof,
	          firstPTS,
	          firstDTS,
	          lastDTS,
	          pts,
	          dts,
	          ptsnorm,
	          dtsnorm,
	          samples = [],
	          samples0 = [];

	      track.samples.sort(function (a, b) {
	        return a.pts - b.pts;
	      });
	      samples0 = track.samples;

	      while (samples0.length) {
	        aacSample = samples0.shift();
	        unit = aacSample.unit;
	        pts = aacSample.pts - this._initDTS;
	        dts = aacSample.dts - this._initDTS;
	        //logger.log(`Audio/PTS:${Math.round(pts/90)}`);
	        // if not first sample
	        if (lastDTS !== undefined) {
	          ptsnorm = this._PTSNormalize(pts, lastDTS);
	          dtsnorm = this._PTSNormalize(dts, lastDTS);
	          // let's compute sample duration.
	          // there should be 1024 audio samples in one AAC frame
	          mp4Sample.duration = (dtsnorm - lastDTS) / pes2mp4ScaleFactor;
	          if (Math.abs(mp4Sample.duration - 1024) > 10) {
	            // not expected to happen ...
	            _logger.logger.log('invalid AAC sample duration at PTS ' + Math.round(pts / 90) + ',should be 1024,found :' + Math.round(mp4Sample.duration));
	          }
	          mp4Sample.duration = 1024;
	          dtsnorm = 1024 * pes2mp4ScaleFactor + lastDTS;
	        } else {
	          var nextAacPts = this.nextAacPts,
	              delta;
	          ptsnorm = this._PTSNormalize(pts, nextAacPts);
	          dtsnorm = this._PTSNormalize(dts, nextAacPts);
	          delta = Math.round(1000 * (ptsnorm - nextAacPts) / pesTimeScale);
	          // if fragment are contiguous, or delta less than 600ms, ensure there is no overlap/hole between fragments
	          if (contiguous || Math.abs(delta) < 600) {
	            // log delta
	            if (delta) {
	              if (delta > 0) {
	                _logger.logger.log(delta + ' ms hole between AAC samples detected,filling it');
	                // if we have frame overlap, overlapping for more than half a frame duraion
	              } else if (delta < -12) {
	                  // drop overlapping audio frames... browser will deal with it
	                  _logger.logger.log(-delta + ' ms overlapping between AAC samples detected, drop frame');
	                  track.len -= unit.byteLength;
	                  continue;
	                }
	              // set DTS to next DTS
	              ptsnorm = dtsnorm = nextAacPts;
	            }
	          }
	          // remember first PTS of our aacSamples, ensure value is positive
	          firstPTS = Math.max(0, ptsnorm);
	          firstDTS = Math.max(0, dtsnorm);
	          if (track.len > 0) {
	            /* concatenate the audio data and construct the mdat in place
	              (need 8 more bytes to fill length and mdat type) */
	            mdat = new Uint8Array(track.len + 8);
	            view = new DataView(mdat.buffer);
	            view.setUint32(0, mdat.byteLength);
	            mdat.set(_mp4Generator2.default.types.mdat, 4);
	          } else {
	            // no audio samples
	            return;
	          }
	        }
	        mdat.set(unit, offset);
	        offset += unit.byteLength;
	        //console.log('PTS/DTS/initDTS/normPTS/normDTS/relative PTS : ${aacSample.pts}/${aacSample.dts}/${this._initDTS}/${ptsnorm}/${dtsnorm}/${(aacSample.pts/4294967296).toFixed(3)}');
	        mp4Sample = {
	          size: unit.byteLength,
	          cts: 0,
	          duration: 0,
	          flags: {
	            isLeading: 0,
	            isDependedOn: 0,
	            hasRedundancy: 0,
	            degradPrio: 0,
	            dependsOn: 1
	          }
	        };
	        samples.push(mp4Sample);
	        lastDTS = dtsnorm;
	      }
	      var lastSampleDuration = 0;
	      var nbSamples = samples.length;
	      //set last sample duration as being identical to previous sample
	      if (nbSamples >= 2) {
	        lastSampleDuration = samples[nbSamples - 2].duration;
	        mp4Sample.duration = lastSampleDuration;
	      }
	      if (nbSamples) {
	        // next aac sample PTS should be equal to last sample PTS + duration
	        this.nextAacPts = ptsnorm + pes2mp4ScaleFactor * lastSampleDuration;
	        //logger.log('Audio/PTS/PTSend:' + aacSample.pts.toFixed(0) + '/' + this.nextAacDts.toFixed(0));
	        track.len = 0;
	        track.samples = samples;
	        moof = _mp4Generator2.default.moof(track.sequenceNumber++, firstDTS / pes2mp4ScaleFactor, track);
	        track.samples = [];
	        this.observer.trigger(_events2.default.FRAG_PARSING_DATA, {
	          data1: moof,
	          data2: mdat,
	          startPTS: firstPTS / pesTimeScale,
	          endPTS: this.nextAacPts / pesTimeScale,
	          startDTS: firstDTS / pesTimeScale,
	          endDTS: (dtsnorm + pes2mp4ScaleFactor * lastSampleDuration) / pesTimeScale,
	          type: 'audio',
	          nb: nbSamples
	        });
	      }
	    }
	  }, {
	    key: 'remuxID3',
	    value: function remuxID3(track, timeOffset) {
	      var length = track.samples.length,
	          sample;
	      // consume samples
	      if (length) {
	        for (var index = 0; index < length; index++) {
	          sample = track.samples[index];
	          // setting id3 pts, dts to relative time
	          // using this._initPTS and this._initDTS to calculate relative time
	          sample.pts = (sample.pts - this._initPTS) / this.PES_TIMESCALE;
	          sample.dts = (sample.dts - this._initDTS) / this.PES_TIMESCALE;
	        }
	        this.observer.trigger(_events2.default.FRAG_PARSING_METADATA, {
	          samples: track.samples
	        });
	      }

	      track.samples = [];
	      timeOffset = timeOffset;
	    }
	  }, {
	    key: 'remuxText',
	    value: function remuxText(track, timeOffset) {
	      track.samples.sort(function (a, b) {
	        return a.pts - b.pts;
	      });

	      var length = track.samples.length,
	          sample;
	      // consume samples
	      if (length) {
	        for (var index = 0; index < length; index++) {
	          sample = track.samples[index];
	          // setting text pts, dts to relative time
	          // using this._initPTS and this._initDTS to calculate relative time
	          sample.pts = (sample.pts - this._initPTS) / this.PES_TIMESCALE;
	        }
	        this.observer.trigger(_events2.default.FRAG_PARSING_USERDATA, {
	          samples: track.samples
	        });
	      }

	      track.samples = [];
	      timeOffset = timeOffset;
	    }
	  }, {
	    key: '_PTSNormalize',
	    value: function _PTSNormalize(value, reference) {
	      var offset;
	      if (reference === undefined) {
	        return value;
	      }
	      if (reference < value) {
	        // - 2^33
	        offset = -8589934592;
	      } else {
	        // + 2^33
	        offset = 8589934592;
	      }
	      /* PTS is 33bit (from 0 to 2^33 -1)
	        if diff between value and reference is bigger than half of the amplitude (2^32) then it means that
	        PTS looping occured. fill the gap */
	      while (Math.abs(value - reference) > 4294967296) {
	        value += offset;
	      }
	      return value;
	    }
	  }, {
	    key: 'passthrough',
	    get: function get() {
	      return false;
	    }
	  }, {
	    key: 'timescale',
	    get: function get() {
	      return this.MP4_TIMESCALE;
	    }
	  }]);

	  return MP4Remuxer;
	}();

	exports.default = MP4Remuxer;

/***/ },
/* 93 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	/**
	 * Generate MP4 Box
	*/

	//import Hex from '../utils/hex';

	var MP4 = function () {
	  function MP4() {
	    _classCallCheck(this, MP4);
	  }

	  _createClass(MP4, null, [{
	    key: 'init',
	    value: function init() {
	      MP4.types = {
	        avc1: [], // codingname
	        avcC: [],
	        btrt: [],
	        dinf: [],
	        dref: [],
	        esds: [],
	        ftyp: [],
	        hdlr: [],
	        mdat: [],
	        mdhd: [],
	        mdia: [],
	        mfhd: [],
	        minf: [],
	        moof: [],
	        moov: [],
	        mp4a: [],
	        mvex: [],
	        mvhd: [],
	        sdtp: [],
	        stbl: [],
	        stco: [],
	        stsc: [],
	        stsd: [],
	        stsz: [],
	        stts: [],
	        tfdt: [],
	        tfhd: [],
	        traf: [],
	        trak: [],
	        trun: [],
	        trex: [],
	        tkhd: [],
	        vmhd: [],
	        smhd: []
	      };

	      var i;
	      for (i in MP4.types) {
	        if (MP4.types.hasOwnProperty(i)) {
	          MP4.types[i] = [i.charCodeAt(0), i.charCodeAt(1), i.charCodeAt(2), i.charCodeAt(3)];
	        }
	      }

	      var videoHdlr = new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, 0x00, 0x00, // pre_defined
	      0x76, 0x69, 0x64, 0x65, // handler_type: 'vide'
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x56, 0x69, 0x64, 0x65, 0x6f, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'VideoHandler'
	      ]);

	      var audioHdlr = new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, 0x00, 0x00, // pre_defined
	      0x73, 0x6f, 0x75, 0x6e, // handler_type: 'soun'
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x53, 0x6f, 0x75, 0x6e, 0x64, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'SoundHandler'
	      ]);

	      MP4.HDLR_TYPES = {
	        'video': videoHdlr,
	        'audio': audioHdlr
	      };

	      var dref = new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, 0x00, 0x01, // entry_count
	      0x00, 0x00, 0x00, 0x0c, // entry_size
	      0x75, 0x72, 0x6c, 0x20, // 'url' type
	      0x00, // version 0
	      0x00, 0x00, 0x01 // entry_flags
	      ]);

	      var stco = new Uint8Array([0x00, // version
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, 0x00, 0x00 // entry_count
	      ]);

	      MP4.STTS = MP4.STSC = MP4.STCO = stco;

	      MP4.STSZ = new Uint8Array([0x00, // version
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, 0x00, 0x00, // sample_size
	      0x00, 0x00, 0x00, 0x00]);
	      // sample_count
	      MP4.VMHD = new Uint8Array([0x00, // version
	      0x00, 0x00, 0x01, // flags
	      0x00, 0x00, // graphicsmode
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // opcolor
	      ]);
	      MP4.SMHD = new Uint8Array([0x00, // version
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, // balance
	      0x00, 0x00 // reserved
	      ]);

	      MP4.STSD = new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, 0x00, 0x01]); // entry_count

	      var majorBrand = new Uint8Array([105, 115, 111, 109]); // isom
	      var avc1Brand = new Uint8Array([97, 118, 99, 49]); // avc1
	      var minorVersion = new Uint8Array([0, 0, 0, 1]);

	      MP4.FTYP = MP4.box(MP4.types.ftyp, majorBrand, minorVersion, majorBrand, avc1Brand);
	      MP4.DINF = MP4.box(MP4.types.dinf, MP4.box(MP4.types.dref, dref));
	    }
	  }, {
	    key: 'box',
	    value: function box(type) {
	      var payload = Array.prototype.slice.call(arguments, 1),
	          size = 8,
	          i = payload.length,
	          len = i,
	          result;
	      // calculate the total size we need to allocate
	      while (i--) {
	        size += payload[i].byteLength;
	      }
	      result = new Uint8Array(size);
	      result[0] = size >> 24 & 0xff;
	      result[1] = size >> 16 & 0xff;
	      result[2] = size >> 8 & 0xff;
	      result[3] = size & 0xff;
	      result.set(type, 4);
	      // copy the payload into the result
	      for (i = 0, size = 8; i < len; i++) {
	        // copy payload[i] array @ offset size
	        result.set(payload[i], size);
	        size += payload[i].byteLength;
	      }
	      return result;
	    }
	  }, {
	    key: 'hdlr',
	    value: function hdlr(type) {
	      return MP4.box(MP4.types.hdlr, MP4.HDLR_TYPES[type]);
	    }
	  }, {
	    key: 'mdat',
	    value: function mdat(data) {
	      return MP4.box(MP4.types.mdat, data);
	    }
	  }, {
	    key: 'mdhd',
	    value: function mdhd(timescale, duration) {
	      return MP4.box(MP4.types.mdhd, new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, 0x00, 0x02, // creation_time
	      0x00, 0x00, 0x00, 0x03, // modification_time
	      timescale >> 24 & 0xFF, timescale >> 16 & 0xFF, timescale >> 8 & 0xFF, timescale & 0xFF, // timescale
	      duration >> 24, duration >> 16 & 0xFF, duration >> 8 & 0xFF, duration & 0xFF, // duration
	      0x55, 0xc4, // 'und' language (undetermined)
	      0x00, 0x00]));
	    }
	  }, {
	    key: 'mdia',
	    value: function mdia(track) {
	      return MP4.box(MP4.types.mdia, MP4.mdhd(track.timescale, track.duration), MP4.hdlr(track.type), MP4.minf(track));
	    }
	  }, {
	    key: 'mfhd',
	    value: function mfhd(sequenceNumber) {
	      return MP4.box(MP4.types.mfhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, // flags
	      sequenceNumber >> 24, sequenceNumber >> 16 & 0xFF, sequenceNumber >> 8 & 0xFF, sequenceNumber & 0xFF]));
	    }
	  }, {
	    key: 'minf',
	    // sequence_number
	    value: function minf(track) {
	      if (track.type === 'audio') {
	        return MP4.box(MP4.types.minf, MP4.box(MP4.types.smhd, MP4.SMHD), MP4.DINF, MP4.stbl(track));
	      } else {
	        return MP4.box(MP4.types.minf, MP4.box(MP4.types.vmhd, MP4.VMHD), MP4.DINF, MP4.stbl(track));
	      }
	    }
	  }, {
	    key: 'moof',
	    value: function moof(sn, baseMediaDecodeTime, track) {
	      return MP4.box(MP4.types.moof, MP4.mfhd(sn), MP4.traf(track, baseMediaDecodeTime));
	    }
	    /**
	     * @param tracks... (optional) {array} the tracks associated with this movie
	     */

	  }, {
	    key: 'moov',
	    value: function moov(tracks) {
	      var i = tracks.length,
	          boxes = [];

	      while (i--) {
	        boxes[i] = MP4.trak(tracks[i]);
	      }

	      return MP4.box.apply(null, [MP4.types.moov, MP4.mvhd(tracks[0].timescale, tracks[0].duration)].concat(boxes).concat(MP4.mvex(tracks)));
	    }
	  }, {
	    key: 'mvex',
	    value: function mvex(tracks) {
	      var i = tracks.length,
	          boxes = [];

	      while (i--) {
	        boxes[i] = MP4.trex(tracks[i]);
	      }
	      return MP4.box.apply(null, [MP4.types.mvex].concat(boxes));
	    }
	  }, {
	    key: 'mvhd',
	    value: function mvhd(timescale, duration) {
	      var bytes = new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, 0x00, 0x01, // creation_time
	      0x00, 0x00, 0x00, 0x02, // modification_time
	      timescale >> 24 & 0xFF, timescale >> 16 & 0xFF, timescale >> 8 & 0xFF, timescale & 0xFF, // timescale
	      duration >> 24 & 0xFF, duration >> 16 & 0xFF, duration >> 8 & 0xFF, duration & 0xFF, // duration
	      0x00, 0x01, 0x00, 0x00, // 1.0 rate
	      0x01, 0x00, // 1.0 volume
	      0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
	      0xff, 0xff, 0xff, 0xff // next_track_ID
	      ]);
	      return MP4.box(MP4.types.mvhd, bytes);
	    }
	  }, {
	    key: 'sdtp',
	    value: function sdtp(track) {
	      var samples = track.samples || [],
	          bytes = new Uint8Array(4 + samples.length),
	          flags,
	          i;
	      // leave the full box header (4 bytes) all zero
	      // write the sample table
	      for (i = 0; i < samples.length; i++) {
	        flags = samples[i].flags;
	        bytes[i + 4] = flags.dependsOn << 4 | flags.isDependedOn << 2 | flags.hasRedundancy;
	      }

	      return MP4.box(MP4.types.sdtp, bytes);
	    }
	  }, {
	    key: 'stbl',
	    value: function stbl(track) {
	      return MP4.box(MP4.types.stbl, MP4.stsd(track), MP4.box(MP4.types.stts, MP4.STTS), MP4.box(MP4.types.stsc, MP4.STSC), MP4.box(MP4.types.stsz, MP4.STSZ), MP4.box(MP4.types.stco, MP4.STCO));
	    }
	  }, {
	    key: 'avc1',
	    value: function avc1(track) {
	      var sps = [],
	          pps = [],
	          i,
	          data,
	          len;
	      // assemble the SPSs

	      for (i = 0; i < track.sps.length; i++) {
	        data = track.sps[i];
	        len = data.byteLength;
	        sps.push(len >>> 8 & 0xFF);
	        sps.push(len & 0xFF);
	        sps = sps.concat(Array.prototype.slice.call(data)); // SPS
	      }

	      // assemble the PPSs
	      for (i = 0; i < track.pps.length; i++) {
	        data = track.pps[i];
	        len = data.byteLength;
	        pps.push(len >>> 8 & 0xFF);
	        pps.push(len & 0xFF);
	        pps = pps.concat(Array.prototype.slice.call(data));
	      }

	      var avcc = MP4.box(MP4.types.avcC, new Uint8Array([0x01, // version
	      sps[3], // profile
	      sps[4], // profile compat
	      sps[5], // level
	      0xfc | 3, // lengthSizeMinusOne, hard-coded to 4 bytes
	      0xE0 | track.sps.length // 3bit reserved (111) + numOfSequenceParameterSets
	      ].concat(sps).concat([track.pps.length // numOfPictureParameterSets
	      ]).concat(pps))),

	      // "PPS"
	      width = track.width,
	          height = track.height;
	      //console.log('avcc:' + Hex.hexDump(avcc));
	      return MP4.box(MP4.types.avc1, new Uint8Array([0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, // reserved
	      0x00, 0x01, // data_reference_index
	      0x00, 0x00, // pre_defined
	      0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
	      width >> 8 & 0xFF, width & 0xff, // width
	      height >> 8 & 0xFF, height & 0xff, // height
	      0x00, 0x48, 0x00, 0x00, // horizresolution
	      0x00, 0x48, 0x00, 0x00, // vertresolution
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x01, // frame_count
	      0x12, 0x64, 0x61, 0x69, 0x6C, //dailymotion/hls.js
	      0x79, 0x6D, 0x6F, 0x74, 0x69, 0x6F, 0x6E, 0x2F, 0x68, 0x6C, 0x73, 0x2E, 0x6A, 0x73, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // compressorname
	      0x00, 0x18, // depth = 24
	      0x11, 0x11]), // pre_defined = -1
	      avcc, MP4.box(MP4.types.btrt, new Uint8Array([0x00, 0x1c, 0x9c, 0x80, // bufferSizeDB
	      0x00, 0x2d, 0xc6, 0xc0, // maxBitrate
	      0x00, 0x2d, 0xc6, 0xc0])) // avgBitrate
	      );
	    }
	  }, {
	    key: 'esds',
	    value: function esds(track) {
	      var configlen = track.config.length;
	      return new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags

	      0x03, // descriptor_type
	      0x17 + configlen, // length
	      0x00, 0x01, //es_id
	      0x00, // stream_priority

	      0x04, // descriptor_type
	      0x0f + configlen, // length
	      0x40, //codec : mpeg4_audio
	      0x15, // stream_type
	      0x00, 0x00, 0x00, // buffer_size
	      0x00, 0x00, 0x00, 0x00, // maxBitrate
	      0x00, 0x00, 0x00, 0x00, // avgBitrate

	      0x05 // descriptor_type
	      ].concat([configlen]).concat(track.config).concat([0x06, 0x01, 0x02])); // GASpecificConfig)); // length + audio config descriptor
	    }
	  }, {
	    key: 'mp4a',
	    value: function mp4a(track) {
	      var audiosamplerate = track.audiosamplerate;
	      return MP4.box(MP4.types.mp4a, new Uint8Array([0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, // reserved
	      0x00, 0x01, // data_reference_index
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, track.channelCount, // channelcount
	      0x00, 0x10, // sampleSize:16bits
	      0x00, 0x00, 0x00, 0x00, // reserved2
	      audiosamplerate >> 8 & 0xFF, audiosamplerate & 0xff, //
	      0x00, 0x00]), MP4.box(MP4.types.esds, MP4.esds(track)));
	    }
	  }, {
	    key: 'stsd',
	    value: function stsd(track) {
	      if (track.type === 'audio') {
	        return MP4.box(MP4.types.stsd, MP4.STSD, MP4.mp4a(track));
	      } else {
	        return MP4.box(MP4.types.stsd, MP4.STSD, MP4.avc1(track));
	      }
	    }
	  }, {
	    key: 'tkhd',
	    value: function tkhd(track) {
	      var id = track.id,
	          duration = track.duration,
	          width = track.width,
	          height = track.height;
	      return MP4.box(MP4.types.tkhd, new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x07, // flags
	      0x00, 0x00, 0x00, 0x00, // creation_time
	      0x00, 0x00, 0x00, 0x00, // modification_time
	      id >> 24 & 0xFF, id >> 16 & 0xFF, id >> 8 & 0xFF, id & 0xFF, // track_ID
	      0x00, 0x00, 0x00, 0x00, // reserved
	      duration >> 24, duration >> 16 & 0xFF, duration >> 8 & 0xFF, duration & 0xFF, // duration
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, // layer
	      0x00, 0x00, // alternate_group
	      0x00, 0x00, // non-audio track volume
	      0x00, 0x00, // reserved
	      0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
	      width >> 8 & 0xFF, width & 0xFF, 0x00, 0x00, // width
	      height >> 8 & 0xFF, height & 0xFF, 0x00, 0x00 // height
	      ]));
	    }
	  }, {
	    key: 'traf',
	    value: function traf(track, baseMediaDecodeTime) {
	      var sampleDependencyTable = MP4.sdtp(track),
	          id = track.id;
	      return MP4.box(MP4.types.traf, MP4.box(MP4.types.tfhd, new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      id >> 24, id >> 16 & 0XFF, id >> 8 & 0XFF, id & 0xFF])), // track_ID
	      MP4.box(MP4.types.tfdt, new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      baseMediaDecodeTime >> 24, baseMediaDecodeTime >> 16 & 0XFF, baseMediaDecodeTime >> 8 & 0XFF, baseMediaDecodeTime & 0xFF])), // baseMediaDecodeTime
	      MP4.trun(track, sampleDependencyTable.length + 16 + // tfhd
	      16 + // tfdt
	      8 + // traf header
	      16 + // mfhd
	      8 + // moof header
	      8), // mdat header
	      sampleDependencyTable);
	    }

	    /**
	     * Generate a track box.
	     * @param track {object} a track definition
	     * @return {Uint8Array} the track box
	     */

	  }, {
	    key: 'trak',
	    value: function trak(track) {
	      track.duration = track.duration || 0xffffffff;
	      return MP4.box(MP4.types.trak, MP4.tkhd(track), MP4.mdia(track));
	    }
	  }, {
	    key: 'trex',
	    value: function trex(track) {
	      var id = track.id;
	      return MP4.box(MP4.types.trex, new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      id >> 24, id >> 16 & 0XFF, id >> 8 & 0XFF, id & 0xFF, // track_ID
	      0x00, 0x00, 0x00, 0x01, // default_sample_description_index
	      0x00, 0x00, 0x00, 0x00, // default_sample_duration
	      0x00, 0x00, 0x00, 0x00, // default_sample_size
	      0x00, 0x01, 0x00, 0x01 // default_sample_flags
	      ]));
	    }
	  }, {
	    key: 'trun',
	    value: function trun(track, offset) {
	      var samples = track.samples || [],
	          len = samples.length,
	          arraylen = 12 + 16 * len,
	          array = new Uint8Array(arraylen),
	          i,
	          sample,
	          duration,
	          size,
	          flags,
	          cts;
	      offset += 8 + arraylen;
	      array.set([0x00, // version 0
	      0x00, 0x0f, 0x01, // flags
	      len >>> 24 & 0xFF, len >>> 16 & 0xFF, len >>> 8 & 0xFF, len & 0xFF, // sample_count
	      offset >>> 24 & 0xFF, offset >>> 16 & 0xFF, offset >>> 8 & 0xFF, offset & 0xFF // data_offset
	      ], 0);
	      for (i = 0; i < len; i++) {
	        sample = samples[i];
	        duration = sample.duration;
	        size = sample.size;
	        flags = sample.flags;
	        cts = sample.cts;
	        array.set([duration >>> 24 & 0xFF, duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, // sample_duration
	        size >>> 24 & 0xFF, size >>> 16 & 0xFF, size >>> 8 & 0xFF, size & 0xFF, // sample_size
	        flags.isLeading << 2 | flags.dependsOn, flags.isDependedOn << 6 | flags.hasRedundancy << 4 | flags.paddingValue << 1 | flags.isNonSync, flags.degradPrio & 0xF0 << 8, flags.degradPrio & 0x0F, // sample_flags
	        cts >>> 24 & 0xFF, cts >>> 16 & 0xFF, cts >>> 8 & 0xFF, cts & 0xFF // sample_composition_time_offset
	        ], 12 + 16 * i);
	      }
	      return MP4.box(MP4.types.trun, array);
	    }
	  }, {
	    key: 'initSegment',
	    value: function initSegment(tracks) {
	      if (!MP4.types) {
	        MP4.init();
	      }
	      var movie = MP4.moov(tracks),
	          result;
	      result = new Uint8Array(MP4.FTYP.byteLength + movie.byteLength);
	      result.set(MP4.FTYP);
	      result.set(movie, MP4.FTYP.byteLength);
	      return result;
	    }
	  }]);

	  return MP4;
	}();

	exports.default = MP4;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}(); /**
	      * passthrough remuxer
	     */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(74);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var PassThroughRemuxer = function () {
	  function PassThroughRemuxer(observer) {
	    _classCallCheck(this, PassThroughRemuxer);

	    this.observer = observer;
	    this.ISGenerated = false;
	  }

	  _createClass(PassThroughRemuxer, [{
	    key: 'destroy',
	    value: function destroy() {}
	  }, {
	    key: 'insertDiscontinuity',
	    value: function insertDiscontinuity() {}
	  }, {
	    key: 'switchLevel',
	    value: function switchLevel() {
	      this.ISGenerated = false;
	    }
	  }, {
	    key: 'remux',
	    value: function remux(audioTrack, videoTrack, id3Track, textTrack, timeOffset, rawData) {
	      var observer = this.observer;
	      // generate Init Segment if needed
	      if (!this.ISGenerated) {
	        var tracks = {},
	            data = { tracks: tracks, unique: true },
	            track = videoTrack,
	            codec = track.codec;

	        if (codec) {
	          data.tracks.video = {
	            container: track.container,
	            codec: codec,
	            metadata: {
	              width: track.width,
	              height: track.height
	            }
	          };
	        }

	        track = audioTrack;
	        codec = track.codec;
	        if (codec) {
	          data.tracks.audio = {
	            container: track.container,
	            codec: codec,
	            metadata: {
	              channelCount: track.channelCount
	            }
	          };
	        }
	        this.ISGenerated = true;
	        observer.trigger(_events2.default.FRAG_PARSING_INIT_SEGMENT, data);
	      }
	      observer.trigger(_events2.default.FRAG_PARSING_DATA, {
	        data1: rawData,
	        startPTS: timeOffset,
	        startDTS: timeOffset,
	        type: 'audiovideo',
	        nb: 1
	      });
	    }
	  }, {
	    key: 'passthrough',
	    get: function get() {
	      return true;
	    }
	  }, {
	    key: 'timescale',
	    get: function get() {
	      return 0;
	    }
	  }]);

	  return PassThroughRemuxer;
	}();

	exports.default = PassThroughRemuxer;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _demuxerInline = __webpack_require__(86);

	var _demuxerInline2 = _interopRequireDefault(_demuxerInline);

	var _events = __webpack_require__(74);

	var _events2 = _interopRequireDefault(_events);

	var _events3 = __webpack_require__(96);

	var _events4 = _interopRequireDefault(_events3);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	var DemuxerWorker = function DemuxerWorker(self) {
	  // observer setup
	  var observer = new _events4.default();
	  observer.trigger = function trigger(event) {
	    for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      data[_key - 1] = arguments[_key];
	    }

	    observer.emit.apply(observer, [event, event].concat(data));
	  };

	  observer.off = function off(event) {
	    for (var _len2 = arguments.length, data = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      data[_key2 - 1] = arguments[_key2];
	    }

	    observer.removeListener.apply(observer, [event].concat(data));
	  };
	  self.addEventListener('message', function (ev) {
	    var data = ev.data;
	    //console.log('demuxer cmd:' + data.cmd);
	    switch (data.cmd) {
	      case 'init':
	        self.demuxer = new _demuxerInline2.default(observer, data.typeSupported);
	        break;
	      case 'demux':
	        self.demuxer.push(new Uint8Array(data.data), data.audioCodec, data.videoCodec, data.timeOffset, data.cc, data.level, data.sn, data.duration);
	        break;
	      default:
	        break;
	    }
	  });

	  // listen to events triggered by Demuxer
	  observer.on(_events2.default.FRAG_PARSING_INIT_SEGMENT, function (ev, data) {
	    self.postMessage({ event: ev, tracks: data.tracks, unique: data.unique });
	  });

	  observer.on(_events2.default.FRAG_PARSING_DATA, function (ev, data) {
	    var objData = { event: ev, type: data.type, startPTS: data.startPTS, endPTS: data.endPTS, startDTS: data.startDTS, endDTS: data.endDTS, data1: data.data1.buffer, data2: data.data2.buffer, nb: data.nb };
	    // pass data1/data2 as transferable object (no copy)
	    self.postMessage(objData, [objData.data1, objData.data2]);
	  });

	  observer.on(_events2.default.FRAG_PARSED, function (event) {
	    self.postMessage({ event: event });
	  });

	  observer.on(_events2.default.ERROR, function (event, data) {
	    self.postMessage({ event: event, data: data });
	  });

	  observer.on(_events2.default.FRAG_PARSING_METADATA, function (event, data) {
	    var objData = { event: event, samples: data.samples };
	    self.postMessage(objData);
	  });

	  observer.on(_events2.default.FRAG_PARSING_USERDATA, function (event, data) {
	    var objData = { event: event, samples: data.samples };
	    self.postMessage(objData);
	  });
	}; /* demuxer web worker.
	    *  - listen to worker message, and trigger DemuxerInline upon reception of Fragments.
	    *  - provides MP4 Boxes back to main thread using [transferable objects](https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast) in order to minimize message passing overhead.
	    */

	exports.default = DemuxerWorker;

/***/ },
/* 96 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
	EventEmitter.prototype.setMaxListeners = function (n) {
	  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function (type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events) this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler)) return false;

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
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++) {
	      listeners[i].apply(this, args);
	    }
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function (type, listener) {
	  var m;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events) this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function (type, listener) {
	  if (!isFunction(listener)) throw TypeError('listener must be a function');

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
	EventEmitter.prototype.removeListener = function (type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type]) return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener || isFunction(list.listener) && list.listener === listener) {
	    delete this._events[type];
	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0) return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function (type) {
	  var key, listeners;

	  if (!this._events) return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
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
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length) {
	      this.removeListener(type, listeners[listeners.length - 1]);
	    }
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function (type) {
	  var ret;
	  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function (type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function (emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}(); /*
	      * AES128 decryption.
	      */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _aes128Decrypter = __webpack_require__(98);

	var _aes128Decrypter2 = _interopRequireDefault(_aes128Decrypter);

	var _errors = __webpack_require__(75);

	var _logger = __webpack_require__(83);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var Decrypter = function () {
	  function Decrypter(hls) {
	    _classCallCheck(this, Decrypter);

	    this.hls = hls;
	    try {
	      var browserCrypto = window ? window.crypto : crypto;
	      this.subtle = browserCrypto.subtle || browserCrypto.webkitSubtle;
	      this.disableWebCrypto = !this.subtle;
	    } catch (e) {
	      this.disableWebCrypto = true;
	    }
	  }

	  _createClass(Decrypter, [{
	    key: 'destroy',
	    value: function destroy() {}
	  }, {
	    key: 'decrypt',
	    value: function decrypt(data, key, iv, callback) {
	      if (this.disableWebCrypto && this.hls.config.enableSoftwareAES) {
	        this.decryptBySoftware(data, key, iv, callback);
	      } else {
	        this.decryptByWebCrypto(data, key, iv, callback);
	      }
	    }
	  }, {
	    key: 'decryptByWebCrypto',
	    value: function decryptByWebCrypto(data, key, iv, callback) {
	      var _this = this;

	      _logger.logger.log('decrypting by WebCrypto API');

	      this.subtle.importKey('raw', key, { name: 'AES-CBC', length: 128 }, false, ['decrypt']).then(function (importedKey) {
	        _this.subtle.decrypt({ name: 'AES-CBC', iv: iv.buffer }, importedKey, data).then(callback).catch(function (err) {
	          _this.onWebCryptoError(err, data, key, iv, callback);
	        });
	      }).catch(function (err) {
	        _this.onWebCryptoError(err, data, key, iv, callback);
	      });
	    }
	  }, {
	    key: 'decryptBySoftware',
	    value: function decryptBySoftware(data, key8, iv8, callback) {
	      _logger.logger.log('decrypting by JavaScript Implementation');

	      var view = new DataView(key8.buffer);
	      var key = new Uint32Array([view.getUint32(0), view.getUint32(4), view.getUint32(8), view.getUint32(12)]);

	      view = new DataView(iv8.buffer);
	      var iv = new Uint32Array([view.getUint32(0), view.getUint32(4), view.getUint32(8), view.getUint32(12)]);

	      var decrypter = new _aes128Decrypter2.default(key, iv);
	      callback(decrypter.decrypt(data).buffer);
	    }
	  }, {
	    key: 'onWebCryptoError',
	    value: function onWebCryptoError(err, data, key, iv, callback) {
	      if (this.hls.config.enableSoftwareAES) {
	        _logger.logger.log('disabling to use WebCrypto API');
	        this.disableWebCrypto = true;
	        this.decryptBySoftware(data, key, iv, callback);
	      } else {
	        _logger.logger.error('decrypting error : ' + err.message);
	        this.hls.trigger(Event.ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.FRAG_DECRYPT_ERROR, fatal: true, reason: err.message });
	      }
	    }
	  }]);

	  return Decrypter;
	}();

	exports.default = Decrypter;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}(); /*
	      *
	      * This file contains an adaptation of the AES decryption algorithm
	      * from the Standford Javascript Cryptography Library. That work is
	      * covered by the following copyright and permissions notice:
	      *
	      * Copyright 2009-2010 Emily Stark, Mike Hamburg, Dan Boneh.
	      * All rights reserved.
	      *
	      * Redistribution and use in source and binary forms, with or without
	      * modification, are permitted provided that the following conditions are
	      * met:
	      *
	      * 1. Redistributions of source code must retain the above copyright
	      *    notice, this list of conditions and the following disclaimer.
	      *
	      * 2. Redistributions in binary form must reproduce the above
	      *    copyright notice, this list of conditions and the following
	      *    disclaimer in the documentation and/or other materials provided
	      *    with the distribution.
	      *
	      * THIS SOFTWARE IS PROVIDED BY THE AUTHORS ``AS IS'' AND ANY EXPRESS OR
	      * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	      * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	      * DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR CONTRIBUTORS BE
	      * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
	      * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
	      * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
	      * BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
	      * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
	      * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN
	      * IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	      *
	      * The views and conclusions contained in the software and documentation
	      * are those of the authors and should not be interpreted as representing
	      * official policies, either expressed or implied, of the authors.
	      */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _aes = __webpack_require__(99);

	var _aes2 = _interopRequireDefault(_aes);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var AES128Decrypter = function () {
	  function AES128Decrypter(key, initVector) {
	    _classCallCheck(this, AES128Decrypter);

	    this.key = key;
	    this.iv = initVector;
	  }

	  /**
	   * Convert network-order (big-endian) bytes into their little-endian
	   * representation.
	   */

	  _createClass(AES128Decrypter, [{
	    key: 'ntoh',
	    value: function ntoh(word) {
	      return word << 24 | (word & 0xff00) << 8 | (word & 0xff0000) >> 8 | word >>> 24;
	    }

	    /**
	     * Decrypt bytes using AES-128 with CBC and PKCS#7 padding.
	     * @param encrypted {Uint8Array} the encrypted bytes
	     * @param key {Uint32Array} the bytes of the decryption key
	     * @param initVector {Uint32Array} the initialization vector (IV) to
	     * use for the first round of CBC.
	     * @return {Uint8Array} the decrypted bytes
	     *
	     * @see http://en.wikipedia.org/wiki/Advanced_Encryption_Standard
	     * @see http://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Cipher_Block_Chaining_.28CBC.29
	     * @see https://tools.ietf.org/html/rfc2315
	     */

	  }, {
	    key: 'doDecrypt',
	    value: function doDecrypt(encrypted, key, initVector) {
	      var
	      // word-level access to the encrypted bytes
	      encrypted32 = new Int32Array(encrypted.buffer, encrypted.byteOffset, encrypted.byteLength >> 2),
	          decipher = new _aes2.default(Array.prototype.slice.call(key)),


	      // byte and word-level access for the decrypted output
	      decrypted = new Uint8Array(encrypted.byteLength),
	          decrypted32 = new Int32Array(decrypted.buffer),


	      // temporary variables for working with the IV, encrypted, and
	      // decrypted data
	      init0,
	          init1,
	          init2,
	          init3,
	          encrypted0,
	          encrypted1,
	          encrypted2,
	          encrypted3,


	      // iteration variable
	      wordIx;

	      // pull out the words of the IV to ensure we don't modify the
	      // passed-in reference and easier access
	      init0 = ~ ~initVector[0];
	      init1 = ~ ~initVector[1];
	      init2 = ~ ~initVector[2];
	      init3 = ~ ~initVector[3];

	      // decrypt four word sequences, applying cipher-block chaining (CBC)
	      // to each decrypted block
	      for (wordIx = 0; wordIx < encrypted32.length; wordIx += 4) {
	        // convert big-endian (network order) words into little-endian
	        // (javascript order)
	        encrypted0 = ~ ~this.ntoh(encrypted32[wordIx]);
	        encrypted1 = ~ ~this.ntoh(encrypted32[wordIx + 1]);
	        encrypted2 = ~ ~this.ntoh(encrypted32[wordIx + 2]);
	        encrypted3 = ~ ~this.ntoh(encrypted32[wordIx + 3]);

	        // decrypt the block
	        decipher.decrypt(encrypted0, encrypted1, encrypted2, encrypted3, decrypted32, wordIx);

	        // XOR with the IV, and restore network byte-order to obtain the
	        // plaintext
	        decrypted32[wordIx] = this.ntoh(decrypted32[wordIx] ^ init0);
	        decrypted32[wordIx + 1] = this.ntoh(decrypted32[wordIx + 1] ^ init1);
	        decrypted32[wordIx + 2] = this.ntoh(decrypted32[wordIx + 2] ^ init2);
	        decrypted32[wordIx + 3] = this.ntoh(decrypted32[wordIx + 3] ^ init3);

	        // setup the IV for the next round
	        init0 = encrypted0;
	        init1 = encrypted1;
	        init2 = encrypted2;
	        init3 = encrypted3;
	      }

	      return decrypted;
	    }
	  }, {
	    key: 'localDecrypt',
	    value: function localDecrypt(encrypted, key, initVector, decrypted) {
	      var bytes = this.doDecrypt(encrypted, key, initVector);
	      decrypted.set(bytes, encrypted.byteOffset);
	    }
	  }, {
	    key: 'decrypt',
	    value: function decrypt(encrypted) {
	      var step = 4 * 8000,


	      //encrypted32 = new Int32Array(encrypted.buffer),
	      encrypted32 = new Int32Array(encrypted),
	          decrypted = new Uint8Array(encrypted.byteLength),
	          i = 0;

	      // split up the encryption job and do the individual chunks asynchronously
	      var key = this.key;
	      var initVector = this.iv;
	      this.localDecrypt(encrypted32.subarray(i, i + step), key, initVector, decrypted);

	      for (i = step; i < encrypted32.length; i += step) {
	        initVector = new Uint32Array([this.ntoh(encrypted32[i - 4]), this.ntoh(encrypted32[i - 3]), this.ntoh(encrypted32[i - 2]), this.ntoh(encrypted32[i - 1])]);
	        this.localDecrypt(encrypted32.subarray(i, i + step), key, initVector, decrypted);
	      }

	      return decrypted;
	    }
	  }]);

	  return AES128Decrypter;
	}();

	exports.default = AES128Decrypter;

/***/ },
/* 99 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	/*
	 *
	 * This file contains an adaptation of the AES decryption algorithm
	 * from the Standford Javascript Cryptography Library. That work is
	 * covered by the following copyright and permissions notice:
	 *
	 * Copyright 2009-2010 Emily Stark, Mike Hamburg, Dan Boneh.
	 * All rights reserved.
	 *
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are
	 * met:
	 *
	 * 1. Redistributions of source code must retain the above copyright
	 *    notice, this list of conditions and the following disclaimer.
	 *
	 * 2. Redistributions in binary form must reproduce the above
	 *    copyright notice, this list of conditions and the following
	 *    disclaimer in the documentation and/or other materials provided
	 *    with the distribution.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE AUTHORS ``AS IS'' AND ANY EXPRESS OR
	 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	 * DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR CONTRIBUTORS BE
	 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
	 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
	 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
	 * BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
	 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
	 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN
	 * IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 *
	 * The views and conclusions contained in the software and documentation
	 * are those of the authors and should not be interpreted as representing
	 * official policies, either expressed or implied, of the authors.
	 */

	var AES = function () {

	  /**
	   * Schedule out an AES key for both encryption and decryption. This
	   * is a low-level class. Use a cipher mode to do bulk encryption.
	   *
	   * @constructor
	   * @param key {Array} The key as an array of 4, 6 or 8 words.
	   */

	  function AES(key) {
	    _classCallCheck(this, AES);

	    /**
	     * The expanded S-box and inverse S-box tables. These will be computed
	     * on the client so that we don't have to send them down the wire.
	     *
	     * There are two tables, _tables[0] is for encryption and
	     * _tables[1] is for decryption.
	     *
	     * The first 4 sub-tables are the expanded S-box with MixColumns. The
	     * last (_tables[01][4]) is the S-box itself.
	     *
	     * @private
	     */
	    this._tables = [[[], [], [], [], []], [[], [], [], [], []]];

	    this._precompute();

	    var i,
	        j,
	        tmp,
	        encKey,
	        decKey,
	        sbox = this._tables[0][4],
	        decTable = this._tables[1],
	        keyLen = key.length,
	        rcon = 1;

	    if (keyLen !== 4 && keyLen !== 6 && keyLen !== 8) {
	      throw new Error('Invalid aes key size=' + keyLen);
	    }

	    encKey = key.slice(0);
	    decKey = [];
	    this._key = [encKey, decKey];

	    // schedule encryption keys
	    for (i = keyLen; i < 4 * keyLen + 28; i++) {
	      tmp = encKey[i - 1];

	      // apply sbox
	      if (i % keyLen === 0 || keyLen === 8 && i % keyLen === 4) {
	        tmp = sbox[tmp >>> 24] << 24 ^ sbox[tmp >> 16 & 255] << 16 ^ sbox[tmp >> 8 & 255] << 8 ^ sbox[tmp & 255];

	        // shift rows and add rcon
	        if (i % keyLen === 0) {
	          tmp = tmp << 8 ^ tmp >>> 24 ^ rcon << 24;
	          rcon = rcon << 1 ^ (rcon >> 7) * 283;
	        }
	      }

	      encKey[i] = encKey[i - keyLen] ^ tmp;
	    }

	    // schedule decryption keys
	    for (j = 0; i; j++, i--) {
	      tmp = encKey[j & 3 ? i : i - 4];
	      if (i <= 4 || j < 4) {
	        decKey[j] = tmp;
	      } else {
	        decKey[j] = decTable[0][sbox[tmp >>> 24]] ^ decTable[1][sbox[tmp >> 16 & 255]] ^ decTable[2][sbox[tmp >> 8 & 255]] ^ decTable[3][sbox[tmp & 255]];
	      }
	    }
	  }

	  /**
	   * Expand the S-box tables.
	   *
	   * @private
	   */

	  _createClass(AES, [{
	    key: '_precompute',
	    value: function _precompute() {
	      var encTable = this._tables[0],
	          decTable = this._tables[1],
	          sbox = encTable[4],
	          sboxInv = decTable[4],
	          i,
	          x,
	          xInv,
	          d = [],
	          th = [],
	          x2,
	          x4,
	          x8,
	          s,
	          tEnc,
	          tDec;

	      // Compute double and third tables
	      for (i = 0; i < 256; i++) {
	        th[(d[i] = i << 1 ^ (i >> 7) * 283) ^ i] = i;
	      }

	      for (x = xInv = 0; !sbox[x]; x ^= x2 || 1, xInv = th[xInv] || 1) {
	        // Compute sbox
	        s = xInv ^ xInv << 1 ^ xInv << 2 ^ xInv << 3 ^ xInv << 4;
	        s = s >> 8 ^ s & 255 ^ 99;
	        sbox[x] = s;
	        sboxInv[s] = x;

	        // Compute MixColumns
	        x8 = d[x4 = d[x2 = d[x]]];
	        tDec = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
	        tEnc = d[s] * 0x101 ^ s * 0x1010100;

	        for (i = 0; i < 4; i++) {
	          encTable[i][x] = tEnc = tEnc << 24 ^ tEnc >>> 8;
	          decTable[i][s] = tDec = tDec << 24 ^ tDec >>> 8;
	        }
	      }

	      // Compactify. Considerable speedup on Firefox.
	      for (i = 0; i < 5; i++) {
	        encTable[i] = encTable[i].slice(0);
	        decTable[i] = decTable[i].slice(0);
	      }
	    }

	    /**
	     * Decrypt 16 bytes, specified as four 32-bit words.
	     * @param encrypted0 {number} the first word to decrypt
	     * @param encrypted1 {number} the second word to decrypt
	     * @param encrypted2 {number} the third word to decrypt
	     * @param encrypted3 {number} the fourth word to decrypt
	     * @param out {Int32Array} the array to write the decrypted words
	     * into
	     * @param offset {number} the offset into the output array to start
	     * writing results
	     * @return {Array} The plaintext.
	     */

	  }, {
	    key: 'decrypt',
	    value: function decrypt(encrypted0, encrypted1, encrypted2, encrypted3, out, offset) {
	      var key = this._key[1],


	      // state variables a,b,c,d are loaded with pre-whitened data
	      a = encrypted0 ^ key[0],
	          b = encrypted3 ^ key[1],
	          c = encrypted2 ^ key[2],
	          d = encrypted1 ^ key[3],
	          a2,
	          b2,
	          c2,
	          nInnerRounds = key.length / 4 - 2,

	      // key.length === 2 ?
	      i,
	          kIndex = 4,
	          table = this._tables[1],


	      // load up the tables
	      table0 = table[0],
	          table1 = table[1],
	          table2 = table[2],
	          table3 = table[3],
	          sbox = table[4];

	      // Inner rounds. Cribbed from OpenSSL.
	      for (i = 0; i < nInnerRounds; i++) {
	        a2 = table0[a >>> 24] ^ table1[b >> 16 & 255] ^ table2[c >> 8 & 255] ^ table3[d & 255] ^ key[kIndex];
	        b2 = table0[b >>> 24] ^ table1[c >> 16 & 255] ^ table2[d >> 8 & 255] ^ table3[a & 255] ^ key[kIndex + 1];
	        c2 = table0[c >>> 24] ^ table1[d >> 16 & 255] ^ table2[a >> 8 & 255] ^ table3[b & 255] ^ key[kIndex + 2];
	        d = table0[d >>> 24] ^ table1[a >> 16 & 255] ^ table2[b >> 8 & 255] ^ table3[c & 255] ^ key[kIndex + 3];
	        kIndex += 4;
	        a = a2;b = b2;c = c2;
	      }

	      // Last round.
	      for (i = 0; i < 4; i++) {
	        out[(3 & -i) + offset] = sbox[a >>> 24] << 24 ^ sbox[b >> 16 & 255] << 16 ^ sbox[c >> 8 & 255] << 8 ^ sbox[d & 255] ^ key[kIndex++];
	        a2 = a;a = b;b = c;c = d;d = a2;
	      }
	    }
	  }]);

	  return AES;
	}();

	exports.default = AES;

/***/ },
/* 100 */
/***/ function(module, exports) {

	'use strict';

	var __webpack_require__ = arguments[2];
	var sources = __webpack_require__.m;

	var webpackBootstrapFunc = function webpackBootstrapFunc(modules) {
	    var installedModules = {};
	    function __webpack_require__(moduleId) {
	        if (installedModules[moduleId]) return installedModules[moduleId].exports;
	        var module = installedModules[moduleId] = {
	            exports: {},
	            id: moduleId,
	            loaded: false
	        };
	        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	        module.loaded = true;
	        return module.exports;
	    }
	    __webpack_require__.m = modules;
	    __webpack_require__.c = installedModules;
	    __webpack_require__.oe = function (err) {
	        throw err;
	    };
	    __webpack_require__.p = "";
	    var f = __webpack_require__(__webpack_require__.s = entryModule);
	    return f.default || f; // try to call default if defined to also support babel esmodule exports
	};

	module.exports = function (fn) {
	    var key;
	    for (var i = 0, l = sources.length; i < l; i++) {
	        if (!sources[i]) {
	            continue;
	        }
	        var wrapperFuncString = sources[i].toString();
	        var fnString = fn.toString();
	        var exp = __webpack_require__(i);
	        // Using babel as a transpiler to use esmodule, the export will always
	        // be an object with the default export as a property of it. To ensure
	        // the existing api and babel esmodule exports are both supported we
	        // check for both
	        if (exp && (exp === fn || exp.default === fn)) {
	            key = i;
	            break;
	        } else if (wrapperFuncString.indexOf(fnString) > -1) {
	            sources[i] = wrapperFuncString.substring(0, wrapperFuncString.length - 1) + '\n' + fnString.match(/function\s?(.+?)\s?\(.*/)[1] + '();\n}';
	            key = i;
	            break;
	        }
	    }

	    // window = {}; => https://github.com/borisirota/webworkify-webpack/issues/1
	    var src = 'window = {};\n' + 'var fn = (' + webpackBootstrapFunc.toString().replace('entryModule', key) + ')([' + sources.map(function (func) {
	        return func.toString();
	    }).join(',') + ']);\n' + '(typeof fn === "function") && fn(self);'; // not a function when calling a function from the current scope

	    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

	    return new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
	};

/***/ },
/* 101 */
/***/ function(module, exports) {

	"use strict";

	var BinarySearch = {
	    /**
	     * Searches for an item in an array which matches a certain condition.
	     * This requires the condition to only match one item in the array,
	     * and for the array to be ordered.
	     *
	     * @param {Array} list The array to search.
	     * @param {Function} comparisonFunction
	     *      Called and provided a candidate item as the first argument.
	     *      Should return:
	     *          > -1 if the item should be located at a lower index than the provided item.
	     *          > 1 if the item should be located at a higher index than the provided item.
	     *          > 0 if the item is the item you're looking for.
	     *
	     * @return {*} The object if it is found or null otherwise.
	     */
	    search: function search(list, comparisonFunction) {
	        var minIndex = 0;
	        var maxIndex = list.length - 1;
	        var currentIndex = null;
	        var currentElement = null;

	        while (minIndex <= maxIndex) {
	            currentIndex = (minIndex + maxIndex) / 2 | 0;
	            currentElement = list[currentIndex];

	            var comparisonResult = comparisonFunction(currentElement);
	            if (comparisonResult > 0) {
	                minIndex = currentIndex + 1;
	            } else if (comparisonResult < 0) {
	                maxIndex = currentIndex - 1;
	            } else {
	                return currentElement;
	            }
	        }

	        return null;
	    }
	};

	module.exports = BinarySearch;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}(); /**
	      * Level Helper class, providing methods dealing with playlist sliding and drift
	     */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _logger = __webpack_require__(83);

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var LevelHelper = function () {
	  function LevelHelper() {
	    _classCallCheck(this, LevelHelper);
	  }

	  _createClass(LevelHelper, null, [{
	    key: 'mergeDetails',
	    value: function mergeDetails(oldDetails, newDetails) {
	      var start = Math.max(oldDetails.startSN, newDetails.startSN) - newDetails.startSN,
	          end = Math.min(oldDetails.endSN, newDetails.endSN) - newDetails.startSN,
	          delta = newDetails.startSN - oldDetails.startSN,
	          oldfragments = oldDetails.fragments,
	          newfragments = newDetails.fragments,
	          ccOffset = 0,
	          PTSFrag;

	      // check if old/new playlists have fragments in common
	      if (end < start) {
	        newDetails.PTSKnown = false;
	        return;
	      }
	      // loop through overlapping SN and update startPTS , cc, and duration if any found
	      for (var i = start; i <= end; i++) {
	        var oldFrag = oldfragments[delta + i],
	            newFrag = newfragments[i];
	        ccOffset = oldFrag.cc - newFrag.cc;
	        if (!isNaN(oldFrag.startPTS)) {
	          newFrag.start = newFrag.startPTS = oldFrag.startPTS;
	          newFrag.endPTS = oldFrag.endPTS;
	          newFrag.duration = oldFrag.duration;
	          PTSFrag = newFrag;
	        }
	      }

	      if (ccOffset) {
	        _logger.logger.log('discontinuity sliding from playlist, take drift into account');
	        for (i = 0; i < newfragments.length; i++) {
	          newfragments[i].cc += ccOffset;
	        }
	      }

	      // if at least one fragment contains PTS info, recompute PTS information for all fragments
	      if (PTSFrag) {
	        LevelHelper.updateFragPTS(newDetails, PTSFrag.sn, PTSFrag.startPTS, PTSFrag.endPTS);
	      } else {
	        // adjust start by sliding offset
	        var sliding = oldfragments[delta].start;
	        for (i = 0; i < newfragments.length; i++) {
	          newfragments[i].start += sliding;
	        }
	      }
	      // if we are here, it means we have fragments overlapping between
	      // old and new level. reliable PTS info is thus relying on old level
	      newDetails.PTSKnown = oldDetails.PTSKnown;
	      return;
	    }
	  }, {
	    key: 'updateFragPTS',
	    value: function updateFragPTS(details, sn, startPTS, endPTS) {
	      var fragIdx, fragments, frag, i;
	      // exit if sn out of range
	      if (sn < details.startSN || sn > details.endSN) {
	        return 0;
	      }
	      fragIdx = sn - details.startSN;
	      fragments = details.fragments;
	      frag = fragments[fragIdx];
	      if (!isNaN(frag.startPTS)) {
	        startPTS = Math.min(startPTS, frag.startPTS);
	        endPTS = Math.max(endPTS, frag.endPTS);
	      }

	      var drift = startPTS - frag.start;

	      frag.start = frag.startPTS = startPTS;
	      frag.endPTS = endPTS;
	      frag.duration = endPTS - startPTS;
	      // adjust fragment PTS/duration from seqnum-1 to frag 0
	      for (i = fragIdx; i > 0; i--) {
	        LevelHelper.updatePTS(fragments, i, i - 1);
	      }

	      // adjust fragment PTS/duration from seqnum to last frag
	      for (i = fragIdx; i < fragments.length - 1; i++) {
	        LevelHelper.updatePTS(fragments, i, i + 1);
	      }
	      details.PTSKnown = true;
	      //logger.log(`                                            frag start/end:${startPTS.toFixed(3)}/${endPTS.toFixed(3)}`);

	      return drift;
	    }
	  }, {
	    key: 'updatePTS',
	    value: function updatePTS(fragments, fromIdx, toIdx) {
	      var fragFrom = fragments[fromIdx],
	          fragTo = fragments[toIdx],
	          fragToPTS = fragTo.startPTS;
	      // if we know startPTS[toIdx]
	      if (!isNaN(fragToPTS)) {
	        // update fragment duration.
	        // it helps to fix drifts between playlist reported duration and fragment real duration
	        if (toIdx > fromIdx) {
	          fragFrom.duration = fragToPTS - fragFrom.start;
	          if (fragFrom.duration < 0) {
	            _logger.logger.error('negative duration computed for frag ' + fragFrom.sn + ',level ' + fragFrom.level + ', there should be some duration drift between playlist and fragment!');
	          }
	        } else {
	          fragTo.duration = fragFrom.start - fragToPTS;
	          if (fragTo.duration < 0) {
	            _logger.logger.error('negative duration computed for frag ' + fragTo.sn + ',level ' + fragTo.level + ', there should be some duration drift between playlist and fragment!');
	          }
	        }
	      } else {
	        // we dont know startPTS[toIdx]
	        if (toIdx > fromIdx) {
	          fragTo.start = fragFrom.start + fragFrom.duration;
	        } else {
	          fragTo.start = fragFrom.start - fragTo.duration;
	        }
	      }
	    }
	  }]);

	  return LevelHelper;
	}();

	exports.default = LevelHelper;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(74);

	var _events2 = _interopRequireDefault(_events);

	var _eventHandler = __webpack_require__(77);

	var _eventHandler2 = _interopRequireDefault(_eventHandler);

	var _logger = __webpack_require__(83);

	var _errors = __webpack_require__(75);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	} /*
	   * Level Controller
	  */

	var LevelController = function (_EventHandler) {
	  _inherits(LevelController, _EventHandler);

	  function LevelController(hls) {
	    _classCallCheck(this, LevelController);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LevelController).call(this, hls, _events2.default.MANIFEST_LOADED, _events2.default.LEVEL_LOADED, _events2.default.ERROR));

	    _this.ontick = _this.tick.bind(_this);
	    _this._manualLevel = _this._autoLevelCapping = -1;
	    return _this;
	  }

	  _createClass(LevelController, [{
	    key: 'destroy',
	    value: function destroy() {
	      if (this.timer) {
	        clearInterval(this.timer);
	      }
	      this._manualLevel = -1;
	    }
	  }, {
	    key: 'onManifestLoaded',
	    value: function onManifestLoaded(data) {
	      var levels0 = [],
	          levels = [],
	          bitrateStart,
	          i,
	          bitrateSet = {},
	          videoCodecFound = false,
	          audioCodecFound = false,
	          hls = this.hls;

	      // regroup redundant level together
	      data.levels.forEach(function (level) {
	        if (level.videoCodec) {
	          videoCodecFound = true;
	        }
	        if (level.audioCodec) {
	          audioCodecFound = true;
	        }
	        var redundantLevelId = bitrateSet[level.bitrate];
	        if (redundantLevelId === undefined) {
	          bitrateSet[level.bitrate] = levels0.length;
	          level.url = [level.url];
	          level.urlId = 0;
	          levels0.push(level);
	        } else {
	          levels0[redundantLevelId].url.push(level.url);
	        }
	      });

	      // remove audio-only level if we also have levels with audio+video codecs signalled
	      if (videoCodecFound && audioCodecFound) {
	        levels0.forEach(function (level) {
	          if (level.videoCodec) {
	            levels.push(level);
	          }
	        });
	      } else {
	        levels = levels0;
	      }

	      // only keep level with supported audio/video codecs
	      levels = levels.filter(function (level) {
	        var checkSupportedAudio = function checkSupportedAudio(codec) {
	          return MediaSource.isTypeSupported('audio/mp4;codecs=' + codec);
	        };
	        var checkSupportedVideo = function checkSupportedVideo(codec) {
	          return MediaSource.isTypeSupported('video/mp4;codecs=' + codec);
	        };
	        var audioCodec = level.audioCodec,
	            videoCodec = level.videoCodec;

	        return (!audioCodec || checkSupportedAudio(audioCodec)) && (!videoCodec || checkSupportedVideo(videoCodec));
	      });

	      if (levels.length) {
	        // start bitrate is the first bitrate of the manifest
	        bitrateStart = levels[0].bitrate;
	        // sort level on bitrate
	        levels.sort(function (a, b) {
	          return a.bitrate - b.bitrate;
	        });
	        this._levels = levels;
	        // find index of first level in sorted levels
	        for (i = 0; i < levels.length; i++) {
	          if (levels[i].bitrate === bitrateStart) {
	            this._firstLevel = i;
	            _logger.logger.log('manifest loaded,' + levels.length + ' level(s) found, first bitrate:' + bitrateStart);
	            break;
	          }
	        }
	        hls.trigger(_events2.default.MANIFEST_PARSED, { levels: this._levels, firstLevel: this._firstLevel, stats: data.stats });
	      } else {
	        hls.trigger(_events2.default.ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR, fatal: true, url: hls.url, reason: 'no level with compatible codecs found in manifest' });
	      }
	      return;
	    }
	  }, {
	    key: 'setLevelInternal',
	    value: function setLevelInternal(newLevel) {
	      // check if level idx is valid
	      if (newLevel >= 0 && newLevel < this._levels.length) {
	        // stopping live reloading timer if any
	        if (this.timer) {
	          clearInterval(this.timer);
	          this.timer = null;
	        }
	        this._level = newLevel;
	        _logger.logger.log('switching to level ' + newLevel);
	        this.hls.trigger(_events2.default.LEVEL_SWITCH, { level: newLevel });
	        var level = this._levels[newLevel];
	        // check if we need to load playlist for this level
	        if (level.details === undefined || level.details.live === true) {
	          // level not retrieved yet, or live playlist we need to (re)load it
	          _logger.logger.log('(re)loading playlist for level ' + newLevel);
	          var urlId = level.urlId;
	          this.hls.trigger(_events2.default.LEVEL_LOADING, { url: level.url[urlId], level: newLevel, id: urlId });
	        }
	      } else {
	        // invalid level id given, trigger error
	        this.hls.trigger(_events2.default.ERROR, { type: _errors.ErrorTypes.OTHER_ERROR, details: _errors.ErrorDetails.LEVEL_SWITCH_ERROR, level: newLevel, fatal: false, reason: 'invalid level idx' });
	      }
	    }
	  }, {
	    key: 'onError',
	    value: function onError(data) {
	      if (data.fatal) {
	        return;
	      }

	      var details = data.details,
	          hls = this.hls,
	          levelId,
	          level;
	      // try to recover not fatal errors
	      switch (details) {
	        case _errors.ErrorDetails.FRAG_LOAD_ERROR:
	        case _errors.ErrorDetails.FRAG_LOAD_TIMEOUT:
	        case _errors.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
	        case _errors.ErrorDetails.KEY_LOAD_ERROR:
	        case _errors.ErrorDetails.KEY_LOAD_TIMEOUT:
	          levelId = data.frag.level;
	          break;
	        case _errors.ErrorDetails.LEVEL_LOAD_ERROR:
	        case _errors.ErrorDetails.LEVEL_LOAD_TIMEOUT:
	          levelId = data.level;
	          break;
	        default:
	          break;
	      }
	      /* try to switch to a redundant stream if any available.
	       * if no redundant stream available, emergency switch down (if in auto mode and current level not 0)
	       * otherwise, we cannot recover this network error ...
	       * don't raise FRAG_LOAD_ERROR and FRAG_LOAD_TIMEOUT as fatal, as it is handled by mediaController
	       */
	      if (levelId !== undefined) {
	        level = this._levels[levelId];
	        if (level.urlId < level.url.length - 1) {
	          level.urlId++;
	          level.details = undefined;
	          _logger.logger.warn('level controller,' + details + ' for level ' + levelId + ': switching to redundant stream id ' + level.urlId);
	        } else {
	          // we could try to recover if in auto mode and current level not lowest level (0)
	          var recoverable = this._manualLevel === -1 && levelId;
	          if (recoverable) {
	            _logger.logger.warn('level controller,' + details + ': emergency switch-down for next fragment');
	            hls.abrController.nextAutoLevel = 0;
	          } else if (level && level.details && level.details.live) {
	            _logger.logger.warn('level controller,' + details + ' on live stream, discard');
	            // FRAG_LOAD_ERROR and FRAG_LOAD_TIMEOUT are handled by mediaController
	          } else if (details !== _errors.ErrorDetails.FRAG_LOAD_ERROR && details !== _errors.ErrorDetails.FRAG_LOAD_TIMEOUT) {
	              _logger.logger.error('cannot recover ' + details + ' error');
	              this._level = undefined;
	              // stopping live reloading timer if any
	              if (this.timer) {
	                clearInterval(this.timer);
	                this.timer = null;
	              }
	              // redispatch same error but with fatal set to true
	              data.fatal = true;
	              hls.trigger(event, data);
	            }
	        }
	      }
	    }
	  }, {
	    key: 'onLevelLoaded',
	    value: function onLevelLoaded(data) {
	      // check if current playlist is a live playlist
	      if (data.details.live && !this.timer) {
	        // if live playlist we will have to reload it periodically
	        // set reload period to playlist target duration
	        this.timer = setInterval(this.ontick, 1000 * data.details.targetduration);
	      }
	      if (!data.details.live && this.timer) {
	        // playlist is not live and timer is armed : stopping it
	        clearInterval(this.timer);
	        this.timer = null;
	      }
	    }
	  }, {
	    key: 'tick',
	    value: function tick() {
	      var levelId = this._level;
	      if (levelId !== undefined) {
	        var level = this._levels[levelId],
	            urlId = level.urlId;
	        this.hls.trigger(_events2.default.LEVEL_LOADING, { url: level.url[urlId], level: levelId, id: urlId });
	      }
	    }
	  }, {
	    key: 'nextLoadLevel',
	    value: function nextLoadLevel() {
	      if (this._manualLevel !== -1) {
	        return this._manualLevel;
	      } else {
	        return this.hls.abrController.nextAutoLevel;
	      }
	    }
	  }, {
	    key: 'levels',
	    get: function get() {
	      return this._levels;
	    }
	  }, {
	    key: 'level',
	    get: function get() {
	      return this._level;
	    },
	    set: function set(newLevel) {
	      if (this._level !== newLevel || this._levels[newLevel].details === undefined) {
	        this.setLevelInternal(newLevel);
	      }
	    }
	  }, {
	    key: 'manualLevel',
	    get: function get() {
	      return this._manualLevel;
	    },
	    set: function set(newLevel) {
	      this._manualLevel = newLevel;
	      if (newLevel !== -1) {
	        this.level = newLevel;
	      }
	    }
	  }, {
	    key: 'firstLevel',
	    get: function get() {
	      return this._firstLevel;
	    },
	    set: function set(newLevel) {
	      this._firstLevel = newLevel;
	    }
	  }, {
	    key: 'startLevel',
	    get: function get() {
	      if (this._startLevel === undefined) {
	        return this._firstLevel;
	      } else {
	        return this._startLevel;
	      }
	    },
	    set: function set(newLevel) {
	      this._startLevel = newLevel;
	    }
	  }]);

	  return LevelController;
	}(_eventHandler2.default);

	exports.default = LevelController;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(74);

	var _events2 = _interopRequireDefault(_events);

	var _eventHandler = __webpack_require__(77);

	var _eventHandler2 = _interopRequireDefault(_eventHandler);

	var _cea708Interpreter = __webpack_require__(105);

	var _cea708Interpreter2 = _interopRequireDefault(_cea708Interpreter);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	} /*
	   * Timeline Controller
	  */

	var TimelineController = function (_EventHandler) {
	  _inherits(TimelineController, _EventHandler);

	  function TimelineController(hls) {
	    _classCallCheck(this, TimelineController);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TimelineController).call(this, hls, _events2.default.MEDIA_ATTACHING, _events2.default.MEDIA_DETACHING, _events2.default.FRAG_PARSING_USERDATA, _events2.default.MANIFEST_LOADING, _events2.default.FRAG_LOADED));

	    _this.hls = hls;
	    _this.config = hls.config;

	    if (_this.config.enableCEA708Captions) {
	      _this.cea708Interpreter = new _cea708Interpreter2.default();
	    }
	    return _this;
	  }

	  _createClass(TimelineController, [{
	    key: 'destroy',
	    value: function destroy() {
	      _eventHandler2.default.prototype.destroy.call(this);
	    }
	  }, {
	    key: 'onMediaAttaching',
	    value: function onMediaAttaching(data) {
	      var media = this.media = data.media;
	      this.cea708Interpreter.attach(media);
	    }
	  }, {
	    key: 'onMediaDetaching',
	    value: function onMediaDetaching() {
	      this.cea708Interpreter.detach();
	    }
	  }, {
	    key: 'onManifestLoading',
	    value: function onManifestLoading() {
	      this.lastPts = Number.POSITIVE_INFINITY;
	    }
	  }, {
	    key: 'onFragLoaded',
	    value: function onFragLoaded(data) {
	      var pts = data.frag.start; //Number.POSITIVE_INFINITY;

	      // if this is a frag for a previously loaded timerange, remove all captions
	      // TODO: consider just removing captions for the timerange
	      if (pts <= this.lastPts) {
	        this.cea708Interpreter.clear();
	      }

	      this.lastPts = pts;
	    }
	  }, {
	    key: 'onFragParsingUserdata',
	    value: function onFragParsingUserdata(data) {
	      // push all of the CEA-708 messages into the interpreter
	      // immediately. It will create the proper timestamps based on our PTS value
	      for (var i = 0; i < data.samples.length; i++) {
	        this.cea708Interpreter.push(data.samples[i].pts, data.samples[i].bytes);
	      }
	    }
	  }]);

	  return TimelineController;
	}(_eventHandler2.default);

	exports.default = TimelineController;

/***/ },
/* 105 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	/*
	 * CEA-708 interpreter
	*/

	var CEA708Interpreter = function () {
	  function CEA708Interpreter() {
	    _classCallCheck(this, CEA708Interpreter);
	  }

	  _createClass(CEA708Interpreter, [{
	    key: 'attach',
	    value: function attach(media) {
	      this.media = media;
	      this.display = [];
	      this.memory = [];
	    }
	  }, {
	    key: 'detach',
	    value: function detach() {
	      this.clear();
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {}
	  }, {
	    key: '_createCue',
	    value: function _createCue() {
	      var VTTCue = window.VTTCue || window.TextTrackCue;

	      var cue = this.cue = new VTTCue(-1, -1, '');
	      cue.text = '';
	      cue.pauseOnExit = false;

	      // make sure it doesn't show up before it's ready
	      cue.startTime = Number.MAX_VALUE;

	      // show it 'forever' once we do show it
	      // (we'll set the end time once we know it later)
	      cue.endTime = Number.MAX_VALUE;

	      this.memory.push(cue);
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      var textTrack = this._textTrack;
	      if (textTrack && textTrack.cues) {
	        while (textTrack.cues.length > 0) {
	          textTrack.removeCue(textTrack.cues[0]);
	        }
	      }
	    }
	  }, {
	    key: 'push',
	    value: function push(timestamp, bytes) {
	      if (!this.cue) {
	        this._createCue();
	      }

	      var count = bytes[0] & 31;
	      var position = 2;
	      var tmpByte, ccbyte1, ccbyte2, ccValid, ccType;

	      for (var j = 0; j < count; j++) {
	        tmpByte = bytes[position++];
	        ccbyte1 = 0x7F & bytes[position++];
	        ccbyte2 = 0x7F & bytes[position++];
	        ccValid = (4 & tmpByte) === 0 ? false : true;
	        ccType = 3 & tmpByte;

	        if (ccbyte1 === 0 && ccbyte2 === 0) {
	          continue;
	        }

	        if (ccValid) {
	          if (ccType === 0) // || ccType === 1
	            {
	              // Standard Characters
	              if (0x20 & ccbyte1 || 0x40 & ccbyte1) {
	                this.cue.text += this._fromCharCode(ccbyte1) + this._fromCharCode(ccbyte2);
	              }
	              // Special Characters
	              else if ((ccbyte1 === 0x11 || ccbyte1 === 0x19) && ccbyte2 >= 0x30 && ccbyte2 <= 0x3F) {
	                  // extended chars, e.g. musical note, accents
	                  switch (ccbyte2) {
	                    case 48:
	                      this.cue.text += '®';
	                      break;
	                    case 49:
	                      this.cue.text += '°';
	                      break;
	                    case 50:
	                      this.cue.text += '½';
	                      break;
	                    case 51:
	                      this.cue.text += '¿';
	                      break;
	                    case 52:
	                      this.cue.text += '™';
	                      break;
	                    case 53:
	                      this.cue.text += '¢';
	                      break;
	                    case 54:
	                      this.cue.text += '';
	                      break;
	                    case 55:
	                      this.cue.text += '£';
	                      break;
	                    case 56:
	                      this.cue.text += '♪';
	                      break;
	                    case 57:
	                      this.cue.text += ' ';
	                      break;
	                    case 58:
	                      this.cue.text += 'è';
	                      break;
	                    case 59:
	                      this.cue.text += 'â';
	                      break;
	                    case 60:
	                      this.cue.text += 'ê';
	                      break;
	                    case 61:
	                      this.cue.text += 'î';
	                      break;
	                    case 62:
	                      this.cue.text += 'ô';
	                      break;
	                    case 63:
	                      this.cue.text += 'û';
	                      break;
	                  }
	                }
	              if ((ccbyte1 === 0x11 || ccbyte1 === 0x19) && ccbyte2 >= 0x20 && ccbyte2 <= 0x2F) {
	                // Mid-row codes: color/underline
	                switch (ccbyte2) {
	                  case 0x20:
	                    // White
	                    break;
	                  case 0x21:
	                    // White Underline
	                    break;
	                  case 0x22:
	                    // Green
	                    break;
	                  case 0x23:
	                    // Green Underline
	                    break;
	                  case 0x24:
	                    // Blue
	                    break;
	                  case 0x25:
	                    // Blue Underline
	                    break;
	                  case 0x26:
	                    // Cyan
	                    break;
	                  case 0x27:
	                    // Cyan Underline
	                    break;
	                  case 0x28:
	                    // Red
	                    break;
	                  case 0x29:
	                    // Red Underline
	                    break;
	                  case 0x2A:
	                    // Yellow
	                    break;
	                  case 0x2B:
	                    // Yellow Underline
	                    break;
	                  case 0x2C:
	                    // Magenta
	                    break;
	                  case 0x2D:
	                    // Magenta Underline
	                    break;
	                  case 0x2E:
	                    // Italics
	                    break;
	                  case 0x2F:
	                    // Italics Underline
	                    break;
	                }
	              }
	              if ((ccbyte1 === 0x14 || ccbyte1 === 0x1C) && ccbyte2 >= 0x20 && ccbyte2 <= 0x2F) {
	                // Mid-row codes: color/underline
	                switch (ccbyte2) {
	                  case 0x20:
	                    // TODO: shouldn't affect roll-ups...
	                    this._clearActiveCues(timestamp);
	                    // RCL: Resume Caption Loading
	                    // begin pop on
	                    break;
	                  case 0x21:
	                    // BS: Backspace
	                    this.cue.text = this.cue.text.substr(0, this.cue.text.length - 1);
	                    break;
	                  case 0x22:
	                    // AOF: reserved (formerly alarm off)
	                    break;
	                  case 0x23:
	                    // AON: reserved (formerly alarm on)
	                    break;
	                  case 0x24:
	                    // DER: Delete to end of row
	                    break;
	                  case 0x25:
	                    // RU2: roll-up 2 rows
	                    //this._rollup(2);
	                    break;
	                  case 0x26:
	                    // RU3: roll-up 3 rows
	                    //this._rollup(3);
	                    break;
	                  case 0x27:
	                    // RU4: roll-up 4 rows
	                    //this._rollup(4);
	                    break;
	                  case 0x28:
	                    // FON: Flash on
	                    break;
	                  case 0x29:
	                    // RDC: Resume direct captioning
	                    this._clearActiveCues(timestamp);
	                    break;
	                  case 0x2A:
	                    // TR: Text Restart
	                    break;
	                  case 0x2B:
	                    // RTD: Resume Text Display
	                    break;
	                  case 0x2C:
	                    // EDM: Erase Displayed Memory
	                    this._clearActiveCues(timestamp);
	                    break;
	                  case 0x2D:
	                    // CR: Carriage Return
	                    // only affects roll-up
	                    //this._rollup(1);
	                    break;
	                  case 0x2E:
	                    // ENM: Erase non-displayed memory
	                    this._text = '';
	                    break;
	                  case 0x2F:
	                    this._flipMemory(timestamp);
	                    // EOC: End of caption
	                    // hide any displayed captions and show any hidden one
	                    break;
	                }
	              }
	              if ((ccbyte1 === 0x17 || ccbyte1 === 0x1F) && ccbyte2 >= 0x21 && ccbyte2 <= 0x23) {
	                // Mid-row codes: color/underline
	                switch (ccbyte2) {
	                  case 0x21:
	                    // TO1: tab offset 1 column
	                    break;
	                  case 0x22:
	                    // TO1: tab offset 2 column
	                    break;
	                  case 0x23:
	                    // TO1: tab offset 3 column
	                    break;
	                }
	              } else {
	                // Probably a pre-amble address code
	              }
	            }
	        }
	      }
	    }
	  }, {
	    key: '_fromCharCode',
	    value: function _fromCharCode(tmpByte) {
	      switch (tmpByte) {
	        case 42:
	          return 'á';

	        case 2:
	          return 'á';

	        case 2:
	          return 'é';

	        case 4:
	          return 'í';

	        case 5:
	          return 'ó';

	        case 6:
	          return 'ú';

	        case 3:
	          return 'ç';

	        case 4:
	          return '÷';

	        case 5:
	          return 'Ñ';

	        case 6:
	          return 'ñ';

	        case 7:
	          return '█';

	        default:
	          return String.fromCharCode(tmpByte);
	      }
	    }
	  }, {
	    key: '_flipMemory',
	    value: function _flipMemory(timestamp) {
	      this._clearActiveCues(timestamp);
	      this._flushCaptions(timestamp);
	    }
	  }, {
	    key: '_flushCaptions',
	    value: function _flushCaptions(timestamp) {
	      if (!this._has708) {
	        this._textTrack = this.media.addTextTrack('captions', 'English', 'en');
	        this._has708 = true;
	      }

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.memory[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var memoryItem = _step.value;

	          memoryItem.startTime = timestamp;
	          this._textTrack.addCue(memoryItem);
	          this.display.push(memoryItem);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      this.memory = [];
	      this.cue = null;
	    }
	  }, {
	    key: '_clearActiveCues',
	    value: function _clearActiveCues(timestamp) {
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this.display[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var displayItem = _step2.value;

	          displayItem.endTime = timestamp;
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      this.display = [];
	    }

	    /*  _rollUp(n)
	      {
	        // TODO: implement roll-up captions
	      }
	    */

	  }, {
	    key: '_clearBufferedCues',
	    value: function _clearBufferedCues() {
	      //remove them all...
	    }
	  }]);

	  return CEA708Interpreter;
	}();

	exports.default = CEA708Interpreter;

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}(); /**
	      * XHR based logger
	     */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _logger = __webpack_require__(83);

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var XhrLoader = function () {
	  function XhrLoader(config) {
	    _classCallCheck(this, XhrLoader);

	    if (config && config.xhrSetup) {
	      this.xhrSetup = config.xhrSetup;
	    }
	  }

	  _createClass(XhrLoader, [{
	    key: 'destroy',
	    value: function destroy() {
	      this.abort();
	      this.loader = null;
	    }
	  }, {
	    key: 'abort',
	    value: function abort() {
	      var loader = this.loader,
	          timeoutHandle = this.timeoutHandle;
	      if (loader && loader.readyState !== 4) {
	        this.stats.aborted = true;
	        loader.abort();
	      }
	      if (timeoutHandle) {
	        window.clearTimeout(timeoutHandle);
	      }
	    }
	  }, {
	    key: 'load',
	    value: function load(url, responseType, onSuccess, onError, onTimeout, timeout, maxRetry, retryDelay) {
	      var onProgress = arguments.length <= 8 || arguments[8] === undefined ? null : arguments[8];
	      var frag = arguments.length <= 9 || arguments[9] === undefined ? null : arguments[9];

	      this.url = url;
	      if (frag && !isNaN(frag.byteRangeStartOffset) && !isNaN(frag.byteRangeEndOffset)) {
	        this.byteRange = frag.byteRangeStartOffset + '-' + (frag.byteRangeEndOffset - 1);
	      }
	      this.responseType = responseType;
	      this.onSuccess = onSuccess;
	      this.onProgress = onProgress;
	      this.onTimeout = onTimeout;
	      this.onError = onError;
	      this.stats = { trequest: performance.now(), retry: 0 };
	      this.timeout = timeout;
	      this.maxRetry = maxRetry;
	      this.retryDelay = retryDelay;
	      this.loadInternal();
	    }
	  }, {
	    key: 'loadInternal',
	    value: function loadInternal() {
	      var xhr;

	      if (typeof XDomainRequest !== 'undefined') {
	        xhr = this.loader = new XDomainRequest();
	      } else {
	        xhr = this.loader = new XMLHttpRequest();
	      }

	      xhr.onloadend = this.loadend.bind(this);
	      xhr.onprogress = this.loadprogress.bind(this);

	      xhr.open('GET', this.url, true);
	      if (this.byteRange) {
	        xhr.setRequestHeader('Range', 'bytes=' + this.byteRange);
	      }
	      xhr.responseType = this.responseType;
	      this.stats.tfirst = null;
	      this.stats.loaded = 0;
	      if (this.xhrSetup) {
	        this.xhrSetup(xhr, this.url);
	      }
	      this.timeoutHandle = window.setTimeout(this.loadtimeout.bind(this), this.timeout);
	      xhr.send();
	    }
	  }, {
	    key: 'loadend',
	    value: function loadend(event) {
	      var xhr = event.currentTarget,
	          status = xhr.status,
	          stats = this.stats;
	      // don't proceed if xhr has been aborted
	      if (!stats.aborted) {
	        // http status between 200 to 299 are all successful
	        if (status >= 200 && status < 300) {
	          window.clearTimeout(this.timeoutHandle);
	          stats.tload = performance.now();
	          this.onSuccess(event, stats);
	        } else {
	          // error ...
	          if (stats.retry < this.maxRetry) {
	            _logger.logger.warn(status + ' while loading ' + this.url + ', retrying in ' + this.retryDelay + '...');
	            this.destroy();
	            window.setTimeout(this.loadInternal.bind(this), this.retryDelay);
	            // exponential backoff
	            this.retryDelay = Math.min(2 * this.retryDelay, 64000);
	            stats.retry++;
	          } else {
	            window.clearTimeout(this.timeoutHandle);
	            _logger.logger.error(status + ' while loading ' + this.url);
	            this.onError(event);
	          }
	        }
	      }
	    }
	  }, {
	    key: 'loadtimeout',
	    value: function loadtimeout(event) {
	      _logger.logger.warn('timeout while loading ' + this.url);
	      this.onTimeout(event, this.stats);
	    }
	  }, {
	    key: 'loadprogress',
	    value: function loadprogress(event) {
	      var stats = this.stats;
	      if (stats.tfirst === null) {
	        stats.tfirst = performance.now();
	      }
	      stats.loaded = event.loaded;
	      if (this.onProgress) {
	        this.onProgress(event, stats);
	      }
	    }
	  }]);

	  return XhrLoader;
	}();

	exports.default = XhrLoader;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(74);

	var _events2 = _interopRequireDefault(_events);

	var _eventHandler = __webpack_require__(77);

	var _eventHandler2 = _interopRequireDefault(_eventHandler);

	var _errors = __webpack_require__(75);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	} /*
	   * Decrypt key Loader
	  */

	var KeyLoader = function (_EventHandler) {
	  _inherits(KeyLoader, _EventHandler);

	  function KeyLoader(hls) {
	    _classCallCheck(this, KeyLoader);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(KeyLoader).call(this, hls, _events2.default.KEY_LOADING));

	    _this.decryptkey = null;
	    _this.decrypturl = null;
	    return _this;
	  }

	  _createClass(KeyLoader, [{
	    key: 'destroy',
	    value: function destroy() {
	      if (this.loader) {
	        this.loader.destroy();
	        this.loader = null;
	      }
	      _eventHandler2.default.prototype.destroy.call(this);
	    }
	  }, {
	    key: 'onKeyLoading',
	    value: function onKeyLoading(data) {
	      var frag = this.frag = data.frag,
	          decryptdata = frag.decryptdata,
	          uri = decryptdata.uri;
	      // if uri is different from previous one or if decrypt key not retrieved yet
	      if (uri !== this.decrypturl || this.decryptkey === null) {
	        var config = this.hls.config;
	        frag.loader = this.loader = new config.loader(config);
	        this.decrypturl = uri;
	        this.decryptkey = null;
	        frag.loader.load(uri, 'arraybuffer', this.loadsuccess.bind(this), this.loaderror.bind(this), this.loadtimeout.bind(this), config.fragLoadingTimeOut, config.fragLoadingMaxRetry, config.fragLoadingRetryDelay, this.loadprogress.bind(this), frag);
	      } else if (this.decryptkey) {
	        // we already loaded this key, return it
	        decryptdata.key = this.decryptkey;
	        this.hls.trigger(_events2.default.KEY_LOADED, { frag: frag });
	      }
	    }
	  }, {
	    key: 'loadsuccess',
	    value: function loadsuccess(event) {
	      var frag = this.frag;
	      this.decryptkey = frag.decryptdata.key = new Uint8Array(event.currentTarget.response);
	      // detach fragment loader on load success
	      frag.loader = undefined;
	      this.hls.trigger(_events2.default.KEY_LOADED, { frag: frag });
	    }
	  }, {
	    key: 'loaderror',
	    value: function loaderror(event) {
	      if (this.loader) {
	        this.loader.abort();
	      }
	      this.hls.trigger(_events2.default.ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: _errors.ErrorDetails.KEY_LOAD_ERROR, fatal: false, frag: this.frag, response: event });
	    }
	  }, {
	    key: 'loadtimeout',
	    value: function loadtimeout() {
	      if (this.loader) {
	        this.loader.abort();
	      }
	      this.hls.trigger(_events2.default.ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: _errors.ErrorDetails.KEY_LOAD_TIMEOUT, fatal: false, frag: this.frag });
	    }
	  }, {
	    key: 'loadprogress',
	    value: function loadprogress() {}
	  }]);

	  return KeyLoader;
	}(_eventHandler2.default);

	exports.default = KeyLoader;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(109);

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _playback = __webpack_require__(38);

	var _playback2 = _interopRequireDefault(_playback);

	var _styler = __webpack_require__(16);

	var _styler2 = _interopRequireDefault(_styler);

	var _style = __webpack_require__(110);

	var _style2 = _interopRequireDefault(_style);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var HTMLImg = function (_Playback) {
	  _inherits(HTMLImg, _Playback);

	  HTMLImg.prototype.getPlaybackType = function getPlaybackType() {
	    return _playback2.default.NO_OP;
	  };

	  _createClass(HTMLImg, [{
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
	        'load': 'onLoad',
	        'abort': 'onError',
	        'error': 'onError'
	      };
	    }
	  }]);

	  function HTMLImg(params) {
	    _classCallCheck(this, HTMLImg);

	    var _this = _possibleConstructorReturn(this, _Playback.call(this, params));

	    _this.el.src = params.src;
	    return _this;
	  }

	  HTMLImg.prototype.render = function render() {
	    var style = _styler2.default.getStyleFor(_style2.default);
	    this.$el.append(style);
	    this.trigger(_events2.default.PLAYBACK_READY, this.name);
	    return this;
	  };

	  HTMLImg.prototype.onLoad = function onLoad(evt) {
	    this.trigger(_events2.default.PLAYBACK_ENDED, this.name);
	  };

	  HTMLImg.prototype.onError = function onError(evt) {
	    var m = evt.type === 'error' ? 'load error' : 'loading aborted';
	    this.trigger(_events2.default.PLAYBACK_ERROR, { message: m }, this.name);
	  };

	  return HTMLImg;
	}(_playback2.default);

	exports.default = HTMLImg;


	HTMLImg.canPlay = function (resource) {
	  return (/\.(png|jpg|jpeg|gif|bmp|tiff|pgm|pnm)(|\?.*)$/i.test(resource)
	  );
	};
	module.exports = exports['default'];

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports


	// module
	exports.push([module.id, "[data-html-img] {\n  max-width: 100%;\n  max-height: 100%; }\n", ""]);

	// exports


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(112);

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	var _playback = __webpack_require__(38);

	var _playback2 = _interopRequireDefault(_playback);

	var _template = __webpack_require__(17);

	var _template2 = _interopRequireDefault(_template);

	var _styler = __webpack_require__(16);

	var _styler2 = _interopRequireDefault(_styler);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _style = __webpack_require__(113);

	var _style2 = _interopRequireDefault(_style);

	var _error = __webpack_require__(114);

	var _error2 = _interopRequireDefault(_error);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NoOp = function (_Playback) {
	  _inherits(NoOp, _Playback);

	  NoOp.prototype.getNoOpMessage = function getNoOpMessage() {
	    var messages = {
	      'en': 'Your browser does not support the playback of this video. Please try using a different browser.',
	      'es': 'Su navegador no soporta la reproducción de un video. Por favor, trate de usar un navegador diferente.',
	      'pt': 'Seu navegador não supporta a reprodução deste video. Por favor, tente usar um navegador diferente.'
	    };
	    messages['en-us'] = messages['en'];
	    messages['es-419'] = messages['es'];
	    messages['pt-br'] = messages['pt'];
	    return messages[(0, _utils.getBrowserLanguage)()] || messages['en'];
	  };

	  _createClass(NoOp, [{
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

	  function NoOp(options) {
	    _classCallCheck(this, NoOp);

	    var _this = _possibleConstructorReturn(this, _Playback.call(this, options));

	    _this.options = options;
	    return _this;
	  }

	  NoOp.prototype.render = function render() {
	    var style = _styler2.default.getStyleFor(_style2.default);
	    this.$el.html(this.template({ message: this.options.playbackNotSupportedMessage || this.getNoOpMessage() }));
	    this.$el.append(style);
	    this.animate();
	    this.trigger(_events2.default.PLAYBACK_READY, this.name);
	    return this;
	  };

	  NoOp.prototype.noise = function noise() {
	    var idata = this.context.createImageData(this.context.canvas.width, this.context.canvas.height);

	    try {
	      var buffer32 = new Uint32Array(idata.data.buffer);
	    } catch (err) {
	      var buffer32 = new Uint32Array(this.context.canvas.width * this.context.canvas.height * 4);
	      var data = idata.data;
	      for (var i = 0; i < data.length; i++) {
	        buffer32[i] = data[i];
	      }
	    }

	    var len = buffer32.length;
	    var run = 0;
	    var color = 0;
	    var m = Math.random() * 6 + 4;

	    for (var i = 0; i < len;) {
	      if (run < 0) {
	        run = m * Math.random();
	        var p = Math.pow(Math.random(), 0.4);
	        color = 255 * p << 24;
	      }
	      run -= 1;
	      buffer32[i++] = color;
	    }
	    this.context.putImageData(idata, 0, 0);
	  };

	  NoOp.prototype.loop = function loop() {
	    var _this2 = this;

	    if (this.stop === true) {
	      return;
	    }
	    this.noise();
	    this.animationHandle = (0, _utils.requestAnimationFrame)(function () {
	      return _this2.loop();
	    });
	  };

	  NoOp.prototype.destroy = function destroy() {
	    if (this.animationHandle) {
	      (0, _utils.cancelAnimationFrame)(this.animationHandle);
	      this.stop = true;
	    }
	  };

	  NoOp.prototype.animate = function animate() {
	    this.canvas = this.$el.find('canvas[data-no-op-canvas]')[0];
	    this.context = this.canvas.getContext('2d');
	    this.loop();
	  };

	  return NoOp;
	}(_playback2.default);

	exports.default = NoOp;


	NoOp.canPlay = function (source) {
	  return true;
	};
	module.exports = exports['default'];

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports


	// module
	exports.push([module.id, "[data-no-op] {\n  z-index: 1000;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  text-align: center; }\n\n[data-no-op] p[data-no-op-msg] {\n  position: absolute;\n  text-align: center;\n  font-size: 25px;\n  top: 40%;\n  left: 0;\n  right: 0;\n  color: white; }\n\n[data-no-op] canvas[data-no-op-canvas] {\n  background-color: #777;\n  height: 100%;\n  width: 100%; }\n", ""]);

	// exports


/***/ },
/* 114 */
/***/ function(module, exports) {

	module.exports = "<canvas data-no-op-canvas></canvas>\n<p data-no-op-msg><%=message%><p>\n";

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(116);

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ui_container_plugin = __webpack_require__(117);

	var _ui_container_plugin2 = _interopRequireDefault(_ui_container_plugin);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _styler = __webpack_require__(16);

	var _styler2 = _interopRequireDefault(_styler);

	var _template = __webpack_require__(17);

	var _template2 = _interopRequireDefault(_template);

	var _spinner = __webpack_require__(118);

	var _spinner2 = _interopRequireDefault(_spinner);

	var _spinner3 = __webpack_require__(119);

	var _spinner4 = _interopRequireDefault(_spinner3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var SpinnerThreeBouncePlugin = function (_UIContainerPlugin) {
	  _inherits(SpinnerThreeBouncePlugin, _UIContainerPlugin);

	  _createClass(SpinnerThreeBouncePlugin, [{
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
	    _classCallCheck(this, SpinnerThreeBouncePlugin);

	    var _this = _possibleConstructorReturn(this, _UIContainerPlugin.call(this, container));

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

	    if (this.showTimeout === null) {
	      this.showTimeout = setTimeout(function () {
	        return _this2.$el.show();
	      }, 300);
	    }
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
	    var style = _styler2.default.getStyleFor(_spinner4.default);
	    this.container.$el.append(style);
	    this.container.$el.append(this.$el);
	    this.$el.hide();
	    if (this.container.buffering) {
	      this.onBuffering();
	    }
	    return this;
	  };

	  return SpinnerThreeBouncePlugin;
	}(_ui_container_plugin2.default);

	exports.default = SpinnerThreeBouncePlugin;
	module.exports = exports['default'];

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	var _ui_object = __webpack_require__(18);

	var _ui_object2 = _interopRequireDefault(_ui_object);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	/**
	 * The base class for an ui container plugin
	 * @class UIContainerPlugin
	 * @constructor
	 * @extends UIObject
	 * @module base
	 */

	var UIContainerPlugin = function (_UIObject) {
	  _inherits(UIContainerPlugin, _UIObject);

	  function UIContainerPlugin(container) {
	    _classCallCheck(this, UIContainerPlugin);

	    var _this = _possibleConstructorReturn(this, _UIObject.call(this, container.options));

	    _this.container = container;
	    _this.enabled = true;
	    _this.bindEvents();
	    return _this;
	  }

	  /**
	   * provides the read-only options to the ui container plugin
	   * @property options
	   * @type Object
	   * @default "`{}`"
	   */


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

	  _createClass(UIContainerPlugin, [{
	    key: 'options',
	    get: function get() {
	      return this.container && this.container.options || {};
	    }
	  }]);

	  return UIContainerPlugin;
	}(_ui_object2.default);

	exports.default = UIContainerPlugin;


	UIContainerPlugin.extend = function (properties) {
	  return (0, _utils.extend)(UIContainerPlugin, properties);
	};

	UIContainerPlugin.type = 'container';
	module.exports = exports['default'];

/***/ },
/* 118 */
/***/ function(module, exports) {

	module.exports = "<div data-bounce1></div><div data-bounce2></div><div data-bounce3></div>\n";

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports


	// module
	exports.push([module.id, ".spinner-three-bounce[data-spinner] {\n  position: absolute;\n  margin: 0 auto;\n  width: 70px;\n  text-align: center;\n  z-index: 999;\n  top: 47%;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto; }\n  .spinner-three-bounce[data-spinner] > div {\n    width: 18px;\n    height: 18px;\n    background-color: #FFFFFF;\n    border-radius: 100%;\n    display: inline-block;\n    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;\n    -moz-animation: bouncedelay 1.4s infinite ease-in-out;\n    -ms-animation: bouncedelay 1.4s infinite ease-in-out;\n    -o-animation: bouncedelay 1.4s infinite ease-in-out;\n    animation: bouncedelay 1.4s infinite ease-in-out;\n    /* Prevent first frame from flickering when animation starts */\n    -webkit-animation-fill-mode: both;\n    -moz-animation-fill-mode: both;\n    -ms-animation-fill-mode: both;\n    -o-animation-fill-mode: both;\n    animation-fill-mode: both; }\n  .spinner-three-bounce[data-spinner] [data-bounce1] {\n    -webkit-animation-delay: -0.32s;\n    -moz-animation-delay: -0.32s;\n    -ms-animation-delay: -0.32s;\n    -o-animation-delay: -0.32s;\n    animation-delay: -0.32s; }\n  .spinner-three-bounce[data-spinner] [data-bounce2] {\n    -webkit-animation-delay: -0.16s;\n    -moz-animation-delay: -0.16s;\n    -ms-animation-delay: -0.16s;\n    -o-animation-delay: -0.16s;\n    animation-delay: -0.16s; }\n\n@-moz-keyframes bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    -moz-transform: scale(0);\n    -ms-transform: scale(0);\n    -o-transform: scale(0);\n    transform: scale(0); }\n  40% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n\n@-webkit-keyframes bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    -moz-transform: scale(0);\n    -ms-transform: scale(0);\n    -o-transform: scale(0);\n    transform: scale(0); }\n  40% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n\n@-o-keyframes bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    -moz-transform: scale(0);\n    -ms-transform: scale(0);\n    -o-transform: scale(0);\n    transform: scale(0); }\n  40% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n\n@-ms-keyframes bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    -moz-transform: scale(0);\n    -ms-transform: scale(0);\n    -o-transform: scale(0);\n    transform: scale(0); }\n  40% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n\n@keyframes bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    -moz-transform: scale(0);\n    -ms-transform: scale(0);\n    -o-transform: scale(0);\n    transform: scale(0); }\n  40% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n", ""]);

	// exports


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(121);

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _container_plugin = __webpack_require__(122);

	var _container_plugin2 = _interopRequireDefault(_container_plugin);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var StatsPlugin = function (_ContainerPlugin) {
	  _inherits(StatsPlugin, _ContainerPlugin);

	  _createClass(StatsPlugin, [{
	    key: 'name',
	    get: function get() {
	      return 'stats';
	    }
	  }]);

	  function StatsPlugin(container) {
	    _classCallCheck(this, StatsPlugin);

	    var _this = _possibleConstructorReturn(this, _ContainerPlugin.call(this, container));

	    _this.setInitialAttrs();
	    _this.reportInterval = _this.options.reportInterval || 5000;
	    _this.state = "IDLE";
	    return _this;
	  }

	  StatsPlugin.prototype.bindEvents = function bindEvents() {
	    this.listenTo(this.container.playback, _events2.default.PLAYBACK_PLAY, this.onPlay);
	    this.listenTo(this.container, _events2.default.CONTAINER_STOP, this.onStop);
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
	    this.state = "PLAYING";
	    this.watchingTimeInit = Date.now();
	    if (!this.intervalId) {
	      this.intervalId = setInterval(this.report.bind(this), this.reportInterval);
	    }
	  };

	  StatsPlugin.prototype.onStop = function onStop() {
	    clearInterval(this.intervalId);
	    this.intervalId = undefined;
	    this.state = "STOPPED";
	  };

	  StatsPlugin.prototype.onBuffering = function onBuffering() {
	    if (this.firstPlay) {
	      this.startupTimeInit = Date.now();
	    } else {
	      this.rebufferingTimeInit = Date.now();
	    }
	    this.state = "BUFFERING";
	    this.rebuffers++;
	  };

	  StatsPlugin.prototype.onBufferFull = function onBufferFull() {
	    if (this.firstPlay && !!this.startupTimeInit) {
	      this.firstPlay = false;
	      this.startupTime = Date.now() - this.startupTimeInit;
	      this.watchingTimeInit = Date.now();
	    } else if (!!this.rebufferingTimeInit) {
	      this.rebufferingTime += this.getRebufferingTime();
	    }
	    this.rebufferingTimeInit = undefined;
	    this.state = "PLAYING";
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
	}(_container_plugin2.default);

	exports.default = StatsPlugin;
	module.exports = exports['default'];

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base_object = __webpack_require__(5);

	var _base_object2 = _interopRequireDefault(_base_object);

	var _utils = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * The base class for a container plugin
	 * @class ContainerPlugin
	 * @constructor
	 * @extends UIObject
	 * @module base
	 */

	var ContainerPlugin = function (_BaseObject) {
	  _inherits(ContainerPlugin, _BaseObject);

	  function ContainerPlugin(container) {
	    _classCallCheck(this, ContainerPlugin);

	    var _this = _possibleConstructorReturn(this, _BaseObject.call(this, container.options));

	    _this.container = container;
	    _this.enabled = true;
	    _this.bindEvents();
	    return _this;
	  }

	  /**
	   * provides the read-only options to the container plugin
	   * @property options
	   * @type Object
	   * @default "`{}`"
	   */


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

	  _createClass(ContainerPlugin, [{
	    key: 'options',
	    get: function get() {
	      return this.container && this.container.options || {};
	    }
	  }]);

	  return ContainerPlugin;
	}(_base_object2.default);

	exports.default = ContainerPlugin;


	ContainerPlugin.extend = function (properties) {
	  return (0, _utils.extend)(ContainerPlugin, properties);
	};

	ContainerPlugin.type = 'container';
	module.exports = exports['default'];

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(124);

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ui_container_plugin = __webpack_require__(117);

	var _ui_container_plugin2 = _interopRequireDefault(_ui_container_plugin);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _styler = __webpack_require__(16);

	var _styler2 = _interopRequireDefault(_styler);

	var _template = __webpack_require__(17);

	var _template2 = _interopRequireDefault(_template);

	var _watermark = __webpack_require__(125);

	var _watermark2 = _interopRequireDefault(_watermark);

	var _watermark3 = __webpack_require__(126);

	var _watermark4 = _interopRequireDefault(_watermark3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var WaterMarkPlugin = function (_UIContainerPlugin) {
	  _inherits(WaterMarkPlugin, _UIContainerPlugin);

	  _createClass(WaterMarkPlugin, [{
	    key: 'name',
	    get: function get() {
	      return 'watermark';
	    }
	  }, {
	    key: 'template',
	    get: function get() {
	      return (0, _template2.default)(_watermark4.default);
	    }
	  }]);

	  function WaterMarkPlugin(container) {
	    _classCallCheck(this, WaterMarkPlugin);

	    var _this = _possibleConstructorReturn(this, _UIContainerPlugin.call(this, container));

	    _this.configure();
	    return _this;
	  }

	  WaterMarkPlugin.prototype.bindEvents = function bindEvents() {
	    this.listenTo(this.container, _events2.default.CONTAINER_PLAY, this.onPlay);
	    this.listenTo(this.container, _events2.default.CONTAINER_STOP, this.onStop);
	    this.listenTo(this.container, _events2.default.CONTAINER_OPTIONS_CHANGE, this.configure);
	  };

	  WaterMarkPlugin.prototype.configure = function configure() {
	    this.position = this.options.position || "bottom-right";
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
	    var style = _styler2.default.getStyleFor(_watermark2.default);
	    this.container.$el.append(style);
	    this.container.$el.append(this.$el);
	    return this;
	  };

	  return WaterMarkPlugin;
	}(_ui_container_plugin2.default);

	exports.default = WaterMarkPlugin;
	module.exports = exports['default'];

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports


	// module
	exports.push([module.id, "[data-watermark] {\n  position: absolute;\n  min-width: 70px;\n  max-width: 200px;\n  width: 12%;\n  text-align: center;\n  z-index: 10; }\n\n[data-watermark] a {\n  outline: none;\n  cursor: pointer; }\n\n[data-watermark] img {\n  max-width: 100%; }\n\n[data-watermark-bottom-left] {\n  bottom: 10px;\n  left: 10px; }\n\n[data-watermark-bottom-right] {\n  bottom: 10px;\n  right: 42px; }\n\n[data-watermark-top-left] {\n  top: 10px;\n  left: 10px; }\n\n[data-watermark-top-right] {\n  top: 10px;\n  right: 37px; }\n", ""]);

	// exports


/***/ },
/* 126 */
/***/ function(module, exports) {

	module.exports = "<div data-watermark data-watermark-<%=position %>>\n<% if(typeof imageLink !== 'undefined') { %>\n<a target=_blank href=\"<%= imageLink %>\">\n<% } %>\n<img src=\"<%= imageUrl %>\">\n<% if(typeof imageLink !== 'undefined') { %>\n</a>\n<% } %>\n</div>\n";

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(128);

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ui_container_plugin = __webpack_require__(117);

	var _ui_container_plugin2 = _interopRequireDefault(_ui_container_plugin);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _styler = __webpack_require__(16);

	var _styler2 = _interopRequireDefault(_styler);

	var _template = __webpack_require__(17);

	var _template2 = _interopRequireDefault(_template);

	var _mediator = __webpack_require__(37);

	var _mediator2 = _interopRequireDefault(_mediator);

	var _poster = __webpack_require__(129);

	var _poster2 = _interopRequireDefault(_poster);

	var _poster3 = __webpack_require__(130);

	var _poster4 = _interopRequireDefault(_poster3);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var PosterPlugin = function (_UIContainerPlugin) {
	  _inherits(PosterPlugin, _UIContainerPlugin);

	  _createClass(PosterPlugin, [{
	    key: 'name',
	    get: function get() {
	      return 'poster';
	    }
	  }, {
	    key: 'template',
	    get: function get() {
	      return (0, _template2.default)(_poster4.default);
	    }
	  }, {
	    key: 'shouldRender',
	    get: function get() {
	      return this.container.playback.name !== 'html_img';
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
	  }]);

	  function PosterPlugin(container) {
	    _classCallCheck(this, PosterPlugin);

	    var _this = _possibleConstructorReturn(this, _UIContainerPlugin.call(this, container));

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
	    this.listenTo(this.container, _events2.default.CONTAINER_ENDED, this.onStop);
	    this.listenTo(this.container, _events2.default.CONTAINER_STATE_BUFFERING, this.update);
	    this.listenTo(this.container, _events2.default.CONTAINER_STATE_BUFFERFULL, this.update);
	    this.listenTo(this.container, _events2.default.CONTAINER_OPTIONS_CHANGE, this.render);
	    _mediator2.default.on(this.options.playerId + ':' + _events2.default.PLAYER_RESIZE, this.updateSize, this);
	  };

	  PosterPlugin.prototype.stopListening = function stopListening() {
	    _UIContainerPlugin.prototype.stopListening.call(this);
	    _mediator2.default.off(this.options.playerId + ':' + _events2.default.PLAYER_RESIZE, this.updateSize, this);
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
	      this.$el.addClass("clickable");
	      this.updateSize();
	    } else {
	      this.$playButton.hide();
	      this.$el.removeClass("clickable");
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

	  PosterPlugin.prototype.updateSize = function updateSize() {
	    if (!this.shouldRender) {
	      return;
	    }
	    var height = this.$el.height();
	    this.$el.css({ fontSize: height });
	    if (!this.playRequested && !this.hasStartedPlaying) {
	      this.$playWrapper.css({ marginTop: -(this.$playWrapper.height() / 2) });
	    }
	  };

	  PosterPlugin.prototype.shouldHideOnPlay = function shouldHideOnPlay() {
	    // Audio broadcasts should keep the poster up; video should hide poster while playing.
	    return !(this.container.playback.name == 'html5_audio' || this.options.audioOnly);
	  };

	  PosterPlugin.prototype.update = function update() {
	    if (!this.shouldRender) {
	      return;
	    }
	    if (!this.hasStartedPlaying) {
	      this.container.disableMediaControl();
	      this.$el.show();
	      var showPlayButton = !this.playRequested && !this.container.buffering;
	      this.showPlayButton(showPlayButton);
	    } else {
	      this.container.enableMediaControl();
	      if (this.shouldHideOnPlay()) {
	        this.$el.hide();
	      }
	    }
	  };

	  PosterPlugin.prototype.render = function render() {
	    if (!this.shouldRender) {
	      return;
	    }
	    var style = _styler2.default.getStyleFor(_poster2.default, { baseUrl: this.options.baseUrl });
	    this.$el.html(this.template());
	    this.$el.append(style);
	    if (this.options.poster) {
	      var imgEl = (0, _clapprZepto2.default)('<div data-poster class="poster-background"></div>');
	      imgEl.css({ 'background-image': 'url(' + this.options.poster + ')' });
	      this.$el.prepend(imgEl);
	    }
	    this.container.$el.append(this.el);
	    this.$playButton = this.$el.find('.poster-icon');
	    this.$playWrapper = this.$el.find('.play-wrapper');
	    if (this.options.mediacontrol && this.options.mediacontrol.buttons) {
	      var buttonsColor = this.options.mediacontrol.buttons;
	      this.$playButton.css('color', buttonsColor);
	    }
	    this.update();
	    return this;
	  };

	  return PosterPlugin;
	}(_ui_container_plugin2.default);

	exports.default = PosterPlugin;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36)))

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports


	// module
	exports.push([module.id, "@font-face {\n  font-family: \"Player\";\n  src: url(" + __webpack_require__(40) + ");\n  src: url(" + __webpack_require__(40) + "?#iefix) format(\"embedded-opentype\"), url(" + __webpack_require__(41) + ") format(\"truetype\"), url(" + __webpack_require__(42) + "#player) format(\"svg\"); }\n\n.player-poster[data-poster] {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  z-index: 998;\n  top: 0;\n  left: 0; }\n  .player-poster[data-poster].clickable {\n    cursor: pointer; }\n  .player-poster[data-poster] .poster-background[data-poster] {\n    width: 100%;\n    height: 100%;\n    background-color: #000;\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-position: 50% 50%; }\n  .player-poster[data-poster] .play-wrapper[data-poster] {\n    position: absolute;\n    width: 100%;\n    height: 25%;\n    line-height: 100%;\n    font-size: 25%;\n    top: 50%;\n    text-align: center; }\n    .player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster] {\n      font-family: \"Player\";\n      font-weight: normal;\n      font-style: normal;\n      line-height: 1;\n      letter-spacing: 0;\n      speak: none;\n      color: white;\n      opacity: 0.75;\n      -webkit-font-smoothing: antialiased;\n      -moz-osx-font-smoothing: grayscale;\n      -webkit-transition: opacity text-shadow 0.1s;\n      -webkit-transition-delay: ease;\n      -moz-transition: opacity text-shadow 0.1s ease;\n      -o-transition: opacity text-shadow 0.1s ease;\n      transition: opacity text-shadow 0.1s ease; }\n      .player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster].play[data-poster]:before {\n        content: \"\\E001\"; }\n      .player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster]:hover {\n        opacity: 1.0;\n        text-shadow: rgba(255, 255, 255, 0.8) 0 0 15px; }\n", ""]);

	// exports


/***/ },
/* 130 */
/***/ function(module, exports) {

	module.exports = "<div class=\"play-wrapper\" data-poster>\n  <span class=\"poster-icon play\" data-poster />\n</div>\n";

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(132);

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _container_plugin = __webpack_require__(122);

	var _container_plugin2 = _interopRequireDefault(_container_plugin);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var GoogleAnalytics = function (_ContainerPlugin) {
	  _inherits(GoogleAnalytics, _ContainerPlugin);

	  _createClass(GoogleAnalytics, [{
	    key: 'name',
	    get: function get() {
	      return 'google_analytics';
	    }
	  }]);

	  function GoogleAnalytics(container) {
	    _classCallCheck(this, GoogleAnalytics);

	    var _this = _possibleConstructorReturn(this, _ContainerPlugin.call(this, container));

	    if (_this.container.options.gaAccount) {
	      _this.account = _this.container.options.gaAccount;
	      _this.trackerName = _this.container.options.gaTrackerName ? _this.container.options.gaTrackerName + "." : 'Clappr.';
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
	      script.setAttribute("type", "text/javascript");
	      script.setAttribute("async", "async");
	      script.setAttribute("src", "//www.google-analytics.com/ga.js");
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
	      this.listenTo(this.container, _events2.default.CONTAINER_ENDED, this.onEnded);
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
	    if (!!this.domainName) _gaq.push([this.trackerName + '_setDomainName', this.domainName]);
	  };

	  GoogleAnalytics.prototype.onReady = function onReady() {
	    this.push(["Video", "Playback", this.container.playback.name]);
	  };

	  GoogleAnalytics.prototype.onPlay = function onPlay() {
	    this.push(["Video", "Play", this.container.playback.src]);
	  };

	  GoogleAnalytics.prototype.onStop = function onStop() {
	    this.push(["Video", "Stop", this.container.playback.src]);
	  };

	  GoogleAnalytics.prototype.onEnded = function onEnded() {
	    this.push(["Video", "Ended", this.container.playback.src]);
	  };

	  GoogleAnalytics.prototype.onBuffering = function onBuffering() {
	    this.push(["Video", "Buffering", this.container.playback.src]);
	  };

	  GoogleAnalytics.prototype.onBufferFull = function onBufferFull() {
	    this.push(["Video", "Bufferfull", this.container.playback.src]);
	  };

	  GoogleAnalytics.prototype.onError = function onError() {
	    this.push(["Video", "Error", this.container.playback.src]);
	  };

	  GoogleAnalytics.prototype.onHD = function onHD(isHD) {
	    var status = isHD ? "ON" : "OFF";
	    if (status !== this.currentHDState) {
	      this.currentHDState = status;
	      this.push(["Video", "HD - " + status, this.container.playback.src]);
	    }
	  };

	  GoogleAnalytics.prototype.onPlaybackChanged = function onPlaybackChanged(playbackState) {
	    if (playbackState.type !== null) {
	      this.push(["Video", "Playback Type - " + playbackState.type, this.container.playback.src]);
	    }
	  };

	  GoogleAnalytics.prototype.onDVR = function onDVR(dvrInUse) {
	    var status = dvrInUse ? "ON" : "OFF";
	    this.push(["Interaction", "DVR - " + status, this.container.playback.src]);
	  };

	  GoogleAnalytics.prototype.onPause = function onPause() {
	    this.push(["Video", "Pause", this.container.playback.src]);
	  };

	  GoogleAnalytics.prototype.onSeek = function onSeek() {
	    this.push(["Video", "Seek", this.container.playback.src]);
	  };

	  GoogleAnalytics.prototype.onVolumeChanged = function onVolumeChanged() {
	    this.push(["Interaction", "Volume", this.container.playback.src]);
	  };

	  GoogleAnalytics.prototype.onFullscreen = function onFullscreen() {
	    this.push(["Interaction", "Fullscreen", this.container.playback.src]);
	  };

	  GoogleAnalytics.prototype.push = function push(array) {
	    var res = [this.trackerName + "_trackEvent"].concat(array);
	    _gaq.push(res);
	  };

	  return GoogleAnalytics;
	}(_container_plugin2.default);

	exports.default = GoogleAnalytics;
	module.exports = exports['default'];

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(134);

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _container_plugin = __webpack_require__(122);

	var _container_plugin2 = _interopRequireDefault(_container_plugin);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _playback = __webpack_require__(38);

	var _playback2 = _interopRequireDefault(_playback);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var ClickToPausePlugin = function (_ContainerPlugin) {
	  _inherits(ClickToPausePlugin, _ContainerPlugin);

	  _createClass(ClickToPausePlugin, [{
	    key: 'name',
	    get: function get() {
	      return 'click_to_pause';
	    }
	  }]);

	  function ClickToPausePlugin(container) {
	    _classCallCheck(this, ClickToPausePlugin);

	    return _possibleConstructorReturn(this, _ContainerPlugin.call(this, container));
	  }

	  ClickToPausePlugin.prototype.bindEvents = function bindEvents() {
	    this.listenTo(this.container, _events2.default.CONTAINER_CLICK, this.click);
	    this.listenTo(this.container, _events2.default.CONTAINER_SETTINGSUPDATE, this.settingsUpdate);
	  };

	  ClickToPausePlugin.prototype.click = function click() {
	    if (this.container.getPlaybackType() !== _playback2.default.LIVE || this.container.isDvrEnabled()) {
	      if (this.container.isPlaying()) {
	        this.container.pause();
	      } else {
	        this.container.play();
	      }
	    }
	  };

	  ClickToPausePlugin.prototype.settingsUpdate = function settingsUpdate() {
	    this.container.$el.removeClass('pointer-enabled');
	    if (this.container.getPlaybackType() !== _playback2.default.LIVE || this.container.isDvrEnabled()) {
	      this.container.$el.addClass('pointer-enabled');
	    }
	  };

	  return ClickToPausePlugin;
	}(_container_plugin2.default);

	exports.default = ClickToPausePlugin;
	module.exports = exports['default'];

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(136);

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ui_core_plugin = __webpack_require__(137);

	var _ui_core_plugin2 = _interopRequireDefault(_ui_core_plugin);

	var _template = __webpack_require__(17);

	var _template2 = _interopRequireDefault(_template);

	var _playback = __webpack_require__(38);

	var _playback2 = _interopRequireDefault(_playback);

	var _styler = __webpack_require__(16);

	var _styler2 = _interopRequireDefault(_styler);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _dvr_controls = __webpack_require__(138);

	var _dvr_controls2 = _interopRequireDefault(_dvr_controls);

	var _index = __webpack_require__(140);

	var _index2 = _interopRequireDefault(_index);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DVRControls = function (_UICorePlugin) {
	  _inherits(DVRControls, _UICorePlugin);

	  _createClass(DVRControls, [{
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
	    _classCallCheck(this, DVRControls);

	    var _this = _possibleConstructorReturn(this, _UICorePlugin.call(this, core));

	    _this.core = core;
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
	    if (!container.isPlaying()) {
	      container.play();
	    }
	    if (mediaControl.$el.hasClass('dvr')) {
	      container.seek(container.getDuration());
	    }
	  };

	  DVRControls.prototype.settingsUpdate = function settingsUpdate() {
	    var _this2 = this;

	    this.stopListening();
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
	    this.style = this.style || _styler2.default.getStyleFor(_dvr_controls2.default, { baseUrl: this.core.options.baseUrl });
	    this.$el.html(this.template());
	    this.$el.append(this.style);
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

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(2);

	var _ui_object = __webpack_require__(18);

	var _ui_object2 = _interopRequireDefault(_ui_object);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var UICorePlugin = function (_UIObject) {
	  _inherits(UICorePlugin, _UIObject);

	  function UICorePlugin(core) {
	    _classCallCheck(this, UICorePlugin);

	    var _this = _possibleConstructorReturn(this, _UIObject.call(this, core));

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

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports


	// module
	exports.push([module.id, "@font-face {\n  font-family: \"Roboto\";\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Roboto\"), local(\"Roboto-Regular\"), url(" + __webpack_require__(139) + ") format(\"truetype\"); }\n\n.dvr-controls[data-dvr-controls] {\n  display: inline-block;\n  float: left;\n  color: #fff;\n  line-height: 32px;\n  font-size: 10px;\n  font-weight: bold;\n  margin-left: 6px; }\n  .dvr-controls[data-dvr-controls] .live-info {\n    cursor: default;\n    font-family: \"Roboto\", \"Open Sans\", Arial, sans-serif; }\n    .dvr-controls[data-dvr-controls] .live-info:before {\n      content: \"\";\n      display: inline-block;\n      position: relative;\n      width: 7px;\n      height: 7px;\n      border-radius: 3.5px;\n      margin-right: 3.5px;\n      background-color: #ff0101; }\n    .dvr-controls[data-dvr-controls] .live-info.disabled {\n      opacity: 0.3; }\n      .dvr-controls[data-dvr-controls] .live-info.disabled:before {\n        background-color: #fff; }\n  .dvr-controls[data-dvr-controls] .live-button {\n    cursor: pointer;\n    outline: none;\n    display: none;\n    border: 0;\n    color: #fff;\n    background-color: transparent;\n    height: 32px;\n    padding: 0;\n    opacity: 0.7;\n    font-family: \"Roboto\", \"Open Sans\", Arial, sans-serif;\n    -webkit-transition: all 0.1s ease;\n    -moz-transition: all 0.1s ease false;\n    -o-transition: all 0.1s ease false;\n    transition: all 0.1s ease; }\n    .dvr-controls[data-dvr-controls] .live-button:before {\n      content: \"\";\n      display: inline-block;\n      position: relative;\n      width: 7px;\n      height: 7px;\n      border-radius: 3.5px;\n      margin-right: 3.5px;\n      background-color: #fff; }\n    .dvr-controls[data-dvr-controls] .live-button:hover {\n      opacity: 1;\n      text-shadow: rgba(255, 255, 255, 0.75) 0 0 5px; }\n\n.dvr .dvr-controls[data-dvr-controls] .live-info {\n  display: none; }\n\n.dvr .dvr-controls[data-dvr-controls] .live-button {\n  display: block; }\n\n.dvr.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar] {\n  background-color: #005aff; }\n\n.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar] {\n  background-color: #ff0101; }\n", ""]);

	// exports


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "38861cba61c66739c1452c3a71e39852.ttf";

/***/ },
/* 140 */
/***/ function(module, exports) {

	module.exports = "<div class=\"live-info\">LIVE</div>\n<button class=\"live-button\">BACK TO LIVE</button>\n";

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(142);

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _core_plugin = __webpack_require__(143);

	var _core_plugin2 = _interopRequireDefault(_core_plugin);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Favicon = function (_CorePlugin) {
	  _inherits(Favicon, _CorePlugin);

	  _createClass(Favicon, [{
	    key: 'name',
	    get: function get() {
	      return 'favicon';
	    }
	  }]);

	  function Favicon(core) {
	    _classCallCheck(this, Favicon);

	    var _this = _possibleConstructorReturn(this, _CorePlugin.call(this, core));

	    _this.oldIcon = (0, _clapprZepto2.default)('link[rel="shortcut icon"]');
	    _this.configure();
	    return _this;
	  }

	  Favicon.prototype.configure = function configure() {
	    if (!this.core.options.changeFavicon) {
	      this.disable();
	      this.listenTo(this.core, _events2.default.CORE_OPTIONS_CHANGE, this.configure);
	    } else {
	      this.stopListening(this.core, _events2.default.CORE_OPTIONS_CHANGE);
	      this.enable();
	    }
	  };

	  Favicon.prototype.bindEvents = function bindEvents() {
	    this.listenTo(this.core, _events2.default.CORE_OPTIONS_CHANGE, this.configure);
	    this.listenTo(this.core.mediaControl, _events2.default.MEDIACONTROL_CONTAINERCHANGED, this.containerChanged);
	    if (this.core.mediaControl.container) {
	      this.containerChanged();
	    }
	  };

	  Favicon.prototype.containerChanged = function containerChanged() {
	    this.listenTo(this.core.mediaControl.container, _events2.default.CONTAINER_PLAY, this.setPlayIcon);
	    this.listenTo(this.core.mediaControl.container, _events2.default.CONTAINER_PAUSE, this.setPauseIcon);
	    this.listenTo(this.core.mediaControl.container, _events2.default.CONTAINER_STOP, this.resetIcon);
	    this.listenTo(this.core.mediaControl.container, _events2.default.CONTAINER_ENDED, this.resetIcon);
	    this.listenTo(this.core.mediaControl.container, _events2.default.CONTAINER_ERROR, this.resetIcon);
	  };

	  Favicon.prototype.disable = function disable() {
	    _CorePlugin.prototype.disable.call(this);
	    this.resetIcon();
	  };

	  Favicon.prototype.createIcon = function createIcon(charCode) {
	    var canvas = (0, _clapprZepto2.default)('<canvas/>');
	    canvas[0].width = 32;
	    canvas[0].height = 32;
	    var ctx = canvas[0].getContext('2d');
	    ctx.fillStyle = '#000';
	    ctx.font = '25px Player';
	    ctx.fillText(String.fromCharCode(charCode), 5, 26);
	    var icon = (0, _clapprZepto2.default)('<link rel="shortcut icon" type="image/png"/>');
	    icon.attr('href', canvas[0].toDataURL('image/png'));
	    return icon;
	  };

	  Favicon.prototype.setPlayIcon = function setPlayIcon() {
	    if (!this.playIcon) {
	      this.playIcon = this.createIcon(0xe001);
	    }
	    this.changeIcon(this.playIcon);
	  };

	  Favicon.prototype.setPauseIcon = function setPauseIcon() {
	    if (!this.pauseIcon) {
	      this.pauseIcon = this.createIcon(0xe002);
	    }
	    this.changeIcon(this.pauseIcon);
	  };

	  Favicon.prototype.resetIcon = function resetIcon() {
	    if (this.currentIcon) {
	      this.currentIcon.remove();
	    }
	    (0, _clapprZepto2.default)('head').append(this.oldIcon);
	  };

	  Favicon.prototype.changeIcon = function changeIcon(icon) {
	    if (icon) {
	      this.oldIcon.remove();
	      if (this.currentIcon) {
	        this.currentIcon.remove();
	      }
	      this.currentIcon = icon;
	      (0, _clapprZepto2.default)('head').append(icon);
	    }
	  };

	  return Favicon;
	}(_core_plugin2.default);

	exports.default = Favicon;
	module.exports = exports['default'];

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(2);

	var _base_object = __webpack_require__(5);

	var _base_object2 = _interopRequireDefault(_base_object);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CorePlugin = function (_BaseObject) {
	  _inherits(CorePlugin, _BaseObject);

	  function CorePlugin(core) {
	    _classCallCheck(this, CorePlugin);

	    var _this = _possibleConstructorReturn(this, _BaseObject.call(this, core));

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

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(145);

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	var _ui_core_plugin = __webpack_require__(137);

	var _ui_core_plugin2 = _interopRequireDefault(_ui_core_plugin);

	var _styler = __webpack_require__(16);

	var _styler2 = _interopRequireDefault(_styler);

	var _template = __webpack_require__(17);

	var _template2 = _interopRequireDefault(_template);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _playback = __webpack_require__(38);

	var _playback2 = _interopRequireDefault(_playback);

	var _seek_time = __webpack_require__(146);

	var _seek_time2 = _interopRequireDefault(_seek_time);

	var _seek_time3 = __webpack_require__(147);

	var _seek_time4 = _interopRequireDefault(_seek_time3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	var SeekTime = function (_UICorePlugin) {
	  _inherits(SeekTime, _UICorePlugin);

	  _createClass(SeekTime, [{
	    key: 'name',
	    get: function get() {
	      return 'seek_time';
	    }
	  }, {
	    key: 'template',
	    get: function get() {
	      return (0, _template2.default)(_seek_time4.default);
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
	    _classCallCheck(this, SeekTime);

	    var _this = _possibleConstructorReturn(this, _UICorePlugin.call(this, core));

	    _this.hoveringOverSeekBar = false;
	    _this.hoverPosition = null;
	    _this.duration = null;
	    _this.actualLiveTime = !!_this.mediaControl.options.actualLiveTime;
	    if (_this.actualLiveTime) {
	      if (!!_this.mediaControl.options.actualLiveServerTime) {
	        _this.actualLiveServerTimeDiff = new Date().getTime() - new Date(_this.mediaControl.options.actualLiveServerTime).getTime();
	      } else {
	        _this.actualLiveServerTimeDiff = 0;
	      }
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
	    var seekTime = null;
	    if (this.useActualLiveTime) {
	      var d = new Date(new Date().getTime() - this.actualLiveServerTimeDiff),
	          e = new Date(d);
	      var secondsSinceMidnight = (e - d.setHours(0, 0, 0, 0)) / 1000;
	      seekTime = secondsSinceMidnight - this.duration + this.hoverPosition * this.duration;
	      if (seekTime < 0) {
	        seekTime += 86400;
	      }
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
	      this.$el.css('left', "-100%");
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
	    var style = _styler2.default.getStyleFor(_seek_time2.default);
	    this.$el.html(this.template());
	    this.$el.append(style);
	    this.$el.hide();
	    this.mediaControl.$el.append(this.el);
	    this.$seekTimeEl = this.$el.find('[data-seek-time]');
	    this.$durationEl = this.$el.find('[data-duration]');
	    this.$durationEl.hide();
	    this.update();
	  };

	  return SeekTime;
	}(_ui_core_plugin2.default);

	exports.default = SeekTime;
	module.exports = exports['default'];

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports


	// module
	exports.push([module.id, ".seek-time[data-seek-time] {\n  position: absolute;\n  white-space: nowrap;\n  width: auto;\n  height: 20px;\n  line-height: 20px;\n  left: -100%;\n  bottom: 55px;\n  background-color: rgba(2, 2, 2, 0.5);\n  z-index: 9999;\n  -webkit-transition: opacity 0.1s ease;\n  -moz-transition: opacity 0.1s ease false;\n  -o-transition: opacity 0.1s ease false;\n  transition: opacity 0.1s ease; }\n  .seek-time[data-seek-time].hidden[data-seek-time] {\n    opacity: 0; }\n  .seek-time[data-seek-time] span[data-seek-time] {\n    position: relative;\n    color: white;\n    font-size: 10px;\n    padding-left: 7px;\n    padding-right: 7px; }\n  .seek-time[data-seek-time] span[data-duration] {\n    position: relative;\n    color: rgba(255, 255, 255, 0.5);\n    font-size: 10px;\n    padding-right: 7px; }\n    .seek-time[data-seek-time] span[data-duration]:before {\n      content: \"|\";\n      margin-right: 7px; }\n", ""]);

	// exports


/***/ },
/* 147 */
/***/ function(module, exports) {

	module.exports = "<span data-seek-time></span>\n<span data-duration></span>\n";

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _core_plugin = __webpack_require__(143);

	var _core_plugin2 = _interopRequireDefault(_core_plugin);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _lodash = __webpack_require__(29);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SourcesPlugin = function (_CorePlugin) {
	  _inherits(SourcesPlugin, _CorePlugin);

	  function SourcesPlugin() {
	    _classCallCheck(this, SourcesPlugin);

	    return _possibleConstructorReturn(this, _CorePlugin.apply(this, arguments));
	  }

	  SourcesPlugin.prototype.bindEvents = function bindEvents() {
	    this.listenToOnce(this.core, _events2.default.CORE_CONTAINERS_CREATED, this.onContainersCreated);
	  };

	  SourcesPlugin.prototype.onContainersCreated = function onContainersCreated() {
	    var _this2 = this;

	    var firstValidSource = (0, _lodash2.default)(this.core.containers, function (container) {
	      return container.playback.name !== 'no_op' || _this2.core.containers[0];
	    });
	    if (firstValidSource) {
	      this.core.containers.forEach(function (container) {
	        if (container !== firstValidSource) {
	          container.destroy();
	        }
	      });
	    }
	  };

	  _createClass(SourcesPlugin, [{
	    key: 'name',
	    get: function get() {
	      return 'sources';
	    }
	  }]);

	  return SourcesPlugin;
	}(_core_plugin2.default);

	exports.default = SourcesPlugin;
	module.exports = exports['default'];

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _core_plugin = __webpack_require__(143);

	var _core_plugin2 = _interopRequireDefault(_core_plugin);

	var _utils = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var EndVideo = function (_CorePlugin) {
	  _inherits(EndVideo, _CorePlugin);

	  function EndVideo() {
	    _classCallCheck(this, EndVideo);

	    return _possibleConstructorReturn(this, _CorePlugin.apply(this, arguments));
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
	    var exitOnEnd = typeof this.core.options.exitFullscreenOnEnd === "undefined" || this.core.options.exitFullscreenOnEnd;
	    if (exitOnEnd && _utils.Fullscreen.isFullscreen()) {
	      this.core.toggleFullscreen();
	    }
	  };

	  _createClass(EndVideo, [{
	    key: 'name',
	    get: function get() {
	      return 'end_video';
	    }
	  }]);

	  return EndVideo;
	}(_core_plugin2.default);

	exports.default = EndVideo;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;