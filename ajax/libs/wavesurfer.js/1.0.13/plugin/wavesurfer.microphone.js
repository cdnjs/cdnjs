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
            this.getUserMedia = (
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia
            ).bind(navigator);

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

                // Connect it to the destination to hear yourself (or any other node for processing!)
                //this.mediaStreamSource.connect(this.micContext.destination);

                this.levelChecker = this.micContext.createScriptProcessor(4096, 1 ,1);
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
