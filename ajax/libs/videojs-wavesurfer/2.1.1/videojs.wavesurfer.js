/**
 * videojs-wavesurfer
 * @version 2.1.1
 * @see https://github.com/collab-project/videojs-wavesurfer
 * @copyright 2014-2017 Collab
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.videojs || (g.videojs = {})).wavesurfer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

        // we need the player instance so that we can access the current
        // wavesurfer plugin attached to that player
        var _this = _possibleConstructorReturn(this, (WavesurferTech.__proto__ || Object.getPrototypeOf(WavesurferTech)).call(this, options, ready));

        _this.activePlayer = videojs(options.playerId);
        _this.waveready = false;

        // track when wavesurfer is fully initialized (ready)
        _this.activePlayer.on('waveReady', function () {
            _this.waveready = true;
        });

        if (!_this.playerIsUsingWavesurfer()) {
            // the plugin hasn't been initialized for this player, so it
            // likely doesn't need our html5 tech modifications
            return _possibleConstructorReturn(_this);
        }

        // proxy timeupdate events so that the tech emits them too. This will
        // allow the rest of videoJS to work (including text tracks)
        _this.activePlayer.activeWavesurferPlugin.on('timeupdate', function () {
            _this.trigger('timeupdate');
        });
        return _this;
    }

    /**
     * Determine whether or not the player is trying use wavesurfer
     * @returns {boolean}
     */


    _createClass(WavesurferTech, [{
        key: 'playerIsUsingWavesurfer',
        value: function playerIsUsingWavesurfer() {
            return this.activePlayer.activeWavesurferPlugin !== undefined;
        }
    }, {
        key: 'play',
        value: function play() {
            if (!this.playerIsUsingWavesurfer()) {
                // fall back to html5 tech functionality
                return _get(WavesurferTech.prototype.__proto__ || Object.getPrototypeOf(WavesurferTech.prototype), 'play', this).call(this);
            }

            return this.activePlayer.activeWavesurferPlugin.play();
        }
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
         * @param {string} peakUrl - The URL of peak data for the audio file.
         */

    }, {
        key: 'load',
        value: function load(url, peakUrl) {
            var _this2 = this;

            if (url instanceof Blob || url instanceof File) {
                this.log('Loading object: ' + JSON.stringify(url));
                this.surfer.loadBlob(url);
            } else {
                // load peak data from file
                if (peakUrl !== undefined) {
                    var ajax = _wavesurfer2.default.util.ajax({
                        url: peakUrl,
                        responseType: 'json'
                    });

                    ajax.on('success', function (data, e) {
                        if (e.target.status == 200) {
                            _this2.log('Loading URL: ' + url + '\nLoading Peak Data URL: ' + peakUrl);
                            _this2.surfer.load(url, data.data);
                        } else {
                            _this2.log('Unable to retrieve peak data from ' + peakUrl + '. Status code: ' + e.target.status);
                            _this2.log('Loading URL: ' + url);
                            _this2.surfer.load(url);
                        }
                    });
                } else {
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
            var _this3 = this;

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
                    _this3.player.controlBar.playToggle.removeClass('vjs-ended');
                    _this3.player.trigger('pause');
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
            var _this4 = this;

            // execute with tiny delay so the player element completes
            // rendering and correct dimensions are reported
            var fullscreenDelay = this.player.setInterval(function () {
                var isFullscreen = _this4.player.isFullscreen();
                var newWidth = void 0,
                    newHeight = void 0;
                if (!isFullscreen) {
                    // restore original dimensions
                    newWidth = _this4.originalWidth;
                    newHeight = _this4.originalHeight;
                }

                if (_this4.waveReady) {
                    if (_this4.liveMode && !_this4.surfer.microphone.active) {
                        // we're in live mode but the microphone hasn't been
                        // started yet
                        return;
                    }
                    // redraw
                    _this4.redrawWaveform(newWidth, newHeight);
                }

                // stop fullscreenDelay interval
                _this4.player.clearInterval(fullscreenDelay);
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


Wavesurfer.VERSION = '2.1.1';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczUvZGVmYXVsdHMuanMiLCJlczUvdGVjaC5qcyIsImVzNS91dGlscy9mb3JtYXQtdGltZS5qcyIsImVzNS91dGlscy9sb2cuanMiLCJub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuLyoqXG4gKiBAZmlsZSBkZWZhdWx0cy5qc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cblxuLy8gcGx1Z2luIGRlZmF1bHRzXG52YXIgcGx1Z2luRGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgLy8gRGlzcGxheSBjb25zb2xlIGxvZyBtZXNzYWdlcy5cbiAgICBkZWJ1ZzogZmFsc2UsXG4gICAgLy8gbXNEaXNwbGF5TWF4IGluZGljYXRlcyB0aGUgbnVtYmVyIG9mIHNlY29uZHMgdGhhdCBpc1xuICAgIC8vIGNvbnNpZGVyZWQgdGhlIGJvdW5kYXJ5IHZhbHVlIGZvciBkaXNwbGF5aW5nIG1pbGxpc2Vjb25kc1xuICAgIC8vIGluIHRoZSB0aW1lIGNvbnRyb2xzLiBBbiBhdWRpbyBjbGlwIHdpdGggYSB0b3RhbCBsZW5ndGggb2ZcbiAgICAvLyAyIHNlY29uZHMgYW5kIGEgbXNEaXNwbGF5TWF4IG9mIDMgd2lsbCB1c2UgdGhlIGZvcm1hdFxuICAgIC8vIE06U1M6TU1NLiBDbGlwcyBsb25nZXIgdGhhbiBtc0Rpc3BsYXlNYXggd2lsbCBiZSBkaXNwbGF5ZWRcbiAgICAvLyBhcyBNOlNTIG9yIEhIOk1NOlNTLlxuICAgIG1zRGlzcGxheU1heDogM1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gcGx1Z2luRGVmYXVsdE9wdGlvbnM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KG9iamVjdCwgcHJvcGVydHksIHJlY2VpdmVyKSB7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyByZXR1cm4gZ2V0KHBhcmVudCwgcHJvcGVydHksIHJlY2VpdmVyKTsgfSB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIEBmaWxlIHRlY2guanNcbiAqIEBzaW5jZSAyLjEuMFxuICovXG5cbnZhciBIdG1sNSA9IHZpZGVvanMuZ2V0VGVjaCgnSHRtbDUnKTtcblxudmFyIFdhdmVzdXJmZXJUZWNoID0gZnVuY3Rpb24gKF9IdG1sKSB7XG4gICAgX2luaGVyaXRzKFdhdmVzdXJmZXJUZWNoLCBfSHRtbCk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhpcyBUZWNoLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgICAqICAgICAgICBUaGUga2V5L3ZhbHVlIHN0b3JlIG9mIHBsYXllciBvcHRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtDb21wb25lbnR+UmVhZHlDYWxsYmFja30gcmVhZHlcbiAgICAgKiAgICAgICAgQ2FsbGJhY2sgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZSBgRmxhc2hgIFRlY2ggaXMgcmVhZHkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gV2F2ZXN1cmZlclRlY2gob3B0aW9ucywgcmVhZHkpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFdhdmVzdXJmZXJUZWNoKTtcblxuICAgICAgICAvLyBuZXZlciBhbGxvdyBmb3IgbmF0aXZlIHRleHQgdHJhY2tzLCBiZWNhdXNlIHRoaXMgaXNuJ3QgYWN0dWFsbHlcbiAgICAgICAgLy8gSFRNTDUgYXVkaW8uIE5hdGl2ZSB0cmFja3MgZmFpbCBiZWNhdXNlIHdlIGFyZSB1c2luZyB3YXZlc3VyZmVyXG4gICAgICAgIG9wdGlvbnMubmF0aXZlVGV4dFRyYWNrcyA9IGZhbHNlO1xuXG4gICAgICAgIC8vIHdlIG5lZWQgdGhlIHBsYXllciBpbnN0YW5jZSBzbyB0aGF0IHdlIGNhbiBhY2Nlc3MgdGhlIGN1cnJlbnRcbiAgICAgICAgLy8gd2F2ZXN1cmZlciBwbHVnaW4gYXR0YWNoZWQgdG8gdGhhdCBwbGF5ZXJcbiAgICAgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFdhdmVzdXJmZXJUZWNoLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoV2F2ZXN1cmZlclRlY2gpKS5jYWxsKHRoaXMsIG9wdGlvbnMsIHJlYWR5KSk7XG5cbiAgICAgICAgX3RoaXMuYWN0aXZlUGxheWVyID0gdmlkZW9qcyhvcHRpb25zLnBsYXllcklkKTtcbiAgICAgICAgX3RoaXMud2F2ZXJlYWR5ID0gZmFsc2U7XG5cbiAgICAgICAgLy8gdHJhY2sgd2hlbiB3YXZlc3VyZmVyIGlzIGZ1bGx5IGluaXRpYWxpemVkIChyZWFkeSlcbiAgICAgICAgX3RoaXMuYWN0aXZlUGxheWVyLm9uKCd3YXZlUmVhZHknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy53YXZlcmVhZHkgPSB0cnVlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIV90aGlzLnBsYXllcklzVXNpbmdXYXZlc3VyZmVyKCkpIHtcbiAgICAgICAgICAgIC8vIHRoZSBwbHVnaW4gaGFzbid0IGJlZW4gaW5pdGlhbGl6ZWQgZm9yIHRoaXMgcGxheWVyLCBzbyBpdFxuICAgICAgICAgICAgLy8gbGlrZWx5IGRvZXNuJ3QgbmVlZCBvdXIgaHRtbDUgdGVjaCBtb2RpZmljYXRpb25zXG4gICAgICAgICAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJveHkgdGltZXVwZGF0ZSBldmVudHMgc28gdGhhdCB0aGUgdGVjaCBlbWl0cyB0aGVtIHRvby4gVGhpcyB3aWxsXG4gICAgICAgIC8vIGFsbG93IHRoZSByZXN0IG9mIHZpZGVvSlMgdG8gd29yayAoaW5jbHVkaW5nIHRleHQgdHJhY2tzKVxuICAgICAgICBfdGhpcy5hY3RpdmVQbGF5ZXIuYWN0aXZlV2F2ZXN1cmZlclBsdWdpbi5vbigndGltZXVwZGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLnRyaWdnZXIoJ3RpbWV1cGRhdGUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgd2hldGhlciBvciBub3QgdGhlIHBsYXllciBpcyB0cnlpbmcgdXNlIHdhdmVzdXJmZXJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgX2NyZWF0ZUNsYXNzKFdhdmVzdXJmZXJUZWNoLCBbe1xuICAgICAgICBrZXk6ICdwbGF5ZXJJc1VzaW5nV2F2ZXN1cmZlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwbGF5ZXJJc1VzaW5nV2F2ZXN1cmZlcigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZVBsYXllci5hY3RpdmVXYXZlc3VyZmVyUGx1Z2luICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3BsYXknLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcGxheSgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wbGF5ZXJJc1VzaW5nV2F2ZXN1cmZlcigpKSB7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCBiYWNrIHRvIGh0bWw1IHRlY2ggZnVuY3Rpb25hbGl0eVxuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0KFdhdmVzdXJmZXJUZWNoLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFdhdmVzdXJmZXJUZWNoLnByb3RvdHlwZSksICdwbGF5JywgdGhpcykuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlUGxheWVyLmFjdGl2ZVdhdmVzdXJmZXJQbHVnaW4ucGxheSgpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdwYXVzZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wbGF5ZXJJc1VzaW5nV2F2ZXN1cmZlcigpKSB7XG4gICAgICAgICAgICAgICAgLy9mYWxsIGJhY2sgdG8gaHRtbDUgdGVjaCBmdW5jdGlvbmFsaXR5XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9nZXQoV2F2ZXN1cmZlclRlY2gucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoV2F2ZXN1cmZlclRlY2gucHJvdG90eXBlKSwgJ3BhdXNlJywgdGhpcykuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlUGxheWVyLmFjdGl2ZVdhdmVzdXJmZXJQbHVnaW4ucGF1c2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIGN1cnJlbnQgdGltZVxuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjdXJyZW50VGltZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjdXJyZW50VGltZSgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wbGF5ZXJJc1VzaW5nV2F2ZXN1cmZlcigpKSB7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCBiYWNrIHRvIGh0bWw1IHRlY2ggZnVuY3Rpb25hbGl0eVxuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0KFdhdmVzdXJmZXJUZWNoLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFdhdmVzdXJmZXJUZWNoLnByb3RvdHlwZSksICdjdXJyZW50VGltZScsIHRoaXMpLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy53YXZlcmVhZHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlUGxheWVyLmFjdGl2ZVdhdmVzdXJmZXJQbHVnaW4uZ2V0Q3VycmVudFRpbWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIGN1cnJlbnQgZHVyYXRpb25cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAgICAgKiAgICAgICAgIFRoZSBkdXJhdGlvbiBvZiB0aGUgbWVkaWEgb3IgMCBpZiB0aGVyZSBpcyBubyBkdXJhdGlvbi5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2R1cmF0aW9uJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGR1cmF0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllcklzVXNpbmdXYXZlc3VyZmVyKCkpIHtcbiAgICAgICAgICAgICAgICAvLyBmYWxsIGJhY2sgdG8gaHRtbDUgdGVjaCBmdW5jdGlvbmFsaXR5XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9nZXQoV2F2ZXN1cmZlclRlY2gucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoV2F2ZXN1cmZlclRlY2gucHJvdG90eXBlKSwgJ2R1cmF0aW9uJywgdGhpcykuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLndhdmVyZWFkeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVQbGF5ZXIuYWN0aXZlV2F2ZXN1cmZlclBsdWdpbi5nZXREdXJhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB0aGUgY3VycmVudCB0aW1lXG4gICAgICAgICAqXG4gICAgICAgICAqIEBzaW5jZSAyLjEuMVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZVxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NldEN1cnJlbnRUaW1lJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldEN1cnJlbnRUaW1lKHRpbWUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wbGF5ZXJJc1VzaW5nV2F2ZXN1cmZlcigpKSB7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCBiYWNrIHRvIGh0bWw1IHRlY2ggZnVuY3Rpb25hbGl0eVxuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0KFdhdmVzdXJmZXJUZWNoLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFdhdmVzdXJmZXJUZWNoLnByb3RvdHlwZSksICdjdXJyZW50VGltZScsIHRoaXMpLmNhbGwodGhpcywgdGltZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy53YXZlcmVhZHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlUGxheWVyLmFjdGl2ZVdhdmVzdXJmZXJQbHVnaW4uc3VyZmVyLnNlZWtUbyh0aW1lIC8gdGhpcy5hY3RpdmVQbGF5ZXIuYWN0aXZlV2F2ZXN1cmZlclBsdWdpbi5zdXJmZXIuZ2V0RHVyYXRpb24oKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgY3VycmVudCBwbGF5YmFjayByYXRlLiBBIHBsYXliYWNrIHJhdGUgb2ZcbiAgICAgICAgICogMS4wIHJlcHJlc2VudHMgbm9ybWFsIHNwZWVkIGFuZCAwLjUgd291bGQgaW5kaWNhdGUgaGFsZi1zcGVlZFxuICAgICAgICAgKiBwbGF5YmFjaywgZm9yIGluc3RhbmNlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAc2luY2UgMi4xLjFcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IFtyYXRlXVxuICAgICAgICAgKiAgICAgICBOZXcgcGxheWJhY2sgcmF0ZSB0byBzZXQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgICAgICogICAgICAgICBUaGUgY3VycmVudCBwbGF5YmFjayByYXRlIHdoZW4gZ2V0dGluZyBvciAxLjBcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NldFBsYXliYWNrUmF0ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRQbGF5YmFja1JhdGUocmF0ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVySXNVc2luZ1dhdmVzdXJmZXIoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlUGxheWVyLmFjdGl2ZVdhdmVzdXJmZXJQbHVnaW4uc3VyZmVyLnNldFBsYXliYWNrUmF0ZShyYXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIF9nZXQoV2F2ZXN1cmZlclRlY2gucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoV2F2ZXN1cmZlclRlY2gucHJvdG90eXBlKSwgJ3NldFBsYXliYWNrUmF0ZScsIHRoaXMpLmNhbGwodGhpcywgcmF0ZSk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gV2F2ZXN1cmZlclRlY2g7XG59KEh0bWw1KTtcblxuV2F2ZXN1cmZlclRlY2guaXNTdXBwb3J0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBXYXZlc3VyZmVyVGVjaDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbi8qKlxuICogQGZpbGUgZm9ybWF0LXRpbWUuanNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5cbi8qKlxuICogRm9ybWF0IHNlY29uZHMgYXMgYSB0aW1lIHN0cmluZywgSDpNTTpTUywgTTpTUyBvciBNOlNTOk1NTS5cbiAqXG4gKiBTdXBwbHlpbmcgYSBndWlkZSAoaW4gc2Vjb25kcykgd2lsbCBmb3JjZSBhIG51bWJlciBvZiBsZWFkaW5nIHplcm9zXG4gKiB0byBjb3ZlciB0aGUgbGVuZ3RoIG9mIHRoZSBndWlkZS5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2Vjb25kcyAtIE51bWJlciBvZiBzZWNvbmRzIHRvIGJlIHR1cm5lZCBpbnRvIGFcbiAqICAgICBzdHJpbmcuXG4gKiBAcGFyYW0ge251bWJlcn0gZ3VpZGUgLSBOdW1iZXIgKGluIHNlY29uZHMpIHRvIG1vZGVsIHRoZSBzdHJpbmdcbiAqICAgICBhZnRlci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBtc0Rpc3BsYXlNYXggLSBOdW1iZXIgKGluIG1pbGxpc2Vjb25kcykgdG8gbW9kZWwgdGhlIHN0cmluZ1xuICogICAgIGFmdGVyLlxuICogQHJldHVybiB7c3RyaW5nfSBUaW1lIGZvcm1hdHRlZCBhcyBIOk1NOlNTLCBNOlNTIG9yIE06U1M6TU1NLCBlLmcuXG4gKiAgICAgMDowMDoxMi5cbiAqIEBwcml2YXRlXG4gKi9cbnZhciBmb3JtYXRUaW1lID0gZnVuY3Rpb24gZm9ybWF0VGltZShzZWNvbmRzLCBndWlkZSwgbXNEaXNwbGF5TWF4KSB7XG4gICAgLy8gRGVmYXVsdCB0byB1c2luZyBzZWNvbmRzIGFzIGd1aWRlXG4gICAgc2Vjb25kcyA9IHNlY29uZHMgPCAwID8gMCA6IHNlY29uZHM7XG4gICAgZ3VpZGUgPSBndWlkZSB8fCBzZWNvbmRzO1xuICAgIHZhciBzID0gTWF0aC5mbG9vcihzZWNvbmRzICUgNjApLFxuICAgICAgICBtID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjAgJSA2MCksXG4gICAgICAgIGggPSBNYXRoLmZsb29yKHNlY29uZHMgLyAzNjAwKSxcbiAgICAgICAgZ20gPSBNYXRoLmZsb29yKGd1aWRlIC8gNjAgJSA2MCksXG4gICAgICAgIGdoID0gTWF0aC5mbG9vcihndWlkZSAvIDM2MDApLFxuICAgICAgICBtcyA9IE1hdGguZmxvb3IoKHNlY29uZHMgLSBzKSAqIDEwMDApO1xuXG4gICAgLy8gaGFuZGxlIGludmFsaWQgdGltZXNcbiAgICBpZiAoaXNOYU4oc2Vjb25kcykgfHwgc2Vjb25kcyA9PT0gSW5maW5pdHkpIHtcbiAgICAgICAgLy8gJy0nIGlzIGZhbHNlIGZvciBhbGwgcmVsYXRpb25hbCBvcGVyYXRvcnMgKGUuZy4gPCwgPj0pIHNvIHRoaXNcbiAgICAgICAgLy8gc2V0dGluZyB3aWxsIGFkZCB0aGUgbWluaW11bSBudW1iZXIgb2YgZmllbGRzIHNwZWNpZmllZCBieSB0aGVcbiAgICAgICAgLy8gZ3VpZGVcbiAgICAgICAgaCA9IG0gPSBzID0gbXMgPSAnLSc7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgd2UgbmVlZCB0byBzaG93IG1pbGxpc2Vjb25kc1xuICAgIGlmIChndWlkZSA+IDAgJiYgZ3VpZGUgPCBtc0Rpc3BsYXlNYXgpIHtcbiAgICAgICAgaWYgKG1zIDwgMTAwKSB7XG4gICAgICAgICAgICBpZiAobXMgPCAxMCkge1xuICAgICAgICAgICAgICAgIG1zID0gJzAwJyArIG1zO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtcyA9ICcwJyArIG1zO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG1zID0gJzonICsgbXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbXMgPSAnJztcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiB3ZSBuZWVkIHRvIHNob3cgaG91cnNcbiAgICBoID0gaCA+IDAgfHwgZ2ggPiAwID8gaCArICc6JyA6ICcnO1xuXG4gICAgLy8gSWYgaG91cnMgYXJlIHNob3dpbmcsIHdlIG1heSBuZWVkIHRvIGFkZCBhIGxlYWRpbmcgemVyby5cbiAgICAvLyBBbHdheXMgc2hvdyBhdCBsZWFzdCBvbmUgZGlnaXQgb2YgbWludXRlcy5cbiAgICBtID0gKChoIHx8IGdtID49IDEwKSAmJiBtIDwgMTAgPyAnMCcgKyBtIDogbSkgKyAnOic7XG5cbiAgICAvLyBDaGVjayBpZiBsZWFkaW5nIHplcm8gaXMgbmVlZCBmb3Igc2Vjb25kc1xuICAgIHMgPSBzIDwgMTAgPyAnMCcgKyBzIDogcztcblxuICAgIHJldHVybiBoICsgbSArIHMgKyBtcztcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZvcm1hdFRpbWU7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG4vKipcbiAqIEBmaWxlIGxvZy5qc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cblxudmFyIEVSUk9SID0gJ2Vycm9yJztcbnZhciBXQVJOID0gJ3dhcm4nO1xuXG4vKipcbiAqIExvZyBtZXNzYWdlIChpZiB0aGUgZGVidWcgb3B0aW9uIGlzIGVuYWJsZWQpLlxuICovXG52YXIgbG9nID0gZnVuY3Rpb24gbG9nKGFyZ3MsIGxvZ1R5cGUsIGRlYnVnKSB7XG4gICAgaWYgKGRlYnVnID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChsb2dUeXBlID09PSBFUlJPUikge1xuICAgICAgICAgICAgdmlkZW9qcy5sb2cuZXJyb3IoYXJncyk7XG4gICAgICAgIH0gZWxzZSBpZiAobG9nVHlwZSA9PT0gV0FSTikge1xuICAgICAgICAgICAgdmlkZW9qcy5sb2cud2FybihhcmdzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZpZGVvanMubG9nKGFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gbG9nOyIsInZhciB3aW47XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgd2luID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgd2luID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgd2luID0gc2VsZjtcbn0gZWxzZSB7XG4gICAgd2luID0ge307XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2luO1xuIl19
