/**
 * videojs-wavesurfer
 * @version 2.2.2
 * @see https://github.com/collab-project/videojs-wavesurfer
 * @copyright 2014-2018 Collab
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.videojs || (g.videojs = {})).wavesurfer = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @file defaults.js
 * @since 2.0.0
 */

// plugin defaults
var pluginDefaultOptions = {
    // Display console log messages.
    debug: false,
    // msDisplayMax indicates the number of seconds that is
    // considered the boundary value for displaying milliseconds
    // in the time controls. An audio clip with a total length of
    // 2 seconds and a msDisplayMax of 3 will use the format
    // M:SS:MMM. Clips longer than msDisplayMax will be displayed
    // as M:SS or HH:MM:SS.
    msDisplayMax: 3
};

exports.default = pluginDefaultOptions;
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @file tech.js
 * @since 2.1.0
 */

var Html5 = videojs.getTech('Html5');

var WavesurferTech = function (_Html) {
    _inherits(WavesurferTech, _Html);

    /**
     * Create an instance of this Tech.
     *
     * @param {Object} [options]
     *        The key/value store of player options.
     *
     * @param {Component~ReadyCallback} ready
     *        Callback function to call when the `Flash` Tech is ready.
     */
    function WavesurferTech(options, ready) {
        _classCallCheck(this, WavesurferTech);

        // never allow for native text tracks, because this isn't actually
        // HTML5 audio. Native tracks fail because we are using wavesurfer
        options.nativeTextTracks = false;

        return _possibleConstructorReturn(this, (WavesurferTech.__proto__ || Object.getPrototypeOf(WavesurferTech)).call(this, options, ready));
    }

    _createClass(WavesurferTech, [{
        key: 'setActivePlayer',
        value: function setActivePlayer(player) {
            var _this2 = this;

            // we need the player instance so that we can access the current
            // wavesurfer plugin attached to that player
            this.activePlayer = player;
            this.waveready = false;

            // track when wavesurfer is fully initialized (ready)
            this.activePlayer.on('waveReady', function () {
                _this2.waveready = true;
            });

            if (!this.playerIsUsingWavesurfer()) {
                // the plugin hasn't been initialized for this player, so it
                // likely doesn't need our html5 tech modifications
                return;
            }

            // proxy timeupdate events so that the tech emits them too. This will
            // allow the rest of videoJS to work (including text tracks)
            this.activePlayer.activeWavesurferPlugin.on('timeupdate', function () {
                _this2.trigger('timeupdate');
            });
        }

        /**
         * Determine whether or not the player is trying use the wavesurfer plugin
         * @returns {boolean}
         */

    }, {
        key: 'playerIsUsingWavesurfer',
        value: function playerIsUsingWavesurfer() {
            var availablePlugins = videojs.getPlugins();
            var usingWavesurferPlugin = 'wavesurfer' in availablePlugins;
            var usingRecordPlugin = 'record' in availablePlugins;

            return usingWavesurferPlugin && !usingRecordPlugin;
        }

        /**
         * Start playback.
         */

    }, {
        key: 'play',
        value: function play() {
            if (!this.playerIsUsingWavesurfer()) {
                // fall back to html5 tech functionality
                return _get(WavesurferTech.prototype.__proto__ || Object.getPrototypeOf(WavesurferTech.prototype), 'play', this).call(this);
            }

            return this.activePlayer.activeWavesurferPlugin.play();
        }

        /**
         * Pause playback.
         */

    }, {
        key: 'pause',
        value: function pause() {
            if (!this.playerIsUsingWavesurfer()) {
                //fall back to html5 tech functionality
                return _get(WavesurferTech.prototype.__proto__ || Object.getPrototypeOf(WavesurferTech.prototype), 'pause', this).call(this);
            }

            return this.activePlayer.activeWavesurferPlugin.pause();
        }

        /**
         * Get the current time
         * @return {number}
         */

    }, {
        key: 'currentTime',
        value: function currentTime() {
            if (!this.playerIsUsingWavesurfer()) {
                // fall back to html5 tech functionality
                return _get(WavesurferTech.prototype.__proto__ || Object.getPrototypeOf(WavesurferTech.prototype), 'currentTime', this).call(this);
            }

            if (!this.waveready) {
                return 0;
            }

            return this.activePlayer.activeWavesurferPlugin.getCurrentTime();
        }

        /**
         * Get the current duration
         *
         * @return {number}
         *         The duration of the media or 0 if there is no duration.
         */

    }, {
        key: 'duration',
        value: function duration() {
            if (!this.playerIsUsingWavesurfer()) {
                // fall back to html5 tech functionality
                return _get(WavesurferTech.prototype.__proto__ || Object.getPrototypeOf(WavesurferTech.prototype), 'duration', this).call(this);
            }

            if (!this.waveready) {
                return 0;
            }

            return this.activePlayer.activeWavesurferPlugin.getDuration();
        }

        /**
         * Set the current time
         *
         * @since 2.1.1
         * @param {number} time
         * @returns {*}
         */

    }, {
        key: 'setCurrentTime',
        value: function setCurrentTime(time) {
            if (!this.playerIsUsingWavesurfer()) {
                // fall back to html5 tech functionality
                return _get(WavesurferTech.prototype.__proto__ || Object.getPrototypeOf(WavesurferTech.prototype), 'currentTime', this).call(this, time);
            }

            if (!this.waveready) {
                return 0;
            }

            return this.activePlayer.activeWavesurferPlugin.surfer.seekTo(time / this.activePlayer.activeWavesurferPlugin.surfer.getDuration());
        }

        /**
         * Sets the current playback rate. A playback rate of
         * 1.0 represents normal speed and 0.5 would indicate half-speed
         * playback, for instance.
         *
         * @since 2.1.1
         * @param {number} [rate]
         *       New playback rate to set.
         *
         * @return {number}
         *         The current playback rate when getting or 1.0
         */

    }, {
        key: 'setPlaybackRate',
        value: function setPlaybackRate(rate) {
            if (this.playerIsUsingWavesurfer()) {
                this.activePlayer.activeWavesurferPlugin.surfer.setPlaybackRate(rate);
            }

            return _get(WavesurferTech.prototype.__proto__ || Object.getPrototypeOf(WavesurferTech.prototype), 'setPlaybackRate', this).call(this, rate);
        }
    }]);

    return WavesurferTech;
}(Html5);

WavesurferTech.isSupported = function () {
    return true;
};

