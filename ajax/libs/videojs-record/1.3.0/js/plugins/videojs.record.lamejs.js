(function (root, factory)
{
    if (typeof define === 'function' && define.amd)
    {
        // AMD. Register as an anonymous module.
        define(['videojs'], factory);
    }
    else if (typeof module === 'object' && module.exports)
    {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('video.js'));
    }
    else
    {
        // Browser globals (root is window)
        root.returnExports = factory(root.videojs);
    }
}(this, function (videojs)
{
    /**
     * Audio-only engine for the lamejs library.
     */
    videojs.LamejsEngine = videojs.extend(videojs.RecordBase,
    {
        /**
         * Setup recording engine.
         */
        setup: function(stream, mediaType, debug)
        {
            this.inputStream = stream;
            this.mediaType = mediaType;
            this.debug = debug;

            var config = {
                debug: this.debug,
                sampleRate: this.sampleRate
            };

            this.audioContext = new AudioContext();
            this.audioSourceNode = this.audioContext.createMediaStreamSource(
                this.inputStream);
            this.processor = this.audioContext.createScriptProcessor(
                16384, 1, 1);
            config.sampleRate = this.audioContext.sampleRate;

            this.engine = new Worker(this.audioWorkerURL);
            this.engine.onmessage = this.onWorkerMessage.bind(this);

            this.engine.postMessage({cmd: 'init', config: config});
        },

        /**
         * Start recording.
         */
        start: function()
        {
            this.processor.onaudioprocess = this.onAudioProcess.bind(this);
            this.audioSourceNode.connect(this.processor);
            this.processor.connect(this.audioContext.destination);
        },

        /**
         * Stop recording.
         */
        stop: function()
        {
            this.audioSourceNode.disconnect();
            this.processor.disconnect();
            this.processor.onaudioprocess = null;

            this.engine.postMessage({cmd: 'finish'});
        },

        /**
         * Received a message from the worker.
         */
        onWorkerMessage: function(e)
        {
            switch (e.data.cmd)
            {
                case 'end':
                    this.onStopRecording(new Blob(e.data.buf,
                        {type: 'audio/mp3'}));
                    break;

                case 'error':
                    this.player().trigger('error', e.data.error);
                    break;

                default:
                    // invalid message received
                    this.player().trigger('error', e.data);
                    break;
            }
        },

        /**
         * Continous encoding of audio data.
         */
        onAudioProcess: function(ev)
        {
            // send microphone data to LAME for MP3 encoding while recording
            var data = ev.inputBuffer.getChannelData(0);

            this.engine.postMessage({cmd: 'encode', buf: data});
        }
    });

}));
