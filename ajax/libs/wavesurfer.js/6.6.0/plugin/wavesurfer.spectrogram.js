/*!
 * wavesurfer.js spectrogram plugin 6.6.0 (2023-03-14)
 * https://wavesurfer-js.org
 * @license BSD-3-Clause
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("WaveSurfer", [], factory);
	else if(typeof exports === 'object')
		exports["WaveSurfer"] = factory();
	else
		root["WaveSurfer"] = root["WaveSurfer"] || {}, root["WaveSurfer"]["spectrogram"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/plugin/spectrogram/fft.js":
/*!***************************************!*\
  !*** ./src/plugin/spectrogram/fft.js ***!
  \***************************************/
/***/ ((module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = FFT;
/* eslint-disable complexity, no-redeclare, no-var, one-var */

/**
 * Calculate FFT - Based on https://github.com/corbanbrook/dsp.js
 *
 * @param {Number} bufferSize Buffer size
 * @param {Number} sampleRate Sample rate
 * @param {Function} windowFunc Window function
 * @param {Number} alpha Alpha channel
 */
function FFT(bufferSize, sampleRate, windowFunc, alpha) {
  this.bufferSize = bufferSize;
  this.sampleRate = sampleRate;
  this.bandwidth = 2 / bufferSize * (sampleRate / 2);
  this.sinTable = new Float32Array(bufferSize);
  this.cosTable = new Float32Array(bufferSize);
  this.windowValues = new Float32Array(bufferSize);
  this.reverseTable = new Uint32Array(bufferSize);
  this.peakBand = 0;
  this.peak = 0;
  var i;
  switch (windowFunc) {
    case 'bartlett':
      for (i = 0; i < bufferSize; i++) {
        this.windowValues[i] = 2 / (bufferSize - 1) * ((bufferSize - 1) / 2 - Math.abs(i - (bufferSize - 1) / 2));
      }
      break;
    case 'bartlettHann':
      for (i = 0; i < bufferSize; i++) {
        this.windowValues[i] = 0.62 - 0.48 * Math.abs(i / (bufferSize - 1) - 0.5) - 0.38 * Math.cos(Math.PI * 2 * i / (bufferSize - 1));
      }
      break;
    case 'blackman':
      alpha = alpha || 0.16;
      for (i = 0; i < bufferSize; i++) {
        this.windowValues[i] = (1 - alpha) / 2 - 0.5 * Math.cos(Math.PI * 2 * i / (bufferSize - 1)) + alpha / 2 * Math.cos(4 * Math.PI * i / (bufferSize - 1));
      }
      break;
    case 'cosine':
      for (i = 0; i < bufferSize; i++) {
        this.windowValues[i] = Math.cos(Math.PI * i / (bufferSize - 1) - Math.PI / 2);
      }
      break;
    case 'gauss':
      alpha = alpha || 0.25;
      for (i = 0; i < bufferSize; i++) {
        this.windowValues[i] = Math.pow(Math.E, -0.5 * Math.pow((i - (bufferSize - 1) / 2) / (alpha * (bufferSize - 1) / 2), 2));
      }
      break;
    case 'hamming':
      for (i = 0; i < bufferSize; i++) {
        this.windowValues[i] = 0.54 - 0.46 * Math.cos(Math.PI * 2 * i / (bufferSize - 1));
      }
      break;
    case 'hann':
    case undefined:
      for (i = 0; i < bufferSize; i++) {
        this.windowValues[i] = 0.5 * (1 - Math.cos(Math.PI * 2 * i / (bufferSize - 1)));
      }
      break;
    case 'lanczoz':
      for (i = 0; i < bufferSize; i++) {
        this.windowValues[i] = Math.sin(Math.PI * (2 * i / (bufferSize - 1) - 1)) / (Math.PI * (2 * i / (bufferSize - 1) - 1));
      }
      break;
    case 'rectangular':
      for (i = 0; i < bufferSize; i++) {
        this.windowValues[i] = 1;
      }
      break;
    case 'triangular':
      for (i = 0; i < bufferSize; i++) {
        this.windowValues[i] = 2 / bufferSize * (bufferSize / 2 - Math.abs(i - (bufferSize - 1) / 2));
      }
      break;
    default:
      throw Error("No such window function '" + windowFunc + "'");
  }
  var limit = 1;
  var bit = bufferSize >> 1;
  var i;
  while (limit < bufferSize) {
    for (i = 0; i < limit; i++) {
      this.reverseTable[i + limit] = this.reverseTable[i] + bit;
    }
    limit = limit << 1;
    bit = bit >> 1;
  }
  for (i = 0; i < bufferSize; i++) {
    this.sinTable[i] = Math.sin(-Math.PI / i);
    this.cosTable[i] = Math.cos(-Math.PI / i);
  }
  this.calculateSpectrum = function (buffer) {
    // Locally scope variables for speed up
    var bufferSize = this.bufferSize,
      cosTable = this.cosTable,
      sinTable = this.sinTable,
      reverseTable = this.reverseTable,
      real = new Float32Array(bufferSize),
      imag = new Float32Array(bufferSize),
      bSi = 2 / this.bufferSize,
      sqrt = Math.sqrt,
      rval,
      ival,
      mag,
      spectrum = new Float32Array(bufferSize / 2);
    var k = Math.floor(Math.log(bufferSize) / Math.LN2);
    if (Math.pow(2, k) !== bufferSize) {
      throw 'Invalid buffer size, must be a power of 2.';
    }
    if (bufferSize !== buffer.length) {
      throw 'Supplied buffer is not the same size as defined FFT. FFT Size: ' + bufferSize + ' Buffer Size: ' + buffer.length;
    }
    var halfSize = 1,
      phaseShiftStepReal,
      phaseShiftStepImag,
      currentPhaseShiftReal,
      currentPhaseShiftImag,
      off,
      tr,
      ti,
      tmpReal;
    for (var i = 0; i < bufferSize; i++) {
      real[i] = buffer[reverseTable[i]] * this.windowValues[reverseTable[i]];
      imag[i] = 0;
    }
    while (halfSize < bufferSize) {
      phaseShiftStepReal = cosTable[halfSize];
      phaseShiftStepImag = sinTable[halfSize];
      currentPhaseShiftReal = 1;
      currentPhaseShiftImag = 0;
      for (var fftStep = 0; fftStep < halfSize; fftStep++) {
        var i = fftStep;
        while (i < bufferSize) {
          off = i + halfSize;
          tr = currentPhaseShiftReal * real[off] - currentPhaseShiftImag * imag[off];
          ti = currentPhaseShiftReal * imag[off] + currentPhaseShiftImag * real[off];
          real[off] = real[i] - tr;
          imag[off] = imag[i] - ti;
          real[i] += tr;
          imag[i] += ti;
          i += halfSize << 1;
        }
        tmpReal = currentPhaseShiftReal;
        currentPhaseShiftReal = tmpReal * phaseShiftStepReal - currentPhaseShiftImag * phaseShiftStepImag;
        currentPhaseShiftImag = tmpReal * phaseShiftStepImag + currentPhaseShiftImag * phaseShiftStepReal;
      }
      halfSize = halfSize << 1;
    }
    for (var i = 0, N = bufferSize / 2; i < N; i++) {
      rval = real[i];
      ival = imag[i];
      mag = bSi * sqrt(rval * rval + ival * ival);
      if (mag > this.peak) {
        this.peakBand = i;
        this.peak = mag;
      }
      spectrum[i] = mag;
    }
    return spectrum;
  };
}
module.exports = exports.default;

/***/ }),