exports.default = WavesurferTech;
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @file format-time.js
 * @since 2.0.0
 */

/**
 * Format seconds as a time string, H:MM:SS, M:SS or M:SS:MMM.
 *
 * Supplying a guide (in seconds) will force a number of leading zeros
 * to cover the length of the guide.
 *
 * @param {number} seconds - Number of seconds to be turned into a
 *     string.
 * @param {number} guide - Number (in seconds) to model the string
 *     after.
 * @param {number} msDisplayMax - Number (in milliseconds) to model the string
 *     after.
 * @return {string} Time formatted as H:MM:SS, M:SS or M:SS:MMM, e.g.
 *     0:00:12.
 * @private
 */
var formatTime = function formatTime(seconds, guide, msDisplayMax) {
    // Default to using seconds as guide
    seconds = seconds < 0 ? 0 : seconds;
    guide = guide || seconds;
    var s = Math.floor(seconds % 60),
        m = Math.floor(seconds / 60 % 60),
        h = Math.floor(seconds / 3600),
        gm = Math.floor(guide / 60 % 60),
        gh = Math.floor(guide / 3600),
        ms = Math.floor((seconds - s) * 1000);

    // handle invalid times
    if (isNaN(seconds) || seconds === Infinity) {
        // '-' is false for all relational operators (e.g. <, >=) so this
        // setting will add the minimum number of fields specified by the
        // guide
        h = m = s = ms = '-';
    }

    // Check if we need to show milliseconds
    if (guide > 0 && guide < msDisplayMax) {
        if (ms < 100) {
            if (ms < 10) {
                ms = '00' + ms;
            } else {
                ms = '0' + ms;
            }
        }
        ms = ':' + ms;
    } else {
        ms = '';
    }

    // Check if we need to show hours
    h = h > 0 || gh > 0 ? h + ':' : '';

    // If hours are showing, we may need to add a leading zero.
    // Always show at least one digit of minutes.
    m = ((h || gm >= 10) && m < 10 ? '0' + m : m) + ':';

    // Check if leading zero is need for seconds
    s = s < 10 ? '0' + s : s;

    return h + m + s + ms;
};

exports.default = formatTime;
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @file log.js
 * @since 2.0.0
 */

var ERROR = 'error';
var WARN = 'warn';

/**
 * Log message (if the debug option is enabled).
 */
var log = function log(args, logType, debug) {
    if (debug === true) {
        if (logType === ERROR) {
            videojs.log.error(args);
        } else if (logType === WARN) {
            videojs.log.warn(args);
        } else {
            videojs.log(args);
        }
    }
};

