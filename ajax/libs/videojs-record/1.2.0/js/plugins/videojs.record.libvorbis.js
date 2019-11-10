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
     * Audio-only engine for the libvorbis.js library.
     */
    videojs.LibVorbisEngine = videojs.extend(videojs.RecordBase,
    {
        /**
         * Setup recording engine.
         */
        setup: function(stream, mediaType, debug)
        {
            this.inputStream = stream;
            this.mediaType = mediaType;
            this.debug = debug;

            // setup libvorbis.js
            this.options = {
                audioBitsPerSecond: 32000
            };
        },

        /**
         * Start recording.
         */
        start: function()
        {
            this.chunks = [];
            this.engine = new VorbisMediaRecorder(this.inputStream,
                this.options);
            this.engine.ondataavailable = this.onData.bind(this);
            this.engine.onstop = this.onRecordingAvailable.bind(this);

            this.engine.start();
        },

        /**
         * Stop recording.
         */
        stop: function()
        {
            this.engine.stop();
        },

        onData: function(event)
        {
            this.chunks.push(event.data);
        },

        onRecordingAvailable: function()
        {
            var blob = new Blob(this.chunks, {type: this.chunks[0].type});
            this.chunks = [];
            this.onStopRecording(blob);
        }
    });

}));
