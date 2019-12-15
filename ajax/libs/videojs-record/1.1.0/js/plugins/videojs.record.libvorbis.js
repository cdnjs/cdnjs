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
                workerURL: this.audioWorkerURL,
                moduleURL: this.audioModuleURL,
                encoderOptions: {
                    channels: this.audioChannels,
                    sampleRate: this.sampleRate,
                    quality: 0.8
                }
            };
        },

        /**
         * Start recording.
         */
        start: function()
        {
            this.chunks = [];
            this.audioContext = new AudioContext();
            this.audioSourceNode = this.audioContext.createMediaStreamSource(this.inputStream);
            this.scriptProcessorNode = this.audioContext.createScriptProcessor(this.bufferSize);

            libvorbis.OggVbrAsyncEncoder.create(
                this.options,
                this.onData.bind(this),
                this.onRecordingAvailable.bind(this)).then(
                this.onEngineCreated.bind(this));
        },

        /**
         * Stop recording.
         */
        stop: function()
        {
            this.audioSourceNode.disconnect(this.scriptProcessorNode);
            this.scriptProcessorNode.disconnect(this.audioContext.destination);

            this.encoder.finish();

            this.audioContext.close();
            this.audioContext = null;
        },

        /**
         * Invoked when the libvorbis encoder is ready for recording.
         */
        onEngineCreated: function(encoder)
        {
            this.encoder = encoder;

            this.scriptProcessorNode.onaudioprocess = this.onAudioProcess.bind(this);

            this.audioSourceNode.connect(this.scriptProcessorNode);
            this.scriptProcessorNode.connect(this.audioContext.destination);
        },

        /**
         * Continous encoding of audio data.
         */
        onAudioProcess: function(ev)
        {
            var channelData;
            var channels = [];
            var inputBuffer = ev.inputBuffer;
            var samples = inputBuffer.length;

            for (var channel = 0; channel < this.audioChannels; channel++)
            {
                channelData = inputBuffer.getChannelData(channel);
                // script processor reuses buffers; we need to make copies
                channelData = new Float32Array(channelData);

                channels.push(channelData);
            }

            this.encoder.encode(channels);
        },

        onData: function(data)
        {
            this.chunks.push(data);
        },

        onRecordingAvailable: function()
        {
            this.onStopRecording(new Blob(this.chunks, {type: 'audio/ogg'}));
        }
    });

}));
