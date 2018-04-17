/*!
 * videojs-wavesurfer
 * @version 2.3.0
 * @see https://github.com/collab-project/videojs-wavesurfer
 * @copyright 2014-2018 Collab
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("videojs"), require("WaveSurfer"));
	else if(typeof define === 'function' && define.amd)
		define("VideojsWavesurfer", ["videojs", "WaveSurfer"], factory);
	else if(typeof exports === 'object')
		exports["VideojsWavesurfer"] = factory(require("videojs"), require("WaveSurfer"));
	else
		root["VideojsWavesurfer"] = factory(root["videojs"], root["WaveSurfer"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _log2 = __webpack_require__(1);

var _log3 = _interopRequireDefault(_log2);

var _formatTime = __webpack_require__(2);

var _formatTime2 = _interopRequireDefault(_formatTime);

var _defaults = __webpack_require__(3);

var _defaults2 = _interopRequireDefault(_defaults);

var _tech = __webpack_require__(4);

var _tech2 = _interopRequireDefault(_tech);

var _window = __webpack_require__(5);

var _window2 = _interopRequireDefault(_window);

var _video = __webpack_require__(7);

var _video2 = _interopRequireDefault(_video);

var _wavesurfer = __webpack_require__(8);

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
            // setup tech
            this.player.tech_.setActivePlayer(this.player);

            // hide big play button
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

            // make sure volume is muted when requested
            if (this.player.muted()) {
                this.setVolume(0);
            }

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
            if (this.surfer) {
                if (this.liveMode && this.surfer.microphone) {
                    // destroy microphone plugin
                    this.surfer.microphone.destroy();
                    this.log('Destroyed microphone plugin');
                }
                // destroy wavesurfer instance
                this.surfer.destroy();
            }
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

// version nr is injected during build


Wavesurfer.VERSION = "2.3.0";

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

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
module.exports = exports["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=videojs.wavesurfer.js.map