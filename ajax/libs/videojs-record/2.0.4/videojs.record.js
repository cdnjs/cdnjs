/**
 * videojs-record
 * @version 2.0.4
 * @see https://github.com/collab-project/videojs-record
 * @copyright 2014-2017 Collab
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.videojs || (g.videojs = {})).record = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
 * @file animation-display.js
 * @since 2.0.0
 */

var Component = videojs.getComponent('Component');

/**
 * Image for displaying animated GIF image.
 *
 * @class
 * @augments videojs.Component
*/

var AnimationDisplay = function (_Component) {
  _inherits(AnimationDisplay, _Component);

  function AnimationDisplay() {
    _classCallCheck(this, AnimationDisplay);

    return _possibleConstructorReturn(this, (AnimationDisplay.__proto__ || Object.getPrototypeOf(AnimationDisplay)).apply(this, arguments));
  }

  _createClass(AnimationDisplay, [{
    key: 'createEl',


    /**
     * Create the `AnimationDisplay`s DOM element.
     *
     * @return {Element}
     *         The dom element that gets created.
     */
    value: function createEl() {
      return _get(AnimationDisplay.prototype.__proto__ || Object.getPrototypeOf(AnimationDisplay.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-animation-display',
        innerHTML: '<img />'
      });
    }
  }]);

  return AnimationDisplay;
}(Component);

Component.registerComponent('AnimationDisplay', AnimationDisplay);

exports.default = AnimationDisplay;
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @file camera-button.js
 * @since 2.0.0
 */

var Button = videojs.getComponent('Button');
var Component = videojs.getComponent('Component');

/**
 * Button to toggle between create and retry snapshot image.
 *
 * @class
 * @augments videojs.Button
*/

var CameraButton = function (_Button) {
  _inherits(CameraButton, _Button);

  /**
   * The constructor function for the class.
   *
   * @private
   * @param {(videojs.Player|Object)} player - Video.js player instance.
   * @param {Object} options - Player options.
   */
  function CameraButton(player, options) {
    _classCallCheck(this, CameraButton);

    var _this = _possibleConstructorReturn(this, (CameraButton.__proto__ || Object.getPrototypeOf(CameraButton)).call(this, player, options));

    _this.on('click', _this.onClick);
    _this.on('tap', _this.onClick);
    _this.on(player, 'startRecord', _this.onStart);
    _this.on(player, 'stopRecord', _this.onStop);
    return _this;
  }

  /**
   * Builds the default DOM `className`.
   *
   * @return {string}
   *         The DOM `className` for this object.
   */


  _createClass(CameraButton, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-camera-button vjs-control vjs-icon-photo-camera';
    }

    /**
     * This gets called when the button is clicked.
     *
     * @param {EventTarget~Event} event
     *        The `tap` or `click` event that caused this function to be
     *        called.
     *
     * @listens tap
     * @listens click
     */

  }, {
    key: 'onClick',
    value: function onClick(event) {
      var recorder = this.player_.record();

      if (!recorder.isProcessing()) {
        // create snapshot
        recorder.start();
      } else {
        // retry
        recorder.retrySnapshot();

        // reset camera button
        this.onStop();
      }
    }

    /**
     * Add the vjs-icon-replay class to the element so it can change appearance.
     *
     * @param {EventTarget~Event} [event]
     *        The event that caused this function to run.
     *
     * @listens Player#startRecord
     */

  }, {
    key: 'onStart',
    value: function onStart(event) {
      // replace element class so it can change appearance
      this.removeClass('vjs-icon-photo-camera');
      this.addClass('vjs-icon-replay');

      // change the button text
      this.controlText('Retry');
    }

    /**
     * Add the vjs-icon-photo-camera class to the element so it can change appearance.
     *
     * @param {EventTarget~Event} [event]
     *        The event that caused this function to run.
     *
     * @listens Player#stopRecord
     */

  }, {
    key: 'onStop',
    value: function onStop(event) {
      // replace element class so it can change appearance
      this.removeClass('vjs-icon-replay');
      this.addClass('vjs-icon-photo-camera');

      // change the button text
      this.controlText('Image');
    }
  }]);

  return CameraButton;
}(Button);

/**
 * The text that should display over the `CameraButton`s controls. Added for localization.
 *
 * @type {string}
 * @private
 */


CameraButton.prototype.controlText_ = 'Image';

Component.registerComponent('CameraButton', CameraButton);

exports.default = CameraButton;
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @file device-button.js
 * @since 2.0.0
 */

var Button = videojs.getComponent('Button');
var Component = videojs.getComponent('Component');

/**
 * Button to select recording device.
 *
 * @class
 * @augments videojs.Button
*/

var DeviceButton = function (_Button) {
  _inherits(DeviceButton, _Button);

  /**
   * The constructor function for the class.
   *
   * @private
   * @param {(videojs.Player|Object)} player - Video.js player instance.
   * @param {Object} options - Player options.
   */
  function DeviceButton(player, options) {
    _classCallCheck(this, DeviceButton);

    var _this = _possibleConstructorReturn(this, (DeviceButton.__proto__ || Object.getPrototypeOf(DeviceButton)).call(this, player, options));

    _this.on('click', _this.onClick);
    _this.on('tap', _this.onClick);
    return _this;
  }

  /**
   * This gets called when the button is clicked.
   *
   * @param {EventTarget~Event} event
   *        The `tap` or `click` event that caused this function to be
   *        called.
   *
   * @listens tap
   * @listens click
   */


  _createClass(DeviceButton, [{
    key: 'onClick',
    value: function onClick(event) {
      // open device dialog
      this.player_.record().getDevice();
    }
  }]);

  return DeviceButton;
}(Button);

/**
 * The text that should display over the `DeviceButton`s controls. Added for localization.
 *
 * @type {string}
 * @private
 */


DeviceButton.prototype.controlText_ = 'Device';

Component.registerComponent('DeviceButton', DeviceButton);

exports.default = DeviceButton;
},{}],4:[function(require,module,exports){
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
 * @file record-canvas
 * @since 2.0.0
 */

var Component = videojs.getComponent('Component');

/**
 * Canvas for displaying snapshot image.
 *
 * @class
 * @augments videojs.Component
*/

var RecordCanvas = function (_Component) {
  _inherits(RecordCanvas, _Component);

  function RecordCanvas() {
    _classCallCheck(this, RecordCanvas);

    return _possibleConstructorReturn(this, (RecordCanvas.__proto__ || Object.getPrototypeOf(RecordCanvas)).apply(this, arguments));
  }

  _createClass(RecordCanvas, [{
    key: 'createEl',


    /**
     * Create the `RecordCanvas`s DOM element.
     *
     * @return {Element}
     *         The dom element that gets created.
     */
    value: function createEl() {
      return _get(RecordCanvas.prototype.__proto__ || Object.getPrototypeOf(RecordCanvas.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-record-canvas',
        innerHTML: '<canvas></canvas>'
      });
    }
  }]);

  return RecordCanvas;
}(Component);

Component.registerComponent('RecordCanvas', RecordCanvas);

exports.default = RecordCanvas;
},{}],5:[function(require,module,exports){
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
 * @file record-indicator.js
 * @since 2.0.0
 */

var Component = videojs.getComponent('Component');

/**
 * Icon indicating recording is active.
 *
 * @class
 * @augments videojs.Component
*/

var RecordIndicator = function (_Component) {
  _inherits(RecordIndicator, _Component);

  /**
   * The constructor function for the class.
   *
   * @private
   * @param {(videojs.Player|Object)} player - Video.js player instance.
   * @param {Object} options - Player options.
   */
  function RecordIndicator(player, options) {
    _classCallCheck(this, RecordIndicator);

    var _this = _possibleConstructorReturn(this, (RecordIndicator.__proto__ || Object.getPrototypeOf(RecordIndicator)).call(this, player, options));

    _this.on(player, 'startRecord', _this.show);
    _this.on(player, 'stopRecord', _this.hide);
    return _this;
  }

  /**
   * Create the `RecordIndicator`s DOM element.
   *
   * @return {Element}
   *         The dom element that gets created.
   */


  _createClass(RecordIndicator, [{
    key: 'createEl',
    value: function createEl() {
      return _get(RecordIndicator.prototype.__proto__ || Object.getPrototypeOf(RecordIndicator.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-record-indicator vjs-control',
        dir: 'ltr'
      });
    }

    /**
     * Disable event handlers.
     */

  }, {
    key: 'disable',
    value: function disable() {
      this.off(this.player_, 'startRecord', this.show);
      this.off(this.player_, 'stopRecord', this.hide);
    }
  }]);

  return RecordIndicator;
}(Component);

Component.registerComponent('RecordIndicator', RecordIndicator);

exports.default = RecordIndicator;
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @file record-toggle.js
 * @since 2.0.0
 */

var Button = videojs.getComponent('Button');
var Component = videojs.getComponent('Component');

/**
 * Button to toggle between start and stop recording.
 *
 * @class
 * @augments videojs.Button
*/

var RecordToggle = function (_Button) {
  _inherits(RecordToggle, _Button);

  /**
   * The constructor function for the class.
   *
   * @private
   * @param {(videojs.Player|Object)} player - Video.js player instance.
   * @param {Object} options - Player options.
   */
  function RecordToggle(player, options) {
    _classCallCheck(this, RecordToggle);

    var _this = _possibleConstructorReturn(this, (RecordToggle.__proto__ || Object.getPrototypeOf(RecordToggle)).call(this, player, options));

    _this.on('click', _this.onClick);
    _this.on('tap', _this.onClick);
    _this.on(player, 'startRecord', _this.onStart);
    _this.on(player, 'stopRecord', _this.onStop);
    return _this;
  }

  /**
   * Builds the default DOM `className`.
   *
   * @return {string}
   *         The DOM `className` for this object.
   */


  _createClass(RecordToggle, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-record-button vjs-control vjs-icon-record-start';
    }

    /**
     * This gets called when the button is clicked.
     *
     * @param {EventTarget~Event} event
     *        The `tap` or `click` event that caused this function to be
     *        called.
     *
     * @listens tap
     * @listens click
     */

  }, {
    key: 'onClick',
    value: function onClick(event) {
      var recorder = this.player_.record();
      if (!recorder.isRecording()) {
        recorder.start();
      } else {
        recorder.stop();
      }
    }

    /**
     * Add the vjs-icon-record-stop class to the element so it can change appearance.
     *
     * @param {EventTarget~Event} [event]
     *        The event that caused this function to run.
     *
     * @listens Player#startRecord
     */

  }, {
    key: 'onStart',
    value: function onStart(event) {
      // replace element class so it can change appearance
      this.removeClass('vjs-icon-record-start');
      this.addClass('vjs-icon-record-stop');

      // change the button text
      this.controlText('Stop');
    }

    /**
     * Add the vjs-icon-record-start class to the element so it can change appearance.
     *
     * @param {EventTarget~Event} [event]
     *        The event that caused this function to run.
     *
     * @listens Player#stopRecord
     */

  }, {
    key: 'onStop',
    value: function onStop(event) {
      // replace element class so it can change appearance
      this.removeClass('vjs-icon-record-stop');
      this.addClass('vjs-icon-record-start');

      // change the button text
      this.controlText('Record');
    }
  }]);

  return RecordToggle;
}(Button);

/**
 * The text that should display over the `RecordToggle`s controls. Added for localization.
 *
 * @type {string}
 * @private
 */


RecordToggle.prototype.controlText_ = 'Record';

Component.registerComponent('RecordToggle', RecordToggle);

exports.default = RecordToggle;
},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @file defaults.js
 * @since 2.0.0
 */

//plugin defaults
var pluginDefaultOptions = {
    // Single snapshot image.
    image: false,
    // Include audio in the recorded clip.
    audio: false,
    // Include video in the recorded clip.
    video: false,
    // Animated GIF.
    animation: false,
    // Maximum length of the recorded clip.
    maxLength: 10,
    // Width of the recorded video frames.
    frameWidth: 320,
    // Height of the recorded video frames.
    frameHeight: 240,
    // Enables console logging for debugging purposes.
    debug: false,
    // The mime type for the video recorder. Default to 'video/webm'.
    // Use 'video/mp4' (Firefox) or 'video/webm;codecs=H264' (Chrome 52 and
    // newer) for MP4.
    videoMimeType: 'video/webm',
    // Video recorder type to use. This allows you to specify an alternative
    // recorder class, e.g. WhammyRecorder. Defaults to 'auto' which let's
    // recordrtc specify the best available recorder type.
    videoRecorderType: 'auto',
    // Audio recording library to use. Legal values are 'recordrtc',
    // 'libvorbis.js', 'opus-recorder', 'lamejs' and 'recorder.js'.
    audioEngine: 'recordrtc',
    // Audio recorder type to use. This allows you to specify an alternative
    // recorder class, e.g. StereoAudioRecorder. Defaults to 'auto' which let's
    // recordrtc specify the best available recorder type. Currently this
    // setting is only used with the 'recordrtc' audioEngine.
    audioRecorderType: 'auto',
    // The mime type for the audio recorder. Defaults to 'auto' which will pick
    // the best option available in the browser (e.g. either 'audio/wav',
    // 'audio/ogg' or 'audio/webm').
    audioMimeType: 'auto',
    // The size of the audio buffer (in sample-frames) which needs to
    // be processed each time onprocessaudio is called.
    // From the spec: This value controls how frequently the audioprocess event is
    // dispatched and how many sample-frames need to be processed each call.
    // Lower values for buffer size will result in a lower (better) latency.
    // Higher values will be necessary to avoid audio breakup and glitches.
    // Legal values are 256, 512, 1024, 2048, 4096, 8192 or 16384.
    audioBufferSize: 4096,
    // The audio sample rate (in sample-frames per second) at which the
    // AudioContext handles audio. It is assumed that all AudioNodes
    // in the context run at this rate. In making this assumption,
    // sample-rate converters or "varispeed" processors are not supported
    // in real-time processing.
    // The sampleRate parameter describes the sample-rate of the
    // linear PCM audio data in the buffer in sample-frames per second.
    // An implementation must support sample-rates in at least
    // the range 22050 to 96000.
    audioSampleRate: 44100,
    // Allows you to record single-channel audio, which can reduce the
    // filesize.
    audioChannels: 2,
    // URL for the audio worker.
    audioWorkerURL: '',
    // Frame rate in frames per second.
    animationFrameRate: 200,
    // Sets quality of color quantization (conversion of images to the
    // maximum 256 colors allowed by the GIF specification).
    // Lower values (minimum = 1) produce better colors,
    // but slow processing significantly. 10 is the default,
    // and produces good color mapping at reasonable speeds.
    // Values greater than 20 do not yield significant improvements
    // in speed.
    animationQuality: 10,
    // Accepts numbers in milliseconds; use this to force intervals-based blobs.
    timeSlice: 0
};

exports.default = pluginDefaultOptions;
},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @file record-engine.js
 * @since 2.0.0
 */

var Component = videojs.getComponent('Component');

// supported recorder plugin engines
var RECORDRTC = 'recordrtc';
var LIBVORBISJS = 'libvorbis.js';
var RECORDERJS = 'recorder.js';
var LAMEJS = 'lamejs';
var OPUSRECORDER = 'opus-recorder';

/**
 * Base class for recorder backends.
 * @class
 * @augments videojs.Component
 */

var RecordEngine = function (_Component) {
    _inherits(RecordEngine, _Component);

    function RecordEngine() {
        _classCallCheck(this, RecordEngine);

        return _possibleConstructorReturn(this, (RecordEngine.__proto__ || Object.getPrototypeOf(RecordEngine)).apply(this, arguments));
    }

    _createClass(RecordEngine, [{
        key: 'dispose',


        /**
         * Remove any temporary data and references to streams.
         * @private
         */
        value: function dispose() {
            // dispose previous recording
            if (this.recordedData !== undefined) {
                URL.revokeObjectURL(this.recordedData);
            }
        }

        /**
         * Add filename and timestamp to recorded file object.
         *
         * @param {(blob|file)} fileObj - Blob or File object.
         */

    }, {
        key: 'addFileInfo',
        value: function addFileInfo(fileObj) {
            var now = new Date();
            fileObj.lastModifiedDate = now;

            // guess extension name from mime type, e.g. audio/ogg, but
            // any extension is valid here. Chrome also accepts extended
            // mime types like video/webm;codecs=h264,vp9,opus
            var fileExtension = '.' + fileObj.type.split('/')[1];
            if (fileExtension.indexOf(';') > -1) {
                fileExtension = fileExtension.split(';')[0];
            }

            // use timestamp in filename, e.g. 1451180941326.ogg
            fileObj.name = now.getTime() + fileExtension;
        }

        /**
         * Invoked when recording is stopped and resulting stream is available.
         *
         * @param {blob} data - Reference to the recorded Blob.
         */

    }, {
        key: 'onStopRecording',
        value: function onStopRecording(data) {
            this.recordedData = data;

            // add filename and timestamp to recorded file object
            this.addFileInfo(this.recordedData);

            // remove reference to recorded stream
            this.dispose();

            // notify listeners
            this.trigger('recordComplete');
        }

        /**
         * Show save as dialog in browser so the user can store the recorded media
         * locally.
         *
         * @param {object} name - Object with names for the particular blob(s)
         *     you want to save. File extensions are added automatically. For
         *     example: {'video': 'name-of-video-file'}. Supported keys are
         *     'audio', 'video' and 'gif'.
         */

    }, {
        key: 'saveAs',
        value: function saveAs(name) {
            var fileName = name[Object.keys(name)[0]];

            if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
                return navigator.msSaveOrOpenBlob(this.recordedData, fileName);
            } else if (typeof navigator.msSaveBlob !== 'undefined') {
                return navigator.msSaveBlob(this.recordedData, fileName);
            }

            var hyperlink = document.createElement('a');
            hyperlink.href = URL.createObjectURL(this.recordedData);
            hyperlink.download = fileName;

            hyperlink.style = 'display:none;opacity:0;color:transparent;';
            (document.body || document.documentElement).appendChild(hyperlink);

            if (typeof hyperlink.click === 'function') {
                hyperlink.click();
            } else {
                hyperlink.target = '_blank';
                hyperlink.dispatchEvent(new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                }));
            }

            URL.revokeObjectURL(hyperlink.href);
        }
    }]);

    return RecordEngine;
}(Component);

// expose component for external plugins


videojs.RecordEngine = RecordEngine;
Component.registerComponent('RecordEngine', RecordEngine);

