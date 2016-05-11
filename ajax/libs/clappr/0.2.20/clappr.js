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

	var _baseEvents = __webpack_require__(6);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _basePlayback = __webpack_require__(81);

	var _basePlayback2 = _interopRequireDefault(_basePlayback);

	var _baseContainer_plugin = __webpack_require__(133);

	var _baseContainer_plugin2 = _interopRequireDefault(_baseContainer_plugin);

	var _baseCore_plugin = __webpack_require__(154);

	var _baseCore_plugin2 = _interopRequireDefault(_baseCore_plugin);

	var _baseUi_core_plugin = __webpack_require__(148);

	var _baseUi_core_plugin2 = _interopRequireDefault(_baseUi_core_plugin);

	var _baseUi_container_plugin = __webpack_require__(128);

	var _baseUi_container_plugin2 = _interopRequireDefault(_baseUi_container_plugin);

	var _baseBase_object = __webpack_require__(5);

	var _baseBase_object2 = _interopRequireDefault(_baseBase_object);

	var _baseUi_object = __webpack_require__(18);

	var _baseUi_object2 = _interopRequireDefault(_baseUi_object);

	var _componentsBrowser = __webpack_require__(3);

	var _componentsBrowser2 = _interopRequireDefault(_componentsBrowser);

	var _componentsContainer = __webpack_require__(27);

	var _componentsContainer2 = _interopRequireDefault(_componentsContainer);

	var _componentsCore = __webpack_require__(14);

	var _componentsCore2 = _interopRequireDefault(_componentsCore);

	var _componentsMediator = __webpack_require__(51);

	var _componentsMediator2 = _interopRequireDefault(_componentsMediator);

	var _componentsMedia_control = __webpack_require__(44);

	var _componentsMedia_control2 = _interopRequireDefault(_componentsMedia_control);

	var _componentsPlayer_info = __webpack_require__(58);

	var _componentsPlayer_info2 = _interopRequireDefault(_componentsPlayer_info);

	var _playbacksBase_flash_playback = __webpack_require__(86);

	var _playbacksBase_flash_playback2 = _interopRequireDefault(_playbacksBase_flash_playback);

	var _playbacksFlash = __webpack_require__(84);

	var _playbacksFlash2 = _interopRequireDefault(_playbacksFlash);

	var _playbacksFlashls = __webpack_require__(93);

	var _playbacksFlashls2 = _interopRequireDefault(_playbacksFlashls);

	var _playbacksHls = __webpack_require__(97);

	var _playbacksHls2 = _interopRequireDefault(_playbacksHls);

	var _playbacksHtml5_audio = __webpack_require__(91);

	var _playbacksHtml5_audio2 = _interopRequireDefault(_playbacksHtml5_audio);

	var _playbacksHtml5_video = __webpack_require__(79);

	var _playbacksHtml5_video2 = _interopRequireDefault(_playbacksHtml5_video);

	var _playbacksHtml_img = __webpack_require__(119);

	var _playbacksHtml_img2 = _interopRequireDefault(_playbacksHtml_img);

	var _pluginsPoster = __webpack_require__(138);

	var _pluginsPoster2 = _interopRequireDefault(_pluginsPoster);

	var _pluginsLog = __webpack_require__(7);

	var _pluginsLog2 = _interopRequireDefault(_pluginsLog);

	var _baseStyler = __webpack_require__(16);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _baseTemplate = __webpack_require__(17);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var version = ("0.2.20");

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
	    BaseFlashPlayback: _playbacksBase_flash_playback2['default'],
	    Flash: _playbacksFlash2['default'],
	    FlasHLS: _playbacksFlashls2['default'],
	    HLS: _playbacksHls2['default'],
	    HTML5Audio: _playbacksHtml5_audio2['default'],
	    HTML5Video: _playbacksHtml5_video2['default'],
	    HTMLImg: _playbacksHtml_img2['default'],
	    Poster: _pluginsPoster2['default'],
	    Log: _pluginsLog2['default'],
	    Styler: _baseStyler2['default'],
	    version: version,
	    template: _baseTemplate2['default'],
	    $: _clapprZepto2['default']
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

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUtils = __webpack_require__(2);

	var _baseBase_object = __webpack_require__(5);

	var _baseBase_object2 = _interopRequireDefault(_baseBase_object);

	var _baseEvents = __webpack_require__(6);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _componentsCore_factory = __webpack_require__(12);

	var _componentsCore_factory2 = _interopRequireDefault(_componentsCore_factory);

	var _componentsLoader = __webpack_require__(60);

	var _componentsLoader2 = _interopRequireDefault(_componentsLoader);

	var _componentsPlayer_info = __webpack_require__(58);

	var _componentsPlayer_info2 = _interopRequireDefault(_componentsPlayer_info);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _lodashFind = __webpack_require__(31);

	var _lodashFind2 = _interopRequireDefault(_lodashFind);

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
	   * @param {String} [options.parentId]
	   * the id of the element on the page that the player should be inserted into
	   * @param {Object} [options.parent]
	   * a reference to a dom element that the player should be inserted into
	   * @param {Boolean} [options.autoPlay]
	   * automatically play after page load **default**: `false`
	   * @param {Boolean} [options.loop]
	   * automatically replay after it ends **default**: `false`
	   * @param {Boolean} [options.chromeless]
	   * player acts in chromeless mode **default**: `false`
	   * @param {Boolean} [options.muted]
	   * start the video muted **default**: `false`
	   * @param {String} [options.mimeType]
	   * add `mimeType: "application/vnd.apple.mpegurl"` if you need to use a url without extension.
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
	   * @param {Boolean} [options.disableVideoTagContextMenu]
	   * disables the context menu (right click) on the video element if a HTML5Video playback is used.
	   * @param {String} [options.poster]
	   * define a poster by adding its address `poster: 'http://url/img.png'`. It will appear after video embed, disappear on play and go back when user stops the video.
	   */

	  function Player(options) {
	    _classCallCheck(this, Player);

	    _get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this, options);
	    var defaultOptions = { playerId: (0, _baseUtils.uniqueId)(""), persistConfig: true, width: 640, height: 360, baseUrl: baseUrl };
	    this.options = _clapprZepto2['default'].extend(defaultOptions, options);
	    this.options.sources = this.normalizeSources(options);
	    this.loader = new _componentsLoader2['default'](this.options.plugins || {}, this.options.playerId);
	    this.coreFactory = new _componentsCore_factory2['default'](this, this.loader);
	    this.playerInfo = _componentsPlayer_info2['default'].getInstance(this.options.playerId);
	    this.playerInfo.currentSize = { width: options.width, height: options.height };
	    this.playerInfo.options = this.options;
	    if (this.options.parentId) {
	      this.setParentId(this.options.parentId);
	    } else if (this.options.parent) {
	      this.attachTo(this.options.parent);
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
	        this.listenTo(container, _baseEvents2['default'].CONTAINER_VOLUME, this.onVolumeUpdate);
	      }
	    }
	  }, {
	    key: 'containerChanged',
	    value: function containerChanged() {
	      this.stopListening();
	      this.addEventListeners();
	    }
	  }, {
	    key: 'onVolumeUpdate',
	    value: function onVolumeUpdate(volume) {
	      this.trigger(_baseEvents2['default'].PLAYER_VOLUMEUPDATE, volume);
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
	    value: function onTimeUpdate(timeProgress) {
	      this.trigger(_baseEvents2['default'].PLAYER_TIMEUPDATE, timeProgress);
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
	     * @param {Number} volume should be a number between 0 and 100, 0 being mute and 100 the max volume.
	     */
	  }, {
	    key: 'setVolume',
	    value: function setVolume(volume) {
	      this.core.mediaControl.container.setVolume(volume);
	    }

	    /**
	     * Get the volume for the current video
	     * @method getVolume
	     * @return {Number} volume should be a number between 0 and 100, 0 being mute and 100 the max volume.
	     */
	  }, {
	    key: 'getVolume',
	    value: function getVolume() {
	      return this.core.mediaControl.container.volume;
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

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	exports.extend = extend;
	exports.formatTime = formatTime;
	exports.seekStringToSeconds = seekStringToSeconds;
	exports.uniqueId = uniqueId;
	exports.isNumber = isNumber;
	exports.currentScriptUrl = currentScriptUrl;
	exports.getBrowserLanguage = getBrowserLanguage;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _componentsBrowser = __webpack_require__(3);

	var _componentsBrowser2 = _interopRequireDefault(_componentsBrowser);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	function extend(parent, properties) {
	  var pluginName = properties.name || "";

	  var MergedPlugin = (function (_parent) {
	    _inherits(MergedPlugin, _parent);

	    function MergedPlugin(args) {
	      _classCallCheck(this, MergedPlugin);

	      _get(Object.getPrototypeOf(MergedPlugin.prototype), 'constructor', this).call(this, args);
	      if (properties.initialize) {
	        properties.initialize.apply(this, [args]);
	      }
	    }

	    _createClass(MergedPlugin, [{
	      key: 'name',
	      get: function get() {
	        return pluginName;
	      }
	    }]);

	    return MergedPlugin;
	  })(parent);

	  delete properties.name;
	  _clapprZepto2['default'].extend(MergedPlugin, properties);
	  return MergedPlugin;
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

	function getBrowserLanguage() {
	  if (window.navigator && window.navigator.language) {
	    return window.navigator.language.toLowerCase();
	  }
	  return null;
	}

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
	  cancelAnimationFrame: cancelAnimationFrame,
	  getBrowserLanguage: getBrowserLanguage
	};

/***/ },
/* 3 */
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
	Browser.isAndroid = !!/Android/i.test(navigator.userAgent);
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
/* 4 */
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
	    var e, n;return f[t] || (e = u.createElement(t), u.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), f[t] = n), f[t];
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
	  };return C.matches = function (t, e) {
	    if (!e || !t || 1 !== t.nodeType) return !1;var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;if (n) return n.call(t, e);var i,
	        r = t.parentNode,
	        o = !r;return o && (r = O).appendChild(t), i = ~C.qsa(r, e).indexOf(t), o && O.removeChild(t), i;
	  }, N = function (t) {
	    return t.replace(/-+(.)?/g, function (t, e) {
	      return e ? e.toUpperCase() : "";
	    });
	  }, P = function (t) {
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
	        if (1 === this.nodeType) if ($(n)) for (e in n) J(this, e, n[e]);else J(this, n, Y(this, i, t, this.getAttribute(n)));
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
	            o = this[0];if (!o) return;if ((r = getComputedStyle(o, ""), "string" == typeof t)) return o.style[N(t)] || r.getPropertyValue(t);if (A(t)) {
	          var s = {};return n.each(t, function (t, e) {
	            s[e] = o.style[N(e)] || r.getPropertyValue(e);
	          }), s;
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
	            r = m.test(e[0].nodeName) ? { top: 0, left: 0 } : e.offset();return i.top -= parseFloat(n(t).css("margin-top")) || 0, i.left -= parseFloat(n(t).css("margin-left")) || 0, r.top += parseFloat(n(e[0]).css("border-top-width")) || 0, r.left += parseFloat(n(e[0]).css("border-left-width")) || 0, { top: i.top - r.top, left: i.left - r.left };
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
	      f && (c = function (t) {
	        return y(r, t.type, u), u.apply(this, arguments);
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
	        i = !0;if (e) for (var r in e) "bubbles" == r ? i = !!e[r] : n[r] = e[r];return n.initEvent(t, i, !0), T(n);
	  };
	})(Zepto), (function (t) {
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
	        s = t.Deferred && t.Deferred();for (i in t.ajaxSettings) void 0 === o[i] && (o[i] = t.ajaxSettings[i]);d(o), o.crossDomain || (a = n.createElement("a"), a.href = o.url, a.href = a.href, o.crossDomain = l.protocol + "//" + l.host != a.protocol + "//" + a.host), o.url || (o.url = window.location.toString()), (u = o.url.indexOf("#")) > -1 && (o.url = o.url.slice(0, u)), T(o);var f = o.dataType,
	        h = /\?.+=\?/.test(o.url);if ((h && (f = "jsonp"), o.cache !== !1 && (e && e.cache === !0 || "script" != f && "jsonp" != f) || (o.url = E(o.url, "_=" + Date.now())), "jsonp" == f)) return h || (o.url = E(o.url, o.jsonp ? o.jsonp + "=?" : o.jsonp === !1 ? "" : "callback=?")), t.ajaxJSONP(o, s);var N,
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
	    }, g(S, o) === !1)) return S.abort(), y(null, "abort", S, o, s), S;if (o.xhrFields) for (r in o.xhrFields) S[r] = o.xhrFields[r];var P = "async" in o ? o.async : !0;S.open(o.type, o.url, P, o.username, o.password);for (r in m) C.apply(S, m[r]);return o.timeout > 0 && (N = setTimeout(function () {
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
	        return u && t.each(arguments, function (e, n) {
	          for (var i; (i = t.inArray(n, u, i)) > -1;) u.splice(i, 1), r && (s >= i && --s, a >= i && --a);
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
	})(Zepto), (function (t) {
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
	    };if (o > 1) for (f = new Array(o), c = new Array(o), l = new Array(o); o > s; ++s) r[s] && t.isFunction(r[s].promise) ? r[s].promise().done(h(s, l, r)).fail(u.reject).progress(h(s, c, f)) : --a;return a || u.resolveWith(l, r), u.promise();
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utils = __webpack_require__(2);

	var _events = __webpack_require__(6);

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
/* 6 */
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

	var _pluginsLog = __webpack_require__(7);

	var _pluginsLog2 = _interopRequireDefault(_pluginsLog);

	var _utils = __webpack_require__(2);

	var _lodashOnce = __webpack_require__(10);

	var _lodashOnce2 = _interopRequireDefault(_lodashOnce);

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
	        _pluginsLog2['default'].debug.apply(_pluginsLog2['default'], [klass].concat(Array.prototype.slice.call(arguments)));
	        if (!this._events) return this;
	        var args = slice.call(arguments, 1);
	        if (!eventsApi(this, 'trigger', name, args)) return this;
	        var events = this._events[name];
	        var allEvents = this._events.all;
	        if (events) triggerEvents(events, args);
	        if (allEvents) triggerEvents(allEvents, arguments);
	      } catch (exception) {
	        _pluginsLog2['default'].error.apply(_pluginsLog2['default'], [klass, 'error on event', name, 'trigger', '-', exception]);
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
	 * Fired when the time is updated on player
	 *
	 * @event PLAYBACK_TIMEUPDATE
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
	 * Fired when playback is buffering
	 *
	 * @event PLAYBACK_BUFFERING
	 */
	Events.PLAYBACK_BUFFERING = 'playback:buffering';
	/**
	 * Fired when playback filled the buffer
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
	 * Fired when playback internal state changes
	 *
	 * @event PLAYBACK_PLAYBACKSTATE
	 * @param {Object} state Data
	 * state object
	 * @param {String} [state.type]
	 * the playback type
	 */
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
	Events.PLAYBACK_LEVEL_SWITCH = 'playback:level:switch';

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
	Events.CONTAINER_MEDIACONTROL_DISABLE = 'container:mediacontrol:disable';
	Events.CONTAINER_MEDIACONTROL_ENABLE = 'container:mediacontrol:enable';
	Events.CONTAINER_STATS_ADD = 'container:stats:add';

	// MediaControl Events
	Events.MEDIACONTROL_RENDERED = 'mediacontrol:rendered';
	/**
	 * Fired when the player enters/exit on fullscreen
	 *
	 * @event MEDIACONTROL_SHOW
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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(8);

/***/ },
/* 8 */
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

	var _baseKibo = __webpack_require__(9);

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

	    var level = arguments.length <= 0 || arguments[0] === undefined ? LEVEL_INFO : arguments[0];
	    var offLevel = arguments.length <= 1 || arguments[1] === undefined ? LEVEL_DISABLED : arguments[1];

	    _classCallCheck(this, Log);

	    this.kibo = new _baseKibo2['default']();
	    this.kibo.down(['ctrl shift d'], function () {
	      return _this.onOff();
	    });
	    this.BLACKLIST = ['timeupdate', 'playback:timeupdate', 'playback:progress', 'container:hover', 'container:timeupdate', 'container:progress'];
	    this.level = level;
	    this.offLevel = offLevel;
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
	      if (window.console && window.console.log) {
	        console.log.apply(console, ["%c[" + DESCRIPTIONS[level] + "]" + klassDescription, color].concat(message));
	      }
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
/* 10 */
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

	var before = __webpack_require__(11);

	/**
	 * Creates a function that is restricted to invoking `func` once. Repeat calls
	 * to the function return the value of the first call. The `func` is invoked
	 * with the `this` binding and arguments of the created function.
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(13);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseBase_object = __webpack_require__(5);

	var _baseBase_object2 = _interopRequireDefault(_baseBase_object);

	var _componentsCore = __webpack_require__(14);

	var _componentsCore2 = _interopRequireDefault(_componentsCore);

	/**
	 * The Core Factory is responsible for instantiate the core and it's plugins.
	 * @class CoreFactory
	 * @constructor
	 * @extends BaseObject
	 * @module components
	 */

	var CoreFactory = (function (_BaseObject) {
	  _inherits(CoreFactory, _BaseObject);

	  /**
	   * it builds the core factory
	   * @method constructor
	   * @param {Player} player the player object
	   * @param {Loader} loader the loader object
	   */

	  function CoreFactory(player, loader) {
	    _classCallCheck(this, CoreFactory);

	    _get(Object.getPrototypeOf(CoreFactory.prototype), 'constructor', this).call(this);
	    this.player = player;
	    this.options = player.options;
	    this.loader = loader;
	    this.options.loader = this.loader;
	  }

	  /**
	   * creates a core and its plugins
	   * @method create
	   * @return {Core} created core
	   */

	  _createClass(CoreFactory, [{
	    key: 'create',
	    value: function create() {
	      this.core = new _componentsCore2['default'](this.options);
	      this.core.then(this.addCorePlugins.bind(this));
	      return this.core;
	    }

	    /**
	     * given the core plugins (`loader.corePlugins`) it builds each one
	     * @method addCorePlugins
	     * @return {Core} the core with all plugins
	     */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(15);

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

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUtils = __webpack_require__(2);

	var _baseEvents = __webpack_require__(6);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _baseStyler = __webpack_require__(16);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _baseUi_object = __webpack_require__(18);

	var _baseUi_object2 = _interopRequireDefault(_baseUi_object);

	var _componentsBrowser = __webpack_require__(3);

	var _componentsBrowser2 = _interopRequireDefault(_componentsBrowser);

	var _componentsContainer_factory = __webpack_require__(25);

	var _componentsContainer_factory2 = _interopRequireDefault(_componentsContainer_factory);

	var _componentsMedia_control = __webpack_require__(44);

	var _componentsMedia_control2 = _interopRequireDefault(_componentsMedia_control);

	var _componentsMediator = __webpack_require__(51);

	var _componentsMediator2 = _interopRequireDefault(_componentsMediator);

	var _componentsPlayer_info = __webpack_require__(58);

	var _componentsPlayer_info2 = _interopRequireDefault(_componentsPlayer_info);

	var _lodashFind = __webpack_require__(31);

	var _lodashFind2 = _interopRequireDefault(_lodashFind);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _publicStyleScss = __webpack_require__(59);

	var _publicStyleScss2 = _interopRequireDefault(_publicStyleScss);

	/**
	 * The Core is responsible to manage Containers, the mediator, MediaControl
	 * and the player state.
	 * @class Core
	 * @constructor
	 * @extends UIObject
	 * @module components
	 */

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
	    this.playerInfo = _componentsPlayer_info2['default'].getInstance(options.playerId);
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
	      this.containerFactory = new _componentsContainer_factory2['default'](options, options.loader);
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
	      _componentsMediator2['default'].trigger(this.options.playerId + ':' + _baseEvents2['default'].PLAYER_RESIZE, this.playerInfo.currentSize);
	    }
	  }, {
	    key: 'setFullscreen',
	    value: function setFullscreen() {
	      if (!_componentsBrowser2['default'].isiOs) {
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
	      _componentsMediator2['default'].trigger(this.options.playerId + ':' + _baseEvents2['default'].PLAYER_RESIZE, this.playerInfo.currentSize);
	    }
	  }, {
	    key: 'enableResizeObserver',
	    value: function enableResizeObserver() {
	      var _this3 = this;

	      var checkSizeCallback = function checkSizeCallback() {
	        if (_this3.reqAnimFrame) clearTimeout(_this3.reqAnimFrame);
	        if (_this3.playerInfo.computedSize.width != _this3.el.clientWidth || _this3.playerInfo.computedSize.height != _this3.el.clientHeight) {
	          _this3.playerInfo.computedSize = { width: _this3.el.clientWidth, height: _this3.el.clientHeight };
	          _componentsMediator2['default'].trigger(_this3.options.playerId + ':' + _baseEvents2['default'].PLAYER_RESIZE, _this3.playerInfo.computedSize);
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
	      this.containerFactory.options = _clapprZepto2['default'].extend(this.options, { sources: sources });
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
	        this.mediaControl = this.createMediaControl(_clapprZepto2['default'].extend({ container: container, focusElement: this.el }, this.options));
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
	        return new _componentsMedia_control2['default'](options);
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
	    key: 'getCurrentPlayback',
	    value: function getCurrentPlayback() {
	      return this.getCurrentContainer().playback;
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
	        if (!_componentsBrowser2['default'].isiOs) {
	          this.$el.addClass('fullscreen');
	        }
	      } else {
	        _baseUtils.Fullscreen.cancelFullscreen();
	        if (!_componentsBrowser2['default'].isiOs) {
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _template = __webpack_require__(17);

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
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utils = __webpack_require__(2);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _lodashResult = __webpack_require__(19);

	var _lodashResult2 = _interopRequireDefault(_lodashResult);

	var _base_object = __webpack_require__(5);

	var _base_object2 = _interopRequireDefault(_base_object);

	var delegateEventSplitter = /^(\S+)\s*(.*)$/;

	/**
	 * A base class to create ui object.
	 * @class UIObject
	 * @constructor
	 * @extends BaseObject
	 * @module base
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
	        var attrs = _clapprZepto2['default'].extend({}, (0, _lodashResult2['default'])(this, 'attributes'));
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
/* 19 */
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

	var baseGet = __webpack_require__(20),
	    baseSlice = __webpack_require__(21),
	    toPath = __webpack_require__(22),
	    isArray = __webpack_require__(23),
	    isFunction = __webpack_require__(24);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

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
	 * This method is like `_.get` except that if the resolved value is a function
	 * it is invoked with the `this` binding of its parent object and its result
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
	 * _.result(object, 'a.b.c', 'default');
	 * // => 'default'
	 *
	 * _.result(object, 'a.b.c', _.constant('default'));
	 * // => 'default'
	 */
	function result(object, path, defaultValue) {
	  var result = object == null ? undefined : object[path];
	  if (result === undefined) {
	    if (object != null && !isKey(path, object)) {
	      path = toPath(path);
	      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	      result = object == null ? undefined : object[last(path)];
	    }
	    result = result === undefined ? defaultValue : result;
	  }
	  return isFunction(result) ? result.call(object) : result;
	}

	module.exports = result;

/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * lodash 3.7.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

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
	'use strict';

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

	module.exports = baseGet;

/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
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
	"use strict";

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

	module.exports = baseSlice;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.8.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var isArray = __webpack_require__(23);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

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

	module.exports = toPath;

/***/ },
/* 23 */
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
/* 24 */
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(26);

/***/ },
/* 26 */
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

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseBase_object = __webpack_require__(5);

	var _baseBase_object2 = _interopRequireDefault(_baseBase_object);

	var _baseEvents = __webpack_require__(6);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _componentsContainer = __webpack_require__(27);

	var _componentsContainer2 = _interopRequireDefault(_componentsContainer);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _lodashFind = __webpack_require__(31);

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
	      options = _clapprZepto2['default'].extend({}, this.options, { src: source }, options);
	      var playbackPlugin = this.findPlaybackPlugin(source);
	      var playback = new playbackPlugin(options);
	      var container = new _componentsContainer2['default']({ playback: playback });
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
	        var options = _clapprZepto2['default'].extend(_this3.options, { container: container, src: source });
	        container.addPlugin(new Plugin(options));
	      });
	    }
	  }]);

	  return ContainerFactory;
	})(_baseBase_object2['default']);

	exports['default'] = ContainerFactory;
	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(28);

/***/ },
/* 28 */
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

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseEvents = __webpack_require__(6);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _baseUi_object = __webpack_require__(18);

	var _baseUi_object2 = _interopRequireDefault(_baseUi_object);

	var _baseStyler = __webpack_require__(16);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _publicStyleScss = __webpack_require__(29);

	var _publicStyleScss2 = _interopRequireDefault(_publicStyleScss);

	var _lodashFind = __webpack_require__(31);

	var _lodashFind2 = _interopRequireDefault(_lodashFind);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	/**
	 * An abstraction to represent a container for a given playback
	 * TODO: describe its responsabilities
	 * @class Container
	 * @constructor
	 * @extends UIObject
	 * @module base
	 */

	var Container = (function (_UIObject) {
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
	      return { 'class': 'container', 'data-container': '' };
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
	     * it builds a container
	     * @method constructor
	     * @param {Object} options the options object
	     */
	  }]);

	  function Container(options) {
	    _classCallCheck(this, Container);

	    _get(Object.getPrototypeOf(Container.prototype), 'constructor', this).call(this, options);
	    this.currentTime = 0;
	    this.volume = 100;
	    this.playback = options.playback;
	    this.settings = _clapprZepto2['default'].extend({}, this.playback.settings);
	    this.isReady = false;
	    this.mediaControlDisabled = false;
	    this.plugins = [this.playback];
	    this.bindEvents();
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
	    value: function playbackStateChanged(state) {
	      this.trigger(_baseEvents2['default'].CONTAINER_PLAYBACKSTATE, state);
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

	    /**
	     * returns `true` if DVR is enable otherwise `false`.
	     * @method isDvrEnabled
	     * @return {Boolean}
	     */
	  }, {
	    key: 'isDvrEnabled',
	    value: function isDvrEnabled() {
	      return !!this.playback.dvrEnabled;
	    }

	    /**
	     * returns `true` if DVR is in use otherwise `false`.
	     * @method isDvrInUse
	     * @return {Boolean}
	     */
	  }, {
	    key: 'isDvrInUse',
	    value: function isDvrInUse() {
	      return !!this.dvrInUse;
	    }

	    /**
	     * destroys the container
	     * @method destroy
	     */
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
	    value: function loadedMetadata(metadata) {
	      this.trigger(_baseEvents2['default'].CONTAINER_LOADEDMETADATA, metadata);
	    }
	  }, {
	    key: 'timeUpdated',
	    value: function timeUpdated(timeProgress) {
	      this.currentTime = timeProgress.current;
	      this.trigger(_baseEvents2['default'].CONTAINER_TIMEUPDATE, timeProgress, this.name);
	    }
	  }, {
	    key: 'progress',
	    value: function progress(progressObj) {
	      this.trigger(_baseEvents2['default'].CONTAINER_PROGRESS, progressObj, this.name);
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

	    /**
	     * plays the playback
	     * @method play
	     */
	  }, {
	    key: 'play',
	    value: function play() {
	      this.playback.play();
	    }

	    /**
	     * stops the playback
	     * @method stop
	     */
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.trigger(_baseEvents2['default'].CONTAINER_STOP, this.name);
	      this.playback.stop();
	      this.currentTime = 0;
	    }

	    /**
	     * pauses the playback
	     * @method pause
	     */
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
	    key: 'onContextMenu',
	    value: function onContextMenu() {
	      this.trigger(_baseEvents2['default'].CONTAINER_CONTEXTMENU, this, this.name);
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
	      this.volume = parseInt(value, 10);
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

	    /**
	     * adds plugin to the container
	     * @method addPlugin
	     * @param {Object} plugin
	     */
	  }, {
	    key: 'addPlugin',
	    value: function addPlugin(plugin) {
	      this.plugins.push(plugin);
	    }

	    /**
	     * checks if a plugin, given its name, exist
	     * @method addPlugin
	     * @param {String} name
	     */
	  }, {
	    key: 'hasPlugin',
	    value: function hasPlugin(name) {
	      return !!this.getPlugin(name);
	    }

	    /**
	     * get the plugin given its name
	     * @method getPlugin
	     * @param {String} name
	     */
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
	    value: function highDefinitionUpdate(isHD) {
	      this.trigger(_baseEvents2['default'].CONTAINER_HIGHDEFINITIONUPDATE, isHD);
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(30)();
	// imports


	// module
	exports.push([module.id, ".container[data-container] {\n  position: absolute;\n  background-color: black;\n  height: 100%;\n  width: 100%; }\n  .container[data-container].pointer-enabled {\n    cursor: pointer; }\n", ""]);

	// exports


/***/ },
/* 30 */
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
/* 31 */
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

	var baseCallback = __webpack_require__(32),
	    baseEach = __webpack_require__(41),
	    baseFind = __webpack_require__(42),
	    baseFindIndex = __webpack_require__(43),
	    isArray = __webpack_require__(34);

	/**
	 * Creates a `_.find` or `_.findLast` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new find function.
	 */
	function createFind(eachFunc, fromRight) {
	  return function (collection, predicate, thisArg) {
	    predicate = baseCallback(predicate, thisArg, 3);
	    if (isArray(collection)) {
	      var index = baseFindIndex(collection, predicate, fromRight);
	      return index > -1 ? collection[index] : undefined;
	    }
	    return baseFind(collection, predicate, eachFunc);
	  };
	}

	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	 * invoked with three arguments: (value, index|key, collection).
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
	 * @alias detect
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': true },
	 *   { 'user': 'fred',    'age': 40, 'active': false },
	 *   { 'user': 'pebbles', 'age': 1,  'active': true }
	 * ];
	 *
	 * _.result(_.find(users, function(chr) {
	 *   return chr.age < 40;
	 * }), 'user');
	 * // => 'barney'
	 *
	 * // using the `_.matches` callback shorthand
	 * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
	 * // => 'pebbles'
	 *
	 * // using the `_.matchesProperty` callback shorthand
	 * _.result(_.find(users, 'active', false), 'user');
	 * // => 'fred'
	 *
	 * // using the `_.property` callback shorthand
	 * _.result(_.find(users, 'active'), 'user');
	 * // => 'barney'
	 */
	var find = createFind(baseEach);

	module.exports = find;

/***/ },
/* 32 */
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

	var baseIsEqual = __webpack_require__(33),
	    bindCallback = __webpack_require__(39),
	    isArray = __webpack_require__(34),
	    pairs = __webpack_require__(40);

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
/* 33 */
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

	var isArray = __webpack_require__(34),
	    isTypedArray = __webpack_require__(35),
	    keys = __webpack_require__(36);

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
	    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
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
/* 34 */
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
/* 35 */
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
/* 36 */
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

	var getNative = __webpack_require__(37),
	    isArguments = __webpack_require__(38),
	    isArray = __webpack_require__(34);

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
/* 37 */
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
/* 38 */
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
/* 39 */
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
/* 40 */
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

	var keys = __webpack_require__(36);

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
/* 41 */
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

	var keys = __webpack_require__(36);

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
/* 42 */
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
/* 43 */
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(45);

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright 2014 Globo.com Player authors. All rights reserved.
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

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUtils = __webpack_require__(2);

	var _baseEvents = __webpack_require__(6);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _baseKibo = __webpack_require__(9);

	var _baseKibo2 = _interopRequireDefault(_baseKibo);

	var _baseStyler = __webpack_require__(16);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _baseUi_object = __webpack_require__(18);

	var _baseUi_object2 = _interopRequireDefault(_baseUi_object);

	var _componentsBrowser = __webpack_require__(3);

	var _componentsBrowser2 = _interopRequireDefault(_componentsBrowser);

	var _componentsSeek_time = __webpack_require__(47);

	var _componentsSeek_time2 = _interopRequireDefault(_componentsSeek_time);

	var _componentsMediator = __webpack_require__(51);

	var _componentsMediator2 = _interopRequireDefault(_componentsMediator);

	var _baseTemplate = __webpack_require__(17);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _publicMediaControlScss = __webpack_require__(52);

	var _publicMediaControlScss2 = _interopRequireDefault(_publicMediaControlScss);

	var _publicMediaControlHtml = __webpack_require__(57);

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
	    this.options = options;
	    this.mute = this.options.mute;
	    this.persistConfig = this.options.persistConfig;
	    this.container = options.container;
	    this.seekTime = new _componentsSeek_time2['default'](this);
	    this.currentPositionValue = null;
	    this.currentDurationValue = null;
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

	    if (!_clapprZepto2['default'].isEmptyObject(this.container.settings)) {
	      this.settings = _clapprZepto2['default'].extend({}, this.container.settings);
	    }

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
	      _componentsMediator2['default'].on(this.options.playerId + ':' + _baseEvents2['default'].PLAYER_RESIZE, this.playerResize, this);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_PLAY, this.changeTogglePlay);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_PAUSE, this.changeTogglePlay);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_DBLCLICK, this.toggleFullscreen);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_TIMEUPDATE, this.onTimeUpdate);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_PROGRESS, this.updateProgressBar);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_SETTINGSUPDATE, this.settingsUpdate);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_PLAYBACKDVRSTATECHANGED, this.settingsUpdate);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_HIGHDEFINITIONUPDATE, this.highDefinitionUpdate);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_MEDIACONTROL_DISABLE, this.disable);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_MEDIACONTROL_ENABLE, this.enable);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_ENDED, this.ended);
	      this.listenTo(this.container, _baseEvents2['default'].CONTAINER_VOLUME, this.onVolumeChanged);
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
	    key: 'onVolumeChanged',
	    value: function onVolumeChanged(event) {
	      this.mute = this.currentVolume === 0;
	      this.setVolumeLevel(event);
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
	      this.$el.addClass('dragging');
	      this.volumeBarClickDown = true;
	    }
	  }, {
	    key: 'mouseupOnVolumeBar',
	    value: function mouseupOnVolumeBar() {
	      this.$el.removeClass('dragging');
	      this.volumeBarClickDown = false;
	    }
	  }, {
	    key: 'mouseleaveOnVolumeBar',
	    value: function mouseleaveOnVolumeBar(event) {
	      var volOffset = this.$volumeBarContainer.offset();

	      var outsideByLeft = event.pageX < volOffset.left;
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
	      _componentsMediator2['default'].off(this.options.playerId + ':' + _baseEvents2['default'].PLAYER_RESIZE, this.playerResize, this);
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
	    value: function updateProgressBar(progress) {
	      var loadedStart = progress.start / progress.total * 100;
	      var loadedEnd = progress.current / progress.total * 100;
	      this.$seekBarLoaded.css({ left: loadedStart + '%', width: loadedEnd - loadedStart + '%' });
	    }
	  }, {
	    key: 'onTimeUpdate',
	    value: function onTimeUpdate(timeProgress) {
	      if (this.draggingSeekBar) return;
	      // TODO why should current time ever be negative?
	      var position = timeProgress.current < 0 ? timeProgress.total : timeProgress.current;

	      this.currentPositionValue = position;
	      this.currentDurationValue = timeProgress.total;
	      this.renderSeekBar();
	    }
	  }, {
	    key: 'renderSeekBar',
	    value: function renderSeekBar() {
	      if (this.currentPositionValue === null || this.currentDurationValue === null) {
	        // this will be triggered as soon as these beocome available
	        return;
	      }

	      // default to 100%
	      this.currentSeekBarPercentage = 100;
	      // true if dvr is enabled but not in use. E.g. live stream with dvr but at live point
	      var dvrEnabledButNotInUse = this.container.isDvrEnabled() && !this.container.isDvrInUse();
	      if (!dvrEnabledButNotInUse) {
	        this.currentSeekBarPercentage = this.currentPositionValue / this.currentDurationValue * 100;
	      }
	      this.setSeekPercentage(this.currentSeekBarPercentage);

	      var newPosition = (0, _baseUtils.formatTime)(this.currentPositionValue);
	      var newDuration = (0, _baseUtils.formatTime)(this.currentDurationValue);
	      if (newPosition !== this.displayedPosition) {
	        this.$position.text(newPosition);
	        this.displayedPosition = newPosition;
	      }
	      if (newDuration !== this.displayedDuration) {
	        this.$duration.text(newDuration);
	        this.displayedDuration = newDuration;
	      }
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
	    key: 'remove',
	    value: function remove() {
	      this.seekTime.remove();
	      _get(Object.getPrototypeOf(MediaControl.prototype), 'remove', this).call(this);
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
	      var settingsChanged = JSON.stringify(this.settings) !== JSON.stringify(this.container.settings);
	      if (this.container.getPlaybackType() && settingsChanged) {
	        this.settings = _clapprZepto2['default'].extend({}, this.container.settings);
	        this.render();
	      }
	    }
	  }, {
	    key: 'highDefinitionUpdate',
	    value: function highDefinitionUpdate(isHD) {
	      var method = !!isHD ? 'addClass' : 'removeClass';
	      this.$el.find('button[data-hd-indicator]')[method]('enabled');
	    }
	  }, {
	    key: 'createCachedElements',
	    value: function createCachedElements() {
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
	      this.resetIndicators();
	    }
	  }, {
	    key: 'resetIndicators',
	    value: function resetIndicators() {
	      this.displayedPosition = this.$position.text();
	      this.displayedDuration = this.$duration.text();
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
	      this.kibo.off('left');
	      this.kibo.off('right');
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
	      this.remove();
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

	      if (_componentsBrowser2['default'].isSafari && _componentsBrowser2['default'].isMobile) {
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

	        _this7.setVolume(_this7.currentVolume);
	        _this7.bindKeyEvents();
	        _this7.playerResize({ width: _this7.options.width, height: _this7.options.height });
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(46)))

/***/ },
/* 46 */
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(48);

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUtils = __webpack_require__(2);

	var _baseUi_object = __webpack_require__(18);

	var _baseUi_object2 = _interopRequireDefault(_baseUi_object);

	var _baseStyler = __webpack_require__(16);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _baseTemplate = __webpack_require__(17);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _baseEvents = __webpack_require__(6);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _publicSeek_timeScss = __webpack_require__(49);

	var _publicSeek_timeScss2 = _interopRequireDefault(_publicSeek_timeScss);

	var _publicSeek_timeHtml = __webpack_require__(50);

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
	        'class': 'seek-time',
	        'data-seek-time': ''
	      };
	    }
	  }]);

	  function SeekTime(mediaControl) {
	    _classCallCheck(this, SeekTime);

	    _get(Object.getPrototypeOf(SeekTime.prototype), 'constructor', this).call(this);
	    this.mediaControl = mediaControl;
	    this.mediaControlContainer = this.mediaControl.container;
	    this.rendered = false;
	    this.hoveringOverSeekBar = false;
	    this.hoverPosition = null;
	    this.duration = null;
	    this.durationShown = false;
	    this.addEventListeners();
	  }

	  _createClass(SeekTime, [{
	    key: 'addEventListeners',
	    value: function addEventListeners() {
	      this.listenTo(this.mediaControl, _baseEvents2['default'].MEDIACONTROL_MOUSEMOVE_SEEKBAR, this.showTime);
	      this.listenTo(this.mediaControl, _baseEvents2['default'].MEDIACONTROL_MOUSELEAVE_SEEKBAR, this.hideTime);
	      this.listenTo(this.mediaControl, _baseEvents2['default'].MEDIACONTROL_CONTAINERCHANGED, this.onContainerChanged);
	      this.listenTo(this.mediaControlContainer, _baseEvents2['default'].CONTAINER_TIMEUPDATE, this.updateDuration);
	    }
	  }, {
	    key: 'onContainerChanged',
	    value: function onContainerChanged() {
	      this.stopListening(this.mediaControlContainer, _baseEvents2['default'].CONTAINER_TIMEUPDATE, this.updateDuration);
	      this.mediaControlContainer = this.mediaControl.container;
	      this.listenTo(this.mediaControlContainer, _baseEvents2['default'].CONTAINER_TIMEUPDATE, this.updateDuration);
	    }
	  }, {
	    key: 'showDuration',
	    value: function showDuration() {
	      this.durationShown = true;
	      this.update();
	    }
	  }, {
	    key: 'hideDuration',
	    value: function hideDuration() {
	      this.durationShown = false;
	      this.update();
	    }
	  }, {
	    key: 'updateDuration',
	    value: function updateDuration(timeProgress) {
	      this.duration = timeProgress.total;
	      this.update();
	    }
	  }, {
	    key: 'showTime',
	    value: function showTime(event) {
	      this.hoveringOverSeekBar = true;
	      this.calculateHoverPosition(event);
	      this.update();
	    }
	  }, {
	    key: 'hideTime',
	    value: function hideTime() {
	      this.hoveringOverSeekBar = false;
	      this.update();
	    }
	  }, {
	    key: 'calculateHoverPosition',
	    value: function calculateHoverPosition(event) {
	      var offset = event.pageX - this.mediaControl.$seekBarContainer.offset().left;
	      // proportion into the seek bar that the mouse is hovered over 0-1
	      this.hoverPosition = Math.min(1, Math.max(offset / this.mediaControl.$seekBarContainer.width(), 0));
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      if (!this.rendered) {
	        // update() is always called after a render
	        return;
	      }
	      if (!this.shouldBeVisible()) {
	        this.$el.hide();
	        this.$el.css('left', "-100%");
	      } else {
	        var seekTime = this.hoverPosition * this.duration;
	        var currentSeekTime = (0, _baseUtils.formatTime)(seekTime);
	        // only update dom if necessary, ie time actually changed
	        if (currentSeekTime !== this.displayedSeekTime) {
	          this.$seekTimeEl.text(currentSeekTime);
	          this.displayedSeekTime = currentSeekTime;
	        }

	        if (this.durationShown) {
	          this.$durationEl.show();
	          var currentDuration = (0, _baseUtils.formatTime)(this.duration);
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
	    }
	  }, {
	    key: 'shouldBeVisible',
	    value: function shouldBeVisible() {
	      return this.mediaControlContainer.settings.seekEnabled && this.hoveringOverSeekBar && this.hoverPosition !== null && this.duration !== null;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.rendered = true;
	      this.displayedDuration = null;
	      this.displayedSeekTime = null;
	      var style = _baseStyler2['default'].getStyleFor(_publicSeek_timeScss2['default']);
	      this.$el.html(this.template());
	      this.$el.append(style);
	      this.$el.hide();
	      this.mediaControl.$el.append(this.el);
	      this.$seekTimeEl = this.$el.find('[data-seek-time]');
	      this.$durationEl = this.$el.find('[data-duration]');
	      this.$durationEl.hide();
	      this.update();
	    }
	  }]);

	  return SeekTime;
	})(_baseUi_object2['default']);

	exports['default'] = SeekTime;
	module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(30)();
	// imports


	// module
	exports.push([module.id, ".seek-time[data-seek-time] {\n  position: absolute;\n  white-space: nowrap;\n  width: auto;\n  height: 20px;\n  line-height: 20px;\n  left: -100%;\n  bottom: 55px;\n  background-color: rgba(2, 2, 2, 0.5);\n  z-index: 9999;\n  -webkit-transition: opacity 0.1s ease;\n  -moz-transition: opacity 0.1s ease false;\n  -o-transition: opacity 0.1s ease false;\n  transition: opacity 0.1s ease; }\n  .seek-time[data-seek-time].hidden[data-seek-time] {\n    opacity: 0; }\n  .seek-time[data-seek-time] span[data-seek-time] {\n    position: relative;\n    color: white;\n    font-size: 10px;\n    padding-left: 7px;\n    padding-right: 7px; }\n", ""]);

	// exports


