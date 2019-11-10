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
     * Audio-only engine for the recorder.js library.
     */
    videojs.RecorderjsEngine = videojs.extend(videojs.RecordBase,
    {
        /**
         * Setup recording engine.
         */
        setup: function(stream, mediaType, debug)
        {
            this.inputStream = stream;
            this.mediaType = mediaType;
            this.debug = debug;

            this.audioContext = new AudioContext();
            this.audioSourceNode = this.audioContext.createMediaStreamSource(
                this.inputStream);

            // setup recorder.js
            this.engine = new Recorder(this.audioSourceNode,
            {
                bufferLen: this.bufferSize,
                numChannels: this.audioChannels
            });
        },

        /**
         * Start recording.
         */
        start: function()
        {
            this.engine.record();
        },

        /**
         * Stop recording.
         */
        stop: function()
        {
            this.engine.stop();

            this.engine.exportWAV(this.onStopRecording.bind(this));

            this.engine.clear();
        }
    });

}));