exports.RecordEngine = RecordEngine;
exports.RECORDRTC = RECORDRTC;
exports.LIBVORBISJS = LIBVORBISJS;
exports.RECORDERJS = RECORDERJS;
exports.LAMEJS = LAMEJS;
exports.OPUSRECORDER = OPUSRECORDER;
},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @file record-mode.js
 * @since 2.0.0
 */

// recorder modes
var IMAGE_ONLY = 'image_only';
var AUDIO_ONLY = 'audio_only';
var VIDEO_ONLY = 'video_only';
var AUDIO_VIDEO = 'audio_video';
var ANIMATION = 'animation';

var getRecorderMode = function getRecorderMode(image, audio, video, animation) {
    if (isModeEnabled(image)) {
        return IMAGE_ONLY;
    } else if (isModeEnabled(animation)) {
        return ANIMATION;
    } else if (isModeEnabled(audio) && !isModeEnabled(video)) {
        return AUDIO_ONLY;
    } else if (isModeEnabled(audio) && isModeEnabled(video)) {
        return AUDIO_VIDEO;
    } else if (!isModeEnabled(audio) && isModeEnabled(video)) {
        return VIDEO_ONLY;
    }
};

/**
 * Return boolean indicating whether mode is enabled or not.
 */
var isModeEnabled = function isModeEnabled(mode) {
    return mode === Object(mode) || mode === true;
};

exports.getRecorderMode = getRecorderMode;
exports.IMAGE_ONLY = IMAGE_ONLY;
exports.AUDIO_ONLY = AUDIO_ONLY;
exports.VIDEO_ONLY = VIDEO_ONLY;
exports.AUDIO_VIDEO = AUDIO_VIDEO;
exports.ANIMATION = ANIMATION;
},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _recordEngine = require('./record-engine');

var _detectBrowser = require('../utils/detect-browser');

var _recordMode = require('./record-mode');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file record-rtc.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @since 2.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Component = videojs.getComponent('Component');

/**
 * Engine used with the MRecordRTC class in the RecordRTC library.
 *
 * @class
 * @augments videojs.RecordEngine
 */

var RecordRTCEngine = function (_RecordEngine) {
    _inherits(RecordRTCEngine, _RecordEngine);

    function RecordRTCEngine() {
        _classCallCheck(this, RecordRTCEngine);

        return _possibleConstructorReturn(this, (RecordRTCEngine.__proto__ || Object.getPrototypeOf(RecordRTCEngine)).apply(this, arguments));
    }

    _createClass(RecordRTCEngine, [{
        key: 'setup',


        /**
         * Setup recording engine.
         */
        value: function setup(stream, mediaType, debug) {
            this.inputStream = stream;
            this.mediaType = mediaType;
            this.debug = debug;

            // setup RecordRTC
            this.engine = new RecordRTC.MRecordRTC();
            this.engine.mediaType = this.mediaType;
            this.engine.disableLogs = !this.debug;
            this.engine.mimeType = this.mimeType;

            // audio settings
            this.engine.bufferSize = this.bufferSize;
            this.engine.sampleRate = this.sampleRate;
            this.engine.numberOfAudioChannels = this.audioChannels;

            // video/canvas settings
            this.engine.video = this.video;
            this.engine.canvas = this.canvas;

            // animated gif settings
            this.engine.quality = this.quality;
            this.engine.frameRate = this.frameRate;
            if (this.onTimeStamp !== undefined) {
                this.engine.timeSlice = this.timeSlice;
                this.engine.onTimeStamp = this.onTimeStamp;
            }

            // connect stream to recording engine
            this.engine.addStream(this.inputStream);
        }

        /**
         * Remove any temporary data and references to streams.
         */

    }, {
        key: 'dispose',
        value: function dispose() {
            _get(RecordRTCEngine.prototype.__proto__ || Object.getPrototypeOf(RecordRTCEngine.prototype), 'dispose', this).call(this);

            if (typeof this.engine.destroy === 'function') {
                this.engine.destroy();
            }
        }

        /**
         * Start recording.
         */

    }, {
        key: 'start',
        value: function start() {
            this.engine.startRecording();
        }

        /**
         * Stop recording. Result will be available async when onStopRecording
         * is called.
         */

    }, {
        key: 'stop',
        value: function stop() {
            this.engine.stopRecording(this.onStopRecording.bind(this));
        }

        /**
         * Pause recording.
         */

    }, {
        key: 'pause',
        value: function pause() {
            this.engine.pauseRecording();
        }

        /**
         * Resume recording.
         */

    }, {
        key: 'resume',
        value: function resume() {
            this.engine.resumeRecording();
        }

        /**
         * Show save as dialog in browser so the user can store the recorded media
         * locally.
         *
         * @param {object} name - Object with names for the particular blob(s)
         *     you want to save. File extensions are added automatically. For
         *     example: {'video': 'name-of-video-file'}. Supported keys are
         *     'audio', 'video' and 'gif'.
         */

    }, {
        key: 'saveAs',
        value: function saveAs(name) {
            if (this.engine && name !== undefined) {
                this.engine.save(name);
            }
        }

        /**
         * Invoked when recording is stopped and resulting stream is available.
         *
         * @private
         * @param {string} audioVideoURL - Reference to the recorded Blob
         *     object, e.g. 'blob:http://localhost:8080/10100016-4248-9949-b0d6-0bb40db56eba'
         * @param {string} type - Media type, eg. 'video' or 'audio'.
         */

    }, {
        key: 'onStopRecording',
        value: function onStopRecording(audioVideoURL, type) {
            var _this2 = this;

            // store reference to recorded stream URL
            this.mediaURL = audioVideoURL;

            // store reference to recorded stream data
            var recordType = this.player().record().getRecordType();
            this.engine.getBlob(function (recording) {
                switch (recordType) {
                    case _recordMode.AUDIO_ONLY:
                        _this2.recordedData = recording.audio;

                        _this2.addFileInfo(_this2.recordedData);

                        // notify listeners
                        _this2.trigger('recordComplete');
                        break;

                    case _recordMode.VIDEO_ONLY:
                    case _recordMode.AUDIO_VIDEO:
                        // when recording both audio and video, recordrtc
                        // calls this twice on chrome, first with audio data
                        // and then with video data.
                        // on firefox it's called once but with a single
                        // blob that includes both audio and video data.
                        if (recording.video !== undefined) {
                            // data is video-only but on firefox audio+video
                            _this2.recordedData = recording.video;

                            // on the chrome browser two blobs are created
                            // containing the separate audio/video streams.
                            if (recordType === _recordMode.AUDIO_VIDEO && (0, _detectBrowser.isChrome)()) {
                                // store both audio and video
                                _this2.recordedData = recording;

                                for (var mtype in _this2.recordedData) {
                                    _this2.addFileInfo(_this2.recordedData[mtype]);
                                }
                            } else {
                                _this2.addFileInfo(_this2.recordedData);
                            }

                            // notify listeners
                            _this2.trigger('recordComplete');
                        }
                        break;

                    case _recordMode.ANIMATION:
                        _this2.recordedData = recording.gif;

                        _this2.addFileInfo(_this2.recordedData);

                        // notify listeners
                        _this2.trigger('recordComplete');
                        break;
                }
            });
        }
    }]);

    return RecordRTCEngine;
}(_recordEngine.RecordEngine);

// expose plugin


videojs.RecordRTCEngine = RecordRTCEngine;

Component.registerComponent('RecordRTCEngine', RecordRTCEngine);

exports.default = RecordRTCEngine;
},{"../utils/detect-browser":12,"./record-engine":8,"./record-mode":9}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @file browser-shim.js
 * @since 2.0.0
 */

var setSrcObject = function setSrcObject(stream, element, ignoreCreateObjectURL) {
    if ('createObjectURL' in URL && !ignoreCreateObjectURL) {
        try {
            element.src = URL.createObjectURL(stream);
        } catch (e) {
            setSrcObject(stream, element, true);
            return;
        }
    } else if ('srcObject' in element) {
        element.srcObject = stream;
    } else if ('mozSrcObject' in element) {
        element.mozSrcObject = stream;
    } else {
        console.log('createObjectURL/srcObject both are not supported.');
    }
};

exports.default = setSrcObject;
},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isSafari = exports.isChrome = exports.isOpera = exports.isEdge = exports.detectBrowser = undefined;

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Browser detector.
 *
 * @private
 * @return {object} result containing browser, version and minVersion
 *     properties.
 */
var detectBrowser = function detectBrowser() {
    // returned result object
    var result = {};
    result.browser = null;
    result.version = null;
    result.minVersion = null;

    // fail early if it's not a browser
    if (typeof _window2.default === 'undefined' || !_window2.default.navigator) {
        result.browser = 'Not a supported browser.';
        return result;
    }

    // Firefox
    if (navigator.mozGetUserMedia) {
        result.browser = 'firefox';
        result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
        result.minVersion = 31;
    } else if (navigator.webkitGetUserMedia) {
        // Chrome, Chromium, Webview, Opera
        if (_window2.default.webkitRTCPeerConnection) {
            result.browser = 'chrome';
            result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
            result.minVersion = 38;
        } else {
            // Safari (in an unpublished version) or unknown webkit-based.
            if (navigator.userAgent.match(/Version\/(\d+).(\d+)/)) {
                result.browser = 'safari';
                result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
                result.minVersion = 11;
            } else {
                // unknown webkit-based browser.
                result.browser = 'Unsupported webkit-based browser ' + 'with GUM support but no WebRTC support.';
                return result;
            }
        }
        // Edge
    } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
        result.browser = 'edge';
        result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
        result.minVersion = 10547;
    } else if (navigator.mediaDevices && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
        // Safari, with webkitGetUserMedia removed.
        result.browser = 'safari';
        result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
    } else {
        // default fallthrough: not supported.
        result.browser = 'Not a supported browser.';
        return result;
    }

    return result;
};

/**
 * Extract browser version out of the provided user agent string.
 *
 * @private
 * @param {!string} uastring - userAgent string.
 * @param {!string} expr - Regular expression used as match criteria.
 * @param {!number} pos - position in the version string to be
 *     returned.
 * @return {!number} browser version.
 */
/**
 * @file detect-browser.js
 * @since 2.0.0
 */

var extractVersion = function extractVersion(uastring, expr, pos) {
    var match = uastring.match(expr);
    return match && match.length >= pos && parseInt(match[pos], 10);
};

var isEdge = function isEdge() {
    return detectBrowser().browser === 'edge';
};

var isSafari = function isSafari() {
    return detectBrowser().browser === 'safari';
};

var isOpera = function isOpera() {
    return !!_window2.default.opera || navigator.userAgent.indexOf('OPR/') !== -1;
};

var isChrome = function isChrome() {
    return detectBrowser().browser === 'chrome';
};