/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = "<span data-seek-time></span>\n<span data-duration></span>\n";

/***/ },
/* 51 */
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

	var _baseEvents = __webpack_require__(6);

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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(30)();
	// imports


	// module
	exports.push([module.id, "@font-face {\n  font-family: \"Player\";\n  src: url(" + __webpack_require__(53) + ");\n  src: url(" + __webpack_require__(53) + "?#iefix) format(\"embedded-opentype\"), url(" + __webpack_require__(54) + ") format(\"truetype\"), url(" + __webpack_require__(55) + "#player) format(\"svg\"); }\n\n.media-control-notransition {\n  -webkit-transition: none !important false;\n  -moz-transition: none !important false false;\n  -o-transition: none !important false false;\n  transition: none !important; }\n\n.media-control[data-media-control] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  z-index: 9999;\n  pointer-events: none; }\n  .media-control[data-media-control].dragging {\n    pointer-events: auto;\n    cursor: -webkit-grabbing !important;\n    cursor: grabbing !important;\n    cursor: url(" + __webpack_require__(56) + "), move; }\n    .media-control[data-media-control].dragging * {\n      cursor: -webkit-grabbing !important;\n      cursor: grabbing !important;\n      cursor: url(" + __webpack_require__(56) + "), move; }\n  .media-control[data-media-control] .media-control-background[data-background] {\n    position: absolute;\n    height: 40%;\n    width: 100%;\n    bottom: 0;\n    background: -owg-linear-gradient(transparent, rgba(0, 0, 0, 0.9));\n    background: -webkit-linear-gradient(transparent, rgba(0, 0, 0, 0.9));\n    background: -moz-linear-gradient(transparent, rgba(0, 0, 0, 0.9));\n    background: -o-linear-gradient(transparent, rgba(0, 0, 0, 0.9));\n    -pie-background: -pie-linear-gradient(transparent, rgba(0, 0, 0, 0.9));\n    background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));\n    -webkit-transition: opacity 0.6s ease-out;\n    -moz-transition: opacity 0.6s ease-out false;\n    -o-transition: opacity 0.6s ease-out false;\n    transition: opacity 0.6s ease-out; }\n  .media-control[data-media-control] .media-control-icon {\n    font-family: \"Player\";\n    font-weight: normal;\n    font-style: normal;\n    font-size: 26px;\n    line-height: 32px;\n    letter-spacing: 0;\n    speak: none;\n    color: #fff;\n    opacity: 0.5;\n    vertical-align: middle;\n    text-align: left;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-transition: all 0.1s ease;\n    -moz-transition: all 0.1s ease false;\n    -o-transition: all 0.1s ease false;\n    transition: all 0.1s ease; }\n  .media-control[data-media-control] .media-control-icon:hover {\n    color: white;\n    opacity: 0.75;\n    text-shadow: rgba(255, 255, 255, 0.8) 0 0 5px; }\n  .media-control[data-media-control].media-control-hide .media-control-background[data-background] {\n    opacity: 0; }\n  .media-control[data-media-control].media-control-hide .media-control-layer[data-controls] {\n    bottom: -50px; }\n    .media-control[data-media-control].media-control-hide .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar] {\n      opacity: 0; }\n  .media-control[data-media-control] .media-control-layer[data-controls] {\n    position: absolute;\n    bottom: 7px;\n    width: 100%;\n    height: 32px;\n    vertical-align: middle;\n    pointer-events: auto;\n    -webkit-transition: bottom 0.4s ease-out;\n    -moz-transition: bottom 0.4s ease-out false;\n    -o-transition: bottom 0.4s ease-out false;\n    transition: bottom 0.4s ease-out; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-left-panel[data-media-control] {\n      position: absolute;\n      top: 0;\n      left: 4px;\n      height: 100%; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-center-panel[data-media-control] {\n      height: 100%;\n      text-align: center;\n      line-height: 32px; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-right-panel[data-media-control] {\n      position: absolute;\n      top: 0;\n      right: 4px;\n      height: 100%; }\n    .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button {\n      background-color: transparent;\n      border: 0;\n      margin: 0 6px;\n      padding: 0;\n      cursor: pointer;\n      display: inline-block; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button:focus {\n        outline: none; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play] {\n        float: left;\n        height: 100%;\n        font-size: 20px; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play]:before {\n          content: \"\\E001\"; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause] {\n        float: left;\n        height: 100%;\n        font-size: 20px; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause]:before {\n          content: \"\\E002\"; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop] {\n        float: left;\n        height: 100%;\n        font-size: 20px; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop]:before {\n          content: \"\\E003\"; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen] {\n        float: right;\n        background-color: transparent;\n        border: 0;\n        height: 100%; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen]:before {\n          content: \"\\E006\"; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen].shrink:before {\n          content: \"\\E007\"; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator] {\n        cursor: default;\n        float: right;\n        background-color: transparent;\n        border: 0;\n        height: 100%;\n        opacity: 0; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator]:before {\n          content: \"\\E008\"; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled {\n          opacity: 1.0; }\n          .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled:hover {\n            opacity: 1.0;\n            text-shadow: none; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause] {\n        float: left;\n        height: 100%;\n        font-size: 20px; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]:before {\n          content: \"\\E001\"; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].playing:before {\n          content: \"\\E002\"; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].paused:before {\n          content: \"\\E001\"; }\n      .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop] {\n        float: left;\n        height: 100%;\n        font-size: 20px; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop]:before {\n          content: \"\\E001\"; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].playing:before {\n          content: \"\\E003\"; }\n        .media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].stopped:before {\n          content: \"\\E001\"; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position], .media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration] {\n      display: inline-block;\n      font-size: 10px;\n      color: white;\n      cursor: default;\n      line-height: 32px;\n      position: relative; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position] {\n      margin-left: 6px; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration] {\n      color: rgba(255, 255, 255, 0.5);\n      margin-right: 6px; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration]:before {\n        content: \"|\";\n        margin: 0 3px; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] {\n      position: absolute;\n      top: -20px;\n      left: 0;\n      display: inline-block;\n      vertical-align: middle;\n      width: 100%;\n      height: 25px;\n      cursor: pointer; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] {\n        width: 100%;\n        height: 1px;\n        position: relative;\n        top: 12px;\n        background-color: #666666; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-1[data-seekbar] {\n          position: absolute;\n          top: 0;\n          left: 0;\n          width: 0;\n          height: 100%;\n          background-color: #c2c2c2;\n          -webkit-transition: all 0.1s ease-out;\n          -moz-transition: all 0.1s ease-out false;\n          -o-transition: all 0.1s ease-out false;\n          transition: all 0.1s ease-out; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar] {\n          position: absolute;\n          top: 0;\n          left: 0;\n          width: 0;\n          height: 100%;\n          background-color: #005aff;\n          -webkit-transition: all 0.1s ease-out;\n          -moz-transition: all 0.1s ease-out false;\n          -o-transition: all 0.1s ease-out false;\n          transition: all 0.1s ease-out; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-hover[data-seekbar] {\n          opacity: 0;\n          position: absolute;\n          top: -3px;\n          width: 5px;\n          height: 7px;\n          background-color: rgba(255, 255, 255, 0.5);\n          -webkit-transition: opacity 0.1s ease;\n          -moz-transition: opacity 0.1s ease false;\n          -o-transition: opacity 0.1s ease false;\n          transition: opacity 0.1s ease; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar]:hover .bar-background[data-seekbar] .bar-hover[data-seekbar] {\n        opacity: 1; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled {\n        cursor: default; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled:hover .bar-background[data-seekbar] .bar-hover[data-seekbar] {\n          opacity: 0; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar] {\n        position: absolute;\n        -webkit-transform: translateX(-50%);\n        -moz-transform: translateX(-50%);\n        -ms-transform: translateX(-50%);\n        -o-transform: translateX(-50%);\n        transform: translateX(-50%);\n        top: 2px;\n        left: 0;\n        width: 20px;\n        height: 20px;\n        opacity: 1;\n        -webkit-transition: all 0.1s ease-out;\n        -moz-transition: all 0.1s ease-out false;\n        -o-transition: all 0.1s ease-out false;\n        transition: all 0.1s ease-out; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar] .bar-scrubber-icon[data-seekbar] {\n          position: absolute;\n          left: 6px;\n          top: 6px;\n          width: 8px;\n          height: 8px;\n          border-radius: 10px;\n          box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.2);\n          background-color: white; }\n    .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] {\n      float: right;\n      display: inline-block;\n      height: 32px;\n      cursor: pointer;\n      margin: 0 6px;\n      box-sizing: border-box; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] {\n        float: left;\n        bottom: 0; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume] {\n          background-color: transparent;\n          border: 0;\n          box-sizing: content-box;\n          width: 16px;\n          height: 32px;\n          margin-right: 6px;\n          opacity: 1; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:hover {\n            opacity: 1; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:before {\n            content: \"\\E004\"; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted {\n            opacity: 0.5; }\n            .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:hover {\n              opacity: 0.7; }\n            .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:before {\n              content: \"\\E005\"; }\n      .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] {\n        float: left;\n        position: relative;\n        top: 6px;\n        width: 42px;\n        height: 18px;\n        padding: 3px 0;\n        overflow: hidden;\n        -webkit-transition: width 0.2s ease-out;\n        -moz-transition: width 0.2s ease-out false;\n        -o-transition: width 0.2s ease-out false;\n        transition: width 0.2s ease-out; }\n        .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume] {\n          float: left;\n          width: 4px;\n          padding-left: 2px;\n          height: 12px;\n          opacity: 0.5;\n          -webkit-box-shadow: inset 2px 0 0 white;\n          -moz-box-shadow: inset 2px 0 0 white;\n          box-shadow: inset 2px 0 0 white;\n          -webkit-transition: -webkit-transform 0.2s ease-out;\n          -moz-transition: -moz-transform 0.2s ease-out false;\n          -o-transition: -o-transform 0.2s ease-out false;\n          transition: transform 0.2s ease-out; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume].fill {\n            -webkit-box-shadow: inset 2px 0 0 #fff;\n            -moz-box-shadow: inset 2px 0 0 #fff;\n            box-shadow: inset 2px 0 0 #fff;\n            opacity: 1; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:nth-of-type(1) {\n            padding-left: 0; }\n          .media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:hover {\n            -webkit-transform: scaleY(1.5);\n            -moz-transform: scaleY(1.5);\n            -ms-transform: scaleY(1.5);\n            -o-transform: scaleY(1.5);\n            transform: scaleY(1.5); }\n  .media-control[data-media-control].w320 .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume].volume-bar-hide {\n    height: 12px;\n    top: 9px;\n    padding: 0;\n    width: 0; }\n", ""]);

	// exports


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ed8735c27adb521e625717506cfcfb04.eot";

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "3e43a5d764f841e7e78896de82cd6c50.ttf";

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "5d7ec830fd8d1c440f165111719aa4a0.svg";

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "a8c874b93b3d848f39a71260c57e3863.cur";

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = "<div class=\"media-control-background\" data-background></div>\n<div class=\"media-control-layer\" data-controls>\n  <%  var renderBar = function(name) { %>\n      <div class=\"bar-container\" data-<%= name %>>\n        <div class=\"bar-background\" data-<%= name %>>\n          <div class=\"bar-fill-1\" data-<%= name %>></div>\n          <div class=\"bar-fill-2\" data-<%= name %>></div>\n          <div class=\"bar-hover\" data-<%= name %>></div>\n        </div>\n        <div class=\"bar-scrubber\" data-<%= name %>>\n          <div class=\"bar-scrubber-icon\" data-<%= name %>></div>\n        </div>\n      </div>\n  <%  }; %>\n  <%  var renderSegmentedBar = function(name, segments) {\n      segments = segments || 10; %>\n    <div class=\"bar-container\" data-<%= name %>>\n    <% for (var i = 0; i < segments; i++) { %>\n      <div class=\"segmented-bar-element\" data-<%= name %>></div>\n    <% } %>\n    </div>\n  <% }; %>\n  <% var renderDrawer = function(name, renderContent) { %>\n      <div class=\"drawer-container\" data-<%= name %>>\n        <div class=\"drawer-icon-container\" data-<%= name %>>\n          <div class=\"drawer-icon media-control-icon\" data-<%= name %>></div>\n          <span class=\"drawer-text\" data-<%= name %>></span>\n        </div>\n        <% renderContent(name); %>\n      </div>\n  <% }; %>\n  <% var renderIndicator = function(name) { %>\n      <div class=\"media-control-indicator\" data-<%= name %>></div>\n  <% }; %>\n  <% var renderButton = function(name) { %>\n      <button class=\"media-control-button media-control-icon\" data-<%= name %>></button>\n  <% }; %>\n  <%  var templates = {\n        bar: renderBar,\n        segmentedBar: renderSegmentedBar,\n      };\n      var render = function(settingsList) {\n        settingsList.forEach(function(setting) {\n          if(setting === \"seekbar\") {\n            renderBar(setting);\n          } else if (setting === \"volume\") {\n            renderDrawer(setting, settings.volumeBarTemplate ? templates[settings.volumeBarTemplate] : function(name) { return renderSegmentedBar(name); });\n          } else if (setting === \"duration\" || setting === \"position\") {\n            renderIndicator(setting);\n          } else {\n            renderButton(setting);\n          }\n        });\n      }; %>\n  <% if (settings.default && settings.default.length) { %>\n  <div class=\"media-control-center-panel\" data-media-control>\n    <% render(settings.default); %>\n  </div>\n  <% } %>\n  <% if (settings.left && settings.left.length) { %>\n  <div class=\"media-control-left-panel\" data-media-control>\n    <% render(settings.left); %>\n  </div>\n  <% } %>\n  <% if (settings.right && settings.right.length) { %>\n  <div class=\"media-control-right-panel\" data-media-control>\n    <% render(settings.right); %>\n  </div>\n  <% } %>\n</div>\n";