exports.default = log;
},{}],5:[function(require,module,exports){
(function (global){
var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],6:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _log2 = require('./utils/log');

var _log3 = _interopRequireDefault(_log2);

var _formatTime = require('./utils/format-time');

var _formatTime2 = _interopRequireDefault(_formatTime);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _tech = require('./tech');

var _tech2 = _interopRequireDefault(_tech);

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _wavesurfer = (typeof window !== "undefined" ? window['WaveSurfer'] : typeof global !== "undefined" ? global['WaveSurfer'] : null);

var _wavesurfer2 = _interopRequireDefault(_wavesurfer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file videojs.wavesurfer.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * The main file for the videojs-wavesurfer project.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * MIT license: https://github.com/collab-project/videojs-wavesurfer/blob/master/LICENSE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Plugin = _video2.default.getPlugin('plugin');

var wavesurferClassName = 'vjs-wavedisplay';

/**
 * Draw a waveform for audio and video files in a video.js player.
 *
 * @class Wavesurfer
 * @extends videojs.Plugin
 */

var Wavesurfer = function (_Plugin) {
    _inherits(Wavesurfer, _Plugin);

    /**
     * The constructor function for the class.
     *
     * @param {(videojs.Player|Object)} player
     * @param {Object} options - Player options.
     */
    function Wavesurfer(player, options) {
        _classCallCheck(this, Wavesurfer);

        // parse options
        var _this = _possibleConstructorReturn(this, (Wavesurfer.__proto__ || Object.getPrototypeOf(Wavesurfer)).call(this, player, options));

        options = _video2.default.mergeOptions(_defaults2.default, options);
        _this.waveReady = false;
        _this.waveFinished = false;
        _this.liveMode = false;
        _this.debug = options.debug.toString() === 'true';
        _this.msDisplayMax = parseFloat(options.msDisplayMax);

        // attach this instance to the current player so that the tech can
        // access it
        _this.player.activeWavesurferPlugin = _this;

        // check that wavesurfer is initialized in options, and add class to
        // activate videojs-wavesurfer specific styles
        if (_this.player.options_.plugins.wavesurfer !== undefined) {
            _this.player.addClass('videojs-wavesurfer');
        }

        // microphone plugin
        if (options.src === 'live') {
            // check if the wavesurfer.js microphone plugin can be enabled
            if (_wavesurfer2.default.microphone !== undefined) {
                // enable audio input from a microphone
                _this.liveMode = true;
                _this.waveReady = true;
            } else {
                _this.onWaveError('Could not find wavesurfer.js ' + 'microphone plugin!');
                return _possibleConstructorReturn(_this);
            }
        }

        // wait until player ui is ready
        _this.player.one('ready', _this.initialize.bind(_this));
        return _this;
    }

    /**
     * Player UI is ready: customize controls.
     */


    _createClass(Wavesurfer, [{
        key: 'initialize',
        value: function initialize() {
            this.player.tech_.setActivePlayer(this.player);
            this.player.bigPlayButton.hide();

            // the native controls don't work for this UI so disable
            // them no matter what
            if (this.player.usingNativeControls_ === true) {
                if (this.player.tech_.el_ !== undefined) {
                    this.player.tech_.el_.controls = false;
                }
            }

            // controls
            if (this.player.options_.controls === true) {
                // make sure controlBar is showing
                this.player.controlBar.show();
                this.player.controlBar.el_.style.display = 'flex';

                // progress control isn't used by this plugin
                this.player.controlBar.progressControl.hide();

                // make sure time displays are visible
                var uiElements = [this.player.controlBar.currentTimeDisplay, this.player.controlBar.timeDivider, this.player.controlBar.durationDisplay];
                uiElements.forEach(function (element) {
                    // ignore and show when essential elements have been disabled
                    // by user
                    if (element !== undefined) {
                        element.el_.style.display = 'block';
                        element.show();
                    }
                });
                if (this.player.controlBar.remainingTimeDisplay !== undefined) {
                    this.player.controlBar.remainingTimeDisplay.hide();
                }

                // handle play toggle interaction
                this.player.controlBar.playToggle.on(['tap', 'click'], this.onPlayToggle.bind(this));

                // disable play button until waveform is ready
                // (except when in live mode)
                if (!this.liveMode) {
                    this.player.controlBar.playToggle.hide();
                }
            }

            // wavesurfer.js setup
            var mergedOptions = this.parseOptions(this.player.options_.plugins.wavesurfer);
            this.surfer = _wavesurfer2.default.create(mergedOptions);
            this.surfer.on('error', this.onWaveError.bind(this));
            this.surfer.on('finish', this.onWaveFinish.bind(this));
            if (this.liveMode === true) {
                // listen for wavesurfer.js microphone plugin events
                this.surfer.microphone.on('deviceError', this.onWaveError.bind(this));
            }
            this.surferReady = this.onWaveReady.bind(this);
            this.surferProgress = this.onWaveProgress.bind(this);
            this.surferSeek = this.onWaveSeek.bind(this);

            // only listen to these wavesurfer.js playback events when not
            // in live mode
            if (!this.liveMode) {
                this.setupPlaybackEvents(true);
            }

            // video.js player events
            this.player.on('volumechange', this.onVolumeChange.bind(this));
            this.player.on('fullscreenchange', this.onScreenChange.bind(this));

            // video.js fluid option
            if (this.player.options_.fluid === true) {
                // give wave element a classname so it can be styled
                this.surfer.drawer.wrapper.className = wavesurferClassName;
                // listen for window resize events
                this.responsiveWave = _wavesurfer2.default.util.debounce(this.onResizeChange.bind(this), 150);
                _window2.default.addEventListener('resize', this.responsiveWave);
            }

            // kick things off
            this.startPlayers();
        }

        /**
         * Initializes the waveform options.
         *
         * @param {Object} surferOpts - Plugin options.
         * @private
         */

    }, {
        key: 'parseOptions',
        value: function parseOptions(surferOpts) {
            var rect = this.player.el_.getBoundingClientRect();
            this.originalWidth = this.player.options_.width || rect.width;
            this.originalHeight = this.player.options_.height || rect.height;

            // controlbar
            var controlBarHeight = this.player.controlBar.height();
            if (this.player.options_.controls === true && controlBarHeight === 0) {
                // the dimensions of the controlbar are not known yet, but we
                // need it now, so we can calculate the height of the waveform.
                // The default height is 30px, so use that instead.
                controlBarHeight = 30;
            }

            // set waveform element and dimensions
            // Set the container to player's container if "container" option is
            // not provided. If a waveform needs to be appended to your custom
            // element, then use below option. For example:
            // container: document.querySelector("#vjs-waveform")
            if (surferOpts.container === undefined) {
                surferOpts.container = this.player.el_;
            }

            // set the height of generated waveform if user has provided height
            // from options. If height of waveform need to be customized then use
            // option below. For example: waveformHeight: 30
            if (surferOpts.waveformHeight === undefined) {
                var playerHeight = rect.height;
                surferOpts.height = playerHeight - controlBarHeight;
            } else {
                surferOpts.height = opts.waveformHeight;
            }

            // split channels
            if (surferOpts.splitChannels && surferOpts.splitChannels === true) {
                surferOpts.height /= 2;
            }

            // enable wavesurfer.js microphone plugin
            if (this.liveMode === true) {
                surferOpts.plugins = [_wavesurfer2.default.microphone.create(surferOpts)];
                this.log('wavesurfer.js microphone plugin enabled.');
            }

            return surferOpts;
        }

        /**
         * Start the players.
         * @private
         */

    }, {
        key: 'startPlayers',
        value: function startPlayers() {
            var options = this.player.options_.plugins.wavesurfer;
            if (options.src !== undefined) {
                if (this.surfer.microphone === undefined) {
                    // show loading spinner
                    this.player.loadingSpinner.show();

                    // start loading file
                    this.load(options.src, options.peaks);
                } else {
                    // hide loading spinner
                    this.player.loadingSpinner.hide();

                    // connect microphone input to our waveform
                    options.wavesurfer = this.surfer;
                }
            } else {
                // no valid src found, hide loading spinner
                this.player.loadingSpinner.hide();
            }
        }

        /**
         * Starts or stops listening to events related to audio-playback.
         *
         * @param {boolean} enable - Start or stop listening to playback
         *     related events.
         * @private
         */

    }, {
        key: 'setupPlaybackEvents',
        value: function setupPlaybackEvents(enable) {
            if (enable === false) {
                this.surfer.un('ready', this.surferReady);
                this.surfer.un('audioprocess', this.surferProgress);
                this.surfer.un('seek', this.surferSeek);
            } else if (enable === true) {
                this.surfer.on('ready', this.surferReady);
                this.surfer.on('audioprocess', this.surferProgress);
                this.surfer.on('seek', this.surferSeek);
            }
        }

        /**
         * Start loading waveform data.
         *
         * @param {string|blob|file} url - Either the URL of the audio file,
         *     a Blob or a File object.
         * @param {string|?number[]|number[][]} peaks - Either the URL of peaks
         *     data for the audio file, or an array with peaks data.
         */

    }, {
        key: 'load',
        value: function load(url, peaks) {
            var _this2 = this;

            if (url instanceof Blob || url instanceof File) {
                this.log('Loading object: ' + JSON.stringify(url));
                this.surfer.loadBlob(url);
            } else {
                // load peak data from file
                if (peaks !== undefined) {
                    if (Array.isArray(peaks)) {
                        // use supplied peaks data
                        this.log('Loading URL: ' + url);
                        this.surfer.load(url, peaks);
                    } else {
                        // load peak data from file
                        var ajaxOptions = {
                            url: peaks,
                            responseType: 'json'
                        };
                        // supply xhr options, if any
                        if (this.player.options_.plugins.wavesurfer.xhr !== undefined) {
                            ajaxOptions.xhr = this.player.options_.plugins.wavesurfer.xhr;
                        }
                        var ajax = _wavesurfer2.default.util.ajax(ajaxOptions);

                        ajax.on('success', function (data, e) {
                            _this2.log('Loading URL: ' + url + '\nLoading Peak Data URL: ' + peaks);
                            _this2.surfer.load(url, data.data);
                        });
                        ajax.on('error', function (e) {
                            _this2.log('Unable to retrieve peak data from ' + peaks + '. Status code: ' + e.target.status, 'warn');
                            _this2.log('Loading URL: ' + url);
                            _this2.surfer.load(url);
                        });
                    }
                } else {
                    // no peaks
                    this.log('Loading URL: ' + url);
                    this.surfer.load(url);
                }
            }
        }

        /**
         * Start/resume playback or microphone.
         */

    }, {
        key: 'play',
        value: function play() {
            // show pause button
            this.player.controlBar.playToggle.handlePlay();

            if (this.liveMode) {
                // start/resume microphone visualization
                if (!this.surfer.microphone.active) {
                    this.log('Start microphone');
                    this.surfer.microphone.start();
                } else {
                    // toggle paused
                    var paused = !this.surfer.microphone.paused;

                    if (paused) {
                        this.pause();
                    } else {
                        this.log('Resume microphone');
                        this.surfer.microphone.play();
                    }
                }
            } else {
                this.log('Start playback');

                // put video.js player UI in playback mode
                this.player.play();

                // start surfer playback
                this.surfer.play();
            }
        }

        /**
         * Pauses playback or microphone visualization.
         */

    }, {
        key: 'pause',
        value: function pause() {
            // show play button
            this.player.controlBar.playToggle.handlePause();

            if (this.liveMode) {
                // pause microphone visualization
                this.log('Pause microphone');
                this.surfer.microphone.pause();
            } else {
                // pause playback
                this.log('Pause playback');

                if (!this.waveFinished) {
                    // pause wavesurfer playback
                    this.surfer.pause();
                } else {
                    this.waveFinished = false;
                }

                this.setCurrentTime();
            }
        }

        /**
         * @private
         */

    }, {
        key: 'dispose',
        value: function dispose() {
            if (this.liveMode && this.surfer.microphone) {
                // destroy microphone plugin
                this.surfer.microphone.destroy();
                this.log('Destroyed microphone plugin');
            }

            // destroy wavesurfer instance
            this.surfer.destroy();

            this.log('Destroyed plugin');
        }

        /**
         * Remove the player and waveform.
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            this.player.dispose();
        }

        /**
         * Set the volume level.
         *
         * @param {number} volume - The new volume level.
         */

    }, {
        key: 'setVolume',
        value: function setVolume(volume) {
            if (volume !== undefined) {
                this.log('Changing volume to: ' + volume);

                // update player volume
                this.player.volume(volume);
            }
        }

        /**
         * Save waveform image as data URI.
         *
         * The default format is 'image/png'. Other supported types are
         * 'image/jpeg' and 'image/webp'.
         *
         * @param {string} [format=image/png] - String indicating the image format.
         * @param {number} [quality=1] - Number between 0 and 1 indicating image
         *     quality if the requested type is 'image/jpeg' or 'image/webp'.
         * @returns {string} The data URI of the image data.
         */

    }, {
        key: 'exportImage',
        value: function exportImage(format, quality) {
            return this.surfer.exportImage(format, quality);
        }

        /**
         * Change the audio output device.
         *
         * @param {string} sinkId - Id of audio output device.
         */

    }, {
        key: 'setAudioOutput',
        value: function setAudioOutput(deviceId) {
            var _this3 = this;

            if (deviceId) {
                this.surfer.setSinkId(deviceId).then(function (result) {
                    // notify listeners
                    _this3.player.trigger('audioOutputReady');
                }).catch(function (err) {
                    // notify listeners
                    _this3.player.trigger('error', err);

                    _this3.log(err, 'error');
                });
            }
        }

        /**
         * Get the current time (in seconds) of the stream during playback.
         *
         * Returns 0 if no stream is available (yet).
         */

    }, {
        key: 'getCurrentTime',
        value: function getCurrentTime() {
            var currentTime = this.surfer.getCurrentTime();
            currentTime = isNaN(currentTime) ? 0 : currentTime;

            return currentTime;
        }

        /**
         * Updates the player's element displaying the current time.
         *
         * @param {number} [currentTime] - Current position of the playhead
         *     (in seconds).
         * @param {number} [duration] - Duration of the waveform (in seconds).
         * @private
         */

    }, {
        key: 'setCurrentTime',
        value: function setCurrentTime(currentTime, duration) {
            // emit the timeupdate event so that the tech knows about the time change
            this.trigger('timeupdate');

            if (currentTime === undefined) {
                currentTime = this.surfer.getCurrentTime();
            }

            if (duration === undefined) {
                duration = this.surfer.getDuration();
            }

            currentTime = isNaN(currentTime) ? 0 : currentTime;
            duration = isNaN(duration) ? 0 : duration;
            var time = Math.min(currentTime, duration);

            // update current time display component
            this.player.controlBar.currentTimeDisplay.formattedTime_ = this.player.controlBar.currentTimeDisplay.contentEl().lastChild.textContent = (0, _formatTime2.default)(time, duration, this.msDisplayMax);
        }

        /**
         * Get the duration of the stream in seconds.
         *
         * Returns 0 if no stream is available (yet).
         */

    }, {
        key: 'getDuration',
        value: function getDuration() {
            var duration = this.surfer.getDuration();
            duration = isNaN(duration) ? 0 : duration;

            return duration;
        }

        /**
         * Updates the player's element displaying the duration time.
         *
         * @param {number} [duration] - Duration of the waveform (in seconds).
         * @private
         */

    }, {
        key: 'setDuration',
        value: function setDuration(duration) {
            if (duration === undefined) {
                duration = this.surfer.getDuration();
            }
            duration = isNaN(duration) ? 0 : duration;

            // update duration display component
            this.player.controlBar.durationDisplay.formattedTime_ = this.player.controlBar.durationDisplay.contentEl().lastChild.textContent = (0, _formatTime2.default)(duration, duration, this.msDisplayMax);
        }

        /**
         * Audio is loaded, decoded and the waveform is drawn.
         *
         * @fires waveReady
         * @private
         */

    }, {
        key: 'onWaveReady',
        value: function onWaveReady() {
            this.waveReady = true;
            this.waveFinished = false;
            this.liveMode = false;

            this.log('Waveform is ready');
            this.player.trigger('waveReady');

            // update time display
            this.setCurrentTime();
            this.setDuration();

            // enable and show play button
            this.player.controlBar.playToggle.show();

            // hide loading spinner
            this.player.loadingSpinner.hide();

            // auto-play when ready (if enabled)
            if (this.player.options_.autoplay === true) {
                this.play();
            }
        }

        /**
         * Fires when audio playback completed.
         *
         * @fires playbackFinish
         * @private
         */

    }, {
        key: 'onWaveFinish',
        value: function onWaveFinish() {
            var _this4 = this;

            this.log('Finished playback');

            // notify listeners
            this.player.trigger('playbackFinish');

            // check if loop is enabled
            if (this.player.options_.loop === true) {
                // reset waveform
                this.surfer.stop();
                this.play();
            } else {
                // finished
                this.waveFinished = true;

                // pause player
                this.pause();

                // show the replay state of play toggle
                this.player.trigger('ended');

                // this gets called once after the clip has ended and the user
                // seeks so that we can change the replay button back to a play
                // button
                this.surfer.once('seek', function () {
                    _this4.player.controlBar.playToggle.removeClass('vjs-ended');
                    _this4.player.trigger('pause');
                });
            }
        }

        /**
         * Fires continuously during audio playback.
         *
         * @param {number} time - Current time/location of the playhead.
         * @private
         */

    }, {
        key: 'onWaveProgress',
        value: function onWaveProgress(time) {
            this.setCurrentTime();
        }

        /**
         * Fires during seeking of the waveform.
         * @private
         */

    }, {
        key: 'onWaveSeek',
        value: function onWaveSeek() {
            this.setCurrentTime();
        }

        /**
         * Waveform error.
         *
         * @param {string} error - The wavesurfer error.
         * @private
         */

    }, {
        key: 'onWaveError',
        value: function onWaveError(error) {
            // notify listeners
            this.player.trigger('error', error);

            this.log(error, 'error');
        }

        /**
         * Fired when the play toggle is clicked.
         * @private
         */

    }, {
        key: 'onPlayToggle',
        value: function onPlayToggle() {
            // workaround for video.js 6.3.1 and newer
            if (this.player.controlBar.playToggle.hasClass('vjs-ended')) {
                this.player.controlBar.playToggle.removeClass('vjs-ended');
            }
            if (this.surfer.isPlaying()) {
                this.pause();
            } else {
                this.play();
            }
        }

        /**
         * Fired when the volume in the video.js player changes.
         * @private
         */

    }, {
        key: 'onVolumeChange',
        value: function onVolumeChange() {
            var volume = this.player.volume();
            if (this.player.muted()) {
                // muted volume
                volume = 0;
            }

            // update wavesurfer.js volume
            this.surfer.setVolume(volume);
        }

        /**
         * Fired when the video.js player switches in or out of fullscreen mode.
         * @private
         */

    }, {
        key: 'onScreenChange',
        value: function onScreenChange() {
            var _this5 = this;

            // execute with tiny delay so the player element completes
            // rendering and correct dimensions are reported
            var fullscreenDelay = this.player.setInterval(function () {
                var isFullscreen = _this5.player.isFullscreen();
                var newWidth = void 0,
                    newHeight = void 0;
                if (!isFullscreen) {
                    // restore original dimensions
                    newWidth = _this5.originalWidth;
                    newHeight = _this5.originalHeight;
                }

                if (_this5.waveReady) {
                    if (_this5.liveMode && !_this5.surfer.microphone.active) {
                        // we're in live mode but the microphone hasn't been
                        // started yet
                        return;
                    }
                    // redraw
                    _this5.redrawWaveform(newWidth, newHeight);
                }

                // stop fullscreenDelay interval
                _this5.player.clearInterval(fullscreenDelay);
            }, 100);
        }

        /**
         * Fired when the video.js player is resized.
         *
         * @private
         */

    }, {
        key: 'onResizeChange',
        value: function onResizeChange() {
            if (this.surfer !== undefined) {
                // redraw waveform
                this.redrawWaveform();
            }
        }

        /**
         * Redraw waveform.
         *
         * @param {number} [newWidth] - New width for the waveform.
         * @param {number} [newHeight] - New height for the waveform.
         * @private
         */

    }, {
        key: 'redrawWaveform',
        value: function redrawWaveform(newWidth, newHeight) {
            var rect = this.player.el_.getBoundingClientRect();
            if (newWidth === undefined) {
                // get player width
                newWidth = rect.width;
            }
            if (newHeight === undefined) {
                // get player height
                newHeight = rect.height;
            }

            // destroy old drawing
            this.surfer.drawer.destroy();

            // set new dimensions
            this.surfer.params.width = newWidth;
            this.surfer.params.height = newHeight - this.player.controlBar.height();

            // redraw waveform
            this.surfer.createDrawer();
            this.surfer.drawer.wrapper.className = wavesurferClassName;
            this.surfer.drawBuffer();

            // make sure playhead is restored at right position
            this.surfer.drawer.progress(this.surfer.backend.getPlayedPercents());
        }

        /**
         * @private
         */

    }, {
        key: 'log',
        value: function log(args, logType) {
            (0, _log3.default)(args, logType, this.debug);
        }
    }]);

    return Wavesurfer;
}(Plugin);

// version nr gets replaced during build


Wavesurfer.VERSION = '2.2.2';

// register plugin
_video2.default.Wavesurfer = Wavesurfer;
_video2.default.registerPlugin('wavesurfer', Wavesurfer);

// register the WavesurferTech as 'Html5' to override the default html5 tech.
// If we register it as anything other then 'Html5', the <audio> element will
// be removed by VJS and caption tracks will be lost in the Safari browser.
_video2.default.registerTech('Html5', _tech2.default);

module.exports = {
    Wavesurfer: Wavesurfer
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./defaults":1,"./tech":2,"./utils/format-time":3,"./utils/log":4,"global/window":5}]},{},[6])(6)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczUvZGVmYXVsdHMuanMiLCJlczUvdGVjaC5qcyIsImVzNS91dGlscy9mb3JtYXQtdGltZS5qcyIsImVzNS91dGlscy9sb2cuanMiLCJub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbi8qKlxuICogQGZpbGUgZGVmYXVsdHMuanNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5cbi8vIHBsdWdpbiBkZWZhdWx0c1xudmFyIHBsdWdpbkRlZmF1bHRPcHRpb25zID0ge1xuICAgIC8vIERpc3BsYXkgY29uc29sZSBsb2cgbWVzc2FnZXMuXG4gICAgZGVidWc6IGZhbHNlLFxuICAgIC8vIG1zRGlzcGxheU1heCBpbmRpY2F0ZXMgdGhlIG51bWJlciBvZiBzZWNvbmRzIHRoYXQgaXNcbiAgICAvLyBjb25zaWRlcmVkIHRoZSBib3VuZGFyeSB2YWx1ZSBmb3IgZGlzcGxheWluZyBtaWxsaXNlY29uZHNcbiAgICAvLyBpbiB0aGUgdGltZSBjb250cm9scy4gQW4gYXVkaW8gY2xpcCB3aXRoIGEgdG90YWwgbGVuZ3RoIG9mXG4gICAgLy8gMiBzZWNvbmRzIGFuZCBhIG1zRGlzcGxheU1heCBvZiAzIHdpbGwgdXNlIHRoZSBmb3JtYXRcbiAgICAvLyBNOlNTOk1NTS4gQ2xpcHMgbG9uZ2VyIHRoYW4gbXNEaXNwbGF5TWF4IHdpbGwgYmUgZGlzcGxheWVkXG4gICAgLy8gYXMgTTpTUyBvciBISDpNTTpTUy5cbiAgICBtc0Rpc3BsYXlNYXg6IDNcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHBsdWdpbkRlZmF1bHRPcHRpb25zOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHByb3BlcnR5LCByZWNlaXZlcikgeyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgcmV0dXJuIGdldChwYXJlbnQsIHByb3BlcnR5LCByZWNlaXZlcik7IH0gfSBlbHNlIGlmIChcInZhbHVlXCIgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBAZmlsZSB0ZWNoLmpzXG4gKiBAc2luY2UgMi4xLjBcbiAqL1xuXG52YXIgSHRtbDUgPSB2aWRlb2pzLmdldFRlY2goJ0h0bWw1Jyk7XG5cbnZhciBXYXZlc3VyZmVyVGVjaCA9IGZ1bmN0aW9uIChfSHRtbCkge1xuICAgIF9pbmhlcml0cyhXYXZlc3VyZmVyVGVjaCwgX0h0bWwpO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoaXMgVGVjaC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiAgICAgICAgVGhlIGtleS92YWx1ZSBzdG9yZSBvZiBwbGF5ZXIgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50flJlYWR5Q2FsbGJhY2t9IHJlYWR5XG4gICAgICogICAgICAgIENhbGxiYWNrIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgYEZsYXNoYCBUZWNoIGlzIHJlYWR5LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFdhdmVzdXJmZXJUZWNoKG9wdGlvbnMsIHJlYWR5KSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXYXZlc3VyZmVyVGVjaCk7XG5cbiAgICAgICAgLy8gbmV2ZXIgYWxsb3cgZm9yIG5hdGl2ZSB0ZXh0IHRyYWNrcywgYmVjYXVzZSB0aGlzIGlzbid0IGFjdHVhbGx5XG4gICAgICAgIC8vIEhUTUw1IGF1ZGlvLiBOYXRpdmUgdHJhY2tzIGZhaWwgYmVjYXVzZSB3ZSBhcmUgdXNpbmcgd2F2ZXN1cmZlclxuICAgICAgICBvcHRpb25zLm5hdGl2ZVRleHRUcmFja3MgPSBmYWxzZTtcblxuICAgICAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFdhdmVzdXJmZXJUZWNoLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoV2F2ZXN1cmZlclRlY2gpKS5jYWxsKHRoaXMsIG9wdGlvbnMsIHJlYWR5KSk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKFdhdmVzdXJmZXJUZWNoLCBbe1xuICAgICAgICBrZXk6ICdzZXRBY3RpdmVQbGF5ZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0QWN0aXZlUGxheWVyKHBsYXllcikge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vIHdlIG5lZWQgdGhlIHBsYXllciBpbnN0YW5jZSBzbyB0aGF0IHdlIGNhbiBhY2Nlc3MgdGhlIGN1cnJlbnRcbiAgICAgICAgICAgIC8vIHdhdmVzdXJmZXIgcGx1Z2luIGF0dGFjaGVkIHRvIHRoYXQgcGxheWVyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVBsYXllciA9IHBsYXllcjtcbiAgICAgICAgICAgIHRoaXMud2F2ZXJlYWR5ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIHRyYWNrIHdoZW4gd2F2ZXN1cmZlciBpcyBmdWxseSBpbml0aWFsaXplZCAocmVhZHkpXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVBsYXllci5vbignd2F2ZVJlYWR5JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzMi53YXZlcmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5wbGF5ZXJJc1VzaW5nV2F2ZXN1cmZlcigpKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlIHBsdWdpbiBoYXNuJ3QgYmVlbiBpbml0aWFsaXplZCBmb3IgdGhpcyBwbGF5ZXIsIHNvIGl0XG4gICAgICAgICAgICAgICAgLy8gbGlrZWx5IGRvZXNuJ3QgbmVlZCBvdXIgaHRtbDUgdGVjaCBtb2RpZmljYXRpb25zXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBwcm94eSB0aW1ldXBkYXRlIGV2ZW50cyBzbyB0aGF0IHRoZSB0ZWNoIGVtaXRzIHRoZW0gdG9vLiBUaGlzIHdpbGxcbiAgICAgICAgICAgIC8vIGFsbG93IHRoZSByZXN0IG9mIHZpZGVvSlMgdG8gd29yayAoaW5jbHVkaW5nIHRleHQgdHJhY2tzKVxuICAgICAgICAgICAgdGhpcy5hY3RpdmVQbGF5ZXIuYWN0aXZlV2F2ZXN1cmZlclBsdWdpbi5vbigndGltZXVwZGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpczIudHJpZ2dlcigndGltZXVwZGF0ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogRGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IHRoZSBwbGF5ZXIgaXMgdHJ5aW5nIHVzZSB0aGUgd2F2ZXN1cmZlciBwbHVnaW5cbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdwbGF5ZXJJc1VzaW5nV2F2ZXN1cmZlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwbGF5ZXJJc1VzaW5nV2F2ZXN1cmZlcigpIHtcbiAgICAgICAgICAgIHZhciBhdmFpbGFibGVQbHVnaW5zID0gdmlkZW9qcy5nZXRQbHVnaW5zKCk7XG4gICAgICAgICAgICB2YXIgdXNpbmdXYXZlc3VyZmVyUGx1Z2luID0gJ3dhdmVzdXJmZXInIGluIGF2YWlsYWJsZVBsdWdpbnM7XG4gICAgICAgICAgICB2YXIgdXNpbmdSZWNvcmRQbHVnaW4gPSAncmVjb3JkJyBpbiBhdmFpbGFibGVQbHVnaW5zO1xuXG4gICAgICAgICAgICByZXR1cm4gdXNpbmdXYXZlc3VyZmVyUGx1Z2luICYmICF1c2luZ1JlY29yZFBsdWdpbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdGFydCBwbGF5YmFjay5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3BsYXknLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcGxheSgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wbGF5ZXJJc1VzaW5nV2F2ZXN1cmZlcigpKSB7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCBiYWNrIHRvIGh0bWw1IHRlY2ggZnVuY3Rpb25hbGl0eVxuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0KFdhdmVzdXJmZXJUZWNoLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFdhdmVzdXJmZXJUZWNoLnByb3RvdHlwZSksICdwbGF5JywgdGhpcykuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlUGxheWVyLmFjdGl2ZVdhdmVzdXJmZXJQbHVnaW4ucGxheSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBhdXNlIHBsYXliYWNrLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncGF1c2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucGxheWVySXNVc2luZ1dhdmVzdXJmZXIoKSkge1xuICAgICAgICAgICAgICAgIC8vZmFsbCBiYWNrIHRvIGh0bWw1IHRlY2ggZnVuY3Rpb25hbGl0eVxuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0KFdhdmVzdXJmZXJUZWNoLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFdhdmVzdXJmZXJUZWNoLnByb3RvdHlwZSksICdwYXVzZScsIHRoaXMpLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZVBsYXllci5hY3RpdmVXYXZlc3VyZmVyUGx1Z2luLnBhdXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBjdXJyZW50IHRpbWVcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY3VycmVudFRpbWUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY3VycmVudFRpbWUoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucGxheWVySXNVc2luZ1dhdmVzdXJmZXIoKSkge1xuICAgICAgICAgICAgICAgIC8vIGZhbGwgYmFjayB0byBodG1sNSB0ZWNoIGZ1bmN0aW9uYWxpdHlcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dldChXYXZlc3VyZmVyVGVjaC5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihXYXZlc3VyZmVyVGVjaC5wcm90b3R5cGUpLCAnY3VycmVudFRpbWUnLCB0aGlzKS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMud2F2ZXJlYWR5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZVBsYXllci5hY3RpdmVXYXZlc3VyZmVyUGx1Z2luLmdldEN1cnJlbnRUaW1lKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBjdXJyZW50IGR1cmF0aW9uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgICAgICogICAgICAgICBUaGUgZHVyYXRpb24gb2YgdGhlIG1lZGlhIG9yIDAgaWYgdGhlcmUgaXMgbm8gZHVyYXRpb24uXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdkdXJhdGlvbicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkdXJhdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wbGF5ZXJJc1VzaW5nV2F2ZXN1cmZlcigpKSB7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCBiYWNrIHRvIGh0bWw1IHRlY2ggZnVuY3Rpb25hbGl0eVxuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0KFdhdmVzdXJmZXJUZWNoLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFdhdmVzdXJmZXJUZWNoLnByb3RvdHlwZSksICdkdXJhdGlvbicsIHRoaXMpLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy53YXZlcmVhZHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlUGxheWVyLmFjdGl2ZVdhdmVzdXJmZXJQbHVnaW4uZ2V0RHVyYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgdGhlIGN1cnJlbnQgdGltZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAc2luY2UgMi4xLjFcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVcbiAgICAgICAgICogQHJldHVybnMgeyp9XG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZXRDdXJyZW50VGltZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRDdXJyZW50VGltZSh0aW1lKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucGxheWVySXNVc2luZ1dhdmVzdXJmZXIoKSkge1xuICAgICAgICAgICAgICAgIC8vIGZhbGwgYmFjayB0byBodG1sNSB0ZWNoIGZ1bmN0aW9uYWxpdHlcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dldChXYXZlc3VyZmVyVGVjaC5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihXYXZlc3VyZmVyVGVjaC5wcm90b3R5cGUpLCAnY3VycmVudFRpbWUnLCB0aGlzKS5jYWxsKHRoaXMsIHRpbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMud2F2ZXJlYWR5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZVBsYXllci5hY3RpdmVXYXZlc3VyZmVyUGx1Z2luLnN1cmZlci5zZWVrVG8odGltZSAvIHRoaXMuYWN0aXZlUGxheWVyLmFjdGl2ZVdhdmVzdXJmZXJQbHVnaW4uc3VyZmVyLmdldER1cmF0aW9uKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIGN1cnJlbnQgcGxheWJhY2sgcmF0ZS4gQSBwbGF5YmFjayByYXRlIG9mXG4gICAgICAgICAqIDEuMCByZXByZXNlbnRzIG5vcm1hbCBzcGVlZCBhbmQgMC41IHdvdWxkIGluZGljYXRlIGhhbGYtc3BlZWRcbiAgICAgICAgICogcGxheWJhY2ssIGZvciBpbnN0YW5jZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHNpbmNlIDIuMS4xXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcmF0ZV1cbiAgICAgICAgICogICAgICAgTmV3IHBsYXliYWNrIHJhdGUgdG8gc2V0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICAgICAqICAgICAgICAgVGhlIGN1cnJlbnQgcGxheWJhY2sgcmF0ZSB3aGVuIGdldHRpbmcgb3IgMS4wXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZXRQbGF5YmFja1JhdGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0UGxheWJhY2tSYXRlKHJhdGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcklzVXNpbmdXYXZlc3VyZmVyKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVBsYXllci5hY3RpdmVXYXZlc3VyZmVyUGx1Z2luLnN1cmZlci5zZXRQbGF5YmFja1JhdGUocmF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBfZ2V0KFdhdmVzdXJmZXJUZWNoLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFdhdmVzdXJmZXJUZWNoLnByb3RvdHlwZSksICdzZXRQbGF5YmFja1JhdGUnLCB0aGlzKS5jYWxsKHRoaXMsIHJhdGUpO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFdhdmVzdXJmZXJUZWNoO1xufShIdG1sNSk7XG5cbldhdmVzdXJmZXJUZWNoLmlzU3VwcG9ydGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gV2F2ZXN1cmZlclRlY2g7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG4vKipcbiAqIEBmaWxlIGZvcm1hdC10aW1lLmpzXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuXG4vKipcbiAqIEZvcm1hdCBzZWNvbmRzIGFzIGEgdGltZSBzdHJpbmcsIEg6TU06U1MsIE06U1Mgb3IgTTpTUzpNTU0uXG4gKlxuICogU3VwcGx5aW5nIGEgZ3VpZGUgKGluIHNlY29uZHMpIHdpbGwgZm9yY2UgYSBudW1iZXIgb2YgbGVhZGluZyB6ZXJvc1xuICogdG8gY292ZXIgdGhlIGxlbmd0aCBvZiB0aGUgZ3VpZGUuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHNlY29uZHMgLSBOdW1iZXIgb2Ygc2Vjb25kcyB0byBiZSB0dXJuZWQgaW50byBhXG4gKiAgICAgc3RyaW5nLlxuICogQHBhcmFtIHtudW1iZXJ9IGd1aWRlIC0gTnVtYmVyIChpbiBzZWNvbmRzKSB0byBtb2RlbCB0aGUgc3RyaW5nXG4gKiAgICAgYWZ0ZXIuXG4gKiBAcGFyYW0ge251bWJlcn0gbXNEaXNwbGF5TWF4IC0gTnVtYmVyIChpbiBtaWxsaXNlY29uZHMpIHRvIG1vZGVsIHRoZSBzdHJpbmdcbiAqICAgICBhZnRlci5cbiAqIEByZXR1cm4ge3N0cmluZ30gVGltZSBmb3JtYXR0ZWQgYXMgSDpNTTpTUywgTTpTUyBvciBNOlNTOk1NTSwgZS5nLlxuICogICAgIDA6MDA6MTIuXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgZm9ybWF0VGltZSA9IGZ1bmN0aW9uIGZvcm1hdFRpbWUoc2Vjb25kcywgZ3VpZGUsIG1zRGlzcGxheU1heCkge1xuICAgIC8vIERlZmF1bHQgdG8gdXNpbmcgc2Vjb25kcyBhcyBndWlkZVxuICAgIHNlY29uZHMgPSBzZWNvbmRzIDwgMCA/IDAgOiBzZWNvbmRzO1xuICAgIGd1aWRlID0gZ3VpZGUgfHwgc2Vjb25kcztcbiAgICB2YXIgcyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAlIDYwKSxcbiAgICAgICAgbSA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwICUgNjApLFxuICAgICAgICBoID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMzYwMCksXG4gICAgICAgIGdtID0gTWF0aC5mbG9vcihndWlkZSAvIDYwICUgNjApLFxuICAgICAgICBnaCA9IE1hdGguZmxvb3IoZ3VpZGUgLyAzNjAwKSxcbiAgICAgICAgbXMgPSBNYXRoLmZsb29yKChzZWNvbmRzIC0gcykgKiAxMDAwKTtcblxuICAgIC8vIGhhbmRsZSBpbnZhbGlkIHRpbWVzXG4gICAgaWYgKGlzTmFOKHNlY29uZHMpIHx8IHNlY29uZHMgPT09IEluZmluaXR5KSB7XG4gICAgICAgIC8vICctJyBpcyBmYWxzZSBmb3IgYWxsIHJlbGF0aW9uYWwgb3BlcmF0b3JzIChlLmcuIDwsID49KSBzbyB0aGlzXG4gICAgICAgIC8vIHNldHRpbmcgd2lsbCBhZGQgdGhlIG1pbmltdW0gbnVtYmVyIG9mIGZpZWxkcyBzcGVjaWZpZWQgYnkgdGhlXG4gICAgICAgIC8vIGd1aWRlXG4gICAgICAgIGggPSBtID0gcyA9IG1zID0gJy0nO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIHdlIG5lZWQgdG8gc2hvdyBtaWxsaXNlY29uZHNcbiAgICBpZiAoZ3VpZGUgPiAwICYmIGd1aWRlIDwgbXNEaXNwbGF5TWF4KSB7XG4gICAgICAgIGlmIChtcyA8IDEwMCkge1xuICAgICAgICAgICAgaWYgKG1zIDwgMTApIHtcbiAgICAgICAgICAgICAgICBtcyA9ICcwMCcgKyBtcztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbXMgPSAnMCcgKyBtcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtcyA9ICc6JyArIG1zO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG1zID0gJyc7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgd2UgbmVlZCB0byBzaG93IGhvdXJzXG4gICAgaCA9IGggPiAwIHx8IGdoID4gMCA/IGggKyAnOicgOiAnJztcblxuICAgIC8vIElmIGhvdXJzIGFyZSBzaG93aW5nLCB3ZSBtYXkgbmVlZCB0byBhZGQgYSBsZWFkaW5nIHplcm8uXG4gICAgLy8gQWx3YXlzIHNob3cgYXQgbGVhc3Qgb25lIGRpZ2l0IG9mIG1pbnV0ZXMuXG4gICAgbSA9ICgoaCB8fCBnbSA+PSAxMCkgJiYgbSA8IDEwID8gJzAnICsgbSA6IG0pICsgJzonO1xuXG4gICAgLy8gQ2hlY2sgaWYgbGVhZGluZyB6ZXJvIGlzIG5lZWQgZm9yIHNlY29uZHNcbiAgICBzID0gcyA8IDEwID8gJzAnICsgcyA6IHM7XG5cbiAgICByZXR1cm4gaCArIG0gKyBzICsgbXM7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmb3JtYXRUaW1lOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuLyoqXG4gKiBAZmlsZSBsb2cuanNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5cbnZhciBFUlJPUiA9ICdlcnJvcic7XG52YXIgV0FSTiA9ICd3YXJuJztcblxuLyoqXG4gKiBMb2cgbWVzc2FnZSAoaWYgdGhlIGRlYnVnIG9wdGlvbiBpcyBlbmFibGVkKS5cbiAqL1xudmFyIGxvZyA9IGZ1bmN0aW9uIGxvZyhhcmdzLCBsb2dUeXBlLCBkZWJ1Zykge1xuICAgIGlmIChkZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAobG9nVHlwZSA9PT0gRVJST1IpIHtcbiAgICAgICAgICAgIHZpZGVvanMubG9nLmVycm9yKGFyZ3MpO1xuICAgICAgICB9IGVsc2UgaWYgKGxvZ1R5cGUgPT09IFdBUk4pIHtcbiAgICAgICAgICAgIHZpZGVvanMubG9nLndhcm4oYXJncyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2aWRlb2pzLmxvZyhhcmdzKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGxvZzsiLCJ2YXIgd2luO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbiA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbiA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgIHdpbiA9IHNlbGY7XG59IGVsc2Uge1xuICAgIHdpbiA9IHt9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdpbjtcbiJdfQ==
