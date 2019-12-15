/*!
 * wavesurfer.js 2.0.5 (Sun Mar 04 2018 20:09:58 GMT+0100 (CET))
 * https://github.com/katspaugh/wavesurfer.js
 * @license BSD-3-Clause
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("microphone", [], factory);
	else if(typeof exports === 'object')
		exports["microphone"] = factory();
	else
		root["WaveSurfer"] = root["WaveSurfer"] || {}, root["WaveSurfer"]["microphone"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	__webpack_require__.p = "localhost:8080/dist/plugin/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @typedef {Object} MicrophonePluginParams
 * @property {MediaStreamConstraints} constraints The constraints parameter is a
 * MediaStreamConstaints object with two members: video and audio, describing
 * the media types requested. Either or both must be specified.
 * @property {number} bufferSize=4096 The buffer size in units of sample-frames.
 * If specified, the bufferSize must be one of the following values: `256`,
 * `512`, `1024`, `2048`, `4096`, `8192`, `16384`
 * @property {number} numberOfInputChannels=1 Integer specifying the number of
 * channels for this node's input. Values of up to 32 are supported.
 * @property {?boolean} deferInit Set to true to manually call
 * `initPlugin('microphone')`
 */

/**
 * Visualise microphone input in a wavesurfer instance.
 *
 * @implements {PluginClass}
 * @extends {Observer}
 * @example
 * // es6
 * import MicrophonePlugin from 'wavesurfer.microphone.js';
 *
 * // commonjs
 * var MicrophonePlugin = require('wavesurfer.microphone.js');
 *
 * // if you are using <script> tags
 * var MicrophonePlugin = window.WaveSurfer.microphone;
 *
 * // ... initialising wavesurfer with the plugin
 * var wavesurfer = WaveSurfer.create({
 *   // wavesurfer options ...
 *   plugins: [
 *     MicrophonePlugin.create({
 *       // plugin options ...
 *     })
 *   ]
 * });
 */
