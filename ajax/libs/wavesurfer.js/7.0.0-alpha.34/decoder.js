class Decoder {
    initAudioContext(sampleRate) {
        this.audioCtx = new AudioContext({
            latencyHint: 'playback',
            sampleRate,
        });
    }
    constructor() {
        this.audioCtx = null;
        // Minimum sample rate supported by Web Audio API
        const DEFAULT_SAMPLE_RATE = 3000; // Chrome, Safari
        const FALLBACK_SAMPLE_RATE = 8000; // Firefox
        try {
            this.initAudioContext(DEFAULT_SAMPLE_RATE);
        }
        catch (e) {
            this.initAudioContext(FALLBACK_SAMPLE_RATE);
        }
    }
    async decode(audioData) {
        if (!this.audioCtx) {
            throw new Error('AudioContext is not initialized');
        }
        return this.audioCtx.decodeAudioData(audioData);
    }
    createBuffer(channelData, duration) {
        // If a single array of numbers is passed, make it an array of arrays
        if (typeof channelData[0] === 'number')
            channelData = [channelData];
        // Normalize to -1..1
        if (channelData[0].some((n) => n > 1 || n < -1)) {
            const max = Math.max(...channelData[0]);
            channelData = channelData.map((channel) => channel.map((n) => n / max));
        }
        return {
            length: channelData[0].length,
            duration,
            numberOfChannels: channelData.length,
            sampleRate: channelData[0].length / duration,
            getChannelData: (i) => channelData?.[i],
            copyFromChannel: AudioBuffer.prototype.copyFromChannel,
            copyToChannel: AudioBuffer.prototype.copyToChannel,
        };
    }
    destroy() {
        this.audioCtx?.close();
        this.audioCtx = null;
    }
}
export default Decoder;
