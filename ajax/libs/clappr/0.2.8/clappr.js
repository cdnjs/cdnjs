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

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _componentsPlayer = __webpack_require__(1);

	var _componentsPlayer2 = _interopRequireDefault(_componentsPlayer);

	var _baseUtils = __webpack_require__(2);

	var _baseUtils2 = _interopRequireDefault(_baseUtils);

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _basePlayback = __webpack_require__(96);

	var _basePlayback2 = _interopRequireDefault(_basePlayback);

	var _baseContainer_plugin = __webpack_require__(126);

	var _baseContainer_plugin2 = _interopRequireDefault(_baseContainer_plugin);

	var _baseCore_plugin = __webpack_require__(157);

	var _baseCore_plugin2 = _interopRequireDefault(_baseCore_plugin);

	var _baseUi_core_plugin = __webpack_require__(141);

	var _baseUi_core_plugin2 = _interopRequireDefault(_baseUi_core_plugin);

	var _baseUi_container_plugin = __webpack_require__(121);

	var _baseUi_container_plugin2 = _interopRequireDefault(_baseUi_container_plugin);

	var _baseBase_object = __webpack_require__(15);

	var _baseBase_object2 = _interopRequireDefault(_baseBase_object);

	var _baseUi_object = __webpack_require__(27);

	var _baseUi_object2 = _interopRequireDefault(_baseUi_object);

	var _componentsBrowser = __webpack_require__(14);

	var _componentsBrowser2 = _interopRequireDefault(_componentsBrowser);

	var _componentsContainer = __webpack_require__(32);

	var _componentsContainer2 = _interopRequireDefault(_componentsContainer);

	var _componentsCore = __webpack_require__(24);

	var _componentsCore2 = _interopRequireDefault(_componentsCore);

	var _componentsMediator = __webpack_require__(64);

	var _componentsMediator2 = _interopRequireDefault(_componentsMediator);

	var _componentsMedia_control = __webpack_require__(58);

	var _componentsMedia_control2 = _interopRequireDefault(_componentsMedia_control);

	var _componentsPlayer_info = __webpack_require__(65);

	var _componentsPlayer_info2 = _interopRequireDefault(_componentsPlayer_info);

	var _playbacksFlash = __webpack_require__(99);

	var _playbacksFlash2 = _interopRequireDefault(_playbacksFlash);

	var _playbacksHls = __webpack_require__(106);

	var _playbacksHls2 = _interopRequireDefault(_playbacksHls);

	var _playbacksHtml5_audio = __webpack_require__(104);

	var _playbacksHtml5_audio2 = _interopRequireDefault(_playbacksHtml5_audio);

	var _playbacksHtml5_video = __webpack_require__(93);

	var _playbacksHtml5_video2 = _interopRequireDefault(_playbacksHtml5_video);

	var _playbacksHtml_img = __webpack_require__(112);

	var _playbacksHtml_img2 = _interopRequireDefault(_playbacksHtml_img);

	var _pluginsPoster = __webpack_require__(131);

	var _pluginsPoster2 = _interopRequireDefault(_pluginsPoster);

	var _pluginsLog = __webpack_require__(19);

	var _pluginsLog2 = _interopRequireDefault(_pluginsLog);

	window.DEBUG = false;

	var version = ("0.2.8");

	exports['default'] = {
	    Player: _componentsPlayer2['default'],
	    Mediator: _componentsMediator2['default'],
	    Events: _baseEvents2['default'],
	    Browser: _componentsBrowser2['default'],
	    PlayerInfo: _componentsPlayer_info2['default'],
	    MediaControl: _componentsMedia_control2['default'],
	    ContainerPlugin: _baseContainer_plugin2['default'],
	    UIContainerPlugin: _baseUi_container_plugin2['default'],
	    CorePlugin: _baseCore_plugin2['default'],
	    UICorePlugin: _baseUi_core_plugin2['default'],
	    Playback: _basePlayback2['default'],
	    Container: _componentsContainer2['default'],
	    Core: _componentsCore2['default'],
	    BaseObject: _baseBase_object2['default'],
	    UIObject: _baseUi_object2['default'],
	    Utils: _baseUtils2['default'],
	    Flash: _playbacksFlash2['default'],
	    HLS: _playbacksHls2['default'],
	    HTML5Audio: _playbacksHtml5_audio2['default'],
	    HTML5Video: _playbacksHtml5_video2['default'],
	    HTMLImg: _playbacksHtml_img2['default'],
	    Poster: _pluginsPoster2['default'],
	    Log: _pluginsLog2['default'],
	    version: version
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUtils = __webpack_require__(2);

	var _baseBase_object = __webpack_require__(15);

	var _baseBase_object2 = _interopRequireDefault(_baseBase_object);

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _core_factory = __webpack_require__(22);

	var _core_factory2 = _interopRequireDefault(_core_factory);

	var _loader = __webpack_require__(72);

	var _loader2 = _interopRequireDefault(_loader);

	var _lodashAssign = __webpack_require__(3);

	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);

	var _lodashFind = __webpack_require__(38);

	var _lodashFind2 = _interopRequireDefault(_lodashFind);

	var _player_info = __webpack_require__(65);

	var _player_info2 = _interopRequireDefault(_player_info);

	var baseUrl = (0, _baseUtils.currentScriptUrl)().replace(/\/[^\/]+$/, "");

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

	var Player = (function (_BaseObject) {
	  _inherits(Player, _BaseObject);

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
	   * @param {Boolean} [options.autoPlay]
	   * automatically play after page load **default**: `false`
	   * @param {Boolean} [options.loop]
	   * automatically replay after it ends **default**: `false`
	   * @param {Boolean} [options.chromeless]
	   * player acts in chromeless mode **default**: `false`
	   * @param {Boolean} [options.muted]
	   * start the video muted **default**: `false`
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
	   * @param {String} [options.poster]
	   * define a poster by adding its address `poster: 'http://url/img.png'`. It will appear after video embed, disappear on play and go back when user stops the video.
	   */

	  function Player(options) {
	    _classCallCheck(this, Player);

	    _get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this, options);
	    window.p = this;
	    var defaultOptions = { playerId: (0, _baseUtils.uniqueId)(""), persistConfig: true, width: 640, height: 360, baseUrl: baseUrl };
	    this.options = (0, _lodashAssign2['default'])(defaultOptions, options);
	    this.options.sources = this.normalizeSources(options);
	    this.loader = new _loader2['default'](this.options.plugins || {}, this.options.playerId);
	    this.coreFactory = new _core_factory2['default'](this, this.loader);
	    this.playerInfo = _player_info2['default'].getInstance(this.options.playerId);
	    this.playerInfo.currentSize = { width: options.width, height: options.height };
	    this.playerInfo.options = this.options;
	    if (this.options.parentId) {
	      this.setParentId(this.options.parentId);
	    }
	  }

	  /**
	   * Specify a `parentId` to the player.
	   * @method setParentId
	   * @param {String} parentId the element parent id.
	   */

	  _createClass(Player, [{
	    key: 'setParentId',
	    value: function setParentId(parentId) {
	      var el = document.querySelector(parentId);
	      if (el) {
	        this.attachTo(el);
	      }
	    }

	    /**
	     * You can use this method to attach the player to a given element. You don't need to do this when you specify it during the player instantiation passing the `parentId` param.
	     * @method attachTo
	     * @param {Object} element a given element.
	     */
	  }, {
	    key: 'attachTo',
	    value: function attachTo(element) {
	      this.options.parentElement = element;
	      this.core = this.coreFactory.create();
	      this.addEventListeners();
	    }
	  }, {
	    key: 'addEventListeners',
	    value: function addEventListeners() {
	      this.listenTo(this.core.mediaControl, _baseEvents2['default'].MEDIACONTROL_CONTAINERCHANGED, this.containerChanged);
	      var container = this.core.mediaControl.container;
	      if (!!container) {
	        this.listenTo(container, _baseEvents2['default'].CONTAINER_PLAY, this.onPlay);
	        this.listenTo(container, _baseEvents2['default'].CONTAINER_PAUSE, this.onPause);
	        this.listenTo(container, _baseEvents2['default'].CONTAINER_STOP, this.onStop);
	        this.listenTo(container, _baseEvents2['default'].CONTAINER_ENDED, this.onEnded);
	        this.listenTo(container, _baseEvents2['default'].CONTAINER_SEEK, this.onSeek);
	        this.listenTo(container, _baseEvents2['default'].CONTAINER_ERROR, this.onError);
	        this.listenTo(container, _baseEvents2['default'].CONTAINER_TIMEUPDATE, this.onTimeUpdate);
	      }
	    }
	  }, {
	    key: 'containerChanged',
	    value: function containerChanged() {
	      this.stopListening();
	      this.addEventListeners();
	    }
	  }, {
	    key: 'onPlay',
	    value: function onPlay() {
	      this.trigger(_baseEvents2['default'].PLAYER_PLAY);
	    }
	  }, {
	    key: 'onPause',
	    value: function onPause() {
	      this.trigger(_baseEvents2['default'].PLAYER_PAUSE);
	    }
	  }, {
	    key: 'onStop',
	    value: function onStop() {
	      this.trigger(_baseEvents2['default'].PLAYER_STOP, this.getCurrentTime());
	    }
	  }, {
	    key: 'onEnded',
	    value: function onEnded() {
	      this.trigger(_baseEvents2['default'].PLAYER_ENDED);
	    }
	  }, {
	    key: 'onSeek',
	    value: function onSeek(percent) {
	      this.trigger(_baseEvents2['default'].PLAYER_SEEK, percent);
	    }
	  }, {
	    key: 'onTimeUpdate',
	    value: function onTimeUpdate(position, duration) {
	      this.trigger(_baseEvents2['default'].PLAYER_TIMEUPDATE, position, duration);
	    }
	  }, {
	    key: 'onError',
	    value: function onError(error) {
	      this.trigger(_baseEvents2['default'].PLAYER_ERROR, error);
	    }
	  }, {
	    key: 'is',
	    value: function is(value, type) {
	      return value.constructor === type;
	    }
	  }, {
	    key: 'normalizeSources',
	    value: function normalizeSources(options) {
	      var sources = options.sources || (options.source !== undefined ? [options.source.toString()] : []);
	      return sources.length === 0 ? ['no.op'] : sources;
	    }

	    /**
	     * resizes the current player canvas.
	     * @method resize
	     * @param {Object} size should be a literal object with `height` and `width`.
	     * @example
	     * ```javascript
	     * player.resize({height: 360, width: 640})
	     * ```
	     */
	  }, {
	    key: 'resize',
	    value: function resize(size) {
	      this.core.resize(size);
	    }

	    /**
	     * loads a new source.
	     * @method load
	     * @param {Object} sources source or sources of video.
	     * @param {Object} mimeType a mime type, example: `'application/vnd.apple.mpegurl'`
	     *
	     */
	  }, {
	    key: 'load',
	    value: function load(sources, mimeType) {
	      this.core.load(sources, mimeType);
	    }

	    /**
	     * destroys the current player and removes it from the DOM.
	     * @method destroy
	     */
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.core.destroy();
	    }

	    /**
	     * plays the current video (`source`).
	     * @method play
	     */
	  }, {
	    key: 'play',
	    value: function play() {
	      this.core.mediaControl.container.play();
	    }

	    /**
	     * pauses the current video (`source`).
	     * @method pause
	     */
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.core.mediaControl.container.pause();
	    }

	    /**
	     * stops the current video (`source`).
	     * @method stop
	     */
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.core.mediaControl.container.stop();
	    }

	    /**
	     * seeks the current video (`source`). For example, `player.seek(50)` will seek to the middle of the current video.
	     * @method seek
	     * @param {Number} time should be a number between 0 and 100.
	     */
	  }, {
	    key: 'seek',
	    value: function seek(time) {
	      this.core.mediaControl.container.setCurrentTime(time);
	    }

	    /**
	     * Set the volume for the current video (`source`).
	     * @method setVolume
	     * @param {Number} time should be a number between 0 and 100, 0 being mute and 100 the max volume.
	     */
	  }, {
	    key: 'setVolume',
	    value: function setVolume(volume) {
	      this.core.mediaControl.container.setVolume(volume);
	    }

	    /**
	     * mutes the current video (`source`).
	     * @method mute
	     */
	  }, {
	    key: 'mute',
	    value: function mute() {
	      this.core.mediaControl.container.setVolume(0);
	    }

	    /**
	     * unmutes the current video (`source`).
	     * @method unmute
	     */
	  }, {
	    key: 'unmute',
	    value: function unmute() {
	      this.core.mediaControl.container.setVolume(100);
	    }

	    /**
	     * checks if the player is playing.
	     * @method isPlaying
	     * @return {Boolean} `true` if the current source is playing, otherwise `false`
	     */
	  }, {
	    key: 'isPlaying',
	    value: function isPlaying() {
	      return this.core.mediaControl.container.isPlaying();
	    }

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
	  }, {
	    key: 'getPlugin',
	    value: function getPlugin(name) {
	      var plugins = this.core.plugins.concat(this.core.mediaControl.container.plugins);
	      return (0, _lodashFind2['default'])(plugins, function (plugin) {
	        return plugin.name === name;
	      });
	    }

	    /**
	     * the current time in seconds.
	     * @method getCurrentTime
	     * @return {Number} current time (in seconds) of the current source
	     */
	  }, {
	    key: 'getCurrentTime',
	    value: function getCurrentTime() {
	      return this.core.mediaControl.container.getCurrentTime();
	    }

	    /**
	     * the duration time in seconds.
	     * @method getDuration
	     * @return {Number} duration time (in seconds) of the current source
	     */
	  }, {
	    key: 'getDuration',
	    value: function getDuration() {
	      return this.core.mediaControl.container.getDuration();
	    }
	  }]);

	  return Player;
	})(_baseBase_object2['default']);

	exports['default'] = Player;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports.extend = extend;
	exports.formatTime = formatTime;
	exports.seekStringToSeconds = seekStringToSeconds;
	exports.uniqueId = uniqueId;
	exports.isNumber = isNumber;
	exports.currentScriptUrl = currentScriptUrl;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _lodashAssign = __webpack_require__(3);

	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);

	var _componentsBrowser = __webpack_require__(14);

	var _componentsBrowser2 = _interopRequireDefault(_componentsBrowser);

	function extend(parent, properties) {
	  var constructor = function constructor() {
	    parent.prototype.constructor.apply(this, arguments);
	    if (properties.constructor) {
	      properties.constructor.apply(this, arguments);
	    }
	  };
	  constructor.prototype = Object.create(parent.prototype);
	  (0, _lodashAssign2['default'])(constructor.prototype, properties);
	  return constructor;
	}

	function formatTime(time) {
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
	    if (hours < 1) out += "00:";
	  }
	  if (hours && hours > 0) out += ("0" + hours).slice(-2) + ":";
	  out += ("0" + minutes).slice(-2) + ":";
	  out += ("0" + seconds).slice(-2);
	  return out.trim();
	}

	var Fullscreen = {
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

	exports.Fullscreen = Fullscreen;

	var Config = (function () {
	  function Config() {
	    _classCallCheck(this, Config);
	  }

	  _createClass(Config, null, [{
	    key: '_defaultConfig',
	    value: function _defaultConfig() {
	      return {
	        volume: {
	          value: 100,
	          parse: parseInt
	        }
	      };
	    }
	  }, {
	    key: '_defaultValueFor',
	    value: function _defaultValueFor(key) {
	      try {
	        return this._defaultConfig()[key]['parse'](this._defaultConfig()[key]['value']);
	      } catch (e) {
	        return undefined;
	      }
	    }
	  }, {
	    key: '_create_keyspace',
	    value: function _create_keyspace(key) {
	      return 'clappr.' + document.domain + '.' + key;
	    }
	  }, {
	    key: 'restore',
	    value: function restore(key) {
	      if (_componentsBrowser2['default'].hasLocalstorage && localStorage[this._create_keyspace(key)]) {
	        return this._defaultConfig()[key]['parse'](localStorage[this._create_keyspace(key)]);
	      }
	      return this._defaultValueFor(key);
	    }
	  }, {
	    key: 'persist',
	    value: function persist(key, value) {
	      if (_componentsBrowser2['default'].hasLocalstorage) {
	        try {
	          localStorage[this._create_keyspace(key)] = value;
	          return true;
	        } catch (e) {
	          return false;
	        }
	      }
	    }
	  }]);

	  return Config;
	})();

	exports.Config = Config;

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

	var requestAnimationFrame = (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
	  window.setTimeout(fn, 1000 / 60);
	}).bind(window);

	exports.requestAnimationFrame = requestAnimationFrame;
	var cancelAnimationFrame = (window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout).bind(window);

	exports.cancelAnimationFrame = cancelAnimationFrame;
	exports['default'] = {
	  Config: Config,
	  Fullscreen: Fullscreen,
	  extend: extend,
	  formatTime: formatTime,
	  seekStringToSeconds: seekStringToSeconds,
	  uniqueId: uniqueId,
	  currentScriptUrl: currentScriptUrl,
	  isNumber: isNumber,
	  requestAnimationFrame: requestAnimationFrame,
	  cancelAnimationFrame: cancelAnimationFrame
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var baseAssign = __webpack_require__(4),
	    createAssigner = __webpack_require__(10);

	/**
	 * Assigns own enumerable properties of source object(s) to the destination
	 * object. Subsequent sources overwrite property assignments of previous sources.
	 * If `customizer` is provided it is invoked to produce the assigned values.
	 * The `customizer` is bound to `thisArg` and invoked with five arguments;
	 * (objectValue, sourceValue, key, object, source).
	 *
	 * @static
	 * @memberOf _
	 * @alias extend
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigning values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
	 * // => { 'user': 'fred', 'age': 40 }
	 *
	 * // using a customizer callback
	 * var defaults = _.partialRight(_.assign, function(value, other) {
	 *   return typeof value == 'undefined' ? other : value;
	 * });
	 *
	 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	 * // => { 'user': 'barney', 'age': 36 }
	 */
	var assign = createAssigner(baseAssign);

	module.exports = assign;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var baseCopy = __webpack_require__(5),
	    keys = __webpack_require__(6);

	/**
	 * The base implementation of `_.assign` without support for argument juggling,
	 * multiple sources, and `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return source == null ? object : baseCopy(source, keys(source), object);
	}

	module.exports = baseAssign;

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	"use strict";

	function baseCopy(source, props, object) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}

	module.exports = baseCopy;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var getNative = __webpack_require__(7),
	    isArguments = __webpack_require__(8),
	    isArray = __webpack_require__(9);

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

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
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
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
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if (allowIndexes && isIndex(key, length) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
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
	var keys = !nativeKeys ? shimKeys : function (object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if (typeof Ctor == 'function' && Ctor.prototype === object || typeof object != 'function' && isArrayLike(object)) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
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
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = length && isLength(length) && (isArray(object) || isArguments(object)) && length || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = index + '';
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	'use strict';

	var funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
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
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
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
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = getNative;

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	'use strict';

	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

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
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is classified as an `arguments` object.
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
	  return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	'use strict';

	var arrayTag = '[object Array]',
	    funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function (value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

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
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
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
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isArray;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var bindCallback = __webpack_require__(11),
	    isIterateeCall = __webpack_require__(12),
	    restParam = __webpack_require__(13);

	/**
	 * Creates a function that assigns properties of source object(s) to a given
	 * destination object.
	 *
	 * **Note:** This function is used to create `_.assign`, `_.defaults`, and `_.merge`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return restParam(function (object, sources) {
	    var index = -1,
	        length = object == null ? 0 : sources.length,
	        customizer = length > 2 ? sources[length - 2] : undefined,
	        guard = length > 2 ? sources[2] : undefined,
	        thisArg = length > 1 ? sources[length - 1] : undefined;

	    if (typeof customizer == 'function') {
	      customizer = bindCallback(customizer, thisArg, 5);
	      length -= 2;
	    } else {
	      customizer = typeof thisArg == 'function' ? thisArg : undefined;
	      length -= customizer ? 1 : 0;
	    }
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	'use strict';

	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1:
	      return function (value) {
	        return func.call(thisArg, value);
	      };
	    case 3:
	      return function (value, index, collection) {
	        return func.call(thisArg, value, index, collection);
	      };
	    case 4:
	      return function (accumulator, value, index, collection) {
	        return func.call(thisArg, accumulator, value, index, collection);
	      };
	    case 5:
	      return function (value, other, key, object, source) {
	        return func.call(thisArg, value, other, key, object, source);
	      };
	  }
	  return function () {
	    return func.apply(thisArg, arguments);
	  };
	}

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
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

	module.exports = bindCallback;

/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.9 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used to detect unsigned integer values. */
	'use strict';

	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

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
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
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
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
	    var other = object[index];
	    return value === value ? value === other : other !== other;
	  }
	  return false;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isIterateeCall;

/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * lodash 3.6.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	'use strict';

	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? func.length - 1 : +start || 0, 0);
	  return function () {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);

	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0:
	        return func.call(this, rest);
	      case 1:
	        return func.call(this, args[0], rest);
	      case 2:
	        return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}

	module.exports = restParam;

