/**
 * videojs-wavesurfer
 * @version 2.0.2
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
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _log2 = require('./utils/log');

var _log3 = _interopRequireDefault(_log2);

var _formatTime = require('./utils/format-time');

var _formatTime2 = _interopRequireDefault(_formatTime);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

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


Wavesurfer.VERSION = '2.0.2';

// register plugin
_video2.default.Wavesurfer = Wavesurfer;
_video2.default.registerPlugin('wavesurfer', Wavesurfer);

module.exports = {
    Wavesurfer: Wavesurfer
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./defaults":1,"./utils/format-time":2,"./utils/log":3,"global/window":4}]},{},[5])(5)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczUvZGVmYXVsdHMuanMiLCJlczUvdXRpbHMvZm9ybWF0LXRpbWUuanMiLCJlczUvdXRpbHMvbG9nLmpzIiwibm9kZV9tb2R1bGVzL2dsb2JhbC93aW5kb3cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbi8qKlxuICogQGZpbGUgZGVmYXVsdHMuanNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5cbi8vIHBsdWdpbiBkZWZhdWx0c1xudmFyIHBsdWdpbkRlZmF1bHRPcHRpb25zID0ge1xuICAgIC8vIERpc3BsYXkgY29uc29sZSBsb2cgbWVzc2FnZXMuXG4gICAgZGVidWc6IGZhbHNlLFxuICAgIC8vIG1zRGlzcGxheU1heCBpbmRpY2F0ZXMgdGhlIG51bWJlciBvZiBzZWNvbmRzIHRoYXQgaXNcbiAgICAvLyBjb25zaWRlcmVkIHRoZSBib3VuZGFyeSB2YWx1ZSBmb3IgZGlzcGxheWluZyBtaWxsaXNlY29uZHNcbiAgICAvLyBpbiB0aGUgdGltZSBjb250cm9scy4gQW4gYXVkaW8gY2xpcCB3aXRoIGEgdG90YWwgbGVuZ3RoIG9mXG4gICAgLy8gMiBzZWNvbmRzIGFuZCBhIG1zRGlzcGxheU1heCBvZiAzIHdpbGwgdXNlIHRoZSBmb3JtYXRcbiAgICAvLyBNOlNTOk1NTS4gQ2xpcHMgbG9uZ2VyIHRoYW4gbXNEaXNwbGF5TWF4IHdpbGwgYmUgZGlzcGxheWVkXG4gICAgLy8gYXMgTTpTUyBvciBISDpNTTpTUy5cbiAgICBtc0Rpc3BsYXlNYXg6IDNcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHBsdWdpbkRlZmF1bHRPcHRpb25zOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuLyoqXG4gKiBAZmlsZSBmb3JtYXQtdGltZS5qc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cblxuLyoqXG4gKiBGb3JtYXQgc2Vjb25kcyBhcyBhIHRpbWUgc3RyaW5nLCBIOk1NOlNTLCBNOlNTIG9yIE06U1M6TU1NLlxuICpcbiAqIFN1cHBseWluZyBhIGd1aWRlIChpbiBzZWNvbmRzKSB3aWxsIGZvcmNlIGEgbnVtYmVyIG9mIGxlYWRpbmcgemVyb3NcbiAqIHRvIGNvdmVyIHRoZSBsZW5ndGggb2YgdGhlIGd1aWRlLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBzZWNvbmRzIC0gTnVtYmVyIG9mIHNlY29uZHMgdG8gYmUgdHVybmVkIGludG8gYVxuICogICAgIHN0cmluZy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBndWlkZSAtIE51bWJlciAoaW4gc2Vjb25kcykgdG8gbW9kZWwgdGhlIHN0cmluZ1xuICogICAgIGFmdGVyLlxuICogQHBhcmFtIHtudW1iZXJ9IG1zRGlzcGxheU1heCAtIE51bWJlciAoaW4gbWlsbGlzZWNvbmRzKSB0byBtb2RlbCB0aGUgc3RyaW5nXG4gKiAgICAgYWZ0ZXIuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRpbWUgZm9ybWF0dGVkIGFzIEg6TU06U1MsIE06U1Mgb3IgTTpTUzpNTU0sIGUuZy5cbiAqICAgICAwOjAwOjEyLlxuICogQHByaXZhdGVcbiAqL1xudmFyIGZvcm1hdFRpbWUgPSBmdW5jdGlvbiBmb3JtYXRUaW1lKHNlY29uZHMsIGd1aWRlLCBtc0Rpc3BsYXlNYXgpIHtcbiAgICAvLyBEZWZhdWx0IHRvIHVzaW5nIHNlY29uZHMgYXMgZ3VpZGVcbiAgICBzZWNvbmRzID0gc2Vjb25kcyA8IDAgPyAwIDogc2Vjb25kcztcbiAgICBndWlkZSA9IGd1aWRlIHx8IHNlY29uZHM7XG4gICAgdmFyIHMgPSBNYXRoLmZsb29yKHNlY29uZHMgJSA2MCksXG4gICAgICAgIG0gPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCAlIDYwKSxcbiAgICAgICAgaCA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDM2MDApLFxuICAgICAgICBnbSA9IE1hdGguZmxvb3IoZ3VpZGUgLyA2MCAlIDYwKSxcbiAgICAgICAgZ2ggPSBNYXRoLmZsb29yKGd1aWRlIC8gMzYwMCksXG4gICAgICAgIG1zID0gTWF0aC5mbG9vcigoc2Vjb25kcyAtIHMpICogMTAwMCk7XG5cbiAgICAvLyBoYW5kbGUgaW52YWxpZCB0aW1lc1xuICAgIGlmIChpc05hTihzZWNvbmRzKSB8fCBzZWNvbmRzID09PSBJbmZpbml0eSkge1xuICAgICAgICAvLyAnLScgaXMgZmFsc2UgZm9yIGFsbCByZWxhdGlvbmFsIG9wZXJhdG9ycyAoZS5nLiA8LCA+PSkgc28gdGhpc1xuICAgICAgICAvLyBzZXR0aW5nIHdpbGwgYWRkIHRoZSBtaW5pbXVtIG51bWJlciBvZiBmaWVsZHMgc3BlY2lmaWVkIGJ5IHRoZVxuICAgICAgICAvLyBndWlkZVxuICAgICAgICBoID0gbSA9IHMgPSBtcyA9ICctJztcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiB3ZSBuZWVkIHRvIHNob3cgbWlsbGlzZWNvbmRzXG4gICAgaWYgKGd1aWRlID4gMCAmJiBndWlkZSA8IG1zRGlzcGxheU1heCkge1xuICAgICAgICBpZiAobXMgPCAxMDApIHtcbiAgICAgICAgICAgIGlmIChtcyA8IDEwKSB7XG4gICAgICAgICAgICAgICAgbXMgPSAnMDAnICsgbXM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1zID0gJzAnICsgbXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbXMgPSAnOicgKyBtcztcbiAgICB9IGVsc2Uge1xuICAgICAgICBtcyA9ICcnO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIHdlIG5lZWQgdG8gc2hvdyBob3Vyc1xuICAgIGggPSBoID4gMCB8fCBnaCA+IDAgPyBoICsgJzonIDogJyc7XG5cbiAgICAvLyBJZiBob3VycyBhcmUgc2hvd2luZywgd2UgbWF5IG5lZWQgdG8gYWRkIGEgbGVhZGluZyB6ZXJvLlxuICAgIC8vIEFsd2F5cyBzaG93IGF0IGxlYXN0IG9uZSBkaWdpdCBvZiBtaW51dGVzLlxuICAgIG0gPSAoKGggfHwgZ20gPj0gMTApICYmIG0gPCAxMCA/ICcwJyArIG0gOiBtKSArICc6JztcblxuICAgIC8vIENoZWNrIGlmIGxlYWRpbmcgemVybyBpcyBuZWVkIGZvciBzZWNvbmRzXG4gICAgcyA9IHMgPCAxMCA/ICcwJyArIHMgOiBzO1xuXG4gICAgcmV0dXJuIGggKyBtICsgcyArIG1zO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZm9ybWF0VGltZTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbi8qKlxuICogQGZpbGUgbG9nLmpzXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuXG52YXIgRVJST1IgPSAnZXJyb3InO1xudmFyIFdBUk4gPSAnd2Fybic7XG5cbi8qKlxuICogTG9nIG1lc3NhZ2UgKGlmIHRoZSBkZWJ1ZyBvcHRpb24gaXMgZW5hYmxlZCkuXG4gKi9cbnZhciBsb2cgPSBmdW5jdGlvbiBsb2coYXJncywgbG9nVHlwZSwgZGVidWcpIHtcbiAgICBpZiAoZGVidWcgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKGxvZ1R5cGUgPT09IEVSUk9SKSB7XG4gICAgICAgICAgICB2aWRlb2pzLmxvZy5lcnJvcihhcmdzKTtcbiAgICAgICAgfSBlbHNlIGlmIChsb2dUeXBlID09PSBXQVJOKSB7XG4gICAgICAgICAgICB2aWRlb2pzLmxvZy53YXJuKGFyZ3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmlkZW9qcy5sb2coYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBsb2c7IiwidmFyIHdpbjtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB3aW4gPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB3aW4gPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKXtcbiAgICB3aW4gPSBzZWxmO1xufSBlbHNlIHtcbiAgICB3aW4gPSB7fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3aW47XG4iXX0=
