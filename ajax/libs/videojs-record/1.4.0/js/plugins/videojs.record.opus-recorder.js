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
     * Audio-only engine for the opus-recorder library.
     */
    videojs.OpusRecorderEngine = videojs.extend(videojs.RecordBase,
    {
        /**
         * Setup recording engine.
         */
        setup: function(stream, mediaType, debug)
        {
            this.inputStream = stream;
            this.mediaType = mediaType;
            this.debug = debug;

            this.engine = new Recorder({
                leaveStreamOpen: true,
                numberOfChannels: this.audioChannels,
                bufferLength: this.bufferSize,
                encoderSampleRate: this.sampleRate,
                encoderPath: this.audioWorkerURL
            });
            this.engine.addEventListener('dataAvailable',
                this.onRecordingAvailable.bind(this));

            this.engine.stream = stream;
            this.engine.sourceNode = this.engine.audioContext.createMediaStreamSource(
                stream);
            this.engine.sourceNode.connect(this.engine.filterNode ||
                this.engine.scriptProcessorNode);
            this.engine.sourceNode.connect(this.engine.monitorNode);
            this.engine.eventTarget.dispatchEvent(new Event('streamReady'));
        },

        /**
         * Start recording.
         */
        start: function()
        {
            this.engine.start();
        },

        /**
         * Stop recording.
         */
        stop: function()
        {
            this.engine.stop();
        },

        onRecordingAvailable: function(data)
        {
            this.onStopRecording(data.detail);
        }
    });

}));
