(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['wavesurfer'], factory);
    } else {
        root.WaveSurfer.Microphone = factory(root.WaveSurfer);
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

            // cross-browser getUserMedia
            this.getUserMedia = (
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia
            ).bind(navigator);

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
            this.getUserMedia({
                video: false,
                audio: true
            },
            this.gotStream.bind(this),
            this.deviceError.bind(this));
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
                    // disconnect sources so they can be used elsewhere
                    // (eg. during audio playback)
                    this.disconnect();
                } else {
                    // resume visualization
                    this.connect();
                }
            }
        },

        /**
         * Stop the microphone and visualization.
         */
        stop: function() {
            if (this.active) {
                this.active = false;

                if (this.stream) {
                    this.stream.stop();
                }
                this.disconnect();
                this.wavesurfer.empty();
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
                this.levelChecker.onaudioprocess = this.reloadBuffer.bind(this);
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

            this.connect();

            // notify listeners
            this.fireEvent('deviceReady', stream);
        },

        /**
         * Destroy the microphone plugin.
         */
        destroy: function(event) {
            this.stop();
        },

        /**
         * Device error callback.
         */
        deviceError: function(code) {
            // notify listeners
            this.fireEvent('deviceError', code);
        }

    };

    WaveSurfer.util.extend(WaveSurfer.Microphone, WaveSurfer.Observer);

    return WaveSurfer.Microphone;
}));