/***/ },
/* 58 */
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(30)();
	// imports


	// module
	exports.push([module.id, "[data-player] {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -o-user-select: none;\n  user-select: none;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-transform: translate3d(0, 0, 0);\n  -moz-transform: translate3d(0, 0, 0);\n  -ms-transform: translate3d(0, 0, 0);\n  -o-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n  position: relative;\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-style: normal;\n  font-weight: normal;\n  text-align: center;\n  overflow: hidden;\n  font-size: 100%;\n  font-family: \"lucida grande\", tahoma, verdana, arial, sans-serif;\n  text-shadow: 0 0 0;\n  box-sizing: border-box; }\n  [data-player] div, [data-player] span, [data-player] applet, [data-player] object, [data-player] iframe,\n  [data-player] h1, [data-player] h2, [data-player] h3, [data-player] h4, [data-player] h5, [data-player] h6, [data-player] p, [data-player] blockquote, [data-player] pre,\n  [data-player] a, [data-player] abbr, [data-player] acronym, [data-player] address, [data-player] big, [data-player] cite, [data-player] code,\n  [data-player] del, [data-player] dfn, [data-player] em, [data-player] img, [data-player] ins, [data-player] kbd, [data-player] q, [data-player] s, [data-player] samp,\n  [data-player] small, [data-player] strike, [data-player] strong, [data-player] sub, [data-player] sup, [data-player] tt, [data-player] var,\n  [data-player] b, [data-player] u, [data-player] i, [data-player] center,\n  [data-player] dl, [data-player] dt, [data-player] dd, [data-player] ol, [data-player] ul, [data-player] li,\n  [data-player] fieldset, [data-player] form, [data-player] label, [data-player] legend,\n  [data-player] table, [data-player] caption, [data-player] tbody, [data-player] tfoot, [data-player] thead, [data-player] tr, [data-player] th, [data-player] td,\n  [data-player] article, [data-player] aside, [data-player] canvas, [data-player] details, [data-player] embed,\n  [data-player] figure, [data-player] figcaption, [data-player] footer, [data-player] header, [data-player] hgroup,\n  [data-player] menu, [data-player] nav, [data-player] output, [data-player] ruby, [data-player] section, [data-player] summary,\n  [data-player] time, [data-player] mark, [data-player] audio, [data-player] video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font: inherit;\n    font-size: 100%;\n    vertical-align: baseline; }\n  [data-player] table {\n    border-collapse: collapse;\n    border-spacing: 0; }\n  [data-player] caption, [data-player] th, [data-player] td {\n    text-align: left;\n    font-weight: normal;\n    vertical-align: middle; }\n  [data-player] q, [data-player] blockquote {\n    quotes: none; }\n    [data-player] q:before, [data-player] q:after, [data-player] blockquote:before, [data-player] blockquote:after {\n      content: \"\";\n      content: none; }\n  [data-player] a img {\n    border: none; }\n  [data-player]:focus {\n    outline: 0; }\n  [data-player] * {\n    max-width: none;\n    box-sizing: inherit;\n    float: none; }\n  [data-player] div {\n    display: block; }\n  [data-player].fullscreen {\n    width: 100% !important;\n    height: 100% !important; }\n  [data-player].nocursor {\n    cursor: none; }\n\n.clappr-style {\n  display: none !important; }\n", ""]);

	// exports


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

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseBase_object = __webpack_require__(5);

	var _baseBase_object2 = _interopRequireDefault(_baseBase_object);

	var _componentsPlayer_info = __webpack_require__(58);

	var _componentsPlayer_info2 = _interopRequireDefault(_componentsPlayer_info);

	var _lodashUniq = __webpack_require__(62);

	var _lodashUniq2 = _interopRequireDefault(_lodashUniq);

	/* Playback Plugins */

	var _playbacksHtml5_video = __webpack_require__(79);

	var _playbacksHtml5_video2 = _interopRequireDefault(_playbacksHtml5_video);

	var _playbacksFlash = __webpack_require__(84);

	var _playbacksFlash2 = _interopRequireDefault(_playbacksFlash);

	var _playbacksHtml5_audio = __webpack_require__(91);

	var _playbacksHtml5_audio2 = _interopRequireDefault(_playbacksHtml5_audio);

	var _playbacksFlashls = __webpack_require__(93);

	var _playbacksFlashls2 = _interopRequireDefault(_playbacksFlashls);

	var _playbacksHls = __webpack_require__(97);

	var _playbacksHls2 = _interopRequireDefault(_playbacksHls);

	var _playbacksHtml_img = __webpack_require__(119);

	var _playbacksHtml_img2 = _interopRequireDefault(_playbacksHtml_img);

	var _playbacksNo_op = __webpack_require__(122);

	var _playbacksNo_op2 = _interopRequireDefault(_playbacksNo_op);

	/* Container Plugins */

	var _pluginsSpinner_three_bounce = __webpack_require__(126);

	var _pluginsSpinner_three_bounce2 = _interopRequireDefault(_pluginsSpinner_three_bounce);

	var _pluginsStats = __webpack_require__(131);

	var _pluginsStats2 = _interopRequireDefault(_pluginsStats);

	var _pluginsWatermark = __webpack_require__(134);

	var _pluginsWatermark2 = _interopRequireDefault(_pluginsWatermark);

	var _pluginsPoster = __webpack_require__(138);

	var _pluginsPoster2 = _interopRequireDefault(_pluginsPoster);

	var _pluginsGoogle_analytics = __webpack_require__(142);

	var _pluginsGoogle_analytics2 = _interopRequireDefault(_pluginsGoogle_analytics);

	var _pluginsClick_to_pause = __webpack_require__(144);

	var _pluginsClick_to_pause2 = _interopRequireDefault(_pluginsClick_to_pause);

	/* Core Plugins */

	var _pluginsDvr_controls = __webpack_require__(146);

	var _pluginsDvr_controls2 = _interopRequireDefault(_pluginsDvr_controls);

	var _pluginsFavicon = __webpack_require__(152);

	var _pluginsFavicon2 = _interopRequireDefault(_pluginsFavicon);

	/**
	 * It keeps a list of the default plugins (playback, container, core) and it merges external plugins with its internals.
	 * @class Loader
	 * @constructor
	 * @extends BaseObject
	 * @module components
	 */

	var Loader = (function (_BaseObject) {
	  _inherits(Loader, _BaseObject);

	  /**
	   * builds the loader
	   * @method constructor
	   * @param {Object} externalPlugins the external plugins
	   * @param {Number} playerId you can embed multiple instances of clappr, therefore this is the unique id of each one.
	   */

	  function Loader(externalPlugins, playerId) {
	    _classCallCheck(this, Loader);

	    _get(Object.getPrototypeOf(Loader.prototype), 'constructor', this).call(this);
	    this.playerId = playerId;
	    this.playbackPlugins = [_playbacksHtml5_audio2['default'], _playbacksHtml5_video2['default'], _playbacksFlash2['default'], _playbacksHls2['default'], _playbacksFlashls2['default'], _playbacksHtml_img2['default'], _playbacksNo_op2['default']];
	    this.containerPlugins = [_pluginsSpinner_three_bounce2['default'], _pluginsWatermark2['default'], _pluginsPoster2['default'], _pluginsStats2['default'], _pluginsGoogle_analytics2['default'], _pluginsClick_to_pause2['default']];
	    this.corePlugins = [_pluginsDvr_controls2['default'], _pluginsFavicon2['default']];
	    if (externalPlugins) {
	      this.validateExternalPluginsType(externalPlugins);
	      this.addExternalPlugins(externalPlugins);
	    }
	  }

	  /**
	   * adds all the external plugins that were passed through `options.plugins`
	   * @method addExternalPlugins
	   * @private
	   * @param {Object} plugins the config object with all plugins
	   */

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
	      _componentsPlayer_info2['default'].getInstance(this.playerId).playbackPlugins = this.playbackPlugins;
	    }

	    /**
	     * validate if the external plugins that were passed through `options.plugins` are associated to the correct type
	     * @method validateExternalPluginsType
	     * @private
	     * @param {Object} plugins the config object with all plugins
	     */
	  }, {
	    key: 'validateExternalPluginsType',
	    value: function validateExternalPluginsType(plugins) {
	      var plugintypes = ["playback", "container", "core"];
	      plugintypes.forEach(function (type) {
	        (plugins[type] || []).forEach(function (el) {
	          var errorMessage = "external " + el.type + " plugin on " + type + " array";
	          if (el.type !== type) {
	            throw new ReferenceError(errorMessage);
	          }
	        });
	      });
	    }
	  }]);

	  return Loader;
	})(_baseBase_object2['default']);

	exports['default'] = Loader;
	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.2.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var baseCallback = __webpack_require__(63),
	    baseUniq = __webpack_require__(74),
	    isIterateeCall = __webpack_require__(78);

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
	 * Creates a duplicate-free version of an array, using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons, in which only the first occurence of each element
	 * is kept. Providing `true` for `isSorted` performs a faster search algorithm
	 * for sorted arrays. If an iteratee function is provided it is invoked for
	 * each element in the array to generate the criterion by which uniqueness
	 * is computed. The `iteratee` is bound to `thisArg` and invoked with three
	 * arguments: (value, index, array).
	 *
	 * If a property name is provided for `iteratee` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `iteratee` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @alias unique
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {boolean} [isSorted] Specify the array is sorted.
	 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Array} Returns the new duplicate-value-free array.
	 * @example
	 *
	 * _.uniq([2, 1, 2]);
	 * // => [2, 1]
	 *
	 * // using `isSorted`
	 * _.uniq([1, 1, 2], true);
	 * // => [1, 2]
	 *
	 * // using an iteratee function
	 * _.uniq([1, 2.5, 1.5, 2], function(n) {
	 *   return this.floor(n);
	 * }, Math);
	 * // => [1, 2.5]
	 *
	 * // using the `_.property` callback shorthand
	 * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	 * // => [{ 'x': 1 }, { 'x': 2 }]
	 */
	function uniq(array, isSorted, iteratee, thisArg) {
	  var length = array ? array.length : 0;
	  if (!length) {
	    return [];
	  }
	  if (isSorted != null && typeof isSorted != 'boolean') {
	    thisArg = iteratee;
	    iteratee = isIterateeCall(array, isSorted, thisArg) ? undefined : isSorted;
	    isSorted = false;
	  }
	  iteratee = iteratee == null ? iteratee : baseCallback(iteratee, thisArg, 3);
	  return isSorted ? sortedUniq(array, iteratee) : baseUniq(array, iteratee);
	}

	module.exports = uniq;