/***/ },
/* 14 */
/***/ function(module, exports) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
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

	Browser.isSafari = !!navigator.userAgent.match(/safari/i) && navigator.userAgent.indexOf('Chrome') === -1;
	Browser.isChrome = !!navigator.userAgent.match(/chrome/i);
	Browser.isFirefox = !!navigator.userAgent.match(/firefox/i);
	Browser.isLegacyIE = !!window.ActiveXObject;
	Browser.isIE = Browser.isLegacyIE || !!navigator.userAgent.match(/trident.*rv:1\d/i);
	Browser.isIE11 = !!navigator.userAgent.match(/trident.*rv:11/i);
	Browser.isMobile = !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini/i.test(navigator.userAgent);
	Browser.isiOs = !!/iPad|iPhone|iPod/i.test(navigator.userAgent);
	Browser.isWin8App = !!/MSAppHost/i.test(navigator.userAgent);
	Browser.isWiiU = !!/WiiU/i.test(navigator.userAgent);
	Browser.isPS4 = !!/PlayStation 4/i.test(navigator.userAgent);
	Browser.hasLocalstorage = hasLocalstorage();
	Browser.hasFlash = hasFlash();

	Browser.name = browserInfo.name;
	Browser.version = browserInfo.version;

	exports['default'] = Browser;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utils = __webpack_require__(2);

	var _events = __webpack_require__(16);

	var _events2 = _interopRequireDefault(_events);

	/**
	 * @class BaseObject
	 * @constructor
	 * @extends Events
	 * @module base
	 */

	var BaseObject = (function (_Events) {
	  _inherits(BaseObject, _Events);

	  /**
	   * @method constructor
	   * @param {Object} options
	   */

	  function BaseObject() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, BaseObject);

	    _get(Object.getPrototypeOf(BaseObject.prototype), 'constructor', this).call(this, options);
	    this.uniqueId = (0, _utils.uniqueId)('o');
	  }

	  /**
	  * a unique id prefixed with `'o'`, `o1, o232`
	  *
	  * @property uniqueId
	  * @type String
	  */
	  return BaseObject;
	})(_events2['default']);

	exports['default'] = BaseObject;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utils = __webpack_require__(2);

	var _lodashOnce = __webpack_require__(17);

	var _lodashOnce2 = _interopRequireDefault(_lodashOnce);

	var _pluginsLog = __webpack_require__(19);

	var _pluginsLog2 = _interopRequireDefault(_pluginsLog);

	var logger = _pluginsLog2['default'].getInstance();

	var slice = Array.prototype.slice;

	/**
	 * @class Events
	 * @constructor
	 * @module base
	 */

	var Events = (function () {
	  function Events() {
	    _classCallCheck(this, Events);
	  }

	  _createClass(Events, [{
	    key: 'on',

	    /**
	     * listen to an event indefinitely, if you want to stop you need to call `off`
	     * @method on
	     * @param {String} name
	     * @param {Function} callback
	     * @param {Object} context
	     */
	    value: function on(name, callback, context) {
	      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
	      this._events || (this._events = {});
	      var events = this._events[name] || (this._events[name] = []);
	      events.push({ callback: callback, context: context, ctx: context || this });
	      return this;
	    }

	    /**
	     * listen to an event only once
	     * @method once
	     * @param {String} name
	     * @param {Function} callback
	     * @param {Object} context
	     */
	  }, {
	    key: 'once',
	    value: function once(name, callback, context) {
	      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
	      var self = this;
	      var once = (0, _lodashOnce2['default'])(function () {
	        self.off(name, once);
	        callback.apply(this, arguments);
	      });
	      once._callback = callback;
	      return this.on(name, once, context);
	    }

	    /**
	     * stop listening to an event
	     * @method off
	     * @param {String} name
	     * @param {Function} callback
	     * @param {Object} context
	     */
	  }, {
	    key: 'off',
	    value: function off(name, callback, context) {
	      var retain, ev, events, names, i, l, j, k;
	      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
	      if (!name && !callback && !context) {
	        this._events = void 0;
	        return this;
	      }
	      names = name ? [name] : Object.keys(this._events);
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
	          if (!retain.length) delete this._events[name];
	        }
	      }
	      return this;
	    }

	    /**
	     * triggers an event given its `name`
	     * @method trigger
	     * @param {String} name
	     */
	  }, {
	    key: 'trigger',
	    value: function trigger(name) {
	      try {
	        var klass = this.name || this.constructor.name;
	        logger.debug.apply(logger, [klass].concat(Array.prototype.slice.call(arguments)));
	        if (!this._events) return this;
	        var args = slice.call(arguments, 1);
	        if (!eventsApi(this, 'trigger', name, args)) return this;
	        var events = this._events[name];
	        var allEvents = this._events.all;
	        if (events) triggerEvents(events, args);
	        if (allEvents) triggerEvents(allEvents, arguments);
	      } catch (exception) {
	        logger.error.apply(logger, [klass, 'error on event', name, 'trigger', '-', exception]);
	      }
	      return this;
	    }

	    /**
	     * stop listening an event for a given object
	     * @method stopListening
	     * @param {Object} obj
	     * @param {String} name
	     * @param {Function} callback
	     */
	  }, {
	    key: 'stopListening',
	    value: function stopListening(obj, name, callback) {
	      var listeningTo = this._listeningTo;
	      if (!listeningTo) return this;
	      var remove = !name && !callback;
	      if (!callback && typeof name === 'object') callback = this;
	      if (obj) (listeningTo = {})[obj._listenId] = obj;
	      for (var id in listeningTo) {
	        obj = listeningTo[id];
	        obj.off(name, callback, this);
	        if (remove || Object.keys(obj._events).length === 0) delete this._listeningTo[id];
	      }
	      return this;
	    }
	  }]);

	  return Events;
	})();

	exports['default'] = Events;

	var eventSplitter = /\s+/;

	var eventsApi = function eventsApi(obj, action, name, rest) {
	  if (!name) return true;

	  // Handle event maps.
	  if (typeof name === 'object') {
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
	      while (++i < l) (ev = events[i]).callback.call(ev.ctx);return;
	    case 1:
	      while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1);return;
	    case 2:
	      while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2);return;
	    case 3:
	      while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);return;
	    default:
	      while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);return;
	  }
	};

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
	var listenMethods = { listenTo: 'on', listenToOnce: 'once' };

	Object.keys(listenMethods).forEach(function (method) {
	  Events.prototype[method] = function (obj, name, callback) {
	    var listeningTo = this._listeningTo || (this._listeningTo = {});
	    var id = obj._listenId || (obj._listenId = (0, _utils.uniqueId)('l'));
	    listeningTo[id] = obj;
	    if (!callback && typeof name === 'object') callback = this;
	    obj[listenMethods[method]](name, callback, this);
	    return this;
	  };
	});

	// PLAYER EVENTS
	/**
	 * Fired when player risezes
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
	 * Fired when player ends the video
	 *
	 * @event PLAYER_SEEK
	 * @param {Number} percent a percentagem of seek
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
	 * Fired when player updates its execution
	 *
	 * @event PLAYER_ERROR
	 * @param {Number} postion the current position (in seconds)
	 * @param {Number} duration the total duration (in seconds)
	 */
	Events.PLAYER_TIMEUPDATE = 'timeupdate';

	// Playback Events
	Events.PLAYBACK_PROGRESS = 'playback:progress';
	Events.PLAYBACK_TIMEUPDATE = 'playback:timeupdate';
	Events.PLAYBACK_READY = 'playback:ready';
	Events.PLAYBACK_BUFFERING = 'playback:buffering';
	Events.PLAYBACK_BUFFERFULL = 'playback:bufferfull';
	Events.PLAYBACK_SETTINGSUPDATE = 'playback:settingsupdate';
	Events.PLAYBACK_LOADEDMETADATA = 'playback:loadedmetadata';
	Events.PLAYBACK_HIGHDEFINITIONUPDATE = 'playback:highdefinitionupdate';
	Events.PLAYBACK_BITRATE = 'playback:bitrate';
	Events.PLAYBACK_PLAYBACKSTATE = 'playback:playbackstate';
	Events.PLAYBACK_DVR = 'playback:dvr';
	Events.PLAYBACK_MEDIACONTROL_DISABLE = 'playback:mediacontrol:disable';
	Events.PLAYBACK_MEDIACONTROL_ENABLE = 'playback:mediacontrol:enable';
	Events.PLAYBACK_ENDED = 'playback:ended';
	Events.PLAYBACK_PLAY = 'playback:play';
	Events.PLAYBACK_PAUSE = 'playback:pause';
	Events.PLAYBACK_ERROR = 'playback:error';
	Events.PLAYBACK_STATS_ADD = 'playback:stats:add';
	Events.PLAYBACK_FRAGMENT_LOADED = 'playback:fragment:loaded';

	// Container Events
	Events.CONTAINER_PLAYBACKSTATE = 'container:playbackstate';
	Events.CONTAINER_PLAYBACKDVRSTATECHANGED = 'container:dvr';
	Events.CONTAINER_BITRATE = 'container:bitrate';
	Events.CONTAINER_STATS_REPORT = 'container:stats:report';
	Events.CONTAINER_DESTROYED = 'container:destroyed';
	Events.CONTAINER_READY = 'container:ready';
	Events.CONTAINER_ERROR = 'container:error';
	Events.CONTAINER_LOADEDMETADATA = 'container:loadedmetadata';
	Events.CONTAINER_TIMEUPDATE = 'container:timeupdate';
	Events.CONTAINER_PROGRESS = 'container:progress';
	Events.CONTAINER_PLAY = 'container:play';
	Events.CONTAINER_STOP = 'container:stop';
	Events.CONTAINER_PAUSE = 'container:pause';
	Events.CONTAINER_ENDED = 'container:ended';
	Events.CONTAINER_CLICK = 'container:click';
	Events.CONTAINER_DBLCLICK = 'container:dblclick';
	Events.CONTAINER_MOUSE_ENTER = 'container:mouseenter';
	Events.CONTAINER_MOUSE_LEAVE = 'container:mouseleave';
	Events.CONTAINER_SEEK = 'container:seek';
	Events.CONTAINER_VOLUME = 'container:volume';
	Events.CONTAINER_FULLSCREEN = 'container:fullscreen';
	Events.CONTAINER_STATE_BUFFERING = 'container:state:buffering';
	Events.CONTAINER_STATE_BUFFERFULL = 'container:state:bufferfull';
	Events.CONTAINER_SETTINGSUPDATE = 'container:settingsupdate';
	Events.CONTAINER_HIGHDEFINITIONUPDATE = 'container:highdefinitionupdate';
	Events.CONTAINER_MEDIACONTROL_DISABLE = 'container:mediacontrol:disable';
	Events.CONTAINER_MEDIACONTROL_ENABLE = 'container:mediacontrol:enable';
	Events.CONTAINER_STATS_ADD = 'container:stats:add';

	// MediaControl Events
	Events.MEDIACONTROL_RENDERED = 'mediacontrol:rendered';
	Events.MEDIACONTROL_FULLSCREEN = 'mediacontrol:fullscreen';
	Events.MEDIACONTROL_SHOW = 'mediacontrol:show';
	Events.MEDIACONTROL_HIDE = 'mediacontrol:hide';
	Events.MEDIACONTROL_MOUSEMOVE_SEEKBAR = 'mediacontrol:mousemove:seekbar';
	Events.MEDIACONTROL_MOUSELEAVE_SEEKBAR = 'mediacontrol:mouseleave:seekbar';
	Events.MEDIACONTROL_PLAYING = 'mediacontrol:playing';
	Events.MEDIACONTROL_NOTPLAYING = 'mediacontrol:notplaying';
	Events.MEDIACONTROL_CONTAINERCHANGED = 'mediacontrol:containerchanged';
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var before = __webpack_require__(18);

	/**
	 * Creates a function that is restricted to invoking `func` once. Repeat calls
	 * to the function return the value of the first call. The `func` is invoked
	 * with the `this` binding of the created function.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
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
	  return before(func, 2);
	}

	module.exports = once;

/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	'use strict';

	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that invokes `func`, with the `this` binding and arguments
	 * of the created function, while it is called less than `n` times. Subsequent
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
	 * jQuery('#add').on('click', _.before(5, addContactToList));
	 * // => allows adding up to 4 contacts to the list
	 */
	function before(n, func) {
	  var result;
	  if (typeof func != 'function') {
	    if (typeof n == 'function') {
	      var temp = n;
	      n = func;
	      func = temp;
	    } else {
	      throw new TypeError(FUNC_ERROR_TEXT);
	    }
	  }
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

	module.exports = before;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(20);

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _baseKibo = __webpack_require__(21);

	var _baseKibo2 = _interopRequireDefault(_baseKibo);

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

	var Log = (function () {
	  function Log() {
	    var _this = this;

	    var level = arguments.length <= 0 || arguments[0] === undefined ? LEVEL_WARN : arguments[0];

	    _classCallCheck(this, Log);

	    this.kibo = new _baseKibo2['default']();
	    this.kibo.down(['ctrl shift d'], function () {
	      return _this.onOff();
	    });
	    this.BLACKLIST = ['timeupdate', 'playback:timeupdate', 'playback:progress', 'container:hover', 'container:timeupdate', 'container:progress'];
	    this.level = level;
	  }

	  _createClass(Log, [{
	    key: 'debug',
	    value: function debug(klass) {
	      this.log(klass, LEVEL_DEBUG, Array.prototype.slice.call(arguments, 1));
	    }
	  }, {
	    key: 'info',
	    value: function info(klass) {
	      this.log(klass, LEVEL_INFO, Array.prototype.slice.call(arguments, 1));
	    }
	  }, {
	    key: 'warn',
	    value: function warn(klass) {
	      this.log(klass, LEVEL_WARN, Array.prototype.slice.call(arguments, 1));
	    }
	  }, {
	    key: 'error',
	    value: function error(klass) {
	      this.log(klass, LEVEL_ERROR, Array.prototype.slice.call(arguments, 1));
	    }
	  }, {
	    key: 'onOff',
	    value: function onOff() {
	      if (this.level === LEVEL_DISABLED) {
	        this.level = this.previousLevel;
	      } else {
	        this.previousLevel = this.level;
	        this.level = LEVEL_DISABLED;
	      }
	      console.log.apply(console, ["%c[Clappr.Log] set log level to " + DESCRIPTIONS[this.level], ERROR]);
	    }
	  }, {
	    key: 'level',
	    value: function level(newLevel) {
	      this.level = newLevel;
	    }
	  }, {
	    key: 'log',
	    value: function log(klass, level, message) {
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
	      console.log.apply(console, ["%c[" + DESCRIPTIONS[level] + "]" + klassDescription, color].concat(message));
	    }
	  }]);

	  return Log;
	})();

	exports['default'] = Log;

	Log.LEVEL_DEBUG = LEVEL_DEBUG;
	Log.LEVEL_INFO = LEVEL_INFO;
	Log.LEVEL_WARN = LEVEL_WARN;
	Log.LEVEL_ERROR = LEVEL_ERROR;

	Log.getInstance = function () {
	  if (this._instance === undefined) {
	    this._instance = new this();
	  }
	  return this._instance;
	};
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
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
	  65: 'a', 66: 'b', 67: 'c', 68: 'd', 69: 'e', 70: 'f', 71: 'g', 72: 'h', 73: 'i', 74: 'j', 75: 'k', 76: 'l', 77: 'm', 78: 'n', 79: 'o', 80: 'p', 81: 'q', 82: 'r', 83: 's', 84: 't', 85: 'u', 86: 'v', 87: 'w', 88: 'x', 89: 'y', 90: 'z',
	  112: 'f1', 113: 'f2', 114: 'f3', 115: 'f4', 116: 'f5', 117: 'f6', 118: 'f7', 119: 'f8', 120: 'f9', 121: 'f10', 122: 'f11', 123: 'f12'
	};

	Kibo.KEY_CODES_BY_NAME = {};
	(function () {
	  for (var key in Kibo.KEY_NAMES_BY_CODE) if (Object.prototype.hasOwnProperty.call(Kibo.KEY_NAMES_BY_CODE, key)) Kibo.KEY_CODES_BY_NAME[Kibo.KEY_NAMES_BY_CODE[key]] = +key;
	})();

	Kibo.MODIFIERS = ['shift', 'ctrl', 'alt'];

	Kibo.registerEvent = (function () {
	  if (document.addEventListener) {
	    return function (element, eventName, func) {
	      element.addEventListener(eventName, func, false);
	    };
	  } else if (document.attachEvent) {
	    return function (element, eventName, func) {
	      element.attachEvent('on' + eventName, func);
	    };
	  }
	})();

	Kibo.unregisterEvent = (function () {
	  if (document.removeEventListener) {
	    return function (element, eventName, func) {
	      element.removeEventListener(eventName, func, false);
	    };
	  } else if (document.detachEvent) {
	    return function (element, eventName, func) {
	      element.detachEvent('on' + eventName, func);
	    };
	  }
	})();

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

	Kibo.arrayIncludes = (function () {
	  if (Array.prototype.indexOf) {
	    return function (haystack, needle) {
	      return haystack.indexOf(needle) !== -1;
	    };
	  } else {
	    return function (haystack, needle) {
	      for (var i = 0; i < haystack.length; i++) if (haystack[i] === needle) return true;
	      return false;
	    };
	  }
	})();

	Kibo.extractModifiers = function (keyCombination) {
	  var modifiers, i;
	  modifiers = [];
	  for (i = 0; i < Kibo.MODIFIERS.length; i++) if (Kibo.stringContains(keyCombination, Kibo.MODIFIERS[i])) modifiers.push(Kibo.MODIFIERS[i]);
	  return modifiers;
	};

	Kibo.extractKey = function (keyCombination) {
	  var keys, i;
	  keys = Kibo.neatString(keyCombination).split(' ');
	  for (i = 0; i < keys.length; i++) if (!Kibo.arrayIncludes(Kibo.MODIFIERS, keys[i])) return keys[i];
	};

	Kibo.modifiersAndKey = function (keyCombination) {
	  var result, key;

	  if (Kibo.stringContains(keyCombination, 'any')) {
	    return Kibo.neatString(keyCombination).split(' ').slice(0, 2).join(' ');
	  }

	  result = Kibo.extractModifiers(keyCombination);

	  key = Kibo.extractKey(keyCombination);
	  if (key && !Kibo.arrayIncludes(Kibo.MODIFIERS, key)) result.push(key);

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
	  for (i = 0; i < Kibo.MODIFIERS.length; i++) this.lastModifiers[Kibo.MODIFIERS[i]] = false;

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
	    for (i = 0; i < Kibo.MODIFIERS.length; i++) that.lastModifiers[Kibo.MODIFIERS[i]] = e[Kibo.MODIFIERS[i] + 'Key'];
	    if (Kibo.arrayIncludes(Kibo.MODIFIERS, Kibo.keyName(that.lastKeyCode))) that.lastModifiers[Kibo.keyName(that.lastKeyCode)] = true;

	    registeredKeys = that['keys' + Kibo.capitalize(upOrDown)];

	    for (i = 0; i < registeredKeys.any.length; i++) if (registeredKeys.any[i](e) === false && e.preventDefault) e.preventDefault();

	    lastModifiersAndKey = that.lastModifiersAndKey();
	    if (registeredKeys[lastModifiersAndKey]) for (i = 0; i < registeredKeys[lastModifiersAndKey].length; i++) if (registeredKeys[lastModifiersAndKey][i](e) === false && e.preventDefault) e.preventDefault();
	  };
	};

	Kibo.prototype.registerKeys = function (upOrDown, newKeys, func) {
	  var i,
	      keys,
	      registeredKeys = this['keys' + Kibo.capitalize(upOrDown)];

	  if (Kibo.isString(newKeys)) newKeys = [newKeys];

	  for (i = 0; i < newKeys.length; i++) {
	    keys = newKeys[i];
	    keys = Kibo.modifiersAndKey(keys + '');

	    if (registeredKeys[keys]) registeredKeys[keys].push(func);else registeredKeys[keys] = [func];
	  }

	  return this;
	};

	Kibo.prototype.unregisterKeys = function (upOrDown, newKeys, func) {
	  var i,
	      j,
	      keys,
	      registeredKeys = this['keys' + Kibo.capitalize(upOrDown)];

	  if (Kibo.isString(newKeys)) newKeys = [newKeys];

	  for (i = 0; i < newKeys.length; i++) {
	    keys = newKeys[i];
	    keys = Kibo.modifiersAndKey(keys + '');

	    if (func === null) delete registeredKeys[keys];else {
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
	  if (!modifier) return Kibo.keyName(this.lastKeyCode);

	  return this.lastModifiers[modifier];
	};

	Kibo.prototype.lastModifiersAndKey = function () {
	  var result, i;

	  result = [];
	  for (i = 0; i < Kibo.MODIFIERS.length; i++) if (this.lastKey(Kibo.MODIFIERS[i])) result.push(Kibo.MODIFIERS[i]);

	  if (!Kibo.arrayIncludes(result, this.lastKey())) result.push(this.lastKey());

	  return result.join(' ');
	};

	exports['default'] = Kibo;
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(23);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	/**
	 * The Core Factory is responsible for instantiate the core and it's plugins.
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseBase_object = __webpack_require__(15);

	var _baseBase_object2 = _interopRequireDefault(_baseBase_object);

	var _core = __webpack_require__(24);

	var _core2 = _interopRequireDefault(_core);

	var CoreFactory = (function (_BaseObject) {
	  _inherits(CoreFactory, _BaseObject);

	  function CoreFactory(player, loader) {
	    _classCallCheck(this, CoreFactory);

	    _get(Object.getPrototypeOf(CoreFactory.prototype), 'constructor', this).call(this);
	    this.player = player;
	    this.options = player.options;
	    this.loader = loader;
	    this.options.loader = this.loader;
	  }

	  _createClass(CoreFactory, [{
	    key: 'create',
	    value: function create() {
	      this.core = new _core2['default'](this.options);
	      this.core.then(this.addCorePlugins.bind(this));
	      return this.core;
	    }
	  }, {
	    key: 'addCorePlugins',
	    value: function addCorePlugins() {
	      var _this = this;

	      this.loader.corePlugins.forEach(function (Plugin) {
	        var plugin = new Plugin(_this.core);
	        _this.core.addPlugin(plugin);
	        _this.setupExternalInterface(plugin);
	      });
	      return this.core;
	    }
	  }, {
	    key: 'setupExternalInterface',
	    value: function setupExternalInterface(plugin) {
	      var externalFunctions = plugin.getExternalInterface();
	      for (var key in externalFunctions) {
	        this.player[key] = externalFunctions[key].bind(plugin);
	      }
	    }
	  }]);

	  return CoreFactory;
	})(_baseBase_object2['default']);

	exports['default'] = CoreFactory;
	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(25);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	/**
	 * The Core is responsible to manage Containers, the mediator, MediaControl
	 * and the player state.
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUtils = __webpack_require__(2);

	var _lodashAssign = __webpack_require__(3);

	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);

	var _clapprZepto = __webpack_require__(26);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _baseUi_object = __webpack_require__(27);

	var _baseUi_object2 = _interopRequireDefault(_baseUi_object);

	var _container_factory = __webpack_require__(30);

	var _container_factory2 = _interopRequireDefault(_container_factory);

	var _baseStyler = __webpack_require__(34);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _media_control = __webpack_require__(58);

	var _media_control2 = _interopRequireDefault(_media_control);

	var _player_info = __webpack_require__(65);

	var _player_info2 = _interopRequireDefault(_player_info);

	var _mediator = __webpack_require__(64);

	var _mediator2 = _interopRequireDefault(_mediator);

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _browser = __webpack_require__(14);

	var _browser2 = _interopRequireDefault(_browser);

	var _publicStyleScss = __webpack_require__(71);

	var _publicStyleScss2 = _interopRequireDefault(_publicStyleScss);

	var _lodashFind = __webpack_require__(38);

	var _lodashFind2 = _interopRequireDefault(_lodashFind);

	var Core = (function (_UIObject) {
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
	  }]);

	  function Core(options) {
	    var _this = this;

	    _classCallCheck(this, Core);

	    _get(Object.getPrototypeOf(Core.prototype), 'constructor', this).call(this, options);
	    this.playerInfo = _player_info2['default'].getInstance(options.playerId);
	    this.options = options;
	    this.plugins = [];
	    this.containers = [];
	    this.createContainers(options);
	    //FIXME fullscreen api sucks
	    (0, _clapprZepto2['default'])(document).bind('fullscreenchange', function () {
	      return _this.exit();
	    });
	    (0, _clapprZepto2['default'])(document).bind('MSFullscreenChange', function () {
	      return _this.exit();
	    });
	    (0, _clapprZepto2['default'])(document).bind('mozfullscreenchange', function () {
	      return _this.exit();
	    });
	  }

	  _createClass(Core, [{
	    key: 'createContainers',
	    value: function createContainers(options) {
	      var _this2 = this;

	      this.defer = _clapprZepto2['default'].Deferred();
	      this.defer.promise(this);
	      this.containerFactory = new _container_factory2['default'](options, options.loader);
	      this.containerFactory.createContainers().then(function (containers) {
	        return _this2.setupContainers(containers);
	      }).then(function (containers) {
	        return _this2.resolveOnContainersReady(containers);
	      });
	    }
	  }, {
	    key: 'updateSize',
	    value: function updateSize() {
	      if (_baseUtils.Fullscreen.isFullscreen()) {
	        this.setFullscreen();
	      } else {
	        this.setPlayerSize();
	      }
	      _mediator2['default'].trigger(this.options.playerId + ':' + _baseEvents2['default'].PLAYER_RESIZE, this.playerInfo.currentSize);
	    }
	  }, {
	    key: 'setFullscreen',
	    value: function setFullscreen() {
	      if (!_browser2['default'].isiOs) {
	        this.$el.addClass('fullscreen');
	        this.$el.removeAttr('style');
	        this.playerInfo.previousSize = { width: this.options.width, height: this.options.height };
	        this.playerInfo.currentSize = { width: (0, _clapprZepto2['default'])(window).width(), height: (0, _clapprZepto2['default'])(window).height() };
	      }
	    }
	  }, {
	    key: 'setPlayerSize',
	    value: function setPlayerSize() {
	      this.$el.removeClass('fullscreen');
	      this.playerInfo.currentSize = this.playerInfo.previousSize;
	      this.playerInfo.previousSize = { width: (0, _clapprZepto2['default'])(window).width(), height: (0, _clapprZepto2['default'])(window).height() };
	      this.resize(this.playerInfo.currentSize);
	    }
	  }, {
	    key: 'resize',
	    value: function resize(options) {
	      if (!(0, _baseUtils.isNumber)(options.height) && !(0, _baseUtils.isNumber)(options.width)) {
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
	      _mediator2['default'].trigger(this.options.playerId + ':' + _baseEvents2['default'].PLAYER_RESIZE, this.playerInfo.currentSize);
	    }
	  }, {
	    key: 'enableResizeObserver',
	    value: function enableResizeObserver() {
	      var _this3 = this;

	      var checkSizeCallback = function checkSizeCallback() {
	        if (_this3.reqAnimFrame) clearTimeout(_this3.reqAnimFrame);
	        if (_this3.playerInfo.computedSize.width != _this3.el.clientWidth || _this3.playerInfo.computedSize.height != _this3.el.clientHeight) {
	          _this3.playerInfo.computedSize = { width: _this3.el.clientWidth, height: _this3.el.clientHeight };
	          _mediator2['default'].trigger(_this3.options.playerId + ':' + _baseEvents2['default'].PLAYER_RESIZE, _this3.playerInfo.computedSize);
	        }
	        _this3.reqAnimFrame = setTimeout(checkSizeCallback, 500);
	      };
	      this.reqAnimFrame = setTimeout(checkSizeCallback, 500);
	    }
	  }, {
	    key: 'disableResizeObserver',
	    value: function disableResizeObserver() {
	      if (this.reqAnimFrame) (0, _baseUtils.cancelAnimationFrame)(this.reqAnimFrame);
	    }
	  }, {
	    key: 'resolveOnContainersReady',
	    value: function resolveOnContainersReady(containers) {
	      var _this4 = this;

	      _clapprZepto2['default'].when.apply(_clapprZepto2['default'], containers).done(function () {
	        return _this4.defer.resolve(_this4);
	      });
	    }
	  }, {
	    key: 'addPlugin',
	    value: function addPlugin(plugin) {
	      this.plugins.push(plugin);
	    }
	  }, {
	    key: 'hasPlugin',
	    value: function hasPlugin(name) {
	      return !!this.getPlugin(name);
	    }
	  }, {
	    key: 'getPlugin',
	    value: function getPlugin(name) {
	      return (0, _lodashFind2['default'])(this.plugins, function (plugin) {
	        return plugin.name === name;
	      });
	    }
	  }, {
	    key: 'load',
	    value: function load(sources, mimeType) {
	      var _this5 = this;

	      this.options.mimeType = mimeType;
	      sources = sources && sources.constructor === Array ? sources : [sources.toString()];
	      this.containers.forEach(function (container) {
	        return container.destroy();
	      });
	      this.containerFactory.options = (0, _lodashAssign2['default'])(this.options, { sources: sources });
	      this.containerFactory.createContainers().then(function (containers) {
	        _this5.setupContainers(containers);
	      });
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.disableResizeObserver();
	      this.containers.forEach(function (container) {
	        return container.destroy();
	      });
	      this.plugins.forEach(function (plugin) {
	        return plugin.destroy();
	      });
	      this.$el.remove();
	      this.mediaControl.destroy();
	      (0, _clapprZepto2['default'])(document).unbind('fullscreenchange');
	      (0, _clapprZepto2['default'])(document).unbind('MSFullscreenChange');
	      (0, _clapprZepto2['default'])(document).unbind('mozfullscreenchange');
	    }
	  }, {
	    key: 'exit',
	    value: function exit() {
	      this.updateSize();
	      this.mediaControl.show();
	    }
	  }, {
	    key: 'setMediaControlContainer',
	    value: function setMediaControlContainer(container) {
	      this.mediaControl.setContainer(container);
	      this.mediaControl.render();
	    }
	  }, {
	    key: 'disableMediaControl',
	    value: function disableMediaControl() {
	      this.mediaControl.disable();
	      this.$el.removeClass('nocursor');
	    }
	  }, {
	    key: 'enableMediaControl',
	    value: function enableMediaControl() {
	      this.mediaControl.enable();
	    }
	  }, {
	    key: 'removeContainer',
	    value: function removeContainer(container) {
	      this.stopListening(container);
	      this.containers = this.containers.filter(function (c) {
	        return c !== container;
	      });
	    }
	  }, {
	    key: 'appendContainer',
	    value: function appendContainer(container) {
	      this.listenTo(container, _baseEvents2['default'].CONTAINER_DESTROYED, this.removeContainer);
	      this.el.appendChild(container.render().el);
	      this.containers.push(container);
	    }
	  }, {
	    key: 'setupContainers',
	    value: function setupContainers(containers) {
	      containers.map(this.appendContainer.bind(this));
	      this.setupMediaControl(this.getCurrentContainer());
	      this.render();
	      this.$el.appendTo(this.options.parentElement);
	      return containers;
	    }
	  }, {
	    key: 'createContainer',
	    value: function createContainer(source, options) {
	      var container = this.containerFactory.createContainer(source, options);
	      this.appendContainer(container);
	      return container;
	    }
	  }, {
	    key: 'setupMediaControl',
	    value: function setupMediaControl(container) {
	      if (this.mediaControl) {
	        this.mediaControl.setContainer(container);
	      } else {
	        this.mediaControl = this.createMediaControl((0, _lodashAssign2['default'])({ container: container, focusElement: this.el }, this.options));
	        this.listenTo(this.mediaControl, _baseEvents2['default'].MEDIACONTROL_FULLSCREEN, this.toggleFullscreen);
	        this.listenTo(this.mediaControl, _baseEvents2['default'].MEDIACONTROL_SHOW, this.onMediaControlShow.bind(this, true));
	        this.listenTo(this.mediaControl, _baseEvents2['default'].MEDIACONTROL_HIDE, this.onMediaControlShow.bind(this, false));
	      }
	    }
	  }, {
	    key: 'createMediaControl',
	    value: function createMediaControl(options) {
	      if (options.mediacontrol && options.mediacontrol.external) {
	        return new options.mediacontrol.external(options);
	      } else {
	        return new _media_control2['default'](options);
	      }
	    }
	  }, {
	    key: 'getCurrentContainer',
	    value: function getCurrentContainer() {
	      if (!this.mediacontrol) {
	        return this.containers[0];
	      }
	      return this.mediaControl.container;
	    }
	  }, {
	    key: 'getPlaybackType',
	    value: function getPlaybackType() {
	      return this.getCurrentContainer().getPlaybackType();
	    }
	  }, {
	    key: 'toggleFullscreen',
	    value: function toggleFullscreen() {
	      if (!_baseUtils.Fullscreen.isFullscreen()) {
	        _baseUtils.Fullscreen.requestFullscreen(this.el);
	        if (!_browser2['default'].isiOs) {
	          this.$el.addClass('fullscreen');
	        }
	      } else {
	        _baseUtils.Fullscreen.cancelFullscreen();
	        if (!_browser2['default'].isiOs) {
	          this.$el.removeClass('fullscreen nocursor');
	        }
	      }
	      this.mediaControl.show();
	    }
	  }, {
	    key: 'showMediaControl',
	    value: function showMediaControl(event) {
	      this.mediaControl.show(event);
	    }
	  }, {
	    key: 'hideMediaControl',
	    value: function hideMediaControl(event) {
	      this.mediaControl.hide(this.options.hideMediaControlDelay);
	    }
	  }, {
	    key: 'onMediaControlShow',
	    value: function onMediaControlShow(showing) {
	      if (showing) this.$el.removeClass('nocursor');else if (_baseUtils.Fullscreen.isFullscreen()) this.$el.addClass('nocursor');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var style = _baseStyler2['default'].getStyleFor(_publicStyleScss2['default']);
	      //FIXME
	      //this.$el.empty()
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
	    }
	  }]);

	  return Core;
	})(_baseUi_object2['default']);

	exports['default'] = Core;
	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports) {

	/* Zepto v1.1.4-80-ga9184b2 - zepto event ajax callbacks deferred touch selector ie - zeptojs.com/license */
	"use strict";

	var Zepto = (function () {
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
	    var e, n;return (f[t] || (e = u.createElement(t), u.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), f[t] = n), f[t]);
	  }function U(t) {
	    return "children" in t ? a.call(t.children) : n.map(t.childNodes, function (t) {
	      return 1 == t.nodeType ? t : void 0;
	    });
	  }function X(t, e) {
	    var n,
	        i = t ? t.length : 0;for (n = 0; i > n; n++) this[n] = t[n];this.length = i, this.selector = e || "";
	  }function B(n, i, r) {
	    for (e in i) r && (F(i[e]) || A(i[e])) ? (F(i[e]) && !F(n[e]) && (n[e] = {}), A(i[e]) && !A(n[e]) && (n[e] = []), B(n[e], i[e], r)) : i[e] !== t && (n[e] = i[e]);
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
	    e(t);for (var n = 0, i = t.childNodes.length; i > n; n++) Q(t.childNodes[n], e);
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
	  };return (C.matches = function (t, e) {
	    if (!e || !t || 1 !== t.nodeType) return !1;var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;if (n) return n.call(t, e);var i,
	        r = t.parentNode,
	        o = !r;return (o && (r = O).appendChild(t), i = ~C.qsa(r, e).indexOf(t), o && O.removeChild(t), i);
	  }, N = function (t) {
	    return t.replace(/-+(.)?/g, function (t, e) {
	      return e ? e.toUpperCase() : "";
	    });
	  }, P = function (t) {
	    return s.call(t, function (e, n) {
	      return t.indexOf(e) == n;
	    });
	  }, C.fragment = function (e, i, r) {
	    var o, s, f;return (p.test(e) && (o = n(u.createElement(RegExp.$1))), o || (e.replace && (e = e.replace(d, "<$1></$2>")), i === t && (i = h.test(e) && RegExp.$1), i in b || (i = "*"), f = b[i], f.innerHTML = "" + e, o = n.each(a.call(f.childNodes), function () {
	      f.removeChild(this);
	    })), F(r) && (s = n(o), n.each(r, function (t, e) {
	      v.indexOf(t) > -1 ? s[t](e) : s.attr(t, e);
	    })), o);
	  }, C.Z = function (t, e) {
	    return new X(t, e);
	  }, C.isZ = function (t) {
	    return t instanceof C.Z;
	  }, C.init = function (e, i) {
	    var r;if (!e) return C.Z();if ("string" == typeof e) if ((e = e.trim(), "<" == e[0] && h.test(e))) r = C.fragment(e, RegExp.$1, i), e = null;else {
	      if (i !== t) return n(i).find(e);r = C.qsa(u, e);
	    } else {
	      if (L(e)) return n(u).ready(e);if (C.isZ(e)) return e;if (A(e)) r = q(e);else if ($(e)) r = [e], e = null;else if (h.test(e)) r = C.fragment(e.trim(), RegExp.$1, i), e = null;else {
	        if (i !== t) return n(i).find(e);r = C.qsa(u, e);
	      }
	    }return C.Z(r, e);
	  }, n = function (t, e) {
	    return C.init(t, e);
	  }, n.extend = function (t) {
	    var e,
	        n = a.call(arguments, 1);return ("boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function (n) {
	      B(t, n, e);
	    }), t);
	  }, C.qsa = function (t, e) {
	    var n,
	        i = "#" == e[0],
	        r = !i && "." == e[0],
	        o = i || r ? e.slice(1) : e,
	        s = T.test(o);return t.getElementById && s && i ? (n = t.getElementById(o)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType ? [] : a.call(s && !i && t.getElementsByClassName ? r ? t.getElementsByClassName(o) : t.getElementsByTagName(e) : t.querySelectorAll(e));
	  }, n.contains = u.documentElement.contains ? function (t, e) {
	    return t !== e && t.contains(e);
	  } : function (t, e) {
	    for (; e && (e = e.parentNode);) if (e === t) return !0;return !1;
	  }, n.type = D, n.isFunction = L, n.isWindow = k, n.isArray = A, n.isPlainObject = F, n.isEmptyObject = function (t) {
	    var e;for (e in t) return !1;return !0;
	  }, n.inArray = function (t, e, n) {
	    return r.indexOf.call(e, t, n);
	  }, n.camelCase = N, n.trim = function (t) {
	    return null == t ? "" : String.prototype.trim.call(t);
	  }, n.uuid = 0, n.support = {}, n.expr = {}, n.noop = function () {}, n.map = function (t, e) {
	    var n,
	        r,
	        o,
	        i = [];if (R(t)) for (r = 0; r < t.length; r++) n = e(t[r], r), null != n && i.push(n);else for (o in t) n = e(t[o], o), null != n && i.push(n);return W(i);
	  }, n.each = function (t, e) {
	    var n, i;if (R(t)) {
	      for (n = 0; n < t.length; n++) if (e.call(t[n], n, t[n]) === !1) return t;
	    } else for (i in t) if (e.call(t[i], i, t[i]) === !1) return t;return t;
	  }, n.grep = function (t, e) {
	    return s.call(t, e);
	  }, window.JSON && (n.parseJSON = JSON.parse), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
	    j["[object " + e + "]"] = e.toLowerCase();
	  }), n.fn = { constructor: C.Z, length: 0, forEach: r.forEach, reduce: r.reduce, push: r.push, sort: r.sort, splice: r.splice, indexOf: r.indexOf, concat: function concat() {
	      var t,
	          e,
	          n = [];for (t = 0; t < arguments.length; t++) e = arguments[t], n[t] = C.isZ(e) ? e.toArray() : e;return o.apply(C.isZ(this) ? this.toArray() : this, n);
	    }, map: function map(t) {
	      return n(n.map(this, function (e, n) {
	        return t.call(e, n, e);
	      }));
	    }, slice: function slice() {
	      return n(a.apply(this, arguments));
	    }, ready: function ready(t) {
	      return (E.test(u.readyState) && u.body ? t(n) : u.addEventListener("DOMContentLoaded", function () {
	        t(n);
	      }, !1), this);
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
	      return (r.every.call(this, function (e, n) {
	        return t.call(e, n, e) !== !1;
	      }), this);
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
	          i = this;return e = t ? "object" == typeof t ? n(t).filter(function () {
	        var t = this;return r.some.call(i, function (e) {
	          return n.contains(e, t);
	        });
	      }) : 1 == this.length ? n(C.qsa(this[0], t)) : this.map(function () {
	        return C.qsa(this, t);
	      }) : n();
	    }, closest: function closest(t, e) {
	      var i = this[0],
	          r = !1;for ("object" == typeof t && (r = n(t)); i && !(r ? r.indexOf(i) >= 0 : C.matches(i, t));) i = i !== e && !Z(i) && i.parentNode;return n(i);
	    }, parents: function parents(t) {
	      for (var e = [], i = this; i.length > 0;) i = n.map(i, function (t) {
	        return (t = t.parentNode) && !Z(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0;
	      });return V(e, t);
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
	        n(this[0]).before(t = n(t));for (var e; (e = t.children()).length;) t = e.first();n(t).append(this);
	      }return this;
	    }, wrapInner: function wrapInner(t) {
	      var e = L(t);return this.each(function (i) {
	        var r = n(this),
	            o = r.contents(),
	            s = e ? t.call(this, i) : t;o.length ? o.wrapAll(s) : r.append(s);
	      });
	    }, unwrap: function unwrap() {
	      return (this.parent().each(function () {
	        n(this).replaceWith(n(this).children());
	      }), this);
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
	        if (1 === this.nodeType) if ($(n)) for (e in n) J(this, e, n[e]);else J(this, n, Y(this, i, t, this.getAttribute(n)));
	      }) : this.length && 1 === this[0].nodeType ? !(r = this[0].getAttribute(n)) && n in this[0] ? this[0][n] : r : t;
	    }, removeAttr: function removeAttr(t) {
	      return this.each(function () {
	        1 === this.nodeType && t.split(" ").forEach(function (t) {
	          J(this, t);
	        }, this);
	      });
	    }, prop: function prop(t, e) {
	      return (t = M[t] || t, 1 in arguments ? this.each(function (n) {
	        this[t] = Y(this, e, n, this[t]);
	      }) : this[0] && this[0][t]);
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
	            o = this[0];if (!o) return;if ((r = getComputedStyle(o, ""), "string" == typeof t)) return o.style[N(t)] || r.getPropertyValue(t);if (A(t)) {
	          var s = {};return (n.each(t, function (t, e) {
	            s[e] = o.style[N(e)] || r.getPropertyValue(e);
	          }), s);
	        }
	      }var a = "";if ("string" == D(t)) i || 0 === i ? a = z(t) + ":" + _(t, i) : this.each(function () {
	        this.style.removeProperty(z(t));
	      });else for (e in t) t[e] || 0 === t[e] ? a += z(e) + ":" + _(e, t[e]) + ";" : this.each(function () {
	        this.style.removeProperty(z(e));
	      });return this.each(function () {
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
	        var n = ("scrollTop" in this[0]);return e === t ? n ? this[0].scrollTop : this[0].pageYOffset : this.each(n ? function () {
	          this.scrollTop = e;
	        } : function () {
	          this.scrollTo(this.scrollX, e);
	        });
	      }
	    }, scrollLeft: function scrollLeft(e) {
	      if (this.length) {
	        var n = ("scrollLeft" in this[0]);return e === t ? n ? this[0].scrollLeft : this[0].pageXOffset : this.each(n ? function () {
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
	            r = m.test(e[0].nodeName) ? { top: 0, left: 0 } : e.offset();return (i.top -= parseFloat(n(t).css("margin-top")) || 0, i.left -= parseFloat(n(t).css("margin-left")) || 0, r.top += parseFloat(n(e[0]).css("border-top-width")) || 0, r.left += parseFloat(n(e[0]).css("border-left-width")) || 0, { top: i.top - r.top, left: i.left - r.left });
	      }
	    }, offsetParent: function offsetParent() {
	      return this.map(function () {
	        for (var t = this.offsetParent || u.body; t && !m.test(t.nodeName) && "static" == n(t).css("position");) t = t.offsetParent;return t;
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
	        return (t = D(e), "object" == t || "array" == t || null == e ? e : C.fragment(e));
	      }),
	          s = this.length > 1;return r.length < 1 ? this : this.each(function (t, a) {
	        o = i ? a : a.parentNode, a = 0 == e ? a.nextSibling : 1 == e ? a.firstChild : 2 == e ? a : null;var f = n.contains(u.documentElement, o);r.forEach(function (t) {
	          if (s) t = t.cloneNode(!0);else if (!o) return n(t).remove();o.insertBefore(t, a), f && Q(t, function (t) {
	            null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML);
	          });
	        });
	      });
	    }, n.fn[i ? t + "To" : "insert" + (e ? "Before" : "After")] = function (e) {
	      return (n(e)[t](this), this);
	    };
	  }), C.Z.prototype = X.prototype = n.fn, C.uniq = P, C.deserializeValue = K, n.zepto = C, n);
	})();window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto), (function (t) {
	  function l(t) {
	    return t._zid || (t._zid = e++);
	  }function h(t, e, n, i) {
	    if ((e = p(e), e.ns)) var r = d(e.ns);return (s[l(t)] || []).filter(function (t) {
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
	      if ("ready" == i) return t(document).ready(r);var s = p(i);s.fn = r, s.sel = a, s.e in c && (r = function (e) {
	        var n = e.relatedTarget;return !n || n !== this && !t.contains(this, n) ? s.fn.apply(this, arguments) : void 0;
	      }), s.del = u;var l = u || r;s.proxy = function (t) {
	        if ((t = T(t), !t.isImmediatePropagationStopped())) {
	          t.data = o;var i = l.apply(e, t._args == n ? [t] : [t].concat(t._args));return (i === !1 && (t.preventDefault(), t.stopPropagation()), i);
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
	    return ((i || !e.isDefaultPrevented) && (i || (i = e), t.each(E, function (t, n) {
	      var r = i[t];e[t] = function () {
	        return (this[n] = w, r && r.apply(i, arguments));
	      }, e[n] = x;
	    }), (i.defaultPrevented !== n ? i.defaultPrevented : "returnValue" in i ? i.returnValue === !1 : i.getPreventDefault && i.getPreventDefault()) && (e.isDefaultPrevented = w)), e);
	  }function j(t) {
	    var e,
	        i = { originalEvent: t };for (e in t) b.test(e) || t[e] === n || (i[e] = t[e]);return T(i, t);
	  }var n,
	      e = 1,
	      i = Array.prototype.slice,
	      r = t.isFunction,
	      o = function o(t) {
	    return "string" == typeof t;
	  },
	      s = {},
	      a = {},
	      u = ("onfocusin" in window),
	      f = { focus: "focusin", blur: "focusout" },
	      c = { mouseenter: "mouseover", mouseleave: "mouseout" };a.click = a.mousedown = a.mouseup = a.mousemove = "MouseEvents", t.event = { add: v, remove: y }, t.proxy = function (e, n) {
	    var s = 2 in arguments && i.call(arguments, 2);if (r(e)) {
	      var a = function a() {
	        return e.apply(n, s ? s.concat(i.call(arguments)) : arguments);
	      };return (a._zid = l(e), a);
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
	    return (t(document.body).delegate(this.selector, e, n), this);
	  }, t.fn.die = function (e, n) {
	    return (t(document.body).undelegate(this.selector, e, n), this);
	  }, t.fn.on = function (e, s, a, u, f) {
	    var c,
	        l,
	        h = this;return e && !o(e) ? (t.each(e, function (t, e) {
	      h.on(t, s, a, e, f);
	    }), h) : (o(s) || r(u) || u === !1 || (u = a, a = s, s = n), (u === n || a === !1) && (u = a, a = n), u === !1 && (u = x), h.each(function (n, r) {
	      f && (c = function (t) {
	        return (y(r, t.type, u), u.apply(this, arguments));
	      }), s && (l = function (e) {
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
	    return (e = o(e) || t.isPlainObject(e) ? t.Event(e) : T(e), e._args = n, this.each(function () {
	      e.type in f && "function" == typeof this[e.type] ? this[e.type]() : "dispatchEvent" in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n);
	    }));
	  }, t.fn.triggerHandler = function (e, n) {
	    var i, r;return (this.each(function (s, a) {
	      i = j(o(e) ? t.Event(e) : e), i._args = n, i.target = a, t.each(h(a, e.type || e), function (t, e) {
	        return (r = e.proxy(i), i.isImmediatePropagationStopped() ? !1 : void 0);
	      });
	    }), r);
	  }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (e) {
	    t.fn[e] = function (t) {
	      return 0 in arguments ? this.bind(e, t) : this.trigger(e);
	    };
	  }), t.Event = function (t, e) {
	    o(t) || (e = t, t = e.type);var n = document.createEvent(a[t] || "Events"),
	        i = !0;if (e) for (var r in e) "bubbles" == r ? i = !!e[r] : n[r] = e[r];return (n.initEvent(t, i, !0), T(n));
	  };
	})(Zepto), (function (t) {
	  function h(e, n, i) {
	    var r = t.Event(n);return (t(e).trigger(r, i), !r.isDefaultPrevented());
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
	    return (t && (t = t.split(";", 2)[0]), t && (t == f ? "html" : t == u ? "json" : s.test(t) ? "script" : a.test(t) && "xml") || "text");
	  }function E(t, e) {
	    return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?");
	  }function T(e) {
	    e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = E(e.url, e.data), e.data = void 0);
	  }function j(e, n, i, r) {
	    return (t.isFunction(n) && (r = i, i = n, n = void 0), t.isFunction(i) || (r = i, i = void 0), { url: e, data: n, success: i, dataType: r });
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
	        l = { abort: c };return (r && r.promise(l), t(a).on("load error", function (e, n) {
	      clearTimeout(h), t(a).off().remove(), "error" != e.type && f ? v(f[0], l, i, r) : y(null, n || "error", l, i, r), window[s] = u, f && t.isFunction(u) && u(f[0]), u = f = void 0;
	    }), g(l, i) === !1 ? (c("abort"), l) : (window[s] = function () {
	      f = arguments;
	    }, a.src = i.url.replace(/\?(.+)=\?/, "?$1=" + s), n.head.appendChild(a), i.timeout > 0 && (h = setTimeout(function () {
	      c("timeout");
	    }, i.timeout)), l));
	  }, t.ajaxSettings = { type: "GET", beforeSend: x, success: x, error: x, complete: x, context: null, global: !0, xhr: function xhr() {
	      return new window.XMLHttpRequest();
	    }, accepts: { script: "text/javascript, application/javascript, application/x-javascript", json: u, xml: "application/xml, text/xml", html: f, text: "text/plain" }, crossDomain: !1, timeout: 0, processData: !0, cache: !0 }, t.ajax = function (e) {
	    var a,
	        u,
	        o = t.extend({}, e || {}),
	        s = t.Deferred && t.Deferred();for (i in t.ajaxSettings) void 0 === o[i] && (o[i] = t.ajaxSettings[i]);d(o), o.crossDomain || (a = n.createElement("a"), a.href = o.url, a.href = a.href, o.crossDomain = l.protocol + "//" + l.host != a.protocol + "//" + a.host), o.url || (o.url = window.location.toString()), (u = o.url.indexOf("#")) > -1 && (o.url = o.url.slice(0, u)), T(o);var f = o.dataType,
	        h = /\?.+=\?/.test(o.url);if ((h && (f = "jsonp"), o.cache !== !1 && (e && e.cache === !0 || "script" != f && "jsonp" != f) || (o.url = E(o.url, "_=" + Date.now())), "jsonp" == f)) return (h || (o.url = E(o.url, o.jsonp ? o.jsonp + "=?" : o.jsonp === !1 ? "" : "callback=?")), t.ajaxJSONP(o, s));var N,
	        p = o.accepts[f],
	        m = {},
	        w = function w(t, e) {
	      m[t.toLowerCase()] = [t, e];
	    },
	        j = /^([\w-]+:)\/\//.test(o.url) ? RegExp.$1 : window.location.protocol,
	        S = o.xhr(),
	        C = S.setRequestHeader;if ((s && s.promise(S), o.crossDomain || w("X-Requested-With", "XMLHttpRequest"), w("Accept", p || "*/*"), (p = o.mimeType || p) && (p.indexOf(",") > -1 && (p = p.split(",", 2)[0]), S.overrideMimeType && S.overrideMimeType(p)), (o.contentType || o.contentType !== !1 && o.data && "GET" != o.type.toUpperCase()) && w("Content-Type", o.contentType || "application/x-www-form-urlencoded"), o.headers)) for (r in o.headers) w(r, o.headers[r]);if ((S.setRequestHeader = w, S.onreadystatechange = function () {
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
	    }, g(S, o) === !1)) return (S.abort(), y(null, "abort", S, o, s), S);if (o.xhrFields) for (r in o.xhrFields) S[r] = o.xhrFields[r];var P = "async" in o ? o.async : !0;S.open(o.type, o.url, P, o.username, o.password);for (r in m) C.apply(S, m[r]);return (o.timeout > 0 && (N = setTimeout(function () {
	      S.onreadystatechange = x, S.abort(), y(null, "timeout", S, o, s);
	    }, o.timeout)), S.send(o.data ? o.data : null), S);
	  }, t.get = function () {
	    return t.ajax(j.apply(null, arguments));
	  }, t.post = function () {
	    var e = j.apply(null, arguments);return (e.type = "POST", t.ajax(e));
	  }, t.getJSON = function () {
	    var e = j.apply(null, arguments);return (e.dataType = "json", t.ajax(e));
	  }, t.fn.load = function (e, n, i) {
	    if (!this.length) return this;var a,
	        r = this,
	        s = e.split(/\s/),
	        u = j(e, n, i),
	        f = u.success;return (s.length > 1 && (u.url = s[0], a = s[1]), u.success = function (e) {
	      r.html(a ? t("<div>").html(e.replace(o, "")).find(a) : e), f && f.apply(r, arguments);
	    }, t.ajax(u), this);
	  };var S = encodeURIComponent;t.param = function (e, n) {
	    var i = [];return (i.add = function (e, n) {
	      t.isFunction(n) && (n = n()), null == n && (n = ""), this.push(S(e) + "=" + S(n));
	    }, C(i, e, n), i.join("&").replace(/%20/g, "+"));
	  };
	})(Zepto), (function (t) {
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
	      for (n = e.memory && t, i = !0, a = o || 0, o = 0, s = u.length, r = !0; u && s > a; ++a) if (u[a].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
	        n = !1;break;
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
	        return (u && t.each(arguments, function (e, n) {
	          for (var i; (i = t.inArray(n, u, i)) > -1;) u.splice(i, 1), r && (s >= i && --s, a >= i && --a);
	        }), this);
	      }, has: function has(e) {
	        return !(!u || !(e ? t.inArray(e, u) > -1 : u.length));
	      }, empty: function empty() {
	        return (s = u.length = 0, this);
	      }, disable: function disable() {
	        return (u = f = n = void 0, this);
	      }, disabled: function disabled() {
	        return !u;
	      }, lock: function lock() {
	        return (f = void 0, n || l.disable(), this);
	      }, locked: function locked() {
	        return !f;
	      }, fireWith: function fireWith(t, e) {
	        return (!u || i && !f || (e = e || [], e = [t, e.slice ? e.slice() : e], r ? f.push(e) : c(e)), this);
	      }, fire: function fire() {
	        return l.fireWith(this, arguments);
	      }, fired: function fired() {
	        return !!i;
	      } };return l;
	  };
	})(Zepto), (function (t) {
	  function n(e) {
	    var i = [["resolve", "done", t.Callbacks({ once: 1, memory: 1 }), "resolved"], ["reject", "fail", t.Callbacks({ once: 1, memory: 1 }), "rejected"], ["notify", "progress", t.Callbacks({ memory: 1 })]],
	        r = "pending",
	        o = { state: function state() {
	        return r;
	      }, always: function always() {
	        return (s.done(arguments).fail(arguments), this);
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
	        s = {};return (t.each(i, function (t, e) {
	      var n = e[2],
	          a = e[3];o[e[1]] = n.add, a && n.add(function () {
	        r = a;
	      }, i[1 ^ t][2].disable, i[2][2].lock), s[e[0]] = function () {
	        return (s[e[0] + "With"](this === s ? o : this, arguments), this);
	      }, s[e[0] + "With"] = n.fireWith;
	    }), o.promise(s), e && e.call(s, s), s);
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
	    };if (o > 1) for (f = new Array(o), c = new Array(o), l = new Array(o); o > s; ++s) r[s] && t.isFunction(r[s].promise) ? r[s].promise().done(h(s, l, r)).fail(u.reject).progress(h(s, c, f)) : --a;return (a || u.resolveWith(l, r), u.promise());
	  }, t.Deferred = n;
	})(Zepto), (function (t) {
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
	})(Zepto), (function (t) {
	  function r(e) {
	    return (e = t(e), !(!e.width() && !e.height()) && "none" !== e.css("display"));
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
	        throw (console.error("error performing selector: %o", r), h);
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
	})(Zepto), (function () {
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
	})();
	module.exports = Zepto;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utils = __webpack_require__(2);

	var _clapprZepto = __webpack_require__(26);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _lodashResult = __webpack_require__(28);

	var _lodashResult2 = _interopRequireDefault(_lodashResult);

	var _lodashAssign = __webpack_require__(3);

	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);

	var _base_object = __webpack_require__(15);

	var _base_object2 = _interopRequireDefault(_base_object);

	var delegateEventSplitter = /^(\S+)\s*(.*)$/;

	/**
	 * A base class to create ui object.
	 * @class UIObject
	 * @constructor
	 * @extends BaseObject
	 * @module base
	 * @since 1.0.0
	 */

	var UIObject = (function (_BaseObject) {
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

	    _get(Object.getPrototypeOf(UIObject.prototype), 'constructor', this).call(this, options);
	    this.cid = (0, _utils.uniqueId)('c');
	    this._ensureElement();
	    this.delegateEvents();
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

	  _createClass(UIObject, [{
	    key: '$',
	    value: function $(selector) {
	      return this.$el.find(selector);
	    }

	    /**
	     * render the component, usually attach it to a real existent `element`
	     * @method render
	     * @return {UIObject} itself
	     */
	  }, {
	    key: 'render',
	    value: function render() {
	      return this;
	    }

	    /**
	     * removes the ui component from DOM
	     * @method remove
	     * @return {UIObject} itself
	     */
	  }, {
	    key: 'remove',
	    value: function remove() {
	      this.$el.remove();
	      this.stopListening();
	      this.undelegateEvents();
	      return this;
	    }

	    /**
	     * set element to `el` and `$el`
	     * @method setElement
	     * @param {HTMLElement} element
	     * @param {Boolean} delegate whether is delegate or not
	     * @return {UIObject} itself
	     */
	  }, {
	    key: 'setElement',
	    value: function setElement(element, delegate) {
	      if (this.$el) this.undelegateEvents();
	      this.$el = element instanceof _clapprZepto2['default'] ? element : (0, _clapprZepto2['default'])(element);
	      this.el = this.$el[0];
	      if (delegate !== false) this.delegateEvents();
	      return this;
	    }

	    /**
	     * delegates all the original `events` on `element` to its callbacks
	     * @method delegateEvents
	     * @param {Object} events
	     * @return {UIObject} itself
	     */
	  }, {
	    key: 'delegateEvents',
	    value: function delegateEvents(events) {
	      if (!(events || (events = (0, _lodashResult2['default'])(this, 'events')))) return this;
	      this.undelegateEvents();
	      for (var key in events) {
	        var method = events[key];
	        if (method && method.constructor !== Function) method = this[events[key]];
	        if (!method) continue;

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
	    }

	    /**
	     * undelegats all the `events`
	     * @method undelegateEvents
	     * @return {UIObject} itself
	     */
	  }, {
	    key: 'undelegateEvents',
	    value: function undelegateEvents() {
	      this.$el.off('.delegateEvents' + this.cid);
	      return this;
	    }

	    /**
	     * ensures the creation of this ui component
	     * @method _ensureElement
	     * @private
	     */
	  }, {
	    key: '_ensureElement',
	    value: function _ensureElement() {
	      if (!this.el) {
	        var attrs = (0, _lodashAssign2['default'])({}, (0, _lodashResult2['default'])(this, 'attributes'));
	        if (this.id) attrs.id = (0, _lodashResult2['default'])(this, 'id');
	        if (this.className) attrs['class'] = (0, _lodashResult2['default'])(this, 'className');
	        var $el = (0, _clapprZepto2['default'])('<' + (0, _lodashResult2['default'])(this, 'tagName') + '>').attr(attrs);
	        this.setElement($el, false);
	      } else {
	        this.setElement((0, _lodashResult2['default'])(this, 'el'), false);
	      }
	    }
	  }]);

	  return UIObject;
	})(_base_object2['default']);

	exports['default'] = UIObject;
	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var isFunction = __webpack_require__(29);

	/**
	 * Resolves the value of property `key` on `object`. If the value of `key` is
	 * a function it is invoked with the `this` binding of `object` and its result
	 * is returned, else the property value is returned. If the property value is
	 * `undefined` the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the property to resolve.
	 * @param {*} [defaultValue] The value returned if the property value
	 *  resolves to `undefined`.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'user': 'fred', 'age': _.constant(40) };
	 *
	 * _.result(object, 'user');
	 * // => 'fred'
	 *
	 * _.result(object, 'age');
	 * // => 40
	 *
	 * _.result(object, 'status', 'busy');
	 * // => 'busy'
	 *
	 * _.result(object, 'status', _.constant('busy'));
	 * // => 'busy'
	 */
	function result(object, key, defaultValue) {
	  var value = object == null ? undefined : object[key];
	  if (typeof value == 'undefined') {
	    value = defaultValue;
	  }
	  return isFunction(value) ? value.call(object) : value;
	}

	module.exports = result;

/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.6 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	'use strict';

	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

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
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isFunction;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(31);

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	/**
	 * The ContainerFactory is responsible for manage playback bootstrap and create containers.
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _lodashAssign = __webpack_require__(3);

	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);

	var _baseBase_object = __webpack_require__(15);

	var _baseBase_object2 = _interopRequireDefault(_baseBase_object);

	var _container = __webpack_require__(32);

	var _container2 = _interopRequireDefault(_container);

	var _clapprZepto = __webpack_require__(26);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _lodashFind = __webpack_require__(38);

	var _lodashFind2 = _interopRequireDefault(_lodashFind);

	var ContainerFactory = (function (_BaseObject) {
	  _inherits(ContainerFactory, _BaseObject);

	  function ContainerFactory(options, loader) {
	    _classCallCheck(this, ContainerFactory);

	    _get(Object.getPrototypeOf(ContainerFactory.prototype), 'constructor', this).call(this, options);
	    this.options = options;
	    this.loader = loader;
	  }

	  _createClass(ContainerFactory, [{
	    key: 'createContainers',
	    value: function createContainers() {
	      var _this = this;

	      return _clapprZepto2['default'].Deferred(function (promise) {
	        promise.resolve(_this.options.sources.map(function (source) {
	          return _this.createContainer(source);
	        }));
	      });
	    }
	  }, {
	    key: 'findPlaybackPlugin',
	    value: function findPlaybackPlugin(source) {
	      var _this2 = this;

	      return (0, _lodashFind2['default'])(this.loader.playbackPlugins, function (p) {
	        return p.canPlay(source.toString(), _this2.options.mimeType);
	      });
	    }
	  }, {
	    key: 'createContainer',
	    value: function createContainer(source, options) {
	      if (!!source.match(/^\/\//)) source = window.location.protocol + source;
	      options = (0, _lodashAssign2['default'])({}, this.options, { src: source }, options);
	      var playbackPlugin = this.findPlaybackPlugin(source);
	      var playback = new playbackPlugin(options);
	      var container = new _container2['default']({ playback: playback });
	      var defer = _clapprZepto2['default'].Deferred();
	      defer.promise(container);
	      this.addContainerPlugins(container, source);
	      this.listenToOnce(container, _baseEvents2['default'].CONTAINER_READY, function () {
	        return defer.resolve(container);
	      });
	      return container;
	    }
	  }, {
	    key: 'addContainerPlugins',
	    value: function addContainerPlugins(container, source) {
	      var _this3 = this;

	      this.loader.containerPlugins.forEach(function (Plugin) {
	        var options = (0, _lodashAssign2['default'])(_this3.options, { container: container, src: source });
	        container.addPlugin(new Plugin(options));
	      });
	    }
	  }]);

	  return ContainerFactory;
	})(_baseBase_object2['default']);

	exports['default'] = ContainerFactory;
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(33);

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	/**
	 * Container is responsible for the video rendering and state
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _baseUi_object = __webpack_require__(27);

	var _baseUi_object2 = _interopRequireDefault(_baseUi_object);

	var _baseStyler = __webpack_require__(34);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _publicStyleScss = __webpack_require__(36);

	var _publicStyleScss2 = _interopRequireDefault(_publicStyleScss);

	var _lodashFind = __webpack_require__(38);

	var _lodashFind2 = _interopRequireDefault(_lodashFind);

	var Container = (function (_UIObject) {
	  _inherits(Container, _UIObject);

	  _createClass(Container, [{
	    key: 'name',
	    get: function get() {
	      return 'Container';
	    }
	  }, {
	    key: 'attributes',
	    get: function get() {
	      return { 'class': 'container', 'data-container': '' };
	    }
	  }, {
	    key: 'events',
	    get: function get() {
	      return {
	        'click': 'clicked',
	        'dblclick': 'dblClicked',
	        'doubleTap': 'dblClicked',
	        'mouseenter': 'mouseEnter',
	        'mouseleave': 'mouseLeave'
	      };
	    }
	  }]);

	  function Container(options) {
	    _classCallCheck(this, Container);

	    _get(Object.getPrototypeOf(Container.prototype), 'constructor', this).call(this, options);
	    this.currentTime = 0;
	    this.playback = options.playback;
	    this.settings = this.playback.settings;
	    this.isReady = false;
	    this.mediaControlDisabled = false;
	    this.plugins = [this.playback];
	    this.bindEvents();
	  }

	  _createClass(Container, [{
	    key: 'bindEvents',
	    value: function bindEvents() {
	      this.listenTo(this.playback, _baseEvents2['default'].PLAYBACK_PROGRESS, this.progress);
	      this.listenTo(this.playback, _baseEvents2['default'].PLAYBACK_TIMEUPDATE, this.timeUpdated);
	      this.listenTo(this.playback, _baseEvents2['default'].PLAYBACK_READY, this.ready);
	      this.listenTo(this.playback, _baseEvents2['default'].PLAYBACK_BUFFERING, this.buffering);
	      this.listenTo(this.playback, _baseEvents2['default'].PLAYBACK_BUFFERFULL, this.bufferfull);
	      this.listenTo(this.playback, _baseEvents2['default'].PLAYBACK_SETTINGSUPDATE, this.settingsUpdate);
	      this.listenTo(this.playback, _baseEvents2['default'].PLAYBACK_LOADEDMETADATA, this.loadedMetadata);
	      this.listenTo(this.playback, _baseEvents2['default'].PLAYBACK_HIGHDEFINITIONUPDATE, this.highDefinitionUpdate);
	      this.listenTo(this.playback, _baseEvents2['default'].PLAYBACK_BITRATE, this.updateBitrate);
	      this.listenTo(this.playback, _baseEvents2['default'].PLAYBACK_PLAYBACKSTATE, this.playbackStateChanged);
	      this.listenTo(this.playback, _baseEvents2['default'].PLAYBACK_DVR, this.playbackDvrStateChanged);
	      this.listenTo(this.playback, _baseEvents2['default'].PLAYBACK_MEDIACONTROL_DISABLE, this.disableMediaControl);
	      this.listenTo(this.playback, _baseEvents2['default'].PLAYBACK_MEDIACONTROL_ENABLE, this.enableMediaControl);
	      this.listenTo(this.playback, _baseEvents2['default'].PLAYBACK_ENDED, this.ended);
	      this.listenTo(this.playback, _baseEvents2['default'].PLAYBACK_PLAY, this.playing);
	      this.listenTo(this.playback, _baseEvents2['default'].PLAYBACK_PAUSE, this.paused);
	      this.listenTo(this.playback, _baseEvents2['default'].PLAYBACK_ERROR, this.error);
	    }
	  }, {
	    key: 'playbackStateChanged',
	    value: function playbackStateChanged() {
	      this.trigger(_baseEvents2['default'].CONTAINER_PLAYBACKSTATE);
	    }
	  }, {
	    key: 'playbackDvrStateChanged',
	    value: function playbackDvrStateChanged(dvrInUse) {
	      this.settings = this.playback.settings;
	      this.dvrInUse = dvrInUse;
	      this.trigger(_baseEvents2['default'].CONTAINER_PLAYBACKDVRSTATECHANGED, dvrInUse);
	    }
	  }, {
	    key: 'updateBitrate',
	    value: function updateBitrate(newBitrate) {
	      this.trigger(_baseEvents2['default'].CONTAINER_BITRATE, newBitrate);
	    }
	  }, {
	    key: 'statsReport',
	    value: function statsReport(metrics) {
	      this.trigger(_baseEvents2['default'].CONTAINER_STATS_REPORT, metrics);
	    }
	  }, {
	    key: 'getPlaybackType',
	    value: function getPlaybackType() {
	      return this.playback.getPlaybackType();
	    }
	  }, {
	    key: 'isDvrEnabled',
	    value: function isDvrEnabled() {
	      return !!this.playback.dvrEnabled;
	    }
	  }, {
	    key: 'isDvrInUse',
	    value: function isDvrInUse() {
	      return !!this.dvrInUse;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.trigger(_baseEvents2['default'].CONTAINER_DESTROYED, this, this.name);
	      this.stopListening();
	      this.playback.destroy();
	      this.plugins.forEach(function (plugin) {
	        return plugin.destroy();
	      });
	      this.$el.remove();
	    }
	  }, {
	    key: 'setStyle',
	    value: function setStyle(style) {
	      this.$el.css(style);
	    }
	  }, {
	    key: 'animate',
	    value: function animate(style, duration) {
	      return this.$el.animate(style, duration).promise();
	    }
	  }, {
	    key: 'ready',
	    value: function ready() {
	      this.isReady = true;
	      this.trigger(_baseEvents2['default'].CONTAINER_READY, this.name);
	    }
	  }, {
	    key: 'isPlaying',
	    value: function isPlaying() {
	      return this.playback.isPlaying();
	    }
	  }, {
	    key: 'getCurrentTime',
	    value: function getCurrentTime() {
	      return this.currentTime;
	    }
	  }, {
	    key: 'getDuration',
	    value: function getDuration() {
	      return this.playback.getDuration();
	    }
	  }, {
	    key: 'error',
	    value: function error(errorObj) {
	      this.trigger(_baseEvents2['default'].CONTAINER_ERROR, { error: errorObj, container: this }, this.name);
	    }
	  }, {
	    key: 'loadedMetadata',
	    value: function loadedMetadata(duration) {
	      this.trigger(_baseEvents2['default'].CONTAINER_LOADEDMETADATA, duration);
	    }
	  }, {
	    key: 'timeUpdated',
	    value: function timeUpdated(position, duration) {
	      this.currentTime = position;
	      this.trigger(_baseEvents2['default'].CONTAINER_TIMEUPDATE, position, duration, this.name);
	    }
	  }, {
	    key: 'progress',
	    value: function progress(startPosition, endPosition, duration) {
	      this.trigger(_baseEvents2['default'].CONTAINER_PROGRESS, startPosition, endPosition, duration, this.name);
	    }
	  }, {
	    key: 'playing',
	    value: function playing() {
	      this.trigger(_baseEvents2['default'].CONTAINER_PLAY, this.name);
	    }
	  }, {
	    key: 'paused',
	    value: function paused() {
	      this.trigger(_baseEvents2['default'].CONTAINER_PAUSE, this.name);
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      this.playback.play();
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.trigger(_baseEvents2['default'].CONTAINER_STOP, this.name);
	      this.playback.stop();
	      this.currentTime = 0;
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.playback.pause();
	    }
	  }, {
	    key: 'ended',
	    value: function ended() {
	      this.trigger(_baseEvents2['default'].CONTAINER_ENDED, this, this.name);
	      this.currentTime = 0;
	    }
	  }, {
	    key: 'clicked',
	    value: function clicked() {
	      this.trigger(_baseEvents2['default'].CONTAINER_CLICK, this, this.name);
	    }
	  }, {
	    key: 'dblClicked',
	    value: function dblClicked() {
	      this.trigger(_baseEvents2['default'].CONTAINER_DBLCLICK, this, this.name);
	    }
	  }, {
	    key: 'setCurrentTime',
	    value: function setCurrentTime(time) {
	      this.trigger(_baseEvents2['default'].CONTAINER_SEEK, time, this.name);
	      this.playback.seek(time);
	    }
	  }, {
	    key: 'setVolume',
	    value: function setVolume(value) {
	      this.trigger(_baseEvents2['default'].CONTAINER_VOLUME, value, this.name);
	      this.playback.volume(value);
	    }
	  }, {
	    key: 'fullscreen',
	    value: function fullscreen() {
	      this.trigger(_baseEvents2['default'].CONTAINER_FULLSCREEN, this.name);
	    }
	  }, {
	    key: 'buffering',
	    value: function buffering() {
	      this.trigger(_baseEvents2['default'].CONTAINER_STATE_BUFFERING, this.name);
	    }
	  }, {
	    key: 'bufferfull',
	    value: function bufferfull() {
	      this.trigger(_baseEvents2['default'].CONTAINER_STATE_BUFFERFULL, this.name);
	    }
	  }, {
	    key: 'addPlugin',
	    value: function addPlugin(plugin) {
	      this.plugins.push(plugin);
	    }
	  }, {
	    key: 'hasPlugin',
	    value: function hasPlugin(name) {
	      return !!this.getPlugin(name);
	    }
	  }, {
	    key: 'getPlugin',
	    value: function getPlugin(name) {
	      return (0, _lodashFind2['default'])(this.plugins, function (plugin) {
	        return plugin.name === name;
	      });
	    }
	  }, {
	    key: 'mouseEnter',
	    value: function mouseEnter() {
	      this.trigger(_baseEvents2['default'].CONTAINER_MOUSE_ENTER);
	    }
	  }, {
	    key: 'mouseLeave',
	    value: function mouseLeave() {
	      this.trigger(_baseEvents2['default'].CONTAINER_MOUSE_LEAVE);
	    }
	  }, {
	    key: 'settingsUpdate',
	    value: function settingsUpdate() {
	      this.settings = this.playback.settings;
	      this.trigger(_baseEvents2['default'].CONTAINER_SETTINGSUPDATE);
	    }
	  }, {
	    key: 'highDefinitionUpdate',
	    value: function highDefinitionUpdate() {
	      this.trigger(_baseEvents2['default'].CONTAINER_HIGHDEFINITIONUPDATE);
	    }
	  }, {
	    key: 'isHighDefinitionInUse',
	    value: function isHighDefinitionInUse() {
	      return this.playback.isHighDefinitionInUse();
	    }
	  }, {
	    key: 'disableMediaControl',
	    value: function disableMediaControl() {
	      this.mediaControlDisabled = true;
	      this.trigger(_baseEvents2['default'].CONTAINER_MEDIACONTROL_DISABLE);
	    }
	  }, {
	    key: 'enableMediaControl',
	    value: function enableMediaControl() {
	      this.mediaControlDisabled = false;
	      this.trigger(_baseEvents2['default'].CONTAINER_MEDIACONTROL_ENABLE);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var s = _baseStyler2['default'].getStyleFor(_publicStyleScss2['default']);
	      this.$el.append(s);
	      this.$el.append(this.playback.render().el);
	      return this;
	    }
	  }]);

	  return Container;
	})(_baseUi_object2['default']);

	exports['default'] = Container;
	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _clapprZepto = __webpack_require__(26);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _template = __webpack_require__(35);

	var _template2 = _interopRequireDefault(_template);

	var Styler = {
	  getStyleFor: function getStyleFor(style) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? { baseUrl: '' } : arguments[1];

	    return (0, _clapprZepto2['default'])('<style class="clappr-style"></style>').html((0, _template2['default'])(style.toString())(options));
	  }
	};

	exports['default'] = Styler;
	module.exports = exports['default'];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Simple JavaScript Templating
	// Paul Miller (http://paulmillr.com)
	// http://underscorejs.org
	"use strict";

	(function (globals) {
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
	    if (string == null) return '';
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
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n//# sourceURL=/microtemplates/source[" + counter++ + "]";

	    try {
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

	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return tmpl;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // RequireJS
	  } else if (typeof module !== 'undefined' && module.exports) {
	      module.exports = tmpl; // CommonJS
	    } else {
	        globals.microtemplate = tmpl; // <script>
	      }
	})(undefined);
	// (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, ".container[data-container] {\n  position: absolute;\n  background-color: black;\n  height: 100%;\n  width: 100%; }\n  .container[data-container].pointer-enabled {\n    cursor: pointer; }\n", ""]);

	// exports


/***/ },
/* 37 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	"use strict";

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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var baseCallback = __webpack_require__(39),
	    baseEach = __webpack_require__(51),
	    baseFind = __webpack_require__(55),
	    findIndex = __webpack_require__(56),
	    isArray = __webpack_require__(41);

	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	 * invoked with three arguments; (value, index|key, collection).
	 *
	 * If a property name is provided for `predicate` the created "_.property"
	 * style callback returns the property value of the given element.
	 *
	 * If an object is provided for `predicate` the created "_.matches" style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @alias detect
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration. If a property name or object is provided it is used to
	 *  create a "_.property" or "_.matches" style callback respectively.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': false },
	 *   { 'user': 'fred',    'age': 40, 'active': true },
	 *   { 'user': 'pebbles', 'age': 1,  'active': false }
	 * ];
	 *
	 * _.result(_.find(users, function(chr) { return chr.age < 40; }), 'user');
	 * // => 'barney'
	 *
	 * // using the "_.matches" callback shorthand
	 * _.result(_.find(users, { 'age': 1 }), 'user');
	 * // => 'pebbles'
	 *
	 * // using the "_.property" callback shorthand
	 * _.result(_.find(users, 'active'), 'user');
	 * // => 'fred'
	 */
	function find(collection, predicate, thisArg) {
	  if (isArray(collection)) {
	    var index = findIndex(collection, predicate, thisArg);
	    return index > -1 ? collection[index] : undefined;
	  }
	  predicate = baseCallback(predicate, thisArg, 3);
	  return baseFind(collection, predicate, baseEach);
	}

	module.exports = find;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.3.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var baseIsEqual = __webpack_require__(40),
	    bindCallback = __webpack_require__(46),
	    isArray = __webpack_require__(41),
	    pairs = __webpack_require__(47);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  return value == null ? '' : value + '';
	}

	/**
	 * The base implementation of `_.callback` which supports specifying the
	 * number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {*} [func=_.identity] The value to convert to a callback.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function baseCallback(func, thisArg, argCount) {
	  var type = typeof func;
	  if (type == 'function') {
	    return thisArg === undefined ? func : bindCallback(func, thisArg, argCount);
	  }
	  if (func == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return baseMatches(func);
	  }
	  return thisArg === undefined ? property(func) : baseMatchesProperty(func, thisArg);
	}

	/**
	 * The base implementation of `get` without support for string paths
	 * and default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path of the property to get.
	 * @param {string} [pathKey] The key representation of path.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path, pathKey) {
	  if (object == null) {
	    return;
	  }
	  if (pathKey !== undefined && pathKey in toObject(object)) {
	    path = [pathKey];
	  }
	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return index && index == length ? object : undefined;
	}

	/**
	 * The base implementation of `_.isMatch` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Array} matchData The propery names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = toObject(object);
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
	      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	/**
	 * The base implementation of `_.matches` which does not clone `source`.
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
	      return object[key] === value && (value !== undefined || key in toObject(object));
	    };
	  }
	  return function (object) {
	    return baseIsMatch(object, matchData);
	  };
	}

	/**
	 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to compare.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  var isArr = isArray(path),
	      isCommon = isKey(path) && isStrictComparable(srcValue),
	      pathKey = path + '';

	  path = toPath(path);
	  return function (object) {
	    if (object == null) {
	      return false;
	    }
	    var key = pathKey;
	    object = toObject(object);
	    if ((isArr || !isCommon) && !(key in object)) {
	      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	      if (object == null) {
	        return false;
	      }
	      key = last(path);
	      object = toObject(object);
	    }
	    return object[key] === srcValue ? srcValue !== undefined || key in object : baseIsEqual(srcValue, object[key], undefined, true);
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
	  var pathKey = path + '';
	  path = toPath(path);
	  return function (object) {
	    return baseGet(object, path, pathKey);
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

	  start = start == null ? 0 : +start || 0;
	  if (start < 0) {
	    start = -start > length ? 0 : length + start;
	  }
	  end = end === undefined || end > length ? length : +end || 0;
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
	 * Gets the propery names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = pairs(object),
	      length = result.length;

	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
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
	  var type = typeof value;
	  if (type == 'string' && reIsPlainProp.test(value) || type == 'number') {
	    return true;
	  }
	  if (isArray(value)) {
	    return false;
	  }
	  var result = !reIsDeepProp.test(value);
	  return result || object != null && value in toObject(object);
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
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	/**
	 * Converts `value` to property path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array} Returns the property path array.
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return value;
	  }
	  var result = [];
	  baseToString(value).replace(rePropName, function (match, number, quote, string) {
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
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
	 * Creates a function that returns the property value at `path` on a
	 * given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
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
	 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}

	module.exports = baseCallback;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.7 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var isArray = __webpack_require__(41),
	    isTypedArray = __webpack_require__(42),
	    keys = __webpack_require__(43);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * A specialized version of `_.some` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
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
	 * The base implementation of `_.isEqual` without support for `this` binding
	 * `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
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
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = objToString.call(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = objToString.call(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag);
	  }
	  if (!isLoose) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  // For more information on detecting circular references see https://es5.github.io/#JO.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == object) {
	      return stackB[length] == other;
	    }
	  }
	  // Add `object` and `other` to the stack of traversed objects.
	  stackA.push(object);
	  stackB.push(other);

	  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

	  stackA.pop();
	  stackB.pop();

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
	 * @param {Function} [customizer] The function to customize comparing arrays.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var index = -1,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
	    return false;
	  }
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index],
	        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

	    if (result !== undefined) {
	      if (result) {
	        continue;
	      }
	      return false;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isLoose) {
	      if (!arraySome(other, function (othValue) {
	        return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
	      })) {
	        return false;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
	      return false;
	    }
	  }
	  return true;
	}

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} value The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag) {
	  switch (tag) {
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
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isLoose) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  var skipCtor = isLoose;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key],
	        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose ? objValue : othValue, key) : undefined;

	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
	      return false;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (!skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      return false;
	    }
	  }
	  return true;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = baseIsEqual;

/***/ },
/* 41 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	'use strict';

	var arrayTag = '[object Array]',
	    funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function (value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

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
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
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
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isArray;

/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	'use strict';

	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
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

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
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
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}

	module.exports = isTypedArray;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var getNative = __webpack_require__(44),
	    isArguments = __webpack_require__(45),
	    isArray = __webpack_require__(41);

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

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
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
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
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if (allowIndexes && isIndex(key, length) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
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
	var keys = !nativeKeys ? shimKeys : function (object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if (typeof Ctor == 'function' && Ctor.prototype === object || typeof object != 'function' && isArrayLike(object)) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
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
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = length && isLength(length) && (isArray(object) || isArguments(object)) && length || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = index + '';
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;

/***/ },
/* 44 */
/***/ function(module, exports) {

	/**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	'use strict';

	var funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
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
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
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
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = getNative;

/***/ },
/* 45 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	'use strict';

	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

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
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is classified as an `arguments` object.
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
	  return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;

/***/ },
/* 46 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	'use strict';

	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1:
	      return function (value) {
	        return func.call(thisArg, value);
	      };
	    case 3:
	      return function (value, index, collection) {
	        return func.call(thisArg, value, index, collection);
	      };
	    case 4:
	      return function (accumulator, value, index, collection) {
	        return func.call(thisArg, accumulator, value, index, collection);
	      };
	    case 5:
	      return function (value, other, key, object, source) {
	        return func.call(thisArg, value, other, key, object, source);
	      };
	  }
	  return function () {
	    return func.apply(thisArg, arguments);
	  };
	}

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
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

	module.exports = bindCallback;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var keys = __webpack_require__(48);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Creates a two dimensional array of the key-value pairs for `object`,
	 * e.g. `[[key1, value1], [key2, value2]]`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * _.pairs({ 'barney': 36, 'fred': 40 });
	 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
	 */
	function pairs(object) {
	  object = toObject(object);

	  var index = -1,
	      props = keys(object),
	      length = props.length,
	      result = Array(length);

	  while (++index < length) {
	    var key = props[index];
	    result[index] = [key, object[key]];
	  }
	  return result;
	}

	module.exports = pairs;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var getNative = __webpack_require__(49),
	    isArguments = __webpack_require__(50),
	    isArray = __webpack_require__(41);

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

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
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
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
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if (allowIndexes && isIndex(key, length) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
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
	var keys = !nativeKeys ? shimKeys : function (object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if (typeof Ctor == 'function' && Ctor.prototype === object || typeof object != 'function' && isArrayLike(object)) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
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
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = length && isLength(length) && (isArray(object) || isArguments(object)) && length || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = index + '';
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;

/***/ },
/* 49 */
/***/ function(module, exports) {

	/**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	'use strict';

	var funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
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
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
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
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = getNative;

/***/ },
/* 50 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	'use strict';

	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

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
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is classified as an `arguments` object.
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
	  return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var keys = __webpack_require__(52);

	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
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
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
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
	    var length = collection ? getLength(collection) : 0;
	    if (!isLength(length)) {
	      return eachFunc(collection, iteratee);
	    }
	    var index = fromRight ? length : -1,
	        iterable = toObject(collection);

	    while (fromRight ? index-- : ++index < length) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function (object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while (fromRight ? index-- : ++index < length) {
	      var key = props[index];
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
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = baseEach;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var getNative = __webpack_require__(53),
	    isArguments = __webpack_require__(54),
	    isArray = __webpack_require__(41);

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

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
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
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
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if (allowIndexes && isIndex(key, length) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
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
	var keys = !nativeKeys ? shimKeys : function (object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if (typeof Ctor == 'function' && Ctor.prototype === object || typeof object != 'function' && isArrayLike(object)) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
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
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = length && isLength(length) && (isArray(object) || isArguments(object)) && length || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = index + '';
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;

/***/ },
/* 53 */
/***/ function(module, exports) {

	/**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	'use strict';

	var funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
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
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
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
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = getNative;

/***/ },
/* 54 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	'use strict';

	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

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
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is classified as an `arguments` object.
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
	  return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;

/***/ },
/* 55 */
/***/ function(module, exports) {

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
	"use strict";

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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.2.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var baseCallback = __webpack_require__(39),
	    baseFindIndex = __webpack_require__(57);

	/**
	 * Creates a `_.findIndex` or `_.findLastIndex` function.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new find function.
	 */
	function createFindIndex(fromRight) {
	  return function (array, predicate, thisArg) {
	    if (!(array && array.length)) {
	      return -1;
	    }
	    predicate = baseCallback(predicate, thisArg, 3);
	    return baseFindIndex(array, predicate, fromRight);
	  };
	}

	/**
	 * This method is like `_.find` except that it returns the index of the first
	 * element `predicate` returns truthy for instead of the element itself.
	 *
	 * If a property name is provided for `predicate` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `predicate` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to search.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {number} Returns the index of the found element, else `-1`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'active': false },
	 *   { 'user': 'fred',    'active': false },
	 *   { 'user': 'pebbles', 'active': true }
	 * ];
	 *
	 * _.findIndex(users, function(chr) {
	 *   return chr.user == 'barney';
	 * });
	 * // => 0
	 *
	 * // using the `_.matches` callback shorthand
	 * _.findIndex(users, { 'user': 'fred', 'active': false });
	 * // => 1
	 *
	 * // using the `_.matchesProperty` callback shorthand
	 * _.findIndex(users, 'active', false);
	 * // => 0
	 *
	 * // using the `_.property` callback shorthand
	 * _.findIndex(users, 'active');
	 * // => 2
	 */
	var findIndex = createFindIndex();

	module.exports = findIndex;

/***/ },
/* 57 */
/***/ function(module, exports) {

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
	"use strict";

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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(59);

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	/**
	 * The MediaControl is responsible for displaying the Player controls.
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUtils = __webpack_require__(2);

	var _clapprZepto = __webpack_require__(26);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _baseStyler = __webpack_require__(34);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _baseUi_object = __webpack_require__(27);

	var _baseUi_object2 = _interopRequireDefault(_baseUi_object);

	var _browser = __webpack_require__(14);

	var _browser2 = _interopRequireDefault(_browser);

	var _seek_time = __webpack_require__(60);

	var _seek_time2 = _interopRequireDefault(_seek_time);

	var _mediator = __webpack_require__(64);

	var _mediator2 = _interopRequireDefault(_mediator);

	var _player_info = __webpack_require__(65);

	var _player_info2 = _interopRequireDefault(_player_info);

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _baseKibo = __webpack_require__(21);

	var _baseKibo2 = _interopRequireDefault(_baseKibo);

	var _publicMediaControlScss = __webpack_require__(66);

	var _publicMediaControlScss2 = _interopRequireDefault(_publicMediaControlScss);

	var _baseTemplate = __webpack_require__(35);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _publicMediaControlHtml = __webpack_require__(70);

	var _publicMediaControlHtml2 = _interopRequireDefault(_publicMediaControlHtml);

	var MediaControl = (function (_UIObject) {
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
	        'click .bar-container[data-volume]': 'volume',
	        'click .drawer-icon[data-volume]': 'toggleMute',
	        'mouseenter .drawer-container[data-volume]': 'showVolumeBar',
	        'mouseleave .drawer-container[data-volume]': 'hideVolumeBar',
	        'mousedown .segmented-bar-element[data-volume]': 'mousedownOnVolumeBar',
	        'mouseleave .media-control-layer': 'mouseleaveOnVolumeBar',
	        'mousemove .segmented-bar-element[data-volume]': 'mousemoveOnVolumeBar',
	        'mouseup .segmented-bar-element[data-volume]': 'mouseupOnVolumeBar',
	        'mousedown .bar-scrubber[data-volume]': 'startVolumeDrag',
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
	      return (0, _baseTemplate2['default'])(_publicMediaControlHtml2['default']);
	    }
	  }]);

	  function MediaControl(options) {
	    var _this = this;

	    _classCallCheck(this, MediaControl);

	    _get(Object.getPrototypeOf(MediaControl.prototype), 'constructor', this).call(this, options);
	    this.seekTime = new _seek_time2['default'](this);
	    this.options = options;
	    this.mute = this.options.mute;
	    this.persistConfig = this.options.persistConfig;
	    this.container = options.container;
	    var initialVolume = this.persistConfig ? _baseUtils.Config.restore("volume") : 100;
	    this.setVolume(this.mute ? 0 : initialVolume);
	    this.keepVisible = false;
	    this.volumeBarClickDown = false;
	    this.addEventListeners();
	    this.settings = {
	      left: ['play', 'stop', 'pause'],
	      right: ['volume'],
	      'default': ['position', 'seekbar', 'duration']
	    };
	    this.settings = Object.keys(this.container.settings).length === 0 ? this.settings : this.container.settings;
	    this.disabled = false;
	    if (this.container.mediaControlDisabled || this.options.chromeless) {
	      this.disable();
	    }
	    this.stopDragHandler = function (event) {
	      return _this.stopDrag(event);
	    };
	    this.updateDragHandler = function (event) {
	      return _this.updateDrag(event);
	    };
	    (0, _clapprZepto2['default'])(document).bind('mouseup', this.stopDragHandler);
	    (0, _clapprZepto2['default'])(document).bind('mousemove', this.updateDragHandler);
	  }

	  _createClass(MediaControl, [{
	    key: 'addEventListeners',
	    value: function addEventListeners() {
	      _mediator2['default'].on(this.options.playerId + ':' + _baseEvents2['default'].PLAYER_RESIZE, this.playerResize, this);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_PLAY, this.changeTogglePlay);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_PAUSE, this.changeTogglePlay);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_DBLCLICK, this.toggleFullscreen);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_TIMEUPDATE, this.updateSeekBar);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_PROGRESS, this.updateProgressBar);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_SETTINGSUPDATE, this.settingsUpdate);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_PLAYBACKDVRSTATECHANGED, this.settingsUpdate);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_HIGHDEFINITIONUPDATE, this.highDefinitionUpdate);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_MEDIACONTROL_DISABLE, this.disable);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_MEDIACONTROL_ENABLE, this.enable);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_ENDED, this.ended);
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      this.disabled = true;
	      this.hide();
	      this.$el.hide();
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      if (this.options.chromeless) return;
	      this.disabled = false;
	      this.show();
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      this.container.play();
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.container.pause();
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.container.stop();
	    }
	  }, {
	    key: 'changeTogglePlay',
	    value: function changeTogglePlay() {
	      if (this.container.isPlaying()) {
	        this.$playPauseToggle.removeClass('paused').addClass('playing');
	        this.$playStopToggle.removeClass('stopped').addClass('playing');
	        this.trigger(_baseEvents2['default'].MEDIACONTROL_PLAYING);
	      } else {
	        this.$playPauseToggle.removeClass('playing').addClass('paused');
	        this.$playStopToggle.removeClass('playing').addClass('stopped');
	        this.trigger(_baseEvents2['default'].MEDIACONTROL_NOTPLAYING);
	      }
	    }
	  }, {
	    key: 'mousemoveOnSeekBar',
	    value: function mousemoveOnSeekBar(event) {
	      if (this.container.settings.seekEnabled) {
	        var offsetX = event.pageX - this.$seekBarContainer.offset().left - this.$seekBarHover.width() / 2;
	        this.$seekBarHover.css({ left: offsetX });
	      }
	      this.trigger(_baseEvents2['default'].MEDIACONTROL_MOUSEMOVE_SEEKBAR, event);
	    }
	  }, {
	    key: 'mouseleaveOnSeekBar',
	    value: function mouseleaveOnSeekBar(event) {
	      this.trigger(_baseEvents2['default'].MEDIACONTROL_MOUSELEAVE_SEEKBAR, event);
	    }
	  }, {
	    key: 'mousemoveOnVolumeBar',
	    value: function mousemoveOnVolumeBar(event) {
	      if (this.volumeBarClickDown) {
	        this.volume(event);
	      }
	    }
	  }, {
	    key: 'mousedownOnVolumeBar',
	    value: function mousedownOnVolumeBar() {
	      var cursorStyleProperty = 'url(http://www.google.com/intl/en_ALL/mapfiles/closedhand.cur), move';
	      this.$volumeBarContainer.css('cursor', cursorStyleProperty);
	      this.$volumeBarContainer.css('cursor', '-webkit-grabbing');
	      this.$volumeBarContainer.css('cursor', '-moz-grabbing');
	      this.volumeBarClickDown = true;
	    }
	  }, {
	    key: 'mouseupOnVolumeBar',
	    value: function mouseupOnVolumeBar() {
	      this.$volumeBarContainer.css('cursor', 'pointer');
	      this.volumeBarClickDown = false;
	    }
	  }, {
	    key: 'mouseleaveOnVolumeBar',
	    value: function mouseleaveOnVolumeBar(event) {
	      var volOffset = this.$volumeBarContainer.offset();

	      var outsideByLeft = event.pageX < this.$seekBarContainer.offset().left;
	      var outsideByRight = event.pageX > volOffset.left + volOffset.width;
	      var outsideHorizontally = outsideByLeft || outsideByRight;

	      var outsideByTop = event.pageY < volOffset.top;
	      var outsideByBottom = event.pageY > volOffset.top + volOffset.height;

	      var outsideVertically = outsideByTop || outsideByBottom;

	      if (outsideHorizontally || outsideVertically) {
	        this.mouseupOnVolumeBar();
	      }
	    }
	  }, {
	    key: 'playerResize',
	    value: function playerResize(size) {
	      if (!this.disabled) {
	        if (_baseUtils.Fullscreen.isFullscreen()) {
	          this.$fullscreenToggle.addClass('shrink');
	        } else {
	          this.$fullscreenToggle.removeClass('shrink');
	        }
	        this.$el.removeClass('w320');
	        if (size.width <= 320 || this.options.hideVolumeBar) {
	          this.$el.addClass('w320');
	        }
	      }
	    }
	  }, {
	    key: 'togglePlayPause',
	    value: function togglePlayPause() {
	      if (this.container.isPlaying()) {
	        this.container.pause();
	      } else {
	        this.container.play();
	      }
	      return false;
	    }
	  }, {
	    key: 'togglePlayStop',
	    value: function togglePlayStop() {
	      if (this.container.isPlaying()) {
	        this.container.stop();
	      } else {
	        this.container.play();
	      }
	    }
	  }, {
	    key: 'startSeekDrag',
	    value: function startSeekDrag(event) {
	      if (!this.container.settings.seekEnabled) return;
	      this.draggingSeekBar = true;
	      this.$el.addClass('dragging');
	      this.$seekBarLoaded.addClass('media-control-notransition');
	      this.$seekBarPosition.addClass('media-control-notransition');
	      this.$seekBarScrubber.addClass('media-control-notransition');
	      if (event) {
	        event.preventDefault();
	      }
	    }
	  }, {
	    key: 'startVolumeDrag',
	    value: function startVolumeDrag(event) {
	      this.draggingVolumeBar = true;
	      this.$el.addClass('dragging');
	      if (event) {
	        event.preventDefault();
	      }
	    }
	  }, {
	    key: 'stopDrag',
	    value: function stopDrag(event) {
	      if (this.draggingSeekBar) {
	        this.seek(event);
	      }
	      this.$el.removeClass('dragging');
	      this.$seekBarLoaded.removeClass('media-control-notransition');
	      this.$seekBarPosition.removeClass('media-control-notransition');
	      this.$seekBarScrubber.removeClass('media-control-notransition dragging');
	      this.draggingSeekBar = false;
	      this.draggingVolumeBar = false;
	    }
	  }, {
	    key: 'updateDrag',
	    value: function updateDrag(event) {
	      if (this.draggingSeekBar) {
	        event.preventDefault();
	        var offsetX = event.pageX - this.$seekBarContainer.offset().left;
	        var pos = offsetX / this.$seekBarContainer.width() * 100;
	        pos = Math.min(100, Math.max(pos, 0));
	        this.setSeekPercentage(pos);
	      } else if (this.draggingVolumeBar) {
	        event.preventDefault();
	        this.volume(event);
	      }
	    }
	  }, {
	    key: 'volume',
	    value: function volume(event) {
	      var offsetY = event.pageX - this.$volumeBarContainer.offset().left;
	      var volumeFromUI = offsetY / this.$volumeBarContainer.width() * 100;
	      this.setVolume(volumeFromUI);
	    }
	  }, {
	    key: 'toggleMute',
	    value: function toggleMute() {
	      if (this.mute) {
	        if (this.currentVolume <= 0) {
	          this.currentVolume = 100;
	        }
	        this.setVolume(this.currentVolume);
	      } else {
	        this.setVolume(0);
	      }
	    }
	  }, {
	    key: 'setVolume',
	    value: function setVolume(value) {
	      this.currentVolume = Math.min(100, Math.max(value, 0));
	      this.container.setVolume(this.currentVolume);
	      this.setVolumeLevel(this.currentVolume);
	      this.mute = this.currentVolume === 0;
	      this.persistConfig && _baseUtils.Config.persist("volume", this.currentVolume);
	    }
	  }, {
	    key: 'toggleFullscreen',
	    value: function toggleFullscreen() {
	      this.trigger(_baseEvents2['default'].MEDIACONTROL_FULLSCREEN, this.name);
	      this.container.fullscreen();
	      this.resetUserKeepVisible();
	    }
	  }, {
	    key: 'setContainer',
	    value: function setContainer(container) {
	      this.stopListening(this.container);
	      _mediator2['default'].off(this.options.playerId + ':' + _baseEvents2['default'].PLAYER_RESIZE, this.playerResize, this);
	      this.container = container;
	      this.changeTogglePlay();
	      this.addEventListeners();
	      this.settingsUpdate();
	      this.container.trigger(_baseEvents2['default'].CONTAINER_PLAYBACKDVRSTATECHANGED, this.container.isDvrInUse());
	      this.setVolume(this.currentVolume);
	      if (this.container.mediaControlDisabled) {
	        this.disable();
	      }
	      this.trigger(_baseEvents2['default'].MEDIACONTROL_CONTAINERCHANGED);
	    }
	  }, {
	    key: 'showVolumeBar',
	    value: function showVolumeBar() {
	      if (this.hideVolumeId) {
	        clearTimeout(this.hideVolumeId);
	      }
	      this.$volumeBarContainer.removeClass('volume-bar-hide');
	    }
	  }, {
	    key: 'hideVolumeBar',
	    value: function hideVolumeBar() {
	      var _this2 = this;

	      var timeout = arguments.length <= 0 || arguments[0] === undefined ? 400 : arguments[0];

	      if (!this.$volumeBarContainer) return;
	      if (this.draggingVolumeBar) {
	        this.hideVolumeId = setTimeout(function () {
	          return _this2.hideVolumeBar();
	        }, timeout);
	      } else {
	        if (this.hideVolumeId) {
	          clearTimeout(this.hideVolumeId);
	        }
	        this.hideVolumeId = setTimeout(function () {
	          return _this2.$volumeBarContainer.addClass('volume-bar-hide');
	        }, timeout);
	      }
	    }
	  }, {
	    key: 'ended',
	    value: function ended() {
	      this.changeTogglePlay();
	    }
	  }, {
	    key: 'updateProgressBar',
	    value: function updateProgressBar(startPosition, endPosition, duration) {
	      var loadedStart = startPosition / duration * 100;
	      var loadedEnd = endPosition / duration * 100;
	      this.$seekBarLoaded.css({ left: loadedStart + '%', width: loadedEnd - loadedStart + '%' });
	    }
	  }, {
	    key: 'updateSeekBar',
	    value: function updateSeekBar(position, duration) {
	      if (this.draggingSeekBar) return;
	      if (position < 0) position = duration;
	      this.$seekBarPosition.removeClass('media-control-notransition');
	      this.$seekBarScrubber.removeClass('media-control-notransition');
	      var seekbarValue = 100 / duration * position;
	      this.setSeekPercentage(seekbarValue);
	      this.$('[data-position]').html((0, _baseUtils.formatTime)(position));
	      this.$('[data-duration]').html((0, _baseUtils.formatTime)(duration));
	    }
	  }, {
	    key: 'seek',
	    value: function seek(event) {
	      if (!this.container.settings.seekEnabled) return;
	      var offsetX = event.pageX - this.$seekBarContainer.offset().left;
	      var pos = offsetX / this.$seekBarContainer.width() * 100;
	      pos = Math.min(100, Math.max(pos, 0));
	      this.container.setCurrentTime(pos);
	      this.setSeekPercentage(pos);
	      return false;
	    }
	  }, {
	    key: 'setKeepVisible',
	    value: function setKeepVisible() {
	      this.keepVisible = true;
	    }
	  }, {
	    key: 'resetKeepVisible',
	    value: function resetKeepVisible() {
	      this.keepVisible = false;
	    }
	  }, {
	    key: 'setUserKeepVisible',
	    value: function setUserKeepVisible() {
	      this.userKeepVisible = true;
	    }
	  }, {
	    key: 'resetUserKeepVisible',
	    value: function resetUserKeepVisible() {
	      this.userKeepVisible = false;
	    }
	  }, {
	    key: 'isVisible',
	    value: function isVisible() {
	      return !this.$el.hasClass('media-control-hide');
	    }
	  }, {
	    key: 'show',
	    value: function show(event) {
	      var _this3 = this;

	      if (this.disabled) return;
	      var timeout = 2000;
	      if (!event || event.clientX !== this.lastMouseX && event.clientY !== this.lastMouseY || navigator.userAgent.match(/firefox/i)) {
	        clearTimeout(this.hideId);
	        this.$el.show();
	        this.trigger(_baseEvents2['default'].MEDIACONTROL_SHOW, this.name);
	        this.$el.removeClass('media-control-hide');
	        this.hideId = setTimeout(function () {
	          return _this3.hide();
	        }, timeout);
	        if (event) {
	          this.lastMouseX = event.clientX;
	          this.lastMouseY = event.clientY;
	        }
	      }
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      var _this4 = this;

	      var delay = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	      var timeout = delay || 2000;
	      clearTimeout(this.hideId);
	      if (!this.isVisible() || this.options.hideMediaControl === false) return;
	      if (delay || this.userKeepVisible || this.keepVisible || this.draggingSeekBar || this.draggingVolumeBar) {
	        this.hideId = setTimeout(function () {
	          return _this4.hide();
	        }, timeout);
	      } else {
	        this.trigger(_baseEvents2['default'].MEDIACONTROL_HIDE, this.name);
	        this.$el.addClass('media-control-hide');
	        this.hideVolumeBar(0);
	      }
	    }
	  }, {
	    key: 'settingsUpdate',
	    value: function settingsUpdate() {
	      if (this.container.getPlaybackType() !== null && Object.keys(this.container.settings).length !== 0) {
	        this.settings = this.container.settings;
	        this.render();
	      } else {
	        this.disable();
	      }
	    }
	  }, {
	    key: 'highDefinitionUpdate',
	    value: function highDefinitionUpdate() {
	      if (this.container.isHighDefinitionInUse()) {
	        this.$el.find('button[data-hd-indicator]').addClass("enabled");
	      } else {
	        this.$el.find('button[data-hd-indicator]').removeClass("enabled");
	      }
	    }
	  }, {
	    key: 'createCachedElements',
	    value: function createCachedElements() {
	      this.$playPauseToggle = this.$el.find('button.media-control-button[data-playpause]');
	      this.$playStopToggle = this.$el.find('button.media-control-button[data-playstop]');
	      this.$fullscreenToggle = this.$el.find('button.media-control-button[data-fullscreen]');
	      this.$seekBarContainer = this.$el.find('.bar-container[data-seekbar]');
	      this.$seekBarLoaded = this.$el.find('.bar-fill-1[data-seekbar]');
	      this.$seekBarPosition = this.$el.find('.bar-fill-2[data-seekbar]');
	      this.$seekBarScrubber = this.$el.find('.bar-scrubber[data-seekbar]');
	      this.$seekBarHover = this.$el.find('.bar-hover[data-seekbar]');
	      this.$volumeContainer = this.$el.find('.drawer-container[data-volume]');
	      this.$volumeBarContainer = this.$el.find('.bar-container[data-volume]');
	      this.$volumeIcon = this.$el.find('.drawer-icon[data-volume]');
	    }
	  }, {
	    key: 'setVolumeLevel',
	    value: function setVolumeLevel(value) {
	      var _this5 = this;

	      if (!this.container.isReady || !this.$volumeBarContainer) {
	        this.listenToOnce(this.container, _baseEvents2['default'].CONTAINER_READY, function () {
	          return _this5.setVolumeLevel(value);
	        });
	      } else {
	        this.$volumeBarContainer.find('.segmented-bar-element').removeClass('fill');
	        var item = Math.ceil(value / 10.0);
	        this.$volumeBarContainer.find('.segmented-bar-element').slice(0, item).addClass('fill');
	        if (value > 0) {
	          this.$volumeIcon.removeClass('muted');
	        } else {
	          this.$volumeIcon.addClass('muted');
	        }
	      }
	    }
	  }, {
	    key: 'setSeekPercentage',
	    value: function setSeekPercentage(value) {
	      value = Math.min(value, 100.0);
	      var pos = this.$seekBarContainer.width() * value / 100.0 - this.$seekBarScrubber.width() / 2.0;
	      this.currentSeekPercentage = value;
	      this.$seekBarPosition.css({ width: value + '%' });
	      this.$seekBarScrubber.css({ left: pos });
	    }
	  }, {
	    key: 'seekRelative',
	    value: function seekRelative(delta) {
	      if (!this.container.settings.seekEnabled) return;
	      var currentTime = this.container.getCurrentTime();
	      var duration = this.container.getDuration();
	      var position = Math.min(Math.max(currentTime + delta, 0), duration);
	      position = Math.min(position * 100 / duration, 100);
	      this.container.setCurrentTime(position);
	    }
	  }, {
	    key: 'bindKeyEvents',
	    value: function bindKeyEvents() {
	      var _this6 = this;

	      if (this.kibo) {
	        this.unbindKeyEvents();
	      }
	      this.kibo = new _baseKibo2['default'](this.options.focusElement);
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
	          return _this6.container.settings.seekEnabled && _this6.container.setCurrentTime(i * 10);
	        });
	      });
	    }
	  }, {
	    key: 'unbindKeyEvents',
	    value: function unbindKeyEvents() {
	      this.kibo.off('space');
	      this.kibo.off([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
	    }
	  }, {
	    key: 'parseColors',
	    value: function parseColors() {
	      if (this.options.mediacontrol) {
	        var buttonsColor = this.options.mediacontrol.buttons;
	        var seekbarColor = this.options.mediacontrol.seekbar;
	        this.$el.find('.bar-fill-2[data-seekbar]').css('background-color', seekbarColor);
	        this.$el.find('[data-media-control] > .media-control-icon, .drawer-icon').css('color', buttonsColor);
	        this.$el.find('.segmented-bar-element[data-volume]').css('boxShadow', "inset 2px 0 0 " + buttonsColor);
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      (0, _clapprZepto2['default'])(document).unbind('mouseup', this.stopDragHandler);
	      (0, _clapprZepto2['default'])(document).unbind('mousemove', this.updateDragHandler);
	      this.unbindKeyEvents();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this7 = this;

	      var timeout = 1000;
	      var style = _baseStyler2['default'].getStyleFor(_publicMediaControlScss2['default'], { baseUrl: this.options.baseUrl });
	      this.$el.html(this.template({ settings: this.settings }));
	      this.$el.append(style);
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

	      if (_browser2['default'].isSafari && _browser2['default'].isMobile) {
	        this.$volumeContainer.css('display', 'none');
	      }

	      this.$seekBarPosition.addClass('media-control-notransition');
	      this.$seekBarScrubber.addClass('media-control-notransition');

	      if (!this.currentSeekPercentage) {
	        this.currentSeekPercentage = 0;
	      }
	      this.setSeekPercentage(this.currentSeekPercentage);

	      this.$el.ready(function () {
	        if (!_this7.container.settings.seekEnabled) {
	          _this7.$seekBarContainer.addClass('seek-disabled');
	        }

	        _this7.setVolume(_this7.currentVolume);
	        _this7.bindKeyEvents();
	        _this7.hideVolumeBar(0);
	      });

	      this.parseColors();
	      this.seekTime.render();
	      this.highDefinitionUpdate();

	      this.trigger(_baseEvents2['default'].MEDIACONTROL_RENDERED);
	      return this;
	    }
	  }]);

	  return MediaControl;
	})(_baseUi_object2['default']);

	exports['default'] = MediaControl;
	module.exports = exports['default'];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(61);

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUtils = __webpack_require__(2);

	var _baseUi_object = __webpack_require__(27);

	var _baseUi_object2 = _interopRequireDefault(_baseUi_object);

	var _baseStyler = __webpack_require__(34);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _baseTemplate = __webpack_require__(35);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _publicSeek_timeScss = __webpack_require__(62);

	var _publicSeek_timeScss2 = _interopRequireDefault(_publicSeek_timeScss);

	var _publicSeek_timeHtml = __webpack_require__(63);

	var _publicSeek_timeHtml2 = _interopRequireDefault(_publicSeek_timeHtml);

	var SeekTime = (function (_UIObject) {
	  _inherits(SeekTime, _UIObject);

	  _createClass(SeekTime, [{
	    key: 'name',
	    get: function get() {
	      return 'seek_time';
	    }
	  }, {
	    key: 'template',
	    get: function get() {
	      return (0, _baseTemplate2['default'])(_publicSeek_timeHtml2['default']);
	    }
	  }, {
	    key: 'attributes',
	    get: function get() {
	      return {
	        'class': 'seek-time hidden',
	        'data-seek-time': ''
	      };
	    }
	  }]);

	  function SeekTime(mediaControl) {
	    _classCallCheck(this, SeekTime);

	    _get(Object.getPrototypeOf(SeekTime.prototype), 'constructor', this).call(this);
	    this.mediaControl = mediaControl;
	    this.addEventListeners();
	  }

	  _createClass(SeekTime, [{
	    key: 'addEventListeners',
	    value: function addEventListeners() {
	      this.listenTo(this.mediaControl, _baseEvents2['default'].MEDIACONTROL_MOUSEMOVE_SEEKBAR, this.showTime);
	      this.listenTo(this.mediaControl, _baseEvents2['default'].MEDIACONTROL_MOUSELEAVE_SEEKBAR, this.hideTime);
	    }
	  }, {
	    key: 'showTime',
	    value: function showTime(event) {
	      if (!this.mediaControl.container.settings.seekEnabled) {
	        return;
	      }

	      // the element must be unhidden before its width is requested, otherwise it's width will be reported as 0
	      this.$el.removeClass('hidden');
	      var offset = event.pageX - this.mediaControl.$seekBarContainer.offset().left;
	      if (offset >= 0 && offset <= this.mediaControl.$seekBarContainer.width()) {
	        var timePosition = Math.min(100, Math.max(offset / this.mediaControl.$seekBarContainer.width() * 100, 0));
	        var pointerPosition = event.pageX - this.mediaControl.$el.offset().left;
	        pointerPosition = Math.min(Math.max(0, pointerPosition), this.mediaControl.$el.width() - this.$el.width() / 2);
	        var currentTime = timePosition * this.mediaControl.container.getDuration() / 100;
	        var options = {
	          timestamp: currentTime,
	          formattedTime: (0, _baseUtils.formatTime)(currentTime),
	          pointerPosition: pointerPosition
	        };

	        this.update(options);
	      }
	    }
	  }, {
	    key: 'hideTime',
	    value: function hideTime() {
	      this.$el.addClass('hidden');
	      this.$el.css('left', '-100%');
	    }
	  }, {
	    key: 'update',
	    value: function update(options) {
	      this.$el.find('[data-seek-time]').text(options.formattedTime);
	      this.$el.css('left', Math.max(0, options.pointerPosition - this.$el.width() / 2));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var style = _baseStyler2['default'].getStyleFor(_publicSeek_timeScss2['default']);
	      this.$el.html(this.template());
	      this.$el.append(style);
	      this.mediaControl.$el.append(this.el);
	    }
	  }]);

	  return SeekTime;
	})(_baseUi_object2['default']);

	exports['default'] = SeekTime;
	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, ".seek-time[data-seek-time] {\n  position: absolute;\n  white-space: nowrap;\n  width: auto;\n  height: 20px;\n  line-height: 20px;\n  bottom: 55px;\n  background-color: rgba(2, 2, 2, 0.5);\n  z-index: 9999;\n  -webkit-transition: opacity 0.1s ease;\n  -moz-transition: opacity 0.1s ease;\n  -o-transition: opacity 0.1s ease;\n  transition: opacity 0.1s ease; }\n  .seek-time[data-seek-time].hidden[data-seek-time] {\n    opacity: 0; }\n  .seek-time[data-seek-time] span[data-seek-time] {\n    position: relative;\n    color: white;\n    font-size: 10px;\n    padding-left: 7px;\n    padding-right: 7px; }\n", ""]);

	// exports


/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = "<span data-seek-time></span>\n";

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	/**
	 * The mediator is a singleton for handling global events.
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var events = new _baseEvents2['default']();

	var Mediator = function Mediator() {
	  _classCallCheck(this, Mediator);
	};

	exports['default'] = Mediator;

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
/* 65 */
/***/ function(module, exports) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

	exports["default"] = PlayerInfo;
	module.exports = exports["default"];

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, "@font-face {\n  font-family: \"Player\";\n  src: url(" + __webpack_require__(67) + ");\n  src: url(" + __webpack_require__(67) + "?#iefix) format(\"embedded-opentype\"), url(" + __webpack_require__(68) + ") format(\"truetype\"), url(" + __webpack_require__(69) + "#player) format(\"svg\"); }\n\n.media-control-notransition {\n  -webkit-transition: none !important;\n  -moz-transition: none !important;\n  -o-transition: none !important;\n  transition: none !important; }\n\n.media-control[data-media-control] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  z-index: 9999;\n  pointer-events: none; }\n  .media-control[data-media-control].dragging {\n    pointer-events: auto;\n    cursor: -webkit-grabbing !important;\n    cursor: grabbing !important; }\n    .media-control[data-media-control].dragging * {\n      cursor: -webkit-grabbing !important;\n      cursor: grabbing !important; }\n  .media-control[data-media-control] .media-control-background[data-background] {\n    position: absolute;\n    height: 40%;\n    width: 100%;\n    bottom: 0;\n    background-image: -owg(linear-gradient(transparent, rgba(0, 0, 0, 0.9)));\n    background-image: -webkit(linear-gradient(transparent, rgba(0, 0, 0, 0.9)));\n    background-image: -moz(linear-gradient(transparent, rgba(0, 0, 0, 0.9)));\n    background-image: -o(linear-gradient(transparent, rgba(0, 0, 0, 0.9)));\n    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.9));\n    -webkit-transition: opacity 0.6s ease-out;\n    -moz-transition: opacity 0.6s ease-out;\n    -o-transition: opacity 0.6s ease-out;\n    transition: opacity 0.6s ease-out; }\n  .media-control[data-media-control] .media-control-icon {\n    font-family: \"Player\";\n    font-weight: normal;\n    font-style: normal;\n    font-size: 26px;\n    line-height: 32px;\n    letter-spacing: 0;\n    speak: none;\n    color: #fff;\n    opacity: 0.5;\n    vertical-align: middle;\n    text-align: left;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-transition: all 0.1s ease;\n    -moz-transition: all 0.1s ease;\n    -o-transition: all 0.1s ease;\n    transition: all 0.1s ease; }\n  .media-control[data-media-control] .media-control-icon:hover {\n    color: white;\n    opacity: 0.75;\n    text-shadow: rgba(255, 255, 255, 0.8) 0 0 5px; }\n  .media-control[data-media-control].media-control-hide .media-control-background[data-background] {\n    opacity: 0; }\n  .media-control[data-media-control].media-control-hide .media-control-layer[data-controls] {\n    bottom: -50px; }\n    .media-control[data-media-control].media-control-hide .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar] {\n      opacity: 0; }\n  .media-control[data-media-control] .media-control-layer[data-controls] {\n    position: absolute;\n    bottom: 7px;\n    width: 100%;\n    height: 32px;\n    vertical-align: middle;\n    pointer-events: auto;\n    -webkit-transition: bottom 0.4s ease-out;\n    -moz-transition: bottom 0.4s ease-out;\n    -o-transition: bottom 0.4s ease-out;\n    transition: bottom 0.4s ease-out; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-left-panel[data-media-control] {\n      position: absolute;\n      top: 0;\n      left: 4px;\n      height: 100%; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-center-panel[data-media-control] {\n      height: 100%;\n      text-align: center;\n      line-height: 32px; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-right-panel[data-media-control] {\n      position: absolute;\n      top: 0;\n      right: 4px;\n      height: 100%; }\n    .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button {\n      background-color: transparent;\n      border: 0;\n      margin: 0 6px;\n      padding: 0;\n      cursor: pointer;\n      display: inline-block; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button:focus {\n        outline: none; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play] {\n        float: left;\n        height: 100%;\n        font-size: 20px; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play]:before {\n          content: \"\\E001\"; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause] {\n        float: left;\n        height: 100%;\n        font-size: 20px; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause]:before {\n          content: \"\\E002\"; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop] {\n        float: left;\n        height: 100%;\n        font-size: 20px; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop]:before {\n          content: \"\\E003\"; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen] {\n        float: right;\n        background-color: transparent;\n        border: 0;\n        height: 100%; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen]:before {\n          content: \"\\E006\"; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen].shrink:before {\n          content: \"\\E007\"; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator] {\n        cursor: default;\n        float: right;\n        background-color: transparent;\n        border: 0;\n        height: 100%;\n        opacity: 0; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator]:before {\n          content: \"\\E008\"; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled {\n          opacity: 1.0; }\n          .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled:hover {\n            opacity: 1.0;\n            text-shadow: none; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause] {\n        float: left;\n        height: 100%;\n        font-size: 20px; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]:before {\n          content: \"\\E001\"; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].playing:before {\n          content: \"\\E002\"; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].paused:before {\n          content: \"\\E001\"; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop] {\n        float: left;\n        height: 100%;\n        font-size: 20px; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop]:before {\n          content: \"\\E001\"; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].playing:before {\n          content: \"\\E003\"; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].stopped:before {\n          content: \"\\E001\"; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position], .media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration] {\n      display: inline-block;\n      font-size: 10px;\n      color: white;\n      cursor: default;\n      line-height: 32px;\n      position: relative; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position] {\n      margin-left: 6px; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration] {\n      color: rgba(255, 255, 255, 0.5);\n      margin-right: 6px; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration]:before {\n        content: \"|\";\n        margin: 0 3px; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] {\n      position: absolute;\n      top: -20px;\n      left: 0;\n      display: inline-block;\n      vertical-align: middle;\n      width: 100%;\n      height: 25px;\n      cursor: pointer; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] {\n        width: 100%;\n        height: 1px;\n        position: relative;\n        top: 12px;\n        background-color: #666666; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-1[data-seekbar] {\n          position: absolute;\n          top: 0;\n          left: 0;\n          width: 0;\n          height: 100%;\n          background-color: #c2c2c2;\n          -webkit-transition: all 0.1s ease-out;\n          -moz-transition: all 0.1s ease-out;\n          -o-transition: all 0.1s ease-out;\n          transition: all 0.1s ease-out; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar] {\n          position: absolute;\n          top: 0;\n          left: 0;\n          width: 0;\n          height: 100%;\n          background-color: #005aff;\n          -webkit-transition: all 0.1s ease-out;\n          -moz-transition: all 0.1s ease-out;\n          -o-transition: all 0.1s ease-out;\n          transition: all 0.1s ease-out; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-hover[data-seekbar] {\n          opacity: 0;\n          position: absolute;\n          top: -3px;\n          width: 5px;\n          height: 7px;\n          background-color: rgba(255, 255, 255, 0.5);\n          -webkit-transition: opacity 0.1s ease;\n          -moz-transition: opacity 0.1s ease;\n          -o-transition: opacity 0.1s ease;\n          transition: opacity 0.1s ease; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar]:hover .bar-background[data-seekbar] .bar-hover[data-seekbar] {\n        opacity: 1; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled {\n        cursor: default; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled:hover .bar-background[data-seekbar] .bar-hover[data-seekbar] {\n          opacity: 0; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar] {\n        position: absolute;\n        top: 2px;\n        left: 0;\n        width: 20px;\n        height: 20px;\n        opacity: 1;\n        -webkit-transition: all 0.1s ease-out;\n        -moz-transition: all 0.1s ease-out;\n        -o-transition: all 0.1s ease-out;\n        transition: all 0.1s ease-out; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar] .bar-scrubber-icon[data-seekbar] {\n          position: absolute;\n          left: 6px;\n          top: 6px;\n          width: 8px;\n          height: 8px;\n          border-radius: 10px;\n          box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.2);\n          background-color: white; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] {\n      float: right;\n      display: inline-block;\n      height: 32px;\n      cursor: pointer;\n      margin: 0 6px;\n      box-sizing: border-box; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] {\n        float: left;\n        bottom: 0; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume] {\n          background-color: transparent;\n          border: 0;\n          box-sizing: content-box;\n          width: 16px;\n          height: 32px;\n          margin-right: 6px;\n          opacity: 1; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:hover {\n            opacity: 1; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:before {\n            content: \"\\E004\"; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted {\n            opacity: 0.5; }\n            .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:hover {\n              opacity: 0.7; }\n            .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:before {\n              content: \"\\E005\"; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] {\n        float: left;\n        position: relative;\n        top: 6px;\n        width: 42px;\n        height: 18px;\n        padding: 3px 0;\n        overflow: hidden;\n        -webkit-transition: width 0.2s ease-out;\n        -moz-transition: width 0.2s ease-out;\n        -o-transition: width 0.2s ease-out;\n        transition: width .2s ease-out; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume] {\n          float: left;\n          width: 4px;\n          padding-left: 2px;\n          height: 12px;\n          opacity: 0.5;\n          -webkit-box-shadow: inset 2px 0 0 white;\n          -moz-box-shadow: inset 2px 0 0 white;\n          box-shadow: inset 2px 0 0 white;\n          -webkit-transition: -webkit-transform 0.2s ease-out;\n          -moz-transition: -moz-transform 0.2s ease-out;\n          -o-transition: -o-transform 0.2s ease-out;\n          transition: transform .2s ease-out; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume].fill {\n            -webkit-box-shadow: inset 2px 0 0 #fff;\n            -moz-box-shadow: inset 2px 0 0 #fff;\n            box-shadow: inset 2px 0 0 #fff;\n            opacity: 1; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:nth-of-type(1) {\n            padding-left: 0; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:hover {\n            -webkit-transform: scaleY(1.5);\n            -moz-transform: scaleY(1.5);\n            -ms-transform: scaleY(1.5);\n            -o-transform: scaleY(1.5);\n            transform: scaleY(1.5); }\n  .media-control[data-media-control].w320 .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume].volume-bar-hide {\n    height: 12px;\n    top: 9px;\n    padding: 0;\n    width: 0; }\n", ""]);

	// exports


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ed8735c27adb521e625717506cfcfb04.eot"

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "3e43a5d764f841e7e78896de82cd6c50.ttf"

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "5d7ec830fd8d1c440f165111719aa4a0.svg"

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = "<div class=\"media-control-background\" data-background></div>\n<div class=\"media-control-layer\" data-controls>\n  <%  var renderBar = function(name) { %>\n      <div class=\"bar-container\" data-<%= name %>>\n        <div class=\"bar-background\" data-<%= name %>>\n          <div class=\"bar-fill-1\" data-<%= name %>></div>\n          <div class=\"bar-fill-2\" data-<%= name %>></div>\n          <div class=\"bar-hover\" data-<%= name %>></div>\n        </div>\n        <div class=\"bar-scrubber\" data-<%= name %>>\n          <div class=\"bar-scrubber-icon\" data-<%= name %>></div>\n        </div>\n      </div>\n  <%  }; %>\n  <%  var renderSegmentedBar = function(name, segments) {\n      segments = segments || 10; %>\n    <div class=\"bar-container\" data-<%= name %>>\n    <% for (var i = 0; i < segments; i++) { %>\n      <div class=\"segmented-bar-element\" data-<%= name %>></div>\n    <% } %>\n    </div>\n  <% }; %>\n  <% var renderDrawer = function(name, renderContent) { %>\n      <div class=\"drawer-container\" data-<%= name %>>\n        <div class=\"drawer-icon-container\" data-<%= name %>>\n          <div class=\"drawer-icon media-control-icon\" data-<%= name %>></div>\n          <span class=\"drawer-text\" data-<%= name %>></span>\n        </div>\n        <% renderContent(name); %>\n      </div>\n  <% }; %>\n  <% var renderIndicator = function(name) { %>\n      <div class=\"media-control-indicator\" data-<%= name %>></div>\n  <% }; %>\n  <% var renderButton = function(name) { %>\n      <button class=\"media-control-button media-control-icon\" data-<%= name %>></button>\n  <% }; %>\n  <%  var templates = {\n        bar: renderBar,\n        segmentedBar: renderSegmentedBar,\n      };\n      var render = function(settingsList) {\n        settingsList.forEach(function(setting) {\n          if(setting === \"seekbar\") {\n            renderBar(setting);\n          } else if (setting === \"volume\") {\n            renderDrawer(setting, settings.volumeBarTemplate ? templates[settings.volumeBarTemplate] : function(name) { return renderSegmentedBar(name); });\n          } else if (setting === \"duration\" || setting === \"position\") {\n            renderIndicator(setting);\n          } else {\n            renderButton(setting);\n          }\n        });\n      }; %>\n  <% if (settings.default && settings.default.length) { %>\n  <div class=\"media-control-center-panel\" data-media-control>\n    <% render(settings.default); %>\n  </div>\n  <% } %>\n  <% if (settings.left && settings.left.length) { %>\n  <div class=\"media-control-left-panel\" data-media-control>\n    <% render(settings.left); %>\n  </div>\n  <% } %>\n  <% if (settings.right && settings.right.length) { %>\n  <div class=\"media-control-right-panel\" data-media-control>\n    <% render(settings.right); %>\n  </div>\n  <% } %>\n</div>\n";

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, "[data-player] {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -o-user-select: none;\n  user-select: none;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-transform: translate3d(0, 0, 0);\n  -moz-transform: translate3d(0, 0, 0);\n  -ms-transform: translate3d(0, 0, 0);\n  -o-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n  position: relative;\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-style: normal;\n  font-weight: normal;\n  text-align: center;\n  overflow: hidden;\n  font-size: 100%;\n  font-family: \"lucida grande\", tahoma, verdana, arial, sans-serif;\n  text-shadow: 0 0 0;\n  box-sizing: border-box; }\n  [data-player] div, [data-player] span, [data-player] applet, [data-player] object, [data-player] iframe, [data-player] h1, [data-player] h2, [data-player] h3, [data-player] h4, [data-player] h5, [data-player] h6, [data-player] p, [data-player] blockquote, [data-player] pre, [data-player] a, [data-player] abbr, [data-player] acronym, [data-player] address, [data-player] big, [data-player] cite, [data-player] code, [data-player] del, [data-player] dfn, [data-player] em, [data-player] img, [data-player] ins, [data-player] kbd, [data-player] q, [data-player] s, [data-player] samp, [data-player] small, [data-player] strike, [data-player] strong, [data-player] sub, [data-player] sup, [data-player] tt, [data-player] var, [data-player] b, [data-player] u, [data-player] i, [data-player] center, [data-player] dl, [data-player] dt, [data-player] dd, [data-player] ol, [data-player] ul, [data-player] li, [data-player] fieldset, [data-player] form, [data-player] label, [data-player] legend, [data-player] table, [data-player] caption, [data-player] tbody, [data-player] tfoot, [data-player] thead, [data-player] tr, [data-player] th, [data-player] td, [data-player] article, [data-player] aside, [data-player] canvas, [data-player] details, [data-player] embed, [data-player] figure, [data-player] figcaption, [data-player] footer, [data-player] header, [data-player] hgroup, [data-player] menu, [data-player] nav, [data-player] output, [data-player] ruby, [data-player] section, [data-player] summary, [data-player] time, [data-player] mark, [data-player] audio, [data-player] video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font: inherit;\n    font-size: 100%;\n    vertical-align: baseline; }\n  [data-player] table {\n    border-collapse: collapse;\n    border-spacing: 0; }\n  [data-player] caption, [data-player] th, [data-player] td {\n    text-align: left;\n    font-weight: normal;\n    vertical-align: middle; }\n  [data-player] q, [data-player] blockquote {\n    quotes: none; }\n    [data-player] q:before, [data-player] q:after, [data-player] blockquote:before, [data-player] blockquote:after {\n      content: \"\";\n      content: none; }\n  [data-player] a img {\n    border: none; }\n  [data-player]:focus {\n    outline: 0; }\n  [data-player] * {\n    max-width: none;\n    box-sizing: inherit;\n    float: none; }\n  [data-player] div {\n    display: block; }\n  [data-player].fullscreen {\n    width: 100% !important;\n    height: 100% !important; }\n  [data-player].nocursor {\n    cursor: none; }\n\n.clappr-style {\n  display: none !important; }\n", ""]);

	// exports


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(73);

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseBase_object = __webpack_require__(15);

	var _baseBase_object2 = _interopRequireDefault(_baseBase_object);

	var _player_info = __webpack_require__(65);

	var _player_info2 = _interopRequireDefault(_player_info);

	var _lodashUniq = __webpack_require__(74);

	var _lodashUniq2 = _interopRequireDefault(_lodashUniq);

	/* Playback Plugins */

	var _playbacksHtml5_video = __webpack_require__(93);

	var _playbacksHtml5_video2 = _interopRequireDefault(_playbacksHtml5_video);

	var _playbacksFlash = __webpack_require__(99);

	var _playbacksFlash2 = _interopRequireDefault(_playbacksFlash);

	var _playbacksHtml5_audio = __webpack_require__(104);

	var _playbacksHtml5_audio2 = _interopRequireDefault(_playbacksHtml5_audio);

	var _playbacksHls = __webpack_require__(106);

	var _playbacksHls2 = _interopRequireDefault(_playbacksHls);

	var _playbacksHtml_img = __webpack_require__(112);

	var _playbacksHtml_img2 = _interopRequireDefault(_playbacksHtml_img);

	var _playbacksNo_op = __webpack_require__(115);

	var _playbacksNo_op2 = _interopRequireDefault(_playbacksNo_op);

	/* Container Plugins */

	var _pluginsSpinner_three_bounce = __webpack_require__(119);

	var _pluginsSpinner_three_bounce2 = _interopRequireDefault(_pluginsSpinner_three_bounce);

	var _pluginsStats = __webpack_require__(124);

	var _pluginsStats2 = _interopRequireDefault(_pluginsStats);

	var _pluginsWatermark = __webpack_require__(127);

	var _pluginsWatermark2 = _interopRequireDefault(_pluginsWatermark);

	var _pluginsPoster = __webpack_require__(131);

	var _pluginsPoster2 = _interopRequireDefault(_pluginsPoster);

	var _pluginsGoogle_analytics = __webpack_require__(135);

	var _pluginsGoogle_analytics2 = _interopRequireDefault(_pluginsGoogle_analytics);

	var _pluginsClick_to_pause = __webpack_require__(137);

	var _pluginsClick_to_pause2 = _interopRequireDefault(_pluginsClick_to_pause);

	var _pluginsChromecast = __webpack_require__(139);

	var _pluginsChromecast2 = _interopRequireDefault(_pluginsChromecast);

	/* Core Plugins */

	var _pluginsDvr_controls = __webpack_require__(150);

	var _pluginsDvr_controls2 = _interopRequireDefault(_pluginsDvr_controls);

	var _pluginsFavicon = __webpack_require__(155);

	var _pluginsFavicon2 = _interopRequireDefault(_pluginsFavicon);

	var Loader = (function (_BaseObject) {
	  _inherits(Loader, _BaseObject);

	  function Loader(externalPlugins, playerId) {
	    _classCallCheck(this, Loader);

	    _get(Object.getPrototypeOf(Loader.prototype), 'constructor', this).call(this);
	    this.playerId = playerId;
	    this.playbackPlugins = [_playbacksHtml5_audio2['default'], _playbacksHtml5_video2['default'], _playbacksFlash2['default'], _playbacksHls2['default'], _playbacksHtml_img2['default'], _playbacksNo_op2['default']];
	    this.containerPlugins = [_pluginsSpinner_three_bounce2['default'], _pluginsWatermark2['default'], _pluginsPoster2['default'], _pluginsStats2['default'], _pluginsGoogle_analytics2['default'], _pluginsClick_to_pause2['default']];
	    this.corePlugins = [_pluginsDvr_controls2['default'], _pluginsFavicon2['default'], _pluginsChromecast2['default']];
	    if (externalPlugins) {
	      this.addExternalPlugins(externalPlugins);
	    }
	  }

	  _createClass(Loader, [{
	    key: 'addExternalPlugins',
	    value: function addExternalPlugins(plugins) {
	      var pluginName = function pluginName(plugin) {
	        return plugin.prototype.name;
	      };
	      if (plugins.playback) {
	        this.playbackPlugins = (0, _lodashUniq2['default'])(plugins.playback.concat(this.playbackPlugins), pluginName);
	      }
	      if (plugins.container) {
	        this.containerPlugins = (0, _lodashUniq2['default'])(plugins.container.concat(this.containerPlugins), pluginName);
	      }
	      if (plugins.core) {
	        this.corePlugins = (0, _lodashUniq2['default'])(plugins.core.concat(this.corePlugins), pluginName);
	      }
	      _player_info2['default'].getInstance(this.playerId).playbackPlugins = this.playbackPlugins;
	    }
	  }, {
	    key: 'getPlugin',
	    value: function getPlugin(name) {
	      var allPlugins = this.containerPlugins.concat(this.playbackPlugins).concat(this.corePlugins);
	      return allPlugins.find(function (plugin) {
	        return plugin.prototype.name === name;
	      });
	    }
	  }]);

	  return Loader;
	})(_baseBase_object2['default']);

	exports['default'] = Loader;
	module.exports = exports['default'];

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var baseCallback = __webpack_require__(75),
	    baseUniq = __webpack_require__(87),
	    isIterateeCall = __webpack_require__(92);

	/**
	 * An implementation of `_.uniq` optimized for sorted arrays without support
	 * for callback shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee] The function invoked per iteration.
	 * @returns {Array} Returns the new duplicate-value-free array.
	 */
	function sortedUniq(array, iteratee) {
	  var seen,
	      index = -1,
	      length = array.length,
	      resIndex = -1,
	      result = [];

	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value, index, array) : value;

	    if (!index || seen !== computed) {
	      seen = computed;
	      result[++resIndex] = value;
	    }
	  }
	  return result;
	}

	/**
	 * Creates a duplicate-value-free version of an array using `SameValueZero`
	 * for equality comparisons. Providing `true` for `isSorted` performs a faster
	 * search algorithm for sorted arrays. If an iteratee function is provided it
	 * is invoked for each value in the array to generate the criterion by which
	 * uniqueness is computed. The `iteratee` is bound to `thisArg` and invoked
	 * with three arguments; (value, index, array).
	 *
	 * If a property name is provided for `predicate` the created "_.property"
	 * style callback returns the property value of the given element.
	 *
	 * If an object is provided for `predicate` the created "_.matches" style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
	 * e.g. `===`, except that `NaN` matches `NaN`. See the
	 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @alias unique
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {boolean} [isSorted] Specify the array is sorted.
	 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	 *  If a property name or object is provided it is used to create a "_.property"
	 *  or "_.matches" style callback respectively.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Array} Returns the new duplicate-value-free array.
	 * @example
	 *
	 * _.uniq([1, 2, 1]);
	 * // => [1, 2]
	 *
	 * // using `isSorted`
	 * _.uniq([1, 1, 2], true);
	 * // => [1, 2]
	 *
	 * // using an iteratee function
	 * _.uniq([1, 2.5, 1.5, 2], function(n) { return this.floor(n); }, Math);
	 * // => [1, 2.5]
	 *
	 * // using the "_.property" callback shorthand
	 * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	 * // => [{ 'x': 1 }, { 'x': 2 }]
	 */
	function uniq(array, isSorted, iteratee, thisArg) {
	  var length = array ? array.length : 0;
	  if (!length) {
	    return [];
	  }
	  // Juggle arguments.
	  if (typeof isSorted != 'boolean' && isSorted != null) {
	    thisArg = iteratee;
	    iteratee = isIterateeCall(array, isSorted, thisArg) ? null : isSorted;
	    isSorted = false;
	  }
	  iteratee = iteratee == null ? iteratee : baseCallback(iteratee, thisArg, 3);
	  return isSorted ? sortedUniq(array, iteratee) : baseUniq(array, iteratee);
	}

	module.exports = uniq;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.3.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var baseIsEqual = __webpack_require__(76),
	    bindCallback = __webpack_require__(82),
	    isArray = __webpack_require__(77),
	    pairs = __webpack_require__(83);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  return value == null ? '' : value + '';
	}

	/**
	 * The base implementation of `_.callback` which supports specifying the
	 * number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {*} [func=_.identity] The value to convert to a callback.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function baseCallback(func, thisArg, argCount) {
	  var type = typeof func;
	  if (type == 'function') {
	    return thisArg === undefined ? func : bindCallback(func, thisArg, argCount);
	  }
	  if (func == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return baseMatches(func);
	  }
	  return thisArg === undefined ? property(func) : baseMatchesProperty(func, thisArg);
	}

	/**
	 * The base implementation of `get` without support for string paths
	 * and default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path of the property to get.
	 * @param {string} [pathKey] The key representation of path.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path, pathKey) {
	  if (object == null) {
	    return;
	  }
	  if (pathKey !== undefined && pathKey in toObject(object)) {
	    path = [pathKey];
	  }
	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return index && index == length ? object : undefined;
	}

	/**
	 * The base implementation of `_.isMatch` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Array} matchData The propery names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = toObject(object);
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
	      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	/**
	 * The base implementation of `_.matches` which does not clone `source`.
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
	      return object[key] === value && (value !== undefined || key in toObject(object));
	    };
	  }
	  return function (object) {
	    return baseIsMatch(object, matchData);
	  };
	}

	/**
	 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to compare.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  var isArr = isArray(path),
	      isCommon = isKey(path) && isStrictComparable(srcValue),
	      pathKey = path + '';

	  path = toPath(path);
	  return function (object) {
	    if (object == null) {
	      return false;
	    }
	    var key = pathKey;
	    object = toObject(object);
	    if ((isArr || !isCommon) && !(key in object)) {
	      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	      if (object == null) {
	        return false;
	      }
	      key = last(path);
	      object = toObject(object);
	    }
	    return object[key] === srcValue ? srcValue !== undefined || key in object : baseIsEqual(srcValue, object[key], undefined, true);
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
	  var pathKey = path + '';
	  path = toPath(path);
	  return function (object) {
	    return baseGet(object, path, pathKey);
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

	  start = start == null ? 0 : +start || 0;
	  if (start < 0) {
	    start = -start > length ? 0 : length + start;
	  }
	  end = end === undefined || end > length ? length : +end || 0;
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
	 * Gets the propery names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = pairs(object),
	      length = result.length;

	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
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
	  var type = typeof value;
	  if (type == 'string' && reIsPlainProp.test(value) || type == 'number') {
	    return true;
	  }
	  if (isArray(value)) {
	    return false;
	  }
	  var result = !reIsDeepProp.test(value);
	  return result || object != null && value in toObject(object);
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
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	/**
	 * Converts `value` to property path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array} Returns the property path array.
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return value;
	  }
	  var result = [];
	  baseToString(value).replace(rePropName, function (match, number, quote, string) {
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
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
	 * Creates a function that returns the property value at `path` on a
	 * given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
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
	 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}

	module.exports = baseCallback;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.7 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var isArray = __webpack_require__(77),
	    isTypedArray = __webpack_require__(78),
	    keys = __webpack_require__(79);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * A specialized version of `_.some` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
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
	 * The base implementation of `_.isEqual` without support for `this` binding
	 * `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
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
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = objToString.call(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = objToString.call(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag);
	  }
	  if (!isLoose) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  // For more information on detecting circular references see https://es5.github.io/#JO.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == object) {
	      return stackB[length] == other;
	    }
	  }
	  // Add `object` and `other` to the stack of traversed objects.
	  stackA.push(object);
	  stackB.push(other);

	  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

	  stackA.pop();
	  stackB.pop();

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
	 * @param {Function} [customizer] The function to customize comparing arrays.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var index = -1,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
	    return false;
	  }
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index],
	        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

	    if (result !== undefined) {
	      if (result) {
	        continue;
	      }
	      return false;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isLoose) {
	      if (!arraySome(other, function (othValue) {
	        return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
	      })) {
	        return false;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
	      return false;
	    }
	  }
	  return true;
	}

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} value The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag) {
	  switch (tag) {
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
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isLoose) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  var skipCtor = isLoose;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key],
	        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose ? objValue : othValue, key) : undefined;

	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
	      return false;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (!skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      return false;
	    }
	  }
	  return true;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = baseIsEqual;

/***/ },
/* 77 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	'use strict';

	var arrayTag = '[object Array]',
	    funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function (value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

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
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
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
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isArray;

/***/ },
/* 78 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	'use strict';

	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
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

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
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
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}

	module.exports = isTypedArray;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var getNative = __webpack_require__(80),
	    isArguments = __webpack_require__(81),
	    isArray = __webpack_require__(77);

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

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
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
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
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if (allowIndexes && isIndex(key, length) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
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
	var keys = !nativeKeys ? shimKeys : function (object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if (typeof Ctor == 'function' && Ctor.prototype === object || typeof object != 'function' && isArrayLike(object)) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
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
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = length && isLength(length) && (isArray(object) || isArguments(object)) && length || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = index + '';
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;

/***/ },
/* 80 */
/***/ function(module, exports) {

	/**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	'use strict';

	var funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
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
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
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
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = getNative;

/***/ },
/* 81 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	'use strict';

	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

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
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is classified as an `arguments` object.
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
	  return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;

/***/ },
/* 82 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	'use strict';

	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1:
	      return function (value) {
	        return func.call(thisArg, value);
	      };
	    case 3:
	      return function (value, index, collection) {
	        return func.call(thisArg, value, index, collection);
	      };
	    case 4:
	      return function (accumulator, value, index, collection) {
	        return func.call(thisArg, accumulator, value, index, collection);
	      };
	    case 5:
	      return function (value, other, key, object, source) {
	        return func.call(thisArg, value, other, key, object, source);
	      };
	  }
	  return function () {
	    return func.apply(thisArg, arguments);
	  };
	}

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
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

	module.exports = bindCallback;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var keys = __webpack_require__(84);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Creates a two dimensional array of the key-value pairs for `object`,
	 * e.g. `[[key1, value1], [key2, value2]]`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * _.pairs({ 'barney': 36, 'fred': 40 });
	 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
	 */
	function pairs(object) {
	  object = toObject(object);

	  var index = -1,
	      props = keys(object),
	      length = props.length,
	      result = Array(length);

	  while (++index < length) {
	    var key = props[index];
	    result[index] = [key, object[key]];
	  }
	  return result;
	}

	module.exports = pairs;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var getNative = __webpack_require__(85),
	    isArguments = __webpack_require__(86),
	    isArray = __webpack_require__(77);

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

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
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
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
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if (allowIndexes && isIndex(key, length) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
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
	var keys = !nativeKeys ? shimKeys : function (object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if (typeof Ctor == 'function' && Ctor.prototype === object || typeof object != 'function' && isArrayLike(object)) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
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
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = length && isLength(length) && (isArray(object) || isArguments(object)) && length || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = index + '';
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;

/***/ },
/* 85 */
/***/ function(module, exports) {

	/**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	'use strict';

	var funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
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
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
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
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = getNative;

/***/ },
/* 86 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	'use strict';

	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

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
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is classified as an `arguments` object.
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
	  return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var baseIndexOf = __webpack_require__(88),
	    cacheIndexOf = __webpack_require__(89),
	    createCache = __webpack_require__(90);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of `_.uniq` without support for callback shorthands
	 * and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee] The function invoked per iteration.
	 * @returns {Array} Returns the new duplicate-value-free array.
	 */
	function baseUniq(array, iteratee) {
	  var index = -1,
	      indexOf = baseIndexOf,
	      length = array.length,
	      isCommon = true,
	      isLarge = isCommon && length >= LARGE_ARRAY_SIZE,
	      seen = isLarge ? createCache() : null,
	      result = [];

	  if (seen) {
	    indexOf = cacheIndexOf;
	    isCommon = false;
	  } else {
	    isLarge = false;
	    seen = iteratee ? [] : result;
	  }
	  outer: while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value, index, array) : value;

	    if (isCommon && value === value) {
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
	    } else if (indexOf(seen, computed, 0) < 0) {
	      if (iteratee || isLarge) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseUniq;

/***/ },
/* 88 */
/***/ function(module, exports) {

	/**
	 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * The base implementation of `_.indexOf` without support for binary searches.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	"use strict";

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
	 * If `fromRight` is provided elements of `array` are iterated from right to left.
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

	module.exports = baseIndexOf;

/***/ },
/* 89 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * Checks if `value` is in `cache` mimicking the return signature of
	 * `_.indexOf` by returning `0` if the value is found, else `-1`.
	 *
	 * @private
	 * @param {Object} cache The cache to search.
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `0` if `value` is found, else `-1`.
	 */
	'use strict';

	function cacheIndexOf(cache, value) {
	  var data = cache.data,
	      result = typeof value == 'string' || isObject(value) ? data.set.has(value) : data.hash[value];

	  return result ? 0 : -1;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = cacheIndexOf;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var getNative = __webpack_require__(91);

	/** Native method references. */
	var Set = getNative(global, 'Set');

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCreate = getNative(Object, 'create');

	/**
	 *
	 * Creates a cache object to store unique values.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var length = values ? values.length : 0;

	  this.data = { 'hash': nativeCreate(null), 'set': new Set() };
	  while (length--) {
	    this.push(values[length]);
	  }
	}

	/**
	 * Adds `value` to the cache.
	 *
	 * @private
	 * @name push
	 * @memberOf SetCache
	 * @param {*} value The value to cache.
	 */
	function cachePush(value) {
	  var data = this.data;
	  if (typeof value == 'string' || isObject(value)) {
	    data.set.add(value);
	  } else {
	    data.hash[value] = true;
	  }
	}

	/**
	 * Creates a `Set` cache object to optimize linear searches of large arrays.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
	 */
	function createCache(values) {
	  return nativeCreate && Set ? new SetCache(values) : null;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	// Add functions to the `Set` cache.
	SetCache.prototype.push = cachePush;

	module.exports = createCache;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 91 */
/***/ function(module, exports) {

	/**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	'use strict';

	var funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
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
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
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
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = getNative;

/***/ },
/* 92 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.9 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used to detect unsigned integer values. */
	'use strict';

	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

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
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
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
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
	    var other = object[index];
	    return value === value ? value === other : other !== other;
	  }
	  return false;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isIterateeCall;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(94);

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUtils = __webpack_require__(2);

	var _basePlayback = __webpack_require__(96);

	var _basePlayback2 = _interopRequireDefault(_basePlayback);

	var _baseTemplate = __webpack_require__(35);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _baseStyler = __webpack_require__(34);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _componentsBrowser = __webpack_require__(14);

	var _componentsBrowser2 = _interopRequireDefault(_componentsBrowser);

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _publicStyleScss = __webpack_require__(97);

	var _publicStyleScss2 = _interopRequireDefault(_publicStyleScss);

	var _publicIndexHtml = __webpack_require__(98);

	var _publicIndexHtml2 = _interopRequireDefault(_publicIndexHtml);

	var _lodashFind = __webpack_require__(38);

	var _lodashFind2 = _interopRequireDefault(_lodashFind);

	var HTML5Video = (function (_Playback) {
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
	      return (0, _baseTemplate2['default'])(_publicIndexHtml2['default']);
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
	        'timeupdate': 'timeUpdated',
	        'progress': 'progress',
	        'ended': 'ended',
	        'stalled': 'stalled',
	        'waiting': 'waiting',
	        'canplaythrough': 'bufferFull',
	        'loadedmetadata': 'loadedMetadata',
	        'canplay': 'ready',
	        'durationchange': 'durationChange',
	        'error': 'error',
	        'playing': 'playing',
	        'pause': 'paused'
	      };
	    }
	  }]);

	  function HTML5Video(options) {
	    _classCallCheck(this, HTML5Video);

	    _get(Object.getPrototypeOf(HTML5Video.prototype), 'constructor', this).call(this, options);
	    this.options = options;
	    this.src = options.src;
	    this.el.src = options.src;
	    this.el.loop = options.loop;
	    this.firstBuffer = true;
	    this.settings = { 'default': ['seekbar'] };
	    if (_componentsBrowser2['default'].isSafari) {
	      this.setupSafari();
	    } else {
	      this.el.preload = options.preload ? options.preload : 'metadata';
	      this.settings.seekEnabled = true;
	    }
	    this.settings.left = ["playpause", "position", "duration"];
	    this.settings.right = ["fullscreen", "volume"];
	  }

	  _createClass(HTML5Video, [{
	    key: 'setupSafari',
	    value: function setupSafari() {
	      this.el.preload = 'auto';
	    }
	  }, {
	    key: 'loadedMetadata',
	    value: function loadedMetadata(e) {
	      this.durationChange();
	      this.trigger(_baseEvents2['default'].PLAYBACK_LOADEDMETADATA, e.target.duration);
	      this.checkInitialSeek();
	    }
	  }, {
	    key: 'durationChange',
	    value: function durationChange() {
	      // we can't figure out if hls resource is VoD or not until it is being loaded or duration has changed.
	      // that's why we check it again and update media control accordingly.
	      if (this.getPlaybackType() === 'vod') {
	        this.settings.left = ["playpause", "position", "duration"];
	      } else {
	        this.settings.left = ["playstop"];
	      }
	      this.settings.seekEnabled = isFinite(this.getDuration());
	      this.trigger(_baseEvents2['default'].PLAYBACK_SETTINGSUPDATE);
	    }
	  }, {
	    key: 'getPlaybackType',
	    value: function getPlaybackType() {
	      return [0, undefined, Infinity].indexOf(this.el.duration) >= 0 ? 'live' : 'vod';
	    }
	  }, {
	    key: 'isHighDefinitionInUse',
	    value: function isHighDefinitionInUse() {
	      return false;
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      this.el.play();
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.el.pause();
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.pause();
	      if (this.el.readyState !== 0) {
	        this.el.currentTime = 0;
	      }
	    }
	  }, {
	    key: 'volume',
	    value: function volume(value) {
	      this.el.volume = value / 100;
	    }
	  }, {
	    key: 'mute',
	    value: function mute() {
	      this.el.volume = 0;
	    }
	  }, {
	    key: 'unmute',
	    value: function unmute() {
	      this.el.volume = 1;
	    }
	  }, {
	    key: 'isMuted',
	    value: function isMuted() {
	      return !!this.el.volume;
	    }
	  }, {
	    key: 'isPlaying',
	    value: function isPlaying() {
	      return !this.el.paused && !this.el.ended;
	    }
	  }, {
	    key: 'playing',
	    value: function playing() {
	      this.trigger(_baseEvents2['default'].PLAYBACK_PLAY);
	    }
	  }, {
	    key: 'paused',
	    value: function paused() {
	      this.trigger(_baseEvents2['default'].PLAYBACK_PAUSE);
	    }
	  }, {
	    key: 'ended',
	    value: function ended() {
	      this.trigger(_baseEvents2['default'].PLAYBACK_BUFFERFULL, this.name);
	      this.trigger(_baseEvents2['default'].PLAYBACK_ENDED, this.name);
	      this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, 0, this.el.duration, this.name);
	    }
	  }, {
	    key: 'stalled',
	    value: function stalled() {
	      if (this.getPlaybackType() === 'vod' && this.el.readyState < this.el.HAVE_FUTURE_DATA) {
	        this.trigger(_baseEvents2['default'].PLAYBACK_BUFFERING, this.name);
	      }
	    }
	  }, {
	    key: 'waiting',
	    value: function waiting() {
	      if (this.el.readyState < this.el.HAVE_FUTURE_DATA) {
	        this.trigger(_baseEvents2['default'].PLAYBACK_BUFFERING, this.name);
	      }
	    }
	  }, {
	    key: 'bufferFull',
	    value: function bufferFull() {
	      if (this.options.poster && this.firstBuffer) {
	        this.firstBuffer = false;
	        if (!this.isPlaying()) {
	          this.el.poster = this.options.poster;
	        }
	      } else {
	        this.el.poster = '';
	      }
	      this.trigger(_baseEvents2['default'].PLAYBACK_BUFFERFULL, this.name);
	    }
	  }, {
	    key: 'error',
	    value: function error(event) {
	      this.trigger(_baseEvents2['default'].PLAYBACK_ERROR, this.el.error, this.name);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.stop();
	      this.el.src = '';
	      this.$el.remove();
	    }
	  }, {
	    key: 'seek',
	    value: function seek(seekBarValue) {
	      var time = this.el.duration * (seekBarValue / 100);
	      this.seekSeconds(time);
	    }
	  }, {
	    key: 'seekSeconds',
	    value: function seekSeconds(time) {
	      this.el.currentTime = time;
	    }
	  }, {
	    key: 'checkInitialSeek',
	    value: function checkInitialSeek() {
	      var seekTime = (0, _baseUtils.seekStringToSeconds)(window.location.href);
	      this.seekSeconds(seekTime);
	    }
	  }, {
	    key: 'getCurrentTime',
	    value: function getCurrentTime() {
	      return this.el.currentTime;
	    }
	  }, {
	    key: 'getDuration',
	    value: function getDuration() {
	      return this.el.duration;
	    }
	  }, {
	    key: 'timeUpdated',
	    value: function timeUpdated() {
	      if (this.getPlaybackType() === 'live') {
	        this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, 1, 1, this.name);
	      } else {
	        this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, this.el.currentTime, this.el.duration, this.name);
	      }
	    }
	  }, {
	    key: 'progress',
	    value: function progress() {
	      if (!this.el.buffered.length) return;
	      var bufferedPos = 0;
	      for (var i = 0; i < this.el.buffered.length; i++) {
	        if (this.el.currentTime >= this.el.buffered.start(i) && this.el.currentTime <= this.el.buffered.end(i)) {
	          bufferedPos = i;
	          break;
	        }
	      }
	      this.checkBufferState(this.el.buffered.end(bufferedPos));
	      this.trigger(_baseEvents2['default'].PLAYBACK_PROGRESS, this.el.buffered.start(bufferedPos), this.el.buffered.end(bufferedPos), this.el.duration, this.name);
	    }
	  }, {
	    key: 'checkBufferState',
	    value: function checkBufferState(bufferedPos) {
	      var playbackPos = this.el.currentTime + 0.05; // 50 ms threshold
	      if (this.isPlaying() && playbackPos >= bufferedPos) {
	        this.trigger(_baseEvents2['default'].PLAYBACK_BUFFERING, this.name);
	        this.buffering = true;
	      } else if (this.buffering) {
	        this.trigger(_baseEvents2['default'].PLAYBACK_BUFFERFULL, this.name);
	        this.buffering = false;
	      }
	    }
	  }, {
	    key: 'typeFor',
	    value: function typeFor(src) {
	      return src.indexOf('.m3u8') > 0 ? 'application/vnd.apple.mpegurl' : 'video/mp4';
	    }
	  }, {
	    key: 'ready',
	    value: function ready() {
	      this.trigger(_baseEvents2['default'].PLAYBACK_READY, this.name);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;

	      var style = _baseStyler2['default'].getStyleFor(_publicStyleScss2['default']);
	      this.$el.html(this.template({ src: this.src, type: this.typeFor(this.src) }));
	      if (this.options.useVideoTagDefaultControls) {
	        this.$el.attr('controls', 'controls');
	      }
	      this.$el.append(style);
	      process.nextTick(function () {
	        return _this.options.autoPlay && _this.play();
	      });
	      if (this.el.readyState === this.el.HAVE_ENOUGH_DATA) {
	        this.ready();
	      }
	      return this;
	    }
	  }]);

	  return HTML5Video;
	})(_basePlayback2['default']);

	exports['default'] = HTML5Video;

	HTML5Video.canPlay = function (resource, mimeType) {
	  var mimetypes = {
	    'mp4': ["avc1.42E01E", "avc1.58A01E", "avc1.4D401E", "avc1.64001E", "mp4v.20.8", "mp4v.20.240", "mp4a.40.2"].map(function (codec) {
	      return 'video/mp4; codecs="' + codec + ', mp4a.40.2"';
	    }),
	    'ogg': ['video/ogg; codecs="theora, vorbis"', 'video/ogg; codecs="dirac"', 'video/ogg; codecs="theora, speex"'],
	    '3gpp': ['video/3gpp; codecs="mp4v.20.8, samr"'],
	    'webm': ['video/webm; codecs="vp8, vorbis"'],
	    'mkv': ['video/x-matroska; codecs="theora, vorbis"'],
	    'm3u8': ['application/x-mpegURL']
	  };
	  mimetypes['ogv'] = mimetypes['ogg'];
	  mimetypes['3gp'] = mimetypes['3gpp'];

	  var resourceParts = resource.split('?')[0].match(/.*\.(.*)$/) || [];
	  if (resourceParts.length > 1 && mimetypes[resourceParts[1]] !== undefined) {
	    var v = document.createElement('video');
	    return !!(0, _lodashFind2['default'])(mimetypes[resourceParts[1]], function (ext) {
	      return !!v.canPlayType(ext).replace(/no/, '');
	    });
	  } else if (mimeType) {
	    var v = document.createElement('video');
	    return !!v.canPlayType(mimeType).replace(/no/, '');
	  }
	  return false;
	};

	module.exports = HTML5Video;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(95)))