var MicrophonePlugin = function () {
    _createClass(MicrophonePlugin, null, [{
        key: 'create',

        /**
         * Microphone plugin definition factory
         *
         * This function must be used to create a plugin definition which can be
         * used by wavesurfer to correctly instantiate the plugin.
         *
         * @param  {MicrophonePluginParams} params parameters use to initialise the plugin
         * @return {PluginDefinition} an object representing the plugin
         */
        value: function create(params) {
            return {
                name: 'microphone',
                deferInit: params && params.deferInit ? params.deferInit : false,
                params: params,
                instance: MicrophonePlugin
            };
        }
    }]);

    function MicrophonePlugin(params, ws) {
        var _this = this;

        _classCallCheck(this, MicrophonePlugin);

        this.params = params;
        this.wavesurfer = ws;

        this.active = false;
        this.paused = false;
        this.reloadBufferFunction = function (e) {
            return _this.reloadBuffer(e);
        };

        // cross-browser getUserMedia
        var promisifiedOldGUM = function promisifiedOldGUM(constraints, successCallback, errorCallback) {
            // get ahold of getUserMedia, if present
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            // Some browsers just don't implement it - return a rejected
            // promise with an error to keep a consistent interface
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            // otherwise, wrap the call to the old navigator.getUserMedia with
            // a Promise
            return new Promise(function (successCallback, errorCallback) {
                getUserMedia.call(navigator, constraints, successCallback, errorCallback);
            });
        };
        // Older browsers might not implement mediaDevices at all, so we set an
        // empty object first
        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
        }
        // Some browsers partially implement mediaDevices. We can't just assign
        // an object with getUserMedia as it would overwrite existing
        // properties. Here, we will just add the getUserMedia property if it's
        // missing.
        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = promisifiedOldGUM;
        }
        this.constraints = this.params.constraints || {
            video: false,
            audio: true
        };
        this.bufferSize = this.params.bufferSize || 4096;
        this.numberOfInputChannels = this.params.numberOfInputChannels || 1;
        this.numberOfOutputChannels = this.params.numberOfOutputChannels || 1;

        this._onBackendCreated = function () {
            // wavesurfer's AudioContext where we'll route the mic signal to
            _this.micContext = _this.wavesurfer.backend.getAudioContext();
        };
    }

    _createClass(MicrophonePlugin, [{
        key: 'init',
        value: function init() {
            this.wavesurfer.on('backend-created', this._onBackendCreated);
            if (this.wavesurfer.backend) {
                this._onBackendCreated();
            }
        }

        /**
         * Destroy the microphone plugin.
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            // make sure the buffer is not redrawn during
            // cleanup and demolition of this plugin.
            this.paused = true;

            this.wavesurfer.un('backend-created', this._onBackendCreated);
            this.stop();
        }

        /**
         * Allow user to select audio input device, eg. microphone, and
         * start the visualization.
         */

    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            navigator.mediaDevices.getUserMedia(this.constraints).then(function (data) {
                return _this2.gotStream(data);
            }).catch(function (data) {
                return _this2.deviceError(data);
            });
        }

        /**
         * Pause/resume visualization.
         */

    }, {
        key: 'togglePlay',
        value: function togglePlay() {
            if (!this.active) {
                // start it first
                this.start();
            } else {
                // toggle paused
                this.paused = !this.paused;

                if (this.paused) {
                    this.pause();
                } else {
                    this.play();
                }
            }
        }

        /**
         * Play visualization.
         */

    }, {
        key: 'play',
        value: function play() {
            this.paused = false;

            this.connect();
        }

        /**
         * Pause visualization.
         */

    }, {
        key: 'pause',
        value: function pause() {
            this.paused = true;

            // disconnect sources so they can be used elsewhere
            // (eg. during audio playback)
            this.disconnect();
        }

        /**
         * Stop the device stream and remove any remaining waveform drawing from
         * the wavesurfer canvas.
         */

    }, {
        key: 'stop',
        value: function stop() {
            if (this.active) {
                // stop visualization and device
                this.stopDevice();

                // empty last frame
                this.wavesurfer.empty();
            }
        }

        /**
         * Stop the device and the visualization.
         */

    }, {
        key: 'stopDevice',
        value: function stopDevice() {
            this.active = false;

            // stop visualization
            this.disconnect();

            // stop stream from device
            if (this.stream) {
                var result = this.detectBrowser();
                // MediaStream.stop is deprecated since:
                // - Firefox 44 (https://www.fxsitecompat.com/en-US/docs/2015/mediastream-stop-has-been-deprecated/)
                // - Chrome 45 (https://developers.google.com/web/updates/2015/07/mediastream-deprecations)
                if (result.browser === 'chrome' && result.version >= 45 || result.browser === 'firefox' && result.version >= 44 || result.browser === 'edge') {
                    if (this.stream.getTracks) {
                        // note that this should not be a call
                        this.stream.getTracks().forEach(function (stream) {
                            return stream.stop();
                        });
                        return;
                    }
                }

                this.stream.stop();
            }
        }

        /**
         * Connect the media sources that feed the visualization.
         */

    }, {
        key: 'connect',
        value: function connect() {
            if (this.stream !== undefined) {
                // Create an AudioNode from the stream.
                this.mediaStreamSource = this.micContext.createMediaStreamSource(this.stream);

                this.levelChecker = this.micContext.createScriptProcessor(this.bufferSize, this.numberOfInputChannels, this.numberOfOutputChannels);
                this.mediaStreamSource.connect(this.levelChecker);

                this.levelChecker.connect(this.micContext.destination);
                this.levelChecker.onaudioprocess = this.reloadBufferFunction;
            }
        }

        /**
         * Disconnect the media sources that feed the visualization.
         */

    }, {
        key: 'disconnect',
        value: function disconnect() {
            if (this.mediaStreamSource !== undefined) {
                this.mediaStreamSource.disconnect();
            }

            if (this.levelChecker !== undefined) {
                this.levelChecker.disconnect();
                this.levelChecker.onaudioprocess = undefined;
            }
        }

        /**
         * Redraw the waveform.
         */

    }, {
        key: 'reloadBuffer',
        value: function reloadBuffer(event) {
            if (!this.paused) {
                this.wavesurfer.empty();
                this.wavesurfer.loadDecodedBuffer(event.inputBuffer);
            }
        }

        /**
         * Audio input device is ready.
         *
         * @param {LocalMediaStream} stream The microphone's media stream.
         */

    }, {
        key: 'gotStream',
        value: function gotStream(stream) {
            this.stream = stream;
            this.active = true;

            // start visualization
            this.play();

            // notify listeners
            this.fireEvent('deviceReady', stream);
        }

        /**
         * Device error callback.
         */

    }, {
        key: 'deviceError',
        value: function deviceError(code) {
            // notify listeners
            this.fireEvent('deviceError', code);
        }

        /**
         * Extract browser version out of the provided user agent string.
         * @param {!string} uastring userAgent string.
         * @param {!string} expr Regular expression used as match criteria.
         * @param {!number} pos position in the version string to be returned.
         * @return {!number} browser version.
         */

    }, {
        key: 'extractVersion',
        value: function extractVersion(uastring, expr, pos) {
            var match = uastring.match(expr);
            return match && match.length >= pos && parseInt(match[pos], 10);
        }

        /**
         * Browser detector.
         * @return {object} result containing browser, version and minVersion
         *     properties.
         */

    }, {
        key: 'detectBrowser',
        value: function detectBrowser() {
            // Returned result object.
            var result = {};
            result.browser = null;
            result.version = null;
            result.minVersion = null;

            // Non supported browser.
            if (typeof window === 'undefined' || !window.navigator) {
                result.browser = 'Not a supported browser.';
                return result;
            }

            // Firefox.
            if (navigator.mozGetUserMedia) {
                result.browser = 'firefox';
                result.version = this.extractVersion(navigator.userAgent, /Firefox\/([0-9]+)\./, 1);
                result.minVersion = 31;
                return result;
            }

            // Chrome/Chromium/Webview.
            if (navigator.webkitGetUserMedia && window.webkitRTCPeerConnection) {
                result.browser = 'chrome';
                result.version = this.extractVersion(navigator.userAgent, /Chrom(e|ium)\/([0-9]+)\./, 2);
                result.minVersion = 38;
                return result;
            }

            // Edge.
            if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
                result.browser = 'edge';
                result.version = this.extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
                result.minVersion = 10547;
                return result;
            }

            // Non supported browser default.
            result.browser = 'Not a supported browser.';
            return result;
        }
    }]);

    return MicrophonePlugin;
}();

exports.default = MicrophonePlugin;
module.exports = exports['default'];

/***/ })

/******/ });
});
//# sourceMappingURL=wavesurfer.microphone.js.map