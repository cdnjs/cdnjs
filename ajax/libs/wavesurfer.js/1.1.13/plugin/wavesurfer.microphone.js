(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["./../wavesurfer"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("wavesurfer.js"));
  } else {
    factory(WaveSurfer);
  }
}(this, function (WaveSurfer) {

'use strict';

WaveSurfer.Microphone = {
    init: function (params) {
        this.params = params;

        var wavesurfer = this.wavesurfer = params.wavesurfer;

        if (!this.wavesurfer) {
            throw new Error('No WaveSurfer instance provided');
        }

        this.active = false;
        this.paused = false;
        this.reloadBufferFunction = this.reloadBuffer.bind(this);

        // cross-browser getUserMedia
        var promisifiedOldGUM = function(constraints, successCallback, errorCallback) {
            // get ahold of getUserMedia, if present
            var getUserMedia = (navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia);
            // Some browsers just don't implement it - return a rejected
            // promise with an error to keep a consistent interface
            if (!getUserMedia) {
                return Promise.reject(
                    new Error('getUserMedia is not implemented in this browser')
                );
            }
            // otherwise, wrap the call to the old navigator.getUserMedia with
            // a Promise
            return new Promise(function(successCallback, errorCallback) {
                getUserMedia.call(navigator, constraints, successCallback,
                    errorCallback);
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

        // The constraints parameter is a MediaStreamConstaints object with two
        // members: video and audio, describing the media types requested. Either
        // or both must be specified.
        this.constraints = this.params.constraints || {
            video: false,
            audio: true
        };

        // The buffer size in units of sample-frames.
        // If specified, the bufferSize must be one of the following values:
        // 256, 512, 1024, 2048, 4096, 8192, 16384. Defaults to 4096.
        this.bufferSize = this.params.bufferSize || 4096;

        // Integer specifying the number of channels for this node's input,
        // defaults to 1. Values of up to 32 are supported.
        this.numberOfInputChannels = this.params.numberOfInputChannels || 1;

        // Integer specifying the number of channels for this node's output,
        // defaults to 1. Values of up to 32 are supported.
        this.numberOfOutputChannels = this.params.numberOfOutputChannels || 1;

        // wavesurfer's AudioContext where we'll route the mic signal to
        this.micContext = this.wavesurfer.backend.getAudioContext();
    },

    /**
     * Allow user to select audio input device, eg. microphone, and
     * start the visualization.
     */
    start: function() {
        navigator.mediaDevices.getUserMedia(this.constraints).then(
            this.gotStream.bind(this)
        ).catch(
            this.deviceError.bind(this)
        );
    },

    /**
     * Pause/resume visualization.
     */
    togglePlay: function() {
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
    },

    /**
     * Play visualization.
     */
    play: function() {
        this.paused = false;

        this.connect();
    },

    /**
     * Pause visualization.
     */
    pause: function() {
        this.paused = true;

        // disconnect sources so they can be used elsewhere
        // (eg. during audio playback)
        this.disconnect();
    },

    /**
     * Stop the device stream and remove any remaining waveform drawing from
     * the wavesurfer canvas.
     */
    stop: function() {
        if (this.active) {
            // stop visualization and device
            this.stopDevice();

            // empty last frame
            this.wavesurfer.empty();
        }
    },

    /**
     * Stop the device and the visualization.
     */
    stopDevice: function() {
        this.active = false;

        // stop visualization
        this.disconnect();

        // stop stream from device
        if (this.stream) {
            var result = this.detectBrowser();
            // MediaStream.stop is deprecated since:
            // - Firefox 44 (https://www.fxsitecompat.com/en-US/docs/2015/mediastream-stop-has-been-deprecated/)
            // - Chrome 45 (https://developers.google.com/web/updates/2015/07/mediastream-deprecations)
            if ((result.browser === 'chrome' && result.version >= 45) ||
                (result.browser === 'firefox' && result.version >= 44) ||
                (result.browser === 'edge')) {
                if (this.stream.getTracks) { // note that this should not be a call
                    this.stream.getTracks().forEach(function (stream) {
                        stream.stop();
                    });
                    return;
                }
            }

            this.stream.stop();
        }
    },

    /**
     * Connect the media sources that feed the visualization.
     */
    connect: function() {
        if (this.stream !== undefined) {
            // Create an AudioNode from the stream.
            this.mediaStreamSource = this.micContext.createMediaStreamSource(this.stream);

            this.levelChecker = this.micContext.createScriptProcessor(
                this.bufferSize, this.numberOfInputChannels, this.numberOfOutputChannels);
            this.mediaStreamSource.connect(this.levelChecker);

            this.levelChecker.connect(this.micContext.destination);
            this.levelChecker.onaudioprocess = this.reloadBufferFunction;
        }
    },

    /**
     * Disconnect the media sources that feed the visualization.
     */
    disconnect: function() {
        if (this.mediaStreamSource !== undefined) {
            this.mediaStreamSource.disconnect();
        }

        if (this.levelChecker !== undefined) {
            this.levelChecker.disconnect();
            this.levelChecker.onaudioprocess = undefined;
        }
    },

    /**
     * Redraw the waveform.
     */
    reloadBuffer: function(event) {
        if (!this.paused) {
            this.wavesurfer.empty();
            this.wavesurfer.loadDecodedBuffer(event.inputBuffer);
        }
    },

    /**
     * Audio input device is ready.
     *
     * @param {LocalMediaStream} stream: the microphone's media stream.
     */
    gotStream: function(stream) {
        this.stream = stream;
        this.active = true;

        // start visualization
        this.play();

        // notify listeners
        this.fireEvent('deviceReady', stream);
    },

    /**
     * Destroy the microphone plugin.
     */
    destroy: function(event) {
        // make sure the buffer is not redrawn during
        // cleanup and demolition of this plugin.
        this.paused = true;

        this.stop();
    },

    /**
     * Device error callback.
     */
    deviceError: function(code) {
        // notify listeners
        this.fireEvent('deviceError', code);
    },

    /**
     * Extract browser version out of the provided user agent string.
     * @param {!string} uastring userAgent string.
     * @param {!string} expr Regular expression used as match criteria.
     * @param {!number} pos position in the version string to be returned.
     * @return {!number} browser version.
     */
    extractVersion: function(uastring, expr, pos) {
        var match = uastring.match(expr);
        return match && match.length >= pos && parseInt(match[pos], 10);
    },

    /**
     * Browser detector.
     * @return {object} result containing browser, version and minVersion
     *     properties.
     */
    detectBrowser: function() {
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
            result.version = this.extractVersion(navigator.userAgent,
                /Firefox\/([0-9]+)\./, 1);
            result.minVersion = 31;
            return result;
        }

        // Chrome/Chromium/Webview.
        if (navigator.webkitGetUserMedia && window.webkitRTCPeerConnection) {
            result.browser = 'chrome';
            result.version = this.extractVersion(navigator.userAgent,
                /Chrom(e|ium)\/([0-9]+)\./, 2);
            result.minVersion = 38;
            return result;
        }

        // Edge.
        if (navigator.mediaDevices &&
            navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
            result.browser = 'edge';
            result.version = this.extractVersion(navigator.userAgent,
                /Edge\/(\d+).(\d+)$/, 2);
            result.minVersion = 10547;
            return result;
        }

        // Non supported browser default.
        result.browser = 'Not a supported browser.';
        return result;
    }

};

WaveSurfer.util.extend(WaveSurfer.Microphone, WaveSurfer.Observer);


}));