/***/ },
/* 95 */
/***/ function(module, exports) {

	// shim for using process in browser

	'use strict';

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
	            currentQueue[queueIndex].run();
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

	// TODO(shtylman)
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
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utils = __webpack_require__(2);

	var _ui_object = __webpack_require__(27);

	var _ui_object2 = _interopRequireDefault(_ui_object);

	/**
	 * An abstraction to represent a generic playback, it's like an interface to be implemented by subclasses.
	 * @class Playback
	 * @constructor
	 * @extends UIObject
	 * @module base
	 */

	var Playback = (function (_UIObject) {
	  _inherits(Playback, _UIObject);

	  /**
	   * @method constructor
	   * @param {Object} options the options object
	   */

	  function Playback(options) {
	    _classCallCheck(this, Playback);

	    _get(Object.getPrototypeOf(Playback.prototype), 'constructor', this).call(this, options);
	    this.settings = {};
	  }

	  /**
	   * plays the playback.
	   * @method play
	   */

	  _createClass(Playback, [{
	    key: 'play',
	    value: function play() {}

	    /**
	     * pauses the playback.
	     * @method pause
	     */
	  }, {
	    key: 'pause',
	    value: function pause() {}

	    /**
	     * stops the playback.
	     * @method stop
	     */
	  }, {
	    key: 'stop',
	    value: function stop() {}

	    /**
	     * seeks the playback to a given `time` in percentage
	     * @method seek
	     * @param {Number} time should be a number between 0 and 100
	     */
	  }, {
	    key: 'seek',
	    value: function seek(time) {}

	    /**
	     * gets the duration in seconds
	     * @method getDuration
	     * @return {Number} duration time (in seconds) of the current source
	     */
	  }, {
	    key: 'getDuration',
	    value: function getDuration() {
	      return 0;
	    }

	    /**
	     * checks if the playback is playing.
	     * @method isPlaying
	     * @return {Boolean} `true` if the current playback is playing, otherwise `false`
	     */
	  }, {
	    key: 'isPlaying',
	    value: function isPlaying() {
	      return false;
	    }

	    /**
	     * gets the playback type
	     * @method getPlaybackType
	     * @return {String} you should write the playback type otherwise it'll assume `'no_op'`
	     * @example
	     * ```javascript
	     * html5VideoPlayback.getPlaybackType() //html5_video
	     * flashHlsPlayback.getPlaybackType() //hls
	     * ```
	     */
	  }, {
	    key: 'getPlaybackType',
	    value: function getPlaybackType() {
	      return 'no_op';
	    }

	    /**
	     * checks if the playback is in HD.
	     * @method isHighDefinitionInUse
	     * @return {Boolean} `true` if the playback is playing in HD, otherwise `false`
	     */
	  }, {
	    key: 'isHighDefinitionInUse',
	    value: function isHighDefinitionInUse() {
	      return false;
	    }

	    /**
	     * sets the volume for the playback
	     * @method volume
	     * @param {Number} value a number between 0 (`muted`) to 100 (`max`)
	     */
	  }, {
	    key: 'volume',
	    value: function volume(value) {}

	    /**
	     * destroys the playback, removing it from DOM
	     * @method destroy
	     */
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.$el.remove();
	    }
	  }]);

	  return Playback;
	})(_ui_object2['default']);

	exports['default'] = Playback;

	Playback.extend = function (properties) {
	  return (0, _utils.extend)(Playback, properties);
	};

	Playback.canPlay = function (source) {
	  return false;
	};
	module.exports = exports['default'];

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, "[data-html5-video] {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  display: block; }\n", ""]);

	// exports


