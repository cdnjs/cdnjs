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
    destroy() {
        this.audioCtx?.close();
        this.audioCtx = null;
    }
}
export default Decoder;