/***/ },
/* 63 */
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

	var baseIsEqual = __webpack_require__(64),
	    bindCallback = __webpack_require__(70),
	    isArray = __webpack_require__(65),
	    pairs = __webpack_require__(71);

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
/* 64 */
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

	var isArray = __webpack_require__(65),
	    isTypedArray = __webpack_require__(66),
	    keys = __webpack_require__(67);

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
	    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
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
/* 65 */
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
/* 66 */
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
/* 67 */
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

	var getNative = __webpack_require__(68),
	    isArguments = __webpack_require__(69),
	    isArray = __webpack_require__(65);

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
/* 68 */
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
/* 69 */
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
/* 70 */
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
/* 71 */
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

	var keys = __webpack_require__(72);

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
/* 72 */
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

	var getNative = __webpack_require__(68),
	    isArguments = __webpack_require__(73),
	    isArray = __webpack_require__(65);

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
/* 73 */
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
/* 74 */
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

	var baseIndexOf = __webpack_require__(75),
	    cacheIndexOf = __webpack_require__(76),
	    createCache = __webpack_require__(77);

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
/* 75 */
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
/* 76 */
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
/* 77 */
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

	var getNative = __webpack_require__(68);

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
/* 78 */
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
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(80);

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUtils = __webpack_require__(2);

	var _basePlayback = __webpack_require__(81);

	var _basePlayback2 = _interopRequireDefault(_basePlayback);

	var _baseTemplate = __webpack_require__(17);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _baseStyler = __webpack_require__(16);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _componentsBrowser = __webpack_require__(3);

	var _componentsBrowser2 = _interopRequireDefault(_componentsBrowser);

	var _baseEvents = __webpack_require__(6);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _publicStyleScss = __webpack_require__(82);

	var _publicStyleScss2 = _interopRequireDefault(_publicStyleScss);

	var _publicIndexHtml = __webpack_require__(83);

	var _publicIndexHtml2 = _interopRequireDefault(_publicIndexHtml);

	var _lodashFind = __webpack_require__(31);

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
	    this.settings.right = ["fullscreen", "volume", "hd-indicator"];
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
	      this.trigger(_baseEvents2['default'].PLAYBACK_LOADEDMETADATA, { duration: e.target.duration, data: e });
	      if (this.getPlaybackType() !== _basePlayback2['default'].LIVE) {
	        this.checkInitialSeek();
	      }
	    }
	  }, {
	    key: 'durationChange',
	    value: function durationChange() {
	      // we can't figure out if hls resource is VoD or not until it is being loaded or duration has changed.
	      // that's why we check it again and update media control accordingly.
	      if (this.getPlaybackType() === _basePlayback2['default'].VOD) {
	        this.settings.left = ["playpause", "position", "duration"];
	      } else {
	        this.settings.left = ["playstop"];
	      }
	      this.settings.seekEnabled = this.isSeekEnabled();
	      this.trigger(_baseEvents2['default'].PLAYBACK_SETTINGSUPDATE);
	    }
	  }, {
	    key: 'isSeekEnabled',
	    value: function isSeekEnabled() {
	      return isFinite(this.getDuration());
	    }
	  }, {
	    key: 'getPlaybackType',
	    value: function getPlaybackType() {
	      return [0, undefined, Infinity].indexOf(this.el.duration) >= 0 ? _basePlayback2['default'].LIVE : _basePlayback2['default'].VOD;
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
	      this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, { current: 0, total: this.el.duration }, this.name);
	    }
	  }, {
	    key: 'stalled',
	    value: function stalled() {
	      if (this.getPlaybackType() === _basePlayback2['default'].VOD && this.el.readyState < this.el.HAVE_FUTURE_DATA) {
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
	      if (this.getPlaybackType() === _basePlayback2['default'].LIVE) {
	        this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, { current: 1, total: 1 }, this.name);
	      } else {
	        this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, { current: this.el.currentTime, total: this.el.duration }, this.name);
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
	      this.trigger(_baseEvents2['default'].PLAYBACK_PROGRESS, {
	        start: this.el.buffered.start(bufferedPos),
	        current: this.el.buffered.end(bufferedPos),
	        total: this.el.duration
	      });
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
	      if (this.options.disableVideoTagContextMenu) {
	        this.$el.on("contextmenu", function () {
	          return false;
	        });
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(46)))

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utils = __webpack_require__(2);

	var _ui_object = __webpack_require__(18);

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
	  }, {
	    key: 'getPlaybackType',
	    value: function getPlaybackType() {
	      return Playback.NO_OP;
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
	 * checks if the playback can play a given `source` and optionally a `mimeType`
	 * @method canPlay
	 * @static
	 * @param {String} source the given source ex: `http://example.com/play.mp4`
	 * @param {String} [mimeType] the given mime type, ex: `'application/vnd.apple.mpegurl'`
	 * @return {Boolean} `true` if the playback is playable, otherwise `false`
	 */
	Playback.canPlay = function (source, mimeType) {
	  return false;
	};

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
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(30)();
	// imports


	// module
	exports.push([module.id, "[data-html5-video] {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  display: block; }\n", ""]);

	// exports


/***/ },
/* 83 */
/***/ function(module, exports) {

	module.exports = "<source src=\"<%=src%>\" type=\"<%=type%>\">\n";

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(85);

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUtils = __webpack_require__(2);

	var _playbacksBase_flash_playback = __webpack_require__(86);

	var _playbacksBase_flash_playback2 = _interopRequireDefault(_playbacksBase_flash_playback);

	var _componentsBrowser = __webpack_require__(3);

	var _componentsBrowser2 = _interopRequireDefault(_componentsBrowser);

	var _componentsMediator = __webpack_require__(51);

	var _componentsMediator2 = _interopRequireDefault(_componentsMediator);

	var _baseTemplate = __webpack_require__(17);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _baseEvents = __webpack_require__(6);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _basePlayback = __webpack_require__(81);

	var _basePlayback2 = _interopRequireDefault(_basePlayback);

	var _publicPlayerSwf = __webpack_require__(90);

	var _publicPlayerSwf2 = _interopRequireDefault(_publicPlayerSwf);

	var MAX_ATTEMPTS = 60;

	var Flash = (function (_BaseFlashPlayback) {
	  _inherits(Flash, _BaseFlashPlayback);

	  _createClass(Flash, [{
	    key: 'name',
	    get: function get() {
	      return 'flash';
	    }
	  }, {
	    key: 'swfPath',
	    get: function get() {
	      return (0, _baseTemplate2['default'])(_publicPlayerSwf2['default'])({ baseUrl: this.baseUrl });
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
	      return _basePlayback2['default'].VOD;
	    }
	  }, {
	    key: 'isHighDefinitionInUse',
	    value: function isHighDefinitionInUse() {
	      return false;
	    }
	  }, {
	    key: 'updateTime',
	    value: function updateTime() {
	      this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, { current: this.el.getPosition(), total: this.el.getDuration() }, this.name);
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
	      if (this.isIdle || this.currentState === "PAUSED") {
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
	        this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, { current: 0, total: this.el.getDuration() }, this.name);
	        this.currentState = "ENDED";
	        this.isIdle = true;
	      }
	    }
	  }, {
	    key: 'progress',
	    value: function progress() {
	      if (this.currentState !== "IDLE" && this.currentState !== "ENDED") {
	        this.trigger(_baseEvents2['default'].PLAYBACK_PROGRESS, {
	          start: 0,
	          current: this.el.getBytesLoaded(),
	          total: this.el.getBytesTotal()
	        });
	      }
	    }
	  }, {
	    key: 'firstPlay',
	    value: function firstPlay() {
	      var _this2 = this;

	      if (this.el.playerPlay) {
	        this.isIdle = false;
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
	      this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, { current: 0, total: 0 }, this.name);
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
	        this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, { current: seekTo, total: this.el.getDuration() }, this.name);
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
	  }]);

	  return Flash;
	})(_playbacksBase_flash_playback2['default']);

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
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = __webpack_require__(87);
	module.exports = exports['default'];

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2015 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _basePlayback = __webpack_require__(81);

	var _basePlayback2 = _interopRequireDefault(_basePlayback);

	var _baseStyler = __webpack_require__(16);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _baseTemplate = __webpack_require__(17);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _componentsBrowser = __webpack_require__(3);

	var _componentsBrowser2 = _interopRequireDefault(_componentsBrowser);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var _publicFlashHtml = __webpack_require__(88);

	var _publicFlashHtml2 = _interopRequireDefault(_publicFlashHtml);

	var _publicFlashScss = __webpack_require__(89);

	var _publicFlashScss2 = _interopRequireDefault(_publicFlashScss);

	var IE_CLASSID = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";

	var objectIE = '<object type="application/x-shockwave-flash" id="<%= cid %>" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" data-hls="" width="100%" height="100%"><param name="movie" value="<%= swfPath %>"> <param name="quality" value="autohigh"> <param name="swliveconnect" value="true"> <param name="allowScriptAccess" value="always"> <param name="bgcolor" value="#001122"> <param name="allowFullScreen" value="false"> <param name="wmode" value="transparent"> <param name="tabindex" value="1"> <param name=FlashVars value="playbackId=<%= playbackId %>&callback=<%= callbackName %>" /> </object>';

	var BaseFlashPlayback = (function (_Playback) {
	  _inherits(BaseFlashPlayback, _Playback);

	  function BaseFlashPlayback() {
	    _classCallCheck(this, BaseFlashPlayback);

	    _get(Object.getPrototypeOf(BaseFlashPlayback.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(BaseFlashPlayback, [{
	    key: 'setElement',
	    value: function setElement(element) {
	      this.$el = element;
	      this.el = element[0];
	    }
	  }, {
	    key: 'setupFirefox',
	    value: function setupFirefox() {
	      var $el = this.$('embed');
	      $el.attr('data-flash-playback', this.name);
	      $el.addClass(this.attributes['class']);
	      this.setElement($el);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.$el.html(this.template({ cid: this.cid, swfPath: this.swfPath, baseUrl: this.baseUrl, playbackId: this.uniqueId, callbackName: 'window.Clappr.flashlsCallbacks.' + this.cid }));
	      if (_componentsBrowser2['default'].isIE) {
	        this.$('embed').remove();
	        if (_componentsBrowser2['default'].isLegacyIE) {
	          this.$el.attr('classid', IE_CLASSID);
	        }
	      } else if (_componentsBrowser2['default'].isFirefox) {
	        this.setupFirefox();
	      }
	      this.el.id = this.cid;
	      var style = _baseStyler2['default'].getStyleFor(_publicFlashScss2['default']);
	      this.$el.append(style);
	      return this;
	    }
	  }, {
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
	    key: 'template',
	    get: function get() {
	      return (0, _baseTemplate2['default'])(_publicFlashHtml2['default']);
	    }
	  }, {
	    key: 'attributes',
	    get: function get() {
	      return {
	        'class': 'clappr-flash-playback',
	        type: 'application/x-shockwave-flash',
	        width: '100%',
	        height: '100%',
	        'data-flash-playback': this.name
	      };
	    }
	  }]);

	  return BaseFlashPlayback;
	})(_basePlayback2['default']);

	exports['default'] = BaseFlashPlayback;
	module.exports = exports['default'];

/***/ },
/* 88 */
/***/ function(module, exports) {

	module.exports = "<param name=\"movie\" value=\"<%= swfPath %>?inline=1\">\n<param name=\"quality\" value=\"autohigh\">\n<param name=\"swliveconnect\" value=\"true\">\n<param name=\"allowScriptAccess\" value=\"always\">\n<param name=\"bgcolor\" value=\"#000000\">\n<param name=\"allowFullScreen\" value=\"false\">\n<param name=\"wmode\" value=\"transparent\">\n<param name=\"tabindex\" value=\"1\">\n<param name=FlashVars value=\"playbackId=<%= playbackId %>&callback=<%= callbackName %>\" />\n<embed\n  name=\"<%= cid %>\"\n  type=\"application/x-shockwave-flash\"\n  disabled=\"disabled\"\n  tabindex=\"-1\"\n  enablecontextmenu=\"false\"\n  allowScriptAccess=\"always\"\n  quality=\"autohigh\"\n  pluginspage=\"http://www.macromedia.com/go/getflashplayer\"\n  wmode=\"transparent\"\n  swliveconnect=\"true\"\n  allowfullscreen=\"false\"\n  bgcolor=\"#000000\"\n  FlashVars=\"playbackId=<%= playbackId %>&callback=<%= callbackName %>\"\n  src=\"<%= swfPath %>\"\n  width=\"100%\"\n  height=\"100%\">\n</embed>\n";

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(30)();
	// imports


	// module
	exports.push([module.id, ".clappr-flash-playback[data-flash-playback] {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  pointer-events: none; }\n", ""]);

	// exports


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "4b76590b32dab62bc95c1b7951efae78.swf";

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(92);

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseEvents = __webpack_require__(6);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _basePlayback = __webpack_require__(81);

	var _basePlayback2 = _interopRequireDefault(_basePlayback);

	var _playbacksHtml5_video = __webpack_require__(79);

	var _playbacksHtml5_video2 = _interopRequireDefault(_playbacksHtml5_video);

	var _lodashFind = __webpack_require__(31);

	var _lodashFind2 = _interopRequireDefault(_lodashFind);

	var HTML5Audio = (function (_HTML5Video) {
	  _inherits(HTML5Audio, _HTML5Video);

	  function HTML5Audio() {
	    _classCallCheck(this, HTML5Audio);

	    _get(Object.getPrototypeOf(HTML5Audio.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(HTML5Audio, [{
	    key: 'durationChange',
	    value: function durationChange() {
	      this.settings.left = ["playpause", "position", "duration"];
	      this.settings.seekEnabled = this.isSeekEnabled();
	      this.trigger(_baseEvents2['default'].PLAYBACK_SETTINGSUPDATE);
	    }
	  }, {
	    key: 'getPlaybackType',
	    value: function getPlaybackType() {
	      return _basePlayback2['default'].AOD;
	    }
	  }, {
	    key: 'stalled',
	    value: function stalled() {
	      if (this.el.readyState < this.el.HAVE_FUTURE_DATA) {
	        this.trigger(_baseEvents2['default'].PLAYBACK_BUFFERING, this.name);
	      }
	    }
	  }, {
	    key: 'timeUpdated',
	    value: function timeUpdated() {
	      this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, { current: this.el.currentTime, total: this.el.duration }, this.name);
	    }
	  }, {
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
	})(_playbacksHtml5_video2['default']);

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
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(94);

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _playbacksBase_flash_playback = __webpack_require__(86);

	var _playbacksBase_flash_playback2 = _interopRequireDefault(_playbacksBase_flash_playback);

	var _baseEvents = __webpack_require__(6);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _baseTemplate = __webpack_require__(17);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _basePlayback = __webpack_require__(81);

	var _basePlayback2 = _interopRequireDefault(_basePlayback);

	var _componentsMediator = __webpack_require__(51);

	var _componentsMediator2 = _interopRequireDefault(_componentsMediator);

	var _componentsBrowser = __webpack_require__(3);

	var _componentsBrowser2 = _interopRequireDefault(_componentsBrowser);

	var _flashls_events = __webpack_require__(95);

	var _flashls_events2 = _interopRequireDefault(_flashls_events);

	var _publicHLSPlayerSwf = __webpack_require__(96);

	var _publicHLSPlayerSwf2 = _interopRequireDefault(_publicHLSPlayerSwf);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

	var MAX_ATTEMPTS = 60;

	var FlasHLS = (function (_BaseFlashPlayback) {
	  _inherits(FlasHLS, _BaseFlashPlayback);

	  _createClass(FlasHLS, [{
	    key: 'name',
	    get: function get() {
	      return 'flashls';
	    }
	  }, {
	    key: 'swfPath',
	    get: function get() {
	      return (0, _baseTemplate2['default'])(_publicHLSPlayerSwf2['default'])({ baseUrl: this.baseUrl });
	    }
	  }, {
	    key: 'levels',
	    get: function get() {
	      return this.el && this.el.getLevels() || [];
	    }
	  }, {
	    key: 'currentLevel',
	    get: function get() {
	      return this.el && this.el.getCurrentLevel() || -1;
	    },
	    set: function set(level) {
	      this.el && this.el.playerSetCurrentLevel(level);
	    }
	  }]);

	  function FlasHLS(options) {
	    _classCallCheck(this, FlasHLS);

	    _get(Object.getPrototypeOf(FlasHLS.prototype), 'constructor', this).call(this, options);
	    this.src = options.src;
	    this.baseUrl = options.baseUrl;
	    this.initHlsParameters(options);
	    this.highDefinition = false;
	    this.autoPlay = options.autoPlay;
	    this.loop = options.loop;
	    this.defaultSettings = {
	      left: ["playstop"],
	      'default': ['seekbar'],
	      right: ["fullscreen", "volume", "hd-indicator"],
	      seekEnabled: false
	    };
	    this.settings = _clapprZepto2['default'].extend({}, this.defaultSettings);
	    this.playbackType = _basePlayback2['default'].LIVE;
	    this.addListeners();
	  }

	  _createClass(FlasHLS, [{
	    key: 'initHlsParameters',
	    value: function initHlsParameters(options) {
	      this.flushLiveURLCache = options.flushLiveURLCache === undefined ? true : options.flushLiveURLCache;
	      this.capLevelToStage = options.capLevelToStage === undefined ? false : options.capLevelToStage;
	      this.useHardwareVideoDecoder = options.useHardwareVideoDecoder === undefined ? true : options.useHardwareVideoDecoder;
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
	      _get(Object.getPrototypeOf(FlasHLS.prototype), 'stopListening', this).call(this);
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
	        if (this.autoPlay || this._shouldPlayOnBootstrap) {
	          this.play();
	        }
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
	    key: 'setFlushLiveUrlCache',
	    value: function setFlushLiveUrlCache(flushLiveURLCache) {
	      this.flushLiveURLCache = flushLiveURLCache;
	      this.el.playerSetflushLiveURLCache(this.flushLiveURLCache);
	    }
	  }, {
	    key: 'setCapLeveltoStage',
	    value: function setCapLeveltoStage(capLevelToStage) {
	      this.capLevelToStage = capLevelToStage;
	      this.el.playerCapLeveltoStage(this.capLevelToStage);
	    }
	  }, {
	    key: 'setMaxBufferLength',
	    value: function setMaxBufferLength(maxBufferLength) {
	      this.maxBufferLength = maxBufferLength;
	      this.el.playerSetmaxBufferLength(this.maxBufferLength);
	    }
	  }, {
	    key: 'setUseHardwareVideoDecoder',
	    value: function setUseHardwareVideoDecoder(useHardwareVideoDecoder) {
	      this.useHardwareVideoDecoder = useHardwareVideoDecoder;
	      this.el.playerSetUseHardwareVideoDecoder(this.useHardwareVideoDecoder);
	    }
	  }, {
	    key: 'setHlsLogEnabled',
	    value: function setHlsLogEnabled(hlsLogEnabled) {
	      this.hlsLogEnabled = hlsLogEnabled;
	      this.el.playerSetLogInfo(this.hlsLogEnabled);
	    }
	  }, {
	    key: 'setSeekMode',
	    value: function setSeekMode(seekMode) {
	      this.seekMode = seekMode;
	      this.el.playerSetSeekMode(this.seekMode);
	    }
	  }, {
	    key: 'setStartFromBitrate',
	    value: function setStartFromBitrate(startFromBitrate) {
	      this.startFromBitrate = startFromBitrate;
	      this.el.playerSetStartFromBitrate(this.startFromBitrate);
	    }
	  }, {
	    key: 'setStartFromLevel',
	    value: function setStartFromLevel(startFromLevel) {
	      this.startFromLevel = startFromLevel;
	      this.el.playerSetstartFromLevel(this.startFromLevel);
	    }
	  }, {
	    key: 'setKeyLoadMaxRetry',
	    value: function setKeyLoadMaxRetry(keyLoadMaxRetry) {
	      this.keyLoadMaxRetry = keyLoadMaxRetry;
	      this.el.playerSetKeyLoadMaxRetry(this.keyLoadMaxRetry);
	    }
	  }, {
	    key: 'setKeyLoadMaxRetryTimeout',
	    value: function setKeyLoadMaxRetryTimeout(keyLoadMaxRetryTimeout) {
	      this.keyLoadMaxRetryTimeout = keyLoadMaxRetryTimeout;
	      this.el.playerSetKeyLoadMaxRetryTimeout(this.keyLoadMaxRetryTimeout);
	    }
	  }, {
	    key: 'setFragmentLoadMaxRetry',
	    value: function setFragmentLoadMaxRetry(fragmentLoadMaxRetry) {
	      this.fragmentLoadMaxRetry = fragmentLoadMaxRetry;
	      this.el.playerSetFragmentLoadMaxRetry(this.fragmentLoadMaxRetry);
	    }
	  }, {
	    key: 'setFragmentLoadMaxRetryTimeout',
	    value: function setFragmentLoadMaxRetryTimeout(fragmentLoadMaxRetryTimeout) {
	      this.fragmentLoadMaxRetryTimeout = fragmentLoadMaxRetryTimeout;
	      this.el.playerSetFragmentLoadMaxRetryTimeout(this.fragmentLoadMaxRetryTimeout);
	    }
	  }, {
	    key: 'setFragmentLoadSkipAfterMaxRetry',
	    value: function setFragmentLoadSkipAfterMaxRetry(fragmentLoadSkipAfterMaxRetry) {
	      this.fragmentLoadSkipAfterMaxRetry = fragmentLoadSkipAfterMaxRetry;
	      this.el.playerSetFragmentLoadSkipAfterMaxRetry(this.fragmentLoadSkipAfterMaxRetry);
	    }
	  }, {
	    key: 'setCapLevelonFPSDrop',
	    value: function setCapLevelonFPSDrop(capLevelonFpsDrop) {
	      this.capLevelonFpsDrop = capLevelonFpsDrop;
	      this.el.playerSetCapLevelonFPSDrop(this.capLevelonFpsDrop);
	    }
	  }, {
	    key: 'setSmoothAutoSwitchonFPSDrop',
	    value: function setSmoothAutoSwitchonFPSDrop(smoothAutoSwitchonFpsDrop) {
	      this.smoothAutoSwitchonFpsDrop = smoothAutoSwitchonFpsDrop;
	      this.el.playerSetSmoothAutoSwitchonFPSDrop(this.smoothAutoSwitchonFpsDrop);
	    }
	  }, {
	    key: 'setFpsDroppedMonitoringPeriod',
	    value: function setFpsDroppedMonitoringPeriod(fpsDroppedMonitoringPeriod) {
	      this.fpsDroppedMonitoringPeriod = fpsDroppedMonitoringPeriod;
	      this.el.playerSetFpsDroppedMonitoringPeriod(this.fpsDroppedMonitoringPeriod);
	    }
	  }, {
	    key: 'setFpsDroppedMonitoringThreshold',
	    value: function setFpsDroppedMonitoringThreshold(fpsDroppedMonitoringThreshold) {
	      this.fpsDroppedMonitoringThreshold = fpsDroppedMonitoringThreshold;
	      this.el.playerSetFpsDroppedMonitoringThreshold(this.fpsDroppedMonitoringThreshold);
	    }
	  }, {
	    key: 'levelChanged',
	    value: function levelChanged(level) {
	      var currentLevel = this.levels[level];
	      if (currentLevel) {
	        this.highDefinition = currentLevel.height >= 720 || currentLevel.bitrate / 1000 >= 2000;
	        this.trigger(_baseEvents2['default'].PLAYBACK_HIGHDEFINITIONUPDATE, this.highDefinition);
	        this.trigger(_baseEvents2['default'].PLAYBACK_BITRATE, {
	          height: currentLevel.height,
	          width: currentLevel.width,
	          bandwidth: currentLevel.bandwidth,
	          bitrate: currentLevel.bitrate,
	          level: level
	        });
	      }
	    }
	  }, {
	    key: 'updateTime',
	    value: function updateTime(timeMetrics) {
	      if (this.currentState === 'IDLE') {
	        return;
	      }

	      var duration = this.normalizeDuration(timeMetrics.duration);
	      var position = Math.min(Math.max(timeMetrics.position, 0), duration);
	      var previousDVRStatus = this.dvrEnabled;
	      var livePlayback = this.playbackType === _basePlayback2['default'].LIVE;
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

	      this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, { current: position, total: duration }, this.name);
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
	      return this.currentLevel;
	    }
	  }, {
	    key: 'getCurrentLevel',
	    value: function getCurrentLevel() {
	      return this.levels[this.currentLevel];
	    }
	  }, {
	    key: 'getCurrentBitrate',
	    value: function getCurrentBitrate() {
	      return this.levels[this.currentLevel].bitrate;
	    }
	  }, {
	    key: 'setCurrentLevel',
	    value: function setCurrentLevel(level) {
	      this.currentLevel = level;
	    }
	  }, {
	    key: 'isHighDefinitionInUse',
	    value: function isHighDefinitionInUse() {
	      return this.highDefinition;
	    }
	  }, {
	    key: 'getLevels',
	    value: function getLevels() {
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
	        this.srcLoaded = false;
	        if (this.loop && ["PLAYING_BUFFERING", "PLAYING"].indexOf(this.currentState) >= 0) {
	          this.play();
	          this.seek(0);
	        } else {
	          this.updateCurrentState(state);
	          this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, { current: 0, total: this.el.getDuration() }, this.name);
	          this.trigger(_baseEvents2['default'].PLAYBACK_ENDED, this.name);
	        }
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
	        if (this.playbackType === _basePlayback2['default'].VOD) {
	          this.startReportingProgress();
	        } else {
	          this.stopReportingProgress();
	        }
	      }
	      this.trigger(_baseEvents2['default'].PLAYBACK_PLAYBACKSTATE, { type: this.playbackType });
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
	        this.trigger(_baseEvents2['default'].PLAYBACK_PROGRESS, {
	          start: this.el.getPosition(),
	          current: buffered,
	          total: this.el.getDuration()
	        });
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
	      if (this.playbackType !== _basePlayback2['default'].LIVE || this.dvrEnabled) {
	        this.el.playerPause();
	        if (this.playbackType === _basePlayback2['default'].LIVE && this.dvrEnabled) {
	          this.updateDvr(true);
	        }
	      }
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.srcLoaded = false;
	      this.el.playerStop();
	      this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, { current: 0, total: 0 }, this.name);
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
	      if (this.playbackType === _basePlayback2['default'].LIVE) {
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

	      if (this.playbackType === _basePlayback2['default'].LIVE) {
	        // seek operations to a time within 5 seconds from live stream will position playhead back to live
	        var dvrInUse = time >= 0 && duration - time > 5;
	        if (!dvrInUse) {
	          time = -1;
	        }
	        this.updateDvr(dvrInUse);
	      }
	      this.el.playerSeek(time);
	      this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, { current: time, total: duration }, this.name);
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
	      this.trigger(_baseEvents2['default'].PLAYBACK_LOADEDMETADATA, { duration: duration, data: loadmetrics });
	    }
	  }, {
	    key: 'timeUpdate',
	    value: function timeUpdate(time, duration) {
	      this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, { current: time, total: duration }, this.name);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.stopListening();
	      this.$el.remove();
	    }
	  }, {
	    key: 'updateSettings',
	    value: function updateSettings() {
	      this.settings = _clapprZepto2['default'].extend({}, this.defaultSettings);
	      if (this.playbackType === _basePlayback2['default'].VOD || this.dvrInUse) {
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
	      _get(Object.getPrototypeOf(FlasHLS.prototype), 'render', this).call(this);
	      this.createCallbacks();
	      return this;
	    }
	  }]);

	  return FlasHLS;
	})(_playbacksBase_flash_playback2['default']);

	exports['default'] = FlasHLS;

	FlasHLS.canPlay = function (resource, mimeType) {
	  var resourceParts = resource.split('?')[0].match(/.*\.(.*)$/) || [];
	  return _componentsBrowser2['default'].hasFlash && (resourceParts.length > 1 && resourceParts[1] === "m3u8" || mimeType === 'application/x-mpegURL' || mimeType === 'application/vnd.apple.mpegurl');
	};
	module.exports = exports['default'];

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _componentsMediator = __webpack_require__(51);

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
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "eea07e284091d08ca250c360e018fd85.swf";

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(98);

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _playbacksHtml5_video = __webpack_require__(79);

	var _playbacksHtml5_video2 = _interopRequireDefault(_playbacksHtml5_video);

	var _hlsJs = __webpack_require__(99);

	var _hlsJs2 = _interopRequireDefault(_hlsJs);

	var _baseEvents = __webpack_require__(6);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _basePlayback = __webpack_require__(81);

	var _basePlayback2 = _interopRequireDefault(_basePlayback);

	var _componentsBrowser = __webpack_require__(3);

	var _componentsBrowser2 = _interopRequireDefault(_componentsBrowser);

	var HLS = (function (_HTML5VideoPlayback) {
	  _inherits(HLS, _HTML5VideoPlayback);

	  _createClass(HLS, [{
	    key: 'name',
	    get: function get() {
	      return 'hls';
	    }
	  }, {
	    key: 'levels',
	    get: function get() {
	      return this.hls && this.hls.levels || [];
	    }
	  }, {
	    key: 'currentLevel',
	    get: function get() {
	      return this.hls && this.hls.currentLevel || -1;
	    },
	    set: function set(level) {
	      this.hls && (this.hls.currentLevel = level);
	    }
	  }]);

	  function HLS(options) {
	    _classCallCheck(this, HLS);

	    _get(Object.getPrototypeOf(HLS.prototype), 'constructor', this).call(this, options);
	    this.minDvrSize = options.hlsMinimumDvrSize ? options.hlsMinimumDvrSize : 60;
	    this.playbackType = _basePlayback2['default'].VOD;
	    // for hls streams which have dvr with a sliding window,
	    // the content at the start of the playlist is removed as new
	    // content is appended at the end.
	    // this means the actual playable start time will increase as the
	    // start content is deleted
	    // For streams with dvr where the entire recording is kept from the
	    // beginning this should stay as 0
	    this.playableRegionStartTime = 0;
	    // if content is removed from the beginning then this empty area should
	    // be ignored. "playableRegionDuration" does not consider this
	    this.playableRegionDuration = 0;
	  }

	  _createClass(HLS, [{
	    key: 'setupHls',
	    value: function setupHls() {
	      var _this = this;

	      this.hls = new _hlsJs2['default'](this.options.hlsjsConfig || {});
	      this.hls.on(_hlsJs2['default'].Events.MSE_ATTACHED, function () {
	        return _this.hls.loadSource(_this.options.src);
	      });
	      this.hls.on(_hlsJs2['default'].Events.MANIFEST_PARSED, function () {
	        _this.options.autoPlay && _this.play();
	      });
	      this.hls.on(_hlsJs2['default'].Events.LEVEL_LOADED, function (evt, data) {
	        return _this.updatePlaybackType(evt, data);
	      });
	      this.hls.on(_hlsJs2['default'].Events.LEVEL_UPDATED, function (evt, data) {
	        return _this.updateDuration(evt, data);
	      });
	      this.hls.on(_hlsJs2['default'].Events.LEVEL_SWITCH, function (evt, data) {
	        return _this.onLevelSwitch(evt, data);
	      });
	      this.hls.on(_hlsJs2['default'].Events.FRAG_LOADED, function (evt, data) {
	        return _this.onFragmentLoaded(evt, data);
	      });
	      this.hls.attachVideo(this.el);
	    }

	    // the duration on the video element itself should not be used
	    // as this does not necesarily represent the duration of the stream
	    // https://github.com/clappr/clappr/issues/668#issuecomment-157036678
	  }, {
	    key: 'getDuration',
	    value: function getDuration() {
	      return this.playableRegionDuration;
	    }
	  }, {
	    key: 'getCurrentTime',
	    value: function getCurrentTime() {
	      return this.el.currentTime - this.playableRegionStartTime;
	    }
	  }, {
	    key: 'seek',
	    value: function seek(seekBarValue) {
	      var seekTo = this.playableRegionDuration;
	      if (seekBarValue > 0) {
	        seekTo = this.playableRegionDuration * (seekBarValue / 100);
	      }
	      var onDvr = this.dvrEnabled && seekBarValue >= 0 && seekBarValue < 100;
	      seekTo += this.playableRegionStartTime;
	      _get(Object.getPrototypeOf(HLS.prototype), 'seekSeconds', this).call(this, seekTo);
	      this.updateDvr(onDvr);
	    }
	  }, {
	    key: 'updateDvr',
	    value: function updateDvr(status) {
	      this.trigger(_baseEvents2['default'].PLAYBACK_DVR, status);
	      this.trigger(_baseEvents2['default'].PLAYBACK_STATS_ADD, { 'dvr': status });
	    }
	  }, {
	    key: 'durationChange',
	    value: function durationChange() {
	      if (this.playbackType === _basePlayback2['default'].VOD) {
	        this.settings.left = ["playpause", "position", "duration"];
	      } else if (this.dvrEnabled) {
	        this.settings.left = ["playpause"];
	      } else {
	        this.settings.left = ["playstop"];
	      }
	      this.settings.seekEnabled = this.isSeekEnabled();
	      this.timeUpdated();
	      this.trigger(_baseEvents2['default'].PLAYBACK_SETTINGSUPDATE);
	    }
	  }, {
	    key: 'timeUpdated',
	    value: function timeUpdated() {
	      this.trigger(_baseEvents2['default'].PLAYBACK_TIMEUPDATE, { current: this.getCurrentTime(), total: this.getDuration() }, this.name);
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      if (!this.hls) {
	        this.setupHls();
	      }
	      _get(Object.getPrototypeOf(HLS.prototype), 'play', this).call(this);
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      _get(Object.getPrototypeOf(HLS.prototype), 'pause', this).call(this);
	      if (this.dvrEnabled) {
	        this.updateDvr(true);
	      }
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      if (this.hls) {
	        this.hls.destroy();
	        delete this.hls;
	      }
	    }
	  }, {
	    key: 'updatePlaybackType',
	    value: function updatePlaybackType(evt, data) {
	      this.playbackType = data.details.live ? _basePlayback2['default'].LIVE : _basePlayback2['default'].VOD;
	    }
	  }, {
	    key: 'updateDuration',
	    value: function updateDuration(evt, data) {
	      var fragments = data.details.fragments;
	      if (fragments.length > 0) {
	        this.playableRegionStartTime = fragments[0].start;
	      }
	      this.playableRegionDuration = data.details.totalduration;
	      this.durationChange();
	    }
	  }, {
	    key: 'onFragmentLoaded',
	    value: function onFragmentLoaded(evt, data) {
	      this.trigger(_baseEvents2['default'].PLAYBACK_FRAGMENT_LOADED, data);
	    }
	  }, {
	    key: 'onLevelSwitch',
	    value: function onLevelSwitch(evt, data) {
	      this.trigger(_baseEvents2['default'].PLAYBACK_LEVEL_SWITCH, data);
	      var currentLevel = this.levels[data.level];
	      if (currentLevel) {
	        this.highDefinition = currentLevel.height >= 720 || currentLevel.bitrate / 1000 >= 2000;
	        this.trigger(_baseEvents2['default'].PLAYBACK_HIGHDEFINITIONUPDATE, this.highDefinition);
	        this.trigger(_baseEvents2['default'].PLAYBACK_BITRATE, {
	          height: currentLevel.height,
	          width: currentLevel.width,
	          bandwidth: currentLevel.bandwidth,
	          bitrate: currentLevel.bitrate,
	          level: data.level
	        });
	      }
	    }
	  }, {
	    key: 'getPlaybackType',
	    value: function getPlaybackType() {
	      return this.playbackType;
	    }
	  }, {
	    key: 'isSeekEnabled',
	    value: function isSeekEnabled() {
	      return this.playbackType === _basePlayback2['default'].VOD || this.dvrEnabled;
	    }
	  }, {
	    key: 'dvrEnabled',
	    get: function get() {
	      return this.playableRegionDuration >= this.minDvrSize && this.getPlaybackType() === _basePlayback2['default'].LIVE;
	    }
	  }]);

	  return HLS;
	})(_playbacksHtml5_video2['default']);

	exports['default'] = HLS;

	HLS.canPlay = function (resource, mimeType) {
	  var resourceParts = resource.split('?')[0].match(/.*\.(.*)$/) || [];
	  var isHls = resourceParts.length > 1 && resourceParts[1] === "m3u8" || mimeType === 'application/x-mpegURL' || mimeType === 'application/vnd.apple.mpegurl';
	  var ignoredBrowser = _componentsBrowser2['default'].isSafari || _componentsBrowser2['default'].isFirefox;

	  return !!(_hlsJs2['default'].isSupported() && isHls && !ignoredBrowser);
	};
	module.exports = exports['default'];

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * HLS interface
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _events = __webpack_require__(100);

	var _events2 = _interopRequireDefault(_events);

	var _errors = __webpack_require__(101);

	var _loaderPlaylistLoader = __webpack_require__(102);

	var _loaderPlaylistLoader2 = _interopRequireDefault(_loaderPlaylistLoader);

	var _loaderFragmentLoader = __webpack_require__(103);

	var _loaderFragmentLoader2 = _interopRequireDefault(_loaderFragmentLoader);

	var _controllerAbrController = __webpack_require__(104);

	var _controllerAbrController2 = _interopRequireDefault(_controllerAbrController);

	var _controllerBufferController = __webpack_require__(105);

	var _controllerBufferController2 = _interopRequireDefault(_controllerBufferController);

	var _controllerLevelController = __webpack_require__(117);

	var _controllerLevelController2 = _interopRequireDefault(_controllerLevelController);

	//import FPSController from './controller/fps-controller';

	var _utilsLogger = __webpack_require__(106);

	var _utilsXhrLoader = __webpack_require__(118);

	var _utilsXhrLoader2 = _interopRequireDefault(_utilsXhrLoader);

	var _events3 = __webpack_require__(112);

	var _events4 = _interopRequireDefault(_events3);

	var Hls = (function () {
	  _createClass(Hls, null, [{
	    key: 'isSupported',
	    value: function isSupported() {
	      return window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
	    }
	  }, {
	    key: 'Events',
	    get: function get() {
	      return _events2['default'];
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
	  }]);

	  function Hls() {
	    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, Hls);

	    var configDefault = {
	      autoStartLoad: true,
	      debug: false,
	      maxBufferLength: 30,
	      maxBufferSize: 60 * 1000 * 1000,
	      liveSyncDurationCount: 3,
	      liveMaxLatencyDurationCount: Infinity,
	      maxMaxBufferLength: 600,
	      enableWorker: true,
	      fragLoadingTimeOut: 20000,
	      fragLoadingMaxRetry: 1,
	      fragLoadingRetryDelay: 1000,
	      fragLoadingLoopThreshold: 3,
	      manifestLoadingTimeOut: 10000,
	      manifestLoadingMaxRetry: 1,
	      manifestLoadingRetryDelay: 1000,
	      fpsDroppedMonitoringPeriod: 5000,
	      fpsDroppedMonitoringThreshold: 0.2,
	      appendErrorMaxRetry: 200,
	      loader: _utilsXhrLoader2['default'],
	      abrController: _controllerAbrController2['default']
	    };
	    for (var prop in configDefault) {
	      if (prop in config) {
	        continue;
	      }
	      config[prop] = configDefault[prop];
	    }

	    if (config.liveMaxLatencyDurationCount !== undefined && config.liveMaxLatencyDurationCount <= config.liveSyncDurationCount) {
	      throw new Error('Illegal hls.js configuration: "liveMaxLatencyDurationCount" must be strictly superior to "liveSyncDurationCount" in player configuration');
	    }

	    (0, _utilsLogger.enableLogs)(config.debug);
	    this.config = config;
	    // observer setup
	    var observer = this.observer = new _events4['default']();
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
	    this.playlistLoader = new _loaderPlaylistLoader2['default'](this);
	    this.fragmentLoader = new _loaderFragmentLoader2['default'](this);
	    this.levelController = new _controllerLevelController2['default'](this);
	    this.abrController = new config.abrController(this);
	    this.bufferController = new _controllerBufferController2['default'](this);
	    //this.fpsController = new FPSController(this);
	  }

	  _createClass(Hls, [{
	    key: 'destroy',
	    value: function destroy() {
	      _utilsLogger.logger.log('destroy');
	      this.trigger(_events2['default'].DESTROYING);
	      this.playlistLoader.destroy();
	      this.fragmentLoader.destroy();
	      this.levelController.destroy();
	      this.bufferController.destroy();
	      //this.fpsController.destroy();
	      this.url = null;
	      this.detachVideo();
	      this.observer.removeAllListeners();
	    }
	  }, {
	    key: 'attachVideo',
	    value: function attachVideo(video) {
	      _utilsLogger.logger.log('attachVideo');
	      this.video = video;
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
	      video.src = URL.createObjectURL(ms);
	      video.addEventListener('error', this.onverror);
	    }
	  }, {
	    key: 'detachVideo',
	    value: function detachVideo() {
	      _utilsLogger.logger.log('detachVideo');
	      var video = this.video;
	      _utilsLogger.logger.log('trigger MSE_DETACHING');
	      this.trigger(_events2['default'].MSE_DETACHING);
	      var ms = this.mediaSource;
	      if (ms) {
	        if (ms.readyState === 'open') {
	          ms.endOfStream();
	        }
	        ms.removeEventListener('sourceopen', this.onmso);
	        ms.removeEventListener('sourceended', this.onmse);
	        ms.removeEventListener('sourceclose', this.onmsc);
	        // unlink MediaSource from video tag
	        video.src = '';
	        this.mediaSource = null;
	        _utilsLogger.logger.log('trigger MSE_DETACHED');
	        this.trigger(_events2['default'].MSE_DETACHED);
	      }
	      this.onmso = this.onmse = this.onmsc = null;
	      if (video) {
	        this.video = null;
	      }
	    }
	  }, {
	    key: 'loadSource',
	    value: function loadSource(url) {
	      _utilsLogger.logger.log('loadSource:' + url);
	      this.url = url;
	      // when attaching to a source URL, trigger a playlist load
	      this.trigger(_events2['default'].MANIFEST_LOADING, { url: url });
	    }
	  }, {
	    key: 'startLoad',
	    value: function startLoad() {
	      _utilsLogger.logger.log('startLoad');
	      this.bufferController.startLoad();
	    }
	  }, {
	    key: 'recoverMediaError',
	    value: function recoverMediaError() {
	      _utilsLogger.logger.log('recoverMediaError');
	      var video = this.video;
	      this.detachVideo();
	      this.attachVideo(video);
	    }

	    /** Return all quality levels **/
	  }, {
	    key: 'onMediaSourceOpen',
	    value: function onMediaSourceOpen() {
	      _utilsLogger.logger.log('media source opened');
	      this.trigger(_events2['default'].MSE_ATTACHED, { video: this.video, mediaSource: this.mediaSource });
	      // once received, don't listen anymore to sourceopen event
	      this.mediaSource.removeEventListener('sourceopen', this.onmso);
	    }
	  }, {
	    key: 'onMediaSourceClose',
	    value: function onMediaSourceClose() {
	      _utilsLogger.logger.log('media source closed');
	    }
	  }, {
	    key: 'onMediaSourceEnded',
	    value: function onMediaSourceEnded() {
	      _utilsLogger.logger.log('media source ended');
	    }
	  }, {
	    key: 'levels',
	    get: function get() {
	      return this.levelController.levels;
	    }

	    /** Return current playback quality level **/
	  }, {
	    key: 'currentLevel',
	    get: function get() {
	      return this.bufferController.currentLevel;
	    },

	    /* set quality level immediately (-1 for automatic level selection) */
	    set: function set(newLevel) {
	      _utilsLogger.logger.log('set currentLevel:' + newLevel);
	      this.loadLevel = newLevel;
	      this.bufferController.immediateLevelSwitch();
	    }

	    /** Return next playback quality level (quality level of next fragment) **/
	  }, {
	    key: 'nextLevel',
	    get: function get() {
	      return this.bufferController.nextLevel;
	    },

	    /* set quality level for next fragment (-1 for automatic level selection) */
	    set: function set(newLevel) {
	      _utilsLogger.logger.log('set nextLevel:' + newLevel);
	      this.levelController.manualLevel = newLevel;
	      this.bufferController.nextLevelSwitch();
	    }

	    /** Return the quality level of current/last loaded fragment **/
	  }, {
	    key: 'loadLevel',
	    get: function get() {
	      return this.levelController.level;
	    },

	    /* set quality level for current/next loaded fragment (-1 for automatic level selection) */
	    set: function set(newLevel) {
	      _utilsLogger.logger.log('set loadLevel:' + newLevel);
	      this.levelController.manualLevel = newLevel;
	    }

	    /** Return the quality level of next loaded fragment **/
	  }, {
	    key: 'nextLoadLevel',
	    get: function get() {
	      return this.levelController.nextLoadLevel();
	    },

	    /** set quality level of next loaded fragment **/
	    set: function set(level) {
	      this.levelController.level = level;
	    }

	    /** Return first level (index of first level referenced in manifest)
	    **/
	  }, {
	    key: 'firstLevel',
	    get: function get() {
	      return this.levelController.firstLevel;
	    },

	    /** set first level (index of first level referenced in manifest)
	    **/
	    set: function set(newLevel) {
	      _utilsLogger.logger.log('set firstLevel:' + newLevel);
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
	    },

	    /** set  start level (level of first fragment that will be played back)
	        if not overrided by user, first level appearing in manifest will be used as start level
	        if -1 : automatic start level selection, playback will start from level matching download bandwidth (determined from download of first segment)
	    **/
	    set: function set(newLevel) {
	      _utilsLogger.logger.log('set startLevel:' + newLevel);
	      this.levelController.startLevel = newLevel;
	    }

	    /** Return the capping/max level value that could be used by automatic level selection algorithm **/
	  }, {
	    key: 'autoLevelCapping',
	    get: function get() {
	      return this.abrController.autoLevelCapping;
	    },

	    /** set the capping/max level value that could be used by automatic level selection algorithm **/
	    set: function set(newLevel) {
	      _utilsLogger.logger.log('set autoLevelCapping:' + newLevel);
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
	})();

	exports['default'] = Hls;
	module.exports = exports['default'];

/***/ },
/* 100 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = {
	  // fired when MediaSource has been succesfully attached to video element - data: { video, mediaSource }
	  MSE_ATTACHED: 'hlsMediaSourceAttached',
	  // fired before detaching MediaSource from video element - data: { }
	  MSE_DETACHING: 'hlsMediaSourceDetaching',
	  // fired when MediaSource has been detached from video element - data: { }
	  MSE_DETACHED: 'hlsMediaSourceDetached',
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
	  LEVEL_PTS_UPDATED: 'hlsPTSUpdated',
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
	  // fired when parsing id3 is completed - data: { samples : [ id3 samples pes ] }
	  FRAG_PARSING_METADATA: 'hlsFraParsingMetadata',
	  // fired when moof/mdat have been extracted from fragment - data: { moof : moof MP4 box, mdat : mdat MP4 box}
	  FRAG_PARSING_DATA: 'hlsFragParsingData',
	  // fired when fragment parsing is completed - data: undefined
	  FRAG_PARSED: 'hlsFragParsed',
	  // fired when fragment remuxed MP4 boxes have all been appended into SourceBuffer - data: { frag : fragment object, stats : { trequest, tfirst, tload, tparsed, tbuffered, length} }
	  FRAG_BUFFERED: 'hlsFragBuffered',
	  // fired when fragment matching with current video position is changing - data : { frag : fragment object }
	  FRAG_CHANGED: 'hlsFragChanged',
	  // Identifier for a FPS drop event - data: {curentDropped, currentDecoded, totalDroppedFrames}
	  FPS_DROP: 'hlsFPSDrop',
	  // Identifier for an error event - data: { type : error type, details : error details, fatal : if true, hls.js cannot/will not try to recover, if false, hls.js will try to recover,other error specific data}
	  ERROR: 'hlsError',
	  // fired when hls.js instance starts destroying. Different from MSE_DETACHED as one could want to detach and reattach a video to the instance of hls.js to handle mid-rolls for example
	  DESTROYING: 'hlsDestroying'
	};
	module.exports = exports['default'];

/***/ },
/* 101 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var ErrorTypes = {
	  // Identifier for a network error (loading error / timeout ...)
	  NETWORK_ERROR: 'hlsNetworkError',
	  // Identifier for a media Error (video/parsing/mediasource error)
	  MEDIA_ERROR: 'hlsMediaError',
	  // Identifier for all other errors
	  OTHER_ERROR: 'hlsOtherError'
	};

	exports.ErrorTypes = ErrorTypes;
	var ErrorDetails = {
	  // Identifier for a manifest load error - data: { url : faulty URL, response : XHR response}
	  MANIFEST_LOAD_ERROR: 'manifestLoadError',
	  // Identifier for a manifest load timeout - data: { url : faulty URL, response : XHR response}
	  MANIFEST_LOAD_TIMEOUT: 'manifestLoadTimeOut',
	  // Identifier for a manifest parsing error - data: { url : faulty URL, reason : error reason}
	  MANIFEST_PARSING_ERROR: 'manifestParsingError',
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
	  // Identifier for a fragment parsing error event - data: parsing error description
	  FRAG_PARSING_ERROR: 'fragParsingError',
	  // Identifier for a fragment appending error event - data: appending error description
	  FRAG_APPENDING_ERROR: 'fragAppendingError'
	};
	exports.ErrorDetails = ErrorDetails;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Playlist Loader
	*/

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _events = __webpack_require__(100);

	var _events2 = _interopRequireDefault(_events);

	var _errors = __webpack_require__(101);

	//import {logger} from '../utils/logger';

	var PlaylistLoader = (function () {
	  function PlaylistLoader(hls) {
	    _classCallCheck(this, PlaylistLoader);

	    this.hls = hls;
	    this.onml = this.onManifestLoading.bind(this);
	    this.onll = this.onLevelLoading.bind(this);
	    hls.on(_events2['default'].MANIFEST_LOADING, this.onml);
	    hls.on(_events2['default'].LEVEL_LOADING, this.onll);
	  }

	  _createClass(PlaylistLoader, [{
	    key: 'destroy',
	    value: function destroy() {
	      if (this.loader) {
	        this.loader.destroy();
	        this.loader = null;
	      }
	      this.url = this.id = null;
	      this.hls.off(_events2['default'].MANIFEST_LOADING, this.onml);
	      this.hls.off(_events2['default'].LEVEL_LOADING, this.onll);
	    }
	  }, {
	    key: 'onManifestLoading',
	    value: function onManifestLoading(event, data) {
	      this.load(data.url, null);
	    }
	  }, {
	    key: 'onLevelLoading',
	    value: function onLevelLoading(event, data) {
	      this.load(data.url, data.level, data.id);
	    }
	  }, {
	    key: 'load',
	    value: function load(url, id1, id2) {
	      var config = this.hls.config;
	      this.url = url;
	      this.id = id1;
	      this.id2 = id2;
	      this.loader = new config.loader(config);
	      this.loader.load(url, '', this.loadsuccess.bind(this), this.loaderror.bind(this), this.loadtimeout.bind(this), config.manifestLoadingTimeOut, config.manifestLoadingMaxRetry, config.manifestLoadingRetryDelay);
	    }
	  }, {
	    key: 'resolve',
	    value: function resolve(url, baseUrl) {
	      var doc = document,
	          oldBase = doc.getElementsByTagName('base')[0],
	          oldHref = oldBase && oldBase.href,
	          docHead = doc.head || doc.getElementsByTagName('head')[0],
	          ourBase = oldBase || docHead.appendChild(doc.createElement('base')),
	          resolver = doc.createElement('a'),
	          resolvedUrl;
	      ourBase.href = baseUrl;
	      resolver.href = url;
	      resolvedUrl = resolver.href; // browser magic at work here
	      if (oldBase) {
	        oldBase.href = oldHref;
	      } else {
	        docHead.removeChild(ourBase);
	      }
	      return resolvedUrl;
	    }
	  }, {
	    key: 'parseMasterPlaylist',
	    value: function parseMasterPlaylist(string, baseurl) {
	      var levels = [],
	          level = {},
	          result,
	          codecs,
	          codec;
	      // https://regex101.com is your friend
	      var re = /#EXT-X-STREAM-INF:([^\n\r]*(BAND)WIDTH=(\d+))?([^\n\r]*(CODECS)=\"([^\"\n\r]*)\",?)?([^\n\r]*(RES)OLUTION=(\d+)x(\d+))?([^\n\r]*(NAME)=\"(.*)\")?[^\n\r]*[\r\n]+([^\r\n]+)/g;
	      while ((result = re.exec(string)) != null) {
	        result.shift();
	        result = result.filter(function (n) {
	          return n !== undefined;
	        });
	        level.url = this.resolve(result.pop(), baseurl);
	        while (result.length > 0) {
	          switch (result.shift()) {
	            case 'RES':
	              level.width = parseInt(result.shift());
	              level.height = parseInt(result.shift());
	              break;
	            case 'BAND':
	              level.bitrate = parseInt(result.shift());
	              break;
	            case 'NAME':
	              level.name = result.shift();
	              break;
	            case 'CODECS':
	              codecs = result.shift().split(',');
	              while (codecs.length > 0) {
	                codec = codecs.shift();
	                if (codec.indexOf('avc1') !== -1) {
	                  level.videoCodec = this.avc1toavcoti(codec);
	                } else {
	                  level.audioCodec = codec;
	                }
	              }
	              break;
	            default:
	              break;
	          }
	        }
	        levels.push(level);
	        level = {};
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
	        result += ('00' + parseInt(avcdata.shift()).toString(16)).substr(-4);
	      } else {
	        result = codec;
	      }
	      return result;
	    }
	  }, {
	    key: 'parseLevelPlaylist',
	    value: function parseLevelPlaylist(string, baseurl, id) {
	      var currentSN = 0,
	          totalduration = 0,
	          level = { url: baseurl, fragments: [], live: true, startSN: 0 },
	          result,
	          regexp,
	          cc = 0,
	          frag,
	          byteRangeEndOffset,
	          byteRangeStartOffset;
	      regexp = /(?:#EXT-X-(MEDIA-SEQUENCE):(\d+))|(?:#EXT-X-(TARGETDURATION):(\d+))|(?:#EXT(INF):([\d\.]+)[^\r\n]*([\r\n]+[^#|\r\n]+)?)|(?:#EXT-X-(BYTERANGE):([\d]+[@[\d]*)]*[\r\n]+([^#|\r\n]+)?|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DIS)CONTINUITY))/g;
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
	            frag = level.fragments.length ? level.fragments[level.fragments.length - 1] : null;
	            if (frag && !frag.url) {
	              frag.byteRangeStartOffset = byteRangeStartOffset;
	              frag.byteRangeEndOffset = byteRangeEndOffset;
	              frag.url = this.resolve(result[2], baseurl);
	            }
	            break;
	          case 'INF':
	            var duration = parseFloat(result[1]);
	            if (!isNaN(duration)) {
	              level.fragments.push({ url: result[2] ? this.resolve(result[2], baseurl) : null, duration: duration, start: totalduration, sn: currentSN++, level: id, cc: cc, byteRangeStartOffset: byteRangeStartOffset, byteRangeEndOffset: byteRangeEndOffset });
	              totalduration += duration;
	              byteRangeStartOffset = null;
	            }
	            break;
	          default:
	            break;
	        }
	      }
	      //logger.log('found ' + level.fragments.length + ' fragments');
	      level.totalduration = totalduration;
	      level.endSN = currentSN - 1;
	      return level;
	    }
	  }, {
	    key: 'loadsuccess',
	    value: function loadsuccess(event, stats) {
	      var string = event.currentTarget.responseText,
	          url = event.currentTarget.responseURL,
	          id = this.id,
	          id2 = this.id2,
	          hls = this.hls,
	          levels;
	      // responseURL not supported on some browsers (it is used to detect URL redirection)
	      if (url === undefined) {
	        // fallback to initial URL
	        url = this.url;
	      }
	      stats.tload = new Date();
	      stats.mtime = new Date(event.currentTarget.getResponseHeader('Last-Modified'));
	      if (string.indexOf('#EXTM3U') === 0) {
	        if (string.indexOf('#EXTINF:') > 0) {
	          // 1 level playlist
	          // if first request, fire manifest loaded event, level will be reloaded afterwards
	          // (this is to have a uniform logic for 1 level/multilevel playlists)
	          if (this.id === null) {
	            hls.trigger(_events2['default'].MANIFEST_LOADED, { levels: [{ url: url }], url: url, stats: stats });
	          } else {
	            hls.trigger(_events2['default'].LEVEL_LOADED, { details: this.parseLevelPlaylist(string, url, id), level: id, id: id2, stats: stats });
	          }
	        } else {
	          levels = this.parseMasterPlaylist(string, url);
	          // multi level playlist, parse level info
	          if (levels.length) {
	            hls.trigger(_events2['default'].MANIFEST_LOADED, { levels: levels, url: url, stats: stats });
	          } else {
	            hls.trigger(_events2['default'].ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: _errors.ErrorDetails.MANIFEST_PARSING_ERROR, fatal: true, url: url, reason: 'no level found in manifest' });
	          }
	        }
	      } else {
	        hls.trigger(_events2['default'].ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: _errors.ErrorDetails.MANIFEST_PARSING_ERROR, fatal: true, url: url, reason: 'no EXTM3U delimiter' });
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
	      this.loader.abort();
	      this.hls.trigger(_events2['default'].ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: details, fatal: fatal, url: this.url, loader: this.loader, response: event.currentTarget, level: this.id, id: this.id2 });
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
	      this.loader.abort();
	      this.hls.trigger(_events2['default'].ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: details, fatal: fatal, url: this.url, loader: this.loader, level: this.id, id: this.id2 });
	    }
	  }]);

	  return PlaylistLoader;
	})();

	exports['default'] = PlaylistLoader;
	module.exports = exports['default'];

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Fragment Loader
	*/

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _events = __webpack_require__(100);

	var _events2 = _interopRequireDefault(_events);

	var _errors = __webpack_require__(101);

	var FragmentLoader = (function () {
	  function FragmentLoader(hls) {
	    _classCallCheck(this, FragmentLoader);

	    this.hls = hls;
	    this.onfl = this.onFragLoading.bind(this);
	    hls.on(_events2['default'].FRAG_LOADING, this.onfl);
	  }

	  _createClass(FragmentLoader, [{
	    key: 'destroy',
	    value: function destroy() {
	      if (this.loader) {
	        this.loader.destroy();
	        this.loader = null;
	      }
	      this.hls.off(_events2['default'].FRAG_LOADING, this.onfl);
	    }
	  }, {
	    key: 'onFragLoading',
	    value: function onFragLoading(event, data) {
	      var frag = data.frag;
	      this.frag = frag;
	      this.frag.loaded = 0;
	      var config = this.hls.config;
	      frag.loader = this.loader = new config.loader(config);
	      this.loader.load(frag.url, 'arraybuffer', this.loadsuccess.bind(this), this.loaderror.bind(this), this.loadtimeout.bind(this), config.fragLoadingTimeOut, config.fragLoadingMaxRetry, config.fragLoadingRetryDelay, this.loadprogress.bind(this), frag);
	    }
	  }, {
	    key: 'loadsuccess',
	    value: function loadsuccess(event, stats) {
	      var payload = event.currentTarget.response;
	      stats.length = payload.byteLength;
	      // detach fragment loader on load success
	      this.frag.loader = undefined;
	      this.hls.trigger(_events2['default'].FRAG_LOADED, { payload: payload, frag: this.frag, stats: stats });
	    }
	  }, {
	    key: 'loaderror',
	    value: function loaderror(event) {
	      this.loader.abort();
	      this.hls.trigger(_events2['default'].ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: _errors.ErrorDetails.FRAG_LOAD_ERROR, fatal: false, frag: this.frag, response: event });
	    }
	  }, {
	    key: 'loadtimeout',
	    value: function loadtimeout() {
	      this.loader.abort();
	      this.hls.trigger(_events2['default'].ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: _errors.ErrorDetails.FRAG_LOAD_TIMEOUT, fatal: false, frag: this.frag });
	    }
	  }, {
	    key: 'loadprogress',
	    value: function loadprogress(event, stats) {
	      this.frag.loaded = stats.loaded;
	      this.hls.trigger(_events2['default'].FRAG_LOAD_PROGRESS, { frag: this.frag, stats: stats });
	    }
	  }]);

	  return FragmentLoader;
	})();

	exports['default'] = FragmentLoader;
	module.exports = exports['default'];

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * simple ABR Controller
	*/

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _events = __webpack_require__(100);

	var _events2 = _interopRequireDefault(_events);

	var AbrController = (function () {
	  function AbrController(hls) {
	    _classCallCheck(this, AbrController);

	    this.hls = hls;
	    this.lastfetchlevel = 0;
	    this._autoLevelCapping = -1;
	    this._nextAutoLevel = -1;
	    this.onflp = this.onFragmentLoadProgress.bind(this);
	    hls.on(_events2['default'].FRAG_LOAD_PROGRESS, this.onflp);
	  }

	  _createClass(AbrController, [{
	    key: 'destroy',
	    value: function destroy() {
	      this.hls.off(_events2['default'].FRAG_LOAD_PROGRESS, this.onflp);
	    }
	  }, {
	    key: 'onFragmentLoadProgress',
	    value: function onFragmentLoadProgress(event, data) {
	      var stats = data.stats;
	      if (stats.aborted === undefined) {
	        this.lastfetchduration = (new Date() - stats.trequest) / 1000;
	        this.lastfetchlevel = data.frag.level;
	        this.lastbw = stats.loaded * 8 / this.lastfetchduration;
	        //console.log('fetchDuration:${this.lastfetchduration},bw:${(this.lastbw/1000).toFixed(0)}/${stats.aborted}');
	        // unset forced auto level
	        this._nextAutoLevel = -1;
	      }
	    }

	    /** Return the capping/max level value that could be used by automatic level selection algorithm **/
	  }, {
	    key: 'autoLevelCapping',
	    get: function get() {
	      return this._autoLevelCapping;
	    },

	    /** set the capping/max level value that could be used by automatic level selection algorithm **/
	    set: function set(newLevel) {
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
	        return Math.min(this._nextAutoLevel, maxAutoLevel);
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
	})();

	exports['default'] = AbrController;
	module.exports = exports['default'];

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Buffer Controller
	*/

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _events = __webpack_require__(100);

	var _events2 = _interopRequireDefault(_events);

	var _utilsLogger = __webpack_require__(106);

	var _demuxDemuxer = __webpack_require__(107);

	var _demuxDemuxer2 = _interopRequireDefault(_demuxDemuxer);

	var _helperLevelHelper = __webpack_require__(116);

	var _helperLevelHelper2 = _interopRequireDefault(_helperLevelHelper);

	var _errors = __webpack_require__(101);

	var BufferController = (function () {
	  function BufferController(hls) {
	    _classCallCheck(this, BufferController);

	    this.ERROR = -2;
	    this.STARTING = -1;
	    this.IDLE = 0;
	    this.LOADING = 1;
	    this.WAITING_LEVEL = 2;
	    this.PARSING = 3;
	    this.PARSED = 4;
	    this.APPENDING = 5;
	    this.BUFFER_FLUSHING = 6;
	    this.config = hls.config;
	    this.hls = hls;
	    // Source Buffer listeners
	    this.onsbue = this.onSBUpdateEnd.bind(this);
	    this.onsbe = this.onSBUpdateError.bind(this);
	    // internal listeners
	    this.onmse = this.onMSEAttached.bind(this);
	    this.onmsed0 = this.onMSEDetaching.bind(this);
	    this.onmsed = this.onMSEDetached.bind(this);
	    this.onmp = this.onManifestParsed.bind(this);
	    this.onll = this.onLevelLoaded.bind(this);
	    this.onfl = this.onFragLoaded.bind(this);
	    this.onis = this.onInitSegment.bind(this);
	    this.onfpg = this.onFragParsing.bind(this);
	    this.onfp = this.onFragParsed.bind(this);
	    this.onerr = this.onError.bind(this);
	    this.ontick = this.tick.bind(this);
	    hls.on(_events2['default'].MSE_ATTACHED, this.onmse);
	    hls.on(_events2['default'].MSE_DETACHING, this.onmsed0);
	    hls.on(_events2['default'].MSE_DETACHED, this.onmsed);
	    hls.on(_events2['default'].MANIFEST_PARSED, this.onmp);
	  }

	  _createClass(BufferController, [{
	    key: 'destroy',
	    value: function destroy() {
	      this.stop();
	      var hls = this.hls;
	      hls.off(_events2['default'].MSE_ATTACHED, this.onmse);
	      hls.off(_events2['default'].MSE_DETACHING, this.onmsed0);
	      hls.off(_events2['default'].MSE_DETACHED, this.onmsed);
	      hls.off(_events2['default'].MANIFEST_PARSED, this.onmp);
	      this.state = this.IDLE;
	    }
	  }, {
	    key: 'startLoad',
	    value: function startLoad() {
	      if (this.levels && this.video) {
	        this.startInternal();
	        if (this.lastCurrentTime) {
	          _utilsLogger.logger.log('seeking @ ' + this.lastCurrentTime);
	          if (!this.lastPaused) {
	            _utilsLogger.logger.log('resuming video');
	            this.video.play();
	          }
	          this.state = this.IDLE;
	        } else {
	          this.lastCurrentTime = 0;
	          this.state = this.STARTING;
	        }
	        this.nextLoadPosition = this.startPosition = this.lastCurrentTime;
	        this.tick();
	      } else {
	        _utilsLogger.logger.warn('cannot start loading as either manifest not parsed or video not attached');
	      }
	    }
	  }, {
	    key: 'startInternal',
	    value: function startInternal() {
	      var hls = this.hls;
	      this.stop();
	      this.demuxer = new _demuxDemuxer2['default'](hls);
	      this.timer = setInterval(this.ontick, 100);
	      this.level = -1;
	      hls.on(_events2['default'].FRAG_LOADED, this.onfl);
	      hls.on(_events2['default'].FRAG_PARSING_INIT_SEGMENT, this.onis);
	      hls.on(_events2['default'].FRAG_PARSING_DATA, this.onfpg);
	      hls.on(_events2['default'].FRAG_PARSED, this.onfp);
	      hls.on(_events2['default'].ERROR, this.onerr);
	      hls.on(_events2['default'].LEVEL_LOADED, this.onll);
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.mp4segments = [];
	      this.flushRange = [];
	      this.bufferRange = [];
	      var frag = this.fragCurrent;
	      if (frag) {
	        if (frag.loader) {
	          frag.loader.abort();
	        }
	        this.fragCurrent = null;
	      }
	      this.fragPrevious = null;
	      if (this.sourceBuffer) {
	        for (var type in this.sourceBuffer) {
	          var sb = this.sourceBuffer[type];
	          try {
	            this.mediaSource.removeSourceBuffer(sb);
	            sb.removeEventListener('updateend', this.onsbue);
	            sb.removeEventListener('error', this.onsbe);
	          } catch (err) {}
	        }
	        this.sourceBuffer = null;
	      }
	      if (this.timer) {
	        clearInterval(this.timer);
	        this.timer = null;
	      }
	      if (this.demuxer) {
	        this.demuxer.destroy();
	        this.demuxer = null;
	      }
	      var hls = this.hls;
	      hls.off(_events2['default'].FRAG_LOADED, this.onfl);
	      hls.off(_events2['default'].FRAG_PARSED, this.onfp);
	      hls.off(_events2['default'].FRAG_PARSING_DATA, this.onfpg);
	      hls.off(_events2['default'].LEVEL_LOADED, this.onll);
	      hls.off(_events2['default'].FRAG_PARSING_INIT_SEGMENT, this.onis);
	      hls.off(_events2['default'].ERROR, this.onerr);
	    }
	  }, {
	    key: 'tick',
	    value: function tick() {
	      var pos, level, levelDetails, fragIdx;
	      switch (this.state) {
	        case this.ERROR:
	          //don't do anything in error state to avoid breaking further ...
	          break;
	        case this.STARTING:
	          // determine load level
	          this.startLevel = this.hls.startLevel;
	          if (this.startLevel === -1) {
	            // -1 : guess start Level by doing a bitrate test by loading first fragment of lowest quality level
	            this.startLevel = 0;
	            this.fragBitrateTest = true;
	          }
	          // set new level to playlist loader : this will trigger start level load
	          this.level = this.hls.nextLoadLevel = this.startLevel;
	          this.state = this.WAITING_LEVEL;
	          this.loadedmetadata = false;
	          break;
	        case this.IDLE:
	          // if video detached or unbound exit loop
	          if (!this.video) {
	            break;
	          }
	          // determine next candidate fragment to be loaded, based on current position and
	          //  end of buffer position
	          //  ensure 60s of buffer upfront
	          // if we have not yet loaded any fragment, start loading from start position
	          if (this.loadedmetadata) {
	            pos = this.video.currentTime;
	          } else {
	            pos = this.nextLoadPosition;
	          }
	          // determine next load level
	          if (this.startFragmentRequested === false) {
	            level = this.startLevel;
	          } else {
	            // we are not at playback start, get next load level from level Controller
	            level = this.hls.nextLoadLevel;
	          }
	          var bufferInfo = this.bufferInfo(pos, 0.3),
	              bufferLen = bufferInfo.len,
	              bufferEnd = bufferInfo.end,
	              maxBufLen;
	          // compute max Buffer Length that we could get from this load level, based on level bitrate. don't buffer more than 60 MB and more than 30s
	          if (this.levels[level].hasOwnProperty('bitrate')) {
	            maxBufLen = Math.max(8 * this.config.maxBufferSize / this.levels[level].bitrate, this.config.maxBufferLength);
	            maxBufLen = Math.min(maxBufLen, this.config.maxMaxBufferLength);
	          } else {
	            maxBufLen = this.config.maxBufferLength;
	          }
	          // if buffer length is less than maxBufLen try to load a new fragment
	          if (bufferLen < maxBufLen) {
	            // set next load level : this will trigger a playlist load if needed
	            this.hls.nextLoadLevel = level;
	            this.level = level;
	            levelDetails = this.levels[level].details;
	            // if level info not retrieved yet, switch state and wait for level retrieval
	            if (typeof levelDetails === 'undefined') {
	              this.state = this.WAITING_LEVEL;
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
	              //logger.log(`start/pos/bufEnd/seeking:${start.toFixed(3)}/${pos.toFixed(3)}/${bufferEnd.toFixed(3)}/${this.video.seeking}`);
	              if (bufferEnd < Math.max(start, end - this.config.liveMaxLatencyDurationCount * levelDetails.targetduration)) {
	                this.seekAfterBuffered = start + Math.max(0, levelDetails.totalduration - this.config.liveSyncDurationCount * levelDetails.targetduration);
	                _utilsLogger.logger.log('buffer end: ' + bufferEnd + ' is located too far from the end of live sliding playlist, media position will be reseted to: ' + this.seekAfterBuffered.toFixed(3));
	                bufferEnd = this.seekAfterBuffered;
	              }
	              if (this.startFragmentRequested && !levelDetails.PTSKnown) {
	                /* we are switching level on live playlist, but we don't have any PTS info for that quality level ...
	                   try to load frag matching with next SN.
	                   even if SN are not synchronized between playlists, loading this frag will help us
	                   compute playlist sliding and find the right one after in case it was not the right consecutive one */
	                if (this.fragPrevious) {
	                  var targetSN = this.fragPrevious.sn + 1;
	                  if (targetSN >= levelDetails.startSN && targetSN <= levelDetails.endSN) {
	                    _frag = fragments[targetSN - levelDetails.startSN];
	                    _utilsLogger.logger.log('live playlist, switching playlist, load frag with next SN: ' + _frag.sn);
	                  }
	                }
	                if (!_frag) {
	                  /* we have no idea about which fragment should be loaded.
	                     so let's load mid fragment. it will help computing playlist sliding and find the right one
	                  */
	                  _frag = fragments[Math.round(fragLen / 2)];
	                  _utilsLogger.logger.log('live playlist, switching playlist, unknown, load middle frag : ' + _frag.sn);
	                }
	              }
	            } else {
	              // VoD playlist: if bufferEnd before start of playlist, load first fragment
	              if (bufferEnd < start) {
	                _frag = fragments[0];
	              }
	            }
	            if (!_frag) {
	              if (bufferEnd > end) {
	                // reach end of playlist
	                break;
	              }
	              for (fragIdx = 0; fragIdx < fragLen; fragIdx++) {
	                _frag = fragments[fragIdx];
	                start = _frag.start;
	                //logger.log('level/sn/sliding/start/end/bufEnd:${level}/${frag.sn}/${sliding.toFixed(3)}/${start.toFixed(3)}/${(start+frag.duration).toFixed(3)}/${bufferEnd.toFixed(3)}');
	                // offset should be within fragment boundary
	                if (start <= bufferEnd && start + _frag.duration > bufferEnd) {
	                  break;
	                }
	              }
	              //logger.log('find SN matching with pos:' +  bufferEnd + ':' + frag.sn);
	              if (this.fragPrevious && _frag.level === this.fragPrevious.level && _frag.sn === this.fragPrevious.sn) {
	                if (fragIdx === fragLen - 1) {
	                  // we are at the end of the playlist and we already loaded last fragment, don't do anything
	                  break;
	                } else {
	                  _frag = fragments[fragIdx + 1];
	                  _utilsLogger.logger.log('SN just loaded, load next one: ' + _frag.sn);
	                }
	              }
	            }
	            _utilsLogger.logger.log('Loading ' + _frag.sn + ' of [' + levelDetails.startSN + ' ,' + levelDetails.endSN + '],level ' + level + ', currentTime:' + pos + ',bufferEnd:' + bufferEnd.toFixed(3));
	            //logger.log('      loading frag ' + i +',pos/bufEnd:' + pos.toFixed(3) + '/' + bufferEnd.toFixed(3));
	            _frag.autoLevel = this.hls.autoLevelEnabled;
	            if (this.levels.length > 1) {
	              _frag.expectedLen = Math.round(_frag.duration * this.levels[level].bitrate / 8);
	              _frag.trequest = new Date();
	            }
	            // ensure that we are not reloading the same fragments in loop ...
	            if (this.fragLoadIdx !== undefined) {
	              this.fragLoadIdx++;
	            } else {
	              this.fragLoadIdx = 0;
	            }
	            if (_frag.loadCounter) {
	              _frag.loadCounter++;
	              var maxThreshold = this.config.fragLoadingLoopThreshold;
	              // if this frag has already been loaded 3 times, and if it has been reloaded recently
	              if (_frag.loadCounter > maxThreshold && Math.abs(this.fragLoadIdx - _frag.loadIdx) < maxThreshold) {
	                this.hls.trigger(_events2['default'].ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.FRAG_LOOP_LOADING_ERROR, fatal: false, frag: _frag });
	                return;
	              }
	            } else {
	              _frag.loadCounter = 1;
	            }
	            _frag.loadIdx = this.fragLoadIdx;
	            this.fragCurrent = _frag;
	            this.startFragmentRequested = true;
	            this.hls.trigger(_events2['default'].FRAG_LOADING, { frag: _frag });
	            this.state = this.LOADING;
	          }
	          break;
	        case this.WAITING_LEVEL:
	          level = this.levels[this.level];
	          // check if playlist is already loaded
	          if (level && level.details) {
	            this.state = this.IDLE;
	          }
	          break;
	        case this.LOADING:
	          /*
	            monitor fragment retrieval time...
	            we compute expected time of arrival of the complete fragment.
	            we compare it to expected time of buffer starvation
	          */
	          var v = this.video,
	              frag = this.fragCurrent;
	          /* only monitor frag retrieval time if
	          (video not paused OR first fragment being loaded) AND autoswitching enabled AND not lowest level AND multiple levels */
	          if (v && (!v.paused || this.loadedmetadata === false) && frag.autoLevel && this.level && this.levels.length > 1) {
	            var requestDelay = new Date() - frag.trequest;
	            // monitor fragment load progress after half of expected fragment duration,to stabilize bitrate
	            if (requestDelay > 500 * frag.duration) {
	              var loadRate = frag.loaded * 1000 / requestDelay; // byte/s
	              if (frag.expectedLen < frag.loaded) {
	                frag.expectedLen = frag.loaded;
	              }
	              pos = v.currentTime;
	              var fragLoadedDelay = (frag.expectedLen - frag.loaded) / loadRate;
	              var bufferStarvationDelay = this.bufferInfo(pos, 0.3).end - pos;
	              var fragLevelNextLoadedDelay = frag.duration * this.levels[this.hls.nextLoadLevel].bitrate / (8 * loadRate); //bps/Bps
	              /* if we have less than 2 frag duration in buffer and if frag loaded delay is greater than buffer starvation delay
	                ... and also bigger than duration needed to load fragment at next level ...*/
	              if (bufferStarvationDelay < 2 * frag.duration && fragLoadedDelay > bufferStarvationDelay && fragLoadedDelay > fragLevelNextLoadedDelay) {
	                // abort fragment loading ...
	                _utilsLogger.logger.warn('loading too slow, abort fragment loading');
	                _utilsLogger.logger.log('fragLoadedDelay/bufferStarvationDelay/fragLevelNextLoadedDelay :' + fragLoadedDelay.toFixed(1) + '/' + bufferStarvationDelay.toFixed(1) + '/' + fragLevelNextLoadedDelay.toFixed(1));
	                //abort fragment loading
	                frag.loader.abort();
	                this.hls.trigger(_events2['default'].FRAG_LOAD_EMERGENCY_ABORTED, { frag: frag });
	                // switch back to IDLE state to request new fragment at lowest level
	                this.state = this.IDLE;
	              }
	            }
	          }
	          break;
	        case this.PARSING:
	          // nothing to do, wait for fragment being parsed
	          break;
	        case this.PARSED:
	        case this.APPENDING:
	          if (this.sourceBuffer) {
	            // if MP4 segment appending in progress nothing to do
	            if (this.sourceBuffer.audio && this.sourceBuffer.audio.updating || this.sourceBuffer.video && this.sourceBuffer.video.updating) {
	              //logger.log('sb append in progress');
	              // check if any MP4 segments left to append
	            } else if (this.mp4segments.length) {
	                var segment = this.mp4segments.shift();
	                try {
	                  //logger.log('appending ${segment.type} SB, size:${segment.data.length}');
	                  this.sourceBuffer[segment.type].appendBuffer(segment.data);
	                  this.appendError = 0;
	                } catch (err) {
	                  // in case any error occured while appending, put back segment in mp4segments table
	                  _utilsLogger.logger.error('error while trying to append buffer:' + err.message + ',try appending later');
	                  this.mp4segments.unshift(segment);
	                  if (this.appendError) {
	                    this.appendError++;
	                  } else {
	                    this.appendError = 1;
	                  }
	                  var event = { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.FRAG_APPENDING_ERROR, frag: this.fragCurrent };
	                  /* with UHD content, we could get loop of quota exceeded error until
	                    browser is able to evict some data from sourcebuffer. retrying help recovering this
	                  */
	                  if (this.appendError > this.config.appendErrorMaxRetry) {
	                    _utilsLogger.logger.log('fail ' + this.config.appendErrorMaxRetry + ' times to append segment in sourceBuffer');
	                    event.fatal = true;
	                    this.hls.trigger(_events2['default'].ERROR, event);
	                    this.state = this.ERROR;
	                    return;
	                  } else {
	                    event.fatal = false;
	                    this.hls.trigger(_events2['default'].ERROR, event);
	                  }
	                }
	                this.state = this.APPENDING;
	              }
	          } else {
	            // sourceBuffer undefined, switch back to IDLE state
	            this.state = this.IDLE;
	          }
	          break;
	        case this.BUFFER_FLUSHING:
	          // loop through all buffer ranges to flush
	          while (this.flushRange.length) {
	            var range = this.flushRange[0];
	            // flushBuffer will abort any buffer append in progress and flush Audio/Video Buffer
	            if (this.flushBuffer(range.start, range.end)) {
	              // range flushed, remove from flush array
	              this.flushRange.shift();
	            } else {
	              // flush in progress, come back later
	              break;
	            }
	          }
	          if (this.flushRange.length === 0) {
	            // handle end of immediate switching if needed
	            if (this.immediateSwitch) {
	              this.immediateLevelSwitchEnd();
	            }
	            // move to IDLE once flush complete. this should trigger new fragment loading
	            this.state = this.IDLE;
	            // reset reference to frag
	            this.fragPrevious = null;
	          }
	          /* if not everything flushed, stay in BUFFER_FLUSHING state. we will come back here
	             each time sourceBuffer updateend() callback will be triggered
	             */
	          break;
	        default:
	          break;
	      }
	      // check/update current fragment
	      this._checkFragmentChanged();
	    }
	  }, {
	    key: 'bufferInfo',
	    value: function bufferInfo(pos, maxHoleDuration) {
	      var v = this.video,
	          buffered = v.buffered,
	          bufferLen,

	      // bufferStart and bufferEnd are buffer boundaries around current video position
	      bufferStart,
	          bufferEnd,
	          bufferStartNext,
	          i;
	      var buffered2 = [];
	      // there might be some small holes between buffer time range
	      // consider that holes smaller than maxHoleDuration are irrelevant and build another
	      // buffer time range representations that discards those holes
	      for (i = 0; i < buffered.length; i++) {
	        //logger.log('buf start/end:' + buffered.start(i) + '/' + buffered.end(i));
	        if (buffered2.length && buffered.start(i) - buffered2[buffered2.length - 1].end < maxHoleDuration) {
	          buffered2[buffered2.length - 1].end = buffered.end(i);
	        } else {
	          buffered2.push({ start: buffered.start(i), end: buffered.end(i) });
	        }
	      }
	      for (i = 0, bufferLen = 0, bufferStart = bufferEnd = pos; i < buffered2.length; i++) {
	        var start = buffered2[i].start,
	            end = buffered2[i].end;
	        //logger.log('buf start/end:' + buffered.start(i) + '/' + buffered.end(i));
	        if (pos + maxHoleDuration >= start && pos < end) {
	          // play position is inside this buffer TimeRange, retrieve end of buffer position and buffer length
	          bufferStart = start;
	          bufferEnd = end + maxHoleDuration;
	          bufferLen = bufferEnd - pos;
	        } else if (pos + maxHoleDuration < start) {
	          bufferStartNext = start;
	        }
	      }
	      return { len: bufferLen, start: bufferStart, end: bufferEnd, nextStart: bufferStartNext };
	    }
	  }, {
	    key: 'getBufferRange',
	    value: function getBufferRange(position) {
	      var i, range;
	      for (i = this.bufferRange.length - 1; i >= 0; i--) {
	        range = this.bufferRange[i];
	        if (position >= range.start && position <= range.end) {
	          return range;
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
	      var v = this.video,
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
	          video = this.video;
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
	            this.hls.trigger(_events2['default'].FRAG_CHANGED, { frag: fragPlaying });
	          }
	          // if stream is VOD (not live) and we reach End of Stream
	          var levelDetails = this.levels[this.level].details;
	          if (levelDetails && !levelDetails.live) {
	            // are we playing last fragment ?
	            if (fragPlaying.sn === levelDetails.endSN) {
	              var mediaSource = this.mediaSource;
	              if (mediaSource && mediaSource.readyState === 'open') {
	                _utilsLogger.logger.log('all media data available, signal endOfStream() to MediaSource');
	                //Notify the media element that it now has all of the media data
	                mediaSource.endOfStream();
	              }
	            }
	          }
	        }
	      }
	    }

	    /*
	      abort any buffer append in progress, and flush all buffered data
	      return true once everything has been flushed.
	      sourceBuffer.abort() and sourceBuffer.remove() are asynchronous operations
	      the idea is to call this function from tick() timer and call it again until all resources have been cleaned
	      the timer is rearmed upon sourceBuffer updateend() event, so this should be optimal
	    */
	  }, {
	    key: 'flushBuffer',
	    value: function flushBuffer(startOffset, endOffset) {
	      var sb, i, bufStart, bufEnd, flushStart, flushEnd;
	      //logger.log('flushBuffer,pos/start/end: ' + this.video.currentTime + '/' + startOffset + '/' + endOffset);
	      // safeguard to avoid infinite looping
	      if (this.flushBufferCounter++ < 2 * this.bufferRange.length && this.sourceBuffer) {
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
	              if (flushEnd - flushStart > 0.5) {
	                _utilsLogger.logger.log('flush ' + type + ' [' + flushStart + ',' + flushEnd + '], of [' + bufStart + ',' + bufEnd + '], pos:' + this.video.currentTime);
	                sb.remove(flushStart, flushEnd);
	                return false;
	              }
	            }
	          } else {
	            //logger.log('abort ' + type + ' append in progress');
	            // this will abort any appending in progress
	            //sb.abort();
	            return false;
	          }
	        }
	      }

	      /* after successful buffer flushing, rebuild buffer Range array
	        loop through existing buffer range and check if
	        corresponding range is still buffered. only push to new array already buffered range
	      */
	      var newRange = [],
	          range;
	      for (i = 0; i < this.bufferRange.length; i++) {
	        range = this.bufferRange[i];
	        if (this.isBuffered((range.start + range.end) / 2)) {
	          newRange.push(range);
	        }
	      }
	      this.bufferRange = newRange;
	      _utilsLogger.logger.log('buffer flushed');
	      // everything flushed !
	      return true;
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
	      _utilsLogger.logger.log('immediateLevelSwitch');
	      if (!this.immediateSwitch) {
	        this.immediateSwitch = true;
	        this.previouslyPaused = this.video.paused;
	        this.video.pause();
	      }
	      var fragCurrent = this.fragCurrent;
	      if (fragCurrent && fragCurrent.loader) {
	        fragCurrent.loader.abort();
	      }
	      this.fragCurrent = null;
	      // flush everything
	      this.flushBufferCounter = 0;
	      this.flushRange.push({ start: 0, end: Number.POSITIVE_INFINITY });
	      // trigger a sourceBuffer flush
	      this.state = this.BUFFER_FLUSHING;
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
	      this.video.currentTime -= 0.0001;
	      if (!this.previouslyPaused) {
	        this.video.play();
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
	      currentRange = this.getBufferRange(this.video.currentTime);
	      if (currentRange) {
	        // flush buffer preceding current fragment (flush until current fragment start offset)
	        // minus 1s to avoid video freezing, that could happen if we flush keyframe of current video ...
	        this.flushRange.push({ start: 0, end: currentRange.start - 1 });
	      }
	      if (!this.video.paused) {
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
	      nextRange = this.getBufferRange(this.video.currentTime + fetchdelay);
	      if (nextRange) {
	        // we can flush buffer range following this one without stalling playback
	        nextRange = this.followingBufferRange(nextRange);
	        if (nextRange) {
	          // flush position is the start position of this new buffer
	          this.flushRange.push({ start: nextRange.start, end: Number.POSITIVE_INFINITY });
	        }
	      }
	      if (this.flushRange.length) {
	        this.flushBufferCounter = 0;
	        // trigger a sourceBuffer flush
	        this.state = this.BUFFER_FLUSHING;
	        // increase fragment load Index to avoid frag loop loading error after buffer flush
	        this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold;
	        // speed up switching, trigger timer function
	        this.tick();
	      }
	    }
	  }, {
	    key: 'onMSEAttached',
	    value: function onMSEAttached(event, data) {
	      var video = data.video;
	      this.video = video;
	      this.mediaSource = data.mediaSource;
	      this.onvseeking = this.onVideoSeeking.bind(this);
	      this.onvseeked = this.onVideoSeeked.bind(this);
	      this.onvmetadata = this.onVideoMetadata.bind(this);
	      this.onvended = this.onVideoEnded.bind(this);
	      video.addEventListener('seeking', this.onvseeking);
	      video.addEventListener('seeked', this.onvseeked);
	      video.addEventListener('loadedmetadata', this.onvmetadata);
	      video.addEventListener('ended', this.onvended);
	      if (this.levels && this.config.autoStartLoad) {
	        this.startLoad();
	      }
	    }
	  }, {
	    key: 'onMSEDetaching',
	    value: function onMSEDetaching() {
	      var video = this.video;
	      if (video && video.ended) {
	        _utilsLogger.logger.log('MSE detaching and video ended, reset startPosition');
	        this.startPosition = this.lastCurrentTime = 0;
	      }
	    }
	  }, {
	    key: 'onMSEDetached',
	    value: function onMSEDetached() {
	      // remove video listeners
	      var video = this.video;
	      if (video) {
	        video.removeEventListener('seeking', this.onvseeking);
	        video.removeEventListener('seeked', this.onvseeked);
	        video.removeEventListener('loadedmetadata', this.onvmetadata);
	        video.removeEventListener('ended', this.onvended);
	        this.onvseeking = this.onvseeked = this.onvmetadata = null;
	      }
	      this.video = null;
	      this.loadedmetadata = false;
	      this.stop();
	    }
	  }, {
	    key: 'onVideoSeeking',
	    value: function onVideoSeeking() {
	      if (this.state === this.LOADING) {
	        // check if currently loaded fragment is inside buffer.
	        //if outside, cancel fragment loading, otherwise do nothing
	        if (this.bufferInfo(this.video.currentTime, 0.3).len === 0) {
	          _utilsLogger.logger.log('seeking outside of buffer while fragment load in progress, cancel fragment load');
	          this.fragCurrent.loader.abort();
	          this.fragCurrent = null;
	          this.fragPrevious = null;
	          // switch to IDLE state to load new fragment
	          this.state = this.IDLE;
	        }
	      }
	      if (this.video) {
	        this.lastCurrentTime = this.video.currentTime;
	      }
	      // avoid reporting fragment loop loading error in case user is seeking several times on same position
	      if (this.fragLoadIdx !== undefined) {
	        this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold;
	      }
	      // tick to speed up processing
	      this.tick();
	    }
	  }, {
	    key: 'onVideoSeeked',
	    value: function onVideoSeeked() {
	      // tick to speed up FRAGMENT_PLAYING triggering
	      this.tick();
	    }
	  }, {
	    key: 'onVideoMetadata',
	    value: function onVideoMetadata() {
	      if (this.video.currentTime !== this.startPosition) {
	        this.video.currentTime = this.startPosition;
	      }
	      this.loadedmetadata = true;
	      this.tick();
	    }
	  }, {
	    key: 'onVideoEnded',
	    value: function onVideoEnded() {
	      _utilsLogger.logger.log('video ended');
	      // reset startPosition and lastCurrentTime to restart playback @ stream beginning
	      this.startPosition = this.lastCurrentTime = 0;
	    }
	  }, {
	    key: 'onManifestParsed',
	    value: function onManifestParsed(event, data) {
	      var aac = false,
	          heaac = false,
	          codecs;
	      data.levels.forEach(function (level) {
	        // detect if we have different kind of audio codecs used amongst playlists
	        codecs = level.codecs;
	        if (codecs) {
	          if (codecs.indexOf('mp4a.40.2') !== -1) {
	            aac = true;
	          }
	          if (codecs.indexOf('mp4a.40.5') !== -1) {
	            heaac = true;
	          }
	        }
	      });
	      this.audiocodecswitch = aac && heaac;
	      if (this.audiocodecswitch) {
	        _utilsLogger.logger.log('both AAC/HE-AAC audio found in levels; declaring audio codec as HE-AAC');
	      }
	      this.levels = data.levels;
	      this.startLevelLoaded = false;
	      this.startFragmentRequested = false;
	      if (this.video && this.config.autoStartLoad) {
	        this.startLoad();
	      }
	    }
	  }, {
	    key: 'onLevelLoaded',
	    value: function onLevelLoaded(event, data) {
	      var newDetails = data.details,
	          newLevelId = data.level,
	          curLevel = this.levels[newLevelId],
	          duration = newDetails.totalduration;

	      _utilsLogger.logger.log('level ' + newLevelId + ' loaded [' + newDetails.startSN + ',' + newDetails.endSN + '],duration:' + duration);

	      if (newDetails.live) {
	        var curDetails = curLevel.details;
	        if (curDetails) {
	          // we already have details for that level, merge them
	          _helperLevelHelper2['default'].mergeDetails(curDetails, newDetails);
	          if (newDetails.PTSKnown) {
	            _utilsLogger.logger.log('live playlist sliding:' + newDetails.fragments[0].start.toFixed(3));
	          } else {
	            _utilsLogger.logger.log('live playlist - outdated PTS, unknown sliding');
	          }
	        } else {
	          newDetails.PTSKnown = false;
	          _utilsLogger.logger.log('live playlist - first load, unknown sliding');
	        }
	      } else {
	        newDetails.PTSKnown = false;
	      }
	      // override level info
	      curLevel.details = newDetails;
	      this.hls.trigger(_events2['default'].LEVEL_UPDATED, { details: newDetails, level: newLevelId });

	      // compute start position
	      if (this.startLevelLoaded === false) {
	        // if live playlist, set start position to be fragment N-this.config.liveSyncDurationCount (usually 3)
	        if (newDetails.live) {
	          this.startPosition = Math.max(0, duration - this.config.liveSyncDurationCount * newDetails.targetduration);
	        }
	        this.nextLoadPosition = this.startPosition;
	        this.startLevelLoaded = true;
	      }
	      // only switch batck to IDLE state if we were waiting for level to start downloading a new fragment
	      if (this.state === this.WAITING_LEVEL) {
	        this.state = this.IDLE;
	      }
	      //trigger handler right now
	      this.tick();
	    }
	  }, {
	    key: 'onFragLoaded',
	    value: function onFragLoaded(event, data) {
	      var fragCurrent = this.fragCurrent;
	      if (this.state === this.LOADING && fragCurrent && data.frag.level === fragCurrent.level && data.frag.sn === fragCurrent.sn) {
	        if (this.fragBitrateTest === true) {
	          // switch back to IDLE state ... we just loaded a fragment to determine adequate start bitrate and initialize autoswitch algo
	          this.state = this.IDLE;
	          this.fragBitrateTest = false;
	          data.stats.tparsed = data.stats.tbuffered = new Date();
	          this.hls.trigger(_events2['default'].FRAG_BUFFERED, { stats: data.stats, frag: fragCurrent });
	        } else {
	          this.state = this.PARSING;
	          // transmux the MPEG-TS data to ISO-BMFF segments
	          this.stats = data.stats;
	          var currentLevel = this.levels[this.level],
	              details = currentLevel.details,
	              duration = details.totalduration,
	              start = fragCurrent.start;
	          _utilsLogger.logger.log('Demuxing ' + fragCurrent.sn + ' of [' + details.startSN + ' ,' + details.endSN + '],level ' + this.level);
	          this.demuxer.push(data.payload, currentLevel.audioCodec, currentLevel.videoCodec, start, fragCurrent.cc, this.level, duration);
	        }
	      }
	    }
	  }, {
	    key: 'onInitSegment',
	    value: function onInitSegment(event, data) {
	      if (this.state === this.PARSING) {
	        // check if codecs have been explicitely defined in the master playlist for this level;
	        // if yes use these ones instead of the ones parsed from the demux
	        var audioCodec = this.levels[this.level].audioCodec,
	            videoCodec = this.levels[this.level].videoCodec,
	            sb;
	        //logger.log('playlist level A/V codecs:' + audioCodec + ',' + videoCodec);
	        //logger.log('playlist codecs:' + codec);
	        // if playlist does not specify codecs, use codecs found while parsing fragment
	        if (audioCodec === undefined || data.audiocodec === undefined) {
	          audioCodec = data.audioCodec;
	        }
	        if (videoCodec === undefined || data.videocodec === undefined) {
	          videoCodec = data.videoCodec;
	        }
	        // in case several audio codecs might be used, force HE-AAC for audio (some browsers don't support audio codec switch)
	        //don't do it for mono streams ...
	        if (this.audiocodecswitch && data.audioChannelCount === 2 && navigator.userAgent.toLowerCase().indexOf('android') === -1 && navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
	          audioCodec = 'mp4a.40.5';
	        }
	        if (!this.sourceBuffer) {
	          this.sourceBuffer = {};
	          _utilsLogger.logger.log('selected A/V codecs for sourceBuffers:' + audioCodec + ',' + videoCodec);
	          // create source Buffer and link them to MediaSource
	          if (audioCodec) {
	            sb = this.sourceBuffer.audio = this.mediaSource.addSourceBuffer('video/mp4;codecs=' + audioCodec);
	            sb.addEventListener('updateend', this.onsbue);
	            sb.addEventListener('error', this.onsbe);
	          }
	          if (videoCodec) {
	            sb = this.sourceBuffer.video = this.mediaSource.addSourceBuffer('video/mp4;codecs=' + videoCodec);
	            sb.addEventListener('updateend', this.onsbue);
	            sb.addEventListener('error', this.onsbe);
	          }
	        }
	        if (audioCodec) {
	          this.mp4segments.push({ type: 'audio', data: data.audioMoov });
	        }
	        if (videoCodec) {
	          this.mp4segments.push({ type: 'video', data: data.videoMoov });
	        }
	        //trigger handler right now
	        this.tick();
	      }
	    }
	  }, {
	    key: 'onFragParsing',
	    value: function onFragParsing(event, data) {
	      if (this.state === this.PARSING) {
	        this.tparse2 = Date.now();
	        var level = this.levels[this.level],
	            frag = this.fragCurrent;
	        _utilsLogger.logger.log('parsed data, type/startPTS/endPTS/startDTS/endDTS/nb:' + data.type + '/' + data.startPTS.toFixed(3) + '/' + data.endPTS.toFixed(3) + '/' + data.startDTS.toFixed(3) + '/' + data.endDTS.toFixed(3) + '/' + data.nb);
	        var drift = _helperLevelHelper2['default'].updateFragPTS(level.details, frag.sn, data.startPTS, data.endPTS);
	        this.hls.trigger(_events2['default'].LEVEL_PTS_UPDATED, { details: level.details, level: this.level, drift: drift });

	        this.mp4segments.push({ type: data.type, data: data.moof });
	        this.mp4segments.push({ type: data.type, data: data.mdat });
	        this.nextLoadPosition = data.endPTS;
	        this.bufferRange.push({ type: data.type, start: data.startPTS, end: data.endPTS, frag: frag });

	        //trigger handler right now
	        this.tick();
	      } else {
	        _utilsLogger.logger.warn('not in PARSING state, discarding ' + event);
	      }
	    }
	  }, {
	    key: 'onFragParsed',
	    value: function onFragParsed() {
	      if (this.state === this.PARSING) {
	        this.state = this.PARSED;
	        this.stats.tparsed = new Date();
	        //trigger handler right now
	        this.tick();
	      }
	    }
	  }, {
	    key: 'onError',
	    value: function onError(event, data) {
	      switch (data.details) {
	        // abort fragment loading on errors
	        case _errors.ErrorDetails.FRAG_LOAD_ERROR:
	        case _errors.ErrorDetails.FRAG_LOAD_TIMEOUT:
	        case _errors.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
	        case _errors.ErrorDetails.LEVEL_LOAD_ERROR:
	        case _errors.ErrorDetails.LEVEL_LOAD_TIMEOUT:
	          // if fatal error, stop processing, otherwise move to IDLE to retry loading
	          _utilsLogger.logger.warn('buffer controller: ' + data.details + ' while loading frag,switch to ' + (data.fatal ? 'ERROR' : 'IDLE') + ' state ...');
	          this.state = data.fatal ? this.ERROR : this.IDLE;
	          break;
	        default:
	          break;
	      }
	    }
	  }, {
	    key: 'onSBUpdateEnd',
	    value: function onSBUpdateEnd() {
	      //trigger handler right now
	      if (this.state === this.APPENDING && this.mp4segments.length === 0) {
	        var frag = this.fragCurrent,
	            stats = this.stats;
	        if (frag) {
	          this.fragPrevious = frag;
	          stats.tbuffered = new Date();
	          this.fragLastKbps = Math.round(8 * stats.length / (stats.tbuffered - stats.tfirst));
	          this.hls.trigger(_events2['default'].FRAG_BUFFERED, { stats: stats, frag: frag });
	          _utilsLogger.logger.log('video buffered : ' + this.timeRangesToString(this.video.buffered));
	          this.state = this.IDLE;
	        }
	        var video = this.video;
	        if (video) {
	          // seek back to a expected position after video buffered if needed
	          if (this.seekAfterBuffered) {
	            video.currentTime = this.seekAfterBuffered;
	          } else {
	            var currentTime = video.currentTime;
	            var bufferInfo = this.bufferInfo(currentTime, 0);
	            // check if current time is buffered or not
	            if (bufferInfo.len === 0) {
	              // no buffer available @ currentTime, check if next buffer is close (in a 300 ms range)
	              var nextBufferStart = bufferInfo.nextStart;
	              if (nextBufferStart && nextBufferStart - currentTime < 0.3) {
	                // next buffer is close ! adjust currentTime to nextBufferStart
	                // this will ensure effective video decoding
	                _utilsLogger.logger.log('adjust currentTime from ' + currentTime + ' to ' + nextBufferStart);
	                video.currentTime = nextBufferStart;
	              }
	            }
	          }
	        }
	        // reset this variable, whether it was set or not
	        this.seekAfterBuffered = undefined;
	      }
	      this.tick();
	    }
	  }, {
	    key: 'onSBUpdateError',
	    value: function onSBUpdateError(event) {
	      _utilsLogger.logger.error('sourceBuffer error:' + event);
	      this.state = this.ERROR;
	      this.hls.trigger(_events2['default'].ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.FRAG_APPENDING_ERROR, fatal: true, frag: this.fragCurrent });
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
	      if (this.video) {
	        var range = this.getBufferRange(this.video.currentTime);
	        if (range) {
	          return range.frag.level;
	        }
	      }
	      return -1;
	    }
	  }, {
	    key: 'nextBufferRange',
	    get: function get() {
	      if (this.video) {
	        // first get end range of current fragment
	        return this.followingBufferRange(this.getBufferRange(this.video.currentTime));
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

	  return BufferController;
	})();

	exports['default'] = BufferController;
	module.exports = exports['default'];

/***/ },
/* 106 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function noop() {}

	var fakeLogger = {
	  log: noop,
	  warn: noop,
	  info: noop,
	  error: noop
	};

	var exportedLogger = fakeLogger;

	var enableLogs = function enableLogs(debug) {
	  if (debug === true || typeof debug === 'object') {
	    exportedLogger.log = debug.log ? debug.log.bind(debug) : console.log.bind(console);
	    exportedLogger.info = debug.info ? debug.info.bind(debug) : console.info.bind(console);
	    exportedLogger.error = debug.error ? debug.error.bind(debug) : console.error.bind(console);
	    exportedLogger.warn = debug.warn ? debug.warn.bind(debug) : console.warn.bind(console);
	    // Some browsers don't allow to use bind on console object anyway
	    // fallback to default if needed
	    try {
	      exportedLogger.log();
	    } catch (e) {
	      exportedLogger.log = noop;
	      exportedLogger.info = noop;
	      exportedLogger.error = noop;
	      exportedLogger.warn = noop;
	    }
	  } else {
	    exportedLogger = fakeLogger;
	  }
	};

	exports.enableLogs = enableLogs;
	var logger = exportedLogger;
	exports.logger = logger;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _events = __webpack_require__(100);

	var _events2 = _interopRequireDefault(_events);

	var _demuxDemuxerInline = __webpack_require__(108);

	var _demuxDemuxerInline2 = _interopRequireDefault(_demuxDemuxerInline);

	var _demuxDemuxerWorker = __webpack_require__(111);

	var _demuxDemuxerWorker2 = _interopRequireDefault(_demuxDemuxerWorker);

	var _utilsLogger = __webpack_require__(106);

	var _remuxMp4Remuxer = __webpack_require__(113);

	var _remuxMp4Remuxer2 = _interopRequireDefault(_remuxMp4Remuxer);

	var Demuxer = (function () {
	  function Demuxer(hls) {
	    _classCallCheck(this, Demuxer);

	    this.hls = hls;
	    if (hls.config.enableWorker && typeof Worker !== 'undefined') {
	      _utilsLogger.logger.log('demuxing in webworker');
	      try {
	        var work = __webpack_require__(115);
	        this.w = work(_demuxDemuxerWorker2['default']);
	        this.onwmsg = this.onWorkerMessage.bind(this);
	        this.w.addEventListener('message', this.onwmsg);
	        this.w.postMessage({ cmd: 'init' });
	      } catch (err) {
	        _utilsLogger.logger.error('error while initializing DemuxerWorker, fallback on DemuxerInline');
	        this.demuxer = new _demuxDemuxerInline2['default'](hls, _remuxMp4Remuxer2['default']);
	      }
	    } else {
	      this.demuxer = new _demuxDemuxerInline2['default'](hls, _remuxMp4Remuxer2['default']);
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
	      }
	    }
	  }, {
	    key: 'push',
	    value: function push(data, audioCodec, videoCodec, timeOffset, cc, level, duration) {
	      if (this.w) {
	        // post fragment payload as transferable objects (no copy)
	        this.w.postMessage({ cmd: 'demux', data: data, audioCodec: audioCodec, videoCodec: videoCodec, timeOffset: timeOffset, cc: cc, level: level, duration: duration }, [data]);
	      } else {
	        this.demuxer.push(new Uint8Array(data), audioCodec, videoCodec, timeOffset, cc, level, duration);
	        this.demuxer.remux();
	      }
	    }
	  }, {
	    key: 'onWorkerMessage',
	    value: function onWorkerMessage(ev) {
	      //console.log('onWorkerMessage:' + ev.data.event);
	      switch (ev.data.event) {
	        case _events2['default'].FRAG_PARSING_INIT_SEGMENT:
	          var obj = {};
	          if (ev.data.audioMoov) {
	            obj.audioMoov = new Uint8Array(ev.data.audioMoov);
	            obj.audioCodec = ev.data.audioCodec;
	            obj.audioChannelCount = ev.data.audioChannelCount;
	          }
	          if (ev.data.videoMoov) {
	            obj.videoMoov = new Uint8Array(ev.data.videoMoov);
	            obj.videoCodec = ev.data.videoCodec;
	            obj.videoWidth = ev.data.videoWidth;
	            obj.videoHeight = ev.data.videoHeight;
	          }
	          this.hls.trigger(_events2['default'].FRAG_PARSING_INIT_SEGMENT, obj);
	          break;
	        case _events2['default'].FRAG_PARSING_DATA:
	          this.hls.trigger(_events2['default'].FRAG_PARSING_DATA, {
	            moof: new Uint8Array(ev.data.moof),
	            mdat: new Uint8Array(ev.data.mdat),
	            startPTS: ev.data.startPTS,
	            endPTS: ev.data.endPTS,
	            startDTS: ev.data.startDTS,
	            endDTS: ev.data.endDTS,
	            type: ev.data.type,
	            nb: ev.data.nb
	          });
	          break;
	        case _events2['default'].FRAG_PARSING_METADATA:
	          this.hls.trigger(_events2['default'].FRAG_PARSING_METADATA, {
	            samples: ev.data.samples
	          });
	          break;
	        default:
	          this.hls.trigger(ev.data.event, ev.data.data);
	          break;
	      }
	    }
	  }]);

	  return Demuxer;
	})();

	exports['default'] = Demuxer;
	module.exports = exports['default'];

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	/*  inline demuxer.
	 *   probe fragments and instantiate appropriate demuxer depending on content type (TSDemuxer, AACDemuxer, ...)
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _events = __webpack_require__(100);

	var _events2 = _interopRequireDefault(_events);

	var _errors = __webpack_require__(101);

	var _demuxTsdemuxer = __webpack_require__(109);

	var _demuxTsdemuxer2 = _interopRequireDefault(_demuxTsdemuxer);

	var DemuxerInline = (function () {
	  function DemuxerInline(hls, remuxer) {
	    _classCallCheck(this, DemuxerInline);

	    this.hls = hls;
	    this.remuxer = remuxer;
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
	    value: function push(data, audioCodec, videoCodec, timeOffset, cc, level, duration) {
	      var demuxer = this.demuxer;
	      if (!demuxer) {
	        // probe for content type
	        if (_demuxTsdemuxer2['default'].probe(data)) {
	          demuxer = this.demuxer = new _demuxTsdemuxer2['default'](this.hls, this.remuxer);
	        } else {
	          this.hls.trigger(_events2['default'].ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.FRAG_PARSING_ERROR, fatal: true, reason: 'no demux matching with content found' });
	          return;
	        }
	      }
	      demuxer.push(data, audioCodec, videoCodec, timeOffset, cc, level, duration);
	    }
	  }, {
	    key: 'remux',
	    value: function remux() {
	      var demuxer = this.demuxer;
	      if (demuxer) {
	        demuxer.remux();
	      }
	    }
	  }]);

	  return DemuxerInline;
	})();

	exports['default'] = DemuxerInline;
	module.exports = exports['default'];

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * highly optimized TS demuxer:
	 * parse PAT, PMT
	 * extract PES packet from audio and video PIDs
	 * extract AVC/H264 NAL units and AAC/ADTS samples from PES packet
	 * trigger the remuxer upon parsing completion
	 * it also tries to workaround as best as it can audio codec switch (HE-AAC to AAC and vice versa), without having to restart the MediaSource.
	 * it also controls the remuxing process :
	 * upon discontinuity or level switch detection, it will also notifies the remuxer so that it can reset its state.
	*/

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _events = __webpack_require__(100);

	var _events2 = _interopRequireDefault(_events);

	var _expGolomb = __webpack_require__(110);

	var _expGolomb2 = _interopRequireDefault(_expGolomb);

	// import Hex from '../utils/hex';

	var _utilsLogger = __webpack_require__(106);

	var _errors = __webpack_require__(101);

	var TSDemuxer = (function () {
	  function TSDemuxer(observer, remuxerClass) {
	    _classCallCheck(this, TSDemuxer);

	    this.observer = observer;
	    this.remuxerClass = remuxerClass;
	    this.lastCC = 0;
	    this.PES_TIMESCALE = 90000;
	    this.remuxer = new this.remuxerClass(observer);
	  }

	  _createClass(TSDemuxer, [{
	    key: 'switchLevel',
	    value: function switchLevel() {
	      this.pmtParsed = false;
	      this._pmtId = -1;
	      this._avcTrack = { type: 'video', id: -1, sequenceNumber: 0, samples: [], len: 0, nbNalu: 0 };
	      this._aacTrack = { type: 'audio', id: -1, sequenceNumber: 0, samples: [], len: 0 };
	      this._id3Track = { type: 'id3', id: -1, sequenceNumber: 0, samples: [], len: 0 };
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
	    value: function push(data, audioCodec, videoCodec, timeOffset, cc, level, duration) {
	      var avcData,
	          aacData,
	          id3Data,
	          start,
	          len = data.length,
	          stt,
	          pid,
	          atf,
	          offset;
	      this.audioCodec = audioCodec;
	      this.videoCodec = videoCodec;
	      this.timeOffset = timeOffset;
	      this._duration = duration;
	      if (cc !== this.lastCC) {
	        _utilsLogger.logger.log('discontinuity detected');
	        this.insertDiscontinuity();
	        this.lastCC = cc;
	      } else if (level !== this.lastLevel) {
	        _utilsLogger.logger.log('level switch detected');
	        this.switchLevel();
	        this.lastLevel = level;
	      }
	      var pmtParsed = this.pmtParsed,
	          avcId = this._avcTrack.id,
	          aacId = this._aacTrack.id,
	          id3Id = this._id3Track.id;
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
	          this.observer.trigger(_events2['default'].ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.FRAG_PARSING_ERROR, fatal: false, reason: 'TS packet did not start with 0x47' });
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
	    }
	  }, {
	    key: 'remux',
	    value: function remux() {
	      this.remuxer.remux(this._aacTrack, this._avcTrack, this._id3Track, this.timeOffset);
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
	            _utilsLogger.logger.log('unkown stream type:' + data[offset]);
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
	          payloadStartOffset;
	      //retrieve PTS/DTS from first fragment
	      frag = stream.data[0];
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
	        // trim PES header
	        stream.data[0] = stream.data[0].subarray(payloadStartOffset);
	        stream.size -= payloadStartOffset;
	        //reassemble PES packet
	        pesData = new Uint8Array(stream.size);
	        // reassemble the packet
	        while (stream.data.length) {
	          frag = stream.data.shift();
	          pesData.set(frag, i);
	          i += frag.byteLength;
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

	      var units,
	          track = this._avcTrack,
	          avcSample,
	          key = false;
	      units = this._parseAVCNALu(pes.data);
	      // no NALu found
	      if (units.length === 0 & this._avcTrack.samples.length > 0) {
	        // append pes.data to previous NAL unit
	        var lastavcSample = this._avcTrack.samples[this._avcTrack.samples.length - 1];
	        var lastUnit = lastavcSample.units.units[lastavcSample.units.units.length - 1];
	        var tmp = new Uint8Array(lastUnit.data.byteLength + pes.data.byteLength);
	        tmp.set(lastUnit.data, 0);
	        tmp.set(pes.data, lastUnit.data.byteLength);
	        lastUnit.data = tmp;
	        lastavcSample.units.length += pes.data.byteLength;
	        this._avcTrack.len += pes.data.byteLength;
	      }
	      //free pes.data to save up some memory
	      pes.data = null;
	      //var debugString = '';
	      units.units.forEach(function (unit) {
	        switch (unit.type) {
	          //NDR
	          // case 1:
	          //   debugString += 'NDR ';
	          //   break;
	          //IDR
	          case 5:
	            //debugString += 'IDR ';
	            key = true;
	            break;
	          //case 6:
	          //  debugString += 'SEI ';
	          //  break;
	          //SPS
	          case 7:
	            //debugString += 'SPS ';
	            if (!track.sps) {
	              var expGolombDecoder = new _expGolomb2['default'](unit.data);
	              var config = expGolombDecoder.readSPS();
	              track.width = config.width;
	              track.height = config.height;
	              track.profileIdc = config.profileIdc;
	              track.profileCompat = config.profileCompat;
	              track.levelIdc = config.levelIdc;
	              track.sps = [unit.data];
	              track.timescale = _this.remuxer.timescale;
	              track.duration = _this.remuxer.timescale * _this._duration;
	              var codecarray = unit.data.subarray(1, 4);
	              var codecstring = 'avc1.';
	              for (var i = 0; i < 3; i++) {
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
	            //debugString += 'PPS ';
	            if (!track.pps) {
	              track.pps = [unit.data];
	            }
	            break;
	          //case 9:
	          //  debugString += 'AUD ';
	          default:
	            break;
	        }
	      });
	      //logger.log(debugString);
	      //build sample from PES
	      // Annex B to MP4 conversion to be done
	      if (units.length) {
	        // only push AVC sample if keyframe already found. browsers expect a keyframe at first to start decoding
	        if (key === true || track.sps) {
	          avcSample = { units: units, pts: pes.pts, dts: pes.dts, key: key };
	          this._avcTrack.samples.push(avcSample);
	          this._avcTrack.len += units.length;
	          this._avcTrack.nbNalu += units.units.length;
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
	          lastUnitType,
	          length = 0;
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
	            } else if (value === 1) {
	              unitType = array[i] & 0x1f;
	              //logger.log('find NALU @ offset:' + i + ',type:' + unitType);
	              if (lastUnitStart) {
	                unit = { data: array.subarray(lastUnitStart, i - state - 1), type: lastUnitType };
	                length += i - state - 1 - lastUnitStart;
	                //logger.log('pushing NALU, type/size:' + unit.type + '/' + unit.data.byteLength);
	                units.push(unit);
	              } else {
	                // If NAL units are not starting right at the beginning of the PES packet, push preceding data into previous NAL unit.
	                overflow = i - state - 1;
	                if (overflow) {
	                  //logger.log('first NALU found with overflow:' + overflow);
	                  if (this._avcTrack.samples.length) {
	                    var lastavcSample = this._avcTrack.samples[this._avcTrack.samples.length - 1];
	                    var lastUnit = lastavcSample.units.units[lastavcSample.units.units.length - 1];
	                    var tmp = new Uint8Array(lastUnit.data.byteLength + overflow);
	                    tmp.set(lastUnit.data, 0);
	                    tmp.set(array.subarray(0, overflow), lastUnit.data.byteLength);
	                    lastUnit.data = tmp;
	                    lastavcSample.units.length += overflow;
	                    this._avcTrack.len += overflow;
	                  }
	                }
	              }
	              lastUnitStart = i;
	              lastUnitType = unitType;
	              if (unitType === 1 || unitType === 5) {
	                // OPTI !!! if IDR/NDR unit, consider it is last NALu
	                i = len;
	              }
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
	        length += len - lastUnitStart;
	        units.push(unit);
	        //logger.log('pushing NALU, type/size:' + unit.type + '/' + unit.data.byteLength);
	      }
	      return { units: units, length: length };
	    }
	  }, {
	    key: '_parseAACPES',
	    value: function _parseAACPES(pes) {
	      var track = this._aacTrack,
	          aacSample,
	          data = pes.data,
	          config,
	          adtsFrameSize,
	          adtsStartOffset,
	          adtsHeaderLen,
	          stamp,
	          nbSamples,
	          len;
	      if (this.aacOverFlow) {
	        var tmp = new Uint8Array(this.aacOverFlow.byteLength + data.byteLength);
	        tmp.set(this.aacOverFlow, 0);
	        tmp.set(data, this.aacOverFlow.byteLength);
	        data = tmp;
	      }
	      // look for ADTS header (0xFFFx)
	      for (adtsStartOffset = 0, len = data.length; adtsStartOffset < len - 1; adtsStartOffset++) {
	        if (data[adtsStartOffset] === 0xff && (data[adtsStartOffset + 1] & 0xf0) === 0xf0) {
	          break;
	        }
	      }
	      // if ADTS header does not start straight from the beginning of the PES payload, raise an error
	      if (adtsStartOffset) {
	        var reason, fatal;
	        if (adtsStartOffset < len - 1) {
	          reason = 'AAC PES did not start with ADTS header,offset:' + adtsStartOffset;
	          fatal = false;
	        } else {
	          reason = 'no ADTS header found in AAC PES';
	          fatal = true;
	        }
	        this.observer.trigger(_events2['default'].ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.FRAG_PARSING_ERROR, fatal: fatal, reason: reason });
	        if (fatal) {
	          return;
	        }
	      }
	      if (!track.audiosamplerate) {
	        config = this._ADTStoAudioConfig(data, adtsStartOffset, this.audioCodec);
	        track.config = config.config;
	        track.audiosamplerate = config.samplerate;
	        track.channelCount = config.channelCount;
	        track.codec = config.codec;
	        track.timescale = this.remuxer.timescale;
	        track.duration = this.remuxer.timescale * this._duration;
	        _utilsLogger.logger.log('parsed codec:' + track.codec + ',rate:' + config.samplerate + ',nb channel:' + config.channelCount);
	      }
	      nbSamples = 0;
	      while (adtsStartOffset + 5 < len) {
	        // retrieve frame size
	        adtsFrameSize = (data[adtsStartOffset + 3] & 0x03) << 11;
	        // byte 4
	        adtsFrameSize |= data[adtsStartOffset + 4] << 3;
	        // byte 5
	        adtsFrameSize |= (data[adtsStartOffset + 5] & 0xE0) >>> 5;
	        adtsHeaderLen = !!(data[adtsStartOffset + 1] & 0x01) ? 7 : 9;
	        adtsFrameSize -= adtsHeaderLen;
	        stamp = Math.round(pes.pts + nbSamples * 1024 * this.PES_TIMESCALE / track.audiosamplerate);
	        //stamp = pes.pts;
	        //console.log('AAC frame, offset/length/pts:' + (adtsStartOffset+7) + '/' + adtsFrameSize + '/' + stamp.toFixed(0));
	        if (adtsStartOffset + adtsHeaderLen + adtsFrameSize <= len) {
	          aacSample = { unit: data.subarray(adtsStartOffset + adtsHeaderLen, adtsStartOffset + adtsHeaderLen + adtsFrameSize), pts: stamp, dts: stamp };
	          this._aacTrack.samples.push(aacSample);
	          this._aacTrack.len += adtsFrameSize;
	          adtsStartOffset += adtsFrameSize + adtsHeaderLen;
	          nbSamples++;
	        } else {
	          break;
	        }
	      }
	      if (adtsStartOffset < len) {
	        this.aacOverFlow = data.subarray(adtsStartOffset, len);
	      } else {
	        this.aacOverFlow = null;
	      }
	    }
	  }, {
	    key: '_ADTStoAudioConfig',
	    value: function _ADTStoAudioConfig(data, offset, audioCodec) {
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
	        this.observer.trigger(_events2['default'].ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.FRAG_PARSING_ERROR, fatal: true, reason: 'invalid ADTS sampling index:' + adtsSampleingIndex });
	        return;
	      }
	      adtsChanelConfig = (data[offset + 2] & 0x01) << 2;
	      // byte 3
	      adtsChanelConfig |= (data[offset + 3] & 0xC0) >>> 6;
	      _utilsLogger.logger.log('manifest codec:' + audioCodec + ',ADTS data:type:' + adtsObjectType + ',sampleingIndex:' + adtsSampleingIndex + '[' + adtsSampleingRates[adtsSampleingIndex] + 'kHz],channelConfig:' + adtsChanelConfig);
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
	          // if (manifest codec is HE-AAC) OR (manifest codec not specified AND frequency less than 24kHz)
	          if (audioCodec && audioCodec.indexOf('mp4a.40.5') !== -1 || !audioCodec && adtsSampleingIndex >= 6) {
	            // HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
	            // there is a factor 2 between frame sample rate and output sample rate
	            // multiply frequency by 2 (see table below, equivalent to substract 3)
	            adtsExtensionSampleingIndex = adtsSampleingIndex - 3;
	          } else {
	            // if (manifest codec is AAC) AND (frequency less than 24kHz OR nb channel is 1)
	            if (audioCodec && audioCodec.indexOf('mp4a.40.2') !== -1 && (adtsSampleingIndex >= 6 || adtsChanelConfig === 1)) {
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
	})();

	exports['default'] = TSDemuxer;
	module.exports = exports['default'];

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Parser for exponential Golomb codes, a variable-bitwidth number encoding scheme used by h264.
	*/

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsLogger = __webpack_require__(106);

	var ExpGolomb = (function () {
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
	        _utilsLogger.logger.error('Cannot read more than 32 bits at a time');
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
	      if (profileIdc === 100 || profileIdc === 110 || profileIdc === 122 || profileIdc === 144) {
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
	      return {
	        profileIdc: profileIdc,
	        profileCompat: profileCompat,
	        levelIdc: levelIdc,
	        width: (picWidthInMbsMinus1 + 1) * 16 - frameCropLeftOffset * 2 - frameCropRightOffset * 2,
	        height: (2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16 - frameCropTopOffset * 2 - frameCropBottomOffset * 2
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
	})();

	exports['default'] = ExpGolomb;
	module.exports = exports['default'];

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	/* demuxer web worker. 
	 *  - listen to worker message, and trigger DemuxerInline upon reception of Fragments.
	 *  - provides MP4 Boxes back to main thread using [transferable objects](https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast) in order to minimize message passing overhead.
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _demuxDemuxerInline = __webpack_require__(108);

	var _demuxDemuxerInline2 = _interopRequireDefault(_demuxDemuxerInline);

	var _events = __webpack_require__(100);

	var _events2 = _interopRequireDefault(_events);

	var _events3 = __webpack_require__(112);

	var _events4 = _interopRequireDefault(_events3);

	var _remuxMp4Remuxer = __webpack_require__(113);

	var _remuxMp4Remuxer2 = _interopRequireDefault(_remuxMp4Remuxer);

	var DemuxerWorker = function DemuxerWorker(self) {
	  // observer setup
	  var observer = new _events4['default']();
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
	    //console.log('demuxer cmd:' + ev.data.cmd);
	    switch (ev.data.cmd) {
	      case 'init':
	        self.demuxer = new _demuxDemuxerInline2['default'](observer, _remuxMp4Remuxer2['default']);
	        break;
	      case 'demux':
	        self.demuxer.push(new Uint8Array(ev.data.data), ev.data.audioCodec, ev.data.videoCodec, ev.data.timeOffset, ev.data.cc, ev.data.level, ev.data.duration);
	        self.demuxer.remux();
	        break;
	      default:
	        break;
	    }
	  });

	  // listen to events triggered by TS Demuxer
	  observer.on(_events2['default'].FRAG_PARSING_INIT_SEGMENT, function (ev, data) {
	    var objData = { event: ev };
	    var objTransferable = [];
	    if (data.audioCodec) {
	      objData.audioCodec = data.audioCodec;
	      objData.audioMoov = data.audioMoov.buffer;
	      objData.audioChannelCount = data.audioChannelCount;
	      objTransferable.push(objData.audioMoov);
	    }
	    if (data.videoCodec) {
	      objData.videoCodec = data.videoCodec;
	      objData.videoMoov = data.videoMoov.buffer;
	      objData.videoWidth = data.videoWidth;
	      objData.videoHeight = data.videoHeight;
	      objTransferable.push(objData.videoMoov);
	    }
	    // pass moov as transferable object (no copy)
	    self.postMessage(objData, objTransferable);
	  });

	  observer.on(_events2['default'].FRAG_PARSING_DATA, function (ev, data) {
	    var objData = { event: ev, type: data.type, startPTS: data.startPTS, endPTS: data.endPTS, startDTS: data.startDTS, endDTS: data.endDTS, moof: data.moof.buffer, mdat: data.mdat.buffer, nb: data.nb };
	    // pass moof/mdat data as transferable object (no copy)
	    self.postMessage(objData, [objData.moof, objData.mdat]);
	  });

	  observer.on(_events2['default'].FRAG_PARSED, function (event) {
	    self.postMessage({ event: event });
	  });

	  observer.on(_events2['default'].ERROR, function (event, data) {
	    self.postMessage({ event: event, data: data });
	  });

	  observer.on(_events2['default'].FRAG_PARSING_METADATA, function (event, data) {
	    var objData = { event: event, samples: data.samples };
	    self.postMessage(objData);
	  });
	};

	exports['default'] = DemuxerWorker;
	module.exports = exports['default'];

/***/ },
/* 112 */
/***/ function(module, exports) {

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

	'use strict';

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
	    for (i = 0; i < len; i++) listeners[i].apply(this, args);
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
	    while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]);
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
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * fMP4 remuxer
	*/

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _events = __webpack_require__(100);

	var _events2 = _interopRequireDefault(_events);

	var _utilsLogger = __webpack_require__(106);

	var _remuxMp4Generator = __webpack_require__(114);

	var _remuxMp4Generator2 = _interopRequireDefault(_remuxMp4Generator);

	var _errors = __webpack_require__(101);

	var MP4Remuxer = (function () {
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
	    value: function remux(audioTrack, videoTrack, id3Track, timeOffset) {
	      // generate Init Segment if needed
	      if (!this.ISGenerated) {
	        this.generateIS(audioTrack, videoTrack, timeOffset);
	      }
	      //logger.log('nb AVC samples:' + videoTrack.samples.length);
	      if (videoTrack.samples.length) {
	        this.remuxVideo(videoTrack, timeOffset);
	      }
	      //logger.log('nb AAC samples:' + audioTrack.samples.length);
	      if (audioTrack.samples.length) {
	        this.remuxAudio(audioTrack, timeOffset);
	      }
	      //logger.log('nb ID3 samples:' + audioTrack.samples.length);
	      if (id3Track.samples.length) {
	        this.remuxID3(id3Track, timeOffset);
	      }
	      //notify end of parsing
	      this.observer.trigger(_events2['default'].FRAG_PARSED);
	    }
	  }, {
	    key: 'generateIS',
	    value: function generateIS(audioTrack, videoTrack, timeOffset) {
	      var observer = this.observer,
	          audioSamples = audioTrack.samples,
	          videoSamples = videoTrack.samples,
	          nbAudio = audioSamples.length,
	          nbVideo = videoSamples.length,
	          pesTimeScale = this.PES_TIMESCALE;

	      if (nbAudio === 0 && nbVideo === 0) {
	        observer.trigger(_events2['default'].ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.FRAG_PARSING_ERROR, fatal: false, reason: 'no audio/video samples found' });
	      } else if (nbVideo === 0) {
	        //audio only
	        if (audioTrack.config) {
	          observer.trigger(_events2['default'].FRAG_PARSING_INIT_SEGMENT, {
	            audioMoov: _remuxMp4Generator2['default'].initSegment([audioTrack]),
	            audioCodec: audioTrack.codec,
	            audioChannelCount: audioTrack.channelCount
	          });
	          this.ISGenerated = true;
	        }
	        if (this._initPTS === undefined) {
	          // remember first PTS of this demuxing context
	          this._initPTS = audioSamples[0].pts - pesTimeScale * timeOffset;
	          this._initDTS = audioSamples[0].dts - pesTimeScale * timeOffset;
	        }
	      } else if (nbAudio === 0) {
	        //video only
	        if (videoTrack.sps && videoTrack.pps) {
	          observer.trigger(_events2['default'].FRAG_PARSING_INIT_SEGMENT, {
	            videoMoov: _remuxMp4Generator2['default'].initSegment([videoTrack]),
	            videoCodec: videoTrack.codec,
	            videoWidth: videoTrack.width,
	            videoHeight: videoTrack.height
	          });
	          this.ISGenerated = true;
	          if (this._initPTS === undefined) {
	            // remember first PTS of this demuxing context
	            this._initPTS = videoSamples[0].pts - pesTimeScale * timeOffset;
	            this._initDTS = videoSamples[0].dts - pesTimeScale * timeOffset;
	          }
	        }
	      } else {
	        //audio and video
	        if (audioTrack.config && videoTrack.sps && videoTrack.pps) {
	          observer.trigger(_events2['default'].FRAG_PARSING_INIT_SEGMENT, {
	            audioMoov: _remuxMp4Generator2['default'].initSegment([audioTrack]),
	            audioCodec: audioTrack.codec,
	            audioChannelCount: audioTrack.channelCount,
	            videoMoov: _remuxMp4Generator2['default'].initSegment([videoTrack]),
	            videoCodec: videoTrack.codec,
	            videoWidth: videoTrack.width,
	            videoHeight: videoTrack.height
	          });
	          this.ISGenerated = true;
	          if (this._initPTS === undefined) {
	            // remember first PTS of this demuxing context
	            this._initPTS = Math.min(videoSamples[0].pts, audioSamples[0].pts) - pesTimeScale * timeOffset;
	            this._initDTS = Math.min(videoSamples[0].dts, audioSamples[0].dts) - pesTimeScale * timeOffset;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'remuxVideo',
	    value: function remuxVideo(track, timeOffset) {
	      var view,
	          i = 8,
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
	          samples = [];
	      /* concatenate the video data and construct the mdat in place
	        (need 8 more bytes to fill length and mpdat type) */
	      mdat = new Uint8Array(track.len + 4 * track.nbNalu + 8);
	      view = new DataView(mdat.buffer);
	      view.setUint32(0, mdat.byteLength);
	      mdat.set(_remuxMp4Generator2['default'].types.mdat, 4);
	      while (track.samples.length) {
	        avcSample = track.samples.shift();
	        mp4SampleLength = 0;
	        // convert NALU bitstream to MP4 format (prepend NALU with size field)
	        while (avcSample.units.units.length) {
	          unit = avcSample.units.units.shift();
	          view.setUint32(i, unit.data.byteLength);
	          i += 4;
	          mdat.set(unit.data, i);
	          i += unit.data.byteLength;
	          mp4SampleLength += 4 + unit.data.byteLength;
	        }
	        pts = avcSample.pts - this._initDTS;
	        dts = avcSample.dts - this._initDTS;
	        //logger.log('Video/PTS/DTS:' + pts + '/' + dts);
	        // if not first AVC sample of video track, normalize PTS/DTS with previous sample value
	        // and ensure that sample duration is positive
	        if (lastDTS !== undefined) {
	          ptsnorm = this._PTSNormalize(pts, lastDTS);
	          dtsnorm = this._PTSNormalize(dts, lastDTS);
	          mp4Sample.duration = (dtsnorm - lastDTS) / pes2mp4ScaleFactor;
	          if (mp4Sample.duration < 0) {
	            //logger.log('invalid sample duration at PTS/DTS::' + avcSample.pts + '/' + avcSample.dts + ':' + mp4Sample.duration);
	            mp4Sample.duration = 0;
	          }
	        } else {
	          // first AVC sample of video track, normalize PTS/DTS
	          ptsnorm = this._PTSNormalize(pts, this.nextAvcDts);
	          dtsnorm = this._PTSNormalize(dts, this.nextAvcDts);
	          // check if first AVC sample is contiguous with last sample of previous track
	          // delta between next DTS and dtsnorm should be less than 1
	          if (this.nextAvcDts) {
	            var delta = Math.round((dtsnorm - this.nextAvcDts) / 90),
	                absdelta = Math.abs(delta);
	            //logger.log('absdelta/dts:' + absdelta + '/' + dtsnorm);
	            // if delta is less than 300 ms, next loaded fragment is assumed to be contiguous with last one
	            if (absdelta < 300) {
	              if (delta > 1) {
	                _utilsLogger.logger.log('AVC:' + delta + ' ms hole between fragments detected,filling it');
	              } else if (delta < -1) {
	                _utilsLogger.logger.log('AVC:' + -delta + ' ms overlapping between fragments detected');
	              }
	              if (absdelta) {
	                // set DTS to next DTS
	                dtsnorm = this.nextAvcDts;
	                // offset PTS as well, ensure that PTS is smaller or equal than new DTS
	                ptsnorm = Math.max(ptsnorm - delta, dtsnorm);
	                _utilsLogger.logger.log('Video/PTS/DTS adjusted:' + ptsnorm + '/' + dtsnorm);
	              }
	            } else {
	              // not contiguous timestamp, check if DTS is within acceptable range
	              var expectedDTS = pesTimeScale * timeOffset;
	              // check if there is any unexpected drift between expected timestamp and real one
	              if (Math.abs(expectedDTS - dtsnorm) > pesTimeScale * 3600) {
	                //logger.log('PTS looping ??? AVC PTS delta:${expectedPTS-ptsnorm}');
	                var dtsOffset = expectedDTS - dtsnorm;
	                // set PTS to next expected PTS;
	                dtsnorm = expectedDTS;
	                ptsnorm = dtsnorm;
	                // offset initPTS/initDTS to fix computation for following samples
	                this._initPTS -= dtsOffset;
	                this._initDTS -= dtsOffset;
	              }
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
	        if (avcSample.key === true) {
	          // the current sample is a key frame
	          mp4Sample.flags.dependsOn = 2;
	          mp4Sample.flags.isNonSync = 0;
	        } else {
	          mp4Sample.flags.dependsOn = 1;
	          mp4Sample.flags.isNonSync = 1;
	        }
	        samples.push(mp4Sample);
	        lastDTS = dtsnorm;
	      }
	      if (samples.length >= 2) {
	        mp4Sample.duration = samples[samples.length - 2].duration;
	      }
	      // next AVC sample DTS should be equal to last sample DTS + last sample duration
	      this.nextAvcDts = dtsnorm + mp4Sample.duration * pes2mp4ScaleFactor;
	      track.len = 0;
	      track.nbNalu = 0;
	      if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
	        // chrome workaround, mark first sample as being a Random Access Point to avoid sourcebuffer append issue
	        // https://code.google.com/p/chromium/issues/detail?id=229412
	        samples[0].flags.dependsOn = 2;
	        samples[0].flags.isNonSync = 0;
	      }
	      track.samples = samples;
	      moof = _remuxMp4Generator2['default'].moof(track.sequenceNumber++, firstDTS / pes2mp4ScaleFactor, track);
	      track.samples = [];
	      this.observer.trigger(_events2['default'].FRAG_PARSING_DATA, {
	        moof: moof,
	        mdat: mdat,
	        startPTS: firstPTS / pesTimeScale,
	        endPTS: (ptsnorm + pes2mp4ScaleFactor * mp4Sample.duration) / pesTimeScale,
	        startDTS: firstDTS / pesTimeScale,
	        endDTS: (dtsnorm + pes2mp4ScaleFactor * mp4Sample.duration) / pesTimeScale,
	        type: 'video',
	        nb: samples.length
	      });
	    }
	  }, {
	    key: 'remuxAudio',
	    value: function remuxAudio(track, timeOffset) {
	      var view,
	          i = 8,
	          pesTimeScale = this.PES_TIMESCALE,
	          pes2mp4ScaleFactor = this.PES2MP4SCALEFACTOR,
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
	          samples = [];
	      /* concatenate the audio data and construct the mdat in place
	        (need 8 more bytes to fill length and mdat type) */
	      mdat = new Uint8Array(track.len + 8);
	      view = new DataView(mdat.buffer);
	      view.setUint32(0, mdat.byteLength);
	      mdat.set(_remuxMp4Generator2['default'].types.mdat, 4);
	      while (track.samples.length) {
	        aacSample = track.samples.shift();
	        unit = aacSample.unit;
	        mdat.set(unit, i);
	        i += unit.byteLength;
	        pts = aacSample.pts - this._initDTS;
	        dts = aacSample.dts - this._initDTS;
	        //logger.log('Audio/PTS:' + aacSample.pts.toFixed(0));
	        if (lastDTS !== undefined) {
	          ptsnorm = this._PTSNormalize(pts, lastDTS);
	          dtsnorm = this._PTSNormalize(dts, lastDTS);
	          // we use DTS to compute sample duration, but we use PTS to compute initPTS which is used to sync audio and video
	          mp4Sample.duration = (dtsnorm - lastDTS) / pes2mp4ScaleFactor;
	          if (mp4Sample.duration < 0) {
	            //logger.log('invalid sample duration at PTS/DTS::' + avcSample.pts + '/' + avcSample.dts + ':' + mp4Sample.duration);
	            mp4Sample.duration = 0;
	          }
	        } else {
	          ptsnorm = this._PTSNormalize(pts, this.nextAacPts);
	          dtsnorm = this._PTSNormalize(dts, this.nextAacPts);
	          // check if fragments are contiguous (i.e. no missing frames between fragment)
	          if (this.nextAacPts && this.nextAacPts !== ptsnorm) {
	            //logger.log('Audio next PTS:' + this.nextAacPts);
	            var delta = Math.round(1000 * (ptsnorm - this.nextAacPts) / pesTimeScale),
	                absdelta = Math.abs(delta);
	            // if delta is less than 300 ms, next loaded fragment is assumed to be contiguous with last one
	            if (absdelta > 1 && absdelta < 300) {
	              if (delta > 0) {
	                _utilsLogger.logger.log('AAC:' + delta + ' ms hole between fragments detected,filling it');
	                // set PTS to next PTS, and ensure PTS is greater or equal than last DTS
	                //logger.log('Audio/PTS/DTS adjusted:' + aacSample.pts + '/' + aacSample.dts);
	              } else {
	                  _utilsLogger.logger.log('AAC:' + -delta + ' ms overlapping between fragments detected');
	                }
	              // set DTS to next DTS
	              ptsnorm = dtsnorm = this.nextAacPts;
	              _utilsLogger.logger.log('Audio/PTS/DTS adjusted:' + ptsnorm + '/' + dtsnorm);
	            } else if (absdelta) {
	              // not contiguous timestamp, check if PTS is within acceptable range
	              var expectedPTS = pesTimeScale * timeOffset;
	              //logger.log('expectedPTS/PTSnorm:${expectedPTS}/${ptsnorm}/${expectedPTS-ptsnorm}');
	              // check if there is any unexpected drift between expected timestamp and real one
	              if (Math.abs(expectedPTS - ptsnorm) > pesTimeScale * 3600) {
	                //logger.log('PTS looping ??? AAC PTS delta:${expectedPTS-ptsnorm}');
	                var ptsOffset = expectedPTS - ptsnorm;
	                // set PTS to next expected PTS;
	                ptsnorm = expectedPTS;
	                dtsnorm = ptsnorm;
	                // offset initPTS/initDTS to fix computation for following samples
	                this._initPTS -= ptsOffset;
	                this._initDTS -= ptsOffset;
	              }
	            }
	          }
	          // remember first PTS of our aacSamples, ensure value is positive
	          firstPTS = Math.max(0, ptsnorm);
	          firstDTS = Math.max(0, dtsnorm);
	        }
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
	      //set last sample duration as being identical to previous sample
	      if (samples.length >= 2) {
	        mp4Sample.duration = samples[samples.length - 2].duration;
	      }
	      // next aac sample PTS should be equal to last sample PTS + duration
	      this.nextAacPts = ptsnorm + pes2mp4ScaleFactor * mp4Sample.duration;
	      //logger.log('Audio/PTS/PTSend:' + aacSample.pts.toFixed(0) + '/' + this.nextAacDts.toFixed(0));
	      track.len = 0;
	      track.samples = samples;
	      moof = _remuxMp4Generator2['default'].moof(track.sequenceNumber++, firstDTS / pes2mp4ScaleFactor, track);
	      track.samples = [];
	      this.observer.trigger(_events2['default'].FRAG_PARSING_DATA, {
	        moof: moof,
	        mdat: mdat,
	        startPTS: firstPTS / pesTimeScale,
	        endPTS: this.nextAacPts / pesTimeScale,
	        startDTS: firstDTS / pesTimeScale,
	        endDTS: (dtsnorm + pes2mp4ScaleFactor * mp4Sample.duration) / pesTimeScale,
	        type: 'audio',
	        nb: samples.length
	      });
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
	        this.observer.trigger(_events2['default'].FRAG_PARSING_METADATA, {
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
	    key: 'timescale',
	    get: function get() {
	      return this.MP4_TIMESCALE;
	    }
	  }]);

	  return MP4Remuxer;
	})();

	exports['default'] = MP4Remuxer;
	module.exports = exports['default'];

/***/ },
/* 114 */
/***/ function(module, exports) {

	/**
	 * Generate MP4 Box
	*/

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var MP4 = (function () {
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

	      MP4.MAJOR_BRAND = new Uint8Array(['i'.charCodeAt(0), 's'.charCodeAt(0), 'o'.charCodeAt(0), 'm'.charCodeAt(0)]);

	      MP4.AVC1_BRAND = new Uint8Array(['a'.charCodeAt(0), 'v'.charCodeAt(0), 'c'.charCodeAt(0), '1'.charCodeAt(0)]);

	      MP4.MINOR_VERSION = new Uint8Array([0, 0, 0, 1]);

	      MP4.VIDEO_HDLR = new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, 0x00, 0x00, // pre_defined
	      0x76, 0x69, 0x64, 0x65, // handler_type: 'vide'
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x56, 0x69, 0x64, 0x65, 0x6f, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'VideoHandler'
	      ]);

	      MP4.AUDIO_HDLR = new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, 0x00, 0x00, // pre_defined
	      0x73, 0x6f, 0x75, 0x6e, // handler_type: 'soun'
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x53, 0x6f, 0x75, 0x6e, 0x64, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'SoundHandler'
	      ]);

	      MP4.HDLR_TYPES = {
	        'video': MP4.VIDEO_HDLR,
	        'audio': MP4.AUDIO_HDLR
	      };

	      MP4.DREF = new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, 0x00, 0x01, // entry_count
	      0x00, 0x00, 0x00, 0x0c, // entry_size
	      0x75, 0x72, 0x6c, 0x20, // 'url' type
	      0x00, // version 0
	      0x00, 0x00, 0x01 // entry_flags
	      ]);
	      MP4.STCO = new Uint8Array([0x00, // version
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, 0x00, 0x00 // entry_count
	      ]);
	      MP4.STSC = MP4.STCO;
	      MP4.STTS = MP4.STCO;
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

	      MP4.FTYP = MP4.box(MP4.types.ftyp, MP4.MAJOR_BRAND, MP4.MINOR_VERSION, MP4.MAJOR_BRAND, MP4.AVC1_BRAND);
	      MP4.DINF = MP4.box(MP4.types.dinf, MP4.box(MP4.types.dref, MP4.DREF));
	    }
	  }, {
	    key: 'box',
	    value: function box(type) {
	      var payload = Array.prototype.slice.call(arguments, 1),
	          size = 0,
	          i = payload.length,
	          result,
	          view;
	      // calculate the total size we need to allocate
	      while (i--) {
	        size += payload[i].byteLength;
	      }
	      result = new Uint8Array(size + 8);
	      view = new DataView(result.buffer);
	      view.setUint32(0, result.byteLength);
	      result.set(type, 4);
	      // copy the payload into the result
	      for (i = 0, size = 8; i < payload.length; i++) {
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
	          i;
	      // assemble the SPSs
	      for (i = 0; i < track.sps.length; i++) {
	        sps.push(track.sps[i].byteLength >>> 8 & 0xFF);
	        sps.push(track.sps[i].byteLength & 0xFF); // sequenceParameterSetLength
	        sps = sps.concat(Array.prototype.slice.call(track.sps[i])); // SPS
	      }
	      // assemble the PPSs
	      for (i = 0; i < track.pps.length; i++) {
	        pps.push(track.pps[i].byteLength >>> 8 & 0xFF);
	        pps.push(track.pps[i].byteLength & 0xFF);
	        pps = pps.concat(Array.prototype.slice.call(track.pps[i]));
	      }
	      return MP4.box(MP4.types.avc1, new Uint8Array([0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, // reserved
	      0x00, 0x01, // data_reference_index
	      0x00, 0x00, // pre_defined
	      0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
	      track.width >> 8 & 0xFF, track.width & 0xff, // width
	      track.height >> 8 & 0xFF, track.height & 0xff, // height
	      0x00, 0x48, 0x00, 0x00, // horizresolution
	      0x00, 0x48, 0x00, 0x00, // vertresolution
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x01, // frame_count
	      0x13, 0x76, 0x69, 0x64, 0x65, 0x6f, 0x6a, 0x73, 0x2d, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x69, 0x62, 0x2d, 0x68, 0x6c, 0x73, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // compressorname
	      0x00, 0x18, // depth = 24
	      0x11, 0x11]), // pre_defined = -1
	      MP4.box(MP4.types.avcC, new Uint8Array([0x01, // configurationVersion
	      track.profileIdc, // AVCProfileIndication
	      track.profileCompat, // profile_compatibility
	      track.levelIdc, // AVCLevelIndication
	      0xff // lengthSizeMinusOne, hard-coded to 4 bytes
	      ].concat([track.sps.length // numOfSequenceParameterSets
	      ]).concat(sps).concat([track.pps.length // numOfPictureParameterSets
	      ]).concat(pps))), // "PPS"
	      MP4.box(MP4.types.btrt, new Uint8Array([0x00, 0x1c, 0x9c, 0x80, // bufferSizeDB
	      0x00, 0x2d, 0xc6, 0xc0, // maxBitrate
	      0x00, 0x2d, 0xc6, 0xc0])) // avgBitrate
	      );
	    }
	  }, {
	    key: 'esds',
	    value: function esds(track) {
	      return new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags

	      0x03, // descriptor_type
	      0x17 + track.config.length, // length
	      0x00, 0x01, //es_id
	      0x00, // stream_priority

	      0x04, // descriptor_type
	      0x0f + track.config.length, // length
	      0x40, //codec : mpeg4_audio
	      0x15, // stream_type
	      0x00, 0x00, 0x00, // buffer_size
	      0x00, 0x00, 0x00, 0x00, // maxBitrate
	      0x00, 0x00, 0x00, 0x00, // avgBitrate

	      0x05 // descriptor_type
	      ].concat([track.config.length]).concat(track.config).concat([0x06, 0x01, 0x02])); // GASpecificConfig)); // length + audio config descriptor
	    }
	  }, {
	    key: 'mp4a',
	    value: function mp4a(track) {
	      return MP4.box(MP4.types.mp4a, new Uint8Array([0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, // reserved
	      0x00, 0x01, // data_reference_index
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, track.channelCount, // channelcount
	      0x00, 0x10, // sampleSize:16bits
	      0x00, 0x00, 0x00, 0x00, // reserved2
	      track.audiosamplerate >> 8 & 0xFF, track.audiosamplerate & 0xff, //
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
	      return MP4.box(MP4.types.tkhd, new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x07, // flags
	      0x00, 0x00, 0x00, 0x00, // creation_time
	      0x00, 0x00, 0x00, 0x00, // modification_time
	      track.id >> 24 & 0xFF, track.id >> 16 & 0xFF, track.id >> 8 & 0xFF, track.id & 0xFF, // track_ID
	      0x00, 0x00, 0x00, 0x00, // reserved
	      track.duration >> 24, track.duration >> 16 & 0xFF, track.duration >> 8 & 0xFF, track.duration & 0xFF, // duration
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, // layer
	      0x00, 0x00, // alternate_group
	      0x00, 0x00, // non-audio track volume
	      0x00, 0x00, // reserved
	      0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
	      track.width >> 8 & 0xFF, track.width & 0xFF, 0x00, 0x00, // width
	      track.height >> 8 & 0xFF, track.height & 0xFF, 0x00, 0x00 // height
	      ]));
	    }
	  }, {
	    key: 'traf',
	    value: function traf(track, baseMediaDecodeTime) {
	      var sampleDependencyTable = MP4.sdtp(track);
	      return MP4.box(MP4.types.traf, MP4.box(MP4.types.tfhd, new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      track.id >> 24, track.id >> 16 & 0XFF, track.id >> 8 & 0XFF, track.id & 0xFF])), // track_ID
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
	      return MP4.box(MP4.types.trex, new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      track.id >> 24, track.id >> 16 & 0XFF, track.id >> 8 & 0XFF, track.id & 0xFF, // track_ID
	      0x00, 0x00, 0x00, 0x01, // default_sample_description_index
	      0x00, 0x00, 0x00, 0x00, // default_sample_duration
	      0x00, 0x00, 0x00, 0x00, // default_sample_size
	      0x00, 0x01, 0x00, 0x01 // default_sample_flags
	      ]));
	    }
	  }, {
	    key: 'trun',
	    value: function trun(track, offset) {
	      var samples, sample, i, array;
	      samples = track.samples || [];
	      array = new Uint8Array(12 + 16 * samples.length);
	      offset += 8 + array.byteLength;
	      array.set([0x00, // version 0
	      0x00, 0x0f, 0x01, // flags
	      samples.length >>> 24 & 0xFF, samples.length >>> 16 & 0xFF, samples.length >>> 8 & 0xFF, samples.length & 0xFF, // sample_count
	      offset >>> 24 & 0xFF, offset >>> 16 & 0xFF, offset >>> 8 & 0xFF, offset & 0xFF // data_offset
	      ], 0);
	      for (i = 0; i < samples.length; i++) {
	        sample = samples[i];
	        array.set([sample.duration >>> 24 & 0xFF, sample.duration >>> 16 & 0xFF, sample.duration >>> 8 & 0xFF, sample.duration & 0xFF, // sample_duration
	        sample.size >>> 24 & 0xFF, sample.size >>> 16 & 0xFF, sample.size >>> 8 & 0xFF, sample.size & 0xFF, // sample_size
	        sample.flags.isLeading << 2 | sample.flags.dependsOn, sample.flags.isDependedOn << 6 | sample.flags.hasRedundancy << 4 | sample.flags.paddingValue << 1 | sample.flags.isNonSync, sample.flags.degradPrio & 0xF0 << 8, sample.flags.degradPrio & 0x0F, // sample_flags
	        sample.cts >>> 24 & 0xFF, sample.cts >>> 16 & 0xFF, sample.cts >>> 8 & 0xFF, sample.cts & 0xFF // sample_composition_time_offset
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
	})();

	exports['default'] = MP4;
	module.exports = exports['default'];

/***/ },
/* 115 */
/***/ function(module, exports) {

	'use strict';

	var bundleFn = arguments[3];
	var sources = arguments[4];
	var cache = arguments[5];

	var stringify = JSON.stringify;

	module.exports = function (fn) {
	    var keys = [];
	    var wkey;
	    var cacheKeys = Object.keys(cache);

	    for (var i = 0, l = cacheKeys.length; i < l; i++) {
	        var key = cacheKeys[i];
	        if (cache[key].exports === fn) {
	            wkey = key;
	            break;
	        }
	    }

	    if (!wkey) {
	        wkey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
	        var wcache = {};
	        for (var i = 0, l = cacheKeys.length; i < l; i++) {
	            var key = cacheKeys[i];
	            wcache[key] = key;
	        }
	        sources[wkey] = [Function(['require', 'module', 'exports'], '(' + fn + ')(self)'), wcache];
	    }
	    var skey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);

	    var scache = {};scache[wkey] = wkey;
	    sources[skey] = [Function(['require'], 'require(' + stringify(wkey) + ')(self)'), scache];

	    var src = '(' + bundleFn + ')({' + Object.keys(sources).map(function (key) {
	        return stringify(key) + ':[' + sources[key][0] + ',' + stringify(sources[key][1]) + ']';
	    }).join(',') + '},{},[' + stringify(skey) + '])';

	    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

	    return new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Level Helper class, providing methods dealing with playlist sliding and drift
	*/

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsLogger = __webpack_require__(106);

	var LevelHelper = (function () {
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
	        _utilsLogger.logger.log('discontinuity sliding from playlist, take drift into account');
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
	        startPTS = Math.max(startPTS, frag.startPTS);
	        endPTS = Math.min(endPTS, frag.endPTS);
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
	            _utilsLogger.logger.error('negative duration computed for ' + fragFrom + ', there should be some duration drift between playlist and fragment!');
	          }
	        } else {
	          fragTo.duration = fragFrom.start - fragToPTS;
	          if (fragTo.duration < 0) {
	            _utilsLogger.logger.error('negative duration computed for ' + fragTo + ', there should be some duration drift between playlist and fragment!');
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
	})();

	exports['default'] = LevelHelper;
	module.exports = exports['default'];

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Level Controller
	*/

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _events = __webpack_require__(100);

	var _events2 = _interopRequireDefault(_events);

	var _utilsLogger = __webpack_require__(106);

	var _errors = __webpack_require__(101);

	var LevelController = (function () {
	  function LevelController(hls) {
	    _classCallCheck(this, LevelController);

	    this.hls = hls;
	    this.onml = this.onManifestLoaded.bind(this);
	    this.onll = this.onLevelLoaded.bind(this);
	    this.onerr = this.onError.bind(this);
	    this.ontick = this.tick.bind(this);
	    hls.on(_events2['default'].MANIFEST_LOADED, this.onml);
	    hls.on(_events2['default'].LEVEL_LOADED, this.onll);
	    hls.on(_events2['default'].ERROR, this.onerr);
	    this._manualLevel = this._autoLevelCapping = -1;
	  }

	  _createClass(LevelController, [{
	    key: 'destroy',
	    value: function destroy() {
	      var hls = this.hls;
	      hls.off(_events2['default'].MANIFEST_LOADED, this.onml);
	      hls.off(_events2['default'].LEVEL_LOADED, this.onll);
	      hls.off(_events2['default'].ERROR, this.onerr);
	      if (this.timer) {
	        clearInterval(this.timer);
	      }
	      this._manualLevel = -1;
	    }
	  }, {
	    key: 'onManifestLoaded',
	    value: function onManifestLoaded(event, data) {
	      var levels0 = [],
	          levels = [],
	          bitrateStart,
	          i,
	          bitrateSet = {},
	          videoCodecFound = false,
	          audioCodecFound = false;

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
	          bitrateSet[level.bitrate] = levels.length;
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
	          _utilsLogger.logger.log('manifest loaded,' + levels.length + ' level(s) found, first bitrate:' + bitrateStart);
	          break;
	        }
	      }
	      this.hls.trigger(_events2['default'].MANIFEST_PARSED, { levels: this._levels, firstLevel: this._firstLevel, stats: data.stats });
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
	        _utilsLogger.logger.log('switching to level ' + newLevel);
	        this.hls.trigger(_events2['default'].LEVEL_SWITCH, { level: newLevel });
	        var level = this._levels[newLevel];
	        // check if we need to load playlist for this level
	        if (level.details === undefined || level.details.live === true) {
	          // level not retrieved yet, or live playlist we need to (re)load it
	          _utilsLogger.logger.log('(re)loading playlist for level ' + newLevel);
	          var urlId = level.urlId;
	          this.hls.trigger(_events2['default'].LEVEL_LOADING, { url: level.url[urlId], level: newLevel, id: urlId });
	        }
	      } else {
	        // invalid level id given, trigger error
	        this.hls.trigger(_events2['default'].ERROR, { type: _errors.ErrorTypes.OTHER_ERROR, details: _errors.ErrorDetails.LEVEL_SWITCH_ERROR, level: newLevel, fatal: false, reason: 'invalid level idx' });
	      }
	    }
	  }, {
	    key: 'onError',
	    value: function onError(event, data) {
	      var details = data.details,
	          levelId,
	          level;
	      // try to recover not fatal errors
	      switch (details) {
	        case _errors.ErrorDetails.FRAG_LOAD_ERROR:
	        case _errors.ErrorDetails.FRAG_LOAD_TIMEOUT:
	        case _errors.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
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
	       * otherwise, we cannot recover this network error ....
	       */
	      if (levelId !== undefined) {
	        level = this._levels[levelId];
	        if (level.urlId < level.url.length - 1) {
	          level.urlId++;
	          level.details = undefined;
	          _utilsLogger.logger.warn('level controller,' + details + ' for level ' + levelId + ': switching to redundant stream id ' + level.urlId);
	        } else {
	          // we could try to recover if in auto mode and current level not lowest level (0)
	          var recoverable = this._manualLevel === -1 && levelId;
	          if (recoverable) {
	            _utilsLogger.logger.warn('level controller,' + details + ': emergency switch-down for next fragment');
	            this.hls.abrController.nextAutoLevel = 0;
	          } else if (level && level.details && level.details.live) {
	            _utilsLogger.logger.warn('level controller,' + details + ' on live stream, discard');
	          } else {
	            _utilsLogger.logger.error('cannot recover ' + details + ' error');
	            this._level = undefined;
	            // stopping live reloading timer if any
	            if (this.timer) {
	              clearInterval(this.timer);
	              this.timer = null;
	              // redispatch same error but with fatal set to true
	              data.fatal = true;
	              this.hls.trigger(event, data);
	            }
	          }
	        }
	      }
	    }
	  }, {
	    key: 'onLevelLoaded',
	    value: function onLevelLoaded(event, data) {
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
	        this.hls.trigger(_events2['default'].LEVEL_LOADING, { url: level.url[urlId], level: levelId, id: urlId });
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
	})();

	exports['default'] = LevelController;
	module.exports = exports['default'];

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * XHR based logger
	*/

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsLogger = __webpack_require__(106);

	var XhrLoader = (function () {
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
	      if (this.loader && this.loader.readyState !== 4) {
	        this.stats.aborted = true;
	        this.loader.abort();
	      }
	      if (this.timeoutHandle) {
	        window.clearTimeout(this.timeoutHandle);
	      }
	    }
	  }, {
	    key: 'load',
	    value: function load(url, responseType, onSuccess, onError, onTimeout, timeout, maxRetry, retryDelay) {
	      var onProgress = arguments.length <= 8 || arguments[8] === undefined ? null : arguments[8];
	      var frag = arguments.length <= 9 || arguments[9] === undefined ? null : arguments[9];

	      this.url = url;
	      if (frag && !isNaN(frag.byteRangeStartOffset) && !isNaN(frag.byteRangeEndOffset)) {
	        this.byteRange = frag.byteRangeStartOffset + '-' + frag.byteRangeEndOffset;
	      }
	      this.responseType = responseType;
	      this.onSuccess = onSuccess;
	      this.onProgress = onProgress;
	      this.onTimeout = onTimeout;
	      this.onError = onError;
	      this.stats = { trequest: new Date(), retry: 0 };
	      this.timeout = timeout;
	      this.maxRetry = maxRetry;
	      this.retryDelay = retryDelay;
	      this.timeoutHandle = window.setTimeout(this.loadtimeout.bind(this), timeout);
	      this.loadInternal();
	    }
	  }, {
	    key: 'loadInternal',
	    value: function loadInternal() {
	      var xhr = this.loader = new XMLHttpRequest();
	      xhr.onload = this.loadsuccess.bind(this);
	      xhr.onerror = this.loaderror.bind(this);
	      xhr.onprogress = this.loadprogress.bind(this);
	      xhr.open('GET', this.url, true);
	      if (this.byteRange) {
	        xhr.setRequestHeader('Range', 'bytes=' + this.byteRange);
	      }
	      xhr.responseType = this.responseType;
	      this.stats.tfirst = null;
	      this.stats.loaded = 0;
	      if (this.xhrSetup) {
	        this.xhrSetup(xhr);
	      }
	      xhr.send();
	    }
	  }, {
	    key: 'loadsuccess',
	    value: function loadsuccess(event) {
	      window.clearTimeout(this.timeoutHandle);
	      this.stats.tload = new Date();
	      this.onSuccess(event, this.stats);
	    }
	  }, {
	    key: 'loaderror',
	    value: function loaderror(event) {
	      if (this.stats.retry < this.maxRetry) {
	        _utilsLogger.logger.warn(event.type + ' while loading ' + this.url + ', retrying in ' + this.retryDelay + '...');
	        this.destroy();
	        window.setTimeout(this.loadInternal.bind(this), this.retryDelay);
	        // exponential backoff
	        this.retryDelay = Math.min(2 * this.retryDelay, 64000);
	        this.stats.retry++;
	      } else {
	        window.clearTimeout(this.timeoutHandle);
	        _utilsLogger.logger.error(event.type + ' while loading ' + this.url);
	        this.onError(event);
	      }
	    }
	  }, {
	    key: 'loadtimeout',
	    value: function loadtimeout(event) {
	      _utilsLogger.logger.warn('timeout while loading ' + this.url);
	      this.onTimeout(event, this.stats);
	    }
	  }, {
	    key: 'loadprogress',
	    value: function loadprogress(event) {
	      var stats = this.stats;
	      if (stats.tfirst === null) {
	        stats.tfirst = new Date();
	      }
	      stats.loaded = event.loaded;
	      if (this.onProgress) {
	        this.onProgress(event, stats);
	      }
	    }
	  }]);

	  return XhrLoader;
	})();

	exports['default'] = XhrLoader;
	module.exports = exports['default'];

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

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _basePlayback = __webpack_require__(81);

	var _basePlayback2 = _interopRequireDefault(_basePlayback);

	var _baseStyler = __webpack_require__(16);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _publicStyleScss = __webpack_require__(121);

	var _publicStyleScss2 = _interopRequireDefault(_publicStyleScss);

	var HTMLImg = (function (_Playback) {
	  _inherits(HTMLImg, _Playback);

	  _createClass(HTMLImg, [{
	    key: 'getPlaybackType',
	    value: function getPlaybackType() {
	      return _basePlayback2['default'].NO_OP;
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
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(30)();
	// imports


	// module
	exports.push([module.id, "[data-html-img] {\n  max-width: 100%;\n  max-height: 100%; }\n", ""]);

	// exports


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(123);

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUtils = __webpack_require__(2);

	var _basePlayback = __webpack_require__(81);

	var _basePlayback2 = _interopRequireDefault(_basePlayback);

	var _baseTemplate = __webpack_require__(17);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _baseStyler = __webpack_require__(16);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _baseEvents = __webpack_require__(6);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _publicStyleScss = __webpack_require__(124);

	var _publicStyleScss2 = _interopRequireDefault(_publicStyleScss);

	var _publicErrorHtml = __webpack_require__(125);

	var _publicErrorHtml2 = _interopRequireDefault(_publicErrorHtml);

	var NoOp = (function (_Playback) {
	  _inherits(NoOp, _Playback);

	  _createClass(NoOp, [{
	    key: 'getNoOpMessage',
	    value: function getNoOpMessage() {
	      var messages = {
	        'en': 'Your browser does not support the playback of this video. Please try using a different browser.',
	        'es': 'Su navegador no soporta la reproducción de un video. Por favor, trate de usar un navegador diferente.',
	        'pt': 'Seu navegador não supporta a reprodução deste video. Por favor, tente usar um navegador diferente.'
	      };
	      messages['en-us'] = messages['en'];
	      messages['es-419'] = messages['es'];
	      messages['pt-br'] = messages['pt'];
	      return messages[(0, _baseUtils.getBrowserLanguage)()] || messages['en'];
	    }
	  }, {
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
	      this.$el.html(this.template({ message: this.getNoOpMessage() }));
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
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(30)();
	// imports


	// module
	exports.push([module.id, "[data-no-op] {\n  z-index: 1000;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  text-align: center; }\n\n[data-no-op] p[data-no-op-msg] {\n  position: absolute;\n  font-size: 25px;\n  top: 40%;\n  color: white; }\n\n[data-no-op] canvas[data-no-op-canvas] {\n  background-color: #777;\n  height: 100%;\n  width: 100%; }\n", ""]);

	// exports


/***/ },
/* 125 */
/***/ function(module, exports) {

	module.exports = "<canvas data-no-op-canvas></canvas>\n<p data-no-op-msg><%=message%><p>\n";

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(127);

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUi_container_plugin = __webpack_require__(128);

	var _baseUi_container_plugin2 = _interopRequireDefault(_baseUi_container_plugin);

	var _baseEvents = __webpack_require__(6);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _baseStyler = __webpack_require__(16);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _baseTemplate = __webpack_require__(17);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _publicSpinnerHtml = __webpack_require__(129);

	var _publicSpinnerHtml2 = _interopRequireDefault(_publicSpinnerHtml);

	var _publicSpinnerScss = __webpack_require__(130);

	var _publicSpinnerScss2 = _interopRequireDefault(_publicSpinnerScss);

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
	    this.showTimeout = null;
	    this.listenTo(this.container, _baseEvents2['default'].CONTAINER_STATE_BUFFERING, this.onBuffering);
	    this.listenTo(this.container, _baseEvents2['default'].CONTAINER_STATE_BUFFERFULL, this.onBufferFull);
	    this.listenTo(this.container, _baseEvents2['default'].CONTAINER_STOP, this.onStop);
	    this.listenTo(this.container, _baseEvents2['default'].CONTAINER_ENDED, this.onStop);
	    this.listenTo(this.container, _baseEvents2['default'].CONTAINER_ERROR, this.onStop);
	    this.render();
	  }

	  _createClass(SpinnerThreeBouncePlugin, [{
	    key: 'onBuffering',
	    value: function onBuffering() {
	      this.show();
	    }
	  }, {
	    key: 'onBufferFull',
	    value: function onBufferFull() {
	      this.hide();
	    }
	  }, {
	    key: 'onStop',
	    value: function onStop() {
	      this.hide();
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	      var _this = this;

	      if (this.showTimeout === null) {
	        this.showTimeout = setTimeout(function () {
	          return _this.$el.show();
	        }, 300);
	      }
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      if (this.showTimeout !== null) {
	        clearTimeout(this.showTimeout);
	        this.showTimeout = null;
	      }
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

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utils = __webpack_require__(2);

	var _ui_object = __webpack_require__(18);

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

	UIContainerPlugin.type = 'container';
	module.exports = exports['default'];

/***/ },
/* 129 */
/***/ function(module, exports) {

	module.exports = "<div data-bounce1></div><div data-bounce2></div><div data-bounce3></div>\n";

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(30)();
	// imports


	// module
	exports.push([module.id, ".spinner-three-bounce[data-spinner] {\n  position: absolute;\n  margin: 0 auto;\n  width: 70px;\n  text-align: center;\n  z-index: 999;\n  top: 47%;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto; }\n  .spinner-three-bounce[data-spinner] > div {\n    width: 18px;\n    height: 18px;\n    background-color: #FFFFFF;\n    border-radius: 100%;\n    display: inline-block;\n    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;\n    -moz-animation: bouncedelay 1.4s infinite ease-in-out;\n    -ms-animation: bouncedelay 1.4s infinite ease-in-out;\n    -o-animation: bouncedelay 1.4s infinite ease-in-out;\n    animation: bouncedelay 1.4s infinite ease-in-out;\n    /* Prevent first frame from flickering when animation starts */\n    -webkit-animation-fill-mode: both;\n    -moz-animation-fill-mode: both;\n    -ms-animation-fill-mode: both;\n    -o-animation-fill-mode: both;\n    animation-fill-mode: both; }\n  .spinner-three-bounce[data-spinner] [data-bounce1] {\n    -webkit-animation-delay: -0.32s;\n    -moz-animation-delay: -0.32s;\n    -ms-animation-delay: -0.32s;\n    -o-animation-delay: -0.32s;\n    animation-delay: -0.32s; }\n  .spinner-three-bounce[data-spinner] [data-bounce2] {\n    -webkit-animation-delay: -0.16s;\n    -moz-animation-delay: -0.16s;\n    -ms-animation-delay: -0.16s;\n    -o-animation-delay: -0.16s;\n    animation-delay: -0.16s; }\n\n@-moz-keyframes bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    -moz-transform: scale(0);\n    -ms-transform: scale(0);\n    -o-transform: scale(0);\n    transform: scale(0); }\n  40% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n\n@-webkit-keyframes bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    -moz-transform: scale(0);\n    -ms-transform: scale(0);\n    -o-transform: scale(0);\n    transform: scale(0); }\n  40% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n\n@-o-keyframes bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    -moz-transform: scale(0);\n    -ms-transform: scale(0);\n    -o-transform: scale(0);\n    transform: scale(0); }\n  40% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n\n@-ms-keyframes bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    -moz-transform: scale(0);\n    -ms-transform: scale(0);\n    -o-transform: scale(0);\n    transform: scale(0); }\n  40% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n\n@keyframes bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    -moz-transform: scale(0);\n    -ms-transform: scale(0);\n    -o-transform: scale(0);\n    transform: scale(0); }\n  40% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n", ""]);

	// exports


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(132);

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseContainer_plugin = __webpack_require__(133);

	var _baseContainer_plugin2 = _interopRequireDefault(_baseContainer_plugin);

	var _baseEvents = __webpack_require__(6);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _clapprZepto = __webpack_require__(4);

	var _clapprZepto2 = _interopRequireDefault(_clapprZepto);

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
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _base_object = __webpack_require__(5);

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

	ContainerPlugin.type = 'container';
	module.exports = exports['default'];

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(135);

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUi_container_plugin = __webpack_require__(128);

	var _baseUi_container_plugin2 = _interopRequireDefault(_baseUi_container_plugin);

	var _baseEvents = __webpack_require__(6);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _baseStyler = __webpack_require__(16);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _baseTemplate = __webpack_require__(17);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _publicWatermarkScss = __webpack_require__(136);

	var _publicWatermarkScss2 = _interopRequireDefault(_publicWatermarkScss);

	var _publicWatermarkHtml = __webpack_require__(137);

	var _publicWatermarkHtml2 = _interopRequireDefault(_publicWatermarkHtml);

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
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(30)();
	// imports


	// module
	exports.push([module.id, "[data-watermark] {\n  position: absolute;\n  min-width: 70px;\n  max-width: 200px;\n  width: 12%;\n  text-align: center;\n  z-index: 10; }\n\n[data-watermark] img {\n  max-width: 100%; }\n\n[data-watermark-bottom-left] {\n  bottom: 10px;\n  left: 10px; }\n\n[data-watermark-bottom-right] {\n  bottom: 10px;\n  right: 42px; }\n\n[data-watermark-top-left] {\n  top: 10px;\n  left: 10px; }\n\n[data-watermark-top-right] {\n  top: 10px;\n  right: 37px; }\n", ""]);

	// exports


/***/ },
/* 137 */
/***/ function(module, exports) {

	module.exports = "<div data-watermark data-watermark-<%=position %>><img src=\"<%= imageUrl %>\"></div>\n";

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(139);

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	//Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUi_container_plugin = __webpack_require__(128);

	var _baseUi_container_plugin2 = _interopRequireDefault(_baseUi_container_plugin);

	var _baseEvents = __webpack_require__(6);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _baseStyler = __webpack_require__(16);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _baseTemplate = __webpack_require__(17);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _componentsMediator = __webpack_require__(51);

	var _componentsMediator2 = _interopRequireDefault(_componentsMediator);

	var _publicPosterScss = __webpack_require__(140);

	var _publicPosterScss2 = _interopRequireDefault(_publicPosterScss);

	var _publicPosterHtml = __webpack_require__(141);

	var _publicPosterHtml2 = _interopRequireDefault(_publicPosterHtml);

	var _clapprZepto = __webpack_require__(4);

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
	      if (!this.options.chromeless) {
	        this.$playButton.show();
	        this.updateSize();
	      }
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
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(30)();
	// imports


	// module
	exports.push([module.id, "@font-face {\n  font-family: \"Player\";\n  src: url(" + __webpack_require__(53) + ");\n  src: url(" + __webpack_require__(53) + "?#iefix) format(\"embedded-opentype\"), url(" + __webpack_require__(54) + ") format(\"truetype\"), url(" + __webpack_require__(55) + "#player) format(\"svg\"); }\n\n.player-poster[data-poster] {\n  cursor: pointer;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  z-index: 998;\n  top: 0;\n  left: 0; }\n  .player-poster[data-poster] .poster-background[data-poster] {\n    width: 100%;\n    height: 100%;\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-position: 50% 50%; }\n  .player-poster[data-poster] .play-wrapper[data-poster] {\n    position: absolute;\n    width: 100%;\n    height: 25%;\n    line-height: 100%;\n    font-size: 25%;\n    top: 50%;\n    text-align: center; }\n    .player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster] {\n      font-family: \"Player\";\n      font-weight: normal;\n      font-style: normal;\n      line-height: 1;\n      letter-spacing: 0;\n      speak: none;\n      color: white;\n      opacity: 0.75;\n      -webkit-font-smoothing: antialiased;\n      -moz-osx-font-smoothing: grayscale;\n      -webkit-transition: opacity text-shadow 0.1s;\n      -webkit-transition-delay: ease;\n      -moz-transition: opacity text-shadow 0.1s ease;\n      -o-transition: opacity text-shadow 0.1s ease;\n      transition: opacity text-shadow 0.1s ease; }\n      .player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster].play[data-poster]:before {\n        content: \"\\E001\"; }\n      .player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster]:hover {\n        opacity: 1.0;\n        text-shadow: rgba(255, 255, 255, 0.8) 0 0 15px; }\n", ""]);

	// exports


/***/ },
/* 141 */
/***/ function(module, exports) {

	module.exports = "<div class=\"play-wrapper\" data-poster>\n  <span class=\"poster-icon play\" data-poster />\n</div>\n";

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(143);

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseContainer_plugin = __webpack_require__(133);

	var _baseContainer_plugin2 = _interopRequireDefault(_baseContainer_plugin);

	var _baseEvents = __webpack_require__(6);

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
	        this.listenTo(this.container, _baseEvents2['default'].CONTAINER_READY, this.onReady);
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
	    key: 'onReady',
	    value: function onReady() {
	      this.push(["Video", "Playback", this.container.playback.name]);
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
	    value: function onHD(isHD) {
	      var status = isHD ? "ON" : "OFF";
	      if (status !== this.currentHDState) {
	        this.currentHDState = status;
	        this.push(["Video", "HD - " + status, this.container.playback.src]);
	      }
	    }
	  }, {
	    key: 'onPlaybackChanged',
	    value: function onPlaybackChanged(playbackState) {
	      if (playbackState.type !== null) {
	        this.push(["Video", "Playback Type - " + playbackState.type, this.container.playback.src]);
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
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(145);

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	//Copyright 2014 Globo.com Player authors. All rights reserved.
	// Use of this source code is governed by a BSD-style
	// license that can be found in the LICENSE file.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseContainer_plugin = __webpack_require__(133);

	var _baseContainer_plugin2 = _interopRequireDefault(_baseContainer_plugin);

	var _baseEvents = __webpack_require__(6);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _basePlayback = __webpack_require__(81);

	var _basePlayback2 = _interopRequireDefault(_basePlayback);

	var _componentsBrowser = __webpack_require__(3);

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
	      if (this.container.getPlaybackType() !== _basePlayback2['default'].LIVE || this.container.isDvrEnabled()) {
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
	      if (this.container.getPlaybackType() !== _basePlayback2['default'].LIVE || this.container.isDvrEnabled()) {
	        this.container.$el.addClass('pointer-enabled');
	      }
	    }
	  }]);

	  return ClickToPausePlugin;
	})(_baseContainer_plugin2['default']);

	exports['default'] = ClickToPausePlugin;
	module.exports = exports['default'];

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(147);

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseUi_core_plugin = __webpack_require__(148);

	var _baseUi_core_plugin2 = _interopRequireDefault(_baseUi_core_plugin);

	var _baseTemplate = __webpack_require__(17);

	var _baseTemplate2 = _interopRequireDefault(_baseTemplate);

	var _basePlayback = __webpack_require__(81);

	var _basePlayback2 = _interopRequireDefault(_basePlayback);

	var _baseStyler = __webpack_require__(16);

	var _baseStyler2 = _interopRequireDefault(_baseStyler);

	var _baseEvents = __webpack_require__(6);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _publicDvr_controlsScss = __webpack_require__(149);

	var _publicDvr_controlsScss2 = _interopRequireDefault(_publicDvr_controlsScss);

	var _publicIndexHtml = __webpack_require__(151);

	var _publicIndexHtml2 = _interopRequireDefault(_publicIndexHtml);

	var _clapprZepto = __webpack_require__(4);

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
	      this.listenToOnce(this.core.mediaControl.container, _baseEvents2['default'].CONTAINER_TIMEUPDATE, this.render);
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
	      return useDvrControls && this.core.getPlaybackType() === _basePlayback2['default'].LIVE;
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
	        this.core.mediaControl.seekTime.showDuration();
	      } else {
	        this.core.mediaControl.seekTime.hideDuration();
	      }
	      return this;
	    }
	  }]);

	  return DVRControls;
	})(_baseUi_core_plugin2['default']);

	exports['default'] = DVRControls;
	module.exports = exports['default'];

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utils = __webpack_require__(2);

	var _ui_object = __webpack_require__(18);

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

	UICorePlugin.type = 'core';
	module.exports = exports['default'];

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(30)();
	// imports


	// module
	exports.push([module.id, "@font-face {\n  font-family: \"Roboto\";\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Roboto\"), local(\"Roboto-Regular\"), url(" + __webpack_require__(150) + ") format(\"truetype\"); }\n\n.dvr-controls[data-dvr-controls] {\n  display: inline-block;\n  float: left;\n  color: #fff;\n  line-height: 32px;\n  font-size: 10px;\n  font-weight: bold;\n  margin-left: 6px; }\n  .dvr-controls[data-dvr-controls] .live-info {\n    cursor: default;\n    font-family: \"Roboto\", \"Open Sans\", Arial, sans-serif; }\n    .dvr-controls[data-dvr-controls] .live-info:before {\n      content: \"\";\n      display: inline-block;\n      position: relative;\n      width: 7px;\n      height: 7px;\n      border-radius: 3.5px;\n      margin-right: 3.5px;\n      background-color: #ff0101; }\n    .dvr-controls[data-dvr-controls] .live-info.disabled {\n      opacity: 0.3; }\n      .dvr-controls[data-dvr-controls] .live-info.disabled:before {\n        background-color: #fff; }\n  .dvr-controls[data-dvr-controls] .live-button {\n    cursor: pointer;\n    outline: none;\n    display: none;\n    border: 0;\n    color: #fff;\n    background-color: transparent;\n    height: 32px;\n    padding: 0;\n    opacity: 0.7;\n    font-family: \"Roboto\", \"Open Sans\", Arial, sans-serif;\n    -webkit-transition: all 0.1s ease;\n    -moz-transition: all 0.1s ease false;\n    -o-transition: all 0.1s ease false;\n    transition: all 0.1s ease; }\n    .dvr-controls[data-dvr-controls] .live-button:before {\n      content: \"\";\n      display: inline-block;\n      position: relative;\n      width: 7px;\n      height: 7px;\n      border-radius: 3.5px;\n      margin-right: 3.5px;\n      background-color: #fff; }\n    .dvr-controls[data-dvr-controls] .live-button:hover {\n      opacity: 1;\n      text-shadow: rgba(255, 255, 255, 0.75) 0 0 5px; }\n\n.dvr .dvr-controls[data-dvr-controls] .live-info {\n  display: none; }\n\n.dvr .dvr-controls[data-dvr-controls] .live-button {\n  display: block; }\n\n.dvr.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar] {\n  background-color: #005aff; }\n\n.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar] {\n  background-color: #ff0101; }\n\n.seek-time[data-seek-time] span[data-duration] {\n  position: relative;\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 10px;\n  padding-right: 7px; }\n  .seek-time[data-seek-time] span[data-duration]:before {\n    content: \"|\";\n    margin-right: 7px; }\n", ""]);

	// exports


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "38861cba61c66739c1452c3a71e39852.ttf";

/***/ },
/* 151 */
/***/ function(module, exports) {

	module.exports = "<div class=\"live-info\">LIVE</div>\n<button class=\"live-button\">BACK TO LIVE</button>\n";

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(153);

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _baseCore_plugin = __webpack_require__(154);

	var _baseCore_plugin2 = _interopRequireDefault(_baseCore_plugin);

	var _baseEvents = __webpack_require__(6);

	var _baseEvents2 = _interopRequireDefault(_baseEvents);

	var _clapprZepto = __webpack_require__(4);

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
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utils = __webpack_require__(2);

	var _base_object = __webpack_require__(5);

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

	CorePlugin.type = 'core';
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;