/***/ },
/* 98 */
/***/ function(module, exports) {

	module.exports = "<source src=\"<%=src%>\" type=\"<%=type%>\">\n";

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(100);

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUtils = __webpack_require__(2);

	var _basePlayback = __webpack_require__(96);

	var _basePlayback2 = _interopRequireDefault(_basePlayback);

	var _baseStyler = __webpack_require__(34);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _componentsMediator = __webpack_require__(64);

	var _componentsMediator2 = _interopRequireDefault(_componentsMediator);

	var _baseTemplate = __webpack_require__(35);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _clapprZepto = __webpack_require__(26);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _componentsBrowser = __webpack_require__(14);

	var _componentsBrowser2 = _interopRequireDefault(_componentsBrowser);

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _publicStyleScss = __webpack_require__(101);

	var _publicStyleScss2 = _interopRequireDefault(_publicStyleScss);

	var _publicFlash_playbackHtml = __webpack_require__(102);

	var _publicFlash_playbackHtml2 = _interopRequireDefault(_publicFlash_playbackHtml);

	var _publicPlayerSwf = __webpack_require__(103);

	var _publicPlayerSwf2 = _interopRequireDefault(_publicPlayerSwf);

	var MAX_ATTEMPTS = 60;

	var objectIE = '<object type="application/x-shockwave-flash" id="<%= cid %>" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" data-flash-vod=""><param name="movie" value="<%= swfPath %>"> <param name="quality" value="autohigh"> <param name="swliveconnect" value="true"> <param name="allowScriptAccess" value="always"> <param name="bgcolor" value="#001122"> <param name="allowFullScreen" value="false"> <param name="wmode" value="gpu"> <param name="tabindex" value="1"> <param name=FlashVars value="playbackId=<%= playbackId %>" /> </object>';

	var Flash = (function (_Playback) {
	  _inherits(Flash, _Playback);

	  _createClass(Flash, [{
	    key: 'name',
	    get: function get() {
	      return 'flash';
	    }
	  }, {
	    key: 'tagName',
	    get: function get() {
	      return 'object';
	    }
	  }, {
	    key: 'template',
	    get: function get() {
	      return (0, _baseTemplate2['default'])(_publicFlash_playbackHtml2['default']);
	    }
	  }]);

	  function Flash(options) {
	    _classCallCheck(this, Flash);

	    _get(Object.getPrototypeOf(Flash.prototype), 'constructor', this).call(this, options);
	    this.src = options.src;
	    this.baseUrl = options.baseUrl;
	    this.autoPlay = options.autoPlay;
	    this.settings = { 'default': ['seekbar'] };
	    this.settings.left = ["playpause", "position", "duration"];
	    this.settings.right = ["fullscreen", "volume"];
	    this.settings.seekEnabled = true;
	    this.isReady = false;
	    this.addListeners();
	  }

	  _createClass(Flash, [{
	    key: 'bootstrap',
	    value: function bootstrap() {
	      var _this = this;

	      if (this.el.playerPlay) {
	        this.el.width = "100%";
	        this.el.height = "100%";
	        if (this.currentState === 'PLAYING') {
	          this.firstPlay();
	        } else {
	          this.currentState = "IDLE";
	          this.autoPlay && this.play();
	        }
	        (0, _clapprZepto2['default'])('<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" />').insertAfter(this.$el);
	        if (this.getDuration() > 0) {
	          this.metadataLoaded();
	        } else {
	          _componentsMediator2['default'].once(this.uniqueId + ':timeupdate', this.metadataLoaded, this);
	        }
	      } else {
	        this._attempts = this._attempts || 0;
	        if (++this._attempts <= MAX_ATTEMPTS) {
	          setTimeout(function () {
	            return _this.bootstrap();
	          }, 50);
	        } else {
	          this.trigger(_baseEvents2['default'].PLAYBACK_ERROR, { message: "Max number of attempts reached" }, this.name);
	        }
	      }
	    }
	  }, {
	    key: 'metadataLoaded',
	    value: function metadataLoaded() {
	      this.isReady = true;
	      this.trigger(_baseEvents2['default'].PLAYBACK_READY, this.name);
	      this.trigger(_baseEvents2['default'].PLAYBACK_SETTINGSUPDATE, this.name);
	    }
	  }, {
	    key: 'getPlaybackType',
	    value: function getPlaybackType() {
	      return 'vod';
	    }
	  }, {
	    key: 'setupFirefox',
	    value: function setupFirefox() {
	      var $el = this.$('embed');
	      $el.attr('data-flash', '');
	      this.setElement($el[0]);
	    }
	  }, {
	    key: 'isHighDefinitionInUse',
	    value: function isHighDefinitionInUse() {
	      return false;
	    }
	  }, {
	    key: 'updateTime',
	    value: function updateTime() {
	      this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, this.el.getPosition(), this.el.getDuration(), this.name);
	    }
	  }, {
	    key: 'addListeners',
	    value: function addListeners() {
	      _componentsMediator2['default'].on(this.uniqueId + ':progress', this.progress, this);
	      _componentsMediator2['default'].on(this.uniqueId + ':timeupdate', this.updateTime, this);
	      _componentsMediator2['default'].on(this.uniqueId + ':statechanged', this.checkState, this);
	      _componentsMediator2['default'].on(this.uniqueId + ':flashready', this.bootstrap, this);
	    }
	  }, {
	    key: 'stopListening',
	    value: function stopListening() {
	      _get(Object.getPrototypeOf(Flash.prototype), 'stopListening', this).call(this);
	      _componentsMediator2['default'].off(this.uniqueId + ':progress');
	      _componentsMediator2['default'].off(this.uniqueId + ':timeupdate');
	      _componentsMediator2['default'].off(this.uniqueId + ':statechanged');
	      _componentsMediator2['default'].off(this.uniqueId + ':flashready');
	    }
	  }, {
	    key: 'checkState',
	    value: function checkState() {
	      if (this.currentState === "PAUSED") {
	        return;
	      } else if (this.currentState !== "PLAYING_BUFFERING" && this.el.getState() === "PLAYING_BUFFERING") {
	        this.trigger(_baseEvents2['default'].PLAYBACK_BUFFERING, this.name);
	        this.currentState = "PLAYING_BUFFERING";
	      } else if (this.el.getState() === "PLAYING") {
	        this.trigger(_baseEvents2['default'].PLAYBACK_BUFFERFULL, this.name);
	        this.currentState = "PLAYING";
	      } else if (this.el.getState() === "IDLE") {
	        this.currentState = "IDLE";
	      } else if (this.el.getState() === "ENDED") {
	        this.trigger(_baseEvents2['default'].PLAYBACK_ENDED, this.name);
	        this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, 0, this.el.getDuration(), this.name);
	        this.currentState = "ENDED";
	      }
	    }
	  }, {
	    key: 'progress',
	    value: function progress() {
	      if (this.currentState !== "IDLE" && this.currentState !== "ENDED") {
	        this.trigger(_baseEvents2['default'].PLAYBACK_PROGRESS, 0, this.el.getBytesLoaded(), this.el.getBytesTotal(), this.name);
	      }
	    }
	  }, {
	    key: 'firstPlay',
	    value: function firstPlay() {
	      var _this2 = this;

	      if (this.el.playerPlay) {
	        this.el.playerPlay(this.src);
	        this.listenToOnce(this, _baseEvents2['default'].PLAYBACK_BUFFERFULL, function () {
	          return _this2.checkInitialSeek();
	        });
	        this.currentState = "PLAYING";
	      } else {
	        this.listenToOnce(this, _baseEvents2['default'].PLAYBACK_READY, this.firstPlay);
	      }
	    }
	  }, {
	    key: 'checkInitialSeek',
	    value: function checkInitialSeek() {
	      var seekTime = (0, _baseUtils.seekStringToSeconds)(window.location.href);
	      if (seekTime !== 0) {
	        this.seekSeconds(seekTime);
	      }
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      if (this.currentState === 'PAUSED' || this.currentState === 'PLAYING_BUFFERING') {
	        this.currentState = "PLAYING";
	        this.el.playerResume();
	        this.trigger(_baseEvents2['default'].PLAYBACK_PLAY, this.name);
	      } else if (this.currentState !== 'PLAYING') {
	        this.firstPlay();
	        this.trigger(_baseEvents2['default'].PLAYBACK_PLAY, this.name);
	      }
	    }
	  }, {
	    key: 'volume',
	    value: function volume(value) {
	      var _this3 = this;

	      if (this.isReady) {
	        this.el.playerVolume(value);
	      } else {
	        this.listenToOnce(this, _baseEvents2['default'].PLAYBACK_BUFFERFULL, function () {
	          return _this3.volume(value);
	        });
	      }
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.currentState = "PAUSED";
	      this.el.playerPause();
	      this.trigger(_baseEvents2['default'].PLAYBACK_PAUSE, this.name);
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.el.playerStop();
	      this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, 0, this.name);
	    }
	  }, {
	    key: 'isPlaying',
	    value: function isPlaying() {
	      return !!(this.isReady && this.currentState.indexOf("PLAYING") > -1);
	    }
	  }, {
	    key: 'getDuration',
	    value: function getDuration() {
	      return this.el.getDuration();
	    }
	  }, {
	    key: 'seek',
	    value: function seek(seekBarValue) {
	      var _this4 = this;

	      if (this.el.getDuration() > 0) {
	        var seekTo = this.el.getDuration() * (seekBarValue / 100);
	        this.seekSeconds(seekTo);
	      } else {
	        this.listenToOnce(this, _baseEvents2['default'].PLAYBACK_BUFFERFULL, function () {
	          return _this4.seek(seekBarValue);
	        });
	      }
	    }
	  }, {
	    key: 'seekSeconds',
	    value: function seekSeconds(seekTo) {
	      var _this5 = this;

	      if (this.isReady && this.el.playerSeek) {
	        this.el.playerSeek(seekTo);
	        this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, seekTo, this.el.getDuration(), this.name);
	        if (this.currentState === "PAUSED") {
	          this.el.playerPause();
	        }
	      } else {
	        this.listenToOnce(this, _baseEvents2['default'].PLAYBACK_BUFFERFULL, function () {
	          return _this5.seekSeconds(seekTo);
	        });
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      clearInterval(this.bootstrapId);
	      _get(Object.getPrototypeOf(Flash.prototype), 'stopListening', this).call(this);
	      this.$el.remove();
	    }
	  }, {
	    key: 'setupIE',
	    value: function setupIE(swfPath) {
	      this.setElement((0, _clapprZepto2['default'])((0, _baseTemplate2['default'])(objectIE)({ cid: this.cid, swfPath: swfPath, baseUrl: this.baseUrl, playbackId: this.uniqueId })));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var style = _baseStyler2['default'].getStyleFor(_publicStyleScss2['default']);
	      var swfPath = (0, _baseTemplate2['default'])(_publicPlayerSwf2['default'])({ baseUrl: this.baseUrl });
	      this.$el.html(this.template({ cid: this.cid, swfPath: swfPath, baseUrl: this.baseUrl, playbackId: this.uniqueId }));
	      if (_componentsBrowser2['default'].isFirefox) {
	        this.setupFirefox();
	      } else if (_componentsBrowser2['default'].isLegacyIE) {
	        this.setupIE(swfPath);
	      }
	      this.$el.append(style);
	      return this;
	    }
	  }]);

	  return Flash;
	})(_basePlayback2['default']);

	exports['default'] = Flash;

	Flash.canPlay = function (resource) {
	  if (!_componentsBrowser2['default'].hasFlash || !resource || resource.constructor !== String) {
	    return false;
	  } else {
	    var resourceParts = resource.split('?')[0].match(/.*\.(.*)$/) || [];
	    return resourceParts.length > 1 && !_componentsBrowser2['default'].isMobile && resourceParts[1].match(/^(mp4|mov|f4v|3gpp|3gp)$/);
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, "[data-flash] {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  background-color: black;\n  display: block;\n  pointer-events: none; }\n", ""]);

	// exports


