(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Clappr"), require("shaka"));
	else if(typeof define === 'function' && define.amd)
		define(["Clappr", "shaka"], factory);
	else if(typeof exports === 'object')
		exports["DashShakaPlayback"] = factory(require("Clappr"), require("shaka"));
	else
		root["DashShakaPlayback"] = factory(root["Clappr"], root["shaka"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _clappr = __webpack_require__(1);
	
	var _shakaPlayer = __webpack_require__(2);
	
	var _shakaPlayer2 = _interopRequireDefault(_shakaPlayer);
	
	var SEND_STATS_INTERVAL_MS = 30 * 1e3;
	var DEFAULT_LEVEL_AUTO = -1;
	
	var DashShakaPlayback = (function (_HTML5Video) {
	  _inherits(DashShakaPlayback, _HTML5Video);
	
	  _createClass(DashShakaPlayback, [{
	    key: 'name',
	    get: function get() {
	      return 'dash_shaka_playback';
	    }
	  }, {
	    key: 'shakaVersion',
	    get: function get() {
	      return _shakaPlayer2['default'].player.Player.version;
	    }
	  }, {
	    key: 'shakaPlayerInstance',
	    get: function get() {
	      return this._player;
	    }
	  }, {
	    key: 'levels',
	    get: function get() {
	      return this._levels;
	    }
	  }, {
	    key: 'currentLevel',
	    set: function set(id) {
	      var _this = this;
	
	      this._currentLevelId = id;
	      var isAuto = this._currentLevelId === DEFAULT_LEVEL_AUTO;
	
	      this._player.configure({ abr: { enable: !isAuto } });
	      this.trigger(_clappr.Events.PLAYBACK_LEVEL_SWITCH_START);
	      if (!isAuto) {
	        this.selectTrack(this.videoTracks.filter(function (t) {
	          return t.id === _this._currentLevelId;
	        })[0]);
	      }
	      this.trigger(_clappr.Events.PLAYBACK_LEVEL_SWITCH_END);
	    },
	    get: function get() {
	      return this._currentLevelId || DEFAULT_LEVEL_AUTO;
	    }
	  }], [{
	    key: 'canPlay',
	    value: function canPlay(resource) {
	      var mimeType = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	      _shakaPlayer2['default'].polyfill.installAll();
	      var browserSupported = _shakaPlayer2['default'].Player.isBrowserSupported();
	      var resourceParts = resource.split('?')[0].match(/.*\.(.*)$/) || [];
	      return browserSupported && (resourceParts[1] === 'mpd' || mimeType.indexOf('application/dash+xml') > -1);
	    }
	  }, {
	    key: 'Events',
	    get: function get() {
	      return {
	        SHAKA_READY: 'shaka:ready'
	      };
	    }
	  }]);
	
	  function DashShakaPlayback(options) {
	    _classCallCheck(this, DashShakaPlayback);
	
	    _get(Object.getPrototypeOf(DashShakaPlayback.prototype), 'constructor', this).call(this, options);
	    this._levels = [];
	    options.autoPlay && this.play();
	  }
	
	  _createClass(DashShakaPlayback, [{
	    key: 'play',
	    value: function play() {
	      if (!this._player) {
	        this._setup();
	      }
	
	      if (!this.isReady) {
	        this.once(DashShakaPlayback.Events.SHAKA_READY, this.play);
	        return;
	      }
	
	      this._src = this.el.src;
	      _get(Object.getPrototypeOf(DashShakaPlayback.prototype), 'play', this).call(this);
	    }
	
	    // skipping setup `setupSrc` on tag video
	  }, {
	    key: 'setupSrc',
	    value: function setupSrc() {}
	
	    // skipping ready event on video tag in favor of ready on shaka
	  }, {
	    key: '_ready',
	    value: function _ready() {}
	  }, {
	    key: 'error',
	
	    // skipping error handling on video tag in favor of error on shaka
	    value: function error(event) {
	      _clappr.Log.error('an error was raised by the video tag', event, this.el.error);
	    }
	  }, {
	    key: 'isHighDefinitionInUse',
	    value: function isHighDefinitionInUse() {
	      return !!this.highDefinition;
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      var _this2 = this;
	
	      clearInterval(this.sendStatsId);
	      this._sendStats();
	
	      this._player.unload().then(function () {
	        _get(Object.getPrototypeOf(DashShakaPlayback.prototype), 'stop', _this2).call(_this2);
	        _this2._player = null;
	        _this2._isShakaReadyState = false;
	      })['catch'](function () {
	        _clappr.Log.error('shaka could not be unloaded');
	      });
	    }
	  }, {
	    key: 'getPlaybackType',
	    value: function getPlaybackType() {
	      return (this._player && this._player.isLive() ? 'live' : 'vod') || '';
	    }
	  }, {
	    key: 'selectTrack',
	    value: function selectTrack(track) {
	      this._player.selectTrack(track);
	      this._onAdaptation();
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this3 = this;
	
	      clearInterval(this.sendStatsId);
	
	      if (this._player) {
	        this._destroy();
	      } else {
	        this._player.destroy().then(function () {
	          return _this3._destroy();
	        })['catch'](function () {
	          _this3._destroy();
	          _clappr.Log.error('shaka could not be destroyed');
	        });
	      }
	    }
	  }, {
	    key: '_setup',
	    value: function _setup() {
	      var _this4 = this;
	
	      this._isShakaReadyState = false;
	      this._player = this._createPlayer();
	      this._options.shakaConfiguration && this._player.configure(this._options.shakaConfiguration);
	      this._options.shakaOnBeforeLoad && this._options.shakaOnBeforeLoad(this._player);
	
	      var playerLoaded = this._player.load(this._options.src);
	      playerLoaded.then(function () {
	        return _this4._loaded();
	      })['catch'](function (e) {
	        return _this4._setupError(e);
	      });
	    }
	  }, {
	    key: '_createPlayer',
	    value: function _createPlayer() {
	      var player = new _shakaPlayer2['default'].Player(this.el);
	      player.addEventListener('error', this._onError.bind(this));
	      player.addEventListener('adaptation', this._onAdaptation.bind(this));
	      player.addEventListener('buffering', this._onBuffering.bind(this));
	      return player;
	    }
	  }, {
	    key: '_onBuffering',
	    value: function _onBuffering(e) {
	      var event = e.buffering ? _clappr.Events.PLAYBACK_BUFFERING : _clappr.Events.PLAYBACK_BUFFERFULL;
	      this.trigger(event);
	    }
	  }, {
	    key: '_loaded',
	    value: function _loaded() {
	      this._isShakaReadyState = true;
	      this.trigger(DashShakaPlayback.Events.SHAKA_READY);
	      _get(Object.getPrototypeOf(DashShakaPlayback.prototype), '_ready', this).call(this);
	      this._startToSendStats();
	      this._fillLevels();
	    }
	  }, {
	    key: '_fillLevels',
	    value: function _fillLevels() {
	      if (this._levels.length === 0) {
	        this._levels = this.videoTracks.map(function (videoTrack) {
	          return { id: videoTrack.id, label: videoTrack.height + 'p' };
	        }).reverse();
	        this.trigger(_clappr.Events.PLAYBACK_LEVELS_AVAILABLE, this.levels);
	      }
	    }
	  }, {
	    key: '_startToSendStats',
	    value: function _startToSendStats() {
	      var _this5 = this;
	
	      var intervalMs = this._options.shakaSendStatsInterval || SEND_STATS_INTERVAL_MS;
	      this.sendStatsId = setInterval(function () {
	        return _this5._sendStats();
	      }, intervalMs);
	    }
	  }, {
	    key: '_sendStats',
	    value: function _sendStats() {
	      this.trigger(_clappr.Events.PLAYBACK_STATS_ADD, this._player.getStats());
	    }
	  }, {
	    key: '_setupError',
	    value: function _setupError(err) {
	      this._onError(err);
	    }
	  }, {
	    key: '_onError',
	    value: function _onError(err) {
	      _clappr.Log.error('Shaka error event:', err);
	      this.trigger(_clappr.Events.PLAYBACK_ERROR, err, this.name);
	    }
	  }, {
	    key: '_onAdaptation',
	    value: function _onAdaptation() {
	      var activeVideo = this.videoTracks.filter(function (t) {
	        return t.active === true;
	      })[0];
	
	      this._fillLevels();
	
	      _clappr.Log.debug('an adaptation has happened:', activeVideo);
	      this.highDefinition = activeVideo.height >= 720;
	      this.trigger(_clappr.Events.PLAYBACK_HIGHDEFINITIONUPDATE, this.highDefinition);
	      this.trigger(_clappr.Events.PLAYBACK_BITRATE, {
	        bandwidth: activeVideo.bandwidth,
	        width: activeVideo.width,
	        height: activeVideo.height,
	        level: activeVideo.id
	      });
	    }
	  }, {
	    key: '_destroy',
	    value: function _destroy() {
	      _get(Object.getPrototypeOf(DashShakaPlayback.prototype), 'destroy', this).call(this);
	      this._isShakaReadyState = false;
	      _clappr.Log.debug('shaka was destroyed');
	    }
	  }, {
	    key: 'isReady',
	    get: function get() {
	      return this._isShakaReadyState;
	    }
	  }, {
	    key: 'textTracks',
	    get: function get() {
	      return this._player && this._player.getTextTracks();
	    }
	  }, {
	    key: 'audioTracks',
	    get: function get() {
	      return this._player && this._player.getVariantTracks().filter(function (t) {
	        return t.mimeType.startsWith('audio/');
	      });
	    }
	  }, {
	    key: 'videoTracks',
	    get: function get() {
	      return this._player && this._player.getVariantTracks().filter(function (t) {
	        return t.mimeType.startsWith('video/');
	      });
	    }
	  }]);
	
	  return DashShakaPlayback;
	})(_clappr.HTML5Video);
	
	exports['default'] = DashShakaPlayback;
	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ })
/******/ ])
});
;
//# sourceMappingURL=dash-shaka-playback.js.map