/***/ "./src/plugin/spectrogram/index.js":
/*!*****************************************!*\
  !*** ./src/plugin/spectrogram/index.js ***!
  \*****************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _fft = _interopRequireDefault(__webpack_require__(/*! ./fft */ "./src/plugin/spectrogram/fft.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * @typedef {Object} SpectrogramPluginParams
 * @property {string|HTMLElement} container Selector of element or element in
 * which to render
 * @property {number} fftSamples=512 Number of samples to fetch to FFT. Must be
 * a power of 2.
 * @property {boolean} splitChannels=false Render with separate spectrograms for
 * the channels of the audio
 * @property {number} height=fftSamples/2 Height of the spectrogram view in CSS
 * pixels
 * @property {boolean} labels Set to true to display frequency labels.
 * @property {number} noverlap Size of the overlapping window. Must be <
 * fftSamples. Auto deduced from canvas size by default.
 * @property {string} windowFunc='hann' The window function to be used. One of
 * these: `'bartlett'`, `'bartlettHann'`, `'blackman'`, `'cosine'`, `'gauss'`,
 * `'hamming'`, `'hann'`, `'lanczoz'`, `'rectangular'`, `'triangular'`
 * @property {?number} alpha Some window functions have this extra value.
 * (Between 0 and 1)
 * @property {number} pixelRatio=wavesurfer.params.pixelRatio to control the
 * size of the spectrogram in relation with its canvas. 1 = Draw on the whole
 * canvas. 2 = Draw on a quarter (1/2 the length and 1/2 the width)
 * @property {number} frequencyMin=0 Min frequency to scale spectrogram.
 * @property {number} frequencyMax=12000 Max frequency to scale spectrogram.
 * Set this to samplerate/2 to draw whole range of spectrogram.
 * @property {?boolean} deferInit Set to true to manually call
 * `initPlugin('spectrogram')`
 * @property {?number[][]} colorMap A 256 long array of 4-element arrays.
 * Each entry should contain a float between 0 and 1 and specify
 * r, g, b, and alpha.
 */