/***/ },
/* 102 */
/***/ function(module, exports) {

	module.exports = "  <param name=\"movie\" value=\"<%= swfPath %>\">\n  <param name=\"quality\" value=\"autohigh\">\n  <param name=\"swliveconnect\" value=\"true\">\n  <param name=\"allowScriptAccess\" value=\"always\">\n  <param name=\"bgcolor\" value=\"#001122\">\n  <param name=\"allowFullScreen\" value=\"false\">\n  <param name=\"wmode\" value=\"transparent\">\n  <param name=\"tabindex\" value=\"1\">\n  <param name=FlashVars value=\"playbackId=<%= playbackId %>\" />\n  <embed\n    type=\"application/x-shockwave-flash\"\n    disabled=\"disabled\"\n    tabindex=\"-1\"\n    enablecontextmenu=\"false\"\n    allowScriptAccess=\"always\"\n    quality=\"autohight\"\n    pluginspage=\"http://www.macromedia.com/go/getflashplayer\"\n    wmode=\"transparent\"\n    swliveconnect=\"true\"\n    type=\"application/x-shockwave-flash\"\n    allowfullscreen=\"false\"\n    bgcolor=\"#000000\"\n    FlashVars=\"playbackId=<%= playbackId %>\"\n    src=\"<%= swfPath %>\">\n  </embed>\n";

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "4b76590b32dab62bc95c1b7951efae78.swf"

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(105);

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _basePlayback = __webpack_require__(96);

	var _basePlayback2 = _interopRequireDefault(_basePlayback);

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _lodashFind = __webpack_require__(38);

	var _lodashFind2 = _interopRequireDefault(_lodashFind);

	var HTML5Audio = (function (_Playback) {
	  _inherits(HTML5Audio, _Playback);

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
	  }, {
	    key: 'events',
	    get: function get() {
	      return {
	        'loadedmetadata': 'loadedMetadata',
	        'stalled': 'stalled',
	        'waiting': 'waiting',
	        'timeupdate': 'timeUpdated',
	        'ended': 'ended',
	        'canplaythrough': 'bufferFull',
	        'playing': 'playing',
	        'pause': 'paused'
	      };
	    }
	  }]);

	  function HTML5Audio(params) {
	    _classCallCheck(this, HTML5Audio);

	    _get(Object.getPrototypeOf(HTML5Audio.prototype), 'constructor', this).call(this, params);
	    this.options = params;
	    this.settings = {
	      left: ['playpause', 'position', 'duration'],
	      right: ['fullscreen', 'volume'],
	      'default': ['seekbar'],
	      seekEnabled: true
	    };
	    this.render();
	    params.autoPlay && this.play();
	  }

	  _createClass(HTML5Audio, [{
	    key: 'bindEvents',
	    value: function bindEvents() {
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_PLAY, this.play);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_PAUSE, this.pause);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_SEEK, this.seek);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_VOLUME, this.volume);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_STOP, this.stop);
	    }
	  }, {
	    key: 'loadedMetadata',
	    value: function loadedMetadata(e) {
	      this.durationChange();
	      this.trigger(_baseEvents2['default'].PLAYBACK_LOADEDMETADATA, e.target.duration);
	    }
	  }, {
	    key: 'durationChange',
	    value: function durationChange() {
	      // we can't figure out if hls resource is VoD or not until it is being loaded or duration has changed.
	      // that's why we check it again and update media control accordingly.
	      if (this.getPlaybackType() === 'aod') {
	        this.settings.left = ["playpause", "position", "duration"];
	      } else {
	        this.settings.left = ["playstop"];
	      }
	      this.settings.seekEnabled = isFinite(this.getDuration());
	      this.trigger(_baseEvents2['default'].PLAYBACK_SETTINGSUPDATE);
	    }
	  }, {
	    key: 'getPlaybackType',
	    value: function getPlaybackType() {
	      return [0, undefined, Infinity].indexOf(this.el.duration) >= 0 ? 'live' : 'aod';
	    }
	  }, {
	    key: 'stalled',
	    value: function stalled() {
	      if (this.getPlaybackType() === 'vod' && this.el.readyState < this.el.HAVE_FUTURE_DATA) {
	        this.trigger(_baseEvents2['default'].PLAYBACK_BUFFERING, this.name);
	      }
	    }
	  }, {
	    key: 'waiting',
	    value: function waiting() {
	      if (this.el.readyState < this.el.HAVE_FUTURE_DATA) {
	        this.trigger(_baseEvents2['default'].PLAYBACK_BUFFERING, this.name);
	      }
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      if (this.el.src !== this.options.src) {
	        this.el.src = this.options.src;
	      }
	      this.el.play();
	      this.trigger(_baseEvents2['default'].PLAYBACK_PLAY);
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.el.pause();
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.pause();
	      this.el.currentTime = 0;
	      this.el.src = '';
	    }
	  }, {
	    key: 'volume',
	    value: function volume(value) {
	      this.el.volume = value / 100;
	    }
	  }, {
	    key: 'mute',
	    value: function mute() {
	      this.el.volume = 0;
	    }
	  }, {
	    key: 'unmute',
	    value: function unmute() {
	      this.el.volume = 1;
	    }
	  }, {
	    key: 'isMuted',
	    value: function isMuted() {
	      return !!this.el.volume;
	    }
	  }, {
	    key: 'ended',
	    value: function ended() {
	      this.trigger(_baseEvents2['default'].CONTAINER_TIMEUPDATE, 0);
	    }
	  }, {
	    key: 'seek',
	    value: function seek(seekBarValue) {
	      var time = this.el.duration * (seekBarValue / 100);
	      this.el.currentTime = time;
	    }
	  }, {
	    key: 'getCurrentTime',
	    value: function getCurrentTime() {
	      return this.el.currentTime;
	    }
	  }, {
	    key: 'getDuration',
	    value: function getDuration() {
	      return this.el.duration;
	    }
	  }, {
	    key: 'isPlaying',
	    value: function isPlaying() {
	      return !this.el.paused && !this.el.ended;
	    }
	  }, {
	    key: 'playing',
	    value: function playing() {
	      this.trigger(_baseEvents2['default'].PLAYBACK_PLAY);
	    }
	  }, {
	    key: 'paused',
	    value: function paused() {
	      this.trigger(_baseEvents2['default'].PLAYBACK_PAUSE);
	    }
	  }, {
	    key: 'timeUpdated',
	    value: function timeUpdated() {
	      if (this.getPlaybackType() === 'live') {
	        this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, 1, 1, this.name);
	      } else {
	        this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, this.el.currentTime, this.el.duration, this.name);
	      }
	    }
	  }, {
	    key: 'bufferFull',
	    value: function bufferFull() {
	      this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, this.el.currentTime, this.el.duration, this.name);
	      this.trigger(_baseEvents2['default'].PLAYBACK_BUFFERFULL);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.trigger(_baseEvents2['default'].PLAYBACK_READY, this.name);
	      return this;
	    }
	  }]);

	  return HTML5Audio;
	})(_basePlayback2['default']);

	exports['default'] = HTML5Audio;

	HTML5Audio.canPlay = function (resource, mimeType) {
	  var mimetypes = {
	    'wav': ['audio/wav'],
	    'mp3': ['audio/mp3', 'audio/mpeg;codecs="mp3"'],
	    'aac': ['audio/mp4;codecs="mp4a.40.5"'],
	    'oga': ['audio/ogg']
	  };
	  var resourceParts = resource.split('?')[0].match(/.*\.(.*)$/) || [];
	  if (resourceParts.length > 1 && mimetypes[resourceParts[1]] !== undefined) {
	    var a = document.createElement('audio');
	    return !!(0, _lodashFind2['default'])(mimetypes[resourceParts[1]], function (ext) {
	      return !!a.canPlayType(ext).replace(/no/, '');
	    });
	  } else if (mimeType && !/m3u8/.test(resourceParts[1])) {
	    var a = document.createElement('audio');
	    return !!a.canPlayType(mimeType).replace(/no/, '');
	  }
	  return false;
	};
	module.exports = exports['default'];

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(107);

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _basePlayback = __webpack_require__(96);

	var _basePlayback2 = _interopRequireDefault(_basePlayback);

	var _lodashAssign = __webpack_require__(3);

	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);

	var _baseTemplate = __webpack_require__(35);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _componentsMediator = __webpack_require__(64);

	var _componentsMediator2 = _interopRequireDefault(_componentsMediator);

	var _componentsBrowser = __webpack_require__(14);

	var _componentsBrowser2 = _interopRequireDefault(_componentsBrowser);

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _baseStyler = __webpack_require__(34);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _publicStyleScss = __webpack_require__(108);

	var _publicStyleScss2 = _interopRequireDefault(_publicStyleScss);

	var _publicHls_playbackHtml = __webpack_require__(109);

	var _publicHls_playbackHtml2 = _interopRequireDefault(_publicHls_playbackHtml);

	var _publicHLSPlayerSwf = __webpack_require__(110);

	var _publicHLSPlayerSwf2 = _interopRequireDefault(_publicHLSPlayerSwf);

	var _clapprZepto = __webpack_require__(26);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _flashls_events = __webpack_require__(111);

	var _flashls_events2 = _interopRequireDefault(_flashls_events);

	var MAX_ATTEMPTS = 60;

	var objectIE = '<object type="application/x-shockwave-flash" id="<%= cid %>" class="hls-playback" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" data-hls="" width="100%" height="100%"><param name="movie" value="<%= swfPath %>"> <param name="quality" value="autohigh"> <param name="swliveconnect" value="true"> <param name="allowScriptAccess" value="always"> <param name="bgcolor" value="#001122"> <param name="allowFullScreen" value="false"> <param name="wmode" value="transparent"> <param name="tabindex" value="1"> <param name=FlashVars value="playbackId=<%= playbackId %>&callback=<%= callbackName %>" /> </object>';

	var HLS = (function (_Playback) {
	  _inherits(HLS, _Playback);

	  _createClass(HLS, [{
	    key: 'name',
	    get: function get() {
	      return 'hls';
	    }
	  }, {
	    key: 'tagName',
	    get: function get() {
	      return 'object';
	    }
	  }, {
	    key: 'template',
	    get: function get() {
	      return (0, _baseTemplate2['default'])(_publicHls_playbackHtml2['default']);
	    }
	  }, {
	    key: 'attributes',
	    get: function get() {
	      return {
	        'class': 'hls-playback',
	        'data-hls': '',
	        'type': 'application/x-shockwave-flash',
	        'width': '100%',
	        'height': '100%'
	      };
	    }
	  }]);

	  function HLS(options) {
	    _classCallCheck(this, HLS);

	    _get(Object.getPrototypeOf(HLS.prototype), 'constructor', this).call(this, options);
	    this.src = options.src;
	    this.baseUrl = options.baseUrl;
	    this.initHlsParameters(options);
	    this.highDefinition = false;
	    this.autoPlay = options.autoPlay;
	    this.defaultSettings = {
	      left: ["playstop"],
	      'default': ['seekbar'],
	      right: ["fullscreen", "volume", "hd-indicator"],
	      seekEnabled: false
	    };
	    this.settings = (0, _lodashAssign2['default'])({}, this.defaultSettings);
	    this.playbackType = 'live';
	    this.addListeners();
	  }

	  _createClass(HLS, [{
	    key: 'initHlsParameters',
	    value: function initHlsParameters(options) {
	      this.flushLiveURLCache = options.flushLiveURLCache === undefined ? true : options.flushLiveURLCache;
	      this.capLevelToStage = options.capLevelToStage === undefined ? false : options.capLevelToStage;
	      this.useHardwareVideoDecoder = options.useHardwareVideoDecoder === undefined ? false : options.useHardwareVideoDecoder;
	      this.maxBufferLength = options.maxBufferLength === undefined ? 120 : options.maxBufferLength;
	      this.seekMode = options.seekMode === undefined ? "ACCURATE" : options.seekMode;
	      this.startFromLevel = options.startFromLevel === undefined ? -1 : options.startFromLevel;
	      this.startFromBitrate = options.startFromBitrate === undefined ? -1 : options.startFromBitrate;
	      this.hlsMinimumDvrSize = options.hlsMinimumDvrSize === undefined ? 60 : options.hlsMinimumDvrSize;
	      this.hlsLogEnabled = options.hlsLogEnabled === undefined ? true : options.hlsLogEnabled;
	      this.keyLoadMaxRetry = options.keyLoadMaxRetry === undefined ? 3 : options.keyLoadMaxRetry;
	      this.keyLoadMaxRetryTimeout = options.keyLoadMaxRetryTimeout === undefined ? 64000 : options.keyLoadMaxRetryTimeout;
	      this.fragmentLoadMaxRetry = options.fragmentLoadMaxRetry === undefined ? 3 : options.fragmentLoadMaxRetry;
	      this.fragmentLoadMaxRetryTimeout = options.fragmentLoadMaxRetryTimeout === undefined ? 4000 : options.fragmentLoadMaxRetryTimeout;
	      this.fragmentLoadSkipAfterMaxRetry = options.fragmentLoadSkipAfterMaxRetry === undefined ? false : options.fragmentLoadSkipAfterMaxRetry;
	      this.capLevelonFpsDrop = options.capLevelonFpsDrop === undefined ? false : options.capLevelonFpsDrop;
	      this.smoothAutoSwitchonFpsDrop = options.smoothAutoSwitchonFpsDrop === undefined ? this.capLevelonFpsDrop : options.smoothAutoSwitchonFpsDrop;
	      this.fpsDroppedMonitoringPeriod = options.fpsDroppedMonitoringPeriod === undefined ? 5000 : options.fpsDroppedMonitoringPeriod;
	      this.fpsDroppedMonitoringThreshold = options.fpsDroppedMonitoringThreshold === undefined ? 0.2 : options.fpsDroppedMonitoringThreshold;
	    }
	  }, {
	    key: 'addListeners',
	    value: function addListeners() {
	      var _this = this;

	      _componentsMediator2['default'].on(this.cid + ':flashready', function () {
	        return _this.bootstrap();
	      });
	      _componentsMediator2['default'].on(this.cid + ':timeupdate', function (timeMetrics) {
	        return _this.updateTime(timeMetrics);
	      });
	      _componentsMediator2['default'].on(this.cid + ':playbackstate', function (state) {
	        return _this.setPlaybackState(state);
	      });
	      _componentsMediator2['default'].on(this.cid + ':levelchanged', function (level) {
	        return _this.levelChanged(level);
	      });
	      _componentsMediator2['default'].on(this.cid + ':error', function (code, url, message) {
	        return _this.flashPlaybackError(code, url, message);
	      });
	      _componentsMediator2['default'].on(this.cid + ':fragmentloaded', function (loadmetrics) {
	        return _this.onFragmentLoaded(loadmetrics);
	      });
	      _componentsMediator2['default'].once(this.cid + ':manifestloaded', function (duration, loadmetrics) {
	        return _this.manifestLoaded(duration, loadmetrics);
	      });
	    }
	  }, {
	    key: 'stopListening',
	    value: function stopListening() {
	      _get(Object.getPrototypeOf(HLS.prototype), 'stopListening', this).call(this);
	      _componentsMediator2['default'].off(this.cid + ':flashready');
	      _componentsMediator2['default'].off(this.cid + ':timeupdate');
	      _componentsMediator2['default'].off(this.cid + ':playbackstate');
	      _componentsMediator2['default'].off(this.cid + ':levelchanged');
	      _componentsMediator2['default'].off(this.cid + ':playbackerror');
	      _componentsMediator2['default'].off(this.cid + ':fragmentloaded');
	      _componentsMediator2['default'].off(this.cid + ':manifestloaded');
	    }
	  }, {
	    key: 'bootstrap',
	    value: function bootstrap() {
	      var _this2 = this;

	      if (this.el.playerLoad) {
	        this.el.width = "100%";
	        this.el.height = "100%";
	        this.isReady = true;
	        this.srcLoaded = false;
	        this.currentState = "IDLE";
	        this.setFlashSettings();
	        this.updatePlaybackType();
	        if (this.autoPlay || this._shouldPlayOnBootstrap) this.play();
	        this.trigger(_baseEvents2['default'].PLAYBACK_READY, this.name);
	      } else {
	        this._bootstrapAttempts = this._bootstrapAttempts || 0;
	        if (++this._bootstrapAttempts <= MAX_ATTEMPTS) {
	          setTimeout(function () {
	            return _this2.bootstrap();
	          }, 50);
	        } else {
	          this.trigger(_baseEvents2['default'].PLAYBACK_ERROR, { message: "Max number of attempts reached" }, this.name);
	        }
	      }
	    }
	  }, {
	    key: 'setFlashSettings',
	    value: function setFlashSettings() {
	      this.el.playerSetflushLiveURLCache(this.flushLiveURLCache);
	      this.el.playerCapLeveltoStage(this.capLevelToStage);
	      this.el.playerSetmaxBufferLength(this.maxBufferLength);
	      this.el.playerSetUseHardwareVideoDecoder(this.useHardwareVideoDecoder);
	      this.el.playerSetLogInfo(this.hlsLogEnabled);
	      this.el.playerSetSeekMode(this.seekMode);
	      this.el.playerSetStartFromBitrate(this.startFromBitrate);
	      this.el.playerSetstartFromLevel(this.startFromLevel);
	      this.el.playerSetKeyLoadMaxRetry(this.keyLoadMaxRetry);
	      this.el.playerSetKeyLoadMaxRetryTimeout(this.keyLoadMaxRetryTimeout);
	      this.el.playerSetFragmentLoadMaxRetry(this.fragmentLoadMaxRetry);
	      this.el.playerSetFragmentLoadMaxRetryTimeout(this.fragmentLoadMaxRetryTimeout);
	      this.el.playerSetFragmentLoadSkipAfterMaxRetry(this.fragmentLoadSkipAfterMaxRetry);
	      this.el.playerSetCapLevelonFPSDrop(this.capLevelonFpsDrop);
	      this.el.playerSetSmoothAutoSwitchonFPSDrop(this.smoothAutoSwitchonFpsDrop);
	      this.el.playerSetFpsDroppedMonitoringPeriod(this.fpsDroppedMonitoringPeriod);
	      this.el.playerSetFpsDroppedMonitoringThreshold(this.fpsDroppedMonitoringThreshold);
	    }
	  }, {
	    key: 'levelChanged',
	    value: function levelChanged(level) {
	      var currentLevel = this.getLevels()[level];
	      if (currentLevel) {
	        this.highDefinition = currentLevel.height >= 720 || currentLevel.bitrate / 1000 >= 2000;
	        this.trigger(_baseEvents2['default'].PLAYBACK_HIGHDEFINITIONUPDATE);
	        this.trigger(_baseEvents2['default'].PLAYBACK_BITRATE, { bitrate: this.getCurrentBitrate(), level: level });
	      }
	    }
	  }, {
	    key: 'updateTime',
	    value: function updateTime(timeMetrics) {
	      if (this.currentState === 'IDLE') return;

	      var duration = this.normalizeDuration(timeMetrics.duration);
	      var position = Math.min(Math.max(timeMetrics.position, 0), duration);
	      var previousDVRStatus = this.dvrEnabled;
	      var livePlayback = this.playbackType === 'live';
	      this.dvrEnabled = livePlayback && duration > this.hlsMinimumDvrSize;

	      if (duration === 100 || livePlayback === undefined) {
	        return;
	      }

	      if (this.dvrEnabled !== previousDVRStatus) {
	        this.updateSettings();
	        this.trigger(_baseEvents2['default'].PLAYBACK_SETTINGSUPDATE, this.name);
	      }

	      if (livePlayback && (!this.dvrEnabled || !this.dvrInUse)) {
	        position = duration;
	      }

	      this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, position, duration, this.name);
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      if (this.currentState === 'PAUSED') {
	        this.el.playerResume();
	      } else if (!this.srcLoaded && this.currentState !== "PLAYING") {
	        this.firstPlay();
	      } else {
	        this.el.playerPlay();
	      }
	    }
	  }, {
	    key: 'getPlaybackType',
	    value: function getPlaybackType() {
	      return this.playbackType ? this.playbackType : null;
	    }
	  }, {
	    key: 'getCurrentLevelIndex',
	    value: function getCurrentLevelIndex() {
	      return this.el.getCurrentLevel();
	    }
	  }, {
	    key: 'getCurrentLevel',
	    value: function getCurrentLevel() {
	      return this.getLevels()[this.getCurrentLevelIndex()];
	    }
	  }, {
	    key: 'getCurrentBitrate',
	    value: function getCurrentBitrate() {
	      return this.getCurrentLevel().bitrate;
	    }
	  }, {
	    key: 'setCurrentLevel',
	    value: function setCurrentLevel(level) {
	      this.el.playerSetCurrentLevel(level);
	    }
	  }, {
	    key: 'isHighDefinitionInUse',
	    value: function isHighDefinitionInUse() {
	      return this.highDefinition;
	    }
	  }, {
	    key: 'getLevels',
	    value: function getLevels() {
	      this.levels = this.el.getLevels();
	      return this.levels;
	    }
	  }, {
	    key: 'setPlaybackState',
	    value: function setPlaybackState(state) {
	      if (["PLAYING_BUFFERING", "PAUSED_BUFFERING"].indexOf(state) >= 0) {
	        this.trigger(_baseEvents2['default'].PLAYBACK_BUFFERING, this.name);
	        this.updateCurrentState(state);
	      } else if (["PLAYING", "PAUSED"].indexOf(state) >= 0) {
	        if (["PLAYING_BUFFERING", "PAUSED_BUFFERING", "IDLE"].indexOf(this.currentState) >= 0) {
	          this.trigger(_baseEvents2['default'].PLAYBACK_BUFFERFULL, this.name);
	        }
	        this.updateCurrentState(state);
	      } else if (state === "IDLE") {
	        this.updateCurrentState(state);
	        this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, 0, this.el.getDuration(), this.name);
	        this.trigger(_baseEvents2['default'].PLAYBACK_ENDED, this.name);
	      }
	    }
	  }, {
	    key: 'updateCurrentState',
	    value: function updateCurrentState(state) {
	      this.currentState = state;
	      this.updatePlaybackType();
	      if (state === "PLAYING") {
	        this.trigger(_baseEvents2['default'].PLAYBACK_PLAY, this.name);
	      } else if (state === "PAUSED") {
	        this.trigger(_baseEvents2['default'].PLAYBACK_PAUSE, this.name);
	      }
	    }
	  }, {
	    key: 'updatePlaybackType',
	    value: function updatePlaybackType() {
	      this.playbackType = this.el.getType();
	      if (this.playbackType) {
	        this.playbackType = this.playbackType.toLowerCase();
	        if (this.playbackType === 'vod') {
	          this.startReportingProgress();
	        } else {
	          this.stopReportingProgress();
	        }
	      }
	      this.trigger(_baseEvents2['default'].PLAYBACK_PLAYBACKSTATE);
	    }
	  }, {
	    key: 'startReportingProgress',
	    value: function startReportingProgress() {
	      if (!this.reportingProgress) {
	        this.reportingProgress = true;
	      }
	    }
	  }, {
	    key: 'stopReportingProgress',
	    value: function stopReportingProgress() {
	      this.reportingProgress = false;
	    }
	  }, {
	    key: 'onFragmentLoaded',
	    value: function onFragmentLoaded(loadmetrics) {
	      this.trigger(_baseEvents2['default'].PLAYBACK_FRAGMENT_LOADED, loadmetrics);
	      if (this.reportingProgress && this.el.getPosition) {
	        var buffered = this.el.getPosition() + this.el.getbufferLength();
	        this.trigger(_baseEvents2['default'].PLAYBACK_PROGRESS, this.el.getPosition(), buffered, this.el.getDuration(), this.name);
	      }
	    }
	  }, {
	    key: 'firstPlay',
	    value: function firstPlay() {
	      var _this3 = this;

	      if (this.el.playerLoad) {
	        this.setFlashSettings(); //ensure flushLiveURLCache will work (#327)
	        this.el.playerLoad(this.src);
	        _componentsMediator2['default'].once(this.cid + ':manifestloaded', function () {
	          return _this3.el.playerPlay();
	        });
	        this.srcLoaded = true;
	      } else {
	        this._shouldPlayOnBootstrap = true;
	      }
	    }
	  }, {
	    key: 'volume',
	    value: function volume(value) {
	      var _this4 = this;

	      if (this.isReady) {
	        this.el.playerVolume(value);
	      } else {
	        this.listenToOnce(this, _baseEvents2['default'].PLAYBACK_BUFFERFULL, function () {
	          return _this4.volume(value);
	        });
	      }
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      if (this.playbackType !== 'live' || this.dvrEnabled) {
	        this.el.playerPause();
	        if (this.playbackType === 'live' && this.dvrEnabled) {
	          this.updateDvr(true);
	        }
	      }
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.el.playerStop();
	      this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, 0, this.name);
	    }
	  }, {
	    key: 'isPlaying',
	    value: function isPlaying() {
	      if (this.currentState) {
	        return !!this.currentState.match(/playing/i);
	      }
	      return false;
	    }
	  }, {
	    key: 'getDuration',
	    value: function getDuration() {
	      return this.normalizeDuration(this.el.getDuration());
	    }
	  }, {
	    key: 'normalizeDuration',
	    value: function normalizeDuration(duration) {
	      if (this.playbackType === 'live') {
	        // estimate 10 seconds of buffer time for live streams for seek positions
	        duration = duration - 10;
	      }
	      return duration;
	    }
	  }, {
	    key: 'seek',
	    value: function seek(time) {
	      var duration = this.el.getDuration();
	      if (time > 0) {
	        time = duration * time / 100;
	      }

	      if (this.playbackType === 'live') {
	        // seek operations to a time within 5 seconds from live stream will position playhead back to live
	        var dvrInUse = time >= 0 && duration - time > 5;
	        if (!dvrInUse) {
	          time = -1;
	        }
	        this.updateDvr(dvrInUse);
	      }
	      this.el.playerSeek(time);
	      this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, time, duration, this.name);
	      this.trigger(_baseEvents2['default'].PLAYBACK_HIGHDEFINITIONUPDATE);
	    }
	  }, {
	    key: 'updateDvr',
	    value: function updateDvr(dvrInUse) {
	      var previousDvrInUse = !!this.dvrInUse;
	      this.dvrInUse = dvrInUse;
	      if (this.dvrInUse !== previousDvrInUse) {
	        this.updateSettings();
	        this.trigger(_baseEvents2['default'].PLAYBACK_DVR, this.dvrInUse);
	        this.trigger(_baseEvents2['default'].PLAYBACK_STATS_ADD, { 'dvr': this.dvrInUse });
	      }
	    }
	  }, {
	    key: 'flashPlaybackError',
	    value: function flashPlaybackError(code, url, message) {
	      this.trigger(_baseEvents2['default'].PLAYBACK_ERROR, { code: code, url: url, message: message });
	      this.trigger(_baseEvents2['default'].PLAYBACK_STOP);
	    }
	  }, {
	    key: 'manifestLoaded',
	    value: function manifestLoaded(duration, loadmetrics) {
	      this.trigger(_baseEvents2['default'].PLAYBACK_LOADEDMETADATA, duration, loadmetrics);
	    }
	  }, {
	    key: 'timeUpdate',
	    value: function timeUpdate(time, duration) {
	      this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, time, duration, this.name);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.stopListening();
	      this.$el.remove();
	    }
	  }, {
	    key: 'setupFirefox',
	    value: function setupFirefox() {
	      var $el = this.$('embed');
	      $el.attr('data-hls', '');
	      this.setElement($el);
	    }
	  }, {
	    key: 'setupIE',
	    value: function setupIE(swfPath) {
	      this.setElement((0, _clapprZepto2['default'])((0, _baseTemplate2['default'])(objectIE)({ cid: this.cid, swfPath: swfPath, baseUrl: this.baseUrl, playbackId: this.uniqueId, callbackName: 'window.Clappr.flashlsCallbacks.' + this.cid })));
	    }
	  }, {
	    key: 'updateSettings',
	    value: function updateSettings() {
	      this.settings = (0, _lodashAssign2['default'])({}, this.defaultSettings);
	      if (this.playbackType === "vod" || this.dvrInUse) {
	        this.settings.left = ["playpause", "position", "duration"];
	        this.settings.seekEnabled = true;
	      } else if (this.dvrEnabled) {
	        this.settings.left = ["playpause"];
	        this.settings.seekEnabled = true;
	      } else {
	        this.settings.seekEnabled = false;
	      }
	    }
	  }, {
	    key: 'setElement',
	    value: function setElement(element) {
	      this.$el = element;
	      this.el = element[0];
	    }
	  }, {
	    key: 'createCallbacks',
	    value: function createCallbacks() {
	      var _this5 = this;

	      if (!window.Clappr) {
	        window.Clappr = {};
	      }
	      if (!window.Clappr.flashlsCallbacks) {
	        window.Clappr.flashlsCallbacks = {};
	      }
	      this.flashlsEvents = new _flashls_events2['default'](this.cid);
	      window.Clappr.flashlsCallbacks[this.cid] = function (eventName, args) {
	        _this5.flashlsEvents[eventName].apply(_this5.flashlsEvents, args);
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var style = _baseStyler2['default'].getStyleFor(_publicStyleScss2['default']);
	      var swfPath = (0, _baseTemplate2['default'])(_publicHLSPlayerSwf2['default'])({ baseUrl: this.baseUrl });
	      if (_componentsBrowser2['default'].isLegacyIE) {
	        this.setupIE(swfPath);
	      } else {
	        this.createCallbacks();
	        this.$el.html(this.template({ cid: this.cid, swfPath: swfPath, baseUrl: this.baseUrl, playbackId: this.uniqueId, callbackName: 'window.Clappr.flashlsCallbacks.' + this.cid }));
	        if (_componentsBrowser2['default'].isFirefox) {
	          this.setupFirefox();
	        } else if (_componentsBrowser2['default'].isIE) {
	          this.$('embed').remove();
	        }
	      }
	      this.el.id = this.cid;
	      this.$el.append(style);
	      return this;
	    }
	  }]);

	  return HLS;
	})(_basePlayback2['default']);

	exports['default'] = HLS;

	HLS.canPlay = function (resource, mimeType) {
	  var resourceParts = resource.split('?')[0].match(/.*\.(.*)$/) || [];
	  return _componentsBrowser2['default'].hasFlash && (resourceParts.length > 1 && resourceParts[1] == "m3u8" || mimeType === 'application/x-mpegURL' || mimeType === 'application/vnd.apple.mpegurl');
	};
	module.exports = exports['default'];

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, "[data-hls] {\n  position: absolute;\n  display: block;\n  pointer-events: none;\n  top: 0; }\n", ""]);

	// exports