exports.detectBrowser = detectBrowser;
exports.isEdge = isEdge;
exports.isOpera = isOpera;
exports.isChrome = isChrome;
exports.isSafari = isSafari;
},{"global/window":14}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
(function (global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _animationDisplay = require('./controls/animation-display');

var _animationDisplay2 = _interopRequireDefault(_animationDisplay);

var _recordCanvas = require('./controls/record-canvas');

var _recordCanvas2 = _interopRequireDefault(_recordCanvas);

var _deviceButton = require('./controls/device-button');

var _deviceButton2 = _interopRequireDefault(_deviceButton);

var _cameraButton = require('./controls/camera-button');

var _cameraButton2 = _interopRequireDefault(_cameraButton);

var _recordToggle = require('./controls/record-toggle');

var _recordToggle2 = _interopRequireDefault(_recordToggle);

var _recordIndicator = require('./controls/record-indicator');

var _recordIndicator2 = _interopRequireDefault(_recordIndicator);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _formatTime = require('./utils/format-time');

var _formatTime2 = _interopRequireDefault(_formatTime);

var _browserShim = require('./utils/browser-shim');

var _browserShim2 = _interopRequireDefault(_browserShim);

var _detectBrowser = require('./utils/detect-browser');

var _recordRtc = require('./engine/record-rtc');

var _recordRtc2 = _interopRequireDefault(_recordRtc);

var _recordEngine = require('./engine/record-engine');

var _recordMode = require('./engine/record-mode');

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file videojs.record.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * The main file for the videojs-record project.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * MIT license: https://github.com/collab-project/videojs-record/blob/master/LICENSE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Plugin = _video2.default.getPlugin('plugin');
var Player = _video2.default.getComponent('Player');

var AUTO = 'auto';

// monkey-patch play (#152)
Player.prototype.play = function play() {
    var retval = this.techGet_('play');
    // silence errors (unhandled promise from play)
    if (retval !== undefined && typeof retval.then === 'function') {
        retval.then(null, function (e) {});
    }
    return retval;
};

/**
 * Record audio/video/images using the Video.js player.
 *
 * @class
 * @augments videojs.Plugin
 */

var Record = function (_Plugin) {
    _inherits(Record, _Plugin);

    /**
     * The constructor function for the class.
     *
     * @param {(videojs.Player|Object)} player
     * @param {Object} options - Player options.
     */
    function Record(player, options) {
        _classCallCheck(this, Record);

        // setup plugin options
        var _this = _possibleConstructorReturn(this, (Record.__proto__ || Object.getPrototypeOf(Record)).call(this, player, options));

        _this.loadOptions();

        // (re)set recorder state
        _this.resetState();

        // add device button with icon based on type
        var deviceIcon = 'av-perm';
        switch (_this.getRecordType()) {
            case _recordMode.IMAGE_ONLY:
            case _recordMode.VIDEO_ONLY:
            case _recordMode.ANIMATION:
                deviceIcon = 'video-perm';
                break;
            case _recordMode.AUDIO_ONLY:
                deviceIcon = 'audio-perm';
                break;
        }
        _deviceButton2.default.prototype.buildCSSClass = function () {
            // use dynamic icon class
            return 'vjs-device-button vjs-control vjs-icon-' + deviceIcon;
        };
        player.deviceButton = new _deviceButton2.default(player, options);
        player.addChild(player.deviceButton);

        // add blinking record indicator
        player.recordIndicator = new _recordIndicator2.default(player, options);
        player.recordIndicator.hide();
        player.addChild(player.recordIndicator);

        // add canvas for recording and displaying image
        player.recordCanvas = new _recordCanvas2.default(player, options);
        player.recordCanvas.hide();
        player.addChild(player.recordCanvas);

        // add image for animation display
        player.animationDisplay = new _animationDisplay2.default(player, options);
        player.animationDisplay.hide();
        player.addChild(player.animationDisplay);

        // add camera button
        player.cameraButton = new _cameraButton2.default(player, options);
        player.cameraButton.hide();

        // add record toggle
        player.recordToggle = new _recordToggle2.default(player, options);
        player.recordToggle.hide();

        // wait until player ui is ready
        _this.player.one('ready', _this.setupUI.bind(_this));
        return _this;
    }

    /**
     * Setup plugin options.
     */


    _createClass(Record, [{
        key: 'loadOptions',
        value: function loadOptions() {
            var recordOptions = _video2.default.mergeOptions(_defaults2.default, this.player.options_.plugins.record);

            // record settings
            this.recordImage = recordOptions.image;
            this.recordAudio = recordOptions.audio;
            this.recordVideo = recordOptions.video;
            this.recordAnimation = recordOptions.animation;
            this.maxLength = recordOptions.maxLength;
            this.debug = recordOptions.debug;
            this.recordTimeSlice = recordOptions.timeSlice;

            // video/canvas settings
            this.videoFrameWidth = recordOptions.frameWidth;
            this.videoFrameHeight = recordOptions.frameHeight;
            this.videoRecorderType = recordOptions.videoRecorderType;
            this.videoMimeType = recordOptions.videoMimeType;

            // audio settings
            this.audioEngine = recordOptions.audioEngine;
            this.audioRecorderType = recordOptions.audioRecorderType;
            this.audioWorkerURL = recordOptions.audioWorkerURL;
            this.audioBufferSize = recordOptions.audioBufferSize;
            this.audioSampleRate = recordOptions.audioSampleRate;
            this.audioChannels = recordOptions.audioChannels;
            this.audioMimeType = recordOptions.audioMimeType;

            // animation settings
            this.animationFrameRate = recordOptions.animationFrameRate;
            this.animationQuality = recordOptions.animationQuality;
        }

        /**
         * Player UI is ready.
         * @private
         */

    }, {
        key: 'setupUI',
        value: function setupUI() {
            var _this2 = this;

            // insert custom controls on left-side of controlbar
            this.player.controlBar.addChild(this.player.cameraButton);
            this.player.controlBar.el().insertBefore(this.player.cameraButton.el(), this.player.controlBar.el().firstChild);
            this.player.controlBar.el().insertBefore(this.player.recordToggle.el(), this.player.controlBar.el().firstChild);

            // get rid of unused controls
            if (this.player.controlBar.remainingTimeDisplay !== undefined) {
                this.player.controlBar.remainingTimeDisplay.el().style.display = 'none';
            }
            if (this.player.controlBar.liveDisplay !== undefined) {
                this.player.controlBar.liveDisplay.el().style.display = 'none';
            }

            // loop feature is never used in this plugin
            this.player.loop(false);

            // tweak player UI based on type
            switch (this.getRecordType()) {
                case _recordMode.AUDIO_ONLY:
                    // reference to videojs-wavesurfer plugin
                    this.surfer = this.player.wavesurfer();
                    break;

                case _recordMode.IMAGE_ONLY:
                case _recordMode.VIDEO_ONLY:
                case _recordMode.AUDIO_VIDEO:
                case _recordMode.ANIMATION:
                    // customize controls
                    this.player.bigPlayButton.hide();

                    // loadedmetadata resets the durationDisplay for the
                    // first time
                    this.player.one('loadedmetadata', function () {
                        // display max record time
                        _this2.setDuration(_this2.maxLength);
                    });

                    // the native controls don't work for this UI so disable
                    // them no matter what
                    if (this.player.usingNativeControls_ === true) {
                        if (this.player.tech_.el_ !== undefined) {
                            this.player.tech_.el_.controls = false;
                        }
                    }

                    // clicking or tapping the player video element should not try
                    // to start playback
                    this.player.removeTechControlsListeners_();

                    if (this.player.options_.controls) {
                        // progress control isn't used by this plugin
                        this.player.controlBar.progressControl.hide();

                        // prevent controlbar fadeout
                        this.player.on('userinactive', function (event) {
                            _this2.player.userActive(true);
                        });

                        // videojs automatically hides the controls when no valid 'source'
                        // element is included in the video or audio tag. Don't. Ever again.
                        this.player.controlBar.show();
                        this.player.controlBar.el().style.display = 'flex';
                    }
                    break;
            }

            // disable time display events that constantly try to reset the current time
            // and duration values
            this.player.off('timeupdate');
            this.player.off('durationchange');
            this.player.off('loadedmetadata');

            // display max record time
            this.setDuration(this.maxLength);

            // hide play control
            this.player.controlBar.playToggle.hide();
        }

        /**
         * Indicates whether the plugin is currently recording or not.
         *
         * @return {boolean} Plugin currently recording or not.
         */

    }, {
        key: 'isRecording',
        value: function isRecording() {
            return this._recording;
        }

        /**
         * Indicates whether the plugin is currently processing recorded data
         * or not.
         *
         * @return {boolean} Plugin processing or not.
         */

    }, {
        key: 'isProcessing',
        value: function isProcessing() {
            return this._processing;
        }

        /**
         * Indicates whether the plugin is destroyed or not.
         *
         * @return {boolean} Plugin destroyed or not.
         */

    }, {
        key: 'isDestroyed',
        value: function isDestroyed() {
            return this.player && this.player.children() === null;
        }

        /**
         * Open the browser's recording device selection dialog.
         */

    }, {
        key: 'getDevice',
        value: function getDevice() {
            // define device callbacks once
            if (this.deviceReadyCallback === undefined) {
                this.deviceReadyCallback = this.onDeviceReady.bind(this);
            }
            if (this.deviceErrorCallback === undefined) {
                this.deviceErrorCallback = this.onDeviceError.bind(this);
            }
            if (this.engineStopCallback === undefined) {
                this.engineStopCallback = this.onRecordComplete.bind(this);
            }
            // ask the browser to give the user access to the media device
            // and get a stream reference in the callback function
            switch (this.getRecordType()) {
                case _recordMode.AUDIO_ONLY:
                    // setup microphone
                    this.mediaType = {
                        audio: this.audioRecorderType === AUTO ? true : this.audioRecorderType,
                        video: false
                    };
                    // remove existing microphone listeners
                    this.surfer.surfer.microphone.un('deviceReady', this.deviceReadyCallback);
                    this.surfer.surfer.microphone.un('deviceError', this.deviceErrorCallback);

                    // setup new microphone listeners
                    this.surfer.surfer.microphone.on('deviceReady', this.deviceReadyCallback);
                    this.surfer.surfer.microphone.on('deviceError', this.deviceErrorCallback);

                    // disable existing playback events
                    this.surfer.setupPlaybackEvents(false);

                    // (re)set surfer liveMode
                    this.surfer.liveMode = true;
                    this.surfer.surfer.microphone.paused = false;

                    // open browser device selection dialog
                    this.surfer.surfer.microphone.start();
                    break;

                case _recordMode.IMAGE_ONLY:
                case _recordMode.VIDEO_ONLY:
                    // setup camera
                    this.mediaType = {
                        audio: false,
                        video: this.videoRecorderType === AUTO ? true : this.videoRecorderType
                    };
                    navigator.mediaDevices.getUserMedia({
                        audio: false,
                        video: this.getRecordType() === _recordMode.IMAGE_ONLY ? this.recordImage : this.recordVideo
                    }).then(this.onDeviceReady.bind(this)).catch(this.onDeviceError.bind(this));
                    break;

                case _recordMode.AUDIO_VIDEO:
                    // setup camera and microphone
                    this.mediaType = {
                        audio: this.audioRecorderType === AUTO ? true : this.audioRecorderType,
                        video: this.videoRecorderType === AUTO ? true : this.videoRecorderType
                    };
                    navigator.mediaDevices.getUserMedia({
                        audio: this.recordAudio,
                        video: this.recordVideo
                    }).then(this.onDeviceReady.bind(this)).catch(this.onDeviceError.bind(this));
                    break;

                case _recordMode.ANIMATION:
                    // setup camera
                    this.mediaType = {
                        // animated GIF
                        audio: false,
                        video: false,
                        gif: true
                    };
                    navigator.mediaDevices.getUserMedia({
                        audio: false,
                        video: this.recordAnimation
                    }).then(this.onDeviceReady.bind(this)).catch(this.onDeviceError.bind(this));
                    break;
            }
        }

        /**
         * Invoked when the device is ready.
         * @private
         * @param stream: LocalMediaStream instance.
         */

    }, {
        key: 'onDeviceReady',
        value: function onDeviceReady(stream) {
            var _this3 = this;

            this._deviceActive = true;

            // store reference to stream for stopping etc.
            this.stream = stream;

            // hide device selection button
            this.player.deviceButton.hide();

            // reset time (e.g. when stopDevice was used)
            this.setDuration(this.maxLength);
            this.setCurrentTime(0);

            // hide play/pause control (e.g. when stopDevice was used)
            this.player.controlBar.playToggle.hide();

            // reset playback listeners
            this.off(this.player, 'timeupdate', this.playbackTimeUpdate);
            this.off(this.player, 'ended', this.playbackTimeUpdate);

            // setup recording engine
            if (this.getRecordType() !== _recordMode.IMAGE_ONLY) {
                // currently libvorbis.js, recorder.js, opus-recorder and lamejs
                // are only supported in audio-only mode
                if (this.getRecordType() !== _recordMode.AUDIO_ONLY && (this.audioEngine === _recordEngine.LIBVORBISJS || this.audioEngine === _recordEngine.RECORDERJS || this.audioEngine === _recordEngine.LAMEJS || this.audioEngine === _recordEngine.OPUSRECORDER)) {
                    throw new Error('Currently ' + this.audioEngine + ' is only supported in audio-only mode.');
                }

                // get recorder class
                var EngineClass;
                switch (this.audioEngine) {
                    case _recordEngine.RECORDRTC:
                        // RecordRTC.js (default)
                        EngineClass = _video2.default.RecordRTCEngine;
                        break;

                    case _recordEngine.LIBVORBISJS:
                        // libvorbis.js
                        EngineClass = _video2.default.LibVorbisEngine;
                        break;

                    case _recordEngine.RECORDERJS:
                        // recorder.js
                        EngineClass = _video2.default.RecorderjsEngine;
                        break;

                    case _recordEngine.LAMEJS:
                        // lamejs
                        EngineClass = _video2.default.LamejsEngine;
                        break;

                    case _recordEngine.OPUSRECORDER:
                        // opus-recorder
                        EngineClass = _video2.default.OpusRecorderEngine;
                        break;

                    default:
                        // unknown engine
                        throw new Error('Unknown audioEngine: ' + this.audioEngine);
                }
                try {
                    // connect stream to recording engine
                    this.engine = new EngineClass(this.player, this.player.options_);
                } catch (err) {
                    console.error(err);
                    throw new Error('Could not load ' + this.audioEngine + ' plugin');
                }

                // listen for events
                this.engine.on('recordComplete', this.engineStopCallback);

                // audio settings
                this.engine.bufferSize = this.audioBufferSize;
                this.engine.sampleRate = this.audioSampleRate;
                this.engine.audioChannels = this.audioChannels;
                this.engine.audioWorkerURL = this.audioWorkerURL;

                // mime type
                this.engine.mimeType = {
                    video: this.videoMimeType,
                    gif: 'image/gif'
                };
                if (this.audioMimeType !== null && this.audioMimeType !== AUTO) {
                    this.engine.mimeType.audio = this.audioMimeType;
                }

                // video/canvas settings
                this.engine.video = {
                    width: this.videoFrameWidth,
                    height: this.videoFrameHeight
                };
                this.engine.canvas = {
                    width: this.videoFrameWidth,
                    height: this.videoFrameHeight
                };

                // animated GIF settings
                this.engine.quality = this.animationQuality;
                this.engine.frameRate = this.animationFrameRate;

                // timeSlice
                if (this.recordTimeSlice && this.recordTimeSlice > 0) {
                    this.engine.timeSlice = this.recordTimeSlice;
                    this.engine.onTimeStamp = this.onTimeStamp.bind(this);
                }

                // initialize recorder
                this.engine.setup(this.stream, this.mediaType, this.debug);

                // show elements that should never be hidden in animation,
                // audio and/or video modus
                var uiElements = [this.player.controlBar.currentTimeDisplay, this.player.controlBar.timeDivider, this.player.controlBar.durationDisplay];
                uiElements.forEach(function (element) {
                    if (element !== undefined) {
                        element.el().style.display = 'block';
                        element.show();
                    }
                });

                // show record button
                this.player.recordToggle.show();
            } else {
                // disable record indicator
                this.player.recordIndicator.disable();

                // setup UI for retrying snapshot (e.g. when stopDevice was
                // used)
                this.retrySnapshot();

                // reset and show camera button
                this.player.cameraButton.onStop();
                this.player.cameraButton.show();
            }

            // setup preview
            if (this.getRecordType() !== _recordMode.AUDIO_ONLY) {
                // show live preview
                this.mediaElement = this.player.el().firstChild;
                this.mediaElement.controls = false;

                // mute incoming audio for feedback loops
                this.mediaElement.muted = true;

                // hide the volume bar while it's muted
                this.displayVolumeControl(false);

                // load stream
                this.load(this.stream);

                // stream loading is async, so we wait until it's ready to play
                // the stream
                this.player.one('loadedmetadata', function () {
                    // start stream
                    _this3.mediaElement.play();

                    // forward to listeners
                    _this3.player.trigger('deviceReady');
                });
            } else {
                // forward to listeners
                this.player.trigger('deviceReady');
            }
        }

        /**
         * Invoked when an device error occurred.
         * @private
         */

    }, {
        key: 'onDeviceError',
        value: function onDeviceError(code) {
            this._deviceActive = false;

            // store code
            this.player.deviceErrorCode = code;

            // forward error to player
            this.player.trigger('deviceError');
        }

        /**
         * Start recording.
         */

    }, {
        key: 'start',
        value: function start() {
            var _this4 = this;

            if (!this.isProcessing()) {
                this._recording = true;

                // hide play/pause control
                this.player.controlBar.playToggle.hide();

                // reset playback listeners
                this.off(this.player, 'timeupdate', this.playbackTimeUpdate);
                this.off(this.player, 'ended', this.playbackTimeUpdate);

                // start preview
                switch (this.getRecordType()) {
                    case _recordMode.AUDIO_ONLY:
                        // disable playback events
                        this.surfer.setupPlaybackEvents(false);

                        // start/resume live audio visualization
                        this.surfer.surfer.microphone.paused = false;
                        this.surfer.liveMode = true;
                        this.surfer.surfer.microphone.play();
                        break;

                    case _recordMode.VIDEO_ONLY:
                    case _recordMode.AUDIO_VIDEO:
                        // preview video stream in video element
                        this.startVideoPreview();
                        break;

                    case _recordMode.ANIMATION:
                        // hide the first frame
                        this.player.recordCanvas.hide();

                        // hide the animation
                        this.player.animationDisplay.hide();

                        // show preview video
                        this.mediaElement.style.display = 'block';

                        // for animations, capture the first frame
                        // that can be displayed as soon as recording
                        // is complete
                        this.captureFrame().then(function (result) {
                            // start video preview **after** capturing first frame
                            _this4.startVideoPreview();
                        });
                        break;
                }

                // start recording
                switch (this.getRecordType()) {
                    case _recordMode.IMAGE_ONLY:
                        // create snapshot
                        this.createSnapshot();

                        // notify UI
                        this.player.trigger('startRecord');
                        break;

                    case _recordMode.VIDEO_ONLY:
                    case _recordMode.AUDIO_VIDEO:
                    case _recordMode.ANIMATION:
                        // wait for media stream on video element to actually load
                        this.player.one('loadedmetadata', function () {
                            // start actually recording process
                            _this4.startRecording();
                        });
                        break;

                    default:
                        // all resources have already loaded, so we can start
                        // recording right away
                        this.startRecording();
                }
            }
        }

        /**
         * Start recording.
         * @private
         */

    }, {
        key: 'startRecording',
        value: function startRecording() {
            // register starting point
            this.paused = false;
            this.pauseTime = this.pausedTime = 0;
            this.startTime = new Date().getTime();

            // start countdown
            this.countDown = this.player.setInterval(this.onCountDown.bind(this), 100);

            // cleanup previous recording
            if (this.engine !== undefined) {
                this.engine.dispose();
            }

            // start recording stream
            this.engine.start();

            // notify UI
            this.player.trigger('startRecord');
        }

        /**
         * Stop recording.
         */

    }, {
        key: 'stop',
        value: function stop() {
            if (!this.isProcessing()) {
                this._recording = false;
                this._processing = true;

                if (this.getRecordType() !== _recordMode.IMAGE_ONLY) {
                    // notify UI
                    this.player.trigger('stopRecord');

                    // stop countdown
                    this.player.clearInterval(this.countDown);

                    // stop recording stream (result will be available async)
                    if (this.engine) {
                        this.engine.stop();
                    }
                } else {
                    if (this.player.recordedData) {
                        // notify listeners that image data is (already) available
                        this.player.trigger('finishRecord');
                    }
                }
            }
        }

        /**
         * Stop device(s) and recording if active.
         */

    }, {
        key: 'stopDevice',
        value: function stopDevice() {
            if (this.isRecording()) {
                // stop stream once recorded data is available,
                // otherwise it'll break recording
                this.player.one('finishRecord', this.stopStream.bind(this));

                // stop recording
                this.stop();
            } else {
                // stop stream now, since there's no recorded data available
                this.stopStream();
            }
        }

        /**
         * Stop stream and device.
         */

    }, {
        key: 'stopStream',
        value: function stopStream() {
            // stop stream and device
            if (this.stream) {
                this._deviceActive = false;

                if (this.getRecordType() === _recordMode.AUDIO_ONLY) {
                    // make the microphone plugin stop it's device
                    this.surfer.surfer.microphone.stopDevice();
                    return;
                }
                this.stream.getTracks().forEach(function (stream) {
                    stream.stop();
                });
            }
        }

        /**
         * Pause recording.
         */

    }, {
        key: 'pause',
        value: function pause() {
            if (!this.paused) {
                this.pauseTime = new Date().getTime();
                this.paused = true;

                this.engine.pause();
            }
        }

        /**
         * Resume recording.
         */

    }, {
        key: 'resume',
        value: function resume() {
            if (this.paused) {
                this.pausedTime += new Date().getTime() - this.pauseTime;

                this.engine.resume();
                this.paused = false;
            }
        }

        /**
         * Invoked when recording completed and the resulting stream is
         * available.
         * @private
         */

    }, {
        key: 'onRecordComplete',
        value: function onRecordComplete() {
            var _this5 = this;

            // store reference to recorded stream data
            this.player.recordedData = this.engine.recordedData;

            // change the replay button back to a play button
            this.player.controlBar.playToggle.removeClass('vjs-ended');
            this.player.controlBar.playToggle.show();

            // notify listeners that data is available
            this.player.trigger('finishRecord');

            switch (this.getRecordType()) {
                case _recordMode.AUDIO_ONLY:
                    // pause player so user can start playback
                    this.surfer.pause();

                    // setup events for playback
                    this.surfer.setupPlaybackEvents(true);

                    // display loader
                    this.player.loadingSpinner.show();

                    // restore interaction with controls after waveform
                    // rendering is complete
                    this.surfer.surfer.once('ready', function () {
                        _this5._processing = false;
                    });

                    // visualize recorded stream
                    this.load(this.player.recordedData);
                    break;

                case _recordMode.VIDEO_ONLY:
                case _recordMode.AUDIO_VIDEO:
                    // pausing the player so we can visualize the recorded data
                    // will trigger an async video.js 'pause' event that we
                    // have to wait for.
                    this.player.one('pause', function () {
                        // video data is ready
                        _this5._processing = false;

                        // hide loader
                        _this5.player.loadingSpinner.hide();

                        // show stream total duration
                        _this5.setDuration(_this5.streamDuration);

                        // update time during playback and at end
                        _this5.on(_this5.player, 'timeupdate', _this5.playbackTimeUpdate);
                        _this5.on(_this5.player, 'ended', _this5.playbackTimeUpdate);

                        // unmute local audio during playback
                        if (_this5.getRecordType() === _recordMode.AUDIO_VIDEO) {
                            _this5.mediaElement.muted = false;

                            // show the volume bar when it's unmuted
                            _this5.displayVolumeControl(true);
                        }

                        // load recorded media
                        if ((0, _detectBrowser.isChrome)() && _this5.getRecordType() === _recordMode.AUDIO_VIDEO) {
                            // use video property on Chrome
                            _this5.load(_this5.player.recordedData.video);
                        } else {
                            _this5.load(_this5.player.recordedData);
                        }
                    });

                    // pause player so user can start playback
                    this.player.pause();
                    break;

                case _recordMode.ANIMATION:
                    // animation data is ready
                    this._processing = false;

                    // hide loader
                    this.player.loadingSpinner.hide();

                    // show animation total duration
                    this.setDuration(this.streamDuration);

                    // hide preview video
                    this.mediaElement.style.display = 'none';

                    // show the first frame
                    this.player.recordCanvas.show();

                    // pause player so user can start playback
                    this.player.pause();

                    // show animation on play
                    this.on(this.player, 'play', this.showAnimation);

                    // hide animation on pause
                    this.on(this.player, 'pause', this.hideAnimation);
                    break;
            }
        }

        /**
         * Invoked during recording and displays the remaining time.
         * @private
         */

    }, {
        key: 'onCountDown',
        value: function onCountDown() {
            if (!this.paused) {
                var now = new Date().getTime();
                var duration = this.maxLength;
                var currentTime = (now - (this.startTime + this.pausedTime)) / 1000;

                this.streamDuration = currentTime;

                if (currentTime >= duration) {
                    // at the end
                    currentTime = duration;

                    // stop recording
                    this.stop();
                }

                // update duration
                this.setDuration(duration);

                // update current time
                this.setCurrentTime(currentTime, duration);

                // notify listeners
                this.player.trigger('progressRecord');
            }
        }

        /**
         * Get the current time of the recorded stream during playback.
         *
         * Returns 0 if no recording is available (yet).
         */

    }, {
        key: 'getCurrentTime',
        value: function getCurrentTime() {
            var currentTime = isNaN(this.streamCurrentTime) ? 0 : this.streamCurrentTime;

            if (this.getRecordType() === _recordMode.AUDIO_ONLY) {
                currentTime = this.surfer.getCurrentTime();
            }

            return currentTime;
        }

        /**
         * Updates the player's element displaying the current time.
         *
         * @private
         * @param {number} [currentTime=0] - Current position of the
         *    playhead (in seconds).
         * @param {number} [duration=0] - Duration in seconds.
         */

    }, {
        key: 'setCurrentTime',
        value: function setCurrentTime(currentTime, duration) {
            currentTime = isNaN(currentTime) ? 0 : currentTime;
            duration = isNaN(duration) ? 0 : duration;

            switch (this.getRecordType()) {
                case _recordMode.AUDIO_ONLY:
                    this.surfer.setCurrentTime(currentTime, duration);
                    break;

                case _recordMode.VIDEO_ONLY:
                case _recordMode.AUDIO_VIDEO:
                case _recordMode.ANIMATION:
                    this.streamCurrentTime = Math.min(currentTime, duration);

                    // update current time display component
                    this.player.controlBar.currentTimeDisplay.formattedTime_ = this.player.controlBar.currentTimeDisplay.contentEl().lastChild.textContent = (0, _formatTime2.default)(this.streamCurrentTime, duration, this.msDisplayMax);
                    break;
            }
        }

        /**
         * Get the length of the recorded stream in seconds.
         *
         * Returns 0 if no recording is available (yet).
         */

    }, {
        key: 'getDuration',
        value: function getDuration() {
            var duration = isNaN(this.streamDuration) ? 0 : this.streamDuration;

            return duration;
        }

        /**
         * Updates the player's element displaying the duration time.
         *
         * @param {number} [duration=0] - Duration in seconds.
         * @private
         */

    }, {
        key: 'setDuration',
        value: function setDuration(duration) {
            duration = isNaN(duration) ? 0 : duration;

            switch (this.getRecordType()) {
                case _recordMode.AUDIO_ONLY:
                    this.surfer.setDuration(duration);
                    break;

                case _recordMode.VIDEO_ONLY:
                case _recordMode.AUDIO_VIDEO:
                case _recordMode.ANIMATION:
                    // update duration display component
                    this.player.controlBar.durationDisplay.formattedTime_ = this.player.controlBar.durationDisplay.contentEl().lastChild.textContent = (0, _formatTime2.default)(duration, duration, this.msDisplayMax);
                    break;
            }
        }

        /**
         * Start loading data.
         *
         * @param {(string|blob|file)} url - Either the URL of the media file,
         *     a Blob, a File object or MediaStream.
         */

    }, {
        key: 'load',
        value: function load(url) {
            switch (this.getRecordType()) {
                case _recordMode.AUDIO_ONLY:
                    // visualize recorded Blob stream
                    this.surfer.load(url);
                    break;

                case _recordMode.IMAGE_ONLY:
                case _recordMode.VIDEO_ONLY:
                case _recordMode.AUDIO_VIDEO:
                case _recordMode.ANIMATION:
                    if (url instanceof Blob || url instanceof File) {
                        // assign blob using createObjectURL
                        (0, _browserShim2.default)(url, this.mediaElement, false);
                    } else {
                        // assign stream without createObjectURL
                        (0, _browserShim2.default)(url, this.mediaElement, true);
                    }
                    break;
            }
        }

        /**
         * Show save as dialog in browser so the user can store the recorded media
         * locally.
         *
         * @param {object} name - Object with one or more names for the particular
         *     blob(s) you want to save. File extensions are added automatically.
         *     For example: {'video': 'name-of-video-file'}. Supported keys are
         *     'audio', 'video' and 'gif'.
         */

    }, {
        key: 'saveAs',
        value: function saveAs(name) {
            if (this.engine && name !== undefined) {
                this.engine.saveAs(name);
            }
        }

        /**
         * Destroy plugin only.
         *
         * Use `destroy` to remove the plugin and the player.
         */

    }, {
        key: 'dispose',
        value: function dispose() {
            // disable common event listeners
            this.player.off('ready');
            this.player.off('userinactive');
            this.player.off('loadedmetadata');

            // prevent callbacks if recording is in progress
            if (this.engine) {
                this.engine.dispose();
                this.engine.off('recordComplete', this.engineStopCallback);
            }

            // stop recording and device
            this.stop();
            this.stopDevice();

            // stop countdown
            this.player.clearInterval(this.countDown);

            // dispose wavesurfer.js
            if (this.getRecordType() == _recordMode.AUDIO_ONLY) {
                if (this.surfer) {
                    // also disposes player
                    this.surfer.destroy();
                }
            }

            this.resetState();

            _get(Record.prototype.__proto__ || Object.getPrototypeOf(Record.prototype), 'dispose', this).call(this);
        }

        /**
         * Destroy plugin and players and cleanup resources.
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            this.player.dispose();
        }

        /**
         * Reset the plugin.
         */

    }, {
        key: 'reset',
        value: function reset() {
            var _this6 = this;

            // prevent callbacks if recording is in progress
            if (this.engine) {
                this.engine.dispose();
                this.engine.off('recordComplete', this.engineStopCallback);
            }

            // stop recording and device
            this.stop();
            this.stopDevice();

            // stop countdown
            this.player.clearInterval(this.countDown);

            // reset options
            this.loadOptions();

            // reset recorder state
            this.resetState();

            // reset record time
            this.setDuration(this.maxLength);
            this.setCurrentTime(0);

            // reset player
            this.player.reset();
            switch (this.getRecordType()) {
                case _recordMode.AUDIO_ONLY:
                    if (this.surfer && this.surfer.surfer) {
                        // empty last frame
                        this.surfer.surfer.empty();
                    }
                    break;

                case _recordMode.IMAGE_ONLY:
                case _recordMode.ANIMATION:
                    // reset UI
                    this.player.recordCanvas.hide();
                    this.player.cameraButton.hide();
                    break;
            }

            // hide play control
            this.player.controlBar.playToggle.hide();

            // show device selection button
            this.player.deviceButton.show();

            // hide record button
            this.player.recordToggle.hide();

            // loadedmetadata resets the durationDisplay for the
            // first time
            this.player.one('loadedmetadata', function () {
                // display max record time
                _this6.setDuration(_this6.maxLength);
            });
        }

        /**
         * Reset the plugin recorder state.
         * @private
         */

    }, {
        key: 'resetState',
        value: function resetState() {
            this._recording = false;
            this._processing = false;
            this._deviceActive = false;
            this.devices = [];
        }

        /**
         * Get recorder type.
         */

    }, {
        key: 'getRecordType',
        value: function getRecordType() {
            return (0, _recordMode.getRecorderMode)(this.recordImage, this.recordAudio, this.recordVideo, this.recordAnimation);
        }

        /**
         * Create and display snapshot image.
         * @private
         */

    }, {
        key: 'createSnapshot',
        value: function createSnapshot() {
            var _this7 = this;

            this.captureFrame().then(function (result) {
                // turn the canvas data into base64 data with a PNG header
                _this7.player.recordedData = result.toDataURL('image/png');

                // hide preview video
                _this7.mediaElement.style.display = 'none';

                // show the snapshot
                _this7.player.recordCanvas.show();

                // stop recording
                _this7.stop();
            });
        }

        /**
         * Reset UI for retrying a snapshot image.
         * @private
         */

    }, {
        key: 'retrySnapshot',
        value: function retrySnapshot() {
            this._processing = false;

            // retry: hide the snapshot
            this.player.recordCanvas.hide();

            // show preview video
            this.player.el().firstChild.style.display = 'block';
        }

        /**
         * Capture frame from camera and copy data to canvas.
         * @private
         */

    }, {
        key: 'captureFrame',
        value: function captureFrame() {
            var _this8 = this;

            var detected = (0, _detectBrowser.detectBrowser)();
            var recordCanvas = this.player.recordCanvas.el().firstChild;

            // set the canvas size to the dimensions of the camera,
            // which also wipes the content of the canvas
            recordCanvas.width = this.player.width();
            recordCanvas.height = this.player.height();

            return new Promise(function (resolve, reject) {
                // MediaCapture is only supported on:
                // - Chrome 60 and newer (see
                // https://github.com/w3c/mediacapture-image/blob/gh-pages/implementation-status.md)
                // - Firefox behind flag (https://bugzilla.mozilla.org/show_bug.cgi?id=888177)
                //
                // importing ImageCapture can fail when enabling chrome flag is still required.
                // if so; ignore and continue
                if (detected.browser === 'chrome' && detected.version >= 60 && (typeof ImageCapture === 'undefined' ? 'undefined' : _typeof(ImageCapture)) === (typeof Function === 'undefined' ? 'undefined' : _typeof(Function))) {
                    try {
                        var track = _this8.stream.getVideoTracks()[0];
                        var imageCapture = new ImageCapture(track);

                        imageCapture.takePhoto().then(function (blob) {
                            return createImageBitmap(blob);
                        }).then(function (imageBitmap) {
                            // get a frame and copy it onto the canvas
                            _this8.drawCanvas(recordCanvas, imageBitmap);

                            // notify others
                            resolve(recordCanvas);
                        });
                        return;
                    } catch (err) {}
                }
                // no ImageCapture available: do it the oldskool way

                // get a frame and copy it onto the canvas
                _this8.drawCanvas(recordCanvas, _this8.mediaElement);

                // notify others
                resolve(recordCanvas);
            });
        }

        /**
         * Draw image frame on canvas element.
         * @private
         */

    }, {
        key: 'drawCanvas',
        value: function drawCanvas(canvas, element) {
            canvas.getContext('2d').drawImage(element, 0, 0, canvas.width, canvas.height);
        }

        /**
         * Start preview of video stream.
         * @private
         */

    }, {
        key: 'startVideoPreview',
        value: function startVideoPreview() {
            // disable playback events
            this.off('timeupdate');
            this.off('durationchange');
            this.off('loadedmetadata');
            this.off('play');

            // mute local audio
            this.mediaElement.muted = true;

            // hide volume control to prevent feedback
            this.displayVolumeControl(false);

            // start or resume live preview
            this.load(this.stream);
            this.mediaElement.play();
        }

        /**
         * Show animated GIF.
         * @private
         */

    }, {
        key: 'showAnimation',
        value: function showAnimation() {
            var animationDisplay = this.player.animationDisplay.el().firstChild;

            // set the image size to the dimensions of the recorded animation
            animationDisplay.width = this.player.width();
            animationDisplay.height = this.player.height();

            // hide the first frame
            this.player.recordCanvas.hide();

            // show the animation
            (0, _browserShim2.default)(this.player.recordedData, animationDisplay, false);
            this.player.animationDisplay.show();
        }

        /**
         * Hide animated GIF.
         * @private
         */

    }, {
        key: 'hideAnimation',
        value: function hideAnimation() {
            // show the first frame
            this.player.recordCanvas.show();

            // hide the animation
            this.player.animationDisplay.hide();
        }

        /**
         * Update time during playback.
         * @private
         */

    }, {
        key: 'playbackTimeUpdate',
        value: function playbackTimeUpdate() {
            this.setCurrentTime(this.player.currentTime(), this.streamDuration);
        }

        /**
         * Received new timestamp (when timeSlice option is enabled).
         * @private
         */

    }, {
        key: 'onTimeStamp',
        value: function onTimeStamp(current, all) {
            this.player.currentTimestamp = current;
            this.player.allTimestamps = all;

            // get blob (only for MediaStreamRecorder)
            var internal;
            switch (this.getRecordType()) {
                case _recordMode.AUDIO_ONLY:
                    internal = this.engine.engine.audioRecorder;
                    break;

                case _recordMode.ANIMATION:
                    internal = this.engine.engine.gifRecorder;
                    break;

                default:
                    internal = this.engine.engine.videoRecorder;
            }
            internal = internal.getInternalRecorder();
            if (internal instanceof MediaStreamRecorder === true) {
                this.player.recordedData = internal.getArrayOfBlobs();
            }

            // notify others
            this.player.trigger('timestamp');
        }

        /**
         * Collects information about the media input and output devices
         * available on the system.
         *
         * Returns an array.
         */

    }, {
        key: 'enumerateDevices',
        value: function enumerateDevices() {
            var _this9 = this;

            if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                this.player.enumerateErrorCode = 'enumerateDevices() not supported.';
                this.player.trigger('enumerateError');
                return;
            }

            // List cameras and microphones.
            navigator.mediaDevices.enumerateDevices(this).then(function (devices) {
                _this9.devices = [];
                devices.forEach(function (device) {
                    _this9.devices.push(device);
                });

                // notify listeners
                _this9.player.trigger('enumerateReady');
            }).catch(function (err) {
                _this9.player.enumerateErrorCode = err;
                _this9.player.trigger('enumerateError');
            });
        }

        /**
         * Show or hide the volume menu.
         *
         * @private
         * @param {boolean} display - Hide/show volume control.
         */

    }, {
        key: 'displayVolumeControl',
        value: function displayVolumeControl(display) {
            if (this.player.controlBar.volumePanel !== undefined) {
                if (display === true) {
                    display = 'flex';
                } else {
                    display = 'none';
                }
                this.player.controlBar.volumePanel.el().style.display = display;
            }
        }
    }]);

    return Record;
}(Plugin);

// version nr gets replaced during build


Record.VERSION = '2.0.4';

// register plugin
_video2.default.Record = Record;
_video2.default.registerPlugin('record', Record);

// export plugin
module.exports = {
    Record: Record
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./controls/animation-display":1,"./controls/camera-button":2,"./controls/device-button":3,"./controls/record-canvas":4,"./controls/record-indicator":5,"./controls/record-toggle":6,"./defaults":7,"./engine/record-engine":8,"./engine/record-mode":9,"./engine/record-rtc":10,"./utils/browser-shim":11,"./utils/detect-browser":12,"./utils/format-time":13}]},{},[15])(15)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczUvY29udHJvbHMvYW5pbWF0aW9uLWRpc3BsYXkuanMiLCJlczUvY29udHJvbHMvY2FtZXJhLWJ1dHRvbi5qcyIsImVzNS9jb250cm9scy9kZXZpY2UtYnV0dG9uLmpzIiwiZXM1L2NvbnRyb2xzL3JlY29yZC1jYW52YXMuanMiLCJlczUvY29udHJvbHMvcmVjb3JkLWluZGljYXRvci5qcyIsImVzNS9jb250cm9scy9yZWNvcmQtdG9nZ2xlLmpzIiwiZXM1L2RlZmF1bHRzLmpzIiwiZXM1L2VuZ2luZS9yZWNvcmQtZW5naW5lLmpzIiwiZXM1L2VuZ2luZS9yZWNvcmQtbW9kZS5qcyIsImVzNS9lbmdpbmUvcmVjb3JkLXJ0Yy5qcyIsImVzNS91dGlscy9icm93c2VyLXNoaW0uanMiLCJlczUvdXRpbHMvZGV0ZWN0LWJyb3dzZXIuanMiLCJlczUvdXRpbHMvZm9ybWF0LXRpbWUuanMiLCJub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQob2JqZWN0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IHJldHVybiBnZXQocGFyZW50LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpOyB9IH0gZWxzZSBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogQGZpbGUgYW5pbWF0aW9uLWRpc3BsYXkuanNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5cbnZhciBDb21wb25lbnQgPSB2aWRlb2pzLmdldENvbXBvbmVudCgnQ29tcG9uZW50Jyk7XG5cbi8qKlxuICogSW1hZ2UgZm9yIGRpc3BsYXlpbmcgYW5pbWF0ZWQgR0lGIGltYWdlLlxuICpcbiAqIEBjbGFzc1xuICogQGF1Z21lbnRzIHZpZGVvanMuQ29tcG9uZW50XG4qL1xuXG52YXIgQW5pbWF0aW9uRGlzcGxheSA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhBbmltYXRpb25EaXNwbGF5LCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBBbmltYXRpb25EaXNwbGF5KCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBbmltYXRpb25EaXNwbGF5KTtcblxuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQW5pbWF0aW9uRGlzcGxheS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEFuaW1hdGlvbkRpc3BsYXkpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhBbmltYXRpb25EaXNwbGF5LCBbe1xuICAgIGtleTogJ2NyZWF0ZUVsJyxcblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRoZSBgQW5pbWF0aW9uRGlzcGxheWBzIERPTSBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7RWxlbWVudH1cbiAgICAgKiAgICAgICAgIFRoZSBkb20gZWxlbWVudCB0aGF0IGdldHMgY3JlYXRlZC5cbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlRWwoKSB7XG4gICAgICByZXR1cm4gX2dldChBbmltYXRpb25EaXNwbGF5LnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEFuaW1hdGlvbkRpc3BsYXkucHJvdG90eXBlKSwgJ2NyZWF0ZUVsJywgdGhpcykuY2FsbCh0aGlzLCAnZGl2Jywge1xuICAgICAgICBjbGFzc05hbWU6ICd2anMtYW5pbWF0aW9uLWRpc3BsYXknLFxuICAgICAgICBpbm5lckhUTUw6ICc8aW1nIC8+J1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEFuaW1hdGlvbkRpc3BsYXk7XG59KENvbXBvbmVudCk7XG5cbkNvbXBvbmVudC5yZWdpc3RlckNvbXBvbmVudCgnQW5pbWF0aW9uRGlzcGxheScsIEFuaW1hdGlvbkRpc3BsYXkpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBBbmltYXRpb25EaXNwbGF5OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIEBmaWxlIGNhbWVyYS1idXR0b24uanNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5cbnZhciBCdXR0b24gPSB2aWRlb2pzLmdldENvbXBvbmVudCgnQnV0dG9uJyk7XG52YXIgQ29tcG9uZW50ID0gdmlkZW9qcy5nZXRDb21wb25lbnQoJ0NvbXBvbmVudCcpO1xuXG4vKipcbiAqIEJ1dHRvbiB0byB0b2dnbGUgYmV0d2VlbiBjcmVhdGUgYW5kIHJldHJ5IHNuYXBzaG90IGltYWdlLlxuICpcbiAqIEBjbGFzc1xuICogQGF1Z21lbnRzIHZpZGVvanMuQnV0dG9uXG4qL1xuXG52YXIgQ2FtZXJhQnV0dG9uID0gZnVuY3Rpb24gKF9CdXR0b24pIHtcbiAgX2luaGVyaXRzKENhbWVyYUJ1dHRvbiwgX0J1dHRvbik7XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiBmb3IgdGhlIGNsYXNzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0geyh2aWRlb2pzLlBsYXllcnxPYmplY3QpfSBwbGF5ZXIgLSBWaWRlby5qcyBwbGF5ZXIgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gUGxheWVyIG9wdGlvbnMuXG4gICAqL1xuICBmdW5jdGlvbiBDYW1lcmFCdXR0b24ocGxheWVyLCBvcHRpb25zKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENhbWVyYUJ1dHRvbik7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQ2FtZXJhQnV0dG9uLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ2FtZXJhQnV0dG9uKSkuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpKTtcblxuICAgIF90aGlzLm9uKCdjbGljaycsIF90aGlzLm9uQ2xpY2spO1xuICAgIF90aGlzLm9uKCd0YXAnLCBfdGhpcy5vbkNsaWNrKTtcbiAgICBfdGhpcy5vbihwbGF5ZXIsICdzdGFydFJlY29yZCcsIF90aGlzLm9uU3RhcnQpO1xuICAgIF90aGlzLm9uKHBsYXllciwgJ3N0b3BSZWNvcmQnLCBfdGhpcy5vblN0b3ApO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZHMgdGhlIGRlZmF1bHQgRE9NIGBjbGFzc05hbWVgLlxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqICAgICAgICAgVGhlIERPTSBgY2xhc3NOYW1lYCBmb3IgdGhpcyBvYmplY3QuXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKENhbWVyYUJ1dHRvbiwgW3tcbiAgICBrZXk6ICdidWlsZENTU0NsYXNzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYnVpbGRDU1NDbGFzcygpIHtcbiAgICAgIHJldHVybiAndmpzLWNhbWVyYS1idXR0b24gdmpzLWNvbnRyb2wgdmpzLWljb24tcGhvdG8tY2FtZXJhJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGdldHMgY2FsbGVkIHdoZW4gdGhlIGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudFRhcmdldH5FdmVudH0gZXZlbnRcbiAgICAgKiAgICAgICAgVGhlIGB0YXBgIG9yIGBjbGlja2AgZXZlbnQgdGhhdCBjYXVzZWQgdGhpcyBmdW5jdGlvbiB0byBiZVxuICAgICAqICAgICAgICBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBAbGlzdGVucyB0YXBcbiAgICAgKiBAbGlzdGVucyBjbGlja1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvbkNsaWNrJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25DbGljayhldmVudCkge1xuICAgICAgdmFyIHJlY29yZGVyID0gdGhpcy5wbGF5ZXJfLnJlY29yZCgpO1xuXG4gICAgICBpZiAoIXJlY29yZGVyLmlzUHJvY2Vzc2luZygpKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBzbmFwc2hvdFxuICAgICAgICByZWNvcmRlci5zdGFydCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmV0cnlcbiAgICAgICAgcmVjb3JkZXIucmV0cnlTbmFwc2hvdCgpO1xuXG4gICAgICAgIC8vIHJlc2V0IGNhbWVyYSBidXR0b25cbiAgICAgICAgdGhpcy5vblN0b3AoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIHZqcy1pY29uLXJlcGxheSBjbGFzcyB0byB0aGUgZWxlbWVudCBzbyBpdCBjYW4gY2hhbmdlIGFwcGVhcmFuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fkV2ZW50fSBbZXZlbnRdXG4gICAgICogICAgICAgIFRoZSBldmVudCB0aGF0IGNhdXNlZCB0aGlzIGZ1bmN0aW9uIHRvIHJ1bi5cbiAgICAgKlxuICAgICAqIEBsaXN0ZW5zIFBsYXllciNzdGFydFJlY29yZFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvblN0YXJ0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25TdGFydChldmVudCkge1xuICAgICAgLy8gcmVwbGFjZSBlbGVtZW50IGNsYXNzIHNvIGl0IGNhbiBjaGFuZ2UgYXBwZWFyYW5jZVxuICAgICAgdGhpcy5yZW1vdmVDbGFzcygndmpzLWljb24tcGhvdG8tY2FtZXJhJyk7XG4gICAgICB0aGlzLmFkZENsYXNzKCd2anMtaWNvbi1yZXBsYXknKTtcblxuICAgICAgLy8gY2hhbmdlIHRoZSBidXR0b24gdGV4dFxuICAgICAgdGhpcy5jb250cm9sVGV4dCgnUmV0cnknKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIHZqcy1pY29uLXBob3RvLWNhbWVyYSBjbGFzcyB0byB0aGUgZWxlbWVudCBzbyBpdCBjYW4gY2hhbmdlIGFwcGVhcmFuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fkV2ZW50fSBbZXZlbnRdXG4gICAgICogICAgICAgIFRoZSBldmVudCB0aGF0IGNhdXNlZCB0aGlzIGZ1bmN0aW9uIHRvIHJ1bi5cbiAgICAgKlxuICAgICAqIEBsaXN0ZW5zIFBsYXllciNzdG9wUmVjb3JkXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29uU3RvcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uU3RvcChldmVudCkge1xuICAgICAgLy8gcmVwbGFjZSBlbGVtZW50IGNsYXNzIHNvIGl0IGNhbiBjaGFuZ2UgYXBwZWFyYW5jZVxuICAgICAgdGhpcy5yZW1vdmVDbGFzcygndmpzLWljb24tcmVwbGF5Jyk7XG4gICAgICB0aGlzLmFkZENsYXNzKCd2anMtaWNvbi1waG90by1jYW1lcmEnKTtcblxuICAgICAgLy8gY2hhbmdlIHRoZSBidXR0b24gdGV4dFxuICAgICAgdGhpcy5jb250cm9sVGV4dCgnSW1hZ2UnKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQ2FtZXJhQnV0dG9uO1xufShCdXR0b24pO1xuXG4vKipcbiAqIFRoZSB0ZXh0IHRoYXQgc2hvdWxkIGRpc3BsYXkgb3ZlciB0aGUgYENhbWVyYUJ1dHRvbmBzIGNvbnRyb2xzLiBBZGRlZCBmb3IgbG9jYWxpemF0aW9uLlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5cblxuQ2FtZXJhQnV0dG9uLnByb3RvdHlwZS5jb250cm9sVGV4dF8gPSAnSW1hZ2UnO1xuXG5Db21wb25lbnQucmVnaXN0ZXJDb21wb25lbnQoJ0NhbWVyYUJ1dHRvbicsIENhbWVyYUJ1dHRvbik7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IENhbWVyYUJ1dHRvbjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBAZmlsZSBkZXZpY2UtYnV0dG9uLmpzXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuXG52YXIgQnV0dG9uID0gdmlkZW9qcy5nZXRDb21wb25lbnQoJ0J1dHRvbicpO1xudmFyIENvbXBvbmVudCA9IHZpZGVvanMuZ2V0Q29tcG9uZW50KCdDb21wb25lbnQnKTtcblxuLyoqXG4gKiBCdXR0b24gdG8gc2VsZWN0IHJlY29yZGluZyBkZXZpY2UuXG4gKlxuICogQGNsYXNzXG4gKiBAYXVnbWVudHMgdmlkZW9qcy5CdXR0b25cbiovXG5cbnZhciBEZXZpY2VCdXR0b24gPSBmdW5jdGlvbiAoX0J1dHRvbikge1xuICBfaW5oZXJpdHMoRGV2aWNlQnV0dG9uLCBfQnV0dG9uKTtcblxuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIGZvciB0aGUgY2xhc3MuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7KHZpZGVvanMuUGxheWVyfE9iamVjdCl9IHBsYXllciAtIFZpZGVvLmpzIHBsYXllciBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBQbGF5ZXIgb3B0aW9ucy5cbiAgICovXG4gIGZ1bmN0aW9uIERldmljZUJ1dHRvbihwbGF5ZXIsIG9wdGlvbnMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRGV2aWNlQnV0dG9uKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChEZXZpY2VCdXR0b24uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEZXZpY2VCdXR0b24pKS5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucykpO1xuXG4gICAgX3RoaXMub24oJ2NsaWNrJywgX3RoaXMub25DbGljayk7XG4gICAgX3RoaXMub24oJ3RhcCcsIF90aGlzLm9uQ2xpY2spO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGdldHMgY2FsbGVkIHdoZW4gdGhlIGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgKlxuICAgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fkV2ZW50fSBldmVudFxuICAgKiAgICAgICAgVGhlIGB0YXBgIG9yIGBjbGlja2AgZXZlbnQgdGhhdCBjYXVzZWQgdGhpcyBmdW5jdGlvbiB0byBiZVxuICAgKiAgICAgICAgY2FsbGVkLlxuICAgKlxuICAgKiBAbGlzdGVucyB0YXBcbiAgICogQGxpc3RlbnMgY2xpY2tcbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoRGV2aWNlQnV0dG9uLCBbe1xuICAgIGtleTogJ29uQ2xpY2snLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAvLyBvcGVuIGRldmljZSBkaWFsb2dcbiAgICAgIHRoaXMucGxheWVyXy5yZWNvcmQoKS5nZXREZXZpY2UoKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRGV2aWNlQnV0dG9uO1xufShCdXR0b24pO1xuXG4vKipcbiAqIFRoZSB0ZXh0IHRoYXQgc2hvdWxkIGRpc3BsYXkgb3ZlciB0aGUgYERldmljZUJ1dHRvbmBzIGNvbnRyb2xzLiBBZGRlZCBmb3IgbG9jYWxpemF0aW9uLlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5cblxuRGV2aWNlQnV0dG9uLnByb3RvdHlwZS5jb250cm9sVGV4dF8gPSAnRGV2aWNlJztcblxuQ29tcG9uZW50LnJlZ2lzdGVyQ29tcG9uZW50KCdEZXZpY2VCdXR0b24nLCBEZXZpY2VCdXR0b24pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBEZXZpY2VCdXR0b247IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHByb3BlcnR5LCByZWNlaXZlcikgeyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgcmV0dXJuIGdldChwYXJlbnQsIHByb3BlcnR5LCByZWNlaXZlcik7IH0gfSBlbHNlIGlmIChcInZhbHVlXCIgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBAZmlsZSByZWNvcmQtY2FudmFzXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuXG52YXIgQ29tcG9uZW50ID0gdmlkZW9qcy5nZXRDb21wb25lbnQoJ0NvbXBvbmVudCcpO1xuXG4vKipcbiAqIENhbnZhcyBmb3IgZGlzcGxheWluZyBzbmFwc2hvdCBpbWFnZS5cbiAqXG4gKiBAY2xhc3NcbiAqIEBhdWdtZW50cyB2aWRlb2pzLkNvbXBvbmVudFxuKi9cblxudmFyIFJlY29yZENhbnZhcyA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhSZWNvcmRDYW52YXMsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFJlY29yZENhbnZhcygpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUmVjb3JkQ2FudmFzKTtcblxuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoUmVjb3JkQ2FudmFzLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoUmVjb3JkQ2FudmFzKSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoUmVjb3JkQ2FudmFzLCBbe1xuICAgIGtleTogJ2NyZWF0ZUVsJyxcblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRoZSBgUmVjb3JkQ2FudmFzYHMgRE9NIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtFbGVtZW50fVxuICAgICAqICAgICAgICAgVGhlIGRvbSBlbGVtZW50IHRoYXQgZ2V0cyBjcmVhdGVkLlxuICAgICAqL1xuICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVFbCgpIHtcbiAgICAgIHJldHVybiBfZ2V0KFJlY29yZENhbnZhcy5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihSZWNvcmRDYW52YXMucHJvdG90eXBlKSwgJ2NyZWF0ZUVsJywgdGhpcykuY2FsbCh0aGlzLCAnZGl2Jywge1xuICAgICAgICBjbGFzc05hbWU6ICd2anMtcmVjb3JkLWNhbnZhcycsXG4gICAgICAgIGlubmVySFRNTDogJzxjYW52YXM+PC9jYW52YXM+J1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFJlY29yZENhbnZhcztcbn0oQ29tcG9uZW50KTtcblxuQ29tcG9uZW50LnJlZ2lzdGVyQ29tcG9uZW50KCdSZWNvcmRDYW52YXMnLCBSZWNvcmRDYW52YXMpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBSZWNvcmRDYW52YXM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHByb3BlcnR5LCByZWNlaXZlcikgeyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgcmV0dXJuIGdldChwYXJlbnQsIHByb3BlcnR5LCByZWNlaXZlcik7IH0gfSBlbHNlIGlmIChcInZhbHVlXCIgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBAZmlsZSByZWNvcmQtaW5kaWNhdG9yLmpzXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuXG52YXIgQ29tcG9uZW50ID0gdmlkZW9qcy5nZXRDb21wb25lbnQoJ0NvbXBvbmVudCcpO1xuXG4vKipcbiAqIEljb24gaW5kaWNhdGluZyByZWNvcmRpbmcgaXMgYWN0aXZlLlxuICpcbiAqIEBjbGFzc1xuICogQGF1Z21lbnRzIHZpZGVvanMuQ29tcG9uZW50XG4qL1xuXG52YXIgUmVjb3JkSW5kaWNhdG9yID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKFJlY29yZEluZGljYXRvciwgX0NvbXBvbmVudCk7XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiBmb3IgdGhlIGNsYXNzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0geyh2aWRlb2pzLlBsYXllcnxPYmplY3QpfSBwbGF5ZXIgLSBWaWRlby5qcyBwbGF5ZXIgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gUGxheWVyIG9wdGlvbnMuXG4gICAqL1xuICBmdW5jdGlvbiBSZWNvcmRJbmRpY2F0b3IocGxheWVyLCBvcHRpb25zKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlY29yZEluZGljYXRvcik7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoUmVjb3JkSW5kaWNhdG9yLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoUmVjb3JkSW5kaWNhdG9yKSkuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpKTtcblxuICAgIF90aGlzLm9uKHBsYXllciwgJ3N0YXJ0UmVjb3JkJywgX3RoaXMuc2hvdyk7XG4gICAgX3RoaXMub24ocGxheWVyLCAnc3RvcFJlY29yZCcsIF90aGlzLmhpZGUpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgdGhlIGBSZWNvcmRJbmRpY2F0b3JgcyBET00gZWxlbWVudC5cbiAgICpcbiAgICogQHJldHVybiB7RWxlbWVudH1cbiAgICogICAgICAgICBUaGUgZG9tIGVsZW1lbnQgdGhhdCBnZXRzIGNyZWF0ZWQuXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKFJlY29yZEluZGljYXRvciwgW3tcbiAgICBrZXk6ICdjcmVhdGVFbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZUVsKCkge1xuICAgICAgcmV0dXJuIF9nZXQoUmVjb3JkSW5kaWNhdG9yLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFJlY29yZEluZGljYXRvci5wcm90b3R5cGUpLCAnY3JlYXRlRWwnLCB0aGlzKS5jYWxsKHRoaXMsICdkaXYnLCB7XG4gICAgICAgIGNsYXNzTmFtZTogJ3Zqcy1yZWNvcmQtaW5kaWNhdG9yIHZqcy1jb250cm9sJyxcbiAgICAgICAgZGlyOiAnbHRyJ1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZSBldmVudCBoYW5kbGVycy5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZGlzYWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgICB0aGlzLm9mZih0aGlzLnBsYXllcl8sICdzdGFydFJlY29yZCcsIHRoaXMuc2hvdyk7XG4gICAgICB0aGlzLm9mZih0aGlzLnBsYXllcl8sICdzdG9wUmVjb3JkJywgdGhpcy5oaWRlKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUmVjb3JkSW5kaWNhdG9yO1xufShDb21wb25lbnQpO1xuXG5Db21wb25lbnQucmVnaXN0ZXJDb21wb25lbnQoJ1JlY29yZEluZGljYXRvcicsIFJlY29yZEluZGljYXRvcik7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFJlY29yZEluZGljYXRvcjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBAZmlsZSByZWNvcmQtdG9nZ2xlLmpzXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuXG52YXIgQnV0dG9uID0gdmlkZW9qcy5nZXRDb21wb25lbnQoJ0J1dHRvbicpO1xudmFyIENvbXBvbmVudCA9IHZpZGVvanMuZ2V0Q29tcG9uZW50KCdDb21wb25lbnQnKTtcblxuLyoqXG4gKiBCdXR0b24gdG8gdG9nZ2xlIGJldHdlZW4gc3RhcnQgYW5kIHN0b3AgcmVjb3JkaW5nLlxuICpcbiAqIEBjbGFzc1xuICogQGF1Z21lbnRzIHZpZGVvanMuQnV0dG9uXG4qL1xuXG52YXIgUmVjb3JkVG9nZ2xlID0gZnVuY3Rpb24gKF9CdXR0b24pIHtcbiAgX2luaGVyaXRzKFJlY29yZFRvZ2dsZSwgX0J1dHRvbik7XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiBmb3IgdGhlIGNsYXNzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0geyh2aWRlb2pzLlBsYXllcnxPYmplY3QpfSBwbGF5ZXIgLSBWaWRlby5qcyBwbGF5ZXIgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gUGxheWVyIG9wdGlvbnMuXG4gICAqL1xuICBmdW5jdGlvbiBSZWNvcmRUb2dnbGUocGxheWVyLCBvcHRpb25zKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlY29yZFRvZ2dsZSk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoUmVjb3JkVG9nZ2xlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoUmVjb3JkVG9nZ2xlKSkuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpKTtcblxuICAgIF90aGlzLm9uKCdjbGljaycsIF90aGlzLm9uQ2xpY2spO1xuICAgIF90aGlzLm9uKCd0YXAnLCBfdGhpcy5vbkNsaWNrKTtcbiAgICBfdGhpcy5vbihwbGF5ZXIsICdzdGFydFJlY29yZCcsIF90aGlzLm9uU3RhcnQpO1xuICAgIF90aGlzLm9uKHBsYXllciwgJ3N0b3BSZWNvcmQnLCBfdGhpcy5vblN0b3ApO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZHMgdGhlIGRlZmF1bHQgRE9NIGBjbGFzc05hbWVgLlxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqICAgICAgICAgVGhlIERPTSBgY2xhc3NOYW1lYCBmb3IgdGhpcyBvYmplY3QuXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKFJlY29yZFRvZ2dsZSwgW3tcbiAgICBrZXk6ICdidWlsZENTU0NsYXNzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYnVpbGRDU1NDbGFzcygpIHtcbiAgICAgIHJldHVybiAndmpzLXJlY29yZC1idXR0b24gdmpzLWNvbnRyb2wgdmpzLWljb24tcmVjb3JkLXN0YXJ0JztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGdldHMgY2FsbGVkIHdoZW4gdGhlIGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudFRhcmdldH5FdmVudH0gZXZlbnRcbiAgICAgKiAgICAgICAgVGhlIGB0YXBgIG9yIGBjbGlja2AgZXZlbnQgdGhhdCBjYXVzZWQgdGhpcyBmdW5jdGlvbiB0byBiZVxuICAgICAqICAgICAgICBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBAbGlzdGVucyB0YXBcbiAgICAgKiBAbGlzdGVucyBjbGlja1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvbkNsaWNrJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25DbGljayhldmVudCkge1xuICAgICAgdmFyIHJlY29yZGVyID0gdGhpcy5wbGF5ZXJfLnJlY29yZCgpO1xuICAgICAgaWYgKCFyZWNvcmRlci5pc1JlY29yZGluZygpKSB7XG4gICAgICAgIHJlY29yZGVyLnN0YXJ0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWNvcmRlci5zdG9wKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIHRoZSB2anMtaWNvbi1yZWNvcmQtc3RvcCBjbGFzcyB0byB0aGUgZWxlbWVudCBzbyBpdCBjYW4gY2hhbmdlIGFwcGVhcmFuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fkV2ZW50fSBbZXZlbnRdXG4gICAgICogICAgICAgIFRoZSBldmVudCB0aGF0IGNhdXNlZCB0aGlzIGZ1bmN0aW9uIHRvIHJ1bi5cbiAgICAgKlxuICAgICAqIEBsaXN0ZW5zIFBsYXllciNzdGFydFJlY29yZFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvblN0YXJ0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25TdGFydChldmVudCkge1xuICAgICAgLy8gcmVwbGFjZSBlbGVtZW50IGNsYXNzIHNvIGl0IGNhbiBjaGFuZ2UgYXBwZWFyYW5jZVxuICAgICAgdGhpcy5yZW1vdmVDbGFzcygndmpzLWljb24tcmVjb3JkLXN0YXJ0Jyk7XG4gICAgICB0aGlzLmFkZENsYXNzKCd2anMtaWNvbi1yZWNvcmQtc3RvcCcpO1xuXG4gICAgICAvLyBjaGFuZ2UgdGhlIGJ1dHRvbiB0ZXh0XG4gICAgICB0aGlzLmNvbnRyb2xUZXh0KCdTdG9wJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIHRoZSB2anMtaWNvbi1yZWNvcmQtc3RhcnQgY2xhc3MgdG8gdGhlIGVsZW1lbnQgc28gaXQgY2FuIGNoYW5nZSBhcHBlYXJhbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudFRhcmdldH5FdmVudH0gW2V2ZW50XVxuICAgICAqICAgICAgICBUaGUgZXZlbnQgdGhhdCBjYXVzZWQgdGhpcyBmdW5jdGlvbiB0byBydW4uXG4gICAgICpcbiAgICAgKiBAbGlzdGVucyBQbGF5ZXIjc3RvcFJlY29yZFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvblN0b3AnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvblN0b3AoZXZlbnQpIHtcbiAgICAgIC8vIHJlcGxhY2UgZWxlbWVudCBjbGFzcyBzbyBpdCBjYW4gY2hhbmdlIGFwcGVhcmFuY2VcbiAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ3Zqcy1pY29uLXJlY29yZC1zdG9wJyk7XG4gICAgICB0aGlzLmFkZENsYXNzKCd2anMtaWNvbi1yZWNvcmQtc3RhcnQnKTtcblxuICAgICAgLy8gY2hhbmdlIHRoZSBidXR0b24gdGV4dFxuICAgICAgdGhpcy5jb250cm9sVGV4dCgnUmVjb3JkJyk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFJlY29yZFRvZ2dsZTtcbn0oQnV0dG9uKTtcblxuLyoqXG4gKiBUaGUgdGV4dCB0aGF0IHNob3VsZCBkaXNwbGF5IG92ZXIgdGhlIGBSZWNvcmRUb2dnbGVgcyBjb250cm9scy4gQWRkZWQgZm9yIGxvY2FsaXphdGlvbi5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuXG5cblJlY29yZFRvZ2dsZS5wcm90b3R5cGUuY29udHJvbFRleHRfID0gJ1JlY29yZCc7XG5cbkNvbXBvbmVudC5yZWdpc3RlckNvbXBvbmVudCgnUmVjb3JkVG9nZ2xlJywgUmVjb3JkVG9nZ2xlKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUmVjb3JkVG9nZ2xlOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuLyoqXG4gKiBAZmlsZSBkZWZhdWx0cy5qc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cblxuLy9wbHVnaW4gZGVmYXVsdHNcbnZhciBwbHVnaW5EZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAvLyBTaW5nbGUgc25hcHNob3QgaW1hZ2UuXG4gICAgaW1hZ2U6IGZhbHNlLFxuICAgIC8vIEluY2x1ZGUgYXVkaW8gaW4gdGhlIHJlY29yZGVkIGNsaXAuXG4gICAgYXVkaW86IGZhbHNlLFxuICAgIC8vIEluY2x1ZGUgdmlkZW8gaW4gdGhlIHJlY29yZGVkIGNsaXAuXG4gICAgdmlkZW86IGZhbHNlLFxuICAgIC8vIEFuaW1hdGVkIEdJRi5cbiAgICBhbmltYXRpb246IGZhbHNlLFxuICAgIC8vIE1heGltdW0gbGVuZ3RoIG9mIHRoZSByZWNvcmRlZCBjbGlwLlxuICAgIG1heExlbmd0aDogMTAsXG4gICAgLy8gV2lkdGggb2YgdGhlIHJlY29yZGVkIHZpZGVvIGZyYW1lcy5cbiAgICBmcmFtZVdpZHRoOiAzMjAsXG4gICAgLy8gSGVpZ2h0IG9mIHRoZSByZWNvcmRlZCB2aWRlbyBmcmFtZXMuXG4gICAgZnJhbWVIZWlnaHQ6IDI0MCxcbiAgICAvLyBFbmFibGVzIGNvbnNvbGUgbG9nZ2luZyBmb3IgZGVidWdnaW5nIHB1cnBvc2VzLlxuICAgIGRlYnVnOiBmYWxzZSxcbiAgICAvLyBUaGUgbWltZSB0eXBlIGZvciB0aGUgdmlkZW8gcmVjb3JkZXIuIERlZmF1bHQgdG8gJ3ZpZGVvL3dlYm0nLlxuICAgIC8vIFVzZSAndmlkZW8vbXA0JyAoRmlyZWZveCkgb3IgJ3ZpZGVvL3dlYm07Y29kZWNzPUgyNjQnIChDaHJvbWUgNTIgYW5kXG4gICAgLy8gbmV3ZXIpIGZvciBNUDQuXG4gICAgdmlkZW9NaW1lVHlwZTogJ3ZpZGVvL3dlYm0nLFxuICAgIC8vIFZpZGVvIHJlY29yZGVyIHR5cGUgdG8gdXNlLiBUaGlzIGFsbG93cyB5b3UgdG8gc3BlY2lmeSBhbiBhbHRlcm5hdGl2ZVxuICAgIC8vIHJlY29yZGVyIGNsYXNzLCBlLmcuIFdoYW1teVJlY29yZGVyLiBEZWZhdWx0cyB0byAnYXV0bycgd2hpY2ggbGV0J3NcbiAgICAvLyByZWNvcmRydGMgc3BlY2lmeSB0aGUgYmVzdCBhdmFpbGFibGUgcmVjb3JkZXIgdHlwZS5cbiAgICB2aWRlb1JlY29yZGVyVHlwZTogJ2F1dG8nLFxuICAgIC8vIEF1ZGlvIHJlY29yZGluZyBsaWJyYXJ5IHRvIHVzZS4gTGVnYWwgdmFsdWVzIGFyZSAncmVjb3JkcnRjJyxcbiAgICAvLyAnbGlidm9yYmlzLmpzJywgJ29wdXMtcmVjb3JkZXInLCAnbGFtZWpzJyBhbmQgJ3JlY29yZGVyLmpzJy5cbiAgICBhdWRpb0VuZ2luZTogJ3JlY29yZHJ0YycsXG4gICAgLy8gQXVkaW8gcmVjb3JkZXIgdHlwZSB0byB1c2UuIFRoaXMgYWxsb3dzIHlvdSB0byBzcGVjaWZ5IGFuIGFsdGVybmF0aXZlXG4gICAgLy8gcmVjb3JkZXIgY2xhc3MsIGUuZy4gU3RlcmVvQXVkaW9SZWNvcmRlci4gRGVmYXVsdHMgdG8gJ2F1dG8nIHdoaWNoIGxldCdzXG4gICAgLy8gcmVjb3JkcnRjIHNwZWNpZnkgdGhlIGJlc3QgYXZhaWxhYmxlIHJlY29yZGVyIHR5cGUuIEN1cnJlbnRseSB0aGlzXG4gICAgLy8gc2V0dGluZyBpcyBvbmx5IHVzZWQgd2l0aCB0aGUgJ3JlY29yZHJ0YycgYXVkaW9FbmdpbmUuXG4gICAgYXVkaW9SZWNvcmRlclR5cGU6ICdhdXRvJyxcbiAgICAvLyBUaGUgbWltZSB0eXBlIGZvciB0aGUgYXVkaW8gcmVjb3JkZXIuIERlZmF1bHRzIHRvICdhdXRvJyB3aGljaCB3aWxsIHBpY2tcbiAgICAvLyB0aGUgYmVzdCBvcHRpb24gYXZhaWxhYmxlIGluIHRoZSBicm93c2VyIChlLmcuIGVpdGhlciAnYXVkaW8vd2F2JyxcbiAgICAvLyAnYXVkaW8vb2dnJyBvciAnYXVkaW8vd2VibScpLlxuICAgIGF1ZGlvTWltZVR5cGU6ICdhdXRvJyxcbiAgICAvLyBUaGUgc2l6ZSBvZiB0aGUgYXVkaW8gYnVmZmVyIChpbiBzYW1wbGUtZnJhbWVzKSB3aGljaCBuZWVkcyB0b1xuICAgIC8vIGJlIHByb2Nlc3NlZCBlYWNoIHRpbWUgb25wcm9jZXNzYXVkaW8gaXMgY2FsbGVkLlxuICAgIC8vIEZyb20gdGhlIHNwZWM6IFRoaXMgdmFsdWUgY29udHJvbHMgaG93IGZyZXF1ZW50bHkgdGhlIGF1ZGlvcHJvY2VzcyBldmVudCBpc1xuICAgIC8vIGRpc3BhdGNoZWQgYW5kIGhvdyBtYW55IHNhbXBsZS1mcmFtZXMgbmVlZCB0byBiZSBwcm9jZXNzZWQgZWFjaCBjYWxsLlxuICAgIC8vIExvd2VyIHZhbHVlcyBmb3IgYnVmZmVyIHNpemUgd2lsbCByZXN1bHQgaW4gYSBsb3dlciAoYmV0dGVyKSBsYXRlbmN5LlxuICAgIC8vIEhpZ2hlciB2YWx1ZXMgd2lsbCBiZSBuZWNlc3NhcnkgdG8gYXZvaWQgYXVkaW8gYnJlYWt1cCBhbmQgZ2xpdGNoZXMuXG4gICAgLy8gTGVnYWwgdmFsdWVzIGFyZSAyNTYsIDUxMiwgMTAyNCwgMjA0OCwgNDA5NiwgODE5MiBvciAxNjM4NC5cbiAgICBhdWRpb0J1ZmZlclNpemU6IDQwOTYsXG4gICAgLy8gVGhlIGF1ZGlvIHNhbXBsZSByYXRlIChpbiBzYW1wbGUtZnJhbWVzIHBlciBzZWNvbmQpIGF0IHdoaWNoIHRoZVxuICAgIC8vIEF1ZGlvQ29udGV4dCBoYW5kbGVzIGF1ZGlvLiBJdCBpcyBhc3N1bWVkIHRoYXQgYWxsIEF1ZGlvTm9kZXNcbiAgICAvLyBpbiB0aGUgY29udGV4dCBydW4gYXQgdGhpcyByYXRlLiBJbiBtYWtpbmcgdGhpcyBhc3N1bXB0aW9uLFxuICAgIC8vIHNhbXBsZS1yYXRlIGNvbnZlcnRlcnMgb3IgXCJ2YXJpc3BlZWRcIiBwcm9jZXNzb3JzIGFyZSBub3Qgc3VwcG9ydGVkXG4gICAgLy8gaW4gcmVhbC10aW1lIHByb2Nlc3NpbmcuXG4gICAgLy8gVGhlIHNhbXBsZVJhdGUgcGFyYW1ldGVyIGRlc2NyaWJlcyB0aGUgc2FtcGxlLXJhdGUgb2YgdGhlXG4gICAgLy8gbGluZWFyIFBDTSBhdWRpbyBkYXRhIGluIHRoZSBidWZmZXIgaW4gc2FtcGxlLWZyYW1lcyBwZXIgc2Vjb25kLlxuICAgIC8vIEFuIGltcGxlbWVudGF0aW9uIG11c3Qgc3VwcG9ydCBzYW1wbGUtcmF0ZXMgaW4gYXQgbGVhc3RcbiAgICAvLyB0aGUgcmFuZ2UgMjIwNTAgdG8gOTYwMDAuXG4gICAgYXVkaW9TYW1wbGVSYXRlOiA0NDEwMCxcbiAgICAvLyBBbGxvd3MgeW91IHRvIHJlY29yZCBzaW5nbGUtY2hhbm5lbCBhdWRpbywgd2hpY2ggY2FuIHJlZHVjZSB0aGVcbiAgICAvLyBmaWxlc2l6ZS5cbiAgICBhdWRpb0NoYW5uZWxzOiAyLFxuICAgIC8vIFVSTCBmb3IgdGhlIGF1ZGlvIHdvcmtlci5cbiAgICBhdWRpb1dvcmtlclVSTDogJycsXG4gICAgLy8gRnJhbWUgcmF0ZSBpbiBmcmFtZXMgcGVyIHNlY29uZC5cbiAgICBhbmltYXRpb25GcmFtZVJhdGU6IDIwMCxcbiAgICAvLyBTZXRzIHF1YWxpdHkgb2YgY29sb3IgcXVhbnRpemF0aW9uIChjb252ZXJzaW9uIG9mIGltYWdlcyB0byB0aGVcbiAgICAvLyBtYXhpbXVtIDI1NiBjb2xvcnMgYWxsb3dlZCBieSB0aGUgR0lGIHNwZWNpZmljYXRpb24pLlxuICAgIC8vIExvd2VyIHZhbHVlcyAobWluaW11bSA9IDEpIHByb2R1Y2UgYmV0dGVyIGNvbG9ycyxcbiAgICAvLyBidXQgc2xvdyBwcm9jZXNzaW5nIHNpZ25pZmljYW50bHkuIDEwIGlzIHRoZSBkZWZhdWx0LFxuICAgIC8vIGFuZCBwcm9kdWNlcyBnb29kIGNvbG9yIG1hcHBpbmcgYXQgcmVhc29uYWJsZSBzcGVlZHMuXG4gICAgLy8gVmFsdWVzIGdyZWF0ZXIgdGhhbiAyMCBkbyBub3QgeWllbGQgc2lnbmlmaWNhbnQgaW1wcm92ZW1lbnRzXG4gICAgLy8gaW4gc3BlZWQuXG4gICAgYW5pbWF0aW9uUXVhbGl0eTogMTAsXG4gICAgLy8gQWNjZXB0cyBudW1iZXJzIGluIG1pbGxpc2Vjb25kczsgdXNlIHRoaXMgdG8gZm9yY2UgaW50ZXJ2YWxzLWJhc2VkIGJsb2JzLlxuICAgIHRpbWVTbGljZTogMFxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gcGx1Z2luRGVmYXVsdE9wdGlvbnM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBAZmlsZSByZWNvcmQtZW5naW5lLmpzXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuXG52YXIgQ29tcG9uZW50ID0gdmlkZW9qcy5nZXRDb21wb25lbnQoJ0NvbXBvbmVudCcpO1xuXG4vLyBzdXBwb3J0ZWQgcmVjb3JkZXIgcGx1Z2luIGVuZ2luZXNcbnZhciBSRUNPUkRSVEMgPSAncmVjb3JkcnRjJztcbnZhciBMSUJWT1JCSVNKUyA9ICdsaWJ2b3JiaXMuanMnO1xudmFyIFJFQ09SREVSSlMgPSAncmVjb3JkZXIuanMnO1xudmFyIExBTUVKUyA9ICdsYW1lanMnO1xudmFyIE9QVVNSRUNPUkRFUiA9ICdvcHVzLXJlY29yZGVyJztcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciByZWNvcmRlciBiYWNrZW5kcy5cbiAqIEBjbGFzc1xuICogQGF1Z21lbnRzIHZpZGVvanMuQ29tcG9uZW50XG4gKi9cblxudmFyIFJlY29yZEVuZ2luZSA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKFJlY29yZEVuZ2luZSwgX0NvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBSZWNvcmRFbmdpbmUoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSZWNvcmRFbmdpbmUpO1xuXG4gICAgICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoUmVjb3JkRW5naW5lLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoUmVjb3JkRW5naW5lKSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKFJlY29yZEVuZ2luZSwgW3tcbiAgICAgICAga2V5OiAnZGlzcG9zZScsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIGFueSB0ZW1wb3JhcnkgZGF0YSBhbmQgcmVmZXJlbmNlcyB0byBzdHJlYW1zLlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICAgICAgICAvLyBkaXNwb3NlIHByZXZpb3VzIHJlY29yZGluZ1xuICAgICAgICAgICAgaWYgKHRoaXMucmVjb3JkZWREYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHRoaXMucmVjb3JkZWREYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGQgZmlsZW5hbWUgYW5kIHRpbWVzdGFtcCB0byByZWNvcmRlZCBmaWxlIG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHsoYmxvYnxmaWxlKX0gZmlsZU9iaiAtIEJsb2Igb3IgRmlsZSBvYmplY3QuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdhZGRGaWxlSW5mbycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRGaWxlSW5mbyhmaWxlT2JqKSB7XG4gICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGZpbGVPYmoubGFzdE1vZGlmaWVkRGF0ZSA9IG5vdztcblxuICAgICAgICAgICAgLy8gZ3Vlc3MgZXh0ZW5zaW9uIG5hbWUgZnJvbSBtaW1lIHR5cGUsIGUuZy4gYXVkaW8vb2dnLCBidXRcbiAgICAgICAgICAgIC8vIGFueSBleHRlbnNpb24gaXMgdmFsaWQgaGVyZS4gQ2hyb21lIGFsc28gYWNjZXB0cyBleHRlbmRlZFxuICAgICAgICAgICAgLy8gbWltZSB0eXBlcyBsaWtlIHZpZGVvL3dlYm07Y29kZWNzPWgyNjQsdnA5LG9wdXNcbiAgICAgICAgICAgIHZhciBmaWxlRXh0ZW5zaW9uID0gJy4nICsgZmlsZU9iai50eXBlLnNwbGl0KCcvJylbMV07XG4gICAgICAgICAgICBpZiAoZmlsZUV4dGVuc2lvbi5pbmRleE9mKCc7JykgPiAtMSkge1xuICAgICAgICAgICAgICAgIGZpbGVFeHRlbnNpb24gPSBmaWxlRXh0ZW5zaW9uLnNwbGl0KCc7JylbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHVzZSB0aW1lc3RhbXAgaW4gZmlsZW5hbWUsIGUuZy4gMTQ1MTE4MDk0MTMyNi5vZ2dcbiAgICAgICAgICAgIGZpbGVPYmoubmFtZSA9IG5vdy5nZXRUaW1lKCkgKyBmaWxlRXh0ZW5zaW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEludm9rZWQgd2hlbiByZWNvcmRpbmcgaXMgc3RvcHBlZCBhbmQgcmVzdWx0aW5nIHN0cmVhbSBpcyBhdmFpbGFibGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7YmxvYn0gZGF0YSAtIFJlZmVyZW5jZSB0byB0aGUgcmVjb3JkZWQgQmxvYi5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ29uU3RvcFJlY29yZGluZycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvblN0b3BSZWNvcmRpbmcoZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5yZWNvcmRlZERhdGEgPSBkYXRhO1xuXG4gICAgICAgICAgICAvLyBhZGQgZmlsZW5hbWUgYW5kIHRpbWVzdGFtcCB0byByZWNvcmRlZCBmaWxlIG9iamVjdFxuICAgICAgICAgICAgdGhpcy5hZGRGaWxlSW5mbyh0aGlzLnJlY29yZGVkRGF0YSk7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSByZWZlcmVuY2UgdG8gcmVjb3JkZWQgc3RyZWFtXG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcblxuICAgICAgICAgICAgLy8gbm90aWZ5IGxpc3RlbmVyc1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdyZWNvcmRDb21wbGV0ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNob3cgc2F2ZSBhcyBkaWFsb2cgaW4gYnJvd3NlciBzbyB0aGUgdXNlciBjYW4gc3RvcmUgdGhlIHJlY29yZGVkIG1lZGlhXG4gICAgICAgICAqIGxvY2FsbHkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBuYW1lIC0gT2JqZWN0IHdpdGggbmFtZXMgZm9yIHRoZSBwYXJ0aWN1bGFyIGJsb2IocylcbiAgICAgICAgICogICAgIHlvdSB3YW50IHRvIHNhdmUuIEZpbGUgZXh0ZW5zaW9ucyBhcmUgYWRkZWQgYXV0b21hdGljYWxseS4gRm9yXG4gICAgICAgICAqICAgICBleGFtcGxlOiB7J3ZpZGVvJzogJ25hbWUtb2YtdmlkZW8tZmlsZSd9LiBTdXBwb3J0ZWQga2V5cyBhcmVcbiAgICAgICAgICogICAgICdhdWRpbycsICd2aWRlbycgYW5kICdnaWYnLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2F2ZUFzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNhdmVBcyhuYW1lKSB7XG4gICAgICAgICAgICB2YXIgZmlsZU5hbWUgPSBuYW1lW09iamVjdC5rZXlzKG5hbWUpWzBdXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IodGhpcy5yZWNvcmRlZERhdGEsIGZpbGVOYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG5hdmlnYXRvci5tc1NhdmVCbG9iICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBuYXZpZ2F0b3IubXNTYXZlQmxvYih0aGlzLnJlY29yZGVkRGF0YSwgZmlsZU5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaHlwZXJsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgaHlwZXJsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHRoaXMucmVjb3JkZWREYXRhKTtcbiAgICAgICAgICAgIGh5cGVybGluay5kb3dubG9hZCA9IGZpbGVOYW1lO1xuXG4gICAgICAgICAgICBoeXBlcmxpbmsuc3R5bGUgPSAnZGlzcGxheTpub25lO29wYWNpdHk6MDtjb2xvcjp0cmFuc3BhcmVudDsnO1xuICAgICAgICAgICAgKGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5hcHBlbmRDaGlsZChoeXBlcmxpbmspO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGh5cGVybGluay5jbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGh5cGVybGluay5jbGljaygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoeXBlcmxpbmsudGFyZ2V0ID0gJ19ibGFuayc7XG4gICAgICAgICAgICAgICAgaHlwZXJsaW5rLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJywge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiB3aW5kb3csXG4gICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoaHlwZXJsaW5rLmhyZWYpO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFJlY29yZEVuZ2luZTtcbn0oQ29tcG9uZW50KTtcblxuLy8gZXhwb3NlIGNvbXBvbmVudCBmb3IgZXh0ZXJuYWwgcGx1Z2luc1xuXG5cbnZpZGVvanMuUmVjb3JkRW5naW5lID0gUmVjb3JkRW5naW5lO1xuQ29tcG9uZW50LnJlZ2lzdGVyQ29tcG9uZW50KCdSZWNvcmRFbmdpbmUnLCBSZWNvcmRFbmdpbmUpO1xuXG5leHBvcnRzLlJlY29yZEVuZ2luZSA9IFJlY29yZEVuZ2luZTtcbmV4cG9ydHMuUkVDT1JEUlRDID0gUkVDT1JEUlRDO1xuZXhwb3J0cy5MSUJWT1JCSVNKUyA9IExJQlZPUkJJU0pTO1xuZXhwb3J0cy5SRUNPUkRFUkpTID0gUkVDT1JERVJKUztcbmV4cG9ydHMuTEFNRUpTID0gTEFNRUpTO1xuZXhwb3J0cy5PUFVTUkVDT1JERVIgPSBPUFVTUkVDT1JERVI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG4vKipcbiAqIEBmaWxlIHJlY29yZC1tb2RlLmpzXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuXG4vLyByZWNvcmRlciBtb2Rlc1xudmFyIElNQUdFX09OTFkgPSAnaW1hZ2Vfb25seSc7XG52YXIgQVVESU9fT05MWSA9ICdhdWRpb19vbmx5JztcbnZhciBWSURFT19PTkxZID0gJ3ZpZGVvX29ubHknO1xudmFyIEFVRElPX1ZJREVPID0gJ2F1ZGlvX3ZpZGVvJztcbnZhciBBTklNQVRJT04gPSAnYW5pbWF0aW9uJztcblxudmFyIGdldFJlY29yZGVyTW9kZSA9IGZ1bmN0aW9uIGdldFJlY29yZGVyTW9kZShpbWFnZSwgYXVkaW8sIHZpZGVvLCBhbmltYXRpb24pIHtcbiAgICBpZiAoaXNNb2RlRW5hYmxlZChpbWFnZSkpIHtcbiAgICAgICAgcmV0dXJuIElNQUdFX09OTFk7XG4gICAgfSBlbHNlIGlmIChpc01vZGVFbmFibGVkKGFuaW1hdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIEFOSU1BVElPTjtcbiAgICB9IGVsc2UgaWYgKGlzTW9kZUVuYWJsZWQoYXVkaW8pICYmICFpc01vZGVFbmFibGVkKHZpZGVvKSkge1xuICAgICAgICByZXR1cm4gQVVESU9fT05MWTtcbiAgICB9IGVsc2UgaWYgKGlzTW9kZUVuYWJsZWQoYXVkaW8pICYmIGlzTW9kZUVuYWJsZWQodmlkZW8pKSB7XG4gICAgICAgIHJldHVybiBBVURJT19WSURFTztcbiAgICB9IGVsc2UgaWYgKCFpc01vZGVFbmFibGVkKGF1ZGlvKSAmJiBpc01vZGVFbmFibGVkKHZpZGVvKSkge1xuICAgICAgICByZXR1cm4gVklERU9fT05MWTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFJldHVybiBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciBtb2RlIGlzIGVuYWJsZWQgb3Igbm90LlxuICovXG52YXIgaXNNb2RlRW5hYmxlZCA9IGZ1bmN0aW9uIGlzTW9kZUVuYWJsZWQobW9kZSkge1xuICAgIHJldHVybiBtb2RlID09PSBPYmplY3QobW9kZSkgfHwgbW9kZSA9PT0gdHJ1ZTtcbn07XG5cbmV4cG9ydHMuZ2V0UmVjb3JkZXJNb2RlID0gZ2V0UmVjb3JkZXJNb2RlO1xuZXhwb3J0cy5JTUFHRV9PTkxZID0gSU1BR0VfT05MWTtcbmV4cG9ydHMuQVVESU9fT05MWSA9IEFVRElPX09OTFk7XG5leHBvcnRzLlZJREVPX09OTFkgPSBWSURFT19PTkxZO1xuZXhwb3J0cy5BVURJT19WSURFTyA9IEFVRElPX1ZJREVPO1xuZXhwb3J0cy5BTklNQVRJT04gPSBBTklNQVRJT047IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KG9iamVjdCwgcHJvcGVydHksIHJlY2VpdmVyKSB7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyByZXR1cm4gZ2V0KHBhcmVudCwgcHJvcGVydHksIHJlY2VpdmVyKTsgfSB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfTtcblxudmFyIF9yZWNvcmRFbmdpbmUgPSByZXF1aXJlKCcuL3JlY29yZC1lbmdpbmUnKTtcblxudmFyIF9kZXRlY3RCcm93c2VyID0gcmVxdWlyZSgnLi4vdXRpbHMvZGV0ZWN0LWJyb3dzZXInKTtcblxudmFyIF9yZWNvcmRNb2RlID0gcmVxdWlyZSgnLi9yZWNvcmQtbW9kZScpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9IC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogQGZpbGUgcmVjb3JkLXJ0Yy5qc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogQHNpbmNlIDIuMC4wXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblxudmFyIENvbXBvbmVudCA9IHZpZGVvanMuZ2V0Q29tcG9uZW50KCdDb21wb25lbnQnKTtcblxuLyoqXG4gKiBFbmdpbmUgdXNlZCB3aXRoIHRoZSBNUmVjb3JkUlRDIGNsYXNzIGluIHRoZSBSZWNvcmRSVEMgbGlicmFyeS5cbiAqXG4gKiBAY2xhc3NcbiAqIEBhdWdtZW50cyB2aWRlb2pzLlJlY29yZEVuZ2luZVxuICovXG5cbnZhciBSZWNvcmRSVENFbmdpbmUgPSBmdW5jdGlvbiAoX1JlY29yZEVuZ2luZSkge1xuICAgIF9pbmhlcml0cyhSZWNvcmRSVENFbmdpbmUsIF9SZWNvcmRFbmdpbmUpO1xuXG4gICAgZnVuY3Rpb24gUmVjb3JkUlRDRW5naW5lKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUmVjb3JkUlRDRW5naW5lKTtcblxuICAgICAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFJlY29yZFJUQ0VuZ2luZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFJlY29yZFJUQ0VuZ2luZSkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhSZWNvcmRSVENFbmdpbmUsIFt7XG4gICAgICAgIGtleTogJ3NldHVwJyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXR1cCByZWNvcmRpbmcgZW5naW5lLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldHVwKHN0cmVhbSwgbWVkaWFUeXBlLCBkZWJ1Zykge1xuICAgICAgICAgICAgdGhpcy5pbnB1dFN0cmVhbSA9IHN0cmVhbTtcbiAgICAgICAgICAgIHRoaXMubWVkaWFUeXBlID0gbWVkaWFUeXBlO1xuICAgICAgICAgICAgdGhpcy5kZWJ1ZyA9IGRlYnVnO1xuXG4gICAgICAgICAgICAvLyBzZXR1cCBSZWNvcmRSVENcbiAgICAgICAgICAgIHRoaXMuZW5naW5lID0gbmV3IFJlY29yZFJUQy5NUmVjb3JkUlRDKCk7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5tZWRpYVR5cGUgPSB0aGlzLm1lZGlhVHlwZTtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lLmRpc2FibGVMb2dzID0gIXRoaXMuZGVidWc7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5taW1lVHlwZSA9IHRoaXMubWltZVR5cGU7XG5cbiAgICAgICAgICAgIC8vIGF1ZGlvIHNldHRpbmdzXG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5idWZmZXJTaXplID0gdGhpcy5idWZmZXJTaXplO1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUuc2FtcGxlUmF0ZSA9IHRoaXMuc2FtcGxlUmF0ZTtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lLm51bWJlck9mQXVkaW9DaGFubmVscyA9IHRoaXMuYXVkaW9DaGFubmVscztcblxuICAgICAgICAgICAgLy8gdmlkZW8vY2FudmFzIHNldHRpbmdzXG4gICAgICAgICAgICB0aGlzLmVuZ2luZS52aWRlbyA9IHRoaXMudmlkZW87XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5jYW52YXMgPSB0aGlzLmNhbnZhcztcblxuICAgICAgICAgICAgLy8gYW5pbWF0ZWQgZ2lmIHNldHRpbmdzXG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5xdWFsaXR5ID0gdGhpcy5xdWFsaXR5O1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUuZnJhbWVSYXRlID0gdGhpcy5mcmFtZVJhdGU7XG4gICAgICAgICAgICBpZiAodGhpcy5vblRpbWVTdGFtcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUudGltZVNsaWNlID0gdGhpcy50aW1lU2xpY2U7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUub25UaW1lU3RhbXAgPSB0aGlzLm9uVGltZVN0YW1wO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjb25uZWN0IHN0cmVhbSB0byByZWNvcmRpbmcgZW5naW5lXG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5hZGRTdHJlYW0odGhpcy5pbnB1dFN0cmVhbSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIGFueSB0ZW1wb3JhcnkgZGF0YSBhbmQgcmVmZXJlbmNlcyB0byBzdHJlYW1zLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZGlzcG9zZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgICAgICAgICAgX2dldChSZWNvcmRSVENFbmdpbmUucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoUmVjb3JkUlRDRW5naW5lLnByb3RvdHlwZSksICdkaXNwb3NlJywgdGhpcykuY2FsbCh0aGlzKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmVuZ2luZS5kZXN0cm95ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0YXJ0IHJlY29yZGluZy5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3N0YXJ0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUuc3RhcnRSZWNvcmRpbmcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9wIHJlY29yZGluZy4gUmVzdWx0IHdpbGwgYmUgYXZhaWxhYmxlIGFzeW5jIHdoZW4gb25TdG9wUmVjb3JkaW5nXG4gICAgICAgICAqIGlzIGNhbGxlZC5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3N0b3AnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lLnN0b3BSZWNvcmRpbmcodGhpcy5vblN0b3BSZWNvcmRpbmcuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUGF1c2UgcmVjb3JkaW5nLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncGF1c2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5wYXVzZVJlY29yZGluZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlc3VtZSByZWNvcmRpbmcuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZXN1bWUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVzdW1lKCkge1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUucmVzdW1lUmVjb3JkaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2hvdyBzYXZlIGFzIGRpYWxvZyBpbiBicm93c2VyIHNvIHRoZSB1c2VyIGNhbiBzdG9yZSB0aGUgcmVjb3JkZWQgbWVkaWFcbiAgICAgICAgICogbG9jYWxseS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IG5hbWUgLSBPYmplY3Qgd2l0aCBuYW1lcyBmb3IgdGhlIHBhcnRpY3VsYXIgYmxvYihzKVxuICAgICAgICAgKiAgICAgeW91IHdhbnQgdG8gc2F2ZS4gRmlsZSBleHRlbnNpb25zIGFyZSBhZGRlZCBhdXRvbWF0aWNhbGx5LiBGb3JcbiAgICAgICAgICogICAgIGV4YW1wbGU6IHsndmlkZW8nOiAnbmFtZS1vZi12aWRlby1maWxlJ30uIFN1cHBvcnRlZCBrZXlzIGFyZVxuICAgICAgICAgKiAgICAgJ2F1ZGlvJywgJ3ZpZGVvJyBhbmQgJ2dpZicuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzYXZlQXMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2F2ZUFzKG5hbWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVuZ2luZSAmJiBuYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZS5zYXZlKG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEludm9rZWQgd2hlbiByZWNvcmRpbmcgaXMgc3RvcHBlZCBhbmQgcmVzdWx0aW5nIHN0cmVhbSBpcyBhdmFpbGFibGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhdWRpb1ZpZGVvVVJMIC0gUmVmZXJlbmNlIHRvIHRoZSByZWNvcmRlZCBCbG9iXG4gICAgICAgICAqICAgICBvYmplY3QsIGUuZy4gJ2Jsb2I6aHR0cDovL2xvY2FsaG9zdDo4MDgwLzEwMTAwMDE2LTQyNDgtOTk0OS1iMGQ2LTBiYjQwZGI1NmViYSdcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBNZWRpYSB0eXBlLCBlZy4gJ3ZpZGVvJyBvciAnYXVkaW8nLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnb25TdG9wUmVjb3JkaW5nJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uU3RvcFJlY29yZGluZyhhdWRpb1ZpZGVvVVJMLCB0eXBlKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgLy8gc3RvcmUgcmVmZXJlbmNlIHRvIHJlY29yZGVkIHN0cmVhbSBVUkxcbiAgICAgICAgICAgIHRoaXMubWVkaWFVUkwgPSBhdWRpb1ZpZGVvVVJMO1xuXG4gICAgICAgICAgICAvLyBzdG9yZSByZWZlcmVuY2UgdG8gcmVjb3JkZWQgc3RyZWFtIGRhdGFcbiAgICAgICAgICAgIHZhciByZWNvcmRUeXBlID0gdGhpcy5wbGF5ZXIoKS5yZWNvcmQoKS5nZXRSZWNvcmRUeXBlKCk7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5nZXRCbG9iKGZ1bmN0aW9uIChyZWNvcmRpbmcpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHJlY29yZFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBfcmVjb3JkTW9kZS5BVURJT19PTkxZOlxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMyLnJlY29yZGVkRGF0YSA9IHJlY29yZGluZy5hdWRpbztcblxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMyLmFkZEZpbGVJbmZvKF90aGlzMi5yZWNvcmRlZERhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBub3RpZnkgbGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpczIudHJpZ2dlcigncmVjb3JkQ29tcGxldGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZE1vZGUuVklERU9fT05MWTpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBfcmVjb3JkTW9kZS5BVURJT19WSURFTzpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gcmVjb3JkaW5nIGJvdGggYXVkaW8gYW5kIHZpZGVvLCByZWNvcmRydGNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbGxzIHRoaXMgdHdpY2Ugb24gY2hyb21lLCBmaXJzdCB3aXRoIGF1ZGlvIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCB0aGVuIHdpdGggdmlkZW8gZGF0YS5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uIGZpcmVmb3ggaXQncyBjYWxsZWQgb25jZSBidXQgd2l0aCBhIHNpbmdsZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmxvYiB0aGF0IGluY2x1ZGVzIGJvdGggYXVkaW8gYW5kIHZpZGVvIGRhdGEuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVjb3JkaW5nLnZpZGVvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkYXRhIGlzIHZpZGVvLW9ubHkgYnV0IG9uIGZpcmVmb3ggYXVkaW8rdmlkZW9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpczIucmVjb3JkZWREYXRhID0gcmVjb3JkaW5nLnZpZGVvO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb24gdGhlIGNocm9tZSBicm93c2VyIHR3byBibG9icyBhcmUgY3JlYXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnRhaW5pbmcgdGhlIHNlcGFyYXRlIGF1ZGlvL3ZpZGVvIHN0cmVhbXMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlY29yZFR5cGUgPT09IF9yZWNvcmRNb2RlLkFVRElPX1ZJREVPICYmICgwLCBfZGV0ZWN0QnJvd3Nlci5pc0Nocm9tZSkoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdG9yZSBib3RoIGF1ZGlvIGFuZCB2aWRlb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpczIucmVjb3JkZWREYXRhID0gcmVjb3JkaW5nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG10eXBlIGluIF90aGlzMi5yZWNvcmRlZERhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMi5hZGRGaWxlSW5mbyhfdGhpczIucmVjb3JkZWREYXRhW210eXBlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpczIuYWRkRmlsZUluZm8oX3RoaXMyLnJlY29yZGVkRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm90aWZ5IGxpc3RlbmVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMi50cmlnZ2VyKCdyZWNvcmRDb21wbGV0ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBfcmVjb3JkTW9kZS5BTklNQVRJT046XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpczIucmVjb3JkZWREYXRhID0gcmVjb3JkaW5nLmdpZjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMyLmFkZEZpbGVJbmZvKF90aGlzMi5yZWNvcmRlZERhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBub3RpZnkgbGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpczIudHJpZ2dlcigncmVjb3JkQ29tcGxldGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFJlY29yZFJUQ0VuZ2luZTtcbn0oX3JlY29yZEVuZ2luZS5SZWNvcmRFbmdpbmUpO1xuXG4vLyBleHBvc2UgcGx1Z2luXG5cblxudmlkZW9qcy5SZWNvcmRSVENFbmdpbmUgPSBSZWNvcmRSVENFbmdpbmU7XG5cbkNvbXBvbmVudC5yZWdpc3RlckNvbXBvbmVudCgnUmVjb3JkUlRDRW5naW5lJywgUmVjb3JkUlRDRW5naW5lKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUmVjb3JkUlRDRW5naW5lOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuLyoqXG4gKiBAZmlsZSBicm93c2VyLXNoaW0uanNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5cbnZhciBzZXRTcmNPYmplY3QgPSBmdW5jdGlvbiBzZXRTcmNPYmplY3Qoc3RyZWFtLCBlbGVtZW50LCBpZ25vcmVDcmVhdGVPYmplY3RVUkwpIHtcbiAgICBpZiAoJ2NyZWF0ZU9iamVjdFVSTCcgaW4gVVJMICYmICFpZ25vcmVDcmVhdGVPYmplY3RVUkwpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBzZXRTcmNPYmplY3Qoc3RyZWFtLCBlbGVtZW50LCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoJ3NyY09iamVjdCcgaW4gZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IHN0cmVhbTtcbiAgICB9IGVsc2UgaWYgKCdtb3pTcmNPYmplY3QnIGluIGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5tb3pTcmNPYmplY3QgPSBzdHJlYW07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZU9iamVjdFVSTC9zcmNPYmplY3QgYm90aCBhcmUgbm90IHN1cHBvcnRlZC4nKTtcbiAgICB9XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBzZXRTcmNPYmplY3Q7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmlzU2FmYXJpID0gZXhwb3J0cy5pc0Nocm9tZSA9IGV4cG9ydHMuaXNPcGVyYSA9IGV4cG9ydHMuaXNFZGdlID0gZXhwb3J0cy5kZXRlY3RCcm93c2VyID0gdW5kZWZpbmVkO1xuXG52YXIgX3dpbmRvdyA9IHJlcXVpcmUoJ2dsb2JhbC93aW5kb3cnKTtcblxudmFyIF93aW5kb3cyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2luZG93KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBCcm93c2VyIGRldGVjdG9yLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJuIHtvYmplY3R9IHJlc3VsdCBjb250YWluaW5nIGJyb3dzZXIsIHZlcnNpb24gYW5kIG1pblZlcnNpb25cbiAqICAgICBwcm9wZXJ0aWVzLlxuICovXG52YXIgZGV0ZWN0QnJvd3NlciA9IGZ1bmN0aW9uIGRldGVjdEJyb3dzZXIoKSB7XG4gICAgLy8gcmV0dXJuZWQgcmVzdWx0IG9iamVjdFxuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICByZXN1bHQuYnJvd3NlciA9IG51bGw7XG4gICAgcmVzdWx0LnZlcnNpb24gPSBudWxsO1xuICAgIHJlc3VsdC5taW5WZXJzaW9uID0gbnVsbDtcblxuICAgIC8vIGZhaWwgZWFybHkgaWYgaXQncyBub3QgYSBicm93c2VyXG4gICAgaWYgKHR5cGVvZiBfd2luZG93Mi5kZWZhdWx0ID09PSAndW5kZWZpbmVkJyB8fCAhX3dpbmRvdzIuZGVmYXVsdC5uYXZpZ2F0b3IpIHtcbiAgICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnTm90IGEgc3VwcG9ydGVkIGJyb3dzZXIuJztcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvLyBGaXJlZm94XG4gICAgaWYgKG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEpIHtcbiAgICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnZmlyZWZveCc7XG4gICAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCwgL0ZpcmVmb3hcXC8oXFxkKylcXC4vLCAxKTtcbiAgICAgICAgcmVzdWx0Lm1pblZlcnNpb24gPSAzMTtcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEpIHtcbiAgICAgICAgLy8gQ2hyb21lLCBDaHJvbWl1bSwgV2VidmlldywgT3BlcmFcbiAgICAgICAgaWYgKF93aW5kb3cyLmRlZmF1bHQud2Via2l0UlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgICAgICAgIHJlc3VsdC5icm93c2VyID0gJ2Nocm9tZSc7XG4gICAgICAgICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsIC9DaHJvbShlfGl1bSlcXC8oXFxkKylcXC4vLCAyKTtcbiAgICAgICAgICAgIHJlc3VsdC5taW5WZXJzaW9uID0gMzg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBTYWZhcmkgKGluIGFuIHVucHVibGlzaGVkIHZlcnNpb24pIG9yIHVua25vd24gd2Via2l0LWJhc2VkLlxuICAgICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1ZlcnNpb25cXC8oXFxkKykuKFxcZCspLykpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuYnJvd3NlciA9ICdzYWZhcmknO1xuICAgICAgICAgICAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCwgL0FwcGxlV2ViS2l0XFwvKFxcZCspXFwuLywgMSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0Lm1pblZlcnNpb24gPSAxMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gdW5rbm93biB3ZWJraXQtYmFzZWQgYnJvd3Nlci5cbiAgICAgICAgICAgICAgICByZXN1bHQuYnJvd3NlciA9ICdVbnN1cHBvcnRlZCB3ZWJraXQtYmFzZWQgYnJvd3NlciAnICsgJ3dpdGggR1VNIHN1cHBvcnQgYnV0IG5vIFdlYlJUQyBzdXBwb3J0Lic7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBFZGdlXG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzICYmIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKykuKFxcZCspJC8pKSB7XG4gICAgICAgIHJlc3VsdC5icm93c2VyID0gJ2VkZ2UnO1xuICAgICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsIC9FZGdlXFwvKFxcZCspLihcXGQrKSQvLCAyKTtcbiAgICAgICAgcmVzdWx0Lm1pblZlcnNpb24gPSAxMDU0NztcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQXBwbGVXZWJLaXRcXC8oXFxkKylcXC4vKSkge1xuICAgICAgICAvLyBTYWZhcmksIHdpdGggd2Via2l0R2V0VXNlck1lZGlhIHJlbW92ZWQuXG4gICAgICAgIHJlc3VsdC5icm93c2VyID0gJ3NhZmFyaSc7XG4gICAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCwgL0FwcGxlV2ViS2l0XFwvKFxcZCspXFwuLywgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZGVmYXVsdCBmYWxsdGhyb3VnaDogbm90IHN1cHBvcnRlZC5cbiAgICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnTm90IGEgc3VwcG9ydGVkIGJyb3dzZXIuJztcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBFeHRyYWN0IGJyb3dzZXIgdmVyc2lvbiBvdXQgb2YgdGhlIHByb3ZpZGVkIHVzZXIgYWdlbnQgc3RyaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyFzdHJpbmd9IHVhc3RyaW5nIC0gdXNlckFnZW50IHN0cmluZy5cbiAqIEBwYXJhbSB7IXN0cmluZ30gZXhwciAtIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIGFzIG1hdGNoIGNyaXRlcmlhLlxuICogQHBhcmFtIHshbnVtYmVyfSBwb3MgLSBwb3NpdGlvbiBpbiB0aGUgdmVyc2lvbiBzdHJpbmcgdG8gYmVcbiAqICAgICByZXR1cm5lZC5cbiAqIEByZXR1cm4geyFudW1iZXJ9IGJyb3dzZXIgdmVyc2lvbi5cbiAqL1xuLyoqXG4gKiBAZmlsZSBkZXRlY3QtYnJvd3Nlci5qc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cblxudmFyIGV4dHJhY3RWZXJzaW9uID0gZnVuY3Rpb24gZXh0cmFjdFZlcnNpb24odWFzdHJpbmcsIGV4cHIsIHBvcykge1xuICAgIHZhciBtYXRjaCA9IHVhc3RyaW5nLm1hdGNoKGV4cHIpO1xuICAgIHJldHVybiBtYXRjaCAmJiBtYXRjaC5sZW5ndGggPj0gcG9zICYmIHBhcnNlSW50KG1hdGNoW3Bvc10sIDEwKTtcbn07XG5cbnZhciBpc0VkZ2UgPSBmdW5jdGlvbiBpc0VkZ2UoKSB7XG4gICAgcmV0dXJuIGRldGVjdEJyb3dzZXIoKS5icm93c2VyID09PSAnZWRnZSc7XG59O1xuXG52YXIgaXNTYWZhcmkgPSBmdW5jdGlvbiBpc1NhZmFyaSgpIHtcbiAgICByZXR1cm4gZGV0ZWN0QnJvd3NlcigpLmJyb3dzZXIgPT09ICdzYWZhcmknO1xufTtcblxudmFyIGlzT3BlcmEgPSBmdW5jdGlvbiBpc09wZXJhKCkge1xuICAgIHJldHVybiAhIV93aW5kb3cyLmRlZmF1bHQub3BlcmEgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdPUFIvJykgIT09IC0xO1xufTtcblxudmFyIGlzQ2hyb21lID0gZnVuY3Rpb24gaXNDaHJvbWUoKSB7XG4gICAgcmV0dXJuIGRldGVjdEJyb3dzZXIoKS5icm93c2VyID09PSAnY2hyb21lJztcbn07XG5cbmV4cG9ydHMuZGV0ZWN0QnJvd3NlciA9IGRldGVjdEJyb3dzZXI7XG5leHBvcnRzLmlzRWRnZSA9IGlzRWRnZTtcbmV4cG9ydHMuaXNPcGVyYSA9IGlzT3BlcmE7XG5leHBvcnRzLmlzQ2hyb21lID0gaXNDaHJvbWU7XG5leHBvcnRzLmlzU2FmYXJpID0gaXNTYWZhcmk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG4vKipcbiAqIEBmaWxlIGZvcm1hdC10aW1lLmpzXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuXG4vKipcbiAqIEZvcm1hdCBzZWNvbmRzIGFzIGEgdGltZSBzdHJpbmcsIEg6TU06U1MsIE06U1Mgb3IgTTpTUzpNTU0uXG4gKlxuICogU3VwcGx5aW5nIGEgZ3VpZGUgKGluIHNlY29uZHMpIHdpbGwgZm9yY2UgYSBudW1iZXIgb2YgbGVhZGluZyB6ZXJvc1xuICogdG8gY292ZXIgdGhlIGxlbmd0aCBvZiB0aGUgZ3VpZGUuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHNlY29uZHMgLSBOdW1iZXIgb2Ygc2Vjb25kcyB0byBiZSB0dXJuZWQgaW50byBhXG4gKiAgICAgc3RyaW5nLlxuICogQHBhcmFtIHtudW1iZXJ9IGd1aWRlIC0gTnVtYmVyIChpbiBzZWNvbmRzKSB0byBtb2RlbCB0aGUgc3RyaW5nXG4gKiAgICAgYWZ0ZXIuXG4gKiBAcGFyYW0ge251bWJlcn0gbXNEaXNwbGF5TWF4IC0gTnVtYmVyIChpbiBtaWxsaXNlY29uZHMpIHRvIG1vZGVsIHRoZSBzdHJpbmdcbiAqICAgICBhZnRlci5cbiAqIEByZXR1cm4ge3N0cmluZ30gVGltZSBmb3JtYXR0ZWQgYXMgSDpNTTpTUywgTTpTUyBvciBNOlNTOk1NTSwgZS5nLlxuICogICAgIDA6MDA6MTIuXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgZm9ybWF0VGltZSA9IGZ1bmN0aW9uIGZvcm1hdFRpbWUoc2Vjb25kcywgZ3VpZGUsIG1zRGlzcGxheU1heCkge1xuICAgIC8vIERlZmF1bHQgdG8gdXNpbmcgc2Vjb25kcyBhcyBndWlkZVxuICAgIHNlY29uZHMgPSBzZWNvbmRzIDwgMCA/IDAgOiBzZWNvbmRzO1xuICAgIGd1aWRlID0gZ3VpZGUgfHwgc2Vjb25kcztcbiAgICB2YXIgcyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAlIDYwKSxcbiAgICAgICAgbSA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwICUgNjApLFxuICAgICAgICBoID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMzYwMCksXG4gICAgICAgIGdtID0gTWF0aC5mbG9vcihndWlkZSAvIDYwICUgNjApLFxuICAgICAgICBnaCA9IE1hdGguZmxvb3IoZ3VpZGUgLyAzNjAwKSxcbiAgICAgICAgbXMgPSBNYXRoLmZsb29yKChzZWNvbmRzIC0gcykgKiAxMDAwKTtcblxuICAgIC8vIGhhbmRsZSBpbnZhbGlkIHRpbWVzXG4gICAgaWYgKGlzTmFOKHNlY29uZHMpIHx8IHNlY29uZHMgPT09IEluZmluaXR5KSB7XG4gICAgICAgIC8vICctJyBpcyBmYWxzZSBmb3IgYWxsIHJlbGF0aW9uYWwgb3BlcmF0b3JzIChlLmcuIDwsID49KSBzbyB0aGlzXG4gICAgICAgIC8vIHNldHRpbmcgd2lsbCBhZGQgdGhlIG1pbmltdW0gbnVtYmVyIG9mIGZpZWxkcyBzcGVjaWZpZWQgYnkgdGhlXG4gICAgICAgIC8vIGd1aWRlXG4gICAgICAgIGggPSBtID0gcyA9IG1zID0gJy0nO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIHdlIG5lZWQgdG8gc2hvdyBtaWxsaXNlY29uZHNcbiAgICBpZiAoZ3VpZGUgPiAwICYmIGd1aWRlIDwgbXNEaXNwbGF5TWF4KSB7XG4gICAgICAgIGlmIChtcyA8IDEwMCkge1xuICAgICAgICAgICAgaWYgKG1zIDwgMTApIHtcbiAgICAgICAgICAgICAgICBtcyA9ICcwMCcgKyBtcztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbXMgPSAnMCcgKyBtcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtcyA9ICc6JyArIG1zO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG1zID0gJyc7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgd2UgbmVlZCB0byBzaG93IGhvdXJzXG4gICAgaCA9IGggPiAwIHx8IGdoID4gMCA/IGggKyAnOicgOiAnJztcblxuICAgIC8vIElmIGhvdXJzIGFyZSBzaG93aW5nLCB3ZSBtYXkgbmVlZCB0byBhZGQgYSBsZWFkaW5nIHplcm8uXG4gICAgLy8gQWx3YXlzIHNob3cgYXQgbGVhc3Qgb25lIGRpZ2l0IG9mIG1pbnV0ZXMuXG4gICAgbSA9ICgoaCB8fCBnbSA+PSAxMCkgJiYgbSA8IDEwID8gJzAnICsgbSA6IG0pICsgJzonO1xuXG4gICAgLy8gQ2hlY2sgaWYgbGVhZGluZyB6ZXJvIGlzIG5lZWQgZm9yIHNlY29uZHNcbiAgICBzID0gcyA8IDEwID8gJzAnICsgcyA6IHM7XG5cbiAgICByZXR1cm4gaCArIG0gKyBzICsgbXM7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmb3JtYXRUaW1lOyIsInZhciB3aW47XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgd2luID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgd2luID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgd2luID0gc2VsZjtcbn0gZWxzZSB7XG4gICAgd2luID0ge307XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2luO1xuIl19
