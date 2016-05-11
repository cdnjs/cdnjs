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
            this.getUserMedia = (navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia).bind(navigator);

            this.micContext = this.wavesurfer.backend.getAudioContext();
        },

        /**
         * Allow user to select audio input device, eg. microphone.
         */
        start: function() {
            this.getUserMedia({
                video: false,
                audio: true
            },
                           this.gotStream.bind(this),
                           this.streamError.bind(this));
        },

        /**
         * Stop the microphone.
         */
        stop: function() {
            if (this.active) {
                this.active = false;

                if (this.stream) {
                    this.stream.stop();
                }
                this.mediaStreamSource.disconnect();
                this.levelChecker.disconnect();
                this.wavesurfer.empty();
            }
        },

        /**
         * Redraw the waveform.
         */
        reloadBuffer: function(event) {
            this.wavesurfer.empty();
            this.wavesurfer.loadDecodedBuffer(event.inputBuffer);
        },

        /**
         * Audio input device is ready.
         */
        gotStream: function(stream) {
            this.stream = stream;
            this.active = true;

            // Create an AudioNode from the stream.
            this.mediaStreamSource = this.micContext.createMediaStreamSource(stream);

            // Connect it to the destination to hear yourself (or any other node for processing!)
            //this.mediaStreamSource.connect(this.audioContext.destination);

            this.levelChecker = this.micContext.createScriptProcessor(4096, 1 ,1);
            this.mediaStreamSource.connect(this.levelChecker);

            this.levelChecker.connect(this.micContext.destination);
            this.levelChecker.onaudioprocess = this.reloadBuffer.bind(this);
        },

        streamError: function(error)
        {
            console.warn('error', error);
        }

    };

    WaveSurfer.util.extend(WaveSurfer.Microphone, WaveSurfer.Observer);

    return WaveSurfer.Microphone;
}));