/***/ },
/* 109 */
/***/ function(module, exports) {

	module.exports = "  <param name=\"movie\" value=\"<%= swfPath %>?inline=1\">\n  <param name=\"quality\" value=\"autohigh\">\n  <param name=\"swliveconnect\" value=\"true\">\n  <param name=\"allowScriptAccess\" value=\"always\">\n  <param name=\"bgcolor\" value=\"#001122\">\n  <param name=\"allowFullScreen\" value=\"false\">\n  <param name=\"wmode\" value=\"transparent\">\n  <param name=\"tabindex\" value=\"1\">\n  <param name=FlashVars value=\"playbackId=<%= playbackId %>&callback=<%= callbackName %>\" />\n  <embed\n    name=\"<%= cid %>\"\n    type=\"application/x-shockwave-flash\"\n    tabindex=\"1\"\n    enablecontextmenu=\"false\"\n    allowScriptAccess=\"always\"\n    quality=\"autohigh\"\n    pluginspage=\"http://www.macromedia.com/go/getflashplayer\"\n    wmode=\"transparent\"\n    swliveconnect=\"true\"\n    type=\"application/x-shockwave-flash\"\n    allowfullscreen=\"false\"\n    bgcolor=\"#000000\"\n    FlashVars=\"playbackId=<%= playbackId %>&callback=<%= callbackName %>\"\n    src=\"<%= swfPath %>\"\n    width=\"100%\"\n    height=\"100%\">\n  </embed>\n";

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "96f944f0104ee30b8fce6cffd89e13aa.swf"

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _componentsMediator = __webpack_require__(64);

	var _componentsMediator2 = _interopRequireDefault(_componentsMediator);

	var HLSEvents = (function () {
	  function HLSEvents(instanceId) {
	    _classCallCheck(this, HLSEvents);

	    this.instanceId = instanceId;
	  }

	  _createClass(HLSEvents, [{
	    key: 'ready',
	    value: function ready() {
	      _componentsMediator2['default'].trigger(this.instanceId + ':flashready');
	    }
	  }, {
	    key: 'videoSize',
	    value: function videoSize(width, height) {
	      _componentsMediator2['default'].trigger(this.instanceId + ':videosizechanged', width, height);
	    }
	  }, {
	    key: 'complete',
	    value: function complete() {
	      _componentsMediator2['default'].trigger(this.instanceId + ':complete');
	    }
	  }, {
	    key: 'error',
	    value: function error(code, url, message) {
	      _componentsMediator2['default'].trigger(this.instanceId + ':error', code, url, message);
	    }
	  }, {
	    key: 'manifest',
	    value: function manifest(duration, loadmetrics) {
	      _componentsMediator2['default'].trigger(this.instanceId + ':manifestloaded', duration, loadmetrics);
	    }
	  }, {
	    key: 'audioLevelLoaded',
	    value: function audioLevelLoaded(loadmetrics) {
	      _componentsMediator2['default'].trigger(this.instanceId + ':audiolevelloaded', loadmetrics);
	    }
	  }, {
	    key: 'levelLoaded',
	    value: function levelLoaded(loadmetrics) {
	      _componentsMediator2['default'].trigger(this.instanceId + ':levelloaded', loadmetrics);
	    }
	  }, {
	    key: 'fragmentLoaded',
	    value: function fragmentLoaded(loadmetrics) {
	      _componentsMediator2['default'].trigger(this.instanceId + ':fragmentloaded', loadmetrics);
	    }
	  }, {
	    key: 'fragmentPlaying',
	    value: function fragmentPlaying(playmetrics) {
	      _componentsMediator2['default'].trigger(this.instanceId + ':fragmentplaying', playmetrics);
	    }
	  }, {
	    key: 'position',
	    value: function position(timemetrics) {
	      _componentsMediator2['default'].trigger(this.instanceId + ':timeupdate', timemetrics);
	    }
	  }, {
	    key: 'state',
	    value: function state(newState) {
	      _componentsMediator2['default'].trigger(this.instanceId + ':playbackstate', newState);
	    }
	  }, {
	    key: 'seekState',
	    value: function seekState(newState) {
	      _componentsMediator2['default'].trigger(this.instanceId + ':seekstate', newState);
	    }
	  }, {
	    key: 'switch',
	    value: function _switch(newLevel) {
	      _componentsMediator2['default'].trigger(this.instanceId + ':levelchanged', newLevel);
	    }
	  }, {
	    key: 'audioTracksListChange',
	    value: function audioTracksListChange(trackList) {
	      _componentsMediator2['default'].trigger(this.instanceId + ':audiotracklistchanged', trackList);
	    }
	  }, {
	    key: 'audioTrackChange',
	    value: function audioTrackChange(trackId) {
	      _componentsMediator2['default'].trigger(this.instanceId + ':audiotrackchanged', trackId);
	    }
	  }]);

	  return HLSEvents;
	})();

	exports['default'] = HLSEvents;
	module.exports = exports['default'];

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(113);

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _basePlayback = __webpack_require__(96);

	var _basePlayback2 = _interopRequireDefault(_basePlayback);

	var _publicStyleScss = __webpack_require__(114);

	var _publicStyleScss2 = _interopRequireDefault(_publicStyleScss);

	var _baseStyler = __webpack_require__(34);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var HTMLImg = (function (_Playback) {
	  _inherits(HTMLImg, _Playback);

	  _createClass(HTMLImg, [{
	    key: 'getPlaybackType',
	    value: function getPlaybackType() {
	      return null;
	    }
	  }, {
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
	  }]);

	  function HTMLImg(params) {
	    _classCallCheck(this, HTMLImg);

	    _get(Object.getPrototypeOf(HTMLImg.prototype), 'constructor', this).call(this, params);
	    this.el.src = params.src;
	  }

	  _createClass(HTMLImg, [{
	    key: 'render',
	    value: function render() {
	      var style = _baseStyler2['default'].getStyleFor(_publicStyleScss2['default']);
	      this.$el.append(style);
	      return this;
	    }
	  }]);

	  return HTMLImg;
	})(_basePlayback2['default']);

	exports['default'] = HTMLImg;

	HTMLImg.canPlay = function (resource) {
	  return !!resource.match(/(.*).(png|jpg|jpeg|gif|bmp)/);
	};
	module.exports = exports['default'];

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, "[data-html-img] {\n  max-width: 100%;\n  max-height: 100%; }\n", ""]);

	// exports


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(116);

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUtils = __webpack_require__(2);

	var _basePlayback = __webpack_require__(96);

	var _basePlayback2 = _interopRequireDefault(_basePlayback);

	var _baseTemplate = __webpack_require__(35);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _baseStyler = __webpack_require__(34);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _publicStyleScss = __webpack_require__(117);

	var _publicStyleScss2 = _interopRequireDefault(_publicStyleScss);

	var _publicErrorHtml = __webpack_require__(118);

	var _publicErrorHtml2 = _interopRequireDefault(_publicErrorHtml);

	var NoOp = (function (_Playback) {
	  _inherits(NoOp, _Playback);

	  _createClass(NoOp, [{
	    key: 'name',
	    get: function get() {
	      return 'no_op';
	    }
	  }, {
	    key: 'template',
	    get: function get() {
	      return (0, _baseTemplate2['default'])(_publicErrorHtml2['default']);
	    }
	  }, {
	    key: 'attributes',
	    get: function get() {
	      return { 'data-no-op': '' };
	    }
	  }]);

	  function NoOp(options) {
	    _classCallCheck(this, NoOp);

	    _get(Object.getPrototypeOf(NoOp.prototype), 'constructor', this).call(this, options);
	  }

	  _createClass(NoOp, [{
	    key: 'render',
	    value: function render() {
	      var style = _baseStyler2['default'].getStyleFor(_publicStyleScss2['default']);
	      this.$el.html(this.template());
	      this.$el.append(style);
	      this.animate();
	      this.trigger(_baseEvents2['default'].PLAYBACK_READY, this.name);
	      return this;
	    }
	  }, {
	    key: 'noise',
	    value: function noise() {
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
	    }
	  }, {
	    key: 'loop',
	    value: function loop() {
	      var _this = this;

	      this.noise();
	      (0, _baseUtils.requestAnimationFrame)(function () {
	        return _this.loop();
	      });
	    }
	  }, {
	    key: 'animate',
	    value: function animate() {
	      this.canvas = this.$el.find('canvas[data-no-op-canvas]')[0];
	      this.context = this.canvas.getContext('2d');
	      this.loop();
	    }
	  }]);

	  return NoOp;
	})(_basePlayback2['default']);

	exports['default'] = NoOp;

	NoOp.canPlay = function (source) {
	  return true;
	};
	module.exports = exports['default'];

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, "[data-no-op] {\n  z-index: 1000;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  text-align: center; }\n\n[data-no-op] p[data-no-op-msg] {\n  position: absolute;\n  font-size: 25px;\n  top: 40%;\n  color: white; }\n\n[data-no-op] canvas[data-no-op-canvas] {\n  background-color: #777;\n  height: 100%;\n  width: 100%; }\n", ""]);

	// exports