/**
 * Render a spectrogram visualisation of the audio.
 *
 * @implements {PluginClass}
 * @extends {Observer}
 * @example
 * // es6
 * import SpectrogramPlugin from 'wavesurfer.spectrogram.js';
 *
 * // commonjs
 * var SpectrogramPlugin = require('wavesurfer.spectrogram.js');
 *
 * // if you are using <script> tags
 * var SpectrogramPlugin = window.WaveSurfer.spectrogram;
 *
 * // ... initialising wavesurfer with the plugin
 * var wavesurfer = WaveSurfer.create({
 *   // wavesurfer options ...
 *   plugins: [
 *     SpectrogramPlugin.create({
 *       // plugin options ...
 *     })
 *   ]
 * });
 */
var SpectrogramPlugin = /*#__PURE__*/function () {
  function SpectrogramPlugin(params, ws) {
    var _this = this;
    _classCallCheck(this, SpectrogramPlugin);
    this.params = params;
    this.wavesurfer = ws;
    this.util = ws.util;
    this.frequenciesDataUrl = params.frequenciesDataUrl;
    this._onScroll = function (e) {
      _this.updateScroll(e);
    };
    this._onRender = function () {
      _this.render();
    };
    this._onZoom = function () {
      _this.stretchCanvases();
    };
    this._onWrapperClick = function (e) {
      _this._wrapperClickHandler(e);
    };
    this._onReady = function () {
      var drawer = _this.drawer = ws.drawer;
      _this.container = 'string' == typeof params.container ? document.querySelector(params.container) : params.container;
      if (!_this.container) {
        throw Error('No container for WaveSurfer spectrogram');
      }
      if (params.colorMap) {
        if (params.colorMap.length < 256) {
          throw new Error('Colormap must contain 256 elements');
        }
        for (var i = 0; i < params.colorMap.length; i++) {
          var cmEntry = params.colorMap[i];
          if (cmEntry.length !== 4) {
            throw new Error('ColorMap entries must contain 4 values');
          }
        }
        _this.colorMap = params.colorMap;
      } else {
        _this.colorMap = [];
        for (var _i = 0; _i < 256; _i++) {
          var val = (255 - _i) / 256;
          _this.colorMap.push([val, val, val, 1]);
        }
      }
      _this.width = drawer.width;
      _this.pixelRatio = _this.params.pixelRatio || ws.params.pixelRatio;
      _this.fftSamples = _this.params.fftSamples || ws.params.fftSamples || 512;
      _this.height = _this.params.height || _this.fftSamples / 2;
      _this.noverlap = params.noverlap;
      _this.windowFunc = params.windowFunc;
      _this.alpha = params.alpha;
      _this.splitChannels = params.splitChannels;
      _this.channels = _this.splitChannels ? ws.backend.buffer.numberOfChannels : 1;
      _this.canvases = [];
      _this.canvasesTimeouts = [];
      _this.scrollLeftTracker = 0; //Tracks the desired scrollLeft value

      // Getting file's original samplerate is difficult(#1248).
      // So set 12kHz default to render like wavesurfer.js 5.x.
      _this.frequencyMin = params.frequencyMin || 0;
      _this.frequencyMax = params.frequencyMax || 12000;
      _this.createWrapper();
      _this.addCanvas();
      _this.render();
      drawer.wrapper.addEventListener('scroll', _this._onScroll);
      ws.on('zoom', _this._onZoom);
      ws.on('redraw', _this._onRender);
    };
  }
  _createClass(SpectrogramPlugin, [{
    key: "init",
    value: function init() {
      // Check if wavesurfer is ready
      if (this.wavesurfer.isReady) {
        this._onReady();
      } else {
        this.wavesurfer.once('ready', this._onReady);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unAll();
      this.wavesurfer.un('ready', this._onReady);
      this.wavesurfer.un('redraw', this._onRender);
      this.drawer && this.drawer.wrapper.removeEventListener('scroll', this._onScroll);
      this.wavesurfer = null;
      this.util = null;
      this.params = null;
      if (this.wrapper) {
        this.wrapper.removeEventListener('click', this._onWrapperClick);
        this.wrapper.parentNode.removeChild(this.wrapper);
        this.wrapper = null;
      }
    }
  }, {
    key: "createWrapper",
    value: function createWrapper() {
      var prevSpectrogram = this.container.querySelector('spectrogram');
      if (prevSpectrogram) {
        this.container.removeChild(prevSpectrogram);
      }
      var wsParams = this.wavesurfer.params;
      this.wrapper = document.createElement('spectrogram');
      // if labels are active
      if (this.params.labels) {
        var labelsEl = this.labelsEl = document.createElement('canvas');
        labelsEl.classList.add('spec-labels');
        this.drawer.style(labelsEl, {
          position: 'absolute',
          zIndex: 9,
          height: "".concat(this.height * this.channels, "px"),
          width: "55px"
        });
        this.wrapper.appendChild(labelsEl);
        this.loadLabels('rgba(68,68,68,0.5)', '12px', '10px', '', '#fff', '#f7f7f7', 'center', '#specLabels');
      }
      this.drawer.style(this.wrapper, {
        display: 'block',
        position: 'relative',
        userSelect: 'none',
        webkitUserSelect: 'none',
        height: "".concat(this.height * this.channels, "px")
      });
      if (wsParams.fillParent || wsParams.scrollParent) {
        this.drawer.style(this.wrapper, {
          width: '100%',
          overflowX: 'hidden',
          overflowY: 'hidden'
        });
      }
      this.container.appendChild(this.wrapper);
      this.wrapper.addEventListener('click', this._onWrapperClick);
    }
  }, {
    key: "_wrapperClickHandler",
    value: function _wrapperClickHandler(event) {
      event.preventDefault();
      var relX = 'offsetX' in event ? event.offsetX : event.layerX;
      this.fireEvent('click', relX / this.width || 0);
    }

    /**
     * Add a canvas to this.canvases
     */
  }, {
    key: "addCanvas",
    value: function addCanvas() {
      var canvas = this.wrapper.appendChild(document.createElement('canvas'));
      this.util.style(canvas, {
        position: 'absolute',
        zIndex: 4
      });
      this.canvases.push(canvas);
      this.canvasesTimeouts.push(null);
    }

    /**
     * Remove a canvas from this.canvases
     */
  }, {
    key: "removeCanvas",
    value: function removeCanvas() {
      //Stop drawing (if drawing)
      clearTimeout(this.canvasesTimeouts[this.canvasesTimeouts.length - 1]);
      var lastEntry = this.canvases[this.canvases.length - 1];
      lastEntry.parentElement.removeChild(lastEntry);
      this.canvases.pop();
      this.canvasesTimeouts.pop();
    }

    /**
     * Ensure the correct number of canvases for the size of the spectrogram
     */
  }, {
    key: "updateCanvases",
    value: function updateCanvases() {
      var canvasesRequired = Math.ceil(this.width / 4000);
      while (this.canvases.length < canvasesRequired) {
        this.addCanvas();
      }
      while (this.canvases.length > canvasesRequired) {
        this.removeCanvas();
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.updateCanvasStyle();
      if (this.frequenciesDataUrl) {
        this.loadFrequenciesData(this.frequenciesDataUrl);
      } else {
        this.getFrequencies(this.drawSpectrogram);
      }
    }
  }, {
    key: "updateCanvasStyle",
    value: function updateCanvasStyle() {
      this.updateCanvases();
      //width per canvas
      for (var i = 0; i < this.canvases.length; i++) {
        this.canvases[i].width = Math.round(this.width / this.canvases.length);
        this.canvases[i].height = this.fftSamples / 2 * this.channels;
        this.canvases[i].style.width = Math.round(this.canvases[i].width / this.pixelRatio) + 'px';
        this.canvases[i].style.height = this.height + 'px';
      }
    }
  }, {
    key: "drawSpectrogram",
    value: function drawSpectrogram(frequenciesData, my) {
      if (!isNaN(frequenciesData[0][0])) {
        // data is 1ch [sample, freq] format
        // to [channel, sample, freq] format
        frequenciesData = [frequenciesData];
      }
      my.updateCanvasStyle();

      //Stop canvases still being drawn
      for (var i = 0; i < my.canvasesTimeouts.length; i++) {
        clearTimeout(my.canvasesTimeouts[i]);
      }
      var view = [my.scrollLeftTracker, my.scrollLeftTracker + my.wrapper.clientWidth];
      for (var canvasNum = 0; canvasNum < my.canvases.length; canvasNum++) {
        var canvasLeft = canvasNum * Math.floor(my.width / my.canvases.length / my.pixelRatio);
        var canvasRight = (canvasNum + 1) * Math.floor(my.width / my.canvases.length / my.pixelRatio);
        var canvasBound = [canvasLeft, canvasRight];
        my.canvases[canvasNum].style['left'] = canvasLeft + 'px';

        //Optimise drawing for the view
        var priority = 0;
        if (canvasBound[0] > view[1]) {
          //Canvas is to the right of view window
          var distance = canvasBound[0] - view[1];
          priority = Math.ceil(distance / (view[1] - view[0]));
        } else if (canvasBound[1] < view[0]) {
          //Canvas is to the left of the view window
          var _distance = view[0] - canvasBound[1];
          priority = Math.ceil(_distance / (view[1] - view[0]));
        }

        //delay = 25ms * number of viewport widths away the canvas is
        my.canvasesTimeouts[canvasNum] = setTimeout(my.drawToCanvas, 25 * priority, frequenciesData, my, canvasNum);
      }
    }

    /**
     * Draw spectrogram channel to a specific canvas
     * @param {[Number, Number, Number]} frequenciesData spectrogram data in [channel, sample, freq] format
     * @param {SpectrogramPlugin} my variable with 'this' in it
     * @param {Number} canvasNum Canvas to draw to
     */
  }, {
    key: "drawToCanvas",
    value: function drawToCanvas(frequenciesData, my, canvasNum) {
      var height = my.fftSamples / 2;
      var freqFrom = my.buffer.sampleRate / 2;
      var freqMin = my.frequencyMin;
      var freqMax = my.frequencyMax;
      var _loop = function _loop(channel) {
        //Get pixels from frequency data and apply to image
        var relevantFreqs = frequenciesData[channel].slice(canvasNum * Math.round(frequenciesData[channel].length / my.canvases.length), (canvasNum + 1) * Math.round(frequenciesData[channel].length / my.canvases.length));
        var pixels = my.resample(relevantFreqs);
        var imageData = new ImageData(pixels.length, height);
        for (var i = 0; i < pixels.length; i++) {
          for (var j = 0; j < pixels[i].length; j++) {
            var colorMap = my.colorMap[pixels[i][j]];
            var redIndex = ((height - j) * imageData.width + i) * 4;
            imageData.data[redIndex] = colorMap[0] * 255;
            imageData.data[redIndex + 1] = colorMap[1] * 255;
            imageData.data[redIndex + 2] = colorMap[2] * 255;
            imageData.data[redIndex + 3] = colorMap[3] * 255;
          }
        }

        //Draw image to canvas
        createImageBitmap(imageData).then(function (renderer) {
          if (my.canvases[canvasNum]) {
            //Check canvas still exists after creating image
            my.canvases[canvasNum].getContext('2d').drawImage(renderer, 0, height * (1 - freqMax / freqFrom),
            // source x, y
            imageData.width, height * (freqMax - freqMin) / freqFrom,
            // source width, height
            0, height * channel,
            // destination x, y
            my.canvases[canvasNum].width, height // destination width, height
            );
          }
        });
      };
      for (var channel = 0; channel < frequenciesData.length; channel++) {
        _loop(channel);
      }
      //Drawing is finished
      my.canvasesTimeouts[canvasNum] = null;
    }
  }, {
    key: "getFrequencies",
    value: function getFrequencies(callback) {
      var fftSamples = this.fftSamples;
      var buffer = this.buffer = this.wavesurfer.backend.buffer;
      var channels = this.channels;
      if (!buffer) {
        this.fireEvent('error', 'Web Audio buffer is not available');
        return;
      }

      // This may differ from file samplerate. Browser resamples audio.
      var sampleRate = buffer.sampleRate;
      var frequencies = [];
      var noverlap = this.noverlap;
      if (!noverlap) {
        var uniqueSamplesPerPx = buffer.length / this.width;
        noverlap = Math.max(0, Math.round(fftSamples - uniqueSamplesPerPx));
      }
      var fft = new _fft.default(fftSamples, sampleRate, this.windowFunc, this.alpha);
      for (var c = 0; c < channels; c++) {
        // for each channel
        var channelData = buffer.getChannelData(c);
        var channelFreq = [];
        var currentOffset = 0;
        while (currentOffset + fftSamples < channelData.length) {
          var segment = channelData.slice(currentOffset, currentOffset + fftSamples);
          var spectrum = fft.calculateSpectrum(segment);
          var array = new Uint8Array(fftSamples / 2);
          var j = void 0;
          for (j = 0; j < fftSamples / 2; j++) {
            array[j] = Math.max(-255, Math.log10(spectrum[j]) * 45);
          }
          channelFreq.push(array);
          // channelFreq: [sample, freq]

          currentOffset += fftSamples - noverlap;
        }
        frequencies.push(channelFreq);
        // frequencies: [channel, sample, freq]
      }

      callback(frequencies, this);
    }
  }, {
    key: "loadFrequenciesData",
    value: function loadFrequenciesData(url) {
      var _this2 = this;
      var request = this.util.fetchFile({
        url: url
      });
      request.on('success', function (data) {
        return _this2.drawSpectrogram(JSON.parse(data), _this2);
      });
      request.on('error', function (e) {
        return _this2.fireEvent('error', e);
      });
      return request;
    }
  }, {
    key: "freqType",
    value: function freqType(freq) {
      return freq >= 1000 ? (freq / 1000).toFixed(1) : Math.round(freq);
    }
  }, {
    key: "unitType",
    value: function unitType(freq) {
      return freq >= 1000 ? 'KHz' : 'Hz';
    }
  }, {
    key: "loadLabels",
    value: function loadLabels(bgFill, fontSizeFreq, fontSizeUnit, fontType, textColorFreq, textColorUnit, textAlign, container) {
      var frequenciesHeight = this.height;
      bgFill = bgFill || 'rgba(68,68,68,0)';
      fontSizeFreq = fontSizeFreq || '12px';
      fontSizeUnit = fontSizeUnit || '10px';
      fontType = fontType || 'Helvetica';
      textColorFreq = textColorFreq || '#fff';
      textColorUnit = textColorUnit || '#fff';
      textAlign = textAlign || 'center';
      container = container || '#specLabels';
      var bgWidth = 55;
      var getMaxY = frequenciesHeight || 512;
      var labelIndex = 5 * (getMaxY / 256);
      var freqStart = this.frequencyMin;
      var step = (this.frequencyMax - freqStart) / labelIndex;

      // prepare canvas element for labels
      var ctx = this.labelsEl.getContext('2d');
      var dispScale = window.devicePixelRatio;
      this.labelsEl.height = this.height * this.channels * dispScale;
      this.labelsEl.width = bgWidth * dispScale;
      ctx.scale(dispScale, dispScale);
      if (!ctx) {
        return;
      }
      for (var c = 0; c < this.channels; c++) {
        // for each channel
        // fill background
        ctx.fillStyle = bgFill;
        ctx.fillRect(0, c * getMaxY, bgWidth, (1 + c) * getMaxY);
        ctx.fill();
        var i = void 0;

        // render labels
        for (i = 0; i <= labelIndex; i++) {
          ctx.textAlign = textAlign;
          ctx.textBaseline = 'middle';
          var freq = freqStart + step * i;
          var label = this.freqType(freq);
          var units = this.unitType(freq);
          var yLabelOffset = 2;
          var x = 16;
          var y = void 0;
          if (i == 0) {
            y = (1 + c) * getMaxY + i - 10;
            // unit label
            ctx.fillStyle = textColorUnit;
            ctx.font = fontSizeUnit + ' ' + fontType;
            ctx.fillText(units, x + 24, y);
            // freq label
            ctx.fillStyle = textColorFreq;
            ctx.font = fontSizeFreq + ' ' + fontType;
            ctx.fillText(label, x, y);
          } else {
            y = (1 + c) * getMaxY - i * 50 + yLabelOffset;
            // unit label
            ctx.fillStyle = textColorUnit;
            ctx.font = fontSizeUnit + ' ' + fontType;
            ctx.fillText(units, x + 24, y);
            // freq label
            ctx.fillStyle = textColorFreq;
            ctx.font = fontSizeFreq + ' ' + fontType;
            ctx.fillText(label, x, y);
          }
        }
      }
    }
  }, {
    key: "updateScroll",
    value: function updateScroll(e) {
      if (this.wrapper) {
        this.scrollLeftTracker = e.target.scrollLeft;
        this.wrapper.scrollLeft = e.target.scrollLeft;
      }
    }
  }, {
    key: "resample",
    value: function resample(oldMatrix) {
      var columnsNumber = oldMatrix.length;
      var newMatrix = [];
      var oldPiece = 1 / oldMatrix.length;
      var newPiece = 1 / columnsNumber;
      var i;
      for (i = 0; i < columnsNumber; i++) {
        var column = new Array(oldMatrix[0].length);
        var j = void 0;
        for (j = 0; j < oldMatrix.length; j++) {
          var oldStart = j * oldPiece;
          var oldEnd = oldStart + oldPiece;
          var newStart = i * newPiece;
          var newEnd = newStart + newPiece;
          var overlap = oldEnd <= newStart || newEnd <= oldStart ? 0 : Math.min(Math.max(oldEnd, newStart), Math.max(newEnd, oldStart)) - Math.max(Math.min(oldEnd, newStart), Math.min(newEnd, oldStart));
          var k = void 0;
          /* eslint-disable max-depth */
          if (overlap > 0) {
            for (k = 0; k < oldMatrix[0].length; k++) {
              if (column[k] == null) {
                column[k] = 0;
              }
              column[k] += overlap / newPiece * oldMatrix[j][k];
            }
          }
          /* eslint-enable max-depth */
        }

        var intColumn = new Uint8Array(oldMatrix[0].length);
        var m = void 0;
        for (m = 0; m < oldMatrix[0].length; m++) {
          intColumn[m] = column[m];
        }
        newMatrix.push(intColumn);
      }
      return newMatrix;
    }
  }, {
    key: "stretchCanvases",
    value: function stretchCanvases() {
      for (var i = 0; i < this.canvases.length; i++) {
        this.canvases[i].style.width = Math.round(this.drawer.width / this.canvases.length / this.pixelRatio) + 'px';
        var canvasLeft = i * Math.floor(this.drawer.width / this.canvases.length / this.pixelRatio);
        this.canvases[i].style['left'] = canvasLeft + 'px';
      }
    }
  }], [{
    key: "create",
    value:
    /**
     * Spectrogram plugin definition factory
     *
     * This function must be used to create a plugin definition which can be
     * used by wavesurfer to correctly instantiate the plugin.
     *
     * @param  {SpectrogramPluginParams} params Parameters used to initialise the plugin
     * @return {PluginDefinition} An object representing the plugin.
     */
    function create(params) {
      return {
        name: 'spectrogram',
        deferInit: params && params.deferInit ? params.deferInit : false,
        params: params,
        staticProps: {
          FFT: _fft.default
        },
        instance: SpectrogramPlugin
      };
    }
  }]);
  return SpectrogramPlugin;
}();
exports["default"] = SpectrogramPlugin;
module.exports = exports.default;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/plugin/spectrogram/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=wavesurfer.spectrogram.js.map