/***/ },
/* 118 */
/***/ function(module, exports) {

	module.exports = "<canvas data-no-op-canvas></canvas>\n<p data-no-op-msg>Your browser does not support the playback of this video. Try to use a different browser.<p>\n";

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(120);

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUi_container_plugin = __webpack_require__(121);

	var _baseUi_container_plugin2 = _interopRequireDefault(_baseUi_container_plugin);

	var _baseStyler = __webpack_require__(34);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _baseTemplate = __webpack_require__(35);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _publicSpinnerHtml = __webpack_require__(122);

	var _publicSpinnerHtml2 = _interopRequireDefault(_publicSpinnerHtml);

	var _publicSpinnerScss = __webpack_require__(123);

	var _publicSpinnerScss2 = _interopRequireDefault(_publicSpinnerScss);

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var SpinnerThreeBouncePlugin = (function (_UIContainerPlugin) {
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

	  function SpinnerThreeBouncePlugin(options) {
	    _classCallCheck(this, SpinnerThreeBouncePlugin);

	    _get(Object.getPrototypeOf(SpinnerThreeBouncePlugin.prototype), 'constructor', this).call(this, options);
	    this.template = (0, _baseTemplate2['default'])(_publicSpinnerHtml2['default']);
	    this.listenTo(this.container, _baseEvents2['default'].CONTAINER_STATE_BUFFERING, this.onBuffering);
	    this.listenTo(this.container, _baseEvents2['default'].CONTAINER_STATE_BUFFERFULL, this.onBufferFull);
	    this.listenTo(this.container, _baseEvents2['default'].CONTAINER_STOP, this.onStop);
	    this.listenTo(this.container, _baseEvents2['default'].CONTAINER_ERROR, this.onStop);
	    this.render();
	  }

	  _createClass(SpinnerThreeBouncePlugin, [{
	    key: 'onBuffering',
	    value: function onBuffering() {
	      var _this = this;

	      this.showTimeout = setTimeout(function () {
	        return _this.$el.show();
	      }, 300);
	    }
	  }, {
	    key: 'onBufferFull',
	    value: function onBufferFull() {
	      clearTimeout(this.showTimeout);
	      this.$el.hide();
	    }
	  }, {
	    key: 'onStop',
	    value: function onStop() {
	      this.$el.hide();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.$el.html(this.template());
	      var style = _baseStyler2['default'].getStyleFor(_publicSpinnerScss2['default']);
	      this.container.$el.append(style);
	      this.container.$el.append(this.$el);
	      this.$el.hide();
	      return this;
	    }
	  }]);

	  return SpinnerThreeBouncePlugin;
	})(_baseUi_container_plugin2['default']);

	exports['default'] = SpinnerThreeBouncePlugin;
	module.exports = exports['default'];

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utils = __webpack_require__(2);

	var _ui_object = __webpack_require__(27);

	var _ui_object2 = _interopRequireDefault(_ui_object);

	var UIContainerPlugin = (function (_UIObject) {
	  _inherits(UIContainerPlugin, _UIObject);

	  function UIContainerPlugin(options) {
	    _classCallCheck(this, UIContainerPlugin);

	    _get(Object.getPrototypeOf(UIContainerPlugin.prototype), 'constructor', this).call(this, options);
	    this.container = options.container;
	    this.options = options;
	    this.enabled = true;
	    this.bindEvents();
	  }

	  _createClass(UIContainerPlugin, [{
	    key: 'enable',
	    value: function enable() {
	      if (!this.enabled) {
	        this.bindEvents();
	        this.$el.show();
	        this.enabled = true;
	      }
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      this.stopListening();
	      this.$el.hide();
	      this.enabled = false;
	    }
	  }, {
	    key: 'bindEvents',
	    value: function bindEvents() {}
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.remove();
	    }
	  }]);

	  return UIContainerPlugin;
	})(_ui_object2['default']);

	exports['default'] = UIContainerPlugin;

	UIContainerPlugin.extend = function (properties) {
	  return (0, _utils.extend)(UIContainerPlugin, properties);
	};
	module.exports = exports['default'];

/***/ },
/* 122 */
/***/ function(module, exports) {

	module.exports = "<div data-bounce1></div><div data-bounce2></div><div data-bounce3></div>\n";

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, ".spinner-three-bounce[data-spinner] {\n  position: absolute;\n  margin: 0 auto;\n  width: 70px;\n  text-align: center;\n  z-index: 999;\n  top: 47%;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto; }\n  .spinner-three-bounce[data-spinner] > div {\n    width: 18px;\n    height: 18px;\n    background-color: #FFFFFF;\n    border-radius: 100%;\n    display: inline-block;\n    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;\n    -moz-animation: bouncedelay 1.4s infinite ease-in-out;\n    -ms-animation: bouncedelay 1.4s infinite ease-in-out;\n    -o-animation: bouncedelay 1.4s infinite ease-in-out;\n    animation: bouncedelay 1.4s infinite ease-in-out;\n    /* Prevent first frame from flickering when animation starts */\n    -webkit-animation-fill-mode: both;\n    -moz-animation-fill-mode: both;\n    -ms-animation-fill-mode: both;\n    -o-animation-fill-mode: both;\n    animation-fill-mode: both; }\n  .spinner-three-bounce[data-spinner] [data-bounce1] {\n    -webkit-animation-delay: -0.32s;\n    -moz-animation-delay: -0.32s;\n    -ms-animation-delay: -0.32s;\n    -o-animation-delay: -0.32s;\n    animation-delay: -0.32s; }\n  .spinner-three-bounce[data-spinner] [data-bounce2] {\n    -webkit-animation-delay: -0.16s;\n    -moz-animation-delay: -0.16s;\n    -ms-animation-delay: -0.16s;\n    -o-animation-delay: -0.16s;\n    animation-delay: -0.16s; }\n\n@-moz-keyframes bouncedelay {\n  0%, 80%, 100% {\n    -moz-transform: scale(0);\n    transform: scale(0); }\n\n  40% {\n    -moz-transform: scale(1);\n    transform: scale(1); } }\n\n@-webkit-keyframes bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    transform: scale(0); }\n\n  40% {\n    -webkit-transform: scale(1);\n    transform: scale(1); } }\n\n@-o-keyframes bouncedelay {\n  0%, 80%, 100% {\n    -o-transform: scale(0);\n    transform: scale(0); }\n\n  40% {\n    -o-transform: scale(1);\n    transform: scale(1); } }\n\n@-ms-keyframes bouncedelay {\n  0%, 80%, 100% {\n    -ms-transform: scale(0);\n    transform: scale(0); }\n\n  40% {\n    -ms-transform: scale(1);\n    transform: scale(1); } }\n\n@keyframes bouncedelay {\n  0%, 80%, 100% {\n    transform: scale(0); }\n\n  40% {\n    transform: scale(1); } }\n", ""]);

	// exports


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(125);

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseContainer_plugin = __webpack_require__(126);

	var _baseContainer_plugin2 = _interopRequireDefault(_baseContainer_plugin);

	var _clapprZepto = __webpack_require__(26);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var StatsPlugin = (function (_ContainerPlugin) {
	  _inherits(StatsPlugin, _ContainerPlugin);

	  _createClass(StatsPlugin, [{
	    key: 'name',
	    get: function get() {
	      return 'stats';
	    }
	  }]);

	  function StatsPlugin(options) {
	    _classCallCheck(this, StatsPlugin);

	    _get(Object.getPrototypeOf(StatsPlugin.prototype), 'constructor', this).call(this, options);
	    this.setInitialAttrs();
	    this.reportInterval = options.reportInterval || 5000;
	    this.state = "IDLE";
	  }

	  _createClass(StatsPlugin, [{
	    key: 'bindEvents',
	    value: function bindEvents() {
	      this.listenTo(this.container.playback, _baseEvents2['default'].PLAYBACK_PLAY, this.onPlay);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_STOP, this.onStop);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_DESTROYED, this.onStop);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_STATE_BUFFERING, this.onBuffering);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_STATE_BUFFERFULL, this.onBufferFull);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_STATS_ADD, this.onStatsAdd);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_BITRATE, this.onStatsAdd);
	      this.listenTo(this.container.playback, _baseEvents2['default'].PLAYBACK_STATS_ADD, this.onStatsAdd);
	    }
	  }, {
	    key: 'setInitialAttrs',
	    value: function setInitialAttrs() {
	      this.firstPlay = true;
	      this.startupTime = 0;
	      this.rebufferingTime = 0;
	      this.watchingTime = 0;
	      this.rebuffers = 0;
	      this.externalMetrics = {};
	    }
	  }, {
	    key: 'onPlay',
	    value: function onPlay() {
	      this.state = "PLAYING";
	      this.watchingTimeInit = Date.now();
	      if (!this.intervalId) {
	        this.intervalId = setInterval(this.report.bind(this), this.reportInterval);
	      }
	    }
	  }, {
	    key: 'onStop',
	    value: function onStop() {
	      clearInterval(this.intervalId);
	      this.intervalId = undefined;
	      this.state = "STOPPED";
	    }
	  }, {
	    key: 'onBuffering',
	    value: function onBuffering() {
	      if (this.firstPlay) {
	        this.startupTimeInit = Date.now();
	      } else {
	        this.rebufferingTimeInit = Date.now();
	      }
	      this.state = "BUFFERING";
	      this.rebuffers++;
	    }
	  }, {
	    key: 'onBufferFull',
	    value: function onBufferFull() {
	      if (this.firstPlay && !!this.startupTimeInit) {
	        this.firstPlay = false;
	        this.startupTime = Date.now() - this.startupTimeInit;
	        this.watchingTimeInit = Date.now();
	      } else if (!!this.rebufferingTimeInit) {
	        this.rebufferingTime += this.getRebufferingTime();
	      }
	      this.rebufferingTimeInit = undefined;
	      this.state = "PLAYING";
	    }
	  }, {
	    key: 'getRebufferingTime',
	    value: function getRebufferingTime() {
	      return Date.now() - this.rebufferingTimeInit;
	    }
	  }, {
	    key: 'getWatchingTime',
	    value: function getWatchingTime() {
	      var totalTime = Date.now() - this.watchingTimeInit;
	      return totalTime - this.rebufferingTime;
	    }
	  }, {
	    key: 'isRebuffering',
	    value: function isRebuffering() {
	      return !!this.rebufferingTimeInit;
	    }
	  }, {
	    key: 'onStatsAdd',
	    value: function onStatsAdd(metric) {
	      _clapprZepto2['default'].extend(this.externalMetrics, metric);
	    }
	  }, {
	    key: 'getStats',
	    value: function getStats() {
	      var metrics = {
	        startupTime: this.startupTime,
	        rebuffers: this.rebuffers,
	        rebufferingTime: this.isRebuffering() ? this.rebufferingTime + this.getRebufferingTime() : this.rebufferingTime,
	        watchingTime: this.isRebuffering() ? this.getWatchingTime() - this.getRebufferingTime() : this.getWatchingTime()
	      };
	      _clapprZepto2['default'].extend(metrics, this.externalMetrics);
	      return metrics;
	    }
	  }, {
	    key: 'report',
	    value: function report() {
	      this.container.statsReport(this.getStats());
	    }
	  }]);

	  return StatsPlugin;
	})(_baseContainer_plugin2['default']);

	exports['default'] = StatsPlugin;
	module.exports = exports['default'];

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _base_object = __webpack_require__(15);

	var _base_object2 = _interopRequireDefault(_base_object);

	var _utils = __webpack_require__(2);

	var ContainerPlugin = (function (_BaseObject) {
	  _inherits(ContainerPlugin, _BaseObject);

	  function ContainerPlugin(options) {
	    _classCallCheck(this, ContainerPlugin);

	    _get(Object.getPrototypeOf(ContainerPlugin.prototype), 'constructor', this).call(this, options);
	    this.container = options.container;
	    this.options = options;
	    this.enabled = true;
	    this.bindEvents();
	  }

	  _createClass(ContainerPlugin, [{
	    key: 'enable',
	    value: function enable() {
	      if (!this.enabled) {
	        this.bindEvents();
	        this.enabled = true;
	      }
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      if (this.enabled) {
	        this.stopListening();
	        this.enabled = false;
	      }
	    }
	  }, {
	    key: 'bindEvents',
	    value: function bindEvents() {}
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.stopListening();
	    }
	  }]);

	  return ContainerPlugin;
	})(_base_object2['default']);

	exports['default'] = ContainerPlugin;

	ContainerPlugin.extend = function (properties) {
	  return (0, _utils.extend)(ContainerPlugin, properties);
	};
	module.exports = exports['default'];

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(128);

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUi_container_plugin = __webpack_require__(121);

	var _baseUi_container_plugin2 = _interopRequireDefault(_baseUi_container_plugin);

	var _baseStyler = __webpack_require__(34);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _publicWatermarkScss = __webpack_require__(129);

	var _publicWatermarkScss2 = _interopRequireDefault(_publicWatermarkScss);

	var _publicWatermarkHtml = __webpack_require__(130);

	var _publicWatermarkHtml2 = _interopRequireDefault(_publicWatermarkHtml);

	var _baseTemplate = __webpack_require__(35);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var WaterMarkPlugin = (function (_UIContainerPlugin) {
	  _inherits(WaterMarkPlugin, _UIContainerPlugin);

	  _createClass(WaterMarkPlugin, [{
	    key: 'name',
	    get: function get() {
	      return 'watermark';
	    }
	  }, {
	    key: 'template',
	    get: function get() {
	      return (0, _baseTemplate2['default'])(_publicWatermarkHtml2['default']);
	    }
	  }]);

	  function WaterMarkPlugin(options) {
	    _classCallCheck(this, WaterMarkPlugin);

	    _get(Object.getPrototypeOf(WaterMarkPlugin.prototype), 'constructor', this).call(this, options);
	    this.position = options.position || "bottom-right";
	    if (options.watermark) {
	      this.imageUrl = options.watermark;
	      this.render();
	    } else {
	      this.$el.remove();
	    }
	  }

	  _createClass(WaterMarkPlugin, [{
	    key: 'bindEvents',
	    value: function bindEvents() {
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_PLAY, this.onPlay);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_STOP, this.onStop);
	    }
	  }, {
	    key: 'onPlay',
	    value: function onPlay() {
	      if (!this.hidden) this.$el.show();
	    }
	  }, {
	    key: 'onStop',
	    value: function onStop() {
	      this.$el.hide();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.$el.hide();
	      var templateOptions = { position: this.position, imageUrl: this.imageUrl };
	      this.$el.html(this.template(templateOptions));
	      var style = _baseStyler2['default'].getStyleFor(_publicWatermarkScss2['default']);
	      this.container.$el.append(style);
	      this.container.$el.append(this.$el);
	      return this;
	    }
	  }]);

	  return WaterMarkPlugin;
	})(_baseUi_container_plugin2['default']);

	exports['default'] = WaterMarkPlugin;
	module.exports = exports['default'];

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, "[data-watermark] {\n  position: absolute;\n  min-width: 70px;\n  max-width: 200px;\n  width: 12%;\n  text-align: center;\n  z-index: 10; }\n\n[data-watermark] img {\n  max-width: 100%; }\n\n[data-watermark-bottom-left] {\n  bottom: 10px;\n  left: 10px; }\n\n[data-watermark-bottom-right] {\n  bottom: 10px;\n  right: 42px; }\n\n[data-watermark-top-left] {\n  top: 10px;\n  left: 10px; }\n\n[data-watermark-top-right] {\n  top: 10px;\n  right: 37px; }\n", ""]);

	// exports


/***/ },
/* 130 */
/***/ function(module, exports) {

	module.exports = "<div data-watermark data-watermark-<%=position %>><img src=\"<%= imageUrl %>\"></div>\n";

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(132);

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	//Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUi_container_plugin = __webpack_require__(121);

	var _baseUi_container_plugin2 = _interopRequireDefault(_baseUi_container_plugin);

	var _baseStyler = __webpack_require__(34);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _publicPosterScss = __webpack_require__(133);

	var _publicPosterScss2 = _interopRequireDefault(_publicPosterScss);

	var _publicPosterHtml = __webpack_require__(134);

	var _publicPosterHtml2 = _interopRequireDefault(_publicPosterHtml);

	var _baseTemplate = __webpack_require__(35);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _componentsMediator = __webpack_require__(64);

	var _componentsMediator2 = _interopRequireDefault(_componentsMediator);

	var _clapprZepto = __webpack_require__(26);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var PosterPlugin = (function (_UIContainerPlugin) {
	  _inherits(PosterPlugin, _UIContainerPlugin);

	  _createClass(PosterPlugin, [{
	    key: 'name',
	    get: function get() {
	      return 'poster';
	    }
	  }, {
	    key: 'template',
	    get: function get() {
	      return (0, _baseTemplate2['default'])(_publicPosterHtml2['default']);
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

	  function PosterPlugin(options) {
	    _classCallCheck(this, PosterPlugin);

	    _get(Object.getPrototypeOf(PosterPlugin.prototype), 'constructor', this).call(this, options);
	    this.options = options;
	    this.container.disableMediaControl();
	    this.render();
	    this.bufferFull = false;
	  }

	  _createClass(PosterPlugin, [{
	    key: 'load',
	    value: function load(source) {
	      this.options.poster = source;
	      this.render();
	    }
	  }, {
	    key: 'bindEvents',
	    value: function bindEvents() {
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_STATE_BUFFERING, this.onBuffering);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_STATE_BUFFERFULL, this.onBufferfull);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_STOP, this.onStop);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_PLAY, this.onPlay);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_ENDED, this.onStop);
	      _componentsMediator2['default'].on(this.options.playerId + ':' + _baseEvents2['default'].PLAYER_RESIZE, this.updateSize, this);
	    }
	  }, {
	    key: 'stopListening',
	    value: function stopListening() {
	      _get(Object.getPrototypeOf(PosterPlugin.prototype), 'stopListening', this).call(this);
	      _componentsMediator2['default'].off(this.options.playerId + ':' + _baseEvents2['default'].PLAYER_RESIZE, this.updateSize, this);
	    }
	  }, {
	    key: 'onBuffering',
	    value: function onBuffering() {
	      this.bufferFull = false;
	      this.hidePlayButton();
	    }
	  }, {
	    key: 'onPlay',
	    value: function onPlay() {
	      if (this.bufferFull) {
	        this.$el.hide();
	        this.container.enableMediaControl();
	      }
	    }
	  }, {
	    key: 'onBufferfull',
	    value: function onBufferfull() {
	      this.bufferFull = true;
	      if (this.container.playback.name === 'html5_video' && !this.container.isPlaying()) return;
	      this.$el.hide();
	      this.container.enableMediaControl();
	    }
	  }, {
	    key: 'onStop',
	    value: function onStop() {
	      this.$el.show();
	      this.container.disableMediaControl();
	      this.showPlayButton();
	    }
	  }, {
	    key: 'showPlayButton',
	    value: function showPlayButton() {
	      this.$playButton.show();
	      this.updateSize();
	    }
	  }, {
	    key: 'hidePlayButton',
	    value: function hidePlayButton() {
	      this.$playButton.hide();
	    }
	  }, {
	    key: 'clicked',
	    value: function clicked() {
	      if (!this.options.chromeless) {
	        this.container.play();
	        this.hidePlayButton();
	      }
	      return false;
	    }
	  }, {
	    key: 'updateSize',
	    value: function updateSize() {
	      if (this.container.playback.name === 'html_img') return;
	      var height = this.$el.height();
	      this.$el.css({ fontSize: height });
	      if (this.$playWrapper.is(':visible')) {
	        this.$playWrapper.css({ marginTop: -(this.$playWrapper.height() / 2) });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;

	      if (this.container.playback.name === 'html_img') return;
	      var style = _baseStyler2['default'].getStyleFor(_publicPosterScss2['default'], { baseUrl: this.options.baseUrl });
	      this.$el.html(this.template());
	      this.$el.append(style);
	      if (this.options.poster) {
	        var imgEl = (0, _clapprZepto2['default'])('<div data-poster class="poster-background"></div>');
	        imgEl.css({ 'background-image': 'url(' + this.options.poster + ')' });
	        this.$el.prepend(imgEl);
	      }
	      this.container.$el.append(this.el);
	      this.$playButton = this.$el.find('.poster-icon');
	      this.$playWrapper = this.$el.find('.play-wrapper');
	      setTimeout(function () {
	        return _this.updateSize();
	      }, 0);
	      if (this.options.chromeless) {
	        this.hidePlayButton();
	        this.$el.css({ 'cursor': 'initial' });
	      }
	      return this;
	    }
	  }]);

	  return PosterPlugin;
	})(_baseUi_container_plugin2['default']);

	exports['default'] = PosterPlugin;
	module.exports = exports['default'];

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, "@font-face {\n  font-family: \"Player\";\n  src: url(" + __webpack_require__(67) + ");\n  src: url(" + __webpack_require__(67) + "?#iefix) format(\"embedded-opentype\"), url(" + __webpack_require__(68) + ") format(\"truetype\"), url(" + __webpack_require__(69) + "#player) format(\"svg\"); }\n\n.player-poster[data-poster] {\n  cursor: pointer;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  z-index: 998;\n  top: 0;\n  left: 0; }\n  .player-poster[data-poster] .poster-background[data-poster] {\n    width: 100%;\n    height: 100%;\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-position: 50% 50%; }\n  .player-poster[data-poster] .play-wrapper[data-poster] {\n    position: absolute;\n    width: 100%;\n    height: 25%;\n    line-height: 100%;\n    font-size: 25%;\n    top: 50%;\n    text-align: center; }\n    .player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster] {\n      font-family: \"Player\";\n      font-weight: normal;\n      font-style: normal;\n      line-height: 1;\n      letter-spacing: 0;\n      speak: none;\n      color: white;\n      opacity: 0.75;\n      -webkit-font-smoothing: antialiased;\n      -moz-osx-font-smoothing: grayscale;\n      -webkit-transition: opacity text-shadow 0.1s;\n      -webkit-transition-delay: ease;\n      -moz-transition: opacity text-shadow 0.1s ease;\n      -o-transition: opacity text-shadow 0.1s ease;\n      transition: opacity text-shadow 0.1s ease; }\n      .player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster].play[data-poster]:before {\n        content: \"\\E001\"; }\n      .player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster]:hover {\n        opacity: 1.0;\n        text-shadow: rgba(255, 255, 255, 0.8) 0 0 15px; }\n", ""]);

	// exports


/***/ },
/* 134 */
/***/ function(module, exports) {

	module.exports = "<div class=\"play-wrapper\" data-poster>\n  <span class=\"poster-icon play\" data-poster />\n</div>\n";

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(136);

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseContainer_plugin = __webpack_require__(126);

	var _baseContainer_plugin2 = _interopRequireDefault(_baseContainer_plugin);

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var GoogleAnalytics = (function (_ContainerPlugin) {
	  _inherits(GoogleAnalytics, _ContainerPlugin);

	  _createClass(GoogleAnalytics, [{
	    key: 'name',
	    get: function get() {
	      return 'google_analytics';
	    }
	  }]);

	  function GoogleAnalytics(options) {
	    _classCallCheck(this, GoogleAnalytics);

	    _get(Object.getPrototypeOf(GoogleAnalytics.prototype), 'constructor', this).call(this, options);
	    if (options.gaAccount) {
	      this.account = options.gaAccount;
	      this.trackerName = options.gaTrackerName ? options.gaTrackerName + "." : 'Clappr.';
	      this.domainName = options.gaDomainName;
	      this.currentHDState = undefined;
	      this.embedScript();
	    }
	  }

	  _createClass(GoogleAnalytics, [{
	    key: 'embedScript',
	    value: function embedScript() {
	      var _this = this;

	      if (!window._gat) {
	        var script = document.createElement('script');
	        script.setAttribute("type", "text/javascript");
	        script.setAttribute("async", "async");
	        script.setAttribute("src", "//www.google-analytics.com/ga.js");
	        script.onload = function () {
	          return _this.addEventListeners();
	        };
	        document.body.appendChild(script);
	      } else {
	        this.addEventListeners();
	      }
	    }
	  }, {
	    key: 'addEventListeners',
	    value: function addEventListeners() {
	      var _this2 = this;

	      if (this.container) {
	        this.listenTo(this.container, _baseEvents2['default'].CONTAINER_PLAY, this.onPlay);
	        this.listenTo(this.container, _baseEvents2['default'].CONTAINER_STOP, this.onStop);
	        this.listenTo(this.container, _baseEvents2['default'].CONTAINER_PAUSE, this.onPause);
	        this.listenTo(this.container, _baseEvents2['default'].CONTAINER_ENDED, this.onEnded);
	        this.listenTo(this.container, _baseEvents2['default'].CONTAINER_STATE_BUFFERING, this.onBuffering);
	        this.listenTo(this.container, _baseEvents2['default'].CONTAINER_STATE_BUFFERFULL, this.onBufferFull);
	        this.listenTo(this.container, _baseEvents2['default'].CONTAINER_ENDED, this.onEnded);
	        this.listenTo(this.container, _baseEvents2['default'].CONTAINER_ERROR, this.onError);
	        this.listenTo(this.container, _baseEvents2['default'].CONTAINER_PLAYBACKSTATE, this.onPlaybackChanged);
	        this.listenTo(this.container, _baseEvents2['default'].CONTAINER_VOLUME, function (event) {
	          return _this2.onVolumeChanged(event);
	        });
	        this.listenTo(this.container, _baseEvents2['default'].CONTAINER_SEEK, function (event) {
	          return _this2.onSeek(event);
	        });
	        this.listenTo(this.container, _baseEvents2['default'].CONTAINER_FULL_SCREEN, this.onFullscreen);
	        this.listenTo(this.container, _baseEvents2['default'].CONTAINER_HIGHDEFINITIONUPDATE, this.onHD);
	        this.listenTo(this.container, _baseEvents2['default'].CONTAINER_PLAYBACKDVRSTATECHANGED, this.onDVR);
	      }
	      _gaq.push([this.trackerName + '_setAccount', this.account]);
	      if (!!this.domainName) _gaq.push([this.trackerName + '_setDomainName', this.domainName]);
	    }
	  }, {
	    key: 'onPlay',
	    value: function onPlay() {
	      this.push(["Video", "Play", this.container.playback.src]);
	    }
	  }, {
	    key: 'onStop',
	    value: function onStop() {
	      this.push(["Video", "Stop", this.container.playback.src]);
	    }
	  }, {
	    key: 'onEnded',
	    value: function onEnded() {
	      this.push(["Video", "Ended", this.container.playback.src]);
	    }
	  }, {
	    key: 'onBuffering',
	    value: function onBuffering() {
	      this.push(["Video", "Buffering", this.container.playback.src]);
	    }
	  }, {
	    key: 'onBufferFull',
	    value: function onBufferFull() {
	      this.push(["Video", "Bufferfull", this.container.playback.src]);
	    }
	  }, {
	    key: 'onError',
	    value: function onError() {
	      this.push(["Video", "Error", this.container.playback.src]);
	    }
	  }, {
	    key: 'onHD',
	    value: function onHD() {
	      var status = this.container.isHighDefinitionInUse() ? "ON" : "OFF";
	      if (status !== this.currentHDState) {
	        this.currentHDState = status;
	        this.push(["Video", "HD - " + status, this.container.playback.src]);
	      }
	    }
	  }, {
	    key: 'onPlaybackChanged',
	    value: function onPlaybackChanged() {
	      var type = this.container.getPlaybackType();
	      if (type !== null) {
	        this.push(["Video", "Playback Type - " + type, this.container.playback.src]);
	      }
	    }
	  }, {
	    key: 'onDVR',
	    value: function onDVR(dvrInUse) {
	      var status = dvrInUse ? "ON" : "OFF";
	      this.push(["Interaction", "DVR - " + status, this.container.playback.src]);
	    }
	  }, {
	    key: 'onPause',
	    value: function onPause() {
	      this.push(["Video", "Pause", this.container.playback.src]);
	    }
	  }, {
	    key: 'onSeek',
	    value: function onSeek() {
	      this.push(["Video", "Seek", this.container.playback.src]);
	    }
	  }, {
	    key: 'onVolumeChanged',
	    value: function onVolumeChanged() {
	      this.push(["Interaction", "Volume", this.container.playback.src]);
	    }
	  }, {
	    key: 'onFullscreen',
	    value: function onFullscreen() {
	      this.push(["Interaction", "Fullscreen", this.container.playback.src]);
	    }
	  }, {
	    key: 'push',
	    value: function push(array) {
	      var res = [this.trackerName + "_trackEvent"].concat(array);
	      _gaq.push(res);
	    }
	  }]);

	  return GoogleAnalytics;
	})(_baseContainer_plugin2['default']);

	exports['default'] = GoogleAnalytics;
	module.exports = exports['default'];

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(138);

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	//Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseContainer_plugin = __webpack_require__(126);

	var _baseContainer_plugin2 = _interopRequireDefault(_baseContainer_plugin);

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _componentsBrowser = __webpack_require__(14);

	var _componentsBrowser2 = _interopRequireDefault(_componentsBrowser);

	var ClickToPausePlugin = (function (_ContainerPlugin) {
	  _inherits(ClickToPausePlugin, _ContainerPlugin);

	  _createClass(ClickToPausePlugin, [{
	    key: 'name',
	    get: function get() {
	      return 'click_to_pause';
	    }
	  }]);

	  function ClickToPausePlugin(options) {
	    _classCallCheck(this, ClickToPausePlugin);

	    _get(Object.getPrototypeOf(ClickToPausePlugin.prototype), 'constructor', this).call(this, options);
	  }

	  _createClass(ClickToPausePlugin, [{
	    key: 'bindEvents',
	    value: function bindEvents() {
	      if (!this.options.chromeless && !_componentsBrowser2['default'].isMobile) {
	        this.listenTo(this.container, _baseEvents2['default'].CONTAINER_CLICK, this.click);
	        this.listenTo(this.container, _baseEvents2['default'].CONTAINER_SETTINGSUPDATE, this.settingsUpdate);
	      }
	    }
	  }, {
	    key: 'click',
	    value: function click() {
	      if (this.container.getPlaybackType() !== 'live' || this.container.isDvrEnabled()) {
	        if (this.container.isPlaying()) {
	          this.container.pause();
	        } else {
	          this.container.play();
	        }
	      }
	    }
	  }, {
	    key: 'settingsUpdate',
	    value: function settingsUpdate() {
	      this.container.$el.removeClass('pointer-enabled');
	      if (this.container.getPlaybackType() !== 'live' || this.container.isDvrEnabled()) {
	        this.container.$el.addClass('pointer-enabled');
	      }
	    }
	  }]);

	  return ClickToPausePlugin;
	})(_baseContainer_plugin2['default']);

	exports['default'] = ClickToPausePlugin;
	module.exports = exports['default'];

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(140);

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUi_core_plugin = __webpack_require__(141);

	var _baseUi_core_plugin2 = _interopRequireDefault(_baseUi_core_plugin);

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _baseStyler = __webpack_require__(34);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _chromecast_playback = __webpack_require__(142);

	var _chromecast_playback2 = _interopRequireDefault(_chromecast_playback);

	var _publicStyleScss = __webpack_require__(144);

	var _publicStyleScss2 = _interopRequireDefault(_publicStyleScss);

	var _lodashAssign = __webpack_require__(3);

	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);

	var _componentsBrowser = __webpack_require__(14);

	var _componentsBrowser2 = _interopRequireDefault(_componentsBrowser);

	var DEVICE_STATE = {
	  'IDLE': 0,
	  'ACTIVE': 1,
	  'WARNING': 2,
	  'ERROR': 3
	};

	var DEFAULT_CLAPPR_APP_ID = '9DFB77C0';

	var Chromecast = (function (_UICorePlugin) {
	  _inherits(Chromecast, _UICorePlugin);

	  _createClass(Chromecast, [{
	    key: 'name',
	    get: function get() {
	      return 'chromecast';
	    }
	  }, {
	    key: 'tagName',
	    get: function get() {
	      return 'button';
	    }
	  }, {
	    key: 'attributes',
	    get: function get() {
	      return {
	        'class': 'chromecast-button chromecast-icon icon-cast'
	      };
	    }
	  }]);

	  function Chromecast(core) {
	    _classCallCheck(this, Chromecast);

	    _get(Object.getPrototypeOf(Chromecast.prototype), 'constructor', this).call(this, core);
	    core.options.enableChromecast = core.options.enableChromecast || !!core.options.chromecastAppId;
	    if (_componentsBrowser2['default'].isChrome && core.options.enableChromecast) {
	      this.appId = core.options.chromecastAppId;
	      this.deviceState = DEVICE_STATE.IDLE;
	      this.embedScript();
	    } else {
	      this.disable();
	    }
	  }

	  _createClass(Chromecast, [{
	    key: 'bindEvents',
	    value: function bindEvents() {
	      this.container = this.container || this.core.mediaControl.container;
	      this.listenTo(this.core.mediaControl, _baseEvents2['default'].MEDIACONTROL_RENDERED, this.settingsUpdate);
	      this.listenTo(this.core.mediaControl, _baseEvents2['default'].MEDIACONTROL_CONTAINERCHANGED, this.containerChanged);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_TIMEUPDATE, this.containerTimeUpdate);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_PLAY, this.containerPlay);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_ENDED, this.sessionStopped);
	    }
	  }, {
	    key: 'embedScript',
	    value: function embedScript() {
	      var _this = this;

	      if (!window.chrome.cast || !window.chrome.cast.isAvailable) {
	        var script = document.createElement('script');
	        script.setAttribute("type", "text/javascript");
	        script.setAttribute("async", "async");
	        script.setAttribute("src", "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js");
	        script.onload = function () {
	          return _this.bootstrapCastApi();
	        };
	        document.body.appendChild(script);
	      } else {
	        this.bootstrapCastApi();
	      }
	    }
	  }, {
	    key: 'bootstrapCastApi',
	    value: function bootstrapCastApi() {
	      var _this2 = this;

	      if (!window.chrome.cast || !window.chrome.cast.isAvailable) {
	        window['__onGCastApiAvailable'] = function (loaded, errorInfo) {
	          if (!!loaded) {
	            _this2.appId = _this2.appId || DEFAULT_CLAPPR_APP_ID;
	            _this2.initializeCastApi();
	          } else {
	            console.error('GCastApi error', errorInfo);
	            _this2.disable();
	          }
	        };
	      } else {
	        this.appId = this.appId || DEFAULT_CLAPPR_APP_ID;
	        this.initializeCastApi();
	      }
	    }
	  }, {
	    key: 'initializeCastApi',
	    value: function initializeCastApi() {
	      var _this3 = this;

	      var autoJoinPolicy = chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED;
	      var sessionRequest = new chrome.cast.SessionRequest(this.appId);
	      var apiConfig = new chrome.cast.ApiConfig(sessionRequest, function (session) {
	        return _this3.sessionListener(session);
	      }, function (e) {
	        return _this3.receiverListener(e);
	      }, autoJoinPolicy);
	      chrome.cast.initialize(apiConfig, function () {
	        return console.log('init success');
	      }, function () {
	        return console.log('init error');
	      });
	    }
	  }, {
	    key: 'sessionListener',
	    value: function sessionListener(session) {
	      console.log('new session id:' + session.sessionId);
	      this.newSession(session);
	    }
	  }, {
	    key: 'sessionUpdateListener',
	    value: function sessionUpdateListener() {
	      if (this.session) {
	        console.log(this.session.status);
	        if (this.session.status === chrome.cast.SessionStatus.STOPPED) {
	          this.sessionStopped();
	          this.session = null;
	        }
	      }
	    }
	  }, {
	    key: 'receiverListener',
	    value: function receiverListener(e) {
	      if (e === chrome.cast.ReceiverAvailability.AVAILABLE) {
	        console.log("receiver found");
	        this.show();
	      } else {
	        console.log("receiver list empty");
	        this.hide();
	      }
	    }
	  }, {
	    key: 'launchSuccess',
	    value: function launchSuccess(session) {
	      this.$el.removeClass('icon-cast-connecting');
	      clearInterval(this.connectAnimInterval);
	      this.connectAnimInterval = null;
	      this.$el.removeClass('loading-1 loading-2 loading-3');
	      this.core.mediaControl.resetKeepVisible();
	      console.log('launch success - session: ' + session.sessionId);
	      this.newSession(session);
	    }
	  }, {
	    key: 'launchError',
	    value: function launchError(e) {
	      console.log('error on launch', e);
	      this.$el.removeClass('icon-cast-connecting');
	      clearInterval(this.connectAnimInterval);
	      this.connectAnimInterval = null;
	      this.$el.removeClass('loading-1 loading-2 loading-3');
	      this.core.mediaControl.resetKeepVisible();
	    }
	  }, {
	    key: 'loadMediaSuccess',
	    value: function loadMediaSuccess(how, mediaSession) {
	      console.log('new media session', mediaSession, '(', how, ')');

	      this.originalPlayback = this.core.mediaControl.container.playback;

	      var options = (0, _lodashAssign2['default'])({}, this.originalPlayback.options, { currentMedia: mediaSession, mediaControl: this.core.mediaControl });
	      this.src = this.originalPlayback.src;
	      this.playbackProxy = new _chromecast_playback2['default'](options);
	      this.playbackProxy.settings = this.originalPlayback.settings;
	      this.playbackProxy.render();

	      this.mediaSession = mediaSession;

	      this.originalPlayback.$el.remove();
	      this.core.mediaControl.container.$el.append(this.playbackProxy.$el);

	      var container = this.core.mediaControl.container;
	      container.stopListening();
	      container.playback = this.playbackProxy;
	      container.bindEvents();
	      container.settingsUpdate();

	      if (!this.originalPlaybackPlaying) {
	        setTimeout(function () {
	          return container.pause();
	        }, 100);
	      }
	    }
	  }, {
	    key: 'loadMediaError',
	    value: function loadMediaError(e) {
	      console.log("media error", e);
	    }
	  }, {
	    key: 'newSession',
	    value: function newSession(session) {
	      var _this4 = this;

	      this.session = session;
	      this.deviceState = DEVICE_STATE.ACTIVE;
	      this.$el.removeClass('icon-cast');
	      this.$el.addClass('icon-cast-connected');

	      session.addUpdateListener(function () {
	        return _this4.sessionUpdateListener();
	      });

	      this.originalPlaybackPlaying = this.core.mediaControl.container.isPlaying();
	    }
	  }, {
	    key: 'sessionStopped',
	    value: function sessionStopped() {
	      this.$el.addClass('icon-cast');
	      this.$el.removeClass('icon-cast-connected');

	      var time = this.currentTime;

	      var playerState = undefined;
	      if (this.mediaSession) {
	        playerState = this.mediaSession.playerState;
	        this.mediaSession = null;
	      }

	      this.core.load(this.src);

	      var container = this.core.mediaControl.container;

	      if (this.playbackProxy.isPlaying() || playerState === 'PAUSED') {
	        container.once(_baseEvents2['default'].CONTAINER_READY, function () {
	          container.play();
	          container.playback.seek(100 * time / container.getDuration());
	        });
	      }

	      this.playbackProxy.stop();
	    }
	  }, {
	    key: 'loadMedia',
	    value: function loadMedia() {
	      var _this5 = this;

	      this.container.pause();
	      var src = this.core.mediaControl.container.playback.src;
	      console.log("loading... " + src);
	      var mediaInfo = new chrome.cast.media.MediaInfo(src);
	      mediaInfo.contentType = 'video/mp4';
	      var request = new chrome.cast.media.LoadRequest(mediaInfo);
	      request.autoplay = true;
	      request.currentTime = this.currentTime || 0;
	      this.session.loadMedia(request, function (mediaSession) {
	        return _this5.loadMediaSuccess('loadMedia', mediaSession);
	      }, function (e) {
	        return _this5.loadMediaError(e);
	      });
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	      this.$el.show();
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this.$el.hide();
	    }
	  }, {
	    key: 'click',
	    value: function click() {
	      var _this6 = this;

	      chrome.cast.requestSession(function (session) {
	        return _this6.launchSuccess(session);
	      }, function (e) {
	        return _this6.launchError(e);
	      });
	      if (!this.session) {
	        var position = 0;
	        this.$el.addClass('icon-cast-connecting');
	        this.connectAnimInterval = setInterval(function () {
	          _this6.$el.removeClass('loading-1 loading-2 loading-3');
	          _this6.$el.addClass('loading-' + (position + 1));
	          position = (position + 1) % 3;
	        }, 600);
	        this.core.mediaControl.setKeepVisible();
	      }
	    }
	  }, {
	    key: 'settingsUpdate',
	    value: function settingsUpdate() {
	      this.core.mediaControl.$el.find('.media-control-right-panel[data-media-control]').append(this.$el);
	    }
	  }, {
	    key: 'containerChanged',
	    value: function containerChanged() {
	      this.container = this.core.mediaControl.container;
	      this.stopListening();
	      this.bindEvents();
	      this.currentTime = 0;
	    }
	  }, {
	    key: 'containerTimeUpdate',
	    value: function containerTimeUpdate(position, duration) {
	      this.currentTime = position;
	    }
	  }, {
	    key: 'playbackTimeUpdate',
	    value: function playbackTimeUpdate(position, duration) {
	      this.currentTime = position;
	    }
	  }, {
	    key: 'containerPlay',
	    value: function containerPlay() {
	      if (!!this.session && (!this.mediaSession || this.mediaSession.playerStatus === 'IDLE')) {
	        console.log('load media');
	        this.currentTime = 0;
	        this.loadMedia();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this7 = this;

	      this.$el.click(function () {
	        return _this7.click();
	      });
	      this.core.mediaControl.$el.find('.media-control-right-panel[data-media-control]').append(this.$el);
	      this.hide();
	      var style = _baseStyler2['default'].getStyleFor(_publicStyleScss2['default'], { baseUrl: this.core.options.baseUrl });
	      this.core.$el.append(style);
	      return this;
	    }
	  }]);

	  return Chromecast;
	})(_baseUi_core_plugin2['default']);

	exports['default'] = Chromecast;
	module.exports = exports['default'];

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utils = __webpack_require__(2);

	var _ui_object = __webpack_require__(27);

	var _ui_object2 = _interopRequireDefault(_ui_object);

	var UICorePlugin = (function (_UIObject) {
	  _inherits(UICorePlugin, _UIObject);

	  function UICorePlugin(core) {
	    _classCallCheck(this, UICorePlugin);

	    _get(Object.getPrototypeOf(UICorePlugin.prototype), 'constructor', this).call(this, core);
	    this.core = core;
	    this.enabled = true;
	    this.bindEvents();
	    this.render();
	  }

	  _createClass(UICorePlugin, [{
	    key: 'bindEvents',
	    value: function bindEvents() {}
	  }, {
	    key: 'getExternalInterface',
	    value: function getExternalInterface() {
	      return {};
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      if (!this.enabled) {
	        this.bindEvents();
	        this.$el.show();
	        this.enabled = true;
	      }
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      this.stopListening();
	      this.$el.hide();
	      this.enabled = false;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.remove();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.$el.html(this.template());
	      this.$el.append(this.styler.getStyleFor(this.name));
	      this.core.$el.append(this.el);
	      return this;
	    }
	  }]);

	  return UICorePlugin;
	})(_ui_object2['default']);

	exports['default'] = UICorePlugin;

	UICorePlugin.extend = function (properties) {
	  return (0, _utils.extend)(UICorePlugin, properties);
	};
	module.exports = exports['default'];

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _basePlayback = __webpack_require__(96);

	var _basePlayback2 = _interopRequireDefault(_basePlayback);

	var _clapprZepto = __webpack_require__(26);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _baseTemplate = __webpack_require__(35);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _publicChromecastHtml = __webpack_require__(143);

	var _publicChromecastHtml2 = _interopRequireDefault(_publicChromecastHtml);

	var TICK_INTERVAL = 100;

	var ChromecastPlayback = (function (_Playback) {
	  _inherits(ChromecastPlayback, _Playback);

	  _createClass(ChromecastPlayback, [{
	    key: 'name',
	    get: function get() {
	      return 'chromecast_playback';
	    }
	  }, {
	    key: 'template',
	    get: function get() {
	      return (0, _baseTemplate2['default'])(_publicChromecastHtml2['default']);
	    }
	  }]);

	  function ChromecastPlayback(options) {
	    var _this = this;

	    _classCallCheck(this, ChromecastPlayback);

	    _get(Object.getPrototypeOf(ChromecastPlayback.prototype), 'constructor', this).call(this, options);
	    this.options = options;
	    this.src = options.src;
	    this.currentMedia = options.currentMedia;
	    this.mediaControl = options.mediaControl;
	    this.currentMedia.addUpdateListener(function () {
	      return _this.onMediaStatusUpdate();
	    });
	  }

	  _createClass(ChromecastPlayback, [{
	    key: 'render',
	    value: function render() {
	      var template = this.template();
	      this.$el = (0, _clapprZepto2['default'])(template);
	      this.$el.find('.chromecast-playback-background').css('background-image', 'url(' + this.options.poster + ')');
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      this.currentMedia.play();
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.stopTimer();
	      this.currentMedia.pause();
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.stopTimer();
	      this.currentMedia.stop();
	    }
	  }, {
	    key: 'seek',
	    value: function seek(time) {
	      var _this2 = this;

	      this.stopTimer();
	      var request = new chrome.cast.media.SeekRequest();
	      request.currentTime = time * this.currentMedia.media.duration / 100;
	      this.currentMedia.seek(request, function () {
	        return _this2.startTimer();
	      }, function () {
	        return console.log('seek failed');
	      });
	    }
	  }, {
	    key: 'startTimer',
	    value: function startTimer() {
	      var _this3 = this;

	      this.timer = setInterval(function () {
	        return _this3.updateMediaControl();
	      }, TICK_INTERVAL);
	    }
	  }, {
	    key: 'stopTimer',
	    value: function stopTimer() {
	      clearInterval(this.timer);
	      this.timer = null;
	    }
	  }, {
	    key: 'isPlaying',
	    value: function isPlaying() {
	      return this.currentMedia.playerState === 'PLAYING' || this.currentMedia.playerState === 'BUFFERING';
	    }
	  }, {
	    key: 'onMediaStatusUpdate',
	    value: function onMediaStatusUpdate() {
	      this.mediaControl.changeTogglePlay();
	      if (this.isPlaying() && !this.timer) {
	        this.startTimer();
	      }

	      if (this.currentMedia.playerState === 'BUFFERING') {
	        this.isBuffering = true;
	        this.trigger(_baseEvents2['default'].PLAYBACK_BUFFERING, this.name);
	      } else if (this.currentMedia.playerState === 'PLAYING') {
	        if (this.isBuffering) {
	          this.isBuffering = false;
	          this.trigger(_baseEvents2['default'].PLAYBACK_BUFFERFULL, this.name);
	        }
	        this.trigger(_baseEvents2['default'].PLAYBACK_PLAY, this.name);
	      } else if (this.currentMedia.playerState === 'IDLE') {
	        if (this.isBuffering) {
	          this.isBuffering = false;
	          this.trigger(_baseEvents2['default'].PLAYBACK_BUFFERFULL, this.name);
	        }
	        this.trigger(_baseEvents2['default'].PLAYBACK_ENDED, this.name);
	      }
	    }
	  }, {
	    key: 'updateMediaControl',
	    value: function updateMediaControl() {
	      var position = this.currentMedia.getEstimatedTime();
	      var duration = this.currentMedia.media.duration;
	      this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, position, duration, this.name);
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	      this.$el.show();
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this.$el.hide();
	    }
	  }]);

	  return ChromecastPlayback;
	})(_basePlayback2['default']);

	exports['default'] = ChromecastPlayback;
	module.exports = exports['default'];

/***/ },
/* 143 */
/***/ function(module, exports) {

	module.exports = "<div class=\"chromecast-playback\">\n  <div class=\"chromecast-playback-background\"></div>\n  <div class=\"chromecast-playback-overlay\"></div>\n</div>\n";

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, ".chromecast-playback {\n  height: 100%;\n  width: 100%; }\n  .chromecast-playback .chromecast-playback-background, .chromecast-playback .chromecast-playback-overlay {\n    position: absolute;\n    height: 100%;\n    width: 100%; }\n  .chromecast-playback .chromecast-playback-background {\n    background-size: contain; }\n  .chromecast-playback .chromecast-playback-overlay {\n    background-color: #000;\n    opacity: 0.4; }\n\n@font-face {\n  font-family: \"chromecast\";\n  src: url(" + __webpack_require__(145) + ");\n  src: url(" + __webpack_require__(146) + "?#iefix-2rwb6t) format(\"embedded-opentype\"), url(" + __webpack_require__(147) + ") format(\"woff\"), url(" + __webpack_require__(148) + ") format(\"truetype\"), url(" + __webpack_require__(149) + "#chromecast) format(\"svg\");\n  font-weight: normal;\n  font-style: normal; }\n\n.chromecast-button {\n  background: transparent;\n  border: 0;\n  width: 32px;\n  height: 26px;\n  font-size: 22px;\n  line-height: 26px;\n  letter-spacing: 0;\n  color: #fff;\n  opacity: 0.5;\n  vertical-align: middle;\n  text-align: left;\n  cursor: pointer;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-transition: all 0.1s ease;\n  -moz-transition: all 0.1s ease;\n  -o-transition: all 0.1s ease;\n  transition: all 0.1s ease; }\n  .chromecast-button:hover {\n    opacity: 0.75;\n    text-shadow: rgba(255, 255, 255, 0.8) 0 0 5px; }\n  .chromecast-button:focus {\n    outline: none; }\n\n.chromecast-icon {\n  font-family: \"chromecast\";\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.icon-cast:before {\n  content: \"\\\\e001\"; }\n\n.icon-cast-connecting.loading-1:before {\n  content: \"\\\\e003\"; }\n.icon-cast-connecting.loading-2:before {\n  content: \"\\\\e004\"; }\n.icon-cast-connecting.loading-3:before {\n  content: \"\\\\e001\"; }\n\n.icon-cast-connected:before {\n  content: \"\\\\e002\"; }\n", ""]);

	// exports


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "53cd406a16a857e2face1365a18cc729.eot"

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "53cd406a16a857e2face1365a18cc729.eot"

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "22c62aaa70cf273ced96cdd0ab9e4e72.woff"

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "6ac1074c3ad60163d6d52ecfd346e950.ttf"

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "57e740a84980042b2b659da22fc9c4ab.svg"

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(151);

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUi_core_plugin = __webpack_require__(141);

	var _baseUi_core_plugin2 = _interopRequireDefault(_baseUi_core_plugin);

	var _baseTemplate = __webpack_require__(35);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _baseStyler = __webpack_require__(34);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _publicDvr_controlsScss = __webpack_require__(152);

	var _publicDvr_controlsScss2 = _interopRequireDefault(_publicDvr_controlsScss);

	var _publicIndexHtml = __webpack_require__(154);

	var _publicIndexHtml2 = _interopRequireDefault(_publicIndexHtml);

	var _clapprZepto = __webpack_require__(26);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var DVRControls = (function (_UICorePlugin) {
	  _inherits(DVRControls, _UICorePlugin);

	  _createClass(DVRControls, [{
	    key: 'template',
	    get: function get() {
	      return (0, _baseTemplate2['default'])(_publicIndexHtml2['default']);
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

	    _get(Object.getPrototypeOf(DVRControls.prototype), 'constructor', this).call(this, core);
	    this.core = core;
	    this.settingsUpdate();
	  }

	  _createClass(DVRControls, [{
	    key: 'bindEvents',
	    value: function bindEvents() {
	      this.listenTo(this.core.mediaControl, _baseEvents2['default'].MEDIACONTROL_RENDERED, this.settingsUpdate);
	      this.listenTo(this.core.mediaControl.container, _baseEvents2['default'].CONTAINER_PLAYBACKDVRSTATECHANGED, this.dvrChanged);
	    }
	  }, {
	    key: 'dvrChanged',
	    value: function dvrChanged(dvrEnabled) {
	      this.settingsUpdate();
	      this.core.mediaControl.$el.addClass('live');
	      if (dvrEnabled) {
	        this.core.mediaControl.$el.addClass('dvr');
	        this.core.mediaControl.$el.find('.media-control-indicator[data-position], .media-control-indicator[data-duration]').hide();
	      } else {
	        this.core.mediaControl.$el.removeClass('dvr');
	      }
	    }
	  }, {
	    key: 'click',
	    value: function click() {
	      if (!this.core.mediaControl.container.isPlaying()) {
	        this.core.mediaControl.container.play();
	      }
	      if (this.core.mediaControl.$el.hasClass('dvr')) {
	        this.core.mediaControl.container.setCurrentTime(-1);
	      }
	    }
	  }, {
	    key: 'settingsUpdate',
	    value: function settingsUpdate() {
	      var _this = this;

	      this.stopListening();
	      if (this.shouldRender()) {
	        this.render();
	        this.$el.click(function () {
	          return _this.click();
	        });
	      }
	      this.bindEvents();
	    }
	  }, {
	    key: 'shouldRender',
	    value: function shouldRender() {
	      var useDvrControls = this.core.options.useDvrControls === undefined || !!this.core.options.useDvrControls;
	      return useDvrControls && this.core.mediaControl.container.getPlaybackType() === 'live';
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.style = this.style || _baseStyler2['default'].getStyleFor(_publicDvr_controlsScss2['default'], { baseUrl: this.core.options.baseUrl });

	      this.$el.html(this.template());
	      this.$el.append(this.style);
	      if (this.shouldRender()) {
	        this.core.mediaControl.$el.addClass('live');
	        this.core.mediaControl.$('.media-control-left-panel[data-media-control]').append(this.$el);
	        if (!this.$duration) {
	          this.$duration = (0, _clapprZepto2['default'])('<span data-duration></span>');
	        }
	        this.$duration.html('');
	        this.core.mediaControl.seekTime.$el.append(this.$duration);
	      }
	      return this;
	    }
	  }]);

	  return DVRControls;
	})(_baseUi_core_plugin2['default']);

	exports['default'] = DVRControls;
	module.exports = exports['default'];

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, "@font-face {\n  font-family: \"Roboto\";\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Roboto\"), local(\"Roboto-Regular\"), url(" + __webpack_require__(153) + ") format(\"truetype\"); }\n\n.dvr-controls[data-dvr-controls] {\n  display: inline-block;\n  float: left;\n  color: #fff;\n  line-height: 32px;\n  font-size: 10px;\n  font-weight: bold;\n  margin-left: 6px; }\n  .dvr-controls[data-dvr-controls] .live-info {\n    cursor: default;\n    font-family: \"Roboto\", \"Open Sans\", Arial, sans-serif; }\n    .dvr-controls[data-dvr-controls] .live-info:before {\n      content: \"\";\n      display: inline-block;\n      position: relative;\n      width: 7px;\n      height: 7px;\n      border-radius: 3.5px;\n      margin-right: 3.5px;\n      background-color: #ff0101; }\n    .dvr-controls[data-dvr-controls] .live-info.disabled {\n      opacity: 0.3; }\n      .dvr-controls[data-dvr-controls] .live-info.disabled:before {\n        background-color: #fff; }\n  .dvr-controls[data-dvr-controls] .live-button {\n    cursor: pointer;\n    outline: none;\n    display: none;\n    border: 0;\n    color: #fff;\n    background-color: transparent;\n    height: 32px;\n    padding: 0;\n    opacity: 0.7;\n    font-family: \"Roboto\", \"Open Sans\", Arial, sans-serif;\n    -webkit-transition: all 0.1s ease;\n    -moz-transition: all 0.1s ease;\n    -o-transition: all 0.1s ease;\n    transition: all 0.1s ease; }\n    .dvr-controls[data-dvr-controls] .live-button:before {\n      content: \"\";\n      display: inline-block;\n      position: relative;\n      width: 7px;\n      height: 7px;\n      border-radius: 3.5px;\n      margin-right: 3.5px;\n      background-color: #fff; }\n    .dvr-controls[data-dvr-controls] .live-button:hover {\n      opacity: 1;\n      text-shadow: rgba(255, 255, 255, 0.75) 0 0 5px; }\n\n.dvr .dvr-controls[data-dvr-controls] .live-info {\n  display: none; }\n.dvr .dvr-controls[data-dvr-controls] .live-button {\n  display: block; }\n.dvr.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar] {\n  background-color: #005aff; }\n\n.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar] {\n  background-color: #ff0101; }\n\n.seek-time[data-seek-time] span[data-duration] {\n  position: relative;\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 10px;\n  padding-right: 7px; }\n  .seek-time[data-seek-time] span[data-duration]:before {\n    content: \"|\";\n    margin-right: 7px; }\n", ""]);

	// exports


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "38861cba61c66739c1452c3a71e39852.ttf"

/***/ },
/* 154 */
/***/ function(module, exports) {

	module.exports = "<div class=\"live-info\">LIVE</div>\n<button class=\"live-button\">BACK TO LIVE</button>\n";

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(156);

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseCore_plugin = __webpack_require__(157);

	var _baseCore_plugin2 = _interopRequireDefault(_baseCore_plugin);

	var _baseEvents = __webpack_require__(16);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _clapprZepto = __webpack_require__(26);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var Favicon = (function (_CorePlugin) {
	  _inherits(Favicon, _CorePlugin);

	  _createClass(Favicon, [{
	    key: 'name',
	    get: function get() {
	      return 'favicon';
	    }
	  }]);

	  function Favicon(core) {
	    _classCallCheck(this, Favicon);

	    _get(Object.getPrototypeOf(Favicon.prototype), 'constructor', this).call(this, core);
	    this.oldIcon = (0, _clapprZepto2['default'])('link[rel="shortcut icon"]');
	    if (!this.core.options.changeFavicon) {
	      this.disable();
	    }
	  }

	  _createClass(Favicon, [{
	    key: 'bindEvents',
	    value: function bindEvents() {
	      this.listenTo(this.core.mediaControl, _baseEvents2['default'].MEDIACONTROL_CONTAINERCHANGED, this.containerChanged);
	      if (this.core.mediaControl.container) {
	        this.containerChanged();
	      }
	    }
	  }, {
	    key: 'containerChanged',
	    value: function containerChanged() {
	      this.listenTo(this.core.mediaControl.container, _baseEvents2['default'].CONTAINER_PLAY, this.setPlayIcon);
	      this.listenTo(this.core.mediaControl.container, _baseEvents2['default'].CONTAINER_PAUSE, this.setPauseIcon);
	      this.listenTo(this.core.mediaControl.container, _baseEvents2['default'].CONTAINER_STOP, this.resetIcon);
	      this.listenTo(this.core.mediaControl.container, _baseEvents2['default'].CONTAINER_ENDED, this.resetIcon);
	      this.listenTo(this.core.mediaControl.container, _baseEvents2['default'].CONTAINER_ERROR, this.resetIcon);
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      _get(Object.getPrototypeOf(Favicon.prototype), 'disable', this).call(this);
	      this.resetIcon();
	    }
	  }, {
	    key: 'createIcon',
	    value: function createIcon(charCode) {
	      var canvas = (0, _clapprZepto2['default'])('<canvas/>');
	      canvas[0].width = 32;
	      canvas[0].height = 32;
	      var ctx = canvas[0].getContext('2d');
	      ctx.fillStyle = '#000';
	      ctx.font = '25px Player';
	      ctx.fillText(String.fromCharCode(charCode), 5, 26);
	      var icon = (0, _clapprZepto2['default'])('<link rel="shortcut icon" type="image/png"/>');
	      icon.attr('href', canvas[0].toDataURL('image/png'));
	      return icon;
	    }
	  }, {
	    key: 'setPlayIcon',
	    value: function setPlayIcon() {
	      if (!this.playIcon) {
	        this.playIcon = this.createIcon(0xe001);
	      }
	      this.changeIcon(this.playIcon);
	    }
	  }, {
	    key: 'setPauseIcon',
	    value: function setPauseIcon() {
	      if (!this.pauseIcon) {
	        this.pauseIcon = this.createIcon(0xe002);
	      }
	      this.changeIcon(this.pauseIcon);
	    }
	  }, {
	    key: 'resetIcon',
	    value: function resetIcon() {
	      if (this.currentIcon) {
	        this.currentIcon.remove();
	      }
	      (0, _clapprZepto2['default'])('head').append(this.oldIcon);
	    }
	  }, {
	    key: 'changeIcon',
	    value: function changeIcon(icon) {
	      if (icon) {
	        this.oldIcon.remove();
	        if (this.currentIcon) {
	          this.currentIcon.remove();
	        }
	        this.currentIcon = icon;
	        (0, _clapprZepto2['default'])('head').append(icon);
	      }
	    }
	  }]);

	  return Favicon;
	})(_baseCore_plugin2['default']);

	exports['default'] = Favicon;
	module.exports = exports['default'];

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utils = __webpack_require__(2);

	var _base_object = __webpack_require__(15);

	var _base_object2 = _interopRequireDefault(_base_object);

	var CorePlugin = (function (_BaseObject) {
	  _inherits(CorePlugin, _BaseObject);

	  function CorePlugin(core) {
	    _classCallCheck(this, CorePlugin);

	    _get(Object.getPrototypeOf(CorePlugin.prototype), 'constructor', this).call(this, core);
	    this.core = core;
	    this.enabled = true;
	    this.bindEvents();
	  }

	  _createClass(CorePlugin, [{
	    key: 'bindEvents',
	    value: function bindEvents() {}
	  }, {
	    key: 'enable',
	    value: function enable() {
	      if (!this.enabled) {
	        this.bindEvents();
	        this.enabled = true;
	      }
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      if (this.enabled) {
	        this.stopListening();
	        this.enabled = false;
	      }
	    }
	  }, {
	    key: 'getExternalInterface',
	    value: function getExternalInterface() {
	      return {};
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.stopListening();
	    }
	  }]);

	  return CorePlugin;
	})(_base_object2['default']);

	exports['default'] = CorePlugin;

	CorePlugin.extend = function (properties) {
	  return (0, _utils.extend)(CorePlugin, properties);
	};
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;